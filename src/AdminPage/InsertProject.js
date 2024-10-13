import React, { useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
const customStyle = {
  position: "absolute",
  top: "20px",
  marginLeft: "100px",
  right: "auto",
  width: "80%",
};
const InsertProject = () => {
  const [editFromData, setEditFromData] = useState({
    projectName: "",
    state: "",
    projectAddress: "",
    project_discripation: "",
    AboutDeveloper: "",
    builderName: "",
    projectRedefine_Connectivity: [],
    projectRedefine_Education: [],
    projectRedefine_Business: [],
    projectRedefine_Entertainment: [],
    Amenities: [],
    meta_title: "",
    meta_description: "",
    projectBgContent: "",
    projectReraNo: "",
    type: "",
    city: "",
    projectOverview: "",
    project_url: "",
    project_Status: "",
    totalLandArea: "",
    totalUnit: "",
    towerNumber: "",
    mobileNumber: "",
    possessionDate: "",
    minPrice: "",
    maxPrice: "",
    launchingDate:""
  });

  const resetData = () => {
    setEditFromData({
      projectName: "",
      state: "",
      projectAddress: "",
      project_discripation: "",
      AboutDeveloper: "",
      builderName: "",
      projectRedefine_Connectivity: [],
      projectRedefine_Education: [],
      projectRedefine_Business: [],
      projectRedefine_Entertainment: [],
      Amenities: [],
      meta_title: "",
      meta_description: "",
      projectBgContent: "",
      projectReraNo: "",
      type: "",
      city: "",
      projectOverview: "",
      project_url: "",
      project_Status: "",
      totalLandArea: "",
      totalUnit: "",
      towerNumber: "",
      mobileNumber: "",
      possessionDate: "",
      minPrice: "",
      maxPrice: "",
      launchingDate:"",
    });
  };

  const resetImageData = () => {
    setFileData({
      frontImage: "",
      logo: "",
      project_locationImage: "",
      project_floorplan_Image: "",
    });
  };

  const handleProjectOverviewChange = (event) => {
    setEditFromData({
      ...editFromData,
      projectOverview: event.target.value,
    });
  };

  const handleProjectType = (event) => {
    setEditFromData({ ...editFromData, type: event.target.value });
  };

  const handleProjectStatus = (event) => {
    setEditFromData({ ...editFromData, project_Status: event.target.value });
  };

  const [fileData, setFileData] = useState({
    frontImage: null,
    logo: null,
    project_locationImage: null,
    project_floorplan_Image: [null],
    highlightImage: null,
    project_Brochure: null,
    projectGallery: [null],
    projectMaster_plan: null,
  });

  const handleChangeProjectData = (e) => {
    setEditFromData({
      ...editFromData,
      [e.target.name]: e.target.value,
    });
  };

  const handleInputChange = (event, category) => {
    let newArray = [];

    if (event.target.name === category) {
      newArray = event.target.value;
    }
    setEditFromData((prevState) => ({
      ...prevState,
      [category]: newArray.length > 0 ? newArray : event.target.value,
    }));
  };

  // Amenities
  const handleChangeValueAmenities = (event) => {
    handleInputChange(event, "Amenities");
  };

  // Connectivity
  const handleChangeValueprojectRedefine_Connectivity = (event) => {
    handleInputChange(event, "projectRedefine_Connectivity");
  };

  // Education
  const handleChangeValueprojectRedefine_Education = (event) => {
    handleInputChange(event, "projectRedefine_Education");
  };

  // Business
  const handleChangeValueprojectRedefine_Business = (event) => {
    handleInputChange(event, "projectRedefine_Business");
  };

  // Entertainment
  const handleChangeValueprojectRedefine_Entertainment = (event) => {
    handleInputChange(event, "projectRedefine_Entertainment");
  };

  const handleOtherImageChange = (e) => {
    var files = e.target.files;
    if (files) {
      const updatedOtherImage = [];
      for (let i = 0; i < files.length; i++) {
        updatedOtherImage.push(files[i]);
      }
      setFileData({
        ...fileData,
        project_floorplan_Image: updatedOtherImage,
      });
    } else {
      console.error("No files selected");
    }
  };

  const handleGalleryImageChange = (e) => {
    var files = e.target.files;
    if (files) {
      const updatedOtherImage = [];
      for (let i = 0; i < files.length; i++) {
        updatedOtherImage.push(files[i]);
      }
      setFileData({
        ...fileData,
        projectGallery: updatedOtherImage,
      });
    } else {
      console.error("No files selected");
    }
  };

  const otherImageLength = fileData.project_floorplan_Image
    ? fileData.project_floorplan_Image.length
    : 0;
  const GalleryImageLength = fileData.projectGallery
    ? fileData.projectGallery.length
    : 0;

  const handleSubmitProject = async (e) => {
    e.preventDefault();
    const apiEndpoint = "http://api.100acress.com:3500/projectInsert";

    const formDataAPI = new FormData();

    for (const key in editFromData) {
      formDataAPI.append(key, editFromData[key]);
    }

    for (let i = 0; i < otherImageLength; i++) {
      formDataAPI.append(
        "project_floorplan_Image",
        fileData.project_floorplan_Image[i]
      );
    }

    for (let i = 0; i < GalleryImageLength; i++) {
      formDataAPI.append("projectGallery", fileData.projectGallery[i]);
    }

    formDataAPI.append("logo", fileData.logo);
    formDataAPI.append("project_locationImage", fileData.project_locationImage);
    formDataAPI.append("frontImage", fileData.frontImage);
    formDataAPI.append("project_Brochure", fileData.project_Brochure);
    formDataAPI.append("highlightImage", fileData.highlightImage);
    formDataAPI.append("projectMaster_plan", fileData.projectMaster_plan);

    console.log(formDataAPI, formDataAPI);
    try {
      const response = await axios.post(apiEndpoint, formDataAPI);
      alert("Data Posted");
      resetData();
      resetImageData();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleFileChange = (e, key) => {
    const newFileData = { ...fileData };
    newFileData[key] = e.target.files[0];
    setFileData(newFileData);
  };

  const [content, setContent] = useState("");
  const handleContent = (value) => {
    setContent(value);
  };
  return (
    <div style={{ overflowX: "hidden" }}>
      <Sidebar />
      <div className="" style={customStyle}>
        <div className=" sm:w-[38rem] lg:w-full mx-auto lg:h-auto my-10  rounded-2xl mt-0 mb-0 bg-white shadow-lg sm:max-w-lg">
          <div
            className="bg-red-500 pb-1
         pt-2 text-center text-white"
            style={{ width: "850px" }}
          >
            <p className="font-serif text-2xl font-semibold tracking-wider">
              Add New Project
            </p>
          </div>

          <div
            className="space-y-4 px-8  py-3 pt-3 bg-white shadow-lg"
            style={{ width: "850px" }}
          >
            <div className="flex">
              <select
                className="text-gray-600 border px-2 py-1 outline-none w-full rounded-md ring-black focus:ring-1"
                value={editFromData.projectOverview}
                onChange={handleProjectOverviewChange}
              >
                <option value="">Select Project Overview</option>
                <option value="trending">Trending</option>
                <option value="featured">Featured</option>
                <option value="none">None</option>
              </select>

              <select
                className="text-gray-600 border px-2 mx-3 py-1 outline-none w-full rounded-md ring-black focus:ring-1"
                value={editFromData.type}
                onChange={handleProjectType}
              >
                <option value="" className="text-gray-600">
                  Project Type
                </option>
                <option value="Commercial Property">Commercial Property</option>
                <option value="Residential Flats">Residential Flats</option>
                <option value="SCO Plots">SCO Plots</option>
                <option value="Deen Dayal Plots">Deen Dayal Plots</option>
                <option value="Residential Plots">Residential Plots</option>
                <option value="Independent Floors">Independent Floors</option>
                <option value="Builder Floors">Builder Floors</option>
                <option value="Affordable Homes">Affordable Homes</option>
                <option value="Villas">Villas</option>
                <option value="Farm Houses">Farm House</option>
              </select>

              <select
                className="text-gray-600 border  px-2 mx-2 py-1 outline-none w-full rounded-md ring-black focus:ring-1"
                value={editFromData.project_Status}
                onChange={handleProjectStatus}
              >
                <option value="" className="text-gray-600">
                  Project Status
                </option>
                <option value="underconstruction">Under Construction</option>
                <option value="comingsoon">Coming Soon</option>
                <option value="newlaunch">New Launch</option>
                <option value="readytomove">Ready To Move</option>
              </select>
            </div>

            <div className="flex space-x-4">
              <label className="block" for="project_url">
                <input
                  className=" w-[270px] rounded-md border bg-white px-2 py-1 outline-none ring-black focus:ring-1"
                  type="text"
                  placeholder="Project URL"
                  name="project_url"
                  value={editFromData.project_url}
                  onChange={handleChangeProjectData}
                />
              </label>

              <label className="block" for="state">
                <input
                  className="w-[270px] rounded-md border bg-white px-2 py-1 outline-none ring-black focus:ring-1"
                  type="text"
                  placeholder="State"
                  name="state"
                  value={editFromData.state}
                  onChange={handleChangeProjectData}
                />
              </label>

              <label className="block" for="city">
                <input
                  className="w-[210px] rounded-md border bg-white px-2 py-1 outline-none ring-black focus:ring-1"
                  type="text"
                  placeholder="City"
                  name="city"
                  value={editFromData.city}
                  onChange={handleChangeProjectData}
                />
              </label>
            </div>

            {/* New projet Data add */}

            <div className="flex space-x-4">
              <label className="block" for="project_url">
                <input
                  className=" w-[270px] rounded-md border bg-white px-2 py-1 outline-none ring-black focus:ring-1"
                  type="text"
                  placeholder="Total Land Area"
                  name="totalLandArea"
                  value={editFromData.totalLandArea}
                  onChange={handleChangeProjectData}
                />
              </label>

              <label className="block" for="state">
                <input
                  className="w-[270px] rounded-md border bg-white px-2 py-1 outline-none ring-black focus:ring-1"
                  type="text"
                  placeholder="Total Unit"
                  name="totalUnit"
                  value={editFromData.totalUnit}
                  onChange={handleChangeProjectData}
                />
              </label>

           <div className="flex">
           <label className="block" for="city">
                <input
                  className="w-[100px] rounded-md border bg-white px-2 py-1 outline-none ring-black focus:ring-1"
                  type="text"
                  placeholder="Tower Number"
                  name="towerNumber"
                  value={editFromData.towerNumber}
                  onChange={handleChangeProjectData}
                />
              </label>

              <label className="block" for="city">
                <input
                  className="w-[100px] mx-2 rounded-md border bg-white px-2 py-1 outline-none ring-black focus:ring-1"
                  type="text"
                  placeholder="Launching Date"
                  name="launchingDate"
                  value={editFromData.launchingDate}
                  onChange={handleChangeProjectData}
                />
              </label>
           </div>
            </div>

            <div className="flex space-x-4">
              <label className="block" for="project_url">
                <input
                  className=" w-[270px] rounded-md border bg-white px-2 py-1 outline-none ring-black focus:ring-1"
                  type="number"
                  placeholder="Mobile Number"
                  name="mobileNumber"
                  value={editFromData.mobileNumber}
                  onChange={handleChangeProjectData}
                />
              </label>

              <label className="block" for="state">
                <input
                  className="w-[270px] rounded-md border bg-white px-2 py-1 outline-none ring-black focus:ring-1"
                  type="text"
                  placeholder="Possession Date"
                  name="possessionDate"
                  value={editFromData.possessionDate}
                  onChange={handleChangeProjectData}
                />
              </label>

              <div className="flex">
                <label className="block" for="city">
                  <input
                    className="w-[100px] rounded-md border bg-white px-2 py-1 outline-none ring-black focus:ring-1"
                    type="text"
                    placeholder="₹ Min Price"
                    name="minPrice"
                    value={editFromData.minPrice}
                    onChange={handleChangeProjectData}
                  />
                </label>

                <label className="block" for="city">
                  <input
                    className="w-[100px] rounded-md border mx-2 bg-white px-2 py-1 outline-none ring-black focus:ring-1"
                    type="text"
                    placeholder="₹ Max Price"
                    name="maxPrice"
                    value={editFromData.maxPrice}
                    onChange={handleChangeProjectData}
                  />
                </label>
              </div>
            </div>

            {/* New projet Data End */}

            <label className="block" for="name">
              <input
                className="w-full  rounded-md border bg-white px-2 py-1 outline-none ring-black focus:ring-1"
                type="text"
                placeholder="Project Name"
                name="projectName"
                value={editFromData.projectName}
                onChange={handleChangeProjectData}
              />
            </label>

            <label className="block" for="name">
              <input
                className="w-full  rounded-md border bg-white px-2 py-1 outline-none ring-black focus:ring-1"
                type="text"
                placeholder="Project Address"
                name="projectAddress"
                value={editFromData.projectAddress}
                onChange={handleChangeProjectData}
              />
            </label>

            <label className="block" for="name">
              <textarea
                className="w-full  rounded-md border bg-white px-2 py-1 outline-none ring-black focus:ring-1"
                type="text"
                rows={4}
                placeholder="Project Description"
                name="project_discripation"
                value={editFromData.project_discripation}
                onChange={handleChangeProjectData}
              />
            </label>

            <label className="block" for="name">
              <textarea
                className="w-full  rounded-md border bg-white px-2 py-1 outline-none ring-black focus:ring-1"
                type="text"
                rows={4}
                placeholder="About Developer"
                name="AboutDeveloper"
                value={editFromData.AboutDeveloper}
                onChange={handleChangeProjectData}
              />
            </label>

            <label className="block" for="name">
              <input
                className="w-full  rounded-md border bg-white px-2 py-1 outline-none ring-black focus:ring-1"
                type="text"
                placeholder="Builder Name"
                name="builderName"
                value={editFromData.builderName}
                onChange={handleChangeProjectData}
              />
            </label>

            <label className="block" for="name">
              <input
                className="w-full  rounded-md border bg-white px-2 py-1 outline-none ring-black focus:ring-1"
                type="text"
                placeholder="Connectivity"
                name="projectRedefine_Connectivity"
                value={editFromData.projectRedefine_Connectivity}
                onChange={handleChangeValueprojectRedefine_Connectivity}
              />
            </label>

            <label className="block" for="name">
              <input
                className="w-full  rounded-md border bg-white px-2 py-1 outline-none ring-black focus:ring-1"
                type="text"
                placeholder="Education"
                name="projectRedefine_Education"
                value={editFromData.projectRedefine_Education}
                onChange={handleChangeValueprojectRedefine_Education}
              />
            </label>

            <label className="block" for="name">
              <input
                className="w-full  rounded-md border bg-white px-2 py-1 outline-none ring-black focus:ring-1"
                type="text"
                placeholder="Business"
                name="projectRedefine_Business"
                value={editFromData.projectRedefine_Business}
                onChange={handleChangeValueprojectRedefine_Business}
              />
            </label>

            <label className="block" for="name">
              <input
                className="w-full  rounded-md border bg-white px-2 py-1 outline-none ring-black focus:ring-1"
                type="text"
                placeholder="Entertainment"
                name="projectRedefine_Entertainment"
                value={editFromData.projectRedefine_Entertainment}
                onChange={handleChangeValueprojectRedefine_Entertainment}
              />
            </label>

            <label className="block" for="name">
              <input
                className="w-full  rounded-md border bg-white px-2 py-1 outline-none ring-black focus:ring-1"
                type="text"
                placeholder="Amenities"
                name="Amenities"
                value={editFromData.Amenities}
                onChange={handleChangeValueAmenities}
              />
            </label>

            <label className="block" for="name">
              <input
                className="w-full  rounded-md border bg-white px-2 py-1 outline-none ring-black focus:ring-1"
                type="text"
                placeholder="Banner Content Heading"
                name="projectBgContent"
                value={editFromData.projectBgContent}
                onChange={handleChangeProjectData}
              />
            </label>

            <label className="block" for="name">
              <input
                className="w-full  rounded-md border bg-white px-2 py-1 outline-none ring-black focus:ring-1"
                type="text"
                placeholder="Project ReraNo"
                name="projectReraNo"
                value={editFromData.projectReraNo}
                onChange={handleChangeProjectData}
              />
            </label>

            <p className="mt-2 font-medium mb-1 grid grid-cols-4 text-gray-500">
              Project Logo
            </p>
            <div className="flex mt-3 ring-black">
              <div class="relative h-10 w-40 min-w-[160px] ring-black">
                <input
                  type="file"
                  name="logo"
                  accept="image/*"
                  // value={editFromData.logo}
                  onChange={(e) => handleFileChange(e, "logo")}
                />
              </div>
            </div>

            <p className="mt-2 font-medium mb-1 grid grid-cols-4 text-gray-500">
              Front Image
            </p>

            <div className="flex mt-3 ring-black">
              <div class="relative h-10 w-40 min-w-[160px] ring-black">
                <input
                  type="file"
                  name="frontImage"
                  accept="image/*"
                  // value={editFromData.frontImage}
                  onChange={(e) => handleFileChange(e, "frontImage")}
                />
              </div>
            </div>

            <p className="mt-2 font-medium mb-1 grid grid-cols-1 text-gray-500">
              Project Location Image
            </p>
            <div className="flex mt-3 ring-black">
              <div class="relative h-10 w-40 min-w-[160px] ring-black">
                <input
                  type="file"
                  name="project_locationImage"
                  accept="image/*"
                  // value={editFromData.project_locationImage}
                  onChange={(e) => handleFileChange(e, "project_locationImage")}
                />
              </div>
            </div>

            <p className="mt-2 font-medium mb-1 grid grid-cols-1 text-gray-500">
              Project Master Plan
            </p>
            <div className="flex mt-3 ring-black">
              <div class="relative h-10 w-40 min-w-[160px] ring-black">
                <input
                  type="file"
                  name="projectMaster_plan"
                  accept="image/*"
                  // value={editFromData.project_locationImage}
                  onChange={(e) => handleFileChange(e, "projectMaster_plan")}
                />
              </div>
            </div>

            <p className="mt-2 font-medium mb-1 grid grid-cols-1 text-gray-500">
              Project Brochure
            </p>
            <div className="flex mt-3 ring-black">
              <div class="relative h-10 w-40 min-w-[160px] ring-black">
                <input
                  type="file"
                  name="project_Brochure"
                  accept="image/*"
                  // value={editFromData.project_locationImage}
                  onChange={(e) => handleFileChange(e, "project_Brochure")}
                />
              </div>
            </div>

            <p className="mt-2 font-medium mb-1 grid grid-cols-1 text-gray-500">
              Highlight Image
            </p>
            <div className="flex mt-3 ring-black">
              <div class="relative h-10 w-40 min-w-[160px] ring-black">
                <input
                  type="file"
                  name="highlightImage"
                  accept="image/*"
                  // value={editFromData.project_locationImage}
                  onChange={(e) => handleFileChange(e, "highlightImage")}
                />
              </div>
            </div>

            <p className="mt-2 font-medium mb-1 grid grid-cols-1 text-gray-500">
              Project Floor plan Image
            </p>
            <div className="flex mt-3 ring-black">
              <div class="relative h-10 w-40 min-w-[160px] ring-black">
                <input
                  type="file"
                  name="project_floorplan_Image"
                  accept="image/*"
                  multiple
                  onChange={handleOtherImageChange}
                />
              </div>
            </div>

            <p className="mt-2 font-medium mb-1 grid grid-cols-1 text-gray-500">
              Project Gallery
            </p>
            <div className="flex mt-3 ring-black">
              <div class="relative h-10 w-40 min-w-[160px] ring-black">
                <input
                  type="file"
                  name="projectGallery"
                  accept="image/*"
                  multiple
                  onChange={handleGalleryImageChange}
                />
              </div>
            </div>

            <input
              className="w-full mt-4 rounded-md border bg-white px-2 py-2 outline-none ring-black focus:ring-1"
              type="text"
              placeholder="Meta Title*"
              name="meta_title"
              value={editFromData.meta_title}
              onChange={handleChangeProjectData}
            />

            <input
              className="w-full mt-4 rounded-md border bg-white px-2 py-2 outline-none ring-black focus:ring-1"
              type="text"
              placeholder="Meta Description*"
              name="meta_description"
              value={editFromData.meta_description}
              onChange={(e) => handleChangeProjectData(e)}
            />

            <button
              className="mt-4 rounded-full bg-red-500 px-5
             py-2 font-semibold text-white hover:bg-blue-600"
              onClick={(e) => handleSubmitProject(e)}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsertProject;
