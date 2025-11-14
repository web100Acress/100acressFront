import { Button } from "../../../Components/ui/button";
import { MapPin, BedDouble, Bath, Maximize, Heart } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "../../../lib/utils";
import { useDubai } from "../context/DubaiContext";
import { convertPrice } from "../utils/currencyConverter";

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
  const { currency } = useDubai();
  const navigate = useNavigate();

  const handleCardClick = () => {
    console.log('PropertyCard - Project:', { title, projectSlug, price, priceType: typeof price });
    if (projectSlug) {
      console.log('Navigating to:', `/${projectSlug}/`);
      navigate(`/${projectSlug}/`);
    } else {
      console.log('No project slug provided for:', title);
    }
  };

  const handleLikeClick = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  // Format price based on currency
  const formatPrice = (priceInCr) => {
    console.log('formatPrice called with:', { priceInCr, type: typeof priceInCr, isZero: priceInCr === 0 });
    
    // Check if price is null, undefined, or not a number (but allow 0)
    if (priceInCr === null || priceInCr === undefined || (typeof priceInCr !== 'number' && isNaN(Number(priceInCr)))) {
      return 'Contact for Price';
    }
    
    // Convert to number if it's a string
    const numericPrice = typeof priceInCr === 'string' ? parseFloat(priceInCr) : priceInCr;
    
    // If price is 0 or negative, show contact message
    if (numericPrice <= 0) {
      console.log('Price is 0 or negative, showing contact message');
      return 'Contact for Price';
    }

    const converted = convertPrice(numericPrice, currency);
    return `${converted.symbol} ${converted.formatted} ${converted.suffix}`;
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

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex-1">
            
            <div className="flex items-center gap-2">
              <p className="text-xs text-muted-foreground">Starting Price</p>
              
            </div>
            <p className="text-2xl font-bold text-gold mb-1">
              {formatPrice(price)}
            </p>
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
