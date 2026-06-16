import React, { useState } from 'react';
import { Mail, CheckCircle2, ShieldCheck, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    // Simulate reliable slow network request
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setEmail('');
      
      // Save subscription state in localStorage
      const subscriptions = JSON.parse(localStorage.getItem('climatelens_subscriptions') || '[]');
      if (!subscriptions.includes(email)) {
        subscriptions.push(email);
        localStorage.setItem('climatelens_subscriptions', JSON.stringify(subscriptions));
      }
    }, 1200);
  };

  return (
    <div className="bg-[#12281e] text-earth-beige shadow-xl border border-sage/20 relative overflow-hidden rounded-xl" id="newsletter-block">
      {/* Subtle organic top borders */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold via-sage to-emerald-500" />
      
      {/* Decorative environmental contour background line absolute elements */}
      <div className="absolute -right-16 -bottom-16 h-48 w-48 rounded-full border border-sage/10 pointer-events-none" />
      <div className="absolute -right-8 -bottom-8 h-32 w-32 rounded-full border border-sage/15 pointer-events-none" />

      <div className="px-6 py-12 sm:px-12 md:py-16 max-w-4xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
        
        {/* Content Heading */}
        <div className="max-w-md">
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-gold font-bold block mb-2">
            Mailing Dispatch
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-earth-beige mb-3">
            Stay Informed on Earth’s Changing Story
          </h3>
          <p className="font-sans text-sm text-sage-light leading-relaxed">
            Get clear, evidence-based climate stories, investigations, and explainers delivered straight to your inbox. No hyperbole; just science, engineering, and field truth.
          </p>
        </div>

        {/* Form Container with Motion transition support */}
        <div className="w-full md:w-96 flex-shrink-0">
          <AnimatePresence mode="wait">
            {!success ? (
              <motion.form 
                key="form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onSubmit={handleSubmit}
                className="space-y-3"
              >
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Mail className="h-4 w-4 text-sage-light" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@university.edu"
                    className="block w-full rounded-md border border-sage-light bg-[#193327] py-3 pl-10 pr-3 font-sans text-xs font-medium text-earth-beige placeholder-sage focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-colors duration-300"
                    disabled={isSubmitting}
                  />
                </div>

                {errorMsg && (
                  <p className="text-red-400 font-mono text-[11px] font-semibold">
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-11 flex items-center justify-center bg-gold hover:bg-yellow-600 text-forest font-bold text-xs uppercase tracking-widest rounded-md cursor-pointer disabled:opacity-75 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-gold focus:outline-none"
                  id="newsletter-submit-btn"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Transmitting...</span>
                    </span>
                  ) : (
                    <span>Subscribe to Dispatch</span>
                  )}
                </button>

                <div className="flex items-center justify-center gap-1.5 text-[10px] text-sage-light font-mono pt-1">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>Reader supported. Ad-free. Opt out at any time.</span>
                </div>
              </motion.form>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#193327] p-6 border border-sage/30 rounded-lg text-center"
              >
                <CheckCircle2 className="h-10 w-10 text-gold mx-auto mb-3" />
                <h4 className="font-serif text-lg font-bold text-earth-beige mb-1">
                  Subscription Verified
                </h4>
                <p className="font-sans text-xs text-sage-light leading-relaxed mb-4">
                  Welcome to The Climate Lens. You have been enrolled in our weekly scientific dispatches.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="text-[10px] font-mono text-gold hover:underline uppercase tracking-wider font-semibold border-0 cursor-pointer bg-transparent"
                >
                  Register another Email
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
