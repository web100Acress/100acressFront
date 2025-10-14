import React, { useEffect, useState } from "react";
import HrSidebar from "./HrSidebar";
import api from "../config/apiClient";
import { 
  CheckCircle, Circle, Clock, Calendar, User, Mail, ChevronRight, 
  X, Send, FileText, MapPin, Video, Building, AlertCircle, 
  CheckCheck, XCircle, Eye, Upload, Download
} from "lucide-react";

// Toast Notification Component
const Toast = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === "success" ? "bg-green-50 border-green-200" : 
                  type === "error" ? "bg-red-50 border-red-200" : 
                  "bg-blue-50 border-blue-200";
  const textColor = type === "success" ? "text-green-800" : 
                    type === "error" ? "text-red-800" : 
                    "text-blue-800";
  const Icon = type === "success" ? CheckCircle : 
               type === "error" ? XCircle : 
               AlertCircle;

  return (
    <div className={`fixed top-4 right-4 z-[2000] ${bgColor} border rounded-lg shadow-lg px-4 py-3 flex items-center space-x-3 min-w-[320px] animate-slide-in`}>
      <Icon className={textColor} size={20} />
      <span className={`flex-1 ${textColor} font-medium`}>{message}</span>
      <button onClick={onClose} className={`${textColor} hover:opacity-70`}>
        <X size={18} />
      </button>
    </div>
  );
};

// Enhanced Modal Component
const Modal = ({ open, onClose, children, size = "md" }) => {
  if (!open) return null;
  
  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-6xl"
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      <div className={`relative bg-white w-full ${sizeClasses[size]} rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-modal-in`}>
        {children}
      </div>
    </div>
  );
};

const stageLabels = [
  { key: "interview1", label: "Interview 1", icon: User },
  { key: "hrDiscussion", label: "HR Discussion", icon: CheckCheck },
  { key: "documentation", label: "Documentation", icon: FileText },
  { key: "success", label: "Success", icon: CheckCircle },
];

const StageProgress = ({ stages, currentIndex, status }) => {
  return (
    <div className="flex items-center justify-center space-x-2">
      {stages.map((s, idx) => {
        const done = status === "completed" || idx < currentIndex;
        const current = idx === currentIndex && status !== "completed";
        const isLast = idx === stages.length - 1;
        const stageInfo = stageLabels.find((x) => x.key === s);
        const StageIcon = stageInfo?.icon || Circle;
        
        return (
          <div key={s} className="flex items-center">
            <div className="flex flex-col items-center min-w-[90px]">
              <div className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                done ? "bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg shadow-green-500/30" : 
                current ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30 animate-pulse" : 
                "bg-gray-100 text-gray-400 border-2 border-gray-200"
              }`}>
                {done ? <CheckCircle size={20} strokeWidth={2.5} /> : 
                 current ? <Clock size={20} strokeWidth={2.5} /> : 
                 <StageIcon size={20} strokeWidth={2} />}
              </div>
              <div className={`mt-2 text-xs font-semibold text-center transition-all ${
                done ? "text-green-700" : current ? "text-blue-700" : "text-gray-400"
              }`}>
                {stageInfo?.label || s}
              </div>
            </div>
            {!isLast && (
              <div className="relative mx-1 mb-6">
                <div className="h-0.5 w-12 bg-gray-200"></div>
                <div className={`absolute top-0 left-0 h-0.5 transition-all duration-500 ${
                  done ? "w-full bg-gradient-to-r from-green-500 to-green-600" : "w-0"
                }`}></div>
              </div>
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
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = "success") => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const fetchList = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get(`/api/hr/onboarding`);
      setList(res?.data?.data || []);
    } catch (e) {
      setError(e?.response?.data?.message || e.message || "Failed to load onboarding list");
      showToast(e?.response?.data?.message || "Failed to load data", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchList(); }, []);

  const advance = async (id) => {
    try {
      await api.post(`/api/hr/onboarding/${id}/advance`);
      await fetchList();
      showToast("Stage advanced successfully!");
    } catch (e) {
      showToast(e?.response?.data?.message || "Failed to advance", "error");
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
  const [activeTab, setActiveTab] = useState("invite");
  const [form, setForm] = useState({
    stage: 'interview1',
    mode: 'online',
    meetingLink: '',
    location: '',
    start: '',
    end: '',
    message: '',
    tasksRaw: '',
    panUrl: '', aadhaarUrl: '', photoUrl: '', marksheetUrl: '', 
    other1: '', other2: '',
    joiningDate: '',
    rejectReason: '',
    feedback: '',
  });

  const openWizard = (it) => {
    setActiveItem(it);
    const stage = it.stages[it.currentStageIndex];
    if (it.status === 'completed' || stage === 'success') {
      showToast('This candidate has already completed onboarding.', 'info');
      return;
    }
    setForm({
      stage,
      mode: 'online',
      meetingLink: '',
      location: '',
      start: '',
      end: '',
      message: '',
      tasksRaw: '',
      panUrl: '', aadhaarUrl: '', photoUrl: '', marksheetUrl: '', 
      other1: '', other2: '',
      joiningDate: '',
      rejectReason: '',
      feedback: '',
    });
    setActiveTab(stage === 'documentation' ? 'documents' : 'invite');
    setWizardOpen(true);
  };

  const closeWizard = () => { 
    setWizardOpen(false); 
    setActiveItem(null);
    setActiveTab("invite");
  };

  const submitInviteFromWizard = async () => {
    try {
      if (!activeItem) return;
      if (!['interview1','hrDiscussion'].includes(form.stage)) {
        showToast('Invites are only for Interview 1 or HR Discussion stages.', 'error');
        return;
      }
      const tasks = (form.tasksRaw || '').split('\n').map(l => l.trim()).filter(Boolean).map(t => ({ title: t }));
      const payload = {
        stage: form.stage,
        type: form.mode,
        meetingLink: form.mode === 'online' ? (form.meetingLink || undefined) : undefined,
        location: form.mode === 'offline' ? (form.location || undefined) : undefined,
        scheduledAt: form.start ? new Date(form.start) : undefined,
        endsAt: form.end ? new Date(form.end) : undefined,
        content: form.message || undefined,
        tasks,
      };
      await api.post(`/api/hr/onboarding/${activeItem._id}/invite`, payload);
      await fetchList();
      showToast("Invite sent successfully!");
      closeWizard();
    } catch (e) {
      showToast(e?.response?.data?.message || 'Failed to send invite', 'error');
    }
  };

  const submitCompleteFromWizard = async () => {
    try {
      if (!activeItem) return;
      if (form.stage === 'documentation') {
        const body = {};
        if (form.joiningDate) body.joiningDate = form.joiningDate;
        if (form.feedback) body.feedback = form.feedback;
        await api.post(`/api/hr/onboarding/${activeItem._id}/docs-complete`, body);
      } else if (['interview1','hrDiscussion'].includes(form.stage)) {
        await api.post(`/api/hr/onboarding/${activeItem._id}/complete-stage`, { 
          stage: form.stage, 
          feedback: form.feedback 
        });
      } else {
        showToast('Invalid stage to complete.', 'error');
        return;
      }
      await fetchList();
      showToast("Stage marked as complete!");
      closeWizard();
    } catch (e) {
      showToast(e?.response?.data?.message || 'Failed to complete stage', 'error');
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
      
      if (docs.length === 0) {
        showToast('Please provide at least one document URL', 'error');
        return;
      }
      
      await api.post(`/api/hr/onboarding/${activeItem._id}/docs-submit`, { documents: docs });
      await fetchList();
      showToast("Documents submitted successfully!");
      closeWizard();
    } catch (e) {
      showToast(e?.response?.data?.message || 'Failed to submit documents', 'error');
    }
  };

  const submitRejectFromWizard = async () => {
    try {
      if (!activeItem) return;
      if (!form.rejectReason.trim()) {
        showToast('Please provide a rejection reason', 'error');
        return;
      }
      if (!['interview1','hrDiscussion','documentation'].includes(form.stage)) {
        showToast('Invalid stage to reject.', 'error');
        return;
      }
      await api.post(`/api/hr/onboarding/${activeItem._id}/reject-stage`, { 
        stage: form.stage, 
        reason: form.rejectReason 
      });
      await fetchList();
      showToast("Candidate rejected at this stage", "info");
      closeWizard();
    } catch (e) {
      showToast(e?.response?.data?.message || 'Failed to reject stage', 'error');
    }
  };

  const renderTabContent = () => {
    if (!activeItem) return null;
    const stage = form.stage;

    if (activeTab === "invite" && ['interview1', 'hrDiscussion'].includes(stage)) {
      return (
        <div className="space-y-5">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start space-x-3">
            <Send className="text-blue-600 mt-0.5" size={20} />
            <div>
              <p className="font-semibold text-blue-900 text-sm">Send Interview Invitation</p>
              <p className="text-blue-700 text-xs mt-1">Configure meeting details and send invite to candidate</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setForm({...form, mode: 'online'})}
              className={`p-4 rounded-xl border-2 transition-all ${
                form.mode === 'online' 
                  ? 'border-blue-500 bg-blue-50 shadow-md' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Video className={`mx-auto mb-2 ${form.mode === 'online' ? 'text-blue-600' : 'text-gray-400'}`} size={28} />
              <p className={`font-semibold text-sm ${form.mode === 'online' ? 'text-blue-900' : 'text-gray-600'}`}>Online Meeting</p>
            </button>
            <button
              onClick={() => setForm({...form, mode: 'offline'})}
              className={`p-4 rounded-xl border-2 transition-all ${
                form.mode === 'offline' 
                  ? 'border-blue-500 bg-blue-50 shadow-md' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Building className={`mx-auto mb-2 ${form.mode === 'offline' ? 'text-blue-600' : 'text-gray-400'}`} size={28} />
              <p className={`font-semibold text-sm ${form.mode === 'offline' ? 'text-blue-900' : 'text-gray-600'}`}>Office Visit</p>
            </button>
          </div>

          {form.mode === 'online' ? (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Meeting Link *</label>
              <div className="relative">
                <Video className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  value={form.meetingLink} 
                  onChange={(e)=>setForm({...form, meetingLink:e.target.value})} 
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                  placeholder="https://meet.google.com/xyz-abc-def" 
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Location *</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  value={form.location} 
                  onChange={(e)=>setForm({...form, location:e.target.value})} 
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                  placeholder="Office address, Floor, Room number" 
                />
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Start Date & Time</label>
              <input 
                type="datetime-local"
                value={form.start} 
                onChange={(e)=>setForm({...form, start:e.target.value})} 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">End Date & Time</label>
              <input 
                type="datetime-local"
                value={form.end} 
                onChange={(e)=>setForm({...form, end:e.target.value})} 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Tasks / Preparation Required</label>
            <textarea 
              value={form.tasksRaw} 
              onChange={(e)=>setForm({...form, tasksRaw:e.target.value})} 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none" 
              rows={4} 
              placeholder="One task per line&#10;e.g., Prepare a 10-min presentation on your previous project&#10;Review company values and culture" 
            />
            <p className="text-xs text-gray-500 mt-1">Enter each task on a new line</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Custom Message (Optional)</label>
            <textarea 
              value={form.message} 
              onChange={(e)=>setForm({...form, message:e.target.value})} 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none" 
              rows={3} 
              placeholder="Add any additional instructions or notes for the candidate..." 
            />
          </div>
        </div>
      );
    }

    if (activeTab === "documents" && stage === 'documentation') {
      return (
        <div className="space-y-5">
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 flex items-start space-x-3">
            <FileText className="text-purple-600 mt-0.5" size={20} />
            <div>
              <p className="font-semibold text-purple-900 text-sm">Document Collection</p>
              <p className="text-purple-700 text-xs mt-1">Upload or record document URLs for verification</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <FileText size={16} className="mr-1.5" />
                PAN Card
              </label>
              <input 
                value={form.panUrl} 
                onChange={(e)=>setForm({...form, panUrl:e.target.value})} 
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm" 
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <FileText size={16} className="mr-1.5" />
                Aadhaar Card
              </label>
              <input 
                value={form.aadhaarUrl} 
                onChange={(e)=>setForm({...form, aadhaarUrl:e.target.value})} 
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm" 
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <User size={16} className="mr-1.5" />
                Passport Photo
              </label>
              <input 
                value={form.photoUrl} 
                onChange={(e)=>setForm({...form, photoUrl:e.target.value})} 
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm" 
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <FileText size={16} className="mr-1.5" />
                Education Certificate
              </label>
              <input 
                value={form.marksheetUrl} 
                onChange={(e)=>setForm({...form, marksheetUrl:e.target.value})} 
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm" 
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <FileText size={16} className="mr-1.5" />
                Other Document 1
              </label>
              <input 
                value={form.other1} 
                onChange={(e)=>setForm({...form, other1:e.target.value})} 
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm" 
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <FileText size={16} className="mr-1.5" />
                Other Document 2
              </label>
              <input 
                value={form.other2} 
                onChange={(e)=>setForm({...form, other2:e.target.value})} 
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm" 
                placeholder="https://..."
              />
            </div>
          </div>
        </div>
      );
    }

    if (activeTab === "complete") {
      return (
        <div className="space-y-5">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start space-x-3">
            <CheckCircle className="text-green-600 mt-0.5" size={20} />
            <div>
              <p className="font-semibold text-green-900 text-sm">Mark Stage Complete</p>
              <p className="text-green-700 text-xs mt-1">Confirm completion and add feedback notes</p>
            </div>
          </div>

          {stage === 'documentation' && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <Calendar size={16} className="mr-1.5" />
                Joining Date
              </label>
              <input 
                type="date"
                value={form.joiningDate} 
                onChange={(e)=>setForm({...form, joiningDate:e.target.value})} 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" 
              />
              <p className="text-xs text-gray-500 mt-1">Set the official joining date for this candidate</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Feedback / Notes</label>
            <textarea 
              value={form.feedback} 
              onChange={(e)=>setForm({...form, feedback:e.target.value})} 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none" 
              rows={5} 
              placeholder="Add completion notes, feedback, or any observations..." 
            />
          </div>
        </div>
      );
    }

    if (activeTab === "reject") {
      return (
        <div className="space-y-5">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
            <AlertCircle className="text-red-600 mt-0.5" size={20} />
            <div>
              <p className="font-semibold text-red-900 text-sm">Reject at Current Stage</p>
              <p className="text-red-700 text-xs mt-1">This action will stop the onboarding process</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Rejection Reason *</label>
            <textarea 
              value={form.rejectReason} 
              onChange={(e)=>setForm({...form, rejectReason:e.target.value})} 
              className="w-full px-4 py-3 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none" 
              rows={5} 
              placeholder="Please provide a clear reason for rejection..." 
              required
            />
            <p className="text-xs text-gray-500 mt-1">This reason will be logged for record keeping</p>
          </div>
        </div>
      );
    }

    return null;
  };

  const renderActionButtons = () => {
    if (!activeItem) return null;
    const stage = form.stage;

    return (
      <div className="px-6 py-4 bg-gray-50 border-t flex items-center justify-between">
        <button 
          onClick={closeWizard} 
          className="px-5 py-2.5 rounded-lg bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-medium transition-all"
        >
          Cancel
        </button>
        <div className="flex space-x-3">
          {activeTab === "invite" && (
            <button 
              onClick={submitInviteFromWizard} 
              className="flex items-center px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 font-medium shadow-lg shadow-blue-500/30 transition-all"
            >
              <Send size={18} className="mr-2" />
              Send Invite
            </button>
          )}
          {activeTab === "documents" && (
            <button 
              onClick={submitDocsFromWizard} 
              className="flex items-center px-5 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 font-medium shadow-lg shadow-purple-500/30 transition-all"
            >
              <Upload size={18} className="mr-2" />
              Submit Documents
            </button>
          )}
          {activeTab === "complete" && (
            <button 
              onClick={submitCompleteFromWizard} 
              className="flex items-center px-5 py-2.5 rounded-lg bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 font-medium shadow-lg shadow-green-500/30 transition-all"
            >
              <CheckCircle size={18} className="mr-2" />
              Mark Complete
            </button>
          )}
          {activeTab === "reject" && (
            <button 
              onClick={submitRejectFromWizard} 
              className="flex items-center px-5 py-2.5 rounded-lg bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 font-medium shadow-lg shadow-red-500/30 transition-all"
            >
              <XCircle size={18} className="mr-2" />
              Reject Candidate
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <HrSidebar />
      
      {/* Toast Notifications */}
      <div className="fixed top-0 right-0 z-[2000] p-4 space-y-2">
        {toasts.map(toast => (
          <Toast 
            key={toast.id} 
            message={toast.message} 
            type={toast.type} 
            onClose={() => removeToast(toast.id)} 
          />
        ))}
      </div>

      <div className="flex-1 p-6 md:p-8 lg:p-10 ml-0 md:ml-6">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
              Onboarding Dashboard
            </h1>
            <p className="text-gray-600 text-lg">Streamline your candidate onboarding journey from offer acceptance to day one</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium mb-1">Total Candidates</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                  <p className="text-xs text-gray-400 mt-1">In onboarding pipeline</p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <User className="text-white" size={28} />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium mb-1">In Progress</p>
                  <p className="text-3xl font-bold text-blue-600">{stats.active}</p>
                  <p className="text-xs text-gray-400 mt-1">Active onboarding</p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                  <Clock className="text-blue-600" size={28} />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium mb-1">Completed</p>
                  <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
                  <p className="text-xs text-gray-400 mt-1">Successfully onboarded</p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/30">
                  <CheckCircle className="text-white" size={28} />
                </div>
              </div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex space-x-2 mb-6">
            <button
              onClick={() => setFilterStatus("all")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                filterStatus === "all"
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30"
                  : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              All <span className="ml-1.5 px-2 py-0.5 rounded-full bg-white/20 text-xs">{stats.total}</span>
            </button>
            <button
              onClick={() => setFilterStatus("active")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                filterStatus === "active"
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30"
                  : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              Active <span className="ml-1.5 px-2 py-0.5 rounded-full bg-white/20 text-xs">{stats.active}</span>
            </button>
            <button
              onClick={() => setFilterStatus("completed")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                filterStatus === "completed"
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30"
                  : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              Completed <span className="ml-1.5 px-2 py-0.5 rounded-full bg-white/20 text-xs">{stats.completed}</span>
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-4 rounded-lg mb-6 flex items-center shadow-md">
              <AlertCircle className="mr-3" size={20} />
              <span className="font-medium">{error}</span>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-16 text-center">
              <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600"></div>
              <p className="text-gray-500 mt-6 font-medium">Loading candidates...</p>
            </div>
          )}

          {/* Candidates List */}
          {!loading && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-5 border-b bg-gradient-to-r from-gray-50 to-white">
                <h2 className="text-xl font-bold text-gray-800">Candidates</h2>
                <p className="text-sm text-gray-500 mt-1">Manage and track onboarding progress</p>
              </div>
              <div className="divide-y divide-gray-100">
                {filteredList.map((it) => (
                  <div 
                    key={it._id} 
                    className="px-6 py-6 hover:bg-gray-50/50 transition-all"
                  >
                    <div className="flex flex-col gap-6">
                      {/* Top Row: Candidate Info */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/30">
                            <span className="text-white font-bold text-xl">
                              {it.candidateName?.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-gray-900 text-xl mb-1">{it.candidateName}</h3>
                            <div className="flex items-center text-sm text-gray-500">
                              <Mail size={14} className="mr-1.5" />
                              <span className="truncate">{it.candidateEmail}</span>
                            </div>
                            {it.joiningDate && (
                              <div className="flex items-center text-sm text-blue-600 mt-2 bg-blue-50 px-3 py-1 rounded-full w-fit">
                                <Calendar size={14} className="mr-1.5" />
                                <span className="font-medium">Joining: {new Date(it.joiningDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Status Badge */}
                        {it.status === 'completed' ? (
                          <div className="flex items-center px-4 py-2 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold shadow-lg shadow-green-500/30">
                            <CheckCircle size={18} className="mr-2" />
                            <span>Completed</span>
                          </div>
                        ) : (
                          <div className="flex items-center px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold shadow-lg shadow-blue-500/30">
                            <Clock size={18} className="mr-2" />
                            <span>In Progress</span>
                          </div>
                        )}
                      </div>

                      {/* Progress Bar */}
                      <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                        <StageProgress 
                          stages={it.stages} 
                          currentIndex={it.currentStageIndex} 
                          status={it.status} 
                        />
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-end space-x-3">
                        {it.status !== 'completed' && it.stages[it.currentStageIndex] !== 'success' && (
                          <button 
                            onClick={() => openWizard(it)} 
                            className="flex items-center px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 transition-all shadow-lg shadow-purple-500/30 font-medium"
                          >
                            <Eye size={18} className="mr-2" />
                            Manage Stage
                          </button>
                        )}
                        {it.status !== 'completed' && (
                          <button 
                            onClick={() => advance(it._id)} 
                            className="flex items-center px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg shadow-blue-500/30 font-medium"
                          >
                            <span>Advance</span>
                            <ChevronRight size={18} className="ml-1" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {filteredList.length === 0 && (
                  <div className="px-6 py-20 text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-inner">
                      <User className="text-gray-400" size={40} />
                    </div>
                    <p className="text-gray-500 text-xl font-semibold">No candidates found</p>
                    <p className="text-gray-400 text-sm mt-2">
                      {filterStatus === "all" 
                        ? "No candidates in onboarding pipeline yet" 
                        : `No ${filterStatus} candidates at the moment`}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Wizard Modal */}
      <Modal open={wizardOpen} onClose={closeWizard} size="lg">
        <div className="px-6 py-5 border-b bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{activeItem?.candidateName}</h3>
              <p className="text-sm text-gray-500 mt-1">{activeItem?.candidateEmail}</p>
            </div>
            <button 
              onClick={closeWizard}
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <X size={20} className="text-gray-600" />
            </button>
          </div>
          <div className="mt-4">
            {activeItem && (
              <StageProgress 
                stages={activeItem.stages} 
                currentIndex={activeItem.currentStageIndex} 
                status={activeItem.status} 
              />
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b bg-white">
          <div className="px-6 flex space-x-1">
            {['interview1', 'hrDiscussion'].includes(form.stage) && (
              <button
                onClick={() => setActiveTab("invite")}
                className={`px-6 py-3 font-semibold text-sm transition-all relative ${
                  activeTab === "invite"
                    ? "text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <Send size={16} className="inline mr-2" />
                Send Invite
                {activeTab === "invite" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
                )}
              </button>
            )}
            {form.stage === 'documentation' && (
              <button
                onClick={() => setActiveTab("documents")}
                className={`px-6 py-3 font-semibold text-sm transition-all relative ${
                  activeTab === "documents"
                    ? "text-purple-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <FileText size={16} className="inline mr-2" />
                Documents
                {activeTab === "documents" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"></div>
                )}
              </button>
            )}
            <button
              onClick={() => setActiveTab("complete")}
              className={`px-6 py-3 font-semibold text-sm transition-all relative ${
                activeTab === "complete"
                  ? "text-green-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <CheckCircle size={16} className="inline mr-2" />
              Mark Complete
              {activeTab === "complete" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab("reject")}
              className={`px-6 py-3 font-semibold text-sm transition-all relative ${
                activeTab === "reject"
                  ? "text-red-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <XCircle size={16} className="inline mr-2" />
              Reject
              {activeTab === "reject" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600"></div>
              )}
            </button>
          </div>
        </div>

        <div className="p-6 max-h-[60vh] overflow-auto">
          {renderTabContent()}
        </div>

        {renderActionButtons()}
      </Modal>

      <style>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes modal-in {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
        .animate-modal-in {
          animation: modal-in 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Onboarding;  