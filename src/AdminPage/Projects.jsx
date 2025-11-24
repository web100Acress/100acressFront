import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { getApiBase } from '../config/apiBase';

import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import { message } from "antd"; 

const Projects = () => {
  const [viewAll, setViewAll] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(100);
  const [searchTerm, setSearchTerm] = useState("");

  // Additional filters
  const [filterType, setFilterType] = useState("");
  const [filterCity, setFilterCity] = useState("");
  const [filterAddress, setFilterAddress] = useState("");
  const [filterBuilder, setFilterBuilder] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterState, setFilterState] = useState("");
  const [filterHasMobile, setFilterHasMobile] = useState("");
  const [filterHasPayment, setFilterHasPayment] = useState("");
  const [filterProjectOverview, setFilterProjectOverview] = useState("");
  const [filterYoutubeVideo, setFilterYoutubeVideo] = useState("");
  const [filterBrochure, setFilterBrochure] = useState("");

  const [refreshTrigger, setRefreshTrigger] = useState(0);

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

  // Listen for project update messages from other components
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data && event.data.type === 'PROJECT_UPDATED') {
        // Refresh the data when a project is updated
        setRefreshTrigger(prev => prev + 1);
        messageApi.open({
          type: "success",
          content: "Project updated successfully. Data refreshed.",
          duration: 2,
        });
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [messageApi]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const base = getApiBase();
        const tokenRaw = localStorage.getItem("myToken") || "";
        const token = tokenRaw.replace(/^"|"$/g, "").replace(/^Bearer\s+/i, "");
        const res = await axios.get(
          `${base}/project/viewAll/data?sort=-createdAt`,
          {
            headers: {
              "Content-Type": "application/json",
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            }
          }
        );
        const payload = res.data;
        const rows = Array.isArray(payload?.data) ? payload.data : (Array.isArray(payload) ? payload : []);
        // Sort by creation date in descending order (newest first)
        const sortedRows = [...rows].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setViewAll(sortedRows);
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
  }, [refreshTrigger]);

  const handleDeleteUser = async (id) => {
    try {
      const base = getApiBase();
      const raw = localStorage.getItem("myToken") || "";
      const myToken = raw.replace(/^"|"$/g, "").replace(/^Bearer\s+/i, "");
      const response = await axios.delete(
        `${base}/project/Delete/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            ...(myToken ? { Authorization: `Bearer ${myToken}` } : {}),
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
        setViewAll(prevViewAll => (Array.isArray(prevViewAll) ? prevViewAll.filter(item => item._id !== id) : []));
        // Refresh data to ensure consistency
        setRefreshTrigger(prev => prev + 1);
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

  const handleRefreshData = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // Unique options for filters
  const typeOptions = useMemo(() => {
    if (!viewAll || viewAll.length === 0) {
      return ['Industrial Plots', 'Farm Houses'];
    }

    const uniqueTypes = Array.from(new Set((viewAll || []).map(v => v?.type).filter(Boolean)));

    // Add common project types if not already present (removed Industrial Projects)
    if (!uniqueTypes.includes('Industrial Plots')) {
      uniqueTypes.push('Industrial Plots');
    }
    if (!uniqueTypes.includes('Farm Houses')) {
      uniqueTypes.push('Farm Houses');
    }
    if (!uniqueTypes.includes('Residential Plots')) {
      uniqueTypes.push('Residential Plots');
    }

    // Sort the final list alphabetically
    return uniqueTypes.sort();
  }, [viewAll]);
  const cityOptions = useMemo(
    () => Array.from(new Set((viewAll || []).map(v => v?.city).filter(Boolean))).sort(),
    [viewAll]
  );
  const builderOptions = useMemo(
    () => Array.from(new Set((viewAll || []).map(v => v?.builderName).filter(Boolean))).sort(),
    [viewAll]
  );
  const statusOptions = useMemo(
    () => Array.from(new Set((viewAll || []).map(v => v?.project_Status).filter(Boolean))).sort(),
    [viewAll]
  );
  const stateOptions = useMemo(
    () => Array.from(new Set((viewAll || []).map(v => v?.state).filter(Boolean))).sort(),
    [viewAll]
  );

  // Helper function to check if project is high value
  const isHighValueProject = (minPrice) => {
    if (!minPrice) return false;

    let priceValue;
    if (typeof minPrice === 'string') {
      // Remove commas and convert to number
      priceValue = parseInt(minPrice.replace(/,/g, ''));
    } else if (typeof minPrice === 'number') {
      priceValue = minPrice;
    } else {
      return false;
    }

    return !isNaN(priceValue) && priceValue > 5000000;
  };

  // Project overview options based on project status and other criteria
  const projectOverviewOptions = useMemo(() => {
    if (!viewAll || viewAll.length === 0) {
      return [];
    }

    const overviewCounts = { trending: 0, featured: 0, none: 0 };

    viewAll.forEach(project => {
      try {
        // Check if project has trending or featured field in the database
        const isTrendingInDB = project.projectOverview === "trending";
        const isFeaturedInDB = project.projectOverview === "featured";

        if (isTrendingInDB) {
          overviewCounts.trending++;
          console.log(`✅ Project ${project.projectName} is marked as trending in DB`);
        }
        // Define featured projects (ONLY database field - no fallback criteria)
        else if (isFeaturedInDB) {
          overviewCounts.featured++;
          console.log(`✅ Project ${project.projectName} is marked as featured in DB`);
        } else {
          overviewCounts.none++;
        }
      } catch (error) {
        console.error(`Error processing project ${project.projectName}:`, error);
        overviewCounts.none++;
      }
    });

    return [
      { value: 'trending', label: `Trending (${overviewCounts.trending})` },
      { value: 'featured', label: `Featured (${overviewCounts.featured})` },
      { value: 'none', label: `none (${overviewCounts.none})` }
    ];
  }, [viewAll, isHighValueProject]);

  // YouTube video options with counts
  const youtubeVideoOptions = useMemo(() => {
    if (!viewAll || viewAll.length === 0) {
      return [];
    }

    let withYoutube = 0;
    let withoutYoutube = 0;

    viewAll.forEach(project => {
      const hasYoutubeVideo = Boolean((project?.youtubeVideoUrl ?? "").toString().trim());
      if (hasYoutubeVideo) {
        withYoutube++;
      } else {
        withoutYoutube++;
      }
    });

    return [
      { value: 'with', label: `With (${withYoutube})` },
      { value: 'without', label: `Without (${withoutYoutube})` }
    ];
  }, [viewAll]);

  // Brochure options with counts
  const brochureOptions = useMemo(() => {
    if (!viewAll || viewAll.length === 0) {
      return [];
    }

    let withBrochure = 0;
    let withoutBrochure = 0;
    let pdfBrochure = 0;
    let imageBrochure = 0;

    viewAll.forEach(project => {
      const hasBrochure = Boolean((project?.project_Brochure?.url ?? "").toString().trim());
      if (hasBrochure) {
        withBrochure++;
        const url = (project?.project_Brochure?.url ?? "").toString().toLowerCase();
        if (url.includes('.pdf')) {
          pdfBrochure++;
        } else {
          imageBrochure++;
        }
      } else {
        withoutBrochure++;
      }
    });

    return [
      { value: 'with', label: `Has Brochure (${withBrochure})` },
      { value: 'without', label: `No Brochure (${withoutBrochure})` },
      { value: 'pdf', label: `PDF Brochure (${pdfBrochure})` },
      { value: 'image', label: `Image Brochure (${imageBrochure})` }
    ];
  }, [viewAll]);

  // Apply combined filters
  const filteredProjects = viewAll.filter((item) => {
    const searchTermLower = (searchTerm || "").toLowerCase();

    // Enhanced search: search in multiple fields
    const name = (item?.projectName || "").toLowerCase();
    const type = (item?.type || "").toLowerCase();
    const city = (item?.city || "").toLowerCase();
    const builder = (item?.builderName || "").toLowerCase();
    const address = (item?.projectAddress || "").toLowerCase();
    const status = (item?.project_Status || "").toLowerCase();

    // Check if search term matches any of these fields
    const matchesSearch = !searchTerm ||
      name.includes(searchTermLower) ||
      type.includes(searchTermLower) ||
      city.includes(searchTermLower) ||
      builder.includes(searchTermLower) ||
      address.includes(searchTermLower) ||
      status.includes(searchTermLower);

    const matchesType = !filterType || item?.type === filterType;
    const matchesCity = !filterCity || item?.city === filterCity;
    const matchesAddress = !filterAddress || address.includes(filterAddress.toLowerCase());
    const matchesBuilder = !filterBuilder || item?.builderName === filterBuilder;
    const statusVal = (item?.project_Status ?? '').toString().trim();
    const matchesStatus = !filterStatus
      ? true
      : (filterStatus === '__missing__'
          ? statusVal.length === 0
          : item?.project_Status === filterStatus);
    const matchesState = !filterState || item?.state === filterState;
    const hasMobile = Boolean((item?.mobileNumber ?? "").toString().trim());
    const matchesMobile = !filterHasMobile || (filterHasMobile === "with" ? hasMobile : !hasMobile);
    const hasPayment = Boolean((item?.paymentPlan ?? "").toString().trim());
    const matchesPayment = !filterHasPayment || (filterHasPayment === "with" ? hasPayment : !hasPayment);

    // Project overview filtering logic
    let matchesOverview = true;
    if (filterProjectOverview) {
      try {
        // Check if project has trending or featured field in the database
        const isTrendingInDB = item.projectOverview === "trending";
        const isFeaturedInDB = item.projectOverview === "featured";

        if (filterProjectOverview === 'trending') {
          matchesOverview = isTrendingInDB;
        } else if (filterProjectOverview === 'featured') {
          matchesOverview = isFeaturedInDB;
        } else if (filterProjectOverview === 'none') {
          matchesOverview = !isTrendingInDB && !isFeaturedInDB;
        }
      } catch (error) {
        console.error(`Error filtering project ${item.projectName}:`, error);
        matchesOverview = filterProjectOverview === 'none';
      }
    }

    // YouTube video filtering logic
    const hasYoutubeVideo = Boolean((item?.youtubeVideoUrl ?? "").toString().trim());
    const matchesYoutubeVideo = !filterYoutubeVideo || (filterYoutubeVideo === "with" ? hasYoutubeVideo : !hasYoutubeVideo);

    // Brochure filtering logic
    let matchesBrochure = true;
    if (filterBrochure) {
      const hasBrochure = Boolean((item?.project_Brochure?.url ?? "").toString().trim());
      if (filterBrochure === 'with') {
        matchesBrochure = hasBrochure;
      } else if (filterBrochure === 'without') {
        matchesBrochure = !hasBrochure;
      } else if (filterBrochure === 'pdf') {
        matchesBrochure = hasBrochure && (item?.project_Brochure?.url ?? "").toString().toLowerCase().includes('.pdf');
      } else if (filterBrochure === 'image') {
        matchesBrochure = hasBrochure && !(item?.project_Brochure?.url ?? "").toString().toLowerCase().includes('.pdf');
      }
    }

    return matchesSearch && matchesType && matchesCity && matchesAddress && matchesBuilder && matchesStatus && matchesState && matchesMobile && matchesPayment && matchesOverview && matchesYoutubeVideo && matchesBrochure;
  });
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredProjects.slice(indexOfFirstRow, indexOfLastRow);

  // Export filtered data to CSV
  const handleExportCSV = () => {
    try {
      const columns = [
        { key: 'projectName', label: 'Name' },
        { key: 'type', label: 'Type' },
        { key: 'city', label: 'City' },
        { key: 'state', label: 'State' },
        { key: 'project_Status', label: 'Status' },
        { key: 'builderName', label: 'Builder' },
        { key: 'projectAddress', label: 'Address' },
        { key: 'mobileNumber', label: 'Mobile' },
        { key: 'project_url', label: 'Slug' },
      ];

      const csvEscape = (val) => {
        const s = (val ?? '').toString();
        // Replace quotes with doubled quotes and wrap the value in quotes
        const escaped = '"' + s.replace(/"/g, '""') + '"';
        return escaped;
      };

      const header = columns.map(c => csvEscape(c.label)).join(',');
      const lines = filteredProjects.map(item =>
        columns.map(c => csvEscape(item?.[c.key])).join(',')
      );
      const csvContent = ['\ufeff' + header, ...lines].join('\n'); // BOM for Excel

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const date = new Date().toISOString().slice(0,10);
      a.download = `projects_${date}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      messageApi.open({ type: 'success', content: `Exported ${filteredProjects.length} rows.`, duration: 2 });
    } catch (err) {
      console.error('CSV export failed', err);
      messageApi.open({ type: 'error', content: 'Failed to export CSV', duration: 2 });
    }
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setFilterType("");
    setFilterCity("");
    setFilterAddress("");
    setFilterBuilder("");
    setFilterStatus("");
    setFilterState("");
    setFilterHasMobile("");
    setFilterHasPayment("");
    setFilterProjectOverview("");
    setFilterYoutubeVideo("");
    setFilterBrochure("");
    setCurrentPage(1);
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
              placeholder="Search projects, types, cities, builders..."
              className="search-input"
              value={searchTerm}
              onChange={handleSearch}
            />
            <button className="search-button">
              Search
            </button>
          </div>
          {/* Filters moved next to search bar */}
          <div className="filters-container">
           
            <select
              className="filter-select"
              value={filterType}
              onChange={(e) => { setFilterType(e.target.value); setCurrentPage(1); }}
            >
              <option value="">All Types</option>
              {typeOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <select
              className="filter-select"
              value={filterCity}
              onChange={(e) => { setFilterCity(e.target.value); setCurrentPage(1); }}
            >
              <option value="">All Cities</option>
              {cityOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <select
              className="filter-select"
              value={filterBuilder}
              onChange={(e) => { setFilterBuilder(e.target.value); setCurrentPage(1); }}
            >
              <option value="">All Builders</option>
              {builderOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <select
              className="filter-select"
              value={filterStatus}
              onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(1); }}
            >
              <option value="">All Statuses</option>
              <option value="__missing__">No status</option>
              {statusOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <select
              className="filter-select"
              value={filterState}
              onChange={(e) => { setFilterState(e.target.value); setCurrentPage(1); }}
            >
              <option value="">All States</option>
              {stateOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
              {/* <select
                className="filter-select"
                value={filterHasMobile}
                onChange={(e) => { setFilterHasMobile(e.target.value); setCurrentPage(1); }}
              >
                <option value="">Mobile: All</option>
                <option value="with">Mobile: With</option>
                <option value="without">Mobile: Without</option>
              </select> */}
            <select
              className="filter-select"
              value={filterHasPayment}
              onChange={(e) => { setFilterHasPayment(e.target.value); setCurrentPage(1); }}
            >
              <option value="">Payment: All</option>
              <option value="with">Payment: With</option>
              <option value="without">Payment: Without</option>
            </select>

            <select
              className="filter-select"
              value={filterProjectOverview}
              onChange={(e) => { setFilterProjectOverview(e.target.value); setCurrentPage(1); }}
            >
              <option value="">Project Overview</option>
              {projectOverviewOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>

            <select
              className="filter-select"
              value={filterYoutubeVideo}
              onChange={(e) => { setFilterYoutubeVideo(e.target.value); setCurrentPage(1); }}
            >
              <option value="">YouTube Video: All</option>
              {youtubeVideoOptions.map(opt => (
                <option key={opt.value} value={opt.value}>YouTube Video: {opt.label}</option>
              ))}
            </select>

            <select
              className="filter-select"
              value={filterBrochure}
              onChange={(e) => { setFilterBrochure(e.target.value); setCurrentPage(1); }}
            >
              <option value="">Brochure: All</option>
              {brochureOptions.map(opt => (
                <option key={opt.value} value={opt.value}>Brochure: {opt.label}</option>
              ))}
            </select>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <Link to={"/admin/project-insert"}>
              <button
                className="add-new-project-button"
              >
                Add New Project ➕
              </button>
            </Link>
          </div>
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

                        {/* <button
                          onClick={() => handleDeleteUser(id)}
                          type="button"
                          className="action-button delete-button"
                        >
                          Delete
                        </button> */}
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
            <button
              onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
              className="pagination-button"
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {Array.from(
              { length: Math.min(3, Math.ceil(filteredProjects.length / rowsPerPage)) },
              (_, index) => {
                // Show current page and 1 page before/after
                const pageNumber = Math.min(
                  Math.max(1, currentPage - 1) + index,
                  Math.ceil(filteredProjects.length / rowsPerPage)
                );
                if (pageNumber > Math.ceil(filteredProjects.length / rowsPerPage)) return null;
                return (
                  <button
                    key={index}
                    onClick={() => paginate(pageNumber)}
                    className={`pagination-button ${
                      currentPage === pageNumber ? "pagination-active" : ""
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              }
            )}
            <button
              onClick={() => paginate(currentPage < Math.ceil(filteredProjects.length / rowsPerPage) ? currentPage + 1 : currentPage)}
              className="pagination-button"
              disabled={currentPage === Math.ceil(filteredProjects.length / rowsPerPage)}
            >
              Next
            </button>
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
  flex-wrap: nowrap; /* keep in one row on larger screens */
  gap: 0.5rem; /* tighter gap so items fit in one row */
}

.search-container {
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border-radius: 14px; /* Even softer rounded corners */
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.1); /* Deeper, more elegant shadow */
  overflow: hidden;
  max-width: 360px; /* even narrower to make room for filters */
  flex: 0 1 320px; /* allow shrinking if needed */
  min-width: 280px; /* avoid too small on medium screens */
  border: 1px solid #d8e2ed; /* Subtle border for definition */
}

.search-input {
  padding: 10px 16px; /* compact padding */
  border: none;
  border-bottom: 3px solid #f44336; /* Prominent red accent */
  color: #333d4e;
  outline: none;
  flex-grow: 1;
  font-size: 0.98rem; /* slightly smaller text */
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
  padding: 10px 18px; /* compact padding */
  border: none;
  border-radius: 0 14px 14px 0;
  cursor: pointer;
  font-size: 0.98rem;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(244, 67, 54, 0.4); /* Matching shadow for button */
}

.search-button:hover {
  background: linear-gradient(45deg, #e53935 0%, #d32f2f 100%); /* Darker gradient on hover */
  transform: translateY(-2px); /* More pronounced lift */
  box-shadow: 0 6px 20px rgba(244, 67, 54, 0.5);
}

.filters-container {
  display: flex;
  align-items: center;
  gap: 6px;
  background-color: transparent; /* merge visually with header */
  border: none;
  border-radius: 12px;
  padding: 4px 2px;
  box-shadow: none;
  flex: 1 1 0; /* take remaining space */
  flex-wrap: wrap; /* allow multiple rows */
  overflow-x: visible; /* no horizontal scroll when wrapping */
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none; /* Firefox */
}

.filters-container::-webkit-scrollbar { display: none; }

.filters-break {
  flex-basis: 100%; /* force next items to start on a new line */
  height: 0; /* no extra height */
}

.filters-container .filter-input,
.filters-container .filter-select {
  min-width: 90px;
  width: 112px; /* slightly larger for better readability */
  flex: 0 0 auto; /* prevent shrinking too small */
  padding: 8px 10px; /* comfortable */
  font-size: 0.9rem;
}

.filters-container .reset-filters-button {
  white-space: nowrap;
}

/* Responsive: wrap on smaller screens */
@media (max-width: 1100px) {
  .projects-header {
    flex-wrap: wrap;
  }
  .filters-container {
    flex-wrap: wrap;
    overflow-x: visible;
    gap: 10px;
  }
  .filters-container .filter-input,
  .filters-container .filter-select {
    width: 100%;
    max-width: 240px;
  }
}

/* Wider screens can afford larger controls */
@media (min-width: 1400px) {
  .filters-container .filter-input,
  .filters-container .filter-select {
    width: 150px;
  }
  .projects-header {
    gap: 1rem;
  }
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
  flex: 0 0 auto; /* keep natural size, don't stretch */
}

.add-new-project-button:hover {
  background: linear-gradient(45deg, #43a047 0%, #388e3c 100%); /* Darker green gradient on hover */
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(76, 175, 80, 0.5);
}

.refresh-button {
  background: linear-gradient(45deg, #2196f3 0%, #1976d2 100%);
  color: #ffffff;
  padding: 10px 16px;
  border-radius: 12px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(33, 150, 243, 0.35);
}

.refresh-button:hover {
  background: linear-gradient(45deg, #1976d2 0%, #1565c0 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(33, 150, 243, 0.45);
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
  font-size: 0.85rem; /* Smaller text */
}

.table-header {
  padding: 10px 12px; /* Reduced padding */
  text-align: center;
  font-size: 0.8rem; /* Smaller header font */
  font-weight: 700;
  color: #5c677d; /* Muted, professional header text color */
  text-transform: uppercase;
  letter-spacing: 0.05em; /* Reduced letter spacing */
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

.filter-row {
  background-color: #fafbff;
}

.filter-cell {
  padding: 12px 16px;
  background-color: #ffffff;
  border-bottom: 2px solid #e8eaf1;
}

.filter-input,
.filter-select {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d8e2ed;
  border-radius: 10px;
  outline: none;
  font-size: 0.95rem;
  color: #333d4e;
  background-color: #ffffff;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.filter-input:focus,
.filter-select:focus {
  border-color: #b0c4de;
  box-shadow: 0 0 0 3px rgba(176, 196, 222, 0.25);
}

.reset-filters-button {
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid #e0e6ed;
  background: linear-gradient(45deg, #eeeeee 0%, #e2e8f0 100%);
  color: #333d4e;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.reset-filters-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
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
  padding: 8px 12px; /* Reduced padding for compact rows */
  text-align: center;
  font-size: 0.85rem; /* Smaller font */
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
  gap: 6px; /* Reduced space between buttons */
  flex-wrap: wrap;
  padding: 6px 8px; /* Reduced padding for button cell */
}

.action-button {
  padding: 6px 10px; /* Smaller padding for individual buttons */
  border-radius: 6px; /* Smaller rounded corners */
  border: none;
  font-weight: 500;
  font-size: 0.75rem; /* Smaller button font */
  cursor: pointer;
  transition: all 0.25s ease;
  white-space: nowrap;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1); /* Smaller shadow */
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