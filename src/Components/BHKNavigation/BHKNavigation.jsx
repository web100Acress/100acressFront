import React from 'react';
import { Link } from 'react-router-dom';
import { MdBedroomParent, MdHome, MdFamilyRestroom, MdKingBed, MdVilla } from 'react-icons/md';

const BHKNavigation = () => {
  const bhkOptions = [
    {
      type: '1',
      title: '1 BHK Flats',
      description: 'Perfect for bachelors & small families',
      icon: MdBedroomParent,
      path: '/1-bhk-flats-in-gurgaon/',
      color: 'from-blue-500 to-blue-600'
    },
    {
      type: '2',
      title: '2 BHK Flats',
      description: 'Ideal for small families',
      icon: MdFamilyRestroom,
      path: '/2-bhk-flats-in-gurgaon/',
      color: 'from-green-500 to-green-600'
    },
    {
      type: '3',
      title: '3 BHK Flats',
      description: 'Perfect for growing families',
      icon: MdHome,
      path: '/3-bhk-flats-in-gurgaon/',
      color: 'from-purple-500 to-purple-600'
    },
    {
      type: '4',
      title: '4 BHK Flats',
      description: 'Spacious luxury living',
      icon: MdKingBed,
      path: '/4-bhk-flats-in-gurgaon/',
      color: 'from-orange-500 to-orange-600'
    },
    {
      type: '5',
      title: '5 BHK Flats',
      description: 'Ultra-luxury spaces',
      icon: MdVilla,
      path: '/5-bhk-flats-in-gurgaon/',
      color: 'from-red-500 to-red-600'
    }
  ];

  return (
    <div className="bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Explore Properties by BHK Configuration
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Find your perfect home with our comprehensive BHK-wise property listings. 
            From cozy 1 BHK apartments to luxurious 5 BHK homes, discover options that match your lifestyle and budget.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {bhkOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <Link
                key={option.type}
                to={option.path}
                className="group relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${option.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                
                <div className="relative p-6 text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${option.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-gray-900 group-hover:to-gray-700 transition-all duration-300">
                    {option.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-4">
                    {option.description}
                  </p>
                  
                  <div className="flex items-center justify-center text-sm font-medium text-blue-600 group-hover:text-blue-700">
                    <span>Explore Properties</span>
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span>Budget-friendly</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span>Family-friendly</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
              <span>Luxury Living</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
              <span>Premium Spaces</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
              <span>Ultra-Luxury</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BHKNavigation;
