import React, { useState } from 'react'
import styled from 'styled-components';
import axios from 'axios';

function CompleteProjectEnquiry(elem) {
    const URL =`https://api.100acress.com/userupdate/${elem._id}`
    
    const[formData,setFormData] = useState({
        status:"Completed",
      })

    function handleCompeleteFrontEnquiry(e) {
        e.preventDefault();
        axios({
          method: "Post",
          url: URL,
          data: formData,
        })
          .then((res) => {
            console.log(res.data.message);
            alert("Done 😊")
          })
          .catch((err) => {
            console.log(err.response);
            alert("Something Went Wrong 🥺 !")
          });
      }

  return (
    <Wrapper>
      <div>Are you sure you want to mark this as complete.</div>
      <button onClick={handleCompeleteFrontEnquiry} className="btn btn-danger" style={{float:"right",marginTop:"2rem"}}>Proceed</button>
    </Wrapper>
  )
}

export default CompleteProjectEnquiry
const Wrapper =styled.div`
.modalText{
    margin:5px 0px;
    font-weight:bold;
}
.modalValues{
    margin:0px 10px;
}
`
