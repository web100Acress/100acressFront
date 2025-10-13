import React, { useState, useEffect, useMemo } from "react";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { FaFileExport } from "react-icons/fa";
import api from "../config/apiClient";

const AdminJobPosting = () => {
  const [jobList, setJobList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetData();
  };

  const [job, setJob] = useState({
    jobLocation: "",
    jobTitle: "",
    responsibility: "",
    experience: "",
    skill: "",
    jobProfile: "",
  });

  const fetchJobOpenings = async () => {
    try {
      const res = await api.get("/career/opening/ViewAll");
      const list = res?.data?.data || [];
      setJobList(list);
      // Load applicant summaries per opening
      loadApplicantsSummary(list);
    } catch (error) {
      console.error(error || error.message);
    }
  };

  useEffect(() => {
    fetchJobOpenings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob({ ...job, [name]: value });
  };

  const resetData = () => {
    setJob({
      jobLocation: "",
      jobTitle: "",
      responsibility: "",
      experience: "",
      skill: "",
      jobProfile: "",
    });
  };

  const submitJobPostingData = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/career/opening/Insert", job);
      alert("Data Posted");
      resetData();
      setIsModalOpen(false);
      fetchJobOpenings();
    } catch (error) {
      console.log(error || error.message);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      const res = await api.delete(`/career/opening/delete/${id}`);
      if (res.status >= 200 && res.status < 300) {
        fetchJobOpenings(); // Refresh the list after deletion
      } else {
        console.error("Failed to delete job posting. Server returned an error.");
      }
    } catch (error) {
      console.log(error || error.message);
    }
  };

  const handleDeleteButtonClick = (id) => {
    const confirmDeletion = window.confirm(
      "Are you sure you want to delete this job posting?"
    );
    if (confirmDeletion) {
      handleDeleteUser(id);
    }
  };

  // Filtered list based on search term
  const filteredJobs = jobList.filter((job) =>
    Object.values(job).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Function to export data to CSV
  const exportToCsv = () => {
    const headers = Object.keys(jobList[0] || {}).join(",");
    const csvContent =
      "data:text/csv;charset=utf-8," +
      headers +
      "\n" +
      jobList.map((item) => Object.values(item).join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "job_postings.csv");
    document.body.appendChild(link);
    link.click();
  };

  // Helper to keep table compact
  const truncate = (str = "", n = 40) =>
    typeof str === "string" && str.length > n
      ? `${str.slice(0, n)}…`
      : str || "";

  // Map of openingId -> { count, latestName }
  const [applicantsSummary, setApplicantsSummary] = useState({});
  const loadApplicantsSummary = async (list) => {
    try {
      const requests = (list || []).map((item) =>
        api
          .get(`/career/opening/${item._id}/applications`)
          .then((res) => ({ id: item._id, apps: res?.data?.data || [] }))
          .catch(() => ({ id: item._id, apps: [] }))
      );
      const results = await Promise.all(requests);
      const map = {};
      results.forEach(({ id, apps }) => {
        map[id] = {
          count: Array.isArray(apps) ? apps.length : 0,
          latestName:
            Array.isArray(apps) && apps.length > 0 ? apps[0].name || "" : "",
        };
      });
      setApplicantsSummary(map);
    } catch (e) {
      console.error(e);
    }
  };

  // Applicants modal state
  const [applicantsOpen, setApplicantsOpen] = useState(false);
  const [applicants, setApplicants] = useState([]);
  const [applicantsLoading, setApplicantsLoading] = useState(false);
  const [selectedOpening, setSelectedOpening] = useState(null);

  const openApplicants = async (opening) => {
    try {
      setSelectedOpening(opening);
      setApplicants([]);
      setApplicantsLoading(true);
      setApplicantsOpen(true);
      const res = await api.get(`/career/opening/${opening._id}/applications`);
      setApplicants(res?.data?.data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setApplicantsLoading(false);
    }
  };

  const closeApplicants = () => {
    setApplicantsOpen(false);
    setSelectedOpening(null);
    setApplicants([]);
  };

  const exportApplicantsToCsv = () => {
    const headers = ["#", "Candidate Name", "Email", "Resume", "Phone", "Applied On"];
    const rows = applicants.map((a, idx) => [
      idx + 1,
      (a?.name || "").replace(/\n|\r/g, " "),
      (a?.email || "").replace(/\n|\r/g, " "),
      (a?.resumeUrl || "").replace(/\n|\r/g, " "),
      (a?.phone || "").toString().replace(/\n|\r/g, " "),
      a?.createdAt ? new Date(a.createdAt).toLocaleString() : "-",
    ]);
    const csv = [headers, ...rows]
      .map((row) =>
        row.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    const title = selectedOpening
      ? selectedOpening.jobTitle || "applicants"
      : "applicants";
    link.download = `${title
      .replace(/[^a-z0-9]+/gi, "_")
      .toLowerCase()}_applicants.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex bg-gray-50 dark:bg-gray-900 dark:text-white min-h-screen">
      <Sidebar />
      <div className="flex-1 p-4 ml-64 overflow-auto font-sans">
        <div className="w-full space-y-10">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4 text-center tracking-tight">
              Job Postings Management
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          </div>

          {/* Search and Actions */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="w-full md:w-64">
              <input
                type="text"
                placeholder="Search job postings..."
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition duration-300 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={exportToCsv}
                className="bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-300 flex items-center space-x-2 dark:bg-gray-700 dark:hover:bg-gray-600"
              >
                <FaFileExport />
                <span>Export</span>
              </button>
              <button
                onClick={openModal}
                className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-500 transition duration-300 dark:bg-blue-700 dark:hover:bg-blue-800"
              >
                Add Job Posting
              </button>
            </div>
          </div>

          {/* Add Job Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-sm p-4">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-11/12 md:w-2/3 lg:w-1/2 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Add Job Posting
                  </h2>
                  <button
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition duration-300"
                  >
                    <RxCross2 size={24} />
                  </button>
                </div>
                <form onSubmit={submitJobPostingData} className="space-y-4">
                  <input
                    className="w-full rounded-lg border-2 border-gray-300 p-3 text-gray-800 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition duration-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                    type="text"
                    placeholder="Job Location"
                    name="jobLocation"
                    value={job.jobLocation}
                    onChange={handleChange}
                    required
                  />
                  <input
                    className="w-full rounded-lg border-2 border-gray-300 p-3 text-gray-800 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition duration-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                    type="text"
                    placeholder="Job Title"
                    name="jobTitle"
                    value={job.jobTitle}
                    onChange={handleChange}
                    required
                  />
                  <textarea
                    className="w-full rounded-lg border-2 border-gray-300 p-3 text-gray-800 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition duration-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                    placeholder="Responsibilities (comma-separated)"
                    name="responsibility"
                    value={job.responsibility}
                    onChange={handleChange}
                    rows="3"
                  />
                  <input
                    className="w-full rounded-lg border-2 border-gray-300 p-3 text-gray-800 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition duration-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                    type="text"
                    placeholder="Experience"
                    name="experience"
                    value={job.experience}
                    onChange={handleChange}
                  />
                  <input
                    className="w-full rounded-lg border-2 border-gray-300 p-3 text-gray-800 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition duration-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                    type="text"
                    placeholder="Skills (comma-separated)"
                    name="skill"
                    value={job.skill}
                    onChange={handleChange}
                  />
                  <textarea
                    className="w-full rounded-lg border-2 border-gray-300 p-3 text-gray-800 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition duration-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                    placeholder="Job Brief"
                    name="jobProfile"
                    value={job.jobProfile}
                    onChange={handleChange}
                    rows="5"
                  />
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-300 dark:bg-blue-700 dark:hover:bg-blue-800"
                  >
                    Submit Job Posting
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Job Listings Table */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-600 dark:text-gray-300">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600">
                  <tr>
                    <th scope="col" className="px-6 py-4">S No.</th>
                    <th scope="col" className="px-6 py-4">Job Title</th>
                    <th scope="col" className="px-6 py-4">Experience</th>
                    <th scope="col" className="px-6 py-4">Location</th>
                    <th scope="col" className="px-6 py-4">Skills</th>
                    <th scope="col" className="px-6 py-4">Job Brief</th>
                    <th scope="col" className="px-6 py-4">Applicants</th>
                    <th scope="col" className="px-6 py-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredJobs.length > 0 ? (
                    filteredJobs.map((item, index) => (
                      <tr
                        key={item._id}
                        className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-300"
                      >
                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4" title={item.jobTitle}>
                          {truncate(item.jobTitle, 50)}
                        </td>
                        <td className="px-6 py-4" title={item.experience}>
                          {truncate(item.experience, 30)}
                        </td>
                        <td className="px-6 py-4" title={item.jobLocation}>
                          {truncate(item.jobLocation, 30)}
                        </td>
                        <td className="px-6 py-4" title={item.skill}>
                          {truncate(item.skill, 40)}
                        </td>
                        <td className="px-6 py-4" title={item.jobProfile}>
                          {truncate(item.jobProfile, 60)}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
                            {applicantsSummary[item._id]?.count || 0}
                          </span>
                        </td>
                        <td className="px-6 py-4 space-x-2 whitespace-nowrap text-center">
                          <Link to={`/Admin/jobposting/view/${item._id}`}>
                            <button className="bg-green-500 text-white font-semibold py-2 px-3 rounded-lg hover:bg-green-600 transition duration-300 text-sm">
                              View
                            </button>
                          </Link>
                          <Link to={`/Admin/jobposting/edit/${item._id}`}>
                            <button className="bg-blue-500 text-white font-semibold py-2 px-3 rounded-lg hover:bg-blue-600 transition duration-300 text-sm">
                              Edit
                            </button>
                          </Link>
                          <button
                            onClick={() => openApplicants(item)}
                            className="bg-gray-700 text-white font-semibold py-2 px-3 rounded-lg hover:bg-gray-800 transition duration-300 text-sm"
                          >
                            Applicants ({applicantsSummary[item._id]?.count || 0})
                          </button>
                          <button
                            onClick={() => handleDeleteButtonClick(item._id)}
                            className="bg-red-500 text-white font-semibold py-2 px-3 rounded-lg hover:bg-red-600 transition duration-300 text-sm"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center py-8 text-gray-500 dark:text-gray-400">
                        No job postings found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Applicants Modal */}
          {applicantsOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-sm p-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] flex flex-col">
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-600">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Applicants for{" "}
                    {selectedOpening
                      ? truncate(selectedOpening.jobTitle, 40)
                      : "Job"}
                  </h2>
                  <button
                    onClick={closeApplicants}
                    className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition duration-300 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                  >
                    <RxCross2 size={24} />
                  </button>
                </div>
                <div className="flex-1 overflow-auto p-6">
                  <div className="flex justify-end mb-4">
                    <button
                      onClick={exportApplicantsToCsv}
                      className="bg-gray-800 text-white text-sm font-semibold py-2 px-3 rounded-lg hover:bg-gray-700 transition dark:bg-gray-700 dark:hover:bg-gray-600"
                    >
                      Export Applicants
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-600 dark:text-gray-300">
                      <thead className="sticky top-0 z-10 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600">
                        <tr>
                          <th className="px-6 py-3">#</th>
                          <th className="px-6 py-3">Candidate Name</th>
                          <th className="px-6 py-3">Email</th>
                          <th className="px-6 py-3">Resume</th>
                          <th className="px-6 py-3">Phone</th>
                          <th className="px-6 py-3">Applied On</th>
                        </tr>
                      </thead>
                      <tbody>
                        {applicantsLoading ? (
                          <tr>
                            <td
                              colSpan="6"
                              className="text-center py-8 text-gray-500 dark:text-gray-400"
                            >
                              Loading...
                            </td>
                          </tr>
                        ) : applicants.length > 0 ? (
                          applicants.map((a, idx) => (
                            <tr
                              key={a._id || idx}
                              className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
                            >
                              <td className="px-6 py-3">{idx + 1}</td>
                              <td className="px-6 py-3" title={a.name}>
                                {truncate(a.name, 40)}
                              </td>
                              <td className="px-6 py-3" title={a.email}>
                                {truncate(a.email, 40)}
                              </td>
                              <td className="px-6 py-3">
                                {a.resumeUrl ? (
                                  <a
                                    href={a.resumeUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
                                  >
                                    View Resume
                                  </a>
                                ) : (
                                  <span className="text-gray-500">No Resume</span>
                                )}
                              </td>
                              <td className="px-6 py-3" title={a.phone}>
                                {truncate(a.phone, 20)}
                              </td>
                              <td className="px-6 py-3">
                                {a.createdAt
                                  ? new Date(a.createdAt).toLocaleString()
                                  : "-"}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan="6"
                              className="text-center py-8 text-gray-500 dark:text-gray-400"
                            >
                              No applicants yet.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminJobPosting;
