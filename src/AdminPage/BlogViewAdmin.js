

import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const customStyle = {
  position: "absolute",
  top: "100px",
  marginLeft: "250px",
  right: "auto",
  width: "80%",
};


const BlogViewAdmin = () => {
  const [viewDetails, setViewDetails] = useState([]);
  const { id } = useParams();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://api.100acress.com:3500/blog/view/${id}`
        );
   
        setViewDetails(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Sidebar />
      <div style={customStyle}>
        <div className="mx-auto max-w-4xl px-2 sm:px-6 lg:px-8">
          <div className="card-body">
            <table className="table table-striped table-bordered">
              <tbody>
                <tr>
                  <th>Blog Image</th>
                </tr>
                
                <tr>
                  <td>
                    <img
                      src={
                        viewDetails.blog_Image
                          ? viewDetails.blog_Image.url
                          : ""
                      }
                      alt=""
                      style={{ maxWidth: "20%" }}
                      id="previewImage"
                    />
                  </td>
                </tr>
                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                      Blog Title :{" "}
                      <span style={{ color: "black", fontWeight: "normal" }}>
                        {viewDetails.blog_Title}
                      </span>
                    </span>
                  </th>
                </tr>
                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                      Blog Description :{" "}
                      <span style={{ color: "black", fontWeight: "normal" }}>
                        {viewDetails.blog_Description}
                      </span>
                    </span>
                  </th>
                </tr>
                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                      Blog Category :{" "}
                      <span style={{ color: "black", fontWeight: "normal" }}>
                        {viewDetails.blog_Category}
                      </span>
                    </span>
                  </th>
                </tr>
                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                      Author :{" "}
                      <span style={{ color: "black", fontWeight: "normal" }}>
                        {viewDetails.author}
                      </span>
                    </span>
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogViewAdmin;

