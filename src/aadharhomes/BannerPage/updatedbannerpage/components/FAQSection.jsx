import React, { useState } from 'react';
import { format } from 'date-fns';

const FAQSection = ({ projectViewDetails = {} }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const formatDate = (dateString) => {
    if (!dateString) return 'To be announced';
    try {
      return format(new Date(dateString), 'MMMM yyyy');
    } catch {
      return 'To be announced';
    }
  };

  // Generate dynamic FAQ content based on project data
  const generateFAQs = () => {
    const faqs = [];

    if (projectViewDetails?.projectName) {
      faqs.push({
        title: `What is the exact Location of ${projectViewDetails.projectName}`,
        content: `${projectViewDetails.projectName} is strategically located in ${projectViewDetails?.projectAddress}, ${projectViewDetails?.city}. A well-connected and rapidly developing ${projectViewDetails?.projectOverview || 'residential'} hub.`
      });
    }

    if (projectViewDetails?.projectName && projectViewDetails?.possessionDate) {
      faqs.push({
        title: `What is the expected possession date for ${projectViewDetails.projectName} ${projectViewDetails.city}`,
        content: `${projectViewDetails.projectName} is a ${projectViewDetails?.project_Status || 'upcoming'} project with possession scheduled for ${formatDate(projectViewDetails.possessionDate)}.`
      });
    }

    if (projectViewDetails?.projectReraNo) {
      faqs.push({
        title: `How can I verify the RERA approval status of ${projectViewDetails.projectName}`,
        content: `You can verify the RERA registration status of ${projectViewDetails.projectName} by visiting the official state RERA website. The project is registered under RERA with the number ${projectViewDetails.projectReraNo}.`
      });
    }

    if (projectViewDetails?.builderName) {
      faqs.push({
        title: `Who is the developer of ${projectViewDetails.projectName} ${projectViewDetails.city}`,
        content: `${projectViewDetails.projectName} is developed by ${projectViewDetails.builderName}, a renowned real estate developer known for delivering premium residential and commercial projects across India.`
      });
    }

    if (projectViewDetails?.BhK_Details?.length > 0) {
      const bhkTypes = projectViewDetails.BhK_Details.map(data => data.bhk_type).join(', ');
      faqs.push({
        title: `What types of BHK units are available in ${projectViewDetails.projectName} ${projectViewDetails?.projectAddress}`,
        content: `${projectViewDetails.projectName} offers thoughtfully designed ${bhkTypes} ${projectViewDetails?.projectOverview !== "none" ? `${projectViewDetails.projectOverview} floors` : ""} units, catering to modern lifestyle needs.`
      });
    }

    return faqs;
  };

  const faqs = generateFAQs();

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Don't render if no FAQs are generated
  if (faqs.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-gradient-to-b from-black via-gray-900 to-black text-white relative overflow-hidden">
      {/* Sophisticated Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-gradient-to-tl from-amber-400 to-amber-500 rounded-full blur-3xl"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/5 to-transparent"></div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Premium Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full mb-6">
            <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-amber-400 text-sm font-semibold uppercase tracking-[0.2em] mb-4">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <h3 className="text-white text-3xl md:text-4xl font-bold leading-tight mb-6 max-w-3xl mx-auto">
            Everything You Need to Know
          </h3>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 rounded-full mx-auto"></div>
        </div>

        {/* FAQ Content */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-600 to-amber-400 rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
                <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl border border-gray-700/50 backdrop-blur-sm overflow-hidden">
                  
                  {/* Question */}
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-800/30 transition-colors duration-300"
                  >
                    <h4 className="text-white font-semibold text-base md:text-lg pr-4">
                      {faq.title}?
                    </h4>
                    <div className={`flex-shrink-0 w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                      <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>

                  {/* Answer */}
                  <div className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="px-6 pb-5">
                      <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent mb-4"></div>
                      <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                        {faq.content}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="max-w-3xl mx-auto mt-12">
          <div className="bg-gradient-to-r from-amber-600/10 to-amber-500/5 rounded-xl p-6 border border-amber-600/20">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <h5 className="text-amber-400 font-semibold mb-2">Still Have Questions?</h5>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Our expert team is here to help you with any additional questions about {projectViewDetails?.projectName}. 
                  Contact us for personalized assistance and detailed project information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
