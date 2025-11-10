import React, { useEffect, useState } from "react";
import HrSidebar from "./HrSidebar";
import api from "../config/apiClient";
import { CheckCircle, Circle, Clock, Calendar, User, Mail, ChevronRight, ChevronLeft, FileText, X, Upload, Save, RotateCcw, Eye, Edit, File } from "lucide-react";

const stageLabels = [
  { key: "exitDiscussion", label: "Exit Discussion" },
  { key: "assetReturn", label: "Asset Return" },
  { key: "documentation", label: "Documentation" },
  { key: "finalSettlement", label: "Final Settlement" },
  { key: "success", label: "Completed" },
];

const StageProgress = ({ stages, currentIndex, status }) => {
  return (
    <div className="flex items-center space-x-1">
      {stages.map((s, idx) => {
        const done = status === "completed" || idx < currentIndex;
        const current = idx === currentIndex && status !== "completed";
        const isLast = idx === stages.length - 1;
        return (
          <div key={s} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${
                done ? "bg-green-500 text-white" : current ? "bg-blue-500 text-white animate-pulse" : "bg-gray-200 text-gray-400"
              }`}>
                {done ? <CheckCircle size={18} /> : current ? <Clock size={18} /> : <Circle size={18} />}
              </div>
              <div className={`mt-1 text-xs font-medium text-center ${
                done ? "text-green-700" : current ? "text-blue-700" : "text-gray-400"
              }`}>
                {stageLabels.find((x) => x.key === s)?.label || s}
              </div>
            </div>
            {!isLast && (
              <div className={`mx-3 h-0.5 w-16 transition-all duration-300 ${
                done ? "bg-green-500" : "bg-gray-200"
              }`}></div>
            )}
          </div>
        );
      })}
    </div>
  );
};

const Offboarding = () => {
  const [employees, setEmployees] = useState([]);
  const [offboardingList, setOffboardingList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [view, setView] = useState("employees");
  const [employeeOffboardingMap, setEmployeeOffboardingMap] = useState({});
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [showCompletedStepsModal, setShowCompletedStepsModal] = useState(false);
  const [showDocumentsModal, setShowDocumentsModal] = useState(false);
  const [showEditStepsModal, setShowEditStepsModal] = useState(false);
  const [showSetLastWorkingModal, setShowSetLastWorkingModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [showRecordDocumentModal, setShowRecordDocumentModal] = useState(false);
  const [editingLabels, setEditingLabels] = useState([...stageLabels]);
  const [editingStage, setEditingStage] = useState(null);
  const [newLabel, setNewLabel] = useState("");
  const [lastWorkingDate, setLastWorkingDate] = useState("");
  const [currentStage, setCurrentStage] = useState("");
  const [inviteType, setInviteType] = useState("online");
  const [meetingLink, setMeetingLink] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const [endsAt, setEndsAt] = useState("");
  const [location, setLocation] = useState("");
  const [inviteContent, setInviteContent] = useState("");
  const [feedback, setFeedback] = useState("");
  const [docType, setDocType] = useState("");
  const [docUrl, setDocUrl] = useState("");

  const fetchEmployees = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get(`/api/hr/employees`);
      setEmployees(res?.data?.data || []);
    } catch (e) {
      setError(e?.response?.data?.message || e.message || "Failed to load employees");
    } finally {
      setLoading(false);
    }
  };

  const fetchOffboardingList = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get(`/api/hr/offboarding`);
      const offboardingData = res?.data?.data || [];
      setOffboardingList(offboardingData);

      // Create mapping of employee IDs to their offboarding records
      const map = {};
      offboardingData.forEach(item => {
        map[item.employeeId] = item;
      });
      setEmployeeOffboardingMap(map);
    } catch (e) {
      setError(e?.response?.data?.message || e.message || "Failed to load offboarding list");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
    fetchOffboardingList();
  }, [view]);

  const startOffboarding = async (employeeId) => {
    try {
      await api.post(`/api/hr/offboarding/start`, { employeeId });
      setView("offboarding");
      fetchOffboardingList();
    } catch (e) {
      const errorMessage = e?.response?.data?.message || "";
      if (errorMessage.toLowerCase().includes("already started") || errorMessage.toLowerCase().includes("already exists")) {
        // Offboarding already exists, switch to offboarding view
        setView("offboarding");
        fetchOffboardingList();
      } else {
        alert(errorMessage || "Failed to start offboarding");
      }
    }
  };

  const advance = async (id) => {
    try {
      await api.post(`/api/hr/offboarding/${id}/advance`);
      fetchOffboardingList();
    } catch (e) {
      alert(e?.response?.data?.message || "Failed to advance");
    }
  };



  const completeOffboarding = async (id) => {
    try {
      await api.post(`/api/hr/offboarding/${id}/complete-offboarding`);
      alert('Offboarding completed and email sent');
      fetchOffboardingList();
    } catch (e) {
      alert(e?.response?.data?.message || 'Failed to complete offboarding');
    }
  };

  const filteredEmployees = employees.filter(emp => {
    // Assuming employees have a status or we can filter based on offboarding status
    return true; // For now, show all employees
  });

  const filteredOffboardingList = offboardingList.filter(item => {
    if (filterStatus === "all") return true;
    return item.status === filterStatus;
  });

  return (
    <div className="flex min-h-screen bg-gray-50">
      <HrSidebar />
      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Offboarding Management</h1>

          {/* Filters */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-gray-700">Filter by Status:</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Loading and Error States */}
          {loading && (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <span className="ml-2 text-gray-600">Loading offboarding list...</span>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
              <div className="flex">
                <X className="h-5 w-5 text-red-400" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Error</h3>
                  <div className="mt-2 text-sm text-red-700">{error}</div>
                </div>
              </div>
            </div>
          )}

          {/* Content based on view */}
          {!loading && !error && view === "employees" && (
            <div className="space-y-6">
              {filteredEmployees.length === 0 ? (
                <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
                  <User className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No employees found</h3>
                  <p className="mt-1 text-sm text-gray-500">There are no employees to offboard.</p>
                </div>
              ) : (
                filteredEmployees.map((emp) => (
                  <div key={emp.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <User className="h-8 w-8 text-gray-400" />
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{emp.name}</h3>
                            <p className="text-sm text-gray-500">{emp.email}</p>
                          </div>
                        </div>
                        {employeeOffboardingMap[emp.id] ? (
                          <button
                            onClick={() => {
                              setSelectedEmployeeId(emp.id);
                              setView("offboarding");
                            }}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            View Offboarding
                          </button>
                        ) : (
                          <button
                            onClick={() => startOffboarding(emp.id)}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          >
                            Start Offboarding
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {!loading && !error && view === "offboarding" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-6">
                <button
                  onClick={() => setView("employees")}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Back to Employees
                </button>
              </div>

              {filteredOffboardingList.length === 0 ? (
                <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
                  <FileText className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No offboarding records</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {filterStatus === "all" ? "There are no offboarding records yet." : `No ${filterStatus} offboarding records found.`}
                  </p>
                </div>
              ) : (
                selectedEmployeeId && employeeOffboardingMap[selectedEmployeeId] ? (
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <User className="h-8 w-8 text-gray-400" />
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{employeeOffboardingMap[selectedEmployeeId].employeeName}</h3>
                            <p className="text-sm text-gray-500">{employeeOffboardingMap[selectedEmployeeId].employeeEmail}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            employeeOffboardingMap[selectedEmployeeId].status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {employeeOffboardingMap[selectedEmployeeId].status}
                          </span>
                          {employeeOffboardingMap[selectedEmployeeId].lastWorkingDate && (
                            <div className="flex items-center text-sm text-gray-500">
                              <Calendar className="h-4 w-4 mr-1" />
                              Last Working: {new Date(employeeOffboardingMap[selectedEmployeeId].lastWorkingDate).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Stage Progress */}
                      <div className="mb-6">
                        <StageProgress stages={employeeOffboardingMap[selectedEmployeeId].stages || []} currentIndex={employeeOffboardingMap[selectedEmployeeId].currentStageIndex || 0} status={employeeOffboardingMap[selectedEmployeeId].status} />
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-2">
                        {!employeeOffboardingMap[selectedEmployeeId].lastWorkingDate && (
                          <button
                            onClick={() => setShowSetLastWorkingModal(true)}
                            className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            <Calendar className="h-4 w-4 mr-1" />
                            Set Last Working Date
                          </button>
                        )}

                        {employeeOffboardingMap[selectedEmployeeId].stages && employeeOffboardingMap[selectedEmployeeId].stages.map((stage, index) => (
                          <div key={stage} className="flex space-x-1">
                            <button
                              onClick={() => {
                                setCurrentStage(stage);
                                setShowInviteModal(true);
                              }}
                              className="inline-flex items-center px-2 py-1 border border-gray-300 text-xs leading-4 font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                              <Mail className="h-3 w-3 mr-1" />
                              Invite {stageLabels.find((x) => x.key === stage)?.label || stage}
                            </button>
                            <button
                              onClick={() => {
                                setCurrentStage(stage);
                                setShowCompleteModal(true);
                              }}
                              className="inline-flex items-center px-2 py-1 border border-green-300 text-xs leading-4 font-medium rounded text-green-700 bg-green-50 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Complete {stageLabels.find((x) => x.key === stage)?.label || stage}
                            </button>
                          </div>
                        ))}

                        <button
                          onClick={() => setShowRecordDocumentModal(true)}
                          className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <Upload className="h-4 w-4 mr-1" />
                          Record Document
                        </button>

                        {employeeOffboardingMap[selectedEmployeeId].status === 'completed' && (
                          <button
                            onClick={() => setShowCompletedStepsModal(true)}
                            className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View Completed Steps
                          </button>
                        )}

                        <button
                          onClick={() => setShowEditStepsModal(true)}
                          className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Edit Steps
                        </button>

                        <button
                          onClick={() => setShowDocumentsModal(true)}
                          className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <File className="h-4 w-4 mr-1" />
                          View Documents
                        </button>

                        {employeeOffboardingMap[selectedEmployeeId] && employeeOffboardingMap[selectedEmployeeId].status === 'pending' && (
                          <button
                            onClick={() => {
                              const offboarding = employeeOffboardingMap[selectedEmployeeId];
                              if (offboarding && offboarding._id) advance(offboarding._id);
                            }}
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                          >
                            <RotateCcw className="h-4 w-4 mr-1" />
                            Resume Offboarding
                          </button>
                        )}

                        {employeeOffboardingMap[selectedEmployeeId].currentStageIndex >= employeeOffboardingMap[selectedEmployeeId].stages.length - 2 && employeeOffboardingMap[selectedEmployeeId].status !== 'completed' && (
                          <button
                            onClick={() => completeOffboarding(employeeOffboardingMap[selectedEmployeeId]._id)}
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          >
                            <Save className="h-4 w-4 mr-1" />
                            Complete Offboarding
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
                    <FileText className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No offboarding record selected</h3>
                    <p className="mt-1 text-sm text-gray-500">Please select an employee to view their offboarding details.</p>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>

      {/* Completed Steps Modal */}
      {showCompletedStepsModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Completed Steps</h3>
                <button
                  onClick={() => setShowCompletedStepsModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="mt-4">
                <ul className="space-y-2">
                  {employeeOffboardingMap[selectedEmployeeId]?.stages?.map((stage, index) => (
                    <li key={stage} className="flex items-center space-x-2">
                      <CheckCircle className="text-green-500" size={16} />
                      <span>{stageLabels.find((x) => x.key === stage)?.label || stage}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Steps Modal */}
      {showEditStepsModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Edit Steps</h3>
                <button
                  onClick={() => setShowEditStepsModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="mt-4 space-y-2">
                {editingLabels.map((label, index) => (
                  <div key={label.key} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={label.label}
                      onChange={(e) => {
                        const newLabels = [...editingLabels];
                        newLabels[index].label = e.target.value;
                        setEditingLabels(newLabels);
                      }}
                      className="flex-1 border border-gray-300 rounded px-2 py-1"
                    />
                    <button
                      onClick={() => {
                        setEditingStage(label.key);
                        setNewLabel(label.label);
                      }}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <Edit size={16} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={() => setShowEditStepsModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Save changes (you might need to implement backend logic for this)
                    alert('Steps updated (backend integration needed)');
                    setShowEditStepsModal(false);
                  }}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Documents Modal */}
      {showDocumentsModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Documents</h3>
                <button
                  onClick={() => setShowDocumentsModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="mt-4">
                <ul className="space-y-2">
                  {employeeOffboardingMap[selectedEmployeeId]?.documents?.map((doc, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <FileText className="text-blue-500" size={16} />
                      <span>{doc.docType}: <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">View</a></span>
                    </li>
                  ))}
                  {(!employeeOffboardingMap[selectedEmployeeId]?.documents || employeeOffboardingMap[selectedEmployeeId].documents.length === 0) && (
                    <li className="text-gray-500">No documents uploaded yet.</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Set Last Working Date Modal */}
      {showSetLastWorkingModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Set Last Working Date</h3>
                <button
                  onClick={() => setShowSetLastWorkingModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="mt-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Working Date (YYYY-MM-DD)</label>
                  <input
                    type="date"
                    value={lastWorkingDate}
                    onChange={(e) => setLastWorkingDate(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setShowSetLastWorkingModal(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={async () => {
                      if (!lastWorkingDate) {
                        alert("Please select a date");
                        return;
                      }
                      try {
                        await api.post(`/api/hr/offboarding/${employeeOffboardingMap[selectedEmployeeId]._id}/last-working`, { lastWorkingDate });
                        setShowSetLastWorkingModal(false);
                        setLastWorkingDate("");
                        fetchOffboardingList();
                      } catch (e) {
                        alert(e?.response?.data?.message || "Failed to set last working date");
                      }
                    }}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Invite for {stageLabels.find((x) => x.key === currentStage)?.label || currentStage}</h3>
                <button
                  onClick={() => setShowInviteModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Invite Type</label>
                  <select
                    value={inviteType}
                    onChange={(e) => setInviteType(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="online">Online</option>
                    <option value="offline">Offline</option>
                  </select>
                </div>
                {inviteType === 'online' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Meeting Link</label>
                      <input
                        type="url"
                        value={meetingLink}
                        onChange={(e) => setMeetingLink(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="https://..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Start DateTime</label>
                      <input
                        type="datetime-local"
                        value={scheduledAt}
                        onChange={(e) => setScheduledAt(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">End DateTime</label>
                      <input
                        type="datetime-local"
                        value={endsAt}
                        onChange={(e) => setEndsAt(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </>
                )}
                {inviteType === 'offline' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Meeting location"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Schedule DateTime</label>
                      <input
                        type="datetime-local"
                        value={scheduledAt}
                        onChange={(e) => setScheduledAt(e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message to Employee (optional)</label>
                  <textarea
                    value={inviteContent}
                    onChange={(e) => setInviteContent(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="Additional message..."
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={() => setShowInviteModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={async () => {
                    if (!inviteType) {
                      alert("Please select invite type");
                      return;
                    }
                    let payload = { stage: currentStage, type: inviteType };
                    if (inviteType === 'online') {
                      payload.meetingLink = meetingLink || undefined;
                      payload.scheduledAt = scheduledAt ? new Date(scheduledAt) : undefined;
                      payload.endsAt = endsAt ? new Date(endsAt) : undefined;
                    } else {
                      payload.location = location || undefined;
                      payload.scheduledAt = scheduledAt ? new Date(scheduledAt) : undefined;
                    }
                    payload.content = inviteContent || undefined;
                    try {
                      await api.post(`/api/hr/offboarding/${employeeOffboardingMap[selectedEmployeeId]._id}/invite`, payload);
                      alert('Invite sent');
                      setShowInviteModal(false);
                      setInviteType("online");
                      setMeetingLink("");
                      setScheduledAt("");
                      setEndsAt("");
                      setLocation("");
                      setInviteContent("");
                      fetchOffboardingList();
                    } catch (e) {
                      alert(e?.response?.data?.message || 'Failed to send invite');
                    }
                  }}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Send Invite
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Complete Modal */}
      {showCompleteModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Complete {stageLabels.find((x) => x.key === currentStage)?.label || currentStage}</h3>
                <button
                  onClick={() => setShowCompleteModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Feedback/Notes</label>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    placeholder="Enter feedback or notes..."
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={() => setShowCompleteModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={async () => {
                    try {
                      await api.post(`/api/hr/offboarding/${employeeOffboardingMap[selectedEmployeeId]._id}/complete-stage`, { stage: currentStage, feedback });
                      setShowCompleteModal(false);
                      setFeedback("");
                      fetchOffboardingList();
                    } catch (e) {
                      alert(e?.response?.data?.message || 'Failed to complete stage');
                    }
                  }}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Complete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Record Document Modal */}
      {showRecordDocumentModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Record Document</h3>
                <button
                  onClick={() => setShowRecordDocumentModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Document Type</label>
                  <select
                    value={docType}
                    onChange={(e) => setDocType(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select type</option>
                    <option value="resignation">Resignation</option>
                    <option value="handover">Handover</option>
                    <option value="clearance">Clearance</option>
                    <option value="experience">Experience</option>
                    <option value="noc">NOC</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Document URL</label>
                  <input
                    type="url"
                    value={docUrl}
                    onChange={(e) => setDocUrl(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://..."
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={() => setShowRecordDocumentModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={async () => {
                    if (!docType || !docUrl) {
                      alert("Please fill in all fields");
                      return;
                    }
                    try {
                      await api.post(`/api/hr/offboarding/${employeeOffboardingMap[selectedEmployeeId]._id}/record-document`, { docType, url: docUrl });
                      alert('Document recorded');
                      setShowRecordDocumentModal(false);
                      setDocType("");
                      setDocUrl("");
                      fetchOffboardingList();
                    } catch (e) {
                      alert(e?.response?.data?.message || 'Failed to record document');
                    }
                  }}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Record
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Offboarding;
