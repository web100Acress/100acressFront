import { useState,useEffect } from "react"
import axios from "axios"
import { ArrowDown, ArrowUp, Edit, Eye, Plus, Trash2, Search, FileText, Calendar, User, Filter, BarChart3 } from "lucide-react";
import { Switch, Modal, Card, Badge, Tooltip, Empty, Skeleton } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { PaginationControls } from "./BlogManagement";

export default function DraftBlogManagement() {

  const token = localStorage.getItem("myToken");
  const history = useNavigate();
  const [isPublishedLoading, setIsPublishedLoading] = useState(false);
  // Sample blog data
  const [blogs, setBlogs] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Do you Want to delete this Blog?');
  const [loading, setLoading] = useState(true);

  // State for search and sorting
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("date");
  const [sortDirection, setSortDirection] = useState("desc");
  const [blogToDelete, setBlogToDelete] = useState(null);

  // Handle delete blog
  const showModal = () => {
    setOpenModal(true);
  };

  const handleIsPublished = async (checked,id) => {

    setIsPublishedLoading(true);

    try {
      const res = await axios.patch(`/blog/update/${id}`,
      {
        isPublished: checked,
      },
      {
        headers: {
          'Content-Type':'application/json',
          'Authorization': `Bearer ${token}`,
        }
      }
    );
      if(res.status >= 200 && res.status < 300) {
        console.log("Blog status updated successfully");
        setBlogs(prevBlogs => prevBlogs.map(blog => blog._id === id ? { ...blog, isPublished: checked } : blog));
        console.log("Blog status updated successfully");
        setIsPublishedLoading(false);
      }
      else {
        setIsPublishedLoading(false);
        console.log("Something went wrong while updating the blog status", res.data) 
      }
    }
    catch (error) {
      
      console.log(error); 
    }
    finally {
      setIsPublishedLoading(false);
    }
  };


  const handleOk = async(id) => {
    setModalText('Wait...');
    setConfirmLoading(true);
    const isDeleted = await handleDeleteUser(id);
    if (isDeleted.success) {
      setModalText('Blog deleted successfully.');
      setBlogs(blogs.filter((blog) => blog._id !== id));
      setConfirmLoading(false);
      setOpenModal(false);
    }
    else {
      setModalText('Error deleting blog.');
      setConfirmLoading(false);
      setOpenModal(false);
    }

  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpenModal(false);
    setBlogToDelete(null);
  };

  // Filter and sort blogs
  const filteredBlogs = blogs?.filter(
      (blog) =>
        blog.blog_Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.author.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortField === "date") {
        return sortDirection === "asc"
          ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      } else {
        return sortDirection === "asc" ? a.blog_Title.localeCompare(b.blog_Title) : b.blog_Title.localeCompare(a.blog_Title)
      }
    });
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            setLoading(true);
            const res = await axios.get(`/blog/draft/view?page=${currentPage}&limit=${pageSize}`);
            console.log("Response",res.data);
            setBlogs(res.data.data);
            setTotalPages(res.data.totalPages);
          } catch (error) {
            console.log(error);
          } finally {
            setLoading(false);
          }
        };
        fetchData();
      }, []);
  // Toggle sort direction
  const toggleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  function BlogPreview( description, maxLength = 80 ) {
    const getBlogPreview = (desc, maxLen) => {
        const tempDiv = document.createElement('div');
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
        `/blog/Delete/${id}`,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          }
        }
      );
      if (response.status >= 200 && response.status < 300) {
        return {success:true,error:false};
      } else {
        return {success:false,error:true};
      }
    } catch (error) {
        return {success:false,error:true};
    }
  };

  const handleDeleteButtonClick = (id) => {
    showModal();
    setBlogToDelete(id);
    setModalText('Do you Want to delete this Blog?');
  };
  function cleanString(str) {
    return str
        .replace(/\s+/g, '-')        // Replace all spaces with hyphen
        .replace(/[?!,\.;:\{\}\(\)\$\@]+/g, ''); // Replace punctuation with empty string
  }
  const handleBlogView = (Title,id) => {
    const blogTitle = cleanString(Title);
    history(`/blog/${blogTitle}/${id}`);
  };

  // Calculate statistics
  const totalDrafts = blogs.length;
  const publishedDrafts = blogs.filter(blog => blog.isPublished).length;
  const unpublishedDrafts = totalDrafts - publishedDrafts;

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 sm:p-6 lg:p-8">
        <div className="w-full">
          {/* Enhanced Header */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Draft Management</h1>
                  <p className="text-gray-600 mt-1">Manage your draft blog posts and unpublished content</p>
                </div>
              </div>
          <Link to="/seo/blogs/write">
                <button className="px-6 py-3 text-white bg-gradient-to-r from-orange-500 to-red-600 rounded-xl hover:from-orange-600 hover:to-red-700 transition-all duration-200 font-medium flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  <Plus className="w-4 h-4" />
                  <span>Create New Draft</span>
            </button>
          </Link>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 shadow-lg rounded-xl hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Total Drafts</p>
                  <p className="text-3xl font-bold text-blue-900">{totalDrafts}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 shadow-lg rounded-xl hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">Published</p>
                  <p className="text-3xl font-bold text-green-900">{publishedDrafts}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200 shadow-lg rounded-xl hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-600">Unpublished</p>
                  <p className="text-3xl font-bold text-orange-900">{unpublishedDrafts}</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </Card>
        </div>

          {/* Enhanced Search Bar */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-gray-100">
          <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
            <input
              type="text"
                placeholder="Search drafts by title or author..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

          {/* Delete Modal */}
          {openModal && (
            <Modal
              title={
                <div className="flex items-center space-x-2">
                  <Trash2 className="w-5 h-5 text-red-600" />
                  <span>Delete Draft</span>
                </div>
              }
              open={openModal}
              onOk={()=>handleOk(blogToDelete)} 
              confirmLoading={confirmLoading}
              onCancel={handleCancel}
              okButtonProps={{
                className: "bg-red-600 hover:bg-red-700 border-red-600"
              }}
              cancelButtonProps={{
                className: "border-gray-300 text-gray-700 hover:border-gray-400"
              }}
              centered
            >
              <p className="text-gray-700">{modalText}</p>
            </Modal>
          )}

          {/* Enhanced Blog Cards */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <Card key={index} className="shadow-lg rounded-xl">
                  <Skeleton active />
                </Card>
              ))}
                    </div>
          ) : filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBlogs.map((blog) => (
                <Card 
                  key={blog._id} 
                  className="bg-white shadow-lg rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden"
                >
                  {/* Blog Image */}
                  <div className="relative h-48 overflow-hidden rounded-t-xl">
                    <img
                      src={
                        blog.blog_Image?.url && typeof blog.blog_Image.url === 'string' && !blog.blog_Image.url.includes('via.placeholder.com')
                          ? blog.blog_Image.url
                          : blog.blog_Image && typeof blog.blog_Image === 'string' && !blog.blog_Image.includes('via.placeholder.com')
                          ? blog.blog_Image
                          : "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f3f4f6'/%3E%3Ctext x='200' y='160' font-family='Arial' font-size='14' text-anchor='middle' fill='%236b7280'%3EBlog Image%3C/text%3E%3C/svg%3E"
                      }
                              alt={blog.blog_Title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        console.log('Image failed to load for blog:', blog._id, 'URL:', blog.blog_Image?.url);
                        e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f3f4f6'/%3E%3Ctext x='200' y='160' font-family='Arial' font-size='14' text-anchor='middle' fill='%236b7280'%3EBlog Image%3C/text%3E%3C/svg%3E";
                      }}
                    />
                    <div className="absolute top-3 right-3">
                      <Badge 
                        status={blog.isPublished ? "success" : "default"} 
                        text={blog.isPublished ? "Published" : "Draft"}
                        className="bg-white px-2 py-1 rounded-full text-xs font-medium"
                            />
                          </div>
                        </div>

                  {/* Blog Content */}
                  <div className="p-6">
                    <h3 
                      className="text-lg font-bold text-gray-900 mb-2 hover:text-orange-600 cursor-pointer transition-colors duration-200 line-clamp-2"
                      onClick={() => handleBlogView(blog.blog_Title, blog._id)}
                        >
                          {blog.blog_Title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {BlogPreview(blog.blog_Description)}
                    </p>

                    {/* Metadata */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{blog.author}</span>
                      </div>
                      {blog.createdAt && (
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-2">
                        <Tooltip title="View">
                          <button
                            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                            onClick={() => handleBlogView(blog.blog_Title, blog._id)}
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </Tooltip>
                        
                          <Link to={`/seo/blogs/edit/${blog._id}`}>
                          <Tooltip title="Edit">
                            <button className="p-2 text-gray-500 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all duration-200">
                              <Edit className="w-4 h-4" />
                            </button>
                          </Tooltip>
                          </Link>

                        <Tooltip title="Delete">
                          <button
                            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                            onClick={() => handleDeleteButtonClick(blog._id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </Tooltip>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">Publish</span>
                        <Switch 
                          checked={blog?.isPublished} 
                          loading={isPublishedLoading}  
                          onChange={(checked)=>handleIsPublished(checked,blog._id)}
                          className="bg-gray-200"
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
                        </div>
                ) : (
            <Card className="bg-white shadow-lg rounded-xl border border-gray-100">
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={
                  <span className="text-gray-500">
                    {searchTerm ? "No drafts found matching your search criteria." : "No draft blogs available."}
                  </span>
                }
              />
            </Card>
                )}

          {/* Pagination */}
          {totalPages >= 1 && filteredBlogs.length > 0 && (
            <div className="mt-8 flex justify-center">
              <Card className="bg-white shadow-lg rounded-xl border border-gray-100">
                        <PaginationControls
                          currentPage={currentPage}
                          setCurrentPage={setCurrentPage}
                          totalPages={totalPages}
                        />
              </Card>
          </div>
          )}
        </div>
      </div>
    </>
  )
}

