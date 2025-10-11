import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HrSidebar from './HrSidebar';
import HrDashboard from './HrDashboard';

const Hr = () => {
  return (
    <div className="flex bg-gray-50 dark:bg-gray-900 dark:text-white min-h-screen">
      <HrSidebar />
      <div className="flex-1 p-4 ml-56 overflow-auto font-sans">
        <Routes>
          <Route path="/" element={<HrDashboard />} />
          <Route path="/dashboard" element={<HrDashboard />} />
          <Route path="/employees" element={<div className="p-6"><h1 className="text-3xl font-bold text-gray-800 dark:text-white">Employee Management</h1><p className="mt-4 text-gray-600 dark:text-gray-300">Manage employee records and information.</p></div>} />
          <Route path="/payroll" element={<div className="p-6"><h1 className="text-3xl font-bold text-gray-800 dark:text-white">Payroll Management</h1><p className="mt-4 text-gray-600 dark:text-gray-300">Handle payroll processing and salary management.</p></div>} />
          <Route path="/attendance" element={<div className="p-6"><h1 className="text-3xl font-bold text-gray-800 dark:text-white">Attendance Management</h1><p className="mt-4 text-gray-600 dark:text-gray-300">Track employee attendance and working hours.</p></div>} />
          <Route path="/recruitment" element={<div className="p-6"><h1 className="text-3xl font-bold text-gray-800 dark:text-white">Recruitment</h1><p className="mt-4 text-gray-600 dark:text-gray-300">Manage job postings and recruitment process.</p></div>} />
          <Route path="/reports" element={<div className="p-6"><h1 className="text-3xl font-bold text-gray-800 dark:text-white">HR Reports</h1><p className="mt-4 text-gray-600 dark:text-gray-300">Generate and view HR analytics and reports.</p></div>} />
        </Routes>
      </div>
    </div>
  );
};

export default Hr;
