import React from 'react';

export default function LoanEligibility() {
  const [monthlyIncome, setMonthlyIncome] = React.useState(100000);
  const [monthlyObligations, setMonthlyObligations] = React.useState(15000);
  const [interestRate, setInterestRate] = React.useState(9); // annual %
  const [tenureYears, setTenureYears] = React.useState(20);
  const [foir, setFoir] = React.useState(0.5); // 50% default

  const monthlyRate = interestRate / 12 / 100;
  const months = tenureYears * 12;

  const emiCapacity = Math.max(0, monthlyIncome * foir - monthlyObligations);

  const eligibleAmount = React.useMemo(() => {
    if (monthlyRate <= 0 || months <= 0) return 0;
    // Invert EMI formula: P = E * ( (1+r)^n - 1 ) / ( r * (1+r)^n )
    const pow = Math.pow(1 + monthlyRate, months);
    const principal = emiCapacity * ((pow - 1) / (monthlyRate * pow));
    return Number.isFinite(principal) ? principal : 0;
  }, [emiCapacity, monthlyRate, months]);

  const fmt = (n) => n.toLocaleString(undefined, { maximumFractionDigits: 0 });

  return (
    <div className="min-h-screen bg-transparent">
      <main className="flex-1 bg-transparent p-4 md:p-6 mt-6">
        <div className="max-w-5xl mx-auto w-full space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Loan Eligibility</h1>
            <p className="text-sm text-gray-500 mt-1">Quick calculator using FOIR method (EMI capacity based on income).</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Income (₹)</label>
                  <input type="number" value={monthlyIncome}
                    onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Obligations (₹)</label>
                  <input type="number" value={monthlyObligations}
                    onChange={(e) => setMonthlyObligations(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Interest Rate (p.a. %)</label>
                  <input type="number" step="0.01" value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tenure (years)</label>
                  <input type="number" value={tenureYears}
                    onChange={(e) => setTenureYears(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">FOIR (portion of income for EMIs)</label>
                  <select value={foir}
                    onChange={(e) => setFoir(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value={0.4}>40%</option>
                    <option value={0.5}>50% (default)</option>
                    <option value={0.6}>60%</option>
                  </select>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-3 text-sm text-gray-600">
                <div className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-md">EMI Capacity: ₹{fmt(emiCapacity)}</div>
                <div className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-md">Rate: {interestRate}% p.a.</div>
                <div className="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-md">Tenure: {tenureYears} yrs</div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <div className="text-sm text-gray-500 mb-2">Estimated Eligibility</div>
              <div className="text-3xl font-bold text-gray-900">₹{fmt(eligibleAmount)}</div>
              <div className="mt-3 text-sm text-gray-600">
                This is an estimate. Actual eligibility may vary as per lender policies.
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
