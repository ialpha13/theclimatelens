export default {
  name: 'subscriber',
  title: 'Subscriber',
  type: 'document',
  fields: [
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    },
    {
      name: 'subscribedAt',
      title: 'Subscribed At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'source',
      title: 'Source',
      type: 'string',
      initialValue: 'website',
    },
    {
      name: 'page',
      title: 'Page',
      type: 'string',
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Active', value: 'active' },
          { title: 'Unsubscribed', value: 'unsubscribed' },
        ],
      },
      initialValue: 'active',
    },
  ],
  preview: {
    select: {
      title: 'email',
      subtitle: 'status',
    },
  },
};
