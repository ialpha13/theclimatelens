import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'custom';
  customSizeClass?: string;
}

export function LogoIcon({ className = '', size = 'md', customSizeClass = '' }: LogoProps) {
  // Map size presets to Tailwind width/height classes
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-11 w-11',
    lg: 'h-16 w-16',
    xl: 'h-24 w-24',
    custom: customSizeClass,
  }[size];

  return (
    <div className={`relative flex-shrink-0 ${sizeClasses} ${className}`}>
      <img 
        src="/assets/images/theclimatelenslogo2.png"
        alt="The Climate Lens Logo"
        className="h-full w-full object-contain"
      />
    </div>
  );
}

interface LogoFullProps extends LogoProps {
  onLightBg?: boolean;
}

export function LogoFull({ className = '', size = 'md', onLightBg = true, customSizeClass = '' }: LogoFullProps) {
  return (
    <div className={`flex items-center gap-3.5 ${className}`}>
      <LogoIcon size={size} customSizeClass={customSizeClass} />
      
      <div className="flex flex-col select-none">
        {/* THE */}
        <span className={`font-serif tracking-[0.45em] text-[10px] uppercase font-bold leading-none mb-0.5 ${
          onLightBg ? 'text-forest/70' : 'text-earth-beige/70'
        }`}>
          The
        </span>
        
        {/* Climate */}
        <span 
          className="font-serif italic text-3xl font-extrabold tracking-tight leading-none -ml-[1px] relative"
          style={{
            color: '#FAF9F4',
            WebkitTextStroke: '1.2px #2A4424',
            textShadow: '0.5px 0.5px 0px #2A4424',
          }}
        >
          Climate
        </span>

        {/* Lens */}
        <span 
          className="font-serif italic text-3xl font-extrabold tracking-widest leading-none mt-1 -ml-[1.5px]"
          style={{
            color: '#FAF9F4',
            WebkitTextStroke: '1.2px #2A4424',
            textShadow: '0.5px 0.5px 0px #2A4424',
          }}
        >
          Lens
        </span>
      </div>
    </div>
  );
}
