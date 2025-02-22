import React from "react";
import BlogSection from "./BlogSection";
import BlogSectionMain from "./BlogSectionMain";
import BlogSection3 from "./BlogSection3";
import Nav from "../../aadharhomes/Nav";
import Header from "../../AdminPage/Header";
import Footer from "../Actual_Components/Footer";

function BlogMain() {
  return (
    <>
    <Nav/>
      <BlogSectionMain />
      <BlogSection />
      {/* <BlogSection3 /> */}
    <Footer/>
    </>
  );
}

export default BlogMain;
