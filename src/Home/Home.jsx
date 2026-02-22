import React, { Suspense, useCallback, useEffect, useMemo, useRef, useState, useContext } from "react";
// import PopupForm from "./HomePages/PopupForm";
import Cities from "./Cities/Cities";
// import FormHome from "../Components/HomePageComponents/FormHome";
import WhyChoose from "./WhyChoose/WhyChoose";
import SpacesAvailable from "../Components/HomePageComponents/Spaces";
import SearchBar from "./SearchBar/SearchBar";
import styled from "styled-components";
import OurServices from "./Services/ourServices";
import { Helmet } from "react-helmet";
// import Footer from "../Components/Actual_Components/Footer";
import Footer from "../Components/Actual_Components/Footer";
import AuthModal from "../Resister/AuthModal";
import { Link } from "react-router-dom";
// import BackToTopButton from "./BackToTopButton";
// import PossessionProperty from "../Components/PossessionProperty";
import { useMediaQuery } from "@chakra-ui/react";
import { EyeIcon, HomeIcon, MessageCircle, PhoneIcon, User as UserIcon, ArrowUpRight } from "lucide-react";
import ModernRecommendedSection from "./Recomended/ModernRecommendedSection";
import AOS from 'aos';
import 'aos/dist/aos.css';
import CustomSkeleton from "../Utils/CustomSkeleton";
import CommonProject from "../Utils/CommonProject";
// import Builderaction from "./HomePages/Builderaction";
import Api_Service from "../Redux/utils/Api_Service";
import { useSelector } from "react-redux";
// import Chatbot from "../Components/HomePageComponents/Chatbot";
import { AuthContext } from "../AuthContext";
// import FloatingShorts from "../aadharhomes/BannerPage/updatedbannerpage/components/youtubeshorts";
import DynamicHeroBanner from "./HeroBanner/largebanner/DynamicHeroBanner";
import DynamicSideBanner from "./sidehomebanner";
import TestimonialIndex from "./Testimonial";
import BlogIndex from "./Blog/index";
// import Tesimonial from "../Components/HomePageComponents/Tesimonial";

// Lazy load heavy components
const BudgetPlotsInGurugraon = React.lazy(() => import("../Pages/BudgetPlotsInGurugraon"));
const Builder = React.lazy(() => import("./Builder/Builder"));

// Generic Projects Slider Component with navigation and auto-scroll (mobile only)
const ProjectsSlider = React.memo(({ projects, title, animation, path, compact = true }) => {
  const scrollRef = useRef(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const autoScrollIntervalRef = useRef(null);

  // Check screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleScroll = () => {
    if (scrollRef.current) {
      setShowLeftButton(scrollRef.current.scrollLeft > 0);
    }
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 286; // Card width (260px) + gap (16px) + extra margin (10px)
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
      // Pause auto-scroll when user manually scrolls
      setIsAutoScrolling(false);
      setTimeout(() => setIsAutoScrolling(true), 5000);
    }
  };

  const startAutoScroll = () => {
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
    }
    
    autoScrollIntervalRef.current = setInterval(() => {
      if (scrollRef.current && isAutoScrolling && isMobile) {
        const maxScroll = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
        const currentScroll = scrollRef.current.scrollLeft;
        
        if (currentScroll >= maxScroll - 10) {
          // Reached the end, scroll back to start
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          // Scroll to next card
          scrollRef.current.scrollBy({ left: 286, behavior: 'smooth' });
        }
      }
    }, 3000); // Auto-scroll every 3 seconds
  };

  const stopAutoScroll = () => {
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container && isMobile) {
      container.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial check
      
      // Start auto-scroll
      startAutoScroll();
      
      return () => {
        container.removeEventListener('scroll', handleScroll);
        stopAutoScroll();
      };
    }
  }, [isMobile]);

  // Desktop view: show grid layout
  if (!isMobile) {
    return (
      <CommonProject 
        data={projects.slice(0, 4)} 
        title={title} 
        animation={animation} 
        path={path} 
        compact={compact} 
      />
    );
  }

  // Mobile view: show horizontal scrolling
  return (
    <div>
      {/* Static Title */}
      <div className="relative flex flex-col items-center justify-center text-center mb-4 mt-6 px-4">
        <h2 className="text-2xl xl:text-4xl lg:text-3xl md:text-2xl text-[#111] font-bold font-['Rubik',sans-serif] mb-3">
          {title}
        </h2>
        <div className="h-1.5 w-32 bg-gradient-to-r from-red-500 to-red-600 rounded-full"></div>
      </div>
      
      {/* Scrollable Content */}
      <div className="relative group">
        <div
          ref={scrollRef}
          className="overflow-x-auto scrollbar-hide py-4"
          style={{ width: '100%', scrollBehavior: 'smooth' }}
        >
          <div className="flex w-full">
            <CommonProject
              data={projects}
              animation={animation}
              path={path}
              compact={compact}
              showGrid={false}
              slideView={true}
              hideHeader={true}
            />
          </div>
        </div>
        
        {/* Right Gradient Overlay */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white/50 to-transparent z-[5] pointer-events-none"></div>

        {/* Next Button */}
        {projects.length > 0 && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-800 transition-colors duration-300 z-10 shadow-lg"
            aria-label="Next projects"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        )}
        
        {/* Previous Button */}
        {projects.length > 0 && showLeftButton && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-800 transition-colors duration-300 z-10 shadow-lg"
            aria-label="Previous projects"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
});

// Commercial Projects Slider Component with navigation and auto-scroll (mobile only)
const CommercialProjectsSlider = React.memo(({ projects }) => {
  const scrollRef = useRef(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const autoScrollIntervalRef = useRef(null);

  // Check screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleScroll = () => {
    if (scrollRef.current) {
      setShowLeftButton(scrollRef.current.scrollLeft > 0);
    }
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 286; // Card width (260px) + gap (16px) + extra margin (10px)
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
      // Pause auto-scroll when user manually scrolls
      setIsAutoScrolling(false);
      setTimeout(() => setIsAutoScrolling(true), 5000);
    }
  };

  const startAutoScroll = () => {
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
    }
    
    autoScrollIntervalRef.current = setInterval(() => {
      if (scrollRef.current && isAutoScrolling && isMobile) {
        const maxScroll = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
        const currentScroll = scrollRef.current.scrollLeft;
        
        if (currentScroll >= maxScroll - 10) {
          // Reached the end, scroll back to start
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          // Scroll to next card
          scrollRef.current.scrollBy({ left: 286, behavior: 'smooth' });
        }
      }
    }, 3000); // Auto-scroll every 3 seconds
  };

  const stopAutoScroll = () => {
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container && isMobile) {
      container.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial check
      
      // Start auto-scroll
      startAutoScroll();
      
      return () => {
        container.removeEventListener('scroll', handleScroll);
        stopAutoScroll();
      };
    }
  }, [isMobile]);

  // Desktop view: show grid layout
  if (!isMobile) {
    return (
      <CommonProject 
        data={projects.slice(0, 4)} 
        title="Commercial Projects in Delhi NCR" 
        animation="fade-down" 
        path="/projects/commercial/" 
        compact 
      />
    );
  }

  // Mobile view: show horizontal scrolling
  return (
    <div>
      {/* Static Title */}
      <div className="relative flex flex-col items-center justify-center text-center mb-4 mt-6 px-4">
        <h2 className="text-2xl xl:text-4xl lg:text-3xl md:text-2xl text-[#111] font-bold font-['Rubik',sans-serif] mb-3">
          Commercial Projects in Delhi NCR
        </h2>
        <div className="h-1.5 w-32 bg-gradient-to-r from-red-500 to-red-600 rounded-full"></div>
      </div>
      
      {/* Scrollable Content */}
      <div className="relative group">
        <div
          ref={scrollRef}
          className="overflow-x-auto scrollbar-hide py-4"
          style={{ width: '100%', scrollBehavior: 'smooth' }}
        >
          <div className="flex w-full">
            <CommonProject
              data={projects}
              animation="fade-down"
              path="/projects/commercial/"
              compact
              showGrid={false}
              slideView={true}
              hideHeader={true}
            />
          </div>
        </div>
        
        {/* Right Gradient Overlay */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white/50 to-transparent z-[5] pointer-events-none"></div>

        {/* Next Button */}
        {projects.length > 0 && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-800 transition-colors duration-300 z-10 shadow-lg"
            aria-label="Next projects"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        )}
        
        {/* Previous Button */}
        {projects.length > 0 && showLeftButton && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-800 transition-colors duration-300 z-10 shadow-lg"
            aria-label="Previous projects"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
});

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
  const [isFirstLoad, setIsFirstLoad] = useState(true);

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
  const [asideStyle, setAsideStyle] = useState({
    opacity: '0',
    visibility: 'hidden',
    transition: 'opacity 0.3s ease-in-out, visibility 0.3s ease-in-out'
  });
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
        } catch { }
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
    } catch (_) { }
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
      // Fixed in viewport - banner appears when left section starts
      setAsideStyle({
        position: 'fixed',
        top: `${headerOffset}px`,
        left: `${asideLeft}px`,
        width: `${asideWidth}px`,
        opacity: '1',
        visibility: 'visible',
        transition: 'opacity 0.3s ease-in-out, visibility 0.3s ease-in-out'
      });
    } else if (scrollTop > maxScrollForFixed) {
      // Stick to the bottom of the section
      setAsideStyle({
        position: 'absolute',
        top: 'auto',
        bottom: '0',
        left: '0',
        right: '0',
        width: '100%',
        opacity: '1',
        visibility: 'visible',
        transition: 'opacity 0.3s ease-in-out, visibility 0.3s ease-in-out'
      });
    } else {
      // Normal flow at the top - banner hidden until left section appears
      setAsideStyle({
        position: 'static',
        width: '100%',
        opacity: '0',
        visibility: 'hidden',
        transition: 'opacity 0.3s ease-in-out, visibility 0.3s ease-in-out'
      });
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
  const NewLaunchProjects = useSelector(store => store?.allsectiondata?.newlaunch) || [];
  const FarmhouseProjects = useSelector(store => {
    const data = store?.allsectiondata?.farmhouse || [];
    console.log('🏡 Redux Store State - All Section Data:', store?.allsectiondata);
    console.log('🏡 Redux Store State - Farmhouse:', data);
    return data;
  });

  const { getTrending, getFeatured, getUpcoming, getCommercial, getAffordable, getLuxury, getScoplots, getBudgetHomes, getProjectIndelhi, getAllProjects, getProjectbyState, getFarmhouse } = Api_Service();
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
  const [trendingPage, setTrendingPage] = useState(0);
  const trendingScrollRef = useRef(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [isTrendingHovered, setIsTrendingHovered] = useState(false);

  // Auto-scroll logic for Trending Projects
  useEffect(() => {
    let interval;
    if (activeFilter === "Trending" && !isTrendingHovered && TrendingProjects.length > 0) {
      interval = setInterval(() => {
        if (trendingScrollRef.current) {
          const { scrollLeft, scrollWidth, clientWidth } = trendingScrollRef.current;
          const maxScroll = scrollWidth - clientWidth;

          if (scrollLeft >= maxScroll - 5) { // Near the end
            trendingScrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            // Scroll by card width + gap ≈ 286px
            trendingScrollRef.current.scrollBy({ left: 286, behavior: 'smooth' });
          }
        }
      }, 3000); // 3 seconds interval
    }
    return () => clearInterval(interval);
  }, [activeFilter, isTrendingHovered, TrendingProjects.length]);

  const handleTrendingScroll = () => {
    if (trendingScrollRef.current) {
      setShowLeftButton(trendingScrollRef.current.scrollLeft > 0);
    }
  };

  const featuredScrollRef = useRef(null);
  const [showFeaturedLeftButton, setShowFeaturedLeftButton] = useState(false);

  const handleFeaturedScroll = () => {
    if (featuredScrollRef.current) {
      setShowFeaturedLeftButton(featuredScrollRef.current.scrollLeft > 0);
    }
  };

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

  // Fetch new launch projects for the dedicated section
  useEffect(() => {
    if (!NewLaunchProjects || NewLaunchProjects.length === 0) {
      getAllProjects("newlaunch", 4);
    }
  }, [NewLaunchProjects]);

  // Fetch upcoming projects for the dedicated section
  useEffect(() => {
    if (!UpcomingProjects || UpcomingProjects.length === 0) {
      getUpcoming();
    }
  }, [UpcomingProjects]);

  // Set the displayed projects based on the active filter
  useEffect(() => {
    switch (activeFilter) {
      case "Trending":
        setDisplayedProjects(memoizedProjects.trending.slice(0, 4));
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

  // Fast loading state - only 300ms to hide white space
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFirstLoad(false);
    }, 300); // Very fast - just enough to hide white flash

    return () => clearTimeout(timer);
  }, []);

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
              if (section === "Farmhouses" && FarmhouseProjects.length === 0) {
                console.log("🏡 Fetching Farmhouse Projects...");
                getAllProjects("farmhouse", 8);
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
  }, [UpcomingProjects, LuxuryProjects, BudgetHomesProjects, SCOProjects, ProjectinDelhi, DubaiProjects, FarmhouseProjects]);

  // console.log(resalesectionvisible,"section")



  return (
    <Wrapper className="section">
      <Helmet>
        <meta
          name="description"
          content="100acress helps you buy residential & commercial property anywhere in India. Browse verified listings, expert support & best prices across major cities."
        />
        <title>
          100acress.com - Buy Property in India & Dubai | Trusted Real Estate Platform
        </title>
        <link rel="canonical" href="https://www.100acress.com/" />
      </Helmet>
      {/* Visually hidden H1 for correct heading order without affecting layout */}
      <h1 className="sr-only">100acress Real Estate in Gurgaon – Buy, Rent, Sell & New Launch Projects</h1>
      {/* Main landmark for primary content region */}
      <main id="main-content" role="main">

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
      `}>

          {/* Minimal loading state to prevent white space */}
          {isFirstLoad && (
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
              <div className="animate-pulse">
                <div className="h-32 bg-gray-100"></div>
                <div className="h-64 bg-gray-50"></div>
                <div className="h-32 bg-gray-100"></div>
              </div>
            </div>
          )}

          <div className={isFirstLoad ? 'opacity-0 absolute' : 'opacity-100 relative'}>
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
                {/* Dynamic Side Banner */}
                <DynamicSideBanner />
              </div>
            </aside>

            {/* Main content */}
            <div className="relative z-0 md:col-start-1 md:row-start-1 max-w-[1000px]">
              {TrendingProjects.length === 0 ? <CustomSkeleton /> : (
                <div data-aos="fade-up"
                  data-aos-duration="1000" className="py-0 mt-3 w-full">
                  <div className="flex flex-col items-center justify-center mx-auto text-center mb-4 mt-6">
                    <h2 className="text-2xl xl:text-4xl lg:text-3xl md:text-2xl text-[#111] font-bold mb-3">
                      {`${activeFilter}`} Projects in Gurugram, Delhi and Noida
                    </h2>
                    <div className="h-1.5 w-32 bg-gradient-to-r from-red-500 to-red-600 rounded-full"></div>
                  </div>

                  {/* Filter Buttons */}
                  {/* <div className="flex items-center justify-start gap-2 sm:gap-3 mx-2 sm:mx-3 md:mx-6 xl:ml-14 pt-2 overflow-x-auto no-scrollbar whitespace-nowrap snap-x snap-mandatory scroll-px-3">

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
                </div> */}

                  {/* Display Filtered Projects (compact sizing) */}
                  {/* Display Filtered Projects (compact sizing) */}
                  {activeFilter === "Trending" ? (
                    <div
                      className="relative group"
                      onMouseEnter={() => setIsTrendingHovered(true)}
                      onMouseLeave={() => setIsTrendingHovered(false)}
                    >
                      <div
                        ref={trendingScrollRef}
                        onScroll={handleTrendingScroll}
                        className="overflow-x-auto scrollbar-hide py-4"
                        style={{ width: '100%', scrollBehavior: 'smooth' }}
                      >
                        <div className="flex w-full">
                          <CommonProject
                            data={TrendingProjects}
                            animation="fade-up"
                            compact
                            showGrid={false}
                            slideView={true}
                          />
                        </div>
                      </div>
                      {/* Right Gradient Overlay */}
                      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white/50 to-transparent z-[5] pointer-events-none"></div>

                      {TrendingProjects.length > 0 && (
                        <button
                          onClick={() => {
                            if (trendingScrollRef.current) {
                              // Scroll by card width (260px) + gap (16px) + 10px for extra margin = 286px
                              trendingScrollRef.current.scrollBy({ left: 286, behavior: 'smooth' });
                            }
                          }}
                          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-800 transition-colors duration-300 z-10 shadow-lg"
                          aria-label="Next projects"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-5 h-5"
                          >
                            <polyline points="9 18 15 12 9 6"></polyline>
                          </svg>
                        </button>
                      )}
                      {TrendingProjects.length > 0 && showLeftButton && (
                        <button
                          onClick={() => {
                            if (trendingScrollRef.current) {
                              // Scroll back by card width (260px) + gap (16px) + 10px for extra margin = 286px
                              trendingScrollRef.current.scrollBy({ left: -286, behavior: 'smooth' });
                            }
                          }}
                          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-800 transition-colors duration-300 z-10 shadow-lg"
                          aria-label="Previous projects"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-5 h-5"
                          >
                            <polyline points="15 18 9 12 15 6"></polyline>
                          </svg>
                        </button>
                      )}
                    </div>
                  ) : (
                    <CommonProject
                      data={displayedProjects}
                      animation="fade-up"
                      compact
                    />
                  )}
                </div>
              )}
              <div>
                {console.log("Upcoming Projects Data:", UpcomingProjects)}
                {UpcomingProjects.length === 0 ? <CustomSkeleton /> : (
                  <ProjectsSlider 
                    projects={UpcomingProjects} 
                    title="New Launch Projects in Gurgaon" 
                    animation="fade-down" 
                    path={"/projects/newlaunch/"} 
                    compact 
                  />
                )}
              </div>

              {/* Luxury Projects */}
              <div ref={setRef("luxury")} data-section="luxury" style={{ height: "10px" }}></div>
              <div>
                {LuxuryAllProject.length === 0 ? <CustomSkeleton /> : (
                  <ProjectsSlider 
                    projects={LuxuryAllProject} 
                    title="Top Luxury Apartments For You" 
                    animation="fade-up" 
                    path={"/top-luxury-projects/"} 
                    compact 
                  />
                )}
              </div>

              {/* <Builderaction /> */}
              {/* Budget Projects */}
              <div ref={setRef("budget")} data-section="budget" style={{ height: "10px" }}></div>
              <div>
                {BudgetHomesProjects.length === 0 ? <CustomSkeleton /> : (
                  <ProjectsSlider 
                    projects={BudgetHomesProjects} 
                    title="Best Budget Projects in Gurugram" 
                    animation="flip-left" 
                    compact 
                  />
                )}
              </div>

              {/* Sco Plots */}
              <div ref={setRef("SCO")} data-section="SCO" style={{ height: "10px" }}></div>
              <div>
                {SCOProjects.length === 0 ? <CustomSkeleton /> : (
                  <ProjectsSlider 
                    projects={SCOProjects} 
                    title="SCO Projects in Gurugram" 
                    animation="flip-left" 
                    path="/projects/sco-plots/" 
                    compact 
                  />
                )}
              </div>
              {/* farmhouses */}

              <div ref={setRef("Farmhouses")} data-section="Farmhouses" style={{ height: "10px" }}></div>
              <div>
                {console.log("🏡 Farmhouse Projects Data:", FarmhouseProjects, "Length:", FarmhouseProjects.length)}
                {FarmhouseProjects.length === 0 ? <CustomSkeleton /> : (
                  <ProjectsSlider 
                    projects={FarmhouseProjects} 
                    title="Naugaon Farm Houses" 
                    animation="flip-left" 
                    path="/projects/farmhouses/" 
                    compact 
                  />
                )}
              </div>

              <SpacesAvailable />
              <Suspense fallback={<CustomSkeleton />}>
                <BudgetPlotsInGurugraon />
              </Suspense>

              {/* Commercial Projects */}
              <div ref={setRef("commercial")} data-section="commercial" style={{ height: "10px" }}></div>
              <div>
                {CommercialProjects.length === 0 ? <CustomSkeleton /> : (
                  <CommercialProjectsSlider projects={CommercialProjects} />
                )}
              </div>

              {/* <TopSeoPlots /> */}

              {/* Feature Projects */}
              <div ref={setRef("feature")} data-section="feature" style={{ height: "10px" }}></div>
              <div>
                {FeaturedProjects.length === 0 ? <CustomSkeleton /> : (
                  <div className="relative group">
                    {/* Header outside scroll container */}
                    <div className="relative flex flex-col items-center justify-center text-center mb-4 mt-6 px-4">
                      <h2 className="text-2xl xl:text-4xl lg:text-3xl md:text-2xl text-[#111] font-bold font-['Rubik',sans-serif] mb-3">
                        Top Featured Projects
                      </h2>
                      <div className="h-1.5 w-32 bg-gradient-to-r from-red-500 to-red-600 rounded-full"></div>
                      {/* <div className="absolute right-3 lg:right-6 xl:right-14 hidden sm:block">
                        <Link to="/projects-in-gurugram/" target="_top">
                          <span className="flex items-center text-white text-sm px-3 py-1.5 rounded-full bg-red-600 shadow-lg hover:shadow-xl transition-all duration-300">
                            <EyeIcon size={16} />
                            <span className="ml-2">View All</span>
                          </span>
                        </Link>
                      </div> */}
                    </div>

                    <div
                      ref={featuredScrollRef}
                      onScroll={handleFeaturedScroll}
                      className="overflow-x-auto scrollbar-hide py-4"
                      style={{ width: '100%', scrollBehavior: 'smooth' }}
                    >
                      <div className="flex w-full">
                        <CommonProject
                          data={FeaturedProjects}
                          // Title removed here, handled above
                          animation="flip-left"
                          // Path removed here, handled above
                          compact
                          showGrid={false}
                          slideView={true}
                          hideHeader={true}
                        />
                      </div>
                    </div>
                    {/* Right Gradient Overlay */}
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white/50 to-transparent z-[5] pointer-events-none"></div>

                    {FeaturedProjects.length > 0 && (
                      <button
                        onClick={() => {
                          if (featuredScrollRef.current) {
                            featuredScrollRef.current.scrollBy({ left: 276, behavior: 'smooth' });
                          }
                        }}
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-800 transition-colors duration-300 z-10 shadow-lg"
                        aria-label="Next featured projects"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-5 h-5"
                        >
                          <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                      </button>
                    )}

                    {FeaturedProjects.length > 0 && showFeaturedLeftButton && (
                      <button
                        onClick={() => {
                          if (featuredScrollRef.current) {
                            featuredScrollRef.current.scrollBy({ left: -276, behavior: 'smooth' });
                          }
                        }}
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-800 transition-colors duration-300 z-10 shadow-lg"
                        aria-label="Previous featured projects"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-5 h-5"
                        >
                          <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* <div ref={setRef("delhi")} data-section="delhi" style={{ height: "10px" }}></div> */}
              {/* <div>
                {ProjectinDelhi.length === 0 ? <CustomSkeleton /> : (
                  <CommonProject data={ProjectinDelhi} title="Top Projects in Delhi" animation="zoom-out-left" path="/projects-in-delhi/" compact />
                )}
              </div> */}

              {/* Projects in Dubai */}
              {/* <div ref={setRef("dubai")} data-section="dubai" style={{ height: "10px" }}></div>
              <div>
                {DubaiProjects.length === 0 ? <CustomSkeleton /> : (
                  <CommonProject data={DubaiProjects} title="Projects in Dubai" animation="zoom-out-left" path="/united-arab-emirates/" compact />
                )}
              </div> */}

              <Cities />

              {/* Affordable homes  */}
              {/* <div ref={setRef("affordable")} data-section="affordable" style={{ height: "10px" }}></div>
              <div>
                {AffordableProjects.length === 0 ? <CustomSkeleton /> : (
                  <CommonProject data={AffordableProjects.slice(0, 4)} title="Affordable Homes in Gurgaon" animation="fade-up" path="/projects-in-gurugram/" compact />
                )}
              </div> */}

              <Suspense fallback={<CustomSkeleton />}>
                <Builder />
              </Suspense>
              <OurServices />
              <WhyChoose />

            </div>
            {/* Main content */}
          </div> {/* Closing div for the grid container */}
        </div> {/* Closing div for the blur container */}

        {/* Blog Section - Responsive Index */}
        <BlogIndex />

        <TestimonialIndex />

        {/* Auth Modal for login/register */}
        <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} defaultView={authDefaultView} />

        {/* Floating Shorts */}
        {/* <FloatingShorts /> */}



        <Footer />

          </div> {/* Close the opacity div */}
        </div> {/* Close the blurred wrapper */}

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
    bottom: 20px; /* Position inside the hero banner */
    left: 0;
    right: 0;
    padding: 0 1rem;
    margin-top: 0;
    z-index: 100;
    transform: none;
  }

  @media (max-width: 640px) {
    bottom: -325px; /* Adjust for smaller screens */
  }
`;

const Wrapper = styled.div`
  /* Neutral background */
  background: #ffffff;
  position: relative;
  z-index: 1;
  width: 100%;
  overflow-x: hidden;
  overflow-y: visible;
  
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

   /* Sticky Banner Styles - Using JavaScript-based positioning instead of CSS sticky */

`;