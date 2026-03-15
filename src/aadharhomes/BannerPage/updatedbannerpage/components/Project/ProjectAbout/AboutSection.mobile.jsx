import React, { useMemo } from 'react';
import './AboutSection.mobile.css';

const AboutSectionMobile = ({ projectName, description, imageUrl, onShowCallback = () => {} }) => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-up');
          });
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  });

  const [expanded, setExpanded] = useState(false);

  return (
    <section id="about" role="region" aria-labelledby="about-heading" className="about-section-mobile">
      {/* Mobile-Optimized Card Container */}
      <div className="about-section-mobile-card">
        {/* Mobile circular accents */}
        <div className="about-section-mobile-accent-top" />
        <div className="about-section-mobile-accent-bottom" />

        <div ref={sectionRef} className="about-section-mobile-content">
          {/* Mobile Layout - Image First */}
          <div className="about-section-mobile-image-wrapper">
            <div className="about-section-mobile-image-container">
              <img 
                fetchpriority="high"
                src={imageUrl} 
                alt={`${projectName || 'Project'} overview`} 
                loading="lazy"
                decoding="async"
                crossOrigin="anonymous"
                className="about-section-mobile-image"
                width="100%"
                height="100%"
                style={{ objectFit: 'cover' }}
                referrerPolicy="no-referrer"
                performance="high"
              />
              {/* Mobile gradient overlay */}
              <div className="about-section-mobile-image-overlay"></div>
            </div>
          </div>

          {/* Mobile Text Content */}
          <div className="about-section-mobile-text-wrapper">
            {/* Mobile spotlight effect */}
            <div className="about-section-mobile-spotlight" />
            
            <div className="about-section-mobile-text-content">
              <h2 id="about-heading" className="about-section-mobile-title">
                About {projectName || 'Project'}
              </h2>
              
              <h3 
                ref={titleRef}
                className="about-section-mobile-heading"
              >
                {projectName || "Modern Living"}
              </h3>
              
              {/* Mobile gold underline */}
              <div className="about-section-mobile-underline" />
              
              <div className={`about-section-mobile-description ${expanded ? '' : 'collapsed'}`}>
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
              <div className="about-section-mobile-read-more">
                <button
                  type="button"
                  onClick={() => setExpanded(!expanded)}
                  className="about-section-mobile-read-more-button"
                  aria-expanded={expanded}
                  aria-controls="about-description"
                >
                  {expanded ? 'Show Less' : 'Read More'}
                </button>
              </div>
              
              {/* Mobile CTA Button */}
              <button 
                onClick={onShowCallback}
                className="about-section-mobile-cta-button"
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
