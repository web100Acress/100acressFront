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
  FaPlus
} from 'react-icons/fa';
import { MdCloudUpload, MdRefresh } from 'react-icons/md';
import { toast } from 'react-toastify';
import axios from 'axios';
import Sidebar from './Sidebar';

const S3Manager = () => {
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState('');
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

  const fetchFolders = async () => {
    try {
      // Actual S3 API call
      const response = await axios.get('/api/s3/folders', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('myToken')}`
        }
      });
      
      if (response.data.success) {
        setFolders(response.data.folders);
        if (response.data.folders.length > 0) {
          setSelectedFolder(response.data.folders[0]);
        }
      } else {
        // Fallback to sample data
        setFolders(sampleFolders);
        if (sampleFolders.length > 0) {
          setSelectedFolder(sampleFolders[0]);
        }
      }
    } catch (error) {
      console.error('Error fetching folders:', error);
      toast.error('Failed to fetch folders from S3');
      // Fallback to sample data
      setFolders(sampleFolders);
      if (sampleFolders.length > 0) {
        setSelectedFolder(sampleFolders[0]);
      }
    }
  };

  const fetchImages = async () => {
    setLoading(true);
    try {
      // Actual S3 API call
      const response = await axios.get(`/api/s3/images/${selectedFolder}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('myToken')}`
        }
      });
      
      if (response.data.success) {
        setImages(response.data.images);
      } else {
        setImages([]);
        toast.info(`No images found in ${selectedFolder} folder`);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
      toast.error('Failed to fetch images from S3');
      setImages([]);
    } finally {
      setLoading(false);
    }
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
    if (selectedFiles.length === 0) {
      toast.error('Please select files to upload');
      return;
    }

    if (!selectedFolder) {
      toast.error('Please select a folder');
      return;
    }

    setUploadLoading(true);
    try {
      const formData = new FormData();
      selectedFiles.forEach(file => {
        formData.append('files', file);
      });
      formData.append('folder', selectedFolder);

      // Replace with actual S3 upload API call
      const response = await axios.post('/api/s3/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('myToken')}`
        },
      });

      toast.success(`Successfully uploaded ${selectedFiles.length} files`);
      setSelectedFiles([]);
      setShowUploadModal(false);
      fetchImages(); // Refresh images list
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload files');
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

  const handleCreateFolder = async () => {
    if (!newFolderName.trim()) {
      toast.error('Please enter folder name');
      return;
    }

    try {
      // Actual S3 create folder API call
      const response = await axios.post('/api/s3/folders', { 
        name: newFolderName.trim()
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('myToken')}`
        }
      });
      
      if (response.data.success) {
        setFolders([...folders, response.data.folder]);
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
      <div className="flex-1 min-w-0 p-6 ml-[250px] transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
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
              <div className="flex items-center gap-2 mb-4">
                <FaFolder className="text-yellow-500" />
                <h2 className="font-semibold text-gray-900 dark:text-white">Folders</h2>
              </div>
              <div className="space-y-2">
                {folders.map((folder, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedFolder(folder)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedFolder === folder
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <FaFolder className="text-sm" />
                      <span className="text-sm truncate">{folder}</span>
                    </div>
                  </button>
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
                    onClick={fetchImages}
                    className="px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <MdRefresh />
                  </button>
                </div>
              </div>

              {/* Current Folder Info & Batch Actions */}
              <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center gap-2">
                  <FaFolder className="text-yellow-500" />
                  <span className="font-medium text-gray-900 dark:text-white">
                    Current Folder: {selectedFolder}
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
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
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

                      <div className="aspect-w-16 aspect-h-12">
                        <img
                          src={image.url}
                          alt={image.name}
                          className="w-full h-48 object-cover"
                        />
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
                  Select Folder
                </label>
                <select
                  value={selectedFolder}
                  onChange={(e) => setSelectedFolder(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  {folders.map((folder, index) => (
                    <option key={index} value={folder}>
                      {folder}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Select Images
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                  onChange={handleFileSelect}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  <p>• Max {MAX_FILES_PER_UPLOAD} files per upload</p>
                  <p>• Max 10MB per file</p>
                  <p>• Supported: JPEG, PNG, WebP, GIF</p>
                </div>
                {selectedFiles.length > 0 && (
                  <p className="text-sm text-green-600 dark:text-green-400 mt-2 font-medium">
                    ✓ {selectedFiles.length} valid file(s) selected
                  </p>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpload}
                  disabled={uploadLoading || selectedFiles.length === 0}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors flex items-center justify-center gap-2"
                >
                  {uploadLoading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <MdCloudUpload />
                  )}
                  {uploadLoading ? 'Uploading...' : 'Upload'}
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
