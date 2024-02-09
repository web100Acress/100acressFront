import React, { useEffect } from "react";
import styled from "styled-components";
import $ from "jquery";

function VerificationForm() {
  return (
    <Wrapper className='section'>
      <div class='multi_step_form'>
        <form id='msform'>
          <div class='tittle'>
            <h2>Verification Process</h2>
            <p>
              In order to use this service, you have to complete this
              verification process
            </p>
          </div>
          <ul id='progressbar'>
            <li class='active'>Verify Phone</li>
            <li>Upload Documents</li>
            <li>Security Questions</li>
          </ul>
          <fieldset>
            <h3>Setup your phone</h3>
            <h6>We will send you a SMS. Input the code to verify.</h6>
            <div class='form-row'>
              <div class='form-group col-md-6'>
                <input
                  type='tel'
                  id='phone'
                  class='form-control'
                  placeholder='+880'
                />
              </div>
              <div class='form-group col-md-6'>
                <input
                  type='text'
                  class='form-control'
                  placeholder='1123456789'
                />
              </div>
            </div>
            <div class='done_text'>
              <a href='#' class='don_icon'>
                <i class='ion-android-done'></i>
              </a>
              <h6>
                A secret code is sent to your phone. <br />
                Please enter it here.
              </h6>
            </div>
            <div class='code_group'>
              <input type='text' class='form-control' placeholder='0' />
              <input type='text' class='form-control' placeholder='0' />
              <input type='text' class='form-control' placeholder='0' />
              <input type='text' class='form-control' placeholder='0' />
            </div>
            <button type='button' class='action-button previous_button'>
              Back
            </button>
            <button type='button' class='next action-button'>
              Continue
            </button>
          </fieldset>
          <fieldset>
            <h3>Verify Your Identity</h3>
            <h6>
              Please upload any of these documents to verify your Identity.
            </h6>
            <div class='passport'>
              <h4>
                Govt. ID card <br />
                PassPort <br />
                Driving License.
              </h4>
              <a href='#' class='don_icon'>
                <i class='ion-android-done'></i>
              </a>
            </div>
            <div class='input-group'>
              <div class='custom-file'>
                <input type='file' class='custom-file-input' id='upload' />
                <label class='custom-file-label' for='upload'>
                  <i class='ion-android-cloud-outline'></i>Choose file
                </label>
              </div>
            </div>
            <ul class='file_added'>
              <li>File Added:</li>
              <li>
                <a href='#'>
                  <i class='ion-paperclip'></i>national_id_card.png
                </a>
              </li>
              <li>
                <a href='#'>
                  <i class='ion-paperclip'></i>national_id_card_back.png
                </a>
              </li>
            </ul>
            <button
              type='button'
              class='action-button previous previous_button'>
              Back
            </button>
            <button type='button' class='next action-button'>
              Continue
            </button>
          </fieldset>
          <fieldset>
            <h3>Create Security Questions</h3>
            <h6>Please update your account with security questions</h6>
            <div class='form-group'>
              <select class='product_select'>
                <option data-display='1. Choose A Question'>
                  1. Choose A Question
                </option>
                <option>2. Choose A Question</option>
                <option>3. Choose A Question</option>
              </select>
            </div>
            <div class='form-group fg_2'>
              <input
                type='text'
                class='form-control'
                placeholder='Anwser here:'
              />
            </div>
            <div class='form-group'>
              <select class='product_select'>
                <option data-display='1. Choose A Question'>
                  1. Choose A Question
                </option>
                <option>2. Choose A Question</option>
                <option>3. Choose A Question</option>
              </select>
            </div>
            <div class='form-group fg_3'>
              <input
                type='text'
                class='form-control'
                placeholder='Anwser here:'
              />
            </div>
            <button
              type='button'
              class='action-button previous previous_button'>
              Back
            </button>
            <a href='#' class='action-button'>
              Finish
            </a>
          </fieldset>
        </form>
      </div>
    </Wrapper>
  )
}

export default VerificationForm;
const Wrapper = styled.section`
/* Variable Definitions */
:root {
  --roboto: 'Roboto', sans-serif;
  --bc: #5cb85c;
  --heding: #405867;
  --pfont: #5f6771;
}

/* Mixin Definitions */
/* CSS transitions mixin */
@keyframes transition {
  to {
    transition: var(--property) var(--duration) var(--animate) var(--delay);
  }
}

/* Placeholder mixin */
.placeholder, :-moz-placeholder, ::-moz-placeholder, ::-webkit-input-placeholder {
  @content;
}

/* Import Google Fonts */
@import url('https://fonts.googleapis.com/css?family=Roboto:300i,400,400i,500,700,900');

/* Styling for .multi_step_form */
.multi_step_form {
  background: #f6f9fb;
  display: block;
  overflow: hidden;
}

/* Styling for #msform */
.multi_step_form #msform {
  text-align: center;
  position: relative;
  padding-top: 50px;
  min-height: 820px;
  max-width: 810px;
  margin: 0 auto;
  background: #ffffff;
  z-index: 1;
}

/* Styling for .tittle */
.multi_step_form #msform .tittle {
  text-align: center;
  padding-bottom: 55px;
}

/* Styling for .tittle h2 */
.multi_step_form #msform .tittle h2 {
  font: 500 24px/35px var(--roboto);
  color: #3f4553;
  padding-bottom: 5px;
}

/* Styling for .tittle p */
.multi_step_form #msform .tittle p {
  font: 400 16px/28px var(--roboto);
  color: var(--pfont);
}

/* Styling for fieldset */
.multi_step_form #msform fieldset {
  border: 0;
  padding: 20px 105px 0;
  position: relative;
  width: 100%;
  left: 0;
  right: 0;
}

/* Styling for fieldset h3 */
.multi_step_form #msform fieldset h3 {
  font: 500 18px/35px var(--roboto);
  color: #3f4553;
}

/* Styling for fieldset h6 */
.multi_step_form #msform fieldset h6 {
  font: 400 15px/28px var(--roboto);
  color: var(--pfont);
  padding-bottom: 30px;
}

/* Styling for .intl-tel-input */
.multi_step_form #msform fieldset .intl-tel-input {
  display: block;
  background: transparent;
  border: 0;
  box-shadow: none;
  outline: none;
}

/* Styling for .intl-tel-input .flag-container .selected-flag */
.multi_step_form #msform fieldset .intl-tel-input .flag-container .selected-flag {
  padding: 0 20px;
  background: transparent;
  border: 0;
  box-shadow: none;
  outline: none;
  width: 65px;
}

/* Styling for .intl-tel-input .flag-container .selected-flag .iti-arrow */
.multi_step_form #msform fieldset .intl-tel-input .flag-container .selected-flag .iti-arrow {
  border: 0;
}

/* Styling for #phone */
.multi_step_form #msform fieldset #phone {
  padding-left: 80px;
}

/* Styling for .form-group */
.multi_step_form #msform fieldset .form-group {
  padding: 0 10px;
}

/* Styling for .fg_2 and .fg_3 */
.multi_step_form #msform fieldset .fg_2,
.multi_step_form #msform fieldset .fg_3 {
  padding-top: 10px;
  display: block;
  overflow: hidden;
}

/* Styling for .fg_3 */
.multi_step_form #msform fieldset .fg_3 {
  padding-bottom: 70px;
}

/* Styling for .form-control and .product_select */
.multi_step_form #msform fieldset .form-control,
.multi_step_form #msform fieldset .product_select {
  border-radius: 3px;
  border: 1px solid #d8e1e7;
  padding: 0 20px;
  height: auto;
  font: 400 15px/48px var(--roboto);
  color: var(--pfont);
  box-shadow: none;
  outline: none;
  width: 100%;
}

/* Styling for .product_select:after */
.multi_step_form #msform fieldset .product_select:after {
  display: none;
}

/* Styling for .product_select:before */
.multi_step_form #msform fieldset .product_select:before {
  content: "\f35f";
  position: absolute;
  top: 0;
  right: 20px;
  font: normal normal normal 24px/48px Ionicons;
  color: var(--pfont);
}

/* Styling for .done_text */
.multi_step_form #msform fieldset .done_text {
  padding-top: 40px;
}

/* Styling for .done_text .don_icon */
.multi_step_form #msform fieldset .done_text .don_icon {
  height: 36px;
  width: 36px;
  line-height: 36px;
  font-size: 22px;
  margin-bottom: 10px;
  background: var(--bc);
  display: inline-block;
  border-radius: 50%;
  color: #ffffff;
  text-align: center;
}

/* Styling for .done_text h6 */
.multi_step_form #msform fieldset .done_text h6 {
  line-height: 23px;
}

/* Styling for .code_group */
.multi_step_form #msform fieldset .code_group {
  margin-bottom: 60px;
}

/* Styling for .code_group .form-control */
.multi_step_form #msform fieldset .code_group .form-control {
  border: 0;
  border-bottom: 1px solid #a1a7ac;
  border-radius: 0;
  display: inline-block;
  width: 30px;
  font-size: 30px;
  color: var(--pfont);
  padding: 0;
  margin-right: 7px;
  text-align: center;
  line-height: 1;
}

/* Styling for .passport */
.multi_step_form #msform fieldset .passport {
  margin-top: -10px;
  padding-bottom: 30px;
  position: relative;
}

/* Styling for .passport .don_icon */
.multi_step_form #msform fieldset .passport .don_icon {
  height: 36px;
  width: 36px;
  line-height: 36px;
  font-size: 22px;
  position: absolute;
  top: 4px;
  right: 0;
  background: var(--bc);
  display: inline-block;
  border-radius: 50%;
  color: #ffffff;
  text-align: center;
}

/* Styling for .passport h4 */
.multi_step_form #msform fieldset .passport h4 {
  font: 500 15px/23px var(--roboto);
  color: var(--pfont);
  padding: 0;
}

/* Styling for .input-group */
.multi_step_form #msform fieldset .input-group {
  padding-bottom: 40px;
}

/* Styling for .input-group .custom-file */
.multi_step_form #msform fieldset .input-group .custom-file {
  width: 100%;
  height: auto;
}

/* Styling for .input-group .custom-file-label */
.multi_step_form #msform fieldset .input-group .custom-file-label {
  width: 168px;
  border-radius: 5px;
  cursor: pointer;
  font: 700 14px/40px var(--roboto);
  border: 1px solid #99a2a8;
  text-align: center;
  color: var(--pfont);
  transition: all 300ms linear 0s;
}

/* Styling for .input-group .custom-file-label i */
.multi_step_form #msform fieldset .input-group .custom-file-label i {
  font-size: 20px;
  padding-right: 10px;
}

/* Styling for .input-group .custom-file-label:hover and .input-group .custom-file-label:focus */
.multi_step_form #msform fieldset .input-group .custom-file-label:hover,
.multi_step_form #msform fieldset .input-group .custom-file-label:focus {
  background: var(--bc);
  border-color: var(--bc);
  color: #fff;
}

/* Styling for .file_added */
.multi_step_form #msform fieldset .file_added {
  text-align: left;
  padding-left: 190px;
}

/* Styling for .file_added li */
.multi_step_form #msform fieldset .file_added li {
  font: 400 15px/28px var(--roboto);
  color: var(--pfont);
}

/* Styling for .file_added li a */
.multi_step_form #msform fieldset .file_added li a {
  color: var(--bc);
  font-weight: 500;
  display: inline-block;
  position: relative;
  padding-left: 15px;
}

/* Styling for .file_added li a i */
.multi_step_form #msform fieldset .file_added li a i {
  font-size: 22px;
  padding-right: 8px;
  position: absolute;
  left: 0;
  transform: rotate(20deg);
}

/* Styling for #progressbar */
.multi_step_form #progressbar {
  margin-bottom: 30px;
  overflow: hidden;
}

/* Styling for #progressbar li */
.multi_step_form #progressbar li {
  list-style-type: none;
  color: #99a2a8;
  font-size: 9px;
  width: calc(100% / 3);
  float: left;
  position: relative;
  font: 500 13px/1 var(--roboto);
}

/* Styling for #progressbar li:nth-child(2):before */
.multi_step_form #progressbar li:nth-child(2):before {
  content: "\f12f";
}

/* Styling for #progressbar li:nth-child(3):before */
.multi_step_form #progressbar li:nth-child(3):before {
  content: "\f457";
}

/* Styling for #progressbar li:before */
.multi_step_form #progressbar li:before {
  content: "\f1fa";
  font: normal normal normal 30px/50px Ionicons;
  width: 50px;
  height: 50px;
  line-height: 50px;
  display: block;
  background: #eaf0f4;
  border-radius: 50%;
  margin: 0 auto 10px auto;
}

/* Styling for #progressbar li:after */
.multi_step_form #progressbar li:after {
  content: '';
  width: 100%;
  height: 10px;
  background: #eaf0f4;
  position: absolute;
  left: -50%;
  top: 21px;
  z-index: -1;
}

/* Styling for #progressbar li:last-child:after */
.multi_step_form #progressbar li:last-child:after {
  width: 150%;
}

/* Styling for #progressbar li.active */
.multi_step_form #progressbar li.active {
  color: var(--bc);
}

/* Styling for #progressbar li.active:before and #progressbar li.active:after */
.multi_step_form #progressbar li.active:before,
.multi_step_form #progressbar li.active:after {
  background: var(--bc);
  color: white;
}

/* Styling for .action-button */
.multi_step_form #msform .action-button {
  background: var(--bc);
  color: white;
  border: 0 none;
  border-radius: 5px;
  cursor: pointer;
  min-width: 130px;
  font: 700 14px/40px var(--roboto);
  border: 1px solid var(--bc);
  margin: 0 5px;
  text-transform: uppercase;
}

/* Styling for .action-button:hover and .action-button:focus */
.multi_step_form #msform .action-button:hover,
.multi_step_form #msform .action-button:focus {
  background: var(--heding);
  border-color: var(--heding);
}

/* Styling for .previous_button */
.multi_step_form #msform .previous_button {
  background: transparent;
  color: #99a2a8;
  border-color: #99a2a8;
}

/* Styling for .previous_button:hover and .previous_button:focus */
.multi_step_form #msform .previous_button:hover,
.multi_step_form #msform .previous_button:focus {
  background: var(--heding);
  border-color: var(--heding);
  color: #fff;
}

`;
