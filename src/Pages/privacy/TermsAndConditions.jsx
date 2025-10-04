import React from 'react';
import Footer from '../../Components/Actual_Components/Footer';
import { Helmet } from 'react-helmet';
import Navbar from '../../aadharhomes/navbar/Navbar';

const TermsAndConditions = () => {
  return (
    <>
      <Helmet>
        <title>Terms and Conditions - 100acress.com</title>
        <meta 
          name="description" 
          content="Read the terms and conditions of 100acress.com. Understand our policies for property listings, transactions, and usage of our platform." 
        />
        <link rel="canonical" href="https://www.100acress.com/terms-and-conditions/" />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-12 max-w-5xl">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center border-b border-gray-300 pb-2">
              Terms and Conditions – 100acress.com
            </h1>
            
            <p className="text-lg text-gray-700 mb-8 text-justify">
              These Terms and Conditions ("Terms") govern the use of 100acress.com and its Services. 
              By accessing the Sites, registering an account, or using the Services, you agree to these Terms.
            </p>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">1. Intermediary Role</h2>
                <p className="text-gray-700 leading-relaxed">
                  100acress.com acts solely as a property listing and intermediary platform connecting buyers, sellers, agents, and developers. 
                  The Company does not guarantee the accuracy, legality, or ownership of listed properties. 
                  Users are responsible for conducting independent verification and completing transactions.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">2. User Responsibilities</h2>
                <p className="text-gray-700 leading-relaxed">
                  Users must provide accurate and truthful information while registering and posting property listings. 
                  They must refrain from submitting fraudulent, offensive, or illegal content and respect the intellectual 
                  property rights of the Company and other users. Misuse of the Sites or violation of these Terms may result 
                  in account suspension or termination.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">3. Property Listings and Paid Services</h2>
                <p className="text-gray-700 leading-relaxed">
                  Users can post free or premium property listings. Premium services, including featured listings or 
                  advertising packages, are subject to payment terms and subscription rules. All payments for premium 
                  services are generally non-refundable unless specified. Users are responsible for the content, 
                  photographs, and legal compliance of the properties they list.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">4. Liability</h2>
                <p className="text-gray-700 leading-relaxed">
                  The Company is not responsible for disputes, losses, or damages arising from property transactions 
                  or interactions between users. The Company does not guarantee the accuracy or completeness of property 
                  listings, photographs, or other content provided by users. Errors, omissions, or technical disruptions 
                  in Services do not create liability for the Company.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">5. Intellectual Property</h2>
                <p className="text-gray-700 leading-relaxed">
                  All content, software, branding, and materials on the Sites are owned by 100acress.com or its licensors. 
                  Users are not allowed to reproduce, distribute, modify, or use the content without written consent from the Company.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">6. Governing Law</h2>
                <p className="text-gray-700 leading-relaxed">
                  These Terms are governed by the laws of India. Any disputes arising under these Terms are subject to the 
                  exclusive jurisdiction of the courts located in Gurugram, Haryana.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">7. Contact and Grievance Redressal</h2>
                <p className="text-gray-700 leading-relaxed">
                  For questions or concerns regarding these Terms, users can contact the Company via support email: 
                  <a href="mailto:support@100acress.com" className="text-blue-600 hover:underline">
                    {' '}support@100acress.com
                  </a>{' '}
                  or submit a query through our{' '}
                  <a href="https://www.100acress.com/contact-us/" className="text-blue-600 hover:underline">
                    contact form
                  </a>.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TermsAndConditions;













