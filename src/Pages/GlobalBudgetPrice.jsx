import React, { useEffect, useState, startTransition } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Api_Service from "../Redux/utils/Api_Service";
import GlobalFilterTemplate from "../Components/GlobalFilterTemplate/GlobalFilterTemplate";
import Footer from "../Components/Actual_Components/Footer";

const GlobalBudgetPrice = () => {
  const { getAllProjects } = Api_Service();
  const location = useLocation();

  // Get all projects from Redux store
  const upcomingProjects = useSelector(store => store?.allsectiondata?.allupcomingproject || []);
  const underConstructionProjects = useSelector(store => store?.allsectiondata?.underconstruction || []);
  const readyToMoveProjects = useSelector(store => store?.allsectiondata?.readytomove || []);
  const newLaunchProjects = useSelector(store => store?.allsectiondata?.newlaunch || []);

  // Combine all projects for budget filtering
  const allProjects = [
    ...upcomingProjects,
    ...underConstructionProjects,
    ...readyToMoveProjects,
    ...newLaunchProjects
  ];

  const [isLoading, setIsLoading] = useState(true);
  const [filteredProjects, setFilteredProjects] = useState([]);

  // Helper function to extract budget range from URL
  const getBudgetRangeFromPath = (path) => {
    if (path.includes('under-1-cr')) return 'under1cr';
    if (path.includes('1-5-cr')) return '1to5cr';
    if (path.includes('5-10-cr')) return '5to10cr';
    if (path.includes('10-20-cr')) return '10to20cr';
    if (path.includes('20-50-cr')) return '20to50cr';
    if (path.includes('above-50-cr')) return 'above50cr';
    return 'under1cr'; // default
  };

  // Filter projects by budget range
  const filterProjectsByBudget = (projects, budgetRange) => {
    if (!projects || projects.length === 0) return [];

    return projects.filter(project => {
      const minPrice = parseFloat(project.minPrice) || 0;
      const maxPrice = parseFloat(project.maxPrice) || minPrice;

      switch (budgetRange) {
        case 'under1cr':
          return minPrice < 1;
        case '1to5cr':
          return minPrice >= 1 && minPrice <= 5;
        case '5to10cr':
          return minPrice >= 5 && minPrice <= 10;
        case '10to20cr':
          return minPrice >= 10 && minPrice <= 20;
        case '20to50cr':
          return minPrice >= 20 && minPrice <= 50;
        case 'above50cr':
          return minPrice >= 50;
        default:
          return true;
      }
    });
  };

  // Fetch projects on component mount
  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      try {
        // Fetch all types of projects for budget page
        await getAllProjects("allupcomingproject", 0);
        await getAllProjects("underconstruction", 0);
        await getAllProjects("readytomove", 0);
        await getAllProjects("newlaunch", 0);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (allProjects.length === 0) {
      fetchProjects();
    } else {
      setIsLoading(false);
    }
  }, []);

  // Force component re-render when URL changes by updating key
  const [componentKey, setComponentKey] = useState(0);

  useEffect(() => {
    // Force component re-render when URL changes
    setComponentKey(prev => prev + 1);
  }, [location.pathname]);

  useEffect(() => {
    console.log('🔍 Budget page - allProjects updated:', allProjects.length);
    console.log('🔍 Budget page - location changed:', location.pathname);
    console.log('🔍 Budget page - sample project:', allProjects[0]);

    // Get current budget range from URL
    const currentBudgetRange = getBudgetRangeFromPath(location.pathname);
    console.log('🔍 Budget page - current budget range:', currentBudgetRange);

    const filtered = filterProjectsByBudget(allProjects, currentBudgetRange);
    console.log('🔍 Budget page - filtered projects:', filtered.length);
    console.log('🔍 Budget page - sample filtered project:', filtered[0]);
    
    // Use startTransition for smooth state updates
    startTransition(() => {
      setFilteredProjects(filtered);
      
      // Reset loading state when URL changes
      if (allProjects.length > 0) {
        setIsLoading(false);
      }
    });
  }, [allProjects, location.pathname, location.search, componentKey]);

  return (
    <>
      <GlobalFilterTemplate
        key={`${location.pathname}-${componentKey}`} // Force re-render when route changes
        pageType="budget"
        pageConfig={{ budgetRange: getBudgetRangeFromPath(location.pathname) }}
        projects={filteredProjects}
        isLoading={isLoading}
      />
      <Footer />
    </>
  );
};

export default GlobalBudgetPrice;