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
      <div className="hidden lg:flex items-center px-10 bg-gray-200  justify-center rounded-full mt-4">
        <div className="w-full">
        <div className={`grid grid-cols-1 ${city === "Gurugram" ? "lg:grid-cols-6" : "lg:grid-cols-5"} md:grid-cols-1 sm:grid-cols-1 gap-4 pt-6 mb-4`}>
            <div className="relative">
              <input
                type="text"
                className="border-[1px] border-[#C13B44] rounded-3xl outline-none p-2 pr-6 w-full"
                placeholder="Project"
                value={project}
                onChange={(e) => setProject(e.target.value)}
              />
              <i className="fas fa-search text-gray-500 absolute right-4 top-1/2 transform -translate-y-1/2" />
            </div>

            <div className="relative hidden lg:block">
              <select
                className="border-[1px] border-[#C13B44] rounded-3xl outline-none p-2 pr-8 w-full"
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
            {city === "Gurugram" && (<div className="relative hidden lg:block">
              <select
                className="border-[1px] border-[#C13B44] rounded-3xl outline-none p-2 pr-8 w-full"
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
            </div>)}

            <div className="relative sm:col-span-1 hidden lg:block">
              <select
                className="border-[1px] border-[#C13B44] rounded-3xl outline-none p-2 pr-8 w-full"
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
                className="border-[1px] border-[#C13B44] rounded-3xl outline-none p-2 pr-8 w-full"
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

            <div className="relative sm:col-span-1 hidden lg:block">
            <button
              className="p-1 lg:col-span-1 bg-black rounded-3xl text-white text-xl w-full"
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
