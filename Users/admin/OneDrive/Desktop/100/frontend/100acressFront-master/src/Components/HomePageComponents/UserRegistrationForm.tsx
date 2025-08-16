import React, { useState } from 'react';
import { User } from 'lucide-react'; // Assuming lucide-react is installed
import { useToast } from "../../hooks/use-toast"; // Adjust this path if your useToast hook is elsewhere

const UserRegistrationForm = ({ onRegister, language }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const { toast } = useToast();

  // Translations for the form
  const t = {
    en: {
      getStarted: "LET'S GET STARTED!",
      tellAbout: "Tell us about yourself to find your perfect property",
      fullName: "Full Name",
      emailAddress: "Email Address",
      phoneNumber: "Phone Number",
      startJourney: "Start Property Journey",
      requiredFields: "All fields are required.",
      invalidEmail: "Please enter a valid email address.",
      invalidPhone: "Please enter a valid 10-digit phone number."
    },
    hi: {
      getStarted: "चलिए शुरू करते हैं!",
      tellAbout: "अपनी perfect property ढूंढने के लिए हमें अपने बारे में बताएं",
      fullName: "पूरा नाम",
      emailAddress: "ईमेल पता",
      phoneNumber: "फ़ोन नंबर",
      startJourney: "प्रॉपर्टी यात्रा शुरू करें",
      requiredFields: "सभी फ़ील्ड अनिवार्य हैं।",
      invalidEmail: "कृपया एक वैध ईमेल पता दर्ज करें।",
      invalidPhone: "कृपया एक वैध 10 अंकों का फ़ोन नंबर दर्ज करें।"
    },
    hinglish: {
      getStarted: "CHALO SHURU KARTE HAIN!",
      tellAbout: "Apni perfect property dhundhne ke liye humein apne baare mein batao",
      fullName: "Pura Naam",
      emailAddress: "Email Address",
      phoneNumber: "Phone Number",
      startJourney: "Property Journey Shuru Karo",
      requiredFields: "Saare fields bharna zaroori hai.",
      invalidEmail: "Please ek valid email address daalo.",
      invalidPhone: "Please ek valid 10-digit phone number daalo."
    }
  }[language];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!fullName || !email || !phone) {
      toast({
        title: "Validation Error",
        description: t.requiredFields,
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: "Validation Error",
        description: t.invalidEmail,
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    // Basic 10-digit phone number validation for India
    if (!/^\d{10}$/.test(phone)) {
      toast({
        title: "Validation Error",
        description: t.invalidPhone,
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    onRegister({ name: fullName, email, phone });
  };

  return (
    // max-w-xs ensures it fits even in a very small parent.
    // Responsive padding and font sizes are applied.
    <div className="flex flex-col items-center justify-center text-center px-2 py-3 sm:px-4 sm:py-4 w-full max-w-xs">
      <div className="bg-red-500 rounded-full p-2.5 mb-3 sm:mb-4 shadow-lg">
        <User className="h-5 w-5 text-white" /> {/* Smaller icon */}
      </div>
      <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-1.5 sm:mb-2">{t.getStarted}</h2> {/* Smaller heading */}
      <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-5">{t.tellAbout}</p> {/* Smaller paragraph */}

      <form onSubmit={handleSubmit} className="w-full space-y-3 sm:space-y-4"> {/* Reduced space between elements */}
        <div>
          <label htmlFor="fullName" className="sr-only">{t.fullName}</label>
          <div className="relative">
            <User className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-400" /> {/* Smaller icon */}
            <input
              type="text"
              id="fullName"
              placeholder={`e.g. John Doe`}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full pl-9 pr-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent outline-none text-sm placeholder-gray-400" // Reduced padding, text size, added placeholder styling
              dir={language === 'hi' ? 'auto' : 'ltr'}
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="sr-only">{t.emailAddress}</label>
          <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            <input
              type="email"
              id="email"
              placeholder={`name@example.com`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-9 pr-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent outline-none text-sm placeholder-gray-400" // Reduced padding, text size
            />
          </div>
        </div>

        <div>
          <label htmlFor="phone" className="sr-only">{t.phoneNumber}</label>
          <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.57 2.31-.48 4.67-1.74 6.09a1.01 1.01 0 0 0-.01 1.24c.73.94 1.83 2.04 2.77 2.98a1.01 1.01 0 0 0 1.24-.01c1.42-1.26 3.78-2.31 6.09-1.74a2 2 0 0 1 1.72 2z"/></svg>
            <input
              type="tel"
              id="phone"
              placeholder={`9876543210`}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full pl-9 pr-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent outline-none text-sm placeholder-gray-400" // Reduced padding, text size
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.01] text-sm flex items-center justify-center space-x-2 group" // Reduced padding, text size
        >
          <span>{t.startJourney}</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform duration-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </form>
    </div>
  );
};

export default UserRegistrationForm;