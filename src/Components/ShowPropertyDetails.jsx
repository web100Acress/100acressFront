import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Footer from "../Components/Actual_Components/Footer";
import api from "../config/apiClient";
import Api_Service from "../Redux/utils/Api_Service";
import { Skeleton } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Gallery from "../Components/Gallery";
import { 
  MapPin, 
  Home, 
  Ruler, 
  IndianRupee, 
  Phone, 
  Download, 
  Share2,
  CheckCircle,
  Star,
  Bed,
  Bath,
  Car,
  Trees,
  Dumbbell,
  Waves,
  Shield,
  Award,
  Building,
  Calendar,
  User,
  Mail,
  ChevronRight
} from "lucide-react";
import FAQSection from "../Components/Actual_Components/FAQSection";
import { resaleFAQs } from "../Data/resaleFAQs";
import { rentalFAQs } from "../Data/rentalFAQs";

// Price formatting function
function formatPrice(price, type = 'buy') {
  if (!price || isNaN(price)) return 'Contact for price';
  const num = Number(price);
  
  // For rental properties, show exact price as is
  if (type === 'rental') {
    return num.toLocaleString('en-IN');
  }
  
  // For resale properties, use the original logic
  if (num < 10) {
    // User probably means crores
    return `${num} Cr`;
  } else if (num < 100) {
    // User probably means lakhs
    return `${num} LAC`;
  } else if (num < 10000000) {
    // Less than 1 crore, treat as rupees and show in LAC
    const lakhs = num / 100000;
    return `${lakhs.toFixed(2)} LAC`;
  } else {
    // 1 crore or more, show in Cr
    const crores = num / 10000000;
    return `${crores.toFixed(1)} Cr`;
  }
}

const ShowPropertyDetails = ({ id, type }) => {
  const navigate = useNavigate();
  const { getTrending } = Api_Service();

  const [rentViewDetails, setRentViewDetails] = useState();
  const [buyData, setBuyData] = useState([]);
  const [showNumber, setShowNumber] = useState(false);
  
  // Get trending properties from Redux store
  const TrendingProjects = useSelector(store => store?.project?.trending) || [];
  const [GalleryImageData, setGalleryImageData] = useState([]);
  const [OpenGallery, setOpenGallery] = useState(false);
  const [agentDetails, setAgentDetails] = useState({
    agentName: "",
    agentNumber: "",
    agentEmail: "",
  });
  const [loading, setLoading] = useState(false);
  const [showFormPopup, setShowFormPopup] = useState(false);
  const [highlightForm, setHighlightForm] = useState(false);
  const [propertyType, setPropertyType] = useState(null);
  const [activeTab, setActiveTab] = useState('details');

  // Fetch trending properties on component mount
  useEffect(() => {
    getTrending();
  }, [getTrending]);

  // Check and redirect if URL is missing trailing slash
  useEffect(() => {
    const currentPath = window.location.pathname;
    if (!currentPath.endsWith('/')) {
      const newPath = currentPath + '/';
      navigate(newPath, { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/property/view/${id}`);
        const hasData = res?.data?.data && res?.data?.data?.postProperty;
        if (hasData) {
          console.log("Property details loaded successfully");
          const propertyData = res.data.data.postProperty;
          setRentViewDetails(propertyData);
          
          // Check if property exists in the specified category
          const checkPropertyInCategory = async () => {
            try {
              const endpoint = type === "rental" 
                ? "/property/rent/viewAll"
                : "/property/buy/ViewAll";
              const categoryRes = await api.get(endpoint);
              const categoryData = type === "rental" 
                ? (Array.isArray(categoryRes?.data?.rentaldata) ? categoryRes.data.rentaldata : [])
                : (Array.isArray(categoryRes?.data?.ResaleData) ? categoryRes.data.ResaleData : []);
              
              const propertyExists = categoryData.some(prop => prop._id === id);
              
              if (!propertyExists) {
                // Property doesn't exist in this category, check the other category
                const otherEndpoint = type === "rental" 
                  ? "/property/buy/ViewAll"
                  : "/property/rent/viewAll";
                
                const otherRes = await api.get(otherEndpoint);
                const otherData = type === "rental" 
                  ? (Array.isArray(otherRes?.data?.ResaleData) ? otherRes.data.ResaleData : [])
                  : (Array.isArray(otherRes?.data?.rentaldata) ? otherRes.data.rentaldata : []);
                
                const existsInOther = otherData.some(prop => prop._id === id);
                
                if (existsInOther) {
                  // Redirect to the correct category
                  const correctType = type === "rental" ? "buy-properties" : "rental-properties";
                  const propertyName = propertyData.propertyName ? propertyData.propertyName.replace(/\s+/g, '-') : 'property';
                  navigate(`/${correctType}/${propertyName}/${id}/`, { replace: true });
                  return;
                }
              }
              
              setPropertyType(type);
            } catch (error) {
              console.error("Error checking property category:", error);
              setPropertyType(type); // Fallback to original type
            }
          };
          
          checkPropertyInCategory();
          
          setAgentDetails({
            agentName: res.data?.data?.agentName || "",
            agentNumber: res.data?.data?.agentNumber || "",
            agentEmail: res.data?.data?.agentEmail || "",
          });
          const otherImages = Array.isArray(res?.data?.data?.postProperty?.otherImage)
            ? res.data.data.postProperty.otherImage
            : [];
          let ImagesData = otherImages.map((image) => ({
            url: image?.url,
            thumbnail: image?.url,
          })).filter(img => !!img.url);
          const frontUrl = res?.data?.data?.postProperty?.frontImage?.url;
          if (frontUrl) {
            ImagesData.push({ url: frontUrl, thumbnail: frontUrl });
          }
          setGalleryImageData(ImagesData);
          setLoading(false);
        } else {
            console.log("No data found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [id, type, navigate]);

  const handleShare = (project) => {
    if (navigator.share) {
      navigator
        .share({
          title: project?.propertyName,
          text: `Check out this project: ${project.propertyName}`,
          url: `${window.location.href}`,
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.log("Error sharing:", error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      alert("Share functionality is not supported on this device/browser.");
    }
  };

  const [userForm, setUserForm] = useState({
    custName: "",
    custEmail: "",
    custNumber: "",
    agentEmail: "",
    agentNumber: ""
  });

  const resetUser = () => {
    setUserForm({
      custName: "",
      custEmail: "",
      custNumber: "",
      agentEmail: "",
      agentNumber: ""
    });
  };

  const handleUserFormChange = (e) => {
    const { name, value } = e.target;
    setUserForm({ ...userForm, [name]: value });
  };

  const handleSubmitFormData = async (e) => {
    e.preventDefault();

    const { custName, custNumber } = userForm;

    if (custNumber && custName) {
      try {
        const response = await api.post("/postEnquiry", {
          ...userForm,
          ...agentDetails,
          propertyAddress: rentViewDetails.address,
        });

        alert(response.data.message);
        setShowNumber(true);
        resetUser();
      } catch (error) {
        console.error("Registration failed:", error);
        setShowNumber(false);

        if (error.response) {
          alert(`Server responded with an error: ${error.response.status}`);
          setShowNumber(false);
        } else if (error.request) {
          alert("No response received from the server");
          setShowNumber(false);
        } else {
          alert(`Error setting up the request: ${error.message}`);
          setShowNumber(false);
        }
      }
    } else {
      alert("Please fill the data");
      setShowNumber(false);
    }
  };

  const fetchData = async () => {
    try {
      const endpoint = propertyType === "rental" 
        ? "/property/rent/viewAll"
        : "/property/buy/ViewAll";
      
      const res = await api.get(endpoint);
      
      if (propertyType === "rental") {
        setBuyData(Array.isArray(res?.data?.rentaldata) ? res.data.rentaldata : []);
      } else {
        setBuyData(Array.isArray(res?.data?.ResaleData) ? res.data.ResaleData : []);
      }
    } catch (error) {
      console.error("Error fetching Data", error);
    }
  };

  useEffect(() => {
    if (propertyType) {
      fetchData();
    }
  }, [propertyType]);

  // Ref for inquiry form
  const inquiryFormRef = useRef(null);
  
  // Phone button click handler
  const handlePhoneClick = (e) => {
    if (e) e.preventDefault();
    if (inquiryFormRef.current) {
      inquiryFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setHighlightForm(true);
      setTimeout(() => setHighlightForm(false), 2000);
    }
  };

  // SEO Meta Tags Effect
  useEffect(() => {
    if (rentViewDetails && rentViewDetails.propertyName) {
      // Update document title
      document.title = `${rentViewDetails.propertyName} - ${rentViewDetails.propertyType || 'Property'} for Sale in ${rentViewDetails.city || 'India'}, ${rentViewDetails.state || ''} | 100Acress`;
      
      // Update meta description
      const description = `${rentViewDetails.propertyName} - ${rentViewDetails.propertyType || 'Property'} available for sale in ${rentViewDetails.city || 'India'}, ${rentViewDetails.state || ''}. Price: ₹${rentViewDetails.price ? formatPrice(rentViewDetails.price) : 'Contact for price'}. ${rentViewDetails.address ? `Located at ${rentViewDetails.address}.` : ''} View detailed property information, photos, and contact details on 100Acress.`;
      
      // Update or create meta description
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.name = 'description';
        document.head.appendChild(metaDescription);
      }
      metaDescription.content = description;
      
      // Update or create canonical URL
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.rel = 'canonical';
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.href = `https://100acress.com/${propertyType === "rental" ? "rental-properties" : "buy-properties"}/${rentViewDetails.propertyName.replace(/\s+/g, '-')}/${id}/`;
      
    } else {
      // Default meta tags when no property data
      document.title = "Property Details | 100Acress";
      
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.name = 'description';
        document.head.appendChild(metaDescription);
      }
      metaDescription.content = "Discover detailed property information, photos, and contact details for properties across India on 100Acress.";
      
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.rel = 'canonical';
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.href = `https://100acress.com/${propertyType === "rental" ? "rental-properties" : "buy-properties"}/`;
    }
      }, [rentViewDetails, id, propertyType]);

  return (
    <div className="bg-[#FAFAFA] min-h-screen font-['Rubik','sans-serif']">
      {loading || !propertyType ? (
        <div className="pt-20 max-w-7xl mx-auto px-4 py-8">
          <Skeleton active paragraph={{ rows: 10 }} />
        </div>
      ) : (
        rentViewDetails && (
          <>
            {/* Hero Section */}
            <div className="pt-16 md:pt-20 pb-4 md:pb-6">
              <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
                {/* Breadcrumb */}
                <nav className="mb-4 md:mb-6 mt-2 md:mt-4" aria-label="Breadcrumb">
                  <ol className="flex items-center space-x-1 md:space-x-2 text-xs text-gray-500 overflow-x-auto">
                    <li>
                      <a href="/" className="hover:text-[#E63946] transition-colors duration-200">Home</a>
                    </li>
                    <li><ChevronRight className="w-3 h-3 text-gray-400" /></li>
                    <li>
                      <a 
                        href={propertyType === "rental" ? "/rental-properties/best-rental-property-in-gurugram/" : "/buy-properties/best-resale-property-in-gurugram/"}
                        className="hover:text-[#E63946] transition-colors duration-200"
                      >
                        {propertyType === "rental" ? "Rental" : "Resale"}
                      </a>
                    </li>
                    <li><ChevronRight className="w-3 h-3 text-gray-400" /></li>
                    <li className="text-gray-700 font-medium truncate max-w-xs">
                      {rentViewDetails.propertyName}
                    </li>
                  </ol>
                </nav>

                {/* Property Name and Location - Above Image */}
                <div className="mb-4 md:mb-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3 md:mb-4 gap-3">
                    <div className="flex-1">
                      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 md:mb-3 leading-tight">
                        {rentViewDetails.propertyName}
                      </h1>
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 md:w-5 h-4 md:h-5 text-[#E63946] flex-shrink-0" />
                        <span className="text-sm md:text-base">
                          Sector {rentViewDetails.address}, {rentViewDetails.city}, {rentViewDetails.state}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 md:gap-2 flex-wrap md:flex-shrink-0">
                      <div className="flex items-center gap-1 md:gap-1.5 bg-blue-50 px-2 md:px-4 py-1.5 md:py-2 rounded-full shadow-sm border border-blue-100">
                        <Shield className="w-3 md:w-4 h-3 md:h-4 text-blue-600" />
                        <span className="text-xs md:text-sm font-semibold text-blue-700">RERA</span>
                      </div>
                      <div className="flex items-center gap-1 md:gap-1.5 bg-green-50 px-2 md:px-4 py-1.5 md:py-2 rounded-full shadow-sm border border-green-100">
                        <CheckCircle className="w-3 md:w-4 h-3 md:h-4 text-green-600" />
                        <span className="text-xs md:text-sm font-semibold text-green-700">Verified</span>
                      </div>
                      <div className="flex items-center gap-0.5 md:gap-1 bg-white px-2 md:px-3 py-1.5 md:py-2 rounded-full shadow-sm border border-gray-200">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="w-3 md:w-4 h-3 md:h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                        <span className="text-xs md:text-sm font-semibold text-gray-700 ml-0.5 md:ml-1">5.0</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

                {/* Full Width Hero Image with Overlay Tags */}
                <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
                  <div className="relative mb-6 md:mb-8 group overflow-hidden rounded-2xl md:rounded-3xl">
                      <img
                        src={rentViewDetails.frontImage?.url}
                        alt={rentViewDetails.propertyName}
                        className="w-full h-[250px] md:h-[400px] lg:h-[500px] object-cover cursor-pointer transition-transform duration-700 group-hover:scale-105"
                        onClick={() => setOpenGallery(true)}
                      />
                      
                      {/* Gradient Overlay for better text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
                      
                      {/* Overlay Tags - Top Left */}
                      <div className="absolute top-3 md:top-6 left-3 md:left-6 flex flex-col gap-2 md:gap-3 z-10">
                        <span className="bg-gradient-to-r from-[#E63946] to-[#FF6B6B] text-white px-3 md:px-5 py-1.5 md:py-2.5 rounded-lg md:rounded-xl font-semibold text-xs md:text-sm shadow-2xl flex items-center gap-1.5 md:gap-2 backdrop-blur-sm">
                          <Award className="w-3 md:w-4 h-3 md:h-4" />
                          <span className="hidden sm:inline">0% Brokerage</span>
                          <span className="sm:hidden">0% Fee</span>
                        </span>
                        <span className="bg-gradient-to-r from-green-600 to-green-500 text-white px-3 md:px-5 py-1.5 md:py-2.5 rounded-lg md:rounded-xl font-semibold text-xs md:text-sm shadow-2xl flex items-center gap-1.5 md:gap-2 backdrop-blur-sm">
                          <CheckCircle className="w-3 md:w-4 h-3 md:h-4" />
                          <span className="hidden sm:inline">Best Price Guarantee</span>
                          <span className="sm:hidden">Best Price</span>
                        </span>
                      </div>
                      
                      {/* Price Card - Bottom Left */}
                      <div className="absolute bottom-3 md:bottom-6 left-3 md:left-6 bg-white/95 backdrop-blur-md rounded-xl md:rounded-2xl shadow-2xl px-3 md:px-6 py-2 md:py-4 border border-white/20 z-10">
                        <p className="text-xs text-gray-500 mb-0.5 md:mb-1 font-medium">Starting from</p>
                        <p className="text-xl md:text-3xl font-bold bg-gradient-to-r from-[#E63946] to-[#FF6B6B] bg-clip-text text-transparent flex items-center">
                          <IndianRupee className="w-4 md:w-6 h-4 md:h-6 text-[#E63946]" />
                          {formatPrice(rentViewDetails.price, propertyType)}
                        </p>
                      </div>
                      
                      {/* View All Photos Button - Bottom Right */}
                      <button
                        onClick={() => setOpenGallery(true)}
                        className="absolute bottom-3 md:bottom-6 right-3 md:right-6 bg-white/95 backdrop-blur-md rounded-lg md:rounded-xl px-3 md:px-5 py-2 md:py-3 font-semibold text-xs md:text-sm shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 flex items-center gap-1.5 md:gap-2 border border-white/20 z-10">
                        <span className="text-gray-900 hidden sm:inline">View All Photos</span>
                        <span className="text-gray-900 sm:hidden">Photos</span>
                        <span className="bg-[#E63946] text-white px-1.5 md:px-2 py-0.5 rounded-md text-xs">{GalleryImageData.length}</span>
                      </button>
                  </div>
                </div>

                {/* Grid Layout: Tabs + Contact Form */}
                <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                  {/* Left: Tabs Section (2/3 width) */}
                  <div className="lg:col-span-2">
                    {/* About Property Section - Above Tabs */}
                    <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 lg:p-8 mb-4 md:mb-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                      <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 md:mb-4">About Property</h3>
                      <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                        {rentViewDetails.descripation || 'Please contact us for more information about this property.'}
                      </p>
                    </div>

                    {/* Tabs Section */}
                    <div className="bg-white rounded-xl md:rounded-2xl shadow-lg mb-4 md:mb-6 border border-gray-100 overflow-hidden">
                      {/* Tab Headers */}
                      <div className="border-b border-gray-200 bg-gray-50/50 overflow-x-auto">
                        <div className="flex gap-0 px-3 md:px-6 min-w-max md:min-w-0">
                          {['details', 'configuration', 'highlights', 'amenities', 'images'].map((tab) => (
                            <button
                              key={tab}
                              onClick={() => setActiveTab(tab)}
                              className={`px-3 md:px-6 py-3 md:py-4 font-semibold text-xs md:text-sm transition-all duration-300 whitespace-nowrap relative ${
                                activeTab === tab
                                  ? 'text-[#E63946]'
                                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                              }`}
                            >
                              {tab.charAt(0).toUpperCase() + tab.slice(1)}
                              {activeTab === tab && (
                                <span className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E63946] to-[#FF6B6B] rounded-t-full transition-all duration-300"></span>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Tab Content */}
                      <div className="p-4 md:p-6 lg:p-8">
                        {activeTab === 'details' && (
                          <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300 hover:border-[#E63946]/30 flex items-center justify-center min-h-[80px]">
                                <div className="flex items-center gap-3">
                                  <div className="p-2 bg-[#E63946]/10 rounded-lg">
                                    <Home className="w-5 h-5 text-[#E63946]" />
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-500 mb-0.5 font-medium">Property Type</p>
                                    <p className="font-semibold text-gray-900 text-sm">{rentViewDetails.propertyType || 'Flat/Apartment'}</p>
                                  </div>
                                </div>
                              </div>
                              <div className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300 hover:border-[#E63946]/30 flex items-center justify-center min-h-[80px]">
                                <div className="flex items-center gap-3">
                                  <div className="p-2 bg-[#E63946]/10 rounded-lg">
                                    <IndianRupee className="w-5 h-5 text-[#E63946]" />
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-500 mb-0.5 font-medium">Project Price</p>
                                    <p className="font-semibold text-gray-900 text-sm">₹ {formatPrice(rentViewDetails.price, propertyType)}</p>
                                  </div>
                                </div>
                              </div>
                              <div className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300 hover:border-[#E63946]/30 flex items-center justify-center min-h-[80px]">
                                <div className="flex items-center gap-3">
                                  <div className="p-2 bg-[#E63946]/10 rounded-lg">
                                    <Ruler className="w-5 h-5 text-[#E63946]" />
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-500 mb-0.5 font-medium">Project Size</p>
                                    <p className="font-semibold text-gray-900 text-sm">{rentViewDetails.area || '1054'}</p>
                                  </div>
                                </div>
                              </div>
                              <div className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300 hover:border-[#E63946]/30 flex items-center justify-center min-h-[80px]">
                                <div className="flex items-center gap-3">
                                  <div className="p-2 bg-[#E63946]/10 rounded-lg">
                                    <MapPin className="w-5 h-5 text-[#E63946]" />
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-500 mb-0.5 font-medium">Location</p>
                                    <p className="font-semibold text-gray-900 text-sm">{rentViewDetails.city || 'N/A'}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {activeTab === 'configuration' && (
                          <div>
                            <h3 className="text-2xl font-bold text-[#212529] mb-4">Configuration</h3>
                            <div className="space-y-3">
                              {rentViewDetails.type && (
                                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                                  <Building className="w-5 h-5 text-[#E63946]" />
                                  <span className="text-gray-700"><strong>Type:</strong> {rentViewDetails.type}</span>
                                </div>
                              )}
                              {rentViewDetails.furnishing && (
                                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                                  <Home className="w-5 h-5 text-[#E63946]" />
                                  <span className="text-gray-700"><strong>Furnishing:</strong> {rentViewDetails.furnishing}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {activeTab === 'highlights' && (
                          <div>
                            <h3 className="text-2xl font-bold text-[#212529] mb-4">Property Highlights</h3>
                            <ul className="space-y-2">
                              {rentViewDetails.area && (
                                <li className="flex items-center gap-2 text-gray-700">
                                  <CheckCircle className="w-5 h-5 text-green-600" />
                                  <span>{rentViewDetails.area}</span>
                                </li>
                              )}
                              {rentViewDetails.furnishing && (
                                <li className="flex items-center gap-2 text-gray-700">
                                  <CheckCircle className="w-5 h-5 text-green-600" />
                                  <span>{rentViewDetails.furnishing}</span>
                                </li>
                              )}
                              {rentViewDetails.landMark && (
                                <li className="flex items-center gap-2 text-gray-700">
                                  <CheckCircle className="w-5 h-5 text-green-600" />
                                  <span>Near {rentViewDetails.landMark}</span>
                                </li>
                              )}
                            </ul>
                          </div>
                        )}

                        {activeTab === 'amenities' && (
                          <div>
                            <h3 className="text-2xl font-bold text-[#212529] mb-4">Amenities</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                                <Dumbbell className="w-5 h-5 text-[#E63946]" />
                                <span className="text-sm">Gymnasium</span>
                              </div>
                              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                                <Waves className="w-5 h-5 text-[#E63946]" />
                                <span className="text-sm">Swimming Pool</span>
                              </div>
                              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                                <Trees className="w-5 h-5 text-[#E63946]" />
                                <span className="text-sm">Garden</span>
                              </div>
                              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                                <Car className="w-5 h-5 text-[#E63946]" />
                                <span className="text-sm">Parking</span>
                              </div>
                              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                                <Shield className="w-5 h-5 text-[#E63946]" />
                                <span className="text-sm">24/7 Security</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {activeTab === 'images' && (
                          <div>
                            <h3 className="text-2xl font-bold text-[#212529] mb-4">Property Images</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                              {GalleryImageData.map((img, idx) => (
                                <img
                                  key={idx}
                                  src={img.url}
                                  alt={`Property ${idx + 1}`}
                                  className="w-full h-40 object-cover rounded-lg cursor-pointer hover:opacity-80 transition shadow-sm"
                                  onClick={() => setOpenGallery(true)}
                                />
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right: Contact Form Sidebar */}
                  <div className="lg:col-span-1">
                    <div className="sticky top-24" ref={inquiryFormRef}>
                      {/* Premium Contact Form */}
                      <div className="bg-white rounded-2xl shadow-2xl p-7 mb-6 border border-gray-100 hover:shadow-3xl transition-shadow duration-300">
                        <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">
                          Yes, I'm Interested in
                        </h3>
                        <p className="text-[#E63946] font-semibold mb-5 text-base">{rentViewDetails.propertyName}</p>
                        <form onSubmit={handleSubmitFormData} className="space-y-4">
                          <div className="relative group">
                            <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400 group-focus-within:text-[#E63946] transition-colors" />
                            <input
                              type="text"
                              name="custName"
                              required
                              className="w-full border-2 border-gray-200 rounded-xl bg-gray-50 pl-10 pr-4 py-3.5 text-base focus:outline-none focus:ring-2 focus:ring-[#E63946]/20 focus:border-[#E63946] focus:bg-white hover:border-gray-300 transition-all duration-300"
                              onChange={handleUserFormChange}
                              value={userForm.custName}
                              placeholder="Your Name"
                            />
                          </div>
                          <div className="relative group">
                            <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400 group-focus-within:text-[#E63946] transition-colors" />
                            <input
                              type="email"
                              name="custEmail"
                              required
                              className="w-full border-2 border-gray-200 rounded-xl bg-gray-50 pl-10 pr-4 py-3.5 text-base focus:outline-none focus:ring-2 focus:ring-[#E63946]/20 focus:border-[#E63946] focus:bg-white hover:border-gray-300 transition-all duration-300"
                              onChange={handleUserFormChange}
                              value={userForm.custEmail}
                              placeholder="Email Address"
                            />
                          </div>
                          <div className="relative group">
                            <Phone className="absolute left-3 top-3.5 w-5 h-5 text-gray-400 group-focus-within:text-[#E63946] transition-colors" />
                            <input
                              type="tel"
                              name="custNumber"
                              required
                              className="w-full border-2 border-gray-200 rounded-xl bg-gray-50 pl-10 pr-4 py-3.5 text-base focus:outline-none focus:ring-2 focus:ring-[#E63946]/20 focus:border-[#E63946] focus:bg-white hover:border-gray-300 transition-all duration-300"
                              onChange={handleUserFormChange}
                              value={userForm.custNumber}
                              placeholder="Phone Number"
                            />
                          </div>
                          
                          <button
                            type="submit"
                            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#E63946] to-[#FF6B6B] hover:from-[#d7263d] hover:to-[#E63946] text-white font-semibold py-3.5 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                          >
                            <Phone className="w-4 h-4" />
                            Request Call
                          </button>
                          <p className="text-xs text-gray-500 text-center mt-3">
                            Our agent will reach out within 5 minutes.
                          </p>
                        </form>
                      </div>
                      
                      {/* Post Property CTA Card */}
                      <div className="bg-gradient-to-br from-[#E63946]/5 via-white to-[#FF6B6B]/5 rounded-2xl shadow-xl p-7 flex flex-col items-center border border-gray-200 hover:shadow-2xl transition-all duration-300">
                        <h5 className="text-lg font-bold mb-3 text-gray-900 text-center">
                          Want to sell your property?
                        </h5>
                        <p className="text-sm text-gray-600 mb-4 text-center">List your property for FREE!</p>
                        <Link to="/postproperty">
                          <button className="bg-gradient-to-r from-[#E63946] to-[#FF6B6B] hover:from-[#FF6B6B] hover:to-[#E63946] text-white font-bold px-8 py-3 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 text-base hover:scale-105 flex items-center gap-2">
                            List Properties
                            <span className="bg-white text-[#E63946] px-2 py-0.5 rounded-full text-xs font-bold">FREE</span>
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                  </div>
                </div>
              </div>

            {/* Gallery Modal */}
            {OpenGallery && (
              <Gallery
                images={GalleryImageData}
                OpenGallery={OpenGallery}
                setOpenGallery={setOpenGallery}
              />
            )}

            {/* Floating Call Button */}
            <button
              onClick={handlePhoneClick}
              aria-label="Contact via phone"
              className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-[#E63946] to-[#d7263d] shadow-2xl rounded-full h-14 w-14 flex items-center justify-center border-4 border-white focus:outline-none focus:ring-2 focus:ring-[#E63946]/30 transition-all duration-200 hover:scale-110 hover:shadow-[0_8px_32px_0_rgba(230,57,70,0.4)] lg:h-16 lg:w-16"
            >
              <Phone className="h-6 w-6 text-white lg:h-7 lg:w-7" />
            </button>
          </>
        )
      )}

      {/* Similar Properties Section */}
      {buyData && buyData.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
          <h3 className="text-2xl font-bold mb-6 text-[#212529]">Similar Properties</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {buyData.slice(0, 4).map((property, idx) => (
              <a
                key={property._id || idx}
                href={`${propertyType === "rental" ? "/rental-properties" : "/buy-properties"}/${property.propertyName ? property.propertyName.replace(/\s+/g, '-') : 'unknown'}/${property._id}/`}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-gray-100"
              >
                <div className="relative">
                  <img
                    src={property.thumbnailImage?.url || property.frontImage?.url}
                    alt={property.propertyName}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-[#E63946] text-white px-3 py-1 rounded-lg text-xs font-semibold">
                    Featured
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-base mb-2 truncate text-[#212529]">{property.propertyName}</h4>
                  <div className="flex items-center text-gray-600 text-sm mb-2">
                    <MapPin className="w-4 h-4 text-[#E63946] mr-1 flex-shrink-0" />
                    <span className="truncate">{property.city}, {property.state}</span>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                    <span className="font-bold text-lg text-[#E63946] flex items-center">
                      <IndianRupee className="w-4 h-4" />
                      {formatPrice(property.price, propertyType)}
                    </span>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
      
      {/* Trending Properties Section */}
      {TrendingProjects && TrendingProjects.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12 py-8 bg-gradient-to-b from-white to-gray-50">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Trending Properties</h3>
            <div className="w-20 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto rounded-full"></div>
            <p className="text-gray-600 mt-3">Explore the most popular properties right now</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {TrendingProjects.slice(0, 4).map((property, idx) => (
              <a
                key={property._id || idx}
                href={`/projects/${property.projectName ? property.projectName.replace(/\s+/g, '-').toLowerCase() : 'project'}/${property._id}/`}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-gray-100 group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={property.thumbnailImage?.url || property.frontImage?.url}
                    alt={property.projectName}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-red-600 to-orange-500 text-white px-3 py-1 rounded-lg text-xs font-semibold shadow-lg">
                    🔥 Trending
                  </div>
                  {property.projectStatus && (
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-800 px-2 py-1 rounded-lg text-xs font-medium">
                      {property.projectStatus}
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-base mb-2 truncate text-gray-900 group-hover:text-red-600 transition-colors">
                    {property.projectName}
                  </h4>
                  <div className="flex items-center text-gray-600 text-sm mb-2">
                    <MapPin className="w-4 h-4 text-red-500 mr-1 flex-shrink-0" />
                    <span className="truncate">{property.city}, {property.state}</span>
                  </div>
                  {property.type && (
                    <div className="flex items-center text-gray-600 text-xs mb-3">
                      <Home className="w-3 h-3 mr-1" />
                      <span>{property.type}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                    <span className="font-bold text-lg text-red-600 flex items-center">
                      <IndianRupee className="w-4 h-4" />
                      {property.minPrice ? `${property.minPrice} Cr` : 'Contact for Price'}
                    </span>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-red-500 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </a>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/projects-in-gurugram/"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              View All Trending Properties
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      )}
      
      {/* FAQ Section */}
      <FAQSection 
        faqs={propertyType === "rental" ? rentalFAQs : resaleFAQs} 
        type={propertyType === "rental" ? "rental" : "resale"} 
      />
      
      <Footer />
    </div>
  );
};

// Other Images image gellery
const ImageGalleryView = ({ images }) => {
  const [showAll, setShowAll] = useState(false);
  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startx, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  const handleMouseDown = (e) => {
    const container = scrollContainerRef.current;
    setIsDragging(true);
    setStartX(e.pageX - container.offsetLeft);
    setScrollLeft(container.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const container = scrollContainerRef.current;
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startx) * 1.5;
    container.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleOpenModal = (imgSrc) => {
    setIsModalOpen(true);
    setCurrentImage(imgSrc);
  };

  const closeModal = () => setIsModalOpen(false);

  const toggleShowAll = () => setShowAll((prevState) => !prevState);

  const imagesToRender = showAll ? images : images.slice(0, 3);

  return (
    <div>
      {/* Render the images */}
      <div
        className={`flex rounded-md gap-2 overflow-x-auto no-scrollbar scroll-smooth`}
        ref={scrollContainerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {imagesToRender.map((image) => (
          <img
            key={image.public_id}
            src={image.url}
            alt={`Image ${image.public_id}`}
            className="h-36 w-52 rounded-md object-cover"
            loading="lazy"
            onClick={() => handleOpenModal(image.url)}
            onDragStart={(e) => e.preventDefault()}
          />
        ))}
        {images.length > 3 && !showAll && (
          <div className="relative">
            <img
              src={images[3].url}
              alt={showAll ? "Show Less" : "Show More"}
              className="flex h-36 w-52 rounded-md basis-1/4 opacity-75 hover:opacity-100 cursor-pointer"
              loading="lazy"
            />
            <div
              className="absolute top-0 left-0 h-36 w-52 rounded bg-black/70 text-white flex items-center justify-center text-center"
              onClick={toggleShowAll}
            >
              +{images.length - 3} photos
            </div>
          </div>
        )}
        {isModalOpen && (
          <div className="fixed inset-0 pt-10 bg-black bg-opacity-75 flex justify-center items-center z-50">
            <div className="relative">
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-black text-base bg-white px-3 py-2 rounded-full z-10"
              >
                &times;
              </button>
              <img
                src={currentImage}
                alt="Full View"
                className="max-w-[80vw] max-h-[80vh] object-contain"
                loading="lazy"
              />
            </div>
          </div>
        )}
      </div>
      {/* Button to toggle the view */}
    </div>
  );
};

export default ShowPropertyDetails;