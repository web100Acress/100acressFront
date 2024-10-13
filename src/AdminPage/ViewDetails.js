import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { useParams } from "react-router-dom";
import axios from "axios";

const customStyle = {
  position: "absolute",
  top: "100px",
  marginLeft: "250px",
  right: "auto",
  width: "80%",
};

const ViewDetails = () => {
  const [viewDetails, setViewDetails] = useState([]);
  
  const {
    otherImage,
    Amenities
  } = viewDetails;
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://api.100acress.com:3500/postPerson/propertyoneView/${id}`);
        setViewDetails(res.data.data.postProperty[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(()=>{
  },[viewDetails])

  console.log(viewDetails,"============")
  const { id } = useParams();
  
  return (
    <>
      <Sidebar />
      <div style={customStyle}>
        <div className="mx-auto max-w-4xl px-2 sm:px-6 lg:px-8">
          <div className="card-body">
            <table className="table table-striped table-bordered">
              <tbody>
                <tr>
                  <th>Front Images</th>
                </tr>

                <tr>
                  <td>
                    <img
                      src={
                        viewDetails.frontImage ? viewDetails.frontImage.url : ""
                      }
                      alt=""
                      style={{ maxWidth: "20%" }}
                      id="previewImage"
                    />
                  </td>
                </tr>

                <tr>
                  <th>Other Images</th>
                </tr>

                <tr>
                  <td>
                    <section className="w-full mx-4">
                      <div className="flex flex-wrap max-w-screen-md ">
                        {otherImage &&
                          Array.isArray(otherImage) &&
                          otherImage.length > 0 &&
                          otherImage.map((image, index) => (
                            <article
                              key={index}
                              className="group w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2"
                            >
                              <img
                                src={image.url}
                                alt={`Image ${index + 1}`}
                                className="w-full h-full object-cover rounded-lg"
                              />
                            </article>
                          ))}
                      </div>
                    </section>
                  </td>
                </tr>

            
                {/* <div className="flex flex-wrap max-w-screen-md ">
                        {otherImage &&
                          Array.isArray(otherImage) &&
                          otherImage.length > 0 &&
                          otherImage.map((image, index) => (
                            <article
                              key={index}
                              className="group w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2"
                            >
                              <img
                                src={image.url}
                                alt={`Image ${index + 1}`}
                                className="w-full h-full object-cover rounded-lg"
                              />
                            </article>
                          ))}
                      </div> */}


                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                      Property Name :{" "}
                      <span style={{ color: "black", fontWeight: "normal" }}>
                        {viewDetails.propertyName}
                      </span>
                    </span>
                  </th>
                </tr>

                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                      Property Type :{" "}
                      <span style={{ color: "black", fontWeight: "normal" }}>
                        {viewDetails.propertyType}
                      </span>
                    </span>
                  </th>
                </tr>
             

                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                      Address :{" "}
                      <span style={{ color: "black", fontWeight: "normal" }}>
                        {viewDetails.address}
                      </span>
                    </span>
                  </th>
                </tr>

                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                      City:{" "}
                      <span style={{ color: "black", fontWeight: "normal" }}>
                        {viewDetails.city}
                      </span>
                    </span>
                  </th>
                </tr>

                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                      Price:{" "}
                      <span style={{ color: "black", fontWeight: "normal" }}>
                        {viewDetails.price}
                      </span>
                    </span>
                  </th>
                </tr>

                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                      Area:{" "}
                      <span style={{ color: "black", fontWeight: "normal" }}>
                        {viewDetails.area}
                      </span>
                    </span>
                  </th>
                </tr>

                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                      State :{" "}
                      <span style={{ color: "black", fontWeight: "normal" }}>
                        {viewDetails.state}
                      </span>
                    </span>
                  </th>
                </tr>

                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                      Project Description :{" "}
                      <span style={{ color: "black", fontWeight: "normal" }}>
                        {viewDetails.description}
                      </span>
                    </span>
                  </th>
                </tr>

                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                      LandMark :{" "}
                      <span
                        style={{ color: "black", fontWeight: "normal" }}
                      > {viewDetails.landMark}</span>
                    </span>
                  </th>
                </tr>

                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                      Built Year :{" "}
                      <span
                        style={{ color: "black", fontWeight: "normal" }}
                      > {viewDetails.builtYear}</span>
                    </span>
                  </th>
                </tr>

                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                    Furnishing :{" "}
                      <span
                        style={{ color: "black", fontWeight: "normal" }}
                      > {viewDetails.furnishing}</span>
                    </span>
                  </th>
                </tr>

                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                    AvailableDate :{" "}
                      <span
                        style={{ color: "black", fontWeight: "normal" }}
                      > {viewDetails.availableDate}</span>
                    </span>
                  </th>
                </tr>

                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                    Select Property Type :{" "}
                      <span
                        style={{ color: "black", fontWeight: "normal" }}
                      > {viewDetails.propertyLooking}</span>
                    </span>
                  </th>
                </tr>

                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                      Amenities :{" "}
                      <span style={{ color: "black", fontWeight: "normal" }}>
                        {Amenities && Array.isArray(Amenities) && Amenities.length > 0 ? Amenities.map((item,index)=>(
                             <span key={index}>
                              {item}
                             </span>
                        )):"No Amenities"}
                      </span>
                    </span>
                  </th>
                </tr>

                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                      Type :{" "}
                      <span
                        style={{ color: "black", fontWeight: "normal" }}
                      >{viewDetails.type}</span>
                    </span>
                  </th>
                </tr>

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewDetails;
