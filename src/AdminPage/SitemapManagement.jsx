import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_BASE } from '../config/apiBase';
import Sidebar from './Sidebar';
import { MdEdit, MdDelete, MdAdd, MdSearch } from 'react-icons/md';

const SitemapManagement = () => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentUrl, setCurrentUrl] = useState({
    id: null,
    loc: '',
    lastmod: '',
    changefreq: 'weekly',
    priority: '0.8'
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('myToken');
      console.log('Fetching sitemap URLs from:', `${API_BASE}/api/sitemap/urls`);
      
      const response = await axios.get(`${API_BASE}/api/sitemap/urls`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      console.log('Sitemap response:', response.data);
      
      if (response.data.success) {
        setUrls(response.data.data);
        toast.success(`Loaded ${response.data.data.length} URLs from sitemap`);
      } else {
        toast.error('Failed to load sitemap URLs');
      }
    } catch (error) {
      console.error('Error fetching URLs:', error);
      toast.error(error.response?.data?.message || 'Failed to fetch sitemap URLs');
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setEditMode(false);
    setCurrentUrl({
      id: null,
      loc: '',
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'weekly',
      priority: '0.8'
    });
    setShowModal(true);
  };

  const handleEdit = (url) => {
    setEditMode(true);
    setCurrentUrl({
      ...url,
      lastmod: url.lastmod ? url.lastmod.split('T')[0] : ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this URL from sitemap?')) {
      return;
    }

    try {
      const token = localStorage.getItem('myToken');
      const response = await axios.delete(`${API_BASE}/api/sitemap/urls/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.success) {
        toast.success('URL deleted successfully');
        fetchUrls();
      }
    } catch (error) {
      console.error('Error deleting URL:', error);
      toast.error('Failed to delete URL');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUrl.loc) {
      toast.error('URL is required');
      return;
    }

    try {
      const token = localStorage.getItem('myToken');
      const payload = {
        loc: currentUrl.loc,
        lastmod: currentUrl.lastmod || new Date().toISOString(),
        changefreq: currentUrl.changefreq,
        priority: currentUrl.priority
      };

      let response;
      if (editMode) {
        response = await axios.put(
          `${API_BASE}/api/sitemap/urls/${currentUrl.id}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
      } else {
        response = await axios.post(
          `${API_BASE}/api/sitemap/urls`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
      }

      if (response.data.success) {
        toast.success(editMode ? 'URL updated successfully' : 'URL added successfully');
        setShowModal(false);
        fetchUrls();
      }
    } catch (error) {
      console.error('Error saving URL:', error);
      toast.error('Failed to save URL');
    }
  };

  const filteredUrls = urls.filter(url =>
    url.loc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-50 dark:bg-gray-900 dark:text-gray-100 min-h-screen flex font-sans">
      <Sidebar />
      <div className="flex-1 p-8 ml-[250px] transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 border border-blue-200 dark:border-gray-600">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded"></div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                    Sitemap Management
                  </h1>
                </div>
                <p className="text-gray-600 dark:text-gray-400 ml-4">
                  Manage and organize your website's sitemap URLs for better SEO
                </p>
              </div>
              <button
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 whitespace-nowrap hover:scale-105 transform"
                onClick={handleAddNew}
              >
                <MdAdd size={22} />
                Add New URL
              </button>
            </div>
          </div>

          {/* Search and Stats Section - Sticky */}
          <div className="sticky top-0 z-40 bg-gray-50 dark:bg-gray-900 pb-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative group h-full">
                  <MdSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg group-focus-within:text-blue-500 transition-colors" />
                  <input
                    type="text"
                    className="w-full h-full pl-12 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:focus:ring-blue-400 transition-all duration-200 shadow-sm hover:shadow-md text-sm"
                    placeholder="Search URLs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="md:col-span-2 flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 rounded-lg px-6 py-2.5 border border-blue-300 dark:border-blue-700 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 h-full">
                <div className="text-center w-full">
                  <p className="text-lg font-bold text-white whitespace-nowrap">Total URLs - <span className="text-2xl">{urls.length}</span></p>
                </div>
              </div>
            </div>
          </div>

          {/* Table Section */}
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <div className="text-center">
                <div className="inline-block">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
                <p className="mt-4 text-gray-600 dark:text-gray-400">Loading URLs...</p>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 border-b border-gray-200 dark:border-gray-600">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">#</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">URL</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Last Modified</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Change Freq</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Priority</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900 dark:text-white">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredUrls.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="px-6 py-12 text-center">
                          <div className="flex flex-col items-center justify-center">
                            <div className="text-4xl mb-3">📭</div>
                            <p className="text-gray-600 dark:text-gray-400 text-lg font-medium">No URLs found</p>
                            <p className="text-gray-500 dark:text-gray-500 text-sm mt-1">Try adjusting your search criteria</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredUrls.map((url, index) => (
                        <tr key={url.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150">
                          <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 font-medium">{index + 1}</td>
                          <td className="px-6 py-4">
                            <a
                              href={url.loc}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium break-all hover:underline transition-colors"
                            >
                              {url.loc}
                            </a>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                            {url.lastmod
                              ? new Date(url.lastmod).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
                              : 'N/A'}
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300">
                              {url.changefreq || 'N/A'}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                              {url.priority || 'N/A'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors duration-150"
                                onClick={() => handleEdit(url)}
                                title="Edit URL"
                              >
                                <MdEdit size={20} />
                              </button>
                              <button
                                className="p-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors duration-150"
                                onClick={() => handleDelete(url.id)}
                                title="Delete URL"
                              >
                                <MdDelete size={20} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Modal for Add/Edit */}
          {showModal && (
            <div
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowModal(false)}
            >
              <div
                className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="sticky top-0 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 px-8 py-6 border-b border-gray-200 dark:border-gray-600 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {editMode ? '✏️ Edit URL' : '➕ Add New URL'}
                  </h2>
                  <button
                    type="button"
                    className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-2xl leading-none"
                    onClick={() => setShowModal(false)}
                  >
                    ✕
                  </button>
                </div>

                {/* Modal Body */}
                <form onSubmit={handleSubmit} className="p-8">
                  <div className="space-y-6">
                    {/* URL Input */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        URL (loc) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="url"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        value={currentUrl.loc}
                        onChange={(e) =>
                          setCurrentUrl({ ...currentUrl, loc: e.target.value })
                        }
                        placeholder="https://www.100acress.com/page-name/"
                        required
                      />
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        The full URL of the page
                      </p>
                    </div>

                    {/* Last Modified */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Last Modified
                      </label>
                      <input
                        type="date"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        value={currentUrl.lastmod}
                        onChange={(e) =>
                          setCurrentUrl({ ...currentUrl, lastmod: e.target.value })
                        }
                      />
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        The last time this page was modified
                      </p>
                    </div>

                    {/* Change Frequency */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Change Frequency
                      </label>
                      <select
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        value={currentUrl.changefreq}
                        onChange={(e) =>
                          setCurrentUrl({ ...currentUrl, changefreq: e.target.value })
                        }
                      >
                        <option value="">None</option>
                        <option value="always">Always</option>
                        <option value="hourly">Hourly</option>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                        <option value="never">Never</option>
                      </select>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        How often the page's content changes
                      </p>
                    </div>

                    {/* Priority */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Priority
                      </label>
                      <input
                        type="number"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        value={currentUrl.priority}
                        onChange={(e) =>
                          setCurrentUrl({ ...currentUrl, priority: e.target.value })
                        }
                        min="0.0"
                        max="1.0"
                        step="0.1"
                      />
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        Importance of the page (0.0–1.0). Homepage often has 1.0
                      </p>
                    </div>
                  </div>

                  {/* Modal Footer */}
                  <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <button
                      type="button"
                      className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
                    >
                      {editMode ? 'Update URL' : 'Add URL'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SitemapManagement;
