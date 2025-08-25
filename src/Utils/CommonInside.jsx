import React, { useEffect } from "react";
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

const CommonInside = ({
  title,
  Actualdata,
  HelmetTitle,
  metaContent,
  linkhref,
  details,
}) => {
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

  useEffect(() => {
    if (Array.isArray(Actualdata) && Actualdata.length > 0) {
      import('aos').then((Aos) => {
        Aos.init();
      });
    }
  }, [Actualdata]);

  // Filter out invalid items and ensure we have valid data
  const validData = Array.isArray(Actualdata)
    ? Actualdata.filter(item => {
        return item && (
          (item.projectName || item.postProperty?.propertyName) && // Must have a name
          (item.project_url || item.postProperty?._id) && // Must have a URL or ID
          (item.frontImage?.cdn_url || item.frontImage?.url || item?.postProperty?.frontImage?.url) // Must have an image
        );
      })
    : [];

  // If no valid data, show a message
  if (validData.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold text-gray-600">No properties found</h2>
        <p className="text-gray-500 mt-2">Try modifying your search criteria</p>
      </div>
    );
  }

  return (
    <div>
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

        <div className="grid max-w-md grid-cols-1 px-4 sm:max-w-lg md:max-w-screen-xl md:grid-cols-2 md:px-4 lg:grid-cols-4 sm:gap-4 lg:gap-4 w-full mb-4 gap-3 md:gap-4">
          {validData.map((item, index) => {
            const pUrl = item.project_url;
            const propertyName = item.projectName || item.postProperty?.propertyName;
            const location = (item.city && item.state)
              ? `${item.city}, ${item.state}`
              : (item?.postProperty?.city && item?.postProperty?.state)
                ? `${item.postProperty.city}, ${item.postProperty.state}`
                : "Gurgaon, Haryana";
            const imageUrl = item.frontImage?.cdn_url || item.frontImage?.url || item?.postProperty?.frontImage?.url || "https://d16gdc5rm7f21b.cloudfront.net/100acre/no-image.jpg";
            
            // Build propertyUrl based on sourceType
            let propertyUrl = "";
            if (item.sourceType === "search") {
              propertyUrl = `/${pUrl}/`;
            } else if (item.sourceType === "rent") {
              propertyUrl = `/rental-properties/${item?.postProperty?.propertyName}/${item?.postProperty?._id}`;
            } else if (item.sourceType === "buy") {
              propertyUrl = `/buy-properties/${item?.postProperty?.propertyName}/${item?.postProperty?._id}`;
            } else {
              propertyUrl = `/${pUrl}/`;
            }

            return (
              <article
                key={index}
                className="overflow-hidden rounded-lg border text-black shadow-lg duration-500 ease-in-out hover:shadow-xl bg-[#FFF8F0] mb-3 md:mb-0 transition-all duration-300"
              >
                <div className="relative w-full">
                  <Link to={propertyUrl} target="_top" className="block">
                    <img
                      src={imageUrl}
                      alt={propertyName || "Property In Gurugram"}
                      className="w-full h-[200px] md:h-48 object-cover transition-transform duration-500 ease-in-out hover:scale-105"
                      loading="lazy"
                    />  
                  </Link>
                  <div
                    className="absolute top-3 right-3 md:top-5 md:right-5 cursor-pointer"
                    onClick={() => handleShare(item)}
                  >
                    <ShareFrameIcon />
                  </div>
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

                <div className="pt-0 p-3">
                  <div className="pb-2">
                    <span className="text-[15px] font-semibold hover:text-red-600 duration-500 ease-in-out">
                      {propertyName && propertyName.length > 28
                        ? `${propertyName.slice(0, 28)}...`
                        : propertyName || ""}
                    </span>
                    <br />
                    <span className="text-sm text-black hover:text-red-600 duration-500 ease-in-out">
                      {location}
                    </span>
                  </div>

                  <ul className="box-border flex list-none items-center border-b border-solid border-gray-200 px-0 py-2">
                    <li className="mr-4 flex items-center text-left">
                      <li className="text-left">
                        <div className="flex items-center gap-1 m-0 text-sm font-medium">
                          <PropertyIcon />
                          <span>
                            {item.type || item.postProperty?.propertyType || item.postProperty?.type}
                          </span>
                        </div>
                        <span className="text-[10px] text-black block truncate text-sm hover:overflow-visible hover:white-space-normal hover:bg-white">
                          <LocationRedIcon />{" "}
                          {item.projectAddress || item?.postProperty?.address}
                        </span>
                      </li>
                    </li>
                  </ul>

                  <ul className="m-0 flex list-none items-center justify-between px-0 pb-0">
                    <li className="text-left">
                      <div className="flex items-center gap-1 text-sm font-extrabold text-red-600">
                        <span className="text-xl">
                          <RupeeIcon />
                        </span>
                        <span>
                          {!item.minPrice && !item.maxPrice ? (
                            item.price ? (
                              item.price
                            ) : (
                              item.postProperty?.price || "Reveal Soon"
                            )
                          ) : !item.minPrice || !item.maxPrice ? (
                            "Reveal Soon"
                          ) : (
                            <>
                              {item.minPrice < 1 ? (
                                <>{(item.minPrice * 100).toFixed()} L</>
                              ) : (
                                <>{item.minPrice}</>
                              )}
                              {" - "}
                              {item.maxPrice} Cr
                            </>
                          )}
                        </span>
                      </div>
                    </li>
                    <Link to={propertyUrl} target="_top">
                      <li className="text-left">
                        <button
                          type="button"
                          className="text-white bg-gradient-to-r from-[#C13B44] via-red-500 to-[#C13B44] hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-xs px-4 py-1.5 text-center me-2"
                        >
                          View Details
                        </button>
                      </li>
                    </Link>
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </section>  
    </div>
  );
};

export default CommonInside;