import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SearchIcon } from "../Assets/icons";
import AOS from 'aos';
import styled, { keyframes } from "styled-components";
import 'aos/dist/aos.css';
import { useMediaQuery } from "@chakra-ui/react";


const Search = ({ data1 }) => {
  const [formData, setFormData] = useState({
    location: "",
    query: "",
    collectionName: data1,
  });
  const [isSmallerThan440] =  useMediaQuery("(max-width: 500px)");

  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      collectionName: data1,
    }));
  }, [data1]);

    useEffect(() => {
      AOS.init();
    }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      document.getElementById("searchButton").click();
    }
  };

  const placeholders = [
    'Search "Villas"',
    'Search "3 BHK Ready To Move Flat For Sale In Gurgaon"',
    'Search "Best Properties"',
    'Search "Delhi NCR"',
    'Search "3 BHK Flats in Gurgaon"',
    'Search "Commercial Space For Sale In Gurgaon"',
  ];

  const [currentPlaceholder, setCurrentPlaceholder] = useState(placeholders[0]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentPlaceholder((prev) => {
        const currentIndex = placeholders.indexOf(prev);
        const nextIndex = (currentIndex + 1) % placeholders.length;
        return placeholders[nextIndex];
      });
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Wrapper className="section">
    <div
      data-aos="fade-UP"
      data-aos-easing="linear"
      data-aos-duration="1500"
      className={`w-full max-w-[860px] mx-auto -mt-2 shadow-xl rounded-full bg-white h-14 lg:w-[48rem] flex items-center justify-center`}
      style={{
        marginBottom: 0,
        borderRadius: window.innerWidth < 640 ? "30px" : "30px",
        // Shift slightly to the right on very small screens to avoid hamburger overlap
        marginLeft: isSmallerThan440 ? '44px' : undefined,
        marginRight: isSmallerThan440 ? '12px' : undefined,
      }}
    >
      <div
        className="flex items-center w-full px-3 md:px-4 gap-2"
      >
        <input
          className="outline-none flex-grow p-2 rounded-full"
          type="text"
          name="query"
          placeholder={currentPlaceholder}
          value={formData.query}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <Link
          to={{
            pathname: `/searchdata/${encodeURIComponent(
              JSON.stringify(formData)
            )}`,
            state: formData,
          }}
          id="searchButton"
        >
          { !isSmallerThan440 &&

            <div className="px-2.5 md:px-5 py-2.5 text-white rounded-full flex items-center justify-center gap-1 ">
          <StyledLink href='#'>
            <Text className="hidden sm:block text-xs">
              <span>
              <SearchIcon style={{ width: '10px', height: '10px' }} />{" "}
              </span>
              Search
              </Text>
              <Liquid className="liquid"/>
              </StyledLink>
          </div>
          }
          { isSmallerThan440 &&

          <div className="px-2.5 mr-2 md:px-5 py-2.5 text-white rounded-full flex items-center justify-center gap-1 ">
          <StyledLink href='#'>
            <Text className="text-xs">
              Search
              </Text>
              <Liquid className="liquid"/>
              </StyledLink>
          </div>
          }
        </Link>
      </div>
    </div>
    </Wrapper>
  );
};

export default Search;

const Wrapper = styled.section`
  
`;

const animate = keyframes`
  0% {
    transform: translate(-25%, -75%) rotate(0);
  }
  100% {
    transform: translate(-25%, -75%) rotate(360deg);
  }
`;

const StyledLink = styled.a`
  font:  2px !important ;
  color: #C13B44;
  text-decoration: none;
  padding: 6px 12px;
  position: relative;
  overflow: hidden;
  border-radius: 20px;
  transition: 0.2s;
  transform: scale(1.5);

  &:hover {
    box-shadow: 0 0 5px #EE1C25, inset 0 0 5px #C13B44;
    transition-delay: 0.2s;
  }

  &:hover .liquid {
    top: -40px;
  }
`;

const Text = styled.span`
  size : 3px !important;
  position: relative;
  z-index: 0;
  color: #fff;
`;

const Liquid = styled.div`
  position: absolute;
  top: -12px;
  left: 0;
  width: 100%;
  height: 100px;
  background: #C13B44;
  box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.7);
  z-index: -1;
  transition: 0.6s;

  &::after,
  &::before {
    position: absolute;
    content: "";
    width: 200%;
    height: 200%;
    top: 0;
    left: 0;
    transform: translate(-25%, -75%);
  }

  &::after {
    border-radius: 45%;
    background: #C13B44;
    box-shadow: 0 0 10px 5px #C13B44, inset 0 0 5px #C13B44;
    animation: ${animate} 5s linear infinite;
    opacity: 0.8;
  }

  &::before {
    border-radius: 40%;
    box-shadow: 0 0 10px rgba(26, 26, 26, 0.5), inset 0 0 5px rgba(26, 26, 26, 0.5);
    background: rgba(26, 26, 26, 0.5);
    animation: ${animate} 7s linear infinite;
  }
`;
