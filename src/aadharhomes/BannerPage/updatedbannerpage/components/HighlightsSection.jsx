import React from 'react';

const HighlightsSection = ({ 
  highlights = [
    "Luxury Living Spaces",
    "Premium Amenities",
    "Prime Location",
    "Eco-Friendly Design",
    "Smart Home Features",
    "24/7 Security"
  ]
}) => {
  return (
    <section className="bg-black py-16 px-6 md:px-20 relative overflow-hidden">
      {/* Background Watermark */}
      <div className="absolute inset-y-0 right-10 w-1/3 opacity-10 pointer-events-none">
        {/* Replace with your actual logo/watermark */}
        <div className="h-full w-full bg-gradient-to-br from-orange-500 to-transparent rounded-full"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Title */}
        <div className="mb-8">
          <h2 className="text-orange-500 uppercase font-semibold tracking-wide text-xl">
            PROJECT HIGHLIGHTS
          </h2>
          <div className="border-t border-orange-500 w-24 mt-2"></div>
        </div>
        
        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {highlights.map((highlight, index) => (
            <div key={index} className="flex items-start gap-3">
              {/* Icon - Using a simple dot as placeholder */}
              <div className="mt-1 w-2 h-2 rounded-full bg-orange-500 flex-shrink-0"></div>
              <p className="text-white/90 text-sm md:text-base uppercase">
                {highlight}
              </p>
            </div>
          ))}
        </div>
        
        {/* View Details Button */}
        <button className="mt-10 inline-block border border-orange-500 text-orange-500 px-6 py-2 uppercase tracking-wide hover:bg-orange-500 hover:text-black transition">
          VIEW DETAILS
        </button>
      </div>
    </section>
  );
};

export default HighlightsSection;
