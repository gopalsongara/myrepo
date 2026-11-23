# Cute Apology Website 💌

A personal, interactive apology experience with an animated love letter, multi-screen conversation, response collection, and **Telegram** notifications via a Vercel Serverless Function.

## Stack

- **Frontend:** React + Vite + Tailwind CSS + Framer Motion + Lucide
- **Backend:** Vercel Serverless Function (`/api/send-response`)
- **Notifications:** Telegram Bot API (`sendMessage`)
- **Hosting:** Single Vercel project (frontend + API)

## Local development (UI only)

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

> Plain `npm run dev` does **not** run `/api/*`. Use `vercel dev` to test Telegram notifications locally.

## Environment variables

Copy `.env.example` to `.env` for local API testing (never commit `.env`):

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `TELEGRAM_BOT_TOKEN` | Bot token from [@BotFather](https://t.me/BotFather). **Add the real value only in Vercel → Project Settings → Environment Variables** (and locally in `.env`). Never commit it. |
| `TELEGRAM_CHAT_ID` | Your Telegram chat ID (example in `.env.example`: `8670176467`) |

### Create / connect the bot (one-time)

1. Open Telegram and chat with [@BotFather](https://t.me/BotFather).
2. Create a bot with `/newbot` (or use an existing one) and copy the **bot token**.
3. Start a chat with your bot and send any message (required before it can message you).
4. Confirm your chat ID (the value you already have, or look it up with a helper like `@userinfobot`).
5. Put `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` in Vercel env vars (Production + Preview as needed).

## Test Telegram notifications locally

1. Install the Vercel CLI: `npm i -g vercel`
2. Create `.env` from `.env.example` and paste your real `TELEGRAM_BOT_TOKEN`.
3. Run:

```bash
vercel dev
```

4. Open the local URL from the CLI, complete the apology flow, and submit a response.
5. Confirm a message arrives in Telegram.

Or call the API directly:

```bash
curl -X POST http://localhost:3000/api/send-response \
  -H "Content-Type: application/json" \
  -d "{\"responseId\":\"second-chance\",\"responseLabel\":\"Give us a second chance 🥺\",\"responseTone\":\"positive\",\"feelings\":[\"Happy\",\"Want to talk\"],\"message\":\"I want to talk to you.\",\"website\":\"\",\"submittedAt\":\"2026-11-23T18:00:00.000Z\",\"submissionId\":\"test-local-1\"}"
```

Success looks like: `{ "success": true }`  
Failures look like: `{ "success": false, "error": "..." }` — the form keeps your selections and message.

## Deploy to Vercel

1. Push the repo to GitHub (`.env` is gitignored; do not commit secrets).
2. Import the project in Vercel (Vite is auto-detected; output `dist`).
3. In **Project Settings → Environment Variables**, add:
   - `TELEGRAM_BOT_TOKEN` = your real bot token
   - `TELEGRAM_CHAT_ID` = `8670176467` (or your chat ID)
4. Deploy.
5. Open the live site, submit a response, and confirm Telegram delivery.

### Test the deployed API

```bash
curl -X POST https://YOUR-DOMAIN.vercel.app/api/send-response \
  -H "Content-Type: application/json" \
  -d "{\"responseId\":\"second-chance\",\"responseLabel\":\"Give us a second chance 🥺\",\"responseTone\":\"positive\",\"feelings\":[\"Happy\"],\"message\":\"Hi\",\"website\":\"\",\"submittedAt\":\"2026-11-23T18:00:00.000Z\",\"submissionId\":\"test-deploy-1\"}"
```

## Build

```bash
npm run build
npm run preview
```

## User flow

1. Closed envelope → **Open My Letter** (starts music)
2. Handwritten apology letter → **Continue**
3. Interactive apology journey
4. Second-chance choices
5. Response form → `POST /api/send-response`
6. Telegram notification to you
7. Celebration (positive) or gentle thank-you (other responses)

## Security notes

- `TELEGRAM_BOT_TOKEN` exists only in server env / serverless runtime.
- Frontend never receives the token; API responses never include it.
- Input is validated and sanitized; HTML special characters are escaped for Telegram.
- Honeypot field (`website`) silently drops bot submissions.
- Client blocks duplicate clicks while submitting; server best-effort dedupes recent identical submissions.
- Success is returned only after Telegram confirms `ok: true`.

## Project structure

```
api/
  send-response.js
src/
  components/
  data/apologyFlow.js
  hooks/useMusicPlayer.js
  App.jsx
vercel.json
.env.example
```
