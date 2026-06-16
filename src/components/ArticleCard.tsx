import React from 'react';
import { Article } from '../types';
import { useContent } from '../data/content';
import { Clock, Calendar, ArrowUpRight, ShieldAlert } from 'lucide-react';

interface ArticleCardProps {
  key?: any;
  article: Article;
  onSelect: (articleId: string) => void;
  layout?: 'grid' | 'list' | 'card-dense';
}

export default function ArticleCard({ article, onSelect, layout = 'grid' }: ArticleCardProps) {
  const { authors } = useContent();
  const author = authors.find((a) => a.id === article.authorId) || authors[0];

  // Helper to assign colors to specific journalistic categories of our platform
  const getCategoryTheme = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'investigations':
        return { bg: 'bg-red-950/20 text-red-500 border-red-950/40', text: 'text-red-500' };
      case 'climate explained':
        return { bg: 'bg-[#ede5d5] text-gold border-gold/30', text: 'text-gold' };
      case 'policy & adaptation':
        return { bg: 'bg-teal-950/25 text-teal-600 border-teal-950/45', text: 'text-teal-600' };
      case 'biodiversity & science':
        return { bg: 'bg-emerald-950/25 text-emerald-600 border-emerald-950/45', text: 'text-emerald-700' };
      default:
        return { bg: 'bg-forest/5 text-forest border-forest/15', text: 'text-forest' };
    }
  };

  const themeColors = getCategoryTheme(article.category);

  if (layout === 'card-dense') {
    return (
      <button 
        onClick={() => onSelect(article.id)}
        className="flex items-start gap-4 text-left p-3 rounded-lg hover:bg-sage/10 transition-colors group cursor-pointer border-0 w-full focus:outline-none focus:ring-1 focus:ring-sage"
        id={`article-card-dense-${article.id}`}
      >
        <img 
          src={article.featuredImage} 
          alt={article.title}
          referrerPolicy="no-referrer"
          className="h-16 w-16 md:h-20 md:w-20 rounded-md object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <span className="font-mono text-[9px] uppercase tracking-wider font-bold text-sage">
            {article.category}
          </span>
          <h4 className="font-serif text-sm sm:text-base font-bold text-forest leading-tight mt-1 group-hover:text-gold transition-colors block line-clamp-2">
            {article.title}
          </h4>
          <span className="font-sans text-[11px] text-sage block mt-1">
            {article.readingTime}
          </span>
        </div>
      </button>
    );
  }

  if (layout === 'list') {
    return (
      <article 
        className="editorial-grid md:gap-8 border-b border-forest/15 py-8 hover:bg-forest/[0.02] transition-colors rounded-lg px-2 group"
        id={`article-card-list-${article.id}`}
      >
        {/* Photo Block - col span 4 on tablet/desktop */}
        <div className="col-span-12 md:col-span-4 max-h-56 relative overflow-hidden rounded-lg border border-forest/15">
          <img 
            src={article.featuredImage} 
            alt={article.title}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-102"
          />
          {article.isInvestigation && (
            <div className="absolute top-3 left-3 bg-red-950 text-white font-mono text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded shadow flex items-center gap-1.5 bg-[#401212]">
              <ShieldAlert className="h-3 w-3" />
              <span>Investigation</span>
            </div>
          )}
        </div>

        {/* Content Block - col span 8 */}
        <div className="col-span-12 md:col-span-8 flex flex-col justify-between pt-3 md:pt-0">
          <div>
            <div className="flex items-center gap-3">
              <span className={`px-2 py-0.5 rounded border font-mono text-[9px] uppercase tracking-wider font-bold ${themeColors.bg}`}>
                {article.category}
              </span>
              <span className="text-xs text-sage font-mono">{article.publishedDate}</span>
            </div>

            <button
              onClick={() => onSelect(article.id)}
              className="text-left block mt-3 border-0 bg-transparent p-0 cursor-pointer focus:outline-none"
            >
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-forest hover:text-gold transition-colors duration-300 leading-tight">
                {article.title}
              </h3>
            </button>

            <p className="font-sans text-sm text-[#4a4947] mt-2 line-clamp-2 leading-relaxed">
              {article.excerpt}
            </p>
          </div>

          {/* Footer Metadata */}
          <div className="flex items-center justify-between mt-4 border-t border-forest/10 pt-4">
            <div className="flex items-center gap-2">
              <img 
                src={author.image} 
                alt={author.name}
                referrerPolicy="no-referrer"
                className="h-6 w-6 rounded-full object-cover border border-forest/15"
              />
              <span className="font-sans text-xs font-semibold text-forest">
                {author.name}
              </span>
            </div>

            <button
              onClick={() => onSelect(article.id)}
              className="flex items-center gap-1 text-xs font-mono uppercase tracking-widest font-bold text-sage hover:text-gold transition-colors bg-transparent border-0 cursor-pointer"
            >
              <span>Read Full Story</span>
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </article>
    );
  }

  // Grid Layout
  return (
    <article 
      className="bg-white rounded-lg border border-forest/15 flex flex-col justify-between overflow-hidden hover:border-forest/30 hover:shadow-xs transition-all duration-300 group"
      id={`article-card-grid-${article.id}`}
    >
      {/* Image zoom */}
      <div className="relative aspect-video overflow-hidden border-b border-forest/15">
        <img 
          src={article.featuredImage} 
          alt={article.title}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-102"
        />
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <span className={`px-2.5 py-0.5 rounded border font-mono text-[9px] uppercase tracking-wider font-bold shadow-sm ${themeColors.bg}`}>
            {article.category}
          </span>
          {article.isInvestigation && (
            <span className="bg-[#401212] text-[#fbebeb] border border-red-950 font-mono text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 rounded shadow-sm flex items-center gap-1 self-start">
              <span>Investigation</span>
            </span>
          )}
        </div>
      </div>

      {/* Main Content Info */}
      <div className="p-5 flex-1 flex flex-col justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 text-xs text-sage font-mono mb-2">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{article.readingTime}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{article.publishedDate}</span>
            </div>
          </div>

          <button
            onClick={() => onSelect(article.id)}
            className="text-left block border-0 bg-transparent p-0 cursor-pointer focus:outline-none"
          >
            <h3 className="font-serif text-lg sm:text-xl font-bold text-forest group-hover:text-gold transition-colors duration-300 leading-snug line-clamp-2">
              {article.title}
            </h3>
          </button>

          <p className="font-sans text-xs sm:text-sm text-[#4a4947] mt-2 line-clamp-3 leading-relaxed">
            {article.excerpt}
          </p>
        </div>

        {/* Brand/Author metadata row */}
        <div className="flex items-center justify-between border-t border-forest/10 pt-3">
          <div className="flex items-center gap-1.5">
            <img 
              src={author.image} 
              alt={author.name}
              referrerPolicy="no-referrer"
              className="h-5 w-5 rounded-full object-cover border border-forest/15"
            />
            <span className="font-mono text-[10px] text-sage font-bold">
              {author.name}
            </span>
          </div>

          <button
            onClick={() => onSelect(article.id)}
            className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#8b8a85] group-hover:text-gold transition-all flex items-center gap-0.5 border-0 bg-transparent cursor-pointer"
          >
            <span>Explore</span>
            <ArrowUpRight className="h-3.5 w-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </article>
  );
}
