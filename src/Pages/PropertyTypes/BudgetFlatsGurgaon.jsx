import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Api_Service from "../../Redux/utils/Api_Service";
import GlobalFilterTemplate from "../../Components/GlobalFilterTemplate/GlobalFilterTemplate";
import { projectTypeConfigs } from "../../Components/GlobalFilterTemplate/config/pageConfigs";

const BudgetFlatsGurgaon = ({ budgetRange }) => {
  const { getAllProjects } = Api_Service();
  const location = useLocation();
  
  const projectType = 'residential-projects';
  const config = projectTypeConfigs[projectType];
  
  // Get projects from Redux store
  const projects = useSelector(store => store?.allsectiondata?.[config?.reduxKey]);
  
  const [isLoading, setIsLoading] = useState(true);
  const [filteredProjects, setFilteredProjects] = useState([]);
  
  // Budget ranges in crores
  const budgetRanges = {
    '1': { min: 0, max: 1 },
    '5': { min: 0, max: 5 },
    '10': { min: 0, max: 10 },
    '20': { min: 0, max: 20 }
  };
  
  useEffect(() => {
    // Filter projects by budget range
    if (projects && projects.length > 0) {
      const range = budgetRanges[budgetRange];
      const filtered = projects.filter(project => {
        if (project.price) {
          const price = parseFloat(project.price);
          return price >= range.min && price <= range.max;
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
  }, [projects, budgetRange, getAllProjects, config]);
  
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
  
  // Custom title and description based on budget range
  const customConfig = {
    ...config,
    title: `Flats For Sale under ${budgetRange} Cr in Gurgaon`,
    description: `Discover Premium Flats For Sale under ${budgetRange} Cr in Gurgaon – Your Gateway to Affordable Luxury Living and Prime Real Estate Investment.`,
    h1: `Flats For Sale under ${budgetRange} Cr in Gurgaon`,
    breadcrumbs: [
      { label: 'Home', path: '/' },
      { label: `Flats For Sale under ${budgetRange} Cr in Gurgaon`, path: location.pathname }
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

export default BudgetFlatsGurgaon;
