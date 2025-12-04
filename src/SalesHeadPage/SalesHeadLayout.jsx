import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SalesHeadSidebar from './SalesHeadSidebar';
import SalesHeadHeader from './SalesHeadHeader';

const SalesHeadLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar - Desktop always visible, Mobile controlled by state */}
      <SalesHeadSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-[280px] min-w-0">
        {/* Header */}
        <SalesHeadHeader onMenuClick={handleMenuClick} />
        
        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default SalesHeadLayout;
