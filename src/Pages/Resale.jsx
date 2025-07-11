import React, {  useEffect } from "react";
import { Link } from "react-router-dom";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { ArrowIcon, RupeeIcon } from "../Assets/icons";
import "aos/dist/aos.css";
import AOS from "aos";
import CustomSkeleton from "../Utils/CustomSkeleton";
import Api_service from "../Redux/utils/Api_Service";
import { useSelector } from "react-redux";

const Resale = () => {
  
  const {getResaleProperties} = Api_service();

  const resalePropertydata = useSelector(store => store?.resaleproperty?.resale);


  useEffect(()=>{
    if(resalePropertydata.length === 0){
      getResaleProperties();
    }
  },[])

  useEffect(() => {
    AOS.init();
  }, []);
  
  return (
    <section className="bg-white py-3 sm:py-6 lg:py-8">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-12 lg:grid-cols-4 xl:grid-cols-4 xl:gap-16">        
                    {resalePropertydata && resalePropertydata.length > 0 ? (
                      resalePropertydata.slice(0,8).map((property) => (
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
                    ) : <><CustomSkeleton/></>}
        </div>
      </div>
    </section>
  );
};

export default Resale;
