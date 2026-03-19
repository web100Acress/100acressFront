import React from 'react';
import { Helmet } from 'react-helmet-async';
import FAQSection from './FAQSection';
// import BhkHero from './components/BhkHero';

const structuredData = {
  "@context": "https://schema.org",
  "@type": "RealEstateListing",
  "name": "4 BHK Flats in Gurgaon 2026",
  "description": "Explore verified 4 BHK flats in Gurgaon featuring ultra-luxury spacious apartments, premium family housing across Golf Course Road and Dwarka Expressway with world-class amenities.",
  "url": "https://www.100acress.com/4-bhk-flats-in-gurgaon/",
  "provider": { "@type": "RealEstateAgent", "name": "100acress", "url": "https://www.100acress.com" },
  "address": { "@type": "Place", "name": "Gurgaon, Haryana, India" },
  "offers": { "@type": "Offer", "availability": "https://schema.org/InStock", "priceCurrency": "INR" },
  "mainEntityOfPage": { "@type": "WebPage", "@id": "https://www.100acress.com/4-bhk-flats-in-gurgaon/" }
};

const WHY_POINTS = [
  { title: 'Corporate Boom', text: 'Hundreds of MNCs and a growing workforce keep housing demand high — exactly where buyers find opportunity.' },
  { title: 'Infrastructure Growth', text: 'Dwarka Expressway, Delhi–Mumbai Expressway, and expanding metro lines make New Gurgaon sectors highly accessible.' },
  { title: 'High ROI', text: 'Premium townships, better air quality in South Gurgaon, and consistent appreciation make it a smart investment in 2026.' },
];

const LOCATIONS = [
  { title: 'Dwarka Expressway', text: 'One of the fastest-growing residential corridors, offering seamless connectivity to Delhi, IGI Airport, and NH-48.' },
  { title: 'New Gurgaon (Sectors 82–95)', text: 'Planned roads, calm surroundings & strong appreciation. A family-friendly pocket that keeps delivering.' },
  { title: 'Golf Course Extension Road', text: 'Premium lifestyle without the premium price tag. Upscale residential towers, reputable schools, and established social infrastructure make it perfect for buyers balancing their lives.' },
  { title: 'Sohna Road', text: 'A value-driven corridor offering budget-friendly and mid-range studio to 4 BHK apartments. Leading educational institutions keep this location consistently popular among end-users and investors alike.' },
];

const AMENITIES = [
  'Fully Equipped Clubhouse & Swimming Pool',
  'Modern Gymnasium & Yoga Wellness Zone',
  'Landscaped Gardens & Jogging Track',
  'Safe Children\'s Play Area & Sports Courts',
  '24×7 Smart Security & CCTV Surveillance',
  'Covered Parking & EV Charging Points',
];

const CHECKLIST = [
  { label: 'Check RERA First', detail: 'Never skip RERA verification it protects your money, ensures builder accountability, and keeps your investment 100% legally safe.' },
  { label: 'Look Beyond the Brochure', detail: 'Check the real carpet area, ventilation, floor density, and amenities before you decide. What looks good on paper should hold up in reality.' },
  { label: 'Visit Before You Commit', detail: 'A quick site visit reveals road access, nearby schools, markets, and metro connectivity—things that directly impact your property\'s future value.' },
  { label: 'Buy at the Right Time', detail: 'Early-stage projects in Gurgaon 2026 offer the best pricing. If you need faster possession, ready-to-move compact flats in Gurgaon are your smartest pick.' },
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;500;600&display=swap');

  .fbhk-root {
    font-family: 'DM Sans', sans-serif;
    color: #1a1a2e;
    background: #f8f9fc;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 24px 48px;
    font-size: 1.1rem;
  }

  .fbhk-hero {
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%);
    border-radius: 20px;
    padding: 48px 40px;
    margin: 24px 0 32px;
    display: flex;
    align-items: center;
    gap: 24px;
    color: #fff;
  }
  .fbhk-hero-icon { font-size: 56px; flex-shrink: 0; }
  .fbhk-hero h1 {
    font-family: 'DM Serif Display', serif;
    font-size: 2.5rem;
    margin: 0 0 12px;
    line-height: 1.2;
  }
  .fbhk-hero p { margin: 0; font-size: 1.2rem; color: #b0bcd4; line-height: 1.6; }

  .fbhk-section-title {
    font-family: 'DM Serif Display', serif;
    font-size: 1.8rem;
    color: #1a1a2e;
    margin: 0 0 20px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .fbhk-why-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 18px;
    margin-bottom: 40px;
  }
  .fbhk-why-card {
    background: #fff;
    border: 1px solid #e4e9f2;
    border-radius: 14px;
    padding: 22px;
    display: flex;
    gap: 16px;
    align-items: flex-start;
    transition: box-shadow 0.2s;
  }
  .fbhk-why-card:hover { box-shadow: 0 4px 18px rgba(15,52,96,.1); }
  .fbhk-why-icon {
    width: 52px; height: 52px; border-radius: 12px;
    background: #eef2ff; display: flex; align-items: center;
    justify-content: center; font-size: 26px; flex-shrink: 0;
  }
  .fbhk-why-card h4 { margin: 0 0 6px; font-size: 1.2rem; font-weight: 600; color: #1a1a2e; }
  .fbhk-why-card p { margin: 0; font-size: 1.1rem; color: #5a6480; line-height: 1.55; }

  .fbhk-loc-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 16px;
    margin-bottom: 40px;
  }
  .fbhk-loc-card {
    background: #fff;
    border: 1px solid #e4e9f2;
    border-radius: 14px;
    padding: 20px;
    transition: box-shadow 0.2s;
  }
  .fbhk-loc-card:hover { box-shadow: 0 4px 14px rgba(15,52,96,.1); }
  .fbhk-loc-card .loc-icon { font-size: 28px; margin-bottom: 10px; }
  .fbhk-loc-card h4 { margin: 0 0 6px; font-size: 1.2rem; font-weight: 600; color: #1a1a2e; }
  .fbhk-loc-card p { margin: 0; font-size: 1.1rem; color: #5a6480; line-height: 1.5; }

  .fbhk-two-col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    margin-bottom: 40px;
  }
  @media (max-width: 600px) { .fbhk-two-col { grid-template-columns: 1fr; } }

  .fbhk-box {
    background: #fff;
    border: 1px solid #e4e9f2;
    border-radius: 14px;
    padding: 24px;
  }
  .fbhk-box h4 {
    font-family: 'DM Serif Display', serif;
    font-size: 1.4rem;
    margin: 0 0 16px;
    color: #0f3460;
  }

  .fbhk-amenity-list { list-style: none; padding: 0; margin: 0; }
  .fbhk-amenity-list li {
    padding: 9px 0;
    border-bottom: 1px solid #f0f3fa;
    font-size: 1.1rem;
    color: #3a4264;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .fbhk-amenity-list li:last-child { border-bottom: none; }
  .fbhk-amenity-list li::before { content: '✓'; color: #22c55e; font-weight: 700; }

  .fbhk-checklist { list-style: none; padding: 0; margin: 0; }
  .fbhk-checklist li {
    padding: 10px 0;
    border-bottom: 1px solid #f0f3fa;
    font-size: 1.1rem;
    color: #3a4264;
    line-height: 1.5;
  }
  .fbhk-checklist li:last-child { border-bottom: none; }
  .fbhk-checklist li strong { display: block; font-size: 1.2rem; color: #1a1a2e; margin-bottom: 3px; }

  .fbhk-invest-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 18px;
    margin-bottom: 40px;
  }
  @media (max-width: 600px) { .fbhk-invest-grid { grid-template-columns: 1fr; } }
  .fbhk-invest-card {
    border-radius: 14px;
    padding: 28px 20px;
    text-align: center;
    color: #fff;
  }
  .fbhk-invest-card .inv-icon { font-size: 34px; margin-bottom: 12px; }
  .fbhk-invest-card h4 { margin: 0 0 8px; font-size: 1.05rem; font-weight: 600; }
  .fbhk-invest-card p { margin: 0; font-size: 0.9rem; opacity: 0.88; line-height: 1.5; }
  .fbhk-ic-blue   { background: linear-gradient(135deg,#3b82f6,#1d4ed8); }
  .fbhk-ic-green  { background: linear-gradient(135deg,#22c55e,#15803d); }
  .fbhk-ic-purple { background: linear-gradient(135deg,#a855f7,#7e22ce); }

  .fbhk-cta {
    background: linear-gradient(135deg,#0f3460,#1a1a2e);
    border-radius: 18px;
    padding: 36px 32px;
    color: #fff;
    text-align: center;
  }
  .fbhk-cta h3 {
    font-family: 'DM Serif Display', serif;
    font-size: 1.6rem;
    margin: 0 0 14px;
  }
  .fbhk-cta p {
    font-size: 1.05rem;
    color: #b0bcd4;
    line-height: 1.6;
    max-width: 700px;
    margin: 0 auto 22px;
  }
  .fbhk-cta a {
    display: inline-block;
    background: #fff;
    color: #0f3460;
    padding: 14px 32px;
    border-radius: 10px;
    font-weight: 600;
    font-size: 1.05rem;
    text-decoration: none;
    transition: background 0.2s;
  }
  .fbhk-cta a:hover { background: #e0e8ff; }
`;

const FourBhkFlatsGurgaon = () => {
  // Page-specific meta data
  const pageData = {
    title: '4 BHK Flats in Gurgaon | Premium Apartments',
    description: 'Find exclusive 4 BHK flats in Gurgaon offering large spaces, premium amenities, and prime locations for comfortable and luxurious family living.',
    metaTitle: '4 BHK Flats in Gurgaon | Luxury Apartments',
    metaDescription: 'Find exclusive 4 BHK flats in Gurgaon offering large spaces, premium amenities, and prime locations for comfortable and luxurious family living.',
    h1: '4 BHK Flats in Gurgaon - Exclusive Luxury Residences',
    canonical: 'https://www.100acress.com/4-bhk-flats-in-gurgaon/',
    keywords: '4 BHK flats gurgaon, 4 bedroom apartments gurgaon, luxury 4BHK gurgaon, premium apartments gurgaon, ultra-luxury homes gurgaon, spacious 4BHK gurgaon',
    heroTitle: '4 BHK Flats in Gurgaon - Exclusive Luxury Residences',
    heroSubtitle: 'Experience ultra-luxury living with 4 BHK apartments in Gurgaon featuring expansive spaces, premium amenities, and exclusive locations for discerning homeowners.'
  };

  return (
    <>
      <Helmet>
        <title>{pageData.metaTitle}</title>
        <meta name="description" content={pageData.metaDescription} />
        <meta name="keywords" content={pageData.keywords} />
        <link rel="canonical" href={pageData.canonical} />
        <meta property="og:title" content={pageData.title} />
        <meta property="og:description" content={pageData.description} />
        <meta property="og:url" content={pageData.canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.100acress.com/images/4-bhk-flats-gurgaon.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
        <meta name="geo.region" content="HR" />
        <meta name="geo.placename" content="Gurgaon" />
        <meta name="geo.position" content="28.4595;77.0266" />
        <link rel="alternate" hreflang="en" href={pageData.canonical} />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org", "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home",     "item": "https://www.100acress.com" },
            { "@type": "ListItem", "position": 2, "name": "Projects", "item": "https://www.100acress.com/projects" },
            { "@type": "ListItem", "position": 3, "name": "4 BHK Flats", "item": pageData.canonical }
          ]
        })}</script>
        <style>{styles}</style>
      </Helmet>

      {/* BHK Hero Section */}
      {/* <BhkHero 
        bhkType="4"
        title={pageData.title}
        subtitle={pageData.description}
        onExplore={() => window.open('https://www.100acress.com/projects/upcoming/', '_blank')}
        onContact={() => window.open('https://www.100acress.com/contact', '_blank')}
        onSearch={(query) => console.log('Search for:', query)}
        onFilterChange={(filters) => console.log('Filter change:', filters)}
      /> */}
      <div className="fbhk-root">

        {/* HERO */}
        <div className="fbhk-hero">
          <div className="fbhk-hero-icon"></div>
          <div>
            <h1 style={{ textAlign: 'center' }}>Know More About 4 BHK Flats</h1>
            <p>
              Find your comfort in a big house for your whole family. 4 BHK flats in Gurgaon offer 4 bedrooms, a large living area, and ample space for you and your family. Gurgaon is connected to Delhi and has schools, hospitals, and markets in close proximity. The perfect home for a growing family or a family that needs more space.
            </p>
          </div>
        </div>

      {/* TOP LOCATIONS */}
      <h2 className="fbhk-section-title">Top Locations for Buying a Good Flat in Gurgaon</h2>
      <div className="fbhk-loc-grid">
        {LOCATIONS.map(({ title, text }) => (
          <div className="fbhk-loc-card" key={title}>
            <h4>{title}</h4>
            <p>{text}</p>
          </div>
        ))}
      </div>

      {/* AMENITIES + CHECKLIST */}
      <div className="fbhk-two-col">
        <div className="fbhk-box">
          <h4>Best Amenities in 4 BHK Flats:</h4>
          <ul className="fbhk-amenity-list">
            {AMENITIES.map(a => <li key={a}>{a}</li>)}
          </ul>
        </div>
        <div className="fbhk-box">
          <h4>Key Things to Check Before Buying a Flat in Gurgaon</h4>
          <ul className="fbhk-checklist">
            {CHECKLIST.map(({ label, detail }) => (
              <li key={label}><strong>{label}</strong>{detail}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* FAQ Section */}
      <FAQSection bhkType="4 BHK" />

      {/* CTA */}
      <div className="fbhk-cta">
        <h3>Why Choose 100acress?</h3>
        <p>
          100acress lists only verified, RERA-approved 4 BHK flats in Gurgaon. We work with
          reputed developers and provide expert guidance to help you invest with confidence.
        </p>
        <a href="https://www.100acress.com/projects/upcoming/" aria-label="Explore 4 BHK projects in Gurgaon">
          Explore Premium Projects
        </a>
      </div>
    </div>
  </>
  );
};

export default FourBhkFlatsGurgaon;