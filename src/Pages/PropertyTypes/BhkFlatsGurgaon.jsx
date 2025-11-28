import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Api_Service from "../../Redux/utils/Api_Service";
import GlobalFilterTemplate from "../../Components/GlobalFilterTemplate/GlobalFilterTemplate";
import { projectTypeConfigs } from "../../Components/GlobalFilterTemplate/config/pageConfigs";

const BhkFlatsGurgaon = ({ bhkType }) => {
  const { getAllProjects } = Api_Service();
  const location = useLocation();
  
  // Map BHK type to configuration
  const getConfigForBhk = () => {
    const bhkMap = {
      '1': 'residential-projects',
      '2': 'residential-projects',
      '3': 'residential-projects',
      '4': 'residential-projects',
      '5': 'residential-projects'
    };
    return bhkMap[bhkType] || 'residential-projects';
  };
  
  const projectType = getConfigForBhk();
  const config = projectTypeConfigs[projectType];
  
  // Get projects from Redux store
  const projects = useSelector(store => store?.allsectiondata?.[config?.reduxKey]);
  
  const [isLoading, setIsLoading] = useState(true);
  const [filteredProjects, setFilteredProjects] = useState([]);
  
  useEffect(() => {
    // Filter projects by BHK type
    if (projects && projects.length > 0) {
      const filtered = projects.filter(project => {
        // Check if project has BHK information
        if (project.bhk) {
          return project.bhk.toString() === bhkType;
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
  }, [projects, bhkType, getAllProjects, config]);
  
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
  
  // Custom title and description based on BHK type
  const customConfig = {
    ...config,
    title: `${bhkType} BHK Flats in Gurgaon`,
    description: `Discover Premium ${bhkType} BHK Flats in Gurgaon – Your Gateway to Luxury Living and Prime Real Estate Investment.`,
    h1: `${bhkType} BHK Flats in Gurgaon`,
    breadcrumbs: [
      { label: 'Home', path: '/' },
      { label: `${bhkType} BHK Flats in Gurgaon`, path: location.pathname }
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

export default BhkFlatsGurgaon;
