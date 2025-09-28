import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

export default function EnquiryManagement() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);

  // Fetch all enquiries
  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const base = import.meta.env.VITE_API_BASE || '';
      const token = localStorage.getItem('myToken');
      const url = base ? `${base}/api/admin/enquiries` : '/api/admin/enquiries';

      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const response = await fetch(url, { headers });

      if (response.ok) {
        const data = await response.json();
        setEnquiries(data.data || []);
      } else {
        throw new Error('Failed to fetch enquiries');
      }
    } catch (error) {
      console.error('Error fetching enquiries:', error);
      setError('Failed to load enquiries. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  // Update enquiry status
  const updateStatus = async (id, newStatus) => {
    try {
      const base = import.meta.env.VITE_API_BASE || '';
      const token = localStorage.getItem('myToken');
      const url = base ? `${base}/api/admin/enquiries/${id}` : `/api/admin/enquiries/${id}`;

      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        // Refresh enquiries list
        fetchEnquiries();
        // Show success message
        toast.success('Status updated successfully!');
      } else {
        throw new Error('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status. Please try again.');
    }
  };

  // Delete enquiry
  const deleteEnquiry = async (id) => {
    if (!confirm('Are you sure you want to delete this enquiry?')) return;

    try {
      const base = import.meta.env.VITE_API_BASE || '';
      const token = localStorage.getItem('myToken');
      const url = base ? `${base}/api/admin/enquiries/${id}` : `/api/admin/enquiries/${id}`;

      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const response = await fetch(url, {
        method: 'DELETE',
        headers,
      });

      if (response.ok) {
        // Remove from local state
        setEnquiries(prev => prev.filter(enquiry => enquiry.id !== id));
        toast.success('Enquiry deleted successfully!');
      } else {
        throw new Error('Failed to delete enquiry');
      }
    } catch (error) {
      console.error('Error deleting enquiry:', error);
      toast.error('Failed to delete enquiry. Please try again.');
    }
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <section className="max-w-screen-xl mx-auto px-4 md:px-6 md:pl-[280px] mt-12 md:mt-20">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#0c0a09] tracking-tight">
              Customer Enquiries
            </h2>
            <p className="text-gray-500 text-sm md:text-base mt-1">Loading enquiries...</p>
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="max-w-screen-xl mx-auto px-4 md:px-6 md:pl-[280px] mt-12 md:mt-20">
        <div className="mx-auto max-w-5xl text-center">
          <div className="text-red-600 mb-4">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-xl font-semibold mb-2">Error Loading Enquiries</h2>
            <p className="text-gray-600">{error}</p>
          </div>
          <button
            onClick={fetchEnquiries}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-screen-xl mx-auto px-4 md:px-6 md:pl-[280px] mt-12 md:mt-20">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#0c0a09] tracking-tight">
            Customer Enquiries
          </h2>
          <p className="text-gray-500 text-sm md:text-base mt-1">
            Manage and respond to customer enquiries from the contact form
          </p>
        </div>

        {/* Enquiries List */}
        {enquiries.length === 0 ? (
          <div className="text-center py-12">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Enquiries Yet</h3>
            <p className="text-gray-500">Customer enquiries will appear here once submitted through the contact form.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {enquiries.map((enquiry) => (
              <div key={enquiry.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{enquiry.name}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(enquiry.status)}`}>
                        {enquiry.status}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatDate(enquiry.createdAt)}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Email</p>
                        <p className="font-medium">{enquiry.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Mobile</p>
                        <p className="font-medium">{enquiry.mobile}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600 mb-1">Query</p>
                      <p className="text-gray-800 leading-relaxed">{enquiry.query}</p>
                    </div>

                    {enquiry.source && (
                      <div className="mt-3">
                        <span className="text-xs text-gray-500">Source: {enquiry.source}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => {
                        setSelectedEnquiry(enquiry);
                        setShowStatusModal(true);
                      }}
                      className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Update Status
                    </button>
                    <button
                      onClick={() => deleteEnquiry(enquiry.id)}
                      className="px-3 py-1.5 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Status Update Modal */}
        {showStatusModal && selectedEnquiry && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto">
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h3 className="text-lg font-bold text-gray-900">Update Enquiry Status</h3>
                <button
                  onClick={() => setShowStatusModal(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>

              <div className="p-4">
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-1">Current Status</p>
                  <p className="font-medium">{selectedEnquiry.status}</p>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => updateStatus(selectedEnquiry.id, 'Pending')}
                    className="w-full text-left px-3 py-2 bg-yellow-50 hover:bg-yellow-100 text-yellow-800 rounded-md transition-colors"
                  >
                    Mark as Pending
                  </button>
                  <button
                    onClick={() => updateStatus(selectedEnquiry.id, 'In Progress')}
                    className="w-full text-left px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-800 rounded-md transition-colors"
                  >
                    Mark as In Progress
                  </button>
                  <button
                    onClick={() => updateStatus(selectedEnquiry.id, 'Completed')}
                    className="w-full text-left px-3 py-2 bg-green-50 hover:bg-green-100 text-green-800 rounded-md transition-colors"
                  >
                    Mark as Completed
                  </button>
                  <button
                    onClick={() => updateStatus(selectedEnquiry.id, 'Cancelled')}
                    className="w-full text-left px-3 py-2 bg-red-50 hover:bg-red-100 text-red-800 rounded-md transition-colors"
                  >
                    Mark as Cancelled
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
