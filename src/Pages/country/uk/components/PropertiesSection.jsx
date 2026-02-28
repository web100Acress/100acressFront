import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { PropertyCard } from "../../components/PropertyCard";
import Api_service from "../../../../Redux/utils/Api_Service";

export const PropertiesSection = ({ 
  title = "Featured UK Properties",
  subtitle = "Handpicked selection of premium residential and commercial properties"
}) => {
  const { getAllUAEProjects } = Api_service();
  const ukProjects = useSelector(store => store?.stateproject?.uk || []);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!Array.isArray(ukProjects) || ukProjects.length === 0) {
      setIsLoading(true);
      // TODO: Replace with UK-specific API call when available
      // getAllUKProjects();
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (ukProjects && ukProjects.length > 0) {
      setIsLoading(false);
    }
  }, [ukProjects]);

  const filteredProjects = ukProjects;

  const properties = filteredProjects.map((project) => {
    const nameSlug = project.projectName
      ?.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');

    const slug = project.project_url || project.slugURL || project.pUrl || project.slug || nameSlug || project._id;

    let priceValue = null;
    if (project.minPrice) priceValue = project.minPrice;
    else if (project.price) priceValue = project.price;
    else if (project.startingPrice) priceValue = project.startingPrice;

    if (priceValue && typeof priceValue === 'string') {
      priceValue = parseFloat(priceValue.replace(/[^0-9.]/g, ''));
    }

    let imageUrl = project.thumbnailImage?.url || project.frontImage?.url || "/Images/100acresslogo.png";

    return {
      id: project._id,
      image: imageUrl,
      title: project.projectName || "Luxury Property",
      location: project.city || "London",
      price: priceValue,
      beds: project.bedrooms || 2,
      baths: project.bathrooms || 2,
      sqft: project.projectArea || 1000,
      tag: project.projectStatus === "New Launch" ? "New" : "Featured",
      projectSlug: slug,
    };
  });

  return (
    <section id="properties" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-transparent">
        <div className="absolute inset-0 backdrop-blur-sm">
          <div className="h-full w-full bg-gradient-to-br from-gold/5 via-transparent to-gold/5 animate-pulse" />
        </div>
      </div>

      <div className="container relative">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16 space-y-3 sm:space-y-4 px-4">
          <span className="text-gold text-xs sm:text-sm font-medium tracking-[0.2em] sm:tracking-[0.3em] uppercase">
            Featured Listings
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-white leading-tight">
            Best Real Estate Projects in
            <span className="block text-gold">UNITED KINGDOM</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-xl text-muted-foreground max-w-lg sm:max-w-2xl mx-auto">
            The finest projects in UK offer a perfect blend of prime locations and an extraordinary lifestyle. These premium projects in UK are curated for high rental yields and long-term investment growth.
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
            <p className="text-white mt-4">Loading properties in UK...</p>
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-white text-xl">No properties found in UK</p>
            <p className="text-muted-foreground mt-2">Please check back later for more listings</p>
          </div>
        ) : (
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
