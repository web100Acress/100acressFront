import React, { useMemo, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getApiBase } from "../../config/apiBase";
import InsightsSidebar from "../components/InsightsSidebar";
import LocationPrompt from "../components/LocationPrompt";
import { mapCoordsToCity } from "../components/LocationContext";

// MVP scaffold: simple filters + mock widgets. Replace with real charts later.
export default function MarketAnalytics() {
  const location = useLocation();
  const navigate = useNavigate();
  const qp = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const initialCity = qp.get('city') || "";
  const [city, setCity] = useState(initialCity || "");
  const [locality, setLocality] = useState("");
  const [project, setProject] = useState("");
  const [period, setPeriod] = useState("12m");
  const [loading, setLoading] = useState(false);
  const [live, setLive] = useState({ priceTrends: null, rentalYield: null, launches: null, demandSupply: null });
  const [showCityPicker, setShowCityPicker] = useState(!initialCity);
  // Lazy-loaded Recharts components (optional)
  const [Charts, setCharts] = useState(null);

  const mock = useMemo(() => ({
    priceTrends: [
      { month: "Jan", ppsf: 9500 },
      { month: "Feb", ppsf: 9650 },
      { month: "Mar", ppsf: 9800 },
      { month: "Apr", ppsf: 9920 },
      { month: "May", ppsf: 10050 },
    ],
    rentalYield: [
      { locality: "Sector 65", yield: 4.1 },
      { locality: "Golf Course Ext.", yield: 3.7 },
      { locality: "Dwarka Expy.", yield: 4.4 },
    ],
    launches: [
      { date: "2025-08-01", name: "Project A", area: "Sector 79" },
      { date: "2025-07-10", name: "Project B", area: "Sector 63" },
    ],
    demandSupply: [
      { locality: "Sector 79", demandIdx: 78, supplyIdx: 42 },
      { locality: "Sector 65", demandIdx: 64, supplyIdx: 55 },
    ]
  }), []);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const base = getApiBase();
      const qs = new URLSearchParams({ city, locality, projectId: project, period }).toString();
      const [pt, ry, la, ds] = await Promise.all([
        fetch(`${base}/analytics/price-trends?${qs}`).then(r=>r.json()).catch(()=>null),
        fetch(`${base}/analytics/rental-yield?${new URLSearchParams({ city, locality }).toString()}`).then(r=>r.json()).catch(()=>null),
        fetch(`${base}/analytics/launches?${new URLSearchParams({ city }).toString()}`).then(r=>r.json()).catch(()=>null),
        fetch(`${base}/analytics/demand-supply?${new URLSearchParams({ city }).toString()}`).then(r=>r.json()).catch(()=>null),
      ]);
      setLive({
        priceTrends: pt && pt.success ? pt.data : null,
        rentalYield: ry && ry.success ? ry.data : null,
        launches: la && la.success ? la.data : null,
        demandSupply: ds && ds.success ? ds.data : null,
      });
    } catch (_) {
      // ignore, will fallback to mock
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!showCityPicker) fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showCityPicker, city]);

  // On mount, if coords exist in localStorage, map to city and refetch
  useEffect(() => {
    try {
      const s = localStorage.getItem('geoCoords');
      if (s) {
        const c = JSON.parse(s);
        if (c && typeof c.lat === 'number' && typeof c.lng === 'number') {
          const mapped = mapCoordsToCity(c);
          if (!initialCity && mapped && !city) {
            setCity(mapped);
            setShowCityPicker(false);
            // Update URL
            const params = new URLSearchParams(location.search);
            params.set('city', mapped);
            navigate({ search: params.toString() }, { replace: true });
          }
        }
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Dynamically import Recharts so app doesn't crash if package isn't installed yet.
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const mod = await import('recharts');
        if (mounted) setCharts(mod);
      } catch (_) {
        // Recharts not installed; keep fallback lists/tables
      }
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <React.Fragment>
      <InsightsSidebar />
      <LocationPrompt />
      <div className="max-w-screen-xl mx-auto px-4 md:px-6 md:pl-[260px]" style={{ marginTop: 'calc(var(--nav-h, 64px) + 16px)' }}>
        {!showCityPicker ? (
          <header className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Market Analytics</h1>
            <p className="text-gray-600">MVP – Price Trends, Rental Yield, Demand vs Supply and New Launches (mock)</p>
          </header>
        ) : (
          <header className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Select a city</h1>
            <p className="text-gray-600">To check property rates & price trends</p>
          </header>
        )}

        {showCityPicker ? (
          <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-5 mb-8">
            {[
              "Bangalore","Mumbai","Delhi","Pune","Chennai",
              "Hyderabad","Kolkata","Navi Mumbai","Gurgaon","Noida",
            ].map((cname) => (
              <button
                key={cname}
                onClick={() => {
                  setCity(cname);
                  setShowCityPicker(false);
                  const params = new URLSearchParams(location.search);
                  params.set('city', cname);
                  navigate({ search: params.toString() }, { replace: true });
                }}
                className="bg-white border rounded-xl p-4 text-left hover:shadow-md transition-shadow flex flex-col items-center gap-3"
              >
                <span className="inline-flex w-16 h-16 rounded-full overflow-hidden bg-gray-100">
                  <img alt={cname} src={`https://source.unsplash.com/80x80/?city,${encodeURIComponent(cname)}`} className="w-full h-full object-cover" />
                </span>
                <span className="font-semibold text-sm text-gray-900">Property Rates in {cname}</span>
              </button>
            ))}
          </section>
        ) : null}

        {!showCityPicker && (
        <section className="flex flex-wrap gap-3 items-center bg-white border rounded-xl p-4 shadow-sm mb-6">
          <select value={city} onChange={(e)=>setCity(e.target.value)} className="border rounded-lg px-3 py-2">
            <option>Gurgaon</option>
            <option>Noida</option>
            <option>Dwarka Expressway</option>
          </select>
          <input value={locality} onChange={(e)=>setLocality(e.target.value)} placeholder="Locality" className="border rounded-lg px-3 py-2" />
          <input value={project} onChange={(e)=>setProject(e.target.value)} placeholder="Project" className="border rounded-lg px-3 py-2" />
          <select value={period} onChange={(e)=>setPeriod(e.target.value)} className="border rounded-lg px-3 py-2">
            <option value="6m">Last 6 months</option>
            <option value="12m">Last 12 months</option>
            <option value="24m">Last 24 months</option>
          </select>
          <button className="ml-auto bg-red-600 text-white px-4 py-2 rounded-lg" onClick={fetchAll} disabled={loading}>
            {loading ? 'Loading...' : 'Apply'}
          </button>
        </section>
        )}

        {!showCityPicker && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border rounded-xl p-4 shadow-sm">
            <h2 className="font-semibold mb-2">Price Trends (₹/sqft)</h2>
            {Charts ? (
              <div style={{ width: '100%', height: 260 }}>
                <Charts.ResponsiveContainer>
                  <Charts.LineChart data={(live.priceTrends || mock.priceTrends)} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                    <Charts.CartesianGrid strokeDasharray="3 3" />
                    <Charts.XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <Charts.YAxis tick={{ fontSize: 12 }} />
                    <Charts.Tooltip formatter={(v)=>`₹${Number(v).toLocaleString()}`} />
                    <Charts.Line type="monotone" dataKey="ppsf" stroke="#dc2626" strokeWidth={2} dot={false} />
                  </Charts.LineChart>
                </Charts.ResponsiveContainer>
              </div>
            ) : (
              <>
                <ul className="text-sm text-gray-700 space-y-1">
                  {(live.priceTrends || mock.priceTrends).map((r)=> (
                    <li key={r.month} className="flex justify-between"><span>{r.month}</span><span>₹{r.ppsf.toLocaleString()}</span></li>
                  ))}
                </ul>
                <div className="text-xs text-gray-500 mt-2">Charts will render automatically once Recharts is installed.</div>
              </>
            )}
          </div>

          <div className="bg-white border rounded-xl p-4 shadow-sm">
            <h2 className="font-semibold mb-2">Rental Yield</h2>
            {Charts ? (
              <div style={{ width: '100%', height: 260 }}>
                <Charts.ResponsiveContainer>
                  <Charts.BarChart data={(live.rentalYield || mock.rentalYield).slice(0,10)} margin={{ top: 10, right: 20, left: -10, bottom: 40 }}>
                    <Charts.CartesianGrid strokeDasharray="3 3" />
                    <Charts.XAxis dataKey="locality" angle={-35} textAnchor="end" height={60} tick={{ fontSize: 11 }} />
                    <Charts.YAxis tickFormatter={(v)=>`${v}%`} tick={{ fontSize: 12 }} />
                    <Charts.Tooltip formatter={(v)=>`${Number(v).toFixed(2)}%`} />
                    <Charts.Bar dataKey="yield" fill="#0ea5e9" radius={[4,4,0,0]} />
                  </Charts.BarChart>
                </Charts.ResponsiveContainer>
              </div>
            ) : (
              <>
                <ul className="text-sm text-gray-700 space-y-1">
                  {(live.rentalYield || mock.rentalYield).map((r)=> (
                    <li key={r.locality} className="flex justify-between"><span>{r.locality}</span><span>{Number(r.yield).toFixed(2)}%</span></li>
                  ))}
                </ul>
              </>
            )}
          </div>

          <div className="bg-white border rounded-xl p-4 shadow-sm">
            <h2 className="font-semibold mb-2">Demand vs Supply</h2>
            {Charts ? (
              <div style={{ width: '100%', height: 260 }}>
                <Charts.ResponsiveContainer>
                  <Charts.BarChart data={(live.demandSupply || mock.demandSupply).slice(0,12)} margin={{ top: 10, right: 20, left: -10, bottom: 40 }}>
                    <Charts.CartesianGrid strokeDasharray="3 3" />
                    <Charts.XAxis dataKey="locality" angle={-35} textAnchor="end" height={60} tick={{ fontSize: 11 }} />
                    <Charts.YAxis tick={{ fontSize: 12 }} />
                    <Charts.Tooltip />
                    <Charts.Bar dataKey="demandIdx" fill="#ef4444" name="Demand" radius={[4,4,0,0]} />
                    <Charts.Bar dataKey="supplyIdx" fill="#22c55e" name="Supply" radius={[4,4,0,0]} />
                  </Charts.BarChart>
                </Charts.ResponsiveContainer>
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead><tr className="text-left"><th>Locality</th><th>Demand</th><th>Supply</th></tr></thead>
                <tbody>
                  {(live.demandSupply || mock.demandSupply).map((r)=> (
                    <tr key={r.locality}><td>{r.locality}</td><td>{r.demandIdx}</td><td>{r.supplyIdx}</td></tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="bg-white border rounded-xl p-4 shadow-sm">
            <h2 className="font-semibold mb-2">New Launches</h2>
            <ul className="text-sm text-gray-700 space-y-1">
              {(live.launches || mock.launches).map((l, i)=> (
                <li key={i} className="flex justify-between"><span>{l.date}</span><span>{l.name} – {l.area}</span></li>
              ))}
            </ul>
          </div>
        </div>
        )}
      </div>
    </React.Fragment>
  );
}
