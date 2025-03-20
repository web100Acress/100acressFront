import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { DataContext } from '../../MyContext';
import { Skeleton } from 'antd';
import AOS from 'aos';
import { ForwardIcon, BackwardIcon, SpotlightLocationIcon, SpotlightPriceIcon, SpotlightHomeIcon } from "../../Assets/icons";
import { Link } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
`;

const GalleryWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* Default to 4 columns for large screens */
  gap: 1rem;
  width: 100%;
  padding: 1rem;

  /* Make it responsive */
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr); /* 2 columns for tablet screens */
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr; /* 1 column for mobile screens */
  }
`;




const ImageWrapper = styled.div`
position: relative;
height: 450px;
overflow: hidden;
transition: transform 0.5s ease-in-out;
cursor: pointer;
// padding: 1rem;

&:hover img {
    opacity: 0.7;
    scale:1.2;
  }
  
  &:hover .overlay {
    opacity: 1;
    visibility: visible;
    }
    `;

const Image = styled.img`
    width: 100%; /* Take the full width of the container */
    height: 100%; /* Take the full height of the container */
    object-fit: cover;
    transition: all 0.5s ease;
    transform-origin: center;
  
    &:hover {
      opacity: 1;
      transition: all 2s ease-in-out;
      }
      `;

const CityText = styled.div`
    position: relative;
    left: 0rem; 
    top: -13%;
    display:flex;
    justify-content: center;
    transform: rotate(0deg); /* Centers text vertically */
    color: white;
    text-transform: uppercase;
    visibility:hidden;
    background-color:rgba(0, 0, 0, 0.6);
    ${ImageWrapper}:hover & {
      opacity: 1;
      visibility:visible;
      color: white;
      top: -35%;
      transition:1s ease-in-out;
    }
  `;
const Overlay = styled.div`
  position: absolute;
  inset: 0;
  // background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.5));
 
  opacity: 0;
  visibility:hidden;
  transition: opacity 0.2s ease, visibility 0.2s ease;
`;

const InfoContainer = styled.div`
  position: absolute;
  bottom: 10%;
  left: 5%;
  color: white;
  font-size: 1.2rem;
  transform:skewY(-5deg);
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.3s ease, visibility 0.3s ease;

  ${ImageWrapper}:hover & {
    visibility: hidden;
    opacity: 1;
  }
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 20px 0;
  
  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #d6d6d6;
    cursor: not-allowed;
  }
`;

const ImageGallery = React.memo(() => {
  const { spotlight } = useContext(DataContext);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [columnsPerPage, setColumnsPerPage] = useState(4);


  useEffect(() => {
    // Initialize AOS for animations
    AOS.init();

    // Set columns per page based on window width
    const updateColumnsPerPage = () => {
      if (window.innerWidth <= 600) {
        setColumnsPerPage(1); // Phone
      } else if (window.innerWidth <= 1200) {
        setColumnsPerPage(2); // Tablet
      } else {
        setColumnsPerPage(4); // Desktop
      }
    };

    updateColumnsPerPage();
    window.addEventListener('resize', updateColumnsPerPage);

    // Cleanup on unmount
    return () => window.removeEventListener('resize', updateColumnsPerPage);
  }, []);

  if (!spotlight || spotlight.length === 0) {
    return <Skeleton />;
  }

 
  const handleNext = () => {
    if (visibleIndex + columnsPerPage < spotlight.length) {
      setVisibleIndex(visibleIndex + columnsPerPage);
    }
  };

  const handlePrev = () => {
    if (visibleIndex - columnsPerPage >= 0) {
      setVisibleIndex(visibleIndex - columnsPerPage);
    }
  };

  const truncateText = (text, wordLimit) => {
    const words = text.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
  };

  

  const visibleImages = spotlight.slice(visibleIndex, visibleIndex + columnsPerPage);

  return (
    <div className="rounded-tl-3xl rounded-tr-3xl bg-white">
      <div className="flex items-center justify-between mx-6 lg:mx-6 xl:mx-14 md:mx-6 pt-3">
        <h1 className="text-lg  xl:text-4xl lg:text-3xl md:text-3xl sm:text-xl">
          100acress - Recommended
        </h1>
        <div>
          <span className="mr-4" onClick={handlePrev} disabled={visibleIndex === 0}>
            <BackwardIcon />
          </span>
          <span onClick={handleNext} disabled={visibleIndex + columnsPerPage >= spotlight.length}>
            <ForwardIcon />
          </span>
        </div>
      </div>
      <div>
        <GalleryWrapper>
          {visibleImages.map((image, index) => (
            // let pUrl = `${image.project_url}`;
            <Link to={`/${image.project_url}/`} target="blank">

              <ImageWrapper key={index}>
                <Image
                  src={image.frontImage.url}
                  alt={`image-${index}`}
                  className="relative w-full h-full object-contain rounded-lg animate-fadeInLeft"
                  loading="lazy"
                />
                <Overlay className="overlay" />
                <InfoContainer>

                  <p className="text-[1rem] -mb-6 text-white-800 flex items-center">
                    <SpotlightHomeIcon />
                    {image?.BhK_Details.length === 1
                      ? image?.BhK_Details[0]?.bhk_type
                      : `${image?.BhK_Details[image?.BhK_Details.length - 1]?.bhk_type}`}
                  </p>

                  <p className="text-[1rem] mb-0 text-white-800 flex items-center">
                    <SpotlightPriceIcon />
                    {image?.minPrice} - {image?.maxPrice} Cr
                  </p>

                  <p className="font-semibold mt-2 mb-0 text-gray-800"></p>
                  <button className="text-white bg-gradient-to-r from-[#C13B44] via-red-500 to-[#C13B44] hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-xs px-4 py-1.5 drip-effect w-full md:w-auto   flex justify-center items-center" >View Details</button>
                </InfoContainer>
                <CityText className="pt-3 pb-3 text-xl visible font-Sans">{image.projectName}</CityText>

                <CityText className="">{truncateText(image.projectAddress, 4)}</CityText>
                <CityText className="pb-4 pt-3"><button className="text-white bg-gradient-to-r from-[#C13B44] via-red-500 to-[#C13B44] hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-xs px-6 py-2 drip-effect w-full md:w-auto   flex justify-center items-center md:auto sm:w-1/2 max-[600px]:w-2/4 " >View Details</button>
                </CityText>
                {/* <CityText>{image.city}</CityText> */}
              </ImageWrapper>
            </Link>
          ))}
        </GalleryWrapper>
      </div>
    </div>
  );
});

export default ImageGallery;
