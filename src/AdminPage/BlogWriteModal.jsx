import React, { useEffect, useState, lazy } from 'react';
import axios from'axios';
const ReactQuill = lazy(()=> import('react-quill'));
import 'react-quill/dist/quill.snow.css';
import { useParams, useNavigate } from 'react-router-dom';
import {message, Switch} from "antd";

export const BlogWriteModal = () => {

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
          const res = await axios.get(`https://api.100acress.com/blog/view/${id}`);
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
        const agentData = JSON.parse(localStorage.getItem('agentData'));
        setNewBlog(true);
        setAuthor(agentData?.name);
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
    setIsSubmitting(true);
    const formDataAPI = new FormData();
    // Append data to formData only if it's not null
    if (title) {
      // console.log("Title",title);
      formDataAPI.append('blog_Title', title);
    }
    if (frontImage) {
      // console.log("Image",frontImage);
      formDataAPI.append('blog_Image', frontImage);
    }
    if (descripition) {
      // console.log("Description",descripition);
      formDataAPI.append('blog_Description', descripition);
    }
    if (categories) {
      // console.log("Category",categories);
      formDataAPI.append('blog_Category', categories); 
    }

    if(author){
      // console.log("Author",author);
      formDataAPI.append('author', author);
    }

    if(isPublished){
      formDataAPI.append('isPublished', true);
    }else{
      formDataAPI.append('isPublished', false);
    }
    
    const apiEndpoint = blogToEdit? `https://api.100acress.com/blog/Update/${blogId}` : 'https://api.100acress.com/blog/Insert';
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
        if(res.statusText === "OK") {
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
        const res = await axios.post('https://api.100acress.com/blog/insert', formDataAPI,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${token}`,
            }
          }
        );
        if(res.statusText === "OK") {
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
        messageApi.open({
          key: 'newBlogError',
          type:'error',
          content: 'Error adding blog',
        });
        console.error(error); 
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

  return (
    <div className="flex items-center justify-center z-50 overflow-y-auto py-4">
      {contextHolder}
      <div className="bg-white rounded-lg w-full mx-4  flex flex-col p-4">
        <div className="flex justify-between items-center py-2 border-b sticky top-0 bg-white z-10">
          <h2 className="text-2xl font-bold text-gray-900">
            {blogToEdit ? 'Edit Blog' : 'Create New Blog'}
          </h2>
        </div>
        <div className='overflow-y-auto flex-1'>
            <form className="space-y-6">
            <div>
                <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
                >
                Title
                </label>
                <input
                type="text"
                id="title"
                value={title || ''}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                />
            </div>
            <div>
                <label
                htmlFor="frontImage"
                className="block text-sm font-medium text-gray-700 mb-1"
                >
                Front Image
                </label>
                {frontImage?.url &&
                <img
                    src={frontImage.url}
                    alt="Front Image"
                    className="w-full h-48 object-cover rounded-md mb-2"
                />
                }
                <input
                    type="file"
                    name="blog_Image"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, "blog_Image")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
                </label>
                <div className="h-48">
                <ReactQuill
                    theme="snow"
                    value={descripition || ''}
                    onChange={setDescription}
                    className=""
                    modules={{
                    toolbar: [
                        [{ header: [1, 2,3,4, false] }],
                        ['bold', 'italic', 'underline', 'strike'],
                        [{ list: 'ordered' }, { list: 'bullet' }],
                        ['link'],
                        [{ 'align': ''},{'align': 'center'}, {'align': 'right'}, {'align': 'justify'}],
                        ['clean']
                    ]
                    }}
                />
                </div>
            </div>
            <div className='' >
                <select
                        className="text-black border-2 p-2 outline-none w-full border-gray-200 mt-4 rounded-md"
                        value={categories || ''}
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
            </div>
            <div className="flex justify-end gap-4 pt-4">
              {!blogToEdit 
                &&
                <button
                    type="button"
                    className="px-4 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-600"
                    disabled={isSubmitting}
                    onClick={(e)=>{handleSubmit(e,false)}}
                  >
                  {isSubmitting ? 'saving' :'Save to darft'}
                </button>
            }

                <button
                  type="button"
                  className="px-4 py-2 text-white bg-primaryRed rounded-md hover:bg-red-700"
                  onClick={(e)=>{handleSubmit(e,true); }}
                  disabled={isSubmitting}
                >
                {isSubmitting?'Saving.... ' : ''}
                {blogToEdit ? 'Update' : 'Create'}
                </button>
            </div>
            </form>
        </div>
      </div>
    </div>
  );
};