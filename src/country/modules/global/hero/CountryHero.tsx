import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface CountryHeroProps {
  country?: {
    code: string;
    name: string;
    flag: string;
    domain: string;
    heroVideo?: string;
    heroImage?: string;
    title?: string;
    description?: string;
  };
}

const CountryHero: React.FC<CountryHeroProps> = ({ country }) => {
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Dynamic country data with fallback
  const countryData = country || {
    code: 'global',
    name: 'International Real Estate',
    flag: '🌍',
    domain: '100acress.com',
    heroVideo: '/videos/global-hero.mp4',
    heroImage: '/images/global-hero.jpg',
    title: 'Discover Premium Properties Worldwide',
    description: 'Explore luxury real estate opportunities across 50+ countries with expert guidance'
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVideoLoad = () => {
    setIsLoaded(true);
  };

  const handleCountryClick = () => {
    if (country && country.code !== 'global') {
      // Navigate to country page - the country mode will be set by the country page itself
      router.push(`/country/${country.code}`);
    }
  };

  useEffect(() => {
    // Auto-play video when component mounts
    if (videoRef.current && countryData.heroVideo) {
      videoRef.current.play().catch(() => {
        // Auto-play was prevented, user will need to click play button
      });
    }
  }, []);

  // Dynamic video sources based on country
  const videoSources = {
    'ae': '/videos/uae-hero.mp4',
    'uk': '/videos/uk-hero.mp4',
    'us': '/videos/usa-hero.mp4',
    'sg': '/videos/singapore-hero.mp4',
    'de': '/videos/germany-hero.mp4',
    'fr': '/videos/france-hero.mp4',
    'th': '/videos/thailand-hero.mp4',
    'my': '/videos/malaysia-hero.mp4',
    'global': '/videos/global-hero.mp4'
  };

  const currentVideo = videoSources[countryData.code as keyof typeof videoSources] || videoSources.global;

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        {currentVideo ? (
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            onLoadedData={handleVideoLoad}
            poster={countryData.heroImage}
          >
            <source src={currentVideo} type="video/mp4" />
            <source src={currentVideo.replace('.mp4', '.webm')} type="video/webm" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${countryData.heroImage})` }}
          />
        )}
        
        {/* Overlay for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/80" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center text-white px-4 max-w-4xl mx-auto">
          {/* Country Badge */}
          <div className="mb-6">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20">
              <span className="text-4xl mr-3">{countryData.flag}</span>
              <div className="text-left">
                <h1 className="text-2xl md:text-3xl font-bold mb-1">{countryData.name}</h1>
                <p className="text-sm text-white/80">{countryData.domain}</p>
              </div>
            </div>
          </div>

          {/* Main Title */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            {countryData.title}
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            {countryData.description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={handleCountryClick}
              className="group relative px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              <span className="flex items-center">
                Explore Properties
                <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5 5-5" />
                </svg>
              </span>
            </button>

            {country && country.code !== 'global' && (
              <button
                className="px-8 py-4 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white font-semibold rounded-lg transition-all duration-300 border border-white/20"
              >
                View Country Details
              </button>
            )}
          </div>

          {/* Video Controls */}
          {currentVideo && (
            <div className="mt-8 flex items-center justify-center space-x-4">
              <button
                onClick={handlePlayPause}
                className="p-3 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full transition-all duration-300 border border-white/20"
                aria-label={isPlaying ? 'Pause video' : 'Play video'}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 text-white" />
                ) : (
                  <Play className="w-5 h-5 text-white" />
                )}
              </button>

              <button
                onClick={handleMuteToggle}
                className="p-3 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full transition-all duration-300 border border-white/20"
                aria-label={isMuted ? 'Unmute video' : 'Mute video'}
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5 text-white" />
                ) : (
                  <Volume2 className="w-5 h-5 text-white" />
                )}
              </button>
            </div>
          )}

          {/* Stats */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-amber-400 mb-2">50+</div>
              <div className="text-sm text-white/70">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-amber-400 mb-2">10K+</div>
              <div className="text-sm text-white/70">Properties</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-amber-400 mb-2">24/7</div>
              <div className="text-sm text-white/70">Support</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-amber-400 mb-2">98%</div>
              <div className="text-sm text-white/70">Satisfaction</div>
            </div>
          </div>

          {/* Loading Indicator */}
          {!isLoaded && currentVideo && (
            <div className="mt-6 text-sm text-white/60">
              Loading video...
            </div>
          )}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="animate-bounce">
          <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m14 0v3a2 2 0 002 2H5a2 2 0 002-2v-3m7 13l-3-3m0 0l-3 3" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CountryHero;
