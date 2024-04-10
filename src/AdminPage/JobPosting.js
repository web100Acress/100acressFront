import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import axios  from "axios";
const JobPosting = () => {
  const customStyle = {
    position: "absolute",
    top: "100px",
    marginLeft: "250px",
    right: "auto",
    width: "80%",
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  // Function to open modal
  const openModal = () => {
    setIsModalOpen(true);
  };
  // Function to close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [job, setJob] = useState({
    jobLocation: "",
    jobTitle: "",
    responsibility: "",
    experience: "",
    skill: "",
    jobProfile: "",
  });

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

  const submitJobPostingData = async(e) =>{
      e.preventDefault();
      try {
        const res = await  axios.post("")
      } catch (error) {
        console.log(error || error.message)
      }
  }

  return (
    <div>
      <Sidebar />

      <div className="" style={customStyle}>
        <div
          className="flex items-center mb-2 mt-2"
          style={{ marginLeft: "100px" }}
        >
          <button className="text-bold bg-red-600 p-2 text-white rounded-md mr-10">
            Search
          </button>
          <input
            type="text"
            placeholder="Search..."
            className="p-2 border-b-2 w-50 border-red-600 text-black placeholder-black outline-none rounded-sm"
          />
          <span>
            {" "}
            <div className="flex justify-end ml-20">
              <button
                onClick={openModal}
                className="bg-blue-700 p-2 sm:rounded-lg text-white ml-2"
              >
                Job Posting
              </button>
            </div>
          </span>

          {isModalOpen && (
            <div className=" z-50 fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 bg-opacity-50">
              <div className="bg-white p-6  w-1/2 rounded-lg">
                <div className="flex items-center">
                  <h2 className="text-xl font-bold mb-1 flex-grow">
                    Job Posting
                  </h2>
                  <button
                    className="bg-gray-200 text-xl mx-1 p-2  text-white rounded-lg"
                    onClick={closeModal}
                  >
                    <RxCross2 className="text-black" />
                  </button>
                </div>

                <label className="block pt-3" for="name">
                  <input
                    className="w-full  rounded-md border-2 placeholder:text-black font-semibold text-black bg-white px-2 py-1 outline-none ring-black focus:ring-1"
                    type="text"
                    placeholder="Job Location"
                    name="jobLocation"
                    value={job.jobLocation}
                    onChange={handleChange}
                  />
                </label>

                <label className="block pt-3" for="name">
                  <input
                    className="w-full placeholder:text-black font-semibold rounded-md border-2 bg-white px-2 py-1 outline-none ring-black focus:ring-1"
                    type="text"
                    placeholder="Job Title"
                    name="jobTitle"
                    value={job.jobTitle}
                    onChange={handleChange}
                  />
                </label>

                <label className="block pt-3" for="name">
                  <input
                    className="w-full placeholder:text-black font-semibold rounded-md border-2 bg-white px-2 py-1 outline-none ring-black focus:ring-1"
                    type="text"
                    placeholder="Responsibility"
                    name="responsibility"
                    value={job.responsibility}
                    onChange={handleChange}
                  />
                </label>

                <label className="block pt-3" for="name">
                  <input
                    className="w-full placeholder:text-black font-semibold  rounded-md border-2 bg-white px-2 py-1 outline-none ring-black focus:ring-1"
                    type="text"
                    placeholder="Experience "
                    name="experience"
                    value={job.experience}
                    onChange={handleChange}
                  />
                </label>

                <label className="block pt-3" for="name">
                  <input
                    className="w-full placeholder:text-black font-semibold  rounded-md border-2 bg-white px-2 py-1 outline-none ring-black focus:ring-1"
                    type="text"
                    placeholder="Skills "
                    name="skill"
                    value={job.skill}
                    onChange={handleChange}
                  />
                </label>

                <label className="block pt-3" for="name">
                  <input
                    className="w-full placeholder:text-black font-semibold  rounded-md border-2 bg-white px-2 py-1 outline-none ring-black focus:ring-1"
                    type="text"
                    placeholder="Job Profile "
                    name="jobProfile"
                    value={job.jobProfile}
                    onChange={handleChange}
                  />
                </label>

                <button className="bg-red-600 p-2 mt-3 text-white rounded-lg">
                  Submit Data
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-center items-center mt-0">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-5/6 mt-0">
            <table className="w-full text-sm text-left rtl:text-right text-black-100 dark:text-black-100 ">
              <thead className="text-xs text-black uppercase dark:text-black border-b-2  border-red-400">
                <tr className="">
                  <th scope="col" className="px-6 py-3">
                    S No.
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Job Profile
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Experience
                  </th>

                  <th scope="col" className="px-16 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white-500 border-b border-red-400">
                  <td className="px-4 py-1 ">1</td>
                  <td className="px-4 py-1">hghhg</td>
                  <td className="px-4 py-1">hghghgh</td>
                  <td className="px-4 py-1 flex space-x-1">
                    <Link>
                      <button
                        type="button"
                        className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800 font-medium rounded-lg text-sm px-2 py-1.5 text-center"
                      >
                        {" "}
                        View
                      </button>
                    </Link>

                    <Link>
                      <button
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-2 py-1.5 text-center"
                      >
                        {" "}
                        Edit
                      </button>
                    </Link>

                    <button
                      type="button"
                      className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800 font-medium rounded-lg text-sm px-2 py-1.5 text-center"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPosting;
