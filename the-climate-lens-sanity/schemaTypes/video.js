export default {
  name: 'videoReel',
  title: 'Video / Reel',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required().max(120) },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (Rule) => Rule.required() },
    { name: 'category', title: 'Category', type: 'reference', to: [{ type: 'category' }] },
    { name: 'thumbnail', title: 'Thumbnail', type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', title: 'Alt Text', type: 'string' }] },
    { name: 'videoUrl', title: 'Video URL', type: 'url', validation: (Rule) => Rule.required() },
    {
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: {
        list: ['YouTube', 'Vimeo', 'Cloudinary', 'Mux', 'External'],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    },
    { name: 'description', title: 'Description', type: 'text', rows: 3 },
    { name: 'publishedAt', title: 'Published At', type: 'datetime' },
    { name: 'duration', title: 'Duration', type: 'string', description: 'Example: 01:00' },
    { name: 'featured', title: 'Featured', type: 'boolean', initialValue: false },
    { name: 'seoTitle', title: 'SEO Title', type: 'string' },
    { name: 'seoDescription', title: 'SEO Description', type: 'text', rows: 2 },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'platform',
      media: 'thumbnail',
    },
  },
};
