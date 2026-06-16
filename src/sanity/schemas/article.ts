// Sanity CMS Schema Definition for Article
export default {
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required().max(100),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'publishedDate',
      title: 'Published Date',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          validation: (Rule: any) => Rule.required(),
        }
      ],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      validation: (Rule: any) => Rule.required().max(200),
    },
    {
      name: 'bodyContent',
      title: 'Body Content',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image' }
      ],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'readingTime',
      title: 'Reading Time',
      type: 'string',
      description: 'e.g., "5 min read"',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'featuredArticleToggle',
      title: 'Featured Article Toggle',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'isInvestigation',
      title: 'Is Long-Form Investigation',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'isExplained',
      title: 'Is Climate Explained article',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      description: 'Override title for SEO. Ideal: under 60 characters.',
    },
    {
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 2,
      description: 'Override meta description for SEO. Ideal: under 160 characters.',
    }
  ],
};
