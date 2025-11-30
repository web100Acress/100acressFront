import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDubai } from '../context/DubaiContext';

export const NewHero = () => {
  const { emirateConfig } = useDubai();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dubai video from S3 bucket
  const heroVideo = "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/dubai/dubai_vidoe.webm";

  // Calculate blur based on scroll position
  const blurAmount = Math.min(scrollY / 300, 10); // Max blur of 10px after 300px scroll
  const opacity = Math.max(1 - scrollY / 500, 0.3); // Fade to 30% opacity
  const textOpacity = Math.max(1 - scrollY / 200, 0); // Hide text completely after 200px scroll
  const textTransform = `translateY(${Math.min(scrollY * 0.5, 100)}px)`; // Move text down on scroll

  return (
    <section 
      className="fixed top-0 left-0 w-full h-screen overflow-hidden z-0"
      style={{
        filter: `blur(${blurAmount}px)`,
        opacity: opacity,
      }}
    >
      {/* Full Height Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={heroVideo} type="video/webm" />
          Your browser does not support the video tag.
        </video>
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 lg:px-8">
        <div 
          className="text-center max-w-4xl mx-auto transition-all duration-300"
          style={{
            opacity: textOpacity,
            transform: textTransform,
          }}
        >
          {/* Tagline */}
          <div className="mb-6">
            <span className="inline-block text-gold text-sm sm:text-base font-medium tracking-wider uppercase border border-gold/30 px-4 py-2 rounded-full backdrop-blur-sm bg-black/20">
              {emirateConfig.tagline}
            </span>
          </div>
          
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            {emirateConfig.headline.split(' ').slice(0, -2).join(' ')}
            <span className="block text-gold mt-2">
              {emirateConfig.headline.split(' ').slice(-2).join(' ')}
            </span>
          </h1>
          
          {/* Description */}
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            {emirateConfig.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/projects-in-dubai">
            <button className="px-8 py-4 bg-gold text-black font-semibold rounded-lg hover:bg-gold/90 transition-all duration-300 transform hover:scale-105">
              Explore Properties
            </button>
            </Link>

            <button 
              onClick={() => window.open("https://wa.me/919811750740?text=Hi! I'm interested in Dubai properties. Can you help me?", "_blank")}
              className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-[#d4af37]  hover:text-black transition-all duration-300"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 transition-all duration-300"
        style={{
          opacity: textOpacity,
          transform: `translateX(-50%) translateY(${Math.min(scrollY * 0.3, 50)}px)`,
        }}
      >
        <div className="flex flex-col items-center text-white/70">
          <span className="text-sm mb-2">Scroll Down</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
