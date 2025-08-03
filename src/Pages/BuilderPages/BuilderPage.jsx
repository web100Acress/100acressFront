import React, {useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import Footer from "../../Components/Actual_Components/Footer";
import { Helmet } from "react-helmet";
import { LocationRedIcon, PropertyIcon, RupeeIcon, ShareFrameIcon } from "../../Assets/icons";
import { useSelector } from "react-redux";
import Api_Service from "../../Redux/utils/Api_Service";
import { orderProjects, hasCustomOrder, getCustomOrder, getRandomSeed } from "../../Utils/ProjectOrderUtils";
// Removed unused imports as they are not used in this file

const BuilderPage = React.memo(() => {
    const { builderName } = useParams(); 
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const {getProjectbyBuilder} = Api_Service();
    
    // Get builder projects from Redux store
    const SignatureBuilder = useSelector(store => store?.builder?.signatureglobal);
    const M3M = useSelector(store => store?.builder?.m3m);
    const dlfAllProjects= useSelector(store => store?.builder?.dlf);
    const Experion = useSelector(store => store?.builder?.experion);
    const Elan = useSelector(store => store?.builder?.elan);
    const BPTP = useSelector(store => store?.builder?.bptp);
    const Adani = useSelector(store => store?.builder?.adani);
    const SmartWorld = useSelector(store => store?.builder?.smartworld);
    const Trevoc = useSelector(store => store?.builder?.trevoc);
    const IndiaBulls = useSelector(store => store?.builder?.indiabulls);
    const centralpark = useSelector(store => store?.builder?.centralpark);
    const emaarindia = useSelector(store => store?.builder?.emaarindia);
    const godrej = useSelector(store => store?.builder?.godrej);
    const whiteland = useSelector(store => store?.builder?.whiteland);
    const aipl = useSelector(store => store?.builder?.aipl);
    const birla = useSelector(store => store?.builder?.birla);
    const sobha = useSelector(store => store?.builder?.sobha);
    const trump = useSelector(store => store?.builder?.trump);
    const puri = useSelector(store => store?.builder?.puri);
    const aarize = useSelector(store => store?.builder?.aarize);
    
    // Get project order state from Redux store
    const customOrders = useSelector(store => store?.projectOrder?.customOrders);
    const buildersWithCustomOrder = useSelector(store => store?.projectOrder?.buildersWithCustomOrder);
    const randomSeeds = useSelector(store => store?.projectOrder?.randomSeeds);

  const buildersData = {
    'signature-global': SignatureBuilder,
    'm3m-india': M3M,
    'dlf-homes': dlfAllProjects,
    'experion-developers': Experion,
    'elan-group': Elan,
    'bptp-limited':BPTP,
    'adani-realty':Adani,
    'smartworld-developers':SmartWorld, 
    'trevoc-group':Trevoc,
    'indiabulls-real-estate':IndiaBulls ,
    'central-park':centralpark,
    'emaar-india' : emaarindia,
    'godrej-properties' : godrej,
    'whiteland' : whiteland,
    'aipl' : aipl,
    'birla-estate': birla,
    'sobha-developers': sobha,
    'trump-towers': trump,
    'puri-developers': puri,
    'aarize-developers': aarize
  };
  const builderProjects = buildersData[builderName] || [];

  const filteredBuilderProjects = builderName === 'birla-estate'
    ? (builderProjects || []).filter(
        p => p.builderName && p.builderName.trim().toLowerCase().includes('birla estate') &&
             (!p.type || p.type.toLowerCase() !== 'rental') &&
             (!p.project_Status || p.project_Status.toLowerCase() !== 'rental')
      )
    : builderProjects;

  // Order projects based on custom order or random order
  const orderedProjects = useMemo(() => {
    const hasCustomOrderDefined = hasCustomOrder(builderName, buildersWithCustomOrder);
    const customOrder = getCustomOrder(builderName, customOrders);
    const randomSeed = getRandomSeed(builderName, randomSeeds);
    
    console.log('🔍 BuilderPage - hasCustomOrderDefined:', hasCustomOrderDefined);
    console.log('🔍 BuilderPage - customOrder:', customOrder);
    console.log('🔍 BuilderPage - randomSeed:', randomSeed);
    console.log('🔍 BuilderPage - filteredBuilderProjects length:', filteredBuilderProjects.length);
    
    return orderProjects(
      filteredBuilderProjects, 
      builderName, 
      customOrder, 
      hasCustomOrderDefined, 
      randomSeed
    );
  }, [filteredBuilderProjects, builderName, buildersWithCustomOrder, customOrders, randomSeeds]);
  console.log('🔍 builderProjects:', builderProjects);
  console.log('🔍 filteredBuilderProjects:', filteredBuilderProjects);
  console.log('🔍 orderedProjects:', orderedProjects);
  console.log('🔍 builderName from URL:', builderName);
  console.log('🔍 query value:', query);
  console.log('🔍 hasCustomOrder:', hasCustomOrder(builderName, buildersWithCustomOrder));
  console.log('🔍 customOrder:', getCustomOrder(builderName, customOrders));
  console.log('🔍 Redux customOrders:', customOrders);
  console.log('🔍 Redux buildersWithCustomOrder:', buildersWithCustomOrder);
  console.log('🔍 Builder name for Redux lookup:', builderName);
  console.log('🔍 Available builder keys in customOrders:', Object.keys(customOrders));
  console.log('🔍 Available builder keys in buildersWithCustomOrder:', Object.keys(buildersWithCustomOrder));

  const handleShare = (project) => {
    if (navigator.share) {
      navigator
        .share({
          title: project?.projectName,
          text: `Check out this project: ${project.projectName}`,
          url: `${window.location.origin}/${project.project_url}`,
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.log("Error sharing:", error));
    } else {
      alert("Share functionality is not supported on this device/browser.");
    }
  };

  const formatBuilderName = (name) => {
    return name
      .split('-') 
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) 
      .join(' '); 
  };
  
  const formattedBuilderName = formatBuilderName(builderName);
  
  useEffect(() => {
    if (builderName) {
      const builderQueries = {
        'signature-global': 'Signature Global',
        'm3m-india': 'M3M India',
        'dlf-homes': 'DLF Homes',
        'experion-developers': 'Experion Developers',
        'elan-group': 'Elan Group',
        'bptp-limited' : 'BPTP LTD',
        'adani-realty': 'Adani Realty',
        'trevoc-group' : 'Trevoc Group',
        'indiabulls-real-estate' : 'Indiabulls',
        'smartworld-developers' : 'Smartworld',
        'central-park' : 'Central Park',
        'emaar-india' : 'Emaar India',
        'godrej-properties' : 'Godrej Properties',
        'whiteland' : 'Whiteland Corporation',
        'aipl' : 'AIPL',
        'birla-estate': 'Birla Estates',
        'sobha-developers': 'Sobha',
        'trump-towers': 'Trump Towers',
        'puri-developers': 'Puri Constructions',
        'aarize-developers': 'Aarize Group'
      };

      const queryValue = builderQueries[builderName.toLowerCase()];
      if (queryValue) {
        setQuery(queryValue);
      }
    }
  }, [builderName, query]);

  useEffect(() => {
    if (query) {
      console.log('🔍 Fetching projects for builder:', query);
      setLoading(true);
      Promise.resolve(getProjectbyBuilder(query, 0)).finally(() => setLoading(false));
    }
  }, [query, getProjectbyBuilder]);

  // Force re-render when Redux state changes
  useEffect(() => {
    console.log('🔍 BuilderPage re-rendering due to Redux state change');
  }, [customOrders, buildersWithCustomOrder, randomSeeds]);

  // Render loading state if data is not yet available
  if (loading) {
    return <div className="flex justify-center items-center min-h-[40vh] text-xl font-semibold text-red-600">Loading projects...</div>;
  }

  return (
    <div>
      <Helmet>
        <title>
          {formattedBuilderName} Projects in Gurugram – {formattedBuilderName} Luxury Homes
        </title>
        <meta
          name="description"
          content={`${builderName} Projects are renowned for ideal locations, impeccable quality, and desirable amenities.`}
        />
        <link
          rel="canonical"
          href={`https://www.100acress.com/developers/${builderName.toLowerCase()}/`}
        />
      </Helmet>

      <section className="flex pt-2 flex-col items-center mt-12">
              <h1 className="mb-3 p-3 text-center text-2xl sm:text-xl md:text-2xl lg:text-3xl text-red-600 font-bold">
              {formattedBuilderName} Projects in Gurugram
              </h1>
              
      
              <div className="grid max-w-md  grid-cols-1 px-8 sm:max-w-lg md:max-w-screen-xl md:grid-cols-2 md:px-4 lg:grid-cols-4 sm:gap-4 lg:gap-4 w-full">
                {orderedProjects?.map((item, index) => {
                  const pUrl = item.project_url;
                  return (
                    <span key={item._id || item.id || index}>
      
                      <article
                        className="mb-2 overflow-hidden rounded-md  border text-gray-700 shadow-md duration-500 ease-in-out hover:shadow-xl"
                      >
                        <div className="relative flex p-3">
                          <Link to={`/${pUrl}/`} target="_top">
      
                            <img
                              src={item.frontImage.url}
                              alt="property In Gurugram"
                              className="w-full h-48 object-fit rounded-lg transition-transform duration-500 ease-in-out hover:scale-110"
                            />
                          </Link>
                          <div className="absolute top-5 right-5"
                            onClick={() => handleShare(item)}
                          >
                            <ShareFrameIcon />
                          </div>
                        </div>
                        <div className="pt-0 p-3">
                          <div className="pb-2">
                            <span className="text-[15px] font-semibold hover:text-red-600  duration-500 ease-in-out">
                              {item.projectName}
                            </span>
                            <br />
                            <span className="text-sm text-gray-400 hover:text-red-600  duration-500 ease-in-out">
                              {item.city}, {item.state}
                            </span>
                          </div>
      
                          <ul className="box-border flex list-none items-center border-b border-solid border-gray-200 px-0 py-2">
                            <li className="mr-4 flex items-center text-left">
                              <li className="text-left">
                                <p className="m-0 text-sm font-medium ">
                                  <PropertyIcon />{" "}{item.type}
                                </p>
                                <span className="text-[10px] text-gray-600 block truncate text-sm hover:overflow-visible hover:white-space-normal hover:bg-white">
                                  <LocationRedIcon />{" "}{item.projectAddress}
                                </span>
      
                              </li>
                            </li>
                          </ul>
      
                          <ul className="m-0  flex list-none items-center justify-between px-0  pb-0">
                            <li className="text-left">
                              <span className="text-sm font-extrabold text-red-600">
                                <span className="text-xl"><RupeeIcon /></span>
                                {item.minPrice < 1 ? (
                                  <>{item.minPrice * 100} L</>
                                ) : (
                                  <>{item.minPrice}</>
                                )}
                                {" - "}
                                {item.maxPrice} Cr
                              </span>
                            </li>
                            <Link to={`/${pUrl}/`} target="_top">
                              <li className="text-left">
                                <button
                                  type="button"
                                  className="text-white bg-gradient-to-r from-[#C13B44] via-red-500 to-[#C13B44] hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-xs px-4 py-1.5  text-center me-2"
                                >
                                  View Details
                                </button>
                              </li>
                            </Link>
                          </ul>
                        </div>
                      </article>
                    </span>
                  );
                })}
              </div>
      
      </section>
      <Footer />
    </div>
  );
});

export default BuilderPage;
