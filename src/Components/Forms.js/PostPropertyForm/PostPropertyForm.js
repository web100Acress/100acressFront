import React, { useEffect, useState } from "react";
import { useMultiStepProp } from "../MultiStepProp";
import { useNavigate } from "react-router-dom";
import { ROOT } from "../../../lib/route";
import { Prop1 } from "./Prop1";
import { Prop2 } from "./Prop2";
import { Prop3 } from "./Prop3";
import { Prop4 } from "./Prop4";
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

function PostPropertyForm() {
  let [basicModal, setBasicModal] = useState(false);
  const navigate = useNavigate();
  const {
    steps,
    currentStepIndex,
    step,
    isFirstStep,
    back,
    next,
    isLastStep,
    currWidth,
  } = useMultiStepProp([<Prop1 />, <Prop2 />, <Prop3 />, <Prop4 />]);
  useEffect(() => {
    console.log(currWidth);
  }, [currentStepIndex]);

  function goHome() {
    navigate(ROOT);
  }
  const toggleShow = () => setBasicModal(!basicModal);
  return (
    <>
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Post Property</MDBModalTitle>
              <MDBBtn
                className='btn-close'
                color='none'
                onClick={toggleShow}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>Are you sure you want to save changes!</MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color='primary' onClick={toggleShow}>
                Close
              </MDBBtn>
              <MDBBtn color="success">Save changes</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
      <div
        style={{
          position: "relative",
          background: "white",
          padding: "2rem",
          margin: "1rem auto",
          borderRadius: ".5rem",
          transition: "all 0.3s linear",
        }}>
        <div style={{ position: "relative" }}>
          <div
            className='progress'
            style={{ borderRadius: "10px", height: "6px" }}>
            <div
              className='progress-bar progress-bar-striped progress-bar-animated'
              role='progressbar'
              style={{
                width: `${currWidth}%`,
                transition: "width 0.5s ease-in-out",
                backgroundColor: "#e5652e",
              }}
              aria-valuenow='10'
              aria-valuemin='0'
              aria-valuemax='100'></div>
          </div>
        </div>
        <form className='mt-4'>
          {step}
          <div
            style={{
              marginTop: "1rem",
              display: "flex",
              gap: ".5rem",
              justifyContent: "flex-end",
            }}>
            {!isFirstStep && (
              <button type='button' onClick={back} className='btn btn-primary'>
                Prev
              </button>
            )}
            {isLastStep ? (
              <button
                type='button'
                onClick={toggleShow}
                className='btn btn-success'>
                Submit
              </button>
            ) : (
              <button type='button' onClick={next} className='btn btn-success'>
                Next
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}

export default PostPropertyForm;
