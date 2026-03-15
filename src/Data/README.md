# Static Data Management System

Centralized static data management for the 100acress website. This system provides a structured way to manage SEO content, page titles, FAQs, filters, and other static data for different page types.

## 📁 Folder Structure

```
src/data/
├── core/
│   └── types.js          # Core types, templates, and utilities
├── pages/
│   ├── projects/         # Project listing pages
│   │   ├── upcoming.js
│   │   ├── featured.js
│   │   ├── trending.js
│   │   ├── luxury.js
│   │   ├── affordable-homes.js
│   │   ├── commercial.js
│   │   ├── sco-plots.js
│   │   └── budget-homes.js
│   ├── bhk/             # BHK listing pages
│   │   ├── bhk1.js
│   │   ├── bhk2.js
│   │   ├── bhk3.js
│   │   ├── bhk4.js
│   │   └── bhk5.js
│   ├── cities/          # City pages
│   │   ├── gurugram.js
│   │   ├── delhi.js
│   │   ├── noida.js
│   │   ├── pune.js
│   │   ├── mumbai.js
│   │   ├── goa.js
│   │   ├── dubai.js
│   │   ├── alwar.js
│   │   ├── sonipat.js
│   │   ├── karnal.js
│   │   ├── jalandhar.js
│   │   ├── pushkar.js
│   │   ├── ayodhya.js
│   │   ├── panipat.js
│   │   ├── panchkula.js
│   │   ├── kasauli.js
│   │   └── ludhiana.js
│   ├── status/          # Status pages
│   │   ├── upcoming.js
│   │   ├── underconstruction.js
│   │   ├── readytomove.js
│   │   ├── newlaunch.js
│   │   └── brandedresidences.js
│   ├── budget/          # Budget pages
│   │   ├── under1cr.js
│   │   ├── 1to5cr.js
│   │   ├── 5to10cr.js
│   │   ├── 10to20cr.js
│   │   ├── 20to50cr.js
│   │   └── above50cr.js
│   └── types/           # Property type pages
│       ├── residential.js
│       ├── commercial.js
│       ├── plots.js
│       ├── sco.js
│       ├── independentfloors.js
│       ├── luxury-villas.js
│       ├── farmhouse.js
│       ├── industrial-plots.js
│       └── plots-gurugram.js
├── shared/
│   └── common.js        # Common FAQs, trust indicators, contact info
├── index.js             # Central registry
├── helpers.js           # Utility functions
└── README.md            # Documentation
```

## 🚀 Quick Start

### Importing Data

```javascript
// Get specific page data
import { getStaticData } from './data/helpers';

const upcomingData = getStaticData('projects/upcoming');
```

### Using in Components

```javascript
import { 
  getSEOData, 
  getHeroData, 
  getFAQs, 
  getFilters 
} from './data/helpers';

function UpcomingProjectsPage() {
  const seo = getSEOData('projects/upcoming');
  const hero = getHeroData('projects/upcoming');
  const faqs = getFAQs('projects/upcoming');
  const filters = getFilters('projects/upcoming');
  
  return (
    <>
      <SEO {...seo} />
      <HeroSection {...hero} />
      <ProjectFilters filters={filters} />
      <FAQSection faqs={faqs} />
    </>
  );
}
```

### Get Data by URL

```javascript
import { getStaticDataByUrl } from './data/helpers';

// Works with current URL
const currentPath = window.location.pathname;
const pageData = getStaticDataByUrl(currentPath);
```

## 📊 Available Pages

### Project Pages

| Key | URL | Description |
|-----|-----|-------------|
| `projects/upcoming` | `/projects/upcoming` | Upcoming/new launch projects |
| `projects/featured` | `/projects/featured` | Featured/highlighted projects |
| `projects/trending` | `/projects/trending` | Trending/popular projects |
| `projects/luxury` | `/projects/luxury` | Ultra-luxury projects |
| `projects/affordable-homes` | `/projects/affordable-homes` | Budget-friendly projects |
| `projects/commercial` | `/projects/commercial` | Commercial properties |
| `projects/sco-plots` | `/projects/sco-plots` | SCO plots |
| `projects/budget-homes` | `/projects/budget-homes` | Under 50L projects |

### BHK Pages

| Key | URL | Description |
|-----|-----|-------------|
| `bhk/1` | `/1-bhk-flats-in-gurgaon` | 1 BHK apartments |
| `bhk/2` | `/2-bhk-flats-in-gurgaon` | 2 BHK apartments |
| `bhk/3` | `/3-bhk-flats-in-gurgaon` | 3 BHK apartments |
| `bhk/4` | `/4-bhk-flats-in-gurgaon` | 4 BHK apartments |
| `bhk/5` | `/5-bhk-flats-in-gurgaon` | 5 BHK apartments |

### City Pages

| Key | URL | Description |
|-----|-----|-------------|
| `city/gurugram` | `/projects-in-gurugram` | Gurugram projects |
| `city/delhi` | `/projects-in-delhi` | Delhi projects |
| `city/noida` | `/projects-in-noida` | Noida projects |
| `city/pune` | `/projects-in-pune` | Pune projects |
| `city/mumbai` | `/projects-in-mumbai` | Mumbai projects |
| `city/goa` | `/projects-in-goa` | Goa projects |
| `city/dubai` | `/united-arab-emirates` | Dubai projects |
| `city/alwar` | `/projects-in-alwar` | Alwar projects |
| `city/sonipat` | `/projects-in-sonipat` | Sonipat projects |
| `city/karnal` | `/projects-in-karnal` | Karnal projects |
| `city/jalandhar` | `/projects-in-jalandhar` | Jalandhar projects |
| `city/pushkar` | `/projects-in-pushkar` | Pushkar projects |
| `city/ayodhya` | `/projects-in-ayodhya` | Ayodhya projects |
| `city/panipat` | `/projects-in-panipat` | Panipat projects |
| `city/panchkula` | `/projects-in-panchkula` | Panchkula projects |
| `city/kasauli` | `/projects-in-kasauli` | Kasauli projects |
| `city/ludhiana` | `/projects-in-ludhiana` | Ludhiana projects |

### Status Pages

| Key | URL | Description |
|-----|-----|-------------|
| `status/upcoming` | `/projects/upcoming` | Upcoming projects |
| `status/underconstruction` | `/projects/underconstruction` | Under construction |
| `status/readytomove` | `/projects/ready-to-move` | Ready to move |
| `status/newlaunch` | `/projects/newlaunch` | New launch |
| `status/brandedresidences` | `/branded-residences` | Branded residences |

### Budget Pages

| Key | URL | Description |
|-----|-----|-------------|
| `budget/under1cr` | `/projects/under-1-cr` | Under ₹1 Crore |
| `budget/1to5cr` | `/projects/1-5-cr` | ₹1 - 5 Crore |
| `budget/5to10cr` | `/projects/5-10-cr` | ₹5 - 10 Crore |
| `budget/10to20cr` | `/projects/10-20-cr` | ₹10 - 20 Crore |
| `budget/20to50cr` | `/projects/20-50-cr` | ₹20 - 50 Crore |
| `budget/above50cr` | `/projects/above-50-cr` | Above ₹50 Crore |

### Property Type Pages

| Key | URL | Description |
|-----|-----|-------------|
| `type/residential` | `/projects/residential` | Residential properties |
| `type/commercial` | `/projects-type/commercial` | Commercial properties |
| `type/plots` | `/projects/plots` | Residential plots |
| `type/sco` | `/sco/plots` | SCO plots |
| `type/independentfloors` | `/projects/independent-floors` | Independent floors |
| `type/luxury-villas` | `/projects/villas` | Luxury villas |
| `type/farmhouse` | `/projects/farmhouse` | Farmhouses |
| `type/industrial-plots` | `/projects/industrial-plots` | Industrial plots |

## 🛠️ Helper Functions

### Core Functions

```javascript
// Get all data for a page
getStaticData('projects/upcoming')

// Get data by URL path
getStaticDataByUrl('/projects/upcoming')

// Get SEO data
getSEOData('projects/upcoming')

// Get hero section data
getHeroData('projects/upcoming')

// Get FAQs
getFAQs('projects/upcoming')

// Get filters configuration
getFilters('projects/upcoming')

// Get sort options
getSortOptions('projects/upcoming')
```

### Utility Functions

```javascript
// Get page titles
getPageTitles('projects/upcoming')
// Returns: { title, h1, subtitle }

// Get intro text
getIntroText('projects/upcoming')

// Get highlights
getHighlights('projects/upcoming')

// Get custom fields
getCustomFields('projects/upcoming')

// Get page badge
getPageBadge('projects/upcoming')
// Returns: { text, color }

// Check page type
isProjectPage('projects/upcoming')  // true
isBHKPage('bhk/2')                   // true

// Search pages
searchPages('luxury')
// Returns: ['projects/luxury', 'bhk/4', 'bhk/5']

// Get related pages
getRelatedPages('projects/upcoming', 3)
// Returns related project pages
```

## 📝 Data Structure

Each page data object contains:

```javascript
{
  pageType: 'projects/upcoming',
  urlPattern: '/projects/upcoming',
  
  // SEO Data
  seo: {
    metaTitle: '...',
    metaDescription: '...',
    canonical: '...',
    keywords: '...',
    ogTitle: '...',
    ogDescription: '...',
    ogImage: '...'
  },
  
  // Hero Section
  hero: {
    title: '...',
    subtitle: '...',
    description: '...',
    backgroundImage: '...',
    ctaText: '...',
    ctaLink: '...'
  },
  
  // Content
  title: '...',
  h1: '...',
  subtitle: '...',
  description: '...',
  introText: '...',
  
  // FAQs
  faqs: [
    { question: '...', answer: '...' }
  ],
  
  // Filters & Sort
  filters: { ... },
  sortOptions: [ ... ],
  
  // Custom Fields
  customFields: {
    badge: '...',
    badgeColor: '...',
    // ... page-specific fields
  }
}
```

## ➕ Adding New Pages

1. Create a new file in the appropriate `pages/` subfolder
2. Use the `createPageData` helper from `core/types.js`
3. Import and register in `index.js`
4. Add URL pattern in `urlPatternRegistry`

### Example

```javascript
// pages/projects/new-category.js
import { createPageData } from '../../core/types.js';

const newData = createPageData('projects/new-category', {
  urlPattern: '/projects/new-category',
  metaTitle: '...',
  metaDescription: '...',
  // ... other data
});

export default newData;
```

```javascript
// index.js
import newCategoryData from './pages/projects/new-category.js';

staticDataRegistry['projects/new-category'] = newCategoryData;
urlPatternRegistry.push({ 
  pattern: '/projects/new-category', 
  key: 'projects/new-category' 
});
```

## 🎯 Best Practices

1. **Always use helpers** instead of directly accessing the registry
2. **Keep SEO data updated** with current keywords and descriptions
3. **Use templates** from `COMMON_TEMPLATES` for consistency
4. **Add FAQs** to improve page SEO and user engagement
5. **Define filters** to match your actual project data structure
6. **Update `lastUpdated`** when making changes to existing pages

## 📦 Exports

```javascript
// From index.js
export { staticDataRegistry }      // All page data
export { urlPatternRegistry }      // URL mappings
export { getAllPageKeys }          // Get all keys
export { getProjectPageKeys }      // Get project keys
export { getBHKPageKeys }          // Get BHK keys
export { getCityPageKeys }         // Get city keys
export { getStatusPageKeys }       // Get status keys
export { getBudgetPageKeys }       // Get budget keys
export { getTypePageKeys }         // Get type keys
export { hasPageData }             // Check if exists

// From helpers.js
export { getStaticData }           // Get by key
export { getStaticDataByUrl }      // Get by URL
export { getSEOData }              // Get SEO
export { getHeroData }             // Get hero
export { getFAQs }                 // Get FAQs
export { getFilters }              // Get filters
export { getSortOptions }          // Get sort options
export { isProjectPage }           // Check if project page
export { isBHKPage }               // Check if BHK page
export { isCityPage }              // Check if city page
export { isStatusPage }            // Check if status page
export { isBudgetPage }            // Check if budget page
export { isTypePage }              // Check if type page
export { useStaticData }           // React hook
export { useSEOData }              // React hook for SEO
```

## 🔧 Integration with React

```javascript
// In your page component
import { useStaticData, useSEOData } from '../data/helpers';

function ProjectPage({ pageKey }) {
  const pageData = useStaticData(pageKey);
  const seoData = useSEOData(pageKey);
  
  useEffect(() => {
    // Update document title
    document.title = seoData.title;
  }, [seoData]);
  
  return (
    <div>
      <h1>{pageData.h1}</h1>
      <p>{pageData.introText}</p>
      {/* ... */}
    </div>
  );
}
```

## 📄 License

Internal use for 100acress website.
