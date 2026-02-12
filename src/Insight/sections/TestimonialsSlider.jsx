import React from 'react';
import { Star, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 h-full">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100">
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=random`}
              alt={testimonial.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="font-bold text-[#0A2647] text-base">{testimonial.name}</h4>
              <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-xs text-gray-500">Verified Buyer • {testimonial.location}</p>
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
            fill={i < testimonial.rating ? "#FBBF24" : "none"}
            className={i < testimonial.rating ? "text-amber-400" : "text-gray-300"}
          />
        ))}
      </div>

      {/* Text */}
      <p className="text-gray-700 text-sm leading-relaxed mb-2">
        "{testimonial.review}"
      </p>

      <div className="flex justify-between items-center mt-auto">
        <span className="text-[10px] bg-gray-50 text-gray-400 px-2 py-0.5 rounded-full border border-gray-100">
          {testimonial.propertyType}
        </span>
        <button className="text-xs text-gray-400 hover:text-gray-600 font-medium">read more</button>
      </div>
    </div>
  );
};

const RealEstateTestimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Purvi Rathee",
      location: "Gurgaon",
      rating: 5,
      review: "100acress is really the best real estate office in Gurgaon. It helps customers find a perfect property according to their taste and demand at the best cost than the market rate! Although its staff is very cooperative and helpful in suggesting the best option for their clients.",
      propertyType: "Residential Property"
    },
    {
      id: 2,
      name: "Sneha Khatkar",
      location: "Noida",
      rating: 5,
      review: "I had a fantastic experience working with 100acress. From start to finish, their team was professional, knowledgeable, and responsive. They took the time to understand my needs and made the entire process smooth and stress-free.",
      propertyType: "Apartment"
    },
    {
      id: 3,
      name: "Krishti",
      location: "Gurgaon",
      rating: 5,
      review: "Had a great experience working with 100acress.com! The entire team process was smooth, transparent and extremely professional. They showed me properties that matched my needs and didn't pressure me at all.",
      propertyType: "Builder Floor"
    },
    {
      id: 4,
      name: "Amit Ydv",
      location: "Delhi",
      rating: 5,
      review: "Great experience with this real estate company. Professional, responsive, and found the perfect home within our budget. Highly recommend to anyone looking for their dream home.",
      propertyType: "Affordable Property"
    },
    {
      id: 5,
      name: "Sohen Sajeev",
      location: "Gurgaon",
      rating: 5,
      review: "100acress is the best known for its service and my retail investment is the best decision I've taken with the help of this company. Excellent guidance throughout the process.",
      propertyType: "Retail Investment"
    },
    {
      id: 6,
      name: "Ritika Shivaliya",
      location: "Gurugram",
      rating: 5,
      review: "Office environment is very positive!! All the staff members are very supportive. This is best real estate company in gurugram for both clients and employees.",
      propertyType: "Commercial Property"
    }
  ];

  return (
    <section className="py-12 bg-white font-['Inter',sans-serif]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0A2647] mb-2">
            Real Stories from <span className="text-[#1A5F7A]">Happy Homeowners</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            <span className="font-bold">98% client satisfaction rate</span> – as the best real estate consultant in Delhi NCR, we handle everything from RERA compliance to possession. <span className="text-[#1A5F7A]">100% verified projects only.</span>
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id}>
              <TestimonialCard testimonial={testimonial} />
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

export default RealEstateTestimonials;