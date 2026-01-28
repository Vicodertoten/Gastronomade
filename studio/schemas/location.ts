// schemas/location.ts
export const location = {
  name: 'location',
  title: 'Locations (La Zboum)',
  type: 'document',
  fields: [
    {
      name: 'type',
      title: 'Type de location',
      type: 'string',
      options: {
        list: [
          { title: 'Sociétés', value: 'societe' },
          { title: 'Privé', value: 'prive' }
        ]
      },
      description: 'Choisissez le type d\'événement'
    },
    {
      name: 'title',
      title: 'Titre de l\'offre',
      type: 'string',
      description: 'Ex: "Réunions d\'entreprise" ou "Événements privés"'
    },
    {
      name: 'subtitle',
      title: 'Sous-titre',
      type: 'string',
      description: 'Ex: "Réunions & Team-Buildings" ou "Événements personnels"'
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
      title: 'Points forts',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Liste des avantages et équipements disponibles',
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
      description: 'Description complète de l\'offre de location'
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
