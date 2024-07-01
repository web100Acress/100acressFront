import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";

const customStyle = {
  marginLeft: "290px",
  width: "75%",
};

const ResaleEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const itemsPerPage = 25;

  const fetchEnquiriesData = async () => {
    try {
      const res = await axios.get("https://api.100acress.com/postEnq_view");
      setEnquiries(res.data.data);
      console.log(res, "+++++++++++++++");
    } catch (error) {
      console.log(error || error.message);
    }
  };

  useEffect(() => {
    fetchEnquiriesData();
  }, []);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPagination = () => {
    const totalPages = Math.ceil(filteredEnquiries.length / itemsPerPage);
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handleClick(i)}
          className={`px-3 py-1 mx-1 ${
            currentPage === i ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
          }`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  const filter = (e) => {
    setSearch(e.target.value.toLowerCase());
    setCurrentPage(1);
  };

  const filteredEnquiries = enquiries.filter((f) =>
    f.projectName ? f.projectName.toLowerCase().includes(search) : false
  );
  

  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedEnquiries = filteredEnquiries.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <Sidebar />
      <div style={customStyle} className="absolute right-auto">
        <div className="flex justify-between">
          <div className="bg-white flex px-4 py-2 mt-3 focus-within:border-red-500 overflow-hidden max-w-md font-[sans-serif]">
            <button className="text-bold bg-red-600 p-2 text-white rounded-md mr-10">
              Search
            </button>
            <input
              type="text"
              placeholder="Search..."
              className="p-2 border-b-2 w-96 border-red-600 text-black placeholder-black outline-none rounded-sm"
              onChange={filter}
            />
          </div>
          <span>
            <div className="flex justify-end ml-20">
              <button className="bg-blue-700 p-2 sm:rounded-lg text-white ml-2 mt-4">
                Download Data
              </button>
            </div>
          </span>
        </div>

        <div className="-m-1.5 overflow-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <div className="w-full divide-y divide-gray-200 dark:divide-neutral-700">
                <div className="flex">
                  <div className="w-1/12 border-r border-t border-l  border-gray-200 dark:border-neutral-700 px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                    Sr.No
                  </div>
                  <div className="w-2/12 border-r border-t  border-gray-200 dark:border-neutral-700 px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                    Agent Number
                  </div>
                  <div className="w-2/12 px-6 border-r border-t py-3 text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                    Customer Name
                  </div>
                  <div className="w-3/12 px-0 py-3 border-r border-t text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                    Customer Email
                  </div>
                  <div className="w-2/12 px-6 py-3 border-r border-t text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-500 relative">
                    Customer Number
                  </div>
                  <div className="w-2/12 px-6 py-3 border-r border-t text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                    Property Address
                  </div>
                </div>

                <div className="divide-y divide-gray-200 bg-white dark:divide-neutral-700 dark:bg-neutral-800">
                  {enquiries.map((item, index) => (
                    <div key={index} className="flex">
                      <div className="w-1/12 border-r border-l border-b border-gray-200 dark:border-neutral-700 px-6 py-2 text-center break-words whitespace-normal text-sm text-gray-800 dark:text-neutral-200">
                        {startIndex + index + 1}
                      </div>
                      <div className="w-2/12 border-r border-b border-gray-200 dark:border-neutral-700 px-6 py-2 text-center break-words whitespace-normal text-sm text-gray-800 dark:text-neutral-200">
                        {item.agentNumber}
                      </div>
                      <div className="w-2/12 border-r border-b px-6 py-2 text-center break-words whitespace-normal text-sm text-gray-800 dark:text-neutral-200">
                        {item.custName}
                      </div>
                      <div className="w-3/12 px-0 py-2 border-b border-r text-center break-words whitespace-normal text-sm text-gray-800 dark:text-neutral-200">
                        {item.custEmail}
                      </div>
                      <div className="w-2/12 px-6 py-2 border-b border-r text-center break-words whitespace-normal text-sm text-gray-800 dark:text-neutral-200">
                        {item.custNumber}
                      </div>
                      <div className="w-2/12 px-6 py-2 border-b border-r  text-center break-words whitespace-normal text-sm text-gray-800 dark:text-neutral-200">
                        {item.propertyAddress}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-4 flex"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResaleEnquiries;

