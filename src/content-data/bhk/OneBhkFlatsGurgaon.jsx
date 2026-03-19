import React from 'react';
import { Helmet } from 'react-helmet-async';
import FAQSection from './FAQSection';
// import BhkHero from './components/BhkHero';

const structuredData = {
  "@context": "https://schema.org",
  "@type": "RealEstateListing",
  "name": "1 BHK Flats in Gurgaon 2026",
  "description": "Explore verified 1 BHK flats in Gurgaon featuring compact luxury apartments, affordable housing options across Dwarka Expressway and New Gurgaon with world-class amenities.",
  "url": "https://www.100acress.com/1-bhk-flats-in-gurgaon/",
  "provider": { "@type": "RealEstateAgent", "name": "100acress", "url": "https://www.100acress.com" },
  "address": { "@type": "Place", "name": "Gurgaon, Haryana, India" },
  "offers": { "@type": "Offer", "availability": "https://schema.org/InStock", "priceCurrency": "INR" },
  "mainEntityOfPage": { "@type": "WebPage", "@id": "https://www.100acress.com/1-bhk-flats-in-gurgaon/" }
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
  { title: 'Sohna Road', text: 'A value-driven corridor offering budget-friendly and mid-range studio to 1 BHK apartments. Leading educational institutions keep this location consistently popular among end-users and investors alike.' },
];

const AMENITIES = [
  'Fully equipped clubhouse and swimming pool',
  'Gymnasium and dedicated wellness zones',
  'Landscaped green gardens with jogging tracks',
  'Children\'s play areas and multi-sport courts',
  'Round-the-clock security with smart access systems',
];

const CHECKLIST = [
  { label: 'Check RERA First', detail: 'Never skip RERA verification it protects your money, ensures builder accountability, and keeps your investment 100% legally safe.' },
  { label: 'Look Beyond the Brochure', detail: 'Check the real carpet area, ventilation, floor density, and amenities before you decide. What looks good on paper should hold up in reality.' },
  { label: 'Visit Before You Commit', detail: 'A quick site visit reveals road access, nearby schools, markets, and metro connectivity things that directly impact your property\'s future value.' },
  { label: 'Buy at the Right Time', detail: 'Early-stage projects in Gurgaon 2026 offer the best pricing. If you need faster possession, ready-to-move compact flats in Gurgaon are your smartest pick.' },
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;500;600&display=swap');

  .obg-root {
    font-family: 'DM Sans', sans-serif;
    color: #1a1a2e;
    background: #f8f9fc;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 24px 48px;
    font-size: 1.1rem;
  }

  /* ── HERO ── */
  .obg-hero {
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%);
    border-radius: 20px;
    padding: 48px 40px;
    margin: 24px 0 32px;
    display: flex;
    align-items: center;
    gap: 24px;
    color: #fff;
  }
  .obg-hero-icon { font-size: 56px; flex-shrink: 0; }
  .obg-hero h1 {
    font-family: 'DM Serif Display', serif;
    font-size: 2.2rem;
    margin: 0 0 8px;
    line-height: 1.25;
  }
  .obg-hero p { margin: 0; font-size: 1.1rem; color: #b0bcd4; line-height: 1.55; }

  /* ── SECTION TITLE ── */
  .obg-section-title {
    font-family: 'DM Serif Display', serif;
    font-size: 1.6rem;
    color: #1a1a2e;
    margin: 0 0 16px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  /* ── WHY CARDS ── */
  .obg-why-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 18px;
    margin-bottom: 40px;
  }
  .obg-why-card {
    background: #fff;
    border: 1px solid #e4e9f2;
    border-radius: 14px;
    padding: 22px;
    display: flex;
    gap: 16px;
    align-items: flex-start;
    transition: box-shadow 0.2s;
  }
  .obg-why-card:hover { box-shadow: 0 4px 18px rgba(15,52,96,.1); }
  .obg-why-icon {
    width: 52px; height: 52px; border-radius: 12px;
    background: #eef2ff; display: flex; align-items: center;
    justify-content: center; font-size: 26px; flex-shrink: 0;
  }
  .obg-why-card h4 { margin: 0 0 4px; font-size: 1.1rem; font-weight: 600; color: #1a1a2e; }
  .obg-why-card p { margin: 0; font-size: 1rem; color: #5a6480; line-height: 1.5; }

  /* ── LOCATIONS ── */
  .obg-loc-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 16px;
    margin-bottom: 40px;
  }
  .obg-loc-card {
    background: #fff;
    border: 1px solid #e4e9f2;
    border-radius: 14px;
    padding: 20px;
    transition: box-shadow 0.2s;
  }
  .obg-loc-card:hover { box-shadow: 0 4px 14px rgba(15,52,96,.1); }
  .obg-loc-card .loc-icon { font-size: 28px; margin-bottom: 10px; }
  .obg-loc-card h4 { margin: 0 0 4px; font-size: 1.1rem; font-weight: 600; color: #1a1a2e; }
  .obg-loc-card p { margin: 0; font-size: 1rem; color: #5a6480; line-height: 1.45; }

  /* ── TWO-COL LAYOUT ── */
  .obg-two-col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    margin-bottom: 40px;
  }
  @media (max-width: 600px) { .obg-two-col { grid-template-columns: 1fr; } }

  .obg-box {
    background: #fff;
    border: 1px solid #e4e9f2;
    border-radius: 14px;
    padding: 24px;
  }
  .obg-box h4 {
    font-family: 'DM Serif Display', serif;
    font-size: 1.3rem;
    margin: 0 0 12px;
    color: #0f3460;
  }

  /* amenities list */
  .obg-amenity-list { list-style: none; padding: 0; margin: 0; }
  .obg-amenity-list li {
    padding: 7px 0;
    border-bottom: 1px solid #f0f3fa;
    font-size: 1.1rem;
    color: #3a4264;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .obg-amenity-list li:last-child { border-bottom: none; }
  .obg-amenity-list li::before { content: '✓'; color: #22c55e; font-weight: 700; }

  /* checklist */
  .obg-checklist { list-style: none; padding: 0; margin: 0; }
  .obg-checklist li {
    padding: 8px 0;
    border-bottom: 1px solid #f0f3fa;
    font-size: 1.1rem;
    color: #3a4264;
    line-height: 1.45;
  }
  .obg-checklist li:last-child { border-bottom: none; }
  .obg-checklist li strong { display: block; font-size: 1.15rem; color: #1a1a2e; margin-bottom: 2px; }

  /* ── INVEST CARDS ── */
  .obg-invest-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 18px;
    margin-bottom: 40px;
  }
  @media (max-width: 600px) { .obg-invest-grid { grid-template-columns: 1fr; } }
  .obg-invest-card {
    border-radius: 14px;
    padding: 28px 20px;
    text-align: center;
    color: #fff;
  }
  .obg-invest-card .inv-icon { font-size: 34px; margin-bottom: 12px; }
  .obg-invest-card h4 { margin: 0 0 8px; font-size: 1.05rem; font-weight: 600; }
  .obg-invest-card p { margin: 0; font-size: 0.9rem; opacity: 0.88; line-height: 1.5; }
  .obg-ic-blue  { background: linear-gradient(135deg,#3b82f6,#1d4ed8); }
  .obg-ic-green { background: linear-gradient(135deg,#22c55e,#15803d); }
  .obg-ic-purple{ background: linear-gradient(135deg,#a855f7,#7e22ce); }

  /* ── FOOTER CTA ── */
  .obg-cta {
    background: linear-gradient(135deg,#0f3460,#1a1a2e);
    border-radius: 18px;
    padding: 36px 32px;
    color: #fff;
    text-align: center;
  }
  .obg-cta h3 {
    font-family: 'DM Serif Display', serif;
    font-size: 1.6rem;
    margin: 0 0 14px;
  }
  .obg-cta p { margin: 0 0 22px; font-size: 1.05rem; color: #b0bcd4; line-height: 1.6; max-width: 700px; margin-inline: auto; }
  .obg-cta a {
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
  .obg-cta a:hover { background: #e0e8ff; }
`;

const OneBhkFlatsGurgaon = () => {
  // Page-specific meta data
  const pageData = {
    title: '1 BHK Flats in Gurgaon | Verified Listings',
    description: 'Find budget-friendly 1 BHK flats in Gurgaon starting from ₹30 Lakhs. Perfect for bachelors and small families. Explore 1 bedroom apartments with modern amenities in prime locations.',
    metaTitle: 'Buy 1BHK Flats in Gurgaon for Modern Lifestyle Living',
    metaDescription: 'Find budget-friendly 1 BHK flats in Gurgaon starting from ₹30 Lakhs. Perfect for bachelors and small families. Explore 1 bedroom apartments with modern amenities in prime locations.',
    h1: 'Know More About 1BHK Flats',
    canonical: 'https://www.100acress.com/1-bhk-flats-in-gurgaon/',
    keywords: '1 BHK flats gurgaon, 1 bedroom apartments gurgaon, affordable flats gurgaon, bachelor apartments gurgaon, budget homes gurgaon, 1BHK properties gurgaon',
    heroTitle: '1 BHK Flats in Gurgaon - Your Perfect Affordable Home',
    heroSubtitle: 'Discover the best 1 BHK apartments in Gurgaon with modern amenities, strategic locations, and excellent connectivity. Ideal for first-time homebuyers and investors.'
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
        <meta property="og:image" content="https://www.100acress.com/images/1-bhk-flats-gurgaon.jpg" />
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
            { "@type": "ListItem", "position": 3, "name": "1 BHK Flats", "item": pageData.canonical }
          ]
        })}</script>
        <style>{styles}</style>
      </Helmet>

      {/* BHK Hero Section */}
      {/* <BhkHero 
        bhkType="1"
        title={pageData.title}
        subtitle={pageData.description}
        onExplore={() => window.open('https://www.100acress.com/projects/upcoming/', '_blank')}
        onContact={() => window.open('https://www.100acress.com/contact', '_blank')}
        onSearch={(query) => console.log('Search for:', query)}
        onFilterChange={(filters) => console.log('Filter change:', filters)}
      /> */}

      <div className="obg-root">

        {/* HERO */}
        <div className="obg-hero">
          {/* <div className="obg-hero-icon">🏠</div> */}
          <div>
            <h1 style={{ textAlign: 'center' }}>{pageData.h1}</h1>
            <p>
               Explore a range of 1 BHK flats in Gurgaon located in different parts of the city. These homes are a practical option for working professionals, couples, and small families. Many projects are close to offices, metro stations, and daily essentials to make everyday life more convenient. With options across several neighborhoods, these 1-bedroom apartments in Gurgaon offer a simple and comfortable way to live in the city.
            </p>
          </div>
        </div>

        {/* TOP LOCATIONS */}
        <h2 className="obg-section-title">Top Locations for Buying a Good Flat in Gurgaon</h2>
        <div className="obg-loc-grid">
          {LOCATIONS.map(({ icon, title, text }) => (
            <div className="obg-loc-card" key={title}>
              <div className="loc-icon">{icon}</div>
              <h4>{title}</h4>
              <p>{text}</p>
            </div>
          ))}
        </div>

        {/* AMENITIES + CHECKLIST */}
        <div className="obg-two-col">
          <div className="obg-box">
            <h4>Best Amenities in 1 BHK Flats</h4>
            <ul className="obg-amenity-list">
              {AMENITIES.map(a => <li key={a}>{a}</li>)}
            </ul>
          </div>
          <div className="obg-box">
            <h4>What to Check Before Buying a Flat in Gurgaon</h4>
            <ul className="obg-checklist">
              {CHECKLIST.map(({ label, detail }) => (
                <li key={label}><strong>{label}</strong>{detail}</li>
              ))}
            </ul>
          </div>
        </div>

       
  <FAQSection bhkType="1 BHK" />
        {/* CTA */}
        <div className="obg-cta">
          <h3>Why Choose 100acress?</h3>
          <p>
            100acress lists only verified, RERA-approved 1 BHK flats in Gurgaon. We work with
            reputed developers and provide expert guidance to help you invest with confidence.
          </p>
          <a href="https://www.100acress.com/projects/upcoming/" aria-label="Explore 1 BHK projects in Gurgaon">
            Explore Premium Projects
          </a>
        </div>

      

      </div>
    </>
  );
};

export default OneBhkFlatsGurgaon;