import React, { useEffect, useState } from "react";
import HrSidebar from "./HrSidebar";
import api from "../config/apiClient";

const stageLabels = [
  { key: "interview1", label: "Interview 1" },
  { key: "hrDiscussion", label: "HR Discussion" },
  { key: "documentation", label: "Documentation" },
  { key: "success", label: "Success" },
];

const StageProgress = ({ stages, currentIndex, status }) => {
  return (
    <div className="flex items-center space-x-2">
      {stages.map((s, idx) => {
        const done = status === "completed" || idx <= currentIndex;
        const isLast = idx === stages.length - 1;
        return (
          <div key={s} className="flex items-center">
            <div className={`w-28 text-xs text-center ${done ? "text-green-700" : "text-gray-500"}`}>
              {stageLabels.find((x) => x.key === s)?.label || s}
            </div>
            {!isLast && (
              <div className={`mx-2 h-1 w-10 ${done ? "bg-green-500" : "bg-gray-300"}`}></div>
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

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <HrSidebar />
      <div className="flex-1 p-8 md:p-10 lg:p-12 ml-0 md:ml-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Onboarding</h1>
          <p className="text-gray-600 mb-6">Manage candidate onboarding: documents, tasks, access provisioning, and progress tracking.</p>

          {loading && <div className="text-gray-500">Loading...</div>}
          {error && <div className="text-red-600 mb-4">{error}</div>}

          <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
            <div className="px-6 py-3 border-b bg-gray-50 text-sm font-semibold text-gray-700">Candidates in Onboarding</div>
            <div className="divide-y">
              {list.map((it) => (
                <div key={it._id} className="px-6 py-4 grid grid-cols-1 md:grid-cols-5 gap-3 items-center">
                  <div className="md:col-span-1">
                    <div className="font-semibold text-gray-800">{it.candidateName}</div>
                    <div className="text-sm text-gray-500">{it.candidateEmail}</div>
                  </div>
                  <div className="md:col-span-3">
                    <StageProgress stages={it.stages} currentIndex={it.currentStageIndex} status={it.status} />
                  </div>
                  <div className="md:col-span-1 flex items-center space-x-2">
                    {it.status !== 'completed' ? (
                      <button onClick={() => advance(it._id)} className="px-3 py-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-700">Advance</button>
                    ) : (
                      <span className="text-green-700 font-semibold">Completed</span>
                    )}
                    <button onClick={() => setJoining(it._id)} className="px-3 py-1.5 rounded-md bg-gray-700 text-white hover:bg-gray-800">Set Joining</button>
                  </div>
                </div>
              ))}
              {list.length === 0 && !loading && (
                <div className="px-6 py-6 text-gray-500">No candidates in onboarding yet.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
