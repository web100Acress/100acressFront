import React, { useContext, useState, useEffect, useMemo } from "react";
import HrSidebar from "../Hr/HrSidebar";
import { Link } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { FaFileExport, FaSearch } from "react-icons/fa"; // Added icons for a cleaner UI
import api from "../config/apiClient";
import { DataContext } from "../MyContext";

const JobPosting = () => {
  const { jobPostingData } = useContext(DataContext);
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
        console.error("Failed to delete user. Server returned an error.");
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

  // New: Filtered list based on search term
  const filteredJobs = jobList.filter((job) =>
    Object.values(job).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // New: Function to export data to CSV
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
  const [appActionLoading, setAppActionLoading] = useState({
    id: null,
    type: null,
  });
  // Filters for applicants modal (4 filters)
  const [appFilters, setAppFilters] = useState({
    name: "",
    email: "",
    phone: "",
    from: "",
    to: "",
  });

  const filteredApplicantsList = useMemo(() => {
    let list = Array.isArray(applicants) ? applicants : [];
    const name = appFilters.name?.toLowerCase?.() || "";
    const email = appFilters.email?.toLowerCase?.() || "";
    const phone = (appFilters.phone || "").trim();
    const from = appFilters.from ? new Date(appFilters.from) : null;
    const to = appFilters.to ? new Date(appFilters.to) : null;
    if (to) {
      // include entire end day
      to.setHours(23, 59, 59, 999);
    }
    return list.filter((a) => {
      const nm = (a?.name || "").toLowerCase();
      const em = (a?.email || "").toLowerCase();
      const ph = (a?.phone || "").toString();
      const dt = a?.createdAt ? new Date(a.createdAt) : null;
      if (name && !nm.includes(name)) return false;
      if (email && !em.includes(email)) return false;
      if (phone && !ph.includes(phone)) return false;
      if (from && (!dt || dt < from)) return false;
      if (to && (!dt || dt > to)) return false;
      return true;
    });
  }, [applicants, appFilters]);

  const exportApplicantsToCsv = () => {
    const headers = ["#", "Candidate Name", "Email", "Phone", "Applied On"];
    const rows = filteredApplicantsList.map((a, idx) => [
      idx + 1,
      (a?.name || "").replace(/\n|\r/g, " "),
      (a?.email || "").replace(/\n|\r/g, " "),
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
    setAppFilters({ name: "", email: "", phone: "", from: "", to: "" });
    setAppActionLoading({ id: null, type: null });
  };

  const updateApplicantStatusLocal = (id, status) => {
    setApplicants((prev) =>
      prev.map((a) => (a._id === id ? { ...a, status } : a))
    );
  };
  const approveApplicant = async (id) => {
    if (!id) return;
    setAppActionLoading({ id, type: "approve" });
    try {
      const res = await api.put(`/career/application/${id}/approve`);
      if (res?.status >= 200 && res?.status < 300) {
        updateApplicantStatusLocal(id, "approved");
      }
    } catch (e) {
      console.error(e);
      alert("Failed to approve or send mail.");
    } finally {
      setAppActionLoading({ id: null, type: null });
    }
  };
  const rejectApplicant = async (id) => {
    if (!id) return;
    setAppActionLoading({ id, type: "reject" });
    try {
      const res = await api.put(`/career/application/${id}/reject`);
      if (res?.status >= 200 && res?.status < 300) {
        updateApplicantStatusLocal(id, "rejected");
      }
    } catch (e) {
      console.error(e);
      alert("Failed to reject or send mail.");
    } finally {
      setAppActionLoading({ id: null, type: null });
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <HrSidebar />

      <div className="flex-1 p-8 md:p-10 lg:p-1 ml-0 md:ml-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-0">
         
        </div>

        <div className="flex items-center justify-between gap-4 mb-2">
        <div className="w-64">
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-2 border-2 border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition duration-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
        <div className="flex-1 p-8 md:p-10 lg:p-4 ml-0 md:ml-5">
            <div className="text-center mb-0">
              <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 mb-2 tracking-tight">
                JOB POSTING
              </h1>
            </div>
         
          <div className="w-32 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          </div>
         
          <div className="flex items-center gap-3">
            <button
              onClick={exportToCsv}
              className="bg-gray-800 text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-700 transition duration-300 flex items-center space-x-2"
            >
              <FaFileExport />
              <span>Export</span>
            </button>
            <button
              onClick={openModal}
              className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-500 transition duration-300"
            >
              Add Job Posting
            </button>
          </div>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white p-6 rounded-lg shadow-xl w-11/12 md:w-2/3 lg:w-1/2">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  Job Posting
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-800 transition duration-300"
                >
                  <RxCross2 size={24} />
                </button>
              </div>
              <form onSubmit={submitJobPostingData} className="space-y-4">
                <input
                  className="w-full rounded-md border-2 border-gray-300 p-2 text-gray-800 placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition duration-300"
                  type="text"
                  placeholder="Job Location"
                  name="jobLocation"
                  value={job.jobLocation}
                  onChange={handleChange}
                />
                <input
                  className="w-full rounded-md border-2 border-gray-300 p-2 text-gray-800 placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition duration-300"
                  type="text"
                  placeholder="Job Title"
                  name="jobTitle"
                  value={job.jobTitle}
                  onChange={handleChange}
                />
                <textarea
                  className="w-full rounded-md border-2 border-gray-300 p-2 text-gray-800 placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition duration-300"
                  placeholder="Responsibilities (comma-separated)"
                  name="responsibility"
                  value={job.responsibility}
                  onChange={handleChange}
                  rows="3"
                />
                <input
                  className="w-full rounded-md border-2 border-gray-300 p-2 text-gray-800 placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition duration-300"
                  type="text"
                  placeholder="Experience"
                  name="experience"
                  value={job.experience}
                  onChange={handleChange}
                />
                <input
                  className="w-full rounded-md border-2 border-gray-300 p-2 text-gray-800 placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition duration-300"
                  type="text"
                  placeholder="Skills (comma-separated)"
                  name="skill"
                  value={job.skill}
                  onChange={handleChange}
                />
                <textarea
                  className="w-full rounded-md border-2 border-gray-300 p-2 text-gray-800 placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition duration-300"
                  placeholder="Job Brief"
                  name="jobProfile"
                  value={job.jobProfile}
                  onChange={handleChange}
                  rows="5"
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-500 transition duration-300"
                >
                  Submit Job
                </button>
              </form>
            </div>
          </div>
        )}

        {applicantsOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] flex flex-col">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800">
                  Applicants{" "}
                  {selectedOpening
                    ? `- ${truncate(selectedOpening.jobTitle, 40)}`
                    : ""}
                </h2>
                <button
                  onClick={closeApplicants}
                  className="text-gray-500 hover:text-gray-800 transition duration-300 p-1 hover:bg-gray-100 rounded-full"
                >
                  <RxCross2 size={24} />
                </button>
              </div>
              {/* Filters toolbar */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-4">
                <input
                  type="text"
                  placeholder="Filter by name"
                  className="border border-gray-300 rounded-md p-2 text-sm"
                  value={appFilters.name}
                  onChange={(e) =>
                    setAppFilters((s) => ({ ...s, name: e.target.value }))
                  }
                />
                <input
                  type="text"
                  placeholder="Filter by email"
                  className="border border-gray-300 rounded-md p-2 text-sm"
                  value={appFilters.email}
                  onChange={(e) =>
                    setAppFilters((s) => ({ ...s, email: e.target.value }))
                  }
                />
                <input
                  type="text"
                  placeholder="Filter by phone"
                  className="border border-gray-300 rounded-md p-2 text-sm"
                  value={appFilters.phone}
                  onChange={(e) =>
                    setAppFilters((s) => ({ ...s, phone: e.target.value }))
                  }
                />
                <input
                  type="date"
                  className="border border-gray-300 rounded-md p-2 text-sm"
                  value={appFilters.from}
                  onChange={(e) =>
                    setAppFilters((s) => ({ ...s, from: e.target.value }))
                  }
                  title="From date"
                />
                <div className="flex items-center space-x-2">
                  <input
                    type="date"
                    className="flex-1 border border-gray-300 rounded-md p-2 text-sm"
                    value={appFilters.to}
                    onChange={(e) =>
                      setAppFilters((s) => ({ ...s, to: e.target.value }))
                    }
                    title="To date"
                  />
                  <button
                    onClick={exportApplicantsToCsv}
                    className="bg-gray-800 text-white text-sm font-semibold py-2 px-3 rounded-md hover:bg-gray-700 transition"
                    title="Export filtered applicants"
                  >
                    Export
                  </button>
                </div>
              </div>
              <div className="flex-1 overflow-auto">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-600">
                    <thead className="sticky top-0 z-10 text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3">#</th>
                        <th className="px-6 py-3">Candidate Name</th>
                        <th className="px-6 py-3">Email</th>
                        <th className="px-6 py-3">Phone</th>
                        <th className="px-6 py-3">Applied On</th>
                        {/* <th className="px-6 py-3">Status</th> */}
                        {/* <th className="px-6 py-3 text-center">Action</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {applicantsLoading ? (
                        <tr>
                          <td
                            colSpan="7"
                            className="text-center py-8 text-gray-500"
                          >
                            Loading...
                          </td>
                        </tr>
                      ) : filteredApplicantsList.length > 0 ? (
                        filteredApplicantsList.map((a, idx) => {
                          const status = a.status || "pending";
                          const isApproved = status === "approved";
                          const isRejected = status === "rejected";
                          const loadingApprove =
                            appActionLoading.id === a._id &&
                            appActionLoading.type === "approve";
                          const loadingReject =
                            appActionLoading.id === a._id &&
                            appActionLoading.type === "reject";
                          return (
                            <tr
                              key={a._id || idx}
                              className="bg-white border-b border-gray-200"
                            >
                              <td className="px-6 py-3">{idx + 1}</td>
                              <td className="px-6 py-3" title={a.name}>
                                {truncate(a.name, 40)}
                              </td>
                              <td className="px-6 py-3" title={a.email}>
                                {truncate(a.email, 40)}
                              </td>
                              <td className="px-6 py-3" title={a.phone}>
                                {truncate(a.phone, 20)}
                              </td>
                              <td className="px-6 py-3">
                                {a.createdAt
                                  ? new Date(a.createdAt).toLocaleString()
                                  : "-"}
                              </td>
                              {/* <td className="px-6 py-3">
                                {isApproved ? (
                                  <span className="inline-flex items-center px-2 py-1 rounded text-xs font-semibold bg-green-100 text-green-700">Approved</span>
                                ) : isRejected ? (
                                  <span className="inline-flex items-center px-2 py-1 rounded text-xs font-semibold bg-red-100 text-red-700">Rejected</span>
                                ) : (
                                  <span className="inline-flex items-center px-2 py-1 rounded text-xs font-semibold bg-yellow-100 text-yellow-700">Pending</span>
                                )}
                              </td> */}
                              <td className="px-6 py-3 text-center space-x-2 whitespace-nowrap">
                                {/* Approve/Reject buttons temporarily disabled as requested */}
                                {/* <button
                                  disabled={isApproved || loadingApprove}
                                  onClick={() => approveApplicant(a._id)}
                                  className={`px-3 py-1 rounded-md text-white font-semibold transition ${isApproved ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
                                >
                                  {loadingApprove ? 'Approving…' : isApproved ? 'Approved' : 'Approve'}
                                </button>
                                <button
                                  disabled={isRejected || loadingReject}
                                  onClick={() => rejectApplicant(a._id)}
                                  className={`px-3 py-1 rounded-md text-white font-semibold transition ${isRejected ? 'bg-red-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'}`}
                                >
                                  {loadingReject ? 'Rejecting…' : isRejected ? 'Rejected' : 'Reject'}
                                </button> */}
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td
                            colSpan="7"
                            className="text-center py-8 text-gray-500"
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

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-600">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    S No.
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Job Title
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Experience
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Skills
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Job Brief
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredJobs.length > 0 ? (
                  filteredJobs.map((item, index) => (
                    <tr
                      key={item._id}
                      className="bg-white border-b border-gray-200 hover:bg-gray-50 transition duration-300"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
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
                      <td className="px-6 py-4 space-x-2 whitespace-nowrap text-center">
                        <Link to={`/hr/jobposting/view/${item._id}`}>
                          <button className="bg-green-500 text-white font-semibold py-1 px-3 rounded-md hover:bg-green-600 transition duration-300">
                            View
                          </button>
                        </Link>
                        <Link to={`/hr/jobposting/edit/${item._id}`}>
                          <button className="bg-blue-500 text-white font-semibold py-1 px-3 rounded-md hover:bg-blue-600 transition duration-300">
                            Edit
                          </button>
                        </Link>
                        {/* <button
                          onClick={() => {
                            if (localStorage.getItem("userRole") !== "hr") {
                              alert(
                                "Note: Only HR users can view job applications. Please log in as an HR user to access this feature."
                              );
                              return;
                            }
                            openApplicants(item);
                          }}
                          className="bg-gray-700 text-white font-semibold py-1 px-3 rounded-md hover:bg-gray-800 transition duration-300"
                        >
                          Applicants
                        </button> */}
                        <button
                          onClick={() => handleDeleteButtonClick(item._id)}
                          className="bg-red-500 text-white font-semibold py-1 px-3 rounded-md hover:bg-red-600 transition duration-300"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-8 text-gray-500">
                      No job postings found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPosting;
