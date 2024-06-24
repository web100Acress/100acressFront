import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";

const customStyle = {
  position: "absolute",
  marginLeft: "250px",
  right: "auto",
  width: "73%",
};

const Enquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [currentPage,   setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const itemsPerPage = 25;

  const fetchEnquiresData = async () => {
    try {
      const res = await axios.get('https://api.100acress.com/UserViewAll');
      setEnquiries(res.data.data);
    } catch (error) {
      console.log(error || error.message);
    }
  };

  useEffect(() => {
    fetchEnquiresData();
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
            currentPage === i ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
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
  const selectedEnquiries = filteredEnquiries.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <Sidebar />
      <div style={customStyle}>
        <div className="flex">
        <div className="bg-white flex px-4 py-3 border-b border-[#333] focus-within:border-red-500 overflow-hidden max-w-md mx-auto font-[sans-serif]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 192.904 192.904"
            width="18px"
            className="fill-gray-600 mr-3"
          >
            <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
          </svg>
          <input
            type="text"
            onChange={filter}
            placeholder="Search Something..."
            className="w-full outline-none text-sm"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            className="py-2 mt-2 px-2 hover:bg-red-600 hover:text-white inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-red-600 text-red-600 hover:border-red-500  disabled:opacity-50 disabled:pointer-events-none dark:border-red-500 dark:text-red-500 dark:hover:text-red-400 dark:hover:border-red-400"
          >
            Download Data
          </button>
        </div>
        </div>
       

        <div className="-m-1.5 overflow-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <div className="w-[93%] divide-y divide-gray-200 dark:divide-neutral-700">
                <div className="flex">
                  <div className="w-1/12 border-r border-t border-gray-200 dark:border-neutral-700 px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                    Sr.No
                  </div>
                  <div className="w-2/12 border-r border-t border-gray-200 dark:border-neutral-700 px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                    Name
                  </div>
                  <div className="w-2/12 border-r border-t border-gray-200 dark:border-neutral-700 px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                    Mobile
                  </div>
                  <div className="w-3/12 px-6 border-r border-t py-3 text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                    Project Name
                  </div>
                  <div className="w-2/12 px-6 py-3 border-r border-t text-center text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                    Status
                  </div>
                </div>
                {/* <div className="divide-y divide-gray-200 bg-white dark:divide-neutral-700 dark:bg-neutral-800">
                  {selectedEnquiries.map((item, index) => (
                    <div key={index} className="flex">
                      <div className="w-1/12 border-r border-gray-200 dark:border-neutral-700 px-6 py-2 text-center break-words whitespace-normal text-sm text-gray-800 dark:text-neutral-200">
                        {startIndex + index + 1}
                      </div>
                      <div className="w-2/12 border-r border-gray-200 dark:border-neutral-700 px-6 py-2 text-center break-words whitespace-normal text-sm text-gray-800 dark:text-neutral-200">
                        {item.name}
                      </div>
                      <div className="w-2/12 border-r border-gray-200 dark:border-neutral-700 px-6 py-2 text-center break-words whitespace-normal text-sm text-gray-800 dark:text-neutral-200">
                        {item.mobile}
                      </div>
                      <div className="w-3/12 border-r px-6 py-2 text-center break-words whitespace-normal text-sm text-gray-800 dark:text-neutral-200">
                        {item.projectName}
                      </div>
                      <div className="w-2/12 px-6 py-2 border-r text-center break-words whitespace-normal text-sm text-gray-800 dark:text-neutral-200">
                        {item.status}
                      </div>
                    </div>
                  ))}   
                </div> */}

<div className="divide-y divide-gray-200 bg-white dark:divide-neutral-700 dark:bg-neutral-800">
  {[...selectedEnquiries].reverse().map((item, index) => (
    <div key={index} className="flex">
      <div className="w-1/12 border-r border-gray-200 dark:border-neutral-700 px-6 py-2 text-center break-words whitespace-normal text-sm text-gray-800 dark:text-neutral-200">
        {startIndex + index + 1}
      </div>
      <div className="w-2/12 border-r border-gray-200 dark:border-neutral-700 px-6 py-2 text-center break-words whitespace-normal text-sm text-gray-800 dark:text-neutral-200">
        {item.name}
      </div>
      <div className="w-2/12 border-r border-gray-200 dark:border-neutral-700 px-6 py-2 text-center break-words whitespace-normal text-sm text-gray-800 dark:text-neutral-200">
        {item.mobile}
      </div>
      <div className="w-3/12 border-r px-6 py-2 text-center break-words whitespace-normal text-sm text-gray-800 dark:text-neutral-200">
        {item.projectName}
      </div>
      <div className="w-2/12 px-6 py-2 border-r text-center break-words whitespace-normal text-sm text-gray-800 dark:text-neutral-200">
        {item.status}
      </div>
    </div>
  ))}
</div>


              </div>
            </div>
            <div className="mt-4 flex justify-center">{renderPagination()}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Enquiries;
