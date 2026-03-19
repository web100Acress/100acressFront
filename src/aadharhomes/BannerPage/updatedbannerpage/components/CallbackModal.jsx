import React, { useState, useCallback } from 'react';
import api from '../../../../config/apiClient';
import CountryCodeSelector from '../../../../Components/Actual_Components/CountryCodeSelector';
import { showNotification } from './SimpleNotification';
import './CallbackModal.css';

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
    <div className="callback-modal-overlay">
      <div className="callback-modal-container">
        <div className="callback-modal-header">
          <p className="callback-modal-header-title">
            Instant Callback
          </p>
          <button
            className="callback-modal-header-close"
            onClick={onClose}
          >
            ✖
          </button>
        </div>

        <form onSubmit={sideSubmitDetails} className="callback-modal-form">
          {/* Name Field */}
          <div className="callback-modal-field">
            <label className="callback-modal-label">
              Full Name <span className="callback-modal-label-required">*</span>
            </label>
            <div className="callback-modal-input-wrapper">
              <svg className="callback-modal-input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <input
                className="callback-modal-input"
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
          <div className="callback-modal-field">
            <label className="callback-modal-label">
              Mobile Number <span className="callback-modal-label-required">*</span>
            </label>
            <div className="callback-modal-phone-container">
              <CountryCodeSelector
                selectedCountryCode={sideDetails.countryCode}
                onCountryCodeChange={handleCountryCodeChange}
                phoneNumber={sideDetails.mobile}
                onPhoneNumberChange={handlePhoneNumberChange}
                placeholder="Enter phone number"
                className="callback-modal-phone-selector"
              />
            </div>
          </div>


          {/* Submit Button */}
          <div className="callback-modal-submit">
            <button
              type="submit"
              disabled={isLoading}
              className="callback-modal-submit-btn"
            >
              <span className="callback-modal-submit-btn-text">
                {sideButtonText}
              </span>
              {!isLoading && (
                <svg className="callback-modal-submit-btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              )}
            </button>
          </div>

          <p className='callback-modal-disclaimer'>* Your information will be kept strictly confidential and will not be shared, sold, or otherwise disclosed.</p>
        </form>
      </div>
    </div>
  );
};

export default CallbackModal;
