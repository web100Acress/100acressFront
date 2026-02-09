import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { Box, Flex, Button, useDisclosure } from "@chakra-ui/react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { maxprice, minprice } from "../../Redux/slice/PriceBasedSlice";
import { useJwt } from "react-jwt";
import NavbarDesktop from "./NavbarDesktop";
import NavbarMobile from "./NavbarMobile";
import CenterLogo from "./centerLogo/CenterLogo";
import RightSection from "./rightsection/RightSection";
import SearchBarOverlay from "./searchoverlay/SearchBarOverlay";
import MegaMenu from "./megamenu/MegaMenu";
import InsightsMega from "../../Insight/pages/InsightsMega";
import { getApiBase } from "../../config/apiBase";
import { CITY_OPTIONS, CityIcons } from "./shared/navigationData.jsx";

const Wrapper = styled.div`
  .navbar-transparent {
    background: transparent;
    transition: all 150ms ease-in-out;
  }
  
  .navbar-scrolled {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    transition: all 150ms ease-in-out;
  }
  
  .navbar-blog {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    transition: all 150ms ease-in-out;
  }

  /* Mobile menu styles */
  .mobile-menu-open {
    overflow: hidden;
  }
  
  .mobile-menu-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9998;
  }
  
  .mobile-menu-drawer {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: white;
    z-index: 9999;
    overflow-y: auto;
  }
  
  .mobile-menu-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid #eaeaea;
  }
  
  .mobile-menu-brand {
    display: flex;
    align-items: center;
  }
  
  .mobile-menu-logo {
    height: 32px;
    width: auto;
  }
  
  .mobile-menu-close {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    padding: 0.5rem;
    color: #666;
  }
  
  .mobile-menu-content {
    padding: 1rem;
  }
  
  .mobile-menu-section {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .mobile-menu-heading {
    font-weight: 700;
    color: #e53e3e;
    text-transform: uppercase;
    font-size: 12px;
    margin-bottom: 0.75rem;
  }
  
  .mobile-menu-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }
  
  .mobile-menu-tile {
    background: #f7fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 0.75rem;
    font-size: 14px;
    font-weight: 500;
    color: #2d3748;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .mobile-menu-tile:hover {
    background: #edf2f7;
    border-color: #cbd5e0;
  }
  
  .mobile-menu-primary {
    background: #e53e3e;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 0.75rem;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .mobile-menu-primary:hover {
    background: #c53030;
  }
  
  .mobile-menu-sep {
    height: 1px;
    background: #eaeaea;
    margin: 1rem 0;
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

export default function Navbar() {
  const history = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isBlogPage = location.pathname.startsWith("/blog");
  
  // Token management
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
  
  // States
  const [token, setToken] = useState(() => (typeof window !== 'undefined' && localStorage.getItem("myToken")) || "");
  const [colorChange, setColorchange] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [formData, setFormData] = useState({ location: "", query: "", collectionName: "" });
  const [currentPlaceholder, setCurrentPlaceholder] = useState('Search "Villas"');
  
  // Responsive states
  const [isCompactTablet, setIsCompactTablet] = useState(false);
  const [hideResale, setHideResale] = useState(false);
  const [hideRental, setHideRental] = useState(false);
  const [hideProjectType, setHideProjectType] = useState(false);
  const [hideProjectStatus, setHideProjectStatus] = useState(false);
  const [hideBudget, setHideBudget] = useState(false);
  const [hideCity, setHideCity] = useState(false);
  const [showHamburger, setShowHamburger] = useState(false);
  
  // Disclosures
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const insightsDisclosure = useDisclosure();
  
  // Refs
  const navRef = useRef(null);

  // Placeholders rotation
  const placeholders = [
    'Search "Villas"',
    'Search "3 BHK Ready To Move Flat For Sale In Gurgaon"',
    'Search "Best Properties"',
    'Search "Delhi NCR"',
    'Search "3 BHK Flats in Gurgaon"',
    'Search "Commercial Space For Sale In Gurgaon"',
  ];

  // Responsive breakpoints
  useEffect(() => {
    const compute = () => {
      const w = typeof window !== 'undefined' ? window.innerWidth : 0;
      const RENTAL_HIDE_MAX = 1300;
      const RESALE_HIDE_MAX = 1300;
      const PROJECT_TYPE_HIDE_MAX = 1200;
      const PROJECT_STATUS_HIDE_MAX = 1100;
      const BUDGET_HIDE_MAX = 1060;
      const CITY_HIDE_MAX = 1020;
      const HAMBURGER_MAX = 920;

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
      setShowHamburger(rsl || rnt || pjt || pjs || bdg || cty || hmb);
    };
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, []);

  // Navbar height management
  useLayoutEffect(() => {
    const applyOffsets = () => {
      const h = navRef.current ? (navRef.current.getBoundingClientRect().height || 0) : 0;
      document.documentElement.style.setProperty('--navbar-h', `${h}px`);
      document.documentElement.style.setProperty('--nav-h', `${h}px`);
      document.body.style.paddingTop = `0px`;
      document.documentElement.style.scrollPaddingTop = `0px`;
    };
    applyOffsets();
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
    };
  }, []);

  // Navigation helpers
  const go = (path) => {
    try {
      history(path);
      if (typeof window !== 'undefined' && window.scrollTo) window.scrollTo({ top: 0, behavior: 'auto' });
    } catch {}
  };

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

  // Avatar management
  const [avatarUrl, setAvatarUrl] = useState(() => {
    try { return (typeof window !== 'undefined' && localStorage.getItem('avatarUrl')) || ""; } catch { return ""; }
  });

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

  // Avatar updates
  useEffect(() => {
    const updateFromUrl = (url) => {
      const bust = url ? `${url}${url.includes('?') ? '&' : '?'}t=${Date.now()}` : "";
      setAvatarUrl(bust);
    };
    let bc;
    try {
      bc = new BroadcastChannel('profile-updates');
      bc.onmessage = (evt) => {
        const data = evt?.data || {};
        if (data.type === 'avatar-updated' && data.url) {
          updateFromUrl(data.url);
        } else if (data.type === 'profile-updated') {
          fetchAndSetAvatar();
        }
      };
    } catch {}
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

  useEffect(() => {
    fetchAndSetAvatar();
  }, [token, userIdForEdit]);

  // City selection
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

  // Price handling
  const handlePriceClick = (min, max) => {
    dispatch(minprice(min));
    dispatch(maxprice(max));
  };

  // User roles
  const lsRole = (typeof window !== 'undefined' && (localStorage.getItem("userRole") || localStorage.getItem("role") || localStorage.getItem("UserRole"))) || "";
  const tokenRolesRaw = decodedToken?.roles || decodedToken?.role || decodedToken?.authorities || decodedToken?.claims?.roles || "";
  const normalizeToArray = (val) => {
    if (!val) return [];
    if (Array.isArray(val)) return val;
    if (typeof val === 'string') return val.split(/[\s,;]+/);
    if (typeof val === 'object') {
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

  // First name
  const lsFirstName = (typeof window !== 'undefined' && localStorage.getItem("firstName")) || "";
  let firstName = (lsFirstName || "").toString().trim().split(/\s+/)[0] || "";
  const roleWords = new Set(["admin", "super", "blog", "user", "moderator", "owner", "agent", "builder"]);
  if (roleWords.has(firstName.toLowerCase()) || firstName.toLowerCase() === userRole) {
    firstName = "";
  }
  if (firstName) {
    firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
  }

  // Navbar color change
  const changeNavbarColor = () => {
    setColorchange(window.scrollY >= 150);
  };

  useEffect(() => {
    if (colorChange) {
      setIsSearchOpen(true);
    } else {
      setIsSearchOpen(false);
    }
  }, [colorChange]);

  // Sticky detection
  useEffect(() => {
    const hero = document.querySelector('#hero, .hero, [data-hero]');
    let observer;
    if (hero && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          setColorchange(!entry.isIntersecting);
        },
        { root: null, threshold: 0 }
      );
      observer.observe(hero);
    } else {
      window.addEventListener('scroll', changeNavbarColor);
      changeNavbarColor();
    }
    return () => {
      if (observer) observer.disconnect();
      else window.removeEventListener('scroll', changeNavbarColor);
    };
  }, []);

  // Placeholder rotation
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

  // Search handlers
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

  // Auth handlers
  const showModal = () => {
    setShowAuth(true);
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
      try { message.success("Logged Out Successfully !"); } catch {}
      history("/");
      window.location.reload(false);
    }
  };

  // Keyboard handlers
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isSearchOpen) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setIsSearchOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isSearchOpen]);

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

          {/* Center: Navigation */}
          <Box
            justifySelf={{ base: 'start', md: 'center' }}
            gridColumn={{ base: 1, md: 'auto' }}
            alignSelf={{ base: 'center', md: 'center' }}
          >
            {/* Mobile Navigation */}
            <NavbarMobile
              colorChange={colorChange}
              isSearchOpen={isSearchOpen}
              isHome={isHome}
              CITY_OPTIONS={CITY_OPTIONS}
              CityIcons={CityIcons}
              handleCitySelect={handleCitySelect}
              handlePriceClick={handlePriceClick}
              hideResale={hideResale}
              hideRental={hideRental}
              hideProjectType={hideProjectType}
              hideProjectStatus={hideProjectStatus}
              hideBudget={hideBudget}
              hideCity={hideCity}
              showHamburgerOnDesktop={showHamburger}
              forceHamburger={isCompactTablet}
            />

            {/* Desktop Navigation */}
            <NavbarDesktop
              colorChange={colorChange}
              isSearchOpen={isSearchOpen}
              isHome={isHome}
              CITY_OPTIONS={CITY_OPTIONS}
              CityIcons={CityIcons}
              handleCitySelect={handleCitySelect}
              handlePriceClick={handlePriceClick}
              hideResale={hideResale}
              hideRental={hideRental}
              hideProjectType={hideProjectType}
              hideProjectStatus={hideProjectStatus}
              hideBudget={hideBudget}
              hideCity={hideCity}
              showHamburgerOnDesktop={showHamburger}
              forceHamburger={isCompactTablet}
            />
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
              ShowLogOutMessage={() => message.success("Logged Out Successfully !")}
              showModal={showModal}
              showAuth={showAuth}
              setShowAuth={setShowAuth}
            />
          </Box>
        </Box>
        
        {/* Search Bar Overlay */}
        <SearchBarOverlay
          isSearchOpen={isSearchOpen}
          setIsSearchOpen={setIsSearchOpen}
          currentPlaceholder={currentPlaceholder}
          formData={formData}
          handleSearchInput={handleSearchInput}
          handleSearchKeyDown={handleSearchKeyDown}
          submitSearch={submitSearch}
        />
        
        {/* Mega Menus */}
        <MegaMenu isOpen={isOpen} onClose={onClose} handlePriceClick={handlePriceClick} />
        <InsightsMega isOpen={insightsDisclosure.isOpen} onClose={insightsDisclosure.onClose} />
      </Box>
    </Wrapper>
  );
}
