import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

const customStyle = {
  marginLeft: "290px",
  width: "75%",
};

const Enquiries = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const pageSize = 10; // Number of items per page displayed in the table

  const fetchData = async () => {
    setLoading(true); // Change to true when loading
    try {
      const response = await fetch(
        `https://api.100acress.com/userViewAll?page=${page}&limit=100`
      ); // Fetch 100 items in one go
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setData(result.data);
      setTotalPages(Math.ceil(result.data.length / pageSize));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false); // Set loading to false once data is fetched
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredData = data.filter((item) => 
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.mobile.includes(search) ||
    item.projectName.toLowerCase().includes(search.toLowerCase())
  );

  const currentData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const loadback = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const updatedLength = Math.ceil(filteredData.length / pageSize);

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

            {currentData.length !== 0 ? (
              <tbody className="bg-white divide-y divide-gray-200">
                {currentData.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-2 text-center text-sm text-gray-800">
                      {index + 1 + (currentPage - 1) * pageSize}
                    </td>
                    <td className="px-6 py-2 text-center text-sm text-gray-800">
                      {item.name}
                    </td>
                    <td className="px-6 py-2 text-center text-sm text-gray-800">
                      {item.mobile}
                    </td>
                    <td className="px-6 py-2 text-center text-sm text-gray-800">
                      {item.projectName}
                    </td>
                    <td className="px-6 py-2 text-center text-sm text-gray-800">
                      <div className="flex flex-col items-center">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name={`status_${index}`}
                            value="Complete"
                            className="mr-1"
                          />
                          <label className="text-sm">Complete</label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name={`status_${index}`}
                            value="Uncomplete"
                            className="mr-1"
                          />
                          <label className="text-sm">Not Complete</label>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-2 text-center text-sm text-gray-800">
                      <div className="flex justify-center">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name={`assign_${index}`}
                            value="Parul"
                            className="mr-1"
                          />
                          <label className="text-sm">Parul</label>
                        </div>
                        <div className="flex items-center ml-4">
                          <input
                            type="radio"
                            name={`assign_${index}`}
                            value="Anurag"
                            className="mr-1"
                          />
                          <label className="text-sm">Anurag</label>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-2 text-center text-sm text-gray-800">
                      {new Date(item.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: "long", year: 'numeric' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    No more data.
                  </td>
                </tr>
              </tbody>
            )}
          </table>
          {loading && <p>Loading...</p>}
          <div className="flex justify-center items-center my-4">
            {page === 1 ? (
              <button
                className="px-4 py-2 mx-1 rounded bg-gray-200 text-gray-700 cursor-not-allowed"
                disabled={loading}
              >
                Previous
              </button>
            ) : (
              <button
                className="px-4 py-2 mx-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
                onClick={loadback}
                disabled={loading}
              >
                Previous
              </button>
            )}

            {Array.from({ length: updatedLength }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handleClick(index + 1)}
                disabled={currentPage === index + 1}
                className={`px-4 py-2 mx-1 rounded ${
                  currentPage === index + 1
                    ? "bg-red-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {index + 1 + (page - 1) * pageSize}
              </button>
            ))}

            {currentData.length === 0 ? (
              <> </>
            ) : (
              <button
                className="px-4 py-2 mx-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
                onClick={loadMore}
                disabled={loading}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Enquiries;
