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
  { icon: '🏢', title: 'Corporate Boom', text: 'Hundreds of MNCs and a growing workforce keep housing demand high — exactly where buyers find opportunity.' },
  { icon: '🛣️', title: 'Infrastructure Growth', text: 'Dwarka Expressway, Delhi–Mumbai Expressway, and expanding metro lines make New Gurgaon sectors highly accessible.' },
  { icon: '📈', title: 'High ROI', text: 'Premium townships, better air quality in South Gurgaon, and consistent appreciation make it a smart investment in 2026.' },
];

const LOCATIONS = [
  { icon: '🏢', title: 'Dwarka Expressway', text: 'Seamless connectivity to Delhi, IGI Airport & NH-48.' },
  { icon: '🌳', title: 'New Gurgaon (Sec 82–95)', text: 'Planned roads, calm surroundings & strong appreciation.' },
  { icon: '⛳', title: 'Golf Course Ext. Road', text: 'Upscale towers, reputed schools & established social infrastructure.' },
  { icon: '🎓', title: 'Sohna Road', text: 'Value-driven corridor popular with large families and investors alike.' },
];

const AMENITIES = [
  'Fully equipped clubhouse & swimming pool',
  'Modern gymnasium & yoga wellness zone',
  'Landscaped gardens & jogging track',
  "Safe children's play area & sports courts",
  '24×7 smart security & CCTV surveillance',
  'Covered parking & EV charging points',
];

const CHECKLIST = [
  { label: 'Check RERA First', detail: 'Protects your money, ensures builder accountability, and keeps your investment legally safe.' },
  { label: 'Look Beyond the Brochure', detail: 'Verify carpet area, ventilation, floor density, and amenities — not just what looks good on paper.' },
  { label: 'Visit Before You Commit', detail: 'Site visit reveals road access, schools, markets, and metro proximity — all affect future value.' },
  { label: 'Buy at the Right Time', detail: 'Early-stage projects offer best pricing; ready-to-move suits buyers needing quick possession.' },
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
    font-size: 2.2rem;
    margin: 0 0 12px;
    line-height: 1.2;
  }
  .fbhk-hero p { margin: 0; font-size: 1.1rem; color: #b0bcd4; line-height: 1.6; }

  .fbhk-section-title {
    font-family: 'DM Serif Display', serif;
    font-size: 1.6rem;
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
  .fbhk-why-card h4 { margin: 0 0 6px; font-size: 1.05rem; font-weight: 600; color: #1a1a2e; }
  .fbhk-why-card p { margin: 0; font-size: 0.95rem; color: #5a6480; line-height: 1.55; }

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
  .fbhk-loc-card h4 { margin: 0 0 6px; font-size: 1rem; font-weight: 600; color: #1a1a2e; }
  .fbhk-loc-card p { margin: 0; font-size: 0.9rem; color: #5a6480; line-height: 1.5; }

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
    font-size: 1.15rem;
    margin: 0 0 16px;
    color: #0f3460;
  }

  .fbhk-amenity-list { list-style: none; padding: 0; margin: 0; }
  .fbhk-amenity-list li {
    padding: 9px 0;
    border-bottom: 1px solid #f0f3fa;
    font-size: 0.95rem;
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
    font-size: 0.95rem;
    color: #3a4264;
    line-height: 1.5;
  }
  .fbhk-checklist li:last-child { border-bottom: none; }
  .fbhk-checklist li strong { display: block; font-size: 0.98rem; color: #1a1a2e; margin-bottom: 3px; }

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
          <div className="fbhk-hero-icon">�</div>
          <div>
            <h1>{pageData.h1}</h1>
            <p>
              Ultra-luxury 4 BHK flats in Gurgaon with expansive spaces,
              premium amenities, and exclusive locations.
              Perfect for discerning homeowners seeking the finest living experience.
            </p>
          </div>
        </div>

      {/* WHY GURGAON */}
      <h2 className="fbhk-section-title">🚀 Why Gurgaon Real Estate Keeps Growing</h2>
      <div className="fbhk-why-grid">
        {WHY_POINTS.map(({ icon, title, text }) => (
          <div className="fbhk-why-card" key={title}>
            <div className="fbhk-why-icon">{icon}</div>
            <div><h4>{title}</h4><p>{text}</p></div>
          </div>
        ))}
      </div>

      {/* TOP LOCATIONS */}
      <h2 className="fbhk-section-title">🏆 Top Locations to Buy in Gurgaon</h2>
      <div className="fbhk-loc-grid">
        {LOCATIONS.map(({ icon, title, text }) => (
          <div className="fbhk-loc-card" key={title}>
            <div className="loc-icon">{icon}</div>
            <h4>{title}</h4>
            <p>{text}</p>
          </div>
        ))}
      </div>

      {/* AMENITIES + CHECKLIST */}
      <div className="fbhk-two-col">
        <div className="fbhk-box">
          <h4>✅ Amenities in 4 BHK Flats</h4>
          <ul className="fbhk-amenity-list">
            {AMENITIES.map(a => <li key={a}>{a}</li>)}
          </ul>
        </div>
        <div className="fbhk-box">
          <h4>📋 Before You Buy — Checklist</h4>
          <ul className="fbhk-checklist">
            {CHECKLIST.map(({ label, detail }) => (
              <li key={label}><strong>{label}</strong>{detail}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* WHY INVEST */}
      <h2 className="fbhk-section-title">🎯 Why Invest in 4 BHK Flats?</h2>
      <div className="fbhk-invest-grid">
        <div className="fbhk-invest-card fbhk-ic-blue">
          <div className="inv-icon">🚀</div>
          <h4>Early Bird Pricing</h4>
          <p>Exclusive pre-launch discounts and special payment plans on upcoming projects.</p>
        </div>
        <div className="fbhk-invest-card fbhk-ic-green">
          <div className="inv-icon">📈</div>
          <h4>High Growth Prospects</h4>
          <p>Strong appreciation and ultra-premium returns in Gurgaon's luxury segment.</p>
        </div>
        <div className="fbhk-invest-card fbhk-ic-purple">
          <div className="inv-icon">🔑</div>
          <h4>Early Access</h4>
          <p>Be the first to book ultra-premium 4 BHK properties at best available rates.</p>
        </div>
      </div>

      {/* CTA */}
      <div className="fbhk-cta">
        <h3>🤝 Why Choose 100acress?</h3>
        <p>
          100acress lists only verified, RERA-approved 4 BHK flats in Gurgaon. We work with
          reputed developers and provide expert guidance to help you invest with confidence.
        </p>
        <a href="https://www.100acress.com/projects/upcoming/" aria-label="Explore 4 BHK projects in Gurgaon">
          🏠 Explore Premium Projects
        </a>
      </div>

      <FAQSection bhkType="4 BHK" />

    </div>
  </>
  );
};

export default FourBhkFlatsGurgaon;