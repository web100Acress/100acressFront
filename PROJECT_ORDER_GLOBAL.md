# Global Project Order Management

## Overview
The project order management system has been updated to support global synchronization across all devices. Project orders are now stored in a centralized database and synced across all users.

## Features

### 🔄 Global Synchronization
- Project orders are stored in the backend database
- All devices sync with the server automatically
- Changes made on one device appear on all other devices
- Real-time sync status indicators

### 🎯 Builder-Specific Ordering
- Each builder can have its own custom project order
- Random ordering for new builders (default)
- Manual ordering for custom arrangements
- Drag-and-drop reordering interface

### 💾 Persistent Storage
- Project orders are saved to MongoDB database
- Redux state persists locally for offline functionality
- Automatic sync when connection is restored

## API Endpoints

### Backend Routes
- `GET /projectOrder/sync` - Get all project orders for sync
- `GET /projectOrder/builder/:builderName` - Get order for specific builder
- `POST /projectOrder/save` - Save project order (admin only)
- `DELETE /projectOrder/builder/:builderName` - Delete project order (admin only)
- `GET /projectOrder/all` - Get all project orders (admin only)

### Database Schema
```javascript
{
  builderName: String,           // Unique builder identifier
  customOrder: [String],         // Array of project IDs in custom order
  hasCustomOrder: Boolean,       // Whether custom order is defined
  randomSeed: Number,            // Seed for consistent random ordering
  lastUpdated: Date,             // Last update timestamp
  updatedBy: String              // Admin who made the change
}
```

## Usage

### For Administrators
1. **Access the Project Order Manager** from the admin dashboard
2. **Select a builder** from the dropdown
3. **Choose order type**: Random (default) or Manual
4. **Drag and drop** projects to reorder them
5. **Save changes** to sync with the server
6. **Monitor sync status** via the status indicator

### For Developers
1. **Sync on app start**: The app automatically syncs project orders on mount
2. **Handle offline scenarios**: Local Redux state provides offline functionality
3. **Error handling**: Failed API calls show user-friendly error messages
4. **Debug tools**: Debug buttons available in development mode

## Technical Implementation

### Frontend (React + Redux)
- **Redux Slice**: `ProjectOrderSlice.jsx` with async thunks
- **API Service**: `ProjectOrderApi.js` for server communication
- **Component**: `ProjectOrderManager.jsx` for UI
- **Persistence**: Redux-persist for local storage

### Backend (Node.js + Express + MongoDB)
- **Model**: `projectOrder.js` for database schema
- **Controller**: `ProjectOrderController.js` for business logic
- **Routes**: `projectOrder.route.js` for API endpoints
- **Middleware**: Admin authentication for protected routes

## Migration from Local Storage

The system now uses a hybrid approach:
1. **Local Redux state** for immediate UI updates
2. **Server sync** for global persistence
3. **Automatic fallback** to local state if server is unavailable

## Benefits

✅ **Global Consistency**: All users see the same project order
✅ **Real-time Updates**: Changes appear immediately across devices
✅ **Offline Support**: Local state provides offline functionality
✅ **Admin Control**: Only admins can modify project orders
✅ **Audit Trail**: Track who made changes and when
✅ **Scalable**: Database storage supports unlimited builders

## Troubleshooting

### Sync Issues
- Check network connection
- Verify admin authentication
- Use "Sync with Server" button to retry
- Check browser console for error details

### Order Not Updating
- Ensure you're logged in as admin
- Check if builder has projects loaded
- Verify project IDs are correct
- Try refreshing the page

### Database Issues
- Check MongoDB connection
- Verify database permissions
- Check server logs for errors
- Ensure proper indexing on builderName field 