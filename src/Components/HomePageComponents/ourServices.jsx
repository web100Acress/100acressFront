import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { RealestateIcon,LegalIcon,HomeloanIcon, InteriorIcon } from "../../Assets/icons";
import "aos/dist/aos.css";
import AOS from "aos";
import CraneTool from "../Actual_Components/cranetool.svg";

function OurServices() {
  const sliderSettings = {
    dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  autoplay: false, 
  autoplaySpeed: 3000, 
  };


  useEffect(() => {
      AOS.init();
    }, []);
  
  return (
    <div className="section font-poppins font-light">
      <div className="w-full max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h2 className="text-xl xl:text-4xl lg:text-3xl md:text-2xl sm:text-left bg-gradient-to-r from-[#FF9933] via-[#1a1a1a] to-[#138808] bg-clip-text text-transparent font-bold">
        Explore Our Services
      </h2>
        <div className="md:hidden h-64">
          <Slider {...sliderSettings} >
            <div className="flex flex-col items-center bg-white p-4 rounded-lg hover:shadow-[#FF9933]/20 hover:border-[#FF9933]/30 border border-transparent transition-all duration-300">
              <Link to={`/contact-us/`} target="_top" className="text-center">
              <div className="mb-4">
                  <RealestateIcon/>
                </div>
                <div className="text-center">
                  <h3 className="text-xl mb-2">Real Estate Consulting</h3>
                  <p className="text-gray-600 text-xs text-center">
                    We Provide the best services to help you get your dream home as per your expectations.
                  </p>
                </div>
              </Link>
            </div>
            <div className="flex flex-col items-center bg-white p-4 rounded-lg hover:shadow-[#FF9933]/20 hover:border-[#FF9933]/30 border border-transparent transition-all duration-300">
              <Link to={`/contact-us/`} target="_top" className="text-center">
              <div className="mb-4">
                  <LegalIcon/>
                </div>
                <div className="text-center">
                  <h3 className="text-xl mb-2">Legal Advice</h3>
                  <p className="text-gray-600 text-xs text-center">
                  The major issue is trust worthy legal assistance. We will help you through all the aspects.
                  </p>
                </div>
              </Link>
            </div>
            <div className="flex flex-col items-center bg-white p-4 rounded-lg hover:shadow-[#FF9933]/20 hover:border-[#FF9933]/30 border border-transparent transition-all duration-300">
              <Link to={`/contact-us/`} target="_top" className="text-center">
              <div className="mb-4">
                  <InteriorIcon/>
                </div>
                <div className="text-center">
                  <h3 className="text-xl mb-2">Interior Design</h3>
                  <p className="text-gray-600 text-xs text-center">
                    We Provide the best services to help you get your dream home as per your expectations.
                  </p>
                </div>
              </Link>
            </div>
            <div className="flex flex-col items-center bg-white p-4 rounded-lg">
              <Link to={`/contact-us/`} target="_top" className="text-center">
              <div className="mb-4">
                  <HomeloanIcon/>
                </div>
                <div className="text-center">
                  <h3 className="text-xl mb-2">Property Loan</h3>
                  <p className="text-gray-600 text-xs text-center">
                  We will help you get the best property loan with end-to-end guidance.
                  </p>
                </div>
              </Link>
            </div>
            <div className="flex flex-col items-center bg-white p-4 rounded-lg hover:shadow-[#FF9933]/20 hover:border-[#FF9933]/30 border border-transparent transition-all duration-300">
              <Link to={`/contact-us/`} target="_top" className="text-center">
                <div className="mb-4">
                  <img
                    src={CraneTool}
                    className="h-24 w-24 object-contain mx-auto"
                    alt="Construction"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-xl mb-2">Construction</h3>
                  <p className="text-gray-600 text-xs text-center">
                    End-to-end construction solutions with quality, timelines, and transparency.
                  </p>
                </div>
              </Link>
            </div>
          </Slider>
          <style>{`
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

 
        <div data-aos="fade-left" className="hidden md:grid md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 gap-6">
          <div  data-aos="fade-left" className="flex flex-col items-center bg-white p-4 rounded-lg shadow-lg">
          <Link to={`/contact-us/`} target="_top" className="text-center">
                <div className="mb-4">
                  <RealestateIcon/>
                </div>
                <div className="text-center">
                  <h3 className="text-xl mb-2">Real Estate Consulting</h3>
                  <p className="text-gray-600 text-xs text-center">
                  Get expert real estate consulting to find the right property, whether it’s flats, apartments, or new residential projects.
                  </p>
                </div>
              </Link>
          </div>
          <div  className="flex flex-col items-center bg-white p-4 rounded-lg shadow-lg">
          <Link to={`/contact-us/`} target="_top" className="text-center">
                <div className="mb-4">
                  <LegalIcon/>
                </div>
                <div className="text-center">
                  <h3 className="text-xl mb-2">Legal Assistance</h3>
                  <p className="text-gray-600 text-xs text-center">
                  Buying property needs trusted legal support. We guide you with property documents, agreements, and safe transactions.
                  </p>
                </div>
              </Link>
          </div>
          <div  data-aos="fade-left" className="flex flex-col items-center bg-white p-4 rounded-lg shadow-lg">
          <Link to={`/contact-us/`} target="_top" className="text-center">
                <div className="mb-4">
                  <InteriorIcon/>
                </div>
                <div className="text-center">
                  <h3 className="text-xl mb-2">Interior Design</h3>
                  <p className="text-gray-600 text-xs text-center">
                  Transform your house into a dream home with affordable interior design solutions for flats, villas, and apartments.
                  </p>
                </div>
              </Link>
          </div>
          <div  className="flex flex-col items-center bg-white p-4 rounded-lg shadow-lg">
          <Link to={`/contact-us/`} target="_top" className="text-center">
                <div className="mb-4">
                  <HomeloanIcon/>
                </div>
                <div className="text-center">
                  <h3 className="text-xl mb-2">Property Loan</h3>
                  <p className="text-gray-600 text-xs text-center">
                  We help you choose the best home loan options and guide you through the process to buy your property with ease.
                  </p>
                </div>
              </Link>
          </div>
          <div  className="flex flex-col items-center bg-white p-4 rounded-lg shadow-lg">
            <Link to={`/contact-us/`} target="_top" className="text-center">
              <div className="mb-4">
                <img
                  src={CraneTool}
                  className="h-24 w-24 object-contain mx-auto"
                  alt="Construction"
                />
              </div>
              <div className="text-center">
                <h3 className="text-xl mb-2">Construction</h3>
                <p className="text-gray-600 text-xs text-center">
                  End-to-end construction solutions with quality, timelines, and transparency.
                </p>
              </div>
            </Link>
          </div>
        
        </div>
      </div>
    </div>
  );
}

export default OurServices;
