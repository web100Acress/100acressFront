import React, { useContext } from "react";
import Cities from "../Components/HomePageComponents/Cities";
import FormHome from "../Components/HomePageComponents/FormHome";
import WhyChoose from "../Components/HomePageComponents/WhyChoose";
import SpacesAvailable from "../Components/HomePageComponents/Spaces";
import SearchBar from "../Components/HomePageComponents/SearchBar";
import styled from "styled-components";
import OurServices from "../Components/HomePageComponents/ourServices";
import Free from "../../src/Pages/Free";
import { Helmet } from "react-helmet";
import Nav from "../aadharhomes/Nav";
import Footer from "../Components/Actual_Components/Footer";
import { Link } from "react-router-dom";
import { DataContext } from "../MyContext";
import { ScaleLoader } from "react-spinners";
import Snapshot from "./Snapshot";
import Resale from "./Resale";
const keyframes = `
  @keyframes moveHorizontal {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(100%);
    }
  }
`;
function Home() {
  const {
    trendingProject,
    featuredProject,
    affordable,
    upcoming,
    city,
    commercialProject,
    typeScoPlots,
  } = useContext(DataContext);
  return (
    <Wrapper className="section" style={{ overflowX: "hidden" }}>
      <Nav/>
      <Helmet>
        <meta
          name="description"
          content="100acress.com Gurgaon Fastest Growing Property Website, Buy Residential &amp; Commercial Property in Gurgaon. Flats in Gurgaon. Real Estate in Gurgaon"
        />
        <title>
          Property in Gurgaon, Buy Luxury Flats in Gurugram, Real Estate India
        </title>
      </Helmet>

      <div className="h-screen w-full zoom zoom-out element  md:h-60 lg:h-96 sm:h-24 p-8 box-border djqwUUJNCO 9999 mb-4 shadow-2xl"  style={{backgroundImage: `url('../../Images/A4.png')`}}>
        <div className="mt-12 lg:pt-14 sm:pt-1 sm:h-6  md:pt-0 ">
          <SearchBar />
        </div>
      </div>

      <div className="">
        {" "}
        <h1
          className="xjUWI "
          style={{
            fontSize: "xx-large",
            margin: "20px 40px 5px 60px",
            fontWeight: "600",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          Trending Properties
        </h1>
        {
          <section className="flex flex-col bg-white items-center pt-1 ">
            <div className="grid max-w-md grid-cols-1  px-8 sm:max-w-lg md:max-w-screen-xl md:grid-cols-2 md:px-4 lg:grid-cols-4 sm:gap-4 lg:gap-4 w-full">
              {trendingProject.map((item, index) => {
                const pUrl = item.project_url;
                return (
                  <Link to={`/${pUrl}/`} target="_top">
                    <article
                      key={index}
                      className="mb-4  transition hover:scale-105 overflow-hidden rounded-xl  border text-gray-700 shadow-md duration-500 ease-in-out hover:shadow-xl"
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
        }
      </div>
      <div className="bg-orange-100 py-3 ">
        {" "}
        <h1
          className="xjUWI"
          style={{
            fontSize: "xx-large",
            margin: "10px 40px 5px 60px",
            fontWeight: "600",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          Upcoming Projects
          <Link to="projects/upcoming-projects-in-gurgaon" target="_top">
            <span
              className="float-right text-white text-sm px-2 mx-4 rounded-full hidden sm:block bg-red-600"
              style={{ display: "flex", alignItems: "center", margin: "16px" }}
            >
              <ScaleLoader color="#FFFFFF" height={20} width={3} />
              <style>{keyframes}</style>
              <span style={{ marginLeft: "8px" }}>View All </span>
            </span>
          </Link>
        </h1>
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
        }
      </div>

      <div className="py-3 " style={{ backgroundColor: "#00314f" }}>
        {" "}
        <h3
          className="xjUWI text-white "
          style={{
            fontSize: "xx-large",
            margin: "10px 40px 5px 60px",
            fontWeight: "600",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
           Commercial Projects in Delhi NCR
          <Link to={"/projects/commerial"} target="_top">
            <span
              className="float-right text-white text-sm px-2 mx-4 rounded-full hidden sm:block bg-red-600"
              style={{ display: "flex", alignItems: "center", margin: "16px" }}
            >
              <ScaleLoader color="#FFFFFF" height={20} width={3} />
              <style>{keyframes}</style>
              <span style={{ marginLeft: "8px" }}>View All </span>
            </span>
          </Link>
        </h3>
        {
          <section
            className="flex flex-col pt-4 
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
                          <a className="text-[15px] font-semibold hover:text-red-600  duration-500 ease-in-out">
                            {item.projectName}
                          </a>
                          <span style={{ float: "right" }} className="text-sm">
                            {item.builderName}
                          </span>
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
        }
      </div>


      <div className="bg-orange-100 py-3 ">
        {" "}
        <h1
          className="xjUWI"
          style={{
            fontSize: "xx-large",
            margin: "10px 40px 5px 60px",
            fontWeight: "600",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          SCO Plots in Gurugram
          <Link to="/sco/plots" target="_top">
            <span
              className="float-right text-white text-sm px-2 mx-4 rounded-full hidden sm:block bg-red-600"
              style={{ display: "flex", alignItems: "center", margin: "16px" }}
            >
              <ScaleLoader color="#FFFFFF" height={20} width={3} />
              <style>{keyframes}</style>
              <span style={{ marginLeft: "8px" }}>View All </span>
            </span>
          </Link>
        </h1>
        {
          <section className="flex flex-col items-center bg-orange-100">
            <div className="grid max-w-md bg-orange-100 grid-cols-1 px-8 sm:max-w-lg md:max-w-screen-xl md:grid-cols-2 md:px-4 lg:grid-cols-4 sm:gap-4 lg:gap-4 w-full">
              {typeScoPlots.map((item, index) => {
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
                          <a className="text-[15px] font-semibold hover:text-red-600  duration-500 ease-in-out">
                            {item.projectName}
                          </a>
                         
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
        }
      </div>

      <SpacesAvailable />
      <h2
        className="xjUWI "
        style={{
          fontSize: "xx-large",
          margin: "20px 60px",
          fontWeight: "600",
        }}
      >
        Featured Projects
      </h2>

      {
        <section className="flex flex-col  items-center">
          <div className="grid max-w-md grid-cols-1 px-8 sm:max-w-lg md:max-w-screen-xl md:grid-cols-2 md:px-4 lg:grid-cols-4 sm:gap-4 lg:gap-4 w-full">
            {featuredProject.map((item, index) => {
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
                        <a className="text-[15px] font-semibold hover:text-red-600  duration-500 ease-in-out">
                          {item.projectName}
                        </a>
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
      }
      <div className="py-3" style={{ backgroundColor: "#00314f" }}>
        {" "}
        <h3
          className="xjUWI text-white "
          style={{
            fontSize: "xx-large",
            margin: "10px 40px 5px 60px",
            fontWeight: "600",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          Projects in Delhi
          <Link to={"/projects"}>
            <span className="float-right text-sm text-white hidden sm:block pt-3">
              View All{" "}
            </span>
          </Link>
        </h3>
        {
          <section
            className="flex flex-col pt-4 
           items-center"
          >
            <div className="grid max-w-md grid-cols-1 px-8 sm:max-w-lg md:max-w-screen-xl md:grid-cols-2 md:px-4 lg:grid-cols-4 sm:gap-4 lg:gap-4 w-full">
              {city.map((item, index) => {
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
                          <a className="text-[15px] font-semibold hover:text-red-600  duration-500 ease-in-out">
                            {item.projectName}
                          </a>
                          <span style={{ float: "right" }} className="text-sm">
                            {item.builderName}
                          </span>
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
        }
      </div>

      <Cities />
      {/* <StarCarousel /> */}
      <FormHome />

      <div className="">
        <div style={{ backgroundColor: "#00314f" }}>
          {" "}
          <h3
            className="xjUWI text-white pt-3 "
            style={{
              fontSize: "xx-large",
              margin: "10px 40px 5px 60px",
              fontWeight: "600",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            Affordable Homes
            {/* <Link to={"/projects"}>
              <span className="float-right text-sm text-white hidden sm:block pt-3">
                View All{" "}
              </span>
            </Link> */}
          </h3>
          {
            <section
              className="flex flex-col pt-4
           items-center"
            >
              <div className="grid max-w-md grid-cols-1 px-8 sm:max-w-lg md:max-w-screen-xl md:grid-cols-2 md:px-4 lg:grid-cols-4 sm:gap-4 lg:gap-4 w-full">
                {affordable.map((item, index) => {
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
                            alt="property In Gurugrame"
                            className="w-full h-48 object-fit"
                          />
                        </div>

                        <div className="p-4">
                          <div className="pb-2">
                            <a className="text-[15px] font-semibold hover:text-red-600  duration-500 ease-in-out">
                              {item.projectName}
                            </a>
                            <span
                              style={{ float: "right" }}
                              className="text-sm"
                            >
                              {item.builderName}
                            </span>
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
          }
        </div>
      </div>
      {/* <h1
        className="xjUWI"
        style={{
          fontSize: "xx-large",
          margin: "30px 60px 0px 60px",
          fontWeight: "600",
        }}
      >Best Resale Property For You</h1> */}

      <h1
        className="xjUWI text-md md:text-2xl lg:text-4xl xl:text-4xl"
        style={{
          // fontSize: "xx-large",
          margin: "14px 40px 5px 60px",
          fontWeight: "600",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          marginBottom: "-40px",
        }}
      >
        <span>
          {" "}
          Best Resale Property <span> For You</span>
        </span>
        <Link
          to="/buy-properties/best-resale-property-in-gurugram"
          target="_top"
        >
          <span
            className="float-right text-white text-sm px-2 mx-4 rounded-full hidden sm:block bg-red-600"
            style={{ display: "flex", alignItems: "center", margin: "16px" }}
          >
            <ScaleLoader color="#FFFFFF" height={20} width={3} />
            <style>{keyframes}</style>
            <span style={{ marginLeft: "8px" }}>View All </span>
          </span>
        </Link>
      </h1>
      <Resale />

      <h3
        className="xjUWI "
        style={{
          fontSize: "xx-large",
          margin: "30px 60px 0px 60px",
          fontWeight: "600",
        }}
      >
        Services We Offer
      </h3>

      <OurServices />
      <WhyChoose />

      {/* <div>
        <div>
          <a
            href="https://api.whatsapp.com/message/ROVEJ7K6CX37K1?autoload=1&app_absent=0"
            className="dd-m-whatsapp"
            target="_blank"
          >
            <span className="icon"></span>
          </a>
        </div>
      </div> */}

      <Snapshot />
      <Free />
      <Footer />
    </Wrapper>
  );
}

export default Home;

const Wrapper = styled.section`
  .dd-m-whatsapp {
    position: fixed;
    z-index: 999;
    bottom: 40px;
    right: 10px;
    width: 55px;
    height: 55px;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -moz-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -moz-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    background-color: #25d366;
    -webkit-transition: 0.3s all ease;
    -o-transition: 0.3s all ease;
    -moz-transition: 0.3s all ease;
    transition: 0.3s all ease;
    cursor: pointer;
    text-decoration: none;
    color: #25d366;
  }

  .dd-m-whatsapp:hover {
    -webkit-transform: translateY(-5px);
    -moz-transform: translateY(-5px);
    -ms-transform: translateY(-5px);
    -o-transform: translateY(-5px);
    transform: translateY(-5px);
    -webkit-box-shadow: 0 5px 15px 2px rgba(37, 211, 102, 0.3);
    -moz-box-shadow: 0 5px 15px 2px rgba(37, 211, 102, 0.3);
    box-shadow: 0 5px 15px 2px rgba(37, 211, 102, 0.3);
  }

  .dd-m-whatsapp .icon {
    width: 50%;
    height: 50%;
    display: block;
    fill: #fff;
    -webkit-transform: translateX(1px);
    -moz-transform: translateX(1px);
    -ms-transform: translateX(1px);
    -o-transform: translateX(1px);
    transform: translateX(1px);
  }

  .dd-m-whatsapp .icon {
    width: 70%;
    height: 70%;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 39 39'%3E%3Cpath d='M10.7 32.8l.6.3c2.5 1.5 5.3 2.2 8.1 2.2 8.8 0 16-7.2 16-16 0-4.2-1.7-8.3-4.7-11.3s-7-4.7-11.3-4.7c-8.8 0-16 7.2-15.9 16.1 0 3 .9 5.9 2.4 8.4l.4.6-1.6 5.9 6-1.5z' fill='%2325d366'/%3E%3Cpath d='M32.4 6.4C29 2.9 24.3 1 19.5 1 9.3 1 1.1 9.3 1.2 19.4c0 3.2.9 6.3 2.4 9.1L1 38l9.7-2.5c2.7 1.5 5.7 2.2 8.7 2.2 10.1 0 18.3-8.3 18.3-18.4 0-4.9-1.9-9.5-5.3-12.9zM19.5 34.6c-2.7 0-5.4-.7-7.7-2.1l-.6-.3-5.8 1.5L6.9 28l-.4-.6c-4.4-7.1-2.3-16.5 4.9-20.9s16.5-2.3 20.9 4.9 2.3 16.5-4.9 20.9c-2.3 1.5-5.1 2.3-7.9 2.3zm8.8-11.1l-1.1-.5s-1.6-.7-2.6-1.2c-.1 0-.2-.1-.3-.1-.3 0-.5.1-.7.2 0 0-.1.1-1.5 1.7-.1.2-.3.3-.5.3h-.1c-.1 0-.3-.1-.4-.2l-.5-.2c-1.1-.5-2.1-1.1-2.9-1.9-.2-.2-.5-.4-.7-.6-.7-.7-1.4-1.5-1.9-2.4l-.1-.2c-.1-.1-.1-.2-.2-.4 0-.2 0-.4.1-.5 0 0 .4-.5.7-.8.2-.2.3-.5.5-.7.2-.3.3-.7.2-1-.1-.5-1.3-3.2-1.6-3.8-.2-.3-.4-.4-.7-.5h-1.1c-.2 0-.4.1-.6.1l-.1.1c-.2.1-.4.3-.6.4-.2.2-.3.4-.5.6-.7.9-1.1 2-1.1 3.1 0 .8.2 1.6.5 2.3l.1.3c.9 1.9 2.1 3.6 3.7 5.1l.4.4c.3.3.6.5.8.8 2.1 1.8 4.5 3.1 7.2 3.8.3.1.7.1 1 .2h1c.5 0 1.1-.2 1.5-.4.3-.2.5-.2.7-.4l.2-.2c.2-.2.4-.3.6-.5s.4-.4.5-.6c.2-.4.3-.9.4-1.4v-.7s-.1-.1-.3-.2z' fill='%23fff'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 70%;
  }
  @media screen and (max-width: 600px) {
    .xjUWI {
      font-size: x-large;
      margin: 30px 30px !important;
    }
    .djqwUUJNCO {
      height: 17vh !important;
      background-image: url("../../Images/M1.png");
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
      background-image: url("../../Images/M1.png");
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
      background-image: url("../../Images/M1.png");
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
      background-image: url("../../Images/M1.png");
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
    }
  }

  @media screen and (max-width: 1800px) and (min-width: 601px) {
    .djqwUUJNCO {
      // background-image: url("../../Images/A4.png");
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
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

  .element {
    transition: transform 0.5s ease-in-out;
  }

  .element:hover {
    transform: scale(1.02);
  }
`;
