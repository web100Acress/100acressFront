import React, { useState, useRef, useEffect } from 'react';
import { Star, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Mobiletestimonial = () => {
    const scrollContainerRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [isAutoScrolling, setIsAutoScrolling] = useState(true);
    const autoScrollIntervalRef = useRef(null);

    const testimonials = [
        {
            id: 1,
            name: "Soumya",
            role: "Verified Buyer",
            image: "https://lh3.googleusercontent.com/a-/ALV-w1zYyv...", // Placeholder or generated
            text: "Honestly, had a really smooth experience with 100acress. The team was friendly and actually listened to what I needed. They didn’t waste my time with random options and only showed me properties that made sense.",
            rating: 5,
        },
        {
            id: 2,
            name: "Purvi Rathee",
            role: "Verified Buyer",
            image: "https://lh3.googleusercontent.com/a-/ALV-w1z...",
            text: "100acress is really the best real estate office in Gurgaon. It helps customers find a perfect property according to their taste and demand at the best cost than the market rate! Although its staff is very cooperative and helpful in suggesting the best option for their clients. The office environment is very positive!",
            rating: 5,
        },
        {
            id: 3,
            name: "Krishti",
            role: "Verified Buyer",
            image: "https://lh3.googleusercontent.com/a-/ALV-w1z...",
            text: "Had a great experience working with 100acress.com! The entire team process was smooth, transparent and extremely professional. They showed me properties that matched my needs and didn't pressure me at all.",
            rating: 5,
        }
    ];      

    const checkScrollButtons = () => {
        const container = scrollContainerRef.current;
        if (container) {
            setCanScrollLeft(container.scrollLeft > 0);
            setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth);
        }
    };

    const scroll = (direction) => {
        const container = scrollContainerRef.current;
        if (container) {
            const scrollAmount = 320; // Card width + gap
            container.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
            
            // Pause auto-scroll when user manually scrolls
            setIsAutoScrolling(false);
            setTimeout(() => setIsAutoScrolling(true), 5000); // Resume after 5 seconds
        }
    };

    const startAutoScroll = () => {
        if (autoScrollIntervalRef.current) {
            clearInterval(autoScrollIntervalRef.current);
        }
        
        autoScrollIntervalRef.current = setInterval(() => {
            const container = scrollContainerRef.current;
            if (container && isAutoScrolling) {
                const maxScroll = container.scrollWidth - container.clientWidth;
                
                if (container.scrollLeft >= maxScroll - 10) {
                    // Reached the end, scroll back to start
                    container.scrollTo({
                        left: 0,
                        behavior: 'smooth'
                    });
                } else {
                    // Scroll to next card
                    container.scrollBy({
                        left: 320,
                        behavior: 'smooth'
                    });
                }
            }
        }, 3000); // Auto-scroll every 3 seconds
    };

    const stopAutoScroll = () => {
        if (autoScrollIntervalRef.current) {
            clearInterval(autoScrollIntervalRef.current);
        }
    };

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('scroll', checkScrollButtons);
            checkScrollButtons(); // Initial check
            
            // Start auto-scroll on mobile only
            if (window.innerWidth < 768) {
                startAutoScroll();
            }
            
            return () => {
                container.removeEventListener('scroll', checkScrollButtons);
                stopAutoScroll();
            };
        }
    }, []);

    // Pause auto-scroll on hover
    const handleMouseEnter = () => {
        setIsAutoScrolling(false);
    };

    const handleMouseLeave = () => {
        setIsAutoScrolling(true);
    };

    return (
        <section className="py-16 bg-white font-['Inter',sans-serif]">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header Section */}
                <div className="text-center mb-6">
                    <h2 className="text-4xl md:text-5xl font-bold text-[#0A2647] mb-4">
                        Real Stories from <span className="text-[#1A5F7A]">Happy Homeowners</span>
                    </h2>
                    <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
                        <span className="font-bold">98% client satisfaction rate</span> – as the best real estate consultant in Delhi NCR, we handle everything from RERA compliance to possession. <span className="text-[#1A5F7A]">100% verified projects only.</span>
                    </p>
                </div>

                {/* Testimonial Cards - Desktop Grid & Mobile Scrollable */}
                <div className="relative mb-5">
                    {/* Mobile Navigation Buttons */}
                    <button
                        onClick={() => scroll('left')}
                        disabled={!canScrollLeft}
                        className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full transition-all md:hidden ${
                            canScrollLeft 
                                ? 'bg-[#0A2647] text-white shadow-lg' 
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                    >
                        <ChevronLeft size={20} />
                    </button>
                    
                    <button
                        onClick={() => scroll('right')}
                        disabled={!canScrollRight}
                        className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full transition-all md:hidden ${
                            canScrollRight 
                                ? 'bg-[#0A2647] text-white shadow-lg' 
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                    >
                        <ChevronRight size={20} />
                    </button>

                    {/* Scrollable Container for Mobile, Grid for Desktop */}
                    <div 
                        ref={scrollContainerRef}
                        className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto scrollbar-hide md:overflow-visible scroll-smooth px-10 md:px-0"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        {testimonials.map((item) => (
                            <div
                                key={item.id}
                                className="flex-none w-[280px] md:w-auto bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300"
                            >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100">
                                        <img
                                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=random`}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-1.5">
                                            <h4 className="font-bold text-[#0A2647] text-sm">{item.name}</h4>
                                            <svg className="w-3 h-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <p className="text-xs text-gray-500">{item.role}</p>
                                    </div>
                                </div>
                                <img src="https://www.gstatic.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" alt="Google" className="h-4 opacity-80" />
                            </div>

                            {/* Stars */}
                            <div className="flex gap-1 mb-3">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={16}
                                        fill="#FBBF24"
                                        className="text-amber-400"
                                    />
                                ))}
                            </div>

                            {/* Text */}
                            <p className="text-gray-700 text-xs leading-relaxed mb-3 line-clamp-4">
                                "{item.text}"
                            </p>
                            
                            <div className="text-right">
                                <button className="text-xs text-gray-400 hover:text-gray-600 font-medium">read more</button>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>

                {/* Footer Links */}
                <div className="flex flex-col items-center gap-3">
                    <a 
                        href="https://www.google.com/search?sca_esv=52b43d2d7ada44fc&sxsrf=ANbL-n7995QvsnxHRM_BwDPVJ1Ms6VP9xw:1770553620804&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOWxYJB5qmXETLS9hVwSeHujJAAVqJjuc1_24JayouSjXeg3aI2cSHrPCCoutWf0j6IbM2DFBOqow4P7qCJ9Fvl68R5kf&q=100acress.com+Reviews&sa=X&ved=2ahUKEwjys_6c8smSAxUYkpUCHZtyJjEQ0bkNegQIPBAH&biw=1920&bih=911&dpr=1" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-[#0A2647] font-semibold hover:underline"
                    >
                        See live testimonials <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Mobiletestimonial;