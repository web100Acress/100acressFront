import React, { useEffect } from "react";
import Footer from "../Components/Actual_Components/Footer";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import Api_Service from "../Redux/utils/Api_Service";


const Bptp = () => {
  const bptp = useSelector(store =>store?.ProjectOverview?.bptpplots );
  let query = "bptp";
  const {getProjectOnOverview} = Api_Service();

  useEffect(()=>{
    getProjectOnOverview(query)
  },[])
  return (
    <div>
      <Helmet>
        <title>
          BPTP Plots in Gurugram – Prime Land Investment Opportunities
        </title>
        <meta
          name="description"
          content="Explore premium BPTP plots in Gurugram with 100acress. Secure your investment in prime real estate today and benefit from high returns. Contact us now!
"
        />
        <meta property="og:title" content="BPTP Plots in Gurugram – Prime Land Investment Opportunities" />
        <meta property="og:site_name" content="100acress" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/logo/logo.webp" />
        <meta property="og:url" content="https://www.100acress.com/bptp-plots-gurugram/" />
        <meta property="og:description" content="Explore premium BPTP plots in Gurugram with 100acress. Secure your investment in prime real estate today and benefit from high returns. Contact us now!" />
        <meta property="og:keywords" content="BPTP Plots in Gurugram" />
        <meta name="twitter:title" content="BPTP Plots in Gurugram – Prime Land Investment Opportunities" />
        <meta name="twitter:description" content="Explore premium BPTP plots in Gurugram with 100acress. Secure your investment in prime real estate today and benefit from high returns. Contact us now!" />
        <meta name="twitter:url" content="https://twitter.com/100acressdotcom" />
        <meta name="twitter:card" content="summary" />

        <link
          rel="canonical"
          href="https://www.100acress.com/bptp-plots-gurugram/"
        />
      </Helmet>

      <section className="flex pt-2 flex-col items-center mt-12">
        <h1 className="mb-3 p-3 text-center text-2xl sm:text-xl md:text-2xl lg:text-3xl text-red-600 font-bold">
          BPTP Plots in Gurugram
        </h1>

        {/* <h2 className="text-sm mb-4 text-center sm:text-xl md:text-xl lg:text-sm font-normal lg:mx-20 md:mx-10 mx-5 sm:mx-4">
          DLF Super Luxury Homes stand out due to their unmatched quality and
          style. They are built with care and attention to detail, with spacious
          plans, luxurious finishings, and modern facilities. In prime locations
          with breathtaking views, unparalleled privacy, and access to
          world-class amenities that redefine the definition of luxury living in
          all aspects.
        </h2> */}

        <div className="grid max-w-md  grid-cols-1 px-8 sm:max-w-lg md:max-w-screen-xl md:grid-cols-2 md:px-4 lg:grid-cols-4 sm:gap-4 lg:gap-4 w-full">
          {bptp.map((item, index) => {
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

export default Bptp;
