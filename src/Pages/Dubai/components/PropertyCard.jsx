import { Button } from "../../../Components/ui/button";
import { MapPin, BedDouble, Bath, Maximize, Heart, RefreshCw } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "../../../lib/utils";

// Currency conversion rates (approximate)
const CURRENCY_RATES = {
  INR_TO_AED: 0.044,  // 1 INR = 0.044 AED
  INR_TO_USD: 0.012,  // 1 INR = 0.012 USD
  AED_TO_INR: 22.5,   // 1 AED = 22.5 INR
  AED_TO_USD: 0.27,   // 1 AED = 0.27 USD
  USD_TO_INR: 83.0,   // 1 USD = 83 INR
  USD_TO_AED: 3.67,   // 1 USD = 3.67 AED
};

export const PropertyCard = ({
  image,
  title,
  location,
  price,
  beds,
  baths,
  sqft,
  tag,
  projectSlug,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [currency, setCurrency] = useState('INR'); // INR, USD, AED
  const navigate = useNavigate();

  const handleCardClick = () => {
    console.log('PropertyCard - Project:', { title, projectSlug, price, priceType: typeof price });
    if (projectSlug) {
      console.log('Navigating to:', `/dubai/project/${projectSlug}/`);
      navigate(`/dubai/project/${projectSlug}/`);
    } else {
      console.log('No project slug provided for:', title);
    }
  };

  const handleLikeClick = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleCurrencyToggle = (e) => {
    e.stopPropagation();
    const currencies = ['INR', 'USD', 'AED'];
    const currentIndex = currencies.indexOf(currency);
    const nextIndex = (currentIndex + 1) % currencies.length;
    setCurrency(currencies[nextIndex]);
  };

  // Convert price to selected currency
  const convertPrice = (priceInINR) => {
    if (!priceInINR || typeof priceInINR !== 'number') return null;
    
    switch(currency) {
      case 'USD':
        return priceInINR * CURRENCY_RATES.INR_TO_USD;
      case 'AED':
        return priceInINR * CURRENCY_RATES.INR_TO_AED;
      case 'INR':
      default:
        return priceInINR;
    }
  };

  // Format price based on currency
  const formatPrice = (priceInINR) => {
    console.log('formatPrice called with:', { priceInINR, type: typeof priceInINR, isZero: priceInINR === 0 });
    
    // Check if price is null, undefined, or not a number (but allow 0)
    if (priceInINR === null || priceInINR === undefined || (typeof priceInINR !== 'number' && isNaN(Number(priceInINR)))) {
      return 'Contact for Price';
    }
    
    // Convert to number if it's a string
    const numericPrice = typeof priceInINR === 'string' ? parseFloat(priceInINR) : priceInINR;
    
    // If price is 0 or negative, show contact message
    if (numericPrice <= 0) {
      console.log('Price is 0 or negative, showing contact message');
      return 'Contact for Price';
    }

    const convertedPrice = convertPrice(numericPrice);
    
    switch(currency) {
      case 'INR':
        // Convert to Crores (1 Cr = 10,000,000)
        const crores = convertedPrice / 10000000;
        return `₹${crores.toFixed(2)} Cr`;
      case 'USD':
        // Convert to Millions
        const millions = convertedPrice / 1000000;
        return `$${millions.toFixed(2)}M`;
      case 'AED':
        // Convert to Millions
        const aedMillions = convertedPrice / 1000000;
        return `AED ${aedMillions.toFixed(2)}M`;
      default:
        return 'Contact for Price';
    }
  };

  const getCurrencySymbol = () => {
    switch(currency) {
      case 'INR': return '₹';
      case 'USD': return '$';
      case 'AED': return 'AED';
      default: return '₹';
    }
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group relative overflow-hidden rounded-xl glass-effect border border-white/10 hover:border-gold/50 transition-all duration-500 hover:shadow-gold cursor-pointer"
    >
        {/* Image */}
        <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Tag */}
        {tag && (
          <span className="absolute top-4 left-4 bg-gold text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            {tag}
          </span>
        )}
        
        {/* Like Button */}
        <button
          onClick={handleLikeClick}
          className="absolute top-4 right-4 p-2 rounded-full glass-effect hover:bg-white/20 transition-colors"
        >
          <Heart
            className={cn(
              "h-5 w-5 transition-colors",
              isLiked ? "fill-gold text-gold" : "text-white"
            )}
          />
        </button>

        {/* Quick Action - Appears on Hover */}
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <Button className="w-full gradient-gold text-black hover:shadow-gold">
            Schedule Viewing
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-display font-semibold text-white mb-2 group-hover:text-gold transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground flex items-center">
            <MapPin className="h-4 w-4 mr-1 text-gold" />
            {location}
          </p>
        </div>

        {/* Features */}
        <div className="flex items-center justify-between text-sm text-muted-foreground border-y border-white/10 py-3">
          <div className="flex items-center">
            <BedDouble className="h-4 w-4 mr-1 text-gold" />
            <span>{beds} Beds</span>
          </div>
          <div className="flex items-center">
            <Bath className="h-4 w-4 mr-1 text-gold" />
            <span>{baths} Baths</span>
          </div>
          <div className="flex items-center">
            <Maximize className="h-4 w-4 mr-1 text-gold" />
            <span>{typeof sqft === 'number' ? sqft.toLocaleString() : sqft} sq ft</span>
          </div>
        </div>

        {/* Price with Currency Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <p className="text-2xl font-bold text-gold">
                {formatPrice(price)}
              </p>
              <button
                onClick={handleCurrencyToggle}
                className="p-1.5 rounded-full glass-effect hover:bg-gold/20 transition-colors group"
                title="Toggle Currency"
              >
                <RefreshCw className="h-3.5 w-3.5 text-gold group-hover:rotate-180 transition-transform duration-300" />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-xs text-muted-foreground">Starting Price</p>
              <span className="text-xs px-2 py-0.5 bg-gold/20 text-gold rounded-full border border-gold/30">
                {currency}
              </span>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="border-gold text-gold hover:bg-gold hover:text-black"
            onClick={(e) => e.stopPropagation()}
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};
