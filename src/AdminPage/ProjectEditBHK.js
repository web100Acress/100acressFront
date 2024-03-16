import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useParams } from "react-router-dom";
import axios from "axios";

const customStyle = {
  position: "absolute",
  top: "100px",
  marginLeft: "250px",
  right: "auto",
  width: "80%",
};

const ProjectEditBHK = () => {

  const { id } = useParams();
  const [viewBHK, setViewBHK] = useState([]);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://api.100acress.com/bhk_edit/${id}`);
        console.log(res,"dsdfdf fsdfsdfsdfsdf fsdfsdfdsfs")
        setViewBHK(res.data.data.BhK_Details[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  },[]);

  const submitBHKFromData = async (e) => {
    try {
      const res = await axios.post(
        `https://api.100acress.com/bhk_update/${id}`,
        viewBHK
      );

      if (res.ok) {
        console.log("User updated successfully");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
 

  return (
    <>
      <Sidebar />
      <div style={customStyle}>
        <div className="flex items-center mb-2 mt-2"></div>
        <div className="flex justify-center items-center mt-0">
          <div className="relative overflow-x-auto sm:rounded-lg w-5/6 mt-0">
            <div className="">
              <div className=" sm:w-[38rem] shadow-2xl lg:w-full mx-auto lg:h-auto my-10 overflow-hidden rounded-2xl mt-0 mb-0 bg-white  sm:max-w-lg">
                <div className="bg-red-500 pb-1 pt-2 text-center text-white">
                  <p className="font-serif text-2xl font-semibold tracking-wider">
                    Edit Floor Plan
                  </p>
                </div>

                <div className="space-y-4 px-8 py-3 pt-3 ">
                  <label className="block" for="name">
                    <input
                      className="w-full  rounded-md border bg-white px-2 py-1 outline-none ring-black focus:ring-1"
                      type="text"
                      placeholder="Add BHK Area"
                      name="bhk_Area"
                      value={viewBHK.bhk_Area}
                      onChange={(e) => setViewBHK({ ...viewBHK, bhk_Area: e.target.value })}
                      required
                    />
                  </label>
                  <label className="block" for="name">
                    <input
                      className="w-full rounded-md border bg-white px-2 py-1 outline-none ring-black focus:ring-1"
                      type="email"
                      placeholder="Add Bhk Type"
                      name="bhk_type"
                      value={viewBHK.bhk_type}
                      onChange={(e) =>setViewBHK({ ...viewBHK, bhk_type: e.target.value})}
                      required
                    />
                    <input
                      className="w-full mt-3 rounded-md border bg-white px-2 py-1 outline-none ring-black focus:ring-1"
                      type="email"
                      placeholder="Price"
                      name="price"
                      value={viewBHK.price}
                      onChange={(e) => setViewBHK({ ...viewBHK, price: e.target.value })}
                      required
                    />
                  </label>

                  <button
                    onClick={submitBHKFromData}
                    className="mt-4 rounded-full bg-red-500 px-5 py-2 font-semibold text-white"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectEditBHK;
