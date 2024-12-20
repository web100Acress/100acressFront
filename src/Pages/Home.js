import React, { useContext, useState } from "react";
import Cities from "../Components/HomePageComponents/Cities";
import FormHome from "../Components/HomePageComponents/FormHome";
import WhyChoose from "../Components/HomePageComponents/WhyChoose";
import SpacesAvailable from "../Components/HomePageComponents/Spaces";
import SearchBar from "../Components/HomePageComponents/SearchBar";
import styled from "styled-components";
import OurServices from "../Components/HomePageComponents/ourServices";
import Free from "../../src/Pages/Free";
import { Helmet } from "react-helmet";
import Footer from "../Components/Actual_Components/Footer";
import { Link } from "react-router-dom";
import { DataContext } from "../MyContext";
import { ScaleLoader } from "react-spinners";
import Snapshot from "./Snapshot";
import Resale from "./Resale";
import BackToTopButton from "./BackToTopButton";
import PossessionProperty from "../Components/PossessionProperty";
import BudgetPlotsInGurugraon from "./BudgetPlotsInGurugraon";
import TopSeoPlots from "./TopSeoPlots";
import { PropertyIcon, RupeeIcon, LocationRedIcon, ShareFrameIcon, ArrowIcon, LcoationBiggerIcon } from '../Assets/icons/index';
import { ArrowBackIcon } from "@chakra-ui/icons";
import { EyeIcon } from "lucide-react";
import NewSearchBar from "../Components/HomePageComponents/NewSearchBar";
import SpotlightBanner from "../aadharhomes/SpotlightBanner";
function Home() {
  const {
    trendingProject,
    featuredProject,
    affordable,
    upcoming,
    city,
    commercialProject,
    typeScoPlots,
    goaData,
    dlfProject,
    resalePropertydata,
  } = useContext(DataContext);

  let reorderedTrendingProjects = [];
  if (trendingProject.length > 0) {
    reorderedTrendingProjects = [...trendingProject];
    reorderedTrendingProjects[0] = trendingProject[5];
    reorderedTrendingProjects[1] = trendingProject[0];
    reorderedTrendingProjects[2] = trendingProject[7];
    reorderedTrendingProjects[3] = trendingProject[1];
    reorderedTrendingProjects[4] = trendingProject[6];
    reorderedTrendingProjects[5] = trendingProject[2];
    reorderedTrendingProjects[6] = trendingProject[4];
    reorderedTrendingProjects[7] = trendingProject[3];
  }

  const [activeFilter, setActiveFilter] = useState("Trending");

  // Determine which data to display based on the active filter
  let displayedProjects = [];
  if (activeFilter === "Trending") {
    displayedProjects = trendingProject;
  } else if (activeFilter === "Featured") {
    displayedProjects = featuredProject;
  } else if (activeFilter === "Upcoming") {
    displayedProjects = upcoming;
  } else if (activeFilter === "Commercial") {
    displayedProjects = commercialProject;
  } else if (activeFilter === "ScoPlots") {
    displayedProjects = typeScoPlots;
  } else if (activeFilter === "Affordable") {
    displayedProjects = affordable;
  }
  else if (activeFilter === "Resale") {
    displayedProjects = resalePropertydata;
  }

  const handleShare = (project) => {

    console.log("test the data", project)
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
      // Fallback for browsers that don't support the Web Share API
      alert("Share functionality is not supported on this device/browser.");
    }
  };

  return (
    <Wrapper className="section" style={{ overflowX: "hidden" }}>
      <Helmet>
        <meta
          name="description"
          content="100acress.com Gurgaon Fastest Growing Property Website, Buy Residential &amp; Commercial Property in Gurgaon. Flats in Gurgaon. Real Estate in Gurgaon"
        />
        <title>
          Property in Gurgaon, Buy Luxury Flats in Gurugram, Real Estate India
        </title>
        <link rel="canonical" href="https://www.100acress.com/" />
      </Helmet>

      <div className="relative w-full">
        <img
          src="../../Images/mainbg.webp"
          alt="Banner"
          className="hidden opacity-80 md:block w-full h-[25rem] md:h-[28rem] sm:h-[35rem] "
        />
        <img
          src="../../Images/mainbg.webp"
          alt="Mobile Banner"
          className="block md:hidden w-full h-[23rem]"
        />

        {/* Center the SearchBar */}
        <div className="absolute inset-0 flex items-center justify-center">
          <SearchBar />
        </div>
        
      </div>


      {/*<!-- End Carousel with indicators inside --> */}
      {/* <SpotlightBanner/> */}
      <div>
        <div className="flex items-center justify-between mx-6 lg:mx-6 xl:mx-14 md:mx-6 py-2">
          <h1 className="text-xl xl:text-4xl lg:text-3xl md:text-2xl">
            Trending Properties in Gurugram
          </h1>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center justify-start gap-3 mx-6 lg:mx-6 xl:mx-14 md:mx-6 py-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveFilter("Trending")}
            className={`px-4 py-2 rounded-full text-xs ${activeFilter === "Trending" ? "bg-[#C13B44] text-white" : "border border-[#333333] shadow-sm"
              }`}
          >
            Trending
          </button>
          <button
            onClick={() => setActiveFilter("Featured")}
            className={`px-4 py-2 rounded-full text-xs ${activeFilter === "Featured" ? "bg-[#C13B44] text-white" : "border border-[#333333] shadow-sm"
              }`}
          >
            Featured
          </button>
          <button
            onClick={() => setActiveFilter("Upcoming")}
            className={`px-4 py-2 rounded-full text-xs ${activeFilter === "Upcoming" ? "bg-[#C13B44] text-white" : "border border-[#333333] shadow-sm"
              }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setActiveFilter("Commercial")}
            className={`px-4 py-2 rounded-full text-xs ${activeFilter === "Commercial" ? "bg-[#C13B44] text-white" : "border border-[#333333] shadow-sm"
              }`}
          >
            Commercial
          </button>
          <button
            onClick={() => setActiveFilter("Affordable")}
            className={`px-4 py-2 rounded-full text-xs ${activeFilter === "Affordable" ? "bg-[#C13B44] text-white" : "border border-[#333333] shadow-sm"
              }`}
          >
            Affordable
          </button>
          <button
            onClick={() => setActiveFilter("ScoPlots")}
            className={`px-4 py-2 rounded-full text-xs ${activeFilter === "ScoPlots" ? "bg-[#C13B44] text-white" : "border border-[#333333] shadow-sm"
              }`}
          >
            SCO Plots
          </button>
        </div>

        {/* Display Filtered Projects */}
        <section className="flex flex-col bg-white items-center pt-1">
          <div className="grid max-w-md grid-cols-1 px-6 sm:max-w-lg md:max-w-screen-xl md:grid-cols-2 lg:grid-cols-4 sm:gap-4 lg:gap-4 w-full">
            {displayedProjects.map((item, index) => {
              const pUrl = item.project_url;
              return (
                <span className="relative flex  rounded-t-lg cursor-pointer">
                  <Link to={`/${pUrl}/`} target="_top">
                    <article
                      key={index}
                      className="mb-2 overflow-hidden rounded-md  border text-gray-700 shadow-md duration-500 ease-in-out hover:shadow-xl"
                    >
                      <div className="p-3">
                        <img
                          src={item.frontImage.url}
                          alt="property In Gurugram"
                          className="w-full h-48 object-fit rounded-lg transition-transform duration-500 ease-in-out hover:scale-110"
                        />
                      </div>
                      <div className="pt-0 p-3">
                        <div className="pb-2">
                          <span className="text-[15px] font-semibold hover:text-red-600  duration-500 ease-in-out">
                            {item.projectName}
                          </span>
                          <br />
                          <span className="text-sm  text-gray-400 hover:text-red-600  duration-500 ease-in-out">
                            {item.city}, {item.state}
                          </span>
                        </div>

                        <ul className="box-border flex list-none items-center border-b border-solid border-gray-200 px-0 py-2">
                          <li className="mr-4 flex items-center text-left">
                            <li className="text-left">
                              <p className="m-0 text-sm font-medium ">
                                <PropertyIcon />{" "}{item.type}
                              </p>
                              <span className="text-sm text-gray-600 truncate">
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

                          <li className="text-left">
                            <button
                              type="button"
                              className="text-white bg-gradient-to-r from-[#C13B44] via-red-500 to-[#C13B44] hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-xs px-4 py-1.5  text-center me-2"
                            >
                              View Details
                            </button>
                          </li>
                        </ul>
                      </div>
                    </article>
                  </Link>
                  <div className="absolute top-5 right-5"
                    onClick={() => handleShare(item)}
                  >
                    <ShareFrameIcon />
                  </div>
                </span>

              );
            })}
          </div>
        </section>
      </div>

      {/* Upcoming Project */}
      <div>
        {" "}
        <div className="flex items-center justify-between mx-6 lg:mx-6 xl:mx-14 md:mx-6 py-4">
          <div className="flex items-center">
            <h1 className="text-xl xl:text-4xl lg:text-3xl md:text-2xl  text-center sm:text-left">
              Upcoming Projects in Gurugram
            </h1>
          </div>
          <div className="ml-2 hidden sm:block">
            <Link to="projects/upcoming-projects-in-gurgaon/" target="_top">
              <span className="flex items-center text-white text-sm px-3 py-0 rounded-full bg-red-600">
                <ScaleLoader color="#FFFFFF" height={20} width={3} />
                <span className="ml-2">View All</span>
              </span>
            </Link>
          </div>
        </div>
        {
          <section className="flex flex-col bg-white items-center pt-1 ">
            <div className="grid max-w-md grid-cols-1  px-4 sm:max-w-lg md:max-w-screen-xl md:grid-cols-2 md:px-4 lg:grid-cols-4 sm:gap-4 lg:gap-4 w-full">
              {upcoming.map((item, index) => {
                const pUrl = item.project_url;
                return (
                  <span className="relative flex  rounded-t-lg cursor-pointer">

                    <Link to={`/${pUrl}/`} target="_top">
                      <article
                        key={index}
                        className="mb-2 overflow-hidden rounded-md  border text-gray-700 shadow-md duration-500 ease-in-out hover:shadow-xl"
                      >
                        <div className="p-3">
                          <img
                            src={item.frontImage.url}
                            alt="property In Gurugram"
                            className="w-full h-48 object-fit rounded-lg transition-transform duration-500 ease-in-out hover:scale-110"
                          />
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
                                <span className="text-[10px] text-gray-600 block truncate text-sm text-gray-400 block truncate hover:overflow-visible hover:white-space-normal hover:bg-white">
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

                            <li className="text-left">
                              <button
                                type="button"
                                className="text-white bg-gradient-to-r from-[#C13B44] via-red-500 to-[#C13B44] hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-xs px-4 py-1.5  text-center me-2"
                              >
                                View Details
                              </button>
                            </li>
                          </ul>
                        </div>
                      </article>
                    </Link>
                    <div className="absolute top-5 right-5"
                      onClick={() => handleShare(item)}
                    >
                      <ShareFrameIcon />
                    </div>
                  </span>
                );
              })}
            </div>
          </section>
        }
      </div>

      {/* <div className="bg-orange-100 py-3 ">
        {" "}
        <div className="flex items-center justify-between mx-6 lg:mx-6 xl:mx-14 md:mx-6 py-2">
          <div className="flex items-center">
            <h1 className="text-xl xl:text-4xl lg:text-3xl md:text-2xl  text-center sm:text-left">
              Upcoming Projects in Gurugram
            </h1>
          </div>
          <div className="ml-2 hidden sm:block">
            <Link to="projects/upcoming-projects-in-gurgaon/" target="_top">
              <span className="flex items-center text-white text-sm px-3 py-0 rounded-full bg-red-600">
                <ScaleLoader color="#FFFFFF" height={20} width={3} />
                <span className="ml-2">View All</span>
              </span>
            </Link>
          </div>
        </div>
        {
          <section className="flex flex-col items-center bg-orange-100">
            <div className="grid max-w-md bg-orange-100 grid-cols-1 px-8 sm:max-w-lg md:max-w-screen-xl md:grid-cols-2 md:px-4 lg:grid-cols-4 sm:gap-4 lg:gap-4 w-full">
              {upcoming.map((item, index) => {
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
                              <p className="m-0 text-sm font-medium">
                                {item.type}
                              </p>
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
        }
      </div> */}

      {/* Goa */}

      {/* <div className="py-3 " style={{ backgroundColor: "#00314f" }}>
        {" "}
        <div className="flex items-center justify-between mx-6 lg:mx-6 xl:mx-14 md:mx-6  py-2">
          <div className="flex items-center">
            <h1 className="text-xl xl:text-4xl lg:text-3xl md:text-2xl text-white sm:text-left">
              Projects in Goa
            </h1>
          </div>
          <div className="ml-2 hidden sm:block">
            <Link to={"/project-in-goa/"} target="_top">
              <span className="flex items-center text-white text-sm px-3 py-0 rounded-full bg-red-600">
                <ScaleLoader color="#FFFFFF" height={20} width={3} />
                <span className="ml-2">View All</span>
              </span>
            </Link>
          </div>
        </div>
        {
          <section
            className="flex flex-col pt-2
           items-center"
          >
            <div className="grid max-w-md grid-cols-1 px-8 sm:max-w-lg md:max-w-screen-xl md:grid-cols-2 md:px-4 lg:grid-cols-4 sm:gap-4 lg:gap-4 w-full">
              {goaData.slice(0, 4).map((item, index) => {
                const pUrl = item.project_url;
                return (
                  <Link to={`/${pUrl}/`} target="_top">
                    <article
                      key={index}
                      className="mb-4 transition hover:scale-105  bg-white overflow-hidden rounded-xl  border text-gray-700 shadow-md duration-500 ease-in-out hover:shadow-xl"
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
                              <p className="m-0 text-sm font-medium">
                                {item.type}
                              </p>
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
        }
      </div> */}

      <div className=" py-3 ">
        {" "}
        <div className="flex items-center justify-between mx-6 lg:mx-6 xl:mx-14 md:mx-6 py-2">
          <div className="flex items-center ">
            <h1 className="text-xl xl:text-4xl lg:text-3xl md:text-2xl text-center sm:text-left">
              SCO Plots in Gurugram
            </h1>
          </div>
          <div className="ml-2 hidden sm:block">
            <Link to="/sco/plots/" target="_top">
              <span className="flex items-center text-white text-sm px-3 py-0 rounded-full bg-red-600">
                <EyeIcon />                <span className="ml-2">View All</span>
              </span>
            </Link>
          </div>
        </div>
        {
          <section className="flex flex-col items-center bg-transparent">
            <div className="grid max-w-md bg-transparent grid-cols-1 px-8 sm:max-w-lg md:max-w-screen-xl md:grid-cols-2 md:px-4 lg:grid-cols-4 sm:gap-4 lg:gap-4 w-full">
              {typeScoPlots.map((item, index) => {
                const pUrl = item.project_url;
                return (
                  <span>
                    <Link to={`/${pUrl}/`} target="_top">
                      <article
                        key={index}
                        className="mb-2 transition overflow-hidden rounded-md border text-gray-700 shadow-md duration-500 ease-in-out hover:shadow-xl"
                      >
                        <div className="p-3 relative overflow-hidden">
                          <img
                            src={item.frontImage.url}
                            alt="property In Gurugram"
                            className="w-full h-64 object-cover rounded-lg transition-transform duration-500 ease-in-out hover:scale-110"
                          />
                        </div>
                        <div className="pt-0 p-3">
                          <span className="text-[15px] font-semibold text-black-600 hover:text-red-600 duration-500 ease-in-out">
                            {item.projectName}
                          </span>

                          <ul className="m-0 p-0 flex text-white-600 justify-between px-0 pb-0">
                            <li className="text-left flex items-end gap-2">
                              {/* Icon */}
                              <span className="text-red-600 flex-shrink-0">
                                <LcoationBiggerIcon />
                              </span>
                              {/* Text */}
                              <div className="text-sm font-thin truncate">
                                <span className="text-sm text-white-600 hover:text-red-600 duration-500 ease-in-out block truncate">
                                  {item.city}, {item.state}
                                </span>
                                <span className="text-xs text-[#656565] block truncate hover:overflow-visible hover:white-space-normal hover:bg-white">
                                  {item.projectAddress}
                                </span>
                              </div>
                            </li>

                            <li className="text-left">
                              <button
                                type="button"
                                className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-1 py-1 text-center me-2"
                              >
                                <ArrowIcon />
                              </button>
                            </li>
                          </ul>
                        </div>
                      </article>
                    </Link>

                  </span>
                );
              })}
            </div>
          </section>
        }
      </div>

      <SpacesAvailable />
      <BudgetPlotsInGurugraon />

      <div style={{ backgroundColor: "#00314f" }}>
        {" "}
        <div className="flex items-center  justify-between mx-6  lg:mx-6 xl:mx-14 md:mx-6 mt-0">
          <div className="flex items-center pt-3">
            <h1 className="text-xl xl:text-4xl lg:text-3xl md:text-2xl pt-2 pb-0 text-white text-center sm:text-left ">
              Commercial Projects in Delhi NCR
            </h1>
          </div>
          <div className="ml-2 hidden sm:block">
            <Link to={"/projects/commerial/"} target="_top">
              <span className="flex items-center text-white text-sm px-3 py-0 rounded-full bg-red-600">
                <ScaleLoader color="#FFFFFF" height={20} width={3} />
                <span className="ml-2">View All</span>
              </span>
            </Link>
          </div>
        </div>
        {
          <section
            className="flex flex-col pt-3
           items-center"
          >
            <div className="grid max-w-md grid-cols-1 px-8 sm:max-w-lg md:max-w-screen-xl md:grid-cols-2 md:px-4 lg:grid-cols-4 sm:gap-4 lg:gap-4 w-full">
              {commercialProject.slice(0, 4).map((item, index) => {
                const pUrl = item.project_url;
                return (
                  <Link to={`/${pUrl}/`} target="_top">
                    <article
                      key={index}
                      className="mb-4 transition hover:scale-105  bg-white overflow-hidden rounded-xl  border text-gray-700 shadow-md duration-500 ease-in-out hover:shadow-xl"
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
                              <p className="m-0 text-sm font-medium">
                                {item.type}
                              </p>
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
        }
      </div>

      <TopSeoPlots />



      <div className="flex items-center justify-between mx-6 lg:mx-6 xl:mx-14 md:mx-6 mb-0 pt-0">
        <div className="flex items-center">
          <h1 className="text-xl xl:text-4xl lg:text-3xl md:text-2xl  text-center sm:text-left ">
            Featured Projects
          </h1>
        </div>
        <div className="ml-2 hidden sm:block">
          <Link to="/projects-in-gurugram/" target="_top">
            <span className="flex items-center text-white text-sm px-3 py-0 rounded-full bg-red-600">
              <ScaleLoader color="#FFFFFF" height={20} width={3} />
              <span className="ml-2">View All</span>
            </span>
          </Link>
        </div>
      </div>
      {
        <section className="flex flex-col pt-3 items-center">
          <div className="grid max-w-md grid-cols-1 px-8 sm:max-w-lg md:max-w-screen-xl md:grid-cols-2 md:px-4 lg:grid-cols-4 sm:gap-4 lg:gap-4 w-full">
            {featuredProject.map((item, index) => {
              const pUrl = item.project_url;
              return (
                <Link to={`/${pUrl}/`} target="_top">
                  <article
                    key={index}
                    className="mb-4 transition hover:scale-105 bg-white overflow-hidden rounded-md border text-gray-700 shadow-md duration-500 ease-in-out hover:shadow-xl"
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
                            <p className="m-0 text-sm font-medium">
                              {item.type}
                            </p>
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
      }

      <div className="py-3" style={{ backgroundColor: "#00314f" }}>
        {" "}
        <div className="" style={{ backgroundColor: "#00314f" }}>
          <div className="flex items-center justify-between mx-6 lg:mx-6 xl:mx-14 md:mx-6  py-2">
            <div className="flex items-center">
              <h1 className="text-xl xl:text-4xl lg:text-3xl md:text-2xl text-white text-center sm:text-left">
                Projects in Delhi
              </h1>
            </div>
            <div className="ml-2 hidden sm:block">
              <Link to={"/project-in-delhi/"} target="_top">
                <span className="flex items-center text-white text-sm px-3 py-0 rounded-full bg-red-600">
                  <ScaleLoader color="#FFFFFF" height={20} width={3} />
                  <span className="ml-2">View All</span>
                </span>
              </Link>
            </div>
          </div>
        </div>
        {
          <section
            className="flex flex-col pt-2 
           items-center"
          >
            <div className="grid max-w-md grid-cols-1 px-8 sm:max-w-lg md:max-w-screen-xl md:grid-cols-2 md:px-4 lg:grid-cols-4 sm:gap-4 lg:gap-4 w-full ">
              {city.map((item, index) => {
                const pUrl = item.project_url;
                return (
                  <Link to={`/${pUrl}/`} target="_top">
                    <article className="relative mb-4 transition transform hover:scale-105 bg-white overflow-hidden rounded-md border text-gray-700 shadow-md duration-500 ease-in-out h-[400px]">
                      {" "}
                      <img
                        src={item.frontImage.url}
                        alt="property In Gurugram"
                        className="w-[100%] h-[100%] object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 mx-2 mb-2 h-[37%] rounded-md">
                        <div className="flex flex-col items-center text-justify hover:bg-orange-100 p-2">
                          <span className="text-[13px] font-semibold duration-500 ease-in-out">
                            {item.projectName}
                          </span>
                          <span className="text-sm duration-500 ease-in-out ">
                            {item.city}, {item.state}
                          </span>
                          <span className="text-[12px] text-gray-700">
                            {item.projectAddress}
                          </span>
                          <p className="m-0 text-sm font-medium">{item.type}</p>
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
                          <button
                            type="button"
                            className="text-red-600 rounded-lg text-sm px-2 text-center mt-2"
                          >
                            <i className="fa-solid fa-arrow-right text-xl"></i>
                          </button>
                        </div>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
          </section>
        }
      </div>

      <Cities />

      {/* <StarCarousel /> */}
      <FormHome />

      <div className="">
        <div style={{ backgroundColor: "#00314f" }}>
          {" "}
          <div className="" style={{ backgroundColor: "#00314f" }}>
            <div className="flex items-center justify-between mx-6 lg:mx-6 xl:mx-14 md:mx-6 pt-4">
              <div className="flex items-center">
                <h1 className="text-xl xl:text-4xl lg:text-3xl md:text-2xl text-white text-center sm:text-left">
                  Affordable Homes
                </h1>
              </div>
              <div className="ml-2 hidden sm:block">
                <Link to={"/projects-in-gurugram/"} target="_top">
                  <span className="flex items-center text-white text-sm px-3 py-0 rounded-full bg-red-600">
                    <ScaleLoader color="#FFFFFF" height={20} width={3} />
                    <span className="ml-2">View All</span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
          {
            <section
              className="flex flex-col pt-3
           items-center"
            >
              <div className="grid max-w-md grid-cols-1 px-8 sm:max-w-lg md:max-w-screen-xl md:grid-cols-2 md:px-4 lg:grid-cols-4 sm:gap-4 lg:gap-4 w-full">
                {affordable.map((item, index) => {
                  const pUrl = item.project_url;
                  return (
                    <Link to={`/${pUrl}/`} target="_top">
                      <article
                        key={index}
                        className="mb-4 transition hover:scale-105  bg-white overflow-hidden rounded-md border text-gray-700 shadow-md duration-500 ease-in-out hover:shadow-xl"
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
                                <p className="m-0 text-sm font-medium">
                                  {item.type}
                                </p>
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
          }
        </div>
      </div>

      <div className="flex items-center justify-between mx-6 lg:mx-6 xl:mx-14 md:mx-6 pt-4">
        <div className="flex items-center">
          <h1 className="text-xl xl:text-4xl lg:text-3xl md:text-2xl  sm:text-left">
            Best Resale Property <span> For You</span>
          </h1>
        </div>
        <div className="ml-2 hidden sm:block">
          <Link
            to="/buy-properties/best-resale-property-in-gurugram/"
            target="_top"
          >
            <span className="flex items-center text-white text-sm px-3 py-0 rounded-full bg-red-600">
              <ScaleLoader color="#FFFFFF" height={20} width={3} />
              <span className="ml-2" style={{ marginLeft: "8px" }}>
                View All
              </span>
            </span>
          </Link>
        </div>
      </div>

      <Resale />

      <OurServices />
      <WhyChoose />

      <Snapshot />
      {/* <HomeBuilderCarousel /> */}
      <Free />
      <div>
        <div>
          <a href="tel:8500900100" class="dd-m-phone">
            <i class="fa-solid fa-phone"></i>
          </a>
        </div>
      </div>

      <div>
        <a
          href="https://wa.me/918500900100"
          class="dd-m-whatsapp"
          rel="noopener noreferrer"
          target="_blank"
        >
          <i class="fa-brands fa-whatsapp"></i>
        </a>
      </div>

      <PossessionProperty />
      <BackToTopButton />
      <Footer />
    </Wrapper>
  );
}

export default Home;

const Wrapper = styled.section`
  .dd-m-phone {
    position: fixed;
    z-index: 999;
    bottom: 10px;
    left: 10px; /* Changed from right to left */
    width: 45px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: #007bff; /* Blue color for the icon background */
    transition: 0.3s all ease;
    cursor: pointer;
    text-decoration: none;
    color: #fff; /* Icon color */
    font-size: 24px; /* Adjust icon size as needed */
  }

  .dd-m-phone:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px 2px rgba(0, 123, 255, 0.3); /* Blue shadow */
  }

  .dd-m-phone i {
    font-size: 24px; /* Adjust icon size as needed */
  }

  .dd-m-whatsapp {
    position: fixed;
    z-index: 999;
    bottom: 70px;
    left: 10px; /* Changed from right to left */
    width: 45px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: #4ac557; /* Blue color for the icon background */
    transition: 0.3s all ease;
    cursor: pointer;
    text-decoration: none;
    color: #fff; /* Icon color */
    font-size: 24px; /* Adjust icon size as needed */
  }

  .dd-m-whatsapp:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px 2px rgba(0, 123, 255, 0.3); /* Blue shadow */
  }

  .dd-m-whatsapp i {
    font-size: 24px; /* Adjust icon size as needed */
  }

  @media screen and (max-width: 600px) {
    .xjUWI {
      font-size: x-large;
      margin: 30px 30px !important;
    }
    .djqwUUJNCO {
      height: 17vh !important;
      background-image: url("../../Images/P1.png");
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
    }
  }

  @media screen and (max-width: 425px) and (min-width: 425px) {
    .xjUWI {
      font-size: x-large;
      margin: 10px 30px !important;
    }
    .djqwUUJNCO {
      height: 60vh !important;
      background-image: url("../../Images/P1.png");
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
    }
  }

  @media screen and (max-width: 375px) and (min-width: 375px) {
    .xjUWI {
      font-size: x-large;
      margin: 10px 30px !important;
    }
    .djqwUUJNCO {
      height: 20vh !important;
      background-image: url("../../Images/P1.png");
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
    }
  }

  @media screen and (max-width: 425px) and (min-width: 425px) {
    .xjUWI {
      font-size: x-large;
      margin: 10px 30px !important;
    }
    .djqwUUJNCO {
      height: 60vh !important;
      background-image: url("../../Images/P1.png");
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
    }
  }

  @media screen and (max-width: 1800px) and (min-width: 601px) {
    .djqwUUJNCO {
      background-image: url("../../Images/tarc.jpg");
      background-repeat: no-repeat;
      background-size: cover;
      background-position: cover;
      height: 60vh !important;
    }
  }

  .sticky-quote-cta {
    height: auto;
    position: fixed;
    border-radius: 15px 0 15px 0;
    right: 0;
    top: 400px;
    top: 40vh;
    z-index: 10000;
  }

  .sticky-quote-cta a {
    color: white;
    text-decoration: none;
    background: #333;
    padding: 15px 20px 35px;
    display: block;
    font-weight: bold;
    font-size: 15px;
    border-radius: 5px;
    -ms-transform: rotate(-90deg) translate(0, -20px);
    -webkit-transform: rotate(-90deg) translate(0, -20px);
    transform: rotate(-90deg) translate(0, -20px);
    position: relative;
    right: -85px;
    transition: position 0.2s, right 0.2s;
    background: rgb(251, 183, 39);
    background: red;
  }

  .sticky-quote-cta a:hover {
    right: -70px;
    transition: position 0.2s, right 0.2s;
    cursor: pointer;
  }

  .banner {
    position: relative;
  }

  .banner-image {
    width: 100%;
    height: auto;
  }

  .default-image {
    display: block; /* Show default image by default */
  }

  .mobile-image {
    display: none; /* Hide mobile image by default */
  }

  /* Media query for mobile devices */
  @media (max-width: 768px) {
    .default-image {
      display: none; /* Hide default image on mobile */
    }

    .mobile-image {
      display: block; /* Show mobile image on mobile */
    }
  }

`;
