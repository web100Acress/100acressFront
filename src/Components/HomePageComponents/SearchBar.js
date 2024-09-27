import React, { useState } from "react";
import styled from "styled-components";
import Search from "../../aadharhomes/Search";
import { Link } from "react-router-dom";
function SearchBar() {
  const [activeLink, setActiveLink] = useState("");
  const [data, setData] = useState(null);

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
    setData(`${linkName}`);
  };

  return (
    <Wrapper className="section">
    <div
      className="qsbWrapper   px-2 lg:px-10 xl:px-10 md:px-4 sm:px-10 mr-auto ml-auto lg:mr-auto   lg:pb-14 md:pb-14 xl:pb-14 md:ml-auto md:mr-auto sm:mr-4 sm:ml-4 xs:py-2 lg:h-14 md:h-10 sm:h-8 md:-mt-8 lg:mb-0 sm:mb-0 mb-0 md:mb-4 lg:mt-2" // Add negative margin on md (tablet) screens
      style={{ maxWidth: "800px" }}
    >
      <div className="SJDMls xl:h-14 lg:h-14 md:h-8 sm:h-8 lg:p-3 sm:p-0 md:p-3">
        {["Buy", "Rent", "New Launch", "Commercial", "Land/Plots", "SCO"].map(
          (linkName) => (
            <Link
              key={linkName}
              className={`options hidden sm:block font-semibold hover:underline hover:underline-offset-8 cursor-pointer whitespace-nowrap ${
                activeLink === linkName
                  ? "active underline underline-offset-8 text-red-500"
                  : ""
              } hover:text-red-500`}
              onClick={() => handleLinkClick(linkName)}
            >
              {linkName}
            </Link>
          )
        )}
      </div>
  
      <div>
        <Search data1={data} />
      </div>
    </div>
  </Wrapper>
  
  );
}

export default SearchBar;
const Wrapper = styled.section`
  font-weight: 400;
  line-height: 0px;

  div {
    box-sizing: border-box;
  }
 @media screen and (min-width: 1024px) {
  .qsbWrapper {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
}
@meadia screen and(min-width:375px){
   .hello{
    font-weight: 400;
    line-height: 1px;
   }
}

  .SJDMls {
    display: flex;
    box-shadow: 0 25px 60px rgba(113, 106, 147, 0.2);
    width: fit-content;
    border-radius: 10px 10px 0px 0px;
    background: #fff;
    margin-left: 0px;
  }

  .options {
    padding: 9px 30px 13px 30px;
    font-size: 16px;
  }

  .SJDMls > div:hover {
    cursor: pointer;
  }

  .SJDMls > div.active {
    font-size: 20px;
    color: red;
  }

  @media screen and (max-width: 1200px) {
    .SJDMls {
      width: 100%; /* Increased to 85% for screens smaller than 1200px */
    }
  }

  @media screen and (max-width: 900px) {
    .SJDMls {
      width: 95%; /* Increased to 95% for screens smaller than 900px */
      
    }
  }

  @media screen and (max-width: 770px) {
    .SJDMls {
      width: 100%; /* Full width for screens smaller than 770px */
    }

     .qsb .keywordSugg .suggestor-box {
      width: 223px;
    }
  }



    .SJDMls {
      width: 100%; /* Full width for mobile screens */
    }

    .suggestor-wrapper {
      width: 90%;
    }
  }

  @media screen and (max-width: 500px) {
    .SJDMls {
      display: none; /* Hide SJDMls on very small screens */
    }

  
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
