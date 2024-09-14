import React, { useState, useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";

AOS.init();

function WhyChoose() {
  const [expanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 425);

  const toggleParagraph = () => {
    setExpanded(!expanded);
  };

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
    <section className="font-sans px-4">
      <div className="flex flex-col md:flex-row">
        <div className="w-full bg-white px-4 flex flex-col md:flex-row">
          <div
            data-aos="fade-left"
            data-aos-delay="200"
            className="w-full md:w-1/2 bg-white rounded-lg mb-4 xl:mt-2 lg:mt-10 md:mt-20"
          >
            <img
              src="../Images/djfML.png"
              alt="100acress"
              className="w-full object-fit md:h-auto lg:h-auto rounded-lg"
            />
          </div>
          <div
            data-aos="fade-right"
            data-aos-delay="200"
            className="w-full md:w-1/2 px-2"
          >
            <p className="fw-semibold xl:mt-14 lg:mt-10 md:mt-4 text-lg lg:text-4xl md:text-3xl sm:text-xl">
              Why 100acress.com?
            </p>
            <div className="text-lg text-black text-justify items-center">
             
              <div className="relative">
                <p
                  className="xl:mx-15 lg:mx-10 md:mx-6 sm:mx-4 text-justify"
                  style={{
                    color: "#696969",
                    fontSize: "1.25rem",
                    margin: "1rem 0",
                  }}
                >
                  {isMobile
                    ? expanded
                      ? paragraphText
                      : truncateText(paragraphText, 18)
                    : paragraphText}
                </p>
                {isMobile && (
                  <button
                    className="text-blue-600 absolute bottom-0 right-0 "
                    onClick={toggleParagraph}
                  >
                    {expanded ? "Read less" : "Read more"}
                  </button>
                )}
              </div>

              <p
                className="text-red-500  pl-4 px-1 md:pl-10 py-2"
                style={{ fontSize: "1.1rem" }}
              >
                Rajesh Aggarwal, Founder
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyChoose;