import { createPageData } from '../../core/types.js';

const statusBrandedResidencesData = createPageData('status/brandedresidences', {
  urlPattern: '/branded-residences',
  
  title: "Branded Residences in Gurgaon - Luxury Living",
  description: "Discover premium branded residences in Gurgaon offering luxury living with world-class amenities and exclusive lifestyle features.",
  
  seo: {
    metaTitle: "Branded Residences in Gurgaon - Luxury Living | 100acress",
    metaDescription: "Discover premium branded residences in Gurgaon offering luxury living with world-class amenities and exclusive lifestyle features.",
    canonical: "https://www.100acress.com/branded-residences/",
    keywords: "branded residences, luxury homes, branded apartments, premium residences, luxury living gurgaon"
  },
  
  hero: {
    title: "Branded Residences in Gurgaon - Luxury Living",
    subtitle: "Discover premium branded residences in Gurgaon offering luxury living with world-class amenities and exclusive lifestyle features."
  },
  
  faqs: [
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
  ],
  
  trustBoosters: [
    {
      icon: "🏆",
      title: "Global Brands",
      description: "Developed in partnership with world-renowned luxury brands"
    },
    {
      icon: "🌟",
      title: "Premium Living",
      description: "Experience luxury lifestyle with exclusive amenities and services"
    },
    {
      icon: "💎",
      title: "Investment Value",
      description: "Strong appreciation potential and premium rental yields"
    }
  ],
  
  customFields: {
    query: "brandedresidences",
    badge: "Branded",
    badgeColor: "#EAB308",
    isLuxury: true
  }
});

export default statusBrandedResidencesData;
