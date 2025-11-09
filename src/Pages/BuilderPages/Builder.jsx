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
      title: "DLF Homes",
      link: "/developers/dlf-homes/",
      image: "https://d16gdc5rm7f21b.cloudfront.net/100acre/builder/dlf.png",
    },
    {
      title: "Emaar India",
      link: "/developers/emaar-india/",
      image:
        "https://cdn.in.emaar.com/wp-content/themes/emaar/inc/assets/images/emaar-india-logo-en.svg",
    },
    {
      title: "Birla Estates",
      link: "/developers/birla-estate/",
      image: "https://www.birlaestates.com/images/birla-estate-logo.webp",
    },
    {
      title: "Adani Realty",
      link: "/developers/adani-realty/",
      image:
        "https://www.adanirealty.com/-/media/project/realty/header/logo.ashx",
    },
    {
      title: "Experion",
      link: "/developers/experion-developers/",
      image: "https://www.experion.co/img/logo/experion-logo.png",
    },
    {
      title: "Signature Global",
      link: "/developers/signature-global/",
      image:
        "https://d16gdc5rm7f21b.cloudfront.net/100acre/builder/signature.webp",
    },
    {
      title: "sobha",
      link: "/developers/sobha-developers/",
      image:
        "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/banner/sobha.webp",
    },
    {
      title: "Central Park",
      link: "/developers/central-park/",
      image:
        "https://d16gdc5rm7f21b.cloudfront.net/100acre/builder/centralpark.jpg",
    },
    {
      title: "Trump Towers",
      link: "/developers/trump-towers/",
      image:
        "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/banner/Trump-Tower.webp",
    },
    {
      title: "ELAN Group",
      link: "/developers/elan-group/",
      image:
        "https://d16gdc5rm7f21b.cloudfront.net/100acre/builder/elan-logo.webp",
    },
    {
      title: "Puri Constructions",
      link: "/developers/puri-developers/",
      image:
        "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/banner/puri+(1).webp",
    },

    {
      title: "M3M India",
      link: "/developers/m3m-india/",
      image: "https://d16gdc5rm7f21b.cloudfront.net/100acre/builder/m3m.webp",
    },
    {
      title: "SmartWorld Developers",
      link: "/developers/smartworld-developers/",
      image:
        "https://d16gdc5rm7f21b.cloudfront.net/100acre/builder/smartworld.webp",
    },

    {
      title: "BPTP Limited",
      link: "/developers/bptp-limited/",
      image: "https://d16gdc5rm7f21b.cloudfront.net/100acre/builder/bptp.webp",
    },
    {
      title: "Whiteland Corporation",
      link: "/developers/whiteland/",
      image:
        "https://d16gdc5rm7f21b.cloudfront.net/100acre/builder/whiteland.jpg",
    },
    {
      title: "Indiabulls Real Estate",
      link: "/developers/indiabulls-real-estate/",
      image:
        "https://d16gdc5rm7f21b.cloudfront.net/100acre/builder/indiabulls.webp",
    },
    {
      title: "AIPL",
      link: "/developers/aipl/",
      image: "https://d16gdc5rm7f21b.cloudfront.net/100acre/builder/aipl.png",
    },
    {
      title: "Shapoorji Pallonji",
      link: "/developers/shapoorji-pallonji/",
      image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/logo/f53cad64-481a-44b6-9c08-e100f5a9a81f.webp",
    },
    {
      title: "Satya Group",
      link: "/developers/satya-group/",
      image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/logo/fea4304a-c768-40cc-857e-45b68c84b2a5.webp",
    },

    {
      title: "Trevoc Group",
      link: "/developers/trevoc-group/",
      image:
        "https://d16gdc5rm7f21b.cloudfront.net/100acre/builder/trevoc.webp",
    },

    {
      title: "Aarize",
      link: "/developers/aarize-developers/",
      image:
        "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/project/tmfm0mywshnqqnmz7j9x",
    },
    {
      title: "Maxestates",
      link: "/developers/max-estates/",
      image:
        "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/logo/maxestate.webp",
    },
    {
      title: "Danube Properties",
      link: "/developers/danube-properties/",
      image:
        "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/dubai/dubai-devloper-logo/DANUBE.png",
    },
    
  ];

  return (
    <Wrapper className="section">
      <div className="container">
        <div className="flex items-center justify-between mx-3 lg:mx-3 xl:mx-14 md:mx-6 py-6">
          <div className="flex items-center">
            <div className="w-1 h-12 bg-gradient-to-b from-red-500 to-red-600 rounded-full mr-4"></div>
            <h2 className="text-2xl xl:text-4xl lg:text-3xl md:text-2xl text-center sm:text-left font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Top Real Estate Developers
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
        {/* Dynamic Developer Showcase Grid */}
        <div className="grid w-full max-w-[1400px] mx-auto grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 py-6">
          {Builder.map((project, index) => (
            <Link
              data-aos="flip-up"
              to={project.link}
              key={index}
              className="group relative bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.2)] hover:scale-105 transition-all duration-300 ease-in-out overflow-hidden ring-2 ring-red-200 hover:ring-red-400"
            >
              <div className="flex flex-col items-center justify-center p-4 h-28">
                <div className="flex items-center justify-center w-full h-20 mb-2">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-28 h-28 object-contain rounded-xl"
                    loading="lazy"
                  />
                </div>
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
    max-width: 1400px;
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

  /* Enhanced responsive grid for better tablet and mobile experience */
  @media (max-width: 1280px) {
    .container {
      max-width: 100%;
      padding: 15px;
    }
  }

  @media (max-width: 1024px) {
    .title {
      font-size: 1.75rem;
    }
  }

  @media (max-width: 768px) {
    .title {
      font-size: 1.5rem;
    }

    .container {
      padding: 10px;
    }
  }

  @media (max-width: 640px) {
    .title {
      font-size: 1.25rem;
    }
  }
`;
