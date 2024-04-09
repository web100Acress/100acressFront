import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../../aadharhomes/Nav";
import Footer from "./Footer";
import { Link } from "react-router-dom";
function RentPropViewCard() {

  const [rentData, setRentData] = useState([]);
  const [postPropertyData, setPostPropertyData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://api.100acress.com/property/viewAll"
        );
        setRentData(res.data.collectdata);
        setPostPropertyData(res.data.done);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
  }, [rentData]);

  useEffect(() => {
  }, [postPropertyData]);

  return (
    <div style={{ overflowX: "hidden" }}>
    <Nav />
    {/* <SmallPopForm/> */}
    <div>
      <section className="flex flex-col items-center bg-white">
        <div className="mt-10 grid max-w-md grid-cols-1 gap-6 px-2 sm:max-w-lg sm:px-20 md:max-w-screen-xl md:grid-cols-2 md:px-10 lg:grid-cols-4 lg:gap-8">
          {rentData && rentData.length > 0 ? (
            <>
              {rentData.map((item, index) => {
                if (item.name) {
                  return (
                    <>
                      {" "}
                      {item.postProperty && item.postProperty.length > 0 ? (
                        <>
                          {item.postProperty.map(
                            (property, propertyIndex) => (
                              <Link to={`/rent/${property._id}`}>
                              <article
                                className="mb-4 overflow-hidden rounded-xl border text-gray-700 shadow-md duration-500 ease-in-out hover:shadow-xl"
                                key={propertyIndex}
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

                                <div className="p-4">
                                  <div className="pb-2">
                                    <p className="text-lg font-semibold hover:text-red-600 duration-500 ease-in-out">
                                      {property.propertyName}
                                    </p>
                                    <span style={{ float: "right" }}>
                                      {property.price}
                                    </span>
                                    <br />
                                    <p className="text-sm hover:text-red-600 duration-500 ease-in-out">
                                      {property.city}, {property.state}
                                    </p>
                                  </div>
                                  <ul className="m-0 flex list-none items-center justify-between px-0 pt-6 pb-0">
                                    <li className="text-left">
                                      <span className="text-sm font-extrabold  text-black">
                                        {property.propertyType}
                                      </span>
                                    </li>
                                    <li className="text-left">
                                     
                                        <button
                                          type="button"
                                          style={{ width: "122px" }}
                                          className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-2 py-2 text-center me-2"
                                        >
                                          View Details
                                        </button>
                                     
                                    </li>
                                  </ul>
                                </div>
                              </article>
                              </Link>
                            )
                          )}
                        </>
                      ) : (
                        <></>
                      )}
                    </>
                  );
                } else {
                  return (
                    <>
                      {
                         <Link to={`/rent/${item._id}`}>
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
                              <p className="text-lg font-semibold hover:text-red-600 duration-500 ease-in-out">
                                {item.propertyName}
                              </p>
                              <span style={{ float: "right" }}>
                                {item.price}
                              </span>
                              <br />
                              <p className="text-sm hover:text-red-600 duration-500 ease-in-out">
                                {item.city}, {item.state}
                              </p>
                            </div>
                            <ul className="m-0 flex list-none items-center justify-between px-0 pt-6 pb-0">
                              <li className="text-left">
                                <span className="text-sm font-extrabold text-black">
                                  {item.propertyType}
                                </span>
                              </li>

                              <li className="text-left">
                               
                                  <button
                                    type="button"
                                    style={{ width: "122px" }}
                                    className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-2 py-2 text-center me-2"
                                  >
                                    View Details
                                  </button>
                               
                              </li>
                            </ul>
                          </div>
                        </article>
                        </Link>
                      }
                    </>
                  );
                }
              })}
            </>
          ) : (
            <>Loading...</>
          )}
        </div>
      </section>
    </div>
    <Footer />
  </div>
  );
}

export default RentPropViewCard;
