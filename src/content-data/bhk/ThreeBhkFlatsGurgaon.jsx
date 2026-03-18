import React from 'react';
import { Helmet } from 'react-helmet-async';

const structuredData = {
  "@context": "https://schema.org",
  "@type": "RealEstateListing",
  "name": "3 BHK Flats in Gurgaon 2026",
  "description": "Explore verified 3 BHK flats in Gurgaon featuring luxury spacious apartments, premium family housing across Dwarka Expressway and Golf Course Road with world-class amenities.",
  "url": "https://www.100acress.com/3-bhk-flats-in-gurgaon/",
  "provider": { "@type": "RealEstateAgent", "name": "100acress", "url": "https://www.100acress.com" },
  "address": { "@type": "Place", "name": "Gurgaon, Haryana, India" },
  "offers": { "@type": "Offer", "availability": "https://schema.org/InStock", "priceCurrency": "INR" },
  "mainEntityOfPage": { "@type": "WebPage", "@id": "https://www.100acress.com/3-bhk-flats-in-gurgaon/" }
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
  { icon: '🎓', title: 'Sohna Road', text: 'Value-driven corridor popular with families and investors alike.' },
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

  .thbg-root {
    font-family: 'DM Sans', sans-serif;
    color: #1a1a2e;
    background: #f8f9fc;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 24px 48px;
  }

  .thbg-hero {
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%);
    border-radius: 16px;
    padding: 36px 32px;
    margin: 20px 0 28px;
    display: flex;
    align-items: center;
    gap: 20px;
    color: #fff;
  }
  .thbg-hero-icon { font-size: 48px; flex-shrink: 0; }
  .thbg-hero h1 {
    font-family: 'DM Serif Display', serif;
    font-size: 1.75rem;
    margin: 0 0 8px;
    line-height: 1.25;
  }
  .thbg-hero p { margin: 0; font-size: 0.95rem; color: #b0bcd4; line-height: 1.55; }

  .thbg-section-title {
    font-family: 'DM Serif Display', serif;
    font-size: 1.3rem;
    color: #1a1a2e;
    margin: 0 0 16px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .thbg-why-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 14px;
    margin-bottom: 32px;
  }
  .thbg-why-card {
    background: #fff;
    border: 1px solid #e4e9f2;
    border-radius: 12px;
    padding: 18px;
    display: flex;
    gap: 14px;
    align-items: flex-start;
    transition: box-shadow 0.2s;
  }
  .thbg-why-card:hover { box-shadow: 0 4px 18px rgba(15,52,96,.1); }
  .thbg-why-icon {
    width: 44px; height: 44px; border-radius: 10px;
    background: #eef2ff; display: flex; align-items: center;
    justify-content: center; font-size: 22px; flex-shrink: 0;
  }
  .thbg-why-card h4 { margin: 0 0 4px; font-size: 0.9rem; font-weight: 600; color: #1a1a2e; }
  .thbg-why-card p  { margin: 0; font-size: 0.82rem; color: #5a6480; line-height: 1.5; }

  .thbg-loc-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 12px;
    margin-bottom: 32px;
  }
  .thbg-loc-card {
    background: #fff;
    border: 1px solid #e4e9f2;
    border-radius: 12px;
    padding: 16px;
    transition: box-shadow 0.2s;
  }
  .thbg-loc-card:hover { box-shadow: 0 4px 14px rgba(15,52,96,.1); }
  .thbg-loc-card .loc-icon { font-size: 24px; margin-bottom: 8px; }
  .thbg-loc-card h4 { margin: 0 0 4px; font-size: 0.88rem; font-weight: 600; color: #1a1a2e; }
  .thbg-loc-card p  { margin: 0; font-size: 0.8rem; color: #5a6480; line-height: 1.45; }

  .thbg-two-col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 32px;
  }
  @media (max-width: 600px) { .thbg-two-col { grid-template-columns: 1fr; } }

  .thbg-box {
    background: #fff;
    border: 1px solid #e4e9f2;
    border-radius: 12px;
    padding: 20px;
  }
  .thbg-box h4 {
    font-family: 'DM Serif Display', serif;
    font-size: 1rem;
    margin: 0 0 12px;
    color: #0f3460;
  }

  .thbg-amenity-list { list-style: none; padding: 0; margin: 0; }
  .thbg-amenity-list li {
    padding: 7px 0;
    border-bottom: 1px solid #f0f3fa;
    font-size: 0.85rem;
    color: #3a4264;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .thbg-amenity-list li:last-child { border-bottom: none; }
  .thbg-amenity-list li::before { content: '✓'; color: #22c55e; font-weight: 700; }

  .thbg-checklist { list-style: none; padding: 0; margin: 0; }
  .thbg-checklist li {
    padding: 8px 0;
    border-bottom: 1px solid #f0f3fa;
    font-size: 0.83rem;
    color: #3a4264;
    line-height: 1.45;
  }
  .thbg-checklist li:last-child { border-bottom: none; }
  .thbg-checklist li strong { display: block; font-size: 0.86rem; color: #1a1a2e; margin-bottom: 2px; }

  .thbg-invest-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
    margin-bottom: 32px;
  }
  @media (max-width: 600px) { .thbg-invest-grid { grid-template-columns: 1fr; } }
  .thbg-invest-card {
    border-radius: 12px;
    padding: 22px 16px;
    text-align: center;
    color: #fff;
  }
  .thbg-invest-card .inv-icon { font-size: 30px; margin-bottom: 10px; }
  .thbg-invest-card h4 { margin: 0 0 6px; font-size: 0.92rem; font-weight: 600; }
  .thbg-invest-card p  { margin: 0; font-size: 0.8rem; opacity: 0.88; line-height: 1.45; }
  .thbg-ic-blue   { background: linear-gradient(135deg,#3b82f6,#1d4ed8); }
  .thbg-ic-green  { background: linear-gradient(135deg,#22c55e,#15803d); }
  .thbg-ic-purple { background: linear-gradient(135deg,#a855f7,#7e22ce); }

  .thbg-cta {
    background: linear-gradient(135deg,#0f3460,#1a1a2e);
    border-radius: 14px;
    padding: 28px 24px;
    color: #fff;
    text-align: center;
  }
  .thbg-cta h3 {
    font-family: 'DM Serif Display', serif;
    font-size: 1.3rem;
    margin: 0 0 10px;
  }
  .thbg-cta p {
    font-size: 0.9rem;
    color: #b0bcd4;
    line-height: 1.55;
    max-width: 560px;
    margin: 0 auto 18px;
  }
  .thbg-cta a {
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
  .thbg-cta a:hover { background: #e0e8ff; }
`;

const ThreeBhkFlatsGurgaon = () => (
  <>
    <Helmet>
      <title>3 BHK Flats in Gurgaon 2026 | Luxury Spacious Apartments | 100acress</title>
      <meta name="description" content="Explore verified 3 BHK flats in Gurgaon 2026 — luxury spacious apartments, premium family housing across Dwarka Expressway and Golf Course Road. RERA approved, world-class amenities." />
      <meta name="keywords" content="3 BHK flats in Gurgaon 2026, 3 bedroom flats Gurgaon, luxury apartments Gurgaon, spacious family homes, RERA approved 3 BHK, premium real estate Gurgaon" />
      <link rel="canonical" href="https://www.100acress.com/3-bhk-flats-in-gurgaon/" />
      <meta property="og:title" content="3 BHK Flats in Gurgaon 2026 | Luxury Spacious Apartments" />
      <meta property="og:description" content="Discover verified 3 BHK flats in Gurgaon — premium pricing, Dwarka Expressway, Golf Course Road." />
      <meta property="og:url" content="https://www.100acress.com/3-bhk-flats-in-gurgaon/" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://www.100acress.com/images/3-bhk-flats-gurgaon.jpg" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
      <meta name="geo.region" content="HR" />
      <meta name="geo.placename" content="Gurgaon" />
      <meta name="geo.position" content="28.4595;77.0266" />
      <link rel="alternate" hreflang="en" href="https://www.100acress.com/3-bhk-flats-in-gurgaon/" />
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home",     "item": "https://www.100acress.com" },
          { "@type": "ListItem", "position": 2, "name": "Projects", "item": "https://www.100acress.com/projects" },
          { "@type": "ListItem", "position": 3, "name": "3 BHK Flats", "item": "https://www.100acress.com/3-bhk-flats-in-gurgaon/" }
        ]
      })}</script>
      <style>{styles}</style>
    </Helmet>

    <div className="thbg-root">

      {/* HERO */}
      <div className="thbg-hero">
        <div className="thbg-hero-icon">🏰</div>
        <div>
          <h1>3 BHK Flats in Gurgaon 2026</h1>
          <p>
            Verified, RERA-approved luxury 3-bedroom apartments for families who want space,
            comfort, and convenience — top schools, hospitals, and connectivity all nearby.
          </p>
        </div>
      </div>

      {/* WHY GURGAON */}
      <h2 className="thbg-section-title">🚀 Why Gurgaon Real Estate Keeps Growing</h2>
      <div className="thbg-why-grid">
        {WHY_POINTS.map(({ icon, title, text }) => (
          <div className="thbg-why-card" key={title}>
            <div className="thbg-why-icon">{icon}</div>
            <div><h4>{title}</h4><p>{text}</p></div>
          </div>
        ))}
      </div>

      {/* TOP LOCATIONS */}
      <h2 className="thbg-section-title">🏆 Top Locations to Buy in Gurgaon</h2>
      <div className="thbg-loc-grid">
        {LOCATIONS.map(({ icon, title, text }) => (
          <div className="thbg-loc-card" key={title}>
            <div className="loc-icon">{icon}</div>
            <h4>{title}</h4>
            <p>{text}</p>
          </div>
        ))}
      </div>

      {/* AMENITIES + CHECKLIST */}
      <div className="thbg-two-col">
        <div className="thbg-box">
          <h4>✅ Amenities in 3 BHK Flats</h4>
          <ul className="thbg-amenity-list">
            {AMENITIES.map(a => <li key={a}>{a}</li>)}
          </ul>
        </div>
        <div className="thbg-box">
          <h4>📋 Before You Buy — Checklist</h4>
          <ul className="thbg-checklist">
            {CHECKLIST.map(({ label, detail }) => (
              <li key={label}><strong>{label}</strong>{detail}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* WHY INVEST */}
      <h2 className="thbg-section-title">🎯 Why Invest in 3 BHK Flats?</h2>
      <div className="thbg-invest-grid">
        <div className="thbg-invest-card thbg-ic-blue">
          <div className="inv-icon">🚀</div>
          <h4>Early Bird Pricing</h4>
          <p>Exclusive pre-launch discounts and special payment plans on upcoming projects.</p>
        </div>
        <div className="thbg-invest-card thbg-ic-green">
          <div className="inv-icon">📈</div>
          <h4>High Growth Prospects</h4>
          <p>Strong appreciation and premium returns in Gurgaon's booming luxury segment.</p>
        </div>
        <div className="thbg-invest-card thbg-ic-purple">
          <div className="inv-icon">🔑</div>
          <h4>Early Access</h4>
          <p>Be the first to book premium 3 BHK properties at best available rates.</p>
        </div>
      </div>

      {/* CTA */}
      <div className="thbg-cta">
        <h3>🤝 Why Choose 100acress?</h3>
        <p>
          100acress lists only verified, RERA-approved 3 BHK flats in Gurgaon. We work with
          reputed developers and provide expert guidance to help you invest with confidence.
        </p>
        <a href="https://www.100acress.com/projects/upcoming/" aria-label="Explore 3 BHK projects in Gurgaon">
          🏠 Explore Premium Projects
        </a>
      </div>

    </div>
  </>
);

export default ThreeBhkFlatsGurgaon;