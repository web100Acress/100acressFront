# Project Order Management System

## Overview

This system allows you to control how projects are displayed for each builder on the website. It provides two ordering modes:

1. **Random Order (Default)**: New builders automatically get random project ordering
2. **Manual Order**: Custom arrangement that you can define and save

## How It Works

### For New Builders
- When a builder is first added, their projects display in random order
- The random order is consistent (same order each time) using a seed based on the builder name
- This prevents bias and provides variety in project display

### For Existing Builders
- You can switch between random and manual ordering
- Manual orders are preserved when switching back and forth
- You can reset to random order at any time

## Admin Interface

### Access
Navigate to: `/admin/project-order-manager`

### Features
1. **Builder Selection**: Choose which builder to manage
2. **Order Type Toggle**: Switch between Random and Manual ordering
3. **Drag & Drop**: Reorder projects by dragging them in manual mode
4. **Save Order**: Persist your custom order
5. **Reset to Random**: Remove custom order and return to random

### Usage Steps
1. Select a builder from the dropdown
2. Choose "Manual Order" to enable custom ordering
3. Drag and drop projects to reorder them
4. Click "Save Order" to persist the changes
5. The new order will be applied immediately on the website

## Technical Implementation

### Redux Store Structure
```javascript
projectOrder: {
  customOrders: {},           // Custom order for each builder
  buildersWithCustomOrder: {}, // Track which builders have custom orders
  randomSeeds: {}             // Seeds for consistent random ordering
}
```

### Key Functions
- `orderProjects()`: Main function that decides order based on settings
- `shuffleArrayWithSeed()`: Creates consistent random ordering
- `hasCustomOrder()`: Checks if builder has custom order
- `getCustomOrder()`: Gets custom order for builder

### Files Modified
1. `src/Redux/slice/ProjectOrderSlice.jsx` - New Redux slice
2. `src/Redux/store/AppStore.jsx` - Added to store
3. `src/Utils/ProjectOrderUtils.jsx` - Utility functions
4. `src/Pages/BuilderPages/BuilderPage.jsx` - Updated to use new system
5. `src/AdminPage/ProjectOrderManager.jsx` - Admin interface
6. `src/App.jsx` - Added route
7. `src/AdminPage/Sidebar.jsx` - Added navigation link

## Benefits

1. **Flexibility**: Easy switching between random and manual ordering
2. **Consistency**: Random orders are consistent across page refreshes
3. **User Experience**: Admins can prioritize important projects
4. **Performance**: Efficient ordering with memoization
5. **Scalability**: Works for all builders automatically

## Future Enhancements

- API integration to persist orders to database
- Bulk ordering operations
- Order templates for different project types
- Analytics on project performance by position 