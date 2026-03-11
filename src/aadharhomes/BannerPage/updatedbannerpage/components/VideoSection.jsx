import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './VideoSection.css';

const VideoSection = ({ 
  projectName, 
  youtubeVideoUrl, 
  youtubeVideoTitle, 
  youtubeVideoDescription,
  onShowCallback,
  backgroundImage
}) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // Function to extract YouTube video ID from URL
  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Don't render if no video URL is provided
  if (!youtubeVideoUrl) {
    return null;
  }

  const videoId = getYouTubeVideoId(youtubeVideoUrl);
  
  // Don't render if we can't extract a valid video ID
  if (!videoId) {
    return null;
  }

  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <section className="video-section">
      <div className="video-section-content">
        {/* Section Header */}
        <motion.div 
          className="video-section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="video-section-badge">
            <svg className="video-section-badge-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
            </svg>
            <span className="video-section-badge-text">Video Gallery</span>
          </div>

          <h2 className="video-section-title">
            <span className="video-section-title-gradient">
              {projectName ? `${projectName} Walkthrough` : 'Project Walkthrough'}
            </span>
          </h2>

          <div className="video-section-divider">
            <div className="video-section-divider-line"></div>
          </div>

          {youtubeVideoDescription && (
            <motion.div
              className="video-section-description"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <p className="video-section-description-text">
                {youtubeVideoDescription}
              </p>
            </motion.div>
          )}

          <motion.div 
            className="video-section-meta"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="video-section-meta-item">
              <svg className="video-section-meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span>Verified</span>
            </div>
            <div className="video-section-meta-item">
              <svg className="video-section-meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
              <span>HD</span>
            </div>
            <div className="video-section-meta-item">
              <svg className="video-section-meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span>Tour</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Video Container */}
        <motion.div 
          className="video-section-video-container"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="video-section-video-wrapper">
            {/* Video Embed */}
            <div className="video-section-video-frame">
              {!isVideoLoaded && (
                <div 
                  className="video-section-thumbnail"
                  onClick={() => setIsVideoLoaded(true)}
                >
                  <img 
                    src={backgroundImage || thumbnailUrl}
                    alt="Video thumbnail"
                    loading="lazy"
                    decoding="async"
                    className="video-section-thumbnail-img"
                  />
                  {/* Dark overlay */}
                  <div className="video-section-thumbnail-overlay"></div>
                  
                  {/* Play button */}
                  <div className="video-section-play-wrapper">
                    <motion.div
                      className="video-section-play-btn"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        width: '80px',
                        height: '80px',
                        minWidth: '80px',
                        minHeight: '80px'
                      }}
                    >
                      <svg 
                        width="40" 
                        height="40" 
                        viewBox="0 0 24 24" 
                        fill="white"
                        className="video-section-play-btn-icon"
                      >
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </motion.div>
                  </div>

                  {/* Video title overlay - hidden on mobile */}
                  <div className="video-section-title-overlay">
                    <motion.div
                      className="video-section-title-overlay-inner"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                    >
                      {/* Project badge */}
                      <div className="video-section-project-badge">
                        <svg className="video-section-project-badge-icon" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                        <span className="video-section-project-badge-text">Featured Project</span>
                      </div>

                      {/* Main title */}
                      <h3 className="video-section-video-title">
                        {youtubeVideoTitle || `${projectName} - Project Walkthrough`}
                      </h3>

                      {/* Subtitle with icon */}
                      <div className="video-section-video-subtitle">
                        <svg className="video-section-video-subtitle-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                        </svg>
                        <p className="video-section-video-subtitle-text">
                          Click to watch the complete project tour
                        </p>
                      </div>

                      {/* Duration indicator */}
                      <div className="video-section-duration">
                        <svg className="video-section-duration-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <span>Full project walkthrough • HD Quality</span>
                      </div>
                    </motion.div>
                  </div>
                </div>
              )}

              {isVideoLoaded && (
                <iframe
                  src={embedUrl}
                  title={youtubeVideoTitle || `${projectName} Video`}
                  className="video-section-iframe"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="video-section-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="video-section-cta-buttons">
            <motion.button
              onClick={() => onShowCallback && onShowCallback()}
              className="video-section-cta-primary"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(245, 158, 11, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span>Schedule Site Visit</span>
            </motion.button>

            <motion.a
              href={youtubeVideoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="video-section-cta-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              <span>Watch on YouTube</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoSection;
