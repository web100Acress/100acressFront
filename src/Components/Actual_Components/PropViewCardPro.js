import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { AiFillStar } from "react-icons/ai";
import { CiBookmark } from "react-icons/ci";
import { BsFillCameraFill } from "react-icons/bs";
import axios from "axios";

function PropViewCardPro() {
  const [rentData, setRentData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://api.100acress.com/property/viewAll"
        );
        setRentData(res.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log(rentData, "Updated data");
  }, [rentData]);

  return (
    <section className="flex flex-col items-center bg-white">
      <div className="mt-10 grid max-w-md grid-cols-1 gap-6 px-2 sm:max-w-lg sm:px-20 md:max-w-screen-xl md:grid-cols-2 md:px-10 lg:grid-cols-4 lg:gap-8">
        {rentData.map((item, index) => {
          return (
            <article
              key={index}
              className="mb-4 overflow-hidden rounded-xl border text-gray-700 shadow-md duration-500 ease-in-out hover:shadow-xl"
            >
              <div>
                <img
                  src={item.frontImage.url}
                  alt=""
                  className="w-full h-48 object-fit"
                />
              </div>
              <div className="p-4">
                <div className="pb-6">
                <a className="text-lg font-semibold hover:text-red-600  duration-500 ease-in-out">
                    {item.projectName}
                  </a>
                  <br/>
                  <a className="text-sm hover:text-red-600  duration-500 ease-in-out">
                    {item.address}
                  </a>
                </div>
                <ul className="box-border flex list-none items-center border-t border-b border-solid border-gray-200 px-0 py-6">
                  <li className="mr-4 flex items-center text-left">
                    {/* <i className="mr-2 text-2xl text-green-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        className="h-5 w-5"
                        preserveAspectRatio="xMidYMid meet"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M10.38 13.08A1 1 0 0 0 10 13H6a1 1 0 0 0 0 2h1.59l-5.3 5.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0L9 16.41V18a1 1 0 0 0 2 0v-4a1 1 0 0 0-.08-.38a1 1 0 0 0-.54-.54ZM10 5a1 1 0 0 0-1 1v1.59l-5.29-5.3a1 1 0 0 0-1.42 1.42L7.59 9H6a1 1 0 0 0 0 2h4a1 1 0 0 0 .38-.08a1 1 0 0 0 .54-.54A1 1 0 0 0 11 10V6a1 1 0 0 0-1-1Zm3.62 5.92A1 1 0 0 0 14 11h4a1 1 0 0 0 0-2h-1.59l5.3-5.29a1 1 0 1 0-1.42-1.42L15 7.59V6a1 1 0 0 0-2 0v4a1 1 0 0 0 .08.38a1 1 0 0 0 .54.54ZM16.41 15H18a1 1 0 0 0 0-2h-4a1 1 0 0 0-.38.08a1 1 0 0 0-.54.54A1 1 0 0 0 13 14v4a1 1 0 0 0 2 0v-1.59l5.29 5.3a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42Z"
                        />
                      </svg>
                    </i> */}
                    <li className="text-left">
                    <span className="text-sm text-gray-400">{item.builtYear}</span>
                    <p className="m-0 text-base font-medium">{item.type}</p>
                  </li>
                  </li>
                  {/* <li className="mr-4 flex items-center text-left">
                    <i className="mr-2 text-2xl text-green-600">
                     
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        className="h-5 w-5"
                        preserveAspectRatio="xMidYMid meet"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M22 12c0-1.1-.9-2-2-2V7c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v3c-1.1 0-2 .9-2 2v5h1.33L4 19h1l.67-2h12.67l.66 2h1l.67-2H22v-5zm-4-2h-5V7h5v3zM6 7h5v3H6V7zm-2 5h16v3H4v-3z"
                        />
                      </svg>
                    </i>
                    <span className="text-sm">4 Beds</span>
                  </li>
                  <li className="flex items-center text-left">
                    <i className="mr-2 text-2xl text-green-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        className="h-5 w-5"
                        preserveAspectRatio="xMidYMid meet"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M21 10H7V7c0-1.103.897-2 2-2s2 .897 2 2h2c0-2.206-1.794-4-4-4S5 4.794 5 7v3H3a1 1 0 0 0-1 1v2c0 2.606 1.674 4.823 4 5.65V22h2v-3h8v3h2v-3.35c2.326-.827 4-3.044 4-5.65v-2a1 1 0 0 0-1-1zm-1 3c0 2.206-1.794 4-4 4H8c-2.206 0-4-1.794-4-4v-1h16v1z"
                        />
                      </svg>
                    </i>
                    <span className="text-sm">4 Baths</span>
                  </li> */}
                </ul>
                <ul className="m-0 flex list-none items-center justify-between px-0 pt-6 pb-0">
                  <li className="text-left">
                    <span className="text-sm font-extrabold text-black">Price: {item.price}</span>
                    {/* <p className="m-0 text-base font-medium"></p> */}
                  </li>
                  <li className="text-left">
                  <button type="button" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-2 py-2  text-center me-2 mb-2">View Details</button>
                    {/* <ul className="m-0 flex items-center p-0 font-medium">
                      <li className="inline text-yellow-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </li>
                      <li className="inline text-yellow-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </li>
                      <li className="inline text-yellow-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </li>
                      <li className="inline text-yellow-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </li>
                      <li className="inline text-yellow-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                          />
                        </svg>
                      </li>
                      <li className="ml-2 inline text-base">5.0(30)</li>
                    </ul> */}
                  </li>
                </ul>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default PropViewCardPro;

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  .ft-cl-g2 {
    color: #383838;
  }
  .ft-cl-gr {
    color: #8b8686;
  }
  .ft-sz-15 {
    font-size: 15px;
  }
  .ft-sz-14 {
    font-size: 14px;
  }
  .ft-sz-13 {
    font-size: 13px;
  }
  .ft-sz-12 {
    font-size: 12px;
  }
  .ft-sz-11 {
    font-size: 11px;
  }
  .ft-sz-10 {
    font-size: 10px;
  }
  .ft-sz-9 {
    font-size: 9px;
  }
  .ft-sz-8 {
    font-size: 8px;
  }
  .bc-rd-15-top {
    border-radius: 15px 15px 0px 0px;
  }
  .bc-rd-23 {
    border-radius: 23px;
  }
  .bc-rd-15 {
    border-radius: 15px;
  }
  .mainFrame {
    width: 811px;
    height: auto;
    background: white;
    box-shadow: 0 0 30px 0 #0000001a;
    padding: 21px 23px 15px 23px;
  }
  .ftred {
    background: #f3c9c9;
    height: 21px;
  }
  .vrfied {
    background: #9eea83;
    width: max-content;
  }
  .fedLLC {
    background-color: #c9f3ee;
  }
  .imgLJR {
    height: auto;
    background: #8b8686;
    width: max-content;
  }
  .vrfied {
    height: 29px;
  }
  .contentsJm {
  }
  .imgeProp {
    width: 242px;
    height: 210px;
    background-color: #c9f3ee;
  }
  .bhClef {
    width: 100%;
    height: 35px;
    background: #c9f3ee;
  }
  .BhCle {
    width: 150px;
    height: auto;
    background: #f8f8f8;
  }
  .cbIlMb {
    background-color: #d9d9d9;
    color: white;
  }
  .sfzzZ {
    background-color: #56a1fa;
    color: white;
  }
  .fedhfmk {
    margin-top: 1rem;
  }
`;
