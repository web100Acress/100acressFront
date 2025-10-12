import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { FaArrowLeft } from "react-icons/fa";
import api from "../config/apiClient";

const AdminJobPostingView = () => {
  const { id } = useParams();
  const [jobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobData();
  }, [id]);

  const fetchJobData = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/career/opening/View/${id}`);
      if (res.data && res.data.data) {
        setJobData(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching job data:", error);
    } finally {
      setLoading(false);
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

  if (!jobData) {
    return (
      <div className="flex bg-gray-50 dark:bg-gray-900 dark:text-white min-h-screen">
        <Sidebar />
        <div className="flex-1 p-4 ml-64 flex items-center justify-center">
          <div className="text-xl text-red-600">Job posting not found</div>
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

          {/* Job Details */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-600 pb-4">
              {jobData.jobTitle}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Job Information */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                    Job Details
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <span className="font-medium text-gray-600 dark:text-gray-400">
                        Location:
                      </span>
                      <p className="text-gray-900 dark:text-white">{jobData.jobLocation || "Not specified"}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600 dark:text-gray-400">
                        Experience:
                      </span>
                      <p className="text-gray-900 dark:text-white">{jobData.experience || "Not specified"}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600 dark:text-gray-400">
                        Skills:
                      </span>
                      <p className="text-gray-900 dark:text-white">{jobData.skill || "Not specified"}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Job Description */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                    Job Description
                  </h3>
                  <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {jobData.jobProfile ? (
                      <p className="whitespace-pre-wrap">{jobData.jobProfile}</p>
                    ) : (
                      <p className="text-gray-500 italic">No description provided</p>
                    )}
                  </div>
                </div>

                {jobData.responsibility && (
                  <div>
                    <h4 className="font-medium text-gray-800 dark:text-white mb-2">
                      Responsibilities:
                    </h4>
                    <div className="text-gray-700 dark:text-gray-300">
                      {jobData.responsibility.split(',').map((resp, index) => (
                        <p key={index} className="mb-1">• {resp.trim()}</p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <Link to={`/Admin/jobposting/edit/${id}`}>
              <button className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 dark:bg-blue-700 dark:hover:bg-blue-800">
                Edit Job Posting
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminJobPostingView;
