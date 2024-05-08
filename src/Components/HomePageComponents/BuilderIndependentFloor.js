import React, { useContext } from "react";
import Nav from "../../aadharhomes/Nav";
import Footer from "../Actual_Components/Footer";
import { Link } from "react-router-dom";
import { DataContext } from "../../MyContext";
import { Helmet } from "react-helmet";
const BuilderIndependentFloor = () => {
  const { BuilderIndependentFloor } = useContext(DataContext);
  return (
    <div>
      <Nav />
      <Helmet>
        <title>
          Builder Floor in Gurgaon | Independent Floor | 10acress.com
        </title>
        <meta
          name="description"
          content="Explore premium builder floors in Gurgaon. Find your dream independent floor at 100acress.com. Browse now for exclusive listings on your trusted site!"
        />

        <link
          rel="canonical"
          href="https://www.100acress.com/projects/independentfloors/"
        />
      </Helmet>
      <div className="max-w-screen pt-2 sm:pt-2 md:pt-2" target="_top">
        <h1 className="mb-3 text-center text-2xl sm:text-xl md:text-2xl lg:text-3xl text-red-600 font-bold">
          Independent & Builder Floors in Gurugram
        </h1>
      </div>

      <div className="mx-10 mb-3  text-sm" style={{ textAlign: "center" }}>
        <p style={{ maxWidth: "100%", margin: "0 auto" }}>
          Property is an important part of our lives; if we need a home, we look
          for Residential Property in Gurgaon. Owning a home comes with a slew
          of additional responsibilities, such as finding the assets in the best
          location, proximity to amenities, accessibility, pricing, and other
          financial services, security, proximity to education systems,
          hospitality services, and soon.
        </p>
      </div>

      <section className="flex flex-col items-center">
        <div className="grid max-w-md  grid-cols-1 px-8 sm:max-w-lg md:max-w-screen-xl md:grid-cols-2 md:px-4 lg:grid-cols-4 sm:gap-4 lg:gap-4 w-full">
          {BuilderIndependentFloor.map((item, index) => {
            const pUrl = item.project_url;
            return (
              <Link to={`/${pUrl}/`} target="_top">
                <article
                  key={index}
                  className="mb-4 bg-white overflow-hidden rounded-xl  border text-gray-700 shadow-md duration-500 ease-in-out hover:shadow-xl"
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
                      <a className="text-[15px] font-semibold hover:text-red-600  duration-500 ease-in-out">
                        {item.projectName}
                      </a>
                      {/* <span style={{ float: "right" }} className="text-sm">
                            {item.builderName}
                          </span> */}
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
              </Link>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BuilderIndependentFloor;
