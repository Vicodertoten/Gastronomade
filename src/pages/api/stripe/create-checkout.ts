import Stripe from 'stripe'
import { getPackById } from '../../../lib/sanity'

export const prerender = false

function getEnv(name: string): string {
  return (
    import.meta.env[name] ||
    (typeof process !== 'undefined' ? process.env[name] : undefined) ||
    ''
  )
}

const stripeSecret = getEnv('STRIPE_SECRET_KEY')
const stripe = stripeSecret
  ? new Stripe(stripeSecret, { apiVersion: '2023-10-16' })
  : null

const siteUrl = getEnv('PUBLIC_SITE_URL') || getEnv('SITE_URL') || 'http://localhost:4321'
const successUrl = getEnv('STRIPE_SUCCESS_URL') || `${siteUrl}/recettes?paiement=ok`
const cancelUrl = getEnv('STRIPE_CANCEL_URL') || `${siteUrl}/recettes?paiement=annule`

export async function POST({ request }: { request: Request }) {
  if (!stripe) {
    return new Response(JSON.stringify({ error: 'Stripe non configuré' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  let payload: { packId?: string; email?: string } = {}
  try {
    payload = await request.json()
  } catch {
    return new Response(JSON.stringify({ error: 'Requête invalide' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  const packId = payload.packId
  if (!packId) {
    return new Response(JSON.stringify({ error: 'Pack manquant' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  const pack = await getPackById(packId)
  if (!pack || !pack.stripePriceId || pack.isActive === false) {
    return new Response(JSON.stringify({ error: 'Pack indisponible' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [{ price: pack.stripePriceId, quantity: 1 }],
    success_url: successUrl,
    cancel_url: cancelUrl,
    customer_email: payload.email || undefined,
    metadata: {
      packId: pack._id,
      packTitle: pack.title
    }
  })

  return new Response(JSON.stringify({ url: session.url }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  })
}
