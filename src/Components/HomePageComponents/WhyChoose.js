import React from 'react';
import "aos/dist/aos.css";
import AOS from "aos";
AOS.init(); 
function WhyChoose() {
  return (
    <section className="font-sans px-4">
      <div className="flex flex-col md:flex-row">
        <div className='w-full bg-white px-4 flex flex-col md:flex-row'>
          <div data-aos="fade-left" data-aos-delay="200" className='w-full md:w-1/2 bg-white rounded-lg mb-4 xl:mt-2 lg:mt-10 md:mt-20'>
            <img src="../Images/djfML.png" alt="100acress" className="w-full object-fit md:h-auto lg:h-auto rounded-lg" />
          </div>
          <div data-aos="fade-right" data-aos-delay="200" className='w-full md:w-1/2 px-2'>
            <p className="fw-semibold xl:mt-14 lg:mt-10 text-lg lg:text-4xl md:text-3xl sm:text-xl  ">
              Why 100acress.com?
            </p>
            <div className="text-lg text-black text-justify items-center">
              <p className="xl:mx-15 lg:mx-10 md:mx-6 sm:mx-4 py-2" style={{ color: "#696969", fontSize: "1.25rem", margin: "1rem 0" }}>
                100acress is helping thousands find their Dream Home, Workspace & Everything in between.
                As we grow, we think of ourselves as creating a warm and welcoming Ecosystem where, we all as a family choose the best for you.
                The platform often verifies property listings to reduce the risk of fraud and ensure the accuracy of the information provided.
                100acress is known for its extensive database of property listings, making it a valuable resource for individuals and businesses 
                looking to buy, sell, or rent real estate properties.
              </p>
              <p className="text-red-500 mt-4 pl-4 px-1 md:pl-10 py-2" style={{ fontSize: "1.1rem" }}>Rajesh Aggarwal, Founder</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyChoose;