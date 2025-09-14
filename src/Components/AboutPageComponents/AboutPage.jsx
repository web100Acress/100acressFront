import React from "react";
import Nav from "../../aadharhomes/Nav";
import Footer from "../Actual_Components/Footer";

const About = () => {
  return (
    <>
      <Nav />
      <div className="overflow-x-hidden">
        <div className="w-full">
          <img
            src="../../Images/aboutus.png"
            alt="About Us"
            className="w-full h-60 sm:h-30 object-fit"
          />
        </div>

        <div className="px-4 py-2">
          <h3 className="text-center text-red-600 md:text-xl lg:text-2xl xl:text-4xl pt-4">
            About 100acress.com 
          </h3>
          <p className="text-gray-500 text-lg  text-justify">
            100acress.com is one of the trusted names in real estate in Gurgaon and Delhi NCR. Since the year 2000, we have been helping people find their dream homes, offices, and the right investments in property. Our company is guided by our director, Mr. Rajesh Agrawal, and a team of experienced professionals who always put customers first. We believe that buying a home or property is not just a deal—it’s an emotion. That’s why we work with honest sellers, share complete details of every project, and even suggest similar options in the same budget so that our clients can make the best decision. At 100acress.com, you can easily buy, sell, rent, lease, or even finance properties. Whether it’s a luxury apartment, a family home, a modern office, or a smart investment, we make the journey simple, transparent, and stress-free. Our focus is always on giving value for money and creating long-term relationships with our clients.
          </p>

          <div className="flex items-center pt-2 px-1">
            <img
              src="../../Images/housefooter.jpg"
              alt="image"
              className="h-10 w-10  "
            />
            <h3 className="pt-1 text-red-600 md:text-xl  lg:text-2xl xl:text-3xl">
              Why 100Acress.com ?
            </h3>
          </div>

          <p className="text-gray-500 text-lg text-justify">
            At 100acress.com, we treat every customer&rsquo;s investment with the same care as our own. Honesty, trust, and transparency are at the heart of everything we do. Instead of just showing you what is available, we guide you towards the right options that truly fit your needs and budget. Our aim is to give you the best deals without any stress, while making the entire journey simple and smooth.

            What makes us different is our focus on long-term relationships, not just one-time deals. We believe buying a home or property is a life-changing decision, so we provide complete details, multiple choices, and genuine advice. Our team works hard to save your time and money, making sure you always feel confident before making a decision. We continue to learn, improve, and grow every day so that our clients always receive the finest service in Gurgaon and Delhi NCR. With our passion and commitment, we aim to become your first choice in real estate.
          </p>

          <div className="flex items-center pt-6 px-1">
            <img
              src="../../Images/Houseaward.PNG"
              alt="img"
              className="h-10 w-10 "
            />
            <h3 className="pt-1 text-red-600 text-lg md:text-xl sm:text-lg lg:text-2xl xl:text-3xl">
              Awards and Recognitions
            </h3>
          </div>
          <div>
            <p className="text-gray-500 text-lg text-justify">
              Over the years, 100acress.com has earned the love, trust, and confidence of thousands of happy families, investors, and business owners. Our success is not only measured in deals closed but also in the smiles and satisfaction of our clients. We make sure that every legal process, paperwork, and transaction is handled with complete safety and transparency, so our clients never have to worry about hidden issues. We are proud to be recognized as a reliable and customer-friendly real estate company in Gurgaon and Delhi NCR. Our team gives clear information, quick support, and multiple choices, so that every buyer and investor feels secure in their decisions. These values have helped us gain respect and recognition in the real estate industry. With every new client we serve, we strengthen our promise to deliver value for money, luxury living, and long-term trust. At 100acress.com, awards are important, but the biggest reward is the faith our customers place in us.
            </p>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default About;
