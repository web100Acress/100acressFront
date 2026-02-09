  import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { Box, Flex, Button, useDisclosure } from "@chakra-ui/react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { maxprice, minprice } from "../../Redux/slice/PriceBasedSlice";
// import { Modal } from "antd"; // removed old user menu modal
import { useJwt } from "react-jwt";
import NavbarDesktop from "./NavbarDesktop";
import NavbarMobile from "./NavbarMobile";
import CenterLogo from "./centerLogo/CenterLogo";
import RightSection from "./rightsection/RightSection";
import SearchBarOverlay from "./searchoverlay/SearchBarOverlay";
import { getApiBase } from "../../config/apiBase";
import { CITY_OPTIONS, CityIcons } from "./shared/navigationData.jsx";
import { useScreenSize } from "./shared/screenSizeDetector";

export default function Navbar() {
  const history = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isBlogPage = location.pathname.startsWith("/blog");
  
  // Screen size detection for responsive navigation
  const { screenSize, config, isMobile, isTablet, isDesktop } = useScreenSize();
  
  // Safely read JWT from localStorage (may be raw string or JSON-quoted)
  let usertoken = (typeof window !== 'undefined' && localStorage.getItem("myToken")) || "";
  if (usertoken && usertoken.startsWith('"') && usertoken.endsWith('"')) {
    try { usertoken = JSON.parse(usertoken); } catch { /* ignore */ }
  }
  const API_BASE = getApiBase();
  const sanitizeToken = (raw) => {
    if (!raw || typeof raw !== 'string') return '';
    let t = raw.trim();
    if (t.toLowerCase().startsWith('bearer ')) t = t.slice(7);
    if (t.startsWith('"') && t.endsWith('"')) {
      try { t = JSON.parse(t); } catch {}
    }
    return t.replace(/\"/g, '');
  };
  const authToken = sanitizeToken(usertoken);
  const { decodedToken } = useJwt(usertoken || "");
  const dispatch = useDispatch();
  // Initialize token synchronously to avoid brief logged-out UI state
  const [token, setToken] = useState(() => (typeof window !== 'undefined' && localStorage.getItem("myToken")) || "");
  const [colorChange, setColorchange] = useState(false);
  // const [isModalOpen, setIsModalOpen] = useState(false); // removed old user menu modal state
  const [showAuth, setShowAuth] = useState(false);
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const insightsDisclosure = useDisclosure();
  const cityDisclosure = useDisclosure();
  const budgetDisclosure = useDisclosure();
  const statusDisclosure = useDisclosure();
  const typeDisclosure = useDisclosure();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  // Navbar Search state (reuse hero search technique)
  const [formData, setFormData] = useState({ location: "", query: "", collectionName: "" });
  const placeholders = [
    'Search "Villas"',
    'Search "3 BHK Ready To Move Flat For Sale In Gurgaon"',
    'Search "Best Properties"',
    'Search "Delhi NCR"',
    'Search "3 BHK Flats in Gurgaon"',
    'Search "Commercial Space For Sale In Gurgaon"',
  ];
  const [currentPlaceholder, setCurrentPlaceholder] = useState(placeholders[0]);

  // Staged responsiveness: hide Resale (earlier to save space for CTA) → Rental → Project Type → Project Status → Budget → City → finally force hamburger
  const [isCompactTablet, setIsCompactTablet] = useState(false);
  const [hideResale, setHideResale] = useState(false);
  const [hideRental, setHideRental] = useState(false);
  const [hideProjectType, setHideProjectType] = useState(false);
  const [hideProjectStatus, setHideProjectStatus] = useState(false);
  const [hideBudget, setHideBudget] = useState(false);
  const [hideCity, setHideCity] = useState(false);
  const [showHamburger, setShowHamburger] = useState(false);
  // Measure navbar height and prevent content from sliding under fixed header
  const navRef = useRef(null);
  useLayoutEffect(() => {
    const applyOffsets = () => {
      const h = navRef.current ? (navRef.current.getBoundingClientRect().height || 0) : 0;
      document.documentElement.style.setProperty('--navbar-h', `${h}px`);
      // Mirror var for NewBanner.css which uses --nav-h
      document.documentElement.style.setProperty('--nav-h', `${h}px`);
      // Do not push content down; allow hero to start at top under the transparent navbar
      document.body.style.paddingTop = `0px`;
      document.documentElement.style.scrollPaddingTop = `0px`;
    };
    applyOffsets();
    // Track changes: resize, orientation, font/layout shifts via ResizeObserver
    const onResize = () => applyOffsets();
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);
    window.addEventListener('load', onResize);
    let ro;
    if (window.ResizeObserver && navRef.current) {
      ro = new ResizeObserver(() => applyOffsets());
      ro.observe(navRef.current);
    }
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
      window.removeEventListener('load', onResize);
      try { if (ro) ro.disconnect(); } catch {}
      // do not reset padding to avoid layout shift on route changes
    };
  }, []);
  useEffect(() => {
    const compute = () => {
      const w = typeof window !== 'undefined' ? window.innerWidth : 0;
      // Thresholds (tweak based on actual content width)
      const RENTAL_HIDE_MAX       = 1300; // Rental: hide earlier so at ~1268px it moves to hamburger
      const RESALE_HIDE_MAX       = 1300; // Resale: hide earlier too so at ~1287px it moves to hamburger
      const PROJECT_TYPE_HIDE_MAX = 1200; // Project Type: hide earlier so at ~1155px it moves to hamburger
      const PROJECT_STATUS_HIDE_MAX = 1100; // 4) Project Status (hide earlier)
      const BUDGET_HIDE_MAX       = 1060;  // 5) Budget (hide earlier)
      const CITY_HIDE_MAX         = 1020;  // 6) City (hide earlier)
      const HAMBURGER_MAX         = 920;  // 7) Force hamburger layout

      const rnt = w <= RENTAL_HIDE_MAX;
      const rsl = w <= RESALE_HIDE_MAX;
      const pjt = w <= PROJECT_TYPE_HIDE_MAX;
      const pjs = w <= PROJECT_STATUS_HIDE_MAX;
      const bdg = w <= BUDGET_HIDE_MAX;
      const cty = w <= CITY_HIDE_MAX;
      const hmb = w <= HAMBURGER_MAX;

      setHideRental(rnt);
      setHideResale(rsl);
      setHideProjectType(pjt);
      setHideProjectStatus(pjs);
      setHideBudget(bdg);
      setHideCity(cty);
      setIsCompactTablet(hmb);
      // Show hamburger only when at least one item is hidden, or when forced hamburger layout
      setShowHamburger(rsl || rnt || pjt || pjs || bdg || cty || hmb);
    };
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, []);

  // Fast navigate helper for menu clicks
  const go = (path) => {
    try {
      history(path);
      // ensure top of page
      if (typeof window !== 'undefined' && window.scrollTo) window.scrollTo({ top: 0, behavior: 'auto' });
    } catch {}
  };
  // Resolve current user id for profile edit route `/useredit/:id`
  const resolveUserId = () => {
    try {
      let id = (typeof window !== 'undefined' && localStorage.getItem('mySellerId')) || '';
      if (id && id.startsWith('"') && id.endsWith('"')) {
        try { id = JSON.parse(id); } catch {}
      }
      const dt = decodedToken || {};
      const fallbacks = [dt.userId, dt.id, dt.uid, dt.sub];
      return (id && String(id)) || fallbacks.find(v => v !== undefined && v !== null && String(v).trim() !== '') || '';
    } catch { return ''; }
  };
  const userIdForEdit = resolveUserId();
  // Avatar URL for navbar profile icon (initialize from localStorage cache)
  const [avatarUrl, setAvatarUrl] = useState(() => {
    try { return (typeof window !== 'undefined' && localStorage.getItem('avatarUrl')) || ""; } catch { return ""; }
  });

  // Helper to fetch and set avatar from backend
  const fetchAndSetAvatar = async () => {
    try {
      if (!userIdForEdit) return;
      const res = await axios.get(`${API_BASE}/postPerson/users/${userIdForEdit}/profile`, {
        headers: { Authorization: authToken ? `Bearer ${authToken}` : undefined },
      });
      const url = res?.data?.data?.avatarUrl || "";
      if (url) {
        const bust = `${url}${url.includes('?') ? '&' : '?'}t=${Date.now()}`;
        setAvatarUrl(bust);
        try { localStorage.setItem('avatarUrl', bust); } catch {}
      }
    } catch {}
  };

  // Listen for avatar updates broadcasted from profile page (UserEdit)
  useEffect(() => {
    const updateFromUrl = (url) => {
      const bust = url ? `${url}${url.includes('?') ? '&' : '?'}t=${Date.now()}` : "";
      setAvatarUrl(bust);
    };
    // BroadcastChannel for multi-tab updates
    let bc;
    try {
      bc = new BroadcastChannel('profile-updates');
      bc.onmessage = (evt) => {
        const data = evt?.data || {};
        if (data.type === 'avatar-updated' && data.url) {
          updateFromUrl(data.url);
        } else if (data.type === 'profile-updated') {
          // Refetch avatar after profile save
          fetchAndSetAvatar();
        }
      };
    } catch {}
    // Same-tab CustomEvent fallback
    const onCustom = (e) => {
      const url = e?.detail?.url;
      if (url) updateFromUrl(url);
      else fetchAndSetAvatar();
    };
    window.addEventListener('avatar-updated', onCustom);
    window.addEventListener('profile-updated', onCustom);
    return () => {
      try { if (bc) bc.close(); } catch {}
      window.removeEventListener('avatar-updated', onCustom);
      window.removeEventListener('profile-updated', onCustom);
    };
  }, []);

  // Fetch user profile to get avatarUrl when logged in
  useEffect(() => {
    fetchAndSetAvatar();
  }, [token, userIdForEdit]);
  const [selectedCity, setSelectedCity] = useState(
    (typeof window !== 'undefined' && localStorage.getItem("selectedCity")) || ""
  );

  const handleCitySelect = (city) => {
    try {
      localStorage.setItem("selectedCity", city.name);
      setSelectedCity(city.name);
      history(city.path);
    } catch {}
  };

  const showModal = () => {
    // setIsModalOpen(true);
    setShowAuth(true); // open Auth modal instead of old user menu
  };

  // Optional: derive user role for extra options (normalized)
  // Collect possible sources: localStorage keys and token claims
  const lsRole = (typeof window !== 'undefined' && (localStorage.getItem("userRole") || localStorage.getItem("role") || localStorage.getItem("UserRole"))) || "";
  const tokenRolesRaw = decodedToken?.roles || decodedToken?.role || decodedToken?.authorities || decodedToken?.claims?.roles || "";
  const normalizeToArray = (val) => {
    if (!val) return [];
    if (Array.isArray(val)) return val;
    if (typeof val === 'string') return val.split(/[\s,;]+/);
    if (typeof val === 'object') {
      // handle shapes like { role: 'admin' } or { authority: 'ROLE_ADMIN' }
      if (val.role) return Array.isArray(val.role) ? val.role : [val.role];
      if (val.authority) return Array.isArray(val.authority) ? val.authority : [val.authority];
      try { return Object.values(val); } catch { return []; }
    }
    return [];
  };
  const roles = [...normalizeToArray(lsRole), ...normalizeToArray(tokenRolesRaw)]
    .map((r) => (r || '').toString().trim().toLowerCase())
    .filter(Boolean);
  const userRole = roles[0] || "";
  const isAdmin = roles.some((r) => r.includes('admin'));
  const isBlogger = roles.some((r) => r.includes('blog') || r.includes('contentwriter') || r.includes('writer'));
  const isHr = roles.some((r) => r.includes('hr') || r.includes('human') || r.includes('resource'));
  const isSalesHead = roles.some((r) => r.includes('saleshead') || r.includes('sales_head') || r.includes('sales head'));

  // Derive first name ONLY from localStorage 'firstName' (desktop only)
  const lsFirstName = (typeof window !== 'undefined' && localStorage.getItem("firstName")) || "";
  let firstName = (lsFirstName || "").toString().trim().split(/\s+/)[0] || "";
  const roleWords = new Set(["admin", "super", "blog", "user", "moderator", "owner", "agent", "builder"]);
  if (roleWords.has(firstName.toLowerCase()) || firstName.toLowerCase() === userRole) {
    firstName = "";
  }
  if (firstName) {
    firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
  }

  const handleDeleteAccount = async () => {
    try {
      const confirmed = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
      if (!confirmed) return;
      // TODO: hook actual API when ready
      // await axios.delete("/account/delete");
      message.info("Account deletion flow is not enabled yet.");
    } catch (e) {
      message.error("Failed to process account deletion.");
    }
  };

  // const handleCancel = () => {
  //   // setIsModalOpen(false);
  //   setShowAuth(false);
  // };
  const changeNavbarColor = () => {
    // Fallback threshold if hero not found
    setColorchange(window.scrollY >= 150);
  };

  // Auto-open navbar search when sticky (on scroll), hide when at top
  useEffect(() => {
    if (colorChange) {
      setIsSearchOpen(true);
    } else {
      setIsSearchOpen(false);
    }
  }, [colorChange]);

  // Sticky detection using IntersectionObserver with scroll fallback
  useEffect(() => {
    const hero = document.querySelector('#hero, .hero, [data-hero]');
    let observer;
    if (hero && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          // When hero is not intersecting (out of view), activate sticky style
          setColorchange(!entry.isIntersecting);
        },
        { root: null, threshold: 0 }
      );
      observer.observe(hero);
    } else {
      // Fallback to scroll listener
      window.addEventListener('scroll', changeNavbarColor);
      changeNavbarColor();
    }
    return () => {
      if (observer) observer.disconnect();
      else window.removeEventListener('scroll', changeNavbarColor);
    };
  }, []);

  const handlePriceClick = (min, max) => {
    // setPriceRange({ min, max });
    dispatch(minprice(min));
    dispatch(maxprice(max))
  };

  const ShowLogOutMessage = () => {
    message.success("Logged Out Successfully !");
  };

  const HandleUserLogout = async () => {
    try {
      await axios.get(`${API_BASE}/postPerson/logout`, {
        headers: { Authorization: authToken ? `Bearer ${authToken}` : undefined },
        withCredentials: true,
      });
    } catch (error) {
      const status = error?.response?.status;
      const data = error?.response?.data;
      console.error("Logout failed (ignored):", { status, data, error });
    } finally {
      // Always clear local storage even if API fails
      try {
        localStorage.removeItem('favoriteProjects');
        localStorage.removeItem('favoriteProjectsData');
        localStorage.removeItem("myToken");
        localStorage.removeItem("mySellerId");
        localStorage.removeItem("userRole");
        localStorage.removeItem("userData");
        localStorage.removeItem("firstName");
        localStorage.removeItem("avatarUrl");
      } catch {}
      try { ShowLogOutMessage(); } catch {}
      history("/");
      window.location.reload(false);
    }
  };

  // const handleAvatarClick = () => {
  //   setIsDropdownOpen(!isDropdownOpen);
  // };

  // Legacy hover handlers (no longer used after refactor)
  // const handleHover2 = () => setMenuOpen2(true);
  // const handleLeave2 = () => setMenuOpen2(false);
  // const handleHover = () => setMenuOpen(true);
  // const handleLeave = () => setMenuOpen(false);
  // const handleHover1 = () => setMenuOpen1(true);
  // const handleLeave1 = () => setMenuOpen1(false);

  const checkUserAuth = () => {
    const storedToken = localStorage.getItem("myToken");
    setToken(storedToken);
  };

  useEffect(() => {
    checkUserAuth();
  }, []);

  // Close mega menu on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  // Close search on Escape key
  useEffect(() => {
    if (!isSearchOpen) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setIsSearchOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isSearchOpen]);

  // Rotate placeholder like hero search
  useEffect(() => {
    const id = setInterval(() => {
      setCurrentPlaceholder((prev) => {
        const idx = placeholders.indexOf(prev);
        const next = (idx + 1) % placeholders.length;
        return placeholders[next];
      });
    }, 3000);
    return () => clearInterval(id);
  }, []);

  const handleSearchInput = (e) => {
    setFormData((s) => ({ ...s, query: e.target.value }));
  };
  const submitSearch = () => {
    const payload = { ...formData };
    history(`/searchdata/${encodeURIComponent(JSON.stringify(payload))}`);
    setIsSearchOpen(false);
  };
  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submitSearch();
    }
  };

  return (
    <Wrapper>
      <Box
        ref={navRef}
        position={isHome ? "absolute" : "fixed"}
        top="0"
        left="0"
        right="0"
        zIndex="9999"
        width="100%"
        bg="transparent"
        transition="all 150ms ease-in-out"
        className={isBlogPage ? (colorChange ? "navbar-scrolled" : "navbar-blog") : (colorChange ? "navbar-scrolled" : "navbar-transparent")}
      >
        {/* Gradient Overlay */}
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="transparent"
          transition="opacity 150ms ease-in-out"
          pointerEvents="none"
        />
        
        <Box
          position="relative"
          w="100%"
          px={{ base: 2, md: 6 }}
          py={{ base: 1, md: 2 }}
          display="grid"
          gridTemplateColumns={{ base: 'auto 1fr auto', md: '1fr auto 1fr' }}
          gridAutoFlow="column"
          alignItems="center"
          minH={{ base: '52px', md: '64px' }}
          columnGap={{ base: 2, md: 4 }}
        >
          {/* Left: Logo */}
          <Box
            justifySelf={{ base: 'center', md: 'start' }}
            gridColumn={{ base: 2, md: 'auto' }}
            alignSelf={{ base: 'center', md: 'center' }}
          >
            <CenterLogo colorChange={colorChange} isSearchOpen={isSearchOpen} centerOnCompact={isCompactTablet} isHome={isHome} />
          </Box>

          {/* Center: Filters & Menus */}
          <Box
            justifySelf={{ base: 'start', md: 'center' }}
            gridColumn={{ base: 1, md: 'auto' }}
            alignSelf={{ base: 'center', md: 'center' }}
          >
            {/* Mobile Navigation - Only show on actual mobile devices */}
            {isMobile ? (
              <NavbarMobile
                colorChange={colorChange}
                isSearchOpen={isSearchOpen}
                isHome={isHome}
                CITY_OPTIONS={CITY_OPTIONS}
                CityIcons={CityIcons}
                handleCitySelect={handleCitySelect}
                handlePriceClick={handlePriceClick}
                // Show items in hamburger when they're hidden from desktop
                hideResale={config && config.showResale ? false : true}
                hideRental={config && config.showRental ? false : true}
                hideProjectType={config && config.showProjectType ? false : true}
                hideProjectStatus={config && config.showProjectStatus ? false : true}
                hideBudget={config && config.showBudgetDropdown ? false : true}
                hideCity={config && config.showCityDropdown ? false : true}
                showHamburgerOnDesktop={showHamburger}
                forceHamburger={config && config.showHamburger}
              />
            ) : (
              /* Desktop Navigation - Show on desktop with compact hamburger for hidden items */
              <NavbarDesktop
                colorChange={colorChange}
                isSearchOpen={isSearchOpen}
                isHome={isHome}
                CITY_OPTIONS={CITY_OPTIONS}
                CityIcons={CityIcons}
                handleCitySelect={handleCitySelect}
                handlePriceClick={handlePriceClick}
                // Hide items from desktop when config says so
                hideResale={!(config && config.showResale)}
                hideRental={!(config && config.showRental)}
                hideProjectType={!(config && config.showProjectType)}
                hideProjectStatus={!(config && config.showProjectStatus)}
                hideBudget={!(config && config.showBudgetDropdown)}
                hideCity={!(config && config.showCityDropdown)}
                showHamburgerOnDesktop={showHamburger}
                forceHamburger={config && config.showHamburger}
              />
            )}
          </Box>

          {/* Right: Search, Profile & List Property */}
          <Box
            justifySelf={{ base: 'end', md: 'end' }}
            gridColumn={{ base: 3, md: 'auto' }}
            alignSelf={{ base: 'center', md: 'center' }}
          >
          <RightSection
            colorChange={colorChange}
            isSearchOpen={isSearchOpen}
            isHome={isHome}
            setIsSearchOpen={setIsSearchOpen}
            token={token}
            avatarUrl={avatarUrl}
            userId={userIdForEdit}
            onAvatarUpdated={(url) => {
              const bust = url ? `${url}${url.includes('?') ? '&' : '?'}t=${Date.now()}` : "";
              setAvatarUrl(bust);
              try {
                if (bust) localStorage.setItem('avatarUrl', bust);
              } catch {}
            }}
            firstName={firstName}
            isAdmin={isAdmin}
            isBlogger={isBlogger}
            isHr={isHr}
            isSalesHead={isSalesHead}
            go={go}
            HandleUserLogout={HandleUserLogout}
            ShowLogOutMessage={ShowLogOutMessage}
            showModal={showModal}
            showAuth={showAuth}
            setShowAuth={setShowAuth}
          />
          </Box>
        </Box>
          {/* Centered Animated Search Bar */}
          <SearchBarOverlay
            isSearchOpen={isSearchOpen}
            setIsSearchOpen={setIsSearchOpen}
            currentPlaceholder={currentPlaceholder}
            formData={formData}
            handleSearchInput={handleSearchInput}
            handleSearchKeyDown={handleSearchKeyDown}
            submitSearch={submitSearch}
          />
        </Box>
      </Wrapper>
    );
  }

const Wrapper = styled.section`
  font-family: 'Rubik', sans-serif;
  
  /* Navbar styles for transparent and scrolled states */
  .navbar-transparent {
    background: transparent !important;
    box-shadow: none !important;
  }
  
  .navbar-scrolled {
    background: rgba(231, 55, 55, 0.95) !important;
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 20px rgba(128, 14, 14, 0.2) !important;
    position: fixed !important;
  }
  
  .navbar-blog {
    background: white !important;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1) !important;
    position: fixed !important;
  }
  
  .shimmer-container {
    position: relative;
    width: 200px;
    height: 40px;
    overflow: hidden;
    background-color: #800e0e; /* Background color for the shimmer effect */
  }

  /* Styling for the shimmer animation */
  .shimmer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.5),
      transparent
    ); /* Shimmer gradient */
    animation: shimmerAnimation 2s infinite; /* Animation properties */
  }

  /* Keyframes for the shimmer animation */
  @keyframes shimmerAnimation {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }

  /* Basic text styling */
  .text {
    margin: 10px;
    font-size: 18px;
  }
`;