import React, { useMemo } from 'react';
import { MessageCircle, X, Send, User, Bot, Maximize2, Minimize2, Globe, Home, MapPin, CreditCard, Calendar, Sparkles } from 'lucide-react';
import UserRegistrationForm from './UserRegistrationForm'; // Corrected import path
import { useToast } from "../../hooks/use-toast"; // Adjust path as needed

const predefinedFAQs = {
  en: [
    {
      question: "What's your budget range for property investment?",
      answer: "Great question! Our properties range from ₹25 lakhs to ₹5 crores. We have affordable housing options, mid-segment apartments, and luxury villas. What's your comfortable investment range?",
      keywords: ["budget", "price", "cost", "investment", "range", "affordable", "luxury"]
    },
    {
      question: "Are you looking for ready-to-move or under-construction properties?",
      answer: "We have both! Ready-to-move properties for immediate possession and under-construction projects with attractive pre-launch prices. Which would you prefer?",
      keywords: ["ready", "move", "construction", "possession", "immediate", "pre-launch"]
    },
    {
      question: "What size property are you looking for?",
      answer: "We offer various configurations: 1BHK (600-800 sq ft), 2BHK (900-1200 sq ft), 3BHK (1300-1800 sq ft), and 4BHK+ (2000+ sq ft). What suits your family size?",
      keywords: ["size", "bhk", "configuration", "area", "family", "space"]
    },
    {
      question: "Do you need help with home loan approval?",
      answer: "Absolutely! We have partnerships with 15+ leading banks offering loans up to 90% of property value. Our team can help you get pre-approved in 24 hours. Interested?",
      keywords: ["loan", "finance", "bank", "approval", "emi", "interest"]
    },
    {
      question: "Which location interests you the most?",
      answer: "Popular locations include Gurgaon (Sohna Road, Golf Course Road), Noida (Sector 62, 150), Delhi NCR, and Bangalore. Each offers unique advantages. Any preferred area?",
      keywords: ["location", "area", "gurgaon", "noida", "delhi", "bangalore", "sector"]
    },
    {
      question: "Are you a first-time home buyer?",
      answer: "Perfect! We offer special guidance for first-time buyers including documentation help, legal verification, and step-by-step purchase process. We'll make it simple for you!",
      keywords: ["first", "time", "buyer", "new", "guidance", "help"]
    }
  ],
  hi: [
    {
      question: "प्रॉपर्टी investment के लिए आपका budget range क्या है?",
      answer: "बहुत अच्छा सवाल! हमारी properties ₹25 लाख से ₹5 करोड़ तक हैं। हमारे पास affordable housing, mid-segment apartments, और luxury villas हैं। आपका comfortable investment range क्या है?",
      keywords: ["budget", "price", "cost", "investment", "range", "किफायती", "luxury", "पैसा"]
    },
    {
      question: "आप ready-to-move या under-construction property ढूंढ रहे हैं?",
      answer: "हमारे पास दोनों हैं! Ready-to-move properties immediate possession के लिए और under-construction projects attractive pre-launch prices के साथ। आप क्या prefer करेंगे?",
      keywords: ["ready", "move", "construction", "possession", "तुरंत", "pre-launch", "तैयार"]
    },
    {
      question: "आप कितने size की property ढूंढ रहे हैं?",
      answer: "हमारे पास विभिन्न configurations हैं: 1BHK (600-800 sq ft), 2BHK (900-1200 sq ft), 3BHK (1300-1800 sq ft), और 4BHK+ (2000+ sq ft)। आपके family size के लिए क्या suitable है?",
      keywords: ["size", "bhk", "configuration", "area", "family", "जगह", "कमरा"]
    },
    {
      question: "क्या आपको home loan approval में help चाहिए?",
      answer: "बिल्कुल! हमारी 15+ leading banks के साथ partnerships हैं जो property value का 90% तक loan देती हैं। हमारी team आपको 24 hours में pre-approved करवा सकती है। Interested हैं?",
      keywords: ["loan", "finance", "bank", "approval", "emi", "ब्याज", "कर्ज"]
    },
    {
      question: "कौन सी location आपको सबसे ज्यादा interest करती है?",
      answer: "Popular locations में Gurgaon (Sohna Road, Golf Course Road), Noida (Sector 62, 150), Delhi NCR, और Bangalore हैं। हर एक के unique advantages हैं। कोई preferred area है?",
      keywords: ["location", "area", "gurgaon", "noida", "delhi", "bangalore", "sector", "जगह"]
    },
    {
      question: "क्या आप first-time home buyer हैं?",
      answer: "Perfect! हम first-time buyers के लिए special guidance offer करते हैं जिसमें documentation help, legal verification, और step-by-step purchase process शामिल है। हम आपके लिए इसे simple बनाएंगे!",
      keywords: ["first", "time", "buyer", "new", "guidance", "help"]
    }
  ],
  hinglish: [
    {
      question: "Bhai property investment ke liye budget kitna hai?",
      answer: "Arre yaar! Hamare paas ₹25 lakh se ₹5 crore tak ke properties hain. Affordable housing se lekar luxury villas tak sab kuch hai. Batao kitna invest karna chahte ho?",
      keywords: ["budget", "price", "cost", "investment", "paisa", "kitna", "afford"]
    },
    {
      question: "Ready property chahiye ya under construction wali?",
      answer: "Dono options hain bro! Ready-to-move properties hain immediate possession ke liye, aur under-construction projects hain jo pre-launch rates mein mil jaayenge. Kya prefer karoge?",
      keywords: ["ready", "move", "construction", "possession", "turant", "launch"]
    },
    {
      question: "Kitne BHK ki property chahiye?",
      answer: "Options bohot hain yaar! 1BHK se 4BHK+ tak. Family size ke hisaab se choose kar sakte ho. 2BHK most popular hai couples ke liye. Batao family mein kitne log hain?",
      keywords: ["bhk", "size", "family", "kitne", "log", "area"]
    },
    {
      question: "Home loan approve karvana hai kya?",
      answer: "Haan bilkul! 15+ banks ke saath tie-up hai humara. 90% tak loan mil jaata hai. Sirf 24 hours mein pre-approval ho jaayega. Chahiye help?",
      keywords: ["loan", "bank", "approval", "emi", "finance", "help"]
    },
    {
      question: "Kahan ki property prefer karoge?",
      answer: "Top locations hain - Gurgaon, Noida, Delhi NCR, Bangalore. Sab mein connectivity aur amenities achi hain. Koi particular area hai mind mein?",
      keywords: ["location", "kahan", "area", "gurgaon", "noida", "delhi"]
    },
    {
      question: "First time property le rahe ho?",
      answer: "No tension! First-time buyers ke liye special guidance dete hain. Documentation se lekar legal verification tak sab handle kar denge. Tension free process hogi!",
      keywords: ["first", "time", "buyer", "new", "help", "guidance"]
    }
  ]
};

const translations = {
  en: {
    title: "Property Assistant",
    status: "Online now",
    placeholder: "Ask about properties...",
    greeting: "🏡 Hello! I'm your Property Assistant. I'm here to help you find your dream home or answer any real estate questions. How can I assist you today?",
    defaultResponse: "That's a great question! I'd love to help you with that. For more specific details, our property experts can provide personalized assistance. What else would you like to know about properties?",
    suggestedText: "💡 Popular questions:",
    suggestedQuestions: [
      "What's your budget range for property investment?",
      "Are you looking for ready-to-move or under-construction properties?",
      "Do you need help with home loan approval?",
      "Which location interests you the most?"
    ],
    typing: "Assistant is typing..."
  },
  hi: {
    title: "प्रॉपर्टी असिस्टेंट",
    status: "अभी ऑनलाइन",
    placeholder: "प्रॉपर्टी के बारे में पूछें...",
    greeting: "🏡 नमस्ते! मैं आपका प्रॉपर्टी असिस्टेंट हूं। मैं आपको आपका सपनों का घर खोजने या रियल एस्टेट से जुड़े सवालों के जवाब देने में मदद करने के लिए यहां हूं। आज मैं आपकी कैसे मदद कर सकता हूं?",
    defaultResponse: "यह बहुत अच्छा सवाल है! मुझे आपकी मदद करने में खुशी होगी। अधिक विशिष्ट जानकारी के लिए, हमारे प्रॉपर्टी experts व्यक्तिगत सहायता प्रदान कर सकते हैं। प्रॉपर्टी के बारे में और क्या जानना चाहेंगे?",
    suggestedText: "💡 लोकप्रिय प्रश्न:",
    suggestedQuestions: [
      "प्रॉपर्टी investment के लिए आपका budget range क्या है?",
      "आप ready-to-move या under-construction property ढूंढ रहे हैं?",
      "क्या आपको home loan approval में help चाहिए?",
      "कौन सी location आपको सबसे ज्यादा interest करती है?"
    ],
    typing: "असिस्टेंट टाइप कर रहा है..."
  },
  hinglish: {
    title: "Property Assistant",
    status: "Online hai",
    placeholder: "Property ke baare mein poochiye...",
    greeting: "🏡 Namaste! Main aapka Property Assistant hun. Aapko dream home dhundne ya real estate questions ke answers dene ke liye yahan hun. Aaj kaise help kar sakta hun?",
    defaultResponse: "Ye bahut accha question hai yaar! Aapki help karne mein khushi hogi. Specific details ke liye hamare property experts personal assistance de sakte hain. Property ke baare mein aur kya jaanna hai?",
    suggestedText: "💡 Popular questions:",
    suggestedQuestions: [
      "Bhai property investment ke liye budget kitna hai?",
      "Ready property chahiye ya under construction wali?",
      "Home loan approve karvana hai kya?",
      "Kahan ki property prefer karoge?"
    ],
    typing: "Assistant type kar raha hai..."
  }
};


const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [language, setLanguage] = useState('en');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [pulseAnimation, setPulseAnimation] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const messagesEndRef = useRef(null);
  const { toast } = useToast();

  const toggleLanguage = () => {
    setLanguage(prevLang => {
      if (prevLang === 'en') return 'hi';
      if (prevLang === 'hi') return 'hinglish';
      return 'en'; // Cycles back to English
    });
    // Optional: Add a toast notification for language change
    toast({
      title: "Language Changed",
      description: `Chat language switched to ${language === 'en' ? 'Hindi' : language === 'hi' ? 'Hinglish' : 'English'}.`,
      duration: 2000,
    });
  };

  useEffect(() => {
    // Attempt to load user details from localStorage
    try {
      const storedDetails = localStorage.getItem('userDetails');
      if (storedDetails) {
        setUserDetails(JSON.parse(storedDetails));
        setIsRegistered(true);
      });
    } catch (error) {
      console.error("Failed to parse user details from localStorage:", error);
      localStorage.removeItem('userDetails'); // Clear corrupted data
    }
  });

  useEffect(() => {
    // Save user details to localStorage when they change
    if (userDetails) {
      localStorage.setItem('userDetails', JSON.stringify(userDetails));
    }); else {
      localStorage.removeItem('userDetails');
    }
  }, [userDetails]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  });, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && isRegistered) {
      // Determine initial language based on user's name if available, otherwise default
      const currentLang = detectLanguage(userDetails?.name || '');
      setLanguage(currentLang);
      
      // Add initial greeting message only if chat is empty
      if (messages.length === 0) {
        setMessages([{
          id: '1',
          text: translations[currentLang].greeting,
          isUser: false,
          timestamp: new Date()
        }]);
      }
    } else if (isOpen && !isRegistered && messages.length === 0) {
        // If chat is opened and user is not registered, clear messages to show form
        setMessages([]);
    }
  }, [isOpen, isRegistered, userDetails]); // Added messages as a dependency to prevent re-adding greeting

  useEffect(() => {
    // Pulse animation for the chat bubble when closed
    if (!isOpen) {
      const interval = setInterval(() => {
        setPulseAnimation(true);
        setTimeout(() => setPulseAnimation(false), 2000);
      });, 8000); // Pulse every 8 seconds
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  const detectLanguage = (text) => {
    const hindiRegex = /[\u0900-\u097F]/; // Matches Devanagari script
    const englishRegex = /[a-zA-Z]/;     // Matches English alphabet
    
    const hasHindi = hindiRegex.test(text);
    const hasEnglish = englishRegex.test(text);
    
    if (hasHindi && hasEnglish) return 'hinglish';
    if (hasHindi) return 'hi';
    return 'en'; // Default to English if no specific detection
  };

  const handleRegistration = (details) => {
    console.log('User registered:', details);
    setUserDetails(details);
    setIsRegistered(true);
    
    toast({
      title: "🎉 Registration Successful!",
      description: `Welcome ${details.name}! You can now chat with our Property Assistant.`,
      duration: 3000,
    });
    // Immediately add greeting after successful registration
    setMessages([{
      id: '1',
      text: translations[detectLanguage(details.name)].greeting,
      isUser: false,
      timestamp: new Date()
    }]);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsExpanded(false); // Also minimize when closing
  };

  const findBestMatch = (userInput) => {
    const input = userInput.toLowerCase();
    const detectedLang = detectLanguage(userInput);
    
    // Prioritize detected language for FAQ search, falling back to current state language if detected is English, then to English FAQ data
    const currentLangForSearch = (detectedLang !== 'en' && detectedLang) || language; 
    
    // Auto-switch UI language if detected language is different and not already set
    if (detectedLang && detectedLang !== language) {
        setLanguage(detectedLang);
    }

    let bestMatch = null;
    let maxScore = 0;

    const faqs = predefinedFAQs[currentLangForSearch] || predefinedFAQs.en; // Fallback to English FAQs if specific language not found

    faqs.forEach(faq => {
      let score = 0;
      // Keyword matching
      faq.keywords.forEach(keyword => {
        if (input.includes(keyword.toLowerCase())) {
          score += 1;
        }
      });
      
      // Word overlap with question/answer
      const inputWords = input.split(/\s+/).filter(word => word.length > 2); // Split by whitespace, filter short words
      inputWords.forEach(word => {
        if (faq.question.toLowerCase().includes(word) || faq.answer.toLowerCase().includes(word)) {
          score += 0.5;
        }
      });

      if (score > maxScore) {
        maxScore = score;
        bestMatch = faq;
      }
    });

    // A minimum score threshold to consider it a "match"
    return maxScore >= 1 ? bestMatch : null;
  };

  const handleSendMessage = (messageText) => {
    if (!isRegistered) {
      toast({
        title: "Registration Required",
        description: "Please complete your registration to start chatting!",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    const textToSend = messageText || inputValue;
    if (!textToSend.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: textToSend,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    setInputValue(''); // Clear input immediately

    const bestMatch = findBestMatch(textToSend);
    
    setTimeout(() => {
      setIsTyping(false);
      const botResponse = {
        id: (Date.now() + 1).toString(),
        text: bestMatch 
          ? bestMatch.answer 
          : translations[language].defaultResponse, // Use current UI language for default response
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000 + Math.random() * 800); // Shorter typing delay
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage(); // Call with no arguments to use inputValue
    }
  };

  const handleQuestionClick = (question) => {
    handleSendMessage(question);
  };

  const getRandomSuggestions = () => {
    const currentFAQs = predefinedFAQs[language] || predefinedFAQs.en;
    const shuffled = [...currentFAQs].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3).map(faq => faq.question);
  };

  const getQuestionIcon = (question) => {
    // Icons based on keywords in the question
    if (question.toLowerCase().includes('budget') || question.toLowerCase().includes('price') || question.toLowerCase().includes('कीमत')) return <CreditCard className="h-3.5 w-3.5" />;
    if (question.toLowerCase().includes('ready') || question.toLowerCase().includes('construction') || question.toLowerCase().includes('तैयार')) return <Home className="h-3.5 w-3.5" />;
    if (question.toLowerCase().includes('size') || question.toLowerCase().includes('bhk') || question.toLowerCase().includes('कमरा')) return <Sparkles className="h-3.5 w-3.5" />;
    if (question.toLowerCase().includes('loan') || question.toLowerCase().includes('finance') || question.toLowerCase().includes('कर्ज')) return <CreditCard className="h-3.5 w-3.5" />;
    if (question.toLowerCase().includes('location') || question.toLowerCase().includes('area') || question.toLowerCase().includes('जगह')) return <MapPin className="h-3.5 w-3.5" />;
    if (question.toLowerCase().includes('first-time') || question.toLowerCase().includes('new') || question.toLowerCase().includes('पहली बार')) return <User className="h-3.5 w-3.5" />;
    return <Sparkles className="h-3.5 w-3.5" />; // Default icon
  };

  // Main logic for chat window sizing and positioning
  const getChatDimensions = () => {
    // Default desktop size (small)
    let sizeClasses = 'w-[320px] h-[480px]';

    if (isExpanded) {
      // Larger desktop size when expanded
      sizeClasses = 'w-[450px] h-[650px]';
    }

    // Mobile specific classes (full-width, docked to bottom with top margin)
    // 'fixed inset-x-2 bottom-2 top-14' ensures it's nearly full screen on mobile but leaves a top bar space.
    // 'rounded-none' for expanded mobile view makes it truly full screen without rounded corners.
    const mobileSpecificClasses = 'fixed inset-x-2 bottom-2 top-14'; 
    const mobileExpandedClasses = 'fixed inset-0 rounded-none'; 

    return `${mobileSpecificClasses} sm:relative sm:max-w-none sm:top-auto sm:right-auto sm:bottom-auto sm:left-auto ${isExpanded ? mobileExpandedClasses : 'rounded-3xl'} ${sizeClasses}`;
  };

  const getButtonPosition = () => {
    // Position of the floating chat bubble toggle button
    return 'fixed bottom-4 right-4 z-[100]'; // Increased z-index
  };

  return (
    <div className={getButtonPosition()}>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className={`relative h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-gradient-to-br from-red-500 via-red-600 to-red-700 hover:from-red-600 hover:via-red-700 hover:to-red-800 shadow-2xl hover:shadow-red-500/25 transition-all duration-500 transform hover:scale-110 flex items-center justify-center group overflow-hidden ${
            pulseAnimation ? 'animate-pulse' : ''
          }`}
          aria-label="Open Chatbot"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-400 to-red-600 animate-ping opacity-20"></div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
          
          <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7 text-white z-10 transform group-hover:rotate-12 transition-transform duration-300" />
          
          <div className="absolute -top-1 -right-1 h-3.5 w-3.5 sm:h-4 w-4 bg-green-400 rounded-full flex items-center justify-center border-2 border-white">
            <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 bg-white rounded-full animate-pulse"></div>
          </div>
        </button>
      )}

      {isOpen && (
        <div className={`bg-white shadow-2xl backdrop-blur-lg border border-gray-100 flex flex-col transition-all duration-500 transform ${getChatDimensions()} animate-in slide-in-from-bottom-4 fade-in z-[99]`}> {/* Adjusted z-index */}
          <div className={`bg-gradient-to-r from-red-500 via-red-600 to-red-700 rounded-t-3xl p-3 sm:p-4 flex items-center justify-between relative overflow-hidden min-h-[50px] sm:min-h-[60px] ${isExpanded ? 'rounded-none' : ''}`}>

            {/* Background elements for elegance */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
            <div className="absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 bg-white/5 rounded-full -translate-y-10 translate-x-10"></div>
            
            <div className="flex items-center space-x-2 sm:space-x-3 z-10">
              <div className="relative">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center shadow-lg`}>
                  <Bot className={`h-4 w-4 sm:h-6 sm:w-6 text-red-500`} />
                </div>
              </div>
              <div>
                {/* Display user's name if registered, else "Property Assistant" */}
                <h3 className={`text-white font-semibold text-sm sm:text-lg whitespace-nowrap overflow-hidden text-ellipsis`}>
                  {userDetails?.name || translations[language].title}
                </h3>
                <p className={`text-white/90 text-xs sm:text-sm flex items-center`}>
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5 animate-pulse"></div>
                  {translations[language].status}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-1 sm:space-x-2 z-10">
              <button
                onClick={toggleLanguage}
                className={`text-white hover:bg-white/20 h-8 w-8 sm:h-10 sm:w-10 p-0 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110`}
                title="Switch Language"
                aria-label="Switch Language"
              >
                <Globe className={`h-4 w-4 sm:h-5 sm:w-5`} />
              </button>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className={`text-white hover:bg-white/20 h-8 w-8 sm:h-10 sm:w-10 p-0 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110`}
                title={isExpanded ? 'Minimize' : 'Fullscreen'}
                aria-label={isExpanded ? 'Minimize Chat Window' : 'Expand Chat Window'}
              >
                {isExpanded ? <Minimize2 className={`h-4 w-4 sm:h-5 sm:w-5`} /> : <Maximize2 className={`h-4 w-4 sm:h-5 sm:w-5`} />}
              </button>
              <button
                onClick={handleClose}
                className={`text-white hover:bg-white/20 h-8 w-8 sm:h-10 sm:w-10 p-0 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-90`}
                title="Close Chat"
                aria-label="Close Chat Window"
              >
                <X className={`h-4 w-4 sm:h-5 sm:w-5`} />
              </button>
            </div>
          </div>

          {!isRegistered ? (
            <div className="flex-1 flex flex-col items-center justify-center p-3 sm:p-4 overflow-y-auto">
              <UserRegistrationForm language={language} onRegister={handleRegistration} />
            </div>
          ) : (
            <>
              <div className={`flex-1 p-3 sm:p-4 overflow-y-auto bg-gradient-to-b from-gray-50/50 to-white`}>
                <div className={`flex flex-col gap-2 sm:gap-3`}>

                  {messages.map((message, index) => (
                    <div key={message.id} className="animate-in fade-in slide-in-from-bottom-2">
                      <div className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                        <div className={`flex items-end space-x-2 sm:space-x-3 max-w-[85%] ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                          <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shadow-md flex-shrink-0 ${ // Smaller avatar and shadow
                            message.isUser 
                              ? 'bg-gradient-to-br from-red-500 to-red-600' 
                              : 'bg-gradient-to-br from-gray-100 to-gray-200'
                          }`}>
                            {message.isUser 
                              ? <User className={`h-3 w-3 sm:h-4 w-4 text-white`} /> // Smaller icon
                              : <Bot className={`h-3 w-3 sm:h-4 w-4 text-gray-600`} /> // Smaller icon
                            }
                          </div>
                          <div className={`rounded-xl px-3 py-2 sm:px-3.5 sm:py-2.5 shadow-md ${ // Smaller padding, less rounded, subtle shadow
                            message.isUser
                              ? 'bg-gradient-to-br from-red-500 to-red-600 text-white'
                              : 'bg-white text-gray-800 border border-gray-100'
                          }`}>
                            <p className={`text-sm leading-relaxed`}>{message.text}</p> {/* Base text size for message */}
                            <div className={`text-xs mt-1 opacity-70 ${message.isUser ? 'text-white/80' : 'text-gray-500'}`}> {/* Smaller timestamp */}
                              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Suggested questions only appear after bot messages */}
                      {!message.isUser && (
                        <div className="mt-3 ml-9 sm:ml-11 space-y-2"> {/* Adjusted margin-left for suggestions */}
                          <p className="text-sm text-gray-600 mb-2 font-medium">{translations[language].suggestedText}</p> {/* Smaller text */}
                          <div className="grid gap-2"> {/* Smaller gap for buttons */}
                            {/* Show predefined questions for the first bot message, then random ones */}
                            {(index === 0 ? translations[language].suggestedQuestions : getRandomSuggestions()).map((question, qIndex) => (
                              <button
                                key={qIndex}
                                onClick={() => handleQuestionClick(question)}
                                className="flex items-center space-x-2 w-full text-left text-sm p-2.5 bg-gradient-to-r from-red-50 to-pink-50 hover:from-red-100 hover:to-pink-100 rounded-lg transition-all duration-300 text-gray-700 border border-red-100 hover:border-red-200 hover:shadow-sm transform hover:scale-[1.01] group" // Smaller padding, subtle shadow
                                aria-label={`Ask: ${question}`}
                              >
                                <div className="text-red-500 group-hover:scale-110 transition-transform duration-300">
                                  {getQuestionIcon(question)}
                                </div>
                                <span className="flex-1">{question}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2">
                      <div className="flex items-end space-x-2">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 shadow-md">
                          <Bot className="h-3 w-3 sm:h-4 w-4 text-gray-600" />
                        </div>
                        <div className="bg-white text-gray-800 border border-gray-100 rounded-xl px-3 py-2 shadow-md">
                          <div className="flex items-center space-x-1.5">
                            <div className="flex space-x-0.5">
                              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                            <span className="text-sm text-gray-500">{translations[language].typing}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              </div>

              <div className="p-3 bg-gradient-to-t from-white to-gray-50/50 border-t border-gray-100 rounded-b-3xl">
                <div className="flex space-x-2">
                  <div className="flex-1 relative">
                    <input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={translations[language].placeholder}
                      className="w-full text-sm border-2 border-gray-200 rounded-lg px-3 py-2.5 focus:border-red-400 focus:outline-none focus:ring-4 focus:ring-red-100 transition-all duration-300 bg-white shadow-sm placeholder-gray-400"
                      dir={language === 'hi' ? 'auto' : 'ltr'}
                      aria-label="Type your message"
                    />
                    {inputValue && (
                      <div className="absolute right-2 top-1/2 -translate-y-1/2">
                        <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse"></div>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => handleSendMessage()}
                    disabled={!inputValue.trim()}
                    className="bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:from-gray-300 disabled:to-gray-400 px-3 py-2.5 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-lg hover:shadow-red-500/25 group"
                    aria-label="Send message"
                  >
                    <Send className="h-4 w-4 text-white group-hover:translate-x-0.5 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Chatbot;