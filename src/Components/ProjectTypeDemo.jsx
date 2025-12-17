import React from "react";
import { Link } from "react-router-dom";

const ProjectTypeDemo = () => {
  const projectTypes = [
    {
      type: "sco-plots",
      path: "/sco/plots/",
      title: "SCO Plots in Gurugram",
      description: "Shop-Cum-Office plots for business investment",
      icon: "🏢",
      color: "from-blue-500 to-blue-600"
    },
    {
      type: "luxury-villas",
      path: "/projects/villas/", 
      title: "Luxury Villas for Sale",
      description: "Premium villas across India",
      icon: "🏰",
      color: "from-purple-500 to-purple-600"
    },
    {
      type: "plots-in-gurugram",
      path: "/plots-in-gurugram/",
      title: "Plots in Gurugram", 
      description: "Residential and commercial plots",
      icon: "🏘️",
      color: "from-green-500 to-green-600"
    },
    {
      type: "residential-projects",
      path: "/property/residential/",
      title: "Residential Property",
      description: "Apartments and homes",
      icon: "🏠", 
      color: "from-red-500 to-red-600"
    },
    {
      type: "independent-floors",
      path: "/projects/independent-floors/",
      title: "Independent & Builder Floors",
      description: "Independent living spaces",
      icon: "🏢",
      color: "from-orange-500 to-orange-600"
    },
    {
      type: "commercial-projects",
      path: "/projects/commercial/",
      title: "Commercial Projects", 
      description: "Office and retail spaces",
      icon: "🏬",
      color: "from-indigo-500 to-indigo-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Project Type Pages - Refactored
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            All project type pages now use a single template instead of 6 separate files. 
            Click on any project type below to see the new dynamic route in action.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectTypes.map((project) => (
            <Link
              key={project.type}
              to={project.path}
              className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-200 hover:border-gray-300 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-16 h-16 bg-gradient-to-br ${project.color} rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300`}>
                    <span className="text-3xl">{project.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {project.description}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">
                    Route: {project.path}
                  </span>
                  <div className="flex items-center text-blue-600 group-hover:text-blue-700">
                    <span className="text-sm font-medium">View</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            What's New?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">✓</span>
                Single Template
              </h3>
              <p className="text-gray-600 text-sm">
                One ProjectTypeTemplate.jsx handles all 6 project types instead of separate files.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">✓</span>
                Dynamic Routes
              </h3>
              <p className="text-gray-600 text-sm">
                /project-type/[type] captures the project type from URL parameters.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">✓</span>
                SEO Optimized
              </h3>
              <p className="text-gray-600 text-sm">
                Dynamic meta tags, structured data, and canonical URLs for each type.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">✓</span>
                Consistent Design
              </h3>
              <p className="text-gray-600 text-sm">
                All pages have the same look and feel with modern UI components.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectTypeDemo;
