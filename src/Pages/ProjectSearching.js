import React, { useContext, useState } from "react";
import { DataContext } from "../MyContext";
import { Link } from "react-router-dom";
const ProjectSearching = () => {
  const { allProjectData } = useContext(DataContext);

  const [project, setProject] = useState("");
  const [location, setLocation] = useState("");
  const [projectType, setProjectType] = useState("");
  const [price, setPrice] = useState("");

  const [filteredProjects, setFilteredProjects] = useState([]);

  const handleSearch = () => {
    const filtered = allProjectData.filter((item) => {
      return (
        (project === "" ||
          item.projectName.toLowerCase().includes(project.toLowerCase())) &&
        (location === "" ||
          item.projectAddress.toLowerCase().includes(location.toLowerCase())) &&
        (projectType === "" ||
          item.type.toLowerCase().includes(projectType.toLowerCase())) &&
        (price === "" || checkPriceRange(item.price, price)) &&
        item.city.toLowerCase() === "gurugram" 
      );
    });

    setFilteredProjects(filtered);
  };

  // Function to check price range
  const checkPriceRange = (itemPrice, selectedPrice) => {
    switch (selectedPrice) {
      case "under1cr":
        return itemPrice < 10000000; // Assuming price is in integer format
      case "1to5cr":
        return itemPrice >= 10000000 && itemPrice <= 50000000;
      case "5to10cr":
        return itemPrice > 50000000 && itemPrice <= 100000000;
      case "10to20cr":
        return itemPrice > 100000000 && itemPrice <= 200000000;
      case "20to50cr":
        return itemPrice > 200000000 && itemPrice <= 500000000;
      case "above50cr":
        return itemPrice > 500000000;
      default:
        return true;
    }
  };

  return (
    <>
      <div className="hidden lg:flex items-center px-14 bg-gray-200 pt-3 justify-center">
        <div className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-5 md:grid-cols-1 sm:grid-cols-1 gap-4 pt-6 mb-4">
            <div className="relative">
              <input
                type="text"
                className="border-[1px] border-red-500 outline-none p-2 pr-6 w-full"
                placeholder="Project"
                value={project}
                onChange={(e) => setProject(e.target.value)}
              />
              <i className="fas fa-search text-gray-500 absolute right-4 top-1/2 transform -translate-y-1/2" />
            </div>

            <div className="relative hidden lg:block">
              <select
                className="border-[1px] border-red-500 outline-none p-2 pr-8 w-full"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option value="" disabled hidden>
                  Prime Locations
                </option>
                <option value="Sohna Road">Sohna Road</option>
                <option value="Golf Course Road">Golf Course Road</option>
                <option value="MG Road">MG Road</option>
                <option value="Sohna">Sohna</option>
                <option value="Southern Peripheral Road">
                  Southern Peripheral Road
                </option>
                <option value="NH-48">NH-48</option>
                <option value="Golf Course Extn Road">
                  Golf Course Extn Road
                </option>
                <option value="New Gurgaon">New Gurgaon</option>
                <option value="Northern Peripheral Road">
                  Northern Peripheral Road
                </option>
                <option value="Dwarka Expressway">Dwarka Expressway</option>
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
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              >
                <option value="" disabled hidden>
                  Price
                </option>
                <option value="under1cr">Under 1 Cr</option>
                <option value="1to5cr">1 to 5 Cr</option>
                <option value="5to10cr">5 to 10 Cr</option>
                <option value="10to20cr">10 to 20 Cr</option>
                <option value="20to50cr">20 to 50 Cr</option>
                <option value="above50cr">Above 50 Cr</option>
              </select>
            </div>

            <button
              className="p-2 lg:col-span-1 bg-black text-white text-xl"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <section className="flex flex-col items-center bg-white">
        <div className="mt-10 grid max-w-md grid-cols-1 gap-6 px-2 sm:max-w-lg sm:px-20 md:max-w-screen-xl md:grid-cols-2 md:px-10 lg:grid-cols-4 lg:gap-8">
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
                          <p className="m-0 text-base font-medium">
                            {item.type}
                          </p>
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
      </section>
    </>
  );
};

export default ProjectSearching;
