import React, { useState, useEffect } from "react";
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
  const [buttonText, setButtonText] = useState('Submit');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  const resetData = () => {
    setDetails({ name: '', mobile: '' });
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
            <input
              type="tel"
              name="mobile"
              value={details.mobile}
              onChange={handleChange}
              required
              pattern="[6-9][0-9]{9}"
              maxLength="10"
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black"
              placeholder="Enter mobile number"
            />
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
    }, []);

    // Check if user has already submitted any enquiry
    useEffect(() => {
        // Check if user has already submitted any enquiry for insights
        const quickEnquirySubmitted = localStorage.getItem('quick_enquiry_insights');
        const callbackSubmitted = localStorage.getItem('callback_insights');
        const anyEnquirySubmitted = localStorage.getItem('enquiry_submitted_insights');
        
        // Also check if user has submitted enquiry for any project (global flag)
        const globalEnquirySubmitted = localStorage.getItem('user_enquiry_submitted');
        
        // Don't show popup if user has already submitted any form
        if (!quickEnquirySubmitted && !callbackSubmitted && !anyEnquirySubmitted && !globalEnquirySubmitted) {
            // Show quick enquiry modal after 3 seconds for insight pages
            setTimeout(() => {
                setIsQuickEnquiryModalOpen(true);
            }, 3000);
        }
    }, []);

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
