import React, { useMemo } from 'react';
import './CustomNotification.css';

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
        });, 300);
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      setShouldShow(false);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const bgColorClass = type === 'success' ? 'success' : 'error';
  const icon = type === 'success' ? (
    <div className="custom-notification-icon">
      <svg fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    </div>
  ) : (
    <div className="custom-notification-icon">
      <svg fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
      </svg>
    </div>
  );

  return (
    <div
      className={`custom-notification ${shouldShow ? 'show' : 'hide'}`}
    >
      <div
        className={`custom-notification-content ${bgColorClass}`}
      >
        <div className="custom-notification-icon-wrapper">
          {icon}
        </div>
        <div className="custom-notification-message">
          {message}
        </div>
        <button
          onClick={() => {
            setShouldShow(false);
            setTimeout(() => {
              if (onClose) onClose();
            }, 300);
          }}
          className="custom-notification-close"
        >
          <svg fill="currentColor" viewBox="0 0 20 20">
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
