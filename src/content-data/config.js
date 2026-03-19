// Content Management Configuration
// This file manages where and how content sections are displayed

export const contentDisplayConfig = {
  // Branded Residences Configuration
  brandedResidences: {
    // URL paths where branded residences should be displayed
    displayPaths: [
      '/branded-residences',
      '/branded-residences/',
      '/luxury-branded-homes',
      '/premium-branded-residences'
    ],
    
    // Component display settings
    settings: {
      showAfterLoadMore: true,
      marginTop: 'mt-8',
      conditionalRender: true, // Use conditional rendering based on URL
      fullWidth: false,
      showOnMobile: true,
      showOnDesktop: true
    },
    
    // Content sections to display
    sections: {
      hero: true,
      stats: true,
      about: true,
      features: true,
      locations: true,
      partners: true,
      cta: true,
      footer: true
    },
    
    // Custom styling overrides
    customStyles: {
      containerClass: 'branded-residences-wrapper',
      enableAnimations: true,
      theme: 'luxury' // luxury, modern, minimal
    }
  },

  // Upcoming Projects Configuration
  upcomingProjects: {
    // URL paths where upcoming projects should be displayed
    displayPaths: [
      '/projects/upcoming',
      '/projects/upcoming/',
      '/upcoming-projects',
      '/upcoming-projects/'
    ],
    
    // Component display settings
    settings: {
      showAfterLoadMore: true,
      marginTop: 'mt-8',
      conditionalRender: true, // Use conditional rendering based on URL
      fullWidth: false,
      showOnMobile: true,
      showOnDesktop: true
    },
    
    // Content sections to display
    sections: {
      hero: true,
      description: true,
      features: true
    },
    
    // Custom styling overrides
    customStyles: {
      containerClass: 'upcoming-projects-wrapper',
      enableAnimations: true,
      theme: 'modern'
    }
  },

  // New Launch Projects Configuration
  newLaunchProjects: {
    // URL paths where new launch projects should be displayed
    displayPaths: [
      '/projects/newlaunch',
      '/projects/newlaunch/',
      '/new-launch-projects',
      '/new-launch-projects/'
    ],
    
    // Component display settings
    settings: {
      showAfterLoadMore: true,
      marginTop: 'mt-8',
      conditionalRender: true, // Use conditional rendering based on URL
      fullWidth: false,
      showOnMobile: true,
      showOnDesktop: true
    },
    
    // Content sections to display
    sections: {
      hero: true,
      description: true,
      features: true
    },
    
    // Custom styling overrides
    customStyles: {
      containerClass: 'new-launch-projects-wrapper',
      enableAnimations: true,
      theme: 'modern'
    }
  },

  // Under Construction Projects Configuration
  underConstruction: {
    // URL paths where under construction projects should be displayed
    displayPaths: [
      '/projects/underconstruction',
      '/projects/underconstruction/',
      '/under-construction',
      '/under-construction/'
    ],
    
    // Component display settings
    settings: {
      showAfterLoadMore: true,
      marginTop: 'mt-8',
      conditionalRender: true, // Use conditional rendering based on URL
      fullWidth: false,
      showOnMobile: true,
      showOnDesktop: true
    },
    
    // Content sections to display
    sections: {
      hero: true,
      description: true,
      features: true
    },
    
    // Custom styling overrides
    customStyles: {
      containerClass: 'under-construction-wrapper',
      enableAnimations: true,
      theme: 'modern'
    }
  },

  // Ready to Move Projects Configuration
  readyToMove: {
    // URL paths where ready to move projects should be displayed
    displayPaths: [
      '/projects/ready-to-move',
      '/projects/ready-to-move/',
      '/ready-to-move',
      '/ready-to-move/'
    ],
    
    // Component display settings
    settings: {
      showAfterLoadMore: true,
      marginTop: 'mt-8',
      conditionalRender: true, // Use conditional rendering based on URL
      fullWidth: false,
      showOnMobile: true,
      showOnDesktop: true
    },
    
    // Content sections to display
    sections: {
      hero: true,
      description: true,
      features: true
    },
    
    // Custom styling overrides
    customStyles: {
      containerClass: 'ready-to-move-wrapper',
      enableAnimations: true,
      theme: 'modern'
    }
  },

  // 1 BHK Flats Configuration
  oneBhkFlats: {
    // URL paths where 1 BHK flats should be displayed
    displayPaths: [
      '/1-bhk-flats-in-gurgaon',
      '/1-bhk-flats-in-gurgaon/',
      '/1-bhk-flats',
      '/1-bhk-flats/'
    ],
    
    // Component display settings
    settings: {
      showAfterLoadMore: true,
      marginTop: 'mt-8',
      conditionalRender: true, // Use conditional rendering based on URL
      fullWidth: false,
      showOnMobile: true,
      showOnDesktop: true
    },
    
    // Content sections to display
    sections: {
      hero: true,
      description: true,
      features: true,
      locations: true,
      amenities: true,
      investment: true
    },
    
    // Custom styling overrides
    customStyles: {
      containerClass: 'one-bhk-flats-wrapper',
      enableAnimations: true,
      theme: 'affordable'
    }
  },

  // 2 BHK Flats Configuration
  twoBhkFlats: {
    // URL paths where 2 BHK flats should be displayed
    displayPaths: [
      '/2-bhk-flats-in-gurgaon',
      '/2-bhk-flats-in-gurgaon/',
      '/2-bhk-flats',
      '/2-bhk-flats/'
    ],
    
    // Component display settings
    settings: {
      showAfterLoadMore: true,
      marginTop: 'mt-8',
      conditionalRender: true, // Use conditional rendering based on URL
      fullWidth: false,
      showOnMobile: true,
      showOnDesktop: true
    },
    
    // Content sections to display
    sections: {
      hero: true,
      description: true,
      features: true,
      locations: true,
      amenities: true,
      investment: true
    },
    
    // Custom styling overrides
    customStyles: {
      containerClass: 'two-bhk-flats-wrapper',
      enableAnimations: true,
      theme: 'family'
    }
  },

  // 3 BHK Flats Configuration
  threeBhkFlats: {
    // URL paths where 3 BHK flats should be displayed
    displayPaths: [
      '/3-bhk-flats-in-gurgaon',
      '/3-bhk-flats-in-gurgaon/',
      '/3-bhk-flats',
      '/3-bhk-flats/'
    ],
    
    // Component display settings
    settings: {
      showAfterLoadMore: true,
      marginTop: 'mt-8',
      conditionalRender: true, // Use conditional rendering based on URL
      fullWidth: false,
      showOnMobile: true,
      showOnDesktop: true
    },
    
    // Content sections to display
    sections: {
      hero: true,
      description: true,
      features: true,
      locations: true,
      amenities: true,
      investment: true
    },
    
    // Custom styling overrides
    customStyles: {
      containerClass: 'three-bhk-flats-wrapper',
      enableAnimations: true,
      theme: 'luxury'
    }
  },

  // 4 BHK Flats Configuration
  fourBhkFlats: {
    // URL paths where 4 BHK flats should be displayed
    displayPaths: [
      '/4-bhk-flats-in-gurgaon',
      '/4-bhk-flats-in-gurgaon/',
      '/4-bhk-flats',
      '/4-bhk-flats/'
    ],
    
    // Component display settings
    settings: {
      showAfterLoadMore: true,
      marginTop: 'mt-8',
      conditionalRender: true, // Use conditional rendering based on URL
      fullWidth: false,
      showOnMobile: true,
      showOnDesktop: true
    },
    
    // Content sections to display
    sections: {
      hero: true,
      description: true,
      features: true,
      locations: true,
      amenities: true,
      investment: true
    },
    
    // Custom styling overrides
    customStyles: {
      containerClass: 'four-bhk-flats-wrapper',
      enableAnimations: true,
      theme: 'ultra-luxury'
    }
  },

  // 5 BHK Flats Configuration
  fiveBhkFlats: {
    // URL paths where 5 BHK flats should be displayed
    displayPaths: [
      '/5-bhk-flats-in-gurgaon',
      '/5-bhk-flats-in-gurgaon/',
      '/5-bhk-flats',
      '/5-bhk-flats/'
    ],
    
    // Component display settings
    settings: {
      showAfterLoadMore: true,
      marginTop: 'mt-8',
      conditionalRender: true, // Use conditional rendering based on URL
      fullWidth: false,
      showOnMobile: true,
      showOnDesktop: true
    },
    
    // Content sections to display
    sections: {
      hero: true,
      description: true,
      features: true,
      locations: true,
      amenities: true,
      investment: true
    },
    
    // Custom styling overrides
    customStyles: {
      containerClass: 'five-bhk-flats-wrapper',
      enableAnimations: true,
      theme: 'exclusive'
    }
  },
  
  // Future content configurations can be added here
  // example: luxuryApartments: { ... }
};

// Helper function to check if content should be displayed on current path
export const shouldDisplayContent = (contentType, currentPath = window.location.pathname) => {
  const config = contentDisplayConfig[contentType];
  if (!config || !config.settings.conditionalRender) {
    return true; // Show by default if no config or conditional rendering disabled
  }
  
  return config.displayPaths.includes(currentPath);
};

// Helper function to get display settings for a content type
export const getContentSettings = (contentType) => {
  const config = contentDisplayConfig[contentType];
  return config?.settings || {};
};

// Helper function to get enabled sections for a content type
export const getEnabledSections = (contentType) => {
  const config = contentDisplayConfig[contentType];
  return config?.sections || {};
};

// Helper function to check if any configured content should be displayed on current path
export const shouldShowConfiguredContent = (currentPath = window.location.pathname) => {
  for (const [contentType, config] of Object.entries(contentDisplayConfig)) {
    if (config.settings.conditionalRender && config.displayPaths.includes(currentPath)) {
      return true;
    }
  }
  return false;
};

export default contentDisplayConfig;
