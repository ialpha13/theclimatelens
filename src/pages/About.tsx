import { useContent } from '../data/content';
import SectionHeader from '../components/SectionHeader';
import { Eye, ShieldCheck, Heart, Award, ArrowUpRight, CheckCircle } from 'lucide-react';

export default function About() {
  const { authors } = useContent();
  return (
    <div className="space-y-16 animate-in fade-in duration-500 max-w-5xl mx-auto" id="about-view">
      
      <SectionHeader 
        title="About The Platform" 
        tagline="The Climate Lens is an independent climate journalism platform that watches climate change, tells evidence-based stories, and makes climate issues easy to understand."
        monoLabel="MISSION & STRUCTURE"
      />

      {/* CORE STATEMENTS */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch" id="about-intro-grid">
        <div className="bg-white rounded-xl border border-forest/15 p-6 sm:p-8 flex flex-col justify-between">
          <div className="space-y-4">
            <span className="font-mono text-[9px] uppercase tracking-wider font-bold text-gold">THE CORE MISSION</span>
            <h3 className="font-serif text-2xl font-bold text-forest leading-snug">
              Evidence Over Editorial Speculation
            </h3>
            <p className="font-sans text-sm text-sage leading-relaxed">
              We believe that environmental journalism should not conform to generic social noise or political polarization. By establishing rigorous factual checklists, reviewing high-resolution polar satellites, and partnering with alpine glaciologists, we present the raw truth of how our atmosphere is reorganizing. Our journalism is evidence-based, scientifically tracked, and completely transparent.
            </p>
          </div>
          
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-forest mt-6">
            <CheckCircle className="h-5 w-5 text-red-700 flex-shrink-0" />
            <span>Dedicated to the Public Interest</span>
          </div>
        </div>

        <div className="bg-forest text-earth-beige p-6 sm:p-8 rounded-xl flex flex-col justify-between">
          <div className="space-y-4">
            <span className="font-mono text-[9px] uppercase tracking-wider text-gold font-bold">ETHICAL STANDARDS</span>
            <h3 className="font-serif text-2xl font-bold text-white leading-snug">
              100% Free of Corporate Compromise
            </h3>
            <p className="font-sans text-sm text-[#cac4b7] leading-relaxed">
              We strictly decline sponsorship money or advertisements from oil, coal, gas, aviation, or financial conglomerates linked to fossil-fuel extraction. We also refuse greenwashing credits or obscure organic offsets allocations. When you read a report from The Climate Lens, you read an account backed solely by public donations and clean scientific trusts.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono font-bold text-gold mt-6">
            <CheckCircle className="h-5 w-5 text-gold flex-shrink-0" />
            <span>Regulated by Clean Ethics Trusts</span>
          </div>
        </div>
      </section>

      {/* THREE DRIVING TENETS */}
      <section className="space-y-8" id="about-tenets">
        <h3 className="font-serif text-2xl font-bold text-forest text-center">Our Tripartite Directives</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          
          <div className="p-6 bg-white border border-forest/15 rounded-lg space-y-3">
            <div className="h-10 w-10 bg-forest/5 text-forest rounded-full flex items-center justify-center mx-auto">
              <Eye className="h-5 w-5 text-forest" />
            </div>
            <h4 className="font-serif font-bold text-lg text-forest">Continuous Observation</h4>
            <p className="font-sans text-xs text-sage leading-relaxed">
              Using sentinel satellite radars, oceanic temperature grids, and legal public record pipelines, we watch Earth’s systems.
            </p>
          </div>

          <div className="p-6 bg-white border border-forest/15 rounded-lg space-y-3">
            <div className="h-10 w-10 bg-forest/5 text-forest rounded-full flex items-center justify-center mx-auto">
              <ShieldCheck className="h-5 w-5 text-forest" />
            </div>
            <h4 className="font-serif font-bold text-lg text-forest">Evidence-Based Integrity</h4>
            <p className="font-sans text-xs text-sage leading-relaxed">
              Every data point, thermal record, or document leak is systematically fact-checked against double peer-reviewed standards.
            </p>
          </div>

          <div className="p-6 bg-white border border-forest/15 rounded-lg space-y-3">
            <div className="h-10 w-10 bg-gold/10 text-gold rounded-full flex items-center justify-center mx-auto">
              <Award className="h-5 w-5 text-[#9e7c1c]" />
            </div>
            <h4 className="font-serif font-bold text-lg text-forest">Simplicity & Accessibility</h4>
            <p className="font-sans text-xs text-sage leading-relaxed">
              We translate overwhelming environmental policy briefs or chemical equations into clean, engaging, readable digests.
            </p>
          </div>

        </div>
      </section>

      {/* INTRODUCING OUR CREW */}
      <section className="space-y-6" id="about-team">
        <div className="border-b border-forest/15 pb-2">
          <span className="font-mono text-[10px] uppercase font-bold text-sage">JOURNALISTS & SCIENCE TRUSTEES</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {authors.map((author) => (
            <div 
              key={author.id}
              className="bg-white border border-forest/15 rounded-lg p-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center shadow-xs"
            >
              <img 
                src={author.image} 
                alt={author.name}
                referrerPolicy="no-referrer"
                className="h-20 w-20 rounded-full object-cover border border-forest/15 flex-shrink-0 mx-auto sm:mx-0"
              />
              <div className="space-y-2 text-center sm:text-left">
                <div>
                  <h4 className="font-serif font-bold text-lg text-forest">{author.name}</h4>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-gold font-bold leading-none">
                    {author.role}
                  </span>
                </div>
                <p className="font-sans text-xs text-sage leading-relaxed">
                  {author.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
