import React, { useState, useEffect } from 'react';

const FloorPlan = ({ floorPlans = [], bhkDetails = [], onShowCallback = () => {} }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [isImageUnlocked, setIsImageUnlocked] = useState(false);

  // Check localStorage for image unlock status on component mount
  useEffect(() => {
    const unlockKey = `floorplan_unlocked_${bhkDetails[0]?.bhk_type || 'default'}`;
    const isUnlocked = localStorage.getItem(unlockKey) === 'true';
    setIsImageUnlocked(isUnlocked);
  }, [bhkDetails]);

  // Handle form submission success - unlock images
  const handleFormSuccess = () => {
    const unlockKey = `floorplan_unlocked_${bhkDetails[0]?.bhk_type || 'default'}`;
    localStorage.setItem(unlockKey, 'true');
    setIsImageUnlocked(true);
  };

  // Handle get details button click
  const handleGetDetails = () => {
    onShowCallback(handleFormSuccess);
  };

  if (!floorPlans || floorPlans.length === 0 || !floorPlans.some(plan => plan && plan.url)) {
    return null; // Don't render if no floor plans are available or no valid URLs
  }

  const activePlan = floorPlans[activeTab];
  const activeBhkDetails = bhkDetails[activeTab];

  return (
    <section className="py-10 bg-black text-white relative overflow-hidden">
      {/* Background decorative lines */}
      <div className="absolute top-0 right-0 -z-0 opacity-20">
        <svg width="800" height="600" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M800 0C700 150 600 200 400 200S100 250 0 400V600h800V0z" fill="url(#grad)"/>
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor: '#373737', stopOpacity: 0.5}} />
              <stop offset="100%" style={{stopColor: '#000000', stopOpacity: 0}} />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10 relative">
        <div className="text-center mb-6">
          <h2 className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-3">
            FLOOR PLANS
          </h2>
          <h3 className="text-white text-2xl md:text-3xl font-bold leading-tight mb-2">
            Master & Floor Plan
          </h3>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-600 to-amber-500 rounded-full mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Left Side: Image and Super Area */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4 mb-4">
              {bhkDetails.map((bhk, index) => (
                <button 
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`px-6 py-2 text-sm font-medium border transition-all duration-300 rounded-md ${
                    activeTab === index 
                      ? 'bg-amber-500 text-black border-amber-500'
                      : 'border-amber-500 text-amber-500 hover:bg-amber-500/10'
                  }`}>
                  {bhk.bhk_type}
                </button>
              ))}
            </div>

            <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700 mb-4 relative">
              {activePlan && (
                <>
                  <img 
                    src={activePlan.url} 
                    alt={`Floor plan for ${activeBhkDetails?.bhk_type}`}
                    className={`w-full h-auto object-contain rounded-md max-h-[400px] transition-all duration-500 ${
                      isImageUnlocked ? '' : 'blur-md'
                    }`}
                  />
                  
                  {/* Blur Overlay with Get Details Button */}
                  {!isImageUnlocked && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-md">
                      <button
                        onClick={handleGetDetails}
                        className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-amber-500/30 flex items-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <span>Get Details to View</span>
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>

            
          </div>

          {/* Right Side: Buttons */}
          <div className="flex flex-col items-center lg:items-end">
            <button 
              onClick={handleGetDetails}
              className="bg-amber-500 text-black font-semibold px-8 py-3 rounded-lg hover:bg-amber-600 transition-colors duration-300 w-full lg:w-auto"
            >
              Get Details
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FloorPlan;
