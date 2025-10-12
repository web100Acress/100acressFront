import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import HrSidebar from "./HrSidebar";
import api from "../config/apiClient";
import { FaUserCircle, FaEnvelope, FaPhone, FaFileAlt, FaExclamationCircle } from 'react-icons/fa';

const JobApplications = () => {
  const { id } = useParams();
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const rows = useMemo(() => {
    return [...apps].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [apps]);

  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Approved
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            Pending
          </span>
        );
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <HrSidebar />
      <div className="flex-1 p-8 md:p-10 lg:p-12 ml-0 md:ml-64">
        <div className="w-full">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Job Applications</h2>
            <Link
              className="text-blue-600 hover:text-blue-800 transition duration-300 font-semibold"
              to={`/admin/jobposting/view/${id}`}
            >
              &larr; Back to Job
            </Link>
          </div>

          {loading && (
            <div className="flex items-center justify-center py-10 text-gray-500">
              <FaExclamationCircle className="animate-spin mr-2" /> Loading applications...
            </div>
          )}

          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
              role="alert"
            >
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline ml-2">{error}</span>
            </div>
          )}

          {!loading && rows.length === 0 && (
            <div className="text-center py-10 text-gray-500 text-lg">
              No applications have been submitted for this job yet.
            </div>
          )}

          {rows.length > 0 && (
            <div className="overflow-hidden shadow-lg rounded-lg">
              {/* Desktop Table */}
              <div className="hidden lg:block">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Candidate
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Resume
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Cover Letter
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {rows.map((a) => (
                      <tr key={a._id} className="hover:bg-gray-50 transition duration-150">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <FaUserCircle className="text-gray-400 mr-3 text-2xl" />
                            <div>
                              <div className="font-medium text-gray-900">{a.name || "-"}</div>
                              <div className="text-sm text-gray-500">
                                {new Date(a.createdAt).toLocaleString()}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div>
                            <a href={`mailto:${a.email}`} className="text-blue-600 hover:underline">
                              {a.email}
                            </a>
                          </div>
                          {a.phone ? <div>{a.phone}</div> : null}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {a.resumeUrl ? (
                            <a
                              className="text-blue-600 hover:underline flex items-center"
                              href={a.resumeUrl}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <FaFileAlt className="mr-2" /> Open
                            </a>
                          ) : (
                            <span className="text-gray-400">—</span>
                          )}
                        </td>
                        <td className="px-6 py-4 max-w-sm">
                          <div
                            className="text-sm text-gray-700 truncate"
                            title={a.coverLetter || "No cover letter provided."}
                          >
                            {a.coverLetter || "No cover letter provided."}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(a.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                          {a.status === "approved" ? (
                            <span className="text-gray-400">Approved</span>
                          ) : a.status === "rejected" ? (
                            <span className="text-gray-400">Rejected</span>
                          ) : (
                            <>
                              <button
                                className="px-3 py-1.5 rounded-md bg-green-600 text-white hover:bg-green-700 transition duration-300"
                                onClick={() => approve(a._id)}
                              >
                                Approve
                              </button>
                              <button
                                className="px-3 py-1.5 rounded-md bg-red-600 text-white hover:bg-red-700 transition duration-300"
                                onClick={() => reject(a._id)}
                              >
                                Reject
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile/Card View */}
              <div className="lg:hidden space-y-4">
                {rows.map((a) => (
                  <div
                    key={a._id}
                    className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-gray-900">{a.name || "-"}</h3>
                      {getStatusBadge(a.status)}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {new Date(a.createdAt).toLocaleString()}
                    </div>
                    <div className="mt-3 space-y-2 text-sm text-gray-700">
                      <div className="flex items-center">
                        <FaEnvelope className="text-gray-400 mr-2" />
                        <a href={`mailto:${a.email}`} className="text-blue-600 hover:underline">
                          {a.email}
                        </a>
                      </div>
                      {a.phone && (
                        <div className="flex items-center">
                          <FaPhone className="text-gray-400 mr-2" />
                          <span>{a.phone}</span>
                        </div>
                      )}
                      <div className="flex items-center">
                        <FaFileAlt className="text-gray-400 mr-2" />
                        {a.resumeUrl ? (
                          <a
                            href={a.resumeUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            View Resume
                          </a>
                        ) : (
                          <span className="text-gray-400">No Resume</span>
                        )}
                      </div>
                      <div className="mt-3">
                        <p className="font-semibold">Cover Letter:</p>
                        <p className="text-sm text-gray-600 line-clamp-3">
                          {a.coverLetter || "No cover letter provided."}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      {a.status === "approved" ? (
                        <span className="text-gray-400 col-span-2 text-center">Approved</span>
                      ) : a.status === "rejected" ? (
                        <span className="text-gray-400 col-span-2 text-center">Rejected</span>
                      ) : (
                        <>
                          <button
                            className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition duration-300"
                            onClick={() => approve(a._id)}
                          >
                            Approve
                          </button>
                          <button
                            className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition duration-300"
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
    </div> 
  );
};

export default JobApplications;
