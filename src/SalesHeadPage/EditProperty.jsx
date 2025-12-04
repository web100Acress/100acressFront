import React, { useState, useEffect } from "react";
import SalesHeadSidebar from "./SalesHeadSidebar";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { getApiBase } from '../config/apiBase';
import { MdHome, MdImage, MdInfo, MdLocationOn, MdAttachMoney, MdApartment, MdArrowBack, MdSave } from "react-icons/md";

const EditProperty = () => {
  const [propertyData, setPropertyData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const base = getApiBase();
        const token = localStorage.getItem("myToken")?.replace(/^"/, '').replace(/"$/, '');
        
        // First, get all properties and find the specific one by ID
        const res = await axios.get(`${base}/project/viewAll/data`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        
        const allProperties = res.data?.data || [];
        const foundProperty = allProperties.find(prop => prop._id === id);
        
        if (foundProperty) {
          setPropertyData(foundProperty);
        } else {
          console.error("Property not found");
        }
      } catch (error) {
        console.error("Error fetching property details:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (id) {
      fetchData();
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPropertyData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const base = getApiBase();
      const token = localStorage.getItem("myToken")?.replace(/^"/, '').replace(/"$/, '');
      
      await axios.put(`${base}/postPerson/propertyUpdate/${id}`, propertyData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      
      navigate('/sales-head/listed-properties');
    } catch (error) {
      console.error("Error updating property:", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex bg-gray-50 min-h-screen">
        <SalesHeadSidebar />
        <div className="flex-1 p-4 ml-64 overflow-auto font-sans">
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-500">Loading property details...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <SalesHeadSidebar />
      <div className="flex bg-gray-50 min-h-screen">
        <div className="flex-1 p-4 ml-64 overflow-auto font-sans">
          <div className="w-full space-y-6">
            {/* Header with Back Button */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate('/sales-head/listed-properties')}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <MdArrowBack className="text-xl" />
                  Back to Properties
                </button>
                <div className="flex items-center gap-2">
                  <MdHome className="text-3xl text-blue-500 animate-pulse" />
                  <h1 className="text-3xl font-bold text-gray-800">Edit Property</h1>
                </div>
              </div>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center gap-2 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:bg-gray-400"
              >
                <MdSave className="text-xl" />
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>

            {/* Edit Form */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Property Name */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Property Name
                  </label>
                  <input
                    type="text"
                    name="propertyName"
                    value={propertyData.propertyName || ''}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                {/* Property Type */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Property Type
                  </label>
                  <input
                    type="text"
                    name="propertyType"
                    value={propertyData.propertyType || ''}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={propertyData.price || ''}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={propertyData.address || ''}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                {/* City */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={propertyData.city || ''}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                {/* State */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={propertyData.state || ''}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                {/* Area */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Area
                  </label>
                  <input
                    type="text"
                    name="area"
                    value={propertyData.area || ''}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                {/* LandMark */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    LandMark
                  </label>
                  <input
                    type="text"
                    name="landMark"
                    value={propertyData.landMark || ''}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                {/* Built Year */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Built Year
                  </label>
                  <input
                    type="number"
                    name="builtYear"
                    value={propertyData.builtYear || ''}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                {/* Furnishing */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Furnishing
                  </label>
                  <select
                    name="furnishing"
                    value={propertyData.furnishing || ''}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="">Select Furnishing</option>
                    <option value="Fully Furnished">Fully Furnished</option>
                    <option value="Semi Furnished">Semi Furnished</option>
                    <option value="Unfurnished">Unfurnished</option>
                  </select>
                </div>

                {/* Available Date */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Available Date
                  </label>
                  <input
                    type="date"
                    name="availableDate"
                    value={propertyData.availableDate || ''}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                {/* Property Looking */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Property Looking For
                  </label>
                  <select
                    name="propertyLooking"
                    value={propertyData.propertyLooking || ''}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="">Select Type</option>
                    <option value="Sell">Sell</option>
                    <option value="Rent">Rent</option>
                    <option value="Lease">Lease</option>
                  </select>
                </div>

                {/* Type */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Type
                  </label>
                  <input
                    type="text"
                    name="type"
                    value={propertyData.type || ''}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                {/* Description */}
                <div className="md:col-span-2 lg:col-span-3">
                  <label className="block text-gray-700 font-semibold mb-2">
                    Project Description
                  </label>
                  <textarea
                    name="description"
                    value={propertyData.description || ''}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProperty;
