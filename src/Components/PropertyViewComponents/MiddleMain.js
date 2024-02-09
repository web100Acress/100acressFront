/** @format */

import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import Carddev from "../../Components/Actual_Components/Carddev";
import { ScrollingCarousel, Carousel } from "@trendyol-js/react-carousel";
import Avatar from "../../Images/businesswoman-character-avatar-icon-vector-12800166.jpg";
import { useParams } from "react-router-dom";
import { InfinitySpin } from "react-loader-spinner";
import { Helmet } from "react-helmet";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { useProductContext } from "../../Context/productContext";
import CourselBhk from "./CourselBhk";

const API = "https://acre.onrender.com/property/viewAll";
const FORMAPIDATA = "https://api.100acress.com/userInsert";

function MiddleMain() {
  const {
    singleProperty,
    isSingleLoading,
    getSingleProduct,
    PreLuanchSimilarProperties,
    PreLuanchFeatProperties,
  } = useProductContext();
  const { url } = useParams();

  function handleEmailInput() {
    window.open("mailto:cs@100acress.com");
  }
  useEffect(() => {
    getSingleProduct(`${API}/${url}`);
  }, []);

  

  useEffect(() => {
    if (singleProperty) {
      setFormValue((prevFormValue) => ({
        ...prevFormValue,
        projectName: singleProperty.projectName || "",
        address: singleProperty.location || "",
      }));
    }
  }, [singleProperty]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const timer = setTimeout(() => {
        handleShow();
    }, 9000);
    return () => clearTimeout(timer);
  }, []);

  const {
    city,
    aboutProject,
    configuration,
    location,
    maxCovered_Area,
    minCovered_Area,
    price,
    projectName,
    rera_No,
    status,
    photo,
    amentites,
    floorPlan,
    sitePlan,
    locationMap,
    BHK_details,
    Aboutdeveloper,
    meta_title,
    meta_description,
  } = singleProperty;

  const [isProjectName, setProjectName] = useState("");

  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    mobile: "",
    projectName: isProjectName,
    address: "",
    status: "Pending",
  });

  if (isSingleLoading || !photo || !floorPlan || !sitePlan || !locationMap) {
    return (
      <div style={{ margin: "30vh 30vw 30vh 43vw" }}>
        <InfinitySpin width='500' color='red' />
      </div>
    );
  }

  const StatusFinal = status.charAt(0).toUpperCase() + status.slice(1);

  const amenitiesFinal = amentites[0].split(",");

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
    console.log(formValue);
  };
  const handleResetClick = () => {
    setFormValue({
      name: "",
      email: "",
      mobile: "",
    });
  };

//  this is timeout function that runs after dealy of 9 seconds


  const handleDownload = (e) => {
    let downloadPdf = document.querySelector("downloadMainFile");
    var timeLeft = 2;

    var downloadTimer = setInterval(function timeCount() {
      timeLeft -= 1;

      if (timeLeft <= 0) {
        clearInterval(downloadTimer);
      }
    }, 1000);
  };

  const handleAnimation = () => {
    let sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));
    let upload = document.querySelector(".upload");
    let uploadBtn = document.querySelector(".upload__button");
    uploadBtn.addEventListener("click", async () => {
      upload.classList.add("uploading");
      await sleep(3000);
      upload.classList.add("uploaded");
      await sleep(2000);
      upload.classList.remove("uploading");
      upload.classList.add("uploaded-after");
      await sleep(1000);
      upload.className = "upload";
    });
  };

  function submitFormData(e) {
    e.preventDefault();
    axios({
      method: "post",
      url: FORMAPIDATA,
      data: formValue,
    })
      .then((res) => {
        console.log(res.data.message);
        alert("Your Message has been sent!");
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  return (

    <Wrapper className='section'>
          <Modal>
            <p>{projectName}</p>
          </Modal>

      <Helmet>
        <title>{meta_title}</title>
        <meta name='description' content={meta_description} />
      </Helmet>
      <div className='dkmseujM d-flex'>
        <div className='SideMenu position-relative'>
          <ul className='sideNavBarSe'>
            <li className='lIst_Hover'>
              <a href='#overview'>Overview</a>
            </li>
            <li className='lIst_Hover'>
              <a href='#about-project'>About Project</a>
            </li>
            <li className='lIst_Hover'>
              <a href='#floor-plans'>Floor Plan</a>
            </li>
            <li className='lIst_Hover'>
              <a href='#specification'>Specification</a>
            </li>
            <li className='lIst_Hover'>
              <a href='#amenities'>Amenities</a>
            </li>
            <li className='lIst_Hover'>Brochure</li>
            <li className='lIst_Hover'>
              <a href='#location-map'>Location Map</a>
            </li>
            <li className='lIst_Hover'>Project Properties</li>
            <li className='lIst_Hover'>
              <a href='#about-developer'>About Developer</a>
            </li>
          </ul>
        </div>
        <div className='OsMP' id='overview'>
          <div className='topEst lmN'>
            <div style={{ display: "flex" }}>
              <div className='cnMO'>
                <h1 className='titleMB'>{projectName}</h1>
                <span>{location}</span>
              </div>
            </div>
            <div className='ndMO'>₹ {price} Cr</div>
          </div>
          <div>
            <img
              src={photo[0].url}
              alt=''
              style={{ width: "100%", borderRadius: "15px", height: "500px" }}
            />
          </div>
          <div className='fdLopKl'>
            <div className='grid bxRP'></div>
          </div>
          <div className='gridBtm'>
            <div className='mlsM'>
              <span>Location</span>
              <p className='NNO'>{location}</p>
            </div>
            <div className='mlsM'>
              <span>Configuration</span>
              <p className='NNO'>{configuration}</p>
            </div>
            <div className='mlsM'>
              <span>Status</span>
              <p className='NNO'>{StatusFinal}</p>
            </div>
            <div className='mlsM'>
              <span>Rera No</span>
              <p className='NNO'>{rera_No}</p>
            </div>
            <div className='mlsM'>
              <span>Covered Area</span>
              <p className='NNO'>
                {minCovered_Area} Sq.Ft. - {maxCovered_Area} Sq.Ft.
              </p>
            </div>
          </div>
          <div className='cnMKidNM'>
            <div className='midellCN'>
              <div id='about-project'>
                <div className='TopElM ldM'>
                  <p>About Project</p>
                  <span className='discR'>{aboutProject}</span>
                </div>
              </div>

              <div id='floor-plans'>
                <div className='TopElM ldM'>
                  <div className='topEst'>
                    <div>
                      <p>Floor Plans</p>
                    </div>
                  </div>
                  <div className='d-flex'>
                    <Carousel
                      show={1}
                      slide={1}
                      swiping={true}
                      dynamic={true}
                      rightArrow={<div className='cmNIdpO'>{">"}</div>}
                      leftArrow={<div className='cmNIdpO'>{"<"}</div>}>
                      {BHK_details.map((elem) => {
                        return <CourselBhk key={elem._id} {...elem} />;
                      })}
                    </Carousel>
                  </div>
                </div>
              </div>


              <div id='amenities'>
                <div className='TopElM ldM'>
                  <p>Amenities</p>
                  <span className='discR'>
                    {projectName} {city} presents an exclusive opportunity to
                    own a stunning home that offers all kinds of amenities and
                    facilities. This includes a swimming pool, school, and easy
                    access to solar lighting.
                  </span>
                  <div
                    className='d-flex dgdmPmc'
                    style={{ flexWrap: "wrap", marginTop: "20px" }}>
                    {amenitiesFinal.map((item) => {
                      var Elem = item.toUpperCase();

                      return (
                        <div
                          style={{
                            maxWidth: "186px",
                            justifyContent: "center",
                            flexDirection: "column",
                            alignItems: "center",
                            margin: "5px 7px",
                            border: "1px solid grey",
                          }}
                          className='d-flex bor-red-20 bo-shdw dgGGH'>
                          <span className='amenIcon w-50 dis-blc'>
                            <span className='w-100 h-auto'></span>
                          </span>
                          <span
                            className='amenText'
                            style={{ color: "initial", fontSize: "15px" }}>
                            {Elem}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div id='similar-properties'>
                <div className='TopElM ldM'>
                  <p style={{ marginBottom: "17px" }}>Similar Properties</p>
                  <ScrollingCarousel swiping={true}>
                    {PreLuanchSimilarProperties.map((elem) => {
                      return <Carddev key={elem.id} {...elem} />;
                    })}
                  </ScrollingCarousel>
                  <div style={{ marginTop: "20px" }} className='MMcnCSS'>
                    <span className='dfg djnNN d-flex'>
                      Show all Properties
                      <svg
                        width='13'
                        height='18'
                        viewBox='0 0 13 12'
                        fill='none'
                        style={{ marginLeft: "6px" }}>
                        <path
                          d='M1.93896 6H11.9654'
                          stroke='#E7B554'
                          stroke-width='2'
                          stroke-linecap='round'
                          stroke-linejoin='round'></path>
                        <path
                          d='M6.95215 1L11.9653 6L6.95215 11'
                          stroke='#E7B554'
                          stroke-width='2'
                          stroke-linecap='round'
                          stroke-linejoin='round'></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>

              <div id='viewed-similar-properties'>
                <div className='TopElM ldM'>
                  <p style={{ marginBottom: "17px" }}>
                    People who viewed this also viewed
                  </p>
                  <ScrollingCarousel swiping={true}>
                    {PreLuanchFeatProperties.map((elem) => {
                      return <Carddev key={elem.id} {...elem} />;
                    })}
                  </ScrollingCarousel>
                  <div style={{ marginTop: "20px" }} className='MMcnCSS'>
                    <span className='dfg djnNN d-flex'>
                      Show all Properties
                      <svg
                        width='13'
                        height='18'
                        viewBox='0 0 13 12'
                        fill='none'
                        style={{ marginLeft: "6px" }}>
                        <path
                          d='M1.93896 6H11.9654'
                          stroke='#E7B554'
                          stroke-width='2'
                          stroke-linecap='round'
                          stroke-linejoin='round'></path>
                        <path
                          d='M6.95215 1L11.9653 6L6.95215 11'
                          stroke='#E7B554'
                          stroke-width='2'
                          stroke-linecap='round'
                          stroke-linejoin='round'></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>

              <div id='location-map'>
                <div className='TopElM ldM'>
                  <div className='topEst'>
                    <div>
                      <p>Location Map</p>
                    </div>
                  </div>
                  <div className='d-flex'>
                    <img
                      src={locationMap.url}
                      alt='Developer Image'
                      srcset=''
                      className='flrImg mnJJ bor-red-20 '
                    />
                  </div>
                </div>
              </div>

              <div id='location-map'>
                <div className='TopElM ldM'>
                  <div className='topEst'>
                    <div>
                      <p>Site Plan</p>
                    </div>
                  </div>
                  <div className='d-flex'>
                    <img
                      src={sitePlan.url}
                      alt='Site Plan'
                      srcset=''
                      className='flrImg mnJJ bor-red-20 '
                    />
                  </div>
                </div>
              </div>

              <div id='about-developer'>
                <div className='TopElM ldM'>
                  <p>About Developer</p>
                  <div className='d-flex dfvb'>
                    <span className='discR'>{Aboutdeveloper}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className='stickyBar mTmB'>
              <div className='prX bSp bor-red-20'>
                <p style={{ marginBottom: "0px" }}>Yes, I'm Interested !</p>
                <span>Know More About this property</span>
                <div style={{ marginTop: "10px" }}>
                  <form onSubmit={submitFormData}>
                    <input
                      type='text'
                      name='name'
                      onChange={onChange}
                      id='validationCustom01'
                      placeholder='Full Name'
                      required
                      
                    />
                    <input
                      type='number'
                      name='mobile'
                      onChange={onChange}
                      id='validationCustom02'
                      placeholder='Mobile Number'
                      onKeyPress={(e) => {
                        if (e.target.value.length > 9) {
                          e.preventDefault();
                        }
                      }}
                      required
                    />
                    <input
                      type='email'
                      name='email'
                      onChange={onChange}
                      id='validationCustom03'
                      placeholder='Email Address'
                    />
                    <button
                      type='submit'
                      className='btn btn-primary'
                      id='submitButon'>
                      Submit
                    </button>
                    <button
                      type='reset'
                      onClick={handleResetClick}
                      className='btn btn-outline-secondary'>
                      Reset
                    </button>
                  </form>
                </div>
              </div>

              <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton style={{fontSize:"20px",fontWeight:"bold"}}>Are you Interested !</Modal.Header>
                <Modal.Body >
                  <span>Know More About this property</span>
                  <div style={{ marginTop: "10px" }} className="">
                    <form onSubmit={submitFormData} className="px-2">
                    
                      <input
                        type='text'
                        name='name'
                        onChange={onChange}
                        id='validationCustom01'
                        placeholder='Full Name'
                        required
                      className="mb-2 me-2 w-100 p-1 px-3"
                      style={{outline:"none",border:"1px solid #ced4da",color: "#495057",borderRadius:"0.25rem"}}
                      />
                      <input
                      className="mb-2 me-2 w-100 p-1 px-3"
                        type='number'
                        name='mobile'
                        min={0}
                        onChange={onChange}
                        id='validationCustom02'
                        placeholder='Mobile Number'
                        onKeyPress={(e) => {
                          if (e.target.value.length > 9) {
                            e.preventDefault();
                          }
                        }}
                        required
                        style={{outline:"none",border:"1px solid #ced4da",color: "#495057",borderRadius:"0.25rem"}}
                      />
                      <input
                        type='email'
                        name='email'
                        onChange={onChange}
                        id='validationCustom03'
                        placeholder='Email Address'
                        className="mb-2 me-2 w-100 p-1 px-3"
                        style={{outline:"none",border:"1px solid #ced4da",color: "#495057",borderRadius:"0.25rem"}}
                      />
                      <button
                        type='submit'
                        className='btn btn-primary'
                        id='submitButon'
                        >
                        Submit
                      </button>
                      <button
                        type='reset'
                        onClick={handleResetClick}
                        className='btn btn-outline-secondary mt-2 ms-2'>
                        Reset
                      </button>
                    </form>
                  </div>
                </Modal.Body>
              </Modal>

              <div className='drX bSp d-flex bor-red-20'>
                <div>
                  <img src={Avatar} width={50} alt='Avatar' />
                </div>
                <div style={{ marginLeft: "20px" }}>
                  <span>Get In Touch</span>
                  <p
                    style={{
                      marginBottom: "0px",
                      fontSize: "medium",
                      cursor: "pointer",
                    }}
                    onClick={handleEmailInput}>
                    cs@100acress.com
                  </p>
                </div>
              </div>

              <div className='drX bSp d-flex justify-content-center bor-red-20'>
                <div class='upload'>
                  <div class='upload__info'>
                    <svg
                      t='1581822650945'
                      class='clip'
                      viewBox='0 0 1024 1024'
                      version='1.1'
                      xmlns='http://www.w3.org/2000/svg'
                      p-id='3250'
                      width='20'
                      height='20'>
                      <path
                        d='M645.51621918 141.21142578c21.36236596 0 41.79528808 4.04901123 61.4025879 12.06298852a159.71594214 159.71594214 0 0 1 54.26367236 35.87255836c15.84503198 16.07739258 27.76959252 34.13726783 35.78356909 54.13513184 7.86071778 19.30572486 11.76635766 39.80291724 11.76635767 61.53607177 0 21.68371583-3.90563989 42.22045875-11.76635767 61.54101586-8.01397729 19.99291992-19.95831275 38.02807617-35.78356909 54.08569313l-301.39672877 302.0839231c-9.21038818 9.22027564-20.15112281 16.48278832-32.74310277 21.77270508-12.29040503 4.81036401-24.54125953 7.19329834-36.82177783 7.19329834-12.29040503 0-24.56103516-2.38293433-36.85638427-7.19329834-12.63647461-5.28991675-23.53271461-12.55737281-32.7381587-21.77270508-9.55151367-9.58117675-16.69042992-20.44775367-21.50573731-32.57995583-4.7856443-11.61804223-7.15869117-23.91339135-7.15869188-36.9255979 0-13.14074708 2.37304688-25.55474854 7.16363524-37.19256639 4.81036401-11.94927954 11.94927954-22.78619408 21.50079395-32.55029274l278.11614966-278.46221923c6.45172119-6.51104737 14.22344971-9.75421118 23.27563501-9.75421119 8.8692627 0 16.54705787 3.24316383 23.03338622 9.75421119 6.47644019 6.49127173 9.73937964 14.18389916 9.73937964 23.08282495 0 9.0521853-3.26293945 16.81896972-9.73937964 23.32012891L366.97489888 629.73773218c-6.32812477 6.2935183-9.48724342 14.08007836-9.48724415 23.30529736 0 9.06701684 3.15417457 16.75964356 9.48724414 23.08776904 6.80273414 6.50610328 14.55963111 9.75915528 23.26574683 9.75915527 8.67150855 0 16.43334961-3.253052 23.27563501-9.76409935l301.37695313-302.04931665c18.93988037-18.96459937 28.40734887-42.04742432 28.40734814-69.25836158 0-27.16149926-9.4674685-50.26409912-28.40734815-69.22869849-19.44415283-19.13269043-42.55664086-28.72375464-69.31274438-28.72375536-26.97363258 0-49.99218727 9.59106422-69.1001587 28.72375536L274.3370815 536.89227319a159.99774146 159.99774146 0 0 0-35.80828883 54.33288526c-8.0337522 19.65179443-12.04321289 40.2824707-12.04321289 61.79809618 0 21.20910645 4.00451661 41.81011963 12.04321289 61.79809547 8.17218018 20.34393287 20.10168481 38.36920166 35.80828883 54.08569312 16.225708 16.06256104 34.30535888 28.13049292 54.23400854 36.15930176 19.91381813 8.0337522 40.47033667 12.06793189 61.64978002 12.0679326 21.13989281 0 41.70135474-4.03417969 61.63000513-12.0679326 19.91876221-8.02386474 38.01818872-20.09674073 54.2241211-36.15435768l300.86773656-301.53515601c6.47644019-6.50115991 14.23828125-9.76904273 23.28057912-9.76904344 8.88903833 0 16.56188941 3.26293945 23.04821776 9.76904344 6.48632836 6.48632836 9.7245481 14.17895508 9.7245481 23.06799269 0 9.09667992-3.23822046 16.8535769-9.7245481 23.37451172L552.40379244 815.35449242c-22.00012231 22.01989722-47.32745362 38.88336158-75.986938 50.49151564C449.10209565 877.14270043 420.37834101 882.78857422 390.21592671 882.78857422c-30.01904297 0-58.74279761-5.64587378-86.20587183-16.94256616-28.6842041-11.60815406-54.00659203-28.47161842-76.00671362-50.49151564a226.19586182 226.19586182 0 0 1-50.13061524-75.90289354A226.86328125 226.86328125 0 0 1 160.9697104 653.04797364c0-30.08331323 5.62115479-58.88122559 16.90795899-86.38385035 11.40545654-28.37768578 28.11566138-53.75939917 50.13061523-76.15997313h0.24719287L530.14164643 189.20135474c15.69177247-15.731323 33.68737817-27.70037818 53.98681641-35.89727735C604.09666377 145.26043701 624.55430562 141.23120141 645.51127583 141.23120141V141.21142578z'
                        p-id='3251'></path>
                    </svg>
                    <span class='upload__filename'>Document.pdf</span>
                  </div>
                  <a
                    className='downloadMainFile'
                    style={{ borderRadius: "inherit" }}
                    onClick={handleDownload(this)}>
                    <button class='upload__button' onClick={handleAnimation}>
                      <div class='upload__button__text'>Download</div>
                    </button>
                  </a>
                  <div class='upload__hint'>Opening Form</div>
                  <div class='upload__progress'>
                    <svg
                      width='16'
                      height='16'
                      class='check'
                      stroke='currentColor'
                      fill='none'
                      viewBox='0 0 13 11'>
                      <polyline points='1 5.5 5 9.5 12 1.5'></polyline>
                    </svg>
                    Opened
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='ameniTPlace TopElM' id='amenities-around'>
            <p>Amenetites neaby to Project</p>
            <div className='KsmM'>
              <div className='SquareAmen bor-red-20'>
                <table className='amen_Tble'>
                  <tr>
                    <th className='vdjN'>Schools/Colleges</th>
                    <th className='ksdjb'>Distance</th>
                  </tr>
                  <tr>
                    <td className='vzvX padTop'>Delhi Public School</td>
                    <td className='chmM padTop'>4 min (288 m)</td>
                  </tr>
                  <tr>
                    <td className='vzvX padTop'>Central Toronto Academy</td>
                    <td className='chmM padTop'>5 min (295 m)</td>
                  </tr>
                  <tr>
                    <td className='vzvX padTop'>
                      Tanjong Katong Secondary School
                    </td>
                    <td className='chmM padTop'>789 m</td>
                  </tr>
                  <tr>
                    <td className='vzvX padTop'>
                      Tanjong Katong Girls' School
                    </td>
                    <td className='chmM padTop'>240 m</td>
                  </tr>
                </table>
              </div>
              <div className='SquareAmen bor-red-20'>
                <table className='amen_Tble'>
                  <tr>
                    <th className='vdjN'>Metro Stations</th>
                    <th className='ksdjb'>Distance</th>
                  </tr>
                  <tr>
                    <td className='vzvX padTop'>Huda City Center</td>
                    <td className='chmM padTop'>4 min (288 m)</td>
                  </tr>
                  <tr>
                    <td className='vzvX padTop'>
                      <span className='ylwMTR'></span>M.G Road
                    </td>
                    <td className='chmM padTop'>2,135 m</td>
                  </tr>
                  <tr>
                    <td className='vzvX padTop'>
                      <span className='ylwMTR'></span>Hauz khas
                    </td>
                    <td className='chmM padTop'>789 m</td>
                  </tr>
                  <tr>
                    <td className='vzvX padTop'>
                      <span className='ylwMTR'></span>Sikanderpur
                    </td>
                    <td className='chmM padTop'>289 m</td>
                  </tr>
                </table>
              </div>
              <div className='SquareAmen bor-red-20'>
                <table className='amen_Tble'>
                  <tr>
                    <th className='vdjN'>Restaurant</th>
                    <th className='ksdjb'>Distance</th>
                  </tr>
                  <tr>
                    <td className='vzvX padTop'>Honk Kong Market</td>
                    <td className='chmM padTop'>35 min (3,288 m)</td>
                  </tr>
                  <tr>
                    <td className='vzvX padTop'>
                      <span className='ylwMTR'></span>M.G Road
                    </td>
                    <td className='chmM padTop'>40 min (2,241 m)</td>
                  </tr>
                </table>
              </div>
              <div className='SquareAmen bor-red-20'>
                <table className='amen_Tble'>
                  <tr>
                    <th className='vdjN padTop'>Parks</th>
                    <th className='ksdjb padTop'>Distance</th>
                  </tr>
                  <tr>
                    <td className='vzvX padTop'>Nothing to Show...</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sticky-quote-cta" onClick={handleShow}>
	      <a>For any Queries</a>
      </div>
        <div>
          <a
            href='https://api.whatsapp.com/send?phone=9811750130'
            class='dd-m-whatsapp'
            target="_blank"
            >
            <span class='icon'></span>
          </a>
        </div>
    </Wrapper>
  );
}

export default MiddleMain;

const Wrapper = styled.section`
  font-family: "DM Sans", sans-serif;
  .dkmseujM {
    margin-right: 10vw;
    margin-top: 5vh;
  }
  .dd-m-whatsapp {
    position: fixed;
    z-index: 999;
    bottom: 40px;
    right: 10px;
    width: 55px;
    height: 55px;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -moz-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -moz-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    background-color: #25d366;
    -webkit-transition: 0.3s all ease;
    -o-transition: 0.3s all ease;
    -moz-transition: 0.3s all ease;
    transition: 0.3s all ease;
    cursor: pointer;
    text-decoration: none;
    color: #25d366;
  }
  
  .dd-m-whatsapp:hover {
    -webkit-transform: translateY(-5px);
    -moz-transform: translateY(-5px);
    -ms-transform: translateY(-5px);
    -o-transform: translateY(-5px);
    transform: translateY(-5px);
    -webkit-box-shadow: 0 5px 15px 2px rgba(37, 211, 102, 0.3);
    -moz-box-shadow: 0 5px 15px 2px rgba(37, 211, 102, 0.3);
    box-shadow: 0 5px 15px 2px rgba(37, 211, 102, 0.3);
  }
  
  .dd-m-whatsapp .icon {
    width: 50%;
    height: 50%;
    display: block;
    fill: #fff;
    -webkit-transform: translateX(1px);
    -moz-transform: translateX(1px);
    -ms-transform: translateX(1px);
    -o-transform: translateX(1px);
    transform: translateX(1px);
  }
  
  .dd-m-whatsapp .icon {
    width: 70%;
    height: 70%;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 39 39'%3E%3Cpath d='M10.7 32.8l.6.3c2.5 1.5 5.3 2.2 8.1 2.2 8.8 0 16-7.2 16-16 0-4.2-1.7-8.3-4.7-11.3s-7-4.7-11.3-4.7c-8.8 0-16 7.2-15.9 16.1 0 3 .9 5.9 2.4 8.4l.4.6-1.6 5.9 6-1.5z' fill='%2325d366'/%3E%3Cpath d='M32.4 6.4C29 2.9 24.3 1 19.5 1 9.3 1 1.1 9.3 1.2 19.4c0 3.2.9 6.3 2.4 9.1L1 38l9.7-2.5c2.7 1.5 5.7 2.2 8.7 2.2 10.1 0 18.3-8.3 18.3-18.4 0-4.9-1.9-9.5-5.3-12.9zM19.5 34.6c-2.7 0-5.4-.7-7.7-2.1l-.6-.3-5.8 1.5L6.9 28l-.4-.6c-4.4-7.1-2.3-16.5 4.9-20.9s16.5-2.3 20.9 4.9 2.3 16.5-4.9 20.9c-2.3 1.5-5.1 2.3-7.9 2.3zm8.8-11.1l-1.1-.5s-1.6-.7-2.6-1.2c-.1 0-.2-.1-.3-.1-.3 0-.5.1-.7.2 0 0-.1.1-1.5 1.7-.1.2-.3.3-.5.3h-.1c-.1 0-.3-.1-.4-.2l-.5-.2c-1.1-.5-2.1-1.1-2.9-1.9-.2-.2-.5-.4-.7-.6-.7-.7-1.4-1.5-1.9-2.4l-.1-.2c-.1-.1-.1-.2-.2-.4 0-.2 0-.4.1-.5 0 0 .4-.5.7-.8.2-.2.3-.5.5-.7.2-.3.3-.7.2-1-.1-.5-1.3-3.2-1.6-3.8-.2-.3-.4-.4-.7-.5h-1.1c-.2 0-.4.1-.6.1l-.1.1c-.2.1-.4.3-.6.4-.2.2-.3.4-.5.6-.7.9-1.1 2-1.1 3.1 0 .8.2 1.6.5 2.3l.1.3c.9 1.9 2.1 3.6 3.7 5.1l.4.4c.3.3.6.5.8.8 2.1 1.8 4.5 3.1 7.2 3.8.3.1.7.1 1 .2h1c.5 0 1.1-.2 1.5-.4.3-.2.5-.2.7-.4l.2-.2c.2-.2.4-.3.6-.5s.4-.4.5-.6c.2-.4.3-.9.4-1.4v-.7s-.1-.1-.3-.2z' fill='%23fff'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 70%;
  }
  .sticky-quote-cta {
    height: auto;
    position: fixed;
    border-radius: 15px 0 15px 0;
    right: 0;
    top: 400px;
    top: 40vh;
    z-index: 10000;
  }
    
  .sticky-quote-cta a {
    color: white;
    text-decoration: none;
    background: #333;
    padding: 15px 20px 35px;
    display: block;
    font-weight: bold;
    font-size: 15px;
    border-radius: 5px;
    -ms-transform: rotate(-90deg) translate(0, -20px);
    -webkit-transform: rotate(-90deg) translate(0, -20px);
    transform: rotate(-90deg) translate(0, -20px);
    position: relative;
    right: -85px;
    transition: position 0.2s, right 0.2s;
    background: rgb(251,183,39);
    background: red;
  }
  
  .sticky-quote-cta a:hover {
    right: -70px;
    transition: position 0.2s, right 0.2s;
    cursor:pointer;
  }
  input {
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
  #submitButon {
    margin-right: 0.5rem;
  }
  .cnMO > .titleMB {
    font-size: x-large;
    font-weight: 600;
  }
  .SideMenu {
    flex: 20%;
    min-width: 200px;
    max-width: 254px;
  }
  .sideNavBarSe {
    position: sticky;
    top: 7%;
  }
  .OsMP {
    flex: 80%;
    max-width: 1154px;
  }
  .dis-blc {
    display: block;
  }
  .wid-132px {
    width: 132px;
    height: auto;
  }
  .fdLopKl {
    display: grid;
    grid-template-columns: 1fr 0.7fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-auto-columns: 1fr;
    gap: 10px 15px;
    grid-auto-flow: row;
  }
  .vbU {
    grid-area: 1/3/3/4;
  }
  .bxRP {
    grid-area: 1/1/3/2;
  }
  .grid {
    object-fit: cover;
  }
  .siiMP {
    width: 100%;
    height: 100%;
  }
  .bor-red-20 {
    border-radius: 20px;
  }
  ul {
    list-style-type: none;
    color: grey;
  }
  .lIst_Hover > a {
    color: grey !important;
  }
  .lIst_Hover > a:hover {
    color: red !important;
    cursor: pointer;
  }
  .sideNavBarSe > .lIst_Hover {
    padding: 0.6rem;
  }
  .sideNavBarSe > .lIst_Hover:hover {
    cursor: pointer;
    color: red !important;
  }
  .topEst {
    display: flex;
    justify-content: space-between;
  }
  .lmN {
    margin-bottom: 10px;
  }
  .cmP {
    width: 100px;
  }
  .pad-Left-10 {
    padding-left: 50px;
  }
  .cnMO {
    padding-left: 35px;
    border-left: 1px solid grey;
  }
  p {
    margin-bottom: 10px;
    font-size: x-large;
    font-weight: 600;
  }
  .titleMB {
    margin-bottom: 4px;
    font-family: "DM Sans", sans-serif;
  }

  span {
    font-size: medium;
    color: grey;
  }
  .ndMO {
    color: red;
    font-weight: 600;
    font-size: large;
  }
  .sjMM {
    align-items: center;
  }
  .NNO {
    font-size: initial;
  }
  .gridBtm {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 10px;
  }
  .SquareAmen {
    width: 490px;
    height: 200px;
    border: 1px solid grey;
    margin-top: 10px;
    margin-bottom: 20px;
  }
  .KsmM {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .TopElM {
    margin-top: 8px;
    margin-bottom: 30px;
    box-shadow: 0 0 30px 0 #0000001a;
    padding: 20px 20px 20px 20px;
    border-radius: 20px;
  }
  .mTmB {
    margin-top: 8px;
    margin-bottom: 30px;
  }
  .chmM {
    text-align: end;
    font-size: medium;
    color: rgba(0, 0, 0, 0.75);
  }
  .amen_Tble {
    width: 90%;
    margin-left: 5%;
    margin-top: 3%;
  }
  .vzvX {
    font-size: medium;
    color: rgba(0, 0, 0, 0.75);
  }
  .ksdjb {
    font-size: large;
    text-align: end;
  }
  .vdjN {
    font-size: large;
  }
  .padTop {
    padding-top: 10px;
  }
  .midellCN {
    width: 100%;
  }
  .stickyBar {
    position: sticky;
    top: 20px;
    width: fit-content;
    height: fit-content;
  }
  .ldM {
    flex: 64%;
    margin-right: 16px;
    padding: 20px 20px 20px 20px;
    max-width: 680px;
  }
  .discR {
    margin-right: 10px;
  }
  .divImg {
    width: 120px;
    height: 90px;
  }
  .btnApart {
    padding: 1px 10px;
    border: 1px solid grey;
    margin: 3px;
    color: grey;
  }

  .Posum {
    width: 60%;
  }
  .FkKMMM {
    width: 230px;
  }
  .imGd {
    width: 214px;
    height: 200px;
  }
  .ffmj > h3 {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 9px;
    margin-top: 10px;
  }
  .ffmj {
    padding: 5px;
  }
  .bHN {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 20px;
  }
  .dLM {
    font-size: large;
    margin-bottom: 0px;
  }
  .dfg {
    margin: 0px;
    font-size: 13px;
  }
  .djnNN {
    color: ;
    margin-top: 8px;
  }
  .dhbM {
    font-weight: 600;
  }
  .MMcnCSS:hover {
    cursor: pointer;
  }
  .flrImg {
    width: 640px;
    height: 428px;
  }
  .cnMKidNM {
    display: flex;
    position: relative;
  }
  .drX {
    margin-top: 20px;
  }
  .bSp {
    box-shadow: 0 0 30px 0 #0000001a;
    padding: 20px 20px 20px 20px;
  }
  .bo-shdw {
    box-shadow: 0 0 10px 0 #0000001a;
  }
  .input-group-text {
    height: 38px !important;
  }
  .bord-1-grey {
    border: solid 1px grey;
  }
  .rgBorder {
    border-right: 1px solid grey;
  }
  .tableBord > td {
    border: none solid solid none;
  }
  .tableBord:first-child .tableBick:first-child {
    border-top-left-radius: 10px;
  }
  .boxDiv {
    width: 124px;
  }
  .amenIcon {
    margin-left: auto;
    margin-right: auto;
  }
  .amenText {
    padding: 10px;
  }
  .mnJJ {
    width: 95%;
    height: 95%;
    margin: 8px auto;
  }
  .upload {
    --btn-color: #3b71ca;
    --progress-color: #2d334c;
    --ease-in-out-quartic: cubic-bezier(0.77, 0, 0.175, 1);
    position: relative;
    display: flex;
    background: white;
    border-radius: 10px;
    box-shadow: 0px 0px 11px -4px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transform: rotate(0);
  }
  .ml-2 {
    margin-left: 0.5rem;
  }
  .upload__info {
    display: flex;
    align-items: center;
    padding: 16px;
    margin-right: 40px;
  }
  .upload__filename {
    padding-left: 8px;
  }
  .upload__button {
    position: relative;
    padding: 16px;
    margin: 0;
    font-size: 100%;
    font-family: inherit;
    color: white;
    background: none;
    border: none;
    border-radius: inherit;
    outline: none;
    cursor: pointer;
    transform: scale(0.9);
  }
  .cmNIdpO:hover {
    cursor: pointer;
  }
  .upload__button::before {
    position: absolute;
    content: "";
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #dc4c64;
    border-radius: inherit;
    transform-origin: right;
    box-shadow: 0 4px 9px -4px #dc4c64;
  }
  .upload__hint {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    color: white;
    transform: translateY(100%);
  }
  .upload__progress {
    position: absolute;
    content: "";
    top: 90%;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    color: white;
    background: var(--progress-color);
    transform: scaleX(0);
    transform-origin: left;
  }
  .upload__progress .check {
    stroke-dasharray: 16px;
    stroke-dashoffset: 16px;
    margin-right: 6px;
  }
  .upload.uploading .upload__button {
    animation: expand 0.3s forwards;
  }
  .upload.uploading .upload__button::before {
    animation: fill-left 1.2s 0.4s var(--ease-in-out-quartic) forwards;
  }
  .upload.uploading .upload__info > *,
  .upload.uploading .upload__button__text {
    animation: fade-up-out 0.4s 0.4s forwards;
  }
  .upload.uploading .upload__hint {
    animation: fade-up-in 0.4s 0.8s forwards;
  }
  .upload.uploading .upload__progress {
    animation: fill-right 2s 1s var(--ease-in-out-quartic) forwards;
  }
  .upload.uploaded .upload__progress {
    animation: slide-up 1s var(--ease-in-out-quartic) forwards;
  }
  .upload.uploaded .upload__progress .check {
    animation: stroke-in 0.6s 0.4s var(--ease-in-out-quartic) forwards;
  }
  .upload.uploaded-after .upload__info {
    animation: slide-down-info 1s var(--ease-in-out-quartic) forwards;
  }
  .upload.uploaded-after .upload__button {
    animation: slide-down-button 1s var(--ease-in-out-quartic) forwards;
  }
  .upload.uploaded-after .upload__progress {
    animation: slide-down-progress 1s var(--ease-in-out-quartic) forwards;
  }
  @keyframes expand {
    to {
      transform: scale(1);
    }
  }
  @keyframes fill-left {
    to {
      transform: scale(4, 1.2);
    }
  }
  @keyframes fade-up-out {
    to {
      opacity: 0;
      transform: translateY(-40%);
    }
  }
  @keyframes fade-up-in {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @keyframes fill-right {
    to {
      transform: scaleX(1);
    }
  }
  @keyframes slide-up {
    from {
      transform: scaleX(1) translateY(0);
    }
    to {
      transform: scaleX(1) translateY(-90%);
    }
  }
  @keyframes stroke-in {
    to {
      stroke-dashoffset: 0;
    }
  }
  @keyframes slide-down-info {
    from {
      transform: translateY(-100%);
    }
    to {
      transform: translateY(0);
    }
  }
  @keyframes slide-down-button {
    from {
      transform: scale(0.9) translateY(-100%);
    }
    to {
      transform: scale(0.9) translateY(0);
    }
  }
  @keyframes slide-down-progress {
    from {
      transform: scaleX(1) translateY(-90%);
    }
    to {
      transform: scaleX(1) translateY(10%);
    }
  }

  @media screen and (max-width: 900px) {
    .stickyBar {
      display: none;
    }
    .cnMKidNM {
      display: block;
    }
    .dkmseujM {
      flex-direction: column;
      margin-right: 1vw;
      margin-left: 1vw;
    }
    .sideNavBarSe {
      display: flex;
    }
    .sideNavBarSe > li {
      width: fit-width;
    }
    .ldM {
      margin-right: 10px;
      margin-left: 10px;
    }
    .SideMenu {
      max-width: none;
      overflow: auto;
      display: none;
    }

    .cnMO {
      margin-left: 0px;
      padding-left: 2px;
      border: none !important;
    }
    .cnMO > .titleMB {
      font-size: large;
    }
    .mlsM {
      padding: 3px 10px;
    }
    .ndMO {
      font-size: medium;
    }
    .dfvb {
      flex-direction: column;
      align-items: center;
    }
    .dfvb > img {
      width: auto;
      height: auto;
    }
    .dgdmPmc {
      justify-content: space-around;
    }
    .sideNavBarSe > ul {
      padding-left: 0px !important;
    }
    .SquareAmen {
      overflow: scroll;
    }
  }
  @media screen and (max-width: 380px) and (min-width: 300px) {
    .dgGGH {
      max-width: 120px !important;
      margin: 10px 12px !important;
    }
    .sideNavBarSe > ul {
      padding-left: 0rem !important;
    }
  }
  @media screen and (max-width: 750px) {
    .fdLopKl {
      display: none;
    }
  }
`;
