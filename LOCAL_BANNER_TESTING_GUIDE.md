# Local Banner Testing Guide

## Overview
This guide helps you set up local testing for banner management without affecting the live website.

## Setup Instructions

### 1. Local Development Setup

#### Option A: Use Local Backend Server
1. **Start your local backend server** on port 3500:
   ```bash
   # Navigate to your backend directory
   cd your-backend-directory
   
   # Start the server
   npm start
   # or
   node server.js
   ```

2. **Verify the server is running**:
   - Open browser and go to `http://localhost:3500`
   - You should see your API server running

#### Option B: Use Production API with Local Frontend
1. **Keep using production API** but test locally
2. **Make sure you're logged in** with admin credentials
3. **Test banner changes** - they will affect live site but you can test the interface

### 2. Environment Configuration

The system automatically detects if you're running locally and uses the appropriate API:

- **Localhost (localhost:3000)**: Uses `http://localhost:3500` API
- **Production**: Uses `https://api.100acress.com` API

### 3. Testing Banner Management

#### Step 1: Access Banner Management
1. Open your frontend at `http://localhost:3000`
2. Login with admin credentials
3. Navigate to "Banner Management"

#### Step 2: Test Banner Operations
1. **View Banners**: Check if existing banners are visible
2. **Add New Banner**: Test uploading a new banner
3. **Edit Banner**: Test editing existing banners
4. **Toggle Status**: Test activating/deactivating banners
5. **Delete Banner**: Test deleting banners

#### Step 3: Verify Changes
- **Local Testing**: Changes only affect your local database
- **Production**: Changes affect the live website

### 4. Debugging

#### Check Console Logs
Open browser Developer Tools (F12) and check the Console tab for:

```
🧪 Local Testing Configuration:
📍 Current hostname: localhost
🔗 API Base: http://localhost:3500
🏠 Is localhost: true
📡 Banner endpoints: {...}
```

#### Common Issues

1. **API Connection Error**:
   - Make sure backend server is running on port 3500
   - Check if CORS is properly configured

2. **Authentication Error**:
   - Make sure you're logged in with valid admin token
   - Check if token is stored in localStorage

3. **Banner Not Visible**:
   - Check if banners exist in database
   - Verify API endpoints are working
   - Check console for error messages

### 5. Local Database Setup (Optional)

If you want to use a separate local database:

1. **Create local database**:
   ```bash
   # Create local database
   createdb local_banner_test
   ```

2. **Update backend configuration** to use local database

3. **Seed with test data**:
   ```bash
   # Add some test banners
   node scripts/seed-test-banners.js
   ```

### 6. Testing Checklist

- [ ] Backend server running on localhost:3500
- [ ] Frontend running on localhost:3000
- [ ] Admin user logged in
- [ ] Banner Management page accessible
- [ ] Can view existing banners
- [ ] Can add new banners
- [ ] Can edit banners
- [ ] Can toggle banner status
- [ ] Can delete banners
- [ ] Changes don't affect live website

### 7. Switching Between Local and Production

#### For Local Testing:
- Access via `http://localhost:3000`
- System automatically uses local API

#### For Production:
- Access via your production domain
- System automatically uses production API

### 8. Troubleshooting

#### Banner Not Loading:
1. Check console for API errors
2. Verify backend server is running
3. Check authentication token
4. Verify API endpoints are correct

#### Changes Affecting Live Site:
1. Make sure you're accessing via localhost
2. Check console logs for API base URL
3. Verify environment detection is working

#### Performance Issues:
1. Check network requests in Developer Tools
2. Verify API response times
3. Check for CORS issues

## Quick Commands

```bash
# Start local development
npm run dev

# Check if backend is running
curl http://localhost:3500/health

# Check API endpoints
curl http://localhost:3500/api/admin/banners
```

## Notes

- Local testing uses `http://localhost:3500` API
- Production uses `https://api.100acress.com` API
- System automatically detects environment
- All banner operations work the same way
- Local changes don't affect live website
