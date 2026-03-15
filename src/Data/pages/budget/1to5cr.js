import { createPageData } from '../../core/types.js';

const budget1To5CrData = createPageData('budget/1to5cr', {
  urlPattern: '/projects/1-5-cr',
  
  title: "Properties Between 1-5 Cr in Gurgaon - Mid-Range Homes",
  description: "Discover premium properties between 1-5 crore in Gurgaon with modern amenities, excellent locations, and great investment potential. Perfect for growing families and smart investors.",
  
  seo: {
    metaTitle: "Properties 1-5 Cr in Gurgaon - Mid-Range Homes | 100acress",
    metaDescription: "Discover premium properties between 1-5 crore in Gurgaon with modern amenities, excellent locations, and great investment potential. Perfect for growing families and smart investors.",
    canonical: "https://www.100acress.com/projects/1-5-cr/",
    keywords: "properties 1-5 cr, mid range homes gurgaon, 1-5 crore properties"
  },
  
  hero: {
    title: "Properties Between 1-5 Cr in Gurgaon",
    subtitle: "Premium mid-range homes with modern amenities and excellent locations"
  },
  
  faqs: [
    {
      question: "What types of properties are available between 1-5 Cr in Gurgaon?",
      answer: "Between 1-5 Cr, you can find 2BHK, 3BHK, and 4BHK apartments, builder floors, and villas in prime locations like Golf Course Road, Sohna Road, and Dwarka Expressway."
    },
    {
      question: "Which are the best locations for 1-5 Cr properties in Gurgaon?",
      answer: "Prime locations include Golf Course Extension Road, Sohna Road, Southern Peripheral Road, and New Gurgaon sectors. These areas offer excellent connectivity and infrastructure."
    },
    {
      question: "What amenities come with 1-5 Cr properties?",
      answer: "Properties in this range typically offer swimming pools, gyms, clubhouses, landscaped gardens, 24/7 security, power backup, and children's play areas."
    },
    {
      question: "Are 1-5 Cr properties good for investment?",
      answer: "Yes, these properties offer excellent rental yields and appreciation potential due to Gurgaon's growing commercial importance and infrastructure development."
    },
    {
      question: "What is the average size of 1-5 Cr apartments?",
      answer: "Apartments in this range typically vary from 1,200 sq ft for 2BHK to 2,500 sq ft for 4BHK, offering spacious and comfortable living spaces."
    }
  ],
  
  trustBoosters: [
    {
      icon: "🏠",
      title: "Spacious Homes",
      description: "Comfortable and spacious living spaces for families"
    },
    {
      icon: "🏊‍♀️",
      title: "Premium Amenities",
      description: "World-class amenities and facilities"
    },
    {
      icon: "📈",
      title: "Smart Investment",
      description: "Excellent appreciation and rental potential"
    }
  ],
  
  customFields: {
    budgetRange: "1to5cr",
    priceLabel: "₹1 - 5 Crore",
    badge: "Premium",
    badgeColor: "#3B82F6"
  }
});

export default budget1To5CrData;
