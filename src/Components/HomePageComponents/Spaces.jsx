import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';

function SpacesAvailable() {
  useEffect(() => { AOS.init(); }, []);

  const projects = [
    { title: "Residential Projects", link: "/property/residential/", image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/dream+property/residencialprojects.webp" },
    { title: "Commercial Projects", link: "/projects/commerial/", image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/dream+property/commercialproperty+(1).jpg" },
    { title: "SCO Plots ", link: "/sco/plots/", image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/dream+property/sco.jpg" },
    { title: "Builder & Independent Floor", link: "/projects/independentfloors/", image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/dream+property/builderandindepedent.jpg" },
    { title: "Plots In Gurugram", link: "/plots-in-gurugram/", image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/dream+property/deendayal.webp" },
    { title: "Luxury Villas", link: "/projects/villas/", image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/dream+property/villas.jpg" },
    { title: "Industrial Plots", link: "/signature-global-plots/", image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/dream+property/residential.jpg" },
  ];

  return (

    <Wrapper className="section">
      <div data-aos="flip-up" className="container" style={{ boxShadow: "0px 0px 0px 0px #0000001a" }}>
        <div className="flex items-center mx-3 sm:mx-4 lg:mx-4 xl:mx-14 md:mx-4">
          <h1 className="text-3xl xl:text-4xl lg:text-3xl md:text-2xl sm:text-left pt-4 ">
            Dream Property In The Heart of Gurugram
          </h1>
        </div> 
        <div className="grid  lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 mx-0 gap-3 pb-2 pt-3">
          {projects.slice(0, 3).map((project, index) => (
            <Link data-aos="flip-right" to={project.link} key={index} className="card">
              <img src={project.image} alt={project.title} className="card-image" loading="lazy" />
              <button className="card-button bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800">
                {project.title}
              </button>
            </Link>
          ))}
        </div>

        <div className="grid  lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 mx-0 gap-3 pb-2 pt-3">
          {projects.slice(3).map((project, index) => (
            <Link data-aos="flip-right" to={project.link} key={index + 3} className="card">
              <img src={project.image} alt={project.title} className="card-image" loading="lazy" />
              <button className="card-button bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800">
                {project.title}
              </button>
            </Link>
          ))}
        </div>


      </div>
    </Wrapper>
  );
}

export default SpacesAvailable;
const Wrapper = styled.section`
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
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
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
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-radius: 8px;
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
`;
