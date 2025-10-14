import React, { useState } from "react";

export default function PriceTrendsCompare({
  duration,
  Charts,
  seriesMap,
  seriesLoading,
  selectedCities,
  setCompareMode,
  cityImages = {},
}) {
  const hasSeries = seriesMap && Object.keys(seriesMap).length > 0;
  const [imageErrors, setImageErrors] = useState({});
  
  const chartColors = [
    "#ef4444", "#0ea5e9", "#10b981", "#f59e0b", "#8b5cf6", 
    "#ec4899", "#06b6d4", "#84cc16", "#f97316", "#6366f1"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8 pl-4 md:pl-[276px] lg:pl-[276px] xl:pl-[276px]">
        {/* Enhanced Header */}
        <header className="mb-8 lg:mb-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tight bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
                Compare Cities
              </h1>
              <p className="text-lg text-gray-600 font-medium">
                Analyze property trends across selected cities
              </p>
            </div>
            <button 
              onClick={() => setCompareMode(false)} 
              className="px-6 py-3 rounded-2xl border-2 border-gray-300 bg-white hover:bg-gray-50 text-lg font-semibold text-gray-700 hover:text-gray-900 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Close Comparison
            </button>
          </div>
        </header>

        {/* Enhanced Chart Section */}
        <section className="bg-white border-2 border-gray-200 rounded-3xl p-8 shadow-2xl mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-1 h-8 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></div>
              <h2 className="text-2xl font-bold text-gray-800">Price Trends Analysis</h2>
            </div>
            <div className="px-4 py-2 bg-blue-50 text-blue-700 rounded-xl font-semibold">
              Duration: {duration}
            </div>
          </div>
          
        {Charts && hasSeries ? (
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100">
              <div style={{ width: '100%', height: 400 }}>
            <Charts.ResponsiveContainer>
                  <Charts.LineChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <Charts.CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <Charts.XAxis 
                      dataKey="x" 
                      tick={{ fontSize: 14, fill: '#6b7280' }} 
                      axisLine={{ stroke: '#d1d5db' }}
                    />
                    <Charts.YAxis 
                      tick={{ fontSize: 14, fill: '#6b7280' }} 
                      axisLine={{ stroke: '#d1d5db' }}
                    />
                    <Charts.Tooltip 
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '2px solid #e5e7eb',
                        borderRadius: '12px',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                      }}
                    />
                    <Charts.Legend 
                      wrapperStyle={{ paddingTop: '20px' }}
                    />
                {selectedCities.map((cname, idx) => (
                  <Charts.Line
                    key={cname}
                    type="monotone"
                    data={seriesMap[cname]}
                    dataKey="y"
                    name={cname}
                        stroke={chartColors[idx % chartColors.length]}
                        strokeWidth={3}
                        dot={{ fill: chartColors[idx % chartColors.length], strokeWidth: 2, r: 6 }}
                        activeDot={{ r: 8, stroke: chartColors[idx % chartColors.length], strokeWidth: 2 }}
                  />
                ))}
              </Charts.LineChart>
            </Charts.ResponsiveContainer>
              </div>
          </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedCities.map((cname, idx) => (
                <div key={cname} className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative">
                      <span className="inline-flex w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-lg ring-4 ring-white">
                        {!imageErrors[cname] ? (
                          <img
                            alt={cname}
                            src={cityImages?.[cname] || ''}
                            onError={() => setImageErrors((prev) => ({ ...prev, [cname]: true }))}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 text-gray-600">
                            <span className="text-sm text-center p-2 font-medium">
                              {cname}
                            </span>
                          </div>
                        )}
                      </span>
                      <div 
                        className="absolute -top-1 -right-1 w-6 h-6 rounded-full border-2 border-white"
                        style={{ backgroundColor: chartColors[idx % chartColors.length] }}
                      ></div>
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-gray-900">{cname}</h3>
                      <p className="text-sm text-gray-600">Property Trends</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <svg viewBox="0 0 200 80" className="w-full h-20">
                      <defs>
                        <linearGradient id={`gradient-${idx}`} x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor={chartColors[idx % chartColors.length]} stopOpacity="0.3"/>
                          <stop offset="100%" stopColor={chartColors[idx % chartColors.length]} stopOpacity="0.1"/>
                        </linearGradient>
                      </defs>
                      <path 
                        d="M10,70 L40,50 L70,55 L100,35 L130,40 L160,25 L190,20" 
                        fill="none" 
                        stroke={chartColors[idx % chartColors.length]} 
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path 
                        d="M10,70 L40,50 L70,55 L100,35 L130,40 L160,25 L190,20 L190,80 L10,80 Z" 
                        fill={`url(#gradient-${idx})`}
                      />
                    </svg>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-600 font-medium">
                        {seriesLoading ? 'Loading trend…' : 'Chart preview'}
                      </div>
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: chartColors[idx % chartColors.length] }}
                        ></div>
                        <span className="text-xs font-semibold text-gray-700">Trend Line</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Enhanced City Cards Summary */}
        <section className="bg-white border-2 border-gray-200 rounded-3xl p-8 shadow-2xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-emerald-600 to-green-600 rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-800">Selected Cities Summary</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {selectedCities.map((cname, idx) => (
              <div key={cname} className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative">
                    <span className="inline-flex w-14 h-14 rounded-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-lg ring-4 ring-white">
                      {!imageErrors[cname] ? (
                        <img
                          alt={cname}
                          src={cityImages?.[cname] || ''}
                          onError={() => setImageErrors((prev) => ({ ...prev, [cname]: true }))}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 text-gray-600">
                          <span className="text-sm text-center p-2 font-medium">
                            {cname}
                          </span>
                        </div>
                      )}
                    </span>
                    <div 
                      className="absolute -top-1 -right-1 w-6 h-6 rounded-full border-2 border-white"
                      style={{ backgroundColor: chartColors[idx % chartColors.length] }}
                    ></div>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-700 transition-colors">
                      {cname}
                    </h3>
                    <p className="text-sm text-gray-600">In comparison</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Trend Color:</span>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: chartColors[idx % chartColors.length] }}
                      ></div>
                      <span className="font-medium text-gray-700">
                        {chartColors[idx % chartColors.length]}
                  </span>
                    </div>
                  </div>
                  
                  <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-1000 group-hover:w-full"
                      style={{ 
                        width: `${Math.random() * 100}%`,
                        backgroundColor: chartColors[idx % chartColors.length] 
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
      </section>
      </div>
    </div>
  );
}