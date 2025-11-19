import React, { useEffect, useState } from "react";
import CommonInside from "../../Utils/CommonInside";
import { useSelector } from "react-redux";
import Api_Service from "../../Redux/utils/Api_Service";
import Footer from "../../Components/Actual_Components/Footer";
import Navbar from "../../aadharhomes/navbar/Navbar";
import { ChevronDown } from "lucide-react";

const LuxuryProject = () => {
  let query = "luxury";

  const LuxuryProjects = useSelector(store => store?.allsectiondata?.luxuryAll);
  const {getAllProjects} = Api_Service();

  // Filter states
  const [selectedType, setSelectedType] = useState("");
  const [selectedSort, setSelectedSort] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  // Filtered data based on selections
  const filteredData = LuxuryProjects?.filter((item) => {
    if (selectedType && item.type !== selectedType && item?.postProperty?.propertyType !== selectedType) return false;
    if (selectedCity && item.city !== selectedCity && item?.postProperty?.city !== selectedCity) return false;
    if (selectedPrice) {
      const minPrice = item.minPrice || item.price || item.postProperty?.price;
      if (!minPrice) return false;
      const price = parseFloat(minPrice);
      if (selectedPrice === "0-1" && price >= 1) return false;
      if (selectedPrice === "1-5" && (price < 1 || price >= 5)) return false;
      if (selectedPrice === "5-10" && (price < 5 || price >= 10)) return false;
      if (selectedPrice === "10-20" && (price < 10 || price >= 20)) return false;
      if (selectedPrice === "20-50" && (price < 20 || price >= 50)) return false;
      if (selectedPrice === "50-Infinity" && price < 50) return false;
    }
    return true;
  }) || [];

  // Sorted data
  const sortedData = [...filteredData].sort((a, b) => {
    if (selectedSort === "price-low") {
      const aPrice = a.minPrice || a.price || a.postProperty?.price || 0;
      const bPrice = b.minPrice || b.price || b.postProperty?.price || 0;
      return parseFloat(aPrice) - parseFloat(bPrice);
    }
    if (selectedSort === "price-high") {
      const aPrice = a.minPrice || a.price || a.postProperty?.price || 0;
      const bPrice = b.minPrice || b.price || b.postProperty?.price || 0;
      return parseFloat(bPrice) - parseFloat(aPrice);
    }
    if (selectedSort === "newest") {
      const aDate = new Date(a.createdAt || a.postProperty?.createdAt || 0);
      const bDate = new Date(b.createdAt || b.postProperty?.createdAt || 0);
      return bDate - aDate;
    }
    if (selectedSort === "name") {
      const aName = (a.propertyName || a.projectName || a.postProperty?.propertyName || "").toLowerCase();
      const bName = (b.propertyName || b.projectName || b.postProperty?.propertyName || "").toLowerCase();
      return aName.localeCompare(bName);
    }
    return 0;
  });

 useEffect(()=>{
    getAllProjects(query,0);
  },[])
  return (
    <div>
      <Navbar />
      {/* Banner */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 border-b border-red-100 py-6  md:py-8 lg:py-10 mt-20 md:mt-24 lg:mt-20  relative">
        <h1 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold text-red-600">Luxury Projects for You</h1>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200 py-3">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
            {/* Type */}
            <div className="relative w-full sm:w-auto min-w-[140px]">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-2.5 bg-white text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 appearance-none cursor-pointer text-sm border border-gray-200 shadow-sm"
              >
                <option value="">All Types</option>
                <option value="Residential Flats">Residential Flats</option>
                <option value="Commercial Property">Commercial Property</option>
                <option value="SCO Plots">SCO Plots</option>
                <option value="Residential Plots">Residential Plots</option>
                <option value="Independent Floors">Independent Floors</option>
                <option value="Builder Floors">Builder Floors</option>
                <option value="Villas">Villas</option>
                <option value="Affordable Homes">Affordable Homes</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 pointer-events-none text-sm" />
            </div>

            {/* Sort */}
            <div className="relative w-full sm:w-auto min-w-[140px]">
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="w-full px-4 py-2.5 bg-white text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 appearance-none cursor-pointer text-sm border border-gray-200 shadow-sm"
              >
                <option value="">Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest First</option>
                <option value="name">Name: A to Z</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 pointer-events-none text-sm" />
            </div>

            {/* Price */}
            <div className="relative w-full sm:w-auto min-w-[140px]">
              <select
                value={selectedPrice}
                onChange={(e) => setSelectedPrice(e.target.value)}
                className="w-full px-4 py-2.5 bg-white text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 appearance-none cursor-pointer text-sm border border-gray-200 shadow-sm"
              >
                <option value="">All Prices</option>
                <option value="0-1">Under 1 Cr</option>
                <option value="1-5">1 to 5 Cr</option>
                <option value="5-10">5 to 10 Cr</option>
                <option value="10-20">10 to 20 Cr</option>
                <option value="20-50">20 to 50 Cr</option>
                <option value="50-Infinity">Above 50 Cr</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 pointer-events-none text-sm" />
            </div>

            {/* City */}
            <div className="relative w-full sm:w-auto min-w-[140px]">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-4 py-2.5 bg-white text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 appearance-none cursor-pointer text-sm border border-gray-200 shadow-sm"
              >
                <option value="">All Cities</option>
                <option value="Gurugram">Gurugram</option>
                <option value="Delhi">Delhi</option>
                <option value="Noida">Noida</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Goa">Goa</option>
                <option value="Ayodhya">Ayodhya</option>
                <option value="Panchkula">Panchkula</option>
                <option value="Kasauli">Kasauli</option>
                <option value="Dubai">Dubai</option>
                <option value="Panipat">Panipat</option>
                <option value="Karnal">Karnal</option>
                <option value="Jalandhar">Jalandhar</option>
                <option value="Sonipat">Sonipat</option>
                <option value="Alwar">Alwar</option>
                <option value="Pune">Pune</option>
                <option value="Pushkar">Pushkar</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 pointer-events-none text-sm" />
            </div>
          </div>
        </div>
      </div>

      <CommonInside
        Actualdata={sortedData}
        HelmetTitle="Luxury Projects in Gurugram – Ultra luxury Homes"
        metaContent="Luxury Projects are renowned for ideal locations, impeccable quality of construction, desirable amenities and reasonable prices"
        linkhref="https://www.100acress.com/top-luxury-projects/"
      />
      <Footer />
    </div>
  );
};

export default LuxuryProject;
