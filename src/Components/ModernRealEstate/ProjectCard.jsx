import React from 'react';
import { MdFavorite, MdFavoriteBorder, MdShare, MdLocationOn, MdAttachMoney } from 'react-icons/md';

const ProjectCard = ({
  project,
  onFavorite,
  onShare,
  onSelect,
  isSelected = false,
  isFavorited = false,
  viewMode = 'grid'
}) => {
  const formatPrice = (price) => {
    if (!price) return 'Contact for Price';
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(0)} L`;
    }
    return `₹${price.toLocaleString()}`;
  };

  const getPropertyTypeColor = (type) => {
    const colors = {
      'Residential': 'bg-blue-100 text-blue-800',
      'Commercial': 'bg-green-100 text-green-800',
      'SCO Plots': 'bg-purple-100 text-purple-800',
      'Luxury Villas': 'bg-orange-100 text-orange-800',
      'Independent Floors': 'bg-pink-100 text-pink-800',
      'Plots': 'bg-indigo-100 text-indigo-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const projectUrl = project.project_url ? `/${project.project_url}/` : "#";
  const imageUrl = project.thumbnailImage?.url || project.frontImage?.cdn_url || project.frontImage?.url || "https://d16gdc5rm7f21b.cloudfront.net/100acre/no-image.jpg";
  const location = (project.city && project.state) ? `${project.city}, ${project.state}` : "Gurugram, Haryana";

  if (viewMode === 'list') {
    return (
      <div 
        className={`bg-white rounded-lg sm:rounded-xl border-2 transition-all duration-300 hover:shadow-lg cursor-pointer ${
          isSelected ? 'border-red-500 shadow-lg' : 'border-gray-200 hover:border-red-300'
        }`}
        onClick={() => onSelect(project)}
      >
        <div className="flex flex-col sm:flex-row">
          {/* Image */}
          <div className="w-full sm:w-48 h-48 sm:h-32 flex-shrink-0">
            <img
              src={imageUrl}
              alt={project.projectName}
              className="w-full h-full object-cover rounded-t-lg sm:rounded-l-xl sm:rounded-t-none"
              loading="lazy"
              decoding="async"
            />
          </div>
          
          {/* Content */}
          <div className="flex-1 p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                {project.projectName}
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onFavorite(project);
                  }}
                  className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                >
                  {isFavorited ? <MdFavorite className="text-red-500" size={20} /> : <MdFavoriteBorder size={20} />}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onShare(project);
                  }}
                  className="p-1 text-gray-400 hover:text-blue-500 transition-colors"
                >
                  <MdShare size={18} />
                </button>
              </div>
            </div>
            
            <div className="flex items-center text-gray-600 mb-2">
              <MdLocationOn size={16} className="mr-1" />
              <span className="text-sm">{location}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center text-green-600 font-semibold">
                <MdAttachMoney size={18} />
                <span>{formatPrice(project.minPrice)}</span>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPropertyTypeColor(project.type)}`}>
                {project.type || 'Residential'}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`bg-white rounded-lg sm:rounded-xl border-2 transition-all duration-300 hover:shadow-lg cursor-pointer group ${
        isSelected ? 'border-red-500 shadow-lg' : 'border-gray-200 hover:border-red-300'
      }`}
      onClick={() => onSelect(project)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden rounded-t-lg sm:rounded-t-xl">
        <img
          src={imageUrl}
          alt={project.projectName}
          className="w-full h-40 sm:h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
        
        {/* Overlay Actions */}
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onFavorite(project);
            }}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
          >
            {isFavorited ? <MdFavorite className="text-red-500" size={18} /> : <MdFavoriteBorder size={18} />}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onShare(project);
            }}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
          >
            <MdShare size={16} />
          </button>
        </div>

        {/* Property Type Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPropertyTypeColor(project.type)}`}>
            {project.type || 'Residential'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
          {project.projectName}
        </h3>
        
        <div className="flex items-center text-gray-600 mb-2 sm:mb-3">
          <MdLocationOn size={14} className="mr-1 flex-shrink-0" />
          <span className="text-xs sm:text-sm truncate">{location}</span>
        </div>
        
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className="flex items-center text-green-600 font-semibold">
            <MdAttachMoney size={16} />
            <span className="text-base sm:text-lg">{formatPrice(project.minPrice)}</span>
          </div>
          {project.rating && (
            <div className="flex items-center text-yellow-500">
              <span className="text-xs sm:text-sm font-medium">★ {project.rating}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              window.open(projectUrl, '_blank');
            }}
            className="flex-1 bg-red-600 text-white py-2 px-3 sm:px-4 rounded-lg font-medium hover:bg-red-700 transition-colors text-center text-sm sm:text-base"
          >
            View Details
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(project);
            }}
            className="px-3 sm:px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm sm:text-base"
          >
            Quick View
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
