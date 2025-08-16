import React, { useState } from "react";
import { styled } from "styled-components";
import { AiFillStar } from "react-icons/ai";
import { BsFillCameraFill } from "react-icons/bs";

function PropViewCardPro2() {
    let[readMore,setReadMore] = useState(false);

    const showTextHandler=()=>{
        setReadMore(!readMore);
    }
  return (
    <Wrapper className='section'>
      <div className='mainFrame bc-rd-23'>
        <div className='contentsJm w-100 h-100 bc-rd-23 d-flex'>
          <div className='leftMcn'>
            <div className='imgeProp bc-rd-23'>
              <div className='imgdev position-relative'>
                <img src='' alt='' />
              </div>
              <div className='photDivnum p-2 d-flex flex-column justify-content-between h-100'>
                <div className='vrfied bc-rd-23 d-flex justify-content-center align-items-center'>
                  <span className='px-3 d-flex justify-content-center align-items-center'>
                    Verified{" "}
                    <span className='pl-1'>
                      <AiFillStar color='gold' />
                    </span>
                  </span>
                </div>
                <div className='imgLJR bc-rd-23 d-flex justify-content-center align-items-center'>
                  <span className='px-2 d-flex justify-content-center align-items-center'>
                    <span className='pr-1'>
                      <BsFillCameraFill color='white' />
                    </span>
                    <span style={{ color: "white" }}>10</span>
                  </span>
                </div>
              </div>
            </div>
            <div className='textSb ml-3 mt-2'>
              <span className='font-weight-bold ft-sz-15'>Posted By : </span>
              <span className='ft-sz-14'>Rajesh Goyal</span>
            </div>
          </div>
          <div className='rightMcn pl-4 w-100 pr-3'>
            <div className='topSkn d-flex justify-content-between'>
              <div className='d-flex'>
                <span className='mr-3 font-weight-bold ft-sz-15'>
                  Home for Sale
                </span>
                <div className='ftred bc-rd-23 d-flex justify-content-center align-items-center'>
                  <span className='px-3 ft-sz-14 font-weight-bold'>
                    Featured
                  </span>
                </div>
              </div>
              <div>
                <span className='font-weight-bold ft-sz-15'>
                  ₹ 1.3 CR - 3.08 CR
                </span>
              </div>
            </div>

            <div className='mt-2'>
              <p className='skdjMdH ft-sz-15 ft-cl-gr'>
                Golf Course Road, Sector 53, Gurgaon
              </p>
            </div>

            <div className='' style={{ width: "70%" }}>
              <p className='ft-sz-14 texDescRdLs'>
                Tulip Monsella by Tulip Infratech offers 3, 4 and 5 BHK luxury
                apartments in Golf Course Road...
                <span style={{ color: "blue" }}>more</span>
              </p>
            </div>

            <div
              className='d-flex mb-2 justify-content-between'
              style={{ width: "40%" }}>
              <div>
                <div className='ft-cl-gr'>Type</div>
                <div className='font-weight-bold'>3, 4, 5 BHK</div>
              </div>
              <div>
                <div className='ft-cl-gr'>Avg Price</div>
                <div className='font-weight-bold'>₹ 2.1 CR</div>
              </div>
            </div>

            <div className='fedhfmk d-flex'>
              <div className='fedLLC bc-rd-15 d-flex justify-content-center align-items-center mr-1'>
                <span className='px-3 py-1 ft-sz-12 font-weight-bold'>
                  Ready to Move In
                </span>
              </div>
              <div className='fedLLC bc-rd-15 d-flex justify-content-center align-items-center mr-1'>
                <span className='px-3 py-1 ft-sz-12 font-weight-bold'>
                  Resale
                </span>
              </div>
              <div className='fedLLC bc-rd-15 d-flex justify-content-center align-items-center mr-1'>
                <span className='px-3 py-1 ft-sz-12 font-weight-bold'>
                  Newly Constructed
                </span>
              </div>
            </div>

            <hr />

            <div className='fedhfmk d-flex justify-content-end'>
              <button className='px-3 py-1 cbIlMb mr-2 bc-rd-15 ft-sz-13'>
                View Phone Number
              </button>
              <button className='px-3 py-1 sfzzZ bc-rd-15 ft-sz-13'>
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default PropViewCardPro2;

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .ft-cl-gr {color: #8b8686;}
  .ft-sz-15 {font-size: 15px;}
  .ft-sz-14 {font-size: 14px;}
  .ft-sz-13 {font-size: 13px;}
  .ft-sz-12 {font-size: 12px;}
  .ft-sz-10 {font-size: 10px;}
  .bc-rd-23 {border-radius: 23px;}
  .bc-rd-15 {border-radius: 15px;}
  .mainFrame {width: 811px;height: auto;background: white;box-shadow: 0 0 30px 0 #0000001a;padding: 21px 23px 15px 23px;}
  .ftred {background: #f3c9c9;}
  .vrfied {background: #9eea83;width: max-content;}
  .fedLLC {background-color: #c9f3ee;}
  .imgLJR {height: auto;background: #8b8686;width: max-content;}
  .vrfied {height: 29px;}
  .contentsJm {}
  .imgeProp {width: 242px;height: 210px;background-color: #c9f3ee;}
  .BhCl {width: fit-content;}
  .cbIlMb {background-color: #d9d9d9;color: white;}
  .sfzzZ {background-color: #56a1fa;color: white;}
`;
