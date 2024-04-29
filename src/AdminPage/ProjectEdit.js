import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { MdOutlineDeleteOutline } from "react-icons/md";
const customStyle = {
  position: "absolute",
  top: "100px",
  marginLeft: "250px",
  right: "auto",
  width: "80%",
};

const ProjectEdit = () => {
  const [values, setValues] = useState({
    frontImage: "",
    otherImage: [],
    project_floorplan_Image: [],
    project_locationImage: "",
    logo: "",
    projectName: "",
    builderName: "",
    projectAddress: "",
    city: "",
    state: "",
    projectOverview: "",
    projectRedefine_Business: "",
    projectRedefine_Connectivity: "",
    projectRedefine_Education: "",
    projectRedefine_Entertainment: "",
    projectReraNo: "",
    AboutDeveloper: "",
    Amenities: [],
    type: "",
    project_url: "",
    meta_title: "",
    meta_description: "",
    project_Status: "",
  });

  const { id } = useParams();
  const { project_floorplan_Image } = values;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://api.100acress.com/project/Edit/${id}`
        );
        setValues(res.data.dataedit);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleUpdateUser = async () => {
    try {
      const response = await axios.post(
        `https://api.100acress.com/project/Update/${id}`,
        values
      );
      if (response.status === 200) {
        alert("Data updated successfully");
      } else {
        console.error("Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };


  const handleDeleteUser = async (index) => {
    const IndexNumber = index;
    try {
      const response = await axios.delete(
        `https://api.100acress.com/floorImage/${id}/${IndexNumber}`
      );
      if (response.status >= 200 && response.status < 300) {
        window.location.reload();
      } else {
        console.error("Failed to delete user. Server returned an error.");
      }
    } catch (error) {
      console.error("An error occurred while deleting user:", error.message);
    }
  };

  const deleteFloorPlanImage = (id) => {
    const confirmDeletion = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDeletion) {
      handleDeleteUser(id);
      // window.location.reload();
    }
  };

  return (
    <>
      <Sidebar />
      <div style={customStyle}>
        <div className="mx-auto max-w-4xl px-2 sm:px-6 lg:px-8">
          <div className="card-body">
            <table className="table table-striped table-bordered">
              <tbody>
                <tr>
                  <th>Project Front Image</th>
                </tr>

                <tr>
                  {/* Front Image code here */}
                  <td>
                    <img
                      src={values.frontImage ? values.frontImage.url : ""}
                      alt="frontImage"
                      style={{ maxWidth: "20%" }}
                      id="previewImage"
                    />
                    <br />
                    <input
                      type="file"
                      name="frontImage"
                      onChange={(e) => {
                        const file = e.target.files[0];

                        setValues((prevValues) => ({
                          ...prevValues,
                          frontImage: {
                            public_id: "your_public_id", // update with the correct value if needed
                            url: URL.createObjectURL(file),
                          },
                        }));
                      }}
                    />
                  </td>
                </tr>

                <tr>
                  <th>Project FloorPlan Image</th>
                </tr>

                <tr>
                  <td>
                    <section className="w-full mx-4 mb-4">
                      {/* <div className="flex flex-wrap max-w-screen-md ">
                        {project_floorplan_Image &&
                          Array.isArray(project_floorplan_Image) &&
                          project_floorplan_Image.length > 0 &&
                          project_floorplan_Image.map((image, index) => (
                            
                            <article
                              key={index}
                              className="group w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2"
                            >
                               <MdOutlineDeleteOutline onClick={()=>deleteFloorPlanImage(index)} size={30} className=" group-hover:text-red-500" />
                              <img
                                src={image.url}
                                alt={`Image ${index + 1}`}
                                className="w-full h-full object-cover rounded-lg"
                              />
                            
                            </article>
                            
                          ))}
                        <br />
                        <input
                          type="file"
                          name="project_floorplan_Image"
                          onChange={(e) => {
                            const file = e.target.files[0];

                            setValues({
                              ...values,
                              project_floorplan_Image: file,
                            });
                          }}
                        />
                      </div> */}
                      <div className="flex flex-wrap max-w-screen-md">
                        {project_floorplan_Image &&
                          Array.isArray(project_floorplan_Image) &&
                          project_floorplan_Image.length > 0 &&
                          project_floorplan_Image.map((image, index) => (
                        
                            <article
                              key={index}
                              className="group w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2"
                            >
                              
                              <MdOutlineDeleteOutline
                                onClick={() => deleteFloorPlanImage(index)}
                                size={30}
                                className="group-hover:text-red-500"
                              />
                            
                              <img
                                src={image.url}
                                alt={`Image ${index + 1}`}
                                className="w-full h-full object-cover rounded-lg"
                              />
                            </article>
                          ))}
                        <br />
                        <input
                          type="file"
                          name="project_floorplan_Image"
                          onChange={(e) => {
                            const file = e.target.files[0];

                            setValues({
                              ...values,
                              project_floorplan_Image: file,
                            });
                          }}
                        />
                      </div>
                    </section>
                  </td>
                </tr>

                <tr>
                  <th>Project Location Image</th>
                </tr>

                <tr>
                  <td>
                    <tr>
                      <td>
                        <img
                          src={
                            values.project_locationImage
                              ? values.project_locationImage.url
                              : ""
                          }
                          alt="location"
                          style={{ maxWidth: "20%" }}
                          id="previewImage"
                        />
                        <br />
                        <input
                          type="file"
                          name="project_locationImage"
                          onChange={(e) => {
                            const file = e.target.files[0];

                            setValues({
                              ...values,
                              project_locationImage: file,
                            });
                          }}
                        />
                      </td>
                    </tr>
                  </td>
                </tr>

                <tr>
                  <th> Project Logo Image</th>
                </tr>

                <tr>
                  <td>
                    <tr>
                      <td>
                        <img
                          src={values.logo ? values.logo.url : ""}
                          alt="logo"
                          style={{ maxWidth: "20%" }}
                        />
                        <br />
                        <input
                          type="file"
                          name="logo"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            // console.log("Selected file:", file.name);
                            setValues({ ...values, logo: file });
                          }}
                        />
                      </td>
                    </tr>
                  </td>
                </tr>

                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                      Property Name :{" "}
                      <span style={{ color: "black", fontWeight: "normal" }}>
                        <input
                          type="text"
                          className="outline-none"
                          value={values.projectName}
                          name="projectName"
                          onChange={(e) =>
                            setValues({
                              ...values,
                              projectName: e.target.value,
                            })
                          }
                        />
                      </span>
                    </span>
                  </th>
                </tr>

                <tr>
                  <th>
                    <span className="text-red-600 font-semibold">
                      Project Description :
                      <span style={{ color: "black", fontWeight: "normal" }}>
                        <textarea
                          type="text"
                          className="outline-none w-full"
                          value={values.project_discripation}
                          name="project_discripation"
                          onChange={(e) =>
                            setValues({
                              ...values,
                              project_discripation: e.target.value,
                            })
                          }
                        />
                      </span>
                    </span>
                  </th>
                </tr>

                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                      Project Status :{" "}
                      <span style={{ color: "black", fontWeight: "normal" }}>
                        <input
                          type="text"
                          className="outline-none"
                          name="project_Status"
                          value={values.project_Status}
                          onChange={(e) =>
                            setValues({
                              ...values,
                              project_Status: e.target.value,
                            })
                          }
                        />
                      </span>
                    </span>
                  </th>
                </tr>

                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                      Builder Name :{" "}
                      <span style={{ color: "black", fontWeight: "normal" }}>
                        <input
                          type="text"
                          className="outline-none"
                          name="builderName"
                          value={values.builderName}
                          onChange={(e) =>
                            setValues({
                              ...values,
                              builderName: e.target.value,
                            })
                          }
                        />
                      </span>
                    </span>
                  </th>
                </tr>

                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                      Address :{" "}
                      <span style={{ color: "black", fontWeight: "normal" }}>
                        <input
                          type="text"
                          name="projectAddress"
                          className="outline-none"
                          value={values.projectAddress}
                          onChange={(e) =>
                            setValues({
                              ...values,
                              projectAddress: e.target.value,
                            })
                          }
                        />
                      </span>
                    </span>
                  </th>
                </tr>

                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                      City:{" "}
                      <span style={{ color: "black", fontWeight: "normal" }}>
                        <input
                          type="text"
                          name="city"
                          className="outline-none"
                          value={values.city}
                          onChange={(e) =>
                            setValues({ ...values, city: e.target.value })
                          }
                        />
                      </span>
                    </span>
                  </th>
                </tr>

                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                      State :{" "}
                      <span style={{ color: "black", fontWeight: "normal" }}>
                        <input
                          type="text"
                          className="outline-none"
                          name="state"
                          value={values.state}
                          onChange={(e) =>
                            setValues({ ...values, state: e.target.value })
                          }
                        />
                      </span>
                    </span>
                  </th>
                </tr>

                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                      Project Overview :{" "}
                      <span style={{ color: "black", fontWeight: "normal" }}>
                        <input
                          type="text"
                          className="outline-none"
                          name="projectOverview"
                          value={values.projectOverview}
                          onChange={(e) =>
                            setValues({
                              ...values,
                              projectOverview: e.target.value,
                            })
                          }
                        />
                      </span>
                    </span>
                  </th>
                </tr>

                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                      Project Redefine Business :{" "}
                      <span style={{ color: "black", fontWeight: "normal" }}>
                        <input
                          type="text"
                          className="outline-none"
                          value={values.projectRedefine_Business}
                          name="projectRedefine_Business"
                          onChange={(e) =>
                            setValues({
                              ...values,
                              projectRedefine_Business: e.target.value,
                            })
                          }
                        />
                      </span>
                    </span>
                  </th>
                </tr>

                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                      Project Redefine Connectivity :{" "}
                      <span style={{ color: "black", fontWeight: "normal" }}>
                        <input
                          type="text"
                          name="projectRedefine_Connectivity"
                          value={values.projectRedefine_Connectivity}
                          className="outline-none"
                          onChange={(e) =>
                            setValues({
                              ...values,
                              projectRedefine_Connectivity: e.target.value,
                            })
                          }
                        />
                      </span>
                    </span>
                  </th>
                </tr>

                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                      Project Redefine Education :{" "}
                      <span style={{ color: "black", fontWeight: "normal" }}>
                        <input
                          type="text"
                          name="projectRedefine_Education"
                          value={values.projectRedefine_Education}
                          onChange={(e) =>
                            setValues({
                              ...values,
                              projectRedefine_Education: e.target.value,
                            })
                          }
                          className="outline-none"
                        />
                      </span>
                    </span>
                  </th>
                </tr>

                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                      Project Redefine Entertainment :{" "}
                      <span style={{ color: "black", fontWeight: "normal" }}>
                        <input
                          type="text"
                          className="outline-none"
                          name="projectRedefine_Entertainment"
                          value={values.projectRedefine_Entertainment}
                          onChange={(e) =>
                            setValues({
                              ...values,
                              projectRedefine_Entertainment: e.target.value,
                            })
                          }
                        />
                      </span>
                    </span>
                  </th>
                </tr>

                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                      Project Rera No :{" "}
                      <span style={{ color: "black", fontWeight: "normal" }}>
                        <input
                          type="text"
                          name="projectReraNo"
                          value={values.projectReraNo}
                          onChange={(e) =>
                            setValues({
                              ...values,
                              projectReraNo: e.target.value,
                            })
                          }
                          className="outline-none"
                        />
                      </span>
                    </span>
                  </th>
                </tr>

                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                      About Developer :{" "}
                      <span style={{ color: "black", fontWeight: "normal" }}>
                        <input
                          type="text"
                          name="AboutDeveloper"
                          value={values.AboutDeveloper}
                          onChange={(e) =>
                            setValues({
                              ...values,
                              AboutDeveloper: e.target.value,
                            })
                          }
                          className="outline-none"
                        />
                      </span>
                    </span>
                  </th>
                </tr>

                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                      Amenities :{" "}
                      <span style={{ color: "black", fontWeight: "normal" }}>
                        <input
                          type="text"
                          className="outline-none"
                          name="Amenities"
                          value={values.Amenities}
                          onChange={(e) =>
                            setValues({ ...values, Amenities: e.target.value })
                          }
                        />
                      </span>
                    </span>
                  </th>
                </tr>

                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                      Type :{" "}
                      <span style={{ color: "black", fontWeight: "normal" }}>
                        <input
                          type="text"
                          className="outline-none"
                          name="type"
                          value={values.type}
                          onChange={(e) =>
                            setValues({ ...values, type: e.target.value })
                          }
                        />
                      </span>
                    </span>
                  </th>
                </tr>

                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                      Project URL :{" "}
                      <span style={{ color: "black", fontWeight: "normal" }}>
                        <input
                          type="text"
                          className="outline-none"
                          name="project_url"
                          value={values.project_url}
                          onChange={(e) =>
                            setValues({
                              ...values,
                              project_url: e.target.value,
                            })
                          }
                        />
                      </span>
                    </span>
                  </th>
                </tr>

                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                      Meta Title :{" "}
                      <span style={{ color: "black", fontWeight: "normal" }}>
                        <input
                          type="text"
                          className="outline-none"
                          name="meta_title"
                          value={values.meta_title}
                          onChange={(e) =>
                            setValues({
                              ...values,
                              meta_title: e.target.value,
                            })
                          }
                        />
                      </span>
                    </span>
                  </th>
                </tr>

                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                      Meta Description :{" "}
                      <span style={{ color: "black", fontWeight: "normal" }}>
                        <input
                          type="text"
                          className="outline-none"
                          name="meta_description"
                          value={values.meta_description}
                          onChange={(e) =>
                            setValues({
                              ...values,
                              meta_description: e.target.value,
                            })
                          }
                        />
                      </span>
                    </span>
                  </th>
                </tr>
              </tbody>
            </table>

            <button
              type="button"
              onClick={handleUpdateUser}
              class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectEdit;
