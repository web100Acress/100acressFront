# Dubai Luxury Real Estate Page

This is a premium Dubai real estate page integrated into the 100acress website, featuring a luxury black and gold design theme.

## Features

- **Hero Section**: Full-screen hero with Dubai skyline imagery
- **Properties Section**: Premium property listings with filtering
- **Developers Section**: Top Dubai developers showcase
- **Lifestyle Section**: Dubai luxury lifestyle highlights
- **Investment Section**: Market insights and investment data
- **Contact Section**: Lead generation form with business hours
- **Footer**: Comprehensive footer with links and social media
- **WhatsApp Button**: Floating WhatsApp contact button

## Routes

The Dubai page is accessible via:
- `/dubai/`
- `/projects-in-dubai/`

## Design Theme

- **Colors**: Black background with gold (#d4af37) accents
- **Typography**: Rubik font family
- **Effects**: Glass morphism, gold gradients, shimmer effects
- **Animations**: Fade-in, scale, float, and glow animations

## Components

All components are located in `./components/`:
- `Header.jsx` - Navigation header with scroll effects
- `Hero.jsx` - Hero section with stats
- `PropertyCard.jsx` - Individual property card
- `PropertiesSection.jsx` - Properties grid with filters
- `DevelopersSection.jsx` - Developer logos grid
- `LifestyleSection.jsx` - Lifestyle features
- `InvestmentSection.jsx` - Investment insights
- `ContactSection.jsx` - Contact form
- `Footer.jsx` - Footer component
- `WhatsAppButton.jsx` - Floating WhatsApp button

## Assets

All images are stored in `./assets/`:
- `dubai-hero.jpg` - Hero background
- `luxury-property-1.jpg` - Property image 1
- `luxury-property-2.jpg` - Property image 2
- `luxury-property-3.jpg` - Property image 3
- `lifestyle-1.jpg` - Lifestyle image 1
- `lifestyle-2.jpg` - Lifestyle image 2

## Styling

Custom Dubai theme styles are added to `/src/index.css`:
- Gold color utilities (`.text-gold`, `.bg-gold`, `.border-gold`)
- Gradient utilities (`.gradient-gold`, `.gradient-luxury`)
- Shadow utilities (`.shadow-gold`, `.shadow-luxury`)
- Glass effect (`.glass-effect`)
- Animation classes (`.animate-fade-in`, `.animate-float`, etc.)

## Usage

The page is automatically loaded when navigating to `/dubai/` or `/projects-in-dubai/`.
