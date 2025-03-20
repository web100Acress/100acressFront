import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const customStyle = {
  position: "absolute",
  top: "100px",
  marginLeft: "250px",
  right: "auto",
  width: "80%",
};

const ViewPropertyAdmin = () => {
  const [viewProperty, setViewAllProperty] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  const filteredRows = viewProperty.filter((item) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    if (
      item.name &&
      item.email &&
      item.mobile &&
      typeof item.name === "string" &&
      typeof item.email === "string" &&
      typeof item.mobile === "string"
    ) {
      // Check if any of the properties contain the search term
      return (
        item.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        item.email.toLowerCase().includes(lowerCaseSearchTerm) ||
        item.mobile.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }
    return false;
  });

  const [currentRows1, currentRows] = [viewProperty, filteredRows].map((rows) =>
    rows.slice(indexOfFirstRow, indexOfLastRow)
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `/api/postPerson/propertyView/${id}`
        );
        setViewAllProperty(res.data.data.postProperty);
      } catch (error) {
        console.log(error.res || error);
      }
    };

    fetchData();
  }, []);


  const handleDeleteUser = async (id) => {
    try {
      const res = await axios.delete(
        `/api/postPerson/propertyDelete/${id}`
      );
      if (res.status >= 200 && res.status < 300) {
        window.location.reload();
      } else {
        console.error("Failed to delete user. Server returned an error.");
      }
    } catch (error) {
      console.error("An error occurred while deleting user:", error.message);
    }
  };

  const handleDeleteButtonClicked = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      handleDeleteUser(id);
    }
  };

  return (
    <>
      <Sidebar />
      <div className="" style={customStyle}>
        {/* Search */}
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
              <button className="bg-blue-700 p-2 sm:rounded-lg text-white ml-2">
                Add New
              </button>
            </div>
          </span>
        </div>

        {/* SearchEnd */}

        <div className="mx-auto max-w-4xl px-2 sm:px-6 lg:px-8">
          {viewProperty.length > 0 ? (
            <div key={viewProperty[0].id} className="rounded shadow-lg mb-4">
              <div className="flex flex-wrap items-center justify-between">
                <div className="flex w-0 flex-1 items-center justify-center">
                  <p className="ml-3 truncate space-x-10 text-black font-semibold pt-3">
                    <span className="text-red-600">Mobile :</span>{" "}
                    {viewProperty[0].number}
                  </p>
                  <p className="ml-3 truncate space-x-10 text-black font-semibold pt-3">
                    <span className="text-red-600">Email :</span>{" "}
                    {viewProperty[0].email}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-xl">No data available 😟</p>
          )}
        </div>

        <div className="relative overflow-x-auto sm:rounded-lg mx-4 mt-0">
          <div className="flex justify-end mb-2 mt-2 mr-20"></div>
          <div className="flex justify-center items-center mt-0">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-5/6 mt-0">
              <table className="w-full text-sm text-left rtl:text-right text-black-100 dark:text-black-100 ">
                <thead className="text-sm text-black font-extrabold uppercase dark:text-black border-b-2  border-red-400">
                  <tr className="">
                    <th scope="col" className="px-6 py-3 text-center ">
                      Sr.no
                    </th>
                    <th scope="col" className="px-6 py-3 text-center ">
                      Property type
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      Property name
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                      City
                    </th>

                    <th scope="col" className="px-6 py-3 text-center">
                      Action
                    </th>
                    <th scope="col" className="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {currentRows1.map((item, index) => {
                    const userId = item._id;
                    return (
                      <tr
                        key={index}
                        className="bg-white-500 border-b border-red-400"
                      >
                        <td className="px-2 py-1 text-center">{index + 1}</td>
                        <td className="px-2 py-1 text-center">
                          {item.propertyType}
                        </td>
                        <td className="px-2 py-1 text-center">
                          {item.propertyName}
                        </td>
                        <td className="px-2 py-1 text-center">{item.city}</td>
                        <td className="px-2 py-1 flex justify-center items-center">
                          <Link
                            to={`/Admin/viewproperty/viewdetails/${userId}`}
                          >
                            <button
                              type="button"
                              className="text-white mr-2 bg-blue-400 hover:bg-blue-600 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-2 py-1.5 text-center"
                            >
                              View
                            </button>
                          </Link>{" "}
                          <Link
                            to={`/Admin/viewproperty/editdetails/${userId}`}
                          >
                            <button
                              type="button"
                              className="text-white mr-2 bg-red-400 hover:bg-red-600 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-2 py-1.5 text-center"
                            >
                              Edit
                            </button>
                          </Link>{" "}
                          <button
                            type="button"
                            onClick={() => handleDeleteButtonClicked(userId)}
                            className="text-white  bg-red-700 hover:bg-red-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-2 py-1.5 text-center"
                          >
                            Delete
                          </button>
                        </td>

                        <td className="px-2 py-1 flex space-x-1"></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <div className="flex justify-center mt-2 mb-2">
                {Array.from(
                  { length: Math.ceil(viewProperty.length / rowsPerPage) },
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
      </div>

      {/* table */}
    </>
  );
};

export default ViewPropertyAdmin;
