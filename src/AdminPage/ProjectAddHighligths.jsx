import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import Sidebar from "./Sidebar";
import { Link, useParams } from "react-router-dom";
import { message } from "antd"; // Import Ant Design message
import { MdStar, MdAddCircle, MdTableRows, MdEdit, MdDelete, MdExpandMore, MdExpandLess } from "react-icons/md";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

// Set app element for react-modal to prevent accessibility issues
Modal.setAppElement('#root'); // Assuming your root element id is 'root'

const customModalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    borderRadius: '12px', // More rounded corners
    padding: '0px', // No internal padding as content handles it
    border: 'none', // Remove default border
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)', // Deeper shadow
    width: '450px', // Fixed width for the modal content
    overflow: 'hidden', // Ensures rounded corners are respected
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Darker overlay
    zIndex: 1000 // Ensure it's above other content
  }
};

const ProjectAddHighligths = () => {
  const [viewAll, setViewAll] = useState([]);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [messageApi, contextHolder] = message.useMessage(); // Ant Design message hook
  const [modalSectionOpen, setModalSectionOpen] = useState(true);

  const [highlights, setHighlights] = useState({
    highlight_Point: "",
  });

  const resetData = () => {
    setHighlights({
      highlight_Point: "",
    });
  };

  const { id } = useParams();

  const handleHighlightChange = (e) => {
    const { name, value } = e.target;
    setHighlights({ ...highlights, [name]: value });
  };

  // Function to fetch highlight data (can be called on initial load and after mutations)
  const ViewHighLights = async () => {
    try {
      const fetchData = await axios.get(
        `/highlight/view/${id}`
      );
      setViewAll(fetchData.data.data);
    } catch (error) {
      console.error("Error fetching highlights:", error.message);
      messageApi.open({
        type: 'error',
        content: 'Failed to load highlights.',
        duration: 2,
      });
    }
  };

  useEffect(() => {
    ViewHighLights();
  }, [id]); // Depend on 'id' to re-fetch if it changes

  const submitAddHighlight = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    messageApi.open({
      key: "insertingHighlight",
      type: 'loading',
      content: 'Adding highlight...',
    });

    try {
      const res = await axios.post(
        `/highlight/${id}`,
        highlights
      );
      if (res.status >= 200 && res.status < 300) {
        messageApi.destroy('insertingHighlight');
        messageApi.open({
          type: 'success',
          content: 'Highlight added successfully!',
          duration: 2,
        });
        resetData(); // Clear the form
        closeModal(); // Close the modal
        ViewHighLights(); // Re-fetch to update the table
      } else {
        messageApi.destroy('insertingHighlight');
        messageApi.open({
          type: 'error',
          content: 'Something went wrong while adding the highlight.',
          duration: 2,
        });
      }
    } catch (error) {
      messageApi.destroy('insertingHighlight');
      messageApi.open({
        type: 'error',
        content: 'An error occurred while adding the highlight.',
        duration: 2,
      });
      console.error("Error inserting highlight:", error.message);
    }
  };

  function openModal() {
    resetData(); // Reset form data when opening modal for a new entry
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleDeleteUser = async (_id) => {
    messageApi.open({
      key: "deletingHighlight",
      type: 'loading',
      content: 'Deleting highlight...',
    });

    try {
      const response = await axios.delete(
        `/highlight/delete/${_id}`
      );
      if (response.status >= 200 && response.status < 300) {
        messageApi.destroy('deletingHighlight');
        messageApi.open({
          type: 'success',
          content: 'Highlight deleted successfully!',
          duration: 2,
        });
        ViewHighLights(); // Re-fetch to update the table
      } else {
        messageApi.destroy('deletingHighlight');
        messageApi.open({
          type: 'error',
          content: 'Failed to delete highlight. Server returned an error.',
          duration: 2,
        });
        console.error("Failed to delete highlight. Server returned an error.");
      }
    } catch (error) {
      messageApi.destroy('deletingHighlight');
      messageApi.open({
        type: 'error',
        content: 'An error occurred while deleting highlight.',
        duration: 2,
      });
      console.error("An error occurred while deleting highlight:", error.message);
    }
  };

  const handleDeleteButtonClick = (_id) => {
    const confirmDeletion = window.confirm(
      "Are you sure you want to delete this highlight?"
    );
    if (confirmDeletion) {
      handleDeleteUser(_id);
    }
  };

  return (
    <>
      <Sidebar />
      {/* Main content area */}
      <div className="flex-1 p-8 ml-64 bg-gray-50 min-h-screen font-sans">
        {contextHolder} {/* Ant Design message context holder */}

        {/* Header and Controls */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <MdStar className="text-3xl text-yellow-500 animate-pulse" />
            <h1 className="text-3xl font-bold text-gray-800">Project Highlights</h1>
          </div>
          <Tippy content={<span>Add new highlight</span>} animation="scale" theme="light-border">
            <button
              onClick={openModal}
              className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <MdAddCircle className="text-xl" /> Add Highlights
            </button>
          </Tippy>
        </div>

        {/* Highlights Table */}
        <div className="bg-white rounded-xl shadow-2xl border-l-4 border-gradient-to-r from-yellow-400 to-purple-400 mb-10">
          <div className="flex items-center gap-2 px-8 py-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white rounded-t-xl">
            <MdTableRows className="text-2xl text-purple-500" />
            <h2 className="text-2xl font-bold text-gray-800 flex-1 text-left">Highlights List</h2>
          </div>
          <div className="overflow-x-auto p-8">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">S No.</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Highlight Points</th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {viewAll.length > 0 ? (
                  viewAll.map((item, index) => {
                    const id1 = item._id;
                    return (
                      <tr
                        key={index}
                        className="group even:bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                        <td className="px-6 py-4 text-sm text-gray-800 break-words max-w-lg">
                          {item.highlight_Point}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-2">
                          <Link to={`/Admin/projectedithighlight/${id1}`}>
                            <Tippy content={<span>Edit highlight</span>} animation="scale" theme="light-border">
                              <button
                                type="button"
                                className="inline-flex items-center gap-1 px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-200 group"
                              >
                                <MdEdit className="text-lg group-hover:animate-bounce" /> Edit
                              </button>
                            </Tippy>
                          </Link>
                          <Tippy content={<span>Delete highlight</span>} animation="scale" theme="light-border">
                            <button
                              type="button"
                              onClick={() => handleDeleteButtonClick(id1)}
                              className="inline-flex items-center gap-1 px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-200 group"
                            >
                              <MdDelete className="text-lg group-hover:animate-pulse" /> Delete
                            </button>
                          </Tippy>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="3" className="px-6 py-12 text-center text-gray-500 italic">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <MdTableRows className="text-4xl text-gray-300 mb-2 animate-pulse" />
                        No highlights found.
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Highlights Modal (Collapsible Section) */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customModalStyles}
          contentLabel="Add Highlights"
        >
          <div className="bg-white rounded-xl">
            <button
              className="w-full flex items-center gap-2 bg-red-600 rounded-t-xl px-6 py-4 text-center text-white focus:outline-none focus:ring-2 focus:ring-red-400 transition"
              onClick={() => setModalSectionOpen((open) => !open)}
              aria-expanded={modalSectionOpen}
              aria-controls="modal-form-section"
              type="button"
              style={{ borderBottomLeftRadius: modalSectionOpen ? 0 : '0.75rem', borderBottomRightRadius: modalSectionOpen ? 0 : '0.75rem' }}
            >
              <MdAddCircle className={`text-2xl transition-transform duration-300 ${modalSectionOpen ? 'rotate-0' : 'rotate-90 scale-110'}`} />
              <h2 className="font-serif text-2xl font-semibold tracking-wide flex-1 text-left">Add Highlights</h2>
              {modalSectionOpen ? <MdExpandLess className="text-2xl text-white transition-transform duration-300" /> : <MdExpandMore className="text-2xl text-white transition-transform duration-300" />}
            </button>
            <div
              id="modal-form-section"
              className={`transition-all duration-300 ${modalSectionOpen ? 'max-h-[1000px] opacity-100 p-8' : 'max-h-0 opacity-0 p-0'}`}
              style={{ willChange: 'max-height, opacity, padding' }}
              aria-hidden={!modalSectionOpen}
            >
              <form onSubmit={submitAddHighlight} className="space-y-5">
                <div>
                  <label htmlFor="highlight_Point" className="sr-only">Highlight Point</label>
                  <Tippy content={<span>Enter the highlight point (e.g., "Near Metro Station")</span>} animation="scale" theme="light-border">
                    <textarea
                      id="highlight_Point"
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 outline-none ring-blue-500 focus:ring-1 shadow-sm transition duration-200 min-h-[100px]"
                      placeholder="Add Highlight Point"
                      name="highlight_Point"
                      value={highlights.highlight_Point}
                      onChange={handleHighlightChange}
                      required
                    ></textarea>
                  </Tippy>
                </div>

                <Tippy content={<span>Insert new highlight</span>} animation="scale" theme="light-border">
                  <button
                    type="submit"
                    className="mt-6 w-full flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-red-500 to-red-700 px-6 py-3 font-semibold text-white shadow-md hover:from-red-600 hover:to-red-800 transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 group"
                  >
                    <MdAddCircle className="text-xl group-hover:animate-bounce" /> Insert
                  </button>
                </Tippy>
              </form>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default ProjectAddHighligths;