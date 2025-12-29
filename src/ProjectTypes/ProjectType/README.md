# Project Type Pages - Refactored Structure

This directory contains the refactored project type pages that use a single template instead of 6 separate files.

## Structure

```
src/Pages/ProjectType/
├── [type].jsx          # Dynamic route component
├── routes.js           # Route configuration
└── README.md           # This file

src/Components/
└── ProjectTypeTemplate.jsx  # Reusable template component
```

## How It Works

### Dynamic Route (`[type].jsx`)
- Captures the project type from the URL parameter
- Loads the appropriate configuration for that project type
- Renders the `ProjectTypeTemplate` with the correct props
- Handles SEO, meta tags, and structured data dynamically

### Template Component (`ProjectTypeTemplate.jsx`)
- Reusable component that accepts props for title, description, projects, and filters
- Handles all the UI logic (search, filtering, pagination, etc.)
- Styled to match the `ProjectStatusSearch.jsx` design
- Includes wishlist, compare, and share functionality

## Supported Project Types

| Type | URL | Title |
|------|-----|-------|
| `sco-plots` | `/project-type/sco-plots` | SCO Plots in Gurugram |
| `luxury-villas` | `/project-type/luxury-villas` | India's Luxury Villas for Sale |
| `plots-in-gurugram` | `/project-type/plots-in-gurugram` | Plots in Gurugram |
| `residential-projects` | `/project-type/residential-projects` | Residential Property |
| `independent-floors` | `/project-type/independent-floors` | Independent & Builder Floors |
| `commercial-projects` | `/project-type/commercial-projects` | Commercial Projects |

## Configuration

Each project type has its own configuration object in `[type].jsx` that includes:

- **title**: Page title
- **description**: Page description
- **metaTitle**: SEO title
- **metaDescription**: SEO description
- **keywords**: SEO keywords
- **canonical**: Canonical URL
- **query**: API query parameter
- **reduxKey**: Redux store key
- **badgeColor**: Badge color class
- **badgeText**: Badge text
- **typeFilter**: Function to filter projects by type

## Features

### SEO Optimization
- Dynamic meta tags based on project type
- Structured data for each project type
- Canonical URLs
- Open Graph and Twitter Card support

### Filtering
- Project status filter (Upcoming, New Launch, Under Construction, Ready to Move)
- City filter
- Price range filter
- Search by name or city

### UI Features
- Responsive design
- Mobile-friendly filter modal
- Grid/List view options
- Wishlist functionality
- Compare functionality
- Share functionality
- Pagination

### Performance
- Lazy loading of images
- Efficient filtering
- Pagination for large datasets
- Optimized re-renders

## Usage

### Adding a New Project Type

1. Add the configuration to `projectTypeConfigs` in `[type].jsx`
2. Add the route to `routes.js`
3. Update the Redux store to include the new data key
4. Test the new route

### Modifying the Template

Edit `ProjectTypeTemplate.jsx` to change the UI, add new features, or modify the layout.

## Migration from Old Structure

The old individual files can be removed:
- `ScoPlotsInGurugram.jsx`
- `LuxuryVillasForSale.jsx` 
- `PlotsInGurugram.jsx`
- `ResidentialProjects.jsx`
- `BuilderIndependentFloor.jsx`
- `CommercialProject.jsx`

## Benefits

1. **DRY Principle**: Single template for all project types
2. **Maintainability**: Changes to UI only need to be made in one place
3. **Consistency**: All project type pages have the same look and feel
4. **SEO**: Dynamic SEO optimization for each project type
5. **Performance**: Optimized filtering and pagination
6. **Scalability**: Easy to add new project types

