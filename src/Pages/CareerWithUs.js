import React, { useEffect, useState } from "react";
import Nav from "../aadharhomes/Nav";
import Footer from "../Components/Actual_Components/Footer";
import { Link } from "react-router-dom";
import { DiCssTricks } from "react-icons/di";
import { RiBankCardFill } from "react-icons/ri";
import { GrCloud } from "react-icons/gr";
import { GrCommand } from "react-icons/gr";
import { RiAdminFill } from "react-icons/ri";
import axios from "axios";
import { FaFacebook, FaLinkedin } from "react-icons/fa";

const CareerWithUs = () => {
  const [viewCareer, setViewCareer] = useState([]);
  const [showform, setShowForm] = useState(false);
  const { activityImage = [], highlightImage } = viewCareer;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://api.100acress.com/career/page/view`
        );
        setViewCareer(res.data.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {}, [viewCareer]);
  return (
    <div style={{ overflowX: "hidden" }}>
      <Nav />
      <div className="overflow-x-hidden">
        <section className="relative">
          <div class="w-full">
            <img
              src="../../Images/career.png"
              alt="contact Us"
              class="w-full h-60 sm:h-30 object-fit large-screen-image hidden sm:block"
            />
            <img
              src="../../Images/careermobile.png"
              alt="contact Us"
              class="w-full h-60 sm:h-30 object-fit small-screen-image block sm:hidden"
            />
          </div>
        </section>
        <div className="m-2 lg:m-10 md:m-8 sm:m-4 xs:m-2">
          <div className="flex items-center justify-center text-center">
            <div className="flex flex-wrap justify-center max-w-7xl">
              <div className="flex p-2 m-2">
                <div className="flex-col-xl px-6 py-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {activityImage &&
                      Array.isArray(activityImage) &&
                      activityImage.length > 0 &&
                      activityImage.map((item, index) => (
                        <div
                          key={index}
                          className="mr-2 sm:mr-1 md:mr-2 lg:mr-4 xl:mr-6"
                        >
                          <img
                            className="w-full h-full object-fit rounded-xl"
                            src={item.url}
                            alt={`Image-${index}`}
                          />
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <p className="text-xl lg:text-3xl md:text-2xl sm:text-xl xs:text-xl text-red-600 text-left px-6 lg:px-16 md:px-8 sm:px-6 xs:px-4 mt-2">
            WHY 100ACRESS
          </p>
          <p className="px-6 lg:px-14 md:px-8 sm:px-6 xs:px-4 text-justify mb-0 ">
            {viewCareer.whyAcress}
          </p>
          <div className="flex flex-wrap items-center px-6 lg:px-14 md:px-8 sm:px-6 xs:px-4 ">
            <span className=" mt-2">Connect with us on: </span>
            <div className="flex space-x-2 mt-2">
              <div className="flex items-center rounded-full bg-gray-200 p-2 ml-3">
                <Link
                  to="https://www.facebook.com/100Acress"
                  className="hover:underline"
                  style={{ color: "black" }}
                >
                  <FaFacebook size={25} />
                </Link>
                <Link to="https://www.facebook.com/100Acress">
                  <span
                    className="ml-1 hidden sm:inline underline"
                    style={{ color: "black" }}
                  >
                    Facebook
                  </span>
                </Link>
              </div>
              <div className="flex items-center rounded-full bg-gray-200 p-2">
                <Link
                  to="https://twitter.com/100acressdotcom"
                  className="hover:underline"
                  style={{ color: "black" }}
                >
                  <div
                    style={{
                      borderRadius: "50%",
                      backgroundColor: "black",
                      padding: "0.5rem",
                    }}
                  >
                    <i className="fa-brands fa-x-twitter text-sm text-white"></i>
                  </div>
                </Link>
                <Link to="https://twitter.com/100acressdotcom">
                  <span
                    className="ml-1 hidden sm:inline underline"
                    style={{ color: "black" }}
                  >
                    Twitter
                  </span>
                </Link>
              </div>
              <div className="flex items-center rounded-full bg-gray-200 p-2">
                <Link
                  to="https://www.linkedin.com/company/100acress/"
                  className="hover:underline"
                  style={{ color: "black" }}
                >
                  <FaLinkedin size={25} />
                </Link>
                <Link to="https://www.linkedin.com/company/100acress/">
                  <span
                    className="ml-1 hidden sm:inline underline"
                    style={{ color: "black" }}
                  >
                    Linkedin
                  </span>
                </Link>
              </div>
            </div>
            <span className="text mx-1 mt-2">
              to know more about{" "}
              <span className="">
                #YOU<strong>GREATER</strong>THAN<strong>YOU</strong>
              </span>
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 lg:px-8 md:px-8 sm:px-6 xs:px-4 py-8">
            <div className="flex flex-col text-justify items-center ">
              <div className="overflow-hidden m-4 rounded-xl bg-white ">
                <h3 className="text-xl font-bold mb-2">
                  Driving Culture Through Values:
                </h3>

                {viewCareer.driveCulture}
              </div>
            </div>

            <div className="flex flex-col text-justify items-center">
              <div className="overflow-hidden m-4 rounded-xl bg-white ">
                <h3 className="text-xl font-bold mb-2">
                  With In House Growth Opportunities:
                </h3>

                {viewCareer.inHouse}
              </div>
            </div>

            <div className="flex flex-col text-justify items-center">
              <div className="overflow-hidden m-4 rounded-xl bg-white ">
                <h3 className="text-xl font-bold mb-2">Life@100ACRESS:</h3>

                {viewCareer.lifeAcress}
              </div>
            </div>
          </div>
        </div>
        <p className="text-xl lg:text-3xl md:text-2xl sm:text-2xl xs:text-xl text-red-600 text-left px-12 pt-4  mb-0 bg-gray-100">
          100ACRESS HIGHLIGHTS
        </p>
        <div className="flex justify-center bg-gray-100">
          <div className="flex flex-col md:flex-row space-y-2  items-center justify-center max-w-7xl w-full pt-2 pb-5">
            <div className="w-full md:w-1/2 mx-2 h-96 overflow-hidden">
              {highlightImage &&
                Array.isArray(highlightImage) &&
                highlightImage.length > 0 &&
                highlightImage.map((item, index) => (
                  <div
                    key={index}
                    className="mr-2 sm:mr-1 md:mr-2 lg:mr-4 xl:mr-6"
                  >
                    <img
                      className="w-full h-full object-fit rounded-xl"
                      src={item.url}
                      alt={`Image-${index}`}
                    />
                  </div>
                ))}
            </div>
            <div className="w-full md:w-1/2 mx-2 h-96 ">
              <div className="flex flex-col space-y-2">
                <div className="h-48 w-full overflow-hidden">
                  {highlightImage &&
                    Array.isArray(highlightImage) &&
                    highlightImage.length > 0 &&
                    highlightImage.slice(0, 1).map((item, index) => (
                      <div
                        key={index}
                        className="mr-2 sm:mr-1 md:mr-2 lg:mr-4 xl:mr-6"
                      >
                        <img
                          className="w-full h-full object-fit rounded-xl"
                          src={item.url}
                          alt={`Image-${index}`}
                        />
                      </div>
                    ))}
                </div>
                <div className="h-48 w-full flex space-x-1 p-2">
                  <div className="h-full w-1/2 overflow-hidden  ">
                    {highlightImage &&
                      Array.isArray(highlightImage) &&
                      highlightImage.length > 1 &&
                      highlightImage.slice(1, 3).map((item, index) => (
                        <div
                          key={index}
                          className="mr-2 sm:mr-1 md:mr-2 lg:mr-4 xl:mr-6"
                        >
                          <img
                            className="w-full h-full object-fit rounded-xl"
                            src={item.url}
                            alt={`Image-${index}`}
                          />
                        </div>
                      ))}
                  </div>
                  <div className="h-full w-1/2 overflow-hidden  ">
                    {highlightImage &&
                      Array.isArray(highlightImage) &&
                      highlightImage.length > 3 &&
                      highlightImage.slice(3, 5).map((item, index) => (
                        <div
                          key={index}
                          className="mr-2 sm:mr-1 md:mr-2 lg:mr-4 xl:mr-6"
                        >
                          <img
                            className="w-full h-full object-fit rounded-xl"
                            src={item.url}
                            alt={`Image-${index}`}
                          />
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="my-4">
                <h3 className="mt-4">Current Openings</h3>
                <div className="flex items-center">
                  <DiCssTricks className="mr-2 my-3 " size={20} />
                  <span className="text-xl ">All Openings (21)</span>
                </div>
                <hr className="mt-0" />
                <div className="flex items-center mt-0">
                  <RiBankCardFill className="mr-2 my-3" size={20} />
                  <span className="text-xl">Product (1)</span>
                </div>
                <hr className="mt-0" />
                <div className="flex items-center">
                  <GrCloud className="mr-2 my-3" size={20} />
                  <span className="text-xl">Sales (13)</span>
                </div>
                <hr className="mt-0" />
                <div className="flex items-center">
                  <GrCommand className="mr-2 my-3" size={20} />
                  <span className="text-xl">Technology (1)</span>
                </div>
                <hr className="mt-0" />
                <div className="flex items-center">
                  <RiAdminFill className="mr-2 my-3" size={20} />
                  <span className="text-xl">Others (6)</span>
                </div>
                <hr className="mt-0" />
              </div>
            </div>
            <div className="col-md-8">
              <div
                className="flex flex-col border-left border-2 border-gray px-4 my-4"
                style={{ borderBlockStart: "1px", borderBlockEnd: "1px" }}
              >
                <h3 className="mb-4 mt-4 ml-5 ">All Openings</h3>
                <div className="flex flex-col h-96 overflow-y-auto">
                  {[...Array(10)].map((_, index) => (
                    <div className="flex items-stretch" key={index}>
                      <div className="flex-1 px-4 mb-4">
                        <div className="bg-gray-50 hover:bg-gray-200 rounded-lg p-4 h-full">
                          <p className="mb-2 text-xs lg:text-xl md:text-lg sm:text-lg xs:text-xs">
                            Job Title: <span className="">Content Editor</span>
                          </p>
                          <p className="mb-2 flex justify-between items-center">
                            <span className="text-xs lg:text-xl md:text-lg sm:text-lg xs:text-xs text-semibold">
                              Location:{" "}
                              <span className="text-xs lg:text-xl md:text-lg sm:text-lg xs:text-xs">
                                Noida
                              </span>
                            </span>
                            <span>
                              <div className="text-right">
                                <button
                                  type="button"
                                  className="text-white bg-red-600 font-medium rounded-lg text-xs lg:text-xl md:text-lg sm:text-sm xs:text-xs px-2 py-2"
                                  onClick={() => setShowForm(!showform)}
                                >
                                  Know More
                                </button>
                              </div>
                              {showform && (
                                <>
                                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10">
                                    <div className="px-4 py-4 bg-white w-full sm:w-full md:w-3/4 lg:w-1/2 h-96 overflow-y-auto flex flex-col items-center relative">
                                      <button
                                        className="text-red-400 text-xl absolute top-4 right-[1rem] md:right-8 lg:right-8 sm:right-6 cursor-pointer z-50"
                                        onClick={() => setShowForm(false)}
                                      >
                                        ✖
                                      </button>
                                      <div className="ml-[-6rem]">
                                        <strong>Content Editor</strong>
                                      </div>
                                      <p>
                                        <strong>Experience Range:</strong> 4+
                                        Years
                                        <br />
                                        <strong>Location: </strong>Noida
                                      </p>
                                      <div className="py-0">
                                        <p className="text-lg">
                                          <strong>Job brief</strong>
                                        </p>
                                        <p className="">
                                          We are looking for an Editor, with a
                                          good sense of what makes an
                                          interesting angle to a story, to
                                          juggle all the moving parts of
                                          publications. You will plan,
                                          coordinate, review and edit content.
                                          The successful candidate will be able
                                          to decide which ideas should be
                                          pursued and which should get dropped
                                          in order to meet quality and accuracy
                                          standards. The goal is to provide
                                          exceptional, informative and engaging
                                          content.
                                        </p>
                                        <p className="text-lg">
                                          <strong>Responsibilities</strong>{" "}
                                        </p>
                                        <ul className="list-disc">
                                          <li>
                                            Coordinate online or print
                                            publishing cycle and manage content
                                            areas.
                                          </li>
                                          <li>
                                            Set publication standards and
                                            establish goals and expectations.
                                          </li>
                                          <li>
                                            Suggest stories and generate
                                            headline ideas in alignment with
                                            targeted audience’s preferences.
                                          </li>
                                          <li>
                                            Oversee layout (artwork, design,
                                            photography) and check content for
                                            accuracy and errors.
                                          </li>
                                          <li>
                                            Understanding of video content and
                                            platform.
                                          </li>
                                        </ul>
                                        <p className="text-lg">
                                          <strong>
                                            Requirements and skills
                                          </strong>
                                        </p>
                                        <ul className="list-disc">
                                          <li>
                                            Proven working experience as an
                                            Editor.
                                          </li>
                                          <li>
                                            Strong writing/editing/proofreading
                                            skills and an excellent portfolio.
                                          </li>
                                          <li>
                                            Hands on experience with MS Office
                                            and InDesign, Photoshop or other
                                            publishing tools.
                                          </li>
                                          <li>
                                            Proven familiarity with SEO and
                                            social media best practices.
                                          </li>
                                        </ul>
                                        <br />
                                        <div className="text-red-600">
                                          <strong>
                                            To apply on this job, email your
                                            resume at{" "}
                                          </strong>
                                          <a
                                            href="mailto:hr@100acress.com?subject=CV - L&D Manager"
                                            className="text-black underline"
                                          >
                                            hr@100acress.com
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              )}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default CareerWithUs;
