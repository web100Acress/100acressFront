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
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.100acress.com/userViewAll?page=${page}&limit=100`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setData(result.data);
      setTotalPages(Math.ceil(result.data.length / pageSize));
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

  // Function to generate SVG content
  const generateSVG = () => {
    const headers = `
      <tr>
        ${["Sr.No", "Name", "Mobile", "Project Name", "Status", "Assign", "Date"]
          .map(header => `<th>${header}</th>`)
          .join('')}
      </tr>
    `;
    const rows = currentData
      .map((item, index) => `
        <tr>
          <td>${index + 1 + (currentPage - 1) * pageSize}</td>
          <td>${item.name}</td>
          <td>${item.mobile}</td>
          <td>${item.projectName}</td>
          <td>${item.status ? 'Complete' : 'Not Complete'}</td>
          <td>${item.assign}</td>
          <td>${new Date(item.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: "long", year: 'numeric' })}</td>
        </tr>
      `)
      .join('');
    const svgContent = `
      <svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
        <foreignObject x="0" y="0" width="800" height="600">
          <div xmlns="http://www.w3.org/1999/xhtml" style="font-family: Arial, sans-serif;">
            <table border="1" style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <thead>${headers}</thead>
              <tbody>${rows}</tbody>
            </table>
          </div>
        </foreignObject>
      </svg>
    `;
    return svgContent;
  };

  // Function to trigger download of SVG file
  const downloadSVG = () => {
    const svgContent = generateSVG();
    const blob = new Blob([svgContent], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "data.svg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

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
          <button
            className="bg-blue-700 p-2 rounded-lg text-white ml-4"
            onClick={downloadSVG}
          >
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
                      {item.status ? 'Complete' : 'Not Complete'}
                    </td>
                    <td className="px-6 py-2 text-center text-sm text-gray-800">
                      {item.assign}
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
                {index + 1}
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
