// Script pour créer du contenu exemple dans Sanity
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'gjz41m8i',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_AUTH_TOKEN // Vous devrez définir cette variable d'environnement
})

// Contenu exemple pour la page d'accueil
const homeContent = {
  _id: 'home-content',
  _type: 'home',
  title: 'Gastronomade - Manger Vrai | Muriel Cruysmans',
  heroTitle: 'Gastronomade',
  heroSubtitle: 'Découvrez l\'art de manger vrai avec Muriel Cruysmans à Wavre',
  heroDescription: 'Un espace chaleureux et inspirant pour vos événements, cours de cuisine et moments gourmands',
  locationSectionTitle: 'Location de l\'Espace "La Zboum"',
  locationSectionDescription: 'Un cadre inspirant pour vos réunions d\'entreprise, événements privés et soirées gourmandes',
  restaurantSectionTitle: 'Restaurant Gastronomade',
  restaurantSectionDescription: 'Découvrez notre carte saisonnière et nos événements culinaires'
}

// Contenu exemple pour la page About
const aboutContent = {
  _id: 'about-content',
  _type: 'about',
  title: 'À propos - Muriel Cruysmans',
  heroTitle: 'Muriel Cruysmans',
  heroSubtitle: 'Passionnée de cuisine authentique et de partage',
  bio: 'Chef cuisinière passionnée, Muriel vous accompagne dans votre découverte du "manger vrai". Avec plus de 15 ans d\'expérience, elle partage son savoir-faire à travers des cours de cuisine, des ateliers Thermomix et des événements gastronomiques.',
  achievements: [
    '15+ années d\'expérience en cuisine',
    'Formatrice Thermomix certifiée',
    'Créatrice de l\'espace "La Zboum"',
    'Plus de 500 élèves formés'
  ],
  services: [
    'Cours de cuisine individuels et collectifs',
    'Ateliers Thermomix',
    'Location d\'espace pour événements',
    'Service traiteur',
    'Conseils nutritionnels personnalisés'
  ],
  contactTitle: 'Me contacter',
  contactText: 'N\'hésitez pas à me contacter pour toute question ou réservation.'
}

// Contenu exemple pour le restaurant
const restaurantContent = {
  _id: 'restaurant-content',
  _type: 'restaurant',
  price: 50,
  menuDescription: 'Menu unique du chef élaboré avec des produits frais et locaux, changeant selon les saisons',
  minGuests: 4,
  depositAmount: 25,
  dates: [
    'Jeudi 5 mars',
    'Jeudi 9 avril',
    'Jeudi 21 mai',
    'Jeudi 11 juin'
  ]
}

// Contenu exemple pour les locations
const locationSociete = {
  _type: 'location',
  type: 'societe',
  price: 400,
  features: [
    'Espace modulable jusqu\'à 50 personnes',
    'Équipement audiovisuel complet',
    'Parking privé',
    'Service traiteur disponible',
    'Ambiance professionnelle et cosy'
  ]
}

const locationPrive = {
  _type: 'location',
  type: 'prive',
  price: 350,
  features: [
    'Anniversaires et célébrations',
    'Réunions de famille',
    'Dîners entre amis',
    'Espace privatif et cosy',
    'Service personnalisé'
  ]
}

// Contenu exemple pour Thermomix
const thermomixContent = {
  _id: 'thermomix-content',
  _type: 'thermomix',
  title: 'Ateliers Thermomix - Muriel Cruysmans',
  heroTitle: 'Maîtrisez votre Thermomix',
  heroSubtitle: 'Formation complète pour devenir autonome avec votre robot cuiseur',
  content: 'Découvrez les secrets du Thermomix à travers des ateliers pratiques et personnalisés. Apprenez à réaliser des plats savoureux en un temps record.',
  practicalInfo: 'Les ateliers se déroulent dans un cadre convivial à l\'espace "La Zboum". Groupe de 4 à 8 personnes maximum pour un apprentissage optimal.'
}

// Contenu exemple pour le contact
const contactContent = {
  _id: 'contact-content',
  _type: 'contact',
  title: 'Contact - Gastronomade',
  heroTitle: 'Contactez-moi',
  heroSubtitle: 'Pour vos réservations et questions',
  contactInfo: {
    address: 'Rue de la Station 45, 1300 Wavre',
    phone: '+32 485 12 34 56',
    email: 'muriel@gastronomade.be'
  },
  socialLinks: {
    facebook: 'https://facebook.com/gastronomade',
    instagram: 'https://instagram.com/gastronomade'
  },
  bookingInfo: 'Réservation minimum 48h à l\'avance. Confirmation par email.'
}

async function createSampleContent() {
  try {
    console.log('Création du contenu exemple...')

    // Créer le contenu
    await client.create(homeContent)
    console.log('✅ Contenu Home créé')

    await client.create(aboutContent)
    console.log('✅ Contenu About créé')

    await client.create(restaurantContent)
    console.log('✅ Contenu Restaurant créé')

    await client.create(locationSociete)
    console.log('✅ Location Société créée')

    await client.create(locationPrive)
    console.log('✅ Location Privé créée')

    await client.create(thermomixContent)
    console.log('✅ Contenu Thermomix créé')

    await client.create(contactContent)
    console.log('✅ Contenu Contact créé')

    console.log('🎉 Tout le contenu exemple a été créé avec succès !')
    console.log('Vous pouvez maintenant voir le contenu dans Sanity Studio et sur le site.')

  } catch (error) {
    console.error('❌ Erreur lors de la création du contenu:', error)
  }
}

createSampleContent()