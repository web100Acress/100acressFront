import { createPageData } from '../../core/types.js';

const statusReadyToMoveData = createPageData('status/readytomove', {
  urlPattern: '/projects/ready-to-move',
  
  title: "Ready To Move Projects | Instant Possession Homes",
  description: "Find the best RERA-registered ready to move projects in Gurugram with premium features and prime locations. Start living your dream lifestyle now.",
  
  seo: {
    metaTitle: "Ready to Move Projects | Instant Possession Homes | 100acress",
    metaDescription: "Find the best RERA-registered ready to move projects in Gurugram with premium features and prime locations. Start living your dream lifestyle now.",
    canonical: "https://www.100acress.com/projects/ready-to-move/",
    keywords: "ready to move properties, ready to move projects in gurugram, immediate possession, completed projects, ready homes, move in ready"
  },
  
  hero: {
    title: "Ready To Move Projects | Instant Possession Homes",
    subtitle: "Find the best RERA-registered ready to move projects in Gurugram with premium features and prime locations. Start living your dream lifestyle now."
  },
  
  faqs: [
    {
      question: "Which are the best ready-to-move projects in Gurugram?",
      answer: "Top projects include M3M St Andrews, Greenopolis, AMB Selfie Street, and Raheja Sampada offering premium amenities and immediate possession."
    },
    {
      question: "Where can I find affordable ready-to-move flats in Gurugram?",
      answer: "Affordable options are available in sectors like Dwarka Expressway, New Gurgaon, and Sohna Road with good amenities and prices under ₹2 Cr."
    },
    {
      question: "What benefits come with buying ready-to-move properties?",
      answer: "Immediate possession, no construction delays, GST savings on property price, and potential for instant rental income."
    },
    {
      question: "Are ready-to-move commercial properties available in Gurugram?",
      answer: "Yes, projects like AIPL Joy Street and Trehan IRIS Broadway provide ready shops and office spaces for business use."
    },
    {
      question: "How do I verify the legal status of ready-to-move projects?",
      answer: "Check the project's RERA registration and possession certificate on official state RERA websites for secure purchases."
    },
    {
      question: "Can I get home loans on ready-to-move properties?",
      answer: "Yes, legally clear ready-to-move properties are eligible for home loans from banks and financial institutions."
    },
    {
      question: "What amenities are commonly included in ready-to-move projects?",
      answer: "Swimming pools, gyms, parks, clubhouse, 24/7 security, and landscaped gardens are standard features in premium ready-to-move projects."
    }
  ],
  
  trustBoosters: [
    {
      icon: "🏠",
      title: "Immediate Possession",
      description: "Move in immediately without waiting for construction completion"
    },
    {
      icon: "👀",
      title: "Inspect Before Buy",
      description: "See the actual property and amenities before making your decision"
    },
    {
      icon: "⚡",
      title: "No Delays",
      description: "Avoid construction delays and start living your dream life today"
    }
  ],
  
  customFields: {
    query: "readytomove",
    badge: "Ready to Move",
    badgeColor: "#22C55E"
  }
});

export default statusReadyToMoveData;
