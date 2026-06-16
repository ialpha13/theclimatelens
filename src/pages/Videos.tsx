import { mockVideos } from '../data/mockData';
import VideoCard from '../components/VideoCard';
import SectionHeader from '../components/SectionHeader';
import { Eye, ShieldCheck, Heart, Radio, Sparkles } from 'lucide-react';

export default function Videos() {
  return (
    <div className="space-y-12 animate-in fade-in duration-500" id="videos-view">
      
      <SectionHeader 
        title="Audiovisual Briefs" 
        tagline="Rigorous field dispatches, engineering walkthroughs, and scientific modeling condensed into 60-second vertical reels."
        monoLabel="FIELD REELS"
      />

      {/* Dynamic video stats overlay */}
      <section className="bg-gradient-to-r from-forest to-[#163c2b] text-earth-beige p-6 rounded-xl border border-sage/20 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Radio className="h-4 w-4 text-gold animate-pulse" />
            <span className="font-mono text-[9px] uppercase tracking-wider font-bold text-gold">BROADCAST STANDARD ACTIVE</span>
          </div>
          <h3 className="font-serif text-lg sm:text-xl font-bold tracking-tight text-white">
            Climate Lens Audiovisual Division
          </h3>
          <p className="font-sans text-xs text-sage-light max-w-xl">
            Our vertical videos allow researchers, journalists, and active citizens to quickly parse high-density environmental files with rich captions, visual evidence overlays, and sound triggers.
          </p>
        </div>

        <div className="flex items-center gap-6 font-mono text-[10px] uppercase font-bold text-sage-light">
          <div className="text-center bg-[#10291d] p-3 rounded border border-sage/10 min-w-[90px]">
            <span className="text-white block font-serif text-lg font-bold">4K HFR</span>
            <span>STANDARD</span>
          </div>
          <div className="text-center bg-[#10291d] p-3 rounded border border-sage/10 min-w-[90px]">
            <span className="text-gold block font-serif text-lg font-bold">100%</span>
            <span>AD-FREE</span>
          </div>
        </div>
      </section>

      {/* Video feeds area */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-sage/15 pb-2">
          <div className="flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-gold" />
            <span className="font-mono text-[10px] uppercase font-bold text-sage">Active Briefing Streams</span>
          </div>
          <span className="text-xs text-sage font-mono font-bold bg-[#efece6] px-2 py-0.5 rounded-full">{mockVideos.length} reels</span>
        </div>

        {/* Dense centered grid designed for portrait aspect radios */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center" id="videos-grid-container">
          {mockVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>

    </div>
  );
}
