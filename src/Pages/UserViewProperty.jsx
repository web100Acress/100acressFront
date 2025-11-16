import React, { useState, useEffect, useRef } from "react";
// import Footer from "../Components/Actual_Components/Footer";
import axios from "axios";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { getApiBase } from "../config/apiBase";
import CrimsonEleganceFooter from "../Components/Footer/CrimsonEleganceFooter";
// import Nav from "../aadharhomes/Nav";

const UserViewProperty = () => {
  const [userViewProperty, setUserViewProperty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { id: routeUserId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const userId = routeUserId || localStorage.getItem("mySellerId");
  const pollRef = useRef(null);
  
  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");
      const base = getApiBase();
      const res = await axios.get(`${base}/postPerson/propertyView/${userId}`);
      const list = res?.data?.data?.postProperty || [];
      setUserViewProperty(list);
    } catch (error) {
      console.log(error?.response || error);
      setError("Failed to load your properties. Please try again.");
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Refetch when tab gains focus or becomes visible (e.g., after editing)
  useEffect(() => {
    const onFocus = () => fetchData();
    const onVisibility = () => { if (!document.hidden) fetchData(); };
    window.addEventListener('focus', onFocus);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      window.removeEventListener('focus', onFocus);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  // Cross-tab real-time update via BroadcastChannel + storage fallback
  useEffect(() => {
    let channel;
    const onStorage = (e) => {
      if (e.key === 'property-updated') {
        fetchData();
      }
    };
    try {
      channel = new BroadcastChannel('property-updates');
      channel.onmessage = (ev) => {
        if (ev && ev.data && String(ev.data).includes('property:updated')) {
          fetchData();
        }
      };
    } catch {}
    window.addEventListener('storage', onStorage);
    return () => {
      try { if (channel) channel.close(); } catch {}
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  // Light polling for near real-time updates
  useEffect(() => {
    // Poll every 15s; cleared on unmount
    pollRef.current = setInterval(() => {
      fetchData();
    }, 15000);
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, []);

  // Optional backend-driven real-time via SSE
  useEffect(() => {
    // Support both Vite (import.meta.env.VITE_*) and CRA (process.env.REACT_APP_*) without throwing in the browser
    const base = (
      (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_PROPERTY_UPDATES_URL) ||
      (typeof process !== 'undefined' && process.env && process.env.REACT_APP_PROPERTY_UPDATES_URL) ||
      ''
    ); // e.g. https://api.example.com/sse/property-updates
    if (!base || !userId) return;
    let es;
    try {
      es = new EventSource(`${base}?userId=${encodeURIComponent(userId)}`);
      es.onmessage = () => fetchData();
      es.onerror = () => { /* silently ignore and let polling/focus handle */ };
    } catch {}
    return () => { try { if (es) es.close(); } catch {} };
  }, [userId]);

  return (
    <div style={{ overflowX: "hidden" }}>
      <section className="flex flex-col bg-white ">
        {/* Page heading */}
        <div className="w-full max-w-screen-xl mx-auto px-4 md:px-10 pt-20 md:pt-28 text-center">
          <div className="flex items-center justify-center gap-3">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">My Properties</h1>
            <button
              type="button"
              onClick={fetchData}
              title="Refresh"
              className="hidden sm:inline-flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200 w-9 h-9"
            >
              ⟳
            </button>
          </div>
          <div className="mt-3 flex justify-center">
            <div className="h-1 w-16 rounded-full bg-gradient-to-r from-red-600 to-rose-500" />
          </div>
          <p className="text-sm md:text-base text-gray-500 mt-3">Manage and edit the properties you have listed.</p>
          {!loading && (
            <p className="text-xs md:text-sm text-gray-400 mt-1">Total: {userViewProperty.length}</p>
          )}
        </div>

        {/* Grid */}
        <div className="grid max-w-md grid-cols-1 p-4 sm:max-w-lg md:max-w-screen-xl md:grid-cols-2 md:px-10 lg:grid-cols-4 sm:gap-3 lg:gap-5 mx-auto">
          {loading && (
            <>
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse bg-white rounded-xl shadow-sm border overflow-hidden">
                  <div className="h-40 bg-gray-200" />
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                    <div className="h-8 bg-gray-200 rounded w-2/3 mt-3" />
                  </div>
                </div>
              ))}
            </>
          )}
          {!!error && (
            <div className="col-span-full text-center py-4 text-red-600">{error}</div>
          )}
          {!loading && !error && userViewProperty.length === 0 && (
            <div className="col-span-full">
              <div className="flex flex-col items-center justify-center border border-dashed rounded-xl py-16 bg-gray-50 text-center">
                <div className="text-3xl mb-2">🏠</div>
                <h2 className="text-lg font-semibold text-gray-800">No properties yet</h2>
                <p className="text-sm text-gray-500 mt-1">When you add properties, they will appear here.</p>
                <button
                  type="button"
                  onClick={() => navigate('/userdashboard/')}
                  className="mt-4 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-red-600 to-rose-500 px-5 py-2.5 text-white text-sm font-semibold shadow-md shadow-red-600/20 hover:opacity-95"
                >
                  Go to Dashboard
                </button>
              </div>
            </div>
          )}
          {userViewProperty.map((item, index) => {
            const pUrl = item.projectName ? item.projectName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') : item._id;
            return (
              <Link key={item?._id || index}>
                <article
                  className="mb-4 overflow-hidden rounded-xl border text-gray-700 shadow-lg hover:shadow-xl duration-300 ease-in-out bg-gradient-to-br from-white to-gray-50"
                >
                  {item && item.frontImage && (
                    <div className="relative">
                      <img
                        src={item.frontImage.url}
                        alt={item.projectName || 'Property'}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${item.verify === 'verified' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'}`}>
                          {item.verify === 'verified' ? 'Approved' : 'Pending'}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="p-4">
                    <div className="pb-2">
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 hover:text-red-600 duration-300 ease-in-out mb-1">
                        {item.projectName}
                      </h3>
                      <p className="text-sm font-medium text-gray-600 mb-2">
                        {item.city}, <span className="font-bold text-gray-800">{item.state}</span>
                      </p>
                      <div className="flex flex-wrap gap-2 text-xs font-semibold text-gray-700">
                        <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-200 font-bold">🏠 {item.propertyType || 'N/A'}</span>
                        <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full border border-green-200 font-bold">💰 {item.price ? `₹${item.price}` : 'N/A'}</span>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {item.verify === 'verified' && (
                          <button
                            type="button"
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigate(`/buy-properties/${pUrl}/${item._id}`); }}
                            className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs md:text-sm px-3 py-2 flex items-center gap-1"
                          >
                            View on Website
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigate('/usereditproperty', { state: { property: item } }); }}
                          className="text-white bg-gray-800 hover:bg-gray-900 focus:ring-2 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-xs md:text-sm px-3 py-2"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </section>

      <CrimsonEleganceFooter />
    </div>
  );
};

export default UserViewProperty;
