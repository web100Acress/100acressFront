import React, { useEffect } from "react";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Cities = () => {
  useEffect(() => { AOS.init(); }, []);

  const cities = [
    {
      title: "Gurugram",
      link: "/projects-in-gurugram/",
      image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/CITIES/GURGAON.webp",
      state: "Haryana"
    },
    {
      title: "Delhi",
      link: "/project-in-delhi/",
      image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/CITIES/DELHI.webp",
      state: "Delhi"
    },
    {
      title: "Noida",
      link: "/project-in-noida/",
      image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/CITIES/NOIDA.webp",
      state: "Uttar Pradesh"
    },
    {
      title: "Goa",
      link: "/project-in-goa/",
      image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/CITIES/GOA.webp",
      state: "Goa"
    },
    {
      title: "Ayodhya",
      link: "/project-in-ayodhya/",
      image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/CITIES/AYODHYA.webp",
      state: "Uttar Pradesh"
    },
    {
      title: "Mumbai",
      link: "/project-in-mumbai/",
      image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/CITIES/MUMBAI.webp",
      state: "Maharashtra"
    },
    {
      title: "Panipat",
      link: "/project-in-panipat/",
      image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/CITIES/panipat.webp",
      state: "Haryana"
    },
    {
      title: "Panchkula",
      link: "/project-in-panchkula/",
      image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/CITIES/PANCHKULA.webp",
      state: "Haryana"
    },
    {
      title: "Kasauli",
      link: "/project-in-kasauli/",
      image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/CITIES/KASULI.webp",
      state: "Himachal Pradesh"
    },
    {
      title: "Sonipat",
      link: "/projects-in-sonipat/",
      image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/CITIES/sonipat-final.webp",
      state: "Haryana"
    },
    {
      title: "Karnal",
      link: "/projects-in-karnal/",
      image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/CITIES/KARNAL.webp",
      state: "Haryana"
    },
    {
      title: "Jalandhar",
      link: "/projects-in-jalandhar/",
      image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/CITIES/JALANDHAR.webp",
      state: "Punjab"
    },
    {
      title: "Pushkar",
      link: "/projects-in-pushkar/",
      image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/CITIES/PUSHKAR.webp",
      state: "Rajasthan"
    },
    {
      title: "Dubai",
      link: "/projects-in-dubai/",
      image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/CITIES/DUBAI.webp",
      state: "UAE"
    },
    {
      title: "See All",
      link: "/all-cities/",
      image: "https://100acress-media-bucket.s3.ap-south-1.amazonaws.com/100acre/CITIES/DUBAI.webp",
      state: "Explore More"
    }
  ];

  return (
    <Wrapper className="section">
      <div className="container">
        <div className="flex items-center justify-between mx-3 sm:mx-4 lg:mx-4 xl:mx-14 md:mx-4">
          <h2 className="text-3xl xl:text-4xl lg:text-3xl md:text-2xl sm:text-left pt-4 text-[#111] font-bold">
            Prime Cities
          </h2>
        </div>

        {/* City Cards Grid */}
        <div className="city-cards-grid">
          {cities.map((city, index) => (
            <div key={index} className={`city-card ${city.title === "See All" ? "see-all-card" : ""}`}>
              <Link to={city.link} className="card-link">
                <div className="card-image-container">
                  {city.title === "See All" ? (
                    <div className="see-all-content">
                      <div className="see-all-icon">→</div>
                      <h3 className="see-all-title">{city.title}</h3>
                      <p className="see-all-subtitle">{city.state}</p>
                    </div>
                  ) : (
                    <>
                      <img 
                        src={city.image} 
                        alt={city.title} 
                        className="card-image" 
                        loading="lazy"
                      />
                      <div className="card-overlay">
                        <div className="city-info">
                          <h3 className="city-name">{city.title}</h3>
                          <p className="city-state">{city.state}</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

export default Cities;

const Wrapper = styled.section`
  .container {
    max-width: 1250px;
    margin: auto;
    padding: 20px;
  }

  .city-cards-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 15px;
    max-width: 1200px;
    margin: 30px auto 0;
    padding: 20px;
  }

  .city-card {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    cursor: pointer;
    border: 1px solid rgba(255, 255, 255, 0.2);
    aspect-ratio: 1;
    height: 200px;
  }

  .city-card:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 15px 35px rgba(229, 62, 62, 0.3);
    border-color: #e53e3e;
  }

  .see-all-card {
    background: #f8f9fa;
    border: 2px solid #e9ecef;
  }

  .see-all-card:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 15px 35px rgba(229, 62, 62, 0.2);
    border-color: #e53e3e;
    background: #ffffff;
  }

  .see-all-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: #333;
    text-align: center;
    padding: 20px;
  }

  .see-all-icon {
    font-size: 48px;
    font-weight: bold;
    margin-bottom: 10px;
    color: #e53e3e;
  }

  .see-all-title {
    font-size: 20px;
    font-weight: bold;
    margin: 0 0 5px 0;
    color: #333;
  }

  .see-all-subtitle {
    font-size: 14px;
    margin: 0;
    color: #666;
    font-weight: 500;
  }

  .card-link {
    text-decoration: none;
    color: inherit;
    display: block;
    height: 100%;
  }

  .card-image-container {
    position: relative;
    height: 100%;
    overflow: hidden;
  }

  .card-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .city-card:hover .card-image {
    transform: scale(1.1);
  }

  .card-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
    padding: 20px 15px 15px;
    transform: translateY(0);
    transition: transform 0.3s ease;
  }

  .city-card:hover .card-overlay {
    transform: translateY(0);
  }

  .city-info {
    text-align: center;
  }

  .city-name {
    color: white;
    font-size: 16px;
    font-weight: bold;
    margin: 0 0 5px 0;
  }

  .city-state {
    color: #e53e3e;
    font-size: 12px;
    margin: 0;
    font-weight: 500;
  }

  /* Mobile Responsive */
  @media (max-width: 1024px) {
    .city-cards-grid {
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
      padding: 15px;
    }

    .city-card {
      height: 180px;
    }
  }

  @media (max-width: 768px) {
    .city-cards-grid {
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      padding: 10px;
    }

    .city-card {
      height: 150px;
    }

    .city-name {
      font-size: 14px;
    }

    .city-state {
      font-size: 11px;
    }
  }

  @media (max-width: 480px) {
    .city-cards-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .city-card {
      height: 140px;
    }
  }
`;

