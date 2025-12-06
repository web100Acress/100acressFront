import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../config/apiClient';
import { getApiBase } from '../config/apiBase';
import Sidebar from './Sidebar'; // Assuming Sidebar is correctly imported
import { MdBarChart, MdAssignment, MdHome, MdShoppingCart, MdBusiness, MdContactMail, MdPerson, MdPeople, MdLibraryBooks, MdWork, MdAccountCircle, MdEmail, MdFilterList } from 'react-icons/md';
import { Building } from 'lucide-react';

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
    name: 'User',
    api: '/postPerson/view/allusers',
    link: '/Admin/user',
    gradientClass: 'bg-medium-slate-gradient',
    icon: <MdAccountCircle size={32} className="card-icon" />,
    description: 'Registered users.',
    shadowClass: 'shadow-medium-slate'
  },
  {
    name: 'Project Enquiries',
    api: '/userViewAll?limit=1&page=1', // Only fetch 1, but get the total count
    link: '/Admin/enquiries',
    gradientClass: 'bg-slate-gradient',
    icon: <MdAssignment size={32} className="card-icon" />,
    description: 'All project-related enquiries from users.',
    shadowClass: 'shadow-slate'
  },
  {
    name: 'Projects',
    api: '/project/viewAll/data',
    link: '/Admin/Projects/property',
    gradientClass: 'bg-gray-gradient',
    icon: <MdBarChart size={32} className="card-icon" />,
    description: 'Total number of projects listed.',
    shadowClass: 'shadow-gray'
  },
  {
    name: 'Resale Enquiries',
    api: '/postEnq_view',
    link: '/Admin/resale-enquiries',
    gradientClass: 'bg-zinc-gradient',
    icon: <MdHome size={32} className="card-icon" />,
    description: 'Enquiries for resale properties.',
    shadowClass: 'shadow-zinc'
  },
  {
    name: 'Blog',
    api: '/blog/admin/view?page=1&limit=1000',
    link: '/Admin/blog',
    gradientClass: 'bg-light-neutral-gradient',
    icon: <MdLibraryBooks size={32} className="card-icon" />,
    description: 'Blog posts and articles.',
    shadowClass: 'shadow-light-neutral'
  },
 
  {
    name: 'Properties',
    // The API string below uses template literals, but as a string, variables like ${currentPage} won't be replaced.
    // To display data, use a static endpoint that returns the total count, or fetch all and count length.
    // For dashboard counts, use a high limit to get all items, then count them.
    api: '/postPerson/view/allListedProperty/?page=1&limit=10000&verify=verified',
    link: '/Admin/all-listed-properties',
    gradientClass: 'bg-stone-gradient',
    icon: <MdBusiness size={32} className="card-icon" />,
    description: 'All properties listed on the platform.',
    shadowClass: 'shadow-stone'
  },
  {
    name: 'Career',
    openingsApi: '/career/opening/ViewAll?limit=1&page=1',
    applicationsApi: '/career/application/count',
    link: '/hr/dashboard',
    gradientClass: 'bg-light-slate-gradient',
    icon: <MdContactMail size={32} className="card-icon" />,
    description: 'Job openings and total applications.',
    shadowClass: 'shadow-light-slate'
  },

  // Removed separate "Career Applications" card - merged into Career


  {
    name: 'Contact Cards',
    api: '/api/contact-cards/count',
    link: '/admin/contact-cards',
    gradientClass: 'bg-light-slate-gradient',
    icon: <Building size={32} className="card-icon" />,
    description: 'Contact cards management.',
    shadowClass: 'shadow-light-slate'
  },

  {
    name: 'Project Filter Order',
    api: null, // No API needed for this management tool
    link: '/Admin/project-filter-order',
    gradientClass: 'bg-purple-gradient',
    icon: <MdFilterList size={32} className="card-icon" />,
    description: 'Manage project display order in filters.',
    shadowClass: 'shadow-purple'
  },

];

function formatNumber(num) {
  if (num === undefined || num === null) return '-';
  return num.toLocaleString();
}

const SkeletonCard = () => (
  <div className="skeleton-card">
    <div className="skeleton-card-header">
      <div className="skeleton-card-text-line-long"></div>
      <div className="skeleton-card-circle"></div>
    </div>
    <div className="skeleton-card-text-line-short"></div>
  </div>
);

const AdminDashboard = () => {
  const [counts, setCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [animatedCounts, setAnimatedCounts] = useState({});

  // Effect to inject styles into the document head
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = dashboardStyles;
    document.head.appendChild(styleSheet);

    return () => {
      // Clean up styles on component unmount
      document.head.removeChild(styleSheet);
    };
  }, []); // Run once on mount to inject styles

  // Effect for data fetching and interval
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
      // Build base URL and sanitize token
      const base = getApiBase(); // '/api' in local dev; full host in prod
      const raw = localStorage.getItem("myToken") || "";
      const cleanedToken = raw.replace(/^"|"$/g, "").replace(/^Bearer\s+/i, "");
      const results = await Promise.all(
        sections.map(section => {
          // Special handling for merged Career card
          if (section.name === 'Career' && section.openingsApi && section.applicationsApi) {
            return Promise.all([
              apiClient.get(`${base}${section.openingsApi.replace(/^\/api/, '')}`, {
                headers: {
                  "Content-Type": "application/json",
                  ...(cleanedToken ? { Authorization: `Bearer ${cleanedToken}` } : {}),
                }
              }).then(res => {
                if (res?.data && typeof res.data === 'object' && res.data.meta && typeof res.data.meta.total === 'number') {
                  return res.data.meta.total;
                }
                return 0;
              }).catch(err => {
                console.error('Career openings API error:', err);
                return 0;
              }),
              apiClient.get(`${base}${section.applicationsApi.replace(/^\/api/, '')}`, {
                headers: {
                  "Content-Type": "application/json",
                  ...(cleanedToken ? { Authorization: `Bearer ${cleanedToken}` } : {}),
                }
              }).then(res => {
                if (res?.data && typeof res.data.count === 'number') {
                  return res.data.count;
                }
                return 0;
              }).catch(err => {
                console.error('Career applications API error:', err);
                return 0;
              })
            ]).then(([openings, applications]) => ({ openings, applications }));
          }

          // Skip API call for management tools that don't need counts
          if (section.api === null) {
            return Promise.resolve(0);
          }

          // Default single-endpoint handling
          return apiClient.get(
            `${base}${(section.api || '').replace(/^\/api/, '')}`,
            {
              headers: {
                "Content-Type": "application/json",
                ...(cleanedToken ? { Authorization: `Bearer ${cleanedToken}` } : {}),
              }
            }
          )
            .then(res => {
              if (res?.data && typeof res.data === 'object' && res.data.meta && typeof res.data.meta.total === 'number') {
                return res.data.meta.total;
              }
              if (res?.data && typeof res.data.count === 'number') {
                return res.data.count;
              }
              if (section.name === 'Project Enquiries' && typeof res.data === 'object' && res.data !== null && typeof res.data.total === 'number') {
                return res.data.total;
              }
              if (
                typeof res.data === 'object' && res.data !== null && Array.isArray(res.data.data) && res.data.data.length > 0 && res.data.data[0]
              ) {
                if (typeof res.data.data[0].totalCount === 'number') {
                  return res.data.data[0].totalCount;
                }
                if (Array.isArray(res.data.data[0].data)) {
                  return res.data.data[0].data.length;
                }
              }
              if (typeof res.data === 'object' && res.data !== null && Array.isArray(res.data.data)) {
                return res.data.data.length;
              }
              if (typeof res.data === 'object' && res.data !== null && Array.isArray(res.data.users)) {
                return res.data.users.length;
              }
              if (typeof res.data === 'object' && res.data !== null && Array.isArray(res.data.allusers)) {
                return res.data.allusers.length;
              }
              if (Array.isArray(res.data)) {
                return res.data.length;
              }
              if (typeof res.data === 'object' && res.data !== null && 'count' in res.data) {
                return res.data.count;
              }
              return 0;
            })
            .catch((err) => {
              console.error(`API error for ${section.name}:`, err);
              return 0;
            });
        })
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
        const startVal = startCounts[section.name];
        const endVal = endCounts[section.name];
        const start = typeof startVal === 'number' ? startVal : 0;
        const end = typeof endVal === 'number' ? endVal : 0;
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
      <div className="error-container">
        <Sidebar />
        <div className="error-content-wrapper">
          <div className="error-card">
            <div className="error-icon">⚠️</div>
            <h2 className="error-title">Connection Error</h2>
            <p className="error-message">{error}</p>
            <button
              onClick={fetchCounts}
              className="error-retry-button"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900 dark:text-gray-100">
      <Sidebar />
      <div className="flex-1 min-w-0 p-10 ml-[250px] transition-colors duration-300">
        {/* Header */}
        <div className="dashboard-header">
          {/* Added the new header for the dashboard */}
          <h1 className="main-dashboard-title dark:text-white">
            <b>Admin Dashboard</b> 📊
          </h1>
          <div className="header-underline"></div>
        </div>

        {/* Quick action button */}
        <div className="flex justify-end mb-6">
          <Link
            to="/Admin/insights"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium shadow hover:from-blue-700 hover:to-indigo-700 transition"
          >
            Go to Insights
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          {loading ? (
            Array.from({ length: sections.length }).map((_, i) => <SkeletonCard key={i} />)
          ) : (
            sections.map(section => (
              <Link
                to={section.link}
                key={section.name}
                className="card-link"
              >
                <div className={`dashboard-card ${section.gradientClass} ${section.shadowClass}`}>

                  {/* Subtle background patterns */}
                  <div className="card-bg-overlay"></div>
                  <div className="card-circle-top-right"></div>
                  <div className="card-circle-bottom-left"></div>

                  {/* Geometric accent */}
                  <div className="card-dot-top-right-large"></div>
                  <div className="card-dot-top-right-small"></div>

                  {/* Content */}
                  <div className="card-content-wrapper">
                    <div className="card-header-flex">
                      <div className="card-name-container">
                        <span
                          className="card-name"
                          onMouseEnter={e => showTooltip(section.description, e)}
                          onMouseLeave={hideTooltip}
                          tabIndex={0}
                          aria-label={section.description}
                        >
                          {section.name}
                        </span>
                        <div className="card-name-underline"></div>
                      </div>
                      <div className="card-icon-wrapper">
                        {section.icon}
                      </div>
                    </div>

                    <div className={`card-number-section ${section.name === 'Career' ? 'career-two-line' : ''}`}>
                      {section.name === 'Career' && counts['Career'] && typeof counts['Career'] === 'object' ? (
                        <>
                          <div className="card-number-small">Openings: {formatNumber(counts['Career'].openings || 0)}</div>
                          <div className="card-number-small">Applications: {formatNumber(counts['Career'].applications || 0)}</div>
                          <div className="progress-bar-container">
                            <div
                              className="progress-bar-fill"
                              style={{
                                width: `${Math.min(((counts['Career'].openings || 0) + (counts['Career'].applications || 0)) / Math.max(
                                  ...Object.values(animatedCounts).filter(v => typeof v === 'number'), 1
                                ) * 100, 100)}%`
                              }}
                            ></div>
                          </div>
                        </>
                      ) : section.name === 'Project Filter Order' ? (
                        <>
                          <div className="card-number">
                            Manage
                          </div>
                          <div className="progress-bar-container">
                            <div
                              className="progress-bar-fill"
                              style={{
                                width: '100%'
                              }}
                            ></div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="card-number">
                            {formatNumber(animatedCounts[section.name] || 0)}
                          </div>
                          <div className="progress-bar-container">
                            <div
                              className="progress-bar-fill"
                              style={{
                                width: `${Math.min((animatedCounts[section.name] || 0) / Math.max(...Object.values(animatedCounts), 1) * 100, 100)}%`
                              }}
                            ></div>
                          </div>
                        </>
                      )}
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
            className="tooltip"
            style={{ left: tooltip.x + 15, top: tooltip.y - 50 }}
          >
            <div className="tooltip-text">{tooltip.text}</div>
            <div className="tooltip-arrow"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

// --- Embedded CSS Styles ---
const dashboardStyles = `
/* General Layout */
.admin-dashboard-container {
  display: flex;
  min-height: 100vh;
  background: linear-gradient(to bottom right, #f8fafc, #f9fafb, #f0f9ff);
}

.admin-dashboard-content {
  flex: 1;
  min-width: 0;
  padding: 2.5rem 0.5rem;
  /* Added margin-left to push content past the sidebar */
  /* Assuming Sidebar has a fixed width, e.g., 250px. Adjust this value if your sidebar is wider/narrower */
  margin-left: 250px; /* Adjust this value to match your Sidebar's width */
}

@media (min-width: 640px) {
  .admin-dashboard-content {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

@media (min-width: 768px) {
  .admin-dashboard-content {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .admin-dashboard-content {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}

/* Header */
.dashboard-header {
  margin-bottom: 2.5rem;
  text-align: center; /* Center the new title */
}

.main-dashboard-title {
  font-size: 2.5rem; /* Larger font size for the title */
  color: #1e293b; /* Darker color for prominence */
  margin-bottom: 1rem; /* Space below the title */
  text-shadow: 1px 1px 2px rgba(0,0,0,0.1); /* Subtle text shadow */
}

.header-underline {
  width: 6rem;
  height: 0.25rem;
  background: linear-gradient(to right, #94a3b8, #d1d5db);
  border-radius: 9999px;
  margin: 0 auto; /* Center the underline as well */
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 640px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1024px) {
  .stats-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* Card Link Wrapper */
.card-link {
  display: block;
  outline: none;
}

.card-link:focus {
  outline: none;
}

/* Card Base */
.dashboard-card {
  position: relative;
  border-radius: 1rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  height: 12rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.5s ease-in-out;
}

.card-link:hover .dashboard-card {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  transform: translateY(-0.75rem) scale(1.05);
}

.card-link:active .dashboard-card {
  transform: scale(0.95);
}

/* Card Background Gradients */
.bg-slate-gradient {
  background: linear-gradient(to bottom right, #1e293b, #1e293b, #334155);
}
.bg-gray-gradient {
  background: linear-gradient(to bottom right, #4b5563, #374151, #1f2937);
}
.bg-zinc-gradient {
  background: linear-gradient(to bottom right, #3f3f46, #27272a, #18181b);
}
.bg-neutral-gradient {
  background: linear-gradient(to bottom right, #404040, #262626, #0a0a0a);
}
.bg-stone-gradient {
  background: linear-gradient(to bottom right, #44403c, #292524, #1c1917);
}
.bg-light-slate-gradient {
  background: linear-gradient(to bottom right, #475569, #334155, #64748b);
}
.bg-light-gray-gradient {
  background: linear-gradient(to bottom right, #6b7280, #4b5563, #374151);
}
.bg-light-zinc-gradient {
  background: linear-gradient(to bottom right, #52525b, #3f3f46, #27272a);
}
.bg-light-neutral-gradient {
  background: linear-gradient(to bottom right, #737373, #525252, #404040);
}
.bg-light-stone-gradient {
  background: linear-gradient(to bottom right, #78716c, #57534e, #44403c);
}
.bg-medium-slate-gradient {
  background: linear-gradient(to bottom right, #64748b, #475569, #94a3b8);
}
.bg-purple-gradient {
  background: linear-gradient(to bottom right, #7c3aed, #6d28d9, #5b21b6);
}

/* Card Shadow Colors */
.shadow-slate {
  box-shadow: 0 10px 15px -3px rgba(71, 85, 105, 0.2), 0 4px 6px -2px rgba(71, 85, 105, 0.2);
}
.shadow-gray {
  box-shadow: 0 10px 15px -3px rgba(107, 114, 128, 0.2), 0 4px 6px -2px rgba(107, 114, 128, 0.2);
}
.shadow-zinc {
  box-shadow: 0 10px 15px -3px rgba(113, 113, 122, 0.2), 0 4px 6px -2px rgba(113, 113, 122, 0.2);
}
.shadow-neutral {
  box-shadow: 0 10px 15px -3px rgba(163, 163, 163, 0.2), 0 4px 6px -2px rgba(163, 163, 163, 0.2);
}
.shadow-stone {
  box-shadow: 0 10px 15px -3px rgba(168, 162, 158, 0.2), 0 4px 6px -2px rgba(168, 162, 158, 0.2);
}
.shadow-light-slate {
  box-shadow: 0 10px 15px -3px rgba(148, 163, 184, 0.2), 0 4px 6px -2px rgba(148, 163, 184, 0.2);
}
.shadow-light-gray {
  box-shadow: 0 10px 15px -3px rgba(156, 163, 175, 0.2), 0 4px 6px -2px rgba(156, 163, 175, 0.2);
}
.shadow-light-zinc {
  box-shadow: 0 10px 15px -3px rgba(161, 161, 170, 0.2), 0 4px 6px -2px rgba(161, 161, 170, 0.2);
}
.shadow-light-neutral {
  box-shadow: 0 10px 15px -3px rgba(189, 189, 189, 0.2), 0 4px 6px -2px rgba(189, 189, 189, 0.2);
}
.shadow-light-stone {
  box-shadow: 0 10px 15px -3px rgba(214, 211, 209, 0.2), 0 4px 6px -2px rgba(214, 211, 209, 0.2);
}
.shadow-medium-slate {
  box-shadow: 0 10px 15px -3px rgba(203, 213, 225, 0.2), 0 4px 6px -2px rgba(203, 213, 225, 0.2);
}
.shadow-purple {
  box-shadow: 0 10px 15px -3px rgba(124, 58, 237, 0.2), 0 4px 6px -2px rgba(124, 58, 237, 0.2);
}


/* Card Internal Elements */
.card-bg-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom right, rgba(255, 255, 255, 0.05), transparent);
}

.card-circle-top-right {
  position: absolute;
  top: 0;
  right: 0;
  width: 8rem;
  height: 8rem;
  background-color: rgba(255, 255, 255, 0.03);
  border-radius: 9999px;
  transform: translateY(-4rem) translateX(4rem);
}

.card-circle-bottom-left {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 6rem;
  height: 6rem;
  background-color: rgba(255, 255, 255, 0.03);
  border-radius: 9999px;
  transform: translateY(3rem) translateX(-3rem);
}

.card-dot-top-right-large {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 0.5rem;
  height: 0.5rem;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 9999px;
}

.card-dot-top-right-small {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  width: 0.25rem;
  height: 0.25rem;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 9999px;
}

.card-content-wrapper {
  position: relative;
  z-index: 10;
}

.card-header-flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.card-name-container {
  flex: 1;
}

.card-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
  filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.05));
  position: relative;
  display: block;
  line-height: 1.25;
}

.card-name-underline {
  width: 2rem;
  height: 0.125rem;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 9999px;
  margin-top: 0.5rem;
  transition: all 0.3s ease-in-out;
}

.card-link:hover .card-name-underline {
  width: 3rem;
}

.card-icon-wrapper {
  margin-left: 1rem;
  padding: 0.5rem;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(4px);
  border-radius: 0.75rem;
  transition: all 0.3s ease-in-out;
}

.card-link:hover .card-icon-wrapper {
  background-color: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
}

.card-icon {
  color: rgba(255, 255, 255, 0.9);
}

.card-number-section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.card-number {
  font-size: 2.25rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.95);
  filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.05));
  transform-origin: left;
  transition: transform 0.3s ease-in-out;
}

.card-link:hover .card-number {
  transform: scale(1.1);
}

/* Smaller number style for compact two-line displays (Career card) */
.card-number-small {
  font-size: 1.125rem; /* ~18px */
  font-weight: 700;
  color: rgba(255, 255, 255, 0.95);
  line-height: 1.3;
}

/* Tighter spacing when rendering two lines in a card */
.career-two-line {
  gap: 0.25rem;
}

.career-two-line .progress-bar-container {
  margin-top: 0.25rem;
}

.progress-bar-container {
  width: 100%;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 9999px;
  height: 0.25rem;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 9999px;
  transition: all 1s ease-out;
}

/* Skeleton Card */
.skeleton-card {
  position: relative;
  border-radius: 0.75rem;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  background: linear-gradient(to bottom right, #e2e8f0, #cbd5e1);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 1.5rem;
  height: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid #e2e8f0;
}

.skeleton-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.skeleton-card-text-line-long {
  height: 1.5rem;
  width: 8rem;
  background-color: #cbd5e1;
  border-radius: 0.25rem;
}

.skeleton-card-circle {
  height: 2rem;
  width: 2rem;
  background-color: #cbd5e1;
  border-radius: 9999px;
}

.skeleton-card-text-line-short {
  height: 2.5rem;
  width: 5rem;
  background-color: #cbd5e1;
  border-radius: 0.25rem;
  margin-top: 0.5rem;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
}

/* Error State */
.error-container {
  display: flex;
  min-height: 100vh;
  background-color: #f8fafc;
}

.error-content-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.error-card {
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  max-width: 28rem;
  width: 100%;
  text-align: center;
  border: 1px solid #e2e8f0;
}

.error-icon {
  color: #94a3b8;
  font-size: 3.75rem;
  margin-bottom: 1rem;
}

.error-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.error-message {
  color: #475569;
  margin-bottom: 1.5rem;
}

.error-retry-button {
  background: linear-gradient(to right, #475569, #334155);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  transition: all 0.2s ease-in-out;
  font-weight: 500;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.error-retry-button:hover {
  background: linear-gradient(to right, #334155, #1e293b);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

/* Tooltip */
.tooltip {
  position: fixed;
  z-index: 50;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  background-color: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(4px);
  color: white;
  font-size: 0.875rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  pointer-events: none;
  border: 1px solid #334155;
  max-width: 16rem;
}

.tooltip-text {
  font-weight: 500;
  color: #f1f5f9;
}

.tooltip-arrow {
  position: absolute;
  left: -0.5rem;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-top: 0.25rem solid transparent;
  border-bottom: 0.25rem solid transparent;
  border-right: 0.5rem solid rgba(15, 23, 42, 0.95);
}
`;
