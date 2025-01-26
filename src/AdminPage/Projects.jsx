import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";

const customStyle = {
  position: "absolute",
  top: "10px",
  marginLeft: "200px",
  right: "auto",
  width: "85%",
};



const Projects = () => {
  const [viewAll, setViewAll] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(25);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3500/project/viewAll/data"
        );
        setViewAll(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleDeleteUser = async (id) => {
    try {
      const myToken = localStorage.getItem("myToken");
      const response = await axios.delete(
        `http://localhost:3500/project/Delete/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${myToken}`,
          },
        }
      );
      console.log(response, "response");
      if (response.status >= 200 && response.status < 300) {
        alert("Property deleted successfully.");
        window.location.reload();
      } else {
        alert("Failed to delete user. Server returned an error.");
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status === 401) {
          console.log("Unauthorized: You don't have permission to delete this user.");
          alert("You are not authorized to delete this user.");
        } else {
          console.error("An error occurred while deleting user:", error.response.status);
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received from the server.");
      } else {
        // Something happened in setting up the request that triggered an error
        console.error("Error in request setup:", error.message);
      }
    }
  };

  const handleDeleteButtonClick = (id) => {
    const confirmDeletion = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDeletion) {
      handleDeleteUser(id);
      // window.location.reload();
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredProjects = viewAll.filter((item) =>
    item.projectName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredProjects.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

 
  

  return (
    <div>
      <Sidebar />
      <div style={customStyle}>
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
            value={searchTerm}
            onChange={handleSearch}
          />
          <span>
            {" "}
            <div className="flex justify-end ml-20">
              <Link to={"/admin/project-insert"}>
                <button
                  className="bg-blue-700 p-2 sm:rounded-lg text-white ml-2"
                >
                  Add New
                </button>  
              </Link>
            </div>
          </span>
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
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Type
                  </th>

                  <th scope="col" className="px-6 py-3">
                    City
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Address
                  </th>

                  <th scope="col" className="px-6 py-3 text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentRows.map((item, index) => {
                  const serialNumber = indexOfFirstRow + index + 1;
                  const id = item._id;
                  const pUrl = item.project_url;
                  return (
                    <tr
                      key={index}
                      className="bg-white-500 border-b border-red-400"
                    >
                      <td className="px-2 py-1">{serialNumber}</td>
                      <td className="px-2 py-1">{item.projectName}</td>
                      <td className="px-2 py-1">{item.type}</td>
                      <td className="px-2 py-1">{item.state}</td>
                      <td className="px-2 py-1">{item.projectAddress}</td>

                      <td className="px-2 py-1 flex space-x-1">

                        <Link to={`/Admin/ProjectsView/${pUrl}`}>
                          <button
                            type="button"
                            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800 font-medium rounded-lg text-sm px-2 py-1.5 text-center"
                          >
                            {" "}
                            View
                          </button>
                        </Link>

                        <Link to={`/Admin/ProjectsEdit/${id}`}>
                          <button
                            type="button"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-2 py-1.5 text-center"
                          >
                            {" "}
                            Edit
                          </button>
                        </Link>

                        <Link to={`/Admin/ProjectsAddBhk/${id}`}>
                          <button
                            type="button"
                            className="text-white bg-yellow-600 hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-500 dark:bg-yellow-600 dark:hover:bg-yellow-500 focus:outline-none dark:focus:ring-yellow-600 font-medium rounded-lg text-sm px-2 py-1.5 text-center"
                          >
                            {" "}
                            ADD BHK
                          </button>
                        </Link>

                        <Link to={`/Admin/ProjectAddHighlights/${id}`}>
                          <button
                            type="button"
                            className="text-white bg-pink-600 hover:bg-pink-800 focus:ring-4 focus:pink-yellow-500 dark:bg-pink-600 dark:hover:bg-pink-500 focus:outline-none dark:focus:ring-pink-600 font-medium rounded-lg text-sm px-2 py-1.5 text-center"
                          >
                            {" "}
                            ADD Highlights
                          </button>
                        </Link>

                        <button
                          onClick={() => handleDeleteButtonClick(id)}
                          type="button"
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
            <div className="flex justify-center mt-2 mb-2">
              {Array.from(
                { length: Math.ceil(viewAll.length / rowsPerPage) },
                (_, index) => (
                  <button
                    key={index}
                    onClick={() => paginate(index + 1)}
                    className={`mx-2 px-3 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 ${
                      currentPage === index + 1
                        ? "bg-red-600 text-white"
                        : "bg-gray-300 text-gray-700"
                    }`}
                  >
                    {index + 1}
                  </button>
                )
              )}
            </div>
            {/* <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <AddNew />
            </Modal> */}

            {/* <Link to={"/admin/project-insert"}>
              <AddNew />
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
