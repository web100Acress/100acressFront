import { useState, useEffect, useRef } from "react";
import { Button } from "../../../Components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useDubai } from "../context/DubaiContext";
import heroVideo from "../../../Images/Drone_Shot_for_Real_Estate_Homepage.mp4";

export const Hero = () => {
  const { t } = useTranslation();
  const { emirateConfig, selectedEmirate } = useDubai();
  const [scrollY, setScrollY] = useState(0);
  const videoRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      // Cancel any pending animation frame
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      // Use requestAnimationFrame for smooth 60fps animation
      rafRef.current = requestAnimationFrame(() => {
        const scrollPosition = window.scrollY;
        setScrollY(scrollPosition);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  // Calculate opacity based on scroll position
  const heroOpacity = Math.max(0, 1 - scrollY / window.innerHeight);

  return (
    <section 
      className="fixed inset-0 overflow-hidden z-0 p-0 m-0"
      style={{ opacity: heroOpacity, width: '100dvw', height: '100dvh' }}
    >
      {/* Hero Video Background - Fixed */}
      <div className="absolute inset-0 m-0 p-0" style={{ width: '100dvw', height: '100dvh' }}>
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover w-auto h-full will-change-transform"
          style={{ height: '100dvh', minWidth: '125dvw' }}
        >
          <source src={heroVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="container relative z-10 flex items-center" style={{ height: '100dvh' }}>
        <div className="max-w-3xl space-y-8 animate-fade-in">
          <div className="inline-block">
          </div>
          
          <div className="inline-block mb-4">
            <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase border border-gold/30 px-4 py-2 rounded-full backdrop-blur-sm bg-black/20">
              {emirateConfig.tagline}
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
            {emirateConfig.headline.split(' ').slice(0, -2).join(' ')}
            <span className="block text-gold glow-gold mt-2">
              {emirateConfig.headline.split(' ').slice(-2).join(' ')}
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl leading-relaxed">
            {emirateConfig.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button size="lg" className="gradient-gold text-black hover:shadow-gold transition-all duration-300 text-lg px-8 py-6 group">
              {t('hero.exploreProperties')}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300 text-lg px-8 py-6 backdrop-blur-sm bg-white/10">
              <Play className="mr-2 h-5 w-5" />
              {t('hero.watchTour')}
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-8">
            <div className="space-y-1">
              <p className="text-3xl md:text-4xl font-bold text-gold">500+</p>
              <p className="text-sm text-gray-400 uppercase tracking-wider">{t('hero.premiumListings')}</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl md:text-4xl font-bold text-gold">50+</p>
              <p className="text-sm text-gray-400 uppercase tracking-wider">{t('hero.topDevelopers')}</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl md:text-4xl font-bold text-gold">98%</p>
              <p className="text-sm text-gray-400 uppercase tracking-wider">{t('hero.clientSatisfaction')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 border-2 border-gold rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-gold rounded-full animate-glow" />
        </div>
      </div>
    </section>
  );
};
      