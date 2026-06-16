(function () {
  const SANITY_PROJECT_ID = "5ygxll5t";
  const SANITY_DATASET = "production";
  const SANITY_API_VERSION = "2025-06-01";
  const USE_CDN = true;

  const fallbackAuthors = [
    {
      id: "david-alvarez",
      name: "David Alvarez",
      slug: "david-alvarez",
      role: "Lead Investigative Correspondent",
      bio: "David Alvarez is an award-winning investigative journalist reporting from the frontlines of climate science, public policy, and forest ecology.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400&h=400"
    },
    {
      id: "elena-rostova",
      name: "Dr. Elena Rostova",
      slug: "elena-rostova",
      role: "Contributing Climate Scientist & Columnist",
      bio: "Dr. Elena Rostova explains planetary climate systems, ocean circulation, and policy feedback loops in terms understandable to the public.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400&h=400"
    },
    {
      id: "marcus-chen",
      name: "Marcus Chen",
      slug: "marcus-chen",
      role: "Senior Technology & Energy Analyst",
      bio: "Marcus Chen covers clean energy transitions, battery chemistry, grid bottlenecks, and the economics of leaving fossil fuels behind.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=400"
    },
    {
      id: "sarah-jenkins",
      name: "Sarah Jenkins",
      slug: "sarah-jenkins",
      role: "Global Field Correspondent",
      bio: "Sarah Jenkins reports on rural resilience, agricultural adaptation, glaciology, and community-led mitigation efforts.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400&h=400"
    }
  ];

  const fallbackCategories = [
    { id: "climate-news", title: "Climate News", slug: "climate-news", description: "Updates and analysis on unfolding planetary developments." },
    { id: "investigations", title: "Investigations", slug: "investigations", description: "Evidence-based investigative journalism." },
    { id: "climate-explained", title: "Climate Explained", slug: "climate-explained", description: "Accessible guides to climate science and policy." },
    { id: "policy-adaptation", title: "Policy & Adaptation", slug: "policy-adaptation", description: "Treaties, adaptation, infrastructure, and resilience." },
    { id: "biodiversity", title: "Biodiversity & Science", slug: "biodiversity", description: "Ecosystems, ocean heat, conservation, and wildlife." }
  ];

  const fallbackArticles = [
    {
      id: "wildfire-smoke-public-health",
      title: "Wildfire Smoke Is Becoming a Public Health Crisis",
      slug: "wildfire-smoke-public-health",
      category: "Climate News",
      categorySlug: "climate-news",
      type: "News",
      authorId: "david-alvarez",
      publishedAt: "2026-06-08",
      readingTime: "6 min read",
      featuredImage: "https://images.unsplash.com/photo-1542353436-7141f2c90865?auto=format&fit=crop&q=80&w=1200",
      excerpt: "Wildfire smoke is now reaching communities far beyond fire zones, raising new concerns about air quality, public health, and climate preparedness.",
      body: "As wildfire seasons grow longer and more unpredictable, smoke exposure is becoming a serious public health concern. Cities hundreds of miles away from active fires are experiencing poor air quality, school closures, and increased health warnings.\n\n## The Microscopic Threat: PM2.5 Inhalation\nUnlike fireplace soot, wildfire smoke contains ultra-fine particulate matter that bypasses upper-airway filtration and settles deep within the lungs.\n\n> The true cost of wildfires is no longer measured solely in acres burned or homes destroyed. It is measured in cumulative damage to the lungs of millions of residents.\n\n- Clean air sanctuaries can protect residents during hazardous smoke episodes.\n- Updated ventilation codes can reduce indoor particle exposure.\n- Better forecasting can give communities more time to prepare.",
      tags: ["Air Quality", "Public Health", "Wildfires"],
      featured: true,
      homepageFeatured: true,
      seoTitle: "Wildfire Smoke Public Health Crisis",
      seoDescription: "As wildfire seasons lengthen, smoke reaches communities hundreds of miles away and escalates public health risks."
    },
    {
      id: "rising-heat-urban-bento",
      title: "The Silent Killers: Thermal Islanding In Dense Modern Cities",
      slug: "rising-heat-urban-bento",
      category: "Investigations",
      categorySlug: "investigations",
      type: "Investigation",
      authorId: "david-alvarez",
      publishedAt: "2026-06-03",
      readingTime: "12 min read",
      featuredImage: "https://images.unsplash.com/photo-1527030280862-64139fbe04ca?auto=format&fit=crop&q=80&w=1200",
      excerpt: "An investigative report exposing how architectural materials and structural planning create hyper-localized thermal pressure cookers.",
      body: "In hot summer months, modern metropolitan areas transform into structural radiators. Concrete skyscrapers, asphalt roads, and dark roofing absorb solar radiation by day and emit it back at night.\n\n## Mapping the Asphalt-to-Canopy Inequality\nOur reporting found that neighborhoods with high concrete density and limited tree canopy record midnight temperatures far higher than nearby greener districts.\n\n> Urban heat acts as an invisible magnifier of cardiovascular, respiratory, and socioeconomic vulnerabilities.\n\n- Cool pavement technologies can reflect solar radiation.\n- Targeted tree planting can restore evaporative cooling.\n- Green roofs can reduce roof-surface heat storage.",
      tags: ["Urban Ecology", "Thermal Islands", "Social Equity"],
      featured: false,
      homepageFeatured: false,
      seoTitle: "Urban Heat Islands Investigation",
      seoDescription: "How thermal storage threatens under-resourced neighborhoods."
    },
    {
      id: "coastal-walls-adaptation",
      title: "Rising Currents: Can Coastal Infrastructure Adaptive Engineering Save Our Ports?",
      slug: "coastal-walls-adaptation",
      category: "Policy & Adaptation",
      categorySlug: "policy-adaptation",
      type: "Blog",
      authorId: "sarah-jenkins",
      publishedAt: "2026-05-28",
      readingTime: "9 min read",
      featuredImage: "https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&q=80&w=1200",
      excerpt: "As sea levels rise, major port networks are adopting tidal gates, sea walls, and nature-based living breakwaters.",
      body: "Over 90% of global commerce is distributed via maritime shipping lanes, making port terminals vital but exposed nodes in a warming world.\n\n## Living Breakwaters\nEcological engineers are increasingly using mangrove forests, oyster reefs, and managed flood buffers to absorb hydrodynamic force.\n\n> We cannot build our way out of ocean rise with steel and cement alone.",
      tags: ["Sea Level Rise", "Coastlines", "Adaptation"],
      featured: false,
      homepageFeatured: false
    },
    {
      id: "clean-energy-transition-grid",
      title: "The Great Grid Bottleneck: Why Clean Energy Is Stranded on Rolling Hills",
      slug: "clean-energy-transition-grid",
      category: "Policy & Adaptation",
      categorySlug: "policy-adaptation",
      type: "Opinion",
      authorId: "marcus-chen",
      publishedAt: "2026-05-22",
      readingTime: "8 min read",
      featuredImage: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=1200",
      excerpt: "Investigating the transmission line shortages that keep gigawatts of wind and solar power locked out of local households.",
      body: "Across rural passes and sun-baked plains, clean energy projects are ready to feed electricity into communities. Much of that power remains stranded by an outdated grid.\n\n## The Interconnection Queue Crisis\nWind and solar projects wait years to get approved for grid interconnection while high-voltage construction lags.\n\n- Grid enhancing technologies can increase existing line capacity.\n- Faster permitting can reduce stranded renewable power.",
      tags: ["Renewable Energy", "Power Grids", "Transmission"],
      featured: false,
      homepageFeatured: false
    },
    {
      id: "understanding-ocean-circulation-collapse",
      title: "AMOC Explained: Why Scientists Fear the Collapse of Atlantic Ocean Currents",
      slug: "understanding-ocean-circulation-collapse",
      category: "Climate Explained",
      categorySlug: "climate-explained",
      type: "Climate Explained",
      authorId: "elena-rostova",
      publishedAt: "2026-05-15",
      readingTime: "5 min read",
      featuredImage: "https://images.unsplash.com/photo-1546500840-ae38253aba9b?auto=format&fit=crop&q=80&w=1200",
      excerpt: "An educational breakdown of the Atlantic Ocean's great conveyor belt and why melting Greenland ice threatens its stability.",
      body: "The Atlantic Meridional Overturning Circulation, or AMOC, is one of Earth's most vital planetary systems.\n\n## How the Atlantic Conveyor Belt Works\nWarm saline water flows north, releases heat, cools, sinks, and powers a deep return current.\n\n## The Freshwater Threat\nFresh meltwater from Greenland dilutes salinity and can weaken the sinking engine that drives the current.",
      tags: ["AMOC", "Oceanography", "Earth Systems"],
      featured: false,
      homepageFeatured: false
    },
    {
      id: "understanding-carbon-sinks-soil",
      title: "Earth's Hidden Reservoir: Can Regenerative Soils Act as Effective Carbon Sinks?",
      slug: "understanding-carbon-sinks-soil",
      category: "Climate Explained",
      categorySlug: "climate-explained",
      type: "Climate Explained",
      authorId: "elena-rostova",
      publishedAt: "2026-04-20",
      readingTime: "5 min read",
      featuredImage: "https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?auto=format&fit=crop&q=80&w=1200",
      excerpt: "A guide to soil carbon sequestration, its biological limits, and agricultural restoration pathways.",
      body: "Soil contains more carbon than the atmosphere and all plant life combined, but intensive agriculture has depleted these reservoirs.\n\n## Restoring Soil Carbon\nNo-till planting, living cover crops, and diverse rotations can restore soil structure and sequester carbon over time.",
      tags: ["Carbon Sinks", "Soil Science", "Agriculture"],
      featured: false,
      homepageFeatured: false
    },
    {
      id: "investigation-greenwashing-credits",
      title: "Ghost Forests: Exposing the Phantom Carbon Offsets Saving Oil Behemoths",
      slug: "investigation-greenwashing-credits",
      category: "Investigations",
      categorySlug: "investigations",
      type: "Investigation",
      authorId: "david-alvarez",
      publishedAt: "2026-05-10",
      readingTime: "15 min read",
      featuredImage: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&q=80&w=1200",
      excerpt: "A multi-month investigation into how energy companies buy worthless carbon offsets from unmanaged forests.",
      body: "Carbon offset markets allow corporate emitters to pay for alleged forest protection instead of cutting direct emissions.\n\n## The Triad of Carbon Offset Failure\nBaseline inflation, leakage displacement, and impermanence make many offset claims unreliable.\n\n> A carbon offset is a financial ticket to emit today in exchange for a promise of preservation tomorrow.",
      tags: ["Carbon Offsets", "Greenwashing", "Policy Failures"],
      featured: false,
      homepageFeatured: false
    },
    {
      id: "community-resilience-andes-glaciers",
      title: "High-Altitude Survival: How Andean Communities Adapt to Dying Glaciers",
      slug: "community-resilience-andes-glaciers",
      category: "Policy & Adaptation",
      categorySlug: "policy-adaptation",
      type: "Blog",
      authorId: "sarah-jenkins",
      publishedAt: "2026-05-02",
      readingTime: "10 min read",
      featuredImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200",
      excerpt: "Indigenous farming communities are building decentralized stone reservoirs and reviving pre-Incan canals.",
      body: "High-altitude Peruvian communities historically synchronized life with glacial meltwater. Today, they are rebuilding water systems for a warmer future.\n\n## Reviving Ancient Canals\nAmunas divert wet-season runoff into porous mountain gravel, slowly releasing water months later.",
      tags: ["Glaciology", "Water Security", "Community Resilience"],
      featured: false,
      homepageFeatured: false
    }
  ];

  const fallbackVideos = [
    {
      id: "reel-smoke-school",
      title: "What Happens to Children's Lungs on Smoke Days?",
      slug: "reel-smoke-school",
      category: "Field Briefing",
      thumbnail: "https://images.unsplash.com/photo-1542353436-7141f2c90865?auto=format&fit=crop&q=80&w=400&h=700",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      description: "Field correspondent David Alvarez explains why PM2.5 bypasses child air filters and exposes school ventilation gaps.",
      publishedAt: "2026-06-08",
      platform: "External",
      featured: true
    },
    {
      id: "reel-heat-islands",
      title: "Visualizing Urban Heat Inequality with Infrared Cameras",
      slug: "reel-heat-islands",
      category: "Science Short",
      thumbnail: "https://images.unsplash.com/photo-1527030280862-64139fbe04ca?auto=format&fit=crop&q=80&w=400&h=700",
      videoUrl: "https://www.w3schools.com/html/movie.mp4",
      description: "Thermal imaging reveals stark differences between tree-lined suburbs and industrial concrete pockets.",
      publishedAt: "2026-06-03",
      platform: "External",
      featured: true
    },
    {
      id: "reel-rotterdam-gates",
      title: "Rotterdam's Eiffel-Tower-Sized Storm Surge Barrier",
      slug: "reel-rotterdam-gates",
      category: "Engineering Spotlight",
      thumbnail: "https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&q=80&w=400&h=700",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      description: "A close-up look at the Maeslant barrier protecting Rotterdam from North Sea surges.",
      publishedAt: "2026-05-28",
      platform: "External",
      featured: false
    },
    {
      id: "reel-grid-explain",
      title: "Why Clean Energy Is Stranded in Interconnection Queues",
      slug: "reel-grid-explain",
      category: "Science Short",
      thumbnail: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=400&h=700",
      videoUrl: "https://www.w3schools.com/html/movie.mp4",
      description: "A 60-second deep dive into the transmission grid bottleneck slowing the clean energy transition.",
      publishedAt: "2026-05-22",
      platform: "External",
      featured: false
    }
  ];

  const fallbackContent = {
    articles: fallbackArticles,
    authors: fallbackAuthors,
    categories: fallbackCategories,
    videos: fallbackVideos
  };

  const hasRealProject = () => SANITY_PROJECT_ID && SANITY_PROJECT_ID !== "YOUR_SANITY_PROJECT_ID";
  const endpoint = () => {
    const host = USE_CDN ? "apicdn" : "api";
    return `https://${SANITY_PROJECT_ID}.${host}.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}`;
  };

  function groqUrl(query, params) {
    const url = new URL(endpoint());
    url.searchParams.set("query", query);
    Object.entries(params || {}).forEach(([key, value]) => url.searchParams.set(`$${key}`, JSON.stringify(value)));
    return url.toString();
  }

  async function fetchGroq(query, params) {
    if (!hasRealProject()) return null;
    const response = await fetch(groqUrl(query, params));
    if (!response.ok) throw new Error(`Sanity request failed: ${response.status}`);
    const payload = await response.json();
    return payload.result;
  }

  function urlForImage(source) {
    if (!source) return "";
    if (typeof source === "string") return source;
    const ref = source.asset && (source.asset._ref || source.asset._id);
    if (!ref || !hasRealProject()) return "";
    const parts = ref.replace("image-", "").split("-");
    const ext = parts.pop();
    const size = parts.pop();
    const id = parts.join("-");
    return `https://cdn.sanity.io/images/${SANITY_PROJECT_ID}/${SANITY_DATASET}/${id}-${size}.${ext}`;
  }

  function normalizeArticle(article) {
    if (!article) return null;
    return {
      id: article.slug || article.id || article._id,
      title: article.title,
      slug: article.slug,
      category: article.category || "Climate News",
      categorySlug: article.categorySlug || "",
      type: article.type || "News",
      authorId: article.authorId || "",
      publishedAt: article.publishedAt || article.publishedDate || "",
      readingTime: article.readingTime || "",
      featuredImage: urlForImage(article.featuredImage) || article.featuredImage || "",
      excerpt: article.excerpt || "",
      body: article.body || article.bodyText || "",
      bodyBlocks: article.body || article.bodyBlocks || [],
      tags: article.tags || [],
      featured: Boolean(article.featured),
      homepageFeatured: Boolean(article.homepageFeatured || article.featured),
      seoTitle: article.seoTitle || article.title,
      seoDescription: article.seoDescription || article.excerpt,
      seoImage: urlForImage(article.seoImage) || ""
    };
  }

  function normalizeVideo(video) {
    if (!video) return null;
    return {
      id: video.slug || video.id || video._id,
      title: video.title,
      slug: video.slug,
      category: video.category || "Field Briefing",
      categorySlug: video.categorySlug || "",
      thumbnail: urlForImage(video.thumbnail) || video.thumbnail || "",
      videoUrl: video.videoUrl || "",
      platform: video.platform || "External",
      description: video.description || "",
      publishedAt: video.publishedAt || "",
      duration: video.duration || "",
      featured: Boolean(video.featured),
      seoTitle: video.seoTitle || video.title,
      seoDescription: video.seoDescription || video.description
    };
  }

  function normalizeAuthor(author) {
    if (!author) return null;
    return {
      id: author.id || author._id,
      name: author.name,
      slug: author.slug || "",
      image: urlForImage(author.image) || author.image || "",
      role: author.role || "",
      bio: author.bio || "",
      socialLinks: author.socialLinks || {}
    };
  }

  function normalizeCategory(category) {
    if (!category) return null;
    return {
      id: category.id || category._id,
      title: category.title,
      slug: category.slug || "",
      description: category.description || "",
      accent: category.accent || ""
    };
  }

  const articleFields = `{
    "id": _id,
    title,
    "slug": slug.current,
    "category": category->title,
    "categorySlug": category->slug.current,
    type,
    "authorId": author->_id,
    publishedAt,
    readingTime,
    featuredImage,
    excerpt,
    "bodyBlocks": body,
    "bodyText": pt::text(body),
    tags,
    featured,
    homepageFeatured,
    seoTitle,
    seoDescription,
    seoImage
  }`;

  const videoFields = `{
    "id": _id,
    title,
    "slug": slug.current,
    "category": category->title,
    "categorySlug": category->slug.current,
    thumbnail,
    videoUrl,
    platform,
    description,
    publishedAt,
    duration,
    featured,
    seoTitle,
    seoDescription
  }`;

  async function fetchLatestArticles() {
    const result = await fetchGroq(`*[_type == "article"] | order(publishedAt desc) ${articleFields}`);
    return (result || fallbackContent.articles).map(normalizeArticle).filter(Boolean);
  }

  async function fetchFeaturedArticles() {
    const result = await fetchGroq(`*[_type == "article" && (featured == true || homepageFeatured == true)] | order(publishedAt desc) ${articleFields}`);
    const articles = result && result.length ? result : fallbackContent.articles.filter((article) => article.featured || article.homepageFeatured);
    return articles.map(normalizeArticle).filter(Boolean);
  }

  async function fetchArticleBySlug(slug) {
    const result = await fetchGroq(`*[_type == "article" && slug.current == $slug][0] ${articleFields}`, { slug });
    const article = result || fallbackContent.articles.find((item) => item.slug === slug || item.id === slug);
    return normalizeArticle(article);
  }

  async function fetchArticlesByType(type) {
    const result = await fetchGroq(`*[_type == "article" && type == $type] | order(publishedAt desc) ${articleFields}`, { type });
    const articles = result || fallbackContent.articles.filter((article) => article.type === type);
    return articles.map(normalizeArticle).filter(Boolean);
  }

  async function fetchArticlesByCategory(categorySlug) {
    const result = await fetchGroq(`*[_type == "article" && category->slug.current == $categorySlug] | order(publishedAt desc) ${articleFields}`, { categorySlug });
    const articles = result || fallbackContent.articles.filter((article) => article.categorySlug === categorySlug);
    return articles.map(normalizeArticle).filter(Boolean);
  }

  async function fetchRelatedArticles(categorySlug, currentSlug) {
    const result = await fetchGroq(`*[_type == "article" && category->slug.current == $categorySlug && slug.current != $currentSlug] | order(publishedAt desc)[0...3] ${articleFields}`, { categorySlug, currentSlug });
    const articles = result || fallbackContent.articles.filter((article) => article.categorySlug === categorySlug && article.slug !== currentSlug).slice(0, 3);
    return articles.map(normalizeArticle).filter(Boolean);
  }

  async function fetchVideos() {
    const result = await fetchGroq(`*[_type == "videoReel"] | order(publishedAt desc) ${videoFields}`);
    return (result || fallbackContent.videos).map(normalizeVideo).filter(Boolean);
  }

  async function fetchFeaturedVideos() {
    const result = await fetchGroq(`*[_type == "videoReel" && featured == true] | order(publishedAt desc) ${videoFields}`);
    const videos = result && result.length ? result : fallbackContent.videos.filter((video) => video.featured);
    return videos.map(normalizeVideo).filter(Boolean);
  }

  async function fetchCategories() {
    const result = await fetchGroq(`*[_type == "category"] | order(title asc) {
      "id": _id,
      title,
      "slug": slug.current,
      description,
      accent
    }`);
    return (result || fallbackContent.categories).map(normalizeCategory).filter(Boolean);
  }

  async function fetchAuthors() {
    const result = await fetchGroq(`*[_type == "author"] | order(name asc) {
      "id": _id,
      name,
      "slug": slug.current,
      image,
      role,
      bio,
      socialLinks
    }`);
    return (result || fallbackContent.authors).map(normalizeAuthor).filter(Boolean);
  }

  window.ClimateLensCMS = {
    fallbackContent,
    fetchLatestArticles,
    fetchFeaturedArticles,
    fetchArticleBySlug,
    fetchArticlesByType,
    fetchArticlesByCategory,
    fetchRelatedArticles,
    fetchVideos,
    fetchFeaturedVideos,
    fetchCategories,
    fetchAuthors,
    urlForImage
  };

  window.fetchLatestArticles = fetchLatestArticles;
  window.fetchFeaturedArticles = fetchFeaturedArticles;
  window.fetchArticleBySlug = fetchArticleBySlug;
  window.fetchArticlesByType = fetchArticlesByType;
  window.fetchArticlesByCategory = fetchArticlesByCategory;
  window.fetchRelatedArticles = fetchRelatedArticles;
  window.fetchVideos = fetchVideos;
  window.fetchFeaturedVideos = fetchFeaturedVideos;
  window.fetchCategories = fetchCategories;
  window.fetchAuthors = fetchAuthors;
  window.urlForImage = urlForImage;
})();
