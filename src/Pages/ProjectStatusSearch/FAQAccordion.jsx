import React, { useState } from 'react';

export default function FAQAccordion({ projectStatus, customFAQs = null }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = {
    upcoming: [
      {
        question: "What new projects are launching soon in Gurgaon?",
        answer: "Check out the latest projects by Oberoi Realty, Central Park, DLF, M3M, Signature Global, and Elan Group in Gurgaon. Dwarka Expressway and New Gurgaon are hotspots for new residential and commercial launches."
      },
      {
        question: "Which upcoming projects in Gurgaon have the best amenities?",
        answer: "Projects like Elan Sohna Road, Indiabulls Height, Rof Pravasa, DLF Privana South and M3M Golf Estate offer luxury amenities, including clubhouses, pools, and sports facilities for a premium lifestyle."
      },
      {
        question: "Are there any affordable upcoming housing projects?",
        answer: "Yes, several developers are launching projects under the Deen Dayal Jan Awas Yojna. Look for options in Sohna and the newer sectors of Gurgaon."
      },
      {
        question: "What is the expected possession date for top upcoming projects?",
        answer: "Most upcoming projects aim for possession within 3-4 years of their launch. Always verify the RERA-approved completion date before investing."
      },
      {
        question: "Which locations in Gurgaon are best for future investment?",
        answer: "Dwarka Expressway, Southern Peripheral Road (SPR), and Golf Course Extension Road are prime locations with high appreciation potential due to infrastructure."
      }
    ],
    newlaunch: [
      {
        question: "1.What makes new launch projects in Gurgaon a good investment?",
        answer: "They offer lower prices, modern features, and great value growth thanks to Gurgaon’s rapid development and strong business presence."
      },
      {
        question: "2. Which are the best areas to buy new launch projects in Gurgaon?",
        answer: "Top localities include Dwarka Expressway, Golf Course Extension Road, Sohna Road, and New Gurgaon, known for premium developments and excellent connectivity."
      },
      {
        question: "3.How can I find RERA-approved new launch projects in Gurgaon?",
        answer: "You can visit trusted real estate platforms like 100acress.com to explore verified, RERA-registered new launch projects with complete details."
      },
      {
        question: "4. What are the typical payment plans for new launch projects in Gurgaon?",
        answer: "Most developers offer construction-linked plans or flexible installment options, letting you pay in stages as the project progresses, making it easier to manage finances."
      },
      {
        question: "5.Are new launch projects in Gurgaon suitable for end-users or investors?",
        answer: "Both! End-users get modern, comfortable homes, while investors benefit from high ROI and rental demand in Gurgaon’s fast-developing areas."
      },
      {
        question: "6.What amenities can I expect in Gurgaon’s new launch projects?",
        answer: "Most projects offer clubhouses, swimming pools, gyms, landscaped gardens, and smart home features, ensuring a premium living experience."
      },
      {
        question: "7. How do I choose the right new launch project in Gurgaon?",
        answer: "Check the builder’s reputation, location, RERA status, amenities, and future development plans around the area before investing."
      }
    ],
    underconstruction: [
      {
        question: "Which are the top under-construction projects in Gurgaon?",
        answer: "Top under-construction Gurgaon projects include Central Park Flamingo Floors, M3M Altitude, Whiteland Arena 76, Sobha Horizon & DLF Grove."
      },
      {
        question: "What are the top under-construction properties in Gurgaon?",
        answer: "Look for projects by reputed developers like Central Park, M3M, Signature Global, Vatika and Godrej in developing sectors. They offer a good mix of amenities and investment potential."
      },
      {
        question: "Is it cheaper to buy an under-construction property?",
        answer: "Generally, yes. Under-construction properties are often priced lower than ready-to-move-in ones, offering a potential for higher capital appreciation."
      },
      {
        question: "What legal checks are necessary before buying an under-construction property?",
        answer: "Ensure the project is RERA registered, and the developer has all necessary approvals, including the commencement certificate and clear land title."
      }
    ],
    readytomove: [
      {
        question: "Which are the best ready-to-move projects in Gurgaon?",
        answer: "Explore luxury options like DLF The Crest on Golf Course Road or Sobha International City near Dwarka Expressway for immediate possession."
      },
      {
        question: "Where can I find affordable ready-to-move flats?",
        answer: "Look into projects like Raheja Sampada in Sector 92 or Signature Global Park in Sohna for budget-friendly, move-in ready homes."
      },
      {
        question: "What are the advantages of buying a ready-to-move property?",
        answer: "You get immediate possession, no construction delays, and can inspect the actual property, like at Emaar Gurgaon Greens, before you buy."
      },
      {
        question: "Are there ready-to-move commercial properties available?",
        answer: "Yes, projects such as AIPL Joy Street on Golf Course Extn Road and Trehan IRIS Broadway offer ready shops and offices for businesses."
      }
    ]
  };

  const currentFAQs = customFAQs || faqs[projectStatus] || [];

  return (
    <div className="space-y-0">
      {currentFAQs.map((faq, index) => (
        <div key={index} className="border-b border-gray-200 last:border-b-0">
          <button
            onClick={() => toggleFAQ(index)}
            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
          >
            <span className="font-medium text-gray-900">
              Q. {faq.question}
            </span>
            <svg
              className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                openIndex === index ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {openIndex === index && (
            <div className="px-6 pb-4">
              <p className="text-gray-600 text-sm leading-relaxed">
                {faq.answer}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
