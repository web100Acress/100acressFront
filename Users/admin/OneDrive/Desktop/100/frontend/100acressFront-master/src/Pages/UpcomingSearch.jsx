import React, { useContext, useState } from "react";
import { DataContext } from "../MyContext";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
const UpcomingSearch = () => {
  const { allProjectData } = useContext(DataContext);
  const [project, setProject] = useState("");
  const [location, setLocation] = useState("");
  const [projectType, setProjectType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [city, setCity] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const locGur = [
    "Sohna Road",
    "Golf Course Road",
    "MG Road",
    "Sohna",
    "South Peripheral Road",
    "NH-48",
    "Golf Course Extn Road",
    "New Gurgaon",
    "Northern Peripheral Road",
    "Dwarka Expressway",
  ];
  const locDelhi = [];
  const locNoida = [];
  const locGoa = [];
  const locAyod = [];
  const locMum = [];
  const locPan = [];
  const locKas = [];
  const locDubai = [];

  const handlePriceChange = (e) => {
    const [min, max] = e.target.value
      .split(",")
      .map((value) => (value === "Infinity" ? Infinity : parseFloat(value)));
    setMinPrice(min);
    setMaxPrice(max);
  };

  const handleSearch = () => {
    const filtered = allProjectData.filter((item) => {
      return (
        (project === "" ||
          item.projectName.toLowerCase().includes(project.toLowerCase())) &&
        (city === "" || item.city.toLowerCase().includes(city.toLowerCase())) &&
        (location === "" ||
          item.projectAddress.toLowerCase().includes(location.toLowerCase())) &&
        (projectType === "" ||
          item.type.toLowerCase().includes(projectType.toLowerCase())) &&
        (minPrice === "" || item.minPrice >= minPrice) &&
        (maxPrice === "" || item.maxPrice <= maxPrice)
      );
    });
    setFilteredProjects(filtered);
  };

  return (
    <>
      {" "}
      <Helmet>
        <meta
          name="description"
          content="Explore best upcoming projects in Gurgaon with modern amenities. Find residential & commercial spaces customized to your lifestyle. Visit 100acress today!"
        />
        <meta property="og:title" content="Discover Upcoming Projects in Gurgaon - 100acress" />
        <meta property="og:site_name" content="100acress" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/logo/logo.webp" />
        <meta property="og:url" content="https://www.100acress.com/projects/upcoming-projects-in-gurgaon " />
        <meta property="og:description" content="Explore best upcoming projects in Gurgaon with modern amenities. Find residential & commercial spaces customized to your lifestyle. Visit 100acress today!" />
        <meta property="og:keywords" content="Upcoming Projects in Gurgaon" />
        <meta name="twitter:title" content="Discover Upcoming Projects in Gurgaon - 100acress" />
        <meta name="twitter:description" content="Explore best upcoming projects in Gurgaon with modern amenities. Find residential & commercial spaces customized to your lifestyle. Visit 100acress today!" />
        <meta name="twitter:url" content="https://twitter.com/100acressdotcom" />
        <meta name="twitter:card" content="summary" />

        <title>
          Discover Upcoming Projects in Gurgaon - 100acress
        </title>
        <link
          rel="canonical"
          href="https://www.100acress.com/projects/upcoming-projects-in-gurgaon/"
        />
      </Helmet>
      <h1 className=" p-1 text-center text-2xl mt-16 sm:text-xl md:text-2xl lg:text-3xl text-red-600 font-bold ">
        UpComing Projects in Gurgaon
      </h1> 
      <div className="hidden lg:flex items-center px-14 bg-gray-200 pt-4 justify-center">
        <div className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-5 md:grid-cols-1 sm:grid-cols-1 gap-4  mb-4">
            <div className="relative hidden lg:block ">
              <select
                className="border-[1px] border-red-500 outline-none p-2 pr-8 w-full"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              >
                <option value="" disabled hidden>
                  Prime City
                </option>
                <option value="Gurugram">Gurugram</option>
                <option value="Noida">Noida</option>
                <option value="Delhi">Delhi</option>
                <option value="Goa">Goa</option>
                <option value="Ayodhya">Ayodhya</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Panchkula">Panchkula</option>
                <option value="Kasauli">Kasauli</option>
                <option value="Dubai">Dubai</option>
              </select>
            </div>
            <div className="relative hidden lg:block">
              <select
                className="border-[1px] border-red-500 outline-none p-2 pr-8 w-full"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option value="" disabled hidden>
                  Gurgaon
                </option>
                <>
                  {city === "Gurugram" ? (
                    locGur.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))
                  ) : city === "Noida" ? (
                    locDelhi.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))
                  ) : city === "Delhi" ? (
                    locNoida.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))
                  ) : city === "Goa" ? (
                    locGoa.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))
                  ) : city === "Ayodhya" ? (
                    locAyod.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))
                  ) : city === "Mumbai" ? (
                    locMum.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))
                  ) : city === "Panchkula" ? (
                    locPan.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))
                  ) : city === "Kasauli" ? (
                    locKas.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))
                  ) : city === "Dubai" ? (
                    locDubai.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))
                  ) : (
                    <></>
                  )}
                </>
              </select>
            </div>

            <div className="relative sm:col-span-1 hidden lg:block">
              <select
                className="border-[1px] border-red-500 outline-none p-2 pr-8 w-full"
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
              >
                <option value="" disabled hidden>
                  Project Type
                </option>
                <option value="Commercial Property">Commercial Property</option>
                <option value="Residential Flats">Residential Flats</option>
                <option value="SCO Plots">SCO Plots</option>
                <option value="Deen Dayal Plots">Deen Dayal Plots</option>
                <option value="Residential Plots">Residential Plots</option>
                <option value="Independent Floors">Independent Floors</option>
                <option value="Builder Floors">Builder Floors</option>
                <option value="Affordable Homes">Affordable Homes</option>
                <option value="Villas">Villas</option>
                <option value="Farm Houses">Farm House</option>
              </select>
            </div>

            <div className="relative sm:col-span-1 hidden lg:block">
              <select
                className="border-[1px] border-red-500 outline-none p-2 pr-8 w-full"
                onChange={handlePriceChange}
                value={
                  minPrice === "" && maxPrice === ""
                    ? ""
                    : `${minPrice},${maxPrice}`
                }
              >
                <option value="" disabled hidden>
                  Price
                </option>
                <option value="0,1">Under 1 Cr</option>
                <option value="1,5">1 to 5 Cr</option>
                <option value="5,10">5 to 10 Cr</option>
                <option value="10,20">10 to 20 Cr</option>
                <option value="20,50">20 to 50 Cr</option>
                <option value="50,Infinity">Above 50 Cr</option>
              </select>
            </div>

            <button
              className="p-2 lg:col-span-1 bg-black bg-gradient-to-r from-black-400 via-black-500 to-black-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 text-white text-xl "
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="mt-10 grid lg:max-w-screen-2xl max-w-md grid-cols-1 gap-6 px-8 sm:max-w-lg sm:px-20 md:max-w-screen-xl md:grid-cols-2 md:px-10 lg:grid-cols-4 lg:gap-8">
        {filteredProjects.map((item, index) => {
          const pUrl = item.project_url;
          return (
            <Link to={`/${pUrl}/`} target="_top">
              <article
                key={index}
                className="mb-4 transition hover:scale-105  overflow-hidden rounded-xl border text-gray-700 shadow-md duration-500 ease-in-out hover:shadow-xl"
              >
                <div>
                  <img
                    src={item.frontImage.url}
                    alt="frontImage"
                    className="w-full h-48 object-fit "
                  />
                </div>
                <div className="p-4">
                  <div className="pb-2">
                    <span className="text-lg font-semibold hover:text-red-600  duration-500 ease-in-out">
                      {item.projectName}
                    </span>
                    <br />
                    <span className="text-sm hover:text-red-600  duration-500 ease-in-out">
                      {item.city}
                      {", "}
                      {item.state}
                    </span>
                  </div>
                  <ul className="box-border flex list-none items-center border-t border-b border-solid border-gray-200 px-0 py-2">
                    <li className="mr-4 flex items-center text-left">
                      <li className="text-left">
                        <span className="text-sm text-gray-400">
                          {item.projectAddress}
                        </span>
                        <p className="m-0 text-base font-medium">{item.type}</p>
                      </li>
                    </li>
                  </ul>
                  <ul className="m-0 flex list-none items-center justify-between px-0 pt-6 pb-0">
                    <li className="text-left">
                      <span className="text-sm font-extrabold text-red-600">
                        <span className="text-xl">₹</span>
                        {item.minPrice < 1 ? (
                          <span>{item.minPrice * 100} L</span>
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
    </>
  );
};

export default UpcomingSearch;
