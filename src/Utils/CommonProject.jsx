import React, { useEffect } from 'react'
import { LocationRedIcon, PropertyIcon, RupeeIcon, ShareFrameIcon } from '../Assets/icons';
import Aos from 'aos';
import { Link } from 'react-router-dom';
import { EyeIcon } from 'lucide-react';
import CustomSkeleton from './CustomSkeleton';

const CommonProject = ({ data, title, path ,animation }) => {

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

  useEffect(() => {
    Aos.init();
  }, []);

  const response = data;

  return (
    <>
      {data?.length === 0 ? <CustomSkeleton /> : (
        <>
          <div data-aos={animation} className="py-0 max-w-[1250px] mx-auto">
            {" "}
            <div className="flex items-center justify-between mx-3 lg:mx-6 xl:mx-14 md:mx-6 py-2">
              {title && <div className="flex items-center">
                <h2 className="text-2xl xl:text-4xl lg:text-3xl md:text-2xl text-center sm:text-left text-[#111] font-bold">
                  {title}
                </h2>
              </div>}
              {path && <div className="ml-2 hidden sm:block">
                <Link to={path} target="_top">
                  <span className="flex items-center text-white text-sm px-3 py-0 rounded-full bg-red-600 shadow-lg hover:shadow-xl transition-all duration-300">
                    <EyeIcon />
                    <span className="ml-2">View All</span>
                  </span>
                </Link>
              </div>}
            </div>


            { response && 
              <section className="flex flex-col items-center bg-white mt-3">
                <div className="grid max-w-md grid-cols-1 px-4 sm:max-w-lg md:max-w-screen-xl md:grid-cols-2 md:px-4 lg:grid-cols-4 w-full mb-6 gap-4 lg:gap-6">
                  {response?.map((item, index) => {
                    const pUrl = item.project_url;
                    return (
                      <span key={index} className="mb-2 md:mb-0">
                        <article
                          key={index}
                          className="group overflow-hidden rounded-2xl border border-gray-100 text-black shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.10)] transition-all duration-300 ease-out h-full flex flex-col bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60"
                        >
                          {/* Image */}
                          <div className="relative">
                            <Link to={`/${pUrl}/`} target="_top" className="block">
                              <div className="overflow-hidden rounded-t-2xl">
                                <img
                                  src={`https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/${item?.thumbnailImage?.public_id}`}
                                  alt="Property"
                                  className="w-full aspect-[16/9] object-cover transform-gpu transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                                  loading="lazy"
                                  onError={(e) => {
                                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='640' height='360' viewBox='0 0 640 360'%3E%3Crect width='640' height='360' fill='%23f3f4f6'/%3E%3Ctext x='320' y='180' font-family='Arial' font-size='16' text-anchor='middle' fill='%236b7280'%3EProject Image%3C/text%3E%3C/svg%3E";
                                  }}
                                />
                              </div>
                            </Link>
                            <button
                              type="button"
                              aria-label="Share"
                              className="absolute top-3 right-3 md:top-4 md:right-4 inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/90 text-gray-700 shadow-md hover:shadow-lg hover:bg-white transition"
                              onClick={() => handleShare(item)}
                            >
                              <ShareFrameIcon />
                            </button>
                            {/* subtle gradient bottom overlay */}
                            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/10 to-transparent"></div>
                          </div>

                          {/* Body */}
                          <div className="flex flex-col flex-1 justify-between p-4 gap-2">
                            <div>
                              {item?.projectName && (
                                <h3 className="text-base md:text-[17px] font-semibold tracking-[-0.2px] text-gray-900 mb-1 group-hover:text-red-600 transition-colors truncate whitespace-nowrap">
                                  {item.projectName}
                                </h3>
                              )}
                              {/* City, State directly under title */}
                              <p className="text-sm text-gray-700">{item.city}, {item.state}</p>
                              {/* Type row, then address row */}
                              <div className="mt-1">
                                <div className="inline-flex items-center gap-2 text-[13px] text-gray-800 font-semibold">
                                  <PropertyIcon /> {item.type}
                                </div>
                                <div className="mt-1 inline-flex items-center gap-2 text-[13px] text-gray-600 truncate max-w-full">
                                  <LocationRedIcon style={{ width: 16, height: 16 }} />
                                  <span title={item.projectAddress} className="truncate">{(item.projectAddress || '').slice(0, 48)}{(item.projectAddress || '').length > 48 ? '…' : ''}</span>
                                </div>
                              </div>
                            </div>

                            {/* Footer row: price + CTA */}
                            <div className="flex items-center justify-between pt-1 gap-3">
                              <span className="inline-flex items-center gap-1 text-[15px] font-bold text-red-600 whitespace-nowrap flex-1">
                                <RupeeIcon />
                                {item.minPrice && item.maxPrice
                                  ? (
                                      item.minPrice < 1
                                        ? `${(item.minPrice * 100).toFixed(2)} L`
                                        : `${item.minPrice} Cr`
                                    ) + " - " + `${item.maxPrice} Cr`
                                  : "Reveal Soon"}
                              </span>
                              <Link
                                to={`/${pUrl}/`}
                                target="_top"
                                className="inline-flex items-center justify-center text-white bg-red-600 hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:outline-none font-medium rounded-full text-[12px] px-4 py-2 whitespace-nowrap shadow-md hover:shadow-lg transition shrink-0"
                              >
                                Explore
                              </Link>
                            </div>
                          </div>
                        </article>
                      </span>
                    );
                  })}
                </div>
              </section>
            }
          </div>
        </>
      )
      }
    </>)
}

export default CommonProject