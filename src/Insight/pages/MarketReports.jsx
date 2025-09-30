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

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Listen for sidebar state changes
  React.useEffect(() => {
    const checkSidebarState = () => {
      const sidebar = document.querySelector('aside[aria-label="Sidebar"]');
      if (sidebar) {
        const isCollapsed = sidebar.getAttribute('aria-expanded') === 'false';
        setIsSidebarCollapsed(isCollapsed);
      }
    };

    // Check initial state
    checkSidebarState();

    // Set up a mutation observer to watch for changes
    const observer = new MutationObserver(checkSidebarState);
    const config = { attributes: true, attributeFilter: ['aria-expanded'] };
    const sidebar = document.querySelector('aside[aria-label="Sidebar"]');
    
    if (sidebar) {
      observer.observe(sidebar, config);
    }

    // Clean up
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br via-white to-blue-50">
      <Navbar />
      <div className="flex flex-col md:flex-row w-full min-h-[calc(100vh-4rem)]">
        {/* Sidebar - Collapsible */}
        <div className="fixed md:sticky top-16 md:top-16 left-0 z-20 h-[calc(100vh-4rem)]">
          <InsightsSidebar />
        </div>
        
        {/* Main Content - Shifts with sidebar */}
        <div 
          className={`transition-all duration-300 ease-in-out px-4 sm:px-6 md:px-8 lg:px-12 py-6 md:py-8 overflow-auto ${
            isSidebarCollapsed ? 'md:ml-20' : 'md:ml-64'
          } w-full`}
        >
          {/* Hero Banner */}
          <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[65vh] lg:h-[70vh] overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80"
              alt="Market Analytics Dashboard"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-800/60 to-blue-900/40"></div>
            
            {/* Floating Analytics Cards - Desktop */}
            <div className="hidden md:block absolute top-8 right-4 lg:top-12 lg:right-8 xl:top-16 xl:right-12">
              <div className="bg-white/10 backdrop-blur-md rounded-xl lg:rounded-2xl p-3 lg:p-4 xl:p-6 text-white border border-white/20">
                <div className="flex items-center space-x-2 lg:space-x-3 mb-1 lg:mb-2">
                  <TrendingUp className="w-4 h-4 lg:w-5 lg:h-5 text-emerald-400" />
                  <span className="text-xs lg:text-sm font-medium">Market Growth</span>
                </div>
                <div className="text-xl lg:text-2xl font-bold">+22.5%</div>
                <div className="text-[10px] lg:text-xs text-white/70">vs last quarter</div>
              </div>
            </div>
            
            <div className="hidden md:block absolute bottom-16 left-4 lg:bottom-24 lg:left-8 xl:bottom-32 xl:left-12">
              <div className="bg-white/10 backdrop-blur-md rounded-xl lg:rounded-2xl p-3 lg:p-4 text-white border border-white/20">
                <div className="flex items-center space-x-2 lg:space-x-3 mb-1 lg:mb-2">
                  <BarChart3 className="w-4 h-4 lg:w-5 lg:h-5 text-blue-400" />
                  <span className="text-xs lg:text-sm font-medium">Avg Price/SqFt</span>
                </div>
                <div className="text-xl lg:text-2xl font-bold">₹8,950</div>
                <div className="text-[10px] lg:text-xs text-white/70">Delhi NCR</div>
              </div>
            </div>

            {/* Mobile Floating Cards */}
            <div className="md:hidden absolute bottom-4 left-0 right-0 px-4">
              <div className="flex justify-between">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 text-white border border-white/20 w-[48%]">
                  <div className="flex items-center space-x-2 mb-1">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-medium">Growth</span>
                  </div>
                  <div className="text-lg font-bold">+22.5%</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 text-white border border-white/20 w-[48%]">
                  <div className="flex items-center space-x-2 mb-1">
                    <BarChart3 className="w-4 h-4 text-blue-400" />
                    <span className="text-xs font-medium">Price/SqFt</span>
                  </div>
                  <div className="text-lg font-bold">₹8,950</div>
                </div>
              </div>
            </div>
            
            <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 lg:px-8 xl:px-12">
              <div className="text-center w-full max-w-5xl mx-auto px-2">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                  Market Reports &
                  <span className="block font-extrabold bg-gradient-to-r from-emerald-300 via-blue-300 to-purple-300 bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                    Analytics Hub
                  </span>
                </h1>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-slate-100 mb-4 sm:mb-6 max-w-4xl mx-auto leading-relaxed font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
                  Comprehensive market insights, data-driven analytics, and strategic intelligence
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <button className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-white text-slate-900 rounded-xl font-semibold hover:bg-slate-100 transition-all duration-300 flex items-center justify-center">
                    <Download className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Download Report
                  </button>
                  <button className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-transparent border-2 border-white text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-300">
                    View Live Data
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="max-w-7xl mx-auto w-full mt-18">
            {/* Filters Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 mb-8 sm:mb-12 md:mb-16 border border-white/50">
              <div className="flex flex-col gap-4 sm:gap-6">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />
                  <h3 className="text-base sm:text-lg font-semibold text-slate-900">Market Filters</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1 sm:mb-2">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
                      Time Period
                    </label>
                    <select
                      value={selectedPeriod}
                      onChange={(e) => setSelectedPeriod(e.target.value)}
                      className="w-full border-2 border-slate-200 rounded-lg sm:rounded-xl px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    >
                      {periods.map((period) => (
                        <option key={period.value} value={period.value}>
                          {period.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1 sm:mb-2">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
                      Location
                    </label>
                    <select
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="w-full border-2 border-slate-200 rounded-lg sm:rounded-xl px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    >
                      {cities.map((city) => (
                        <option key={city.value} value={city.value}>
                          {city.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-end sm:col-span-2 lg:col-span-1">
                    <button className="w-full px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg sm:rounded-xl font-semibold transition-all duration-300 flex items-center justify-center">
                      <BarChart3 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                      Generate Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketReports;