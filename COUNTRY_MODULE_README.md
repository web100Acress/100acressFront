# 100acress Country Module - Next.js Implementation

## 🌍 Overview
Complete Next.js implementation of the country-specific real estate module with TypeScript support, SEO optimization, and proper routing structure.

## 📁 Folder Structure

```
src/country/
├── config/
│   └── countries.ts              # Country configuration and data
├── providers/
│   ├── CountryProvider.tsx       # Country context provider
│   ├── ThemeProvider.tsx         # Theme context provider
│   └── index.ts                  # Barrel exports
├── modules/
│   ├── global/                   # Global components
│   │   ├── navbar/
│   │   │   └── GlobalNavbar.tsx
│   │   ├── hero/
│   │   │   └── GlobalHero.tsx
│   │   └── footer/
│   │       └── GlobalFooter.tsx
│   └── country/                  # Country-specific components
│       ├── navbar/
│       │   ├── UKNavbar.tsx
│       │   ├── USANavbar.tsx
│       │   └── SriLankaNavbar.tsx
│       ├── hero/
│       │   ├── UKHero.tsx
│       │   ├── USAHero.tsx
│       │   └── SriLankaHero.tsx
│       └── footer/
│           ├── UKFooter.tsx
│           ├── USAFooter.tsx
│           └── SriLankaFooter.tsx
└── themes/
    └── countries.css             # Country-specific CSS themes

pages/country/
├── choose.tsx                    # Country selection page
├── uk/
│   └── index.tsx                 # UK home page
├── usa/
│   └── index.tsx                 # USA home page
└── srilanka/
    └── index.tsx                 # Sri Lanka home page
```

## 🚀 Available Routes

### Global Routes
- `/` - Global homepage
- `/country/choose` - Country selection page

### Country-Specific Routes
- `/uk` → `/country/uk` - UK properties
- `/usa` → `/country/usa` - USA properties  
- `/srilanka` → `/country/srilanka` - Sri Lanka properties

### URL Rewrites
Next.js config handles clean URLs:
- `/uk` → `/country/uk`
- `/uk/properties` → `/country/uk/properties`
- `/usa` → `/country/usa`
- `/srilanka` → `/country/srilanka`

## 🎨 Country Themes

### UK (United Kingdom)
- **Primary Color**: Blue (#1e40af)
- **Secondary Color**: Light Blue (#3b82f6)
- **Currency**: GBP (£)
- **Domain**: 100acress.co.uk

### USA (United States)
- **Primary Color**: Red (#dc2626)
- **Secondary Color**: Light Red (#ef4444)
- **Currency**: USD ($)
- **Domain**: 100acress.com

### Sri Lanka
- **Primary Color**: Orange (#ea580c)
- **Secondary Color**: Light Orange (#f97316)
- **Currency**: LKR (රු)
- **Domain**: 100acress.lk

## 🔧 Technical Features

### TypeScript Support
- Full type safety with interfaces
- Proper component typing
- Context provider types
- SEO metadata typing

### SEO Optimization
- Meta tags for all pages
- Open Graph tags
- Twitter Cards
- JSON-LD structured data
- Canonical URLs
- Static generation (SSG)

### Performance
- Static Site Generation (SSG)
- Image optimization
- Code splitting
- Lazy loading components
- Incremental Static Regeneration (ISR)

### Theming System
- CSS custom properties
- Dynamic theming per country
- Responsive design
- Dark mode support

## 🛠 Development

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm run start
```

## 📱 Responsive Design

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

## 🎯 Component Features

### Navbar Components
- Responsive navigation
- Country selector dropdown
- Global navigation link
- Mobile hamburger menu
- Active route highlighting

### Hero Components
- Animated backgrounds
- Country-specific branding
- Call-to-action buttons
- Featured property cards
- Statistics display

### Footer Components
- Multi-column layout
- Country links
- Social media integration
- Contact information
- Legal links

## 🌐 Internationalization Ready

The module is structured to support:
- Multiple languages
- Country-specific content
- Localized SEO
- Regional pricing
- Currency formatting

## 📊 SEO Features

### Meta Tags
```typescript
interface SEOData {
  title: string;
  description: string;
  keywords: string[];
}
```

### Structured Data
- Organization schema
- Real estate listings
- Contact information
- Breadcrumb navigation

## 🔍 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📝 Configuration

### Next.js Config
- Custom rewrites for clean URLs
- Image optimization domains
- Environment variables
- Build optimizations

### TypeScript Config
- Strict mode enabled
- Path aliases configured
- Next.js types included
- JSX support

## 🚀 Deployment

### Environment Variables
```bash
NEXT_PUBLIC_API_BASE_URL=https://api.100acress.com
NEXT_PUBLIC_SITE_URL=https://100acress.com
```

### Build Commands
```bash
# Development build
npm run build

# Export static files
npm run build:export

# Type checking
npm run type-check
```

## 🔄 Migration Notes

- All `.jsx` files converted to `.tsx`
- React Router replaced with Next.js routing
- Static generation implemented
- SEO metadata added
- TypeScript interfaces defined
- CSS themes optimized

## 📞 Support

For issues or questions regarding the country module:
1. Check TypeScript compilation
2. Verify routing configuration
3. Test SEO metadata
4. Validate responsive design

---

**Status**: ✅ Complete Next.js Implementation
**TypeScript**: ✅ Full Type Safety
**SEO**: ✅ Optimized
**Performance**: ✅ SSG Enabled
