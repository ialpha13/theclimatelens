import React from 'react';
import { Article, Video } from '../types';
import { mockArticles, mockVideos, mockCategories } from '../data/mockData';
import ArticleCard from '../components/ArticleCard';
import VideoCard from '../components/VideoCard';
import SectionHeader from '../components/SectionHeader';
import NewsletterSignup from '../components/NewsletterSignup';
import AtmosphericMonitor from '../components/AtmosphericMonitor';
import { Eye, ShieldCheck, Compass, MessageSquare, ArrowUpRight, Award, ShieldAlert, Sparkles, BookOpen } from 'lucide-react';

interface HomeProps {
  onSelectArticle: (articleId: string) => void;
  onTabChange: (tabId: string) => void;
}

export default function Home({ onSelectArticle, onTabChange }: HomeProps) {
  const featuredArticle = mockArticles.find((a) => a.featured) || mockArticles[0];
  const secondaryStories = mockArticles.filter((a) => a.id !== featuredArticle.id && !a.isExplained).slice(0, 3);
  const explainerStories = mockArticles.filter((a) => a.isExplained).slice(0, 2);
  const videoReels = mockVideos.slice(0, 4);

  return (
    <div className="space-y-16 animate-in fade-in duration-500" id="home-view">
      {/* HERO */}
      <section 
        className="bg-forest text-earth-beige py-16 md:py-24 relative overflow-hidden" 
        id="hero-banner"
        style={{
          backgroundImage: 'url(/assets/images/homehero.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.4em] text-gold font-bold bg-[#143224] px-4 py-1.5 rounded-full border border-sage/25 inline-block">
              Watch Earth Through Nature’s Lens
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.1] sm:leading-none">
              Independent, <br />
              Evidence-Based <br className="sm:hidden" />
              <span className="text-gold">Climate Journalism</span>
            </h1>
            <p className="font-sans text-sm sm:text-lg text-[#cac4b7] leading-relaxed max-w-2xl mx-auto">
              We observe Earth’s systems through a scientific lens, translating nature’s signals into rigorous, ad-free climate reporting.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                onClick={() => onTabChange('latest')}
                className="px-6 py-3 bg-gold hover:bg-yellow-600 text-forest font-bold text-xs uppercase tracking-widest rounded-md cursor-pointer transition-colors"
                id="hero-read-latest-btn"
              >
                Explore Latest Stories
              </button>
              <button
                onClick={() => onTabChange('investigations')}
                className="px-6 py-3 border border-sage-light hover:bg-earth-beige/10 text-earth-beige font-bold text-xs uppercase tracking-widest rounded-md cursor-pointer transition-all"
                id="hero-investigations-btn"
              >
                Long-Form Investigations
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        <section id="atmospheric-stress-dashboard" className="pt-8">
          <AtmosphericMonitor />
        </section>

        <section className="space-y-6" id="home-featured-story">
          <SectionHeader 
            title="Featured Reportage" 
            tagline="Our primary investigation of the week, detailing ecological stressors and direct human testimony."
            monoLabel="LEAD INVESTIGATION"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white rounded-xl border border-forest/15 overflow-hidden hover:border-forest/30 transition-all duration-500">
            <div className="lg:col-span-7 relative max-h-[460px] lg:max-h-[600px] overflow-hidden">
              <img 
                src={featuredArticle.featuredImage} 
                alt={featuredArticle.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transform hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 bg-[#401212] text-white border border-red-950 px-3 py-1 rounded font-mono text-[10px] uppercase font-bold tracking-widest flex items-center gap-1">
                <ShieldAlert className="h-4.5 w-4.5 text-gold" />
                <span>Featured Report</span>
              </div>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="px-3 py-1 rounded bg-[#ede5d5] text-gold font-mono text-[9px] uppercase tracking-wider font-bold border border-gold/25">
                    {featuredArticle.category}
                  </span>
                  <span className="text-xs text-sage font-mono">{featuredArticle.publishedDate}</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-forest leading-tight mb-4">
                  {featuredArticle.title}
                </h3>
                <p className="font-sans text-sm sm:text-base text-sage leading-relaxed mb-6">
                  {featuredArticle.excerpt}
                </p>
              </div>

              <div className="border-t border-forest/10 pt-6 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="h-7 w-7 rounded-full bg-forest flex items-center justify-center font-mono text-xs font-bold text-[#F9F8F3]">DA</span>
                  <div>
                    <span className="font-mono text-xs font-bold text-forest block">David Alvarez</span>
                    <span className="text-[10px] font-sans text-sage block leading-none">Lead Environmental Reporter</span>
                  </div>
                </div>

                <button
                  onClick={() => onSelectArticle(featuredArticle.id)}
                  className="px-5 py-2.5 bg-forest hover:bg-forest-light text-[#F9F8F3] font-semibold text-xs uppercase tracking-wider rounded transition-colors cursor-pointer border-0"
                  id="featured-story-read-now"
                >
                  Read Investigation
                </button>
              </div>
            </div>
          </div>
        </section>
        {/* Explainers */}
        {explainerStories.length > 0 && (
          <section id="home-explainers" className="space-y-6">
            <SectionHeader
              title="Climate Explained"
              tagline="Short, focused explainers to make complex systems clear."
              monoLabel="EXPLAINERS"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {explainerStories.map((a) => (
                <ArticleCard key={a.id} article={a} onRead={() => onSelectArticle(a.id)} />
              ))}
            </div>
          </section>
        )}

        {/* Latest & Secondary Stories */}
        <section id="home-latest" className="space-y-6">
          <SectionHeader
            title="Latest Stories"
            tagline="Recent reporting from the field and newsroom."
            monoLabel="LATEST"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {secondaryStories.map((s) => (
                  <ArticleCard key={s.id} article={s} onRead={() => onSelectArticle(s.id)} />
                ))}
              </div>
            </div>

            <aside className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-xl border border-forest/10 p-4">
                <h4 className="font-serif text-lg font-bold text-forest mb-2">On The Beat</h4>
                <p className="text-sm text-sage">Short updates and dispatches from reporters in the field.</p>
              </div>

              <div className="bg-white rounded-xl border border-forest/10 p-4">
                <h4 className="font-serif text-lg font-bold text-forest mb-2">Topics</h4>
                <div className="flex flex-wrap gap-2">
                  {mockCategories.slice(0, 6).map((c) => (
                    <span key={c.id} className="px-3 py-1 text-xs rounded bg-forest/5 text-forest font-mono">{c.title}</span>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* Video reels */}
        <section id="home-videos" className="space-y-6">
          <SectionHeader
            title="Field Reports & Video Reels"
            tagline="Short visual pieces from our correspondents and lab demonstrations."
            monoLabel="VIDEO"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {videoReels.map((v) => (
              <VideoCard key={v.id} video={v as Video} />
            ))}
          </div>
        </section>

        {/* Newsletter */}
        <section id="home-newsletter" className="pt-6">
          <NewsletterSignup />
        </section>

      </div>
    </div>
  );
}
