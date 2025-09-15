import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement, 
  ArcElement, 
  Title, 
  Tooltip, 
  Legend,
  Filler
} from 'chart.js';
import { 
  Eye, 
  Heart, 
  MessageSquare, 
  Clock, 
  ArrowUpRight, 
  Search,
  TrendingUp,
  Users,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  Calendar,
  Filter,
  Download,
  Share2,
  MoreVertical
} from 'lucide-react';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const BlogInsights = () => {
  const [timeRange, setTimeRange] = useState('7days');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  // Enhanced blog data with more realistic analytics
  const [blogs] = useState([
    { 
      id: 1, 
      title: 'Top 10 Real Estate Trends in 2024', 
      date: '2024-09-10', 
      author: 'John Doe',
      category: 'Market Analysis',
      views: 12453,
      likes: 2345,
      comments: 567,
      shares: 234,
      avgTimeOnPage: 2.5,
      bounceRate: 42.3,
      readingCompletion: 78.5,
      content: 'Comprehensive analysis of emerging real estate trends and market predictions for 2024.',
      thumbnail: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=200&fit=crop',
      tags: ['trends', 'market', '2024', 'analysis'],
      status: 'published'
    },
    { 
      id: 2, 
      title: 'How to Choose the Perfect Neighborhood', 
      date: '2024-09-05', 
      author: 'Jane Smith',
      category: 'Buying Guide',
      views: 9876,
      likes: 1543,
      comments: 321,
      shares: 187,
      avgTimeOnPage: 3.1,
      bounceRate: 38.7,
      readingCompletion: 82.3,
      content: 'Expert tips on evaluating and selecting the ideal neighborhood for your lifestyle.',
      thumbnail: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=200&fit=crop',
      tags: ['neighborhood', 'buying', 'guide'],
      status: 'published'
    },
    { 
      id: 3, 
      title: 'Investment Guide: Commercial vs Residential', 
      date: '2024-08-28', 
      author: 'Mike Johnson',
      category: 'Investment',
      views: 8765,
      likes: 1432,
      comments: 298,
      shares: 156,
      avgTimeOnPage: 4.2,
      bounceRate: 35.2,
      readingCompletion: 85.1,
      content: 'Comparing commercial and residential real estate investments.',
      thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=200&fit=crop',
      tags: ['investment', 'commercial', 'residential'],
      status: 'published'
    },
    { 
      id: 4, 
      title: 'The Future of Smart Homes in India', 
      date: '2024-08-20', 
      author: 'Sarah Williams',
      category: 'Technology',
      views: 7654,
      likes: 1321,
      comments: 287,
      shares: 143,
      avgTimeOnPage: 3.8,
      bounceRate: 40.1,
      readingCompletion: 76.9,
      content: 'Exploring smart home technology trends in Indian real estate.',
      thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop',
      tags: ['smart homes', 'technology', 'india'],
      status: 'published'
    },
    { 
      id: 5, 
      title: 'Understanding Home Loan Interest Rates', 
      date: '2024-08-15', 
      author: 'David Brown',
      category: 'Finance',
      views: 10987,
      likes: 1876,
      comments: 412,
      shares: 298,
      avgTimeOnPage: 4.5,
      bounceRate: 32.9,
      readingCompletion: 88.2,
      content: 'Complete guide to home loan interest rates and securing the best deals.',
      thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=200&fit=crop',
      tags: ['loans', 'finance', 'interest rates'],
      status: 'published'
    }
  ]);

  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const selectedBlogData = selectedBlog ? blogs.find(blog => blog.id === selectedBlog) : null;

  // Enhanced chart data
  const viewsData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Page Views',
        data: selectedBlogData ? [1200, 1900, 1500, 2500, 2200, 3000, 2800] : [8400, 12300, 9800, 15600, 13400, 18200, 16900],
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#3B82F6',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
      },
    ],
  };

  const engagementData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Likes',
        data: selectedBlogData ? [45, 78, 56, 89, 67, 92, 110] : [280, 456, 389, 567, 445, 623, 689],
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
        borderRadius: 4,
      },
      {
        label: 'Comments',
        data: selectedBlogData ? [12, 23, 15, 28, 19, 24, 30] : [78, 134, 98, 167, 123, 156, 189],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderRadius: 4,
      },
      {
        label: 'Shares',
        data: selectedBlogData ? [5, 12, 8, 15, 11, 18, 22] : [34, 67, 45, 89, 67, 78, 92],
        backgroundColor: 'rgba(168, 85, 247, 0.8)',
        borderRadius: 4,
      },
    ],
  };

  const trafficSources = {
    labels: ['Direct', 'Social Media', 'Search Engines', 'Email', 'Referrals'],
    datasets: [{
      data: [35, 25, 20, 15, 5],
      backgroundColor: [
        '#3B82F6',
        '#10B981',
        '#F59E0B',
        '#8B5CF6',
        '#EC4899',
      ],
      borderWidth: 0,
    }],
  };

  const deviceBreakdown = {
    labels: ['Desktop', 'Mobile', 'Tablet'],
    datasets: [{
      data: [55, 40, 5],
      backgroundColor: [
        '#3B82F6',
        '#10B981',
        '#F59E0B',
      ],
      borderWidth: 0,
    }],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        cornerRadius: 8,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          color: '#6B7280',
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#6B7280',
        },
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        cornerRadius: 8,
      },
    },
  };

  const MetricCard = ({ title, value, change, icon, className = '', subtitle = '' }) => (
    <motion.div 
      className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 ${className}`}
      whileHover={{ y: -2 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {typeof value === 'number' ? value.toLocaleString() : value}
            {title.includes('Rate') && '%'}
            {title.includes('Time') && ' min'}
          </p>
          {subtitle && (
            <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
          )}
          {change !== undefined && (
            <div className={`flex items-center mt-2 text-sm ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              <TrendingUp className={`h-4 w-4 mr-1 ${change < 0 ? 'rotate-180' : ''}`} />
              {Math.abs(change)}% from last period
            </div>
          )}
        </div>
        <div className="p-3 rounded-lg bg-blue-50 text-blue-600 flex-shrink-0">
          {icon}
        </div>
      </div>
    </motion.div>
  );

  const BlogCard = ({ blog, isSelected, onClick }) => (
    <motion.div
      onClick={() => onClick(blog.id)}
      className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-all duration-200 ${
        isSelected ? 'bg-blue-50 border-r-4 border-blue-600' : ''
      }`}
      whileHover={{ x: 4 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start space-x-3">
        <img
          src={blog.thumbnail}
          alt={blog.title}
          className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {blog.category}
            </span>
            {isSelected && <ArrowUpRight className="h-4 w-4 text-blue-600" />}
          </div>
          <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-1">
            {blog.title}
          </h3>
          <div className="flex items-center text-xs text-gray-500 mb-2">
            <Calendar className="h-3 w-3 mr-1" />
            <span>{new Date(blog.date).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric', 
              year: 'numeric' 
            })}</span>
            <span className="mx-2">•</span>
            <span>{blog.author}</span>
          </div>
          <div className="flex items-center space-x-4 text-xs text-gray-500">
            <span className="flex items-center">
              <Eye className="h-3 w-3 mr-1" />
              {blog.views?.toLocaleString()}
            </span>
            <span className="flex items-center">
              <Heart className="h-3 w-3 mr-1" />
              {blog.likes?.toLocaleString()}
            </span>
            <span className="flex items-center">
              <MessageSquare className="h-3 w-3 mr-1" />
              {blog.comments?.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const EmptyState = () => (
    <motion.div 
      className="flex flex-col items-center justify-center h-96"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center max-w-md">
        <div className="mx-auto h-24 w-24 text-gray-300 mb-4">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Select a Blog Post</h3>
        <p className="text-gray-500 mb-4">
          Choose a blog post from the sidebar to view detailed analytics and performance metrics.
        </p>
        <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
          <span className="flex items-center">
            <Eye className="h-4 w-4 mr-1" />
            Views
          </span>
          <span className="flex items-center">
            <Heart className="h-4 w-4 mr-1" />
            Engagement
          </span>
          <span className="flex items-center">
            <TrendingUp className="h-4 w-4 mr-1" />
            Growth
          </span>
        </div>
      </div>
    </motion.div>
  );

  const totalMetrics = {
    totalViews: blogs.reduce((sum, blog) => sum + blog.views, 0),
    totalLikes: blogs.reduce((sum, blog) => sum + blog.likes, 0),
    totalComments: blogs.reduce((sum, blog) => sum + blog.comments, 0),
    totalShares: blogs.reduce((sum, blog) => sum + (blog.shares || 0), 0),
    avgTimeOnPage: (blogs.reduce((sum, blog) => sum + blog.avgTimeOnPage, 0) / blogs.length),
    avgBounceRate: (blogs.reduce((sum, blog) => sum + blog.bounceRate, 0) / blogs.length),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {/* Enhanced Sidebar */}
        <div className="w-96 border-r border-gray-200 bg-white overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-200 bg-white">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Blog Analytics</h2>
            
            {/* Search */}
            <div className="relative mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search posts, authors, tags..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
              <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-xs text-blue-600 font-medium">Total Posts</p>
                <p className="text-lg font-bold text-blue-900">{blogs.length}</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-xs text-green-600 font-medium">Published</p>
                <p className="text-lg font-bold text-green-900">{blogs.filter(b => b.status === 'published').length}</p>
              </div>
            </div>
          </div>

          {/* Blog List */}
          <div className="flex-1 overflow-y-auto">
            <AnimatePresence>
              {filteredBlogs.map((blog) => (
                <BlogCard
                  key={blog.id}
                  blog={blog}
                  isSelected={selectedBlog === blog.id}
                  onClick={setSelectedBlog}
                />
              ))}
            </AnimatePresence>
            
            {filteredBlogs.length === 0 && (
              <div className="p-6 text-center">
                <Search className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500">No posts found</p>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="p-6">
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    {selectedBlogData ? selectedBlogData.title : 'Blog Analytics Dashboard'}
                  </h1>
                  <p className="text-gray-600 mt-2">
                    {selectedBlog 
                      ? 'Detailed performance metrics and audience insights' 
                      : 'Track performance across all your blog content'}
                  </p>
                </div>
                
                {selectedBlog && (
                  <div className="mt-4 lg:mt-0 flex items-center space-x-3">
                    <div className="inline-flex rounded-lg shadow-sm" role="group">
                      {[
                        { id: '7days', label: '7D' },
                        { id: '30days', label: '30D' },
                        { id: '90days', label: '90D' },
                        { id: '12months', label: '1Y' },
                      ].map((range, index) => (
                        <button
                          key={range.id}
                          onClick={() => setTimeRange(range.id)}
                          className={`px-4 py-2 text-sm font-medium transition-colors ${
                            timeRange === range.id
                              ? 'bg-blue-600 text-white'
                              : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
                          } border ${
                            index === 0 ? 'rounded-l-lg' : ''
                          } ${
                            index === 3 ? 'rounded-r-lg' : 'border-r-0'
                          }`}
                        >
                          {range.label}
                        </button>
                      ))}
                    </div>
                    <button className="p-2 text-gray-500 hover:text-gray-700">
                      <Download className="h-5 w-5" />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-gray-700">
                      <Share2 className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>

              {selectedBlog ? (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedBlog}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Individual Blog Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                      <MetricCard
                        title="Views"
                        value={selectedBlogData.views}
                        change={12.5}
                        icon={<Eye className="h-6 w-6" />}
                        subtitle="Total page views"
                      />
                      <MetricCard
                        title="Engagement"
                        value={selectedBlogData.likes + selectedBlogData.comments}
                        change={8.2}
                        icon={<Heart className="h-6 w-6" />}
                        subtitle="Likes + Comments"
                      />
                      <MetricCard
                        title="Avg. Read Time"
                        value={selectedBlogData.avgTimeOnPage}
                        change={5.7}
                        icon={<Clock className="h-6 w-6" />}
                        subtitle="Minutes on page"
                      />
                      <MetricCard
                        title="Completion Rate"
                        value={selectedBlogData.readingCompletion}
                        change={-2.1}
                        icon={<TrendingUp className="h-6 w-6" />}
                        subtitle="% who finished reading"
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>
              ) : (
                /* Overall Metrics */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                  <MetricCard
                    title="Total Views"
                    value={totalMetrics.totalViews}
                    change={15.3}
                    icon={<Eye className="h-6 w-6" />}
                    subtitle="Across all posts"
                  />
                  <MetricCard
                    title="Total Likes"
                    value={totalMetrics.totalLikes}
                    change={12.7}
                    icon={<Heart className="h-6 w-6" />}
                    subtitle="All time likes"
                  />
                  <MetricCard
                    title="Comments"
                    value={totalMetrics.totalComments}
                    change={-3.2}
                    icon={<MessageSquare className="h-6 w-6" />}
                    subtitle="Total comments"
                  />
                  <MetricCard
                    title="Avg. Time"
                    value={totalMetrics.avgTimeOnPage.toFixed(1)}
                    change={4.8}
                    icon={<Clock className="h-6 w-6" />}
                    subtitle="Minutes per post"
                  />
                  <MetricCard
                    title="Active Readers"
                    value="2.1K"
                    change={18.5}
                    icon={<Users className="h-6 w-6" />}
                    subtitle="Monthly active"
                  />
                </div>
              )}

              {selectedBlog ? (
                /* Individual Blog Charts */
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  <motion.div 
                    className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Daily Views</h3>
                      <div className="text-sm text-gray-500">Last 7 days</div>
                    </div>
                    <div className="h-80">
                      <Line data={viewsData} options={chartOptions} />
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Engagement Breakdown</h3>
                      <div className="text-sm text-gray-500">Interactions</div>
                    </div>
                    <div className="h-80">
                      <Bar data={engagementData} options={chartOptions} />
                    </div>
                  </motion.div>
                </div>
              ) : (
                <EmptyState />
              )}

              {/* Additional Analytics */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <motion.div 
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Traffic Sources</h3>
                    <Globe className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="h-64">
                    <Doughnut data={trafficSources} options={pieOptions} />
                  </div>
                </motion.div>
                
                <motion.div 
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Device Usage</h3>
                    <div className="flex space-x-1">
                      <Monitor className="h-4 w-4 text-gray-400" />
                      <Smartphone className="h-4 w-4 text-gray-400" />
                      <Tablet className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  <div className="h-64">
                    <Doughnut data={deviceBreakdown} options={pieOptions} />
                  </div>
                </motion.div>

                {/* Top Performing Posts */}
                <motion.div 
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Top Posts</h3>
                    <TrendingUp className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="space-y-4">
                    {blogs
                      .sort((a, b) => b.views - a.views)
                      .slice(0, 3)
                      .map((post, index) => (
                        <div 
                          key={post.id} 
                          className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0 cursor-pointer hover:bg-gray-50 rounded-lg px-2 transition-colors"
                          onClick={() => setSelectedBlog(post.id)}
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                              index === 0 ? 'bg-yellow-100 text-yellow-800' :
                              index === 1 ? 'bg-gray-100 text-gray-800' :
                              'bg-orange-100 text-orange-800'
                            }`}>
                              {index + 1}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 text-sm line-clamp-1">
                                {post.title}
                              </p>
                              <div className="flex items-center space-x-3 text-xs text-gray-500 mt-1">
                                <span className="flex items-center">
                                  <Eye className="h-3 w-3 mr-1" />
                                  {post.views.toLocaleString()}
                                </span>
                                <span className="flex items-center">
                                  <Heart className="h-3 w-3 mr-1" />
                                  {post.likes}
                                </span>
                              </div>
                            </div>
                          </div>
                          <ArrowUpRight className="h-4 w-4 text-gray-400" />
                        </div>
                      ))}
                  </div>
                </motion.div>
              </div>

              {/* Recent Activity Feed */}
              {!selectedBlog && (
                <motion.div 
                  className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                    <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                      View All →
                    </button>
                  </div>
                  <div className="space-y-4">
                    {[
                      { action: 'New comment', post: 'Top 10 Real Estate Trends in 2024', time: '2 minutes ago', type: 'comment' },
                      { action: 'Post published', post: 'How to Choose the Perfect Neighborhood', time: '1 hour ago', type: 'publish' },
                      { action: '50+ views', post: 'Investment Guide: Commercial vs Residential', time: '3 hours ago', type: 'views' },
                      { action: 'New subscriber', post: 'Blog Newsletter', time: '5 hours ago', type: 'subscribe' },
                    ].map((activity, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                        <div className={`p-2 rounded-full ${
                          activity.type === 'comment' ? 'bg-blue-100 text-blue-600' :
                          activity.type === 'publish' ? 'bg-green-100 text-green-600' :
                          activity.type === 'views' ? 'bg-purple-100 text-purple-600' :
                          'bg-orange-100 text-orange-600'
                        }`}>
                          {activity.type === 'comment' && <MessageSquare className="h-4 w-4" />}
                          {activity.type === 'publish' && <ArrowUpRight className="h-4 w-4" />}
                          {activity.type === 'views' && <Eye className="h-4 w-4" />}
                          {activity.type === 'subscribe' && <Users className="h-4 w-4" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                          <p className="text-sm text-gray-600">{activity.post}</p>
                          <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Performance Insights */}
              {selectedBlog && (
                <motion.div 
                  className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Insights</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm font-medium text-green-800">High Engagement</span>
                        </div>
                        <span className="text-sm text-green-600">+15% above average</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-sm font-medium text-blue-800">Good Read Time</span>
                        </div>
                        <span className="text-sm text-blue-600">{selectedBlogData.avgTimeOnPage} min avg</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span className="text-sm font-medium text-purple-800">Social Shares</span>
                        </div>
                        <span className="text-sm text-purple-600">{selectedBlogData.shares || 0} shares</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Content Details</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">Category</label>
                        <p className="text-sm text-gray-900 mt-1">{selectedBlogData.category}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Author</label>
                        <p className="text-sm text-gray-900 mt-1">{selectedBlogData.author}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Published</label>
                        <p className="text-sm text-gray-900 mt-1">
                          {new Date(selectedBlogData.date).toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Tags</label>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedBlogData.tags.map((tag, index) => (
                            <span 
                              key={index}
                              className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BlogInsights;