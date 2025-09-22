import React, { useEffect, useState } from "react";
import AdminInsightsSidebar from "./AdminInsightsSidebar";
import { Link } from "react-router-dom";

const SLUG_PREFIX = "insights-property-insights";

export default function InsightsPropertyInsightsBanners() {
  const [hero, setHero] = useState([]);
  const [small, setSmall] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ title: "", subtitle: "", link: "", order: 0, desktopFile: null, mobileFile: null });
  const token = localStorage.getItem("myToken");

  const fetchAll = async () => {
    setLoading(true);
    try {
      const base = import.meta.env.VITE_API_BASE;
      const [h, s] = await Promise.all([
        fetch(`${base}/api/admin/insights-banners`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${base}/api/admin/insights-small-banners`, { headers: { Authorization: `Bearer ${token}` } }),
      ]);

      console.log('Hero response status:', h.status);
      console.log('Small response status:', s.status);

      if (!h.ok) {
        console.error('Hero fetch failed:', await h.text());
      }
      if (!s.ok) {
        console.error('Small fetch failed:', await s.text());
      }

      const hj = await h.json().catch(() => ({ banners: [] }));
      const sj = await s.json().catch(() => ({ banners: [] }));

      console.log('Hero response data:', hj);
      console.log('Small response data:', sj);

      setHero((hj.banners || []).filter(b => (b.slug || "").startsWith(SLUG_PREFIX)));
      setSmall((sj.banners || []).filter(b => (b.slug || "").startsWith(SLUG_PREFIX)));

      console.log('Filtered hero banners:', (hj.banners || []).filter(b => (b.slug || "").startsWith(SLUG_PREFIX)));
      console.log('Filtered small banners:', (sj.banners || []).filter(b => (b.slug || "").startsWith(SLUG_PREFIX)));
    } catch (error) {
      console.error('Error fetching banners:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  const reset = () => setForm({ title: "", subtitle: "", link: "", order: 0, desktopFile: null, mobileFile: null });

  const uploadHero = async () => {
    const base = import.meta.env.VITE_API_BASE;
    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("subtitle", form.subtitle);
    fd.append("slug", SLUG_PREFIX);
    fd.append("link", form.link);
    fd.append("order", String(form.order || 0));
    if (form.desktopFile) fd.append("bannerImage", form.desktopFile);

    console.log('Uploading hero banner with data:', {
      title: form.title,
      subtitle: form.subtitle,
      slug: SLUG_PREFIX,
      link: form.link,
      order: form.order || 0,
      hasFile: !!form.desktopFile
    });

    const response = await fetch(`${base}/api/admin/insights-banners/upload`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: fd
    });

    console.log('Hero upload response status:', response.status);
    const result = await response.json();
    console.log('Hero upload response:', result);

    return result;
  };

  const uploadSmall = async () => {
    const base = import.meta.env.VITE_API_BASE;
    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("subtitle", form.subtitle);
    fd.append("slug", SLUG_PREFIX);
    fd.append("link", form.link);
    fd.append("order", String(form.order || 0));
    if (form.desktopFile) fd.append("desktopBannerImage", form.desktopFile);
    if (form.mobileFile) fd.append("mobileBannerImage", form.mobileFile);
    fd.append("position", "top");
    fd.append("size", "large");

    console.log('Uploading small banner with data:', {
      title: form.title,
      subtitle: form.subtitle,
      slug: SLUG_PREFIX,
      link: form.link,
      order: form.order || 0,
      hasDesktopFile: !!form.desktopFile,
      hasMobileFile: !!form.mobileFile,
      position: "top",
      size: "large"
    });

    const response = await fetch(`${base}/api/admin/insights-small-banners/upload`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: fd
    });

    console.log('Small upload response status:', response.status);
    const result = await response.json();
    console.log('Small upload response:', result);

    return result;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const heroResult = await uploadHero();
      const smallResult = await uploadSmall();

      console.log('Upload results:', { heroResult, smallResult });

      if (heroResult.success && smallResult.success) {
        reset();
        await fetchAll();
        notifyBannersUpdated();
        alert("Uploaded successfully!");
      } else {
        const errorMessage = heroResult.message || smallResult.message || "Upload failed";
        alert(`Upload failed: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert("Upload failed: " + error.message);
    }
  };

  const del = async (id, type) => {
    const base = import.meta.env.VITE_API_BASE;
    const url = type === 'hero'
      ? `${base}/api/admin/insights-banners/${id}`
      : `${base}/api/admin/insights-small-banners/${id}`;

    if (!confirm(`Are you sure you want to delete this ${type} banner?`)) {
      return;
    }

    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      console.log('Delete response status:', response.status);
      const result = await response.json();
      console.log('Delete response:', result);

      if (response.ok) {
        await fetchAll();
        notifyBannersUpdated();
        alert("Banner deleted successfully!");
      } else {
        alert(`Delete failed: ${result.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert("Delete failed: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky header */}
      <div className="sticky top-0 z-[9000] w-full bg-white/80 backdrop-blur border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">IN</div>
            <h1 className="text-lg sm:text-xl font-semibold text-gray-800">Insights Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/Admin/dashboard"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 border border-gray-300 hover:bg-gray-50"
            >
              ← Back to Admin
            </Link>
          </div>
        </div>
      </div>

      <AdminInsightsSidebar />
      <div className="max-w-7xl mx-auto md:pl-[300px] px-4 sm:px-6 lg:px-8 py-6">
        {/* Page heading */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Property Insights Banners</h1>
            <p className="text-sm text-gray-500 mt-1">Upload hero and small banners for the Property Insights section.</p>
          </div>
        </div>

        {/* Form Card */}
        <div className="mt-5 bg-white border border-gray-200 rounded-2xl shadow-sm">
          <div className="px-4 py-3 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-800">Create banners</h2>
          </div>
          <form onSubmit={onSubmit} className="p-4 sm:p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Title</label>
              <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                     placeholder="e.g. Expert opinions"
                     value={form.title}
                     onChange={e=>setForm({...form, title:e.target.value})}/>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Subtitle</label>
              <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                     placeholder="Short supporting text"
                     value={form.subtitle}
                     onChange={e=>setForm({...form, subtitle:e.target.value})}/>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Link</label>
              <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                     placeholder="https://example.com"
                     value={form.link}
                     onChange={e=>setForm({...form, link:e.target.value})}/>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Order</label>
              <input className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                     type="number"
                     placeholder="0"
                     value={form.order}
                     onChange={e=>setForm({...form, order:Number(e.target.value)||0})}/>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Desktop Image (hero/small)</label>
              <label className="w-full flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-3 text-xs text-gray-500 hover:border-indigo-300 cursor-pointer">
                <input type="file" accept="image/*" className="hidden" onChange={e=>setForm({...form, desktopFile:e.target.files?.[0]||null})}/>
                {form.desktopFile ? <span className="truncate max-w-[220px]">{form.desktopFile.name}</span> : <span>Click to choose image</span>}
              </label>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Mobile Image (small)</label>
              <label className="w-full flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-3 text-xs text-gray-500 hover:border-indigo-300 cursor-pointer">
                <input type="file" accept="image/*" className="hidden" onChange={e=>setForm({...form, mobileFile:e.target.files?.[0]||null})}/>
                {form.mobileFile ? <span className="truncate max-w-[220px]">{form.mobileFile.name}</span> : <span>Click to choose image</span>}
              </label>
            </div>

            <div className="md:col-span-2 flex items-center gap-2">
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm shadow-sm">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a1 1 0 011 1v8h8a1 1 0 110 2h-8v8a1 1 0 11-2 0v-8H3a1 1 0 110-2h8V3a1 1 0 011-1z"/></svg>
                Upload
              </button>
              <button type="button" onClick={reset} className="px-3 py-2 text-sm text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-50">Reset</button>
            </div>
          </form>
        </div>

        {/* Lists */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-800">Hero</h3>
              {loading && <Spinner />}
            </div>
            <div className="p-3 sm:p-4 space-y-2">
              {hero.map(b => (
                <div key={b._id} className="flex items-center gap-3 border border-gray-200 rounded-xl p-2.5">
                  <img src={b.image?.cdn_url || b.image?.url} className="w-28 h-16 object-cover rounded-lg" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">{b.title}</div>
                    <div className="text-xs text-gray-500 truncate">{b.subtitle}</div>
                  </div>
                  <button
                    onClick={() => { if (confirm('Delete this hero banner?')) del(b._id, 'hero'); }}
                    className="text-red-600 text-xs border border-red-200 hover:bg-red-50 rounded-lg px-2.5 py-1.5"
                  >
                    Delete
                  </button>
                </div>
              ))}
              {hero.length===0 && !loading && <Empty text="No hero banners." />}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-800">Small</h3>
              {loading && <Spinner />}
            </div>
            <div className="p-3 sm:p-4 space-y-2">
              {small.map(b => (
                <div key={b._id} className="flex items-center gap-3 border border-gray-200 rounded-xl p-2.5">
                  <img src={b.desktopImage?.cdn_url || b.desktopImage?.url} className="w-28 h-16 object-cover rounded-lg" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">{b.title}</div>
                    <div className="text-xs text-gray-500 truncate">{b.subtitle}</div>
                  </div>
                  <button
                    onClick={() => { if (confirm('Delete this small banner?')) del(b._id, 'small'); }}
                    className="text-red-600 text-xs border border-red-200 hover:bg-red-50 rounded-lg px-2.5 py-1.5"
                  >
                    Delete
                  </button>
                </div>
              ))}
              {small.length===0 && !loading && <Empty text="No small banners." />}
            </div>
          </div>
        </div>

        {/* Loading state over whole page */}
        {loading && (
          <div className="fixed inset-x-0 bottom-4 flex justify-center pointer-events-none">
            <div className="pointer-events-auto flex items-center gap-2 rounded-full bg-gray-900/90 text-white px-3 py-1.5 text-xs shadow-lg">
              <Spinner light />
              Loading…
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function notifyBannersUpdated(){
  try {
    const k = 'banners:updated';
    localStorage.setItem(k, String(Date.now()));
    window.dispatchEvent(new Event(k));
  } catch {}
}

function Spinner({ light }){
  return (
    <svg className={`animate-spin ${light? 'text-white':'text-gray-400'} w-4 h-4`} viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
    </svg>
  );
}

function Empty({ text }){
  return (
    <div className="flex items-center gap-2 text-xs text-gray-500">
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none"><path d="M4 7a3 3 0 013-3h10a3 3 0 013 3v10a3 3 0 01-3 3H7a3 3 0 01-3-3V7z" stroke="currentColor"/></svg>
      {text}
    </div>
  );
}
