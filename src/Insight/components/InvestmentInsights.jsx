import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminInsightsSidebar from './AdminInsightsSidebar';

export default function InvestmentInsights() {
  const [activeTab, setActiveTab] = useState('calculator');
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

      // EMI Calculation
      const monthlyRate = interestRate / 100 / 12;
      const numPayments = loanTenure * 12;

      const monthlyEMI = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments) /
                        (Math.pow(1 + monthlyRate, numPayments) - 1);

      const totalPayment = monthlyEMI * numPayments;
      const totalInterest = totalPayment - loanAmount;

      // Rental Yield
      const rentalYield = (monthlyRent * 12 / propertyPrice) * 100;

      // Net Income (after EMI)
      const netIncome = monthlyRent - monthlyEMI;

      // ROI Calculation (simplified)
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-[9000] w-full bg-white/80 backdrop-blur border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-green-100 text-green-600 flex items-center justify-center font-bold">💎</div>
            <h1 className="text-lg sm:text-xl font-semibold text-gray-800">Investment Insights</h1>
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

      <AdminInsightsSidebar />

      <div className="max-w-7xl mx-auto md:pl-[300px] px-4 sm:px-6 lg:px-8 py-6">
        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-wrap gap-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'calculator' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Calculator Inputs */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-6">Investment Calculator</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property Price (₹)
                  </label>
                  <input
                    type="number"
                    value={calculatorData.propertyPrice}
                    onChange={(e) => handleInputChange('propertyPrice', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                    placeholder="Enter property price"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Down Payment (₹)
                  </label>
                  <input
                    type="number"
                    value={calculatorData.downPayment}
                    onChange={(e) => handleInputChange('downPayment', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                    placeholder="Enter down payment"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Interest Rate (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={calculatorData.interestRate}
                    onChange={(e) => handleInputChange('interestRate', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                    placeholder="Enter interest rate"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loan Tenure (Years)
                  </label>
                  <input
                    type="number"
                    value={calculatorData.loanTenure}
                    onChange={(e) => handleInputChange('loanTenure', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                    placeholder="Enter loan tenure"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expected Monthly Rent (₹)
                  </label>
                  <input
                    type="number"
                    value={calculatorData.monthlyRent}
                    onChange={(e) => handleInputChange('monthlyRent', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                    placeholder="Enter expected rent"
                  />
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-6">Investment Analysis</h2>

              <div className="space-y-6">
                {/* EMI Details */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-800 mb-3">Loan Details</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-blue-600">Monthly EMI:</span>
                      <span className="font-semibold text-blue-800">{formatCurrency(results.monthlyEMI)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-600">Total Interest:</span>
                      <span className="font-semibold text-blue-800">{formatCurrency(results.totalInterest)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-600">Total Payment:</span>
                      <span className="font-semibold text-blue-800">{formatCurrency(results.totalPayment)}</span>
                    </div>
                  </div>
                </div>

                {/* Rental Analysis */}
                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="font-semibold text-green-800 mb-3">Rental Analysis</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-green-600">Rental Yield:</span>
                      <span className="font-semibold text-green-800">{results.rentalYield}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-600">Monthly Rental Income:</span>
                      <span className="font-semibold text-green-800">{formatCurrency(calculatorData.monthlyRent)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-600">Net Monthly Income:</span>
                      <span className={`font-semibold ${results.netIncome >= 0 ? 'text-green-800' : 'text-red-800'}`}>
                        {formatCurrency(results.netIncome)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* ROI */}
                <div className="bg-purple-50 rounded-lg p-4">
                  <h3 className="font-semibold text-purple-800 mb-3">Investment ROI</h3>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-800 mb-2">{results.roi}%</div>
                    <p className="text-purple-600 text-sm">Annual Return on Investment</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analysis' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">Market Analysis</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Market Sentiment</h3>
                <p className="text-blue-600">Bullish</p>
                <p className="text-sm text-blue-500 mt-2">Strong buyer confidence</p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">Investment Grade</h3>
                <p className="text-green-600">A+</p>
                <p className="text-sm text-green-500 mt-2">Excellent investment opportunity</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg">
                <h3 className="font-semibold text-purple-800 mb-2">Risk Level</h3>
                <p className="text-purple-600">Moderate</p>
                <p className="text-sm text-purple-500 mt-2">Balanced risk-return profile</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'trends' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">Investment Trends</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-gray-800">Emerging Investment Hotspots</h3>
                <p className="text-gray-600 mt-1">New areas showing high growth potential</p>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-semibold text-gray-800">Rental Yield Trends</h3>
                <p className="text-gray-600 mt-1">Increasing demand for rental properties</p>
              </div>

              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="font-semibold text-gray-800">Capital Appreciation</h3>
                <p className="text-gray-600 mt-1">Strong growth in property values</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'portfolio' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">Portfolio Insights</h2>
            <div className="text-center py-12">
              <div className="text-6xl mb-4">💼</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Portfolio Analysis Coming Soon</h3>
              <p className="text-gray-600">Advanced portfolio tracking and analysis tools will be available here.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
