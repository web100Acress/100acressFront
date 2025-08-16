import React, { useState, useEffect } from 'react';

function SitemapViewer() {
  const [sitemapContent, setSitemapContent] = useState('');

  useEffect(() => {
    async function fetchSitemap() {
      const response = await fetch('/sitemap.xml'); // Assuming sitemap.xml is in public folder
      const text = await response.text();
      setSitemapContent(text);
    }

    fetchSitemap();
  }, []);

  return (
    <div>
      <pre>{sitemapContent}</pre>
    </div>
  );
}

export default SitemapViewer;
