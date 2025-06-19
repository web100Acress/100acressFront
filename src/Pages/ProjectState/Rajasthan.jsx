import {useEffect } from "react";

import Footer from "../../Components/Actual_Components/Footer";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { LocationRedIcon, PropertyIcon, RupeeIcon, ShareFrameIcon } from "../../Assets/icons";
import { useSelector } from "react-redux";
import Api_service from "../../Redux/utils/Api_Service";

const  Rajasthan = () => {

  const {getProjectbyState} = Api_service();
  const rajasthanData = useSelector(store => store?.stateproject?.rajasthan);
  let city = "Rajasthan";
      useEffect(()=>{
        if(Rajasthan.length === 0){
            getProjectbyState(city,0)
        }
      },[]);


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
          Find Your Ideal real estate projects in Rajasthan – 100acress
        </title>
        <meta
          name="description"
          content="Invest in exclusive real estate projects in Rajshtan with world-class features and amenities. Visit 100acress for more."
        />
        <meta property="og:title" content="Find Your Ideal  real estate projects  in Rajasthan – 100acress" />
        <meta property="og:site_name" content="100acress" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/logo/logo.webp" />
        <meta property="og:url" content="https://www.100acress.com/project-in-rajasthan/" />
        <meta property="og:description" content="Invest in exclusive real estate projects in rajasthan with world-class features and amenities. Visit 100acress for more." />
        <meta property="og:keywords" content="projects  in rajasthan" />
        <meta name="twitter:title" content="Find Your Ideal  real estate projects  in Rajasthan– 100acress" />
        <meta name="twitter:description" content="Invest in exclusive real estate projects in Rajshtan  with world-class features and amenities. Visit 100acress for more." />
        <meta name="twitter:url" content="https://twitter.com/100acressdotcom" />
        <meta name="twitter:card" content="summary" />

        <link
          rel="canonical"
          href="http://localhost:3000/projects-in-rajasthan/"
        />
      </Helmet>

      <section className="flex pt-2 flex-col items-center mt-16">
        <h1 className="mb-0 p-1 text-center text-2xl sm:text-xl md:text-2xl lg:text-3xl text-red-600 font-bold tracking-[0.1em]">
          Projects in Rajathan
        </h1>
        <h2 className="text-sm font-semibold tracking-[0.1em]" >NEW RESIDENTIAL & COMMERCIAL PROJECTS IN RAJASTHAN</h2>

        <p className="text-sm mb-4 text-center sm:text-xl md:text-xl lg:text-sm font-normal lg:mx-20 md:mx-10 mx-5 sm:mx-4 tracking-[0.1em]">
          Rajasthan is emerging as a prominent hub for real estate, offering a mix of heritage charm and modern infrastructure.
          From luxury villas to budget apartments, commercial hubs to eco-friendly townships, Rajasthan is attracting both
          end-users and investors. Explore our handpicked property options for a secure and profitable investment in Rajasthan.
        </p>
        <div className="grid max-w-md  grid-cols-1 px-8 sm:max-w-lg md:max-w-screen-xl md:grid-cols-2 md:px-4 lg:grid-cols-4 sm:gap-4 lg:gap-4 w-full">
          {rajasthanData.map((item, index) => {
            const pUrl = item.project_url;
            return (
              <Link to={`/${pUrl}/`} target="_top">
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
                    <ul className="m-0 flex list-none items-center justify-between px-0 pb-0">
                      <li className="text-left">
                        <span className="text-sm font-extrabold text-red-600">
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

export default Rajasthan;
