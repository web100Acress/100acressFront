import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PropertyCard } from "./PropertyCard";
import { Button } from "../../../Components/ui/button";
import { ArrowRight } from "lucide-react";
import Api_service from "../../../Redux/utils/Api_Service";
import { useDubai } from "../context/DubaiContext";

export const PropertiesSection = () => {
  const { t } = useTranslation();
  const { getProjectbyState } = Api_service();
  const dubaiProjects = useSelector(store => store?.stateproject?.dubai || []);
  const { selectedEmirate } = useDubai();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!Array.isArray(dubaiProjects) || dubaiProjects.length === 0) {
      setIsLoading(true);
      getProjectbyState("Dubai", 0);
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (dubaiProjects && dubaiProjects.length > 0) {
      setIsLoading(false);
    }
  }, [dubaiProjects]);

  // Filter projects by emirate
  const filteredProjects = dubaiProjects.filter((project) => {
    // Filter by emirate (check city or location field)
    const projectLocation = (project.city || project.location || "").toLowerCase();
    const emirateMatch = selectedEmirate === "Dubai" || 
                        projectLocation.includes(selectedEmirate.toLowerCase());
    
    return emirateMatch;
  });

  // Map API data to PropertyCard format
  const properties = filteredProjects.slice(0, 6).map((project) => {
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
    
    console.log('Project Price Data:', {
      name: project.projectName,
      minPrice: project.minPrice,
      price: project.price,
      priceRange: project.priceRange,
      BhK_Details: project.BhK_Details,
      finalPrice: priceValue,
      allFields: Object.keys(project)
    });
    
    return {
      id: project._id,
      image: project.frontImage?.url || project.images?.[0]?.url || "/Images/logo.png",
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
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z' fill='%23d4af37' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container relative">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase">
            {t('properties.featuredListings')}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white">
            {t('properties.premiumPropertiesIn')}
            <span className="block text-gold">{selectedEmirate}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('properties.discoverLuxury', { emirate: selectedEmirate })}
          </p>
        </div>


        {/* Loading State */}
        {isLoading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
            <p className="text-white mt-4">{t('properties.loading', { emirate: selectedEmirate })}</p>
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-white text-xl">{t('properties.noProperties', { emirate: selectedEmirate })}</p>
            <p className="text-muted-foreground mt-2">{t('properties.checkBackLater')}</p>
          </div>
        ) : (
          /* Properties Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
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

        {/* View All Button */}
        {!isLoading && properties.length > 0 && (
          <div className="text-center">
            <Link to="/projects-in-dubai">
              <Button size="lg" className="gradient-gold text-black hover:shadow-gold group">
                {t('properties.viewAllProperties', { emirate: selectedEmirate })}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};
