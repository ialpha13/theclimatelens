import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, AlertCircle, FileText, Lock, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ContactInquiry } from '../types';

interface ContactFormProps {
  onInquirySubmitted?: (inquiry: ContactInquiry) => void;
}

export default function ContactForm({ onInquirySubmitted }: ContactFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [inquiryType, setInquiryType] = useState('General Tip');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      
      const newInquiry: ContactInquiry = {
        name,
        email,
        inquiryType,
        message,
        date: new Date().toLocaleDateString('en-US')
      };

      if (onInquirySubmitted) {
        onInquirySubmitted(newInquiry);
      }

      // Reset form fields
      setName('');
      setEmail('');
      setMessage('');
    }, 1200);
  };

  return (
    <div className="bg-white rounded-xl border border-forest/15 p-6 sm:p-8 shadow-sm" id="contact-form-container">
      <AnimatePresence mode="wait">
        {!success ? (
          <motion.form
            key="contact-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div>
              <label htmlFor="contact-name" className="block text-[10px] uppercase tracking-widest font-mono font-bold text-sage mb-1.5">
                Full Name / Source Pseudonym
              </label>
              <input
                id="contact-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="David Attenborough"
                className="block w-full rounded-md border border-forest/15 bg-white px-3.5 py-2.5 text-xs text-charcoal placeholder-[#a19e98] focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest transition-colors"
              />
            </div>

            <div>
              <label htmlFor="contact-email" className="block text-[10px] uppercase tracking-widest font-mono font-bold text-sage mb-1.5">
                Safe Return Email Address
              </label>
              <input
                id="contact-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="source@protonmail.com"
                className="block w-full rounded-md border border-forest/15 bg-white px-3.5 py-2.5 text-xs text-charcoal placeholder-[#a19e98] focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest transition-colors"
              />
            </div>

            <div>
              <label htmlFor="contact-type" className="block text-[10px] uppercase tracking-widest font-mono font-bold text-sage mb-1.5">
                Nature of Classification
              </label>
              <select
                id="contact-type"
                value={inquiryType}
                onChange={(e) => setInquiryType(e.target.value)}
                className="block w-full rounded-md border border-forest/15 bg-white px-3 py-2.5 text-xs text-charcoal focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest transition-colors"
              >
                <option value="General Tip">Independent Editorial Tip (High Confidentiality)</option>
                <option value="Scientific Correction">Scientific Feedback / Errands</option>
                <option value="Whistleblower Secure submission">Whistleblower Systemic Submission</option>
                <option value="Research Collaboration">Academic / NGO Research Partnership</option>
                <option value="Press Inquiries">Press & Syndication Requests</option>
              </select>
            </div>

            {inquiryType.includes('Whistleblower') && (
              <div className="p-3 bg-red-950/5 border border-red-950/15 rounded-md flex items-start gap-2 text-red-800 font-sans text-[11px] leading-relaxed animate-in fade-in slide-in-from-top-2 duration-300">
                <Lock className="h-4 w-4 text-red-700 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Secure Server Transit Active:</span> This submission channel is fully isolated from external tracking analytics. We respect anonymous pseudonyms. For maximum privacy, submit via Tor Browser.
                </div>
              </div>
            )}

            <div>
              <label htmlFor="contact-message" className="block text-[10px] uppercase tracking-widest font-mono font-bold text-sage mb-1.5">
                Testimony / Information Details
              </label>
              <textarea
                id="contact-message"
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Outline evidence, document references, or physical coordinates..."
                className="block w-full rounded-md border border-forest/15 bg-white px-3.5 py-2.5 text-sm text-charcoal placeholder-[#a19e98] focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-11 flex items-center justify-center gap-2 bg-forest hover:bg-forest-light text-[#F9F8F3] font-bold text-xs uppercase tracking-widest rounded transition-colors duration-300 disabled:opacity-75 cursor-pointer border-0"
              id="contact-submit-btn"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin text-gold" />
                  <span>Transmitting Securely...</span>
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 text-gold" />
                  <span>Transmit Credentials</span>
                </>
              )}
            </button>
          </motion.form>
        ) : (
          <motion.div
            key="contact-success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <CheckCircle2 className="h-14 w-14 text-red-700 mx-auto mb-4 animate-bounce" />
            <h4 className="font-serif text-xl font-bold text-forest mb-2">
              Credentials Transmitted
            </h4>
            <p className="font-sans text-xs text-sage max-w-sm mx-auto leading-relaxed mb-6">
              Your inquiry has been stored securely within our local sandbox memory. An investigative writer will review your classification shortly.
            </p>
            <button
              onClick={() => setSuccess(false)}
              className="px-6 py-2 bg-forest text-[#F9F8F3] font-semibold text-xs uppercase tracking-wider rounded transition-colors hover:bg-forest-light border-0 cursor-pointer"
            >
              Log Another Tip
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
