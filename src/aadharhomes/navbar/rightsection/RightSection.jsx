import React, { useEffect, useRef, useState } from "react";
import AuthModal from "../../../Resister/AuthModal";
import api from "../../../config/apiClient";
import { Button as MovingBorderButton } from "../../../Components/ui/moving-border";
import showToast from "../../../Utils/toastUtils";

// Custom hook to replicate useBreakpointValue({ base: true, md: false })
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return isMobile;
}

// SearchIcon SVG replacement
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
    <path d="M20 20l-3-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export default function RightSection({
  colorChange,
  isSearchOpen,
  isHome,
  setIsSearchOpen,
  token,
  avatarUrl,
  userId,
  onAvatarUpdated,
  firstName,
  isAdmin,
  isBlogger,
  go,
  HandleUserLogout,
  ShowLogOutMessage,
  showModal,
  showAuth,
  setShowAuth,
  isHr,
  isSalesHead,
}) {
  const [isAcctOpen, setIsAcctOpen] = useState(false);
  const isMobile = useIsMobile();
  const fileInputRef = useRef(null);

  const onAcctOpen = () => setIsAcctOpen(true);
  const onAcctClose = () => setIsAcctOpen(false);

  // Dynamic color for icons/text based on scroll/home
  const textColor = isHome ? "white" : (!colorChange ? "red" : "white");

  useEffect(() => {
    const openAuth = () => {
      if (typeof setShowAuth === "function") setShowAuth(true);
    };
    const closeAuth = () => {
      if (typeof setShowAuth === "function") setShowAuth(false);
    };
    try {
      window.addEventListener("showAuthModal", openAuth);
      window.addEventListener("closeAuthModal", closeAuth);
    } catch (_) {}
    return () => {
      try {
        window.removeEventListener("showAuthModal", openAuth);
        window.removeEventListener("closeAuthModal", closeAuth);
      } catch (_) {}
    };
  }, [setShowAuth]);

  const handleFileChange = async (e) => {
    try {
      const file = (e.target.files && e.target.files[0]) || null;
      if (!file || !userId) return;
      const isImage = (file.type || "").toLowerCase().startsWith("image/");
      const maxSize = 5 * 1024 * 1024;
      if (!isImage) { showToast.error("Only image files are allowed"); return; }
      if (file.size > maxSize) { showToast.error("File too large (max 5MB)"); return; }
      if (!token) { showToast.error("Please log in to change your photo"); return; }
      const form = new FormData();
      form.append("avatar", file);
      const res = await api.post(`/postPerson/users/${userId}/avatar`, form);
      const url = res?.data?.data?.avatarUrl || "";
      if (url && typeof onAvatarUpdated === "function") onAvatarUpdated(url);
      showToast.success("Profile photo updated");
    } catch (err) {
      const msg = err?.response?.data?.message || err?.response?.data?.error || err?.message || "Upload failed";
      showToast.error(msg);
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Avatar circle shared across mobile & desktop
  const AvatarCircle = ({ size = 32 }) => (
    <span
      style={{ width: size, height: size, border: "1px solid rgba(0,0,0,0.1)" }}
      className="rounded-full inline-flex items-center justify-center overflow-hidden bg-gray-100 flex-shrink-0"
    >
      {avatarUrl ? (
        <img
          src={avatarUrl.includes("http") ? avatarUrl : `${process.env.REACT_APP_API_URL || ""}${avatarUrl}`}
          alt={firstName || "Profile"}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.style.display = "none";
            if (e.target.nextSibling) e.target.nextSibling.style.display = "flex";
          }}
        />
      ) : null}
      <span
        className="items-center justify-center w-full h-full bg-blue-500 text-sm font-bold"
        style={{ display: !avatarUrl ? "flex" : "none", color: textColor }}
      >
        {firstName ? (
          firstName.charAt(0).toUpperCase()
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M12 12c2.485 0 4.5-2.015 4.5-4.5S14.485 3 12 3 7.5 5.015 7.5 7.5 9.515 12 12 12Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M4 20.25c1.9-3.3 5.2-4.75 8-4.75s6.1 1.45 8 4.75" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        )}
      </span>
    </span>
  );

  return (
    <div
      className="flex items-center flex-nowrap justify-end relative overflow-x-auto md:overflow-x-visible"
      style={{
        gap: isMobile ? 2 : 4,
        order: 3,
        flex: isMobile ? "initial" : 1,
        zIndex: 10001,
        whiteSpace: "nowrap",
        scrollbarWidth: "none",
      }}
    >
      {/* Search trigger — desktop only */}
      <button
        aria-label="Search"
        onClick={() => setIsSearchOpen(true)}
        className="hidden md:inline-flex items-center justify-center w-8 h-8 rounded-md bg-transparent transition-opacity duration-300 hover:bg-transparent"
        style={{
          color: textColor,
          opacity: !colorChange && !isSearchOpen ? 1 : 0,
          pointerEvents: !colorChange && !isSearchOpen ? "auto" : "none",
        }}
      >
        <SearchIcon />
      </button>

      <div style={{ opacity: 1, pointerEvents: "auto" }}>
        <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} style={{ display: "none" }} />

        {token ? (
          isMobile ? (
            /* ─── MOBILE: button + custom drawer ─── */
            <>
              <button
                onClick={() => (isAcctOpen ? onAcctClose() : onAcctOpen())}
                aria-label="Profile"
                className="bg-transparent border-none p-1"
              >
                <AvatarCircle size={32} />
              </button>

              {/* Mobile Drawer */}
              <div className={`fixed inset-0 z-[15000] ${isAcctOpen ? "visible" : "invisible"}`}>
                {/* Overlay */}
                <div
                  className={`absolute inset-0 bg-black transition-opacity duration-300 ${isAcctOpen ? "opacity-50" : "opacity-0"}`}
                  onClick={onAcctClose}
                />

                {/* Drawer Content */}
                <div
                  className={`absolute right-0 top-0 h-full w-[260px] max-w-[260px] bg-white shadow-xl transform transition-transform duration-300 ${isAcctOpen ? "translate-x-0" : "translate-x-full"}`}
                >
                  {/* Drawer Header */}
                  <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                    {/* Close Button */}
                    <button
                      onClick={onAcctClose}
                      className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                      aria-label="Close"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M18 6L6 18M6 6l12 12" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>

                    {/* Name + Avatar */}
                    <div className="flex items-center gap-3">
                      <span className="text-base font-semibold text-gray-900">{firstName || "Account"}</span>
                      <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-200 bg-gray-100 flex items-center justify-center">
                        {avatarUrl ? (
                          <img
                            src={avatarUrl.includes("http") ? avatarUrl : `${process.env.REACT_APP_API_URL || ""}${avatarUrl}`}
                            alt={firstName || "Profile"}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.style.display = "none";
                              if (e.target.nextSibling) e.target.nextSibling.style.display = "flex";
                            }}
                          />
                        ) : null}
                        <span className={`${!avatarUrl ? "flex" : "hidden"} items-center justify-center w-full h-full bg-blue-500 text-white text-sm font-bold`}>
                          {firstName ? firstName.charAt(0).toUpperCase() : (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                              <path d="M12 12c2.485 0 4.5-2.015 4.5-4.5S14.485 3 12 3 7.5 5.015 7.5 7.5 9.515 12 12 12Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                              <path d="M4 20.25c1.9-3.3 5.2-4.75 8-4.75s6.1 1.45 8 4.75" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                            </svg>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Drawer Body */}
                  <div className="flex flex-col justify-between h-[calc(100%-60px)] overflow-y-auto pb-6">
                    <div className="p-3 space-y-3">
                      <button onClick={() => { onAcctClose(); go("/userdashboard/"); }} className="w-full flex flex-col items-center justify-center text-center py-3 px-4 min-h-[56px] bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow transition-all">
                        <span className="mb-1">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 12c2.485 0 4.5-2.015 4.5-4.5S14.485 3 12 3 7.5 5.015 7.5 7.5 9.515 12 12 12Z" stroke="#111" strokeWidth="1.6" strokeLinecap="round" /><path d="M4 20.25c1.9-3.3 5.2-4.75 8-4.75s6.1 1.45 8 4.75" stroke="#111" strokeWidth="1.6" strokeLinecap="round" /></svg>
                        </span>
                        <span className="text-gray-900 text-sm font-semibold">View Profile</span>
                      </button>

                      <button onClick={() => { onAcctClose(); go("/activity"); }} className="w-full flex flex-col items-center justify-center text-center py-3 px-4 min-h-[56px] bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow transition-all">
                        <span className="mb-1">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="#111" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </span>
                        <span className="text-gray-900 text-sm font-semibold">Activity</span>
                      </button>

                      {isAdmin && (
                        <button onClick={() => { onAcctClose(); go("/admin/"); }} className="w-full flex flex-col items-center justify-center text-center py-3 px-4 min-h-[56px] bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow transition-all">
                          <span className="mb-1"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 3l8 4v5c0 4.418-3.582 8-8 8s-8-3.582-8-8V7l8-4Z" stroke="#111" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /><path d="M9.5 12l1.5 1.5L14.5 10" stroke="#16a34a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                          <span className="text-gray-900 text-sm font-semibold">Admin</span>
                        </button>
                      )}

                      {isBlogger && (
                        <button onClick={() => { onAcctClose(); go("/seo/blogs"); }} className="w-full flex flex-col items-center justify-center text-center py-3 px-4 min-h-[56px] bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow transition-all">
                          <span className="mb-1"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M5 5h14v14H5z" stroke="#111" strokeWidth="1.6" /><path d="M8 9h8M8 12h8M8 15h5" stroke="#111" strokeWidth="1.6" strokeLinecap="round" /></svg></span>
                          <span className="text-gray-900 text-sm font-semibold">Blog</span>
                        </button>
                      )}

                      {isHr && (
                        <button onClick={() => { onAcctClose(); go("/hr/dashboard"); }} className="w-full flex flex-col items-center justify-center text-center py-3 px-4 min-h-[56px] bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow transition-all">
                          <span className="mb-1"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 3l8 4v5c0 4.418-3.582 8-8 8s-8-3.582-8-8V7l8-4Z" stroke="#111" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /><path d="M9.5 12l1.5 1.5L14.5 10" stroke="#16a34a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                          <span className="text-gray-900 text-sm font-semibold">HR</span>
                        </button>
                      )}

                      {isSalesHead && (
                        <button onClick={() => { onAcctClose(); go("/sales-head/dashboard"); }} className="w-full flex flex-col items-center justify-center text-center py-3 px-4 min-h-[56px] bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow transition-all">
                          <span className="mb-1"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="#111" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /><circle cx="9" cy="7" r="4" stroke="#111" strokeWidth="1.6" /><path d="m22 9-6 6m0-6 6 6" stroke="#111" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
                          <span className="text-gray-900 text-sm font-semibold">Sales Head</span>
                        </button>
                      )}
                    </div>

                    {/* Logout */}
                    <div className="px-4 pb-3">
                      <button
                        onClick={() => { onAcctClose(); HandleUserLogout(); ShowLogOutMessage(); }}
                        className="w-full py-2.5 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md transition-colors"
                      >
                        Log out
                      </button>
                    </div>

                    <div className="h-16 md:h-0" />
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* ─── DESKTOP: custom dropdown menu ─── */
            <DesktopMenu
              avatarUrl={avatarUrl}
              firstName={firstName}
              isHome={isHome}
              colorChange={colorChange}
              isAdmin={isAdmin}
              isBlogger={isBlogger}
              isHr={isHr}
              isSalesHead={isSalesHead}
              go={go}
              HandleUserLogout={HandleUserLogout}
              ShowLogOutMessage={ShowLogOutMessage}
            />
          )
        ) : (
          /* ─── NOT LOGGED IN ─── */
          <>
            <button
              onClick={showModal}
              aria-label="Profile"
              className="bg-transparent border-none p-1"
            >
              <div className="flex items-center gap-2">
                <span
                  style={{ width: 32, height: 32, border: "1px solid rgba(0,0,0,0.1)" }}
                  className="rounded-full inline-flex items-center justify-center bg-gray-100"
                >
                  <span className="text-gray-500 leading-none">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M12 12c2.485 0 4.5-2.015 4.5-4.5S14.485 3 12 3 7.5 5.015 7.5 7.5 9.515 12 12 12Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      <path d="M4 20.25c1.9-3.3 5.2-4.75 8-4.75s6.1 1.45 8 4.75" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  </span>
                </span>
                <span
                  className="text-sm hidden xl:inline"
                  style={{ color: isHome ? "white" : (!colorChange ? "red" : "white") }}
                >
                  Log in
                </span>
              </div>
            </button>
            <AuthModal open={showAuth} onClose={() => setShowAuth(false)} defaultView="login" />
          </>
        )}
      </div>

      {/* Desktop Post Property CTA */}
      <div className="hidden md:inline-flex ml-0.5">
        <div onClick={() => { window.location.href = "/postproperty/"; }}>
          <MovingBorderButton
            borderRadius="1.75rem"
            className="text-black cursor-pointer"
            bgColor="#ffffff"
            ringColor={colorChange ? "#FACC15" : "#ef4444"}
          >
            <span style={{ display: "inline-flex", alignItems: "center", gap: 10, fontWeight: 700 }}>
              <span style={{ fontSize: 14 }}>Post Property</span>
              <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", background: "#FACC15", color: "#e11d48", padding: "4px 14px", fontSize: 12, fontWeight: 900, lineHeight: 1, clipPath: "polygon(50% 0, 100% 50%, 50% 100%, 0 50%)" }}>
                FREE
              </span>
            </span>
          </MovingBorderButton>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Desktop dropdown menu (replaces Chakra Menu)
───────────────────────────────────────────── */
function DesktopMenu({ avatarUrl, firstName, isHome, colorChange, isAdmin, isBlogger, isHr, isSalesHead, go, HandleUserLogout, ShowLogOutMessage }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const textColor = isHome ? "white" : (!colorChange ? "red" : "white");

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div className="relative" ref={menuRef}>
      {/* Trigger button */}
      <button
        aria-label="Profile"
        onClick={() => setOpen((v) => !v)}
        className="bg-transparent border-none p-1 flex items-center gap-2"
      >
        <span
          style={{ width: 32, height: 32, border: "1px solid rgba(0,0,0,0.1)" }}
          className="rounded-full inline-flex items-center justify-center overflow-hidden bg-gray-100 flex-shrink-0"
        >
          {avatarUrl ? (
            <img
              src={avatarUrl.includes("http") ? avatarUrl : `${process.env.REACT_APP_API_URL || ""}${avatarUrl}`}
              alt={firstName || "Profile"}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = "none";
                if (e.target.nextSibling) e.target.nextSibling.style.display = "flex";
              }}
            />
          ) : null}
          <span
            className="items-center justify-center w-full h-full bg-blue-500 text-sm font-bold"
            style={{ display: !avatarUrl ? "flex" : "none", color: textColor }}
          >
            {firstName ? firstName.charAt(0).toUpperCase() : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 12c2.485 0 4.5-2.015 4.5-4.5S14.485 3 12 3 7.5 5.015 7.5 7.5 9.515 12 12 12Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M4 20.25c1.9-3.3 5.2-4.75 8-4.75s6.1 1.45 8 4.75" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            )}
          </span>
        </span>
        {firstName && (
          <span className="hidden xl:inline text-sm font-semibold" style={{ color: textColor }}>
            {firstName}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="fixed bg-white border border-gray-200 rounded-xl shadow-lg overflow-y-auto"
          style={{
            top: (() => {
              if (!menuRef.current) return 56;
              const rect = menuRef.current.getBoundingClientRect();
              return rect.bottom + 4;
            })(),
            right: (() => {
              if (!menuRef.current) return 16;
              const rect = menuRef.current.getBoundingClientRect();
              return window.innerWidth - rect.right;
            })(),
            minWidth: 220,
            maxHeight: "60vh",
            zIndex: 14000,
          }}
        >
          {/* Close button */}
          <div className="flex justify-end p-2 absolute top-0 right-0 z-10">
            <button
              onClick={() => setOpen(false)}
              className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-gray-100"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Name */}
          {firstName && (
            <div className="px-3 pt-6 pb-2 text-center">
              <span className="text-base font-semibold text-gray-900">{firstName}</span>
            </div>
          )}
          <div className="h-px bg-gray-200 mx-0" />

          {/* Menu Items */}
          <MenuItem icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 12c2.485 0 4.5-2.015 4.5-4.5S14.485 3 12 3 7.5 5.015 7.5 7.5 9.515 12 12 12Z" stroke="#111" strokeWidth="1.6" strokeLinecap="round" /><path d="M4 20.25c1.9-3.3 5.2-4.75 8-4.75s6.1 1.45 8 4.75" stroke="#111" strokeWidth="1.6" strokeLinecap="round" /></svg>} label="View Profile" onClick={() => { setOpen(false); go("/userdashboard/"); }} />
          <MenuItem icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="#111" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>} label="Activity" onClick={() => { setOpen(false); go("/activity"); }} />
          {isAdmin && <MenuItem icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 3l8 4v5c0 4.418-3.582 8-8 8s-8-3.582-8-8V7l8-4Z" stroke="#111" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /><path d="M9.5 12l1.5 1.5L14.5 10" stroke="#16a34a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>} label="Admin" onClick={() => { setOpen(false); go("/admin/"); }} />}
          {isBlogger && <MenuItem icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 5h14v14H5z" stroke="#111" strokeWidth="1.6" /><path d="M8 9h8M8 12h8M8 15h5" stroke="#111" strokeWidth="1.6" strokeLinecap="round" /></svg>} label="Blog" onClick={() => { setOpen(false); go("/seo/blogs"); }} />}
          {isHr && <MenuItem icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 3l8 4v5c0 4.418-3.582 8-8 8s-8-3.582-8-8V7l8-4Z" stroke="#111" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /><path d="M9.5 12l1.5 1.5L14.5 10" stroke="#16a34a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>} label="HR" onClick={() => { setOpen(false); go("/hr/dashboard"); }} />}
          {isSalesHead && <MenuItem icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="#111" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /><circle cx="9" cy="7" r="4" stroke="#111" strokeWidth="1.6" /><path d="m22 9-6 6m0-6 6 6" stroke="#111" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>} label="Sales Head" onClick={() => { setOpen(false); go("/sales-head/dashboard"); }} />}

          <div className="h-px bg-gray-200" />

          {/* Logout */}
          <button
            onClick={() => { setOpen(false); HandleUserLogout(); ShowLogOutMessage(); }}
            className="w-full flex items-center px-4 py-2.5 text-sm hover:bg-red-50 transition-colors"
          >
            <span className="leading-none mr-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M16 17l5-5-5-5" stroke="#dc2626" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M21 12H9" stroke="#dc2626" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M13 21H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" stroke="#111" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="text-gray-700">Log out</span>
          </button>
        </div>
      )}
    </div>
  );
}

// Reusable menu item for desktop dropdown
function MenuItem({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
    >
      <span className="leading-none mr-3">{icon}</span>
      {label}
    </button>
  );
}