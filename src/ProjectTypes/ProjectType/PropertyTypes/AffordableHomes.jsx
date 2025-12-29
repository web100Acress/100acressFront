import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Api_Service from "../../../Redux/utils/Api_Service";
import GlobalFilterTemplate from "../../../Components/GlobalFilterTemplate/GlobalFilterTemplate";
import { projectTypeConfigs } from "../../../ProjectTypes/config/pageConfigs";

const AffordableHomes = () => {
  console.log('AffordableHomes component rendering');
  const { getAllProjects } = Api_Service();
  const location = useLocation();
  
  const projectType = 'affordable homes';
  const config = projectTypeConfigs[projectType];
  
  // Get projects from Redux store - note: affordable data is in projectSlice, not allsectiondata
  const projects = useSelector(store => store?.project?.affordable);
  console.log('AffordableHomes - projects from Redux:', projects?.length || 0);
  
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    console.log('AffordableHomes useEffect - projects:', projects?.length || 0);
    if (projects && projects.length > 0) {
      console.log('Projects found in Redux, setting loading false');
      setIsLoading(false);
    } else {
      // Fetch projects if not in Redux
      console.log('No projects in Redux, fetching from API...');
      setIsLoading(true);
      getAllProjects(config?.query, 0)
        .then(() => {
          console.log('API call completed');
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('API Error:', error);
          setIsLoading(false);
        });
    }
  }, [projects, getAllProjects, config]);
  
  // Custom configuration using projectTypeConfigs
  const customConfig = {
    ...config,
    h1: 'Affordable Homes in Gurgaon',
    breadcrumbs: [
      { label: 'Home', path: '/' },
      { label: 'Affordable Homes in Gurgaon', path: location.pathname }
    ]
  };
  
  return (
    <GlobalFilterTemplate
      key={location.pathname}
      pageConfig={customConfig}
      projects={projects}
      isLoading={isLoading}
    />
  );
};

export default AffordableHomes;
