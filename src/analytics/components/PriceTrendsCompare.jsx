import React from "react";

export default function PriceTrendsCompare({
  duration,
  Charts,
  seriesMap,
  seriesLoading,
  selectedCities,
  setCompareMode,
  cityImages,
}) {
  const hasSeries = seriesMap && Object.keys(seriesMap).length > 0;
  return (
    <>
      <header className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Compare cities</h1>
        <button onClick={()=> setCompareMode(false)} className="px-3 py-2 rounded border">Close compare</button>
      </header>
      <section className="bg-white border rounded-xl p-4 shadow-sm mb-6">
        <div className="text-sm text-gray-700 mb-2">Duration: {duration}</div>
        {Charts && hasSeries ? (
          <div style={{ width: '100%', height: 260 }}>
            <Charts.ResponsiveContainer>
              <Charts.LineChart margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <Charts.CartesianGrid strokeDasharray="3 3" />
                <Charts.XAxis dataKey="x" tick={{ fontSize: 12 }} />
                <Charts.YAxis tick={{ fontSize: 12 }} />
                <Charts.Tooltip />
                {selectedCities.map((cname, idx) => (
                  <Charts.Line
                    key={cname}
                    type="monotone"
                    data={seriesMap[cname]}
                    dataKey="y"
                    name={cname}
                    stroke={["#ef4444","#0ea5e9","#10b981","#f59e0b","#8b5cf6"][idx % 5]}
                    strokeWidth={2}
                    dot={false}
                  />
                ))}
              </Charts.LineChart>
            </Charts.ResponsiveContainer>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {selectedCities.map((cname)=> (
              <div key={cname} className="bg-gray-50 border rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-flex w-10 h-10 rounded-full overflow-hidden bg-gray-100">
                    <img alt={cname} src={cityImages[cname] || 'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=300&q=80'} className="w-full h-full object-cover" />
                  </span>
                  <div className="font-semibold text-gray-900">{cname}</div>
                </div>
                <svg viewBox="0 0 180 60" className="w-full h-16">
                  <path d="M5,55 L35,40 L65,45 L95,30 L125,35 L155,20 L175,15" fill="none" stroke="#0ea5e9" strokeWidth="2" />
                </svg>
                <div className="mt-2 text-xs text-gray-600">{seriesLoading ? 'Loading trend…' : 'Install Recharts for full chart or hook API.'}</div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
