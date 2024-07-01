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
  const [buttonText, setButtonText] = useState('Submit');
  const [responseMessage, setResponseMessage] = useState('');
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
      alert("Please fill out all fields.");
      return;
    }

    setButtonText('Submitting...');
    try {
      const res = await axios.post(
        "https://api.100acress.com/contact_Insert",
        blogQuery
      );
      setResponseMessage('Data submitted successfully');
      resetData();
      setButtonText('Submit');
    } catch (error) {
      if (error.response) {
        console.error("Server error:", error.response.data);
      } else if (error.request) {
        console.error("Request error:", error.request);
      } else {
        console.error("Error:", error.message);
      }
      setButtonText('Submit');
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
            <div className="w-full md:w-3/4 px-4">
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

            <div className="w-full md:w-1/4 px-2">
              <div>
                {allupcomingProject.slice(0, 5).map((project, index) => {
                  return (
                    <Link
                      to={`/${project.project_url}`}
                      key={index}
                      className="block mb-4 rounded-lg"
                    >
                      <div className="flex items-center rounded-md border border-gray-100 bg-white">
                        <div className="h-20 w-20 overflow-hidden rounded-md flex-shrink-0">
                          <img
                            className="h-full w-full object-cover"
                            src={project.frontImage.url}
                            alt={project.frontImage.url}
                          />
                        </div>
                        <div className="ml-4 w-64">
                          <p className="text-lg mb-0 font-medium">
                            {project.projectName}
                          </p>
                          <p className="text-xs text-gray-400">
                            {project.projectAddress}
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>

              <div className="article-comment">
                <h4 className="text-lg  text-red-500 m-0">Contact Us </h4>
                <form id="contact-form">
                  <div className="row pt-3">
                    <div className="widget widget-tags">
                      <div className="widget-body">
                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-group">
                              <input
                                name="name"
                                onChange={handleBlogQueryChange}
                                value={blogQuery.name}
                                placeholder="Name *"
                                className="form-control"
                                type="text"
                              />
                            </div>
                          </div>
                          <div className="col-md-12 pt-2">
                            <div className="form-group">
                              <input
                                name="email"
                                value={blogQuery.email}
                                onChange={handleBlogQueryChange}
                                placeholder="Email *"
                                className="form-control"
                                type="email"
                              />
                            </div>
                          </div>

                          <div className="col-md-12 pt-2">
                            <div className="form-group">
                              <input
                                name="mobile"
                                value={blogQuery.mobile}
                                onChange={handleBlogQueryChange}
                                placeholder="Mobile *"
                                className="form-control"
                                type="number"
                              />
                            </div>
                          </div>

                          <div className="col-md-12 pt-2 ">
                            <div className="form-group">
                              <input
                                name="message"
                                value={blogQuery.message}
                                onChange={handleBlogQueryChange}
                                placeholder="Message *"
                                className="form-control"
                              />
                            </div>
                          </div>

                          <div className="col-md-12 pt-2  ">
                            <div className="form-group">
                              <input
                                name="addresss"
                                id="address"
                                placeholder="Address *"
                                className="form-control"
                                type="hidden"
                              />
                            </div>
                          </div>
                          {responseMessage && <p className="text-[12px] mb-0 text-red-600">{responseMessage}</p>}
                          <div className="col-md-12 pt-2">
                            <button
                              className="px-btn theme px-2 py-1 rounded-md bg-red-500 text-red-500"
                              onClick={handleBlogSubmitQueryData}
                            >
                              <span className="text-white">{buttonText}</span>{" "}
                              <i className="arrow text-red-500" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
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
