import React from 'react';

const AboutSection = ({
  title = "ABOUT US",
  description = [
    "This is a placeholder description for the project overview. Replace this text later with a concise summary covering the project's concept, lifestyle, and key value propositions.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  ],
  imageUrl = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1973&q=80"
}) => {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch min-h-[400px]">
        {/* Left Column - Text Content */}
        <div className="bg-black p-8 md:p-12 lg:p-16 relative overflow-hidden flex flex-col justify-center">
          {/* Abstract pattern overlay */}
          <div className="absolute inset-0 opacity-5">
            <svg className="w-full h-full" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 100L100 0L200 100L300 0L400 100V400H0V100Z" fill="white"/>
              <path d="M0 200L100 100L200 200L300 100L400 200V400H0V200Z" fill="white"/>
              <path d="M0 300L100 200L200 300L300 200L400 300V400H0V300Z" fill="white"/>
            </svg>
          </div>
          
          {/* Content */}
          <div className="relative z-10">
            <h2 className="text-orange-500 uppercase tracking-wide font-semibold text-xl mb-6">
              {title}
            </h2>
            
            {description.map((paragraph, index) => (
              <p 
                key={index} 
                className="text-white/90 text-base md:text-lg leading-relaxed mb-4"
              >
                {paragraph}
              </p>
            ))}
            
            <button className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-md transition-colors">
              View Details
            </button>
          </div>
        </div>
        
        {/* Right Column - Image */}
        <div className="relative overflow-hidden py-8 md:py-12 lg:py-16">
          <img 
            src={imageUrl} 
            alt="About us" 
            className="absolute inset-0 w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
