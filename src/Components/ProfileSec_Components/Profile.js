import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import PropCardUser from "../Actual_Components/PropCardUser";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";
import { PolarArea, Radar } from "react-chartjs-2";
import { CityState,PolarData } from "../Chart/chart";
import PostPropertyForm from "../Forms.js/PostPropertyForm/PostPropertyForm";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
);

export default function Profile() {
  const [selectedTab, setSelectedTab] = useState("infoelm");

  const toggleElement = (tabId) => {
    setSelectedTab(tabId);
  };

  return (
    <Wrapper className='section'>
      <div className='mainContainer bx-sd'>
        <div className='profileTop bx-sd'>
          <div className='d-flex'>
            <div className='proSubSec d-flex'>
              <div className='imgDiv'>
                <img
                  src='https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=740&t=st=1695292715~exp=1695293315~hmac=d66236373adebac9633c3beafb01315b08c4390d75a632e02a1aab4d2b52110a'
                  alt=''
                />
              </div>
              <div style={{marginLeft:"30px"}}>
                <p className='pName'>Prosing King</p>
                <p className='pSub'>
                  <span className='w60-db'>Role</span> : Seller{" "}
                </p>
                <p className='pSub'>
                  <span className='w60-db'>Email</span> : prosing@gmail.com
                </p>
                <p className='pSub'>
                  <span className='w60-db'>Mobile</span> : +91(9876543210)
                </p>
              </div>
            </div>
            <div>
              <button
                type='submit'
                className='btn btn-danger ml-auto mr-sm-2 mb-md-0 mb-lg-0'>
                Edit Profile
              </button>
              <img src='' alt='' />
            </div>
          </div>
        </div>
        <div className='middleTopHeading d-flex'>
          <div
            className={`list_see ${selectedTab === "genDiv" ? "active" : ""}`}
            id='genDiv'
            onClick={() => toggleElement("genDiv")}>
            General Information
          </div>
          <div
            className={`list_see ${selectedTab === "lisDiv" ? "active" : ""}`}
            id='lisDiv'
            onClick={() => toggleElement("lisDiv")}>
            Listed Properties
          </div>
          <div
            className={`list_see ${selectedTab === "bokDiv" ? "active" : ""}`}
            id='bokDiv'
            onClick={() => toggleElement("bokDiv")}>
            Post Properties <span className="bokDivSpan">Free</span>
          </div>
        </div>
        {selectedTab === "genDiv" && (
          <div className='infoSec mt-4 ml-2' id='infoelm'>
            <p className='headInfo'>
              Info <span className='infoHeadSpan'></span>
            </p>

            <div className='ml-2'>
              <div className='d-flex'>
                <div className='wd-150 tx-cl-gr'>First name</div>
                <div className='wd-50'>:</div>
                <div className='wd-300'>Prosing</div>
              </div>
              <div className='d-flex'>
                <div className='wd-150 tx-cl-gr'>Last name</div>
                <div className='wd-50'>:</div>
                <div className='wd-300'>King</div>
              </div>
              <div className='d-flex'>
                <div className='wd-150 tx-cl-gr'>Gender</div>
                <div className='wd-50'>:</div>
                <div className='wd-300'>Male</div>
              </div>
              <div className='d-flex'>
                <div className='wd-150 tx-cl-gr'>Email</div>
                <div className='wd-50'>:</div>
                <div className='wd-300'>prosing@gmail.com</div>
              </div>
              <div className='d-flex'>
                <div className='wd-150 tx-cl-gr'>Phone number</div>
                <div className='wd-50'>:</div>
                <div className='wd-300'>9876543210</div>
              </div>
              <div className='d-flex'>
                <div className='wd-150 tx-cl-gr'>Default address</div>
                <div className='wd-50'>:</div>
                <div className='wd-300'>North Carelonia, Gurgaon</div>
              </div>
              <div className='d-flex'>
                <div className='wd-150 tx-cl-gr'>User name</div>
                <div className='wd-50'>:</div>
                <div className='wd-300'>Prosing King</div>
              </div>
              <div className='d-flex'>
                <div className='wd-150 tx-cl-gr'>Password</div>
                <div className='wd-50'>:</div>
                <div className='wd-300'>*******</div>
              </div>
              <div className='d-flex'>
                <div className='wd-150 tx-cl-gr'>Role</div>
                <div className='wd-50'>:</div>
                <div className='wd-300'>Seller/Broker</div>
              </div>
            </div>
            <div>
              <p className='headInfo mt-4 d'>
                Check Out More Intersting Details{" "}
                <span className='infoHeadSpan'></span>
                </p>
                <div className="d-flex justify-content-between flex-wrap" style={{padding:"0px 40px"}}>
                <div style={{width:"450px"}}>
                <Radar data={PolarData} />
                
                </div>
                <div style={{width:"450px"}}>
                <PolarArea
                  data={CityState}
                  options={{
                    title: {
                      display: true,
                      text: "Average Rainfall per month",
                      fontSize: 10,
                    },
                    legend: {
                      display: true,
                      position: "right",
                    },
                  }}
                />
                
                </div>
                
                </div>
            </div>
          </div>
        )}
        {selectedTab === "lisDiv" && (
          <div id='listelm'>
            <div className='list_view_sec mt-4 d-flex flex-wrap justify-content-between'>
              <PropCardUser />
              <PropCardUser />
              <PropCardUser />
              <PropCardUser />
            </div>
          </div>
        )}
        {selectedTab === "bokDiv" && (
          <div id='bokelm'>
            <div className='list_view_sec mt-4 d-flex flex-wrap justify-content-between'>
              <PostPropertyForm />
            </div>
          </div>
        )}
      </div>
      <Outlet />
    </Wrapper>
  );
}

const Wrapper = styled.section`
  .mainContainer { 
    width: 85%;
    border-radius: 15px;
    margin: 2% auto 2% auto;
    padding: 20px 30px;
  }
  .bx-sd{
    box-shadow: 0px 0px 20px #0000001a;
  }
  .profileTop {
    height: 250px;
    border-radius: 15px;
    background: #c9f3ee;
    margin: 20px auto;
    padding: 30px 50px;
  }
  .imgDiv {
    width: 200px;
    height: 190px;
    background: white;
    border-radius: 15px;
  }
  .imgDiv > img {
    width: 100%;
    height: 100%;
    border-radius: 15px;
  }
  .pName {
    font-size: 30px;
    font-weight: 600;
  }
  .pSub {
    font-size: 18px;
    word-spacing: 15px;
  }
  .acTag {
    padding: 4px 15px;
    background: rgba(164, 255, 5, 0.5);
    font-size: 17px;
    border-radius: 15px;
    font-weight: 600;
    color: green;
  }
  .proSubSec {
    flex: 70%;
  }
  .middleTopHeading > div {
    padding: 10px;
    cursor: pointer;
    margin-left: 10px;
  }
  .middleTopHeading > div.active {
    padding: 10px;
    font-size: large;
    border-bottom: 2px solid red;
  }
  .headInfo {
    font-weight: bold;
    font-size: medium;
  }
  .wd-150 {
    width: 150px;
  }
  .tx-cl-gr {
    color: gray;
  }
  .wd-50 {
    width: 50px;
  }
  .wd-300 {
    width: 300px;
  }
  .w60-db {
    width: 60px;
    display: inline-block;
  }
  .bokDivSpan{
    padding:3px 5px;
    font-size:10px;
    background:red;
    color:white;
    border-radius:8px;
  }
`;
