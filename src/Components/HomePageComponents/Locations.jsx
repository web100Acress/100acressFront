// import React from 'react'
// import { styled } from 'styled-components';
// import {ScrollingCarousel } from '@trendyol-js/react-carousel';

// function Locations() {
//     let locations=["Golf Course Extension Road","M.G Road","Saket Road","Cyber Hub","Manesar","Dwarka ExpressWay","Gurgaon Sec 45","Gurgaon sec 30","Gurgaon sec 98","Gurgaon sec 72","Wazirabad","Badshahpur","Gurgaon Phase 2"];
//   return (
//     <Wrapper className="section">
//      <div style={{width:"95%",borderRadius:"15px"}} className='d-flex mt-5 mx-auto dafLcmJ'>
//       <div className="d-flex align-items-center ml-2 p-2">
//          <div className="flex1 dsdwDD">
//             <div>Popular Locations</div>
//          </div>
//          <div className="flex1 ffsf">
//          <ScrollingCarousel>
//            {locations.map((item)=>{
//             return <div className='_dhgN'>{item}</div>
//            })}
//         </ScrollingCarousel>
//          </div>
//       </div>
//       </div>
//     </Wrapper>
//   )
// }

// export default Locations;

// const Wrapper=styled.section`
// .ffsf{
//     width:710px;
//     cursor:pointer;
// }
// ._dhgN{
//     background-color:rgba(245,245,245,0.9);
// }
// .ffsf>._dhgN:hover{
//   background-color:red;
// }
// .dafLcmJ{
//   margin-top:2px !important;
//   overflow:hidden;
// }
// ._dhgN{
//     padding:2px 17px;
//     border-radius:8px;
//     margin:0px 8px;
//     font-weight:300;
//     font-size:medium;
import React from 'react'
import { styled } from 'styled-components';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

function Locations() {
    let locations=["Golf Course Extension Road","M.G Road","Saket Road","Cyber Hub","Manesar","Dwarka ExpressWay","Gurgaon Sec 45","Gurgaon sec 30","Gurgaon sec 98","Gurgaon sec 72","Wazirabad","Badshahpur","Gurgaon Phase 2"];
  return (
    <Wrapper className="section">
     <div style={{width:"95%",borderRadius:"15px"}} className='d-flex mt-5 mx-auto dafLcmJ'>
      <div className="d-flex align-items-center ml-2 p-2">
         <div className="flex1 dsdwDD">
            <div>Popular Locations</div>
         </div>
         <div className="flex1 ffsf">
          <Carousel
            swipeable
            draggable
            arrows={false}
            infinite
            autoPlay
            autoPlaySpeed={2000}
            keyBoardControl
            containerClass="locations-carousel"
            responsive={{
              desktop: { breakpoint: { max: 3000, min: 1024 }, items: 5 },
              tablet: { breakpoint: { max: 1024, min: 640 }, items: 3 },
              mobile: { breakpoint: { max: 640, min: 0 }, items: 2 }
            }}
          >
            {locations.map((item)=> (
              <div className='_dhgN' key={item}>{item}</div>
            ))}
          </Carousel>
        </div>
      </div>
      </div>
    </Wrapper>
  )
}

export default Locations;

const Wrapper=styled.section`
.ffsf{
    width:710px;
    cursor:pointer;
}
._dhgN{
    background-color:rgba(245,245,245,0.9);
}
.ffsf>._dhgN:hover{
  background-color:red;
}
.dafLcmJ{
  margin-top:2px !important;
  overflow:hidden;
}
._dhgN{
    padding:2px 17px;
    border-radius:8px;
    margin:0px 8px;
    font-weight:300;
    font-size:medium;
}
.dsdwDD{
    margin-right:30px;
}
`