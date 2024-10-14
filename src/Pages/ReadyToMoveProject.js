import React, { useContext } from "react";
import "react-multi-carousel/lib/styles.css";
import { DataContext } from "../MyContext";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Footer from "../Components/Actual_Components/Footer";
import ReadyToMoveSearch from "./ReadyToMoveSearch";
const ReadyToMoveProject = () => {
  const { readyToMoveData } = useContext(DataContext);
  return (
    <div style={{ overflowX: "hidden" }}>
      <ReadyToMoveSearch />
      <Helmet>
        <meta
          name="description"
          content="Discover the latest new projects in Gurgaon at 100acress.com. Explore upcoming residential Projects and Commercial Properties. Explore Top Real Estate Projects."
        />
        <title>
          Ready To Move Projects in Gurgaon | Best Real Estate at 100acress.com
        </title>
        <link
          rel="canonical"
          href="https://www.100acress.com/projects-in-gurugram/ready-to-move/property/"
        />
      </Helmet>

      <div className="max-w-screen pt-4 sm:pt-2 md:pt-2">
      
        <h2 className="text-sm text-center sm:text-xl md:text-xl lg:text-sm font-normal lg:mx-20 md:mx-10 mx-5 sm:mx-4">
          Ready-to-move properties Perfect for buyers seeking immediate
          possession without delays in construction or finishing. These
          properties allow future homeowners to inspect and move in fast at
          purchase. Ready-to-move properties guarantee quality construction,
          verified legal licenses, no waiting period, and immediate availability
          for occupancy or rental income.
        </h2>
      </div>

      <section className="flex flex-col items-center bg-white">
        <div className="mt-6 grid max-w-md grid-cols-1 gap-6 px-2 sm:max-w-lg sm:px-20 md:max-w-screen-xl md:grid-cols-2 md:px-10 lg:grid-cols-4 lg:gap-8">
          {readyToMoveData.map((item, index) => {
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
                      <span className="text-[15px] font-semibold hover:text-red-600  duration-500 ease-in-out">
                        {item.projectName}
                      </span>

                      <br />
                      <span className="text-sm hover:text-red-600  duration-500 ease-in-out">
                        {item.city}, {item.state}
                      </span>
                    </div>

                    <ul className="box-border flex list-none items-center border-t border-b border-solid border-gray-200 px-0 py-2">
                      <li className="mr-4 flex items-center text-left">
                        <li className="text-left">
                          <span className="text-[13px] text-gray-400">
                            {item.projectAddress}
                          </span>
                          <p className="m-0 text-sm font-medium">{item.type}</p>
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

export default ReadyToMoveProject;
