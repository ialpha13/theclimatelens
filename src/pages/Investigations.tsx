import { useContent } from '../data/content';
import ArticleCard from '../components/ArticleCard';
import SectionHeader from '../components/SectionHeader';
import { ShieldAlert, Fingerprint, Eye, Award } from 'lucide-react';

interface InvestigationsProps {
  onSelectArticle: (articleId: string) => void;
}

export default function Investigations({ onSelectArticle }: InvestigationsProps) {
  const { articles } = useContent();
  // Extract articles that are explicitly flagged as long-form investigations
  const investigationsList = articles.filter((a) => a.isInvestigation);

  return (
    <div className="space-y-12 animate-in fade-in duration-500" id="investigations-view">
      
      <SectionHeader 
        title="Investigations Desk" 
        tagline="Multi-month, evidence-based audits examining corporate forestry offsets, municipal heat divides, and fossil regulations."
        monoLabel="LONG-FORM REPORTAGE"
      />

      {/* Desk Statement Banner layout */}
      <section className="bg-[#401212] border border-red-950/40 text-red-50 p-6 sm:p-10 rounded-xl relative overflow-hidden flex flex-col md:flex-row items-center gap-6 md:gap-10">
        <div className="absolute -right-10 -bottom-10 h-36 w-36 bg-red-900/10 rounded-full" />
        <div className="p-4 bg-red-900/30 text-gold border border-gold/20 rounded-full flex-shrink-0 animate-pulse">
          <Fingerprint className="h-10 w-10" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-gold">
            <ShieldAlert className="h-4.5 w-4.5" />
            <span>Active Corruption / Greenwashing Trackers Active</span>
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white">
            Editorial Independence Guarantee
          </h3>
          <p className="font-sans text-xs sm:text-sm text-[#e6cdc7] leading-relaxed max-w-2xl">
            Our newsroom operates in isolation from corporate sponsors, political action committees, or climate lobbying capital. Secure whistleblower transmission channels are fully monitored under strict legal shields.
          </p>
        </div>
      </section>

      {/* Long-form articles list volume */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-sage/15 pb-2">
          <span className="font-mono text-[10px] uppercase font-bold text-sage">Active Investigations</span>
          <span className="text-xs text-sage font-mono font-bold bg-sage/10 px-2 py-0.5 rounded-full">{investigationsList.length} items</span>
        </div>

        <div className="grid grid-cols-1 gap-8" id="investigations-archive-list">
          {investigationsList.map((article) => (
            <ArticleCard 
              key={article.id} 
              article={article} 
              onSelect={onSelectArticle} 
              layout="list" // Lists work beautifully for long form investigative reports
            />
          ))}
        </div>
      </div>

      {/* Awards Panel */}
      <div className="border border-forest/15 bg-white p-6 rounded-lg text-center max-w-3xl mx-auto space-y-3">
        <Award className="h-7 w-7 text-gold mx-auto" />
        <span className="font-mono text-[9px] uppercase tracking-wider font-bold text-sage">Journalistic Accolades</span>
        <h4 className="font-serif font-bold text-lg text-forest">Award-Winning Climate Monitoring</h4>
        <p className="font-sans text-xs text-sage leading-relaxed">
          The Climate Lens has been recognized for outstanding investigative reporting in environmental physics and corporate regulatory compliance. Support our independent reporting by tipping our newsroom.
        </p>
      </div>

    </div>
  );
}
