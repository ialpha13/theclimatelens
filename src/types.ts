export interface Author {
  id: string;
  name: string;
  image: string;
  bio: string;
  role: string;
}

export interface Category {
  id: string;
  title: string;
  slug: string;
  description: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  category: string;
  authorId: string;
  publishedDate: string;
  featuredImage: string;
  excerpt: string;
  body: string;
  tags: string[];
  readingTime: string;
  featured: boolean;
  seoTitle?: string;
  seoDescription?: string;
  isInvestigation?: boolean;
  isExplained?: boolean;
}

export interface Video {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  videoUrl: string; // Embed or simulation link
  description: string;
  publishedDate: string;
}

export interface ContactInquiry {
  name: string;
  email: string;
  inquiryType: string;
  message: string;
  date: string;
}
