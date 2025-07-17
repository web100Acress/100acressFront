import React, { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import CustomSkeleton from "../Utils/CustomSkeleton";
import Footer from "../Components/Actual_Components/Footer";
import CommonInside from "../Utils/CommonInside";

const SearchData = () => {
  const location = useLocation();
  const encodedFormData = location.pathname.split("/searchdata/")[1];
  const decodedFormData = JSON.parse(decodeURIComponent(encodedFormData));

  function getFormDataValues({ query, location, collectionName }) {
    return {
      key1: query,
      key2: location,
      key3: collectionName,
    };
  }

  const { key1, key2, key3 } = getFormDataValues(decodedFormData);
  const key = `${key1}${key2}`;

  localStorage.setItem("myKey", key);
  const [searchData, setSearchData] = useState([]);
  const [buySearchData, setBuySearchData] = useState([]);
  const [rentSearchData, setRentSearchData] = useState([]);
  const [cityFilter, setCityFilter] = useState("");
  const [isFallbackMode, setIsFallbackMode] = useState(false);
  const [primeLocation, setPrimeLocation] = useState("");
  const [projectStatus, setProjectStatus] = useState("");
  const [projectType, setProjectType] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [showFilters, setShowFilters] = useState(false); // State to manage filter visibility

  const isEmptySearch = !key1 && !key2;

useEffect(() => {
  const fetchData = async () => {
    try {
        if (isEmptySearch) {
          const allProjectsRes = await axios.get(
            "https://api.100acress.com/project/viewAll/data"
          );
          let allProjectsArr = (allProjectsRes.data.data || []).map((item) => ({
            projectName: item.projectName,
            project_url: item.project_url,
            frontImage: item.frontImage,
            price: item.price,
            type: item.type,
            projectAddress: item.projectAddress,
            city: item.city,
            state: item.state,
            minPrice: item.minPrice,
            maxPrice: item.maxPrice,
            sourceType: "project",
          }));
          allProjectsArr = allProjectsArr.sort(() => Math.random() - 0.5);
          setBuySearchData([]);
          setRentSearchData([]);
          setSearchData(allProjectsArr);
          setIsFallbackMode(true);
          return;
        }

      const res = await axios.get(
        `https://api.100acress.com/property/search/${key}`
      );
        const searchArr = (res.data.searchdata || []).map((item) => ({
        ...item,
          sourceType: "search",
      }));
      setSearchData(searchArr);

      const rentRes = await axios.get(
        `https://api.100acress.com/rentproperty/search/${key}`
      );
        const rentArr = (rentRes.data.data || []).map((item) => ({
        ...item,
          sourceType: "rent",
      }));
      setRentSearchData(rentArr);

      const buyRes = await axios.get(
        `https://api.100acress.com/buyproperty/search/${key}`
      );
        const buyArr = (buyRes.data.data || []).map((item) => ({
        ...item,
          sourceType: "buy",
      }));
      setBuySearchData(buyArr);

        if (searchArr.length === 0 && rentArr.length === 0 && buyArr.length === 0) {
          const allProjectsRes = await axios.get(
            "https://api.100acress.com/project/viewAll/data"
          );
          let allProjectsArr = (allProjectsRes.data.data || []).map((item) => ({
            projectName: item.projectName,
            project_url: item.project_url,
            frontImage: item.frontImage,
            price: item.price,
            type: item.type,
            projectAddress: item.projectAddress,
            city: item.city,
            state: item.state,
            minPrice: item.minPrice,
            maxPrice: item.maxPrice,
            sourceType: "project",
          }));
          allProjectsArr = allProjectsArr.sort(() => Math.random() - 0.5);
          setBuySearchData([]);
          setRentSearchData([]);
          setSearchData(allProjectsArr);
          setIsFallbackMode(true);
        } else {
          setIsFallbackMode(false);
        }
    } catch (error) {
        if (error.response && error.response.status === 404) {
          const allProjectsRes = await axios.get(
            "https://api.100acress.com/project/viewAll/data"
          );
          let allProjectsArr = (allProjectsRes.data.data || []).map((item) => ({
            projectName: item.projectName,
            project_url: item.project_url,
            frontImage: item.frontImage,
            price: item.price,
            type: item.type,
            projectAddress: item.projectAddress,
            city: item.city,
            state: item.state,
            minPrice: item.minPrice,
            maxPrice: item.maxPrice,
            sourceType: "project",
          }));
          allProjectsArr = allProjectsArr.sort(() => Math.random() - 0.5);
          setBuySearchData([]);
          setRentSearchData([]);
          setSearchData(allProjectsArr);
          setIsFallbackMode(true);
        } else {
      console.log(error.message);
        }
    }
  };
  fetchData();
  }, [key, key3, isEmptySearch]);

  const combinedSearchData = useMemo(() => {
    return [
  ...(searchData || []),
  ...(rentSearchData || []),
  ...(buySearchData || []),
];
  }, [searchData, rentSearchData, buySearchData]);

  const filteredFallbackProjects = useMemo(() => {
    let data = searchData;
    if (!isFallbackMode) return data;
    if (cityFilter) {
      data = data.filter(
        (item) => item.city && item.city.toLowerCase().includes(cityFilter.toLowerCase())
      );
    }
    if (primeLocation) {
      data = data.filter(
        (item) => item.city && item.city.toLowerCase() === primeLocation.toLowerCase()
      );
    }
    if (projectStatus) {
      data = data.filter(
        (item) => item.status && item.status.toLowerCase() === projectStatus.toLowerCase()
      );
    }
    if (projectType) {
      data = data.filter(
        (item) => item.type && item.type.toLowerCase() === projectType.toLowerCase()
      );
    }
    if (priceRange) {
      const [min, max] = priceRange.split("-").map(Number);
      data = data.filter((item) => {
        const price = Number(item.price) || Number(item.minPrice) || 0;
        return (!min || price >= min) && (!max || price <= max);
      });
    }
    return data;
  }, [searchData, cityFilter, primeLocation, projectStatus, projectType, priceRange, isFallbackMode]);

  const cityOptions = useMemo(() => {
    if (!isFallbackMode) return [];
    const cities = (searchData || []).map((item) => item.city).filter(Boolean);
    return Array.from(new Set(cities));
  }, [searchData, isFallbackMode]);

  return (
    <div style={{ overflowX: "hidden" }}>
      {isFallbackMode && (
        <div className="sticky top-20 z-30 bg-gray-100 shadow-md rounded-2xl px-4 py-4 mb-4">
          {/* Show/Hide Filter Button for Mobile */}
          {/* This button is visible only on screens smaller than 'md' (768px by default in Tailwind) */}
          <div className="md:hidden flex justify-center mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="bg-red-500 text-white font-semibold px-6 py-2 rounded-full hover:bg-red-600 transition"
            >
              {showFilters ? "Close Filters" : "Show Filters"}
            </button>
          </div>

          {/* Filter Container */}
          {/* This div will be hidden on mobile by default and shown when 'showFilters' is true.
              On desktop ('md' and up), it will always be visible and use flex-row.
              For mobile, it will use 'flex-wrap' and 'flex-col' for default (xs screens),
              then transition to 'flex-row' for 'sm' screens, allowing two items per row. */}
          <div
            className={`${
              showFilters ? "flex" : "hidden"
            } flex-col sm:flex-row sm:flex-wrap md:flex md:flex-row md:flex-wrap md:justify-center gap-3`}
          >
            {/* Filter inputs/selects */}
            <input
              type="text"
              placeholder="Project / City"
              // Adjusted width for mobile: w-full for very small, sm:w-[calc(50%-0.375rem)] for 2-column
              className="border border-red-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400 w-full sm:w-[calc(50%-0.375rem)] md:w-auto"
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
            />

            <select
              className="border border-red-300 rounded-full px-4 py-2 text-sm w-full sm:w-[calc(50%-0.375rem)] md:w-auto"
              value={primeLocation}
              onChange={(e) => setPrimeLocation(e.target.value)}
            >
              <option value="">Prime Locations</option>
              <option value="gurugram">Gurugram</option>
              <option value="delhi">Delhi</option>
              <option value="noida">Noida</option>
              <option value="goa">Goa</option>
              <option value="mumbai">Mumbai</option>
              <option value="panipat">Panipat</option>
              <option value="kasauli">Kasauli</option>
              <option value="panchkula">Panchkula</option>
              <option value="jalandhar">Jalandhar</option>
              <option value="ayodhya">Ayodhya</option>
              <option value="dubai">Dubai</option>
            </select>

            <select
              className="border border-red-300 rounded-full px-4 py-2 text-sm w-full sm:w-[calc(50%-0.375rem)] md:w-auto"
              value={projectStatus}
              onChange={(e) => setProjectStatus(e.target.value)}
            >
              <option value="">Project Status</option>
              <option value="ready to move">Ready to Move</option>
              <option value="under construction">Under Construction</option>
              <option value="upcoming">Upcoming</option>
              <option value="new launch">New Launch</option>
            </select>

            <select
              className="border border-red-300 rounded-full px-4 py-2 text-sm w-full sm:w-[calc(50%-0.375rem)] md:w-auto"
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
            >
              <option value="">Project Type</option>
              <option value="sco">SCO</option>
              <option value="commercial">Commercial</option>
              <option value="residential">Residential</option>
              <option value="deen dayal residential">Deen Dayal Residential</option>
              <option value="independent">Independent</option>
              <option value="builder affordable">Builder Affordable</option>
              <option value="villas">Villas</option>
              <option value="farmhouse">Farmhouse</option>
            </select>

            <select
              className="border border-red-300 rounded-full px-4 py-2 text-sm w-full sm:w-[calc(50%-0.375rem)] md:w-auto"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
            >
              <option value="">Price</option>
              <option value="0-5000000">Up to 50 Lakh</option>
              <option value="5000000-10000000">50 Lakh - 1 Cr</option>
              <option value="10000000-20000000">1 Cr - 2 Cr</option>
              <option value="20000000-50000000">2 Cr - 5 Cr</option>
              <option value="50000000-100000000">5 Cr - 10 Cr</option>
              <option value="100000000-">10 Cr +</option>
            </select>

            {/* Search Button (now also within the toggled filter section) */}
            <button
              className="bg-black text-white font-semibold px-6 py-2 rounded-full hover:bg-red-600 transition w-full sm:w-[calc(50%-0.375rem)] md:w-auto"
              onClick={() => {
                // You can add additional logic here if needed, e.g., to close filters after search
                // For now, it just re-filters the data via useMemo
                if (window.innerWidth < 768) { // Assuming md breakpoint is 768px
                  setShowFilters(false); // Close filters after search on mobile
                }
              }}
              type="button"
            >
              Search
            </button>
          </div>
        </div>
      )}

      {/* Rendering searchData if available (filtered in fallback mode) */}
      {combinedSearchData?.length > 0 || (isFallbackMode && filteredFallbackProjects.length > 0) ? (
        <section className="flex flex-col items-center bg-white">
          <CommonInside
          title={`Results For ${key1}`}
            Actualdata={isFallbackMode ? filteredFallbackProjects : combinedSearchData}
          />
        </section>
      ) : (
        <CustomSkeleton />
      )}

      {/* <Footer /> */}
    </div>
  );
};

export default SearchData;