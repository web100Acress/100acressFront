import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import Sidebar from "./Sidebar";
import {Link} from "react-router-dom"

const customStyle = {
  position:"absolute",
  top:"100px",
  marginLeft: "250px",
  right:"auto",
  width:"80%"
   
 };
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    padding: '10px',
    marginTop: '0px',
    width: '500px',
    height: '100%',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    paddingTop: '0px',
  },
};

//  page modal component releated property

const AdminContact = () => {
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
  // // blog component releated property

    const [viewAll, setViewAll] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(10);
    const [modalIsOpen, setIsOpen] = React.useState(false);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await axios.get("/api/preLaunch/viewAll");
          setViewAll(res.data.data);
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
    // blog component releated property end
    //  page modal component releated property


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
    function openModal() {
      setIsOpen(true);
    }

    function closeModal() {
      setIsOpen(false);
    }
    // blog page modal  component releated property end
    return (
      <>
      <Sidebar />
       <div className="" style={customStyle}>
        <div className="flex justify-end mb-2 mt-2 mr-20">
          <button
            onClick={openModal}
            className="bg-blue-700 p-2 sm:rounded-lg text-white"
          >
            Add New
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
                        <Link to="/Admin/ContactUs/UserProfile">
                        <button
                          type="button"
                          className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-2 py-2 text-center"
                        >
                          User Profile
                        </button></Link>
                       
                       <Link> <button
                          type="button"
                          className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800 font-medium rounded-lg text-sm px-2 py-1.5 text-center"
                        >
                          Delete Account
                        </button>
                       </Link>
                       
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
                </button>  ))}
            </div>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Example Modal">
              <div className="">
                <div className=" sm:w-[38rem] lg:w-full mx-auto lg:h-auto my-10 overflow-hidden rounded-2xl mt-0 mb-0 bg-white shadow-lg sm:max-w-lg">
                  <div className="bg-red-500 pb-1 pt-2 text-center text-white">
                    <p className="font-serif text-2xl font-semibold tracking-wider">
                      Add New Project
                    </p>
                  </div>

                  <div className="space-y-4 px-8 py-3 pt-3 ">
                    <label className="block" for="name">
                      <input
                        className="w-full  rounded-md border bg-white px-2 py-1 outline-none ring-black focus:ring-1"
                        type="text"
                        placeholder="Project Name"
                        name="ProjectName"
                        value={editFromData.ProjectName}
                        onChange={handleEditChangeFrom}
                        required
                      />
                    </label>
                    <label className="block" for="name">
                      <input
                        className="w-full rounded-md border bg-white px-2 py-1 outline-none ring-black focus:ring-1"
                        type="email"
                        placeholder="Project Location"
                        name="ProjectLocation"
                        value={editFromData.ProjectLocation}
                        onChange={handleEditChangeFrom}
                        required
                      />
                      <input
                        className="w-full mt-3 rounded-md border bg-white px-2 py-1 outline-none ring-black focus:ring-1"
                        type="email"
                        placeholder="Configuration (ex. 2bhk - 3bhk)"
                        name="Configuration"
                        value={editFromData.Configuration}
                        onChange={handleEditChangeFrom}
                        required
                      />

                      <input
                        className="w-full mt-3 rounded-md border bg-white px-2 py-1 outline-none ring-black focus:ring-1"
                        type="email"
                        placeholder="Price (CR)"
                        name="Price"
                        value={editFromData.Price}
                        onChange={handleEditChangeFrom}
                        required
                      />

                      <input
                        className="w-full mt-3 rounded-md border bg-white px-2 py-1 outline-none ring-black focus:ring-1"
                        type="email"
                        placeholder="Url link (for address bar) (Eg: xyz-xyz-xyz)"
                        name="URL"
                        value={editFromData.URL}
                        onChange={handleEditChangeFrom}
                        required
                      />

                      <div className="flex mt-3 ring-black">
                        <div class="relative h-10 w-40 mr-3 min-w-[200px] ring-black">
                          <select
                            class="peer h-full w-full  rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 
                             py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all
                             placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200
                            empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent
                            focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            name="Status"
                            value={editFromData.Status}
                            onChange={handleEditChangeFrom}
                            required
                          >
                            <option value="brazil">Under Construction</option>
                            <option value="bucharest">Ready to Move In</option>
                            <option value="london">Booking Open</option>
                            <option value="washington">Coming Soon</option>
                          </select>
                          <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Status
                          </label>
                        </div>

                        <div class="relative h-10 w-40 mr-3 min-w-[200px] ring-black">
                          <select
                            class="peer h-full w-full  rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            name="Featured"
                            value={editFromData.Featured}
                            onChange={handleEditChangeFrom}
                            required
                          >
                            <option value="brazil">Trending Project</option>
                            <option value="bucharest">Similar Project</option>
                            <option value="london">Featured</option>
                            <option value="washington">As Usual</option>
                          </select>
                          <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Featured
                          </label>
                        </div>
                      </div>

                      <input
                        className="w-full mt-3 rounded-md border bg-white px-2 py-2 outline-none ring-black focus:ring-1"
                        type="email"
                        placeholder="Rera no"
                        name="ReraNo"
                        value={editFromData.ReraNo}
                        onChange={handleEditChangeFrom}
                      />

                      <input
                        className="w-full mt-3 rounded-md border bg-white px-2 py-2 outline-none ring-black focus:ring-1"
                        type="email"
                        placeholder="minCovered Area (sq.ft.)"
                        name="MinCoveredArea"
                        value={editFromData.MinCoveredArea}
                        onChange={handleEditChangeFrom}
                      />

                      <input
                        className="w-full mt-3 rounded-md border bg-white px-2 py-2 outline-none ring-black focus:ring-1"
                        type="email"
                        placeholder="maxCovered Area (sq.ft.)"
                        name="MaxCoveredArea"
                        value={editFromData.MaxCoveredArea}
                        onChange={handleEditChangeFrom}
                      />

                      <div className="flex mt-3 ring-black">
                        <div class="relative h-10 w-40 mr-3 min-w-[200px] ring-black">
                          <select
                            class="peer h-full w-full mr-3 rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            name="BuilderSelect"
                            value={editFromData.BuilderSelect}
                            onChange={handleEditChangeFrom}
                          >
                            <option value="adani">Adani</option>
                            <option value="ashiana">Ashiana</option>
                            <option value="aipl">Aipl</option>
                            <option value="amb">Amb</option>
                            <option value="ambience">Ambience</option>
                            <option value="Anantraj Estates and Birla Estates">
                              Anantraj Estates and Birla Estates
                            </option>
                            <option value="ats">Ats</option>
                            <option value="Bestech">Bestech</option>
                            <option value="bptp">Bptp</option>
                            <option value="centralpark">Central Park</option>
                            <option value="conscient">Conscient</option>
                            <option value="capital">Capital Developers India</option>
                            <option value="dlf">DLF</option>
                            <option value="experion">Experion</option>
                            <option value="elan">Elan</option>
                            <option value="emaarIndia">Emaar India</option>
                            <option value="godrej">Godrej</option>
                            <option value="herohomes">Hero Homes</option>
                            <option value="krisumi">Krisumi</option>
                            <option value="m3m">M3M</option>
                            <option value="mahindra">Mahindra</option>
                            <option value="microtech">Microtech</option>
                            <option value="orris">Orris</option>
                            <option value="omaxe">Omaxe</option>
                            <option value="oxirich">Oxirich</option>
                            <option value="paras">Paras</option>
                            <option value="puri">Puri</option>
                            <option value="raheja">Raheja</option>
                            <option value="risland">Risland</option>
                            <option value="rofGroup">ROF Group</option>
                            <option value="supertech">SuperTech</option>
                            <option value="suncity">Suncity Projects Pvt.Ltd</option>
                            <option value="spaze">Spaze</option>
                            <option value="shapoorji">Shapoorji Pallonji</option>
                            <option value="smartworld">Smart World</option>
                            <option value="sobha">Sobha</option>
                            <option value="tarc">Tarc</option>
                            <option value="tatahousing">Tata Housing</option>
                            <option value="tribeca_developers">Tribeca Developers</option>
                            <option value="vatika">Vatika</option>
                            <option value="whiteland">Whiteland</option>
                            <option value="32milestone">32 Milestone</option>
                          </select>
                          <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Builder Select
                          </label>
                        </div>

                        <div class="relative h-10 w-40 mr-3 min-w-[200px] ring-black">
                          <select
                            class="peer h-full w-full  rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                            name="Location"
                            value={editFromData.Location}
                            onChange={handleEditChangeFrom}
                          >
                            <option value="gurugaon">Gurugaon</option>
                            <option value="delhi">Delhi</option>
                            <option value="sector45">Sector 45</option>
                            <option value="tilaknagar">Tilak Nagar</option>
                            <option value="palamvihar">Palam Vihar</option>
                            <option value="mgroad">MG Road</option>
                            <option value="shubhashchowk">Shubhash Chowk</option>
                            <option value="rajeevchowk">Rajeev Chowk</option>
                          </select>
                          <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Location
                          </label>
                        </div>
                      </div>
                    </label>
                    <label className="block" for="name">
                      <p className="text-gray-600">About Developer</p>
                      <textarea
                        className="h-20 w-full rounded-md border bg-white px-2 py-1 outline-none ring-black focus:ring-1"
                        type="text"
                        placeholder="type here...."
                        name="AboutDeveloper"
                        value={editFromData.AboutDeveloper}
                        onChange={handleEditChangeFrom}
                      ></textarea>
                    </label>

                    <p className="mt-2 font-medium mb-1 grid grid-cols-4 text-gray-500">
                      Attach Photos
                    </p>

                    <div className="flex mt-3 ring-black">
                      <div class="relative h-10 w-40 min-w-[160px] ring-black">
                        <input
                          type="file"
                          name="sitePlan"
                          accept="image/*"
                          id="mainImage"
                        />
                      </div>

                      <div class=" ml-12 relative h-10 w-40 min-w-[160px] ring-black">
                        <input
                          type="file"
                          name="sitePlan"
                          accept="image/*"
                          id="mainImage"
                        />
                      </div>
                    </div>

                    <div className="flex mt-4 ring-black">
                      <div class="relative h-10 w-40 min-w-[160px] ring-black">
                        <input
                          type="file"
                          name="sitePlan"
                          accept="image/*"
                          id="mainImage"
                        />
                      </div>

                      <div class=" ml-12 relative h-10 w-40 min-w-[160px] ring-black">
                        <input
                          type="file"
                          name="sitePlan"
                          accept="image/*"
                          id="mainImage"
                        />
                      </div>
                    </div>

                    <input
                      className="w-full mt-4 rounded-md border bg-white px-2 py-2 outline-none ring-black focus:ring-1"
                      type="email"
                      placeholder="Meta Title*"
                      name="MetaTitle"
                      value={editFromData.MetaTitle}
                      onChange={handleEditChangeFrom}
                    />

                    <input
                      className="w-full mt-4 rounded-md border bg-white px-2 py-2 outline-none ring-black focus:ring-1"
                      type="email"
                      placeholder="Meta Description*"
                      name="MetaDescription"
                      value={editFromData.MetaDescription}
                      onChange={handleEditChangeFrom}
                    />
                    <button
                      onClick={submitEditFromData}
                      className="mt-4 rounded-full bg-red-500 px-5 py-2 font-semibold text-white"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </Modal>
          </div>

        </div>
        </div>
      </>
    );
  };

export default AdminContact;