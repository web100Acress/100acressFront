import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PropertyCard } from "./PropertyCard";
import { Button } from "../../../Components/ui/button";
import { ArrowRight } from "lucide-react";
import Api_service from "../../../Redux/utils/Api_Service";
import { useDubai } from "../context/DubaiContext";

export const PropertiesSection = () => {
  const { getAllUAEProjects } = Api_service();
  const dubaiProjects = useSelector(store => store?.stateproject?.dubai || []);
  const { selectedEmirate } = useDubai();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!Array.isArray(dubaiProjects) || dubaiProjects.length === 0) {
      setIsLoading(true);
      getAllUAEProjects();
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (dubaiProjects && dubaiProjects.length > 0) {
      setIsLoading(false);
    }
  }, [dubaiProjects]);

  // Show all projects without emirate filtering
  const filteredProjects = dubaiProjects;

  // Map API data to PropertyCard format
  const properties = filteredProjects.map((project) => {
    // Create a URL-friendly slug from project name
    const nameSlug = project.projectName
      ?.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
    
    const slug = project.slugURL || project.pUrl || project.slug || nameSlug || project._id;
    
    // Extract price - try multiple fields and nested objects
    let priceValue = null;
    
    // Try direct price fields
    if (project.minPrice) priceValue = project.minPrice;
    else if (project.price) priceValue = project.price;
    else if (project.startingPrice) priceValue = project.startingPrice;
    else if (project.basePrice) priceValue = project.basePrice;
    
    // Try priceRange object
    else if (project.priceRange?.min) priceValue = project.priceRange.min;
    else if (project.priceRange?.start) priceValue = project.priceRange.start;
    
    // Try BhK_Details array
    else if (project.BhK_Details && project.BhK_Details.length > 0) {
      const bhkPrice = project.BhK_Details[0]?.price || 
                      project.BhK_Details[0]?.minPrice ||
                      project.BhK_Details[0]?.startingPrice;
      if (bhkPrice) priceValue = bhkPrice;
    }
    
    // Convert string to number if needed
    if (priceValue && typeof priceValue === 'string') {
      priceValue = parseFloat(priceValue.replace(/[^0-9.]/g, ''));
    }
    
    console.log('Project Image Data:', {
      name: project.projectName,
      thumbnailImage: project.thumbnailImage,
      frontImage: project.frontImage,
      thumbnail: project.thumbnail,
      allImageFields: {
        thumbnailImage: project.thumbnailImage,
        frontImage: project.frontImage,
        thumbnail: project.thumbnail,
        coverImage: project.coverImage,
        mainImage: project.mainImage,
        images: project.images
      }
    });
    
    console.log('Project Price Data:', {
      name: project.projectName,
      minPrice: project.minPrice,
      price: project.price,
      priceRange: project.priceRange,
      BhK_Details: project.BhK_Details,
      finalPrice: priceValue,
      allFields: Object.keys(project)
    });
    
    // Determine the best image URL using the correct field names
    let imageUrl = project.thumbnailImage?.url || project.thumbnailImage?.cdn_url || project.frontImage?.url || project.frontImage?.cdn_url || project.thumbnail?.url || project.thumbnail?.cdn_url;
    
    // Log the determined image URL for debugging
    console.log('Final image URL for', project.projectName, ':', imageUrl);
    
    // Validate URL format
    if (imageUrl && (imageUrl.startsWith('http') || imageUrl.startsWith('/'))) {
      // URL looks valid
    } else if (imageUrl) {
      console.warn('Invalid image URL format:', imageUrl, 'for project:', project.projectName);
      imageUrl = "/Images/100acresslogo.png";
    } else {
      console.log('No image found for project:', project.projectName, 'using fallback');
      imageUrl = "/Images/100acresslogo.png";
    }
    
    return {
      id: project._id,
      image: imageUrl,
      title: project.projectName || "Luxury Property",
      location: project.city || "Dubai",
      price: priceValue, // Pass as number or null
      beds: project.bedrooms || project.BhK_Details?.[0]?.bedrooms || 3,
      baths: project.bathrooms || project.BhK_Details?.[0]?.bathrooms || 2,
      sqft: project.projectArea || project.size || project.BhK_Details?.[0]?.area || 2000,
      tag: project.projectStatus === "New Launch" ? "New" : project.rera ? "Featured" : undefined,
      projectSlug: slug,
    };
  });

  return (
    <section id="properties" className="py-24 relative overflow-hidden">
      {/* Blurry Video Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-transparent">
        <div className="absolute inset-0 backdrop-blur-sm">
          <div className="h-full w-full bg-gradient-to-br from-gold/5 via-transparent to-gold/5 animate-pulse" />
        </div>
      </div>

      <div className="container relative">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16 space-y-3 sm:space-y-4 px-4">
          <span className="text-gold text-xs sm:text-sm font-medium tracking-[0.2em] sm:tracking-[0.3em] uppercase">
            Featured Listings
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-white leading-tight">
            Premium Properties In
            <span className="block text-gold">{selectedEmirate}</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-xl text-muted-foreground max-w-lg sm:max-w-2xl mx-auto">
            Discover luxury living in {selectedEmirate} with our exclusive collection of premium properties
          </p>
        </div>


        {/* Loading State */}
        {isLoading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
            <p className="text-white mt-4">Loading properties in {selectedEmirate}...</p>
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-white text-xl">No properties found in {selectedEmirate}</p>
            <p className="text-muted-foreground mt-2">Please check back later for more listings</p>
          </div>
        ) : (
          /* Properties Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-12">
            {properties.map((property, index) => (
              <div
                key={property.id || index}
                className="animate-fade-in-scale"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <PropertyCard {...property} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
