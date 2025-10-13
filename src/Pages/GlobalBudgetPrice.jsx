import React, { useEffect, useState } from "react";
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

  // Extract budget range from URL
  const getBudgetRange = () => {
    const path = location.pathname;
    if (path.includes('under-1-cr')) return 'under1cr';
    if (path.includes('1-5-cr')) return '1to5cr';
    if (path.includes('5-10-cr')) return '5to10cr';
    if (path.includes('10-20-cr')) return '10to20cr';
    if (path.includes('20-50-cr')) return '20to50cr';
    if (path.includes('above-50-cr')) return 'above50cr';
    return 'under1cr'; // default
  };

  const budgetRange = getBudgetRange();

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

  useEffect(() => {
    console.log('Budget page - allProjects updated:', allProjects.length);

    // Calculate budget range dynamically based on current location
    const currentBudgetRange = (() => {
      const path = location.pathname;
      if (path.includes('under-1-cr')) return 'under1cr';
      if (path.includes('1-5-cr')) return '1to5cr';
      if (path.includes('5-10-cr')) return '5to10cr';
      if (path.includes('10-20-cr')) return '10to20cr';
      if (path.includes('20-50-cr')) return '20to50cr';
      if (path.includes('above-50-cr')) return 'above50cr';
      return 'under1cr'; // default
    })();

    console.log('Budget page - current budget range:', currentBudgetRange);

    const filtered = filterProjectsByBudget(allProjects, currentBudgetRange);
    console.log('Budget page - filtered projects:', filtered.length);
    setFilteredProjects(filtered);
  }, [allProjects, location.pathname]);

  return (
    <>
      <GlobalFilterTemplate
        pageType="budget"
        pageConfig={{ budgetRange: (() => {
          const path = location.pathname;
          if (path.includes('under-1-cr')) return 'under1cr';
          if (path.includes('1-5-cr')) return '1to5cr';
          if (path.includes('5-10-cr')) return '5to10cr';
          if (path.includes('10-20-cr')) return '10to20cr';
          if (path.includes('20-50-cr')) return '20to50cr';
          if (path.includes('above-50-cr')) return 'above50cr';
          return 'under1cr'; // default
        })() }}
        projects={filteredProjects}
        isLoading={isLoading}
      />
      <Footer />
    </>
  );
};

export default GlobalBudgetPrice;