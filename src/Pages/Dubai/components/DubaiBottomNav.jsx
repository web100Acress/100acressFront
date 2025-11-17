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
                <i className="fa-solid fa-house"></i>
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
                href="tel:+971501234567"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold text-black shadow-lg ring-4 ring-black focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-black hover:shadow-gold"
                aria-label="Call Dubai Office"
                title="Call Dubai Office"
              >
                <i className="fa-solid fa-phone text-lg" aria-hidden="true"></i>
              </a>
              <span className="mt-1 text-[11px] text-white/70">Contact</span>
            </div>

            {/* Blogs */}
            <Link to="/blog/" className="flex flex-col items-center gap-1 py-2">
              <span className={`text-xl ${isActive("/blog") ? "text-gold" : "text-white/60"}`}>
                <i className="fa-solid fa-blog"></i>
              </span>
              <span className={`${isActive("/blog") ? "text-white font-semibold" : ""}`}>Blogs</span>
            </Link>

            {/* Profile */}
            <Link to="/userdashboard/" className="flex flex-col items-center gap-1 py-2">
              <span className={`text-xl ${isActive("/userdashboard") ? "text-gold" : "text-white/60"}`}>
                <i className="fa-solid fa-user"></i>
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
