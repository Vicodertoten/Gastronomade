// schemas/restaurant.ts
export const restaurant = {
  name: 'restaurant',
  title: 'Restaurant éphémère',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titre (optionnel)',
      type: 'string',
      description: 'Ex: "Soirée d’hiver" ou laissez vide.'
    },
    {
      name: 'subtitle',
      title: 'Sous-titre',
      type: 'string',
      initialValue: 'Un jeudi par mois',
      description: 'Texte court sous le titre.'
    },
    {
      name: 'image',
      title: 'Image de la carte',
      type: 'image',
      options: { hotspot: true },
      description: 'Image affichée sur la carte Restaurant de la homepage.'
    },
    {
      name: 'imageAlt',
      title: 'Texte alternatif (image)',
      type: 'string',
      description: 'Décrivez l’image pour l’accessibilité.'
    },
    {
      name: 'menuTitle',
      title: 'Titre de la section menu',
      type: 'string',
      initialValue: 'Menu végétal & sauvage',
      description: 'Titre de la section menu'
    },
    {
      name: 'datesTitle',
      title: 'Titre de la section dates',
      type: 'string',
      initialValue: 'Prochaines dates',
      description: 'Titre de la section dates'
    },
    {
      name: 'reservationTitle',
      title: 'Titre de la section réservation',
      type: 'string',
      initialValue: 'Prochaines soirées',
      description: 'Titre au-dessus des dates.'
    },
    {
      name: 'dates',
      title: 'Prochaines dates',
      type: 'array',
      of: [{ type: 'date' }],
      description: 'Sélectionnez les dates des prochains jeudis soir'
    },
    {
      name: 'price',
      title: 'Prix par personne',
      type: 'number',
      initialValue: 50,
      description: 'Prix en euros par personne'
    },
    {
      name: 'menuDescription',
      title: 'Description du menu',
      type: 'text',
      description: 'Décrivez le menu unique de la soirée',
      initialValue: 'Un menu unique, créatif et très végétal, cuisiné au rythme des saisons.'
    },
    {
      name: 'isFull',
      title: 'Complet ?',
      type: 'boolean',
      initialValue: false,
      description: 'Cochez si toutes les places sont réservées'
    },
    {
      name: 'minGuests',
      title: 'Nombre minimum de personnes',
      type: 'number',
      initialValue: 4,
      description: 'Minimum de convives requis'
    },
    {
      name: 'depositAmount',
      title: 'Montant de l\'acompte',
      type: 'number',
      initialValue: 25,
      description: 'Acompte par personne en euros'
    }
  ]
}
