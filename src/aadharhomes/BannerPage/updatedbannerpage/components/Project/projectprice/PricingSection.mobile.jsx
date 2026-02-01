import React from 'react';

const PricingSectionMobile = ({ projectName, minPrice, maxPrice, bhkDetails = [], paymentPlan = [], onShowCallback = () => {}, projectViewDetails = null }) => {
  const hasBhkDetails = bhkDetails && Array.isArray(bhkDetails) && bhkDetails.length > 0;
  // Handle both string and array paymentPlan formats
  const normalizedPaymentPlan = typeof paymentPlan === 'string' ? [paymentPlan] : (Array.isArray(paymentPlan) ? paymentPlan : []);
  const hasPaymentPlan = normalizedPaymentPlan.length > 0;
  
  // Phone number logic: backend number determines footer display
  const getFooterPhoneNumbers = () => {
    const backendNumber = Number(projectViewDetails?.mobileNumber);
    
    if (backendNumber === 9811750130) {
      return { dialNumber: '8527134491', displayNumber: '+91 8527-134-491' };
    } else if (backendNumber === 9355990063) {
      return { dialNumber: '9315375335', displayNumber: '+91 9315-375-335' };
    } else if (backendNumber === 9811750740) {
      return { dialNumber: '9811750130', displayNumber: '+91 9811-750-130' };
    } else {
      // Fallback to default
      return { dialNumber: '8527134491', displayNumber: '+91 8527-134-491' };
    }
  };
  
  const { dialNumber, displayNumber } = getFooterPhoneNumbers();
  
  const formatPrice = (price) => {
    if (!price) return null;
    return price < 1 ? `${(price * 100).toFixed()} L` : `${price} Cr`;
  };

  const formatBhkPrice = (price) => {
    if (!price) return "Price on Request";
    if (typeof price === 'string') return price;
    return price < 1 ? `₹ ${(price * 100).toFixed()} L` : `₹ ${price} Cr`;
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
    <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
      {/* Mobile-Optimized Card Container */}
      <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800 shadow-[0_15px_40px_rgba(0,0,0,0.4)] border border-amber-900/30">
        
        {/* Mobile accent line */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700"></div>
        
        <div className="relative p-4 sm:p-6">
          
          {/* Mobile Section Header */}
          <div className="text-center mb-4">
            <h2 className="text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
              UNIT SPECIFICATIONS
            </h2>
            <h3 className="text-white text-2xl md:text-3xl font-bold leading-tight mb-3 max-w-3xl mx-auto">
              {projectName ? `${projectName} - Unit Details` : "Available Units"}
            </h3>
            <div className="w-16 h-0.5 bg-gradient-to-r from-amber-600 to-amber-500 rounded-full mx-auto mt-2"></div>
          </div>

          {hasBhkDetails ? (
            <>
              {/* Mobile: Card Layout */}
              <div className="space-y-3 max-w-sm mx-auto">
                {bhkDetails.map((item, index) => (
                  <div key={index} className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-600 to-amber-400 rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
                    <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-lg border border-gray-700/50 p-3 space-y-2">
                      
                      {/* Mobile Unit Type - Full width header */}
                      <div className="text-center pb-2 border-b border-gray-700/50">
                        <div className="text-xs text-amber-400 uppercase tracking-wider font-medium mb-1">Unit Type</div>
                        <div className="text-lg font-bold text-white">{item.bhk_type || `Unit ${index + 1}`}</div>
                      </div>
                      
                      {/* Mobile Area, Price, and Payment Plan - Responsive grid */}
                      <div className={`grid gap-3 ${hasPaymentPlan ? 'grid-cols-1' : 'grid-cols-2'}`}>
                        <div className="text-center">
                          <div className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-1">Area</div>
                          <div className="text-sm font-semibold text-amber-400">{item.bhk_Area || 'N/A'}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-1">Price</div>
                          <div className="text-sm font-semibold text-amber-400">
                            {formatBhkPrice(item.bhk_price || item.price)}
                          </div>
                        </div>
                        {hasPaymentPlan && (
                          <div className="text-center col-span-1">
                            <div className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-1">Payment Plan</div>
                            <div className="text-xs text-amber-400">
                              {normalizedPaymentPlan[index] || normalizedPaymentPlan[0] || 'Contact for Details'}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            /* Mobile Fallback Content */
            <div className="text-center py-8">
              <div className="mb-6">
                <h3 className="text-white text-2xl md:text-3xl font-bold mb-3 max-w-3xl mx-auto">
                  {projectName || "Premium Project"}
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  Luxury living spaces designed for modern comfort
                </p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="text-amber-400 text-sm uppercase tracking-wider font-medium mb-2">Starting From</div>
                  <div className="text-white text-2xl font-bold">
                    {getPriceDisplay()}
                  </div>
                </div>
                
                {getSizeRange() && (
                  <div>
                    <div className="text-amber-400 text-sm uppercase tracking-wider font-medium mb-2">Size Range</div>
                    <div className="text-white text-lg">
                      {getSizeRange()}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Mobile CTA Section */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm mb-4">
              Contact us for detailed pricing and exclusive offers
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <button 
                onClick={onShowCallback}
                className="w-full sm:w-auto bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-lg shadow-amber-600/20 flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                Get in Touch
              </button>
              
              <a 
                href={`tel:+91${dialNumber}`}
                className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 text-amber-400 font-semibold px-6 py-3 rounded-lg transition-all duration-300 border border-amber-600/30 flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.36 11.36 0 003.55.57 1 1 0 011 1v3.61a1 1 0 01-.91 1A16 16 0 014 5.92 1 1 0 015 5h3.61a1 1 0 011 1 11.36 11.36 0 00.57 3.55 1 1 0 01-.24 1.01l-2.32 2.23z"/>
                </svg>
                <span className="text-sm">{displayNumber}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSectionMobile;
