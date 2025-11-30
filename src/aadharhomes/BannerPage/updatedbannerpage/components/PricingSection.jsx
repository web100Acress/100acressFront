import React from 'react';

const PricingSection = ({ projectName, minPrice, maxPrice, bhkDetails = [], paymentPlan = [], onShowCallback = () => {}, projectViewDetails = null }) => {
  console.log('PricingSection Props:', { projectName, bhkDetails, paymentPlan, projectViewDetails });
  const hasBhkDetails = bhkDetails && Array.isArray(bhkDetails) && bhkDetails.length > 0;
  // Handle both string and array paymentPlan formats
  const normalizedPaymentPlan = typeof paymentPlan === 'string' ? [paymentPlan] : (Array.isArray(paymentPlan) ? paymentPlan : []);
  const hasPaymentPlan = normalizedPaymentPlan.length > 0;
  console.log('hasBhkDetails:', hasBhkDetails, 'hasPaymentPlan:', hasPaymentPlan);
  // Phone number logic: backend number determines footer display
  const getFooterPhoneNumbers = () => {
    const backendNumber = projectViewDetails?.mobileNumber;
    
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
    <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Luxury Dark Card Container */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800 shadow-[0_20px_60px_rgba(0,0,0,0.4)] border border-amber-900/30">
        
        {/* Dark Golden Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700"></div>
        
        <div className="relative p-8 lg:p-12">
          
          {/* Section Header */}
          <div className="text-center mb-4">
            <h2 className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-3">
              UNIT SPECIFICATIONS
            </h2>
            <h3 className="text-white text-2xl md:text-3xl font-bold leading-tight mb-2">
              {projectName ? `${projectName} - Unit Details` : "Available Units"}
            </h3>
            <div className="w-20 h-1 bg-gradient-to-r from-amber-600 to-amber-500 rounded-full mx-auto mt-2"></div>
          </div>

          {hasBhkDetails ? (
            <>
              {/* Desktop/Tablet: Table Layout (md and up) */}
              <div className="hidden md:block">
                <div className="rounded-lg border border-gray-700 max-w-4xl mx-auto">
                  <table className="w-full divide-y divide-gray-700">
                    <thead className="bg-gradient-to-r from-amber-900/30 to-amber-800/20">
                      <tr>
                        <th scope="col" className="px-6 py-4 text-center text-xs font-medium text-amber-400 uppercase tracking-wider">
                          Unit Type
                        </th>
                        <th scope="col" className="px-6 py-4 text-center text-xs font-medium text-amber-400 uppercase tracking-wider">
                          Area (Sq.ft.)
                        </th>
                        <th scope="col" className="px-6 py-4 text-center text-xs font-medium text-amber-400 uppercase tracking-wider">
                          Price
                        </th>
                        {hasPaymentPlan && (
                          <th scope="col" className="px-6 py-4 text-center text-xs font-medium text-amber-400 uppercase tracking-wider">
                            Payment Plan
                          </th>
                        )}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {bhkDetails.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-800/50 transition-colors duration-200">
                          <td className="px-6 py-4 text-center">
                            <div className="text-base font-medium text-white">{item.bhk_type || `Unit ${index + 1}`}</div>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <div className="text-base text-amber-400">{item.bhk_Area || 'N/A'}</div>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <div className="text-base font-semibold text-amber-400">
                              {formatBhkPrice(item.bhk_price || item.price)}
                            </div>
                          </td>
                          {hasPaymentPlan && (
                            <td className="px-6 py-4 text-center">
                              <div className="text-base text-amber-400">
                                {normalizedPaymentPlan[index] || normalizedPaymentPlan[0] || 'Contact for Details'}
                              </div>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile: Card Layout (improved design) */}
              <div className="md:hidden space-y-3 max-w-sm mx-auto">
                {bhkDetails.map((item, index) => (
                  <div key={index} className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-600 to-amber-400 rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
                    <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl border border-gray-700/50 p-4 space-y-3">
                      
                      {/* Unit Type - Full width header */}
                      <div className="text-center pb-2 border-b border-gray-700/50">
                        <div className="text-xs text-amber-400 uppercase tracking-wider font-medium mb-1">Unit Type</div>
                        <div className="text-xl font-bold text-white">{item.bhk_type || `Unit ${index + 1}`}</div>
                      </div>
                      
                      {/* Area, Price, and Payment Plan - Responsive grid */}
                      <div className={`grid gap-4 ${hasPaymentPlan ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-2'}`}>
                        <div className="text-center">
                          <div className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-1">Area</div>
                          <div className="text-base font-semibold text-amber-400">{item.bhk_Area || 'N/A'}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-1">Price</div>
                          <div className="text-base font-semibold text-amber-400 break-words">
                            {formatBhkPrice(item.bhk_price || item.price)}
                          </div>
                        </div>
                        {hasPaymentPlan && (
                          <div className="text-center">
                            <div className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-1">Payment Plan</div>
                            <div className="text-base font-semibold text-amber-400 break-words">
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
            /* Fallback Content */
            <div className="text-center mb-8">
              <p className="text-gray-400 text-base leading-relaxed mb-6 max-w-2xl mx-auto">
                Discover flexible pricing options tailored to your investment needs. 
                Our team will provide detailed pricing information and payment plans.
              </p>
            </div>
          )}

          {/* Contact for Details */}
          <div className="mt-10 text-center">
              {/* <p className="text-gray-300 mb-3 text-sm md:text-base">
                For detailed pricing and availability, please contact our team.
              </p> */}
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <a 
                href={`tel:+91${dialNumber}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-amber-500/40 text-amber-400 hover:text-black hover:bg-amber-500 transition-colors duration-200 font-medium"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="font-semibold">{displayNumber}</span>
              </a>

              <button 
                onClick={onShowCallback}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold hover:from-amber-600 hover:to-amber-700 transition-colors duration-200 shadow hover:shadow-amber-500/25"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Get in Touch</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PricingSection;
