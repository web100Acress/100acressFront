import { createPageData } from '../../core/types.js';

const statusNewLaunchData = createPageData('status/newlaunch', {
  urlPattern: '/projects/newlaunch',
  
  title: "Explore the Latest New Launch Projects in Gurgaon",
  description: "Discover the latest new launch projects in Gurgaon with modern apartments, villas, and premium amenities for a luxurious lifestyle.",
  
  seo: {
    metaTitle: "Explore the Latest New Launch Projects in Gurgaon | 100acress",
    metaDescription: "Discover the latest new launch projects in Gurgaon with modern apartments, villas, and premium amenities for a luxurious lifestyle.",
    canonical: "https://www.100acress.com/projects/newlaunch/",
    keywords: "new launch projects in gurgaon, new launch projects, latest projects, new residential projects, property launches, new property launches"
  },
  
  hero: {
    title: "Luxury Awaits in Gurgaon's Latest New Launch Projects",
    subtitle: "Experience modern living with new launch projects in Gurgaon crafted for your lifestyle and future growth."
  },
  
  faqs: [
    {
      question: "What makes new launch projects in Gurgaon a good investment?",
      answer: "They offer lower prices, modern features, and great value growth thanks to Gurgaon's rapid development and strong business presence."
    },
    {
      question: "Which are the best areas to buy new launch projects in Gurgaon?",
      answer: "Top localities include Dwarka Expressway, Golf Course Extension Road, Sohna Road, and New Gurgaon, known for premium developments and excellent connectivity."
    },
    {
      question: "How can I find RERA-approved new launch projects in Gurgaon?",
      answer: "You can visit trusted real estate platforms like 100acress.com to explore verified, RERA-registered new launch projects with complete details."
    },
    {
      question: "What are the typical payment plans for new launch projects in Gurgaon?",
      answer: "Most developers offer construction-linked plans or flexible installment options, letting you pay in stages as the project progresses, making it easier to manage finances."
    },
    {
      question: "Are new launch projects in Gurgaon suitable for end-users or investors?",
      answer: "Both! End-users get modern, comfortable homes, while investors benefit from high ROI and rental demand in Gurgaon's fast-developing areas."
    },
    {
      question: "What amenities can I expect in Gurgaon's new launch projects?",
      answer: "Most projects offer clubhouses, swimming pools, gyms, landscaped gardens, and smart home features, ensuring a premium living experience."
    },
    {
      question: "How do I choose the right new launch project in Gurgaon?",
      answer: "Check the builder's reputation, location, RERA status, amenities, and future development plans around the area before investing."
    }
  ],
  
  trustBoosters: [
    {
      icon: "🆕",
      title: "Latest Features",
      description: "Get the newest amenities and smart home technologies"
    },
    {
      icon: "🎨",
      title: "Modern Design",
      description: "Contemporary architecture and interior designs"
    },
    {
      icon: "🏆",
      title: "Best Prices",
      description: "Launch prices are often the most competitive"
    }
  ],
  
  customFields: {
    query: "newlaunch",
    badge: "New Launch",
    badgeColor: "#8B5CF6"
  }
});

export default statusNewLaunchData;
