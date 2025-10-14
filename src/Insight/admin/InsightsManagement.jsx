        import React from "react";
    import AdminInsightsSidebar from "../components/AdminInsightsSidebar";
    import { Link } from "react-router-dom";

// Admin Insights Management screen
// This page intentionally does NOT include the Admin sidebar so that the Insights
// fixed sidebar can occupy the left side cleanly.
export default function InsightsManagement() {
  return (
    <>
      <AdminInsightsSidebar />
      <div className="min-h-screen bg-gray-50 md:pl-[300px]">
        {/* Top header bar */}
        <div className="sticky top-0 z-[9000] w-full bg-white/80 backdrop-blur border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">IN</div>
              <h1 className="text-lg sm:text-xl font-semibold text-gray-800">Insights Dashboard</h1>
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

          {/* Management Cards */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {/* Price Trends card */}
            <Link to="/Admin/insights/price-trends" className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md">
              <div className="absolute -right-10 -top-10 w-28 h-28 rounded-full bg-indigo-100 group-hover:bg-indigo-200 transition" />
              <div className="relative flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white grid place-items-center font-bold shadow">PT</div>
                <div className="min-w-0">
                  <div className="text-sm text-gray-500">Section</div>
                  <div className="text-base font-semibold text-gray-900">Price Trends Banners</div>
                </div>
              </div>
              <div className="mt-3 text-sm text-gray-600">Hero + Small banners ko manage karein. Upload, delete aur preview.</div>
              <div className="mt-4 inline-flex items-center gap-2 text-indigo-700 text-sm font-medium">
                Manage
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M10 17l5-5-5-5v10z"/></svg>
              </div>
            </Link>

            {/* Property Insights card */}
            <Link to="/Admin/insights/property-insights" className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md">
              <div className="absolute -right-10 -top-10 w-28 h-28 rounded-full bg-emerald-100 group-hover:bg-emerald-200 transition" />
              <div className="relative flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white grid place-items-center font-bold shadow">PI</div>
                <div className="min-w-0">
                  <div className="text-sm text-gray-500">Section</div>
                  <div className="text-base font-semibold text-gray-900">Property Insights Banners</div>
                </div>
              </div>
              <div className="mt-3 text-sm text-gray-600">Hero + Small banners ko manage karein. Upload, delete aur preview.</div>
              <div className="mt-4 inline-flex items-center gap-2 text-emerald-700 text-sm font-medium">
                Manage
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M10 17l5-5-5-5v10z"/></svg>
              </div>
            </Link>

            {/* Quick guide card */}
            <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
              <div className="absolute -right-10 -top-10 w-28 h-28 rounded-full bg-amber-100" />
              <div className="relative">
                <div className="text-sm text-gray-500">Help</div>
                <div className="text-base font-semibold text-gray-900">Uploading tips</div>
                <ul className="mt-3 text-sm text-gray-600 list-disc pl-5 space-y-1">
                  <li>Hero banner: desktop image recommended</li>
                  <li>Small banner: desktop + mobile image optional</li>
                  <li>Slug auto-tagged to Insights section</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        </>
    );
  }
