import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import InsightsSidebar from '../components/InsightsSidebar';

export default function MarketReports() {
  const [selectedPeriod, setSelectedPeriod] = useState('6months');
  const [selectedCity, setSelectedCity] = useState('all');
  const [marketData, setMarketData] = useState({
    propertyPrices: [],
    rentalYields: [],
    marketTrends: [],
    topPerformingAreas: []
  });

  const periods = [
    { value: '1month', label: 'Last Month' },
    { value: '3months', label: 'Last 3 Months' },
    { value: '6months', label: 'Last 6 Months' },
    { value: '1year', label: 'Last Year' }
  ];

  const cities = [
    { value: 'all', label: 'All Cities' },
    { value: 'delhi', label: 'Delhi NCR' },
    { value: 'mumbai', label: 'Mumbai' },
    { value: 'bangalore', label: 'Bangalore' },
    { value: 'pune', label: 'Pune' },
    { value: 'hyderabad', label: 'Hyderabad' }
  ];

  // Mock data for demonstration
  useEffect(() => {
    const mockData = {
      propertyPrices: [
        { month: 'Jan', price: 8500, change: 2.1 },
        { month: 'Feb', price: 8700, change: 2.4 },
        { month: 'Mar', price: 8900, change: 2.3 },
        { month: 'Apr', price: 9200, change: 3.4 },
        { month: 'May', price: 9500, change: 3.3 },
        { month: 'Jun', price: 9800, change: 3.2 }
      ],
      rentalYields: [
        { area: 'Gurgaon', yield: 3.2, avgRent: 25000, avgPrice: 9500000 },
        { area: 'Noida', yield: 2.8, avgRent: 18000, avgPrice: 7700000 },
        { area: 'Delhi', yield: 2.5, avgRent: 22000, avgPrice: 10500000 },
        { area: 'Faridabad', yield: 3.8, avgRent: 12000, avgPrice: 3800000 }
      ],
      marketTrends: [
        { trend: 'Price Appreciation', percentage: 12.5, status: 'up' },
        { trend: 'Rental Demand', percentage: 8.3, status: 'up' },
        { trend: 'Inventory Levels', percentage: -15.2, status: 'down' },
        { trend: 'Sales Volume', percentage: 22.1, status: 'up' }
      ],
      topPerformingAreas: [
        { area: 'Dwarka Expressway', growth: 18.5, avgPrice: 12000000 },
        { area: 'New Gurgaon', growth: 15.2, avgPrice: 8500000 },
        { area: 'Greater Noida West', growth: 12.8, avgPrice: 4500000 },
        { area: 'Yamuna Expressway', growth: 11.3, avgPrice: 3800000 }
      ]
    };
    setMarketData(mockData);
  }, [selectedPeriod, selectedCity]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-[9000] w-full bg-white/80 backdrop-blur border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">📊</div>
            <h1 className="text-lg sm:text-xl font-semibold text-gray-800">Market Reports</h1>
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

      <InsightsSidebar />

      <div className="max-w-7xl mx-auto md:pl-[300px] px-4 sm:px-6 lg:px-8 py-6">
        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-2">Time Period</label>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              >
                {periods.map(period => (
                  <option key={period.value} value={period.value}>{period.label}</option>
                ))}
              </select>
            </div>

            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
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

            <div className="flex items-end">
              <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium">
                Generate Report
              </button>
            </div>
          </div>
        </div>

        {/* Market Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Property Price Trends */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Property Price Trends</h2>
            <div className="h-64 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <div className="text-4xl mb-2">📈</div>
                <p>Price trend chart will be displayed here</p>
                <p className="text-sm text-gray-400 mt-1">Integration with charting library needed</p>
              </div>
            </div>
          </div>

          {/* Market Trends */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Market Trends</h2>
            <div className="space-y-4">
              {marketData.marketTrends.map((trend, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      trend.status === 'up' ? 'bg-green-500' : 'bg-red-500'
                    }`}></div>
                    <span className="font-medium text-gray-800">{trend.trend}</span>
                  </div>
                  <span className={`font-bold ${
                    trend.status === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {trend.status === 'up' ? '+' : ''}{trend.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Rental Yields */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Rental Yields by Area</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 px-2 text-gray-600">Area</th>
                    <th className="text-right py-2 px-2 text-gray-600">Avg Rent</th>
                    <th className="text-right py-2 px-2 text-gray-600">Avg Price</th>
                    <th className="text-right py-2 px-2 text-gray-600">Yield</th>
                  </tr>
                </thead>
                <tbody>
                  {marketData.rentalYields.map((area, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-2 px-2 font-medium text-gray-900">{area.area}</td>
                      <td className="py-2 px-2 text-right text-gray-700">₹{area.avgRent.toLocaleString()}</td>
                      <td className="py-2 px-2 text-right text-gray-700">₹{area.avgPrice.toLocaleString()}</td>
                      <td className="py-2 px-2 text-right">
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                          {area.yield}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Performing Areas */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Top Performing Areas</h2>
            <div className="space-y-4">
              {marketData.topPerformingAreas.map((area, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-800">{area.area}</h3>
                    <p className="text-sm text-gray-600">Avg Price: ₹{area.avgPrice.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">+{area.growth}%</div>
                    <div className="text-xs text-gray-500">Growth</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Market Summary */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Market Summary</h2>
          <div className="prose max-w-none text-gray-600">
            <p className="mb-4">
              The real estate market shows strong growth with an average price appreciation of 12.5% across major cities.
              Delhi NCR continues to lead with the highest rental yields, while emerging areas like Dwarka Expressway
              show exceptional growth potential.
            </p>
            <p className="mb-4">
              Key insights:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Property prices have increased by an average of 12.5% in the last 6 months</li>
              <li>Rental demand is up 8.3%, indicating strong investor interest</li>
              <li>Inventory levels have decreased by 15.2%, suggesting a seller's market</li>
              <li>Sales volume increased by 22.1%, showing robust market activity</li>
            </ul>
            <p>
              <strong>Recommendation:</strong> This is an opportune time for both buyers and investors,
              with strong growth potential in emerging areas and stable returns in established markets.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
