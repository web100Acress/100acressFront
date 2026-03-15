/**
 * Common / Shared Data
 * 
 * This file contains shared data that is used across multiple pages:
 * - Common FAQs
 * - Trust Indicators
 * - Contact Information
 * - Social Media Links
 */

// Common FAQs that appear on all pages
export const commonFAQs = [
  {
    question: "How do I verify the authenticity of a project?",
    answer: "Always check the RERA registration number, verify the developer's credentials, read customer reviews, and visit the project site before investing."
  },
  {
    question: "What documents should I check before buying a property?",
    answer: "Check the title deed, NOC from authorities, approved building plans, RERA registration, and all legal clearances before making any payment."
  },
  {
    question: "What is the best time to invest in real estate?",
    answer: "Real estate is a long-term investment. The best time is when you have sufficient funds, clear requirements, and have done thorough research about the location and developer."
  },
  {
    question: "How can I get the best deal on a property?",
    answer: "Research market prices, negotiate with developers, look for early bird offers, consider under-construction properties, and work with experienced real estate agents."
  },
  {
    question: "What are the hidden costs in property buying?",
    answer: "Consider registration charges, stamp duty, maintenance charges, parking charges, club membership fees, and other miscellaneous costs while budgeting for your property."
  }
];

// Trust indicators used across the site
export const trustIndicators = {
  rera: {
    icon: "🛡️",
    title: "RERA Approved",
    description: "All our projects are RERA registered ensuring legal compliance and transparency"
  },
  trusted: {
    icon: "🏆",
    title: "Trusted Partners",
    description: "Working with top developers like DLF, M3M, Sobha, and Signature Global"
  },
  premium: {
    icon: "🏠",
    title: "Premium Properties",
    description: "Handpicked luxury properties with modern amenities and prime locations"
  },
  security: {
    icon: "🔒",
    title: "Secure Investment",
    description: "All transactions are secure with proper legal documentation"
  },
  support: {
    icon: "🤝",
    title: "24/7 Support",
    description: "Round-the-clock customer support for all your real estate needs"
  }
};

// Contact information
export const contactInfo = {
  phone: "+91 85009 00100",
  whatsapp: "918500900100",
  email: "info@100acress.com",
  website: "https://www.100acress.com"
};

// Social media links
export const socialLinks = {
  facebook: "https://facebook.com/100acress",
  twitter: "https://twitter.com/100acressdotcom",
  instagram: "https://instagram.com/100acress",
  linkedin: "https://linkedin.com/company/100acress"
};

// Helper to get default trust boosters
export const getDefaultTrustBoosters = () => [
  trustIndicators.rera,
  trustIndicators.trusted,
  trustIndicators.premium
];

// Combine page FAQs with common FAQs
export const combineFAQs = (pageFAQs = []) => {
  return [...pageFAQs, ...commonFAQs];
};

export default {
  commonFAQs,
  trustIndicators,
  contactInfo,
  socialLinks,
  getDefaultTrustBoosters,
  combineFAQs
};
