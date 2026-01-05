import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../../../../config/apiClient";
import {
  Card,
  Button,
  Avatar,
  Badge,
  Carousel,
  Empty,
  Skeleton
} from "antd";
import {
  ArrowRight,
  Calendar,
  User,
  Eye,
  ThumbsUp,
  Clock,
  BookOutlined
} from "@ant-design/icons";

const FeaturedBlogsMobile = ({ limit = 5 }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedBlogs();
  }, [limit]);

  const fetchFeaturedBlogs = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/post/blogs?status=published&limit=${limit}&sort=views`);
      const blogsData = response.data.data || [];
      setBlogs(blogsData);
    } catch (error) {
      console.error("Error fetching featured blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const BlogCard = ({ blog, size = "default" }) => {
    const isCompact = size === "compact";
    
    return (
      <Card
        className={`mb-3 shadow-sm hover:shadow-md transition-shadow duration-200 ${
          isCompact ? 'p-3' : 'p-4'
        }`}
        bodyStyle={{ padding: 0 }}
        hoverable
      >
        <Link to={`/blogs/${blog._id}`}>
          <div className="space-y-3">
            {/* Featured Image */}
            {blog.featuredImage && (
              <div className={`relative overflow-hidden rounded-lg ${
                isCompact ? 'h-32' : 'h-40'
              }`}>
                <img
                  src={blog.featuredImage}
                  alt={blog.title}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                />
                {blog.status === 'featured' && (
                  <div className="absolute top-2 right-2">
                    <Badge 
                      count="Featured" 
                      style={{ backgroundColor: '#f50' }}
                      size="small"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Content */}
            <div className="px-2 pb-2">
              <h3 className={`font-semibold line-clamp-2 mb-2 hover:text-blue-600 transition-colors ${
                isCompact ? 'text-sm' : 'text-base'
              }`}>
                {blog.title}
              </h3>
              
              <p className={`text-gray-600 line-clamp-2 mb-3 ${
                isCompact ? 'text-xs' : 'text-sm'
              }`}>
                {blog.content}
              </p>

              {/* Tags */}
              {blog.tags && blog.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {blog.tags.slice(0, 2).map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                  {blog.tags.length > 2 && (
                    <span className="text-xs text-gray-500">
                      +{blog.tags.length - 2}
                    </span>
                  )}
                </div>
              )}

              {/* Meta Info */}
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center space-x-2">
                  <Avatar size="small" icon={<User />} />
                  <span>{blog.author || "Anonymous"}</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    <Eye className="w-3 h-3" />
                    <span>{blog.views || 0}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <ThumbsUp className="w-3 h-3" />
                    <span>{blog.likes || 0}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </Card>
    );
  };

  if (loading) {
    return (
      <div className="p-4">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <Skeleton.Input style={{ width: 120 }} active />
            <Skeleton.Button style={{ width: 80 }} active />
          </div>
          <Skeleton.Input style={{ width: '100%' }} active />
        </div>
        
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <Card key={i} className="shadow-sm">
              <Skeleton active paragraph={{ rows: 3 }} />
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="p-4">
        <div className="text-center py-8">
          <BookOutlined className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <Empty
            description="No featured blogs available"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold">Featured Blogs</h2>
          <p className="text-sm text-gray-500">Discover our most popular content</p>
        </div>
        <Link to="/blogs">
          <Button 
            type="text" 
            icon={<ArrowRight />}
            size="small"
            className="text-blue-600"
          >
            View All
          </Button>
        </Link>
      </div>

      {/* Featured Blog Carousel */}
      {blogs.length > 1 && (
        <div className="mb-4">
          <Carousel 
            autoplay 
            dots={false}
            arrows={false}
            className="rounded-lg overflow-hidden"
          >
            {blogs.slice(0, 3).map(blog => (
              <div key={blog._id}>
                <div className="relative h-48">
                  <img
                    src={blog.featuredImage || 'https://via.placeholder.com/400x200'}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                    <div className="text-white">
                      <h3 className="font-semibold text-lg line-clamp-2 mb-1">
                        {blog.title}
                      </h3>
                      <p className="text-sm opacity-90 line-clamp-1">
                        {blog.content}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      )}

      {/* Blog List */}
      <div className="space-y-3">
        {blogs.map((blog, index) => (
          <BlogCard 
            key={blog._id} 
            blog={blog} 
            size={index === 0 ? "default" : "compact"}
          />
        ))}
      </div>

      {/* View All Button */}
      <div className="mt-4 text-center">
        <Link to="/blogs">
          <Button type="primary" icon={<ArrowRight />}>
            Explore All Blogs
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedBlogsMobile;
