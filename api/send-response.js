/**
 * Vercel Serverless Function — Telegram Bot API notification
 *
 * Required env vars (Vercel Project Settings → Environment Variables):
 * - TELEGRAM_BOT_TOKEN  (never commit the real token)
 * - TELEGRAM_CHAT_ID
 *
 * Endpoint used: https://api.telegram.org/bot<token>/sendMessage
 */

const ALLOWED_RESPONSE_IDS = new Set([
  'forgive',
  'second-chance',
  'lets-talk',
  'need-time',
  'still-hurt',
  'need-space',
  'start-again',
  'talk-first',
])

const MAX_MESSAGE_LENGTH = 1000
const MAX_FEELINGS = 10
const MAX_LABEL_LENGTH = 120
const MAX_SUBMISSION_ID_LENGTH = 64

/** Best-effort dedupe within a warm serverless instance (accidental double-submit). */
const recentSubmissions = new Map()
const DEDUPE_TTL_MS = 60_000

function json(res, status, body) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Cache-Control', 'no-store')
  res.end(JSON.stringify(body))
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    if (req.body && typeof req.body === 'object') {
      resolve(req.body)
      return
    }

    let raw = ''
    req.on('data', (chunk) => {
      raw += chunk
      if (raw.length > 50_000) {
        reject(new Error('Payload too large'))
        req.destroy()
      }
    })
    req.on('end', () => {
      if (!raw) {
        resolve({})
        return
      }
      try {
        resolve(JSON.parse(raw))
      } catch {
        reject(new Error('Invalid JSON'))
      }
    })
    req.on('error', reject)
  })
}

function sanitizeText(value, max) {
  if (typeof value !== 'string') return ''
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '')
    .trim()
    .slice(0, max)
}

/** Escape text for Telegram HTML parse mode. */
function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function formatDate(iso) {
  try {
    return new Date(iso || Date.now()).toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'short',
    })
  } catch {
    return new Date().toISOString()
  }
}

function buildNotificationHtml({ responseLabel, feelings, message, submittedAt }) {
  const feelingLine = feelings.length ? feelings.join(', ') : 'Not shared'
  const messageLine = message

  return [
    '💌 <b>NEW APOLOGY WEBSITE RESPONSE</b>',
    '',
    '❤️ <b>Selected Response:</b>',
    escapeHtml(responseLabel),
    '',
    '🌸 <b>Feelings:</b>',
    escapeHtml(feelingLine),
    '',
    '💬 <b>Personal Message:</b>',
    escapeHtml(messageLine),
    '',
    '⏰ <b>Submitted At:</b>',
    escapeHtml(formatDate(submittedAt)),
    '',
    'Someone has responded to your apology website ❤️',
  ].join('\n')
}

function pruneDedupe() {
  const now = Date.now()
  for (const [key, ts] of recentSubmissions) {
    if (now - ts > DEDUPE_TTL_MS) recentSubmissions.delete(key)
  }
}

function isDuplicate(key) {
  if (!key) return false
  pruneDedupe()
  if (recentSubmissions.has(key)) return true
  recentSubmissions.set(key, Date.now())
  return false
}

async function sendTelegramMessage(text) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId) {
    const missing = [
      !token && 'TELEGRAM_BOT_TOKEN',
      !chatId && 'TELEGRAM_CHAT_ID',
    ].filter(Boolean)
    const err = new Error(`Server is missing: ${missing.join(', ')}`)
    err.status = 500
    throw err
  }

  const url = `https://api.telegram.org/bot${token}/sendMessage`

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    }),
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok || data.ok !== true) {
    const apiMessage =
      data?.description || `Telegram API error (${response.status})`
    const err = new Error(apiMessage)
    err.status = 502
    // Never attach token; keep Telegram error description only
    err.details = { error_code: data?.error_code, description: data?.description }
    throw err
  }

  return data
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.statusCode = 204
    res.end()
    return
  }

  if (req.method !== 'POST') {
    json(res, 405, { success: false, error: 'Method not allowed' })
    return
  }

  try {
    const body = await readBody(req)

    // Honeypot — silently accept but do not notify
    if (body.website) {
      json(res, 200, { success: true, spam: true })
      return
    }

    const responseId = sanitizeText(body.responseId, 64)
    const responseLabel = sanitizeText(body.responseLabel, MAX_LABEL_LENGTH)
    const responseTone = sanitizeText(body.responseTone, 32)
    const message = sanitizeText(body.message, MAX_MESSAGE_LENGTH)
    const submittedAt = sanitizeText(body.submittedAt, 64)
    const submissionId = sanitizeText(body.submissionId, MAX_SUBMISSION_ID_LENGTH)

    if (!responseId || !ALLOWED_RESPONSE_IDS.has(responseId)) {
      json(res, 400, { success: false, error: 'Please select a valid response.' })
      return
    }

    if (!responseLabel) {
      json(res, 400, { success: false, error: 'Response label is required.' })
      return
    }

    if (!message) {
      json(res, 400, {
        success: false,
        error: 'Please write a personal message before sending.',
      })
      return
    }

    let feelings = []
    if (Array.isArray(body.feelings)) {
      feelings = body.feelings
        .slice(0, MAX_FEELINGS)
        .map((f) => sanitizeText(f, 60))
        .filter(Boolean)
    }

    const dedupeKey =
      submissionId ||
      `${responseId}|${message}|${feelings.join(',')}|${submittedAt.slice(0, 16)}`

    if (isDuplicate(dedupeKey)) {
      json(res, 200, {
        success: true,
        duplicate: true,
        tone: responseTone || 'gentle',
      })
      return
    }

    const text = buildNotificationHtml({
      responseLabel,
      feelings,
      message,
      submittedAt,
    })

    await sendTelegramMessage(text)

    json(res, 200, {
      success: true,
      tone: responseTone || 'gentle',
    })
  } catch (err) {
    const status = err.status || 500
    console.error('[send-response]', err.message, err.details || '')
    json(res, status, {
      success: false,
      error:
        status >= 500
          ? 'Could not deliver your response right now. Please try again in a moment.'
          : err.message || 'Request failed',
    })
  }
}
