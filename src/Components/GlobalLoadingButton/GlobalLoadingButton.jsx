import React, { useMemo } from 'react';

const GlobalLoadingButton = ({
  isLoading = false,
  hasMore = true,
  onLoadMore,
  loadedCount = 0,
  totalCount = null,
  loadingText = 'Loading...',
  loadMoreText = 'Load More',
  className = '',
  showProgress = true,
  variant = 'primary', // 'primary', 'secondary', 'outline'
  size = 'medium', // 'small', 'medium', 'large'
  disabled = false
}) => {
  if (!hasMore || loadedCount === 0) return null;

  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500 disabled:bg-gray-400 disabled:cursor-not-allowed',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white focus:ring-blue-500 disabled:border-gray-300 disabled:text-gray-300 disabled:cursor-not-allowed'
  };

  const sizeClasses = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg'
  };

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  const getProgressText = () => {
    if (totalCount) {
      return `${loadedCount}/${totalCount}`;
    }
    return `${loadedCount} loaded`;
  };

  return (
    <div className="text-center w-full my-6">
      <button
        onClick={onLoadMore}
        disabled={isLoading || disabled}
        className={buttonClasses}
      >
        {isLoading ? (
          <>
            <svg 
              className="animate-spin -ml-1 mr-3 h-5 w-5" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <circle 
                className="opacity-25" 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                strokeWidth="4"
              />
              <path 
                className="opacity-75" 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            {loadingText}
          </>
        ) : (
          <>
            {loadMoreText}
            {showProgress && (
              <span className="ml-2 text-sm opacity-75">
                ({getProgressText()})
              </span>
            )}
          </>
        )}
      </button>
    </div>
  );
};

export default GlobalLoadingButton;
