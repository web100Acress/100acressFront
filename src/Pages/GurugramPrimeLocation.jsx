import React, {  useEffect, useState } from "react";
import Footer from "../Components/Actual_Components/Footer";
import { Link, useParams, Navigate } from "react-router-dom";
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
  const [selectedSort, setSelectedSort] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const {getPrimeLocation} = Api_Service();

  // Define valid locations
  const validLocations = [
    'sohna-road',
    'golf-course', 
    'mg-road',
    'dwarka-expressway',
    'new-gurgaon',
    'sohna',
    'southern-peripheral-road',
    'nh-48',
    'golf-course-extn-road'
  ];

  // Check if location is valid, if not redirect to 404
  if (!location || !validLocations.includes(location.toLowerCase())) {
    return <Navigate to="/page-not-found" replace />;
  }

  const primeLocations = [
    {
      name: "Projects on Sohna Road",
      href: "/property-in-gurugram/sohna-road/",
    },
    {
      name: "Projects on Golf Course",
      href: "/property-in-gurugram/golf-course/",
    },
    {
      name: "Projects on Dwarka Expressway",
      href: "/property-in-gurugram/dwarka-expressway/",
    },
    {
      name: "Projects on New Gurgaon",
      href: "/property-in-gurugram/new-gurgaon/",
    },
    {
      name: "Projects on Southern Peripheral Road",
      href: "/property-in-gurugram/southern-peripheral-road/",
    },
    {
      name: "Projects on Golf Course Extn Road",
      href: "/property-in-gurugram/golf-course-extn-road/",
    },
  ];

  const locationMeta = {
    'sohna-road': {
      title: 'Projects on Sohna Road in Gurugram | Luxury Projects',
      metadescription: 'Find Top Residencial & Commercial Projects on Sohna Road Gurugram with All Information at 100acress . Search upcoming Projects on Sohna by price and BHKs.',
      keywords: 'Projects on Sohna Road,  New projects on Sohna Road Gurgaon, Upcoming projects on Sohna Road, Buy apartment on Sohna Road'
    },
    'golf-course': {
      title: 'Projects on Golf Course Road in Gurugram | Luxury Projects',
      metadescription: 'Projects On Golf Course Road is New Launch Development, Gives A Commercial, Residencial, SCO Plots with Spacious and Luxurious Appartments and Modern Aminities.',
      keywords: 'Projects on Golf Course, Top Residential projects Golf Course Road, Flats for sale on Golf Course Road, New launch projects on Golf Course Road'
    },
    'dwarka-expressway': {
      title: 'Projects on Dwarka Expressway in Gurugram | Luxury Projects',
      metadescription: 'Search projects in Dwarka Expressway, Gurugram at 100acress for Luxury Residential Apartments, Commercial Space, and SCO opportunities in key locations.',
      keywords: 'Projects on Dwarka Expressway, Upcoming projects on Dwarka Expressway, Investment projects on Dwarka Expressway'
    },
    'new-gurgaon': {
      title: 'Projects On New Gurgaon | Luxury Projects',
      metadescription: 'Search Projects on New Gurgaon and You will Get homes spaces in safe, prime locations and Luxury Residences that fit your needs and Budgets.',
      keywords: 'Projects on New Gurgaon, Buy property on New Gurgaon, Luxury apartments on New Gurgaon, Commercial projects on New Gurgaon'
    },
    'southern-peripheral-road': {
      title: 'Projects On Southern Peripheral Road | Luxury Projects',
      metadescription: 'Buy Best Ultra Luxury Projects on Southern Peripheral Road, it offers Independent Floors 3BHK,4BHK Flats and Commercial Hubs with premium Aminities on SPR.',
      keywords: 'Projects on Southern Pheripheral Road, Top projects on SPR Gurgaon, Buy property on Southern Peripheral Road, Premium projects on Southern Peripheral Road'
    },
    'golf-course-extn-road': {
      title: 'Projects on Golf Course Extn Road in Gurugram | Luxury Flats',
      
      metadescription: 'Projects on Golf Course Extn Road Gives Best Investment Opportunities. Find luxury homes, prime locations that offer comfort, convenience, and good value.',
      keywords: 'Projects on Golf Course Extn Road, Top new launch projects on Golf Course Extension Road, Buy property on Golf Course Extension Road, Best projects on golf course extension road'
    }
  };

  const SohnaRoad = useSelector(store => store?.primelocation?.sohnaroad);
  const GolfCourseRoad = useSelector(store => store?.primelocation?.golfcourseroad);
  const MgRoad = useSelector(store => store?.primelocation?.mgroad);
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

    // Sort projects
    if (selectedSort) {
      if (selectedSort === "price-low") {
        filtered.sort((a, b) => (parseFloat(a.minPrice) || 0) - (parseFloat(b.minPrice) || 0));
      } else if (selectedSort === "price-high") {
        filtered.sort((a, b) => (parseFloat(b.maxPrice) || 0) - (parseFloat(a.maxPrice) || 0));
      } else if (selectedSort === "newest") {
        filtered.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
      } else if (selectedSort === "name") {
        filtered.sort((a, b) => (a.projectName || "").localeCompare(b.projectName || ""));
      }
    }

    setFilteredProjects(filtered);
  }, [Primelocation, searchTerm, selectedCity, selectedPrice, selectedType, selectedSort]);

  // Use filtered projects or all projects
  const displayProjects = (searchTerm || selectedCity || selectedPrice || selectedType || selectedSort) 
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
    return `Explore the best residential and commercial projects in ${result}, Gurugram with modern amenities, prime locations, and excellent connectivity. Find your dream home in India's Millennium City.`;
  };
  
  return (
    <div>
      <Helmet>
        <title>{locationMeta[location]?.title || `Find Top Properties in ${result} - 100acress`}</title>
        <meta name="description" content={locationMeta[location]?.metadescription || `Looking for property in ${result}, Gurugram. Browse 100 acres for prime real estate options, offering unmatched amenities and perfect locations`} />
        <meta name="keywords" content={locationMeta[location]?.keywords || `Properties in ${result}`} />
        <meta property="og:title" content={locationMeta[location]?.title || `Find Top Properties in ${result} - 100acress`} />
        <meta property="og:site_name" content="100acress" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/logo/logo.webp" />
        <meta property="og:url" content={`https://www.100acress.com/property-in-gurugram/${location}/`} />
        <meta property="og:description" content={locationMeta[location]?.metadescription || `Looking for property in ${result}, Gurugram. Browse 100 acres for prime real estate options, offering unmatched amenities and perfect locations`} />
        <meta property="og:keywords" content={locationMeta[location]?.keywords || `Properties in ${result}`} />
        <meta name="twitter:title" content={locationMeta[location]?.title || `Find Top Properties in ${result} - 100acress`} />
        <meta name="twitter:description" content={locationMeta[location]?.metadescription || `Looking for property in ${result}, Gurugram. Browse 100 acres for prime real estate options, offering unmatched amenities and perfect locations`} />
        <meta name="twitter:url" content="https://twitter.com/100acressdotcom" />
        <meta name="twitter:card" content="summary" />
        <link rel="canonical" href={`https://www.100acress.com/property-in-gurugram/${location}/`} />
      </Helmet>

      {/* Red Banner Section */}
      <section className="bg-gradient-to-r from-red-50 to-orange-50 border-b border-red-100 py-4 md:py-6 lg:py-8 mt-12 md:mt-16 lg:mt-16 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-3">
            Discover Premium Projects on <span className="text-red-600">{result}</span>
        </h1>

          {/* Description */}
          <p className="text-sm sm:text-base md:text-lg text-center max-w-4xl mx-auto mb-4 text-gray-700 leading-relaxed">
            {getLocationDescription()}
          </p>
          {/* Search Interface */}
          <div className="max-w-4xl mx-auto">
            {/* Search Bar Row */}
            {/* <div className="flex flex-col sm:flex-row gap-2 mb-3">
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
            </div> */}

            {/* Filter Dropdowns Row */} 
          </div>
          {/* Down Arrow */}
          {/* <div className="flex justify-center mt-2">
            <button
              onClick={scrollToProjects}
              className="animate-bounce text-white hover:text-red-200 transition-colors"
              aria-label="Scroll to projects"
            >
              <FiChevronDown className="text-2xl sm:text-3xl" />
            </button>
          </div> */}
        </div>
      </section>
      
      {/* Filter Bar */}
      <div className="bg-white border-b border-gray-200 py-3">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
            {/* Type */}
            <div className="relative w-full sm:w-auto min-w-[140px]">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-2.5 bg-white text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 appearance-none cursor-pointer text-sm border border-gray-200 shadow-sm"
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

            {/* Sort */}
            <div className="relative w-full sm:w-auto min-w-[140px]">
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="w-full px-4 py-2.5 bg-white text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 appearance-none cursor-pointer text-sm border border-gray-200 shadow-sm"
              >
                <option value="">Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest First</option>
                <option value="name">Name: A to Z</option>
              </select>
              <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 pointer-events-none text-sm" />
            </div>

            {/* Price */}
            <div className="relative w-full sm:w-auto min-w-[140px]">
              <select
                value={selectedPrice}
                onChange={(e) => setSelectedPrice(e.target.value)}
                className="w-full px-4 py-2.5 bg-white text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 appearance-none cursor-pointer text-sm border border-gray-200 shadow-sm"
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

            {/* City */}
            {/* <div className="relative w-full sm:w-auto min-w-[140px]">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-4 py-2.5 bg-white text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 appearance-none cursor-pointer text-sm border border-gray-200 shadow-sm"
              >
                <option value="">All Cities</option>
                <option value="Gurugram">Gurugram</option>
                <option value="Delhi">Delhi</option>
                <option value="Noida">Noida</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Goa">Goa</option>
                <option value="Ayodhya">Ayodhya</option>
                <option value="Panchkula">Panchkula</option>
                <option value="Kasauli">Kasauli</option>
                <option value="Dubai">Dubai</option>
                <option value="Panipat">Panipat</option>
                <option value="Karnal">Karnal</option>
                <option value="Jalandhar">Jalandhar</option>
                <option value="Sonipat">Sonipat</option>
                <option value="Alwar">Alwar</option>
                <option value="Pune">Pune</option>
                <option value="Pushkar">Pushkar</option>
              </select>
              <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 pointer-events-none text-sm" />
            </div> */}
          </div>
        </div>
      </div>
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
                      src={item.frontImage?.url || '/fallback-image.jpg'}
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

                    <ul className="box-border flex list-none items-center border-solid border-gray-200 px-0">
                      <li className="mr-4 flex items-center text-left">
                        <li className="text-left">
                          <span className="text-[16px] text-gray-400">
                            {item.projectAddress}
                          </span>
                          <p className="m-0 text-sm font-medium">{item.type}</p>
                        </li>
                      </li>
                    </ul>

                    <ul className="m-0 flex list-none items-center justify-between px-0">
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
                 setSelectedSort("");
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
