import React, { useState, Suspense } from 'react';
import { lazy } from 'react';
const ReactQuill = lazy(() => import('react-quill'));
import 'react-quill/dist/quill.snow.css';
import axios from "axios";

const BlogWrite = () => {
  const [content, setContent] = useState('');
  const token = JSON.parse(localStorage.getItem("myToken"));
  

  const handleContent = (value) => {
    console.log(value, "value");
    setContent(value);
  };
  
  const [fileData, setFileData] = useState({
    blog_Image: null,
  });

  const [editForm, setEditForm] = useState({
    blog_Title: "",
    blog_Description: "",
    author: "Admin",
    blog_Category: "",
  });

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'},
       {'indent': '-1'}, {'indent': '+1'}],
      ['link'],
      ['clean']
    ], 
  };
  
  const handleChangeData = (e) => {
    const {name, value} = e.target;
    setEditForm({...editForm, [name]: value});
  };

  const handleEditCategory = (e) => {
    setEditForm({
      ...editForm,
      blog_Category: e.target.value,
    });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (!fileData || !fileData.blog_Image) {
      alert("Please select a blog image.");
      return;
    }

    if (!editForm.blog_Title || !content || !editForm.blog_Category) {
      alert("Please fill in all required fields.");
      return;
    }

    const formDataAPI = new FormData();
    const apiEndpoint = "/api/blog/insert";
    
    // Add form data to formDataAPI
    for (const key in editForm) {
      if (key !== 'blog_Description') {
        formDataAPI.append(key, editForm[key]);
      }
    }
    
    // Add the blog image
    formDataAPI.append("blog_Image", fileData.blog_Image);
    
    // Add the HTML content from the editor
    formDataAPI.append("blog_Description", content);

    try {
      const response = await axios.post(apiEndpoint, formDataAPI,{
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        console.log(response.data, "response");
        alert("Blog post submitted successfully");
        resetData();
      } else {
        console.error("Failed to submit data:", response.data);
        alert("Failed to submit blog post. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response) {
        console.error("Server error:", error.response.data);
        alert(`Error: ${error.response.data.message || "Failed to submit blog post"}`);
      } else {
        alert("Network error. Please check your connection and try again.");
      }
    }
  };

  const handleFileChange = (e, key) => {
    const newFileData = { ...fileData };
    newFileData[key] = e.target.files[0];
    setFileData(newFileData);
  };

  const resetData = () => {
    setEditForm({
      blog_Title: "",
      blog_Description: "",
      author: "Admin",
      blog_Category: "",
    });
    setContent('');
    setFileData({
      blog_Image: null
    });
  };

  const LoadingEditor = () => <div className="p-4 border rounded">Loading editor...</div>;

  return (
    <div className="">
      <div className="flex justify-center items-center pt-10">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-5/6 mt-0">
          <div className="modal-overlay bg-white shadow-2xl">
            <div className="container w-full h-70 rounded-xl pt-4">
              <div>
                <input
                  name="blog_Title"
                  placeholder="Blog Title"
                  className="w-full mb-4 p-2 outline-none border-2 placeholder-black mt-4 rounded-md text-black border-gray-200 mobile-input"
                  value={editForm.blog_Title}
                  onChange={handleChangeData}
                />

                <div className="mb-4">
                  <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900">Content:</label>
                  <Suspense fallback={<LoadingEditor />}>
                    <ReactQuill 
                      theme="snow" 
                      modules={modules}
                      value={content} 
                      onChange={handleContent}
                      className="min-h-[200px]" 
                    />
                  </Suspense>
                </div>

                <select
                  className="text-black border-2 p-2 outline-none w-full border-gray-200 mt-4 rounded-md"
                  value={editForm.blog_Category}
                  onChange={handleEditCategory}
                >
                  <option value="" className="text-gray-600">
                    Blog Category
                  </option>
                  <option value="Commercial Property">Commercial Property</option>
                  <option value="Residential Flats">Residential Flats</option>
                  <option value="SCO Plots">SCO Plots</option>
                  <option value="Deendayal Plots">Deen Dayal Plots</option>
                  <option value="Residential Plots">Residential Plots</option>
                  <option value="Independent Floors">Independent Floors</option>
                  <option value="Builder Floors">Builder Floors</option>
                  <option value="Affordable Homes">Affordable Homes</option>
                </select>

                <div className="flex mt-3 border-2 border-gray-200 rounded-md">
                  <div className="relative p-2 min-w-[160px] w-full rounded-md">
                    <p className="font-medium text-black">
                      Front Image
                      <input
                        type="file"
                        name="blog_Image"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, "blog_Image")}
                        className="mx-2 border-gray-200 mt-1"
                      />
                    </p>
                    {fileData.blog_Image && (
                      <p className="text-sm text-green-600 mt-1">
                        Selected: {fileData.blog_Image.name}
                      </p>
                    )}
                  </div>
                </div>
                <div className="text-center my-4">
                  <button
                    className="bg-blue-600 text-white text-lg border-0 rounded-md px-6 py-2 mx-2 my-2 hover:bg-blue-700 transition-colors"
                    onClick={(e) => handleSubmitForm(e)}
                  >
                    Submit Blog
                  </button>
                  <button
                    className="bg-gray-200 text-gray-800 text-lg border-0 rounded-md px-6 py-2 mx-2 my-2 hover:bg-gray-300 transition-colors"
                    onClick={resetData}
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogWrite;