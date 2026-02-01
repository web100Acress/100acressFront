import React, { useState, Suspense, useContext, useMemo } from 'react';
import { lazy } from 'react';
const ReactQuill = lazy(() => import('react-quill'));
import 'react-quill/dist/quill.snow.css';
import api from "../../../../../config/apiClient";
import { AuthContext } from "../../../../../AuthContext";
import showToast from "../../../../../utils/toastUtils";

const BlogWrite = () => {
  const [content, setContent] = useState('');
  const { agentData } = useContext(AuthContext) || {};
  const localAgent = useMemo(() => {
    try { return JSON.parse(window.localStorage.getItem('agentData') || 'null'); } catch { return null; }
  }, []);
  const currentName = (agentData?.name || localAgent?.name || "").toString().trim();
  const currentEmail = (agentData?.email || localAgent?.email || "").toString().trim().toLowerCase();
  const currentId = (agentData?._id || localAgent?._id || "").toString();
  

  const handleContent = (value) => {
    console.log(value, "value");
    setContent(value);
  };
  
  const [fileData, setFileData] = useState({
    blog_Image: null,
  });
  const [fileError, setFileError] = useState('');

  const [editForm, setEditForm] = useState({
    blog_Title: "",
    blog_Description: "",
    author: currentName || "",
    authorEmail: currentEmail || "",
    authorId: currentId || "",
    blog_Category: "",
  });

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3,4, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'},
       {'indent': '-1'}, {'indent': '+1'}],
      ['link'],
      [{ 'align': ['','left','center','right'] }],
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
      showToast.error("Please select a blog image.");
      return;
    }

    if (!editForm.blog_Title || !content || !editForm.blog_Category) {
      showToast.error("Please fill in all required fields.");
      return;
    }

    const formDataAPI = new FormData();
    const apiEndpoint = "blog/insert";
    
    // Add form data to formDataAPI
    for (const key in editForm) {
      if (key !== 'blog_Description') {
        formDataAPI.append(key, editForm[key] ?? "");
      }
    }
    
    // Add the blog image
    formDataAPI.append("blogImage", fileData.blog_Image);
    
    // Add the HTML content from the editor
    formDataAPI.append("blog_Description", content);

    try {
      const response = await api.post(apiEndpoint, formDataAPI);
      if (response.status === 200) {
        console.log(response.data, "response");
        showToast.success("Blog post submitted successfully");
        resetData();
      } else {
        console.error("Failed to submit data:", response.data);
        showToast.error("Failed to submit blog post. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response) {
        console.error("Server error:", error.response.data);
        showToast.error(`Error: ${error.response.data.message || "Failed to submit blog post"}`);
      } else {
        showToast.error("Network error. Please check your connection and try again.");
      }
    }
  };

  const handleFileChange = (e, key) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Clear any previous error
    setFileError('');
    
    // Check image dimensions and aspect ratio (1200x628 = 300:157)
    const img = new Image();
    img.onload = function() {
      const expectedWidth = 1200;
      const expectedHeight = 628;
      const tolerance = 5; // Allow 5px tolerance
      
      if (Math.abs(this.width - expectedWidth) > tolerance || Math.abs(this.height - expectedHeight) > tolerance) {
        const errorMsg = `Image must be exactly ${expectedWidth} × ${expectedHeight} pixels (Current: ${this.width} × ${this.height})`;
        showToast.error(errorMsg);
        setFileError(errorMsg);
        // Reset the file input
        e.target.value = '';
        return;
      }
      
      // Calculate aspect ratio
      const expectedRatio = expectedWidth / expectedHeight;
      const actualRatio = this.width / this.height;
      const ratioTolerance = 0.01; // 1% tolerance
      
      if (Math.abs(actualRatio - expectedRatio) > ratioTolerance) {
        const errorMsg = `Image aspect ratio must be ${expectedWidth}:${expectedHeight} (300:157). Current ratio is ${this.width}:${this.height}`;
        showToast.error(errorMsg);
        setFileError(errorMsg);
        // Reset the file input
        e.target.value = '';
        return;
      }
      
      // If all validations pass, proceed with file processing
      const newFileData = { ...fileData };
      newFileData[key] = file;
      setFileData(newFileData);
      setFileError('');
    };
    
    img.onerror = function() {
      const errorMsg = 'Failed to load image. Please try a different file.';
      showToast.error(errorMsg);
      setFileError(errorMsg);
      e.target.value = '';
    };
    
    // Create object URL for validation
    const objUrl = URL.createObjectURL(file);
    img.src = objUrl;
  };

  const resetData = () => {
    setEditForm({
      blog_Title: "",
      blog_Description: "",
      author: currentName || "",
      authorEmail: currentEmail || "",
      authorId: currentId || "",
      blog_Category: "",
    });
    setContent('');
    setFileData({
      blog_Image: null
    });
    setFileError('');
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
                        name="blogImage"
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
                    {fileError && (
                      <p className="text-sm text-red-600 mt-1">
                        {fileError}
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