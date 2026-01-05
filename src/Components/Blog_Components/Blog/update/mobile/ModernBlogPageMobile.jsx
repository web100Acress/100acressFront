import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../../../config/apiClient";
import {
  ArrowLeft,
  Search,
  Filter,
  Grid,
  List,
  Calendar,
  User,
  Tag,
  TrendingUp,
  Clock
} from "lucide-react";
import { Card, Input, Button, Select, Avatar, Badge, Empty } from "antd";
import BlogCardMobile from "../create/mobile/BlogCardMobile";

const { Search: SearchInput } = Input;
const { Option } = Select;

export default function ModernBlogPageMobile() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("latest");
  const [viewMode, setViewMode] = useState("grid");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    filterAndSortBlogs();
  }, [blogs, searchTerm, selectedCategory, sortBy]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await api.get("/post/blogs?status=published");
      const blogsData = response.data.data || [];
      setBlogs(blogsData);
      
      // Extract unique categories
      const uniqueCategories = [...new Set(blogsData.map(blog => blog.category).filter(Boolean))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortBlogs = () => {
    let filtered = [...blogs];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(blog =>
        blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(blog => blog.category === selectedCategory);
    }

    // Apply sorting
    switch (sortBy) {
      case "latest":
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "oldest":
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case "popular":
        filtered.sort((a, b) => (b.views || 0) - (a.views || 0));
        break;
      case "liked":
        filtered.sort((a, b) => (b.likes || 0) - (a.likes || 0));
        break;
      default:
        break;
    }

    setFilteredBlogs(filtered);
  };

  const handleBlogClick = (blogId) => {
    navigate(`/seo/blogs/${blogId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Button
                type="text"
                icon={<ArrowLeft />}
                onClick={() => navigate(-1)}
                className="p-2"
              />
              <h1 className="text-xl font-bold">Blog</h1>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                type={viewMode === "grid" ? "primary" : "text"}
                icon={<Grid />}
                onClick={() => setViewMode("grid")}
                size="small"
              />
              <Button
                type={viewMode === "list" ? "primary" : "text"}
                icon={<List />}
                onClick={() => setViewMode("list")}
                size="small"
              />
            </div>
          </div>

          {/* Search and Filters */}
          <div className="space-y-3">
            <SearchInput
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              allowClear
              size="small"
            />

            <div className="flex space-x-2">
              <Select
                value={selectedCategory}
                onChange={setSelectedCategory}
                className="flex-1"
                size="small"
              >
                <Option value="all">All Categories</Option>
                {categories.map(category => (
                  <Option key={category} value={category}>
                    {category}
                  </Option>
                ))}
              </Select>

              <Select
                value={sortBy}
                onChange={setSortBy}
                className="flex-1"
                size="small"
              >
                <Option value="latest">Latest</Option>
                <Option value="oldest">Oldest</Option>
                <Option value="popular">Most Viewed</Option>
                <Option value="liked">Most Liked</Option>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-white border-b p-4">
        <div className="grid grid-cols-4 gap-2 text-center">
          <div>
            <div className="text-lg font-bold text-blue-600">{blogs.length}</div>
            <div className="text-xs text-gray-500">Total</div>
          </div>
          <div>
            <div className="text-lg font-bold text-green-600">
              {blogs.reduce((sum, blog) => sum + (blog.views || 0), 0)}
            </div>
            <div className="text-xs text-gray-500">Views</div>
          </div>
          <div>
            <div className="text-lg font-bold text-purple-600">
              {blogs.reduce((sum, blog) => sum + (blog.likes || 0), 0)}
            </div>
            <div className="text-xs text-gray-500">Likes</div>
          </div>
          <div>
            <div className="text-lg font-bold text-orange-600">{categories.length}</div>
            <div className="text-xs text-gray-500">Categories</div>
          </div>
        </div>
      </div>

      {/* Blog List */}
      <div className="p-4">
        {filteredBlogs.length === 0 ? (
          <Empty
            description="No blogs found"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        ) : (
          <div className={viewMode === "grid" ? "grid grid-cols-1 gap-4 items-start auto-rows-auto" : "space-y-4"}>
            {filteredBlogs.map(blog => (
              <BlogCardMobile
                key={blog._id}
                blog={blog}
                onEdit={(blogId) => navigate(`/seo/blogs/edit/${blogId}`)}
                showActions={false}
              />
            ))}
          </div>
        )}
      </div>

      {/* Bottom Spacer */}
      <div className="h-20"></div>
    </div>
  );
}
