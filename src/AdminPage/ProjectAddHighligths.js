import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import Sidebar from "./Sidebar";
import { Link, useParams } from "react-router-dom";

const customStyle = {
  position: "absolute",
  top: "100px",
  marginLeft: "250px",
  right: "auto",
  width: "80%",
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    padding: "10px",
    marginTop: "0px",
    width: "500px",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    paddingTop: "0px",
  },
};

const ProjectAddHighligths = () => {
  const [viewAll, setViewAll] = useState([]);
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const [highlights, setHighlights] = useState({
    highlight_Point: "",
  });

  const resetData = () =>{
    setHighlights({
      highlight_Point: "",
    })
  }

  const { id } = useParams();
  const handleHighlightChange = (e) => {
    const { name, value } = e.target;
    setHighlights({ ...highlights, [name]: value });
  };

  const ViewHighLights = async () => {
    try {
      const fetchData = await axios.get(
        `http://api.100acress.com/highlight/view/${id}`
      );
      setViewAll(fetchData.data.data);
    } catch (error) {
      console.error("Error inserting user data:", error.message);
    }
  };

  useEffect(() => {
    ViewHighLights();
  }, []);

  const submitAddHighlight = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://api.100acress.com/highlight/${id}`,
        highlights
      );
      alert("User data inserted successfully");
      resetData();
      
    } catch (error) {
      console.error("Error inserting user data:", error.message);
    }
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleDeleteUser = async (id) => {
   

    try {
      const response = await axios.delete(
        `http://api.100acress.com/highlight/delete/${id}`
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

  const handleDeleteButtonClick = (id) => {
    const confirmDeletion = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDeletion) {
      handleDeleteUser(id);
    }
  };

  return (
    <>
      <Sidebar />
      <div style={customStyle}>
        <div
          className="flex items-center mb-2 mt-2"
          style={{ marginLeft: "100px" }}
        >
          <span>
            <div className="flex justify-start ml-80 ">
              <button
                onClick={openModal}
                className="bg-blue-700 p-2 sm:rounded-lg text-white ml-2"
              >
                Add Highlights
              </button>
            </div>
          </span>
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
                    Highlights Points
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {viewAll.map((item, index) => {
                  const id1 = item._id;
                  return (
                    <tr
                      key={index}
                      className="bg-white-500 border-b border-red-400"
                    >
                      <td className="px-2 py-1">{index + 1}</td>
                      <td className="px-2 py-1">{item.highlight_Point}</td>

                      <td className="px-2 py-1 flex space-x-1">
                        <Link to={`/Admin/projectedithighlight/${id1}`}>
                          <button
                            type="button"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-2 py-1.5 text-center"
                          >
                            Edit
                          </button>
                        </Link>

                        <button
                          type="button"
                          onClick={() => handleDeleteButtonClick(id1)}
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
              contentLabel="Example Modal"
            >
              <div className="">
                <div className=" sm:w-[38rem] lg:w-full mx-auto lg:h-auto my-10 overflow-hidden rounded-2xl mt-0 mb-0 bg-white shadow-lg sm:max-w-lg">
                  <div className="bg-red-500 pb-1 pt-2 text-center text-white">
                    <p className="font-serif text-2xl font-semibold tracking-wider">
                      Add Highlights
                    </p>
                  </div>

                  <div className="space-y-4 px-8 py-3 pt-3 ">
                    <label className="block" for="name">
                      <input
                        className="w-full  rounded-md border bg-white px-2 py-1 outline-none ring-black focus:ring-1"
                        type="text"
                        placeholder="Add Highlights"
                        name="highlight_Point"
                        value={highlights.highlight_Point}
                        onChange={handleHighlightChange}
                        required
                      />
                    </label>

                    <button
                      onClick={submitAddHighlight}
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

export default ProjectAddHighligths;
