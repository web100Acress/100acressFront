/** @format */

import React from "react";
import styled from "styled-components";

function BlogSectionMain() {
  return (
    <Wrapper className='section'>
      <header class='site-header'>
      <div className="d-flex justify-content-center">
        <img
          src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/416762/travelog-logo.png'
          alt=''
        />
        </div>
      </header>

      <div class='main'>
        <div class='container main-container'>
          <div class='blog-item blog-item1'>
            <div class='blog-item-image'></div>
            <div class='blog-item-content'>
              <h1>A trip to space?</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque
                reprehenderit dolorum, saepe. Eum laboriosam nemo doloribus,
                quibusdam quis, dignissimos inventore doloremque.
              </p>
            </div>
          </div>

          <div class='blog-item blog-item2'>
            <div class='blog-item-image'></div>
            <div class='blog-item-content'>
              <h1>The Scottish Highlands</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque
                reprehenderit dolorum, saepe. Eum laboriosam nemo doloribus,
                quibusdam quis, dignissimos inventore doloremque.
              </p>
            </div>
          </div>

          <div class='blog-item blog-item3'>
            <div class='blog-item-image'></div>
            <div class='blog-item-content'>
              <h1>Kayaking Holidays</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque
                reprehenderit dolorum, saepe. Eum laboriosam nemo doloribus,
                quibusdam quis, dignissimos inventore doloremque.
              </p>
            </div>
          </div>
          <div class='blog-item blog-item4'>
            <div class='blog-item-image blog-item-image4'></div>
            <div class='blog-item-content'>
              <h1>New York New York</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque
                reprehenderit dolorum, saepe. Eum laboriosam nemo doloribus,
                quibusdam quis, dignissimos inventore doloremque.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum
                dolorem, at. Quis at in, voluptas consequatur! Facere quibusdam,
                tenetur dicta pariatur animi earum, deleniti consequatur,
                incidunt iure, odit unde nesciunt iusto iste.
              </p>

              <div class='blog_post_image_grid'>
                <img
                  src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/416762/newyork1.jpg'
                  alt=''
                />
                <img
                  class='new_york_image_two'
                  src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/416762/newyork2.jpg'
                  alt=''
                />
                <img
                  src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/416762/newyork3.jpg'
                  alt=''
                />
                <img
                  src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/416762/newyork4.jpg'
                  alt=''
                />
                <img
                  src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/416762/newyork5.jpg'
                  alt=''
                />
                <img
                  src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/416762/newyork6.jpg'
                  alt=''
                />
                <img
                  src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/416762/newyork7.jpg'
                  alt=''
                />
                <img
                  src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/416762/newyork8.jpg'
                  alt=''
                />
              </div>
            </div>
          </div>

          <div class='blog-item blog-item5'>
            <div class='blog-item-image'></div>
            <div class='blog-item-content'>
              <h1>The sun has set</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque
                reprehenderit dolorum, saepe. Eum laboriosam nemo doloribus,
                quibusdam quis, dignissimos inventore doloremque.
              </p>
            </div>
          </div>

          <div class='blog-item blog-item6'>
            <div class='blog-item-image'></div>
            <div class='blog-item-content'>
              <h1>Time for a beer</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque
                reprehenderit dolorum, saepe. Eum laboriosam nemo doloribus,
                quibusdam quis, dignissimos inventore doloremque.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default BlogSectionMain;
const Wrapper = styled.section`
$blue: #050538;

body {
font-family: 'Open Sans', sans-serif;
background-color: #faf9f5;
}

img {
max-width:100%;
height: auto;
}

h1 {
font-weight: 200;  
}

p {
    font-size: 17px;
    line-height: 28px;  
   color: $blue;
}

.container  {
max-width:1200px;
margin: 0 auto;
}

.site-header {
background-color: #fff;  
text-align: center;
padding-top: 55px;
  .main-nav {
  border-top:6px solid $blue;  
  border-bottom:6px solid $blue;   
  margin-top: 46px;
    ul {
    display:flex;
    list-style:none;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;
       li {
         &:last-child a {
         border-right:none;  
         }
          a {
         color: $blue;
         text-decoration: none;
         text-transform: uppercase;
         font-size: 18px;
         font-weight: 200;
         letter-spacing:0.08em;
         display: inline-block;
         padding: 19px 45px;
         transition: 0.3s all ease;
         border-right:1px solid #050538;
            &:hover {
            background-color: #050538;
            color: #fff;
            }
         }
      }
    }
  }
}

.burger_icon {
  position: absolute;
  right: 2%;
  top: 8%;
  .line_one, .line_two, .line_three {
  width: 40px;
  height: 4px;
  background-color: $blue;
  margin-bottom: 4px;
  }
}

.main {
padding-top: 40px;  
padding-bottom: 40px;
}

.main-container {
display:grid;  
grid-template-columns: 1fr 1fr 1fr;
grid-gap: 30px;
  .blog-item {
  border:1px solid #ddd;
  background-color: #fff;
  border-radius:3px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  overflow:hidden;
    .blog-item-image {
    height: 220px;
    background-position: center center;
    background-repeat: no-repeat;
    background-size:cover;
    border-bottom:3px solid $blue;
    overflow:hidden;
    }
    .blog-item-content {
    padding: 15px;
    text-align: center;
      h1 {
      margin-left: -15px;
      margin-right: -15px;
      color: #050538;
      }
    }
  }
}

.blog-item4 {
grid-column: 1 / span 2;
grid-row: 2 / span 2;
}

.blog-item-image4 {
height: 400px !important;  
}

.blog-item1 .blog-item-image {
    background-image: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/416762/astronaut-600.jpg');  
}

.blog-item2 .blog-item-image {
    background-image: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/416762/scottish-highlands.jpg');  
}

.blog-item3 .blog-item-image {
background-image: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/416762/kayaker.jpg');  
}

.blog-item4 .blog-item-image {
background-image: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/416762/newyork.jpg');  
}

.blog-item5 .blog-item-image {
background-image: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/416762/sunset.jpg');  
}

.blog-item6 .blog-item-image {
background-image: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/416762/beer.jpg');  
}

footer {
background-color: $blue;
text-align: center;
padding: 20px 0;
  p {
  margin: 0; 
  color: #fff;
  font-weight: 200;
  }
}

.blog_post_image_grid {
display:grid;  
grid-template-columns: 1fr 1fr 1fr 1fr;
grid-gap:5px;
  img {
  padding: 5px;

  border:1px solid #ddd;
  }
}

// MEDIA QUERIES

@media screen and (max-width:1100px) {
  .site-header .main-nav ul li a {
  padding: 15px 30px;
  }
}

@media screen and (max-width:915px) {
  .site-header .main-nav ul {
  flex-direction: column;
  }
  .site-header .main-nav ul li {
  width: 100%;  
  }
  .site-header .main-nav ul li a {
  border:none;
  border-bottom:1px solid $blue;
  width: 100%;
  padding-left: 0;
  padding-right: 0;
  }
}

@media screen and (max-width:1245px) {
    .main-container {
    margin: 0 15px;  
    }
}

@media screen and (max-width:1010px) {
    .main-container {
    margin: 0 15px;  
    grid-template-columns: 1fr 1fr;
    }
    .blog-item6 {
    grid-column: 1 / span 2;
    }
}

@media screen and (max-width:914px) {
  
  .main-nav {
  display: none;
  }
  .site-header {
  padding-top: 55px;
  padding-bottom: 35px;
  border-bottom:1px solid #eee;
  position: relative;
  }

}

@media screen and (max-width:650px) {
    .main-container {
    grid-template-columns: 1fr;
    }
    .blog-item {
    grid-column: auto;
    }
    .site-header {
    padding-left:15px;
    padding-right: 15px;
    }
}
`;
