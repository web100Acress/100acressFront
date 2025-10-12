import React, { useEffect, useState } from "react";
import HrSidebar from "./HrSidebar";
import api from '../config/apiClient';
import { useParams, Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaBriefcase, FaUserTie, FaTasks, FaClipboardList, FaCode } from 'react-icons/fa'; // Importing icons

const JobPostingView = () => {
  const [data, setData] = useState({});
  const { id } = useParams();

  const fetchJobPostingData = async () => {
    try {
      const res = await api.get(`/career/opening/View/${id}`);
      setData(res.data.data);
      // eslint-disable-next-line no-console
      console.debug('[JobPostingView] fetched data', res.data?.data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('[JobPostingView] error', error);
    }
  };

  useEffect(() => {
    fetchJobPostingData();
  }, [id]);

   return (
    <div className="flex bg-gray-100 min-h-screen">
      <HrSidebar />
      <div className="flex-1 p-8 md:p-10 lg:p-12 ml-0 md:ml-64">
        <div className="w-full bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Job Posting Details</h2>
            <Link
              className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition duration-300"
              to={`/hr/jobposting/applications/${id}`}
            >
              View Applications
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Job Title */}
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <h4 className="flex items-center text-lg font-semibold text-gray-700 mb-1">
                <FaUserTie className="mr-2 text-blue-500" /> Job Title
              </h4>
              <p className="text-gray-900 font-medium">{data.jobTitle || 'N/A'}</p>
            </div>

            {/* Job Location */}
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <h4 className="flex items-center text-lg font-semibold text-gray-700 mb-1">
                <FaMapMarkerAlt className="mr-2 text-blue-500" /> Job Location
              </h4>
              <p className="text-gray-900 font-medium">{data.jobLocation || 'N/A'}</p>
            </div>

            {/* Experience */}
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <h4 className="flex items-center text-lg font-semibold text-gray-700 mb-1">
                <FaBriefcase className="mr-2 text-blue-500" /> Experience
              </h4>
              <p className="text-gray-900 font-medium">{data.experience || 'N/A'}</p>
            </div>

            {/* Skills */}
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <h4 className="flex items-center text-lg font-semibold text-gray-700 mb-1">
                <FaCode className="mr-2 text-blue-500" /> Skills
              </h4>
              <p className="text-gray-900 font-medium">{data.skill || 'N/A'}</p>
            </div>
          </div>

          {/* Job Profile */}
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mt-6">
            <h4 className="flex items-center text-lg font-semibold text-gray-700 mb-1">
              <FaClipboardList className="mr-2 text-blue-500" /> Job Profile
            </h4>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{data.jobProfile || 'N/A'}</p>
          </div>

          {/* Responsibility */}
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mt-6">
            <h4 className="flex items-center text-lg font-semibold text-gray-700 mb-1">
              <FaTasks className="mr-2 text-blue-500" /> Responsibilities
            </h4>
            <ul className="list-disc list-inside text-gray-700 leading-relaxed">
              {data.responsibility?.split(',').map((item, index) => (
                <li key={index}>{item.trim()}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPostingView;