import React, { useContext, useEffect, useState } from "react";
import Nav from "../aadharhomes/Nav";
import Footer from "../Components/Actual_Components/Footer";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { DataContext } from "../MyContext";
import { Helmet } from "react-helmet";
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
      const res = await axios.post(
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
      <Nav />
      <Helmet>
        <title>{`${blog_Title} ${blog_Category}`}</title>
        <link rel="canonical" href="https://www.100acress.com/" />
      </Helmet>

      <div className="flex flex-col">
        <div className="bg-white py-8">
          <div className="px-4 flex flex-col md:flex-row">
            <div className="w-full md:w-[70%] px-4">
              <img
                src={blog_Image && blog_Image.url}
                alt="Blog"
                className="mb-2"
              />
              <div className="prose max-w-none">
                <p className="text-2xl font-semibold">{blog_Title}</p>
                <p className="text-lg text-red-700 mb-0">{blog_Category}</p>
                <p
                  className="text-justify"
                  dangerouslySetInnerHTML={{ __html: blog_Description }}
                ></p>
              </div>
            </div>

            <div className="w-full md:w-[30%] px-2 ">
             

              <div className="shadow-xl p-2 rounded-lg mb-4" style={{backgroundColor:"rgb(0,49,79)"}}>
                <h4 className="text-xl text-white mb-3 text-center ">
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
                      <p className="text-xs italic -mb-2 text-red-600">
                        {responseMessage}
                      </p>
                    )}

                    <div>
                      <button
                        className="w-full py-2 px-4 rounded-md bg-red-500 text-white flex items-center justify-center space-x-2 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
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
                <p className="text-xl xl:text-2xl lg:text-lg md:text-sm sm:text-3xl text-bold text-red-600">Trending Projects in Gurugram</p></div>
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