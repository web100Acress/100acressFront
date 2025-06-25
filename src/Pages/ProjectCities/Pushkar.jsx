/** @format */
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { LocationRedIcon, PropertyIcon, RupeeIcon, ShareFrameIcon } from "../../Assets/icons";
import { useSelector } from "react-redux";
import Api_service from "../../Redux/utils/Api_Service";

const Pushkar = () => {
  const cityName = "Pushkar"; // fetch by city
  const { getProjectbyState } = Api_service();

  const projects = useSelector(store => store?.stateProject?.pushkar) || [];

  const isLoading = false;
  const error = null;

  useEffect(() => {
    console.log("📦 Checking if Pushkar projects already loaded...");
    if (projects.length === 0 && !isLoading) {
      console.log(`📡 Fetching projects for city: ${cityName}`);
      getProjectbyState(cityName, 100);
    } else {
      console.log("✅ Pushkar projects already in Redux:", projects);
    }
  }, [projects.length, isLoading, cityName, getProjectbyState]);

  const handleShare = (project) => {
    if (navigator.share) {
      navigator
        .share({
          title: project?.projectName,
          text: `Check out this project: ${project.projectName}`,
          url: `${window.location.origin}/${project.project_url}`,
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.error("Error sharing:", error));
    } else {
      alert("Share functionality is not supported on this device/browser.");
    }
  };

  // Grouping (even though all will be Pushkar)
  const groupedByCity = projects.reduce((acc, project) => {
    const city = project.city || "Unknown";
    if (!acc[city]) acc[city] = [];
    acc[city].push(project);
    return acc;
  }, {});

  return (
    <div>
      <Helmet>
        <title>Projects in {cityName} - Flats, Villas, Houses</title>
      </Helmet>

      <section className="flex pt-2 flex-col items-center mt-14">
        <h1 className="mb-0 text-center text-2xl font-bold text-red-600">
          Projects in {cityName}
        </h1>
        <p className="text-sm text-center mb-4 px-4">
          Explore curated residential and commercial projects in Pushkar, Rajasthan.
        </p>

        {isLoading && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}
        {!isLoading && projects.length === 0 && (
          <div className="text-center text-lg text-gray-600 mt-8">
            No projects found for {cityName}.
          </div>
        )}

        {!isLoading && projects.length > 0 && Object.entries(groupedByCity).map(([city, list]) => (
          <div key={city} className="w-full px-4 mb-10">
            <h2 className="text-xl font-bold text-red-500 mb-4">{city}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {list.map((item, index) => (
                <Link to={`/${item.project_url || "#"}`} key={index}>
                  <article className="rounded-md border shadow hover:shadow-lg transition duration-300">
                    <div className="relative">
                      <img
                        src={item.frontImage?.url}
                        alt={item.projectName}
                        className="w-full h-48 object-cover rounded-t-md"
                      />
                      <div className="absolute top-2 right-2" onClick={() => handleShare(item)}>
                        <ShareFrameIcon />
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="text-[15px] font-semibold">{item.projectName}</h3>
                      <p className="text-sm text-gray-500">{item.city}, {item.state}</p>
                      <p className="text-[13px] text-gray-400 truncate">
                        <LocationRedIcon /> {item.projectAddress}
                      </p>
                      <div className="text-sm mt-1">
                        <PropertyIcon /> {item.type}
                      </div>
                      <div className="mt-2 font-bold text-red-600">
                        <RupeeIcon />
                        {!item.minPrice || !item.maxPrice ? "Reveal Soon" : `${item.minPrice} - ${item.maxPrice} Cr`}
                      </div>
                      <button className="mt-2 bg-red-500 text-white text-xs rounded px-3 py-1">
                        View Details
                      </button>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Pushkar;


/** @format */

// import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
// import { Helmet } from "react-helmet";
// import { LocationRedIcon, PropertyIcon, RupeeIcon, ShareFrameIcon } from "../../Assets/icons";
// import { useSelector } from "react-redux";
// import Api_service from "../../Redux/utils/Api_Service";

// const Pushkar = () => {
//   const stateName = "Rajasthan";
//   const urlCity = "pushkar";

//   const { getProjectbyState } = Api_service();

//   const projectsFromStore = useSelector(store => store?.stateProject?.[urlCity.toLowerCase()]);
//   const projects = projectsFromStore || [];

//   const isLoading = false;
//   const error = null;

//   console.log("📦 Projects From Redux Store:", projectsFromStore);
//   console.log("✅ Using projects:", projects);

//   useEffect(() => {
//     if (projects.length === 0 && !isLoading) {
//       console.log(`🚀 Triggering API call to fetch projects for state: ${stateName}`);
//       getProjectbyState(stateName, 100);
//     } else {
//       console.log("📭 Projects already available in Redux store or loading in progress");
//     }
//   }, [projects.length, isLoading, stateName, getProjectbyState]);

//   const handleShare = (project) => {
//     console.log("📤 Sharing project:", project?.projectName);
//     if (navigator.share) {
//       navigator
//         .share({
//           title: project?.projectName,
//           text: `Check out this project: ${project.projectName}`,
//           url: `${window.location.origin}/${project.project_url}`,
//         })
//         .then(() => console.log("✅ Shared successfully"))
//         .catch((error) => console.error("❌ Error sharing:", error));
//     } else {
//       console.warn("⚠️ Share functionality not supported on this device/browser.");
//       alert("Share functionality is not supported on this device/browser.");
//     }
//   };

//   const groupedByCity = projects.reduce((acc, project) => {
//     const city = project.city || "Unknown";
//     if (!acc[city]) acc[city] = [];
//     acc[city].push(project);
//     return acc;
//   }, {});

//   console.log("🏙️ Grouped Projects by City:", groupedByCity);

//   return (
//     <div>
//       <Helmet>
//         <title>Property in {stateName} - Flats, Villas, House for Sale</title>
//         <meta name="description" content={`Real Estate Properties in ${stateName} - Get Details for Residential & Commercial Properties`} />
//         <meta property="og:title" content={`Discover Best Property Projects in ${stateName} | 100acress`} />
//         <meta property="og:site_name" content="100acress" />
//         <meta property="og:type" content="website" />
//         <meta property="og:image" content="https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/logo/logo.webp" />
//         <meta property="og:url" content={`https://www.100acress.com/project-in-${urlCity}/`} />
//         <meta property="og:description" content={`Find exceptional real estate projects in ${stateName} at 100acress. Invest in the best locations and properties.`} />
//         <meta name="twitter:title" content={`Discover Best Property Projects in ${stateName} | 100acress`} />
//         <meta name="twitter:description" content={`Find exceptional real estate projects in ${stateName} at 100acress. Invest in the best locations and properties.`} />
//         <meta name="twitter:url" content="https://twitter.com/100acressdotcom" />
//         <meta name="twitter:card" content="summary" />
//       </Helmet>

//       <section className="flex pt-2 flex-col items-center mt-14">
//         <h1 className="mb-0 p-1 text-center text-2xl sm:text-xl md:text-2xl lg:text-3xl text-red-600 font-bold tracking-[0.1em]">
//           Projects in {stateName}
//         </h1>
//         <h2 className="text-sm font-semibold tracking-[0.1em]">
//           NEW RESIDENTIAL & COMMERCIAL PROJECTS IN {stateName.toUpperCase()}
//         </h2>

//         <p className="text-sm mb-4 text-center sm:text-xl md:text-xl lg:text-sm font-normal lg:mx-20 md:mx-10 mx-5 sm:mx-4 tracking-[0.1em]">
//           {stateName} is emerging as a prominent hub for real estate, offering a mix of heritage charm and modern infrastructure.
//           From luxury villas to budget apartments, commercial hubs to eco-friendly townships, {stateName} is attracting both
//           end-users and investors. Explore our handpicked property options for a secure and profitable investment in {stateName}.
//         </p>

//         {isLoading && (
//           <div className="text-center text-lg text-blue-600 mt-8">
//             Loading projects for {stateName}...
//           </div>
//         )}

//         {error && (
//           <div className="text-center text-lg text-red-600 mt-8">
//             Error: {error}
//           </div>
//         )}

//         {!isLoading && !error && projects.length === 0 && (
//           <div className="text-center text-lg text-gray-600 mt-8">
//             No projects found for {stateName}.
//           </div>
//         )}

//         {!isLoading && !error && Object.keys(groupedByCity).length > 0 && (
//           Object.entries(groupedByCity).map(([city, cityProjects]) => {
//             console.log(`📂 Rendering projects for city: ${city}`, cityProjects);
//             return (
//               <div key={city} className="w-full px-4 mb-10">
//                 <h2 className="text-xl md:text-2xl font-bold text-red-500 mb-4 text-left">{city}</h2>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//                   {cityProjects.map((item, index) => {
//                     const pUrl = item.project_url || "#";
//                     console.log("🧱 Project:", item.projectName, "| City:", item.city, "| URL:", pUrl);
//                     return (
//                       <Link to={`/${pUrl}/`} target="_top" key={index}>
//                         <article className="mb-2 overflow-hidden rounded-md border text-gray-700 shadow-md duration-500 ease-in-out hover:shadow-xl">
//                           <div className="relative flex p-3">
//                             <img
//                               src={item.frontImage?.url}
//                               alt={`property in ${item.city}`}
//                               className="w-full h-48 object-cover rounded-lg transition-transform duration-500 ease-in-out hover:scale-110"
//                             />
//                             <div className="absolute top-5 right-5" onClick={() => handleShare(item)}>
//                               <ShareFrameIcon />
//                             </div>
//                           </div>
//                           <div className="pt-0 p-3">
//                             <div className="pb-2">
//                               <span className="text-[15px] font-semibold hover:text-red-600 duration-500 ease-in-out">
//                                 {item.projectName}
//                               </span>
//                               <br />
//                               <span className="text-sm text-gray-400 hover:text-red-600 duration-500 ease-in-out">
//                                 {item.city}, {item.state}
//                               </span>
//                             </div>

//                             <ul className="box-border flex list-none items-center border-b border-solid border-gray-200 px-0 py-2">
//                               <li className="mr-4 flex items-center text-left">
//                                 <div>
//                                   <p className="m-0 text-sm font-medium ">
//                                     <PropertyIcon /> {item.type}
//                                   </p>
//                                   <span className="text-[10px] text-gray-400 block truncate hover:overflow-visible hover:whitespace-normal">
//                                     <LocationRedIcon /> {item.projectAddress}
//                                   </span>
//                                 </div>
//                               </li>
//                             </ul>

//                             <ul className="m-0 flex list-none items-center justify-between px-0 pb-0">
//                               <li className="text-left">
//                                 <span className="text-sm font-extrabold text-red-600">
//                                   <span className="text-xl"><RupeeIcon /></span>
//                                   {!item.minPrice || !item.maxPrice ? (
//                                     "Reveal Soon"
//                                   ) : (
//                                     <>
//                                       {item.minPrice < 1 ? `${item.minPrice * 100} L` : item.minPrice}
//                                       {" - "}
//                                       {item.maxPrice} Cr
//                                     </>
//                                   )}
//                                 </span>
//                               </li>
//                               <li className="text-left">
//                                 <button
//                                   type="button"
//                                   className="text-white bg-gradient-to-r from-[#C13B44] via-red-500 to-[#C13B44] hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-xs px-4 py-1.5 text-center me-2"
//                                 >
//                                   View Details
//                                 </button>
//                               </li>
//                             </ul>
//                           </div>
//                         </article>
//                       </Link>
//                     );
//                   })}
//                 </div>
//               </div>
//             );
//           })
//         )}
//       </section>
//     </div>
//   );
// };

// export default Pushkar;
