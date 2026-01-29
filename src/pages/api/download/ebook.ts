import { getPackById } from '../../../lib/sanity'
import {
  getEntitledPackIds,
  getSessionEmail,
  getSessionTokenFromRequest,
  getSupabaseAdmin
} from '../../../lib/server/access'

export const prerender = false

function getEnv(name: string): string {
  return (
    import.meta.env[name] ||
    (typeof process !== 'undefined' ? process.env[name] : undefined) ||
    ''
  )
}

const bucket = getEnv('SUPABASE_STORAGE_BUCKET') || 'ebooks'

function normalizeStoragePath(value: string, bucketName: string): string {
  const raw = (value || '').trim()
  if (!raw) return ''

  try {
    const url = new URL(raw)
    const path = decodeURIComponent(url.pathname)
    const marker = '/storage/v1/object/'
    const index = path.indexOf(marker)
    if (index !== -1) {
      const rest = path.slice(index + marker.length).replace(/^\/+/, '')
      const parts = rest.split('/').filter(Boolean)
      if (parts.length >= 2) {
        const bucketFromUrl = parts[1]
        if (bucketFromUrl === bucketName) {
          return parts.slice(2).join('/')
        }
      }
    }
  } catch {
    // Not a URL, treat as raw key.
  }

  let key = raw.replace(/^\/+/, '')
  if (key.startsWith('buckets/')) {
    key = key.slice('buckets/'.length)
  }
  const bucketPrefix = `${bucketName}/`
  if (key.startsWith(bucketPrefix)) {
    key = key.slice(bucketPrefix.length)
  }
  return key
}

export async function GET({ request }: { request: Request }) {
  const url = new URL(request.url)
  const packId = url.searchParams.get('packId') || ''

  if (!packId) {
    return new Response(JSON.stringify({ error: 'Pack manquant' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  const sessionToken = getSessionTokenFromRequest(request)
  if (!sessionToken) {
    return new Response(JSON.stringify({ error: 'Non autorisé' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  const email = await getSessionEmail(sessionToken)
  if (!email) {
    return new Response(JSON.stringify({ error: 'Non autorisé' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  const packIds = await getEntitledPackIds(email)
  if (!packIds.includes(packId)) {
    return new Response(JSON.stringify({ error: 'Accès refusé' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  const pack = await getPackById(packId)
  if (!pack || !pack.ebookKey) {
    return new Response(JSON.stringify({ error: 'Ebook indisponible' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  const ebookPath = normalizeStoragePath(pack.ebookKey, bucket)
  if (!ebookPath) {
    return new Response(JSON.stringify({ error: 'Ebook indisponible' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase
    .storage
    .from(bucket)
    .createSignedUrl(ebookPath, 60 * 15)

  if (error || !data?.signedUrl) {
    const statusCode =
      typeof error?.statusCode === 'number'
        ? error.statusCode
        : typeof (error as { statusCode?: string })?.statusCode === 'string'
          ? Number((error as { statusCode?: string }).statusCode)
          : 500
    const isNotFound = statusCode === 404
    const payload: { error: string; details?: string } = {
      error: isNotFound ? 'Ebook introuvable' : 'Impossible de générer le lien'
    }
    if (import.meta.env.DEV && error?.message) {
      payload.details = error.message
    }
    console.error('Supabase signed URL error', {
      bucket,
      ebookPath,
      error
    })
    return new Response(JSON.stringify(payload), {
      status: isNotFound ? 404 : 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  return new Response(JSON.stringify({ url: data.signedUrl }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  })
}
