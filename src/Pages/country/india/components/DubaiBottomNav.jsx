import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const DubaiBottomNav = () => {
  const location = useLocation();
  const path = location.pathname || "/";

  const isActive = (match) => {
    if (Array.isArray(match)) return match.some((m) => path.startsWith(m));
    return path === match || path.startsWith(match);
  };

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-[10000]">
      <div className="mx-auto max-w-screen-md">
        <div className="relative px-2 pb-[10px] pt-2">
          {/* Bar background with Dubai theme */}
          <div className="absolute inset-0 rounded-t-3xl bg-black border-t border-gold/30 shadow-[0_-4px_12px_rgba(212,175,55,0.15)]"></div>

          <div className="relative grid grid-cols-5 items-end text-xs text-white/70">
            {/* Home */}
            <Link to="/" className="flex flex-col items-center gap-1 py-2">
              <span className={`text-xl ${isActive(["/", "/projects", "/property"]) ? "text-gold" : "text-white/60"}`}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                </svg>
              </span>
              <span className={`${isActive(["/", "/projects", "/property"]) ? "text-white font-semibold" : ""}`}>Home</span>
            </Link>

            {/* India (replacing Dubai) */}
            <Link to="/" className="flex flex-col items-center gap-1 py-2">
              <span className={`text-xl ${isActive("/") ? "text-gold" : "text-white/60"}`}>
                <img 
                  src="/icons/noun-india-gate-1574740.svg" 
                  alt="India Gate" 
                  className="w-6 h-6"
                  style={{
                    filter: isActive("/") ? "brightness(0) saturate(100%) invert(82%) sepia(74%) saturate(1532%) hue-rotate(4deg) brightness(104%) contrast(104%)" : "brightness(0) saturate(100%) invert(60%)"
                  }}
                />
              </span>
              <span className={`${isActive("/") ? "text-white font-semibold" : ""}`}>India</span>
            </Link>

            {/* Center CTA: Contact (call by phone) with Dubai theme */}
            <div className="flex flex-col items-center justify-center -mt-6">
              <a
                href="tel:+919811750740"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold text-black shadow-lg ring-4 ring-black focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-black hover:shadow-gold"
                aria-label="Call 100acress Office"
                title="Call 100acress Office"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
              </a>
              <span className="mt-1 text-[11px] text-white/70">Contact</span>
            </div>

            {/* Blogs */}
            <Link to="/blog/" className="flex flex-col items-center gap-1 py-2">
              <span className={`text-xl ${isActive("/blog") ? "text-gold" : "text-white/60"}`}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                </svg>
              </span>
              <span className={`${isActive("/blog") ? "text-white font-semibold" : ""}`}>Blogs</span>
            </Link>

            {/* Profile */}
            <Link to="/userdashboard/" className="flex flex-col items-center gap-1 py-2">
              <span className={`text-xl ${isActive("/userdashboard") ? "text-gold" : "text-white/60"}`}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </span>
              <span className={`${isActive("/userdashboard") ? "text-white font-semibold" : ""}`}>Profile</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DubaiBottomNav;
