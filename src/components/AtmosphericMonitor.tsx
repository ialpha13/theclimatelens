import React, { useState } from 'react';
import { Sparkles, TrendingUp, HelpCircle, Thermometer, Waves, Droplet, Milestone, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface IndicatorData {
  id: string;
  name: string;
  subtitle: string;
  currentValue: string;
  baselineValue: string;
  changeRate: string;
  source: string;
  icon: React.ReactNode;
  color: string;
  historicalPoints: { label: string; value: number; keyText?: string }[];
  impactNotes: string[];
}

export function AtmosphericMonitor() {
  const [activeIndicator, setActiveIndicator] = useState<string>('co2');
  const [selectedYearIndex, setSelectedYearIndex] = useState<number | null>(null);
  const [indicatorViewMode, setIndicatorViewMode] = useState<'current' | 'history' | 'impact'>('current');

  const indicators: IndicatorData[] = [
    {
      id: 'co2',
      name: 'Atmospheric CO₂ Concentration',
      subtitle: 'Mauna Loa Observatory Flask Samples',
      currentValue: '426.87 ppm',
      baselineValue: '280.00 ppm (Pre-Industrial)',
      changeRate: '+2.41 ppm / year',
      source: 'NOAA / Scripps Oceanography (June 2026)',
      icon: <Droplet className="h-5 w-5 text-amber-600" />,
      color: '#c59b27',
      historicalPoints: [
        { label: '1750', value: 280, keyText: 'Pre-Industrial Baseline' },
        { label: '1900', value: 295, keyText: 'Coal Expansion Age' },
        { label: '1960', value: 317, keyText: 'Keeling Curve Initiated' },
        { label: '1980', value: 338 },
        { label: '2000', value: 369 },
        { label: '2015', value: 400, keyText: 'Paris Agreement threshold passed' },
        { label: '2026', value: 426, keyText: 'Active Satellite Record' },
      ],
      impactNotes: [
        'Traps solar infrared energy inside the biosphere, driving warming.',
        'Accelerates ocean acidification, damaging coral calcification.',
        'Extends heatwave limits and alters precipitation contours globally.'
      ]
    },
    {
      id: 'temp',
      name: 'Global Temperature Anomaly',
      subtitle: 'Global Land-Ocean Temperature Index',
      currentValue: '+1.48°C',
      baselineValue: '0.0°C (1850-1900 Avg)',
      changeRate: '+0.18°C per decade',
      source: 'NASA GISS / Copernicus Climate Service',
      icon: <Thermometer className="h-5 w-5 text-red-700" />,
      color: '#b91c1c',
      historicalPoints: [
        { label: '1880', value: -0.16 },
        { label: '1910', value: -0.28, keyText: 'Historical Cool Apex' },
        { label: '1940', value: 0.02 },
        { label: '1970', value: -0.04, keyText: 'Modern Acceleration Base' },
        { label: '1990', value: 0.44 },
        { label: '2010', value: 0.72 },
        { label: '2026', value: 1.48, keyText: 'Active El Niño + Solar peak anomalies' }
      ],
      impactNotes: [
        'Melts continental glaciers, accelerating high-altitude runoff deficits.',
        'Triples the likelihood of extreme high-latitude high-pressure blocks.',
        'Forces massive geographical shifts in agricultural bioclimatic limits.'
      ]
    },
    {
      id: 'sealevel',
      name: 'Global Mean Sea Level Change',
      subtitle: 'Satellite Altimetry Record (GMSL)',
      currentValue: '+104.2 mm',
      baselineValue: '0.0 mm (1993 Altimetry Datum)',
      changeRate: '+4.6 mm / year',
      source: 'NASA Sea Level Change Science Team',
      icon: <Waves className="h-5 w-5 text-blue-800" />,
      color: '#1e40af',
      historicalPoints: [
        { label: '1993', value: 0, keyText: 'Altimeter Launch' },
        { label: '1998', value: 12 },
        { label: '2004', value: 31 },
        { label: '2010', value: 48 },
        { label: '2016', value: 71, keyText: 'Greenland melting acceleration' },
        { label: '2021', value: 92 },
        { label: '2026', value: 104, keyText: 'High Tide Nuisance Flooding' }
      ],
      impactNotes: [
        'Pushes saltwater wedges up coastal rivers, compromising fresh aquifer intakes.',
        'Magnifies storm surge reaches during cyclones and high astronomical tides.',
        'Forces expensive infrastructure retreats in low-lying maritime ports.'
      ]
    },
    {
      id: 'oceanheat',
      name: 'Ocean Heat Content Anomaly',
      subtitle: '0-2000m Depth Thermal Energy Storage',
      currentValue: '+284 ZJ',
      baselineValue: '0.0 Zettajoules (1955-2000 Baseline)',
      changeRate: '+9.5 ZJ / average year',
      source: 'NOAA National Centers for Environmental Info',
      icon: <Sparkles className="h-5 w-5 text-amber-500" />,
      color: '#d97706',
      historicalPoints: [
        { label: '1960', value: -12, keyText: 'Pre-Satellite Depth Modeling' },
        { label: '1975', value: 0 },
        { label: '1990', value: 35 },
        { label: '2000', value: 78, keyText: 'Argo Float Buoy Launch' },
        { label: '2010', value: 142 },
        { label: '2018', value: 218 },
        { label: '2026', value: 284, keyText: 'Marine Heat Wave Epidemic' }
      ],
      impactNotes: [
        '90% of global excess system heat is sequestered in the marine layer.',
        'Triggers widespread bleaching events in pristine coral systems.',
        'Thermal expansion accounts for nearly half of active global sea-level rise.'
      ]
    }
  ];

  const currentActive = indicators.find(ind => ind.id === activeIndicator) || indicators[0];

  // Helper calculation for SVG line path drawing
  const generateSvgLine = (points: { value: number }[]) => {
    if (points.length < 2) return '';
    const minVal = Math.min(...points.map(p => p.value));
    const maxVal = Math.max(...points.map(p => p.value));
    const valRange = maxVal - minVal === 0 ? 1 : maxVal - minVal;

    const width = 600;
    const height = 180;
    const padding = 20;

    const graphWidth = width - padding * 2;
    const graphHeight = height - padding * 2;

    return points.map((p, index) => {
      const x = padding + (index / (points.length - 1)) * graphWidth;
      const pct = (p.value - minVal) / valRange;
      const y = height - padding - pct * graphHeight; // invert Y since 0 is top
      return `${index === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
    }).join(' ');
  };

  const linePath = generateSvgLine(currentActive.historicalPoints);

  const getPercentageProgress = () => {
    const minVal = Math.min(...currentActive.historicalPoints.map(p => p.value));
    const maxVal = Math.max(...currentActive.historicalPoints.map(p => p.value));
    if (selectedYearIndex !== null) {
      const selectedVal = currentActive.historicalPoints[selectedYearIndex].value;
      const range = maxVal - minVal === 0 ? 1 : maxVal - minVal;
      return ((selectedVal - minVal) / range) * 100;
    }
    return 100;
  };

  return (
    <div className="bg-white rounded-xl border border-forest/15 overflow-hidden shadow-xs" id="atmospheric-dashboard-ledger">
      
      {/* Ledger Header */}
      <div className="bg-forest text-earth-beige p-6 sm:p-8 relative overflow-hidden">
        {/* Abstract double contour circle lines in background to reinforce climate lens theme */}
        <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 opacity-10 pointer-events-none">
          <div className="h-44 w-44 rounded-full border border-earth-beige" />
          <div className="h-40 w-40 rounded-full border border-earth-beige mt-2 ml-2" />
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Milestone className="h-4 w-4 text-gold" />
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#cac4b7] font-bold">
                CL-ATMOSPHERIC-MONITOR
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
              Atmospheric Stress Ledger
            </h2>
            <p className="font-sans text-xs text-[#cac4b7] max-w-xl">
              An active ledger of direct physical planet metrics. Read underlying baselines, click trends for timeline historical insights, or view empirical impact profiles.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-[#12241b] rounded-md px-3.5 py-1.5 border border-sage/20 font-mono text-[10px] text-gold font-bold uppercase tracking-widest">
            <span className="h-2 w-2 rounded-full bg-red-700 animate-pulse" />
            <span>Active Feed</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-forest/10 bg-[#FAF9F4]">
        
        {/* Left Column: Selector list of 4 metric cards (Col span 5) */}
        <div className="lg:col-span-4 p-4 sm:p-6 space-y-4 bg-white/70">
          <span className="font-mono text-[9px] uppercase tracking-wider font-bold text-sage block pb-1 border-b border-forest/10 mb-2">
            SELECT ATMOSPHERIC VECTOR
          </span>

          <div className="space-y-3">
            {indicators.map((ind) => {
              const isActive = activeIndicator === ind.id;
              return (
                <button
                  key={ind.id}
                  onClick={() => {
                    setActiveIndicator(ind.id);
                    setSelectedYearIndex(null);
                  }}
                  className={`w-full text-left p-4 rounded-lg border transition-all cursor-pointer flex items-center justify-between group focus:outline-none focus:ring-1 focus:ring-forest ${
                    isActive 
                      ? 'bg-[#FAF9F4] border-forest text-forest shadow-xs' 
                      : 'bg-white border-forest/10 hover:border-forest/20 text-sage hover:text-forest'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`h-9 w-9 rounded-full flex items-center justify-center transition-colors ${
                      isActive ? 'bg-forest/5' : 'bg-forest/[0.02] group-hover:bg-forest/5'
                    }`}>
                      {ind.icon}
                    </div>
                    <div>
                      <span className={`font-serif text-sm font-bold block leading-none mb-1 transition-colors ${
                        isActive ? 'text-forest' : 'text-[#2a2a2a] group-hover:text-forest'
                      }`}>
                        {ind.name.split(' ').slice(0, 3).join(' ')}
                      </span>
                      <span className="font-mono text-[9px] uppercase text-sage block leading-none">
                        {ind.subtitle}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-mono text-xs sm:text-sm font-extrabold text-forest block leading-none">
                      {ind.currentValue}
                    </span>
                    <span className="font-mono text-[9px] font-bold text-gold block leading-none mt-1">
                      {ind.changeRate.split(' ')[0]} {ind.changeRate.split(' ').slice(1, 2)}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="p-3 bg-forest/[0.02] rounded-md border border-forest/5 mt-4">
            <div className="flex items-start gap-2 text-[10px] text-sage font-sans leading-relaxed">
              <HelpCircle className="h-4.5 w-4.5 text-sage flex-shrink-0 mt-0.5" />
              <span>
                These metrics represent direct geological baseline comparisons audited daily through high-precision altimeters, polar infrared arrays, and oceanographic monitoring networks.
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive graph, stripes, and deep data analysis (Col span 8) */}
        <div className="lg:col-span-8 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          
          {/* Section Header with tab controllers */}
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-forest/10 pb-4">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-wider font-bold text-sage">
                  SELECTED VARIABLE FILE
                </span>
                <h3 className="font-serif text-xl font-bold text-forest mt-0.5 leading-snug">
                  {currentActive.name}
                </h3>
              </div>

              {/* Toggle Buttons */}
              <div className="flex gap-1 border border-forest/10 p-0.5 roundedbg-white/40">
                {(['current', 'history', 'impact'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setIndicatorViewMode(mode)}
                    className={`px-3 py-1.5 rounded text-[10px] uppercase font-mono font-bold tracking-wider cursor-pointer border-0 ${
                      indicatorViewMode === mode 
                        ? 'bg-forest text-[#FAF9F4] font-bold' 
                        : 'bg-transparent text-sage hover:text-forest'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* TAB CONTENT PANEL BODY */}
            <div className="py-6 min-h-[220px]">
              <AnimatePresence mode="wait">
                
                {/* 1. CURRENT SUMMARY TAB */}
                {indicatorViewMode === 'current' && (
                  <motion.div 
                    key="current-tab"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                  >
                    <div className="bg-white rounded-lg border border-forest/10 p-4 shadow-2xs space-y-2">
                      <span className="font-mono text-[9px] uppercase font-bold text-sage block">Active Carbon Baseline</span>
                      <span className="font-serif text-2xl font-bold text-forest block">{currentActive.currentValue}</span>
                      <span className="font-sans text-[10px] text-sage block leading-relaxed border-t border-forest/5 pt-1.5 mt-2">
                        This reflects active thermal absorption profiles tracked at station coordinates.
                      </span>
                    </div>

                    <div className="bg-white rounded-lg border border-forest/10 p-4 shadow-2xs space-y-2">
                      <span className="font-mono text-[9px] uppercase font-bold text-sage block">Pre-Industrial Benchmark</span>
                      <span className="font-serif text-xl font-medium text-forest block">{currentActive.baselineValue}</span>
                      <span className="font-sans text-[10px] text-sage block leading-relaxed border-t border-forest/5 pt-1.5 mt-2">
                        Global environmental equilibrium states prior to high-fossil expanded industrial emissions.
                      </span>
                    </div>

                    <div className="bg-white rounded-lg border border-forest/10 p-4 shadow-2xs space-y-2">
                      <span className="font-mono text-[9px] uppercase font-bold text-sage block">Vector Rate Anomaly</span>
                      <span className="font-serif text-xl font-bold text-gold block">{currentActive.changeRate}</span>
                      <span className="font-sans text-[10px] text-sage block leading-relaxed border-t border-forest/5 pt-1.5 mt-2">
                        Estimated average speed of continuing rise computed over standard 10-year sliding frames.
                      </span>
                    </div>
                  </motion.div>
                )}

                {/* 2. HISTORY CHART TIMELINE TAB */}
                {indicatorViewMode === 'history' && (
                  <motion.div 
                    key="history-tab"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <div className="flex justify-between items-center text-[10px] font-mono text-sage">
                      <span>Historical Trendline Analysis (Standard Timeline)</span>
                      <span className="text-forest font-bold font-mono">
                        {selectedYearIndex !== null 
                          ? `Selected Point: Year ${currentActive.historicalPoints[selectedYearIndex].label}`
                          : 'Hover or click coordinates for timeline metadata'
                        }
                      </span>
                    </div>

                    {/* Interactive Climate SVG graph */}
                    <div className="relative border border-forest/10 bg-white rounded-lg p-2 overflow-hidden h-44">
                      <svg viewBox="0 0 600 180" className="w-full h-full">
                        {/* Background grid lines */}
                        <line x1="20" y1="20" x2="580" y2="20" stroke="#FAF9F4" strokeWidth="1" strokeDasharray="3" />
                        <line x1="20" y1="90" x2="580" y2="90" stroke="#FAF9F4" strokeWidth="1" strokeDasharray="3" />
                        <line x1="20" y1="160" x2="580" y2="160" stroke="#FAF9F4" strokeWidth="1" strokeDasharray="3" />

                        {/* Interactive sparkline path */}
                        <path
                          d={linePath}
                          fill="none"
                          stroke={currentActive.color}
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="transition-all duration-500"
                        />

                        {/* Visual scatter dots on points */}
                        {currentActive.historicalPoints.map((point, i) => {
                          const minVal = Math.min(...currentActive.historicalPoints.map(p => p.value));
                          const maxVal = Math.max(...currentActive.historicalPoints.map(p => p.value));
                          const valRange = maxVal - minVal === 0 ? 1 : maxVal - minVal;

                          const graphWidth = 600 - 20 * 2;
                          const graphHeight = 180 - 20 * 2;

                          const cx = 20 + (i / (currentActive.historicalPoints.length - 1)) * graphWidth;
                          const pct = (point.value - minVal) / valRange;
                          const cy = 180 - 20 - pct * graphHeight;

                          const isSelected = selectedYearIndex === i;

                          return (
                            <g key={i}>
                              <circle
                                cx={cx}
                                cy={cy}
                                r={isSelected ? 6 : 4}
                                fill={isSelected ? '#1A2F23' : currentActive.color}
                                stroke="#FFFFFF"
                                strokeWidth={isSelected ? 2 : 1.2}
                                className="cursor-pointer transition-all hover:scale-130"
                                onMouseEnter={() => setSelectedYearIndex(i)}
                                onClick={() => setSelectedYearIndex(i)}
                              />
                            </g>
                          );
                        })}
                      </svg>
                    </div>

                    {/* Highlighted Selected historical milestone card */}
                    <div className="bg-forest/[0.02] border border-forest/10 rounded-lg p-3 sm:px-4 py-3 flex justify-between items-center">
                      <div>
                        <span className="font-mono text-[9px] uppercase text-sage block leading-none mb-1">
                          Timeline Milestone
                        </span>
                        <span className="font-serif text-sm font-bold text-forest leading-none">
                          Year {currentActive.historicalPoints[selectedYearIndex ?? currentActive.historicalPoints.length - 1].label} Analysis
                        </span>
                        {currentActive.historicalPoints[selectedYearIndex ?? currentActive.historicalPoints.length - 1].keyText && (
                          <span className="text-gold font-mono text-[9px] uppercase tracking-wider block mt-1.5 font-bold">
                            ★ {currentActive.historicalPoints[selectedYearIndex ?? currentActive.historicalPoints.length - 1].keyText}
                          </span>
                        )}
                      </div>

                      <div className="text-right">
                        <span className="font-mono text-[9px] uppercase text-sage block leading-none mb-1">
                          Record Reading
                        </span>
                        <span className="font-mono text-sm font-extrabold text-[#1a2f23]">
                          {currentActive.historicalPoints[selectedYearIndex ?? currentActive.historicalPoints.length - 1].value}
                          {activeIndicator === 'co2' ? ' ppm' : activeIndicator === 'temp' ? '°C Anomaly' : activeIndicator === 'sealevel' ? ' mm' : ' ZJ Heat'}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 3. SCIENTIFIC IMPACT ANALYSIS ADVISORY */}
                {indicatorViewMode === 'impact' && (
                  <motion.div 
                    key="impact-tab"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="space-y-3"
                  >
                    <div className="flex items-center gap-1.5 text-xs text-sage font-mono pb-1 border-b border-forest/5 mb-2 uppercase">
                      <span>Secondary Physics Consequences:</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {currentActive.impactNotes.map((note, index) => (
                        <div 
                          key={index}
                          className="bg-white rounded-lg border border-forest/10 p-4 transition-shadow hover:shadow-2xs flex flex-col justify-between"
                        >
                          <div>
                            <span className="font-mono text-[10px] text-gold font-bold uppercase block mb-1">Impact Vector 0{index + 1}</span>
                            <p className="font-sans text-xs text-charcoal leading-relaxed">
                              {note}
                            </p>
                          </div>
                          
                          <div className="flex items-center gap-1.5 text-[9px] font-mono text-sage mt-4 border-t border-forest/5 pt-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-forest" />
                            <span>Empirically Audited</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Source Attribution details */}
          <div className="border-t border-forest/10 pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-[10px] font-mono text-sage">
            <span>Primary Sensor System: <strong className="text-forest font-semibold">{currentActive.source}</strong></span>
            <span className="text-right">Ledger Updated Daily under UTC Clock</span>
          </div>

        </div>
      </div>

    </div>
  );
}
export default AtmosphericMonitor;
