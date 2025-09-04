import React, { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import api from '../config/apiClient';
  import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import 'quill-emoji/dist/quill-emoji.css';
import 'quill-emoji';
import { useParams, useNavigate } from 'react-router-dom';
import { message } from 'antd';
 
import {
  FileText,
  Image as ImageIcon,
  Edit3,
  Save,
  Upload,
  UploadCloud,
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
  // Auth is handled by the shared axios client interceptor
  const [messageApi, contextHolder] = message.useMessage();

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
  const [slugChecking, setSlugChecking] = useState(false);
  const [slugAvailable, setSlugAvailable] = useState(null); // null=unknown, true=ok, false=taken
  const [slugCheckMsg, setSlugCheckMsg] = useState('');

  // Other state
  const [author, setAuthor] = useState('');
  const [blogId, setBlogId] = useState('');
  const [blogToEdit, setBlogToEdit] = useState(false);
  const [newBlog, setNewBlog] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  // Cropper state for inline content images
  const [showCropper, setShowCropper] = useState(false);
  const [rawImageUrl, setRawImageUrl] = useState('');
  const [rawImageFile, setRawImageFile] = useState(null);
  const [crop, setCrop] = useState({ unit: '%', width: 80, aspect: 4 / 3 });
  const [completedCrop, setCompletedCrop] = useState(null);
  const cropImgRef = useRef(null);

  const quillRef = useRef(null);
  // Safe accessor for Quill instance: react-quill throws if called before mount
  const safeGetQuill = () => {
    try {
      const inst = quillRef.current && typeof quillRef.current.getEditor === 'function'
        ? quillRef.current.getEditor()
        : null;
      return inst || null;
    } catch (e) {
      // Editor not instantiated yet
      return null;
    }
  };
  // Lightbox & preview helpers
  const [lightboxUrl, setLightboxUrl] = useState('');
  const [frontPreviewObjUrl, setFrontPreviewObjUrl] = useState('');
  // Grid and theme controls
  const [gridImgSize, setGridImgSize] = useState('medium'); // small|medium|large
  const gridSizeToPx = { small: 120, medium: 160, large: 220 };
  const [bwMode, setBwMode] = useState(false);
  const [fontQuery, setFontQuery] = useState('');
  const [gridLayout, setGridLayout] = useState('equal'); // equal | lastLarge
  const [gridWithTitles, setGridWithTitles] = useState(true);
  const [gridUseFrameTitle, setGridUseFrameTitle] = useState(true);

  // Register extra fonts in Quill
  const fontWhitelist = [
    'inter','roboto','poppins','montserrat','lato','open-sans','raleway','nunito','merriweather','playfair','source-sans','ubuntu','work-sans','rubik','mulish','josefin','quicksand','dm-sans','pt-serif','arimo'
  ];
  const Font = Quill.import('formats/font');
  Font.whitelist = fontWhitelist;
  Quill.register(Font, true);

  // Auto-slug when title changes (unless user already touched slug)
  useEffect(() => {
    if (!slugTouched) {
      setSlug(slugify(title));
    }
  }, [title, slugTouched]);

  // Debounced slug uniqueness check (fetch admin list and check client-side)
  useEffect(() => {
    if (!slug || !slug.trim()) {
      setSlugAvailable(null);
      setSlugCheckMsg('');
      return;
    }
    let timer = setTimeout(async () => {
      try {
        setSlugChecking(true);
        setSlugCheckMsg('Checking slug...');
        const res = await api.get(`/blog/admin/view?limit=1000`);
        const list = Array.isArray(res?.data?.data) ? res.data.data : [];
        const target = slugify(slug);
        const found = list.find((b) => {
          const s = (b?.slug || slugify(b?.blog_Title || '')).toString();
          return s === target;
        });
        if (found) {
          if (blogToEdit && found._id === blogId) {
            setSlugAvailable(true);
            setSlugCheckMsg('This slug belongs to this post.');
          } else {
            setSlugAvailable(false);
            setSlugCheckMsg('Slug is already taken.');
          }
        } else {
          setSlugAvailable(true);
          setSlugCheckMsg('Slug is available.');
        }
      } catch (err) {
        setSlugAvailable(null);
        setSlugCheckMsg('Could not verify slug.');
      } finally {
        setSlugChecking(false);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [slug, blogToEdit, blogId]);

  // Load blog for edit / set default author for create
  useEffect(() => {
    const fetchBlog = async () => {
      if (id) {
        try {
          const res = await api.get(`/blog/view/${id}`);
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

  // Convert the next 4 standalone images (from cursor) into a grid with inline styles
  const convertNextImagesToGrid = () => {
    const quill = safeGetQuill();
    if (!quill) return;
    const root = quill.root;
    const sel = quill.getSelection(true) || { index: 0 };
    const leaf = quill.getLeaf(sel.index)?.[0];
    const fromNode = leaf?.domNode || root.firstChild;

    // Gather next 4 images not already inside a grid
    const allImgs = Array.from(root.querySelectorAll('img'));
    const startIdx = allImgs.findIndex((n) => n === fromNode || n.compareDocumentPosition(fromNode) & Node.DOCUMENT_POSITION_FOLLOWING || fromNode.contains?.(n));
    const imgs = [];
    for (let i = Math.max(0, startIdx); i < allImgs.length; i++) {
      const img = allImgs[i];
      if (img.closest('.img-grid-4')) continue;
      imgs.push(img);
      if (imgs.length === 4) break;
    }
    if (imgs.length < 2) {
      messageApi.info('Need at least 2 images after the cursor to convert to a grid');
      return;
    }

    const urls = imgs.map((img) => img.getAttribute('src')).filter(Boolean);
    const cardStyle = 'background:#fff;border:2px solid #222;border-radius:16px;overflow:hidden;display:flex;flex-direction:column;';
    const imgStyle = `width:100%;height:${gridSizeToPx[gridImgSize]}px;object-fit:cover;display:block;`;
    const capStyle = 'padding:8px 10px;font-size:14px;color:#111;text-align:center;';
    const cards = urls.map((u, idx) => gridWithTitles
      ? `<figure class=\"grid-card\" style=\"${cardStyle}\"><img style=\"${imgStyle}\" src=\"${u}\" alt=\"\" /><figcaption style=\"${capStyle}\" contenteditable=\"true\">Title ${idx+1}</figcaption></figure>`
      : `<figure class=\"grid-card\" style=\"${cardStyle}\"><img style=\"${imgStyle}\" src=\"${u}\" alt=\"\" /></figure>`
    ).join('');
    const gridCols = gridLayout === 'lastLarge' ? '1fr 1fr 1fr 1.6fr' : 'repeat(4, 1fr)';
    const inner = `<div class=\"img-grid-4 layout-${gridLayout}\" style=\"display:flex;flex-wrap:nowrap;align-items:stretch;gap:12px;display:grid;grid-template-columns:${gridCols};--grid-img-height:${gridSizeToPx[gridImgSize]}px;\">${cards}</div>`;
    const frameStyle = 'border:3px solid #111;border-radius:18px;padding:14px;background:#fff;';
    const titleStyle = 'text-align:center;font-weight:700;margin:4px 0 12px;font-size:16px;';
    const html = gridUseFrameTitle
      ? `<section class=\"img-grid-4-frame\" style=\"${frameStyle}\"><div class=\"grid-title\" style=\"${titleStyle}\" contenteditable=\"true\">Grid Title</div>${inner}</section>`
      : inner;

    // Insert before the first image block
    const firstImg = imgs[0];
    const container = document.createElement('div');
    container.innerHTML = html;
    const nodeToInsert = container.firstChild;
    const insertBefore = firstImg.closest('p') || firstImg;
    insertBefore.parentNode.insertBefore(nodeToInsert, insertBefore);

    // Remove the original images and empty paragraphs
    imgs.forEach((img) => {
      const p = img.closest('p');
      img.remove();
      if (p && !p.textContent.trim() && p.querySelectorAll('img').length === 0) {
        p.remove();
      }
    });

    messageApi.success('Converted 4 images into a grid');
  };

  // Helper: insert image URL into Quill with trailing newline
  const insertImageIntoQuill = (imageUrl) => {
    const quill = safeGetQuill();
    if (!quill) return;
    const sel = quill.getSelection(true) || { index: quill.getLength(), length: 0 };
    const insertAt = sel.index;
    quill.insertEmbed(insertAt, 'image', imageUrl, 'user');
    // add extra blank line so user can type easily after image
    quill.insertText(insertAt + 1, '\n\n', 'user');
    quill.setSelection(insertAt + 3, 0);
  };

  // Build cropped blob from image + completedCrop
  const getCroppedBlob = async () => {
    return new Promise((resolve, reject) => {
      const image = cropImgRef.current;
      if (!image || !completedCrop?.width || !completedCrop?.height) {
        return reject(new Error('Invalid crop'));
      }
      const canvas = document.createElement('canvas');
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      canvas.width = Math.round(completedCrop.width * scaleX);
      canvas.height = Math.round(completedCrop.height * scaleY);
      const ctx = canvas.getContext('2d');
      if (!ctx) return reject(new Error('Canvas not supported'));
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(
        image,
        Math.round(completedCrop.x * scaleX),
        Math.round(completedCrop.y * scaleY),
        Math.round(completedCrop.width * scaleX),
        Math.round(completedCrop.height * scaleY),
        0,
        0,
        Math.round(completedCrop.width * scaleX),
        Math.round(completedCrop.height * scaleY)
      );
      canvas.toBlob((blob) => {
        if (!blob) return reject(new Error('Failed to create blob'));
        resolve(blob);
      }, 'image/png', 1);
    });
  };

  const closeCropper = () => {
    setShowCropper(false);
    if (rawImageUrl) URL.revokeObjectURL(rawImageUrl);
    setRawImageUrl('');
    setRawImageFile(null);
    setCompletedCrop(null);
  };

  // Confirm crop: upload cropped image then insert into Quill
  const confirmCropAndInsert = async () => {
    try {
      if (!completedCrop?.width || !completedCrop?.height) {
        return messageApi.warning('Please select a crop area');
      }
      messageApi.open({ key: 'cropUpload', type: 'loading', content: 'Uploading cropped image...', duration: 0 });
      
      // Get the cropped blob
      const blob = await getCroppedBlob();
      const filename = (rawImageFile?.name || 'image.png').replace(/\.[^.]*$/, '') + '-cropped.png';
      const file = new File([blob], filename, { type: 'image/png' });

      // Create FormData and append the file
      const fd = new FormData();
      fd.append('image', file);

      // Add Content-Type header manually for FormData
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        },
        withCredentials: true
      };

      try {
        const res = await api.post(`/blog/upload-image`, fd, config);
        
        // Handle different response formats
        const imageUrl = res?.data?.url || 
                        res?.data?.data?.url || 
                        (typeof res?.data === 'string' ? res.data : '') || 
                        '';
                        
        if (!imageUrl) {
          console.error('Unexpected response format:', res?.data);
          throw new Error('Upload succeeded but no URL was returned in the response');
        }

        insertImageIntoQuill(imageUrl);
        messageApi.destroy('cropUpload');
        messageApi.success('Image uploaded and inserted');
        closeCropper();
      } catch (uploadError) {
        console.error('Upload error:', uploadError);
        if (uploadError.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error('Response data:', uploadError.response.data);
          console.error('Response status:', uploadError.response.status);
          console.error('Response headers:', uploadError.response.headers);
          throw new Error(uploadError.response.data?.message || 'Server error during upload');
        } else if (uploadError.request) {
          // The request was made but no response was received
          console.error('No response received:', uploadError.request);
          throw new Error('No response from server. Please check your connection.');
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Request setup error:', uploadError.message);
          throw uploadError;
        }
      }
    } catch (err) {
      console.error('Crop upload failed:', err);
      messageApi.destroy('cropUpload');
      messageApi.error(err.message || 'Failed to upload cropped image');
    }
  };

  // Load categories from backend (merge with initial list, unique)
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await api.get(`/blog/categories`);
        const apiCats = (res?.data?.data || []).map((c) => c.name).filter(Boolean);
        // merge with initial and unique (case-sensitive keep first)
        const merged = [...initialCategories];
        for (const name of apiCats) {
          if (!merged.includes(name)) merged.push(name);
        }
        setCategoryList(merged);
        // ensure current selected category is preserved if present
        if (categories && !merged.includes(categories)) {
          setCategoryList((prev) => [...prev, categories]);
        }
      } catch (e) {
        // silent fail, keep initial list
        // console.warn('Failed to load categories', e);
      }
    };
    loadCategories();
  }, []);

  /** Handle image URL input */
  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setFrontImage(url);
    
    // Basic URL validation
    if (url && url.trim() !== '') {
      try {
        new URL(url); // Will throw if invalid URL
        setFrontImagePreview(url);
      } catch (err) {
        // Don't show error while typing, only when submitting
        setFrontImagePreview('');
      }
    } else {
      setFrontImagePreview('');
    }
  };

  /** Featured image change - handles both file upload and URL */
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      setFrontImage(null);
      setFrontImagePreview('');
      if (frontPreviewObjUrl) {
        URL.revokeObjectURL(frontPreviewObjUrl);
        setFrontPreviewObjUrl('');
      }
      return;
    }

    // Check file type
    if (!file.type.match('image.*')) {
      messageApi.error('Please select a valid image file');
      return;
    }

    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      messageApi.error('Image size should be less than 5MB');
      return;
    }

    // Revoke previous object URL if exists
    if (frontPreviewObjUrl) {
      URL.revokeObjectURL(frontPreviewObjUrl);
    }

    // Create object URL for preview
    const objUrl = URL.createObjectURL(file);
    
    // Set states
    setFrontImage(file);
    setFrontPreviewObjUrl(objUrl);
    setFrontImagePreview(objUrl);
    
    // Auto-set meta title from filename if empty
    if (!metaTitle) {
      const fileName = file.name.replace(/\.[^/.]+$/, ''); // Remove extension
      const formattedName = fileName
        .replace(/[-_]/g, ' ') // Replace underscores and dashes with spaces
        .replace(/\s+/g, ' ') // Replace multiple spaces with single space
        .trim();
      setMetaTitle(formattedName);
    }
  };

  /** Insert image into Quill at cursor by URL */
  const insertImageByUrl = () => {
    const url = window.prompt('Paste image URL');
    if (!url) return;
    const quill = safeGetQuill();
    if (quill) {
      const sel = quill.getSelection(true) || { index: quill.getLength(), length: 0 };
      const insertAt = sel.index;
      // insert image and a trailing newline so user can type below
      quill.insertEmbed(insertAt, 'image', url, 'user');
      quill.insertText(insertAt + 1, '\n', 'user');
      quill.setSelection(insertAt + 2, 0);
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
      // If SVG, bypass cropper to preserve vector quality
      if (file.type === 'image/svg+xml') {
        try {
          messageApi.open({ key: 'svgUpload', type: 'loading', content: 'Uploading SVG...', duration: 0 });
          const fd = new FormData();
          fd.append('image', file);
          const res = await api.post(`/blog/upload-image`, fd);
          const imageUrl = res?.data?.url || res?.data?.data?.url || res?.data?.imageUrl || '';
          if (!imageUrl) throw new Error('Upload succeeded but no URL returned');
          insertImageIntoQuill(imageUrl);
          messageApi.destroy('svgUpload');
          messageApi.success('SVG inserted');
          return;
        } catch (err) {
          console.error('SVG upload failed', err);
          messageApi.destroy('svgUpload');
          messageApi.error('SVG upload failed');
          return;
        }
      }
      // Otherwise open cropper modal with selected file
      try {
        setCompletedCrop(null);
        setRawImageFile(file);
        const objUrl = URL.createObjectURL(file);
        setRawImageUrl(objUrl);
        setShowCropper(true);
      } catch (err) {
        console.error('Failed to open cropper', err);
        messageApi.error('Failed to open image cropper');
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
  const addNewCategory = async () => {
    const name = (addedCategory || '').trim();
    if (!name) return;
    try {
      const res = await api.post(
        `/blog/categories`,
        { name }
      );
      const createdName = res?.data?.data?.name || name;
      if (!categoryList.includes(createdName)) {
        setCategoryList((prev) => [...prev, createdName]);
      }
      setCategories(createdName);
      setAddedCategory('');
      messageApi.success('Category added');
    } catch (e) {
      // If already exists, still select it
      if (!categoryList.includes(name)) {
        setCategoryList((prev) => [...prev, name]);
      }
      setCategories(name);
      setAddedCategory('');
      messageApi.info('Category already exists or saved');
    }
  };

  /** Submit (draft/publish) */
  const handleSubmit = async (e, publishStatus) => {
    const willPublish = publishStatus === true;
    setIsPublished(willPublish);
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
    if (!slug || !slug.trim()) {
      return messageApi.error('Please enter a slug');
    }
    if (slugChecking) {
      return messageApi.warning('Please wait, checking slug...');
    }
    if (slugAvailable === false) {
      return messageApi.error('Slug is already taken. Choose another.');
    }
    if (!frontImage && !frontImagePreview && !blogToEdit) {
      return messageApi.error('Please select a featured image');
    }

    // Authorization is handled by the axios interceptor and enforced by the backend.

    setIsSubmitting(true);

    try {
      const formDataAPI = new FormData();
      formDataAPI.append('blog_Title', title.trim());
      formDataAPI.append('blog_Description', description);
      formDataAPI.append('blog_Category', categories);
      formDataAPI.append('author', author || 'Admin');
      formDataAPI.append('isPublished', willPublish);

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

        const res = await api.put(`/blog/update/${blogId}`, formDataAPI);

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

        const res = await api.post(`/blog/insert`, formDataAPI);

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
        // [{ font: fontWhitelist }],
        [{ size: ['small', false, 'large', 'huge'] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ color: [] }, { background: [] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['blockquote', 'code-block'],
        ['link', 'emoji'],
        [{ align: [] }],
        ['clean'],
      ],
    },
    clipboard: { matchVisual: false },
    'emoji-toolbar': true,
    'emoji-textarea': false,
    'emoji-shortname': true,
  };

  // Explicit formats so custom fonts and toolbar options are honored
  const quillFormats = [
    'header',
    'font',
    'size',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'list', 'bullet',
    'blockquote', 'code-block',
    'link',
    'align',
    'clean',
    'image',
  ];

  // Handle paste images (e.g., screenshots) -> open cropper
  useEffect(() => {
    const quill = safeGetQuill();
    if (!quill) return;
    const root = quill.root;
    const onPaste = (e) => {
      if (!e?.clipboardData) return;
      const items = Array.from(e.clipboardData.items || []);
      const fileItem = items.find((it) => it.kind === 'file' && it.type.startsWith('image/'));
      if (fileItem) {
        const file = fileItem.getAsFile();
        if (file) {
          e.preventDefault();
          try {
            setCompletedCrop(null);
            setRawImageFile(file);
            const objUrl = URL.createObjectURL(file);
            setRawImageUrl(objUrl);
            setShowCropper(true);
          } catch (err) {
            console.error('Failed to open cropper from paste', err);
            messageApi.error('Failed to open image cropper');
          }
        }
      }
    };
    root.addEventListener('paste', onPaste);
    // Image click -> open lightbox
    const onClick = (e) => {
      const t = e.target;
      if (t && t.tagName === 'IMG') {
        const src = t.getAttribute('src');
        if (src) setLightboxUrl(src);
      }
    };
    root.addEventListener('click', onClick);
    return () => {
      root.removeEventListener('paste', onPaste);
      root.removeEventListener('click', onClick);
    };
  }, []);

  // Cleanup featured preview object URL
  useEffect(() => {
    return () => {
      if (frontPreviewObjUrl) URL.revokeObjectURL(frontPreviewObjUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Apply B/W mode to editor root
  useEffect(() => {
    const quill = safeGetQuill();
    if (!quill) return;
    const root = quill.root;
    if (bwMode) root.classList.add('bw-mode');
    else root.classList.remove('bw-mode');
  }, [bwMode]);

  // Helper to apply selected font to current selection
  const applyFontToSelection = (fontName) => {
    const quill = safeGetQuill();
    if (!quill) return;
    quill.format('font', fontName);
  };

  // Apply current grid controls to the grid at the cursor (also set inline styles + flex fallback for publish)
  const applyGridSettingsToSelection = () => {
    const quill = safeGetQuill();
    if (!quill) return;
    const sel = quill.getSelection(true);
    if (!sel) return;
    const leaf = quill.getLeaf(sel.index)?.[0];
    if (!leaf || !leaf.domNode) return;
    let node = leaf.domNode;
    // If cursor is inside frame, step into inner grid
    let frameNode = null;
    while (node && node !== quill.root && !(node.classList && (node.classList.contains('img-grid-4') || node.classList.contains('img-grid-4-frame')))) {
      node = node.parentNode;
    }
    if (node && node.classList.contains('img-grid-4-frame')) {
      frameNode = node;
      node = node.querySelector('.img-grid-4') || node;
    }
    if (!node || node === quill.root || !node.classList.contains('img-grid-4')) {
      messageApi.info('Place the cursor inside a 4-image grid to apply settings');
      return;
    }
    // Update height and layout
    node.style.setProperty('--grid-img-height', `${gridSizeToPx[gridImgSize]}px`);
    node.classList.remove('layout-equal', 'layout-lastLarge');
    node.classList.add(`layout-${gridLayout}`);
    // Inline styles for publish rendering (flex fallback + grid)
    node.style.display = 'flex';
    node.style.flexWrap = 'nowrap';
    node.style.alignItems = 'stretch';
    node.style.gap = '12px';
    // Grid (if supported / not stripped)
    node.style.display = 'grid';
    node.style.gridTemplateColumns = gridLayout === 'lastLarge' ? '1fr 1fr 1fr 1.6fr' : 'repeat(4, 1fr)';
    if (frameNode) {
      frameNode.style.border = '3px solid #111';
      frameNode.style.borderRadius = '18px';
      frameNode.style.padding = '14px';
      frameNode.style.background = '#fff';
    }
    // Ensure each child is a figure.grid-card
    const ensureFigure = (child) => {
      if (child.tagName === 'FIGURE' && child.classList.contains('grid-card')) return child;
      if (child.tagName === 'IMG') {
        const fig = document.createElement('figure');
        fig.className = 'grid-card';
        child.replaceWith(fig);
        fig.appendChild(child);
        return fig;
      }
      return child;
    };
    const kids = Array.from(node.children);
    kids.forEach((k, idx) => {
      const fig = ensureFigure(k);
      const img = fig.querySelector('img');
      if (!img) return;
      // Inline styles for card and image
      fig.style.background = '#fff';
      fig.style.border = '2px solid #222';
      fig.style.borderRadius = '16px';
      fig.style.overflow = 'hidden';
      fig.style.display = 'flex';
      fig.style.flexDirection = 'column';
      // Flex fallback widths
      if (gridLayout === 'lastLarge') {
        fig.style.flex = idx === kids.length - 1 ? '0 0 40%' : '0 0 calc((60% - 36px)/3)';
        fig.style.width = idx === kids.length - 1 ? '40%' : 'calc((60% - 36px)/3)';
      } else {
        fig.style.flex = '0 0 calc((100% - 36px)/4)';
        fig.style.width = 'calc((100% - 36px)/4)';
      }
      img.style.width = '100%';
      img.style.height = `${gridSizeToPx[gridImgSize]}px`;
      img.style.objectFit = 'cover';
      img.style.display = 'block';
      const cap = fig.querySelector('figcaption');
      if (gridWithTitles) {
        if (!cap) {
          const c = document.createElement('figcaption');
          c.setAttribute('contenteditable', 'true');
          c.textContent = 'Title';
          c.style.padding = '8px 10px';
          c.style.fontSize = '14px';
          c.style.color = '#111';
          c.style.textAlign = 'center';
          fig.appendChild(c);
        }
      } else if (cap) {
        cap.remove();
      }
    });
    messageApi.success('Applied grid settings');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-2 sm:p-4 lg:p-6">
      {contextHolder}
      <div className="w-full">
        {/* Inline styles to improve image UX */}
        <style>{`
          /* Featured preview should never render black due to cover; use contain */
          .featured-preview { background:#f8fafc; object-fit: contain; }
          /* Quill content images small by default, click to zoom */
          .ql-editor img { max-width: 100%; height: auto; max-height: 260px; display: block; margin: 8px auto; cursor: zoom-in; border-radius: 8px; }
          /* Grid frame with title (outer border like your mockup) */
          .img-grid-4-frame{ border:3px solid #111; border-radius:18px; padding:14px; background:#fff; }
          .img-grid-4-frame > .grid-title{ text-align:center; font-weight:700; margin:4px 0 12px; font-size:16px; outline:none; }
          /* Four image grid block */
          .img-grid-4 { display:grid; gap:12px; }
          .img-grid-4.layout-equal{ grid-template-columns: repeat(4, 1fr); }
          .img-grid-4.layout-lastLarge{ grid-template-columns: 1fr 1fr 1fr 1.6fr; }
          .img-grid-4 .grid-card{ background:#fff; border:2px solid #222; border-radius:16px; overflow:hidden; display:flex; flex-direction:column; }
          .img-grid-4 .grid-card img { width:100%; height: var(--grid-img-height, 160px); object-fit: cover; cursor: zoom-in; display:block; }
          .img-grid-4 .grid-card figcaption{ padding:8px 10px; font-size:14px; color:#111; text-align:center; outline:none; }
          @media (max-width: 768px){ .img-grid-4{ grid-template-columns: repeat(2, 1fr);} }
          /* Black & White toggle */
          .ql-editor.bw-mode img { filter: grayscale(1); }
          /* Font mappings for editor */
          .ql-font-inter{font-family:'Inter',sans-serif}
          .ql-font-roboto{font-family:'Roboto',sans-serif}
          .ql-font-poppins{font-family:'Poppins',sans-serif}
          .ql-font-montserrat{font-family:'Montserrat',sans-serif}
          .ql-font-lato{font-family:'Lato',sans-serif}
          .ql-font-open-sans{font-family:'Open Sans',sans-serif}
          .ql-font-raleway{font-family:'Raleway',sans-serif}
          .ql-font-nunito{font-family:'Nunito',sans-serif}
          .ql-font-merriweather{font-family:'Merriweather',serif}
          .ql-font-playfair{font-family:'Playfair Display',serif}
          .ql-font-source-sans{font-family:'Source Sans 3',sans-serif}
          .ql-font-ubuntu{font-family:'Ubuntu',sans-serif}
          .ql-font-work-sans{font-family:'Work Sans',sans-serif}
          .ql-font-rubik{font-family:'Rubik',sans-serif}
          .ql-font-mulich, .ql-font-mulish{font-family:'Mulish',sans-serif}
          .ql-font-josefin{font-family:'Josefin Sans',sans-serif}
          .ql-font-quicksand{font-family:'Quicksand',sans-serif}
          .ql-font-dm-sans{font-family:'DM Sans',sans-serif}
          .ql-font-pt-serif{font-family:'PT Serif',serif}
          .ql-font-arimo{font-family:'Arimo',sans-serif}

          /* Show font names in the toolbar dropdown */
          .ql-snow .ql-picker.ql-font .ql-picker-label::before { content: 'Sans Serif'; }
          .ql-snow .ql-picker.ql-font .ql-picker-item::before { content: attr(data-label); }
          .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="inter"]::before { content: 'Inter'; font-family:'Inter',sans-serif }
          .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="inter"]{ font-family:'Inter',sans-serif }
          .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="roboto"]::before { content: 'Roboto'; font-family:'Roboto',sans-serif }
          .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="roboto"]{ font-family:'Roboto',sans-serif }
          .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="poppins"]::before { content: 'Poppins'; font-family:'Poppins',sans-serif }
          .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="poppins"]{ font-family:'Poppins',sans-serif }
          .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="montserrat"]::before { content: 'Montserrat'; font-family:'Montserrat',sans-serif }
          .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="montserrat"]{ font-family:'Montserrat',sans-serif }
          .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="lato"]::before { content: 'Lato'; font-family:'Lato',sans-serif }
          .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="lato"]{ font-family:'Lato',sans-serif }
          .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="open-sans"]::before { content: 'Open Sans'; font-family:'Open Sans',sans-serif }
          .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="open-sans"]{ font-family:'Open Sans',sans-serif }
          .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="raleway"]::before { content: 'Raleway'; font-family:'Raleway',sans-serif }
          .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="raleway"]{ font-family:'Raleway',sans-serif }
          .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="nunito"]::before { content: 'Nunito'; font-family:'Nunito',sans-serif }
          .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="nunito"]{ font-family:'Nunito',sans-serif }
          .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="merriweather"]::before { content: 'Merriweather'; font-family:'Merriweather',serif }
          .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="merriweather"]{ font-family:'Merriweather',serif }
          .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="playfair"]::before { content: 'Playfair'; font-family:'Playfair Display',serif }
          .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="playfair"]{ font-family:'Playfair Display',serif }
          .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="source-sans"]::before { content: 'Source Sans'; font-family:'Source Sans 3',sans-serif }
          .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="source-sans"]{ font-family:'Source Sans 3',sans-serif }
          .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="ubuntu"]::before { content: 'Ubuntu'; font-family:'Ubuntu',sans-serif }
          .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="ubuntu"]{ font-family:'Ubuntu',sans-serif }
          .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="work-sans"]::before { content: 'Work Sans'; font-family:'Work Sans',sans-serif }
          .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="work-sans"]{ font-family:'Work Sans',sans-serif }
          .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="rubik"]::before { content: 'Rubik'; font-family:'Rubik',sans-serif }
          .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="rubik"]{ font-family:'Rubik',sans-serif }
          .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="mulish"]::before { content: 'Mulish'; font-family:'Mulish',sans-serif }
          .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="mulish"]{ font-family:'Mulish',sans-serif }
          .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="josefin"]::before { content: 'Josefin Sans'; font-family:'Josefin Sans',sans-serif }
          .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="josefin"]{ font-family:'Josefin Sans',sans-serif }
          .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="quicksand"]::before { content: 'Quicksand'; font-family:'Quicksand',sans-serif }
          .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="quicksand"]{ font-family:'Quicksand',sans-serif }
          .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="dm-sans"]::before { content: 'DM Sans'; font-family:'DM Sans',sans-serif }
          .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="dm-sans"]{ font-family:'DM Sans',sans-serif }
          .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="pt-serif"]::before { content: 'PT Serif'; font-family:'PT Serif',serif }
          .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="pt-serif"]{ font-family:'PT Serif',serif }
          .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="arimo"]::before { content: 'Arimo'; font-family:'Arimo',sans-serif }
          .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="arimo"]{ font-family:'Arimo',sans-serif }
          /* Distinct item labels for Header picker */
          .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="false"]::before { content: 'Normal'; }
          .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before { content: 'H1'; }
          .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before { content: 'H2'; }
          .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before { content: 'H3'; }
          .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before { content: 'H4'; }
          .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="false"]::before { content: 'Normal'; }
          .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before { content: 'H1'; }
          .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before { content: 'H2'; }
          .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before { content: 'H3'; }
          .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before { content: 'H4'; }

          /* Distinct item labels for Size picker */
          .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="small"]::before { content: 'Small'; }
          .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="false"]::before { content: 'Normal'; }
          .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="large"]::before { content: 'Large'; }
          .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="huge"]::before { content: 'Huge'; }
          .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="small"]::before { content: 'Small'; }
          .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="false"]::before { content: 'Normal'; }
          .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="large"]::before { content: 'Large'; }
          .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="huge"]::before { content: 'Huge'; }
          /* Let labels reflect the currently selected value (default Quill behavior) */
        `}</style>
        {/* Load fonts */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=Roboto:wght@300;400;700&family=Poppins:wght@300;400;600;700&family=Montserrat:wght@300;400;600;700&family=Lato:wght@300;400;700&family=Open+Sans:wght@300;400;700&family=Raleway:wght@300;400;700&family=Nunito:wght@300;400;700&family=Merriweather:wght@300;400;700&family=Playfair+Display:wght@400;700&family=Source+Sans+3:wght@300;400;700&family=Ubuntu:wght@300;400;700&family=Work+Sans:wght@300;400;700&family=Rubik:wght@300;400;700&family=Mulish:wght@300;400;700&family=Josefin+Sans:wght@300;400;700&family=Quicksand:wght@300;400;700&family=DM+Sans:wght@300;400;700&family=PT+Serif:wght@400;700&family=Arimo:wght@400;700&display=swap" />
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

        {/* Cropper Modal */}
        {showCropper && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.55)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2000,
            }}
          >
            <div style={{ background: '#fff', padding: 16, borderRadius: 8, width: 'min(95vw, 900px)' }}>
              <h3 style={{ margin: '0 0 8px' }}>Crop Image</h3>
              <div style={{ maxHeight: '70vh', overflow: 'auto' }}>
                {rawImageUrl && (
                  <ReactCrop crop={crop} onChange={(c) => setCrop(c)} onComplete={(c) => setCompletedCrop(c)} aspect={crop.aspect}>
                    {/* eslint-disable-next-line jsx-a11y/alt-text */}
                    <img
                      ref={cropImgRef}
                      src={rawImageUrl}
                      onLoad={() => {
                        if (!completedCrop) {
                          setCrop((prev) => ({ ...prev }));
                        }
                      }}
                      style={{ maxWidth: '100%' }}
                    />
                  </ReactCrop>
                )}
              </div>
              <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 12 }}>
                <button type="button" onClick={closeCropper} style={{ padding: '6px 12px' }}>
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmCropAndInsert}
                  style={{ padding: '6px 12px', background: '#1677ff', color: '#fff', border: 'none', borderRadius: 4 }}
                >
                  Crop & Insert
                </button>
              </div>
            </div>
          </div>
        )}

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
                  <button
                    type="button"
                    onClick={() => {
                      setSlugTouched(false);
                      const auto = slugify(title);
                      setSlug(auto);
                    }}
                    className="px-3 text-sm bg-gray-100 hover:bg-gray-200 border-l border-gray-200"
                    title="Reset slug to match title"
                  >
                    Reset
                  </button>
                </div>
                <p className="text-xs text-gray-500">Auto-generates from title; you can edit it.</p>
                {slug && (
                  <div className="text-xs mt-1">
                    {slugChecking && <span className="text-gray-500">{slugCheckMsg}</span>}
                    {!slugChecking && slugAvailable === true && (
                      <span className="text-green-600">{slugCheckMsg || 'Slug is available.'}</span>
                    )}
                    {!slugChecking && slugAvailable === false && (
                      <span className="text-red-600">{slugCheckMsg || 'Slug is already taken.'}</span>
                    )}
                    {!slugChecking && slugAvailable === null && slugCheckMsg && (
                      <span className="text-gray-500">{slugCheckMsg}</span>
                    )}
                  </div>
                )}
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

              {frontImagePreview && (
                <div className="relative group mb-4">
                  <img
                    src={frontImagePreview}
                    alt="Featured preview"
                    className="w-full h-64 object-cover rounded-xl shadow-lg"
                    onClick={() => setLightboxUrl(frontImagePreview)}
                    onError={(e) => {
                      // If image fails to load, clear the preview
                      setFrontImagePreview('');
                      setFrontImage(null);
                      messageApi.error('Failed to load image. Please try another one.');
                    }}
                    title="Click to view full size"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 rounded-xl flex items-center justify-center cursor-pointer">
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-200 bg-white bg-opacity-80 p-3 rounded-full">
                      <Upload className="w-6 h-6 text-gray-700" />
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {/* File Upload Option */}
                <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                  <input
                    type="file"
                    id="featured-image-upload"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    key={frontImagePreview ? 'has-image' : 'no-image'}
                  />
                  <div className="space-y-2">
                    <Upload className="w-10 h-10 mx-auto text-gray-400" />
                    <p className="text-sm font-medium text-gray-700">
                      {frontImagePreview ? 'Click to change image' : 'Upload an image'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {frontImagePreview ? 'or drag and drop a new image' : 'Drag and drop or click to browse'}
                    </p>
                  </div>
                </div>

                {/* OR Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">OR</span>
                  </div>
                </div>

                {/* URL Input */}
                <div>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Paste image URL here"
                    onPaste={async (e) => {
                      try {
                        const pastedText = e.clipboardData.getData('text/plain');
                        if (pastedText) {
                          e.preventDefault(); // Prevent default paste behavior
                          e.target.value = pastedText; // Manually set the input value
                          handleImageUrlChange({ target: { value: pastedText } });
                        }
                      } catch (err) {
                        console.error('Error handling paste:', err);
                      }
                    }}
                    onChange={handleImageUrlChange}
                    value={frontImage || ''}
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Paste direct image URL (e.g., https://example.com/image.jpg)
                  </p>
                </div>
              </div>

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
            <div className="flex flex-wrap items-center gap-3">
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
              {/* Grid controls */}
              {/* <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600">Grid size:</label>
                <select
                  value={gridImgSize}
                  onChange={(e)=>setGridImgSize(e.target.value)}
                  className="px-2 py-1 border rounded"
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div> */}
              {/* <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600">Layout:</label>
                <select
                  value={gridLayout}
                  onChange={(e)=>setGridLayout(e.target.value)}
                  className="px-2 py-1 border rounded"
                >
                  <option value="equal">Equal (1:1:1:1)</option>
                  <option value="lastLarge">Last Larger</option>
                </select>
              </div> */}
              {/* <label className="flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" checked={gridWithTitles} onChange={(e)=>setGridWithTitles(e.target.checked)} />
                Titles under images
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" checked={gridUseFrameTitle} onChange={(e)=>setGridUseFrameTitle(e.target.checked)} />
                Outer frame & grid title
              </label> */}
              <button
                type="button"
                onClick={async () => {
                  // Select up to 4 images, upload, then insert grid
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.accept = 'image/*';
                  input.multiple = true;
                  input.onchange = async () => {
                    const files = Array.from(input.files || []).slice(0, 4);
                    if (!files.length) return;
                    messageApi.open({ key: 'gridUpload', type: 'loading', content: 'Uploading images...', duration: 0 });
                    try {
                      const urls = [];
                      for (const f of files) {
                        const fd = new FormData();
                        fd.append('image', f);
                        const r = await api.post(`/blog/upload-image`, fd);
                        const u = r?.data?.url || r?.data?.data?.url || r?.data?.imageUrl || '';
                        if (u) urls.push(u);
                      }
                      // Build cards with inline styles so it renders after publish without external CSS
                      const cardStyle = 'background:#fff;border:2px solid #222;border-radius:16px;overflow:hidden;display:flex;flex-direction:column;';
                      const imgStyle = `width:100%;height:${gridSizeToPx[gridImgSize]}px;object-fit:cover;display:block;`;
                      const capStyle = 'padding:8px 10px;font-size:14px;color:#111;text-align:center;';
                      const cards = urls.map((u, idx) => gridWithTitles
                        ? `<figure class=\"grid-card\" style=\"${cardStyle}\"><img style=\"${imgStyle}\" src=\"${u}\" alt=\"\" /><figcaption style=\"${capStyle}\" contenteditable=\"true\">Title ${idx+1}</figcaption></figure>`
                        : `<figure class=\"grid-card\" style=\"${cardStyle}\"><img style=\"${imgStyle}\" src=\"${u}\" alt=\"\" /></figure>`
                      ).join('');
                      const gridCols = gridLayout === 'lastLarge' ? '1fr 1fr 1fr 1.6fr' : 'repeat(4, 1fr)';
                      const inner = `<div class=\"img-grid-4 layout-${gridLayout}\" style=\"display:flex;flex-wrap:nowrap;align-items:stretch;gap:12px;display:grid;grid-template-columns:${gridCols};--grid-img-height:${gridSizeToPx[gridImgSize]}px;\">${cards}</div>`;
                      const frameStyle = 'border:3px solid #111;border-radius:18px;padding:14px;background:#fff;';
                      const titleStyle = 'text-align:center;font-weight:700;margin:4px 0 12px;font-size:16px;';
                      const html = gridWithTitles
                        ? `<section class=\"img-grid-4-frame\" style=\"${frameStyle}\"><div class=\"grid-title\" style=\"${titleStyle}\" contenteditable=\"true\">Grid Title</div>${inner}</section>`
                        : `${inner}<p><br/></p>`;
                      const quill = safeGetQuill();
                      if (quill) {
                        const sel = quill.getSelection(true) || { index: quill.getLength(), length: 0 };
                        quill.clipboard.dangerouslyPasteHTML(sel.index, html, 'user');
                        quill.setSelection(sel.index + 1, 0);
                      }
                      messageApi.success('Inserted 4-image grid');
                    } catch (err) {
                      console.error(err);
                      messageApi.error('Failed to insert grid');
                    } finally {
                      messageApi.destroy('gridUpload');
                    }
                  };
                  input.click();
                }}
                className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition"
                title="Insert 4 images as a grid"
              >
                Insert 4-Image Grid
              </button>
              {/* <button
                type="button"
                onClick={applyGridSettingsToSelection}
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
                title="Apply selected grid settings to the grid at the cursor"
              >
                Apply Grid Settings
              </button> */}
              {/* <button
                type="button"
                onClick={convertNextImagesToGrid}
                className="px-4 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition"
                title="Convert the next 4 images after the cursor into a grid"
              >
                Convert Next 4 Images → Grid
              </button> */}
              {/* Black & White toggle */}
              <button
                type="button"
                onClick={()=>setBwMode(v=>!v)}
                className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
                title="Toggle Black & White mode for images"
              >
                {bwMode ? 'Color Mode' : 'B/W Mode'}
              </button>
              {/* Font search/apply */}
              {/* <div className="flex items-center gap-2">
                <input
                  list="ql-font-list"
                  value={fontQuery}
                  onChange={(e)=>setFontQuery(e.target.value)}
                  onKeyDown={(e)=>{ if(e.key==='Enter'){ applyFontToSelection(fontQuery); } }}
                  placeholder="Search fonts"
                  className="px-2 py-1 border rounded"
                  style={{minWidth:180}}
                />
                <datalist id="ql-font-list">
                  {fontWhitelist.map(f=> (<option key={f} value={f} />))}
                </datalist>
                <button type="button" className="px-3 py-1 rounded bg-gray-800 text-white" onClick={()=>applyFontToSelection(fontQuery)}>Apply Font</button>
              </div> */}
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
                formats={quillFormats}
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
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit(e, false);
                }}
              >
                <Save className="w-4 h-4" />
                <span>{
                  isSubmitting && !isPublished ? 'Saving...' : 
                  isPublished ? 'Save as Draft' : 'Save as Draft'
                }</span>
              </button>
              )}

              <button
                type="button"
                className="px-8 py-3 text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition duration-200 font-medium flex items-center space-x-2 shadow-lg hover:shadow-xl"
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit(e, true);
                }}
                disabled={isSubmitting}
              >
                {isSubmitting && isPublished ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>{blogToEdit ? 'Updating...' : 'Publishing...'}</span>
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
        {/* Lightbox Overlay */}
        {lightboxUrl && (
          <div
            onClick={() => setLightboxUrl('')}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'zoom-out' }}
          >
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <img src={lightboxUrl} style={{ maxWidth: '95vw', maxHeight: '95vh', objectFit: 'contain', borderRadius: 8 }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogWriteModal;