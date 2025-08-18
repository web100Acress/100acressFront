import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { sortByDesiredOrder } from "./Utils/ProjectSorting";
import { Affordable_Desired_Order, Luxury_Desired_Order, Trending_Desired_Order } from "./Pages/datafeed/Desiredorder";
export const DataContext = createContext();
export const DataProvider = ({ children }) => {
  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });
  const [LuxuryProjects, setLuxuryProjects] = useState([]);
  const [featuredProject, setFeaturedProject] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [affordable, setAffordable] = useState([]);
  const [allProjectData, setAllProjectData] = useState([]);
  const [residencialProjects, setResidencialProjects] = useState([]);
  const [allupcomingProject, setAllUpComingProject] = useState([]);
  const [commercialProject, setAllCommercialProject] = useState([]);
  const [scoPlots, setAllScoPlots] = useState([]);
  const [BuilderIndependentFloor, setBuilderIndependentFLoor] = useState([]);
  const [deenDayalPlots, setDeenDayalPlots] = useState([]);
  // const [blogData, setBlogData] = useState([]);
  const [sohnaRoad, setSohnaRoad] = useState([]);
  const [golfCourse, setGolfCourse] = useState([]);
  const [searching, setSearching] = useState("Ownering");
  const [token, setToken] = useState(null);
  const [jobPostingData, setJobPostingData] = useState([]);
  const [resalePropertydata, setResalePropertydata] = useState([]);
  const [commercialProjectAll, setAllCommercialProjectAll] = useState([]);
  const [typeScoPlots, setTypeScoPlots] = useState([]);
  const [typeAffordable, setTypeAffordabele] = useState([]);
  const [delhiData, setDelhiData] = useState([]);
  const [noidaData, setNoidaData] = useState([]);
  // adde new
  const [rajasthanData, setRajasthanData] = useState([]);

  const [goaData, setGoaData] = useState([]);
  const [panipat, setPanipat] = useState([]);
  const [panchkula, setpanchkula] = useState([]);
  const [kasauli, setKasauli] = useState([]);
  const [karnal, setKarnal] = useState([]);
  const [jalandhar, setJalandhar] = useState([]);
  const [minPrice, setMinPrice] = useState(priceRange.min);
  const [maxPrice, setMaxPrice] = useState(priceRange.max);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [possessionAllData, setPossessionAllData] = useState([]);
  const [readyToMoveData, setReadyTOMoveData] = useState([]);
  const [dlfProject, setDlfProject] = useState([]);
  const [goaCityProject, setGoaCityProject] = useState([]);
  const [villasProject, setVillasProject] = useState([]);
  const [possessionIn2026AndBeyond, setpossessionIn2026AndBeyond] = useState([]);
  const [bptp, setbptp] = useState([]);
  const [centralpark , setCentralPark] = useState([]);
  const [orris, setorris] = useState([]);
  const [jms, setJms] = useState([]);
  const [SignatureBuilder , setSignaturebuilder] = useState([]);
  const [M3M, setM3M] = useState([]);
  const [Elan , setElan] = useState([]);
  const [BPTP, setBPTP] = useState([]);
  const [Adani, setAdani] = useState([]);
  const [Experion, setExperion] = useState([]);
  const [SmartWorld, setSmartWorld] = useState([]);
  const [rof, setRof] = useState([]);
  const [Trevoc , setTrevoc] = useState([]);
  const [IndiaBulls , setIndiaBulls] = useState([]);
  const [signatureglobal, setSignatureGlobal] = useState([]);
  const [emaarIndia, setEmaarIndia] = useState([]);
  const [m3mIndia, setM3mIndia] = useState([]);
  const [microtek, setMicrotek] = useState([]);
  const [dlfAllProjects, setDlfAllProjects] = useState([]);
  const [possessionin2024, setPossessionin2024] = useState([]);
  const [possessionin2025, setPossessionin2025] = useState([]);
  const [possessionin2026, setPossessionin2026] = useState([]);
  const [mumbaiProject, setMumbaiProject] = useState([]);
  const [nh48, setNh48] = useState([]);
  const [mgRoad, setMgRoad] = useState([]);
  const [admin, setAdmin] = useState(searching)
  const [gurugramProject, setGurugramProject] = useState([]);
  const [underConstruction, setUnderConstruction] = useState([]);
  const [newLaunch, setNewLaunch] = useState([]);
  const [ayodhya, setAyodhya] = useState([]);
  const [dlfSco, setDlfSco] = useState([]);
  const [project, setProject] = useState([])
  const [budgetHome, setBudgetHome] = useState([]);
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
  
  const handleUserLogin = async (userLogin) => {
    const { email, password } = userLogin;
    if (email && password) {
      try {
        const loginResponse = await axios.post(
          "/postPerson/verify_Login",
          { email, password }
        );
        const newToken = loginResponse.data.token;
        localStorage.setItem("myToken", JSON.stringify(newToken));
        setToken(newToken);

        if (loginResponse.status === 200) {
          const roleResponse = await axios.get(
            `/postPerson/Role/${email}`
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
        LuxuryProjects,
        featuredProject,
        affordable,
        upcoming,
        admin,
        centralpark,
        allProjectData,
        residencialProjects,
        allupcomingProject,
        commercialProject,
        scoPlots,
        token,
        BuilderIndependentFloor,
        deenDayalPlots,
        handleUserLogin,
        sohnaRoad,
        golfCourse,
        jobPostingData,
        resalePropertydata,
        commercialProjectAll,
        typeScoPlots,
        typeAffordable,
        delhiData,
        noidaData,
        rajasthanData,
        //  setRajasthanData,
        goaData,
        panipat,
        handleFilter,
        filteredProjects,
        budgetHome,
        possessionAllData,
        readyToMoveData,
        possessionin2024,
        possessionin2025,
        possessionin2026,
        dlfProject,
        goaCityProject,
        dlfAllProjects,
        villasProject,
        panchkula,
        kasauli,
        karnal,
        jalandhar,
        possessionIn2026AndBeyond,
        bptp,
        orris,
        jms,
        SignatureBuilder,
        M3M,
        Experion,
        Elan,
        BPTP,
        Adani,
        SmartWorld,
        Trevoc,
        IndiaBulls,
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
        project
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
