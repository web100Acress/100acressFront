import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import api from "../config/apiClient";
import { message } from "antd"; // Import Ant Design message
import { MdArticle, MdSearch, MdAddCircle, MdEdit, MdDelete, MdVisibility } from "react-icons/md";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';
//

const Blog = () => {
  const [viewAll, setViewAll] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // text search
  const [authorFilter, setAuthorFilter] = useState("ALL"); // dropdown filter
  const [authors, setAuthors] = useState([]); // unique authors for filter
  const [authorStats, setAuthorStats] = useState({}); // author -> { streakDays }
  const [messageApi, contextHolder] = message.useMessage(); // Ant Design message hook

  // Token is injected by api client interceptors; no local handling needed here

  // Build per-author daily posting streak (consecutive days up to today)
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
        const key = d.toISOString().slice(0, 10); // YYYY-MM-DD
        byAuthor[a].add(key);
      });

      const today = new Date();
      const toKey = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate()).toISOString().slice(0, 10);

      Object.keys(byAuthor).forEach((a) => {
        let streak = 0;
        const dates = byAuthor[a];
        const cur = new Date(today);
        // Count backward consecutive days present in dates
        while (streak < 30) { // cap at 30
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
      return stats;
    } catch (_) {
      return {};
    }
  };

  // Function to fetch all blog data
  const fetchBlogData = async (search = "") => {
    try {
      // Use the new admin endpoint to get ALL blogs (published + drafts)
      const res = await api.get(`blog/admin/view?page=1&limit=1000`);
      
      console.log("Admin API Response:", res.data);
      const payload = res.data;
      const allBlogsRaw = Array.isArray(payload?.data) ? payload.data : (Array.isArray(payload) ? payload : []);
      
      let allBlogs = allBlogsRaw;
      
      if (search) {
        // Filter the data based on search term
        const filtered = allBlogs.filter(item =>
          (item.blog_Title && item.blog_Title.toLowerCase().includes(search.toLowerCase())) ||
          (item.blog_Category && item.blog_Category.toLowerCase().includes(search.toLowerCase())) ||
          (item.author && item.author.toLowerCase().includes(search.toLowerCase()))
        );
        
        console.log("Filtered results:", filtered.length);
        setViewAll(filtered);
      } else {
        // Display all blogs
        setViewAll(allBlogs);
      }

      // Build unique authors list from ALL data (not just filtered)
      const uniqueAuthors = Array.from(new Set((allBlogsRaw || []).map(r => (r.author || '').toString().trim()).filter(Boolean))).sort((a,b)=>a.localeCompare(b));
      setAuthors(["ALL", ...uniqueAuthors]);
      // Build author streak stats
      setAuthorStats(buildAuthorStats(allBlogsRaw));
    } catch (error) {
      console.error("Error fetching blog data:", error);
      messageApi.open({
        type: 'error',
        content: 'Failed to load blog posts. Please try again.',
        duration: 3,
      });
    }
  };

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchBlogData(searchTerm);
    }, 300); // 300ms debounce

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  useEffect(() => {
    fetchBlogData();
  }, []); // Fetch all data on component mount

  // Apply author filter on top of current viewAll (which may already be search-filtered)
  const filteredBlogs = viewAll.filter((row) => {
    if (authorFilter === 'ALL') return true;
    const a = (row.author || '').toString().trim();
    return a.toLowerCase() === authorFilter.toLowerCase();
  });

  const handleDeleteUser = async (id) => {
    messageApi.open({
      key: "deletingBlog",
      type: 'loading',
      content: 'Deleting blog post...',
    });

    try {
      const response = await api.delete(`blog/delete/${id}`);
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
          
          {/* Debug Info */}
          <div className="text-sm text-gray-600 mb-2">
            Total Posts: {viewAll.length}
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
            {/* Author filter */}
            <div className="relative">
              <Tippy content={<span>Filter by author</span>} animation="scale" theme="light-border">
                <select
                  className="min-w-[180px] pl-3 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200 shadow-sm bg-white"
                  value={authorFilter}
                  onChange={(e) => setAuthorFilter(e.target.value)}
                >
                  {authors.map((a) => (
                    <option key={a} value={a}>{a === 'ALL' ? 'All Authors' : a}</option>
                  ))}
                </select>
              </Tippy>
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
                  <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Posted On</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Consistency</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBlogs.length > 0 ? (
                  filteredBlogs.map((item, index) => {
                    const serialNumber = index + 1;
                    const id = item._id; // Use item._id for unique key and actions
                    const postedOn = (() => {
                      const dt = item.createdAt || item.published_Date || item.updatedAt;
                      return dt ? new Date(dt).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' }) : '';
                    })();
                    const aName = (item.author || '').toString().trim();
                    const streak = authorStats[aName]?.streakDays || 0;
                    const isConsistent = streak >= 3; // threshold: 3-day streak
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
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{postedOn}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${isConsistent ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-700'}`}>
                            {isConsistent ? `Consistent (Streak ${streak})` : `Streak ${streak}`}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                            item.isPublished 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {item.isPublished ? 'Published' : 'Draft'}
                          </span>
                        </td>
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
                    <td colSpan="6" className="px-6 py-12 text-center text-gray-500 italic">
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
        </div>
      </div>
    </div>
  );
};

export default Blog;
