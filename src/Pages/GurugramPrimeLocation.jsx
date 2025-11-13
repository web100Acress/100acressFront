import React, {  useEffect, useState } from "react";
import Footer from "../Components/Actual_Components/Footer";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import Api_Service from "../Redux/utils/Api_Service";
import { FiSearch, FiChevronDown } from "react-icons/fi";

const GurugramPrimeLocation = () => {
  const { location } = useParams();
  const [query, setQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const {getPrimeLocation} = Api_Service();

  const SohnaRoad = useSelector(store => store?.primelocation?.sohnaroad);
  const GolfCourseRoad = useSelector(store => store?.primelocation?.golfcourseroad);
  const MgRoad = useSelector(store => store?.primelocation?.mgroad);
  const NPRRoad = useSelector(store => store?.primelocation?.nprroad);
  const DwarkaExpressway = useSelector(store => store?.primelocation?.dwarkaexpressway);
  const NewGurgaon = useSelector(store => store?.primelocation?.newgurgaon);
  const Sohna = useSelector(store => store?.primelocation?.sohna);
  const SPRRoad = useSelector(store => store?.primelocation?.sprroad);
  const NH48 = useSelector(store => store?.primelocation?.nh48);
  const GolfCourseExtensionRoad = useSelector(store => store?.primelocation?.golfcourseextensionroad);

  const PrimeLocationData = {
    'sohna-road':SohnaRoad,
    'golf-course':GolfCourseRoad,
    'mg-road': MgRoad ,
    'northern-peripheral-road' : NPRRoad ,
    'dwarka-expressway' : DwarkaExpressway,
    'new-gurgaon' : NewGurgaon,
    'sohna' : Sohna,
    'southern-peripheral-road' : SPRRoad,
    'nh-48' : NH48,
    'golf-course-extn-road' : GolfCourseExtensionRoad
  }

  const Primelocation = PrimeLocationData[location] || [];

    useEffect(() => {
      if (location) {
        const PrimelocationQueries = {
          'sohna-road': 'sohnaroad',
          'golf-course': 'golfcourseroad',
          'mg-road': 'mgroad',
          'northern-peripheral-road': 'nprroad',
          'dwarka-expressway': 'dwarkaexpressway',
          'new-gurgaon' : 'newgurgaon',
          'sohna': 'sohna',
          'southern-peripheral-road' : 'sprroad',
          'nh-48' : 'nh48',
          'golf-course-extn-road' : 'golfcourseextensionroad',
        };
  
        const queryValue = PrimelocationQueries[location.toLowerCase()];
        if (queryValue) {
          setQuery(queryValue);
        }
      }
    }, [location, query]);
  
    useEffect(() => {
      if (query) {
        getPrimeLocation(query,0);
      }
    }, [ query,getPrimeLocation]);

  const stringWithSpaces = location.replace(/-/g, " ");
  const words = stringWithSpaces.toLowerCase().split(" ");
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );
  const primel = capitalizedWords.join(" ");

  let result = location
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // Filter projects based on search and filters
  useEffect(() => {
    let filtered = [...Primelocation];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.projectName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.projectAddress?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by city
    if (selectedCity) {
      filtered = filtered.filter((item) =>
        item.city?.toLowerCase() === selectedCity.toLowerCase()
      );
    }

    // Filter by price
    if (selectedPrice) {
      const [min, max] = selectedPrice.split("-").map((v) => {
        if (v === "Infinity") return Infinity;
        return parseFloat(v);
      });
      filtered = filtered.filter((item) => {
        const itemMinPrice = parseFloat(item.minPrice) || 0;
        const itemMaxPrice = parseFloat(item.maxPrice) || 0;
        return (
          (min === "" || itemMaxPrice >= min) &&
          (max === Infinity || itemMinPrice <= max)
        );
      });
    }

    // Filter by type
    if (selectedType) {
      filtered = filtered.filter((item) =>
        item.type?.toLowerCase().includes(selectedType.toLowerCase())
      );
    }

    setFilteredProjects(filtered);
  }, [Primelocation, searchTerm, selectedCity, selectedPrice, selectedType]);

  // Use filtered projects or all projects
  const displayProjects = (searchTerm || selectedCity || selectedPrice || selectedType) 
    ? filteredProjects 
    : Primelocation;

  const handleSearch = () => {
    // Scroll to projects section after search
    setTimeout(() => {
      scrollToProjects();
    }, 100);
  };

  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects-section");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Get location-specific description
  const getLocationDescription = () => {
    if (location === 'dwarka-expressway') {
      return 'Looking for your next investment or dream home in Gurgaon? At 100acress, we bring you a curated selection of projects in Dwarka Expressway, Gurugram, blending luxury, location, and lifestyle. Explore an impressive range of Residential Apartments, Commercial Space, and SCO developments designed to match every need and aspiration.';
    }
    return `Explore the best residential and commercial projects in ${result}, Gurugram with modern amenities, prime locations, and excellent connectivity. Find your dream home in India's Millennium City.`;
  };
  
  return (
    <div>
      <Helmet>
        <title>
          {location === 'dwarka-expressway'
            ? 'New Projects in Dwarka Expressway, Gurugram – Modern Living by 100acress'
            : `Find Top Properties in ${result} - 100acress`}
        </title>
        <meta
          name="description"
          content={location === 'dwarka-expressway'
            ? 'Search projects in Dwarka Expressway, Gurugram at 100acress for Luxury Residential Apartments, Commercial Space, and SCO opportunities in key locations.'
            : `Looking for property in ${result}, Gurugram. Browse 100 acres for prime real estate options, offering unmatched amenities and perfect locations`}
        />
        <meta
          name="keywords"
          content={location === 'dwarka-expressway'
            ? 'Projects in Dwarka Expressway, Gurugram'
            : `Properties in ${result}`}
        />
        <meta property="og:title" content={`Find Top Properties in ${result} - 100acress`} />
        <meta property="og:site_name" content="100acress" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/logo/logo.webp" />
        <meta property="og:url" content={`https://www.100acress.com/property-in-gurugram/${location}/`} />
        <meta property="og:description" content={location === 'dwarka-expressway'
          ? 'Search projects in Dwarka Expressway, Gurugram at 100acress for Luxury Residential Apartments, Commercial Space, and SCO opportunities in key locations.'
          : `Looking for property in ${result}, Gurugram. Browse 100 acres for prime real estate options, offering unmatched amenities and perfect locations`} />
        <meta property="og:keywords" content={location === 'dwarka-expressway'
          ? 'Projects in Dwarka Expressway, Gurugram'
          : `Properties in ${result}`} />
        <meta name="twitter:title" content={`Find Top Properties in ${result} - 100acress`} />
        <meta name="twitter:description" content={location === 'dwarka-expressway'
          ? 'Search projects in Dwarka Expressway, Gurugram at 100acress for Luxury Residential Apartments, Commercial Space, and SCO opportunities in key locations.'
          : `Looking for property in ${result}, Gurugram. Browse 100 acres for prime real estate options, offering unmatched amenities and perfect locations`} />
        <meta name="twitter:url" content="https://twitter.com/100acressdotcom" />
        <meta name="twitter:card" content="summary" />

        <link
          rel="canonical"
          href={`https://www.100acress.com/property-in-gurugram/${location}/`}
        />
      </Helmet>

      {/* Red Banner Section */}
      <section className="bg-red-900 text-white py-4 md:py-6 lg:py-8 mt-12 md:mt-16 lg:mt-16 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-3">
            Discover Premium Projects in {result}
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base md:text-lg text-center max-w-4xl mx-auto mb-4 text-white/95 leading-relaxed">
            {getLocationDescription()}
          </p>

          {/* Search Interface */}
          <div className="max-w-4xl mx-auto">
            {/* Search Bar Row */}
            <div className="flex flex-col sm:flex-row gap-2 mb-3">
              <div className="flex-1 relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                <input
                  type="text"
                  placeholder="Explore"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch();
                    }
                  }}
                  className="w-full pl-10 pr-3 py-2 sm:py-2.5 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm sm:text-base"
                />
              </div>
              <button
                onClick={handleSearch}
                className="bg-red-700 hover:bg-red-800 text-white font-semibold px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg transition-colors duration-200 text-sm sm:text-base whitespace-nowrap"
              >
                Search
              </button>
            </div>

            {/* Filter Dropdowns Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {/* All Cities */}
              <div className="relative">
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full px-3 py-2 sm:py-2.5 bg-white text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 appearance-none cursor-pointer text-sm sm:text-base"
                >
                  <option value="">All Cities</option>
                  <option value="Gurugram">Gurugram</option>
                  {/* <option value="Delhi">Delhi</option>
                  <option value="Noida">Noida</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Goa">Goa</option>
                  <option value="Ayodhya">Ayodhya</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Panchkula">Panchkula</option>
                  <option value="Kasauli">Kasauli</option>
                  <option value="Dubai">Dubai</option>
                  <option value="Panipat">Panipat</option>
                  <option value="Karnal">Karnal</option> */}
                  {/* <option value="Jalandhar">Jalandhar</option> */}
                  {/* <option value="Sonipat">Sonipat</option> */}
                  {/* <option value="Alwar">Alwar</option> */}
                  {/* <option value="Pune">Pune</option> */}
                  {/* <option value="Pushkar">Pushkar</option> */}
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 pointer-events-none text-sm" />
              </div>

              {/* All Prices */}
              <div className="relative">
                <select
                  value={selectedPrice}
                  onChange={(e) => setSelectedPrice(e.target.value)}
                  className="w-full px-3 py-2 sm:py-2.5 bg-white text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 appearance-none cursor-pointer text-sm sm:text-base"
                >
                  <option value="">All Prices</option>
                  <option value="0-1">Under 1 Cr</option>
                  <option value="1-5">1 to 5 Cr</option>
                  <option value="5-10">5 to 10 Cr</option>
                  <option value="10-20">10 to 20 Cr</option>
                  <option value="20-50">20 to 50 Cr</option>
                  <option value="50-Infinity">Above 50 Cr</option>
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 pointer-events-none text-sm" />
              </div>

              {/* All Types */}
              <div className="relative">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-3 py-2 sm:py-2.5 bg-white text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 appearance-none cursor-pointer text-sm sm:text-base"
                >
                  <option value="">All Types</option>
                  <option value="Residential Flats">Residential Flats</option>
                  <option value="Commercial Property">Commercial Property</option>
                  <option value="SCO Plots">SCO Plots</option>
                  <option value="Residential Plots">Residential Plots</option>
                  <option value="Independent Floors">Independent Floors</option>
                  <option value="Builder Floors">Builder Floors</option>
                  <option value="Villas">Villas</option>
                  <option value="Affordable Homes">Affordable Homes</option>
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 pointer-events-none text-sm" />
              </div>
            </div>
          </div>

          {/* Down Arrow */}
          <div className="flex justify-center mt-2">
            <button
              onClick={scrollToProjects}
              className="animate-bounce text-white hover:text-red-200 transition-colors"
              aria-label="Scroll to projects"
            >
              <FiChevronDown className="text-2xl sm:text-3xl" />
            </button>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects-section" className="flex flex-col items-center pt-8 pb-8">
        {displayProjects.length > 0 ? (
          <div className="grid max-w-md grid-cols-1 px-8 sm:max-w-lg md:max-w-screen-xl md:grid-cols-2 md:px-4 lg:grid-cols-4 sm:gap-4 lg:gap-4 w-full">
            {displayProjects.map((item, index) => {
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
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 mb-4">No projects found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCity("");
                setSelectedPrice("");
                setSelectedType("");
              }}
              className="text-red-600 hover:text-red-700 font-semibold underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
};

export default GurugramPrimeLocation;
