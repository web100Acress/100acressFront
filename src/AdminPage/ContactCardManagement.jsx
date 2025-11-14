import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  Share2,
  QrCode,
  ExternalLink,
  Filter,
  Calendar,
  Users,
  TrendingUp,
  X,
  Save,
  Loader,
  AlertCircle,
  CheckCircle,
  RefreshCw,
  Globe,
  Mail,
  Phone,
  Building
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { getApiBase } from '../config/apiBase';

const ContactCardManagement = () => {
  const [contactCards, setContactCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0
  });

  // Filter contact cards based on search term and status
  const filteredCards = contactCards.filter(card => {
    const matchesSearch = searchTerm === '' || 
      card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (card.company && card.company.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'active' && card.isActive) ||
      (statusFilter === 'inactive' && !card.isActive);
    
    return matchesSearch && matchesStatus;
  });

  useEffect(() => {
    fetchContactCards();
  }, [searchTerm, statusFilter, pagination.currentPage]);

  const fetchContactCards = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('myToken');
      const response = await axios.get(
        `${getApiBase()}/api/contact-cards`,
        {
          headers: { 'x-access-token': token },
          params: {
            page: pagination.currentPage,
            limit: 10,
            search: searchTerm,
            status: statusFilter === 'all' ? undefined : statusFilter
          }
        }
      );

      if (response.data.success) {
        setContactCards(response.data.data);
        setPagination(response.data.pagination);
      }
    } catch (error) {
      console.error('Error fetching contact cards:', error);
      toast.error('Failed to fetch contact cards');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this contact card?')) {
      return;
    }

    try {
      const token = localStorage.getItem('myToken');
      await axios.delete(`${getApiBase()}/api/contact-cards/${id}`, {
        headers: { 'x-access-token': token }
      });
      
      toast.success('Contact card deleted successfully');
      fetchContactCards();
    } catch (error) {
      console.error('Error deleting contact card:', error);
      toast.error('Failed to delete contact card');
    }
  };

  const handleViewCard = (slug) => {
    window.open(`/hi/${slug}`, '_blank');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusBadge = (isActive) => {
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          isActive
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}
      >
        {isActive ? 'Active' : 'Inactive'}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                Contact Card Management
              </h1>
              <p className="text-gray-600 text-lg">Create and manage beautiful digital contact cards</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={fetchContactCards}
                className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
                disabled={loading}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Plus className="h-5 w-5 mr-2" />
                Create New Card
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Cards</p>
                <p className="text-3xl font-bold text-gray-900">{pagination.totalItems}</p>
                <p className="text-xs text-gray-500 mt-1">All contact cards</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
          <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Active Cards</p>
                <p className="text-3xl font-bold text-green-600">
                  {contactCards.filter(card => card.isActive).length}
                </p>
                <p className="text-xs text-gray-500 mt-1">Currently live</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
          <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Views</p>
                <p className="text-3xl font-bold text-purple-600">
                  {contactCards.reduce((sum, card) => sum + (card.analytics?.totalViews || 0), 0)}
                </p>
                <p className="text-xs text-gray-500 mt-1">Page visits</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl">
                <Eye className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
          <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Downloads</p>
                <p className="text-3xl font-bold text-orange-600">
                  {contactCards.reduce((sum, card) => sum + (card.analytics?.totalDownloads || 0), 0)}
                </p>
                <p className="text-xs text-gray-500 mt-1">vCard saves</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl">
                <Download className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Filters */}
        <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search by name, email, or company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all"
                />
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 bg-white/50 backdrop-blur-sm rounded-xl px-4 py-3 border border-gray-200">
                <Filter size={20} className="text-gray-500" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-transparent border-none focus:ring-0 focus:outline-none text-gray-700 font-medium"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active Only</option>
                  <option value="inactive">Inactive Only</option>
                </select>
              </div>
              <div className="text-sm text-gray-500 bg-white/50 backdrop-blur-sm rounded-xl px-4 py-3 border border-gray-200">
                {filteredCards.length} of {contactCards.length} cards
              </div>
            </div>
          </div>
        </div>
      </div>

        {/* Enhanced Contact Cards Table */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading contact cards...</p>
          </div>
        ) : filteredCards.length === 0 ? (
          <div className="p-8 text-center">
            {contactCards.length === 0 ? (
              <>
                <Users size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No contact cards found</h3>
                <p className="text-gray-600 mb-4">Get started by creating your first contact card</p>
                <button
                  onClick={() => setShowModal(true)}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Create Contact Card
                </button>
              </>
            ) : (
              <>
                <Search size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No cards match your filters</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search terms or filters</p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setStatusFilter('all');
                  }}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Clear Filters
                </button>
              </>
            )}
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Company
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Analytics
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCards.map((card) => (
                    <tr key={card._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {card.logo && (
                            <img
                              src={card.logo}
                              alt={card.name}
                              className="h-10 w-10 rounded-full object-cover mr-3"
                            />
                          )}
                          <div>
                            <div className="text-sm font-medium text-gray-900">{card.name}</div>
                            <div className="text-sm text-gray-500">{card.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{card.company || '-'}</div>
                        <div className="text-sm text-gray-500">{card.designation || '-'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(card.isActive)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          <div>Views: {card.analytics?.totalViews || 0}</div>
                          <div>Downloads: {card.analytics?.totalDownloads || 0}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(card.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <motion.button
                            onClick={() => handleViewCard(card.slug)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="text-blue-600 hover:text-blue-900 p-1 rounded"
                            title="View Card"
                          >
                            <ExternalLink size={16} />
                          </motion.button>
                          <motion.button
                            onClick={() => setEditingCard(card)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="text-green-600 hover:text-green-900 p-1 rounded"
                            title="Edit Card"
                          >
                            <Edit size={16} />
                          </motion.button>
                          <motion.button
                            onClick={() => handleDelete(card._id)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="text-red-600 hover:text-red-900 p-1 rounded"
                            title="Delete Card"
                          >
                            <Trash2 size={16} />
                          </motion.button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="px-6 py-3 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    Showing {((pagination.currentPage - 1) * 10) + 1} to{' '}
                    {Math.min(pagination.currentPage * 10, pagination.totalItems)} of{' '}
                    {pagination.totalItems} results
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage - 1 }))}
                      disabled={pagination.currentPage === 1}
                      className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage + 1 }))}
                      disabled={pagination.currentPage === pagination.totalPages}
                      className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <ContactCardModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            setShowModal(false);
            fetchContactCards();
          }}
        />
      )}

      {editingCard && (
        <ContactCardModal
          isOpen={!!editingCard}
          onClose={() => setEditingCard(null)}
          onSuccess={() => {
            setEditingCard(null);
            fetchContactCards();
          }}
          editData={editingCard}
        />
      )}
    </div>
  );
};

// Contact Card Modal Component (simplified for now)
const ContactCardModal = ({ isOpen, onClose, onSuccess, editData = null }) => {
  const [formData, setFormData] = useState({
    name: editData?.name || '',
    email: editData?.email || '',
    phone: editData?.phone || '',
    company: editData?.company || '',
    designation: editData?.designation || '',
    website: editData?.website || '',
    brandColor: editData?.brandColor || '#3B82F6',
    bio: editData?.bio || '',
    profile_image_url: editData?.profile_image_url || '',
    company_logo_url: editData?.company_logo_url || 'https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/logo/logowhite.webp.webp',
    slug: editData?.slug || '',
    socialLinks: {
      linkedin: editData?.socialLinks?.linkedin || '',
      twitter: editData?.socialLinks?.twitter || '',
      instagram: editData?.socialLinks?.instagram || '',
      facebook: editData?.socialLinks?.facebook || '',
      github: editData?.socialLinks?.github || '',
      website: editData?.socialLinks?.website || ''
    }
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('myToken');
      const url = editData 
        ? `${getApiBase()}/api/contact-cards/${editData._id}`
        : `${getApiBase()}/api/contact-cards`;
      
      const method = editData ? 'put' : 'post';
      
      // Debug: Log the form data being sent
      console.log('Sending form data:', formData);
      
      await axios[method](url, formData, {
        headers: { 'x-access-token': token }
      });

      toast.success(`Contact card ${editData ? 'updated' : 'created'} successfully`);
      onSuccess();
    } catch (error) {
      console.error('Error saving contact card:', error);
      
      // Enhanced error handling
      console.log('Error response:', error.response);
      
      if (error.response?.status === 401) {
        toast.error('Authentication failed. Please login again.');
      } else if (error.response?.status === 400) {
        const errorData = error.response.data;
        console.log('Validation error details:', errorData);
        
        if (errorData?.errors && Array.isArray(errorData.errors)) {
          // Show specific validation errors
          errorData.errors.forEach(err => toast.error(err));
        } else {
          const errorMsg = errorData?.message || 'Validation error';
          toast.error(errorMsg);
        }
      } else if (error.response?.status === 500) {
        toast.error('Server error. Please try again later.');
      } else {
        toast.error(`Failed to ${editData ? 'update' : 'create'} contact card`);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 backdrop-blur-lg rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/20">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {editData ? 'Edit Contact Card' : 'Create New Contact Card'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., john-doe (lowercase, hyphens only)"
              />
              <p className="text-xs text-gray-500 mt-1">
                URL-friendly identifier (lowercase letters, numbers, and hyphens only). This will be used in the contact card URL: /hi/your-slug
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
              <input
                type="text"
                value={formData.designation}
                onChange={(e) => setFormData(prev => ({ ...prev, designation: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Brand Color</label>
              <input
                type="color"
                value={formData.brandColor}
                onChange={(e) => setFormData(prev => ({ ...prev, brandColor: e.target.value }))}
                className="w-full h-10 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Profile Picture URL</label>
              <input
                type="url"
                value={formData.profile_image_url}
                onChange={(e) => setFormData(prev => ({ ...prev, profile_image_url: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com/profile-picture.jpg"
              />
              <p className="text-xs text-gray-500 mt-1">Recommended: Square image (1:1 ratio), minimum 300x300px</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Logo URL</label>
              <input
                type="url"
                value={formData.company_logo_url}
                onChange={(e) => setFormData(prev => ({ ...prev, company_logo_url: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com/company-logo.png"
              />
              <p className="text-xs text-gray-500 mt-1">Recommended: Rectangular image, transparent background preferred</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Brief description about yourself..."
              />
            </div>

            {/* Social Media Links Section */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Social Media Links</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                  <input
                    type="url"
                    value={formData.socialLinks.linkedin}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      socialLinks: { ...prev.socialLinks, linkedin: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Twitter/X</label>
                  <input
                    type="url"
                    value={formData.socialLinks.twitter}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      socialLinks: { ...prev.socialLinks, twitter: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="https://twitter.com/username or https://x.com/username"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Instagram</label>
                  <input
                    type="url"
                    value={formData.socialLinks.instagram}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      socialLinks: { ...prev.socialLinks, instagram: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="https://instagram.com/username"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Facebook</label>
                  <input
                    type="url"
                    value={formData.socialLinks.facebook}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      socialLinks: { ...prev.socialLinks, facebook: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="https://facebook.com/username"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">GitHub</label>
                  <input
                    type="url"
                    value={formData.socialLinks.github}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      socialLinks: { ...prev.socialLinks, github: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="https://github.com/username"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Personal Website</label>
                  <input
                    type="url"
                    value={formData.socialLinks.website}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      socialLinks: { ...prev.socialLinks, website: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="https://yourwebsite.com"
                  />
                </div>
              </div>
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {loading ? 'Saving...' : (editData ? 'Update' : 'Create')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactCardManagement;
