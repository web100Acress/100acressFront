import React, { useEffect } from "react";
import { useMultiStepProp } from "../MultiStepProp";
import { UserForm } from "./UserForm";
import { AddressForm } from "./AddressForm";
import ProfileSetup from "./ProfileSetup";
import GeneralCon from "./GeneralCon";
import { useNavigate } from "react-router-dom";
import { ROOT } from "../../../lib/route";

function SignUpForm() {
  const navigate=useNavigate();
  const {
    steps,
    currentStepIndex,
    step,
    isFirstStep,
    back,
    next,
    isLastStep,
    currWidth,
  } = useMultiStepProp([<UserForm />, <ProfileSetup />,<AddressForm />,<GeneralCon />]);
  useEffect(() => {
    console.log(currWidth);
  }, [currentStepIndex]);
  
  function goHome(){
    navigate(ROOT);
  }
  return (
    <div
      style={{
        position: "relative",
        background: "white",
        padding: "2rem",
        margin: "4rem 25rem",
        borderRadius: ".5rem",
        transition: "all 0.3s linear",
      }}>
      <div style={{position:"relative"}}>
      
      <div className='progress' style={{ borderRadius: "10px",height:"6px"}}>
        <div
          className='progress-bar progress-bar-striped progress-bar-animated'
          role='progressbar'
          style={{
            width: `${currWidth}%`,
            transition: "width 0.5s ease-in-out",
            backgroundColor: "green",
          }}
          aria-valuenow='10'
          aria-valuemin='0'
          aria-valuemax='100'></div>
      </div>
      </div>
      <form className='mt-5'>
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
          {isLastStep ? <button type='button' onClick={goHome} className='btn btn-success'>Submit</button> :<button type='button' onClick={next} className='btn btn-success'>Next</button>}
          
        </div>
      </form>
    </div>
  );
}

export default SignUpForm;
