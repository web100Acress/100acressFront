import React from 'react';
import { Helmet } from 'react-helmet-async';

const ContactCardLayout = ({ children, contactData }) => {
  // Generate dynamic meta tags based on contact data
  const generateMetaTags = () => {
    if (!contactData) {
      return {
        title: "Contact Card | 100acress",
        description: "Digital contact card powered by 100acress.com",
        image: "/favicon.ico"
      };
    }

    const title = `${contactData.name}${contactData.designation ? ` - ${contactData.designation}` : ''} | 100acress`;
    const description = `Connect with ${contactData.name}${contactData.designation ? `, ${contactData.designation}` : ''}${contactData.company ? ` at ${contactData.company}` : ''}. Digital contact card powered by 100acress.com`;
    const image = contactData.profile_image_url || contactData.company_logo_url || "/favicon.ico";
    const url = `https://100acress.com/hi/${contactData.slug}`;

    return { title, description, image, url };
  };

  const metaTags = generateMetaTags();

  return (
    <>
      <Helmet>
        {/* Basic Meta Tags */}
        <title>{metaTags.title}</title>
        <meta name="description" content={metaTags.description} />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={metaTags.title} />
        <meta property="og:description" content={metaTags.description} />
        <meta property="og:image" content={metaTags.image} />
        <meta property="og:url" content={metaTags.url} />
        <meta property="og:type" content="profile" />
        <meta property="og:site_name" content="100acress" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTags.title} />
        <meta name="twitter:description" content={metaTags.description} />
        <meta name="twitter:image" content={metaTags.image} />
        
        {/* Additional Meta Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content={contactData?.name || "100acress"} />
        <link rel="canonical" href={metaTags.url} />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        
        {/* Viewport for mobile responsiveness */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Theme color */}
        <meta name="theme-color" content={contactData?.brandColor || "#6366f1"} />
        
        {/* Structured Data for Contact Information */}
        {contactData && (
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": contactData.name,
              "jobTitle": contactData.designation,
              "worksFor": contactData.company ? {
                "@type": "Organization",
                "name": contactData.company
              } : undefined,
              "email": contactData.email,
              "telephone": contactData.phone,
              "url": contactData.website,
              "image": contactData.profile_image_url,
              "address": contactData.address ? {
                "@type": "PostalAddress",
                "streetAddress": contactData.address.street,
                "addressLocality": contactData.address.city,
                "addressRegion": contactData.address.state,
                "postalCode": contactData.address.zipCode,
                "addressCountry": contactData.address.country
              } : undefined,
              "sameAs": contactData.socialLinks ? Object.values(contactData.socialLinks).filter(Boolean) : undefined
            })}
          </script>
        )}
      </Helmet>
      
      {/* Clean layout without navbar/footer */}
      <div className="min-h-screen">
        {children}
      </div>
    </>
  );
};

export default ContactCardLayout;
