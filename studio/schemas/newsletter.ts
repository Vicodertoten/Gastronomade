// studio/schemas/newsletter.ts
import type { Rule } from '@sanity/types'

export const newsletter = {
  name: 'newsletter',
  title: 'Abonnés newsletter',
  type: 'document',
  fields: [
    {
      name: 'email',
      title: 'Adresse email',
      type: 'string',
      validation: (Rule: Rule) => Rule.required().email()
    },
    {
      name: 'subscribedAt',
      title: 'Date d\'inscription',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    },
    {
      name: 'status',
      title: 'Statut',
      type: 'string',
      options: {
        list: [
          { title: 'Actif', value: 'active' },
          { title: 'Désabonné', value: 'unsubscribed' }
        ]
      },
      initialValue: 'active'
    }
  ],
  preview: {
    select: {
      title: 'email',
      subtitle: 'subscribedAt'
    }
  }
};
