import React, { useState } from "react";
import styled from "styled-components";
import Search from "../../aadharhomes/Search";
import { Link } from "react-router-dom";
import { TopLocalitesIcon ,LeftArrowIcon ,RightArrowIcon } from "../../Assets/icons";

function SearchBar() {
  const [activeLink, setActiveLink] = useState("Buy");
  const [data, setData] = useState(null);

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
    setData(`${linkName}`);
  };

   const localities = [
    { name: "Sohna Road", link: "/property-in-gurugram/sohna-road/" },
    { name: "Golf Course Road", link: "/property-in-gurugram/golf-course/" },
    { name: "MG Road", link: "/property-in-gurugram/mg-road/" },
    { name: "Northern Peripheral Road", link: "/property-in-gurugram/northern-peripheral-road/" },
    { name: "Dwarka Expressway", link: "/property-in-gurugram/dwarka-expressway/"},
    { name: "New Gurgaon", link: "/property-in-gurugram/new-gurgaon/" },
    { name: "Sohna", link: "/property-in-gurugram/sohna/"},
    { name: "Southern Peripheral Road", link: "/property-in-gurugram/southern-peripheral-road/" },
    { name: "NH-48", link: "/property-in-gurugram/nh-48/"},
    { name: "Golf Course Extn Road", link: "/property-in-gurugram/golf-course-extn-road/" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 6; 
  const nextpage = 1;

  // Determine visible localities
  const visibleLocalities = localities.slice(
    currentIndex,
    currentIndex + itemsPerPage
  );

  const handleNext = () => {
    if (currentIndex + itemsPerPage < localities.length) {
      setCurrentIndex((prev) => prev + nextpage);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - nextpage);
    }
  };


  return (
    <Wrapper className="section">

      <div
        className="qsbWrapper pt-0 px-2 lg:px-10 xl:px-10 md:px-4 sm:px-10 mr-auto ml-auto lg:mr-auto lg:pb-14 md:pb-14 md:ml-auto md:mr-auto sm:mr-4 sm:ml-4 xs:py-2 lg:h-14 md:h-10 sm:h-8 md:-mt-8 lg:mb-0 sm:mb-0 mb-0 md:mb-4 lg:mt-2"
        style={{ maxWidth: '860px', border: '1px solid white', minHeight: "300px", marginTop: '-40px' }}
      >
        <div className="text-center mb-4 text-[#FFFFFF] text-2xl" style={{ fontFamily: 'gluten' }}>
          Find Your Perfect Place to Call Home.
        </div>
        <div className="SJDMls xl:h-12 lg:h-12 md:h-10 sm:h-8 lg:p-0 sm:p-0 md:p-0">
          {["Buy", "Rent", "New Launch", "Commercial", "Land/Plots", "SCO"].map(
            (linkName) => (
              <Link
                key={linkName}
                className={`options hidden sm:block hover:underline hover:underline-offset-8 cursor-pointer whitespace-nowrap ${activeLink === linkName
                    ? "active text-red-500 bg-[#FFFFFF] rounded-t-lg"
                    : "text-[#FFFFFF]"
                  } hover:text-red-500`}
                onClick={() => handleLinkClick(linkName)}
              >
                {linkName}
              </Link>
            )
          )}
        </div>

        <div className="mb-0">
          <Search data1={data} />
        </div>
        <div className="flex justify-start mt-2 flex-nowrap">
          <span className="text-[#FFFFFF]">
            <TopLocalitesIcon /> Top Localities:
          </span>
          <span className="flex flex-nowrap align-center ml-2"> 

          {currentIndex > 0 && (
        <button
          onClick={handlePrev}
        >
          <LeftArrowIcon/>
        </button>
      )}

      {/* Scrollable Localities */}
      <div className=" flex space-x-2 flex-nowrap scrollbar-hide snap-x snap-mandatory">
        {visibleLocalities.map((locality, index) => (
          <Link to={locality.link} target="_blank" key={index} className="cvBMLN">
          <button
            key={index}
            className="SDFEDVx text-white text-[10px] px-2 py-1 border border-white rounded-xl whitespace-nowrap snap-center hover:bg-white hover:text-black transition flex flex-nowrap"
          >
            {locality.name}
          </button>
          </Link>
        ))}
      </div>

      {/* Next Button */}
      {currentIndex + itemsPerPage < localities.length && (
        <button
          onClick={handleNext}
        >
          <RightArrowIcon/>
        </button>
      )}
                </span>

        </div>
      </div>
    </Wrapper>
  );
}

export default SearchBar;

const Wrapper = styled.section`
  font-weight: 400;
  line-height: 1.5;

  div {
    box-sizing: border-box;
  }

  /* Desktop and large screens */
  @media screen and (min-width: 1024px) {
    .qsbWrapper {
      display: flex;
      justify-content: center;
      flex-direction: column;
    }
  }

  /* Tablet screens */
  @media screen and (max-width: 1024px) {
    .SJDMls {
      width: 80%; /* Adjust width for tablet */
    }
  }

  /* Medium screens */
  @media screen and (max-width: 900px) {
    .SJDMls {
      width: 90%; /* Adjust width for medium screens */
    }
  }

  /* Small screens and mobile */
  @media screen and (max-width: 770px) {
    .SJDMls {
      width: 100%;
      flex-wrap: wrap; /* Allow wrapping for better alignment */
      justify-content: center; /* Center the options */
      margin-bottom: 10px; /* Add margin at the bottom */
    }

    .options {
      padding: 9px 15px; /* Reduce padding on smaller screens */
      font-size: 14px; /* Smaller font size for better fit */
    }
  }

  /* Extra small screens (mobile) */
  @media screen and (max-width: 500px) {
    .SJDMls {
      display: flex; /* Show SJDMls on small screens */
      flex-wrap: wrap; /* Allow wrapping */
    }
  }

  .SJDMls {
    display: flex;
    box-shadow: 0 25px 60px rgba(113, 106, 147, 0.2);
    width: auto;
    border-radius: 20px 20px 0px 0px;
    background:rgba(255, 255, 255, 0.21);
    margin-left: 30px;
    margin-right:30px;
  }

  .SDFEDVx {
    background:rgba(255, 255, 255, 0.36);
  }

  .options {
    padding: 9px 30px;
    font-size: 16px;
    transition: color 0.3s ease;
  }

  .options:hover {
    color: red;
  }

  .options.active {
    font-size: 18px;
    color: red;
  }

  .suggestor-wrapper {
    width: 90%;
  }
`;


// import React, { useState } from "react";
// import styled from "styled-components";
// import Search from "../../aadharhomes/Search";
// import { Link } from "react-router-dom";
// function SearchBar() {
//   const [activeLink, setActiveLink] = useState("");
//   const [data, setData] = useState(null);

//   const handleLinkClick = (linkName) => {
//     setActiveLink(linkName);
//     setData(`${linkName}`);
//   };

//   return (
//     <Wrapper className="section">
//       <div
//         className="qsbWrapper pt-2 mr-auto ml-auto lg:mr-auto md:ml-auto md:mr-auto ml:ml-auto sm:mr-4 sm:ml-4  xs:py-2 lg:h-14 md:h-10 sm:h-8"
//         style={{ maxWidth: "800px", marginTop: "110px" }}
//       >

//         <div className="SJDMls xl:h-14 lg:h-14 md:h-8 sm:h-8">
//           {["Buy", "Rent", "New Launch", "Commercial", "Land/Plots", "SCO"].map(
//             (linkName) => (
//               <Link
//                 key={linkName}
//                 className={`options font-semibold hover:underline hover:underline-offset-8 cursor-pointer ${
//                   activeLink === linkName ? "active underline underline-offset-8 text-red-500" : ""
//                 } hover:text-red-500`}
//                 onClick={() => handleLinkClick(linkName)}
//               >

//                 {linkName}
//               </Link>
//             )
//           )}

//         </div>

//         <Search data1={data} />
//       </div>
//     </Wrapper>
//   );
// }

// export default SearchBar;
// const Wrapper = styled.section`
//   font-weight: 400;
//   line-height: 18px;
//   div {
//     box-sizing: border-box;
//   }

//   .qsbWrapper {
//     display: flex;
//     justify-content: center;
//     flex-direction: column;
//   }

//   .SJDMls {
//     display: flex;
//     box-shadow: 0 25px 60px rgba(113, 106, 147, 0.2);
//     width: fit-content;
//     border-radius: 20px 20px 0px 0px;
//     background: #fff;
//     margin-left: 32px;
//   }
//   .options {
//     padding: 9px 30px 13px 30px;
//     font-size: 16px;
//   }
//   // .options:hover {
//   //   font-size: 18px;
//   // }
//   .SJDMls > div:hover {
//     cursor: pointer;
//   }
//   .SJDMls > div.active {
//     font-size: 20px;
//     color: red;
//   }
//   @media screen and (max-width: 500px) {
//     .SJDMls{
//       display: none;
//     }
//   }
//   @media screen and (max-width: 900px) {
//     .qsbWrapper {
//       margin: 8rem auto !important;
//     }
//     @media screen and (max-width: 640px) {
//       .qsbWrapper {
//         margin: 3rem auto !important;
//       }
//     .suggestor-wrapper {
//       width: 90%;
//     }

//   @media screen and (max-width: 500px) {
//     .qsbWrapper {
//       flex-direction: column-reverse;
//       align-items: center;
//     }
//   }
//   @media screen and (max-width: 885px) and (min-width: 860px) {
//     .qsbWrapper .qsb .keywordSugg .suggestor-box {
//       width: 293px;
//     }
//   }
//   @media screen and (max-width: 770px) and (min-width: 750px) {
//     .qsbWrapper .qsb .keywordSugg .suggestor-box {
//       width: 223px;
//     }
//   }
//   @media screen and (max-width: 1200px) and (min-width: 900px) {
//     .qsbWrapper {
//       margin: 10rem auto !important;
//     }
//   }
// `;
