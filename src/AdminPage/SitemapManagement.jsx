import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_BASE } from '../config/apiBase';

const SitemapManagement = () => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentUrl, setCurrentUrl] = useState({
    id: null,
    loc: '',
    lastmod: '',
    changefreq: 'weekly',
    priority: '0.8'
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('myToken');
      console.log('Fetching sitemap URLs from:', `${API_BASE}/api/sitemap/urls`);
      
      const response = await axios.get(`${API_BASE}/api/sitemap/urls`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      console.log('Sitemap response:', response.data);
      
      if (response.data.success) {
        setUrls(response.data.data);
        toast.success(`Loaded ${response.data.data.length} URLs from sitemap`);
      } else {
        toast.error('Failed to load sitemap URLs');
      }
    } catch (error) {
      console.error('Error fetching URLs:', error);
      toast.error(error.response?.data?.message || 'Failed to fetch sitemap URLs');
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setEditMode(false);
    setCurrentUrl({
      id: null,
      loc: '',
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'weekly',
      priority: '0.8'
    });
    setShowModal(true);
  };

  const handleEdit = (url) => {
    setEditMode(true);
    setCurrentUrl({
      ...url,
      lastmod: url.lastmod ? url.lastmod.split('T')[0] : ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this URL from sitemap?')) {
      return;
    }

    try {
      const token = localStorage.getItem('myToken');
      const response = await axios.delete(`${API_BASE}/api/sitemap/urls/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.success) {
        toast.success('URL deleted successfully');
        fetchUrls();
      }
    } catch (error) {
      console.error('Error deleting URL:', error);
      toast.error('Failed to delete URL');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUrl.loc) {
      toast.error('URL is required');
      return;
    }

    try {
      const token = localStorage.getItem('myToken');
      const payload = {
        loc: currentUrl.loc,
        lastmod: currentUrl.lastmod || new Date().toISOString(),
        changefreq: currentUrl.changefreq,
        priority: currentUrl.priority
      };

      let response;
      if (editMode) {
        response = await axios.put(
          `${API_BASE}/api/sitemap/urls/${currentUrl.id}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
      } else {
        response = await axios.post(
          `${API_BASE}/api/sitemap/urls`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
      }

      if (response.data.success) {
        toast.success(editMode ? 'URL updated successfully' : 'URL added successfully');
        setShowModal(false);
        fetchUrls();
      }
    } catch (error) {
      console.error('Error saving URL:', error);
      toast.error('Failed to save URL');
    }
  };

  const filteredUrls = urls.filter(url =>
    url.loc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container-fluid p-4">
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="mb-0">Sitemap Management</h2>
            <button
              className="btn btn-primary"
              onClick={handleAddNew}
            >
              <i className="bi bi-plus-circle me-2"></i>
              Add New URL
            </button>
          </div>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search URLs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6 text-end">
          <span className="badge bg-info fs-6">
            Total URLs: {urls.length}
          </span>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="col-12">
            <div className="card shadow-sm">
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th style={{ width: '5%' }}>#</th>
                        <th style={{ width: '40%' }}>URL</th>
                        <th style={{ width: '15%' }}>Last Modified</th>
                        <th style={{ width: '12%' }}>Change Freq</th>
                        <th style={{ width: '10%' }}>Priority</th>
                        <th style={{ width: '18%' }} className="text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUrls.length === 0 ? (
                        <tr>
                          <td colSpan="6" className="text-center py-4">
                            No URLs found
                          </td>
                        </tr>
                      ) : (
                        filteredUrls.map((url, index) => (
                          <tr key={url.id}>
                            <td>{index + 1}</td>
                            <td>
                              <a
                                href={url.loc}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-decoration-none"
                              >
                                {url.loc}
                              </a>
                            </td>
                            <td>
                              {url.lastmod
                                ? new Date(url.lastmod).toLocaleDateString()
                                : 'N/A'}
                            </td>
                            <td>
                              <span className="badge bg-secondary">
                                {url.changefreq || 'N/A'}
                              </span>
                            </td>
                            <td>
                              <span className="badge bg-primary">
                                {url.priority || 'N/A'}
                              </span>
                            </td>
                            <td className="text-center">
                              <button
                                className="btn btn-sm btn-outline-primary me-2"
                                onClick={() => handleEdit(url)}
                                title="Edit"
                              >
                                <i className="bi bi-pencil"></i>
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleDelete(url.id)}
                                title="Delete"
                              >
                                <i className="bi bi-trash"></i>
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Add/Edit */}
      {showModal && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editMode ? 'Edit URL' : 'Add New URL'}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">
                      URL (loc) <span className="text-danger">*</span>
                    </label>
                    <input
                      type="url"
                      className="form-control"
                      value={currentUrl.loc}
                      onChange={(e) =>
                        setCurrentUrl({ ...currentUrl, loc: e.target.value })
                      }
                      placeholder="https://www.100acress.com/page-name/"
                      required
                    />
                    <small className="text-muted">
                      The full URL of the page
                    </small>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Last Modified</label>
                    <input
                      type="date"
                      className="form-control"
                      value={currentUrl.lastmod}
                      onChange={(e) =>
                        setCurrentUrl({ ...currentUrl, lastmod: e.target.value })
                      }
                    />
                    <small className="text-muted">
                      The last time this page was modified
                    </small>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Change Frequency</label>
                    <select
                      className="form-select"
                      value={currentUrl.changefreq}
                      onChange={(e) =>
                        setCurrentUrl({ ...currentUrl, changefreq: e.target.value })
                      }
                    >
                      <option value="">None</option>
                      <option value="always">Always</option>
                      <option value="hourly">Hourly</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                      <option value="never">Never</option>
                    </select>
                    <small className="text-muted">
                      How often the page's content changes
                    </small>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Priority</label>
                    <input
                      type="number"
                      className="form-control"
                      value={currentUrl.priority}
                      onChange={(e) =>
                        setCurrentUrl({ ...currentUrl, priority: e.target.value })
                      }
                      min="0.0"
                      max="1.0"
                      step="0.1"
                    />
                    <small className="text-muted">
                      Importance of the page (0.0–1.0). Homepage often has 1.0
                    </small>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {editMode ? 'Update' : 'Add'} URL
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SitemapManagement;
