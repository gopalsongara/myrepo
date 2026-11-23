import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

/**
 * Serves /api/send-response during `npm run dev` so local form submits work
 * without requiring `vercel dev`.
 */
function localTelegramApiPlugin(env) {
  return {
    name: 'local-telegram-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url?.split('?')[0]
        if (url !== '/api/send-response') {
          next()
          return
        }

        // Mirror Vercel env for the serverless handler
        if (env.TELEGRAM_BOT_TOKEN) process.env.TELEGRAM_BOT_TOKEN = env.TELEGRAM_BOT_TOKEN
        if (env.TELEGRAM_CHAT_ID) process.env.TELEGRAM_CHAT_ID = env.TELEGRAM_CHAT_ID

        try {
          const { default: handler } = await server.ssrLoadModule('/api/send-response.js')

          // Collect raw body for our Node-style handler
          const chunks = []
          for await (const chunk of req) chunks.push(chunk)
          const raw = Buffer.concat(chunks).toString('utf8')
          let body = {}
          if (raw) {
            try {
              body = JSON.parse(raw)
            } catch {
              res.statusCode = 400
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ success: false, error: 'Invalid JSON' }))
              return
            }
          }

          const nodeReq = {
            method: req.method || 'GET',
            body,
            on() {
              return this
            },
          }

          await handler(nodeReq, res)
        } catch (err) {
          console.error('[local-telegram-api]', err)
          if (!res.headersSent) {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(
              JSON.stringify({
                success: false,
                error: 'Local API failed. Check the terminal for details.',
              }),
            )
          }
        }
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  // Also load plain .env if loadEnv missed (empty prefix loads all)
  try {
    const raw = readFileSync(resolve(process.cwd(), '.env'), 'utf8')
    for (const line of raw.split(/\r?\n/)) {
      if (!line || line.startsWith('#')) continue
      const i = line.indexOf('=')
      if (i === -1) continue
      const key = line.slice(0, i).trim()
      const val = line.slice(i + 1).trim()
      if (key && !(key in env)) env[key] = val
    }
  } catch {
    /* no .env file */
  }

  return {
    plugins: [react(), tailwindcss(), localTelegramApiPlugin(env)],
  }
})
