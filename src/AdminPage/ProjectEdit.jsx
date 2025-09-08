import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { useParams, Link } from "react-router-dom";
import api from "../config/apiClient";
import { MdOutlineDeleteOutline, MdInfo, MdAttachMoney, MdDateRange, MdBarChart, MdDescription, MdStar, MdCheckCircle, MdUpdate } from "react-icons/md";
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
    paymentPlan:"",
    state: "",
    country: "",
    luxury: false,
    spotlight: false,
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
    Amenities:"",    
  });

  const { id } = useParams();
  // Safely derive arrays from values to avoid destructuring errors
  const project_floorplan_Image = Array.isArray(values?.project_floorplan_Image)
    ? values.project_floorplan_Image
    : [];
  const projectGallery = Array.isArray(values?.projectGallery)
    ? values.projectGallery
    : [];
  const floorPlanLength = project_floorplan_Image.length;
  const projectGalleryLength = projectGallery.length;

  console.log(values,"admin")
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(
          `/project/Edit/${id}`
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
  //       `/project/Update/${id}`,
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
      const response = await api.post(
        `/project/Update/${id}`,
        fromData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
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



  const handleDeleteFloorPlanImage = async (index) => {
    const IndexNumber = index;
    try {
      const response = await api.delete(
        `/floorImage/${id}/${IndexNumber}`,
        {}
      );
      if (response.status >= 200 && response.status < 300) {
        window.location.reload();
      } else {
        console.error("Failed to delete floor plan image. Server returned an error.");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          console.log("Unauthorized: You don't have permission to delete this image.");
          alert("You are not authorized to delete this image.");
        } else {
          console.error("An error occurred while deleting floor plan image:", error.response.status);
        }
      } else if (error.request) {
        console.error("No response received from the server.");
      } else {
        console.error("Error in request setup:", error.message);
      }
    }
  };

  const handleDeleteGalleryImage = async (index) => {
    const IndexNumber = index;
    try {
      const response = await api.delete(
        `/galleryImage/${id}/${IndexNumber}`,
        {}
      );
      if (response.status >= 200 && response.status < 300) {
        window.location.reload();
      } else {
        console.error("Failed to delete gallery image. Server returned an error.");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          console.log("Unauthorized: You don't have permission to delete this image.");
          alert("You are not authorized to delete this image.");
        } else {
          console.error("An error occurred while deleting gallery image:", error.response.status);
        }
      } else if (error.request) {
        console.error("No response received from the server.");
      } else {
        console.error("Error in request setup:", error.message);
      }
    }
  };

  const deleteFloorPlanImage = (index) => {
    const confirmDeletion = window.confirm(
      "Are you sure you want to delete this floor plan image?"
    );
    if (confirmDeletion) {
      handleDeleteFloorPlanImage(index);
    }
  };

  const deleteGalleryImage = (index) => {
    const confirmDeletion = window.confirm(
      "Are you sure you want to delete this gallery image?"
    );
    if (confirmDeletion) {
      handleDeleteGalleryImage(index);
    }
  };

  const [loading, setLoading] = useState(false);

  const groupedSections = [
    {
      icon: <MdInfo className="text-2xl text-blue-500 mr-2" />, title: "Basic Info", fields: [
        { label: "Property Name", name: "projectName", icon: <MdInfo className="inline mr-1" /> },
        { label: "Type", name: "type", icon: <MdInfo className="inline mr-1" /> },
        { label: "Project Status", name: "project_Status", icon: <MdInfo className="inline mr-1" /> },
        { label: "Builder Name", name: "builderName", icon: <MdInfo className="inline mr-1" /> },
        { label: "Address", name: "projectAddress", icon: <MdInfo className="inline mr-1" /> },
        { label: "City", name: "city", icon: <MdInfo className="inline mr-1" /> },
        { label: "State", name: "state", icon: <MdInfo className="inline mr-1" /> },
        { label: "Country", name: "country", icon: <MdInfo className="inline mr-1" /> },
      ]
    },
    {
      icon: <MdAttachMoney className="text-2xl text-green-500 mr-2" />, title: "Pricing & Dates", fields: [
        { label: "Minimum Price", name: "minPrice", icon: <MdAttachMoney className="inline mr-1" /> },
        { label: "Maximum Price", name: "maxPrice", icon: <MdAttachMoney className="inline mr-1" /> },
        { label: "Payment Plan", name: "paymentPlan", icon: <MdAttachMoney className="inline mr-1" /> },
        { label: "Launching Date", name: "launchingDate", icon: <MdDateRange className="inline mr-1" /> },
        { label: "Possession Date", name: "possessionDate", icon: <MdDateRange className="inline mr-1" /> },
        { label: "Project Rera No", name: "projectReraNo", icon: <MdCheckCircle className="inline mr-1" /> },
      ]
    },
    {
      icon: <MdBarChart className="text-2xl text-purple-500 mr-2" />, title: "Project Stats", fields: [
        { label: "Total Land Area", name: "totalLandArea", icon: <MdBarChart className="inline mr-1" /> },
        { label: "Total Unit", name: "totalUnit", icon: <MdBarChart className="inline mr-1" /> },
        { label: "Tower Number", name: "towerNumber", icon: <MdBarChart className="inline mr-1" /> },
        { label: "Mobile Number", name: "mobileNumber", icon: <MdBarChart className="inline mr-1" /> },
      ]
    },
    {
      icon: <MdDescription className="text-2xl text-orange-500 mr-2" />, title: "Descriptions", fields: [
        { label: "Project Overview", name: "projectOverview", icon: <MdDescription className="inline mr-1" /> },
        { label: "Project Description", name: "project_discripation", icon: <MdDescription className="inline mr-1" />, textarea: true },
        { label: "About Developer", name: "AboutDeveloper", icon: <MdDescription className="inline mr-1" /> },
        { label: "Meta Title", name: "meta_title", icon: <MdDescription className="inline mr-1" /> },
        { label: "Meta Description", name: "meta_description", icon: <MdDescription className="inline mr-1" /> },
      ]
    },
    {
      icon: <MdStar className="text-2xl text-yellow-500 mr-2" />, title: "Features", fields: [
        { label: "Luxury", name: "luxury", icon: <MdStar className="inline mr-1" />, select: true, options: ["True", "False"] },
        { label: "Spotlight", name: "spotlight", icon: <MdStar className="inline mr-1" />, select: true, options: ["True", "False"] },
        { label: "Amenities", name: "Amenities", icon: <MdStar className="inline mr-1" />, textarea: true },
        { label: "Project Redefine Business", name: "projectRedefine_Business", icon: <MdStar className="inline mr-1" /> },
        { label: "Project Redefine Connectivity", name: "projectRedefine_Connectivity", icon: <MdStar className="inline mr-1" /> },
        { label: "Project Redefine Education", name: "projectRedefine_Education", icon: <MdStar className="inline mr-1" /> },
        { label: "Project Redefine Entertainment", name: "projectRedefine_Entertainment", icon: <MdStar className="inline mr-1" /> },
      ]
    },
  ];

  return (
    <div className="flex bg-gray-50 dark:bg-gray-900 dark:text-white min-h-screen">
      <Sidebar />
      <div className="flex-1 p-4 ml-64 overflow-auto font-sans">
        <div className="w-full space-y-10">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4 text-center tracking-tight">
            Edit Project
          </h1>

          {/* Image Upload Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Front Image */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white text-center mb-2">Front Image</h3>
              <div className="flex items-center justify-center h-48 w-full overflow-hidden rounded-lg bg-gray-50 border border-gray-200 mb-2">
                {values.frontImage && values.frontImage.url ? (
                  <img src={values.frontImage.url} alt="frontImage" className="max-h-full max-w-full object-contain" />
                ) : (
                  <span className="text-gray-500 text-sm italic">No Front Image</span>
                )}
              </div>
              <input type="file" onChange={handleFileChange} className="mt-2 dark:bg-gray-900 dark:text-white" />
            </div>
            {/* Thumbnail Image */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white text-center mb-2">Thumbnail Image</h3>
              <div className="flex items-center justify-center h-48 w-full overflow-hidden rounded-lg bg-gray-50 border border-gray-200 mb-2">
                {values.thumbnailImage && values.thumbnailImage.url ? (
                  <img src={values.thumbnailImage.url} alt="thumbnailImage" className="max-h-full max-w-full object-contain" />
                ) : (
                  <span className="text-gray-500 text-sm italic">No Thumbnail Image</span>
                )}
              </div>
              <input type="file" onChange={handleThumbnailImageChange} className="mt-2 dark:bg-gray-900 dark:text-white" />
            </div>
            {/* Project Location Image */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white text-center mb-2">Project Location Image</h3>
              <div className="flex items-center justify-center h-48 w-full overflow-hidden rounded-lg bg-gray-50 border border-gray-200 mb-2">
                {values.project_locationImage && values.project_locationImage.url ? (
                  <img src={values.project_locationImage.url} alt="location" className="max-h-full max-w-full object-contain" />
                ) : (
                  <span className="text-gray-500 text-sm italic">No Location Image</span>
                )}
              </div>
              <input type="file" name="project_locationImage" onChange={(e) => {
                const file = e.target.files[0];
                setValues({ ...values, project_locationImage: file });
              }} className="mt-2 dark:bg-gray-900 dark:text-white" />
            </div>
            {/* Logo Image */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white text-center mb-2">Project Logo Image</h3>
              <div className="flex items-center justify-center h-48 w-full overflow-hidden rounded-lg bg-gray-50 border border-gray-200 mb-2">
                {values.logo && values.logo.url ? (
                  <img src={values.logo.url} alt="logo" className="max-h-full max-w-full object-contain" />
                ) : (
                  <span className="text-gray-500 text-sm italic">No Logo Image</span>
                )}
              </div>
              <input type="file" name="logo" onChange={(e) => {
                const file = e.target.files[0];
                setValues({ ...values, logo: file });
              }} className="mt-2 dark:bg-gray-900 dark:text-white" />
            </div>
            {/* Highlight Image */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white text-center mb-2">Highlight Image</h3>
              <div className="flex items-center justify-center h-48 w-full overflow-hidden rounded-lg bg-gray-50 border border-gray-200 mb-2">
                {values.highlightImage && values.highlightImage.url ? (
                  <img src={values.highlightImage.url} alt="highlightImage" className="max-h-full max-w-full object-contain" />
                ) : (
                  <span className="text-gray-500 text-sm italic">No Highlight Image</span>
                )}
              </div>
              <input type="file" name="highlightImage" onChange={(e) => {
                const file = e.target.files[0];
                setValues({ ...values, highlightImage: file });
              }} className="mt-2 dark:bg-gray-900 dark:text-white" />
            </div>
            {/* Master Plan Image */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white text-center mb-2">Project Master Plan</h3>
              <div className="flex items-center justify-center h-48 w-full overflow-hidden rounded-lg bg-gray-50 border border-gray-200 mb-2">
                {values.projectMaster_plan && values.projectMaster_plan.url ? (
                  <img src={values.projectMaster_plan.url} alt="masterplan" className="max-h-full max-w-full object-contain" />
                ) : (
                  <span className="text-gray-500 text-sm italic">No Master Plan</span>
                )}
              </div>
              <input type="file" name="projectMaster_plan" onChange={(e) => {
                const file = e.target.files[0];
                setValues({ ...values, projectMaster_plan: file });
              }} className="mt-2 dark:bg-gray-900 dark:text-white" />
            </div>
          </div>

          {/* Floor Plan Images */}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 border-b pb-3 border-gray-200">Project FloorPlan Images</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {project_floorplan_Image && Array.isArray(project_floorplan_Image) && project_floorplan_Image.length > 0 &&
                          project_floorplan_Image.map((image, index) => (
                  <article key={index} className="relative w-full aspect-video overflow-hidden rounded-lg shadow-md group cursor-pointer">
                    <MdOutlineDeleteOutline onClick={() => deleteFloorPlanImage(index)} size={30} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors z-10" />
                    <img src={image.url} alt={`Image ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
                            </article>
                          ))}
              <input type="file" name="project_floorplan_Image" accept="image/*" onChange={(e) => {
                            const files = Array.from(e.target.files);
                const updatedImages = files.map((file) => ({ url: URL.createObjectURL(file), file }));
                setValues({ ...values, project_floorplan_Image: [...(project_floorplan_Image || []), ...updatedImages] });
              }} multiple className="mt-2 col-span-full dark:bg-gray-900 dark:text-white" />
                      </div>
                    </section>

          {/* Project Gallery Images */}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 border-b pb-3 border-gray-200">Project Gallery Images</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {projectGallery && Array.isArray(projectGallery) && projectGallery.length > 0 &&
                          projectGallery.map((image, index) => (
                  <article key={index} className="relative w-full aspect-video overflow-hidden rounded-lg shadow-md group cursor-pointer">
                    <MdOutlineDeleteOutline onClick={() => deleteGalleryImage(index)} size={30} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors z-10" />
                    <img src={image.url} alt={`Image ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
                            </article>
                          ))}
              <input type="file" name="projectGallery" accept="image/*" onChange={(e) => {
                            const files = Array.from(e.target.files);
                const updatedImages = files.map((file) => ({ url: URL.createObjectURL(file), file }));
                setValues({ ...values, projectGallery: [...(projectGallery || []), ...updatedImages] });
              }} multiple className="mt-2 col-span-full dark:bg-gray-900 dark:text-white" />
                      </div>
                    </section>

          {/* Project Details Form */}
          <section className="space-y-8">
            {groupedSections.map((section, idx) => (
              <div key={section.title} className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border-l-4 border-gradient-to-r from-blue-400 to-purple-400 p-8 hover:shadow-3xl transition-shadow duration-300">
                <div className="flex items-center mb-6">
                  {section.icon}
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{section.title}</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {section.fields.map(field => (
                    <div key={field.name}>
                      <label className="block text-red-700 font-semibold mb-2 flex items-center">{field.icon}{field.label}</label>
                      {field.select ? (
                        <select name={field.name} value={values[field.name]} onChange={e => setValues({ ...values, [field.name]: e.target.value })} className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-red-400 focus:outline-none dark:bg-gray-900 dark:text-white">
                          <option value="">Select {field.label}</option>
                          {field.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                      ) : field.textarea ? (
                        <textarea name={field.name} value={values[field.name]} onChange={e => setValues({ ...values, [field.name]: e.target.value })} className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-red-400 focus:outline-none dark:bg-gray-900 dark:text-white" />
                      ) : (
                        <input type="text" name={field.name} value={values[field.name]} onChange={e => setValues({ ...values, [field.name]: e.target.value })} className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-red-400 focus:outline-none dark:bg-gray-900 dark:text-white" />
                      )}
                    </div>
                  ))}
                </div>
                {idx < groupedSections.length - 1 && <hr className="my-8 border-t-2 border-dashed border-gray-200" />}
              </div>
            ))}
            <div className="flex justify-end mt-8">
              <button type="button" onClick={async () => { setLoading(true); await handleUpdateUser(); setLoading(false); }} className="flex items-center gap-2 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-lg px-8 py-3 shadow-lg transition-all disabled:opacity-60" disabled={loading}>
                <MdUpdate className="text-2xl" />
                {loading ? <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span> : "Update"}
            </button>
          </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProjectEdit;
