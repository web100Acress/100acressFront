import toast from 'react-hot-toast';

// Toast utility functions with consistent 2-second duration
export const showToast = {
  success: (message, options = {}) => {
    return toast.success(message, {
      duration: 2000,
      position: 'top-center',
      ...options
    });
  },
  
  error: (message, options = {}) => {
    return toast.error(message, {
      duration: 2000,
      position: 'top-center',
      ...options
    });
  },
  
  warning: (message, options = {}) => {
    return toast(message, {
      duration: 2000,
      position: 'top-center',
      ...options
    });
  },
  
  info: (message, options = {}) => {
    return toast(message, {
      duration: 2000,
      position: 'top-center',
      ...options
    });
  },
  
  loading: (message, options = {}) => {
    return toast.loading(message, {
      position: 'top-center',
      ...options
    });
  },
  
  dismiss: (id) => {
    return toast.dismiss(id);
  },
  
  // Custom success messages for common actions
  successMessages: {
    dataLoaded: 'Data loaded successfully!',
    dataSaved: 'Data saved successfully!',
    dataDeleted: 'Data deleted successfully!',
    dataUpdated: 'Data updated successfully!',
    formSubmitted: 'Form submitted successfully!',
    loginSuccess: 'Login successful!',
    logoutSuccess: 'Logged out successfully!',
    uploadSuccess: 'File uploaded successfully!',
    deleteSuccess: 'Deleted successfully!',
    createSuccess: 'Created successfully!',
    updateSuccess: 'Updated successfully!',
    copySuccess: 'Copied to clipboard!',
    actionSuccess: 'Action completed successfully!'
  },
  
  // Custom error messages for common actions
  errorMessages: {
    genericError: 'Something went wrong. Please try again.',
    networkError: 'Network error. Please check your connection.',
    validationError: 'Please fill in all required fields.',
    authError: 'Authentication error. Please login again.',
    permissionError: 'You don\'t have permission to perform this action.',
    notFound: 'Data not found.',
    serverError: 'Server error. Please try again later.',
    uploadError: 'Failed to upload file.',
    deleteError: 'Failed to delete. Please try again.',
    saveError: 'Failed to save. Please try again.',
    loadingError: 'Failed to load data.'
  },
  
  // Custom warning messages
  warningMessages: {
    unsavedChanges: 'You have unsaved changes.',
    confirmDelete: 'Are you sure you want to delete this item?',
    confirmAction: 'Are you sure you want to perform this action?',
    dataUnavailable: 'Data is currently unavailable.',
    backendUnavailable: 'Unable to connect to server. Please try again later.'
  },
  
  // Custom info messages
  infoMessages: {
    loading: 'Loading...',
    saving: 'Saving...',
    deleting: 'Deleting...',
    processing: 'Processing...',
    copying: 'Copying to clipboard...',
    uploading: 'Uploading...',
    downloading: 'Downloading...'
  }
};

// Quick access methods for common actions
export const showSuccess = (type = 'generic') => {
  const message = showToast.successMessages[type] || showToast.successMessages.actionSuccess;
  return showToast.success(message);
};

export const showError = (type = 'generic') => {
  const message = showToast.errorMessages[type] || showToast.errorMessages.genericError;
  return showToast.error(message);
};

export const showWarning = (type = 'generic') => {
  const message = showToast.warningMessages[type] || showToast.warningMessages.dataUnavailable;
  return showToast.warning(message);
};

export const showInfo = (type = 'loading') => {
  const message = showToast.infoMessages[type] || showToast.infoMessages.loading;
  return showToast.info(message);
};

export default showToast;
