
import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import Sidebar from "./Sidebar";
import { Link, useParams } from "react-router-dom";
import Swal from 'sweetalert2';

const customStyle = {
  position: "absolute",
  top: "100px",
  marginLeft: "250px",
  right: "auto",
  width: "80%"

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
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    paddingTop: '0px',
  },
};

const ProjectsAddBhk = () => {
  const [editFromData, setEditFromData] = useState({
   bhk_type:"",
   price:"",
   bhk_Area:""
  });

  const resetData = () => {
    setEditFromData({
      bhk_type: "",
      price: "",
      bhk_Area: ""
    });
  };
  

  const [viewAll, setViewAll] = useState([]);
  const [modalIsOpen, setIsOpen] = React.useState(false);


  const {id} = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://acre.onrender.com/bhk_view/${id}`);
        setViewAll(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);




  const handleEditChangeFrom = (e) => {
    const { name, value } = e.target;
    setEditFromData({ ...editFromData, [name]: value });
  };

  const submitBHKFromData = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`https://acre.onrender.com/bhk_insert/${id}`,editFromData);
      alert("User data inserted successfully");
      resetData();
    } catch (error) {
      console.error('Error inserting user data:', error.message);
    }
  };
  
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
 
  const handleDeleteUser = async (id) => {
    const urlDelete = `https://acre.onrender.com/bhk_delete/${id}`;
    console.log(urlDelete)
    try {
      const response = await axios.delete(`https://acre.onrender.com/bhk_delete/${id}`);
      if (response.status >= 200 && response.status < 300) {
        window.location.reload();
      } else {
        console.error('Failed to delete user. Server returned an error.');
      }
    } catch (error) {
      console.error('An error occurred while deleting user:', error.message);
    }
  };

  const handleDeleteButtonClick = (id) => {
    const confirmDeletion = window.confirm('Are you sure you want to delete this user?');
    if (confirmDeletion) {
      handleDeleteUser(id);
    }
  };


  return (
    <>
      <Sidebar />
      <div style={customStyle}>

        <div className="flex items-center mb-2 mt-2" style={{ marginLeft: "100px" }}>
          <button className="text-bold bg-red-600 p-2 text-white rounded-md mr-10">Search</button>
          <input
            type="text"
            placeholder="Search..."
            className="p-2 border-b-2 w-50 border-red-600 text-black placeholder-black outline-none rounded-sm"
       
           
          />
          <span> <div className="flex justify-end ml-20">
            <button
              onClick={openModal} className="bg-blue-700 p-2 sm:rounded-lg text-white ml-2">Add Floor Plan</button>
          </div></span>
        </div>

        <div className="flex justify-center items-center mt-0">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-5/6 mt-0">
            <table className="w-full text-sm text-left rtl:text-right text-black-100 dark:text-black-100 ">
              <thead className="text-xs text-black uppercase dark:text-black border-b-2  border-red-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    S No.
                  </th>
                  <th scope="col" className="px-6 py-3">
                   BHK type
                  </th>

                  <th scope="col" className="px-6 py-3">Price</th>
                  <th scope="col" className="px-6 py-3">BHK Area</th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {viewAll.map((item, index) => {
                  
                  const id = item._id;
                  
                  return (
                    <tr key={index} className="bg-white-500 border-b border-red-400">
                     <td className="px-2 py-1">{index+1}</td>
                      <td className="px-2 py-1">{item.bhk_type}</td>
                      <td className="px-2 py-1">{item.bhk_Area}</td>
                      <td className="px-2 py-1">{item.price}</td>

                      <td className="px-2 py-1 flex space-x-1">

                       

                        <Link to={`/Admin/projecteditbhk/${id}`}>
                          <button
                            type="button"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-2 py-1.5 text-center"
                          >
                            Edit
                          </button></Link>
                          
                          <button
                            type="button"
                             onClick={()=>handleDeleteButtonClick(id)}
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

           
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Example Modal">
              <div className="">
                <div className=" sm:w-[38rem] lg:w-full mx-auto lg:h-auto my-10 overflow-hidden rounded-2xl mt-0 mb-0 bg-white shadow-lg sm:max-w-lg">
                  <div className="bg-red-500 pb-1 pt-2 text-center text-white">
                    <p className="font-serif text-2xl font-semibold tracking-wider">
                      Add Floor Plan
                    </p>
                  </div>

                  <div className="space-y-4 px-8 py-3 pt-3 ">
                    <label className="block" for="name">
                      <input
                        className="w-full  rounded-md border bg-white px-2 py-1 outline-none ring-black focus:ring-1"
                        type="text"
                        placeholder="Add BHK Area"
                        name="bhk_Area"
                        value={editFromData.bhk_Area}
                        onChange={handleEditChangeFrom}
                        required
                      />
                    </label>
                    <label className="block" for="name">
                      <input
                        className="w-full rounded-md border bg-white px-2 py-1 outline-none ring-black focus:ring-1"
                        type="email"
                        placeholder="Add Bhk Type"
                        name="bhk_type"
                        value={editFromData.bhk_type}
                        onChange={handleEditChangeFrom}
                        required
                      />
                      <input
                        className="w-full mt-3 rounded-md border bg-white px-2 py-1 outline-none ring-black focus:ring-1"
                        type="email"
                        placeholder="Price"
                        name="price"
                        value={editFromData.price}
                        onChange={handleEditChangeFrom}
                        required
                      />
                    </label>

                    <button
                      onClick={submitBHKFromData}
                      className="mt-4 rounded-full bg-red-500 px-5 py-2 font-semibold text-white"
                    >
                      Insert
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

export default ProjectsAddBhk;