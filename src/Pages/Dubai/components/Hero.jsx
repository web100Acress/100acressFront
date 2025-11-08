import { Button } from "../../../Components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { useTranslation } from "react-i18next";
import heroImage from "../assets/dubai-hero.jpg";
import { useDubai } from "../context/DubaiContext";

export const Hero = () => {
  const { t } = useTranslation();
  const { emirateConfig, selectedEmirate } = useDubai();
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Hero Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={emirateConfig.heroImage}
          alt={`${selectedEmirate} Skyline`}
          className="h-full w-full object-cover transition-opacity duration-700"
          onError={(e) => {
            e.target.src = heroImage; // Fallback to local image
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      {/* Geometric Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Content */}
      <div className="container relative z-10 flex h-full items-center">
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
