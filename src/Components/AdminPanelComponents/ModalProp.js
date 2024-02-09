import React from 'react'
import styled from 'styled-components';

function ModalProp(elem) {
    const dateString = elem.createdAt;
    const date = new Date(dateString);

    const options = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    };
    const formattedDate = date.toLocaleDateString("en-GB", options);

  return (
    <Wrapper>
      <div className='modalText'>Name of Enquirer</div>
      <div className='modalValues'>{elem.name}</div>
      <div className='modalText'>Enquirer Mobile No.</div>
      <div className='modalValues'>+91 {elem.mobile}</div>
      <div className='modalText'>Email Address</div>
      <div className='modalValues'>{elem.email}</div>
      <div className='modalText'>Message</div>
      <div className='modalValues'>{elem.message}</div>
      <div className='modalText'>Enquiry Date</div>
      <div className='modalValues'>{formattedDate}</div>
    </Wrapper>
  )
}

export default ModalProp
const Wrapper =styled.div`
.modalText{
    margin:5px 0px;
    font-weight:bold;
}
.modalValues{
    margin:0px 10px;
}
`
