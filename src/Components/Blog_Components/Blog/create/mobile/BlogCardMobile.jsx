import React from "react";
import { Link } from "react-router-dom";
import {
  Eye,
  ThumbsUp,
  MessageCircle,
  Calendar,
  User,
  MoreVertical,
  Edit,
  Trash2,
  Share2
} from "lucide-react";
import { Card, Avatar, Button, Dropdown, Badge } from "antd";

const BlogCardMobile = ({ 
  blog, 
  onDelete, 
  onToggleStatus, 
  onEdit,
  showActions = false 
}) => {
  const menuItems = [
    {
      key: 'edit',
      icon: <Edit />,
      label: 'Edit',
      onClick: () => onEdit(blog._id),
    },
    {
      key: 'share',
      icon: <Share2 />,
      label: 'Share',
      onClick: () => navigator.share?.({
        title: blog.title,
        text: blog.content?.substring(0, 150),
        url: window.location.origin + `/seo/blogs/${blog._id}`,
      }),
    },
  ];

  if (showActions) {
    menuItems.push({
      key: 'delete',
      icon: <Trash2 />,
      label: 'Delete',
      danger: true,
      onClick: () => onDelete(blog._id),
    });
  }

  const handleStatusToggle = () => {
    onToggleStatus(blog._id, blog.status);
  };

  return (
    <Card 
      className="mb-4 shadow-sm hover:shadow-md transition-shadow duration-200"
      bodyStyle={{ padding: '16px' }}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <Badge 
              status={blog.status === 'published' ? 'success' : 'warning'}
              text={blog.status}
              size="small"
            />
            {blog.category && (
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {blog.category}
              </span>
            )}
          </div>
          
          <Link to={`/seo/blogs/${blog._id}`}>
            <h3 className="font-semibold text-base mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
              {blog.title}
            </h3>
          </Link>
        </div>
        
        {showActions && (
          <Dropdown
            menu={{ items: menuItems }}
            trigger={['click']}
            placement="bottomRight"
          >
            <Button type="text" icon={<MoreVertical />} size="small" />
          </Dropdown>
        )}
      </div>

      {/* Content Preview */}
      <p className="text-gray-600 text-sm mb-3 line-clamp-3">
        {blog.content}
      </p>

      {/* Featured Image */}
      {blog.featuredImage && (
        <div className="mb-3">
          <img
            src={blog.featuredImage}
            alt={blog.title}
            className="w-full h-32 object-cover rounded-lg"
          />
        </div>
      )}

      {/* Tags */}
      {blog.tags && blog.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {blog.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded"
            >
              #{tag}
            </span>
          ))}
          {blog.tags.length > 3 && (
            <span className="text-xs text-gray-500">
              +{blog.tags.length - 3} more
            </span>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t">
        <div className="flex items-center space-x-3 text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <Avatar size="small" icon={<User />} />
            <span>{blog.author?.name || "Anonymous"}</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <Calendar className="w-3 h-3" />
            <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <Eye className="w-3 h-3" />
            <span>{blog.views || 0}</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <ThumbsUp className="w-3 h-3" />
            <span>{blog.likes || 0}</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <MessageCircle className="w-3 h-3" />
            <span>{blog.comments || 0}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons for Management */}
      {showActions && (
        <div className="flex space-x-2 mt-3 pt-3 border-t">
          <Button
            type="primary"
            size="small"
            onClick={handleStatusToggle}
            className="flex-1"
          >
            {blog.status === 'published' ? 'Save as Draft' : 'Publish'}
          </Button>
          
          <Button
            type="default"
            size="small"
            icon={<Edit />}
            onClick={() => onEdit(blog._id)}
            className="flex-1"
          >
            Edit
          </Button>
        </div>
      )}
    </Card>
  );
};

export default BlogCardMobile;
