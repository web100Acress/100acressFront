import React, { useEffect, useMemo, useState } from "react";
import { getShortsVideoId, setShortsVideoId, parseYouTubeVideoId, clearShortsVideoId } from "../config/siteSettings";
import { getApiBase } from "../config/apiBase";
import Sidebar from "./Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ShortsSettings = () => {
  const [input, setInput] = useState("");
  const [savedId, setSavedId] = useState("");
  const [previewKey, setPreviewKey] = useState(0);

  useEffect(() => {
    // Load from backend, fallback to localStorage
    const load = async () => {
      try {
        const res = await fetch(`${getApiBase()}/settings/shorts-video-id`);
        if (res.ok) {
          const data = await res.json();
          const value = data?.value || "";
          if (value) {
            setShortsVideoId(value);
          }
        }
      } catch (e) {
        // ignore; fallback to localStorage below
      }
      const current = getShortsVideoId("ouBwbuoqnU8");
      setSavedId(current);
      setInput(current);
    };
    load();
  }, []);

  const parsed = useMemo(() => parseYouTubeVideoId(input), [input]);
  const previewSrc = useMemo(() => (
    parsed ? `https://www.youtube.com/embed/${parsed}?autoplay=0&mute=1&loop=1&playlist=${parsed}&controls=1&modestbranding=1&playsinline=1&rel=0` : ""
  ), [parsed]);

  const onSave = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("myToken");
    const clean = parseYouTubeVideoId(input);
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
      // Persist locally and refresh preview
      setShortsVideoId(clean);
      try {
        window.dispatchEvent(new StorageEvent('storage', { key: 'homeShortsVideoId', newValue: clean }));
      } catch (_) {}
      toast.success("Shorts ID saved successfully");
    } catch (_) {
      // Fallback to local persistence if API fails
      setShortsVideoId(clean);
      try {
        window.dispatchEvent(new StorageEvent('storage', { key: 'homeShortsVideoId', newValue: clean }));
      } catch (_) {}
      toast.warn("Saved locally. API not reachable.");
    }
    const current = getShortsVideoId();
    setSavedId(current);
    setPreviewKey((k) => k + 1);
  };

  const onClear = async () => {
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
      toast.success("Shorts ID cleared");
    } catch (_) {
      // ignore
    }
    clearShortsVideoId();
    setSavedId("");
    setInput("");
    setPreviewKey((k) => k + 1);
    try {
      window.dispatchEvent(new StorageEvent('storage', { key: 'homeShortsVideoId', newValue: '' }));
    } catch (_) {}
  };

  return (
    <div className="">
      {/* Sidebar layout */}
      <Sidebar />
      <div className="ml-[250px] p-4 max-w-3xl">
        <h1 className="text-2xl font-bold mb-4">Home Shorts Settings</h1>
        <p className="text-sm text-gray-600 mb-6">Paste a YouTube Shorts or Video URL (or just the video ID). This updates the floating shorts on the home page.</p>

        <form onSubmit={onSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">YouTube URL or ID</label>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g. https://youtube.com/shorts/XXXXXXXXXXX or XXXXXXXXXXX"
              className="w-full border rounded px-3 py-2"
            />
            {parsed && (
              <p className="text-xs text-gray-500 mt-1">Detected ID: <span className="font-mono">{parsed}</span></p>
            )}
          </div>

          <div className="flex gap-3">
            <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded">Save</button>
            <button type="button" onClick={onClear} className="border px-4 py-2 rounded">Clear</button>
          </div>
        </form>

        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-2">Preview</h2>
          {previewSrc ? (
            <div className="rounded overflow-hidden shadow" style={{width: 300, height: 534}}>
              <iframe
                key={previewKey}
                title="Preview Shorts"
                src={previewSrc}
                width="100%"
                height="100%"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                style={{ border: 0, display: 'block' }}
              />
            </div>
          ) : (
            <p className="text-sm text-gray-500">No video selected.</p>
          )}
        </div>

        <div className="mt-6 text-sm text-gray-600">
          <p><strong>Current saved ID:</strong> {savedId || '—'}</p>
          <p className="mt-1">Changes apply instantly on the Home page. If it doesn’t update, refresh the Home tab.</p>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={1500} hideProgressBar={false} closeOnClick pauseOnHover draggable />
    </div>
  );
};

export default ShortsSettings;
