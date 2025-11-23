import React from 'react';

const AboutBuilder = ({ builderName = "", aboutDeveloper = "" }) => {
  // Don't render if no builder information is available
  if (!builderName && !aboutDeveloper) {
    return null;
  }

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-black via-gray-900 to-black text-white relative overflow-hidden">
      {/* Sophisticated Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-gradient-to-tl from-amber-400 to-amber-500 rounded-full blur-3xl"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/5 to-transparent"></div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Premium Section Header */}
        <div className="text-center mb-2">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full mb-4">
            <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h2 className="text-amber-400 text-sm font-semibold uppercase tracking-[0.2em] mb-2">
            DEVELOPER
          </h2>
          <h3 className="text-white text-3xl md:text-4xl font-bold leading-tight mb-4 max-w-3xl mx-auto">
            About {builderName || "the Developer"}
          </h3>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 rounded-full mx-auto"></div>
        </div>

        {/* Developer Content */}
        <div className="max-w-5xl mx-auto mt-4">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-600 to-amber-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-6 md:p-8 border border-gray-700/50 backdrop-blur-sm">
              
              {/* Developer Description */}
              {aboutDeveloper && (
                <div className="prose prose-lg prose-invert max-w-none">
                  <div 
                    className="text-gray-300 leading-relaxed text-base md:text-lg"
                    dangerouslySetInnerHTML={{ __html: aboutDeveloper }}
                  />
                </div>
              )}

              {/* Developer Highlights */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-lg border border-gray-700/50">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <h4 className="text-white font-bold text-lg mb-2">Quality Assurance</h4>
                  <p className="text-gray-400 text-sm">Premium construction standards</p>
                </div>

                <div className="text-center p-4 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-lg border border-gray-700/50">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="text-white font-bold text-lg mb-2">Timely Delivery</h4>
                  <p className="text-gray-400 text-sm">On-time project completion</p>
                </div>

                <div className="text-center p-4 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-lg border border-gray-700/50">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h4 className="text-white font-bold text-lg mb-2">Customer Focus</h4>
                  <p className="text-gray-400 text-sm">Dedicated customer service</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators
        <div className="max-w-3xl mx-auto mt-8">
          <div className="bg-gradient-to-r from-amber-600/10 to-amber-500/5 rounded-xl p-6 border border-amber-600/20">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h5 className="text-amber-400 font-semibold mb-2">Trusted Developer</h5>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {builderName} is a renowned real estate developer known for delivering premium 
                  residential and commercial projects with exceptional quality and customer satisfaction.
                </p>
              </div>
            </div>
          </div>
        </div> */}
        {/* uncomment this section to show the trusted sectio if wanted in future for my future developer friend's */}
      </div>
    </section>
  );
};

export default AboutBuilder;
