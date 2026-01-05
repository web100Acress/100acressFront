import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../../../config/apiClient";
import {
  Card,
  Button,
  Avatar,
  Badge,
  Divider,
  Spin,
  message,
  Space,
  Tag,
  Tooltip
} from "antd";
import {
  ArrowLeft,
  Calendar,
  User,
  Eye,
  ThumbsUp,
  Share2,
  Bookmark,
  Edit,
  Delete,
  MoreHorizontal,
  Clock,
  Tag as TagIcon
} from "@ant-design/icons";

const BlogViewMobile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    if (id) {
      fetchBlog();
    }
  }, [id]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/post/blogs/${id}`);
      const blogData = response.data.data;
      setBlog(blogData);
      setLikeCount(blogData.likes || 0);
      
      // Increment view count
      await api.patch(`/post/blogs/${id}/view`);
    } catch (error) {
      console.error("Error fetching blog:", error);
      message.error("Failed to load blog");
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    try {
      if (isLiked) {
        await api.delete(`/post/blogs/${id}/like`);
        setLikeCount(prev => prev - 1);
      } else {
        await api.post(`/post/blogs/${id}/like`);
        setLikeCount(prev => prev + 1);
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handleBookmark = async () => {
    try {
      if (isBookmarked) {
        await api.delete(`/post/blogs/${id}/bookmark`);
      } else {
        await api.post(`/post/blogs/${id}/bookmark`);
      }
      setIsBookmarked(!isBookmarked);
      message.success(isBookmarked ? "Removed from bookmarks" : "Added to bookmarks");
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: blog?.title,
          text: blog?.content?.substring(0, 150),
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        message.success("Link copied to clipboard");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const handleEdit = () => {
    navigate(`/admin/blog/edit/${id}`);
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/post/blogs/${id}`);
      message.success("Blog deleted successfully");
      navigate("/admin/blogs");
    } catch (error) {
      console.error("Error deleting blog:", error);
      message.error("Failed to delete blog");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-gray-400 mb-4">
            <User className="w-16 h-16 mx-auto" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Blog not found</h2>
          <p className="text-gray-500 mb-4">The blog you're looking for doesn't exist.</p>
          <Button type="primary" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b">
        <div className="flex items-center justify-between p-4">
          <Button
            type="text"
            icon={<ArrowLeft />}
            onClick={() => navigate(-1)}
            className="p-2"
          />
          <h1 className="text-lg font-semibold truncate flex-1 mx-4">
            {blog.title}
          </h1>
          <Space>
            <Button
              type="text"
              icon={<Edit />}
              onClick={handleEdit}
              className="p-2"
            />
          </Space>
        </div>
      </div>

      {/* Blog Content */}
      <div className="pb-20">
        {/* Featured Image */}
        {blog.featuredImage && (
          <div className="w-full">
            <img
              src={blog.featuredImage}
              alt={blog.title}
              className="w-full h-auto object-contain"
            />
          </div>
        )}

        {/* Blog Meta */}
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-3">{blog.title}</h1>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Avatar size="small" icon={<User />} />
              <div>
                <div className="font-medium text-sm">{blog.author || "Anonymous"}</div>
                <div className="text-xs text-gray-500 flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  {new Date(blog.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
            
            <Badge 
              status={blog.status === 'published' ? 'success' : 'warning'}
              text={blog.status}
            />
          </div>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {blog.tags.map((tag, index) => (
                <Tag key={index} icon={<TagIcon />}>
                  {tag}
                </Tag>
              ))}
            </div>
          )}

          {/* Blog Content */}
          <div className="prose prose-sm max-w-none">
            <div
              className="text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t">
            <div className="text-center">
              <div className="flex items-center justify-center text-blue-600 mb-1">
                <Eye className="w-4 h-4 mr-1" />
                <span className="font-semibold">{blog.views || 0}</span>
              </div>
              <div className="text-xs text-gray-500">Views</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center text-green-600 mb-1">
                <ThumbsUp className="w-4 h-4 mr-1" />
                <span className="font-semibold">{likeCount}</span>
              </div>
              <div className="text-xs text-gray-500">Likes</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center text-purple-600 mb-1">
                <Clock className="w-4 h-4 mr-1" />
                <span className="font-semibold">
                  {Math.ceil((blog.content || '').length / 1000)} min
                </span>
              </div>
              <div className="text-xs text-gray-500">Read Time</div>
            </div>
          </div>
        </div>

        {/* Engagement Bar */}
        <div className="sticky bottom-16 bg-white border-t p-4">
          <div className="flex items-center justify-around">
            <Button
              type="text"
              icon={<ThumbsUp className={`w-5 h-5 ${isLiked ? 'text-blue-500' : ''}`} />}
              onClick={handleLike}
              className="flex flex-col items-center"
            >
              <span className="text-xs mt-1">{likeCount}</span>
            </Button>
            
            <Button
              type="text"
              icon={<Bookmark className={`w-5 h-5 ${isBookmarked ? 'text-blue-500' : ''}`} />}
              onClick={handleBookmark}
            />
            
            <Button
              type="text"
              icon={<Share2 />}
              onClick={handleShare}
            />
            
            <Button
              type="text"
              danger
              icon={<Delete />}
              onClick={handleDelete}
            />
          </div>
        </div>
      </div>

      {/* Bottom Spacer */}
      <div className="h-16"></div>
    </div>
  );
};

export default BlogViewMobile;
