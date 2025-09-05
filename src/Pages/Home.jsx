import React, { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import PopupForm from "./HomePages/PopupForm";
import Cities from "../Components/HomePageComponents/Cities";
import FormHome from "../Components/HomePageComponents/FormHome";
import WhyChoose from "../Components/HomePageComponents/WhyChoose";
import SpacesAvailable from "../Components/HomePageComponents/Spaces";
import SearchBar from "../Components/HomePageComponents/SearchBar";
import styled from "styled-components";
import OurServices from "../Components/HomePageComponents/ourServices";
import { Helmet } from "react-helmet";
// import Footer from "../Components/Actual_Components/Footer";
import LuxuryFooter from "../Components/Actual_Components/LuxuryFooter";
import AuthModal from "../Components/AuthModal";
import { Link } from "react-router-dom";
import BackToTopButton from "./BackToTopButton";
import PossessionProperty from "../Components/PossessionProperty";
import BudgetPlotsInGurugraon from "./BudgetPlotsInGurugraon";
import TopSeoPlots from "./TopSeoPlots";
import { useMediaQuery } from "@chakra-ui/react";
import { EyeIcon } from "lucide-react";
import ModernRecommendedSection from "../Components/HomePageComponents/ModernRecommendedSection";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Builder from "./BuilderPages/Builder";
import CustomSkeleton from "../Utils/CustomSkeleton";
import CommonProject from "../Utils/CommonProject";
import Builderaction from "./HomePages/Builderaction";
import Api_Service from "../Redux/utils/Api_Service";
import { useSelector } from "react-redux";
import Chatbot from "../Components/HomePageComponents/Chatbot";
import FloatingShorts from "../Components/FloatingShorts";

const Home = () => {
  // const [showConfetti, setShowConfetti] = useState(true);
  // const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Shorts ID is now fetched directly by FloatingShorts via backend polling.

  const sectionsRef = useRef({});
  const [colorChange, setColorchange] = useState(false);
  const [displayedProjects, setDisplayedProjects] = useState([]);
  const [observedSections, setObservedSections] = useState({});
  const [isSmallerThan768] = useMediaQuery("(max-width: 768px)");
  const [path, setPath] = useState(null);

  const [resalesectionvisible, SetResaleSectionVisible] = useState(false);

  
   const [isPopupActive, setIsPopupActive] = useState(false)

   const handlePopupVisibilityChange = useCallback((isActive) => {
    setIsPopupActive(isActive);
  }, []);

  // Auth modal state for sidebar card
  const [authOpen, setAuthOpen] = useState(false);
  const [authDefaultView, setAuthDefaultView] = useState("login");

  const TrendingProjects = useSelector(store => store?.project?.trending) || [];
  const FeaturedProjects = useSelector(store => store?.project?.featured) || [];
  const UpcomingProjects = useSelector(store => store?.project?.upcoming) || [];
  const CommercialProjects = useSelector(store => store?.project?.commercial) || [];
  const SCOProjects = useSelector(store => store?.project?.scoplots) || [];
  const AffordableProjects = useSelector(store => store?.project?.affordable) || [];
  const LuxuryProjects = useSelector(store => store?.project?.luxury) || [];
  const BudgetHomesProjects = useSelector(store => store?.project?.budget) || [];
  const ProjectinDelhi = useSelector(store => store?.project?.projectindelhi) || [];
  const DubaiProjects = useSelector(store => store?.stateproject?.dubai) || [];
  const LuxuryAllProject = useSelector(store => store?.allsectiondata?.luxuryAll) || [];
  const { getTrending, getFeatured, getUpcoming, getCommercial, getAffordable, getLuxury, getScoplots, getBudgetHomes, getProjectIndelhi, getAllProjects, getProjectbyState } = Api_Service();
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
    dubai: false,
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
    luxury: LuxuryAllProject,
    budget: BudgetHomesProjects,
    delhi: ProjectinDelhi,
  }), [
    TrendingProjects,
    FeaturedProjects,
    UpcomingProjects,
    CommercialProjects,
    SCOProjects,
    AffordableProjects,
    LuxuryAllProject,
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
      case "Dubai":
        getProjectbyState("dubai");
        break;
      default:
        break;
    }
    setDataLoaded((prevData) => ({
      ...prevData,
      [filter]: true
    }));
  }, [dataLoaded, getTrending, getFeatured, getUpcoming, getCommercial, getAffordable, getLuxury, getScoplots, getBudgetHomes, getProjectIndelhi, getProjectbyState]);

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
  }, [activeFilter, memoizedProjects, path]);

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
                getAllProjects("luxury");
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
              if (section === "dubai" && DubaiProjects.length === 0) {
                getProjectbyState("Dubai");
              }
              if (section === "resale") {
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
  }, [UpcomingProjects, LuxuryProjects, BudgetHomesProjects, SCOProjects, ProjectinDelhi, DubaiProjects]);

  // console.log(resalesectionvisible,"section")

  

  return (
    <Wrapper className="section" style={{ overflowX: "hidden" }}>
      <Helmet>
        <meta
          name="description"
          content="100acress.com Gurgaon Fastest Growing Property Website, Buy Residential &amp; Commercial Property in Gurgaon. Flats in Gurgaon. Real Estate in Gurgaon"
        />
        <title>
        100acress | The Best Real Estate Portal in Gurgaon
        </title>
        <link rel="canonical" href="https://www.100acress.com/" />
      </Helmet>
      
      {/* Confetti Animation */}
      {/* {showConfetti && <ConfettiAllCorners /> */}
      
  {/* <PopupForm onPopupVisibilityChange={handlePopupVisibilityChange} />  */}

   {/* This is the div whose background you want to blur more */}
    <div
      className={`
        transition-filter duration-300 ease-in-out
        ${isPopupActive ? 'blur-sm pointer-events-none select-none' : ''}
      `}
    >
  {/* uper wala backgroiund blur krne ke liye hai yaha se ham background kam ya jada blur manage kr sakte hai */}

        <Link to="/experion-the-trillion/" className="block relative w-full group" target="_self" aria-label="Experion The Trillion">
          
          <div className="hero-strip-99 transform transition-transform duration-500 ease-out group-hover:scale-[1.02] cursor-pointer" aria-hidden="true" />
        </Link>
    </div>

    {/* SearchBar should NOT be blurred */}
    <div className="relative w-full max-w-6xl mx-auto px-4 pb-1 py-8 -mt-20 z-10">
      <SearchBar />
    </div>

    {/* Reopen blurred wrapper for the rest of the content */}
    <div
      className={`
        transition-filter duration-300 ease-in-out
        ${isPopupActive ? 'blur-sm pointer-events-none select-none' : ''}
      `}
    >

      <div className="relative">
        {/* Removed themed overlay */}

        <div className="relative">
          {/* <SpotlightBanner /> */}
          <ModernRecommendedSection />
        </div>
      </div>

      {/* Two-column layout: main content (4/5) + sticky sidebar (1/5) */}
      <div className="max-w-[1250px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-5 gap-6 relative">
        {/* Main content */}
        <div className="lg:col-span-4 relative z-0">
          {TrendingProjects.length === 0 ? <CustomSkeleton /> : (
            <div data-aos="fade-up"
              data-aos-duration="1000" className="py-0 mt-3 max-w-[1250px] mx-auto">
                <br />
              <div className="flex items-center justify-between mx-3 lg:mx-6 xl:mx-14 md:mx-6">
                <h2 className="text-2xl xl:text-4xl lg:text-3xl md:text-2xl text-[#111] font-bold">
                  {`${activeFilter}`} Properties in Gurugram and Delhi NCR
                </h2>
              </div>

              {/* Filter Buttons */}
              <div className="flex items-center justify-start gap-3 mx-3 lg:mx-6 xl:ml-14 md:mx-6 pt-2 overflow-x-auto no-scrollbar">
                
                <button
                  onClick={() => setActiveFilter("Trending")}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                    activeFilter === "Trending" 
                      ? "bg-black text-white shadow-lg" 
                      : "bg-white border-2 border-gray-200 text-gray-800 hover:bg-gray-100 hover:border-gray-300"
                  }`}
                >
                  Trending
                </button>
                <button
                  onClick={() => setActiveFilter("Featured")}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                    activeFilter === "Featured" 
                      ? "bg-black text-white shadow-lg" 
                      : "bg-white border-2 border-gray-200 text-gray-800 hover:bg-gray-100 hover:border-gray-300"
                  }`}
                >
                  Featured
                </button>
                <button
                  onClick={() => setActiveFilter("Upcoming")}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                    activeFilter === "Upcoming" 
                      ? "bg-black text-white shadow-lg" 
                      : "bg-white border-2 border-gray-200 text-gray-800 hover:bg-gray-100 hover:border-gray-300"
                  }`}
                >
                  Upcoming
                </button>
                <button
                  onClick={() => setActiveFilter("Commercial")}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                    activeFilter === "Commercial" 
                      ? "bg-black text-white shadow-lg" 
                      : "bg-white border-2 border-gray-200 text-gray-800 hover:bg-gray-100 hover:border-gray-300"
                  }`}
                >
                  Commercial
                </button>
                <button
                  onClick={() => setActiveFilter("Affordable")}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                    activeFilter === "Affordable" 
                      ? "bg-black text-white shadow-lg" 
                      : "bg-white border-2 border-gray-200 text-gray-800 hover:bg-gray-100 hover:border-gray-300"
                  }`}
                >
                  Affordable
                </button>
                <button
                  onClick={() => setActiveFilter("SCO")}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                    activeFilter === "SCO" 
                      ? "bg-black text-white shadow-lg" 
                      : "bg-white border-2 border-gray-200 text-gray-800 hover:bg-gray-100 hover:border-gray-300"
                  }`}
                >
                  SCO
                </button>
                <button
                  onClick={() => setActiveFilter("Budget")}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                    activeFilter === "Budget" 
                      ? "bg-black text-white shadow-lg" 
                      : "bg-white border-2 border-gray-200 text-gray-800 hover:bg-gray-100 hover:border-gray-300"
                  }`}
                >
                  Budget
                </button>
                <button
                  onClick={() => setActiveFilter("Luxury")}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                    activeFilter === "Luxury" 
                      ? "bg-black text-white shadow-lg" 
                      : "bg-white border-2 border-gray-200 text-gray-800 hover:bg-gray-100 hover:border-gray-300"
                  }`}
                >
                  Luxury
                </button>

                {path && (
                  <div className="ml-auto hidden sm:block">
                    <Link to={path} target="_top">
                      <span className="flex items-center text-white text-sm px-3 py-1 rounded-full bg-black shadow-lg hover:bg-gray-800 transition-all duration-300">
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
                <CommonProject data={UpcomingProjects} title="New Upcoming Housing Projects in Gurgaon 2025" animation="fade-down" path={"/projects/upcoming-projects-in-gurgaon/"} />
              )}
            </div>

            {/* Luxury Projects */}
            <div ref={setRef("luxury")} data-section="luxury" style={{ height: "10px" }}></div>
            <div>
              {LuxuryAllProject.length === 0 ? <CustomSkeleton /> : (
                <CommonProject data={LuxuryAllProject.slice(0, 4)} title="Top Luxury Apartments For You" animation="fade-up" path={"/top-luxury-projects/"} />
              )}
            </div>

            <Builderaction />
            {/* Budget Projects */}
            <div ref={setRef("budget")} data-section="budget" style={{ height: "10px" }}></div>
            <div>
              {BudgetHomesProjects.length === 0 ? <CustomSkeleton /> : (
                <CommonProject data={BudgetHomesProjects} title="Best Budget Projects in Gurugram" animation="flip-left" />
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
                <CommonProject data={FeaturedProjects.slice(0, 8)} title="Top Featured Residential Projects in Gurugram" animation="flip-left" path="/projects-in-gurugram/" />
              )}
            </div>

            <div ref={setRef("delhi")} data-section="delhi" style={{ height: "10px" }}></div>
            <div>
              {ProjectinDelhi.length === 0 ? <CustomSkeleton /> : (
                <CommonProject data={ProjectinDelhi} title="Top Projects in Delhi" animation="zoom-out-left" path="/project-in-delhi/" />
              )}
            </div>

            {/* Projects in Dubai */}
            <div ref={setRef("dubai")} data-section="dubai" style={{ height: "10px" }}></div>
            <div>
              {DubaiProjects.length === 0 ? <CustomSkeleton /> : (
                <CommonProject data={DubaiProjects} title="Projects in Dubai" animation="zoom-out-left" path="/projects-in-dubai/" />
              )}
            </div>

            <Cities />

            {/* Affordable homes  */}
            <div ref={setRef("affordable")} data-section="affordable" style={{ height: "10px" }}></div>
            <div>
              {AffordableProjects.length === 0 ? <CustomSkeleton /> : (
                <CommonProject data={AffordableProjects.slice(0, 4)} title="Affordable Homes in Gurgaon" animation="fade-up" path="/projects-in-gurugram/" />
              )}
            </div>

            <Builder />


            <OurServices />
            <WhyChoose />
 
            {/* <Snapshot /> */}
        </div>
        
        {/* Sidebar */}
        <aside className="lg:col-span-1 hidden lg:block">
          <div className="sticky top-24 space-y-4 z-20">
            {/* Login / Register Card */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
              <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6 text-gray-500"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.964 0a9 9 0 1 0-11.964 0m11.964 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/></svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-700 leading-none font-medium">Guest User</p>
                    <p className="text-xs text-gray-400">You're not logged in</p>
                  </div>
                </div>
                <div className="bg-gray-50 border border-gray-100 rounded-lg p-3 mb-4">
                  <p className="text-[13px] font-medium text-gray-800">Your Recent Activity</p>
                  <p className="text-xs text-gray-500 mt-1">No activity yet! Start browsing properties and track them from here.</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => { setAuthDefaultView('login'); setAuthOpen(true); }}
                    className="flex-1 bg-black text-white px-3 py-2 rounded-md hover:bg-gray-800 transition"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => { setAuthDefaultView('register'); setAuthOpen(true); }}
                    className="flex-1 bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-700 transition"
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>

            {/* Post Property Card */}
            <div className="rounded-2xl overflow-hidden shadow-md border border-gray-100 bg-gradient-to-r from-[#e8f1ff] to-[#f0fff8]">
              <div className="p-5">
                <p className="text-gray-900 font-semibold leading-tight">Sell or rent faster at the right price!</p>
                <p className="text-sm text-gray-600 mt-1">List your property now</p>
                <button
                  onClick={() => { setAuthDefaultView('register'); setAuthOpen(true); }}
                  className="mt-4 w-full py-2.5 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition"
                >
                  Post Property, It's FREE
                </button>
              </div>
            </div>
          </div>
        </aside>
       </div>
       {/* Close outer relative wrapper for grid section */}
       </div>

       {/* Auth Modal for login/register */}
        <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} defaultView={authDefaultView} />
 
        {/* Place FormHome below the two-column layout */}
        <FormHome />
 
        <PossessionProperty />
        <BackToTopButton />
        {/* Floating YouTube Shorts (Home page only) */}
        <FloatingShorts />
 
        {/* <Footer /> */}
      </div> {/* Closing div for the blur container */}
      <LuxuryFooter />
 
      </Wrapper>
 
   );
 
 }
 
 export default Home;
 
 const Wrapper = styled.div`
   /* Neutral background */
   background: #ffffff;
 
   
   .hero-strip-99 {
     width: 100%;
     height: 340px;
     background-image: url("https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/banner/experion-the-trillion-banner.webp");
     background-repeat: no-repeat;
     background-position: center center; /* keep image centered */
     background-size: auto 100%; /* fit height exactly; crop sides on small screens */
     margin-top: 0; /* navbar is fixed and overlays this strip */
     position: relative; /* for gradient overlay */
   }
 
   /* Top fade to white to blend with transparent navbar */
   .hero-strip-99::before {
     content: "";
     position: absolute;
     left: 0;
     right: 0;
     top: 0;
     height: 72px; /* fade height */
     pointer-events: none;
     background: linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.85) 28%, rgba(255,255,255,0.4) 56%, rgba(255,255,255,0) 100%);
   }
 
   @media (max-width: 640px) {
     .hero-strip-99 {
       margin-top: 0;
     }
   }
 
   .dd-m-phone {
     position: fixed;
     z-index: 999;
     bottom: 10px;
     right: 10px;
     width: 45px;
     height: 45px;
     display: flex;
     align-items: center;
     justify-content: center;
     border-radius: 50%;
     background: linear-gradient(135deg, #FF9933 0%, #138808 100%);
     transition: 0.3s all ease;
     cursor: pointer;
     text-decoration: none;
     color: #fff;
     font-size: 24px;
   }
 
   .dd-m-phone:hover {
     transform: rotate(0.3turn);
     box-shadow: 0 5px 15px 2px rgba(255, 153, 51, 0.4);
   }
 
   .dd-m-phone i {
     font-size: 24px;
   }
 
   .dd-m-whatsapp {
     position: fixed;
     z-index: 999;
     bottom: 70px;
     right: 10px;
     width: 45px;
     height: 45px;
     display: flex;
     align-items: center;
     justify-content: center;
     border-radius: 50%;
     background: linear-gradient(135deg, #138808 0%, #FF9933 100%);
     transition: 0.3s all ease;
     cursor: pointer;
     text-decoration: none;
     color: #fff;
     font-size: 24px;
   }
 
   .dd-m-whatsapp:hover {
     transform: rotate(1turn);
     box-shadow: 0 5px 15px 2px rgba(19, 136, 8, 0.4);
   }
 
   .dd-m-whatsapp i {
     font-size: 24px;
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