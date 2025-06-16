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
      </Helmet>

      <div className="overflow-x-hidden block w-11/12 mx-auto mt-20 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            <div className="">
              <h2>About 100acress.com</h2>
              <p className="text-justify">100acress.com Gurgaon is an honoured real estate company that strongly believes in providing customer delight and value for its hard-earned money was founded in the year 2000 and is being skillfully led by our director Mr Rajesh Agrawal. So far we have been successful in gaining top reviews from our clients in diverse jobs such as Booking/ Sale/ Leasing Of Residential/ Commercial Properties In Gurgaon And Delhi/NCR which makes us a trustworthy and efficient real estate company in Gurgaon.Our team of highly skilled professionals works with genuine sellers so that it can make the best deals for our potential buyer who are looking for residential, commercial, or any real estate investment, we try to maintain long term relationship by providing their dream home and insists on providing the value for their money by opening all the details of the project and showing them similar projects too under the same price segments in order to make them able for making better decisions.100acress.com is actively making services for searching, renting out, selling, financing (mortgaging), and many more such services at the best price to fulfil clients’ demands by engaging through a large circle of people with every possible transparency.</p>
            </div>
            <div className="justify-self-end ">
              <ForSaleIcon className="w-11/12"/>
            </div>
            <div className="justify-self-start ">
              <GirlSearchingIcon className="w-full hidden md:block md:w-4/5" />
            </div>
            <div>
              <h2>Why 100Acress.com ?</h2>
              <p className="text-justify">Our company works with moral values which are respecting clients’ investment, determined efforts to make every possibility available, and preserved efforts to grant the best services to our clients. We learn with our clients to enhance our servicer quality, make ourselves better every day. And provide the best results of their investments which they desire. all the transparency of the work will be made which you require.The real estate industry is making rapid growth and We aim to become one of the most admired, influential, and reliable service provider companies in the real estate industry by winning our customers' trust. With our ultimate passion, performance, and skilled abilities we aspire to enhance our standards in Gurgaon and Delhi NCR. In catering excellent service to our customers, making confident.</p>
            </div>
            
        </div>
        <div>
          <h2>Awards and Recognitions</h2>
          <p className="text-justify">Our expert team is working on making secure and smooth all legal and mandatory transactions of our housing and commercial projects to ensure real and value for money products. We provide every piece of information and quick browsing facilities about the undertakings so that our client does not get any harm and can trust us. Our team aims to enlarge our circle of people to avail best deals and multiple choices along with getting a significant status in the real estate domain.</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 mt-8">
            <div className="flex flex-col shadow-md px-4 pt-8 pb-1 rounded-lg border-[0.5px] border-gray-100 relative">
              <ResidentialProjectIcon className="absolute -top-5"/>
              <h3>1245+</h3>
              <p>Residential Projects</p>
            </div>
            <div className="flex flex-col shadow-md px-4 pt-8 pb-1 rounded-lg border-[0.5px] border-gray-100 relative">
              <CommercialProjectIcon className="absolute -top-5"/>
              <h3>550+</h3>
              <p>Commercial Projects</p>
            </div>
            <div className="flex flex-col shadow-md px-4 pt-8 pb-1 rounded-lg border-[0.5px] border-gray-100 relative">
              <PlotnFloorIcon className="absolute -top-5"/>
              <h3>250+</h3>
              <p>Plots & Floors</p>
            </div>
            <div className="flex flex-col shadow-md px-4 pt-8 pb-1 rounded-lg border-[0.5px] border-gray-100 relative">
              <ScoPlotsIcon className="absolute -top-5"/>
              <h3>54+</h3>
              <p>SCO Plots</p>
            </div>
            <div className="flex flex-col shadow-md px-4 pt-8 pb-1 rounded-lg border-[0.5px] border-gray-100 relative">
              <MonthlyVisitIcon className="absolute -top-5"/>
              <h3>2.25L+</h3>
              <p>Monthly Visitors</p>
            </div>
            <div className="flex flex-col shadow-md px-4 pt-8 pb-1 rounded-lg border-[0.5px] border-gray-100 relative">
              <AwardsIcon className="absolute -top-5"/>
              <h3>150+</h3>
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
