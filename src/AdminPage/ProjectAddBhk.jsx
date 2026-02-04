import React, { useState, useEffect } from "react";
import apiClient from "../config/apiClient";
import Modal from "react-modal";
import Sidebar from "./Sidebar";
import { Link, useParams } from "react-router-dom";
import showToast from "../Utils/toastUtils";
import { MdHome, MdAddCircle, MdTableRows, MdSearch, MdEdit, MdDelete, MdExpandMore, MdExpandLess } from "react-icons/md";
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

const ProjectsAddBhk = () => {
  const [editFromData, setEditFromData] = useState({
    bhk_type: "",
    price: "",
    bhk_Area: ""
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
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [bhkListOpen, setBhkListOpen] = useState(true);
  const [modalSectionOpen, setModalSectionOpen] = useState(true);

  const { id } = useParams();

  // Function to fetch BHK data (can be called on initial load and after mutations)
  const fetchBhkData = async () => {
    if (!id || id === 'undefined') {
      showToast.error('Project ID is missing or invalid.');
      return;
    }
    try {
      const res = await apiClient.get(`bhk_view/${id}`);
      setViewAll(res.data.data || []);
    } catch (error) {
      console.error("Error fetching BHK details:", error);
      showToast.error('Failed to fetch BHK details.');
    }
  };

  useEffect(() => {
    fetchBhkData();
  }, [id]); // Dependency array includes 'id'

  const handleEditChangeFrom = (e) => {
    const { name, value } = e.target;
    setEditFromData({ ...editFromData, [name]: value });
  };

  const submitBHKFromData = async (e) => {
    e.preventDefault();
    showToast.loading('Inserting...', { id: 'insertingBHK' });
    try {
      const response = await apiClient.post(`bhk_insert/${id}`, editFromData);
      if (response.status >= 200 && response.status < 300) {
        showToast.dismiss('insertingBHK');
        showToast.success('BHK has been inserted successfully.');
        fetchBhkData(); // Re-fetch data to get the latest list including the new item
        resetData();
        closeModal(); // Close modal after successful submission
      } else {
        showToast.dismiss('insertingBHK');
        showToast.error('Something went wrong while inserting the BHK.');
      }
    } catch (error) {
      showToast.dismiss('insertingBHK');
      showToast.error('Something went wrong while inserting the BHK.');
      console.error('Error inserting user data:', error.message);
    }
  };

  function openModal() {
    resetData(); // Reset form data when opening the modal for a fresh entry
    setIsOpen(true);
    showToast.info('Add Floor Plan modal opened');
  }

  function closeModal() {
    setIsOpen(false);
    showToast.info('Add Floor Plan modal closed');
  }

  const handleDeleteUser = async (_id) => {
    try {
      showToast.loading('Deleting...', { id: 'deletingBHK' });
      const response = await apiClient.delete(`bhk_delete/${_id}`);
      if (response.status >= 200 && response.status < 300) {
        showToast.dismiss('deletingBHK');
        showToast.success('BHK has been deleted successfully.');
        fetchBhkData(); // Re-fetch data to update the list
      } else {
        showToast.dismiss('deletingBHK');
        showToast.error('Failed to delete BHK. Server returned an error.');
      }
    } catch (error) {
      showToast.dismiss('deletingBHK');
      showToast.error('An error occurred while deleting BHK.');
      console.error('An error occurred while deleting BHK:', error.message);
    }
  };

  const handleDeleteButtonClick = (_id) => {
    const confirmDeletion = window.confirm('Are you sure you want to delete this BHK?');
    if (confirmDeletion) {
      handleDeleteUser(_id);
    }
  };

  // Filter `viewAll` based on `searchTerm`
  const filteredBHKs = viewAll.filter(item =>
    item.bhk_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.bhk_Area.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.price.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Sidebar />
      <div className="flex-1 p-8 ml-64 bg-gray-50 dark:bg-gray-900 dark:text-white min-h-screen">
        {/* Header and Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
          <div className="flex items-center gap-2 mb-4 sm:mb-0">
            <MdHome className="text-3xl text-blue-500" />
            <h1 className="text-3xl font-bold text-gray-800">Manage BHKs</h1>
          </div>
          <div className="flex space-x-4 w-full sm:w-auto">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search BHKs..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200 shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
            <button
              onClick={openModal}
              className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              title="Add new BHK floor plan"
            >
              <MdAddCircle className="text-xl" /> Add Floor Plan
            </button>
          </div>
        </div>

        {/* BHK Table (Collapsible) */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border-l-4 border-gradient-to-r from-blue-400 to-purple-400 mb-10">
          <button
            className="w-full flex items-center gap-2 px-8 py-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white rounded-t-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            onClick={() => setBhkListOpen((open) => !open)}
            aria-expanded={bhkListOpen}
            aria-controls="bhk-list-section"
            type="button"
            title={bhkListOpen ? 'Collapse BHK List' : 'Expand BHK List'}
          >
            <MdTableRows className={`text-2xl text-purple-500 transition-transform duration-300 ${bhkListOpen ? 'rotate-0' : 'rotate-12 scale-110'}`} />
            <h2 className="text-2xl font-bold text-gray-800 flex-1 text-left">BHK List</h2>
            {bhkListOpen ? <MdExpandLess className="text-2xl text-gray-500 transition-transform duration-300 group-hover:-rotate-180" /> : <MdExpandMore className="text-2xl text-gray-500 transition-transform duration-300 group-hover:rotate-180" />}
          </button>
          <div
            id="bhk-list-section"
            className={`overflow-x-auto transition-all duration-300 ${bhkListOpen ? 'max-h-[1000px] opacity-100 p-8' : 'max-h-0 opacity-0 p-0'} bg-white`}
            style={{ willChange: 'max-height, opacity, padding' }}
            aria-hidden={!bhkListOpen}
          >
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">S No.</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">BHK Type</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Price</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">BHK Area</th>
                  <th scope="col" className="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBHKs.length > 0 ? (
                  filteredBHKs.map((item, index) => (
                    <tr key={item._id} className="group even:bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{item.bhk_type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{item.price}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{item.bhk_Area}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-2">
                        <Link to={`/Admin/projecteditbhk/${item._id}`}>
                          <Tippy content="Edit BHK" animation="scale" theme="light-border">
                            <button
                              type="button"
                              className="inline-flex items-center gap-1 px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-200 group"
                            >
                              <MdEdit className="text-lg group-hover:animate-bounce" /> Edit
                            </button>
                          </Tippy>
                        </Link>
                        <Tippy content="Delete BHK" animation="scale" theme="light-border">
                          <button
                            type="button"
                            onClick={() => handleDeleteButtonClick(item._id)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-200 group"
                          >
                            <MdDelete className="text-lg group-hover:animate-pulse" /> Delete
                          </button>
                        </Tippy>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500 italic">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <MdTableRows className="text-4xl text-gray-300 mb-2 animate-pulse" />
                        No BHK details found.
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Floor Plan Modal (Collapsible Section) */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customModalStyles}
          contentLabel="Add Floor Plan"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl">
            <button
              className="w-full flex items-center gap-2 bg-red-600 rounded-t-xl px-6 py-4 text-center text-white focus:outline-none focus:ring-2 focus:ring-red-400 transition"
              onClick={() => {
                setModalSectionOpen((open) => !open);
                showToast.info(modalSectionOpen ? 'Add Floor Plan form collapsed' : 'Add Floor Plan form expanded');
              }}
              aria-expanded={modalSectionOpen}
              aria-controls="modal-form-section"
              type="button"
              style={{ borderBottomLeftRadius: modalSectionOpen ? 0 : '0.75rem', borderBottomRightRadius: modalSectionOpen ? 0 : '0.75rem' }}
            >
              <MdAddCircle className={`text-2xl transition-transform duration-300 ${modalSectionOpen ? 'rotate-0' : 'rotate-90 scale-110'}`} />
              <h2 className="font-serif text-2xl font-semibold tracking-wide flex-1 text-left">Add Floor Plan</h2>
              {modalSectionOpen ? <MdExpandLess className="text-2xl text-white transition-transform duration-300" /> : <MdExpandMore className="text-2xl text-white transition-transform duration-300" />}
            </button>
            <div
              id="modal-form-section"
              className={`transition-all duration-300 ${modalSectionOpen ? 'max-h-[1000px] opacity-100 p-8' : 'max-h-0 opacity-0 p-0'}`}
              style={{ willChange: 'max-height, opacity, padding' }}
              aria-hidden={!modalSectionOpen}
            >
              <form onSubmit={submitBHKFromData} className="space-y-5">
              <div>
                <label htmlFor="bhk_Area" className="sr-only">BHK Area</label>
                  <Tippy content={<span>Enter the area for this BHK (e.g., 1200 sqft)</span>} animation="scale" theme="light-border">
                <input
                  id="bhk_Area"
                  className="w-full rounded-lg border border-gray-300 bg-white dark:bg-gray-900 dark:text-white px-4 py-2 outline-none ring-blue-500 focus:ring-1 shadow-sm transition duration-200"
                  type="text"
                  placeholder="Add BHK Area (e.g., 1200 sqft)"
                  name="bhk_Area"
                  value={editFromData.bhk_Area}
                  onChange={handleEditChangeFrom}
                  required
                />
                  </Tippy>
              </div>
              <div>
                <label htmlFor="bhk_type" className="sr-only">BHK Type</label>
                  <Tippy content={<span>Enter the type for this BHK (e.g., 2BHK)</span>} animation="scale" theme="light-border">
                <input
                  id="bhk_type"
                  className="w-full rounded-lg border border-gray-300 bg-white dark:bg-gray-900 dark:text-white px-4 py-2 outline-none ring-blue-500 focus:ring-1 shadow-sm transition duration-200"
                      type="text"
                  placeholder="Add BHK Type (e.g., 2BHK)"
                  name="bhk_type"
                  value={editFromData.bhk_type}
                  onChange={handleEditChangeFrom}
                  required
                />
                  </Tippy>
              </div>
              <div>
                <label htmlFor="price" className="sr-only">Price</label>
                  <Tippy content={<span>Enter the price for this BHK (e.g., ₹50 Lacs)</span>} animation="scale" theme="light-border">
                <input
                  id="price"
                  className="w-full rounded-lg border border-gray-300 bg-white dark:bg-gray-900 dark:text-white px-4 py-2 outline-none ring-blue-500 focus:ring-1 shadow-sm transition duration-200"
                      type="text"
                  placeholder="Price (e.g., ₹50 Lacs)"
                  name="price"
                  value={editFromData.price}
                  onChange={handleEditChangeFrom}
                  required
                />
                  </Tippy>
              </div>

                <Tippy content={<span>Insert new BHK floor plan</span>} animation="scale" theme="light-border">
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

export default ProjectsAddBhk;