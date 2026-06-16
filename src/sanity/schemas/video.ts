// Sanity CMS Schema Definition for Video/Reel
export default {
  name: 'videoReel',
  title: 'Video / Reel',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required().max(100),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'e.g., "Field Briefing" or "Science Short"',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'thumbnail',
      title: 'Thumbnail Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'videoUrl',
      title: 'Video URL or Embed URL',
      type: 'url',
      description: 'Link to vertical video file or hosted YouTube/Vimeo stream',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 2,
      validation: (Rule: any) => Rule.required().max(150),
    },
    {
      name: 'publishedDate',
      title: 'Published Date',
      type: 'date',
      validation: (Rule: any) => Rule.required(),
    }
  ],
};
