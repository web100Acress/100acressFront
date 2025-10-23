import React, { useEffect, useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import {
  LocationRedIcon,
  PropertyIcon,
  RentIcon,
  ResaleIcon,
  RupeeIcon,
  ShareFrameIcon,
} from "../Assets/icons";
import Footer from "../Components/Actual_Components/Footer";
import { FavouriteIcon } from "../Assets/icons";
import AuthModal from "../Components/AuthModal";
import { AuthContext } from "../AuthContext";
import {
  isFavorite as favCheck,
  toggleFavorite,
  subscribe,
  hydrateFavoritesFromServer,
} from "../Utils/favorites";

const CommonInside = ({
  title,
  Actualdata,
  HelmetTitle,
  metaContent,
  linkhref,
  details,
  suppressEmptyMessage,
}) => {
  // Format price elegantly in Cr or L
  const formatPriceRange = (min, max, fallback) => {
    if (!min && !max) return fallback || "Reveal Soon";
    if (!min || !max) return "Reveal Soon";
    const fmt = (v) => {
      if (typeof v !== "number") return v;
      if (v < 1) {
        return `${(v * 100).toFixed(0)} L`;
      }
      // up to 2 decimals but trim trailing zeros
      const str = v
        .toFixed(2)
        .replace(/\.00$/, "")
        .replace(/(\.\d)0$/, "$1");
      return `${str} Cr`;
    };
    const openWhatsApp = (name, url) => {
      const message = `Hi, I'm interested in ${name}. Please share more details. ${url}`;
      const waUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
      window.open(waUrl, "_blank");
    };
    return `₹ ${fmt(min)}–${fmt(max)}`;
  };
  const handleShare = (project) => {
    if (!project?.projectName || !project?.project_url) return;
    if (navigator.share) {
      navigator
        .share({
          title: project.projectName,
          text: `Check out this project: ${project.projectName}`,
          url: `${window.location.origin}/${project.project_url}`,
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.log("Error sharing:", error));
    } else {
      alert("Share functionality is not supported on this device/browser.");
    }
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

  const { isAuthenticated } = useContext(AuthContext);
  const [showAuth, setShowAuth] = useState(false);
  const [favTick, setFavTick] = useState(0);

  useEffect(() => {
    if (Array.isArray(Actualdata) && Actualdata.length > 0) {
      import("aos").then((Aos) => {
        Aos.init();
      });
    }
  }, [Actualdata]);

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

  // Filter out invalid items and ensure we have valid data
  const validData = Array.isArray(Actualdata)
    ? Actualdata.filter((item) => {
        return (
          item &&
          (item.propertyName || item.projectName || item.postProperty?.propertyName) && // Must have a name
          (item.project_url || item._id || item.postProperty?._id) && // Must have a URL or ID
          (item.frontImage?.cdn_url ||
            item.frontImage?.url ||
            item?.postProperty?.frontImage?.url) // Must have an image
        );
      })
    : [];

  // If no valid data, show a message
  if (validData.length === 0) {
    if (suppressEmptyMessage) return null;
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold text-gray-600">
          No properties found
        </h2>
        <p className="text-gray-500 mt-2">Try modifying your search criteria</p>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'Rubik', sans-serif" }}>
      <Helmet>
        {HelmetTitle && <title>{HelmetTitle}</title>}
        {metaContent && <meta name="description" content={`${metaContent}`} />}
        {linkhref && <link rel="canonical" href={`${linkhref}`} />}
      </Helmet>
      <section className="flex pt-2 flex-col items-center mt-2">
        {title && (
          <h1 className="mb-3 text-center text-2xl sm:text-xl md:text-2xl lg:text-3xl text-red-600 font-bold">
            {title}
          </h1>
        )}
        {details && (
          <h2 className="text-sm text-center sm:text-xl md:text-xl lg:text-sm font-normal lg:mx-20 md:mx-10 mx-5 sm:mx-4">
            {details}
          </h2>
        )}

        <div className="grid max-w-md grid-cols-1 px-3 sm:max-w-lg md:max-w-screen-xl md:grid-cols-2 md:px-4 lg:grid-cols-4 sm:gap-4 lg:gap-4 w-full mb-4">
          {validData.map((item, index) => {
            const pUrl = item.project_url;
            const propertyName =
              item.propertyName || item.projectName || item.postProperty?.propertyName;
            const location =
              item.city && item.state
                ? `${item.city}, ${item.state}`
                : item?.postProperty?.city && item?.postProperty?.state
                ? `${item.postProperty.city}, ${item.postProperty.state}`
                : "Gurgaon, Haryana";
            const imageUrl =
              item.frontImage?.cdn_url ||
              item.frontImage?.url ||
              item?.postProperty?.frontImage?.url ||
              "https://d16gdc5rm7f21b.cloudfront.net/100acre/no-image.jpg";
            const id = item?._id || item?.id || item?.slug || pUrl;
            const isFav = favCheck(id);

            // Build propertyUrl based on sourceType
            let propertyUrl = "";
            if (item.sourceType === "search") {
              propertyUrl = `/${pUrl}/`;
            } else if (item.sourceType === "rent") {
              const rentPropertyName = item.propertyName || item?.postProperty?.propertyName;
              const rentId = item._id || item?.postProperty?._id;
              propertyUrl = `/rental-properties/${rentPropertyName}/${rentId}`;
            } else if (item.sourceType === "buy") {
              const buyPropertyName = item.propertyName || item?.postProperty?.propertyName;
              const buyId = item._id || item?.postProperty?._id;
              propertyUrl = `/buy-properties/${buyPropertyName}/${buyId}`;
            } else {
              propertyUrl = `/${pUrl}/`;
            }

            return (
              <article
                key={index}
                className="group overflow-hidden rounded-2xl bg-white border border-gray-100 text-gray-900 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 mb-3 md:mb-0"
              >
                <div className="relative w-full">
                  <Link to={propertyUrl} target="_top" className="block">
                    <img
                      src={imageUrl}
                      alt={propertyName || "Property In Gurugram"}
                      className="w-full h-[170px] md:h-44 object-cover transition-transform duration-500 ease-in-out group-hover:scale-[1.03] rounded-t-2xl"
                      loading="lazy"
                    />
                    {/* Subtle overlay for readability */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                  </Link>
                  {/* Floating action buttons */}
                  <div className="absolute top-1 right-1 flex gap-1">
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
                      className={`inline-flex items-center justify-center w-1 h-1 rounded-full ${
                        isFav ? "" : "bg-transparent"
                      }border-white transition`}
                      onClick={(e) => handleFavoriteClick(e, id, item)}
                    >
                      {favCheck(id) ? (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="red"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                      ) : (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#d1d5db"
                          strokeWidth="2"
                          xmlns="http://www.w3.org/2000/svg"
                          className="opacity-100"
                        >
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                      )}
                    </button>
                    {/* <button
                      type="button"
                      className="w-9 h-9 rounded-full bg-white/90 shadow-md flex items-center justify-center hover:shadow-lg"
                      onClick={() => handleShare(item)}
                      aria-label="Share"
                    >
                      <ShareFrameIcon />
                    </button> */}
                  </div>
                  {/* Type badge */}
                  {(item.type || item?.postProperty?.propertyType) && (
                    <span className="absolute top-3 left-3 bg-black/70 text-white text-xs font-semibold px-2 py-1 rounded-full">
                      {item.type || item?.postProperty?.propertyType}
                    </span>
                  )}
                  {item.sourceType === "rent" && (
                    <div className="absolute left-0 -top-2 right-0">
                      <RentIcon />
                    </div>
                  )}

                  {item.sourceType === "buy" && (
                    <div className="absolute left-0 -top-2 right-0">
                      <ResaleIcon />
                    </div>
                  )}
                </div>

                <div className="p-3">
                  {/* Title */}
                  <h3 className="text-[15px] md:text-[16px] font-semibold leading-snug mb-1 hover:text-red-600 transition-colors whitespace-nowrap overflow-hidden text-ellipsis">
                    {propertyName || ""}
                  </h3>
                  {/* Location (two-line style: Address, then City, State) */}
                  <div className="mb-2 text-[12px] md:text-[13px] text-gray-600 leading-snug">
                    {(item.projectAddress || item?.postProperty?.address) && (
                      <div className="truncate">
                        {item.projectAddress || item?.postProperty?.address}
                      </div>
                    )}
                    <div className="truncate">{location}</div>
                  </div>
                  {/* Price + CTA */}
                  <div className="pt-2 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-red-600 font-extrabold text-[15px] md:text-[17px] mb-2">
                      <span>
                        {formatPriceRange(
                          item.minPrice,
                          item.maxPrice,
                          item.price || item.postProperty?.price
                        )}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link to={propertyUrl} target="_top" className="flex-1">
                        <button
                          type="button"
                          className="w-full bg-gradient-to-r from-red-500 to-red-500 hover:from-red-600 hover:to-red-600 text-white px-3.5 py-1.5 rounded-full text-[11px] md:text-xs font-bold shadow-md hover:shadow-lg transition-all"
                        >
                          Explore
                        </button>
                      </Link>
                      <button
                        type="button"
                        onClick={() =>
                          openWhatsApp(
                            propertyName || "Property",
                            `${window.location.origin}${propertyUrl}`
                          )
                        }
                        className="flex-1 bg-gradient-to-r from-red-500 to-red-500 hover:from-red-600 hover:to-red-600 text-white px-3.5 py-1.5 rounded-full text-[11px] md:text-xs font-bold shadow-md hover:shadow-lg transition-all"
                      >
                        WhatsApp
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
      {/* Auth Modal for Login/Register */}
      <AuthModal
        open={showAuth}
        onClose={() => setShowAuth(false)}
        defaultView="Login"
      />
    </div>
  );
};

export default CommonInside;
