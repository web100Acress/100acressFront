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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-sm bg-black/60 p-4">
      <div className="relative w-full max-w-lg mx-auto overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-black shadow-2xl shadow-orange-500/20 border border-orange-500/20 animate-in fade-in-0 zoom-in-95 duration-300">
        <div className="bg-gradient-to-r from-orange-500 to-yellow-500 px-6 py-3 text-center text-black relative">
          <p className="font-semibold text-lg mb-0 text-center tracking-wider">
            Instant Callback
          </p>
          <button
            className="text-black text-xl absolute top-1/2 right-5 transform -translate-y-1/2 cursor-pointer hover:rotate-90 transition-transform duration-300"
            onClick={onClose}
          >
            ✖
          </button>
        </div>

        <form onSubmit={sideSubmitDetails} className="space-y-6 px-8 py-8">
          {/* Name Field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white">
              Full Name <span className="text-orange-400">*</span>
            </label>
            <div className="relative">
              <svg className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <input
                className="w-full h-12 pl-12 pr-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none transition-all duration-300"
                type="text"
                name="name"
                placeholder="Enter your full name"
                onChange={handleChangeSide}
                value={sideDetails.name}
                required
              />
            </div>
          </div>

          {/* Mobile Field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white">
              Mobile Number <span className="text-orange-400">*</span>
            </label>
            <div className="h-auto">
              <CountryCodeSelector
                selectedCountryCode={sideDetails.countryCode}
                onCountryCodeChange={handleCountryCodeChange}
                phoneNumber={sideDetails.mobile}
                onPhoneNumberChange={handlePhoneNumberChange}
                placeholder="Enter phone number"
                className="w-full [&>div>div>button]:!h-12 [&>div>div>button]:!py-2 [&>div>input]:!h-12 [&>div>input]:!py-2"
              />
            </div>
          </div>


          {/* Submit Button */}
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="group w-full rounded-xl bg-gradient-to-r from-orange-500 to-yellow-500 px-8 py-3 font-bold text-black border-2 border-transparent outline-none relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105 hover:from-orange-400 hover:to-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <span className="relative inline-block transition-all duration-300">
                {sideButtonText}
              </span>
              {!isLoading && (
                <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              )}
            </button>
          </div>

          <p className='text-xs text-gray-400 leading-relaxed pt-2'>* Your information will be kept strictly confidential and will not be shared, sold, or otherwise disclosed.</p>
        </form>
      </div>
    </div>
  );
};

export default CallbackModal;
