import React, { useEffect, useState } from "react";
import { X, User, Mail, Phone, MapPin, Home, DollarSign } from "lucide-react";

const PopupForm = ({ onPopupVisibilityChange }) => {
  const [showImage, setShowImage] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    propertyType: "",
    budget: "",
  });

  useEffect(() => {
    if (typeof onPopupVisibilityChange === 'function') {
      onPopupVisibilityChange(showImage || showForm);
    }
  }, [showImage, showForm, onPopupVisibilityChange]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log("Form submitted:", formData);
    setIsSubmitting(false);
    setShowForm(false);
  };

  const formFields = [
    { 
      label: "Full Name", 
      name: "name", 
      type: "text", 
      icon: User,
      placeholder: "Enter your full name"
    },
    { 
      label: "Email Address", 
      name: "email", 
      type: "email", 
      icon: Mail,
      placeholder: "100acress@gmail.com"
    },
    { 
      label: "Phone Number", 
      name: "phone", 
      type: "tel", 
      icon: Phone,
      placeholder: "+91 8500-900-100"
    },
    { 
      label: "Preferred Location", 
      name: "location", 
      type: "text", 
      icon: MapPin,
      placeholder: "City, State"
    },
    { 
      label: "Property Type", 
      name: "propertyType", 
      type: "select", 
      icon: Home,
      options: ["100acress Agricultural land", "100acress Form House", "100acress Township"]
    },
    { 
      label: "Budget Range", 
      name: "budget", 
      type: "select", 
      icon: DollarSign,
      options: ["Under 5cr", "5cr-10cr", "10cr-15cr", "15cr-above"]
    },
  ];

  return (
    <>
      {showImage && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
          <div className="relative group">
            <img
              src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*XuhF7kYmmDcF98OTbZKYWA.jpeg"
              alt="Click to continue"
              className="max-w-full h-auto max-h-[80vh] cursor-pointer rounded-xl shadow-2xl object-contain transition-all duration-300 group-hover:scale-105 group-hover:shadow-3xl"
              onClick={() => {
                setShowImage(false);
                setShowForm(true);
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-xl pointer-events-none" />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-center animate-bounce">
              <p className="text-lg font-semibold mb-1">Click to Get Started</p>
              <p className="text-sm opacity-80">Find Your Dream Property</p>
            </div>
          </div>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-white p-6 sm:p-8 rounded-2xl w-full max-w-md lg:max-w-lg shadow-2xl relative animate-scale-in border border-gray-100">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1 hover:bg-gray-100 rounded-full"
              aria-label="Close Form"
            >
              <X size={20} />
            </button>
            
            <div className="text-center mb-3">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Request Property Info</h2>
              <p className="text-gray-600 text-sm">Fill out the form below and we'll get back to you shortly</p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              {formFields.map((field) => {
                const IconComponent = field.icon;
                return (
                 <div key={field.name} className="group">
  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor={field.name}>
    {field.label}
  </label>

  <div className="relative">
    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-red-500 transition-colors duration-200">
      {field.name === "budget" ? (
        <span className="text-sm font-semibold">Cr</span>
      ) : (
        <IconComponent size={18} />
      )}
    </div>

    {field.type === "select" ? (
      <select
        name={field.name}
        value={formData[field.name]}
        onChange={handleFormChange}
        required={field.name !== "budget"}
        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 bg-white hover:border-gray-400"
      >
        <option value="">Select {field.label}</option>
        {field.options?.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    ) : (
      <input
        type={field.type}
        name={field.name}
        value={formData[field.name]}
        onChange={handleFormChange}
        placeholder={field.placeholder}
        required={field.name !== "budget"}
        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
      />
    )}
  </div>
</div>

                );
              })}

              <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="order-2 sm:order-1 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="order-1 sm:order-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-3 rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[120px]"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    "Submit Request"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default PopupForm;
