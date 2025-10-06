import React, { useState } from 'react';
import { motion } from 'framer-motion';

const VideoSection = ({ 
  projectName, 
  youtubeVideoUrl, 
  youtubeVideoTitle, 
  youtubeVideoDescription,
  onShowCallback 
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

  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1`;
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <section className="py-16 bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            Project Walkthrough
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full mx-auto mb-4"></div>
          {youtubeVideoTitle && (
            <p className="text-xl text-gray-300 font-light max-w-3xl mx-auto">
              {youtubeVideoTitle}
            </p>
          )}
        </motion.div>

        {/* Video Container */}
        <motion.div 
          className="relative max-w-5xl mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-gray-800 border border-gray-700">
            {/* Video Embed */}
            <div className="relative aspect-video">
              {!isVideoLoaded && (
                <div 
                  className="absolute inset-0 bg-cover bg-center cursor-pointer group"
                  style={{ backgroundImage: `url(${thumbnailUrl})` }}
                  onClick={() => setIsVideoLoaded(true)}
                >
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-300"></div>
                  
                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="bg-red-600 hover:bg-red-700 rounded-full p-6 shadow-2xl cursor-pointer transform transition-all duration-300 group-hover:scale-110"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg 
                        width="48" 
                        height="48" 
                        viewBox="0 0 24 24" 
                        fill="white"
                        className="ml-1"
                      >
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </motion.div>
                  </div>

                  {/* Video title overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    <h3 className="text-white text-xl font-semibold mb-2">
                      {youtubeVideoTitle || `${projectName} - Project Walkthrough`}
                    </h3>
                    <p className="text-gray-200 text-sm">
                      Click to watch the complete project tour
                    </p>
                  </div>
                </div>
              )}

              {isVideoLoaded && (
                <iframe
                  src={embedUrl}
                  title={youtubeVideoTitle || `${projectName} Video`}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
            </div>
          </div>

          {/* Video Description */}
          {youtubeVideoDescription && (
            <motion.div 
              className="mt-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30">
                <p className="text-gray-300 text-lg leading-relaxed max-w-4xl mx-auto">
                  {youtubeVideoDescription}
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button
              onClick={() => onShowCallback && onShowCallback()}
              className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-3 rounded-full font-semibold text-lg flex items-center space-x-2 hover:from-amber-600 hover:to-orange-700 transition-all duration-300 shadow-xl hover:shadow-2xl"
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
              className="bg-transparent border-2 border-gray-600 text-gray-300 px-8 py-3 rounded-full font-semibold text-lg flex items-center space-x-2 hover:border-gray-500 hover:text-white transition-all duration-300"
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
