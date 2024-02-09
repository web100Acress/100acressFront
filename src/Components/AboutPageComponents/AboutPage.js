/** @format */

import React from "react";
import styled from "styled-components";
import Nav from "../../aadharhomes/Nav";
import Footer from "../Actual_Components/Footer";

function AboutPage() {
  return (
    <Wrapper className='section'>
      <Nav/>
  <div style={{ width: "100%", height: "100vh", backgroundColor: "grey", display: "flex", justifyContent: "center", alignItems: "center" }}>
  <div className='d-flex flex-wrap justify-content-center align-items-center'>
    <div style={{ width: "90%", maxWidth: "400px", fontSize: "35px", fontWeight: "bolder", textAlign: "center", color: "white" }}>
       100acress.com
    </div>
    <div style={{ width: "90%", maxWidth: "600px" }}>
      <img
        src='https://eep.io/images/yzco4xsimv0y/6aZY89JahywcsYcUkC6seq/88f9ad3c2c5004fd2166b1b5b7ee6567/hero_our-story.jpg?w=1520&fm=avif&q=60'
        alt=''
        style={{ width: "100%",borderRadius:"50px 20px" }}
      />
    </div>
  </div>
</div>
   <div className="aboutMiddle" >
    <div>
     <p>100acress.com Gurgaon is an honoured real estate company that strongly believes in providing customer delight and value for its hard-earned money was founded in the year 2000 and is being skillfully led by our director Mr Rajesh Agrawal. So far we have been successful in gaining top reviews from our clients in diverse jobs such as Booking/ Sale/ Leasing Of Residential/ Commercial Properties In Gurgaon And Delhi/NCR which makes us a trustworthy and efficient real estate company in Gurgaon.</p>
    </div>
    <div>
    <div className="headings">Meet our Team</div>
     <p>Our team of highly skilled professionals works with genuine sellers so that it can make the best deals for our potential buyer who are looking for residential, commercial, or any real estate investment, we try to maintain long term relationship by providing their dream home and insists on providing the value for their money by opening all the details of the project and showing them similar projects too under the same price segments in order to make them able for making better decisions.</p>
    </div>
    <div>
    <div className="headings">Our Values</div>
     <p>Our company works with moral values which are respecting clients’ investment, determined efforts to make every possibility available, and preserved efforts to grant the best services to our clients. We learn with our clients to enhance our servicer quality, make ourselves better every day. And provide the best results of their investments which they desire. all the transparency of the work will be made which you require.</p>
    </div>
    <div>
    <div className="headings">Vision We See</div>
     <p>The real estate industry is making rapid growth and We aim to become one of the most admired, influential, and reliable service provider companies in the real estate industry by winning our customers' trust. With our ultimate passion, performance, and skilled abilities we aspire to enhance our standards in Gurgaon and Delhi NCR. In catering excellent service to our customers, making confident.</p>
     <p>Our expert team is working on making secure and smooth all legal and mandatory transactions of our housing and commercial projects to ensure real and value for money products. We provide every piece of information and quick browsing facilities about the undertakings so that our client does not get any harm and can trust us. Our team aims to enlarge our circle of people to avail best deals and multiple choices along with getting a significant status in the real estate domain.</p>
    </div>
    <div>
    <div className="headings">Meet Our Founder</div>
     <p>Our founder, a high-skilled professional, visionary person, and planned development builder guides the team towards record-setting performance .our respected leader makes every challenge into a profit-generating asset through his business excellence acumen, entrepreneurial drive, sophisticated financial expertise and constraint drive to push ourselves into excellence. under the managership and guidance of our business leader having 20+ years of successful operations in the domain, he is benefitting in diverse domains whether it be starts-ups or previously established business entities a brilliant motivator who understands the value of investments and his organizational capabilities. High-class development concepts and active achievable strategies he pilots rapid phenomenal business growth. And has worked as a catalyst for their business plans to get customer-centric high-profit margins and returns.</p>
    </div>
    </div>
    <Footer/>
    </Wrapper>
  );
}

export default AboutPage;
const Wrapper = styled.section`
.aboutMiddle{
  width:60%;
  text-align:center;
  margin:3.7em auto;
}

.headings{
  font-size:44px;
  font-weight:600;
  margin-top: 3.75rem;
  margin-bottom: 3.75rem;
}
@media screen and (max-width:600px){
  .aboutMiddle{
    width:80%;
    text-align:center;
    margin:2.7em auto;
  }
  .headings{
    margin-top: 1.75rem;
  margin-bottom: 1.75rem;
  }
}
  // .about-section{
  // 	position:relative;
  // 	padding:50px 0px;
  // }

  // .about-section .content-column{
  // 	position:relative;
  // 	margin-bottom:40px;
  // }

  // .about-section .content-column .inner-column{
  // 	position:relative;
  // 	padding-top:50px;
  // 	padding-right:100px;
  // }

  // .about-section .content-column .text{
  // 	position:relative;
  // 	color:#777777;
  // 	font-size:15px;
  // 	line-height:2em;
  // 	margin-bottom:40px;
  // }

  // .about-section .content-column .email{
  // 	position:relative;
  // 	color:#252525;
  // 	font-weight:700;
  // 	margin-bottom:50px;
  // }

  // .about-section .image-column{
  // 	position:relative;
  // 	margin-bottom:50px;
  // }

  // .about-section .image-column .inner-column{
  // 	position:relative;
  // 	padding:40px 40px 0px 0px;
  // 	margin-left:50px;
  // }

  // .about-section .image-column .inner-column:after{
  // 	position:absolute;
  // 	content:'';
  // 	right:0px;
  // 	top:0px;
  // 	left:40px;
  // 	bottom:100px;
  // 	z-index:-1;
  // 	border:2px solid red;
  // }

  // .about-section .image-column .inner-column .image{
  // 	position:relative;
  // }

  // .about-section .image-column .inner-column .image:before{
  // 	position:absolute;
  // 	content:'';
  // 	left:-50px;
  // 	bottom:-50px;
  // 	width:299px;
  // 	height:299px;
  // 	background:url(img/pattern-2.png) no-repeat;
  // }

  // .about-section .image-column .inner-column .image img{
  // 	position:relative;
  // 	width:100%;
  // 	display:block;
  // }

  // .about-section .image-column .inner-column .image .overlay-box{
  // 	position:absolute;
  // 	left:40px;
  // 	bottom:48px;
  // }

  // .about-section .image-column .inner-column .image .overlay-box .year-box{
  // 	position:relative;
  // 	color:#252525;
  // 	font-size:24px;
  // 	font-weight:700;
  // 	line-height:1.4em;
  // 	padding-left:125px;
  // }

  // .about-section .image-column .inner-column .image .overlay-box .year-box .number{
  // 	position:absolute;
  // 	left:0px;
  // 	top:0px;
  // 	width:110px;
  // 	height:110px;
  // 	color:red;
  // 	font-size:68px;
  // 	font-weight:700;
  // 	line-height:105px;
  // 	text-align:center;
  // 	background-color:#ffffff;
  // 	border:1px solid #000000;
  // }
  // .about-section .btn-style-three:before {
  //     position: absolute;
  //     content: '';
  //     left: 10px;
  //     top: 10px;
  //     z-index: -1;
  //     right: -10px;
  //     bottom: -10px;
  //     background: url(https://i.ibb.co/DKn55Qz/pattern-1.jpg) repeat;
  // }
  // .about-section .btn-style-three:hover {
  //     color: #ffffff;
  //     background: red;
  // }
  // .about-section .btn-style-three {
  //     position: relative;
  //     line-height: 24px;
  //     color: #252525;
  //     font-size: 15px;
  //     font-weight: 700;
  //     background: none;
  //     display: inline-block;
  //     padding: 11px 40px;
  //     background-color: #ffffff;
  //     text-transform: capitalize;
  //     border: 2px solid red;
  // }
  // .sec-title2{
  // 	color:#fff;
  // }
  // .sec-title {
  //     position: relative;
  //     padding-bottom: 40px;
  // }
  // .sec-title .title {
  //     position: relative;
  //     color: red;
  //     font-size: 18px;
  //     font-weight: 700;
  //     padding-right: 50px;
  //     margin-bottom: 15px;
  //     display: inline-block;
  //     text-transform: capitalize;
  // }
  // .sec-title .title:before {
  //     position: absolute;
  //     content: '';
  //     right: 0px;
  //     bottom: 7px;
  //     width: 40px;
  //     height: 1px;
  //     background-color: #bbbbbb;
  // }

  //   .timeline {
  //     position: relative;
  //     width: 660px;
  //     margin: 0 auto;
  //     margin-top: 20px;
  //     padding: 1em 0;
  //     list-style-type: none;
  //   }

  //   .timeline:before {
  //     position: absolute;
  //     left: 50%;
  //     top: 0;
  //     content: ' ';
  //     display: block;
  //     width: 6px;
  //     height: 100%;
  //     margin-left: -3px;
  //     background: rgb(80,80,80);
  //     background: -moz-linear-gradient(top, rgba(80,80,80,0) 0%, rgb(80,80,80) 8%, rgb(80,80,80) 92%, rgba(80,80,80,0) 100%);
  //     background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(30,87,153,1)), color-stop(100%,rgba(125,185,232,1)));
  //     background: -webkit-linear-gradient(top, rgba(80,80,80,0) 0%, rgb(80,80,80) 8%, rgb(80,80,80) 92%, rgba(80,80,80,0) 100%);
  //     background: -o-linear-gradient(top, rgba(80,80,80,0) 0%, rgb(80,80,80) 8%, rgb(80,80,80) 92%, rgba(80,80,80,0) 100%);
  //     background: -ms-linear-gradient(top, rgba(80,80,80,0) 0%, rgb(80,80,80) 8%, rgb(80,80,80) 92%, rgba(80,80,80,0) 100%);
  //     background: linear-gradient(to bottom, rgba(80,80,80,0) 0%, rgb(80,80,80) 8%, rgb(80,80,80) 92%, rgba(80,80,80,0) 100%);
  //     z-index: 5;
  //   }

  //   .timeline li {
  //     padding: 1em 0;
  //   }

  //   .timeline li:after {
  //     content: "";
  //     display: block;
  //     height: 0;
  //     clear: both;
  //     visibility: hidden;
  //   }

  //   .direction-l {
  //     position: relative;
  //     width: 300px;
  //     float: left;
  //     text-align: right;
  //   }

  //   .direction-r {
  //     position: relative;
  //     width: 300px;
  //     float: right;
  //   }

  //   .flag-wrapper {
  //     position: relative;
  //     display: inline-block;

  //     text-align: center;
  //   }

  //   .flag {
  //     position: relative;
  //     display: inline;
  //     background: rgb(248,248,248);
  //     padding: 6px 10px;
  //     border-radius: 5px;

  //     font-weight: 600;
  //     text-align: left;
  //   }

  //   .direction-l .flag {
  //     -webkit-box-shadow: -1px 1px 1px rgba(0,0,0,0.15), 0 0 1px rgba(0,0,0,0.15);
  //     -moz-box-shadow: -1px 1px 1px rgba(0,0,0,0.15), 0 0 1px rgba(0,0,0,0.15);
  //     box-shadow: -1px 1px 1px rgba(0,0,0,0.15), 0 0 1px rgba(0,0,0,0.15);
  //   }

  //   .direction-r .flag {
  //     -webkit-box-shadow: 1px 1px 1px rgba(0,0,0,0.15), 0 0 1px rgba(0,0,0,0.15);
  //     -moz-box-shadow: 1px 1px 1px rgba(0,0,0,0.15), 0 0 1px rgba(0,0,0,0.15);
  //     box-shadow: 1px 1px 1px rgba(0,0,0,0.15), 0 0 1px rgba(0,0,0,0.15);
  //   }

  //   .direction-l .flag:before,
  //   .direction-r .flag:before {
  //     position: absolute;
  //     top: 50%;
  //     right: -36px;
  //     content: ' ';
  //     display: block;
  //     width: 12px;
  //     height: 12px;
  //     margin-top: -10px;
  //     background: #fff;
  //     border-radius: 10px;
  //     border: 4px solid rgb(255,80,80);
  //     z-index: 10;
  //   }

  //   .direction-r .flag:before {
  //     left: -36px;
  //   }

  //   .direction-l .flag:after {
  //     content: "";
  //     position: absolute;
  //     left: 100%;
  //     top: 50%;
  //     height: 0;
  //     width: 0;
  //     margin-top: -8px;
  //     border: solid transparent;
  //     border-left-color: rgb(248,248,248);
  //     border-width: 8px;
  //     pointer-events: none;
  //   }

  //   .direction-r .flag:after {
  //     content: "";
  //     position: absolute;
  //     right: 100%;
  //     top: 50%;
  //     height: 0;
  //     width: 0;
  //     margin-top: -8px;
  //     border: solid transparent;
  //     border-right-color: rgb(248,248,248);
  //     border-width: 8px;
  //     pointer-events: none;
  //   }

  //   .time-wrapper {
  //     display: inline;

  //     line-height: 1em;
  //     font-size: 0.66666em;
  //     color: rgb(250,80,80);
  //     vertical-align: middle;
  //   }

  //   .direction-l .time-wrapper {
  //     float: left;
  //   }

  //   .direction-r .time-wrapper {
  //     float: right;
  //   }

  //   .time {
  //     display: inline-block;
  //     padding: 4px 6px;
  //     background: rgb(248,248,248);
  //   }

  //   .desc {
  //     margin: 1em 0.75em 0 0;

  //     font-size: 0.77777em;
  //     font-style: italic;
  //     line-height: 1.5em;
  //   }

  //   .direction-r .desc {
  //     margin: 1em 0 0 0.75em;
  //   }

  //   @media screen and (max-width: 660px) {

  //   .timeline {
  //        width: 100%;
  //       padding: 4em 0 1em 0;
  //   }

  //   .timeline li {
  //       padding: 2em 0;
  //   }

  //   .direction-l,
  //   .direction-r {
  //       float: none;
  //       width: 100%;

  //       text-align: center;
  //   }

  //   .flag-wrapper {
  //       text-align: center;
  //   }

  //   .flag {
  //       background: rgb(255,255,255);
  //       z-index: 15;
  //   }

  //   .direction-l .flag:before,
  //   .direction-r .flag:before {
  //     position: absolute;
  //     top: -30px;
  //       left: 52%;
  //       content: ' ';
  //       display: block;
  //       width: 12px;
  //       height: 12px;
  //       margin-left: -9px;
  //       background: #fff;
  //       border-radius: 10px;
  //       border: 4px solid rgb(255,80,80);
  //       z-index: 10;
  //   }

  //   .direction-l .flag:after,
  //   .direction-r .flag:after {
  //       content: "";
  //       position: absolute;
  //       left: 50%;
  //       top: -8px;
  //       height: 0;
  //       width: 0;
  //       margin-left: -8px;
  //       border: solid transparent;
  //       border-bottom-color: rgb(255,255,255);
  //       border-width: 8px;
  //       pointer-events: none;
  //   }

  //   .time-wrapper {
  //       display: block;
  //       position: relative;
  //       margin: 4px 0 0 0;
  //       z-index: 14;
  //   }

  //   .direction-l .time-wrapper {
  //       float: none;
  //   }

  //   .direction-r .time-wrapper {
  //       float: none;
  //   }

  //   .desc {
  //       position: relative;
  //       margin: 1em 0 0 0;
  //       padding: 1em;
  //       background: rgb(245,245,245);
  //       -webkit-box-shadow: 0 0 1px rgba(0,0,0,0.20);
  //       -moz-box-shadow: 0 0 1px rgba(0,0,0,0.20);
  //       box-shadow: 0 0 1px rgba(0,0,0,0.20);

  //     z-index: 15;
  //   }

  //   .direction-l .desc,
  //   .direction-r .desc {
  //       position: relative;
  //       margin: 1em 1em 0 1em;
  //       padding: 1em;

  //     z-index: 15;
  //   }

  //   }

  //   @media screen and (min-width: 400px ?? max-width: 660px) {

  //   .direction-l .desc,
  //   .direction-r .desc {
  //       margin: 1em 4em 0 4em;
  //   }

  //   }
`;
