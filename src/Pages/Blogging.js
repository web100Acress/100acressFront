// import React, { useContext, useState } from "react";
// import { Link } from "react-router-dom";
// import Footer from "../Components/Actual_Components/Footer";
// import Nav from "../aadharhomes/Nav";
// import { DataContext } from "../MyContext";
// import { Helmet } from "react-helmet";
// import Navbar from "../aadharhomes/Navbar";
// const Blogging = () => {
//   const { blogData } = useContext(DataContext);

//   const [showFullDescription, setShowFullDescription] = useState(false);
//   const toggleDescription = () => {
//     setShowFullDescription(!showFullDescription);
//   };

//   return (
//     <>
//       <Navbar/>
//       <Helmet>
//         <meta
//           name="description"
//           content="Discover the latest insights, tips, and Expert guidance on real estate trends, investment strategies, and property management on our blog at 100acress.com. Stay informed!"
//         />
//         <title>Blog | Expert Guidance on Real Estate | 100acress.com</title>
//         <link rel="canonical" href="https://www.100acress.com/blog/" />
//       </Helmet>

//       <div class="">
//         <p class="my-8 lg:mt-10 text-3xl text-center text-red-600 font-bold sm:text-4xl xl:text-5xl">
//           100acress Blog
//         </p>
//       </div>

//       <div className="w-full px-4 sm:px-10">
//         <div className="w-full grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4">
//           {blogData.slice(0, 4).map((item, index) => {
//             const blogTitle = item.blog_Title;
//             return (
//               <div
//                 key={index}
//                 className="flex flex-col sm:flex-row shadow-lg rounded-md overflow-hidden "
//               >
//                 <div className="w-full sm:w-1/2 h-52 relative">
//                   <img
//                     src={item.blog_Image.url}
//                     alt="blogImage"
//                     className="absolute inset-0 w-full h-full p-4 object-fit"
//                   />
//                 </div>
//                 <div className="w-full sm:w-1/2 p-4 flex flex-col justify-between ">
//                   <p className="lg:text-lg md:text-md sm:text-md text-md  mb-2">
//                     {blogTitle}
//                   </p>
//                   <Link
//                     to={`/blog/${blogTitle
//                       .replace(/\s+/g, "-")
//                       .toLowerCase()}/${item._id}`}
//                   >
//                     <button className="bg-red-600 text-white px-2 py-1 rounded-md self-start">
//                       Read More
//                     </button>
//                   </Link>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       <div className="mx-4 sm:mx-10 lg:mx-20 max-w-screen-2xl pt-4 text-center">
//         <img
//           className="w-full h-auto max-h-96  my-4"
//           src="../../Images/blog.avif"
//           alt="Featured Image"
//         />
//       </div>
//       <section className="bg-white py-6 sm:py-8 lg:py-12">
//         <div className="mx-auto max-w-screen-xl px-4 md:px-8">
//           <div className="grid gap-8 sm:grid-cols-2 sm:gap-12 lg:grid-cols-2 xl:grid-cols-2 xl:gap-16">
//             {blogData.slice(4).map((item, index) => {
//               return (
//                 <article
//                   key={index}
//                   className="flex flex-col items-center gap-4 md:flex-row lg:gap-6"
//                 >
//                   <Link className="group relative block h-56 w-full shrink-0 self-start overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-24 md:w-24 lg:h-40 lg:w-40">
//                     <img
//                       src={item.blog_Image.url}
//                       loading="lazy"
//                       alt="blogImage"
//                       className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
//                     />
//                   </Link>

//                   <div className="flex flex-col gap-2">
//                     <h2 className="text-xl text-red-600">
//                       <Link className="">{item.blog_Title}</Link>
//                     </h2>
//                     <div>
//                       <div
//                         dangerouslySetInnerHTML={{
//                           __html: showFullDescription
//                             ? item.blog_Description
//                             : `${item.blog_Description
//                                 .split(" ")
//                                 .slice(0, 10)
//                                 .join(" ")}...`,
//                         }}
//                       ></div>
//                       <div>
//                         {item.blog_Description.split(" ").length > 10 && (
//                           <button
//                             onClick={toggleDescription}
//                             className="font-semibold bg-red-600 text-white  px-2 rounded-lg"
//                           >
//                             <Link
//                               to={`/blog/${item._id}`}
//                               target="_top"
//                               className="text-white"
//                             >
//                               Read More
//                             </Link>
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </article>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       <Footer />
//     </>
//   );
// };

// export default Blogging;

import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../Components/Actual_Components/Footer";
import Nav from "../aadharhomes/Nav";
import { DataContext } from "../MyContext";
import { Helmet } from "react-helmet";
import Free from "./Free";
import Navbar from "../aadharhomes/Navbar";
const Blogging = () => {
  const { blogData } = useContext(DataContext);

  const [showFullDescription, setShowFullDescription] = useState(false);
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <>
      <Navbar />
      <Helmet>
        <meta
          name="description"
          content="Discover the latest insights, tips, and Expert guidance on real estate trends, investment strategies, and property management on our blog at 100acress.com. Stay informed!"
        />
        <title>Blog | Expert Guidance on Real Estate | 100acress.com</title>
        <link rel="canonical" href="https://www.100acress.com/blog/" />
      </Helmet>

      <div class="">
        <p class="my-8 lg:mt-10 text-3xl text-center text-red-600 font-medium sm:text-4xl xl:text-5xl">
          100acress Blog
        </p>
      </div>

      <div className="w-full px-4 sm:px-10">
        <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
          {blogData.slice(0, 6).map((item, index) => {
            const blogTitle = item.blog_Title;
            return (
              <article
                key={index}
                className="transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-md flex flex-col border-[1px] items-center gap-2 md:flex-row lg:gap-4 rounded-lg overflow-hidden"
              >
                {/* Circular Image */}
                <span className="relative block h-24 w-24 lg:h-32 lg:w-32 overflow-hidden rounded-full flex-shrink-0">
                  {item.blog_Image && (
                    <img
                      src={item.blog_Image.url}
                      loading="lazy"
                      alt="blogImage"
                      className="h-full w-full p-2 object-cover rounded-full"
                    />
                  )}
                </span>

                {/* Blog Content */}
                <div className="flex flex-col justify-center lg:p-2 md:p-0 p-0 w-full">
                  <p className="text-black mb-2">
                    <span className="transition text-center hover:text-red-600 text-sm sm:text-base md:text-sm lg:text-sm xl:text-lg duration-500 ease-in-out">
                      {blogTitle}
                    </span>
                  </p>

                  {/* "Read More" Button after the description */}
                  <div className="flex justify-end">
                    <Link
                      to={`/blog/${blogTitle
                        .replace(/\s+/g, "-")
                        .toLowerCase()}/${item._id}`}
                    >
                      <button className="bg-red-600 text-white mr-2 px-3 py-1 rounded-md mt-1">
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

      {/* <div className="mx-4 sm:mx-10 lg:mx-20 max-w-screen-2xl pt-4 text-center">
        <img
          className="w-full h-72 object-cover my-4"
          src="../../Images/blogpage.png"
          alt="Featured Image"
        />
      </div>  */}
      <Free />
      <div className="w-full px-4 sm:px-10">
        <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
          {blogData.slice(6).map((item, index) => {
            const blogTitle = item.blog_Title;
            return (
              <article
                key={index}
                className="transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-md flex flex-col border-[1px] items-center gap-2 md:flex-row lg:gap-4 rounded-lg overflow-hidden"
              >
                {/* Circular Image */}
                <span className="relative block h-24 w-24 lg:h-32 lg:w-32 overflow-hidden rounded-full flex-shrink-0">
                  {item.blog_Image && (
                    <img
                      src={item.blog_Image.url}
                      loading="lazy"
                      alt="blogImage"
                      className="h-full w-full p-2 object-cover rounded-full"
                    />
                  )}
                </span>

                {/* Blog Content */}
                <div className="flex flex-col justify-center lg:p-2 md:p-0 p-0 w-full">
                  <p className="text-black mb-2">
                    <span className="transition text-center hover:text-red-600 text-sm sm:text-base md:text-sm lg:text-sm xl:text-lg duration-500 ease-in-out">
                      {blogTitle}
                    </span>
                  </p>

                  {/* "Read More" Button after the description */}
                  <div className="flex justify-end">
                    <Link
                      to={`/blog/${blogTitle
                        .replace(/\s+/g, "-")
                        .toLowerCase()}/${item._id}`}
                    >
                      <button className="bg-red-600 text-white mr-2 px-3 py-1 rounded-md mt-1">
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

      <Footer />
    </>
  );
};

export default Blogging;
