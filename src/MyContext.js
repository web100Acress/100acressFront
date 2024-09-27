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
  const [kasauli, setKasauli] = useState([]);
  const [minPrice, setMinPrice] = useState(priceRange.min);
  const [maxPrice, setMaxPrice] = useState(priceRange.max);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [possessionAllData, setPossessionAllData] = useState([]);
  const [readyToMoveData, setReadyTOMoveData] = useState([]);
  const [dlfProject, setDlfProject] = useState([]);
  const [goaCityProject, setGoaCityProject] = useState([]);
  const [dlfProjects, setDlfProjects] = useState([]);
  const [villasProject, setVillasProject] = useState([]);
  const [possessionIn2026AndBeyond, setpossessionIn2026AndBeyond] = useState([]);
  const [bptp, setbptp] = useState([]);
  const [orris, setorris] = useState([]);
  const [jms, setJms] = useState([]);
  const [rof, setRof] = useState([]);
  const [signatureglobal, setSignatureGlobal] = useState([]);
  const [emaarIndia, setEmaarIndia] = useState([]);
  const [m3mIndia, setM3mIndia] = useState([]);
  const [microtek, setMicrotek] = useState([]);
  const [dlfAllProjects, setDlfAllProjects] = useState([]);
  const [possessionin2024, setPossessionin2024] = useState([]);
  const [possessionin2025, setPossessionin2025] = useState([]);
  const [mumbaiProject, setMumbaiProject] = useState([]);
  const [nh48, setNh48] = useState([]);
  const [mgRoad, setMgRoad] = useState([]);
  const [gurugramProject, setGurugramProject] = useState([]);
  const [underConstruction, setUnderConstruction] = useState([]);
  const [newLaunch, setNewLaunch] = useState([]);
  const [ayodhya, setAyodhya] = useState([]);
  const [dlfSco, setDlfSco] = useState([]);
  const [possessionDate, setPossessionDate] = useState(() => {
    try {
      const storedDate = localStorage.getItem("possessionDate");
      return storedDate ? JSON.parse(storedDate) : null;
    } catch (error) {
      console.error("Error parsing localStorage data:", error);
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

      const upcomingProjects = projectsData.filter(
        (project) =>
          project.projectOverview === "upcoming" ||
          project.projectReraNo === "upcoming" || project.projectName === 'Emaar Amaris - Digi Homes 2' || project.projectName === 'Trump Towers 2' 
      );

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
        return (
          (project.type === "Deen Dayal Plots" ||
            project.type === "Residential Plots") &&
          project.city === "Gurugram"
        );
      });

      const villasProject = projectsData.filter((project) => {
        return project.type === "Villas";
      });

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

      const kasauli = projectsData.filter(
        (project) => project.city === "Kasauli"
      );

      const ayodhya = projectsData.filter(
        (project) => project.city === "Ayodhya"
      )

      const goaCityProject = projectsData.filter(
        (project) => project.city === "Goa"
      );

      const mumbaiProject = projectsData.filter(
        (project) => project.city === "Mumbai"
      );

      const readyToMoveData = projectsData.filter(
        (project) => project.project_Status === "readytomove"
      );
      const possessionin2024 = projectsData.filter(
        (project) => new Date(project.possessionDate).getFullYear() === 2024
      );
      const possessionin2025 = projectsData.filter(
        (project) => new Date(project.possessionDate).getFullYear() === 2025
      );

      const possessionIn2026AndBeyond = projectsData.filter(
        (project) => new Date(project.possessionDate).getFullYear() >= 2026
      );

      setFilteredProjects(
        projectsData.filter(
          (project) =>
            project.minPrice >= minPrice && project.maxPrice <= maxPrice
        )
      );

   



      const dlfProject = projectsData.filter(
        (project) =>
          project.projectOverview === "luxuryProject" ||
          project.projectReraNo === "luxuryProject"
      );

      const goaData = projectsData.filter(
        (project) => project.projectOverview === "goaProject"
      );
      const dlfAllProjects = projectsData.filter(
        (project) => project.builderName === "DLF Homes"
      );

      const bptp = projectsData.filter(
        (project) => project.projectOverview === "bptp"
      );

      const orris = projectsData.filter(
        (project) => project.projectOverview === "orris"
      );

      const jms = projectsData.filter(
        (project) => project.projectOverview === "jms"
      );

      const rof = projectsData.filter(
        (project) => project.projectOverview === "rof"
      );

      const signatureglobal = projectsData.filter(
        (project) => project.projectName === "Signature Global Plots"
      )

      const emaarIndia = projectsData.filter(
        (project) => project.project_Status === "emaar"
      );

      const m3mIndia = projectsData.filter(
        (project) => project.project_Status === "m3m"
      );

      const microtek = projectsData.filter(
        (project) => project.project_Status === "microtek"
      );

     

      const nh48 = projectsData.filter(
        (project) =>
          project.projectAddress.includes("Sector 15B, NH-48") ||
          project.projectAddress.includes("Sector 15 (2), NH 48") ||
          project.projectAddress.includes("NH-48")
      );

      const mgRoad = projectsData.filter(
        (project) => project.projectAddress.includes("MG Road")
      )

      const gurugramProject =  projectsData.filter(
        (project) => project.city === "Gurugram"
      )

      const underConstruction = projectsData.filter(
        (project) => project.project_Status === "underconstruction"
      )

      const newLaunch = projectsData.filter(
        (project) => project.project_Status === "newlunch" || project.project_Status === "newlaunch"
      )


      const dlfSco = projectsData.filter(
        (project) => project.builderName === 'DLF Homes' &&  project.type ==='SCO Plots'
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
      setKasauli(kasauli);
      setpossessionIn2026AndBeyond(possessionIn2026AndBeyond);
      setorris(orris);
      setbptp(bptp);
      setJms(jms);
      setRof(rof);
      setEmaarIndia(emaarIndia);
      setM3mIndia(m3mIndia);
      setMicrotek(microtek);
      setPossessionin2024(possessionin2024);
      setPossessionin2025(possessionin2025);
      setMumbaiProject(mumbaiProject);
      setNh48(nh48);
      setMgRoad(mgRoad);
      setGurugramProject(gurugramProject);
      setUnderConstruction(underConstruction);
      setNewLaunch(newLaunch);
      setAyodhya(ayodhya);
      setSignatureGlobal(signatureglobal);
      setDlfSco(dlfSco)
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
        possessionin2024,
        possessionin2025,
        dlfProject,
        goaCityProject,
        dlfAllProjects,
        villasProject,
        panchkula,
        kasauli,
        possessionIn2026AndBeyond,
        bptp,
        orris,
        jms,
        rof,
        emaarIndia,
        m3mIndia,
        microtek,
        mumbaiProject,
        nh48,
        mgRoad,
        gurugramProject,
        underConstruction,
        newLaunch,
        ayodhya,
        signatureglobal,
        dlfSco,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
