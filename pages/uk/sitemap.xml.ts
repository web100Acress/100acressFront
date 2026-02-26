import { GetServerSideProps } from 'next';
import { UK_CITIES } from '@/content/uk/cities';

const Sitemap = () => {
  // This component is never actually rendered - we handle the XML response in getServerSideProps
  return null;
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const baseUrl = 'https://100acress.com';
  const currentDate = new Date().toISOString();

  // Generate XML sitemap
  const urls = [
    // UK homepage
    `<url>
      <loc>${baseUrl}/uk</loc>
      <lastmod>${currentDate}</lastmod>
      <changefreq>daily</changefreq>
      <priority>1.0</priority>
    </url>`,
    
    // City pages
    ...UK_CITIES.map(city => `
    <url>
      <loc>${baseUrl}/uk/cities/${city.slug}</loc>
      <lastmod>${currentDate}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>`),
    
    // Example project pages (in real implementation, these would come from your CMS/API)
    ...UK_CITIES.flatMap(city => 
      city.featuredProperties.map(property => `
    <url>
      <loc>${baseUrl}/uk/projects/${property.id}</loc>
      <lastmod>${currentDate}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.7</priority>
    </url>`)
    ),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('')}
</urlset>`;

  // Set the appropriate headers
  res.setHeader('Content-Type', 'text/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=43200');
  
  // Send the XML response
  res.write(xml);
  res.end();

  // Return empty props to prevent Next.js from trying to render the component
  return {
    props: {},
  };
};

export default Sitemap;
