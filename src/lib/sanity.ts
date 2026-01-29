// src/lib/sanity.ts
import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || 'production',
  useCdn: false, // Changez à false pour bypass le cache
  apiVersion: '2024-01-01',
})

// Client pour les opérations d'écriture (nécessite un token)
export const sanityWriteClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: import.meta.env.SANITY_AUTH_TOKEN, // Token requis pour les écritures
})

// Types pour les données Sanity
export interface RestaurantData {
  _id: string
  title: string
  subtitle: string
  image?: any
  imageUrl?: string
  imageAlt?: string
  menuTitle: string
  datesTitle: string
  reservationTitle: string
  dates: string[]
  price: number
  menuDescription: string
  isFull: boolean
  minGuests: number
  depositAmount: number
}

export interface ThermomixData {
  _id: string
  monthlyText: string
  videoUrl: string
  featuredImage: any
  featuredImageUrl?: string
  demoRecipes: Array<{
    title: string
    description: string
    videoUrl: string
  }>
  instagramUrl?: string
}

export interface LocationData {
  _id: string
  type: 'societe' | 'prive'
  title: string
  subtitle: string
  price: string
  features: string[]
  description: string
  maxCapacity: number
  image: any
  imageUrl?: string
}

export interface CompanyAgendaSlot {
  date?: string
  startTime?: string
  endTime?: string
  title?: string
  status?: string
  notes?: string
}

export interface RecipeData {
  _id: string
  title: string
  slug: { current: string }
  category: string
  subtitle?: string
  description?: string
  featuredImage: any
  featuredImageUrl?: string
  gallery?: Array<{ url?: string }>
  prepTime?: number
  cookTime?: number
  restTime?: number
  servings?: number
  difficulty?: string
  budget?: string
  ingredients?: Array<{
    group?: string
    name: string
    quantity: string
    unit: string
    notes?: string
  }>
  instructions?: any[]
  highlights?: Array<{
    title?: string
    text?: string
    icon?: string
  }>
  tips?: string[]
  variations?: string[]
  tags?: string[]
  diet?: string[]
  season?: string[]
  equipment?: string[]
  allergens?: string[]
  storage?: string
  nutrition?: {
    calories?: number
    protein?: number
    carbs?: number
    fat?: number
    fiber?: number
  }
  isPremium: boolean
  packIds?: string[]
  publishedAt: string
  rating?: number
  isNew?: boolean
  isPopular?: boolean
}


export interface PackData {
  _id: string
  title: string
  slug?: { current: string }
  description?: string
  price?: number
  currency?: string
  stripePriceId?: string
  coverImage?: any
  coverImageUrl?: string
  ebookKey?: string
  recipeIds?: string[]
  recipeCount?: number
  isActive?: boolean
}

export interface AboutData {
  _id: string
  title: string
  heroTitle: string
  heroSubtitle: string
  aboutTitle: string
  bio: string
  photo: any
  achievements: string[]
  services: Array<{
    title: string
    description: string
    price: string
    features: string[]
  }>
  contactTitle: string
  contactText: string
}

export interface HomeData {
  _id: string
  title: string
  heroTitle: string
  heroSubtitle: string
  heroDescription: string
  heroBackgroundImage?: {
    asset?: {
      url?: string
    }
  }
  locationSectionTitle: string
  locationSectionDescription: string
  locationGallery?: Array<{
    url?: string
    alt?: string
  }>
  restaurantSectionTitle: string
  restaurantSectionDescription: string
  ctaTitle: string
  ctaDescription: string
  ctaPrimaryButton: string
  ctaSecondaryButton: string
}

export interface CompanyAgendaData {
  _id: string
  title: string
  description: string
  slots: CompanyAgendaSlot[]
  calendarTitle?: string
  startMonth?: string
  monthsToShow?: number
}

export interface ContactData {
  _id: string
  title: string
  heroTitle: string
  heroSubtitle: string
  contactInfo: {
    phone: string
    email: string
    address: string
  }
  socialLinks: Array<{
    platform: string
    url: string
    label: string
  }>
  bookingInfo: {
    title: string
    text: string
    depositInfo: string
  }
}

// Requêtes GROQ pour récupérer les données
export const queries = {
  // Restaurant - Récupère le document le plus récent
  restaurant: `*[_type == "restaurant"] | order(_updatedAt desc)[0] {
    _id,
    title,
    subtitle,
    image,
    "imageUrl": image.asset->url,
    imageAlt,
    menuTitle,
    datesTitle,
    reservationTitle,
    dates,
    price,
    menuDescription,
    isFull,
    minGuests,
    depositAmount
  }`,

  // Thermomix - Document unique
  thermomix: `*[_type == "thermomix"] | order(_updatedAt desc)[0] {
    _id,
    monthlyText,
    videoUrl,
    featuredImage,
    "featuredImageUrl": featuredImage.asset->url,
    demoRecipes,
    instagramUrl
  }`,

  // Locations - Tous les types
  locations: `*[_type == "location"] {
    _id,
    type,
    title,
    subtitle,
    price,
    features,
    description,
    maxCapacity,
    image,
    "imageUrl": image.asset->url
  }`,

  companyAgenda: `*[_type == "companyAgenda"] | order(_updatedAt desc)[0] {
    _id,
    title,
    description,
    calendarTitle,
    startMonth,
    monthsToShow,
    slots[]{
      date,
      startTime,
      endTime,
      title,
      status,
      notes
    }
  }`,

  // Recettes - Toutes les recettes gratuites (hors packs)
  recipes: `*[_type == "recipe" && !(_id in *[_type == "pack" && isActive == true].recipes[]._ref)] | order(publishedAt desc) {
    _id,
    title,
    slug,
    category,
    subtitle,
    description,
    featuredImage,
    "featuredImageUrl": featuredImage.asset->url,
    gallery[]{ ..., "url": asset->url },
    prepTime,
    cookTime,
    restTime,
    servings,
    difficulty,
    budget,
    ingredients,
    instructions,
    highlights,
    tips,
    variations,
    tags,
    diet,
    season,
    equipment,
    allergens,
    storage,
    nutrition,
    isPremium,
    publishedAt,
    rating,
    isNew,
    isPopular
  }`,

  // Recette spécifique par slug
  recipeBySlug: `*[_type == "recipe" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    category,
    subtitle,
    description,
    featuredImage,
    "featuredImageUrl": featuredImage.asset->url,
    gallery[]{ ..., "url": asset->url },
    prepTime,
    cookTime,
    restTime,
    servings,
    difficulty,
    budget,
    ingredients,
    instructions,
    highlights,
    tips,
    variations,
    tags,
    diet,
    season,
    equipment,
    allergens,
    storage,
    nutrition,
    isPremium,
    publishedAt,
    rating,
    isNew,
    isPopular,
    "packIds": *[_type == "pack" && isActive == true && references(^._id)]._id
  }`,

  // Recettes par catégorie
  recipesByCategory: `*[_type == "recipe" && category == $category && !(_id in *[_type == "pack" && isActive == true].recipes[]._ref)] | order(publishedAt desc) {
    _id,
    title,
    slug,
    description,
    featuredImage,
    "featuredImageUrl": featuredImage.asset->url,
    prepTime,
    cookTime,
    restTime,
    difficulty,
    tags,
    diet,
    season,
    budget
  }`,


  // Packs - Boutique
  packs: `*[_type == "pack" && isActive == true] | order(_createdAt desc) {
    _id,
    title,
    slug,
    description,
    price,
    currency,
    stripePriceId,
    coverImage,
    "coverImageUrl": coverImage.asset->url,
    ebookKey,
    "recipeIds": recipes[]._ref,
    "recipeCount": count(recipes),
    isActive
  }`,

  packById: `*[_type == "pack" && _id == $id][0] {
    _id,
    title,
    slug,
    description,
    price,
    currency,
    stripePriceId,
    coverImage,
    "coverImageUrl": coverImage.asset->url,
    ebookKey,
    "recipeIds": recipes[]._ref,
    "recipeCount": count(recipes),
    isActive
  }`,

  recipesByPackIds: `*[_type == "recipe" && _id in *[_type == "pack" && _id in $packIds].recipes[]._ref] | order(publishedAt desc) {
    _id,
    title,
    slug,
    category,
    subtitle,
    description,
    featuredImage,
    "featuredImageUrl": featuredImage.asset->url,
    gallery[]{ ..., "url": asset->url },
    prepTime,
    cookTime,
    restTime,
    servings,
    difficulty,
    budget,
    ingredients,
    instructions,
    highlights,
    tips,
    variations,
    tags,
    diet,
    season,
    equipment,
    allergens,
    storage,
    nutrition,
    isPremium,
    publishedAt,
    rating,
    isNew,
    isPopular
  }`,

  // About - Informations personnelles
  about: `*[_type == "about"] | order(_updatedAt desc)[0] {
    _id,
    title,
    heroTitle,
    heroSubtitle,
    aboutTitle,
    bio,
    photo {
      asset->{
        url
      }
    },
    achievements,
    services,
    contactTitle,
    contactText
  }`,

  // Contact - Informations de contact
  contact: `*[_type == "contact"] | order(_updatedAt desc)[0] {
    _id,
    title,
    heroTitle,
    heroSubtitle,
    contactInfo,
    socialLinks,
    bookingInfo
  }`,
  // Home - Page d'accueil
  home: `*[_type == "home"] | order(_updatedAt desc)[0] {
    _id,
    title,
    heroTitle,
    heroSubtitle,
    heroDescription,
    heroBackgroundImage {
      asset-> {
        url
      }
    },
    locationSectionTitle,
    locationSectionDescription,
    locationGallery[]{
      "url": asset->url,
      alt
    },
    restaurantSectionTitle,
    restaurantSectionDescription,
    ctaTitle,
    ctaDescription,
    ctaPrimaryButton,
    ctaSecondaryButton
  }`}

// Fonctions utilitaires pour récupérer les données
export async function getThermomixData(): Promise<ThermomixData | null> {
  try {
    return await sanityClient.fetch(queries.thermomix)
  } catch (error) {
    console.error('Erreur lors de la récupération des données thermomix:', error)
    return null
  }
}

export async function getRecipesData(): Promise<RecipeData[]> {
  try {
    return await sanityClient.fetch(queries.recipes)
  } catch (error) {
    console.error('Erreur lors de la récupération des données recettes:', error)
    return []
  }
}

export async function getRecipeBySlug(slug: string): Promise<RecipeData | null> {
  try {
    return await sanityClient.fetch(queries.recipeBySlug, { slug })
  } catch (error) {
    console.error('Erreur lors de la récupération de la recette:', error)
    return null
  }
}

export async function getRecipesByCategory(category: string): Promise<RecipeData[]> {
  try {
    return await sanityClient.fetch(queries.recipesByCategory, { category })
  } catch (error) {
    console.error('Erreur lors de la récupération des recettes par catégorie:', error)
    return []
  }
}


export async function getPacksData(): Promise<PackData[]> {
  try {
    return await sanityClient.fetch(queries.packs)
  } catch (error) {
    console.error('Erreur lors de la récupération des packs:', error)
    return []
  }
}

export async function getPackById(id: string): Promise<PackData | null> {
  try {
    return await sanityClient.fetch(queries.packById, { id })
  } catch (error) {
    console.error('Erreur lors de la récupération du pack:', error)
    return null
  }
}

export async function getRecipesByPackIds(packIds: string[]): Promise<RecipeData[]> {
  if (!packIds.length) return []
  try {
    return await sanityClient.fetch(queries.recipesByPackIds, { packIds })
  } catch (error) {
    console.error('Erreur lors de la récupération des recettes premium:', error)
    return []
  }
}

export async function getAboutData(): Promise<AboutData | null> {
  try {
    return await sanityClient.fetch(queries.about)
  } catch (error) {
    console.error('Erreur lors de la récupération des données about:', error)
    return null
  }
}

export async function getContactData(): Promise<ContactData | null> {
  try {
    return await sanityClient.fetch(queries.contact)
  } catch (error) {
    console.error('Erreur lors de la récupération des données contact:', error)
    return null
  }
}

export async function getHomeData(): Promise<HomeData | null> {
  try {
    return await sanityClient.fetch(queries.home)
  } catch (error) {
    console.error('Erreur lors de la récupération des données home:', error)
    return null
  }
}
