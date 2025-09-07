import { useEffect } from 'react';

const CriticalCSS = () => {
  useEffect(() => {
    // Inject critical CSS directly into the document head
    const criticalCSS = `
      /* Critical CSS for above-the-fold content */
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }
      
      body {
        font-family: 'Rubik', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        line-height: 1.6;
        color: #333;
        background-color: #fff;
      }
      
      #root {
        min-height: 100vh;
      }
      
      /* Critical layout styles */
      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1rem;
      }
      
      /* Critical navbar styles */
      .navbar {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1000;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        border-bottom: 1px solid #e5e7eb;
        height: 70px;
      }
      
      /* Critical hero section styles */
      .hero-section {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        position: relative;
        overflow: hidden;
      }
      
      .hero-content {
        text-align: center;
        color: white;
        z-index: 2;
        max-width: 800px;
        padding: 2rem;
      }
      
      .hero-title {
        font-size: clamp(2rem, 5vw, 4rem);
        font-weight: 700;
        margin-bottom: 1rem;
        line-height: 1.2;
      }
      
      .hero-subtitle {
        font-size: clamp(1rem, 2.5vw, 1.5rem);
        margin-bottom: 2rem;
        opacity: 0.9;
      }
      
      /* Critical search bar styles */
      .search-container {
        background: white;
        border-radius: 12px;
        padding: 1rem;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        margin-top: 2rem;
      }
      
      .search-input {
        width: 100%;
        padding: 1rem;
        border: 2px solid #e5e7eb;
        border-radius: 8px;
        font-size: 1rem;
        outline: none;
        transition: border-color 0.3s ease;
      }
      
      .search-input:focus {
        border-color: #dc2626;
      }
      
      .search-button {
        background: #dc2626;
        color: white;
        border: none;
        padding: 1rem 2rem;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: background-color 0.3s ease;
        margin-top: 1rem;
        width: 100%;
      }
      
      .search-button:hover {
        background: #b91c1c;
      }
      
      /* Critical loading styles */
      .loading-spinner {
        display: inline-block;
        width: 40px;
        height: 40px;
        border: 3px solid #f3f4f6;
        border-top: 3px solid #dc2626;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }
      
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      
      /* Critical responsive styles */
      @media (max-width: 768px) {
        .container {
          padding: 0 0.5rem;
        }
        
        .hero-content {
          padding: 1rem;
        }
        
        .search-container {
          margin: 1rem;
          padding: 0.75rem;
        }
      }
      
      /* Hide non-critical content initially */
      .lazy-section {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
      }
      
      .lazy-section.loaded {
        opacity: 1;
        transform: translateY(0);
      }
    `;

    // Create style element and inject CSS
    const styleElement = document.createElement('style');
    styleElement.textContent = criticalCSS;
    styleElement.setAttribute('data-critical', 'true');
    document.head.appendChild(styleElement);

    // Cleanup function
    return () => {
      const existingCriticalStyles = document.querySelector('style[data-critical="true"]');
      if (existingCriticalStyles) {
        existingCriticalStyles.remove();
      }
    };
  }, []);

  return null; // This component doesn't render anything
};

export default CriticalCSS;
