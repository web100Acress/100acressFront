import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaAward } from "react-icons/fa";
import "aos/dist/aos.css";
import AOS from "aos";

AOS.init();

const carouselSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  autoplay: true,
  autoplaySpeed: 3000,
};

const Snapshot = () => {
  const [expanded, setExpanded] = useState("");
  const [ismobile, setIsMobile] = useState(window.innerWidth <= 425);

  const toggleParagraph = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 425);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const paragraphText = ` 100acress.com Real Estate Company specializes in providing premier
            property solutions tailored to meet your needs. With a diverse
            portfolio spanning residential, commercial, and industrial
            properties, we offer unparalleled expertise in real estate
            acquisition, sales, leasing, and development. Our team of seasoned
            professionals is committed to delivering exceptional service,
            guiding you through every step of the process with transparency and
            integrity.`;
  const truncateText = (text, limit) => {
    const words = text.split(" ");
    return words.length > limit
      ? words.slice(0, limit).join(" ") + "..."
      : text;
  };
  return (
    <>
      <div>
        <p
          data-aos="fade-up"
          data-aos-delay="200"
          className="px-12 text-xl text-red-600 xl:text-4xl lg:text-3xl pt-4 md:text-2xl"
        >
          100acres.com Key Insights
        </p>
      </div>
      
      <div className="px-12">
        <section
          data-aos="fade-down"
          data-aos-delay="200"
          className="relative overflow-hidden bg-gray-50 border-2 py-4 rounded-lg"
        >
          <div className="relative">
            <p
              className="xl:mx-15 lg:mx-10 md:mx-6 sm:mx-4 py-2 px-4 text-justify"
              style={{
                color: "#696969",
                fontSize: "1.25rem",
                margin: "1rem 0",
              }}
            >
              {ismobile
                ? expanded
                  ? paragraphText
                  : truncateText(paragraphText, 15)
                : paragraphText}
            </p>
            {ismobile && (
              <button
                className="text-blue-600 absolute bottom-2 right-0 mr-8"
                onClick={toggleParagraph}
              >
                {expanded ? "Read less" : "Read more"}
              </button>
            )}
          </div>

          <div className="block md:hidden h-40 p-2">
            <Slider {...carouselSettings}>
              <div className="backdrop-blur-sm relative mb-3 rounded-3xl border bg-white/70 px-2 py-4 text-left lg:px-4">
                <p className="relative text-3xl text-center font-black text-black">
                  1600+
                </p>
                <p className="relative mt-2 text-gray-600 text-center mb-0 px-2">
                  Residential Projects
                </p>
              </div>

              <div className="backdrop-blur-lg relative mb-3 rounded-3xl border bg-white/70 px-2 py-4 text-left lg:px-4">
                <p className="relative text-3xl text-center font-black text-black">
                  900+
                </p>
                <p className="relative mt-2 text-gray-600 text-center mb-0 px-2">
                  Commercial Projects
                </p>
              </div>

              <div className="backdrop-blur-lg relative mb-3 rounded-3xl border bg-white/70 px-2 py-4 text-left lg:px-4">
                <p className="relative text-3xl text-center font-black text-black">
                  90+
                </p>
                <p className="relative mt-2 text-gray-600 text-center mb-0 px-2">
                  SCO Plots
                </p>
              </div>

              <div className="backdrop-blur-lg relative mb-3 rounded-3xl border bg-white/70 px-2 py-4 text-left lg:px-4">
                <p className="relative text-3xl text-center font-black text-black">
                  400+
                </p>
                <p className="relative mt-2 text-gray-600 text-center mb-0 px-2">
                  Plots & Floors
                </p>
              </div>

              <div className="backdrop-blur-lg relative mb-3 rounded-3xl border bg-white/70 px-2 py-4 text-left lg:px-4">
                <p className="relative text-3xl text-center font-black text-black">
                  2.45L+
                </p>
                <p className="relative mt-2 text-gray-600 text-center mb-0 px-2">
                  Monthly Visitors
                </p>
              </div>

              <div className="backdrop-blur-lg relative mb-3 rounded-3xl border bg-white/70 px-2 py-4 text-left lg:px-4">
                <p className="relative text-3xl text-center font-black text-black">
                  1000+
                </p>
                <p className="relative mt-2 text-gray-600 text-center mb-0 px-2 flex justify-center items-center">
                  <FaAward className="mr-2" /> Awards
                </p>
              </div>
            </Slider>
            <style jsx>{`
              .slick-prev,
              .slick-next {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1;
                transition: all 0.3s ease;
              }
            `}</style>
          </div>

          <div className="hidden md:grid px-4 mt-4 max-w-full h-30 grid-cols-1 gap-x-2 gap-y-12 text-center sm:text-left lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-1 xs:grid-cols-1">
            <div className="backdrop-blur-sm relative mb-3 rounded-3xl border bg-white/70 px-2 py-4 text-left shadow lg:px-4">
              <p className="relative text-3xl text-center font-black text-black">
                1600+
              </p>
              <p className="relative mt-2 text-gray-600 text-center mb-0 px-2">
                Residential Projects
              </p>
            </div>

            <div className="backdrop-blur-lg relative mb-3 rounded-3xl border bg-white/70 px-2 py-4 text-left shadow lg:px-4">
              <p className="relative text-3xl text-center font-black text-black">
                900+
              </p>
              <p className="relative mt-2 text-gray-600 text-center mb-0 px-2">
                Commercial Projects
              </p>
            </div>

            <div className="backdrop-blur-lg relative mb-3 rounded-3xl border bg-white/70 px-2 py-4 text-left shadow lg:px-4">
              <p className="relative text-3xl text-center font-black text-black">
                54+
              </p>
              <p className="relative mt-2 text-gray-600 text-center mb-0 px-2">
                SCO Plots
              </p>
            </div>

            <div className="backdrop-blur-lg relative mb-3 rounded-3xl border bg-white/70 px-2 py-4 text-left shadow lg:px-4">
              <p className="relative text-3xl text-center font-black text-black">
                250+
              </p>
              <p className="relative mt-2 text-gray-600 text-center mb-0 px-2">
                Plots & Floors
              </p>
            </div>

            <div className="backdrop-blur-lg relative mb-3 rounded-3xl border bg-white/70 px-2 py-4 text-left shadow lg:px-4">
              <p className="relative text-3xl text-center font-black text-black">
                2.25L+
              </p>
              <p className="relative mt-2 text-gray-600 text-center mb-0 px-2">
                Monthly Visitors
              </p>
            </div>

            <div className="backdrop-blur-lg relative mb-3 rounded-3xl border bg-white/70 px-2 py-4 text-left shadow lg:px-4">
              <p className="relative text-3xl text-center font-black text-black">
                150+
              </p>
              <p className="relative mt-2 text-gray-600 text-center mb-0 px-2 flex justify-center items-center">
                <FaAward className="mr-2" /> Awards
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Snapshot;
