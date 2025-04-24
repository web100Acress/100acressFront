import React, { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Cities from "../Components/HomePageComponents/Cities";
import FormHome from "../Components/HomePageComponents/FormHome";
import WhyChoose from "../Components/HomePageComponents/WhyChoose";
import SpacesAvailable from "../Components/HomePageComponents/Spaces";
import SearchBar from "../Components/HomePageComponents/SearchBar";
import styled from "styled-components";
import OurServices from "../Components/HomePageComponents/ourServices";
import Free from "../../src/Pages/Free";
import { Helmet } from "react-helmet";
import Footer from "../Components/Actual_Components/Footer";
import { Link } from "react-router-dom";
import BackToTopButton from "./BackToTopButton";
import PossessionProperty from "../Components/PossessionProperty";
import BudgetPlotsInGurugraon from "./BudgetPlotsInGurugraon";
import TopSeoPlots from "./TopSeoPlots";
import { useMediaQuery } from "@chakra-ui/react";
import { EyeIcon } from "lucide-react";
import HotProject from "./HomePages/hotproject";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Builder from "./BuilderPages/Builder";
import CustomSkeleton from "../Utils/CustomSkeleton";
import CommonProject from "../Utils/CommonProject";
import Builderaction from "./HomePages/Builderaction";
import Api_Service from "../Redux/utils/Api_Service";
import { useSelector } from "react-redux";
const ResaleComponent = React.lazy(()=> import("./Resale"));

const Home = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const sectionsRef = useRef({});
  const [colorChange, setColorchange] = useState(false);
  const [displayedProjects, setDisplayedProjects] = useState([]);
  const [observedSections, setObservedSections] = useState({});
  const [isSmallerThan768] = useMediaQuery("(max-width: 768px)");
  const [path,setPath]= useState(null);

  const [resalesectionvisible, SetResaleSectionVisible] = useState(false);


  const TrendingProjects = useSelector(store => store?.project?.trending);
  const FeaturedProjects = useSelector(store => store?.project?.featured);
  const UpcomingProjects = useSelector(store => store?.project?.upcoming);
  const CommercialProjects = useSelector(store => store?.project?.commercial);
  const SCOProjects = useSelector(store => store?.project?.scoplots);
  const AffordableProjects = useSelector(store => store?.project?.affordable);
  const LuxuryProjects = useSelector(store => store?.project?.luxury);
  const BudgetHomesProjects = useSelector(store => store?.project?.budget);
  const ProjectinDelhi = useSelector(store => store?.project?.projectindelhi);
  const { getTrending, getFeatured, getUpcoming, getCommercial, getAffordable, getLuxury, getScoplots, getBudgetHomes, getProjectIndelhi } = Api_Service();
  const [dataLoaded, setDataLoaded] = useState({
    trending: false,
    featured: false,
    upcoming: false,
    commercial: false,
    sco: false,
    affordable: false,
    luxury: false,
    budget: false,
    delhi: false,
  });
  const setRef = (section) => (el) => {
    if (el && !sectionsRef.current[section]) {
      sectionsRef.current[section] = el;
    }
  };
  const changeNavbarColor = () => {
    if (window.scrollY >= 250) {
      setColorchange(true);
    } else {
      setColorchange(false);
    }
  };
  window.addEventListener("scroll", changeNavbarColor);
  const [activeFilter, setActiveFilter] = useState("Trending");

  const memoizedProjects = useMemo(() => ({
    trending: TrendingProjects,
    featured: FeaturedProjects,
    upcoming: UpcomingProjects,
    commercial: CommercialProjects,
    sco: SCOProjects,
    affordable: AffordableProjects,
    luxury: LuxuryProjects,
    budget: BudgetHomesProjects,
    delhi: ProjectinDelhi,
  }), [
    TrendingProjects,
    FeaturedProjects,
    UpcomingProjects,
    CommercialProjects,
    SCOProjects,
    AffordableProjects,
    LuxuryProjects,
    BudgetHomesProjects,
    ProjectinDelhi
  ]);

  const loadData = useCallback((filter) => {
  
    if (dataLoaded[filter]) return; 
    switch (filter) {
      case "Trending":
        getTrending();
        break;
      case "Featured":
        getFeatured();
        break;
      case "Upcoming":
        getUpcoming();
        break;
      case "Commercial":
        getCommercial();
        break;
      case "SCO":
        getScoplots();
        break;
      case "Affordable":
        getAffordable();
        break;
      case "Luxury":
        getLuxury();
        break;
      case "Budget":
        getBudgetHomes();
        break;
      case "Delhi":
        getProjectIndelhi();
        break;
      default:
        break;
    }
    setDataLoaded((prevData) => ({
      ...prevData,
      [filter]: true
    }));
  }, [dataLoaded, getTrending, getFeatured, getUpcoming, getCommercial, getAffordable, getLuxury, getScoplots, getBudgetHomes, getProjectIndelhi]);

  useEffect(() => {
    loadData(activeFilter);
  }, [activeFilter, loadData]);

  // Set the displayed projects based on the active filter
  useEffect(() => {
    switch (activeFilter) {
      case "Trending":
        setDisplayedProjects(memoizedProjects.trending);
        break;
      case "Featured":
        setDisplayedProjects(memoizedProjects.featured);
        break;
      case "Upcoming":
        setDisplayedProjects(memoizedProjects.upcoming);
        setPath("/projects/upcoming-projects-in-gurgaon/");
        break;
      case "Commercial":
        setDisplayedProjects(memoizedProjects.commercial.slice(0, 4));
        setPath("/projects/commercial/");
        break;
      case "SCO":
        setDisplayedProjects(memoizedProjects.sco.slice(0, 4));
        setPath("/sco/plots/");
        break;
      case "Affordable":
        setDisplayedProjects(memoizedProjects.affordable.slice(0, 4));
        break;
      case "Budget":
        setDisplayedProjects(memoizedProjects.budget);
        break;
      case "Luxury":
        setDisplayedProjects(memoizedProjects.luxury.slice(0, 4));
        setPath("/top-luxury-projects/");
        break;
      default:
        setDisplayedProjects([]);
        break;
    }
  }, [activeFilter, memoizedProjects,path]);

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      AOS.refresh();
    }, 100);

  }, [activeFilter]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target.getAttribute("data-section");
            if (!observedSections[section]) {
              setObservedSections(prev => ({ ...prev, [section]: true }));

              if (section === "upcoming" && UpcomingProjects.length === 0) {
                getUpcoming();
              }
              if (section === "luxury" && LuxuryProjects.length === 0) {
                getLuxury();
              }
              if (section === "budget" && BudgetHomesProjects.length === 0) {
                getBudgetHomes();
              }
              if (section === "SCO" && SCOProjects.length === 0) {
                getScoplots();
              }
              if (section === "commercial" && CommercialProjects.length === 0) {
                getCommercial();
              }
              if (section === "feature" && FeaturedProjects.length === 0) {
                getFeatured();
              }
              if (section === "affordable" && AffordableProjects.length === 0) {
                getAffordable();
              }
              if (section === "delhi" && ProjectinDelhi.length === 0) {
                getProjectIndelhi();
              }
              if(section === "resale"){
                SetResaleSectionVisible(true);
              }
            }
          }
        });
      },
      { root: null, threshold: 0.1, rootMargin: "700px" }
    );

    Object.values(sectionsRef.current).forEach((el) => observer.observe(el));

    return () => {
      Object.values(sectionsRef.current).forEach((el) => observer.unobserve(el));
    };
  }, [UpcomingProjects, LuxuryProjects, BudgetHomesProjects, SCOProjects, ProjectinDelhi]);

  // console.log(resalesectionvisible,"section")

  return (
    <Wrapper className="section" style={{ overflowX: "hidden" }}>
      <Helmet>
        <meta
          name="description"
          content="100acress.com Gurgaon Fastest Growing Property Website, Buy Residential &amp; Commercial Property in Gurgaon. Flats in Gurgaon. Real Estate in Gurgaon"
        />
        <title>
          Property in Gurgaon, Buy Luxury Flats in Gurugram, Real Estate India
        </title>
        <link rel="canonical" href="https://www.100acress.com/" />
      </Helmet>

      <div className="relative w-full">
        <img
          src="https://d16gdc5rm7f21b.cloudfront.net/100acre/banner/Navarathri.webp"
          alt="Banner"
          className="hidden md:block w-full h-[25rem] md:h-[30rem] sm:h-[35rem] lg:h-[30rem] xl:h-[30rem]"
        />
        <img
          src="https://d16gdc5rm7f21b.cloudfront.net/100acre/banner/navratri+phone.webp"
          alt="Mobile Banner"
          className="mt-14 block md:hidden w-full h-[38rem]"
        />

        {/* Center the SearchBar */}
        <div className="absolute inset-0 flex items-center justify-center mt-16 md:mt-0 lg:mt-24">
          <SearchBar />
        </div>

      </div>

      <div className="relative">
        {/* <div className="absolute inset-0 bg-[#f17777]"></div> */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to right top, #f17777, #541D13)',
        }}></div>

        
        <div className="relative">
          {/* <SpotlightBanner /> */}
          <HotProject />
        </div>
      </div>

      {TrendingProjects.length === 0 ? <CustomSkeleton /> : (
        
          <div data-aos="fade-up"
            data-aos-duration="1000" className="py-0 mt-3">
            <div className="flex items-center justify-between mx-6 lg:mx-6 xl:mx-14 md:mx-6 py-2">
              <h2 className="text-2xl xl:text-4xl lg:text-3xl md:text-2xl">
                {`${activeFilter}`} Properties in Gurugram
              </h2>
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center justify-start gap-3 mx-6 lg:mx-6 xl:ml-14 md:mx-6 pt-2 overflow-x-auto no-scrollbar">
              <button
                onClick={() => setActiveFilter("Trending")}
                className={`px-4 py-2 rounded-full text-xs ${activeFilter === "Trending" ? "bg-[#C13B44] text-white" : "border border-[#333333] shadow-sm hover:shadow-lg hover:scale-125 duration-500 ease-in-out "}`}
              >
                Trending
              </button>
              <button
                onClick={() => setActiveFilter("Featured")}
                className={`px-4 py-2 rounded-full text-xs ${activeFilter === "Featured" ? "bg-[#C13B44] text-white" : "border border-[#333333] shadow-sm hover:scale-125 duration-500 ease-in-out"}`}
              >
                Featured
              </button>
              <button
                onClick={() => setActiveFilter("Upcoming")}
                className={`px-4 py-2 rounded-full text-xs ${activeFilter === "Upcoming" ? "bg-[#C13B44] text-white" : "border border-[#333333] shadow-sm hover:scale-125 duration-500 ease-in-out"}`}
              >
                Upcoming
              </button>
              <button
                onClick={() => setActiveFilter("Commercial")}
                className={`px-4 py-2 rounded-full text-xs ${activeFilter === "Commercial" ? "bg-[#C13B44] text-white" : "border border-[#333333] shadow-sm hover:scale-125 duration-500 ease-in-out"}`}
              >
                Commercial
              </button>
              <button
                onClick={() => setActiveFilter("Affordable")}
                className={`px-4 py-2 rounded-full text-xs ${activeFilter === "Affordable" ? "bg-[#C13B44] text-white" : "border border-[#333333] shadow-sm hover:scale-125 duration-500 ease-in-out"}`}
              >
                Affordable
              </button>
              <button
                onClick={() => setActiveFilter("SCO")}
                className={`px-4 py-2 rounded-full text-xs ${activeFilter === "SCO" ? "bg-[#C13B44] text-white" : "border border-[#333333] shadow-sm hover:scale-125 duration-500 ease-in-out"}`}
              >
                SCO
              </button>
              <button
                onClick={() => setActiveFilter("Budget")}
                className={`px-4 py-2 rounded-full text-xs ${activeFilter === "Budget" ? "bg-[#C13B44] text-white" : "border border-[#333333] shadow-sm hover:scale-125 duration-500 ease-in-out"}`}
              >
                Budget 🏠
              </button>
              <button
                onClick={() => setActiveFilter("Luxury")}
                className={`px-4 py-2 rounded-full text-sm font-semibold ${activeFilter === "Luxury"
                  ? "bg-gradient-to-r from-[#da737a] to-[#5f050b] text-white shadow-lg transform hover:scale-105 duration-300 ease-in-out"
                  : "border-2 border-[#D4AF37] text-[#D4AF37] shadow-md hover:scale-105 duration-300 ease-in-out"}`}
              >
                Luxury
              </button>

              {path && (
                <div className="ml-auto hidden sm:block">
                  <Link to={path} target="_top">
                    <span className="flex items-center text-white text-sm px-3 py-1 rounded-full bg-red-600">
                      <EyeIcon />
                      <span className="ml-2">View All</span>
                    </span>
                  </Link>
                </div>
              )}
            </div>

            {/* Display Filtered Projects */}
            <CommonProject
              data={displayedProjects}
              animation="fade-up"
            />
          </div>
        )
      }


      <div>
        {/* Upcoming Projects */}
        <div ref={setRef("upcoming")} data-section="upcoming" style={{ height: "10px" }}></div>
        <div>
          {UpcomingProjects.length === 0 ? <CustomSkeleton /> : (
            <CommonProject data={UpcomingProjects} title="Upcoming Projects in Gurugram" animation="fade-down" path={"/projects/upcoming-projects-in-gurgaon/"} />
          )}
        </div>

        {/* Luxury Projects */}
        <div ref={setRef("luxury")} data-section="luxury" style={{ height: "10px" }}></div>
        <div>
          {LuxuryProjects.length === 0 ? <CustomSkeleton /> : (
            <CommonProject data={LuxuryProjects.slice(0, 4)} title="Luxury For You" animation="fade-up" path={"/top-luxury-projects/"} />
          )}
        </div>

        <Builderaction />
        {/* Budget Projects */}
        <div ref={setRef("budget")} data-section="budget" style={{ height: "10px" }}></div>
        <div>
          {BudgetHomesProjects.length === 0 ? <CustomSkeleton /> : (
            <CommonProject data={BudgetHomesProjects} title="Budget Projects in Gurugram" animation="flip-left" />
          )}
        </div>

        {/* Sco Plots */}
        <div ref={setRef("SCO")} data-section="SCO" style={{ height: "10px" }}></div>
        <div>
          {SCOProjects.length === 0 ? <CustomSkeleton /> : (
            <CommonProject data={SCOProjects.slice(0, 4)} title="SCO Projects in Gurugram" animation="flip-left" path="/sco/plots/" />
          )}
        </div>

        <SpacesAvailable />
        <BudgetPlotsInGurugraon />

        {/* Commercial Pojects  */}
        <div ref={setRef("commercial")} data-section="commercial" style={{ height: "10px" }}></div>
        <div>
          {CommercialProjects.length === 0 ? <CustomSkeleton /> : (
            <CommonProject data={CommercialProjects.slice(0, 4)} title="Commercial Projects in Delhi NCR" animation="fade-down" path="/projects/commercial/" />
          )}
        </div>

        <TopSeoPlots />

        {/* Feature Projects */}
        <div ref={setRef("feature")} data-section="feature" style={{ height: "10px" }}></div>
        <div>
          {FeaturedProjects.length === 0 ? <CustomSkeleton /> : (
            <CommonProject data={FeaturedProjects.slice(0, 4)} title="Featured Projects" animation="flip-left" path="/projects/upcoming-projects-in-gurgaon/" />
          )}
        </div>

        <div ref={setRef("delhi")} data-section="delhi" style={{ height: "10px" }}></div>
        <div>
          {ProjectinDelhi.length === 0 ? <CustomSkeleton /> : (
            <CommonProject data={ProjectinDelhi} title="Projects in Delhi" animation="zoom-out-left" path="/project-in-delhi/" />
          )}
        </div>



        <Cities />

        {/* Affordable homes  */}
        <div ref={setRef("affordable")} data-section="affordable" style={{ height: "10px" }}></div>
        <div>
          {AffordableProjects.length === 0 ? <CustomSkeleton /> : (
            <CommonProject data={AffordableProjects.slice(0, 4)} title="Affordable Homes" animation="fade-up" path="/projects-in-gurugram/" />
          )}
        </div>

        <Builder />


        <div ref={setRef("resale")} data-section="resale" className="flex items-center justify-between mx-6 lg:mx-6 xl:mx-14 md:mx-6 pt-4">
          <div className="flex items-center">
            <h2 className="text-xl xl:text-4xl lg:text-3xl md:text-2xl  sm:text-left">
              Best Resale Property <span> For You</span>
            </h2>
          </div>
          <div className="ml-2 hidden sm:block">
            <Link
              to="/buy-properties/best-resale-property-in-gurugram/"
              target="_top"
            >
              <span className="flex items-center text-white text-sm px-3 py-0 rounded-full bg-red-600">
                <EyeIcon />
                <span className="ml-2" style={{ marginLeft: "8px" }}>
                  View All
                </span>
              </span>
            </Link>
          </div>
        </div>

        {observedSections["resale"] ? (
          <Suspense fallback={<CustomSkeleton />}>
            <ResaleComponent />
          </Suspense>
        ) : (
          <CustomSkeleton />
        )}



        <OurServices />
        <WhyChoose />

        {/* <Snapshot /> */}
        <FormHome />

      </div>

      {colorChange && isSmallerThan768 && <div>
        <Link to="/auth/signin/" target="_top">
          <div className="sticky-quote-cta">
            <a
              className="text-white"
              style={{ backgroundColor: "#C13B44", padding: '12px' }}
            >
              LIST{" "}PROPERTY
            </a>
          </div>
        </Link>
      </div>}

      {/* <HomeBuilderCarousel /> */}
      <Free />
      <div>
        <div>
          <a href="tel:8500900100" class="dd-m-phone">
            <i class="fa-solid fa-phone"></i>
          </a>
        </div>
      </div>

      <div>
        <a
          href="https://wa.me/918500900100"
          class="dd-m-whatsapp"
          rel="noopener noreferrer"
          target="_blank"
        >
          <i class="fa-brands fa-whatsapp"></i>
        </a>
      </div>

      <PossessionProperty />
      <BackToTopButton />
      <Footer />
    </Wrapper>
  );
}

export default Home;

const Wrapper = styled.section`
  .dd-m-phone {
    position: fixed;
    z-index: 999;
    bottom: 10px;
    right: 10px; /* Changed from right to left */
    width: 45px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: #007bff; /* Blue color for the icon background */
    transition: 0.3s all ease;
    cursor: pointer;
    text-decoration: none;
    color: #fff; /* Icon color */
    font-size: 24px; /* Adjust icon size as needed */
  }

  .dd-m-phone:hover {
    transform: rotate(0.3turn);
    box-shadow: 0 5px 15px 2px rgba(0, 123, 255, 0.3); /* Blue shadow */
  }

  .dd-m-phone i {
    font-size: 24px; /* Adjust icon size as needed */
  }

  .dd-m-whatsapp {
    position: fixed;
    z-index: 999;
    bottom: 70px;
    right: 10px; /* Changed from right to left */
    width: 45px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: #4ac557; /* Blue color for the icon background */
    transition: 0.3s all ease;
    cursor: pointer;
    text-decoration: none;
    color: #fff; /* Icon color */
    font-size: 24px; /* Adjust icon size as needed */
  }

  .dd-m-whatsapp:hover {
    transform:rotate(1turn);
    box-shadow: 0 5px 15px 2px rgba(0, 123, 255, 0.3); /* Blue shadow */
  }

  .dd-m-whatsapp i {
    font-size: 24px; /* Adjust icon size as needed */
  }
  .sticky-quote-cta {
    height: auto;
    position: fixed;
    border-radius: 15px 0 15px 0;
    right: 0;
    top: 400px;
    top: 40vh;
    z-index: 10000;
  }

  .sticky-quote-cta a {
    color: white;
    text-decoration: none;
    background: #333;
    padding: 15px 20px 35px;
    display: block;
    font-weight: bold;
    font-size: 15px;
    border-radius: 5px;
    -ms-transform: rotate(-270deg) translate(0, -20px);
    -webkit-transform: rotate(-270deg) translate(0, -20px);
    transform: rotate(-270deg) translate(0, -20px);
    position: relative;
    right: -40px;
    transition: position 0.2s, right 0.2s;
    background: rgb(251, 183, 39);
    background: red;
  }

  .sticky-quote-cta a:hover {
    right: -70px;
    transition: position 0.2s, right 0.2s;
    cursor: pointer;
  }

  @media screen and (max-width: 600px) {
    .xjUWI {
      font-size: x-large;
      margin: 30px 30px !important;
    }
    .djqwUUJNCO {
      height: 17vh !important;
      background-image: url("../../Images/P1.png");
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
    }
  }

  @media screen and (max-width: 425px) and (min-width: 425px) {
    .xjUWI {
      font-size: x-large;
      margin: 10px 30px !important;
    }
    .djqwUUJNCO {
      height: 60vh !important;
      background-image: url("../../Images/P1.png");
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
    }
  }

  @media screen and (max-width: 375px) and (min-width: 375px) {
    .xjUWI {
      font-size: x-large;
      margin: 10px 30px !important;
    }
    .djqwUUJNCO {
      height: 20vh !important;
      background-image: url("../../Images/P1.png");
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
    }
  }

  @media screen and (max-width: 425px) and (min-width: 425px) {
    .xjUWI {
      font-size: x-large;
      margin: 10px 30px !important;
    }
    .djqwUUJNCO {
      height: 60vh !important;
      background-image: url("../../Images/P1.png");
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
    }
  }

  @media screen and (max-width: 1800px) and (min-width: 601px) {
    .djqwUUJNCO {
      background-image: url("../../Images/tarc.jpg");
      background-repeat: no-repeat;
      background-size: cover;
      background-position: cover;
      height: 60vh !important;
    }
  }


  .banner {
    position: relative;
  }

  .banner-image {
    width: 100%;
    height: auto;
  }

  .default-image {
    display: block; /* Show default image by default */
  }

  .mobile-image {
    display: none; /* Hide mobile image by default */
  }

  /* Media query for mobile devices */
  @media (max-width: 768px) {
    .default-image {
      display: none; /* Hide default image on mobile */
    }

    .mobile-image {
      display: block; /* Show mobile image on mobile */
    }
  }

`;
