import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminInsightsSidebar from './AdminInsightsSidebar';

export default function AreaAnalytics() {
  const [selectedCity, setSelectedCity] = useState('delhi');
  const [selectedArea, setSelectedArea] = useState('');
  const [areaData, setAreaData] = useState(null);
  const [comparisonData, setComparisonData] = useState([]);

  const cities = [
    { value: 'delhi', label: 'Delhi NCR' },
    { value: 'mumbai', label: 'Mumbai' },
    { value: 'bangalore', label: 'Bangalore' },
    { value: 'pune', label: 'Pune' },
    { value: 'hyderabad', label: 'Hyderabad' }
  ];

  const areas = {
    delhi: [
      { value: 'gurgaon', label: 'Gurgaon' },
      { value: 'noida', label: 'Noida' },
      { value: 'dwarka', label: 'Dwarka' },
      { value: 'faridabad', label: 'Faridabad' },
      { value: 'ghaziabad', label: 'Ghaziabad' }
    ],
    mumbai: [
      { value: 'andheri', label: 'Andheri' },
      { value: 'bandra', label: 'Bandra' },
      { value: 'powai', label: 'Powai' },
      { value: 'thane', label: 'Thane' },
      { value: 'navimumbai', label: 'Navi Mumbai' }
    ]
  };

  // Mock data for areas
  const mockAreaData = {
    gurgaon: {
      name: 'Gurgaon',
      avgPrice: 9500000,
      priceChange: 12.5,
      rentalYield: 3.2,
      occupancyRate: 87,
      infrastructure: {
        connectivity: 9,
        amenities: 8,
        schools: 9,
        hospitals: 8,
        shopping: 9
      },
      demographics: {
        avgAge: 32,
        avgIncome: 150000,
        workingPopulation: 78,
        families: 65
      },
      trends: [
        { period: 'Last 6 months', growth: 15.2, demand: 'High' },
        { period: 'Last 1 year', growth: 28.7, demand: 'Very High' },
        { period: 'Last 2 years', growth: 45.3, demand: 'Very High' }
      ],
      topLocalities: [
        { name: 'Golf Course Road', avgPrice: 18000000, growth: 18.5 },
        { name: 'Sohna Road', avgPrice: 8500000, growth: 22.1 },
        { name: 'Dwarka Expressway', avgPrice: 12000000, growth: 25.3 }
      ]
    },
    noida: {
      name: 'Noida',
      avgPrice: 7700000,
      priceChange: 8.3,
      rentalYield: 2.8,
      occupancyRate: 82,
      infrastructure: {
        connectivity: 8,
        amenities: 9,
        schools: 8,
        hospitals: 9,
        shopping: 8
      },
      demographics: {
        avgAge: 29,
        avgIncome: 120000,
        workingPopulation: 85,
        families: 72
      },
      trends: [
        { period: 'Last 6 months', growth: 10.1, demand: 'Medium' },
        { period: 'Last 1 year', growth: 18.4, demand: 'High' },
        { period: 'Last 2 years', growth: 32.6, demand: 'High' }
      ],
      topLocalities: [
        { name: 'Sector 75', avgPrice: 9500000, growth: 15.2 },
        { name: 'Sector 150', avgPrice: 8200000, growth: 18.7 },
        { name: 'Greater Noida West', avgPrice: 4500000, growth: 12.8 }
      ]
    }
  };

  useEffect(() => {
    if (selectedArea) {
      setAreaData(mockAreaData[selectedArea]);
      // Mock comparison data
      setComparisonData([
        { area: 'Gurgaon', avgPrice: 9500000, growth: 12.5, yield: 3.2 },
        { area: 'Noida', avgPrice: 7700000, growth: 8.3, yield: 2.8 },
        { area: 'Delhi', avgPrice: 10500000, growth: 6.7, yield: 2.5 }
      ]);
    }
  }, [selectedArea]);

  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(10 - rating);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-[9000] w-full bg-white/80 backdrop-blur border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center font-bold">📍</div>
            <h1 className="text-lg sm:text-xl font-semibold text-gray-800">Area Analytics</h1>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/Admin/dashboard"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 border border-gray-300 hover:bg-gray-50"
            >
              ← Back to Admin
            </Link>
          </div>
        </div>
      </div>

      <AdminInsightsSidebar />

      <div className="max-w-7xl mx-auto md:pl-[300px] px-4 sm:px-6 lg:px-8 py-6">
        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-2">Select City</label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              >
                {cities.map(city => (
                  <option key={city.value} value={city.value}>{city.label}</option>
                ))}
              </select>
            </div>

            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Area</label>
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              >
                <option value="">Choose an area</option>
                {areas[selectedCity]?.map(area => (
                  <option key={area.value} value={area.value}>{area.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {!areaData ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📍</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Select an Area to View Analytics</h3>
              <p className="text-gray-600">Choose a city and area from the filters above to view detailed analytics and insights.</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Area Overview */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{areaData.name}</h2>
                  <p className="text-gray-600">Comprehensive Area Analysis</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-indigo-600">
                    ₹{(areaData.avgPrice / 100000).toFixed(1)}L
                  </div>
                  <div className="text-sm text-gray-500">Average Price</div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">{areaData.priceChange}%</div>
                  <div className="text-sm text-blue-500">Price Growth</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">{areaData.rentalYield}%</div>
                  <div className="text-sm text-green-500">Rental Yield</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">{areaData.occupancyRate}%</div>
                  <div className="text-sm text-purple-500">Occupancy Rate</div>
                </div>
                <div className="bg-orange-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">{areaData.demographics.workingPopulation}%</div>
                  <div className="text-sm text-orange-500">Working Pop.</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Infrastructure */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Infrastructure Rating</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Connectivity</span>
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-500">{renderStars(areaData.infrastructure.connectivity)}</span>
                      <span className="text-sm text-gray-500">{areaData.infrastructure.connectivity}/10</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Amenities</span>
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-500">{renderStars(areaData.infrastructure.amenities)}</span>
                      <span className="text-sm text-gray-500">{areaData.infrastructure.amenities}/10</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Schools</span>
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-500">{renderStars(areaData.infrastructure.schools)}</span>
                      <span className="text-sm text-gray-500">{areaData.infrastructure.schools}/10</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Hospitals</span>
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-500">{renderStars(areaData.infrastructure.hospitals)}</span>
                      <span className="text-sm text-gray-500">{areaData.infrastructure.hospitals}/10</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Shopping</span>
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-500">{renderStars(areaData.infrastructure.shopping)}</span>
                      <span className="text-sm text-gray-500">{areaData.infrastructure.shopping}/10</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Demographics */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Demographics</h3>
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700">Average Age</span>
                      <span className="font-semibold text-gray-800">{areaData.demographics.avgAge} years</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${(areaData.demographics.avgAge / 60) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700">Working Population</span>
                      <span className="font-semibold text-gray-800">{areaData.demographics.workingPopulation}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${areaData.demographics.workingPopulation}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700">Average Income</span>
                      <span className="font-semibold text-gray-800">₹{areaData.demographics.avgIncome.toLocaleString()}</span>
                    </div>
                    <div className="text-sm text-gray-500">Monthly household income</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Growth Trends */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Growth Trends</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 px-2 text-gray-600">Period</th>
                      <th className="text-right py-2 px-2 text-gray-600">Growth</th>
                      <th className="text-right py-2 px-2 text-gray-600">Demand</th>
                    </tr>
                  </thead>
                  <tbody>
                    {areaData.trends.map((trend, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-2 px-2 font-medium text-gray-900">{trend.period}</td>
                        <td className="py-2 px-2 text-right">
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                            +{trend.growth}%
                          </span>
                        </td>
                        <td className="py-2 px-2 text-right">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            trend.demand === 'Very High' ? 'bg-red-100 text-red-700' :
                            trend.demand === 'High' ? 'bg-orange-100 text-orange-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {trend.demand}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Top Localities */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Localities</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {areaData.topLocalities.map((locality, index) => (
                  <div key={index} className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">{locality.name}</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Avg Price:</span>
                        <span className="font-medium">₹{(locality.avgPrice / 100000).toFixed(1)}L</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Growth:</span>
                        <span className="font-medium text-green-600">+{locality.growth}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
