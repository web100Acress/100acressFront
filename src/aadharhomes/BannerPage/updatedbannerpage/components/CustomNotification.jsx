import React, { useState, useEffect } from 'react';

const CustomNotification = ({ message, type, isVisible, onClose }) => {
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShouldShow(true);
      // Auto dismiss after 3 seconds
      const timer = setTimeout(() => {
        setShouldShow(false);
        // Give animation time to complete before calling onClose
        setTimeout(() => {
          if (onClose) onClose();
        }, 300);
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      setShouldShow(false);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
  const icon = type === 'success' ? (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  ) : (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
    </svg>
  );

  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-[99999] transition-all duration-300 ease-in-out ${
        shouldShow ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
      }`}
    >
      <div
        className={`${bgColor} text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-3 min-w-[300px] max-w-md`}
      >
        <div className="flex-shrink-0">
          {icon}
        </div>
        <div className="flex-1 font-medium">
          {message}
        </div>
        <button
          onClick={() => {
            setShouldShow(false);
            setTimeout(() => {
              if (onClose) onClose();
            }, 300);
          }}
          className="flex-shrink-0 ml-4 text-white/80 hover:text-white transition-colors"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

// Notification manager to handle multiple notifications
export const useNotification = () => {
  const [notifications, setNotifications] = useState([]);

  const showNotification = (message, type = 'success') => {
    const id = Date.now();
    const newNotification = { id, message, type, isVisible: true };
    
    setNotifications(prev => [...prev, newNotification]);

    // Auto remove after 3.3 seconds (3 seconds display + 0.3s animation)
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3300);
  };

  const hideNotification = (id) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, isVisible: false } : n)
    );
  };

  return { notifications, showNotification, hideNotification };
};

export default CustomNotification;
