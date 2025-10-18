import React, {  useEffect, useState } from "react";
import { Search as SearchIcon, ChevronDown } from "lucide-react";

const ProjectSearching = ({searchdata, sendDatatoparent, city, showPrimeOnly = false, showSearchOnly = false}) => {
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
    const currentCity = (city || "").toLowerCase();
    const filtered = (Array.isArray(searchdata) ? searchdata : []).filter((item) => {
      const itemCity = ((item.city) || (item.postProperty && item.postProperty.city) || "").toLowerCase();
      const name = (item.projectName || "").toLowerCase();
      const addr = (item.projectAddress || "").toLowerCase();
      const t = (item.type || "").toLowerCase();
      const status = (item.project_Status || item.projectStatus || "").toLowerCase();

      const okProject = project === "" || name.includes(project.toLowerCase());
      const okLocation = location === "" || addr.includes(location.toLowerCase());
      const okType = projectType === "" || t.includes(projectType.toLowerCase());
      const okStatus = projectstatus === "" || status === projectstatus.toLowerCase();
      const okMin = minPrice === "" || Number(item.minPrice) >= Number(minPrice);
      const okMax = maxPrice === "" || Number(item.maxPrice) <= Number(maxPrice);
      const okCity = !currentCity || itemCity === currentCity;

      return okProject && okLocation && okType && okStatus && okMin && okMax && okCity;
    });

    setFilteredProjects(filtered);
  };
  
  useEffect(()=>{
    sendDatatoparent(filteredProjects)
  },[filteredProjects])

  return (
    <>
      {/* Modern search ribbon (responsive) */}
      <div className="px-4 mt-4">
        <div className="sticky top-16 z-30 w-full bg-gray-50/90 supports-[backdrop-filter]:bg-white/70 backdrop-blur border border-gray-200 shadow-[0_8px_24px_rgba(0,0,0,0.06)] rounded-2xl">
          <div
            className={`grid ${
              showPrimeOnly
                ? 'grid-cols-1 md:grid-cols-5'
                : 'grid-cols-1 md:grid-cols-5'
            } gap-3 md:gap-4 items-center px-3 md:px-4 py-3 md:py-3.5`}
          >
            {/* Gurugram layout: Prime (1) | Search (3) | Button (1) */}
            {showPrimeOnly && !showSearchOnly ? (
              <>
                {/* Prime Locations (span 1) */}
                <div className="md:col-span-1 col-span-1">
                  <div className="relative">
                    <select
                      className="peer w-full appearance-none rounded-full border border-gray-200 bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-400 transition-colors"
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
                    <ChevronDown size={18} className="pointer-events-none text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 transition-transform duration-300 peer-focus:rotate-180" />
                  </div>
                </div>

                {/* Project search (span 3) */}
                <div className="md:col-span-3 col-span-1">
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full rounded-full border border-gray-200 bg-white px-4 md:px-4 py-3 pr-10 text-sm placeholder-gray-400 tracking-wide focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-400 transition-colors"
                      placeholder="Project"
                      value={project}
                      onChange={(e) => setProject(e.target.value)}
                    />
                    <SearchIcon size={18} className="text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                {/* Search button (span 1) */}
                <div className="md:col-span-1 col-span-1">
                  <button
                    className="w-full rounded-full bg-red-600 hover:bg-red-700 text-white text-sm font-semibold py-3 hover:shadow-[0_8px_24px_rgba(239,68,68,0.35)] transition-colors"
                    onClick={handleSearch}
                  >
                    Search
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Other cities: Search (span 4) | Button (span 1) */}
                <div className="col-span-1 md:col-span-4">
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full rounded-full border border-gray-200 bg-white px-4 md:px-4 py-3 pr-10 text-sm placeholder-gray-400 tracking-wide focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-400 transition-colors"
                      placeholder="Project"
                      value={project}
                      onChange={(e) => setProject(e.target.value)}
                    />
                    <SearchIcon size={18} className="text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div className="col-span-1 md:col-span-1">
                  <button
                    className="w-full rounded-full bg-red-600 hover:bg-red-700 text-white text-sm font-semibold py-3 hover:shadow-[0_8px_24px_rgba(239,68,68,0.35)] transition-colors"
                    onClick={handleSearch}
                  >
                    Search
                  </button>
                </div>
              </>
            )}

            {/* Project Status (hidden for this simplified UX) */}
            {false && (
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

            {/* Project Type (hidden) */}
            {false && (
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
                  <option value="Farm Houses">Farm Houses</option>
                </select>
              </div>
            )}

            {/* Price (hidden) */}
            {false && (
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
            )}

            
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectSearching;
