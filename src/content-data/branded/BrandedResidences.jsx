import React from 'react';
import { Helmet } from 'react-helmet-async';
import FAQSection from './FAQSection';

const structuredData = {
  "@context": "https://schema.org",
  "@type": "RealEstateListing",
  "name": "Branded Residences in India 2026",
  "description": "Explore branded residences in prime locations like Gurugram and Noida, where developers collaborate with global brands, creating luxury homes with premium amenities.",
  "url": "https://www.100acress.com/branded-residences/",
  "provider": { "@type": "RealEstateAgent", "name": "100acress", "url": "https://www.100acress.com" },
  "address": { "@type": "Place", "name": "Gurugram & Noida, India" },
  "offers": { "@type": "Offer", "availability": "https://schema.org/InStock", "priceCurrency": "INR" },
  "mainEntityOfPage": { "@type": "WebPage", "@id": "https://www.100acress.com/branded-residences/" }
};

const FEATURES = [
  { icon: '🏗️', title: 'Global Partnerships', text: 'Collaboration with world-renowned design and lifestyle brands for unmatched quality.' },
  { icon: '🎨', title: 'Design Excellence', text: 'Thoughtfully planned architecture and elegant interiors at every level of detail.' },
  { icon: '⭐', title: 'Premium Living', text: 'High-quality construction paired with a refined, curated lifestyle experience.' },
  { icon: '🏙️', title: 'Prime Locations', text: 'Developed in Gurugram and Noida — cities known for modern skylines and premium demand.' },
];

const WHY_POINTS = [
  { icon: '🤝', title: 'Brand-Backed Quality', text: 'Global brand associations ensure design consistency, construction standards, and lifestyle curation that conventional housing cannot match.' },
  { icon: '📈', title: 'Strong Appreciation', text: 'Branded residences command a premium and hold value better — making them a smart long-term investment in India\'s top metros.' },
  { icon: '🛎️', title: 'Exclusive Services', text: 'Residents enjoy premium concierge, curated amenities, and privacy-first living conditions designed around comfort and convenience.' },
];

const CHECKLIST = [
  { label: 'Verify RERA Registration', detail: 'Ensure the project is RERA-approved for legal safety and complete transparency.' },
  { label: 'Assess Brand Credibility', detail: 'Research the global brand partner — their reputation directly impacts your lifestyle and resale value.' },
  { label: 'Review Carpet Area & Layout', detail: 'Go beyond the brochure; verify actual carpet area, ceiling heights, and floor plan practicality.' },
  { label: 'Site Visit is Essential', detail: 'Evaluate location, construction quality, and surrounding infrastructure before committing.' },
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;500;600&display=swap');

  .br-root {
    font-family: 'DM Sans', sans-serif;
    color: #1a1a2e;
    background: #f8f9fc;
    max-width: 960px;
    margin: 0 auto;
    padding: 0 16px 48px;
  }

  .br-hero {
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%);
    border-radius: 16px;
    padding: 36px 32px;
    margin: 20px 0 28px;
    display: flex;
    align-items: center;
    gap: 20px;
    color: #fff;
  }
  .br-hero-icon { font-size: 48px; flex-shrink: 0; }
  .br-hero h1 {
    font-family: 'DM Serif Display', serif;
    font-size: 1.75rem;
    margin: 0 0 8px;
    line-height: 1.25;
  }
  .br-hero p { margin: 0; font-size: 0.95rem; color: #b0bcd4; line-height: 1.55; }

  .br-section-title {
    font-family: 'DM Serif Display', serif;
    font-size: 1.3rem;
    color: #1a1a2e;
    margin: 0 0 16px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  /* Feature cards — 2x2 grid */
  .br-feature-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 14px;
    margin-bottom: 32px;
  }
  .br-feature-card {
    background: #fff;
    border: 1px solid #e4e9f2;
    border-radius: 12px;
    padding: 18px;
    transition: box-shadow 0.2s;
  }
  .br-feature-card:hover { box-shadow: 0 4px 18px rgba(15,52,96,.1); }
  .br-feature-card .feat-icon { font-size: 26px; margin-bottom: 10px; }
  .br-feature-card h4 { margin: 0 0 4px; font-size: 0.9rem; font-weight: 600; color: #1a1a2e; }
  .br-feature-card p  { margin: 0; font-size: 0.82rem; color: #5a6480; line-height: 1.5; }

  /* Why cards */
  .br-why-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 14px;
    margin-bottom: 32px;
  }
  .br-why-card {
    background: #fff;
    border: 1px solid #e4e9f2;
    border-radius: 12px;
    padding: 18px;
    display: flex;
    gap: 14px;
    align-items: flex-start;
    transition: box-shadow 0.2s;
  }
  .br-why-card:hover { box-shadow: 0 4px 18px rgba(15,52,96,.1); }
  .br-why-icon {
    width: 44px; height: 44px; border-radius: 10px;
    background: #eef2ff; display: flex; align-items: center;
    justify-content: center; font-size: 22px; flex-shrink: 0;
  }
  .br-why-card h4 { margin: 0 0 4px; font-size: 0.9rem; font-weight: 600; color: #1a1a2e; }
  .br-why-card p  { margin: 0; font-size: 0.82rem; color: #5a6480; line-height: 1.5; }

  /* Checklist box */
  .br-box {
    background: #fff;
    border: 1px solid #e4e9f2;
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 32px;
  }
  .br-box h4 {
    font-family: 'DM Serif Display', serif;
    font-size: 1rem;
    margin: 0 0 12px;
    color: #0f3460;
  }
  .br-checklist { list-style: none; padding: 0; margin: 0; }
  .br-checklist li {
    padding: 8px 0;
    border-bottom: 1px solid #f0f3fa;
    font-size: 0.83rem;
    color: #3a4264;
    line-height: 1.45;
  }
  .br-checklist li:last-child { border-bottom: none; }
  .br-checklist li strong { display: block; font-size: 0.86rem; color: #1a1a2e; margin-bottom: 2px; }

  /* CTA */
  .br-cta {
    background: linear-gradient(135deg,#0f3460,#1a1a2e);
    border-radius: 14px;
    padding: 28px 24px;
    color: #fff;
    text-align: center;
  }
  .br-cta h3 {
    font-family: 'DM Serif Display', serif;
    font-size: 1.3rem;
    margin: 0 0 10px;
  }
  .br-cta p {
    font-size: 0.9rem;
    color: #b0bcd4;
    line-height: 1.55;
    max-width: 560px;
    margin: 0 auto 18px;
  }
  .br-cta a {
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
  .br-cta a:hover { background: #e0e8ff; }
`;

const BrandedResidences = () => (
  <>
    <Helmet>
      <title>Branded Residences in India | Luxury Homes by Global Brands</title>
      <meta name="description" content="Explore branded residences in prime locations like Gurugram and Noida, where developers collaborate with global brands, creating luxury homes with premium amenities and exclusive lifestyle features." />
      <meta name="keywords" content="branded residences, luxury homes, branded apartments, premium residences, luxury living gurgaon" />
      <link rel="canonical" href="https://www.100acress.com/branded-residences/" />
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      <style>{styles}</style>
    </Helmet>

    <div className="br-root">

      {/* HERO */}
      <div className="br-hero">
        <div className="br-hero-icon">🏅</div>
        <div>
          <h1>Branded Residences in India</h1>
          <p>
            Where global design partners meet luxury real estate — thoughtfully planned homes
            in Gurugram and Noida with curated interiors, premium services, and refined living.
          </p>
        </div>
      </div>

      {/* WHAT ARE BRANDED RESIDENCES */}
      <h2 className="br-section-title">🏗️ What Are Branded Residences?</h2>
      <div className="br-feature-grid">
        {FEATURES.map(({ icon, title, text }) => (
          <div className="br-feature-card" key={title}>
            <div className="feat-icon">{icon}</div>
            <h4>{title}</h4>
            <p>{text}</p>
          </div>
        ))}
      </div>

      {/* WHY CHOOSE */}
      <h2 className="br-section-title">🚀 Why Choose a Branded Residence?</h2>
      <div className="br-why-grid">
        {WHY_POINTS.map(({ icon, title, text }) => (
          <div className="br-why-card" key={title}>
            <div className="br-why-icon">{icon}</div>
            <div><h4>{title}</h4><p>{text}</p></div>
          </div>
        ))}
      </div>

      {/* CHECKLIST */}
      <div className="br-box">
        <h4>📋 Before You Buy — Checklist</h4>
        <ul className="br-checklist">
          {CHECKLIST.map(({ label, detail }) => (
            <li key={label}><strong>{label}</strong>{detail}</li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <div className="br-cta">
        <h3>🤝 Why Choose 100acress?</h3>
        <p>
          100acress lists only verified, RERA-approved branded residences across India's
          top cities. Expert guidance and reputed developer partnerships — invest with confidence.
        </p>
        <a href="https://www.100acress.com/projects/upcoming/" aria-label="Explore branded residence projects">
          🏠 Explore Premium Projects
        </a>
      </div>

    </div>

    {/* FAQ Section — kept as-is */}
    <FAQSection />
  </>
);

export default BrandedResidences;