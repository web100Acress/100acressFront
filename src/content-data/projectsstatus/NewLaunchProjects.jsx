import React from 'react';
import { Helmet } from 'react-helmet-async';

const structuredData = {
  "@context": "https://schema.org",
  "@type": "RealEstateListing",
  "name": "New Launch Projects in Gurgaon 2026",
  "description": "Explore verified new launch projects in Gurgaon featuring modern architecture, attractive launch pricing, and contemporary amenities across prime locations.",
  "url": "https://www.100acress.com/projects/newlaunch/",
  "provider": { "@type": "RealEstateAgent", "name": "100acress", "url": "https://www.100acress.com" },
  "address": { "@type": "Place", "name": "Gurgaon, Haryana, India" },
  "offers": { "@type": "Offer", "availability": "https://schema.org/PreOrder", "priceCurrency": "INR" },
  "mainEntityOfPage": { "@type": "WebPage", "@id": "https://www.100acress.com/projects/newlaunch/" }
};

const WHY_INVEST = [
  { title: 'Attractive Launch Pricing', text: 'Early-stage properties are priced lower than ready-to-move options — excellent value for early investors.' },
  { title: 'Contemporary Design', text: 'Efficient layouts, sustainable construction, and upgraded lifestyle features for modern living.' },
  { title: 'High Appreciation', text: 'Early investment yields better returns as the project develops and surrounding infrastructure improves.' },
  { title: 'Flexible Payments', text: 'Subvention schemes and flexible payment schedules make home ownership more affordable.' },
  { title: 'Wider Unit Selection', text: 'Early buyers get first pick of floor plans, views, and configurations before premium units sell out.' },
  { title: 'RERA Protection', text: 'All listed projects are RERA-registered — transparency, timely delivery, and legal protection guaranteed.' },
];

const LOCATIONS = [
  { title: 'Dwarka Expressway', text: 'Excellent connectivity to Delhi & IGI Airport — ideal for professionals seeking modern strategic homes.' },
  { title: 'New Gurgaon', text: 'Planned infrastructure, green spaces, and affordable pricing for first-time buyers and investors.' },
  { title: 'Golf Course Ext. Road', text: 'Luxury launches with premium amenities, upscale living, and proximity to schools and business districts.' },
  { title: 'Southern Peripheral Road', text: 'Fast-developing area balancing affordability and connectivity — perfect for families and long-term investors.' },
];

const AMENITIES = [
  { title: 'Infinity Pool', desc: 'Luxury swimming facilities' },
  { title: 'Smart Gym', desc: 'AI-equipped fitness center' },
  { title: 'Sky Gardens', desc: 'Rooftop green spaces' },
  { title: 'Clubhouse', desc: 'Modern recreation center' },
  { title: 'Smart Security', desc: 'AI-powered security systems' },
  { title: 'Solar Power', desc: 'Sustainable energy solutions' },
  { title: 'EV Charging', desc: 'Electric vehicle charging' },
  { title: 'Retail Plaza', desc: 'On-site shopping complex' },
];

const EARLY_BOOKING = [
  { title: 'Launch Discounts', text: 'Special launch pricing, festive offers, and additional discounts not available in later phases.' },
  { title: 'Best Units First', text: 'Access premium units with better views, corner locations, and preferred floor levels.' },
  { title: 'Maximum Appreciation', text: 'Early investors see the highest appreciation as the project and surrounding infrastructure develops.' },
  { title: 'Developer Deals', text: 'Exclusive partnership offers and direct developer pricing only available at launch stage.' },
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;500;600&display=swap');

  .nlp-root {
    font-family: 'DM Sans', sans-serif;
    color: #1a1a2e;
    background: #f8f9fc;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 24px 48px;
    font-size: 1.1rem;
  }

  .nlp-hero {
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%);
    border-radius: 20px;
    padding: 48px 40px;
    margin: 24px 0 32px;
    display: flex;
    align-items: center;
    gap: 24px;
    color: #fff;
  }
  .nlp-hero-icon { font-size: 56px; flex-shrink: 0; }
  .nlp-hero h1 {
    font-family: 'DM Serif Display', serif;
    font-size: 2.2rem;
    margin: 0 0 12px;
    line-height: 1.2;
  }
  .nlp-hero p { margin: 0; font-size: 1.1rem; color: #b0bcd4; line-height: 1.6; }

  .nlp-text-block {
    background: #fff;
    border: 1px solid #e4e9f2;
    border-radius: 16px;
    padding: 32px;
    margin-bottom: 40px;
    line-height: 1.7;
  }
  .nlp-text-block h2 {
    font-family: 'DM Serif Display', serif;
    font-size: 1.6rem;
    color: #1a1a2e;
    margin: 0 0 20px;
  }
  .nlp-text-block p {
    margin-bottom: 18px;
    font-size: 1.1rem;
    color: #5a6480;
  }
  .nlp-text-block ul {
    margin-bottom: 18px;
    padding-left: 24px;
  }
  .nlp-text-block li {
    margin-bottom: 10px;
    font-size: 1.1rem;
    color: #5a6480;
  }
  .nlp-text-block strong {
    color: #1a1a2e;
  }

  /* Why invest — 3-col grid */
  .nlp-why-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 18px;
    margin-bottom: 40px;
  }
  .nlp-why-card {
    background: #fff;
    border: 1px solid #e4e9f2;
    border-radius: 14px;
    padding: 20px;
    display: flex;
    gap: 14px;
    align-items: flex-start;
    transition: box-shadow 0.2s;
  }
  .nlp-why-card:hover { box-shadow: 0 4px 18px rgba(15,52,96,.1); }
  .nlp-why-card h4 { margin: 0 0 4px; font-size: 1.1rem; font-weight: 600; color: #1a1a2e; }
  .nlp-why-card p  { margin: 0; font-size: 1rem; color: #5a6480; line-height: 1.5; }

  /* Locations */
  .nlp-loc-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 16px;
    margin-bottom: 40px;
  }
  .nlp-loc-card {
    background: #fff;
    border: 1px solid #e4e9f2;
    border-radius: 14px;
    padding: 20px;
    transition: box-shadow 0.2s;
  }
  .nlp-loc-card:hover { box-shadow: 0 4px 14px rgba(15,52,96,.1); }
  .nlp-loc-card h4 { margin: 0 0 6px; font-size: 1.1rem; font-weight: 600; color: #1a1a2e; }
  .nlp-loc-card p  { margin: 0; font-size: 1rem; color: #5a6480; line-height: 1.5; }

  /* Amenities */
  .nlp-amenity-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 14px;
    margin-bottom: 40px;
  }
  .nlp-amenity-card {
    background: #fff;
    border: 1px solid #e4e9f2;
    border-radius: 12px;
    padding: 18px 14px;
    text-align: center;
    transition: box-shadow 0.2s;
  }
  .nlp-amenity-card:hover { box-shadow: 0 4px 12px rgba(15,52,96,.08); }
  .nlp-amenity-card h4 { margin: 0 0 4px; font-size: 1.1rem; font-weight: 600; color: #1a1a2e; }
  .nlp-amenity-card p  { margin: 0; font-size: 1rem; color: #5a6480; }

  /* Early booking */
  .nlp-early-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 18px;
    margin-bottom: 40px;
  }
  .nlp-early-card {
    background: #fff;
    border: 1px solid #e4e9f2;
    border-radius: 14px;
    padding: 20px;
    display: flex;
    gap: 14px;
    align-items: flex-start;
    transition: box-shadow 0.2s;
  }
  .nlp-early-card:hover { box-shadow: 0 4px 14px rgba(15,52,96,.1); }
  .nlp-early-card h4 { margin: 0 0 4px; font-size: 1.1rem; font-weight: 600; color: #1a1a2e; }
  .nlp-early-card p  { margin: 0; font-size: 1rem; color: #5a6480; line-height: 1.5; }

  /* Invest cards */
  .nlp-invest-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
    margin-bottom: 32px;
  }
  @media (max-width: 600px) { .nlp-invest-grid { grid-template-columns: 1fr; } }
  .nlp-invest-card {
    border-radius: 12px;
    padding: 22px 16px;
    text-align: center;
    color: #fff;
  }
  .nlp-invest-card .inv-icon { font-size: 30px; margin-bottom: 10px; }
  .nlp-invest-card h4 { margin: 0 0 6px; font-size: 0.92rem; font-weight: 600; }
  .nlp-invest-card p  { margin: 0; font-size: 0.8rem; opacity: 0.88; line-height: 1.45; }
  .nlp-ic-blue   { background: linear-gradient(135deg,#3b82f6,#1d4ed8); }
  .nlp-ic-green  { background: linear-gradient(135deg,#22c55e,#15803d); }
  .nlp-ic-purple { background: linear-gradient(135deg,#a855f7,#7e22ce); }

  /* CTA */
  .nlp-cta {
    background: linear-gradient(135deg,#0f3460,#1a1a2e);
    border-radius: 18px;
    padding: 36px 32px;
    color: #fff;
    text-align: center;
  }
  .nlp-cta h3 {
    font-family: 'DM Serif Display', serif;
    font-size: 1.6rem;
    margin: 0 0 14px;
  }
  .nlp-cta p {
    font-size: 1.05rem;
    color: #b0bcd4;
    line-height: 1.6;
    max-width: 700px;
    margin: 0 auto 22px;
  }
  .nlp-cta a {
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
  .nlp-cta a:hover { background: #e0e8ff; }
`;

const NewLaunchProjects = () => (
  <>
    <Helmet>
      <title>New Launch Projects in Gurgaon 2026 | Latest Real Estate Launches | 100acress</title>
      <meta name="description" content="Explore verified new launch projects in Gurgaon 2026 with attractive launch pricing. Modern architecture, contemporary amenities across Dwarka Expressway, New Gurgaon, Golf Course Road." />
      <meta name="keywords" content="new launch projects in Gurgaon 2026, latest launches Gurgaon, new real estate projects, property launches 2026, Dwarka Expressway new launches, early booking offers" />
      <link rel="canonical" href="https://www.100acress.com/projects/newlaunch/" />
      <meta property="og:title" content="New Launch Projects in Gurgaon 2026 | Latest Real Estate Launches" />
      <meta property="og:description" content="Discover verified new launch projects in Gurgaon with attractive launch pricing and modern architecture." />
      <meta property="og:url" content="https://www.100acress.com/projects/newlaunch/" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://www.100acress.com/images/new-launch-projects-gurgaon.jpg" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
      <meta name="geo.region" content="HR" />
      <meta name="geo.placename" content="Gurgaon" />
      <meta name="geo.position" content="28.4595;77.0266" />
      <link rel="alternate" hreflang="en" href="https://www.100acress.com/projects/newlaunch/" />
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home",               "item": "https://www.100acress.com" },
          { "@type": "ListItem", "position": 2, "name": "Projects",           "item": "https://www.100acress.com/projects" },
          { "@type": "ListItem", "position": 3, "name": "New Launch Projects","item": "https://www.100acress.com/projects/newlaunch/" }
        ]
      })}</script>
      <style>{styles}</style>
    </Helmet>

    <div className="nlp-root">

      {/* HERO */}
      <div className="nlp-hero">
        <div className="nlp-hero-icon"></div>
        <div>
          <h1>New Launch Projects in Gurgaon 2026</h1>
          <p>
            Latest RERA-verified residential launches — modern architecture, early-stage pricing,
            and smart amenities across Dwarka Expressway, New Gurgaon, and Golf Course Road.
          </p>
        </div>
      </div>

      {/* INTRO */}
      <div className="nlp-text-block">
        <h2>Explore New Launch Projects in Gurgaon</h2>
        <p>
          Discover the latest new launch projects in Gurgaon that combine smart planning, modern architecture, and excellent connectivity. These new launch residential projects are well-suited for buyers seeking contemporary homes and investors looking to benefit from early-stage pricing advantages. From premium apartments to value-driven housing options, new launch projects in Gurgaon 2025 offer choices for different budgets and lifestyle needs.
        </p>
        <p>
          With ongoing infrastructure upgrades, improved metro access, and a strong corporate ecosystem, Gurgaon continues to witness consistent demand for new residential developments. Investing in new launch projects allows buyers to enjoy flexible payment plans, wider unit selection, and promising long-term appreciation.
        </p>
      </div>

      {/* WHY INVEST */}
      <div className="nlp-text-block">
        <h2>Why Invest in New Launch Projects in Gurgaon?</h2>
        <p>Gurgaon remains one of the most attractive real estate markets in NCR. Opting for new launch projects in Gurgaon comes with multiple benefits:</p>
        <ul>
          <li><strong>Attractive Launch Pricing:</strong> Properties launched in 2025 are often available at lower prices compared to ready-to-move options.</li>
          <li><strong>Contemporary Design:</strong> New developments feature efficient layouts, sustainable construction, and upgraded lifestyle features.</li>
          <li><strong>Growth Potential:</strong> Early investments generally experience strong appreciation by the time of possession.</li>
          <li><strong>Rental Demand:</strong> Proximity to IT parks, commercial hubs, and business districts ensures steady rental returns.</li>
        </ul>
      </div>

      <div className="nlp-why-grid">
        {WHY_INVEST.map(({ icon, title, text }) => (
          <div className="nlp-why-card" key={title}>
            <div className="nlp-why-icon">{icon}</div>
            <div><h4>{title}</h4><p>{text}</p></div>
          </div>
        ))}
      </div>

      {/* LOCATIONS */}
      <div className="nlp-text-block">
        <h2>Prime Locations for New Launch Projects in Gurgaon</h2>
        <p><strong>Dwarka Expressway:</strong> A rapidly developing corridor, Dwarka Expressway offers excellent access to Delhi and IGI Airport and hosts several premium new launch residential projects.</p>
        <p><strong>New Gurgaon:</strong> With planned sectors and relatively low congestion, New Gurgaon is suitable for families looking for future-ready and budget-friendly new launch projects.</p>
        <p><strong>Golf Course Extension Road:</strong> Known for upscale developments, this area offers luxury living, strong social infrastructure, and high appreciation potential.</p>
        <p><strong>Southern Peripheral Road (SPR):</strong> SPR connects key parts of the city and features multiple new launch projects in 2025 that balance lifestyle comfort with investment growth.</p>
      </div>

      <div className="nlp-loc-grid">
        {LOCATIONS.map(({ icon, title, text }) => (
          <div className="nlp-loc-card" key={title}>
            <div className="loc-icon">{icon}</div>
            <h4>{title}</h4>
            <p>{text}</p>
          </div>
        ))}
      </div>

      {/* AMENITIES */}
      <div className="nlp-text-block">
        <h2>Lifestyle Amenities in New Launch Projects 2025</h2>
        <p>Most new launch projects in Gurgaon are designed to enhance everyday living and typically include:</p>
        <ul>
          <li>Modern clubhouse and swimming pool</li>
          <li>Fitness centers and wellness facilities</li>
          <li>Landscaped green areas and walking tracks</li>
          <li>Dedicated play zones and sports amenities</li>
          <li>Round-the-clock security with smart systems</li>
        </ul>
        <p>These features improve quality of life while also contributing to long-term property value.</p>
      </div>

      <div className="nlp-amenity-grid">
        {AMENITIES.map(({ icon, title, desc }) => (
          <div className="nlp-amenity-card" key={title}>
            <div className="am-icon">{icon}</div>
            <h4>{title}</h4>
            <p>{desc}</p>
          </div>
        ))}
      </div>

      {/* KEY FACTORS */}
      <div className="nlp-text-block">
        <h2>Key Factors to Consider Before Buying</h2>
        <ul>
          <li><strong>RERA Registration:</strong> Confirm the project is registered under RERA to ensure legal safety.</li>
          <li><strong>Builder Credibility:</strong> Check the developer’s track record and past project deliveries.</li>
          <li><strong>Connectivity & Location:</strong> Evaluate road access, public transport, and nearby infrastructure.</li>
          <li><strong>Delivery Schedule:</strong> Review possession timelines mentioned in official approvals.</li>
        </ul>
      </div>

      {/* EARLY BOOKING */}
      <div className="nlp-early-grid">
        {EARLY_BOOKING.map(({ icon, title, text }) => (
          <div className="nlp-early-card" key={title}>
            <div className="nlp-early-icon">{icon}</div>
            <div><h4>{title}</h4><p>{text}</p></div>
          </div>
        ))}
      </div>

      {/* INVEST CARDS */}
      <div className="nlp-invest-grid">
        <div className="nlp-invest-card nlp-ic-blue">
          <div className="inv-icon"></div>
          <h4>Launch Pricing</h4>
          <p>Get the best early-bird deals before prices rise in later phases.</p>
        </div>
        <div className="nlp-invest-card nlp-ic-green">
          <div className="inv-icon"></div>
          <h4>Modern Design</h4>
          <p>Contemporary architecture, sustainable builds, and premium finishes.</p>
        </div>
        <div className="nlp-invest-card nlp-ic-purple">
          <div className="inv-icon"></div>
          <h4>Prime Locations</h4>
          <p>Strategic corridors with excellent metro and highway connectivity.</p>
        </div>
      </div>

      {/* CTA */}
      <div className="nlp-cta">
        <h3>Why Choose 100acress for New Launch Projects?</h3>
        <p>
          100acress provides access to verified and RERA-approved new launch projects in Gurgaon, backed by trusted developers. With accurate information, professional insights, and personalized support, we simplify the property search process. Whether you are purchasing your first home or investing in new launch projects 2025, our platform helps you make confident and informed decisions.
        </p>
        <a href="https://www.100acress.com/projects/newlaunch/" aria-label="Explore new launch projects in Gurgaon">
           Explore New Launches
        </a>
      </div>

    </div>
  </>
);

export default NewLaunchProjects;