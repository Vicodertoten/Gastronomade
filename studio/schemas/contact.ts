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
      initialValue: 'Contact - Muriel Cruysmans'
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
      initialValue: 'Une question, une envie de cours ou d’atelier ? Écrivez-moi, je vous réponds rapidement.'
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
          initialValue: '+32 478 44 40 65'
        },
        {
          name: 'email',
          title: 'Email',
          type: 'string',
          initialValue: 'muriel.cruysmans@gmail.com'
        },
        {
          name: 'address',
          title: 'Adresse',
          type: 'text',
          initialValue: 'Wavre\nBelgique'
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
          platform: 'Instagram',
          url: 'https://www.instagram.com/manger_vrai',
          label: 'Suivez Muriel sur Instagram'
        },
        {
          platform: 'YouTube',
          url: 'https://www.youtube.com/@murielcruysmans5423/shorts',
          label: 'Voir les vidéos YouTube'
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
          initialValue: 'Pour réserver un cours, un atelier ou un coaching, contactez Muriel par téléphone ou email. Je reviens vers vous rapidement pour fixer une date.'
        },
        {
          name: 'depositInfo',
          title: 'Informations acompte',
          type: 'text',
          initialValue: 'Un acompte peut être demandé selon la formule choisie.'
        }
      ]
    }
  ]
}
