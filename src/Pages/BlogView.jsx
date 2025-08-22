import React, { useContext, useEffect, useState } from "react";
import Footer from "../Components/Actual_Components/Footer";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { DataContext } from "../MyContext";
import { Helmet } from "react-helmet";
import DOMPurify from 'dompurify';
import "./BlogView.css";
import useIsMobile from '../hooks/useIsMobile';
import { getApiBase } from '../config/apiBase';

const BlogView = () => {
  const { allupcomingProject } = useContext(DataContext);
  const API_BASE = getApiBase();
  const [data, setData] = useState({});
  const [recentBlogs,setRecentBlogs]=useState([]);
  const { id, slug } = useParams();
  const location = useLocation();

  const [buttonText, setButtonText] = useState("Submit");
  const [responseMessage, setResponseMessage] = useState("");
  const [blogQuery, setBlogQuery] = useState({
    name: "",
    mobile: "",
    email: "",
    message: "",
    status: "",
  });

  const history = useNavigate();
  const isMobile = useIsMobile ? useIsMobile() : false;
  const [showMobileEnquiry, setShowMobileEnquiry] = useState(false);

  const resetData = () => {
    setBlogQuery({
      name: "",
      mobile: "",
      email: "",
      message: "",
      status: "",
    });
  };

  const handleBlogQueryChange = (e) => {
    const { name, value } = e.target;
    setBlogQuery({ ...blogQuery, [name]: value });
  };

  const handleBlogSubmitQueryData = async (e) => {
    e.preventDefault();
    const { name, email, mobile, message } = blogQuery;
    if (!name || !email || !mobile || !message) {
      setResponseMessage("Please fill out all fields.");
      return;
    }

    setButtonText("Submitting...");
    try {
      await axios.post(
        `${API_BASE}/contact_Insert`,
        blogQuery
      );
      setResponseMessage("Data submitted successfully");
      resetData();
      setButtonText("Submit");
    } catch (error) {
      if (error.response) {
        console.error("Server error:", error.response.data);
      } else if (error.request) {
        console.error("Request error:", error.request);
      } else {
        console.error("Error:", error.message);
      }
      setButtonText("Submit");
    }
  };

  // Normalize blog object from API
  const normalizeBlog = (b) => {
    const obj = (b && typeof b === 'object') ? b : {};
    const img = obj.blog_Image;
    let normalizedImage = null;
    if (img && typeof img === 'object' && 'url' in img) {
      normalizedImage = img;
    } else if (typeof img === 'string') {
      normalizedImage = { url: img };
    }
    return {
      blog_Title: obj.blog_Title || '',
      blog_Description: obj.blog_Description || '',
      author: obj.author || '',
      blog_Category: obj.blog_Category || '',
      published_Date: obj.published_Date || obj.createdAt || '',
      blog_Image: normalizedImage,
      createdAt: obj.createdAt || '',
      slug: obj.slug || '',
      _id: obj._id || ''
    };
  };

  const fetchData = async () => {
    try {
      let res;
      if (slug) {
        try {
          res = await axios.get(`${API_BASE}/blog/slug/${slug}`);
          setData(normalizeBlog(res?.data?.data));
        } catch (err) {
          const status = err?.response?.status;
          if (status === 404) {
            // slug not found: try fallback by id from query string if provided
            const params = new URLSearchParams(location.search);
            const qid = params.get('id');
            if (qid) {
              const byId = await axios.get(`${API_BASE}/blog/view/${qid}`);
              setData(normalizeBlog(byId?.data?.data));
            } else {
              throw err; // rethrow to be caught below
            }
          } else {
            throw err;
          }
        }
      } else if (id) {
        res = await axios.get(`${API_BASE}/blog/view/${id}`);
        setData(normalizeBlog(res?.data?.data));
      } else {
        return;
      }
    } catch (error) {
      console.log(error || error.message);
    }
  };

  const fetchRecentsBlog = async () =>{
    try{
      const recent = await axios.get(`${API_BASE}/blog/view?page=1&limit=6`);
      const list = Array.isArray(recent?.data?.data) ? recent.data.data : [];
      const normalized = list.map((b) => normalizeBlog(b));
      const filtered = normalized.filter((blog)=> {
        if (slug && blog.slug) return blog.slug !== slug;
        return blog._id !== id;
      });
      setRecentBlogs(filtered);
    }
    catch (error) {
      console.log(error || error.message);
    }
  }

  function cleanString(str) {
    return str
        .replace(/\s+/g, '-')        // Replace all spaces with hyphen
        .replace(/[?!,\.;:\{\}\(\)\$\@]+/g, ''); // Replace punctuation with empty string
  }
  const handleBlogView = (Title, id, s) => {
    const blogTitle = cleanString(Title);
    if (s) {
      history(`/blog/${s}?id=${id}`);
    } else if (id) {
      history(`/blog/${blogTitle}/${id}`);
    }
  };

  useEffect(() => {
    fetchData();
    fetchRecentsBlog();
  }, [id, slug]);

  const createSanitizedHTML = (dirtyHTML) => ({
    __html: DOMPurify.sanitize(dirtyHTML, {
      ALLOWED_TAGS: ['p', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'ul', 'ol', 'li', 'a', 'img','br'],
      ALLOWED_ATTR: ['href', 'src', 'alt', 'class', 'style']
    })
  });

  const {
    blog_Title,
    blog_Description,
    author,
    blog_Category,
    published_Date,
    blog_Image,
  } = data;

  // Brand colors
  const BRAND_RED = '#b8333a';
  const DARK_TEXT = '#333';
  const TAGLINE = "Insights, Updates, and Stories from Gurgaon’s Real Estate World";

  return (
    <>
      <Helmet>
        <title>{`${blog_Title} ${blog_Category}`}</title>
        <link rel="canonical" href="https://www.100acress.com/" />
      </Helmet>

      {/* Modern Brand-Aligned Title */}
      <div className="max-w-4xl mx-auto px-4 pt-12 pb-6 mt-10">
        <div className="flex flex-col items-center justify-center">
          <h1
            className="text-center font-['Poppins','Inter',sans-serif] font-bold md:text-[36px] text-[28px] leading-tight mb-2 tracking-tight animate-fadeIn"
            style={{ letterSpacing: '-0.5px' }}
          >
            <span style={{ color: BRAND_RED, fontWeight: 800 }}>100acress</span>
            <span style={{ color: DARK_TEXT, fontWeight: 500 }}> Blog</span>
          </h1>
          {/* Gradient underline */}
          <div className="w-32 h-1 rounded-full mx-auto mb-2" style={{ background: 'linear-gradient(90deg, #f5e9e0 0%, #e0e7ef 100%)' }} />
          <div className="text-gray-500 text-sm text-center max-w-xl animate-fadeIn delay-100">
            {TAGLINE}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 px-4 pb-12">
        {/* Main Blog Content */}
        <div className="w-full md:w-2/3 bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-4 text-sm text-gray-500">
            <Link to="/blog/" className="text-primaryRed hover:underline">Blogs</Link>
            {' > '} {blog_Category || 'Blog'}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#1e3a8a] leading-tight mb-4">{blog_Title}</h1>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-gray-500 text-sm">
              {data.createdAt ? new Date(data.createdAt).toLocaleDateString('en-US', {
                month: 'short', day: 'numeric', year: 'numeric'
              }) : ''}
            </span>
            {author && (
              <span className="text-gray-700 text-sm">By {author}</span>
            )}
          </div>
          {blog_Image?.url && (
            <img src={blog_Image.url} alt={blog_Title} className="w-full max-h-[500px] object-contain rounded-xl mb-6" />
          )}
          <div
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-primaryRed prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={createSanitizedHTML(blog_Description)}
          ></div>
        </div>

        {/* Sidebar */}
        <div className="w-full md:w-1/3 flex flex-col gap-8">
          {/* Recent Posts */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Recent Posts</h3>
            <div className="space-y-2">
              {recentBlogs.length > 0 && recentBlogs.map((blog, index) => (
                <div
                  key={index}
                  onClick={() => handleBlogView(blog.blog_Title, blog._id, blog.slug)}
                  className="group cursor-pointer p-2 rounded-xl hover:bg-gray-50 transition-all duration-200 border border-transparent hover:border-gray-200 flex items-center gap-2"
                >
                  <img 
                    src={blog.blog_Image.url} 
                    className="w-12 h-12 rounded-lg object-cover flex-shrink-0" 
                    alt={blog.blog_Title}
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 group-hover:text-primaryRed transition-colors duration-200 line-clamp-2 text-sm">
                      {blog.blog_Title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">
                      {blog.blog_Category}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Enquiry Form: Desktop/Tablet only */}
          {!isMobile && (
            <div className="bg-gradient-to-br from-[#1E526B] to-[#496573] rounded-2xl shadow-xl p-6 text-white sticky top-24">
              <h3 className="text-xl font-bold mb-6 text-center">Enquire Now</h3>
              <form className="space-y-4">
                <div className="relative mb-2">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </span>
                  <input
                    name="name"
                    onChange={handleBlogQueryChange}
                    value={blogQuery.name}
                    placeholder="Your Name *"
                    className="w-full pl-12 pr-4 py-3 bg-white/20 border border-white/40 rounded-xl text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-white/60 focus:border-white/60 transition-all duration-200 shadow-sm"
                    type="text"
                  />
                </div>
                <div className="relative mb-2">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <input
                    name="email"
                    value={blogQuery.email}
                    onChange={handleBlogQueryChange}
                    placeholder="Email Address *"
                    className="w-full pl-12 pr-4 py-3 bg-white/20 border border-white/40 rounded-xl text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-white/60 focus:border-white/60 transition-all duration-200 shadow-sm"
                    type="email"
                  />
                </div>
                <div className="relative mb-2">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </span>
                  <input
                    name="mobile"
                    value={blogQuery.mobile}
                    onChange={handleBlogQueryChange}
                    placeholder="Phone Number *"
                    className="w-full pl-12 pr-4 py-3 bg-white/20 border border-white/40 rounded-xl text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-white/60 focus:border-white/60 transition-all duration-200 shadow-sm"
                    type="tel"
                  />
                </div>
                <div className="relative mb-2">
                  <span className="absolute left-4 top-4 text-white/80">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </span>
                  <textarea
                    name="message"
                    value={blogQuery.message}
                    onChange={handleBlogQueryChange}
                    placeholder="Your Message *"
                    rows="4"
                    className="w-full pl-12 pr-4 py-3 bg-white/20 border border-white/40 rounded-xl text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-white/60 focus:border-white/60 transition-all duration-200 resize-none shadow-sm"
                  ></textarea>
                </div>
                {responseMessage && (
                  <div className={`text-sm p-3 rounded-lg ${
                    responseMessage.includes("successfully") 
                      ? "bg-green-500/20 text-green-100" 
                      : "bg-red-500/20 text-red-100"
                  }`}>
                    {responseMessage}
                  </div>
                )}
                <button
                  onClick={handleBlogSubmitQueryData}
                  className="w-full py-3 px-6 bg-primaryRed text-white font-bold rounded-xl shadow-md hover:bg-red-700 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primaryRed/50 text-lg"
                >
                  {buttonText}
                </button>
              </form>
            </div>
          )}
        </div>
       {/* Mobile Enquiry Vertical Tab and Panel */}
       {isMobile && (
         <>
           {/* Vertical Tab */}
           <button
             className="fixed top-1/2 right-0 z-50 bg-primaryRed text-white font-bold text-sm px-2 py-3 rounded-l-xl shadow-lg transform -translate-y-1/2 tracking-widest"
             style={{writingMode: 'vertical-rl', textOrientation: 'mixed', letterSpacing: '0.1em', borderTopLeftRadius: '12px', borderBottomLeftRadius: '12px'}}
             onClick={() => setShowMobileEnquiry(true)}
           >
             ENQUIRE
           </button>
           {/* Slide-in Panel */}
           {showMobileEnquiry && (
             <div className="fixed inset-0 z-50 flex justify-end">
               <div className="fixed inset-0 bg-black bg-opacity-40" onClick={() => setShowMobileEnquiry(false)}></div>
               <div className="relative w-full max-w-sm bg-gradient-to-br from-[#1E526B] to-[#496573] text-white p-6 h-full overflow-y-auto animate-slideInRight">
                 <button
                   className="absolute top-4 right-4 text-white text-2xl"
                   onClick={() => setShowMobileEnquiry(false)}
                   aria-label="Close"
                 >
                   &times;
                 </button>
                 <h3 className="text-xl font-bold mb-6 text-center">Enquire Now</h3>
                 <form className="space-y-4">
                   <div className="relative mb-2">
                     <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80">
                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                       </svg>
                     </span>
                     <input
                       name="name"
                       onChange={handleBlogQueryChange}
                       value={blogQuery.name}
                       placeholder="Your Name *"
                       className="w-full pl-12 pr-4 py-3 bg-white/20 border border-white/40 rounded-xl text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-white/60 focus:border-white/60 transition-all duration-200 shadow-sm"
                       type="text"
                     />
                   </div>
                   <div className="relative mb-2">
                     <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80">
                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                       </svg>
                     </span>
                     <input
                       name="email"
                       value={blogQuery.email}
                       onChange={handleBlogQueryChange}
                       placeholder="Email Address *"
                       className="w-full pl-12 pr-4 py-3 bg-white/20 border border-white/40 rounded-xl text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-white/60 focus:border-white/60 transition-all duration-200 shadow-sm"
                       type="email"
                     />
                   </div>
                   <div className="relative mb-2">
                     <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80">
                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                       </svg>
                     </span>
                     <input
                       name="mobile"
                       value={blogQuery.mobile}
                       onChange={handleBlogQueryChange}
                       placeholder="Phone Number *"
                       className="w-full pl-12 pr-4 py-3 bg-white/20 border border-white/40 rounded-xl text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-white/60 focus:border-white/60 transition-all duration-200 shadow-sm"
                       type="tel"
                     />
                   </div>
                   <div className="relative mb-2">
                     <span className="absolute left-4 top-4 text-white/80">
                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                       </svg>
                     </span>
                     <textarea
                       name="message"
                       value={blogQuery.message}
                       onChange={handleBlogQueryChange}
                       placeholder="Your Message *"
                       rows="4"
                       className="w-full pl-12 pr-4 py-3 bg-white/20 border border-white/40 rounded-xl text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-white/60 focus:border-white/60 transition-all duration-200 resize-none shadow-sm"
                     ></textarea>
                   </div>
                   {responseMessage && (
                     <div className={`text-sm p-3 rounded-lg ${
                       responseMessage.includes("successfully") 
                         ? "bg-green-500/20 text-green-100" 
                         : "bg-red-500/20 text-red-100"
                     }`}>
                       {responseMessage}
                     </div>
                   )}
                   <button
                     onClick={handleBlogSubmitQueryData}
                     className="w-full py-3 px-6 bg-primaryRed text-white font-bold rounded-xl shadow-md hover:bg-red-700 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primaryRed/50 text-lg"
                   >
                     {buttonText}
                   </button>
                 </form>
               </div>
             </div>
           )}
         </>
       )}
      </div>

      <Footer />
    </>
  );
};

export default BlogView;