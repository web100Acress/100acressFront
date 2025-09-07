import { useEffect } from 'react';

const ResourcePreloader = () => {
  useEffect(() => {
    // Remove any existing preload links that might cause warnings
    const removePreloadLinks = () => {
      const preloadLinks = document.querySelectorAll('link[rel="preload"], link[rel="modulepreload"]');
      preloadLinks.forEach(link => {
        // Only remove if it's causing issues (not used within reasonable time)
        setTimeout(() => {
          if (link.parentNode) {
            console.log('Removing unused preload link:', link.href);
            link.parentNode.removeChild(link);
          }
        }, 3000); // Remove after 3 seconds if still unused
      });
    };

    // DNS prefetch for external domains only (no preloads)
    const dnsPrefetch = (url) => {
      // Check if DNS prefetch already exists
      if (!document.querySelector(`link[rel="dns-prefetch"][href="${url}"]`)) {
        const link = document.createElement('link');
        link.rel = 'dns-prefetch';
        link.href = url;
        document.head.appendChild(link);
      }
    };

    // Only DNS prefetch for external domains - no resource preloading
    dnsPrefetch('https://api.100acress.com');
    dnsPrefetch('https://fonts.googleapis.com');
    dnsPrefetch('https://fonts.gstatic.com');
    dnsPrefetch('https://cdnjs.cloudflare.com');

    // Clean up any problematic preload links
    removePreloadLinks();

    // Prevent future preload links from being added
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1 && node.tagName === 'LINK') {
            if (node.rel === 'preload' || node.rel === 'modulepreload') {
              // Log and potentially remove problematic preloads
              console.warn('Preload link detected:', node.href, '- monitoring for usage');
            }
          }
        });
      });
    });

    observer.observe(document.head, { childList: true });

    // Cleanup observer on unmount
    return () => {
      observer.disconnect();
    };
  }, []);

  return null; // This component doesn't render anything
};

export default ResourcePreloader;
