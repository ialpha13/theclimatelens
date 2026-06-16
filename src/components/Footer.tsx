import { Mail, ArrowUpCircle, Eye, ShieldCheck, Heart } from 'lucide-react';
import { LogoIcon } from './Logo';

interface FooterProps {
  onTabChange: (tabId: string) => void;
}

export default function Footer({ onTabChange }: FooterProps) {
  const handleLogoClick = () => {
    onTabChange('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (tabId: string) => {
    onTabChange(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-earth-beige text-forest border-t border-forest/20 pt-16 pb-12" id="site-footer">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid split into 4 logical volumes */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-12 border-b border-forest/10">
          
          {/* Logo & Platform Mission (Span 5 cols) */}
          <div className="md:col-span-12 lg:col-span-5 flex flex-col gap-4">
            <button 
              onClick={handleLogoClick}
              className="flex items-center text-left group cursor-pointer focus:outline-none border-0 self-start"
              id="footer-logo-btn"
            >
              <LogoIcon size="custom" customSizeClass="h-32 w-56" className="transform transition-transform group-hover:scale-105 duration-500" />
            </button>

            <p className="font-sans text-xs sm:text-sm text-forest/80 leading-relaxed max-w-sm">
              An independent, global investigative journalism initiative. We monitor ecological shifts, tell evidence-based stories, and break down complex atmospheric systems to make changing climate developments transparent, accessible, and actionable.
            </p>

            <div className="flex items-center gap-2 text-xs text-sage font-mono mt-2">
              <span className="inline-block h-2 w-2 rounded-full bg-red-600 animate-pulse" />
              <span>Watching Earth Through Nature’s Lens</span>
            </div>
          </div>

          {/* Quick Nav (Span 3 cols) */}
          <div className="md:col-span-4 lg:col-span-3 flex flex-col gap-4">
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-forest font-bold border-b border-forest/10 pb-1">
              Editorial Sections
            </h4>
            <ul className="space-y-2.5 text-sm" id="footer-editorial-links">
              {[
                { id: 'latest', label: 'News & Latest Stories' },
                { id: 'investigations', label: 'Long-Form Investigations' },
                { id: 'explained', label: 'Climate Explained' },
                { id: 'videos', label: 'Reels & Videos' }
              ].map((link) => (
                <li key={link.id}>
                  <button 
                    onClick={() => handleNavClick(link.id)}
                    className="text-forest/70 hover:text-forest transition-colors text-left font-semibold text-[10px] uppercase tracking-widest cursor-pointer border-0"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Core Info & Resources (Span 2/3 cols) */}
          <div className="md:col-span-4 lg:col-span-2 flex flex-col gap-4">
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-forest font-bold border-b border-forest/10 pb-1">
              Platform Info
            </h4>
            <ul className="space-y-2.5 text-sm" id="footer-info-links">
              {[
                { id: 'about', label: 'Our Mission' },
                { id: 'contact', label: 'Inquiries & Tips' },
                { id: 'home', label: 'Home Feed' }
              ].map((link) => (
                <li key={link.id}>
                  <button 
                    onClick={() => handleNavClick(link.id)}
                    className="text-forest/70 hover:text-forest transition-colors text-left font-semibold text-[10px] uppercase tracking-widest cursor-pointer border-0"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support / Contact Tip Line (Span 4/2 cols) */}
          <div className="md:col-span-4 lg:col-span-2 flex flex-col gap-4">
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-forest font-bold border-b border-forest/10 pb-1">
              Tip Line & Contacts
            </h4>
            <div className="flex flex-col gap-2">
              <span className="font-sans text-xs text-forest/70">Secure Tip Line:</span>
              <a 
                href="mailto:tips@climatelens.org" 
                className="font-mono text-xs text-forest hover:text-gold transition-colors break-words underline font-bold"
              >
                tips@climatelens.org
              </a>
              <span className="font-mono text-[9px] text-sage uppercase tracking-wider block mt-2">
                Available 24/7 for researchers, scientists & whistleblowers.
              </span>
            </div>
          </div>
        </div>

        {/* Bottom copyright notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-sage font-mono uppercase tracking-wider">
          <div className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} The Climate Lens. Independent Journalism.</span>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-1.5 hover:text-forest transition-colors uppercase text-[10px] tracking-widest font-bold border-0 cursor-pointer text-sage"
              id="footer-back-to-top"
            >
              <span>Back to Top</span>
              <ArrowUpCircle className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>

        {/* Extra notice for Sandbox env in modern high contrast slate text */}
        <div className="mt-8 pt-4 border-t border-forest/10 text-center">
          <span className="text-[9px] font-mono tracking-[0.25em] text-sage/75 uppercase">
            Evidence-Based Climate Stories Delivered Without Compromise.
          </span>
        </div>
      </div>
    </footer>
  );
}
