import React, { useState } from 'react'

export function useMultiStepProp(steps) {
  let[currentStepIndex,setCurrentStepIndex] =useState(0);
  
  function next(){
    setCurrentStepIndex(i =>{
      if(i>=steps.length -1) return i
      return i+1;
    })
  }
  function back(){
    setCurrentStepIndex(i =>{
      if(i<=0) return i
      return i-1;
    })
  }

  function goTo(index){
    setCurrentStepIndex(index)
  }

  return {
    currentStepIndex,
    step: steps[currentStepIndex],
    steps,
    isFirstStep: currentStepIndex ===0,
    isLastStep: currentStepIndex === steps.length -1,
    currWidth: (currentStepIndex+1) * 25,
    goTo,
    next,
    back,
}
}
