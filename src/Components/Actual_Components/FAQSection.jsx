import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

const FAQSection = ({ faqs, type = 'resale' }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Generate JSON-LD Schema for FAQs
  const generateFAQSchema = () => {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };
  };

  return (
    <>
      {/* JSON-LD Schema for SEO */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(generateFAQSchema())}
        </script>
      </Helmet>

      <section className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* Section Header */}
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-0">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-gray-200 last:border-b-0"
            >
              {/* Question Button */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-start justify-between py-4 text-left focus:outline-none hover:bg-gray-50 transition-colors"
                aria-expanded={openIndex === index}
              >
                <span className="flex-1 pr-4">
                  <h3 className="text-base md:text-lg font-medium text-gray-900 leading-relaxed">
                    Q. {faq.question}
                  </h3>
                </span>
                <span className="flex-shrink-0 text-gray-400">
                  <svg
                    className={`w-5 h-5 transition-transform duration-200 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </button>

              {/* Answer Content */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="pb-4 pl-0 pr-8">
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center bg-gray-50 rounded-lg p-8">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
            Still Have Questions?
          </h3>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Our team is here to help you find the perfect property. Get in touch with us today!
          </p>
          <a
            href="/contact-us"
            className="inline-block bg-red-500 hover:bg-red-600 text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            Contact Us
          </a>
        </div>
      </section>
    </>
  );
};

export default FAQSection;
