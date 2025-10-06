import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Api_Service from "../Redux/utils/Api_Service";
import GlobalFilterTemplate from "../Components/GlobalFilterTemplate/GlobalFilterTemplate";
import Footer from "../Components/Actual_Components/Footer";

const GlobalBudgetPrice = () => {
  const { getAllProjects } = Api_Service();
  
  // Get all projects from Redux store
  const upcomingProjects = useSelector(store => store?.allsectiondata?.allupcomingproject || []);
  const underConstructionProjects = useSelector(store => store?.allsectiondata?.underconstruction || []);
  const readyToMoveProjects = useSelector(store => store?.allsectiondata?.readytomove || []);
  const newLaunchProjects = useSelector(store => store?.allsectiondata?.newlaunch || []);
  
  // Combine all projects for budget page
  const allProjects = [
    ...upcomingProjects,
    ...underConstructionProjects,
    ...readyToMoveProjects,
    ...newLaunchProjects
  ];
  
  const [isLoading, setIsLoading] = useState(true);
  const [filteredProjects, setFilteredProjects] = useState([]);

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
    console.log('Budget page - project breakdown:', {
      upcoming: upcomingProjects.length,
      underconstruction: underConstructionProjects.length,
      readytomove: readyToMoveProjects.length,
      newlaunch: newLaunchProjects.length,
      total: allProjects.length
    });
    setFilteredProjects(allProjects);
  }, [allProjects, upcomingProjects, underConstructionProjects, readyToMoveProjects, newLaunchProjects]);

  return (
    <>
      <GlobalFilterTemplate
        pageType="budget"
        projects={filteredProjects}
        isLoading={isLoading}
      />
      <Footer />
    </>
  );
};

export default GlobalBudgetPrice;