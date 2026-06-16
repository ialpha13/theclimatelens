export const contentQuery = `{
  "authors": *[_type == "author"] | order(name asc) {
    "id": _id,
    name,
    role,
    bio,
    "image": image.asset->url
  },
  "categories": *[_type == "category"] | order(title asc) {
    "id": _id,
    title,
    "slug": slug.current,
    description
  },
  "articles": *[_type == "article"] | order(publishedDate desc) {
    "id": coalesce(slug.current, _id),
    title,
    "slug": slug.current,
    "category": category->title,
    "authorId": author->_id,
    publishedDate,
    "featuredImage": featuredImage.asset->url,
    excerpt,
    bodyContent,
    tags,
    readingTime,
    "featured": coalesce(featuredArticleToggle, false),
    seoTitle,
    seoDescription,
    "isInvestigation": coalesce(isInvestigation, false),
    "isExplained": coalesce(isExplained, false)
  },
  "videos": *[_type == "videoReel"] | order(publishedDate desc) {
    "id": _id,
    title,
    category,
    "thumbnail": thumbnail.asset->url,
    videoUrl,
    "description": shortDescription,
    publishedDate
  }
}`;
