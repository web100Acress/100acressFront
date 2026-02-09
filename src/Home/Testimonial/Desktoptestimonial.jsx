import React, { useState, useRef, useEffect } from 'react';
import { Star, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Desktoptestimonial = () => {
    const testimonials = [
        {
            id: 1,
            name: "Anshuman Saini",
            role: "Verified Buyer",
            image: "https://lh3.googleusercontent.com/a-/ALV-w1zYyv...", // Placeholder or generated
            text: "I had a wonderful experience working with MoneyTree Realty for my real estate investment needs. They are truly experts i...",
            rating: 5,
        },
        {
            id: 2,
            name: "Vansh Tadon",
            role: "Verified Buyer",
            image: "https://lh3.googleusercontent.com/a-/ALV-w1z...",
            text: "MoneyTree Realty is for sure a best option if anyone is thinking for investment in Real Estate. Everything happens here...",
            rating: 5,
        },
        {
            id: 3,
            name: "Paritosh varakya",
            role: "Verified Buyer",
            image: "https://lh3.googleusercontent.com/a-/ALV-w1z...",
            text: "I highly recommend Money Tree Realty, a bestseller in the real estate sector. I recently purchased a property in M3M, an...",
            rating: 5,
        }
    ];

    return (
        <section className="py-12 bg-white font-['Inter',sans-serif]">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header Section */}
                <div className="text-center mb-6">
                    <h2 className="text-4xl md:text-5xl font-bold text-[#0A2647] mb-2">
                        Real Stories from <span className="text-[#1A5F7A]">Happy Homeowners</span>
                    </h2>
                    <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
                        <span className="font-bold">98% client satisfaction rate</span> – as the best real estate consultant in Delhi NCR, we handle everything from RERA compliance to possession. <span className="text-[#1A5F7A]">100% verified projects only.</span>
                    </p>
                </div>

                {/* Testimonial Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    {testimonials.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 h-full"
                        >
                            <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100">
                                        <img
                                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=random`}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-1.5">
                                            <h4 className="font-bold text-[#0A2647] text-base">{item.name}</h4>
                                            <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <p className="text-xs text-gray-500">{item.role}</p>
                                    </div>
                                </div>
                                <img src="https://www.gstatic.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" alt="Google" className="h-5 opacity-80" />
                            </div>

                            {/* Stars */}
                            <div className="flex gap-1 mb-2">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={18}
                                        fill="#FBBF24"
                                        className="text-amber-400"
                                    />
                                ))}
                            </div>

                            {/* Text */}
                            <p className="text-gray-700 text-sm leading-relaxed mb-2">
                                "{item.text}"
                            </p>
                            
                            <div className="text-right">
                                <button className="text-xs text-gray-400 hover:text-gray-600 font-medium">read more</button>
                            </div>
                        </div>  
                    ))}
                </div>

                {/* Footer Links */}
                <div className="flex flex-col items-center gap-1">
                    <a 
                        href="https://www.google.com/search?sca_esv=52b43d2d7ada44fc&sxsrf=ANbL-n7995QvsnxHRM_BwDPVJ1Ms6VP9xw:1770553620804&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOWxYJB5qmXETLS9hVwSeHujJAAVqJjuc1_24JayouSjXeg3aI2cSHrPCCoutWf0j6IbM2DFBOqow4P7qCJ9Fvl68R5kf&q=100acress.com+Reviews&sa=X&ved=2ahUKEwjys_6c8smSAxUYkpUCHZtyJjEQ0bkNegQIPBAH&biw=1920&bih=911&dpr=1" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-[#0A2647] font-semibold hover:underline"
                    >
                        See more reviews <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Desktoptestimonial;

