import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [trendingProject, setTrendingProject] = useState([]);
  const [featuredProject, setFeaturedProject] = useState([]);

  const [upcoming, setUpcoming] = useState([]);
  const [affordable, setAffordable] = useState([]);
  const [city, setCity] = useState([]);
  const [allProjectData, setAllProjectData] = useState([]);

  useEffect(() => {
    fetchAllProject();
  }, []);

  const fetchAllProject = async () => {
    try {
      const res = await axios.get("https://api.100acress.com/project/viewAll");
      const projectsData = res.data.data;

      const trendingProjects = projectsData.filter(
        (project) => project.projectOverview === "trending"
      );
      const upcomingProjects = projectsData.filter(
        (project) => project.projectOverview === "upcoming"
      );
      const featuredProjects = projectsData.filter(
        (project) => project.projectOverview === "featured"
      );

      const affordable = projectsData.filter(
        (project) => project.type === "Affordable Homes"
      );

      const city = projectsData
        .filter((project) => project.projectOverview === "delhi")
        

      setTrendingProject(trendingProjects);
      setUpcoming(upcomingProjects);
      setFeaturedProject(featuredProjects);
      setAffordable(affordable);
      setCity(city);
      setAllProjectData(res.data.data);
    } catch (error) {
      console.log(error || error.message);
    }
  };

  return (
    <DataContext.Provider
      value={{
        trendingProject,
        featuredProject,
        affordable,
        upcoming,
        city,
        allProjectData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
