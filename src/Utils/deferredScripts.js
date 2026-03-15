import React, { useMemo } from 'react';
// Utility to defer loading of third-party scripts
export const loadScriptDeferred = (src, id, async = true, defer = true) => {
  return new Promise((resolve, reject) => {
    // Check if script already exists
    if (document.getElementById(id)) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.id = id;
    script.async = async;
    script.defer = defer;
    
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    
    // Add to head with low priority
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        document.head.appendChild(script);
      });
    } else {
      // Use requestIdleCallback for non-critical scripts
      if (window.requestIdleCallback) {
        window.requestIdleCallback(() => {
          document.head.appendChild(script);
        });
      } else {
        setTimeout(() => {
          document.head.appendChild(script);
        }, 100);
      }
    }
  });
};

// Load Google Analytics after user interaction
export const loadGoogleAnalytics = (measurementId) => {
  const loadGA = () => {
    loadScriptDeferred(
      `https://www.googletagmanager.com/gtag/js?id=${measurementId}`,
      'google-analytics'
    ).then(() => {
      // Initialize gtag
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', measurementId, {
        // Optimize for performance
        send_page_view: false,
        transport_type: 'beacon'
      });
      
      // Manual page view tracking after load
      setTimeout(() => {
        gtag('event', 'page_view', {
          page_location: window.location.href,
          page_title: document.title
        });
      }, 1000);
    }).catch(console.warn);
  };

  // Load on first interaction
  const handleInteraction = () => {
    loadGA();
    document.removeEventListener('scroll', handleInteraction);
    document.removeEventListener('click', handleInteraction);
    document.removeEventListener('keydown', handleInteraction);
  };

  document.addEventListener('scroll', handleInteraction, { once: true });
  document.addEventListener('click', handleInteraction, { once: true });
  document.addEventListener('keydown', handleInteraction, { once: true });
};

// Load Facebook Pixel after user interaction
export const loadFacebookPixel = (pixelId) => {
  const loadFB = () => {
    loadScriptDeferred(
      'https://connect.facebook.net/en_US/fbevents.js',
      'facebook-pixel'
    ).then(() => {
      // Initialize Facebook Pixel
      window.fbq = function() {
        window.fbq.callMethod ? 
        window.fbq.callMethod.apply(window.fbq, arguments) : 
        window.fbq.queue.push(arguments);
      };
      window.fbq.queue = [];
      window.fbq.version = '2.0';
      
      window.fbq('init', pixelId);
      window.fbq('track', 'PageView');
    }).catch(console.warn);
  };

  // Load on first interaction
  const handleInteraction = () => {
    loadFB();
    document.removeEventListener('scroll', handleInteraction);
    document.removeEventListener('click', handleInteraction);
    document.removeEventListener('keydown', handleInteraction);
  };

  document.addEventListener('scroll', handleInteraction, { once: true });
  document.addEventListener('click', handleInteraction, { once: true });
  document.addEventListener('keydown', handleInteraction, { once: true });
};

// Load Hotjar after page is fully loaded
export const loadHotjar = (hjid, hjsv) => {
  const loadHJ = () => {
    (function(h,o,t,j,a,r){
      h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
      h._hjSettings={hjid:hjid,hjsv:hjsv};
      a=o.getElementsByTagName('head')[0];
      r=o.createElement('script');r.async=1;
      r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
      a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
  };

  // Load after 3 seconds or on interaction
  setTimeout(loadHJ, 3000);
  
  const handleInteraction = () => {
    loadHJ();
    document.removeEventListener('scroll', handleInteraction);
    document.removeEventListener('click', handleInteraction);
  };
  
  document.addEventListener('scroll', handleInteraction, { once: true });
  document.addEventListener('click', handleInteraction, { once: true });
};
