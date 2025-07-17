import React, { useEffect } from "react";
import Footer from "../../Components/Actual_Components/Footer";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { LocationRedIcon, PropertyIcon, RupeeIcon, ShareFrameIcon } from "../../Assets/icons";
import { useSelector } from "react-redux";
import Api_service from "../../Redux/utils/Api_Service";

const KasauliProject = () => {
  let city = "Kasauli";
  const {getProjectbyState} = Api_service();
  const kasauli = useSelector(store => store?.stateproject?.kasauli);

  useEffect(() => {
    if (kasauli.length === 0) {
      getProjectbyState(city, 0)
    }
  }, []);
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
          Property in kasauli - Flats, Villas, House for Sale in kasauli
        </title>
        <meta
          name="description"
          content="Real Estate Properties in New Panipat- Get Details for Residential &amp; Commercial Properties"
        />
      </Helmet>

      <section className="flex pt-2 flex-col items-center mt-16">
        <h1 className="mb-2 p-1 text-center text-2xl sm:text-xl md:text-2xl lg:text-3xl text-red-600 font-bold tracking-[0.1em]">
          Projects in Kasauli
        </h1>

        <h2 className="text-sm mb-4 text-center sm:text-xl md:text-xl lg:text-sm font-normal lg:mx-20 md:mx-10 mx-5 sm:mx-4 tracking-[0.1em]">
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
              <Link key={index} to={`/${pUrl}/`} target="_top">
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
                            <div className="flex items-center gap-1">
                              <PropertyIcon />
                              <span>{item.type}</span>
                            </div>
                          </p>
                          <span className="text-[10px] text-gray-600 block truncate text-sm text-gray-400 block truncate hover:overflow-visible hover:white-space-normal hover:bg-white">
                            <LocationRedIcon />{" "}{item.projectAddress}
                          </span>

                        </li>
                      </li>
                    </ul>
                    <ul className="m-0 flex list-none items-center justify-between px-0 pb-0">
                      <li className="text-left">
                        <span className="text-sm font-extrabold text-red-600">
                          <div className="flex items-center gap-1">
                            <span className="text-xl"><RupeeIcon /></span>
                            {!item.minPrice || !item.maxPrice ? (
                              "Reveal Soon"
                            ) : (
                              <>
                                {item.minPrice < 1 ? (
                                  <>{item.minPrice * 100} L</>
                                ) : (
                                  <>{item.minPrice}</>
                                )}
                                {" - "}
                                {item.maxPrice} Cr
                              </>
                            )}
                          </div>
                        </span>
                      </li>
                      <Link to={`/${pUrl}/`} target="_top">
                        <li className="text-left">
                          <button
                            type="button"
                            className="text-white bg-gradient-to-r from-[#C13B44] via-red-500 to-[#C13B44] hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-xs px-4 py-1.5 text-center me-2"
                          >
                            View Details
                          </button>
                        </li>
                      </Link>
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
