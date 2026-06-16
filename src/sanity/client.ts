import { Article, Author, Category, Video } from '../types';
import { contentQuery } from './queries';

type PortableTextBlock = {
  _type?: string;
  style?: string;
  listItem?: string;
  children?: Array<{ text?: string }>;
};

type SanityArticle = Omit<Article, 'body'> & {
  bodyContent?: PortableTextBlock[];
};

export interface SanityContent {
  authors: Author[];
  categories: Category[];
  articles: Article[];
  videos: Video[];
}

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || '2025-06-01';
const useCdn = import.meta.env.VITE_SANITY_USE_CDN !== 'false';

export const isSanityConfigured = Boolean(projectId && dataset);

const getApiHost = () => {
  const subdomain = useCdn ? 'apicdn' : 'api';
  return `https://${projectId}.${subdomain}.sanity.io/v${apiVersion}/data/query/${dataset}`;
};

const portableTextToMarkdown = (blocks: PortableTextBlock[] = []) => {
  return blocks
    .map((block) => {
      if (block._type !== 'block') return '';

      const text = block.children?.map((child) => child.text || '').join('') || '';
      if (!text.trim()) return '';

      if (block.style === 'h2') return `## ${text}`;
      if (block.style === 'blockquote') return `> ${text}`;
      if (block.listItem) return `- ${text}`;

      return text;
    })
    .filter(Boolean)
    .join('\n\n');
};

const normalizeArticles = (articles: SanityArticle[] = []): Article[] => {
  return articles
    .filter((article) => article.title && article.featuredImage)
    .map((article) => ({
      ...article,
      body: portableTextToMarkdown(article.bodyContent),
      tags: article.tags || [],
      featured: Boolean(article.featured),
      isInvestigation: Boolean(article.isInvestigation),
      isExplained: Boolean(article.isExplained),
    }));
};

export const fetchSanityContent = async (): Promise<SanityContent | null> => {
  if (!isSanityConfigured) return null;

  const url = `${getApiHost()}?query=${encodeURIComponent(contentQuery)}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Sanity request failed with ${response.status}`);
  }

  const payload = await response.json();
  const result = payload.result || {};

  return {
    authors: result.authors || [],
    categories: result.categories || [],
    articles: normalizeArticles(result.articles),
    videos: result.videos || [],
  };
};
