import React from 'react';
import { Helmet } from 'react-helmet-async';

const structuredData = {
  "@context": "https://schema.org",
  "@type": "RealEstateListing",
  "name": "Upcoming Projects in Gurgaon 2026",
  "description": "Explore verified upcoming projects in Gurgaon featuring luxury apartments, modern residences, and affordable housing options across Dwarka Expressway and New Gurgaon.",
  "url": "https://www.100acress.com/projects/upcoming/",
  "provider": { "@type": "RealEstateAgent", "name": "100acress", "url": "https://www.100acress.com" },
  "address": { "@type": "Place", "name": "Gurgaon, Haryana, India" },
  "offers": { "@type": "Offer", "availability": "https://schema.org/PreOrder", "priceCurrency": "INR" },
  "mainEntityOfPage": { "@type": "WebPage", "@id": "https://www.100acress.com/projects/upcoming/" }
};

const WHY_INVEST = [
  { icon: '🏘️', title: 'Wide Property Choices', text: 'Diverse range of housing options from smart 2 BHKs to expansive 4 BHK luxury residences.' },
  { icon: '🚇', title: 'Infrastructure Growth', text: 'Improved road networks, metro connectivity, and new commercial hubs driving appreciation.' },
  { icon: '📈', title: 'High Appreciation', text: 'Early investment in 2026 often results in better price appreciation by possession.' },
  { icon: '💼', title: 'Strong Rental Demand', text: 'Gurgaon\'s corporate ecosystem ensures consistent rental demand across major locations.' },
  { icon: '📋', title: 'RERA Registration', text: 'All listed upcoming projects are RERA-verified for transparency and legal safety.' },
  { icon: '🏗️', title: 'Site Visit Advantage', text: 'Evaluate connectivity and future growth potential by visiting the project location early.' },
];

const LOCATIONS = [
  { icon: '🛣️', title: 'Dwarka Expressway', text: 'Promising corridor with excellent connectivity to Delhi and IGI Airport — prime for luxury launches.' },
  { icon: '🏙️', title: 'New Gurgaon', text: 'Planned infrastructure and peaceful surroundings — ideal for value-driven residential projects.' },
  { icon: '⛳', title: 'Golf Course Ext. Road', text: 'Preferred for premium living, upscale apartments, and strong social infrastructure.' },
  { icon: '🔄', title: 'Southern Peripheral Road', text: 'Connects key sectors and balances lifestyle comfort with significant investment growth.' },
];

const AMENITIES = [
  { icon: '🏊', title: 'Clubhouse & Pool', desc: 'Modern recreational facilities' },
  { icon: '💪', title: 'Gym & Wellness', desc: 'State-of-the-art fitness equipment' },
  { icon: '🌳', title: 'Landscaped Gardens', desc: 'Beautifully designed green spaces' },
  { icon: '🏃', title: 'Jogging Tracks', desc: 'Dedicated tracks for exercise' },
  { icon: '🎮', title: 'Play Areas', desc: 'Safe play zones for kids' },
  { icon: '🛡️', title: '24×7 Security', desc: 'Advanced security systems' }
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;500;600&display=swap');

  .upc-root {
    font-family: 'DM Sans', sans-serif;
    color: #1a1a2e;
    background: #f8f9fc;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 24px 48px;
  }

  .upc-hero {
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%);
    border-radius: 20px;
    padding: 48px 40px;
    margin: 24px 0 32px;
    display: flex;
    align-items: center;
    gap: 24px;
    color: #fff;
  }
  .upc-hero-icon { font-size: 56px; flex-shrink: 0; }
  .upc-hero h1 {
    font-family: 'DM Serif Display', serif;
    font-size: 2.2rem;
    margin: 0 0 12px;
    line-height: 1.2;
  }
  .upc-hero p { margin: 0; font-size: 1.1rem; color: #b0bcd4; line-height: 1.6; }

  .upc-text-block {
    background: #fff;
    border: 1px solid #e4e9f2;
    border-radius: 16px;
    padding: 32px;
    margin-bottom: 40px;
    line-height: 1.7;
  }
  .upc-text-block h2 {
    font-family: 'DM Serif Display', serif;
    font-size: 1.6rem;
    color: #1a1a2e;
    margin: 0 0 20px;
  }
  .upc-text-block p {
    margin-bottom: 18px;
    font-size: 1.05rem;
    color: #5a6480;
  }
  .upc-text-block ul {
    margin-bottom: 18px;
    padding-left: 24px;
  }
  .upc-text-block li {
    margin-bottom: 10px;
    font-size: 1.05rem;
    color: #5a6480;
  }
  .upc-text-block strong {
    color: #1a1a2e;
  }

  /* Grid layouts */
  .upc-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 18px;
    margin-bottom: 40px;
  }
  .upc-card {
    background: #fff;
    border: 1px solid #e4e9f2;
    border-radius: 14px;
    padding: 20px;
    display: flex;
    gap: 14px;
    align-items: flex-start;
    transition: box-shadow 0.2s;
  }
  .upc-card:hover { box-shadow: 0 4px 18px rgba(15,52,96,.1); }
  .upc-icon-box {
    width: 48px; height: 48px; border-radius: 12px;
    background: #eef2ff; display: flex; align-items: center;
    justify-content: center; font-size: 24px; flex-shrink: 0;
  }
  .upc-card h4 { margin: 0 0 4px; font-size: 1rem; font-weight: 600; color: #1a1a2e; }
  .upc-card p  { margin: 0; font-size: 0.9rem; color: #5a6480; line-height: 1.5; }

  .upc-loc-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 16px;
    margin-bottom: 40px;
  }
  .upc-loc-card {
    background: #fff;
    border: 1px solid #e4e9f2;
    border-radius: 14px;
    padding: 20px;
    transition: box-shadow 0.2s;
  }
  .upc-loc-card:hover { box-shadow: 0 4px 14px rgba(15,52,96,.1); }
  .upc-loc-card .loc-icon { font-size: 28px; margin-bottom: 10px; }
  .upc-loc-card h4 { margin: 0 0 6px; font-size: 1rem; font-weight: 600; color: #1a1a2e; }
  .upc-loc-card p  { margin: 0; font-size: 0.9rem; color: #5a6480; line-height: 1.5; }

  .upc-amenity-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 14px;
    margin-bottom: 40px;
  }
  .upc-amenity-card {
    background: #fff;
    border: 1px solid #e4e9f2;
    border-radius: 12px;
    padding: 18px 14px;
    text-align: center;
    transition: box-shadow 0.2s;
  }
  .upc-amenity-card:hover { box-shadow: 0 4px 12px rgba(15,52,96,.08); }
  .upc-amenity-card .am-icon { font-size: 28px; margin-bottom: 8px; }
  .upc-amenity-card h4 { margin: 0 0 4px; font-size: 0.9rem; font-weight: 600; color: #1a1a2e; }
  .upc-amenity-card p  { margin: 0; font-size: 0.8rem; color: #5a6480; }

  /* Invest cards */
  .upc-invest-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 18px;
    margin-bottom: 40px;
  }
  @media (max-width: 600px) { .upc-invest-grid { grid-template-columns: 1fr; } }
  .upc-invest-card {
    border-radius: 14px;
    padding: 28px 20px;
    text-align: center;
    color: #fff;
  }
  .upc-invest-card .inv-icon { font-size: 34px; margin-bottom: 12px; }
  .upc-invest-card h4 { margin: 0 0 8px; font-size: 1.05rem; font-weight: 600; }
  .upc-invest-card p  { margin: 0; font-size: 0.9rem; opacity: 0.88; line-height: 1.5; }
  .upc-ic-blue   { background: linear-gradient(135deg,#3b82f6,#1d4ed8); }
  .upc-ic-green  { background: linear-gradient(135deg,#22c55e,#15803d); }
  .upc-ic-purple { background: linear-gradient(135deg,#a855f7,#7e22ce); }

  /* CTA */
  .upc-cta {
    background: linear-gradient(135deg,#0f3460,#1a1a2e);
    border-radius: 18px;
    padding: 36px 32px;
    color: #fff;
    text-align: center;
  }
  .upc-cta h3 {
    font-family: 'DM Serif Display', serif;
    font-size: 1.6rem;
    margin: 0 0 14px;
  }
  .upc-cta p {
    font-size: 1.05rem;
    color: #b0bcd4;
    line-height: 1.6;
    max-width: 700px;
    margin: 0 auto 22px;
  }
  .upc-cta a {
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
  .upc-cta a:hover { background: #e0e8ff; }
`;

const UpcomingProjects = () => {
  return (
    <>
      <Helmet>
        <title>Upcoming Projects in Gurgaon 2026 | New Launches & Pre-Launch Offers | 100acress</title>
        <meta name="description" content="Explore verified upcoming projects in Gurgaon 2026 featuring luxury apartments, modern residences, and affordable housing options across Dwarka Expressway and New Gurgaon." />
        <meta name="keywords" content="upcoming projects in Gurgaon 2026, new launches Gurgaon, pre-launch projects, future developments Gurgaon, Dwarka Expressway projects" />
        <link rel="canonical" href="https://www.100acress.com/projects/upcoming/" />
        <meta property="og:title" content="Upcoming Projects in Gurgaon 2026 | New Launches & Pre-Launch Offers" />
        <meta property="og:description" content="Discover verified upcoming projects in Gurgaon with exclusive pre-launch pricing. Luxury apartments, modern residences." />
        <meta property="og:url" content="https://www.100acress.com/projects/upcoming/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.100acress.com/images/upcoming-projects-gurgaon.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
        <meta name="geo.region" content="HR" />
        <meta name="geo.placename" content="Gurgaon" />
        <meta name="geo.position" content="28.4595;77.0266" />
        <link rel="alternate" hreflang="en" href="https://www.100acress.com/projects/upcoming/" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org", "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.100acress.com" },
            { "@type": "ListItem", "position": 2, "name": "Projects", "item": "https://www.100acress.com/projects" },
            { "@type": "ListItem", "position": 3, "name": "Upcoming Projects", "item": "https://www.100acress.com/projects/upcoming/" }
          ]
        })}</script>
        <style>{styles}</style>
      </Helmet>

      <div className="upc-root">
        {/* HERO */}
        <div className="upc-hero">
          <div className="upc-hero-icon">🚀</div>
          <div>
            <h1>Upcoming Projects in Gurgaon 2026</h1>
            <p>
              Future Developments & Pre-Launch Opportunities — verified luxury apartments,
              modern residences, and strategic locations across the city.
            </p>
          </div>
        </div>

        {/* INTRO */}
        <div className="upc-text-block">
          <h2>Upcoming Projects in Gurgaon</h2>
          <p>
            Explore verified upcoming projects in Gurgaon featuring luxury apartments, modern residences, and affordable housing options across Dwarka Expressway and New Gurgaon. These upcoming residential projects in Gurgaon 2026 are designed with world-class amenities, excellent road and metro connectivity, and strong future appreciation potential.
          </p>
          <p>
            Over the last decade, Gurgaon has transformed into one of India's fastest-growing real estate destinations. With the presence of leading MNCs, IT hubs, and commercial corridors, the demand for quality housing has increased significantly. Key developments such as the Dwarka Expressway, Delhi-Mumbai Expressway, and Metro expansion are making these upcoming projects highly attractive.
          </p>
        </div>

        {/* WHY INVEST */}
        <div className="upc-text-block">
          <h2>Why Invest in Upcoming Projects in Gurgaon?</h2>
          <p>Investing in upcoming projects provides multiple advantages in a high-growth market like Gurgaon:</p>
          <ul>
            <li><strong>Wide Property Choices:</strong> From smart 2 BHK homes to expansive 4 BHK luxury residences.</li>
            <li><strong>Infrastructure Growth:</strong> Improved road networks and new commercial hubs drive appreciation.</li>
            <li><strong>High Appreciation Potential:</strong> Early investment in 2026 often results in better price appreciation.</li>
            <li><strong>Strong Rental Demand:</strong> Corporate ecosystem ensures consistent rental demand.</li>
          </ul>
        </div>

        <div className="upc-grid">
          {WHY_INVEST.map(({ icon, title, text }) => (
            <div className="upc-card" key={title}>
              <div className="upc-icon-box">{icon}</div>
              <div><h4>{title}</h4><p>{text}</p></div>
            </div>
          ))}
        </div>

        {/* LOCATIONS */}
        <div className="upc-text-block">
          <h2>Top Locations for Upcoming Projects in Gurgaon</h2>
          <p><strong>Dwarka Expressway:</strong> Most promising corridor with excellent connectivity to Delhi and IGI Airport.</p>
          <p><strong>New Gurgaon:</strong> Ideal for families seeking planned infrastructure and peaceful surroundings.</p>
          <p><strong>Golf Course Extension Road:</strong> Preferred for premium living, upscale apartments, and strong social infrastructure.</p>
          <p><strong>Southern Peripheral Road (SPR):</strong> Balances lifestyle comfort with significant investment growth potential.</p>
        </div>

        <div className="upc-loc-grid">
          {LOCATIONS.map(({ icon, title, text }) => (
            <div className="upc-loc-card" key={title}>
              <div className="loc-icon">{icon}</div>
              <h4>{title}</h4>
              <p>{text}</p>
            </div>
          ))}
        </div>

        {/* AMENITIES */}
        <div className="upc-text-block">
          <h2>Amenities Offered in Upcoming Projects 2026</h2>
          <p>Most upcoming projects in Gurgaon are designed to deliver a modern lifestyle, featuring:</p>
          <ul>
            <li>Modern clubhouse and swimming pool</li>
            <li>Gymnasium and wellness zones</li>
            <li>Landscaped gardens and jogging tracks</li>
            <li>Safe children's play areas and sports zones</li>
            <li>Advanced 24x7 security with smart systems</li>
          </ul>
          <p>These amenities enhance both living comfort and property value for long-term investors.</p>
        </div>

        <div className="upc-amenity-grid">
          {AMENITIES.map(({ icon, title, desc }) => (
            <div className="upc-amenity-card" key={title}>
              <div className="am-icon">{icon}</div>
              <h4>{title}</h4>
              <p>{desc}</p>
            </div>
          ))}
        </div>

        {/* INVEST CARDS */}
        <div className="upc-invest-grid">
          <div className="upc-invest-card upc-ic-blue">
            <div className="inv-icon">🚀</div>
            <h4>Early Bird Pricing</h4>
            <p>Get exclusive pre-launch discounts and special payment plans.</p>
          </div>
          <div className="upc-invest-card upc-ic-green">
            <div className="inv-icon">📈</div>
            <h4>High Growth</h4>
            <p>Premium returns on investment in Gurgaon's booming market.</p>
          </div>
          <div className="upc-invest-card upc-ic-purple">
            <div className="inv-icon">🔑</div>
            <h4>Early Access</h4>
            <p>Be the first to book these premium future-ready properties.</p>
          </div>
        </div>

        {/* CTA */}
        <div className="upc-cta">
          <h3>🤝 Why Choose 100acress for Upcoming Projects in Gurgaon?</h3>
          <p>
            100acress is a trusted real estate platform showcasing verified and RERA-approved upcoming projects.
            Reputed developers, accurate details, and expert guidance to help you decide.
          </p>
          <a href="https://www.100acress.com/projects/upcoming/" aria-label="Explore upcoming projects in Gurgaon">
            🏠 Explore Premium Projects
          </a>
        </div>
      </div>
    </>
  );
};

export default UpcomingProjects;
