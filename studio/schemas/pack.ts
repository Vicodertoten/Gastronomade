// studio/schemas/pack.ts
import type { Rule } from '@sanity/types'

export const pack = {
  name: 'pack',
  title: 'Packs',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Nom du pack',
      type: 'string',
      validation: (Rule: Rule) => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug URL',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: (Rule: Rule) => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      description: 'Description courte visible dans la boutique'
    },
    {
      name: 'price',
      title: 'Prix',
      type: 'number',
      description: 'Prix du pack (ex: 29)',
      validation: (Rule: Rule) => Rule.min(0)
    },
    {
      name: 'currency',
      title: 'Devise',
      type: 'string',
      options: {
        list: [
          { title: 'EUR', value: 'EUR' }
        ]
      },
      initialValue: 'EUR'
    },
    {
      name: 'stripePriceId',
      title: 'Stripe Price ID',
      type: 'string',
      description: 'Identifiant du prix Stripe (ex: price_...)',
      validation: (Rule: Rule) => Rule.required()
    },
    {
      name: 'coverImage',
      title: 'Image de couverture',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'ebookKey',
      title: 'Clé du fichier ebook',
      type: 'string',
      description: 'Chemin du PDF dans le stockage (ex: ebooks/pack-ete.pdf)'
    },
    {
      name: 'recipes',
      title: 'Recettes incluses',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'recipe' }] }],
      options: { sortable: true },
      validation: (Rule: Rule) => Rule.min(1)
    },
    {
      name: 'isActive',
      title: 'Actif',
      type: 'boolean',
      initialValue: true,
      description: 'Masquer ou afficher ce pack dans la boutique'
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'coverImage',
      recipes: 'recipes'
    },
    prepare(selection: any) {
      const { title, media, recipes } = selection
      const count = Array.isArray(recipes) ? recipes.length : 0
      return {
        title,
        subtitle: count ? `${count} recette${count > 1 ? 's' : ''}` : 'Aucune recette liée',
        media
      }
    }
  }
}
