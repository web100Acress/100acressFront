import React from 'react';

const PricingSection = ({ projectName, minPrice, maxPrice, bhkDetails = [], onShowCallback = () => {} }) => {
  const hasBhkDetails = bhkDetails && Array.isArray(bhkDetails) && bhkDetails.length > 0;
  
  const formatPrice = (price) => {
    if (!price) return null;
    return price < 1 ? `${(price * 100).toFixed()} L` : `${price} Cr`;
  };

  const getPriceDisplay = () => {
    if (!minPrice && !maxPrice) return "Call For Price";
    if (minPrice && maxPrice) {
      return `₹ ${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`;
    }
    return minPrice ? `₹ ${formatPrice(minPrice)} Onwards` : "Call For Price";
  };

  // Get size range from bhkDetails
  const getSizeRange = () => {
    if (!hasBhkDetails) return "";
    const areas = bhkDetails.map(item => item.bhk_Area);
    return `${areas[0]} - ${areas[areas.length - 1]} sq.ft.`;
  };

  return (
    <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Luxury Dark Card Container */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800 shadow-[0_20px_60px_rgba(0,0,0,0.4)] border border-amber-900/30">
        
        {/* Dark Golden Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700"></div>
        
        <div className="relative p-8 lg:p-12">
          
          {/* Section Header */}
          <div className="text-center mb-8">
            <h2 className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-3">
              UNIT SPECIFICATIONS
            </h2>
            <h3 className="text-white text-2xl md:text-3xl font-bold leading-tight mb-2">
              {projectName ? `${projectName} - Unit Details` : "Available Units"}
            </h3>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-600 to-amber-500 rounded-full mx-auto mt-4"></div>
          </div>

          {hasBhkDetails ? (
            /* Table Layout for BHK Details */
            <div className="overflow-x-auto rounded-lg border border-gray-700">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gradient-to-r from-amber-900/30 to-amber-800/20">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-amber-400 uppercase tracking-wider">
                      Unit Type
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-amber-400 uppercase tracking-wider">
                      Area (Sq.ft.)
                    </th>
                    <th scope="col" className="px-6 py-4 text-right text-xs font-medium text-amber-400 uppercase tracking-wider">
                      View
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {bhkDetails.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-800/50 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-base font-medium text-white">{item.bhk_type || `Unit ${index + 1}`}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-base text-amber-400">{item.bhk_Area || 'N/A'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <button 
                          onClick={onShowCallback}
                          className="text-amber-500 hover:text-amber-400 transition-colors duration-200"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            /* Fallback Content */
            <div className="text-center mb-8">
              <p className="text-gray-400 text-base leading-relaxed mb-6 max-w-2xl mx-auto">
                Discover flexible pricing options tailored to your investment needs. 
                Our team will provide detailed pricing information and payment plans.
              </p>
            </div>
          )}

          {/* Contact for Details */}
          <div className="mt-8 text-center">
            <p className="text-gray-400 mb-4">
              For detailed pricing and availability, please contact our sales team
            </p>
            <a 
              href="tel:+919876543210" 
              className="inline-flex items-center gap-2 text-amber-400 hover:text-white transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>+91 98765 43210</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PricingSection;
