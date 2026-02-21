import React, { useState, useRef } from 'react';

const MobileFloorPlan = ({ floorPlans = [], bhkDetails = [], onShowCallback = () => {}, projectName = '' }) => {
  const [isImageUnlocked, setIsImageUnlocked] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const touchStartX = useRef(null);

  const handleFormSuccess = () => {
    const unlockKey = `floorplan_unlocked_${bhkDetails[0]?.bhk_type || 'default'}`;
    localStorage.setItem(unlockKey, 'true');
    setIsImageUnlocked(true);
  };

  const handleGetDetails = () => {
    onShowCallback(handleFormSuccess);
  };

  const goToPrevious = () => {
    setIsTransitioning(true);
    setTimeout(() => setIsTransitioning(false), 350);
    setCurrentIndex((prev) => (prev === 0 ? floorPlans.length - 1 : prev - 1));
    if (navigator.vibrate) navigator.vibrate(50);
  };

  const goToNext = () => {
    setIsTransitioning(true);
    setTimeout(() => setIsTransitioning(false), 350);
    setCurrentIndex((prev) => (prev === floorPlans.length - 1 ? 0 : prev + 1));
    if (navigator.vibrate) navigator.vibrate(50);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) {
      delta > 0 ? goToNext() : goToPrevious();
    }
    touchStartX.current = null;
  };

  if (!floorPlans || floorPlans.length === 0 || !floorPlans.some(plan => plan && plan.url)) {
    return null;
  }

  const currentBhk = bhkDetails[currentIndex];

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
        <div className="text-center mb-8">
          <h3 className="text-white text-3xl md:text-4xl font-bold leading-tight mb-3">
            Floor Plan{projectName ? ` of ${projectName}` : ''}
          </h3>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-600 to-amber-500 rounded-full mx-auto mt-4 animate-pulse"></div>
          <p className="text-gray-300 text-sm mt-4 max-w-2xl mx-auto">
            Choose your ideal home configuration & explore detailed layouts
          </p>
        </div>

        {/* Mobile Floor Plan Image */}
        <div className="bg-gray-800/30 p-4 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
          <div
            className="relative bg-gray-900 rounded-xl overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Swipe indicator */}
            {/* <div className="absolute top-4 left-4 z-20 bg-black/60 backdrop-blur-md rounded-full px-3 py-1.5 flex items-center gap-2">
              <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
              <span className="text-white text-xs font-medium">Swipe to navigate</span>
            </div> */}

            {/* Corner decorations */}
            <div className="absolute top-2 left-2 w-2.5 h-2.5 border-l border-t border-amber-600/60 z-10"></div>
            <div className="absolute top-2 right-2 w-2.5 h-2.5 border-r border-t border-amber-600/60 z-10"></div>
            <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-l border-b border-amber-600/60 z-10"></div>
            <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-r border-b border-amber-600/60 z-10"></div>

            {/* Loading skeleton */}
            {isTransitioning && (
              <div className="absolute inset-0 bg-gray-900/80 z-10 flex items-center justify-center">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                  <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                  <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                </div>
              </div>
            )}

            {/* Image — extra bottom padding to not sit under nav bar */}
            <div className="relative overflow-hidden" style={{ height: '288px' }}>
              <img
                src={floorPlans[currentIndex]?.url}
                alt={`Floor plan ${currentIndex + 1} for ${bhkDetails[currentIndex]?.bhk_type || 'Project'}`}
                className={`w-full h-full object-contain transition-all duration-300 ${
                  isImageUnlocked ? '' : 'blur-lg'
                } ${isTransitioning ? 'opacity-0 scale-95' : ''}`}
              />

              {/* Overlay for locked images */}
              {!isImageUnlocked && (
                <div className="absolute inset-0 flex items-center justify-center"
                  style={{ background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.88) 100%)' }}
                >
                  <div style={{ textAlign: 'center', padding: '0 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                    <div>
                      <h4 className="text-white text-2xl font-bold mb-2 leading-tight">
                        Unlock Detailed Floor Plans
                      </h4>
                      <p className="text-gray-300 text-sm">
                        Get exclusive access to detailed layouts, dimensions & specifications
                      </p>
                    </div>

                    {/* ✅ FIX 1: Get Instant Access — inline styles ensure icon + text are always in one row */}
                    <button
                      onClick={handleGetDetails}
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        background: 'linear-gradient(135deg, #f59e0b, #d97706, #b45309)',
                        color: '#000',
                        fontWeight: '700',
                        fontSize: '14px',
                        lineHeight: '1',
                        padding: '13px 26px',
                        borderRadius: '999px',
                        border: '2px solid rgba(251,191,36,0.5)',
                        boxShadow: '0 8px 28px rgba(245,158,11,0.4)',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        WebkitTapHighlightColor: 'transparent',
                        outline: 'none',
                      }}
                    >
                      <svg
                        style={{ width: '17px', height: '17px', flexShrink: 0, display: 'block' }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span style={{ display: 'inline-block' }}>Get Instant Access</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Progress dots */}
            <div className="absolute top-4 right-4 z-20 flex gap-1.5">
              {floorPlans.map((_, i) => (
                <div
                  key={i}
                  className={`transition-all duration-300 cursor-pointer ${
                    i === currentIndex
                      ? 'w-6 h-1.5 bg-amber-500 rounded-full'
                      : 'w-1.5 h-1.5 bg-gray-600 rounded-full'
                  }`}
                  onClick={() => { setCurrentIndex(i); setIsTransitioning(true); setTimeout(() => setIsTransitioning(false), 350); }}
                />
              ))}
            </div>

            {/* ✅ FIX 2: Navigation Bar — CSS grid 3-col so buttons are always visually separated */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '56px 1fr 56px',
                alignItems: 'stretch',
                background: 'rgba(0,0,0,0.90)',
                backdropFilter: 'blur(12px)',
                borderTop: '1px solid rgba(255,255,255,0.07)',
                minHeight: '56px',
              }}
            >
              {/* ← Prev */}
              <button
                onClick={goToPrevious}
                aria-label="Previous floor plan"
                style={{
                  background: 'transparent',
                  border: 'none',
                  borderRight: '1px solid rgba(255,255,255,0.07)',
                  color: '#9ca3af',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  WebkitTapHighlightColor: 'transparent',
                  padding: 0,
                  transition: 'color 0.2s, background 0.2s',
                }}
                onTouchStart={e => e.currentTarget.style.color = '#f59e0b'}
                onTouchEnd={e => e.currentTarget.style.color = '#9ca3af'}
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Center: count + BHK type */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '10px 8px', gap: '2px' }}>
                <span style={{ color: '#ffffff', fontSize: '13px', fontWeight: '600', lineHeight: '1.2' }}>
                  {currentIndex + 1} / {floorPlans.length}
                </span>
                <span style={{ color: '#f59e0b', fontSize: '11px', fontWeight: '500', lineHeight: '1.2' }}>
                  {bhkDetails[currentIndex]?.bhk_type || 'Floor Plan'}
                </span>
              </div>

              {/* → Next */}
              <button
                onClick={goToNext}
                aria-label="Next floor plan"
                style={{
                  background: 'transparent',
                  border: 'none',
                  borderLeft: '1px solid rgba(255,255,255,0.07)',
                  color: '#9ca3af',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  WebkitTapHighlightColor: 'transparent',
                  padding: 0,
                  transition: 'color 0.2s, background 0.2s',
                }}
                onTouchStart={e => e.currentTarget.style.color = '#f59e0b'}
                onTouchEnd={e => e.currentTarget.style.color = '#9ca3af'}
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Detail Card */}
        {currentBhk && (
          <div className="mt-6 p-4 rounded-xl border bg-black border-gray-800 shadow-lg shadow-black/50 transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-amber-500/20 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h4 className="text-white font-bold text-lg">Current Selection</h4>
              </div>
              <div className="bg-amber-500 text-black text-xs font-bold px-2.5 py-1 rounded-full animate-pulse">
                ACTIVE
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-gray-900 rounded-lg border border-gray-800">
                <div className="text-amber-400 text-2xl font-light mb-1">
                  {currentBhk.bhk_type?.charAt(0) || 'B'}
                </div>
                <p className="text-white font-bold text-lg">{currentBhk.bhk_type || 'N/A'}</p>
                <p className="text-gray-400 text-xs uppercase tracking-wider">Configuration</p>
              </div>
              <div className="text-center p-3 bg-gray-900 rounded-lg border border-gray-800">
                <div className="text-amber-400 text-2xl font-light mb-1">
                  <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                </div>
                <p className="text-white font-bold text-lg">{currentBhk.bhk_Area || 'N/A'}</p>
                <p className="text-gray-400 text-xs uppercase tracking-wider">Carpet Area</p>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-gray-800">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">Floor Plan {currentIndex + 1} of {floorPlans.length}</span>
                <span className="text-amber-400 font-medium">Swipe to explore more →</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MobileFloorPlan;