import { useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import { mockArticles, mockAuthors, mockCategories, mockVideos } from '../data/mockData';
import { 
  Database, FileCode, CheckCircle, HelpCircle, ExternalLink, RefreshCw, 
  Settings, Sliders, Play, AlertTriangle, ShieldCheck, Eye 
} from 'lucide-react';

export default function CMSPlayground() {
  const [activeSchema, setActiveSchema] = useState<'article' | 'author' | 'category' | 'video'>('article');
  const [copiedCode, setCopiedCode] = useState(false);

  // Read schema codes mapped dynamically for user inspection
  const schemaCode = {
    article: `import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: Rule => Rule.required().max(100)
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'author',
      type: 'reference',
      to: [{ type: 'author' }],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'publishedDate',
      type: 'date',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'featuredImage',
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'alt', type: 'string', title: 'Alternative Text' }
      ]
    }),
    defineField({
      name: 'excerpt',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required().max(200)
    }),
    defineField({
      name: 'bodyContent',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image' }]
    }),
    defineField({
      name: 'tags',
      type: 'array',
      of: [{ type: 'string' }]
    }),
    defineField({
      name: 'readingTime',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'featuredArticleToggle',
      type: 'boolean'
    }),
    defineField({
      name: 'seoTitle',
      type: 'string'
    }),
    defineField({
      name: 'seoDescription',
      type: 'text',
      rows: 2
    })
  ]
});`,
    author: `import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'role',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: { hotspot: true }
    }),
    defineField({
      name: 'bio',
      type: 'text',
      rows: 4
    })
  ]
});`,
    category: `import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 }
    }),
    defineField({
      name: 'description',
      type: 'text',
      rows: 3
    })
  ]
});`,
    video: `import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'videoReel',
  title: 'Video / Reel',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: Rule => Rule.required().max(100)
    }),
    defineField({
      name: 'category',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'thumbnail',
      type: 'image',
      options: { hotspot: true }
    }),
    defineField({
      name: 'videoUrl',
      type: 'url',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'shortDescription',
      type: 'text',
      rows: 2,
      validation: Rule => Rule.required().max(150)
    }),
    defineField({
      name: 'publishedDate',
      type: 'date'
    })
  ]
});`
  };

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-500" id="cms-playground-view">
      
      <SectionHeader 
        title="Sanity CMS Integration Hub" 
        tagline="Inspect Schema specifications, find deployment guides for Vercel, and understand the headless journalism architecture."
        monoLabel="PRODUCTION MANIFEST"
      />

      {/* CORE INTEGRATION PARADIGM BANNER */}
      <section className="bg-forest text-earth-beige p-6 sm:p-10 rounded-xl relative overflow-hidden flex flex-col lg:flex-row lg:items-center justify-between gap-8 border border-sage/20">
        <div className="space-y-4 max-w-2xl relative z-10">
          <div className="flex items-center gap-2">
            <Database className="h-5 w-5 text-gold animate-bounce" />
            <span className="font-mono text-[9px] uppercase tracking-wider font-bold text-gold">SANITY CMS ACTIVE SCHEMA REGISTRY</span>
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
            Decoupled Headless Journalism Infrastructure
          </h3>
          <p className="font-sans text-xs sm:text-sm text-[#cac4b7] leading-relaxed">
            The Climate Lens is engineered for fully decoupled deployment. The React application queries articles, authors, video reels, and categories via Sanity’s high-frequency CDN edge endpoints. Below, inspect the production-ready schemas included within your workspace to boot your backend Sanity Studio instantly.
          </p>
        </div>

        <div className="flex flex-col gap-2 flex-shrink-0 min-w-[200px]">
          <div className="p-3 bg-[#112a1d] border border-sage/10 rounded">
            <span className="font-mono text-[9px] uppercase text-sage-light block">CMS Platform</span>
            <span className="font-sans font-bold text-earth-beige text-xs">Sanity Studio v3</span>
          </div>
          <div className="p-3 bg-[#112a1d] border border-sage/10 rounded">
            <span className="font-mono text-[9px] uppercase text-sage-light block">Query Protocol</span>
            <span className="font-sans font-bold text-gold text-xs">GROQ / GraphQL</span>
          </div>
        </div>
      </section>

      {/* SCHEMA SCHEMATIC VIEWER GRID */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch" id="schema-viewer-layout">
        
        {/* Left Side: Selectors (Span 4) */}
        <div className="lg:col-span-4 flex flex-col justify-between bg-[#fdfcfb] border border-sage-light p-6 rounded-xl space-y-6">
          <div className="space-y-4">
            <span className="font-mono text-[9px] uppercase text-sage font-bold block">Sanity Documents</span>
            <h3 className="font-serif text-lg font-bold text-forest">Blueprint Registries</h3>
            
            <div className="space-y-2.5">
              {[
                { id: 'article', label: 'Article Schema', desc: 'Validates titles, slugs, author references, tags, and reading indicators.' },
                { id: 'author', label: 'Author Schema', desc: 'Defines professional reporter profiles, avatars, and detailed bios.' },
                { id: 'category', label: 'Category Schema', desc: 'Classifies index reports and maps custom category filter layouts.' },
                { id: 'video', label: 'Video/Reel Schema', desc: 'Maintains 9:16 briefings details, thumbnails, and streaming media links.' }
              ].map((sch) => {
                const isActive = activeSchema === sch.id;
                return (
                  <button
                    key={sch.id}
                    onClick={() => setActiveSchema(sch.id as any)}
                    className={`block w-full text-left p-3 rounded border transition-all cursor-pointer ${
                      isActive 
                        ? 'bg-[#ede5d5] text-gold border-gold/40' 
                        : 'bg-transparent text-sage border-sage-light hover:border-sage'
                    }`}
                  >
                    <span className="font-sans font-bold text-xs block leading-none">{sch.label}</span>
                    <span className="text-[10px] text-sage block mt-1 leading-tight">{sch.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-3 bg-earth-dark/40 border border-sage-light rounded flex items-start gap-2.5 text-xs text-sage leading-relaxed">
            <CheckCircle className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-forest">Production Ready:</span> These schemas comply fully with Sanity’s standard v3 validation engines. Drop files into your sanity studio folder to begin database synchronization.
            </div>
          </div>
        </div>

        {/* Right Side: Code Block Output (Span 8) */}
        <div className="lg:col-span-8 flex flex-col justify-between bg-charcoal border border-neutral-800 text-neutral-300 p-5 rounded-xl space-y-4 overflow-x-auto font-mono text-xs max-h-[500px]">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <div className="flex items-center gap-2">
              <FileCode className="h-4 w-4 text-gold" />
              <span className="text-[10px] text-neutral-400 font-mono uppercase tracking-widest">
                sanity/schemas/{activeSchema}.ts
              </span>
            </div>

            <button
              onClick={() => handleCopyCode(schemaCode[activeSchema])}
              className="px-3 py-1 font-mono text-[9px] uppercase tracking-wider font-bold bg-neutral-800 hover:bg-neutral-700 text-white rounded cursor-pointer border-0"
            >
              {copiedCode ? 'Copied!' : 'Copy Schema Code'}
            </button>
          </div>

          <pre className="text-left leading-relaxed flex-1 overflow-x-auto select-all whitespace-pre">
            <code>{schemaCode[activeSchema]}</code>
          </pre>
        </div>

      </section>

      {/* VERCEL DEPLOYMENT BLUEPRINT CHECKLIST */}
      <section className="bg-[#fdfcfb] rounded-xl border border-sage-light p-6 sm:p-10 space-y-6" id="vercel-deployment-guide">
        <h3 className="font-serif text-2xl font-bold text-forest text-center">Vercel & Sanity Deployment Guide</h3>
        <p className="font-sans text-xs sm:text-sm text-sage text-center max-w-2xl mx-auto leading-relaxed">
          Follow these sequential, industry-standard steps to deploy your decoupled Climate Lens journalism platform to production servers.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          
          {/* Step 1 */}
          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-2xl font-bold text-gold">01</span>
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-forest">Initialize Studio</h4>
            </div>
            <p className="font-sans text-xs text-sage leading-relaxed">
              Install the Sanity CLI globally on your workspace or local terminal. Execute <code>npm i -g @sanity/cli</code> followed by <code>sanity init</code> to scaffold your content database. Drop these schemas in.
            </p>
          </div>

          {/* Step 2 */}
          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-2xl font-bold text-gold">02</span>
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-forest">Fetch API Tokens</h4>
            </div>
            <p className="font-sans text-xs text-sage leading-relaxed">
              Register at <code>sanity.io/manage</code>. Create your production database, select 'JSON dataset', and generate an API read token alongside your project ID for client authentication.
            </p>
          </div>

          {/* Step 3 */}
          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-2xl font-bold text-gold">03</span>
              <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-forest">Deploy on Vercel</h4>
            </div>
            <p className="font-sans text-xs text-sage leading-relaxed">
              Link your Git repo to Vercel. In Vercel environment variables, inject <code>VITE_SANITY_PROJECT_ID</code> and <code>VITE_SANITY_DATASET</code>. Click deploy. Your client connects cleanly.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}
