import React, { useState, useEffect } from 'react';
import {
  FaAws,
  FaUpload,
  FaFolder,
  FaImage,
  FaTrash,
  FaDownload,
  FaEye,
  FaSearch,
  FaFilter,
  FaPlus,
  FaEdit
} from 'react-icons/fa';
import { MdCloudUpload, MdRefresh } from 'react-icons/md';
import { toast } from 'react-toastify';
import axios from 'axios';
import Sidebar from './Sidebar';

const S3Manager = () => {
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState('');
  const [currentPath, setCurrentPath] = useState(''); // Track current folder path
  const [folderHistory, setFolderHistory] = useState([]); // Breadcrumb history
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [selectedImages, setSelectedImages] = useState(new Set());
  const [showBatchActions, setShowBatchActions] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingImage, setEditingImage] = useState(null);
  const [newImageName, setNewImageName] = useState('');
  const [showCitiesDashboard, setShowCitiesDashboard] = useState(true);
  const [citiesImages, setCitiesImages] = useState([]);
  const [imageErrors, setImageErrors] = useState({});

  // File validation constants
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
  const MAX_FILES_PER_UPLOAD = 20;

  // Sample S3 folders - Replace with actual API call
  const sampleFolders = [
    'property-images',
    'project-banners',
    'blog-images',
    'user-uploads',
    'testimonials',
    'gallery',
    'logos',
    'certificates',
    'floor-plans',
    'location-maps'
  ];

  // Authentication check
  useEffect(() => {
    checkAuthentication();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchFolders();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (selectedFolder && isAuthenticated) {
      fetchImages();
    }
  }, [selectedFolder, isAuthenticated]);

  const checkAuthentication = () => {
    // Since this is now protected by PrivateRoute, we can assume user is authenticated
    setIsAuthenticated(true);
  };

  const fetchFolders = async (parentPath = '') => {
    try {
      // Actual S3 API call with parent parameter
      const response = await axios.get('/api/s3/folders', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('myToken')}`
        },
        params: {
          parent: parentPath
        }
      });

      if (response.data.success) {
        setFolders(response.data.folders);
        setCurrentPath(parentPath);

        // If no folder is selected and we have folders, select first one
        if (!selectedFolder && response.data.folders.length > 0) {
          const firstFolder = response.data.folders[0];
          setSelectedFolder(firstFolder.path || firstFolder.name);
        }
      } else {
        // Fallback to sample data
        setFolders(sampleFolders.map(name => ({ name, path: name, hasSubfolders: false })));
        if (!selectedFolder && sampleFolders.length > 0) {
          setSelectedFolder(sampleFolders[0]);
        }
      }
    } catch (error) {
      console.error('Error fetching folders:', error);
      toast.error('Failed to fetch folders from S3');
      // Fallback to sample data
      setFolders(sampleFolders.map(name => ({ name, path: name, hasSubfolders: false })));
      if (!selectedFolder && sampleFolders.length > 0) {
        setSelectedFolder(sampleFolders[0]);
      }
    }
  };

  // Process S3 image data to ensure consistent format
  const processS3Images = (images) => {
    if (!Array.isArray(images)) return [];
    
    return images.map(img => {
      // If it's already in the correct format, return as is
      if (img.url) {
        return {
          ...img,
          url: normalizeS3Url(img.url)
        };
      }
      
      // Handle different S3 response formats
      const key = img.Key || img.key || '';
      const url = img.Location || 
                (img.Bucket && img.Key ? `https://${img.Bucket}.s3.amazonaws.com/${img.Key}` : null) ||
                (img.bucket && img.key ? `https://${img.bucket}.s3.amazonaws.com/${img.key}` : null);
      
      return {
        id: img.id || key,
        key: key,
        name: img.name || key.split('/').pop() || 'image',
        url: normalizeS3Url(url || ''),
        size: img.Size ? formatFileSize(img.Size) : (img.size || 'N/A'),
        lastModified: img.LastModified ? new Date(img.LastModified).toLocaleDateString() : (img.lastModified || 'N/A'),
        type: key.split('.').pop()?.toLowerCase() || 'jpg'
      };
    });
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const fetchImages = async (forceFolder = null) => {
    const folderToFetch = forceFolder || selectedFolder;
    
    if (!folderToFetch) {
      console.log('No folder selected for image fetching');
      setImages([]);
      return;
    }

    console.log('🔄 Fetching images for folder:', folderToFetch);
    setLoading(true);

    // Clear previous images immediately for faster UI response
    setImages([]);

    try {
      const url = `/api/s3/images/${encodeURIComponent(folderToFetch)}`;
      console.log('📡 API Call:', url);
      console.log('📡 Full URL:', window.location.origin + url);
      console.log('📡 Folder to fetch:', folderToFetch);
      console.log('📡 Encoded folder:', encodeURIComponent(folderToFetch));
      
      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('myToken')}`
        },
        timeout: 15000 // Increased timeout
      });

      console.log('📦 Response received:', response.data);
      console.log('📋 Response structure:', {
        success: response.data.success,
        images: response.data.images,
        imagesType: typeof response.data.images,
        imagesIsArray: Array.isArray(response.data.images),
        imagesLength: response.data.images?.length,
        allKeys: Object.keys(response.data)
      });

      if (response.data.success) {
        const imagesList = processS3Images(response.data.images || []);
        console.log(`✅ Found ${imagesList.length} images in folder: ${folderToFetch}`);
        
        setImages(imagesList);
        setLoading(false);
        setImageErrors({}); // Reset error state on successful load

        if (imagesList.length === 0) {
          console.warn('⚠️ No images in response');
          console.warn('Full response data:', JSON.stringify(response.data, null, 2));
          toast.info(`No images found in ${folderToFetch} folder. Check if files were uploaded correctly.`);
        } else {
          console.log(`✅ Successfully loaded ${imagesList.length} images`);
          imagesList.forEach((img, idx) => {
            console.log(`  ${idx + 1}. ${img.name || img.key}`, img);
          });
        }
      } else {
        console.warn('❌ API returned success: false');
        setImages([]);
        setLoading(false);
        toast.info(`No images found in ${folderToFetch} folder`);
      }
    } catch (error) {
      console.error('❌ Error fetching images:', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      toast.error(`Failed to fetch images: ${error.message}`);
      setImages([]);
      setLoading(false);
    }
  };

  // Normalize S3 URLs to ensure consistent format
  const normalizeS3Url = (url) => {
    if (!url) return '';
    
    // Convert to HTTPS if it's an S3 URL
    if (url.startsWith('http://') && (url.includes('s3.') || url.includes('s3-'))) {
      return url.replace('http://', 'https://');
    }
    
    // Handle S3 URL formats
    if (url.includes('s3.amazonaws.com')) {
      // Convert path-style to virtual-hosted-style URL
      const urlObj = new URL(url);
      const pathParts = urlObj.pathname.split('/').filter(Boolean);
      if (pathParts.length >= 2) {
        const bucket = pathParts[0];
        const key = pathParts.slice(1).join('/');
        return `https://${bucket}.s3.${urlObj.hostname.split('.').slice(-2).join('.')}/${key}`;
      }
    }
    
    return url;
  };

  // Generate mock images for demonstration
  const generateMockImages = (folder) => {
    const imageCount = Math.floor(Math.random() * 12) + 3; // 3-15 images
    const mockImages = [];

    for (let i = 0; i < imageCount; i++) {
      const id = `${folder}-img-${i + 1}`;
      const types = ['jpg', 'png', 'webp'];
      const type = types[Math.floor(Math.random() * types.length)];
      const sizes = ['2.1 MB', '1.8 MB', '3.2 MB', '950 KB', '1.5 MB'];
      const size = sizes[Math.floor(Math.random() * sizes.length)];

      mockImages.push({
        id,
        key: `${folder}/sample-image-${i + 1}.${type}`,
        name: `sample-image-${i + 1}.${type}`,
        url: `https://picsum.photos/400/300?random=${i + folder.charCodeAt(0)}`,
        type,
        size,
        lastModified: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString()
      });
    }

    return mockImages;
  };

  const validateFiles = (files) => {
    const errors = [];

    if (files.length > MAX_FILES_PER_UPLOAD) {
      errors.push(`Maximum ${MAX_FILES_PER_UPLOAD} files allowed per upload`);
    }

    files.forEach((file, index) => {
      if (file.size > MAX_FILE_SIZE) {
        errors.push(`File ${index + 1} (${file.name}) exceeds 10MB limit`);
      }

      if (!ALLOWED_TYPES.includes(file.type)) {
        errors.push(`File ${index + 1} (${file.name}) is not a supported image format`);
      }
    });

    return errors;
  };

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);

    const validationErrors = validateFiles(files);
    if (validationErrors.length > 0) {
      validationErrors.forEach(error => toast.error(error));
      return;
    }

    setSelectedFiles(files);
    toast.success(`${files.length} valid files selected`);
  };

  const handleUpload = async () => {
    console.log('Upload clicked - selectedFiles:', selectedFiles.length, 'selectedFolder:', selectedFolder);
    
    if (selectedFiles.length === 0) {
      toast.error('Please select files to upload');
      return;
    }

    if (!selectedFolder) {
      toast.error('Please select a folder first');
      return;
    }

    setUploadLoading(true);
    try {
      const formData = new FormData();
      selectedFiles.forEach((file, index) => {
        console.log(`Adding file ${index + 1}: ${file.name}`);
        formData.append('files', file);
      });
      formData.append('folder', selectedFolder);
      
      console.log('Uploading to folder:', selectedFolder);

      // Replace with actual S3 upload API call
      const response = await axios.post('/api/s3/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('myToken')}`
        },
      });

      console.log('📤 Upload response:', response.data);
      console.log('📤 Upload details:', {
        success: response.data.success,
        message: response.data.message,
        uploadedFiles: response.data.uploadedFiles,
        folder: response.data.folder,
        count: response.data.count,
        allKeys: Object.keys(response.data)
      });
      
      if (response.data.success) {
        toast.success(`✅ Successfully uploaded ${selectedFiles.length} files to ${selectedFolder}`);
      } else {
        toast.warning(`⚠️ Upload completed but check response: ${response.data.message}`);
      }
      
      // Store the folder we uploaded to
      const uploadedToFolder = selectedFolder;
      
      // Close modal and clear files
      setShowUploadModal(false);
      setSelectedFiles([]);
      
      // Show refreshing message
      toast.info('🔄 Refreshing images...');
      
      // Refresh the images list after a short delay to ensure S3 has processed the upload
      console.log('🔄 Refreshing images for folder:', uploadedToFolder);
      setTimeout(async () => {
        console.log('⏰ Timeout completed, fetching images now...');
        
        // Force fetch images for the uploaded folder
        await fetchImages(uploadedToFolder);
        
        // If folder changed, switch back to uploaded folder
        if (selectedFolder !== uploadedToFolder) {
          console.log('📁 Switching to uploaded folder:', uploadedToFolder);
          setSelectedFolder(uploadedToFolder);
        }
        
        console.log('✅ Refresh completed for folder:', uploadedToFolder);
      }, 2000); // Increased to 2 seconds
    } catch (error) {
      console.error('Upload error:', error);
      console.error('Error details:', error.response?.data);
      toast.error(error.response?.data?.message || 'Failed to upload files. Please try again.');
    } finally {
      setUploadLoading(false);
    }
  };

  const handleDelete = async (imageKey) => {
    if (!window.confirm('Are you sure you want to delete this image?')) {
      return;
    }

    try {
      // Actual S3 delete API call using image key
      await axios.delete(`/api/s3/images/${encodeURIComponent(imageKey)}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('myToken')}`
        }
      });

      // Remove from local state
      setImages(images.filter(img => img.key !== imageKey));
      toast.success('Image deleted successfully');
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete image');
    }
  };

  // Batch Operations
  const handleImageSelect = (imageId) => {
    const newSelected = new Set(selectedImages);
    if (newSelected.has(imageId)) {
      newSelected.delete(imageId);
    } else {
      newSelected.add(imageId);
    }
    setSelectedImages(newSelected);
    setShowBatchActions(newSelected.size > 0);
  };

  const handleSelectAll = () => {
    if (selectedImages.size === filteredImages.length) {
      setSelectedImages(new Set());
      setShowBatchActions(false);
    } else {
      setSelectedImages(new Set(filteredImages.map(img => img.id)));
      setShowBatchActions(true);
    }
  };

  const handleBatchDelete = async () => {
    if (selectedImages.size === 0) return;

    if (!window.confirm(`Are you sure you want to delete ${selectedImages.size} selected images?`)) {
      return;
    }

    try {
      // Get image keys for selected images
      const selectedImageKeys = images
        .filter(img => selectedImages.has(img.id))
        .map(img => img.key);

      // Use batch delete API
      await axios.delete('/api/s3/images/batch', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('myToken')}`
        },
        data: {
          keys: selectedImageKeys
        }
      });

      setImages(images.filter(img => !selectedImages.has(img.id)));
      setSelectedImages(new Set());
      setShowBatchActions(false);
      toast.success(`Successfully deleted ${selectedImages.size} images`);
    } catch (error) {
      console.error('Batch delete error:', error);
      toast.error('Failed to delete some images');
    }
  };

  const handleBatchDownload = async () => {
    if (selectedImages.size === 0) return;

    try {
      const selectedImageData = images.filter(img => selectedImages.has(img.id));

      selectedImageData.forEach(image => {
        const link = document.createElement('a');
        link.href = image.url;
        link.download = image.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });

      toast.success(`Started download of ${selectedImages.size} images`);
    } catch (error) {
      console.error('Batch download error:', error);
      toast.error('Failed to download images');
    }
  };

  // Navigate to subfolder or select for images
  const handleFolderClick = (folder) => {
    if (folder.hasSubfolders) {
      // Add current path to history for breadcrumb
      const currentName = currentPath ? currentPath.split('/').pop() : 'Root';
      setFolderHistory([...folderHistory, { name: currentName, path: currentPath }]);
      // Fetch subfolders
      fetchFolders(folder.path);
      setSelectedFolder(''); // Clear selection until subfolders load
    } else {
      // Select folder for image viewing
      setSelectedFolder(folder.path || folder.name);
    }
  };

  // Debounce function for better performance
  const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  // Select folder for viewing images (separate from navigation)
  const handleFolderSelect = debounce((folder) => {
    const folderPath = folder.path || folder.name;
    console.log('Selecting folder for images:', folderPath);
    setSelectedFolder(folderPath);
  }, 300);

  // Navigate back to parent folder
  const handleBackNavigation = () => {
    if (folderHistory.length > 0) {
      const parent = folderHistory[folderHistory.length - 1];
      setFolderHistory(folderHistory.slice(0, -1));
      fetchFolders(parent.path);
      setSelectedFolder('');
    }
  };

  // Navigate to root
  const handleRootNavigation = () => {
    setFolderHistory([]);
    fetchFolders('');
    setSelectedFolder('');
  };

  const handleCreateFolder = async () => {
    if (!newFolderName.trim()) {
      toast.error('Please enter folder name');
      return;
    }

    try {
      // Create folder in current path
      const folderPath = currentPath ? `${currentPath}/${newFolderName.trim()}` : newFolderName.trim();

      const response = await axios.post('/api/s3/folders', {
        name: folderPath
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('myToken')}`
        }
      });

      if (response.data.success) {
        // Refresh current folder view
        fetchFolders(currentPath);
        setNewFolderName('');
        setShowCreateFolder(false);
        toast.success('Folder created successfully');
      } else {
        toast.error('Failed to create folder');
      }
    } catch (error) {
      console.error('Create folder error:', error);
      toast.error('Failed to create folder');
    }
  };

  const filteredImages = images.filter(image => {
    const matchesSearch = image.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || image.type.includes(filterType);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900 dark:text-gray-100">
      <Sidebar />
      <div className="flex-1 min-w-0 p-6 ml-[240px] transition-colors duration-300">
        <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg">
                <FaAws className="text-white text-2xl" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  S3 Media Manager
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Manage your AWS S3 bucket images and folders
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCreateFolder(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FaPlus />
                New Folder
              </button>
              <button
                onClick={() => setShowUploadModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <FaUpload />
                Upload Images
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Folders Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <FaFolder className="text-yellow-500" />
                  <h2 className="font-semibold text-gray-900 dark:text-white">Folders</h2>
                </div>
                {folderHistory.length > 0 && (
                  <button
                    onClick={handleBackNavigation}
                    className="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    title="Go Back"
                  >
                    ←
                  </button>
                )}
              </div>

              {/* Breadcrumb */}
              {folderHistory.length > 0 && (
                <div className="mb-3 text-xs text-gray-500 dark:text-gray-400">
                  <button
                    onClick={handleRootNavigation}
                    className="hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    Root
                  </button>
                  {folderHistory.map((item, index) => (
                    <span key={index}>
                      {' / '}
                      <span>{item.name || 'Folder'}</span>
                    </span>
                  ))}
                  {currentPath && <span> / {currentPath.split('/').pop()}</span>}
                </div>
              )}

              <div className="space-y-2">
                {folders.map((folder, index) => (
                  <div key={index} className="relative">
                    <button
                      onClick={() => handleFolderClick(folder)}
                      onDoubleClick={() => handleFolderSelect(folder)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedFolder === (folder.path || folder.name)
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                      title={folder.hasSubfolders ? "Click to navigate, Double-click to view images" : "Click to view images"}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FaFolder className="text-sm" />
                          <span className="text-sm truncate">{folder.name || folder}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {folder.hasSubfolders && (
                            <span className="text-xs text-gray-400">→</span>
                          )}
                          {!folder.hasSubfolders && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleFolderSelect(folder);
                              }}
                              className="text-xs text-blue-500 hover:text-blue-700"
                              title="View images"
                            >
                              📁
                            </button>
                          )}
                        </div>
                      </div>
                    </button>

                    {/* Show "View Images" button for folders with subfolders */}
                    {folder.hasSubfolders && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFolderSelect(folder);
                        }}
                        className="absolute right-8 top-1/2 transform -translate-y-1/2 text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition-colors"
                        title="View images in this folder"
                      >
                        View
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              {/* Controls */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search images..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    <option value="all">All Types</option>
                    <option value="jpeg">JPEG</option>
                    <option value="png">PNG</option>
                    <option value="webp">WebP</option>
                  </select>
                  <button
                    onClick={async () => {
                      console.log('🔄 Manual refresh clicked for folder:', selectedFolder);
                      toast.info('🔄 Refreshing images...');
                      await fetchImages(selectedFolder);
                    }}
                    disabled={loading || !selectedFolder}
                    className="px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:bg-gray-400 flex items-center gap-2"
                    title={selectedFolder ? `Refresh images from ${selectedFolder}` : 'Select a folder first'}
                  >
                    <MdRefresh className={loading ? 'animate-spin' : ''} />
                    {loading ? 'Loading...' : 'Refresh'}
                  </button>
                </div>
              </div>

              {/* Current Folder Info & Batch Actions */}
              <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center gap-2">
                  <FaFolder className="text-yellow-500" />
                  <span className="font-medium text-gray-900 dark:text-white">
                    Current Folder: {selectedFolder || currentPath || 'Root'}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    ({filteredImages.length} images)
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSelectAll}
                    className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    {selectedImages.size === filteredImages.length ? 'Deselect All' : 'Select All'}
                  </button>

                  {showBatchActions && (
                    <div className="flex gap-2">
                      <button
                        onClick={handleBatchDownload}
                        className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors flex items-center gap-1"
                      >
                        <FaDownload className="text-xs" />
                        Download ({selectedImages.size})
                      </button>
                      <button
                        onClick={handleBatchDelete}
                        className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors flex items-center gap-1"
                      >
                        <FaTrash className="text-xs" />
                        Delete ({selectedImages.size})
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Images Grid */}
              {loading ? (
                <div className="space-y-4">
                  <div className="flex justify-center items-center py-8">
                    <div className="flex items-center gap-3">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
                      <span className="text-gray-600 dark:text-gray-400">Loading images...</span>
                    </div>
                  </div>
                  {/* Skeleton Loading */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {[...Array(8)].map((_, index) => (
                      <div key={index} className="bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden animate-pulse">
                        <div className="w-full h-48 bg-gray-300 dark:bg-gray-600"></div>
                        <div className="p-3 space-y-2">
                          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                          <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredImages.map((image) => (
                    <div
                      key={image.id}
                      className={`group relative bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition-shadow ${
                        selectedImages.has(image.id) ? 'ring-2 ring-blue-500' : ''
                      }`}
                    >
                      {/* Selection Checkbox */}
                      <div className="absolute top-2 left-2 z-10">
                        <input
                          type="checkbox"
                          checked={selectedImages.has(image.id)}
                          onChange={() => handleImageSelect(image.id)}
                          className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                        />
                      </div>

                      <div className="aspect-w-16 aspect-h-12 relative">
                        {!imageErrors[image.id] ? (
                          <img
                            src={image.url}
                            alt={image.name}
                            className="w-full h-48 object-cover transition-opacity duration-300"
                            loading="lazy"
                            onLoad={(e) => {
                              e.target.style.opacity = '1';
                            }}
                            onError={(e) => {
                              console.error(`Failed to load image: ${image.url}`);
                              // Try with HTTPS if it's an S3 URL
                              if (image.url && image.url.startsWith('http://')) {
                                const httpsUrl = image.url.replace('http://', 'https://');
                                e.target.src = httpsUrl;
                                e.target.onerror = null; // Prevent infinite loop
                              } else {
                                // Mark this image as failed to load
                                setImageErrors(prev => ({
                                  ...prev,
                                  [image.id]: true
                                }));
                              }
                            }}
                            style={{ opacity: '0' }}
                          />
                        ) : (
                          <div className="w-full h-48 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                            <div className="text-center p-4">
                              <FaImage className="mx-auto text-gray-400 text-2xl mb-2" />
                              <p className="text-gray-500 text-sm">Failed to load image</p>
                              <button 
                                onClick={() => {
                                  setImageErrors(prev => ({
                                    ...prev,
                                    [image.id]: false
                                  }));
                                }}
                                className="mt-2 text-xs text-blue-500 hover:underline"
                              >
                                Retry
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="flex gap-2">
                          <button
                            onClick={() => window.open(image.url, '_blank')}
                            className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                            title="View"
                          >
                            <FaEye />
                          </button>
                          <button
                            onClick={() => {
                              const link = document.createElement('a');
                              link.href = image.url;
                              link.download = image.name;
                              link.click();
                            }}
                            className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
                            title="Download"
                          >
                            <FaDownload />
                          </button>
                          <button
                            onClick={() => handleDelete(image.key)}
                            className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>

                      {/* Image Info */}
                      <div className="p-3">
                        <h3 className="font-medium text-gray-900 dark:text-white text-sm truncate">
                          {image.name}
                        </h3>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-xs text-gray-600 dark:text-gray-400">
                            {image.size}
                          </span>
                          <span className="text-xs text-gray-600 dark:text-gray-400">
                            {image.lastModified}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {filteredImages.length === 0 && !loading && (
                <div className="text-center py-12">
                  <FaImage className="mx-auto text-6xl text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No images found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {searchTerm ? 'Try adjusting your search terms' : 'Upload some images to get started'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Upload Images
                </h3>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  ✕
                </button>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  📁 Step 1: Select Destination Folder
                </label>
                <select
                  value={selectedFolder}
                  onChange={(e) => {
                    setSelectedFolder(e.target.value);
                    console.log('Folder selected:', e.target.value);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="">-- Choose upload destination --</option>
                  {folders.map((folder, index) => {
                    // Handle both string folders and object folders
                    const folderValue = typeof folder === 'string' ? folder : (folder.path || folder.name);
                    const folderLabel = typeof folder === 'string' ? folder : (folder.name || folder.path);
                    return (
                      <option key={index} value={folderValue}>
                        📂 {folderLabel}
                      </option>
                    );
                  })}
                </select>
                {folders.length === 0 && (
                  <div className="mt-2 p-2 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                    <p className="text-xs text-yellow-700 dark:text-yellow-400">
                      ⚠️ No folders available. Please create a folder first or refresh the page.
                    </p>
                  </div>
                )}
                {selectedFolder && (
                  <div className="mt-2 p-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <p className="text-xs text-green-700 dark:text-green-400">
                      ✓ Selected folder: <strong>{selectedFolder}</strong>
                    </p>
                  </div>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  📷 Step 2: Select Images from Your Computer
                </label>
                <div className={`relative ${!selectedFolder ? 'opacity-50 pointer-events-none' : ''}`}>
                  <input
                    type="file"
                    multiple
                    accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                    onChange={handleFileSelect}
                    disabled={!selectedFolder}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                  />
                  {!selectedFolder && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100/80 dark:bg-gray-800/80 rounded-lg">
                      <p className="text-xs text-gray-600 dark:text-gray-400">Please select a folder first</p>
                    </div>
                  )}
                </div>
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 space-y-1">
                  <p>• Max {MAX_FILES_PER_UPLOAD} files per upload</p>
                  <p>• Max 10MB per file</p>
                  <p>• Supported: JPEG, PNG, WebP, GIF</p>
                </div>
                {selectedFiles.length > 0 && (
                  <div className="mt-2 p-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <p className="text-sm text-green-700 dark:text-green-400 font-medium">
                      ✓ {selectedFiles.length} valid file(s) selected
                    </p>
                    <div className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                      {selectedFiles.slice(0, 3).map((file, idx) => (
                        <div key={idx}>• {file.name}</div>
                      ))}
                      {selectedFiles.length > 3 && (
                        <div>... and {selectedFiles.length - 3} more</div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Upload Summary */}
              {selectedFolder && selectedFiles.length > 0 && (
                <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <p className="text-sm text-blue-800 dark:text-blue-300 font-medium mb-1">
                    📤 Ready to Upload
                  </p>
                  <p className="text-xs text-blue-600 dark:text-blue-400">
                    {selectedFiles.length} file(s) → <strong>{selectedFolder}</strong> folder
                  </p>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowUploadModal(false);
                    setSelectedFiles([]);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpload}
                  disabled={uploadLoading || selectedFiles.length === 0 || !selectedFolder}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                  title={!selectedFolder ? 'Please select a folder first' : selectedFiles.length === 0 ? 'Please select files to upload' : `Upload ${selectedFiles.length} file(s) to ${selectedFolder}`}
                >
                  {uploadLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <MdCloudUpload />
                      <span>Upload {selectedFiles.length > 0 ? `(${selectedFiles.length})` : ''}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Folder Modal */}
      {showCreateFolder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Create New Folder
                </h3>
                <button
                  onClick={() => setShowCreateFolder(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  ✕
                </button>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Folder Name
                </label>
                <input
                  type="text"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  placeholder="Enter folder name..."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowCreateFolder(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateFolder}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default S3Manager;
