import React from 'react';
import { MdLocationOn, MdAttachMoney, MdPhone, MdEmail, MdShare, MdFavorite, MdFavoriteBorder } from 'react-icons/md';

const ProjectDetails = ({ project, onClose, onFavorite, onShare, isFavorited = false }) => {
  if (!project) return null;

  const formatPrice = (price) => {
    if (!price) return 'Contact for Price';
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(0)} L`;
    }
    return `₹${price.toLocaleString()}`;
  };

  const projectUrl = project.project_url ? `/${project.project_url}/` : "#";
  const imageUrl = project.frontImage?.cdn_url || project.frontImage?.url || "https://d16gdc5rm7f21b.cloudfront.net/100acre/no-image.jpg";
  const location = (project.city && project.state) ? `${project.city}, ${project.state}` : "Gurugram, Haryana";

  return (
    <div className="w-full lg:w-96 xl:w-[28rem] bg-white border-l border-gray-200 h-full overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Project Details</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Main Image */}
      <div className="relative">
        <img
          src={imageUrl}
          alt={project.projectName}
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={() => onFavorite(project)}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
          >
            {isFavorited ? <MdFavorite className="text-red-500" size={20} /> : <MdFavoriteBorder size={20} />}
          </button>
          <button
            onClick={() => onShare(project)}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
          >
            <MdShare size={18} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title and Price */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{project.projectName}</h1>
          <div className="flex items-center text-gray-600 mb-3">
            <MdLocationOn size={18} className="mr-2" />
            <span>{location}</span>
          </div>
          <div className="flex items-center text-green-600 font-bold text-xl">
            <MdAttachMoney size={24} />
            <span>{formatPrice(project.minPrice)}</span>
          </div>
        </div>

        {/* Property Details */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Property Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-sm text-gray-600">Property Type</div>
              <div className="font-medium text-gray-900">{project.type || 'Residential'}</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-sm text-gray-600">Status</div>
              <div className="font-medium text-gray-900">{project.projectStatus || 'Under Construction'}</div>
            </div>
            {project.bedrooms && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm text-gray-600">Bedrooms</div>
                <div className="font-medium text-gray-900">{project.bedrooms}</div>
              </div>
            )}
            {project.bathrooms && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm text-gray-600">Bathrooms</div>
                <div className="font-medium text-gray-900">{project.bathrooms}</div>
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        {project.description && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
            <p className="text-gray-700 text-sm leading-relaxed">{project.description}</p>
          </div>
        )}

        {/* Amenities */}
        {project.amenities && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Amenities</h3>
            <div className="flex flex-wrap gap-2">
              {project.amenities.slice(0, 6).map((amenity, index) => (
                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {amenity}
                </span>
              ))}
              {project.amenities.length > 6 && (
                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                  +{project.amenities.length - 6} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Map */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Location</h3>
          <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <MdLocationOn size={32} className="mx-auto mb-2" />
              <p className="text-sm">Map view would be integrated here</p>
              <p className="text-xs text-gray-400">{location}</p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact Information</h3>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <MdPhone size={18} className="text-gray-600 mr-3" />
              <div>
                <div className="text-sm text-gray-600">Phone</div>
                <div className="font-medium text-gray-900">+91 85009 00100</div>
              </div>
            </div>
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <MdEmail size={18} className="text-gray-600 mr-3" />
              <div>
                <div className="text-sm text-gray-600">Email</div>
                <div className="font-medium text-gray-900">info@100acress.com</div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => window.open(projectUrl, '_blank')}
            className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-700 transition-colors"
          >
            View Full Details
          </button>
          <button
            onClick={() => window.open(`https://wa.me/918500900100?text=${encodeURIComponent(`Hi, I'm interested in ${project.projectName}. Can you provide more details?`)}`, '_blank')}
            className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            WhatsApp Inquiry
          </button>
          <button
            onClick={() => window.open('tel:+918500900100')}
            className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Call Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;






