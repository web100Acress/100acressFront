// Blog Components - Complete Organized Structure
// 
// This file exports all blog components organized by functionality and platform

// ==================== CREATE COMPONENTS ====================

// Desktop Components
export { default as BlogManagementDesktop } from './create/desktop/BlogManagement';
export { default as BlogCardDesktop } from './create/desktop/BlogCard';
export { default as BlogDashboardDesktop } from './create/desktop/BlogDashboard';
export { default as HeroSectionDesktop } from './create/desktop/HeroSection';
export { default as DraftManagementDesktop } from './create/desktop/DraftManagement';
export { default as HeaderDesktop } from './create/desktop/Header';
export { default as FooterDesktop } from './create/desktop/Footer';
export { default as SeoPrivateRouteDesktop } from './create/desktop/SeoPrivateRoute';
export { default as BlogManagementSidebarDesktop } from './create/desktop/BlogManagementSidebar';

// Mobile Components
export { default as BlogManagementMobile } from './create/mobile/BlogManagementMobile';
export { default as BlogCardMobile } from './create/mobile/BlogCardMobile';

// ==================== UPDATE COMPONENTS ====================

// Desktop Components
export { default as AuthorProfileUpdateDesktop } from './update/desktop/AuthorProfileUpdate';
export { default as ModernBlogViewDesktop } from './update/desktop/ModernBlogView';
export { default as ModernBlogPageDesktop } from './update/desktop/ModernBlogPage';
export { default as AuthorPageDesktop } from './update/desktop/AuthorPage';

// Mobile Components
export { default as ModernBlogViewMobile } from './update/mobile/ModernBlogViewMobile';
export { default as ModernBlogPageMobile } from './update/mobile/ModernBlogPageMobile';

// ==================== ADMIN COMPONENTS ====================

// Desktop Components
export { default as AdminBlogDesktop } from './admin/desktop/AdminBlog';
export { default as BlogDesktop } from './admin/desktop/Blog';
export { default as BlogEditDesktop } from './admin/desktop/BlogEdit';
export { default as BlogEnquiriesDesktop } from './admin/desktop/BlogEnquiries';
export { default as BlogViewAdminDesktop } from './admin/desktop/BlogViewAdmin';
export { default as BlogWriteDesktop } from './admin/desktop/BlogWrite';
export { default as BlogWriteModalDesktop } from './admin/desktop/BlogWriteModal';

// Mobile Components
export { default as BlogMobile } from './admin/mobile/BlogMobile';

// ==================== PAGES COMPONENTS ====================

// Desktop Components
export { default as BlogViewDesktop } from './pages/desktop/BlogView';
export { default as BloggingDesktop } from './pages/desktop/Blogging';
export { default as BlogCardDubaiDesktop } from './pages/desktop/BlogCard';
export { default as BlogViewCSSDesktop } from './pages/desktop/BlogView.css';

// Mobile Components
export { default as BlogViewMobile } from './pages/mobile/BlogViewMobile';

// ==================== HOME COMPONENTS ====================

// Desktop Components
export { default as FeaturedBlogsDesktop } from './home/desktop/FeaturedBlogs';

// Mobile Components
export { default as FeaturedBlogsMobile } from './home/mobile/FeaturedBlogsMobile';

// ==================== INSIGHTS COMPONENTS ====================

// Desktop Components
export { default as BlogInsightsDesktop } from './insights/desktop/BlogInsights';

// Mobile Components
// Add mobile insights components here when created

// ==================== HELPER FUNCTIONS ====================

// Platform detection helper
export const isMobile = () => {
  return window.innerWidth <= 768;
};

// Component selector based on platform
export const getBlogComponent = (componentType, platform = 'auto') => {
  const isMobileDevice = platform === 'auto' ? isMobile() : platform === 'mobile';
  
  const components = {
    // Blog Management
    blogManagement: isMobileDevice ? BlogManagementMobile : BlogManagementDesktop,
    
    // Blog Card
    blogCard: isMobileDevice ? BlogCardMobile : BlogCardDesktop,
    
    // Blog View
    blogView: isMobileDevice ? BlogViewMobile : BlogViewDesktop,
    
    // Blog Page/List
    blogPage: isMobileDevice ? ModernBlogPageMobile : ModernBlogPageDesktop,
    
    // Dashboard
    dashboard: BlogDashboardDesktop, // Desktop only for now
    
    // Admin Components
    adminBlog: isMobileDevice ? BlogMobile : BlogDesktop,
    blogEdit: BlogEditDesktop, // Desktop only for now
    blogWrite: BlogWriteDesktop, // Desktop only for now
    blogViewAdmin: BlogViewAdminDesktop, // Desktop only for now
    
    // Home Components
    featuredBlogs: isMobileDevice ? FeaturedBlogsMobile : FeaturedBlogsDesktop,
    
    // Other components (desktop only for now)
    heroSection: HeroSectionDesktop,
    draftManagement: DraftManagementDesktop,
    header: HeaderDesktop,
    footer: FooterDesktop,
    authorProfileUpdate: AuthorProfileUpdateDesktop,
    authorPage: AuthorPageDesktop,
    blogging: BloggingDesktop,
    blogCardDubai: BlogCardDubaiDesktop,
    blogInsights: BlogInsightsDesktop,
  };
  
  return components[componentType] || null;
};

// ==================== CONSTANTS ====================

export const BLOG_COMPONENT_TYPES = {
  // Create/Management
  BLOG_MANAGEMENT: 'blogManagement',
  BLOG_CARD: 'blogCard',
  DASHBOARD: 'dashboard',
  HERO_SECTION: 'heroSection',
  DRAFT_MANAGEMENT: 'draftManagement',
  HEADER: 'header',
  FOOTER: 'footer',
  
  // Update/View
  BLOG_VIEW: 'blogView',
  BLOG_PAGE: 'blogPage',
  AUTHOR_PROFILE_UPDATE: 'authorProfileUpdate',
  AUTHOR_PAGE: 'authorPage',
  
  // Admin
  ADMIN_BLOG: 'adminBlog',
  BLOG_EDIT: 'blogEdit',
  BLOG_WRITE: 'blogWrite',
  BLOG_VIEW_ADMIN: 'blogViewAdmin',
  BLOG_ENQUIRIES: 'blogEnquiries',
  BLOG_WRITE_MODAL: 'blogWriteModal',
  
  // Pages
  BLOGGING: 'blogging',
  BLOG_CARD_DUBAI: 'blogCardDubai',
  
  // Home
  FEATURED_BLOGS: 'featuredBlogs',
  
  // Insights
  BLOG_INSIGHTS: 'blogInsights',
};

export const PLATFORMS = {
  AUTO: 'auto',
  DESKTOP: 'desktop',
  MOBILE: 'mobile',
};

export const BLOG_SECTIONS = {
  CREATE: 'create',
  UPDATE: 'update',
  ADMIN: 'admin',
  PAGES: 'pages',
  HOME: 'home',
  INSIGHTS: 'insights',
};

// ==================== USAGE EXAMPLE ====================

/*
  // Import the helper
  import { getBlogComponent, BLOG_COMPONENT_TYPES, PLATFORMS } from './Blog/index';
  
  // Use in your component
  const BlogManagement = getBlogComponent(BLOG_COMPONENT_TYPES.BLOG_MANAGEMENT);
  
  // Or force specific platform
  const BlogCard = getBlogComponent(BLOG_COMPONENT_TYPES.BLOG_CARD, PLATFORMS.MOBILE);
  
  // Render
  <BlogManagement />
  <BlogCard blog={blogData} />
  
  // Import specific components
  import { FeaturedBlogsMobile, AdminBlogDesktop } from './Blog/index';
  
  // Use directly
  <FeaturedBlogsMobile limit={3} />
  <AdminBlogDesktop />
*/
