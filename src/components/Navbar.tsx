import { useState } from 'react';
import { Menu, X, Landmark, Compass, Eye, ShieldCheck, Mail, Radio } from 'lucide-react';
import { LogoIcon } from './Logo';

interface NavbarProps {
  currentTab: string;
  onTabChange: (tabId: string) => void;
}

export default function Navbar({ currentTab, onTabChange }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'latest', label: 'Latest Stories' },
    { id: 'investigations', label: 'Investigations' },
    { id: 'explained', label: 'Climate Explained' },
    { id: 'videos', label: 'Videos' },
    { id: 'about', label: 'About' }
  ];

  const handleNavClick = (tabId: string) => {
    onTabChange(tabId);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-forest/20 bg-earth-beige/95 backdrop-blur-md">
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between relative">
          
          {/* Logo & Brand Identity */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3.5 text-left group cursor-pointer focus:outline-none border-0"
            id="nav-logo-btn"
          >
            <LogoIcon size="custom" customSizeClass="h-26 w-52" className="transform transition-transform group-hover:scale-105 duration-500" />

          </button>

          {/* Desktop Navigation Link Menu */}
          <nav className="hidden md:flex items-center space-x-2" id="desktop-nav">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-1.5 font-sans text-[11px] uppercase tracking-widest font-semibold transition-all duration-300 relative group cursor-pointer border-0 ${
                    isActive 
                      ? 'text-forest' 
                      : 'text-forest/60 hover:text-forest'
                  }`}
                >
                  {item.label}
                  {/* Subtle editorial underline hover effect */}
                  <span className={`absolute bottom-0 left-3 right-3 h-[1px] bg-forest transition-transform origin-center duration-300 ${
                    isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`} />
                </button>
              );
            })}
          </nav>

          {/* Contact Button */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => handleNavClick('contact')}
              className="bg-forest text-white px-5 py-2 text-[10px] uppercase tracking-[0.2em] font-bold rounded-xs hover:bg-forest-light border-0 transition-all duration-300 cursor-pointer"
              id="nav-cta-btn"
            >
              Contact
            </button>
          </div>

          {/* Mobile hamburger menu toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-forest/70 hover:text-forest focus:outline-none cursor-pointer"
              id="mobile-menu-toggle"
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {isOpen && (
        <div className="md:hidden border-t border-forest/10 bg-earth-beige animate-in slide-in-from-top duration-300" id="mobile-nav">
          <div className="space-y-1 px-4 py-4 pb-6">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-item-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`block w-full text-left px-4 py-3 text-xs uppercase tracking-widest font-bold rounded-sm transition-colors ${
                    isActive 
                      ? 'bg-forest/10 text-forest' 
                      : 'text-forest/70 hover:bg-forest/5 hover:text-forest'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            <div className="pt-4 border-t border-forest/10 flex flex-col gap-2">
              <button
                onClick={() => handleNavClick('contact')}
                className="w-full text-center px-4 py-3 bg-forest text-white text-xs uppercase tracking-widest font-bold rounded-sm hover:bg-forest-light transition-colors"
               id="mobile-contact-btn"
              >
                Send a Tip / Contact
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
