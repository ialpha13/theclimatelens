import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Article, Author, Category, Video } from '../types';
import { fetchSanityContent, isSanityConfigured, SanityContent } from '../sanity/client';
import { mockArticles, mockAuthors, mockCategories, mockVideos } from './mockData';

interface ContentContextValue {
  articles: Article[];
  authors: Author[];
  categories: Category[];
  videos: Video[];
  source: 'sanity' | 'fallback';
  isLoading: boolean;
}

const fallbackContent: SanityContent = {
  articles: mockArticles,
  authors: mockAuthors,
  categories: mockCategories,
  videos: mockVideos,
};

const ContentContext = createContext<ContentContextValue>({
  ...fallbackContent,
  source: 'fallback',
  isLoading: false,
});

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<SanityContent>(fallbackContent);
  const [source, setSource] = useState<'sanity' | 'fallback'>('fallback');
  const [isLoading, setIsLoading] = useState(isSanityConfigured);

  useEffect(() => {
    let isMounted = true;

    if (!isSanityConfigured) {
      setIsLoading(false);
      return;
    }

    fetchSanityContent()
      .then((sanityContent) => {
        if (!isMounted || !sanityContent) return;

        setContent({
          articles: sanityContent.articles.length ? sanityContent.articles : fallbackContent.articles,
          authors: sanityContent.authors.length ? sanityContent.authors : fallbackContent.authors,
          categories: sanityContent.categories.length ? sanityContent.categories : fallbackContent.categories,
          videos: sanityContent.videos.length ? sanityContent.videos : fallbackContent.videos,
        });
        setSource('sanity');
      })
      .catch((error) => {
        console.warn('Sanity content unavailable, using bundled editorial fallback.', error);
        setSource('fallback');
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const value = useMemo(
    () => ({
      ...content,
      source,
      isLoading,
    }),
    [content, source, isLoading]
  );

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export const useContent = () => useContext(ContentContext);
