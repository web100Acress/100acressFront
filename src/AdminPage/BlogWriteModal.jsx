import React, { useEffect, useState, Suspense } from 'react';
import axios from'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useParams, useNavigate } from 'react-router-dom';
import {message, Switch} from "antd";
import { 
  FileText, 
  Image, 
  Edit3, 
  Save, 
  Upload, 
  X,
  Plus,
  Calendar,
  User,
  Tag
} from 'lucide-react';

const BlogWriteModal = () => {

  const {id} = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("myToken");
  const [messageApi, contextHolder] = message.useMessage();

  const [title, setTitle] = useState('');
  const [descripition, setDescription] = useState('');
  const [frontImage, setFrontImage] = useState(null);
  const [categories, setCategories] = useState("");
  const [blogId, setBlogId] = useState('');
  const [blogToEdit, setBlogToEdit] = useState(false);
  const [newBlog, setNewBlog] = useState(true);
  const [author, setAuthor] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {    
      if (id) {
        try {
          const res = await axios.get(`/blog/view/${id}`);
          if(res.data?.data){
            setTitle(res.data.data.blog_Title);
            setDescription(res.data.data.blog_Description);
            setFrontImage(res.data.data.blog_Image);
            setCategories(res.data.data.blog_Category);
            setAuthor(res.data.data.author);
            setBlogId(res.data.data._id);
            setBlogToEdit(true);
          }else{
            console.log("Blog not found");
          }
                   
        } catch (error) {
          console.error(error); 
        }
      } else {
        try {
          const agentData = localStorage.getItem('agentData');
          if (agentData) {
            const parsedData = JSON.parse(agentData);
            setAuthor(parsedData?.name || 'Admin');
          } else {
            setAuthor('Admin');
          }
        } catch (error) {
          console.error('Error parsing agentData:', error);
          setAuthor('Admin');
        }
        setNewBlog(true);
        resetForm();
      }
    }
    fetchBlog();
  }, [id]);

  
  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    setFrontImage(file);
  };

  const handleEditCategory = (e) => {
    const selectedCategory = e.target.value;
    setCategories(selectedCategory); 
  }

  const handleSubmit = async(e,isPublished=false) => {
    e.preventDefault();
    if(isSubmitting) return;
    
    // Validation
    if (!title || !title.trim()) {
      messageApi.open({
        key: 'validationError',
        type: 'error',
        content: 'Please enter a blog title',
      });
      return;
    }
    
    if (!descripition || !descripition.trim()) {
      messageApi.open({
        key: 'validationError',
        type: 'error',
        content: 'Please enter blog description',
      });
      return;
    }
    
    if (!categories) {
      messageApi.open({
        key: 'validationError',
        type: 'error',
        content: 'Please select a blog category',
      });
      return;
    }
    
    if (!frontImage && !blogToEdit) {
      messageApi.open({
        key: 'validationError',
        type: 'error',
        content: 'Please select a blog image',
      });
      return;
    }
    
    setIsSubmitting(true);
    const formDataAPI = new FormData();
    
    // Append data to formData only if it's not null
    if (title) {
      formDataAPI.append('blog_Title', title.trim());
    }
    if (frontImage) {
      formDataAPI.append('blog_Image', frontImage);
    }
    if (descripition) {
      formDataAPI.append('blog_Description', descripition.trim());
    }
    if (categories) {
      formDataAPI.append('blog_Category', categories); 
    }

    if(author){
      formDataAPI.append('author', author);
    }

    if(isPublished){
      formDataAPI.append('isPublished', true);
    }else{
      formDataAPI.append('isPublished', false);
    }
    
    const apiEndpoint = blogToEdit? `/blog/update/${blogId}` : '/blog/insert';
    if (blogToEdit) {
      try {

        messageApi.open({
          key: 'updateloading',
          type: 'loading',
          content: 'Updating the blog...',
          duration: 0,
        });

        const res = await axios.put(apiEndpoint, formDataAPI,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${token}`,
            }
          }
        );
        if(res.status === 200) {
          messageApi.destroy('updateloading');
          messageApi.open({
            key: 'updateSuccess',
            type: 'success',
            content: 'Blog updated successfully', 
          });
          resetForm();
          navigate("/seo/blogs");
        }
        else{
          messageApi.destroy('updateloading');
          messageApi.open({
            key: 'updateError',
            type:'error',
            content: 'Error updating blog',
          });
        }
      } catch (error) {
        messageApi.destroy('updateloading');
        messageApi.open({
          key: 'updateError',
          type:'error',
          content: 'Error updating blog',
        });
        console.error(error);
      }
    }
    else if(newBlog &&  !blogToEdit) {

      try {
        messageApi.open({
          key: 'loadingNewBlog',
          type: 'loading',
          content: 'Adding New Blog...', 
        });
        console.log('Submitting blog with data:', {
          title: title.trim(),
          author: author,
          category: categories,
          hasImage: !!frontImage,
          isPublished: isPublished
        });
        
        const res = await axios.post('/blog/insert', formDataAPI,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${token}`,
            }
          }
        );
        
        console.log('API Response:', res.data);
        if(res.status === 200) {
          messageApi.destroy('loadingNewBlog');
          messageApi.open({
            key: 'newBlogSuccess',
            type:'success',
            content: 'Blog added successfully',
          });
          resetForm();
          navigate("/seo/blogs");
          // console.log("Blog inserted successfully");
        } 
        else{
          messageApi.destroy('loadingNewBlog');
          messageApi.open({
            key: 'newBlogError',
            type:'error',
            content: 'Error adding blog',
          });
          // console.log("Error inserting blog"); 
        }
      }
      catch (error) {
        messageApi.destroy('loadingNewBlog');
        console.error('Blog creation error:', error);
        
        let errorMessage = 'Error adding blog';
        if (error.response) {
          // Server responded with error status
          errorMessage = error.response.data?.message || `Server error: ${error.response.status}`;
        } else if (error.request) {
          // Network error
          errorMessage = 'Network error. Please check your connection.';
        }
        
        messageApi.open({
          key: 'newBlogError',
          type:'error',
          content: errorMessage,
        });
      }
      finally{
        setIsSubmitting(false);
      }
    }
    
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setFrontImage(null);
    setCategories("");
    setBlogId("");
  };

  try {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-2 sm:p-4 lg:p-6">
        {contextHolder}
        <div className="w-full">
          {/* Enhanced Header */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  {blogToEdit ? (
                    <Edit3 className="w-6 h-6 text-white" />
                  ) : (
                    <Plus className="w-6 h-6 text-white" />
                  )}
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    {blogToEdit ? 'Edit Blog Post' : 'Create New Blog'}
          </h2>
                  <p className="text-gray-600 mt-1">
                    {blogToEdit ? 'Update your blog content and settings' : 'Write and publish your next blog post'}
                  </p>
                </div>
        </div>
              <button
                onClick={() => navigate("/seo/blogs")}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Enhanced Form */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <form className="p-6 space-y-8">
              
              {/* Title Section */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <label htmlFor="title" className="text-lg font-semibold text-gray-900">
                    Blog Title
                </label>
                </div>
                <input
                type="text"
                id="title"
                value={title || ''}
                onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg"
                  placeholder="Enter your blog title..."
                required
                />
            </div>

              {/* Image Section */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Image className="w-5 h-5 text-green-600" />
                  <label htmlFor="frontImage" className="text-lg font-semibold text-gray-900">
                    Featured Image
                </label>
                </div>
                
                {frontImage?.url && (
                  <div className="relative group">
                <img
                    src={frontImage.url}
                    alt="Front Image"
                      className="w-full h-64 object-cover rounded-xl shadow-lg"
                />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 rounded-xl flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-all duration-200">
                        <Upload className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="relative">
                <input
                    type="file"
                    name="blog_Image"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, "blog_Image")}
                    className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 cursor-pointer"
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="flex items-center space-x-2 text-gray-500">
                      <Upload className="w-5 h-5" />
                      <span className="text-sm font-medium">Click to upload image</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Category Section */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Tag className="w-5 h-5 text-purple-600" />
                  <label className="text-lg font-semibold text-gray-900">
                    Blog Category
                  </label>
                </div>
                <select
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-lg bg-white"
                  value={categories || ''}
                  onChange={handleEditCategory}
                >
                  <option value="" className="text-gray-500">
                    Select a category
                  </option>
                  <option value="Commercial Property" className="text-gray-900">Commercial Property</option>
                  <option value="Residential Flats" className="text-gray-900">Residential Flats</option>
                  <option value="SCO Plots" className="text-gray-900">SCO Plots</option>
                  <option value="Deendayal Plots" className="text-gray-900">Deen Dayal Plots</option>
                  <option value="Residential Plots" className="text-gray-900">Residential Plots</option>
                  <option value="Independent Floors" className="text-gray-900">Independent Floors</option>
                  <option value="Builder Floors" className="text-gray-900">Builder Floors</option>
                  <option value="Affordable Homes" className="text-gray-900">Affordable Homes</option>
                </select>
            </div>

              {/* Description Section */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Edit3 className="w-5 h-5 text-orange-600" />
                  <label className="text-lg font-semibold text-gray-900">
                    Blog Content
                </label>
                </div>
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                {ReactQuill ? (
                  <ReactQuill
                      theme="snow"
                      value={descripition || ''}
                      onChange={setDescription}
                      className="h-64"
                      modules={{
                      toolbar: [
                          [{ header: [1, 2, 3, 4, false] }],
                          ['bold', 'italic', 'underline', 'strike'],
                          [{ list: 'ordered' }, { list: 'bullet' }],
                          ['link'],
                          [{ 'align': '' }, { 'align': 'center' }, { 'align': 'right' }, { 'align': 'justify' }],
                          ['clean']
                      ]
                      }}
                  />
                ) : (
                  <textarea
                    value={descripition || ''}
                    onChange={(e) => setDescription(e.target.value)}
                      className="w-full h-64 p-4 border-0 focus:outline-none resize-none text-lg"
                      placeholder="Write your blog content here..."
                  />
                )}
                </div>
            </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                {!blogToEdit && (
                <button
                    type="button"
                    className="px-6 py-3 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all duration-200 font-medium flex items-center space-x-2"
                    disabled={isSubmitting}
                    onClick={(e) => { handleSubmit(e, false) }}
                  >
                    <Save className="w-4 h-4" />
                    <span>{isSubmitting ? 'Saving...' : 'Save as Draft'}</span>
                </button>
                )}

                <button
                  type="button"
                  className="px-8 py-3 text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  onClick={(e) => { handleSubmit(e, true) }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>{blogToEdit ? 'Update Blog' : 'Publish Blog'}</span>
                    </>
                  )}
                </button>
            </div>
            </form>
        </div>
      </div>
    </div>
    );
  } catch (error) {
    console.error('Error in BlogWriteModal:', error);
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
        <div className="bg-white rounded-2xl p-8 shadow-xl border border-red-200 max-w-md mx-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <X className="w-8 h-8 text-red-600" />
            </div>
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Blog Editor</h2>
            <p className="text-gray-600 mb-6">There was an error loading the blog editor. Please try refreshing the page.</p>
          <button 
            onClick={() => window.location.reload()} 
              className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition-all duration-200 font-medium"
          >
            Refresh Page
          </button>
          </div>
        </div>
      </div>
    );
  }
};

export default BlogWriteModal;