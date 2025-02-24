import React from "react";
import styled from "styled-components";

function BlogFlex() {
  return (
    <Wrapper className='section'>
      <div style={{position:"relative"}}>
        <div class='blog-card spring-fever'>
          <div class='title-content'>
            <h3>
              <a href='#'>10 inspiring photos</a>
            </h3>
            <div class='intro'>
              {" "}
              <a href='#'>Inspiration</a>{" "}
            </div>
          </div>
          <div class='card-info'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim...
            <a href='#'>
              Read Article<span class='licon icon-arr icon-black'></span>
            </a>
          </div>

          <div class='gradient-overlay'></div>
          <div class='color-overlay'></div>
        </div>
      </div>
      
    </Wrapper>
  );
}

export default BlogFlex;
const Wrapper = styled.section`
  font-family: "PT Serif", serif;
  .blog-card {
    max-width: 350px;
    width: 100%;
    height: 400px;
    position: absolute;
    font-family: "Droid Serif", serif;
    color: #fff;
    top: 20%;
    right: 0;
    left: 0;
    overflow: hidden;
    border-radius: 0px;
    box-shadow: 0px 10px 20px -9px rgba(0, 0, 0, 0.5);
    text-align: center;
    transition: all 0.4s;
    background: url(https://unsplash.it/600/800?image=1061) center no-repeat;
    background-size: 100%;
  }
  .spring-fever{
    border-radius:10px;
  }
  .blog-card a {
    color: #fff;
    text-decoration: none;
    transition: all 0.2s;
  }
  .blog-card .color-overlay {
    background: rgba(64, 84, 94, 0.5);
    width: 550px;
    height: 500px;
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
    transition: background 0.3s cubic-bezier(0.33, 0.66, 0.66, 1);
  }
  .blog-card .gradient-overlay {
    background-image: linear-gradient(transparent 0%, rgba(0, 0, 0, 0.6) 21%);
    width: 550px;
    height: 500px;
    position: absolute;
    top: 350px;
    left: 0;
    z-index: 15;
  }
  .blog-card:hover {
    box-shadow: 0px 18px 20px -9px rgba(0, 10, 30, 0.75);
  }
  .blog-card:hover .card-info {
    opacity: 1;
    bottom: 50px;
  }
  .blog-card:hover .color-overlay {
    background: rgba(64, 64, 70, 0.8);
  }
  .blog-card:hover .title-content {
    margin-top: 40px;
  }
  .title-content {
    text-align: center;
    margin: 170px 0 0 0;
    position: absolute;
    z-index: 20;
    width: 100%;
    top: 0;
    left: 0;
    transition: all 0.6s;
  }
  .blog-card:hover h3:after {
    animation: changeLetter 0.3s 1 linear;
    width: 80%;
  }
  .blog-card h3,
  h1 {
    font-size: 1.9em;
    font-weight: 400;
    letter-spacing: 1px;
    font-family: "Abril Fatface", serif;
    margin-bottom: 0;
    display: inline-block;
  }
  .blog-card h3 a {
    text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    transition: all 0.2s;
  }
  .blog-card h3 a:hover {
    text-shadow: 0px 8px 20px rgba(0, 0, 0, 0.95);
  }
  h3:after {
    content: " ";
    display: block;
    width: 10%;
    height: 2px;
    margin: 20px auto;
    border: 0;
    background: #bda26b;
    transition: all 0.2s;
  }
  @keyframes changeLetter {
    0% {
      width: 10%;
    }
    100% {
      width: 80%;
    }
  }
  .intro {
    width: 170px;
    margin: 0 auto;
    color: #ddd;
    font-style: italic;
    line-height: 18px;
  }
  .intro a {
    color: #ddd;
  }
  .intro a:hover {
    text-decoration: underline;
  }
  .card-info {
    box-sizing: border-box;
    padding: 0;
    width: 100%;
    position: absolute;
    bottom: -40px;
    left: 0;
    margin: 0 auto;
    padding: 0 50px;
    font-style: 16px;
    line-height: 24px;
    z-index: 20;
    opacity: 0;
    transition: bottom 0.64s, opacity 0.63s cubic-bezier(0.33, 0.66, 0.66, 1);
  }
  .card-info a {
    display: block;
    width: 100px;
    margin: 15px auto;
    background: #fff;
    color: #444;
    padding: 3px 6px;
    border-radius: 2px;
    font-size: 0.8em;
  }
  .card-info a:hover {
    background: #8e7c49;
    color: #fff;
  }
  .card-info a:hover span {
    filter: brightness(10);
    opacity: 1;
  }
  .utility-info {
    position: absolute;
    bottom: 0px;
    left: 0;
    z-index: 20;
    width: 100%;
    text-align: left;
  }
  .utility-info:after {
    content: " ";
    background: url(https://rawcdn.githack.com/Nodws/NodPen/ffad95aa5244b4b09a3c7c1508a018959bbedb7e/postItem/licons.svg)
    center no-repeat;
    background-size: 30px auto;
    display: block;
    opacity: 0.4;
    position: absolute;
    bottom: 25px;
    right: 15px;
    width: 30px;
    height: 15px;
  }
  .utility-info a:hover {
    text-decoration: underline;
  }
  .utility-list {
    list-style-type: none;
    margin: 0 0 10px 20px;
    padding: 0;
    width: 100%;
  }
  .utility-list li {
    margin: 0 5px 0 0;
    padding: 3px 0 15px 0px;
    display: inline-block;
    font-size: 0.8em;
  }
  .licon {
    position: relative;
    width: 23px;
    height: 15px;
    display: inline-block;
    vertical-align: middle;
  }
  .licon:before {
    content: "";
    background: url(https://rawcdn.githack.com/Nodws/NodPen/ffad95aa5244b4b09a3c7c1508a018959bbedb7e/postItem/licons.svg?) -2px -6px
    no-repeat;
    background-size: 250px;
    width: 26px;
    height: 20px;
    display: inline-block;
    vertical-align: middle;
    position: absolute;
    top: -3px;
    left: 0;
  }
  .icon-white {
    filter: brightness(10);
  }
  .icon-black {
    filter: brightness(0);
    opacity: 0.6;
  }
  .icon-like:before {
    background-position: -183px -6px;
  }
  .icon-com:before {
    background-position: -63px -4px;
  }
  .icon-dat:before {
    background-position: -94px -7px;
  }
  .icon-tag:before {
    background-position: -33px -6px;
  }
  @media (max-width: 750px) {
    .utility-info {
      text-align: center;
    }
    .utility-info ul {
      width: 100%;
      margin: 0;
      box-sizing: border-box;
    }
    .utility-info li {
      width: 49%;
      display: inline-block;
      box-sizing: border-box;
      margin: 0;
    }
  }
  @media (max-width: 500px) {
    .utility-info li:last-of-type {
      width: 100%;
    }
    .card-info {
      display: none;
    }
    .blog-card:hover .title-content,
    .title-content {
      margin-top: 30px;
    }
    .blog-card {
      height: 300px;
    }
    .blog-card h3 {
      font-size: 1.3em;
    }
    .intro {
      font-size: 0.8em;
    }
  }
`;
