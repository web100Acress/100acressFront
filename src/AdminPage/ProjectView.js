import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const customStyle = {
  position: "absolute",
  top: "100px",
  marginLeft: "250px",
  right: "auto",
  width: "80%",
};

function handleFileChange(event) {
  const input = event.target;
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const previewImage = document.getElementById("previewImage");
      previewImage.src = e.target.result;
    };
    reader.readAsDataURL(input.files[0]);
  }
}
const ProjectView = () => {
  const [viewDetails, setViewDetails] = useState([]);
  const { pUrl } = useParams();
  const {
    otherImage,
    project_floorplan_Image,
    projectRedefine_Connectivity,
    projectRedefine_Business,
    projectRedefine_Education,
    projectRedefine_Entertainment,
    Amenities,
    projectGallery
  } = viewDetails;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://api.100acress.com/projectView/${pUrl}`
        );
        setViewDetails(res.data.dataview[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  
  return (
    <div style={{overflowX:"hidden"}}>
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
                  <th>Project FloorPlan Image</th>
                </tr>
                <tr>
                  <td>
                    <section className="w-full mx-4">
                      <div className="flex flex-wrap max-w-screen-md ">
                        {project_floorplan_Image &&
                          Array.isArray(project_floorplan_Image) &&
                          project_floorplan_Image.length > 0 &&
                          project_floorplan_Image.map((image, index) => (
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

                <tr>
                  <th>Project Location Image</th>
                </tr>
                <tr>
                  <td>
                    <img
                      src={
                        viewDetails.project_locationImage
                          ? viewDetails.project_locationImage.url
                          : ""
                      }
                      alt=""
                      style={{ maxWidth: "20%" }}
                      id="previewImage"
                    />
                  </td>
                </tr>

                <tr>
                  <th>Project Logo Image</th>
                </tr>
                <tr>
                  <td>
                    <img
                      src={
                        viewDetails.logo
                          ? viewDetails.logo.url
                          : ""
                      }
                      alt=""
                      style={{ maxWidth: "20%" }}
                      id="previewImage"
                    />
                  </td>
                </tr>

                <tr>
                  <th>Project highlight Image</th>
                </tr>
                <tr>
                  <td>
                    <img
                      src={
                        viewDetails.highlightImage
                          ? viewDetails.highlightImage.url
                          : ""
                      }
                      alt=""
                      style={{ maxWidth: "20%" }}
                      id="previewImage"
                    />
                  </td>
                </tr>

                <tr>
                  <th>Project Master Plan</th>
                </tr>
                <tr>
                  <td>
                    <img
                      src={
                        viewDetails.projectMaster_plan
                          ? viewDetails.projectMaster_plan.url
                          : ""
                      }
                      alt="projectMaster_plan"
                      style={{ maxWidth: "20%" }}
                      id="previewImage"
                    />
                  </td>
                </tr>

                <tr>
                  <th>Project projectGallery Image</th>
                </tr>
                <tr>
                  <td>
                    <section className="w-full mx-4">
                      <div className="flex flex-wrap max-w-screen-md ">
                        {projectGallery &&
                          Array.isArray(projectGallery) &&
                          projectGallery.length > 0 &&
                          projectGallery.map((image, index) => (
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

                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                      Property Name :{" "}
                      <span style={{ color: "black", fontWeight: "normal" }}>
                        {viewDetails.projectName}
                      </span>
                    </span>
                  </th>
                </tr>


                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                      Project Description :{" "}
                      <span style={{ color: "black", fontWeight: "normal" }}>
                        {viewDetails.project_discripation}
                      </span>
                    </span>
                  </th>
                </tr>

                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                      Project Status :{" "}
                      <span style={{ color: "black", fontWeight: "normal" }}>
                        {viewDetails.project_Status}
                      </span>
                    </span>
                  </th>
                </tr>
                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                      Builder Name :{" "}
                      <span style={{ color: "black", fontWeight: "normal" }}>
                        {viewDetails.builderName}
                      </span>
                    </span>
                  </th>
                </tr>

                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                      Address :{" "}
                      <span style={{ color: "black", fontWeight: "normal" }}>
                        {viewDetails.projectAddress}
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
                      Project Overview :{" "}
                      <span style={{ color: "black", fontWeight: "normal" }}>
                        {viewDetails.projectOverview}
                      </span>
                    </span>
                  </th>
                </tr>

                <tr>
                  <th>
                    <span className="text-red-600 font-semibold">
                      Project Redefine  Connectivity:
                      <span style={{ color: "black", fontWeight: "normal" }}>
                        {projectRedefine_Connectivity &&
                        Array.isArray(projectRedefine_Connectivity) &&
                        projectRedefine_Connectivity.length > 0
                          ? projectRedefine_Connectivity.map((item, index) => (
                              <span key={index}> {" "}
                               {item}
                              </span>
                            ))
                          : " No connectivity information available."}
                      </span>
                    </span>
                  </th>
                </tr>

                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                      Project Redefine Business :{" "}
                      <span style={{ color: "black", fontWeight: "normal" }}>
                        {projectRedefine_Business && Array.isArray(projectRedefine_Business) && 
                        projectRedefine_Business.length > 0 ? projectRedefine_Business.map((item,index)=>(
                          <span key={index}>{" "}
                          {item}
                          </span>
                        )) :" No Business information available."}
                      </span>
                    </span>
                  </th>
                </tr>

                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                      Project Redefine Education :{" "}
                      <span style={{ color: "black", fontWeight: "normal" }}>
                      {projectRedefine_Education && Array.isArray(projectRedefine_Education) && 
                      projectRedefine_Education.length > 0 ? projectRedefine_Education.map((item,index)=>(
                        <span key={index}>
                        {item}
                        </span>
                      )): "No Project Redefine Education"}

                      </span>
                    </span>
                  </th>
                </tr>
                <tr>

                  <th>
                    <span className="text-red-600 font-semibold ">
                      Project Redefine Entertainment :{" "}
                      <span
                        style={{ color: "black", fontWeight: "normal" }}>
                          {projectRedefine_Entertainment && Array.isArray (projectRedefine_Entertainment) && 
                          projectRedefine_Entertainment.length > 0 ? projectRedefine_Entertainment.map((item,index)=>(
                            <span key={index}>{item}</span>
                          )) :" No  Project Redefine Entertainment"
                          }
                        </span>
                    </span>
                  </th>
                </tr>
                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                      Project Rera No :{" "}
                      <span
                        style={{ color: "black", fontWeight: "normal" }}
                      >{viewDetails.projectReraNo}</span>
                    </span>
                  </th>
                </tr>

                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                      About Developer :{" "}
                      <span
                        style={{ color: "black", fontWeight: "normal" }}
                      > {viewDetails.AboutDeveloper}</span>
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

                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                      Project URL :{" "}
                      <span
                        style={{ color: "black", fontWeight: "normal" }}
                      >{viewDetails.project_url}</span>
                    </span>
                  </th>
                </tr>

                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                      Meta Title :{" "}
                      <span
                        style={{ color: "black", fontWeight: "normal" }}
                      >{viewDetails.meta_title}</span>
                    </span>
                  </th>
                </tr>


                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                      Meta Description :{" "}
                      <span
                        style={{ color: "black", fontWeight: "normal" }}
                      >{viewDetails.meta_description}</span>
                    </span>
                  </th>
                </tr>

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectView;
