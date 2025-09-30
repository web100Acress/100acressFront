import React, { useState, useEffect, useMemo } from "react";
import { FileText, FileSpreadsheet, Image as ImageIcon, Download as DownloadIcon, Calendar as CalendarIcon, MapPin, MapPin as MapPinIcon, Filter as FilterIcon, FileType, BarChart3, TrendingUp, ArrowRight, Download } from "lucide-react";
import InsightsSidebar from "../components/InsightsSidebar";
import Navbar from "../../aadharhomes/navbar/Navbar";
import api from "../../config/apiClient";
import { format } from 'date-fns';

const MarketReports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("all");
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [marketReports, setMarketReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cities, setCities] = useState([]);
  const [types, setTypes] = useState([
    { value: 'all', label: 'All Types' },
    { value: 'PDF', label: 'PDF' },
    { value: 'Excel', label: 'Excel' },
    { value: 'Infographic', label: 'Infographic' }
  ]);
  
  const periods = [
    { value: 'all', label: 'All Time' },
    { value: 'Q1 2023', label: 'Q1 2023' },
    { value: 'Q2 2023', label: 'Q2 2023' },
    { value: 'Q3 2023', label: 'Q3 2023' },
    { value: 'Q4 2023', label: 'Q4 2023' },
    { value: 'Annual 2023', label: 'Annual 2023' }
  ];

  // Fetch market reports
  useEffect(() => {
    const fetchMarketReports = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("myToken")?.replace(/^"/, '').replace(/"$/, '').replace(/^Bearer\s+/i, '') || '';
        const response = await api.get('/api/market-reports', {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        });
        
        const reports = response.data?.data || [];
        setMarketReports(reports);
        
        // Extract unique cities from reports
        const uniqueCities = [...new Set(reports.map(r => r.city).filter(Boolean))].sort();
        setCities([
          { value: 'all', label: 'All Cities' },
          ...uniqueCities.map(city => ({
            value: city.toLowerCase().replace(/\s+/g, '-'),
            label: city
          }))
        ]);
        
      } catch (error) {
        console.error('Error fetching market reports:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
          url: error.config?.url
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMarketReports();
  }, []);
  
  // Filter reports based on selections
  const filteredReports = useMemo(() => {
    return marketReports.filter(report => {
      const matchesCity = selectedCity === 'all' || 
        report.city?.toLowerCase() === selectedCity.toLowerCase();
      const matchesPeriod = selectedPeriod === 'all' || 
        report.period === selectedPeriod;
      const matchesType = selectedType === 'all' || 
        report.type === selectedType;
      
      return matchesCity && matchesPeriod && matchesType;
    });
  }, [marketReports, selectedCity, selectedPeriod, selectedType]);

  // Fetch projects to get cities (removed as we're getting cities from market reports)

  // Get icon based on file type
  const getFileIcon = (fileType) => {
    if (!fileType) return <FileType className="w-5 h-5 text-gray-500" />;
    
    const type = fileType.toLowerCase();
    if (type.includes('pdf')) return <FileText className="w-5 h-5 text-red-500" />;
    if (type.includes('excel') || type.includes('spreadsheet')) return <FileSpreadsheet className="w-5 h-5 text-green-600" />;
    if (type.includes('image')) return <ImageIcon className="w-5 h-5 text-blue-500" />;
    return <FileType className="w-5 h-5 text-gray-500" />;
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (!bytes) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Set isMounted after component mounts
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Listen for sidebar state changes
  useEffect(() => {
    if (!isMounted) return;
    
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
  }, [isMounted]);

  // Show loading state until component is mounted and data is loaded
  if (!isMounted || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br via-white to-blue-50">
        <Navbar />
        <div className="flex flex-col md:flex-row w-full min-h-[calc(100vh-4rem)]">
          <div className="fixed md:sticky top-16 md:top-16 left-0 z-20 h-[calc(100vh-4rem)]">
            <InsightsSidebar />
          </div>
          <div className="flex-1 p-8">
            <div className="max-w-7xl mx-auto">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white rounded-lg shadow p-6">
                      <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
                      <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }


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
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <FilterIcon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />
                    <h3 className="text-base sm:text-lg font-semibold text-slate-900">Market Reports</h3>
                  </div>
                  <span className="text-sm text-slate-500">
                    {filteredReports.length} {filteredReports.length === 1 ? 'report' : 'reports'} found
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1 sm:mb-2">
                      <FileType className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
                      Report Type
                    </label>
                    <select
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className="w-full border-2 border-slate-200 rounded-lg sm:rounded-xl px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    >
                      {types.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1 sm:mb-2">
                      <CalendarIcon className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
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

                  <div className="flex items-end">
                    <button 
                      onClick={() => {
                        setSelectedType('all');
                        setSelectedPeriod('all');
                        setSelectedCity('all');
                      }}
                      disabled={selectedType === 'all' && selectedPeriod === 'all' && selectedCity === 'all'}
                      className={`w-full px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl font-semibold transition-all duration-300 flex items-center justify-center ${
                        selectedType === 'all' && selectedPeriod === 'all' && selectedCity === 'all'
                          ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          : 'bg-white border-2 border-blue-500 text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      Clear Filters
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Reports Grid */}
            {filteredReports.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredReports.map((report) => (
                  <div key={report._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          {getFileIcon(report.fileType)}
                          <span className="text-sm font-medium text-gray-500 uppercase">
                            {report.type || report.fileType?.split('/').pop()?.toUpperCase() || 'DOCUMENT'}
                          </span>
                        </div>
                        {report.city && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {report.city}
                          </span>
                        )}
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{report.title}</h3>
                      
                      {report.description && (
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {report.description}
                        </p>
                      )}
                      
                      <div className="flex items-center text-xs text-gray-500 space-x-3 mt-4 pt-3 border-t border-gray-100">
                        {report.period && (
                          <div className="flex items-center">
                            <CalendarIcon className="w-3.5 h-3.5 mr-1 text-gray-400" />
                            <span>{report.period}</span>
                          </div>
                        )}
                        {report.fileSize && (
                          <div className="text-xs text-gray-500">
                            {formatFileSize(report.fileSize)}
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-4 pt-3 border-t border-gray-100">
                        <a
                          href={report.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                          download
                        >
                          <DownloadIcon className="w-4 h-4 mr-2" />
                          Download Report
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm p-8 text-center border border-gray-100">
                <FilterIcon className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No reports found</h3>
                <p className="text-gray-500 mb-4">
                  {marketReports.length === 0 
                    ? 'No market reports are currently available.' 
                    : 'No reports match your current filters.'}
                </p>
                {(selectedType !== 'all' || selectedPeriod !== 'all' || selectedCity !== 'all') && (
                  <button
                    onClick={() => {
                      setSelectedType('all');
                      setSelectedPeriod('all');
                      setSelectedCity('all');
                    }}
                    className="text-sm font-medium text-blue-600 hover:text-blue-500 hover:underline"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            )}
            
            {/* Admin CTA */}
            <div className="mt-12 text-center">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
                <div className="max-w-2xl mx-auto">
                  <div className="flex justify-center mb-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <BarChart3 className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Need more detailed reports?</h3>
                  <p className="text-gray-600 mb-6">
                    Access comprehensive market analytics and generate custom reports with our advanced tools.
                  </p>
                  <a
                    href="/admin/insights/market-report-generator"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  >
                    Go to Report Generator
                    <ArrowRight className="ml-2 -mr-1 w-4 h-4" />
                  </a>
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