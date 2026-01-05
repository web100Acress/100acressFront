import { Calendar, Clock, ArrowRight, Eye, Heart } from "lucide-react";
import { Button } from "../../../Components/ui/button";
import { cn } from "../../../lib/utils";

export const BlogCard = ({ blog, featured = false }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getReadingTime = (description) => {
    const words = description?.split(" ").length || 0;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
  };

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    const strippedText = text.replace(/<[^>]*>/g, "");
    if (strippedText.length <= maxLength) return strippedText;
    return strippedText.substring(0, maxLength) + "...";
  };

  const handleBlogClick = () => {
    // Navigate to blog detail page
    window.location.href = `/blog/${blog.slug || blog._id}`;
  };

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl glass-effect border border-white/10 hover:border-gold/50 transition-all duration-500 cursor-pointer",
        featured ? "lg:col-span-2 lg:row-span-2" : ""
      )}
      onClick={handleBlogClick}
    >
      {/* Image */}
      <div
        className={cn(
          "relative overflow-hidden"
        )}
      >
        <img
          src={
            blog.blog_Image?.cdn_url ||
            blog.blog_Image?.url ||
            "https://via.placeholder.com/800x600/1a1a1a/d4af37?text=Blog+Image"
          }
          alt={blog.blog_Title}
          className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

        {/* Category Badge */}
        {blog.blog_Category && (
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 text-xs font-semibold tracking-wider uppercase bg-gold text-black rounded-full">
              {blog.blog_Category}
            </span>
          </div>
        )}

        {/* Stats */}
        <div className="absolute top-4 right-4 flex items-center gap-3">
          {blog.views > 0 && (
            <div className="flex items-center gap-1 px-2 py-1 rounded-full glass-effect text-white text-xs">
              <Eye className="h-3 w-3" />
              <span>{blog.views}</span>
            </div>
          )}
          {blog.likes > 0 && (
            <div className="flex items-center gap-1 px-2 py-1 rounded-full glass-effect text-white text-xs">
              <Heart className="h-3 w-3 fill-red-500 text-red-500" />
              <span>{blog.likes}</span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className={cn("p-6 space-y-4", featured ? "lg:p-8" : "")}>
        {/* Meta Info */}
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(blog.createdAt)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{getReadingTime(blog.blog_Description)}</span>
          </div>
        </div>

        {/* Title */}
        <h3
          className={cn(
            "font-display font-bold text-white group-hover:text-gold transition-colors line-clamp-2",
            featured ? "text-3xl lg:text-4xl" : "text-xl"
          )}
        >
          {blog.blog_Title}
        </h3>

        {/* Description */}
        <p
          className={cn(
            "text-gray-300 line-clamp-3",
            featured ? "text-lg" : "text-sm"
          )}
        >
          {truncateText(blog.blog_Description, featured ? 200 : 120)}
        </p>

        {/* Author & CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
              <span className="text-gold font-semibold text-sm">
                {blog.author?.charAt(0) || "A"}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-white">
                {blog.author || "Admin"}
              </p>
              <p className="text-xs text-gray-400">Author</p>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="text-gold hover:text-gold hover:bg-gold/10 group/btn"
          >
            Read More
            <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );
};
