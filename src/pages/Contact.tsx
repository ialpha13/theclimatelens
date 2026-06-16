import { useState, useEffect } from 'react';
import ContactForm from '../components/ContactForm';
import SectionHeader from '../components/SectionHeader';
import { Mail, CheckCircle, ShieldAlert, Lock, History, Trash2 } from 'lucide-react';
import { ContactInquiry } from '../types';

export default function Contact() {
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);

  // Load prior inquiries from localStorage for live session feedback
  useEffect(() => {
    const stored = localStorage.getItem('climatelens_inquiries');
    if (stored) {
      try {
        setInquiries(JSON.parse(stored));
      } catch (err) {
        console.error('Error loading inquiry cache:', err);
      }
    }
  }, []);

  const handleInquirySubmitted = (newInquiry: ContactInquiry) => {
    const updated = [newInquiry, ...inquiries];
    setInquiries(updated);
    localStorage.setItem('climatelens_inquiries', JSON.stringify(updated));
  };

  const clearInquiries = () => {
    setInquiries([]);
    localStorage.removeItem('climatelens_inquiries');
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-500 max-w-5xl mx-auto" id="contact-view">
      
      <SectionHeader 
        title="Contact Our Newsroom" 
        tagline="Have an environmental document leak, research thesis to share, or feedback on our publications? Connect with our editors."
        monoLabel="SECURE TIP LINE"
      />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        
        {/* Left Column: Tips Guidelines & Address block (Span 5) */}
        <div className="md:col-span-5 space-y-6">
          <div className="bg-white rounded-xl border border-forest/15 p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-[#9e7c1c]" />
              <h3 className="font-serif text-lg font-bold text-forest">Whistleblower Tip Protection</h3>
            </div>
            <p className="font-sans text-xs text-sage leading-relaxed">
              We respect chemical engineers, policy coordinators, and research scientists who raise the alarm on environmental non-compliance. Our communications use standard encryption standards. 
            </p>
            <div className="pt-2">
              <span className="font-mono text-[9px] uppercase font-bold text-sage">Secure Tip Address:</span>
              <a 
                href="mailto:secure-tip@theclimatelens.org" 
                className="font-mono text-xs text-forest underline block hover:text-gold mt-1 break-all"
              >
                tips@theclimatelens.org
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-serif font-bold text-lg text-forest">Direct Contact Points</h4>
            <div className="space-y-3 font-sans text-xs sm:text-sm">
              <div className="flex items-center gap-2.5">
                <Mail className="h-4.5 w-4.5 text-sage flex-shrink-0" />
                <div>
                  <span className="font-mono text-[9px] uppercase font-bold text-sage block leading-none">Editorial Inquiries:</span>
                  <a href="mailto:editors@theclimatelens.org" className="hover:text-gold transition-colors font-semibold text-xs text-forest">editorial@climatelens.org</a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="h-4.5 w-4.5 text-sage flex-shrink-0" />
                <div>
                  <span className="font-mono text-[9px] uppercase font-bold text-sage block leading-none">Press & syndication:</span>
                  <a href="mailto:press@theclimatelens.org" className="hover:text-gold transition-colors font-semibold text-xs text-forest">press@climatelens.org</a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="h-4.5 w-4.5 text-sage flex-shrink-0" />
                <div>
                  <span className="font-mono text-[9px] uppercase font-bold text-sage block leading-none">Academic Research:</span>
                  <a href="mailto:science@theclimatelens.org" className="hover:text-gold transition-colors font-semibold text-xs text-forest">science@climatelens.org</a>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-red-950/5 border border-red-950/15 text-red-800 rounded font-sans text-[11px] leading-relaxed">
            <ShieldAlert className="h-4 w-4 text-red-700 inline mr-1.5 align-middle" />
            <span>
              <strong>Note:</strong> We strictly never publish personal emails, IP headers, or physical location telemetry of sources under disclosure protocols.
            </span>
          </div>
        </div>

        {/* Right Column: Contact form rendering (Span 7) */}
        <div className="md:col-span-7">
          <ContactForm onInquirySubmitted={handleInquirySubmitted} />
        </div>

      </div>

      {/* SECURE SUBMISSIONS RECORD FEEDBACK PANEL */}
      {inquiries.length > 0 && (
        <section className="bg-white rounded-xl border border-forest/15 p-6 sm:p-8 space-y-6" id="local-tip-logs">
          <div className="flex items-center justify-between border-b border-forest/10 pb-3">
            <div className="flex items-center gap-2">
              <History className="h-5 w-5 text-forest" />
              <h3 className="font-serif text-lg font-bold text-forest">Submitted Tip Logs (This Session)</h3>
            </div>
            <button 
              onClick={clearInquiries}
              className="flex items-center gap-1.5 text-[10px] font-mono text-red-700 hover:text-red-900 font-bold border-0 bg-transparent cursor-pointer"
              title="Clear inquiry list cache"
            >
              <Trash2 className="h-4 w-4" />
              <span>Purge Local History</span>
            </button>
          </div>

          <div className="space-y-4" id="tip-logs-list">
            {inquiries.map((inq, i) => (
              <div 
                key={i} 
                className="bg-white border border-forest/15 p-4 rounded-lg flex flex-col gap-2 shadow-xs transition-shadow hover:shadow-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono">
                  <span className="bg-forest text-[#ede9e0] px-2 py-0.5 rounded font-bold font-mono">
                    {inq.inquiryType}
                  </span>
                  <div className="flex items-center gap-1.5 text-sage">
                    <span>{inq.date}</span>
                    <span>•</span>
                    <span className="text-red-700 font-bold">● CL-TRANSIT-OK</span>
                  </div>
                </div>

                <div className="text-xs text-sage font-sans space-y-1 mt-1">
                  <div><span className="font-semibold text-forest">Sender:</span> {inq.name} ({inq.email})</div>
                  <div className="text-charcoal leading-relaxed pt-1.5 italic border-t border-forest/5">
                    "{inq.message}"
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
