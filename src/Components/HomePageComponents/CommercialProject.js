import React, { useContext } from "react";
import Footer from "../Actual_Components/Footer";
import { Link } from "react-router-dom";
import { DataContext } from "../../MyContext";
import { Helmet } from "react-helmet";

const CommercialProject = () => {
  const { commercialProjectAll } = useContext(DataContext);
  return (
    <div>
      <Helmet>
        <title>
          Commercial Projects in Gurgaon, Office Space &amp; Retail Shops
        </title>
        <meta
          name="description"
          content="Invest Wisely, Buy Commercial Projects in Gurgaon. Book Retail Shops, Food Courts, and Commercial Spaces with High Rental &amp; Flexible Payment Plan. Book Now"
        />
          <link rel="canonical" href="https://www.100acress.com/projects/commerial/" />
      </Helmet>

      <div className="max-w-screen pt-4 sm:pt-2 md:pt-2" target="_top">
        <h1 className="mb-2 text-center text-2xl sm:text-xl md:text-2xl lg:text-3xl text-red-600 font-bold">
          Commercial Projects
        </h1>
        <h2 className="text-sm text-center sm:text-xl md:text-xl lg:text-sm font-normal lg:mx-20 md:mx-10 mx-5 sm:mx-4">
          Within the realm of commercial projects, a multitude of ventures
          emerge, spanning office complexes, retail spaces, industrial parks,
          and hospitality establishments. Each category demands distinct
          considerations in terms of location, design, zoning regulations, and
          target clientele.
        </h2>
      </div>
      <section className="flex pt-2 flex-col items-center">
        <div className="grid max-w-md  grid-cols-1 px-8 sm:max-w-lg md:max-w-screen-xl md:grid-cols-2 md:px-4 lg:grid-cols-4 sm:gap-4 lg:gap-4 w-full">
          {commercialProjectAll.map((item, index) => {
            const pUrl = item.project_url;
            return (
              <Link to={`/${pUrl}/`} target="_top">
                 <article
                      key={index}
                      className="mb-4 transition hover:scale-105 bg-white overflow-hidden rounded-xl  border text-gray-700 shadow-md duration-500 ease-in-out hover:shadow-xl"
                    >
                      <div>
                        <img
                          src={item.frontImage.url}
                          alt="property In Gurugram"
                          className="w-full h-48 object-fit "
                        />
                      </div>
                      <div className="p-4">
                        <div className="pb-2">
                          <a className="text-[15px] font-semibold hover:text-red-600  duration-500 ease-in-out">
                            {item.projectName}
                          </a>

                          <br />
                          <a className="text-sm hover:text-red-600  duration-500 ease-in-out">
                            {item.city}, {item.state}
                          </a>
                        </div>

                        <ul className="box-border flex list-none items-center border-t border-b border-solid border-gray-200 px-0 py-2">
                          <li className="mr-4 flex items-center text-left">
                            <li className="text-left">
                              <span className="text-[13px] text-gray-400">
                                {item.projectAddress}
                              </span>
                              <p className="m-0 text-sm font-medium">
                                {item.type}
                              </p>
                            </li>
                          </li>
                        </ul>

                        <ul className="m-0 flex list-none items-center justify-between px-0  pb-0">
                          <li className="text-left">
                            <span className="text-sm font-extrabold text-red-600">
                              <span className="text-xl">₹ </span>
                              {item.minPrice}
                              {" - "}
                              {item.maxPrice} Cr
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
      </section>
      <Footer />
    </div>
  );
};

export default CommercialProject;
