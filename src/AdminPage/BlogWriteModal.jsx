import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useParams, useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { getApiBase } from '../config/apiBase';
import {
  FileText,
  Image as ImageIcon,
  Edit3,
  Save,
  Upload,
  X,
  Plus,
  Tag,
  Link as LinkIcon,
} from 'lucide-react';

const initialCategories = [
  'Commercial Property',
  'Residential Flats',
  'SCO Plots',
  'Deen Dayal Plots',
  'Residential Plots',
  'Independent Floors',
  'Builder Floors',
  'Affordable Homes',
];

/** slugify helper */
const slugify = (text = '') =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 100);

const BlogWriteModal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('myToken');
  const [messageApi, contextHolder] = message.useMessage();
  const API_BASE = getApiBase();

  // Core fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState(''); // HTML from Quill
  const [frontImage, setFrontImage] = useState(null); // File or URL string
  const [frontImagePreview, setFrontImagePreview] = useState('');
  const [categories, setCategories] = useState('');
  const [categoryList, setCategoryList] = useState(initialCategories);
  const [addedCategory, setAddedCategory] = useState('');

  // SEO
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [slug, setSlug] = useState('');
  const [slugTouched, setSlugTouched] = useState(false); // if user edits slug manually

  // Other state
  const [author, setAuthor] = useState('');
  const [blogId, setBlogId] = useState('');
  const [blogToEdit, setBlogToEdit] = useState(false);
  const [newBlog, setNewBlog] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const quillRef = useRef(null);

  // Auto-slug when title changes (unless user already touched slug)
  useEffect(() => {
    if (!slugTouched) {
      setSlug(slugify(title));
    }
  }, [title, slugTouched]);

  // Load blog for edit / set default author for create
  useEffect(() => {
    const fetchBlog = async () => {
      if (id) {
        try {
          const res = await axios.get(`${API_BASE}/blog/view/${id}`);
          const b = res?.data?.data;
          if (b) {
            setTitle(b.blog_Title || '');
            setDescription(b.blog_Description || '');
            setFrontImage(null);
            setFrontImagePreview(b.blog_Image || '');
            setCategories(b.blog_Category || '');
            setAuthor(b.author || 'Admin');
            setBlogId(b._id || '');
            setBlogToEdit(true);
            setNewBlog(false);

            // map SEO fields if your backend returns them with these keys
            setMetaTitle(b.metaTitle || '');
            setMetaDescription(b.metaDescription || '');
            setSlug(b.slug || slugify(b.blog_Title || ''));
          } else {
            console.log('Blog not found');
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
        setBlogToEdit(false);
        setNewBlog(true);
        resetForm();
      }
    };
    fetchBlog();
  }, [id]);

  /** Featured image change */
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setFrontImage(file || null);
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setFrontImagePreview(ev.target.result);
      reader.readAsDataURL(file);
    } else {
      setFrontImagePreview('');
    }
  };

  /** Insert image into Quill at cursor by URL */
  const insertImageByUrl = () => {
    const url = window.prompt('Paste image URL');
    if (!url) return;
    const quill = quillRef.current?.getEditor?.();
    if (quill) {
      const range = quill.getSelection(true);
      quill.insertEmbed(range ? range.index : 0, 'image', url, 'user');
      quill.setSelection((range ? range.index : 0) + 1, 0);
    }
  };

  /** Upload an image and insert into Quill at cursor */
  const uploadInlineImage = async () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      try {
        messageApi.open({
          key: 'uploadInline',
          type: 'loading',
          content: 'Uploading image...',
          duration: 0,
        });

        // Adjust this to match your backend upload route
        const fd = new FormData();
        fd.append('image', file);

        // Example: POST to /blog/upload-image => { url: "https://..." }
        const res = await axios.post(`${API_BASE}/blog/upload-image`, fd, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });

        const imageUrl =
          res?.data?.url ||
          res?.data?.data?.url ||
          res?.data?.imageUrl ||
          '';

        if (!imageUrl) {
          throw new Error('Upload succeeded but no URL returned');
        }

        const quill = quillRef.current?.getEditor?.();
        if (quill) {
          const range = quill.getSelection(true);
          quill.insertEmbed(range ? range.index : 0, 'image', imageUrl, 'user');
          quill.setSelection((range ? range.index : 0) + 1, 0);
        }

        messageApi.destroy('uploadInline');
        messageApi.success('Image inserted');
      } catch (err) {
        console.error('Inline image upload failed', err);
        messageApi.destroy('uploadInline');
        messageApi.error('Inline image upload failed');
      }
    };
    input.click();
  };

  /** Category select handler incl. "Other" */
  const handleEditCategory = (e) => {
    const v = e.target.value;
    if (v === '__other__') {
      // reveal input
      setCategories(v);
    } else {
      setCategories(v);
    }
  };

  /** Add new category and select it */
  const addNewCategory = () => {
    const name = (addedCategory || '').trim();
    if (!name) return;
    if (!categoryList.includes(name)) {
      setCategoryList((prev) => [...prev, name]);
    }
    setCategories(name);
    setAddedCategory('');
  };

  /** Submit (draft/publish) */
  const handleSubmit = async (e, isPublished = false) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Validation
    if (!title.trim()) {
      return messageApi.error('Please enter a blog title');
    }
    if (!description || !description.trim()) {
      return messageApi.error('Please enter blog content');
    }
    if (!categories || categories === '__other__') {
      return messageApi.error('Please select or create a category');
    }
    if (!frontImage && !frontImagePreview && !blogToEdit) {
      return messageApi.error('Please select a featured image');
    }

    setIsSubmitting(true);

    try {
      const formDataAPI = new FormData();
      formDataAPI.append('blog_Title', title.trim());
      formDataAPI.append('blog_Description', description);
      formDataAPI.append('blog_Category', categories);
      formDataAPI.append('author', author || 'Admin');
      formDataAPI.append('isPublished', isPublished ? 'true' : 'false');

      // SEO payload
      if (metaTitle) formDataAPI.append('metaTitle', metaTitle.trim());
      if (metaDescription) formDataAPI.append('metaDescription', metaDescription.trim());
      if (slug) formDataAPI.append('slug', slug.trim());

      // Featured image: send file if chosen; if only preview URL (editing existing), backend may ignore
      if (frontImage) {
        formDataAPI.append('blog_Image', frontImage);
      }

      if (blogToEdit) {
        messageApi.open({
          key: 'updateloading',
          type: 'loading',
          content: 'Updating the blog...',
          duration: 0,
        });

        const res = await axios.put(`${API_BASE}/blog/update/${blogId}`, formDataAPI, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });

        messageApi.destroy('updateloading');
        if (res.status === 200) {
          messageApi.success('Blog updated successfully');
          resetForm();
          navigate('/seo/blogs');
        } else {
          messageApi.error('Error updating blog');
        }
      } else {
        messageApi.open({
          key: 'loadingNewBlog',
          type: 'loading',
          content: 'Adding New Blog...',
          duration: 0,
        });

        const res = await axios.post(`${API_BASE}/blog/insert`, formDataAPI, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });

        messageApi.destroy('loadingNewBlog');
        if (res.status === 200) {
          messageApi.success('Blog added successfully');
          resetForm();
          navigate('/seo/blogs');
        } else {
          messageApi.error('Error adding blog');
        }
      }
    } catch (error) {
      console.error('Blog submit error:', error);
      messageApi.destroy('updateloading');
      messageApi.destroy('loadingNewBlog');

      let errorMessage = 'Error saving blog';
      if (error.response) {
        errorMessage = error.response.data?.message || `Server error: ${error.response.status}`;
      } else if (error.request) {
        errorMessage = 'Network error. Please check your connection.';
      }
      messageApi.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setFrontImage(null);
    setFrontImagePreview('');
    setCategories('');
    setBlogId('');
    setMetaTitle('');
    setMetaDescription('');
    setSlug('');
    setSlugTouched(false);
  };

  // Quill toolbar config (no default image button; we add our own handlers)
  const quillModules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['blockquote', 'code-block'],
        ['link'],
        [{ align: [] }],
        ['clean'],
      ],
    },
    clipboard: { matchVisual: false },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-2 sm:p-4 lg:p-6">
      {contextHolder}
      <div className="w-full">
        {/* Header */}
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
                  {blogToEdit
                    ? 'Update your blog content, SEO and settings'
                    : 'Write and publish your next blog post'}
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate('/seo/blogs')}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <form className="p-6 space-y-8">
            {/* Title */}
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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg"
                placeholder="Enter your blog title..."
                required
              />
            </div>

            {/* Slug + Meta */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Slug URL</label>
                <div className="flex rounded-xl border border-gray-200 overflow-hidden">
                  <span className="px-3 flex items-center text-gray-500 bg-gray-50 border-r border-gray-200">
                    <LinkIcon className="w-4 h-4 mr-2" />
                    /blog/
                  </span>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => {
                      setSlugTouched(true);
                      setSlug(slugify(e.target.value));
                    }}
                    className="w-full px-3 py-3 focus:outline-none"
                    placeholder="my-custom-slug"
                  />
                </div>
                <p className="text-xs text-gray-500">Auto-generates from title; you can edit it.</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Meta Title</label>
                <input
                  type="text"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value.slice(0, 60))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Up to ~60 characters"
                />
                <div className="text-xs text-gray-500 text-right">{metaTitle.length}/60</div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Meta Description</label>
                <textarea
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value.slice(0, 160))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 h-[52px]"
                  placeholder="Up to ~160 characters"
                />
                <div className="text-xs text-gray-500 text-right">{metaDescription.length}/160</div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <ImageIcon className="w-5 h-5 text-green-600" />
                <label htmlFor="frontImage" className="text-lg font-semibold text-gray-900">
                  Featured Image
                </label>
              </div>

              {frontImagePreview ? (
                <div className="relative group">
                  <img
                    src={frontImagePreview}
                    alt="Front"
                    className="w-full h-64 object-cover rounded-xl shadow-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 rounded-xl flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-200">
                      <Upload className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>
              ) : null}

              <div className="relative">
                <input
                  type="file"
                  name="blog_Image"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full px-4 py-12 border-2 border-dashed border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 cursor-pointer"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="flex items-center space-x-2 text-gray-500">
                    <Upload className="w-5 h-5" />
                    <span className="text-sm font-medium">Click to upload image</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Category */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Tag className="w-5 h-5 text-purple-600" />
                <label className="text-lg font-semibold text-gray-900">
                  Blog Category
                </label>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <select
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-lg bg-white"
                  value={categories}
                  onChange={handleEditCategory}
                >
                  <option value="">Select a category</option>
                  {categoryList.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                  <option value="__other__">Other (add new)</option>
                </select>

                {categories === '__other__' && (
                  <>
                    <input
                      type="text"
                      value={addedCategory}
                      onChange={(e) => setAddedCategory(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Type new category name"
                    />
                    <button
                      type="button"
                      onClick={addNewCategory}
                      className="px-4 py-3 rounded-xl bg-purple-600 text-white hover:bg-purple-700 transition"
                    >
                      Add Category
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Editor Controls */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={uploadInlineImage}
                className="px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition flex items-center gap-2"
                title="Upload image and insert at cursor"
              >
                <Upload className="w-4 h-4" />
                Insert Image (Upload)
              </button>
              <button
                type="button"
                onClick={insertImageByUrl}
                className="px-4 py-2 rounded-lg bg-sky-600 text-white hover:bg-sky-700 transition flex items-center gap-2"
                title="Insert image by URL at cursor"
              >
                <ImageIcon className="w-4 h-4" />
                Insert Image (URL)
              </button>
            </div>

            {/* Content Editor */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Edit3 className="w-5 h-5 text-orange-600" />
                <label className="text-lg font-semibold text-gray-900">
                  Blog Content
                </label>
              </div>

              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <ReactQuill
                  ref={quillRef}
                  theme="snow"
                  value={description}
                  onChange={setDescription}
                  className="h-64"
                  modules={quillModules}
                />
              </div>
              <p className="text-xs text-gray-500">
                Tip: Use the buttons above to insert images anywhere inside the content.
              </p>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              {!blogToEdit && (
                <button
                  type="button"
                  className="px-6 py-3 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all duration-200 font-medium flex items-center space-x-2"
                  disabled={isSubmitting}
                  onClick={(e) => handleSubmit(e, false)}
                >
                  <Save className="w-4 h-4" />
                  <span>{isSubmitting ? 'Saving...' : 'Save as Draft'}</span>
                </button>
              )}

              <button
                type="button"
                className="px-8 py-3 text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition duration-200 font-medium flex items-center space-x-2 shadow-lg hover:shadow-xl"
                onClick={(e) => handleSubmit(e, true)}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
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
};

export default BlogWriteModal;
