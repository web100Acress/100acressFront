import React, {  useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from 'axios'
import {useParams} from 'react-router-dom'
const JobPostingView = () => {
  const [data, setData] = useState([]);

  const customStyle = {
    position: "absolute",
    top: "100px",
    marginLeft: "250px",
    right: "auto",
    width: "80%",
  };

  const {id} = useParams();

   const fetchJobPostingData = async () =>{
    try {
        const res = await axios.get(`/career/opening/View/${id}`);
        setData(res.data.data);
    } catch (error) {
        console.log(error || error.message)
    }
   }

   useEffect(()=>{
    fetchJobPostingData();
   },[])

 
  
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
                    <span className="text-red-600 font-semibold ">
                    Experience :{" "}
                      <span style={{ color: "black", fontWeight: "normal" }}>
                       {data.experience}
                      </span>
                    </span>
                  </th>
                </tr>

                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                    Job Location :{" "}
                      <span style={{ color: "black", fontWeight: "normal" }}>
                        {data.jobLocation}
                      </span>
                    </span>
                  </th>
                </tr>

                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                    Job Profile:{" "}
                      <span style={{ color: "black", fontWeight: "normal" }}>
                        {data.jobProfile}
                      </span>
                    </span>
                  </th>
                </tr>

                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                    Job Title :{" "}
                      <span style={{ color: "black", fontWeight: "normal" }}>
                        {data.jobTitle}
                      </span>
                    </span>
                  </th>
                </tr>

                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                    Responsibility :{" "}
                      <span style={{ color: "black", fontWeight: "normal" }}>
                        {data.responsibility}
                      </span>
                    </span>
                  </th>
                </tr>


                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                    Skill :{" "}
                      <span style={{ color: "black", fontWeight: "normal" }}>
                        {data.skill}
                      </span>
                    </span>
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPostingView;
