import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCountry } from '../../../providers';
import { COUNTRIES } from '../../../config/countries';
import { ChevronDown, Building, Home, Users, Star, ArrowRight, Search, X, Menu, Globe, MapPin, TrendingUp } from 'lucide-react';
import MobileGlobalNavbar from './MobileGlobalNavbar';
import DesktopGlobalNavbar from './DesktopGlobalNavbar';

const GlobalNavbar: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Add event listener
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return <MobileGlobalNavbar />;
  }

  return <DesktopGlobalNavbar />;
};

export default GlobalNavbar;
