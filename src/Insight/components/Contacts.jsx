import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import AdminInsightsSidebar from '../components/AdminInsightsSidebar';

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);

  // Fetch all contacts
  const fetchContacts = async () => {
    try {
      setLoading(true);
      const base = import.meta.env.VITE_API_BASE || '';
      const token = localStorage.getItem('myToken');
      const url = base ? `${base}/api/admin/contacts` : '/api/admin/contacts';

      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const response = await fetch(url, { headers });

      if (response.ok) {
        const data = await response.json();

        const getInTouchContacts = data.data ? data.data.filter(contact => contact.source === 'GetInTouch Form') : [];
        setContacts(getInTouchContacts);
      } else {
        throw new Error('Failed to fetch contacts');
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
      setError('Failed to load contacts. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Update contact status
  const updateStatus = async (id, newStatus) => {
    try {
      const base = import.meta.env.VITE_API_BASE || '';
      const token = localStorage.getItem('myToken');
      const url = base ? `${base}/api/admin/contacts/${id}` : `/api/admin/contacts/${id}`;

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
        // Refresh contacts list
        fetchContacts();
        setShowStatusModal(false);
        toast.success('Contact status updated successfully!');
      } else {
        throw new Error('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status. Please try again.');
    }
  };

  // Delete contact
  const deleteContact = async (id) => {
    if (!confirm('Are you sure you want to delete this contact?')) return;

    try {
      const base = import.meta.env.VITE_API_BASE || '';
      const token = localStorage.getItem('myToken');
      const url = base ? `${base}/api/admin/contacts/${id}` : `/api/admin/contacts/${id}`;

      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const response = await fetch(url, {
        method: 'DELETE',
        headers,
      });

      if (response.ok) {
        // Remove from local state
        setContacts(prev => prev.filter(contact => contact.id !== id));
        toast.success('Contact deleted successfully!');
      } else {
        throw new Error('Failed to delete contact');
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
      toast.error('Failed to delete contact. Please try again.');
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
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'in progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get inquiry type badge color
  const getInquiryTypeColor = (type) => {
    if (!type) return 'bg-gray-100 text-gray-800';
    switch (type.toLowerCase()) {
      case 'general':
        return 'bg-gray-100 text-gray-800';
      case 'property purchase':
        return 'bg-blue-100 text-blue-800';
      case 'property sale':
        return 'bg-green-100 text-green-800';
      case 'investment':
        return 'bg-purple-100 text-purple-800';
      case 'consultation':
        return 'bg-orange-100 text-orange-800';
      case 'support':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-[9000] w-full bg-white/80 backdrop-blur border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-green-100 text-green-600 flex items-center justify-center font-bold">💎</div>
            <h1 className="text-lg sm:text-xl font-semibold text-gray-800">Contacts Management</h1>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/Admin/dashboard"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 border border-gray-300 hover:bg-gray-50"
            >
              ← Back to Admin
            </Link>
          </div>
        </div>
      </div>

      <AdminInsightsSidebar />

      <div className="max-w-7xl mx-auto md:pl-[300px] px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#0c0a09] tracking-tight">
            Customer Contacts
          </h2>
          <p className="text-gray-500 text-sm md:text-base mt-1">
            Manage and respond to customer contacts from the Get In Touch form
          </p>
        </div>

        {/* Contacts List */}
        {contacts.length === 0 ? (
          <div className="text-center py-12">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Contacts Yet</h3>
            <p className="text-gray-500">Customer contacts will appear here once submitted through the Get In Touch form.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {contacts.map((contact) => (
              <div key={contact.id || contact._id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{contact.fullName || `${contact.firstName} ${contact.lastName}`}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(contact.status)}`}>
                        {contact.status}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getInquiryTypeColor(contact.inquiryType)}`}>
                        {contact.inquiryType || 'Not specified'}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatDate(contact.createdAt)}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Email</p>
                        <p className="font-medium">{contact.email || 'Not provided'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Phone</p>
                        <p className="font-medium">{contact.phone || 'Not provided'}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600 mb-1">Message</p>
                      <p className="text-gray-800 leading-relaxed">{contact.message || 'No message'}</p>
                    </div>

                    {contact.source && (
                      <div className="mt-3">
                        <span className="text-xs text-gray-500">Source: {contact.source}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => {
                        setSelectedContact(contact);
                        setShowStatusModal(true);
                      }}
                      className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Update Status
                    </button>
                    <button
                      onClick={() => deleteContact(contact.id || contact._id)}
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
        {showStatusModal && selectedContact && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto">
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h3 className="text-lg font-bold text-gray-900">Update Contact Status</h3>
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
                  <p className="font-medium">{selectedContact.status}</p>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => updateStatus(selectedContact.id || selectedContact._id, 'New')}
                    className="w-full text-left px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-800 rounded-md transition-colors"
                  >
                    Mark as New
                  </button>
                  <button
                    onClick={() => updateStatus(selectedContact.id || selectedContact._id, 'In Progress')}
                    className="w-full text-left px-3 py-2 bg-yellow-50 hover:bg-yellow-100 text-yellow-800 rounded-md transition-colors"
                  >
                    Mark as In Progress
                  </button>
                  <button
                    onClick={() => updateStatus(selectedContact.id || selectedContact._id, 'Completed')}
                    className="w-full text-left px-3 py-2 bg-green-50 hover:bg-green-100 text-green-800 rounded-md transition-colors"
                  >
                    Mark as Completed
                  </button>
                  <button
                    onClick={() => updateStatus(selectedContact.id || selectedContact._id, 'Cancelled')}
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
    </div>
  );
}
