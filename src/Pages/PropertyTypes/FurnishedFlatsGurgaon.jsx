import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Api_Service from "../../Redux/utils/Api_Service";
import GlobalFilterTemplate from "../../Components/GlobalFilterTemplate/GlobalFilterTemplate";
import { projectTypeConfigs } from "../../Components/GlobalFilterTemplate/config/pageConfigs";

const FurnishedFlatsGurgaon = ({ furnishingType }) => {
  const { getAllProjects } = Api_Service();
  const location = useLocation();
  
  const projectType = 'residential-projects';
  const config = projectTypeConfigs[projectType];
  
  // Get projects from Redux store
  const projects = useSelector(store => store?.allsectiondata?.[config?.reduxKey]);
  
  const [isLoading, setIsLoading] = useState(true);
  const [filteredProjects, setFilteredProjects] = useState([]);
  
  useEffect(() => {
    // Filter projects by furnishing type
    if (projects && projects.length > 0) {
      const filtered = projects.filter(project => {
        if (project.furnishing) {
          const furnishing = project.furnishing.toLowerCase();
          return furnishing.includes(furnishingType.toLowerCase());
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
  }, [projects, furnishingType, getAllProjects, config]);
  
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
  
  // Custom title and description based on furnishing type
  const customConfig = {
    ...config,
    title: `${furnishingType} Flats in Gurgaon`,
    description: `Discover Premium ${furnishingType} Flats in Gurgaon – Your Gateway to Comfortable Living and Prime Real Estate Investment.`,
    h1: `${furnishingType} Flats in Gurgaon`,
    breadcrumbs: [
      { label: 'Home', path: '/' },
      { label: `${furnishingType} Flats in Gurgaon`, path: location.pathname }
    ]
  };
  
  return (
    <GlobalFilterTemplate
      key={location.pathname}
      pageType="type"
      config={customConfig}
      projects={filteredProjects.length > 0 ? filteredProjects : projects}
      isLoading={isLoading}
    />
  );
};

export default FurnishedFlatsGurgaon;
