import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export default function AdvancedSearchOverlay({ isOpen, onClose }) {
    const [activeTab, setActiveTab] = useState("Property Types");

    // Filter States
    const [selectedTypes, setSelectedTypes] = useState([
        "Flat/Apartment", "Builder Floor", "Independent House/Villa",
        "Residential Land", "1 RK/ Studio Apartment", "Farm House",
        "Serviced Apartments", "Other"
    ]);
    const [selectedBudget, setSelectedBudget] = useState("");
    const [selectedBedrooms, setSelectedBedrooms] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState([]);
    const [selectedPostedBy, setSelectedPostedBy] = useState([]);

    const overlayRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            const isHeaderSearchClick = event.target.closest(".header-search-container");
            if (overlayRef.current && !overlayRef.current.contains(event.target) && !isHeaderSearchClick) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    // Filter Options Constants
    const propertyTypes = [
        "Flat/Apartment", "Builder Floor", "Independent House/Villa",
        "Residential Land", "1 RK/ Studio Apartment", "Farm House",
        "Serviced Apartments", "Other"
    ];

    const budgetRanges = [
        "Under 50 Lac", "50 Lac - 1 Cr", "1 Cr - 2 Cr", "2 Cr - 5 Cr", "5 Cr - 10 Cr", "Above 10 Cr"
    ];

    const bedroomOptions = ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "5+ BHK"];

    const constructionStatusOptions = ["Ready to Move", "Under Construction"];

    const postedByOptions = ["Owner", "Agent", "Builder"];

    const filterTabs = [
        { name: "Property Types", count: selectedTypes.length },
        { name: "Budget", count: selectedBudget ? 1 : 0 },
        { name: "Bedroom", count: selectedBedrooms.length },
        { name: "Construction Status", count: selectedStatus.length },
        { name: "Posted By", count: selectedPostedBy.length }
    ];

    // Toggle Handlers
    const toggleType = (type) => {
        setSelectedTypes(prev =>
            prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
        );
    };

    const toggleBedroom = (val) => {
        setSelectedBedrooms(prev =>
            prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]
        );
    };

    const toggleStatus = (val) => {
        setSelectedStatus(prev =>
            prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]
        );
    };

    const togglePostedBy = (val) => {
        setSelectedPostedBy(prev =>
            prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]
        );
    };

    const handleClearFilters = () => {
        setSelectedTypes([]);
        setSelectedBudget("");
        setSelectedBedrooms([]);
        setSelectedStatus([]);
        setSelectedPostedBy([]);
    };

    return (
        <div className="fixed inset-x-0 top-16 z-[1000] flex items-start justify-center px-4 bg-black/5 backdrop-blur-[2px] h-[calc(100vh-64px)] transition-all duration-300">
            <div
                ref={overlayRef}
                className="w-full max-w-4xl bg-white shadow-2xl border-x border-b border-gray-100 rounded-b-2xl overflow-hidden animate-in slide-in-from-top-4 duration-300"
            >
                {/* Filters Section */}
                <div className="p-4 md:p-5">
                    {/* Horizontal Navigation Tabs */}
                    <div className="flex items-center gap-3 overflow-x-auto pb-1 no-scrollbar border-b border-gray-50 mb-4">
                        {filterTabs.map((tab) => (
                            <button
                                key={tab.name}
                                onClick={() => setActiveTab(tab.name)}
                                className={`flex items-center gap-2 px-1 py-2 text-sm font-bold whitespace-nowrap transition-all duration-200 border-b-2 ${activeTab === tab.name
                                    ? "border-[#e53e3e] text-[#e53e3e]"
                                    : "border-transparent text-gray-500 hover:text-gray-700"
                                    }`}
                            >
                                {tab.name}{tab.count > 0 && <span className="ml-1 bg-red-100 px-1.5 py-0.5 rounded-full text-[10px]">{tab.count}</span>}
                            </button>
                        ))}
                    </div>

                    {/* Dynamic Filter Content Area */}
                    <div className="min-h-[100px]">
                        {/* Property Types Panel */}
                        {activeTab === "Property Types" && (
                            <div className="flex flex-col gap-4">
                                <label className="flex items-center gap-3 cursor-pointer group w-fit border-b border-gray-100 pb-2 mb-1">
                                    <div className="relative flex items-center">
                                        <input
                                            type="checkbox"
                                            className="peer hidden"
                                            checked={selectedTypes.length === propertyTypes.length}
                                            onChange={() => {
                                                if (selectedTypes.length === propertyTypes.length) {
                                                    setSelectedTypes([]);
                                                } else {
                                                    setSelectedTypes([...propertyTypes]);
                                                }
                                            }}
                                        />
                                        <div className="w-5 h-5 border-2 border-gray-300 rounded peer-checked:bg-[#e53e3e] peer-checked:border-[#e53e3e] transition-all duration-200 flex items-center justify-center">
                                            <svg className={`w-3.5 h-3.5 text-white transition-opacity duration-200 ${selectedTypes.length === propertyTypes.length ? "opacity-100" : "opacity-0"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        </div>
                                    </div>
                                    <span className="text-gray-900 text-sm font-bold group-hover:text-[#e53e3e] transition-colors">Select All</span>
                                </label>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-y-3 gap-x-12">
                                    {propertyTypes.map((type) => (
                                        <label key={type} className="flex items-center gap-3 cursor-pointer group">
                                            <div className="relative flex items-center">
                                                <input
                                                    type="checkbox"
                                                    className="peer hidden"
                                                    checked={selectedTypes.includes(type)}
                                                    onChange={() => toggleType(type)}
                                                />
                                                <div className="w-5 h-5 border-2 border-gray-300 rounded peer-checked:bg-[#e53e3e] peer-checked:border-[#e53e3e] transition-all duration-200 flex items-center justify-center">
                                                    <svg className={`w-3.5 h-3.5 text-white transition-opacity duration-200 ${selectedTypes.includes(type) ? "opacity-100" : "opacity-0"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
                                                        <polyline points="20 6 9 17 4 12" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <span className="text-gray-700 text-sm font-medium group-hover:text-[#e53e3e] transition-colors">{type}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Budget Panel */}
                        {activeTab === "Budget" && (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {budgetRanges.map((range) => (
                                    <button
                                        key={range}
                                        onClick={() => setSelectedBudget(selectedBudget === range ? "" : range)}
                                        className={`px-4 py-2.5 rounded-lg border text-xs font-bold transition-all ${selectedBudget === range
                                                ? "bg-red-50 border-[#e53e3e] text-[#e53e3e] shadow-sm"
                                                : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                                            }`}
                                    >
                                        {range}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Bedroom Panel */}
                        {activeTab === "Bedroom" && (
                            <div className="flex flex-wrap gap-3">
                                {bedroomOptions.map((opt) => (
                                    <button
                                        key={opt}
                                        onClick={() => toggleBedroom(opt)}
                                        className={`px-6 py-2.5 rounded-full border text-xs font-bold transition-all ${selectedBedrooms.includes(opt)
                                                ? "bg-[#e53e3e] border-[#e53e3e] text-white shadow-md transform scale-105"
                                                : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                                            }`}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Construction Status Panel */}
                        {activeTab === "Construction Status" && (
                            <div className="flex flex-col gap-4">
                                <label className="flex items-center gap-3 cursor-pointer group w-fit border-b border-gray-100 pb-2 mb-1">
                                    <div className="relative flex items-center">
                                        <input
                                            type="checkbox"
                                            className="peer hidden"
                                            checked={selectedStatus.length === constructionStatusOptions.length}
                                            onChange={() => {
                                                if (selectedStatus.length === constructionStatusOptions.length) {
                                                    setSelectedStatus([]);
                                                } else {
                                                    setSelectedStatus([...constructionStatusOptions]);
                                                }
                                            }}
                                        />
                                        <div className="w-5 h-5 border-2 border-gray-300 rounded peer-checked:bg-[#e53e3e] peer-checked:border-[#e53e3e] transition-all duration-200 flex items-center justify-center">
                                            <svg className={`w-3.5 h-3.5 text-white transition-opacity duration-200 ${selectedStatus.length === constructionStatusOptions.length ? "opacity-100" : "opacity-0"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        </div>
                                    </div>
                                    <span className="text-gray-900 text-sm font-bold group-hover:text-[#e53e3e] transition-colors">Select All</span>
                                </label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {constructionStatusOptions.map((opt) => (
                                        <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                                            <div className="relative flex items-center">
                                                <input
                                                    type="checkbox"
                                                    className="peer hidden"
                                                    checked={selectedStatus.includes(opt)}
                                                    onChange={() => toggleStatus(opt)}
                                                />
                                                <div className="w-5 h-5 border-2 border-gray-300 rounded peer-checked:bg-[#e53e3e] peer-checked:border-[#e53e3e] transition-all duration-200 flex items-center justify-center">
                                                    <svg className={`w-3.5 h-3.5 text-white transition-opacity duration-200 ${selectedStatus.includes(opt) ? "opacity-100" : "opacity-0"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
                                                        <polyline points="20 6 9 17 4 12" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <span className="text-gray-700 text-sm font-medium group-hover:text-[#e53e3e] transition-colors">{opt}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Posted By Panel */}
                        {activeTab === "Posted By" && (
                            <div className="flex flex-col gap-4">
                                <label className="flex items-center gap-3 cursor-pointer group w-fit border-b border-gray-100 pb-2 mb-1">
                                    <div className="relative flex items-center">
                                        <input
                                            type="checkbox"
                                            className="peer hidden"
                                            checked={selectedPostedBy.length === postedByOptions.length}
                                            onChange={() => {
                                                if (selectedPostedBy.length === postedByOptions.length) {
                                                    setSelectedPostedBy([]);
                                                } else {
                                                    setSelectedPostedBy([...postedByOptions]);
                                                }
                                            }}
                                        />
                                        <div className="w-5 h-5 border-2 border-gray-300 rounded peer-checked:bg-[#e53e3e] peer-checked:border-[#e53e3e] transition-all duration-200 flex items-center justify-center">
                                            <svg className={`w-3.5 h-3.5 text-white transition-opacity duration-200 ${selectedPostedBy.length === postedByOptions.length ? "opacity-100" : "opacity-0"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        </div>
                                    </div>
                                    <span className="text-gray-900 text-sm font-bold group-hover:text-[#e53e3e] transition-colors">Select All</span>
                                </label>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {postedByOptions.map((opt) => (
                                        <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                                            <div className="relative flex items-center">
                                                <input
                                                    type="checkbox"
                                                    className="peer hidden"
                                                    checked={selectedPostedBy.includes(opt)}
                                                    onChange={() => togglePostedBy(opt)}
                                                />
                                                <div className="w-5 h-5 border-2 border-gray-300 rounded peer-checked:bg-[#e53e3e] peer-checked:border-[#e53e3e] transition-all duration-200 flex items-center justify-center">
                                                    <svg className={`w-3.5 h-3.5 text-white transition-opacity duration-200 ${selectedPostedBy.includes(opt) ? "opacity-100" : "opacity-0"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
                                                        <polyline points="20 6 9 17 4 12" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <span className="text-gray-700 text-sm font-medium group-hover:text-[#e53e3e] transition-colors">{opt}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                    <button
                        className="text-[#e53e3e] text-xs font-bold hover:underline"
                        onClick={handleClearFilters}
                    >
                        Clear All Filters
                    </button>
                    <div className="flex items-center gap-3">
                        <button
                            className="px-6 py-2 text-gray-600 text-sm font-bold hover:bg-gray-200 rounded-lg transition-all"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            className="px-10 py-2 bg-[#e53e3e] text-white text-sm font-black rounded-lg hover:bg-[#c53030] shadow-md transition-all active:scale-95"
                            onClick={onClose}
                        >
                            Apply Filters
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

