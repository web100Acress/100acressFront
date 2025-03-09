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
          <div data-aos={animation} className="py-3">
            {" "}
            <div className="flex items-center justify-between mx-6 lg:mx-6 xl:mx-14 md:mx-6 py-2">
              {title && <div className="flex items-center">
                <h2 className="text-2xl xl:text-4xl lg:text-3xl md:text-2xl  text-center sm:text-left">
                  {title}
                </h2>
              </div>}
              {path && <div className="ml-2 hidden sm:block">
                <Link to={path} target="_top">
                  <span className="flex items-center text-white text-sm px-3 py-0 rounded-full bg-red-600">
                    <EyeIcon />
                    <span className="ml-2">View All</span>
                  </span>
                </Link>
              </div>}
            </div>
            { response && 
              <section className="flex flex-col items-center bg-white mt-3">
                <div className="grid max-w-md grid-cols-1 px-8 sm:max-w-lg md:max-w-screen-xl md:grid-cols-2 md:px-4 lg:grid-cols-4 sm:gap-4 lg:gap-4 w-full">
                  {response?.map((item, index) => {
                    const pUrl = item.project_url;
                    return (
                      <span >

                        <article
                          key={index}
                          className="mb-2 overflow-hidden rounded-md  border text-gray-700 shadow-md duration-500 ease-in-out hover:shadow-xl"
                        >
                          <div className="relative flex p-3">
                            <Link to={`/${pUrl}/`} target="_top">

                              <img
                                src={item.frontImage.url}
                                alt="property In Gurugram"
                                className="w-full h-48 object-fit rounded-lg transition-transform duration-500 ease-in-out hover:scale-110"
                                loading="lazy"
                              />
                            </Link>
                            <div className="absolute top-5 right-5"
                              onClick={() => handleShare(item)}
                            >
                              <ShareFrameIcon />
                            </div>
                          </div>
                          <div className="pt-0 p-3">
                            <div className="pb-2">
                              <span className="text-[15px] font-semibold hover:text-red-600  duration-500 ease-in-out">
                                {item.projectName}
                              </span>
                              <br />
                              <span className="text-sm text-gray-400 hover:text-red-600  duration-500 ease-in-out">
                                {item.city}, {item.state}
                              </span>
                            </div>

                            <ul className="box-border flex list-none items-center border-b border-solid border-gray-200 px-0 py-2">
                              <li className="mr-4 flex items-center text-left">
                                <li className="text-left">
                                  <p className="m-0 text-sm font-medium ">
                                    <PropertyIcon />{" "}{item.type}
                                  </p>
                                  <span className="text-[10px] text-gray-600 block truncate text-sm text-gray-400 block truncate hover:overflow-visible hover:white-space-normal hover:bg-white">
                                    <LocationRedIcon />{" "}{item.projectAddress}
                                  </span>

                                </li>
                              </li>
                            </ul>
                            <ul className="m-0 flex list-none items-center justify-between px-0 pb-0">
                              <li className="text-left">
                                <span className="text-sm font-extrabold text-red-600">
                                  <span className="text-xl"><RupeeIcon /></span>
                                  {!item.minPrice || !item.maxPrice ? (
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
                              </li>
                              <Link to={`/${pUrl}/`} target="_top">
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
                        {/* <div className="absolute top-5 right-5"
                                onClick={() => handleShare(item)}
                    >
                      <ShareFrameIcon />
                      </div> */}
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