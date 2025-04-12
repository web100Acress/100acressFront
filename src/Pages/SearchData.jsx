import React, { useState, useEffect } from "react";
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
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (key3 === "Buy") {
          const res = await axios.get(
            `https://api.100acress.com/buyproperty/search/${key}`
          );
          setBuySearchData(res.data.data);
        } else if (key3 === "Rent") {
          const res = await axios.get(
            `https://api.100acress.com/rentproperty/search/${key}`
          );
          setRentSearchData(res.data.data);
        } else {
          const res = await axios.get(
            `https://api.100acress.com/property/search/${key}`
          );
          setSearchData(res.data.searchdata);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [key, key3]);

  useEffect(() => {}, [searchData, buySearchData, rentSearchData]);

  return (
    <div style={{ overflowX: "hidden" }}>
      {/* Rendering searchData if available */}
      {searchData.length > 0 ? (
        <section className="flex flex-col items-center bg-white">
          <CommonInside
          title={`Results For ${key1}`}
          Actualdata={searchData}
          />
        </section>
      ) : <CustomSkeleton/>}

      {/* Rendering buySearchData if available */}
      {buySearchData.length > 0 ? (
        <section className="flex flex-col items-center bg-white">
          <CommonInside
          title={`Results For ${key1}`}
          Actualdata={buySearchData}
          />
        </section>
      ) : ""}

      {/* Rendering rentSearchData if available */}
      {rentSearchData && rentSearchData.length > 0 ? (
        <section className="flex flex-col items-center bg-white">
          <CommonInside
          title={`Results For ${key1}`}
          Actualdata={rentSearchData}
          />
        </section>
      ) : ""}

      {/* <Footer /> */}
    </div>
  );
};

export default SearchData;
