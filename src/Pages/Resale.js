import React, { useContext } from "react";
import { DataContext } from "../MyContext";
import { Link } from "react-router-dom";
import { MdOutlineCurrencyRupee } from "react-icons/md";

const Resale = () => {
  const { resalePropertydata } = useContext(DataContext);
  return (
    <section className="bg-white py-3 sm:py-6 lg:py-8">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-12 lg:grid-cols-3 xl:grid-cols-3 xl:gap-16">
          {resalePropertydata && resalePropertydata.length > 0 ? (
            resalePropertydata.slice(0, 10).map((item, index) => {
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
                      item.postProperty.slice(3, 6).map((property) => (
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
             
              }
            })
          ) : (
            <>Loading...</>
          )}
        </div>
      </div>
    </section>
  );
};

export default Resale;
