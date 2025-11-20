import React, { useEffect, useContext, useState, useCallback } from "react";
import {
  LocationRedIcon,
  PropertyIcon,
  RupeeIcon,
  ShareFrameIcon,
} from "../Assets/icons";
import AOS from "aos";
import { Link } from "react-router-dom";
import { EyeIcon, Phone } from "lucide-react";
import CustomSkeleton from "./CustomSkeleton";
// import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import AuthModal from "../Resister/AuthModal";
import { AuthContext } from "../AuthContext";
import {
  isFavorite as favCheck,
  toggleFavorite,
  subscribe,
  hydrateFavoritesFromServer,
} from "../Utils/favorites";

const CommonProject = ({
  data,
  title,
  path,
  animation,
  compact = false,
  showGrid = true,
  hideHeader = false,
}) => {
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

  const { isAuthenticated } = useContext(AuthContext);
  const [showAuth, setShowAuth] = useState(false);
  const [favTick, setFavTick] = useState(0);

  // Persist viewed projects to localStorage and notify listeners (e.g., sidebar)
  const addViewedProject = useCallback((item) => {
    try {
      const id = item?._id || item?.id || item?.slug || item?.project_url;
      if (!id) return;
      const raw = localStorage.getItem("viewed_projects");
      const list = raw ? JSON.parse(raw) : [];
      // keep unique and recent first
      const without = list.filter((x) => x.id !== id);
      const entry = {
        id,
        _id: item?._id,
        title: item?.projectName,
        projectName: item?.projectName,
        url: item?.project_url ? `/${item.project_url}/` : undefined,
        project_url: item?.project_url,
        city: item?.city || item?.location,
        location: item?.location,
        // Image fields - all variations
        thumbnailImage: item?.thumbnailImage,
        thumbnail: item?.thumbnail,
        frontImage: item?.frontImage,
        front_image: item?.front_image,
        cardImage: item?.cardImage,
        bannerImage: item?.bannerImage,
        image: item?.image,
        img: item?.img,
        images: item?.images,
        gallery: item?.gallery,
        cover: item?.cover,
        coverImage: item?.coverImage,
        photo: item?.photo,
        picture: item?.picture,
        // Price and details
        priceText: item?.priceText,
        minPrice: item?.minPrice,
        maxPrice: item?.maxPrice,
        price: item?.price,
        beds: item?.beds || item?.bedrooms || item?.bhk,
        baths: item?.baths || item?.bathrooms,
        area: item?.area || item?.size || item?.superArea,
        ts: Date.now(),
      };
      const next = [entry, ...without].slice(0, 50);
      localStorage.setItem("viewed_projects", JSON.stringify(next));
      // Notify sidebar to refresh count
      window.dispatchEvent(new Event("viewed-projects-changed"));
      // TODO: If API available and user is authenticated, send this event to backend as well.
    } catch (_) {}
  }, []);

  useEffect(() => {
    AOS.init();
  }, []);

  // Hydrate favorites once and subscribe for cross-component updates
  useEffect(() => {
    try {
      hydrateFavoritesFromServer();
    } catch (_) {}
    const unsub = subscribe(() => setFavTick((v) => v + 1));
    return () => {
      if (typeof unsub === "function") unsub();
    };
  }, []);

  const response = data;

  const renderProjectItem = (item, index) => {
    const pUrl = item.project_url;
    const id = item?._id || item?.id || item?.slug || pUrl;
    const isFav = favCheck(id);
    // Choose appropriate heading level: use h3 when a section title (h2) is present, otherwise h2
    const HeadingTag = title ? "h3" : "h2";
    return (
      <span key={index} className="mb-2 md:mb-0">
        <article
          key={index}
          className={`group overflow-hidden rounded-2xl border border-gray-200 text-black shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.12)] transition-all duration-300 ease-out h-full flex flex-col bg-white ${
            compact ? "text-[13px]" : ""
          }`}
        >
          {/* Image */}
          <div className="relative">
            <Link
              to={`/${pUrl}/`}
              target="_top"
              className="block"
              onClick={() => addViewedProject(item)}
            >
              <div className="overflow-hidden rounded-t-2xl">
                <img
                  src={item?.thumbnailImage?.url || item?.frontImage?.url || `https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/${item?.thumbnailImage?.public_id}`}
                  alt="Property"
                  className={`w-full ${
                    compact ? "aspect-[4/3]" : "aspect-[16/9]"
                  } object-cover transform-gpu transition-transform duration-500 ease-out group-hover:scale-[1.04]`}
                  loading="lazy"
                  onError={(e) => {
                    e.target.src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='640' height='360' viewBox='0 0 640 360'%3E%3Crect width='640' height='360' fill='%23f3f4f6'/%3E%3Ctext x='320' y='180' font-family='Arial' font-size='16' text-anchor='middle' fill='%236b7280'%3EProject Image%3C/text%3E%3C/svg%3E";
                  }}
                />
              </div>
            </Link>

            {/* RERA Badge */}
            <div className="absolute top-3 left-3 z-[3]">
              <div className="bg-white/95 backdrop-blur-sm rounded-lg px-2 py-1 shadow-md border border-gray-200">
                <span className="text-[10px] font-bold text-red-600 tracking-wide">RERA</span>
              </div>
            </div>

            {/* like button ui */}
            <div className="absolute top-3 right-3 z-[3]">
              <button
                type="button"
                aria-label={
                  isFav
                    ? "Remove from wishlist"
                    : isAuthenticated
                    ? "Add to wishlist"
                    : "Login to add to wishlist"
                }
                title={
                  isFav
                    ? "Remove from wishlist"
                    : isAuthenticated
                    ? "Add to wishlist"
                    : "Login to add to wishlist"
                }
                className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 shadow-md hover:bg-white transition-all duration-200"
                onClick={(e) => handleFavoriteClick(e, id, item)}
              >
                {favCheck(id) ? (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="#ef4444"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                ) : (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#6b7280"
                    strokeWidth="2"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                )}
              </button>
            </div>
            {/* subtle gradient bottom overlay */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/10 to-transparent"></div>
          </div>

          {/* Body */}
          <div
            className={`flex flex-col flex-1 justify-between ${
              compact ? "p-2 gap-2" : "p-2 gap-3"
            } font-['Rubik',sans-serif]`}
          >
            <div>
              {item?.projectName && (
                <HeadingTag
                  className={`${
                    compact ? "text-[16px]" : "text-lg md:text-[19px]"
                  } font-bold tracking-[-0.3px] text-gray-900 mb-2 pt-1 group-hover:text-red-600 transition-colors whitespace-nowrap overflow-hidden text-ellipsis font-['Rubik',sans-serif]`}
                  title={item.projectName}
                >
                  {item.projectName}
                </HeadingTag>
              )}
              
              {/* Price Display - Moved up */}
              <div className="mb-1">
                <span
                  className={`inline-flex items-center gap-1 ${
                    compact ? "text-[16px]" : "text-[18px]"
                  } font-bold text-red-600 whitespace-nowrap font-['Rubik',sans-serif]`}
                >
                  <RupeeIcon className="w-4 h-4" />
                  {item.minPrice && item.maxPrice
                    ? (item.minPrice < 1
                        ? `${(item.minPrice * 100).toFixed(0)} L`
                        : `${item.minPrice} `) +
                      " - " +
                      `${item.maxPrice} Cr`
                    : "Price on Request"}
                </span>
              </div>

              {/* Location */}
              <div className="space-y-1">
                <div
                  className={`${
                    compact ? "text-[13px]" : "text-[14px]"
                  } text-gray-600 line-clamp-2`}
                >
                  <span title={item.projectAddress}>
                    {item.projectAddress || `${item.city}, ${item.state}`}
                  </span>
                </div>
                <p
                  className={`${
                    compact ? "text-[12px]" : "text-[13px]"
                  } text-gray-500 font-medium`}
                >
                  {item.city}, {item.state}
                </p>
              </div>
            </div>

            {/* Action Buttons - All in one row */}
            <div className="flex items-center gap-2">
              {/* Explore Button - Takes most space */}
              <Link
                to={`/${pUrl}/`}
                target="_top"
                className={`flex-1 flex items-center justify-center text-white bg-[#ee1c25] hover:bg-[#d11922] focus:ring-2 focus:ring-[#ee1c25] focus:outline-none font-semibold rounded-lg ${
                  compact ? "text-[12px] px-3 py-2" : "text-[13px] px-4 py-2.5"
                } shadow-lg hover:shadow-xl transition-all duration-200`}
                onClick={() => addViewedProject(item)}
              >
                Explore
              </Link>

              {/* Phone Icon Button */}
              <a
                href={`tel:${(
                  (item.mobileNumber || "").toString()
                ).replace(/\s+/g, "")}`}
                className={`flex items-center justify-center text-gray-700 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-lg ${
                  compact ? "w-8 h-8" : "w-10 h-10"
                } shadow-sm hover:shadow-md transition-all duration-200`}
                title="Call Now"
              >
                <Phone className={compact ? "w-3.5 h-3.5" : "w-4 h-4"} />
              </a>

              {/* WhatsApp Icon Button */}
              <a
                href={`https://wa.me/${(
                  item.whatsappNumber ||
                  item.contactNumber ||
                  "918500900100"
                )
                  .replace(/\s+/g, "")
                  .replace(
                    /^\+/,
                    ""
                  )}?text=Hi, I'm interested in ${encodeURIComponent(
                  item.projectName
                )} project`}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center text-green-700 bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg ${
                  compact ? "w-8 h-8" : "w-10 h-10"
                } shadow-sm hover:shadow-md transition-all duration-200`}
                title="Chat on WhatsApp"
              >
                <i
                  className={`fab fa-whatsapp ${compact ? "text-[14px]" : "text-[16px]"}`}
                ></i>
              </a>
            </div>
          </div>
        </article>
      </span>
    );
  };

  const handleFavoriteClick = (e, id, item) => {
    e.preventDefault();
    e.stopPropagation();

    const snapshot = {
      title: item?.projectName,
      frontImage: item?.frontImage,
      thumbnailImage: item?.thumbnailImage,
      priceText: (() => {
        try {
          const min = item?.minPrice ?? item?.price;
          if (!min) return "Price on request";
          return `₹${min} Cr`;
        } catch {
          return undefined;
        }
      })(),
      url: item.project_url ? `/${item.project_url}/` : undefined,
      city: item?.city,
      maxPrice: item?.maxPrice || item?.price,
      minPrice: item?.minPrice,
    };

    if (!isAuthenticated) {
      // Show login modal
      setShowAuth(true);
      // Show toast notification
      if (typeof window.toast === "function") {
        window.toast.info("Please login to save properties to your favorites");
      }
      return;
    }
    toggleFavorite(id, snapshot, isAuthenticated);
    setFavTick((v) => v + 1);
  };

  return (
    <>
      {data?.length === 0 ? (
        <CustomSkeleton />
      ) : (
        <>
          <div
            data-aos={animation}
            className="py-0 w-full mx-0 font-['Rubik',sans-serif]"
          >
            {!hideHeader && (
              <div className="flex items-center justify-between mx-3 lg:mx-6 xl:mx-14 md:mx-6 py-2">
                {title && (
                  <div className="flex items-center">
                    <h2 className="text-2xl xl:text-4xl lg:text-3xl md:text-2xl text-center sm:text-left text-[#111] font-bold font-['Rubik',sans-serif]">
                      {title}
                    </h2>
                  </div>
                )}
                {path && (
                  <div className="ml-2 hidden sm:block">
                    <Link to={path} target="_top">
                      <span className="flex items-center text-white text-sm px-3 py-0 rounded-full bg-red-600 shadow-lg hover:shadow-xl transition-all duration-300">
                        <EyeIcon />
                        <span className="ml-2">View All</span>
                      </span>
                    </Link>
                  </div>
                )}
              </div>
            )}

            {response && (
              <section className="font-['Rubik',sans-serif]">
                {showGrid ? (
                  <div
                    className={`${
                      compact
                        ? "grid grid-cols-1 w-full px-2 md:px-3 md:grid-cols-2 lg:grid-cols-4 mb-4 gap-3 lg:gap-4"
                        : "grid grid-cols-1 w-full px-4 md:px-4 md:grid-cols-2 lg:grid-cols-4 mb-6 gap-4 lg:gap-6"
                    }`}
                  >
                    {response?.map((item, index) =>
                      renderProjectItem(item, index)
                    )}
                  </div>
                ) : (
                  response?.map((item, index) => renderProjectItem(item, index))
                )}
              </section>
            )}
          </div>
          {/* Auth Modal for Login/Register */}
          <AuthModal
            open={showAuth}
            onClose={() => setShowAuth(false)}
            defaultView="Login"
          />
        </>
      )}
    </>
  );
};

export default CommonProject;
