import React, { useEffect, useMemo, useState } from "react";
import { parseYouTubeVideoId } from "../config/siteSettings";
import { getApiBase } from "../config/apiBase";
import Sidebar from "./Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ShortsSettings = () => {
  const [input, setInput] = useState("");
  const [savedId, setSavedId] = useState("");
  const [previewKey, setPreviewKey] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const channel = typeof window !== 'undefined' && 'BroadcastChannel' in window ? new BroadcastChannel('shorts-settings') : null;

  useEffect(() => {
    // Load from backend only
    const load = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${getApiBase()}/settings/shorts-video-id`);
        if (res.ok) {
          const data = await res.json();
          const value = data?.value || "";
          setSavedId(value);
          setInput(value);
        }
      } catch (e) {
        toast.error("Failed to load current settings");
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  const parsed = useMemo(() => parseYouTubeVideoId(input), [input]);
  const previewSrc = useMemo(() => (
    parsed ? `https://www.youtube.com/embed/${parsed}?autoplay=0&mute=1&loop=1&playlist=${parsed}&controls=1&modestbranding=1&playsinline=1&rel=0` : ""
  ), [parsed]);

  const onSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    const token = localStorage.getItem("myToken");
    const clean = parsed;
    
    if (!clean) {
      toast.error("Please enter a valid YouTube URL or ID", {
        icon: "⚠️"
      });
      setIsSaving(false);
      return;
    }
    
    try {
      const res = await fetch(`${getApiBase()}/settings/shorts-video-id`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ value: clean }),
      });
      
      if (!res.ok) {
        throw new Error("Failed to save setting");
      }
      
      setSavedId(clean);
      setInput(clean);
      toast.success("🎉 Shorts video updated successfully!", {
        icon: "✅"
      });
      
      // Notify other tabs instantly
      if (channel) {
        try { channel.postMessage({ type: 'shorts-update', value: clean }); } catch (_) {}
      }
    } catch (_) {
      toast.error("❌ Failed to save to server", {
        icon: "🚫"
      });
    } finally {
      setIsSaving(false);
    }
    
    const current = clean;
    setSavedId(current);
    setPreviewKey((k) => k + 1);
  };

  const onClear = async () => {
    setIsClearing(true);
    const token = localStorage.getItem("myToken");
    
    try {
      await fetch(`${getApiBase()}/settings/shorts-video-id`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ value: "" }),
      });
      
      toast.success("🧹 Shorts video cleared successfully!", {
        icon: "✅"
      });
    } catch (_) {
      toast.error("❌ Failed to clear setting", {
        icon: "🚫"
      });
    } finally {
      setIsClearing(false);
    }
    
    setSavedId("");
    setInput("");
    setPreviewKey((k) => k + 1);
    
    if (channel) {
      try { channel.postMessage({ type: 'shorts-update', value: '' }); } catch (_) {}
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      {/* Sidebar layout */}
      <Sidebar />
      
      <div className="ml-[250px] p-6 lg:p-8" style={{ width: 'calc(100% - 250px)' }}>
        {/* Enhanced Header Section */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl mr-4">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </div>
            
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 via-red-600 to-pink-600 bg-clip-text text-transparent">
                YouTube Shorts Settings
              </h1>
              <p className="text-gray-600 mt-1 text-lg">
                Manage your homepage floating shorts video
              </p>
            </div>
          </div>
          
          {/* Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {savedId ? "Active" : "No video set"}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Last Updated</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {savedId ? "Recently" : "Never"}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Format</p>
                  <p className="text-sm font-semibold text-gray-900">YouTube Shorts</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Settings Panel */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 lg:p-8">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Video Configuration</h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Paste a YouTube Shorts or Video URL (or just the video ID). This will update the floating shorts widget displayed on your homepage instantly.
                </p>
              </div>

              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
                  <span className="ml-3 text-gray-600">Loading current settings...</span>
                </div>
              ) : (
                <form onSubmit={onSave} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      YouTube URL or Video ID
                    </label>
                    
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                      </div>
                      
                      <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="https://youtube.com/shorts/XXXXXXXXXXX or video ID"
                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-2 focus:ring-red-100 transition-all duration-200 text-sm bg-gray-50 focus:bg-white"
                      />
                      
                      {input && (
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                          {parsed ? (
                            <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <svg className="h-5 w-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          )}
                        </div>
                      )}
                    </div>
                    
                    {parsed && (
                      <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-sm text-green-700">
                            Valid video detected: <span className="font-mono font-medium">{parsed}</span>
                          </span>
                        </div>
                      </div>
                    )}
                    
                    {input && !parsed && (
                      <div className="mt-3 p-3 bg-red-50 rounded-lg border border-red-200">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-sm text-red-700">
                            Invalid YouTube URL or ID format
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-4 pt-2">
                    <button 
                      type="submit" 
                      disabled={!parsed || isSaving}
                      className="flex-1 group relative inline-flex items-center justify-center px-6 py-4 text-sm font-semibold text-white bg-gradient-to-r from-red-600 to-pink-600 rounded-xl hover:from-red-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                    >
                      {isSaving ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Saving...
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                          Save Changes
                        </>
                      )}
                    </button>
                    
                    <button 
                      type="button" 
                      onClick={onClear}
                      disabled={isClearing}
                      className="px-6 py-4 text-sm font-semibold text-gray-700 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02]"
                    >
                      {isClearing ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400 mr-2"></div>
                          Clearing...
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Clear
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Live Preview</h3>
                {parsed && (
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-1.5 animate-pulse"></span>
                    Active
                  </span>
                )}
              </div>
              
              {previewSrc ? (
                <div className="relative">
                  <div className="rounded-2xl overflow-hidden shadow-lg bg-black" style={{aspectRatio: '9/16', maxWidth: '300px', margin: '0 auto'}}>
                    <iframe
                      key={previewKey}
                      title="Preview Shorts"
                      src={previewSrc}
                      width="100%"
                      height="100%"
                      allow="autoplay; encrypted-media; picture-in-picture"
                      allowFullScreen
                      className="rounded-2xl"
                      style={{ border: 0, display: 'block' }}
                    />
                  </div>
                  
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center text-sm text-blue-700">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      This is how it will appear on your homepage
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-2xl flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">No video selected</p>
                  <p className="text-xs text-gray-400">Enter a YouTube URL to see preview</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Current Settings Info */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
          <div className="flex items-start">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-2">Current Configuration</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Saved Video ID:</span>
                  <span className="font-mono text-gray-900 bg-white px-2 py-1 rounded">
                    {savedId || 'Not set'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Update Status:</span>
                  <span className="text-green-600 font-medium">Real-time</span>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-white/60 rounded-lg">
                <p className="text-xs text-gray-600 leading-relaxed">
                  💡 <strong>Pro Tip:</strong> Changes apply instantly across your website. If the homepage doesn't update immediately, try refreshing the page. The floating shorts widget will display your selected video with optimized mobile responsiveness.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <ToastContainer 
        position="top-right" 
        autoClose={4000} 
        hideProgressBar={false} 
        closeOnClick 
        pauseOnHover 
        draggable 
        theme="colored"
        toastClassName="rounded-xl"
        style={{ zIndex: 999999 }}
      />
    </div>
  );
};

export default ShortsSettings;