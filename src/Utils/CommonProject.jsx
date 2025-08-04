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
                <h2 className="text-2xl xl:text-4xl lg:text-3xl md:text-2xl text-center sm:text-left bg-gradient-to-r from-[#FF9933] via-[#1a1a1a] to-[#138808] bg-clip-text text-transparent font-bold">
                  {title}
                </h2>
              </div>}
              {path && <div className="ml-2 hidden sm:block">
                <Link to={path} target="_top">
                  <span className="flex items-center text-white text-sm px-3 py-0 rounded-full bg-gradient-to-r from-[#FF9933] to-[#138808] shadow-lg hover:shadow-xl transition-all duration-300">
                    <EyeIcon />
                    <span className="ml-2">View All</span>
                  </span>
                </Link>
              </div>}
            </div>


            { response && 
              <section className="flex flex-col items-center bg-white mt-3 ">
                <div className="grid max-w-md grid-cols-1 px-4 sm:max-w-lg md:max-w-screen-xl md:grid-cols-2 md:px-4 lg:grid-cols-4 sm:gap-4 lg:gap-4 w-full mb-4 gap-3 md:gap-4">
                  {response?.map((item, index) => {
                    const pUrl = item.project_url;
                    return (
                      <span key={index} className="mb-3 md:mb-0">

                        <article
                          key={index}
                          className="overflow-hidden rounded-lg border text-black shadow-lg duration-500 ease-in-out hover:shadow-xl h-full flex flex-col hover:border-[#FF9933] hover:shadow-[#FF9933]/20 bg-[#FFF8F0] transition-all duration-300"
                        >
                          <div className="relative flex p-0">
                            <Link to={`/${pUrl}/`} target="_top" className="w-full">
                              <img
                                src={`https://d16gdc5rm7f21b.cloudfront.net/${item?.thumbnailImage?.public_id}`}
                                alt="property In Gurugram"
                                className="w-full h-[200px] md:h-48 object-cover transition-transform duration-500 ease-in-out hover:scale-110"
                                loading="lazy"
                                onError={(e) => {
                                  e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200' viewBox='0 0 400 200'%3E%3Crect width='400' height='200' fill='%23f3f4f6'/%3E%3Ctext x='200' y='100' font-family='Arial' font-size='14' text-anchor='middle' fill='%236b7280'%3EProject Image%3C/text%3E%3C/svg%3E";
                                }}
                              />
                            </Link>
                            <div className="absolute top-3 right-3 md:top-5 md:right-5" onClick={() => handleShare(item)}>
                              <ShareFrameIcon />
                            </div>
                          </div>
                          <div className="flex flex-col flex-1 justify-between p-3 h-full">
                            <div className="pb-2">
                              {item && item.projectName && (
                                <>
                                  <span className="text-[15px] font-semibold hover:text-[#FF9933] duration-500 ease-in-out">
                                    {item.projectName}
                                  </span>
                                  <br />
                                </>
                              )}
                              <span className="text-sm text-black hover:text-[#FF9933] duration-500 ease-in-out">
                                {item.city}, {item.state}
                              </span>
                            </div>
                            <ul className="box-border flex list-none items-center border-b border-solid border-gray-200 px-0 py-1">
                              <li className="mr-4 flex flex-col text-left">
                                <div className="text-left">
                                  <p className="m-0 text-sm font-medium flex items-center gap-1">
                                    <PropertyIcon /> {item.type}
                                  </p>
                                  <span className="text-[10px] text-sm text-black flex items-center truncate hover:overflow-visible hover:whitespace-normal hover:bg-white">
                                    <span className="inline-block w-4 h-4 align-middle mr-1">
                                      <LocationRedIcon style={{ width: '16px', height: '16px' }} />
                                    </span>
                                    {item.projectAddress.slice(0, 32)}...
                                  </span>
                                </div>
                              </li>
                            </ul>
                            {/* Button row: price and button always in the same row */}
                            <div className="flex flex-row items-center justify-between mt-0 w-full">
                              <span className="m-0 flex list-none items-center justify-between px-0 pb-0" style={{color: '#FF9933', fontWeight: 'bold'}}>
                                <RupeeIcon style={{marginRight: 4}} />
                                {item.minPrice && item.maxPrice
                                  ? (
                                    item.minPrice < 1
                                      ? `${(item.minPrice * 100).toFixed(2)} L`
                                      : `${item.minPrice} Cr`
                                    ) + " - " + `${item.maxPrice} Cr`
                                  : "Reveal Soon"}
                              </span>
                              <Link to={`/${pUrl}/`} target="_top" className="text-white bg-gradient-to-r from-[#FF9933] to-[#138808] hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-[#FF9933] dark:focus:ring-[#138808] font-medium rounded-md text-[12px] px-3 py-2 text-center me-2 whitespace-nowrap ml-2 shadow-lg hover:shadow-xl transition-all duration-300">
                                Explore
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