import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../Components/Actual_Components/Footer";
import Nav from "../aadharhomes/Nav";
import { DataContext } from "../MyContext";
const Blogging = () => {
  const { blogData } = useContext(DataContext);

  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <>
      <Nav />
      <div class="">
        <p class="mt-4 lg:mt-10 text-3xl text-center font-bold sm:text-4xl xl:text-5xl">
          Blog
        </p>
      </div>

      <section className="bg-white py-6 sm:py-8 lg:py-10">
        <div className="mx-auto max-w-screen-xl px-4 md:px-8">
          <div className="grid gap-8 sm:grid-cols-2 sm:gap-12 lg:grid-cols-2 xl:grid-cols-2 xl:gap-16">
            {blogData.slice(0, 4).map((item, index) => {
              return (
                <article
                  key={index}
                  className="flex flex-col items-center gap-4 md:flex-row lg:gap-6"
                >
                  <Link className="group relative block h-56 w-full shrink-0 self-start overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-24 md:w-24 lg:h-40 lg:w-40">
                    <img
                      src={item.blog_Image.url}
                      loading="lazy"
                      alt="blogImage"
                      className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                    />
                  </Link>

                  <div className="flex flex-col gap-2">
                    <h2 className="text-xl font-bold text-red-600">
                      <Link href="#" className="">
                        {item.blog_Title}
                      </Link>
                    </h2>
                    {/* <p className="text-gray-500 text-justify">{item.blog_Description}</p>
                    <div>
                      <Link
                        to={`/blog/${item._id}`}
                        target="_top"
                        className="font-semibold bg-red-600 text-white py-1 px-2 rounded-lg "
                      >
                        Read more
                      </Link>
                    </div> */}
                    <div>
                      <p className="text-gray-500 text-justify">
                        {showFullDescription
                          ? item.blog_Description
                          : `${item.blog_Description
                              .split(" ")
                              .slice(0, 20)
                              .join(" ")}...`}
                      </p>
                      <div>
                        {item.blog_Description.split(" ").length > 20 && (
                          <button
                            onClick={toggleDescription}
                            className="font-semibold bg-red-600 text-white py-1 px-2 rounded-lg"
                          >
                            <Link
                              to={`/blog/${item._id}`}
                              target="_top"
                              className="text-white"
                            >
                              Read More
                            </Link>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <div className="mx-4 sm:mx-10 max-w-screen-xl pt-4 text-center">
        <img
          className="sm:h-96 w-full object-cover my-4"
          src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt="Featured Image"
          style={{
            width: "100%",
            maxWidth: "1440px",
            height: "auto",
            maxHeight: "2560px",
          }}
        />
      </div>

      <section className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-xl px-4 md:px-8">
          <div className="grid gap-8 sm:grid-cols-2 sm:gap-12 lg:grid-cols-2 xl:grid-cols-2 xl:gap-16">
            {blogData.slice(4).map((item, index) => {
              return (
                <article
                  key={index}
                  className="flex flex-col items-center gap-4 md:flex-row lg:gap-6"
                >
                  <Link className="group relative block h-56 w-full shrink-0 self-start overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-24 md:w-24 lg:h-40 lg:w-40">
                    <img
                      src={item.blog_Image.url}
                      loading="lazy"
                      alt="blogImage"
                      className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                    />
                  </Link>

                  <div className="flex flex-col gap-2">
                    <h2 className="text-xl font-bold text-red-600">
                      <Link href="#" className="">
                        {item.blog_Title}
                      </Link>
                    </h2>
                    {/* <p className="text-gray-500 text-justify">{item.blog_Description}</p>
                    <div>
                      <Link
                        to={`/blog/${item._id}`}
                        target="_top"
                        className="font-semibold bg-red-600 text-white py-1 px-2 rounded-lg "
                      >
                        Read more
                      </Link>
                    </div> */}
                    <div>
                      <p className="text-gray-500 text-justify">
                        {showFullDescription
                          ? item.blog_Description
                          : `${item.blog_Description
                              .split(" ")
                              .slice(0, 20)
                              .join(" ")}...`}
                      </p>
                      <div>
                        {item.blog_Description.split(" ").length > 20 && (
                          <button
                            onClick={toggleDescription}
                            className="font-semibold bg-red-600 text-white py-1 px-2 rounded-lg"
                          >
                            <Link
                              to={`/blog/${item._id}`}
                              target="_top"
                              className="text-white"
                            >
                              Read More
                            </Link>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Blogging;
