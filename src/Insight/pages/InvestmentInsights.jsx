import React, { useState, useEffect } from 'react';
import InsightsSidebar from '../components/InsightsSidebar';
import Navbar from "../../aadharhomes/navbar/Navbar";

export default function InvestmentInsights() {
  const [activeTab, setActiveTab] = useState('calculator');
  const [searchQuery, setSearchQuery] = useState('');
  const [calculatorData, setCalculatorData] = useState({
    propertyPrice: 5000000,
    downPayment: 1000000,
    loanAmount: 4000000,
    interestRate: 8.5,
    loanTenure: 20,
    monthlyRent: 25000
  });

  const [results, setResults] = useState({
    monthlyEMI: 0,
    totalInterest: 0,
    totalPayment: 0,
    rentalYield: 0,
    netIncome: 0,
    roi: 0
  });

  const tabs = [
    { id: 'calculator', label: 'Investment Calculator', icon: '🧮' },
    { id: 'analysis', label: 'Market Analysis', icon: '📊' },
    { id: 'trends', label: 'Investment Trends', icon: '📈' },
    { id: 'portfolio', label: 'Portfolio Insights', icon: '💼' }
  ];

  // Calculate EMI and other metrics
  useEffect(() => {
    const calculateInvestment = () => {
      const { propertyPrice, downPayment, loanAmount, interestRate, loanTenure, monthlyRent } = calculatorData;

      const monthlyRate = interestRate / 100 / 12;
      const numPayments = loanTenure * 12;

      const monthlyEMI = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments) /
                        (Math.pow(1 + monthlyRate, numPayments) - 1);

      const totalPayment = monthlyEMI * numPayments;
      const totalInterest = totalPayment - loanAmount;
      const rentalYield = (monthlyRent * 12 / propertyPrice) * 100;
      const netIncome = monthlyRent - monthlyEMI;
      const totalInvestment = downPayment;
      const annualReturn = netIncome * 12;
      const roi = (annualReturn / totalInvestment) * 100;

      setResults({
        monthlyEMI: Math.round(monthlyEMI),
        totalInterest: Math.round(totalInterest),
        totalPayment: Math.round(totalPayment),
        rentalYield: Number(rentalYield.toFixed(2)),
        netIncome: Math.round(netIncome),
        roi: Number(roi.toFixed(2))
      });
    };

    calculateInvestment();
  }, [calculatorData]);

  const handleInputChange = (field, value) => {
    setCalculatorData(prev => ({
      ...prev,
      [field]: Number(value)
    }));
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
    <Navbar />
    <InsightsSidebar />

      <div className="max-w-7xl mx-auto md:pl-[300px] px-4 sm:px-6 lg:px-8 py-6">
        {/* Luxury Banner */}
        <div className="relative mb-8 rounded-3xl overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 opacity-95"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIiBzdHJva2Utd2lkdGg9IjIiLz48L2c+PC9zdmc+')] opacity-10"></div>
          
          <div className="relative px-8 py-12 md:py-16">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                Luxury Real Estate
                <span className="block bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                  Investment Insights
                </span>
              </h1>
              
              <p className="text-white/80 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
                Discover exclusive investment opportunities in premium properties with data-driven insights and expert analysis
              </p>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 rounded-2xl blur-lg opacity-60 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative flex items-center bg-white rounded-2xl shadow-2xl overflow-hidden h-14">
                    <div className="pl-5 pr-2">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search properties, locations, or investment insights..."
                      className="flex-1 py-0 pr-4 text-gray-800 placeholder-gray-400 bg-transparent focus:outline-none text-sm h-full"
                    />
                    <button className="m-1 px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg text-sm">
                      Search
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 mt-10 max-w-3xl mx-auto">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                  <div className="text-3xl font-bold text-white mb-1">₹250Cr+</div>
                  <div className="text-white/70 text-sm">Properties Listed</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                  <div className="text-3xl font-bold text-white mb-1">12.5%</div>
                  <div className="text-white/70 text-sm">Avg. ROI</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                  <div className="text-3xl font-bold text-white mb-1">5000+</div>
                  <div className="text-white/70 text-sm">Happy Investors</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/50 p-6 mb-6">
          <div className="flex flex-wrap gap-3">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105'
                    : 'text-gray-700 hover:bg-gray-100 hover:scale-105'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'calculator' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Calculator Inputs */}
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/50 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🧮</span>
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Investment Calculator
                </h2>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Property Price (₹)
                  </label>
                  <input
                    type="number"
                    value={calculatorData.propertyPrice}
                    onChange={(e) => handleInputChange('propertyPrice', e.target.value)}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Enter property price"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Down Payment (₹)
                  </label>
                  <input
                    type="number"
                    value={calculatorData.downPayment}
                    onChange={(e) => handleInputChange('downPayment', e.target.value)}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Enter down payment"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Interest Rate (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={calculatorData.interestRate}
                    onChange={(e) => handleInputChange('interestRate', e.target.value)}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Enter interest rate"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Loan Tenure (Years)
                  </label>
                  <input
                    type="number"
                    value={calculatorData.loanTenure}
                    onChange={(e) => handleInputChange('loanTenure', e.target.value)}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Enter loan tenure"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Expected Monthly Rent (₹)
                  </label>
                  <input
                    type="number"
                    value={calculatorData.monthlyRent}
                    onChange={(e) => handleInputChange('monthlyRent', e.target.value)}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Enter expected rent"
                  />
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/50 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">📊</span>
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Investment Analysis
                </h2>
              </div>

              <div className="space-y-5">
                {/* EMI Details */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-200 shadow-sm">
                  <h3 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
                    <span className="text-lg">💳</span>
                    Loan Details
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-blue-700 font-medium">Monthly EMI:</span>
                      <span className="font-bold text-blue-900 text-lg">{formatCurrency(results.monthlyEMI)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-700 font-medium">Total Interest:</span>
                      <span className="font-bold text-blue-900">{formatCurrency(results.totalInterest)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-700 font-medium">Total Payment:</span>
                      <span className="font-bold text-blue-900">{formatCurrency(results.totalPayment)}</span>
                    </div>
                  </div>
                </div>

                {/* Rental Analysis */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-200 shadow-sm">
                  <h3 className="font-bold text-green-900 mb-4 flex items-center gap-2">
                    <span className="text-lg">🏠</span>
                    Rental Analysis
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-green-700 font-medium">Rental Yield:</span>
                      <span className="font-bold text-green-900 text-lg">{results.rentalYield}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-green-700 font-medium">Monthly Rental Income:</span>
                      <span className="font-bold text-green-900">{formatCurrency(calculatorData.monthlyRent)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-green-700 font-medium">Net Monthly Income:</span>
                      <span className={`font-bold text-lg ${results.netIncome >= 0 ? 'text-green-900' : 'text-red-900'}`}>
                        {formatCurrency(results.netIncome)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* ROI */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200 shadow-sm">
                  <h3 className="font-bold text-purple-900 mb-4 flex items-center gap-2 justify-center">
                    <span className="text-lg">💎</span>
                    Investment ROI
                  </h3>
                  <div className="text-center">
                    <div className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                      {results.roi}%
                    </div>
                    <p className="text-purple-700 font-medium">Annual Return on Investment</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analysis' && (
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/50 p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-3">
              <span className="text-3xl">📊</span>
              Market Analysis
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-100 via-blue-50 to-indigo-100 p-8 rounded-2xl shadow-lg border border-blue-200 hover:scale-105 transition-transform duration-300">
                <div className="text-4xl mb-4">📈</div>
                <h3 className="font-bold text-blue-900 mb-2 text-lg">Market Sentiment</h3>
                <p className="text-2xl font-bold text-blue-700 mb-2">Bullish</p>
                <p className="text-sm text-blue-600">Strong buyer confidence</p>
              </div>

              <div className="bg-gradient-to-br from-green-100 via-green-50 to-emerald-100 p-8 rounded-2xl shadow-lg border border-green-200 hover:scale-105 transition-transform duration-300">
                <div className="text-4xl mb-4">⭐</div>
                <h3 className="font-bold text-green-900 mb-2 text-lg">Investment Grade</h3>
                <p className="text-2xl font-bold text-green-700 mb-2">A+</p>
                <p className="text-sm text-green-600">Excellent investment opportunity</p>
              </div>

              <div className="bg-gradient-to-br from-purple-100 via-purple-50 to-pink-100 p-8 rounded-2xl shadow-lg border border-purple-200 hover:scale-105 transition-transform duration-300">
                <div className="text-4xl mb-4">⚖️</div>
                <h3 className="font-bold text-purple-900 mb-2 text-lg">Risk Level</h3>
                <p className="text-2xl font-bold text-purple-700 mb-2">Moderate</p>
                <p className="text-sm text-purple-600">Balanced risk-return profile</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'trends' && (
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/50 p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-3">
              <span className="text-3xl">📈</span>
              Investment Trends
            </h2>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-6 py-4 bg-gradient-to-r from-blue-50 to-transparent rounded-r-xl hover:shadow-md transition-shadow">
                <h3 className="font-bold text-gray-900 text-lg mb-2">Emerging Investment Hotspots</h3>
                <p className="text-gray-600">New areas showing high growth potential with premium amenities</p>
              </div>

              <div className="border-l-4 border-green-500 pl-6 py-4 bg-gradient-to-r from-green-50 to-transparent rounded-r-xl hover:shadow-md transition-shadow">
                <h3 className="font-bold text-gray-900 text-lg mb-2">Rental Yield Trends</h3>
                <p className="text-gray-600">Increasing demand for rental properties in luxury segments</p>
              </div>

              <div className="border-l-4 border-purple-500 pl-6 py-4 bg-gradient-to-r from-purple-50 to-transparent rounded-r-xl hover:shadow-md transition-shadow">
                <h3 className="font-bold text-gray-900 text-lg mb-2">Capital Appreciation</h3>
                <p className="text-gray-600">Strong growth in property values across premium locations</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'portfolio' && (
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/50 p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-3">
              <span className="text-3xl">💼</span>
              Portfolio Insights
            </h2>
            <div className="text-center py-16">
              <div className="text-8xl mb-6">💼</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Portfolio Analysis Coming Soon</h3>
              <p className="text-gray-600 text-lg max-w-md mx-auto">Advanced portfolio tracking and analysis tools will be available here to help you manage your investments.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}