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
  Download
} from "lucide-react";
import { 
  Card, 
  Statistic, 
  Progress, 
  Badge, 
  Table, 
  Button, 
  Input, 
  Select,
  Modal,
  Switch,
  Tooltip,
  Row,
  Col,
  Spin,
  Avatar,
  Tag,
  Divider,
  Space,
  Typography,
  Alert,
  Empty,
  Skeleton,
  Tabs,
  Timeline,
  notification,
  Drawer,
  Form,
  DatePicker,
  Checkbox,
  Radio,
  Slider,
  Rate,
  Upload,
  message,
  Popconfirm,
  Dropdown,
  Menu,
  Breadcrumb,
  Steps,
  Result,
  Descriptions,
  List,
  Tree,
  Transfer,
  Cascader,
  AutoComplete,
  Mentions,
  InputNumber,
  Switch as AntSwitch,
  Slider as AntSlider,
  Rate as AntRate,
  Upload as AntUpload,
  message as AntMessage,
  Popconfirm as AntPopconfirm,
  Dropdown as AntDropdown,
  Menu as AntMenu,
  Breadcrumb as AntBreadcrumb,
  Steps as AntSteps,
  Result as AntResult,
  Descriptions as AntDescriptions,
  List as AntList,
  Tree as AntTree,
  Transfer as AntTransfer,
  Cascader as AntCascader,
  AutoComplete as AntAutoComplete,
  Mentions as AntMentions,
  InputNumber as AntInputNumber
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import { BlogPaginationControls } from "./BlogManagement";
import { AuthContext } from "../../AuthContext";

const { Option } = Select;
const { Title, Text, Paragraph } = Typography;

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
  const [loading, setLoading] = useState(true);
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
    category: 'all'
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

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    fetchDashboardData();
  }, [timeRange, currentPage, pageSize, currentUserName, currentUserEmail, currentUserId, isAdmin]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const res = await api.get(`blog/view?page=${currentPage}&limit=${pageSize}`);
      const fetchedBlogs = res.data.data || [];
      // Scope: if not Admin, show only my blogs
      const myBlogs = (isAdmin ? fetchedBlogs : fetchedBlogs.filter((b) => {
        const authorName = (b?.author || "").toString().trim();
        const authorEmail = (b?.authorEmail || "").toString().trim().toLowerCase();
        const authorId = (b?.authorId || b?.userId || b?.postedBy || "").toString();
        const nameMatch = currentUserName && authorName && authorName.toLowerCase() === currentUserName.toLowerCase();
        const emailMatch = currentUserEmail && authorEmail && authorEmail === currentUserEmail;
        const idMatch = currentUserId && authorId && authorId === currentUserId;
        return nameMatch || emailMatch || idMatch;
      }));
      
      // Debug: Log the first blog to see the image structure
      if (fetchedBlogs.length > 0) {
        console.log('First blog data:', fetchedBlogs[0]);
        console.log('Blog image structure:', fetchedBlogs[0].blog_Image);
      }
      
      setBlogs(myBlogs);
      setTotalPages(res.data.totalPages || 1);
      calculateAnalytics(myBlogs);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
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
    const totalViews = blogData.reduce((sum, blog) => sum + (blog.views || 0), 0);
    const totalLikes = blogData.reduce((sum, blog) => sum + (blog.likes || 0), 0);
    const totalShares = blogData.reduce((sum, blog) => sum + (blog.shares || 0), 0);
    const totalComments = blogData.reduce((sum, blog) => sum + (blog.comments || 0), 0);
    
    const publishedBlogs = blogData.filter(blog => blog.isPublished);
    const draftBlogs = blogData.filter(blog => !blog.isPublished);
    const averageViews = publishedBlogs.length > 0 ? totalViews / publishedBlogs.length : 0;
    
    const topPerformingBlog = blogData.reduce((top, blog) => {
      const blogScore = (blog.views || 0) + (blog.likes || 0) * 2 + (blog.shares || 0) * 3 + (blog.comments || 0) * 1;
      const topScore = (top?.views || 0) + (top?.likes || 0) * 2 + (top?.shares || 0) * 3 + (top?.comments || 0) * 1;
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
      const res = await api.patch(
        `blog/update/${blogId}`,
        { isPublished: checked }
      );
      if (res.status >= 200 && res.status < 300) {
        const updatedBlogs = blogs.map(blog =>
          blog._id === blogId ? { ...blog, isPublished: checked } : blog
        );
        setBlogs(updatedBlogs);
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
        `blog/delete/${blogId}`
      );
      
      console.log('Delete response:', response.data);
      
      if (response.status >= 200 && response.status < 300) {
        const updatedBlogs = blogs.filter(blog => blog._id !== blogId);
        setBlogs(updatedBlogs);
        calculateAnalytics(updatedBlogs);
        setDeleteModalVisible(false);
        setSelectedBlog(null);
        
        // Show success message
        message.success('Blog deleted successfully');
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      
      let errorMessage = 'Failed to delete blog';
      if (error.response) {
        errorMessage = error.response.data?.message || `Server error: ${error.response.status}`;
      } else if (error.request) {
        errorMessage = 'Network error. Please check your connection.';
      }
      
      message.error(errorMessage);
    }
  };

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.blog_Title?.toLowerCase().includes(filters.search.toLowerCase()) ||
                         blog.author?.toLowerCase().includes(filters.search.toLowerCase());
    const matchesStatus = filters.status === 'all' || 
                         (filters.status === 'published' && blog.isPublished) ||
                         (filters.status === 'draft' && !blog.isPublished);
    
    return matchesSearch && matchesStatus;
  });

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
      message.warning('Please select blogs first');
      return;
    }

    try {
      switch (action) {
        case 'publish':
          await Promise.all(selectedBlogs.map(id => handlePublishToggle(true, id)));
          message.success(`${selectedBlogs.length} blogs published`);
          break;
        case 'unpublish':
          await Promise.all(selectedBlogs.map(id => handlePublishToggle(false, id)));
          message.success(`${selectedBlogs.length} blogs unpublished`);
          break;
        case 'delete':
          await Promise.all(selectedBlogs.map(id => handleDeleteBlog(id)));
          message.success(`${selectedBlogs.length} blogs deleted`);
          break;
      }
      setSelectedBlogs([]);
    } catch (error) {
      message.error('Bulk action failed');
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
      message.success('PDF export started');
    } else {
      // Mock Excel export
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `blog-dashboard-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      message.success('Data exported successfully');
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
            <img
              src={
                record.blog_Image?.url && typeof record.blog_Image.url === 'string' && !record.blog_Image.url.includes('via.placeholder.com') 
                  ? record.blog_Image.url 
                  : record.blog_Image && typeof record.blog_Image === 'string' && !record.blog_Image.includes('via.placeholder.com')
                  ? record.blog_Image
                  : "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='60' viewBox='0 0 80 60'%3E%3Crect width='80' height='60' fill='%23f3f4f6'/%3E%3Ctext x='40' y='35' font-family='Arial' font-size='10' text-anchor='middle' fill='%236b7280'%3EBlog Image%3C/text%3E%3C/svg%3E"
              }
              alt={record.blog_Title || "Blog Image"}
              className="w-20 h-15 object-cover rounded-lg shadow-sm border border-gray-200"
              onError={(e) => {
                console.log('Image failed to load for blog:', record._id, 'URL:', record.blog_Image?.url);
                e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='60' viewBox='0 0 80 60'%3E%3Crect width='80' height='60' fill='%23f3f4f6'/%3E%3Ctext x='40' y='35' font-family='Arial' font-size='10' text-anchor='middle' fill='%236b7280'%3EBlog Image%3C/text%3E%3C/svg%3E";
              }}
              onLoad={() => {
                console.log('Image loaded successfully for blog:', record._id, 'URL:', record.blog_Image?.url);
              }}
            />
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
              <Avatar size={16} className="mr-2">
                <User size={10} />
              </Avatar>
              {record.author}
              <span className="mx-2 text-gray-400">•</span>
              <Calendar size={14} className="mr-1 text-gray-400" />
              {record.createdAt ? new Date(record.createdAt).toLocaleDateString() : 'N/A'}
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
        const scoreA = (a.likes || 0) + (a.shares || 0) + (a.comments || 0);
        const scoreB = (b.likes || 0) + (b.shares || 0) + (b.comments || 0);
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
          <Tooltip title={`${record.comments || 0} Comments`}>
            <div className="flex items-center space-x-1 text-red-600">
              <MessageCircle size={16} />
              <span className="text-sm font-medium">{record.comments || 0}</span>
            </div>
          </Tooltip>
        </div>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 180,
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
                  message.warning('For edit, contact admin');
                  return;
                }
                history(`/seo/blogs/edit/${record._id}`);
              }}
            />
          </Tooltip>
          <Tooltip title={record.isPublished ? "Unpublish Blog" : "Publish Blog"}>
            <Switch
              checked={record.isPublished}
              loading={publishLoading && selectedBlog?._id === record._id}
              onChange={(checked) => {
                if (!isOwnedByMe(record)) {
                  message.warning('For publish, contact admin');
                  return;
                }
                setSelectedBlog(record);
                handlePublishToggle(checked, record._id);
              }}
              size="small"
              className="ml-2"
            />
          </Tooltip>
          <Tooltip title="Delete Blog">
            <Button
              type="text"
              danger
              icon={<Trash2 size={18} />}
              onClick={() => {
                // Always block deletion: require contacting admin
                message.warning('For delete, contact admin');
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-3 sm:p-4 lg:p-6">
      <div className="w-full mx-auto">
        {/* Professional Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 mb-2 border border-gray-100 dark:border-gray-700 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                  <BarChart3 size={24} className="text-white" />
                </div>
                <div>
                  <Title level={2} className="!mb-0 bg-gradient-to-r from-gray-800 via-blue-600 to-indigo-600 dark:from-gray-100 dark:via-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                    Blog Analytics Dashboard
                  </Title>
                  <Text className="text-gray-600 dark:text-gray-300 text-lg">
                    Professional insights and management overview
                  </Text>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Select
                value={timeRange}
                onChange={setTimeRange}
                size="large"
                style={{ width: 120 }}
                className="rounded-lg"
              >
                <Option value="7d">Last 7 days</Option>
                <Option value="30d">Last 30 days</Option>
                <Option value="90d">Last 90 days</Option>
                <Option value="1y">Last year</Option>
              </Select>
              <Link to="/seo/blogs/write">
                <Button
                  type="primary"
                  size="large"
                  icon={<Plus size={20} />}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  Create New Blog
                </Button>
              </Link>
              <Link to="/seo/blogs/manage">
                <Button
                  size="large"
                  icon={<FileText size={20} />}
                  className="border-gray-300 hover:border-blue-500 hover:text-blue-500 transition-all duration-300 transform hover:-translate-y-1"
                >
                  Manage Blogs
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Enhanced Blog Statistics */}
        <Row gutter={[12, 12]} className="mb-4">
          <Col xs={24} lg={12}>
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-700 shadow-md rounded-xl p-3 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <Title level={5} className="!mb-0 text-blue-800 dark:text-blue-200">Blog Statistics</Title>
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-800 rounded-lg flex items-center justify-center">
                  <PieChart size={18} className="text-blue-600 dark:text-blue-300" />
                </div>
              </div>
              <Row gutter={[8, 8]}>
                <Col span={8}>
                  <div className="text-center p-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                    <div className="text-xl font-bold text-blue-600 dark:text-blue-400">{analytics.totalBlogs}</div>
                    <Text className="text-gray-600 dark:text-gray-300 text-xs">Total</Text>
                  </div>
                </Col>
                <Col span={8}>
                  <div className="text-center p-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                    <div className="text-xl font-bold text-green-600 dark:text-green-400">{analytics.publishedBlogs}</div>
                    <Text className="text-gray-600 dark:text-gray-300 text-xs">Published</Text>
                  </div>
                </Col>
                <Col span={8}>
                  <div className="text-center p-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                    <div className="text-xl font-bold text-orange-600 dark:text-orange-400">{analytics.draftBlogs}</div>
                    <Text className="text-gray-600 dark:text-gray-300 text-xs">Drafts</Text>
                  </div>
                </Col>
              </Row>
              <Divider className="my-2" />
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <Text className="text-xs text-gray-600 dark:text-gray-300">Published ({Math.round((analytics.publishedBlogs / analytics.totalBlogs) * 100)}%)</Text>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <Text className="text-xs text-gray-600 dark:text-gray-300">Drafts ({Math.round((analytics.draftBlogs / analytics.totalBlogs) * 100)}%)</Text>
                </div>
              </div>
            </Card>
          </Col>
          <Col xs={24} lg={12}>
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-700 shadow-md rounded-xl p-3 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <Title level={5} className="!mb-0 text-green-800 dark:text-green-200">Performance Metrics</Title>
                <div className="w-8 h-8 bg-green-100 dark:bg-green-800 rounded-lg flex items-center justify-center">
                  <ActivityIcon size={18} className="text-green-600 dark:text-green-300" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <Text className="text-xs text-gray-600 dark:text-gray-300">Bounce Rate</Text>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Text className="font-semibold text-xs text-gray-700 dark:text-gray-200">{analytics.bounceRate}%</Text>
                    <TrendingDown size={12} className="text-red-500" />
                  </div>
                </div>
                <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <Text className="text-xs text-gray-600 dark:text-gray-300">Avg. Time</Text>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Text className="font-semibold text-xs text-gray-700 dark:text-gray-200">{analytics.avgTimeOnPage}m</Text>
                    <TrendingUp size={12} className="text-green-500" />
                  </div>
                </div>
                <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <Text className="text-xs text-gray-600 dark:text-gray-300">Engagement</Text>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Text className="font-semibold text-xs text-gray-700 dark:text-gray-200">{analytics.engagementRate}%</Text>
                    <TrendingUp size={12} className="text-green-500" />
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        </Row>

        {/* Top Performing Blog */}
        {analytics.topPerformingBlog && (
          <Card className="bg-white border border-gray-100 shadow-lg rounded-lg mb-6 p-4">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Award size={28} className="text-yellow-500 animate-pulse" />
                <Title level={4} className="!mb-0">Top Performing Blog</Title>
              </div>
              <Tag color="gold" className="font-medium">Best Performer</Tag>
            </div>
                         <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
               <div className="relative">
                 <img
                   src={
                     analytics.topPerformingBlog.blog_Image?.url && typeof analytics.topPerformingBlog.blog_Image.url === 'string' && !analytics.topPerformingBlog.blog_Image.url.includes('via.placeholder.com')
                       ? analytics.topPerformingBlog.blog_Image.url
                       : analytics.topPerformingBlog.blog_Image && typeof analytics.topPerformingBlog.blog_Image === 'string' && !analytics.topPerformingBlog.blog_Image.includes('via.placeholder.com')
                       ? analytics.topPerformingBlog.blog_Image
                       : "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='120' viewBox='0 0 160 120'%3E%3Crect width='160' height='120' fill='%23f3f4f6'/%3E%3Ctext x='80' y='70' font-family='Arial' font-size='12' text-anchor='middle' fill='%236b7280'%3ETop Blog%3C/text%3E%3C/svg%3E"
                   }
                   alt={analytics.topPerformingBlog.blog_Title || "Top Blog Image"}
                   className="w-40 h-30 object-cover rounded-xl shadow-lg border border-gray-200 flex-shrink-0"
                   onError={(e) => {
                     console.log('Top blog image failed to load:', analytics.topPerformingBlog._id, 'URL:', analytics.topPerformingBlog.blog_Image?.url);
                     e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='120' viewBox='0 0 160 120'%3E%3Crect width='160' height='120' fill='%23f3f4f6'/%3E%3Ctext x='80' y='70' font-family='Arial' font-size='12' text-anchor='middle' fill='%236b7280'%3ETop Blog%3C/text%3E%3C/svg%3E";
                   }}
                   onLoad={() => {
                     console.log('Top blog image loaded successfully:', analytics.topPerformingBlog._id, 'URL:', analytics.topPerformingBlog.blog_Image?.url);
                   }}
                 />
                 <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                   <Award size={16} className="text-white" />
                 </div>
               </div>
              <div className="flex-1 text-center lg:text-left">
                <Link to={`/blog/${analytics.topPerformingBlog.blog_Title?.replace(/\s+/g, '-').replace(/[?!,\.;:\{\}\(\)\$\@]+/g, '')}/${analytics.topPerformingBlog._id}`}>
                  <Title level={3} className="!mb-2 hover:text-blue-600 transition-colors duration-200 cursor-pointer">
                    {analytics.topPerformingBlog.blog_Title}
                  </Title>
                </Link>
                <div className="flex items-center justify-center lg:justify-start space-x-4 mb-4">
                  <div className="flex items-center space-x-1">
                    <Avatar size={20} className="bg-blue-500">
                      <User size={12} />
                    </Avatar>
                    <Text className="font-medium">{analytics.topPerformingBlog.author}</Text>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar size={16} className="text-gray-400" />
                    <Text className="text-gray-600">{new Date(analytics.topPerformingBlog.createdAt).toLocaleDateString()}</Text>
                  </div>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{analytics.topPerformingBlog.views || 0}</div>
                    <Text className="text-gray-600">Views</Text>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{analytics.topPerformingBlog.likes || 0}</div>
                    <Text className="text-gray-600">Likes</Text>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{analytics.topPerformingBlog.shares || 0}</div>
                    <Text className="text-gray-600">Shares</Text>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">{analytics.topPerformingBlog.comments || 0}</div>
                    <Text className="text-gray-600">Comments</Text>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Professional Filters and Search */}
        <Card className="bg-white border border-gray-100 shadow-lg rounded-lg mb-4 p-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1 w-full">
              <Input
                placeholder="Search blogs by title or author..."
                prefix={<Search size={18} className="text-gray-400" />}
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                size="large"
                className="rounded-lg"
              />
            </div>
            <Select
              value={filters.status}
              onChange={(value) => setFilters({ ...filters, status: value })}
              size="large"
              style={{ minWidth: 150 }}
              className="rounded-lg"
            >
              <Option value="all">
                <Filter size={14} className="inline-block mr-2 align-text-bottom" />
                All Status
              </Option>
              <Option value="published">
                <Badge status="success" className="mr-2" />
                Published
              </Option>
              <Option value="draft">
                <Badge status="default" className="mr-2" />
                Draft
              </Option>
            </Select>
            <Select
              value={filters.dateRange}
              onChange={(value) => setFilters({ ...filters, dateRange: value })}
              size="large"
              style={{ minWidth: 150 }}
              className="rounded-lg"
              disabled
            >
              <Option value="all">
                <Calendar size={14} className="inline-block mr-2 align-text-bottom" />
                All Time
              </Option>
              <Option value="week">This Week</Option>
              <Option value="month">This Month</Option>
              <Option value="year">This Year</Option>
            </Select>
          </div>
        </Card>

        {/* Professional Blogs Table */}
        <Card className="bg-white border border-gray-100 shadow-lg rounded-lg p-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <FileText size={24} className="text-blue-500" />
              <Title level={4} className="!mb-0">All Blog Posts</Title>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-base text-gray-600 font-medium">
                Showing {filteredBlogs.length} of {blogs.length} posts
              </div>
              <Tag color="blue" className="font-medium">
                {analytics.publishedBlogs} Published
              </Tag>
              <Tag color="orange" className="font-medium">
                {analytics.draftBlogs} Drafts
              </Tag>
            </div>
          </div>
          
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <Skeleton key={i} active paragraph={{ rows: 1 }} />
              ))}
            </div>
          ) : filteredBlogs.length === 0 ? (
            <Empty
              description={
                <div className="text-center">
                  <Text className="text-gray-500">No blogs found</Text>
                  <br />
                  <Text className="text-gray-400">
                    {filters.search ? "No blogs match your search criteria." : "Start by creating your first blog post."}
                  </Text>
                </div>
              }
            >
              <Link to="/seo/blogs/write">
                <Button type="primary" icon={<Plus size={16} />}>
                  Create Your First Blog
                </Button>
              </Link>
            </Empty>
          ) : (
            <>
              <Table
                columns={columns}
                dataSource={filteredBlogs}
                loading={loading}
                pagination={false}
                rowKey="_id"
                className="professional-table"
                scroll={{ x: 'max-content' }}
                rowClassName={(record, index) => 
                  index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                }
              />
              
              {/* Custom Pagination */}
              {totalPages > 1 && (
                <div className="mt-6 flex justify-center">
                  <BlogPaginationControls
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={totalPages}
                  />
                </div>
              )}
            </>
          )}
        </Card>

        {/* Professional Delete Modal */}
        <Modal
          title={
            <span className="text-red-600 flex items-center">
              <Trash2 size={24} className="mr-2"/>
              Confirm Deletion
            </span>
          }
          open={deleteModalVisible}
          onOk={() => {
            console.log('Delete modal confirmed for blog:', selectedBlog?._id);
            handleDeleteBlog(selectedBlog?._id);
          }}
          onCancel={() => {
            setDeleteModalVisible(false);
            setSelectedBlog(null);
          }}
          okText="Delete Blog"
          cancelText="Cancel"
          okButtonProps={{ danger: true, className: 'px-6 py-2 rounded-lg' }}
          cancelButtonProps={{ className: 'px-6 py-2 rounded-lg' }}
          centered
        >
          <div className="py-4 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 size={32} className="text-red-600" />
            </div>
            <Title level={4} className="!mb-2">
              Are you absolutely sure?
            </Title>
            <Paragraph className="text-base text-gray-600">
              This action will permanently delete the blog post titled "
              <Text strong className="text-red-700">{selectedBlog?.blog_Title}</Text>
              ". This action cannot be undone.
            </Paragraph>
          </div>
        </Modal>
      </div>
    </div>
  );
}