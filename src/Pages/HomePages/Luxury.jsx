import { EyeIcon } from 'lucide-react';
import React, { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from '../../MyContext';
import { LocationRedIcon, PropertyIcon, RupeeIcon, ShareFrameIcon } from '../../Assets/icons';
import { Helmet } from 'react-helmet';

const ProjectCard = ({ project }) => {
    const pUrl = project.project_url;

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

    return (
        <article className="mb-2 overflow-hidden rounded-md border text-gray-700 shadow-md duration-500 ease-in-out hover:shadow-xl">
            <div className="relative flex p-3">
                <Link to={`/${pUrl}/`} target="_top">
                    <img
                        src={project.frontImage.url}
                        alt="property In Gurugram"
                        className="w-full h-48 object-fit rounded-lg transition-transform duration-500 ease-in-out hover:scale-110"
                        loading="lazy"
                        onError={(e) => {
                            e.target.src = 'path/to/fallback/image.jpg';
                        }}
                    />
                </Link>
                <div className="absolute top-5 right-5" onClick={() => handleShare(project)} aria-label="Share this project">
                    <ShareFrameIcon />
                </div>
            </div>
            <div className="pt-0 p-3">
                <div className="pb-2">
                    <span className="text-[15px] font-semibold hover:text-red-600 duration-500 ease-in-out">
                        {project.projectName}
                    </span>
                    <br />
                    <span className="text-sm text-gray-400 hover:text-red-600 duration-500 ease-in-out">
                        {project.city}, {project.state}
                    </span>
                </div>
                <ul className="box-border flex list-none items-center border-b border-solid border-gray-200 px-0 py-2">
                    <li className="mr-4  items-center text-left">
                        <p className="m-0 text-sm font-medium">
                            <PropertyIcon /> {project.type}
                        </p>
                        <span className="text-[10px] text-gray-600 block truncate text-sm hover:overflow-visible hover:white-space-normal hover:bg-white">
                            <LocationRedIcon /> {project.projectAddress}
                        </span>
                    </li>
                </ul>
                <ul className="m-0 flex list-none items-center justify-between px-0 pb-0">
                    
                    <li className="text-left">
                        <span className="text-sm font-extrabold text-red-600">
                            <span className="text-xl"><RupeeIcon /></span>
                            {project.minPrice < 1 ? (
                                <>{project.minPrice * 100} L</>
                            ) : (
                                <>{project.minPrice}</>
                            )}
                            {" - "}
                            {project.maxPrice} Cr
                        </span>
                    </li>
                    <Link to={`/${pUrl}/`} target="_top">
                        <li className="text-left">
                            <button
                                type="button"
                                className="text-white bg-gradient-to-r from-[#C13B44] via-red-500 to-[#C13B44] hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-xs px-4 py-1.5 text-center me-2"
                            >
                                View Details
                            </button>
                        </li>
                    </Link>
                </ul>
            </div>
        </article>
    );
};

const Luxury = () => {
    const { LuxuryProjects } = useContext(DataContext);

    const memoizedLuxuryProjects = useMemo(() => {
        return LuxuryProjects.slice(0, 4).map((item, index) => (
            <ProjectCard key={index} project={item} />
        ));
    }, [LuxuryProjects]);

    return (
        <div>
        <Helmet>
        <title>
          Luxury Projects in Gurugram –  ultra Luxury Homes
        </title>
        <meta
          name="description"
          content={`Luxury Projects are renowned for ideal locations, impeccable quality, and desirable amenities.`}
        />
        <link
          rel="canonical"
          href={`https://www.100acress.com/top-luxury-projects/`}
        />
      </Helmet>

        <div data-aos="zoom-in-down" className="py-3">
            <div className="flex items-center justify-between mx-6 lg:mx-6 xl:mx-14 md:mx-6 py-2">
                <div className="flex items-center">
                    <h2 className="text-2xl xl:text-4xl lg:text-3xl md:text-2xl text-center sm:text-left">
                        
                        
                        
                    </h2>
                </div>
                <div className="ml-2 hidden sm:block">
                    <Link to="/top-luxury-projects/" target="_top">
                        <span className="flex items-center text-white text-sm px-3 py-0 rounded-full bg-red-600">
                            <EyeIcon />
                            <span className="ml-2">View All</span>
                        </span>
                    </Link>
                </div>
            </div>
            <section className="flex flex-col items-center bg-white mt-3">
                <div className="grid max-w-md grid-cols-1 px-8 sm:max-w-lg md:max-w-screen-xl md:grid-cols-2 md:px-4 lg:grid-cols-4 sm:gap-4 lg:gap-4 w-full">
                    {memoizedLuxuryProjects}
                </div>
            </section>
        </div>
        </div>

    );
};

export default Luxury;