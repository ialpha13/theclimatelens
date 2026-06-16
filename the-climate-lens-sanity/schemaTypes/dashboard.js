export default {
  name: 'climateDashboard',
  title: 'Climate Dashboard',
  type: 'document',
  fields: [
    { name: 'heading', title: 'Heading', type: 'string', initialValue: 'Atmospheric Stress Ledger' },
    { name: 'kicker', title: 'Kicker', type: 'string', initialValue: 'CL-Atmospheric-Monitor' },
    { name: 'description', title: 'Description', type: 'text', rows: 3, initialValue: 'An active ledger of direct physical planet metrics. Read baselines, click trend vectors, or view empirical impact profiles.' },
    {
      name: 'indicators',
      title: 'Indicators',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'id', title: 'ID', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'subtitle', title: 'Subtitle', type: 'string' },
            { name: 'currentValue', title: 'Current Value', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'baselineValue', title: 'Baseline Value', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'changeRate', title: 'Change Rate', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'source', title: 'Source', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'impact', title: 'Impact Notes', type: 'array', of: [{ type: 'string' }] },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'kicker',
    },
  },
};
