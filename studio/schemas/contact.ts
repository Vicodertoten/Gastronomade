// studio/schemas/contact.ts
export const contact = {
  name: 'contact',
  title: 'Contact',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titre de la page',
      type: 'string',
      initialValue: 'Contact - Gastronomade'
    },
    {
      name: 'heroTitle',
      title: 'Titre principal',
      type: 'string',
      initialValue: 'Contactez Muriel'
    },
    {
      name: 'heroSubtitle',
      title: 'Sous-titre',
      type: 'text',
      initialValue: 'Prête à commencer votre voyage culinaire ? Contactez Muriel pour vos réservations et questions.'
    },
    {
      name: 'contactInfo',
      title: 'Informations de contact',
      type: 'object',
      fields: [
        {
          name: 'phone',
          title: 'Téléphone',
          type: 'string',
          initialValue: '+32 485 12 34 56'
        },
        {
          name: 'email',
          title: 'Email',
          type: 'string',
          initialValue: 'muriel@gastronomade.be'
        },
        {
          name: 'address',
          title: 'Adresse',
          type: 'text',
          initialValue: 'Rue de la Gastronomie 42\n1300 Wavre\nBelgique'
        }
      ]
    },
    {
      name: 'socialLinks',
      title: 'Liens réseaux sociaux',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'platform',
            title: 'Plateforme',
            type: 'string',
            options: {
              list: ['Facebook', 'Instagram', 'LinkedIn', 'YouTube']
            }
          },
          {
            name: 'url',
            title: 'URL',
            type: 'url'
          },
          {
            name: 'label',
            title: 'Libellé',
            type: 'string'
          }
        ]
      }],
      initialValue: [
        {
          platform: 'Facebook',
          url: 'https://facebook.com/gastronomade',
          label: 'Suivez-nous sur Facebook'
        },
        {
          platform: 'Instagram',
          url: 'https://instagram.com/gastronomade',
          label: 'Suivez-nous sur Instagram'
        }
      ]
    },
    {
      name: 'bookingInfo',
      title: 'Informations de réservation',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Titre section réservation',
          type: 'string',
          initialValue: 'Réservation'
        },
        {
          name: 'text',
          title: 'Texte explicatif',
          type: 'text',
          initialValue: 'Pour réserver vos cours, ateliers ou location d\'espace, contactez Muriel directement par téléphone ou email. Les réservations sont confirmées sous 48h avec versement d\'un acompte.'
        },
        {
          name: 'depositInfo',
          title: 'Informations acompte',
          type: 'text',
          initialValue: 'Un acompte de 25€ par personne est demandé pour confirmer votre réservation. Cet acompte est déduit du prix final.'
        }
      ]
    }
  ]
}