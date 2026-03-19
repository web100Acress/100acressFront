# GlobalLoadingButton Component

A reusable, customizable loading button component for implementing lazy loading across the application.

## Features

- 🚀 **Multiple Variants**: Primary, Secondary, Outline styles
- 📏 **Flexible Sizes**: Small, Medium, Large
- 📊 **Progress Display**: Shows loaded count/total count
- 🔄 **Loading States**: Built-in loading spinner
- ♿ **Accessible**: Proper ARIA labels and keyboard navigation
- 🎨 **Customizable**: Extensive styling options

## Usage

```jsx
import GlobalLoadingButton from '../GlobalLoadingButton';

// Basic usage
<GlobalLoadingButton
  isLoading={loadingMore}
  hasMore={hasMoreItems}
  onLoadMore={handleLoadMore}
  loadedCount={items.length}
  totalCount={totalItems}
/>

// Custom styling
<GlobalLoadingButton
  isLoading={loadingMore}
  hasMore={hasMoreItems}
  onLoadMore={handleLoadMore}
  loadedCount={items.length}
  loadingText="Loading more items..."
  loadMoreText="Load More Items"
  variant="outline"
  size="large"
  showProgress={true}
  className="my-custom-class"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isLoading` | boolean | false | Whether data is currently loading |
| `hasMore` | boolean | true | Whether there are more items to load |
| `onLoadMore` | function | null | Function to call when button is clicked |
| `loadedCount` | number | 0 | Number of items currently loaded |
| `totalCount` | number | null | Total number of items available |
| `loadingText` | string | 'Loading...' | Text to show during loading |
| `loadMoreText` | string | 'Load More' | Text for the button |
| `variant` | string | 'primary' | Button style: 'primary', 'secondary', 'outline' |
| `size` | string | 'medium' | Button size: 'small', 'medium', 'large' |
| `showProgress` | boolean | true | Whether to show progress count |
| `className` | string | '' | Additional CSS classes |
| `disabled` | boolean | false | Whether button is disabled |

## Implementation Examples

### 1. Projects Page
```jsx
<GlobalLoadingButton
  isLoading={loadingMore}
  hasMore={hasMoreProjects}
  onLoadMore={loadMoreProjects}
  loadedCount={displayedProjects.length}
  loadingText="Loading more projects..."
  loadMoreText="Load More Projects"
  variant="primary"
/>
```

### 2. Blog Page
```jsx
<GlobalLoadingButton
  isLoading={loadingMore}
  hasMore={hasMoreBlogs}
  onLoadMore={loadMoreBlogs}
  loadedCount={filteredBlogs.length}
  totalCount={totalBlogCount}
  loadingText="Loading more blogs..."
  loadMoreText="Load More Blogs"
  variant="primary"
  showProgress={true}
/>
```

### 3. Testimonials Page
```jsx
<GlobalLoadingButton
  isLoading={loadingMore}
  hasMore={hasMore}
  onLoadMore={loadMore}
  loadedCount={displayedTestimonials.length}
  totalCount={testimonials.length}
  loadingText="Loading testimonials..."
  loadMoreText="Load More Testimonials"
  variant="outline"
  size="medium"
/>
```

## Styling Variants

### Primary (Blue)
- Blue background with white text
- Hover: Darker blue
- Use for main CTAs

### Secondary (Gray)
- Gray background with white text
- Hover: Darker gray
- Use for secondary actions

### Outline
- Transparent background with colored border
- Hover: Fills with color
- Use for subtle actions

## Best Practices

1. **Always provide `onLoadMore`** when `hasMore` is true
2. **Use meaningful loading text** for better UX
3. **Show progress when possible** to manage expectations
4. **Choose appropriate variant** based on context
5. **Handle disabled state** properly when loading

## Performance Benefits

- ✅ **Reduced initial load time** - Only load what's needed
- ✅ **Better user experience** - Progressive loading
- ✅ **Lower bandwidth usage** - Load data on demand
- ✅ **Improved perceived performance** - Instant initial render
