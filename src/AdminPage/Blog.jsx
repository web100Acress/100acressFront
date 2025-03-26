import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import axios from "axios";
const Blog = () => {
  const [viewAll, setViewAll] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const token = localStorage.getItem("myToken");
  const customStyle = {
    position: "absolute",
    top: "100px",
    marginLeft: "250px",
    right: "auto",
    width: "80%",
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/blog/view");
       
        setViewAll(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleDeleteUser = async (id) => {
    try {
      const response = await axios.delete(
        `/api/blog/Delete/${id}`,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          }
        }
      );
      if (response.status >= 200 && response.status < 300) {
        window.location.reload();
      } else {
        console.error("Failed to delete user. Server returned an error.");
      }
    } catch (error) {
      console.error("An error occurred while deleting user:", error.message);
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

  const filteredProjects = viewAll.filter((item) =>
    item.blog_Title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredProjects.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
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
              <Link
                to={"/blog/write"}
                className="bg-blue-700 p-2 sm:rounded-lg text-white ml-2"
              >
                Add Blog
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
                    SNo.
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Title
                  </th>
                  
                  <th scope="col" className="px-6 py-3">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Author
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentRows.map((item, index) => {
                  const serialNumber = indexOfFirstRow + index + 1;
                  const id = item._id;
                  return (
                    <tr
                      key={index}
                      className="bg-white-500 border-b border-red-400"
                    >
                      <td className="px-2 py-1">{serialNumber}</td>
                      <td className="px-2 py-1">{item.blog_Title}</td>
                      <td className="px-2 py-1">{item.blog_Category}</td>
                      <td className="px-2 py-1">{item.author}</td>
                      <td className="px-2 py-1 flex space-x-1">
                        <Link to={`/Admin/blog/view/${id}`}>
                          <button
                            type="button"
                            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800 font-medium rounded-lg text-sm px-2 py-1.5 text-center"
                          >
                            {" "}
                            View
                          </button>
                        </Link>

                        <Link to={`/Admin/blog/edit/${id}`}>
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
                          onClick={() => handleDeleteButtonClick(id)}
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
