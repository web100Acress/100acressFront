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
    TrendingUp
} from "lucide-react";

const Mobilemarketreport = ({
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
        <div className="w-full px-4 py-6">
            {/* Hero Banner */}
            <div className="relative w-full h-[50vh] sm:h-[60vh] overflow-hidden rounded-2xl shadow-xl">
                <img
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
                    alt="Market Analytics Dashboard"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-800/60 to-blue-900/40"></div>

                {/* Mobile Floating Cards */}
                <div className="absolute bottom-4 left-0 right-0 px-4">
                    <div className="flex justify-between gap-2">
                        <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 text-white border border-white/20 flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                                <TrendingUp className="w-4 h-4 text-emerald-400" />
                                <span className="text-[10px] font-medium">Growth</span>
                            </div>
                            <div className="text-base font-bold">+22.5%</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 text-white border border-white/20 flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                                <BarChart3 className="w-4 h-4 text-blue-400" />
                                <span className="text-[10px] font-medium">Price/SqFt</span>
                            </div>
                            <div className="text-base font-bold">₹8,950</div>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 flex items-center justify-center h-full px-4">
                    <div className="text-center w-full">
                        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3 leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                            Market Reports &
                            <span className="block font-extrabold bg-gradient-to-r from-emerald-300 via-blue-300 to-purple-300 bg-clip-text text-transparent">
                                Analytics Hub
                            </span>
                        </h1>
                        <p className="text-sm sm:text-base text-slate-100 mb-4 px-2 drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)]">
                            Comprehensive market insights and strategic intelligence
                        </p>
                        <div className="flex flex-col gap-2">
                            <button className="w-full py-2.5 text-sm bg-white text-slate-900 rounded-lg font-semibold flex items-center justify-center">
                                <Download className="w-4 h-4 mr-2" />
                                Download Report
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters Section */}
            <div id="market-reports-section" className="w-full -mt-8 relative z-20">
                <div className="bg-white rounded-2xl p-5 mb-8 shadow-lg border border-gray-100">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between border-b pb-3">
                            <div className="flex items-center space-x-2">
                                <FilterIcon className="w-4 h-4 text-slate-600" />
                                <h3 className="text-sm font-bold text-slate-900">Filters</h3>
                            </div>
                            <span className="text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                                {filteredReports.length} {filteredReports.length === 1 ? 'Report' : 'Reports'}
                            </span>
                        </div>

                        <div className="space-y-3">
                            <div>
                                <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-500 mb-1">
                                    Report Type
                                </label>
                                <select
                                    value={selectedType}
                                    onChange={(e) => setSelectedType(e.target.value)}
                                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500/20"
                                >
                                    {types.map((type) => (
                                        <option key={type.value} value={type.value}>
                                            {type.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-500 mb-1">
                                    Time Period
                                </label>
                                <select
                                    value={selectedPeriod}
                                    onChange={(e) => setSelectedPeriod(e.target.value)}
                                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500/20"
                                >
                                    {periods.map((period) => (
                                        <option key={period.value} value={period.value}>
                                            {period.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-500 mb-1">
                                    Location
                                </label>
                                <select
                                    value={selectedCity}
                                    onChange={(e) => setSelectedCity(e.target.value)}
                                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500/20"
                                >
                                    {cities.map((city) => (
                                        <option key={city.value} value={city.value}>
                                            {city.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <button
                                onClick={() => {
                                    setSelectedType('all');
                                    setSelectedPeriod('all');
                                    setSelectedCity('all');
                                }}
                                disabled={selectedType === 'all' && selectedPeriod === 'all' && selectedCity === 'all'}
                                className={`w-full py-2.5 text-sm rounded-lg font-bold transition-all ${selectedType === 'all' && selectedPeriod === 'all' && selectedCity === 'all'
                                    ? 'bg-gray-100 text-gray-400'
                                    : 'bg-blue-50 text-blue-600 border border-blue-200'
                                    }`}
                            >
                                Reset Filters
                            </button>
                        </div>
                    </div>
                </div>

                {/* Reports Grid */}
                <div className="space-y-4">
                    {filteredReports.length > 0 ? (
                        filteredReports.map((report) => (
                            <div key={report._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="p-4">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center space-x-2">
                                            {getFileIcon(report.fileType)}
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">
                                                {report.type || report.fileType?.split('/').pop()?.toUpperCase() || 'DOC'}
                                            </span>
                                        </div>
                                        {report.city && (
                                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-100">
                                                {report.city}
                                            </span>
                                        )}
                                    </div>

                                    <h3 className="text-sm font-bold text-gray-900 mb-2 leading-snug">{report.title}</h3>

                                    <div className="flex items-center gap-3 text-[10px] text-gray-500 mb-4">
                                        {report.period && (
                                            <div className="flex items-center">
                                                <CalendarIcon className="w-3 h-3 mr-1 text-gray-400" />
                                                <span>{report.period}</span>
                                            </div>
                                        )}
                                        {report.fileSize && (
                                            <div className="bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100">
                                                {formatFileSize(report.fileSize)}
                                            </div>
                                        )}
                                    </div>

                                    <a
                                        href={report.fileUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center w-full py-2.5 text-xs font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 active:scale-[0.98] transition-all"
                                        download
                                    >
                                        <DownloadIcon className="w-3.5 h-3.5 mr-2" />
                                        Download
                                    </a>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="bg-gray-50 rounded-2xl p-8 text-center border border-dashed border-gray-200">
                            <FilterIcon className="w-8 h-8 mx-auto text-gray-300 mb-2" />
                            <h3 className="text-sm font-bold text-gray-900">No results</h3>
                            <p className="text-xs text-gray-500">Try adjusting your filters</p>
                        </div>
                    )}
                </div>

                {/* Mobile CTA */}
                <div className="mt-8 pb-10">
                    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white text-center shadow-lg shadow-blue-200/50">
                        <h3 className="text-base font-bold mb-2">Need Custom Insights?</h3>
                        <p className="text-xs text-blue-100 mb-5 leading-relaxed">
                            Our experts can build a tailored market analysis report for your project needs.
                        </p>
                        <button className="w-full bg-white text-blue-600 py-3 rounded-xl text-sm font-bold shadow-sm">
                            Contact Consultant
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Mobilemarketreport;
