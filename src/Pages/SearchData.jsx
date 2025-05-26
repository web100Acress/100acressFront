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
      const res = await axios.get(
        `https://api.100acress.com/property/search/${key}`
      );

      const searchArr = (res.data.searchdata || []).map(item => ({
        ...item,
        sourceType: "search"
      }));
      setSearchData(searchArr);

      const rentRes = await axios.get(
        `https://api.100acress.com/rentproperty/search/${key}`
      );
      const rentArr = (rentRes.data.data || []).map(item => ({
        ...item,
        sourceType: "rent"
      }));
      setRentSearchData(rentArr);

      const buyRes = await axios.get(
        `https://api.100acress.com/buyproperty/search/${key}`
      );
      const buyArr = (buyRes.data.data || []).map(item => ({
        ...item,
        sourceType: "buy"
      }));
      setBuySearchData(buyArr);
    } catch (error) {
      console.log(error.message);
    }
  };
  fetchData();
}, [key, key3]);

const combinedSearchData = [
  ...(searchData || []),
  ...(rentSearchData || []),
  ...(buySearchData || []),
];

  useEffect(() => {}, [searchData, buySearchData, rentSearchData]);

  return (
    <div style={{ overflowX: "hidden" }}>
      {/* Rendering searchData if available */}
      {combinedSearchData?.length > 0 ? (
        <section className="flex flex-col items-center bg-white">
          <CommonInside
          title={`Results For ${key1}`}
          Actualdata={combinedSearchData}
          />
        </section>
      ) : <CustomSkeleton/>}

      {/* Rendering buySearchData if available */}
      {/* {buySearchData.length > 0 ? (
        <section className="flex flex-col items-center bg-white">
          <CommonInside
          title={`Results For ${key1}`}
          Actualdata={buySearchData}
          />
        </section>
      ) : ""} */}

      {/* Rendering rentSearchData if available */}
      {/* {rentSearchData && rentSearchData.length > 0 ? (
        <section className="flex flex-col items-center bg-white">
          <CommonInside
          title={`Results For ${key1}`}
          Actualdata={rentSearchData}
          />
        </section>
      ) : ""} */}

      {/* <Footer /> */}
    </div>
  );
};

export default SearchData;
