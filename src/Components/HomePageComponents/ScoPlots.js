import React, { useContext } from "react";
import Footer from "../Actual_Components/Footer";
import { Link } from "react-router-dom";
import { DataContext } from "../../MyContext";
import { Helmet } from "react-helmet";

const ScoPlots = () => {
  const { scoPlots } = useContext(DataContext);
  return (
    <div>
      <Helmet>
        <title>SCO Plots in Gurgaon, Top 10 SCO Plots in Gurgaon</title>
        <meta
          name="description"
          content="Find exclusive SCO plots in Gurgaon for retail, offices, and more. Premium locations designed to grow your business or investment portfolio"
        />
        <meta property="og:title" content="Buy SCO Plots in Gurgaon with 100acress" />
        <meta property="og:site_name" content="100acress" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/logo/logo.webp" />
        <meta property="og:url" content="https://www.100acress.com/sco/plots/" />
        <meta property="og:description" content="Find exclusive SCO plots in Gurgaon for retail, offices, and more. Premium locations designed to grow your business or investment portfolio
"/>
        <meta property="og:keywords" content="SCO Plots in Gurgaon"/>
        <meta name="twitter:title" content="Buy SCO Plots in Gurgaon with 100acress"/>
          <meta name="twitter:description" content="Find exclusive SCO plots in Gurgaon for retail, offices, and more. Premium locations designed to grow your business or investment portfolio"/>
            <meta name="twitter:url" content="https://twitter.com/100acressdotcom"/>
              <meta name="twitter:card" content="summary"/>

        <title>
        Buy SCO Plots in Gurgaon with 100acress
        </title>
         <link rel="canonical" href="https://www.100acress.com/sco/plots/" />
      </Helmet>

      <div className="max-w-screen pt-4 sm:pt-2 md:pt-2" target="_top">
        <h1 className="mb-2 mt-10 text-center text-2xl sm:text-xl md:text-2xl lg:text-3xl text-red-600 font-bold">
          SCO Plots in Gurugram
        </h1>

        <h2 className="text-sm text-center sm:text-xl md:text-xl lg:text-sm font-normal lg:mx-20 md:mx-10 mx-5 sm:mx-4">
          These plots, designated for Shop-Cum-Office establishments, offer a
          blend of commercial and retail space, catering to diverse business
          ventures.With strategic locations, flexible zoning regulations, and
          burgeoning economic prospects, SCO plots in Gurugram present investors
          with a promising avenue for business growth and expansion.
        </h2>
      </div>
      <section className="flex flex-col items-center pt-2">
        <div className="grid max-w-md  grid-cols-1 px-8 sm:max-w-lg md:max-w-screen-xl md:grid-cols-2 md:px-4 lg:grid-cols-4 sm:gap-4 lg:gap-4 w-full">
          {scoPlots.map((item, index) => {
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

export default ScoPlots;
