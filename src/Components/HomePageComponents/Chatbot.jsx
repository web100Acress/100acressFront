
import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, User, Bot, Maximize2, Minimize2, Globe, Home, MapPin, CreditCard, Calendar, Sparkles } from 'lucide-react';

const predefinedFAQs = {
  en: [
    {
      question: "What types of properties do you offer?",
      answer: "We offer a wide range of properties including residential apartments, commercial spaces, plots, villas, and SCO (Shop-Cum-Office) units. You can browse through our Buy, Rent, New Launch, Commercial, and Plots sections.",
      keywords: ["property", "types", "residential", "commercial", "apartment", "villa", "plot", "sco"]
    },
    {
      question: "How can I search for properties in specific locations?",
      answer: "You can use our search bar to look for properties by location. We cover top locations including Sohna Road, Golf Course Road, MG Road, Northern Peripheral Road, Dwarka Expressway, and New Gurgaon.",
      keywords: ["search", "location", "area", "sohna", "golf course", "mg road", "dwarka", "gurgaon"]
    },
    {
      question: "Do you offer payment plans for properties?",
      answer: "Yes, we offer flexible payment plans for various properties. Many of our projects come with attractive payment schemes and special offers. Contact our team to know more about specific payment options.",
      keywords: ["payment", "plan", "emi", "finance", "installment", "loan"]
    },
    {
      question: "How can I schedule a site visit?",
      answer: "You can schedule a site visit by clicking on any property listing and using the 'Schedule Visit' option, or you can call our team directly. We arrange guided tours of properties at your convenience.",
      keywords: ["visit", "schedule", "tour", "site", "viewing", "appointment"]
    },
    {
      question: "What documents are required for property purchase?",
      answer: "For property purchase, you'll typically need: Identity proof (Aadhar/PAN), Address proof, Income proof, Bank statements, and photographs. Our team will guide you through the complete documentation process.",
      keywords: ["documents", "papers", "aadhar", "pan", "income", "bank", "purchase"]
    },
    {
      question: "Do you assist with home loans?",
      answer: "Yes, we have tie-ups with leading banks and financial institutions to help you get the best home loan deals. Our team can assist you with loan applications and processing.",
      keywords: ["loan", "home loan", "bank", "finance", "mortgage", "interest"]
    },
    {
      question: "What are the upcoming projects?",
      answer: "We have several exciting new launches coming up. Check our 'New Launch' section for the latest projects with early bird offers and attractive pricing. These include modern apartments and commercial spaces.",
      keywords: ["new", "launch", "upcoming", "project", "latest", "modern"]
    },
    {
      question: "How can I list my property for sale or rent?",
      answer: "You can list your property by clicking on 'List Property' button. It's free to list! Our team will help you with photography, pricing guidance, and marketing your property to potential buyers or tenants.",
      keywords: ["list", "sell", "rent", "property", "free", "marketing"]
    }
  ],
  hi: [
    {
      question: "आप किस प्रकार की प्रॉपर्टीज़ ऑफर करते हैं?",
      answer: "हम विभिन्न प्रकार की प्रॉपर्टीज़ प्रदान करते हैं जिनमें रेजिडेंशियल अपार्टमेंट्स, कमर्शियल स्पेसेस, प्लॉट्स, विला, और SCO (शॉप-कम-ऑफिस) यूनिट्स शामिल हैं। आप हमारे Buy, Rent, New Launch, Commercial, और Plots सेक्शन में ब्राउज़ कर सकते हैं।",
      keywords: ["प्रॉपर्टी", "प्रकार", "रेजिडेंशियल", "कमर्शियल", "अपार्टमेंट", "विला", "प्लॉट", "sco", "property", "types"]
    },
    {
      question: "मैं विशिष्ट लोकेशन में प्रॉपर्टी कैसे खोज सकता हूं?",
      answer: "आप हमारे सर्च बार का उपयोग करके लोकेशन के आधार पर प्रॉपर्टी खोज सकते हैं। हम टॉप लोकेशन्स जैसे सोहना रोड, गोल्फ कोर्स रोड, MG रोड, नॉर्दर्न पेरिफेरल रोड, द्वारका एक्सप्रेसवे, और न्यू गुड़गांव को कवर करते हैं।",
      keywords: ["खोज", "सर्च", "लोकेशन", "एरिया", "सोहना", "गोल्फ कोर्स", "mg रोड", "द्वारका", "गुड़गांव", "search", "location"]
    },
    {
      question: "क्या आप प्रॉपर्टी के लिए पेमेंट प्लान ऑफर करते हैं?",
      answer: "हां, हम विभिन्न प्रॉपर्टीज़ के लिए फ्लेक्सिबल पेमेंट प्लान ऑफर करते हैं। हमारी कई प्रोजेक्ट्स आकर्षक पेमेंट स्कीम और स्पेशल ऑफर्स के साथ आती हैं। विशिष्ट पेमेंट विकल्पों के बारे में अधिक जानने के लिए हमारी टीम से संपर्क करें।",
      keywords: ["पेमेंट", "प्लान", "emi", "फाइनेंस", "किस्त", "लोन", "payment", "plan"]
    },
    {
      question: "मैं साइट विज़िट कैसे शेड्यूल कर सकता हूं?",
      answer: "आप किसी भी प्रॉपर्टी लिस्टिंग पर क्लिक करके 'Schedule Visit' ऑप्शन का उपयोग करके साइट विज़िट शेड्यूल कर सकते हैं, या आप सीधे हमारी टीम को कॉल कर सकते हैं। हम आपकी सुविधा के अनुसार प्रॉपर्टी के गाइडेड टूर की व्यवस्था करते हैं।",
      keywords: ["विज़िट", "शेड्यूल", "टूर", "साइट", "देखना", "अपॉइंटमेंट", "visit", "schedule"]
    },
    {
      question: "प्रॉपर्टी खरीदने के लिए कौन से दस्तावेज़ चाहिए?",
      answer: "प्रॉपर्टी खरीदने के लिए, आपको आमतौर पर चाहिए: पहचान प्रमाण (आधार/पैन), पता प्रमाण, आय प्रमाण, बैंक स्टेटमेंट्स, और फोटोग्राफ्स। हमारी टीम पूरी डॉक्यूमेंटेशन प्रक्रिया में आपकी मदद करेगी।",
      keywords: ["दस्तावेज़", "कागजात", "आधार", "पैन", "आय", "बैंक", "खरीदना", "documents", "papers"]
    },
    {
      question: "क्या आप होम लोन में सहायता करते हैं?",
      answer: "हां, हमारे पास प्रमुख बैंकों और वित्तीय संस्थानों के साथ टाई-अप है जो आपको सबसे अच्छे होम लोन डील्स दिलाने में मदद करते हैं। हमारी टीम लोन एप्लिकेशन और प्रोसेसिंग में आपकी सहायता कर सकती है।",
      keywords: ["लोन", "होम लोन", "बैंक", "फाइनेंस", "गिरवी", "ब्याज", "loan", "home loan"]
    },
    {
      question: "आने वाली प्रोजेक्ट्स क्या हैं?",
      answer: "हमारी कई रोमांचक नई लॉन्च आने वाली हैं। अर्ली बर्ड ऑफर्स और आकर्षक प्राइसिंग के साथ नवीनतम प्रोजेक्ट्स के लिए हमारे 'New Launch' सेक्शन को चेक करें। इनमें आधुनिक अपार्टमेंट्स और कमर्शियल स्पेसेस शामिल हैं।",
      keywords: ["नई", "लॉन्च", "आने वाली", "प्रोजेक्ट", "नवीनतम", "आधुनिक", "new", "launch", "upcoming"]
    },
    {
      question: "मैं अपनी प्रॉपर्टी को बिक्री या किराए के लिए कैसे लिस्ट कर सकता हूं?",
      answer: "आप 'List Property' बटन पर क्लिक करके अपनी प्रॉपर्टी लिस्ट कर सकते हैं। लिस्ट करना बिल्कुल फ्री है! हमारी टीम फोटोग्राफी, प्राइसिंग गाइडेंस, और संभावित खरीदारों या किरायेदारों के लिए आपकी प्रॉपर्टी की मार्केटिंग में मदद करेगी।",
      keywords: ["लिस्ट", "बेचना", "किराया", "प्रॉपर्टी", "फ्री", "मार्केटिंग", "list", "sell", "rent"]
    }
  ]
};

const translations = {
  en: {
    title: "Property Assistant",
    status: "Online now",
    placeholder: "Ask about properties...",
    greeting: "🏡 Hello! I'm your Property Assistant. I'm here to help you find your dream home or answer any real estate questions. How can I assist you today?",
    defaultResponse: "I'd be happy to help you with that! For specific inquiries, please feel free to contact our team directly or browse through our property listings. Is there anything else about our properties or services I can help you with?",
    suggestedText: "💡 Quick questions:",
    suggestedQuestions: [
      "What types of properties do you offer?",
      "How can I schedule a site visit?",
      "Do you offer payment plans?",
      "What are your upcoming projects?"
    ],
    typing: "Assistant is typing..."
  },
  hi: {
    title: "प्रॉपर्टी असिस्टेंट",
    status: "अभी ऑनलाइन",
    placeholder: "प्रॉपर्टी के बारे में पूछें...",
    greeting: "🏡 नमस्ते! मैं आपका प्रॉपर्टी असिस्टेंट हूं। मैं आपको आपका सपनों का घर खोजने या रियल एस्टेट से जुड़े सवालों के जवाब देने में मदद करने के लिए यहां हूं। आज मैं आपकी कैसे मदद कर सकता हूं?",
    defaultResponse: "मुझे आपकी मदद करने में खुशी होगी! विशिष्ट पूछताछ के लिए, कृपया हमारी टीम से सीधे संपर्क करें या हमारी प्रॉपर्टी लिस्टिंग्स को ब्राउज़ करें। क्या हमारी प्रॉपर्टीज़ या सेवाओं के बारे में कोई और चीज़ है जिसमें मैं आपकी मदद कर सकता हूं?",
    suggestedText: "💡 त्वरित प्रश्न:",
    suggestedQuestions: [
      "आप किस प्रकार की प्रॉपर्टीज़ ऑफर करते हैं?",
      "मैं साइट विज़िट कैसे शेड्यूल कर सकता हूं?",
      "क्या आप पेमेंट प्लान ऑफर करते हैं?",
      "आने वाली प्रोजेक्ट्स क्या हैं?"
    ],
    typing: "असिस्टेंट टाइप कर रहा है..."
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
  const [isMobile, setIsMobile] = useState(false);
  const messagesEndRef = useRef(null);

  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Initialize messages when opening or changing language
  useEffect(() => {
    if (isOpen) {
      setMessages([{
        id: '1',
        text: translations[language].greeting,
        isUser: false,
        timestamp: new Date()
      }]);
    }
  }, [isOpen, language]);

  // Add pulse animation periodically
  useEffect(() => {
    if (!isOpen) {
      const interval = setInterval(() => {
        setPulseAnimation(true);
        setTimeout(() => setPulseAnimation(false), 2000);
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  const findBestMatch = (userInput) => {
    const input = userInput.toLowerCase();
    let bestMatch = null;
    let maxScore = 0;

    predefinedFAQs[language].forEach(faq => {
      let score = 0;
      faq.keywords.forEach(keyword => {
        if (input.includes(keyword.toLowerCase())) {
          score += 1;
        }
      });
      
      const inputWords = input.split(' ').filter(word => word.length > 2);
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

    return maxScore > 0 ? bestMatch : null;
  };

  const handleSendMessage = (messageText) => {
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

    const bestMatch = findBestMatch(textToSend);
    
    setTimeout(() => {
      setIsTyping(false);
      const botResponse = {
        id: (Date.now() + 1).toString(),
        text: bestMatch 
          ? bestMatch.answer 
          : translations[language].defaultResponse,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1500 + Math.random() * 1000);

    setInputValue('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleQuestionClick = (question) => {
    handleSendMessage(question);
  };

  const getRandomSuggestions = () => {
    const shuffled = [...predefinedFAQs[language]].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3).map(faq => faq.question);
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en');
  };

  const getQuestionIcon = (question) => {
    if (question.toLowerCase().includes('property') || question.toLowerCase().includes('प्रॉपर्टी')) return <Home className="h-3 w-3" />;
    if (question.toLowerCase().includes('location') || question.toLowerCase().includes('लोकेशन')) return <MapPin className="h-3 w-3" />;
    if (question.toLowerCase().includes('payment') || question.toLowerCase().includes('पेमेंट')) return <CreditCard className="h-3 w-3" />;
    if (question.toLowerCase().includes('visit') || question.toLowerCase().includes('विज़िट')) return <Calendar className="h-3 w-3" />;
    return <Sparkles className="h-3 w-3" />;
  };

  // Calculate dimensions based on screen size
  const getChatDimensions = () => {
    if (isMobile) {
      return isOpen 
        ? (isExpanded 
          ? 'fixed inset-0 z-50' 
          : 'fixed inset-x-4 bottom-4 top-20 z-50 max-h-[calc(100vh-6rem)]'
        )
        : '';
    }
    return isExpanded ? 'w-96 h-[600px]' : 'w-80 h-96';
  };

  const getButtonPosition = () => {
    return isMobile ? 'fixed bottom-4 right-4 z-50' : 'fixed bottom-6 right-6 z-50';
  };

  return (
    <div className={getButtonPosition()}>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className={`relative ${isMobile ? 'h-14 w-14' : 'h-16 w-16'} rounded-full bg-gradient-to-br from-red-500 via-red-600 to-red-700 hover:from-red-600 hover:via-red-700 hover:to-red-800 shadow-2xl hover:shadow-red-500/25 transition-all duration-500 transform hover:scale-110 flex items-center justify-center group overflow-hidden ${
            pulseAnimation ? 'animate-pulse' : ''
          }`}
        >
          {/* Animated background circles */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-400 to-red-600 animate-ping opacity-20"></div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
          
          <MessageCircle className={`${isMobile ? 'h-6 w-6' : 'h-7 w-7'} text-white z-10 transform group-hover:rotate-12 transition-transform duration-300`} />
          
          {/* Notification dot */}
          <div className="absolute -top-1 -right-1 h-4 w-4 bg-green-400 rounded-full flex items-center justify-center">
            <div className="h-2 w-2 bg-white rounded-full animate-pulse"></div>
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className={`bg-white ${isMobile && isExpanded ? 'rounded-none' : 'rounded-3xl'} shadow-2xl backdrop-blur-lg border border-gray-100 flex flex-col transition-all duration-500 transform ${getChatDimensions()} animate-in slide-in-from-bottom-4 fade-in`}>
          {/* Header */}
          <div className={`bg-gradient-to-r from-red-500 via-red-600 to-red-700 ${isMobile && isExpanded ? 'rounded-none' : 'rounded-t-3xl'} p-3 flex items-center justify-between relative overflow-hidden ${isMobile ? 'min-h-[60px]' : ''}`}>
            {/* Background pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-12 translate-x-12"></div>
            
            <div className="flex items-center space-x-2 z-10">
              <div className="relative">
                <div className={`${isMobile ? 'w-9 h-9' : 'w-8 h-8'} bg-white rounded-full flex items-center justify-center shadow-lg`}>
                  <Bot className={`${isMobile ? 'h-5 w-5' : 'h-4 w-4'} text-red-500`} />
                </div>
              </div>
              <div>
                <h3 className={`text-white font-semibold ${isMobile ? 'text-base' : 'text-sm'}`}>{translations[language].title}</h3>
                <p className={`text-white/90 ${isMobile ? 'text-sm' : 'text-xs'} flex items-center`}>
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5 animate-pulse"></div>
                  {translations[language].status}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-1 z-10">
              <button
                onClick={toggleLanguage}
                className={`text-white hover:bg-white/20 ${isMobile ? 'h-9 w-9' : 'h-7 w-7'} p-0 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110`}
                title={language === 'en' ? 'Switch to Hindi' : 'Switch to English'}
              >
                <Globe className={`${isMobile ? 'h-4 w-4' : 'h-3.5 w-3.5'}`} />
              </button>
              {!isMobile && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-white hover:bg-white/20 h-7 w-7 p-0 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  {isExpanded ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
                </button>
              )}
              {isMobile && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-white hover:bg-white/20 h-9 w-9 p-0 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  title={isExpanded ? 'Minimize' : 'Fullscreen'}
                >
                  {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className={`text-white hover:bg-white/20 ${isMobile ? 'h-9 w-9' : 'h-7 w-7'} p-0 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-90`}
              >
                <X className={`${isMobile ? 'h-4 w-4' : 'h-3.5 w-3.5'}`} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className={`flex-1 ${isMobile ? 'p-3' : 'p-4'} overflow-y-auto bg-gradient-to-b from-gray-50/50 to-white`}>
            <div className={`space-y-${isMobile ? '4' : '6'}`}>
              {messages.map((message, index) => (
                <div key={message.id} className="animate-in fade-in slide-in-from-bottom-2">
                  <div className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex items-end ${isMobile ? 'space-x-2' : 'space-x-3'} max-w-[90%] ${isMobile ? 'sm:max-w-[85%]' : 'max-w-[85%]'} ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`${isMobile ? 'w-7 h-7' : 'w-8 h-8'} rounded-full flex items-center justify-center shadow-lg flex-shrink-0 ${
                        message.isUser 
                          ? 'bg-gradient-to-br from-red-500 to-red-600' 
                          : 'bg-gradient-to-br from-gray-100 to-gray-200'
                      }`}>
                        {message.isUser 
                          ? <User className={`${isMobile ? 'h-3.5 w-3.5' : 'h-4 w-4'} text-white`} />
                          : <Bot className={`${isMobile ? 'h-3.5 w-3.5' : 'h-4 w-4'} text-gray-600`} />
                        }
                      </div>
                      <div className={`rounded-2xl ${isMobile ? 'px-3 py-2.5' : 'px-4 py-3'} shadow-lg ${
                        message.isUser
                          ? 'bg-gradient-to-br from-red-500 to-red-600 text-white'
                          : 'bg-white text-gray-800 border border-gray-100'
                      }`}>
                        <p className={`${isMobile ? 'text-xs' : 'text-xs'} leading-relaxed`}>{message.text}</p>

                        <div className={`${isMobile ? 'text-xs' : 'text-xs'} mt-1.5 opacity-70 ${message.isUser ? 'text-white/80' : 'text-gray-500'}`}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Show suggested questions after bot responses */}
                  {!message.isUser && (
                    <div className="mt-4 ml-11 space-y-2">
                      <p className="text-sm text-gray-600 mb-3 font-medium">{translations[language].suggestedText}</p>
                      <div className="grid gap-2">
                        {(index === 0 ? translations[language].suggestedQuestions : getRandomSuggestions()).map((question, qIndex) => (
                          <button
                            key={qIndex}
                            onClick={() => handleQuestionClick(question)}
                            className="flex items-center space-x-3 w-full text-left text-sm p-3 bg-gradient-to-r from-red-50 to-pink-50 hover:from-red-100 hover:to-pink-100 rounded-xl transition-all duration-300 text-gray-700 border border-red-100 hover:border-red-200 hover:shadow-md transform hover:scale-[1.02] group"
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
              
              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2">
                  <div className="flex items-end space-x-3 max-w-[85%]">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 shadow-lg">
                      <Bot className="h-4 w-4 text-gray-600" />
                    </div>
                    <div className="bg-white text-gray-800 border border-gray-100 rounded-2xl px-4 py-3 shadow-lg">
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
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

          {/* Input */}
          <div className="p-4 bg-gradient-to-t from-white to-gray-50/50 border-t border-gray-100 rounded-b-3xl">
            <div className="flex space-x-3">
              <div className="flex-1 relative">
                <input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={translations[language].placeholder}
                  className="w-full text-sm border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-red-400 focus:outline-none focus:ring-4 focus:ring-red-100 transition-all duration-300 bg-white shadow-sm"
                  dir={language === 'hi' ? 'auto' : 'ltr'}
                />
                {inputValue && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                  </div>
                )}
              </div>
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim()}
                className="bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:from-gray-300 disabled:to-gray-400 px-4 py-3 rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-lg hover:shadow-red-500/25 group"
              >
                <Send className="h-4 w-4 text-white group-hover:translate-x-0.5 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;