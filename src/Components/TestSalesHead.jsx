import React from 'react';
import { useAuth } from '../AuthContext';

const TestSalesHead = () => {
  const { isAuthenticated, isSalesHead, isAdmin, isHr, isContentWriter, agentData } = useAuth();

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-2xl mx-auto mt-8">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Sales Head Debug Test</h1>
      
      <div className="space-y-4">
        <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Authentication Status:</h2>
          <p className="text-gray-600 dark:text-gray-300">Is Authenticated: {isAuthenticated ? '✅ Yes' : '❌ No'}</p>
          <p className="text-gray-600 dark:text-gray-300">Is Sales Head: {isSalesHead ? '✅ Yes' : '❌ No'}</p>
          <p className="text-gray-600 dark:text-gray-300">Is Admin: {isAdmin ? '✅ Yes' : '❌ No'}</p>
          <p className="text-gray-600 dark:text-gray-300">Is HR: {isHr ? '✅ Yes' : '❌ No'}</p>
          <p className="text-gray-600 dark:text-gray-300">Is Content Writer: {isContentWriter ? '✅ Yes' : '❌ No'}</p>
        </div>

        <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">User Data:</h2>
          <p className="text-gray-600 dark:text-gray-300">Name: {agentData?.name || 'N/A'}</p>
          <p className="text-gray-600 dark:text-gray-300">Email: {agentData?.email || 'N/A'}</p>
          <p className="text-gray-600 dark:text-gray-300">Role: {agentData?.role || 'N/A'}</p>
        </div>

        <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">LocalStorage Data:</h2>
          <p className="text-gray-600 dark:text-gray-300">Token: {localStorage.getItem('myToken') ? '✅ Present' : '❌ Missing'}</p>
          <p className="text-gray-600 dark:text-gray-300">User Role: {localStorage.getItem('userRole') || '❌ Missing'}</p>
          <p className="text-gray-600 dark:text-gray-300">Agent Data: {localStorage.getItem('agentData') ? '✅ Present' : '❌ Missing'}</p>
        </div>

        <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Test Results:</h2>
          {isSalesHead ? (
            <div>
              <p className="text-green-600 font-semibold">✅ Sales Head role is working correctly!</p>
              <p className="text-gray-600 dark:text-gray-300">You should be able to access: /sales-head/dashboard</p>
            </div>
          ) : (
            <div>
              <p className="text-red-600 font-semibold">❌ Sales Head role is NOT detected</p>
              <p className="text-gray-600 dark:text-gray-300">Check the console logs and localStorage data above</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestSalesHead;
