import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
export const DataContext = createContext();
export const DataProvider = ({ children }) => {
  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });
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
  const [blogData, setBlogData] = useState([]);
  const [sohnaRoad, setSohnaRoad] = useState([]);
  const [golfCourse, setGolfCourse] = useState([]);
  const [token, setToken] = useState(null);
  const [careerData, setCareerData] = useState([]);
  const [jobPostingData, setJobPostingData] = useState([]);
  const [resalePropertydata, setResalePropertydata] = useState([]);
  const [commercialProjectAll, setAllCommercialProjectAll] = useState([]);
  const [typeScoPlots, setTypeScoPlots] = useState([]);
  const [delhiData, setDelhiData] = useState([]);
  const [noidaData, setNoidaData] = useState([]);
  const [goaData, setGoaData] = useState([]);
  const [panipat, setPanipat] = useState([]);
  const [panchkula, setpanchkula] = useState([]);
  const [minPrice, setMinPrice] = useState(priceRange.min);
  const [maxPrice, setMaxPrice] = useState(priceRange.max);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [possessionAllData, setPossessionAllData] = useState([]);
  const [readyToMoveData, setReadyTOMoveData] = useState([]);
  const [dlfProject, setDlfProject] = useState([]);
  const [goaCityProject, setGoaCityProject] = useState([]);
  const [dlfAllProjects, setDlfAllProjects] = useState([]);
  const [villasProject, setVillasProject] = useState([]);
  const [bptp, setbptp] = useState([]);
  const [orris, setorris] = useState([]);
  const [jms, setJms] = useState([]);
  const [rof, setRof] = useState([]);
  const [emaarIndia, setEmaarIndia] = useState([]);
  const [m3mIndia, setM3mIndia] = useState([]);
  const [microtek, setMicrotek] = useState([]);

  const [possessionIn2029AndBeyond, setpossessionIn2029AndBeyond] = useState([]);

   const [possessionDate, setPossessionDate] = useState(() => {
    try {
      const storedDate = localStorage.getItem('possessionDate');
      return storedDate ? JSON.parse(storedDate) : null;
    } catch (error) {
      console.error('Error parsing localStorage data:', error);
      return null;
    }
  });

  useEffect(() => {
    fetchAllProject();
    fetchBlogData();
    fetchCareerData();
    fetchJobPostingData();
    buyFetchData();
  }, []);

  

  useEffect(() => {
    if (possessionDate !== null) { 
      PossessionFilter();
    }
    handleFilter();
  }, [priceRange, possessionDate]);

 
  const PossessionFilter = () => {
    setPossessionAllData([]);
    const PossFilter = allProjectData.filter((project) => {
      const projectYear = new Date(project.possessionDate).getFullYear();
      return projectYear === parseInt(possessionDate);
    });
    setPossessionAllData(PossFilter);
  };


  const fetchAllProject = async () => {
    try {
      const res = await axios.get(
        "https://api.100acress.com/project/viewAll/data"
      );
      const projectsData = res.data.data;

      const trendingProjects = projectsData.filter(
        (project) => project.projectOverview === "trending"
      );
      const upcomingProjects = projectsData
        .filter((project) => project.projectOverview === "upcoming" ||  project.projectReraNo ==='upcoming')
       
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

      const commercialProject = projectsData.filter(
        (project) => project.projectOverview === "commercial"
      );

      const scoPlots = projectsData.filter(
        (project) => project.type === "SCO Plots"
      );

      const commercialProjectAll = projectsData.filter(
        (project) => project.type === "Commercial Property"
      );

      const typeScoPlots = projectsData.filter(
        (project) => project.projectOverview === "sco"
      );

     

      const BuilderIndependentFloor = projectsData.filter((project) => {
        return (
          project.type === "Independent Floors" ||
          project.type === "Builder Floors"
        );
      });

      const deenDayalPlots = projectsData.filter((project) => {
        return project.type === "Deen Dayal Plots";
      });


      const villasProject = projectsData.filter((project)=> {
        return project.type === "Villas";
      })

     

      const sohnaRoad = projectsData.filter((project) =>
        project.projectAddress.includes("Sohna Road")
      );

      const golfCourse = projectsData.filter((project) =>
        project.projectAddress.includes("Golf Course Road")
      );

      const delhiData = projectsData.filter(
        (project) => project.city === "Delhi" || project.city === "New Delhi"
      );

      const noidaData = projectsData.filter(
        (project) => project.city === "Noida"
      );

      

      const panipat = projectsData.filter(
        (project) => project.city === "Panipat"
      );

      const panchkula = projectsData.filter(
        (project) => project.city === "Panchkula"
      );

      const goaCityProject = projectsData.filter(
        (project) => project.city === 'Goa'
      )


       const  readyToMoveData = projectsData.filter((project) => project.project_Status === "readytomove")
       
       const possessionIn2029AndBeyond = projectsData.filter((project) => new Date(project.possessionDate).getFullYear() >= 2029);
        

       setFilteredProjects(
        projectsData.filter(
          (project) =>
            project.minPrice >= minPrice && project.maxPrice <= maxPrice
        )
      );

      const dlfProject = projectsData.filter(
        (project) => project.projectOverview === 'luxuryProject' || project.projectReraNo === 'luxuryProject'
      )

      


      const goaData = projectsData.filter((project) => project.projectOverview === "goaProject");
      const dlfAllProjects  = projectsData.filter((project) => project.builderName === 'DLF Homes' );

      const bptp = projectsData.filter(
        (project) => project.projectOverview === 'bptp'
      )

      const orris = projectsData.filter(
        (project) => project.projectOverview === 'orris'
      )

      const jms = projectsData.filter(
        (project) => project.projectOverview === 'jms'
      )

      const rof = projectsData.filter(
        (project) => project.projectOverview === 'rof'
      )


      const emaarIndia = projectsData.filter(
        (project) =>  project.project_Status === 'emaar'
      )

      const m3mIndia = projectsData.filter(
        (project) =>  project.project_Status === 'm3m'
      )


      const microtek = projectsData.filter(
        (project) =>  project.project_Status === 'microtek'
      )



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
      setSohnaRoad(sohnaRoad);
      setGolfCourse(golfCourse);
      setAllCommercialProjectAll(commercialProjectAll);
      setTypeScoPlots(typeScoPlots);
      setDelhiData(delhiData);
      setNoidaData(noidaData);
      setGoaData(goaData);
      setPanipat(panipat);
      setFilteredProjects(filteredProjects);
      setReadyTOMoveData(readyToMoveData);
      setDlfProject(dlfProject);
      setGoaCityProject(goaCityProject);
      setDlfAllProjects(dlfAllProjects);
      setVillasProject(villasProject);
      setpanchkula(panchkula);
      setpossessionIn2029AndBeyond(possessionIn2029AndBeyond);
      setorris(orris);
      setbptp(bptp);
      setJms(jms);
      setRof(rof);
      setEmaarIndia(emaarIndia);
       setM3mIndia(m3mIndia);
       setMicrotek(microtek);
    } catch (error) {
      console.log(error || error.message);
    }
  };

  const fetchBlogData = async () => {
    try {
      const res = await axios.get("https://api.100acress.com/blog/view");
      setBlogData(res.data.data);
    } catch (error) {
      console.log(error || error.message);
    }
  };

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

          if (roleResponse.status === 200) {
            localStorage.setItem(
              "userRole",
              JSON.stringify(roleResponse.data.User.role)
            );
            const sellerId = roleResponse.data.User._id;
            localStorage.setItem("mySellerId", JSON.stringify(sellerId));
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

  const fetchCareerData = async () => {
    try {
      const res = await axios.get("https://api.100acress.com/career/page/view");
      setCareerData(res.data.data);
    } catch (error) {
      console.log(error || error.message);
    }
  };

  const fetchJobPostingData = async () => {
    try {
      const res = await axios.get(
        "https://api.100acress.com/career/opening/ViewAll"
      );
      setJobPostingData(res.data.data);
    } catch (error) {
      console.log(error || error.message);
    }
  };

  const buyFetchData = async () => {
    try {
      const res = await axios.get(
        "https://api.100acress.com/property/buy/ViewAll"
      );
      setResalePropertydata(res.data.collectdata);
    } catch (error) {
      console.error("Error fetching resale property data:", error);
    }
  };

  const handleFilter = () => {
    const minPriceNumber = parseFloat(priceRange.min);
    const maxPriceNumber = parseFloat(priceRange.max);
    const filtered = allProjectData.filter(
      (project) =>
        project.minPrice >= minPriceNumber && project.maxPrice <= maxPriceNumber
    );
    setFilteredProjects(filtered);
  };

  return (
    <DataContext.Provider
      value={{
        priceRange,
        setPriceRange,
        possessionDate,
        setPossessionDate,
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
        blogData,
        sohnaRoad,
        golfCourse,
        careerData,
        jobPostingData,
        resalePropertydata,
        commercialProjectAll,
        typeScoPlots,
        delhiData,
        noidaData,
        goaData,
        panipat,
        handleFilter, 
        filteredProjects,
        possessionAllData,
        readyToMoveData,
        dlfProject,
        goaCityProject,
        dlfAllProjects,
        villasProject,
        panchkula,
        possessionIn2029AndBeyond,
        bptp,
        orris,
        jms,
        rof,
        emaarIndia,
        m3mIndia,
        microtek,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
