import React, { useEffect, useState } from "react";
import HrSidebar from "./HrSidebar";
import api from "../config/apiClient";
import { CheckCircle, Circle, Clock, Calendar, User, Mail, ChevronRight, FileText, X } from "lucide-react";

const stageLabels = [
  { key: "exitInterview", label: "Exit Interview" },
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
  const [view, setView] = useState("employees"); // "employees" or "offboarding"

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
      setOffboardingList(res?.data?.data || []);
    } catch (e) {
      setError(e?.response?.data?.message || e.message || "Failed to load offboarding list");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (view === "employees") {
      fetchEmployees();
    } else {
      fetchOffboardingList();
    }
  }, [view]);

  const startOffboarding = async (employeeId) => {
    try {
      await api.post(`/api/hr/offboarding/start`, { employeeId });
      setView("offboarding");
      fetchOffboardingList();
    } catch (e) {
      alert(e?.response?.data?.message || "Failed to start offboarding");
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

  const setLastWorking = async (id) => {
    const val = prompt("Enter last working date (YYYY-MM-DD)");
    if (!val) return;
    try {
      await api.post(`/api/hr/offboarding/${id}/last-working`, { lastWorkingDate: val });
      fetchOffboardingList();
    } catch (e) {
      alert(e?.response?.data?.message || "Failed to set last working date");
    }
  };

  const inviteStage = async (id, stage) => {
    try {
      const type = prompt("Invite type: online/offline", "online");
      if (!type) return;
      let payload = { stage, type };
      if (type === 'online') {
        const meetingLink = prompt("Enter meeting link (URL)", "");
        const scheduledAt = prompt("Start datetime (YYYY-MM-DD HH:mm)", "");
        const endsAt = prompt("End datetime (YYYY-MM-DD HH:mm)", "");
        payload.meetingLink = meetingLink || undefined;
        payload.scheduledAt = scheduledAt ? new Date(scheduledAt) : undefined;
        payload.endsAt = endsAt ? new Date(endsAt) : undefined;
      } else {
        const location = prompt("Enter location", "");
        const scheduledAt = prompt("Schedule datetime (YYYY-MM-DD HH:mm)", "");
        payload.location = location || undefined;
        payload.scheduledAt = scheduledAt ? new Date(scheduledAt) : undefined;
      }
      const content = prompt("Message to employee (optional)", "");
      payload.content = content || undefined;
      await api.post(`/api/hr/offboarding/${id}/invite`, payload);
      alert('Invite sent');
      fetchOffboardingList();
    } catch (e) {
      alert(e?.response?.data?.message || 'Failed to send invite');
    }
  };

  const completeStage = async (id, stage) => {
    try {
      const feedback = prompt("Enter feedback/notes", "");
      await api.post(`/api/hr/offboarding/${id}/complete-stage`, { stage, feedback });
      fetchOffboardingList();
    } catch (e) {
      alert(e?.response?.data?.message || 'Failed to complete stage');
    }
  };

  const recordDocument = async (id) => {
    try {
      const docType = prompt("Document type (e.g., resignation, handover, clearance)", "");
      if (!docType) return;
      const url = prompt("Document URL", "");
      if (!url) return;
      await api.post(`/api/hr/offboarding/${id}/record-document`, { docType, url });
      alert('Document recorded');
      fetchOffboardingList();
    } catch (e) {
      alert(e?.response?.data?.message || 'Failed to record document');
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
                        <button
                          onClick={() => startOffboarding(emp.id)}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          Start Offboarding
                        </button>
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
                filteredOffboardingList.map((item) => (
                  <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <User className="h-8 w-8 text-gray-400" />
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{item.employeeName}</h3>
                            <p className="text-sm text-gray-500">{item.employeeEmail}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            item.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {item.status}
                          </span>
                          {item.lastWorkingDate && (
                            <div className="flex items-center text-sm text-gray-500">
                              <Calendar className="h-4 w-4 mr-1" />
                              Last Working: {new Date(item.lastWorkingDate).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Stage Progress */}
                      <div className="mb-6">
                        <StageProgress stages={item.stages || []} currentIndex={item.currentStageIndex || 0} status={item.status} />
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => advance(item.id)}
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <ChevronRight className="h-4 w-4 mr-1" />
                          Advance Stage
                        </button>

                        {!item.lastWorkingDate && (
                          <button
                            onClick={() => setLastWorking(item.id)}
                            className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            <Calendar className="h-4 w-4 mr-1" />
                            Set Last Working Date
                          </button>
                        )}

                        {item.stages && item.stages.map((stage, index) => (
                          <div key={stage} className="flex space-x-1">
                            <button
                              onClick={() => inviteStage(item.id, stage)}
                              className="inline-flex items-center px-2 py-1 border border-gray-300 text-xs leading-4 font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                              <Mail className="h-3 w-3 mr-1" />
                              Invite {stageLabels.find((x) => x.key === stage)?.label || stage}
                            </button>
                            <button
                              onClick={() => completeStage(item.id, stage)}
                              className="inline-flex items-center px-2 py-1 border border-green-300 text-xs leading-4 font-medium rounded text-green-700 bg-green-50 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Complete {stageLabels.find((x) => x.key === stage)?.label || stage}
                            </button>
                          </div>
                        ))}

                        <button
                          onClick={() => recordDocument(item.id)}
                          className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <FileText className="h-4 w-4 mr-1" />
                          Record Document
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Offboarding;
