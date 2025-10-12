# Carousel Banner Management Guide

## Overview
The homepage now features a dynamic carousel banner system that can be fully managed from the admin panel. This replaces the hardcoded banner arrays with a database-driven solution.

## Features

### ✅ **Admin Panel Management**
- **Create/Edit Banners**: Upload images, set titles, subtitles, and slugs
- **Banner Ordering**: Control the display order of banners
- **Active/Inactive Toggle**: Enable/disable banners without deleting
- **Slug Management**: Set custom URLs for banner navigation
- **Image Upload**: Support for high-quality banner images

### ✅ **Carousel Functionality**
- **Auto-play**: Banners automatically rotate every 5 seconds
- **Navigation**: Arrow controls and dot indicators
- **Responsive**: Different settings for mobile and desktop
- **Smooth Transitions**: Fade effects between banners
- **Hover Pause**: Auto-play pauses when hovering over banners

### ✅ **Banner Content Display**
- **Title Overlay**: Display banner titles on the image
- **Subtitle Support**: Show additional banner information
- **Click Navigation**: Banners link to custom URLs or project pages
- **Slug-based Routing**: Use custom slugs for internal navigation

## How to Use

### 1. **Access Banner Management**
- Go to Admin Dashboard
- Navigate to "Banner Management" in the sidebar
- You'll see the enhanced banner management interface

### 2. **Create a New Banner**
1. Click "Upload New Banner" button
2. Fill in the form:
   - **Title**: Main banner text (e.g., "THE TRILLION")
   - **Subtitle**: Additional description (e.g., "SECTOR 48, GURUGRAM")
   - **Slug**: Custom URL path (e.g., "experion-the-trillion")
   - **Image**: Upload banner image
   - **Order**: Set display priority (lower numbers appear first)
   - **Active**: Toggle banner visibility

3. Click "Upload Banner"

### 3. **Manage Existing Banners**
- **Edit**: Click the edit button to modify banner details
- **Toggle Status**: Use the status toggle to enable/disable banners
- **Delete**: Remove banners permanently
- **Reorder**: Change the order field to reorder banners

### 4. **Banner Slug System**
- **Auto-generation**: Click "Auto" button to generate slug from title
- **Manual Entry**: Type custom slug (auto-formatted for URL compatibility)
- **Navigation**: Banners with slugs navigate to `/{slug}/` URLs
- **Copy Function**: Click on displayed slug to copy to clipboard

## Technical Implementation

### **Frontend Components**
- `DynamicHeroBanner.jsx`: Main carousel component with Slick slider
- `BannerManagement.jsx`: Admin interface for banner management
- Redux integration for state management

### **Backend API**
- `GET /api/banners/active`: Fetch active banners for carousel
- `POST /api/admin/banners/upload`: Upload new banners
- `PUT /api/admin/banners/:id`: Update banner details
- `DELETE /api/admin/banners/:id`: Delete banners

### **Database Schema**
```javascript
{
  title: String,
  subtitle: String,
  slug: String (unique, sparse index),
  image: {
    url: String,
    cdn_url: String
  },
  isActive: Boolean,
  order: Number,
  uploadedBy: ObjectId
}
```

## Banner Display Logic

### **Priority System**
1. **Active Banners**: Only `isActive: true` banners are displayed
2. **Order Sorting**: Banners sorted by `order` field (ascending)
3. **Fallback**: If no banners, shows default "Signature Global" banner

### **Image Resolution**
- **Desktop**: Optimized for 1200x400px
- **Mobile**: Responsive scaling
- **CDN**: Images served from AWS S3 with CloudFront CDN

### **Navigation Behavior**
- **Slug Priority**: Uses `slug` field if available, falls back to `link`
- **Internal Links**: Slugs navigate to `/{slug}/` routes
- **External Links**: Full URLs open in new tab
- **Default Fallback**: `/developers/signature-global/` if no link/slug

## Troubleshooting

### **Banners Not Showing**
1. Check if banners are marked as "Active"
2. Verify API endpoint is working: `/api/banners/active`
3. Check browser console for errors
4. Ensure images are properly uploaded

### **Slug Navigation Issues**
1. Verify slug is properly formatted (lowercase, hyphens)
2. Check if target route exists
3. Test slug in browser: `/{your-slug}/`

### **Image Loading Problems**
1. Check S3 bucket permissions
2. Verify CDN configuration
3. Test image URLs directly
4. Check file size limits (5MB max)

## Best Practices

### **Banner Design**
- Use high-quality images (1200x400px recommended)
- Keep text overlays readable
- Test on both desktop and mobile
- Optimize images for web (WebP format preferred)

### **Content Management**
- Use descriptive titles and subtitles
- Create meaningful slugs
- Set appropriate order values
- Regularly review and update banners

### **Performance**
- Limit active banners to 5-7 maximum
- Use optimized image formats
- Monitor page load times
- Test on various devices

## Migration from Hardcoded Banners

The system has been updated to use dynamic banners instead of hardcoded arrays. The old `ModernHeroSection` component with hardcoded banners has been replaced with the dynamic `DynamicHeroBanner` component.

### **What Changed**
- ✅ Removed hardcoded banner arrays
- ✅ Added database-driven banner system
- ✅ Implemented admin management interface
- ✅ Added carousel functionality with Slick slider
- ✅ Integrated slug-based navigation

### **Migration Steps**
1. Create banners in admin panel with existing image URLs
2. Set appropriate titles, subtitles, and slugs
3. Configure order and active status
4. Test banner display and navigation

## Support

For technical issues or questions:
1. Check browser console for errors
2. Verify API endpoints are working
3. Test banner creation and management
4. Review this guide for troubleshooting steps

The carousel banner system is now fully integrated with the admin panel, providing complete control over homepage banner display and navigation.

