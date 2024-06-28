import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../Components/Actual_Components/Footer";
import Nav from "../aadharhomes/Nav";
import { DataContext } from "../MyContext";
import { Helmet } from "react-helmet";
const Blogging = () => {
  const { blogData } = useContext(DataContext);

  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <>
      <Nav />

      <Helmet>
        <meta
          name="description"
          content="Discover the latest insights, tips, and Expert guidance on real estate trends, investment strategies, and property management on our blog at 100acress.com. Stay informed!"
        />
        <title>Blog | Expert Guidance on Real Estate | 100acress.com</title>
        <link rel="canonical" href="https://www.100acress.com/blog/" />
      </Helmet>

      <div class="">
        <p class="mt-4 lg:mt-10 text-3xl text-center font-bold sm:text-4xl xl:text-5xl">
          Blog
        </p>
      </div>

      <section className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 gap-16 mx-4">
        {" "}
        {blogData.slice(0, 4).map((item, index) => {
          const blogTitle = item.blog_Title;
          return (
            <div
              key={index}
              className="flex border border-gray-100 flex-col rounded-lg bg-white text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white md:max-w-xl md:flex-row"
            >
              <img
                className="h-96 w-full rounded-t-lg object-fit md:h-auto md:w-48 md:!rounded-none md:!rounded-s-lg"
                src={item.blog_Image.url}
                alt="blog"
              />
              <div className="flex flex-col justify-start p-2">
                <h5 className="mb-2 text-xl font-semibold">
                  {item.blog_Title}
                </h5>

                <Link
                  to={`/blog/${blogTitle.replace(/\s+/g, "-").toLowerCase()}/${
                    item._id
                  }`}
                >
                  <button
                    type="button"
                    class="text-white bg-gradient-to-r from-red-400 via-red-500 font-semibold to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800  rounded-lg text-sm px-3 py-2 text-center me-2 mb-2"
                  >
                    Read more
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
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
                      <Link className="">{item.blog_Title}</Link>
                    </h2>
                    <div>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: showFullDescription
                            ? item.blog_Description
                            : `${item.blog_Description
                                .split(" ")
                                .slice(0, 10)
                                .join(" ")}...`,
                        }}
                      ></div>

                      <div>
                        {item.blog_Description.split(" ").length > 10 && (
                          <button
                            onClick={toggleDescription}
                            className="font-semibold bg-red-600 text-white  px-2 rounded-lg"
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
