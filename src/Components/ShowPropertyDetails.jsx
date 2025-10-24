import React, { useState, useEffect, useContext, useRef } from "react";
import Footer from "../Components/Actual_Components/Footer";
import api from "../config/apiClient";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Skeleton } from "antd";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  ShareIcon,
  PhoneIcon,
  ForwardIcon,
  BackwardIcon,
  LcoationBiggerIcon,
  ArrowIcon,
} from "../Assets/icons";
import styled from "styled-components";
import Gallery from "../Components/Gallery";
import StarCarousel from "./HomePageComponents/Carousel";

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

  const [rentViewDetails, setRentViewDetails] = useState();
  const [buyData, setBuyData] = useState([]);
  const [showNumber, setShowNumber] = useState(false);
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
    e.preventDefault();
    if (inquiryFormRef.current) {
      inquiryFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setHighlightForm(true);
      setShowFormPopup(true);
      setTimeout(() => setHighlightForm(false), 2000);
    } else {
      setShowFormPopup(true);
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
    <div className="bg-[#f8fafc] min-h-screen font-['Inter','Poppins','sans-serif']">
      {/* Breadcrumb navigation (inline, above property name) */}
      <div className="pt-20 max-w-6xl mx-auto px-2 sm:px-4">
        {loading || !propertyType ? (
          <Skeleton active />
        ) : (
          rentViewDetails && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {/* Left: Property Image & Info */}
              <div className="w-full">
                {/* Breadcrumb above property name */}
                <nav className="mb-0 flex justify-start -ml-2" aria-label="Breadcrumb">
                  <ol className="flex items-center space-x-2 text-sm text-gray-500 pl-2">
                    <li>
                      <a href={propertyType === "rental" ? "/rental-properties/best-rental-property-in-gurugram/" : "/buy-properties/best-resale-property-in-gurugram/"} className="hover:text-[#e63946] font-medium transition-colors">
                        {propertyType === "rental" ? "Rental Property" : "Resale Property"}
                      </a>
                    </li>
                    <li>
                      <span className="mx-1">&gt;</span>
                    </li>
                    <li className="truncate max-w-xs font-semibold text-gray-700" aria-current="page">
                      {rentViewDetails?.propertyName || 'Property'}
                    </li>
                  </ol>
                </nav>
                <div className="mb-4">
                  <div className="flex flex-col gap-2 mb-2">
                    <span className="text-3xl font-extrabold text-gray-900 whitespace-nowrap overflow-hidden text-ellipsis">{rentViewDetails?.propertyName}</span>
                    <div className="flex items-center gap-3">
                      <span className="bg-[#e63946]/10 text-[#e63946] font-semibold px-3 py-1 rounded-full text-xs uppercase tracking-wide">{rentViewDetails?.propertyType}</span>
                      {/* Optional badge */}
                      <span className="bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full text-xs">Verified</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-1 w-fit mb-2">
                    <LcoationBiggerIcon className="h-4 w-4 text-[#e63946]" />
                    <span className="text-sm text-gray-700">Located in {rentViewDetails?.address}, {rentViewDetails?.city}, {rentViewDetails?.state}</span>
                  </div>
                </div>
                {/* Property Image */}
                <div className="relative mb-4">
                  <img
                    src={rentViewDetails?.frontImage?.url}
                    alt={rentViewDetails?.propertyName}
                    className="w-full h-72 sm:h-96 object-cover rounded-3xl shadow-xl border border-gray-100 transition-transform duration-300 hover:scale-105"
                  />
                  {/* Floating Call Button */}
                  <button
                    onClick={handlePhoneClick}
                    aria-label="Contact via phone"
                    className="fixed bottom-4 right-4 z-50 bg-gradient-to-r from-[#e63946] to-[#d7263d] shadow-2xl rounded-full h-14 px-6 flex items-center gap-3 border-4 border-white focus:outline-none focus:ring-2 focus:ring-[#e63946]/30 transition-all duration-200 hover:scale-105 hover:shadow-[0_8px_32px_0_rgba(230,57,70,0.35)]"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden="true">
                      <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.07 21 3 13.93 3 5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.01l-2.2 2.2z" fill="#fff"/>
                    </svg>
                    <span className="text-white font-bold text-base">Call Now</span>
                  </button>
                  {/* Optional badge overlay */}
                  <span className="absolute top-4 left-4 bg-[#e63946] text-white font-bold px-3 py-1 rounded-full text-xs shadow-lg animate-pulse">Hot Property</span>
                </div>
                {/* Property Image Gallery Thumbnails */}
                <div className="mb-6">
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {[rentViewDetails?.frontImage, ...(rentViewDetails?.otherImage || [])]
                      .filter(img => img && img.url)
                      .map((img, idx) => (
                        <img
                          key={img.url || idx}
                          src={img.url}
                          alt={`Property image ${idx + 1}`}
                          className="h-20 w-32 object-cover rounded-lg border border-gray-200 cursor-pointer transition-transform duration-200 hover:scale-105"
                          onClick={() => { setGalleryImageData([rentViewDetails?.frontImage, ...(rentViewDetails?.otherImage || [])].filter(i => i && i.url).map(i => ({ url: i.url, thumbnail: i.url }))); setOpenGallery(true); }}
                        />
                      ))}
                  </div>
                  {OpenGallery && (
                    <Gallery
                      images={GalleryImageData}
                      OpenGallery={OpenGallery}
                      setOpenGallery={setOpenGallery}
                    />
                  )}
                </div>
                {/* Price */}
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-2xl font-extrabold text-[#e63946]">₹ {formatPrice(rentViewDetails?.price, propertyType)}</span>
                </div>
                {/* About Property & Highlights */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-2">About Property</h3>
                  <p className="text-base text-gray-700 mb-4">{rentViewDetails?.descripation || 'Please call us for further information'}</p>
                  <h4 className="text-lg font-semibold mb-1">Property Highlights</h4>
                  <ul className="list-disc pl-5 text-base text-gray-600 space-y-1">
                    {rentViewDetails?.area && <li>{rentViewDetails.area}</li>}
                    {rentViewDetails?.furnishing && <li>{rentViewDetails.furnishing}</li>}
                    {rentViewDetails?.landMark && <li>{rentViewDetails.landMark}</li>}
                    {rentViewDetails?.type && <li>{rentViewDetails.type}</li>}
                  </ul>
                </div>
              </div>
              {/* Right: Inquiry Form & CTA */}
              <div className="w-full max-w-md mx-auto md:mx-0" ref={inquiryFormRef}>
                {/* Modern Inquiry Form */}
                <div className={`bg-white/80 rounded-2xl shadow-xl p-6 mb-6 border border-gray-100 relative transition-all duration-300 ${highlightForm ? 'ring-2 ring-[#e63946] ring-offset-2' : ''}`}>
                  {showFormPopup && (
                    <div className="absolute inset-0 flex items-center justify-center z-20">
                      <div className="bg-white border border-[#e63946] rounded-xl shadow-lg px-6 py-4 text-center text-[#e63946] font-semibold text-base animate-fade-in">
                        First fill the form to see the contact details.
                        <button className="block mx-auto mt-3 px-4 py-1 bg-[#e63946] text-white rounded-full text-sm shadow hover:bg-red-700 transition" onClick={() => setShowFormPopup(false)}>OK</button>
                      </div>
                    </div>
                  )}
                  <h3 className="text-xl font-bold mb-4">Know more about property</h3>
                  <form onSubmit={handleSubmitFormData} className="space-y-5">
                    <div className="relative">
                      <input
                        type="text"
                        name="custName"
                        required
                        className="peer w-full border border-gray-300 rounded-lg bg-gray-50 px-4 pt-6 pb-2 text-base focus:outline-none focus:ring-2 focus:ring-[#e63946] transition-all"
                        onChange={handleUserFormChange}
                        value={userForm.custName}
                        placeholder=" "
                      />
                      <label className="absolute left-4 top-2 text-gray-400 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm bg-white/80 px-1 rounded pointer-events-none">Full Name</label>
                    </div>
                    <div className="relative">
                      <input
                        type="number"
                        name="custNumber"
                        required
                        className="peer w-full border border-gray-300 rounded-lg bg-gray-50 px-4 pt-6 pb-2 text-base focus:outline-none focus:ring-2 focus:ring-[#e63946] transition-all"
                        onChange={handleUserFormChange}
                        value={userForm.custNumber}
                        placeholder=" "
                      />
                      <label className="absolute left-4 top-2 text-gray-400 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm bg-white/80 px-1 rounded pointer-events-none">Mobile Number</label>
                    </div>
                    <div className="relative">
                      <input
                        type="email"
                        name="custEmail"
                        required
                        className="peer w-full border border-gray-300 rounded-lg bg-gray-50 px-4 pt-6 pb-2 text-base focus:outline-none focus:ring-2 focus:ring-[#e63946] transition-all"
                        onChange={handleUserFormChange}
                        value={userForm.custEmail}
                        placeholder=" "
                      />
                      <label className="absolute left-4 top-2 text-gray-400 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm bg-white/80 px-1 rounded pointer-events-none">Email address</label>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Fill out form only once to get contact details</p>
                    <button
                      type="submit"
                      className="w-full bg-[#e63946] hover:bg-red-700 text-white font-bold py-3 rounded-full shadow-lg transition-all duration-200 text-base mt-2"
                    >
                      Get Details
                    </button>
                  </form>
                </div>
                {/* Post Property CTA Card */}
                <div className="bg-gradient-to-r from-[#e63946]/10 to-[#457b9d]/10 rounded-2xl shadow-lg p-6 flex flex-col items-center border border-gray-100">
                  <h5 className="text-lg font-bold mb-2 text-gray-800">Post your Property for <span className="text-[#e63946]">FREE!</span></h5>
                  <Link to={"https://100acress.com/postproperty/"}>
                    <button className="mt-2 bg-[#e63946] hover:bg-red-700 text-white font-bold px-6 py-2 rounded-full shadow transition-all duration-200 text-base">
                      List Properties <span className="bg-white text-xs text-[#e63946] p-1 mx-1 rounded">FREE</span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )
        )}
      </div>
      {buyData && buyData.length > 0 && (
        <div className="w-full mt-2 mb-0 pb-0 max-w-5xl mx-auto">
          <div className="similar-properties-container mb-4">
            <h3 className="text-2xl font-bold mb-2 text-gray-900">Similar Properties</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 min-h-[40vh] py-8">
            {buyData.slice(0, 12).map((property, idx) => (
              <div key={property._id || idx} className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col w-full h-64 border border-gray-100">
                <img
                  src={property.thumbnailImage?.url || property.frontImage?.url}
                  alt={property.propertyName}
                  className="w-full h-28 object-cover rounded-t-xl"
                  loading="lazy"
                />
                <div className="p-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-semibold text-base mb-0 truncate">{property.propertyName}</h4>
                    <div className="flex items-center text-gray-500 text-xs mb-0.5">
                      <span className="mr-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block text-[#e63946]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      </span>
                      <span className="truncate">{property.address}</span>
                    </div>
                    <div className="text-xs text-gray-400 mb-1 truncate">{property.city},{property.state}</div>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                                          <span className="font-bold text-xs text-gray-900"><span className="text-[#e63946]">₹ {formatPrice(property.price, propertyType)}</span></span>
                    <a href={`${propertyType === "rental" ? "/rental-properties" : "/buy-properties"}/${property.propertyName ? property.propertyName.replace(/\s+/g, '-') : 'unknown'}/${property._id}/`} target="_blank" rel="noopener noreferrer">
                      <button className="bg-[#e63946] hover:bg-red-700 text-white rounded-xl p-2 transition-all duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <style>{`
            .custom-slick-arrows .slick-arrow {
              z-index: 10;
              background: #fff;
              border-radius: 50%;
              box-shadow: 0 2px 8px rgba(0,0,0,0.08);
              width: 32px;
              height: 32px;
              display: flex !important;
              align-items: center;
              justify-content: center;
              top: 38%;
            }
            .custom-slick-arrows .slick-arrow:before {
              color: #e63946;
              font-size: 22px;
            }
            .custom-slick-arrows .slick-prev {
              left: -12px;
            }
            .custom-slick-arrows .slick-next {
              right: -12px;
            }
            .custom-slick-arrows,
            .similar-properties-container,
            .slick-list,
            .slick-track {
              margin-bottom: 1rem !important;
              padding-bottom: 0 !important;
              min-height: unset !important;
              height: auto !important;
            }
          `}</style>
        </div>
      )}
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