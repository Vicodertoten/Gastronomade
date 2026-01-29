import Stripe from 'stripe'
import { createAccessToken, upsertEntitlement, revokeEntitlementByPaymentIntent, normalizeEmail } from '../../../lib/server/access'
import { sendAccessEmail } from '../../../lib/server/email'

export const prerender = false

function getEnv(name: string): string {
  return (
    import.meta.env[name] ||
    (typeof process !== 'undefined' ? process.env[name] : undefined) ||
    ''
  )
}

const stripeSecret = getEnv('STRIPE_SECRET_KEY')
const webhookSecret = getEnv('STRIPE_WEBHOOK_SECRET')
const stripe = stripeSecret
  ? new Stripe(stripeSecret, { apiVersion: '2023-10-16' })
  : null

export async function POST({ request }: { request: Request }) {
  if (!stripe || !webhookSecret) {
    return new Response('Stripe non configuré', { status: 500 })
  }

  const signature = request.headers.get('stripe-signature') || ''
  const payload = await request.text()

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret)
  } catch (error: any) {
    return new Response(`Webhook Error: ${error.message}`, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const packId = session.metadata?.packId
        const packTitle = session.metadata?.packTitle || null
        const email = normalizeEmail(session.customer_details?.email || session.customer_email || '')

        if (email && packId) {
          await upsertEntitlement({
            email,
            packId,
            stripeSessionId: session.id,
            stripePaymentIntentId: session.payment_intent as string
          })

          const { token } = await createAccessToken(email)
          await sendAccessEmail({ email, token, packTitle })
        }
        break
      }
      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge
        const paymentIntentId = charge.payment_intent as string
        if (paymentIntentId) {
          await revokeEntitlementByPaymentIntent(paymentIntentId)
        }
        break
      }
      default:
        break
    }
  } catch (error) {
    console.error('Erreur webhook Stripe:', error)
    return new Response('Erreur webhook', { status: 500 })
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  })
}
