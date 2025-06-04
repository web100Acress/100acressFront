import React, {useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../Components/Actual_Components/Footer";
import { PaginationControls } from "../Components/Blog_Components/BlogManagement";
import { Helmet } from "react-helmet";
import Free from "./Free";
import axios from "axios";

const Blogging = () => {
  // const { blogData } = useContext(DataContext);
  const [blogData, setBlogData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(12); 
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => { 
  const fetchBlogData = async () => {
    try {
      const res = await axios.get(`https://api.100acress.com/blog/view?page=${currentPage}&limit=${postsPerPage}`);
      setBlogData(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.log(error || error.message);
    }
  }
  fetchBlogData();
}, [currentPage, postsPerPage]);
  

  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="Discover the latest insights, tips, and Expert guidance on real estate trends, investment strategies, and property management on our blog at 100acress.com. Stay informed!"
        />
        <title>Blog | Expert Guidance on Real Estate | 100acress.com</title>
        <link rel="canonical" href="https://www.100acress.com/blog/" />
      </Helmet>

      <div className="mt-16">
        <p class="my-8 lg:mt-10 text-3xl text-center text-red-600 font-medium sm:text-4xl xl:text-5xl">
          100acress Blog
        </p>
      </div>

      <div className="w-full px-4 sm:px-10">
        <div className="w-full grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-6">
          {blogData.map((item, index) => {
            const blogTitle = item.blog_Title;
            return (
              <article
                key={index}
                className="transition duration-300 ease-in-out transform shadow-lg hover:scale-105 hover:shadow-md border-[1px] items-center gap-2 md:flex-row lg:gap-4 rounded-lg overflow-hidden"
              >
                {/* Circular Image */}
                <span className="h-24 w-24 lg:h-32 lg:w-32 overflow-hidden flex-shrink-0">
                  {item.blog_Image && (
                    <img
                      src={item.blog_Image.url}
                      loading="lazy"
                      alt="blogImage"
                      className="h-60 w-full p-3 object-cover rounded-3xl"
                    />
                  )}
                </span>

                {/* Blog Content */}
                <div className="flex flex-col justify-center lg:p-2 md:p-0 p-0 w-full">
                  <p className="text-black mb-2 px-3 font-semibold border-b-1">
                    <span className="transition text-center hover:text-red-600 text-sm sm:text-base md:text-sm lg:text-sm xl:text-lg duration-500 ease-in-out">
                      {blogTitle}
                    </span>
                  </p>

                  {/* "Read More" Button after the description */}
                  <div className="flex justify-end">
                    <Link
                      to={`/blog/${blogTitle
                        .replace(/\s+/g, "-")
                        .replace(/[?!,\.;:\{\}\(\)\$\@]+/g, '')
                        .toLowerCase()}/${item._id}`}
                    >
                      <button className="bg-red-600 text-white mr-2 px-4 py-1 my-2 rounded-md mt-1">
                        Read More
                      </button>
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
      <div className="flex justify-center items-center">
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </div>
      <Free />
      <Footer />
    </>
  );
};

export default Blogging;
