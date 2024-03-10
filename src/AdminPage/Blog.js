import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

const customStyle = {
  position: "absolute",
  top: "100px",
  marginLeft: "250px",
  right: "auto",
  width: "80%"

};
// const customStyles = {
//   content: {
//     top: '50%',
//     left: '50%',
//     right: 'auto',
//     bottom: 'auto',
//     padding: '10px',
//     marginTop: '0px',
//     width: '500px',
//     height: '100%',
//     marginRight: '-50%',
//     transform: 'translate(-50%, -50%)',
//     paddingTop: '0px',
//   },
// };

//  page modal component releated property

const Blog = () => {
  const [editFromData, setEditFromData] = useState({
    ProjectName: "",
    ProjectLocation: "",
    Configuration: "",
    Price: "",
    URL: "",
    Status: "",
    Featured: "",
    ReraNo: "",
    MinCoveredArea: "",
    MaxCoveredArea: "",
    BuilderSelect: "",
    Location: "",
    AboutDeveloper: "",
    MetaTitle: "",
    MetaDescription: "",
  });
  const [openForm, setOpenForm] = useState(false);
  const [formDataInquiry, setFormDataInquiry] = useState({
    title: '',
    description: '',
    category: '',
    author: '',
    image: '',
  });
  // // blog component releated property

  const [viewAll, setViewAll] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("");
        setViewAll(res.data.data);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);


  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = viewAll.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  const handleEditChangeFrom = (e) => {
    const { name, value } = e.target;
    setEditFromData({ ...editFromData, [name]: value });
  };

  const submitEditFromData = (e) => {
    e.preventDefault();
    const requiredFields = [
      "ProjectName",
      "ProjectLocation",
      "Configuration",
      "Price",
      "URL",
      "Status",
      "Featured",
      "BuilderSelect",
      "Location",
      "AboutDeveloper",
      "MetaTitle",
    ];

    for (const field of requiredFields) {
      if (!editFromData[field]) {
        alert(`Please fill in the ${field} field.`);
        return;
      }
    }
    console.log("Form submitted:", editFromData);
    setEditFromData(initialFromData)
  };

  const initialFromData = {
    ProjectName: "",
    ProjectLocation: "",
    Configuration: "",
    Price: "",
    URL: "",
    Status: "",
    Featured: "",
    ReraNo: "",
    MinCoveredArea: "",
    MaxCoveredArea: "",
    BuilderSelect: "",
    Location: "",
    AboutDeveloper: "",
    MetaTitle: "",
    MetaDescription: "",
  };

  const formOpen = () => {
    setOpenForm(true);
  };

  const closeForm = () => {
    setOpenForm(false);
  };

  const handleInquiryDataChange = (e) => {
    const { name, value } = e.target;
    setFormDataInquiry((prevData) => ({
      ...prevData,
      [name.toLowerCase()]: value,
    }));
  };

  const handleFileChange = (e, key) => {
    const newFileData = { ...fileData };
    newFileData[key] = e.target.files[0];
    setFileData(newFileData);
  };

  const [fileData, setFileData] = useState({
    frontImage: null,
  });

  const handleProjectType = (event) => {
    setEditFromData({ ...editFromData, type: event.target.value });
  };

  return (
    <>
      <Sidebar />
      <div className="" style={customStyle}>
        <div className="flex justify-end mb-2 mt-2 mr-20">
          <button
            onClick={formOpen}
            className="bg-blue-700 p-2 sm:rounded-lg text-white"
          >
            Add Blog
          </button>
        </div>
        <div className="flex justify-center items-center mt-0">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-5/6 mt-0">
            <table className="w-full text-sm text-left rtl:text-right text-black-100 dark:text-black-100 ">
              <thead className="text-xs text-black uppercase dark:text-black border-b-2  border-red-400">
                <tr className="">
                  <th scope="col" className="px-6 py-3">
                    S No.
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Id
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentRows.map((item, index) => {
                  const serialNumber = indexOfFirstRow + index + 1;
                  return (
                    <tr key={index} className="bg-white-500 border-b border-red-400">
                      <td className="px-2 py-1">{serialNumber}</td>
                      <td className="px-2 py-1">{item.projectName}</td>
                      <td className="px-2 py-1">{item.price}</td>
                      <td className="px-2 py-1 flex space-x-1">
                        <button
                          type="button"
                          className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-2 py-0 text-center"
                        >
                          View
                        </button>
                        <button
                          type="button"

                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-2 py-1.5 text-center"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="focus:outline-none text-white bg-yellow-500 hover:bg-yellow-700 focus:ring-4 focus:ring-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800 font-medium rounded-lg text-sm px-2 py-1.5 text-center"
                        >
                          Add BHK
                        </button>
                        <button
                          type="button"
                          className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800 font-medium rounded-lg text-sm px-2 py-1.5 text-center"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="flex justify-center mt-2 mb-2">
              {Array.from({ length: Math.ceil(viewAll.length / rowsPerPage) }, (_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`mx-2 px-3 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 ${currentPage === index + 1 ? "bg-red-600 text-white" : "bg-gray-300 text-gray-700"
                    }`}
                >
                  {index + 1}
                </button>))}
            </div>

            {openForm && (

              <div className="modal-overlay bg-red-600 ">
                <div className="container w-full h-70  rounded-xl modal-content pt-4">
                  <button className="text-white text-2xl absolute top-2 right-4 " onClick={closeForm}>
                    ✖
                  </button>
                  <div>
                    <textarea
                      name="Title"
                      placeholder="Blog Title"
                      rows="1"
                      value={formDataInquiry.title}
                      onChange={handleInquiryDataChange}
                      className="w-full p-2 outline-none border-b-2 placeholder-black mt-4 rounded-md bg-white text-black  border-white  mobile-input"
                    ></textarea>
                    <textarea
                      name="Description"
                      placeholder="Blog Description"
                      rows="1"
                      value={formDataInquiry.description}
                      onChange={handleInquiryDataChange}
                      className="w-full p-2 outline-none border-b-2 placeholder-black mt-4 rounded-md border-white bg-white text-black mobile-input"
                    ></textarea>


                    <select
                      className="text-black border p-2 outline-none w-full  ring-black focus:ring-1 mt-4 rounded-md"
                      onChange={handleProjectType}
                    >
                      <option value="" className="text-gray-600">Blog Category</option>
                      <option value="Commercial Property">Commercial Property</option>
                      <option value="Residential Flats">Residential Flats</option>
                      <option value="SCO Plots">SCO Plots</option>
                      <option value="Deendayal Plots">Deen Dayal Plots</option>
                      <option value="Residential Plots">Residential Plots</option>
                      <option value="Independent Floors">Independent Floors</option>
                      <option value="Builder Floors">Builder Floors</option>
                      <option value="Affordable Homes">Affordable Homes</option>
                    </select>

                    <select
                      className="text-black border p-2 outline-none w-full  ring-black focus:ring-1 mt-4 rounded-md"
                      value={formDataInquiry.author}
                      onChange={handleInquiryDataChange}
                    >
                      <option value="" className="text-gray-600">Admin</option>


                    </select>

                     <div className="flex mt-3 ring-black">
                      <div className="relative h-10  px-2 min-w-[160px] bg-white w-full ring-black rounded-md">
                        <p className="mt-2 font-medium  text-black">
                          Front Image<input
                          type="file"
                          name="frontImage"
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, "frontImage")}    
                          className="mx-2"         
                        />
                        </p>
                        
                      </div>
                    </div> 


                    <div className="text-center  my-4 ">
                      <button className="bg-white text-red-600 text-lg text-bold rounded-md px-4 py-2 mx-2 my-2" >Submit</button></div>
                  </div>
                </div>
              </div>

            )}

          </div>

        </div>
      </div>
    </>
  );
};

export default Blog;