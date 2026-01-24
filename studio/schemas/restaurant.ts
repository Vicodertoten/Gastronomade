// schemas/restaurant.ts
export const restaurant = {
  name: 'restaurant',
  title: 'Restaurant Éphémère',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titre de la soirée',
      type: 'string',
      description: 'Ex: "Soirée Gastronomique d\'Hiver"'
    },
    {
      name: 'subtitle',
      title: 'Sous-titre',
      type: 'string',
      initialValue: 'Un jeudi soir par mois',
      description: 'Ex: "Un jeudi soir par mois"'
    },
    {
      name: 'menuTitle',
      title: 'Titre de la section menu',
      type: 'string',
      initialValue: 'Menu du Chef',
      description: 'Titre de la section menu'
    },
    {
      name: 'datesTitle',
      title: 'Titre de la section dates',
      type: 'string',
      initialValue: 'Prochaines Dates',
      description: 'Titre de la section dates'
    },
    {
      name: 'reservationTitle',
      title: 'Titre de la section réservation',
      type: 'string',
      initialValue: 'Réserver votre soirée',
      description: 'Titre de la section réservation'
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
      description: 'Décrivez le menu unique de la soirée'
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