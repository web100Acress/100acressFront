import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import Api_Service from "../../../Redux/utils/Api_Service";
import GlobalFilterTemplate from "../../../Components/GlobalFilterTemplate/GlobalFilterTemplate";
import { projectTypeConfigs } from "../../config/pageConfigs";
import { staticData } from "../../config/staticData";
import Navbar from "../../../aadharhomes/navbar/Navbar";
import BhkHero from "../../../content-data/bhk/components/BhkHero";

const BhkFlatsGurgaon = ({ bhkType }) => {
  const { getAllProjects } = Api_Service();
  const location = useLocation();

  // Map BHK type to configuration
  const getConfigForBhk = () => {
    const bhkMap = {
      '1': 'residential-projects',
      '2': 'residential-projects',
      '3': 'residential-projects',
      '4': 'residential-projects',
      '5': 'residential-projects'
    };
    return bhkMap[bhkType] || 'residential-projects';
  };

  const projectType = getConfigForBhk();
  const config = projectTypeConfigs[projectType];

  // Get projects from Redux store
  const projects = useSelector(store => store?.allsectiondata?.[config?.reduxKey]);

  const [isLoading, setIsLoading] = useState(true);
  const [filteredProjects, setFilteredProjects] = useState([]);

  useEffect(() => {
    // Optimized BHK filtering with early return
    if (projects && projects.length > 0) {
      console.log('Filtering projects for BHK type:', bhkType);
      console.log('Total projects available:', projects.length);

      // Optimized BHK extraction function
      const extractBhkNumber = (bhkString) => {
        if (!bhkString) return null;
        const str = bhkString.toString().trim();
        const match = str.match(/^(\d+(?:\.\d+)?)/);
        if (match) return parseFloat(match[1]);
        const bhkMatch = str.match(/(\d+(?:\.\d+)?)\s*BHK/i);
        if (bhkMatch) return parseFloat(bhkMatch[1]);
        return null;
      };

      const targetBhk = parseInt(bhkType);
      
      // Optimized filtering with early returns
      const filtered = projects.filter(project => {
        // Check simple fields first (most likely to match)
        const projectBhk = project.bhk || project.beds || project.bedrooms;
        if (projectBhk !== undefined && projectBhk !== null) {
          const bhkNumber = extractBhkNumber(projectBhk);
          if (bhkNumber !== null && bhkNumber === targetBhk) {
            return true;
          }
        }

        // Check string fields
        const bhkTypeStr = project.bhkType || project.configuration || project.unitType;
        if (bhkTypeStr) {
          const bhkNumber = extractBhkNumber(bhkTypeStr);
          if (bhkNumber !== null && bhkNumber === targetBhk) {
            return true;
          }
        }

        // Check nested array only if needed (most expensive operation)
        if (project.BhK_Details && Array.isArray(project.BhK_Details)) {
          return project.BhK_Details.some(bhkDetail => {
            if (bhkDetail.bhk_type) {
              const bhkNumber = extractBhkNumber(bhkDetail.bhk_type);
              return bhkNumber !== null && bhkNumber === targetBhk;
            }
            return false;
          });
        }

        return false;
      });

      console.log('Filtered projects count:', filtered.length);
      setFilteredProjects(filtered);
      setIsLoading(false);
    } else {
      // Fetch projects if not in Redux
      setIsLoading(true);
      getAllProjects(config?.query, 0)
        .then(() => {
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('API Error:', error);
          setIsLoading(false);
        });
    }
  }, [projects, bhkType, getAllProjects, config]);

  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h1>
          <p className="text-gray-600">The requested page does not exist.</p>
        </div>
      </div>
    );
  }

  // Fallback BHK configuration since staticData.bhk was removed
  const getBhkConfig = (bhkType) => {
    const configs = {
      '1': {
        title: '1 BHK Flats in Gurgaon | Verified Listings',
        metaTitle: 'Buy 1BHK Flats in Gurgaon for Modern Lifestyle Living',
        description: 'Find budget-friendly 1 BHK flats in Gurgaon starting from ₹30 Lakhs. Perfect for bachelors and small families.',
        h1: '1 BHK Flats in Gurgaon - Your Perfect Affordable Home',
        subtitle: '',
        keywords: '1 BHK flats gurgaon, 1 bedroom apartments gurgaon, affordable flats gurgaon',
        canonical: 'https://www.100acress.com/1-bhk-flats-in-gurgaon/',
        faqs: [
          {
            question: "What is the average price of a 1 BHK flat in Gurgaon?",
            answer: "The price of a 1 BHK flat in Gurgaon ranges from ₹35 lakh to ₹5 crore in 2026."
          },
          {
            question: "Are 1BHK flats in Gurgaon suitable for rental income?",
            answer: "Yes, they attract young professionals, students, and couples, ensuring steady rental demand."
          }
        ]
      },
      '2': {
        title: '2 BHK Flats in Gurgaon | Spacious Family Apartments',
        metaTitle: '2 BHK Flats in Gurgaon for Comfortable living',
        // description: 'Looking for 2 BHK flats in Gurgaon? Explore budget and luxury apartments in top areas.',
        h1: '2 BHK Flats in Gurgaon - Perfect Family Living Spaces',
        subtitle: '',
        keywords: '2 BHK flats gurgaon, 2 bedroom apartments gurgaon, family flats gurgaon',
        canonical: 'https://www.100acress.com/2-bhk-flats-in-gurgaon/',
        faqs: [
          {
            question: "What is the price of a 2 BHK flat in Gurgaon?",
            answer: "Prices usually start from ₹65 lakh and can go up to ₹5 crore depending on sector and builder."
          },
          {
            question: "Is buying a 2 BHK flat in Gurgaon a good investment?",
            answer: "Yes, Gurgaon offers strong rental demand, infrastructure growth, and good resale value."
          }
        ]
      },
      '3': {
        title: '3 BHK Flats in Gurgaon | Luxury Family Apartments',
        metaTitle: '3 BHK Flats in Gurgaon | Buy Verified Apartments',
        description: 'Buy spacious 3 BHK flats in Gurgaon with modern amenities and great connectivity.',
        h1: '3 BHK Flats in Gurgaon - Premium Family Living Experience',
        subtitle: '',
        keywords: '3 BHK flats gurgaon, 3 bedroom apartments gurgaon, luxury flats gurgaon',
        canonical: 'https://www.100acress.com/3-bhk-flats-in-gurgaon/',
        faqs: [
          {
            question: "Which are the best locations to buy a 3 BHK flat in Gurgaon?",
            answer: "Popular areas include Golf Course Road, Sohna Road, Dwarka Expressway, and New Gurgaon."
          },
          {
            question: "What is the average price of a 3 BHK flat in Gurgaon?",
            answer: "Prices usually range from ₹3 Cr to ₹10 Cr, depending on location and amenities."
          }
        ]
      },
      '4': {
        title: '4 BHK Flats in Gurgaon | Premium Apartments',
        metaTitle: '4 BHK Flats in Gurgaon | Luxury Apartments',
        description: 'Find exclusive 4 BHK flats in Gurgaon offering large spaces and premium amenities.',
        h1: '4 BHK Flats in Gurgaon - Exclusive Luxury Residences',
        subtitle: '',
        keywords: '4 BHK flats gurgaon, 4 bedroom apartments gurgaon, luxury 4BHK gurgaon',
        canonical: 'https://www.100acress.com/4-bhk-flats-in-gurgaon/',
        faqs: [
          {
            question: "Are 4 BHK flats suitable for work-from-home families?",
            answer: "Yes, extra rooms provide space for home offices, guest rooms, or study areas."
          },
          {
            question: "What is the price of a 4 BHK flat in Gurgaon?",
            answer: "Prices usually start at ₹7 Cr and can exceed ₹20 Cr depending on location and amenities."
          }
        ]
      },
      '5': {
        title: '5 BHK Flats in Gurgaon | Modern Family Living',
        metaTitle: '5 BHK Flats in Gurgaon | Luxury Homes in Prime Locations',
        description: 'Browse the best 5 BHK flats in Gurgaon with spacious design and premium amenities.',
        h1: '5 BHK Flats in Gurgaon - The Pinnacle of Luxury Living',
        subtitle: '',
        keywords: '5 BHK flats gurgaon, 5 bedroom apartments gurgaon, ultra-luxury flats gurgaon',
        canonical: 'https://www.100acress.com/5-bhk-flats-in-gurgaon/',
        faqs: [
          {
            question: "What is the price of a 5 BHK flat in Gurgaon?",
            answer: "5 BHK flat in Gurgaon is priced starting at ₹10 Cr on Sohna Road & Dwarka Expressway."
          },
          {
            question: "Is a 5 BHK flat in Gurgaon a good investment in 2026?",
            answer: "Yes, a 5 BHK property delivers a ₹1.5–4 lakh/month rental yield with strong appreciation."
          }
        ]
      }
    };
    return configs[bhkType] || configs['1'];
  };

  const bhkConfig = getBhkConfig(bhkType);
  
  // Debug logging
  console.log('bhkType prop:', bhkType);
  console.log('bhkConfig:', bhkConfig);
  console.log('metaTitle:', bhkConfig.metaTitle);

  const generateFAQData = () => {
    return {
      "@type": "FAQPage",
      "mainEntity": bhkConfig.faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };
  };

  const customConfig = {
    ...config,
    title: bhkConfig.title,
    metaTitle: bhkConfig.metaTitle,
    description: bhkConfig.description,
    h1: bhkConfig.h1,
    subtitle: bhkConfig.subtitle,
    keywords: bhkConfig.keywords,
    canonical: bhkConfig.canonical,
    breadcrumbs: [
      { label: 'Home', path: '/' },
      { label: 'Property Types', path: '/property-types/' },
      { label: `${bhkType} BHK Flats in Gurgaon`, path: location.pathname }
    ],
    // Pass FAQ data for display
    faqs: generateFAQData().mainEntity
  };

  // Generate structured data for SEO
  const generateStructuredData = () => {
    const projectsToShow = filteredProjects.length > 0 ? filteredProjects : projects || [];
    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": bhkConfig.title,
      "description": bhkConfig.description,
      "url": bhkConfig.canonical,
      "numberOfItems": projectsToShow.length,
      "itemListElement": projectsToShow.slice(0, 10).map((project, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "RealEstateListing",
          "name": project.projectName,
          "description": project.projectAddress || project.project_discripation,
          "url": `${window.location.origin}/${project.project_url}/`,
          "image": project.frontImage?.url || project.frontImage?.cdn_url,
          "offers": {
            "@type": "Offer",
            "price": project.minPrice ? `${project.minPrice}Cr` : "Contact for Price",
            "priceCurrency": "INR",
            "availability": "https://schema.org/InStock"
          },
          "address": {
            "@type": "PostalAddress",
            "addressLocality": project.city,
            "addressRegion": project.state,
            "addressCountry": "IN"
          },
          "numberOfRooms": bhkType
        }
      }))
    };
  };

  return (
    <>
      <Navbar />
      <Helmet>
        <title>{bhkConfig.metaTitle || bhkConfig.title}</title>
        <meta name="description" content={bhkConfig.description} />
        <meta name="keywords" content={bhkConfig.keywords} />
        <link rel="canonical" href={bhkConfig.canonical} />

        {/* Open Graph Tags */}
        <meta property="og:title" content={bhkConfig.metaTitle || bhkConfig.title} />
        <meta property="og:description" content={bhkConfig.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={bhkConfig.canonical} />
        <meta property="og:image" content="https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/logo/logo.webp" />
        <meta property="og:site_name" content="100acress" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={bhkConfig.metaTitle || bhkConfig.title} />
        <meta name="twitter:description" content={bhkConfig.description} />
        <meta name="twitter:image" content="https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/logo/logo.webp" />

        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="author" content="100acress" />
        <meta name="geo.region" content="IN-HR" />
        <meta name="geo.placename" content="Gurgaon" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(generateStructuredData())}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(generateFAQData())}
        </script>
      </Helmet>

      {/* BHK Hero Section */}
      <BhkHero 
        bhkType={bhkType}
        title={customConfig.title}
        subtitle={customConfig.description}
        onExplore={() => window.open('https://www.100acress.com/projects/upcoming/', '_blank')}
        onContact={() => window.open('https://www.100acress.com/contact', '_blank')}
        onSearch={(query) => console.log('Search for:', query)}
        onFilterChange={(key, value) => console.log('Filter change:', key, value)}
      />

      <GlobalFilterTemplate
        key={location.pathname}
        pageConfig={customConfig}
        projects={filteredProjects}
        isLoading={isLoading}
      />
    </>
  );
};

export default BhkFlatsGurgaon;
