import React, { useEffect, useState } from "react";
import HrSidebar from "./HrSidebar";
import api from "../config/apiClient";
import { CheckCircle, Circle, Clock, Calendar, User, Mail, ChevronRight, FileText } from "lucide-react";
import { toast } from 'react-hot-toast';

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

  const sendUploadLink = async (onboardingId) => {
    try {
      const res = await api.post(`/api/hr-onboarding/internal/generate-link/${onboardingId}`, { expiresInHours: 48 });
      const link = res?.data?.link;
      if (link) {
        try { await navigator.clipboard.writeText(link); } catch {}
        toast?.success ? toast.success('Upload link copied to clipboard') : alert('Link: ' + link);
        window.open(link, '_blank');
      } else {
        alert('Link sent to candidate email.');
      }
    } catch (e) {
      alert(e?.response?.data?.message || 'Failed to send link');
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
  const [currentStep, setCurrentStep] = useState(0);
  const [wizardMode, setWizardMode] = useState('view'); // 'view' or 'manage'

  // Documents modal state
  const [documentsOpen, setDocumentsOpen] = useState(false);
  const [documentsItem, setDocumentsItem] = useState(null);
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
    resetStage: 'interview1',
    resetReason: '',
  });

  const openWizard = (it, mode = 'view') => {
    setActiveItem(it);
    setWizardMode(mode);

    let stepIndex = 0;
    if (mode === 'view') {
      // For view mode, show current stage
      const current = it.stages[it.currentStageIndex];
      const stage = current === 'success' ? 'documentation' : current;
      stepIndex = it.stages.indexOf(stage);
    } else {
      // For manage mode, start from beginning
      stepIndex = 0;
    }

    setCurrentStep(stepIndex);
    setForm((f) => ({
      ...f,
      stage: it.stages[stepIndex],
      mode: 'online',
      meetingLink: '',
      location: '',
      start: '',
      end: '',
      message: '',
      tasksRaw: '',
      panUrl: '', aadhaarUrl: '', photoUrl: '', marksheetUrl: '', other1: '', other2: '',
      joiningDate: '', rejectReason: '',
      resetStage: 'interview1',
      resetReason: ''
    }));
    setWizardOpen(true);
  };

  const openDocumentsModal = (it) => {
    setDocumentsItem(it);
    setDocumentsOpen(true);
  };

  const closeWizard = () => { setWizardOpen(false); setActiveItem(null); setCurrentStep(0); setWizardMode('view'); };
  const closeDocumentsModal = () => { setDocumentsOpen(false); setDocumentsItem(null); };

  const submitInviteFromWizard = async () => {
    try {
      if (!activeItem) return;
      const stage = activeItem.stages[currentStep];
      if (!['interview1','hrDiscussion'].includes(stage)) {
        alert('Invites are only for Interview 1 or HR Discussion stages.');
        return;
      }
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
    } catch (e) {
      alert(e?.response?.data?.message || 'Failed to send invite');
    }
  };

  const submitCompleteFromWizard = async () => {
    try {
      if (!activeItem) return;
      const stage = activeItem.stages[currentStep];
      if (stage === 'documentation') {
        const body = {};
        if (form.joiningDate) body.joiningDate = form.joiningDate;
        await api.post(`/api/hr/onboarding/${activeItem._id}/docs-complete`, body);
      } else if (['interview1','hrDiscussion'].includes(stage)) {
        await api.post(`/api/hr/onboarding/${activeItem._id}/complete-stage`, { stage, feedback: form.message });
      } else {
        alert('Invalid stage to complete.');
        return;
      }
      fetchList();
    } catch (e) {
      alert(e?.response?.data?.message || 'Failed to complete stage');
    }
  };

  const submitDocsFromWizard = async () => {
    try {
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
    } catch (e) {
      alert(e?.response?.data?.message || 'Failed to submit documents');
    }
  };

  const submitRejectFromWizard = async () => {
    try {
      if (!activeItem) return;
      const stage = activeItem.stages[currentStep];
      if (!['interview1','hrDiscussion','documentation'].includes(stage)) {
        alert('Invalid stage to reject.');
        return;
      }
      await api.post(`/api/hr/onboarding/${activeItem._id}/reject-stage`, { stage, reason: form.rejectReason });
      fetchList();
    } catch (e) {
      alert(e?.response?.data?.message || 'Failed to reject stage');
    }
  };

  const submitResetFromWizard = async () => {
    try {
      if (!activeItem) return;
      await api.post(`/api/hr/onboarding/${activeItem._id}/reset`, { stage: form.resetStage, reason: form.resetReason });
      alert('Onboarding reset to selected stage');
      fetchList();
      closeWizard();
    } catch (e) {
      alert(e?.response?.data?.message || 'Failed to reset onboarding');
    }
  };

  const renderStageForm = () => {
    if (!activeItem) return null;
    const stage = activeItem.stages[currentStep];

    // For view mode, show all completed stages up to current stage
    if (wizardMode === 'view') {
      return (
        <div className="space-y-6">
          <div className="text-center">
            <h4 className="text-xl font-semibold text-gray-900 mb-2">Current Stage: {stageLabels.find((x) => x.key === stage)?.label || stage}</h4>
            <p className="text-gray-600">Viewing onboarding progress for {activeItem.candidateName}</p>
          </div>

          {/* Show all stages up to current */}
          <div className="space-y-4">
            {activeItem.stages.slice(0, currentStep + 1).map((stageItem, index) => {
              const isCompleted = index < currentStep || (index === currentStep && activeItem.status === 'completed');
              const isCurrent = index === currentStep && activeItem.status !== 'completed';

              return (
                <div key={stageItem} className={`border rounded-lg p-4 ${isCurrent ? 'border-blue-500 bg-blue-50' : isCompleted ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-gray-50'}`}>
                  <div className="flex items-center space-x-3 mb-2">
                    {isCompleted ? (
                      <CheckCircle className="text-green-500" size={20} />
                    ) : isCurrent ? (
                      <Clock className="text-blue-500" size={20} />
                    ) : (
                      <Circle className="text-gray-400" size={20} />
                    )}
                    <span className={`font-medium ${isCurrent ? 'text-blue-900' : isCompleted ? 'text-green-900' : 'text-gray-700'}`}>
                      {stageLabels.find((x) => x.key === stageItem)?.label || stageItem}
                    </span>
                  </div>
                  {stageItem === 'success' && activeItem.joiningDate && (
                    <p className="text-sm text-gray-600 ml-8">Joining Date: {new Date(activeItem.joiningDate).toLocaleDateString()}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    if (stage === 'interview1') {
      return (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Interview 1 Setup</h4>
          <div className="flex items-center space-x-3">
            <label className="font-medium text-sm text-gray-700">Interview Mode</label>
            <select value={form.mode} onChange={(e)=>setForm({...form, mode:e.target.value})} className="border rounded-md px-3 py-2 text-sm">
              <option value="online">Online Interview</option>
              <option value="offline">Offline Interview</option>
            </select>
          </div>
          {form.mode === 'online' ? (
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Interview Link</label>
                <input value={form.meetingLink} onChange={(e)=>setForm({...form, meetingLink:e.target.value})} className="w-full border rounded-md px-3 py-2 text-sm" placeholder="https://meet.google.com/..." />
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-sm text-gray-700 mb-1">Interview Location</label>
              <input value={form.location} onChange={(e)=>setForm({...form, location:e.target.value})} className="w-full border rounded-md px-3 py-2 text-sm" placeholder="Conference Room A, Office Building" />
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Interview Start Time</label>
              <input value={form.start} onChange={(e)=>setForm({...form, start:e.target.value})} className="w-full border rounded-md px-3 py-2 text-sm" placeholder="2025-10-15 10:30" />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Interview End Time (optional)</label>
              <input value={form.end} onChange={(e)=>setForm({...form, end:e.target.value})} className="w-full border rounded-md px-3 py-2 text-sm" placeholder="2025-10-15 11:30" />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Interview Preparation Tasks</label>
            <textarea value={form.tasksRaw} onChange={(e)=>setForm({...form, tasksRaw:e.target.value})} className="w-full border rounded-md px-3 py-2 text-sm" rows={4} placeholder="Review resume\nPrepare technical questions\nSet up coding environment" />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Interview Instructions</label>
            <textarea value={form.message} onChange={(e)=>setForm({...form, message:e.target.value})} className="w-full border rounded-md px-3 py-2 text-sm" rows={3} placeholder="Please come prepared with your resume and portfolio. The interview will cover technical skills and problem-solving." />
          </div>
        </div>
      );
    }
    if (stage === 'hrDiscussion') {
      return (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">HR Discussion Setup</h4>
          <div className="flex items-center space-x-3">
            <label className="font-medium text-sm text-gray-700">Discussion Mode</label>
            <select value={form.mode} onChange={(e)=>setForm({...form, mode:e.target.value})} className="border rounded-md px-3 py-2 text-sm">
              <option value="online">Online Discussion</option>
              <option value="offline">Offline Discussion</option>
            </select>
          </div>
          {form.mode === 'online' ? (
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-700 mb-1">Discussion Link</label>
                <input value={form.meetingLink} onChange={(e)=>setForm({...form, meetingLink:e.target.value})} className="w-full border rounded-md px-3 py-2 text-sm" placeholder="https://teams.microsoft.com/..." />
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-sm text-gray-700 mb-1">Discussion Location</label>
              <input value={form.location} onChange={(e)=>setForm({...form, location:e.target.value})} className="w-full border rounded-md px-3 py-2 text-sm" placeholder="HR Meeting Room, 3rd Floor" />
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Discussion Start Time</label>
              <input value={form.start} onChange={(e)=>setForm({...form, start:e.target.value})} className="w-full border rounded-md px-3 py-2 text-sm" placeholder="2025-10-15 14:00" />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Discussion End Time (optional)</label>
              <input value={form.end} onChange={(e)=>setForm({...form, end:e.target.value})} className="w-full border rounded-md px-3 py-2 text-sm" placeholder="2025-10-15 15:00" />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Discussion Topics/Agenda</label>
            <textarea value={form.tasksRaw} onChange={(e)=>setForm({...form, tasksRaw:e.target.value})} className="w-full border rounded-md px-3 py-2 text-sm" rows={4} placeholder="Company culture discussion\nSalary expectations\nBenefits overview\nQ&A session" />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Discussion Notes</label>
            <textarea value={form.message} onChange={(e)=>setForm({...form, message:e.target.value})} className="w-full border rounded-md px-3 py-2 text-sm" rows={3} placeholder="This discussion will cover company culture, compensation package, and answer any questions you may have about joining our team." />
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
    if (stage === 'success') {
      return (
        <div className="text-center py-8">
          <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Onboarding Completed!</h3>
          <p className="text-gray-600">The candidate has successfully completed all stages.</p>
          {activeItem.joiningDate && (
            <p className="text-blue-600 mt-2">Joining Date: {new Date(activeItem.joiningDate).toLocaleDateString()}</p>
          )}
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
                    <div className="flex items-center justify-between">
                      {/* Candidate Info */}
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-semibold text-sm">
                            {it.candidateName?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-semibold text-gray-900 truncate">{it.candidateName}</h3>
                          <div className="flex items-center text-sm text-gray-500">
                            <Mail size={14} className="mr-1.5" />
                            <span className="truncate">{it.candidateEmail}</span>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center space-x-3">
                        <button onClick={() => openWizard(it, 'view')} className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium">
                          View Details
                        </button>
                        <button onClick={() => openDocumentsModal(it)} className="px-4 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition-colors font-medium">
                          View Documents
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
              <StageProgress stages={activeItem.stages} currentIndex={currentStep} status={activeItem.status} />
            )}
          </div>
        </div>
        <div className="p-6 max-h-[70vh] overflow-auto">
          {activeItem ? renderStageForm() : <div className="text-center py-8">Loading...</div>}
        </div>
        <div className="px-6 py-4 bg-gray-50 border-t flex items-center justify-between">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0 || wizardMode === 'view'}
            className="px-4 py-2 rounded-md bg-white border border-gray-200 text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Back
          </button>
          <div className="space-x-2">
            {wizardMode === 'view' ? (
              <>
                {activeItem && activeItem.status !== 'completed' && (
                  <button onClick={() => openWizard(activeItem, 'manage')} className="px-4 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700">
                    Proceed to Manage
                  </button>
                )}
                <button onClick={closeWizard} className="px-4 py-2 rounded-md bg-gray-600 text-white hover:bg-gray-700">
                  Close
                </button>
              </>
            ) : (
              <>
                {activeItem && activeItem.status !== 'completed' && activeItem.stages && activeItem.stages[currentStep] !== 'success' && (
                  <>
                    {(activeItem.stages[currentStep] === 'interview1' || activeItem.stages[currentStep] === 'hrDiscussion') ? (
                      <button onClick={submitInviteFromWizard} className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">Send Invite</button>
                    ) : null}
                    {activeItem.stages[currentStep] === 'documentation' ? (
                      <button onClick={submitDocsFromWizard} className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">Submit Documents</button>
                    ) : null}
                    <button onClick={submitCompleteFromWizard} className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700">Mark Done</button>
                    <button onClick={submitRejectFromWizard} className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700">Reject</button>
                    <button onClick={submitResetFromWizard} className="px-4 py-2 rounded-md bg-amber-600 text-white hover:bg-amber-700">Reset to Stage</button>
                  </>
                )}
                {activeItem && activeItem.status === 'completed' && activeItem.stages && currentStep === activeItem.stages.length - 1 ? (
                  <button onClick={closeWizard} className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700">Complete Onboarding</button>
                ) : (
                  activeItem && activeItem.stages && (
                    <button
                      onClick={() => setCurrentStep(Math.min(activeItem.stages.length - 1, currentStep + 1))}
                      disabled={currentStep === activeItem.stages.length - 1}
                      className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  )
                )}
              </>
            )}
          </div>
        </div>
      </Modal>

      {/* Documents Modal */}
      <Modal open={documentsOpen} onClose={closeDocumentsModal}>
        <div className="px-6 py-5 border-b bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-900">{documentsItem?.candidateName} - Documents</h3>
        </div>
        <div className="p-6 max-h-[70vh] overflow-auto">
          {documentsItem ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {documentsItem.documents && documentsItem.documents.length > 0 ? (
                  documentsItem.documents.map((doc, index) => (
                    <div key={index} className="border rounded-lg p-4 bg-gray-50">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900 capitalize">{doc.docType}</span>
                        <a
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          View Document
                        </a>
                      </div>
                      <p className="text-sm text-gray-600 truncate">{doc.url}</p>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileText className="text-gray-400" size={32} />
                    </div>
                    <p className="text-gray-500 text-lg font-medium">No documents uploaded yet</p>
                    <p className="text-gray-400 text-sm mt-1">Documents will appear here once uploaded by the candidate</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-8">Loading...</div>
          )}
        </div>
        <div className="px-6 py-4 bg-gray-50 border-t flex justify-end">
          <button onClick={closeDocumentsModal} className="px-4 py-2 rounded-md bg-gray-600 text-white hover:bg-gray-700">
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Onboarding;