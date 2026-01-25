// Fonction Netlify pour la newsletter avec Sanity
import { createClient } from '@sanity/client'

const sanityClient = createClient({
  projectId: process.env.PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID || 'gjz41m8i',
  dataset: process.env.PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_AUTH_TOKEN,
  apiVersion: process.env.SANITY_API_VERSION || '2024-01-01',
})

export default async (req: Request, context: any) => {
  console.log('Newsletter function called with method:', req.method)
  console.log('Environment variables check:')
  console.log('- PUBLIC_SANITY_PROJECT_ID:', !!process.env.PUBLIC_SANITY_PROJECT_ID)
  console.log('- SANITY_PROJECT_ID:', !!process.env.SANITY_PROJECT_ID)
  console.log('- SANITY_AUTH_TOKEN:', !!process.env.SANITY_AUTH_TOKEN)

  // Uniquement accepter les requêtes POST
  if (req.method !== 'POST') {
    console.log('Method not allowed:', req.method)
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  try {
    // Vérifier que les variables d'environnement sont configurées
    if (!process.env.PUBLIC_SANITY_PROJECT_ID && !process.env.SANITY_PROJECT_ID) {
      console.error('Variable SANITY_PROJECT_ID manquante')
      return new Response(JSON.stringify({
        error: 'Configuration serveur incomplète: SANITY_PROJECT_ID'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    if (!process.env.SANITY_AUTH_TOKEN) {
      console.error('Variable SANITY_AUTH_TOKEN manquante')
      return new Response(JSON.stringify({
        error: 'Configuration serveur incomplète: SANITY_AUTH_TOKEN'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Récupérer les données du formulaire
    const formData = await req.formData()
    const email = formData.get('email') as string
    console.log('Received email:', email)

    // Validation basique de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      console.log('Invalid email:', email)
      return new Response(JSON.stringify({ error: 'Email invalide' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Vérifier si l'email existe déjà
    console.log('Checking for existing subscription...')
    const existingSubscription = await sanityClient.fetch(
      `*[_type == "newsletter" && email == $email][0]`,
      { email }
    )

    if (existingSubscription) {
      console.log('Email already exists:', email)
      return new Response(JSON.stringify({ error: 'Cet email est déjà inscrit à la newsletter' }), {
        status: 409,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    // Créer la nouvelle inscription dans Sanity
    const newSubscription = {
      _type: 'newsletter',
      email,
      subscribedAt: new Date().toISOString(),
      status: 'active'
    }

    console.log('Creating new subscription...')
    await sanityClient.create(newSubscription)

    console.log(`Nouvelle inscription newsletter: ${email}`)

    return new Response(JSON.stringify({
      success: true,
      message: 'Inscription réussie !'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Erreur lors de l\'inscription newsletter:', error)

    return new Response(JSON.stringify({
      error: 'Erreur serveur lors de l\'inscription'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}

export const config = {
  path: '/api/newsletter'
}