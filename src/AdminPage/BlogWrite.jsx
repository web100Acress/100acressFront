import React, { useState } from 'react';
import JoditEditor from 'jodit-react';
import axios from "axios";
import LazyLoad from 'react-lazyload';
const BlogWrite = () => {
  const [content,setContent]=useState('')

  const handleContent=(value)=> {
    setContent(value)
  }
  
  const [fileData, setFileData] = useState({
    blog_Image: null,
  });

  const [editForm, setEditForm] = useState({
    blog_Title: "",
    blog_Description: "",
    author: "Admin",
    blog_Category: "",
  });

  

  const handleChangeData = (e) => {
    const {name, value} = e.target;
    setEditForm({...editForm, [name]:value})
  }

  const handleEditCategory = (e) => {
    setEditForm({
      ...editForm,
      blog_Category: e.target.value,
    });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (!fileData || !fileData.blog_Image) {
      console.error("File data is missing or invalid.");
      return;
    }
    const formDataAPI = new FormData();
    const apiEndpoint = "/api/blog/insert";
    for (const key in editForm) {
      formDataAPI.append(key, editForm[key]);
    }
    formDataAPI.append("blog_Image", fileData.blog_Image);
    formDataAPI.append("blog_Description", content);
    try {
      const response = await axios.post(apiEndpoint, formDataAPI);
      if (response.status === 200) {
        console.log(response.data, "response");
        alert("Data submitted successfully");
        resetData();
      } else {
        console.error("Failed to submit data:", response.data);
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response) {
        console.error("Server error:", error.response.data);
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
      blog_Image: "",
    });
  };




  return (
    <div className="">
      <div className="flex justify-center items-center pt-10">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-5/6 mt-0">
          <div className="modal-overlay bg-white shadow-2xl">
            <div className="container w-full h-70 rounded-xl  pt-4">
              <div>
                <input
                  name="blog_Title"
                  placeholder="Blog Title"
                  className="w-full mb-4 p-2 outline-none border-2 placeholder-black mt-4 rounded-md  text-black  border-gray-200  mobile-input"
                  value={editForm.blog_Title}
                  onChange={handleChangeData}
                />

                <div>
                  <label htmlFor="content">Content:</label>
                  <LazyLoad>
                    <JoditEditor
                      name="blog_Description"
                      value={content}
                      onChange={handleContent}
                      />
                    </LazyLoad>
                </div>

                <select
                  className="text-black border-2 p-2 outline-none w-full border-gray-200 mt-4 rounded-md"
                  value={editForm.blog_Category}
                  onChange={handleEditCategory}
                >
                  <option value="" className="text-gray-600">
                    Blog Category
                  </option>
                  <option value="Commercial Property">
                    Commercial Property
                  </option>
                  <option value="Residential Flats">Residential Flats</option>
                  <option value="SCO Plots">SCO Plots</option>
                  <option value="Deendayal Plots">Deen Dayal Plots</option>
                  <option value="Residential Plots">Residential Plots</option>
                  <option value="Independent Floors">Independent Floors</option>
                  <option value="Builder Floors">Builder Floors</option>
                  <option value="Affordable Homes">Affordable Homes</option>
                </select>

                <div className="flex mt-3 border-2 border-gray-200  rounded-md">
                  <div className="relative h-10  px-2 min-w-[160px]  w-full  rounded-md">
                     <p className="mt-2 font-medium border-gray-200 text-black">
                       Front Image
                       <input
                        type="file"
                        name="blog_Image"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, "blog_Image")}
                        className="mx-2 border-gray-200"
                      />
                    </p>
                  </div>
                </div>
                <div className="text-center  my-4 ">
                  <button
                    className="bg-white text-black text-lg border-2 rounded-md px-4 py-2 mx-2 my-2"
                    onClick={(e) => handleSubmitForm(e)}
                  >
                    Submit
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