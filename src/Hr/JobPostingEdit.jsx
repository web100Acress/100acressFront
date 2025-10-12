import React, { useState, useEffect } from "react";
import Sidebar from "../AdminPage/Sidebar";
import { useParams, useNavigate } from "react-router-dom";
import api from "../config/apiClient";
import { FaSave, FaSpinner } from 'react-icons/fa';

const JobPostingEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    jobLocation: "",
    jobTitle: "",
    responsibility: "",
    experience: "",
    skill: "",
    jobProfile: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    const fetchJobPostingData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get(`/career/opening/View/${id}`);
        const data = res?.data?.data || {};
        // Debug payload to ensure mapping is correct
        // eslint-disable-next-line no-console
        console.debug("[JobPostingEdit] fetched data", data);
        setFormData((prev) => ({ ...prev, ...data }));
      } catch (err) {
        console.error("Failed to fetch job posting:", err);
        setError("Failed to load job data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchJobPostingData();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    setIsUpdating(true);
    setUpdateSuccess(false);
    setError(null);
    try {
      await api.put(`/career/opening/update/${id}`, formData);
      setUpdateSuccess(true);
      alert("Job posting updated successfully!");
    } catch (err) {
      console.error("Failed to update job posting:", err);
      setError("Failed to update job posting. Please check the details and try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8 md:p-10 lg:p-12 ml-0 md:ml-64 transition-all duration-300">
        <div className="w-full">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Edit Job Posting</h2>

          {loading && (
            <div className="flex items-center justify-center py-10 text-gray-500">
              <FaSpinner className="animate-spin mr-2" /> Loading data...
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline ml-2">{error}</span>
            </div>
          )}
          
          {updateSuccess && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
              <strong className="font-bold">Success!</strong>
              <span className="block sm:inline ml-2">Job posting has been updated.</span>
            </div>
          )}

          {!loading && !error && (
            <div className="bg-white p-6 rounded-lg shadow-lg space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">Job Title</label>
                  <input
                    type="text"
                    name="jobTitle"
                    value={formData.jobTitle || ""}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
                    placeholder="e.g., Senior Software Engineer"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">Job Location</label>
                  <input
                    type="text"
                    name="jobLocation"
                    value={formData.jobLocation || ""}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
                    placeholder="e.g., New Delhi, India"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">Experience</label>
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience || ""}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
                    placeholder="e.g., 5+ years"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">Required Skills</label>
                  <input
                    type="text"
                    name="skill"
                    value={formData.skill || ""}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
                    placeholder="e.g., React, Node.js, MongoDB"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Job Profile</label>
                <textarea
                  name="jobProfile"
                  value={formData.jobProfile || ""}
                  onChange={handleChange}
                  rows="4"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
                  placeholder="Provide a detailed description of the job."
                ></textarea>
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Responsibilities</label>
                <textarea
                  name="responsibility"
                  value={formData.responsibility || ""}
                  onChange={handleChange}
                  rows="4"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
                  placeholder="List the key responsibilities of this role."
                ></textarea>
              </div>

              <button
                type="button"
                onClick={handleUpdate}
                disabled={isUpdating}
                className={`w-full flex items-center justify-center py-3 px-6 rounded-md text-white font-semibold transition duration-300 transform ${
                  isUpdating
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-700 hover:scale-105"
                }`}
              >
                {isUpdating ? (
                  <FaSpinner className="animate-spin mr-2" />
                ) : (
                  <FaSave className="mr-2" />
                )}
                {isUpdating ? "Updating..." : "Update Job Posting"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobPostingEdit;