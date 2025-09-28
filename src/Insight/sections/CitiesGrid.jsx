import React, { useState } from 'react';
import { MapPin, Building2, TrendingUp, ArrowRight, Star, Crown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CitiesGrid = () => {
  const [hoveredCity, setHoveredCity] = useState(null);
  const navigate = useNavigate();
  
  const cities = [
    { 
      name: 'Gurugram', 
      props: 285, 
      img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80',
      trend: '+18%',
      avgPrice: '₹1.2Cr',
      description: 'Millennium City - Corporate Capital',
      featured: true,
      rating: 4.8,
      type: 'Premium'
    },
    { 
      name: 'Delhi', 
      props: 420, 
      img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=2000&q=80',
      trend: '+12%',
      avgPrice: '₹2.1Cr',
      description: 'Heart of India - Heritage Luxury',
      rating: 4.9,
      type: 'Ultra Luxury'
    },
    { 
      name: 'Noida', 
      props: 320, 
      img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=80',
      trend: '+22%',
      avgPrice: '₹85L',
      description: 'Planned Paradise - Tech Hub',
      rating: 4.7,
      type: 'Modern'
    },
    { 
      name: 'Mumbai', 
      props: 180, 
      img: 'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?auto=format&fit=crop&w=2000&q=80',
      trend: '+25%',
      avgPrice: '₹65L',
      description: 'Future City - Smart Living',
      rating: 4.6,
      type: 'Emerging'
    },
    { 
      name: 'Pushkar', 
      props: 150, 
      img: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=2000&q=80',
      trend: '+15%',
      avgPrice: '₹72L',
      description: 'Industrial Excellence',
      rating: 4.5,
      type: 'Value'
    }
  ];
  const handleImageError = (e) => {
    e.currentTarget.src = 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=2000&q=80';
  };

  const handleCityClick = (cityName) => {
    // Convert city name to URL-friendly format
    const citySlug = cityName.toLowerCase().replace(/\s+/g, '-');
    navigate(`/projects/cities/${citySlug}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br via-white to-blue-50">
      {/* Desktop Layout with Sidebar Space */}
      <div className="md:ml-[260px] flex justify-center">
        <div className="w-full max-w-8xl px-6 lg:px-12">
          {/* Luxury Header */}
          <div className="text-center">
            {/* <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 rounded-full text-sm font-semibold mb-6 shadow-sm">
              <Crown className="w-4 h-4 mr-2" />
              Exclusive Prime Locations
            </div> */}
            <h1 className="text-4xl lg:text-6xl font-light text-slate-900 tracking-tight">
              Discover Your
              <span className="block font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                Dream Destination
              </span>
            </h1>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light">
              Explore India's most prestigious residential destinations where luxury meets lifestyle, and every property tells a story of excellence.
            </p>
          </div>

        {/* Luxury Grid Layout - Right section moved */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 mb-0">

          {/* Premium Cities Column - Now on the left */}
          <div className="lg:col-span-4 lg:order-1 space-y-1">
            {cities.slice(1, 3).map((city, index) => (
              <div
                key={city.name}
                className="group relative rounded-2xl overflow-hidden cursor-pointer h-64"
                onMouseEnter={() => setHoveredCity(index + 1)}
                onMouseLeave={() => setHoveredCity(null)}
                onClick={() => handleCityClick(city.name)}
              >
                <img
                  src={city.img}
                  alt={city.name}
                  onError={handleImageError}
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20"></div>

                {/* Type Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                    city.type === 'Ultra Luxury' ? 'bg-gradient-to-r from-purple-600 to-pink-600' :
                    city.type === 'Modern' ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
                    'bg-gradient-to-r from-gray-600 to-gray-800'
                  } text-white shadow-lg`}>
                    {city.type}
                  </span>
                </div>

                {/* Rating */}
                <div className="absolute top-4 right-4">
                  <div className="flex items-center px-2 py-1 bg-white/20 backdrop-blur-sm rounded-lg text-white text-xs">
                    <Star className="w-3 h-3 mr-1 fill-current text-yellow-400" />
                    {city.rating}
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="px-3 py-1 bg-emerald-500/80 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
                      {city.trend}
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-1 drop-shadow-lg">{city.name}</h3>
                  <p className="text-white/80 text-sm mb-3 font-light">{city.description}</p>

                  <div className="flex items-center justify-between text-white/70 text-sm">
                    <span className="flex items-center space-x-1">
                      <Building2 className="w-4 h-4" />
                      <span>{city.props}+</span>
                    </span>
                    <span className="font-semibold">{city.avgPrice}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Hero Featured City - Gurugram - Now on the right */}
          <div
            className="lg:col-span-8 lg:order-2 lg:row-span-2 group relative rounded-3xl overflow-hidden cursor-pointer"
            onMouseEnter={() => setHoveredCity(0)}
            onMouseLeave={() => setHoveredCity(null)}
            onClick={() => handleCityClick(cities[0].name)}
          >
            <div className="relative h-96 lg:h-full">
              <img
                src={cities[0].img}
                alt={cities[0].name}
                onError={handleImageError}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
              />

              {/* Luxury Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

              {/* Premium Badge */}
              <div className="absolute top-6 left-6">
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-sm font-bold rounded-full shadow-lg">
                  <Star className="w-4 h-4 mr-1 fill-current" />
                  {cities[0].type}
                </div>
              </div>

              {/* Rating */}
              <div className="absolute top-6 right-6">
                <div className="flex items-center px-3 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white">
                  <Star className="w-4 h-4 mr-1 fill-current text-yellow-400" />
                  <span className="text-sm font-semibold">{cities[0].rating}</span>
                </div>
              </div>

              {/* Content */}
              <div className="absolute bottom-8 left-8 right-8">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="px-4 py-2 bg-emerald-500/90 backdrop-blur-sm text-white text-sm font-bold rounded-full">
                    {cities[0].trend} Growth
                  </div>
                  <div className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm rounded-full">
                    Hot Market
                  </div>
                </div>

                <h2 className="text-5xl lg:text-6xl font-bold text-white mb-3 drop-shadow-2xl tracking-tight">{cities[0].name}</h2>
                <p className="text-white/90 text-xl mb-6 font-light">{cities[0].description}</p>

                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-6 text-white/80">
                      <div className="flex items-center space-x-2">
                        <Building2 className="w-5 h-5" />
                        <span className="text-lg">{cities[0].props}+ Properties</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-5 h-5" />
                        <span className="text-lg">From {cities[0].avgPrice}</span>
                      </div>
                    </div>
                  </div>

                  <div className="opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <ArrowRight className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Premium Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mb-4 mt-2">
          {cities.slice(3, 5).map((city, index) => (
            <div 
              key={city.name}
              className="group relative rounded-2xl overflow-hidden cursor-pointer h-80"
              onMouseEnter={() => setHoveredCity(index + 3)}
              onMouseLeave={() => setHoveredCity(null)}
              onClick={() => handleCityClick(city.name)}
            >
              <img 
                src={city.img} 
                alt={city.name}
                onError={handleImageError}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110" 
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              
              {/* Badges */}
              <div className="absolute top-5 left-5">
                <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                  city.type === 'Emerging' ? 'bg-gradient-to-r from-green-500 to-emerald-600' :
                  'bg-gradient-to-r from-orange-500 to-red-500'
                } text-white shadow-lg`}>
                  {city.type}
                </span>
              </div>

              <div className="absolute top-5 right-5">
                <div className="flex items-center px-2 py-1 bg-white/20 backdrop-blur-sm rounded-lg text-white text-xs">
                  <Star className="w-3 h-3 mr-1 fill-current text-yellow-400" />
                  {city.rating}
                </div>
              </div>
              
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center space-x-2 mb-3">
                  <span className="px-3 py-1 bg-emerald-500/80 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
                    {city.trend} Growth
                  </span>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-2">{city.name}</h3>
                <p className="text-white/80 text-sm mb-4 font-light">{city.description}</p>
                
                <div className="flex items-center justify-between text-white/70 text-sm">
                  <span className="flex items-center space-x-1">
                    <Building2 className="w-4 h-4" />
                    <span>{city.props}+ Properties</span>
                  </span>
                  <span className="font-semibold text-lg">{city.avgPrice}</span>
                </div>
              </div>
            </div>
          ))}

          {/* Explore More Luxury Card */}
          <div className="group relative rounded-2xl bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 cursor-pointer h-80 flex flex-col items-center justify-center text-white p-4"
               onClick={() => navigate('/projects/cities/')}>
            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-3 group-hover:bg-white/20 transition-all duration-300">
              <MapPin className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-semibold mb-2 text-center">Explore More</h3>
            <p className="text-white/80 text-center mb-3 font-light">
              Discover luxury properties in 50+ premium locations across India
            </p>
            <div className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium group-hover:bg-white/20 transition-all duration-300 border border-white/20">
              View All Cities
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default CitiesGrid;