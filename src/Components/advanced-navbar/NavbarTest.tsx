'use client';

import React from 'react';
import AdvancedNavbar from './AdvancedNavbar';

export default function NavbarTest() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdvancedNavbar />
      
      {/* Test Content */}
      <div className="pt-24 px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Advanced Navbar Test
          </h1>
          
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Navigation Test Instructions</h2>
            <ul className="space-y-2 text-gray-600">
              <li>✅ Hover over <strong>Home</strong> - Should show Quick Links mega menu</li>
              <li>✅ Hover over <strong>Properties</strong> - Should show properties mega menu</li>
              <li>✅ Hover over <strong>Countries</strong> - Should show countries mega menu</li>
              <li>✅ Hover over <strong>Projects</strong> - Should show projects mega menu</li>
              <li>✅ Hover over <strong>Services</strong> - Should show services mega menu</li>
              <li>✅ Hover over <strong>Resources</strong> - Should show resources mega menu</li>
              <li>✅ Hover over <strong>About</strong> - Should show about mega menu</li>
            </ul>
          </div>

          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Features Working</h3>
            <ul className="space-y-1 text-blue-700">
              <li>🎯 Three-column mega menu layout</li>
              <li>⌨️ Full keyboard navigation (Arrow keys, Enter, Escape)</li>
              <li>📱 Mobile responsive with slide-out drawer</li>
              <li>🎨 Smooth animations and transitions</li>
              <li>🏷️ Badge system (Hot, Premium, Featured, New)</li>
              <li>🔍 Search integration</li>
              <li>👤 User authentication buttons</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
