import React, {  useEffect, useState } from "react";
import Footer from "../Components/Actual_Components/Footer";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import Api_Service from "../Redux/utils/Api_Service";

const GurugramPrimeLocation = () => {
  const { location } = useParams();
  const [query, setQuery] = useState("");
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
  let filteredProjects;

  // if (primel === "sohna") {
  //   filteredProjects = allProjectData.filter(
  //     (project) => project.projectAddress === "Sohna"
  //   );
  // } else {
  //   filteredProjects = allProjectData.filter((project) =>
  //     project.projectAddress.includes(primel)
  //   );
  // }

  let result = location
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  
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
      <section className="flex flex-col items-center pt-8 mt-24 md:mt-24 lg:mt-2">
        <h1 className="mb-3 text-center text-2xl sm:text-xl md:text-2xl lg:text-3xl text-red-600 font-bold">
          Projects in {result}, Gurugram
        </h1>

        <h2 className="text-sm text-center sm:text-xl md:text-xl lg:text-sm font-normal lg:mx-20 md:mx-10 mx-5 sm:mx-4">
          {location === 'dwarka-expressway'
            ? 'Looking for your next investment or dream home in Gurgaon? At 100acress, we bring you a curated selection of projects in Dwarka Expressway, Gurugram, blending luxury, location, and lifestyle. Explore an impressive range of Residential Apartments, Commercial Space, and SCO developments designed to match every need and aspiration.'
            : <>Looking for prime Real Estate in Gurgaon? Explore our exquisite
          collection of Residential Apartments, Commercial Space, and SCO in{" "}
          {result} Gurugram, offering unparalleled luxury and comfort. Find your
          dream property in Gurgaon today!</>}
        </h2>
        <div className="grid max-w-md grid-cols-1 px-8 sm:max-w-lg md:max-w-screen-xl md:grid-cols-2 md:px-4 lg:grid-cols-4 sm:gap-4 lg:gap-4 w-full">
          {Primelocation.map((item, index) => {
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
