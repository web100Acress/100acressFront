import React, { useState } from 'react';
import { LOCAL_TESTING_CONFIG } from '../config/localTesting.js';
import { MdInfo, MdCheckCircle, MdError, MdRefresh } from 'react-icons/md';

const LocalTestingHelper = () => {
  const [testResults, setTestResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const runApiTest = async () => {
    setIsLoading(true);
    const results = {
      apiBase: LOCAL_TESTING_CONFIG.getApiBase(),
      isLocalhost: LOCAL_TESTING_CONFIG.isLocalhost(),
      endpoints: LOCAL_TESTING_CONFIG.getBannerEndpoints(),
      tests: []
    };

    try {
      // Test API connectivity
      const response = await fetch(`${results.apiBase}/health`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      results.tests.push({
        name: 'API Health Check',
        status: response.ok ? 'success' : 'error',
        message: response.ok ? 'API is accessible' : `API returned ${response.status}`
      });

      // Test authentication
      const token = localStorage.getItem('myToken');
      results.tests.push({
        name: 'Authentication Token',
        status: token ? 'success' : 'error',
        message: token ? 'Token found' : 'No authentication token'
      });

      // Test banner endpoints
      if (token) {
        try {
          const bannerResponse = await fetch(results.endpoints.getAllBanners, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });

          results.tests.push({
            name: 'Banner API Access',
            status: bannerResponse.ok ? 'success' : 'error',
            message: bannerResponse.ok ? 'Banner API accessible' : `Banner API returned ${bannerResponse.status}`
          });
        } catch (error) {
          results.tests.push({
            name: 'Banner API Access',
            status: 'error',
            message: `Banner API error: ${error.message}`
          });
        }
      }

    } catch (error) {
      results.tests.push({
        name: 'API Connection',
        status: 'error',
        message: `Connection failed: ${error.message}`
      });
    }

    setTestResults(results);
    setIsLoading(false);
  };

  if (!LOCAL_TESTING_CONFIG.isLocalhost()) {
    return null; // Only show in localhost
  }

  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <MdInfo className="text-blue-600 text-xl" />
        <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200">
          Local Testing Helper
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300">API Base</div>
          <div className="text-sm text-gray-900 dark:text-gray-100 font-mono">
            {LOCAL_TESTING_CONFIG.getApiBase()}
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Environment</div>
          <div className="text-sm text-gray-900 dark:text-gray-100">
            {LOCAL_TESTING_CONFIG.isLocalhost() ? 'Local Development' : 'Production'}
          </div>
        </div>
      </div>

      <button
        onClick={runApiTest}
        disabled={isLoading}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
      >
        {isLoading ? (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
        ) : (
          <MdRefresh className="text-lg" />
        )}
        {isLoading ? 'Testing...' : 'Test API Connection'}
      </button>

      {testResults && (
        <div className="mt-4 space-y-2">
          <h4 className="font-medium text-gray-800 dark:text-gray-200">Test Results:</h4>
          {testResults.tests.map((test, index) => (
            <div key={index} className="flex items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded">
              {test.status === 'success' ? (
                <MdCheckCircle className="text-green-600" />
              ) : (
                <MdError className="text-red-600" />
              )}
              <span className="text-sm font-medium">{test.name}:</span>
              <span className={`text-sm ${
                test.status === 'success' ? 'text-green-600' : 'text-red-600'
              }`}>
                {test.message}
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 text-xs text-gray-600 dark:text-gray-400">
        💡 This helper only appears in localhost environment for safe testing
      </div>
    </div>
  );
};

export default LocalTestingHelper;
