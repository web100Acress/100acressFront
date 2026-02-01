import React, { useEffect, useRef, useState } from 'react';

const AboutSectionMobile = ({ projectName, description, imageUrl, onShowCallback = () => {} }) => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const [expanded, setExpanded] = useState(false);

  return (
    <section id="about" role="region" aria-labelledby="about-heading" className="relative w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
      {/* Mobile-Optimized Card Container */}
      <div className="relative rounded-2xl overflow-hidden ring-1 ring-yellow-400/20 bg-gradient-to-br from-black via-gray-900 to-gray-800 shadow-[0_15px_40px_rgba(0,0,0,0.35)]">
        {/* Mobile circular accents */}
        <div className="pointer-events-none absolute -top-16 -right-16 w-48 h-48 rounded-full bg-gradient-to-br from-yellow-500/10 via-yellow-400/0 to-transparent blur-xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-16 w-56 h-56 rounded-full bg-gradient-to-tr from-yellow-400/10 via-transparent to-transparent blur-xl" />

        <div ref={sectionRef} className="relative p-4 sm:p-6">
          {/* Mobile Layout - Image First */}
          <div className="relative w-full mb-6">
            <div className="relative w-full h-[200px] sm:h-[240px] rounded-xl overflow-hidden ring-1 ring-yellow-400/30 shadow-[0_8px_25px_rgba(250,204,21,0.10)]">
              <img 
                fetchPriority='high'
                src={imageUrl} 
                alt={`${projectName || 'Project'} overview`} 
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700 ease-out"
              />
              {/* Mobile gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-yellow-900/20 pointer-events-none"></div>
            </div>
          </div>

          {/* Mobile Text Content */}
          <div className="relative">
            {/* Mobile spotlight effect */}
            <div className="absolute -top-4 left-0 w-48 h-48 bg-gradient-radial from-yellow-400/15 via-yellow-400/0 to-transparent rounded-full blur-2xl" />
            
            <div className="relative z-10">
              <h2 id="about-heading" className="text-yellow-400 text-xs font-semibold uppercase tracking-wider mb-3">
                About {projectName || 'Project'}
              </h2>
              
              <h3 
                ref={titleRef}
                className="text-white text-2xl sm:text-3xl font-bold leading-tight shimmer-on-hover cursor-pointer"
              >
                {projectName || "Modern Living"}
              </h3>
              
              {/* Mobile gold underline */}
              <div className="mt-2 h-[2px] rounded-full gold-underline w-20 sm:w-24" />
              
              <div className={`text-white font-semibold text-base md:text-lg leading-snug mt-3 mb-2 ${expanded ? '' : 'line-clamp-4'}`}>
                {description ? (
                  <div dangerouslySetInnerHTML={{ __html: description }} />
                ) : (
                  <div>
                    <p className="mb-3">
                      This is a placeholder description for the project overview. Replace this text later with a concise summary covering the project's concept, lifestyle, and key value propositions.
                    </p>
                  </div>
                )}
              </div>

              {/* Mobile Read more / less toggle */}
              <div className="mt-2">
                <button
                  type="button"
                  onClick={() => setExpanded(!expanded)}
                  className="text-yellow-400 hover:text-yellow-300 text-sm font-semibold underline underline-offset-4"
                  aria-expanded={expanded}
                  aria-controls="about-description"
                >
                  {expanded ? 'Show Less' : 'Read More'}
                </button>
              </div>
              
              {/* Mobile CTA Button */}
              <button 
                onClick={onShowCallback}
                className="mt-4 w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-lg transition-colors shadow-lg shadow-yellow-500/10 flex items-center justify-center gap-2"
                aria-label={`Get details for ${projectName || 'this project'}`}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                Get Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionMobile;
