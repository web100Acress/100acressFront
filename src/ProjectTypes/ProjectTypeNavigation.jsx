import React from "react";
import { Link } from "react-router-dom";
import { projectTypeRoutes } from "./ProjectType/routes";

const ProjectTypeNavigation = () => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Explore Project Types
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(projectTypeRoutes).map(([type, config]) => (
          <Link
            key={type}
            to={config.path}
            className="group bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-200 hover:border-red-300"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                <span className="text-white text-lg">
                  {type === 'sco-plots' && '🏢'}
                  {type === 'luxury-villas' && '🏰'}
                  {type === 'plots-in-gurugram' && '🏘️'}
                  {type === 'residential-projects' && '🏠'}
                  {type === 'independent-floors' && '🏢'}
                  {type === 'commercial-projects' && '🏬'}
                  {type === 'senior-living' && '👴'}
                </span>
              </div>
              <h3 className="font-semibold text-gray-900 group-hover:text-red-600 transition-colors">
                {config.title}
              </h3>
            </div>
            
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              {config.description}
            </p>
            
            <div className="flex items-center text-red-600 text-sm font-medium group-hover:text-red-700">
              <span>Explore Projects</span>
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProjectTypeNavigation;
