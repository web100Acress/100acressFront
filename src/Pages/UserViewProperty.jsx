import React, { useState, useEffect, useRef, useMemo } from "react";
import axios from "axios";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { getApiBase } from "../config/apiBase";
import CrimsonEleganceFooter from "../Home/Footer/CrimsonEleganceFooter";
import showToast from "../Utils/toastUtils";
import { 
  LayoutDashboard, PlusCircle, RefreshCw, Search, 
  Home, CheckCircle2, Clock, Eye, Edit3, MapPin
} from "lucide-react";

const LISTING_STATUS_OPTIONS = [
  { value: "available", label: "Available" },
  { value: "sold", label: "Sold" },
  { value: "rented", label: "Rented" },
  { value: "withdrawn", label: "Withdrawn" },
];

const UserViewProperty = () => {
  const [userViewProperty, setUserViewProperty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [updatingId, setUpdatingId] = useState(null);
  
  const { id: routeUserId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const userId = routeUserId || localStorage.getItem("mySellerId");
  const routeFilter = location.state?.filter || "all";
  const isFetchingRef = useRef(false);

  const fetchData = async (isSilent = false) => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;
    try {
      if (!isSilent) setLoading(true);
      const base = getApiBase();
      const res = await axios.get(`${base}/postPerson/propertyView/${userId}`);
      setUserViewProperty(res?.data?.data?.postProperty || []);
    } catch (error) {
      showToast.error("Sync failed");
    } finally {
      setLoading(false);
      isFetchingRef.current = false;
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => fetchData(true), 60000);
    return () => clearInterval(interval);
  }, []);

  // Filter Logic - Merged Category + Search Filtration
  const filteredProperties = useMemo(() => {
    let list = userViewProperty;

    // 1. Category Filter (From Dashboard)
    if (routeFilter === "published") list = list.filter(p => p.verify === "verified");
    else if (routeFilter === "under_review") list = list.filter(p => p.verify !== "verified");
    else if (routeFilter === "sell") list = list.filter(p => p.propertyLooking === "Sell");
    else if (routeFilter === "rent") list = list.filter(p => p.propertyLooking === "rent");

    // 2. Deep Search Filter
    if (!search.trim()) return list;
    const query = search.toLowerCase();
    return list.filter(item => 
      item.propertyName?.toLowerCase().includes(query) ||
      item.projectName?.toLowerCase().includes(query) ||
      item.city?.toLowerCase().includes(query) ||
      item.state?.toLowerCase().includes(query) ||
      item.listingStatus?.toLowerCase().includes(query)
    );
  }, [userViewProperty, routeFilter, search]);

  const updatePropertyStatus = async (propertyId, payload) => {
    setUpdatingId(propertyId);
    try {
      const base = getApiBase();
      const form = new FormData();
      Object.entries(payload).forEach(([k, v]) => form.append(k, v));
      await axios.post(`${base}/postPerson/propertyoneUserUpdate/${propertyId}`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      showToast.success("Status Synchronized");
      fetchData(true);
    } catch (err) {
      showToast.error("Update failed");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="max-w-screen-2xl mx-auto px-3 md:px-10 pt-20 pb-12">
        
        {/* Compact Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <h1 className="text-xl md:text-2xl font-black text-slate-900 flex items-center gap-2">
              <LayoutDashboard className="text-red-600" size={24} /> 
              Property Manager
            </h1>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1">
              Showing {filteredProperties.length} listings
            </p>
          </div>

          <div className="flex items-center gap-2">
             <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Filter name, city..." 
                  className="w-full pl-9 pr-3 py-2 text-xs border-none rounded-lg bg-white shadow-sm ring-1 ring-slate-200 focus:ring-2 focus:ring-red-500 outline-none"
                />
             </div>
             <button onClick={() => fetchData()} className="p-2 bg-white ring-1 ring-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
                <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
             </button>
             <button onClick={() => navigate("/userdashboard")} className="p-2 bg-slate-900 text-white rounded-lg hover:bg-black transition-all">
                <PlusCircle size={16} />
             </button>
          </div>
        </div>

        {/* Small Property Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {loading ? (
             [...Array(10)].map((_, i) => (
              <div key={i} className="animate-pulse bg-slate-200 rounded-xl h-64" />
            ))
          ) : filteredProperties.map((item) => {
            const name = item.propertyName || item.projectName || "Property";
            const isDisabled = !!item.isDisabled;

            return (
              <div key={item._id} className={`bg-white rounded-xl border border-slate-200 overflow-hidden transition-all hover:shadow-md ${isDisabled ? 'opacity-60' : ''}`}>
                
                {/* Compact Thumbnail */}
                <div className="relative h-28 md:h-32">
                  <img 
                    src={typeof item.frontImage === "string" ? item.frontImage : item.frontImage?.url || "https://placehold.co/400x300"} 
                    alt={name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 right-2 flex justify-between">
                     <span className={`text-[9px] font-black px-1.5 py-0.5 rounded shadow-sm ${item.verify === "verified" ? 'bg-green-500 text-white' : 'bg-orange-500 text-white'}`}>
                        {item.verify === "verified" ? 'Live' : 'Review'}
                     </span>
                     <span className="bg-black/50 backdrop-blur-md text-white text-[9px] px-1.5 py-0.5 rounded font-bold">
                        ₹{(Number(item.price)/100000).toFixed(1)}L
                     </span>
                  </div>
                </div>

                {/* Compact Details */}
                <div className="p-2.5 space-y-2">
                  <div className="min-h-[32px]">
                    <h3 className="text-xs font-bold text-slate-800 line-clamp-1 leading-tight">{name}</h3>
                    <p className="text-[10px] text-slate-400 flex items-center gap-0.5 truncate">
                      <MapPin size={10} /> {item.city}
                    </p>
                  </div>

                  {/* Efficient Dropdown Box */}
                  <div className="space-y-1.5 bg-slate-50 p-1.5 rounded-lg border border-slate-100">
                    <select
                      value={item.listingStatus || "available"}
                      onChange={(e) => updatePropertyStatus(item._id, { listingStatus: e.target.value })}
                      disabled={updatingId === item._id}
                      className="w-full bg-white text-[10px] font-bold py-1 px-1 rounded border border-slate-200 outline-none focus:ring-1 focus:ring-red-500"
                    >
                      {LISTING_STATUS_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                    </select>
                    
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={isDisabled} 
                        onChange={(e) => updatePropertyStatus(item._id, { isDisabled: e.target.checked })}
                        className="w-3 h-3 rounded text-red-600 focus:ring-0" 
                      />
                      <span className="text-[9px] font-bold text-slate-500">Hide Listing</span>
                    </label>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-1.5 pt-1">
                    <button 
                      onClick={() => navigate("/usereditproperty", { state: { property: item } })}
                      className="flex-1 py-1.5 bg-slate-100 text-slate-700 text-[10px] font-bold rounded-md hover:bg-slate-200 transition-colors flex items-center justify-center gap-1"
                    >
                      <Edit3 size={10} /> Edit
                    </button>
                    {item.verify === "verified" && (
                      <button 
                        onClick={() => {
                          const pUrl = (item.projectName || item.propertyName || "").toLowerCase().replace(/[^a-z0-9]+/g, "-");
                          navigate(`/buy-properties/${pUrl}/${item._id}`);
                        }}
                        className="p-1.5 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
                      >
                        <Eye size={12} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <CrimsonEleganceFooter />
    </div>
  );
};

export default UserViewProperty;