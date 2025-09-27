import React, { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, BarChart3, PieChart, MapPin, Calendar, Filter, Download, ArrowRight, Building2, Home, DollarSign, Users } from "lucide-react";
import InsightsSidebar from "../components/InsightsSidebar";
import Navbar from "../../aadharhomes/navbar/Navbar";
import LuxuryFooter from "../../Components/Actual_Components/LuxuryFooter";

const MarketReports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("6months");
  const [selectedCity, setSelectedCity] = useState("all");
  const [marketData, setMarketData] = useState({
    propertyPrices: [],
    rentalYields: [],
    marketTrends: [],
    topPerformingAreas: [],
  });

  const periods = [
    { value: "1month", label: "Last Month" },
    { value: "3months", label: "Last 3 Months" },
    { value: "6months", label: "Last 6 Months" },
    { value: "1year", label: "Last Year" },
  ];

  const cities = [
    { value: "all", label: "All Cities" },
    { value: "delhi", label: "Delhi NCR" },
    { value: "mumbai", label: "Mumbai" },
    { value: "bangalore", label: "Bangalore" },
    { value: "pune", label: "Pune" },
    { value: "hyderabad", label: "Hyderabad" },
  ];

  const keyMetrics = [
    { label: "Total Properties", value: "12,580", change: "+8.5%", icon: Building2, trend: "up" },
    { label: "Avg Price/SqFt", value: "₹8,950", change: "+12.3%", icon: DollarSign, trend: "up" },
    { label: "Active Listings", value: "2,150", change: "-5.2%", icon: Home, trend: "down" },
    { label: "Market Activity", value: "85%", change: "+15.8%", icon: Users, trend: "up" },
  ];

  // Mock data for demonstration
  useEffect(() => {
    const mockData = {
      propertyPrices: [
        { month: "Jan", price: 8500, change: 2.1 },
        { month: "Feb", price: 8700, change: 2.4 },
        { month: "Mar", price: 8900, change: 2.3 },
        { month: "Apr", price: 9200, change: 3.4 },
        { month: "May", price: 9500, change: 3.3 },
        { month: "Jun", price: 9800, change: 3.2 },
      ],
      rentalYields: [
        { area: "Gurgaon", yield: 3.2, avgRent: 25000, avgPrice: 9500000 },
        { area: "Noida", yield: 2.8, avgRent: 18000, avgPrice: 7700000 },
        { area: "Delhi", yield: 2.5, avgRent: 22000, avgPrice: 10500000 },
        { area: "Faridabad", yield: 3.8, avgRent: 12000, avgPrice: 3800000 },
      ],
      marketTrends: [
        { trend: "Price Appreciation", percentage: 12.5, status: "up" },
        { trend: "Rental Demand", percentage: 8.3, status: "up" },
        { trend: "Inventory Levels", percentage: -15.2, status: "down" },
        { trend: "Sales Volume", percentage: 22.1, status: "up" },
      ],
      topPerformingAreas: [
        { area: "Dwarka Expressway", growth: 18.5, avgPrice: 12000000 },
        { area: "New Gurgaon", growth: 15.2, avgPrice: 8500000 },
        { area: "Greater Noida West", growth: 12.8, avgPrice: 4500000 },
        { area: "Yamuna Expressway", growth: 11.3, avgPrice: 3800000 },
      ],
    };
    setMarketData(mockData);
  }, [selectedPeriod, selectedCity]);

  return (
    <div className="min-h-screen bg-gradient-to-br via-white to-blue-50 px-80  py-16 mb-4">
      <Navbar />  
      {/* Enhanced Hero Banner */}
      <div className="relative w-full h-[70vh] md:h-[70vh] overflow-hidden rounded-3xl shadow-2xl">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80"
          alt="Market Analytics Dashboard"
          className="absolute inset-0 w-full h-full object-cover object-center rounded-3xl"
          style={{ transform: 'translateY(40px)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-800/60 to-blue-900/40 rounded-3xl" style={{ transform: 'translateY(40px)' }}></div>
        
        {/* Floating Analytics Cards */}
        <div className="absolute top-20 right-10 hidden lg:block">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white border border-white/20">
            <div className="flex items-center space-x-3 mb-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <span className="text-sm font-medium">Market Growth</span>
            </div>
            <div className="text-2xl font-bold">+22.5%</div>
            <div className="text-xs text-white/70">vs last quarter</div>
          </div>
        </div>
        
        <div className="absolute bottom-32 left-10 hidden lg:block">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-white border border-white/20">
            <div className="flex items-center space-x-3 mb-2">
              <BarChart3 className="w-5 h-5 text-blue-400" />
              <span className="text-sm font-medium">Avg Price/SqFt</span>
            </div>
            <div className="text-2xl font-bold">₹8,950</div>
            <div className="text-xs text-white/70">Delhi NCR</div>
          </div>
        </div>
        
        <div className="relative z-10 flex items-center justify-center h-full px-6 lg:px-12">
          <div className="text-center max-w-5xl mx-auto">
            {/* <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-6 border border-white/20">
              <BarChart3 className="w-4 h-4 mr-2" />
              Real Estate Intelligence
            </div> */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
              Market Reports &
              <span className="block font-extrabold bg-gradient-to-r from-emerald-300 via-blue-300 to-purple-300 bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                Analytics Hub
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-100 mb-6 max-w-4xl mx-auto leading-relaxed font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
              Comprehensive market insights, data-driven analytics, and strategic intelligence for informed real estate decisions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-slate-900 rounded-xl font-semibold hover:bg-slate-100 transition-all duration-300 flex items-center justify-center">
                <Download className="w-5 h-5 mr-2" />
                Download Full Report
              </button>
              <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-300">
                View Live Data
              </button>
            </div>
          </div>
        </div>
      </div>

      <InsightsSidebar />

      <div className="max-w-8xl mx-auto px-6 lg:px-12 -mt-20 relative z-20">
        {/* Key Metrics Cards */}
     

        {/* Enhanced Filters */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 mb-16 border border-white/50 mt-12">
          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
            <div className="flex items-center space-x-3">
              <Filter className="w-5 h-5 text-slate-600" />
              <h3 className="text-lg font-semibold text-slate-900">Market Filters</h3>
            </div>
            
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Time Period
                </label>
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                >
                  {periods.map((period) => (
                    <option key={period.value} value={period.value}>
                      {period.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Location
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                >
                  {cities.map((city) => (
                    <option key={city.value} value={city.value}>
                      {city.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-end">
                <button className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-300 flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Generate Report
                </button>
              </div>
            </div>
          </div>
        </div>

   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {keyMetrics.map((metric, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 hover:bg-white/90 transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  metric.trend === 'up' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
                }`}>
                  <metric.icon className="w-6 h-6" />
                </div>
                <div className={`flex items-center text-sm font-medium ${
                  metric.trend === 'up' ? 'text-emerald-600' : 'text-red-600'
                }`}>
                  {metric.trend === 'up' ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                  {metric.change}
                </div>
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-1">{metric.value}</div>
              <div className="text-slate-600 text-sm">{metric.label}</div>
            </div>
          ))}
        </div>
        {/* Market Overview */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-6">
          {/* Property Price Trends */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/50">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">
                Property Price Trends
              </h2>
              <TrendingUp className="w-6 h-6 text-emerald-600" />
            </div>
            <div className="h-80 flex flex-col items-center justify-center text-slate-500 bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl border-2 border-dashed border-slate-200">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <BarChart3 className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-700 mb-2">Interactive Price Chart</h3>
                <p className="text-slate-500 mb-2">Real-time market data visualization</p>
                <p className="text-sm text-slate-400">Chart integration pending</p>
              </div>
            </div>
          </div>

          {/* Market Trends */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/50">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">
                Market Trends
              </h2>
              <PieChart className="w-6 h-6 text-purple-600" />
            </div>
            <div className="space-y-4">
              {marketData.marketTrends.map((trend, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className={`w-4 h-4 rounded-full ${trend.status === "up" ? "bg-emerald-500" : "bg-red-500"}`}></div>
                    <span className="font-semibold text-slate-800">{trend.trend}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {trend.status === "up" ? <TrendingUp className="w-4 h-4 text-emerald-600" /> : <TrendingDown className="w-4 h-4 text-red-600" />}
                    <span className={`font-bold text-lg ${trend.status === "up" ? "text-emerald-600" : "text-red-600"}`}>
                      {trend.status === "up" ? "+" : ""}{trend.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Analysis */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-3">
          {/* Rental Yields */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8   border border-white/50">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Rental Yields by Area
            </h2>
            <div className="overflow-hidden rounded-2xl border border-slate-200">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-slate-100 to-blue-100">
                  <tr>
                    <th className="text-left py-4 px-6 text-slate-700 font-semibold">Area</th>
                    <th className="text-right py-4 px-6 text-slate-700 font-semibold">Avg Rent</th>
                    <th className="text-right py-4 px-6 text-slate-700 font-semibold">Avg Price</th>
                    <th className="text-center py-4 px-6 text-slate-700 font-semibold">Yield</th>
                  </tr>
                </thead>
                <tbody>
                  {marketData.rentalYields.map((area, index) => (
                    <tr key={index} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-6 font-semibold text-slate-900">{area.area}</td>
                      <td className="py-4 px-6 text-right text-slate-700">₹{area.avgRent.toLocaleString()}</td>
                      <td className="py-4 px-6 text-right text-slate-700">₹{(area.avgPrice/100000).toFixed(1)}L</td>
                      <td className="py-4 px-6 text-center">
                        <span className="px-3 py-1 bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 rounded-full text-sm font-bold">
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
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/50">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Top Performing Areas
            </h2>
            <div className="space-y-4">
              {marketData.topPerformingAreas.map((area, index) => (
                <div key={index} className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-50 via-green-50 to-blue-50 p-6 border border-emerald-200 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-lg font-bold text-slate-900">{index + 1}.</span>
                        <h3 className="text-lg font-bold text-slate-900">{area.area}</h3>
                      </div>
                      <p className="text-slate-600 text-sm">
                        Avg Price: ₹{(area.avgPrice/100000).toFixed(1)} Lakh
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-2xl font-bold text-emerald-600 mb-1">
                        <TrendingUp className="w-5 h-5 mr-1" />
                        +{area.growth}%
                      </div>
                      <div className="text-xs text-slate-500 font-medium">YoY Growth</div>
                    </div>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 absolute top-4 right-4 transition-opacity">
                    <ArrowRight className="w-5 h-5 text-slate-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Market Summary */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 rounded-3xl p-12 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Market Intelligence Summary</h2>
              <div className="space-y-4 text-slate-200">
                <p className="text-lg leading-relaxed">
                  The real estate market demonstrates robust growth with a <strong className="text-white">12.5% price appreciation</strong> across major metropolitan areas. Delhi NCR maintains leadership with exceptional rental yields.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                  <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                    <div className="text-2xl font-bold text-emerald-300">+12.5%</div>
                    <div className="text-sm text-slate-300">Price Growth</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                    <div className="text-2xl font-bold text-blue-300">+8.3%</div>
                    <div className="text-sm text-slate-300">Rental Demand</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                    <div className="text-2xl font-bold text-purple-300">-15.2%</div>
                    <div className="text-sm text-slate-300">Inventory Drop</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                    <div className="text-2xl font-bold text-yellow-300">+22.1%</div>
                    <div className="text-sm text-slate-300">Sales Volume</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm border border-white/20">
              <h3 className="text-xl font-bold mb-4">Strategic Insights</h3>
              <ul className="space-y-3 text-slate-200">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Strong price momentum indicates healthy market fundamentals</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Increased rental demand signals robust investment opportunities</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Limited inventory creates favorable conditions for sellers</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Emerging areas show exceptional growth potential</span>
                </li>
              </ul>
              <div className="mt-6 pt-6 border-t border-white/20">
                <p className="text-emerald-300 font-semibold">
                  💡 Recommendation: Optimal market conditions for strategic investments in emerging corridors
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default MarketReports;