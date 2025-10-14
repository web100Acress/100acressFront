import React, { useEffect, useState } from 'react';
import api from '../config/apiClient';

const ApiTest = () => {
  const [status, setStatus] = useState('Testing...');
  const [apiUrl, setApiUrl] = useState('');
  const [testResult, setTestResult] = useState(null);
  const [loading, setLoading] = useState(true);

  const testApiConnection = async (endpoint = '/health') => {
    try {
      setLoading(true);
      setStatus(`Testing connection to ${endpoint}...`);
      
      const response = await api.get(endpoint);
      setTestResult({
        success: true,
        status: response.status,
        data: response.data,
        config: {
          url: response.config.url,
          baseURL: response.config.baseURL,
          headers: response.config.headers
        }
      });
      setStatus(`✅ Successfully connected to ${endpoint}`);
    } catch (error) {
      console.error('API Test Error:', error);
      setTestResult({
        success: false,
        error: error.message,
        response: error.response?.data,
        status: error.response?.status,
        config: error.config
      });
      setStatus(`❌ Failed to connect to ${endpoint}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Test default health endpoint
    testApiConnection('/health');
  }, []);

  const handleCustomTest = (e) => {
    e.preventDefault();
    if (apiUrl) {
      testApiConnection(apiUrl);
    }
  };

  return (
    <div style={{ fontFamily: "'Rubik', sans-serif", padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>API Connection Tester</h2>
      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '5px' }}>
        <h3>Status: {status}</h3>
        
        <form onSubmit={handleCustomTest} style={{ margin: '15px 0' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              type="text"
              value={apiUrl}
              onChange={(e) => setApiUrl(e.target.value)}
              placeholder="Enter API endpoint (e.g., /api/endpoint)"
              style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
            />
            <button 
              type="submit" 
              style={{
                padding: '8px 16px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
              disabled={loading}
            >
              {loading ? 'Testing...' : 'Test Endpoint'}
            </button>
          </div>
        </form>
      </div>

      {testResult && (
        <div style={{ 
          marginTop: '20px',
          padding: '15px',
          backgroundColor: testResult.success ? '#e8f5e9' : '#ffebee',
          borderRadius: '5px',
          overflowX: 'auto'
        }}>
          <h3>Test Results:</h3>
          <pre style={{ 
            backgroundColor: '#fff', 
            padding: '10px', 
            borderRadius: '4px',
            maxHeight: '400px',
            overflowY: 'auto'
          }}>
            {JSON.stringify(testResult, null, 2)}
          </pre>
        </div>
      )}

      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#e3f2fd', borderRadius: '5px' }}>
        <h3>Common API Endpoints:</h3>
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px', flexWrap: 'wrap' }}>
          <button 
            onClick={() => testApiConnection('/health')}
            style={commonButtonStyle}
          >
            Health Check
          </button>
          <button 
            onClick={() => testApiConnection('/api/properties')}
            style={commonButtonStyle}
          >
            Properties
          </button>
          <button 
            onClick={() => testApiConnection('/api/users/me')}
            style={commonButtonStyle}
          >
            User Profile
          </button>
        </div>
      </div>
    </div>
  );
};

const commonButtonStyle = {
  padding: '8px 12px',
  backgroundColor: '#2196F3',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '14px'
};

export default ApiTest;
