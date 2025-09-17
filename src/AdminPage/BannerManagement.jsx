import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Upload, Image as ImageIcon, Trash2, Eye, Save, X } from 'lucide-react';

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
    link: '',
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
      formData.append('link', bannerData.link);
      formData.append('isActive', bannerData.isActive);
      formData.append('order', bannerData.order);

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
          link: '',
          isActive: true,
          order: 0
        });
        
        // Refresh banners list
        fetchBanners();
      } else {
        const error = await response.json();
        toast.error(error.message || 'Failed to upload banner');
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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Banner Management</h1>
          <p className="text-gray-600">Manage hero section banners for the homepage</p>
        </div>

        {/* Upload Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Upload New Banner
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Form Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Banner Title
                </label>
                <input
                  type="text"
                  value={bannerData.title}
                  onChange={(e) => setBannerData({...bannerData, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter banner title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Banner Subtitle
                </label>
                <input
                  type="text"
                  value={bannerData.subtitle}
                  onChange={(e) => setBannerData({...bannerData, subtitle: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter banner subtitle"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Banner Link (Optional)
                </label>
                <input
                  type="url"
                  value={bannerData.link}
                  onChange={(e) => setBannerData({...bannerData, link: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Display Order
                </label>
                <input
                  type="number"
                  value={bannerData.order}
                  onChange={(e) => setBannerData({...bannerData, order: parseInt(e.target.value) || 0})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={bannerData.isActive}
                  onChange={(e) => setBannerData({...bannerData, isActive: e.target.checked})}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
                  Active (visible on homepage)
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Banner Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Recommended: 1920x340px, Max size: 5MB
                </p>
              </div>
            </div>

            {/* Right Column - Preview */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-700">Preview</h3>
              
              {previewUrl ? (
                <div className="relative">
                  <img
                    src={previewUrl}
                    alt="Banner preview"
                    className="w-full h-48 object-cover rounded-lg border border-gray-200"
                  />
                  <button
                    onClick={clearPreview}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>No image selected</p>
                  </div>
                </div>
              )}

              <button
                onClick={handleUpload}
                disabled={!selectedFile || uploading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {uploading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Uploading...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Upload Banner
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Banners List */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Current Banners</h2>
          </div>
          
          {loading ? (
            <div className="p-6 text-center">
              <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
          ) : banners.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No banners uploaded yet
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {banners.map((banner) => (
                <div key={banner._id} className="p-6">
                  <div className="flex items-start gap-4">
                    <img
                      src={banner.cdn_url || banner.url}
                      alt={banner.title}
                      className="w-32 h-20 object-cover rounded-lg border border-gray-200"
                    />
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-gray-900">{banner.title}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          banner.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {banner.isActive ? 'Active' : 'Inactive'}
                        </span>
                        <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                          Order: {banner.order}
                        </span>
                      </div>
                      
                      {banner.subtitle && (
                        <p className="text-gray-600 text-sm mb-2">{banner.subtitle}</p>
                      )}
                      
                      {banner.link && (
                        <p className="text-blue-600 text-sm mb-2">
                          Link: <a href={banner.link} target="_blank" rel="noopener noreferrer" className="underline">{banner.link}</a>
                        </p>
                      )}
                      
                      <p className="text-xs text-gray-500">
                        Uploaded: {new Date(banner.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleToggleActive(banner._id, banner.isActive)}
                        className={`px-3 py-1 text-xs rounded-md ${
                          banner.isActive
                            ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                            : 'bg-green-100 text-green-800 hover:bg-green-200'
                        }`}
                      >
                        {banner.isActive ? 'Deactivate' : 'Activate'}
                      </button>
                      
                      <button
                        onClick={() => handleDelete(banner._id)}
                        className="px-3 py-1 text-xs bg-red-100 text-red-800 rounded-md hover:bg-red-200 flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
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
      <ToastContainer />
    </div>
  );
};

export default BannerManagement;
