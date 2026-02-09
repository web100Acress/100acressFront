import React, { useState, useEffect } from 'react';
import { Search, Clock, User, TrendingUp, ArrowRight, Flame, Bookmark, Share2, MessageSquare, Eye } from 'lucide-react';
import InsightsNewsDesktop from './InsightsNewsDesktop';
import InsightsNewsMobile from './InsightsNewsMobile';

const InsightsNews = () => {
  const [isDesktop, setIsDesktop] = useState(false);

  // Detect screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Render appropriate component based on screen size
  return isDesktop ? <InsightsNewsDesktop /> : <InsightsNewsMobile />;
};

export default InsightsNews;
