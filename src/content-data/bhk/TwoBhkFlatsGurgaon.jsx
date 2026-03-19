import React from 'react';
import { Helmet } from 'react-helmet-async';
import FAQSection from './FAQSection';

const structuredData = {
  "@context": "https://schema.org",
  "@type": "RealEstateListing",
  "name": "2 BHK Flats in Gurgaon 2026",
  "description": "Explore verified 2 BHK flats in Gurgaon featuring spacious luxury apartments, family-friendly housing options across Dwarka Expressway and New Gurgaon with world-class amenities.",
  "url": "https://www.100acress.com/2-bhk-flats-in-gurgaon/",
  "provider": { "@type": "RealEstateAgent", "name": "100acress", "url": "https://www.100acress.com" },
  "address": { "@type": "Place", "name": "Gurgaon, Haryana, India" },
  "offers": { "@type": "Offer", "availability": "https://schema.org/InStock", "priceCurrency": "INR" },
  "mainEntityOfPage": { "@type": "WebPage", "@id": "https://www.100acress.com/2-bhk-flats-in-gurgaon/" }
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
  { title: 'Sohna Road', text: 'A value-driven corridor offering budget-friendly and mid-range studio to 2 BHK apartments. Leading educational institutions keep this location consistently popular among end-users and investors alike.' },
];

const AMENITIES = [
  'Clubhouse — A common space for events, gatherings, and relaxation',
  'Swimming Pool — For daily fitness and weekend unwinding',
  'Gymnasium — Fully equipped gym inside your own society',
  "Children's Play Area — Safe and fun outdoor space for kids",
  'Sports Facilities—Badminton, basketball, and more',
  '24×7 Security — CCTV, guards, and smart entry systems',
  'Community Hall — For family functions and social gatherings',
];

const CHECKLIST = [
  { label: 'Look Beyond the Brochure', detail: 'Check the real carpet area, ventilation, floor density, and amenities before you decide. What looks good on paper should hold up in reality.' },
  { label: 'Check RERA First', detail: 'Never skip RERA verification it protects your money, ensures builder accountability, and keeps your investment 100% legally safe.' },
  { label: 'Visit Before You Commit', detail: 'A quick site visit reveals road access, nearby schools, markets, and metro connectivity—things that directly impact your property\'s future value.' },
  { label: 'Buy at the Right Time', detail: 'Early-stage projects in Gurgaon 2026 offer the best pricing. If you need faster possession, ready-to-move compact flats in Gurgaon are your smartest pick.' },
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;500;600&display=swap');

  .tbg-root {
    font-family: 'DM Sans', sans-serif;
    color: #1a1a2e;
    background: #f8f9fc;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 24px 48px;
    font-size: 1.1rem;
  }

  /* ── HERO ── */
  .tbg-hero {
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%);
    border-radius: 16px;
    padding: 36px 32px;
    margin: 20px 0 28px;
    display: flex;
    align-items: center;
    gap: 20px;
    color: #fff;
  }
  .tbg-hero-icon { font-size: 48px; flex-shrink: 0; }
  .tbg-hero h1 {
    font-family: 'DM Serif Display', serif;
    font-size: 2.2rem;
    margin: 0 0 8px;
    line-height: 1.25;
  }
  .tbg-hero p { margin: 0; font-size: 1.1rem; color: #b0bcd4; line-height: 1.55; }

  /* ── SECTION TITLE ── */
  .tbg-section-title {
    font-family: 'DM Serif Display', serif;
    font-size: 1.6rem;
    color: #1a1a2e;
    margin: 0 0 16px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  /* ── WHY CARDS ── */
  .tbg-why-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 14px;
    margin-bottom: 32px;
  }
  .tbg-why-card {
    background: #fff;
    border: 1px solid #e4e9f2;
    border-radius: 12px;
    padding: 18px;
    display: flex;
    gap: 14px;
    align-items: flex-start;
    transition: box-shadow 0.2s;
  }
  .tbg-why-card:hover { box-shadow: 0 4px 18px rgba(15,52,96,.1); }
  .tbg-why-icon {
    width: 44px; height: 44px; border-radius: 10px;
    background: #eef2ff; display: flex; align-items: center;
    justify-content: center; font-size: 22px; flex-shrink: 0;
  }
  .tbg-why-card h4 { margin: 0 0 4px; font-size: 1.1rem; font-weight: 600; color: #1a1a2e; }
  .tbg-why-card p { margin: 0; font-size: 1rem; color: #5a6480; line-height: 1.5; }

  /* ── LOCATIONS ── */
  .tbg-loc-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 12px;
    margin-bottom: 32px;
  }
  .tbg-loc-card {
    background: #fff;
    border: 1px solid #e4e9f2;
    border-radius: 12px;
    padding: 16px;
    transition: box-shadow 0.2s;
  }
  .tbg-loc-card:hover { box-shadow: 0 4px 14px rgba(15,52,96,.1); }
  .tbg-loc-card .loc-icon { font-size: 24px; margin-bottom: 8px; }
  .tbg-loc-card h4 { margin: 0 0 4px; font-size: 1.1rem; font-weight: 600; color: #1a1a2e; }
  .tbg-loc-card p { margin: 0; font-size: 1rem; color: #5a6480; line-height: 1.45; }

  /* ── TWO-COL LAYOUT ── */
  .tbg-two-col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 32px;
  }
  @media (max-width: 600px) { .tbg-two-col { grid-template-columns: 1fr; } }

  .tbg-box {
    background: #fff;
    border: 1px solid #e4e9f2;
    border-radius: 12px;
    padding: 20px;
  }
  .tbg-box h4 {
    font-family: 'DM Serif Display', serif;
    font-size: 1.3rem;
    margin: 0 0 12px;
    color: #0f3460;
  }

  /* amenities list */
  .tbg-amenity-list { list-style: none; padding: 0; margin: 0; }
  .tbg-amenity-list li {
    padding: 7px 0;
    border-bottom: 1px solid #f0f3fa;
    font-size: 1.1rem;
    color: #3a4264;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .tbg-amenity-list li:last-child { border-bottom: none; }
  .tbg-amenity-list li::before { content: '✓'; color: #22c55e; font-weight: 700; }

  /* checklist */
  .tbg-checklist { list-style: none; padding: 0; margin: 0; }
  .tbg-checklist li {
    padding: 8px 0;
    border-bottom: 1px solid #f0f3fa;
    font-size: 1.1rem;
    color: #3a4264;
    line-height: 1.45;
  }
  .tbg-checklist li:last-child { border-bottom: none; }
  .tbg-checklist li strong { display: block; font-size: 1.15rem; color: #1a1a2e; margin-bottom: 2px; }

  /* ── INVEST CARDS ── */
  .tbg-invest-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
    margin-bottom: 32px;
  }
  @media (max-width: 600px) { .tbg-invest-grid { grid-template-columns: 1fr; } }
  .tbg-invest-card {
    border-radius: 12px;
    padding: 22px 16px;
    text-align: center;
    color: #fff;
  }
  .tbg-invest-card .inv-icon { font-size: 30px; margin-bottom: 10px; }
  .tbg-invest-card h4 { margin: 0 0 6px; font-size: 0.92rem; font-weight: 600; }
  .tbg-invest-card p { margin: 0; font-size: 0.8rem; opacity: 0.88; line-height: 1.45; }
  .tbg-ic-blue   { background: linear-gradient(135deg,#3b82f6,#1d4ed8); }
  .tbg-ic-green  { background: linear-gradient(135deg,#22c55e,#15803d); }
  .tbg-ic-purple { background: linear-gradient(135deg,#a855f7,#7e22ce); }

  /* ── FOOTER CTA ── */
  .tbg-cta {
    background: linear-gradient(135deg,#0f3460,#1a1a2e);
    border-radius: 14px;
    padding: 28px 24px;
    color: #fff;
    text-align: center;
  }
  .tbg-cta h3 {
    font-family: 'DM Serif Display', serif;
    font-size: 1.3rem;
    margin: 0 0 10px;
  }
  .tbg-cta p {
    margin: 0 0 18px;
    font-size: 0.9rem;
    color: #b0bcd4;
    line-height: 1.55;
    max-width: 560px;
    margin-inline: auto;
    margin-bottom: 18px;
  }
  .tbg-cta a {
    display: inline-block;
    background: #fff;
    color: #0f3460;
    padding: 10px 24px;
    border-radius: 8px;
    font-weight: 600;
    font-size: 0.9rem;
    text-decoration: none;
    transition: background 0.2s;
  }
  .tbg-cta a:hover { background: #e0e8ff; }
`;

const TwoBhkFlatsGurgaon = () => (
  <>
    <Helmet>
      <title>2 BHK Flats in Gurgaon 2026 | Spacious Family Apartments | 100acress</title>
      <meta name="description" content="Explore verified 2 BHK flats in Gurgaon 2026 — spacious luxury apartments, family-friendly housing across Dwarka Expressway and New Gurgaon. Best pricing, RERA approved, world-class amenities." />
      <meta name="keywords" content="2 BHK flats in Gurgaon 2026, 2 bedroom flats Gurgaon, spacious apartments Gurgaon, family homes Gurgaon, RERA approved 2 BHK" />
      <link rel="canonical" href="https://www.100acress.com/2-bhk-flats-in-gurgaon/" />
      <meta property="og:title" content="2 BHK Flats in Gurgaon 2026 | Spacious Family Apartments" />
      <meta property="og:description" content="Discover verified 2 BHK flats in Gurgaon — competitive pricing, Dwarka Expressway, New Gurgaon." />
      <meta property="og:url" content="https://www.100acress.com/2-bhk-flats-in-gurgaon/" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://www.100acress.com/images/2-bhk-flats-gurgaon.jpg" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
      <meta name="geo.region" content="HR" />
      <meta name="geo.placename" content="Gurgaon" />
      <meta name="geo.position" content="28.4595;77.0266" />
      <link rel="alternate" hreflang="en" href="https://www.100acress.com/2-bhk-flats-in-gurgaon/" />
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.100acress.com" },
          { "@type": "ListItem", "position": 2, "name": "Projects", "item": "https://www.100acress.com/projects" },
          { "@type": "ListItem", "position": 3, "name": "2 BHK Flats", "item": "https://www.100acress.com/2-bhk-flats-in-gurgaon/" }
        ]
      })}</script>
      <style>{styles}</style>
    </Helmet>

    <div className="tbg-root">

      {/* HERO */}
      <div className="tbg-hero">
        <div className="tbg-hero-icon"></div>
        <div>
          <h1 style={{ textAlign: 'center' }}>Know More About 2 BHK Flats</h1>
          <p>
            Explore 2 BHK flats in Gurgaon that offer a comfortable balance of space and budget. These homes are suitable for families or professionals who need a little extra room. Many projects are located in well-planned areas with good road and metro connectivity. From affordable sectors to more premium neighborhoods, buyers can find homes that match different budgets and everyday living needs.
          </p>
        </div>
      </div>  
      {/* TOP LOCATIONS */}
      <h2 className="tbg-section-title">Top Locations for Buying a Good Flat in Gurgaon</h2>
      <div className="tbg-loc-grid">
        {LOCATIONS.map(({ icon, title, text }) => (
          <div className="tbg-loc-card" key={title}>
            <div className="loc-icon">{icon}</div>
            <h4>{title}</h4>
            <p>{text}</p>
          </div>
        ))}
      </div>

      {/* AMENITIES + CHECKLIST */}
      <div className="tbg-two-col">
        <div className="tbg-box">
          <h4>What Amenities Do You Get in a 2 BHK Flat in Gurgaon?</h4>
          <ul className="tbg-amenity-list">
            {AMENITIES.map(a => <li key={a}>{a}</li>)}
          </ul>
        </div>
        <div className="tbg-box">
          <h4>Key Things to Check Before Buying a Flat in Gurgaon</h4>
          <ul className="tbg-checklist">
            {CHECKLIST.map(({ label, detail }) => (
              <li key={label}><strong>{label}</strong>{detail}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* FAQ Section */}
      <FAQSection bhkType="2 BHK" />

      {/* CTA */}
      <div className="tbg-cta">
        <h3>Why Choose 100acress?</h3>
        <p>
          100acress lists only verified, RERA-approved 2 BHK flats in Gurgaon. We work with
          reputed developers and provide expert guidance to help you invest with confidence.
        </p>
        <a href="https://www.100acress.com/projects/upcoming/" aria-label="Explore 2 BHK projects in Gurgaon">
          Explore Premium Projects
        </a>
      </div>
{/* <FAQSection bhkType="2 BHK" /> */}
    </div>
  </>
);

export default TwoBhkFlatsGurgaon;