import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Home } from 'lucide-react';
import showToast from '../Utils/toastUtils';

const UploadSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    showToast.success('Documents uploaded successfully!');
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <CheckCircle className="text-green-500 w-16 h-16 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Documents Uploaded Successfully!</h2>
        <p className="text-gray-600 mb-6">
          Your documents have been submitted and are now under verification.
          You will be notified once the verification process is complete.
        </p>
        <button
          onClick={() => {
            showToast.success('Navigating to home...');
            navigate('/');
          }}
          className="inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Home className="w-4 h-4 mr-2" />
          Go Home
        </button>
      </div>
    </div>
  );
};

export default UploadSuccess;
