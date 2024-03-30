import React from "react";
import styled from "styled-components";
function OurServices() {
  return (
    <Wrapper className="section">
      <div className="max-w-screen-xl mx-auto px-10 py-10">
        <div className="row ">

          
          <div className="col-md-3">
            <div
              className="col max-mb-30 aos-init aos-animate"
              data-aos="fade-up"
            >
              {" "}
              <a
                href="#"
                className="icon-box text-center"
                data-bg-color="#fff"
                style={{ backgroundColor: "rgb(255, 255, 255)" }}
                data-abc="true"
              >
                <div className="icon">
                  {" "}
                  <img
                    src="../../Images/consulting.jpg"
                    style={{ height: "204px" }}
                    width="240"
                    height="220"
                  />{" "}
                </div>
                <div className="content">
                  <h3 className="title fz-20">Real Estate Consulting</h3>
                  <div className="desc ">
                    <p className="text-justify items-center">
                      We Provide the best services to help you get your dream
                      home as per your expectations.
                    </p>
                  </div>{" "}
                </div>
              </a>{" "}
            </div>
          </div>


          <div className="col-md-3">
            <div
              className="col max-mb-30 aos-init aos-animate"
              data-aos="fade-up"
            >
              {" "}
              <a
                href="#"
                className="icon-box text-center"
                data-bg-color="#fff"
                style={{ backgroundColor: "rgb(255, 255, 255)" }}
                data-abc="true"
              >
                <div className="icon">
                  {" "}
                  <img
                    src="../../Images/lawyer.jpg"
                    style={{ height: "204px" }}
                    width="220"
                    height="220"
                    alt=""
                  />{" "}
                </div>
                <div className="content">
                  <h3 className="title fz-20 ">Legal Advice</h3>
                  <div className="desc">
                    <p className="text-justify items-center">
                      The major issue is trust worthy legal assistance. We will
                      help you through all the aspect.
                    </p>
                  </div>{" "}
                </div>
              </a>{" "}
            </div>
          </div>


          <div className="col-md-3">
            <div
              className="col max-mb-10 aos-init aos-animate"
              data-aos="fade-up"
            >
              {" "}
              <a
                href="#"
                className="icon-box text-center"
                data-bg-color="#fff"
                style={{ backgroundColor: "rgb(255, 255, 255)" }}
                data-abc="true"
              >
                <div className="icon ">
                  {" "}
                  <img
                    src="../../../Images/interiordesign.png"
                    style={{ height: "204px" }}
                    width="220"
                    height="220"
                    alt=""
                  />{" "}
                </div>
                <div className="content">
                  <h3 className="title fz-20 ">Interior Design</h3>
                  <div className="desc">
                    <p className="text-justify items-center">
                      These interior decoration ideas, tips, and tricks will
                      help you make home decisions.
                    </p>
                  </div>{" "}
                </div>
              </a>{" "}
            </div>
          </div>


          <div className="col-md-3">
            <div
              className="col max-mb-30 aos-init aos-animate"
              data-aos="fade-up"
            >
              {" "}
              <a
                href="#"
                className="icon-box text-center"
                data-bg-color="#fff"
                style={{ backgroundColor: "rgb(255, 255, 255)" }}
                data-abc="true"
              >
                <div className="icon">
                  {" "}
                  <img
                    src="../../Images/homeloan.jpg"
                    style={{ height: "204px" }}
                    width="220"
                    height="220"
                    alt=""
                  />{" "}
                </div>
                <div className="content">
                  <h3 className="title fz-20">Home Loan</h3>
                  <div className="desc">
                    <p className="text-justify items-center">
                      We will help you to provide best home loan to complete
                      your dream and guide.
                    </p>
                  </div>{" "}
                </div>
              </a>{" "}
            </div>
          </div>

          <div className="col-md-3 d-lg-none d-md-none">
            <div
              className="col  max-mb-30 aos-init aos-animate"
              data-aos="fade-up"
            >
              <a
                className="icon-box text-center"
                data-bg-color="#fff"
                style={{ backgroundColor: "rgb(255, 255, 255)" }}
                data-abc="true"
              >
                <div className="icon">
                  <img
                    src="../../Images/Construction.JPG"
                    style={{ height: "204px" }}
                    width="220"
                    height="220"
                    alt="Construction"
                  />
                </div>
                <div className="content">
                  <h3 className="title fz-20">Construction</h3>
                  <div className="desc">
                    <p className="text-justify items-center">
                      Skilled talents in real estate and construction are
                      essential for translating social visions into tangible
                      Smart Cities.
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </div>


        </div>
      </div>
    </Wrapper>
  );
}

export default OurServices;
const Wrapper = styled.section`
  body {
    background-color: #d6d2d2;
    font-family: "Poppins", sans-serif;
    font-weight: 300;
  }

  .icon-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 20px 30px;
    transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
    border-radius: 5px;
    z-index: 99;
    text-decoration: none;
    margin-bottom: 20px;
    background-color: #fff;
    box-shadow: 0 0 40px rgba(51, 51, 51, 0.1);
  }

  .icon-box:hover {
    transform: translateY(-15px);
  }

  .icon-box .content .title.fz-20 {
    font-size: 20px;
  }

  .icon-box .content .title {
    font-size: 24px;
    line-height: 1.5;
    margin: 0;
    color: #3f3a64;
  }

  .icon-box .content .desc {
    margin-top: 10px;
  }

  .icon-box .content .desc p {
    line-height: 1.6;
    color: #696969;
  }

  .icon-box .content .link {
    font-size: 14px;
    font-weight: 700;
    line-height: 1;
    display: flex;
    align-items: center;
    margin-top: 34px;
    padding: 5px 0;
    color: #8c89a2;
  }

  .icon-box .content .link i {
    font-size: 16px;
    line-height: 14px;
    margin-left: 14px;
  }
`;
