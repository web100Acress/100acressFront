export const DEVICE_BREAKPOINTS = {
  mobile: '320px',
  tablet: '768px',
  ipad: '1024px',
  macbook: '1440px',
  desktop: '1920px'
};

export const DEVICE_CONFIGS = {
  mobile: {
    maxWidth: '767px',
    gridColumns: 1,
    fontSize: '14px',
    padding: '0.5rem',
    gap: '0.25rem'
  },
  tablet: {
    minWidth: '768px',
    maxWidth: '1023px',
    gridColumns: 2,
    fontSize: '14px',
    padding: '0.75rem',
    gap: '0.5rem'
  },
  ipad: {
    minWidth: '1024px',
    maxWidth: '1439px',
    gridColumns: 3,
    fontSize: '15px',
    padding: '1rem',
    gap: '0.75rem'
  },
  macbook: {
    minWidth: '1440px',
    maxWidth: '1919px',
    gridColumns: 4,
    fontSize: '16px',
    padding: '1rem',
    gap: '1rem'
  },
  desktop: {
    minWidth: '1920px',
    gridColumns: 5,
    fontSize: '16px',
    padding: '1.25rem',
    gap: '1rem'
  }
};

export const CITY_OPTIONS_BY_DEVICE = {
  mobile: [
    { name: "Gurugram", path: "/projects-in-gurugram/" },
    { name: "Delhi", path: "/projects-in-delhi/" },
    { name: "Noida", path: "/projects-in-noida/" },
    { name: "Goa", path: "/projects-in-goa/" },
    { name: "Mumbai", path: "/projects-in-mumbai/" },
    { name: "Dubai", path: "/united-arab-emirates/" }
  ],
  tablet: [
    { name: "Gurugram", path: "/projects-in-gurugram/" },
    { name: "Delhi", path: "/projects-in-delhi/" },
    { name: "Noida", path: "/projects-in-noida/" },
    { name: "Goa", path: "/projects-in-goa/" },
    { name: "Ayodhya", path: "/projects-in-ayodhya/" },
    { name: "Mumbai", path: "/projects-in-mumbai/" },
    { name: "Panipat", path: "/projects-in-panipat/" },
    { name: "Pune", path: "/projects-in-pune/" },
    { name: "Dubai", path: "/united-arab-emirates/" }
  ],
  ipad: [
    { name: "Gurugram", path: "/projects-in-gurugram/" },
    { name: "Delhi", path: "/projects-in-delhi/" },
    { name: "Noida", path: "/projects-in-noida/" },
    { name: "Goa", path: "/projects-in-goa/" },
    { name: "Ayodhya", path: "/projects-in-ayodhya/" },
    { name: "Mumbai", path: "/projects-in-mumbai/" },
    { name: "Panipat", path: "/projects-in-panipat/" },
    { name: "Panchkula", path: "/projects-in-panchkula/" },
    { name: "Kasauli", path: "/projects-in-kasauli/" },
    { name: "Sonipat", path: "/projects-in-sonipat/" },
    { name: "Pune", path: "/projects-in-pune/" },
    { name: "Dubai", path: "/united-arab-emirates/" }
  ],
  macbook: [
    { name: "Gurugram", path: "/projects-in-gurugram/" },
    { name: "Delhi", path: "/projects-in-delhi/" },
    { name: "Noida", path: "/projects-in-noida/" },
    { name: "Goa", path: "/projects-in-goa/" },
    { name: "Ayodhya", path: "/projects-in-ayodhya/" },
    { name: "Mumbai", path: "/projects-in-mumbai/" },
    { name: "Panipat", path: "/projects-in-panipat/" },
    { name: "Panchkula", path: "/projects-in-panchkula/" },
    { name: "Kasauli", path: "/projects-in-kasauli/" },
    { name: "Sonipat", path: "/projects-in-sonipat/" },
    { name: "Alwar", path: "/projects-in-alwar/" },
    { name: "Karnal", path: "/projects-in-karnal/" },
    { name: "Pune", path: "/projects-in-pune/" },
    { name: "Jalandhar", path: "/projects-in-jalandhar/" },
    { name: "Dubai", path: "/united-arab-emirates/" }
  ],
  desktop: [
    { name: "Gurugram", path: "/projects-in-gurugram/" },
    { name: "Delhi", path: "/projects-in-delhi/" },
    { name: "Noida", path: "/projects-in-noida/" },
    { name: "Goa", path: "/projects-in-goa/" },
    { name: "Ayodhya", path: "/projects-in-ayodhya/" },
    { name: "Mumbai", path: "/projects-in-mumbai/" },
    { name: "Panipat", path: "/projects-in-panipat/" },
    { name: "Panchkula", path: "/projects-in-panchkula/" },
    { name: "Kasauli", path: "/projects-in-kasauli/" },
    { name: "Sonipat", path: "/projects-in-sonipat/" },
    { name: "Alwar", path: "/projects-in-alwar/" },
    { name: "Karnal", path: "/projects-in-karnal/" },
    { name: "Pune", path: "/projects-in-pune/" },
    { name: "Jalandhar", path: "/projects-in-jalandhar/" },
    { name: "Pushkar", path: "/projects-in-pushkar/" }
  ]
};

export const NAVIGATION_STYLES_BY_DEVICE = {
  mobile: {
    navbar: {
      height: '60px',
      padding: '0 1rem',
      fontSize: '14px'
    },
    dropdown: {
      minWidth: '280px',
      maxHeight: '300px',
      overflowY: 'auto'
    },
    button: {
      padding: '0.5rem 0.75rem',
      fontSize: '14px',
      borderRadius: '0.375rem'
    }
  },
  tablet: {
    navbar: {
      height: '70px',
      padding: '0 1.5rem',
      fontSize: '14px'
    },
    dropdown: {
      minWidth: '350px',
      maxHeight: '400px',
      overflowY: 'auto'
    },
    button: {
      padding: '0.625rem 1rem',
      fontSize: '14px',
      borderRadius: '0.375rem'
    }
  },
  ipad: {
    navbar: {
      height: '80px',
      padding: '0 2rem',
      fontSize: '15px'
    },
    dropdown: {
      minWidth: '450px',
      maxHeight: '500px',
      overflowY: 'auto'
    },
    button: {
      padding: '0.75rem 1.25rem',
      fontSize: '15px',
      borderRadius: '0.5rem'
    }
  },
  macbook: {
    navbar: {
      height: '90px',
      padding: '0 2.5rem',
      fontSize: '16px'
    },
    dropdown: {
      minWidth: '550px',
      maxHeight: '600px',
      overflowY: 'auto'
    },
    button: {
      padding: '0.875rem 1.5rem',
      fontSize: '16px',
      borderRadius: '0.5rem'
    }
  },
  desktop: {
    navbar: {
      height: '100px',
      padding: '0 3rem',
      fontSize: '16px'
    },
    dropdown: {
      minWidth: '650px',
      maxHeight: '700px',
      overflowY: 'auto'
    },
    button: {
      padding: '1rem 1.75rem',
      fontSize: '16px',
      borderRadius: '0.625rem'
    }
  }
};

export const getDeviceType = () => {
  const width = window.innerWidth;
  
  if (width < 768) return 'mobile';
  if (width >= 768 && width < 1024) return 'tablet';
  if (width >= 1024 && width < 1440) return 'ipad';
  if (width >= 1440 && width < 1920) return 'macbook';
  if (width >= 1920) return 'desktop';
  
  return 'mobile';
};

export const getCityOptionsForDevice = () => {
  const device = getDeviceType();
  return CITY_OPTIONS_BY_DEVICE[device] || CITY_OPTIONS_BY_DEVICE.mobile;
};

export const getNavigationStylesForDevice = () => {
  const device = getDeviceType();
  return NAVIGATION_STYLES_BY_DEVICE[device] || NAVIGATION_STYLES_BY_DEVICE.mobile;
};

export const getDeviceConfig = () => {
  const device = getDeviceType();
  return DEVICE_CONFIGS[device] || DEVICE_CONFIGS.mobile;
};

export const RESPONSIVE_GRID_COLUMNS = {
  mobile: 1,
  tablet: 2,
  ipad: 3,
  macbook: 4,
  desktop: 5
};

export const getGridColumnsForDevice = () => {
  const device = getDeviceType();
  return RESPONSIVE_GRID_COLUMNS[device] || 1;
};
