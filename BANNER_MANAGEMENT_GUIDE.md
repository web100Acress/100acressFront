# Dynamic Banner Management System

## Overview
The dynamic banner management system allows administrators to upload, manage, and display banners in the hero section of the homepage. Banners are automatically rotated and can include custom titles, subtitles, and clickable links.

## Features

### Admin Panel Features
- **Upload New Banners**: Upload images with custom titles, subtitles, and links
- **Banner Management**: View, activate/deactivate, and delete existing banners
- **Order Management**: Set display order for banners
- **Real-time Preview**: Preview banners before uploading
- **S3 Integration**: Automatic upload to AWS S3 with CDN support

### Frontend Features
- **Dynamic Display**: Automatically fetches and displays active banners
- **Auto-rotation**: Banners rotate every 5 seconds if multiple banners exist
- **Navigation Dots**: Click to manually switch between banners
- **Responsive Design**: Optimized for all screen sizes
- **Fallback Support**: Shows default banner if no dynamic banners are available

## How to Use

### For Administrators

1. **Access Banner Management**
   - Login to admin panel
   - Navigate to "Banner Management" in the sidebar

2. **Upload a New Banner**
   - Click "Upload New Banner"
   - Fill in banner details:
     - **Title**: Main heading text
     - **Subtitle**: Supporting text (optional)
     - **Link**: URL to redirect when banner is clicked (optional)
     - **Display Order**: Number to control banner sequence
     - **Active**: Toggle to show/hide banner
   - Select an image file (recommended: 1920x340px, max 5MB)
   - Preview the banner
   - Click "Upload Banner"

3. **Manage Existing Banners**
   - View all uploaded banners in the list
   - Toggle active/inactive status
   - Delete unwanted banners
   - See upload date and details

### For Developers

#### API Endpoints

**Public Endpoints (No Authentication)**
- `GET /api/banners/active` - Fetch all active banners

**Admin Endpoints (Requires Authentication)**
- `GET /api/admin/banners` - Fetch all banners (admin view)
- `POST /api/admin/banners/upload` - Upload new banner
- `PATCH /api/admin/banners/:id` - Update existing banner
- `PATCH /api/admin/banners/:id/toggle` - Toggle banner active status
- `DELETE /api/admin/banners/:id` - Delete banner

#### Redux State Management

The system uses Redux for state management with the following actions:

```javascript
// Fetch active banners (public)
dispatch(fetchActiveBanners())

// Fetch all banners (admin)
dispatch(fetchAllBanners())

// Set current banner
dispatch(setCurrentBanner(banner))

// Clear banners
dispatch(clearBanners())
```

#### Banner Data Structure

```javascript
{
  _id: "banner_id",
  title: "Banner Title",
  subtitle: "Banner Subtitle",
  link: "https://example.com",
  image: {
    public_id: "s3_key",
    url: "s3_url",
    cdn_url: "cloudfront_url"
  },
  isActive: true,
  order: 0,
  uploadedBy: "user_id",
  createdAt: "2025-01-17T10:30:00Z",
  updatedAt: "2025-01-17T10:30:00Z"
}
```

## Technical Implementation

### Backend Components
- **Model**: `backend/Models/Banner.js` - MongoDB schema
- **Controller**: `backend/Controller/AdminController/BannerController.js` - API logic
- **Routes**: `backend/routes/admin.banners.js` - Admin routes
- **Public Routes**: `backend/routes/public.banners.js` - Public routes
- **S3 Integration**: Uses existing S3 helper utilities

### Frontend Components
- **Admin Panel**: `100acressFront/src/AdminPage/BannerManagement.jsx`
- **Dynamic Banner**: `100acressFront/src/Components/HomePageComponents/DynamicHeroBanner.jsx`
- **Redux Slice**: `100acressFront/src/Redux/slice/BannerSlice.jsx`
- **Updated Home**: Modified `100acressFront/src/Pages/Home.jsx`

### File Structure
```
backend/
├── Models/Banner.js
├── Controller/AdminController/BannerController.js
├── routes/admin.banners.js
├── routes/public.banners.js
└── temp/uploads/ (temporary file storage)

100acressFront/src/
├── AdminPage/BannerManagement.jsx
├── Components/HomePageComponents/DynamicHeroBanner.jsx
├── Redux/slice/BannerSlice.jsx
└── Pages/Home.jsx (updated)
```

## Configuration

### Environment Variables
Ensure these are set in your `.env` file:
```
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_S3_BUCKET=100acress-media-bucket
AWS_REGION=your_region
```

### Database
The system automatically creates the Banner collection when first used. No manual database setup is required.

## Troubleshooting

### Common Issues

1. **Banners not displaying**
   - Check if banners are marked as active
   - Verify S3/CDN URLs are accessible
   - Check browser console for errors

2. **Upload failures**
   - Verify file size is under 5MB
   - Check file type is an image
   - Ensure S3 credentials are configured

3. **Admin access issues**
   - Verify admin authentication token
   - Check user role is "Admin"

### Debug Mode
Enable debug logging by checking the browser console and server logs for detailed error messages.

## Future Enhancements

Potential improvements for the system:
- Video banner support
- Banner analytics and click tracking
- A/B testing for different banners
- Scheduled banner publishing
- Banner templates and themes
- Multi-language banner support

## Support

For technical support or questions about the banner management system, please contact the development team.

