import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllBanners } from '../Redux/slice/BannerSlice.jsx';
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
  MdComputer,
  MdPhoneAndroid,
  MdSave,
  MdClose,
  MdRefresh
} from 'react-icons/md';

const UnifiedBannerManagement = () => {
  const dispatch = useDispatch();
  const { allBanners, loading: bannerLoading } = useSelector(state => state.banner);
  const { allSmallBanners, loading: smallBannerLoading } = useSelector(state => state.smallBanner);
  
  const [activeTab, setActiveTab] = useState('hero'); // 'hero' or 'small'
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [bannerData, setBannerData] = useState({
    title: '',
    subtitle: '',
    slug: '',
    link: '',
    isActive: false, // Default to inactive so banners don't show immediately after upload
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
    if (activeTab === 'hero') {
      dispatch(fetchAllBanners());
    } else {
      dispatch(fetchAllSmallBanners());
    }
  }, [dispatch, activeTab]);

  const currentBanners = activeTab === 'hero' ? allBanners : allSmallBanners;
  const loading = activeTab === 'hero' ? bannerLoading : smallBannerLoading;

  const handleFileSelect = (file, type) => {
    if (type === 'desktop') {
      setSelectedDesktopFile(file);
      const url = URL.createObjectURL(file);
      setDesktopPreviewUrl(url);
    } else {
      setSelectedMobileFile(file);
      const url = URL.createObjectURL(file);
      setMobilePreviewUrl(url);
    }
  };

  const handleUpload = async () => {
    if (activeTab === 'hero') {
      await uploadHeroBanner();
    } else {
      await uploadSmallBanner();
    }
  };

  const uploadHeroBanner = async () => {
    try {
      const formData = new FormData();
      formData.append('title', bannerData.title);
      formData.append('subtitle', bannerData.subtitle);
      formData.append('slug', bannerData.slug);
      formData.append('link', bannerData.link);
      formData.append('isActive', bannerData.isActive);
      formData.append('order', bannerData.order);
      
      if (selectedDesktopFile) {
        formData.append('bannerImage', selectedDesktopFile);
      }

      // Use environment-based API detection
      const isDevelopment = import.meta.env.DEV;
      const apiBase = isDevelopment 
        ? (import.meta.env.VITE_API_BASE || 'http://localhost:3500')
        : 'https://api.100acress.com';

      // Use PATCH for updates, POST for new banners
      const method = editingBanner ? 'PATCH' : 'POST';
      const url = editingBanner 
        ? `${apiBase}/api/admin/banners/${editingBanner._id}`
        : `${apiBase}/api/admin/banners/upload`;

      console.log('Hero banner update - FormData contents:');
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      const response = await fetch(url, {
        method: method,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('myToken')}`
        },
        body: formData
      });

      console.log('Hero banner update response status:', response.status);

      if (response.ok) {
        toast.success(editingBanner ? 'Hero banner updated successfully!' : 'Hero banner uploaded successfully!');
        dispatch(fetchAllBanners());
        resetForm();
      } else {
        const errorText = await response.text();
        console.error('Hero banner update error response:', errorText);
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch (e) {
          errorData = { message: errorText };
        }
        toast.error(errorData.message || `Failed to ${editingBanner ? 'update' : 'upload'} hero banner`);
      }
    } catch (error) {
      console.error(`Error ${editingBanner ? 'updating' : 'uploading'} hero banner:`, error);
      toast.error(`Error ${editingBanner ? 'updating' : 'uploading'} hero banner`);
    }
  };

  const uploadSmallBanner = async () => {
    try {
      // Validate required fields
      if (!bannerData.title) {
        toast.error('Title is required');
        return;
      }
      if (!bannerData.slug) {
        toast.error('Slug is required');
        return;
      }
      if (!selectedDesktopFile && !bannerData.desktopImage) {
        toast.error('Desktop image is required');
        return;
      }

      const formData = new FormData();
      formData.append('title', bannerData.title);
      formData.append('subtitle', bannerData.subtitle);
      formData.append('slug', bannerData.slug);
      formData.append('link', bannerData.link);
      formData.append('isActive', bannerData.isActive);
      formData.append('order', bannerData.order);
      formData.append('position', bannerData.position);
      formData.append('size', bannerData.size);
      
      // Only append image URLs if no files are selected
      if (!selectedDesktopFile && bannerData.desktopImage) {
        formData.append('desktopImage', bannerData.desktopImage);
      }
      if (!selectedMobileFile && bannerData.mobileImage) {
        formData.append('mobileImage', bannerData.mobileImage);
      }
      
      // Append files if selected
      if (selectedDesktopFile) {
        formData.append('desktopBannerImage', selectedDesktopFile);
      }
      if (selectedMobileFile) {
        formData.append('mobileBannerImage', selectedMobileFile);
      }

      // Use environment-based API detection
      const isDevelopment = import.meta.env.DEV;
      const apiBase = isDevelopment 
        ? (import.meta.env.VITE_API_BASE || 'http://localhost:3500')
        : 'https://api.100acress.com';

      // Use PUT for updates, POST for new banners
      const method = editingBanner ? 'PUT' : 'POST';
      const url = editingBanner 
        ? `${apiBase}/api/admin/small-banners/${editingBanner._id}`
        : `${apiBase}/api/admin/small-banners/upload`;

      console.log('Small banner upload - FormData contents:');
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      const response = await fetch(url, {
        method: method,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('myToken')}`
        },
        body: formData
      });

      console.log('Small banner upload response status:', response.status);

      if (response.ok) {
        toast.success(editingBanner ? 'Small banner updated successfully!' : 'Small banner uploaded successfully!');
        dispatch(fetchAllSmallBanners());
        resetForm();
      } else {
        const errorText = await response.text();
        console.error('Small banner upload error response:', errorText);
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch (e) {
          errorData = { message: errorText };
        }
        toast.error(errorData.message || `Failed to ${editingBanner ? 'update' : 'upload'} small banner`);
      }
    } catch (error) {
      console.error(`Error ${editingBanner ? 'updating' : 'uploading'} small banner:`, error);
      toast.error(`Error ${editingBanner ? 'updating' : 'uploading'} small banner`);
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
    if (window.confirm('Are you sure you want to delete this banner?')) {
      try {
        const endpoint = activeTab === 'hero' 
          ? `${import.meta.env.VITE_API_BASE}/api/admin/banners/${bannerId}`
          : `${import.meta.env.VITE_API_BASE}/api/admin/small-banners/${bannerId}`;
          
        const response = await fetch(endpoint, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('myToken')}`
          }
        });

        if (response.ok) {
          toast.success('Banner deleted successfully!');
          if (activeTab === 'hero') {
            dispatch(fetchAllBanners());
          } else {
            dispatch(fetchAllSmallBanners());
          }
        } else {
          toast.error('Failed to delete banner');
        }
      } catch (error) {
        console.error('Error deleting banner:', error);
        toast.error('Error deleting banner');
      }
    }
  };

  const handleToggleStatus = async (bannerId, currentStatus) => {
    try {
      const endpoint = activeTab === 'hero' 
        ? `${import.meta.env.VITE_API_BASE}/api/admin/banners/${bannerId}/toggle`
        : `${import.meta.env.VITE_API_BASE}/api/admin/small-banners/${bannerId}/toggle`;
        
      const response = await fetch(endpoint, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('myToken')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isActive: !currentStatus })
      });

      if (response.ok) {
        toast.success(`Banner ${!currentStatus ? 'activated' : 'deactivated'} successfully!`);
        if (activeTab === 'hero') {
          dispatch(fetchAllBanners());
        } else {
          dispatch(fetchAllSmallBanners());
        }
      } else {
        toast.error('Failed to update banner status');
      }
    } catch (error) {
      console.error('Error updating banner status:', error);
      toast.error('Error updating banner status');
    }
  };

  const resetForm = () => {
    setBannerData({
      title: '',
      subtitle: '',
      slug: '',
      link: '',
      isActive: false, // Default to inactive for new uploads
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

  const generateSlug = (title) => {
    const baseSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
    
    // Add timestamp to make slug unique
    const timestamp = Date.now().toString().slice(-6);
    return `${baseSlug}-${timestamp}`;
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setBannerData(prev => ({
      ...prev,
      title,
      // Generate slug for both new and editing banners
      slug: generateSlug(title)
    }));
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 dark:text-gray-100 min-h-screen flex">
      <Sidebar />
      <div className="flex-1 p-8 ml-[250px] transition-colors duration-300">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MdImage className="text-2xl text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                  Unified Banner Management
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Manage both hero section and small banners
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  if (activeTab === 'hero') {
                    dispatch(fetchAllBanners());
                  } else {
                    dispatch(fetchAllSmallBanners());
                  }
                }}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <MdRefresh className="text-lg" />
                Refresh
              </button>
              <button
                onClick={() => setShowUploadForm(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <MdAdd className="text-lg" />
                Add Banner
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mt-6">
            <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('hero')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'hero'
                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Hero Section Banners
              </button>
              <button
                onClick={() => setActiveTab('small')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'small'
                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Small Banners
              </button>
            </div>
          </div>
        </div>

        {/* Banner List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">Loading banners...</p>
            </div>
          ) : currentBanners.length === 0 ? (
            <div className="p-8 text-center">
              <MdImage className="text-6xl text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                No {activeTab === 'hero' ? 'hero' : 'small'} banners found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Get started by adding your first banner
              </p>
              <button
                onClick={() => setShowUploadForm(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <MdAdd className="text-lg" />
                Add Banner
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Banner
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Title
                    </th>
                    {activeTab === 'small' && (
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Size
                      </th>
                    )}
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Order
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {currentBanners.map((banner) => (
                    <tr key={banner._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-12 w-20 flex-shrink-0">
                            <img
                              className="h-12 w-20 rounded-lg object-cover"
                              src={
                                activeTab === 'hero' 
                                  ? banner.image?.cdn_url || banner.image?.url || '/Images/placeholder-banner.jpg'
                                  : banner.desktopImage?.cdn_url || banner.desktopImage?.url || '/Images/placeholder-banner.jpg'
                              }
                              alt={banner.title}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {banner.title}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {banner.subtitle}
                        </div>
                      </td>
                      {activeTab === 'small' && (
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {banner.size}
                          </span>
                        </td>
                      )}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          banner.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {banner.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                        {banner.order}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleToggleStatus(banner._id, banner.isActive)}
                            className={`p-2 rounded-lg transition-colors ${
                              banner.isActive 
                                ? 'text-red-600 hover:bg-red-100' 
                                : 'text-green-600 hover:bg-green-100'
                            }`}
                            title={banner.isActive ? 'Deactivate' : 'Activate'}
                          >
                            {banner.isActive ? <MdVisibilityOff /> : <MdVisibility />}
                          </button>
                          <button
                            onClick={() => handleEdit(banner)}
                            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <MdEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(banner._id)}
                            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <MdDelete />
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

        {/* Upload Form Modal */}
        {showUploadForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    {editingBanner ? 'Edit' : 'Add'} {activeTab === 'hero' ? 'Hero' : 'Small'} Banner
                  </h2>
                  <button
                    onClick={resetForm}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <MdClose className="text-xl" />
                  </button>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); handleUpload(); }} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Title *
                      </label>
                      <input
                        type="text"
                        value={bannerData.title}
                        onChange={handleTitleChange}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-100"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Subtitle
                      </label>
                      <input
                        type="text"
                        value={bannerData.subtitle}
                        onChange={(e) => setBannerData(prev => ({ ...prev, subtitle: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-100"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Slug *
                      </label>
                      <input
                        type="text"
                        value={bannerData.slug}
                        onChange={(e) => setBannerData(prev => ({ ...prev, slug: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-100"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Link
                      </label>
                      <input
                        type="url"
                        value={bannerData.link}
                        onChange={(e) => setBannerData(prev => ({ ...prev, link: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-100"
                        placeholder="https://www.100acress.com/slug"
                      />
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Leave empty to use slug-based link: https://www.100acress.com/{bannerData.slug || 'your-slug'}
                      </p>
                    </div>
                  </div>

                  {activeTab === 'small' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Position
                        </label>
                        <select
                          value={bannerData.position}
                          onChange={(e) => setBannerData(prev => ({ ...prev, position: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-100"
                        >
                          <option value="top">Top</option>
                          <option value="bottom">Bottom</option>
                          <option value="center">Center</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Size
                        </label>
                        <select
                          value={bannerData.size}
                          onChange={(e) => setBannerData(prev => ({ ...prev, size: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-100"
                        >
                          <option value="small">Small</option>
                          <option value="medium">Medium</option>
                          <option value="large">Large</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Order
                        </label>
                        <input
                          type="number"
                          value={bannerData.order}
                          onChange={(e) => setBannerData(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-100"
                        />
                      </div>
                    </div>
                  )}

                  {/* Image Upload Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                      {activeTab === 'hero' ? 'Banner Image' : 'Banner Images'}
                    </h3>
                    
                    {activeTab === 'hero' ? (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Desktop Image *
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileSelect(e.target.files[0], 'desktop')}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        {desktopPreviewUrl && (
                          <div className="mt-2">
                            <img src={desktopPreviewUrl} alt="Preview" className="h-32 w-auto rounded-lg" />
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {/* Desktop Image Section */}
                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                          <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                            <MdComputer className="text-blue-600" />
                            Desktop Image
                          </h4>
                          
                          <div className="mb-4">
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                              Desktop Image Link
                            </label>
                            <input
                              type="url"
                              name="desktopImage"
                              value={bannerData.desktopImage}
                              onChange={(e) => setBannerData(prev => ({ ...prev, desktopImage: e.target.value }))}
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
                              onChange={(e) => handleFileSelect(e.target.files[0], 'desktop')}
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
                          <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                            <MdPhoneAndroid className="text-green-600" />
                            Mobile Image
                          </h4>
                          
                          <div className="mb-4">
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                              Mobile Image Link
                            </label>
                            <input
                              type="url"
                              name="mobileImage"
                              value={bannerData.mobileImage}
                              onChange={(e) => setBannerData(prev => ({ ...prev, mobileImage: e.target.value }))}
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
                              onChange={(e) => handleFileSelect(e.target.files[0], 'mobile')}
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
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={bannerData.isActive}
                        onChange={(e) => setBannerData(prev => ({ ...prev, isActive: e.target.checked }))}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Active</span>
                    </label>
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <MdSave className="text-lg" />
                      {editingBanner ? 'Update' : 'Upload'} Banner
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UnifiedBannerManagement;
