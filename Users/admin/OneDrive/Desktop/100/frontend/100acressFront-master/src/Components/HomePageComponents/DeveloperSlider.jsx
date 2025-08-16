// /** @format */

// import React from "react";
// import styled from "styled-components";

// function DeveloperSlider() {
//   return (
//     <Wrapper className='section'>
//       <div class='slider'>
//         <div class='slide-track'>
//           <div class='slide'>
//             <img
//               src='../../BuilderImage/elaan.png'
//               height='100'
//               width='250'
//               alt=''
//             />
//           </div>
//           <div class='slide'>
//             <img
//               src='../../BuilderImage/emaar.png'
//               height='100'
//               width='250'
//               alt=''
//             />
//           </div>
//           <div class='slide'>
//             <img
//               src='../../BuilderImage/bptp.png'
//               height='100'
//               width='250'
//               alt=''
//             />
//           </div>
//           <div class='slide'>
//             <img
//               src='../../BuilderImage/m3m.png'
//               height='100'
//               width='250'
//               alt=''
//             />
//           </div>
//           <div class='slide'>
//             <img
//               src='../../BuilderImage/bestech.png'
//               height='100'
//               width='250'
//               alt=''
//             />
//           </div>
//           <div class='slide'>
//             <img
//               src='../../BuilderImage/dlf.png'
//               height='100'
//               width='250'
//               alt=''
//             />
//           </div>
//           <div class='slide'>
//             <img
//               src='../../BuilderImage/adani.png'
//               height='100'
//               width='250'
//               alt=''
//             />
//           </div>
//           <div class='slide'>
//             <img
//               src='../../BuilderImage/orris.png'
//               height='100'
//               width='250'
//               alt=''
//             />
//           </div>
//           <div class='slide'>
//             <img
//               src='../../BuilderImage/godrej.png'
//               height='100'
//               width='250'
//               alt=''
//             />
//           </div>
//           <div class='slide'>
//             <img
//               src='../../BuilderImage/krisumi.png'
//               height='100'
//               width='250'
//               alt=''
//             />
//           </div>
//           <div class='slide'>
//             <img
//               src='../../BuilderImage/spaze.png'
//               height='100'
//               width='250'
//               alt=''
//             />
//           </div>
//           <div class='slide'>
//             <img
//               src='../../BuilderImage/raheja.png'
//               height='100'
//               width='250'
//               alt=''
//             />
//           </div>
//           <div class='slide'>
//             <img
//               src='../../BuilderImage/central.png'
//               height='100'
//               width='250'
//               alt=''
//             />
//           </div>
//           <div class='slide'>
//             <img
//               src='../../BuilderImage/puri.png'
//               height='100'
//               width='250'
//               alt=''
//             />
//           </div>
//           <div class='slide'>
//             <img
//               src='../../BuilderImage/paras.png'
//               height='100'
//               width='250'
//               alt=''
//             />
//           </div>
//           <div class='slide'>
//             <img
//               src='../../BuilderImage/vatika.png'
//               height='100'
//               width='250'
//               alt=''
//             />
//           </div>
//           <div class='slide'>
//             <img
//               src='../../BuilderImage/aipl.png'
//               height='100'
//               width='250'
//               alt=''
//             />
//           </div>
//           <div class='slide'>
//             <img
//               src='../../BuilderImage/ambience.png'
//               height='100'
//               width='250'
//               alt=''
//             />
//           </div>
//           <div class='slide'>
//             <img
//               src='../../BuilderImage/tata.png'
//               height='100'
//               width='250'
//               alt=''
//             />
//           </div>
//           <div class='slide'>
//             <img
//               src='../../BuilderImage/mahindra.png'
//               height='100'
//               width='250'
//               alt=''
//             />
//           </div>
//         </div>
//       </div>
//     </Wrapper>
//   );
// }

// export default DeveloperSlider;
// const Wrapper = styled.section`
// body {
// 	align-items: center;
// 	background: #E3E3E3;
// 	display: flex;
// 	height: 100vh;
// 	justify-content: center;
// }

// @keyframes scroll {
// 	0% { transform: translateX(0); }
// 	100% { transform: translateX(calc(-250px * 7))}
// }

// // Styling
// .slider {
// 	background: white;
// 	// box-shadow: 0 10px 20px -5px rgba(0, 0, 0, .125);

// 	height: 100px;
// 	margin:auto;
// 	overflow:hidden;
// 	position: relative;
// 	width: 100%;

// 	&::before,
// 	&::after {
// 		background: linear-gradient(to right,  rgba(255,255,255,1) 40%,rgba(255,255,255,0) 100%);
// 		content: "";
// 		height: 100px;
// 		position: absolute;
// 		width: 200px;
// 		z-index: 2;
// 	}

// 	&::after {
// 		right: 0;
// 		top: 0;
// 		transform: rotateZ(180deg);
// 	}

// 	&::before {
// 		left: 0;
// 		top: 0;
// 	}

// 	.slide-track {
// 		animation: scroll 40s linear infinite;
// 		display: flex;
// 		width: calc(250px * 14);
// 	}

// 	.slide {
// 		height: 100px;
// 		width: 250px;
// 	}
// }
// `;

import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

function DeveloperSlider() {
  const [logos, setLogos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://acre.onrender.com/project/viewAll"
        );
        console.log(res.data.data, "dfdfds");
        setLogos(res.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Wrapper className="section">
      <div class="slider">
        <div className="slide-track">
          {logos.map((logo, index) => (
            <div className="slide">
              <img
                key={index}
                src={logo.logo.url}
                height="100"
                width="250"
                alt=""
              />
            </div>
          ))}
        </div>
      </div>
    </Wrapper>
  );
}

export default DeveloperSlider;
const Wrapper = styled.section`
  body {
    align-items: center;
    background: #e3e3e3;
    display: flex;
    height: 100vh;
    justify-content: center;
  }

  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(calc(-250px * 7));
    }
  }

  // Styling
  .slider {
    background: white;
    // box-shadow: 0 10px 20px -5px rgba(0, 0, 0, .125);

    height: 100px;
    margin: auto;
    overflow: hidden;
    position: relative;
    width: 100%;

    &::before,
    &::after {
      background: linear-gradient(
        to right,
        rgba(255, 255, 255, 1) 40%,
        rgba(255, 255, 255, 0) 100%
      );
      content: "";
      height: 100px;
      position: absolute;
      width: 200px;
      z-index: 2;
    }

    &::after {
      right: 0;
      top: 0;
      transform: rotateZ(180deg);
    }

    &::before {
      left: 0;
      top: 0;
    }

    .slide-track {
      animation: scroll 40s linear infinite;
      display: flex;
      width: calc(250px * 14);
    }

    .slide {
      height: 100px;
      width: 250px;
    }
  }
`;
