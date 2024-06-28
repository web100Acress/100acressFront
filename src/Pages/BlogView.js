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

  useEffect(() => {});

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
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default BlogView;
