import React, { useContext, useState } from "react";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { DataContext } from "../MyContext";
const Career = () => {
  const { careerData } = useContext(DataContext);

  const customStyle = {
    position: "absolute",
    top: "100px",
    marginLeft: "250px",
    right: "auto",
    width: "80%",
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [career, setCareer] = useState({
    whyAcress: "",
    driveCulture: "",
    inHouse: "",
    lifeAcress: [],
  });

  const [fileData, setFileData] = useState({
    bannerImage: null,
    activityImage: [null],
    highlightImage: [null],
  });

  const resetData = () => {
    setCareer({
      whyAcress: "",
      driveCulture: "",
      inHouse: "",
      lifeAcress: [],
    });
  };

  const resetFileData = () => {
    setFileData({
      bannerImage: null,
      activityImage: [null],
      highlightImage: [null],
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCareer({ ...career, [name]: value });
  };

  const handleActivityImageChange = (e) => {
    var files = e.target.files;
    if (files) {
      const updatedOtherImage = [];
      for (let i = 0; i < files.length; i++) {
        updatedOtherImage.push(files[i]);
      }
      setFileData({
        ...fileData,
        activityImage: updatedOtherImage,
      });
    } else {
      console.error("No files selected");
    }
  };

  const handleHighlightImageChange = (e) => {
    var files = e.target.files;
    if (files) {
      const updatedOtherImage = [];
      for (let i = 0; i < files.length; i++) {
        updatedOtherImage.push(files[i]);
      }
      setFileData({
        ...fileData,
        highlightImage: updatedOtherImage,
      });
    } else {
      console.error("No files selected");
    }
  };

  const handleFileChange = (e, key) => {
    const newFileData = { ...fileData };
    newFileData[key] = e.target.files[0];
    setFileData(newFileData);
  };

  const activityImageLength = fileData.activityImage
    ? fileData.activityImage.length
    : 0;
  const highlightImageLength = fileData.highlightImage
    ? fileData.highlightImage.length
    : 0;

  const handleSubmitData = async (e) => {
    e.preventDefault();
    const apiEndPoint = "http://localhost:3500/career/page/Insert";
    const careerDataApi = new FormData();
    for (const key in career) {
      careerDataApi.append(key, career[key]);
    }
    careerDataApi.append("bannerImage", fileData.bannerImage);

    for (let i = 0; i < activityImageLength; i++) {
      careerDataApi.append("activityImage", fileData.activityImage[i]);
    }

    for (let i = 0; i < highlightImageLength; i++) {
      careerDataApi.append("highlightImage", fileData.highlightImage[i]);
    }

    try {
      const res = await axios.post(apiEndPoint, careerDataApi);
      alert("Data Posted");
      resetData();
      resetFileData();
    } catch (error) {
      console.log(error || error.message);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:3500/career/page/delete/${id}`
      );
      if (res.status >= 200 && res.status < 300) {
        window.location.reload();
      } else {
        console.error("Failed to delete user. Server returned an error.");
      }
    } catch (error) {
      console.log(error || error.message);
    }
  };
  const handleDeleteButtonClick = (id) => {
    const confirmDeletion = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDeletion) {
      handleDeleteUser(id);
    }
  };

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
                Career Manage
              </button>
            </div>
          </span>

          {isModalOpen && (
            <div className=" z-50 fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 bg-opacity-50">
              <div className="bg-white p-6  w-1/2 rounded-lg">
                <div className="flex items-center">
                  <h2 className="text-xl font-bold mb-1 flex-grow">
                    Career Management
                  </h2>
                  <button
                    className="bg-gray-200 text-xl mx-1 p-2  text-white rounded-lg"
                    onClick={closeModal}
                  >
                    <RxCross2 className="text-black" />
                  </button>
                </div>

                <div className="flex mt-3 border-2 border-gray-200  rounded-md">
                  <div className="relative h-10  px-2 min-w-[160px]  w-full  rounded-md">
                    <p className="mt-2 font-medium border-gray-200 text-black">
                      Banner Image
                      <input
                        type="file"
                        name="bannerImage"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, "bannerImage")}
                        className="mx-2 border-gray-200"
                      />
                    </p>
                  </div>
                </div>

                <div className="flex mt-3 border-2 border-gray-200  rounded-md">
                  <div className="relative h-10  px-2 min-w-[160px]  w-full  rounded-md">
                    <p className="mt-2 font-medium border-gray-200 text-black">
                      Activity Image
                      <input
                        type="file"
                        name="activityImage"
                        onChange={handleActivityImageChange}
                        accept="image/*"
                        multiple
                        className="mx-2 border-gray-200"
                      />
                    </p>
                  </div>
                </div>

                <label className="block pt-3" for="name">
                  <input
                    className="w-full  rounded-md border-2 placeholder:text-black font-semibold text-black bg-white px-2 py-1 outline-none ring-black focus:ring-1"
                    type="text"
                    placeholder="Why Acress"
                    name="whyAcress"
                    onChange={handleChange}
                    value={career.whyAcress}
                  />
                </label>

                <label className="block pt-3" for="name">
                  <input
                    className="w-full placeholder:text-black font-semibold rounded-md border-2 bg-white px-2 py-1 outline-none ring-black focus:ring-1"
                    type="text"
                    placeholder="Drive Culture"
                    name="driveCulture"
                    onChange={handleChange}
                    value={career.driveCulture}
                  />
                </label>

                <label className="block pt-3" for="name">
                  <input
                    className="w-full placeholder:text-black font-semibold rounded-md border-2 bg-white px-2 py-1 outline-none ring-black focus:ring-1"
                    type="text"
                    placeholder="In House"
                    name="inHouse"
                    onChange={handleChange}
                    value={career.inHouse}
                  />
                </label>

                <label className="block pt-3" for="name">
                  <input
                    className="w-full placeholder:text-black font-semibold  rounded-md border-2 bg-white px-2 py-1 outline-none ring-black focus:ring-1"
                    type="text"
                    placeholder="Life Acress"
                    name="lifeAcress"
                    onChange={handleChange}
                    value={career.lifeAcress}
                  />
                </label>

                <div className="flex mt-3 border-2 border-gray-200  rounded-md">
                  <div className="relative h-10  px-2 min-w-[160px]  w-full  rounded-md">
                    <p className="mt-2 font-medium border-gray-200 text-black">
                      Highlight Image
                      <input
                        type="file"
                        name="highlightImage"
                        onChange={handleHighlightImageChange}
                        accept="image/*"
                        multiple
                        className="mx-2 border-gray-200"
                      />
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleSubmitData}
                  className="bg-red-600 p-2 mt-3 text-white rounded-lg"
                >
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
                    Banner Image
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Activity Image
                  </th>

                  <th scope="col" className="px-16 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {careerData.map((item, index) => {
                  return (
                    <tr className="bg-white-500 border-b border-red-400">
                      <td className="px-4 py-1 ">{index + 1}</td>

                      <td className="px-4 py-2">
                        <img
                          src={item.bannerImage && item.bannerImage.url}
                          alt="Image"
                          className="w-12 h-12"
                        />
                      </td>

                      <td className="px-4 py-2">
                        <div className="flex">
                          {item.activityImage.map((image, idx) => (
                            <img
                              key={idx}
                              src={image.url}
                              alt="Activity Image"
                              className="w-12 h-12 mr-2"
                            />
                          ))}
                        </div>
                      </td>

                      <td className="px-4 py-1 flex space-x-1">
                        <Link to={`/Admin/careerview/${item._id}`}>
                          <button
                            type="button"
                            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800 font-medium rounded-lg text-sm px-2 py-1.5 text-center"
                          >
                            {" "}
                            View
                          </button>
                        </Link>

                        <Link to={`/Admin/careerEdit/${item._id}`}>
                          <button
                            type="button"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-2 py-1.5 text-center"
                          >
                            {" "}
                            Edit
                          </button>
                        </Link>

                        <Link
                          to={"/Admin/jobposting"}
                          type="button"
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-2 py-1.5 text-center"
                        >
                          {" "}
                          Job Details
                        </Link>

                        <button
                          type="button"
                          onClick={() => handleDeleteButtonClick(item._id)}
                          className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800 font-medium rounded-lg text-sm px-2 py-1.5 text-center"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
