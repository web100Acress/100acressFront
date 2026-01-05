import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../../../config/apiClient";
import {
  ArrowLeft,
  Calendar,
  User,
  Eye,
  ThumbsUp,
  Share2,
  MessageCircle,
  Bookmark,
  MoreVertical,
  Heart,
  Clock,
  Tag,
  Edit,
  Trash2
} from "lucide-react";
import { Card, Button, Avatar, Divider, Dropdown, message } from "antd";

export default function ModernBlogViewMobile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/post/blogs/${id}`);
      const blogData = response.data.data;
      setBlog(blogData);
      setLikeCount(blogData.likes || 0);
      
      // Fetch related blogs
      fetchRelatedBlogs(blogData.category);
      
      // Increment view count
      incrementViewCount(id);
    } catch (error) {
      console.error("Error fetching blog:", error);
      message.error("Failed to load blog");
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedBlogs = async (category) => {
    try {
      const response = await api.get(`/post/blogs?category=${category}&limit=3`);
      setRelatedBlogs(response.data.data?.filter(blog => blog._id !== id) || []);
    } catch (error) {
      console.error("Error fetching related blogs:", error);
    }
  };

  const incrementViewCount = async (blogId) => {
    try {
      await api.patch(`/post/blogs/${blogId}/view`);
    } catch (error) {
      console.error("Error incrementing view count:", error);
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
    navigate(`/seo/blogs/edit/${id}`);
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/post/blogs/${id}`);
      message.success("Blog deleted successfully");
      navigate("/seo/blogs/manage");
    } catch (error) {
      console.error("Error deleting blog:", error);
      message.error("Failed to delete blog");
    }
  };

  const menuItems = [
    {
      key: 'edit',
      icon: <Edit />,
      label: 'Edit Blog',
      onClick: handleEdit,
    },
    {
      key: 'delete',
      icon: <Trash2 />,
      label: 'Delete Blog',
      danger: true,
      onClick: handleDelete,
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
        <div className="text-center">
          <div className="text-gray-400 mb-4">
            <MessageCircle className="w-16 h-16 mx-auto" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Blog not found</h2>
          <p className="text-gray-500 mb-4">The blog you're looking for doesn't exist.</p>
          <Button type="primary" onClick={() => navigate("/seo/blogs")}>
            Go Back to Blogs
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
          <Dropdown
            menu={{ items: menuItems }}
            trigger={['click']}
            placement="bottomRight"
          >
            <Button type="text" icon={<MoreVertical />} className="p-2" />
          </Dropdown>
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
                <div className="font-medium text-sm">{blog.author?.name || "Anonymous"}</div>
                <div className="text-xs text-gray-500">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <Eye className="w-4 h-4" />
              <span>{blog.views || 0}</span>
            </div>
          </div>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {blog.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full"
                >
                  #{tag}
                </span>
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
        </div>

        {/* Engagement Bar */}
        <div className="sticky bottom-16 bg-white border-t p-4">
          <div className="flex items-center justify-around">
            <Button
              type="text"
              icon={<Heart className={`w-5 h-5 ${isLiked ? 'text-red-500 fill-current' : ''}`} />}
              onClick={handleLike}
              className="flex flex-col items-center"
            >
              <span className="text-xs mt-1">{likeCount}</span>
            </Button>
            
            <Button
              type="text"
              icon={<MessageCircle />}
              className="flex flex-col items-center"
            >
              <span className="text-xs mt-1">{blog.comments || 0}</span>
            </Button>
            
            <Button
              type="text"
              icon={<Bookmark className={`w-5 h-5 ${isBookmarked ? 'text-blue-500 fill-current' : ''}`} />}
              onClick={handleBookmark}
            />
            
            <Button
              type="text"
              icon={<Share2 />}
              onClick={handleShare}
            />
          </div>
        </div>

        {/* Related Blogs */}
        {relatedBlogs.length > 0 && (
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-3">Related Blogs</h2>
            <div className="space-y-3">
              {relatedBlogs.map((relatedBlog) => (
                <Card
                  key={relatedBlog._id}
                  size="small"
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => navigate(`/seo/blogs/${relatedBlog._id}`)}
                >
                  <div className="flex space-x-3">
                    {relatedBlog.featuredImage && (
                      <img
                        src={relatedBlog.featuredImage}
                        alt={relatedBlog.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="font-medium text-sm line-clamp-2 mb-1">
                        {relatedBlog.title}
                      </h3>
                      <p className="text-xs text-gray-500 line-clamp-2">
                        {relatedBlog.content?.substring(0, 100)}...
                      </p>
                      <div className="flex items-center space-x-3 mt-1 text-xs text-gray-400">
                        <span className="flex items-center">
                          <Eye className="w-3 h-3 mr-1" />
                          {relatedBlog.views || 0}
                        </span>
                        <span className="flex items-center">
                          <Heart className="w-3 h-3 mr-1" />
                          {relatedBlog.likes || 0}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation Spacer */}
      <div className="h-16"></div>
    </div>
  );
}
