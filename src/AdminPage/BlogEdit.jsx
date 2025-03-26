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

const BlogEdit = () => {
  const [viewDetails, setViewDetails] = useState({
    blog_Category: "",
    blog_Description: "",
    blog_Title: "",
    blog_Image: "",
    author: "",
  });
  const { id } = useParams();
  const token = localStorage.getItem("myToken");

  const handleUpdateUser = async () => {
    try {
      const formData = new FormData();

      for (const key in viewDetails) {
        formData.append(key, viewDetails[key]);
      }
      if (viewDetails.frontImage) {
        formData.append("frontImage", viewDetails.frontImage.file);
      }
      
      const response = await axios.put(
        `https://api.100acress.com/blog/update/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          }
        }
      );
      if (response.status === 200) {
        alert("Data updated successfully");
      } else {
        console.error("Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // const handleUpdateUser = async () => {
  //   try {
  //     const formData = new FormData();

  //     for (const key in values) {
  //       formData.append(key, values[key]);
  //     }

  //     formData.append("frontImage", values.frontImage.file);

  //     const response = await axios.post(
  //       `https://api.100acress.com/postPerson/propertyoneUpdate/${id}`,
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );

  //     if (response.status === 200) {
  //       alert("Data updated successfully");
  //       console.log("User updated successfully");
  //     } else {
  //       console.error("Failed to update user");
  //     }
  //   } catch (error) {
  //     console.error("Error updating user:", error);
  //   }
  // };

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   setViewDetails((prevValues) => ({
  //     ...prevValues,
  //     blog_Image: {
  //       public_id: "your_public_id",
  //       url: URL.createObjectURL(file),
  //     },
  //   }));
  // };

  function handleFileChange(event) {
    const input = event.target;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setViewDetails((prevValues) => ({
          ...prevValues,
          frontImage: {
            file: input.files[0],
            url: e.target.result,
          },
        }));
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://api.100acress.com/blog/edit/${id}`
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
                  <th>
                    {" "}
                    <span className="text-red-600 font-semibold ">
                      Blog Image :{" "}
                    </span>
                  </th>
                </tr>
                {/* <tr>
                  <td>
                    <img
                      src={
                        viewDetails.blog_Image ? viewDetails.blog_Image.url : ""
                      }
                      alt="blog_Image"
                      style={{ maxWidth: "20%" }}
                      id="previewImage"
                    />
                    <br />
                    <input type="file" onChange={(e) => handleFileChange(e)} />
                  </td>
                </tr> */}

                <tr>
                  <td>
                    <img
                      src={viewDetails.blog_Image ? viewDetails.blog_Image.url : ""}
                      alt="blog_Image"
                      style={{ maxWidth: "20%" }}
                      id="previewImage"
                    />
                    <br />
                    <input type="file" onChange={(e) => handleFileChange(e)} />
                  </td>
                </tr>
                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                      Blog Title :{" "}
                    </span>
                    <input
                      name="blog_Title"
                      placeholder="Blog Title"
                      className="w-full p-2 outline-none border-2 placeholder-black mt-4 rounded-md  text-black  border-gray-200  mobile-input"
                      value={viewDetails.blog_Title}
                      onChange={(e) =>
                        setViewDetails({
                          ...viewDetails,
                          blog_Title: e.target.value,
                        })
                      }
                    />
                  </th>
                </tr>
                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                      Blog Description :{" "}
                      <textarea
                        name="blog_Description"
                        placeholder="Blog Description"
                        className="w-full p-2 outline-none border-2 placeholder-black mt-4 rounded-md  text-black  border-gray-200  mobile-input"
                        value={viewDetails.blog_Description}
                        onChange={(e) =>
                          setViewDetails({
                            ...viewDetails,
                            blog_Description: e.target.value,
                          })
                        }
                      />
                    </span>
                  </th>
                </tr>
                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                      Blog Category :{" "}
                      <select
                        className="text-black border-2 p-2 outline-none w-full border-gray-200 mt-4 rounded-md"
                        value={viewDetails.blog_Category}
                        onChange={(e) =>
                          setViewDetails({
                            ...viewDetails,
                            blog_Category: e.target.value,
                          })
                        }
                      >
                        <option value="" className="text-gray-600">
                          Blog Category
                        </option>
                        <option value="Commercial Property">
                          Commercial Property
                        </option>
                        <option value="Residential Flats">
                          Residential Flats
                        </option>
                        <option value="SCO Plots">SCO Plots</option>
                        <option value="Deendayal Plots">
                          Deen Dayal Plots
                        </option>
                        <option value="Residential Plots">
                          Residential Plots
                        </option>
                        <option value="Independent Floors">
                          Independent Floors
                        </option>
                        <option value="Builder Floors">Builder Floors</option>
                        <option value="Affordable Homes">
                          Affordable Homes
                        </option>
                      </select>
                    </span>
                  </th>
                </tr>
                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                      Author :{" "}
                      <input
                        name="author"
                        placeholder="author"
                        className="w-full p-2 outline-none border-2 placeholder-black mt-4 rounded-md  text-black  border-gray-200  mobile-input"
                        value={viewDetails.author}
                        onChange={(e) =>
                          setViewDetails({
                            ...viewDetails,
                            author: e.target.value,
                          })
                        }
                      />
                    </span>
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
          <button
            type="button"
            onClick={handleUpdateUser}
            class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Update
          </button>
        </div>
      </div>
    </>
  );
};

export default BlogEdit;
