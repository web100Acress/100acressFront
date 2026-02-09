import React from "react";
import PriceTrendsCityPicker from "../Citypeaker/PriceTrendsCityPicker";
import PriceTrendsCompare from "../PriceTrendsCompare";
import { Link, useNavigate } from "react-router-dom";

export default function PriceTrendMobile({
    props // All objects from usePriceTrends
}) {
    const {
        city, showPicker, setShowPicker, duration, setDuration, zone, setZone,
        type, sort, setSort, page, setPage, pageSize,
        loading, localities, totalCount, cityCategories, citiesLoading, pickerLoading,
        compareMode, setCompareMode, compareFlash, selectedCities, setSelectedCities,
        emiPrincipal, setEmiPrincipal, emiRate, setEmiRate, emiYears, setEmiYears,
        seriesMap, Charts, seriesLoading, drawerOpen, drawerAnimating,
        drawerData, activeLocality, alertSubscribed, savedLocality, miniName, setMiniName,
        miniPhone, setMiniPhone, miniSubmitted, setMiniSubmitted, showShareDropdown, setShowShareDropdown,
        toggleSaveLocality, calcEmi, resetFilters, filtered, summary,
        visibleCities, makeSpark, chooseCity, downloadCSV,
        handlePriceAlert, handleShare, openDrawer, closeDrawer
    } = props;

    const navigate = useNavigate();

    return (
        <div className="w-full px-4 mb-20 font-['Inter',sans-serif]">
            {showPicker ? (
                <PriceTrendsCityPicker
                    compareMode={compareMode}
                    setCompareMode={setCompareMode}
                    selectedCities={selectedCities}
                    setSelectedCities={setSelectedCities}
                    pickerLoading={pickerLoading || citiesLoading}
                    cityCategories={cityCategories}
                    onChooseCity={(cname, isCompare) => {
                        if (isCompare) { setShowPicker(false); }
                        else if (cname) { chooseCity(cname); }
                    }}
                />
            ) : (
                <>
                    {compareMode && selectedCities.length >= 2 ? (
                        <div className={`rounded-xl ${compareFlash ? 'ring-2 ring-amber-400 shadow-[0_0_0_4px_rgba(251,191,36,0.35)]' : ''} transition-all duration-500`}>
                            <PriceTrendsCompare
                                duration={duration}
                                Charts={Charts}
                                seriesMap={seriesMap}
                                seriesLoading={seriesLoading}
                                selectedCities={selectedCities}
                                setCompareMode={setCompareMode}
                            />
                        </div>
                    ) : (
                        <>
                            {/* Enhanced Mobile Hero Banner */}
                            <div className="relative w-full h-[32vh] overflow-hidden mb-8 rounded-2xl shadow-2xl border border-gray-100">
                                <img
                                    src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80"
                                    alt="Real Estate Trends"
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/60 to-transparent"></div>

                                <div className="absolute inset-0 flex flex-col justify-center p-7 font-['Outfit',sans-serif]">
                                    <div className="mb-2 inline-flex items-center gap-2">
                                        <div className="w-1 h-5 bg-blue-500 rounded-full"></div>
                                        <span className="text-blue-400 text-[10px] font-black uppercase tracking-[0.2em]">Market Intelligence</span>
                                    </div>
                                    <h1 className="text-2xl font-black text-white leading-[1.1] tracking-tight">
                                        Trends in <br />
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-100 to-indigo-100 italic">{city}</span>
                                    </h1>
                                    <p className="text-[12px] text-gray-300 font-medium mt-3 max-w-[85%] leading-relaxed opacity-95">
                                        Explore live property rates, returns & historical growth analytics.
                                    </p>
                                    <div className="flex gap-3 mt-6">
                                        <button onClick={() => { setShowPicker(true); setCompareMode(false); }} className="px-5 py-2.5 bg-white text-gray-900 font-bold rounded-xl text-[11px] shadow-xl active:scale-95 transition-all uppercase tracking-wider">
                                            Change City
                                        </button>
                                        <button onClick={downloadCSV} className="p-2.5 bg-blue-600 text-white rounded-xl shadow-xl active:scale-95 transition-all">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" strokeWidth="2.5" /></svg>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <header className="mb-6">
                                <div className="flex items-center gap-2 mb-2 font-['Outfit',sans-serif]">
                                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                                        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor"><path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5c-1.4 0-2.5-1.1-2.5-2.5S10.6 6.5 12 6.5s2.5 1.1 2.5 2.5S13.4 11.5 12 11.5z" /></svg>
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900 tracking-tight">Premium Localities</h2>
                                        <p className="text-xs font-medium text-gray-500">Showing top areas in {city}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar font-['Outfit',sans-serif]">
                                    {['recommended', 'price_desc', 'yield_desc'].map(s => (
                                        <button key={s} onClick={() => setSort(s)} className={`whitespace-nowrap px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${sort === s ? 'bg-gray-900 text-white shadow-lg' : 'bg-white border border-gray-100 text-gray-500'}`}>
                                            {s === 'recommended' ? '🔥 Trending' : s === 'price_desc' ? '💎 Premium' : '📈 Returns'}
                                        </button>
                                    ))}
                                </div>
                            </header>
                        </>
                    )}

                    {/* Mobile Bottom Sheet for details */}
                    {drawerOpen && (
                        <>
                            {/* Backdrop for all screen sizes */}
                            <div className={`fixed inset-0 z-40 transition-opacity duration-300 ease-out ${drawerAnimating ? 'opacity-100' : 'opacity-0'}`} style={{ backgroundColor: 'rgba(0,0,0,0.3)' }} onClick={closeDrawer} />
                            {/* Mobile-style bottom sheet for all screen sizes */}
                            <aside className={`fixed bottom-0 left-0 right-0 h-[70vh] sm:h-[75vh] md:h-[80vh] lg:h-[85vh] bg-transparent z-50 overflow-hidden transform transition-transform duration-300 ease-out ${drawerAnimating ? 'translate-y-0' : 'translate-y-full'}`}>
                                <div className="mx-auto w-full h-full max-w-xl sm:max-w-1xl lg:max-w-2xl bg-white shadow-2xl rounded-t-2xl overflow-hidden flex flex-col">
                                    <div className="p-4 border-b flex items-center justify-between relative">
                                        <span className="absolute left-1/2 -top-2 -translate-x-1/2 w-12 h-1.5 bg-gray-300 rounded-full" aria-hidden="true" />
                                        <div>
                                            <div className="text-xs uppercase tracking-wide text-gray-500">Locality</div>
                                            <h3 className="text-lg font-bold text-gray-900">{drawerData?.locality}</h3>
                                            <div className="text-xs text-gray-500">{drawerData?.zone} • {type}</div>
                                        </div>
                                        <button onClick={closeDrawer} className="px-3 py-1.5 rounded-md border text-sm hover:bg-gray-50 inline-flex items-center gap-2" aria-label="Close details">
                                            <svg viewBox="0 0 24 24" className="w-4 h-4" stroke="currentColor" strokeWidth="2" fill="none"><path d="M6 6l12 12M18 6L6 18" /></svg>
                                            Close
                                        </button>
                                    </div>
                                    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-auto">
                                        <div className="grid grid-cols-3 gap-3 sm:gap-4">
                                            <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                                                <div className="text-xs text-gray-500">Price</div>
                                                <div className="text-base sm:text-lg font-semibold">₹{(drawerData?.rate || 0).toLocaleString()}/ sq.ft</div>
                                            </div>
                                            <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                                                <div className="text-xs text-gray-500">5Y Change</div>
                                                <div className="text-base sm:text-lg font-semibold text-emerald-600">▲ {drawerData?.change5y || 0}%</div>
                                            </div>
                                            <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                                                <div className="text-xs text-gray-500">Yield</div>
                                                <div className="text-base sm:text-lg font-semibold">{drawerData?.yield || 0}%</div>
                                            </div>
                                        </div>
                                        <div className="border rounded-xl p-3">
                                            <div className="text-sm font-semibold mb-2">Trend</div>
                                            <svg viewBox="0 0 240 80" className="w-full h-20">
                                                <path d={makeSpark(drawerData?.rate || 0, drawerData?.change5y || 0, 240, 80)} fill="none" stroke="#2563eb" strokeWidth="2" />
                                            </svg>
                                        </div>
                                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                                            <button onClick={() => {
                                                // Check if there's a project URL in the data
                                                if (drawerData?.projectUrl) {
                                                    window.open(drawerData.projectUrl, '_blank');
                                                    closeDrawer();
                                                } else {
                                                    // Fallback to listings if no project URL
                                                    const u = `/listings?city=${encodeURIComponent(city)}&locality=${encodeURIComponent(drawerData?.locality || '')}&zone=${encodeURIComponent(zone)}&type=${encodeURIComponent(type)}`;
                                                    navigate(u);
                                                    closeDrawer();
                                                }
                                            }} className="flex-1 px-4 py-3 rounded-lg border hover:bg-gray-50 text-sm font-medium">View listings</button>
                                            <button onClick={() => {
                                                // Enable compare mode and add current city to selection
                                                setCompareMode(true);
                                                setSelectedCities((list) => list.includes(city) ? list : [...list, city]);
                                                closeDrawer();

                                                // Navigate to city picker with compare mode
                                                setShowPicker(true);
                                                setCompareMode(true);
                                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                            }} className="flex-1 px-4 py-3 rounded-lg border hover:bg-gray-50 text-sm font-medium">Compare this city</button>
                                            <div className="relative">
                                                <button
                                                    onClick={() => setShowShareDropdown(!showShareDropdown)}
                                                    className="flex-1 px-4 py-3 rounded-lg border hover:bg-gray-50 text-sm font-medium flex items-center justify-center gap-2"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                                                    </svg>
                                                    Share
                                                </button>

                                                {showShareDropdown && (
                                                    <div className="share-dropdown absolute top-full mt-2 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[200px]">
                                                        <div className="py-2">
                                                            <button
                                                                onClick={() => handleShare('whatsapp')}
                                                                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3"
                                                            >
                                                                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                                                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.516" />
                                                                </svg>
                                                                WhatsApp
                                                            </button>
                                                            <button
                                                                onClick={() => handleShare('facebook')}
                                                                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3"
                                                            >
                                                                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                                                </svg>
                                                                Facebook
                                                            </button>
                                                            <button
                                                                onClick={() => handleShare('twitter')}
                                                                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3"
                                                            >
                                                                <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                                                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                                                </svg>
                                                                Twitter
                                                            </button>
                                                            <button
                                                                onClick={() => handleShare('linkedin')}
                                                                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3"
                                                            >
                                                                <svg className="w-5 h-5 text-blue-700" fill="currentColor" viewBox="0 0 24 24">
                                                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                                                </svg>
                                                                LinkedIn
                                                            </button>
                                                            <button
                                                                onClick={() => handleShare('email')}
                                                                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3"
                                                            >
                                                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                                </svg>
                                                                Email
                                                            </button>
                                                            <button
                                                                onClick={() => handleShare('copy')}
                                                                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3"
                                                            >
                                                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                                </svg>
                                                                Copy Link
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        {/* Engagement extras */}
                                        <div className="mt-2 grid grid-cols-1 gap-3">
                                            <div className="flex items-center gap-2 text-xs text-gray-700 bg-gray-50 border rounded-lg px-3 py-2">
                                                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
                                                <span><strong>214 buyers</strong> viewed {drawerData?.locality} this week</span>
                                            </div>
                                            <div className="flex flex-wrap gap-2 text-xs">
                                                <span className="px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">Great connectivity</span>
                                                <span className="px-2 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100">High ROI micro-market</span>
                                                <span className="px-2 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-100">Popular rental hub</span>
                                            </div>
                                            <div className="flex items-center justify-between gap-3 border rounded-lg p-3">
                                                <div>
                                                    <div className="text-sm font-semibold">Price alerts</div>
                                                    <div className="text-xs text-gray-600">Get notified if rates change in {drawerData?.locality}</div>
                                                </div>
                                                <button onClick={handlePriceAlert} className={`px-3 py-1.5 rounded-lg text-sm border ${alertSubscribed ? 'bg-gray-900 text-white border-gray-900' : 'bg-white hover:bg-gray-50'}`}>{alertSubscribed ? 'Subscribed' : 'Notify me'}</button>
                                            </div>
                                            <button onClick={() => {
                                                const u = `/projects?city=${encodeURIComponent(city)}&locality=${encodeURIComponent(drawerData?.locality || '')}`;
                                                navigate(u);
                                                closeDrawer();
                                            }} className="w-full px-4 py-3 rounded-lg border bg-gray-900 text-white text-sm font-medium hover:bg-gray-800">Explore projects in {drawerData?.locality}</button>
                                            {/* Limited-time nudge */}
                                            <div className="flex items-center gap-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                                                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M12 8v5h5v2h-7V8z" /></svg>
                                                <span><strong>2 price drops</strong> reported this week in {drawerData?.locality}</span>
                                            </div>
                                            {/* Save locality */}
                                            <button onClick={toggleSaveLocality} className={`w-full px-3 py-2 rounded-lg border text-sm ${savedLocality ? 'bg-blue-600 text-white border-blue-600' : 'bg-white hover:bg-gray-50'}`}>{savedLocality ? 'Saved to watchlist' : 'Save this locality'}</button>
                                            {/* Nearby highlights */}
                                            <div className="flex flex-wrap gap-2 text-xs">
                                                <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700 border">5 mins to Metro</span>
                                                <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700 border">10 mins to Mall</span>
                                                <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700 border">15 mins to IT Park</span>
                                            </div>
                                            {/* Quick callback mini-form */}
                                            <div className="border rounded-xl p-3">
                                                <div className="text-sm font-semibold mb-2">Request a quick callback</div>
                                                <div className="grid grid-cols-1 gap-2">
                                                    <input value={miniName} onChange={(e) => setMiniName(e.target.value)} placeholder="Your name" className="px-3 py-2 rounded-lg border" />
                                                    <input value={miniPhone} onChange={(e) => setMiniPhone(e.target.value)} placeholder="Phone number" className="px-3 py-2 rounded-lg border" />
                                                    <button onClick={() => { setMiniSubmitted(true); }} className="px-3 py-2 rounded-lg border bg-gray-900 text-white text-sm hover:bg-gray-800">{miniSubmitted ? 'We\'ll call you shortly' : 'Request callback'}</button>
                                                </div>
                                            </div>
                                            {/* EMI mini widget */}
                                            <div className="border rounded-xl p-3">
                                                <div className="text-sm font-semibold mb-2">Estimate EMI</div>
                                                <div className="grid grid-cols-3 gap-2 text-xs">
                                                    <div className="col-span-3">
                                                        <label className="block text-gray-600 mb-1">Principal (₹)</label>
                                                        <input type="number" value={emiPrincipal} onChange={(e) => setEmiPrincipal(Number(e.target.value) || 0)} className="w-full px-2 py-1.5 rounded border" />
                                                    </div>
                                                    <div>
                                                        <label className="block text-gray-600 mb-1">Rate %</label>
                                                        <input type="number" step="0.1" value={emiRate} onChange={(e) => setEmiRate(Number(e.target.value) || 0)} className="w-full px-2 py-1.5 rounded border" />
                                                    </div>
                                                    <div>
                                                        <label className="block text-gray-600 mb-1">Years</label>
                                                        <input type="number" value={emiYears} onChange={(e) => setEmiYears(Number(e.target.value) || 0)} className="w-full px-2 py-1.5 rounded border" />
                                                    </div>
                                                    <div className="flex items-end">
                                                        <div className="text-gray-600">/mo</div>
                                                    </div>
                                                </div>
                                                <div className="mt-2 text-lg font-bold">₹{calcEmi(emiPrincipal, emiRate, emiYears).toLocaleString()}</div>
                                            </div>
                                            {/* Testimonials */}
                                            <div className="border rounded-xl p-3">
                                                <div className="text-sm font-semibold mb-2">What buyers say</div>
                                                <div className="space-y-2 text-xs text-gray-700">
                                                    <div className="p-2 rounded bg-gray-50 border">“Good rental demand and clean surroundings.” — Raj, {city}</div>
                                                    <div className="p-2 rounded bg-gray-50 border">“Connectivity is great, prices trending up.” — Asha, {city}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </aside>
                        </>
                    )}

                    {/* Mobile Locality List: Card based or sleek list */}
                    {/* Compact Locality List */}
                    <div className="space-y-3">
                        {loading ? (
                            Array.from({ length: 5 }).map((_, i) => (
                                <div key={i} className="bg-white rounded-2xl p-3 border-2 border-gray-50 flex items-center gap-3 animate-pulse">
                                    <div className="w-11 h-11 bg-gray-100 rounded-xl" />
                                    <div className="flex-1 space-y-1.5">
                                        <div className="h-3 bg-gray-100 rounded w-2/3" />
                                        <div className="h-2 bg-gray-100 rounded w-1/3" />
                                    </div>
                                    <div className="w-14 h-8 bg-gray-100 rounded-lg" />
                                </div>
                            ))
                        ) : (
                            filtered.slice((page - 1) * pageSize, page * pageSize).map((r) => (
                                <div key={r.locality} className={`bg-white rounded-2xl p-3.5 border transition-all active:scale-[0.98] cursor-pointer ${activeLocality === r.locality ? 'border-blue-500 shadow-lg shadow-blue-50/50 bg-blue-50/5' : 'border-gray-100 shadow-sm'}`} onClick={() => openDrawer(r)}>
                                    <div className="flex items-center gap-3.5">
                                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all ${activeLocality === r.locality ? 'bg-blue-600 text-white' : 'bg-gray-50 text-gray-400'}`}>
                                            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5c-1.4 0-2.5-1.1-2.5-2.5S10.6 6.5 12 6.5s2.5 1.1 2.5 2.5S13.4 11.5 12 11.5z" /></svg>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className={`font-bold text-[13px] truncate font-['Outfit',sans-serif] ${activeLocality === r.locality ? 'text-blue-900 border-b border-blue-200/50 inline-block' : 'text-gray-900'}`}>{r.locality}</h3>
                                            <div className="flex items-center gap-2 mt-0.5">
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">{r.zone}</p>
                                                <span className="w-0.5 h-0.5 rounded-full bg-gray-300"></span>
                                                <p className="text-[10px] font-bold text-blue-500/80 uppercase tracking-tight">{type}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[13px] font-black text-gray-900 tracking-tight">₹{(r.rate || 0).toLocaleString()}</p>
                                            <p className={`text-[9px] font-bold flex items-center justify-end gap-0.5 ${r.change5y >= 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
                                                <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 24 24"><path d={r.change5y >= 0 ? "M7 14l5-5 5 5H7z" : "M7 10l5 5 5-5H7z"} /></svg>
                                                {Math.abs(r.change5y || 0)}%
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Compact Pagination */}
                    <div className="py-8 flex items-center justify-center gap-5">
                        <button disabled={page === 1} onClick={() => setPage(p => Math.max(1, p - 1))} className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all ${page === 1 ? 'border-gray-50 text-gray-200' : 'border-gray-200 text-gray-900 active:scale-90 bg-white shadow-sm'}`}>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeWidth="3" /></svg>
                        </button>
                        <span className="text-xs font-black text-gray-900 uppercase tracking-widest bg-gray-100 px-3 py-1.5 rounded-lg border border-gray-200">Pg {page}</span>
                        <button disabled={(page * pageSize) >= (totalCount || 0)} onClick={() => setPage(p => p + 1)} className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all ${(page * pageSize) >= (totalCount || 0) ? 'border-gray-50 text-gray-200' : 'border-gray-200 text-gray-900 active:scale-90 bg-white shadow-sm'}`}>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" strokeWidth="3" /></svg>
                        </button>
                    </div>
                </>
            )}
            <style>{`.no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
        </div>
    );
}
