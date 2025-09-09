import React, { useEffect, useMemo, useState } from "react";
import { Link } from 'react-router-dom';
import api from "../config/apiClient";
import Sidebar from './Sidebar';

const PAGE_SIZE = 20;

const BlogEnquiries = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [q, setQ] = useState("");

  const fetchData = async (p = 1) => {
    try {
      setLoading(true);
      setError("");
      const res = await api.get(`blog/enquiry?page=${p}&limit=${PAGE_SIZE}`);
      const data = res?.data?.data || [];
      const tPages = res?.data?.totalPages || 1;
      setRows(data);
      setTotalPages(tPages);
      setPage(p);
    } catch (e) {
      console.error("Failed to load blog enquiries", e);
      setError("Failed to load blog enquiries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(1); }, []);

  const onPrev = () => { if (page > 1) fetchData(page - 1); };
  const onNext = () => { if (page < totalPages) fetchData(page + 1); };

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return rows;
    return rows.filter(r =>
      (r.name || "").toLowerCase().includes(term) ||
      (r.mobile || "").toLowerCase().includes(term) ||
      (r.blogTitle || "").toLowerCase().includes(term) ||
      (r.project?.projectName || "").toLowerCase().includes(term)
    );
  }, [rows, q]);

  const exportCSV = () => {
    const headers = ["SrNo","Name","Mobile","Email","Blog","Project Name","Project URL","Created At"];
    const lines = [headers.join(",")];
    filtered.forEach((r, idx) => {
      const row = [
        (page - 1) * PAGE_SIZE + idx + 1,
        JSON.stringify(r.name || ""),
        JSON.stringify(r.mobile || ""),
        JSON.stringify(r.email || ""),
        JSON.stringify(r.blogTitle || ""),
        JSON.stringify(r.project?.projectName || ""),
        JSON.stringify(r.project?.project_url || ""),
        JSON.stringify(new Date(r.createdAt).toLocaleString()),
      ];
      lines.push(row.join(","));
    });
    const blob = new Blob(["\uFEFF" + lines.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `blog-enquiries-page-${page}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const deleteRow = async (id) => {
    if (!id) return;
    if (!window.confirm("Delete this enquiry?")) return;
    try {
      await api.delete(`blog/enquiry/${id}`);
      setRows(prev => prev.filter(r => r._id !== id));
    } catch (e) {
      console.error("Delete failed", e);
      alert("Delete failed");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="p-4 md:p-6 overflow-y-auto flex-1">
          <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Blog Enquiries</h1>
        <div className="flex items-center gap-2">
          <div className="relative w-80 max-w-[320px] hidden sm:block">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by Name, Mobile, Blog, Project..."
              className="w-full pl-4 pr-10 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              <i className="fa-solid fa-magnifying-glass"></i>
            </span>
          </div>
          <button onClick={exportCSV} className="px-3 py-2 rounded-lg bg-blue-600 text-white shadow hover:bg-blue-700">
            Export to CSV <span className="ml-1">📥</span>
          </button>
        </div>
      </div>

      {loading && <div className="py-10 text-center">Loading...</div>}
      {error && <div className="py-3 px-4 mb-4 bg-red-50 text-red-700 rounded-lg">{error}</div>}

      {!loading && !error && (
        <div className="bg-white shadow rounded-xl border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 whitespace-nowrap">SR.NO</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 whitespace-nowrap">NAME</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 whitespace-nowrap">MOBILE</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 min-w-[200px]">BLOG</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 min-w-[200px]">PROJECT</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 whitespace-nowrap">EMAIL RECEIVED</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 whitespace-nowrap">DATE</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 whitespace-nowrap">ACTIONS</th>
                </tr>
              </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((r, idx) => (
                <tr key={r._id || idx} className="hover:bg-gray-50">
                  <td className="px-3 py-3 text-sm text-gray-700 whitespace-nowrap">
                    {(page - 1) * PAGE_SIZE + idx + 1}
                  </td>
                  <td className="px-3 py-3 text-sm text-gray-900 font-medium whitespace-nowrap">
                    {r.name}
                  </td>
                  <td className="px-3 py-3 text-sm text-gray-700 whitespace-nowrap">
                    {r.mobile}
                  </td>
                  <td className="px-3 py-3 text-sm text-gray-700 max-w-[200px] truncate" title={r.blogTitle}>
                    {r.blogTitle}
                  </td>
                  <td className="px-3 py-3 text-sm text-gray-700">
                    {r.project?.projectName ? (
                      <div className="flex items-center gap-2 min-w-0">
                        {r.project?.thumbnail ? (
                          <img 
                            src={r.project.thumbnail} 
                            alt={r.project.projectName} 
                            className="w-10 h-10 rounded object-cover flex-shrink-0"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23e5e7eb'%3E%3Cpath d='M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 16H6c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h12c.55 0 1 .45 1 1v12c0 .55-.45 1-1 1zm-4.44-6.19l-2.35 3.02-1.56-1.88c-.2-.25-.58-.24-.78.01l-1.74 2.23c-.26.33-.02.81.39.81h8.98c.41 0 .65-.47.4-.8l-2.55-3.39c-.19-.26-.59-.26-.79 0z'/%3E%3C/svg%3E";
                            }}
                          />
                        ) : (
                          <div className="w-10 h-10 rounded bg-gray-200 flex-shrink-0" />
                        )}
                        <div className="truncate min-w-0">
                          <div className="truncate" title={r.project.projectName}>
                            {r.project.projectName}
                          </div>
                          {r.project?.builderName && (
                            <div className="text-xs text-gray-500 truncate">
                              {r.project.builderName}
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-3 py-3 text-sm whitespace-nowrap">
                    <span 
                      className={`inline-flex items-center justify-center w-16 px-2.5 py-1 rounded-full text-xs font-medium ${
                        r.emailSent ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {r.emailSent ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-sm text-gray-700 whitespace-nowrap">
                    {new Date(r.createdAt).toLocaleString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true
                    })}
                  </td>
                  <td className="px-3 py-3 text-sm whitespace-nowrap">
                    <button 
                      onClick={() => deleteRow(r._id)} 
                      className="px-3 py-1.5 rounded border border-red-300 text-red-700 hover:bg-red-50 transition-colors duration-200"
                      title="Delete enquiry"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td className="px-4 py-6 text-center text-gray-400" colSpan={8}>No enquiries found</td>
                </tr>
              )}
              </tbody>
            </table>
          </div>
        </div>
      )}

          <div className="flex items-center justify-between mt-4">
            <button className="px-4 py-2 rounded border border-gray-300 text-gray-700 disabled:opacity-50" onClick={onPrev} disabled={page <= 1}>Previous</button>
            <div className="text-sm text-gray-500">Page {page} of {totalPages}</div>
            <button className="px-4 py-2 rounded bg-gray-900 text-white disabled:opacity-50" onClick={onNext} disabled={page >= totalPages}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogEnquiries;
