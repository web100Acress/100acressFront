import { Button, message } from "antd";
import axios from "axios";
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { format, isValid, parseISO } from "date-fns";
import { Helmet } from "react-helmet";
import "../../styles/NewBanner.css";
import FAQSection from "./NewBanner/FAQSection";
import RelatedSection from "./NewBanner/RelatedSection";
import ContactSection from "./NewBanner/ContactSection";
import StickyVisitButton from "./NewBanner/StickyVisitButton";
import InstantCallbackModal from "./NewBanner/InstantCallbackModal";
import MasterPlanSection from "./NewBanner/MasterPlanSection";
import BuilderSection from "./NewBanner/BuilderSection";
import GallerySection from "./NewBanner/GallerySection";
import AmenitiesSection from "./NewBanner/AmenitiesSection";
import LocationSection from "./NewBanner/LocationSection";
import AboutSection from "./NewBanner/AboutSection";
import HighlightsSection from "./NewBanner/HighlightsSection";
import PricingSection from "./NewBanner/PricingSection";
import FloorPlanSection from "./NewBanner/FloorPlanSection";
import { PhoneIcon, LocationSmallIcon } from "../../Assets/icons";
import { DataContext } from "../../MyContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Api_Service from "../../Redux/utils/Api_Service";
import { Link, useNavigate, useParams } from "react-router-dom";
const NewBanner = () => {
  const { pUrl } = useParams();
  const [projectViewDetails, setProjectViewDetails] = useState([]);
  const [isAboutExpanded, setIsAboutExpanded] = useState(false);
  const [builderName, setBuilderName] = useState([]);
  const [isMasterPlanOpen, setIsMasterPlanOpen] = useState(false);
  const { project } = useContext(DataContext);
  const slideRefs = useRef(null);
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
      const nav = document.getElementById("project-nav");
      if (!nav) return;
      const h = nav.offsetHeight || 0;
      document.documentElement.style.setProperty("--nav-h", `${h}px`);
    };
    updateNavHeight();
    window.addEventListener("resize", updateNavHeight);
    return () => window.removeEventListener("resize", updateNavHeight);
  }, []);
  useEffect(() => {
    const checkTextHeight = () => {
      if (aboutTextRef.current && aboutImageRef.current) {
        const textHeight = aboutTextRef.current.scrollHeight;
        const imageHeight = aboutImageRef.current.offsetHeight;
        setShowViewMoreBtn(textHeight > imageHeight);
      }
    };
    checkTextHeight();
    window.addEventListener("resize", checkTextHeight);

    // Also check when content loads
    const timer = setTimeout(checkTextHeight, 1000);

    return () => {
      window.removeEventListener("resize", checkTextHeight);
      clearTimeout(timer);
    };
  }, [projectViewDetails]);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isAboutModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isAboutModalOpen]);

  // About text: bold lines (paragraphs/items) on scroll into view
  useEffect(() => {
    const container = aboutTextRef?.current;
    if (!container) return;
    const targets = container.querySelectorAll("p, li");
    targets.forEach((el) => el.classList.add("about-scroll-line"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view-bold");
          } else {
            entry.target.classList.remove("in-view-bold");
          }
        });
      },
      {
        root: null, // viewport
        threshold: 0.3,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [projectViewDetails, isAboutModalOpen]);

  useEffect(() => {
    const container = document.querySelector(".nb-gallery-scroll");
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

      container.addEventListener("scroll", handleScroll);
      container.addEventListener("touchstart", handleUserInteraction);
      container.addEventListener("mousedown", handleUserInteraction);

      // Auto-scroll functionality
      const autoScrollInterval = setInterval(() => {
        if (isAutoScrolling) {
          const nextIndex =
            (galleryCurrentIndex + 1) %
            projectViewDetails.projectGallery.length;
          container.scrollTo({
            left: nextIndex * container.offsetWidth,
            behavior: "smooth",
          });
          setGalleryCurrentIndex(nextIndex);
        }
      }, 2000); // 1 second interval

      return () => {
        container.removeEventListener("scroll", handleScroll);
        container.removeEventListener("touchstart", handleUserInteraction);
        container.removeEventListener("mousedown", handleUserInteraction);
        clearInterval(autoScrollInterval);
      };
    }
  }, [
    projectViewDetails?.projectGallery,
    galleryCurrentIndex,
    isAutoScrolling,
  ]);

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
        className={`nb-dot ${i === currentIndex ? "nb-dot-active" : ""}`}
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
    autoplay: false,
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
        className={`nb-dot ${i === galleryCurrentIndex ? "nb-dot-active" : ""}`}
      ></button>
    ),
    afterChange: (index) => setGalleryCurrentIndex(index),
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!pUrl) {
          console.error("Url is undefined or empty.");
          return;
        }

        const response = await axios.get(
          `/project/View/${pUrl}`
        );
        if (response.data.dataview.length === 0) {
          navigate("/");
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
          console.error("No project data found.");
        }
      } catch (error) {
        console.error("Error fetching Project Data:", error);
      }
    };
    fetchData();
  }, [pUrl, navigate]);

  // Ensure main navbar stays visible on this page (no hiding here)

  useEffect(() => {
    const setVW = () => setIsMobile(window.innerWidth < 640);
    setVW();
    window.addEventListener("resize", setVW);
    return () => window.removeEventListener("resize", setVW);
  }, []);

  useEffect(() => {
    if (isAboutModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isAboutModalOpen]);

  // Scroll-driven hero transition state
  const heroStickyRef = useRef(null);
  const heroBgRef = useRef(null);
  const nextSectionRef = useRef(null);
  const statsRef = useRef(null);
  const [heroOpacity, setHeroOpacity] = useState(1);
  const [heroBgY, setHeroBgY] = useState(0); // px translateY upwards (negative)
  const [nextY, setNextY] = useState(30); // px translateY for next section
  const [navShown, setNavShown] = useState(true);

  useEffect(() => {
    const easeInOut = (t) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const hero = heroStickyRef.current;
        if (!hero) {
          ticking = false;
          return;
        }
        const rect = hero.getBoundingClientRect();
        const vh = window.innerHeight || 1;
        // progress: 0 when hero top at viewport top, 1 when hero bottom reaches viewport top
        const progressRaw = Math.min(
          Math.max(-rect.top / Math.max(rect.height, 1), 0),
          1
        );
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
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
  };

  const handleCloseInstantcallBack = () => {
    setInstantCallbackmodal(false);
  };

  const handleChangeSide = (e) => {
    const { name, value } = e.target;
    setSideDetails({ ...sideDetails, [name]: value });
  };

  const handlePopChange = (e) => {
    const { name, value } = e.target;
    setPopDetails({ ...popDetails, [name]: value });
  };

  const popSubmitDetails = useCallback(
    async (e) => {
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
          await axios.post("/userInsert", {
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
    },
    [
      isLoading1,
      popDetails,
      projectViewDetails.projectName,
      projectViewDetails.projectAddress,
    ]
  );

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
  const userSubmitDetails = useCallback(
    (e) => {
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
            .post("/userInsert", {
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
    },
    [
      isLoading2,
      userDetails,
      projectViewDetails.projectName,
      projectViewDetails.projectAddress,
    ]
  );

  const SideSubmitDetails = useCallback(
    async (e) => {
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
          await axios.post("/userInsert", {
            ...sideDetails,
            projectName: projectViewDetails.projectName,
            address: projectViewDetails.projectAddress,
          });
          setInstantCallbackmodal(false);
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
    },
    [
      isLoading2,
      sideDetails,
      projectViewDetails.projectName,
      projectViewDetails.projectAddress,
    ]
  );

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
      content: `${projectViewDetails.projectName} is a ${
        projectViewDetails?.project_Status
      } project with possession scheduled for ${formatDate(
        projectViewDetails?.possessionDate
      )}.`,
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
      title: `What types of BHK units are available in  ${projectViewDetails?.projectName} ${projectViewDetails?.projectAddress}`,
      content: ` ${
        projectViewDetails?.projectName
      } offers thoughtfully designed ${projectViewDetails.BhK_Details?.map(
        (data) => ` ${data.bhk_type}`
      )} ${
        projectViewDetails?.projectOverview !== "none"
          ? ` ${projectViewDetails.projectOverview} floors`
          : ""
      } units, catering to modern lifestyle needs.`,
    },
  ];
  const items = text.map((item, index) => ({
    key: index + 1,
    label: ` ${item.title} ?`,
    children: <p>{item.content}</p>,
  }));

  return (
    <div>
      <div
        className="section"
        style={{ overflow: "hidden", overflowX: "hidden" }}
      >
        <Helmet>
          <title>{projectViewDetails?.meta_title}</title>
          <meta
            name="description"
            content={projectViewDetails.meta_description}
          />
          <meta property="og:title" content={projectViewDetails?.meta_title} />
          <meta property="og:site_name" content="100acress.com" />
          <meta property="og:type" content="website" />
          <meta
            property="og:image"
            content={projectViewDetails?.frontImage?.url}
          />
          <meta property="og:url" content="https://www.100acress.com/" />
          <meta
            property="og:description"
            content={projectViewDetails.meta_description}
          />
          <meta name="twitter:title" content={projectViewDetails?.meta_title} />
          <meta
            name="twitter:description"
            content={projectViewDetails.meta_description}
          />
          <meta property="twitter:url" content="https://www.100acress.com/" />
          <meta
            property="twitter:image"
            content={projectViewDetails?.frontImage?.url}
          />
          <meta name="twitter:card" content="summary"></meta>
          <link
            rel="canonical"
            href={`https://www.100acress.com/${projectViewDetails.project_url}/`}
          />
          {/* Load Jost font for hero title */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,200..900;1,200..900&display=swap"
            rel="stylesheet"
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
                ${
                  projectViewDetails.frontImage &&
                  projectViewDetails.frontImage.url
                    ? `"image": "${projectViewDetails.frontImage.url}",`
                    : ""
                }
                "location": {
                  "name": "${projectViewDetails.projectAddress} ${
              projectViewDetails.city
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
        <div className="nb-hero" style={{ minHeight: "100dvh" }}>
          <div
            ref={heroStickyRef}
            className="nb-hero-sticky"
            style={{ height: "100dvh" }}
          >
            <div
              style={{
                opacity: heroOpacity,
                transition: "opacity 120ms ease-in-out",
              }}
            >
              {/* High-Resolution Background with Enhanced Gradient */}
              <div
                ref={heroBgRef}
                className="nb-hero-bg hero-background"
                style={{
                  minHeight: "100dvh",
                  height: "100dvh",
                  width: "100%",
                  // Inline background to guarantee visibility even if <img> fails
                  backgroundImage: `url(${
                    projectViewDetails?.frontImage?.url ||
                    projectViewDetails?.projectGallery?.[0]?.url ||
                    ""
                  })`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundColor: "#0b1c26",
                  transform: isMobile
                    ? "translateY(0px)"
                    : `translateY(${heroBgY}px)`,
                  willChange: "transform",
                }}
              >
                {/* Force image to fill viewport consistently */}
                <img
                  src={
                    projectViewDetails?.frontImage?.url ||
                    projectViewDetails?.projectGallery?.[0]?.url ||
                    ""
                  }
                  alt={projectViewDetails?.projectName || "Project Hero"}
                  className="nb-hero-bg-img"
                  loading="eager"
                />
                {/* Enhanced Multi-layer Gradient Overlay */}
                <div className="nb-overlay-b"></div>
                <div className="nb-overlay-r"></div>
                {/* Mobile-only bottom-to-top black -> white gradient with increasing opacity bottom to top */}
                <div className="nb-overlay-mobile"></div>

                {/* Animated Elements */}
                <div className="nb-anim-layer">
                  {/* Floating Particles */}
                  <div className="floating-particles">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className={`particle particle-${i + 1}`}
                      ></div>
                    ))}
                  </div>
                  {/* About - Full content modal */}
                  {isAboutModalOpen && (
                    <div className="about-modal-overlay">
                      <div className="about-modal-container">
                        <button
                          type="button"
                          onClick={() => setIsAboutModalOpen(false)}
                          className="about-modal-close"
                          aria-label="Close"
                        >
                          <i className="fa-solid fa-xmark"></i>
                        </button>
                        <div className="about-modal-body">
                          <div
                            className="prose max-w-none premium-content-text"
                            dangerouslySetInnerHTML={{ __html: description }}
                          />
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
            </div>
            {/* Project-specific Navbar - Always Fixed */}
            <nav
              id="project-nav"
              className="nb-fixed-nav"
              style={{
                // Force solid white background on all devices
                background: "#ffffff",
                boxShadow: "0 4px 24px 0 rgba(0,0,0,0.10)",
              }}
            >
              {/* Logo */}
              <div className="nb-nav-left">
                <img
                  src={projectViewDetails?.logo?.url}
                  alt={projectViewDetails.projectName}
                  style={{
                    height: "44px",
                    width: "auto",
                    maxWidth: "200px",
                    objectFit: "contain",
                  }}
                  loading="lazy"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>
              {/* Right side: Get a Callback and Phone */}
              <div className="nb-nav-right">
                {/* WhatsApp button - highlighted with border */}
                <a
                  href={`https://wa.me/91${
                    projectViewDetails?.mobileNumber || "9811750130"
                  }`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nb-nav-btn nb-whatsapp-btn"
                >
                  <i className="fa-brands fa-whatsapp nb-whatsapp-icon"></i>
                  <span className="nb-whatsapp-label">Let's Talk</span>
                </a>

                {/* Phone button - highlighted with border */}
                <a
                  href={`tel:${
                    projectViewDetails?.mobileNumber || "9811750130"
                  }`}
                  className="nb-nav-btn nb-phone-btn"
                >
                  <PhoneIcon className="nb-phone-icon" />
                  <span
                    className="nb-phone-label"
                    style={{
                      filter: "drop-shadow(0 0 2px rgba(255,255,255,0.95))",
                    }}
                  >
                    {projectViewDetails?.mobileNumber || "9811750130"}
                  </span>
                </a>
              </div>
            </nav>
            {/* Spacer to prevent content hidden under fixed navbar (desktop only) */}
            <div className="nb-nav-spacer"></div>

            {/* Semi-transparent gradient overlay */}
            <div className="nb-hero-gradient"></div>

            {/* Hero Content */}
            <div className="nb-hero-content">
              <div className="nb-hero-center">
                {/* SEO-optimized H1 with modern sans-serif font */}
                <h1 className="hero-main-title">
                  {projectViewDetails.projectName}
                </h1>

                <div className="nb-hero-location">
                  <LocationSmallIcon
                    className="nb-location-icon"
                    aria-hidden="true"
                  />
                  <span>
                    {projectViewDetails?.projectAddress},{" "}
                    {projectViewDetails?.city}
                  </span>
                </div>
                {/* Enhanced CTAs with accessibility */}
                <div className="nb-cta-row">
                  <button
                    onClick={handleShowInstantcallBack}
                    className="hero-cta-primary"
                    aria-label="Schedule a site visit for the property"
                  >
                    <i className="fas fa-calendar-alt" aria-hidden="true"></i>
                    Schedule Site Visit
                  </button>
                  <button
                    onClick={() => {
                      const url = projectViewDetails?.projectBrochure?.url;
                      if (url) {
                        window.open(url, "_blank");
                      } else {
                        handleShowInstantcallBack();
                      }
                    }}
                    className="hero-cta-secondary"
                    aria-label="Download property brochure instantly"
                  >
                    <i className="fas fa-download" aria-hidden="true"></i>
                    Get Brochure Instantly
                  </button>
                </div>

                {/* Location highlight */}
              </div>
            </div>
          </div>
          {/* Top overlap shadow for depth */}
          <div
            className="pointer-events-none absolute -top-1 left-0 right-0 h-6"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.16), rgba(0,0,0,0))",
            }}
          ></div>
        </div>
        {/* Local keyframes for subtle hero/media animations */}
        <style>{`
          @keyframes kenBurnsSlow {
            0% { transform: scale(1.02) translateY(0); }
            100% { transform: scale(1.08) translateY(-2%); }
          }
        `}</style>
        {/* About Project Section */}
        <AboutSection
          projectViewDetails={projectViewDetails}
          nextSectionRef={nextSectionRef}
          nextY={nextY}
          aboutImageRef={aboutImageRef}
          aboutTextRef={aboutTextRef}
          description={description}
          showViewMoreBtn={showViewMoreBtn}
          setIsAboutModalOpen={setIsAboutModalOpen}
          formatDate={formatDate}
        />
        {/* successulll updated */}

        {/* Rest of content - Normal scrolling continues */}
        <HighlightsSection
          projectViewDetails={projectViewDetails}
          highlight={highlight}
          handleShowInstantcallBack={handleShowInstantcallBack}
        />

        <PricingSection
          projectViewDetails={projectViewDetails}
          BhK_Details={BhK_Details}
          handleShowInstantcallBack={handleShowInstantcallBack}
        />

        {projectViewDetails.project_floorplan_Image?.length !== 0 && (
          <FloorPlanSection
            projectViewDetails={projectViewDetails}
            sliderImages={sliderImages}
            slideRefs={slideRefs}
            sliderSettings={set}
            BhK_Details={BhK_Details}
            openModalfloor={openModalfloor}
            isModalOpenFloor={isModalOpenFloor}
            closeModalfloor={closeModalfloor}
            selectedImagefloor={selectedImagefloor}
          />
        )}

        {/* Gallery */}
        <GallerySection
          projectName={projectViewDetails.projectName}
          projectGallery={projectViewDetails?.projectGallery || []}
          galleryCurrentIndex={galleryCurrentIndex}
          setGalleryCurrentIndex={setGalleryCurrentIndex}
          openModalGallery={openModalGallery}
          closeModalGallery={closeModalGallery}
          isModalOpenGallery={isModalOpenGallery}
          modalImageGallery={modalImageGallery}
        />

        {/* Amenities */}
        <AmenitiesSection
          projectName={projectViewDetails.projectName}
          Amenities={Amenities}
        />

        {/* Location & Connectivity */}
        <LocationSection
          projectName={projectViewDetails.projectName}
          locationImageUrl={projectViewDetails?.project_locationImage?.url}
          connectivity={projectRedefine_Connectivity || []}
          entertainment={projectRedefine_Entertainment || []}
          business={projectRedefine_Business || []}
          education={projectRedefine_Education || []}
        />

        {/* Master Plan */}
        <MasterPlanSection
          projectName={projectViewDetails.projectName}
          imageUrl={projectViewDetails?.projectMaster_plan?.url}
          isOpen={isMasterPlanOpen}
          setIsOpen={setIsMasterPlanOpen}
        />

        {/* Builder */}
        <BuilderSection
          builderName={projectViewDetails.builderName}
          builderdescription={builderdescription}
        />

        {/* FAQ */}
        <FAQSection
          title={`About ${projectViewDetails.projectName}`}
          items={items}
        />

        {/* Related property */}
        <RelatedSection
          builderName={projectViewDetails.builderName}
          projectsToShow={projectsToShow}
          builderProjectLength={builderProject.length}
          showAllProjects={showAllProjects}
          setShowAllProjects={setShowAllProjects}
          handleShare={handleShare}
          projectName={projectViewDetails.projectName}
        />

        {/* contact us */}
        <ContactSection
          projectViewDetails={projectViewDetails}
          userDetails={userDetails}
          emailError={emailError}
          setEmailError={setEmailError}
          handleChange={handleChange}
          userSubmitDetails={userSubmitDetails}
        />

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
      </div>

      {/* Sticky Schedule Site Visit button for mobile only */}
      <StickyVisitButton onClick={handleShowInstantcallBack} />

      {/* About Project Modal */}
      {isAboutModalOpen && (
        <div
          className="about-modal-overlay"
          onClick={() => setIsAboutModalOpen(false)}
        >
          <div
            className="about-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="about-modal-header">
              <h2 className="about-modal-title">
                About {projectViewDetails.projectName}
              </h2>
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
      <InstantCallbackModal
        open={instantcallbackmodal}
        sideDetails={sideDetails}
        handleChangeSide={handleChangeSide}
        debouncedSideSubmit={debouncedSideSubmit}
        isLoading2={isLoading2}
        sideButtonText={sideButtonText}
        handleClose={handleCloseInstantcallBack}
      />

      {/* Footer thin black line */}
      <div className="nb-footer-divider"></div>
    </div>
  );
};

export default NewBanner;
