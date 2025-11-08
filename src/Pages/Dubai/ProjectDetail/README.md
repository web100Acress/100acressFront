# Dubai Project Detail Page

A UAE-focused project detail page for displaying luxury properties in Dubai and all Emirates.

## Overview

This page provides a comprehensive view of individual properties in the UAE, featuring:
- **UAE-themed design** with gold accents and Arabic-inspired patterns
- **Responsive layout** optimized for all devices
- **Rich property information** including pricing, amenities, location, and more
- **Interactive components** like image galleries, floor plans, and contact forms

## Features

### 1. **DubaiProjectHero**
- Full-screen hero section with property image
- Quick property information cards (Price, Area, Possession, Developer)
- CTA buttons for callbacks, brochure downloads, and WhatsApp
- Gold-themed design with gradient overlays

### 2. **DubaiProjectAbout**
- Detailed property description
- Developer information
- Key statistics (Towers, Floors, Units, Area)
- Feature highlights with icons

### 3. **DubaiProjectHighlights**
- Grid display of key features
- Technical specifications
- Check-marked list items
- Hover effects and animations

### 4. **DubaiProjectPricing**
- Configuration cards (1 BHK, 2 BHK, 3 BHK, etc.)
- Detailed specifications (Area, Bedrooms, Bathrooms)
- Payment plan breakdown
- Investment benefits

### 5. **DubaiProjectGallery**
- Responsive image grid
- Lightbox modal for full-screen viewing
- Image navigation controls
- Featured image display

### 6. **DubaiProjectAmenities**
- Categorized amenities display
- Icon-based visual representation
- Grouped by category (Fitness, Recreation, Safety, etc.)
- Hover effects

### 7. **DubaiProjectLocation**
- Interactive map integration
- Nearby landmarks with distances
- Connectivity highlights
- Address information

### 8. **DubaiProjectFloorPlans**
- Floor plan gallery
- Download functionality
- Detailed specifications per plan
- Lightbox view

### 9. **DubaiProjectDeveloper**
- Developer profile
- Achievements and statistics
- Certifications and awards
- Company information

### 10. **DubaiProjectContact**
- Contact form with validation
- Multiple contact methods (Phone, Email, WhatsApp)
- Success confirmation
- Quick info section

## Routing

The page is accessible via:
```
/dubai/project/:projectSlug/
```

Example:
```
/dubai/project/burj-khalifa-residences/
```

## Data Flow

1. **Route Parameter**: Project slug from URL
2. **Redux Store**: Fetches Dubai projects from `store.stateproject.dubai`
3. **Project Matching**: Finds project by `slugURL`
4. **Component Rendering**: Passes project data to all child components

## Styling

- **Color Scheme**: Black background with gold accents (#d4af37)
- **Typography**: Display fonts for headings, clean sans-serif for body
- **Effects**: Glassmorphism, gradients, backdrop blur
- **Animations**: Framer Motion for smooth transitions
- **Responsive**: Mobile-first approach with Tailwind CSS

## Usage

### Basic Implementation

```jsx
import DubaiProjectPage from "./Pages/Dubai/ProjectDetail/DubaiProjectPage";

// In your router
<Route path="/dubai/project/:projectSlug/" element={<DubaiProjectPage />} />
```

### Linking to Project Page

```jsx
import { Link } from "react-router-dom";

<Link to={`/dubai/project/${projectSlug}/`}>
  View Details
</Link>
```

## Components Structure

```
ProjectDetail/
├── DubaiProjectPage.jsx          # Main page component
└── components/
    ├── DubaiProjectHero.jsx       # Hero section
    ├── DubaiProjectAbout.jsx      # About section
    ├── DubaiProjectHighlights.jsx # Highlights section
    ├── DubaiProjectPricing.jsx    # Pricing section
    ├── DubaiProjectGallery.jsx    # Gallery section
    ├── DubaiProjectAmenities.jsx  # Amenities section
    ├── DubaiProjectLocation.jsx   # Location section
    ├── DubaiProjectFloorPlans.jsx # Floor plans section
    ├── DubaiProjectDeveloper.jsx  # Developer section
    └── DubaiProjectContact.jsx    # Contact section
```

## Dependencies

- `react-router-dom` - Routing
- `framer-motion` - Animations
- `lucide-react` - Icons
- `react-helmet-async` - SEO meta tags
- `@reduxjs/toolkit` - State management

## Customization

### Colors
Update the gold color in Tailwind config:
```js
colors: {
  gold: '#d4af37',
}
```

### Sections
Add or remove sections in `DubaiProjectPage.jsx`:
```jsx
<DubaiProjectAbout project={projectData} />
<DubaiProjectHighlights project={projectData} />
// Add your custom section here
```

### Data Structure
The page expects project data with the following structure:
```js
{
  projectName: string,
  city: string,
  description: string,
  minPrice: number,
  maxPrice: number,
  projectArea: string,
  possession: string,
  builderName: string,
  frontImage: { url: string },
  images: [{ url: string }],
  BhK_Details: [],
  amenities: [],
  // ... more fields
}
```

## SEO

Each project page includes:
- Dynamic page title
- Meta description
- Open Graph tags
- Structured data (JSON-LD)

## Performance

- Lazy loading for images
- Code splitting via React.lazy
- Optimized animations
- Responsive images

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Future Enhancements

- [ ] Virtual tour integration
- [ ] 3D floor plan viewer
- [ ] Live chat support
- [ ] Comparison tool
- [ ] Saved properties
- [ ] Share functionality
- [ ] Print-friendly view
- [ ] Multi-language support (Arabic)

## Notes

- Designed specifically for UAE properties
- Follows luxury real estate design patterns
- Optimized for high-end property showcasing
- Mobile-responsive with touch-friendly interactions
