import React, { useContext } from "react";
import Footer from "../Components/Actual_Components/Footer";
import { DataContext } from "../MyContext";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const KasauliProject = () => {
  const { kasauli } = useContext(DataContext);
  return (
    <div>
      <Helmet>
        <title>
          Property in kasauli - Flats, Villas, House for Sale in kasauli
        </title>
        <meta
          name="description"
          content="Real Estate Properties in New Panipat- Get Details for Residential &amp; Commercial Properties"
        />
      </Helmet>

      <section className="flex pt-2 flex-col items-center mt-12">
        <h1 className="mb-2 p-1 text-center text-2xl sm:text-xl md:text-2xl lg:text-3xl text-red-600 font-bold">
          Projects in Kasauli
        </h1>

        <h2 className="text-sm mb-4 text-center sm:text-xl md:text-xl lg:text-sm font-normal lg:mx-20 md:mx-10 mx-5 sm:mx-4">
          Kasauli is transforming with major enterprises, including new housing
          complexes, commercial space, and infrastructure improvements. These
          developments focus on improving connectivity by developing networks
          and modern amenities, to enhance the standard of urban living and
          encourage investment from businesses in the rapidly growing city.
        </h2>
        <div className="grid max-w-md  grid-cols-1 px-8 sm:max-w-lg md:max-w-screen-xl md:grid-cols-2 md:px-4 lg:grid-cols-4 sm:gap-4 lg:gap-4 w-full">
          {kasauli.map((item, index) => {
            const pUrl = item.project_url;
            return (
              <Link to={`/${pUrl}/`} target="_top">
                <article
                  key={index}
                  className="mb-4 transition hover:scale-105 bg-white overflow-hidden rounded-xl border text-gray-700 shadow-md duration-500 ease-in-out hover:shadow-xl"
                >
                  <div>
                    <img
                      src={item.frontImage.url}
                      alt="property In Gurugram"
                      className="w-full h-48 object-fit"
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
                          <span className="text-xl">₹</span>
                          {item.minPrice < 1 ? (
                            <>{item.minPrice * 100} L</>
                          ) : (
                            <>{item.minPrice}</>
                          )}
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

export default KasauliProject;
