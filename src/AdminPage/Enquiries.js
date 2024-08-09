import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

const customStyle = {
  marginLeft: "290px",
  width: "75%",
};

const Enquiries = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 50;

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const loadback = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.100acress.com/userViewAll?page=${page}&limit=${pageSize}`
      );
      const result = await res.json();
      setData(result.data);
      const totalItems = result.totalItems || result.data.length;
      setTotalPages(Math.ceil(totalItems / pageSize));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getSerialNumber = (index) => {
    return (currentPage - 1) * pageSize + index + 1;
  };

  const filteredData = data.filter((item) => {
    const searchLower = search.toLowerCase();
    return (
      (item.name ? item.name.toLowerCase().includes(searchLower) : false) ||
      (item.mobile ? item.mobile.toString().includes(searchLower) : false) ||
      (item.projectName
        ? item.projectName.toLowerCase().includes(searchLower)
        : false) ||
      (item.status ? item.status.toLowerCase().includes(searchLower) : false) ||
      (item.assign ? item.assign.toLowerCase().includes(searchLower) : false)
    );
  });

  const currentData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  console.log(data,"data")
  return (
    <>
      <Sidebar />
      <div style={customStyle} className="absolute right-auto p-4">
        <div className="flex justify-between mb-4">
          <div className="flex items-center bg-white shadow-md rounded-md overflow-hidden max-w-md">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="p-2 border-b-2 border-red-600 text-black placeholder-gray-500 outline-none flex-grow"
            />
            <button className="bg-red-600 text-white p-2 rounded-md ml-2">
              Search
            </button>
          </div>
          <button className="bg-blue-700 p-2 rounded-lg text-white ml-4">
            Download Data
          </button>
        </div>
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full bg-white divide-y divide-gray-200">
            <thead>
              <tr>
                {[
                  "Sr.No",
                  "Name",
                  "Mobile",
                  "Project Name",
                  "Status",
                  "Assign",
                  "Date",
                ].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentData.length > 0 ? (
                currentData.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-2 text-center text-sm text-gray-800">
                      {getSerialNumber(index)}
                    </td>
                    <td className="px-6 py-2 text-center text-sm text-gray-800">
                      {item.name || "N/A"}
                    </td>
                    <td className="px-6 py-2 text-center text-sm text-gray-800">
                      {item.mobile || "N/A"}
                    </td>
                    <td className="px-6 py-2 text-center text-sm text-gray-800">
                      {item.projectName || "N/A"}
                    </td>
                    <td className="px-6 py-2 text-center text-sm text-gray-800">
                      {item.status || "N/A"}
                      <div className="flex flex-col items-center mt-2">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id={`complete-${index}`}
                            name={`status-${index}`}
                            value="Complete"
                            className="mr-1"
                          />
                          <label
                            htmlFor={`complete-${index}`}
                            className="text-sm"
                          >
                            Complete
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id={`notcomplete-${index}`}
                            name={`status-${index}`}
                            value="Uncomplete"
                            className="mr-1"
                          />
                          <label
                            htmlFor={`notcomplete-${index}`}
                            className="text-sm"
                          >
                            Not Complete
                          </label>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-2 text-center text-sm text-gray-800">
                      {item.assign || "N/A"}
                      <div className="flex justify-center mt-2">
                        <input
                          type="radio"
                          id={`assign-${index}-parul`}
                          name={`assign-${index}`}
                          value="Parul"
                          className="mr-1"
                        />
                        <label
                          htmlFor={`assign-${index}-parul`}
                          className="text-sm"
                        >
                          Parul
                        </label>
                        <input
                          type="radio"
                          id={`assign-${index}-anurag`}
                          name={`assign-${index}`}
                          value="Anurag"
                          className="ml-2 mr-1"
                        />
                        <label
                          htmlFor={`assign-${index}-anurag`}
                          className="text-sm"
                        >
                          Anurag
                        </label>
                      </div>
                    </td>
                    <td className="px-6 py-2 text-center text-sm text-gray-800"></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-gray-500">
                    No more data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-center space-x-2">
          {page === 1 ? (
            <button className="hidden" onClick={loadback} disabled={loading}>
              previous
            </button>
          ) : (
            <button
              className="px-4 py-2 bg-gray-500 text-white rounded-lg transition duration-200 ease-in-out hover:bg-gray-700"
              onClick={loadback}
              disabled={loading}
            >
              previous
            </button>
          )}
          {Array.from({ length: 10 }, (_, index) => (
            <button
              className={`px-4 py-2 rounded-lg transition duration-200 ease-in-out 
        ${
          currentPage === index + 1
            ? "bg-blue-600 text-white cursor-not-allowed"
            : "bg-gray-500 text-white hover:bg-gray-700"
        }`}
              key={index + 1}
              onClick={() => handleClick(index + 1)}
              disabled={currentPage === index + 1}
            >
              {index + 1 + (page - 1) * 10}
            </button>
          ))}

          <button
            className="px-4 py-2 bg-gray-500 text-white rounded-lg transition duration-200 ease-in-out hover:bg-gray-700"
            onClick={loadMore}
            disabled={loading}
          >
            next
          </button>
        </div>
      </div>
    </>
  );
};

export default Enquiries;
