import React, { useState } from "react";
import PropViewCard from "../Components/Actual_Components/RentPropViewCard";
import styled from "styled-components";
import FinalNavBar from "../Components/HomePageComponents/NavBar";
import {useProductContext} from "../Context/productContext"
import { InfinitySpin } from  'react-loader-spinner'
import Nav from "../aadharhomes/Nav";
import Footer from "../Components/Actual_Components/Footer";

function Properties() {
  const {PreLaunchProperties,isPreLaunchLoading} = useProductContext();
  const [selectedAcc, setSelectedAcc] = useState("propType");

  const toggleElement = (tabId) => {
    setSelectedAcc(tabId);
  };
  let Elem =[...PreLaunchProperties];
  if(isPreLaunchLoading){
    return( 
      <div style={{margin:"30vh 30vw 30vh 43vw"}}>
        <InfinitySpin width='500' color="red"/>
      </div>
      )
  }
  
  return (
    <Wrapper className='Section'>
      <Nav/>
      <div className='d-flex flex-wrap' style={{ padding: "0px" }}>
        <div className='li_options w-25 position-relative'>
          <div className='fi_space'>
            <button type='button' className='theme_btn'>
              Clear Filters
            </button>
          </div>
          <div className='fi_heading'>FILTERS</div>
          <div className='fi_acc'>
            <div className='fi_head' onClick={()=>toggleElement('propType')}>
              PROPERTY TYPE
              <div className='toggleIcon'>{selectedAcc ==="propType"?"-":"+"}</div>
            </div>
            <div className={`fi_options ${selectedAcc ==="propType" ? "show":"hide"}`}>
              <li>
                <input
                  type='checkbox'
                  id='independent_house'
                  name='property_type'
                  class='filter-choice'
                  value='independent_house'
                />
                <label for='independent_house' class='filter'>
                  {" "}
                  Independent Floor
                </label>
              </li>
              <li>
                <input
                  type='checkbox'
                  id='aparment_house'
                  name='property_type'
                  class='filter-choice'
                  value='aparment_house'
                />
                <label for='aparment_house' class='filter'>
                  {" "}
                  Aparment
                </label>
              </li>
              <li>
                <input
                  type='checkbox'
                  id='builder_floor'
                  name='property_type'
                  class='filter-choice'
                  value='builder_floor'
                />
                <label for='builder_floor' class='filter'>
                  {" "}
                  Builder Floor
                </label>
              </li>
              <li>
                <input
                  type='checkbox'
                  id=' plot_house'
                  name='property_type'
                  class='filter-choice'
                  value=' plot_house'
                />
                <label for=' plot_house' class='filter'>
                  {" "}
                  Plot
                </label>
              </li>
              <li>
                <input
                  type='checkbox'
                  id=' residencial_house'
                  name='property_type'
                  class='filter-choice'
                  value=' residencial_house'
                />
                <label for=' residencial_house' class='filter'>
                  {" "}
                  Residencial
                </label>
              </li>
              <li>
                <input
                  type='checkbox'
                  id=' studio_house'
                  name='property_type'
                  class='filter-choice'
                  value=' studio_house'
                />
                <label for=' studio_house' class='filter'>
                  {" "}
                  Studio
                </label>
              </li>
              <li>
                <input
                  type='checkbox'
                  id=' villas_house'
                  name='property_type'
                  class='filter-choice'
                  value=' villas_house'
                />
                <label for=' villas_house' class='filter'>
                  {" "}
                  Villas
                </label>
              </li>
            </div>
          </div>
          <div className='fi_acc'>
            <div className='fi_head' onClick={()=>toggleElement('bhkType')}>
              BHK TYPE
              <div className='toggleIcon'>{selectedAcc ==="bhkType"?"-":"+"}</div>
            </div>
            <div className={`fi_options ${selectedAcc ==="bhkType" ? "show":"hide"}`}>
              <li>
                <input
                  type='checkbox'
                  id='oneBhk'
                  name='bhk_type'
                  class='filter-choice'
                  value='oneBhk'
                />
                <label for='oneBhk' class='filter'>
                  {" "}
                  1 BHK
                </label>
              </li>
              <li>
                <input
                  type='checkbox'
                  id='onefiveBhk'
                  name='bhk_type'
                  class='filter-choice'
                  value='onefiveBhk'
                />
                <label for='onefiveBhk' class='filter'>
                  {" "}
                  1.5 BHK
                </label>
              </li>
              <li>
                <input
                  type='checkbox'
                  id='twoBhk'
                  name='bhk_type'
                  class='filter-choice'
                  value='twoBhk'
                />
                <label for='twoBhk' class='filter'>
                  {" "}
                  2 BHK
                </label>
              </li>
              <li>
                <input
                  type='checkbox'
                  id='twofiveBhk'
                  name='bhk_type'
                  class='filter-choice'
                  value='twofiveBhk'
                />
                <label for='twofiveBhk' class='filter'>
                  {" "}
                  2.5 BHK
                </label>
              </li>
              <li>
                <input
                  type='checkbox'
                  id='threeBhk'
                  name='bhk_type'
                  class='filter-choice'
                  value='threeBhk'
                />
                <label for='threeBhk' class='filter'>
                  {" "}
                  3 BHK
                </label>
              </li>
              <li>
                <input
                  type='checkbox'
                  id='threefiveBhk'
                  name='bhk_type'
                  class='filter-choice'
                  value='threefiveBhk'
                />
                <label for='threefiveBhk' class='filter'>
                  {" "}
                  3.5 BHK
                </label>
              </li>
              <li>
                <input
                  type='checkbox'
                  id='fourBhk'
                  name='bhk_type'
                  class='filter-choice'
                  value='fourBhk'
                />
                <label for='fourBhk' class='filter'>
                  {" "}
                  4 BHK
                </label>
              </li>
              <li>
                <input
                  type='checkbox'
                  id='fourfiveBhk'
                  name='bhk_type'
                  class='filter-choice'
                  value='fourfiveBhk'
                />
                <label for='fourfiveBhk' class='filter'>
                  {" "}
                  4.5 BHK
                </label>
              </li>
              <li>
                <input
                  type='checkbox'
                  id='fiveBhk'
                  name='bhk_type'
                  class='filter-choice'
                  value='fiveBhk'
                />
                <label for='fiveBhk' class='filter'>
                  {" "}
                  5 BHK
                </label>
              </li>
              <li>
                <input
                  type='checkbox'
                  id='duplex'
                  name='bhk_type'
                  class='filter-choice'
                  value='duplex'
                />
                <label for='duplex' class='filter'>
                  {" "}
                  Duplex
                </label>
              </li>
            </div>
          </div>

          <div className='fi_acc'>
            <div className='fi_head' onClick={()=>toggleElement('priceType')}>
              PRICE
              <div className='toggleIcon'>{selectedAcc ==="priceType"?"-":"+"}</div>
            </div>

            <div className={`fi_options ${selectedAcc ==="priceType" ? "show":"hide"}`}>
            </div>
          </div>

          <div className='fi_acc'>
            <div className='fi_head' onClick={()=>toggleElement('possType')}>
            POSSESSION STATUS
            <div className='toggleIcon'>{selectedAcc ==="possType"?"-":"+"}</div>
            </div>
            <div className={`fi_options ${selectedAcc ==="possType" ? "show":"hide"}`}>
              <li>
                <input
                  type='checkbox'
                  id='2024'
                  name='possession_type'
                  class='filter-choice'
                  value='2024'
                />
                <label for='2024' class='filter'>
                  {" "}
                  2024
                </label>
              </li>
              <li>
                <input
                  type='checkbox'
                  id='rera'
                  name='possession_type'
                  class='filter-choice'
                  value='rera'
                />
                <label for='rera' class='filter'>
                  {" "}
                  RERA Ceritified Projects
                </label>
              </li>
              <li>
                <input
                  type='checkbox'
                  id='readtToMoveIn'
                  name='possession_type'
                  class='filter-choice'
                  value='readtToMoveIn'
                />
                <label for='readtToMoveIn' class='filter'>
                  {" "}
                  Ready to move in
                </label>
              </li>
              <li>
                <input
                  type='checkbox'
                  id='underConstruction'
                  name='possession_type'
                  class='filter-choice'
                  value='underConstruction'
                />
                <label for='underConstruction' class='filter'>
                  {" "}
                  Under Construction
                </label>
              </li>
            </div>
          </div>
        </div>
        <div className='li_items'>
          <div className="li_head_row">
             {/* <div className="heading">
                <h3 className="title">
                   {"Projects in "}
                   {"Gurugram"}
                </h3>
                <p className="description">
                    {" Showing 1 - "}
                    {Elem.length}
                    {" of "}
                    {Elem.length}
                </p>
             </div> */}
             <div className="sorting-filter">
                <div>
                  <select>
                    <option value="0">Sort by</option>
                    <option value="bestSeller">Best Seller</option>
                    <option value="newest">Newest</option>
                  </select>
                </div>
             </div>
          </div>
          <div className="li_grid_area">
          {Elem.map((elem)=>{
            return <PropViewCard key={elem.id} {...elem}/>
          })}
          </div>
        </div>
      </div>
      <Footer/>
    </Wrapper>
  );
}

export default Properties;
const Wrapper = styled.section`
  box-sizing: border-box;
  font-family: DM Sans, sans-serif;
  .li_options {
    padding: 30px 0;
    border-right: 1px solid #d9d9d9;
  }
  .fi_space {
    padding: 0 30px;
    margin-bottom: 20px;
  }
  .theme_btn {
    position: relative;
    background-color: #313131;
    font-size: 16px;
    color: #fff;
    padding: 10px 30px 12px;
    display: inline-block;
    border-radius: 40px;
    border: 0;
    font-weight: 500;
    transition: 0.3s;
    cursor: pointer;
  }
  .li_options .fi_heading {
    font-family: DM Sans;
    font-size: 12px;
    font-weight: 500;
    line-height: 16px;
    color: #959595;
    padding: 0 30px;
    margin-bottom: 15px;
  }
  .li_options .fi_acc {
    padding: 0 30px;
  }
  .fi_head {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    padding: 15px 0;
    font-weight: 500;
    cursor: pointer;
    font-size: 15px;
    color: #535353;
  }
  .toggleIcon {
    font-size: 19px;
    line-height: 1;
  }
  .fi_options {
    list-style: none;
    padding-bottom: 10px;
  }
  .show {
    display: block;
  }
  .fi_options li {
    margin-right: 6px;
    margin-bottom: 7px;
    display: inline-block;
  }
  .fi_options li input {
    display: none;
  }
  .fi_options .filter {
    border: 1px solid #ccc;
    width: fit-content;
    padding: 8px 15px;
    color: #959595;
    border-radius: 30px;
    font-size: 13px;
    display: inline-block;
    cursor: pointer;
  }
  label {
    margin-bottom: 0rem !important;
  }
  .li_options .fi_acc:not(:last-child) {
    border-bottom: 1px solid #d9d9d9;
  }
  .hide{
    display:none;
  }
  .li_items{
    width:75%;
    padding:30px;
  }
  .li_head_row{
    display:flex;
    flex-wrap:wrap;
    align-items:center;
    justify-content:space-between;
    color:#313131;
    margin-bottom:0px;
  }
  .li_head_row .title{
    font-size:20px;
    font-weight: 600;
    margin:0;
    line-height:24px;
  }
  .li_head_row .description{
    margin-bottom:0;
    color:#535353;
    font-size:16px;
    margin-top:12px;
    line-height:24px;
  }
  .li_head_row .sorting-filter select{
    padding:8px 10px;
    border:1px solid #d9d9d9;
    border-radius:35px;
    outline:none;
    color:#828282;
  }
  .filter-choice:checked + label {
    color: #e5652e;
    border-color: #e5652e;
    background: rgba(255, 99, 71, 0.2);
    
  }
  
  label{
    font-size:14px;
  }
  @media only screen and (max-width: 1100px) {
    .li_options{
      display:none;
    }
    .li_items{
      width:100%;
    }
    .sorting-filter{
      display:none;
    }
  }
`;
