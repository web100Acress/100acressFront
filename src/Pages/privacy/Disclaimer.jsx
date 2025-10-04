import React from 'react';
import { Helmet } from 'react-helmet';
import Footer from '../../Components/Actual_Components/Footer';
import Navbar from '../../aadharhomes/navbar/Navbar';

const Disclaimer = () => {
  return (

    <>
      <Helmet>
        <title>Disclaimer - 100acress.com</title>
        <meta name="description" content="Disclaimer for 100acress.com - Read our terms of use and legal disclaimers regarding property listings and user responsibilities." />
        <link rel="canonical" href="https://www.100acress.com/disclaimer" />
      </Helmet>
      
     
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-12 max-w-5xl">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-gray-800 mt-12 mb-6 text-center border-b border-gray-300 pb-2">
              Disclaimer - 100acress.com
            </h1>

            <p className="mb-4 text-justify">
              The information provided on 100acress.com is intended for general informational purposes only. While the Company strives to ensure accuracy, completeness, and reliability of the content, it does not guarantee that the information on the Sites is free from errors, omissions, or misrepresentations. Users should independently verify all details before making any property-related decisions, including buying, selling, renting, or leasing real estate.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4 border-b border-gray-300 pb-2">Intermediary Role</h2>
            <p className="mb-4 text-justify">
              100acress.com operates solely as a property listing and intermediary platform. The Company connects buyers, sellers, agents, and developers but does not engage in property ownership, management, or verification of legal titles. All interactions, negotiations, and transactions facilitated through the Sites are conducted at the user's own risk. The Company does not assume responsibility for disputes, financial loss, or damages arising from such transactions.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4 border-b border-gray-300 pb-2">Accuracy of Listings</h2>
            <p className="mb-4 text-justify">
              Property listings, photographs, floor plans, prices, and other content are submitted by users or third-party sources. While 100acress.com attempts to verify listings for quality and relevance, it does not guarantee accuracy, authenticity, or compliance with local laws. Users are advised to conduct independent due diligence before acting on any property information.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4 border-b border-gray-300 pb-2">Third-Party Links</h2>
            <p className="mb-4 text-justify">
              The Sites may contain links to third-party websites, advertisements, or applications. 100acress.com does not control these external websites and is not responsible for their content, privacy policies, or practices. Users visiting third-party websites do so at their own risk and should review the respective privacy policies and terms of use of those websites.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4 border-b border-gray-300 pb-2">Security and Technical Disclaimer</h2>
            <p className="mb-4 text-justify">
              Although the Company employs reasonable security measures to protect user data and ensure the proper functioning of the Sites, no system is completely secure. 100acress.com does not guarantee that the Sites will always be accessible, free from viruses, or uninterrupted. Users are responsible for maintaining secure passwords, safeguarding account information, and taking necessary precautions while using the Services.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4 border-b border-gray-300 pb-2">Limitation of Liability</h2>
            <p className="mb-4 text-justify">
              The Company is not liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use the Sites or Services. This includes, but is not limited to, financial loss, missed opportunities, or disputes arising between users. Users acknowledge that property transactions involve inherent risks and undertake such transactions at their own discretion.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4 border-b border-gray-300 pb-2">Legal Compliance</h2>
            <p className="mb-6 text-justify">
              Users are responsible for ensuring that any property transactions comply with applicable laws, rules, and regulations in their jurisdiction. The Company does not provide legal, financial, or investment advice, and users should consult qualified professionals before entering into property agreements.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4 border-b border-gray-300 pb-2">Contact and Grievance Redressal</h2>
            <p className="mb-8 text-justify">
              For any questions, complaints, or concerns regarding the use of the Sites, property listings, or disclosure of information, users can contact support@100acress.com or submit a query through the contact form: https://www.100acress.com/contact-us/. The Company will make reasonable efforts to address inquiries and resolve issues promptly.
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default Disclaimer;
