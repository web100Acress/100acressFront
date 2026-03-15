import React, { useMemo } from 'react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import './FAQSection.desktop.css';

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
    console.log('Toggling FAQ:', index, 'Current openIndex:', openIndex);
    setOpenIndex(openIndex === index ? null : index);
  };

  // Don't render if no FAQs are generated
  if (faqs.length === 0) {
    return null;
  }

  return (
    <section className="faq-section-desktop" style={{ paddingTop: '120px', zIndex: 1, position: 'relative' }}>
      {/* Animated Background Elements */}
      <div className="faq-section-desktop-background">
        <div className="faq-section-desktop-background-overlay">
          <div className="faq-section-desktop-float-1"></div>
          <div className="faq-section-desktop-float-2"></div>
        </div>
        <div className="faq-section-desktop-gradient-overlay"></div>
      </div>

      <div className="faq-section-desktop-content">
        {/* Desktop Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="faq-section-desktop-header"
        >
          <motion.div 
            className="faq-section-desktop-header-icon"
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </motion.div>
          <h2 className="faq-section-desktop-subtitle">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <h3 className="faq-section-desktop-title">
            Everything You Need to Know
          </h3>
          <div className="faq-section-desktop-accent-line"></div>
        </motion.div>

        {/* Desktop FAQ Content - Simplified without motion conflicts */}
        <div className="faq-section-desktop-faq-content">
          <div className="faq-section-desktop-faq-list">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className={`faq-section-desktop-faq-item ${openIndex === index ? 'open' : ''}`}
                onClick={() => toggleFAQ(index)}
              >
                {/* Glow Effect */}
                <div className="faq-section-desktop-faq-glow"></div>
                
                <div className="faq-section-desktop-faq-card">
                  {/* Question */}
                  <div className="faq-section-desktop-question-header">
                    <h4 className="faq-section-desktop-question">
                      {faq.title}?
                    </h4>
                    <div className={`faq-section-desktop-chevron ${openIndex === index ? 'open' : ''}`}>
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  {/* Answer */}
                  <div className={`faq-section-desktop-answer ${openIndex === index ? 'open' : ''}`}>
                    <div className="faq-section-desktop-divider"></div>
                    <p className="faq-section-desktop-answer-text">
                      {faq.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Contact CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="faq-section-desktop-cta"
        >
          <div className="faq-section-desktop-cta">
            {/* Glow Effect */}
            <div className="faq-section-desktop-cta-glow"></div>
            
            <motion.div 
              className="faq-section-desktop-cta-card"
              whileHover={{ scale: 1.02 }}
            >
              <div className="faq-section-desktop-cta-row">
                
                {/* Left Content */}
                <div className="faq-section-desktop-cta-left">
                  <motion.div 
                    className="faq-section-desktop-cta-icon"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </motion.div>
                  <div>
                    <h4 className="faq-section-desktop-cta-title">Still have questions?</h4>
                    <p className="faq-section-desktop-cta-subtitle">We're here to help you with any queries about this project.</p>
                  </div>
                </div>

                {/* Right Button */}
                <motion.button
                  onClick={onShowCallback}
                  className="faq-section-desktop-cta-button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Contact Us</span>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSectionDesktop;
