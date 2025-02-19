import React, { useContext, useEffect } from "react";
import { DataContext } from "../MyContext";
import { Link } from "react-router-dom";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { ArrowIcon, RupeeIcon } from "../Assets/icons";
import "aos/dist/aos.css";
import AOS from "aos";
import CustomSkeleton from "../Utils/CustomSkeleton";

const Resale = () => {
  const { resalePropertydata } = useContext(DataContext);

    useEffect(() => {
      AOS.init();
    }, []);
  
  return (
    <section className="bg-white py-3 sm:py-6 lg:py-8">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-12 lg:grid-cols-4 xl:grid-cols-4 xl:gap-16">
          {resalePropertydata && resalePropertydata.length > 0 ? (
            resalePropertydata.slice(0, 7).map((item, index) => {
              if (item.name) {
                return (
                  <React.Fragment key={index}>
                    {item.postProperty && item.postProperty.length > 0 ? (
                      item.postProperty.map((property) => (
                        <Link
                          key={property._id}
                          to={`/buy-properties/${property.propertyName ? property.propertyName.replace(/\s+/g, '-') : 'unknown'}/${property._id}`}
                          target="_top"
                        >
                          <article className="transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-md flex flex-col items-center gap-4 md:flex-row lg:gap-6 rounded-lg overflow-hidden">
                            <span className="group relative block h-56 w-full self-start overflow-hidden rounded-l-lg bg-gray-100 shadow-lg md:h-24 md:w-24 lg:h-32 lg:w-32">
                              {property.frontImage && (
                                <img
                                  src={property.frontImage.url}
                                  loading="lazy"
                                  alt="frontImage"
                                  className="absolute inset-0 h-full w-full object-cover object-center"
                                />
                              )}
                            </span>
                            <div className="flex flex-col justify-center">
                              <p className="text-sm text-black mb-0">
                                <span className="transition hover:text-red-600 duration-500 ease-in-out">
                                  {property.propertyName &&
                                    property.propertyName
                                      .split(" ")
                                      .slice(0, 6)
                                      .join(" ")}
                                </span>
                                <p className="text-black mb-1 text-sm">
                                  {property.address &&
                                    property.address
                                      .split(" ")
                                      .slice(0, 3)
                                      .join(" ")}
                                </p>
                              </p>
                              <p className="text-red-700 font-semibold text-sm flex items-center">
                                <MdOutlineCurrencyRupee className="mr-1" />
                                <span>{property.price}</span>
                              </p>
                            </div>
                          </article>
                        </Link>
                      ))
                    ) : null}
                  </React.Fragment>
                );
              } else {
                // return (
                //   <Link
                //     key={item._id}
                //     to={`/buy-properties/${item.propertyName ? item.propertyName.replace(/\s+/g, '-') : 'unknown'}/${item._id}`}
                //     target="_top"
                //   >
                //     <article className="transition hover:scale-105 hover:shadow-md flex flex-col items-center gap-4 md:flex-row lg:gap-6 border border-gray-300 rounded-lg">
                //       <span className="group relative block h-56 w-full shrink-0 self-start overflow-hidden rounded-l-lg bg-gray-100 shadow-lg md:h-24 md:w-24 lg:h-32 lg:w-32">
                //         {item.frontImage && (
                //           <img
                //             src={item.frontImage.url}
                //             loading="lazy"
                //             alt="frontImage"
                //             className="absolute inset-0 h-60 w-full object-cover object-center"
                //           />
                //         )}
                //       </span>
                //       <div className="flex flex-col gap-2">
                //         <h2 className="text-xl font-bold text-gray-800">
                //           <span className="transition hover:text-red-600 duration-500 ease-in-out">
                //             {item.propertyName}
                //           </span>
                //         </h2>
                //         <p className="text-gray-500 hover:text-red-600 duration-500 ease-in-out">
                //           {item.address}
                //         </p>
                //         <p className="text-gray-500">{item.price}</p>
                //       </div>
                //     </article>
                //   </Link>
                // );
        
                return (
                  <React.Fragment key={index}>
                    {item.postProperty && item.postProperty.length > 0 ? (
                      item.postProperty.slice(5,12).map((property) => (
                        <Link
                          key={property._id}
                          to={`/buy-properties/${property.propertyName ? property.propertyName.replace(/\s+/g, '-') : 'unknown'}/${property._id}`}
                          target="_top"
                        >
                          <article data-aos="zoom-in" data-aos-delay="200" className="mb-2 transition overflow-hidden rounded-md border text-gray-700 shadow-md duration-500 ease-in-out hover:shadow-xl">
                            <div className="p-3 relative overflow-hidden">
                              {property.frontImage && (
                                <img
                                  src={property.frontImage.url}
                                  loading="lazy"
                                  alt="frontImage"
                                  className="w-full h-40 object-cover object-center rounded-lg transition-transform duration-500 ease-in-out hover:scale-110"
                                />
                              )}
                            </div>
                            <div className="pt-0 p-3">
                          <span className="text-[15px] font-semibold block truncate hover:overflow-visible text-black-600 hover:text-red-600 duration-500 ease-in-out">
                          {property.propertyName &&
                                    property.propertyName
                                      .split(" ")
                                      .slice(0, 6)
                                      .join(" ")}
                          </span>

                          <ul className="m-0 p-0 flex text-white-600 justify-between px-0 pb-0">
                            <li className="text-left flex items-end gap-2">
                              
                             
                              <div className="text-sm font-thin truncate w-64 md:w-64 lg:w-32 xl:w-48">
                                <span className="text-xs text-white-600 hover:text-red-600 duration-500 ease-in-out block truncate">
                                {property.address &&
                                    property.address
                                      .split(" ")
                                      .slice(0, 3)
                                      .join(" ")}
                                </span>
                                <span className="text-lg text-[#C13B44] block truncate hover:overflow-visible hover:white-space-normal hover:bg-white">
                                <RupeeIcon/>{property.price}
                                </span>
                              </div>
                            </li>

                            <li className=" text-left flex item-center">
                              <button
                                type="button"
                                className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-2 py-1 text-center me-2"
                              >
                                <ArrowIcon />
                              </button>
                            </li>
                          </ul>
                        </div>
                          </article>
                        </Link>
                      ))
                    ) : null}
                  </React.Fragment>
                );
             
              }
            })
          ) : (
            <><CustomSkeleton/></>
          )}
        </div>
      </div>
    </section>
  );
};

export default Resale;
