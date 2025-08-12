import { Button, Collapse, message } from 'antd';
import axios from 'axios';
import React, { useContext, useEffect, useRef, useState, useCallback } from 'react';
import { format, isValid, parseISO } from "date-fns";
import styled from "styled-components";
import { Helmet } from 'react-helmet';
import {
  PhoneIcon,
  AcresIcon,
  ArrowIcon,
  CalenderIcon,
  PriceIcon,
  TowerIcon,
  LocationSmallIcon,
  LineIcon,
  WhiteLineIcon,
  ShareFrameIcon,
  ForwardIcon,
  BackwardIcon,
  ScrollIcon,
} from '../../Assets/icons';
import { DataContext } from '../../MyContext';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Dynamicsvg from './Dynamicsvg';
import Api_Service from '../../Redux/utils/Api_Service';
import { Link, useNavigate, useParams } from 'react-router-dom';

const NewBanner = () => {
  const { pUrl } = useParams();
  const [projectViewDetails, setProjectViewDetails] = useState([]);
  const [isAboutExpanded, setIsAboutExpanded] = useState(false);
  const [builderName, setBuilderName] = useState([]);
  const [isMasterPlanOpen, setIsMasterPlanOpen] = useState(false);
  const { project } = useContext(DataContext);
  const slideRefs = useRef(null);
  const gallerySlideRefs = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [userButtonText, setUserButtonText] = useState("Submit");
  const [instantcallbackmodal, setInstantCallbackmodal] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [galleryCurrentIndex, setGalleryCurrentIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [isLoading2, setIsLoading2] = useState(false);
  const [sideButtonText, setSideButtonText] = useState("Submit");
  const [sideResponseMessage, setSideResponseMessage] = useState("");
  const [isModalOpenFloor, setIsModalOpenFloor] = useState(false);
  const [selectedImagefloor, setSelectedImagefloor] = useState(null);
  const [isLoading1, setIsLoading1] = useState(false);
  const [PopUpbuttonText, setPopUpButtonText] = useState("Submit");
  const [PopUpresponseMessage, setPopUpResponseMessage] = useState("");
  const [isModalOpenGallery, setIsModalOpenGallery] = useState(false);
  const [modalImageGallery, setModalImageGallery] = useState(null);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [showViewMoreBtn, setShowViewMoreBtn] = useState(false);
  const aboutTextRef = useRef(null);
  const aboutImageRef = useRef(null);
  const { getProjectbyBuilder } = Api_Service();
  const [builderProject, setBuilderProject] = useState([]);
  const [error, setError] = useState(null);
  const query = projectViewDetails?.builderName;
  const pUrlRef = useRef(pUrl);
  const navigate = useNavigate();

  function debouncedHandleSubmit(func, timeout = 500) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }

  // Project data fetching is handled in the useEffect below (lines 257-290)

  // Removed scroll-based hero/overlay transitions

  useEffect(() => {

    if (pUrlRef.current !== pUrl) {
      pUrlRef.current = pUrl;
    }
  }, [pUrl]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedResult = await getProjectbyBuilder(query, 0);
        setBuilderProject(fetchedResult);
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
  }, [query, getProjectbyBuilder]);

  // Measure navbar height and expose as CSS var --nav-h
  useEffect(() => {
    const updateNavHeight = () => {
      const nav = document.getElementById('project-nav');
      if (!nav) return;
      const h = nav.offsetHeight || 0;
      document.documentElement.style.setProperty('--nav-h', `${h}px`);
    };
    updateNavHeight();
    window.addEventListener('resize', updateNavHeight);
    return () => window.removeEventListener('resize', updateNavHeight);
  }, []);

  // Handle carousel scroll events and auto-scroll
  // Check if about text exceeds image height
  useEffect(() => {
    const checkTextHeight = () => {
      if (aboutTextRef.current && aboutImageRef.current) {
        const textHeight = aboutTextRef.current.scrollHeight;
        const imageHeight = aboutImageRef.current.offsetHeight;
        setShowViewMoreBtn(textHeight > imageHeight);
      }
    };

    // Check on mount and resize
    checkTextHeight();
    window.addEventListener('resize', checkTextHeight);
    
    // Also check when content loads
    const timer = setTimeout(checkTextHeight, 1000);
    
    return () => {
      window.removeEventListener('resize', checkTextHeight);
      clearTimeout(timer);
    };
  }, [projectViewDetails]);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isAboutModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isAboutModalOpen]);

  // About text: bold lines (paragraphs/items) on scroll into view
  useEffect(() => {
    const container = aboutTextRef?.current;
    if (!container) return;
    const targets = container.querySelectorAll('p, li');
    targets.forEach(el => el.classList.add('about-scroll-line'));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view-bold');
          } else {
            entry.target.classList.remove('in-view-bold');
          }
        });
      },
      {
        root: null, // viewport
        threshold: 0.3,
        rootMargin: '0px 0px -10% 0px',
      }
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [projectViewDetails, isAboutModalOpen]);

  useEffect(() => {
    const container = document.querySelector('.flex.overflow-x-auto');
    if (container && projectViewDetails?.projectGallery?.length > 1) {
      const handleScroll = () => {
        const scrollLeft = container.scrollLeft;
        const containerWidth = container.offsetWidth;
        const currentIndex = Math.round(scrollLeft / containerWidth);
        setGalleryCurrentIndex(currentIndex);
      };

      const handleUserInteraction = () => {
        setIsAutoScrolling(false);
        // Resume auto-scroll after 3 seconds of no interaction
        setTimeout(() => setIsAutoScrolling(true), 3000);
      };

      container.addEventListener('scroll', handleScroll);
      container.addEventListener('touchstart', handleUserInteraction);
      container.addEventListener('mousedown', handleUserInteraction);

      // Auto-scroll functionality
      const autoScrollInterval = setInterval(() => {
        if (isAutoScrolling) {
          const nextIndex = (galleryCurrentIndex + 1) % projectViewDetails.projectGallery.length;
          container.scrollTo({
            left: nextIndex * container.offsetWidth,
            behavior: 'smooth'
          });
          setGalleryCurrentIndex(nextIndex);
        }
      }, 2000); // 1 second interval

      return () => {
        container.removeEventListener('scroll', handleScroll);
        container.removeEventListener('touchstart', handleUserInteraction);
        container.removeEventListener('mousedown', handleUserInteraction);
        clearInterval(autoScrollInterval);
      };
    }
  }, [projectViewDetails?.projectGallery, galleryCurrentIndex, isAutoScrolling]);


  const {
    frontImage,
    BhK_Details,
    project_floorplan_Image,
    Amenities,
    projectRedefine_Business,
    projectRedefine_Connectivity,
    projectRedefine_Education,
    projectRedefine_Entertainment,
    highlight,
    projectGallery,
  } = projectViewDetails || {};

  const sliderImages = project_floorplan_Image || [];

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 365);
  const expirationDate = tomorrow.toISOString().split("T")[0];

  const set = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: Math.min(3, sliderImages.length),
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    customPaging: (i) => (
      <button
        className={`rounded-full space-x-2 mt-4${i === currentIndex
          ? "bg-gray-800 h-2 w-5"
          : "bg-gray-400 h-3 w-3"
          }`}
      ></button>
    ),
    afterChange: (index) => setCurrentIndex(index),
  };

  const gallerySliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false, // Disabled autoplay for debugging
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    customPaging: (i) => (
      <button
        className={`rounded-full space-x-2 mt-4${i === galleryCurrentIndex
          ? "bg-gray-800 h-2 w-5"
          : "bg-gray-400 h-3 w-3"
          }`}
      ></button>
    ),
    afterChange: (index) => setGalleryCurrentIndex(index),
  };




  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!pUrl) {
          console.error('Url is undefined or empty.');
          return;
        }

        const response = await axios.get(
          `https://api.100acress.com/project/View/${pUrl}`
        );
        if (response.data.dataview.length === 0) {
          navigate("/")
        }
        const projectData = response?.data?.dataview?.[0];
        if (projectData) {
          setProjectViewDetails(projectData);
          setBuilderName(projectData.builderName);

          const message = encodeURIComponent(
            `Hello, I am interested in ${projectData.projectName} ${projectData.city} ${projectData.state}.`
          );

          const whatsappLink = `https://wa.me/918527134491?text=${message}`;
          document.querySelector(".dd-m-whatsapp").href = whatsappLink;
        } else {
          console.error('No project data found.');
        }
      } catch (error) {
        console.error('Error fetching Project Data:', error);
      }
    };
    fetchData();
  }, [pUrl, navigate]);

  // Hide main navbar on this page
  useEffect(() => {
    const mainNavbar = document.querySelector('.css-coijep');
    if (mainNavbar) {
      mainNavbar.style.display = 'none';
    }

    // Cleanup function to restore navbar when component unmounts
    return () => {
      if (mainNavbar) {
        mainNavbar.style.display = '';
      }
    };
  }, []);

  useEffect(() => {
    const setVW = () => setIsMobile(window.innerWidth < 640);
    setVW();
    window.addEventListener('resize', setVW);
    return () => window.removeEventListener('resize', setVW);
  }, []);

  useEffect(() => {
    if (isAboutModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isAboutModalOpen]);

  // Scroll-driven hero transition state
  const heroStickyRef = useRef(null);
  const heroBgRef = useRef(null);
  const nextSectionRef = useRef(null);
  const statsRef = useRef(null);
  const [heroOpacity, setHeroOpacity] = useState(1);
  const [heroBgY, setHeroBgY] = useState(0); // px translateY upwards (negative)
  const [nextY, setNextY] = useState(30);    // px translateY for next section
  const [navShown, setNavShown] = useState(true);

  useEffect(() => {
    const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const hero = heroStickyRef.current;
        if (!hero) { ticking = false; return; }
        const rect = hero.getBoundingClientRect();
        const vh = window.innerHeight || 1;
        // progress: 0 when hero top at viewport top, 1 when hero bottom reaches viewport top
        const progressRaw = Math.min(Math.max((-rect.top) / Math.max(rect.height, 1), 0), 1);
        // Fade between 0.2 and 0.8
        let fade = 1;
        if (progressRaw <= 0.2) fade = 1;
        else if (progressRaw >= 0.8) fade = 0;
        else {
          const t = (progressRaw - 0.2) / 0.6; // 0..1
          fade = 1 - t;
        }
        const e = easeInOut(progressRaw);
        // Background slides up to -20vh
        const bgY = -e * (vh * 0.2);
        // Next section parallax: from 30px down to 0px by 80%
        let nY = 30;
        if (progressRaw <= 0.2) nY = 30;
        else if (progressRaw >= 0.8) nY = 0;
        else {
          const t = (progressRaw - 0.2) / 0.6;
          nY = 30 * (1 - easeInOut(t));
        }

        // Navbar should be visible across hero and beyond
        if (!navShown) setNavShown(true);

        setHeroOpacity(fade);
        // Disable background parallax on mobile to prevent visual gaps
        setHeroBgY(isMobile ? 0 : bgY);
        setNextY(nY);
        ticking = false;
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);


  let description = projectViewDetails?.project_discripation || "";

  let builderdescription = projectViewDetails?.AboutDeveloper || "";

  const linkRegex =
    /<a\s+href="([^"]+)"\s+style="color:black"\s*target="_blank"\s*><\/a>/;

  const linkText = projectViewDetails?.projectName;

  description = description.replace(linkRegex, (match, p1) => {
    return `<a href="${p1}" style="color:black" target="_blank">${linkText}</a>`;
  });

  const formatDate = (isoString) => {
    if (!isoString) {
      return "No date provided";
    }
    const date = parseISO(isoString);
    if (!isValid(date)) {
      return "Invalid date";
    }
    return format(date, "MMM, yyyy");
  };


  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const [sideDetails, setSideDetails] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const [popDetails, setPopDetails] = useState({
    name: "",
    email: "",
    mobile: "",
  });


  const openModalGallery = (image) => {
    setModalImageGallery(image);
    setIsModalOpenGallery(true);
    document.body.style.overflow = "hidden";
  };

  const closeModalGallery = () => {
    setIsModalOpenGallery(false);
    setModalImageGallery(null);
    document.body.style.overflow = "auto";
  };

  const openModalfloor = (image) => {
    setSelectedImagefloor(image);
    setIsModalOpenFloor(true);
    document.body.style.overflow = "hidden";
  };

  const closeModalfloor = () => {
    setIsModalOpenFloor(false);
    setSelectedImagefloor(null);
    document.body.style.overflow = "auto";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };



  const handleShowInstantcallBack = () => {
    setInstantCallbackmodal(true);
  }

  const handleCloseInstantcallBack = () => {
    setInstantCallbackmodal(false);
  }

  const handleChangeSide = (e) => {
    const { name, value } = e.target;
    setSideDetails({ ...sideDetails, [name]: value });
  };

  const handlePopChange = (e) => {
    const { name, value } = e.target;
    setPopDetails({ ...popDetails, [name]: value });
  };

  const popSubmitDetails = useCallback(async (e) => {
    e.preventDefault();
    if (isLoading1) {
      return;
    }

    const { mobile } = popDetails;

    if (/^([+]\d{2})?\d{10}$/.test(mobile)) {
      setPopUpButtonText("Submitting...");
      message.success("Callback Requested Successfully");
      try {
        setIsLoading1(true);
        await axios.post("https://api.100acress.com/userInsert", {
          ...popDetails,
          projectName: projectViewDetails.projectName,
          address: projectViewDetails.projectAddress,
        });
        setPopUpResponseMessage("Callback Requested Successfully");
        resetData1();
      } catch (error) {
        alert(error.message);
      } finally {
        setIsLoading1(false);
        setPopUpButtonText("Submit");
      }
    } else {
      message.error("Please enter a valid mobile number");
      setPopUpResponseMessage("Please fill in the data");
    }
  }, [isLoading1, popDetails, projectViewDetails.projectName, projectViewDetails.projectAddress]);

  const resetData = () => {
    setUserDetails({
      name: "",
      email: "",
      mobile: "",
    });
  };

  const resetData2 = () => {
    setSideDetails({
      name: "",
      email: "",
      mobile: "",
    });
  };

  const resetData1 = () => {
    setSideDetails({
      name: "",
      email: "",
      mobile: "",
    });
  };

  const handleShare = (project) => {

    if (navigator.share) {
      navigator
        .share({
          title: project?.projectName,
          text: `Check out this project: ${project.projectName}`,
          url: `${window.location.origin}/${project.project_url}`,
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.log("Error sharing:", error));
    } else {
      alert("Share functionality is not supported on this device/browser.");
    }
  };
  const userSubmitDetails = useCallback((e) => {
    e.preventDefault();

    if (isLoading2) {
      return;
    }

    const { mobile } = userDetails;

    if (mobile) {
      setIsLoading2(true);
      setUserButtonText("Submitting...");
      if (/^([+]\d{2})?\d{10}$/.test(mobile)) {
        message.success("Callback Requested Successfully");
        resetData();
        setUserButtonText("Submit");
        setIsLoading2(false);
        axios
          .post("https://api.100acress.com/userInsert", {
            ...userDetails,
            projectName: projectViewDetails.projectName,
            address: projectViewDetails.projectAddress,
          })
          .then((res) => {
            // setSideResponseMessage("Callback Requested Successfully");
            message.success("Callback Requested Successfully");
            resetData();
          })
          .catch((error) => {
            alert(error.message);
          })
          .finally(() => {
            setUserButtonText("Submit");
          });
      }
      message.error("Please enter a valid mobile number");
      setIsLoading2(false);
      setUserButtonText("Submit");
    } else {
      message.error("Please fill in the details");
    }
  }, [isLoading2, userDetails, projectViewDetails.projectName, projectViewDetails.projectAddress]);

  const SideSubmitDetails = useCallback(async (e) => {
    e.preventDefault();
    if (isLoading2) {
      return;
    }
    const { mobile } = sideDetails;

    if (/^([+]\d{2})?\d{10}$/.test(mobile)) {
      setIsLoading2(true);
      setSideButtonText("Submitting...");
      message.success("Callback Requested Successfully");
      resetData2();
      setIsLoading2(false);
      setSideButtonText("Submit");

      try {
        await axios.post("https://api.100acress.com/userInsert", {
          ...sideDetails,
          projectName: projectViewDetails.projectName,
          address: projectViewDetails.projectAddress,
        });
        setInstantCallbackmodal(false)
        message.success("Callback Requested Successfully");
        resetData2();
        setSideButtonText("Submit");
      } catch (error) {
        console.error("Error:", error.message);
        setSideResponseMessage("Error: " + error.message);
        setSideButtonText("Submit");
      } finally {
        setIsLoading2(false);
      }
    } else {
      message.error("Please fill in the data");
    }
  }, [isLoading2, sideDetails, projectViewDetails.projectName, projectViewDetails.projectAddress]);

  const debouncedPopSubmit = useCallback(
    debouncedHandleSubmit(popSubmitDetails, 500),
    [popSubmitDetails]
  );

  const debouncedSideSubmit = useCallback(
    debouncedHandleSubmit(SideSubmitDetails, 500),
    [SideSubmitDetails]
  );

  const filterProjectsByBuilder = () => {
    const normalizedBuilderName =
      typeof builderName === "string" ? builderName.trim().toLowerCase() : "";

    return project.filter(
      (p) => p.builderName.trim().toLowerCase() === normalizedBuilderName
    );
  };

  const filteredProjects = filterProjectsByBuilder();
  const projectsToShow = showAllProjects
    ? builderProject
    : builderProject.slice(0, 4);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setShowPopup(true);
    }, 10000);
    return () => clearTimeout(timeOutId);
  }, []);

  const text = [
    {
      title: `What is the exact Location of ${projectViewDetails?.projectName}`,
      content: `${projectViewDetails?.projectName} is strategically located in  ${projectViewDetails?.projectAddress}, ${projectViewDetails?.city}. A well-connected and rapidly developing ${projectViewDetails?.projectOverview} hub .`,
    },
    {
      title: `What is the expected possession date for  ${projectViewDetails?.projectName} ${projectViewDetails.city} `,
      content: `${projectViewDetails.projectName} is a ${projectViewDetails?.project_Status} project with possession scheduled for ${formatDate(projectViewDetails?.possessionDate)}.`,
    },
    {
      title: `How can I verify the RERA approval status of ${projectViewDetails?.projectName}`,
      content: `You can verify the RERA registration status of ${projectViewDetails?.projectName} by visiting the official state RERA website. The project is registered under RERA with the number ${projectViewDetails?.projectReraNo}.`,
    },
    {
      title: `Who is the developer of ${projectViewDetails?.projectName} ${projectViewDetails.city}`,
      content: `${projectViewDetails?.projectName} is developed by ${projectViewDetails?.builderName}, a renowned real estate developer known for delivering premium residential and commercial projects across India.`,
    },
    {
      title: `What types of BHK units are available in  ${projectViewDetails?.projectName} ${projectViewDetails?.projectAddress}`,
      content: ` ${projectViewDetails?.projectName} offers thoughtfully designed ${projectViewDetails.BhK_Details?.map((data) => (` ${data.bhk_type}`))} ${projectViewDetails?.projectOverview !== "none" ? ` ${projectViewDetails.projectOverview} floors` : ""} units, catering to moder lifestyle needs.`,
    },

  ]
    ;

  const items = text.map((item, index) => ({
    key: index + 1,
    label: ` ${item.title} ?`,
    children: <p>{item.content}</p>,
  }))


  return (
    <div>
      <Wrapper className="section" style={{ overflow: "hidden", overflowX: "hidden" }}>
        <Helmet>
          <title>{projectViewDetails?.meta_title}</title>
          <meta
            name="description"
            content={projectViewDetails.meta_description}
          />
          <meta property="og:title" content={projectViewDetails?.meta_title} />
          <meta property="og:site_name" content="100acress.com" />
          <meta property="og:type" content="website" />
          <meta property="og:image" content={projectViewDetails?.frontImage?.url} />
          <meta property="og:url" content="https://www.100acress.com/" />
          <meta property="og:description" content={projectViewDetails.meta_description} />
          <meta name="twitter:title" content={projectViewDetails?.meta_title} />
          <meta name="twitter:description" content={projectViewDetails.meta_description} />
          <meta property="twitter:url" content="https://www.100acress.com/" />
          <meta property="twitter:image" content={projectViewDetails?.frontImage?.url} />
          <meta name="twitter:card" content="summary"></meta>
          <link
            rel="canonical"
            href={`https://www.100acress.com/${projectViewDetails.project_url}/`}
          />
          <script type="application/ld+json">
            {`
              {
                "@context": "https://schema.org",
                "@type": "Event",
                "name": "${projectViewDetails.projectName}",
                "description": "${projectViewDetails.meta_description}",
                "startDate": "${today.toISOString().split("T")[0]}",
                "endDate": "${expirationDate}",
                ${projectViewDetails.frontImage && projectViewDetails.frontImage.url
                ? `"image": "${projectViewDetails.frontImage.url}",`
                : ""
              }
                "location": {
                  "name": "${projectViewDetails.projectAddress} ${projectViewDetails.city
              }",
                  "@type": "Place",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "${projectViewDetails.city}",
                    "streetAddress": "${projectViewDetails.projectAddress}"
                  }
                }
              }
              `}
          </script>
        </Helmet>


        {/* Enhanced Hero Section with Premium Features - Sticky (pinned) */}
        <div className="relative min-h-[100dvh]" style={{ minHeight: '100dvh' }}>
          <div ref={heroStickyRef} className="sticky top-0 w-full h-[100dvh] overflow-hidden z-10" style={{ height: '100dvh' }}>
            <div style={{ opacity: heroOpacity, transition: 'opacity 120ms ease-in-out' }}>
            {/* High-Resolution Background with Enhanced Gradient */}
             <div
               ref={heroBgRef}
               className="absolute inset-0 min-h-[100dvh] bg-no-repeat bg-[length:100%_100%] sm:bg-cover bg-center hero-background"
               style={{
                 minHeight: '100dvh',
                 // Inline background to guarantee visibility even if <img> fails
                 backgroundImage: `url(${projectViewDetails?.frontImage?.url || projectViewDetails?.projectGallery?.[0]?.url || ''})`,
                 backgroundSize: isMobile ? '100% 100%' : 'cover',
                 backgroundPosition: 'center',
                 backgroundRepeat: 'no-repeat',
                 backgroundColor: '#0b1c26',
                 transform: isMobile ? 'translateY(0px)' : `translateY(${heroBgY}px)`,
                 willChange: 'transform'
               }}
             >
              {/* Force image to fill viewport on mobile */}
              <img
                src={projectViewDetails?.frontImage?.url || projectViewDetails?.projectGallery?.[0]?.url || ''}
                alt={projectViewDetails?.projectName || 'Project Hero'}
                className="absolute inset-0 w-full h-full object-fill sm:object-cover pointer-events-none select-none"
                loading="eager"
              />
              {/* Enhanced Multi-layer Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/80"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/20"></div>
              {/* Mobile-only bottom-to-top black -> white gradient with increasing opacity bottom to top */}
              <div className="absolute inset-0 sm:hidden pointer-events-none bg-gradient-to-t from-black/80 via-black/10 to-white/40"></div>

              {/* Animated Elements */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Floating Particles */}
                <div className="floating-particles">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className={`particle particle-${i + 1}`}></div>
                  ))}
                </div>

                {/* About - Full content modal */}
                {isAboutModalOpen && (
                  <div className="fixed inset-0 z-[9998] bg-black/70 flex items-center justify-center p-4">
                    <div className="relative bg-white rounded-2xl max-w-3xl w-full max-h-[80vh] overflow-hidden shadow-2xl">
                      <button
                        type="button"
                        onClick={() => setIsAboutModalOpen(false)}
                        className="absolute top-3 right-3 text-gray-600 hover:text-black bg-gray-100 hover:bg-gray-200 rounded-full p-2 z-10"
                        aria-label="Close"
                      >
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                      <div className="p-6 overflow-y-auto max-h-[80vh] text-gray-800">
                        <div className="prose max-w-none premium-content-text" dangerouslySetInnerHTML={{ __html: aboutModalHtml || description }} />
                      </div>
                    </div>
                  </div>
                )}

                {/* Subtle Moving Clouds */}
                <div className="clouds">
                  <div className="cloud cloud-1"></div>
                  <div className="cloud cloud-2"></div>
                  <div className="cloud cloud-3"></div>
                </div>
              </div>

            </div>

            {/* Close inner hero opacity wrapper before navbar */}
            </div>

            {/* Project-specific Navbar - Always Fixed */}
            <nav
              id="project-nav"
              className="fixed top-0 left-0 right-0 z-[9999] w-full h-14 sm:h-16 flex items-center justify-between px-4 sm:px-6 backdrop-blur-md"
              style={{
                // Transparent on mobile to let hero image reach the top; gradient on larger screens
                background: isMobile
                  ? 'transparent'
                  : 'linear-gradient(to right, rgba(255,255,255,1) 0, rgba(255,255,255,1) 320px, rgba(255,255,255,0.9) 480px, rgba(255,255,255,0.7) 65%, rgba(255,255,255,0.35) 85%, rgba(255,255,255,0.15) 100%)',
                boxShadow: isMobile ? 'none' : '0 4px 24px 0 rgba(0,0,0,0.10)'
              }}
            >
              {/* Logo */}
              <div className="flex items-center">
                <img
                  src={projectViewDetails?.logo?.url}
                  alt={projectViewDetails.projectName}
                  style={{
                    height: "44px",
                    width: "auto",
                    maxWidth: "200px",
                    objectFit: "contain"
                  }}
                  loading="lazy"
                  onError={e => { e.target.style.display = 'none'; }}
                />
              </div>
              {/* Right side: Get a Callback and Phone */}
              <div className="ml-auto flex items-center space-x-2 sm:space-x-6 pr-0">
                {/* WhatsApp button - highlighted with border */}
                <a
                  href={`https://wa.me/91${projectViewDetails?.mobileNumber || "9811750130"}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center px-0 py-0 sm:px-4 sm:py-2 rounded-full transition-all duration-300 transform hover:scale-105"
                >
                  <i className="fa-brands fa-whatsapp text-2xl text-green-500 hidden sm:inline-block"></i>
                  <span className="hidden sm:inline-block sm:ml-2 sm:text-base sm:font-bold sm:text-green-600">Let's Talk</span>
                </a>

                {/* Phone button - highlighted with border */}
                <a
                  href={`tel:${projectViewDetails?.mobileNumber || "9811750130"}`}
                  className="flex items-center px-0 py-0 sm:px-4 sm:py-2 rounded-full transition-all duration-300 transform hover:scale-105"
                >
                  <PhoneIcon className="w-5 h-5 mr-0 sm:mr-2 text-white drop-shadow-lg" />
                  <span className="hidden sm:inline text-xl font-bold text-black" style={{ filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.95))' }}>{projectViewDetails?.mobileNumber || "9811750130"}</span>
                </a>
              </div>
            </nav>
            {/* Spacer to prevent content hidden under fixed navbar (desktop only) */}
            <div className="hidden sm:block sm:h-16"></div>

            {/* Hero Content */}
            <div
              className="relative z-10 flex items-center justify-center min-h-screen pt-20"
            >
              <div className="text-center text-white px-6 max-w-4xl mx-auto mt-20">
                <h1
                  className="premium-heading mb-6 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-[#F1DFA8] via-[#E5C78A] to-[#FAEEC6]"
                  style={{ WebkitTextStroke: '0.3px rgba(255,255,255,0.35)', filter: 'drop-shadow(0 2px 6px rgba(255,255,255,0.28)) drop-shadow(0 0 24px rgba(229,199,138,0.35))' }}
                >
                  {projectViewDetails.projectName}
                </h1>
                <h2 className="text-xl md:text-2xl mb-8 text-gray-200 flex items-center justify-center">
                  <LocationSmallIcon className="mr-3 w-6 h-6" />
                  {projectViewDetails?.projectAddress}, {projectViewDetails?.city}
                </h2>





                {/* Enhanced CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                  <button
                    onClick={handleShowInstantcallBack}
                    className="bg-gradient-to-r from-[#CFAF6E] to-[#E5C78A] text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:from-[#B8985A] hover:to-[#D4B373] transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#D4AF37]/30 min-w-[200px]"
                  >
                    <i className="fas fa-calendar-alt mr-2"></i>
                    Schedule Site Visit
                  </button>
                  <button
                    onClick={() => {
                      const url = projectViewDetails?.projectBrochure?.url;
                      if (url) {
                        window.open(url, '_blank');
                      } else {
                        handleShowInstantcallBack();
                      }
                    }}
                    className="bg-transparent border-2 border-white text-white font-bold px-8 py-4 rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/30 min-w-[200px]"
                  >
                    <i className="fas fa-download mr-2"></i>
                    Get Brochure Instantly
                  </button>
                </div>




              </div>
            </div>
          </div>
          {/* Top overlap shadow for depth */}
          <div className="pointer-events-none absolute -top-1 left-0 right-0 h-6" style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.16), rgba(0,0,0,0))'
          }}></div>

        </div>

        {/* Local keyframes for subtle hero/media animations */}
        <style>{`
          @keyframes kenBurnsSlow {
            0% { transform: scale(1.02) translateY(0); }
            100% { transform: scale(1.08) translateY(-2%); }
          }
        `}</style>

        {/* About Project Section with Image and Stats */}
        <div ref={nextSectionRef} className="relative about-content-section mx-[10%] my-[10%] mt-[10%] m" style={{ transform: `translateY(${nextY}px)`, transition: 'transform 120ms ease-in-out' }}>
          {/* Section Header centered - Premium Golden Theme */}
          <div className="mb-2 text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-12 h-0.5 bg-gradient-to-r from-[#CFAF6E] to-[#E5C78A] rounded-full"></div>
              <span className="text-[#B8985A] font-semibold text-sm uppercase tracking-wider">About Project</span>
              <div className="w-12 h-0.5 bg-gradient-to-r from-[#E5C78A] to-[#CFAF6E] rounded-full"></div>
            </div>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight font-serif">
              {projectViewDetails.projectName}
              <div className="w-20 h-1 bg-gradient-to-r from-[#CFAF6E] to-[#E5C78A] rounded-full mt-3 mx-auto"></div>
            </h2>
          </div>
          {/* Top Row: Image and Stats Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 ml-[10%] mr-[10%]">
            {/* Left Column - Image (takes 2/3 width) */}
            <div className="lg:col-span-2 relative">
              {projectViewDetails?.projectGallery?.[0]?.url && (
                <div ref={aboutImageRef} className="relative h-full rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src={projectViewDetails.projectGallery[0].url}
                    alt={projectViewDetails.projectName}
                    className="w-full h-full object-cover"
                    style={{ minHeight: '400px', animation: 'kenBurnsSlow 18s ease-in-out infinite alternate', transformOrigin: 'center center', willChange: 'transform' }}
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Floating Project Badge */}
                  <div className="absolute top-6 left-6 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30">
                    <span className="text-white text-sm font-medium tracking-wide">Premium Project</span>
                  </div>
                  
                  {/* Download Brochure Button - Bottom Left */}
                  <button
                    onClick={() => {
                      const url = projectViewDetails?.projectBrochure?.url;
                      if (url) window.open(url, '_blank'); else handleShowInstantcallBack();
                    }}
                    className="absolute bottom-6 left-6 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-semibold px-5 py-2.5 rounded-full shadow-lg hover:scale-105 transition flex items-center gap-2"
                  >
                    <i className="fas fa-download"></i>
                    <span>Download Brochure</span>
                  </button>
                </div>
              )}
            </div>

            {/* Right Column - Stats Cards in 2x2 Grid (takes 1/3 width) */}
            <div className="grid grid-cols-2 gap-4 h-full">
              {/* Land Area Card */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 lg:p-8 shadow-xl border border-amber-200/50 flex flex-col items-center justify-center text-center hover:shadow-2xl transition-all">
                <div className="bg-gradient-to-r from-[#CFAF6E] to-[#E5C78A] p-3 rounded-full mb-4 ring-1 ring-[#D4AF37]/40 shadow">
                  <AcresIcon className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-gray-900 mb-1 font-serif">{projectViewDetails.totalLandArea || 'N/A'} Acres</span>
                <span className="text-sm text-gray-600">Land Area</span>
              </div>

              {/* Possession Card */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 lg:p-8 shadow-xl border border-amber-200/50 flex flex-col items-center justify-center text-center hover:shadow-2xl transition-all">
                <div className="bg-gradient-to-r from-[#CFAF6E] to-[#E5C78A] p-3 rounded-full mb-4 ring-1 ring-[#D4AF37]/40 shadow">
                  <TowerIcon className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-gray-900 mb-1 font-serif">{formatDate(projectViewDetails.possessionDate) || 'N/A'}</span>
                <span className="text-sm text-gray-600">Possession</span>
              </div>

              {/* Units Card */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 lg:p-8 shadow-xl border border-amber-200/50 flex flex-col items-center justify-center text-center hover:shadow-2xl transition-all">
                <div className="bg-gradient-to-r from-[#CFAF6E] to-[#E5C78A] p-3 rounded-full mb-4 ring-1 ring-[#D4AF37]/40 shadow">
                  <CalenderIcon className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-gray-900 mb-1 font-serif">
                  {projectViewDetails.type === 'Residential Flats' && projectViewDetails.towerNumber ? 
                    `${projectViewDetails.towerNumber} Tower` : ''}
                  {projectViewDetails.totalUnit ? ` - ${projectViewDetails.totalUnit} Unit` : 'N/A'}
                </span>
                <span className="text-sm text-gray-600">Units</span>
              </div>

              {/* Price Card */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 lg:p-8 shadow-xl border border-amber-200/50 flex flex-col items-center justify-center text-center hover:shadow-2xl transition-all">
                <div className="bg-gradient-to-r from-[#CFAF6E] to-[#E5C78A] p-3 rounded-full mb-4 ring-1 ring-[#D4AF37]/40 shadow">
                  <PriceIcon className="w-6 h-6 text-white" />
                </div>
                {!projectViewDetails?.minPrice || !projectViewDetails?.maxPrice ? (
                  <span className="text-2xl font-bold text-gray-900 mb-1 font-serif">Call For Price</span>
                ) : (
                  <span className="text-2xl font-bold text-gray-900 mb-1 font-serif">
                    {projectViewDetails.minPrice < 1 ? (
                      <>{projectViewDetails?.minPrice * 100}L - {projectViewDetails.maxPrice} Cr</>
                    ) : (
                      <>{projectViewDetails.minPrice} - {projectViewDetails.maxPrice} Cr</>
                    )}
                  </span>
                )}
                <span className="text-sm text-gray-600">Price</span>
              </div>
            </div>
          </div>

          {/* Bottom Row: About Project Text Section */}
          <div className="w-[80%] bg-white rounded-3xl p-8 ml-[10%] mr-[10%]">
            <div className="relative">
              <div ref={aboutTextRef} className="prose max-w-none text-gray-600 text-lg leading-relaxed">
                <div dangerouslySetInnerHTML={{ __html: projectViewDetails.project_discripation || description || 'No description available' }} />
              </div>

              {showViewMoreBtn && (
                <div className="mt-8 text-center">
                  <button
                    type="button"
                    onClick={() => setIsAboutModalOpen(true)}
                    className="inline-flex items-center text-yellow-600 font-medium hover:text-yellow-700 transition-colors"
                    aria-label="View more about project"
                  >
                    <span className="mr-2">View More</span>
                    <i className="fas fa-arrow-right"></i>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* successulll updated */}


        {/* Rest of content - Normal scrolling continues */}
        <div className="relative w-full bg-gradient-to-br from-cream-50 to-amber-50/30">
          {/* Highlights - Premium Golden Theme */}
          <div className="py-16 lg:py-24 px-4 lg:px-8 max-w-7xl mx-auto">
            {/* Section Header centered */}
            <div className="text-center mb-3">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-0.5 bg-gradient-to-r from-[#CFAF6E] to-[#E5C78A] rounded-full"></div>
                <span className="text-[#B8985A] font-semibold text-sm uppercase tracking-wider">Highlights</span>
                <div className="w-12 h-0.5 bg-gradient-to-r from-[#E5C78A] to-[#CFAF6E] rounded-full"></div>
              </div>
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight font-serif">
                {projectViewDetails.projectName}
                <div className="w-20 h-1 bg-gradient-to-r from-[#CFAF6E] to-[#E5C78A] rounded-full mt-3 mx-auto"></div>
              </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-stretch">
              {/* Image: spans 2/3 on desktop */}
              <div className="w-full lg:col-span-2 relative overflow-hidden order-1">
                <div className="relative h-[50vh] sm:h-[60vh] lg:h-[70vh] rounded-3xl overflow-hidden shadow-2xl group">
                  {projectViewDetails?.highlightImage?.url && (
                    <>
                      <img
                        src={projectViewDetails?.highlightImage?.url}
                        alt={`${projectViewDetails.projectName}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Elegant gradient overlays */}
                      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-amber-900/10"></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                      {/* Premium CTA over image */}
                      <div className="hidden lg:flex absolute bottom-8 right-8">
                        <button
                          onClick={() => {
                            const url = projectViewDetails?.projectBrochure?.url;
                            if (url) window.open(url, '_blank'); else handleShowInstantcallBack();
                          }}
                          className="bg-gradient-to-r from-[#CFAF6E] to-[#E5C78A] text-white font-bold px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:from-[#B8985A] hover:to-[#D4B373] transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#D4AF37]/30 flex items-center gap-3"
                        >
                          <i className="fas fa-download"></i>
                          <span>Download Brochure</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
                {/* Mobile CTA below image */}
                <div className="mt-6 flex lg:hidden justify-center">
                  <button
                    onClick={() => {
                      const url = projectViewDetails?.projectBrochure?.url;
                      if (url) window.open(url, '_blank'); else handleShowInstantcallBack();
                    }}
                    className="bg-gradient-to-r from-[#CFAF6E] to-[#E5C78A] text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:from-[#B8985A] hover:to-[#D4B373] transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#D4AF37]/30 flex items-center gap-3"
                  >
                    <i className="fas fa-download"></i>
                    <span>Download Brochure</span>
                  </button>
                </div>
              </div>

              {/* Text: 1/3 on desktop */}
              <div className="w-full lg:col-span-1 flex flex-col justify-center order-2">
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 lg:p-10 shadow-xl border border-amber-200/50">
                  

                  <div className="space-y-4">
                    {highlight && Array.isArray(highlight) && highlight.length > 0 &&
                      highlight.map((item, index) => (
                        <div key={index} className="flex items-start gap-3 group">
                          <div className="w-2 h-2 bg-gradient-to-r from-[#CFAF6E] to-[#E5C78A] rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-300"></div>
                          <p className="text-gray-700 text-lg leading-relaxed">
                            {item.highlight_Point}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>



        {/* How much */}

        <div className="p-2 pt-1 mt-2 pb-0 h-fit" >
          <div className="flex flex-justify-center items-stretch rounded h-auto">
            <div className="text-black w-full flex flex-col ml-[10%] mr-[10%]">
              <div className="flex flex-col h-full">
                <div className="w-full pl-4 text-black flex flex-col justify-center items-center text-center">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <div className="w-12 h-0.5 bg-gradient-to-r from-[#CFAF6E] to-[#E5C78A] rounded-full"></div>
                    <span className="text-[#B8985A] font-semibold text-sm uppercase tracking-wider">Pricing & Dimensions</span>
                    <div className="w-12 h-0.5 bg-gradient-to-r from-[#E5C78A] to-[#CFAF6E] rounded-full"></div>
                  </div>
                  <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight font-serif">
                    {projectViewDetails.projectName}
                    <span className="block font-serif">Size & Price</span>
                    <div className="w-20 h-1 bg-gradient-to-r from-[#CFAF6E] to-[#E5C78A] rounded-full mt-3 mx-auto"></div>
                  </h2>
                </div>
              </div>
              <div className="mt-8 mx-4">
                {/* Desktop Table View */}
                <div className="luxury-pricing-table rounded-2xl overflow-hidden shadow-2xl border border-[#D4AF37] bg-white hidden md:block">
                  {/* Premium Golden Header */}
                  <div className="flex flex-shrink-0 bg-gradient-to-r from-[#CFAF6E] to-[#E5C78A] text-white shadow-lg">
                    <div className="flex items-center justify-center flex-grow w-0 h-16 p-4 border-r border-[#D4AF37]/30">
                      <span className="font-serif text-lg font-bold tracking-wide">Unit Type</span>
                    </div>
                    <div className="flex items-center justify-center flex-grow w-0 h-16 p-4 border-r border-[#D4AF37]/30">
                      <span className="font-serif text-lg font-bold tracking-wide">Unit Size</span>
                    </div>
                    <div className="flex items-center justify-center flex-grow w-0 h-16 p-4">
                      <span className="font-serif text-lg font-bold tracking-wide">Unit Price</span>
                    </div>
                  </div>

                  {/* Premium Table Body */}
                  <div className="overflow-hidden">
                    {BhK_Details &&
                      Array.isArray(BhK_Details) &&
                      BhK_Details.length > 0 &&
                      BhK_Details.map((item, index) => (
                        <div 
                          className={`luxury-table-row flex flex-shrink-0 transition-all duration-300 hover:shadow-md hover:bg-[#FFF9F1]/70 ${
                            index % 2 === 0 ? 'bg-[#FFF9F1]' : 'bg-white'
                          }`} 
                          key={index}
                          style={{
                            animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                          }}
                        >
                          <div className="flex items-center justify-center flex-grow w-0 min-h-[80px] p-6 border-r border-[#D4AF37]/20">
                            <span className="font-sans text-gray-800 font-semibold text-lg">{item.bhk_type}</span>
                          </div>

                          <div className="flex items-center justify-center flex-grow w-0 min-h-[80px] p-6 border-r border-[#D4AF37]/20">
                            <span className="font-sans text-gray-700 text-base">{item.bhk_Area}</span>
                          </div>

                          <div className="flex items-center justify-center flex-grow w-0 min-h-[80px] p-6">
                            <button 
                              className="luxury-get-details-btn bg-gradient-to-r from-[#CFAF6E] to-[#E5C78A] text-white font-bold px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:from-[#B8985A] hover:to-[#D4B373] transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#D4AF37]/30"
                              onClick={handleShowInstantcallBack}
                            >
                              Get Details
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden space-y-4">
                  {BhK_Details &&
                    Array.isArray(BhK_Details) &&
                    BhK_Details.length > 0 &&
                    BhK_Details.map((item, index) => (
                      <div 
                        key={index}
                        className="luxury-mobile-card bg-white rounded-2xl shadow-lg border border-[#D4AF37]/30 p-6 transition-all duration-300 hover:shadow-xl hover:border-[#D4AF37]/50"
                        style={{
                          animation: `fadeInUp 0.6s ease-out ${index * 0.15}s both`
                        }}
                      >
                        {/* Unit Type Header */}
                        <div className="mb-4 pb-3 border-b border-[#D4AF37]/20">
                          <h3 className="font-serif text-2xl font-bold text-gray-900 text-center">
                            {item.bhk_type}
                          </h3>
                        </div>

                        {/* Unit Size */}
                        <div className="mb-6 text-center">
                          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#FFF9F1] to-[#F7F3E9] rounded-full border border-[#D4AF37]/20">
                            <span className="text-sm font-medium text-[#8B7355] uppercase tracking-wide mr-2">Size:</span>
                            <span className="font-sans text-lg font-semibold text-gray-800">{item.bhk_Area}</span>
                          </div>
                        </div>

                        {/* Get Details Button */}
                        <div className="text-center">
                          <button 
                            className="luxury-mobile-btn bg-gradient-to-r from-[#CFAF6E] to-[#E5C78A] text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:from-[#B8985A] hover:to-[#D4B373] transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#D4AF37]/30 w-full max-w-xs"
                            onClick={handleShowInstantcallBack}
                          >
                            <span className="flex items-center justify-center">
                              <i className="fas fa-info-circle mr-2"></i>
                              Get Details
                            </span>
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* Floor Plan */}

        {projectViewDetails.project_floorplan_Image?.length !== 0 && (<>
          <div className="pb-0 py-16 lg:py-20 px-4 lg:px-8 bg-gradient-to-br from-amber-50/40 to-cream-100/30">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="w-12 h-0.5 bg-gradient-to-r from-[#CFAF6E] to-[#E5C78A] rounded-full"></div>
                  <span className="text-[#B8985A] font-semibold text-sm uppercase tracking-wider">Floor Plan</span>
                  <div className="w-12 h-0.5 bg-gradient-to-r from-[#E5C78A] to-[#CFAF6E] rounded-full"></div>
                </div>
                <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight font-serif">
                  {projectViewDetails.projectName}
                  <span className="block font-serif text-[#B8985A] mt-2">Floor Plans</span>
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-[#CFAF6E] to-[#E5C78A] rounded-full mx-auto mt-4"></div>
              </div>
            </div>
          </div>


          <div className='pl-6 h-fit'>
            <article className="article">
              <div className="relative">
                {sliderImages &&
                  Array.isArray(sliderImages) &&
                  sliderImages.length > 0 && (
                    <>
                      <button
                        onClick={() => slideRefs.current.slickPrev()}
                        className="absolute top-1/2 left-5 -translate-y-1/2 bg-gradient-to-r from-[#CFAF6E] to-[#E5C78A] text-white p-3 rounded-full z-10 shadow-lg hover:shadow-xl hover:from-[#B8985A] hover:to-[#D4B373] transition-all duration-300 hover:scale-105"
                        aria-label="Previous floor plan"
                      >
                        <BackwardIcon />
                      </button>
                      <button
                        onClick={() => slideRefs.current.slickNext()}
                        className="absolute top-1/2 right-5 -translate-y-1/2 bg-gradient-to-r from-[#CFAF6E] to-[#E5C78A] text-white p-3 rounded-full z-10 shadow-lg hover:shadow-xl hover:from-[#B8985A] hover:to-[#D4B373] transition-all duration-300 hover:scale-105"
                        aria-label="Next floor plan"
                      >
                        <ForwardIcon />
                      </button>
                    </>
                  )}
                <Slider ref={slideRefs} {...set}>
                  {sliderImages &&
                    Array.isArray(sliderImages) &&
                    sliderImages.length > 0 &&
                    sliderImages.map((image, index) => (
                      <div key={index} className="p-2">
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-amber-200/50 overflow-hidden group">
                          <img
                            src={image.url}
                            alt={`${projectViewDetails.projectName} floor plan ${index + 1}`}
                            className="w-full h-[420px] object-cover cursor-pointer transition-transform duration-500 group-hover:scale-[1.02]"
                            onClick={() => openModalfloor(image.url)}
                          />
                          <div className="bg-gradient-to-r from-[#CFAF6E] to-[#E5C78A] text-white w-full text-center py-3">
                            <h4 className="text-lg font-serif font-bold tracking-wide">
                              {BhK_Details[index]?.bhk_type || BhK_Details[0]?.bhk_type}
                            </h4>
                            <p className="text-sm/relaxed opacity-95">{BhK_Details[index]?.bhk_Area || BhK_Details[0]?.bhk_Area}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                </Slider>
              </div>
            </article>

            {isModalOpenFloor && (
              <div className="fixed inset-0 z-[9998] bg-black/70 backdrop-blur-sm flex justify-center items-center p-4">
                <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden max-w-5xl w-full">
                  <button
                    onClick={closeModalfloor}
                    className="absolute top-3 right-3 text-gray-700 hover:text-black bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full p-2 z-10 shadow"
                    aria-label="Close floor plan preview"
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                  <img
                    src={selectedImagefloor}
                    alt={projectViewDetails.projectName}
                    className="w-full h-auto max-h-[80vh] object-contain bg-black"
                  />
                </div>
              </div>
            )}

            <style jsx>{`
    .relative {
      margin: 0;
      padding: 0;
    }

    .p-0 {
      padding: 0;
    }

    img {
      display: block;
    }

    @media (max-width: 768px) {
      .absolute {
        top: 50%;
      }

      .left-5 {
        left: 2%;
      }

      .right-5 {
        right: 2%;
      }
    }

    @media (max-width: 640px) {
      .absolute {
        top: 50%;
      }

      .left-5 {
        left: 1%;
      }

      .right-5 {
        right: 1%;
      }
    }
            `}</style>
          </div>

        </>)}



        {/* Gallery - Premium Golden Theme */}
        <div className="py-16 lg:py-24 px-4 lg:px-8 max-w-7xl mx-auto bg-gradient-to-br from-amber-50/50 to-cream-100/30">
          <div className="text-center mb-2">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-0.5 bg-gradient-to-r from-[#CFAF6E] to-[#E5C78A] rounded-full"></div>
              <span className="text-[#B8985A] font-semibold text-sm uppercase tracking-wider">Gallery</span>
              <div className="w-12 h-0.5 bg-gradient-to-r from-[#E5C78A] to-[#CFAF6E] rounded-full"></div>
            </div>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight font-serif mb-2">
              {projectViewDetails.projectName}
              <span className="block font-serif text-[#B8985A] mt-2">Images</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#CFAF6E] to-[#E5C78A] rounded-full mx-auto mt-4"></div>
          </div>

          {/* Mobile Carousel View */}
          <div className="md:hidden">
            {projectViewDetails?.projectGallery && Array.isArray(projectViewDetails.projectGallery) && projectViewDetails.projectGallery.length > 0 ? (
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-amber-200/50">
                <button
                  onClick={() => {
                    const container = document.querySelector('.flex.overflow-x-auto');
                    if (container) {
                      const prevIndex = galleryCurrentIndex === 0
                        ? projectViewDetails.projectGallery.length - 1
                        : galleryCurrentIndex - 1;
                      container.scrollTo({
                        left: prevIndex * container.offsetWidth,
                        behavior: 'smooth'
                      });
                      setGalleryCurrentIndex(prevIndex);
                    }
                  }}
                  className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gradient-to-r from-[#CFAF6E] to-[#E5C78A] text-white p-3 rounded-full z-10 shadow-lg hover:shadow-xl hover:from-[#B8985A] hover:to-[#D4B373] transition-all duration-300 transform hover:scale-105"
                >
                  <BackwardIcon />
                </button>
                <button
                  onClick={() => {
                    const container = document.querySelector('.flex.overflow-x-auto');
                    if (container) {
                      const nextIndex = (galleryCurrentIndex + 1) % projectViewDetails.projectGallery.length;
                      container.scrollTo({
                        left: nextIndex * container.offsetWidth,
                        behavior: 'smooth'
                      });
                      setGalleryCurrentIndex(nextIndex);
                    }
                  }}
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gradient-to-r from-[#CFAF6E] to-[#E5C78A] text-white p-3 rounded-full z-10 shadow-lg hover:shadow-xl hover:from-[#B8985A] hover:to-[#D4B373] transition-all duration-300 transform hover:scale-105"
                >
                  <ForwardIcon />
                </button>
                {/* Premium Carousel Implementation */}
                <div className="relative">
                  <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide">
                    {projectViewDetails.projectGallery.map((image, index) => (
                      <div key={index} className="flex-shrink-0 w-full snap-start p-2">
                        <div className="relative rounded-2xl overflow-hidden shadow-lg group">
                          <img
                            src={image?.url}
                            alt={`${projectViewDetails?.projectName || 'Project'} gallery ${index + 1}`}
                            className="w-full h-auto max-h-[400px] object-cover cursor-pointer transition-transform duration-500 group-hover:scale-105"
                            onClick={() => openModalGallery(image?.url)}
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Premium Navigation Dots */}
                  <div className="flex justify-center mt-6 space-x-2">
                    {projectViewDetails.projectGallery.map((_, index) => (
                      <button
                        key={index}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === galleryCurrentIndex 
                            ? 'bg-gradient-to-r from-[#CFAF6E] to-[#E5C78A] scale-125' 
                            : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                        onClick={() => {
                          const container = document.querySelector('.flex.overflow-x-auto');
                          if (container) {
                            container.scrollTo({
                              left: index * container.offsetWidth,
                              behavior: 'smooth'
                            });
                          }
                          setGalleryCurrentIndex(index);
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-amber-200/50">
                <div className="w-16 h-16 bg-gradient-to-r from-[#CFAF6E] to-[#E5C78A] rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-images text-white text-2xl"></i>
                </div>
                <p className="text-gray-600 text-lg">No gallery images available</p>
              </div>
            )}
          </div>

          {/* Desktop Grid View */}
          <div className="hidden md:block">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projectViewDetails?.projectGallery?.map((image, index) => (
                <div key={index} className="group">
                  <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-amber-200/50 overflow-hidden">
                    <div className="relative rounded-xl overflow-hidden">
                      <img
                        src={image?.url || image}
                        alt={`${projectViewDetails?.projectName || 'Project'} gallery ${index + 1}`}
                        className="w-full h-64 object-cover cursor-pointer transition-transform duration-500 group-hover:scale-105"
                        onClick={() => openModalGallery(image?.url || image)}
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-gradient-to-r from-[#CFAF6E] to-[#E5C78A] text-white p-2 rounded-full">
                          <i className="fas fa-expand-alt"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Premium Gallery Modal */}
          {isModalOpenGallery && (
            <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex justify-center items-center p-4">
              <div className="relative max-w-[90vw] max-h-[90vh]">
                <button
                  onClick={closeModalGallery}
                  className="absolute -top-12 right-0 bg-gradient-to-r from-[#CFAF6E] to-[#E5C78A] text-white p-3 rounded-full hover:shadow-xl hover:from-[#B8985A] hover:to-[#D4B373] transition-all duration-300 transform hover:scale-105 z-10"
                >
                  <i className="fas fa-times text-lg"></i>
                </button>
                {/* Prev Button */}
                <button
                  onClick={() => {
                    const images = (projectViewDetails?.projectGallery || []).map(img => img?.url || img);
                    if (!images.length) return;
                    const idx = images.indexOf(modalImageGallery);
                    const prev = images[(idx - 1 + images.length) % images.length];
                    if (typeof openModalGallery === 'function') {
                      openModalGallery(prev);
                    }
                  }}
                  className="absolute top-1/2 left-0 -translate-y-1/2 bg-gradient-to-r from-[#CFAF6E] to-[#E5C78A] text-white p-3 rounded-full z-10 shadow-lg hover:shadow-xl hover:from-[#B8985A] hover:to-[#D4B373] transition-all duration-300 hover:scale-105"
                  aria-label="Previous image"
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                {/* Next Button */}
                <button
                  onClick={() => {
                    const images = (projectViewDetails?.projectGallery || []).map(img => img?.url || img);
                    if (!images.length) return;
                    const idx = images.indexOf(modalImageGallery);
                    const next = images[(idx + 1) % images.length];
                    if (typeof openModalGallery === 'function') {
                      openModalGallery(next);
                    }
                  }}
                  className="absolute top-1/2 right-0 -translate-y-1/2 bg-gradient-to-r from-[#CFAF6E] to-[#E5C78A] text-white p-3 rounded-full z-10 shadow-lg hover:shadow-xl hover:from-[#B8985A] hover:to-[#D4B373] transition-all duration-300 hover:scale-105"
                  aria-label="Next image"
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
                <div className="bg-white rounded-2xl p-4 shadow-2xl">
                  <img
                    src={modalImageGallery}
                    alt={projectViewDetails.projectName}
                    className="max-w-full max-h-[80vh] object-contain rounded-xl"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Project Facilities - Premium Golden Theme */}
        <div className="pt-16 lg:pt-24 pb-0 px-4 lg:px-8 max-w-7xl mx-auto bg-gradient-to-br from-cream-50 to-amber-50/30">
          <div className="text-center mb-3">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-0.5 bg-gradient-to-r from-[#CFAF6E] to-[#E5C78A] rounded-full"></div>
              <span className="text-[#B8985A] font-semibold text-sm uppercase tracking-wider">Project Facilities</span>
              <div className="w-12 h-0.5 bg-gradient-to-r from-[#E5C78A] to-[#CFAF6E] rounded-full"></div>
            </div>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight font-serif mb-2">
              {projectViewDetails.projectName}
              <span className="block font-serif text-[#B8985A] mt-2">Amenities</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#CFAF6E] to-[#E5C78A] rounded-full mx-auto mt-4"></div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {(Amenities &&
              Amenities.flatMap((item, idx) =>
                idx === 0 && typeof item === "string"
                  ? item.split(",").map((subItem) => subItem.trim())
                  : item
              )
            )?.map((project, idx) => {
              return (
                <div
                  key={idx}
                  className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-amber-200/50 transition-all duration-500 hover:shadow-2xl hover:scale-105 hover:border-[#CFAF6E]/50 overflow-hidden"
                >
                  {/* Golden gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#CFAF6E]/10 to-[#E5C78A]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                  
                  {/* Icon container */}
                  <div className="relative z-10 flex justify-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-[#CFAF6E] to-[#E5C78A] rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                      <Dynamicsvg text={project} className="text-white text-2xl" />
                    </div>
                  </div>
                  
                  {/* Text */}
                  <div className="relative z-10 text-center">
                    <h3 className="text-gray-800 font-semibold text-sm leading-tight group-hover:text-[#B8985A] transition-colors duration-300">
                      {project}
                    </h3>
                  </div>
                  
                  {/* Subtle shine effect */}
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-[#CFAF6E] to-[#E5C78A] rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                </div>
              );
            })}
          </div>
        </div>


        {/* Location & Connectivity - Premium Golden Theme */}
        <div className="py-16 lg:py-24 px-4 lg:px-8 max-w-7xl mx-auto bg-gradient-to-br from-amber-50/50 to-cream-100/30">
          {/* Centered Section Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-12 h-0.5 bg-gradient-to-r from-[#CFAF6E] to-[#E5C78A] rounded-full"></div>
              <span className="text-[#B8985A] font-semibold text-sm uppercase tracking-wider">Location Map</span>
              <div className="w-12 h-0.5 bg-gradient-to-r from-[#E5C78A] to-[#CFAF6E] rounded-full"></div>
            </div>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight font-serif">
              {projectViewDetails.projectName}
              <div className="w-20 h-1 bg-gradient-to-r from-[#CFAF6E] to-[#E5C78A] rounded-full mt-3 mx-auto"></div>
            </h2>
          </div>
          <div className="flex flex-col lg:flex-row justify-center items-stretch gap-12 lg:gap-16">
            {/* Location Image */}
            <div className="w-full lg:w-7/12 relative overflow-hidden order-2 lg:order-1">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                {projectViewDetails?.project_locationImage?.url && (
                  <>
                    <img
                      src={projectViewDetails.project_locationImage.url}
                      alt={`${projectViewDetails.projectName} Location`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                  </>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="w-full lg:w-5/12 flex flex-col justify-center order-1 lg:order-2">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 lg:p-10 shadow-xl border border-amber-200/50">
                <div className="space-y-6">
                  {/* Connectivity */}
                  {projectRedefine_Connectivity?.length > 0 && (
                    <div className="space-y-3">
                      {/* <h3 className="text-xl font-bold text-[#B8985A] mb-3">Connectivity</h3> */}
                      <div className="space-y-2">
                        {projectRedefine_Connectivity.map((item, index) => (
                          <div key={index} className="flex items-start gap-3 group">
                            <div className="w-2 h-2 bg-gradient-to-r from-[#CFAF6E] to-[#E5C78A] rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-300"></div>
                            <p className="text-gray-700 text-lg leading-relaxed">{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Entertainment */}
                  {projectRedefine_Entertainment?.length > 0 && (
                    <div className="space-y-3">
                      {/* <h3 className="text-xl font-bold text-[#B8985A] mb-3">Entertainment</h3> */}
                      <div className="space-y-2">
                        {projectRedefine_Entertainment.map((item, index) => (
                          <div key={index} className="flex items-start gap-3 group">
                            <div className="w-2 h-2 bg-gradient-to-r from-[#CFAF6E] to-[#E5C78A] rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-300"></div>
                            <p className="text-gray-700 text-lg leading-relaxed">{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Business */}
                  {projectRedefine_Business?.length > 0 && (
                    <div className="space-y-3">
                      {/* <h3 className="text-xl font-bold text-[#B8985A] mb-3">Business</h3> */}
                      <div className="space-y-2">
                        {projectRedefine_Business.map((item, index) => (
                          <div key={index} className="flex items-start gap-3 group">
                            <div className="w-2 h-2 bg-gradient-to-r from-[#CFAF6E] to-[#E5C78A] rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-300"></div>
                            <p className="text-gray-700 text-lg leading-relaxed">{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Education */}
                  {projectRedefine_Education?.length > 0 && (
                    <div className="space-y-3">
                      {/* <h3 className="text-xl font-bold text-[#B8985A] mb-3">Education</h3> */}
                      <div className="space-y-2">
                        {projectRedefine_Education.map((item, index) => (
                          <div key={index} className="flex items-start gap-3 group">
                            <div className="w-2 h-2 bg-gradient-to-r from-[#CFAF6E] to-[#E5C78A] rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-300"></div>
                            <p className="text-gray-700 text-lg leading-relaxed">{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>



        {/* Master Plan */}
        <div className="h-fit" >
          <div className="flex flex-justify-center items-stretch rounded h-auto">
            <div className="w-full flex flex-col">
              <div className="py-16 lg:py-24 max-w-7xl mx-auto w-full px-4 lg:px-8">
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <div className="w-12 h-0.5 bg-gradient-to-r from-[#CFAF6E] to-[#E5C78A] rounded-full"></div>
                    <span className="text-[#B8985A] font-semibold text-sm uppercase tracking-wider">Site Plan</span>
                    <div className="w-12 h-0.5 bg-gradient-to-r from-[#E5C78A] to-[#CFAF6E] rounded-full"></div>
                  </div>
                  <h4 className="text-3xl md:text-4xl xl:text-5xl font-serif font-bold text-gray-900">
                    Master Plan of {projectViewDetails.projectName}
                  </h4>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-amber-200/50 overflow-hidden">
                  {projectViewDetails?.projectMaster_plan?.url && (
                    <img
                      src={projectViewDetails.projectMaster_plan.url}
                      alt={`${projectViewDetails.projectName}`}
                      className="w-full h-auto object-contain cursor-zoom-in"
                      onClick={() => setIsMasterPlanOpen(true)}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Master Plan Modal */}
        {isMasterPlanOpen && (
          <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex justify-center items-center p-4">
            <div className="relative max-w-[95vw] max-h-[90vh]">
              <button
                onClick={() => setIsMasterPlanOpen(false)}
                className="absolute -top-12 right-0 bg-gradient-to-r from-[#CFAF6E] to-[#E5C78A] text-white p-3 rounded-full hover:shadow-xl hover:from-[#B8985A] hover:to-[#D4B373] transition-all duration-300 transform hover:scale-105 z-10"
                aria-label="Close"
              >
                <i className="fas fa-times text-lg"></i>
              </button>
              <div className="bg-white rounded-2xl p-4 shadow-2xl">
                <img
                  src={projectViewDetails?.projectMaster_plan?.url}
                  alt={`${projectViewDetails.projectName} Master Plan`}
                  className="max-w-full max-h-[80vh] object-contain rounded-xl"
                />
              </div>
            </div>
          </div>
        )}

        {/* Builder */}

        <div className="h-fit">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="w-12 h-0.5 bg-gradient-to-r from-[#CFAF6E] to-[#E5C78A] rounded-full"></div>
                <span className="text-[#B8985A] font-semibold text-sm uppercase tracking-wider">Builder</span>
                <div className="w-12 h-0.5 bg-gradient-to-r from-[#E5C78A] to-[#CFAF6E] rounded-full"></div>
              </div>
              <h4 className="text-3xl md:text-4xl xl:text-5xl font-serif font-bold text-gray-900">About {projectViewDetails.builderName}</h4>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-amber-200/50 p-6 md:p-10">
              <div className="prose max-w-none text-gray-700 text-lg leading-relaxed">
                <div dangerouslySetInnerHTML={{ __html: builderdescription }} />
              </div>
            </div>
          </div>
        </div>

        <div className="h-fit">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="w-12 h-0.5 bg-gradient-to-r from-[#CFAF6E] to-[#E5C78A] rounded-full"></div>
                <span className="text-[#B8985A] font-semibold text-sm uppercase tracking-wider">F.A.Q</span>
                <div className="w-12 h-0.5 bg-gradient-to-r from-[#E5C78A] to-[#CFAF6E] rounded-full"></div>
              </div>
              <h4 className="text-3xl md:text-4xl xl:text-5xl font-serif font-bold text-gray-900">About {projectViewDetails.projectName}</h4>
            </div>
            <div className='h-fit w-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-amber-200/50 p-4 md:p-6'>
              <Collapse items={items} />
            </div>
          </div>
        </div>

        {/* Related property */}

        <div className="h-fit" >
          <div className="flex flex-justify-center items-stretch rounded h-auto">
            <div className="w-full flex flex-col">
              <div className="flex flex-col md:flex-row h-full">

                <div className="w-full md:w-1/1 sm:w-full p-4 flex flex-col justify-center items-start">
                  <div className="max-w-7xl mx-auto w-full px-4 lg:px-8">
                    <div className="text-center mb-8">
                      <div className="flex items-center justify-center gap-3 mb-3">
                        <div className="w-12 h-0.5 bg-gradient-to-r from-[#CFAF6E] to-[#E5C78A] rounded-full"></div>
                        <span className="text-[#B8985A] font-semibold text-sm uppercase tracking-wider">Others</span>
                        <div className="w-12 h-0.5 bg-gradient-to-r from-[#E5C78A] to-[#CFAF6E] rounded-full"></div>
                      </div>
                      <h4 className="text-3xl md:text-4xl xl:text-5xl font-serif font-bold text-gray-900">Properties by {projectViewDetails.builderName}</h4>
                    </div>


                  <section className="w-full mb-2">
                    <div className="pt-4 rounded-lg relative">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" >
                        {projectsToShow.map((project, idx) => (
                          <div
                            key={idx}
                            className="relative m-auto w-full p-3 max-w-lg flex flex-col overflow-hidden rounded-2xl border border-amber-200/60 bg-white/80 backdrop-blur-sm shadow-xl transition-transform duration-200 hover:scale-105"
                          >
                            <span className="relative flex h-40 overflow-hidden rounded-t-lg cursor-pointer">
                              <Link to={`/${project.project_url}/`} target="blank">
                                <img
                                  className="object-cover w-full h-full"
                                  src={project.frontImage && project.frontImage.url} alt={projectViewDetails.projectName}
                                />
                              </Link>
                              <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow border border-amber-200/60"
                                onClick={() => handleShare(project)}
                              >
                                <ShareFrameIcon />
                              </div>
                            </span>

                            <div className="p-2">
                              <div className="mt-2 flex items-start justify-between">
                                {/* Left section for project name and price */}
                                <div className="flex flex-col items-start">
                                  <h5 className="tracking-tight font-serif font-bold text-center text-base text-gray-900 mb-0">
                                    {project.projectName}
                                  </h5>
                                  <h5 className="tracking-tight text-center text-sm text-gray-600 mb-0">
                                    {project.city}, {project.state}
                                  </h5>
                                  {
                                    !project?.minPrice && !project?.maxPrice ? <span className="text-lg font-bold text-[#8B7355] text-center">₹ Reveal Soon</span> : (
                                      <span className="text-lg font-bold text-gray-900 text-center">
                                        <span className="mr-1">₹</span>
                                        {project.minPrice < 1 ? (
                                          <span>{(project.minPrice * 100).toFixed(2)} L</span>
                                        ) : (
                                          <span>{project.minPrice} Cr </span>
                                        )}
                                        - {project.maxPrice} Cr
                                      </span>

                                    )
                                  }

                                </div>

                                {/* Right section for the arrow icon */}
                                <span className="bg-gradient-to-r from-[#CFAF6E] to-[#E5C78A] h-auto px-2 mt-3 py-1 rounded-full flex justify-center items-center shadow">
                                  <Link to={`/${project.project_url}/`} target="blank">
                                    <ArrowIcon />
                                  </Link>
                                </span>
                              </div>

                            </div>
                          </div>
                        ))}
                      </div>

                      {builderProject.length > 4 && (
                        <div className="flex justify-end mt-2">
                          {" "}
                          {/* Center the button */}
                          <button
                            onClick={() => setShowAllProjects((prev) => !prev)}
                            className="rounded-full mt-2 px-6 justify-center py-3 bg-gradient-to-r from-[#CFAF6E] to-[#E5C78A] text-white text-sm sm:text-base ml-auto mr-auto transition duration-200 shadow-lg hover:shadow-xl"
                          >
                            {showAllProjects ? "View Less" : "View More"}
                            <span className='ml-4'>

                              <ScrollIcon />
                            </span>
                          </button>
                        </div>
                      )}
                    </div>
                  </section>
                  </div>

                </div>



              </div>
            </div>
          </div>
        </div>

        {/* contact us */}

        <section className="bg-gradient-to-br from-cream-50 to-amber-50/40 py-14 px-4 lg:px-8">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left Section */}
            <div className="flex flex-col justify-center space-y-4">
              <span className="lg:text-xl md:text-2xl sm:text-base flex items-center justify-start space-x-2 text-[#B8985A] font-semibold">
                <span className="flex items-center justify-center p-1">
                  <WhiteLineIcon />{" "}
                </span>
                {" "}Contact
              </span>
              <h3 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900">Make an Enquiry</h3>
              <p className="text-lg flex items-center space-x-2 text-gray-800">
                <a
                  href={`tel:${projectViewDetails?.mobileNumber === 9811750130 ? "8527134491" : "8500900100"}`}
                  className="flex items-center justify-center text-gray-900 text-3xl"
                >
                  <span className="text-2xl"><PhoneIcon /></span>
                  <span className="text-2xl"> &nbsp; {`${projectViewDetails?.mobileNumber === 9811750130 ? "+91 8527-134-491" : "+91 8500 900 100"}`}</span>
                </a>
              </p>
            </div>

            {/* Right Section - Form */}
            <div className="p-8 rounded-2xl shadow-xl bg-white/80 backdrop-blur-sm border border-amber-200/50">
              <form className="space-y-5">
                <div>
                  <label htmlFor="name" className="sr-only">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    value={userDetails.name}
                    required
                    placeholder="Enter Your Name*"
                    className="w-full px-4 py-3 rounded-xl bg-white text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-[#D4AF37]/40 border border-amber-200/70 outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="mobile" className="sr-only">Mobile Number</label>
                  <input
                    type="tel"
                    name="mobile"
                    value={userDetails.mobile}
                    onChange={(e) => {
                      const value = e.target.value;
                      // Allow only numbers and ensure length is between 9 and 10 digits
                      if (/^\d*$/.test(value) && value.length <= 10) {
                        handleChange(e);
                      }
                    }}
                    required
                    placeholder="Contact Number*"
                    className="w-full px-4 py-3 rounded-xl bg-white text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-[#D4AF37]/40 border border-amber-200/70 outline-none"
                  />

                  {userDetails.mobile && userDetails.mobile.length < 10 && (
                    <p className="text-red-500 text-sm mt-1">Mobile number must be at least 10 digits.</p>
                  )}


                </div>
                <div>
                  <label htmlFor="email" className="sr-only">Email Address</label>
                  <input
                    type="text"
                    name="email"
                    value={userDetails.email}
                    onChange={(e) => {
                      const { name, value } = e.target;

                      // Update the userDetails state
                      setUserDetails((prev) => ({ ...prev, [name]: value }));

                      // Email validation logic
                      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex for validating email
                      if (!emailRegex.test(value) && value !== "") {
                        setEmailError("Invalid email address"); // Display error if invalid
                      } else {
                        setEmailError(""); // Clear error if valid
                      }
                    }}
                    placeholder="Enter Your Email*"
                    className="w-full px-4 py-3 rounded-xl bg-white text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-[#D4AF37]/40 border border-amber-200/70 outline-none"
                  />

                  {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}

                </div>
                <p className='text-xs text-gray-600'> * Your information will be kept strictly confidential and will not be shared, sold, or otherwise disclosed.</p>
                <button
                  onClick={userSubmitDetails}
                  className="w-full bg-gradient-to-r from-[#CFAF6E] to-[#E5C78A] hover:from-[#B8985A] hover:to-[#D4B373] text-white font-semibold py-3 rounded-full transition duration-200 shadow-lg hover:shadow-xl"
                >
                  {userButtonText} <i className="fa-solid fa-arrow-right"></i>
                </button>
              </form>
            </div>
          </div>
        </section>
        
        <div>
          <a
            href="#"
            className="dd-m-whatsapp"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-whatsapp"></i>
          </a>
        </div>

      </Wrapper>

      {/* Sticky Schedule Site Visit button for mobile only */}
      <div className="fixed bottom-0 left-0 right-0 z-[9999] md:hidden block w-full">
        <button
          className="w-full bg-gradient-to-r from-[#CFAF6E] to-[#E5C78A] text-white text-base font-semibold py-2 shadow-xl rounded-t-2xl flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40 transition-all duration-200 active:scale-95"
          onClick={handleShowInstantcallBack}
          style={{ boxShadow: '0 -2px 16px 0 rgba(212, 175, 55, 0.25)' }}
        >
          {/* Calendar icon for 'Schedule Site Visit' */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <rect x="3" y="4" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="2" fill="none" />
            <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Schedule Site Visit
        </button>
      </div>

      {/* About Project Modal */}
      {isAboutModalOpen && (
        <div className="about-modal-overlay" onClick={() => setIsAboutModalOpen(false)}>
          <div className="about-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="about-modal-header">
              <h2 className="about-modal-title">About {projectViewDetails.projectName}</h2>
              <button 
                className="about-modal-close"
                onClick={() => setIsAboutModalOpen(false)}
                aria-label="Close modal"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="about-modal-body">
              <div dangerouslySetInnerHTML={{ __html: description }} />
            </div>
          </div>
        </div>
      )}

      {/* Instant Callback Modal */}
      {instantcallbackmodal && (
        <div className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative bg-white rounded-2xl max-w-md w-full shadow-2xl">
            <button
              type="button"
              onClick={handleCloseInstantcallBack}
              className="absolute top-3 right-3 text-gray-600 hover:text-black bg-gray-100 hover:bg-gray-200 rounded-full p-2 z-10 transition-colors"
              aria-label="Close"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
            
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-[#CFAF6E] to-[#E5C78A] rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-calendar-alt text-white text-2xl"></i>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Schedule Site Visit</h2>
                <p className="text-gray-600">Get in touch with us for a personalized site visit</p>
              </div>

              <form onSubmit={debouncedSideSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={sideDetails.name}
                    onChange={handleChangeSide}
                    placeholder="Your Name*"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none transition-colors"
                  />
                </div>
                
                <div>
                  <input
                    type="tel"
                    name="mobile"
                    value={sideDetails.mobile}
                    onChange={handleChangeSide}
                    placeholder="Mobile Number*"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none transition-colors"
                  />
                </div>
                
                <div>
                  <input
                    type="email"
                    name="email"
                    value={sideDetails.email}
                    onChange={handleChangeSide}
                    placeholder="Email Address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading2}
                  className="w-full bg-gradient-to-r from-[#CFAF6E] to-[#E5C78A] text-white font-bold py-3 rounded-lg hover:from-[#B8985A] hover:to-[#D4B373] transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#D4AF37]/30 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {sideButtonText}
                </button>
              </form>

              <p className="text-xs text-gray-500 text-center mt-4">
                Your information will be kept strictly confidential and will not be shared.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>

  );
};

export default NewBanner;

const Wrapper = styled.section`
  .sticky-quote-cta {
    height: auto;
    position: fixed;
    border-radius: 15px 0 15px 0;
    right: 0;
    top: 400px;
    top: 40vh;
    z-index: 10000;
  }

  /* Gallery Slider Styles */
  .gallery-slider {
    .slick-slider {
      margin: 0;
      padding: 0;
    }

    .slick-list {
      margin: 0;
      padding: 0;
    }

    .slick-slide {
      padding: 0 8px;
    }

    .slick-dots {
      bottom: -30px;
    }

    .slick-dots li button:before {
      font-size: 12px;
    }
  }

  /* Custom Carousel Styles */
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }

  .snap-x {
    scroll-snap-type: x mandatory;
  }

  .snap-start {
    scroll-snap-align: start;
  }

  .info-card {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 20px;
    padding: 2rem;
    text-align: center;
    transition: all 0.3s ease;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }

  .info-card:hover {
    transform: translateY(-10px);
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  }

  .premium-stats-card {
    background: linear-gradient(145deg, rgba(250, 224, 120, 0.35), rgba(212, 175, 55, 0.25));
    backdrop-filter: blur(16px);
    border: 1px solid rgba(212, 175, 55, 0.45);
    border-radius: 24px;
    padding: 1.5rem;
    text-align: center;
    box-shadow: 0 8px 28px rgba(212, 175, 55, 0.18);
    position: relative;
    overflow: hidden;
    /* Ensure visibility without animations */
    opacity: 1;
    transform: none;
  }

  .premium-stats-card::before {
    content: none;
  }

  /* No hover animations for cards */

  .premium-stats-icon-wrapper {
    display: flex;
    justify-content: center;
    margin-bottom: 0.75rem;
    padding: 0.5rem;
    background: rgba(212, 175, 55, 0.28);
    border-radius: 16px;
    width: fit-content;
    margin-left: auto;
    margin-right: auto;
  }

  .premium-stats-value {
    display: block;
    font-size: 1.25rem;
    font-weight: 700;
    color: #2a2a2a;
    margin-bottom: 0.25rem;
    letter-spacing: -0.025em;
  }

  .premium-stats-label {
    font-size: 0.875rem;
    color: #5a4a1f;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  @media (min-width: 768px) {
    .premium-stats-value {
      font-size: 1.5rem;
    }
    .premium-stats-label {
      font-size: 0.75rem;
    }
  }

  .premium-section-header {}

  .premium-section-subtitle {
    display: flex;
    align-items: center;
    font-size: 1rem;
    color: #5a4a1f;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 1rem;
  }

  .premium-line-icon {
    margin-right: 0.75rem;
    padding: 0.25rem;
  }

  .premium-project-title {
    font-size: 2.5rem;
    font-weight: 800;
    color: #1f2937;
    line-height: 1.2;
    margin-bottom: 0;
    position: relative;
    font-family: 'Playfair Display', serif;
  }

  .premium-title-underline {
    position: absolute;
    bottom: -8px;
    left: 0;
    height: 4px;
    background: linear-gradient(90deg, #E8C547, #D4AF37);
    border-radius: 2px;
    width: 90px;
  }

  @media (min-width: 768px) {
    .premium-project-title {
      font-size: 3.5rem;
    }
  }

  @media (min-width: 1024px) {
    .premium-project-title {
      font-size: 4rem;
    }
  }

  .premium-content-wrapper {}

  .premium-content-text {
    color: #4a5568;
    font-size: 1.125rem;
    line-height: 1.8;
    font-weight: 400;
    max-height: 400px;
    overflow-y: auto;
    padding-right: 0.5rem;
  }

  .premium-content-text::-webkit-scrollbar {
    width: 4px;
  }

  .premium-content-text::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 2px;
  }

  .premium-content-text::-webkit-scrollbar-thumb {
    background: #cbd5e0;
    border-radius: 2px;
  }

  /* About text bold-on-scroll effect */
  .about-scroll-line {
    transition: font-weight 180ms ease, color 180ms ease, text-shadow 200ms ease;
    font-weight: 400;
    color: #4b5563; /* gray-600 */
  }
  .about-scroll-line.in-view-bold {
    font-weight: 700;
    color: #1f2937; /* gray-800 */
    text-shadow: 0 0 0 rgba(0,0,0,0); /* keep subtle to avoid glow */
  }

  .premium-content-text::-webkit-scrollbar-thumb:hover {
    background: #a0aec0;
  }

  /* Stats cards */
  .about-stats-section {
    width: 100%;
  }
  .about-sticky-stats {
    position: sticky;
    top: 64px; /* below fixed navbar */
    z-index: 20;
    background: transparent;
  }
  .about-stats-grid {
    margin: 0 auto;
  }
  .premium-stats-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    background: linear-gradient(180deg, #FAF3D1, #F3E7B3);
    border: 1px solid rgba(212,175,55,0.35);
    border-radius: 22px;
    padding: 18px 16px;
    min-height: 120px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.06);
  }
  .premium-stats-icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background: rgba(255,255,255,0.35);
    backdrop-filter: blur(2px);
  }
  .premium-stats-value {
    font-weight: 800;
    color: #111827;
    font-size: 1.125rem;
    letter-spacing: 0;
    white-space: nowrap;
  }
  .premium-stats-label {
    font-size: 0.70rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #6b7280;
  }
  @media (max-width: 640px) {
    .about-sticky-stats { top: 56px; }
    .premium-stats-card {
      padding: 14px;
      min-height: 110px;
    }
    .premium-stats-value {
      font-size: 1rem;
      white-space: normal; /* allow wrap on tiny screens */
      text-align: center;
    }
  }

  .premium-cta-wrapper {}

  .premium-download-btn {
    position: relative;
    background: linear-gradient(135deg, #F5D76E 0%, #D4AF37 100%);
    color: white;
    padding: 1rem 2rem;
    border-radius: 16px;
    border: none;
    font-weight: 600;
    font-size: 1.125rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    box-shadow: 0 10px 28px rgba(212, 175, 55, 0.35);
    overflow: hidden;
  }
  /* No hover/active animations for button */

  .premium-btn-icon {}

  /* No icon hover motion */

  .premium-btn-glow {
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  }
  /* No glow movement */

  /* Keyframe Animations */
  @keyframes slideUpFadeIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideInFromLeft {
    from {
      opacity: 0;
      transform: translateX(-50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes expandUnderline {
    to {
      width: 80px;
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Enhanced expandable content styles */
  .premium-content-text-expandable {
    color: #4a5568;
    font-size: 1.125rem;
    line-height: 1.8;
    font-weight: 400;
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
    word-break: break-word;
    hyphens: auto;
  }

  .premium-content-text-expandable.collapsed {
    max-height: 140px; /* Approximately 4-5 lines */
  }

  .premium-content-text-expandable.expanded {
    max-height: none;
  }

  /* Expand button styles */
  .premium-expand-btn {
    position: relative;
    background: linear-gradient(135deg, #F5D76E 0%, #D4AF37 100%);
    color: white;
    padding: 12px 24px;
    border-radius: 12px;
    border: none;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    box-shadow: 0 6px 20px rgba(212, 175, 55, 0.25);
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .premium-expand-btn:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 8px 25px rgba(212, 175, 55, 0.35);
  }

  .premium-expand-btn:active {
    transform: translateY(-1px) scale(0.98);
  }

  .premium-expand-btn .premium-btn-icon {
    transition: transform 0.3s ease;
  }

  .premium-expand-btn:hover .premium-btn-icon {
    transform: scale(1.1);
  }

  .premium-expand-btn .premium-btn-glow {
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.6s ease;
  }

  .premium-expand-btn:hover .premium-btn-glow {
    left: 100%;
  }

  /* Mobile optimizations */
  @media screen and (max-width: 768px) {
    .premium-content-text-expandable.collapsed {
      max-height: 120px; /* Slightly less on mobile */
    }
  
    .premium-content-text-expandable {
      font-size: 1rem;
      line-height: 1.6;
    }
  
    .premium-expand-btn {
      padding: 10px 20px;
      font-size: 0.9rem;
    }
  }

  @media screen and (max-width: 480px) {
    .premium-content-text-expandable.collapsed {
      max-height: 100px; /* Even less on very small screens */
    }
  
    .premium-content-text-expandable {
      font-size: 0.95rem;
      line-height: 1.5;
    }
  }


  /* Enhanced Glassmorphism Info Cards */
  .glassmorphism-card {
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(20px);
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.15);
    padding: 32px 24px;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.2);
  }

  .glassmorphism-card:hover {
    transform: translateY(-8px) scale(1.02);
    border-color: rgba(200, 164, 92, 0.3);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(200, 164, 92, 0.2);
  }

  .info-card-icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 80px;
    margin: 0 auto 24px;
    background: linear-gradient(135deg, rgba(200, 164, 92, 0.2), rgba(222, 184, 83, 0.1));
    border-radius: 50%;
    border: 2px solid rgba(200, 164, 92, 0.3);
  }

  .info-card-icon {
    color: #c8a45c;
    font-size: 32px;
    transition: all 0.4s ease;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
  }

  .glassmorphism-card:hover .info-card-icon {
    transform: scale(1.1);
    color: #deb853;
  }

  .info-card-value {
    display: block;
    font-size: 1.75rem;
    font-weight: 700;
    color: #fff;
    margin-bottom: 8px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  .info-card-label {
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.95rem;
    font-weight: 500;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }

  .premium-heading {
    font-family: 'Playfair Display', 'Georgia', serif;
    font-size: clamp(2.5rem, 8vw, 4.5rem);
    font-weight: 700;
    background: linear-gradient(135deg, #fff 0%, #c8a45c 50%, #deb853 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
    letter-spacing: -0.02em;
    line-height: 1.1;
    animation: titleGlow 3s ease-in-out infinite alternate;
  }

  @keyframes titleGlow {
    from { filter: drop-shadow(0 0 10px rgba(200, 164, 92, 0.3)); }
    to { filter: drop-shadow(0 0 20px rgba(200, 164, 92, 0.6)); }
  }

  .hero-background {
    animation: slowZoom 30s infinite alternate;
  }

  @keyframes slowZoom {
    from { transform: scale(1); }
    to { transform: scale(1.05); }
  }

  .premium-subheading {
    font-family: 'Inter', sans-serif;
    font-size: 1.25rem;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 2rem;
  }

  .sticky-quote-cta a {
    color: white;
    text-decoration: none;
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
    padding: 16px 24px 36px;
    display: block;
    font-weight: 600;
    font-size: 15px;
    border-radius: 8px 0 0 8px;
    transform: rotate(-270deg) translate(0, -20px);
    position: relative;
    right: -42px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 4px 6px -1px rgb(239 68 68 / 0.1), 0 2px 4px -2px rgb(239 68 68 / 0.1);
    backdrop-filter: blur(8px);
  }

  .sticky-quote-cta a:hover {
    right: -32px;
    cursor: pointer;
    background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
    box-shadow: 0 20px 25px -5px rgb(239 68 68 / 0.1), 0 8px 10px -6px rgb(239 68 68 / 0.1);
  }
    .dd-m-phone {
    position: fixed;
    z-index: 999;
    bottom: 40px;
    right: 16px;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: #2563eb;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
    text-decoration: none;
    color: #fff;
    font-size: 24px;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  }

  .dd-m-phone:hover {
    transform: scale(1.1);
    box-shadow: 0 20px 25px -5px rgb(37 99 235 / 0.1), 0 8px 10px -6px rgb(37 99 235 / 0.1);
    background-color: #1d4ed8;
  }

  .dd-m-phone i {
    font-size: 24px; /* Adjust icon size as needed */
  }

  .Carousel {
    max-height: 80vh;
    position: relative;
    overflow: hidden;
  }

  .Carousel::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.6) 0%,
      rgba(0, 0, 0, 0.4) 30%,
      rgba(0, 0, 0, 0.1) 100%
    );
    pointer-events: none;
    z-index: 1;
  }

  .Carousel img {
    transform: scale(1);
    transition: transform 6s ease-in-out;
    animation: slowZoom 20s infinite alternate;
  }

  @keyframes slowZoom {
    from { transform: scale(1); }
    to { transform: scale(1.1); }
  }

  /* Mobile Optimizations */
  @media screen and (max-width: 768px) {
    .Carousel {
      height: 100vh;
      max-height: 100vh;
    }
    .Carousel img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .premium-heading {
      font-size: clamp(1.6rem, 7.5vw, 2.2rem);
      margin: 0.25rem 0 0.5rem 0;
    }

    .glassmorphism-card {
      padding: 24px 16px;
      margin-bottom: 16px;
    }

    .info-card-icon-wrapper {
      width: 60px;
      height: 60px;
      margin-bottom: 16px;
    }

    .info-card-icon {
      font-size: 24px;
    }

    .info-card-value {
      font-size: 1.4rem;
    }

    .info-card-label {
      font-size: 0.85rem;
    }

    .cta-primary, .cta-secondary {
      width: 100%;
      margin: 8px 0;
      padding: 12px 16px;
      font-size: 1rem;
      min-width: auto;
    }

    .social-proof {
      padding: 16px 12px;
      margin-top: 16px;
      padding: 24px 16px;
      margin-top: 32px;
    }

    .testimonial-text {
      font-size: 1rem;
    }

    .urgency-banner {
      padding: 10px 16px;
      font-size: 0.9rem;
    }

    .floating-particles .particle {
      display: none;
    }

    .clouds .cloud {
      display: none;
    }

    /* Hide vertical brochure tab on mobile to avoid overlap */
    .sticky-quote-cta { display: none; }

    /* Improve readability of text over hero image on mobile */
    .Carousel::after {
      background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.65) 0%,
        rgba(0, 0, 0, 0.45) 35%,
        rgba(0, 0, 0, 0.15) 100%
      );
    }
  }

  @media screen and (max-width: 480px) {
    .glassmorphism-card {
      padding: 20px 12px;
    }

    .info-card-value {
      font-size: 1.2rem;
    }

    .social-proof {
      flex-direction: column;
      gap: 16px;
    }

    .Carousel { height: 100vh; max-height: 100vh; }
    .Carousel img { width: 100%; height: 100%; object-fit: cover; }
    .premium-heading { font-size: clamp(1.4rem, 8vw, 1.9rem); }
    .premium-subheading { font-size: 0.95rem; }
    .cta-primary, .cta-secondary { padding: 12px 14px; font-size: 0.95rem; }
  }

  /* About + Hero extra responsive rules */
  @media screen and (min-width: 1024px) {
    /* Navbar height offset; adjust if navbar size changes */
    #about {
      --sticky-top: var(--nav-h, 96px); /* use measured navbar height */
      scroll-margin-top: var(--sticky-top);
      padding-top: calc(var(--sticky-top) + 8px); /* ensure section sits below nav */
    }
  }

  /* Tablet and below adjustments for About */
  @media screen and (max-width: 1024px) {
    .about-image {
      height: 50vh !important;
    }
    .gold-text-panel {
      padding: 20px;
    }
  }

  /* About spacing tweaks */
  .about-content-section .gold-text-panel {
    margin-top: 0;
    border: none;
  }
  /* Remove internal scrolling for About text */
  .premium-content-wrapper,
  .premium-content-text {
    max-height: none !important;
    overflow: visible !important;
  }
  .premium-section-header {
    margin-top: 0;
    padding-top: 0;
  }
  .premium-project-title {
    margin-top: 0;
  }

  @media screen and (max-width: 768px) {
    .about-stats-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 16px;
      padding-left: 0;
      padding-right: 0;
    }
    .about-image {
      height: 38vh !important;
    }
    .gold-text-panel {
      padding: 12px 16px 16px 16px;
      margin-top: 0;
      border-radius: 16px;
    }
    .premium-project-title {
      font-size: 1.875rem; /* ~30px */
      margin-top: 0;
    }
    .premium-content-text {
      font-size: 1rem;
      max-height: none;
      overflow: visible;
      padding-right: 0;
    }
    .premium-stats-value {
      font-size: 1.25rem;
    }
    .premium-stats-label {
      font-size: 0.75rem;
    }
  }

  @media screen and (max-width: 480px) {
    .about-image {
      height: 32vh !important;
    }
    .premium-project-title {
      font-size: 1.5rem;
    }
  }

  .cta-primary {
    background: linear-gradient(135deg, #c8a45c 0%, #deb853 50%, #c8a45c 100%);
    color: #fff;
    padding: 18px 36px;
    border-radius: 50px;
    font-weight: 700;
    font-size: 1.1rem;
    text-decoration: none;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 220px;
    border: none;
    box-shadow: 0 8px 25px rgba(200, 164, 92, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1);
    cursor: pointer;
    letter-spacing: 0.5px;
  }

  .cta-primary::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: -100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: 0.5s;
  }

  .cta-primary:hover::after {
    left: 100%;
  }

  .cta-primary:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 15px 35px rgba(200, 164, 92, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.2);
  }

  .cta-secondary {
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(20px);
    color: #fff;
    padding: 16px 32px;
    border-radius: 50px;
    font-weight: 600;
    font-size: 1.05rem;
    text-decoration: none;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    border: 1px solid rgba(255, 255, 255, 0.15);
    margin-left: 16px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 200px;
    cursor: pointer;
    letter-spacing: 0.3px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }

  .cta-secondary:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(200, 164, 92, 0.4);
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(200, 164, 92, 0.2);
  }

  /* Floating Particles Animation */
  .floating-particles {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .particle {
    position: absolute;
    background: rgba(200, 164, 92, 0.6);
    border-radius: 50%;
    pointer-events: none;
  }

  .particle-1 {
    width: 4px;
    height: 4px;
    top: 20%;
    left: 10%;
    animation: float1 15s infinite ease-in-out;
  }

  .particle-2 {
    width: 6px;
    height: 6px;
    top: 60%;
    left: 80%;
    animation: float2 20s infinite ease-in-out;
  }

  .particle-3 {
    width: 3px;
    height: 3px;
    top: 80%;
    left: 20%;
    animation: float3 18s infinite ease-in-out;
  }

  .particle-4 {
    width: 5px;
    height: 5px;
    top: 30%;
    left: 70%;
    animation: float4 22s infinite ease-in-out;
  }

  .particle-5 {
    width: 4px;
    height: 4px;
    top: 70%;
    left: 50%;
    animation: float5 16s infinite ease-in-out;
  }

  .particle-6 {
    width: 7px;
    height: 7px;
    top: 40%;
    left: 30%;
    animation: float6 25s infinite ease-in-out;
  }

  @keyframes float1 {
    0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.7; }
    25% { transform: translateY(-20px) translateX(10px); opacity: 1; }
    50% { transform: translateY(-40px) translateX(-5px); opacity: 0.8; }
    75% { transform: translateY(-20px) translateX(-10px); opacity: 0.9; }
  }

  @keyframes float2 {
    0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.6; }
    33% { transform: translateY(-30px) translateX(-15px); opacity: 1; }
    66% { transform: translateY(-10px) translateX(15px); opacity: 0.8; }
  }

  @keyframes float3 {
    0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.8; }
    50% { transform: translateY(-25px) translateX(8px); opacity: 1; }
  }

  @keyframes float4 {
    0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.7; }
    25% { transform: translateY(-15px) translateX(-12px); opacity: 0.9; }
    50% { transform: translateY(-35px) translateX(5px); opacity: 1; }
    75% { transform: translateY(-20px) translateX(12px); opacity: 0.8; }
  }

  @keyframes float5 {
    0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.6; }
    50% { transform: translateY(-20px) translateX(-8px); opacity: 1; }
  }

  @keyframes float6 {
    0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.8; }
    20% { transform: translateY(-10px) translateX(15px); opacity: 0.9; }
    40% { transform: translateY(-30px) translateX(-10px); opacity: 1; }
    60% { transform: translateY(-25px) translateX(20px); opacity: 0.9; }
    80% { transform: translateY(-15px) translateX(-15px); opacity: 0.8; }
  }

  /* Subtle Cloud Animation */
  .clouds {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .cloud {
    position: absolute;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 100px;
    opacity: 0.6;
  }

  .cloud-1 {
    width: 100px;
    height: 40px;
    top: 20%;
    left: -100px;
    animation: drift1 60s infinite linear;
  }

  .cloud-2 {
    width: 80px;
    height: 30px;
    top: 40%;
    left: -80px;
    animation: drift2 80s infinite linear;
  }

  .cloud-3 {
    width: 120px;
    height: 50px;
    top: 60%;
    left: -120px;
    animation: drift3 100s infinite linear;
  }

  @keyframes drift1 {
    from { transform: translateX(0); }
    to { transform: translateX(calc(100vw + 100px)); }
  }

  @keyframes drift2 {
    from { transform: translateX(0); }
    to { transform: translateX(calc(100vw + 80px)); }
  }

  @keyframes drift3 {
    from { transform: translateX(0); }
    to { transform: translateX(calc(100vw + 120px)); }
  }

  .urgency-banner {
    background: rgba(239, 68, 68, 0.15);
    backdrop-filter: blur(15px);
    border: 1px solid rgba(239, 68, 68, 0.3);
    color: #fff;
    padding: 12px 20px;
    border-radius: 25px;
    font-size: 0.95rem;
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    margin-bottom: 24px;
    animation: urgencyPulse 2s infinite;
    box-shadow: 0 4px 15px rgba(239, 68, 68, 0.2);
    letter-spacing: 0.3px;
  }

  .urgency-banner i {
    margin-right: 10px;
    color: #ef4444;
    animation: fire 1.5s infinite alternate;
  }

  @keyframes urgencyPulse {
    0%, 100% {
      box-shadow: 0 4px 15px rgba(239, 68, 68, 0.2);
    }
    50% {
      box-shadow: 0 6px 20px rgba(239, 68, 68, 0.3);
    }
  }

  @keyframes fire {
    from { transform: scale(1); }
    to { transform: scale(1.1); }
  }


  //Whtsapp Icon CSS

  .floating-actions {
    position: fixed;
    z-index: 999;
    bottom: 40px;
    right: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .dd-m-whatsapp {
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: linear-gradient(135deg, #25d366 0%, #128c7e 100%);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
    text-decoration: none;
    color: #fff;
    font-size: 24px;
    box-shadow: 0 4px 15px rgba(37, 211, 102, 0.2);
    position: relative;
  }

  .dd-m-whatsapp::before {
    content: '';
    position: absolute;
    inset: -2px;
    background: linear-gradient(135deg, #25d366 0%, #128c7e 100%);
    border-radius: 50%;
    z-index: -1;
    opacity: 0.5;
    transition: opacity 0.3s ease;
  }

  .dd-m-whatsapp:hover {
    transform: translateY(-5px);
  }

  .dd-m-whatsapp:hover::before {
    animation: pulse 1.5s infinite;
  }

  @keyframes pulse {
    0% { transform: scale(1); opacity: 0.5; }
    70% { transform: scale(1.3); opacity: 0; }
    100% { transform: scale(1.3); opacity: 0; }
  }

  /* Social Proof Section */
  .social-proof {
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(20px);
    border-radius: 20px;
    padding: 32px;
    margin-top: 48px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    justify-content: center;
    align-items: center;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  .testimonial {
    text-align: center;
    color: #fff;
    margin-bottom: 16px;
  }

  .testimonial-rating {
    color: #fbbf24;
    font-size: 24px;
    margin-bottom: 12px;
    text-shadow: 0 2px 4px rgba(251, 191, 36, 0.3);
  }

  .testimonial-text {
    font-style: italic;
    font-size: 1.1rem;
    margin-bottom: 16px;
    opacity: 0.95;
    line-height: 1.6;
    max-width: 400px;
  }

  .testimonial-author {
    font-weight: 600;
    color: #c8a45c;
    font-size: 0.95rem;
    letter-spacing: 0.5px;
  }

  /* Video Preview Button */
  .video-preview-btn {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(15px);
    color: #fff;
    padding: 14px 28px;
    border-radius: 50px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    letter-spacing: 0.3px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }

  .video-preview-btn:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px) scale(1.02);
    border-color: rgba(200, 164, 92, 0.4);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }

  .video-preview-btn i {
    color: #c8a45c;
  }

  .dd-m-whatsapp i {
    font-size: 24px; /* Adjust icon size as needed */
  }

  /* Premium Modal Styles */
  .premium-modal-container {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow:
      0 25px 50px rgba(0, 0, 0, 0.25),
      0 0 0 1px rgba(255, 255, 255, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
  }

  .premium-modal-header {
    background: linear-gradient(135deg, #c8a45c 0%, #deb853 100%);
    position: relative;
    overflow: hidden;
  }



  .premium-modal-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    margin: 0 auto;
    animation: iconPulse 2s infinite;
  }

  @keyframes iconPulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }

  .premium-modal-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.75rem;
    font-weight: 700;
    color: #fff;
    margin: 0;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  .premium-modal-subtitle {
    color: rgba(255, 255, 255, 0.9);
    font-size: 0.95rem;
    margin: 8px 0 0 0;
    font-weight: 400;
  }

  .premium-close-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
  }

  .premium-close-btn:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }

  .premium-modal-body {
    padding: 32px 24px;
    background: rgba(255, 255, 255, 0.98);
  }

  .premium-input-group {
    margin-bottom: 24px;
  }

  .premium-input-wrapper {
    position: relative;
  }

  .premium-input {
    width: 100%;
    padding: 16px 16px 16px 50px;
    border: 2px solid rgba(200, 164, 92, 0.2);
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    font-size: 1rem;
    color: #333;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    outline: none;
  }

  .premium-input:focus {
    border-color: #c8a45c;
    background: rgba(255, 255, 255, 0.95);
    box-shadow:
      0 0 0 3px rgba(200, 164, 92, 0.1),
      0 4px 15px rgba(200, 164, 92, 0.2);
    transform: translateY(-2px);
  }

  .premium-input::placeholder {
    color: rgba(0, 0, 0, 0.4);
    font-weight: 400;
  }

  .premium-input-icon {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: #c8a45c;
    font-size: 16px;
    z-index: 2;
    transition: all 0.3s ease;
  }

  .premium-input:focus + .premium-input-icon,
  .premium-input-wrapper:hover .premium-input-icon {
    color: #deb853;
    transform: translateY(-50%) scale(1.1);
  }

  .premium-input-label {
    position: absolute;
    left: 50px;
    top: -10px;
    background: linear-gradient(135deg, #c8a45c, #deb853);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-size: 0.85rem;
    font-weight: 600;
    padding: 0 8px;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }

  .premium-privacy-notice {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px 16px;
    background: rgba(34, 197, 94, 0.1);
    border: 1px solid rgba(34, 197, 94, 0.2);
    border-radius: 8px;
    color: #059669;
    font-size: 0.85rem;
    font-weight: 500;
    margin-bottom: 24px;
  }

  .premium-submit-section {
    text-align: center;
  }

  .premium-submit-btn {
    width: 100%;
    padding: 16px 24px;
    background: linear-gradient(135deg, #c8a45c 0%, #deb853 50%, #c8a45c 100%);
    border: none;
    border-radius: 12px;
    color: #fff;
    font-size: 1.1rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    box-shadow:
      0 8px 25px rgba(200, 164, 92, 0.3),
      0 0 0 1px rgba(255, 255, 255, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }

  .premium-submit-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, #deb853 0%, #f4d03f 50%, #deb853 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
    border-radius: 12px;
  }

  .premium-submit-btn:hover::before {
    opacity: 1;
  }

  .premium-submit-btn:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow:
      0 15px 35px rgba(200, 164, 92, 0.4),
      0 0 0 1px rgba(255, 255, 255, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
  }

  .premium-submit-btn:active {
    transform: translateY(-1px) scale(0.98);
  }

  .premium-submit-text,
  .premium-submit-icon {
    position: relative;
    z-index: 2;
    transition: all 0.3s ease;
  }

  .premium-submit-btn:hover .premium-submit-icon {
    transform: translateX(4px);
  }

  .premium-callback-info {
    margin-top: 20px;
    padding: 16px;
    background: rgba(59, 130, 246, 0.05);
    border: 1px solid rgba(59, 130, 246, 0.1);
    border-radius: 8px;
    color: #6b7280;
  }

  /* Mobile Optimizations for Modal */
  @media screen and (max-width: 480px) {
    .premium-modal-container {
      width: 95%;
      margin: 20px auto;
    }

    .premium-modal-header {
      padding: 20px 16px;
    }

    .premium-modal-body {
      padding: 24px 16px;
    }

    .premium-modal-title {
      font-size: 1.5rem;
    }

    .premium-input {
      padding: 14px 14px 14px 45px;
    }

    .premium-input-icon {
      left: 14px;
    }

    .premium-input-label {
      left: 45px;
    }
  }

  /* About Project Modal Styles */
  .about-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    animation: modalFadeIn 0.3s ease-out;
  }

  @keyframes modalFadeIn {
    from {
      opacity: 0;
      backdrop-filter: blur(0px);
      -webkit-backdrop-filter: blur(0px);
    }
    to {
      opacity: 1;
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
    }
  }

  .about-modal-container {
    background: white;
    border-radius: 16px;
    max-width: 800px;
    width: 100%;
    max-height: 90vh;
    overflow: hidden;
    box-shadow: 
      0 25px 50px -12px rgba(0, 0, 0, 0.25),
      0 0 0 1px rgba(255, 255, 255, 0.1);
    animation: modalSlideIn 0.3s ease-out;
    position: relative;
  }

  @keyframes modalSlideIn {
    from {
      opacity: 0;
      transform: scale(0.95) translateY(20px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }

  .about-modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24px 32px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    background: linear-gradient(135deg, rgba(200, 164, 92, 0.05), rgba(222, 184, 83, 0.05));
  }

  .about-modal-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1f2937;
    margin: 0;
    background: linear-gradient(135deg, #c8a45c, #deb853);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .about-modal-close {
    background: none;
    border: none;
    font-size: 1.25rem;
    color: #6b7280;
    cursor: pointer;
    padding: 8px;
    border-radius: 8px;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
  }

  .about-modal-close:hover {
    background: rgba(239, 68, 68, 0.1);
    color: #ef4444;
    transform: scale(1.1);
  }

  .about-modal-body {
    padding: 32px;
    max-height: calc(90vh - 120px);
    overflow-y: auto;
    line-height: 1.7;
    color: #374151;
    font-size: 1rem;
  }

  .about-modal-body::-webkit-scrollbar {
    width: 6px;
  }

  .about-modal-body::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 3px;
  }

  .about-modal-body::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #c8a45c, #deb853);
    border-radius: 3px;
  }

  .about-modal-body::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, #deb853, #f4d03f);
  }

  .about-modal-body h1,
  .about-modal-body h2,
  .about-modal-body h3,
  .about-modal-body h4,
  .about-modal-body h5,
  .about-modal-body h6 {
    color: #1f2937;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    font-weight: 600;
  }

  .about-modal-body h1 { font-size: 1.75rem; }
  .about-modal-body h2 { font-size: 1.5rem; }
  .about-modal-body h3 { font-size: 1.25rem; }

  .about-modal-body p {
    margin-bottom: 1rem;
  }

  .about-modal-body ul,
  .about-modal-body ol {
    margin-bottom: 1rem;
    padding-left: 1.5rem;
  }

  .about-modal-body li {
    margin-bottom: 0.5rem;
  }

  .about-modal-body strong {
    color: #1f2937;
    font-weight: 600;
  }

  /* Mobile Responsive */
  @media (max-width: 768px) {
    .about-modal-overlay {
      padding: 16px;
    }

    .about-modal-container {
      max-height: 95vh;
      border-radius: 12px;
    }

    .about-modal-header {
      padding: 20px 24px;
    }

    .about-modal-title {
      font-size: 1.25rem;
    }

    .about-modal-body {
      padding: 24px;
      max-height: calc(95vh - 100px);
      font-size: 0.95rem;
    }
  }

  @media (max-width: 480px) {
    .about-modal-overlay {
      padding: 12px;
    }

    .about-modal-header {
      padding: 16px 20px;
    }

    .about-modal-title {
      font-size: 1.125rem;
    }

    .about-modal-body {
      padding: 20px;
      font-size: 0.9rem;
    }
  }
`;