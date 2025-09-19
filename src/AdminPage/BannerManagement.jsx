import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Upload, Image as ImageIcon, Trash2, Eye, Save, X, Plus, Settings, BarChart3, Calendar, Users, AlertCircle } from 'lucide-react';
import Sidebar from './Sidebar';

const BannerManagement = () => {
  const dispatch = useDispatch();
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [bannerData, setBannerData] = useState({
    title: '',
    subtitle: '',
    slug: '',
    isActive: true,
    order: 0
  });

  // Fetch banners on component mount
  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('myToken');
      const response = await fetch(`${import.meta.env.VITE_API_BASE}/api/admin/banners`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setBanners(data.banners || []);
      } else {
        toast.error('Failed to fetch banners');
      }
    } catch (error) {
      console.error('Error fetching banners:', error);
      toast.error('Error fetching banners');
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size should be less than 5MB');
        return;
      }

      setSelectedFile(file);
      
      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('Please select an image file');
      return;
    }

    setUploading(true);
    try {
      const token = localStorage.getItem('myToken');
      const formData = new FormData();
      formData.append('bannerImage', selectedFile);
      formData.append('title', bannerData.title);
      formData.append('subtitle', bannerData.subtitle);
      formData.append('slug', bannerData.slug || ''); // Ensure slug is always a string
      formData.append('isActive', bannerData.isActive);
      formData.append('order', bannerData.order);

      // Debug log to see what's being sent
      console.log('Banner data being sent:', {
        title: bannerData.title,
        subtitle: bannerData.subtitle,
        slug: bannerData.slug,
        isActive: bannerData.isActive,
        order: bannerData.order
      });

      const response = await fetch(`${import.meta.env.VITE_API_BASE}/api/admin/banners/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        toast.success('Banner uploaded successfully!');
        
        // Reset form
        setSelectedFile(null);
        setPreviewUrl(null);
        setBannerData({
          title: '',
          subtitle: '',
          slug: '',
          isActive: true,
          order: 0
        });
        
        // Refresh banners list
        fetchBanners();
      } else {
        let errorMessage = 'Failed to upload banner';
        try {
          const error = await response.json();
          errorMessage = error.message || errorMessage;
        } catch (parseError) {
          // If response is not JSON (like HTML error page), use status text
          errorMessage = response.statusText || errorMessage;
        }
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error('Error uploading banner:', error);
      toast.error('Error uploading banner');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (bannerId) => {
    if (!window.confirm('Are you sure you want to delete this banner?')) {
      return;
    }

    try {
      const token = localStorage.getItem('myToken');
      const response = await fetch(`${import.meta.env.VITE_API_BASE}/api/admin/banners/${bannerId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        toast.success('Banner deleted successfully!');
        fetchBanners();
      } else {
        toast.error('Failed to delete banner');
      }
    } catch (error) {
      console.error('Error deleting banner:', error);
      toast.error('Error deleting banner');
    }
  };

  const handleToggleActive = async (bannerId, currentStatus) => {
    try {
      const token = localStorage.getItem('myToken');
      const response = await fetch(`/api/admin/banners/${bannerId}/toggle`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isActive: !currentStatus })
      });

      if (response.ok) {
        toast.success('Banner status updated!');
        fetchBanners();
      } else {
        toast.error('Failed to update banner status');
      }
    } catch (error) {
      console.error('Error updating banner status:', error);
      toast.error('Error updating banner status');
    }
  };

  const clearPreview = () => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900 dark:text-gray-100">
      <Sidebar />
      <div className="flex-1 min-w-0 p-10 ml-[250px] transition-colors duration-300">
        {/* Enhanced Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
                <BarChart3 className="w-8 h-8 text-blue-600" />
                Banner Management
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg">Manage hero section banners for the homepage</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>Total Banners: {banners.length}</span>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Users className="w-4 h-4" />
                  <span>Active: {banners.filter(b => b.isActive).length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Upload Form */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Plus className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              Upload New Banner
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <AlertCircle className="w-4 h-4" />
              <span>Recommended: 3000x340px</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Form Fields */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Banner Title *
                </label>
                <input
                  type="text"
                  value={bannerData.title}
                  onChange={(e) => setBannerData({...bannerData, title: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
                  placeholder="Enter banner title"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Banner Subtitle
                </label>
                <input
                  type="text"
                  value={bannerData.subtitle}
                  onChange={(e) => setBannerData({...bannerData, subtitle: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
                  placeholder="Enter banner subtitle"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Banner Slug (Optional)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={bannerData.slug}
                    onChange={(e) => {
                      // Auto-format slug: lowercase, replace spaces with hyphens, remove special chars
                      const formattedSlug = e.target.value
                        .toLowerCase()
                        .replace(/[^a-z0-9\s-]/g, '')
                        .replace(/\s+/g, '-')
                        .replace(/-+/g, '-')
                        .trim();
                      setBannerData({...bannerData, slug: formattedSlug});
                    }}
                    className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
                    placeholder="banner-slug-name"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      // Auto-generate slug from title
                      if (bannerData.title) {
                        const autoSlug = bannerData.title
                          .toLowerCase()
                          .replace(/[^a-z0-9\s-]/g, '')
                          .replace(/\s+/g, '-')
                          .replace(/-+/g, '-')
                          .trim();
                        setBannerData({...bannerData, slug: autoSlug});
                      }
                    }}
                    className="px-4 py-3 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors duration-200 text-sm font-medium"
                    disabled={!bannerData.title}
                  >
                    Auto
                  </button>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  URL-friendly identifier for the banner (e.g., "summer-sale-banner")
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={bannerData.order}
                    onChange={(e) => setBannerData({...bannerData, order: parseInt(e.target.value) || 0})}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
                    placeholder="0"
                  />
                </div>
                <div className="flex items-center justify-center">
                  <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <input
                      type="checkbox"
                      id="isActive"
                      checked={bannerData.isActive}
                      onChange={(e) => setBannerData({...bannerData, isActive: e.target.checked})}
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="isActive" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Active
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Banner Image *
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="w-full px-4 py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200 hover:border-blue-400"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <Upload className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  Recommended: 1920x340px, Max size: 5MB
                </p>
              </div>
            </div>

            {/* Right Column - Enhanced Preview */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Preview</h3>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {previewUrl ? 'Image loaded' : 'No image'}
                </div>
              </div>
              
              {previewUrl ? (
                <div className="relative group">
                  <img
                    src={previewUrl}
                    alt="Banner preview"
                    className="w-full h-64 object-cover rounded-xl border-2 border-gray-200 dark:border-gray-600 shadow-lg"
                  />
                  <button
                    onClick={clearPreview}
                    className="absolute top-3 right-3 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-all duration-200 opacity-0 group-hover:opacity-100"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="absolute bottom-3 left-3 right-3 bg-black bg-opacity-50 text-white p-2 rounded-lg">
                    <p className="text-sm font-medium">{bannerData.title || 'Banner Title'}</p>
                    {bannerData.subtitle && (
                      <p className="text-xs opacity-90">{bannerData.subtitle}</p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="w-full h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl flex items-center justify-center bg-gray-50 dark:bg-gray-700">
                  <div className="text-center text-gray-500 dark:text-gray-400">
                    <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">No image selected</p>
                    <p className="text-sm">Choose an image to see preview</p>
                  </div>
                </div>
              )}

              <button
                onClick={handleUpload}
                disabled={!selectedFile || uploading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-xl hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed flex items-center justify-center gap-3 font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:transform-none"
              >
                {uploading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Uploading Banner...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Upload Banner
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Banners List */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <Settings className="w-6 h-6 text-blue-600" />
                Current Banners
              </h2>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <span>Total: {banners.length}</span>
                <span>•</span>
                <span>Active: {banners.filter(b => b.isActive).length}</span>
              </div>
            </div>
          </div>
          
          {loading ? (
            <div className="p-12 text-center">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">Loading banners...</p>
            </div>
          ) : banners.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <ImageIcon className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No banners yet</h3>
              <p className="text-gray-500 dark:text-gray-400">Upload your first banner to get started</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {banners.map((banner) => (
                <div key={banner._id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                  <div className="flex items-start gap-6">
                    <div className="relative group">
                      <img
                        src={banner.cdn_url || banner.url}
                        alt={banner.title}
                        className="w-40 h-24 object-cover rounded-xl border-2 border-gray-200 dark:border-gray-600 shadow-md group-hover:shadow-lg transition-shadow duration-200"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-xl transition-all duration-200 flex items-center justify-center">
                        <Eye className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{banner.title}</h3>
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          banner.isActive 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                        }`}>
                          {banner.isActive ? 'Active' : 'Inactive'}
                        </span>
                        <span className="px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">
                          Order: {banner.order}
                        </span>
                      </div>
                      
                      {banner.subtitle && (
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 font-medium">{banner.subtitle}</p>
                      )}
                      
                      {banner.slug && (
                        <div className="mb-3">
                          <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">
                            Slug: <span 
                              className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                              onClick={() => {
                                navigator.clipboard.writeText(banner.slug);
                                toast.success('Slug copied to clipboard!');
                              }}
                              title="Click to copy slug"
                            >
                              {banner.slug}
                            </span>
                          </p>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Uploaded: {new Date(banner.createdAt).toLocaleDateString()}
                        </span>
                        {banner.uploadedBy && (
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            By: {banner.uploadedBy.name || 'Admin'}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleToggleActive(banner._id, banner.isActive)}
                        className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 flex items-center gap-2 ${
                          banner.isActive
                            ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-200 dark:hover:bg-yellow-800'
                            : 'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-200 dark:hover:bg-green-800'
                        }`}
                      >
                        <Settings className="w-4 h-4" />
                        {banner.isActive ? 'Deactivate' : 'Activate'}
                      </button>
                      
                      <button
                        onClick={() => handleDelete(banner._id)}
                        className="px-4 py-2 text-sm font-semibold bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900 dark:text-red-200 dark:hover:bg-red-800 rounded-lg transition-all duration-200 flex items-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BannerManagement;
