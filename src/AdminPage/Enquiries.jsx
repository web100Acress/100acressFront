import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import BackToTopButton from "../Pages/BackToTopButton";
import {ClipLoader} from "react-spinners";

const customStyle = {
  marginLeft: "290px",
  width: "75%",
};

const Enquiries = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const pageSize = 100; 
  const [downloadProgess, setDownloadProgress] = useState(0);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.100acress.com/userViewAll?limit=2000` 
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setData(result.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.mobile.includes(search) ||
      item.projectName.toLowerCase().includes(search.toLowerCase())
  );

  const currentData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const loadMore = () => {
    if (currentPage * pageSize < filteredData.length) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const loadBack = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const totalPages = Math.ceil(filteredData.length / pageSize);

  const generateSVG = () => {
    const headers = `
      <tr>
        ${[
          "Sr.No",
          "Name",
          "Mobile",
          "Project Name",
          "Status",
          "Assign",
          "Date",
        ]
          .map((header) => `<th>${header}</th>`)
          .join("")}
      </tr>
    `;
    const rows = currentData
      .map(
        (item, index) => `
        <tr>
          <td>${index + 1 + (currentPage - 1) * pageSize}</td>
          <td>${item.name}</td>
          <td>${item.mobile}</td>
          <td>${item.projectName}</td>
          <td>${item.status ? "Complete" : "Not Complete"}</td>
          <td>${item.assign}</td>
          <td>${new Date(item.createdAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}</td>
        </tr>
      `
      )
      .join("");
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

  const downloadSVG = () => {
    const svgContent = generateSVG();
    const blob = new Blob([svgContent], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "data.svg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const downloadExelFile = async()=>{
    try {
      const response = await fetch("https://api.100acress.com/userViewAll/dowloadData");
      if (!response.ok) {
        throw new Error(`Failed to download file: ${response.statusText}`);
      }
      const contentLength = response.headers.get('Content-Length');
      const contentDisposition = response.headers.get('Content-Disposition');
      console.log("ContentLength",contentLength);
      console.log("ContentDisposition",contentDisposition);

      if (!contentLength) {
          console.error('Content-Length header is missing. Progress cannot be tracked.');
          return;
      }
      const total = parseInt(contentLength, 10);

      const reader = response.body.getReader();
      const chunks = [];

      let receivedLength = 0;

      while(true){
        const {done,value} = await reader.read();

        if(done) break;

        chunks.push(value);
        receivedLength += value.length;

        const progress = Math.round((receivedLength / total) * 100);
        console.log(`Download progress: ${progress}%`);
        setDownloadProgress(progress); // Update progress every 1 
      }

      const blob = new Blob(chunks, { type: response.headers.get('Content-Type') });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const fileName = contentDisposition
          ? contentDisposition.split('filename=')[1]?.replace(/"/g, '')
          : 'download.xlsx';
      link.download = fileName;
        
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
        
      // Revoke the Blob URL
      window.URL.revokeObjectURL(url);
      setDownloadProgress(0);
      console.log('File downloaded successfully.');

    } catch (error) {
      console.error('Error downloading the file:', error);
      setDownloadProgress(0); // Reset progress
    }
  }

  console.log(downloadProgess);

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
          {downloadProgess > 0 ? 
            <button
              className="bg-red-400 p-2 rounded-lg text-white ml-4"
            >
             <ClipLoader color="#C13B44"/>
            {downloadProgess}
          </button>
          :
          <button
            className="bg-blue-700 p-2 rounded-lg text-white ml-4"
            onClick={downloadExelFile}
          >
            Download Data
          </button>
}
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
                      {item.status ? "Complete" : "Not Complete"}
                    </td>
                    <td className="px-6 py-2 text-center text-sm text-gray-800">
                      {item.assign}
                    </td>
                    <td className="px-6 py-2 text-center text-sm text-gray-800">
                      {new Date(item.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    No data available.
                  </td>
                </tr>
              </tbody>
            )}
          </table>
          <BackToTopButton />
          {loading && <p>Loading...</p>}
          <div className="flex  my-4">
            <button
              className={`px-4 py-2 mx-1 rounded ${currentPage === 1 ? "bg-gray-200 text-gray-700 cursor-not-allowed" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
              onClick={loadBack}
              disabled={currentPage === 1 || loading}
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
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

            <button
              className={`px-4 py-2 mx-1 rounded ${currentPage === totalPages ? "bg-gray-200 text-gray-700 cursor-not-allowed" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
              onClick={loadMore}
              disabled={currentPage === totalPages || loading}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Enquiries;
