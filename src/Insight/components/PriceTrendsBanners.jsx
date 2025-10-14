import React, { useEffect, useState } from 'react';

export default function PriceTrendsBanners() {
  const [banners, setBanners] = useState([]);
  const [smallBanners, setSmallBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      setLoading(true);
      setError(null);

      const base = import.meta.env.VITE_API_BASE || 'http://localhost:3000';

      // Fetch both banner types
      const [bannersResponse, smallBannersResponse] = await Promise.all([
        fetch(`${base}/api/banners/active`),
        fetch(`${base}/api/small-banners/active`)
      ]);

      if (!bannersResponse.ok || !smallBannersResponse.ok) {
        throw new Error('Failed to fetch banners');
      }

      const bannersData = await bannersResponse.json();
      const smallBannersData = await smallBannersResponse.json();

      setBanners(bannersData.banners || []);
      setSmallBanners(smallBannersData.banners || []);

    } catch (err) {
      console.error('Error fetching banners:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full bg-white rounded-2xl shadow-lg p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full bg-white rounded-2xl shadow-lg p-6">
        <div className="text-center">
          <div className="text-red-500 text-lg mb-4">Error loading banners</div>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchBanners}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Property Insights & Reports</h2>

      {/* Hero Banners */}
      {banners.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Featured Reports</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {banners.map((banner) => (
              <div
                key={banner._id}
                className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => banner.link && window.open(banner.link, '_blank')}
              >
                <img
                  src={banner.image?.cdn_url || banner.image?.url}
                  alt={banner.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h4 className="text-white font-semibold text-lg">{banner.title}</h4>
                  {banner.subtitle && (
                    <p className="text-white/90 text-sm mt-1">{banner.subtitle}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Small Banners */}
      {smallBanners.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Insights</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {smallBanners.map((banner) => (
              <div
                key={banner._id}
                className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => banner.link && window.open(banner.link, '_blank')}
              >
                <img
                  src={banner.desktopImage?.cdn_url || banner.desktopImage?.url}
                  alt={banner.title}
                  className="w-full h-32 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                  <h4 className="text-white font-semibold text-sm">{banner.title}</h4>
                  {banner.subtitle && (
                    <p className="text-white/90 text-xs mt-1">{banner.subtitle}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {banners.length === 0 && smallBanners.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No banners available</h3>
          <p className="text-gray-500">Check back later for new property insights and reports.</p>
        </div>
      )}
    </div>
  );
}
