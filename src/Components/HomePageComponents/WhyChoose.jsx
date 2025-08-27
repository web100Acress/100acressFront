import React, { useState, useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";
import CountUp from "react-countup";

import {
  MonthlyVisitIcon,
  AwardsIcon,
  ResidentialProjectIcon,
  CommercialProjectIcon,
  ScoPlotsIcon,
  PlotnFloorIcon,
} from "../../Assets/icons"; // Ensure these paths are correct

function WhyChoose() {
  const [expanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 425);

  const toggleParagraph = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const monthlydata = [
    {
      title: "Residential Projects",
      count: 1600,
      suffix: "+",
      icon: <ResidentialProjectIcon />,
    },
    {
      title: "Commercial Projects",
      count: 900,
      suffix: "+",
      icon: <CommercialProjectIcon />,
    },
    { title: "SCO Plots", count: 90, suffix: "+", icon: <ScoPlotsIcon /> },
    {
      title: "Plots & Floors",
      count: 400,
      suffix: "+",
      icon: <PlotnFloorIcon />,
    },
    {
      title: "Monthly Visitors",
      count: 2.45,
      suffix: "L+",
      decimals: 2,
      icon: <MonthlyVisitIcon />,
    },
    { title: "Awards", count: 1000, suffix: "+", icon: <AwardsIcon /> },
  ];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 425);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const paragraphText = `100acress is transforming the real estate landscape by connecting thousands to their ideal homes, workspaces, and more. Emphasizing a warm, family-like approach, the platform is dedicated to offering personalized services and fostering a supportive environment. To ensure trustworthiness and accuracy, 100acress diligently verifies property listings, reducing fraud and enhancing reliability. Known for its vast database, the platform serves as a crucial resource for those looking to buy, sell, or rent properties. By maintaining high standards and a user-centered focus, 100acress stands out as a valuable tool in the real estate market, simplifying the property search process.`;

  const truncateText = (text, limit) => {
    const words = text.split(" ");
    return words.length > limit
      ? words.slice(0, limit).join(" ") + "..."
      : text;
  };

  return (
    <section className="font-sans px-4 sm:px-6 lg:px-12 py-16 max-w-[1250px] mx-auto">
      <div className="flex flex-col md:flex-row items-center bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Left Section */}
        <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center bg-gradient-to-r  to-white">
          <p
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-5 leading-tight text-black"
            data-aos="fade-right"
          >
            Why 100acress.com?
          </p>

          <div className="text-justify text-gray-700 leading-relaxed text-base">
            <p className="mb-6">
              {isMobile
                ? expanded
                  ? paragraphText
                  : truncateText(paragraphText, 25)
                : paragraphText}
            </p>
            {isMobile && (
              <button
                className="inline-flex items-center justify-center px-6 py-2 border border-transparent text-sm font-medium rounded-full shadow-lg text-white
                           bg-gradient-to-r from-[#FF9933] to-[#138808] hover:from-[#e67e22] hover:to-[#107c07]
                           focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF9933] transition duration-300 ease-in-out transform hover:scale-105"
                onClick={toggleParagraph}
              >
                {expanded ? "Read less" : "Read more"}
              </button>
            )}
            <p className="mt-8">
              <span className="text-gray-600 font-medium">
                Rajesh Aggarwal,{" "}
              </span>
              <span className="font-bold text-xl sm:text-2xl text-black">
                Founder
              </span>
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 p-6 md:p-12 bg-white">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {monthlydata.map((data, index) => (
              <div
                data-aos="zoom-in"
                data-aos-delay={index * 150 + 200}
                key={index}
                className="relative bg-white p-6 rounded-2xl shadow-lg flex flex-col items-start justify-center
                           hover:shadow-2xl hover:shadow-[#FF9933]/40 border border-gray-100 hover:border-[#FF9933]/50
                           transition-all duration-300 ease-in-out transform hover:-translate-y-2"
              >
                <div
                  className="absolute -top-7 left-5 p-3 rounded-full bg-white backdrop-blur-sm
                             shadow-xl flex items-center justify-center"
                >
                  <div className="text-[#FF9933] text-3xl">{data.icon}</div>
                </div>
                <div className="mt-8 text-gray-900 font-extrabold text-4xl leading-none tracking-tight">
                  <CountUp
                    end={data.count}
                    duration={3}
                    decimals={data.decimals || 0}
                    suffix={data.suffix}
                    enableScrollSpy={true}
                    scrollSpyOnce={true}
                  />
                </div>
                <p className="mt-2 text-gray-600 text-sm md:text-base font-medium">
                  {data.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyChoose;
