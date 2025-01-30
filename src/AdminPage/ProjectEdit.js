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
    thumbnailImage: "",
    otherImage: [],
    project_floorplan_Image: [],
    projectGallery: [],
    highlightImage: "",
    project_locationImage: "",
    logo: "",
    projectName: "",
    builderName: "",
    projectAddress: "",
    city: "",
    state: "",
    country: "",
    luxury: false,
    projectOverview: "",
    projectRedefine_Business: "",
    projectRedefine_Connectivity: "",
    projectRedefine_Education: "",
    projectRedefine_Entertainment: "",
    projectReraNo: "",
    AboutDeveloper: "",
    type: "",
    project_url: "",
    meta_title: "",
    meta_description: "",
    project_Status: "",
    launchingDate: "",
    totalLandArea: "",
    totalUnit: "",
    towerNumber: "",
    mobileNumber: "",
    possessionDate: "",
    minPrice: "",
    maxPrice: "",
  });

  const { id } = useParams();
  const { project_floorplan_Image, projectGallery } = values;
  const floorPlanLength = values.project_floorplan_Image.length;
  const projectGalleryLength = values.projectGallery.length;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://api.100acress.com/project/Edit/${id}`
        );
        if (res.status === 200){
          console.log(res.data.dataedit);
          setValues(res.data.dataedit);
        }
        else if(res.status >= 400 && res.status < 500){
          alert("You are not authorized to view this page.")
        }
        else if(res.status >= 500){
          alert("Server error. Please try again later.")
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  function handleFileChange(event) {
    const input = event.target;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setValues((prevValues) => ({
          ...prevValues,
          frontImage: {
            file: input.files[0],
            url: e.target.result,
          },
        }));
      };
      reader.readAsDataURL(input.files[0]);
    }
  }
  function handleThumbnailImageChange(event) {
    const input = event.target;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setValues((prevValues) => ({
          ...prevValues,
          thumbnailImage: {
            file: input.files[0],
            url: e.target.result,
          },
        }));
      };
      reader.readAsDataURL(input.files[0]);
    }
  }





  // const handleUpdateUser = async () => {
  //   try {
  //     const fromData = new FormData();

  //     // Append all key-value pairs from values
  //     for (const key in values) {
  //       if (values[key] !== undefined && values[key] !== null) {
  //         fromData.append(key, values[key]);
  //       }
  //     }

  //     // Append floor plan images if they exist
  //     if (values.project_floorplan_Image && Array.isArray(values.project_floorplan_Image)) {
  //       for (let i = 0; i < floorPlanLength; i++) {
  //         if (values.project_floorplan_Image[i] && values.project_floorplan_Image[i].file) {
  //           fromData.append('project_floorplan_Image', values.project_floorplan_Image[i].file);
  //         }
  //       }
  //     }

  //     // Append project gallery images if they exist
  //     if (values.projectGallery && Array.isArray(values.projectGallery)) {
  //       for (let i = 0; i < projectGalleryLength; i++) {
  //         if (values.projectGallery[i] && values.projectGallery[i].file) {
  //           fromData.append('projectGallery', values.projectGallery[i].file);
  //         }
  //       }
  //     }

  //     // Append front image if it exists
  //     if (values.frontImage && values.frontImage.file) {
  //       fromData.append('frontImage', values.frontImage.file);
  //     }

  //     // Append project master plan image if it exists
  //     if (values.projectMaster_plan && values.projectMaster_plan.file) {
  //       fromData.append('projectMaster_plan', values.projectMaster_plan.file);
  //     }

  //     const response = await axios.post(
  //       `https://api.100acress.com/project/Update/${id}`,
  //       fromData
  //     );

  //     if (response.status === 200) {
  //       alert("Data updated successfully");
  //     } else {
  //       console.error("Failed to update user");
  //     }
  //   } catch (error) {
  //     console.error("Error updating user:", error);
  //   }
  // };




  const handleUpdateUser = async () => {
    try {
      const fromData = new FormData();

      // Append all key-value pairs from values
      for (const key in values) {
        if (values[key] !== undefined && values[key] !== null) {
          fromData.append(key, values[key]);
        }
      }

      // Append floor plan images if they exist
      if (values.project_floorplan_Image && Array.isArray(values.project_floorplan_Image)) {
        values.project_floorplan_Image.forEach((item, index) => {
          if (item && item.file) {
            fromData.append(`project_floorplan_Image`, item.file);
            console.log(`Appending floor plan image: project_floorplan_Image[${index}]`, item.file);
          }
        });
      }

      // Append project gallery images if they exist
      if (values.projectGallery && Array.isArray(values.projectGallery)) {
        values.projectGallery.forEach((item, index) => {
          if (item && item.file) {
            fromData.append(`projectGallery`, item.file);
            console.log(`Appending gallery image: projectGallery[${index}]`, item.file);
          }
        });
      }

      // Append front image if it exists
      if (values.frontImage && values.frontImage.file) {
        fromData.append('frontImage', values.frontImage.file);
        console.log(`Appending front image: frontImage`, values.frontImage.file);
      }

      // Append thumbnail image if it exists
      if (values.thumbnailImage && values.thumbnailImage.file) {
        fromData.append('thumbnailImage', values.thumbnailImage.file);
        console.log(`Appending front image: thumbnailImage`, values.thumbnailImage.file);
      }

      // Append project master plan image if it exists
      if (values.projectMaster_plan && values.projectMaster_plan.file) {
        fromData.append('projectMaster_plan', values.projectMaster_plan.file);
        console.log(`Appending master plan image: projectMaster_plan`, values.projectMaster_plan.file);
      }
      const myToken = localStorage.getItem("myToken");
      const response = await axios.post(
        `https://api.100acress.com/project/Update/${id}`,
        fromData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${myToken}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Data updated successfully");

      } else {
        console.error("Failed to update user");
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status === 401) {
          console.log("Unauthorized: You don't have permission to delete this user.");
          alert("You are not authorized to delete this user.");
        } else {
          console.error("An error occurred while deleting user:", error.response.status);
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received from the server.");
      } else {
        // Something happened in setting up the request that triggered an error
        console.error("Error in request setup:", error.message);
      }
     }
  };



  const handleDeleteUser = async (index) => {
    const IndexNumber = index;
    try {
      const myToken=localStorage.getItem("myToken");
      const response = await axios.delete(
        `https://api.100acress.com/floorImage/${id}/${IndexNumber}`,
        {
          headers:{
            Authorization: `Bearer ${myToken}`,
          }
        }
      );
      if (response.status >= 200 && response.status < 300) {
        window.location.reload();
      } else {
        console.error("Failed to delete user. Server returned an error.");
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status === 401) {
          console.log("Unauthorized: You don't have permission to delete this user.");
          alert("You are not authorized to delete this user.");
        } else {
          console.error("An error occurred while deleting user:", error.response.status);
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received from the server.");
      } else {
        // Something happened in setting up the request that triggered an error
        console.error("Error in request setup:", error.message);
      }
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
                    <input type="file" onChange={(e) => handleFileChange(e)} />
                  </td>
                </tr>
                <tr>
                  <th>Project Thumbnail Image</th>
                </tr>

                <tr>
                  {/* Front Image code here */}
                  <td>
                    <img
                      src={values?.thumbnailImage ? values.thumbnailImage.url : ""}
                      alt="thumbnailImage"
                      style={{ maxWidth: "20%" }}
                      id="previewImage"
                    />
                    <br />
                    <input type="file" onChange={(e) => handleThumbnailImageChange(e)} />
                  </td>
                </tr>

                <tr>
                  <th>Project FloorPlan Image</th>
                </tr>

                <tr>
                  <td>
                    <section className="w-full mx-4 mb-4">
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
                          accept="image/*"
                          onChange={(e) => {
                            const files = Array.from(e.target.files);
                            const updatedImages = files.map((file) => ({
                              url: URL.createObjectURL(file),
                              file,
                            }));
                            setValues({
                              ...values,
                              project_floorplan_Image: [
                                ...(project_floorplan_Image || []),
                                ...updatedImages,
                              ],
                            });
                          }}
                          multiple
                          className="mt-2"
                        />
                      </div>
                    </section>
                  </td>
                </tr>
                <tr>
                  <th>Project Highlight Image</th>
                </tr>

                <tr>
                  <td>
                    <tr>
                      <td>
                        <img
                          src={
                            values.highlightImage
                              ? values.highlightImage.url
                              : ""
                          }
                          alt="highlightImage"
                          style={{ maxWidth: "50%" }}
                          id="previewImage"
                        />
                        <br />
                        <input
                          type="file"
                          name="highlightImage"
                          onChange={(e) => {
                            const file = e.target.files[0];

                            setValues({
                              ...values,
                              highlightImage: file,
                            });
                          }}
                        />
                      </td>
                    </tr>
                  </td>
                </tr>

                <tr>
                  <th>Project Gallery Image</th>
                </tr>

                <tr>
                  <td>
                    <section className="w-full mx-4 mb-4">
                      <div className="flex flex-wrap max-w-screen-md">
                        {projectGallery &&
                          Array.isArray(projectGallery) &&
                          projectGallery.length > 0 &&
                          projectGallery.map((image, index) => (

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
                          name="projectGallery"
                          accept="image/*"
                          onChange={(e) => {
                            const files = Array.from(e.target.files);
                            const updatedImages = files.map((file) => ({
                              url: URL.createObjectURL(file),
                              file,
                            }));
                            setValues({
                              ...values,
                              projectGallery: [
                                ...(projectGallery || []),
                                ...updatedImages,
                              ],
                            });
                          }}
                          multiple
                          className="mt-2"
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
                          style={{ maxWidth: "50%" }}
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
                          style={{ maxWidth: "50%" }}
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
                  <th> Project Master Plan</th>
                </tr>

                <tr>
                  <td>
                    <tr>
                      <td>
                        <img
                          src={values.projectMaster_plan ? values.projectMaster_plan.url : ""}
                          alt="logo"
                          style={{ maxWidth: "50%" }}
                        />
                        <br />
                        <input
                          type="file"
                          name="projectMaster_plan"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            setValues({ ...values, projectMaster_plan: file });
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
                    <span className="text-red-600 font-semibold ">
                      Total LandArea :{" "}
                      <span style={{ color: "black", fontWeight: "normal" }}>
                        <input
                          type="text"
                          className="outline-none"
                          value={values.totalLandArea}
                          name="totalLandArea"
                          onChange={(e) =>
                            setValues({
                              ...values,
                              totalLandArea: e.target.value,
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
                      Total Unit :{" "}
                      <span style={{ color: "black", fontWeight: "normal" }}>
                        <input
                          type="text"
                          className="outline-none"
                          value={values.totalUnit}
                          name="totalUnit"
                          onChange={(e) =>
                            setValues({
                              ...values,
                              totalUnit: e.target.value,
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
                      Tower Number :{" "}
                      <span style={{ color: "black", fontWeight: "normal" }}>
                        <input
                          type="text"
                          className="outline-none"
                          value={values.towerNumber}
                          name="towerNumber"
                          onChange={(e) =>
                            setValues({
                              ...values,
                              towerNumber: e.target.value,
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
                      Mobile Number :{" "}
                      <span style={{ color: "black", fontWeight: "normal" }}>
                        <input
                          type="text"
                          className="outline-none"
                          value={values.mobileNumber}
                          name="mobileNumber"
                          onChange={(e) =>
                            setValues({
                              ...values,
                              mobileNumber: e.target.value,
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
                      Possession Date :{" "}
                      <span style={{ color: "black", fontWeight: "normal" }}>
                        <input
                          type="text"
                          className="outline-none"
                          value={values.possessionDate}
                          name="possessionDate"
                          onChange={(e) =>
                            setValues({
                              ...values,
                              possessionDate: e.target.value,
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
                      Launching Date :{" "}
                      <span style={{ color: "black", fontWeight: "normal" }}>
                        <input
                          type="text"
                          className="outline-none"
                          value={values.launchingDate}
                          name="launchingDate"
                          onChange={(e) =>
                            setValues({
                              ...values,
                              launchingDate: e.target.value,
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
                      Minimum Price :{" "}
                      <span style={{ color: "black", fontWeight: "normal" }}>
                        <input
                          type="text"
                          className="outline-none"
                          value={values.minPrice}
                          name="minPrice"
                          onChange={(e) =>
                            setValues({
                              ...values,
                              minPrice: e.target.value,
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
                      Maximum Price :{" "}
                      <span style={{ color: "black", fontWeight: "normal" }}>
                        <input
                          type="text"
                          className="outline-none"
                          value={values.maxPrice}
                          name="maxPrice"
                          onChange={(e) =>
                            setValues({
                              ...values,
                              maxPrice: e.target.value,
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
                {/* Country Update */}
                <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                      Country :
                      <span style={{ color: "black", fontWeight: "normal" }}>
                        <input
                          type="text"
                          name="country"
                          value={values.country}
                          onChange={(e) =>
                            setValues({
                              ...values,
                              country: e.target.value,
                            })
                          }
                          className="outline-none"
                        />
                      </span>
                    </span>
                  </th>
                </tr>
{/* Luxury Update */}
            <tr>
                  <th>
                    <span className="text-red-600 font-semibold ">
                      Luxury :
                      <span style={{ color: "black", fontWeight: "normal" }}>
                        <select 
                            name="luxury" 
                            id="luxury" 
                            value={values.luxury} 
                            onChange={(e) =>
                              setValues({
                                ...values,
                                luxury: e.target.value,
                              })
                            }
                        >
                          <option value="Select Luxury Type" selected hidden disabled ></option>
                          <option value="True">True</option>
                          <option value="False">False</option>
                        </select>
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

                {/* <tr>
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
                </tr> */}

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
