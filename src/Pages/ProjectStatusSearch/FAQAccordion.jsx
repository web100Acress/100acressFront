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
        question: "What are the best newly launched residential projects in Gurgaon?",
        answer: "Consider top projects like Smart World One DXP and Godrej Aristocrat, M3M Mansion. They feature modern designs and are strategically located in rapidly developing sectors."
      },
      {
        question: "What is the starting price for a new 3BHK flat in Gurgaon?",
        answer: "Prices for newly launched 3BHK flats generally start from ₹3.5 Crore. The final cost varies based on location, developer reputation, and amenities."
      },
      {
        question: "Which new launches are near the Dwarka Expressway?",
        answer: "Leading builders like M3M, Sobha, Puri, and Emaar have significant new projects along the Dwarka Expressway, offering superior connectivity and modern homes."
      },
      {
        question: "Are there any new luxury apartment projects available?",
        answer: "Yes, premier developers such as DLF and M3M Or Signature Global have recently launched luxury projects with world-class amenities and premium specifications in prime locations."
      },
      {
        question: "What are the typical payment plans for new launch projects?",
        answer: "Most developers offer construction-linked payment plans (e.g., 25:25:25:25). This structure links payments to construction milestones, easing financing."
      },
      {
        question: "Which newly launched projects offer good rental returns?",
        answer: "For high rental yields, target projects near major business hubs like Cyber City, Golf Course Road, and Sohna Road, which attract strong professional demand."
      },
      {
        question: "How can I verify the credibility of a new project?",
        answer: "Check the project's RERA registration number, review the developer's delivery track record, and read customer reviews to ensure a safe investment."
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
