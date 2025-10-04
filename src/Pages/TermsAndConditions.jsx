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
        <title>Terms and Conditions | 100acress.com</title>
        <link rel="canonical" href="https://www.100acress.com/terms-and-conditions/" />
      </Helmet>

      <div className='p-6 md:p-10 overflow-x-hidden mt-14 max-w-6xl mx-auto'>
        <h1 className='text-3xl md:text-4xl font-bold text-gray-800 mb-6'>Terms and Conditions – 100acress.com</h1>
        <p className='text-gray-600 mb-8'>
          These Terms and Conditions ("Terms") govern the use of 100acress.com and its Services. 
          By accessing the Sites, registering an account, or using the Services, you agree to these Terms.
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Intermediary Role</h2>
            <p className="text-gray-600">
              100acress.com acts solely as a property listing and intermediary platform connecting buyers, sellers, agents, and developers. 
              The Company does not guarantee the accuracy, legality, or ownership of listed properties. 
              Users are responsible for conducting independent verification and completing transactions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. User Responsibilities</h2>
            <p className="text-gray-600">
              Users must provide accurate and truthful information while registering and posting property listings. 
              They must refrain from submitting fraudulent, offensive, or illegal content and respect the intellectual 
              property rights of the Company and other users. Misuse of the Sites or violation of these Terms may result 
              in account suspension or termination.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Property Listings and Paid Services</h2>
            <p className="text-gray-600">
              Users can post free or premium property listings. Premium services, including featured listings or 
              advertising packages, are subject to payment terms and subscription rules. All payments for premium 
              services are generally non-refundable unless specified. Users are responsible for the content, 
              photographs, and legal compliance of the properties they list.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Liability</h2>
            <p className="text-gray-600">
              The Company is not responsible for disputes, losses, or damages arising from property transactions 
              or interactions between users. The Company does not guarantee the accuracy or completeness of property 
              listings, photographs, or other content provided by users. Errors, omissions, or technical disruptions 
              in Services do not create liability for the Company.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Intellectual Property</h2>
            <p className="text-gray-600">
              All content, software, branding, and materials on the Sites are owned by 100acress.com or its licensors. 
              Users are not allowed to reproduce, distribute, modify, or use the content without written consent from the Company.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Governing Law</h2>
            <p className="text-gray-600">
              These Terms are governed by the laws of India. Any disputes arising under these Terms are subject to the 
              exclusive jurisdiction of the courts located in Gurugram, Haryana.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Contact and Grievance Redressal</h2>
            <p className="text-gray-600">
              For questions or concerns regarding these Terms, users can contact the Company via support email: 
              <a href="mailto:support@100acress.com" className="text-blue-600 hover:underline ml-1">
                support@100acress.com
              </a> or submit a query through our 
              <a href="https://www.100acress.com/contact-us/" className="text-blue-600 hover:underline ml-1">
                contact form
              </a>.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TermsAndConditions;













