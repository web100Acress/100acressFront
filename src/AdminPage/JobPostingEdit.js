import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { useParams } from "react-router-dom";
import axios from "axios";

const JobPostingEdit = () => {
  const customStyle = {
    position: "absolute",
    top: "100px",
    marginLeft: "250px",
    right: "auto",
    width: "80%",
  };

  const { id } = useParams();

  const [value, setValue] = useState({
    jobLocation: "",
    jobTitle: "",
    responsibility: "",
    experience: "",
    skill: "",
    jobProfile: "",
  });

  const fetchJobPostingData = async () => {
    try {
      const res = await axios.get(
        `http://api.100acress.com:3500/career/opening/View/${id}`
      );
      setValue(res.data.data);
    } catch (error) {
      console.log(error || error.message);
    }
  };

  useEffect(() => {
    fetchJobPostingData();
  }, []);

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `http://api.100acress.com:3500/career/opening/update/${id}`,
        value
      );
      if (res.status === 200) {
        alert("Data updated successfully");
      } else {
        console.error("Failed to update user");
      }
    } catch (error) {
      console.log(error || error.message);
    }
  };

  return (
    <div>
      <Sidebar />
      <div style={customStyle}>
        <div className="mx-auto max-w-4xl px-2 sm:px-6 lg:px-8">
          <div className="card-body">
            <table className="table table-striped table-bordered">
              <tbody>
                <tr>
                  <th>
                    <span className="text-red-600 font-semibold">
                      Experience :{" "}
                      <span style={{ color: "black", fontWeight: "normal" }}>
                        <input
                          type="text"
                          value={value.experience}
                          className="w-96"
                          onChange={(e) =>
                            setValue({ ...value, experience: e.target.value })
                          }
                        />
                      </span>
                    </span>
                  </th>
                </tr>

                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                      Job Location :{" "}
                      <span style={{ color: "black", fontWeight: "normal" }}>
                        <input
                          type="text"
                          className="w-96"
                          value={value.jobLocation}
                          onChange={(e) =>
                            setValue({ ...value, jobLocation: e.target.value })
                          }
                        />
                      </span>
                    </span>
                  </th>
                </tr>

                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                      Job Profile:{" "}
                      <span style={{ color: "black", fontWeight: "normal" }}>
                        <input
                          type="text"
                          className="w-96"
                          value={value.jobProfile}
                          onChange={(e) =>
                            setValue({ ...value, jobProfile: e.target.value })
                          }
                        />
                      </span>
                    </span>
                  </th>
                </tr>

                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                      Job Title :{" "}
                      <span style={{ color: "black", fontWeight: "normal" }}>
                        <input
                          type="text"
                          className="w-96"
                          value={value.jobTitle}
                          onChange={(e) =>
                            setValue({ ...value, jobTitle: e.target.value })
                          }
                        />
                      </span>
                    </span>
                  </th>
                </tr>

                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                      Responsibility :{" "}
                      <span style={{ color: "black", fontWeight: "normal" }}>
                        <input
                          type="text"
                          className="w-96"
                          value={value.responsibility}
                          onChange={(e) =>
                            setValue({
                              ...value,
                              responsibility: e.target.value,
                            })
                          }
                        />
                      </span>
                    </span>
                  </th>
                </tr>

                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                      Skill :{" "}
                      <span style={{ color: "black", fontWeight: "normal" }}>
                        <input
                          type="text"
                          className="w-96"
                          value={value.skill}
                          onChange={(e) =>
                            setValue({ ...value, skill: e.target.value })
                          }
                        />
                      </span>
                    </span>
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
          <button
            type="button"
            onClick={handleUpdate}
            className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobPostingEdit;
