import React, { useState, useRef } from 'react';
import { Video } from '../types';
import { Play, Pause, Volume2, VolumeX, RotateCcw, MonitorPlay, Eye, Calendar, Sparkles } from 'lucide-react';

interface VideoCardProps {
  key?: any;
  video: Video;
}

export default function VideoCard({ video }: VideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [hasVideoError, setHasVideoError] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayToggle = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
      return;
    }

    if (hasVideoError) return;

    // Pause all other possible video tags on the screen to avoid sound overlapping
    document.querySelectorAll('video').forEach((vid) => {
      if (vid !== videoRef.current) {
        vid.pause();
      }
    });

    const playPromise = videoRef.current.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.log("Autoplay / click play was blocked or interrupted:", err);
        });
    }
  };

  const handleMuteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleRestart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setIsPlaying(true);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const duration = videoRef.current.duration || 1;
    setProgress((current / duration) * 100);
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    setProgress(100);
  };

  const handleVideoError = () => {
    console.warn('Video failed to load:', video.videoUrl);
    setHasVideoError(true);
    setIsPlaying(false);
  };

  return (
    <div 
      className="relative flex flex-col bg-[#12281e] text-earth-beige rounded-xl overflow-hidden border border-sage/20 self-center aspect-[9/16] w-full max-w-[290px] shadow-lg hover:shadow-2xl hover:border-gold/40 transition-all duration-300 group select-none cursor-pointer"
      onClick={handlePlayToggle}
      id={`video-card-${video.id}`}
    >
      
      {/* HTML5 Video Layer */}
      {!hasVideoError && (
        <video
          ref={videoRef}
          src={video.videoUrl}
          poster={video.thumbnail}
          loop
          muted={isMuted}
          playsInline
          webkit-playsinline="true"
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleVideoEnded}
          onError={handleVideoError}
          referrerPolicy="no-referrer"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 z-10 ${
            isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        />
      )}

      {/* Static Poster Thumbnail Layer */}
      <div 
        className={`absolute inset-0 w-full h-full transition-opacity duration-500 z-0 ${
          isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-forest via-transparent to-forest/40 z-10" />
        <img 
          src={video.thumbnail} 
          alt={video.title}
          referrerPolicy="no-referrer"
          onError={(e) => {
            const target = e.currentTarget;
            if (target.src !== '/assets/images/homehero.png') {
              target.src = '/assets/images/homehero.png';
            }
          }}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
      </div>
      {hasVideoError && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/75 text-center p-4">
          <div className="rounded-2xl bg-[#1b3a2c] border border-gold/40 p-4 text-earth-beige max-w-xs">
            <p className="font-bold text-sm mb-2">Video unavailable</p>
            <p className="text-[11px] text-sage-light">This reel could not be loaded. Please try again later.</p>
          </div>
        </div>
      )}

      {/* Premium UI Bars & Interactive Overlay Items */}
      <div className="absolute inset-0 p-4 flex flex-col justify-between z-20 pointer-events-none bg-gradient-to-t from-forest/90 via-transparent to-forest/30">
        
        {/* Top Header details page */}
        <div className="flex items-center justify-between pointer-events-auto">
          <span className="bg-[#401212] text-red-100 border border-red-950 px-2 py-0.5 rounded font-mono text-[8px] uppercase font-bold tracking-widest flex items-center gap-1">
            <Sparkles className="h-3 w-3 text-gold" />
            <span>{video.category}</span>
          </span>
          <div className="flex items-center gap-2">
            {isPlaying && (
              <button 
                onClick={handleMuteToggle}
                className="p-1.5 rounded-full bg-forest/80 text-earth-beige hover:bg-gold/80 hover:text-forest transition-colors flex items-center justify-center cursor-pointer border-0"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
              </button>
            )}
            
            {isPlaying && (
              <button 
                onClick={handleRestart}
                className="p-1.5 rounded-full bg-forest/80 text-earth-beige hover:bg-gold/80 hover:text-forest transition-colors flex items-center justify-center cursor-pointer border-0"
                aria-label="Restart video"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Center Giant Action Icon overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className={`p-4 rounded-full bg-forest/80 border border-gold/40 text-gold transform transition-all duration-300 ${
            isPlaying ? 'opacity-0 scale-75' : 'opacity-100 scale-100 group-hover:scale-110 group-hover:bg-gold group-hover:text-forest'
          }`}>
            <Play className="h-6 w-6 ml-0.5 fill-current" />
          </div>
        </div>

        {/* Bottom Details block */}
        <div className="space-y-2 pointer-events-auto">
          <h4 className="font-serif text-sm font-bold tracking-tight text-white leading-tight drop-shadow-md group-hover:text-gold transition-colors block">
            {video.title}
          </h4>
          <p className="font-sans text-[11px] text-[#cac4b7] line-clamp-2 leading-relaxed drop-shadow-sm">
            {video.description}
          </p>

          <div className="flex items-center gap-2 text-[9px] font-mono text-sage-light-important text-[#8fa89b]">
            <Calendar className="h-3 w-3" />
            <span>{video.publishedDate}</span>
            <span>•</span>
            <span className="animate-pulse text-emerald-400 font-bold">● CL-FEED</span>
          </div>

          {/* Video bottom scrubber progress bar */}
          <div className="w-full h-1 bg-[#1a3d2c] rounded-full overflow-hidden mt-2">
            <div 
              className="h-full bg-gold transition-all duration-100 ease-linear rounded-full" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
