import React, { useMemo } from 'react';
import { Outlet } from "react-router-dom";
import DesktopInsightsSidebar, { useSidebarContext } from "./insightsidebar/desktopinsightsidebar";
import DesktopInsightsHeader from "./insightheader/desktopinsightheader";
import MobileInsightsSidebar from "./insightsidebar/mobileinsightsidebar";
import MobileInsightsHeader from "./insightheader/mobileinsightheader";
import { SidebarProvider } from "./insightsidebar/desktopinsightsidebar";
import { SidebarProvider as MobileSidebarProvider } from "./insightsidebar/SidebarContext";
import LocationPrompt from "./LocationPrompt";
import { LocationProvider } from "./LocationContext";
import api from "../../config/apiClient";
import showToast from "../../Utils/toastUtils";

// Quick Enquiry Modal Component (Same as ProjectLayout2)
const QuickEnquiryModal = ({ isOpen, onClose, pageName }) => {
  const [details, setDetails] = useState({ name: '', mobile: '' });
  const [countryCode, setCountryCode] = useState('+91'); // Default to India
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [buttonText, setButtonText] = useState('Submit');
  const [isLoading, setIsLoading] = useState(false);

  const countryCodes = [
    { code: '+93', name: 'Afghanistan', flag: '🇦🇫' },
    { code: '+355', name: 'Albania', flag: '🇦🇱' },
    { code: '+213', name: 'Algeria', flag: '🇩🇿' },
    { code: '+1', name: 'American Samoa', flag: '🇦🇸' },
    { code: '+376', name: 'Andorra', flag: '🇦🇩' },
    { code: '+244', name: 'Angola', flag: '🇦🇴' },
    { code: '+1', name: 'Anguilla', flag: '🇦🇮' },
    { code: '+1', name: 'Antigua & Barbuda', flag: '🇦🇬' },
    { code: '+54', name: 'Argentina', flag: '🇦🇷' },
    { code: '+374', name: 'Armenia', flag: '🇦🇲' },
    { code: '+297', name: 'Aruba', flag: '🇦🇼' },
    { code: '+61', name: 'Australia', flag: '🇦🇺' },
    { code: '+43', name: 'Austria', flag: '🇦🇹' },
    { code: '+994', name: 'Azerbaijan', flag: '🇦🇿' },
    { code: '+1', name: 'Bahamas', flag: '🇧🇸' },
    { code: '+973', name: 'Bahrain', flag: '🇧🇭' },
    { code: '+880', name: 'Bangladesh', flag: '🇧🇩' },
    { code: '+1', name: 'Barbados', flag: '🇧🇧' },
    { code: '+375', name: 'Belarus', flag: '🇧🇾' },
    { code: '+32', name: 'Belgium', flag: '🇧🇪' },
    { code: '+501', name: 'Belize', flag: '🇧🇿' },
    { code: '+229', name: 'Benin', flag: '🇧🇯' },
    { code: '+1', name: 'Bermuda', flag: '🇧🇲' },
    { code: '+975', name: 'Bhutan', flag: '🇧🇹' },
    { code: '+591', name: 'Bolivia', flag: '🇧🇴' },
    { code: '+387', name: 'Bosnia & Herzegovina', flag: '🇧🇦' },
    { code: '+267', name: 'Botswana', flag: '🇧🇼' },
    { code: '+55', name: 'Brazil', flag: '🇧🇷' },
    { code: '+246', name: 'British Indian Ocean Territory', flag: '🇮🇴' },
    { code: '+1', name: 'British Virgin Islands', flag: '🇻🇬' },
    { code: '+673', name: 'Brunei', flag: '🇧🇳' },
    { code: '+359', name: 'Bulgaria', flag: '�🇬' },
    { code: '+226', name: 'Burkina Faso', flag: '🇧🇫' },
    { code: '+257', name: 'Burundi', flag: '🇧�' },
    { code: '+855', name: 'Cambodia', flag: '�🇭' },
    { code: '+237', name: 'Cameroon', flag: '🇨🇲' },
    { code: '+1', name: 'Canada', flag: '🇨🇦' },
    { code: '+238', name: 'Cape Verde', flag: '🇨🇻' },
    { code: '+1', name: 'Cayman Islands', flag: '🇰🇾' },
    { code: '+236', name: 'Central African Republic', flag: '🇨🇫' },
    { code: '+235', name: 'Chad', flag: '🇹🇩' },
    { code: '+56', name: 'Chile', flag: '🇨🇱' },
    { code: '+86', name: 'China', flag: '🇨�' },
    { code: '+57', name: 'Colombia', flag: '🇨🇴' },
    { code: '+269', name: 'Comoros', flag: '🇰🇲' },
    { code: '+242', name: 'Congo - Brazzaville', flag: '🇨🇬' },
    { code: '+243', name: 'Congo - Kinshasa', flag: '🇨🇩' },
    { code: '+682', name: 'Cook Islands', flag: '🇨🇰' },
    { code: '+506', name: 'Costa Rica', flag: '🇨🇷' },
    { code: '+385', name: 'Croatia', flag: '🇭🇷' },
    { code: '+53', name: 'Cuba', flag: '🇨🇺' },
    { code: '+599', name: 'Curaçao', flag: '🇨🇼' },
    { code: '+357', name: 'Cyprus', flag: '🇨🇾' },
    { code: '+420', name: 'Czech Republic', flag: '🇨🇿' },
    { code: '+45', name: 'Denmark', flag: '🇩🇰' },
    { code: '+253', name: 'Djibouti', flag: '🇩🇯' },
    { code: '+1', name: 'Dominica', flag: '🇩🇲' },
    { code: '+1', name: 'Dominican Republic', flag: '🇩🇴' },
    { code: '+593', name: 'Ecuador', flag: '🇪🇨' },
    { code: '+20', name: 'Egypt', flag: '🇪🇬' },
    { code: '+503', name: 'El Salvador', flag: '🇸🇻' },
    { code: '+240', name: 'Equatorial Guinea', flag: '🇬🇶' },
    { code: '+291', name: 'Eritrea', flag: '🇪🇷' },
    { code: '+372', name: 'Estonia', flag: '🇪🇪' },
    { code: '+251', name: 'Ethiopia', flag: '🇪🇹' },
    { code: '+500', name: 'Falkland Islands', flag: '🇫🇰' },
    { code: '+298', name: 'Faroe Islands', flag: '🇫🇴' },
    { code: '+679', name: 'Fiji', flag: '🇫🇯' },
    { code: '+358', name: 'Finland', flag: '🇫🇮' },
    { code: '+33', name: 'France', flag: '🇫🇷' },
    { code: '+594', name: 'French Guiana', flag: '🇬🇫' },
    { code: '+689', name: 'French Polynesia', flag: '🇵🇫' },
    { code: '+241', name: 'Gabon', flag: '🇬🇦' },
    { code: '+220', name: 'Gambia', flag: '🇬🇲' },
    { code: '+995', name: 'Georgia', flag: '🇬🇪' },
    { code: '+49', name: 'Germany', flag: '🇩🇪' },
    { code: '+233', name: 'Ghana', flag: '🇬🇭' },
    { code: '+350', name: 'Gibraltar', flag: '🇬🇮' },
    { code: '+30', name: 'Greece', flag: '🇬🇷' },
    { code: '+299', name: 'Greenland', flag: '🇬🇱' },
    { code: '+1', name: 'Grenada', flag: '🇬🇩' },
    { code: '+1', name: 'Guadeloupe', flag: '🇬🇵' },
    { code: '+1', name: 'Guam', flag: '🇬🇺' },
    { code: '+502', name: 'Guatemala', flag: '🇬🇹' },
    { code: '+44', name: 'Guernsey', flag: '🇬🇬' },
    { code: '+224', name: 'Guinea', flag: '🇬🇳' },
    { code: '+245', name: 'Guinea-Bissau', flag: '🇬🇼' },
    { code: '+592', name: 'Guyana', flag: '🇬🇾' },
    { code: '+509', name: 'Haiti', flag: '🇭🇹' },
    { code: '+504', name: 'Honduras', flag: '🇭🇳' },
    { code: '+852', name: 'Hong Kong SAR China', flag: '🇭🇰' },
    { code: '+36', name: 'Hungary', flag: '��' },
    { code: '+354', name: 'Iceland', flag: '🇮🇸' },
    { code: '+91', name: 'India', flag: '🇮🇳' },
    { code: '+62', name: 'Indonesia', flag: '🇮🇩' },
    { code: '+98', name: 'Iran', flag: '🇮🇷' },
    { code: '+964', name: 'Iraq', flag: '🇮🇶' },
    { code: '+353', name: 'Ireland', flag: '🇮🇪' },
    { code: '+44', name: 'Isle of Man', flag: '🇮🇲' },
    { code: '+972', name: 'Israel', flag: '🇮🇱' },
    { code: '+39', name: 'Italy', flag: '🇮🇹' },
    { code: '+1', name: 'Jamaica', flag: '🇯🇲' },
    { code: '+81', name: 'Japan', flag: '🇯🇵' },
    { code: '+44', name: 'Jersey', flag: '🇯🇪' },
    { code: '+962', name: 'Jordan', flag: '🇯🇴' },
    { code: '+7', name: 'Kazakhstan', flag: '🇰🇿' },
    { code: '+254', name: 'Kenya', flag: '🇰🇪' },
    { code: '+686', name: 'Kiribati', flag: '🇰🇮' },
    { code: '+965', name: 'Kuwait', flag: '🇰🇼' },
    { code: '+996', name: 'Kyrgyzstan', flag: '🇰🇬' },
    { code: '+856', name: 'Laos', flag: '🇱🇦' },
    { code: '+371', name: 'Latvia', flag: '�🇻' },
    { code: '+961', name: 'Lebanon', flag: '🇱�' },
    { code: '+266', name: 'Lesotho', flag: '🇱🇸' },
    { code: '+231', name: 'Liberia', flag: '🇱🇷' },
    { code: '+218', name: 'Libya', flag: '🇱🇾' },
    { code: '+423', name: 'Liechtenstein', flag: '🇱🇮' },
    { code: '+370', name: 'Lithuania', flag: '🇱🇹' },
    { code: '+352', name: 'Luxembourg', flag: '🇱🇺' },
    { code: '+853', name: 'Macau SAR China', flag: '🇲🇴' },
    { code: '+389', name: 'Macedonia', flag: '🇲🇰' },
    { code: '+261', name: 'Madagascar', flag: '🇲🇬' },
    { code: '+265', name: 'Malawi', flag: '🇲🇼' },
    { code: '+60', name: 'Malaysia', flag: '🇲🇾' },
    { code: '+960', name: 'Maldives', flag: '🇲🇻' },
    { code: '+223', name: 'Mali', flag: '🇲🇱' },
    { code: '+356', name: 'Malta', flag: '🇲🇹' },
    { code: '+692', name: 'Marshall Islands', flag: '🇲🇭' },
    { code: '+596', name: 'Martinique', flag: '🇲🇶' },
    { code: '+222', name: 'Mauritania', flag: '🇲🇷' },
    { code: '+230', name: 'Mauritius', flag: '🇲🇺' },
    { code: '+262', name: 'Mayotte', flag: '🇾🇹' },
    { code: '+52', name: 'Mexico', flag: '🇲🇽' },
    { code: '+691', name: 'Micronesia', flag: '🇫🇲' },
    { code: '+373', name: 'Moldova', flag: '🇲🇩' },
    { code: '+377', name: 'Monaco', flag: '🇲🇨' },
    { code: '+976', name: 'Mongolia', flag: '🇲🇳' },
    { code: '+382', name: 'Montenegro', flag: '🇲🇪' },
    { code: '+1', name: 'Montserrat', flag: '🇲🇸' },
    { code: '+212', name: 'Morocco', flag: '🇲🇦' },
    { code: '+258', name: 'Mozambique', flag: '🇲🇿' },
    { code: '+95', name: 'Myanmar', flag: '🇲🇲' },
    { code: '+264', name: 'Namibia', flag: '🇳🇦' },
    { code: '+674', name: 'Nauru', flag: '🇳🇷' },
    { code: '+977', name: 'Nepal', flag: '🇳🇵' },
    { code: '+31', name: 'Netherlands', flag: '🇳🇱' },
    { code: '+599', name: 'Netherlands Antilles', flag: '🇦🇳' },
    { code: '+687', name: 'New Caledonia', flag: '🇳🇨' },
    { code: '+64', name: 'New Zealand', flag: '🇳🇿' },
    { code: '+505', name: 'Nicaragua', flag: '🇳🇮' },
    { code: '+227', name: 'Niger', flag: '🇳🇪' },
    { code: '+234', name: 'Nigeria', flag: '🇳🇬' },
    { code: '+683', name: 'Niue', flag: '🇳🇺' },
    { code: '+672', name: 'Norfolk Island', flag: '🇳🇫' },
    { code: '+850', name: 'North Korea', flag: '🇰🇵' },
    { code: '+1', name: 'Northern Mariana Islands', flag: '🇲🇵' },
    { code: '+47', name: 'Norway', flag: '🇳🇴' },
    { code: '+968', name: 'Oman', flag: '🇴🇲' },
    { code: '+92', name: 'Pakistan', flag: '🇵🇰' },
    { code: '+680', name: 'Palau', flag: '🇵🇼' },
    { code: '+970', name: 'Palestinian Territory', flag: '🇵🇸' },
    { code: '+507', name: 'Panama', flag: '🇵🇦' },
    { code: '+675', name: 'Papua New Guinea', flag: '🇵🇬' },
    { code: '+595', name: 'Paraguay', flag: '🇵🇾' },
    { code: '+51', name: 'Peru', flag: '🇵🇪' },
    { code: '+63', name: 'Philippines', flag: '🇵🇭' },
    { code: '+48', name: 'Poland', flag: '🇵🇱' },
    { code: '+351', name: 'Portugal', flag: '🇵🇹' },
    { code: '+1', name: 'Puerto Rico', flag: '🇵🇷' },
    { code: '+974', name: 'Qatar', flag: '🇶🇦' },
    { code: '+242', name: 'Republic of the Congo', flag: '🇨🇬' },
    { code: '+262', name: 'Réunion', flag: '🇷🇪' },
    { code: '+40', name: 'Romania', flag: '🇷🇴' },
    { code: '+7', name: 'Russia', flag: '🇷🇺' },
    { code: '+250', name: 'Rwanda', flag: '🇷🇼' },
    { code: '+590', name: 'Saint Barthélemy', flag: '🇧🇱' },
    { code: '+290', name: 'Saint Helena', flag: '🇸🇭' },
    { code: '+1', name: 'Saint Kitts & Nevis', flag: '🇰🇳' },
    { code: '+1', name: 'Saint Lucia', flag: '🇱🇨' },
    { code: '+508', name: 'Saint Martin', flag: '🇲🇫' },
    { code: '+1', name: 'Saint Pierre & Miquelon', flag: '🇵🇲' },
    { code: '+1', name: 'Saint Vincent & Grenadines', flag: '🇻🇨' },
    { code: '+685', name: 'Samoa', flag: '🇼🇸' },
    { code: '+378', name: 'San Marino', flag: '🇸🇲' },
    { code: '+239', name: 'São Tomé & Príncipe', flag: '🇸🇹' },
    { code: '+966', name: 'Saudi Arabia', flag: '🇸🇦' },
    { code: '+221', name: 'Senegal', flag: '🇸🇳' },
    { code: '+381', name: 'Serbia', flag: '🇷🇸' },
    { code: '+248', name: 'Seychelles', flag: '🇸🇨' },
    { code: '+232', name: 'Sierra Leone', flag: '🇸🇱' },
    { code: '+65', name: 'Singapore', flag: '🇸🇬' },
    { code: '+421', name: 'Slovakia', flag: '🇸🇰' },
    { code: '+386', name: 'Slovenia', flag: '🇸🇮' },
    { code: '+677', name: 'Solomon Islands', flag: '🇸🇧' },
    { code: '+252', name: 'Somalia', flag: '🇸🇴' },
    { code: '+27', name: 'South Africa', flag: '🇿🇦' },
    { code: '+82', name: 'South Korea', flag: '🇰🇷' },
    { code: '+34', name: 'Spain', flag: '🇪🇸' },
    { code: '+94', name: 'Sri Lanka', flag: '🇱🇰' },
    { code: '+249', name: 'Sudan', flag: '🇸🇩' },
    { code: '+597', name: 'Suriname', flag: '🇸🇷' },
    { code: '+268', name: 'Swaziland', flag: '🇸🇿' },
    { code: '+46', name: 'Sweden', flag: '🇸🇪' },
    { code: '+41', name: 'Switzerland', flag: '🇨🇭' },
    { code: '+963', name: 'Syria', flag: '🇸🇾' },
    { code: '+886', name: 'Taiwan', flag: '🇹🇼' },
    { code: '+992', name: 'Tajikistan', flag: '🇹🇯' },
    { code: '+255', name: 'Tanzania', flag: '🇹🇿' },
    { code: '+66', name: 'Thailand', flag: '🇹🇭' },
    { code: '+670', name: 'Timor-Leste', flag: '🇹🇱' },
    { code: '+228', name: 'Togo', flag: '🇹🇬' },
    { code: '+690', name: 'Tokelau', flag: '🇹🇰' },
    { code: '+676', name: 'Tonga', flag: '🇹🇴' },
    { code: '+1', name: 'Trinidad & Tobago', flag: '🇹🇹' },
    { code: '+216', name: 'Tunisia', flag: '🇹🇳' },
    { code: '+90', name: 'Turkey', flag: '🇹🇷' },
    { code: '+993', name: 'Turkmenistan', flag: '🇹🇲' },
    { code: '+1', name: 'Turks & Caicos Islands', flag: '🇹🇨' },
    { code: '+688', name: 'Tuvalu', flag: '🇹🇻' },
    { code: '+1', name: 'U.S. Virgin Islands', flag: '🇻🇮' },
    { code: '+256', name: 'Uganda', flag: '🇺🇬' },
    { code: '+380', name: 'Ukraine', flag: '🇺🇦' },
    { code: '+971', name: 'United Arab Emirates', flag: '🇦🇪' },
    { code: '+44', name: 'United Kingdom', flag: '🇬🇧' },
    { code: '+1', name: 'United States', flag: '🇺🇸' },
    { code: '+598', name: 'Uruguay', flag: '🇺🇾' },
    { code: '+998', name: 'Uzbekistan', flag: '🇺🇿' },
    { code: '+678', name: 'Vanuatu', flag: '🇻🇺' },
    { code: '+58', name: 'Venezuela', flag: '🇻🇪' },
    { code: '+84', name: 'Vietnam', flag: '🇻🇳' },
    { code: '+1', name: 'Wake Island', flag: '🇼🇰' },
    { code: '+681', name: 'Wallis & Futuna', flag: '🇼�' },
    { code: '+967', name: 'Yemen', flag: '🇾🇪' },
    { code: '+260', name: 'Zambia', flag: '🇿🇲' },
    { code: '+263', name: 'Zimbabwe', flag: '🇿🇼' }
  ];

  const selectedCountry = countryCodes.find(c => c.code === countryCode) || countryCodes[0];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  const resetData = () => {
    setDetails({ name: '', mobile: '' });
    setCountryCode('+91'); // Reset to India
    setButtonText('Submit');
    setIsLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    const { name, mobile } = details;
    
    if (!name || !mobile) {
      showToast.error('Please fill in all required fields', { style: { marginTop: '40vh' } });
      return;
    }

    // Validate mobile number (India)
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      showToast.error('Please enter a valid mobile number', { style: { marginTop: '40vh' } });
      return;
    }

    setIsLoading(true);
    setButtonText('Submitting...');
    
    try {
      // Generate generic email using user's name and phone - same as CallbackModal
      const genericEmail = `${name.toLowerCase().replace(/\s+/g, '')}.${mobile}@100acress.com`;
      
      // Same API as CallbackModal: userInsert
      const response = await api.post('userInsert', {
        name: name,
        email: genericEmail,
        mobile: mobile,
        projectName: pageName || "100acress Insight Page",
        address: "Insight Page Enquiry",
      });
      
      // If we reach here, the request was successful
      showToast.success('Enquiry submitted successfully! We will contact you soon.', { 
        style: { marginTop: '40vh' },
        duration: 4000 
      });
      
      console.log('Insight Quick Enquiry Submitted:', { name, mobile, page: pageName });
      
      // Close modal and reset - same as CallbackModal
      setTimeout(() => {
        resetData();
        if (typeof onClose === 'function') {
          onClose();
        }
        
        // Store multiple flags to prevent popup across all pages
        localStorage.setItem(`quick_enquiry_insights`, 'submitted');
        localStorage.setItem(`enquiry_submitted_insights`, 'submitted');
        localStorage.setItem('user_enquiry_submitted', 'true'); // Global flag
        localStorage.setItem('user_enquiry_timestamp', new Date().toISOString()); // Track when
      }, 500);
      
    } catch (error) {
      console.error('Insight Quick Enquiry API Error:', error);
      if (!error.isAxiosError || error.response) {
        // Only show error if it's a server error (not a network error) - same as CallbackModal
        showToast.error('Failed to submit request. Please try again.', { 
          style: { marginTop: '40vh' },
          duration: 4000 
        });
      }
    } finally {
      setIsLoading(false);
      setButtonText('Submit');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-xl w-11/12 max-w-md p-6">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Modal Header */}
        <div className="text-center mb-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Quick Enquiry
          </h3>
          <p className="text-sm text-gray-600">
            Get details about {pageName}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Name *
            </label>
            <input
              type="text"
              name="name"
              value={details.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Mobile Number *
            </label>
            <div className="flex">
              {/* Country Code Selector */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                  className="flex items-center justify-center px-3 py-4 bg-white border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 hover:bg-gray-50"
                >
                  <span className="text-sm font-medium text-gray-700">{selectedCountry.code}</span>
                  <svg className="w-4 h-4 text-gray-400 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isCountryDropdownOpen && (
                  <div className="absolute top-full left-0 z-50 mt-1 w-20 bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-y-auto">
                    {countryCodes.map((country) => (
                      <button
                        key={country.code}
                        type="button"
                        onClick={() => {
                          setCountryCode(country.code);
                          setIsCountryDropdownOpen(false);
                        }}
                        className="w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center justify-center"
                      >
                        <span className="text-lg">{country.flag}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Input */}
              <input
                type="tel"
                name="mobile"
                value={details.mobile}
                onChange={handleChange}
                required
                pattern="[6-9][0-9]{9}"
                maxLength="10"
                className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black"
                placeholder="Enter mobile number"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {buttonText}
            {buttonText === 'Submit' && (
              <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            )}
          </button>
        </form>

        <p className='text-xs text-gray-400 leading-relaxed pt-4 text-center'>
          * Your information will be kept strictly confidential and will not be shared, sold, or otherwise disclosed.
        </p>
      </div>
    </div>
  );
};

const DesktopLayoutContent = () => {
    const { collapsed } = useSidebarContext();
    const sidebarWidth = collapsed ? 72 : 240;

    return (
        <div
            className="flex-1 transition-all duration-300 min-w-0"
            style={{ marginLeft: `${sidebarWidth}px` }}
        >
            <DesktopInsightsHeader />
            <main className="pt-20 min-h-screen bg-gray-50">
                <Outlet />
            </main>
        </div>
    );
};

export default function InsightsLayout() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [isQuickEnquiryModalOpen, setIsQuickEnquiryModalOpen] = useState(false);

    React.useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    });

    // Check if user has already submitted any enquiry
    useEffect(() => {
        // Check if user has already submitted any enquiry for insights
        const quickEnquirySubmitted = localStorage.getItem('quick_enquiry_insights');
        const callbackSubmitted = localStorage.getItem('callback_insights');
        const anyEnquirySubmitted = localStorage.getItem('enquiry_submitted_insights');
        
        // Also check if user has submitted enquiry for any project (global flag)
        const globalEnquirySubmitted = localStorage.getItem('user_enquiry_submitted');
        
        // Don't show popup if user has already submitted any form
        // Temporarily disabled for testing - always show modal
        if (true) { // (!quickEnquirySubmitted && !callbackSubmitted && !anyEnquirySubmitted && !globalEnquirySubmitted) {
            // Show quick enquiry modal after 3 seconds for insight pages
            setTimeout(() => {
                setIsQuickEnquiryModalOpen(true);
            }, 3000);
        }
    });

    const getPageName = () => {
        const path = window.location.pathname;
        if (path.includes('/insights')) return 'Insights Page';
        if (path.includes('/investment')) return 'Investment Insights';
        if (path.includes('/guides')) return 'Property Guides';
        if (path.includes('/news')) return 'Property News';
        if (path.includes('/blog')) return 'Property Blog';
        return '100acress Insight';
    };

    return (
        <LocationProvider>
            <MobileSidebarProvider>
                <SidebarProvider>
                    {/* Desktop Layout */}
                    <div className="hidden md:flex">
                        <DesktopInsightsSidebar />
                        <DesktopLayoutContent />
                    </div>

                    {/* Mobile Layout */}
                    <div className="md:hidden">
                        <MobileInsightsHeader />
                        <MobileInsightsSidebar />
                        <main className="pt-32 min-h-screen bg-gray-50">
                            <LocationPrompt />
                            <Outlet />
                        </main>
                    </div>

                    {/* Quick Enquiry Modal for all Insight pages */}
                    <QuickEnquiryModal
                        isOpen={isQuickEnquiryModalOpen}
                        onClose={() => setIsQuickEnquiryModalOpen(false)}
                        pageName={getPageName()}
                    />
                </SidebarProvider>
            </MobileSidebarProvider>
        </LocationProvider>
    );
}
