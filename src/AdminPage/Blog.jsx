import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import axios from "axios";
import { PaginationControls } from "../Components/Blog_Components/BlogManagement"; // Assuming this component exists and handles its own styling, or we'll wrap it.
import { message } from "antd"; // Import Ant Design message
import { MdArticle, MdSearch, MdAddCircle, MdEdit, MdDelete, MdVisibility } from "react-icons/md";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

const Blog = () => {
  const [viewAll, setViewAll] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(12);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [messageApi, contextHolder] = message.useMessage(); // Ant Design message hook

  const token = localStorage.getItem("myToken");

  // Function to fetch blog data
  const fetchBlogData = async () => {
    try {
      const res = await axios.get(
        `https://api.100acress.com/blog/view?page=${currentPage}&limit=${postsPerPage}`
      );
      setViewAll(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error("Error fetching blog data:", error);
      messageApi.open({
        type: 'error',
        content: 'Failed to load blog posts. Please try again.',
        duration: 3,
      });
    }
  };

  useEffect(() => {
    fetchBlogData();
  }, [currentPage, postsPerPage]); // Re-fetch when page or posts per page changes

  // Filter `viewAll` based on `searchTerm`
  const filteredBlogs = viewAll.filter(item =>
    item.blog_Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.blog_Category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.author.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const handleDeleteUser = async (id) => {
    messageApi.open({
      key: "deletingBlog",
      type: 'loading',
      content: 'Deleting blog post...',
    });

    try {
      const response = await axios.delete(
        `https://api.100acress.com/blog/Delete/${id}`,
        {
          headers: {
            'Content-Type': 'multipart/form-data', // This might be incorrect for DELETE, usually not needed
            'Authorization': `Bearer ${token}`,
          }
        }
      );
      if (response.status >= 200 && response.status < 300) {
        messageApi.destroy('deletingBlog');
        messageApi.open({
          type: 'success',
          content: 'Blog post deleted successfully!',
          duration: 2,
        });
        fetchBlogData(); // Re-fetch data to update the list
      } else {
        messageApi.destroy('deletingBlog');
        messageApi.open({
          type: 'error',
          content: 'Failed to delete blog post. Server returned an error.',
          duration: 2,
        });
        console.error("Failed to delete blog post. Server returned an error.");
      }
    } catch (error) {
      messageApi.destroy('deletingBlog');
      messageApi.open({
        type: 'error',
        content: 'An error occurred while deleting blog post.',
        duration: 2,
      });
      console.error("An error occurred while deleting blog post:", error.message);
    }
  };

  const handleDeleteButtonClick = (id) => {
    const confirmDeletion = window.confirm(
      "Are you sure you want to delete this blog post?"
    );
    if (confirmDeletion) {
      handleDeleteUser(id);
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 dark:text-gray-100 min-h-screen flex font-sans">
      <Sidebar />
      <div className="flex-1 p-8 ml-[250px] transition-colors duration-300">
        {contextHolder} {/* Ant Design message context holder */}

        {/* Header and Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
          <div className="flex items-center gap-2 mb-4 sm:mb-0">
            <MdArticle className="text-3xl text-blue-500 animate-pulse" />
            <h1 className="text-3xl font-bold text-gray-800">Blog Management</h1>
          </div>
          <div className="flex space-x-4 w-full sm:w-auto">
            <div className="relative flex-grow">
              <Tippy content={<span>Search blogs by title, category, or author</span>} animation="scale" theme="light-border">
                <input
                  type="text"
                  placeholder="Search blogs..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200 shadow-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Tippy>
              <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
            <Tippy content={<span>Add a new blog post</span>} animation="scale" theme="light-border">
              <Link
                to={"/blog/write"}
                className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex-shrink-0"
              >
                <MdAddCircle className="text-xl" /> Add Blog
              </Link>
            </Tippy>
          </div>
        </div>

        {/* Blog Posts Table */}
        <div className="bg-white rounded-xl shadow-2xl border-l-4 border-gradient-to-r from-blue-400 to-purple-400">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">SNo.</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Title</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Category</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Author</th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBlogs.length > 0 ? (
                  filteredBlogs.map((item, index) => {
                    const serialNumber = (postsPerPage * (currentPage - 1)) + index + 1;
                    const id = item._id; // Use item._id for unique key and actions
                    return (
                      <tr
                        key={id} // Use unique ID for key
                        className="group even:bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{serialNumber}</td>
                        <td className="px-6 py-4 text-sm text-gray-800 max-w-xs truncate">{item.blog_Title}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full shadow-sm">{item.blog_Category}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{item.author}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-2">
                          <Tippy content={<span>View blog post</span>} animation="scale" theme="light-border">
                            <Link to={`/Admin/blog/view/${id}`}>
                              <button
                                type="button"
                                className="inline-flex items-center gap-1 px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-200 group"
                              >
                                <MdVisibility className="text-lg group-hover:animate-bounce" /> View
                              </button>
                            </Link>
                          </Tippy>
                          <Tippy content={<span>Edit blog post</span>} animation="scale" theme="light-border">
                            <Link to={`/Admin/blog/edit/${id}`}>
                              <button
                                type="button"
                                className="inline-flex items-center gap-1 px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 group"
                              >
                                <MdEdit className="text-lg group-hover:animate-bounce" /> Edit
                              </button>
                            </Link>
                          </Tippy>
                          <Tippy content={<span>Delete blog post</span>} animation="scale" theme="light-border">
                            <button
                              type="button"
                              onClick={() => handleDeleteButtonClick(id)}
                              className="inline-flex items-center gap-1 px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-200 group"
                            >
                              <MdDelete className="text-lg group-hover:animate-pulse" /> Delete
                            </button>
                          </Tippy>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500 italic">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <MdArticle className="text-4xl text-gray-300 mb-2 animate-pulse" />
                        No blog posts found.
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {/* Pagination Controls */}
          <div className="py-4 px-6 bg-white border-t border-gray-200 flex justify-center items-center">
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;