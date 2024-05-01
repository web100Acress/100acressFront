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
    if (event.key === "Enter") {
      // Trigger search logic here, e.g., navigate to the search page
      // You can replace this with your actual search implementation
      console.log("Performing search...");
    }
  };
  return (
    <>
      <div className="w-70 bg-white border-white border-none lg:h-14 md:h-10 sm:h-8 rounded-lg lg:rounded-2xl md:rounded-xl sm:rounded-lg px-2 lg:px-4 md:px-3 sm:px-2">
        <div className="flex items-center xl:h-14 lg:h-14 md:h-10 sm:h-8">
          <div className="w-60 mt-1 lg:mt-3 md:mt-3 sm:mt-2 ml-2 lg:ml-8 md:ml-6 sm:ml-4 lg:w-[820px] md:w-60 sm:w-70 outline-none">
            <input
              className="outline-none"
              type="text"
              name="query"
              placeholder="Enter Your Query"
              value={formData.query}
              onChange={handleInputChange}
            />
          </div>
          <Link
            to={{
              pathname: `/searchdata/${encodeURIComponent(
                JSON.stringify(formData)
              )}`,
              state: formData,
            }}
            className="ml-2 my-1 mt-1 lg:mt-3 md:mt-3 sm:mt-2 lg:ml-0 md:ml-0 sm:ml-0"
          >
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500">
              <i className="fas fa-search text-white"></i>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Search;
