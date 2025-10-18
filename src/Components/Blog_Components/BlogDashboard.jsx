import { useState, useEffect, useContext } from "react";
import api from "../../config/apiClient";
import { 
  Eye, 
  ThumbsUp, 
  Share2, 
  MessageCircle, 
  TrendingUp, 
  BarChart3, 
  FileText, 
  Calendar, 
  User, 
  Clock, 
  Activity,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  ArrowUp,
  ArrowDown,
  Users,
  Target,
  Zap,
  Award,
  TrendingDown,
  DollarSign,
  PieChart,
  LineChart,
  BarChart,
  Activity as ActivityIcon,
  Globe,
  Monitor,
  Smartphone,
  Tablet,
  Download,
  
} from "lucide-react";
// Removed all Ant Design imports - using simple JSX with Tailwind CSS
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";

// Removed Ant Design destructured variables

// Prefer slug-based blog link with fallback to legacy title/id route
const getSlugFromTitle = (title) =>
  (title || "").replace(/\s+/g, '-').replace(/[?!,\.;:\{\}\(\)\$\@]+/g, '').toLowerCase();
const blogLink = (blog) => {
  if (blog?.slug) return `/blog/${blog.slug}?id=${blog?._id}`;
  return `/blog/${getSlugFromTitle(blog?.blog_Title)}/${blog?._id}`;
};

export default function BlogDashboard() {
  const history = useNavigate();
  const { agentData, isAdmin } = useContext(AuthContext) || {};

  // Resolve current user identity for ownership checks
  const localAgent = (() => {
    try { return JSON.parse(window.localStorage.getItem("agentData") || "null"); } catch { return null; }
  })();
  const currentUserName = (agentData?.name || localAgent?.name || "").toString().trim();
  const currentUserEmail = (agentData?.email || localAgent?.email || "").toString().trim().toLowerCase();
  const currentUserId = (agentData?._id || localAgent?._id || "").toString();

  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [analytics, setAnalytics] = useState({
    totalViews: 0,
    totalLikes: 0,
    totalShares: 0,
    totalComments: 0,
    monthlyGrowth: 0,
    weeklyGrowth: 0,
    topPerformingBlog: null,
    recentActivity: [],
    engagementRate: 0,
    averageViews: 0,
    totalBlogs: 0,
    publishedBlogs: 0,
    draftBlogs: 0,
    conversionRate: 0,
    bounceRate: 0,
    avgTimeOnPage: 0
  });

  const [filters, setFilters] = useState({
    status: 'all',
    dateRange: 'all',
    search: '',
    category: 'all',
    type: 'blog'
  });

  const [selectedBlog, setSelectedBlog] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [publishLoading, setPublishLoading] = useState(false);
  const [timeRange, setTimeRange] = useState('7d');
  const [darkMode, setDarkMode] = useState(false);
  const [showCharts, setShowCharts] = useState(true);
  const [selectedBlogs, setSelectedBlogs] = useState([]);
  const [bulkAction, setBulkAction] = useState('');
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [chartType, setChartType] = useState('line');
  const [exportFormat, setExportFormat] = useState('pdf');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [performanceAlerts, setPerformanceAlerts] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [seoMetrics, setSeoMetrics] = useState({
    keywordRankings: [],
    organicTraffic: 0,
    backlinks: 0,
    pageSpeed: 0
  });

  // Remove pagination state variables since we're fetching all blogs
  // const [currentPage, setCurrentPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(1);
  // const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    fetchDashboardData();
  }, [timeRange, currentUserName, currentUserEmail, currentUserId, isAdmin]);

  // Search functionality - Enhanced to search in multiple fields
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredBlogs(blogs);
    } else {
      const searchTerm = searchQuery.toLowerCase();
      const filtered = blogs.filter(blog => 
        blog.blog_Title?.toLowerCase().includes(searchTerm) ||
        blog.author?.toLowerCase().includes(searchTerm) ||
        blog.authorEmail?.toLowerCase().includes(searchTerm) ||
        blog.blog_Content?.toLowerCase().includes(searchTerm) ||
        blog.blog_Description?.toLowerCase().includes(searchTerm) ||
        blog.category?.toLowerCase().includes(searchTerm) ||
        blog.tags?.some(tag => tag?.toLowerCase().includes(searchTerm))
      );
      console.log(`Search for "${searchQuery}" found ${filtered.length} blogs`);
      setFilteredBlogs(filtered);
    }
  }, [blogs, searchQuery]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // Try multiple approaches to fetch all blogs
      const listPath = isAdmin ? `/blog/admin/view` : `/blog/view`;
      console.log('API endpoint being called:', `${listPath}?limit=10000&page=1`);
      
      // Try with both limit and page parameters
      let res;
      try {
        // First try with high limit and page 1
        res = await api.get(`${listPath}?limit=10000&page=1`);
      } catch (error) {
        console.log('First attempt failed, trying without page parameter');
        // If that fails, try without page parameter
        res = await api.get(`${listPath}?limit=10000`);
      }
      
      const fetchedBlogs = res.data.data || [];
      
      console.log('=== BLOG FETCH DEBUG ===');
      console.log('Total blogs fetched from API:', fetchedBlogs.length);
      console.log('API Response structure:', res.data);
      console.log('API Response pagination info:', {
        totalPages: res.data.totalPages,
        currentPage: res.data.currentPage,
        totalBlogs: res.data.totalBlogs,
        hasMore: res.data.hasMore
      });
      
      // If we didn't get all blogs, try to fetch more pages
      if (res.data.totalPages && res.data.totalPages > 1) {
        console.log('Multiple pages detected, fetching all pages...');
        const allBlogs = [...fetchedBlogs];
        
        for (let page = 2; page <= res.data.totalPages; page++) {
          try {
            console.log(`Fetching page ${page}...`);
            const pageRes = await api.get(`${listPath}?limit=10000&page=${page}`);
            const pageBlogs = pageRes.data.data || [];
            allBlogs.push(...pageBlogs);
            console.log(`Page ${page} fetched: ${pageBlogs.length} blogs`);
          } catch (pageError) {
            console.error(`Error fetching page ${page}:`, pageError);
          }
        }
        
        console.log('Total blogs after fetching all pages:', allBlogs.length);
        fetchedBlogs.splice(0, fetchedBlogs.length, ...allBlogs);
      }
      
      // Log all Khushi Singh blogs specifically
      const khushiBlogs = fetchedBlogs.filter(blog => 
        blog.author?.toLowerCase().includes('khushi') || 
        blog.authorEmail?.toLowerCase().includes('khushi')
      );
      console.log('Khushi Singh blogs found:', khushiBlogs.length);
      console.log('Khushi blogs details:', khushiBlogs.map(b => ({
        title: b.blog_Title,
        author: b.author,
        authorEmail: b.authorEmail,
        createdAt: b.createdAt,
        isPublished: b.isPublished
      })));
      
      // Scope: if not Admin, show only my blogs
      const myBlogs = (isAdmin ? fetchedBlogs : fetchedBlogs.filter((b) => {
        const authorName = (b?.author || "").toString().trim();
        const authorEmail = (b?.authorEmail || "").toString().trim().toLowerCase();
        const authorId = (b?.authorId || b?.userId || b?.postedBy || "").toString();
        const nameMatch = currentUserName && authorName && authorName.toLowerCase() === currentUserName.toLowerCase();
        const emailMatch = currentUserEmail && authorEmail && authorEmail === currentUserEmail;
        const idMatch = currentUserId && authorId && authorId === currentUserId;
        
        console.log('Blog filter check:', {
          blogTitle: b.blog_Title,
          blogAuthor: authorName,
          blogEmail: authorEmail,
          currentUser: currentUserName,
          currentEmail: currentUserEmail,
          nameMatch,
          emailMatch,
          idMatch,
          finalMatch: nameMatch || emailMatch || idMatch
        });
        
        return nameMatch || emailMatch || idMatch;
      }));
      
      console.log('Filtered blogs for current user:', myBlogs.length);
      console.log('Current user name:', currentUserName);
      console.log('Current user email:', currentUserEmail);
      console.log('Is admin:', isAdmin);
      
      // If no blogs match current user (common when author fields are missing), show all as a fallback
      const listToShow = (isAdmin || myBlogs.length > 0) ? myBlogs : fetchedBlogs;

      console.log('Final blogs to show:', listToShow.length);
      console.log('Final blog titles:', listToShow.map(b => b.blog_Title));

      setBlogs(listToShow);
      setFilteredBlogs(listToShow);
      calculateAnalytics(listToShow);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      console.error("Error details:", error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  // Defensive ownership check for actions (UI already filtered, but keep guard)
  const isOwnedByMe = (blog) => {
    if (!blog) return false;
    const authorName = (blog?.author || "").toString().trim();
    const authorEmail = (blog?.authorEmail || "").toString().trim().toLowerCase();
    const authorId = (blog?.authorId || blog?.userId || blog?.postedBy || "").toString();
    const nameMatch = currentUserName && authorName && authorName.toLowerCase() === currentUserName.toLowerCase();
    const emailMatch = currentUserEmail && authorEmail && authorEmail === currentUserEmail;
    const idMatch = currentUserId && authorId && authorId === currentUserId;
    return isAdmin || nameMatch || emailMatch || idMatch;
  };

  const calculateAnalytics = (blogData) => {
    const getCommentCount = (b) => (
      typeof b?.commentsCount === 'number'
        ? b.commentsCount
        : (Array.isArray(b?.comments) ? b.comments.length : (b?.comments || 0))
    );
    const totalViews = blogData.reduce((sum, blog) => sum + (blog.views || 0), 0);
    const totalLikes = blogData.reduce((sum, blog) => sum + (blog.likes || 0), 0);
    const totalShares = blogData.reduce((sum, blog) => sum + (blog.shares || 0), 0);
    const totalComments = blogData.reduce((sum, blog) => sum + getCommentCount(blog), 0);
    
    const publishedBlogs = blogData.filter(blog => blog.isPublished);
    const draftBlogs = blogData.filter(blog => !blog.isPublished);
    const averageViews = publishedBlogs.length > 0 ? totalViews / publishedBlogs.length : 0;
    
    const topPerformingBlog = blogData.reduce((top, blog) => {
      const blogScore = (blog.views || 0) + (blog.likes || 0) * 2 + (blog.shares || 0) * 3 + getCommentCount(blog) * 1;
      const topScore = (top?.views || 0) + (top?.likes || 0) * 2 + (top?.shares || 0) * 3 + (
        top ? getCommentCount(top) : 0
      ) * 1;
      return blogScore > topScore ? blog : top;
    }, null);

    const engagementRate = totalViews > 0 ? 
      ((totalLikes + totalShares + totalComments) / totalViews) * 100 : 0;

    const conversionRate = totalViews > 0 ? (totalLikes / totalViews) * 100 : 0;
    const bounceRate = 100 - engagementRate;
    const avgTimeOnPage = Math.floor(Math.random() * 5) + 2; // Mock data

    const trendData = calculateTrendData(blogData);
    const alerts = generatePerformanceAlerts(blogData);
    const activity = generateRecentActivity(blogData);

    setAnalytics({
      totalViews,
      totalLikes,
      totalShares,
      totalComments,
      monthlyGrowth: trendData.monthlyGrowth,
      weeklyGrowth: trendData.weeklyGrowth,
      topPerformingBlog,
      engagementRate: parseFloat(engagementRate.toFixed(2)),
      averageViews: Math.round(averageViews),
      totalBlogs: blogData.length,
      publishedBlogs: publishedBlogs.length,
      draftBlogs: draftBlogs.length,
      conversionRate: parseFloat(conversionRate.toFixed(2)),
      bounceRate: parseFloat(bounceRate.toFixed(2)),
      avgTimeOnPage
    });

    setPerformanceAlerts(alerts);
    setRecentActivity(activity);
  };

  const handlePublishToggle = async (checked, blogId) => {
    setPublishLoading(true);
    try {
      const res = await api.put(
        `/blog/update/${blogId}`,
        { isPublished: checked }
      );
      if (res.status >= 200 && res.status < 300) {
        const updatedBlogs = blogs.map(blog =>
          blog._id === blogId ? { ...blog, isPublished: checked } : blog
        );
        setBlogs(updatedBlogs);
        setFilteredBlogs(updatedBlogs.filter(blog => 
          !searchQuery.trim() || 
          blog.blog_Title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          blog.author?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          blog.blog_Content?.toLowerCase().includes(searchQuery.toLowerCase())
        ));
        calculateAnalytics(updatedBlogs);
      }
    } catch (error) {
      console.error("Error updating blog status:", error);
    } finally {
      setPublishLoading(false);
    }
  };

  const handleDeleteBlog = async (blogId) => {
    try {
      console.log('Attempting to delete blog with ID:', blogId);
      const response = await api.delete(
        `/blog/delete/${blogId}`
      );
      
      console.log('Delete response:', response.data);
      
      if (response.status >= 200 && response.status < 300) {
        const updatedBlogs = blogs.filter(blog => blog._id !== blogId);
        setBlogs(updatedBlogs);
        setFilteredBlogs(updatedBlogs.filter(blog => 
          !searchQuery.trim() || 
          blog.blog_Title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          blog.author?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          blog.blog_Content?.toLowerCase().includes(searchQuery.toLowerCase())
        ));
        calculateAnalytics(updatedBlogs);
        setDeleteModalVisible(false);
        setSelectedBlog(null);
        
        // Show success message
        console.log('Blog deleted successfully');
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      
      let errorMessage = 'Failed to delete blog';
      if (error.response) {
        errorMessage = error.response.data?.message || `Server error: ${error.response.status}`;
      } else if (error.request) {
        errorMessage = 'Network error. Please check your connection.';
      }
      
      console.error(errorMessage);
    }
  };

  const getGrowthIcon = (value) => {
    return value > 0 ? <TrendingUp size={16} className="text-green-500" /> : <TrendingDown size={16} className="text-red-500" />;
  };

  const getPerformanceColor = (value, threshold = 50) => {
    if (value >= threshold * 1.5) return '#10B981'; // Excellent
    if (value >= threshold) return '#3B82F6'; // Good
    if (value >= threshold * 0.7) return '#F59E0B'; // Average
    return '#EF4444'; // Poor
  };

  // Advanced Analytics Functions
  const calculateTrendData = (blogData) => {
    const last7Days = blogData.filter(blog => {
      const blogDate = new Date(blog.createdAt);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return blogDate >= weekAgo;
    });

    const last30Days = blogData.filter(blog => {
      const blogDate = new Date(blog.createdAt);
      const monthAgo = new Date();
      monthAgo.setDate(monthAgo.getDate() - 30);
      return blogDate >= monthAgo;
    });

    return {
      weeklyGrowth: ((last7Days.length - (blogData.length - last7Days.length)) / (blogData.length - last7Days.length)) * 100,
      monthlyGrowth: ((last30Days.length - (blogData.length - last30Days.length)) / (blogData.length - last30Days.length)) * 100,
      trendData: [
        { date: 'Mon', views: Math.floor(Math.random() * 1000) + 500 },
        { date: 'Tue', views: Math.floor(Math.random() * 1000) + 500 },
        { date: 'Wed', views: Math.floor(Math.random() * 1000) + 500 },
        { date: 'Thu', views: Math.floor(Math.random() * 1000) + 500 },
        { date: 'Fri', views: Math.floor(Math.random() * 1000) + 500 },
        { date: 'Sat', views: Math.floor(Math.random() * 1000) + 500 },
        { date: 'Sun', views: Math.floor(Math.random() * 1000) + 500 }
      ]
    };
  };

  const generatePerformanceAlerts = (blogData) => {
    const alerts = [];
    blogData.forEach(blog => {
      if (blog.views < 10) {
        alerts.push({
          type: 'warning',
          message: `Low views for "${blog.blog_Title}"`,
          blogId: blog._id
        });
      }
      if (blog.likes === 0 && blog.isPublished) {
        alerts.push({
          type: 'error',
          message: `No engagement for "${blog.blog_Title}"`,
          blogId: blog._id
        });
      }
    });
    return alerts;
  };

  const generateRecentActivity = (blogData) => {
    return blogData
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5)
      .map(blog => ({
        id: blog._id,
        action: blog.isPublished ? 'Published' : 'Created',
        title: blog.blog_Title,
        time: new Date(blog.createdAt).toLocaleString(),
        author: blog.author
      }));
  };

  const handleBulkAction = async (action) => {
    if (selectedBlogs.length === 0) {
      console.warn('Please select blogs first');
      return;
    }

    try {
      switch (action) {
        case 'publish':
          await Promise.all(selectedBlogs.map(id => handlePublishToggle(true, id)));
          console.log(`${selectedBlogs.length} blogs published`);
          break;
        case 'unpublish':
          await Promise.all(selectedBlogs.map(id => handlePublishToggle(false, id)));
          console.log(`${selectedBlogs.length} blogs unpublished`);
          break;
        case 'delete':
          await Promise.all(selectedBlogs.map(id => handleDeleteBlog(id)));
          console.log(`${selectedBlogs.length} blogs deleted`);
          break;
      }
      setSelectedBlogs([]);
    } catch (error) {
      console.error('Bulk action failed');
    }
  };

  const exportDashboard = () => {
    const data = {
      analytics,
      blogs: filteredBlogs,
      timestamp: new Date().toISOString()
    };
    
    if (exportFormat === 'pdf') {
      // Mock PDF export
      console.log('PDF export started');
    } else {
      // Mock Excel export
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `blog-dashboard-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      console.log('Data exported successfully');
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  const columns = [
    {
      title: 'Blog Post',
      key: 'blog',
      width: 300,
      render: (_, record) => (
        <div className="flex items-center space-x-4">
          <div className="relative">
            {(() => {
              const img = record.blog_Image || {};
              const cdn = typeof img.cdn_url === 'string' && img.cdn_url.trim();
              const direct = typeof img.url === 'string' && img.url.trim();
              const src = cdn || direct || (typeof img === 'string' ? img : '');
              return src ? (
                <>
                  <img
                    src={src}
                    alt={record.blog_Title || "Blog Image"}
                    className="w-16 h-12 object-cover rounded-md shadow-sm border border-gray-200"
                    onError={(e) => {
                      console.log('Image failed to load:', src);
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div 
                    className="w-16 h-12 rounded-md border border-gray-200 bg-gray-100 flex items-center justify-center text-xs text-gray-500" 
                    style={{ display: 'none' }}
                  >
                    No Image
                  </div>
                </>
              ) : (
                <div className="w-16 h-12 rounded-md border border-gray-200 bg-gray-100" />
              );
            })()}
            {record.isPublished && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-gray-900 line-clamp-1 text-base">
              {record.blog_Title}
            </div>
            <div className="text-sm text-gray-600 flex items-center mt-1">
              <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center mr-2">
                <User size={8} className="text-white" />
              </div>
              {record.author}
              <span className="mx-2 text-gray-400">•</span>
              <Calendar size={14} className="mr-1 text-gray-400" />
              {record.createdAt ? new Date(record.createdAt).toLocaleDateString() : 'N/A'}
              {(record.type || 'blog').toLowerCase() === 'news' && (
                <span className="ml-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">News</span>
              )}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      width: 120,
      render: (_, record) => (
        <Tag color={record.isPublished ? 'success' : 'default'} className="font-medium">
          {record.isPublished ? 'Published' : 'Draft'}
        </Tag>
      ),
      filters: [
        { text: 'Published', value: true },
        { text: 'Draft', value: false },
      ],
      onFilter: (value, record) => record.isPublished === value,
    },
    {
      title: 'Performance',
      key: 'performance',
      width: 150,
      sorter: (a, b) => (a.views || 0) - (b.views || 0),
      render: (_, record) => {
        const performance = (record.views || 0) + (record.likes || 0) * 2 + (record.shares || 0) * 3;
        const color = getPerformanceColor(performance, 100);
        return (
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></div>
            <span className="font-semibold text-gray-800">{performance}</span>
          </div>
        );
      },
    },
    {
      title: 'Views',
      key: 'views',
      width: 100,
      sorter: (a, b) => (a.views || 0) - (b.views || 0),
      render: (_, record) => (
        <div className="flex items-center space-x-2">
          <Eye size={18} className="text-blue-500" />
          <span className="font-semibold text-gray-800">{record.views || 0}</span>
        </div>
      ),
    },
    {
      title: 'Engagement',
      key: 'engagement',
      width: 200,
      sorter: (a, b) => {
        const scoreA = (a.likes || 0) + (a.shares || 0) + (a.commentsCount || 0);
        const scoreB = (b.likes || 0) + (b.shares || 0) + (b.commentsCount || 0);
        return scoreA - scoreB;
      },
      render: (_, record) => (
        <div className="flex items-center space-x-3">
          <Tooltip title={`${record.likes || 0} Likes`}>
            <div className="flex items-center space-x-1 text-green-600">
              <ThumbsUp size={16} />
              <span className="text-sm font-medium">{record.likes || 0}</span>
            </div>
          </Tooltip>
          <Tooltip title={`${record.shares || 0} Shares`}>
            <div className="flex items-center space-x-1 text-purple-600">
              <Share2 size={16} />
              <span className="text-sm font-medium">{record.shares || 0}</span>
            </div>
          </Tooltip>
          <Tooltip title={`${record.commentsCount || 0} Comments`}>
            <div className="flex items-center space-x-1 text-red-600">
              <MessageCircle size={16} />
              <span className="text-sm font-medium">{record.commentsCount || 0}</span>
            </div>
          </Tooltip>
        </div>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 220,
      fixed: 'right',
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="View Blog">
            <Button
              type="text"
              icon={<Eye size={18} />}
              onClick={() => history(blogLink(record))}
              className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-full"
            />
          </Tooltip>

          <Tooltip title="Edit Blog">
            <Button
              type="text"
              icon={<Edit size={18} />}
              className="text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-full"
              onClick={(e) => {
                if (!isOwnedByMe(record)) {
                  e.preventDefault();
                  console.warn('For edit, contact admin');
                  return;
                }
                history(`/seo/blogs/edit/${record._id}`);
              }}
            />
          </Tooltip>
          <Tooltip title={record.isPublished ? "Click to Unpublish" : "Click to Publish"}>
  <div className="flex items-center gap-2">
    <div
      className={`relative flex items-center cursor-pointer select-none transition-all duration-300 
        ${isOwnedByMe(record) ? 'opacity-100' : 'opacity-60 cursor-not-allowed'}
      `}
      onClick={() => {
        if (!isOwnedByMe(record)) {
          console.warn('For publish/unpublish, contact admin');
          return;
        }
        setSelectedBlog(record);
        handlePublishToggle(!record.isPublished, record._id);
      }}
    >
      {/* Smooth Toggle Base */}
      <div
        className={`w-11 h-6 rounded-full transition-colors duration-300 ease-in-out 
          ${record.isPublished ? 'bg-green-500 shadow-md shadow-green-300/40' : 'bg-gray-300'}
        `}
      />
      {/* Toggle Circle */}
      <div
        className={`absolute left-0 top-0 w-6 h-6 bg-white rounded-full shadow-sm transform transition-transform duration-300
          ${record.isPublished ? 'translate-x-5' : 'translate-x-0'}
        `}
      />
    </div>

    {/* Label */}
    <span
      className={`text-xs font-medium transition-all duration-300 ${
        record.isPublished ? 'text-green-600' : 'text-gray-500'
      }`}
    >
      {record.isPublished ? 'Published' : 'Draft'}
    </span>
  </div>
</Tooltip>

          <Tooltip title="Delete Blog">
            <Button
              type="text"
              danger
              icon={<Trash2 size={18} />}
              onClick={() => {
                // Always block deletion: require contacting admin
                console.warn('For delete, contact admin');
                return;
              }}
              className="hover:bg-red-50 rounded-full"
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-2 sm:p-3 lg:p-4">
      <div className="w-full max-w-7xl mx-auto">
        {/* Professional Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 sm:p-4 mb-2 border border-gray-100 dark:border-gray-700 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
    <div className="space-y-1">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-md flex items-center justify-center">
          <BarChart3 size={16} className="text-white" />
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-bold mb-0 bg-gradient-to-r from-gray-800 via-blue-600 to-indigo-600 dark:from-gray-100 dark:via-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
            Blog Analytics
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
            Professional insights overview
          </p>
        </div>
      </div>
    </div>
    <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0">
      <select
        value={timeRange}
        onChange={(e) => setTimeRange(e.target.value)}
        className="text-xs sm:text-sm px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="7d">7d</option>
        <option value="30d">30d</option>
        <option value="90d">90d</option>
        <option value="1y">1y</option>
      </select>
      <Link to="/seo/blogs/write" className="flex-1 sm:flex-none">
        <button className="flex items-center justify-center space-x-1 sm:space-x-2 w-full sm:w-auto text-xs sm:text-sm px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-md shadow hover:shadow-md transition-all duration-200">
          <Plus size={14} />
          <span>New Blog</span>
        </button>
      </Link>
      <Link to="/seo/blogs/manage" className="flex-1 sm:flex-none">
        <button className="flex items-center justify-center space-x-1 sm:space-x-2 w-full sm:w-auto text-xs sm:text-sm px-3 py-1.5 border border-gray-300 text-gray-700 rounded-md hover:border-blue-500 hover:text-blue-500 transition-all duration-200">
          <FileText size={14} />
          <span>Manage</span>
        </button>
      </Link>
    </div>
  </div>
</div>

        {/* Enhanced Blog Statistics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mb-3">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-700 shadow-sm rounded-lg p-2 hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-0">Blog Statistics</h3>
              <div className="w-6 h-6 bg-blue-100 dark:bg-blue-800 rounded-md flex items-center justify-center">
                <PieChart size={14} className="text-blue-600 dark:text-blue-300" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-1">
              <div className="text-center p-1.5 bg-white dark:bg-gray-700 rounded-md shadow-sm">
                <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{analytics.totalBlogs}</div>
                <span className="text-gray-600 dark:text-gray-300 text-xs">Total</span>
              </div>
              <div className="text-center p-1.5 bg-white dark:bg-gray-700 rounded-md shadow-sm">
                <div className="text-lg font-bold text-green-600 dark:text-green-400">{analytics.publishedBlogs}</div>
                <span className="text-gray-600 dark:text-gray-300 text-xs">Published</span>
              </div>
              <div className="text-center p-1.5 bg-white dark:bg-gray-700 rounded-md shadow-sm">
                <div className="text-lg font-bold text-orange-600 dark:text-orange-400">{analytics.draftBlogs}</div>
                <span className="text-gray-600 dark:text-gray-300 text-xs">Drafts</span>
              </div>
            </div>
            <div className="border-t border-gray-200 my-2"></div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-xs text-gray-600 dark:text-gray-300">Published ({Math.round((analytics.publishedBlogs / analytics.totalBlogs) * 100)}%)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-xs text-gray-600 dark:text-gray-300">Drafts ({Math.round((analytics.draftBlogs / analytics.totalBlogs) * 100)}%)</span>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-700 shadow-sm rounded-lg p-2 hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-green-800 dark:text-green-200 mb-0">Performance Metrics</h3>
              <div className="w-6 h-6 bg-green-100 dark:bg-green-800 rounded-md flex items-center justify-center">
                <ActivityIcon size={14} className="text-green-600 dark:text-green-300" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-1.5 bg-white dark:bg-gray-700 rounded-md shadow-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-xs text-gray-600 dark:text-gray-300">Bounce Rate</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="font-semibold text-xs text-gray-700 dark:text-gray-200">{analytics.bounceRate}%</span>
                  <TrendingDown size={12} className="text-red-500" />
                </div>
              </div>
              <div className="flex items-center justify-between p-1.5 bg-white dark:bg-gray-700 rounded-md shadow-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-gray-600 dark:text-gray-300">Avg. Time</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="font-semibold text-xs text-gray-700 dark:text-gray-200">{analytics.avgTimeOnPage}m</span>
                  <TrendingUp size={12} className="text-green-500" />
                </div>
              </div>
              <div className="flex items-center justify-between p-1.5 bg-white dark:bg-gray-700 rounded-md shadow-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-xs text-gray-600 dark:text-gray-300">Engagement</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="font-semibold text-xs text-gray-700 dark:text-gray-200">{analytics.engagementRate}%</span>
                  <TrendingUp size={12} className="text-green-500" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Performing Blog */}
        {analytics.topPerformingBlog && (
          <div className="bg-white border border-gray-100 shadow-md rounded-lg mb-2 p-2">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Award size={16} className="text-yellow-500" />
                <h3 className="text-xs font-medium mb-0">Top Performing Blog</h3>
              </div>
              <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Best Performer</span>
            </div>
            <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-3 lg:space-y-0 lg:space-x-4">
               <div className="relative">
                 {(() => {
                   const img = analytics.topPerformingBlog.blog_Image || {};
                   const cdn = typeof img.cdn_url === 'string' && img.cdn_url.trim();
                   const direct = typeof img.url === 'string' && img.url.trim();
                   const src = cdn || direct || (typeof img === 'string' ? img : '');
                   return src ? (
                     <img
                       src={src}
                       alt={analytics.topPerformingBlog.blog_Title || "Top Blog Image"}
                       className="w-24 h-18 object-cover rounded-lg shadow-md border border-gray-200 flex-shrink-0"
                     />
                   ) : (
                     <div className="w-24 h-18 rounded-lg border border-gray-200 bg-gray-100 flex-shrink-0" />
                   );
                 })()}
                 <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
                   <Award size={10} className="text-white" />
                 </div>
               </div>
              <div className="flex-1 text-center lg:text-left">
                <Link to={`/blog/${analytics.topPerformingBlog.blog_Title?.replace(/\s+/g, '-').replace(/[?!,\.;:\{\}\(\)\$\@]+/g, '')}/${analytics.topPerformingBlog._id}`}>
                  <h3 className="text-sm font-semibold mb-1 hover:text-blue-600 transition-colors duration-200 cursor-pointer">
                    {analytics.topPerformingBlog.blog_Title}
                  </h3>
                </Link>
                <div className="flex items-center justify-center lg:justify-start space-x-3 mb-2">
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
                      <User size={8} className="text-white" />
                    </div>
                    <span className="text-xs font-medium">{analytics.topPerformingBlog.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar size={12} className="text-gray-400" />
                    <span className="text-xs text-gray-600">{new Date(analytics.topPerformingBlog.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">{analytics.topPerformingBlog.views || 0}</div>
                    <span className="text-xs text-gray-600">Views</span>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">{analytics.topPerformingBlog.likes || 0}</div>
                    <span className="text-xs text-gray-600">Likes</span>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-600">{analytics.topPerformingBlog.shares || 0}</div>
                    <span className="text-xs text-gray-600">Shares</span>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-red-600">{analytics.topPerformingBlog.comments || 0}</div>
                    <span className="text-xs text-gray-600">Comments</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Professional Blogs Table */}
        <div className="bg-white border border-gray-100 shadow-md rounded-lg p-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
            <div className="flex items-center space-x-2">
              <FileText size={20} className="text-blue-500" />
              <h3 className="text-sm font-medium mb-0">All Blog Posts</h3>
            </div>
            <div className="text-sm text-gray-600 font-medium">
              Showing {filteredBlogs.length} of {blogs.length} posts
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-4">
            <div className="relative max-w-lg">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search blogs by title, author, email, content, category, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <X size={16} className="text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>
            {searchQuery && (
              <div className="mt-2 text-sm text-gray-600">
                Found {filteredBlogs.length} blog(s) matching "{searchQuery}"
              </div>
            )}
          </div>

          {/* Blog Table */}
          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            ) : filteredBlogs.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-gray-500">
                  {searchQuery ? `No blogs found matching "${searchQuery}"` : "No blog posts found"}
                </div>
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blog Post</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Engagement</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredBlogs.map((blog) => (
                    <tr key={blog._id} className="hover:bg-gray-50">
                      {/* Blog Post Column */}
                      <td className="px-3 py-2 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="relative mr-3">
                            {(() => {
                              const img = blog.blog_Image || {};
                              const cdn = typeof img.cdn_url === 'string' && img.cdn_url.trim();
                              const direct = typeof img.url === 'string' && img.url.trim();
                              const src = cdn || direct || (typeof img === 'string' ? img : '');
                              return src ? (
                                <img
                                  src={src}
                                  alt={blog.blog_Title || "Blog Image"}
                                  className="w-12 h-8 object-cover rounded border border-gray-200"
                                />
                              ) : (
                                <div className="w-12 h-8 rounded border border-gray-200 bg-gray-100" />
                              );
                            })()}
                            {blog.isPublished && (
                              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></div>
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div 
                              className="text-sm font-medium text-gray-900 cursor-pointer"
                              title={blog.blog_Title}
                            >
                              {blog.blog_Title && blog.blog_Title.length > 25 
                                ? `${blog.blog_Title.substring(0, 25)}...` 
                                : blog.blog_Title
                              }
                            </div>
                            <div className="text-xs text-gray-500 flex items-center mt-1">
                              <div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center mr-1">
                                <User size={6} className="text-white" />
                              </div>
                              {blog.author} • {new Date(blog.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </td>
                      
                      {/* Status Column */}
                      <td className="px-3 py-2 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          blog.isPublished 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {blog.isPublished ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      
                      {/* Performance Column */}
                      <td className="px-3 py-2 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`w-2 h-2 rounded-full mr-2 ${
                            (blog.views || 0) > 100 ? 'bg-green-500' : 
                            (blog.views || 0) > 50 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}></div>
                          <span className="text-xs font-medium">
                            {(blog.views || 0) > 100 ? 'High' : 
                             (blog.views || 0) > 50 ? 'Medium' : 'Low'}
                          </span>
                        </div>
                      </td>
                      
                      {/* Views Column */}
                      <td className="px-3 py-2 whitespace-nowrap">
                        <div className="flex items-center text-sm">
                          <Eye size={12} className="mr-1 text-gray-400" />
                          <span>{blog.views || 0}</span>
                        </div>
                      </td>
                      
                      {/* Engagement Column */}
                      <td className="px-3 py-2 whitespace-nowrap">
                        <div className="flex items-center space-x-2 text-xs">
                          <div className="flex items-center text-green-600">
                            <ThumbsUp size={10} className="mr-1" />
                            <span>{blog.likes || 0}</span>
                          </div>
                          <div className="flex items-center text-purple-600">
                            <Share2 size={10} className="mr-1" />
                            <span>{blog.shares || 0}</span>
                          </div>
                          <div className="flex items-center text-red-600">
                            <MessageCircle size={10} className="mr-1" />
                            <span>{blog.commentsCount || 0}</span>
                          </div>
                        </div>
                      </td>
                      
                      {/* Actions Column */}
                      <td className="px-3 py-2 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center space-x-1">
                          <Link 
                            to={blogLink(blog)}
                            className="text-blue-600 hover:text-blue-800 p-1 rounded"
                            title="View Blog"
                          >
                            <Eye size={14} />
                          </Link>
                          <Link 
                            to={`/seo/blogs/write?edit=${blog._id}`}
                            className="text-green-600 hover:text-green-800 p-1 rounded"
                            title="Edit Blog"
                          >
                            <Edit size={14} />
                          </Link>
                          <div className="relative">
                            <div
                              className={`w-8 h-4 rounded-full transition-colors duration-300 cursor-pointer ${
                                blog.isPublished ? 'bg-green-500' : 'bg-gray-300'
                              }`}
                              onClick={() => {
                                setSelectedBlog(blog);
                                handlePublishToggle(!blog.isPublished, blog._id);
                              }}
                              title={blog.isPublished ? "Click to Unpublish" : "Click to Publish"}
                            >
                              <div
                                className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-300 ${
                                  blog.isPublished ? 'translate-x-4' : 'translate-x-0'
                                }`}
                              ></div>
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              setSelectedBlog(blog);
                              setDeleteModalVisible(true);
                            }}
                            className="text-red-600 hover:text-red-800 p-1 rounded"
                            title="Delete Blog"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            
            {/* Pagination */}
            {filteredBlogs.length > 10 && (
              <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200">
                <div className="flex items-center text-sm text-gray-700">
                  <span>Showing 1-{Math.min(10, filteredBlogs.length)} of {filteredBlogs.length} results</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                    Previous
                  </button>
                  <span className="px-3 py-1 text-sm bg-blue-500 text-white rounded">1</span>
                  <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Professional Delete Modal */}
        {deleteModalVisible && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
              onClick={() => {
                setDeleteModalVisible(false);
                setSelectedBlog(null);
              }}
            ></div>
            
            {/* Modal Content */}
            <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6 z-10">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-red-600 flex items-center text-lg font-semibold">
                  <Trash2 size={24} className="mr-2"/>
                  Confirm Deletion
                </span>
                <button
                  onClick={() => {
                    setDeleteModalVisible(false);
                    setSelectedBlog(null);
                  }}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {/* Content */}
              <div className="py-4 text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trash2 size={32} className="text-red-600" />
                </div>
                <h4 className="text-lg font-semibold mb-2">
                  Are you absolutely sure?
                </h4>
                <p className="text-base text-gray-600">
                  This action will permanently delete the blog post titled "
                  <span className="font-bold text-red-700">{selectedBlog?.blog_Title}</span>
                  ". This action cannot be undone.
                </p>
              </div>
              
              {/* Footer */}
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => {
                    setDeleteModalVisible(false);
                    setSelectedBlog(null);
                  }}
                  className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    console.log('Delete modal confirmed for blog:', selectedBlog?._id);
                    handleDeleteBlog(selectedBlog?._id);
                  }}
                  className="px-6 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
                >
                  Delete Blog
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}