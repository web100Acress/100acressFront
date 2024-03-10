import React, { useState } from "react";
import { Link } from "react-router-dom";
const Search = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    location: "",
    query: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


  
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      // Trigger search logic here, e.g., navigate to the search page
      // You can replace this with your actual search implementation
      console.log('Performing search...');
    }
  };
  return (
    <>
      <div className="w-70 bg-white border-white border-t-none lg:h-14 md:h-10 sm:h-8 rounded-lg lg:rounded-2xl md:rounded-xl sm:rounded-lg  px-2 lg:px-4 md:px-3 sm:px-2  ">
        <div className="flex items-center xl:h-14 lg:h-14 md:h-10 sm:h-8">
          <button
            type="button"
            onClick={toggleDropdown}
            className=" mt-1 lg:mt-3 md:mt-3 sm:mt-2 ml-4  text-left rounded-md text-sm font-medium text-gray-500 focus:outline-none hidden lg:flex md:flex sm:hidden"
          >
            <span className="w-30 ">Residential</span>

            <svg
              className="ml-4 h-5 w-5 text-red-600"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6.293 7.293a1 1 0 011.414 0l3.293 3.293 3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414 1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <div className="w-60 mt-1 lg:mt-3 md:mt-3 sm:mt-2 ml-2 lg:ml-8 md:ml-6 sm:ml-4 lg:w-60 md:w-60 sm:w-70 outline-none ">
            <input
            className="outline-none"
              type="text"
              name="query"
              placeholder="Enter Your Query"
              value={formData.query}
              onChange={handleInputChange}
            />
          </div>

      

          <div className="w-60 mt-1 lg:mt-3 md:mt-3 sm:mt-2 ml-6 hidden lg:block md:block sm:hidden ">
            <input
            className="outline-none"
              type="text"
              name="location"
              placeholder="Enter Your Location"
              value={formData.location}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
            />
            {/* You can use the 'location' state for further processing or sending it to other components */}
          </div>

          <div className="ml-2  my-1 mt-1 lg:mt-3 md:mt-3 sm:mt-2  lg:ml-20 md:ml-12 sm:ml-2 ">
            <Link
              to={{
                pathname: `/searchdata/${encodeURIComponent(
                  JSON.stringify(formData)
                )}`,
                state: formData,
              }}
            >
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500">
                <i className="fas fa-search text-white "></i>
              </div>
            </Link>
          </div>
        </div>
        {isOpen && (
          <div className="mt-[-10] w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-0">
              <a
                href=""
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Residential
              </a>
              <a
                href=""
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Commercial
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Search;
