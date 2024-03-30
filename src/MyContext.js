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
  const [residencialProjects, setResidencialProjects] = useState([]);
  const [allupcomingProject, setAllUpComingProject] = useState([]);
  const [commercialProject, setAllCommercialProject] = useState([]);
  const [scoPlots, setAllScoPlots] = useState([]);
  const [BuilderIndependentFloor, setBuilderIndependentFLoor] = useState([]);
  const [deenDayalPlots, setDeenDayalPlots] = useState([]);

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
      const upcomingProjects = projectsData
        .filter((project) => project.projectOverview === "upcoming")
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      const featuredProjects = projectsData.filter(
        (project) => project.projectOverview === "featured"
      );

      const affordable = projectsData.filter(
        (project) => project.type === "Affordable Homes"
      );

      const residencialProjects = projectsData.filter(
        (project) => project.type === "Residential Flats"
      );

      const city = projectsData.filter(
        (project) => project.projectOverview === "delhi"
      );

      const allupcomingProject = projectsData.filter(
        (project) => project.project_Status === "comingsoon"
      );

      // console.log(upcomingProjects,"allupcomingProjectallupcomingProject")

      const commercialProject = projectsData.filter(
        (project) => project.type === "Commercial Property"
      );

      const scoPlots = projectsData.filter(
        (project) => project.type === "SCO Plots"
      );

      // const BuilderIndependentFloor = projectsData.filter(
      //   (project) => project.type === "Independent Floors" || project.type === "Builder Floors"
      // )

      const BuilderIndependentFloor = projectsData.filter((project) => {
        return (
          project.type === "Independent Floors" ||
          project.type === "Builder Floors"
        );
      });

      const deenDayalPlots = projectsData.filter((project) => {
        return project.type === "Deen Dayal Plots";
      });

      // const val = projectsData.filter((project)=>{
      //   return  project.project_Status === 'createdAt'
      // })

      // console.log(val, "ashssd data wise")

      setTrendingProject(trendingProjects);
      setUpcoming(upcomingProjects);
      setFeaturedProject(featuredProjects);
      setAffordable(affordable);
      setCity(city);
      setAllProjectData(res.data.data);
      setResidencialProjects(residencialProjects);
      setAllUpComingProject(allupcomingProject);
      setAllCommercialProject(commercialProject);
      setAllScoPlots(scoPlots);
      setBuilderIndependentFLoor(BuilderIndependentFloor);
      setDeenDayalPlots(deenDayalPlots);
    } catch (error) {
      console.log(error || error.message);
    }
  };

  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const [token, setToken] = useState(null);

  const handleUserLogin = async (userLogin) => {
    const { email, password } = userLogin;
    if (email && password) {
      try {
        const loginResponse = await axios.post(
          "https://api.100acress.com/postPerson/verify_Login",
          { email, password }
        );
        const newToken = loginResponse.data.token;
        localStorage.setItem("myToken", JSON.stringify(newToken));
        setToken(newToken);

        if (loginResponse.status === 200) {
          const roleResponse = await axios.get(
            `https://api.100acress.com/postPerson/Role/${email}`
          );
          console.log(roleResponse, "roleResponse roleResponse");
          if (roleResponse.status === 200) {
            localStorage.setItem(
              "userRole",
              JSON.stringify(roleResponse.data.User.role)
            );
            const sellerId = roleResponse.data.User._id;
            localStorage.setItem("mySellerId", JSON.stringify(sellerId));

            // if(roleResponse.data.User.role==="admin"){
            //   history("/admin/acress/property/aadhar");
            // }else{
            //   history("/");
            // }
          } else {
            console.error("Role fetch failed:", roleResponse);
            alert(
              `Failed to fetch role information. Server responded with an error: ${roleResponse.status}`
            );
          }
        } else {
          console.error("Login failed:", loginResponse);
          alert(
            `Invalid credentials. Server responded with an error: ${loginResponse.status}`
          );
        }
      } catch (error) {
        console.error("Error during login:", error);
        alert("The email address or password entered is not valid");
      }
    } else {
      alert("Please Enter both Email and Password");
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
        residencialProjects,
        allupcomingProject,
        commercialProject,
        scoPlots,
        token,
        BuilderIndependentFloor,
        deenDayalPlots,
        handleUserLogin,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
