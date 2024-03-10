import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Nav from "../aadharhomes/Nav";
import Footer from "../Components/Actual_Components/Footer";
import { Link } from "react-router-dom";
const SearchData = () => {
  const location = useLocation();
  const encodedFormData = location.pathname.split("/searchdata/")[1];
  const decodedFormData = JSON.parse(decodeURIComponent(encodedFormData));

  function getFormDataValues({ query, location }) {
    return {
      key1: query,
      key2: location,
    };
  }

  const { key1, key2 } = getFormDataValues(decodedFormData);
  const key = `${key1}${key2}`;
  localStorage.setItem('myKey', key);
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://api.100acress.com/property/search/${key}`
        );
        setSearchData(res.data.searchdata);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
  
  }, [searchData]);

  return (
    <div style={{ overflowX: "hidden" }}>
      <Nav />
      <section className="flex flex-col bg-white px-10 py-10">
        <div className="grid max-w-md items-center grid-cols-1 p-4  sm:max-w-lg  md:max-w-screen-xl md:grid-cols-2 md:px-10 lg:grid-cols-4 sm:gap-2 lg:gap-4">
          {searchData && searchData.length > 0 ? (
            <>
              {searchData.map((item, index) => (
                <div key={index}>
                  {item.postProperty && item.postProperty.length > 0 ? (
                    <>
                      {item.postProperty.map((property, propIndex) => (
                        <>
                          <article
                            className="mb-4 overflow-hidden rounded-xl border text-gray-700 shadow-md duration-500 ease-in-out hover:shadow-xl"
                            key={propIndex}
                          >
                            <div>
                              {property.frontImage &&
                              property.frontImage.url ? (
                                <img
                                  src={property.frontImage.url}
                                  alt="frontImage"
                                  className="w-full h-48 object-fit"
                                />
                              ) : (
                                <span>Image not available</span>
                              )}
                            </div>

                            {/* <div className="p-4">
                              <div className="pb-2">
                                <a className="text-lg font-semibold hover:text-red-600 duration-500 ease-in-out">
                                  <span> {property.propertyName}</span>
                                </a>
                                <br />
                                <a className="text-sm hover:text-red-600 duration-500 ease-in-out">
                                  {property.city}, {property.state}
                                </a>
                              </div>
                              <ul className="m-0 flex list-none items-center justify-between px-0 pt-6 pb-0">
                                <li className="text-left">
                                  <span className="text-sm font-extrabold text-black">
                                    {property.propertyType}
                                  </span>
                                </li>

                                {item.schema_type == "rent" ? (
                                  <li className="text-left">
                                    <Link to={`/rent/${item._id}`} target="_top">
                                      <button
                                        type="button"
                                        className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-2 py-2 text-center me-2"
                                      >
                                        View Details
                                      </button>
                                    </Link>
                                  </li>
                                ) : (
                                  <li className="text-left">
                                    <Link to={`/buy${item._id}`} target="_top">
                                      <button
                                        type="button"
                                        className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-2 py-2 text-center me-2"
                                      >
                                        View Details
                                      </button>
                                    </Link>
                                  </li>
                                )}
                              </ul>
                            </div> */}
                            
                             <div className="p-4">
                        <div className="pb-2">
                          <a className="text-[15px] font-semibold hover:text-red-600  duration-500 ease-in-out">
                          {item.projectName
                                ? item.projectName
                                : item.propertyName}
                          </a>
                          <span style={{ float: "right" }} className="text-sm">
                            {item.builderName}
                          </span>
                          <br />
                          <a className="text-sm hover:text-red-600  duration-500 ease-in-out">
                            {item.projectAddress}
                          </a>
                        </div>
                        <ul className="m-0 flex list-none items-center justify-between px-0 pt-6 pb-0">
                          <li className="text-left">
                            <span className="text-sm font-extrabold text-black">
                              {item.city}
                            </span>
                          </li>

                          <li className="text-left">
                            <button
                              type="button"
                              className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-2 py-2  text-center me-2"
                            >
                              View Details
                            </button>
                          </li>
                        </ul>
                      </div>
                          </article>
                        </>
                      ))}
                    </>
                  ) : (
                    <>
                      <article
                        className="mb-4 overflow-hidden rounded-xl border text-gray-700 shadow-md duration-500 ease-in-out hover:shadow-xl"
                        key={index}
                      >
                        <div>
                          {item.frontImage && item.frontImage.url ? (
                            <img
                              src={item.frontImage.url}
                              alt="frontImage"
                              className="w-full h-48 object-fit"
                            />
                          ) : (
                            <span>Image not available</span>
                          )}
                        </div>

                         <div className="p-4">
                        <div className="pb-2">
                          <a className="text-[15px] font-semibold hover:text-red-600  duration-500 ease-in-out">
                          {item.projectName
                                ? item.projectName
                                : item.propertyName}
                          </a>
                          <span style={{ float: "right" }} className="text-sm">
                            {item.builderName}
                          </span>
                          <br />
                          <a className="text-sm hover:text-red-600  duration-500 ease-in-out">
                            {item.projectAddress}
                          </a>
                        </div>
                        <ul className="m-0 flex list-none items-center justify-between px-0 pt-6 pb-0">
                          <li className="text-left">
                            <span className="text-sm font-extrabold text-black">
                              {item.city}
                            </span>
                          </li>

                          <li className="text-left">
                            <button
                              type="button"
                              className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-2 py-2  text-center me-2"
                            >
                              View Details
                            </button>
                          </li>
                        </ul>
                      </div>
                      </article>
                    </>
                  )}
                </div>
              ))}
            </>
          ) : (
            <> Searching Data...</>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default SearchData;
