import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SearchIcon } from "../Assets/icons";

const ScrollSearch = ({ data1 }) => {
  const [formData, setFormData] = useState({
    location: "",
    query: "",
    collectionName: data1,
  });

  const primeLocations = [
    { name: "Golf Course Road", to: "/property-in-gurugram/golf-course/" },
    { name: "NPR", to: "/property-in-gurugram/northern-peripheral-road/" },
    {
      name: "Dwarka Expressway",
      to: "/property-in-gurugram/dwarka-expressway/",
    },
    { name: "SPR", to: "/property-in-gurugram/southern-peripheral-road/" },
    { name: "NH-48", to: "/property-in-gurugram/nh-48/" },
    {
      name: "Golf Course Extn Road",
      to: "/property-in-gurugram/golf-course-extn-road/",
    },
    {
      name: "New Gurgaon",
      to: "/property-in-gurugram/new-gurgaon/",
    },
  ];

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

  const placeholders = [
    'Search "Villas"',
    'Search "3 BHK Ready To Move Flat For Sale In Gurgaon"',
    'Search "Best Properties"',
    'Search "Delhi NCR"',
    'Search "3 BHK Flats in Gurgaon"',
    'Search "Commercial Space For Sale In Gurgaon"',
  ];

  const [currentPlaceholder, setCurrentPlaceholder] = useState(placeholders[0]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentPlaceholder((prev) => {
        const currentIndex = placeholders.indexOf(prev);
        const nextIndex = (currentIndex + 1) % placeholders.length;
        return placeholders[nextIndex];
      });
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      className={`w-2rem shadow-xl rounded-full bg-white h-10 lg:w-[30rem] flex items-center justify-center`}
      style={{
        marginTop:
          window.innerWidth < 640
            ? "-0px"
            : window.innerWidth >= 640 && window.innerWidth <= 768
            ? "-12px"
            : "0",
        marginBottom: window.innerWidth === 768 ? "0px" : "0",
        borderRadius: window.innerWidth < 640 ? "30px" : "30px",
      }}
    >
      <div
        className="flex items-center ml-2 mr-2 gap-2 w-full ml-6"
      >
        <input
          className="outline-none flex-grow p-0 rounded-full"
          type="text"
          name="query"
          placeholder={currentPlaceholder}
          value={formData.query}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <Link
          to={{
            pathname: `/searchdata/${encodeURIComponent(
              JSON.stringify(formData)
            )}`,
            state: formData,
          }}
          id="searchButton"
        >
          <div className="px-1.25 md:px-5 py-1.5 bg-[#C13B44] text-white rounded-full flex items-center justify-center ">
            <SearchIcon /> {" "}<span className="hidden sm:block">
              
              </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ScrollSearch;
