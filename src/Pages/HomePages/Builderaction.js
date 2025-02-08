// import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
// import AOS from 'aos';
// import 'aos/dist/aos.css';

// function SpacesAvailable() {
//   useEffect(() => { AOS.init(); }, []);

//   const projects = [
//     {
//       title: "Adani Realty - All Projects",
//       link:"developers/adani-realty",
//       image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/builder/adanireality.webp",
//       backgroungURL: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/builder/adaniprojectimage.jpg"
//     },
//     { 
//       title: "M3M India - All Projects", 
//       link: "/developers/m3m-india/", 
//       image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/builder/m3m.webp", 
//       backgroungURL: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/builder/m3mbuilderimage.jpg"
//     },
//     { 
//       title: "Central Park - All Projects", 
//       link: "/developers/central-park/", 
//       image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/builder/centralpark.jpg" ,
//       backgroungURL: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/builder/centralparkprojct.jpg"
//     }
//   ];

//   return (
//     <div data-aos="flip-up" className="px-4" style={{ boxShadow: "0px 0px 0px 0px #0000001a" }}>
//       <div className="flex items-center">
//         <h1 className="text-3xl xl:text-4xl lg:text-3xl md:text-2xl sm:text-left px-10 pt-4">
//           Best For You
//         </h1>
//       </div> 
    
//       <div className="grid  lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 mx-0 gap-3 pb-2 pt-3">
//         {projects.map((project, index) => (
//         <Link
//         to={project.link}
//         data-aos="flip-right"
//         key={index}
//         className="flex items-center gap-1 p-2 rounded-lg shadow-sm relative bg-cover bg-center"
//         style={{
//           backgroundImage: `url(${project.backgroungURL})`,
//         }}
//       >
//         <div className="absolute inset-0 bg-black/30 rounded-lg"></div>
      
//         <div className="relative w-24 h-24 flex items-center justify-center overflow-hidden rounded-full ml-[2rem] border-2 border-gray-200">
//           <img
//             src={project.image}
//             alt="Inside Hole"
//             className="absolute w-20 h-20 bg-white border border-black shadow-sm object-contain rounded-full"
//           />
//         </div>
      
//         {/* Text Content */}
//         <div className="relative z-10 ml-[2rem]" >
//           <h3 className="text-lg font-semibold text-white">{project.title}</h3>
//         </div>
//       </Link>
      
//         ))}
//       </div>
//     </div>
//   );
// }

// export default SpacesAvailable;

import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';
const Builderaction = () => {
  
  useEffect(() => { AOS.init(); }, []);

  const projects = [
        {
          title: "Adani Realty",
          link:"developers/adani-realty",
          image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/builder/adanireality.webp",
          backgroungURL: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/project/zcasashag5pnabbtk9ox"
        },
        { 
          title: "M3M India", 
          link: "/developers/m3m-india/", 
          image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/builder/m3m.webp", 
          backgroungURL: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/builder/m3mbuilderimage.jpg"
        },
        { 
          title: "Central Park", 
          link: "/developers/central-park/", 
          image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/builder/centralpark.jpg" ,
          backgroungURL: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/builder/centralparkprojct.jpg"
        },
        { 
          title: "Experion", 
          link: "/developers/experion-developers/", 
          image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/builder/experion.webp" ,
          backgroungURL: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/project/r1kwr3owxa7nevtqzl3b"
        },
        { 
          title: "Signature", 
          link: "/developers/signature-global/", 
          image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/builder/signature.webp" ,
          backgroungURL: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/project/dhxv9npqtof8mlrwvanx"
        }
      ];
    
  
  return (
    <Wrapper className="section ">
          <div className="container">
          <div className="flex items-center justify-between mx-3 sm:mx-4 lg:mx-4 xl:mx-14 md:mx-4">
          <h1 className="text-3xl xl:text-4xl lg:text-3xl md:text-2xl sm:text-left pt-4 ">
            Best For You 
            </h1>
          </div>
            <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 mx-0 gap-3 pb-2 pt-3">
                    {projects.map((project, index) => (
                      <Link data-aos="flip-up" to={project.link} key={index} className="card">
                        <img src={project.backgroungURL} alt={project.title} className="card-image" />
                        <button className="card-button bg-gradient-to-r from-[#C13B44] via-red-500 to-[#C13B44] hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800">{project.title}

                          <div>
                            View All Projects
                          </div>
                        </button>
                      </Link>
                    ))}
                  </div>
          </div>
        </Wrapper>
  )
}

export default Builderaction;

const Wrapper = styled.section`
  .dffasPL {
    padding-top: 10px;
    padding-bottom: 20px;
  }
      .container {
    max-width: 1250px;
    margin: auto;
    padding: 10px;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .title {
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
  }

  .view-all {
    text-decoration: none;
    font-size: 1rem;
    color: #ff0000;
    font-weight: 600;
  }

  .grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
  }

  .card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    overflow: hidden;
    text-decoration: none;
    background: #fff;
    padding: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
  }

  .card:hover {
    transform: translateY(-5px);
  }

  .card-image {
    width: 200px;
    height: 150px;
    object-fit: fill;
    border-radius: 8px;
  }

  .card-image:hover{
    transform: scale(1.06);
  }

  .card-button {
    width: 100%;
    margin-top: 10px;
    border-radius:10px;
    padding: 10px 0px;
    background-color: #C13B44;
    color: white;
    font-size: 1rem;
    font-weight: bold;
    border: none;
    cursor: pointer;
    text-transform: capitalize;
    transition: background-color 0.3s ease;
  }

  .card-button:hover {
    background-color: #7C1920;
    transform: scale(1.06);
  }

  @media (max-width: 768px) {
    .title {
      font-size: 1.25rem;
    }

    .card-image {
      height: 150px;
    }

    .card-button {
      font-size: 0.9rem;
    }
  }

  .bc-rd-23 {
    border-radius: 23px;
  }

  .bc-rd-15 {
    border-radius: 15px;
  }

  .ft-sz-15 {
    font-size: 15px;
  }

  .ft-sz-30 {
    font-size: 30px;
  }

  .ft-sz-25 {
    font-size: 25px;
  }

  .gdmJO {
    flex-wrap: wrap;
    max-width: 1500px;
    margin-left: auto;
    margin-right: auto;
    justify-content: space-between;
  }

  .cvBMLN {
    width: calc(20% - 20px); /* Adjusted width and margin */
    margin: 10px;
    height: 200px;
    border: 3px solid #eee;
    overflow: hidden;
    position: relative;
    float: left;
    display: inline-block;
    cursor: pointer;
    border-radius: 13px;
    text-align: center;
  }

  .asdDRsfVN {
    height: 100%;
    width: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    -webkit-transition: all 0.5s;
    -moz-transition: all 0.5s;
    -o-transition: all 0.5s;
    transition: all 0.5s;
  }

  .bg-one {
    background-image: url(../../OtherImages/sohnaroad.webp);
    background-position: center;
  }

  .bg-two {
    background-image: url(../../OtherImages/golfcourse.webp);
    background-position: center;
  }

  .bg-three {
    background-image: url(../../OtherImages/mgroad.webp);
    background-position: center;
  }

  .bg-four {
    background-image: url(../../OtherImages/sikanderpur.webp);
    background-position: center;
  }

  .bg-five {
    background-image: url(../../OtherImages/capture1.webp);
    background-position: center;
  }

  .bg-six {
    background-image: url(../../OtherImages/capture2.webp);
    background-position: center;
  }

  .bg-seven {
    background-image: url(../../OtherImages/capture3.webp);
    background-position: center;
  }

  .bg-eight {
    background-image: url(../../OtherImages/bgseven.webp);
    background-position: center;
  }

  .bg-nine {
    background-image: url(../../OtherImages/capture5.webp);
    background-position: center;
  }

  .bg-ten {
    background-image: url(../../OtherImages/capture6.webp);
    background-position: center;
  }
  .bg-one:hover,
  .bg-two:hover,
  .bg-three:hover,
  .bg-four:hover,
  .bg-five:hover,
  .bg-six:hover,
  .bg-seven:hover,
  .bg-eight:hover,
  .bg-nine:hover,
  .bg-ten:hover {
    // filter: grayscale(0.80);
    opacity: 1;
    // filter: brightness(90%);
    filter: gray saturate(0%) brightness(70%) contrast(1000%);
  }

  .cvBMLN:hover .asdDRsfVN,
  .cvBMLN:focus .asdDRsfVN {
    -ms-transform: scale(1.2);
    -moz-transform: scale(1.2);
    -webkit-transform: scale(1.2);
    -o-transform: scale(1.2);
    transform: scale(1.2);
  }

  .cvBMLN p {
    position: absolute;
    bottom: 0px;
    left: 10%;
    right: 10%;
    font-weight: bold;
    color: white;
    transition: 0.5s;
  }

  .cvBMLN:hover p {
    bottom: 35%;
  }

  @media screen and (max-width: 900px) {
    .cvBMLN {
      width: calc(45% - 10px); /* Adjusted width for tablet screens */
    }
  }

  @media screen and (max-width: 425px) {
    .cvBMLN {
      width: 100%;
    }
  }
`;