import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";

const UserAdmin = () => {
  const [viewAll, setViewAll] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(25);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const myToken = localStorage.getItem("myToken");
        const res = await axios.get(
          "https://api.100acress.com/postPerson/view/allusers",
          {
            headers: {
              Authorization: `Bearer ${myToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        setViewAll(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const filteredProjects = viewAll.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredProjects.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const formatLastModified = (dateInput) => {
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return "";
    return date.toLocaleString(undefined, {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      <style>{`
        /* General Body Styling for a clean base */
        body {
          margin: 0;
          font-family: 'Roboto', sans-serif; /* Using a common, elegant font */
          background-color: #f0f2f5; /* Light grey background for the whole page */
        }

        /* Container for the main content, accounting for the Sidebar */
        .user-admin-container {
          position: relative; /* Changed from absolute to relative to simplify positioning with sidebar */
          margin-left: 250px; /* Space for the fixed sidebar */
          padding: 30px; /* Increased padding for more breathing room */
          background-color: #f9f9f9; /* Slightly off-white for the main content area */
          min-height: 100vh;
          box-shadow: -2px 0 8px rgba(0,0,0,0.05); /* Subtle shadow on the left edge */
        }

        /* Header for the Registered Users section */
        .user-admin-header {
          background-image: linear-gradient(to right, #ef5350, #d32f2f); /* Gradient for elegance */
          color: white;
          padding: 15px 0; /* More vertical padding */
          text-align: center;
          font-size: 24px; /* Slightly larger font */
          font-weight: 500; /* Medium weight for professionalism */
          border-radius: 8px; /* Softer rounded corners */
          margin-bottom: 30px; /* More space below header */
          letter-spacing: 0.5px; /* Slight letter spacing for readability */
          box-shadow: 0 4px 12px rgba(0,0,0,0.1); /* More pronounced shadow for depth */
        }

        /* Search Input Wrapper */
        .search-wrapper {
          display: flex;
          justify-content: center;
          margin-bottom: 30px;
        }

        /* Search Input Field */
        .search-input {
          padding: 12px 18px; /* Increased padding */
          width: 60%; /* Slightly wider search bar */
          max-width: 500px; /* Max width for larger screens */
          border: 1px solid #ccc; /* Softer border */
          border-radius: 25px; /* Pill-shaped input for a modern look */
          font-size: 15px;
          outline: none;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
          box-shadow: inset 0 1px 3px rgba(0,0,0,0.05); /* Inner shadow for depth */
        }

        .search-input::placeholder {
          color: #888; /* Softer placeholder color */
        }

        .search-input:focus {
          border-color: #ef5350; /* Red accent on focus */
          box-shadow: 0 0 8px rgba(239, 83, 80, 0.3); /* Subtle glow on focus */
        }

        /* Table Wrapper for styling the table container */
        .table-wrapper {
          overflow-x: auto;
          background: white;
          padding: 25px; /* More padding inside the card */
          border-radius: 12px; /* Nicer rounded corners */
          box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.08); /* Smoother, more spread-out shadow */
        }

        /* Main Table Styling */
        .user-table {
          width: 100%;
          border-collapse: separate; /* Allows border-radius on cells */
          border-spacing: 0; /* Removes default cell spacing */
          color: #444; /* Darker text for better contrast */
          font-size: 15px; /* Slightly larger font for table content */
        }

        /* Table Header Styling */
        .user-table thead {
          background-color: #fff0f0; /* Very light red/pink for header background */
        }

        .user-table th {
          padding: 15px 20px; /* More padding for header cells */
          text-align: left;
          font-weight: 600; /* Bolder header text */
          color: #666; /* Softer color for header text */
          border-bottom: 2px solid #fce4ec; /* Lighter border for separation */
          white-space: nowrap; /* Prevent wrapping for headers */
        }
        
        /* First and Last header cell specific styling */
        .user-table th:first-child { border-top-left-radius: 10px; }
        .user-table th:last-child { border-top-right-radius: 10px; }


        /* Table Data Cells */
        .user-table td {
          padding: 12px 20px; /* Consistent padding with headers */
          text-align: left;
          border-bottom: 1px solid #eee; /* Lighter row separator */
          vertical-align: middle; /* Align content nicely */
        }

        /* Hover effect for table rows */
        .user-table tbody tr:hover {
          background-color: #fdf6f6; /* Very subtle highlight on hover */
          transition: background-color 0.2s ease;
        }

        /* Style for the 'View Property' button */
        .view-btn {
          padding: 8px 16px; /* Increased padding */
          background-color: #ef5350; /* Solid red */
          color: white;
          border: none;
          border-radius: 20px; /* Pill-shaped button */
          cursor: pointer;
          font-size: 13px;
          font-weight: 500;
          transition: background-color 0.3s ease, transform 0.2s ease;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1); /* Subtle shadow for button */
        }

        .view-btn:hover {
          background-color: #d32f2f; /* Darker red on hover */
          transform: translateY(-1px); /* Slight lift effect */
          box-shadow: 0 4px 8px rgba(0,0,0,0.15); /* Enhanced shadow on hover */
        }

        /* Pagination container */
        .pagination {
          display: flex;
          justify-content: center;
          margin-top: 25px; /* More space above pagination */
          flex-wrap: wrap;
          gap: 10px; /* Increased gap between buttons */
        }

        /* Pagination buttons */
        .page-btn {
          padding: 8px 14px; /* More padding */
          background-color: #e0e0e0;
          border: 1px solid #ccc; /* Subtle border */
          border-radius: 6px; /* Softer corners */
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          color: #555;
          transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
        }

        .page-btn.active {
          background-color: #ef5350; /* Red for active page */
          color: white;
          border-color: #ef5350;
          box-shadow: 0 2px 6px rgba(239, 83, 80, 0.3); /* Glow for active page */
        }

        .page-btn:not(.active):hover {
          background-color: #d0d0d0; /* Darker grey on hover for inactive */
          border-color: #b0b0b0;
        }

        /* Media queries for responsiveness */
        @media (max-width: 992px) {
          .user-admin-container {
            margin-left: 0; /* Sidebar might be collapsed or hidden on smaller screens */
            width: 100%;
            padding: 15px;
          }
          .search-input {
            width: 80%;
          }
          .user-admin-header {
            font-size: 20px;
          }
          .user-table th, .user-table td {
            padding: 10px 15px;
            font-size: 13px;
          }
        }

        @media (max-width: 768px) {
          .user-admin-container {
            padding: 10px;
          }
          .user-admin-header {
            font-size: 18px;
            padding: 10px 0;
          }
          .search-wrapper {
            padding: 0 10px;
          }
          .search-input {
            width: 90%;
            font-size: 13px;
          }
          .table-wrapper {
            padding: 15px;
            border-radius: 8px;
          }
          .user-table {
            font-size: 12px;
          }
          .user-table th, .user-table td {
            padding: 8px 10px;
          }
          .view-btn {
            padding: 6px 10px;
            font-size: 11px;
          }
          .pagination {
            gap: 5px;
            margin-top: 15px;
          }
          .page-btn {
            padding: 5px 9px;
            font-size: 12px;
          }
        }
      `}</style>

      <Sidebar />
      <div className="user-admin-container">
        <h3 className="user-admin-header">Registered Users</h3>

        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
        </div>

        <div className="table-wrapper">
          <table className="user-table">
            <thead>
              <tr>
                <th>S No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile Number</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((item, index) => {
                const serialNumber = indexOfFirstRow + index + 1;
                const userId = item._id;
                return (
                  <tr key={index}>
                    <td>{serialNumber}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.mobile}</td>
                    <td>{formatLastModified(item.createdAt)}</td>
                    <td>
                      <Link to={`/Admin/viewproperty/${userId}`}>
                        <button className="view-btn">View Property</button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="pagination">
            {Array.from(
              { length: Math.ceil(filteredProjects.length / rowsPerPage) },
              (_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`page-btn ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                >
                  {index + 1}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserAdmin;