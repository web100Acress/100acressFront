import React, { useContext } from "react";
import Nav from "../aadharhomes/Nav";
import Footer from "../Components/Actual_Components/Footer";
import { DataContext } from "../MyContext";
import { Link, useParams } from "react-router-dom";
import Navbar from "../aadharhomes/Navbar";
const GurugramPrimeLocation = () => {
  const { allProjectData } = useContext(DataContext);
  const { location } = useParams();
 
  const stringWithSpaces = location.replace(/-/g, " ");
  const words = stringWithSpaces.toLowerCase().split(" ");
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );
  const primel = capitalizedWords.join(" ");
  let filteredProjects;

  if (primel === "sohna") {
    filteredProjects = allProjectData.filter(
      (project) => project.projectAddress === "Sohna"
    );
  } else {
    filteredProjects = allProjectData.filter((project) =>
      project.projectAddress.includes(primel)
    );
  }

  let result = location
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div>
      <Navbar/>
      <section className="flex flex-col items-center pt-2">
        <h1 className="mb-3 text-center text-2xl sm:text-xl md:text-2xl lg:text-3xl text-red-600 font-bold">
          Projects in {result}
        </h1>

        <h2 className="text-sm text-center sm:text-xl md:text-xl lg:text-sm font-normal lg:mx-20 md:mx-10 mx-5 sm:mx-4">
          Looking for prime Real Estate in Gurgaon? Explore our exquisite
          collection of Residential Apartments, Commercial Space, and SCO in{" "}
          {result} Gurugram, offering unparalleled luxury and comfort. Find your
          dream property in Gurgaon today!
        </h2>
        <div className="grid max-w-md grid-cols-1 px-8 sm:max-w-lg md:max-w-screen-xl md:grid-cols-2 md:px-4 lg:grid-cols-4 sm:gap-4 lg:gap-4 w-full">
          {filteredProjects.map((item, index) => {
            const pUrl = item.project_url;
            return (
              <Link to={`/${pUrl}/`} target="_top" key={index}>
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

export default GurugramPrimeLocation;
