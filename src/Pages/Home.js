import React, {useContext, useEffect, useState } from "react";
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
import Resale from "./Resale";
import BackToTopButton from "./BackToTopButton";
import PossessionProperty from "../Components/PossessionProperty";
import BudgetPlotsInGurugraon from "./BudgetPlotsInGurugraon";
import TopSeoPlots from "./TopSeoPlots";
import {ArrowIcon, LcoationBiggerIcon } from '../Assets/icons/index';
import { useMediaQuery } from "@chakra-ui/react";
import { EyeIcon } from "lucide-react";
import SpotlightBanner from "../aadharhomes/SpotlightBanner";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Builder from "./BuilderPages/Builder";
import CustomSkeleton from "../Utils/CustomSkeleton";
import CommonProject from "../Utils/CommonProject";
import Builderaction from "./HomePages/Builderaction";

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const {
    trendingProject,
    featuredProject,
    affordable,
    upcoming,
    city,
    commercialProject,
    typeScoPlots,    
    typeAffordable,
    resalePropertydata,
    LuxuryProjects,
    budgetHome,
  } = useContext(DataContext);
  const [colorChange, setColorchange] = useState(false);
  const [isSmallerThan768] = useMediaQuery("(max-width: 768px)");
  
  const changeNavbarColor = () => {
    if (window.scrollY >= 250) {
      setColorchange(true);
    } else {
      setColorchange(false);
    }
  };
  window.addEventListener("scroll", changeNavbarColor);

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
  let displayedProjects = [];
  let path = false;
  switch (activeFilter) {
    case "Trending":
      displayedProjects = trendingProject;
      break;
    case "Featured":
      displayedProjects = featuredProject;
      break;
    case "Upcoming":
      displayedProjects = upcoming;
      path = "/projects/upcoming-projects-in-gurgaon/";
      break;
    case "Commercial":
      displayedProjects = commercialProject;
      path = "/projects/commerial/";
      break;
    case "SCO":
      displayedProjects = typeScoPlots;
      path = "/sco/plots/";
      break;
    case "Affordable":
      displayedProjects = typeAffordable;
      break;
    case "Resale":
      displayedProjects = resalePropertydata;
      path = "/buy-properties/best-resale-property-in-gurugram/";
      break;
    case "Budget":
      displayedProjects = budgetHome;
      break;
    case "Luxury":
      displayedProjects = LuxuryProjects;
      path = "/top-luxury-projects/";
      break;
    default:
      displayedProjects = [];
      break;
  }
  
  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
     setTimeout(() => {
     AOS.refresh();
  }, 100);
    
  }, [activeFilter]);


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
          src="https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/banner/mainbgg.webp"
          alt="Banner"
          className="hidden md:block w-full h-[25rem] md:h-[30rem] sm:h-[35rem] lg:h-[30rem] xl:h-[30rem]"
        />
        <img
          src="https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/banner/mainbgg.webp"
          alt="Mobile Banner"
          className="block md:hidden w-full h-[38rem]"
        />

        {/* Center the SearchBar */}
        <div className="absolute inset-0 flex items-center justify-center mt-16 md:mt-0 lg:mt-24">
          <SearchBar />
        </div>

      </div>

      <div className="relative">
          <div className="absolute inset-0 bg-[#EE1C25] opacity-80"></div>
          <div className="relative">
            <SpotlightBanner />
          </div>
        </div>
      {/*<!-- End Carousel with indicators inside --> */}
      {trendingProject.length === 0 ? <CustomSkeleton /> : (
        <>
          <div data-aos="fade-up"
            data-aos-duration="1000" className="py-0 mt-3">
            <div className="flex items-center justify-between mx-6 lg:mx-6 xl:mx-14 md:mx-6 py-2">
              <h1 className="text-2xl xl:text-4xl lg:text-3xl md:text-2xl">
                {`${activeFilter}`} Properties in Gurugram
              </h1>
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center justify-start gap-3 mx-6 lg:mx-6 xl:ml-14 md:mx-6 pt-2 overflow-x-auto no-scrollbar">
              <button
                onClick={() => setActiveFilter("Trending")}
                className={`px-4 py-2 rounded-full text-xs ${activeFilter === "Trending" ? "bg-[#C13B44] text-white" : "border border-[#333333] shadow-sm hover:shadow-lg hover:scale-125 duration-500 ease-in-out "}`}
              >
                Trending
              </button>
              <button
                onClick={() => setActiveFilter("Featured")}
                className={`px-4 py-2 rounded-full text-xs ${activeFilter === "Featured" ? "bg-[#C13B44] text-white" : "border border-[#333333] shadow-sm hover:scale-125 duration-500 ease-in-out"}`}
              >
                Featured
              </button>
              <button
                onClick={() => setActiveFilter("Upcoming")}
                className={`px-4 py-2 rounded-full text-xs ${activeFilter === "Upcoming" ? "bg-[#C13B44] text-white" : "border border-[#333333] shadow-sm hover:scale-125 duration-500 ease-in-out"}`}
              >
                Upcoming
              </button>
              <button
                onClick={() => setActiveFilter("Commercial")}
                className={`px-4 py-2 rounded-full text-xs ${activeFilter === "Commercial" ? "bg-[#C13B44] text-white" : "border border-[#333333] shadow-sm hover:scale-125 duration-500 ease-in-out"}`}
              >
                Commercial
              </button>
              <button
                onClick={() => setActiveFilter("Affordable")}
                className={`px-4 py-2 rounded-full text-xs ${activeFilter === "Affordable" ? "bg-[#C13B44] text-white" : "border border-[#333333] shadow-sm hover:scale-125 duration-500 ease-in-out"}`}
              >
                Affordable
              </button>
              <button
                onClick={() => setActiveFilter("SCO")}
                className={`px-4 py-2 rounded-full text-xs ${activeFilter === "SCO" ? "bg-[#C13B44] text-white" : "border border-[#333333] shadow-sm hover:scale-125 duration-500 ease-in-out"}`}
              >
                SCO
              </button>
              <button
                onClick={() => setActiveFilter("Budget")}
                className={`px-4 py-2 rounded-full text-xs ${activeFilter === "Budget" ? "bg-[#C13B44] text-white" : "border border-[#333333] shadow-sm hover:scale-125 duration-500 ease-in-out"}`}
              >
                Budget 🏠
              </button>
              <button
                onClick={() => setActiveFilter("Luxury")}
                className={`px-4 py-2 rounded-full text-sm font-semibold ${activeFilter === "Luxury"
                    ? "bg-gradient-to-r from-[#da737a] to-[#5f050b] text-white shadow-lg transform hover:scale-105 duration-300 ease-in-out"
                    : "border-2 border-[#D4AF37] text-[#D4AF37] shadow-md hover:scale-105 duration-300 ease-in-out"}`}
              >
                Luxury 
              </button>

              {path && (
                <div className="ml-auto hidden sm:block">
                  <Link to={path} target="_top">
                    <span className="flex items-center text-white text-sm px-3 py-1 rounded-full bg-red-600">
                      <EyeIcon />
                      <span className="ml-2">View All</span>
                    </span>
                  </Link>
                </div>
              )}
            </div>

            {/* Display Filtered Projects */}
            <CommonProject
              data={displayedProjects.slice(0, activeFilter === "Luxury" ? 4 : 8)}
              animation="fade-up"
            />
          </div>
        </>)
      }

      {/* Upcoming Project */}
      <CommonProject
      data={upcoming}
      title="Upcoming Projects in Gurugram"
      path="/projects/upcoming-projects-in-gurgaon/"
      animation="fade-up"
      />

      {/* Luxyry Projects */}
        {/* <Suspense fallback={<div><CustomSkeleton/></div>}>
        <Luxury/>
        </Suspense> */}
        
        <CommonProject
        data={LuxuryProjects.slice(0, 4)}
        title="Luxury For You"
        path="/top-luxury-projects/"
      />

      <Builderaction/>

      {/* Budget Projects */}

      <CommonProject
        data={budgetHome}
        title="Budget Projects in Gurugram"
        animation="flip-left"
      />


      {/* SCO */}
      <CommonProject
        data={typeScoPlots}
        title="SCO Projects in Gurugram"
        path="/sco/plots/"
      />

      <SpacesAvailable />
      <BudgetPlotsInGurugraon />


      <CommonProject
        data={commercialProject.slice(0, 4)}
        title="Commercial Projects in Delhi NCR"
        path="/projects/commerial/"
        animation="fade-down"
      />
      
      {colorChange && isSmallerThan768 && <div>
        <Link to="/auth/signin/" target="_top">
          <div className="sticky-quote-cta">
            <a
              className="text-white"
              style={{ backgroundColor: "#C13B44", padding: '12px' }}
            >
              LIST{" "}PROPERTY
            </a>
          </div>
        </Link>
      </div>}
      
      <TopSeoPlots />

      <CommonProject
        data={featuredProject}
        title="Featured Projects"
        path="/projects/upcoming-projects-in-gurgaon/"
        animation="flip-left"
      />

      <div data-aos="zoom-out-left" className="py-3">
        {" "}
        <div className="">
          <div className="flex items-center justify-between mx-6 lg:mx-6 xl:mx-14 md:mx-6  py-2">
            <div className="flex items-center">
              <h2 className="text-2xl xl:text-4xl lg:text-3xl md:text-2xl  text-center sm:text-left">
                Projects in Delhi
              </h2>
            </div>
            <div className="ml-2 hidden sm:block">
              <Link to={"/project-in-delhi/"} target="_top">
                <span className="flex items-center text-white text-sm px-3 py-0 rounded-full bg-red-600">
                  <EyeIcon />
                  <span className="ml-2">View All</span>
                </span>
              </Link>
            </div>
          </div>
        </div>
        {
          <section className="flex flex-col items-center bg-transparent mt-3">
            <div className="grid max-w-md bg-transparent grid-cols-1 px-8 sm:max-w-lg md:max-w-screen-xl md:grid-cols-2 md:px-4 lg:grid-cols-4 sm:gap-4 lg:gap-4 w-full">
              {city.map((item, index) => {
                const pUrl = item.project_url;
                return (
                  <span>
                    <Link to={`/${pUrl}/`} target="_top">
                      <article
                        key={index}
                        className="mb-2 transition overflow-hidden rounded-md border text-gray-700 shadow-md duration-500 ease-in-out hover:shadow-xl"
                      >
                        <div className="p-3 relative overflow-hidden ">
                          <img
                            src={item.frontImage.url}
                            alt="property In Gurugram"
                            className="w-full h-64 object-cover rounded-lg transition-transform duration-500 ease-in-out hover:scale-110"
                          />
                        </div>
                        <div className="pt-0 p-3 space-y-2">
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
                              <div className="text-sm font-thin truncate w-64 md:w-64 lg:w-32 xl:w-48">
                                <span className="text-sm text-white-600 hover:text-red-600 duration-500 ease-in-out block truncate">
                                  {item.city}, {item.state}
                                </span>
                                <span className="text-xs text-[#656565] block truncate hover:overflow-visible hover:white-space-normal hover:bg-white">
                                  {item.projectAddress}
                                </span>
                              </div>
                            </li>

                            <li className=" text-left flex item-center">
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

      <Cities />

      <CommonProject
        data={affordable.slice(0, 4)}
        title="Affordable Homes"
        path="/projects-in-gurugram/"
        animation="fade-up"
      />

      <Builder/>

      <div className="flex items-center justify-between mx-6 lg:mx-6 xl:mx-14 md:mx-6 pt-4">
        <div className="flex items-center">
          <h2 className="text-xl xl:text-4xl lg:text-3xl md:text-2xl  sm:text-left">
            Best Resale Property <span> For You</span>
          </h2>
        </div>
        <div className="ml-2 hidden sm:block">
          <Link
            to="/buy-properties/best-resale-property-in-gurugram/"
            target="_top"
          >
            <span className="flex items-center text-white text-sm px-3 py-0 rounded-full bg-red-600">
              <EyeIcon />            
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

      {/* <Snapshot /> */}
      <FormHome />

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
    right: 10px; /* Changed from right to left */
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
    transform: rotate(0.3turn);
    box-shadow: 0 5px 15px 2px rgba(0, 123, 255, 0.3); /* Blue shadow */
  }

  .dd-m-phone i {
    font-size: 24px; /* Adjust icon size as needed */
  }

  .dd-m-whatsapp {
    position: fixed;
    z-index: 999;
    bottom: 70px;
    right: 10px; /* Changed from right to left */
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
    transform:rotate(1turn);
    box-shadow: 0 5px 15px 2px rgba(0, 123, 255, 0.3); /* Blue shadow */
  }

  .dd-m-whatsapp i {
    font-size: 24px; /* Adjust icon size as needed */
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
    -ms-transform: rotate(-270deg) translate(0, -20px);
    -webkit-transform: rotate(-270deg) translate(0, -20px);
    transform: rotate(-270deg) translate(0, -20px);
    position: relative;
    right: -40px;
    transition: position 0.2s, right 0.2s;
    background: rgb(251, 183, 39);
    background: red;
  }

  .sticky-quote-cta a:hover {
    right: -70px;
    transition: position 0.2s, right 0.2s;
    cursor: pointer;
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
