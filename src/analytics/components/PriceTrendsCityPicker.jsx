import React from "react";

export default function PriceTrendsCityPicker({
  compareMode,
  setCompareMode,
  selectedCities,
  setSelectedCities,
  cityQuery,
  setCityQuery,
  visibleCities,
  cityImages,
  pickerLoading,
  onChooseCity,
}) {
  const toggleCitySelect = (cname) => {
    setSelectedCities((list) => list.includes(cname) ? list.filter(c=>c!==cname) : [...list, cname]);
  };

  return (
    <>
      <header className="mb-6 flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Select a city</h1>
          <p className="text-gray-600">To check property rates & price trends</p>
        </div>
        <div className="flex items-center gap-2">
          <label className="inline-flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" checked={compareMode} onChange={(e)=>{ setCompareMode(e.target.checked); setSelectedCities([]); }} /> Compare cities
          </label>
          {compareMode && (
            <button disabled={selectedCities.length<2} onClick={()=>{ onChooseCity(null, true); }} className={`px-3 py-2 rounded-lg border ${selectedCities.length<2 ? 'opacity-50 cursor-not-allowed' : 'bg-gray-900 text-white border-gray-900'}`}>Compare</button>
          )}
        </div>
      </header>
      <div className="mb-3 flex items-center gap-2">
        <input value={cityQuery} onChange={(e)=>setCityQuery(e.target.value)} className="border rounded-lg px-3 py-2 text-sm w-full max-w-md" placeholder="Search city..." />
      </div>
      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-5 mb-8">
        {pickerLoading
          ? Array.from({length:10}).map((_,i)=> (
              <div key={i} className="bg-white border rounded-xl p-4 animate-pulse">
                <div className="w-16 h-16 rounded-full bg-gray-200 mx-auto" />
                <div className="mt-3 h-3 bg-gray-200 rounded" />
              </div>
            ))
          : visibleCities.map((cname) => (
          <button key={cname} onClick={() => compareMode ? toggleCitySelect(cname) : onChooseCity(cname, false)} className={`bg-white border rounded-xl p-4 text-left hover:shadow-md transition-shadow flex flex-col items-center gap-3 ${compareMode && selectedCities.includes(cname) ? 'ring-2 ring-blue-500' : ''}`}>
            <span className="inline-flex w-16 h-16 rounded-full overflow-hidden bg-gray-100">
              <img
                alt={cname}
                loading="lazy"
                src={cityImages[cname] || "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=300&q=80"}
                onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=300&q=80'; }}
                className="w-full h-full object-cover"
              />
            </span>
            <span className="font-semibold text-sm text-gray-900">Property Rates in {cname}</span>
            {compareMode && (
              <label className="inline-flex items-center gap-2 text-xs text-gray-700">
                <input type="checkbox" readOnly checked={selectedCities.includes(cname)} /> Select
              </label>
            )}
          </button>
        ))}
      </section>
    </>
  );
}
