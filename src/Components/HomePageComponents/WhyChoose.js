import React, { useState, useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";

import {
  MonthlyVisitIcon,
  AwardsIcon,
  ResidentialProjectIcon,
  CommercialProjectIcon,
  ScoPlotsIcon,
  PlotnFloorIcon,
} from "../../Assets/icons";

AOS.init();

function WhyChoose() {
  const [expanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 425);

  const toggleParagraph = () => {
    setExpanded(!expanded);
  };

  const monthlydata = [
    { title: "Residential Projects", count: "1245+", icon: <ResidentialProjectIcon /> },
    { title: "Commercial Projects", count: "550+", icon: <CommercialProjectIcon /> },
    { title: "SCO Plots", count: "54+", icon: <ScoPlotsIcon /> },
    { title: "Plots & Floors", count: "250+", icon: <PlotnFloorIcon /> },
    { title: "Monthly Visitors", count: "2.25L+", icon: <MonthlyVisitIcon /> },
    { title: "Awards", count: "300+", icon: <AwardsIcon /> },
  ];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 425);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const paragraphText = `100acress is transforming the real estate landscape by connecting thousands to their ideal homes, workspaces, and more. Emphasizing a warm, family-like approach, the platform is dedicated to offering personalized services and fostering a supportive environment. To ensure trustworthiness and accuracy, 100acress diligently verifies property listings, reducing fraud and enhancing reliability. Known for its vast database, the platform serves as a crucial resource for those looking to buy, sell, or rent properties. By maintaining high standards and a user-centered focus, 100acress stands out as a valuable tool in the real estate market, simplifying the property search process.`;

  const truncateText = (text, limit) => {
    const words = text.split(" ");
    return words.length > limit ? words.slice(0, limit).join(" ") + "..." : text;
  };

  return (
    <section className="font-sans px-4 sm:px-6 lg:px-12 py-8">
      <div className="flex flex-col md:flex-row items-center bg-white">
        {/* Left Section */}
        <div data-aos="zoom-in"
          data-aos-delay="200" className="w-full md:w-1/2 p-4">
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-4">
            Why 100acress.com?
          </p>
          <div className="text-justify text-gray-700">
            <p className="mb-4">
              {isMobile ? (expanded ? paragraphText : truncateText(paragraphText, 18)) : paragraphText}
            </p>
            {isMobile && (
              <button
                className="rounded-md mt-2 px-4 justify-center py-2 bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 text-white text-sm sm:text-base ml-auto mr-auto transition duration-200"
                onClick={toggleParagraph}
              >
                {expanded ? "Read less" : "Read more"}
              </button>
            )}
            <p className="mt-4 text-red-500 font-medium">Rajesh Aggarwal, Founder</p>
          </div>
        </div>

        {/* Right Section */}
        <div data-aos="zoom-in" data-aos-delay="200" className="w-full md:w-1/2 p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {monthlydata.map((data, index) => (
              <div
                key={index}
                className="relative bg-white shadow rounded-lg pl-4 flex flex-col justify-center items-start"
              >
                <div className="absolute -top-5 left-4 ">{data.icon}</div>
                <div className="mt-8 text-gray-800 font-bold text-xl">{data.count}</div>
                <p className="text-gray-600 text-sm">{data.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyChoose;
