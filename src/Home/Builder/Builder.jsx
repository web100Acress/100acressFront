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
        <div className="flex flex-col items-center justify-center text-center mx-auto mb-4 mt-6 px-4">
          <h2 className="text-2xl xl:text-4xl lg:text-3xl md:text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-3">
            Top Real Estate Developers
          </h2>
          <div className="h-1.5 w-32 bg-gradient-to-r from-red-500 to-red-600 rounded-full"></div>
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
