import React from "react";
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
  return (
    <>
      <div>
        <p data-aos="fade-up" data-aos-delay="200" className="px-12 text-xl text-red-600 xl:text-4xl lg:text-3xl pt-4 md:text-2xl">
          100acress.com Snapshot
        </p>
      </div>
      <div className="px-12">
        <section data-aos="fade-down" data-aos-delay="200" className="relative overflow-hidden bg-gray-50 border-2 py-4 rounded-lg">
          <p className="px-4 text-justify mb-0 ">
            100acress.com Real Estate Company specializes in providing premier
            property solutions tailored to meet your needs. With a diverse
            portfolio spanning residential, commercial, and industrial
            properties, we offer unparalleled expertise in real estate
            acquisition, sales, leasing, and development. Our team of seasoned
            professionals is committed to delivering exceptional service,
            guiding you through every step of the process with transparency and
            integrity.
          </p>

          <div className="block md:hidden h-40 p-2">
            <Slider {...carouselSettings}>
              <div className="backdrop-blur-sm relative mb-3 rounded-3xl border bg-white/70 px-2 py-4 text-left lg:px-4">
                <p className="relative text-3xl text-center font-black text-black">1245+</p>
                <p className="relative mt-2 text-gray-600 text-center mb-0 px-2">Residential Projects</p>
              </div>

              <div className="backdrop-blur-lg relative mb-3 rounded-3xl border bg-white/70 px-2 py-4 text-left lg:px-4">
                <p className="relative text-3xl text-center font-black text-black">550+</p>
                <p className="relative mt-2 text-gray-600 text-center mb-0 px-2">Commercial Projects</p>
              </div>

              <div className="backdrop-blur-lg relative mb-3 rounded-3xl border bg-white/70 px-2 py-4 text-left lg:px-4">
                <p className="relative text-3xl text-center font-black text-black">54+</p>
                <p className="relative mt-2 text-gray-600 text-center mb-0 px-2">SCO Plots</p>
              </div>

              <div className="backdrop-blur-lg relative mb-3 rounded-3xl border bg-white/70 px-2 py-4 text-left lg:px-4">
                <p className="relative text-3xl text-center font-black text-black">250+</p>
                <p className="relative mt-2 text-gray-600 text-center mb-0 px-2">Plots & Floors</p>
              </div>

              <div className="backdrop-blur-lg relative mb-3 rounded-3xl border bg-white/70 px-2 py-4 text-left lg:px-4">
                <p className="relative text-3xl text-center font-black text-black">2.25L+</p>
                <p className="relative mt-2 text-gray-600 text-center mb-0 px-2">Monthly Visitors</p>
              </div>

              <div className="backdrop-blur-lg relative mb-3 rounded-3xl border bg-white/70 px-2 py-4 text-left lg:px-4">
                <p className="relative text-3xl text-center font-black text-black">150+</p>
                <p className="relative mt-2 text-gray-600 text-center mb-0 px-2 flex justify-center items-center">
                  <FaAward className="mr-2" /> Awards
                </p>
              </div>
            </Slider>
            <style jsx>{`
        .slick-prev {
          left: 10px;
          z-index: 1;
        }
        .slick-next {
          right: 10px;
          z-index: 1;
        }
        .slick-prev:before, .slick-next:before {
          font-size: 24px;
          color: #4a5568; /* Tailwind color-gray-600 */
        }
        .slick-prev:hover:before, .slick-next:hover:before {
          color: #3182ce; /* Tailwind color-blue-600 */
        }
      `}</style>
          </div>

       
          <div className="hidden md:grid px-4 mt-4 max-w-full h-30 grid-cols-1 gap-x-2 gap-y-12 text-center sm:text-left lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-1 xs:grid-cols-1">
            <div className="backdrop-blur-sm relative mb-3 rounded-3xl border bg-white/70 px-2 py-4 text-left shadow lg:px-4">
              <p className="relative text-3xl text-center font-black text-black">1245+</p>
              <p className="relative mt-2 text-gray-600 text-center mb-0 px-2">Residential Projects</p>
            </div>

            <div className="backdrop-blur-lg relative mb-3 rounded-3xl border bg-white/70 px-2 py-4 text-left shadow lg:px-4">
              <p className="relative text-3xl text-center font-black text-black">550+</p>
              <p className="relative mt-2 text-gray-600 text-center mb-0 px-2">Commercial Projects</p>
            </div>

            <div className="backdrop-blur-lg relative mb-3 rounded-3xl border bg-white/70 px-2 py-4 text-left shadow lg:px-4">
              <p className="relative text-3xl text-center font-black text-black">54+</p>
              <p className="relative mt-2 text-gray-600 text-center mb-0 px-2">SCO Plots</p>
            </div>

            <div className="backdrop-blur-lg relative mb-3 rounded-3xl border bg-white/70 px-2 py-4 text-left shadow lg:px-4">
              <p className="relative text-3xl text-center font-black text-black">250+</p>
              <p className="relative mt-2 text-gray-600 text-center mb-0 px-2">Plots & Floors</p>
            </div>

            <div className="backdrop-blur-lg relative mb-3 rounded-3xl border bg-white/70 px-2 py-4 text-left shadow lg:px-4">
              <p className="relative text-3xl text-center font-black text-black">2.25L+</p>
              <p className="relative mt-2 text-gray-600 text-center mb-0 px-2">Monthly Visitors</p>
            </div>

            <div className="backdrop-blur-lg relative mb-3 rounded-3xl border bg-white/70 px-2 py-4 text-left shadow lg:px-4">
              <p className="relative text-3xl text-center font-black text-black">150+</p>
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