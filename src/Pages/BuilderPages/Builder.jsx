import React, { useEffect } from "react";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const Builder = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  const Builder = [
   
   
    {
      title: "Godrej Properties",
      link: "/developers/godrej-properties/",
      image: "https://d16gdc5rm7f21b.cloudfront.net/100acre/builder/godrej.jpg",
    },
    {
      title: "Whiteland Corporation",
      link: "/developers/whiteland/",
      image:
        "https://d16gdc5rm7f21b.cloudfront.net/100acre/builder/whiteland.jpg",
    },
    {
      title: "AIPL",
      link: "/developers/aipl/",
      image: "https://d16gdc5rm7f21b.cloudfront.net/100acre/builder/aipl.png",
    },
    {
      title: "DLF Homes",
      link: "/developers/dlf-homes/",
      image: "https://d16gdc5rm7f21b.cloudfront.net/100acre/builder/dlf.png",
    },
    // {
    //     title: "EXPERION Developers",
    //     link: "/developers/experion-developers/",
    //     image: "https://d16gdc5rm7f21b.cloudfront.net/100acre/builder/experion.webp",
    // },
    {
      title: "ELAN Group",
      link: "/developers/elan-group/",
      image:
        "https://d16gdc5rm7f21b.cloudfront.net/100acre/builder/elan-logo.webp",
    },
    {
      title: "BPTP Limited",
      link: "/developers/bptp-limited/",
      image: "https://d16gdc5rm7f21b.cloudfront.net/100acre/builder/bptp.webp",
    },
    {
      title: "Birla Estates",
      link: "/developers/birla-estate/",
      image: "https://www.birlaestates.com/images/birla-estate-logo.webp",
    },
    {
      title: "Trevoc Group",
      link: "/developers/trevoc-group/",
      image:
        "https://d16gdc5rm7f21b.cloudfront.net/100acre/builder/trevoc.webp",
    },
    {
      title: "Indiabulls Real Estate",
      link: "/developers/indiabulls-real-estate/",
      image:
        "https://d16gdc5rm7f21b.cloudfront.net/100acre/builder/indiabulls.webp",
    },
    {
      title: "SmartWorld Developers",
      link: "/developers/smartworld-developers/",
      image:
        "https://d16gdc5rm7f21b.cloudfront.net/100acre/builder/smartworld.webp",
    },
    {
      title: "Signature Global",
      link: "/developers/signature-global/",
      image: "https://d16gdc5rm7f21b.cloudfront.net/100acre/builder/signature.webp",
  },
  {
      title: "M3M India",
      link: "/developers/m3m-india/",
      image: "https://d16gdc5rm7f21b.cloudfront.net/100acre/builder/m3m.webp",
  },
  {
    title: "Adani Realty",
    link: "/developers/adani-realty/",
    image:
      "https://www.adanirealty.com/-/media/project/realty/header/logo.ashx",
  },
  
  {
    title: "Emaar India",
    link: "/developers/emaar-india/",
    image:"https://cdn.in.emaar.com/wp-content/themes/emaar/inc/assets/images/emaar-india-logo-en.svg",
  },
  {
    title: "Experion",
    link: "/developers/experion-developers/",
    image: "https://www.experion.co/img/logo/experion-logo.png",
  },
    {
        title: "Central Park",
        link: "/developers/central-park/",
        image: "https://d16gdc5rm7f21b.cloudfront.net/100acre/builder/centralpark.jpg"
    },
    {
      title: "sobha",
      link: "/developers/sobha-developers/",
      image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/banner/sobha.webp",
    },
    {
      title: "Trump Towers",
      link: "/developers/trump-towers/",
      image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/banner/Trump-Tower.webp",
    },
    {
      title: "Puri",
      link: "/developers/puri-developers/",
      image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/banner/puri+(1).webp",
    },
    {
      title: "Aarize",
      link: "/developers/aarize-developers/",
      image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/project/tmfm0mywshnqqnmz7j9x",
    },
  ];

  return (
    <Wrapper className="section">
      <div className="container">
        <div className="flex items-center justify-between mx-3 lg:mx-3 xl:mx-14 md:mx-6 py-2">
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
        {/* First row: first 10 builders */}
        <div className="grid w-full max-w-[1250px] mx-auto lg:grid-cols-10 md:grid-cols-3 sm:grid-cols-2 grid-cols-3 gap-3 py-4 ">
          {Builder.slice(0, 10).map((project, index) => (
            <Link
              data-aos="flip-up"
              to={project.link}
              key={index}
              className="relative group card rounded-xl overflow-hidden shadow-lg transform transition-transform duration-300 bg-white dark:bg-gray-800 "
            >
              <div className="flex items-center justify-center w-48 h-48 p-3 gap-3">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-24 h-24 object-contain rounded-xl"
                  loading="lazy"
                />
              </div>
            </Link>
          ))}
        </div>
        {/* Second row: next 10 builders */}
        <div className="grid w-full max-w-[1250px] mx-auto lg:grid-cols-10 md:grid-cols-3 sm:grid-cols-2 grid-cols-3 gap-3 py-4 ">
          {Builder.slice(10, 20).map((project, index) => (
            <Link
              data-aos="flip-up"
              to={project.link}
              key={index + 10}
              className="relative group card rounded-xl overflow-hidden shadow-lg transform transition-transform duration-300 bg-white dark:bg-gray-800 "
            >
              <div className="flex items-center justify-center w-48 h-48 p-3 gap-3">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-24 h-24 object-contain rounded-xl"
                  loading="lazy"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

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
    justify-content: center;
    align-items: center;
    // border: 1px solid #e0e0e0;
    border-radius: 8px;
    overflow: hidden;
    text-decoration: none;
    background: #fff;
    padding: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
    height: 96px;
    width: 100%;
  }

  .card:hover {
    transform: translateY(-8px);
  }

  .card-image {
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-radius: 8px;
  }

  // .card-image:hover{
  //   transform: scale(1.06);
  // }

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
