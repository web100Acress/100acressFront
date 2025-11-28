import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Api_Service from "../../Redux/utils/Api_Service";
import GlobalFilterTemplate from "../../Components/GlobalFilterTemplate/GlobalFilterTemplate";
import { projectTypeConfigs } from "../../Components/GlobalFilterTemplate/config/pageConfigs";

const BuilderFloorGurgaon = () => {
  const { getAllProjects } = Api_Service();
  const location = useLocation();
  
  const projectType = 'independent-floors';
  const config = projectTypeConfigs[projectType];
  
  // Get projects from Redux store
  const projects = useSelector(store => store?.allsectiondata?.[config?.reduxKey]);
  
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (projects && projects.length > 0) {
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
  
  // Custom configuration
  const customConfig = {
    ...config,
    title: 'Builder Floor in Gurgaon',
    description: 'Discover Premium Builder Floors in Gurgaon – Your Gateway to Spacious Living and Prime Real Estate Investment.',
    h1: 'Builder Floor in Gurgaon',
    breadcrumbs: [
      { label: 'Home', path: '/' },
      { label: 'Builder Floor in Gurgaon', path: location.pathname }
    ]
  };
  
  return (
    <GlobalFilterTemplate
      key={location.pathname}
      pageType="type"
      config={customConfig}
      projects={projects}
      isLoading={isLoading}
    />
  );
};

export default BuilderFloorGurgaon;
