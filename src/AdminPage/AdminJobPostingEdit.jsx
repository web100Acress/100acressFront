import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { FaArrowLeft } from "react-icons/fa";
import api from "../config/apiClient";

const AdminJobPostingEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [job, setJob] = useState({
    jobLocation: "",
    jobTitle: "",
    responsibility: "",
    experience: "",
    skill: "",
    jobProfile: "",
  });

  useEffect(() => {
    fetchJobData();
  }, [id]);

  const fetchJobData = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/career/opening/View/${id}`);
      if (res.data && res.data.data) {
        setJob(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching job data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob({ ...job, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const res = await api.put(`/career/opening/Update/${id}`, job);
      if (res.status >= 200 && res.status < 300) {
        alert("Job posting updated successfully!");
        navigate("/Admin/jobposting");
      }
    } catch (error) {
      console.error("Error updating job posting:", error);
      alert("Failed to update job posting. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex bg-gray-50 dark:bg-gray-900 dark:text-white min-h-screen">
        <Sidebar />
        <div className="flex-1 p-4 ml-64 flex items-center justify-center">
          <div className="text-xl">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex bg-gray-50 dark:bg-gray-900 dark:text-white min-h-screen">
      <Sidebar />
      <div className="flex-1 p-4 ml-64 overflow-auto font-sans">
        <div className="w-full space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4">
            <Link
              to="/Admin/jobposting"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              <FaArrowLeft />
              <span>Back to Job Postings</span>
            </Link>
          </div>

          {/* Edit Form */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-600 pb-4">
              Edit Job Posting
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Job Location *
                  </label>
                  <input
                    type="text"
                    name="jobLocation"
                    value={job.jobLocation}
                    onChange={handleChange}
                    className="w-full rounded-lg border-2 border-gray-300 p-3 text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition duration-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    name="jobTitle"
                    value={job.jobTitle}
                    onChange={handleChange}
                    className="w-full rounded-lg border-2 border-gray-300 p-3 text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition duration-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Experience
                </label>
                <input
                  type="text"
                  name="experience"
                  value={job.experience}
                  onChange={handleChange}
                  className="w-full rounded-lg border-2 border-gray-300 p-3 text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition duration-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Skills (comma-separated)
                </label>
                <input
                  type="text"
                  name="skill"
                  value={job.skill}
                  onChange={handleChange}
                  className="w-full rounded-lg border-2 border-gray-300 p-3 text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition duration-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Responsibilities (one per line)
                </label>
                <textarea
                  name="responsibility"
                  value={job.responsibility}
                  onChange={handleChange}
                  rows="4"
                  className="w-full rounded-lg border-2 border-gray-300 p-3 text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition duration-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Enter each responsibility on a new line"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Job Description
                </label>
                <textarea
                  name="jobProfile"
                  value={job.jobProfile}
                  onChange={handleChange}
                  rows="6"
                  className="w-full rounded-lg border-2 border-gray-300 p-3 text-gray-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition duration-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Detailed job description and requirements"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-600">
                <Link to="/Admin/jobposting">
                  <button
                    type="button"
                    className="bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300 dark:bg-gray-600 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                </Link>
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-blue-700 dark:hover:bg-blue-800"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminJobPostingEdit;
