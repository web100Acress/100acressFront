# Static Data Configuration

This directory contains all the static data for the Global Filter Template, including titles, descriptions, FAQs, and other content for every page type.

## Files Overview

### 1. `staticData.js`
The main static data file containing all content for different page types:

- **City Pages**: Gurugram, Delhi, Noida, etc.
- **Project Status**: Upcoming, Under Construction, Ready to Move, New Launch
- **Project Types**: Residential, Commercial, Plots, SCO Plots
- **Budget Ranges**: Under 1 Cr, 1-5 Cr, 5-10 Cr, etc.

### 2. `staticDataExample.js`
Example usage and helper functions for implementing static data in components.

### 3. `pageConfigs.js`
Page configurations that can use static data for dynamic content.

## Usage Examples

### Basic Usage

```javascript
import { getStaticData, getFAQData, getTrustBoosters } from './staticData';

// Get data for a specific city
const gurugramData = getStaticData('city', 'gurugram');

// Get FAQs for a project status
const upcomingFAQs = getFAQData('status', 'upcoming');

// Get trust boosters for a project type
const residentialTrustBoosters = getTrustBoosters('type', 'residential');
```

### Using in GlobalFilterTemplate

```javascript
import { getPageDataFromURL } from './config/staticDataExample';

const GlobalFilterTemplate = ({ pageConfig, ...props }) => {
  const location = useLocation();
  
  // Get page data from static data based on URL
  const staticPageData = getPageDataFromURL(location.pathname);
  
  // Use pageConfig or static data or fallback to default
  const currentConfig = pageConfig || staticPageData || defaultConfig;
  
  return (
    // Your component JSX
  );
};
```

## Data Structure

### City Data Structure
```javascript
city: {
  gurugram: {
    title: "Discover Premium Projects in Gurugram",
    description: "Explore the best residential and commercial projects...",
    metaTitle: "Best Projects in Gurugram - 100acress",
    canonical: "https://www.100acress.com/projects-in-gurugram/",
    keywords: "projects in gurugram, residential projects...",
    heroTitle: "Discover Premium Projects in Gurugram",
    heroSubtitle: "Find your perfect home in India's Millennium City...",
    faqs: [
      {
        question: "What are the best residential projects in Gurugram?",
        answer: "Top residential projects include DLF The Crest..."
      }
    ],
    trustBoosters: [
      {
        icon: "🛡️",
        title: "RERA Approved",
        description: "All our projects are RERA registered..."
      }
    ]
  }
}
```

### Project Status Data Structure
```javascript
status: {
  upcoming: {
    title: "Discover Upcoming Projects Across India",
    description: "Be the first to invest in tomorrow's most promising developments...",
    // ... other properties
  },
  underconstruction: {
    title: "Explore Under Construction Properties",
    description: "Track progress and secure your dream home as it's being built...",
    // ... other properties
  }
}
```

## Adding New Content

### 1. Adding a New City
```javascript
// In staticData.js
city: {
  // ... existing cities
  mumbai: {
    title: "Discover Premium Projects in Mumbai",
    description: "Explore the best properties in Mumbai...",
    metaTitle: "Best Projects in Mumbai - 100acress",
    canonical: "https://www.100acress.com/projects-in-mumbai/",
    keywords: "projects in mumbai, mumbai real estate...",
    heroTitle: "Discover Premium Projects in Mumbai",
    heroSubtitle: "Find your perfect home in India's financial capital...",
    faqs: [
      // Mumbai-specific FAQs
    ],
    trustBoosters: [
      // Mumbai-specific trust boosters
    ]
  }
}
```

### 2. Adding a New Project Type
```javascript
// In staticData.js
type: {
  // ... existing types
  farmhouse: {
    title: "Farmhouse Properties - Countryside Living",
    description: "Explore farmhouse properties for peaceful living...",
    // ... other properties
  }
}
```

### 3. Adding a New Budget Range
```javascript
// In staticData.js
budget: {
  // ... existing ranges
  "10to20cr": {
    title: "Properties 10-20 Crore - Ultra Luxury Homes",
    description: "Discover ultra luxury properties with world-class amenities...",
    // ... other properties
  }
}
```

## Helper Functions

### `getStaticData(pageType, specificKey)`
Gets static data for a specific page type and key.

```javascript
const gurugramData = getStaticData('city', 'gurugram');
const upcomingData = getStaticData('status', 'upcoming');
```

### `getFAQData(pageType, specificKey)`
Gets FAQ data including common FAQs.

```javascript
const faqs = getFAQData('city', 'gurugram');
// Returns: [...cityFAQs, ...commonFAQs]
```

### `getTrustBoosters(pageType, specificKey)`
Gets trust booster data for a page.

```javascript
const trustBoosters = getTrustBoosters('status', 'upcoming');
```

### `getPageDataFromURL(pathname)`
Automatically determines page data based on URL path.

```javascript
const pageData = getPageDataFromURL('/projects-in-gurugram/');
// Returns Gurugram city data
```

## URL Mapping

The system automatically maps URLs to static data:

- `/projects-in-gurugram/` → City: Gurugram
- `/projects-in-delhi/` → City: Delhi
- `/project-in-underconstruction/` → Status: Under Construction
- `/projects-in-newlaunch/` → Status: New Launch
- `/property-ready-to-move/` → Status: Ready to Move
- `/property/residential/` → Type: Residential
- `/projects/commercial/` → Type: Commercial
- `/plots-in-gurugram/` → Type: Plots
- `/sco/plots/` → Type: SCO Plots
- `/budget-properties/` → Budget: Under 1 Cr

## SEO Benefits

- **Consistent Content**: All pages have consistent, SEO-optimized content
- **Easy Updates**: Update content in one place for all pages
- **Dynamic Content**: Content changes based on page type and location
- **Rich Metadata**: Complete meta tags, structured data, and canonical URLs
- **FAQ Integration**: Automatic FAQ integration for better SEO

## Best Practices

1. **Keep Content Fresh**: Regularly update content to reflect current market conditions
2. **SEO Optimization**: Use relevant keywords and maintain proper meta descriptions
3. **Consistency**: Maintain consistent tone and style across all pages
4. **Localization**: Consider adding content for different languages/regions
5. **Performance**: Static data is loaded once and cached for better performance

## Troubleshooting

### Common Issues

1. **Missing Data**: Check if the page type and key exist in staticData.js
2. **Wrong URL Mapping**: Verify the URL pattern in getPageDataFromURL function
3. **Import Errors**: Ensure all imports are correct and files exist
4. **Content Not Updating**: Clear cache and restart the development server

### Debug Tips

```javascript
// Check if data exists
console.log('Static data:', getStaticData('city', 'gurugram'));

// Check URL mapping
console.log('Page data from URL:', getPageDataFromURL('/projects-in-gurugram/'));

// Check FAQ data
console.log('FAQ data:', getFAQData('status', 'upcoming'));
```

This static data system provides a centralized way to manage all content for the Global Filter Template, making it easy to maintain and update content across all page types.







