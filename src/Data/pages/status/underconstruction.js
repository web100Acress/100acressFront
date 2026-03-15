import { createPageData } from '../../core/types.js';

const statusUnderConstructionData = createPageData('status/underconstruction', {
  urlPattern: '/projects/underconstruction',
  
  title: "Secure Your Future with Top Under-Construction Projects.",
  description: "Premium under-construction homes crafted for modern lifestyles, featuring advanced amenities, smart layouts, and strong returns on investment.",
  
  seo: {
    metaTitle: "Premium Under-Construction Homes for Smart Investors | 100acress",
    metaDescription: "Premium under-construction homes crafted for modern lifestyles, featuring advanced amenities, smart layouts, and strong returns on investment.",
    canonical: "https://www.100acress.com/projects/underconstruction/",
    keywords: "under construction properties, under construction projects in gurgaon, ongoing projects, construction status, property development, under construction homes"
  },
  
  hero: {
    title: "Secure Your Future with Top Under-Construction Projects.",
    subtitle: "Premium under-construction homes crafted for modern lifestyles, featuring advanced amenities, smart layouts, and strong returns on investment."
  },
  
  faqs: [
    {
      question: "Q.1 Which are the top under-construction projects in Gurgaon?",
      answer: "Leading projects include DLF Privana South, Godrej Miraya, Elan The Presidential, M3M Mansion, Krisumi Waterfall, Signature Global Twin Tower, and Keystone Seasons."
    },
    {
      question: "Q2: What are the top luxury under-construction properties?",
      answer: "Luxury projects feature smart layouts, wellness amenities, and include developments on Golf Course Road, Southern Peripheral Road, and Dwarka Expressway."
    },
    {
      question: "Q3: Is it cheaper to buy an under-construction property in Gurgaon?",
      answer: "Yes, early-phase properties are more economical with lower prices, flexible payment plans, and potential capital appreciation."
    },
    {
      question: "Q4: What legal checks should I do before booking?",
      answer: "Verify RERA registration, clear land titles, approved plans, commencement certificate, and the developer's track record."
    },
    {
      question: "Q5: Why is RERA registration important?",
      answer: "RERA ensures legal transparency, protects buyer investments, and enforces builder commitments on delivery and amenities."
    },
    {
      question: "Q6: How do under-construction projects offer high ROI?",
      answer: "Projects on key corridors like Dwarka Expressway and Golf Course Road have strong appreciation potential due to infrastructure growth."
    },
    {
      question: "Q7: Can buyers customize units in under-construction projects?",
      answer: "Yes, many luxury projects allow customization of layouts, interiors, and finishes during early development."
    }
  ],
  
  trustBoosters: [
    {
      icon: "🏗️",
      title: "Track Progress",
      description: "Monitor construction progress and ensure timely delivery"
    },
    {
      icon: "💰",
      title: "Flexible Payments",
      description: "Construction-linked payment plans reduce financial burden"
    },
    {
      icon: "📊",
      title: "Investment Potential",
      description: "Under-construction properties offer better appreciation potential"
    }
  ],
  
  customFields: {
    query: "underconstruction",
    badge: "Under Construction",
    badgeColor: "#F59E0B"
  }
});

export default statusUnderConstructionData;
