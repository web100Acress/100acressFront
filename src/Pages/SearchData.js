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

  function getFormDataValues({ query, location, collectionName }) {
    return {
      key1: query,
      key2: location,
      key3: collectionName,
    };
  }

  const { key1, key2, key3 } = getFormDataValues(decodedFormData);
  const key = `${key1}${key2}`;

  localStorage.setItem("myKey", key);

  const [buySearchData, setbuySearchData] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const fetchData = async () => {
    try {
      if (key3 === "Buy") {
        const res = await axios.get(
          `https://api.100acress.com/buyproperty/search/${key}`
        );
        setbuySearchData(res.data.data);
      } else if (key3 === "Rent") {
        const res = await axios.get(
          `https://api.100acress.com/rentproperty/search/${key}`
        );
        setbuySearchData(res.data.data);
      } else {
        const res = await axios.get(
          `https://api.100acress.com/property/search/${key}`
        );
        setProjectData(res.data.searchdata);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  // const dataToShow = buySearchData.length > 0  ? buySearchData : projectData;
  return (
    <div style={{ overflowX: "hidden" }}>
      <Nav />
      {buySearchData.length > 0 ? <><section className="flex flex-col items-center bg-white">
        <div className="mt-10 grid max-w-md grid-cols-1 gap-6 px-2 sm:max-w-lg sm:px-20 md:max-w-screen-xl md:grid-cols-2 md:px-10 lg:grid-cols-4 lg:gap-8">
          {buySearchData &&
            buySearchData.length > 0 &&
            buySearchData.map((item, index) => (
              <div key={index}>
                {item.postProperty &&
                  item.postProperty.length > 0 &&
                  item.postProperty.map((property, propIndex) => (
                    <div key={propIndex}>
                      <article className="mb-4 overflow-hidden rounded-xl border text-gray-700 shadow-md duration-500 ease-in-out hover:shadow-xl">
                        <div>
                          {property.frontImage && property.frontImage.url ? (
                            <img
                              src={property.frontImage.url}
                              alt="frontImage"
                              className="w-full h-48 object-fit"
                            />
                          ) : (
                            <span>Image not available</span>
                          )}
                        </div>

                        <div className="p-4">
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
                                <Link to={`/buy-properties/${property.propertyName}/${property._id}`} target="_blank">
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
                                <Link to={ `/buy-properties/${property.propertyName}/${property._id}`} target="_blank">
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
                        </div>
                      </article>
                    </div>
                  ))}
              </div>
            ))}
        </div>
      </section></> : <> <section className="flex flex-col items-center bg-white">
        <div className="mt-10 grid max-w-md grid-cols-1 gap-6 px-2 sm:max-w-lg sm:px-20 md:max-w-screen-xl md:grid-cols-2 md:px-10 lg:grid-cols-4 lg:gap-8">
          {projectData.map((item, index) => {
            const pUrl = item.project_url;
            return (
              <Link to={`/${pUrl}/`} target="_top">
                <article
                  key={index}
                  className="mb-4 transition hover:scale-105  overflow-hidden rounded-xl border text-gray-700 shadow-md duration-500 ease-in-out hover:shadow-xl"
                >
                  <div>
                    <img
                      src={item.frontImage.url}
                      alt="frontImage"
                      className="w-full h-48 object-fit "
                    />
                  </div>
                  <div className="p-4">
                    <div className="pb-2">
                      <a className="text-lg font-semibold hover:text-red-600  duration-500 ease-in-out">
                        {item.projectName}
                      </a>
                      <br />
                      <a className="text-sm hover:text-red-600  duration-500 ease-in-out">
                        {item.city}
                      </a>
                    </div>
                    <ul className="box-border flex list-none items-center border-t border-b border-solid border-gray-200 px-0 py-2">
                      <li className="mr-4 flex items-center text-left">
                        <li className="text-left">
                          <span className="text-sm text-gray-400">
                            {item.projectAddress}
                          </span>
                          <p className="m-0 text-base font-medium">
                            {item.type}
                          </p>
                        </li>
                      </li>
                    </ul>
                    <ul className="m-0 flex list-none items-center justify-between px-0 pt-6 pb-0">
                      <li className="text-left">
                        <span className="text-sm font-extrabold text-black">
                          {item.state}
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
              </Link>
            );
          })}
        </div>
      </section></>}

      

      <Footer />
    </div>
  );
};

export default SearchData;
