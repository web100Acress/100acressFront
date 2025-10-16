import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { RealestateIcon, LegalIcon, HomeloanIcon, InteriorIcon } from "../../Assets/icons";
import "aos/dist/aos.css";
import AOS from "aos";
import CraneTool from "../Actual_Components/cranetool.svg";
import ProblemSelector from "../OurServices/ProblemSelector.jsx";
import SolutionInfo from "../OurServices/SolutionInfo.jsx";
import ContactForm from "../OurServices/ContactForm.jsx";

function OurServices() {
  const [step, setStep] = useState(0);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const assistRef = useRef(null);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: false,
    autoplaySpeed: 3000,
    dotsClass: "slick-dots custom-dots",
  };

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out'
    });
  }, []);

  useEffect(() => {
    console.log('🔄 ourServices: step changed to:', step);
    if (step > 0 && assistRef.current) {
      console.log('📍 ourServices: scrolling to assist section');
      assistRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [step]);

  const openAssist = (e) => {
    console.log('🚀 ourServices: openAssist called');
    if (e && typeof e.preventDefault === 'function') e.preventDefault();
    setStep(1);
    console.log('✅ ourServices: step set to 1 (problem selector)');
  };

  const handleSelectProblem = (item) => {
    console.log('🎯 ourServices: problem selected:', item);
    setSelectedProblem(item);
    setStep(2);
    console.log('✅ ourServices: step set to 2 (solution info)');
  };

  const handleTalkToExpert = () => {
    console.log('💬 ourServices: talk to expert clicked');
    setStep(3);
    console.log('✅ ourServices: step set to 3 (contact form)');
  };

  const handleBack = () => {
    console.log('⬅️ ourServices: back button clicked, current step:', step);
    if (step > 1) {
      const newStep = step - 1;
      setStep(newStep);
      console.log('✅ ourServices: step set to:', newStep);
    } else {
      console.log('⚠️ ourServices: cannot go back, already at step 1');
    }
  };

  const services = [
    {
      id: 'realestate',
      image: '/icons/discussion.png',
      title: 'Real Estate Consulting',
      description: 'Get expert real estate consulting to find the right property, whether it\'s flats, apartments, or new residential projects.',
      color: 'from-red-500 to-red-600',
      interactive: true
    },
    {
      id: 'legal',
      image: '/icons/male-student.webp',
      title: 'Legal Assistance',
      description: 'Buying property needs trusted legal support. We guide you with property documents, agreements, and safe transactions.',
      color: 'from-red-600 to-red-700',
      link: '/contact-us/'
    },
    {
      id: 'interior',
      image: '/icons/interior.webp',
      title: 'Interior Design',
      description: 'Transform your house into a dream home with affordable interior design solutions for flats, villas, and apartments.',
      color: 'from-red-500 to-pink-600',
      link: '/contact-us/'
    },
    {
      id: 'loan',
      image: '/icons/applicant.webp',
      title: 'Property Loan',
      description: 'We help you choose the best home loan options and guide you through the process to buy your property with ease.',
      color: 'from-red-700 to-red-800',
      link: '/contact-us/'
    },
    {
      id: 'construction',
      image: '/icons/construction-site.webp',
      title: 'Construction',
      description: 'End-to-end construction solutions with quality, timelines, and transparency.',
      color: 'from-red-600 to-red-700',
      link: '/contact-us/'
    }
  ];

  const ServiceCard = ({ service, index, isWide = false }) => {
    const isHovered = hoveredCard === service.id;
    
    const CardContent = () => (
      <div 
        className="relative h-full group"
        onMouseEnter={() => setHoveredCard(service.id)}
        onMouseLeave={() => setHoveredCard(null)}
      >
        <div className={`
          relative h-full bg-white rounded-2xl overflow-hidden
          transition-all duration-800 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
          ${isHovered ? 'shadow-2xl shadow-red-500/30 scale-[1.015]' : 'shadow-lg shadow-gray-200/50'}
          border border-gray-100
          ${isHovered ? 'border-red-400/70' : ''}
        `}>
          {/* Gradient Background */}
          <div className={`
            absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 
            transition-opacity duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
            ${isHovered ? 'opacity-12' : ''}
          `} />
          
          {/* Top Accent Line */}
          <div className={`
            absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${service.color}
            transform origin-left transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
            ${isHovered ? 'scale-x-100' : 'scale-x-0'}
          `} />

          {/* Decorative Dots Pattern */}
          <div className="absolute top-4 right-4 opacity-5">
            <div className="grid grid-cols-3 gap-2">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-red-600" />
              ))}
            </div>
          </div>

          <div className={`relative p-8 h-full ${isWide ? 'flex items-center gap-6' : 'flex flex-col items-center text-center'}`}>
            {/* Icon Container */}
            <div className={`
              ${isWide ? 'flex-shrink-0' : 'mb-5'}
              flex items-center justify-center
              transform transition-all duration-600 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
              ${isHovered ? 'scale-110 rotate-2' : 'scale-100'}
            `}>
              <div className={`
                relative ${isWide ? 'w-24 h-24' : 'w-20 h-20'} flex items-center justify-center
                rounded-2xl bg-gradient-to-br ${service.color}
                shadow-xl transition-all duration-600 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
                ${isHovered ? 'shadow-2xl shadow-red-500/50' : 'shadow-lg shadow-red-500/20'}
              `}>
                {/* Animated Rings */}
                <div className={`absolute inset-0 rounded-2xl border-2 border-white/30 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${isHovered ? 'scale-110' : 'scale-100'}`} />
                <div className={`absolute inset-0 rounded-2xl border border-white/20 transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${isHovered ? 'scale-125' : 'scale-100'}`} />
                
                {service.Icon ? (
                  <service.Icon className={`${isWide ? 'w-12 h-12' : 'w-10 h-10'} text-white relative z-10 drop-shadow-lg`} />
                ) : (
                  <img
                    src={service.image}
                    className={`${isWide ? 'w-12 h-12' : 'w-10 h-10'} object-contain brightness-0 invert relative z-10 drop-shadow-lg`}
                    alt={service.title}
                  />
                )}
                
                {/* Floating Badge */}
                <div className={`
                  absolute -top-2 -right-2 w-7 h-7 rounded-full 
                  bg-red-50 shadow-lg flex items-center justify-center
                  border-2 border-white
                  transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                  ${isHovered ? 'scale-110 rotate-12' : 'scale-100'}
                `}>
                  <svg className="w-3.5 h-3.5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                  </svg>
                </div>

                {/* Glow Effect */}
                {isHovered && (
                  <div className="absolute inset-0 rounded-2xl bg-white/20 animate-pulse-slow" />
                )}
              </div>
            </div>

            {/* Content */}
            <div className={`flex-1 flex flex-col ${isWide ? 'text-left' : 'items-center text-center'}`}>
              <h3 className={`
                ${isWide ? 'text-xl' : 'text-lg'} font-bold mb-3 transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
                ${isHovered ? 'text-red-600' : 'text-gray-900'}
              `}>
                {service.title}
              </h3>
              
              <p className={`text-gray-600 ${isWide ? 'text-base' : 'text-sm'} leading-relaxed mb-5`}>
                {service.description}
              </p>

              {/* Action Button */}
              <div className={`
                ${isWide ? 'inline-flex self-start' : 'inline-flex'} items-center gap-2 text-sm font-semibold
                px-6 py-3 rounded-xl
                transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] mt-auto
                ${isHovered 
                  ? 'bg-gradient-to-r ' + service.color + ' text-white shadow-xl transform scale-105' 
                  : 'bg-red-50 text-red-600'
                }
              `}>
                <span>{service.interactive ? 'Get Started' : 'Learn More'}</span>
                <svg 
                  className={`w-4 h-4 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${isHovered ? 'translate-x-2' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </div>

          {/* Bottom Corner Accent */}
          <div className={`
            absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl ${service.color} opacity-5
            rounded-tl-full transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
            ${isHovered ? 'opacity-18 scale-110' : ''}
          `} />
        </div>
      </div>
    );

    if (service.interactive) {
      return (
        <div 
          role="button" 
          tabIndex={0} 
          onClick={openAssist}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') openAssist(e);
          }}
          className="cursor-pointer h-full"
        >
          <CardContent />
        </div>
      );
    }

    return (
      <Link to={service.link} target="_top" className="block h-full">
        <CardContent />
      </Link>
    );
  };

  return (
    <div className="section font-poppins bg-gradient-to-b from-gray-50 to-white py-16">
      <div className="w-full max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8" data-aos="fade-up">
          <div className="inline-block mb-4">
            <span className="text-red-600 text-sm font-semibold tracking-wider uppercase">
              Our Services
            </span>
            <div className="h-1 w-20 bg-gradient-to-r from-red-500 to-red-600 mx-auto mt-2 rounded-full" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-red-600 via-gray-800 to-red-600 bg-clip-text text-transparent">
              Comprehensive Real Estate Solutions
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
            From consultation to construction, we provide end-to-end services to make your property dreams a reality
          </p>
        </div>

        {/* Mobile Slider */}
        <div className="md:hidden">
          <Slider {...sliderSettings}>
            {services.map((service, index) => (
              <div key={service.id} className="px-2 py-4">
                <div className="h-[360px]">
                  <ServiceCard service={service} index={index} />
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Desktop Grid - 3 cards first row, 2 wider cards second row */}
        <div className="hidden md:block">
          {/* First Row - 3 Cards */}
          <div className="grid grid-cols-3 gap-6 mb-6">
            {services.slice(0, 3).map((service, index) => (
              <div
                key={service.id}
                data-aos="fade-up"
                data-aos-delay={index * 80}
                className="h-full min-h-[300px]"
              >
                <ServiceCard service={service} index={index} />
              </div>
            ))}
          </div>
          
          {/* Second Row - 2 Wider Cards */}
          <div className="grid grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div
              data-aos="fade-up"
              data-aos-delay={240}
              className="h-full min-h-[260px]"
            >
              <ServiceCard service={services[3]} index={3} isWide={true} />
            </div>
            <div
              data-aos="fade-up"
              data-aos-delay={320}
              className="h-full min-h-[260px]"
            >
              <ServiceCard service={services[4]} index={4} isWide={true} />
            </div>
          </div>
        </div>

        {/* Interactive Section */}
        {step > 0 && (
          <div 
            ref={assistRef} 
            className="mt-16 pt-12 border-t-2 border-gray-100"
            data-aos="fade-up"
          >
            <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-6 md:p-8 border border-gray-100">
              {step === 1 && <ProblemSelector onSelect={handleSelectProblem} />}
              {step === 2 && <SolutionInfo selectedProblem={selectedProblem} onNext={handleTalkToExpert} onBack={handleBack} />}
              {step === 3 && <ContactForm selectedProblem={selectedProblem} onBack={handleBack} />}
            </div>
          </div>
        )}
      </div>

      <style>{`
        .slick-prev, .slick-next {
          width: 40px;
          height: 40px;
          z-index: 10;
        }
        .slick-prev {
          left: -15px;
        }
        .slick-next {
          right: -15px;
        }
        .slick-prev:before, .slick-next:before {
          font-size: 40px;
          color: #dc2626;
          opacity: 0.7;
          transition: all 0.3s ease;
        }
        .slick-prev:hover:before, .slick-next:hover:before {
          opacity: 1;
          color: #b91c1c;
        }
        .custom-dots {
          bottom: -40px;
        }
        .custom-dots li button:before {
          font-size: 10px;
          color: #dc2626;
          opacity: 0.3;
        }
        .custom-dots li.slick-active button:before {
          opacity: 1;
          color: #dc2626;
        }
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.4;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}

export default OurServices;