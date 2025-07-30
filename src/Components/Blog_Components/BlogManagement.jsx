import { useState, useEffect } from "react";
import axios from "axios";
import { ArrowDown, ArrowUp, Edit, Eye, Plus, Trash2, Search, Calendar, User, FileText, TrendingUp, BarChart3, Activity, Clock, Users, Eye as EyeIcon, ThumbsUp, Share2, MessageCircle } from "lucide-react";
import { Modal, Switch, Badge, Progress, Card, Row, Col, Statistic } from "antd";
import { Link, useNavigate } from "react-router-dom";

export default function BlogManagement() {
  const token = localStorage.getItem("myToken");
  const history = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Do you want to delete this Blog?");
  const [isPublishedLoading, setIsPublishedLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // State for search and sorting
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("date");
  const [sortDirection, setSortDirection] = useState("desc");
  const [blogToDelete, setBlogToDelete] = useState(null);

  // Analytics state
  const [analytics, setAnalytics] = useState({
    totalViews: 0,
    totalLikes: 0,
    totalShares: 0,
    totalComments: 0,
    monthlyGrowth: 0,
    topPerformingBlog: null
  });

  // Handle delete blog modal
  const showModal = () => {
    setOpenModal(true);
  };

  const handleOk = async (id) => {
    setModalText("Deleting blog...");
    setConfirmLoading(true);
    const isDeleted = await handleDeleteUser(id);
    if (isDeleted.success) {
      setModalText("Blog deleted successfully.");
      setBlogs(blogs.filter((blog) => blog._id !== id));
      setConfirmLoading(false);
      setOpenModal(false);
    } else {
      setModalText("Error deleting blog.");
      setConfirmLoading(false);
      setOpenModal(false);
    }
  };

  const handleCancel = () => {
    setOpenModal(false);
    setBlogToDelete(null);
    setModalText("Do you want to delete this Blog?");
  };

  // Filter and sort blogs
  const filteredAndSortedBlogs = blogs
    ?.filter(
      (blog) =>
        blog?.blog_Title?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        blog?.author?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    )
    .sort((a, b) => {
      if (sortField === "date") {
        return sortDirection === "asc"
          ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else {
        const titleA = a.blog_Title || "";
        const titleB = b.blog_Title || "";
        return sortDirection === "asc"
          ? titleA.localeCompare(titleB)
          : titleB.localeCompare(titleA);
      }
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://api.100acress.com/blog/view?page=${currentPage}&limit=${pageSize}`
        );
        setBlogs(res.data.data);
        setTotalPages(res.data.totalPages);
        
        // Calculate analytics
        calculateAnalytics(res.data.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchData();
  }, [currentPage, pageSize]);

  const calculateAnalytics = (blogData) => {
    const totalViews = blogData.reduce((sum, blog) => sum + (blog.views || 0), 0);
    const totalLikes = blogData.reduce((sum, blog) => sum + (blog.likes || 0), 0);
    const totalShares = blogData.reduce((sum, blog) => sum + (blog.shares || 0), 0);
    const totalComments = blogData.reduce((sum, blog) => sum + (blog.comments || 0), 0);
    
    const topPerformingBlog = blogData.reduce((top, blog) => {
      const blogScore = (blog.views || 0) + (blog.likes || 0) * 2 + (blog.shares || 0) * 3;
      const topScore = (top?.views || 0) + (top?.likes || 0) * 2 + (top?.shares || 0) * 3;
      return blogScore > topScore ? blog : top;
    }, null);

    setAnalytics({
      totalViews,
      totalLikes,
      totalShares,
      totalComments,
      monthlyGrowth: 12.5, // Mock data
      topPerformingBlog
    });
  };

  // Toggle sort direction
  const toggleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const handleIsPublished = async (checked, id) => {
    setIsPublishedLoading(true);

    try {
      const res = await axios.patch(
        `https://api.100acress.com/blog/update/${id}`,
        {
          isPublished: checked,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status >= 200 && res.status < 300) {
        setBlogs((prevBlogs) =>
          prevBlogs.map((blog) =>
            blog._id === id ? { ...blog, isPublished: checked } : blog
          )
        );
      } else {
        console.error("Something went wrong while updating the blog status", res.data);
      }
    } catch (error) {
      console.error("Error updating blog published status:", error);
    } finally {
      setIsPublishedLoading(false);
    }
  };

  function BlogPreview(description, maxLength = 80) {
    const getBlogPreview = (desc, maxLen) => {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = desc;
      let text = tempDiv.textContent;
      return text.length > maxLen ? text.substring(0, maxLen) + "..." : text;
    };

    const previewText = getBlogPreview(description, maxLength);
    return <p>{previewText}</p>;
  }

  const handleDeleteUser = async (id) => {
    try {
      const response = await axios.delete(
        `https://api.100acress.com/blog/Delete/${id}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status >= 200 && response.status < 300) {
        return { success: true, error: false };
      } else {
        return { success: false, error: true };
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      return { success: false, error: true };
    }
  };

  const handleDeleteButtonClick = (id) => {
    showModal();
    setBlogToDelete(id);
    setModalText("Do you want to delete this Blog?");
  };

  function cleanString(str) {
    return str
      .replace(/\s+/g, "-")
      .replace(/[?!,\.;:\{\}\(\)\$\@]+/g, "");
  }

  const handleBlogView = (Title, id) => {
    const blogTitle = cleanString(Title);
    history(`/blog/${blogTitle}/${id}`);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 sm:p-6 lg:p-8 w-full">
        <div className="w-full max-w-none">
          {/* Header Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              <div className="space-y-2">
                <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Blog Management Dashboard
                </h1>
                <p className="text-gray-600 text-lg">
                  Comprehensive analytics and management for your blog content
                </p>
              </div>
              <Link to="/seo/blogs/write">
                <button className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl">
                  <Plus size={24} className="group-hover:rotate-90 transition-transform duration-300" />
                  <span className="text-lg">Add New Blog</span>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300"></div>
                </button>
              </Link>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card className="bg-white border border-gray-100 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Monthly Growth</h3>
                <TrendingUp size={20} className="text-green-500" />
              </div>
              <Progress 
                percent={analytics.monthlyGrowth} 
                strokeColor="#10B981"
                showInfo={false}
              />
              <p className="text-sm text-gray-600 mt-2">+{analytics.monthlyGrowth}% from last month</p>
            </Card>
            
            <Card className="bg-white border border-gray-100 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Published Blogs</h3>
                <FileText size={20} className="text-blue-500" />
              </div>
              <div className="text-3xl font-bold text-blue-600">
                {blogs.filter(blog => blog.isPublished).length}
              </div>
              <p className="text-sm text-gray-600 mt-2">Out of {blogs.length} total blogs</p>
            </Card>
            
            <Card className="bg-white border border-gray-100 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Top Performing</h3>
                <BarChart3 size={20} className="text-purple-500" />
              </div>
              <div className="text-lg font-semibold text-gray-800 truncate">
                {analytics.topPerformingBlog?.blog_Title || "No data"}
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {analytics.topPerformingBlog ? 
                  `${analytics.topPerformingBlog.views || 0} views` : 
                  "No performance data"
                }
              </p>
            </Card>
          </div>

        

          {/* Modal */}
          {openModal && (
            <Modal
              title={
                <div className="text-xl font-semibold text-gray-800">
                  Confirm Deletion
                </div>
              }
              open={openModal}
              onOk={() => handleOk(blogToDelete)}
              confirmLoading={confirmLoading}
              onCancel={handleCancel}
              okText="Delete"
              cancelText="Cancel"
              okButtonProps={{ 
                danger: true,
                className: "bg-red-600 hover:bg-red-700 border-red-600"
              }}
              className="modern-modal"
            >
              <div className="py-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <Trash2 size={24} className="text-red-600" />
                  </div>
                  <div>
                    <p className="text-lg font-medium text-gray-800">{modalText}</p>
                    <p className="text-sm text-gray-500">This action cannot be undone.</p>
                  </div>
                </div>
              </div>
            </Modal>
          )}

          {/* Blog Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
            {filteredAndSortedBlogs.length > 0 ? (
              filteredAndSortedBlogs.map((blog) => (
                <div
                  key={blog._id}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 border border-gray-100 overflow-hidden"
                >
                  {/* Blog Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={
                        blog.blog_Image?.url ||
                        "https://via.placeholder.com/400x200?text=No+Image"
                      }
                      alt={blog.blog_Title || "Blog Image"}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Published Badge */}
                    <div className="absolute top-4 right-4">
                      <Badge
                        status={blog?.isPublished ? "success" : "default"}
                        text={blog?.isPublished ? "Published" : "Draft"}
                        className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium"
                      />
                    </div>

                    {/* Performance Metrics Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex items-center gap-1">
                        <EyeIcon size={12} />
                        <span>{blog.views || 0}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ThumbsUp size={12} />
                        <span>{blog.likes || 0}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Share2 size={12} />
                        <span>{blog.shares || 0}</span>
                      </div>
                    </div>
                  </div>

                  {/* Blog Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <User size={16} className="text-gray-400" />
                      <span className="text-sm text-gray-500">{blog.author}</span>
                      <Calendar size={16} className="text-gray-400 ml-2" />
                      <span className="text-sm text-gray-500">
                        {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : "N/A"}
                      </span>
                    </div>

                    <h3
                      className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 hover:text-blue-600 cursor-pointer transition-colors duration-200"
                      onClick={() => handleBlogView(blog.blog_Title, blog._id)}
                    >
                      {blog.blog_Title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {BlogPreview(blog.blog_Description)}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <button
                          className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-all duration-200"
                          onClick={() => handleBlogView(blog.blog_Title, blog._id)}
                          title="View Blog"
                        >
                          <Eye size={18} />
                        </button>
                        <Link to={`/seo/blogs/edit/${blog._id}`}>
                          <button
                            className="p-2 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-lg transition-all duration-200"
                            title="Edit Blog"
                          >
                            <Edit size={18} />
                          </button>
                        </Link>
                        <button
                          className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-all duration-200"
                          onClick={() => handleDeleteButtonClick(blog._id)}
                          title="Delete Blog"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>

                      {/* Published Toggle */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">Status</span>
                        <Switch
                          checked={blog?.isPublished}
                          loading={isPublishedLoading}
                          onChange={(checked) => handleIsPublished(checked, blog._id)}
                          className="custom-switch"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full">
                <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FileText size={48} className="text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">No blogs found</h3>
                  <p className="text-gray-600 mb-6">
                    {searchTerm ? "No blogs match your search criteria." : "Start by creating your first blog post."}
                  </p>
                  <Link to="/seo/blogs/write">
                    <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105">
                      <Plus size={20} className="inline mr-2" />
                      Create Your First Blog
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8">
              <PaginationControls
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export const PaginationControls = ({
  currentPage,
  setCurrentPage,
  totalPages,
}) => {
  // Calculate page range to show
  const getPageRange = () => {
    const delta = 2; // Number of pages to show on each side
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const pageRange = getPageRange();



  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Page Info */}
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="font-medium">Page {currentPage}</span>
            <span className="text-gray-400">of {totalPages}</span>
          </div>
          {totalPages > 1 && (
            <div className="hidden sm:flex items-center space-x-1 text-xs text-gray-400">
              <span>•</span>
              <span>{totalPages} total pages</span>
            </div>
          )}
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center space-x-2">
          {/* First Page */}
          {totalPages > 1 && (
            <button
              className={`p-2 rounded-lg transition-all duration-200 ${
                currentPage === 1
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
              }`}
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              title="First page"
            >
              <ArrowUp size={16} className="rotate-90" />
            </button>
          )}

          {/* Previous Page */}
          <button
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-1 ${
              currentPage === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 hover:from-blue-100 hover:to-indigo-100 border border-blue-200"
            }`}
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            <ArrowUp size={16} className="rotate-90" />
            <span className="hidden sm:inline">Previous</span>
          </button>

          {/* Page Numbers */}
          <div className="flex items-center space-x-1">
            {pageRange.map((page, index) => (
              <div key={index}>
                {page === '...' ? (
                  <span className="px-3 py-2 text-gray-400">...</span>
                ) : (
                  <button
                    className={`w-10 h-10 rounded-lg font-semibold transition-all duration-200 ${
                      currentPage === page
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg transform scale-105"
                        : "bg-gray-50 text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                    }`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                )}
              </div>
            ))}
          </div>


          {/* Next Page */}
          <button
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-1 ${
              currentPage === totalPages
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 hover:from-blue-100 hover:to-indigo-100 border border-blue-200"
            }`}
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            <span className="hidden sm:inline">Next</span>
            <ArrowDown size={16} className="rotate-90" />
          </button>

          {/* Last Page */}
          {totalPages > 1 && (
            <button
              className={`p-2 rounded-lg transition-all duration-200 ${
                currentPage === totalPages
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
              }`}
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              title="Last page"
            >
              <ArrowDown size={16} className="rotate-90" />
            </button>
          )}
        </div>

        {/* Quick Jump */}
        {totalPages > 5 && (
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-gray-500">Go to:</span>
            <select
              className="px-3 py-1 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={currentPage}
              onChange={(e) => setCurrentPage(Number(e.target.value))}
            >
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <option key={page} value={page}>
                  Page {page}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      {totalPages > 1 && (
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-1">
            <div 
              className="bg-gradient-to-r from-blue-500 to-indigo-500 h-1 rounded-full transition-all duration-300"
              style={{ width: `${(currentPage / totalPages) * 100}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};