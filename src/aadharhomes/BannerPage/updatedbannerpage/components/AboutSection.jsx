import React, { useEffect, useRef, useState } from 'react';

const AboutSection = ({ projectName, description, imageUrl, onShowCallback = () => {} }) => {
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
    <section id="about" role="region" aria-labelledby="about-heading" className="relative w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Luxury Rounded Card Container with Circular Accents */}
      <div className="relative rounded-3xl overflow-hidden ring-1 ring-yellow-400/20 bg-gradient-to-br from-black via-gray-900 to-gray-800 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
        {/* Circular golden ambient accents */}
        <div className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full bg-gradient-to-br from-yellow-500/10 via-yellow-400/0 to-transparent blur-2xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-24 w-96 h-96 rounded-full bg-gradient-to-tr from-yellow-400/10 via-transparent to-transparent blur-2xl" />

        <div ref={sectionRef} className="relative grid grid-cols-1 md:grid-cols-2 gap-6 items-center py-8 md:py-10 lg:py-12">
        {/* Left Column - Text Content */}
        <div className="relative order-2 md:order-1 px-6 sm:px-8 md:px-10 lg:px-12">
          {/* Geometric Diamond Pattern Background */}
          <div className="absolute -inset-4 opacity-[0.03] hidden md:block"><div className="diamond-pattern"></div></div>
          {/* Soft Spotlight Effect */}
          <div className="absolute -top-6 left-0 w-72 h-72 bg-gradient-radial from-yellow-400/15 via-yellow-400/0 to-transparent rounded-full blur-3xl" />
          {/* Thin golden diagonal bborders */}
          <div className="pointer-events-none absolute -top-2 -left-6 w-2/3 h-px bg-gradient-to-r from-transparent via-yellow-400/70 to-transparent rotate-12" />
          <div className="pointer-events-none absolute -bottom-2 -right-6 w-2/3 h-px bg-gradient-to-r from-transparent via-yellow-400/70 to-transparent -rotate-12" />
          
          {/* Content */}
          <div className="relative z-10">
            <h2 id="about-heading" className="text-yellow-400 text-sm font-semibold uppercase tracking-widest mb-4">
              About {projectName || 'Project'}
            </h2>
            
            <h3 
              ref={titleRef}
              className="text-white text-3xl md:text-4xl lg:text-5xl font-bold leading-tight shimmer-on-hover cursor-pointer"
            >
              {projectName || "Modern Living"}
            </h3>
            {/* Animated gold underline */}
            <div className="mt-2 h-[3px] rounded-full gold-underline w-28 sm:w-36" />
            
            <div className={`text-white/90 text-sm md:text-base leading-relaxed mt-4 mb-2 ${expanded ? '' : 'line-clamp-6'}`}>
              {description ? (
                <div dangerouslySetInnerHTML={{ __html: description }} />
              ) : (
                <div>
                  <p className="mb-4">
                    This is a placeholder description for the project overview. Replace this text later with a concise summary covering the project's concept, lifestyle, and key value propositions.
                  </p>
                </div>
              )}
            </div>

            {/* Read more / less toggle */}
            <div className="mt-1">
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
            
            <button 
              onClick={onShowCallback}
              className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-5 py-2.5 rounded-md transition-colors shadow-lg shadow-yellow-500/10"
              aria-label={`Get details for ${projectName || 'this project'}`}
            >
              Get Details
            </button>
          </div>
        </div>
        
        {/* Right Column - Image with Luxury Framing */}
        <div className="relative order-1 md:order-2 w-full px-4 md:px-8">
          <div className="relative w-full h-[260px] sm:h-[300px] md:h-[340px] lg:h-[380px]">
            {/* Rounded container with golden ring and soft glow */}
            <div className="relative h-full w-full rounded-none md:rounded-[28px] overflow-hidden ring-1 ring-yellow-400/30 shadow-[0_10px_40px_rgba(250,204,21,0.10)]">
              <img 
                src={imageUrl} 
                alt={`${projectName || 'Project'} overview`} 
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700 ease-out"
              />
              {/* Subtle golden gradient overlay for luxury tint */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-yellow-900/20 pointer-events-none"></div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;