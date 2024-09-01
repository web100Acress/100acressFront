import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const Search = ({ data1 }) => {
  const primeLocatons = [
    "Sohna Road",
    "Golf Course Road",
    "MG Road",
    "Northern Peripheral Road",
    "Dwarka Expressway",
    "New Gurgaon",
    "Sohna",
    "Southern Peripheral Road",
    "NH-48",
    "Golf Course Extn Road",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const next = () => {
    if (currentIndex < primeLocatons.length - 3) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  
  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const [formData, setFormData] = useState({
    location: "",
    query: "",
    collectionName: data1,
  });

  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      collectionName: data1,
    }));
  }, [data1]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      document.getElementById("searchButton").click();
    }
  };

  return (
    <>
      <div className="w-70 bg-white border-white border-none lg:h-14 md:h-10 sm:h-8 rounded-lg lg:rounded-2xl md:rounded-xl sm:rounded-lg px-2 lg:px-4 md:px-3  sm:px-2">
        <div className="flex items-center xl:h-14 lg:h-14 md:h-10 sm:h-8">
          <div className="w-60 mt-1 lg:mt-3 md:mt-3 sm:mt-2 ml-2 lg:ml-8 md:ml-6 sm:ml-4 lg:w-[820px] md:w-full sm:w-70 outline-none">
            <input
              className="outline-none w-full"
              type="text"
              name="query"
              placeholder="Enter Your Query"
              value={formData.query}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
            />
          </div>

          <Link
            to={{
              pathname: `/searchdata/${encodeURIComponent(
                JSON.stringify(formData)
              )}`,
              state: formData,
            }}
            id="searchButton"
            className="ml-2 my-1 mt-1 lg:mt-3 md:mt-3 sm:mt-2 lg:ml-0 md:ml-0 sm:ml-0"
          >
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500">
              <i className="fas fa-search text-white"></i>
            </div>
          </Link>
        </div>
      </div>

      {/* Horizontal scrolling */}
      
      {/* <div className="w-full flex items-center justify-center pt-3   mx-auto">
    <marquee>
    <div className="flex overflow-hidden w-full ">
      <div
        className="flex transition-transform duration-300"
        style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
      >
        {primeLocatons.map((location, index) => (
          <div key={index} className="w-auto flex-shrink-0 px-[2px]">
            <span className="bg-gray-100 rounded-sm text-[15px] px-1 py-1 block text-center">
              {location}
            </span>
          </div>
        ))}
      </div>
    </div>
    </marquee>
  </div> */}
  
    </>
  );
};

export default Search;
