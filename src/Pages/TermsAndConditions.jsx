import React from 'react';
import Footer from '../Components/Actual_Components/Footer';
import { Helmet } from 'react-helmet';
const TermsAndConditions = () => {
  return (
    <>
    <Helmet>
        <meta
          name="description"
          content="Read the terms and conditions of 100acress.com. Understand our policies for property listings, transactions, and usage of our platform. Ensure compliance."
        />
        <title>
        Terms and Conditions | 100acress.com
        </title>
        <link rel="canonical" href="https://www.100acress.com/terms-and-conditions/" />
      </Helmet>

    <div className='p-10 overflow-x-hidden mt-14'>

     <h3 className='pt-3 font-inter md:text-2xl  lg:text-3xl xl:text-3xl text-start px-4'>Terms And Conditions</h3>
     <p className='font-inter text-gray-500 text-lg px-4 py-2 text-justify'>100acress.com Gurgaon is an honoured real estate company that strongly believes in providing customer
       delight and value for its hard-earned money was founded in the year 2000 and is being skillfully led by
       our director Mr Rajesh Agrawal. So far we have been successful in gaining top reviews from our clients
       in diverse jobs such as Booking/ Sale/ Leasing Of Residential/ Commercial Properties In Gurgaon And Delhi/NCR
       which makes us a trustworthy and efficient real estate company in Gurgaon.Our team of highly skilled professionals
       works with genuine sellers so that it can make the best deals for our potential buyer who are looking for residential,
       commercial, or any real estate investment, we try to maintain long term relationship by providing their dream home and
       insists on providing the value for their money by opening all the details of the project and showing them similar
       projects too under the same price segments in order to make them able for making better decisions.100acress.com is
       actively making services for searching, renting out, selling, financing (mortgaging), and many more such services at
       the best price to fulfil clients’ demands by engaging through a large circle of people with every possible transparency.</p>

     <div className="pt-2 px-3">
       <h3 className="pt-3 font-inter md:text-2xl  lg:text-3xl xl:text-3xl text-start">Why 100Acress.com ?</h3>
     </div>

     <p className=' pt-3 px-4 font-inter text-gray-500 text-lg  text-justify'>
       Our company works with moral values which are respecting clients’ investment, determined efforts to make every possibility available,
       and preserved efforts to grant the best services to our clients. We learn with our clients to enhance our servicer quality, make ourselves
       better every day. And provide the best results of their investments which they desire. all the transparency of the work will be made which
       you require.The real estate industry is making rapid growth and We aim to become one of the most admired, influential, and reliable service
       provider companies in the real estate industry by winning our customers' trust. With our ultimate passion, performance, and skilled abilities
       we aspire to enhance our standards in Gurgaon and Delhi NCR. In catering excellent service to our customers, making confident.
     </p>

     <div className="pt-6 px-3">
       <h3 className="pt-3 font-inter md:text-2xl  lg:text-3xl xl:text-3xl text-start">Our Responsibility</h3>
     </div>
     <div>
       <p className='pt-3 pb-20 px-4 font-inter text-gray-500 text-lg  text-justify'>Our expert team is working on making secure and smooth all legal and mandatory transactions of our housing and commercial projects to
         ensure real and value for money products. We provide every piece of information and quick browsing facilities about the undertakings so
         that our client does not get any harm and can trust us. Our team aims to enlarge our circle of people to avail best deals and multiple
         choices along with getting a significant status in the real estate domain.</p>
     </div>
   </div>
   <Footer />
    </>
  );
};

export default TermsAndConditions;













