import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";

const customStyle = {
  marginLeft: "290px",
  width: "75%",
};

const Enquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const itemsPerPage = 25;

  const fetchEnquiriesData = async () => {
    try {
      const res = await axios.get("https://api.100acress.com/UserViewAll");
      setEnquiries(res.data.data);
      // console.log(res.data.data, "+++++++++++++++");
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
            currentPage === i
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800"
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
    f.projectName.toLowerCase().includes(search)
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedEnquiries = filteredEnquiries.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <Sidebar />
      <div style={customStyle} className="absolute right-auto">
        <div className="flex justify-between">
          <div className="bg-white flex px-4 py-2 mt-3  focus-within:border-red-500 overflow-hidden max-w-md font-[sans-serif]">
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
                  <div className="w-1/12 border-r border-t border-l border-gray-200 dark:border-neutral-700 px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                    Sr.No
                  </div>
                  <div className="w-2/12 border-r border-t border-gray-200 dark:border-neutral-700 px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                    Name
                  </div>
                  <div className="w-2/12 border-r border-t border-gray-200 dark:border-neutral-700 px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                    Mobile
                  </div>
                  <div className="w-2/12 px-6 border-r border-t py-3 text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                    Project Name
                  </div>
                  <div className="w-2/12 px-0 py-3 border-r border-t text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                    Status
                  </div>

                  <div className="w-2/12 px-6 py-3 border-r border-t text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-500 relative">
                    <div>Assign</div>
                  </div>

                  <div className="w-1/12 px-6 py-3 border-r border-t text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                    Date
                  </div>
                </div>

                <div className="divide-y divide-gray-200 bg-white dark:divide-neutral-700 dark:bg-neutral-800">
                  {selectedEnquiries.map((item, index) => (
                    <div key={index} className="flex">
                      <div className="w-1/12 border-r border-l border-gray-200 dark:border-neutral-700 px-6 py-2 text-center break-words whitespace-normal text-sm text-gray-800 dark:text-neutral-200">
                        {startIndex + index + 1}
                      </div>
                      <div className="w-2/12 border-r border-gray-200 dark:border-neutral-700 px-6 py-2 text-center break-words whitespace-normal text-sm text-gray-800 dark:text-neutral-200">
                        {item.name}
                      </div>
                      <div className="w-2/12 border-r border-gray-200 dark:border-neutral-700 px-6 py-2 text-center break-words whitespace-normal text-sm text-gray-800 dark:text-neutral-200">
                        {item.mobile}
                      </div>
                      <div className="w-2/12 border-r px-6 py-2 text-center break-words whitespace-normal text-sm text-gray-800 dark:text-neutral-200">
                        {item.projectName}
                      </div>
                      <div className="w-2/12 px-0 py-2 border-r text-center break-words whitespace-normal text-sm text-gray-800 dark:text-neutral-200">
                        {item.status}
                        <div className="flex flex-col space-y-2 items-center">
                          <div className="flex items-center pr-[1.7rem]">
                            <input
                              type="radio"
                              id="complete"
                              name="status"
                              value="Complete"
                              className="mr-2 "
                            />
                            <label htmlFor="complete">Complete</label>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id="notcomplete"
                              name="status"
                              value="Uncomplete"
                              className="mr-2"
                            />
                            <label htmlFor="notcomplete">Not Complete</label>
                          </div>
                        </div>
                      </div>
                      <div className="w-2/12 px-6 py-2 border-r text-center break-words whitespace-normal text-sm text-gray-800 dark:text-neutral-200">
                        {item.assign}
                        {/* <div className="mt-2 d-flex space-x-2">
                          <button className="block w-50 px-1 mt-1 py-1 text-sm text-white bg-red-600 rounded focus:outline-none focus:ring-2 focus:ring-red-500">
                            Parul
                          </button>
                          <button className="block w-50 mt-1 px-1 py-1 text-sm text-white bg-green-600 rounded focus:outline-none focus:ring-2 focus:ring-green-500">
                            Anurag
                          </button>

                        </div> */}
                        <div className="mt-2 d-flex space-x-1">
                          <input
                            type="radio"
                            id="html"
                            name="fav_language"
                            value="HTML"
                          />
                          <label for="html">Parul</label>
                          <input
                            type="radio"
                            id="html"
                            name="fav_language"
                            value="HTML"
                          />
                          <label for="html">Anurag</label>
                        </div>
                      </div>
                      <div className="w-1/12 px-6 py-2 border-r text-center break-words whitespace-normal text-sm text-gray-800 dark:text-neutral-200">
                        {formatDate(item.createdAt)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-4 flex">{renderPagination()}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Enquiries;