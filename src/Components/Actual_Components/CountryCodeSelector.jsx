import React, { useState } from 'react';

const CountryCodeSelector = ({ 
  selectedCountryCode = '+91', 
  onCountryCodeChange, 
  phoneNumber = '', 
  onPhoneNumberChange,
  placeholder = "Enter phone number",
  className = "",
  disabled = false 
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const countryCodes = [
    { code: '+91', country: 'IN', name: 'India', flag: '🇮🇳' },
    { code: '+1', country: 'US', name: 'United States', flag: '🇺🇸' },
    { code: '+44', country: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
    { code: '+61', country: 'AU', name: 'Australia', flag: '🇦🇺' },
    { code: '+971', country: 'AE', name: 'UAE', flag: '🇦🇪' },
    { code: '+65', country: 'SG', name: 'Singapore', flag: '🇸🇬' },
    { code: '+60', country: 'MY', name: 'Malaysia', flag: '🇲🇾' },
    { code: '+66', country: 'TH', name: 'Thailand', flag: '🇹🇭' },
    { code: '+81', country: 'JP', name: 'Japan', flag: '🇯🇵' },
    { code: '+82', country: 'KR', name: 'South Korea', flag: '🇰🇷' },
    { code: '+86', country: 'CN', name: 'China', flag: '🇨🇳' },
    { code: '+49', country: 'DE', name: 'Germany', flag: '🇩🇪' },
    { code: '+33', country: 'FR', name: 'France', flag: '🇫🇷' },
    { code: '+39', country: 'IT', name: 'Italy', flag: '🇮🇹' },
    { code: '+34', country: 'ES', name: 'Spain', flag: '🇪🇸' },
    { code: '+7', country: 'RU', name: 'Russia', flag: '🇷🇺' },
    { code: '+55', country: 'BR', name: 'Brazil', flag: '🇧🇷' },
    { code: '+52', country: 'MX', name: 'Mexico', flag: '🇲🇽' },
    { code: '+27', country: 'ZA', name: 'South Africa', flag: '🇿🇦' },
    { code: '+20', country: 'EG', name: 'Egypt', flag: '🇪🇬' }
  ];

  const selectedCountry = countryCodes.find(country => country.code === selectedCountryCode) || countryCodes[0];

  const handleCountrySelect = (countryCode) => {
    onCountryCodeChange(countryCode);
    setIsDropdownOpen(false);
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    // Allow only numbers, spaces, hyphens, and parentheses
    const cleanValue = value.replace(/[^\d\s\-\(\)]/g, '');
    onPhoneNumberChange(cleanValue);
  };

  const formatPhoneNumber = (number) => {
    // Basic formatting for display
    const cleaned = number.replace(/\D/g, '');
    if (cleaned.length <= 3) return cleaned;
    if (cleaned.length <= 6) return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
    if (cleaned.length <= 10) return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
  };

  return (
    <div className={`relative ${className}`}>
      <div className="flex w-full">
        {/* Country Code Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            disabled={disabled}
            className="flex items-center px-2 md:px-3 py-3 md:py-4 bg-gray-800/70 border border-gray-600 border-r-0 rounded-l-xl text-white hover:bg-gray-700/70 focus:ring-2 focus:ring-amber-400 focus:outline-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="text-base md:text-lg mr-1">{selectedCountry.flag}</span>
            <span className="text-xs md:text-sm font-medium mr-1">{selectedCountry.code}</span>
            <svg 
              className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute top-full left-0 z-50 w-full sm:w-64 max-w-[calc(100vw-2rem)] mt-1 bg-gray-800 border border-gray-600 rounded-lg shadow-xl max-h-60 overflow-y-auto">
              {countryCodes.map((country) => (
                <button
                  key={country.code}
                  type="button"
                  onClick={() => handleCountrySelect(country.code)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-700 focus:bg-gray-700 focus:outline-none transition-colors duration-200 flex items-center space-x-3"
                >
                  <span className="text-lg">{country.flag}</span>
                  <span className="text-sm font-medium text-amber-400">{country.code}</span>
                  <span className="text-sm text-gray-300 truncate">{country.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Phone Number Input */}
        <input
          type="tel"
          value={phoneNumber}
          onChange={handlePhoneChange}
          placeholder={placeholder}
          disabled={disabled}
          className="flex-1 min-w-0 px-4 py-3 md:py-4 bg-gray-800/70 border border-gray-600 rounded-r-xl text-white focus:ring-2 focus:ring-amber-400 focus:outline-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
        />
      </div>

      {/* Click outside to close dropdown */}
      {isDropdownOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </div>
  );
};

export default CountryCodeSelector;
