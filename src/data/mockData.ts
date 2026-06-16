import { Author, Category, Article, Video } from '../types';

export const mockAuthors: Author[] = [
  {
    id: 'david-alvarez',
    name: 'David Alvarez',
    role: 'Lead Investigative Correspondent',
    bio: 'David Alvarez is an award-winning investigative journalist who has spent fifteen years reporting from the frontlines of climate science and changing ecosystems. Formerly an environmental editor for international news bureaus, his interest lies in policy failures, corporate compliance, and forest ecology.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400&h=400'
  },
  {
    id: 'elena-rostova',
    name: 'Dr. Elena Rostova',
    role: 'Contributing Climate Scientist & Columnist',
    bio: 'Dr. Elena Rostova holds a Ph.D. in Atmospheric Sciences and teaches Climate Policy at the Global Earth Institute. Her contributions explain the mathematical physics of rising planetary trends in terms understandable to the lay public.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400&h=400'
  },
  {
    id: 'marcus-chen',
    name: 'Marcus Chen',
    role: 'Senior Technology & Energy Analyst',
    bio: 'Marcus Chen covers clean energy transitions, battery chemistry breakthroughs, power grid dynamics, and the economic hurdles of transitioning from fossil fuels. He is based in Seattle, WA.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=400'
  },
  {
    id: 'sarah-jenkins',
    name: 'Sarah Jenkins',
    role: 'Global Field Correspondent',
    bio: 'Sarah Jenkins covers rural resilience, agricultural adaptation, and alpine glaciology. She travels extensively across South America, the Arctic, and South-East Asia reporting on community-led mitigation efforts.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400&h=400'
  }
];

export const mockCategories: Category[] = [
  {
    id: 'climate-news',
    title: 'Climate News',
    slug: 'climate-news',
    description: 'Up-to-the-minute updates and analytical reportage on unfolding planetary developments, policy shifts, and climatic extreme updates.'
  },
  {
    id: 'investigations',
    title: 'Investigations',
    slug: 'investigations',
    description: 'Deep-dive, evidence-based investigative journalism exposing systemic corporate greenwashing, regulatory failures, and structural challenges.'
  },
  {
    id: 'climate-explained',
    title: 'Climate Explained',
    slug: 'climate-explained',
    description: 'Educational, highly accessible guides on environmental science, earth systems dynamics, core chemistry, and global policies.'
  },
  {
    id: 'policy-adaptation',
    title: 'Policy & Adaptation',
    slug: 'policy-adaptation',
    description: 'Examining global treaties, local structural engineering, agricultural shifts, and municipal heat adaptation strategies.'
  },
  {
    id: 'biodiversity',
    title: 'Biodiversity & Science',
    slug: 'biodiversity',
    description: 'Tracking ecosystem breakdowns, wildlife displacement, oceanic thermal conditions, and conservation biology updates.'
  }
];

export const mockArticles: Article[] = [
  {
    id: 'wildfire-smoke-public-health',
    title: 'Wildfire Smoke Is Becoming a Public Health Crisis',
    slug: 'wildfire-smoke-public-health',
    category: 'Climate News',
    authorId: 'david-alvarez',
    publishedDate: '2026-06-08',
    featuredImage: 'https://images.unsplash.com/photo-1542353436-7141f2c90865?auto=format&fit=crop&q=80&w=1200',
    tags: ['Air Quality', 'Public Health', 'Wildfires', 'Inhalation Risks'],
    readingTime: '6 min read',
    featured: true,
    isInvestigation: false,
    seoTitle: 'Wildfire Smoke Public Health Crisis & Air Quality Solutions',
    seoDescription: 'As wildfire seasons lengthen, smoke reaches communities hundreds of miles away, escalating public health risks, air filtration demands, and clinical challenges.',
    excerpt: 'Wildfire smoke is now reaching communities far beyond fire zones, raising new concerns about air quality, public health, and climate preparedness.',
    body: `As wildfire seasons grow longer and more unpredictable, smoke exposure is becoming a serious public health concern. Cities hundreds of miles away from active fires are experiencing poor air quality, school closures, and increased health warnings. Experts say climate change is intensifying dry conditions, raising temperatures, and increasing the risk of severe fire events. The challenge now is not only fighting fires, but preparing homes, schools, and health systems for smoke-related risks.

## The Microscopic Threat: PM2.5 Inhalation
Unlike fireplace soot, wildfire smoke contains ultra-fine particulate matter measuring less than 2.5 micrometers in diameter (PM2.5). These tiny particles bypass normal human upper-airway filtration mechanisms and settle deep within alveolar sacs, penetrating directly into the bloodstream.

Pulmonary doctors warn that chronic exposure under active smoke episodes causes localized high-volume inflammation, worsening prior asthmatic conditions, chronic obstructive pulmonary disease (COPD), and cardiac strain. "We are seeing high spikes in emergency hospital admissions even in cities that are located over 800 miles from the active forest perimeter," notes Dr. Elena Rostova.

## Infrastructure and Adaptation Gap
Most historical public health strategies relied on short-lived alerts, advising residents to "stay indoors". However, modern high-heat summer episodes make staying indoors in un-air-conditioned homes a secondary health risk. 

Furthermore, standard modern HVAC systems do not filter PM2.5 particles dynamically unless outfitted with high-efficiency MERV 13 or HEPA media. Our state-level investigation shows that over 74% of public schools situated in high-risk zones lack adequate climate-resilient ventilation models. Overcoming this adaptation debt will require massive structural retrofits.

> "The true cost of wildfires is no longer measured solely in acres burned or homes destroyed. It is measured in the silent, cumulative damage to the lungs of millions of urban residents."

## Preparing Systems for an Unpredictable Future
Faced with these realities, environmental scientists and city planners are urging immediate state interventions:
- **Clean Air Sanctuaries:** Establishing central municipal facilities outfitted with deep air-cleaning systems where residents can escape hazardous outdoor AQI ranges.
- **Improved Forecasting Models:** Using satellite aerosol mapping and drone-based vertical atmosphere tracking to give communities accurate 48-hour warnings.
- **Code Retrofits:** Updating residential building bylaws to mandate positive-pressure ventilation and tight building envelopes in wildfire interfaces.

Ultimately, mitigating this structural crisis demands addressing the fuel loads accumulating due to centuries of fire suppression, alongside global carbon mitigation.`
  },
  {
    id: 'rising-heat-urban-bento',
    title: 'The Silent Killers: Thermal Islanding In Dense Modern Cities',
    slug: 'rising-heat-urban-bento',
    category: 'Investigations',
    authorId: 'david-alvarez',
    publishedDate: '2026-06-03',
    featuredImage: 'https://images.unsplash.com/photo-1527030280862-64139fbe04ca?auto=format&fit=crop&q=80&w=1200',
    tags: ['Urban Ecology', 'Thermal Islands', 'Social Equity', 'Municipal Action'],
    readingTime: '12 min read',
    featured: false,
    isInvestigation: true,
    seoTitle: 'Urban Heat Islands: How Thermal Storage Threatens Under-resourced Neighborhoods',
    seoDescription: 'An in-depth climate investigation into high municipal thermal storage, asphalt density, tree canopy inequalities, and rising urban mortality.',
    excerpt: 'An investigative report exposing how architectural materials and structural planning create hyper-localized thermal pressure cookers, disproportionately impacting low-income communities.',
    body: `In hot summer months, modern metropolitan areas transform into structural radiators. Concrete skyscrapers, asphalt road networks, and dark roofing materials absorb solar radiation during daylight and store it. At night, while rural green fields cool rapidly, urban centers emit this stored heat back into the surrounding air, creating a persistent, localized thermal bubble known as the Urban Heat Island (UHI) effect.

Our investigative team spent two weeks using high-altitude thermal infrared cameras to map surface temperatures across major demographic zip codes. The findings reveal a stark ecological injustice: dense, low-income neighborhoods with high concrete density and absent forest canopy record summer midnight temperatures up to 14°F (7.8°C) higher than neighboring wealthy, tree-lined suburbs.

## Mapping the Asphalt-to-Canopy Inequality
The discrepancy is not accidental; it is the lingering legacy of systemic urban planning practices. Areas with high industrial zoning, heavy multi-lane highway loops, and minimal public parks retain substantial heat energy.

- **Concreting the Common Ground:** Standard grey asphalt absorbs up to 95% of incoming solar radiation.
- **The Evaporative Cooling Deficit:** Tree leaves perform evapotranspiration, acting as natural cellular air conditioners. Removing urban trees removes this latent cooling power.
- **Inequitable Canopies:** In wealthy neighborhoods, tree canopy coverage regularly exceeds 45%. In historically redlined industrial zones, canopy coverage often drops below 6%.

> "Urban heat is not just an environmental inconvenience. It acts as an invisible magnifier of pre-existing cardiovascular, respiratory, and socioeconomic vulnerabilities."

## The Healthcare Ingress
During extreme atmospheric heat waves, health systems report a dramatic influx of heat exhaustion, severe dehydration, and renal strain. Because overnight temperatures in concrete zones do not drop low enough to allow the human vascular system to recover, physiological strain accumulates. 

Furthermore, high grid strain from localized air conditioning units triggers regional brownouts, shutting down medical devices and fans when they are needed most.

## Structural Retrofittings and Canopy Reparations
Resolving municipal thermal strain requires radical redesign of our cities:
1. **Cool Pavement Technologies:** Using reflective titanium dioxide emulsions on asphalt to scatter solar radiation back into space.
2. **Aggressive Urban Forestry:** Investing in targeted tree planting initiatives centered exclusively on low-income, high-asphalt areas.
3. **Mandated Green Roofs:** Requiring all news construction over 15,000 square feet to install solar or vegetated rooftops to actively cool air drafts.`
  },
  {
    id: 'coastal-walls-adaptation',
    title: 'Rising Currents: Can Coastal Infrastructure Adaptive Engineering Save Our Ports?',
    slug: 'coastal-walls-adaptation',
    category: 'Policy & Adaptation',
    authorId: 'sarah-jenkins',
    publishedDate: '2026-05-28',
    featuredImage: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&q=80&w=1200',
    tags: ['Sea Level Rise', 'Marine Engineering', 'Coastlines', 'Municipal Planning'],
    readingTime: '9 min read',
    featured: false,
    isInvestigation: false,
    seoTitle: 'Coastal Infrastructure Adaptive Engineering for Port Cities',
    seoDescription: 'Examining global maritime defenses, tidal gates, storm surges, and the engineering behind protecting our global shipping lanes.',
    excerpt: 'As global sea levels creep upward, major port networks are racing against time, adopting tidal gates, massive sea walls, and nature-based living breakwaters.',
    body: `Over 90% of global commerce is distributed via maritime shipping lanes, making port terminals the vital conduits of modern life. Yet, because these structures inherently exist at sea level, they represent some of the most exposed nodes on our warming planet.

From Rotterdam to Singapore, ports are facing a multi-front threat: rising baseline tides, high storm surges, and elevated salt corrosion of structural marine concrete. Engineers are realizing that passive, static sea defenses are no longer robust enough to handle the non-linear predictions of polar ice shelf melt.

## Rotterdam’s Dutch Masterclass: The Maeslantkbarrier
The Maeslantkbarrier is one of the world's most sophisticated moving physical structures. When a storm surge exceeding 3 meters is predicted, automatic computer systems command two massive hollow steel gates—each as tall as the Eiffel Tower—to pivot shut, flooding internal chambers with water to sink them securely into dynamic sill foundations.

Yet, even the Dutch are realizing that building ever-higher concrete walls creates a "holding back the ocean" paradox. If physical barriers fail, the resulting flooding is catastrophic. Modern approaches are shifting from rigid wall barriers to dynamic water absorption zones.

## Living Breakwaters: Merging Concrete and Nature
Rather than fighting hydrodynamic forces, ecological engineers are using nature’s shock absorbers:
- **Mangrove Forest Restoration:** Tidal networks absorb wave kinetic energy exponentially better than flat concrete vertical walls.
- **Oyster Reef Reconstruction:** Rocky oyster beds create messy, multi-level structural barriers that break high waves, while filtering adjacent coastal waters.
- **Managed Retreat:** In certain highly compromised locations, municipal planners are taking the painful decision to move warehouses and docks further inland, turning low-lying terminal bays into public flood buffers.

> "We cannot build our way out of ocean rise with steel and Portland cement alone. We must learn to design coastal zones that know how to get wet without breaking."`
  },
  {
    id: 'clean-energy-transition-grid',
    title: 'The Great Grid Bottleneck: Why Clean Energy Is Stranded on Rolling Hills',
    slug: 'clean-energy-transition-grid',
    category: 'Policy & Adaptation',
    authorId: 'marcus-chen',
    publishedDate: '2026-05-22',
    featuredImage: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=1200',
    tags: ['RENEWABLE ENERGY', 'Power Grids', 'Transmission', 'Infrastructure'],
    readingTime: '8 min read',
    featured: false,
    isInvestigation: false,
    seoTitle: 'Grid Interconnection Backlogs Stranding Wind and Solar Power',
    seoDescription: 'Hundreds of gigawatts of clean energy are ready to connect to the grid, but outdated transmission lines and complex regulatory reviews leave them waiting.',
    excerpt: 'Investigating the massive interconnection queues and transmission line shortages that keep gigawatts of wind and solar power locked out of local households.',
    body: `Across rural mountain passes and sun-baked plains, private energy developers have built thousands of high-tech solar collectors and elegant wind turbines. They are ready to feed clean, virtually free electrons into regional communities. Yet, much of this capacity remains completely static.

The issue lies in a massive, hidden infrastructure bottleneck: our national electrical transmission grid wasn't physically built for decentralization.

## The Interconnection Queue Crisis
Historically, electricity generation followed a centralized hub-and-spoke configuration: a massive fossil fuel or nuclear plant operated adjacent to a major metropolitan area, pushing energy outward through short high-voltage cables.

Today, wind is strongest in remote plains, and sun is most potent in deserts. Moving this electricity to coastal cities requires long-distance High-Voltage Direct Current (HVDC) lines. Currently, wind and solar projects wait an average of five years just to get approved for grid interconnection.

- **Stranded Electrons:** Over 1,200 gigawatts of wind, solar, and battery storage are currently waiting in federal interconnection queues.
- **Transmission Deficit:** In the last decade, high-voltage line construction decreased by nearly 62% due to state-border regulatory disputes and local property resistance.
- **The Transformer Shortage:** High demand and limited copper coil manufacturing have sent lead times for heavy grid transformers soaring to over three years.

> "Our wind turbines are spinning on remote hills, and our solar fields are basking in desert sun, yet coal plants continue to burn because we cannot run a cable between them."

## Modernizing the High-Voltage Highway
Tackling the transmission crisis requires major federal and mechanical updates. "Grid enhancing technologies" (GETs) allow utilities to double the capacity of existing lines using smart thermal sensors, dynamic ampacity tracking, and high-performance carbon-core conductors. Highlighting these options, energy reform advocates are pushing for streamlined fast-track permitting pathways to bypass local regulatory gridlocks.`
  },
  {
    id: 'understanding-ocean-circulation-collapse',
    title: 'AMOC Explained: Why Scientists Fear the Collapse of Atlantic Ocean Currents',
    slug: 'understanding-ocean-circulation-collapse',
    category: 'Climate Explained',
    authorId: 'elena-rostova',
    publishedDate: '2026-05-15',
    featuredImage: 'https://images.unsplash.com/photo-1546500840-ae38253aba9b?auto=format&fit=crop&q=80&w=1200',
    tags: ['AMOC', 'Oceanography', 'Earth Systems', 'Climatology'],
    readingTime: '5 min read',
    featured: false,
    isInvestigation: false,
    isExplained: true,
    seoTitle: 'Atlantic Meridional Overturning Circulation (AMOC) Collapse Science',
    seoDescription: 'A direct educational explainer outlining the AMOC heat conveyor, salinity dynamics, melting ice triggers, and worldwide thermal consequences.',
    excerpt: 'An educational breakdown of the Atlantic Ocean’s great conveyor belt, why melting Greenland ice threatens its stability, and what happens next.',
    body: `The Atlantic Meridional Overturning Circulation, or **AMOC**, is one of Earth’s most vital planetary systems. It operates as a global aquatic conveyor belt, distributing tropical heat from the equator up into the North Atlantic, maintaining temperate climates in Europe.

However, recent oceanographic measurements show that AMOC has weakened by nearly 15% since the mid-20th century, prompting worries about a potential tipping point.

## How the Atlantic Conveyor Belts Works
This massive oceanic current is propelled by a natural engine of temperature and salinity differences:
1. **The Tropical Pathway:** Warm, shallow saline water flows north from the equatorial Atlantic (including the Gulf Stream).
2. **The Arctic Cooling Zone:** As this water reaches Greenland, it releases its heat into the cold northern air, warming Northern Europe.
3. **The Deep Sinking Current:** Cold, dense, highly saline water sinks deep to the ocean floor and flows backward toward the southern hemisphere.

This deep sinking action is the motor driving the entire global loop.

## The Freshwater Threat: Melting Ice Sheets
The primary threat to this engine is the rapid melting of the Greenland ice sheet. As gigatons of fresh, non-saline meltwater enter the North Atlantic, they dilute the ocean’s surface salinity.

Because fresh water is far less dense than saline water, it does not sink. This dilution slows or halts the overturning action of the conveyor belt, keeping heat trapped in the Southern Ocean and depriving the North Atlantic of vital warmth.

## What a Collapse Actually Means
A structural collapse of AMOC would trigger immediate, permanent shifts in planetary weather:
- **European Deep Freeze:** Average winter temperatures in Northern Europe could drop by up to 15°F, severely impacting agricultural food supplies.
- **Equatorial Rain Shift:** Tropical monsoon zones would shift south, dropping rainfall away from Central American and Sub-Saharan African bands, triggering widespread agricultural stress.
- **Accelerated Sea Rise:** Warm water piling up along the East Coast of North America would accelerate localized sea-level rise by over a foot.`
  },
  {
    id: 'understanding-carbon-sinks-soil',
    title: 'Earth’s Hidden Reservoir: Can Regenerative Soils Act as Effective Carbon Sinks?',
    slug: 'understanding-carbon-sinks-soil',
    category: 'Climate Explained',
    authorId: 'elena-rostova',
    publishedDate: '2026-04-20',
    featuredImage: 'https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?auto=format&fit=crop&q=80&w=1200',
    tags: ['Carbon Sinks', 'Agroecology', 'Soil Science', 'Carbon Capture'],
    readingTime: '5 min read',
    featured: false,
    isInvestigation: false,
    isExplained: true,
    seoTitle: 'Regenerative Agriculture & Soil Chemistry as Carbon Sinks',
    seoDescription: 'An educational guide examining organic soil carbon retention, mycorrhizal networks, tilling impacts, and global climate sequestration.',
    excerpt: 'An environmental science guide breaking down the biological processes of soil carbon sequestration, its chemical limits, and agricultural solutions.',
    body: `When we talk about reducing atmospheric CO2, we think of massive forests and high-tech mechanical carbon-scrubbing fans. Yet, a far more powerful, ancient sink exists directly beneath our feet: the Earth's soil.

Soil contains more carbon than the atmosphere and all living plant life combined. However, centuries of high-impact intensive agriculture have depleted these underground reservoirs, releasing billions of tons of carbon.

## The Biological Carbon Transit
Soil carbon storage is driven by standard plant sugars and complex underground fungal networks:
1. **Photosynthesis:** Plants pull CO2 from air, converting it into simple starches.
2. **Root Exudates:** Plants pump up to 40% of this carbon down through their roots as sugars to feed underground bacterial colonies.
3. **Mycorrhizal Networks:** Vast underground fungal webs convert these simple sugars into stable organic compounds like glomalin, trapping carbon within the soil matrix for decades.

## How Modern Agriculture Disrupts the Soil Engine
Standard contemporary farming practices reverse this natural sequestration:
- **Deep Tilling:** Ripping open soils exposes organic carbon to atmospheric oxygen, instantly combining to create CO2 gas.
- **Synthetic Nitrogen Overuse:** Excessive fertilizers kill the symbiotic mycorrhizal fungi, forcing plants to stop pumping carbon underground.
- **Fallowing and Monoculture:** Leaving soil empty for months deprives subterranean biology of a steady, living carbon supply.

## Restoring soil carbon: No-Till and Cover Cropping
By switching to **regenerative agriculture**—characterized by zero-till planting, permanent living cover crops, and diverse crop rotations—farmers can restore soil health and sequester substantial atmospheric carbon. 

While soil sequestration cannot single-handedly solve global emissions, it remains a vital natural tool for building resilient agricultural systems in an unpredictable climate.`
  },
  {
    id: 'investigation-greenwashing-credits',
    title: 'Ghost Forests: Exposing the Phantom Carbon Offsets Saving Oil Behemoths',
    slug: 'investigation-greenwashing-credits',
    category: 'Investigations',
    authorId: 'david-alvarez',
    publishedDate: '2026-05-10',
    featuredImage: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&q=80&w=1200',
    tags: ['Carbon Offsets', 'Greenwashing', 'Corporate Audits', 'Policy Failures'],
    readingTime: '15 min read',
    featured: false,
    isInvestigation: true,
    seoTitle: 'Phamtom Carbon Offsets Scandal & Global Corporate Greenwashing',
    seoDescription: 'A multi-month investigation revealing how global energy conglomerates purchase non-existent carbon credits from unmanaged tropical forest zones.',
    excerpt: 'Our multi-month global investigation into how international energy giants buy worthless carbon offsets from unmanaged, wildfire-ravaged tropical forests.',
    body: `Over the past five years, prominent oil and gas conglomerates have proudly displayed "Net Zero" and "Carbon Neutral" certifications on their marketing materials. These claims rely on a multi-billion-dollar global commodity market: forest-preservation carbon offsets.

The mechanism is simple: corporate emitters pay local entities in tropical regions to protect forests that were allegedly under threat of immediate logging. Every ton of forest biomass preserved supposedly offsets one ton of active industrial emissions.

Our team, in partnership with satellite intelligence analysts, spent four months auditing 45 major offset forestry reserves in the Amazon, Central Africa, and Southeast Asia. The resulting database reveals that over 82% of these projects are "phantom offsets" that fail to deliver real, tambahan carbon benefits.

## The Triad of Carbon Offset Failure
Our audit identified three structural flaws that make standard carbon credit accounting highly unreliable:
1. **Gross Baseline Inflations:** Forestry developers routinely claim that adjacent forests are under intense logging threats, even when they are situated in inaccessible, rocky mountain ranges with zero road networks.
2. **Leakage Displacement:** Protecting one specific patch of forest simply drives regional timber companies to clear trees five miles away, resulting in zero net carbon gains.
3. **Impermanence Vulnerability:** Many protected offset tracts have recently burned down in dry-season wildfires, releasing their stored carbon back into the atmosphere and erasing corporate offsets on paper.

> "A carbon offset is a financial ticket to commit and emit today in exchange for a promise of preservation tomorrow—a promise that often burns to ash before the ink is dry."

## Audit Case Study: The Alto Mayo Tract
In Peru’s Alto Mayo protection project, major energy companies purchased millions of credits to offset carbon dioxide emissions. Yet, our on-the-ground reporting revealed that local farmers had already cleared significant parts of the "protected" reserve for coffee cultivation. 

satellite imagery confirms that forest losses within this carbon project are nearly identical to unmanaged areas, making the offsets completely worthless.

## Demanding Direct, Verifiable Decarbonization
Confronted with these facts, environmental organizations are urging governments to restrict offset credits. Instead of purchasing vague offsets, corporations must invest in direct, verifiable emissions reductions within their own operations, such as electrifying fleets, replacing coal facilities, and matching grid usage with real-time zero-emission energy.`
  },
  {
    id: 'community-resilience-andes-glaciers',
    title: 'High-Altitude Survival: How Andean Communities Adapt to Dying Glaciers',
    slug: 'community-resilience-andes-glaciers',
    category: 'Policy & Adaptation',
    authorId: 'sarah-jenkins',
    publishedDate: '2026-05-02',
    featuredImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200',
    tags: ['Glaciology', 'Water Security', 'Indigenous Wisdom', 'Andes Mountains'],
    readingTime: '10 min read',
    featured: false,
    isInvestigation: false,
    seoTitle: 'Andean Glacial Melt & DIY Community Water Systems',
    seoDescription: 'Reporting on Peru’s high-altitude farmers constructing decentralized stone reservoirs and using ancient canals to survive dying ice resources.',
    excerpt: 'In the high Peru Andes, indigenous farming communities are building decentralized stone reservoirs and reviving pre-Incan canals to secure seasonal water.',
    body: `In the high-altitude reaches of Peru’s Cordillera Blanca, life is historically synchronized with the seasonal melting of glaciers. For centuries, these ancient ice sheets acted as water towers, slowly releasing meltwater throughout dry seasons to feed potato crops and sustain livestock.

But today, these peaks are turning grey. Over 40% of the Andean glacial volume has vanished in the last half-century.

Faced with severe water scarcity, indigenous farming communities are refusing to wait for national relief. Instead, they are combining modern engineering with pre-Incan water management techniques to construct simple, reliable water infrastructure.

## Reviving the Ancient Canals of the Amunas
Before the Incas, the Wari culture constructed sophisticated diversion channels called *Amunas*. These stone-lined channels divert high-volume rain runoff away from swollen rivers during wet seasons and spread it across rocky, porous mountain gravel.

As water seeps into these underground gravel networks, it filters slowly downward through the mountain, taking three to six months to reach lower valleys. This pre-Incan system turns the mountain itself into a massive, slow-release sponge.

- **Slow-Water Seepage:** Wari-era amunas are being excavated, cleared of debris, and re-mortared with clay to restore their ancient water-buffering capacity.
- **Decentralized Stone Reservoirs:** Communities are building small stone-and-clay reservoirs high on hillsides, bypassing expensive, heavy concrete structures.
- **Native Afforestation:** Farmers are planting native *Polylepis* shrubs along key springs. These hardy mountain trees capture atmospheric fog and help trap moisture.

> "The glacier was our bank account. Now that it is empty, we must build rain catchers to catch every drop that falls before it runs out to sea."

## Adapting for the Decades Ahead
The success of these projects emphasizes that climate adaptation is not solely about multi-million-dollar coastal sea walls or high-tech desalination plants. Local, indigenous-led projects centered on ecological harmony and water conservation are offering vital blueprints for isolated communities worldwide.`
  }
];

export const mockVideos: Video[] = [
  {
    id: 'reel-smoke-school',
    title: 'What Happens to Children’s Lungs on Smoke Days?',
    category: 'Field Briefing',
    thumbnail: 'https://images.unsplash.com/photo-1542353436-7141f2c90865?auto=format&fit=crop&q=80&w=400&h=700',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', // Safe mock video track
    description: 'Field correspondent David Alvarez explains why PM2.5 bypasses child air filters and the school ventilation failure.',
    publishedDate: '2026-06-08'
  },
  {
    id: 'reel-heat-islands',
    title: 'Visualizing Urban Heat inequality with Infrared Cameras',
    category: 'Science Short',
    thumbnail: 'https://images.unsplash.com/photo-1527030280862-64139fbe04ca?auto=format&fit=crop&q=80&w=400&h=700',
    videoUrl: 'https://www.w3schools.com/html/movie.mp4', // Safe mock video track
    description: 'We took thermal imaging gear into wealthy suburbs and industrial concrete pockets. The results are stark.',
    publishedDate: '2026-06-03'
  },
  {
    id: 'reel-rotterdam-gates',
    title: ' Rotterdam’s Eiffel-Tower-Sized Storm Surge Barrier',
    category: 'Engineering Spotlight',
    thumbnail: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&q=80&w=400&h=700',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', // Safe mock video track
    description: 'A close-up look at the Maeslantkbarrier, a giant mechanical barrier protecting Rotterdam from North Sea surges.',
    publishedDate: '2026-05-28'
  },
  {
    id: 'reel-grid-explain',
    title: 'Why Clean Energy Is Stranded in Interconnection Queues',
    category: 'Science Short',
    thumbnail: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=400&h=700',
    videoUrl: 'https://www.w3schools.com/html/movie.mp4', // Safe mock video track
    description: 'Can we fix our outdated transmission grid bottleneck before climate change runs away? A 60-second deep dive.',
    publishedDate: '2026-05-22'
  }
];
