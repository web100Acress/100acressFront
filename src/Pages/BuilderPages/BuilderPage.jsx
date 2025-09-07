import React, {useEffect, useState, useMemo, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import Footer from "../../Components/Actual_Components/Footer";
import { Helmet } from "react-helmet";
import { LocationRedIcon, PropertyIcon, RupeeIcon, ShareFrameIcon } from "../../Assets/icons";
import { useSelector, useDispatch } from "react-redux";
import Api_Service from "../../Redux/utils/Api_Service";
import { orderProjects, hasCustomOrder, getCustomOrder, getRandomSeed } from "../../Utils/ProjectOrderUtils";
import { syncProjectOrdersFromServer } from "../../Redux/slice/ProjectOrderSlice";
import { isFavorite, toggleFavorite, subscribe, hydrateFavoritesFromServer } from "../../Utils/favorites";

const BuilderPage = React.memo(() => {
    const { builderName } = useParams(); 
    const dispatch = useDispatch();
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [isSynced, setIsSynced] = useState(false);
    const [favoriteIds, setFavoriteIds] = useState([]);
    const {getProjectbyBuilder} = Api_Service();
    
    // Memoize sync function to prevent infinite re-renders
    const memoizedSyncProjectOrders = useCallback(() => {
      return dispatch(syncProjectOrdersFromServer());
    }, [dispatch]);
    
    // Subscribe to favorites to trigger re-render on updates
    useEffect(() => {
      hydrateFavoritesFromServer();
      const unsub = subscribe((ids) => setFavoriteIds(ids || []));
      return () => { if (typeof unsub === 'function') unsub(); };
    }, []);

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

  const onToggleFavorite = (project) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const snapshot = {
      title: project.projectName,
      image: project.frontImage?.url || project.frontImage?.cdn_url,
      priceText:
        typeof project.minPrice !== 'undefined' && typeof project.maxPrice !== 'undefined'
          ? `${project.minPrice} - ${project.maxPrice} Cr`
          : '',
      url: `/${project.project_url}/`,
      city: project.city,
      maxPrice: project.maxPrice,
      minPrice: project.minPrice,
    };
    
    // Get authentication state from localStorage since we don't have access to AuthContext here
    const isAuthenticated = !!localStorage.getItem('myToken');
    
    if (!isAuthenticated) {
      if (typeof window.showAuthModal === 'function') {
        window.showAuthModal();
      }
      if (window.toast) {
        window.toast.error('Please login to save properties');
      }
      return;
    }
    
    toggleFavorite(project._id || project.id || project.slug, snapshot, isAuthenticated);
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

  // Sync project orders from server on component mount
  useEffect(() => {
    console.log('🔍 BuilderPage - Syncing project orders from server...');
    setIsSynced(false);
    
    memoizedSyncProjectOrders()
      .then((result) => {
        console.log('🔍 BuilderPage - Sync result:', result);
        setIsSynced(true);
        console.log('🔍 BuilderPage - Project orders synced successfully');
      })
      .catch((error) => {
        console.error('🔍 BuilderPage - Error syncing project orders:', error);
        setIsSynced(false);
      });
  }, [memoizedSyncProjectOrders]);

  // Auto-sync every 30 seconds to keep updated
  useEffect(() => {
    const syncInterval = setInterval(() => {
      console.log('🔍 BuilderPage - Auto-syncing project orders...');
      memoizedSyncProjectOrders()
        .then((result) => {
          console.log('🔍 BuilderPage - Auto-sync result:', result);
          setIsSynced(true);
        })
        .catch((error) => {
          console.error('🔍 BuilderPage - Auto-sync failed:', error);
          setIsSynced(false);
        });
    }, 30000); // Sync every 30 seconds

    return () => clearInterval(syncInterval);
  }, [memoizedSyncProjectOrders]);

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
          {formattedBuilderName} Projects in Gurugram – Luxury Homes
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

      <section className="w-full flex flex-col items-center pt-20 px-4 md:px-6 scroll-mt-16">
              <h1 className="w-full max-w-screen-xl text-center text-2xl sm:text-3xl md:text-4xl lg:text-4xl text-red-600 font-bold px-4 py-6 break-words">
                {formattedBuilderName} Projects in Gurugram
              </h1>
              
              {/* Sync Status Indicator */}
              {/* <div className="mb-4 text-center">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  isSynced 
                    ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' 
                    : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                }`}>
                  {isSynced ? '✅ Live Order  ' : '🔄 Syncing...'}
                </span>
                <p className="text-xs text-gray-500 mt-1">
                  {isSynced ? 'Project order synced with admin panel' : 'Updating project order...'}
                </p>
              </div>  
               */}
      
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
                              src={item.frontImage?.url || item.frontImage?.cdn_url || '/placeholder-image.jpg'}
                              alt="property In Gurugram"
                              className="w-full h-48 object-fit rounded-lg transition-transform duration-500 ease-in-out hover:scale-110"
                            />
                          </Link>
                          <div className="absolute top-5 right-5 flex gap-2">
                            <button
                              type="button"
                              onClick={onToggleFavorite(item)}
                              className="w-8 h-8 rounded-full bg-white/90 backdrop-blur hover:bg-white shadow flex items-center justify-center"
                              aria-label={isFavorite(item._id || item.id || item.slug) ? "Remove from favorites" : "Add to favorites"}
                            >
                              {isFavorite(item._id || item.id || item.slug) ? (
                                // Filled heart
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ef4444" className="w-5 h-5">
                                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.188 3 12.9 3 10.25 3 7.902 4.902 6 7.25 6c1.273 0 2.49.495 3.39 1.384L12 8.743l1.36-1.36A4.75 4.75 0 0116.75 6C19.098 6 21 7.902 21 10.25c0 2.65-1.688 4.938-3.989 7.257a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.218l-.022.012-.007.003a.75.75 0 01-.666 0z" />
                                </svg>
                              ) : (
                                // Outline heart
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="1.8" className="w-5 h-5">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 10.25c0 2.65-1.688 4.938-3.989 7.257a25.175 25.175 0 01-4.244 3.17l-.383.218-.022.012-.007.003-.007-.003-.022-.012-.383-.218a25.18 25.18 0 01-4.244-3.17C4.688 15.188 3 12.9 3 10.25 3 7.902 4.902 6 7.25 6c1.273 0 2.49.495 3.39 1.384L12 8.743l1.36-1.36A4.75 4.75 0 0116.75 6C19.098 6 21 7.902 21 10.25z" />
                                </svg>
                              )}
                            </button>
                            <button
                              type="button"
                              onClick={() => handleShare(item)}
                              className="w-8 h-8 rounded-full bg-white/90 backdrop-blur hover:bg-white shadow flex items-center justify-center"
                              aria-label="Share"
                            >
                              <ShareFrameIcon />
                            </button>
                          </div>
                        </div>
                        <div className="pt-0 p-3">
                          <div className="pb-2">
                            <span className="text-[15px] font-semibold hover:text-red-600 duration-500 ease-in-out font-['Rubik',sans-serif]">
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
