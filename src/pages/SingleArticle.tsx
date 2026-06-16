import { Article } from '../types';
import { mockArticles, mockAuthors } from '../data/mockData';
import ArticleCard from '../components/ArticleCard';
import NewsletterSignup from '../components/NewsletterSignup';
import { 
  ArrowLeft, Calendar, Clock, Share2, Twitter, Facebook, Linkedin, 
  Link2, CheckCircle2, Bookmark, Eye, Heart, Sparkles 
} from 'lucide-react';
import { useState, useMemo, useEffect } from 'react';

interface SingleArticleProps {
  articleId: string;
  onBack: () => void;
  onSelectArticle: (articleId: string) => void;
}

export default function SingleArticle({ articleId, onBack, onSelectArticle }: SingleArticleProps) {
  const [copied, setCopied] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [likes, setLikes] = useState(128);
  const [hasLiked, setHasLiked] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const article = useMemo(() => {
    return mockArticles.find((a) => a.id === articleId) || mockArticles[0];
  }, [articleId]);

  const author = useMemo(() => {
    return mockAuthors.find((a) => a.id === article.authorId) || mockAuthors[0];
  }, [article.authorId]);

  const relatedArticles = useMemo(() => {
    return mockArticles
      .filter((a) => a.id !== article.id && (a.category === article.category || a.featured))
      .slice(0, 3);
  }, [article.id, article.category]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLike = () => {
    if (hasLiked) {
      setLikes(likes - 1);
      setHasLiked(false);
    } else {
      setLikes(likes + 1);
      setHasLiked(true);
    }
  };

  // Safe custom parser to convert our mock markdown string into elegant HTML
  const parsedBody = useMemo(() => {
    const rawLines = article.body.split('\n');
    let hasAddedDropCap = false;

    return rawLines.map((line, idx) => {
      const trimmed = line.trim();
      if (!trimmed) return <div key={idx} className="h-4" />;

      // Header H2
      if (trimmed.startsWith('## ')) {
        return (
          <h2 key={idx} className="font-serif text-2xl sm:text-3xl font-bold text-forest mt-8 mb-4 tracking-tight">
            {trimmed.substring(3)}
          </h2>
        );
      }

      // Blockquotes
      if (trimmed.startsWith('> ')) {
        return (
          <blockquote key={idx} className="my-8 border-l-4 border-gold pl-6 py-2 bg-sage/5 rounded-r">
            <p className="font-serif text-lg italic text-forest leading-relaxed">
              {trimmed.substring(2).replace(/"/g, '')}
            </p>
          </blockquote>
        );
      }

      // Bullet points
      if (trimmed.startsWith('- ')) {
        return (
          <li key={idx} className="font-sans text-sm sm:text-base text-sage-dark ml-6 list-disc mb-2 leading-relaxed">
            {trimmed.substring(2)}
          </li>
        );
      }

      // Standard Paragraphs with Dropcap for the very first paragraph!
      if (!hasAddedDropCap && !trimmed.startsWith('##') && !trimmed.startsWith('>') && !trimmed.startsWith('-')) {
        hasAddedDropCap = true;
        return (
          <p key={idx} className="font-sans text-sm sm:text-lg text-charcoal leading-relaxed mb-6 first-letter:float-left first-letter:text-6xl first-letter:font-serif first-letter:font-bold first-letter:mr-3 first-letter:text-forest first-letter:leading-[0.80]">
            {trimmed}
          </p>
        );
      }

      return (
        <p key={idx} className="font-sans text-sm sm:text-base text-charcoal leading-relaxed mb-6">
          {trimmed}
        </p>
      );
    });
  }, [article.body]);

  return (
    <div className="space-y-12 animate-in fade-in duration-500 max-w-5xl mx-auto" id={`single-article-${article.id}`}>
      
      {/* Floating high-end reading progress indicator bar */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-transparent z-50 pointer-events-none">
        <div 
          className="h-full bg-gold transition-all duration-75 ease-out shadow-xs"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
      
      {/* Dynamic SEO Tag simulation under state context */}
      <div className="hidden" id="seo-meta-simulator">
        <title>{article.seoTitle || article.title}</title>
        <meta name="description" content={article.seoDescription || article.excerpt} />
      </div>

      {/* Top back navigation and toolbar menu */}
      <div className="flex items-center justify-between border-b border-sage-light pb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-sage hover:text-forest cursor-pointer bg-none border-0 group focus:outline-none"
          id="article-back-nav"
        >
          <ArrowLeft className="h-4 w-4 transform group-hover:-translate-x-1 transition-transform" />
          <span>Back to Articles</span>
        </button>

        <div className="flex items-center gap-3">
          {/* Like */}
          <button
            onClick={handleLike}
            className={`p-2 rounded-full border transition-all cursor-pointer border-sage-light ${
              hasLiked ? 'bg-red-50 text-red-600 border-red-200' : 'bg-transparent text-sage hover:text-forest'
            }`}
            id="article-like-btn"
            title="Like article"
          >
            <Heart className={`h-4 w-4 ${hasLiked ? 'fill-current' : ''}`} />
          </button>

          {/* Bookmark */}
          <button
            onClick={() => setBookmarked(!bookmarked)}
            className={`p-2 rounded-full border transition-all cursor-pointer border-sage-light ${
              bookmarked ? 'bg-gold/10 text-gold border-gold/40' : 'bg-transparent text-sage hover:text-[#9e7c1c]'
            }`}
            id="article-bookmark-btn"
            title="Bookmark article"
          >
            <Bookmark className={`h-4 w-4 ${bookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* ARTICLE HEADER BLOCK */}
      <header className="space-y-6 text-center max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-3">
          <span className="px-3 py-1 rounded bg-forest/5 text-forest border border-forest/15 font-mono text-[9px] uppercase tracking-wider font-bold">
            {article.category}
          </span>
          <span className="text-xs text-sage font-mono">{article.publishedDate}</span>
          <span className="text-xs text-sage font-mono">•</span>
          <span className="text-xs text-sage font-mono">{article.readingTime}</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-forest leading-tight">
          {article.title}
        </h1>

        <p className="font-sans text-sm sm:text-lg italic text-sage max-w-2xl mx-auto leading-relaxed">
          "{article.excerpt}"
        </p>

        {/* Author details card row */}
        <div className="flex items-center justify-center gap-3 border-t border-b border-sage-light py-4 max-w-xl mx-auto">
          <img 
            src={author.image} 
            alt={author.name}
            referrerPolicy="no-referrer"
            className="h-10 w-10 rounded-full object-cover border border-sage-light"
          />
          <div className="text-left">
            <span className="font-serif font-bold text-forest text-sm sm:text-base block">By {author.name}</span>
            <span className="font-mono text-[9px] uppercase tracking-widest text-sage block leading-none mt-1">
              {author.role}
            </span>
          </div>
        </div>
      </header>

      {/* FEATURED COVER PHOTO CONTAINER */}
      <div className="relative aspect-[16/9] max-h-[500px] overflow-hidden rounded-xl border border-sage-light shadow-md" id="article-cover-media">
        <img 
          src={article.featuredImage} 
          alt={article.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
        {article.isInvestigation && (
          <div className="absolute bottom-4 left-4 bg-[#401212] text-[#fbebeb] border border-red-950 font-mono text-[10px] uppercase font-bold tracking-widest px-3 py-1.5 rounded shadow flex items-center gap-1.5 shadow-lg">
            <Sparkles className="h-4.5 w-4.5 text-gold" />
            <span>Active Investigation Target</span>
          </div>
        )}
      </div>

      {/* ARTICLE BODY & SOCIAL SHARING (GRID LAYOUT) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12" id="article-reading-section">
        {/* Left column share panel (Sticky on large view) col span 2 */}
        <div className="lg:col-span-2 lg:sticky lg:top-28 self-start flex lg:flex-col items-center justify-center lg:justify-start gap-4 border-b lg:border-b-0 lg:border-r border-sage-light pb-4 lg:pb-0 lg:pr-6 h-auto">
          <span className="font-mono text-[9px] uppercase tracking-wider font-bold text-sage-light block">Share File</span>
          
          <button 
            onClick={handleCopyLink}
            className="flex items-center justify-center p-2.5 rounded-full border border-sage-light bg-[#fdfcfb] text-sage hover:text-gold hover:border-gold transition-colors cursor-pointer"
            id="share-link-btn"
            title="Copy URL link"
          >
            {copied ? <CheckCircle2 className="h-4 w-4 text-emerald-600" /> : <Link2 className="h-4 w-4" />}
          </button>

          <a 
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center p-2.5 rounded-full border border-sage-light bg-[#fdfcfb] text-sage hover:text-[#1da1f2] hover:border-[#1da1f2]/40 transition-colors"
            title="Share on Twitter"
          >
            <Twitter className="h-4 w-4 fill-current" />
          </a>

          <a 
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center p-2.5 rounded-full border border-sage-light bg-[#fdfcfb] text-sage hover:text-[#1877f2] hover:border-[#1877f2]/40 transition-colors"
            title="Share on Facebook"
          >
            <Facebook className="h-4 w-4 fill-current" />
          </a>

          <a 
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center p-2.5 rounded-full border border-sage-light bg-[#fdfcfb] text-sage hover:text-[#0a66c2] hover:border-[#0a66c2]/40 transition-colors"
            title="Share on LinkedIn"
          >
            <Linkedin className="h-4 w-4 fill-current" />
          </a>
        </div>

        {/* Center column article body paragraphs (col span 7) */}
        <div className="lg:col-span-7 prose max-w-none text-charcoal">
          <div className="space-y-6">
            {parsedBody}
          </div>

          {/* Author bibliography panel */}
          <div className="mt-12 p-6 bg-earth-dark/40 border border-sage-light rounded-lg space-y-3" id="author-credit-card">
            <h4 className="font-serif font-bold text-forest text-base sm:text-lg">About The Reporter</h4>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <img 
                src={author.image} 
                alt={author.name}
                referrerPolicy="no-referrer"
                className="h-14 w-14 rounded-full object-cover border border-sage-light flex-shrink-0"
              />
              <div className="space-y-1">
                <span className="font-sans font-bold text-forest text-sm block leading-none">{author.name}</span>
                <p className="font-sans text-xs text-sage leading-relaxed">
                  {author.bio}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: small dynamic items feed (col span 3) */}
        <div className="lg:col-span-3 space-y-6">
          <div className="border border-sage-light bg-[#fdfcfb] rounded-lg p-4 space-y-4">
            <span className="font-mono text-[9px] uppercase tracking-wider font-bold text-sage">Section Metadata</span>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between border-b border-sage/10 pb-1.5">
                <span className="text-sage">Tags:</span>
                <span className="font-semibold text-right">{article.tags.slice(0, 2).join(', ')}</span>
              </div>
              <div className="flex justify-between border-b border-sage/10 pb-1.5">
                <span className="text-sage">Standard Code:</span>
                <span className="font-mono text-sage font-bold">CL-{article.id.slice(0, 4).toUpperCase()}</span>
              </div>
              <div className="flex justify-between pb-1">
                <span className="text-sage">Platform Trust:</span>
                <span className="text-emerald-700 font-bold uppercase tracking-wider text-[9px]">Verified PGP</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RELATED STORIES BLOCK */}
      <section className="space-y-6 pt-12 border-t border-sage-light" id="related-stories-section">
        <h3 className="font-serif text-2xl font-bold text-forest">Related Investigations</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedArticles.map((rel) => (
            <div 
              key={rel.id} 
              className="bg-[#fdfcfb] rounded-lg border border-sage-light overflow-hidden shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div className="relative aspect-video">
                <img src={rel.featuredImage} alt={rel.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded border border-gold/30 bg-[#ede5d5] text-gold font-mono text-[8px] uppercase tracking-wider font-bold">
                  {rel.category}
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between gap-3">
                <button
                  onClick={() => onSelectArticle(rel.id)}
                  className="text-left font-serif font-bold text-sm sm:text-base text-forest group-hover:text-gold transition-colors leading-snug block line-clamp-2 bg-transparent border-0 cursor-pointer"
                >
                  {rel.title}
                </button>
                <div className="flex justify-between items-center text-[10px] font-mono text-sage pt-2 border-t border-sage/10">
                  <span>{rel.publishedDate}</span>
                  <button 
                    onClick={() => onSelectArticle(rel.id)}
                    className="text-gold font-bold uppercase tracking-wider hover:underline border-0 bg-transparent cursor-pointer"
                  >
                    Open Story
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MAILING LIST BLOCK */}
      <NewsletterSignup />

    </div>
  );
}
