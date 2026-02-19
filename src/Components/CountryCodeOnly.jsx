import React, { useState } from 'react';

const CountryCodeOnly = ({ 
  value = '+91', 
  onChange, 
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

  const selectedCountry = countryCodes.find(country => country.code === value) || countryCodes[0];

  const handleCountrySelect = (countryCode) => {
    onChange(countryCode);
    setIsDropdownOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => !disabled && setIsDropdownOpen(!isDropdownOpen)}
        disabled={disabled}
        className="flex items-center space-x-1 px-3 py-2 bg-white border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="text-lg">{selectedCountry.flag}</span>
        <span className="text-sm font-medium text-gray-700">{selectedCountry.code}</span>
        <svg 
          className={`w-4 h-4 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isDropdownOpen && (
        <div className="absolute z-50 top-full left-0 mt-1 w-72 bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 p-2">
            <input
              type="text"
              placeholder="Search country..."
              className="w-full px-3 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
            />
          </div>
          <div className="max-h-48 overflow-y-auto">
            {countryCodes.map((country) => (
              <button
                key={country.code}
                type="button"
                onClick={() => handleCountrySelect(country.code)}
                className="w-full px-3 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors flex items-center space-x-3"
              >
                <span className="text-lg">{country.flag}</span>
                <span className="text-sm font-medium text-gray-900">{country.code}</span>
                <span className="text-sm text-gray-500 truncate">{country.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

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

export default CountryCodeOnly;
