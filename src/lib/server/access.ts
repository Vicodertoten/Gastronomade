// src/lib/server/access.ts
import crypto from 'node:crypto'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'

export const ACCESS_SESSION_COOKIE = 'mv_session'

const ACCESS_TOKEN_TTL_MINUTES = 30

let supabaseAdmin: SupabaseClient | null = null

function getEnv(name: string): string {
  return (
    import.meta.env[name] ||
    (typeof process !== 'undefined' ? process.env[name] : undefined) ||
    ''
  )
}

export function getSupabaseAdmin(): SupabaseClient {
  if (supabaseAdmin) return supabaseAdmin
  const url = getEnv('SUPABASE_URL')
  const key = getEnv('SUPABASE_SERVICE_ROLE_KEY')
  if (!url || !key) {
    throw new Error('SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY manquant')
  }
  supabaseAdmin = createClient(url, key, {
    auth: { persistSession: false }
  })
  return supabaseAdmin
}

export function normalizeEmail(email?: string | null): string {
  return (email || '').trim().toLowerCase()
}

function hashToken(value: string): string {
  return crypto.createHash('sha256').update(value).digest('hex')
}

function parseCookies(cookieHeader: string): Record<string, string> {
  if (!cookieHeader) return {}
  return cookieHeader
    .split(';')
    .map((part) => part.trim())
    .filter(Boolean)
    .reduce<Record<string, string>>((acc, part) => {
      const index = part.indexOf('=')
      if (index == -1) return acc
      const key = part.slice(0, index)
      const value = part.slice(index + 1)
      acc[key] = decodeURIComponent(value)
      return acc
    }, {})
}

export function getSessionTokenFromRequest(request: Request): string | null {
  const cookies = parseCookies(request.headers.get('cookie') || '')
  return cookies[ACCESS_SESSION_COOKIE] || null
}

export async function getSessionEmail(sessionToken: string): Promise<string | null> {
  if (!sessionToken) return null
  const supabase = getSupabaseAdmin()
  const sessionHash = hashToken(sessionToken)
  const { data, error } = await supabase
    .from('sessions')
    .select('email')
    .eq('session_hash', sessionHash)
    .is('revoked_at', null)
    .maybeSingle()

  if (error || !data?.email) return null

  await supabase
    .from('sessions')
    .update({ last_seen: new Date().toISOString() })
    .eq('session_hash', sessionHash)

  return data.email
}

export async function getEntitledPackIds(email: string): Promise<string[]> {
  const normalizedEmail = normalizeEmail(email)
  if (!normalizedEmail) return []
  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase
    .from('entitlements')
    .select('pack_id')
    .eq('email', normalizedEmail)
    .is('revoked_at', null)

  if (error || !data) return []
  return data.map((row: { pack_id: string }) => row.pack_id)
}

export async function createAccessToken(email: string): Promise<{ token: string; expiresAt: string }> {
  const normalizedEmail = normalizeEmail(email)
  const supabase = getSupabaseAdmin()
  const token = crypto.randomBytes(32).toString('base64url')
  const tokenHash = hashToken(token)
  const expiresAt = new Date(Date.now() + ACCESS_TOKEN_TTL_MINUTES * 60 * 1000).toISOString()

  await supabase.from('access_tokens').insert({
    email: normalizedEmail,
    token_hash: tokenHash,
    expires_at: expiresAt
  })

  return { token, expiresAt }
}

export async function consumeAccessToken(token: string): Promise<string | null> {
  if (!token) return null
  const supabase = getSupabaseAdmin()
  const tokenHash = hashToken(token)
  const { data, error } = await supabase
    .from('access_tokens')
    .select('email, used_at, expires_at')
    .eq('token_hash', tokenHash)
    .maybeSingle()

  if (error || !data?.email) return null
  if (data.used_at) return null

  const expiresAt = new Date(data.expires_at).getTime()
  if (Number.isNaN(expiresAt) || expiresAt < Date.now()) return null

  await supabase
    .from('access_tokens')
    .update({ used_at: new Date().toISOString() })
    .eq('token_hash', tokenHash)

  return data.email
}

export async function createSession(email: string): Promise<string> {
  const normalizedEmail = normalizeEmail(email)
  const supabase = getSupabaseAdmin()
  const sessionToken = crypto.randomBytes(32).toString('base64url')
  const sessionHash = hashToken(sessionToken)

  await supabase.from('sessions').insert({
    email: normalizedEmail,
    session_hash: sessionHash,
    last_seen: new Date().toISOString()
  })

  return sessionToken
}

export async function upsertEntitlement(options: {
  email: string
  packId: string
  stripeSessionId?: string | null
  stripePaymentIntentId?: string | null
}): Promise<void> {
  const supabase = getSupabaseAdmin()
  const normalizedEmail = normalizeEmail(options.email)
  if (!normalizedEmail || !options.packId) return

  await supabase.from('entitlements').upsert({
    email: normalizedEmail,
    pack_id: options.packId,
    stripe_session_id: options.stripeSessionId || null,
    stripe_payment_intent_id: options.stripePaymentIntentId || null
  })
}

export async function revokeEntitlementBySession(stripeSessionId: string): Promise<void> {
  if (!stripeSessionId) return
  const supabase = getSupabaseAdmin()
  await supabase
    .from('entitlements')
    .update({ revoked_at: new Date().toISOString() })
    .eq('stripe_session_id', stripeSessionId)
}

export async function revokeEntitlementByPaymentIntent(paymentIntentId: string): Promise<void> {
  if (!paymentIntentId) return
  const supabase = getSupabaseAdmin()
  await supabase
    .from('entitlements')
    .update({ revoked_at: new Date().toISOString() })
    .eq('stripe_payment_intent_id', paymentIntentId)
}
