import React from 'react';

const LocationSection = ({ 
  projectName = "",
  projectAddress = "",
  city = "",
  locationImage = null,
  connectivityPoints = [],
  businessPoints = [],
  educationPoints = [],
  entertainmentPoints = []
}) => {
  // Check if any connectivity data exists
  const hasConnectivity = (connectivityPoints && connectivityPoints.length > 0) ||
                         (businessPoints && businessPoints.length > 0) ||
                         (educationPoints && educationPoints.length > 0) ||
                         (entertainmentPoints && entertainmentPoints.length > 0);

  const IconConnectivity = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );

  const IconBusiness = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  );

  const IconEducation = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    </svg>
  );

  const IconEntertainment = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2M9 12l2 2 4-4" />
    </svg>
  );

  return (
    <section className="py-20 bg-gradient-to-b from-black via-gray-900 to-black text-white relative overflow-hidden">
      {/* Sophisticated Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-tl from-amber-400 to-amber-500 rounded-full blur-3xl"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/5 to-transparent"></div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Premium Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full mb-6">
            <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h2 className="text-amber-400 text-sm font-semibold uppercase tracking-[0.2em] mb-4">
            LOCATION & CONNECTIVITY
          </h2>
          <h3 className="text-white text-3xl md:text-4xl font-bold leading-tight mb-6 max-w-3xl mx-auto">
            Strategic Location with Unmatched Connectivity
          </h3>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 rounded-full mx-auto"></div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-16">
          {/* Location Map Card */}
          <div className="xl:col-span-2">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-600 to-amber-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700/50 backdrop-blur-sm">
                <div className="aspect-[16/10] bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden mb-6 border border-gray-600/30">
                  {locationImage?.url ? (
                    <img
                      src={locationImage.url}
                      alt={`${projectName} Location Map`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                          <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7" />
                          </svg>
                        </div>
                        <p className="text-gray-400 font-medium">Interactive Location Map</p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white text-xl font-bold mb-2">
                        {projectName || "Prime Location"}
                      </h4>
                      <p className="text-gray-300 leading-relaxed">
                        {projectAddress && `${projectAddress}`}
                        {city && `, ${city}`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700/50">
              <h5 className="text-amber-400 font-semibold mb-4">Location Highlights</h5>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <span className="text-gray-300 text-sm">Prime Commercial Hub</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <span className="text-gray-300 text-sm">Excellent Connectivity</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <span className="text-gray-300 text-sm">Rapid Development Area</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Connectivity Grid */}
        {hasConnectivity && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Connectivity Points */}
            {connectivityPoints && connectivityPoints.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <IconConnectivity />
                  </div>
                  <h5 className="text-white font-bold text-lg">Connectivity</h5>
                </div>
                <div className="space-y-3">
                  {connectivityPoints.map((point, index) => (
                    <div 
                      key={index}
                      className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-lg p-4 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 backdrop-blur-sm"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-300 text-sm leading-relaxed group-hover:text-white transition-colors duration-300">
                          {point}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Business Points */}
            {businessPoints && businessPoints.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                    <IconBusiness />
                  </div>
                  <h5 className="text-white font-bold text-lg">Business</h5>
                </div>
                <div className="space-y-3">
                  {businessPoints.map((point, index) => (
                    <div 
                      key={index}
                      className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-lg p-4 border border-gray-700/50 hover:border-emerald-500/50 transition-all duration-300 backdrop-blur-sm"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-300 text-sm leading-relaxed group-hover:text-white transition-colors duration-300">
                          {point}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education Points */}
            {educationPoints && educationPoints.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <IconEducation />
                  </div>
                  <h5 className="text-white font-bold text-lg">Education</h5>
                </div>
                <div className="space-y-3">
                  {educationPoints.map((point, index) => (
                    <div 
                      key={index}
                      className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-lg p-4 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 backdrop-blur-sm"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-300 text-sm leading-relaxed group-hover:text-white transition-colors duration-300">
                          {point}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Entertainment Points */}
            {entertainmentPoints && entertainmentPoints.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-rose-600 rounded-lg flex items-center justify-center">
                    <IconEntertainment />
                  </div>
                  <h5 className="text-white font-bold text-lg">Entertainment</h5>
                </div>
                <div className="space-y-3">
                  {entertainmentPoints.map((point, index) => (
                    <div 
                      key={index}
                      className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-lg p-4 border border-gray-700/50 hover:border-rose-500/50 transition-all duration-300 backdrop-blur-sm"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-rose-400 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-300 text-sm leading-relaxed group-hover:text-white transition-colors duration-300">
                          {point}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}
      </div>
    </section>
  );
};

export default LocationSection;
