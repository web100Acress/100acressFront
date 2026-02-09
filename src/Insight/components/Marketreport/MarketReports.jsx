import React, { useState, useEffect, useMemo } from "react";
import { FileText, FileSpreadsheet, Image as ImageIcon, FileType } from "lucide-react";
import api from "../../../config/apiClient";
import Desktopmarketreport from "./Desktopmarketreport";
import Mobilemarketreport from "./mobilemarketreport";

const MarketReports = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [selectedPeriod, setSelectedPeriod] = useState("all");
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [marketReports, setMarketReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cities, setCities] = useState([]);
  const [types] = useState([
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
    { value: 'Annual 2023', label: 'Annual 2023' },
    { value: 'Q1 2024', label: 'Q1 2024' },
    { value: 'Q2 2024', label: 'Q2 2024' },
    { value: 'Q3 2024', label: 'Q3 2024' },
    { value: 'Q4 2024', label: 'Q4 2024' },
    { value: 'Annual 2024', label: 'Annual 2024' },
    { value: 'Q1 2025', label: 'Q1 2025' },
    { value: 'Q2 2025', label: 'Q2 2025' },
    { value: 'Q3 2025', label: 'Q3 2025' },
    { value: 'Q4 2025', label: 'Q4 2025' },
    { value: 'Annual 2025', label: 'Annual 2025' }
  ];

  // Handle responsiveness
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
        console.error('Error fetching market reports:', error);
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

  // Utility functions to pass down
  const getFileIcon = (fileType) => {
    if (!fileType) return <FileType className="w-5 h-5 text-gray-500" />;
    const type = fileType.toLowerCase();
    if (type.includes('pdf')) return <FileText className="w-5 h-5 text-red-500" />;
    if (type.includes('excel') || type.includes('spreadsheet')) return <FileSpreadsheet className="w-5 h-5 text-green-600" />;
    if (type.includes('image')) return <ImageIcon className="w-5 h-5 text-blue-500" />;
    return <FileType className="w-5 h-5 text-gray-500" />;
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (loading) {
    return (
      <div className="p-8">
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
    );
  }

  const commonProps = {
    filteredReports,
    selectedType,
    setSelectedType,
    selectedPeriod,
    setSelectedPeriod,
    selectedCity,
    setSelectedCity,
    types,
    periods,
    cities,
    getFileIcon,
    formatFileSize,
    marketReports
  };

  return isMobile ? <Mobilemarketreport {...commonProps} /> : <Desktopmarketreport {...commonProps} />;
};

export default MarketReports;