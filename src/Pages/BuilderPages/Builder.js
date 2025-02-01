import React, { useEffect } from "react";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Builder = () => {

    useEffect(() => { AOS.init(); }, []);


    const Builder = [
        {
            title: "Signature Global",
            link: "/developers/signature-global/",
            image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/builder/signature.webp",
        },
        {
            title: "M3M India",
            link: "/developers/m3m-india/",
            image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/builder/m3m.webp",
        },
        {
            title: "DLF Homes",
            link: "/developers/dlf-homes/",
            image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/builder/dlf.png",
        },
        {
            title: "EXPERION Developers",
            link: "/developers/experion-developers/",
            image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/builder/experion.webp",
        },
        {
            title: "ELAN Group",
            link: "/developers/elan-group/",
            image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/builder/elan-logo.webp",
        },
        {
            title: "BPTP Limited",
            link: "/developers/bptp-limited/",
            image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/builder/bptp.webp",
        },
        {
            title: "Adani Realty",
            link: "/developers/adani-realty/",
            image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/builder/adanireality.webp",
        },
        {
            title: "Trevoc Group",
            link: "/developers/trevoc-group/",
            image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/builder/trevoc.webp",
        },
        {
            title: "Indiabulls Real Estate",
            link: "/developers/indiabulls-real-estate/",
            image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/builder/indiabulls.webp",
        },
        {
            title: "SmartWorld Developers",
            link: "/developers/smartworld-developers/",
            image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/builder/smartworld.webp",
        },
    ]

    return (
        <Wrapper className="section">
            <div className="container">
               <div className="flex items-center justify-between mx-4 lg:mx-6 xl:mx-14 md:mx-6 py-2">
                         <div className="flex items-center ">
                           <h2 className="text-2xl xl:text-4xl lg:text-3xl md:text-2xl text-center sm:text-left">
                             Top Developers in Gurugram
                           </h2>
                         </div>
                         {/* <div className="ml-2 hidden sm:block">
                           <Link to="/top-luxury-projects/" target="_top">
                             <span className="flex items-center text-white text-sm px-3 py-0 rounded-full bg-red-600">
                               <EyeIcon />
                               <span className="ml-2">View All</span>
                             </span>
                           </Link>
                         </div> */}
                       </div>
                <div className="grid lg:grid-cols-10 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 mx-0 gap-3 pb-4 pt-4">
                    {Builder.map((project, index) => (
                        <Link
                            data-aos="flip-up"
                            to={project.link}
                            key={index}
                            className="relative group rounded-xl overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105 bg-white dark:bg-gray-800"
                        >
                            {/* Container for image and text */}
                            <div className="flex items-center p-1 gap-3">
                                {/* Image Section */}
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-24 h-24 object-contain rounded-xl hover:scale-125" // Reduced image size
                                    loading="lazy"
                                />

                                {/* Content Section */}
                                {/* <div className="flex flex-col items-start">
                                    <h3 className="text-lg font-semibold text-[#3a3535] group-hover:text-red-500 transition duration-300">
                                        {project.title}
                                    </h3>
                                    <button className="mt-2 px-2 py-2 text-sm font-medium text-white rounded-lg bg-gradient-to-r from-red-500 via-red-600 to-red-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 transition-all duration-300">
                                        View Details
                                    </button>
                                </div> */}
                            </div>

                            {/* Subtle Overlay on Hover */}
                            <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                        </Link>
                    ))}
                </div>

            </div>
        </Wrapper>
    );
}

export default Builder;

const Wrapper = styled.section`
  .dffasPL {
    padding-top: 10px;
    padding-bottom: 20px;
  }
  .container {
    max-width: 1250px;
    margin: auto;
    padding: 10px;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .title {
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
  }

  .view-all {
    text-decoration: none;
    font-size: 1rem;
    color: #ff0000;
    font-weight: 600;
  }

  .grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
  }

  .card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    overflow: hidden;
    text-decoration: none;
    background: #fff;
    padding: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
  }

  .card:hover {
    transform: translateY(-5px);
  }

  .card-image {
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-radius: 8px;
  }

  .card-image:hover{
    transform: scale(1.06);
  }

  .card-button {
    width: 100%;
    margin-top: 10px;
    border-radius:10px;
    padding: 10px 0px;
    background-color: #C13B44;
    color: white;
    font-size: 1rem;
    font-weight: bold;
    border: none;
    cursor: pointer;
    text-transform: capitalize;
    transition: background-color 0.3s ease;
  }

  .card-button:hover {
    background-color: #7C1920;
    transform: scale(1.06);
  }

  @media (max-width: 768px) {
    .title {
      font-size: 1.25rem;
    }

    .card-image {
      height: 150px;
    }

    .card-button {
      font-size: 0.9rem;
    }
  }

  }
`;
