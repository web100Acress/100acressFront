import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import Nav from "../aadharhomes/Nav";
import Footer from "../Components/Actual_Components/Footer";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useParams } from "react-router-dom";
import SmallPopForm from "../Components/Actual_Components/SmallPopForm";
const BuyViewDetails = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
  };
  const [rentViewDetails, setRentViewDetails] = useState([]);

  const { frontImage, otherImage, propertyName, amenities } = rentViewDetails;

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://api.100acress.com/property/view/${id}`
        );
        setRentViewDetails(res.data.data);
        console.log("Rent view Details", res);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{ overflowX: "hidden" }}>
      <Nav />
      <Wrapper>
        <div className="blog-single gray-bg">
          <div className="container">
            <div className="row align-items-start">
              <div className="col-lg-8 m-15px-tb">
                <article className="article">
                  <div className="article-img">
                    {frontImage && frontImage.url && (
                      <div>
                        <img
                          src={frontImage.url}
                          alt="Front View"
                          className="w-full h-60 object-fit"
                        />
                      </div>
                    )}
                  </div>
                  <div className="article-title">
                    <span className="text-2xl font-bold text-red-500 m-0">
                      Project Name:{" "}
                      <span className="text-gray-600">
                        {rentViewDetails.propertyName}
                      </span>
                    </span>

                    <p className="text-xl font-medium mx-10 text-justify"></p>
                    <span className="text-2xl font-bold text-red-500 m-0">
                      Description:{" "}
                    </span>
                    <p className="text-xl font-medium text-justify">
                      {rentViewDetails.descripation}
                    </p>

                    <span className="text-2xl font-bold text-red-500 m-0">
                      Address:{" "}
                    </span>
                    <p className="text-xl font-medium text-justify">
                      {rentViewDetails.address}
                    </p>
                  </div>
                  <span className="text-2xl font-bold text-red-500 m-0">
                    Properties Images:{" "}
                  </span>

                  <Slider {...settings}>
                    {otherImage &&
                      Array.isArray(otherImage) &&
                      otherImage.length > 0 &&
                      otherImage.map((image, index) => (
                        <div key={index}>
                          <img
                            src={image.url}
                            alt={`Image ${index + 1}`}
                            className="w-100 h-100 object-fit shadow-lg"
                          />
                        </div>
                      ))}
                  </Slider>

                  <br />
                  <span className="text-2xl font-bold text-red-500 m-0">
                    Amenities:{" "}
                  </span>

                  {amenities &&
                    Array.isArray(amenities) &&
                    amenities.length > 0 && (
                      <div className="flex flex-wrap ">
                        {amenities.map((amenity, index) => (
                          <div
                            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 my-2 mx-2"
                            key={index}
                          >
                            <div className="  hover:bg-red-300 w-full text-center overflow-hidden rounded-lg shadow">
                              <div className="ml-auto">
                                <p className="font-medium text-lg pt-2 text-black">
                                  {amenity}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  <SmallPopForm />
                  <div className="article-title">
                    <span className="text-2xl font-bold text-red-500 m-0">
                      Property Type:{" "}
                    </span>
                    <span>{rentViewDetails.propertyType}</span>
                    <br />
                    <span className="text-2xl font-bold text-red-500 m-0">
                      State:{" "}
                    </span>
                    <span>{rentViewDetails.state}</span>
                    <br />
                    <span className="text-2xl font-bold text-red-500 m-0">
                      Built Year:{" "}
                    </span>
                    <span>{rentViewDetails.builtYear}</span>
                  </div>
                </article>
                <div className="article-comment">
                  <h4 className="text-2xl font-bold text-red-500 m-0">
                    Contact Us
                  </h4>
                  <form id="contact-form" method="POST">
                    <div className="row pt-3">
                      <div className="widget widget-tags">
                        <div className="widget-body">
                          <div className="row">
                            <div className="col-md-12">
                              <div className="form-group">
                                <input
                                  name="Name"
                                  id="name"
                                  placeholder="Name *"
                                  className="form-control"
                                  type="text"
                                />
                              </div>
                            </div>
                            <div className="col-md-12 pt-2">
                              <div className="form-group">
                                <input
                                  name="Email"
                                  id="email"
                                  placeholder="Email *"
                                  className="form-control"
                                  type="email"
                                />
                              </div>
                            </div>

                            <div className="col-md-12 pt-2">
                              <div className="form-group">
                                <input
                                  name="mobile"
                                  id="mobile"
                                  placeholder="Mobile *"
                                  className="form-control"
                                  type="text"
                                />
                              </div>
                            </div>

                            <div className="col-md-12 pt-2 hidden">
                              <div className="form-group">
                                <input
                                  name="projectName"
                                  id="projectName"
                                  placeholder="Project Name *"
                                  className="form-control"
                                  type="text"
                                />
                              </div>
                            </div>

                            <div className="col-md-12 pt-2 hidden ">
                              <div className="form-group">
                                <input
                                  name="addresss"
                                  id="address"
                                  placeholder="Address *"
                                  className="form-control"
                                  type="text"
                                />
                              </div>
                            </div>

                            <div className="col-md-12 pt-2">
                              <div className="send">
                                <button className="px-btn theme bg-red-500 text-red-500">
                                  <span className="text-red-500">Submit</span>{" "}
                                  <i className="arrow text-red-500" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-lg-4 m-15 px-tb blog-aside">
                <div className="widget widget-author">
                  <div className="widget-title">
                    <h3>Price: {rentViewDetails.price}</h3>
                  </div>

                  <div className="widget-title">
                    <p>
                      <span className="text-red-500">Available Date:</span>{" "}
                      {rentViewDetails.availableDate}
                    </p>
                  </div>

                  <div className="widget-title">
                    <p>
                      <span className="text-red-500">Landmark:</span>{" "}
                      {rentViewDetails.landmark}
                    </p>
                  </div>
                  {/* <div className="widget-body">
                    <div className="media align-items-center">
                      <div className="avatar">
                        <img
                          src="https://bootdey.com/img/Content/avatar/avatar6.png"
                          title=""
                          alt=""
                        />
                      </div>
                    
                        <h6>
                          
                        Let us create unique opportunities to help make any disability into an ability.
                        </h6>
                   
                    </div>
                    <p>
                      I design and develop services for customers of all sizes,
                      specializing in creating stylish, modern websites, web
                      services and online stores
                    </p>
                  </div> */}
                  <p className="text-lg text-justify p-2">
                    Let us create unique opportunities to help make any
                    disability into an ability.
                  </p>
                </div>

                <div className="widget widget-tags">
                  <div className="widget-title">
                    <h3>Contact Us</h3>
                  </div>
                  <div className="widget-body">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <input
                            name="Name"
                            id="name"
                            placeholder="Name *"
                            className="form-control"
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="col-md-12 pt-2">
                        <div className="form-group">
                          <input
                            name="Email"
                            id="email"
                            placeholder="Email *"
                            className="form-control"
                            type="email"
                          />
                        </div>
                      </div>

                      <div className="col-md-12 pt-2">
                        <div className="form-group">
                          <input
                            name="mobile"
                            id="mobile"
                            placeholder="Mobile *"
                            className="form-control"
                            type="text"
                          />
                        </div>
                      </div>

                      <div className="col-md-12 pt-2 hidden">
                        <div className="form-group">
                          <input
                            name="projectName"
                            id="projectName"
                            placeholder="Project Name *"
                            className="form-control"
                            type="text"
                          />
                        </div>
                      </div>

                      <div className="col-md-12 pt-2 hidden ">
                        <div className="form-group">
                          <input
                            name="addresss"
                            id="address"
                            placeholder="Address *"
                            className="form-control"
                            type="text"
                          />
                        </div>
                      </div>

                      <div className="col-md-12 pt-2">
                        <div className="send">
                          <button className="px-btn theme bg-red-500 text-red-500">
                            <span className="text-red-500">Submit</span>{" "}
                            <i className="arrow text-red-500" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="widget widget-post">
                  <div className="widget-title">
                    <h3>Trending Properties</h3>
                  </div>
                  <div className="widget-body"></div>
                </div>

                <div className="widget widget-latest-post">
                  <div className="widget-title">
                    <h3>Upcoming Projects</h3>
                  </div>
                  <div className="widget-body"></div>
                  {/* <div className="widget-body">
                    <div className="latest-post-aside media">
                      <div className="lpa-left media-body">
                        <div className="lpa-title">
                          <h5>
                            <a href="#">
                              Prevent 75% of visitors from google analytics
                            </a>
                          </h5>
                        </div>
                        <div className="lpa-meta">
                          <a className="name" href="#">
                            Rachel Roth
                          </a>
                          <a className="date" href="#">
                            26 FEB 2020
                          </a>
                        </div>
                      </div>
                      <div className="lpa-right">
                        <a href="#">
                          <img
                            src="https://www.bootdey.com/image/400x200/FFB6C1/000000"
                            title=""
                            alt=""
                          />
                        </a>
                      </div>
                    </div>
                    <div className="latest-post-aside media">
                      <div className="lpa-left media-body">
                        <div className="lpa-title">
                          <h5>
                            <a href="#">
                              Prevent 75% of visitors from google analytics
                            </a>
                          </h5>
                        </div>
                        <div className="lpa-meta">
                          <a className="name" href="#">
                            Rachel Roth
                          </a>
                          <a className="date" href="#">
                            26 FEB 2020
                          </a>
                        </div>
                      </div>
                      <div className="lpa-right">
                        <a href="#">
                          <img
                            src="https://www.bootdey.com/image/400x200/FFB6C1/000000"
                            title=""
                            alt=""
                          />
                        </a>
                      </div>
                    </div>
                    <div className="latest-post-aside media">
                      <div className="lpa-left media-body">
                        <div className="lpa-title">
                          <h5>
                            <a href="#">
                              Prevent 75% of visitors from google analytics
                            </a>
                          </h5>
                        </div>
                        <div className="lpa-meta">
                          <a className="name" href="#">
                            Rachel Roth
                          </a>
                          <a className="date" href="#">
                            26 FEB 2020
                          </a>
                        </div>
                      </div>
                      <div className="lpa-right">
                        <a href="#">
                          <img
                            src="https://www.bootdey.com/image/400x200/FFB6C1/000000"
                            title=""
                            alt=""
                          />
                        </a>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
      <Footer />
    </div>
  );
};

export default BuyViewDetails;

const Wrapper = styled.section`
  body {
    margin-top: 20px;
  }
  .blog-listing {
    padding-top: 30px;
    padding-bottom: 30px;
  }
  .gray-bg {
    background-color: #f5f5f5;
  }
  /* Blog 
---------------------*/
  .blog-grid {
    box-shadow: 0 0 30px rgba(31, 45, 61, 0.125);
    border-radius: 5px;
    overflow: hidden;
    background: #ffffff;
    margin-top: 15px;
    margin-bottom: 15px;
  }
  .blog-grid .blog-img {
    position: relative;
  }
  .blog-grid .blog-img .date {
    position: absolute;
    background: #fc5356;
    color: #ffffff;
    padding: 8px 15px;
    left: 10px;
    top: 10px;
    border-radius: 4px;
  }
  .blog-grid .blog-img .date span {
    font-size: 22px;
    display: block;
    line-height: 22px;
    font-weight: 700;
  }
  .blog-grid .blog-img .date label {
    font-size: 14px;
    margin: 0;
  }
  .blog-grid .blog-info {
    padding: 20px;
  }
  .blog-grid .blog-info h5 {
    font-size: 22px;
    font-weight: 700;
    margin: 0 0 10px;
  }
  .blog-grid .blog-info h5 a {
    color: #20247b;
  }
  .blog-grid .blog-info p {
    margin: 0;
  }
  .blog-grid .blog-info .btn-bar {
    margin-top: 20px;
  }

  /* Blog Sidebar
-------------------*/
  .blog-aside .widget {
    box-shadow: 0 0 30px rgba(31, 45, 61, 0.125);
    border-radius: 5px;
    overflow: hidden;
    background: #ffffff;
    margin-top: 15px;
    margin-bottom: 15px;
    width: 100%;
    display: inline-block;
    vertical-align: top;
  }
  .blog-aside .widget-body {
    padding: 15px;
  }
  .blog-aside .widget-title {
    padding: 15px;
    border-bottom: 1px solid #eee;
  }
  .blog-aside .widget-title h3 {
    font-size: 20px;
    font-weight: 700;
    color: #fc5356;
    margin: 0;
  }
  .blog-aside .widget-author .media {
    margin-bottom: 15px;
  }
  .blog-aside .widget-author p {
    font-size: 16px;
    margin: 0;
  }
  .blog-aside .widget-author .avatar {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    overflow: hidden;
  }
  .blog-aside .widget-author h6 {
    font-weight: 600;
    color: #20247b;
    font-size: 22px;
    margin: 0;
    padding-left: 20px;
  }
  .blog-aside .post-aside {
    margin-bottom: 15px;
  }
  .blog-aside .post-aside .post-aside-title h5 {
    margin: 0;
  }
  .blog-aside .post-aside .post-aside-title a {
    font-size: 18px;
    color: #20247b;
    font-weight: 600;
  }
  .blog-aside .post-aside .post-aside-meta {
    padding-bottom: 10px;
  }
  .blog-aside .post-aside .post-aside-meta a {
    color: #6f8ba4;
    font-size: 12px;
    text-transform: uppercase;
    display: inline-block;
    margin-right: 10px;
  }
  .blog-aside .latest-post-aside + .latest-post-aside {
    border-top: 1px solid #eee;
    padding-top: 15px;
    margin-top: 15px;
  }
  .blog-aside .latest-post-aside .lpa-right {
    width: 90px;
  }
  .blog-aside .latest-post-aside .lpa-right img {
    border-radius: 3px;
  }
  .blog-aside .latest-post-aside .lpa-left {
    padding-right: 15px;
  }
  .blog-aside .latest-post-aside .lpa-title h5 {
    margin: 0;
    font-size: 15px;
  }
  .blog-aside .latest-post-aside .lpa-title a {
    color: #20247b;
    font-weight: 600;
  }
  .blog-aside .latest-post-aside .lpa-meta a {
    color: #6f8ba4;
    font-size: 12px;
    text-transform: uppercase;
    display: inline-block;
    margin-right: 10px;
  }

  .tag-cloud a {
    padding: 4px 15px;
    font-size: 13px;
    color: #ffffff;
    background: #20247b;
    border-radius: 3px;
    margin-right: 4px;
    margin-bottom: 4px;
  }
  .tag-cloud a:hover {
    background: #fc5356;
  }

  .blog-single {
    padding-top: 30px;
    padding-bottom: 30px;
  }

  .article {
    box-shadow: 0 0 30px rgba(31, 45, 61, 0.125);
    border-radius: 5px;
    overflow: hidden;
    background: #ffffff;
    padding: 15px;
    margin: 15px 0 30px;
  }
  .article .article-title {
    padding: 15px 0 20px;
  }
  .article .article-title h6 {
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 20px;
  }
  .article .article-title h6 a {
    text-transform: uppercase;
    color: #fc5356;
    border-bottom: 1px solid #fc5356;
  }
  .article .article-title h2 {
    color: #20247b;
    font-weight: 600;
  }
  .article .article-title .media {
    padding-top: 15px;
    border-bottom: 1px dashed #ddd;
    padding-bottom: 20px;
  }
  .article .article-title .media .avatar {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    overflow: hidden;
  }
  .article .article-title .media .media-body {
    padding-left: 8px;
  }
  .article .article-title .media .media-body label {
    font-weight: 600;
    color: #fc5356;
    margin: 0;
  }
  .article .article-title .media .media-body span {
    display: block;
    font-size: 12px;
  }
  .article .article-content h1,
  .article .article-content h2,
  .article .article-content h3,
  .article .article-content h4,
  .article .article-content h5,
  .article .article-content h6 {
    color: #20247b;
    font-weight: 600;
    margin-bottom: 15px;
  }
  .article .article-content blockquote {
    max-width: 600px;
    padding: 15px 0 30px 0;
    margin: 0;
  }
  .article .article-content blockquote p {
    font-size: 20px;
    font-weight: 500;
    color: #fc5356;
    margin: 0;
  }
  .article .article-content blockquote .blockquote-footer {
    color: #20247b;
    font-size: 16px;
  }
  .article .article-content blockquote .blockquote-footer cite {
    font-weight: 600;
  }
  .article .tag-cloud {
    padding-top: 10px;
  }

  .article-comment {
    box-shadow: 0 0 30px rgba(31, 45, 61, 0.125);
    border-radius: 5px;
    overflow: hidden;
    background: #ffffff;
    padding: 20px;
  }
  .article-comment h4 {
    font-weight: 700;
    margin-bottom: 25px;
    font-size: 22px;
  }
  img {
    max-width: 100%;
  }
  img {
    vertical-align: middle;
    border-style: none;
  }

  /* Contact Us
---------------------*/
  .contact-name {
    margin-bottom: 30px;
  }
  .contact-name h5 {
    font-size: 22px;
    color: #20247b;
    margin-bottom: 5px;
    font-weight: 600;
  }
  .contact-name p {
    font-size: 18px;
    margin: 0;
  }

  .social-share a {
    width: 40px;
    height: 40px;
    line-height: 40px;
    border-radius: 50%;
    color: #ffffff;
    text-align: center;
    margin-right: 10px;
  }
  .social-share .dribbble {
    box-shadow: 0 8px 30px -4px rgba(234, 76, 137, 0.5);
    background-color: #ea4c89;
  }
  .social-share .behance {
    box-shadow: 0 8px 30px -4px rgba(0, 103, 255, 0.5);
    background-color: #0067ff;
  }
  .social-share .linkedin {
    box-shadow: 0 8px 30px -4px rgba(1, 119, 172, 0.5);
    background-color: #0177ac;
  }

  .contact-form .form-control {
    border: none;
    border-bottom: 1px solid #20247b;
    background: transparent;
    border-radius: 0;
    padding-left: 0;
    box-shadow: none !important;
  }
  .contact-form .form-control:focus {
    border-bottom: 1px solid #fc5356;
  }
  .contact-form .form-control.invalid {
    border-bottom: 1px solid #ff0000;
  }
  .contact-form .send {
    margin-top: 20px;
  }
  @media (max-width: 767px) {
    .contact-form .send {
      margin-bottom: 20px;
    }
  }

  .section-title h2 {
    font-weight: 700;
    color: #20247b;
    font-size: 45px;
    margin: 0 0 15px;
    border-left: 5px solid #fc5356;
    padding-left: 15px;
  }
  .section-title {
    padding-bottom: 45px;
  }
  .contact-form .send {
    margin-top: 20px;
  }
  .px-btn {
    padding: 0 50px 0 20px;
    line-height: 60px;
    position: relative;
    display: inline-block;
    color: #20247b;
    background: none;
    border: none;
  }
  .px-btn:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    border-radius: 30px;
    background: transparent;
    border: 1px solid rgba(252, 83, 86, 0.6);
    border-right: 1px solid transparent;
    -moz-transition: ease all 0.35s;
    -o-transition: ease all 0.35s;
    -webkit-transition: ease all 0.35s;
    transition: ease all 0.35s;
    width: 60px;
    height: 60px;
  }
  .px-btn .arrow {
    width: 13px;
    height: 2px;
    background: currentColor;
    display: inline-block;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    right: 25px;
  }
  .px-btn .arrow:after {
    width: 8px;
    height: 8px;
    border-right: 2px solid currentColor;
    border-top: 2px solid currentColor;
    content: "";
    position: absolute;
    top: -3px;
    right: 0;
    display: inline-block;
    -moz-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`;
