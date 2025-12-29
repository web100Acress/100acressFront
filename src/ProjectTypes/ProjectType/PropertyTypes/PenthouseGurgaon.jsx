import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Api_Service from "../../../Redux/utils/Api_Service";
import GlobalFilterTemplate from "../../../Components/GlobalFilterTemplate/GlobalFilterTemplate";
import { projectTypeConfigs } from "../../config/pageConfigs";

const PenthouseGurgaon = () => {
  const { getAllProjects } = Api_Service();
  const location = useLocation();
  
  const projectType = 'residential-projects';
  const config = projectTypeConfigs[projectType];
  
  // Get projects from Redux store
  const projects = useSelector(store => store?.allsectiondata?.[config?.reduxKey]);
  
  const [isLoading, setIsLoading] = useState(true);
  const [filteredProjects, setFilteredProjects] = useState([]);
  
  useEffect(() => {
    // Filter projects for penthouses
    if (projects && projects.length > 0) {
      const filtered = projects.filter(project => {
        if (project.projectName || project.title) {
          const name = (project.projectName || project.title).toLowerCase();
          return name.includes('penthouse');
        }
        if (project.type) {
          return project.type.toLowerCase().includes('penthouse');
        }
        return false;
      });
      setFilteredProjects(filtered);
      setIsLoading(false);
    } else {
      // Fetch projects if not in Redux
      setIsLoading(true);
      getAllProjects(config?.query, 0)
        .then(() => {
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('API Error:', error);
          setIsLoading(false);
        });
    }
  }, [projects, getAllProjects, config]);
  
  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h1>
          <p className="text-gray-600">The requested page does not exist.</p>
        </div>
      </div>
    );
  }
  
  // Custom configuration for penthouses
  const customConfig = {
    ...config,
    title: 'Penthouse in Gurgaon',
    description: 'Discover Premium Penthouses in Gurgaon – Your Gateway to Ultra-Luxury Living and Prime Real Estate Investment.',
    h1: 'Penthouse in Gurgaon',
    breadcrumbs: [
      { label: 'Home', path: '/' },
      { label: 'Penthouse in Gurgaon', path: location.pathname }
    ]
  };
  
  return (
    <GlobalFilterTemplate
      key={location.pathname}
      config={customConfig}
      projects={filteredProjects.length > 0 ? filteredProjects : projects}
      isLoading={isLoading}
    />
  );
};

export default PenthouseGurgaon;
