import React from "react";
import InsightsSidebar from '../components/InsightsSidebar';

export default function InvestmentInsights() {
  return (
    <div>
      <InsightsSidebar />
      <div className="max-w-screen-xl mx-auto px-4 md:px-6 md:pl-[260px]" style={{ marginTop: 'calc(var(--nav-h, 64px) + 16px)' }}>
      <header className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Investment Insights</h1>
        <p className="text-gray-600">MVP – ROI Areas, Risk, Builder score (mock)</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border rounded-xl p-4 shadow-sm">
          <h2 className="font-semibold mb-2">Top ROI Areas</h2>
          <p className="text-sm text-gray-700">Coming soon</p>
        </div>
        <div className="bg-white border rounded-xl p-4 shadow-sm">
          <h2 className="font-semibold mb-2">Risk Analysis</h2>
          <p className="text-sm text-gray-700">Legal disputes, oversupply — coming soon</p>
        </div>
        <div className="bg-white border rounded-xl p-4 shadow-sm">
          <h2 className="font-semibold mb-2">Builder Reputation Score</h2>
          <p className="text-sm text-gray-700">Delays, quality, feedback — coming soon</p>
        </div>
      </div>
    </div>
    </div>
  );
}
