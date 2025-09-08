import React, { useState, useCallback } from 'react';
import { message } from 'antd';
import api from '../../../../config/apiClient';

const CallbackModal = ({ isOpen, onClose, projectViewDetails = {}, projectTitle = "", location = "", onSuccess = null }) => {
  const [sideDetails, setSideDetails] = useState({ name: '', mobile: '', email: '' });
  const [sideButtonText, setSideButtonText] = useState('Submit');
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeSide = (e) => {
    const { name, value } = e.target;
    setSideDetails({ ...sideDetails, [name]: value });
  };

  const resetData = () => {
    setSideDetails({ name: '', mobile: '', email: '' });
    setSideButtonText('Submit');
    setIsLoading(false);
  };

  const sideSubmitDetails = useCallback(async (e) => {
    e.preventDefault();
    if (isLoading) return;

    const { name, mobile } = sideDetails;
    if (!name || !mobile) {
      message.error('Please fill in all required fields');
      return;
    }

    if (!/^([+]\d{2})?\d{10}$/.test(mobile)) {
      message.error('Please enter a valid 10-digit mobile number');
      return;
    }

    setIsLoading(true);
    setSideButtonText('Submitting...');
    
    try {
      await api.post('userInsert', {
        ...sideDetails,
        projectName: projectViewDetails.projectName || projectTitle,
        address: projectViewDetails.projectAddress || location,
      });
      message.success('Callback Requested Successfully');
      resetData();
      onClose();
      // Call success callback if provided (for unlocking images)
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      message.error('Failed to submit request. Please try again.');
      setSideButtonText('Submit');
      setIsLoading(false);
    }
  }, [isLoading, sideDetails, projectViewDetails, projectTitle, location, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-75">
      <div className="relative w-[19rem] sm:w-full md:w-[20rem] mx-auto my-4 overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-2xl max-w-lg border border-amber-500/20">
        <div className="bg-gradient-to-r from-amber-600 to-amber-500 px-5 py-3 text-center text-black relative">
          <p className="font-bold text-xl mb-0 text-center tracking-wider">
            Instant Callback
          </p>
          <button
            className="text-black text-2xl absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer hover:text-gray-800 transition-colors"
            onClick={onClose}
          >
            ✖
          </button>
        </div>

        <form onSubmit={sideSubmitDetails} className="space-y-4 px-6 py-6">
          {/* Name Field */}
          <div className="relative">
            <svg className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <input
              className="peer w-full pl-12 pr-4 py-3 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-amber-500 border border-gray-600 outline-none placeholder-transparent transition-all duration-300"
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChangeSide}
              value={sideDetails.name}
              required
            />
            <span className="absolute left-9 -top-2 px-2 bg-gray-800 text-amber-400 text-sm transition-all duration-300 transform scale-75 pointer-events-none peer-placeholder-shown:top-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-gray-400 peer-focus:-top-2 peer-focus:bg-gray-800 peer-focus:text-amber-400">
              Full Name *
            </span>
          </div>

          {/* Mobile Field */}
          <div className="relative">
            <svg className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21L6.16 10.928c-.652.35-.974 1.089-.734 1.767C6.364 15.177 8.823 17.636 11.305 18.574c.678.24 1.417-.082 1.767-.734l1.541-4.064a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <input
              className="peer w-full pl-12 pr-4 py-3 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-amber-500 border border-gray-600 outline-none placeholder-transparent transition-all duration-300"
              type="tel"
              name="mobile"
              placeholder="Mobile Number"
              required
              value={sideDetails.mobile}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value) && value.length <= 10) {
                  handleChangeSide(e);
                }
              }}
            />
            <span className="absolute left-9 -top-2 px-2 bg-gray-800 text-amber-400 text-sm transition-all duration-300 transform scale-75 pointer-events-none peer-placeholder-shown:top-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-gray-400 peer-focus:-top-2 peer-focus:bg-gray-800 peer-focus:text-amber-400">
              Mobile Number *
            </span>
          </div>

          {/* Email Field */}
          <div className="relative">
            <svg className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <input
              className="peer w-full pl-12 pr-4 py-3 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-amber-500 border border-gray-600 outline-none placeholder-transparent transition-all duration-300"
              type="email"
              name="email"
              placeholder="Email (Optional)"
              onChange={handleChangeSide}
              value={sideDetails.email}
            />
            <span className="absolute left-9 -top-2 px-2 bg-gray-800 text-amber-400 text-sm transition-all duration-300 transform scale-75 pointer-events-none peer-placeholder-shown:top-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-gray-400 peer-focus:-top-2 peer-focus:bg-gray-800 peer-focus:text-amber-400">
              Email (Optional)
            </span>
          </div>

          <p className='text-xs text-gray-400 leading-relaxed'>* Your information will be kept strictly confidential and will not be shared, sold, or otherwise disclosed.</p>

          {/* Submit Button */}
          <div className="flex justify-center pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="group w-full rounded-lg bg-gradient-to-r from-amber-600 to-amber-500 px-8 py-3 font-bold text-black border-2 border-transparent outline-none relative overflow-hidden transition-all duration-300 hover:from-amber-500 hover:to-amber-400 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <span className="relative inline-block transition-all duration-300">
                {sideButtonText}
              </span>
              {!isLoading && (
                <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CallbackModal;
