import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

function AddBHK(elem) {
  const URL = `https://api.100acress.com/preLaunch/bhk/insert/${elem._id}`;

  const [submitting,setSubmitting] = useState(false);

  const handleSubmittingClose = () =>{
    setSubmitting(false);
  }
  const handleSubmittingOpen = () =>{
    setSubmitting(true);
  }

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    const updatedFormData = { ...formData };
    if (name === "image") {
      updatedFormData.image = files[0];
    }
    setFormData(updatedFormData);
  };

  function handleMainForm(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  }

  const [formData, setFormData] = useState({
    input_Bhk: "",
    build_area: "",
    possession: "",
    image: null,
  });

  function submitBhkForm(e) {
    e.preventDefault();
    handleSubmittingOpen();
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    axios({
      method: "post",
      url: URL,
      data: formDataToSend,
    })
      .then((res) => {
        console.log(res.data.message);
        alert("Bhk Details Updated!");
        handleSubmittingClose();
      })
      .catch((err) => {
        console.log(err.response.data);
        alert("Something went Wrong!");
        handleSubmittingClose();
      });
  }

  return (
    <Wrapper>
      <form onSubmit={submitBhkForm}>
        <div style={{ fontWeight: "bold" }}>Enter Input BHK</div>
        <input
          type='text'
          name='input_Bhk'
          id='form_input_Bhk'
          required
          className='input_bhk'
          placeholder='Ex:- 2 Bhk'
          style={{ width: "100%", marginBottom: "10px", paddingLeft: "10px" }}
          onChange={handleMainForm}
        />
        <div style={{ fontWeight: "bold" }}>Enter BuildUp Area</div>
        <input
          type='number'
          name='build_area'
          id='form_input_Bhk'
          required
          className='input_bhk'
          placeholder='Ex:- 1024 (in Sq.Ft)'
          min={0}
          style={{ width: "100%", marginBottom: "10px", paddingLeft: "10px" }}
          onChange={handleMainForm}
        />
        <div style={{ fontWeight: "bold" }}>Possession In</div>
        <input
          type='number'
          name='possession'
          id='form_input_Bhk'
          required
          className='input_bhk'
          placeholder='Ex:- 2084'
          min={0}
          style={{ width: "100%", marginBottom: "10px", paddingLeft: "10px" }}
          onChange={handleMainForm}
        />
        <div style={{ fontWeight: "bold" }}>Attach Floor Plan Image</div>
        <input
          type='file'
          name='image'
          accept='image/*'
          id='form_input_Bhk'
          required
          onChange={handleImageChange}
        />
        <button type='submit' className='btn btn-success' disabled={submitting}>
          {submitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </Wrapper>
  );
}

export default AddBHK;
const Wrapper = styled.div`
  .modalText {
    margin: 5px 0px;
    font-weight: bold;
  }
  .modalValues {
    margin: 0px 10px;
  }
  input[type="text"],
  input[type="number"] {
    width: 100%;
    height: calc(2.25rem + 2px);
    padding: 0.375rem 0.75rem;
    margin-bottom: 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    outline: none;
    overflow: visible;
  }
  input:focus {
    border-color: red;
    box-shadow: 0px 0px 3px red;
    tranform: scale(1.2);
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
