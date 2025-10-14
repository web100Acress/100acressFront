import React from 'react';
import { useState, useEffect } from 'react';

const LoadingSpinner = ({ message = "Finding your perfect property..." }) => {
  const [currentMessage, setCurrentMessage] = useState(0);
  
  const propertyMessages = [
    "Finding your perfect property...",
    "Searching prime locations...",
    "Analyzing market trends...",
    "Loading property details...",
    "Preparing your results..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % propertyMessages.length);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-red-50 flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-100 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-orange-100 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-gray-100 rounded-full opacity-20 animate-pulse delay-500"></div>
      </div>
      
      <div className="relative z-10 text-center">
        {/* Main Logo/Icon Container */}
        <div className="relative mb-8">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-red-500 to-red-600 rounded-2xl shadow-xl flex items-center justify-center mb-4 animate-bounce">
            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
          </div>
          
          {/* Rotating Ring */}
          <div className="absolute inset-0 w-24 h-24 mx-auto">
            <div className="w-full h-full border-4 border-red-200 rounded-full animate-spin border-t-red-500"></div>
          </div>
          
          {/* Pulsing Outer Ring */}
          <div className="absolute inset-0 w-32 h-32 mx-auto -m-4">
            <div className="w-full h-full border-2 border-red-300 rounded-full animate-ping opacity-75"></div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            100acress
          </h2>
          
          <div className="h-6 flex items-center justify-center">
            <p className="text-lg text-gray-600 font-medium transition-all duration-500 ease-in-out">
              {propertyMessages[currentMessage]}
            </p>
          </div>
          
          {/* Progress Bar */}
          <div className="w-64 mx-auto bg-gray-200 rounded-full h-2 overflow-hidden">
            <div className="bg-gradient-to-r from-red-500 to-red-600 h-full rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Property Icons Animation */}
        <div className="flex justify-center space-x-4 mt-8">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`w-3 h-3 bg-gradient-to-r from-red-500 to-red-600 rounded-full animate-bounce`}
              style={{ animationDelay: `${i * 0.2}s` }}
            ></div>
          ))}
        </div>

        {/* Floating Elements */}
        <div className="absolute top-8 left-8 opacity-60">
          <div className="w-8 h-8 bg-red-400 rounded-lg animate-float">
            <svg className="w-full h-full text-white p-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7v10c0 5.55 3.84 10 9 11 1.84-.36 3.5-1.04 4.5-2.5V7l-8-5z"/>
            </svg>
          </div>
        </div>
        
        <div className="absolute top-16 right-12 opacity-60">
          <div className="w-6 h-6 bg-orange-400 rounded-full animate-float" style={{ animationDelay: '1s' }}>
            <svg className="w-full h-full text-white p-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
        </div>
        
        <div className="absolute bottom-16 left-16 opacity-60">
          <div className="w-7 h-7 bg-red-300 rounded-lg animate-float" style={{ animationDelay: '2s' }}>
            <svg className="w-full h-full text-white p-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
            </svg>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;