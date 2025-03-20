import React from "react";
import Footer from "../Components/Actual_Components/Footer";
import { Outlet } from "react-router-dom";
export default function SignUp() {
  return (
    <>
      <div className="bg-[url('https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/banner/mainbgg.webp')] min-h-[90vh] mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mx-5">
          <div className="">
            <div className="w-1/2 my-5">
            </div>
            <div className="mt-10 lg:mt-48">
              <div className="text-white text-5xl font-Gluten max-lg:mt-6">
                Let’s find a Home that’s perfect for You.
              </div>
              <div className="text-base text-white max-lg:text-xl max-lg:mt-6">
                We’re India's most trust worthy real estate Dealer and we are
                looking for amazing investors and buyers just like you! Become a
                part of our team and skyrocket your life!
              </div>
            </div>
          </div>
          <div className="">
            <Outlet />
          </div>
        </div>
      </div>
      <Footer className="max-lg:mt-85" />
    </>
  );
}
