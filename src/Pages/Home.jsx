import React, { Suspense, useCallback, useEffect, useMemo, useRef, useState, useContext } from "react";
import PopupForm from "./HomePages/PopupForm";
import Cities from "../Components/HomePageComponents/Cities";
// import FormHome from "../Components/HomePageComponents/FormHome";
import WhyChoose from "../Components/HomePageComponents/WhyChoose";
import SpacesAvailable from "../Components/HomePageComponents/Spaces";
import SearchBar from "../Components/HomePageComponents/SearchBar";
import styled from "styled-components";
import OurServices from "../Components/HomePageComponents/ourServices";
import { Helmet } from "react-helmet";
// import Footer from "../Components/Actual_Components/Footer";
import Footer from "../Components/Actual_Components/Footer";
import AuthModal from "../Resister/AuthModal";
import { Link } from "react-router-dom";
import BackToTopButton from "./BackToTopButton";
import PossessionProperty from "../Components/PossessionProperty";
import BudgetPlotsInGurugraon from "./BudgetPlotsInGurugraon";
// import TopSeoPlots from "./TopSeoPlots";
import { useMediaQuery } from "@chakra-ui/react";
import { EyeIcon, HomeIcon, MessageCircle, PhoneIcon, User as UserIcon, ArrowUpRight } from "lucide-react";
import ModernRecommendedSection from "../Components/HomePageComponents/ModernRecommendedSection";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Builder from "./BuilderPages/Builder";
import CustomSkeleton from "../Utils/CustomSkeleton";
import CommonProject from "../Utils/CommonProject";
import Builderaction from "./HomePages/Builderaction";
import Api_Service from "../Redux/utils/Api_Service";
import { useSelector } from "react-redux";
// import Chatbot from "../Components/HomePageComponents/Chatbot";
import { AuthContext } from "../AuthContext";
import FloatingShorts from "../Components/FloatingShorts";
import DynamicHeroBanner from "../Components/HomePageComponents/DynamicHeroBanner";

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

  // Sticky aside JS fallback (ensures fix-on-scroll even if CSS sticky is constrained)
  const gridSectionRef = useRef(null);
  const asideRef = useRef(null);
  const asideInnerRef = useRef(null);
  const [asideStyle, setAsideStyle] = useState({});
  const [asideSpacerHeight, setAsideSpacerHeight] = useState(0);

  // Quick enquiry form state
  const [enquiryName, setEnquiryName] = useState("");
  const [enquiryPhone, setEnquiryPhone] = useState("");
  // Auth and Profile/analytics card state
  const { isAuthenticated, user } = useContext(AuthContext) || {};
  const [profileName, setProfileName] = useState("Guest");
  const [recentViews, setRecentViews] = useState(0);
  useEffect(() => {
    try {
      const hasToken = Boolean(localStorage.getItem('myToken') || sessionStorage.getItem('myToken'));
      const deriveName = () => {
        if (!hasToken && !isAuthenticated) return 'Guest';
        if (user?.name || user?.username) return user?.name || user?.username;
        // prefer app-specific keys: agentData / firstName
        try {
          const agentRaw = localStorage.getItem('agentData') || sessionStorage.getItem('agentData');
          if (agentRaw) {
            const agent = JSON.parse(agentRaw);
            if (agent?.name) return agent.name;
          }
        } catch {}
        const firstName = localStorage.getItem('firstName') || sessionStorage.getItem('firstName');
        if (firstName) return firstName;
        const direct = localStorage.getItem('userName') || localStorage.getItem('name') || localStorage.getItem('username') ||
                       sessionStorage.getItem('userName') || sessionStorage.getItem('name') || sessionStorage.getItem('username');
        if (direct) return direct;
        // common JSON blobs
        const candidateKeys = ['user', 'user_data', 'userInfo', 'auth_user', 'profile', 'currentUser'];
        for (const k of candidateKeys) {
          const raw = localStorage.getItem(k) || sessionStorage.getItem(k);
          if (!raw) continue;
          try {
            const obj = JSON.parse(raw);
            const nm = obj?.name || obj?.username || obj?.fullName || (obj?.firstName && obj?.lastName ? `${obj.firstName} ${obj.lastName}` : undefined);
            if (nm) return nm;
          } catch { /* ignore */ }
        }
        return 'Guest';
      };

      const loadCount = () => {
        const raw = localStorage.getItem('viewed_projects');
        const list = raw ? JSON.parse(raw) : [];
        setRecentViews(Array.isArray(list) ? list.length : 0);
      };

      const computeAndSet = () => {
        setProfileName(deriveName());
        loadCount();
      };

      computeAndSet();
      const handler = () => computeAndSet();
      window.addEventListener('viewed-projects-changed', handler);
      window.addEventListener('storage', handler);
      window.addEventListener('auth-changed', handler);
      return () => { window.removeEventListener('viewed-projects-changed', handler); window.removeEventListener('storage', handler); window.removeEventListener('auth-changed', handler); };
    } catch (_) {}
  }, [user, isAuthenticated]);

  // Derived login flag for UI when AuthContext isn't present but storage has identity
  const hasAnyToken = Boolean(
    localStorage.getItem('myToken') || sessionStorage.getItem('myToken') ||
    localStorage.getItem('token') || localStorage.getItem('accessToken') || localStorage.getItem('authToken') ||
    sessionStorage.getItem('token') || sessionStorage.getItem('accessToken') || sessionStorage.getItem('authToken')
  );
  const loggedIn = Boolean(isAuthenticated) || hasAnyToken || (profileName && profileName !== 'Guest');
  const handleEnquirySubmit = useCallback((e) => {
    e.preventDefault();
    const name = enquiryName.trim();
    const phone = enquiryPhone.replace(/\D/g, "");
    if (!name) {
      if (typeof window.toast === 'function') window.toast.warn('Please enter your name');
      return;
    }
    if (!/^\d{10,15}$/.test(phone)) {
      if (typeof window.toast === 'function') window.toast.warn('Please enter a valid phone number');
      return;
    }
    const target = '918500900100'; // default WhatsApp number
    const msg = `Hi, my name is ${name}. I want to enquire about properties. My phone: ${phone}`;
    const url = `https://wa.me/${target}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  }, [enquiryName, enquiryPhone]);

  const handleScroll = useCallback(() => {
    if (!gridSectionRef.current || !asideRef.current || !asideInnerRef.current) return;
    const headerOffset = 96; // adjust to your header height
    const gridRect = gridSectionRef.current.getBoundingClientRect();
    const asideOuterRect = asideRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const start = scrollTop + gridRect.top; // section start (absolute Y)
    const end = start + gridRect.height;    // section end (absolute Y)
    const asideWidth = asideOuterRect.width;
    const asideLeft = asideOuterRect.left + window.scrollX;
    const innerHeight = asideInnerRef.current.offsetHeight;

    // Where should the inner stop (so it doesn't overflow past section end)?
    const maxScrollForFixed = end - innerHeight - headerOffset;

    // Preserve space to avoid layout shift
    setAsideSpacerHeight(innerHeight);

    if (scrollTop >= start - headerOffset && scrollTop <= maxScrollForFixed) {
      // Fixed in viewport
      setAsideStyle({
        position: 'fixed',
        top: `${headerOffset}px`,
        left: `${asideLeft}px`,
        width: `${asideWidth}px`,
      });
    } else if (scrollTop > maxScrollForFixed) {
      // Stick to the bottom of the section
      setAsideStyle({
        position: 'absolute',
        top: 'auto',
        bottom: '0',
        left: '0',
        right: '0',
        width: '100%'
      });
    } else {
      // Normal flow at the top
      setAsideStyle({ position: 'static', width: '100%' });
    }
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [handleScroll]);

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
        setPath("/projects-in-gurugram/");
        break;
      case "Featured":
        setDisplayedProjects(memoizedProjects.featured);
        setPath("/projects/featured/");
        break;
      case "Upcoming":
        setDisplayedProjects(memoizedProjects.upcoming);
        setPath("/projects/upcoming/");
        break;
      case "Commercial":
        setDisplayedProjects(memoizedProjects.commercial.slice(0, 4));
        setPath("/projects/commercial/");
        break;
      case "SCO":
        setDisplayedProjects(memoizedProjects.sco.slice(0, 4));
        setPath("/projects/sco-plots/");
        break;
      case "Affordable":
        setDisplayedProjects(memoizedProjects.affordable.slice(0, 4));
        setPath("/projects-in-gurugram/budget");
        break;
      case "Budget":
        setDisplayedProjects(memoizedProjects.budget);
        setPath("/projects/");
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
    <Wrapper className="section">
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
      {/* Visually hidden H1 for correct heading order without affecting layout */}
      <h1 className="sr-only">100acress Real Estate in Gurgaon – Buy, Rent, Sell & New Launch Projects</h1>
      {/* Main landmark for primary content region */}
      <main id="main-content" role="main">
      
      {/* Confetti Animation */}
      {/* {showConfetti && <ConfettiAllCorners /> */}
      
  {/* <PopupForm onPopupVisibilityChange={handlePopupVisibilityChange} />  */}

   {/* Hero Banner Section with Search Bar Overlay */}
    <HeroBannerWrapper>
      {/* This is the div whose background you want to blur more */}
      <div
        className={`
          transition-filter duration-300 ease-in-out
          ${isPopupActive ? 'blur-sm pointer-events-none select-none' : ''}
        `}
      >
    {/* uper wala backgroiund blur krne ke liye hai yaha se ham background kam ya jada blur manage kr sakte hai */}

          {/* Dynamic Hero Banner */}
          <DynamicHeroBanner />
      </div>

      {/* SearchBar should NOT be blurred */}
      <SearchBarContainer>
        <SearchBar />
      </SearchBarContainer>
    </HeroBannerWrapper>

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

      {/* 80:20 layout from md+: main 80%, sticky aside 20% */}
      <div ref={gridSectionRef} className="w-full max-w-7xl mx-auto px-4 grid grid-cols-1 xl:[grid-template-columns:4fr_1fr] gap-6 relative items-start overflow-visible">
        {/* Sticky Aside (20%) */}
        <aside ref={asideRef} className="hidden xl:block relative xl:col-start-2 xl:row-start-1" style={{ display: typeof window !== 'undefined' && window.innerHeight <= 624 ? 'none' : undefined }}>
          {/* Spacer keeps original height when inner becomes fixed */}
          <div style={{ height: asideSpacerHeight ? `${asideSpacerHeight}px` : undefined }} />
          <div ref={asideInnerRef} style={asideStyle} className="space-y-4">
            {/* Activity Card */}
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm w-full">
              <div className="p-4 md:p-5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-red-100 text-red-700 flex items-center justify-center font-semibold text-sm md:text-base">
                    {profileName?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <div className="min-w-0">
                    <div className="text-gray-900 font-semibold leading-tight truncate text-sm md:text-base">{profileName || 'User'}</div>
                    <div className="text-xs md:text-sm text-gray-500">{loggedIn ? 'Buyer' : 'Guest'}</div>
                  </div>
                </div>
                <div className="mt-4 md:mt-5 text-xs md:text-[13px] font-medium text-gray-700">Your Recent Activity</div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 px-3 md:px-4 py-2.5 md:py-3 rounded-xl bg-amber-50 border border-amber-100">
                    <span className="text-xl md:text-2xl font-bold text-gray-900">{recentViews}</span>
                    <ArrowUpRight size={16} className="text-amber-500" />
                  </div>
                  <div className="text-xs md:text-sm text-gray-600">Viewed</div>
                </div>
                <div className="mt-3 md:mt-4 flex justify-center">
                  {loggedIn ? (
                    <button type="button" onClick={() => { window.location.href = '/activity'; }} className="inline-flex px-4 md:px-5 py-2 md:py-2.5 rounded-lg bg-red-600 text-white text-sm md:text-base font-semibold hover:bg-red-700 transition shadow-sm">View Activity</button>
                  ) : (
                    <button type="button" onClick={() => { setAuthDefaultView('login'); setAuthOpen(true); }} className="inline-flex px-4 md:px-5 py-2 md:py-2.5 rounded-lg bg-red-600 text-white text-sm md:text-base font-semibold hover:bg-red-700 transition shadow-sm">Login / Register</button>
                  )}
                </div>
              </div>
            </div>

            {/* Post Property - styled like reference with large image and floating CTA */}
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm w-full overflow-hidden">
              <div className="p-4 md:p-5 pb-8">
                {/* Header */}
                <div className="flex items-center justify-center gap-2 text-gray-900">
                  <HomeIcon size={18} className="text-red-600" />
                  <span className="font-bold text-sm md:text-base">Post Property</span>
                </div>
                {/* Subtitle */}
                
                {/* Image block with button immediately below */}
                <div className="mt-3">
                  <img
                    src="https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/festival-images/new-year-offer-image.webp"
                    alt="Post property illustration"
                    className="w-full h-auto object-contain max-h-44 md:max-h-56"
                    loading="lazy"
                    onError={(e) => { e.currentTarget.src = '/Images/logo.png'; }}
                  />
                  <div className="mt-0 flex justify-center">
                    <button
                      onClick={() => {
                        const token = localStorage.getItem("myToken");
                        if (token) {
                          window.location.href = "/postproperty";
                        } else {
                          setAuthDefaultView('login');
                          setAuthOpen(true);
                        }
                      }}
                      className="inline-flex px-5 md:px-6 py-2.5 md:py-3 rounded-xl bg-red-600 text-white text-xs md:text-sm font-semibold shadow hover:bg-gray-800"
                    >
                      Post Property FREE
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Enquiry card removed as per request */}
          </div>
        </aside>

        {/* Main content */}
        <div className="relative z-0 md:col-start-1 md:row-start-1 max-w-[1000px]">
          {TrendingProjects.length === 0 ? <CustomSkeleton /> : (
            <div data-aos="fade-up"
              data-aos-duration="1000" className="py-0 mt-3 w-full">
                <br />
              <div className="flex items-center justify-between mx-3 lg:mx-6 xl:mx-14 md:mx-6">
                <div className="flex items-center gap-3">
                  <div className="w-1 h-12 bg-gradient-to-b from-red-500 to-red-600 rounded-full"></div>
                  <h2 className="text-2xl xl:text-4xl lg:text-3xl md:text-2xl text-[#111] font-bold">
                    {`${activeFilter}`} Properties in Gurugram and Delhi NCR
                  </h2>
                </div>
              </div>


        {/* <div ref={setRef("delhi")} data-section="delhi" style={{ height: "10px" }}></div>
        <div>
          {ProjectinDelhi.length === 0 ? <CustomSkeleton /> : (
            <CommonProject data={ProjectinDelhi} title="Top Projects in Delhi" animation="zoom-out-left" path="/project-in-delhi/" />
          )}
        </div> */}

        {/* Projects in Dubai */}
        {/* <div ref={setRef("dubai")} data-section="dubai" style={{ height: "10px" }}></div>
        <div>
          {DubaiProjects.length === 0 ? <CustomSkeleton /> : (
              {/* Filter Buttons */}
              <div className="flex items-center justify-start gap-2 sm:gap-3 mx-2 sm:mx-3 md:mx-6 xl:ml-14 pt-2 overflow-x-auto no-scrollbar whitespace-nowrap snap-x snap-mandatory scroll-px-3">

                
                <button
                  onClick={() => setActiveFilter("Trending")}
                  className={`px-3 py-2 sm:px-4 sm:py-2 rounded-full text-sm sm:text-xs font-medium transition-all duration-300 flex-shrink-0 snap-start ${
                    activeFilter === "Trending" 
                      ? "bg-black text-white shadow-lg" 
                      : "bg-white border-2 border-gray-200 text-gray-800 hover:bg-gray-100 hover:border-gray-300"
                  }`}
                >
                  Trending
                </button>
                <button
                  onClick={() => setActiveFilter("Featured")}
                  className={`px-3 py-2 sm:px-4 sm:py-2 rounded-full text-sm sm:text-xs font-medium transition-all duration-300 flex-shrink-0 snap-start ${
                    activeFilter === "Featured" 
                      ? "bg-black text-white shadow-lg" 
                      : "bg-white border-2 border-gray-200 text-gray-800 hover:bg-gray-100 hover:border-gray-300"
                  }`}
                >
                  Featured
                </button>
                <button
                  onClick={() => setActiveFilter("Upcoming")}
                  className={`px-3 py-2 sm:px-4 sm:py-2 rounded-full text-sm sm:text-xs font-medium transition-all duration-300 flex-shrink-0 snap-start ${
                    activeFilter === "Upcoming" 
                      ? "bg-black text-white shadow-lg" 
                      : "bg-white border-2 border-gray-200 text-gray-800 hover:bg-gray-100 hover:border-gray-300"
                  }`}
                >
                  Upcoming
                </button>
                <button
                  onClick={() => setActiveFilter("Commercial")}
                  className={`px-3 py-2 sm:px-4 sm:py-2 rounded-full text-sm sm:text-xs font-medium transition-all duration-300 flex-shrink-0 snap-start ${
                    activeFilter === "Commercial" 
                      ? "bg-black text-white shadow-lg" 
                      : "bg-white border-2 border-gray-200 text-gray-800 hover:bg-gray-100 hover:border-gray-300"
                  }`}
                >
                  Commercial
                </button>
                <button
                  onClick={() => setActiveFilter("Affordable")}
                  className={`px-3 py-2 sm:px-4 sm:py-2 rounded-full text-sm sm:text-xs font-medium transition-all duration-300 flex-shrink-0 snap-start ${
                    activeFilter === "Affordable" 
                      ? "bg-black text-white shadow-lg" 
                      : "bg-white border-2 border-gray-200 text-gray-800 hover:bg-gray-100 hover:border-gray-300"
                  }`}
                >
                  Affordable
                </button>
                <button
                  onClick={() => setActiveFilter("SCO")}
                  className={`px-3 py-2 sm:px-4 sm:py-2 rounded-full text-sm sm:text-xs font-medium transition-all duration-300 flex-shrink-0 snap-start ${
                    activeFilter === "SCO" 
                      ? "bg-black text-white shadow-lg" 
                      : "bg-white border-2 border-gray-200 text-gray-800 hover:bg-gray-100 hover:border-gray-300"
                  }`}
                >
                  SCO
                </button>
                <button
                  onClick={() => setActiveFilter("Budget")}
                  className={`px-3 py-2 sm:px-4 sm:py-2 rounded-full text-sm sm:text-xs font-medium transition-all duration-300 flex-shrink-0 snap-start ${
                    activeFilter === "Budget" 
                      ? "bg-black text-white shadow-lg" 
                      : "bg-white border-2 border-gray-200 text-gray-800 hover:bg-gray-100 hover:border-gray-300"
                  }`}
                >
                  Budget
                </button>
                <button
                  onClick={() => setActiveFilter("Luxury")}
                  className={`px-3 py-2 sm:px-4 sm:py-2 rounded-full text-sm sm:text-xs font-medium transition-all duration-300 flex-shrink-0 snap-start ${
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


              {/* Display Filtered Projects (compact sizing) */}
              <CommonProject
                data={displayedProjects}
                animation="fade-up"
                compact
              />
            </div>
          )
          }

          <div>
            {/* Upcoming Projects */}
            <div ref={setRef("upcoming")} data-section="upcoming" style={{ height: "10px" }}></div>
            <div>
              {UpcomingProjects.length === 0 ? <CustomSkeleton /> : (
                <CommonProject data={UpcomingProjects} title="New Launch Housing Projects in Gurgaon" animation="fade-down" path={"/projects/newlaunch/"} compact />
              )}
            </div>

            {/* Luxury Projects */}
            <div ref={setRef("luxury")} data-section="luxury" style={{ height: "10px" }}></div>
            <div>
              {LuxuryAllProject.length === 0 ? <CustomSkeleton /> : (
                <CommonProject data={LuxuryAllProject.slice(0, 4)} title="Top Luxury Apartments For You" animation="fade-up" path={"/top-luxury-projects/"} compact />
              )}
            </div>

            <Builderaction />
            {/* Budget Projects */}
            <div ref={setRef("budget")} data-section="budget" style={{ height: "10px" }}></div>
            <div>
              {BudgetHomesProjects.length === 0 ? <CustomSkeleton /> : (
                <CommonProject data={BudgetHomesProjects} title="Best Budget Projects in Gurugram" animation="flip-left" compact />
              )}
            </div>

            {/* Sco Plots */}
            <div ref={setRef("SCO")} data-section="SCO" style={{ height: "10px" }}></div>
            <div>
              {SCOProjects.length === 0 ? <CustomSkeleton /> : (
                <CommonProject data={SCOProjects.slice(0, 4)} title="SCO Projects in Gurugram" animation="flip-left" path="/projects/sco-plots/" compact />
              )}
            </div>

            <SpacesAvailable />
            <BudgetPlotsInGurugraon />

            {/* Commercial Pojects  */}
            <div ref={setRef("commercial")} data-section="commercial" style={{ height: "10px" }}></div>
            <div>
              {CommercialProjects.length === 0 ? <CustomSkeleton /> : (
                <CommonProject data={CommercialProjects.slice(0, 4)} title="Commercial Projects in Delhi NCR" animation="fade-down" path="/projects/commercial/" compact />
              )}
            </div>

            {/* <TopSeoPlots /> */}

            {/* Feature Projects */}
            <div ref={setRef("feature")} data-section="feature" style={{ height: "10px" }}></div>
            <div>
              {FeaturedProjects.length === 0 ? <CustomSkeleton /> : (
                <CommonProject data={FeaturedProjects.slice(0, 8)} title="Top Featured Projects" animation="flip-left" path="/projects-in-gurugram/" compact />
              )}
            </div>

            <div ref={setRef("delhi")} data-section="delhi" style={{ height: "10px" }}></div>
            <div>
              {ProjectinDelhi.length === 0 ? <CustomSkeleton /> : (
                <CommonProject data={ProjectinDelhi} title="Top Projects in Delhi" animation="zoom-out-left" path="/projects-in-delhi/" compact />
              )}
            </div>

            {/* Projects in Dubai */}
            {/* <div ref={setRef("dubai")} data-section="dubai" style={{ height: "10px" }}></div>
            <div>
              {DubaiProjects.length === 0 ? <CustomSkeleton /> : (
                <CommonProject data={DubaiProjects} title="Projects in Dubai" animation="zoom-out-left" path="/united-arab-emirates/" compact />
              )}
            </div> */}

            <Cities />

            {/* Affordable homes  */}
            <div ref={setRef("affordable")} data-section="affordable" style={{ height: "10px" }}></div>
            <div>
              {AffordableProjects.length === 0 ? <CustomSkeleton /> : (
                <CommonProject data={AffordableProjects.slice(0, 4)} title="Affordable Homes in Gurgaon" animation="fade-up" path="/projects-in-gurugram/" compact />
              )}
            </div>

            <Builder />


            <OurServices />
            <WhyChoose />
 
            {/* <Snapshot /> */}
        </div>
       </div>
       {/* Close outer relative wrapper for grid section */}
       </div>

       {/* Auth Modal for login/register */}
        <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} defaultView={authDefaultView} />
 
        {/* Mobile Sticky Post Property Card - Right Side Center */}
        {isSmallerThan768 && (
          <div className="fixed right-0 top-1/2 -translate-y-1/2 z-[9999] xl:hidden">
            <button
              onClick={() => {
                const token = localStorage.getItem("myToken");
                if (token) {
                  window.location.href = "/postproperty";
                } else {
                  setAuthDefaultView('login');
                  setAuthOpen(true);
                }
              }}
              className="bg-red-600 text-white font-bold text-sm px-3 py-6 rounded-l-2xl shadow-2xl hover:bg-red-700 transition-all duration-300 flex flex-col items-center justify-center leading-tight"
            >
              <span>P</span>
              <span>O</span>
              <span>S</span>
              <span>T</span>
              <span className="my-1"></span>
              <span className="my-1"></span>
              <span>P</span>
              <span>R</span>
              <span>O</span>
              <span>P</span>
              <span>E</span>
              <span>R</span>
              <span>T</span>
              <span>Y</span>
            </button>
          </div>
        )}

        {/* Place FormHome below the two-column layout */}
        {/* <FormHome /> */}
 
        <PossessionProperty />
        <BackToTopButton />
        {/* Floating YouTube Shorts (Home page only) */}
        <FloatingShorts />
 
        {/* <Footer /> */}
      </div> {/* Closing div for the blur container */}
      <Footer />
 
      </main>
    </Wrapper>
  );
 
 }
 
 export default Home;

const HeroBannerWrapper = styled.div`
  position: relative;
  width: 100%;
  
  @media (max-width: 768px) {
    margin-bottom: 20px; /* Space for tablet search bar */
  }

  @media (max-width: 640px) {
    margin-bottom: 325px; /* Extra space for mobile search bar that extends below banner */
  }
`;

const SearchBarContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem 1rem 0.25rem;
  z-index: 10;
  margin-top: 0;

  @media (max-width: 768px) {
    position: absolute;
    bottom: 20px; /* Position inside the hero banner - ADJUST THIS VALUE to move up/down */
    left: 0;
    right: 0;
    padding: 0 1rem;
    margin-top: 0;
    z-index: 100;
    transform: none;
  }

  @media (max-width: 640px) {
    bottom: -325px; /* ADJUST THIS VALUE for smaller screens */
  }
`;
 
 const Wrapper = styled.div`
  /* Neutral background */
  background: #ffffff;
  position: relative;
  z-index: 1;
  width: 100%;
  overflow: hidden; 
  
  /* Container for content that needs to be full width */
  .content-wrapper {
    width: 100%;
    max-width: 100%;
    overflow-x: visible;
    position: relative;
  }
 
   /* Suppress nested vertical scrollbars within Home page only */
  & *[style*="overflow-y: auto"],
  & *[style*="overflow-y:auto"],
  & *[class*="overflow-y-auto"],
  & *[class*="overflow-y-scroll"] {
    overflow-y: visible !important;
    max-height: none !important;
  }

   
   /* Static hero styles removed - now using DynamicHeroBanner component */
 
   /* Remove top fade overlay */
  .hero-strip-99::before {
    content: none;
    display: none;
  }
 
   @media (max-width: 640px) {
     .hero-strip-99 {
       margin-top: 0; /* removed margin-top to ensure hero starts from top on mobile */
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
     right: 0; /* keep container within viewport */
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
     right: 0; /* avoid pushing outside viewport */
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