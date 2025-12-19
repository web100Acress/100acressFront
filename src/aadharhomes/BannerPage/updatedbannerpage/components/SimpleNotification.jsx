import React, { useState, useEffect } from 'react';

// Global notification state
let globalNotification = null;
let globalSetNotification = null;

export const showNotification = (message, type = 'success') => {
  if (globalSetNotification) {
    globalSetNotification({ message, type, isVisible: true });
  }
};

const SimpleNotification = () => {
  const [notification, setNotification] = useState(null);

  // Register global setter
  useEffect(() => {
    globalSetNotification = setNotification;
    return () => {
      globalSetNotification = null;
    };
  }, []);

  useEffect(() => {
    if (notification && notification.isVisible) {
      // Auto dismiss after 3 seconds
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [notification]);

  if (!notification || !notification.isVisible) return null;

  const bgColor = notification.type === 'success' ? 'bg-white' : 'bg-white';
  const textColor = 'text-black';
  const icon = notification.type === 'success' ? (
    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  ) : (
    <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
    </svg>
  );

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[99999] animate-in fade-in-0 slide-in-from-top-2 duration-300">
      <div className={`${bgColor} ${textColor} px-4 py-2 rounded-lg shadow-lg flex items-center space-x-3 min-w-[300px] max-w-md`}>
        <div className="flex-shrink-0">
          {icon}
        </div>
        <div className="flex-1 font-medium text-sm">
          {notification.message}
        </div>
        <button
          onClick={() => setNotification(null)}
          className="flex-shrink-0 ml-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SimpleNotification;
