import React from "react";
import {
    FileText,
    FileSpreadsheet,
    Image as ImageIcon,
    Download,
    Download as DownloadIcon,
    Calendar as CalendarIcon,
    MapPin,
    Filter as FilterIcon,
    FileType,
    BarChart3,
    TrendingUp,
    ArrowRight
} from "lucide-react";

const Desktopmarketreport = ({
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
}) => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
            {/* Hero Banner */}
            <div className="relative w-full h-[65vh] lg:h-[70vh] overflow-hidden rounded-3xl shadow-2xl">
                <img
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80"
                    alt="Market Analytics Dashboard"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-800/60 to-blue-900/40"></div>

                {/* Floating Analytics Cards - Desktop */}
                <div className="absolute top-12 right-8 xl:top-16 xl:right-12">
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 xl:p-6 text-white border border-white/20">
                        <div className="flex items-center space-x-3 mb-2">
                            <TrendingUp className="w-5 h-5 text-emerald-400" />
                            <span className="text-sm font-medium">Market Growth</span>
                        </div>
                        <div className="text-2xl font-bold">+0%</div>
                        <div className="text-xs text-white/70">vs last quarter</div>
                    </div>
                </div>

                <div className="absolute bottom-24 left-8 xl:bottom-32 xl:left-12">
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-white border border-white/20">
                        <div className="flex items-center space-x-3 mb-2">
                            <BarChart3 className="w-5 h-5 text-blue-400" />
                            <span className="text-sm font-medium">Avg Price/SqFt</span>
                        </div>
                        <div className="text-2xl font-bold">₹0</div>
                        <div className="text-xs text-white/70">Delhi NCR</div>
                    </div>
                </div>

                <div className="relative z-10 flex items-center justify-center h-full px-8 lg:px-12">
                    <div className="text-center w-full max-w-5xl mx-auto">
                        <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                            Market Reports &
                            <span className="block font-extrabold bg-gradient-to-r from-emerald-300 via-blue-300 to-purple-300 bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                                Analytics Hub
                            </span>
                        </h1>
                        <div className="flex gap-4 justify-center">
                            <button className="px-6 py-3 text-base bg-white text-slate-900 rounded-xl font-semibold hover:bg-slate-100 transition-all duration-300 flex items-center justify-center">
                                <Download className="w-5 h-5 mr-2" />
                                Download Report
                            </button>
                            <button className="px-6 py-3 text-base bg-transparent border-2 border-white text-white rounded-xl font-semibold hover:bg-white/10 transition-all duration-300">
                                View Live Data
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters Section */}
            <div id="market-reports-section" className="max-w-7xl mx-auto w-full -mt-16 relative z-20 px-6">
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 mb-16 shadow-xl border border-white/50">
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <FilterIcon className="w-5 h-5 text-slate-600" />
                                <h3 className="text-lg font-semibold text-slate-900">Market Reports</h3>
                            </div>
                            <span className="text-sm text-slate-500">
                                {filteredReports.length} {filteredReports.length === 1 ? 'report' : 'reports'} found
                            </span>
                        </div>
                        <div className="grid grid-cols-4 gap-6 w-full">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    <FileType className="w-4 h-4 inline mr-1" />
                                    Report Type
                                </label>
                                <select
                                    value={selectedType}
                                    onChange={(e) => setSelectedType(e.target.value)}
                                    className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                >
                                    {types.map((type) => (
                                        <option key={type.value} value={type.value}>
                                            {type.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    <CalendarIcon className="w-4 h-4 inline mr-1" />
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
                                <button
                                    onClick={() => {
                                        setSelectedType('all');
                                        setSelectedPeriod('all');
                                        setSelectedCity('all');
                                    }}
                                    disabled={selectedType === 'all' && selectedPeriod === 'all' && selectedCity === 'all'}
                                    className={`w-full px-6 py-3 text-base rounded-xl font-semibold transition-all duration-300 flex items-center justify-center ${selectedType === 'all' && selectedPeriod === 'all' && selectedCity === 'all'
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
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
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
                            <button
                                onClick={() => {
                                    const element = document.getElementById('market-reports-section');
                                    if (element) {
                                        element.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }}
                                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors cursor-pointer"
                            >
                                Go to Report Generator
                                <ArrowRight className="ml-2 -mr-1 w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Desktopmarketreport;
