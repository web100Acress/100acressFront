import React from "react";
import Footer from "../Components/Actual_Components/Footer";
import { Helmet } from "react-helmet";
import { ForSaleIcon,GirlSearchingIcon,ResidentialProjectIcon,CommercialProjectIcon, ScoPlotsIcon, PlotnFloorIcon,MonthlyVisitIcon, AwardsIcon, RealestateIcon, LegalIcon, InteriorIcon, HomeloanIcon } from "../Assets/icons";
const About = () => {
  return (
    <>



    {/* hello  */}
  
      <Helmet>
        <meta
          name="description"
          content="Discover the story behind 100acress.com, a trusted real estate company in Gurgaon. Learn about our values and commitment to excellence in property services."
        />
        <title>About Us | Real Estate Company in Gurgaon - 100acress.com</title>
        <link rel="canonical" href="https://www.100acress.com/about-us/" />
      </Helmet>

      <div className="overflow-x-hidden block w-11/12 mx-auto mt-20 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            <div className="">
              <h2>About 100acress.com</h2>
              <p className="text-justify">100acress.com is one of the trusted names in real estate in Gurgaon and Delhi NCR. Since the year 2000, we have been helping people find their dream homes, offices, and the right investments in property. Our company is guided by our director, Mr. Rajesh Agrawal, and a team of experienced professionals who always put customers first. We believe that buying a home or property is not just a deal—it’s an emotion. That’s why we work with honest sellers, share complete details of every project, and even suggest similar options in the same budget so that our clients can make the best decision. At 100acress.com, you can easily buy, sell, rent, lease, or even finance properties. Whether it’s a luxury apartment, a family home, a modern office, or a smart investment, we make the journey simple, transparent, and stress-free. Our focus is always on giving value for money and creating long-term relationships with our clients.</p>
            </div>
            <div className="justify-self-end ">
              <ForSaleIcon className="w-11/12"/>
            </div>
            <div className="justify-self-start ">
              <GirlSearchingIcon className="w-full hidden md:block md:w-4/5" />
            </div>
            <div>
              <h2>Why 100Acress.com ?</h2>
              <p className="text-justify">At 100acress.com, we treat every customer&rsquo;s investment with the same care as our own. Honesty, trust, and transparency are at the heart of everything we do. Instead of just showing you what is available, we guide you towards the right options that truly fit your needs and budget. Our aim is to give you the best deals without any stress, while making the entire journey simple and smooth.

What makes us different is our focus on long-term relationships, not just one-time deals. We believe buying a home or property is a life-changing decision, so we provide complete details, multiple choices, and genuine advice. Our team works hard to save your time and money, making sure you always feel confident before making a decision. We continue to learn, improve, and grow every day so that our clients always receive the finest service in Gurgaon and Delhi NCR. With our passion and commitment, we aim to become your first choice in real estate.</p>
            </div>
            
        </div>
        <div>
          <h2>Awards and Recognitions</h2>
          <p className="text-justify">Over the years, 100acress.com has earned the love, trust, and confidence of thousands of happy families, investors, and business owners. Our success is not only measured in deals closed but also in the smiles and satisfaction of our clients. We make sure that every legal process, paperwork, and transaction is handled with complete safety and transparency, so our clients never have to worry about hidden issues. We are proud to be recognized as a reliable and customer-friendly real estate company in Gurgaon and Delhi NCR. Our team gives clear information, quick support, and multiple choices, so that every buyer and investor feels secure in their decisions. These values have helped us gain respect and recognition in the real estate industry. With every new client we serve, we strengthen our promise to deliver value for money, luxury living, and long-term trust. At 100acress.com, awards are important, but the biggest reward is the faith our customers place in us.</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 mt-8">
            <div className="flex flex-col shadow-md px-4 pt-8 pb-1 rounded-lg border-[0.5px] border-gray-100 relative">
              <ResidentialProjectIcon className="absolute -top-5"/>
              <h3>1600+</h3>
              <p>Residential Projects</p>
            </div>
            <div className="flex flex-col shadow-md px-4 pt-8 pb-1 rounded-lg border-[0.5px] border-gray-100 relative">
              <CommercialProjectIcon className="absolute -top-5"/>
              <h3>900+</h3>
              <p>Commercial Projects</p>
            </div>
            <div className="flex flex-col shadow-md px-4 pt-8 pb-1 rounded-lg border-[0.5px] border-gray-100 relative">
              <PlotnFloorIcon className="absolute -top-5"/>
              <h3>400+</h3>
              <p>Plots & Floors</p>
            </div>
            <div className="flex flex-col shadow-md px-4 pt-8 pb-1 rounded-lg border-[0.5px] border-gray-100 relative">
              <ScoPlotsIcon className="absolute -top-5"/>
              <h3>90+</h3>
              <p>SCO Plots</p>
            </div>
            <div className="flex flex-col shadow-md px-4 pt-8 pb-1 rounded-lg border-[0.5px] border-gray-100 relative">
              <MonthlyVisitIcon className="absolute -top-5"/>
              <h3>2.45L+</h3>
              <p>Monthly Visitors</p>
            </div>
            <div className="flex flex-col shadow-md px-4 pt-8 pb-1 rounded-lg border-[0.5px] border-gray-100 relative">
              <AwardsIcon className="absolute -top-5"/>
              <h3>1000+</h3>
              <p>Awards</p>
            </div>
          </div>

          <div className="mt-4 mb-6">
            <h2>Explore our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex flex-col items-center text-center shadow-md px-6 py-4 rounded-lg border-[0.5px] border-gray-100">
                  <RealestateIcon className="w-1/3"/>
                  <h5 className="my-2 font-semibold">Real Estate Consulting</h5>
                  <p>We Provide the best services to help you get your dream home as per your expectations.</p>
                </div>
                <div className="flex flex-col items-center text-center shadow-md px-6 py-4 rounded-lg border-[0.5px] border-gray-100">
                    <LegalIcon className="w-1/3"/>
                    <h5 className="my-2 font-semibold">Legal Advice</h5>
                    <p>The major issue is trust worthy legal assistance. We will help you through all the aspects.</p>
                </div>
                <div className="flex flex-col items-center text-center shadow-md px-6 py-4 rounded-lg border-[0.5px] border-gray-100">
                    <InteriorIcon className="w-1/3"/>
                    <h5 className="my-2 font-semibold">Interior Design</h5>
                    <p>We Provide the best services to help you get your dream home as per your expectations.</p>
                </div>
                <div className="flex flex-col items-center text-center shadow-md px-6 py-4 rounded-lg border-[0.5px] border-gray-100">
                    <HomeloanIcon className="w-1/3"/>
                    <h5 className="my-2 font-semibold">Home Loan</h5>
                    <p>We will help you to provide the best home loan to complete your dream and guide.</p>
                </div>

            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default About;
