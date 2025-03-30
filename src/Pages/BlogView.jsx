import React, { useContext, useEffect, useState } from "react";
import Footer from "../Components/Actual_Components/Footer";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { DataContext } from "../MyContext";
import { Helmet } from "react-helmet";
import DOMPurify from 'dompurify';
import "./BlogView.css";


const BlogView = () => {
  const { allupcomingProject } = useContext(DataContext);
  const [data, setData] = useState([]);
  const { id } = useParams();
  const [buttonText, setButtonText] = useState("Submit");
  const [responseMessage, setResponseMessage] = useState("");
  const [blogQuery, setBlogQuery] = useState({
    name: "",
    mobile: "",
    email: "",
    message: "",
    status: "",
  });

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
        "https://api.100acress.com/contact_Insert",
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

  const fetchData = async () => {
    try {
      const res = await axios.get(`https://api.100acress.com/blog/view/${id}`);
      setData(res.data.data);
    } catch (error) {
      console.log(error || error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  return (
    <>
      <Helmet>
        <title>{`${blog_Title} ${blog_Category}`}</title>
        <link rel="canonical" href="https://www.100acress.com/" />
      </Helmet>

      <div className="flex flex-col mt-20">
      <h1 className="p-3 py-5 text-center text-3xl sm:text-xl md:text-2xl lg:text-3xl bg-primaryRed text-white font-bold tracking-[0.1em]">
         Blog
        </h1> 
        <div className="bg-white py-8">
          <div className="px-8 flex flex-col md:flex-row">
            <div className="w-full md:w-[70%] px-4 py-4 shadow-lg rounded-lg">
    
              <div className="prose max-w-none">
                <p className="text-lg text-primaryRed my-2">{blog_Category}</p>
                <p className="text-4xl my-4">{blog_Title}</p>
                <img
                src={blog_Image?.url}
                alt="Blog"
                className="my-4 rounded-lg"
              />
                <div
                  className="react-quill-content ql-editor"
                  dangerouslySetInnerHTML={createSanitizedHTML(blog_Description)}
                ></div>
              </div>
            </div>

            <div className="w-full md:w-[30%] text-center max-sm:mt-10">
            <div className="relative w-[95%] ml-5 text-start max-sm:ml-0">
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-[90%] mx-2 p-2 pr-20 border-2 rounded-full focus:outline-none focus:ring-0"
                  />
                  <button className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-500">
                    SEARCH

                  </button>
                </div>

              <div className="text-center max-sm:ml-0"> 
                <h4 className="text-x text-start ml-7 text-primaryRed mt-4 mb-3">
                Recent posts
                </h4>
                <ul className="text-start max-sm:ml-0 ">
                  <li className="mb-3 px-3 py-3 shadow-lg rounded-lg hover:bg-red-600 hover:text-white transition-all duration-500 ease-in-out"><a>Why Investors Are Choosing Signature Global Towers Over Other Gurgaon Areas</a></li>
                  <li className="mb-3 px-3 py-3 shadow-lg rounded-lg hover:bg-red-600 hover:text-white transition-all duration-500 ease-in-out"><a>Luxury Real Estate Trends: What High-Net-Worth Buyers Want in 2025</a></li>
                  <li className="mb-3 px-3 py-3 shadow-lg rounded-lg hover:bg-red-600 hover:text-white transition-all duration-500 ease-in-out"><a>Gurgaon’s Top Housing Destinations for a Quality Lifestyle</a></li>
                  <li className="mb-3 px-3 py-3 shadow-lg rounded-lg hover:bg-red-600 hover:text-white transition-all duration-500 ease-in-out"><a>Green Living Redefined: The Future of Real Estate in India</a></li>
                  <li className="mb-3 px-3 py-3 shadow-lg rounded-lg hover:bg-red-600 hover:text-white transition-all duration-500 ease-in-out"><a>Over ₹3 Lakh Crore Investment in Recent Years: Gurugram’s Real Estate Boom</a></li>
                </ul>
              </div>
              <div className="shadow-md p-2 text-center rounded-lg mb-4 ml-7 max-sm:ml-0" style={{backgroundColor:"rgb(0,49,79)",position: "sticky", top: "60px", zIndex: "10"}}>
              <h4 className="text-xl text-white mb-3 text-center">
                Enquire Now
                </h4>
                <form id="contact-form">
                  <div className="space-y-4 px-2">
                    <div className="relative ">
                    <i className="fa-solid fa-user absolute left-3 top-1/2 transform -translate-y-1/2 text-black text-sm"></i>
                      <input
                        name="name"
                        onChange={handleBlogQueryChange}
                        value={blogQuery.name}
                        placeholder="Name *"
                        className="w-full pl-10 py-2 placeholder-black rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        type="text"
                      />
                    </div>
                   

                    <div className="relative">
                    <i className="fa-solid fa-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-black text-sm"></i>
                      <input
                        name="email"
                        value={blogQuery.email}
                        onChange={handleBlogQueryChange}
                        placeholder="Email *"
                        className="w-full py-2 pl-10 placeholder-black rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        type="email"
                      />
                    </div>

                    <div className="relative">
                      <i className="fa-solid fa-phone absolute left-3 top-1/2 transform -translate-y-1/2 text-black text-sm"></i>
                      <input
                        name="mobile"
                        value={blogQuery.mobile}
                        onChange={handleBlogQueryChange}
                        placeholder="Mobile *"
                        className="w-full py-2 pl-10 placeholder-black rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        type="number"
                      />
                    </div>

                    <div className="relative">
                    <i className="fa-solid fa-message absolute left-3 top-1/2 transform -translate-y-1/2 text-black text-sm"></i>
                      <input
                        name="message"
                        value={blogQuery.message}
                        onChange={handleBlogQueryChange}
                        placeholder="Message *"
                        className="w-full py-2 pl-10 placeholder-black rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>

                    <div className="form-group hidden">
                      <input
                        name="addresss"
                        id="address"
                        placeholder="Address *"
                        className="w-full p-2 placeholder-black rounded-md"
                        type="hidden"
                      />
                    </div>

                    {responseMessage && (
                      <p className="text-xs italic -mb-2 text-primaryRed">
                        {responseMessage}
                      </p>
                    )}

                    <div>
                      <button
                        className="w-full py-2 px-4 rounded-md bg-red-500 text-white flex items-center justify-center space-x-2 hover:bg-primaryRed focus:outline-none focus:ring-2 focus:ring-red-500"
                        onClick={handleBlogSubmitQueryData}
                      >
                        <span>{buttonText}</span>
                        <i className="arrow text-red-500" />
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div>
          </div>
              <div className="">
                {allupcomingProject.slice(0, 5).map((project, index) => {
                  return (
                    <Link
                      to={`/${project.project_url}`}
                      key={index}
                      className="block mb-4 rounded-lg"
                    >
                      <div className="flex items-center rounded-md shadow-lg bg-white">
                        <div className="flex flex-row h-[7rem] lg:w-[8rem] md:w-[5rem] sm:[6rem]  w-[6rem] overflow-hidden rounded-md flex-shrink-0">
                          <img
                            className="h-auto w-full object-fit"
                            src={project.frontImage.url}
                            alt={project.frontImage.url}
                          />
                        </div>
                        <div className="ml-3 w-64 ">
                          <p className="lg:text-sm md:text-xs text-lg mb-0 font-bold">
                            {project.projectName}
                          </p>
                          <p className="lg:text-xs md:text-xs sm:text-sm text-sm text-gray-400 mb-1">
                            {project.projectAddress}
                          </p>
                          <p className="lg:text-xs md:text-xs sm:text-sm text-sm text-gray-400 ">
                            {project.city},{project.state}
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default BlogView;