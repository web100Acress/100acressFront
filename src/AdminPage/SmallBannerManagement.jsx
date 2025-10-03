import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllSmallBanners } from '../Redux/slice/SmallBannerSlice.jsx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './Sidebar';
import { 
  MdAdd, 
  MdEdit, 
  MdDelete, 
  MdVisibility, 
  MdVisibilityOff,
  MdImage,
  MdLink,
  MdTitle,
  MdDescription,
  MdSettings,
  MdRefresh,
  MdComputer,
  MdPhoneAndroid
} from 'react-icons/md';

const SmallBannerManagement = () => {
  const dispatch = useDispatch();
  const { allSmallBanners, loading, error } = useSelector(state => state.smallBanner);
  
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [bannerData, setBannerData] = useState({
    title: '',
    subtitle: '',
    slug: '',
    link: '',
    isActive: true,
    order: 0,
    position: 'bottom',
    size: 'small',
    desktopImage: '',
    mobileImage: ''
  });
  const [selectedDesktopFile, setSelectedDesktopFile] = useState(null);
  const [selectedMobileFile, setSelectedMobileFile] = useState(null);
  const [desktopPreviewUrl, setDesktopPreviewUrl] = useState(null);
  const [mobilePreviewUrl, setMobilePreviewUrl] = useState(null);

  useEffect(() => {
    dispatch(fetchAllSmallBanners());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBannerData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleDesktopFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedDesktopFile(file);
      const url = URL.createObjectURL(file);
      setDesktopPreviewUrl(url);
    }
  };

  const handleMobileFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedMobileFile(file);
      const url = URL.createObjectURL(file);
      setMobilePreviewUrl(url);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    
    if (!bannerData.title) {
      toast.error('Banner title is required');
      return;
    }

    if (!selectedDesktopFile && !selectedMobileFile && !bannerData.desktopImage && !bannerData.mobileImage && !editingBanner) {
      toast.error('At least one banner image (desktop or mobile) is required');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', bannerData.title);
      formData.append('subtitle', bannerData.subtitle);
      formData.append('slug', bannerData.slug);
      formData.append('link', bannerData.link);
      formData.append('isActive', bannerData.isActive);
      formData.append('order', bannerData.order);
      formData.append('position', bannerData.position);
      formData.append('size', bannerData.size);
      formData.append('desktopImage', bannerData.desktopImage);
      formData.append('mobileImage', bannerData.mobileImage);
      
      if (selectedDesktopFile) {
        formData.append('desktopBannerImage', selectedDesktopFile);
      }
      if (selectedMobileFile) {
        formData.append('mobileBannerImage', selectedMobileFile);
      }

      const token = localStorage.getItem('myToken');
      const url = editingBanner 
        ? `${import.meta.env.VITE_API_BASE}/api/admin/small-banners/${editingBanner._id}`
        : `${import.meta.env.VITE_API_BASE}/api/admin/small-banners/upload`;
      
      const method = editingBanner ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const result = await response.json();

      if (result.success) {
        toast.success(editingBanner ? 'Small banner updated successfully!' : 'Small banner uploaded successfully!');
        setShowUploadForm(false);
        setEditingBanner(null);
        setBannerData({
          title: '',
          subtitle: '',
          slug: '',
          link: '',
          isActive: true,
          order: 0,
          position: 'bottom',
          size: 'small'
        });
        setSelectedDesktopFile(null);
        setSelectedMobileFile(null);
        setDesktopPreviewUrl(null);
        setMobilePreviewUrl(null);
        dispatch(fetchAllSmallBanners());
      } else {
        toast.error(result.message || 'Failed to upload banner');
      }
    } catch (error) {
      console.error('Error uploading small banner:', error);
      toast.error('Error uploading banner');
    }
  };

  const handleEdit = (banner) => {
    setEditingBanner(banner);
    setBannerData({
      title: banner.title || '',
      subtitle: banner.subtitle || '',
      slug: banner.slug || '',
      link: banner.link || '',
      isActive: banner.isActive !== undefined ? banner.isActive : true,
      order: banner.order || 0,
      position: banner.position || 'bottom',
      size: banner.size || 'small',
      desktopImage: banner.desktopImage?.url || banner.desktopImage || '',
      mobileImage: banner.mobileImage?.url || banner.mobileImage || ''
    });
    setShowUploadForm(true);
  };

  const handleDelete = async (bannerId) => {
    if (!window.confirm('Are you sure you want to delete this small banner?')) {
      return;
    }

    try {
      const token = localStorage.getItem('myToken');
      const response = await fetch(`${import.meta.env.VITE_API_BASE}/api/admin/small-banners/${bannerId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Small banner deleted successfully!');
        dispatch(fetchAllSmallBanners());
      } else {
        toast.error(result.message || 'Failed to delete banner');
      }
    } catch (error) {
      console.error('Error deleting small banner:', error);
      toast.error('Error deleting banner');
    }
  };

  const handleToggleStatus = async (bannerId) => {
    try {
      const token = localStorage.getItem('myToken');
      const response = await fetch(`${import.meta.env.VITE_API_BASE}/api/admin/small-banners/${bannerId}/toggle`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const result = await response.json();

      if (result.success) {
        toast.success(result.message);
        dispatch(fetchAllSmallBanners());
      } else {
        toast.error(result.message || 'Failed to toggle banner status');
      }
    } catch (error) {
      console.error('Error toggling banner status:', error);
      toast.error('Error toggling banner status');
    }
  };

  const resetForm = () => {
    setBannerData({
      title: '',
      subtitle: '',
      slug: '',
      link: '',
      isActive: true,
      order: 0,
      position: 'bottom',
      size: 'small',
      desktopImage: '',
      mobileImage: ''
    });
    setSelectedDesktopFile(null);
    setSelectedMobileFile(null);
    setDesktopPreviewUrl(null);
    setMobilePreviewUrl(null);
    setEditingBanner(null);
    setShowUploadForm(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      
      <div className="ml-[250px] flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                  <MdImage className="text-blue-600" size={32} />
                  Small Banner Management
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  Manage small promotional banners for the hero section
                </p>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => dispatch(fetchAllSmallBanners())}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                >
                  <MdRefresh size={20} />
                  Refresh
                </button>
                <button
                  onClick={() => setShowUploadForm(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg"
                >
                  <MdAdd size={20} />
                  Add Small Banner
                </button>
              </div>
            </div>
          </div>

          {/* Upload Form Modal */}
          {showUploadForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {editingBanner ? 'Edit Small Banner' : 'Upload New Small Banner'}
                  </h2>
                  <button
                    onClick={resetForm}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleUpload} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                        <MdTitle className="inline mr-2" />
                        Banner Title *
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={bannerData.title}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
                        placeholder="Enter banner title"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                        <MdDescription className="inline mr-2" />
                        Banner Subtitle
                      </label>
                      <input
                        type="text"
                        name="subtitle"
                        value={bannerData.subtitle}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
                        placeholder="Enter banner subtitle"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                        Banner Slug
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          name="slug"
                          value={bannerData.slug}
                          onChange={(e) => {
                            const formattedSlug = e.target.value
                              .toLowerCase()
                              .replace(/[^a-z0-9\s-]/g, '')
                              .replace(/\s+/g, '-')
                              .replace(/-+/g, '-')
                              .trim();
                            setBannerData({...bannerData, slug: formattedSlug});
                          }}
                          className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
                          placeholder="banner-slug"
                        />
                        <button
                          type="button"
                          onClick={() => {
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
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                        <MdLink className="inline mr-2" />
                        Banner Link
                      </label>
                      <input
                        type="url"
                        name="link"
                        value={bannerData.link}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
                        placeholder="https://example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                        <MdSettings className="inline mr-2" />
                        Position
                      </label>
                      <select
                        name="position"
                        value={bannerData.position}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
                      >
                        <option value="bottom">Bottom</option>
                        <option value="top">Top</option>
                        <option value="left">Left</option>
                        <option value="right">Right</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                        Size
                      </label>
                      <select
                        name="size"
                        value={bannerData.size}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
                      >
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                        Order
                      </label>
                      <input
                        type="number"
                        name="order"
                        value={bannerData.order}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  {/* Desktop Image Section */}
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                      <MdComputer className="text-blue-600" />
                      Desktop Image
                    </h3>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Desktop Image Link
                      </label>
                      <input
                        type="url"
                        name="desktopImage"
                        value={bannerData.desktopImage}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
                        placeholder="https://example.com/desktop-image.jpg"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Or Upload Desktop Image
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleDesktopFileChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
                      />
                      {desktopPreviewUrl && (
                        <div className="mt-4">
                          <img
                            src={desktopPreviewUrl}
                            alt="Desktop Preview"
                            className="w-full max-w-xs h-32 object-cover rounded-lg border"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Mobile Image Section */}
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                      <MdPhoneAndroid className="text-green-600" />
                      Mobile Image
                    </h3>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Mobile Image Link
                      </label>
                      <input
                        type="url"
                        name="mobileImage"
                        value={bannerData.mobileImage}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
                        placeholder="https://example.com/mobile-image.jpg"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Or Upload Mobile Image
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleMobileFileChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
                      />
                      {mobilePreviewUrl && (
                        <div className="mt-4">
                          <img
                            src={mobilePreviewUrl}
                            alt="Mobile Preview"
                            className="w-full max-w-xs h-32 object-cover rounded-lg border"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="isActive"
                        checked={bannerData.isActive}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Active
                      </span>
                    </label>
                  </div>

                  <div className="flex justify-end gap-4 pt-6">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      {editingBanner ? 'Update Banner' : 'Upload Banner'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Banners List */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            {loading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-400">Loading small banners...</p>
              </div>
            ) : error ? (
              <div className="p-8 text-center">
                <p className="text-red-600 dark:text-red-400">Error loading banners: {error}</p>
              </div>
            ) : allSmallBanners.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-gray-600 dark:text-gray-400">No small banners found. Create your first banner!</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Banner
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Size
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Order
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {allSmallBanners.map((banner) => (
                      <tr key={banner._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-16 w-24 flex-shrink-0">
                              <img
                                className="h-16 w-24 object-cover rounded-lg"
                                src={
                                  banner.desktopImage?.cdn_url ||
                                  banner.desktopImage?.url ||
                                  banner.mobileImage?.cdn_url ||
                                  banner.mobileImage?.url ||
                                  banner.image?.cdn_url ||
                                  banner.image?.url ||
                                  '/Images/placeholder-banner.jpg'
                                }
                                alt={banner.title}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {banner.title}
                            </div>
                            {banner.subtitle && (
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {banner.subtitle}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            banner.size === 'large' ? 'bg-purple-100 text-purple-800' :
                            banner.size === 'medium' ? 'bg-blue-100 text-blue-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {banner.size}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handleToggleStatus(banner._id)}
                            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200 ${
                              banner.isActive
                                ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                : 'bg-red-100 text-red-800 hover:bg-red-200'
                            }`}
                          >
                            {banner.isActive ? <MdVisibility size={16} /> : <MdVisibilityOff size={16} />}
                            {banner.isActive ? 'Active' : 'Inactive'}
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {banner.order}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleEdit(banner)}
                              className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
                            >
                              <MdEdit size={20} />
                            </button>
                            <button
                              onClick={() => handleDelete(banner._id)}
                              className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-200"
                            >
                              <MdDelete size={20} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};

export default SmallBannerManagement;
