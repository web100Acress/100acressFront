import React, { useContext, useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../../../../config/apiClient";
import { DataContext } from "../../../../../MyContext";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import DOMPurify from 'dompurify';
import { Calendar, Clock, Eye, User, X, Phone, Send } from 'lucide-react';
import { FALLBACK_IMG } from '../../../../../Utils/imageUtils';
import Footer from "../../../../../Home/Footer/CrimsonEleganceFooter";
import FAQSection from "../../../../Actual_Components/FAQSection";

const ModernBlogView = () => {
  const { allupcomingProject } = useContext(DataContext);
  const spotlight = useSelector(store => store?.project?.spotlight);
  const [data, setData] = useState({});
  const [loadError, setLoadError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [headings, setHeadings] = useState([]);
  const [showStickyHeader, setShowStickyHeader] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", mobile: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quickFormData, setQuickFormData] = useState({ name: "", mobile: "" });
  const [isQuickSubmitting, setIsQuickSubmitting] = useState(false);
  const [countryCode, setCountryCode] = useState('+91'); // Default to India
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const countryDropdownRef = useRef(null);
  const { id, slug } = useParams();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target)) {
        setIsCountryDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
    { code: '+359', name: 'Bulgaria', flag: '🇧🇬' },
    { code: '+226', name: 'Burkina Faso', flag: '🇧🇫' },
    { code: '+257', name: 'Burundi', flag: '🇧🇮' },
    { code: '+855', name: 'Cambodia', flag: '🇰🇭' },
    { code: '+237', name: 'Cameroon', flag: '🇨🇲' },
    { code: '+1', name: 'Canada', flag: '🇨🇦' },
    { code: '+238', name: 'Cape Verde', flag: '🇨🇻' },
    { code: '+1', name: 'Cayman Islands', flag: '🇰🇾' },
    { code: '+236', name: 'Central African Republic', flag: '🇨🇫' },
    { code: '+235', name: 'Chad', flag: '🇹🇩' },
    { code: '+56', name: 'Chile', flag: '🇨🇱' },
    { code: '+86', name: 'China', flag: '🇨🇳' },
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
    { code: '+36', name: 'Hungary', flag: '🇭🇺' },
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
    { code: '+371', name: 'Latvia', flag: '🇱🇻' },
    { code: '+961', name: 'Lebanon', flag: '🇱🇧' },
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
    { code: '+1', name: 'Netherlands Antilles', flag: '🇦🇳' },
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
    { code: '+40', name: 'Romania', flag: '🇷🇴' },
    { code: '+7', name: 'Russia', flag: '🇷🇺' },
    { code: '+250', name: 'Rwanda', flag: '🇷🇼' },
    { code: '+590', name: 'Saint Barthélemy', flag: '🇧🇱' },
    { code: '+290', name: 'Saint Helena', flag: '🇸🇭' },
    { code: '+1', name: 'Saint Kitts & Nevis', flag: '🇰🇳' },
    { code: '+1', name: 'Saint Lucia', flag: '🇱🇨' },
    { code: '+508', name: 'Saint Pierre & Miquelon', flag: '🇵🇲' },
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
    { code: '+379', name: 'Vatican City', flag: '🇻🇦' },
    { code: '+58', name: 'Venezuela', flag: '🇻🇪' },
    { code: '+84', name: 'Vietnam', flag: '🇻🇳' },
    { code: '+1', name: 'Wake Island', flag: '🇼🇰' },
    { code: '+681', name: 'Wallis & Futuna', flag: '🇼🇫' },
    { code: '+967', name: 'Yemen', flag: '🇾🇪' },
    { code: '+260', name: 'Zambia', flag: '��' },
    { code: '+263', name: 'Zimbabwe', flag: '🇿🇼' }
  ];

  const selectedCountry = countryCodes.find(c => c.code === countryCode) || countryCodes[0];

  // Extract headings from HTML content
  const extractHeadings = (htmlContent) => {
    if (!htmlContent) return [];
    
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    
    const headingElements = tempDiv.querySelectorAll('h1, h2, h3');
    const extractedHeadings = [];
    let h1Count = 0;
    let h2Count = 0;
    
    headingElements.forEach((heading, index) => {
      const level = parseInt(heading.tagName[1]);
      const text = heading.textContent.trim();
      const id = `heading-${index}`;
      
      // Set ID on original heading for linking
      heading.id = id;
      
      let number = '';
      if (level === 1) {
        h1Count++;
        h2Count = 0;
        number = `${h1Count}`;
      } else if (level === 2) {
        h2Count++;
        number = `${h1Count}.${h2Count}`;
      } else if (level === 3) {
        number = `${h1Count}.${h2Count}.${h2Count}`;
      }
      
      extractedHeadings.push({
        id,
        text,
        level,
        number
      });
    });
    
    return extractedHeadings;
  };

  // Fetch blog data
  useEffect(() => {
    const fetchBlog = async () => {
      setIsLoading(true);
      try {
        let response;
        
        if (slug) {
          response = await api.get(`blog/by-slug/${encodeURIComponent(slug)}`);
        } else if (id) {
          response = await api.get(`blog/by-slug/${encodeURIComponent(id)}`);
        }
        
        if (response.data?.data) {
          setData(response.data.data);
        } else {
          setLoadError("Blog post not found");
        }
        setIsLoading(false);
      } catch (error) {
        setLoadError("Failed to load blog post");
        setIsLoading(false);
      }
    };

    if (id || slug) {
      fetchBlog();
      // Auto-open enquiry form after a short delay once blog starts loading
      const timer = setTimeout(() => {
        setShowEnquiryModal(true);
      }, 1000); // 1 second delay

      const interval = setInterval(() => {
        setShowEnquiryModal((prev) => (prev ? prev : true));
      }, 15000); // re-open after every 15 seconds

      return () => {
        clearTimeout(timer);
        clearInterval(interval);
      };
    } else {
      setLoadError("No blog post specified");
      setIsLoading(false);
    }
  }, [id, slug]);

  // Extract headings when data changes
  useEffect(() => {
    if (data?.blog_Content || data?.blog_Description) {
      const content = data.blog_Content || data.blog_Description;
      const extractedHeadings = extractHeadings(content);
      setHeadings(extractedHeadings);
    }
  }, [data]);

  // Fetch related blogs
  useEffect(() => {
    const fetchRelatedBlogs = async () => {
      try {
        const response = await api.get('blog/view', {
          params: {
            limit: 6,
            sortBy: 'createdAt',
            sortOrder: 'desc'
          }
        });
        
        if (response?.data?.data) {
          // Filter out current blog and take first 6
          const filtered = response.data.data.filter(blog => blog._id !== data._id).slice(0, 6);
          setRelatedBlogs(filtered);
        }
      } catch (error) {
        console.error('Error fetching related blogs:', error);
      }
    };

    if (data._id) {
      fetchRelatedBlogs();
    }
  }, [data._id]);

  // Scroll handler for sticky header
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Calculate hero section height (approximately 60vh + padding)
      const heroSection = document.querySelector('section.relative.overflow-hidden');
      const heroHeight = heroSection ? heroSection.offsetHeight : windowHeight * 0.6;
      const triggerPoint = heroHeight * 0.4; // 40% of hero section
      
      // Show/hide sticky header
      if (scrollY > triggerPoint) {
        setShowStickyHeader(true);
      } else {
        setShowStickyHeader(false);
      }
      
      // Calculate scroll progress
      const progress = ((scrollY - triggerPoint) / (documentHeight - triggerPoint - windowHeight)) * 100;
      setScrollProgress(Math.min(Math.max(progress, 0), 100));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Image handling
  const blogImage = data.blog_Image?.cdn_url || 
                   data.blog_Image?.url || 
                   data.blog_Image?.Location || 
                   FALLBACK_IMG;

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric", 
      year: "numeric",
    });
  };

  // Calculate reading time
  const getReadingTime = (description) => {
    const words = description?.replace(/<[^>]*>/g, "").split(" ").length || 0;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
  };

  // Blog link helper
  const blogLink = (blog) => {
    if (blog?.slug) return `/blog/${blog.slug}`;
    const slug = (blog.blog_Title || '')
      .toString()
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');
    return `/blog/${slug}/${blog._id}`;
  };

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.mobile) {
      alert("Please fill in all fields");
      return;
    }
    setIsSubmitting(true);
    try {
      const fullPhoneNumber = `${countryCode}${String(formData.mobile).trim()}`;

      await api.post('userInsert', {
        name: formData.name,
        mobile: fullPhoneNumber,
        countryCode,
        projectName: `Blog: ${data.blog_Title}`,
        address: window.location.href,
      });
      alert("Enquiry submitted successfully!");
      setShowEnquiryModal(false);
    } catch (error) {
      console.error("Enquiry error:", error);
      alert("Failed to submit enquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickEnquirySubmit = async (e) => {
    e.preventDefault();
    if (!quickFormData.name || !quickFormData.mobile) {
      alert("Please fill in all fields");
      return;
    }

    setIsQuickSubmitting(true);
    try {
      const countryCode = "+91";
      const fullPhoneNumber = `${countryCode}${String(quickFormData.mobile).trim()}`;

      await api.post('userInsert', {
        name: quickFormData.name,
        mobile: fullPhoneNumber,
        countryCode,
        projectName: `Blog: ${data.blog_Title}`,
        address: window.location.href,
      });

      alert("Enquiry submitted successfully!");
      setQuickFormData({ name: "", mobile: "" });
    } catch (error) {
      console.error("Enquiry error:", error);
      alert("Failed to submit enquiry. Please try again.");
    } finally {
      setIsQuickSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading blog post...</p>
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: "'Open Sans', sans-serif" }}>Blog Post Not Found</h2>
          <p className="text-gray-600 mb-6">The blog post you are looking for does not exist.</p>
          <Link 
            to="/blog" 
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-colors"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  if (!data.blog_Title) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enquiry Modal */}
      {showEnquiryModal && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowEnquiryModal(false)}
          ></div>
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden transform transition-all animate-in fade-in zoom-in duration-300">
            <button 
              onClick={() => setShowEnquiryModal(false)}
              className="absolute right-3 top-3 p-1.5 hover:bg-gray-100 rounded-full transition-colors z-10"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
            
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Send className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">Submit Your Enquiry</h3>
              </div>

              <form onSubmit={handleEnquirySubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1 ml-1">Your Name</label>
                  <div className="relative group">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                    <input
                      type="text"
                      required
                      placeholder="Enter your name"
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 outline-none text-sm transition-all"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1 ml-1">Mobile Number</label>
                  <div className="flex">
                    {/* Country Code Selector */}
                    <div className="relative" ref={countryDropdownRef}>
                      <button
                        type="button"
                        onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                        className="flex items-center justify-center px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-l-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 hover:bg-gray-100 transition-all"
                      >
                        <span className="text-sm font-medium text-gray-700">{selectedCountry.code}</span>
                        <svg className="w-4 h-4 text-gray-400 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {isCountryDropdownOpen && (
                        <div className="absolute top-full left-0 z-50 mt-1 w-48 bg-white border border-gray-200 rounded-xl shadow-lg max-h-64 overflow-y-auto">
                          {countryCodes.map((country) => (
                            <button
                              key={country.code}
                              type="button"
                              onClick={() => {
                                setCountryCode(country.code);
                                setIsCountryDropdownOpen(false);
                              }}
                              className="w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center gap-2 transition-colors"
                            >
                              <span className="text-lg">{country.flag}</span>
                              <div>
                                <div className="text-sm font-medium text-gray-900">{country.name}</div>
                                <div className="text-xs text-gray-500">{country.code}</div>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="relative group flex-1">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                      <input
                        type="tel"
                        required
                        placeholder="Enter mobile number"
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-r-xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 outline-none text-sm transition-all"
                        value={formData.mobile}
                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 group mt-4 text-sm"
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      Submit Enquiry
                      <Send className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
              <p className="text-center text-[10px] text-gray-400 mt-4">
                By submitting, you agree to our privacy policy.
              </p>
            </div>
          </div>
        </div>
      )}
      <Helmet>
        <title>{data.blog_Title || 'Blog Post'}</title>
        <meta name="description" content={data.metaDescription || data.blog_Description?.substring(0, 160)} />
        <meta property="og:title" content={data.blog_Title || 'Blog Post'} />
        <meta property="og:description" content={data.metaDescription || data.blog_Description?.substring(0, 160)} />
        <meta property="og:image" content={data.blog_Image?.display || FALLBACK_IMG} />
        <meta name="twitter:card" content="summary_large_image" />
        {data.blog_Image?.url && <meta name="twitter:image" content={data.blog_Image.url} />}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-white to-gray-100" />
        
        <div className="relative max-w-7xl mx-auto px-6 py-16">
          
          {/* Metadata Section */}
          <div className="max-w-4xl mx-auto mb-8 pt-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Left - Blog Category and Author */}
              <div className="flex flex-col sm:flex-row gap-3">
                {data.blog_Category && (
                  <div className="inline-flex items-center space-x-2 px-3 py-1 bg-red-50 border border-red-200 rounded-full">
                    <span className="text-red-700 font-sans text-sm font-semibold">{data.blog_Category}</span>
                  </div>
                )}
                {data.author && (
                  <Link 
                    to={`/author/${encodeURIComponent(data.author)}`}
                    className="inline-flex items-center space-x-2 px-3 py-1 bg-gray-100 border border-gray-300 rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
                  >
                    <span className="text-gray-700 font-sans text-sm font-medium">By {data.author}</span>
                  </Link>
                )}
              </div>

              {/* Center - Social Media Links */}
              <div className="flex items-center gap-4">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${typeof window !== 'undefined' ? window.location.href : ''}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                  title="Share on Facebook"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                
                <a
                  href={`https://twitter.com/intent/tweet?url=${typeof window !== 'undefined' ? window.location.href : ''}&text=${data.blog_Title || ''}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
                  title="Share on X"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${typeof window !== 'undefined' ? window.location.href : ''}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-blue-700 text-white rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors"
                  title="Share on LinkedIn"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                
                <a
                  href={`https://wa.me/?text=${data.blog_Title || ''} ${typeof window !== 'undefined' ? window.location.href : ''}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center hover:bg-green-700 transition-colors"
                  title="Share on WhatsApp"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </a>
                
                <a
                  href={`mailto:?subject=${data.blog_Title || ''}&body=Check out this article: ${typeof window !== 'undefined' ? window.location.href : ''}`}
                  className="w-8 h-8 bg-gray-600 text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                  title="Share via Email"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
              </div>

              {/* Right - Read and View Info */}
              <div className="flex-shrink-0">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{Math.floor(Math.random() * 3) + 1} min read</span>
                  </div>
                  <span className="text-gray-400">•</span>
                  <div className="flex items-center space-x-1">
                    <Eye className="h-4 w-4" />
                    <span>{Math.floor(Math.random() * 900) + 100} views</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Blog Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 mt-12 text-center" style={{ fontFamily: "'Open Sans', sans-serif" }}>
            {data.blog_Title}
          </h1>

          {/* Main Content Grid - 60:40 Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
            {/* Left Column - 60% (Image) */}
            <div className="lg:col-span-6">
              <div className="relative w-full rounded-lg overflow-hidden shadow-2xl">
                <img
                  src={blogImage}
                  alt={data.blog_Title || 'Blog post'}
                  className="w-full h-auto object-contain transition-all duration-700 hover:scale-105"
                  onError={(e) => {
                    e.target.src = FALLBACK_IMG;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/10 via-transparent to-transparent" />
              </div>
            </div>

            {/* Right Column - 40% (Table of Contents) */}
            <div className="lg:col-span-4">
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 shadow-sm sticky top-24">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                    Contents
                  </h3>
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  </button>
                </div>
                
                <div className="overflow-y-auto max-h-96 pr-2">
                  {headings.length > 0 ? (
                    <nav className="space-y-1 text-sm">
                      {headings.map((heading) => (
                        <a
                          key={heading.id}
                          href={`#${heading.id}`}
                          className={`flex items-center text-red-600 hover:text-red-700 transition-colors whitespace-nowrap overflow-hidden text-ellipsis ${
                            heading.level === 1 ? 'font-semibold py-1' :
                            heading.level === 2 ? 'font-medium py-0.5 ml-4' :
                            'py-0.5 ml-8'
                          }`}
                          title={heading.text}
                        >
                          {heading.level === 3 ? (
                            <span className="flex-shrink-0 mr-2 w-1 h-1 rounded-full bg-red-600"></span>
                          ) : (
                            <span className="flex-shrink-0 mr-2">{heading.number}.</span>
                          )}
                          <span className="overflow-hidden text-ellipsis">{heading.text}</span>
                        </a>
                      ))}
                    </nav>
                  ) : (
                    <p className="text-sm text-gray-500">No headings found in this article.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content with Sidebars */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Sidebar - Recommended Projects */}
          <aside className="lg:col-span-3">
            <div className="sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                Recommended Projects
              </h3>
              
              <div className="space-y-3">
                {spotlight?.slice(0, 4).map((project) => (
                  <Link
                    key={project._id}
                    to={`/projects/${project.slug || project._id}`}
                    className="block hover:shadow-md transition-all duration-300 group"
                  >
                    <div className="flex gap-3 p-2">
                      {/* Project Image */}
                      <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                        <img
                          src={project?.thumbnailImage?.url || project?.frontImage?.url || FALLBACK_IMG}
                          alt={project?.projectName || project.project_Title || 'Project'}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          onError={(e) => {
                            e.target.src = FALLBACK_IMG;
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      </div>
                      
                      {/* Project Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2 group-hover:text-red-600 transition-colors">
                          {project?.projectName || project.project_Title || project.name}
                        </h4>
                        
                        {/* Price */}
                        {(project?.minPrice || project?.price) && (
                          <p className="text-red-600 font-bold text-xs mb-1">
                            ₹{(project?.minPrice || project?.price)?.toLocaleString()}*
                          </p>
                        )}
                        
                        {/* Location */}
                        {project.projectAddress && (
                          <p className="text-gray-500 text-xs flex items-center">
                            <svg className="w-3 h-3 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="truncate">{project.projectAddress}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              
              {/* View All Projects Button */}
              <Link
                to="/projects"
                className="block w-full mt-6 text-center px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
              >
                View All Projects
              </Link>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-6">
            <article className="prose prose-lg max-w-none">
              <div 
                className="text-gray-800 leading-relaxed space-y-6"
                dangerouslySetInnerHTML={{ 
                  __html: DOMPurify.sanitize(data.blog_Content || data.blog_Description) 
                }}
              />
            </article>

            {/* FAQs Section */}
            {data?.faqs && data.faqs.length > 0 && (
              <div className="mt-16 mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                  Frequently Asked Questions
                </h3>
                <div className="space-y-4">
                  {data.faqs.map((faq, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                      <details className="group">
                        <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                          <h4 className="font-medium text-gray-900 pr-4 text-sm">{faq.question}</h4>
                          <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </summary>
                        <div className="px-4 pb-4 text-gray-600">
                          <p className="text-sm">{faq.answer}</p>
                        </div>
                      </details>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Engagement Section */}
            <div className="mt-16 pt-8 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
                    <span className="text-sm font-medium">Like</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
                    <span className="text-sm font-medium">Comment</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
                    <span className="text-sm font-medium">Share</span>
                  </button>
                </div>
                
                <Link 
                  to="/blog" 
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-red-600 text-white font-medium rounded-full hover:bg-red-700 transition-colors"
                >
                  <span>Read More Stories</span>
                </Link>
              </div>
            </div>

            {/* Contact Form */}
            <section className="mt-16">
              <div className="relative">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-700 to-red-800 rounded-3xl opacity-90"></div>
                
                
              </div>
            </section>
          </div>

          {/* Right Sidebar - What People Are Exploring */}
          <aside className="lg:col-span-3">
            <div className="sticky top-24 space-y-4">
              {/* What People Are Exploring */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                  What People Are Exploring
                </h3>
                
                <div className="space-y-1">
                  <Link
                    to="/projects-in-gurugram/"
                    className="block px-2 py-1 text-sm text-gray-700 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                  >
                    Projects in Gurugram
                  </Link>
                  <Link
                    to="/projects-in-delhi/"
                    className="block px-2 py-1 text-sm text-gray-700 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                  >
                    Projects in Delhi
                  </Link>
                  <Link
                    to="/projects-in-noida/"
                    className="block px-2 py-1 text-sm text-gray-700 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                  >
                    Projects in Noida
                  </Link>
                  <Link
                    to="/projects-in-gurugram/budget"
                    className="block px-2 py-1 text-sm text-gray-700 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                  >
                    Property under 1 Cr
                  </Link>
                  <Link
                    to="/projects/upcoming/"
                    className="block px-2 py-1 text-sm text-gray-700 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                  >
                    Upcoming Projects
                  </Link>
                  <Link
                    to="/projects/new-launch/"
                    className="block px-2 py-1 text-sm text-gray-700 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                  >
                    New Launch Projects
                  </Link>
                  <Link
                    to="/projects/sco-plots/"
                    className="block px-2 py-1 text-sm text-gray-700 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                  >
                    SCO Plots
                  </Link>
                  <Link
                    to="/projects/commercial/"
                    className="block px-2 py-1 text-sm text-gray-700 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                  >
                    Commercial Projects
                  </Link>
                </div>
              </div>

              {/* Quick Enquiry Form */}
              <div className="bg-blue-600 border border-blue-600 rounded-lg p-4 mt-8">
                <h3 className="text-lg font-bold text-white mb-3" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                  Quick Enquiry
                </h3>
                
                <form className="space-y-3" onSubmit={handleQuickEnquirySubmit}>
                  <div>
                    <label className="block text-sm font-medium text-white mb-1">Name</label>
                    <input
                      type="text"
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                      placeholder="Your name"
                      value={quickFormData.name}
                      onChange={(e) => setQuickFormData({ ...quickFormData, name: e.target.value })}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white mb-1">Mobile Number</label>
                    <input
                      type="tel"
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                      placeholder="Your mobile number"
                      maxLength={10}
                      value={quickFormData.mobile}
                      onChange={(e) => setQuickFormData({ ...quickFormData, mobile: e.target.value })}
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isQuickSubmitting}
                    className="w-full px-3 py-1 bg-red-600 text-white font-medium rounded hover:bg-red-700 transition-colors text-sm"
                  >
                    {isQuickSubmitting ? 'Submitting...' : 'Submit Enquiry'}
                  </button>
                </form>
              </div>
            </div>
          </aside>
        </div>
      </main>
      
      {/* Explore More Stories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center" style={{ fontFamily: "'Open Sans', sans-serif" }}>
            Explore More Stories
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedBlogs.map((blog) => (
              <div key={blog._id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="h-48 bg-gray-200 rounded-t-lg overflow-hidden">
                  <img 
                    src={blog.blog_Image?.cdn_url || blog.blog_Image?.url || blog.blog_Image?.Location || FALLBACK_IMG}
                    alt={blog.blog_Title || 'Blog story'}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = FALLBACK_IMG;
                    }}
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    {blog.blog_Category && (
                      <span className="px-2 py-1 bg-red-50 text-red-700 text-xs font-semibold rounded-full">
                        {blog.blog_Category}
                      </span>
                    )}
                    <span className="text-xs text-gray-500">
                      {getReadingTime(blog.blog_Description)}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                    {blog.blog_Title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {blog.blog_Description?.replace(/<[^>]*>/g, "").substring(0, 150)}...
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {blog.views || Math.floor(Math.random() * 900) + 100} views
                    </span>
                    <Link 
                      to={blogLink(blog)}
                      className="text-red-600 hover:text-red-700 text-sm font-medium transition-colors"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              to="/blog" 
              className="inline-flex items-center space-x-2 px-8 py-3 bg-red-600 text-white font-medium rounded-full hover:bg-red-700 transition-colors"
            >
              <span>View All Stories</span>
            </Link>
          </div>
        </div>
      </section>
      
      
      
      <Footer />
    </div>
  );
};

export default ModernBlogView;
