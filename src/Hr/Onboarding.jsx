import React, { useEffect, useState } from "react";
import HrSidebar from "./HrSidebar";
import api from "../config/apiClient";
import { CheckCircle, Circle, Clock, Calendar, User, Mail, ChevronRight } from "lucide-react";

// Simple modal component
const Modal = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-3xl rounded-xl shadow-xl border border-gray-200 overflow-hidden">
        {children}
      </div>
    </div>
  );
};

const stageLabels = [
  { key: "interview1", label: "Interview 1" },
  { key: "hrDiscussion", label: "HR Discussion" },
  { key: "documentation", label: "Documentation" },
  { key: "success", label: "Success" },
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

const Onboarding = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const fetchList = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get(`/api/hr/onboarding`);
      setList(res?.data?.data || []);
    } catch (e) {
      setError(e?.response?.data?.message || e.message || "Failed to load onboarding list");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchList(); }, []);

  const advance = async (id) => {
    try {
      await api.post(`/api/hr/onboarding/${id}/advance`);
      fetchList();
    } catch (e) {
      alert(e?.response?.data?.message || "Failed to advance");
    }
  };

  const setJoining = async (id) => {
    const val = prompt("Enter joining date (YYYY-MM-DD)");
    if (!val) return;
    try {
      await api.post(`/api/hr/onboarding/${id}/joining`, { joiningDate: val });
      fetchList();
    } catch (e) {
      alert(e?.response?.data?.message || "Failed to set joining date");
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
      const content = prompt("Message to candidate (optional)", "");
      payload.content = content || undefined;
      await api.post(`/api/hr/onboarding/${id}/invite`, payload);
      alert('Invite sent');
      fetchList();
    } catch (e) {
      alert(e?.response?.data?.message || 'Failed to send invite');
    }
  };

  const completeStage = async (id, stage) => {
    try {
      const feedback = prompt("Enter feedback/notes", "");
      await api.post(`/api/hr/onboarding/${id}/complete-stage`, { stage, feedback });
      fetchList();
    } catch (e) {
      alert(e?.response?.data?.message || 'Failed to complete stage');
    }
  };

  const sendDocsInvite = async (id) => {
    try {
      const uploadLink = prompt("Document upload link (URL)", "");
      const content = prompt("Message to candidate (optional)", "Please upload your documents for verification.");
      await api.post(`/api/hr/onboarding/${id}/docs-invite`, { uploadLink, content });
      alert('Documentation invite sent');
      fetchList();
    } catch (e) {
      alert(e?.response?.data?.message || 'Failed to send docs invite');
    }
  };

  const recordDocument = async (id) => {
    try {
      const docType = prompt("Document type (e.g., aadhaar, pan, degree)", "");
      if (!docType) return;
      const url = prompt("Document URL", "");
      if (!url) return;
      await api.post(`/api/hr/onboarding/${id}/docs`, { docType, url });
      fetchList();
    } catch (e) {
      alert(e?.response?.data?.message || 'Failed to record document');
    }
  };

  const filteredList = list.filter(it => {
    if (filterStatus === "all") return true;
    if (filterStatus === "active") return it.status !== "completed";
    if (filterStatus === "completed") return it.status === "completed";
    return true;
  });

  const stats = {
    total: list.length,
    active: list.filter(it => it.status !== "completed").length,
    completed: list.filter(it => it.status === "completed").length,
  };

  // Wizard modal state
  const [wizardOpen, setWizardOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [form, setForm] = useState({
    stage: 'interview1',
    mode: 'online',
    meetingLink: '',
    location: '',
    start: '',
    end: '',
    message: '',
    tasksRaw: '',
    // docs
    panUrl: '',
    aadhaarUrl: '',
    photoUrl: '',
    marksheetUrl: '',
    other1: '',
    other2: '',
    joiningDate: '',
    rejectReason: '',
  });

  const openWizard = (it) => {
    setActiveItem(it);
    const stage = it.stages[it.currentStageIndex];
    setForm((f) => ({
      ...f,
      stage,
      mode: 'online',
      meetingLink: '',
      location: '',
      start: '',
      end: '',
      message: '',
      tasksRaw: '',
      panUrl: '', aadhaarUrl: '', photoUrl: '', marksheetUrl: '', other1: '', other2: '',
      joiningDate: '', rejectReason: ''
    }));
    setWizardOpen(true);
  };
  const closeWizard = () => { setWizardOpen(false); setActiveItem(null); };

  const submitInviteFromWizard = async () => {
    if (!activeItem) return;
    const stage = form.stage;
    const type = form.mode;
    const tasks = (form.tasksRaw || '').split('\n').map(l => l.trim()).filter(Boolean).map(t => ({ title: t }));
    const payload = {
      stage,
      type,
      meetingLink: type === 'online' ? (form.meetingLink || undefined) : undefined,
      location: type === 'offline' ? (form.location || undefined) : undefined,
      scheduledAt: form.start ? new Date(form.start) : undefined,
      endsAt: form.end ? new Date(form.end) : undefined,
      content: form.message || undefined,
      tasks,
    };
    await api.post(`/api/hr/onboarding/${activeItem._id}/invite`, payload);
    fetchList();
  };

  const submitCompleteFromWizard = async () => {
    if (!activeItem) return;
    if (form.stage === 'documentation') {
      const body = {};
      if (form.joiningDate) body.joiningDate = form.joiningDate;
      await api.post(`/api/hr/onboarding/${activeItem._id}/docs-complete`, body);
    } else {
      await api.post(`/api/hr/onboarding/${activeItem._id}/complete-stage`, { stage: form.stage, feedback: form.message });
    }
    fetchList();
  };

  const submitDocsFromWizard = async () => {
    if (!activeItem) return;
    const docs = [];
    if (form.panUrl) docs.push({ docType: 'pan', url: form.panUrl });
    if (form.aadhaarUrl) docs.push({ docType: 'aadhaar', url: form.aadhaarUrl });
    if (form.photoUrl) docs.push({ docType: 'photo', url: form.photoUrl });
    if (form.marksheetUrl) docs.push({ docType: 'marksheet', url: form.marksheetUrl });
    if (form.other1) docs.push({ docType: 'other', url: form.other1 });
    if (form.other2) docs.push({ docType: 'other', url: form.other2 });
    await api.post(`/api/hr/onboarding/${activeItem._id}/docs-submit`, { documents: docs });
    fetchList();
  };

  const submitRejectFromWizard = async () => {
    if (!activeItem) return;
    await api.post(`/api/hr/onboarding/${activeItem._id}/reject-stage`, { stage: form.stage, reason: form.rejectReason });
    fetchList();
  };

  const renderStageForm = () => {
    if (!activeItem) return null;
    const stage = form.stage;
    if (stage === 'interview1' || stage === 'hrDiscussion') {
      return (
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <label className="font-medium text-sm text-gray-700">Mode</label>
            <select value={form.mode} onChange={(e)=>setForm({...form, mode:e.target.value})} className="border rounded-md px-3 py-2 text-sm">
              <option value="online">Online</option>
              <option value="offline">Offline</option>
            </select>
          </div>
          {form.mode === 'online' ? (
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Meeting link</label>
                <input value={form.meetingLink} onChange={(e)=>setForm({...form, meetingLink:e.target.value})} className="w-full border rounded-md px-3 py-2 text-sm" placeholder="https://..." />
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-sm text-gray-700 mb-1">Location</label>
              <input value={form.location} onChange={(e)=>setForm({...form, location:e.target.value})} className="w-full border rounded-md px-3 py-2 text-sm" placeholder="Office address" />
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Start (YYYY-MM-DD HH:mm)</label>
              <input value={form.start} onChange={(e)=>setForm({...form, start:e.target.value})} className="w-full border rounded-md px-3 py-2 text-sm" placeholder="2025-10-15 10:30" />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">End (optional)</label>
              <input value={form.end} onChange={(e)=>setForm({...form, end:e.target.value})} className="w-full border rounded-md px-3 py-2 text-sm" placeholder="2025-10-15 11:30" />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Tasks (one per line)</label>
            <textarea value={form.tasksRaw} onChange={(e)=>setForm({...form, tasksRaw:e.target.value})} className="w-full border rounded-md px-3 py-2 text-sm" rows={4} placeholder="Upload assignment A\nPrepare case study" />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Message to candidate</label>
            <textarea value={form.message} onChange={(e)=>setForm({...form, message:e.target.value})} className="w-full border rounded-md px-3 py-2 text-sm" rows={3} placeholder="Custom note" />
          </div>
        </div>
      );
    }
    if (stage === 'documentation') {
      return (
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-gray-700 mb-1">PAN URL</label>
              <input value={form.panUrl} onChange={(e)=>setForm({...form, panUrl:e.target.value})} className="w-full border rounded-md px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Aadhaar URL</label>
              <input value={form.aadhaarUrl} onChange={(e)=>setForm({...form, aadhaarUrl:e.target.value})} className="w-full border rounded-md px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Photo URL</label>
              <input value={form.photoUrl} onChange={(e)=>setForm({...form, photoUrl:e.target.value})} className="w-full border rounded-md px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Marksheet URL</label>
              <input value={form.marksheetUrl} onChange={(e)=>setForm({...form, marksheetUrl:e.target.value})} className="w-full border rounded-md px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Other Doc URL</label>
              <input value={form.other1} onChange={(e)=>setForm({...form, other1:e.target.value})} className="w-full border rounded-md px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Other Doc URL</label>
              <input value={form.other2} onChange={(e)=>setForm({...form, other2:e.target.value})} className="w-full border rounded-md px-3 py-2 text-sm" />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Joining Date (optional, set when marking verified)</label>
            <input value={form.joiningDate} onChange={(e)=>setForm({...form, joiningDate:e.target.value})} className="w-full border rounded-md px-3 py-2 text-sm" placeholder="YYYY-MM-DD" />
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <HrSidebar />
      <div className="flex-1 p-6 md:p-8 lg:p-10 ml-0 md:ml-6">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center">
              Onboarding Dashboard
            </h1>
            <p className="text-gray-600 text-lg">Manage candidate onboarding journey from offer to first day</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium mb-1">Total Candidates</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <User className="text-blue-600" size={24} />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium mb-1">In Progress</p>
                  <p className="text-3xl font-bold text-blue-600">{stats.active}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Clock className="text-blue-600" size={24} />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium mb-1">Completed</p>
                  <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="text-green-600" size={24} />
                </div>
              </div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex space-x-2 mb-6">
            <button
              onClick={() => setFilterStatus("all")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filterStatus === "all"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              All ({stats.total})
            </button>
            <button
              onClick={() => setFilterStatus("active")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filterStatus === "active"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              Active ({stats.active})
            </button>
            <button
              onClick={() => setFilterStatus("completed")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filterStatus === "completed"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              Completed ({stats.completed})
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center">
              <span className="font-medium">{error}</span>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="text-gray-500 mt-4">Loading candidates...</p>
            </div>
          )}

          {/* Candidates List */}
          {!loading && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b bg-gradient-to-r from-gray-50 to-white">
                <h2 className="text-lg font-semibold text-gray-800">Candidates</h2>
              </div>
              <div className="divide-y divide-gray-100">
                {filteredList.map((it) => (
                  <div 
                    key={it._id} 
                    className="px-6 py-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                      {/* Candidate Info */}
                      <div className="flex items-start space-x-4 lg:w-1/4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-semibold text-lg">
                            {it.candidateName?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 text-lg truncate">{it.candidateName}</h3>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <Mail size={14} className="mr-1.5" />
                            <span className="truncate">{it.candidateEmail}</span>
                          </div>
                          {it.joiningDate && (
                            <div className="flex items-center text-sm text-blue-600 mt-1">
                              <Calendar size={14} className="mr-1.5" />
                              <span>Joins: {new Date(it.joiningDate).toLocaleDateString()}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Progress */}
                      <div className="lg:flex-1 overflow-x-auto">
                        <StageProgress 
                          stages={it.stages} 
                          currentIndex={it.currentStageIndex} 
                          status={it.status} 
                        />
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-3 lg:w-auto">
                        <button onClick={() => openWizard(it)} className="px-4 py-2.5 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50">Manage</button>
                        {it.status !== 'completed' ? (
                          <button 
                            onClick={() => advance(it._id)} 
                            className="flex items-center px-4 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md font-medium"
                          >
                            <span>Advance</span>
                            <ChevronRight size={18} className="ml-1" />
                          </button>
                        ) : (
                          <div className="flex items-center px-4 py-2.5 rounded-lg bg-green-50 text-green-700 font-semibold">
                            <CheckCircle size={18} className="mr-2" />
                            <span>Completed</span>
                          </div>
                        )}

                        {/* Stage-specific manage actions */}
                        {it.stages[it.currentStageIndex] === 'interview1' && it.status !== 'completed' && (
                          <>
                            <button onClick={() => inviteStage(it._id, 'interview1')} className="px-4 py-2.5 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50">Invite Interview</button>
                            <button onClick={() => completeStage(it._id, 'interview1')} className="px-4 py-2.5 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50">Mark Done</button>
                          </>
                        )}
                        {it.stages[it.currentStageIndex] === 'hrDiscussion' && it.status !== 'completed' && (
                          <>
                            <button onClick={() => inviteStage(it._id, 'hrDiscussion')} className="px-4 py-2.5 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50">Invite HR</button>
                            <button onClick={() => completeStage(it._id, 'hrDiscussion')} className="px-4 py-2.5 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50">Mark Done</button>
                          </>
                        )}
                        {it.stages[it.currentStageIndex] === 'documentation' && it.status !== 'completed' && (
                          <>
                            <button onClick={() => sendDocsInvite(it._id)} className="px-4 py-2.5 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50">Send Docs Invite</button>
                            <button onClick={() => recordDocument(it._id)} className="px-4 py-2.5 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50">Record Doc</button>
                          </>
                        )}

                        <button 
                          onClick={() => setJoining(it._id)} 
                          className="flex items-center px-4 py-2.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors font-medium"
                        >
                          <Calendar size={18} className="mr-2" />
                          <span className="hidden sm:inline">Set Joining</span>
                          <span className="sm:hidden">Date</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {filteredList.length === 0 && (
                  <div className="px-6 py-16 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="text-gray-400" size={32} />
                    </div>
                    <p className="text-gray-500 text-lg font-medium">No candidates found</p>
                    <p className="text-gray-400 text-sm mt-1">
                      {filterStatus === "all" 
                        ? "No candidates in onboarding yet" 
                        : `No ${filterStatus} candidates`}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Wizard Modal */}
      <Modal open={wizardOpen} onClose={closeWizard}>
        <div className="px-6 py-5 border-b bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-900">{activeItem?.candidateName}</h3>
          <div className="mt-3">
            {activeItem && (
              <StageProgress stages={activeItem.stages} currentIndex={activeItem.currentStageIndex} status={activeItem.status} />
            )}
          </div>
        </div>
        <div className="p-6 max-h-[70vh] overflow-auto">
          {renderStageForm()}
          {/* Reject reason */}
          <div className="mt-6">
            <label className="block text-sm text-gray-700 mb-1">Reject reason (optional)</label>
            <input value={form.rejectReason} onChange={(e)=>setForm({...form, rejectReason:e.target.value})} className="w-full border rounded-md px-3 py-2 text-sm" placeholder="Reason if rejecting at this stage" />
          </div>
        </div>
        <div className="px-6 py-4 bg-gray-50 border-t flex items-center justify-between">
          <button onClick={closeWizard} className="px-4 py-2 rounded-md bg-white border border-gray-200 text-gray-700 hover:bg-gray-100">Cancel</button>
          <div className="space-x-2">
            {form.stage !== 'documentation' && (
              <button onClick={submitInviteFromWizard} className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">Send Invite</button>
            )}
            {form.stage === 'documentation' && (
              <button onClick={submitDocsFromWizard} className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">Submit Documents</button>
            )}
            <button onClick={submitCompleteFromWizard} className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700">Mark Done</button>
            <button onClick={submitRejectFromWizard} className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700">Reject</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Onboarding;