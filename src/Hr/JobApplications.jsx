import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import HrSidebar from "./HrSidebar";
import api from "../config/apiClient";
import { FaUserCircle, FaEnvelope, FaPhone, FaFileAlt, FaExclamationCircle, FaRobot, FaTimes } from 'react-icons/fa';

const JobApplications = () => {
  const { id } = useParams();
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [scoring, setScoring] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);

  const fetchApplications = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get(`/career/opening/${id}/applications`);
      const list = res?.data?.data || [];
      setApps(Array.isArray(list) ? list : []);
    } catch (e) {
      setError(e?.response?.data?.message || e.message || "Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchApplications();
  }, [id]);

  const approve = async (appId) => {
    if (!appId) return;
    try {
      await api.put(`/career/application/${appId}/approve`);
      setApps((prev) => prev.map((a) => (a._id === appId ? { ...a, status: "approved" } : a)));
    } catch (e) {
      alert(e?.response?.data?.message || "Approve failed");
    }
  };

  const reject = async (appId) => {
    if (!appId) return;
    try {
      await api.put(`/career/application/${appId}/reject`);
      setApps((prev) => prev.map((a) => (a._id === appId ? { ...a, status: "rejected" } : a)));
    } catch (e) {
      alert(e?.response?.data?.message || "Reject failed");
    }
  };

  const runAiScoring = async () => {
    setScoring(true);
    setError("");
    try {
      const res = await api.post(`/career/opening/${id}/score-applications`);
      alert(res?.data?.message || "Scoring complete!");
      fetchApplications();
    } catch (e) {
      setError(e?.response?.data?.message || e.message || "Failed to score applications");
    } finally {
      setScoring(false);
    }
  };

  const openCoverLetterModal = (app) => {
    setSelectedApp(app);
    setModalOpen(true);
  };

  const closeCoverLetterModal = () => {
    setModalOpen(false);
    setSelectedApp(null);
  };

  const rows = useMemo(() => {
    return [...apps]
      .filter(app => {
        if (!searchTerm) return true;
        const term = searchTerm.toLowerCase();
        return (
          (app.name?.toLowerCase().includes(term)) ||
          (app.email?.toLowerCase().includes(term)) ||
          (app.phone?.toLowerCase().includes(term)) ||
          (app.coverLetter?.toLowerCase().includes(term))
        );
      })
      .sort((a, b) => {
        if (a.matchScore && b.matchScore) {
          return b.matchScore - a.matchScore;
        }
        if (a.matchScore) return -1;
        if (b.matchScore) return 1;
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
  }, [apps, searchTerm]);

  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Approved
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
            Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            Pending
          </span>
        );
    }
  };

  const renderScore = (score) => {
    if (typeof score !== "number") {
      return <span className="text-gray-400">—</span>;
    }
    const percentage = (score * 100).toFixed(1);
    let colorClass = "text-gray-600";
    if (score >= 0.85) colorClass = "text-green-600 font-bold";
    else if (score >= 0.75) colorClass = "text-yellow-600 font-semibold";
    else if (score < 0.6) colorClass = "text-red-500";
    return <span className={colorClass}>{percentage}%</span>;
  };

  return (  
    <div className="flex bg-gray-100 min-h-screen">
      <HrSidebar />
      <div className="flex-1 p-3 sm:p-4 lg:p-6 ml-0 md:ml-4">
        <div className="w-full">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
            <div className="text-center md:text-left">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 mb-1 tracking-tight">
                Job Applications
              </h1>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <button
                onClick={runAiScoring}
                disabled={scoring || loading}
                className="flex items-center px-3 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 transition duration-300 disabled:bg-gray-400"
              >
                <FaRobot className={`mr-1.5 text-sm ${scoring ? 'animate-spin' : ''}`} />
                {scoring ? "Scoring..." : "AI Scores"}
              </button>
              <Link
                className="text-blue-600 hover:text-blue-800 transition duration-300 font-semibold text-sm"
                to={`/admin/jobposting/view/${id}`}
              >
                ← Back
              </Link>
            </div>
          </div>

          {loading && (
            <div className="flex items-center justify-center py-10 text-gray-500">
              <FaExclamationCircle className="animate-spin mr-2" /> Loading applications...
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded mb-4 text-sm" role="alert">
              <strong className="font-bold">Error!</strong>
              <span className="ml-2">{error}</span>
            </div>
          )}

          <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div className="w-full sm:max-w-md">
              <input
                type="text"
                placeholder="Search applications..."
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="text-xs text-gray-500 whitespace-nowrap">
              {rows.length} application{rows.length !== 1 ? 's' : ''}
            </div>
          </div>

          {!loading && apps.length === 0 && (
            <div className="text-center py-10 text-gray-500">
              No applications yet.
            </div>
          )}

          {!loading && apps.length > 0 && rows.length === 0 && (
            <div className="text-center py-10 text-gray-500">
              No applications match your search.
            </div>
          )}

          {rows.length > 0 && (
            <div className="overflow-hidden shadow-lg rounded-lg">
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full divide-y divide-gray-200 text-xs">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left font-semibold text-gray-600 uppercase">Candidate</th>
                      <th className="px-4 py-2 text-left font-semibold text-gray-600 uppercase">Contact</th>
                      <th className="px-4 py-2 text-left font-semibold text-gray-600 uppercase">AI Score</th>
                      <th className="px-4 py-2 text-left font-semibold text-gray-600 uppercase">Resume</th>
                      <th className="px-4 py-2 text-left font-semibold text-gray-600 uppercase">Cover Letter</th>
                      <th className="px-4 py-2 text-left font-semibold text-gray-600 uppercase">Status</th>
                      <th className="px-4 py-2 text-right font-semibold text-gray-600 uppercase">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {rows.map((a) => (
                      <tr key={a._id} className="hover:bg-gray-50 transition duration-150">
                        <td className="px-4 py-2 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <FaUserCircle className="text-gray-400 text-lg flex-shrink-0" />
                            <div>
                              <div className="font-medium text-gray-900 text-xs">{a.name || "-"}</div>
                              <div className="text-xs text-gray-500">{new Date(a.createdAt).toLocaleDateString()}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          <div>
                            <a href={`mailto:${a.email}`} className="text-blue-600 hover:underline text-xs">
                              {a.email}
                            </a>
                          </div>
                          {a.phone && <div className="text-xs text-gray-500">{a.phone}</div>}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap font-semibold text-sm">
                          {renderScore(a.matchScore)}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          {a.resumeUrl ? (
                            <a
                              className="text-blue-600 hover:underline flex items-center gap-1 text-xs"
                              href={a.resumeUrl}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <FaFileAlt /> Open
                            </a>
                          ) : (
                            <span className="text-gray-400 text-xs">—</span>
                          )}
                        </td>
                        <td className="px-4 py-2">
                          {a.coverLetter ? (
                            <button
                              onClick={() => openCoverLetterModal(a)}
                              className="text-blue-600 hover:underline text-xs font-medium"
                            >
                              View Letter
                            </button>
                          ) : (
                            <span className="text-gray-400 text-xs">—</span>
                          )}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          {getStatusBadge(a.status)}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-right">
                          {a.status === "approved" || a.status === "rejected" ? (
                            <span className="text-gray-400 text-xs">{a.status}</span>
                          ) : (
                            <div className="flex justify-end gap-1">
                              <button
                                className="px-2 py-1 rounded bg-green-600 text-white hover:bg-green-700 transition text-xs"
                                onClick={() => approve(a._id)}
                              >
                                ✓
                              </button>
                              <button
                                className="px-2 py-1 rounded bg-red-600 text-white hover:bg-red-700 transition text-xs"
                                onClick={() => reject(a._id)}
                              >
                                ✕
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile View */}
              <div className="lg:hidden space-y-2">
                {rows.map((a) => (
                  <div key={a._id} className="bg-white p-2.5 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <FaUserCircle className="text-gray-400 text-lg flex-shrink-0" />
                        <div className="min-w-0">
                          <h3 className="font-bold text-sm text-gray-900 truncate">{a.name || "-"}</h3>
                          <p className="text-xs text-gray-500">{new Date(a.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1 flex-shrink-0">
                        <div className="font-bold text-sm">{renderScore(a.matchScore)}</div>
                        {getStatusBadge(a.status)}
                      </div>
                    </div>
                    
                    <div className="space-y-1 text-xs mb-2">
                      <div className="flex items-center gap-1">
                        <FaEnvelope className="text-gray-400 flex-shrink-0" />
                        <a href={`mailto:${a.email}`} className="text-blue-600 hover:underline truncate">
                          {a.email}
                        </a>
                      </div>
                      {a.phone && (
                        <div className="flex items-center gap-1">
                          <FaPhone className="text-gray-400 flex-shrink-0" />
                          <span>{a.phone}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <FaFileAlt className="text-gray-400 flex-shrink-0" />
                        {a.resumeUrl ? (
                          <a href={a.resumeUrl} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                            View Resume
                          </a>
                        ) : (
                          <span className="text-gray-400">No Resume</span>
                        )}
                      </div>
                      {a.coverLetter && (
                        <button
                          onClick={() => openCoverLetterModal(a)}
                          className="text-blue-600 hover:underline font-medium"
                        >
                          View Cover Letter
                        </button>
                      )}
                    </div>

                    <div className="flex gap-2">
                      {a.status === "approved" || a.status === "rejected" ? (
                        <span className="text-gray-400 text-xs w-full text-center">{a.status}</span>
                      ) : (
                        <>
                          <button
                            className="flex-1 px-2 py-1 rounded bg-green-600 text-white hover:bg-green-700 transition text-xs"
                            onClick={() => approve(a._id)}
                          >
                            Approve
                          </button>
                          <button
                            className="flex-1 px-2 py-1 rounded bg-red-600 text-white hover:bg-red-700 transition text-xs"
                            onClick={() => reject(a._id)}
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div> 
          )}
        </div>
      </div>

      {/* Cover Letter Modal */}
      {modalOpen && selectedApp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-96 overflow-auto">
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between">
              <div>
                <h2 className="font-bold text-lg">{selectedApp.name}</h2>
                <p className="text-sm opacity-90">{selectedApp.email}</p>
                <p className="text-sm opacity-90">AI Score: {renderScore(selectedApp.matchScore)}</p>
              </div>
              <button
                onClick={closeCoverLetterModal}
                className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded transition"
              >
                <FaTimes size={20} />
              </button>
            </div>
            <div className="p-6 text-gray-700 leading-relaxed whitespace-pre-wrap">
              {selectedApp.coverLetter}
            </div>
          </div>
        </div>
      )}
    </div> 
  );
};

export default JobApplications;