import React from "react";
import Nav from "../aadharhomes/Nav";
import Footer from "../Components/Actual_Components/Footer";
import { IoMdArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import Navbar from "../aadharhomes/Navbar";
const PageNotFound = () => {
  return (
    <>
     <Navbar/>
      <div className="mb-4 w-full mx-auto">
        <div className=" flex items-center justify-center ">
          <img src="../../Images/errorimage.jpg" className="h-80 w-[50rem]" />
        </div>
        <div className="flex items-center justify-center">
          <div className=" inline-block ">
            <p className=" text-5xl text-black pl-8">We're Sorry !</p>
            <p className="  text-3xl text-black">
              This page will not Found
            </p>

            <div className="mt-4 flex items-center justify-center">
              <Link to="/">
                <button className="flex px-3 py-2 text-white bg-black hover:text-gray-400 rounded-md">
                  <div className="flex">
                    <IoMdArrowBack className="h-5 w-5 mr-2" />{" "}
                   Back To Home
                  </div>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PageNotFound;