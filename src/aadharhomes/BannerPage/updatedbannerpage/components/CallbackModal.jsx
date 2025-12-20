import React, { useState, useCallback } from 'react';
import api from '../../../../config/apiClient';
import CountryCodeSelector from '../../../../Components/Actual_Components/CountryCodeSelector';
import { showNotification } from './SimpleNotification';

const CallbackModal = ({ isOpen, onClose, projectViewDetails = {}, projectTitle = "", location = "", onSuccess = null }) => {
  const [sideDetails, setSideDetails] = useState({ name: '', mobile: '', countryCode: '+91' });
  const [sideButtonText, setSideButtonText] = useState('Submit');
  const [isLoading, setIsLoading] = useState(false);

  // Country-specific phone validation rules
  const validatePhoneNumber = (phoneNumber, countryCode) => {
    const phone = phoneNumber.replace(/\s/g, ''); // Remove spaces
    
    switch (countryCode) {
      case '+91': // India
        return /^[6-9]\d{9}$/.test(phone);
      case '+1': // USA/Canada
        return /^[2-9]\d{2}[2-9]\d{2}\d{4}$/.test(phone);
      case '+44': // UK
        return /^[1-9]\d{9,10}$/.test(phone);
      case '+61': // Australia
        return /^[2-478]\d{8}$/.test(phone);
      case '+971': // UAE
        return /^[5]\d{8}$/.test(phone);
      case '+966': // Saudi Arabia
        return /^5\d{8}$/.test(phone);
      case '+65': // Singapore
        return /^[689]\d{7}$/.test(phone);
      case '+60': // Malaysia
        return /^[1]\d{8,9}$/.test(phone);
      case '+81': // Japan
        return /^[789]\d{8}$/.test(phone);
      case '+82': // South Korea
        return /^[1]\d{8,9}$/.test(phone);
      case '+86': // China
        return /^1[3-9]\d{9}$/.test(phone);
      case '+49': // Germany
        return /^[1]\d{10,11}$/.test(phone);
      case '+33': // France
        return /^[67]\d{8}$/.test(phone);
      case '+39': // Italy
        return /^[3]\d{8,9}$/.test(phone);
      case '+34': // Spain
        return /^[67]\d{8}$/.test(phone);
      case '+31': // Netherlands
        return /^[6]\d{8}$/.test(phone);
      case '+46': // Sweden
        return /^[7]\d{8}$/.test(phone);
      case '+47': // Norway
        return /^[4-9]\d{7}$/.test(phone);
      case '+358': // Finland
        return /^[4-5]\d{7,8}$/.test(phone);
      case '+45': // Denmark
        return /^[2-9]\d{7}$/.test(phone);
      case '+41': // Switzerland
        return /^[7]\d{8}$/.test(phone);
      case '+43': // Austria
        return /^[6]\d{8,12}$/.test(phone);
      case '+32': // Belgium
        return /^[4]\d{8}$/.test(phone);
      case '+48': // Poland
        return /^[5-8]\d{8}$/.test(phone);
      case '+420': // Czech Republic
        return /^[6-7]\d{8}$/.test(phone);
      case '+36': // Hungary
        return /^[2-9]\d{8,9}$/.test(phone);
      case '+40': // Romania
        return /^[2-9]\d{8}$/.test(phone);
      case '+30': // Greece
        return /^[2]\d{9}$/.test(phone);
      case '+90': // Turkey
        return /^[5]\d{9}$/.test(phone);
      case '+20': // Egypt
        return /^[1]\d{8}$/.test(phone);
      case '+27': // South Africa
        return /^[6-8]\d{8}$/.test(phone);
      case '+234': // Nigeria
        return /^[7-9]\d{9}$/.test(phone);
      case '+254': // Kenya
        return /^[7]\d{8}$/.test(phone);
      case '+212': // Morocco
        return /^[6-7]\d{8}$/.test(phone);
      case '+213': // Algeria
        return /^[5-7]\d{8}$/.test(phone);
      case '+216': // Tunisia
        return /^[2-9]\d{7}$/.test(phone);
      default:
        // Generic validation for other countries - 7-15 digits
        return /^\d{7,15}$/.test(phone);
    }
  };

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
      showNotification('Please fill in all required fields', 'error');
      return;
    }

    // Validate phone number based on country code
    if (!validatePhoneNumber(mobile, countryCode)) {
      const countryName = countryCode === '+91' ? 'India' : 
                        countryCode === '+1' ? 'USA/Canada' :
                        countryCode === '+44' ? 'UK' :
                        countryCode === '+61' ? 'Australia' :
                        countryCode === '+971' ? 'UAE' :
                        countryCode === '+966' ? 'Saudi Arabia' :
                        countryCode === '+65' ? 'Singapore' :
                        countryCode === '+60' ? 'Malaysia' :
                        countryCode === '+81' ? 'Japan' :
                        countryCode === '+82' ? 'South Korea' :
                        countryCode === '+86' ? 'China' :
                        countryCode === '+49' ? 'Germany' :
                        countryCode === '+33' ? 'France' :
                        countryCode === '+39' ? 'Italy' :
                        countryCode === '+34' ? 'Spain' :
                        countryCode === '+31' ? 'Netherlands' :
                        countryCode === '+46' ? 'Sweden' :
                        countryCode === '+47' ? 'Norway' :
                        countryCode === '+358' ? 'Finland' :
                        countryCode === '+45' ? 'Denmark' :
                        countryCode === '+41' ? 'Switzerland' :
                        countryCode === '+43' ? 'Austria' :
                        countryCode === '+32' ? 'Belgium' :
                        countryCode === '+48' ? 'Poland' :
                        countryCode === '+420' ? 'Czech Republic' :
                        countryCode === '+36' ? 'Hungary' :
                        countryCode === '+40' ? 'Romania' :
                        countryCode === '+30' ? 'Greece' :
                        countryCode === '+90' ? 'Turkey' :
                        countryCode === '+20' ? 'Egypt' :
                        countryCode === '+27' ? 'South Africa' :
                        countryCode === '+234' ? 'Nigeria' :
                        countryCode === '+254' ? 'Kenya' :
                        countryCode === '+212' ? 'Morocco' :
                        countryCode === '+213' ? 'Algeria' :
                        countryCode === '+216' ? 'Tunisia' :
                        'your country';
      
      showNotification(`Please enter a valid ${countryName} phone number`, 'error');
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
      showNotification('Callback Requested Successfully', 'success');
      resetData();
      
      // Close the modal after a short delay
      setTimeout(() => {
        if (typeof onClose === 'function') {
          onClose();
        }
        // Call success callback if provided (for unlocking images)
        if (typeof onSuccess === 'function') {
          onSuccess();
        }
      }, 500);
      
    } catch (error) {
      console.error('CallbackModal API Error:', error);
      if (!error.isAxiosError || error.response) {
        // Only show error if it's a server error (not a network error)
        showNotification('Failed to submit request. Please try again.', 'error');
      }
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
