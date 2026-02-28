import React, { useState } from 'react';
import { Star, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Navbar from '../aadharhomes/navbar/Navbar';
import Footer from '../Home/Footer/CrimsonEleganceFooter';

const TestimonialsPage = () => {
    const [visibleCount, setVisibleCount] = useState(6);
    const [selectedTestimonial, setSelectedTestimonial] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const testimonials = [
        {
            id: 1,
            name: "Soumya",
            role: "Verified Buyer",
            image: "https://lh3.googleusercontent.com/a-/ALV-w1zYyv...",
            text: "Honestly, had a really smooth experience with 100acress. The team was friendly and actually listened to what I needed. They didn't waste my time with random options and only showed me properties that made sense. What stood out was how honest and straightforward they were — no pressure, no salesy talk. They were always available to clear doubts and made the whole process feel easy and stress-free. Would definitely recommend them if you're looking to buy or invest in real estate.",
            rating: 5,
        },
        {
            id: 2,
            name: "Purvi Rathee",
            role: "Verified Buyer",
            image: "https://lh3.googleusercontent.com/a-/ALV-w1z...",
            text: "100acress is really the best real estate office in Gurgaon. It helps customers find a perfect property according to their taste and demand at best cost than market rate! Although its staff is very cooperative and helpful in suggesting the best option for their clients. The office environment is very positive! I am so thankful to be a part of this unique and supportive family. Moreover being its employee I'm also one of its happy customers. Recently last month I had purchased a unit from it. My family is fully satisfied with their deal.",
            rating: 5,
        },
        {
            id: 3,
            name: "Krishti",
            role: "Verified Buyer",
            image: "https://lh3.googleusercontent.com/a-/ALV-w1z...",
            text: "Had a great experience working with 100acress! The entire team process was smooth, transparent and extremely professional. They showed me properties that matched my needs and didn't pressure me at all.",
            rating: 5,
        },
        {
            id: 4,
            name: "Sneha Khatkar",
            role: "Verified Buyer",
            image: "https://lh3.googleusercontent.com/a-/ALV-w1z...",
            text: "I had a fantastic experience working with 100acress. From start to finish, their team was professional, knowledgeable, and responsive. They took time to understand my needs and made the entire process smooth and stress-free. I appreciated their attention to detail and their dedication to finding the right property for me. Highly recommend their services to anyone looking for a seamless real estate experience.",
            rating: 5,
        },
        {
            id: 5,
            name: "Amit Yadav",
            role: "Verified Buyer",
            image: "https://lh3.googleusercontent.com/a-/ALV-w1z...",
            text: "Great experience with this real estate company. Professional, responsive, and found the perfect home within our budget. Highly recommend.",
            rating: 5,
        },
        {
            id: 6,
            name: "Manish Talwar",
            role: "Verified Buyer",
            image: "https://lh3.googleusercontent.com/a-/ALV-w1z...",
            text: "A Stellar Partner in Real Estate. In my experience with 100acress, I found them to be an outstanding real estate consulting firm that consistently goes the extra mile for their clients. Their expertise, customer-centric approach, transparency, negotiation skills, and comprehensive services make them a top choice for anyone looking to navigate the real Estate market successfully. I wholeheartedly recommend 100acress to anyone seeking professional guidance in the real estate world.",
            rating: 5,
        },
        {
            id: 7,
            name: "Aayush Gupta",
            role: "Verified Buyer",
            image: "https://lh3.googleusercontent.com/a-/ALV-w1z...",
            text: "Rajesh ji is awesome. One place stop for all your real estate deals. Good natured, an honest and god fearing person.",
            rating: 5,
        },
        {
            id: 8,
            name: "Sohen Sajeev",
            role: "Verified Buyer",
            image: "https://lh3.googleusercontent.com/a-/ALV-w1z...",
            text: "100acress is best known for its service and my retail investment is the best decision I've taken with the help of this company.",
            rating: 5,
        },
        {
            id: 9,
            name: "Rahul Yadav",
            role: "Verified Buyer",
            image: "https://lh3.googleusercontent.com/a-/ALV-w1z...",
            text: "My experience with 100acress has been excellent. They are pretty competent. They have perfect co-working spaces. Overall, it's a fantastic place to work.",
            rating: 5,
        },
        {
            id: 10,
            name: "Priya Singh",
            role: "Verified Buyer",
            image: "https://lh3.googleusercontent.com/a-/ALV-w1z...",
            text: "Great experience! The team was responsive and helped me find the perfect commercial space for my business. Highly recommend their services.",
            rating: 5,
        },
        {
            id: 11,
            name: "Amit Kumar",
            role: "Verified Buyer",
            image: "https://lh3.googleusercontent.com/a-/ALV-w1z...",
            text: "100acress made my home buying journey smooth and hassle-free. Their attention to detail and customer service is exceptional.",
            rating: 5,
        },
        {
            id: 12,
            name: "Neha Gupta",
            role: "Verified Buyer",
            image: "https://lh3.googleusercontent.com/a-/ALV-w1z...",
            text: "Very professional team with deep knowledge of the market. They helped me find the perfect investment property with great returns.",
            rating: 5,
        },
        {
            id: 13,
            name: "Rohit Patel",
            role: "Verified Buyer",
            image: "https://lh3.googleusercontent.com/a-/ALV-w1z...",
            text: "Outstanding service! The team went above and beyond to help me find my dream home. Their after-sales support is also excellent.",
            rating: 5,
        },
        {
            id: 14,
            name: "Kavita Malhotra",
            role: "Verified Buyer",
            image: "https://lh3.googleusercontent.com/a-/ALV-w1z...",
            text: "Highly recommend 100acress! They made the entire process transparent and easy. No hidden charges, just honest service.",
            rating: 5,
        },
        {
            id: 15,
            name: "Sanjay Verma",
            role: "Verified Buyer",
            image: "https://lh3.googleusercontent.com/a-/ALV-w1z...",
            text: "Excellent team with great market knowledge. Helped me find the perfect property within my budget and timeline.",
            rating: 5,
        }
    ];

    const MAX_CHARS = 150;

    const displayedTestimonials = testimonials.slice(0, visibleCount);
    const hasMore = visibleCount < testimonials.length;

    const loadMore = () => {
        setVisibleCount(prev => Math.min(prev + 6, testimonials.length));
    };

    const openModal = (item) => {
        setSelectedTestimonial(item);
        setIsModalOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedTestimonial(null);
        document.body.style.overflow = 'unset';
    };

    return (
        <>
            <Helmet>
                {/* Primary Meta Tags */}
                <title>Customer Testimonials | 100acress.com Reviews - Real Estate in Delhi NCR</title>
                <meta name="description" content="Read genuine customer testimonials and reviews for 100acress.com. 98% client satisfaction rate. Find out why we're the best real estate consultant in Delhi NCR, Gurgaon, Noida & more." />
                <meta name="keywords" content="100acress reviews, customer testimonials, real estate reviews Delhi NCR, property consultant Gurgaon reviews, best real estate company reviews, happy homeowners testimonials" />
                <link rel="canonical" href="https://www.100acress.com/testimonials/" />
            </Helmet>
            
        <div className="min-h-screen bg-gray-50 font-['Inter',sans-serif]">
            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-8 pt-28">
                {/* Header Section */}
                <div className="text-center mb-6">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold text-[#0A2647] mb-4"
                    >
                        Customer <span className="text-[#1A5F7A]">Testimonials</span>
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed"
                    >
                        Read real stories from our happy homeowners who found their dream properties with 100acress. 
                        <span className="font-bold text-[#1A5F7A]"> 98% client satisfaction rate</span> 
                        – as the best real estate consultant in Delhi NCR.
                    </motion.p>
                </div>

                {/* Testimonial Cards Grid */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
                >
                    {displayedTestimonials.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + index * 0.05 }}
                            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col h-[380px]"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-100">
                                        <img
                                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=random`}
                                            alt={item.name}
                                            loading="lazy"
                                            decoding="async"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-1.5">
                                            <h4 className="font-bold text-[#0A2647] text-lg">{item.name}</h4>
                                            <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <p className="text-sm text-gray-500">{item.role}</p>
                                    </div>
                                </div>
                                <img src="https://www.gstatic.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" alt="Google" loading="lazy" decoding="async" className="h-6 opacity-80" />
                            </div>

                            {/* Stars */}
                            <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={20}
                                        fill="#FBBF24"
                                        className="text-amber-400"
                                    />
                                ))}
                            </div>

                            {/* Text */}
                            <div className="flex-grow mb-4">
                                <p className="text-gray-700 text-base leading-relaxed">
                                    "{item.text.slice(0, MAX_CHARS) + (item.text.length > MAX_CHARS ? '...' : '')}"
                                </p>
                            </div>
                            
                            {item.text.length > MAX_CHARS && (
                                <div className="text-right">
                                    <button 
                                        onClick={() => openModal(item)}
                                        className="text-sm text-gray-400 hover:text-gray-600 font-medium transition-colors"
                                    >
                                        Read more
                                    </button>
                                </div>
                            )}
                        </motion.div>  
                    ))}
                </motion.div>

                {/* Load More Button */}
                {hasMore && (
                    <div className="text-center mt-8">
                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            onClick={loadMore}
                            className="bg-[#0A2647] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#1A5F7A] transition-colors shadow-lg hover:shadow-xl"
                        >
                            Load More Testimonials
                        </motion.button>
                    </div>
                )}

                {/* Footer Links */}
                <div className="flex flex-col items-center gap-4 mt-12">
                    <p className="text-gray-600 text-center">
                        Want to share your experience? 
                        <a href="/contact-us/" className="text-[#1A5F7A] font-semibold hover:underline ml-1">
                            Contact us
                        </a>
                    </p>
                    <a 
                        href="https://www.google.com/search?sca_esv=52b43d2d7ada44fc&sxsrf=ANbL-n7995QvsnxHRM_BwDPVJ1Ms6VP9xkXd_doETEE1OR-qOWxYJB5qmXETLS9hVwSeHujJAAVqJjuc1_24JayouSjXeg3aI2cSHrPCCoutWf0j6IbM2DFBOqow4P7qCJ9Fvl68R5kf&q=100acress.com+Reviews&sa=X&ved=2ahUKEwjys_6c8smSAxUYkpUCHZtyJjEQ0bkNegQIPBAH&biw=1920&bih=911&dpr=1" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[#0A2647] font-semibold hover:underline"
                    >
                        See more reviews on Google 
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </a>
                </div>
            </div>
            
            {/* Modal Popup for Read More */}
            {isModalOpen && selectedTestimonial && (
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    onClick={closeModal}
                >
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-white rounded-2xl max-w-lg w-full max-h-[80vh] shadow-2xl overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100">
                                    <img
                                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(selectedTestimonial.name)}&background=random`}
                                        alt={selectedTestimonial.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <div className="flex items-center gap-1.5">
                                        <h4 className="font-bold text-[#0A2647] text-base">{selectedTestimonial.name}</h4>
                                        <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <p className="text-xs text-gray-500">{selectedTestimonial.role}</p>
                                </div>
                            </div>
                            <button 
                                onClick={closeModal}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        
                        {/* Modal Content - Scrollable */}
                        <div className="p-6 overflow-y-auto max-h-[50vh]">
                            {/* Stars */}
                            <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={20}
                                        fill="#FBBF24"
                                        className="text-amber-400"
                                    />
                                ))}
                            </div>
                            
                            {/* Full Testimonial Text */}
                            <p className="text-gray-700 text-base leading-relaxed">
                                "{selectedTestimonial.text}"
                            </p>
                        </div>
                        
                        {/* Modal Footer */}
                        <div className="p-6 border-t border-gray-100 bg-gray-50">
                            <div className="flex items-center justify-between">
                                <img src="https://www.gstatic.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" alt="Google" className="h-5 opacity-80" />
                                <button 
                                    onClick={closeModal}
                                    className="px-6 py-2 bg-[#0A2647] text-white rounded-full font-semibold hover:bg-[#1A5F7A] transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
            
            {/* Footer */}
            <Footer />
        </div>
        </>
    );
};

export default TestimonialsPage;
