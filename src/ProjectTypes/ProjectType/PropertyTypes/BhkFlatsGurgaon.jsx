import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import Api_Service from "../../../Redux/utils/Api_Service";
import GlobalFilterTemplate from "../../../Components/GlobalFilterTemplate/GlobalFilterTemplate";
import { projectTypeConfigs } from "../../config/pageConfigs";
import { staticData } from "../../config/staticData";
import Navbar from "../../../aadharhomes/navbar/Navbar";

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
    // Filter projects by BHK type
    if (projects && projects.length > 0) {
      console.log('Filtering projects for BHK type:', bhkType);
      console.log('Total projects available:', projects.length);
      
      // Helper function to extract BHK number from string
  const extractBhkNumber = (bhkString) => {
    if (!bhkString) return null;
    
    const str = bhkString.toString().trim();
    
    // Extract number at the beginning of the string
    const match = str.match(/^(\d+(?:\.\d+)?)/);
    if (match) {
      return parseFloat(match[1]);
    }
    
    // Extract number before "BHK"
    const bhkMatch = str.match(/(\d+(?:\.\d+)?)\s*BHK/i);
    if (bhkMatch) {
      return parseFloat(bhkMatch[1]);
    }
    
    return null;
  };

  const filtered = projects.filter(project => {
        // Check multiple possible BHK fields
        const projectBhk = project.bhk || project.beds || project.bedrooms;
        const bhkTypeStr = project.bhkType || project.configuration || project.unitType;
        
        // Check if project has BHK information in simple fields
        if (projectBhk !== undefined && projectBhk !== null) {
          const bhkNumber = extractBhkNumber(projectBhk);
          if (bhkNumber !== null) {
            const matches = bhkNumber === parseInt(bhkType);
            if (matches) {
              console.log('Match found in simple fields:', project.projectName, projectBhk);
            }
            return matches;
          }
        }
        
        // Check BHK in string fields
        if (bhkTypeStr) {
          const bhkNumber = extractBhkNumber(bhkTypeStr);
          if (bhkNumber !== null) {
            const matches = bhkNumber === parseInt(bhkType);
            if (matches) {
              console.log('Match found in string fields:', project.projectName, bhkTypeStr);
            }
            return matches;
          }
        }
        
        // Check BHK in nested BhK_Details array
        if (project.BhK_Details && Array.isArray(project.BhK_Details)) {
          const hasBhkType = project.BhK_Details.some(bhkDetail => {
            const detailBhkType = bhkDetail.bhk_type;
            if (detailBhkType) {
              const bhkNumber = extractBhkNumber(detailBhkType);
              if (bhkNumber !== null) {
                const matches = bhkNumber === parseInt(bhkType);
                if (matches) {
                  console.log('Match found in BhK_Details:', project.projectName, detailBhkType);
                }
                return matches;
              }
            }
            return false;
          });
          if (hasBhkType) {
            return true;
          }
        }
        
        return false;
      });
      
      console.log('Filtered projects count:', filtered.length);
      console.log('Filtered projects:', filtered.map(p => p.projectName));
      
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
  
  const bhkConfig = staticData.bhk[bhkType] || staticData.bhk['2'];

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
