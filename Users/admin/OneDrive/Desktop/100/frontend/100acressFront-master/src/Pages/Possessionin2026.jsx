import React, { useEffect} from "react";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Footer from "../Components/Actual_Components/Footer";
import { useSelector } from "react-redux";
import Api_service from "../Redux/utils/Api_Service";
const Possessionin2026 = () => {
  // const {  } = useContext(DataContext);
  const possessionin2026 = useSelector(store => store?.possession?.Possessionin2026);
  let query = "2026";
  const {getPossessionByYear} = Api_service();

  useEffect(()=>{
    getPossessionByYear(query);
  },[])
  return (
    <div style={{ overflowX: "hidden" }}>
      <Helmet>
        <meta
          name="description"
          content=" Get detailed information on property possession in Gurugram. Check out 2024 projects and move into your dream home without delay."
        />
        <title>
        Top Property Possession in Gurugram for 2026
        </title>
        <link
          rel="canonical"
          href="https://www.100acress.com/projects-in-gurugram/property-possession-in-2024/"
        />
      </Helmet>

      <div className="max-w-screen pt-4 sm:pt-2 md:pt-2 mt-12">
        <h1 className="mb-2 uppercase text-center text-2xl sm:text-xl md:text-2xl lg:text-3xl text-red-600 font-bold">
          Possession In 2026 PROPERTIES
        </h1>
        <h2 className="text-sm text-center sm:text-xl md:text-xl lg:text-sm font-normal lg:mx-20 md:mx-10 mx-5 sm:mx-4">
          In 2026, Gurgaon appear as an exclusive goal for real estate projects,
          Showing a vibrant blend of modernity and convenience. New residential
          and commercial projects redefine luxury living and business
          environments alike. These developments brag about cutting-edge
          architecture, sustainable design, and state-of-the-art amenities.
          Gurgaon's projects in 2026 cater to the wise selections of homeowners
          and investors seeking unmatched quality and connectivity in a thriving
          urban landscape.
        </h2>
      </div>

      <section className="flex flex-col items-center bg-white">
        <div className="mt-6 grid max-w-md grid-cols-1 gap-6 px-2 sm:max-w-lg sm:px-20 md:max-w-screen-xl md:grid-cols-2 md:px-10 lg:grid-cols-4 lg:gap-8">
          {possessionin2026.map((item, index) => {
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

export default Possessionin2026;
