import React, { useState, Suspense, useContext, useMemo } from 'react';
import { lazy } from 'react';
const ReactQuill = lazy(() => import('react-quill'));
import 'react-quill/dist/quill.snow.css';
import TableBuilder from './TableBuilder';
import api from "../../../../../config/apiClient";
import { AuthContext } from "../../../../../AuthContext";
import showToast from "../../../../../Utils/toastUtils";

const BlogWrite = () => {
  const [content, setContent] = useState('');
  const [showTableBuilder, setShowTableBuilder] = useState(false);
  const [tableData, setTableData] = useState(null);
  const quillRef = React.useRef(null);
  const localAgent = useMemo(() => {
    try { return JSON.parse(window.localStorage.getItem('agentData') || 'null'); } catch { return null; }
  });
  const currentName = (agentData?.name || localAgent?.name || "").toString().trim();
  const currentEmail = (agentData?.email || localAgent?.email || "").toString().trim().toLowerCase();
  const currentId = (agentData?._id || localAgent?._id || "").toString();
  

  const handleContent = (value) => {
    setContent(value);
  };

  const handleInsertTable = () => {
    const quill = quillRef.current?.getEditor();
    if (quill) {
      const range = quill.getSelection(true);
      const placeholder = `[TABLE_PLACEHOLDER_${Date.now()}]`;
      quill.insertText(range.index, `\n${placeholder}\n`);
      quill.setSelection(range.index + placeholder.length + 2);
      setShowTableBuilder(true);
    } else {
      // Fallback if quill is not ready
      const placeholder = `[TABLE_PLACEHOLDER_${Date.now()}]`;
      setContent(content + `<p>${placeholder}</p>`);
      setShowTableBuilder(true);
    }
  };

  const handleTableChange = (data) => {
    setTableData(data);
  };

  const generateTableHTML = (data) => {
    if (!data || !data.rows) return '';
    let html = '<div class="my-6 overflow-x-auto">';
    if (data.heading) {
      html += `<h3 class="text-xl font-bold mb-3">${data.heading}</h3>`;
    }
    html += '<table class="min-w-full border-collapse border border-gray-300">';
    data.rows.forEach((row, rowIndex) => {
      html += '<tr>';
      row.forEach(cell => {
        if (rowIndex === 0) {
          html += `<th class="border border-gray-300 p-3 bg-gray-100 font-bold text-left">${cell}</th>`;
        } else {
          html += `<td class="border border-gray-300 p-3 text-left">${cell}</td>`;
        }
      });
      html += '</tr>';
    });
    html += '</table></div>';
    return html;
  };

  const finalizeContent = (rawContent) => {
    if (!tableData || !tableData.rows) {
      console.log("No table data found to finalize");
      return rawContent;
    }
    const tableHTML = generateTableHTML(tableData);
    console.log("Generated Table HTML:", tableHTML);
    
    // Check if the placeholder exists in the content
    if (!rawContent.includes('[TABLE_PLACEHOLDER_')) {
      console.warn("Placeholder [TABLE_PLACEHOLDER_] not found in content!");
      // If no placeholder, maybe append to the end? Or just return raw
      return rawContent;
    }

    const finalized = rawContent.replace(/\[TABLE_PLACEHOLDER_\d+\]/g, tableHTML);
    console.log("Finalized content with table:", finalized);
    return finalized;
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
    const finalContent = finalizeContent(content);
    console.log("Final Content to be sent:", finalContent); // Debugging
    formDataAPI.append("blog_Description", finalContent);

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
    setTableData(null);
    setShowTableBuilder(false);
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
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="content" className="block text-sm font-medium text-gray-900">Content:</label>
                    <button
                      type="button"
                      onClick={handleInsertTable}
                      className="text-xs bg-indigo-500 text-white px-2 py-1 rounded hover:bg-indigo-600 transition-colors flex items-center gap-1"
                    >
                      + Add Table Here
                    </button>
                  </div>
                  <Suspense fallback={<LoadingEditor />}>
                    <ReactQuill 
                      ref={quillRef}
                      theme="snow" 
                      modules={modules}
                      value={content} 
                      onChange={handleContent}
                      className="min-h-[200px]" 
                    />
                  </Suspense>
                </div>

                {showTableBuilder && (
                  <div className="mt-6 mb-8 border-2 border-indigo-100 rounded-xl p-4 bg-indigo-50/30">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-indigo-900">Configure Table</h3>
                      <button 
                        onClick={() => setShowTableBuilder(false)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        ✕
                      </button>
                    </div>
                    <TableBuilder 
                      onChange={handleTableChange}
                      onRemove={() => {
                        setShowTableBuilder(false);
                        setTableData(null);
                        setContent(content.replace(/\[TABLE_PLACEHOLDER_\d+\]/g, ''));
                      }}
                    />
                  </div>
                )}

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