import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';
import { MdBarChart, MdAssignment, MdHome, MdShoppingCart, MdBusiness, MdContactMail, MdPerson, MdPeople, MdLibraryBooks, MdWork, MdAccountCircle } from 'react-icons/md';

// Custom hook for count up animation
function useCountUp(target, duration = 1000) {
  const [count, setCount] = useState(0);
  const ref = useRef();
  
  useEffect(() => {
    let start = 0;
    let startTime = null;
    function animateCountUp(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * (target - start) + start));
      if (progress < 1) {
        ref.current = requestAnimationFrame(animateCountUp);
      } else {
        setCount(target);
      }
    }
    cancelAnimationFrame(ref.current);
    setCount(0);
    if (typeof target === 'number') {
      ref.current = requestAnimationFrame(animateCountUp);
    }
    return () => cancelAnimationFrame(ref.current);
  }, [target, duration]);
  
  return count;
}

const sections = [
  { 
    name: 'Project Enquiries', 
    api: '/api/admin/project-enquiries/count', 
    link: '/Admin/enquiries', 
    gradient: 'from-slate-900 via-slate-800 to-slate-700',
    icon: <MdAssignment size={32} className="text-white/90" />, 
    description: 'All project-related enquiries from users.',
    shadowColor: 'shadow-slate-500/20'
  },
  { 
    name: 'Projects', 
    api: '/api/admin/projects/count', 
    link: '/Admin/Projects/property', 
    gradient: 'from-gray-800 via-gray-700 to-gray-600',
    icon: <MdBarChart size={32} className="text-white/90" />, 
    description: 'Total number of projects listed.',
    shadowColor: 'shadow-gray-500/20'
  },
  { 
    name: 'Resale Enquiries', 
    api: '/api/admin/resale-enquiries/count', 
    link: '/Admin/resale-enquiries', 
    gradient: 'from-zinc-800 via-zinc-700 to-zinc-600',
    icon: <MdHome size={32} className="text-white/90" />, 
    description: 'Enquiries for resale properties.',
    shadowColor: 'shadow-zinc-500/20'
  },
  { 
    name: 'Buy', 
    api: '/api/admin/buy/count', 
    link: '/Admin/buy', 
    gradient: 'from-neutral-800 via-neutral-700 to-neutral-600',
    icon: <MdShoppingCart size={32} className="text-white/90" />, 
    description: 'Buy property requests.',
    shadowColor: 'shadow-neutral-500/20'
  },
  { 
    name: 'Properties', 
    api: '/api/admin/properties/count', 
    link: '/Admin/all-listed-properties', 
    gradient: 'from-stone-800 via-stone-700 to-stone-600',
    icon: <MdBusiness size={32} className="text-white/90" />, 
    description: 'All properties listed on the platform.',
    shadowColor: 'shadow-stone-500/20'
  },
  { 
    name: 'Contact Us', 
    api: '/api/admin/contact/count', 
    link: '/Admin/contact', 
    gradient: 'from-slate-700 via-slate-600 to-slate-500',
    icon: <MdContactMail size={32} className="text-white/90" />, 
    description: 'Contact form submissions.',
    shadowColor: 'shadow-slate-400/20'
  },
  { 
    name: 'Contact User', 
    api: '/api/admin/contact-user/count', 
    link: '#', 
    gradient: 'from-gray-700 via-gray-600 to-gray-500',
    icon: <MdPerson size={32} className="text-white/90" />, 
    description: 'Direct user contact requests.',
    shadowColor: 'shadow-gray-400/20'
  },
  { 
    name: 'User Property', 
    api: '/api/admin/user-property/count', 
    link: '#', 
    gradient: 'from-zinc-700 via-zinc-600 to-zinc-500',
    icon: <MdPeople size={32} className="text-white/90" />, 
    description: 'Properties listed by users.',
    shadowColor: 'shadow-zinc-400/20'
  },
  { 
    name: 'Blog', 
    api: '/api/admin/blog/count', 
    link: '/Admin/blog', 
    gradient: 'from-neutral-700 via-neutral-600 to-neutral-500',
    icon: <MdLibraryBooks size={32} className="text-white/90" />, 
    description: 'Blog posts and articles.',
    shadowColor: 'shadow-neutral-400/20'
  },
  { 
    name: 'Career', 
    api: '/api/admin/career/count', 
    link: '/Admin/career', 
    gradient: 'from-stone-700 via-stone-600 to-stone-500',
    icon: <MdWork size={32} className="text-white/90" />, 
    description: 'Career and job postings.',
    shadowColor: 'shadow-stone-400/20'
  },
  { 
    name: 'User', 
    api: '/api/admin/user/count', 
    link: '/Admin/user', 
    gradient: 'from-slate-600 via-slate-500 to-slate-400',
    icon: <MdAccountCircle size={32} className="text-white/90" />, 
    description: 'Registered users.',
    shadowColor: 'shadow-slate-300/20'
  },
];

function formatNumber(num) {
  if (num === undefined || num === null) return '-';
  return num.toLocaleString();
}

const SkeletonCard = () => (
  <div className="relative rounded-xl animate-pulse bg-gradient-to-br from-slate-200 to-slate-300 shadow-lg p-6 h-40 flex flex-col justify-between border border-slate-200">
    <div className="flex items-center justify-between mb-2">
      <div className="h-6 w-32 bg-slate-300 rounded"></div>
      <div className="h-8 w-8 bg-slate-300 rounded-full"></div>
    </div>
    <div className="h-10 w-20 bg-slate-300 rounded mt-2"></div>
  </div>
);

const AdminDashboard = () => {
  const [counts, setCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [animatedCounts, setAnimatedCounts] = useState({});

  useEffect(() => {
    console.log('Component mounted');
    fetchCounts();
    const interval = setInterval(() => {
      console.log('Interval triggered: fetching counts');
      fetchCounts();
    }, 30000); // 30 seconds
    return () => {
      console.log('Component unmounted, clearing interval');
      clearInterval(interval);
    };
  }, []);

  const fetchCounts = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Fetching counts from API...');
      // Fetch user data from the new endpoint
      const userRes = await fetch("https://api.100acress.com/userViewAll/dowloadData");
      const userData = await userRes.json();
      console.log('API response for User:', userData);
      // You may need to adjust this depending on the response structure
      // For example, if userData is an array:
      const userCount = Array.isArray(userData) ? userData.length : (userData.count || 0);

      // Fetch other sections as before
      const results = await Promise.all(
        sections.map(section =>
          section.name === 'User'
            ? userCount
            : axios.get(section.api)
                .then(res => {
                  console.log(`API response for ${section.name}:`, res.data);
                  return res.data.count;
                })
                .catch((err) => {
                  console.error(`API error for ${section.name}:`, err);
                  return 0;
                })
        )
      );
      const countsObj = {};
      sections.forEach((section, idx) => {
        countsObj[section.name] = results[idx];
      });
      console.log('Setting counts state:', countsObj);
      setCounts(countsObj);
    } catch (err) {
      setError('Failed to fetch dashboard data.');
      console.error('FetchCounts error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Animate counts when counts change
  useEffect(() => {
    console.log('Counts changed, animating counts:', counts);
    let raf;
    const duration = 1000;
    const startCounts = { ...animatedCounts };
    const endCounts = { ...counts };
    const startTime = performance.now();

    function animate(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const newAnimatedCounts = {};
      sections.forEach(section => {
        const start = startCounts[section.name] || 0;
        const end = endCounts[section.name] || 0;
        newAnimatedCounts[section.name] = Math.floor(start + (end - start) * easeOut);
      });
      setAnimatedCounts(newAnimatedCounts);
      if (progress < 1) {
        raf = requestAnimationFrame(animate);
      } else {
        console.log('Animation complete. Animated counts:', newAnimatedCounts);
      }
    }
    animate(performance.now());
    return () => raf && cancelAnimationFrame(raf);
    // eslint-disable-next-line
  }, [counts]);

  // Tooltip logic
  const [tooltip, setTooltip] = useState({ show: false, text: '', x: 0, y: 0 });
  const showTooltip = (text, e) => {
    setTooltip({ show: true, text, x: e.clientX, y: e.clientY });
  };
  const hideTooltip = () => setTooltip({ show: false, text: '', x: 0, y: 0 });

  useEffect(() => {
    console.log('Rendering dashboard. Counts:', counts, 'AnimatedCounts:', animatedCounts);
  });

  if (error) {
    console.error('Dashboard error:', error);
    return (
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center border border-slate-200">
            <div className="text-slate-400 text-6xl mb-4">⚠️</div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">Connection Error</h2>
            <p className="text-slate-600 mb-6">{error}</p>
            <button 
              onClick={fetchCounts} 
              className="bg-gradient-to-r from-slate-600 to-slate-700 text-white px-6 py-3 rounded-xl hover:from-slate-700 hover:to-slate-800 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50">
      <Sidebar />
      <div className="flex-1 max-w-6xl mx-auto p-10">
        {/* Header */}
        <div className="mb-10">
        
          <div className="w-24 h-1 bg-gradient-to-r from-slate-400 to-gray-300 rounded-full"></div>
          {/* <p className="text-slate-600 mt-3 text-lg">Real-time analytics and system overview</p> */}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {loading ? (
            Array.from({ length: sections.length }).map((_, i) => <SkeletonCard key={i} />)
          ) : (
            sections.map(section => (
              <Link
                to={section.link}
                key={section.name}
                className="block focus:outline-none group"
              >
                <div className={`relative rounded-2xl bg-gradient-to-br ${section.gradient} shadow-xl ${section.shadowColor} hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 active:scale-95 p-6 h-48 flex flex-col justify-between overflow-hidden border border-white/10`}>
                  
                  {/* Subtle background patterns */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.03] rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/[0.03] rounded-full translate-y-12 -translate-x-12"></div>
                  
                  {/* Geometric accent */}
                  <div className="absolute top-4 right-4 w-2 h-2 bg-white/20 rounded-full"></div>
                  <div className="absolute top-6 right-6 w-1 h-1 bg-white/30 rounded-full"></div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex-1">
                        <span
                          className="text-xl font-semibold text-white/95 drop-shadow-sm relative block leading-tight"
                          onMouseEnter={e => showTooltip(section.description, e)}
                          onMouseLeave={hideTooltip}
                          tabIndex={0}
                          aria-label={section.description}
                        >
                          {section.name}
                        </span>
                        <div className="w-8 h-0.5 bg-white/30 rounded-full mt-2 group-hover:w-12 transition-all duration-300"></div>
                      </div>
                      <div className="ml-4 p-2 bg-white/10 backdrop-blur-sm rounded-xl group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300">
                        {section.icon}
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="text-4xl font-bold text-white/95 drop-shadow-sm group-hover:scale-110 transition-transform duration-300 origin-left">
                        {formatNumber(animatedCounts[section.name] || 0)}
                      </div>
                      
                      {/* Minimalist progress indicator */}
                     
                     + <div className="w-full bg-white/10 rounded-full h-1 overflow-hidden">
                        <div 
                          className="h-full bg-white/30 rounded-full transition-all duration-1000 ease-out"
                          style={{ 
                            width: `${Math.min((animatedCounts[section.name] || 0) / Math.max(...Object.values(animatedCounts), 1) * 100, 100)}%` 
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
       
        {/* Enhanced Tooltip */}
        {tooltip.show && (
          <div
            className="fixed z-50 px-4 py-3 rounded-xl bg-slate-900/95 backdrop-blur-sm text-white text-sm shadow-2xl pointer-events-none border border-slate-700 max-w-xs"
            style={{ left: tooltip.x + 15, top: tooltip.y - 50 }}
          >
            <div className="font-medium text-slate-100">{tooltip.text}</div>
            <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-8 border-transparent border-r-slate-900/95"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;