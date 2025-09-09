import React, { useState, useCallback } from 'react';
import { message } from 'antd';
import api from '../../../../config/apiClient';
import CountryCodeSelector from '../../../../Components/Actual_Components/CountryCodeSelector';

const CallbackModal = ({ isOpen, onClose, projectViewDetails = {}, projectTitle = "", location = "", onSuccess = null }) => {
  const [sideDetails, setSideDetails] = useState({ name: '', mobile: '', countryCode: '+91' });
  const [sideButtonText, setSideButtonText] = useState('Submit');
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeSide = (e) => {
    const { name, value } = e.target;
    setSideDetails({ ...sideDetails, [name]: value });
  };

  const resetData = () => {
    setSideDetails({ name: '', mobile: '', countryCode: '+91' });
    setSideButtonText('Submit');
    setIsLoading(false);
  };

  const handleCountryCodeChange = (countryCode) => {
    setSideDetails({ ...sideDetails, countryCode });
  };

  const handlePhoneNumberChange = (mobile) => {
    setSideDetails({ ...sideDetails, mobile });
  };

  const sideSubmitDetails = useCallback(async (e) => {
    e.preventDefault();
    if (isLoading) return;

    const { name, mobile, countryCode } = sideDetails;
    const fullPhoneNumber = `${countryCode}${mobile}`;
    
    // Generate generic email using user's name and phone
    const genericEmail = `${name.toLowerCase().replace(/\s+/g, '')}.${mobile}@100acress.com`;
    
    if (!name || !mobile) {
      message.error('Please fill in all required fields');
      return;
    }

    if (mobile.length < 7) {
      message.error('Please enter a valid mobile number');
      return;
    }

    setIsLoading(true);
    setSideButtonText('Submitting...');
    
    try {
      const response = await api.post('userInsert', {
        name: sideDetails.name,
        email: genericEmail,
        mobile: fullPhoneNumber,
        projectName: projectViewDetails.projectName || projectTitle || "100acress Property Inquiry",
        address: projectViewDetails.projectAddress || location || "Callback Modal",
      });
      
      // If we reach here, the request was successful
      message.success('Callback Requested Successfully');
      resetData();
      onClose();
      // Call success callback if provided (for unlocking images)
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('CallbackModal API Error:', error);
      message.error('Failed to submit request. Please try again.');
    } finally {
      setIsLoading(false);
      setSideButtonText('Submit');
    }
  }, [isLoading, sideDetails, projectViewDetails, projectTitle, location, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-75 p-4">
      <div className="relative w-full max-w-md mx-auto overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-2xl border border-amber-500/20">
        <div className="bg-gradient-to-r from-amber-600 to-amber-500 px-6 py-4 text-center text-black relative">
          <p className="font-bold text-xl mb-0 text-center tracking-wider">
            Instant Callback
          </p>
          <button
            className="text-black text-2xl absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer hover:text-gray-800 transition-colors"
            onClick={onClose}
          >
            ✖
          </button>
        </div>

        <form onSubmit={sideSubmitDetails} className="space-y-5 px-6 py-6">
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
          <div className="space-y-2">
            <label className="block text-sm font-medium text-amber-400">
              Mobile Number *
            </label>
            <CountryCodeSelector
              selectedCountryCode={sideDetails.countryCode}
              onCountryCodeChange={handleCountryCodeChange}
              phoneNumber={sideDetails.mobile}
              onPhoneNumberChange={handlePhoneNumberChange}
              placeholder="Enter phone number"
              className="w-full"
            />
          </div>


          <p className='text-xs text-gray-400 leading-relaxed mt-4'>* Your information will be kept strictly confidential and will not be shared, sold, or otherwise disclosed.</p>

          {/* Submit Button */}
          <div className="flex justify-center pt-4">
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
