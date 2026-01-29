// schemas/location.ts
export const location = {
  name: 'location',
  title: 'Privatisation du lieu',
  type: 'document',
  fields: [
    {
      name: 'type',
      title: 'Type d’offre',
      type: 'string',
      options: {
        list: [
          { title: 'Sociétés', value: 'societe' },
          { title: 'Privé', value: 'prive' }
        ]
      },
      description: 'Choisissez la catégorie de l’offre.'
    },
    {
      name: 'title',
      title: 'Titre de l’offre',
      type: 'string',
      description: 'Ex: "Réunions d’équipe" ou "Événements privés".'
    },
    {
      name: 'subtitle',
      title: 'Sous-titre',
      type: 'string',
      description: 'Texte court sous le titre.'
    },
    {
      name: 'price',
      title: 'Prix HTVA',
      type: 'string',
      initialValue: '400€',
      description: 'Prix de location en euros HTVA'
    },
    {
      name: 'features',
      title: 'Points forts (optionnel)',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Liste des avantages et équipements. Peut rester vide.',
      initialValue: [
        'Cadre inspirant et chaleureux',
        'Cuisine entièrement équipée',
        'Parking privé',
        'Accès facile via E411'
      ]
    },
    {
      name: 'description',
      title: 'Description détaillée',
      type: 'text',
      description: 'Texte plus long pour la page de détails.'
    },
    {
      name: 'maxCapacity',
      title: 'Capacité maximale',
      type: 'number',
      description: 'Nombre maximum de personnes'
    },
    {
      name: 'image',
      title: 'Image représentative',
      type: 'image',
      options: {
        hotspot: true
      },
      description: 'Photo de l\'espace',
      validation: (Rule) => Rule.required()
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'type',
      media: 'image'
    }
  }
}
