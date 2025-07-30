import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { MdEdit, MdImage, MdTitle, MdDescription, MdCategory, MdPerson } from "react-icons/md";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

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

  // Theme state
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

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
        console.log('Fetching blog data for ID:', id);
        const res = await axios.get(
          `https://api.100acress.com/blog/edit/${id}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            }
          }
        );
        console.log('Blog data received:', res.data);
        setViewDetails(res.data.data);
      } catch (error) {
        console.error('Error fetching blog data:', error);
        
        let errorMessage = 'Failed to load blog data';
        if (error.response) {
          errorMessage = error.response.data?.message || `Server error: ${error.response.status}`;
        } else if (error.request) {
          errorMessage = 'Network error. Please check your connection.';
        }
        
        alert(errorMessage);
      }
    };
    fetchData();
  }, [id]);


  return (
    <>
      <Sidebar />
      <div className={`flex min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="flex-1 p-8 ml-64 overflow-auto font-sans">
          <div className="max-w-2xl mx-auto space-y-10">
            {/* Header */}
            <div className="flex items-center gap-2 mb-8 justify-between">
              <div className="flex items-center gap-2">
                <MdEdit className="text-3xl text-blue-500 animate-pulse" />
                <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-800'}`}>Edit Blog</h1>
              </div>
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className={`px-4 py-2 rounded-lg shadow-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${theme === 'dark' ? 'bg-gray-800 text-gray-100 hover:bg-gray-700' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
              </button>
            </div>
            {/* Card Form */}
            <section className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-xl shadow-2xl overflow-hidden border p-8`}> 
              {/* Blog Image */}
              <div className="mb-6">
                <Tippy content={<span>Blog Image</span>} animation="scale" theme="light-border">
                  <label className={`block font-semibold mb-2 flex items-center gap-2 ${theme === 'dark' ? 'text-blue-300' : 'text-red-700'}`}><MdImage />Blog Image</label>
                </Tippy>
                <div className="flex items-center gap-4">
                  <div className={`flex items-center justify-center h-32 w-32 overflow-hidden rounded-lg ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'} border`}>
                    {viewDetails.blog_Image && viewDetails.blog_Image.url ? (
                      <img src={viewDetails.blog_Image.url} alt="blog_Image" className="max-h-full max-w-full object-contain" id="previewImage" />
                    ) : (
                      <span className="text-gray-500 text-sm italic">No Blog Image</span>
                    )}
                  </div>
                  <input type="file" onChange={handleFileChange} className="mt-2" />
                </div>
              </div>
              {/* Blog Title */}
              <div className="mb-6">
                <Tippy content={<span>Blog Title</span>} animation="scale" theme="light-border">
                  <label className={`block font-semibold mb-2 flex items-center gap-2 ${theme === 'dark' ? 'text-blue-300' : 'text-red-700'}`}><MdTitle />Blog Title</label>
                </Tippy>
                    <input
                      name="blog_Title"
                      placeholder="Blog Title"
                  className={`w-full rounded-lg border ${theme === 'dark' ? 'border-gray-600 bg-gray-900 text-gray-100 placeholder-gray-400' : 'border-gray-300'} px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none`}
                      value={viewDetails.blog_Title}
                  onChange={(e) => setViewDetails({ ...viewDetails, blog_Title: e.target.value })}
                    />
              </div>
              {/* Blog Description */}
              <div className="mb-6">
                <Tippy content={<span>Blog Description</span>} animation="scale" theme="light-border">
                  <label className={`block font-semibold mb-2 flex items-center gap-2 ${theme === 'dark' ? 'text-blue-300' : 'text-red-700'}`}><MdDescription />Blog Description</label>
                </Tippy>
                      <textarea
                        name="blog_Description"
                        placeholder="Blog Description"
                  className={`w-full rounded-lg border ${theme === 'dark' ? 'border-gray-600 bg-gray-900 text-gray-100 placeholder-gray-400' : 'border-gray-300'} px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none min-h-[120px]`}
                        value={viewDetails.blog_Description}
                  onChange={(e) => setViewDetails({ ...viewDetails, blog_Description: e.target.value })}
                      />
              </div>
              {/* Blog Category */}
              <div className="mb-6">
                <Tippy content={<span>Blog Category</span>} animation="scale" theme="light-border">
                  <label className={`block font-semibold mb-2 flex items-center gap-2 ${theme === 'dark' ? 'text-blue-300' : 'text-red-700'}`}><MdCategory />Blog Category</label>
                </Tippy>
                      <select
                  className={`w-full rounded-lg border ${theme === 'dark' ? 'border-gray-600 bg-gray-900 text-gray-100' : 'border-gray-300'} px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none`}
                        value={viewDetails.blog_Category}
                  onChange={(e) => setViewDetails({ ...viewDetails, blog_Category: e.target.value })}
                      >
                  <option value="" className="text-gray-600">Blog Category</option>
                  <option value="Commercial Property">Commercial Property</option>
                  <option value="Residential Flats">Residential Flats</option>
                        <option value="SCO Plots">SCO Plots</option>
                  <option value="Deendayal Plots">Deen Dayal Plots</option>
                  <option value="Residential Plots">Residential Plots</option>
                  <option value="Independent Floors">Independent Floors</option>
                        <option value="Builder Floors">Builder Floors</option>
                  <option value="Affordable Homes">Affordable Homes</option>
                      </select>
              </div>
              {/* Author */}
              <div className="mb-6">
                <Tippy content={<span>Author</span>} animation="scale" theme="light-border">
                  <label className={`block font-semibold mb-2 flex items-center gap-2 ${theme === 'dark' ? 'text-blue-300' : 'text-red-700'}`}><MdPerson />Author</label>
                </Tippy>
                      <input
                        name="author"
                  placeholder="Author"
                  className={`w-full rounded-lg border ${theme === 'dark' ? 'border-gray-600 bg-gray-900 text-gray-100 placeholder-gray-400' : 'border-gray-300'} px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none`}
                        value={viewDetails.author}
                  onChange={(e) => setViewDetails({ ...viewDetails, author: e.target.value })}
                      />
          </div>
              <div className="flex justify-end mt-8">
          <button
            type="button"
            onClick={handleUpdateUser}
                  className={`flex items-center gap-2 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-lg px-8 py-3 shadow-lg transition-all ${theme === 'dark' ? 'bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900' : ''}`}
          >
                  <MdEdit className="text-xl" /> Update
          </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogEdit;
