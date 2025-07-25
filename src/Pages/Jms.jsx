import React, { useContext } from "react";
import Footer from "../Components/Actual_Components/Footer";
import { DataContext } from "../MyContext";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { LocationRedIcon, PropertyIcon, RupeeIcon, ShareFrameIcon } from "../Assets/icons";

const Jms = () => {
  const { jms } = useContext(DataContext);

  const handleShare = (project) => {
    if (navigator.share) {
      navigator
        .share({
          title: project?.projectName,
          text: `Check out this project: ${project.projectName}`,
          url: `${window.location.origin}/${project.project_url}`,
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.log("Error sharing:", error));
    } else {
      alert("Share functionality is not supported on this device/browser.");
    }
  };

  return (
    <div>

    
      <Helmet>
        <title>
          Explore JMS Plots in Gurugram – A Smart Investment Choice
        </title>
        <meta
          name="description"
          content="Invest in JMS plots in Gurugram. High potential for growth and development. Make a smart move for your future investments!"
        />
        <meta property="og:title" content="Explore JMS Plots in Gurugram – A Smart Investment Choice" />
        <meta property="og:site_name" content="100acress" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/logo/logo.webp" />
        <meta property="og:url" content="https://www.100acress.com/jms-plots-gurugram/" />
        <meta property="og:description" content="Invest in JMS plots in Gurugram. High potential for growth and development. Make a smart move for your future investments!" />
        <meta property="og:keywords" content="JMS Plots in Gurugram" />

        Twitter Tags:
        <meta name="twitter:title" content="Explore JMS Plots in Gurugram – A Smart Investment Choice" />
        <meta name="twitter:description" content="Invest in JMS plots in Gurugram. High potential for growth and development. Make a smart move for your future investments!" />
        <meta name="twitter:url" content="https://twitter.com/100acressdotcom" />
        <meta name="twitter:card" content="summary" />


        <link
          rel="canonical"
          href="https://www.100acress.com/jms-plots-gurugram/"
        />
      </Helmet>

      <section className="flex pt-2 flex-col items-center mt-12">
        <h1 className="mb-3 p-3 text-center text-2xl sm:text-xl md:text-2xl lg:text-3xl text-red-600 font-bold">
          JMS Plots in Gurugram
        </h1>

        <div className="grid max-w-md  grid-cols-1 px-8 sm:max-w-lg md:max-w-screen-xl md:grid-cols-2 md:px-4 lg:grid-cols-3 sm:gap-4 lg:gap-4 w-full">
          {jms.map((item, index) => {
            const pUrl = item.project_url;
            return (
              <span>
                <article
                  key={index}
                  className="mb-2 overflow-hidden rounded-md  border text-gray-700 shadow-md duration-500 ease-in-out hover:shadow-xl"
                >
                  <div className="relative flex p-3">
                    <Link to={`/${pUrl}/`} target="_top">

                      <img
                        src={item.frontImage.url}
                        alt="property In Gurugram"
                        className="w-full h-48 object-fit rounded-lg transition-transform duration-500 ease-in-out hover:scale-110"
                      />
                    </Link>
                    <div className="absolute top-5 right-5"
                      onClick={() => handleShare(item)}
                    >
                      <ShareFrameIcon />
                    </div>
                  </div>
                  <div className="pt-0 p-3">
                    <div className="pb-2">
                      <span className="text-[15px] font-semibold hover:text-red-600  duration-500 ease-in-out">
                        {item.projectName}
                      </span>
                      <br />
                      <span className="text-sm text-gray-400 hover:text-red-600  duration-500 ease-in-out">
                        {item.city}, {item.state}
                      </span>
                    </div>

                    <ul className="box-border flex list-none items-center border-b border-solid border-gray-200 px-0 py-2">
                      <li className="mr-4 flex items-center text-left">
                        <li className="text-left">
                          <p className="m-0 text-sm font-medium ">
                            <PropertyIcon />{" "}{item.type}
                          </p>
                          <span className="text-[10px] text-gray-600 block truncate text-sm hover:overflow-visible hover:white-space-normal hover:bg-white">
                            <LocationRedIcon />{" "}{item.projectAddress}
                          </span>

                        </li>
                      </li>
                    </ul>

                    <ul className="m-0  flex list-none items-center justify-between px-0  pb-0">
                      <li className="text-left">
                        <span className="text-sm font-extrabold text-red-600">
                          <span className="text-xl"><RupeeIcon /></span>
                          {item.minPrice < 1 ? (
                            <>{item.minPrice * 100} L</>
                          ) : (
                            <>{item.minPrice}</>
                          )}
                          {" - "}
                          {item.maxPrice} Cr
                        </span>
                      </li>
                      <Link to={`/${pUrl}/`} target="_top">
                        <li className="text-left">
                          <button
                            type="button"
                            className="text-white bg-gradient-to-r from-[#C13B44] via-red-500 to-[#C13B44] hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-xs px-4 py-1.5  text-center me-2"
                          >
                            View Details
                          </button>
                        </li>
                      </Link>
                    </ul>
                  </div>
                </article>
              </span>
            );
          })}
        </div>
        
      </section>
      <Footer />
    </div>
  );
};

export default Jms;
