import { createPageData } from '../../core/types.js';

const typePlotsData = createPageData('type/plots', {
  urlPattern: '/projects/plots',
  
  title: "Plots in Gurugram",
  description: "Explore premium residential plots in prime locations. Build your custom home with modern amenities and excellent connectivity.",
  
  seo: {
    metaTitle: "Residential Plots - Build Your Dream Home | 100acress",
    metaDescription: "Explore premium residential plots in prime locations. Build your custom home with modern amenities and excellent connectivity.",
    canonical: "https://www.100acress.com/projects/plots/",
    keywords: "residential plots, plots for sale, land for sale, residential land, plot investment"
  },
  
  hero: {
    title: "Residential Plots - Build Your Dream Home",
    subtitle: "Explore premium residential plots in prime locations with excellent connectivity"
  },
  
  faqs: [
    {
      question: "What are the benefits of buying a residential plot?",
      answer: "Plots offer flexibility to build your dream home, potential for higher appreciation, and freedom to customize according to your needs."
    },
    {
      question: "What should I check before buying a plot?",
      answer: "Verify land title, check for any legal disputes, ensure clear access roads, check for utilities availability, and verify RERA registration if applicable."
    },
    {
      question: "What is the average price per square yard for plots?",
      answer: "Plot prices vary by location. In prime areas, prices start from ₹50,000 per sq yard, while in developing areas, they start from ₹15,000 per sq yard."
    }
  ],
  
  trustBoosters: [
    {
      icon: "🏗️",
      title: "Build Your Dream",
      description: "Freedom to design and build your perfect home"
    },
    {
      icon: "📈",
      title: "High Appreciation",
      description: "Plots typically offer higher appreciation than built properties"
    },
    {
      icon: "🎨",
      title: "Custom Design",
      description: "Complete freedom to design your home as per your vision"
    }
  ],
  
  customFields: {
    propertyType: "plots",
    badge: "Plots",
    badgeColor: "#14B8A6"
  }
});

export default typePlotsData;
