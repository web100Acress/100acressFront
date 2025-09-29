import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import AdminInsightsSidebar from '../components/AdminInsightsSidebar';

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        return 'bg-blue-50 text-blue-700 ring-1 ring-blue-200';
      case 'in progress':
        return 'bg-amber-50 text-amber-700 ring-1 ring-amber-200';
      case 'completed':
        return 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200';
      case 'cancelled':
        return 'bg-rose-50 text-rose-700 ring-1 ring-rose-200';
      default:
        return 'bg-gray-50 text-gray-700 ring-1 ring-gray-200';
    }
  };

  // Get inquiry type badge color
  const getInquiryTypeColor = (type) => {
    if (!type) return 'bg-gray-50 text-gray-600 ring-1 ring-gray-200';
    switch (type.toLowerCase()) {
      case 'general':
        return 'bg-slate-50 text-slate-700 ring-1 ring-slate-200';
      case 'property purchase':
        return 'bg-blue-50 text-blue-700 ring-1 ring-blue-200';
      case 'property sale':
        return 'bg-green-50 text-green-700 ring-1 ring-green-200';
      case 'investment':
        return 'bg-purple-50 text-purple-700 ring-1 ring-purple-200';
      case 'consultation':
        return 'bg-orange-50 text-orange-700 ring-1 ring-orange-200';
      case 'support':
        return 'bg-pink-50 text-pink-700 ring-1 ring-pink-200';
      default:
        return 'bg-gray-50 text-gray-600 ring-1 ring-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-[9000] w-full bg-white/90 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center text-white shadow-lg shadow-emerald-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Contacts</h1>
                <p className="text-xs text-gray-500">Manage customer inquiries</p>
              </div>
            </div>
            <Link
              to="/Admin/dashboard"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
              </svg>
              Dashboard
            </Link>
          </div>
        </div>
      </div>

      <AdminInsightsSidebar />

      <div className="max-w-7xl mx-auto md:pl-[300px] px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-emerald-500"></div>
          </div>
        ) : contacts.length === 0 ? (
          <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center shadow-sm">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Contacts Yet</h3>
            <p className="text-gray-500 max-w-md mx-auto">Customer contacts will appear here once submitted through the Get In Touch form.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {contacts.map((contact) => (
              <div key={contact.id || contact._id} className="group bg-white rounded-2xl border border-gray-100 hover:border-gray-200 p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  <div className="flex-1 space-y-4">
                    {/* Header */}
                    <div className="flex flex-wrap items-start gap-3">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-100 to-green-100 flex items-center justify-center flex-shrink-0 ring-2 ring-white shadow-sm">
                          <span className="text-lg font-bold text-emerald-700">
                            {(contact.fullName || contact.firstName)?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-bold text-gray-900 truncate">
                            {contact.fullName || `${contact.firstName} ${contact.lastName}`}
                          </h3>
                          <p className="text-sm text-gray-500 flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            {formatDate(contact.createdAt)}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`px-3 py-1.5 text-xs font-semibold rounded-full ${getStatusColor(contact.status)}`}>
                          {contact.status}
                        </span>
                        <span className={`px-3 py-1.5 text-xs font-semibold rounded-full ${getInquiryTypeColor(contact.inquiryType)}`}>
                          {contact.inquiryType || 'General'}
                        </span>
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                        <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-gray-500 mb-0.5">Email</p>
                          <p className="text-sm font-semibold text-gray-900 truncate">{contact.email || 'Not provided'}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                        <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-gray-500 mb-0.5">Phone</p>
                          <p className="text-sm font-semibold text-gray-900 truncate">{contact.phone || 'Not provided'}</p>
                        </div>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="p-4 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200">
                      <div className="flex items-center gap-2 mb-2">
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"/>
                        </svg>
                        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Message</p>
                      </div>
                      <p className="text-sm text-gray-800 leading-relaxed">{contact.message || 'No message provided'}</p>
                    </div>

                    {/* Source */}
                    {contact.source && (
                      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-indigo-50 border border-indigo-100">
                        <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <span className="text-xs font-medium text-indigo-700">Source: {contact.source}</span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex lg:flex-col gap-2 lg:ml-4">
                    <button
                      onClick={() => deleteContact(contact.id || contact._id)}
                      className="flex-1 lg:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold bg-white text-rose-600 rounded-xl hover:bg-rose-50 transition-all border border-rose-200 hover:border-rose-300 shadow-sm"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                      </svg>
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
  );
}