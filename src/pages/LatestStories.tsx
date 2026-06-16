import { useState } from 'react';
import { useContent } from '../data/content';
import ArticleCard from '../components/ArticleCard';
import SectionHeader from '../components/SectionHeader';
import { Grid, List, Search, SlidersHorizontal, BookOpen } from 'lucide-react';

interface LatestStoriesProps {
  onSelectArticle: (articleId: string) => void;
}

export default function LatestStories({ onSelectArticle }: LatestStoriesProps) {
  const { articles, categories } = useContent();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Categories list starting with 'All'
  const categoriesList = ['All', ...categories.map((c) => c.title)];

  const filteredArticles = articles.filter((article) => {
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    const matchesSearch = 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-10 animate-in fade-in duration-500" id="latest-stories-view">
      
      <SectionHeader 
        title="Journalism Index" 
        tagline="Browse ecological logs, field files, carbon audits, and administrative climate summaries."
        monoLabel="CHRONOLOGICAL ARCHIVE"
      />

      {/* FILTER & OPTION TOOLBAR */}
      <div className="bg-white rounded-xl border border-forest/15 p-4 flex flex-col md:flex-row md:items-center justify-between gap-4" id="stories-toolbar">
        
        {/* Topic Filters */}
        <div className="flex flex-wrap gap-1.5" id="category-filters-container">
          {categoriesList.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-[10px] sm:text-xs uppercase tracking-wider font-bold rounded border transition-all cursor-pointer ${
                  isActive
                    ? 'bg-forest text-[#F9F8F3] border-forest shadow-xs'
                    : 'bg-transparent text-sage border-forest/15 hover:border-forest/45 hover:text-forest'
                }`}
                id={`filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Search Input & View Toggle buttons */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Search */}
          <div className="relative flex-1 md:w-64">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-sage" />
            </div>
            <input
              type="text"
              placeholder="Search index keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full rounded border border-forest/15 bg-white py-2 pl-9 pr-3 font-sans text-xs text-charcoal focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest"
            />
          </div>

          {/* Grid vs List Toggles */}
          <div className="flex items-center border border-forest/15 rounded p-0.5 bg-earth-dark/40">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded transition-colors cursor-pointer border-0 ${
                viewMode === 'grid' ? 'bg-white text-forest shadow-xs' : 'text-sage hover:text-forest'
              }`}
              title="Grid View"
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded transition-colors cursor-pointer border-0 ${
                viewMode === 'list' ? 'bg-white text-forest shadow-xs' : 'text-sage hover:text-forest'
              }`}
              title="List View"
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>

      </div>

      {/* FILTER RESULTS COUNT & MAIN ARTICLE GRIDS */}
      <div>
        {filteredArticles.length > 0 ? (
          <div className="space-y-4">
            <p className="font-mono text-[10px] uppercase text-sage font-bold px-1">
              Showing {filteredArticles.length} climate {filteredArticles.length === 1 ? 'archive' : 'archives'} found
            </p>

            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="stories-grid-container">
                {filteredArticles.map((article) => (
                  <ArticleCard 
                    key={article.id} 
                    article={article} 
                    onSelect={onSelectArticle} 
                    layout="grid" 
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-2" id="stories-list-container">
                {filteredArticles.map((article) => (
                  <ArticleCard 
                    key={article.id} 
                    article={article} 
                    onSelect={onSelectArticle} 
                    layout="list" 
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl border border-forest/15 space-y-4">
            <BookOpen className="h-10 w-10 text-sage/60 mx-auto" />
            <h3 className="font-serif text-xl font-bold text-forest">No Records Found</h3>
            <p className="font-sans text-xs text-sage max-w-sm mx-auto leading-relaxed">
              No articles match your specific keyword criteria. Ensure correct spelling or toggle back to "All Sections".
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-forest text-white font-semibold text-xs uppercase tracking-wider rounded hover:bg-forest-light transition-colors cursor-pointer border-0"
            >
              Reset Archive Filters
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
