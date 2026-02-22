import React, { useState } from 'react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

const FAQSectionDesktop = ({ projectViewDetails = {}, onShowCallback = () => {} }) => {
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
        content: `${projectViewDetails.projectName} is strategically located in ${projectViewDetails?.projectAddress}, ${projectViewDetails?.city}. A well-connected and rapidly developing non hub.`
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
    <section className="relative py-16 md:py-20 bg-gradient-to-b from-black via-gray-900 to-black text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-tl from-amber-400 to-amber-500 rounded-full blur-3xl animate-float animation-delay-2000"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/3 to-transparent mb-2"></div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Desktop Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-6"
        >
          <motion.div 
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full mb-3"
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </motion.div>
          <h2 className="text-amber-400 text-sm font-semibold uppercase tracking-[0.3em] mb-2">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <h3 className="text-white text-4xl md:text-5xl font-bold leading-tight mb-3 max-w-4xl mx-auto">
            Everything You Need to Know
          </h3>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 rounded-full mx-auto"></div>
        </motion.div>

        {/* Desktop FAQ Content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-5xl mx-auto mt-6"
        >
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="group"
              >
                <div className="relative">
                  {/* Glow Effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-amber-600 to-amber-400 rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
                  
                  <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl backdrop-blur-sm overflow-hidden">
                    
                    {/* Question */}
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-800/30 transition-all duration-300 group"
                    >
                      <h4 className="text-white font-semibold text-lg md:text-xl pr-4 leading-relaxed">
                        {faq.title}?
                      </h4>
                      <motion.div 
                        className={`flex-shrink-0 w-6 h-6 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center transition-all duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </motion.div>
                    </button>

                    {/* Answer */}
                    <motion.div 
                      className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                      initial={false}
                      animate={{ height: openIndex === index ? 'auto' : 0 }}
                    >
                      <div className="px-6 pb-4">
                        <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent mb-3"></div>
                        <p className="text-gray-300 leading-relaxed text-base">
                          {faq.content}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Desktop Contact CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-5xl mx-auto mt-12"
        >
          <div className="relative group">
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-600 to-amber-400 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-all duration-700"></div>
            
            <motion.div 
              className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl p-6 md:p-8 backdrop-blur-sm"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between space-x-8">
                
                {/* Left Content */}
                <div className="flex items-start space-x-4 flex-1">
                  <motion.div 
                    className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </motion.div>
                  <div>
                    <h4 className="text-white font-bold text-lg mb-1">Still have questions?</h4>
                    <p className="text-gray-400 text-sm">We're here to help you with any queries about this project.</p>
                  </div>
                </div>

                {/* Right Button */}
                <motion.button
                  onClick={onShowCallback}
                  className="flex-shrink-0 bg-gradient-to-r from-amber-600 to-amber-500 text-black font-bold px-6 py-3 rounded-lg hover:from-amber-500 hover:to-amber-400 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Contact Us</span>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scoped styles for this component */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
};

export default FAQSectionDesktop;
