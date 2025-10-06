import React from "react";
import Footer from "../../Components/Actual_Components/Footer";
import { Helmet } from "react-helmet";
import Navbar from "../../aadharhomes/navbar/Navbar";

const Privacy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - 100acress.com</title>
        <meta
          name="description"
          content="Read the comprehensive Privacy Policy of 100acress.com. Learn how we collect, use, and protect your personal information while using our real estate services."
        />
        <link rel="canonical" href="https://www.100acress.com/privacy-policy/" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-12 max-w-5xl">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center border-b border-gray-300 pb-2">
              Privacy Policy - 100acress.com
            </h1>

            <div className="space-y-8">
              <section>
                <p className="text-lg text-gray-700 leading-relaxed mb-6 text-justify">
                  This Privacy Policy ("Policy") explains how 100acress.com and its subsidiaries and affiliates (collectively, the "Company") collect, use, disclose, and protect the information of users accessing its websites, mobile applications, and other digital platforms (collectively, the "Sites"). The Sites provide services for buying, selling, renting, leasing, and advertising residential and commercial properties (collectively, the "Services"). By using the Sites, registering an account, or submitting property listings, you agree to this Privacy Policy and our Terms and Conditions.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">Collection of Information</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Information You Provide</h3>
                    <p className="text-gray-700 leading-relaxed">
                      When you register on the Sites or interact with our Services, we collect personal information including your name, contact number, email address, property details, address, occupation, and other relevant data. Information provided during property listing, inquiries, feedback, surveys, or communication with our support team is also collected.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Information Collected Automatically</h3>
                    <p className="text-gray-700 leading-relaxed">
                      We collect certain information automatically when you use the Sites. This includes your IP address, device details, operating system, browser type, pages visited, search queries, clicks, and interactions with advertisements. Cookies, web beacons, and similar tracking technologies are used to personalize your experience, analyze site traffic, and understand user behavior.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Information from Third Parties</h3>
                    <p className="text-gray-700 leading-relaxed">
                      We may receive additional information from third-party sources such as analytics providers, social media accounts, advertising partners, or other service providers to improve our Services and provide personalized recommendations.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">Use of Information</h2>
                <p className="text-gray-700 leading-relaxed">
                  The information collected is used to operate and improve the Services offered on the Sites. It helps facilitate property listings, connect buyers and sellers, provide notifications regarding property inquiries, send updates about Services, and deliver personalized recommendations. The data is also used to improve website functionality, prevent fraud, and comply with legal requirements. Marketing communications may be sent only with your consent.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">Disclosure of Information</h2>
                <p className="text-gray-700 leading-relaxed">
                  Personal information may be shared with real estate agents, property developers, and service providers to facilitate property transactions. It may also be shared with business partners, legal authorities, or in connection with business transfers. Aggregated or anonymized data may be used for research, analytics, or marketing purposes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">Data Security</h2>
                <p className="text-gray-700 leading-relaxed">
                  The Company implements appropriate technical and organizational measures to protect personal information from unauthorized access, alteration, or disclosure. However, no method of transmission over the internet is completely secure, and users should exercise caution when sharing sensitive information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">User Rights and Choices</h2>
                <p className="text-gray-700 leading-relaxed">
                  Users may request access, correction, or deletion of personal information through our support email or contact form. Requests will be handled in accordance with applicable laws and business retention requirements. Residual copies may remain in backup systems for a limited period.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">Third-Party Links</h2>
                <p className="text-gray-700 leading-relaxed">
                  The Sites may contain links to external websites or applications. 100acress.com is not responsible for the content, practices, or privacy policies of third-party platforms. Users are encouraged to review the privacy policies of any third-party websites they visit.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">Updates to Privacy Policy</h2>
                <p className="text-gray-700 leading-relaxed">
                  This Privacy Policy may be updated periodically to reflect changes in technology, legal requirements, or Services. Updates take effect immediately upon posting on the Sites. Users are advised to review this Policy regularly.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">Grievance Redressal</h2>
                <p className="text-gray-700 leading-relaxed">
                  For any privacy concerns, complaints, or queries, users can contact us via support email at{' '}
                  <a href="mailto:support@100acress.com" className="text-blue-600 hover:underline">
                    support@100acress.com
                  </a>{' '}
                  or submit a request through our{' '}
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
}

export default Privacy;
