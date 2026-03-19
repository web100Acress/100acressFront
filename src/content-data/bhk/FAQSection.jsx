import React, { useState } from 'react';

const FAQSection = ({ bhkType }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = {
    '1 BHK': [
      {
        question: "What is the average price of a 1 BHK flat in Gurgaon?",
        answer: "The price of a 1 BHK flat in Gurgaon ranges from ₹35 lakh to ₹5 crore in 2026. Ideal for salaried professionals, first-time buyers, and mid-budget investors. Price varies by zone, builder, carpet area, and amenities."
      },
      {
        question: "Are 1BHK flats in Gurgaon suitable for rental income?",
        answer: "Yes, they attract young professionals, students, and couples, ensuring steady rental demand."
      },
      {
        question: "Which are the best localities to buy a 1 BHK flat in Gurgaon?",
        answer: "Popular sectors include Sector 37D, Sector 70, Sector 95, Sector 92, and Sohna Road due to affordability and connectivity."
      },
      {
        question: "What documents should be checked before buying a 1BHK flat?",
        answer: "Verify a RERA registration, title deed, builder approvals, occupancy certificate, and bank approvals."
      },
      {
        question: "What amenities are available in 1BHK projects in Gurgaon?",
        answer: "Common amenities include security, parking, lifts, parks, power backup, and gated community facilities."
      }
    ],
    '2 BHK': [
      {
        question: "What is the price of a 2 BHK flat in Gurgaon?",
        answer: "Prices usually start from ₹65 lakh and can go up to ₹5 crore depending on sector, builder, amenities, and connectivity."
      },
      {
        question: "Is buying a 2 BHK flat in Gurgaon a good investment?",
        answer: "Yes, Gurgaon offers strong rental demand, infrastructure growth, and good resale value for long-term investors."
      },
      {
        question: "Which sectors are best for buying a 2 BHK flat in Gurgaon?",
        answer: "Popular sectors include 67, 70, 79, 84, 92, and Dwarka Expressway for good connectivity and future property appreciation."
      },
      {
        question: "Is Gurgaon good for first-time home buyers?",
        answer: "Yes, Gurgaon offers many affordable and mid-range 2 BHK projects with modern amenities and good connectivity."
      },
      {
        question: "What documents should I check before buying a 2 BHK flat?",
        answer: "Check RERA registration, builder approvals, land title, sale agreement, and bank approvals before purchasing."
      }
    ],
    '3 BHK': [
      {
        question: "Which are the best locations to buy a 3 BHK flat in Gurgaon?",
        answer: "Popular areas include Golf Course Road, Sohna Road, Dwarka Expressway, New Gurgaon, and Sector 57–67."
      },
      {
        question: "What is the average price of a 3 BHK flat in Gurgaon?",
        answer: "Prices usually range from ₹3 Cr to ₹10 Cr, depending on location, builder reputation, and project amenities."
      },
      {
        question: "What amenities are available in 3 BHK flats in Gurgaon?",
        answer: "The top 3 BHK property projects in Gurgaon offer a clubhouse, pool, gym, jogging track, EV charging, 24x7 CCTV security, power backup, smart home tech, and landscaped greens."
      },
      {
        question: "What are the top builders for 3 BHK flats in Gurgaon?",
        answer: "Leading developers for 3 BHK flats in Gurgaon: DLF, M3M, Godrej Properties, Emaar, Signature Global, SOBHA, BPTP, Tata Housing, and Elan Group are known for quality builds, timely delivery & strong resale value."
      },
      {
        question: "Is buying a 3 BHK flat in Gurgaon a good investment in 2026?",
        answer: "Absolutely. A 3 BHK property in Gurgaon has seen 18–25% price appreciation. Metro expansion, Dwarka Expressway connectivity & corporate demand drive growth. Rental yields at 3–5% p.a. make it a smart buy in 2026."
      }
    ],
    '4 BHK': [
      {
        question: "Are 4 BHK flats suitable for work-from-home families?",
        answer: "Yes, extra rooms provide space for home offices, guest rooms, or study areas for modern lifestyle needs."
      },
      {
        question: "What amenities are offered in 4 BHK apartments in Gurgaon?",
        answer: "Premium 4 BHK property in Gurgaon features a clubhouse, gym & spa, resort pool, landscaped gardens, jogging tracks, kids' play zones, tennis/badminton/basketball courts, co-working spaces, a rooftop lounge, 24x7 CCTV security, smart home automation, EV charging stations, and dedicated basement parking."
      },
      {
        question: "Do 4 BHK flats in Gurgaon offer good rental returns?",
        answer: "Luxury rentals attract expats and corporate executives, offering strong rental income in premium locations."
      },
      {
        question: "What is the price of a 4 BHK flat in Gurgaon?",
        answer: "Prices usually start at ₹7 Cr and can exceed ₹20 Cr depending on the location, builder, and luxury amenities."
      },
      {
        question: "Which are the best areas to buy a 4 BHK flat in Gurgaon?",
        answer: "Top locations for 4 BHK properties in Gurgaon: Golf Course Road (ultra-luxury), Dwarka Expressway (high growth), Sohna Road (family-friendly), Golf Course Extension (IT/corporate hub), and DLF City Ph 1–5 (legacy premium)."
      }
    ],
    '5 BHK': [
      {
        question: "What is the price of a 5 BHK flat in Gurgaon?",
        answer: "5 BHK flat in Gurgaon is priced starting at ₹10 Cr on Sohna Road & Dwarka Expressway, rising to ₹30 Cr+ on Golf Course Road. Premium zones: DLF Phases, Sector 54, 58, 65"
      },
      {
        question: "What amenities do 5 BHK apartments in Gurgaon offer?",
        answer: "Top 5 BHK properties in Gurgaon feature an infinity pool, gym, spa, EV charging, smart home tech, co-working space, concierge, private elevator, multi-sport courts & 24x7 security. Ultra-luxury: valet & private lift."
      },
      {
        question: "Is a 5 BHK flat in Gurgaon a good investment in 2026?",
        answer: "Yes, a 5 BHK property in Gurgaon delivers a ₹1.5–4 lakh/month rental yield. Values on the Dwarka Expressway & Golf Course Extension Road rose 30–45% (2022–25). 250+ Fortune 500 firms drive steady HNI demand."
      },
      {
        question: "Which are the best areas to purchase a 5 BHK flat in Gurgaon?",
        answer: "Top locations for a 5 BHK flat in Gurgaon: Golf Course Road (DLF ultra-luxury), Golf Course Ext. Road (M3M, Salcon), Dwarka Expressway (new launches), Sohna Road, and DLF Phase 1–5 (legacy luxury)."
      },
      {
        question: "What is the typical size (sq ft) of a 5 BHK flat in Gurgaon?",
        answer: "5 BHK flat in Gurgaon: size: 2,200–3,500 sq ft (budget, Sohna Rd); 3,500–6,000 sq ft (mid-luxury, Golf Course Ext.); 9,500–11,000 sq ft (ultra-premium, DLF The Dahlias, Sec 54)."
      }
    ]
  };

  const currentFaqs = faqData[bhkType] || [];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-section">
      <div className="faq-container">
        <h2 className="faq-title">Frequently Asked Questions</h2>
        <div className="faq-list">
          {currentFaqs.map((faq, index) => (
            <div 
              key={index} 
              className={`faq-item ${activeIndex === index ? 'active' : ''}`}
            >
              <button
                className="faq-question"
                onClick={() => toggleAccordion(index)}
              >
                <span>{faq.question}</span>
                <span className="faq-icon">
                  {activeIndex === index ? '−' : '+'}
                </span>
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
