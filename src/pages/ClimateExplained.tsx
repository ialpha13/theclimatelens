import { Article } from '../types';
import { mockArticles } from '../data/mockData';
import ArticleCard from '../components/ArticleCard';
import SectionHeader from '../components/SectionHeader';
import { BookOpen, Sparkles, LayoutGrid } from 'lucide-react';

interface ClimateExplainedProps {
  onSelectArticle: (articleId: string) => void;
}

export default function ClimateExplained({ onSelectArticle }: ClimateExplainedProps) {
  // Extract explainers
  const explainers = mockArticles.filter((a) => a.isExplained);

  return (
    <div className="space-y-12 animate-in fade-in duration-500" id="climate-explained-view">
      
      <SectionHeader 
        title="Climate Explained" 
        tagline="Science, policy, and atmospheric systems translated into clear, rigorous, educational modules."
        monoLabel="EARTH SCIENCE MODULES"
      />

      <section className="bg-forest text-[#ede9e0] p-6 sm:p-10 rounded-xl relative overflow-hidden">
        {/* Abstract design elements representation absolute */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-5 bg-gradient-to-l from-[#f4f1ea] to-transparent pointer-events-none" />
        
        <div className="max-w-xl space-y-4 relative z-10">
          <span className="font-mono text-[9px] uppercase tracking-wider text-gold font-bold bg-[#143224] px-2.5 py-1 rounded">
            SCIENCE PRIMER SERVICES
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight">
            How do we build our educational content?
          </h3>
          <p className="font-sans text-xs sm:text-sm text-[#cac4b7] leading-relaxed">
            Many climate narratives are plagued by alarmist buzzwords or convoluted scientific equations. Our science editors dismantle this barrier: we audit academic peer-reviewed reviews, consult atmospheric experts, and convert complex climate feedback loops into simple, engaging systems reading.
          </p>
        </div>
      </section>

      {/* Grid listing */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 border-b border-forest/15 pb-2">
          <BookOpen className="h-4 w-4 text-sage" />
          <span className="font-mono text-[10px] uppercase font-bold text-sage">Systems Explainers Index</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="explainers-grid-container">
          {explainers.map((story) => (
            <div 
              key={story.id}
              className="bg-white rounded-lg border border-forest/15 overflow-hidden hover:border-forest/30 hover:shadow-xs transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Photo Area */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img 
                  src={story.featuredImage} 
                  alt={story.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                />
                <div className="absolute top-3 left-3 bg-[#132d20] border border-forest/20 text-white font-mono text-[9px] uppercase px-2.5 py-1 rounded shadow flex items-center gap-1">
                  <Sparkles className="h-3 w-3 text-gold" />
                  <span>Module CL-{story.id.slice(0, 3).toUpperCase()}</span>
                </div>
              </div>

              {/* Information Area */}
              <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-wider font-bold text-sage">
                    {story.category}
                  </span>
                  <button
                    onClick={() => onSelectArticle(story.id)}
                    className="text-left font-serif font-bold text-xl text-forest hover:text-gold transition-colors leading-tight mt-1 mb-2 block bg-transparent border-0 cursor-pointer p-0"
                  >
                    {story.title}
                  </button>
                  <p className="font-sans text-xs sm:text-sm text-sage leading-relaxed line-clamp-3">
                    {story.excerpt}
                  </p>
                </div>

                <div className="flex justify-between items-center text-xs font-mono text-sage pt-3 border-t border-forest/10">
                  <span>{story.readingTime}</span>
                  <button 
                    onClick={() => onSelectArticle(story.id)}
                    className="text-gold font-bold hover:underline cursor-pointer bg-transparent border-0"
                  >
                    Load Lesson →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
