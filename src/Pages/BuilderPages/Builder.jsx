import React, { useEffect } from "react";
import { styled } from "styled-components";
import AOS from "aos";
import "aos/dist/aos.css";
import DeveloperLogosMarquee from "../../Components/DeveloperLogosMarquee/DeveloperLogosMarquee";

const Builder = () => {
  useEffect(() => {
    AOS.init();
  }, []);

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
        {/* Dynamic Developer Showcase Marquee */}
        <DeveloperLogosMarquee />
      </div>
    </Wrapper>
  );
};

export default Builder;

const Wrapper = styled.section`
  overflow-x: hidden;
  width: 100%;
  max-width: 100vw;
  
  .dffasPL {
    padding-top: 10px;
    padding-bottom: 20px;
  }
  .container {
    max-width: 1400px;
    margin: auto;
    padding: 10px;
    overflow: hidden;
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
