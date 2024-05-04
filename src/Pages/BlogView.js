import React, { useEffect, useState } from "react";
import Nav from "../aadharhomes/Nav";
import Footer from "../Components/Actual_Components/Footer";
import { useParams } from "react-router-dom";
import axios from "axios";

const BlogView = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const fetchData = async () => {
    try {
      const res = await axios.get(`https://api.100acress.com/blog/view/${id}`);
      setData(res.data.data);
      console.log(res, "dsdsdsdsds");
    } catch (error) {
      console.log(error || error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
 
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
      <Nav />
      <div className="py-10 overflow-x-hidden">
        <section className="w-screen flex flex-col sm:flex-row justify-center items-center overflow-hidden">
          <div className="grid w-70 h-50 max-w-screen-lg grid-cols-1 p-2 gap-5 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 lg:gap-10">
            <article className="overflow-hidden rounded-lg border-2 border-gray-200 border-opacity-60 shadow-lg">
              <img
                className="w-full transform object-fit object-center md:h-52 lg:h-80"
                src={blog_Image && blog_Image.url}
                alt="blog"
              />
              <h2 className="title-font inline-block cursor-pointer px-6 pt-4 pb-1 text-xs font-semibold uppercase tracking-widest text-orange-600 hover:font-bold">
                {blog_Title}
              </h2>
              <div className="py-1 px-6">
                <h1 className="title-font mb-3 inline-block cursor-pointer text-xl capitali font-extrabold tracking-wide text-gray-800">
                  {blog_Category}
                </h1>
                <p className="line-clamp-6 mb-3 cursor-pointer overflow-hidden leading-relaxed text-gray-500">
                <div dangerouslySetInnerHTML={{ __html: blog_Description  }}>
                      </div>
                </p>
              </div>
            </article>
          </div>
          <div className="w-30 h-full w-64 justify-center items-center hidden md:block">
            <a className="block mb-4 rounded-lg p-2" href="#">
              <div className="flex items-center rounded-md border border-gray-100 bg-white px-4 py-3 shadow-lg">
                <img
                  className="h-10 w-10 rounded-full object-cover"
                  src="https://images.unsplash.com/photo-1476362555312-ab9e108a0b7e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  alt="Simon Lewis"
                />
                <div className="ml-4 w-56">
                  <p className="text-lg mb-0 font-medium">Simon Lewis</p>
                  <p className="text-xs text-gray-400">
                    Published 12 Bestsellers
                  </p>
                  <div>
                    <button className="font-semibold bg-red-600 text-white py-1 px-2 rounded-lg ">
                      Read more
                    </button>
                  </div>
                </div>
              </div>
            </a>
            <a className="block mb-4 rounded-lg  p-2" href="#">
              <div className="flex items-center rounded-md border border-gray-100 bg-white px-4 py-3 shadow-lg">
                <img
                  className="h-10 w-10 rounded-full object-cover"
                  src="https://images.unsplash.com/photo-1476362555312-ab9e108a0b7e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  alt="Simon Lewis"
                />
                <div className="ml-4 w-56">
                  <p className="text-lg mb-0 font-medium">Simon Lewis</p>
                  <p className="text-xs text-gray-400">
                    Published 12 Bestsellers
                  </p>
                  <div>
                    <button className="font-semibold bg-red-600 text-white py-1 px-2 rounded-lg ">
                      Read more
                    </button>
                  </div>
                </div>
              </div>
            </a>
            <a className="block mb-4 rounded-lg p-2" href="#">
              <div className="flex items-center rounded-md border border-gray-100 bg-white px-4 py-3 shadow-lg">
                <img
                  className="h-10 w-10 rounded-full object-cover"
                  src="https://images.unsplash.com/photo-1476362555312-ab9e108a0b7e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  alt="Simon Lewis"
                />
                <div className="ml-4 w-56">
                  <p className="text-lg mb-0 font-medium">Simon Lewis</p>
                  <p className="text-xs text-gray-400">
                    Published 12 Bestsellers
                  </p>
                  <div>
                    <button className="font-semibold bg-red-600 text-white py-1 px-2 rounded-lg ">
                      Read more
                    </button>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default BlogView;
