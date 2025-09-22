import React, { useState } from 'react';
import PriceTrendsCityPickerContainer from './PriceTrendsCityPickerContainer';
import PriceTrendsBanners from './PriceTrendsBanners';

export default function PriceTrendsPage() {
  const [activeTab, setActiveTab] = useState('cities');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-3xl font-bold text-gray-900">Property Price Trends</h1>
            <p className="mt-2 text-lg text-gray-600">
              Explore property prices, rental yields, and market trends across Indian cities
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('cities')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'cities'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Browse Cities
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'reports'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Market Reports
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'cities' ? (
          <div className="space-y-8">
            {/* City Picker */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Select a City for Price Analysis
              </h2>
              <PriceTrendsCityPickerContainer />
            </div>

            {/* Market Insights Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Market Insights</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Real-time Trends</h4>
                  <p className="text-gray-600 text-sm">Get the latest property price movements and market analysis</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Rental Yields</h4>
                  <p className="text-gray-600 text-sm">Compare rental income potential across different localities</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 8h6m6 0v8a2 2 0 01-2 2H6a2 2 0 01-2-2v-8a2 2 0 012-2h8a2 2 0 012 2z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Investment Guide</h4>
                  <p className="text-gray-600 text-sm">Make informed investment decisions with data-driven insights</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Banners and Reports */}
            <PriceTrendsBanners />

            {/* Additional Information */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Why Choose Our Price Trends?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Comprehensive Data</h4>
                  <p className="text-gray-600 text-sm">Access to thousands of property listings and market data points across India</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Real-time Updates</h4>
                  <p className="text-gray-600 text-sm">Get the most current market information and price movements</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Expert Analysis</h4>
                  <p className="text-gray-600 text-sm">Professional market insights and predictions from real estate experts</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">User-friendly Interface</h4>
                  <p className="text-gray-600 text-sm">Easy-to-use tools for comparing cities and analyzing market trends</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
