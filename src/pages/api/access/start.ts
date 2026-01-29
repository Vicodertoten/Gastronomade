import { createAccessToken, getEntitledPackIds, normalizeEmail } from '../../../lib/server/access'
import { sendAccessEmail } from '../../../lib/server/email'

export const prerender = false

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST({ request }: { request: Request }) {
  let payload: { email?: string } = {}
  try {
    payload = await request.json()
  } catch {
    return new Response(JSON.stringify({ error: 'Requête invalide' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  const email = normalizeEmail(payload.email)
  if (!email || !emailRegex.test(email)) {
    return new Response(JSON.stringify({ error: 'Email invalide' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  const packIds = await getEntitledPackIds(email)
  if (!packIds.length) {
    return new Response(JSON.stringify({ success: true, hasAccess: false }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  const { token } = await createAccessToken(email)
  await sendAccessEmail({ email, token })

  return new Response(JSON.stringify({ success: true, hasAccess: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  })
}
