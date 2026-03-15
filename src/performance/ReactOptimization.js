// REACT PERFORMANCE OPTIMIZATION FOR 100ACRESS.COM
// Code Splitting and Lazy Loading Implementation

import React, { useMemo } from 'react';

// 1. LAZY LOADING FOR HEAVY COMPONENTS
// Instead of normal imports:
// import ProjectPage from './pages/ProjectPage';
// import BlogPage from './pages/BlogPage';

// Use lazy loading:
const ProjectPage = lazy(() => import('./pages/ProjectPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const PropertyDetails = lazy(() => import('./pages/PropertyDetails'));
const BlogWriteModal = lazy(() => import('./Components/Blog_Components/Blog/admin/desktop/BlogWriteModal'));
const ProjectComparison = lazy(() => import('./Components/ProjectComparison'));

// 2. LOADING COMPONENTS
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    <span className="ml-3 text-gray-600">Loading...</span>
  </div>
);

const ComponentLoader = ({ height = '200px' }) => (
  <div className="flex items-center justify-center" style={{ height }}>
    <div className="animate-pulse bg-gray-200 rounded w-full h-full"></div>
  </div>
);

// 3. ROUTE OPTIMIZATION
// In your App.js or Router setup:
const OptimizedRouter = () => {
  return (
    <Router>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route 
            path="/projects/:id" 
            element={
              <Suspense fallback={<ComponentLoader height="400px" />}>
                <PropertyDetails />
              </Suspense>
            } 
          />
          <Route 
            path="/projects" 
            element={
              <Suspense fallback={<ComponentLoader height="400px" />}>
                <ProjectPage />
              </Suspense>
            } 
          />
          <Route 
            path="/blog" 
            element={
              <Suspense fallback={<ComponentLoader height="400px" />}>
                <BlogPage />
              </Suspense>
            } 
          />
          <Route 
            path="/admin/blog-write" 
            element={
              <Suspense fallback={<ComponentLoader height="600px" />}>
                <BlogWriteModal />
              </Suspense>
            } 
          />
        </Routes>
      </Suspense>
    </Router>
  );
};

// 4. HEAVY COMPONENT LAZY LOADING
// For modals and heavy components:
const LazyModal = ({ children, show, ...props }) => {
  if (!show) return null;
  
  return (
    <Suspense fallback={<ComponentLoader height="300px" />}>
      {children}
    </Suspense>
  );
};

// Usage example:
// <LazyModal show={showModal}>
//   <BlogWriteModal onClose={() => setShowModal(false)} />
// </LazyModal>

// 5. PRELOADING CRITICAL ROUTES
// Preload routes when user hovers over links:
const PreloadLink = ({ to, children, ...props }) => {
  const handleMouseEnter = () => {
    // Start loading the component when user hovers
    import('./pages/ProjectPage').catch(() => {});
  };

  return (
    <Link 
      to={to} 
      onMouseEnter={handleMouseEnter}
      {...props}
    >
      {children}
    </Link>
  );
};

// 6. BUNDLE ANALYSIS
// Add to your package.json scripts:
// "analyze": "npm run build && npx webpack-bundle-analyzer build/static/js/*.js"

// 7. DYNAMIC IMPORTS FOR CONDITIONAL COMPONENTS
// Instead of:
// {showHeavyComponent && <HeavyComponent />}

// Use:
const [HeavyComponent, setHeavyComponent] = useState(null);

const loadHeavyComponent = async () => {
  const component = await import('./HeavyComponent');
  setHeavyComponent(component.default);
};

// Then:
{showHeavyComponent && HeavyComponent && <HeavyComponent />}

// 8. OPTIMIZED IMAGE COMPONENT (Enhanced)
import { useState, useRef, useEffect } from 'react';

const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  width, 
  height,
  loading = 'lazy',
  priority = false,
  placeholder = 'blur',
  quality = 85
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [error, setError] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    if (priority) {
      setIsInView(true);
      return;
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  const generateSrcSet = (baseSrc) => {
    if (!baseSrc.includes('100acress.com')) return baseSrc;
    
    // Generate responsive image sources
    const sizes = [400, 800, 1200, 1600];
    return sizes.map(size => 
      `${baseSrc}?w=${size}&q=${quality} ${size}w`
    ).join(', ');
  };

  return (
    <div ref={imgRef} className={className}>
      {isInView && !error && (
        <img
          src={src}
          srcSet={generateSrcSet(src)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : loading}
          onLoad={() => setIsLoaded(true)}
          onError={() => setError(true)}
          style={{
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease'
          }}
        />
      )}
      {!isInView && (
        <div 
          style={{
            width: width || '100%',
            height: height || '200px',
            backgroundColor: '#f0f0f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '8px'
          }}
        >
          <div className="animate-pulse bg-gray-200 rounded w-full h-full"></div>
        </div>
      )}
      {error && (
        <div 
          style={{
            width: width || '100%',
            height: height || '200px',
            backgroundColor: '#fee',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '8px',
            border: '1px solid #fcc'
          }}
        >
          <span className="text-red-500 text-sm">Image not available</span>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;
export { 
  OptimizedRouter, 
  LazyModal, 
  PreloadLink, 
  PageLoader, 
  ComponentLoader 
};
