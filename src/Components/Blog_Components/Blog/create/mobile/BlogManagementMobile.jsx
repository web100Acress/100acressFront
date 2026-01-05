import { useState, useEffect, useContext } from "react";
import api from "../../../../../config/apiClient";
import {
  ArrowDown,
  ArrowUp,
  Edit,
  Eye,
  Plus,
  Trash2,
  Search,
  Calendar,
  User,
  FileText,
  TrendingUp,
  BarChart3,
  Activity,
  Clock,
  Users,
  Eye as EyeIcon,
  ThumbsUp,
  Share2,
  MessageCircle,
  Menu,
  X,
  Filter
} from "lucide-react";
import {
  Modal,
  Switch,
  Badge,
  Progress,
  Card,
  message,
  Drawer,
  Button,
  Space,
  Divider
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../AuthContext";

export default function BlogManagementMobile() {
  const token = localStorage.getItem("myToken");
  const history = useNavigate();
  const { agentData, isAdmin } = useContext(AuthContext) || {};

  // Resolve current user identity (fallback to localStorage for robustness)
  const localAgent = (() => {
    try {
      return JSON.parse(window.localStorage.getItem("agentData") || "null");
    } catch {
      return null;
    }
  })();

  const currentUser = agentData || localAgent;
  const currentUserId = currentUser?.id || currentUser?._id;

  // State for blog management
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    drafts: 0,
    totalViews: 0,
    totalLikes: 0,
    totalComments: 0
  });

  // Fetch blogs
  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await api.get("/post/blogs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      const blogsData = response.data.data || [];
      setBlogs(blogsData);
      setFilteredBlogs(blogsData);
      
      // Calculate stats
      const stats = {
        total: blogsData.length,
        published: blogsData.filter(blog => blog.status === 'published').length,
        drafts: blogsData.filter(blog => blog.status === 'draft').length,
        totalViews: blogsData.reduce((sum, blog) => sum + (blog.views || 0), 0),
        totalLikes: blogsData.reduce((sum, blog) => sum + (blog.likes || 0), 0),
        totalComments: blogsData.reduce((sum, blog) => sum + (blog.comments || 0), 0)
      };
      setStats(stats);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      message.error("Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchBlogs();
    }
  }, [token]);

  // Filter and search blogs
  useEffect(() => {
    let filtered = blogs;

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(blog => blog.status === statusFilter);
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(blog =>
        blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.content?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      const dateA = new Date(a.createdAt || 0);
      const dateB = new Date(b.createdAt || 0);
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    });

    setFilteredBlogs(filtered);
  }, [blogs, searchTerm, statusFilter, sortOrder]);

  // Handle blog actions
  const handleDelete = async (blogId) => {
    try {
      await api.delete(`/post/blogs/${blogId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      message.success("Blog deleted successfully");
      fetchBlogs();
    } catch (error) {
      console.error("Error deleting blog:", error);
      message.error("Failed to delete blog");
    }
  };

  const handleToggleStatus = async (blogId, currentStatus) => {
    try {
      const newStatus = currentStatus === 'published' ? 'draft' : 'published';
      await api.patch(`/post/blogs/${blogId}`, 
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      message.success(`Blog ${newStatus === 'published' ? 'published' : 'saved as draft'} successfully`);
      fetchBlogs();
    } catch (error) {
      console.error("Error updating blog status:", error);
      message.error("Failed to update blog status");
    }
  };

  const showBlogDetails = (blog) => {
    setSelectedBlog(blog);
    setIsModalVisible(true);
  };

  // Mobile-friendly blog card
  const BlogCard = ({ blog }) => (
    <Card 
      className="mb-4 shadow-sm"
      bodyStyle={{ padding: '12px' }}
      actions={[
        <Button 
          type="text" 
          icon={<Eye />} 
          onClick={() => showBlogDetails(blog)}
          size="small"
        >
          View
        </Button>,
        <Button 
          type="text" 
          icon={<Edit />} 
          onClick={() => history(`/seo/blogs/edit/${blog._id}`)}
          size="small"
        >
          Edit
        </Button>,
        <Button 
          type="text" 
          danger 
          icon={<Trash2 />} 
          onClick={() => handleDelete(blog._id)}
          size="small"
        >
          Delete
        </Button>
      ]}
    >
      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-sm line-clamp-2 flex-1">
            {blog.title}
          </h3>
          <Badge 
            status={blog.status === 'published' ? 'success' : 'warning'}
            text={blog.status}
            size="small"
          />
        </div>
        
        <p className="text-gray-600 text-xs line-clamp-2">
          {blog.content}
        </p>
        
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
          <div className="flex space-x-3">
            <span className="flex items-center">
              <EyeIcon className="w-3 h-3 mr-1" />
              {blog.views || 0}
            </span>
            <span className="flex items-center">
              <ThumbsUp className="w-3 h-3 mr-1" />
              {blog.likes || 0}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Button
                type="text"
                icon={<Menu />}
                onClick={() => setDrawerVisible(true)}
                className="lg:hidden"
              />
              <h1 className="text-lg font-semibold">Blog Management</h1>
            </div>
            <Button
              type="primary"
              icon={<Plus />}
              onClick={() => history('/seo/blogs/write')}
              size="small"
            >
              New Blog
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-4 py-4">
        <div className="grid grid-cols-2 gap-3">
          <Card size="small">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
              <div className="text-xs text-gray-500">Total Blogs</div>
            </div>
          </Card>
          <Card size="small">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{stats.published}</div>
              <div className="text-xs text-gray-500">Published</div>
            </div>
          </Card>
          <Card size="small">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{stats.drafts}</div>
              <div className="text-xs text-gray-500">Drafts</div>
            </div>
          </Card>
          <Card size="small">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{stats.totalViews}</div>
              <div className="text-xs text-gray-500">Total Views</div>
            </div>
          </Card>
        </div>
      </div>

      {/* Filters */}
      <div className="px-4 pb-3">
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <div className="flex space-x-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Drafts</option>
            </select>
            
            <Button
              type="text"
              icon={sortOrder === 'desc' ? <ArrowDown /> : <ArrowUp />}
              onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
              size="small"
            >
              Sort
            </Button>
          </div>
        </div>
      </div>

      {/* Blog List */}
      <div className="px-4 pb-4">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <FileText className="w-12 h-12 mx-auto mb-2 text-gray-300" />
            <p>No blogs found</p>
          </div>
        ) : (
          <div>
            {filteredBlogs.map(blog => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        )}
      </div>

      {/* Filter Drawer */}
      <Drawer
        title="Filters"
        placement="left"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={280}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <div className="space-y-2">
              {['all', 'published', 'draft'].map(status => (
                <label key={status} className="flex items-center">
                  <input
                    type="radio"
                    value={status}
                    checked={statusFilter === status}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="mr-2"
                  />
                  <span className="capitalize">{status}</span>
                </label>
              ))}
            </div>
          </div>
          
          <Divider />
          
          <div>
            <label className="block text-sm font-medium mb-2">Sort Order</label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="desc"
                  checked={sortOrder === 'desc'}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="mr-2"
                />
                <span>Newest First</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="asc"
                  checked={sortOrder === 'asc'}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="mr-2"
                />
                <span>Oldest First</span>
              </label>
            </div>
          </div>
        </div>
      </Drawer>

      {/* Blog Details Modal */}
      <Modal
        title={selectedBlog?.title}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="edit" icon={<Edit />} onClick={() => history(`/seo/blogs/edit/${selectedBlog?._id}`)}>
            Edit
          </Button>,
          <Button 
            key="status" 
            type="primary"
            onClick={() => handleToggleStatus(selectedBlog?._id, selectedBlog?.status)}
          >
            {selectedBlog?.status === 'published' ? 'Save as Draft' : 'Publish'}
          </Button>
        ]}
        width="90%"
        style={{ maxWidth: '600px' }}
      >
        {selectedBlog && (
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Content</h4>
              <p className="text-gray-600 text-sm whitespace-pre-wrap">
                {selectedBlog.content}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Created:</span>
                <div>{new Date(selectedBlog.createdAt).toLocaleDateString()}</div>
              </div>
              <div>
                <span className="text-gray-500">Status:</span>
                <div>
                  <Badge 
                    status={selectedBlog.status === 'published' ? 'success' : 'warning'}
                    text={selectedBlog.status}
                  />
                </div>
              </div>
              <div>
                <span className="text-gray-500">Views:</span>
                <div>{selectedBlog.views || 0}</div>
              </div>
              <div>
                <span className="text-gray-500">Likes:</span>
                <div>{selectedBlog.likes || 0}</div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
