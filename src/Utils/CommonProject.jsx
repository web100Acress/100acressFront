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
              <section className="flex flex-col items-center bg-white mt-3 ">
                <div className="grid max-w-md grid-cols-1 px-8 sm:max-w-lg md:max-w-screen-xl md:grid-cols-2 md:px-4 lg:grid-cols-4 sm:gap-4 lg:gap-4 w-full">
                  {response?.map((item, index) => {
                    const pUrl = item.project_url;
                    return (
                      <span key={index}>

                        <article
                          key={index}
                          className="mb-2 overflow-hidden rounded-md border text-gray-700 shadow-md duration-500 ease-in-out hover:shadow-xl h-full flex flex-col"
                        >
                          <div className="relative flex p-3">
                            <Link to={`/${pUrl}/`} target="_top">
                              <img
                                src={`https://d16gdc5rm7f21b.cloudfront.net/${item?.thumbnailImage?.public_id}`}
                                alt="property In Gurugram"
                                className="w-full h-48 object-fit rounded-lg transition-transform duration-500 ease-in-out hover:scale-110"
                                loading="lazy"
                              />
                            </Link>
                            <div className="absolute top-5 right-5" onClick={() => handleShare(item)}>
                              <ShareFrameIcon />
                            </div>
                          </div>
                          <div className="flex flex-col flex-1 justify-between p-4 h-full">
                            <div className="pb-2">
                              {item && item.projectName && (
                                <>
                                  <span className="text-[15px] font-semibold hover:text-red-600 duration-500 ease-in-out">
                                    {item.projectName}
                                  </span>
                                  <br />
                                </>
                              )}
                              <span className="text-sm text-gray-400 hover:text-red-600 duration-500 ease-in-out">
                                {item.city}, {item.state}
                              </span>
                            </div>
                            <ul className="box-border flex list-none items-center border-b border-solid border-gray-200 px-0 py-2">
                              <li className="mr-4 flex flex-col text-left">
                                <li className="text-left">
                                  <p className="m-0 text-sm font-medium flex items-center gap-1">
                                    <PropertyIcon /> {item.type}
                                  </p>
                                  <span className="text-[10px] text-sm text-gray-400 flex items-center truncate hover:overflow-visible hover:whitespace-normal hover:bg-white">
                                    <span className="inline-block w-4 h-4 align-middle mr-1">
                                      <LocationRedIcon style={{ width: '16px', height: '16px' }} />
                                    </span>
                                    {item.projectAddress.slice(0, 32)}...
                                  </span>
                                </li>
                              </li>
                            </ul>
                            {/* Button row: price and button always in the same row */}
                            <div className="flex flex-row items-center justify-between mt-1 w-full gap-2">
                              <span className="text-sm font-extrabold text-red-600 flex items-center" style={{color: 'red', fontWeight: 'bold'}}>
                                <RupeeIcon style={{marginRight: 4}} />
                                {item.minPrice && item.maxPrice
                                  ? (
                                    item.minPrice < 1
                                      ? `${(item.minPrice * 100).toFixed(2)} L`
                                      : `${item.minPrice} Cr`
                                    ) + " - " + `${item.maxPrice} Cr`
                                  : "Reveal Soon"}
                              </span>
                              <Link to={`/${pUrl}/`} target="_top">
                                <button
                                  type="button"
                                  className="text-white bg-gradient-to-r from-[#C13B44] via-red-500 to-[#C13B44] hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-md text-[12px] px-3 py-2 text-center me-2 whitespace-nowrap ml-2"
                                >
                                  View Details
                                </button>
                              </Link>
                            </div>
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