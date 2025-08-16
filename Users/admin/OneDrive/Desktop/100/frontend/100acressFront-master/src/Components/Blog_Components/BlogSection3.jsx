import React from "react";
import styled from "styled-components";

function BlogSection3() {
  return (
    <Wrapper className='section'>
      <div class='container'>
      <h1>Featured Articles</h1>
        <div class='row'>
          <div class='col-md-4'>
            <div class='blog-card blog-card-blog'>
              <div class='blog-card-image'>
                <a href='#'>
                  {" "}
                  <img
                    class='img'
                    src='https://picsum.photos/id/1084/536/354?grayscale'
                  />{" "}
                </a>
                <div class='ripple-cont'></div>
              </div>
              <div class='blog-table'>
                <h6 class='blog-category blog-text-success'>
                  <i class='far fa-newspaper'></i> News
                </h6>
                <h4 class='blog-card-caption'>
                  <a href='#'>
                    Lorem Ipsum is simply dummy text of the printing and
                  </a>
                </h4>
                <p class='blog-card-description'>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>
                <div class='ftr'>
                  <div class='author'>
                    <a href='#'>
                      {" "}
                      <img
                        src='https://picsum.photos/id/1005/5760/3840'
                        alt='...'
                        class='avatar img-raised'
                      />{" "}
                      <span>Lorem</span>{" "}
                    </a>
                  </div>
                  <div class='stats'>
                    {" "}
                    <i class='far fa-clock'></i> 10 min{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class='col-md-4'>
            <div class='blog-card blog-card-blog'>
              <div class='blog-card-image'>
                <a href='#'>
                  {" "}
                  <img
                    class='img'
                    src='https://picsum.photos/id/1084/536/354?grayscale'
                  />{" "}
                </a>
                <div class='ripple-cont'></div>
              </div>
              <div class='blog-table'>
                <h6 class='blog-category blog-text-success'>
                  <i class='fas fa-blog'></i> News
                </h6>
                <h4 class='blog-card-caption'>
                  <a href='#'>
                    Lorem Ipsum is simply dummy text of the printing and
                  </a>
                </h4>
                <p class='blog-card-description'>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>
                <div class='ftr'>
                  <div class='author'>
                    <a href='#'>
                      {" "}
                      <img
                        src='https://picsum.photos/id/1005/5760/3840'
                        alt='...'
                        class='avatar img-raised'
                      />{" "}
                      <span>Lorem</span>{" "}
                    </a>
                  </div>
                  <div class='stats'>
                    {" "}
                    <i class='far fa-clock'></i> 10 min{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class='col-md-4'>
            <div class='blog-card blog-card-blog'>
              <div class='blog-card-image'>
                <a href='#'>
                  {" "}
                  <img
                    class='img'
                    src='https://picsum.photos/id/1084/536/354?grayscale'
                  />{" "}
                </a>
                <div class='ripple-cont'></div>
              </div>
              <div class='blog-table'>
                <h6 class='blog-category blog-text-success'>
                  <i class='far fa-newspaper'></i> News
                </h6>
                <h4 class='blog-card-caption'>
                  <a href='#'>
                    Lorem Ipsum is simply dummy text of the printing and
                  </a>
                </h4>
                <p class='blog-card-description'>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>
                <div class='ftr'>
                  <div class='author'>
                    <a href='#'>
                      {" "}
                      <img
                        src='https://picsum.photos/id/1005/5760/3840'
                        alt='...'
                        class='avatar img-raised'
                      />{" "}
                      <span>Lorem</span>{" "}
                    </a>
                  </div>
                  <div class='stats'>
                    {" "}
                    <i class='far fa-clock'></i> 10 min{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default BlogSection3;
const Wrapper = styled.section`
h1{
    text-align:center;
    margin-bottom:50px;
    margin-top:50px;
  }
  .blog-card-blog {
      margin-top: 30px;
  }
  .blog-card {
      display: inline-block;
      position: relative;
      width: 100%;
      margin-bottom: 30px;
      border-radius: 6px;
      color: rgba(0, 0, 0, 0.87);
      background: #fff;
      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
  }
  .blog-card .blog-card-image {
      height: 60%;
      position: relative;
      overflow: hidden;
      margin-left: 15px;
      margin-right: 15px;
      margin-top: -30px;
      border-radius: 6px;
      box-shadow: 0 16px 38px -12px rgba(0, 0, 0, 0.56), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2);
  }
  .blog-card .blog-card-image img {
      width: 100%;
      height: 100%;
      border-radius: 6px;
      pointer-events: none;
  }
  .blog-card .blog-table {
      padding: 15px 30px;
  }
  .blog-table {
      margin-bottom: 0px;
  }
  .blog-category {
      position: relative;
      line-height: 0;
      margin: 15px 0;
  }
  .blog-text-success {
      color: #28a745!important;
  }
  .blog-card-blog .blog-card-caption {
      margin-top: 5px;
  }
  .blog-card-caption {
      font-weight: 700;
      font-family: "Roboto Slab", "Times New Roman", serif;
  }
  .fa {
      display: inline-block;
      font: normal normal normal 14px/1 FontAwesome;
      font-size: inherit;
      text-rendering: auto;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
  }
  .blog-card-caption, .blog-card-caption a {
      color: #333;
      text-decoration: none;
  }
  
  p {
      color: #3C4857;
  }
  
  p {
      margin-top: 0;
      margin-bottom: 1rem;
  }
  .blog-card .ftr {
      margin-top: 15px;
  }
  .blog-card .ftr .author {
      color: #888;
  }
  
  .blog-card .ftr div {
      display: inline-block;
  }
  .blog-card .author .avatar {
      width: 36px;
      height: 36px;
      overflow: hidden;
      border-radius: 50%;
      margin-right: 5px;blog-
  }
  .blog-card .ftr .stats {
      position: relative;
      top: 1px;
      font-size: 14px;
  }
  .blog-card .ftr .stats {
      float: right;
      line-height: 30px;
  }
`;
