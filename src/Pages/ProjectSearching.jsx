import React, {  useEffect, useState } from "react";

const ProjectSearching = ({searchdata,sendDatatoparent,city}) => {
  const [project, setProject] = useState("");
  const [projectstatus, setProjectstatus] = useState("");
  const [location, setLocation] = useState("");
  const [projectType, setProjectType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]);
 
  const handlePriceChange = (e) => {
    const [min, max] = e.target.value.split(",").map(value => value === "Infinity" ? Infinity : parseFloat(value));
  
    setMinPrice(min);
    setMaxPrice(max);
  };
  
  const handleSearch = () => {
    const filtered = searchdata.filter((item) => {
      return (
        (project === "" ||
          item.projectName.toLowerCase().includes(project.toLowerCase())) &&
        (location === "" ||
          item.projectAddress.toLowerCase().includes(location.toLowerCase())) &&
        (projectType === "" ||
          item.type.toLowerCase().includes(projectType.toLowerCase())) &&
        (projectstatus === "" ||
          item.project_Status === projectstatus) &&
        (minPrice === "" || item.minPrice >= minPrice) &&
        (maxPrice === "" || item.maxPrice <= maxPrice) &&
        item.city.toLowerCase() === "gurugram"
      );
    });
    
    setFilteredProjects(filtered);
  };
  
  useEffect(()=>{
    sendDatatoparent(filteredProjects)
  },[filteredProjects])

  return (
    <>
      {/* Desktop filter ribbon */}
      <div className="hidden lg:block px-4 mt-4">
        <div className="sticky top-16 z-30 w-full bg-white/70 supports-[backdrop-filter]:bg-white/60 backdrop-blur border border-gray-200 shadow-sm rounded-2xl">
          <div className="grid grid-cols-6 gap-3 items-center px-4 py-3">
            {/* Project search */}
            <div className="col-span-1">
              <div className="relative">
                <input
                  type="text"
                  className="w-full rounded-full border border-gray-300 bg-white px-4 py-2.5 pr-10 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                  placeholder="Project"
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                />
                <i className="fas fa-search text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Location */}
            <div className="col-span-1">
              <select
                className="w-full rounded-full border border-gray-300 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
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
                <option value="Southern Peripheral Road">Southern Peripheral Road</option>
                <option value="NH-48">NH-48</option>
                <option value="Golf Course Extn Road">Golf Course Extn Road</option>
                <option value="New Gurgaon">New Gurgaon</option>
                <option value="Northern Peripheral Road">Northern Peripheral Road</option>
                <option value="Dwarka Expressway">Dwarka Expressway</option>
              </select>
            </div>

            {/* Project Status (only for Gurugram) */}
            {city === "Gurugram" && (
              <div className="col-span-1">
                <select
                  className="w-full rounded-full border border-gray-300 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                  value={projectstatus}
                  onChange={(e) => setProjectstatus(e.target.value)}
                >
                  <option value="" disabled hidden>
                    Project Status
                  </option>
                  <option value="comingsoon">Upcoming Projects</option>
                  <option value="newlaunch">New Launch Projects</option>
                  <option value="underconstruction">Under Constructions</option>
                  <option value="readytomove">Ready To Move</option>
                </select>
              </div>
            )}

            {/* Project Type */}
            <div className="col-span-1">
              <select
                className="w-full rounded-full border border-gray-300 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
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

            {/* Price */}
            <div className="col-span-1">
              <select
                className="w-full rounded-full border border-gray-300 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
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

            {/* Search */}
            <div className="col-span-1">
              <button
                className="w-full rounded-full bg-black text-white text-sm font-semibold py-2.5 hover:bg-gray-900 transition shadow"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectSearching;
