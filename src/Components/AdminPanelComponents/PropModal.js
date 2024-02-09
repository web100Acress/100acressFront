/** @format */

import React from "react";
import styled from "styled-components";

function PropModal(elem) {
  console.log(elem);
  if (!elem.photo || !elem.amentites) {
    return (
      <div className='section'>
        <div>Loading...</div>
      </div>
    );
  }
  const { amentites } = elem;
  const amentitieList = amentites[0].replaceAll(",", ", ");
  return (
    <Wrapper>
      <div className='modalText'>Project Name</div>
      <div className='modalValues'>{elem.projectName}</div>
      <div className='modalText'>Project Location</div>
      <div className='modalValues'>{elem.location}</div>
      <div className='modalText'>Project City</div>
      <div className='modalValues'>{elem.city}</div>
      <div className='modalText'>Project Price</div>
      <div className='modalValues'>₹ {elem.price} Cr</div>
      <div className='modalText'>Project Configuration</div>
      <div className='modalValues'>{elem.configuration}</div>
      <div className='modalText'>Project Status</div>
      <div className='modalValues'>{elem.status}</div>
      <div className='modalText'>Project Featured</div>
      <div className='modalValues'>{elem.featured}</div>
      <div className='modalText'>Rera No</div>
      <div className='modalValues'>{elem.rera_No}</div>
      <div className='modalText'>Covered Area</div>
      <div className='modalValues'>{elem.minCovered_Area} sq.ft - {elem.maxCovered_Area} sq.ft</div>
      <div className='modalText'>About Project</div>
      <div className='modalValues'>{elem.aboutProject}</div>
      <div className='modalText'>Builder Name</div>
      <div className='modalValues'>{elem.builderName}</div>
      <div className='modalText'>Photos you Attached</div>
      <div style={{width:"100%"}}>
          <img src={elem.photo[0].url} alt='' style={{width:"100%"}}/>
        </div>
      <div style={{display:"flex",flexWrap:"wrap",justifyContent:"space-between"}}>
        <div style={{width:"33%"}}>
          <img src={elem.floorPlan.url} alt='' style={{width:"100%",height:"100px"}}/>
        </div>
        <div style={{width:"33%"}}>
          <img src={elem.sitePlan.url} alt='' style={{width:"100%",height:"100px"}}/>
        </div>
        <div style={{width:"33%"}}>
          <img src={elem.locationMap.url} alt='' style={{width:"100%",height:"100px"}}/>
        </div>
      </div>
      <div className='modalText'>Meta Title</div>
      <div className='modalValues'>{elem.meta_title}</div>
      <div className='modalText'>Meta Description</div>
      <div className='modalValues'>{elem.meta_description}</div>
      <div className='modalText'>Amenities</div>
      <div className='modalValues'>{amentitieList}</div>
      <div className='modalText'>About Developer</div>
      <div className='modalValues'>{elem.Aboutdeveloper}</div>
    </Wrapper>
  );
}

export default PropModal;
const Wrapper =styled.div`
.modalText{
    margin:5px 0px;
    font-weight:bold;
}
.modalValues{
    margin:0px 10px;
}
`