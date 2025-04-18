import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { RealestateIcon,LegalIcon,HomeloanIcon, InteriorIcon } from "../../Assets/icons";
import "aos/dist/aos.css";
import AOS from "aos";

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
      <div className="max-w-screen-xl mx-auto px-6 py-6">
      <h2 className="text-xl xl:text-4xl lg:text-3xl md:text-2xl sm:text-left">
        Explore Our Services
      </h2>
        <div className="md:hidden h-64">
          <Slider {...sliderSettings} >
            <div className="flex flex-col items-center bg-white p-4 rounded-lg ">
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
            <div className="flex flex-col items-center bg-white p-4 rounded-lg ">
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
            <div className="flex flex-col items-center bg-white p-4 rounded-lg ">
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
                  <h3 className="text-xl mb-2">Home Loan</h3>
                  <p className="text-gray-600 text-xs text-center">
                  We will help you to provide the best home loan to complete your dream and guide.
                  </p>
                </div>
              </Link>
            </div>
            {/* <div className="flex flex-col items-center bg-white p-4 rounded-lg ">
              <Link to={`/contact-us/`} target="_top" className="text-center">
                <div className="mb-4">
                  <img
                    src="../../Images/construction.webp"
                    className="h-52 w-60 object-fit"
                    alt="construction"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-2">Construction</h3>
                  <p className="text-gray-600 text-justify">
                  Skilled talents in real estate and construction are essential for translating social visions into tangible Smart Cities.
                  </p>
                </div>
              </Link>
            </div> */}
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

 
        <div data-aos="fade-left" className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div  data-aos="fade-left" className="flex flex-col items-center bg-white p-4 rounded-lg shadow-lg">
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
          <div  className="flex flex-col items-center bg-white p-4 rounded-lg shadow-lg">
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
          <div  data-aos="fade-left" className="flex flex-col items-center bg-white p-4 rounded-lg shadow-lg">
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
          <div  className="flex flex-col items-center bg-white p-4 rounded-lg shadow-lg">
          <Link to={`/contact-us/`} target="_top" className="text-center">
                <div className="mb-4">
                  <HomeloanIcon/>
                </div>
                <div className="text-center">
                  <h3 className="text-xl mb-2">Home Loan</h3>
                  <p className="text-gray-600 text-xs text-center">
                  We will help you to provide the best home loan to complete your dream and guide.
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
