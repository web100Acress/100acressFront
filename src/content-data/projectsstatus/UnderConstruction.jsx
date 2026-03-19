import React from 'react';
import { Helmet } from 'react-helmet-async';

const structuredData = {
  "@context": "https://schema.org",
  "@type": "RealEstateListing",
  "name": "Under Construction Projects in Gurgaon 2026",
  "description": "Explore verified under construction projects in Gurgaon featuring modern amenities, construction-linked payment plans, and strong appreciation potential across prime locations.",
  "url": "https://www.100acress.com/projects/underconstruction/",
  "provider": { "@type": "RealEstateAgent", "name": "100acress", "url": "https://www.100acress.com" },
  "address": { "@type": "Place", "name": "Gurgaon, Haryana, India" },
  "offers": { "@type": "Offer", "availability": "https://schema.org/PreOrder", "priceCurrency": "INR" },
  "mainEntityOfPage": { "@type": "WebPage", "@id": "https://www.100acress.com/projects/underconstruction/" }
};

const WHY_INVEST = [
  { title: 'Lower Entry Cost', text: 'Under construction properties are generally priced lower than ready-to-move homes, making them affordable for first-time buyers.' },
  { title: 'Flexible Payment Plans', text: 'Construction-linked payment plans reduce financial pressure on buyers with staggered payments tied to construction milestones.' },
  { title: 'High Appreciation Potential', text: 'Early-stage investments often see significant value growth by possession, maximizing your returns on investment.' },
];

const LOCATIONS = [
  { title: 'Dwarka Expressway', text: 'Multiple under-construction projects with excellent connectivity and future growth potential.' },
  { title: 'New Gurgaon', text: 'Emerging hub with numerous ongoing projects offering modern amenities at competitive prices.' },
  { title: 'Southern Peripheral Road', text: 'Fast-developing corridor with several under-construction projects and improving infrastructure.' },
  { title: 'Golf Course Extension', text: 'Premium under-construction projects with luxury amenities and proximity to business districts.' },
];

const AMENITIES = [
  { title: 'Clubhouse & Pool', desc: 'Modern recreational facilities for all ages' },
  { title: 'Equipped Gym', desc: 'State-of-the-art fitness and wellness facilities' },
  { title: 'Landscaped Gardens', desc: 'Beautiful green spaces, walking tracks, and parks' },
  { title: 'Children\'s Play Areas', desc: 'Dedicated safe play zones and sports amenities' },
  { title: '24×7 Security', desc: 'CCTV surveillance and smart security systems' },
  { title: 'Power & Parking', desc: 'Uninterrupted power supply and ample dedicated parking' }
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;500;600&display=swap');

  .uc-root {
    font-family: 'DM Sans', sans-serif;
    color: #1a1a2e;
    background: #f8f9fc;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 24px 48px;
    font-size: 1.1rem;
  }

  .uc-hero {
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%);
    border-radius: 20px;
    padding: 48px 40px;
    margin: 24px 0 32px;
    display: flex;
    align-items: center;
    gap: 24px;
    color: #fff;
  }
  .uc-hero h1 {
    font-family: 'DM Serif Display', serif;
    font-size: 2.2rem;
    margin: 0 0 8px;
    line-height: 1.25;
  }
  .uc-hero p { margin: 0; font-size: 1.1rem; color: #b0bcd4; line-height: 1.55; }

  .uc-text-block {
    background: #fff;
    border: 1px solid #e4e9f2;
    border-radius: 16px;
    padding: 32px;
    margin-bottom: 40px;
    line-height: 1.7;
  }
  .uc-section-title {
    font-family: 'DM Serif Display', serif;
    font-size: 1.6rem;
    color: #1a1a2e;
    margin: 0 0 16px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .uc-text-block p {
    margin-bottom: 18px;
    font-size: 1.05rem;
    color: #5a6480;
  }
  .uc-text-block ul {
    margin-bottom: 18px;
    padding-left: 24px;
  }
  .uc-text-block li {
    margin-bottom: 10px;
    font-size: 1.05rem;
    color: #5a6480;
  }
  .uc-text-block strong {
    color: #1a1a2e;
  }

  /* Grid layouts */
  .uc-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 18px;
    margin-bottom: 40px;
  }
  .uc-card {
    background: #fff;
    border: 1px solid #e4e9f2;
    border-radius: 14px;
    padding: 20px;
    display: flex;
    gap: 14px;
    align-items: flex-start;
    transition: box-shadow 0.2s;
  }
  .uc-card:hover { box-shadow: 0 4px 18px rgba(15,52,96,.1); }
  .uc-why-card h4 { margin: 0 0 4px; font-size: 1.1rem; font-weight: 600; color: #1a1a2e; }
  .uc-why-card p { margin: 0; font-size: 1rem; color: #5a6480; line-height: 1.5; }

  .uc-loc-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 16px;
    margin-bottom: 40px;
  }
  .uc-loc-card {
    background: #fff;
    border: 1px solid #e4e9f2;
    border-radius: 14px;
    padding: 20px;
    transition: box-shadow 0.2s;
  }
  .uc-loc-card:hover { box-shadow: 0 4px 14px rgba(15,52,96,.1); }
  .uc-loc-card h4 { margin: 0 0 4px; font-size: 1.1rem; font-weight: 600; color: #1a1a2e; }
  .uc-loc-card p { margin: 0; font-size: 1rem; color: #5a6480; line-height: 1.45; }

  .uc-amenity-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 14px;
    margin-bottom: 40px;
  }
  .uc-amenity-card {
    background: #fff;
    border: 1px solid #e4e9f2;
    border-radius: 12px;
    padding: 18px 14px;
    text-align: center;
    transition: box-shadow 0.2s;
  }
  .uc-amenity-card:hover { box-shadow: 0 4px 12px rgba(15,52,96,.08); }
  .uc-amenity-card h4 { margin: 0 0 4px; font-size: 1.1rem; font-weight: 600; color: #1a1a2e; }
  .uc-amenity-card p { margin: 0; font-size: 1rem; color: #5a6480; }

  /* Invest cards */
  .uc-invest-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 18px;
    margin-bottom: 40px;
  }
  @media (max-width: 600px) { .uc-invest-grid { grid-template-columns: 1fr; } }
  .uc-invest-card {
    border-radius: 14px;
    padding: 28px 20px;
    text-align: center;
    color: #fff;
  }
  .uc-invest-card .inv-icon { font-size: 34px; margin-bottom: 12px; }
  .uc-invest-card h4 { margin: 0 0 8px; font-size: 1.05rem; font-weight: 600; }
  .uc-invest-card p  { margin: 0; font-size: 0.9rem; opacity: 0.88; line-height: 1.5; }
  .uc-ic-blue   { background: linear-gradient(135deg,#3b82f6,#1d4ed8); }
  .uc-ic-green  { background: linear-gradient(135deg,#22c55e,#15803d); }
  .uc-ic-purple { background: linear-gradient(135deg,#a855f7,#7e22ce); }

  /* CTA */
  .uc-cta {
    background: linear-gradient(135deg,#0f3460,#1a1a2e);
    border-radius: 18px;
    padding: 36px 32px;
    color: #fff;
    text-align: center;
  }
  .uc-cta h3 {
    font-family: 'DM Serif Display', serif;
    font-size: 1.6rem;
    margin: 0 0 14px;
  }
  .uc-cta p {
    font-size: 1.05rem;
    color: #b0bcd4;
    line-height: 1.6;
    max-width: 700px;
    margin: 0 auto 22px;
  }
  .uc-cta a {
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
  .uc-cta a:hover { background: #e0e8ff; }
`;

const UnderConstruction = () => {
  return (
    <>
      <Helmet>
        <title>Under Construction Projects in Gurgaon 2026 | Ongoing Developments | 100acress</title>
        <meta name="description" content="Explore verified under construction projects in Gurgaon featuring modern amenities, construction-linked payment plans, and strong appreciation potential." />
        <meta name="keywords" content="under construction projects in Gurgaon 2026, ongoing developments Gurgaon, construction-linked payment plans, Dwarka Expressway projects" />
        <link rel="canonical" href="https://www.100acress.com/projects/underconstruction/" />
        <meta property="og:title" content="Under Construction Projects in Gurgaon 2026 | Ongoing Developments" />
        <meta property="og:description" content="Discover verified under construction projects in Gurgaon with construction-linked payment plans and modern amenities." />
        <meta property="og:url" content="https://www.100acress.com/projects/underconstruction/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.100acress.com/images/under-construction-projects-gurgaon.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
        <meta name="geo.region" content="HR" />
        <meta name="geo.placename" content="Gurgaon" />
        <meta name="geo.position" content="28.4595;77.0266" />
        <link rel="alternate" hreflang="en" href="https://www.100acress.com/projects/underconstruction/" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org", "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.100acress.com" },
            { "@type": "ListItem", "position": 2, "name": "Projects", "item": "https://www.100acress.com/projects" },
            { "@type": "ListItem", "position": 3, "name": "Under Construction Projects", "item": "https://www.100acress.com/projects/underconstruction/" }
          ]
        })}</script>
        <style>{styles}</style>
      </Helmet>

      <div className="uc-root">
        {/* HERO */}
        <div className="uc-hero">
          <div className="uc-hero-icon">🏗️</div>
          <div>
            <h1>Under Construction Projects in Gurgaon 2026</h1>
            <p>
              Ongoing Developments & Construction Progress — verified projects with
              construction-linked payment plans and world-class amenities across prime sectors.
            </p>
          </div>
        </div>

        {/* INTRO */}
        <div className="uc-text-block">
          <h2>Under Construction Projects in Gurgaon</h2>
          <p>
            Explore the best under construction projects in Gurgaon designed for modern living and long-term investment. Under construction residential projects offer an ideal opportunity to purchase properties at early-stage prices while benefiting from future appreciation.
          </p>
          <p>
            Gurgaon remains one of the most promising real estate markets in NCR. These projects follow updated building norms, safety standards, and sustainable practices for better quality living. Proximity to IT parks, business centers, and metro routes ensures future rental income and high occupancy rates.
          </p>
        </div>

        {/* WHY INVEST */}
        <div className="uc-text-block">
          <h2>Why Invest in Under Construction Projects in Gurgaon?</h2>
          <p>Gurgaon remains one of the most promising real estate markets in NCR. Investing in under construction projects in Gurgaon offers several advantages:</p>
          <ul>
            <li><strong>Lower Entry Cost:</strong> Under construction properties are generally priced lower than ready-to-move homes, making them affordable for first-time buyers.</li>
            <li><strong>Flexible Payment Plans:</strong> Construction-linked payment plans reduce financial pressure on buyers with staggered payments tied to construction milestones.</li>
            <li><strong>High Appreciation Potential:</strong> Early-stage investments often see significant value growth by possession, maximizing your returns on investment.</li>
            <li><strong>Modern Construction Standards:</strong> New projects follow updated building norms, safety standards, and sustainable practices for better quality living.</li>
            <li><strong>Strong Rental Demand:</strong> Proximity to IT parks, business centers, and metro routes ensures future rental income and high occupancy rates.</li>
          </ul>
        </div>

        <div className="uc-grid">
          {WHY_INVEST.map(({ icon, title, text }) => (
            <div className="uc-card" key={title}>
              <div className="uc-icon-box">{icon}</div>
              <div><h4>{title}</h4><p>{text}</p></div>
            </div>
          ))}
        </div>

        {/* LOCATIONS */}
        <div className="uc-text-block">
          <h2>Top Locations for Under Construction Projects in Gurgaon</h2>
          <p><strong>Dwarka Expressway:</strong> Dwarka Expressway is a rapidly developing corridor offering excellent connectivity to Delhi and IGI Airport. Many premium under construction residential projects are located here with modern amenities and strong appreciation prospects.</p>
          <p><strong>New Gurgaon:</strong> New Gurgaon offers planned sectors, wider roads, and lower congestion, making it ideal for families and buyers seeking affordable under construction projects with future growth potential.</p>
          <p><strong>Golf Course Extension Road:</strong> This area is known for luxury developments and high-end residential projects. Under construction projects here provide upscale living with easy access to schools, hospitals, and commercial hubs.</p>
          <p><strong>Southern Peripheral Road (SPR):</strong> SPR connects major residential and commercial zones of Gurgaon and features several under construction projects in 2025 that balance lifestyle convenience and investment returns.</p>
        </div>

        <div className="uc-loc-grid">
          {LOCATIONS.map(({ icon, title, text }) => (
            <div className="uc-loc-card" key={title}>
              <div className="loc-icon">{icon}</div>
              <h4>{title}</h4>
              <p>{text}</p>
            </div>
          ))}
        </div>

        {/* AMENITIES */}
        <div className="uc-text-block">
          <h2>Amenities Offered in Under Construction Projects 2025</h2>
          <p>Most under construction residential projects in Gurgaon are designed to deliver a premium living experience and typically include:</p>
          <ul>
            <li>Modern clubhouse and swimming pool</li>
            <li>Fully Equipped Gym and wellness centers</li>
            <li>Landscaped Gardens and beautiful green spaces</li>
            <li>Safe Children's Play Areas and sports facilities</li>
            <li>24×7 Security with CCTV surveillance</li>
            <li>Power Backup and Ample Parking spaces</li>
          </ul>
          <p>These features enhance comfort, safety, and long-term property value, making these projects ideal for modern living.</p>
        </div>

        <div className="uc-amenity-grid">
          {AMENITIES.map(({ icon, title, desc }) => (
            <div className="uc-amenity-card" key={title}>
              <div className="am-icon">{icon}</div>
              <h4>{title}</h4>
              <p>{desc}</p>
            </div>
          ))}
        </div>

        {/* KEY FACTORS */}
        <div className="uc-text-block">
          <h2>Things to Check Before Buying Under Construction Projects</h2>
          <ul>
            <li><strong>RERA Registration:</strong> Always verify that the under construction project is RERA-approved for transparency and legal safety. This ensures compliance with regulatory standards and protects your investment.</li>
            <li><strong>Developer Reputation:</strong> Review the builder's track record and past project deliveries. Check their financial stability and history of completing projects on time.</li>
            <li><strong>Connectivity & Location:</strong> Evaluate road access, public transport, and nearby infrastructure. Good connectivity ensures better appreciation and rental potential.</li>
            <li><strong>Possession Timeline:</strong> Check the RERA-approved completion date before finalizing your purchase. Ensure the timeline aligns with your requirements and financial planning.</li>
          </ul>
        </div>

        {/* INVEST CARDS */}
        <div className="uc-invest-grid">
          <div className="uc-invest-card uc-ic-blue">
            <div className="inv-icon"></div>
            <h4>Lower Pricing</h4>
            <p>Get early-stage pricing and better value compared to ready-to-move homes.</p>
          </div>
          <div className="uc-invest-card uc-ic-green">
            <div className="inv-icon"></div>
            <h4>High Appreciation</h4>
            <p>Maximum returns as construction progresses towards completion and handover.</p>
          </div>
          <div className="uc-invest-card uc-ic-purple">
            <div className="inv-icon"></div>
            <h4>Flexible Payments</h4>
            <p>Construction-linked payment plans that align with the development schedule.</p>
          </div>
        </div>

        {/* CTA */}
        <div className="uc-cta">
          <h3>Why Choose 100acress for Under Construction Projects?</h3>
          <p>
            100acress is a trusted real estate platform offering verified and RERA-approved under construction projects in Gurgaon. We collaborate with reputed developers and provide accurate project information, expert insights, and personalized assistance to help you make confident property decisions.
          </p>
          <a href="https://www.100acress.com/projects/underconstruction/" aria-label="Explore ongoing projects in Gurgaon">
            Explore Ongoing Projects
          </a>
        </div>
      </div>
    </>
  );
};

export default UnderConstruction;
