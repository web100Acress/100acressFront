import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import { message } from "antd"; // Assuming Ant Design message is available

const Projects = () => {
  const [viewAll, setViewAll] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(25);
  const [searchTerm, setSearchTerm] = useState("");

  const [messageApi, contextHolder] = message.useMessage(); // For Ant Design messages

  // Effect to inject styles into the document head
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = projectStyles;
    document.head.appendChild(styleSheet);

    return () => {
      // Clean up styles on component unmount
      document.head.removeChild(styleSheet);
    };
  }, []); // Run once on mount to inject styles

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "/project/viewAll/data"
        );
        setViewAll(res.data.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
        messageApi.open({
          type: "error",
          content: "Failed to fetch projects. Please try again.",
          duration: 2,
        });
      }
    };
    fetchData();
  }, []);

  const handleDeleteUser = async (id) => {
    try {
      const myToken = localStorage.getItem("myToken");
      const response = await axios.delete(
        `/project/Delete/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${myToken}`,
          },
        }
      );
      console.log(response, "response");
      if (response.status >= 200 && response.status < 300) {
        messageApi.open({
          type: "success",
          content: "Property deleted successfully.",
          duration: 2,
        });
        // Filter out the deleted item from the state to update UI
        setViewAll(prevViewAll => prevViewAll.filter(item => item._id !== id));
      } else {
        messageApi.open({
          type: "error",
          content: "Failed to delete project. Server returned an error.",
          duration: 2,
        });
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          console.log("Unauthorized: You don't have permission to delete this project.");
          messageApi.open({
            type: "error",
            content: "You are not authorized to delete this project.",
            duration: 2,
          });
        } else {
          console.error("An error occurred while deleting project:", error.response.status);
          messageApi.open({
            type: "error",
            content: `Error deleting project: ${error.response.status}.`,
            duration: 2,
          });
        }
      } else if (error.request) {
        console.error("No response received from the server.");
        messageApi.open({
          type: "error",
          content: "No response from server. Please check your network.",
          duration: 2,
        });
      } else {
        console.error("Error in request setup:", error.message);
        messageApi.open({
          type: "error",
          content: "An unexpected error occurred. Please try again.",
          duration: 2,
        });
      }
    }
  };

  const handleDeleteButtonClick = (id) => {
    const confirmDeletion = window.confirm(
      "Are you sure you want to delete this project?"
    );
    if (confirmDeletion) {
      handleDeleteUser(id);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  const filteredProjects = viewAll.filter((item) =>
    item.projectName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredProjects.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 dark:text-gray-100 min-h-screen flex">
      <Sidebar />
      <div className="flex-1 p-8 ml-[250px] transition-colors duration-300">
        {contextHolder} {/* Ant Design message context holder */}
        <div className="projects-header">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search project name..."
              className="search-input"
              value={searchTerm}
              onChange={handleSearch}
            />
            <button className="search-button">
              Search
            </button>
          </div>
          <Link to={"/admin/project-insert"}>
            <button
              className="add-new-project-button"
            >
              Add New Project ➕
            </button>
          </Link>
        </div>

        <div className="table-container">
          <table className="projects-table">
            <thead>
              <tr>
                <th scope="col" className="table-header">
                  S No.
                </th>
                <th scope="col" className="table-header">
                  Name
                </th>
                <th scope="col" className="table-header">
                  Type
                </th>
                <th scope="col" className="table-header">
                  City
                </th>
                <th scope="col" className="table-header">
                  Address
                </th>
                <th scope="col" className="table-header action-header">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentRows.length > 0 ? (
                currentRows.map((item, index) => {
                  const serialNumber = indexOfFirstRow + index + 1;
                  const id = item._id;
                  const pUrl = item.project_url;
                  return (
                    <tr
                      key={id} // Use item._id as key for better performance and uniqueness
                      className="table-row"
                    >
                      <td className="table-cell serial-number">
                        {serialNumber}
                      </td>
                      <td className="table-cell project-name">
                        {item.projectName}
                      </td>
                      <td className="table-cell">
                        {item.type}
                      </td>
                      <td className="table-cell">
                        {item.city}
                      </td>
                      <td className="table-cell project-address">
                        {item.projectAddress}
                      </td>

                      <td className="table-cell action-buttons-cell">
                        <Link to={`/Admin/ProjectsView/${pUrl}`}>
                          <button
                            type="button"
                            className="action-button view-button"
                          >
                            View
                          </button>
                        </Link>

                        <Link to={`/Admin/ProjectsEdit/${id}`}>
                          <button
                            type="button"
                            className="action-button edit-button"
                          >
                            Edit
                          </button>
                        </Link>

                        <Link to={`/Admin/ProjectsAddBhk/${id}`}>
                          <button
                            type="button"
                            className="action-button add-bhk-button"
                          >
                            ADD BHK
                          </button>
                        </Link>

                        <Link to={`/Admin/ProjectAddHighlights/${id}`}>
                          <button
                            type="button"
                            className="action-button add-highlights-button"
                          >
                            ADD Highlights
                          </button>
                        </Link>

                        <button
                          onClick={() => handleDeleteButtonClick(id)}
                          type="button"
                          className="action-button delete-button"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className="no-data-message">
                    No projects found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="pagination-container">
            {Array.from(
              { length: Math.ceil(filteredProjects.length / rowsPerPage) },
              (_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`pagination-button ${
                    currentPage === index + 1
                      ? "pagination-active"
                      : ""
                  }`}
                >
                  {index + 1}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;

// --- Embedded CSS Styles ---
const projectStyles = `
/* Overall Layout */
.projects-main-content {
  flex: 1;
  min-width: 0;
  padding: 3rem 2rem; /* Increased padding for more spacious feel */
  margin-left: 250px; /* Aligns with Sidebar width */
  background: linear-gradient(135deg, #f0f2f5 0%, #e0e6ed 100%); /* Subtle gradient background */
  min-height: 100vh;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif; /* A more elegant font choice */
  color: #333d4e; /* Slightly darker, sophisticated text color */
  transition: all 0.3s ease-in-out; /* Smooth transitions for layout changes */
}

@media (max-width: 768px) {
  .projects-main-content {
    margin-left: 0;
    padding: 2rem 1rem;
  }
}

/* Header and Controls */
.projects-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem; /* More space below header */
  flex-wrap: wrap;
  gap: 1.8rem; /* Increased gap for better separation */
}

.search-container {
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border-radius: 14px; /* Even softer rounded corners */
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.1); /* Deeper, more elegant shadow */
  overflow: hidden;
  max-width: 500px; /* Wider search bar */
  flex-grow: 1;
  border: 1px solid #d8e2ed; /* Subtle border for definition */
}

.search-input {
  padding: 14px 20px; /* Increased padding */
  border: none;
  border-bottom: 3px solid #f44336; /* Prominent red accent */
  color: #333d4e;
  outline: none;
  flex-grow: 1;
  font-size: 1.05rem; /* Slightly larger text */
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.search-input::placeholder {
  color: #aebacd; /* Elegant placeholder color */
}

.search-input:focus {
  border-color: #d32f2f; /* Darker red on focus */
  box-shadow: 0 0 0 3px rgba(244, 67, 54, 0.2); /* Soft glow on focus */
}

.search-button {
  background: linear-gradient(45deg, #f44336 0%, #e53935 100%); /* Red gradient */
  color: #ffffff;
  padding: 14px 25px; /* More padding */
  border: none;
  border-radius: 0 14px 14px 0;
  cursor: pointer;
  font-size: 1.05rem;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(244, 67, 54, 0.4); /* Matching shadow for button */
}

.search-button:hover {
  background: linear-gradient(45deg, #e53935 0%, #d32f2f 100%); /* Darker gradient on hover */
  transform: translateY(-2px); /* More pronounced lift */
  box-shadow: 0 6px 20px rgba(244, 67, 54, 0.5);
}

.add-new-project-button {
  background: linear-gradient(45deg, #4CAF50 0%, #43a047 100%); /* Green gradient */
  color: #ffffff;
  padding: 14px 28px;
  border-radius: 14px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  font-size: 1.05rem;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(76, 175, 80, 0.4);
}

.add-new-project-button:hover {
  background: linear-gradient(45deg, #43a047 0%, #388e3c 100%); /* Darker green gradient on hover */
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(76, 175, 80, 0.5);
}

/* Table Styling */
.table-container {
  overflow-x-auto;
  background-color: #ffffff;
  border-radius: 20px; /* Even larger, softer border-radius */
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15); /* Deeper, more pronounced shadow */
  margin-bottom: 2.5rem;
  border: 1px solid #e0e6ed; /* Subtle border */
}

.projects-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  min-width: 1000px; /* Ensure generous width */
  font-size: 0.98rem; /* Slightly larger text */
}

.table-header {
  padding: 20px 28px; /* More padding */
  text-align: center;
  font-size: 0.9rem; /* Slightly larger header font */
  font-weight: 700;
  color: #5c677d; /* Muted, professional header text color */
  text-transform: uppercase;
  letter-spacing: 0.1em; /* Increased letter spacing */
  background-color: #f7f9fc; /* Very light header background */
  border-bottom: 2px solid #e8eaf1;
  position: sticky; /* Make headers sticky for large tables */
  top: 0;
  z-index: 1; /* Ensure headers are above scrolling content */
}

.table-header:first-child {
  border-top-left-radius: 20px;
}

.table-header:last-child {
  border-top-right-radius: 20px;
}

.table-body .table-row:nth-child(odd) { /* Back to odd for a subtle stripe */
  background-color: #fcfdff;
}

.table-body .table-row:hover {
  background-color: #eaf6ff; /* More distinct hover color */
  transition: background-color 0.3s ease, transform 0.1s ease;
  transform: scale(1.005); /* Subtle grow on hover */
}

.table-cell {
  padding: 18px 28px; /* Increased padding */
  text-align: center;
  font-size: 0.98rem;
  color: #333d4e;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-bottom: 1px solid #e8eaf1;
}

.table-body .table-row:last-child .table-cell {
  border-bottom: none;
}

.serial-number {
    font-weight: 600;
    color: #5a6a7c;
}

.project-name {
    font-weight: 600;
    text-align: left;
    color: #2c3a4d;
}

.project-address {
    max-width: 250px; /* Increased max width for address */
    white-space: normal;
    line-height: 1.5; /* Better line spacing for wrapped text */
}

.no-data-message {
  text-align: center;
  padding: 40px; /* More vertical padding */
  color: #8898aa;
  font-size: 1.2rem; /* Larger font */
  font-style: italic;
  font-weight: 500;
  background-color: #fefefe;
  border-radius: 0 0 20px 20px; /* Rounded bottom corners */
}

/* Action Buttons within Table */
.action-buttons-cell {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px; /* More space between buttons */
  flex-wrap: wrap;
  padding: 15px 20px; /* Adjusted padding for button cell */
}

.action-button {
  padding: 10px 16px; /* Larger padding for individual buttons */
  border-radius: 10px; /* Softer rounded corners */
  border: none;
  font-weight: 500;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.25s ease;
  white-space: nowrap;
  box-shadow: 0 3px 10px rgba(0,0,0,0.1); /* More pronounced shadow */
}

.action-button:hover {
  transform: translateY(-2px); /* More pronounced lift */
  box-shadow: 0 5px 15px rgba(0,0,0,0.18);
}

/* Specific button colors with subtle gradients */
.view-button {
  background: linear-gradient(45deg, #28a745 0%, #218838 100%);
  color: white;
}
.view-button:hover {
  background: linear-gradient(45deg, #218838 0%, #1e7e34 100%);
}

.edit-button {
  background: linear-gradient(45deg, #007bff 0%, #0069d9 100%);
  color: white;
}
.edit-button:hover {
  background: linear-gradient(45deg, #0069d9 0%, #0056b3 100%);
}

.add-bhk-button {
  background: linear-gradient(45deg, #ffc107 0%, #e0a800 100%);
  color: #444; /* Darker text for contrast */
}
.add-bhk-button:hover {
  background: linear-gradient(45deg, #e0a800 0%, #cc9000 100%);
}

.add-highlights-button {
  background: linear-gradient(45deg, #fd7e14 0%, #e66a00 100%);
  color: white;
}
.add-highlights-button:hover {
  background: linear-gradient(45deg, #e66a00 0%, #cb5c00 100%);
}

.delete-button {
  background: linear-gradient(45deg, #dc3545 0%, #c82333 100%);
  color: white;
}
.delete-button:hover {
  background: linear-gradient(45deg, #c82333 0%, #bd2130 100%);
}

/* Pagination */
.pagination-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.9rem; /* Increased gap */
  margin-top: 2.5rem; /* More space above pagination */
  padding-bottom: 3.5rem; /* More space at the bottom */
}

.pagination-button {
  padding: 13px 20px; /* More padding */
  border-radius: 12px; /* Softer corners */
  border: 1px solid #dcdcdc;
  background-color: #ffffff;
  color: #6c7a89;
  font-size: 1rem; /* Slightly larger font */
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 3px 10px rgba(0,0,0,0.08); /* Subtle shadow */
}

.pagination-button:hover:not(:disabled) {
  background-color: #f2f7fc; /* Very light hover */
  border-color: #b0b8c0;
  color: #333d4e;
  transform: translateY(-2px); /* More pronounced lift */
  box-shadow: 0 5px 15px rgba(0,0,0,0.12);
}

.pagination-active {
  background: linear-gradient(45deg, #f44336 0%, #d32f2f 100%); /* Red gradient for active page */
  color: #ffffff;
  border-color: #f44336;
  font-weight: 700;
  box-shadow: 0 4px 15px rgba(244, 67, 54, 0.4);
}

.pagination-active:hover {
  background: linear-gradient(45deg, #d32f2f 0%, #c62828 100%); /* Darker red on hover for active */
  border-color: #d32f2f;
  color: #ffffff;
}

.pagination-disabled {
  background-color: #f8f8f8; /* Lighter disabled background */
  color: #c0c0c0; /* Lighter disabled text */
  cursor: not-allowed;
  opacity: 0.8;
  border-color: #e0e0e0;
  box-shadow: none;
}
`;