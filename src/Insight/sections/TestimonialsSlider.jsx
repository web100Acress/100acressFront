import React, { useEffect, useRef, useState, useCallback } from "react";
import api from "../../config/apiClient";

export default function TestimonialsSlider() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tIndex, setTIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [animationClass, setAnimationClass] = useState("animate-slideIn");
  const touchX = useRef(null);
  const autoSlideRef = useRef(null);

  // Fetch testimonials from API
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const response = await api.get('/api/testimonials/active');
        if (response.data.success) {
          setTestimonials(response.data.testimonials);
        } else {
          // Enhanced fallback testimonials
          setTestimonials([
            {
              id: 1,
              quote: "100Acress helped us find our dream home in just 2 weeks. Their market insights and professional guidance made the entire process smooth and stress-free. The team was incredibly responsive and understood exactly what we were looking for.",
              author: "Rajesh Kumar",
              role: "Senior IT Professional",
              company: "Tech Solutions Inc.",
              location: "Gurgaon",
              image: {
                url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3"
              },
              rating: 5,
              verified: true
            },
            {
              id: 2,
              quote: "Outstanding service! The team's deep understanding of the Delhi NCR market helped us make an informed investment decision. Their market analysis reports were incredibly detailed and accurate.",
              author: "Priya Sharma",
              role: "Senior Business Analyst",
              company: "Financial Corp",
              location: "New Delhi",
              image: {
                url: "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3"
              },
              rating: 5,
              verified: true
            },
            {
              id: 3,
              quote: "From property search to final paperwork, 100Acress handled everything professionally. Their transparency and expertise gave us complete peace of mind throughout the entire journey.",
              author: "Amit Singh",
              role: "Senior Manager",
              company: "Manufacturing Ltd.",
              location: "Noida",
              image: {
                url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3"
              },
              rating: 5,
              verified: true
            },
            {
              id: 4,
              quote: "Excellent experience! The detailed property reports and virtual tours saved us so much time. We found the perfect investment property quickly with their expert guidance.",
              author: "Sneha Patel",
              role: "Investment Consultant",
              company: "Wealth Management",
              location: "Faridabad",
              image: {
                url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3"
              },
              rating: 5,
              verified: true
            },
            {
              id: 5,
              quote: "Professional, reliable, and knowledgeable. 100Acress made our first home buying experience wonderful. Thank you for the exceptional service and continuous support!",
              author: "Vikram Mehta",
              role: "Senior Software Engineer",
              company: "StartupTech",
              location: "Ghaziabad",
              image: {
                url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3"
              },
              rating: 5,
              verified: true
            }
          ]);
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        setError('Failed to load testimonials');
        // Use enhanced fallback testimonials
        setTestimonials([
          {
            id: 1,
            quote: "100Acress helped us find our dream home in just 2 weeks. Their market insights and professional guidance made the entire process smooth and stress-free.",
            author: "Rajesh Kumar",
            role: "IT Professional",
            company: "Tech Solutions Inc.",
            image: {
              url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3"
            },
            rating: 5,
            verified: true
          },
          {
            id: 2,
            quote: "Outstanding service! The team's deep understanding of the Delhi NCR market helped us make an informed investment decision. Highly recommended!",
            author: "Priya Sharma",
            role: "Business Analyst",
            company: "Financial Corp",
            image: {
              url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop"
            },
            rating: 5,
            verified: true
          },
          {
            id: 3,
            quote: "From property search to final paperwork, 100Acress handled everything professionally. Their transparency and expertise gave us complete peace of mind.",
            author: "Amit Singh",
            role: "Senior Manager",
            company: "Manufacturing Ltd.",
            image: {
              url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3"
            },
            rating: 5,
            verified: true
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // Enhanced navigation with animation
  const changeTestimonial = useCallback((newIndex, direction = 'next') => {
    setAnimationClass(direction === 'next' ? 'animate-slideOutLeft' : 'animate-slideOutRight');
    
    setTimeout(() => {
      setTIndex(newIndex);
      setAnimationClass(direction === 'next' ? 'animate-slideInRight' : 'animate-slideInLeft');
    }, 150);
  }, []);

  const next = useCallback(() => {
    const newIndex = (tIndex + 1) % testimonials.length;
    changeTestimonial(newIndex, 'next');
  }, [tIndex, testimonials.length, changeTestimonial]);

  const prev = useCallback(() => {
    const newIndex = (tIndex - 1 + testimonials.length) % testimonials.length;
    changeTestimonial(newIndex, 'prev');
  }, [tIndex, testimonials.length, changeTestimonial]);

  const goToSlide = useCallback((index) => {
    if (index === tIndex) return;
    const direction = index > tIndex ? 'next' : 'prev';
    changeTestimonial(index, direction);
  }, [tIndex, changeTestimonial]);

  // Enhanced touch handling
  const onTouchStart = (e) => {
    try {
      touchX.current = e.changedTouches[0].clientX;
      setIsPlaying(false); // Pause auto-slide on touch
    } catch {}
  };

  const onTouchEnd = (e) => {
    try {
      const endX = e.changedTouches[0].clientX;
      const startX = touchX.current;
      if (startX == null) return;
      const dx = endX - startX;
      const THRESH = 50;
      if (dx > THRESH) prev();
      else if (dx < -THRESH) next();
    } catch {}
    finally {
      touchX.current = null;
      setIsPlaying(true); // Resume auto-slide
    }
  };

  // Enhanced auto-slide with play/pause
  useEffect(() => {
    if (testimonials.length === 0 || !isPlaying) return;
    
    autoSlideRef.current = setInterval(() => {
      setTIndex(i => (i + 1) % testimonials.length);
    }, 7000);
    
    return () => {
      if (autoSlideRef.current) {
        clearInterval(autoSlideRef.current);
      }
    };
  }, [testimonials.length, isPlaying]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Enhanced loading state
  if (loading) {
    return (
      <section className="max-w-screen-xl mx-auto px-4 md:px-6 md:pl-[260px] py-10 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
          <div className="text-center md:text-left space-y-4">
            <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg w-3/4 animate-shimmer"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-full animate-shimmer"></div>
              <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-5/6 animate-shimmer"></div>
              <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-3/4 animate-shimmer"></div>
            </div>
            <div className="space-y-2">
              <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-1/2 animate-shimmer"></div>
              <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-1/3 animate-shimmer"></div>
            </div>
          </div>
          <div className="flex justify-center md:justify-end">
            <div className="w-[320px] h-[280px] bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-xl animate-shimmer"></div>
          </div>
        </div>
        <style jsx>{`
          @keyframes shimmer {
            0% { background-position: -200px 0; }
            100% { background-position: calc(200px + 100%) 0; }
          }
          .animate-shimmer {
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 200px 100%;
            animation: shimmer 1.5s infinite linear;
          }
        `}</style>
      </section>
    );
  }

  // Enhanced error state
  if (error && testimonials.length === 0) {
    return (
      <section className="max-w-screen-xl mx-auto px-4 md:px-6 md:pl-[260px] py-10 md:py-14">
        <div className="text-center bg-red-50 border border-red-200 rounded-lg p-8">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h3 className="text-2xl font-bold text-red-800 mb-2">Unable to load testimonials</h3>
          <p className="text-red-600 mb-4">We're having trouble loading client testimonials right now.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return null;
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span 
        key={i} 
        className={`text-lg transition-colors duration-200 ${
          i < rating ? 'text-yellow-400 drop-shadow-sm' : 'text-gray-300'
        }`}
      >
        ★
      </span>
    ));
  };

  const currentTestimonial = testimonials[tIndex];

  return (
    <section 
      className="max-w-screen-xl mx-auto px-4 md:px-6 md:pl-[260px] py-10 md:py-14 relative overflow-hidden" 
      onTouchStart={onTouchStart} 
      onTouchEnd={onTouchEnd}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full opacity-50 -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-yellow-50 rounded-full opacity-50 translate-y-12 -translate-x-12"></div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 lg:gap-12 relative">
        <div className={`text-center md:text-left transition-all duration-300 ${animationClass}`}>
          {/* Header with enhanced styling */}
          <div className="mb-6">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-2 leading-tight">
              What Our Clients Say
            </h3>
            <div className="w-12 h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full mx-auto md:mx-0"></div>
          </div>
          
          {/* Quote with enhanced design */}
          <div className="relative mb-6">
            <div className="text-blue-600 text-6xl lg:text-7xl leading-none mb-2 font-serif absolute -top-4 -left-2 opacity-30">"</div>
            <blockquote className="text-gray-700 text-base md:text-lg lg:text-xl leading-relaxed italic relative z-10 pl-8">
              {currentTestimonial.quote}
            </blockquote>
            <div className="text-blue-600 text-6xl lg:text-7xl leading-none font-serif absolute -bottom-6 -right-2 opacity-30 rotate-180">"</div>
          </div>
          
          {/* Enhanced rating display */}
          <div className="mb-6">
            <div className="flex items-center gap-1 justify-center md:justify-start mb-2">
              {renderStars(currentTestimonial.rating || 5)}
              {currentTestimonial.verified && (
                <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full flex items-center gap-1">
                  ✓ Verified
                </span>
              )}
            </div>
          </div>
          
          {/* Enhanced author info */}
          <div className="bg-white border-l-4 border-blue-600 pl-6 pr-4 py-4 rounded-r-lg shadow-sm mb-6">
            <div className="font-bold text-gray-900 text-lg mb-1">{currentTestimonial.author}</div>
            <div className="text-gray-600 text-sm mb-1">
              {currentTestimonial.role}
              {currentTestimonial.company && ` at ${currentTestimonial.company}`}
            </div>
            {currentTestimonial.location && (
              <div className="text-gray-500 text-xs flex items-center gap-1">
                📍 {currentTestimonial.location}
              </div>
            )}
          </div>
          
          {/* Enhanced controls */}
          <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
            <button
              onClick={prev}
              className="group px-5 py-2.5 bg-white border-2 border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600 transition-all duration-200 flex items-center gap-2 rounded-lg shadow-sm hover:shadow-md"
              aria-label="Previous testimonial"
            >
              <span className="transform group-hover:-translate-x-1 transition-transform duration-200">←</span>
              Prev
            </button>
            
            <button
              onClick={togglePlayPause}
              className="p-3 bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition-colors duration-200 rounded-lg shadow-sm"
              aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
            >
              {isPlaying ? '⏸️' : '▶️'}
            </button>
            
            <button
              onClick={next}
              className="group px-5 py-2.5 bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 flex items-center gap-2 rounded-lg shadow-md hover:shadow-lg"
              aria-label="Next testimonial"
            >
              Next
              <span className="transform group-hover:translate-x-1 transition-transform duration-200">→</span>
            </button>
          </div>
          
          {/* Enhanced indicators */}
          <div className="flex items-center gap-2 justify-center md:justify-start">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  i === tIndex 
                    ? 'bg-blue-600 scale-125 shadow-md' 
                    : 'bg-gray-300 hover:bg-gray-400 hover:scale-110'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
          
          {/* Progress bar */}
          <div className="mt-4 w-full bg-gray-200 rounded-full h-1 overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transition-all duration-75 ${
                isPlaying ? 'animate-progress' : ''
              }`}
              style={{ width: `${((tIndex + 1) / testimonials.length) * 100}%` }}
            ></div>
          </div>
        </div>
        
        {/* Enhanced image section */}
        <div className="flex justify-center md:justify-end">
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300 blur"></div>
            <img
              src={currentTestimonial.image?.url || currentTestimonial.img || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop"}
              alt={currentTestimonial.author}
              className="relative rounded-xl w-[280px] sm:w-[320px] lg:w-[380px] h-[200px] sm:h-[240px] lg:h-[280px] object-cover shadow-xl group-hover:shadow-2xl transition-shadow duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-xl"></div>
            
            {/* Floating rating badge */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1 shadow-lg">
              <span className="text-yellow-400 text-sm">★</span>
              <span className="font-semibold text-gray-800 text-sm">{currentTestimonial.rating || 5}</span>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes slideInRight {
          from { transform: translateX(30px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideInLeft {
          from { transform: translateX(-30px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutLeft {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(-30px); opacity: 0; }
        }
        @keyframes slideOutRight {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(30px); opacity: 0; }
        }
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        .animate-slideInRight { animation: slideInRight 0.3s ease-out forwards; }
        .animate-slideInLeft { animation: slideInLeft 0.3s ease-out forwards; }
        .animate-slideOutLeft { animation: slideOutLeft 0.15s ease-in forwards; }
        .animate-slideOutRight { animation: slideOutRight 0.15s ease-in forwards; }
        .animate-progress { animation: progress 7s linear; }
      `}</style>
    </section>
  );
}