import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../../../../config/apiClient";
import { 
  Card, 
  Button, 
  Input, 
  Select, 
  Avatar, 
  Badge, 
  Empty, 
  Drawer, 
  Menu,
  message,
  Dropdown,
  Space,
  Divider
} from "antd";
import {
  Article,
  Search,
  PlusCircle,
  Edit,
  Delete,
  Eye,
  MenuOutlined,
  FilterOutlined,
  Calendar,
  User,
  TrendingUp,
  MoreOutlined
} from "@ant-design/icons";

const { Search: SearchInput } = Input;
const { Option } = Select;

const BlogMobile = () => {
  const navigate = useNavigate();
  const [viewAll, setViewAll] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [authorFilter, setAuthorFilter] = useState("ALL");
  const [authors, setAuthors] = useState([]);
  const [authorStats, setAuthorStats] = useState({});
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await api.get("/post/blogs");
      const data = response.data.data || [];
      setViewAll(data);
      
      // Extract unique authors
      const uniqueAuthors = [...new Set(data.map(blog => blog.author).filter(Boolean))];
      setAuthors(uniqueAuthors);
      
      // Build author stats
      buildAuthorStats(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      messageApi.error("Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  const buildAuthorStats = (rows) => {
    try {
      const stats = {};
      const byAuthor = {};
      (rows || []).forEach((r) => {
        const a = (r.author || '').toString().trim();
        if (!a) return;
        if (!byAuthor[a]) byAuthor[a] = new Set();
        const dt = r.createdAt || r.published_Date || r.updatedAt;
        if (!dt) return;
        const d = new Date(dt);
        if (isNaN(d.getTime())) return;
        const key = d.toISOString().slice(0, 10);
        byAuthor[a].add(key);
      });

      const today = new Date();
      const toKey = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate()).toISOString().slice(0, 10);

      Object.keys(byAuthor).forEach((a) => {
        let streak = 0;
        const dates = byAuthor[a];
        const cur = new Date(today);
        while (streak < 30) {
          const key = toKey(cur);
          if (dates.has(key)) {
            streak += 1;
            cur.setDate(cur.getDate() - 1);
          } else {
            break;
          }
        }
        stats[a] = { streakDays: streak };
      });

      setAuthorStats(stats);
    } catch (error) {
      console.error("Error building author stats:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/post/blogs/${id}`);
      messageApi.success("Blog deleted successfully");
      fetchBlogs();
    } catch (error) {
      console.error("Error deleting blog:", error);
      messageApi.error("Failed to delete blog");
    }
  };

  const filteredBlogs = viewAll.filter(blog => {
    const matchesSearch = blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.content?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAuthor = authorFilter === "ALL" || blog.author === authorFilter;
    return matchesSearch && matchesAuthor;
  });

  const BlogCard = ({ blog }) => {
    const menuItems = [
      {
        key: 'edit',
        icon: <Edit />,
        label: 'Edit',
        onClick: () => navigate(`/admin/blog/edit/${blog._id}`),
      },
      {
        key: 'view',
        icon: <Eye />,
        label: 'View',
        onClick: () => navigate(`/admin/blog/view/${blog._id}`),
      },
      {
        key: 'delete',
        icon: <Delete />,
        label: 'Delete',
        danger: true,
        onClick: () => handleDelete(blog._id),
      },
    ];

    return (
      <Card 
        className="mb-4 shadow-sm"
        bodyStyle={{ padding: '12px' }}
        actions={[
          <Button type="text" icon={<Edit />} onClick={() => navigate(`/admin/blog/edit/${blog._id}`)} size="small">Edit</Button>,
          <Button type="text" icon={<Eye />} onClick={() => navigate(`/admin/blog/view/${blog._id}`)} size="small">View</Button>,
          <Dropdown menu={{ items: menuItems }} trigger={['click']}>
            <Button type="text" icon={<MoreOutlined />} size="small" />
          </Dropdown>
        ]}
      >
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-sm line-clamp-2 flex-1 mr-2">
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
            <div className="flex items-center space-x-2">
              <Avatar size="small" icon={<User />} />
              <span>{blog.author}</span>
            </div>
            <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
          </div>
          
          {authorStats[blog.author] && (
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="mr-1" />
              {authorStats[blog.author].streakDays} day streak
            </div>
          )}
        </div>
      </Card>
    );
  };

  const FilterDrawer = () => (
    <Drawer
      title="Filters"
      placement="left"
      onClose={() => setDrawerVisible(false)}
      open={drawerVisible}
      width={280}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Search</label>
          <SearchInput
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            allowClear
          />
        </div>
        
        <Divider />
        
        <div>
          <label className="block text-sm font-medium mb-2">Author</label>
          <Select
            value={authorFilter}
            onChange={setAuthorFilter}
            className="w-full"
          >
            <Option value="ALL">All Authors</Option>
            {authors.map(author => (
              <Option key={author} value={author}>{author}</Option>
            ))}
          </Select>
        </div>
        
        <Divider />
        
        <div>
          <label className="block text-sm font-medium mb-2">Quick Actions</label>
          <Space direction="vertical" className="w-full">
            <Button 
              type="primary" 
              icon={<PlusCircle />}
              onClick={() => navigate('/admin/blog/write')}
              className="w-full"
            >
              New Blog
            </Button>
            <Button 
              onClick={() => {
                setSearchTerm("");
                setAuthorFilter("ALL");
              }}
              className="w-full"
            >
              Clear Filters
            </Button>
          </Space>
        </div>
      </div>
    </Drawer>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {contextHolder}
      
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button
                type="text"
                icon={<MenuOutlined />}
                onClick={() => setDrawerVisible(true)}
              />
              <h1 className="text-lg font-semibold">Blog Management</h1>
            </div>
            <Button
              type="primary"
              icon={<PlusCircle />}
              onClick={() => navigate('/admin/blog/write')}
              size="small"
            >
              New
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-3">
          <Card size="small">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{viewAll.length}</div>
              <div className="text-xs text-gray-500">Total Blogs</div>
            </div>
          </Card>
          <Card size="small">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{authors.length}</div>
              <div className="text-xs text-gray-500">Authors</div>
            </div>
          </Card>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 pb-3">
        <SearchInput
          placeholder="Search blogs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          allowClear
          prefix={<Search />}
        />
      </div>

      {/* Blog List */}
      <div className="px-4 pb-4">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <Empty
            description="No blogs found"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        ) : (
          <div>
            {filteredBlogs.map(blog => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        )}
      </div>

      {/* Filter Drawer */}
      <FilterDrawer />
    </div>
  );
};

export default BlogMobile;
