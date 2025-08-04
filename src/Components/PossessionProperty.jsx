import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PossessionProperty = () => {
  const [activeTab, setActiveTab] = useState("ready-to-move");
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4000,
    fade: true,
    cssEase: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          dots: true,
          autoplay: true,
          autoplaySpeed: 3500,
          fade: false,
          cssEase: 'ease-out'
        }
      }
    ]
  };

  const possessionData = {
    "ready-to-move": {
      title: "Ready to Move",
      subtitle: "Immediate Possession Available",
      description: "Move in instantly with these ready-to-occupy properties",
      propertiesCount: "620+ Properties",
      icon: "🏠",
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    "possession-2024": {
      title: "Possession by 2024",
      subtitle: "Quick Handover",
      description: "Properties ready for possession within this year",
      propertiesCount: "600+ Properties",
      icon: "⚡",
      color: "from-blue-500 to-indigo-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    "possession-2025": {
      title: "Possession by 2025",
      subtitle: "Near Future",
      description: "Properties scheduled for possession next year",
      propertiesCount: "500+ Properties",
      icon: "📅",
      color: "from-purple-500 to-pink-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    },
    "possession-after-2025": {
      title: "Possession after 2025",
      subtitle: "Future Projects",
      description: "Upcoming projects with long-term investment potential",
      propertiesCount: "800+ Properties",
      icon: "🚀",
      color: "from-orange-500 to-red-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200"
    }
  };

  const tabs = [
    { id: "ready-to-move", label: "Ready to Move", icon: "🏠" },
    { id: "possession-2024", label: "2024", icon: "⚡" },
    { id: "possession-2025", label: "2025", icon: "📅" },
    { id: "possession-after-2025", label: "After 2025", icon: "🚀" }
  ];

  const carouselItems = [
    {
      to: "/projects-in-gurugram/property-ready-to-move/",
      imgSrc: "../../Images/p1.webp",
      title: "Ready to Move",
      propertiesCount: "620+ Properties",
      badge: "Immediate",
      features: ["No Waiting", "Furnished Options", "Direct Booking"],
      gradient: "from-green-400 to-emerald-500"
    },
    {
      to: "/projects-in-gurugram/property-ready-to-move/",
      imgSrc: "../../Images/p2.webp",
      title: "Possession by 2024",
      propertiesCount: "600+ Properties",
      badge: "This Year",
      features: ["Quick Handover", "Pre-booking", "Early Bird Offers"],
      gradient: "from-blue-400 to-indigo-500"
    },
    {
      to: "/projects-in-gurugram/property-possession-in-2025/",
      imgSrc: "../../Images/p5.webp",
      title: "Possession by 2025",
      propertiesCount: "500+ Properties",
      badge: "Next Year",
      features: ["Under Construction", "Payment Plans", "Investment Ready"],
      gradient: "from-purple-400 to-pink-500"
    },
    {
      to: "projects-in-gurugram/property-possession-after-2026/",
      imgSrc: "../../Images/p3.webp",
      title: "Possession after 2026",
      propertiesCount: "800+ Properties",
      badge: "Future",
      features: ["Pre-launch", "Best Prices", "High Returns"],
      gradient: "from-orange-400 to-red-500"
    },
  ];

  return (
    <div className={`w-full transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      {/* Header Section - Full Width */}
      <div className="text-center mb-4 md:mb-6 px-4 md:px-6">
        <div className="relative">
          <h2 className="text-lg md:text-2xl lg:text-3xl font-bold text-gray-800 mb-1 md:mb-3">
            Find Your Perfect
            <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent"> Possession Timeline</span>
          </h2>
          <div className="absolute -top-1 md:-top-2 left-1/2 transform -translate-x-1/2 w-12 md:w-16 h-0.5 md:h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"></div>
        </div>
        <p className="text-xs md:text-sm lg:text-base text-gray-600 max-w-4xl mx-auto leading-relaxed">
          Move in without delay, with possession effortlessly handled. 
          Discover properties that align with your desired move-in timeframe.
        </p>
      </div>

      {/* Tab Navigation */}
      {/* <div className="flex justify-center mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-2 flex flex-wrap justify-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg transform scale-105'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div> */}

      {/* Active Tab Content */}
      {/* <div className="mb-8">
        {activeTab && possessionData[activeTab] && (
          <div className={`max-w-4xl mx-auto p-6 rounded-2xl ${possessionData[activeTab].bgColor} border ${possessionData[activeTab].borderColor}`}>
            <div className="text-center">
              <div className="text-4xl mb-4">{possessionData[activeTab].icon}</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {possessionData[activeTab].title}
              </h3>
              <p className="text-lg text-gray-600 mb-4">
                {possessionData[activeTab].subtitle}
              </p>
              <p className="text-gray-700 mb-4">
                {possessionData[activeTab].description}
              </p>
              <div className={`inline-block px-6 py-3 rounded-full bg-gradient-to-r ${possessionData[activeTab].color} text-white font-semibold text-lg`}>
                {possessionData[activeTab].propertiesCount}
              </div>
            </div>
          </div>
        )}
      </div> */}

      {/* Mobile Carousel - Full Width */}
      <div className="block md:hidden mb-2 w-full">
        <div className="relative w-full">
          {/* Progress Indicator */}
          <div className="absolute top-2 left-2 right-2 z-10">
            <div className="flex justify-between items-center">
              <div className="flex space-x-1">
                {carouselItems.map((_, index) => (
                  <div
                    key={index}
                    className={`h-0.5 rounded-full transition-all duration-300 ${
                      currentSlide === index 
                        ? 'w-4 bg-gradient-to-r from-red-500 to-orange-500' 
                        : 'w-1 bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              <div className="bg-black/20 backdrop-blur-sm text-white px-1.5 py-0.5 rounded-full text-xs font-medium">
                {currentSlide + 1}/{carouselItems.length}
              </div>
            </div>
          </div>

          <Slider {...carouselSettings}>
            {carouselItems.map((item, index) => (
              <div key={index} className="px-1 w-full">
                <Link to={item.to} target="_top" className="w-full">
                  <div 
                    className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-700 transform hover:scale-105 w-full"
                    onMouseEnter={() => setIsHovered(index)}
                    onMouseLeave={() => setIsHovered(null)}
                  >
                    <div className="relative w-full">
                      <img
                        className="w-full h-32 sm:h-36 object-cover transition-transform duration-700 group-hover:scale-110"
                        src={item.imgSrc}
                        alt={item.title}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent">
                        <div className="absolute bottom-2 left-2 right-2">
                          <div className="flex items-center justify-between mb-1">
                            <span className={`bg-gradient-to-r ${item.gradient} text-white px-2 py-0.5 rounded-full text-xs font-bold shadow-lg`}>
                              {item.badge}
                            </span>
                            <span className="text-white text-xs font-medium bg-black/30 backdrop-blur-sm px-1.5 py-0.5 rounded-full">
                              {item.propertiesCount}
                            </span>
                          </div>
                          <h3 className="text-sm sm:text-base font-bold text-white mb-1 leading-tight">
                            {item.title}
                          </h3>
                          <div className="flex flex-wrap gap-1">
                            {item.features.map((feature, idx) => (
                              <span key={idx} className="bg-white/25 text-white text-xs px-1.5 py-0.5 rounded-full backdrop-blur-sm border border-white/20">
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Elegant Hover Overlay */}
                    {isHovered === index && (
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500/90 to-orange-500/90 opacity-100 transition-all duration-500 flex items-center justify-center">
                        <div className="text-center text-white transform scale-110 transition-transform duration-300">
                          <div className="text-2xl mb-2 animate-bounce">🏠</div>
                          <div className="font-bold text-base mb-1">Explore Properties</div>
                          <div className="text-xs opacity-90">Tap to view all properties</div>
                          <div className="mt-2 w-6 h-0.5 bg-white rounded-full mx-auto"></div>
                        </div>
                      </div>
                    )}
                  </div>
                </Link>
              </div>
            ))}
          </Slider>
          
          {/* Modern Auto-Rotation Indicator */}
          <div className="absolute top-2 right-2 bg-black/40 backdrop-blur-md text-white px-1.5 py-0.5 rounded-full text-xs font-medium border border-white/20">
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs">Auto</span>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Grid - Full Width */}
      <div className="hidden md:block w-full">
        <div className="w-full px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 w-full">
            {carouselItems.map((item, index) => (
              <Link key={index} to={item.to} target="_top" className="w-full">
                <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 bg-white w-full">
                  <div className="relative w-full">
                    <img
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                      src={item.imgSrc}
                      alt={item.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                            {item.badge}
                          </span>
                          <span className="text-white text-sm font-medium">
                            {item.propertiesCount}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">
                          {item.title}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {item.features.map((feature, idx) => (
                            <span key={idx} className="bg-white/20 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/90 to-orange-500/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="text-2xl mb-2">🏠</div>
                      <div className="font-bold text-lg mb-2">Explore Properties</div>
                      <div className="text-sm opacity-90">Click to view all properties</div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action - Full Width */}
      <div className="text-center mt-2 md:mt-8 px-4 md:px-6 w-full">
        {/* <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-4 md:p-6 max-w-4xl mx-auto">
          <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 md:mb-3">
            Need Help Finding the Right Property?
          </h3>
          <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4">
            Our expert team can help you find the perfect property based on your possession timeline and requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 md:gap-3 justify-center">
            <button className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 md:px-6 py-2 md:py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              📞 Call Now
            </button>
            <button className="border-2 border-red-500 text-red-500 px-4 md:px-6 py-2 md:py-3 rounded-xl font-semibold hover:bg-red-500 hover:text-white transition-all duration-300">
              💬 Chat with Expert
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default PossessionProperty;
