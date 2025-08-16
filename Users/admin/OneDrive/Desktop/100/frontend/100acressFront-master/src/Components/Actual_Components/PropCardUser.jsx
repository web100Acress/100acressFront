/** @format */

import React, { useState } from "react";
import { styled } from "styled-components";
import { AiFillStar } from "react-icons/ai";
import { BsFillCameraFill } from "react-icons/bs";
import { BiDotsVerticalRounded } from "react-icons/bi";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";

function PropCardUser() {
  const fullText =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquet aliquam sapien, eu dignissim tortor facilisis vel. Fusce auctor tellus in hendrerit. Vivamus ut lectus purus.";

  let [showElem, setShowElem] = useState(false);
  let [showFullText, setShowFullText] = useState(false);
  let [displayText, setDisplayText] = useState(fullText.slice(0, 45));
  let [basicModal, setBasicModal] = useState(false);

  const toggleShow = () => {
    setBasicModal(!basicModal);
    setShowElem(false);
  }

  const handleBox = () => {
    setShowElem(!showElem);
  };
  const toggleText = () => {
    setShowFullText(!showFullText);
    setDisplayText(showFullText ? fullText.slice(0, 45) : fullText);
  };
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
              <div className='position-relative' style={{ cursor: "pointer" }}>
                <div>
                  <BiDotsVerticalRounded size={20} onClick={handleBox} />
                </div>
                {showElem && (
                  <div className='sSNNlo'>
                    <div onClick={handleBox}>View</div>
                    <div onClick={handleBox}>Edit</div>
                    <div>
                      <button
                        type='button'
                        data-mdb-toggle='modal'
                        data-mdb-target='#exampleModal'
                        onClick={toggleShow}>
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
              <MDBModalDialog>
                <MDBModalContent>
                  <MDBModalHeader>
                    <MDBModalTitle>Are you sure?</MDBModalTitle>
                    <MDBBtn
                      className='btn-close'
                      color='none'
                      onClick={toggleShow}></MDBBtn>
                  </MDBModalHeader>
                  <MDBModalBody>You won't be able to revert this!</MDBModalBody>

                  <MDBModalFooter>
                    <MDBBtn color='secondary' onClick={toggleShow}>
                      Cancel
                    </MDBBtn>
                    <MDBBtn color='danger'>Yes, delete it !</MDBBtn>
                  </MDBModalFooter>
                </MDBModalContent>
              </MDBModalDialog>
            </MDBModal>

            <div className='mt-1'>
              <p className='skdjMdH ft-sz-15 ft-cl-gr'>
                Golf Course Road, Sector 53, Gurgaon
              </p>
            </div>

            <div
              className='cmMidSec d-flex justify-content-between '
              style={{ width: "85%" }}>
              <div className='BhCl d-flex flex-column'>
                <span className='ft-sz-15 font-weight-bold'>₹ 1.3 CR</span>
                <span className='ft-sz-10 ft-cl-gr'>₹ 34,570/sq.ft</span>
              </div>
              <div className='BhCl d-flex flex-column'>
                <span className='ft-sz-15 font-weight-bold'>2057 Sq.ft</span>
                <span className='ft-sz-10 ft-cl-gr'>(54.47 sq.m)Plot Area</span>
              </div>
              <div className='BhCl d-flex flex-column'>
                <span className='ft-sz-15 font-weight-bold'>3 BHK</span>
                <span className='ft-sz-10 ft-cl-gr'>3 Baths</span>
              </div>
            </div>

            <div className='mt-2' style={{ width: "340px" }}>
              <p className='ft-sz-14 mb-2'>
                {displayText}
                <span
                  style={{
                    color: "blue",
                    cursor: "pointer",
                    marginLeft: "1px",
                  }}
                  onClick={toggleText}>
                  {showFullText ? "less" : "..more"}
                </span>
              </p>
            </div>

            <div className='fedhfmk d-flex flex-wrap'>
              <div className='fedLLC bc-rd-15 d-flex justify-content-center align-items-center mr-1 mb-1'>
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
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default PropCardUser;

const Wrapper = styled.section`
  .ft-cl-gr {
    color: #8b8686;
  }
  .ft-sz-15 {
    font-size: 15px;
  }
  .ft-sz-14 {
    font-size: 14px;
  }
  .ft-sz-13 {
    font-size: 13px;
  }
  .ft-sz-12 {
    font-size: 12px;
  }
  .ft-sz-10 {
    font-size: 10px;
  }
  .bc-rd-23 {
    border-radius: 23px;
  }
  .bc-rd-15 {
    border-radius: 15px;
  }
  .mainFrame {
    width: 620px;
    height: auto;
    background: white;
    box-shadow: 0 0 30px 0 #0000001a;
    padding: 20px 15px 15px 20px;
    margin-bottom: 20px;
  }
  .ftred {
    background: #f3c9c9;
    width: 90px;
    height: 23px;
  }
  .vrfied {
    background: #9eea83;
    width: max-content;
  }
  .fedLLC {
    background-color: #c9f3ee;
    width: auto;
    height: 28px;
  }
  .imgLJR {
    height: auto;
    background: #8b8686;
    width: max-content;
  }
  .vrfied {
    height: 29px;
  }
  .contentsJm {
  }
  .imgeProp {
    width: 180px;
    height: 170px;
    background-color: #c9f3ee;
  }
  .BhCl {
    width: fit-content;
  }
  .cbIlMb {
    background-color: #d9d9d9;
    color: white;
  }
  .sfzzZ {
    background-color: #56a1fa;
    color: white;
  }
  .sSNNlo > div:hover {
    cursor: pointer;
  }
  .sSNNlo {
    position: absolute;
    width: 90px;
    box-shadow: 0px 0px 10px #0000001a;
    left: 0px;
    padding: 10px;
    background: white;
    border-radius: 15px;
  }
`;
