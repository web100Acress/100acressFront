import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AdminInsightsSidebar from '../../components/AdminInsightsSidebar';

import { Plus, Edit, Trash2, Upload, Download, Search, Filter, X, BookOpen, Clock, BarChart3, Star, FileText, AlertCircle } from 'lucide-react';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../../config/apiClient';
import { io } from 'socket.io-client';

const AdminGuides = () => {
  // WebSocket connection
  const [socket, setSocket] = useState(null);
  
  // Initialize WebSocket connection
  useEffect(() => {
    // Get the base URL from the API client
    const baseURL = api.defaults.baseURL.replace('/api', '');
    const newSocket = io(baseURL, {
      transports: ['websocket'],
      withCredentials: true,
      extraHeaders: {
        Authorization: `Bearer ${localStorage.getItem('myToken')?.replace(/^"|"$/g, '')}`
      }
    });
    
    setSocket(newSocket);
    
    // Clean up the socket connection on unmount
    return () => newSocket.close();
  }, []);
  
  // Listen for real-time updates
  useEffect(() => {
    if (!socket) return;
    
    // Listen for guide updates
    socket.on('guide:created', (guide) => {
      setGuides(prevGuides => {
        // Check if guide already exists to avoid duplicates
        const exists = prevGuides.some(g => g._id === guide._id);
        return exists ? prevGuides : [guide, ...prevGuides];
      });
      toast.success('New guide created');
    });
    
    socket.on('guide:updated', (updatedGuide) => {
      setGuides(prevGuides => 
        prevGuides.map(guide => 
          guide._id === updatedGuide._id ? updatedGuide : guide
        )
      );
      toast.success('Guide updated');
    });
    
    socket.on('guide:deleted', (deletedId) => {
      setGuides(prevGuides => 
        prevGuides.filter(guide => guide._id !== deletedId)
      );
      toast.success('Guide deleted');
    });
    
    return () => {
      socket.off('guide:created');
      socket.off('guide:updated');
      socket.off('guide:deleted');
    };
  }, [socket]);
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentGuide, setCurrentGuide] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: 'Buying',
    readTime: '',
    level: 'Beginner',
    summary: '',
    content: '',
    image: '',
    file: null,
    tags: '',
    isFeatured: false,
    fileName: ''
  });
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchGuides();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      setFormData(prev => ({
        ...prev,
        file: files[0],
        fileName: files[0]?.name || ''
      }));
    } else if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    
    try {
      const formDataToSend = new FormData();
      
      // Append all form data to FormData
      Object.keys(formData).forEach(key => {
        if (key === 'tags' && typeof formData[key] === 'string') {
          formDataToSend.append('tags', formData[key]);
        } else if (key !== 'file' && key !== 'image') {
          formDataToSend.append(key, formData[key]);
        }
      });
      
      // Append file if it exists
      if (formData.file) {
        formDataToSend.append('file', formData.file);
      }

      if (currentGuide) {
        // Update existing guide
        await api.put(`/guides/${currentGuide._id}`, formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        toast.success('Guide updated successfully');
      } else {
        // Create new guide
        await api.post('/guides', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        toast.success('Guide created successfully');
      }
      
      setShowModal(false);
      fetchGuides();
      resetForm();
    } catch (error) {
      console.error('Error saving guide:', error);
      toast.error(error.response?.data?.message || 'Failed to save guide');
    } finally {
      setIsUploading(false);
    }
  };

  const handleEdit = (guide) => {
    setCurrentGuide(guide);
    setFormData({
      title: guide.title,
      author: guide.author,
      category: guide.category || 'Buying',
      readTime: guide.readTime || '',
      level: guide.level || 'Beginner',
      summary: guide.summary || '',
      content: guide.content || '',
      image: guide.image || '',
      file: null, // Don't pre-fill file input for security reasons
      fileName: guide.fileName || '',
      tags: Array.isArray(guide.tags) ? guide.tags.join(', ') : guide.tags || '',
      isFeatured: guide.isFeatured || false
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this guide?')) {
      try {
        await api.delete(`/guides/${id}`);
        toast.success('Guide deleted successfully');
        fetchGuides();
      } catch (error) {
        console.error('Error deleting guide:', error);
        toast.error('Failed to delete guide');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      author: '',
      category: 'Buying',
      readTime: '',
      level: 'Beginner',
      summary: '',
      content: '',
      image: '',
      file: null,
      tags: '',
      isFeatured: false
    });
    setCurrentGuide(null);
  };

  const filteredGuides = guides.filter(guide => 
    guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guide.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (guide.tags && Array.isArray(guide.tags) && guide.tags.some(tag => 
      tag.toLowerCase().includes(searchTerm.toLowerCase())
    ))
  );

  const getCategoryColor = (category) => {
    const colors = {
      'Buying': 'bg-blue-100 text-blue-700 border-blue-200',
      'Investing': 'bg-green-100 text-green-700 border-green-200',
      'Financing': 'bg-purple-100 text-purple-700 border-purple-200',
      'Improvement': 'bg-orange-100 text-orange-700 border-orange-200',
      'Selling': 'bg-red-100 text-red-700 border-red-200',
      'Legal': 'bg-gray-100 text-gray-700 border-gray-200'
    };
    return colors[category] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const getLevelColor = (level) => {
    const colors = {
      'Beginner': 'bg-emerald-50 text-emerald-700 border-emerald-200',
      'Intermediate': 'bg-amber-50 text-amber-700 border-amber-200',
      'Advanced': 'bg-rose-50 text-rose-700 border-rose-200'
    };
    return colors[level] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <AdminInsightsSidebar />
      
      {/* Header */}
      <div className="sticky top-0 z-[9000] bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-200">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Guides Management</h1>
                <p className="text-sm text-gray-500 mt-0.5">Create and manage educational content</p>
              </div>
            </div>
            <Link
              to="/Admin/dashboard"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
            >
              ← Back to Admin
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 w-full md:max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="Search guides by title, summary, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <button className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all shadow-sm">
                <Filter className="h-4 w-4" />
                Filter
              </button>
              <button
                onClick={() => {
                  resetForm();
                  setShowModal(true);
                }}
                className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg shadow-indigo-200 hover:shadow-xl"
              >
                <Plus className="h-5 w-5" />
                Add New Guide
              </button>
            </div>
          </div>
        </div>

        {/* Guides Grid */}
        {loading ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12">
            <div className="flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin"></div>
              <p className="mt-4 text-gray-600 font-medium">Loading guides...</p>
            </div>
          </div>
        ) : filteredGuides.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <AlertCircle className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No guides found</h3>
              <p className="text-gray-500 mb-6">Get started by creating your first guide</p>
              <button
                onClick={() => {
                  resetForm();
                  setShowModal(true);
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg shadow-indigo-200"
              >
                <Plus className="h-5 w-5" />
                Create First Guide
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGuides.map((guide) => (
              <div
                key={guide._id}
                className="group bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-indigo-200 transition-all duration-300 overflow-hidden"
              >
                <div className="relative h-48 bg-gradient-to-br from-indigo-100 to-purple-100 overflow-hidden">
                  {guide.image ? (
                    <img
                      src={guide.image}
                      alt={guide.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <BookOpen className="w-16 h-16 text-indigo-300" />
                    </div>
                  )}
                  {guide.isFeatured && (
                    <div className="absolute top-4 right-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-400 text-amber-900 shadow-lg">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        Featured
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="font-bold text-gray-900 text-lg line-clamp-2 flex-1 group-hover:text-indigo-600 transition-colors">
                      {guide.title}
                    </h3>
                  </div>

                  <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                    {guide.summary}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium border ${getCategoryColor(guide.category)}`}>
                      <BookOpen className="w-3.5 h-3.5" />
                      {guide.category}
                    </span>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium border ${getLevelColor(guide.level)}`}>
                      <BarChart3 className="w-3.5 h-3.5" />
                      {guide.level}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-4 pb-4 border-b border-gray-100">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {guide.readTime}
                    </span>
                    <span>•</span>
                    <span className="truncate">{guide.author}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(guide)}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                      Edit
                    </button>
                    {guide.fileUrl && (
                      <a
                        href={guide.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center p-2.5 rounded-lg text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors"
                        title="Download"
                      >
                        <Download className="h-4 w-4" />
                      </a>
                    )}
                    <button
                      onClick={() => handleDelete(guide._id)}
                      className="inline-flex items-center justify-center p-2.5 rounded-lg text-red-700 bg-red-50 hover:bg-red-100 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-900/75 backdrop-blur-sm transition-opacity" onClick={() => { setShowModal(false); resetForm(); }}></div>
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
              <div className="absolute top-4 right-4 z-10">
                <button
                  type="button"
                  className="bg-white rounded-xl p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all shadow-sm"
                  onClick={() => { setShowModal(false); resetForm(); }}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="px-6 py-4 max-h-[calc(100vh-150px)] overflow-y-auto">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Title <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="title"
                        required
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-transparent transition-all"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter guide title"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Author <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="author"
                        required
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-transparent transition-all"
                        value={formData.author}
                        onChange={handleChange}
                        placeholder="Author name"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Category <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="category"
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-transparent transition-all"
                        value={formData.category}
                        onChange={handleChange}
                        required
                      >
                        <option value="Buying">Buying</option>
                        <option value="Investing">Investing</option>
                        <option value="Financing">Financing</option>
                        <option value="Improvement">Improvement</option>
                        <option value="Selling">Selling</option>
                        <option value="Legal">Legal</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Read Time <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="readTime"
                        required
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-transparent transition-all"
                        value={formData.readTime}
                        onChange={handleChange}
                        placeholder="e.g., 5 min"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Level <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="level"
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-transparent transition-all"
                        value={formData.level}
                        onChange={handleChange}
                        required
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Summary <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="summary"
                        rows={2}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                        value={formData.summary}
                        onChange={handleChange}
                        required
                        placeholder="Brief summary of the guide"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Content <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="content"
                        rows={4}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                        value={formData.content}
                        onChange={handleChange}
                        required
                        placeholder="Full content of the guide"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Image URL <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="url"
                        name="image"
                        required
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-transparent transition-all"
                        value={formData.image}
                        onChange={handleChange}
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        File (PDF/PPT/DOC)
                      </label>
                      <div className="relative border-2 border-dashed border-gray-200 rounded-lg p-4 text-center hover:border-indigo-300 transition-colors bg-gray-50">
                        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                        <div className="flex text-sm text-gray-600 justify-center">
                          <label className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                            <span>Upload a file</span>
                            <input
                              name="file"
                              type="file"
                              className="sr-only"
                              onChange={handleChange}
                              accept=".pdf,.ppt,.pptx,.doc,.docx"
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          {formData.fileName || (formData.file ? formData.file.name : 'PDF, PPT, or DOC up to 10MB')}
                        </p>
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Tags
                      </label>
                      <input
                        type="text"
                        name="tags"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        value={formData.tags}
                        onChange={handleChange}
                        placeholder="tag1, tag2, tag3"
                      />
                      <p className="mt-2 text-xs text-gray-500">Comma-separated list of tags</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 mt-4 border-t border-gray-100 pt-2">
                  <button
                    type="button"
                    onClick={() => { setShowModal(false); resetForm(); }}
                    className="px-2 py-1 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isUploading}
                    className="px-2 py-1 text-xs font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:opacity-50 transition-all"
                  >
                    {isUploading ? 'Saving...' : (currentGuide ? 'Update Guide' : 'Create Guide')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminGuides;