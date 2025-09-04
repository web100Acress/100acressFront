import React from 'react';

const PricingSection = ({ 
  units = [
    {
      type: "3 BHK",
      size: "3211 Sq.ft.",
      price: "₹ 5.2 CR* Onwards"
    },
    {
      type: "4 BHK",
      size: "4250 Sq.ft.",
      price: "₹ 6.8 CR* Onwards"
    },
    {
      type: "3 BHK Premium",
      size: "3500 Sq.ft.",
      price: "₹ 5.8 CR* Onwards"
    }
  ],
  imageUrl = "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
}) => {
  return (
    <section className="bg-black py-16 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="mb-8">
          <h2 className="uppercase text-orange-500 font-semibold tracking-wide text-xl">
            OUR PRICING
          </h2>
          <div className="border-t border-orange-500 w-20 mt-2"></div>
        </div>

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left Column - Pricing Content */}
          <div>
            {/* Highlight Banner */}
            <div className="bg-orange-500 text-white py-4 px-6 rounded-t-lg">
              <h3 className="font-bold text-lg md:text-xl text-center">
                3 BHK & 4 BHK Apartments
              </h3>
              <div className="text-sm text-center mt-2 flex items-center justify-center gap-2">
                <span>Starting Pricing</span>
                <div className="flex flex-col">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Price Table */}
            <div className="bg-gray-900 rounded-b-lg p-6">
              {units.map((unit, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center py-4">
                    <div>
                      <div className="text-white font-medium">
                        {unit.type} ({unit.size})
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-orange-500 font-semibold mb-2">
                        {unit.price}
                      </div>
                      <button className="border border-white px-4 py-1 text-sm text-white hover:bg-orange-500 hover:text-black transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                  {index < units.length - 1 && (
                    <div className="border-b border-gray-700 my-4"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative h-full">
            <img 
              src={imageUrl} 
              alt="Project pricing" 
              className="object-cover w-full h-full rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
