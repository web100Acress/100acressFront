import React, { useState } from 'react';
import './FAQSection.css';

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What are branded residences?",
      answer: "Branded residences are luxury homes developed with global brands, offering premium design, exclusive amenities, and professionally managed services."
    },
    {
      question: "Why are branded residences popular in India?",
      answer: "They offer luxury living, trusted brand value, premium amenities, and better property management compared to regular residential projects."
    },
    {
      question: "Are branded residences a good investment?",
      answer: "Yes, branded residences often attract premium buyers and tenants, helping maintain strong resale value and rental demand."
    },
    {
      question: "How are branded residences different from luxury apartments?",
      answer: "Branded residences involve global brand partnerships, offering curated design, exclusive services, and a lifestyle experience beyond typical luxury apartments."
    },
    {
      question: "Do branded residences offer hotel-style services?",
      answer: "Many branded residences provide services like concierge, housekeeping, valet parking, and private club access."
    },
    {
      question: "Are branded residences more expensive than normal properties?",
      answer: "Yes, they usually cost more due to brand association, premium design, exclusive amenities, and luxury lifestyle services."
    },
    {
      question: "Who should buy branded residences?",
      answer: "High-net-worth buyers, NRIs, and investors seeking luxury living, global brand standards, and long-term investment potential."
    },
    {
      question: "Are branded residences available in Gurgaon?",
      answer: "Yes, Gurgaon offers several branded residence projects by leading developers in prime locations with luxury amenities."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-section">
      <div className="faq-container">
        <h2 className="faq-title">Frequently Asked Questions</h2>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className={`faq-item ${activeIndex === index ? 'active' : ''}`}>
              <button 
                className="faq-question"
                onClick={() => toggleFAQ(index)}
              >
                <span>{faq.question}</span>
                <span className="faq-icon">{activeIndex === index ? '−' : '+'}</span>
              </button>
              <div className={`faq-answer ${activeIndex === index ? 'show' : ''}`}>
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
