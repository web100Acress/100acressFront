import React from "react";
import InsightsSidebar from '../components/InsightsSidebar';

export default function LocationIntelligence() {
  return (
    <div>
      <InsightsSidebar />
      <div className="max-w-screen-xl mx-auto px-4 md:px-6 md:pl-[260px]" style={{ marginTop: 'calc(var(--nav-h, 64px) + 16px)' }}>
      <header className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Location Intelligence</h1>
        <p className="text-gray-600">MVP – Locality score, commute and infra projects (mock)</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border rounded-xl p-4 shadow-sm">
          <h2 className="font-semibold mb-2">Live Locality Score</h2>
          <p className="text-sm text-gray-700">Safety, schools, hospitals, transport — coming soon.</p>
        </div>
        <div className="bg-white border rounded-xl p-4 shadow-sm">
          <h2 className="font-semibold mb-2">Commute Analysis</h2>
          <p className="text-sm text-gray-700">Travel times to IT parks, metro, CBD — coming soon.</p>
        </div>
        <div className="bg-white border rounded-xl p-4 shadow-sm">
          <h2 className="font-semibold mb-2">Infra Projects Nearby</h2>
          <p className="text-sm text-gray-700">New highways, airports, metro lines — coming soon.</p>
        </div>
        <div className="bg-white border rounded-xl p-4 shadow-sm">
          <h2 className="font-semibold mb-2">Heatmaps</h2>
          <p className="text-sm text-gray-700">Price, rental yield, demand — heatmaps placeholder.</p>
        </div>
      </div>
    </div>
    </div>
  );
}
