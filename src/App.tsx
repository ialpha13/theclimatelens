import { useState, useTransition } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ContentProvider } from './data/content';

// Pages
import Home from './pages/Home';
import LatestStories from './pages/LatestStories';
import SingleArticle from './pages/SingleArticle';
import Investigations from './pages/Investigations';
import ClimateExplained from './pages/ClimateExplained';
import Videos from './pages/Videos';
import About from './pages/About';
import Contact from './pages/Contact';
import CMSPlayground from './pages/CMSPlayground';

// Icons & Animations
import { Flame, ShieldAlert, Sparkles, BookOpen, ExternalLink, Settings, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  const handleTabChange = (tabId: string) => {
    startTransition(() => {
      setCurrentTab(tabId);
      setSelectedArticleId(null);
    });
  };

  const handleSelectArticle = (articleId: string) => {
    startTransition(() => {
      setSelectedArticleId(articleId);
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderActivePage = () => {
    // If a specific article is active, yield the beautiful reading view
    if (selectedArticleId) {
      return (
        <SingleArticle 
          articleId={selectedArticleId} 
          onBack={() => startTransition(() => setSelectedArticleId(null))}
          onSelectArticle={handleSelectArticle}
        />
      );
    }

    // Standard tab layout routes
    switch (currentTab) {
      case 'home':
        return <Home onSelectArticle={handleSelectArticle} onTabChange={handleTabChange} />;
      case 'latest':
        return <LatestStories onSelectArticle={handleSelectArticle} />;
      case 'investigations':
        return <Investigations onSelectArticle={handleSelectArticle} />;
      case 'explained':
        return <ClimateExplained onSelectArticle={handleSelectArticle} />;
      case 'videos':
        return <Videos />;
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      case 'cms-playground':
        return <CMSPlayground />;
      default:
        return <Home onSelectArticle={handleSelectArticle} onTabChange={handleTabChange} />;
    }
  };

  return (
    <ContentProvider>
    <div className="flex flex-col min-h-screen bg-[#f9f6f0] text-[#151515] selection:bg-sage/20 selection:text-forest" id="editorial-main-wrapper">
      
      {/* Editorial Announcement Subheader Top Bar */}
      <div className="bg-forest text-earth-beige py-2.5 px-4 text-center border-b border-sage/20 relative z-30 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest font-bold">
        <div className="flex items-center gap-1">
          <span className="inline-block h-2 w-2 rounded-full bg-[#c59b27] animate-pulse" />
          <span className="text-gold">June 2026 Audit Report:</span>
        </div>
        <span>Ghost Forests & Corporate Carbon Offsets Scandal Deployed.</span>
        <button
          onClick={() => handleSelectArticle('investigation-greenwashing-credits')}
          className="text-gold hover:underline font-bold inline-flex items-center gap-1 border-0 bg-transparent cursor-pointer"
        >
          <span>Read Audit</span>
          <ExternalLink className="h-3 w-3" />
        </button>
      </div>

      {/* Primary Header Navigation navbar */}
      <Navbar currentTab={selectedArticleId ? '' : currentTab} onTabChange={handleTabChange} />

      {/* Main Container with Page View Fade transitions */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedArticleId || currentTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="focus:outline-none"
          >
            {renderActivePage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Educational Floating Shortcut: Sanity schemas registry blueprint */}
      <div className="fixed bottom-6 right-6 z-40 hidden md:block">
        <button
          onClick={() => handleTabChange('cms-playground')}
          className={`px-4 py-2.5 rounded-full shadow-lg border flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-wider cursor-pointer transform transition-all duration-300 hover:scale-105 ${
            currentTab === 'cms-playground'
              ? 'bg-gold text-forest border-gold/40 shadow-gold/25'
              : 'bg-forest text-earth-beige border-sage/30 hover:border-gold/50 shadow-forest/20'
          }`}
          id="floating-cms-btn"
          title="Inspect Sanity CMS Schemas"
        >
          <Settings className="h-4 w-4 animate-spin-slow text-gold" style={{ animationDuration: '6s' }} />
          <span>Sanity CMS Blueprint</span>
        </button>
      </div>

      {/* Site Footer */}
      <Footer onTabChange={handleTabChange} />

    </div>
    </ContentProvider>
  );
}
