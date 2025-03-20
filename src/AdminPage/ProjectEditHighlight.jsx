import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import { useParams } from "react-router-dom";
const customStyle = {
  position: "absolute",
  top: "100px",
  marginLeft: "250px",
  right: "auto",
  width: "80%",
};

const ProjectEditHighlight = () => {
  const { id } = useParams();
  const [getHighLights, setGetHighLights] = useState([]);

  const resetData = () =>{
    setGetHighLights({
      highlight_Point: "",
    })
  }
  const fetchData = async () => {
    try {
      const res = await axios.get(
        `/api/highlight/edit/${id}`
      );
      setGetHighLights(res.data.data.highlight[0]);
    } catch (error) {
      console.log(error || error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateEditHighLightsData = async (e) => {
    try {
      const res = await axios.post(
        `/api/highlight/update/${id}`,
        getHighLights
      );
      if (res.status === 200) {
        alert("Highlights updated successfully");
        resetData();
      }
    } catch (error) {
      console.log(error || error.message);
    }
  };
  
  
  return (
    <>
      <Sidebar />
      <div style={customStyle}>
        <div className="pt-20">
          <div className="sm:w-[38rem] lg:w-full mx-auto lg:h-auto my-10 overflow-hidden rounded-2xl mt-0 mb-0 bg-white shadow-lg sm:max-w-lg">
            <div className="bg-red-500 pb-1 pt-2 text-center text-white">
              <p className="font-serif text-2xl font-semibold tracking-wider">
                Edit Highlights
              </p>
            </div>

            <div className="space-y-4 px-8 py-3 pt-3 ">
              <label className="block" for="name">
                <textarea
                  className="w-full  rounded-md border bg-white px-2 py-1 outline-none ring-black focus:ring-1"
                  type="text"
                  rows={3}
                  placeholder="Add Highlights"
                  name="highlight_Point"
                  value={getHighLights.highlight_Point}
                  onChange={(e) =>
                    setGetHighLights({
                      ...getHighLights,
                      highlight_Point: e.target.value,
                    })
                  }
                />
              </label>

              <button
                onClick={updateEditHighLightsData}
                className="mt-4 rounded-full bg-red-500 px-5 py-2 font-semibold text-white"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectEditHighlight;
