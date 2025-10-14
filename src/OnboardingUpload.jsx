import React, { useEffect, useState } from 'react';

const OnboardingUpload = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [info, setInfo] = useState(null);
  const [summary, setSummary] = useState(null);
  const [files, setFiles] = useState({});

  const token = new URLSearchParams(window.location.search).get('token') || '';

  const fetchSummary = async () => {
    try {
      const res = await fetch(`/api/public/onboarding/summary?token=${encodeURIComponent(token)}`);
      const j = await res.json();
      if (res.ok) setSummary(j.data);
    } catch {}
  };

  useEffect(() => {
    const go = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(`/api/public/onboarding/validate?token=${encodeURIComponent(token)}`);
        const j = await res.json();
        if (!res.ok) throw new Error(j?.message || 'Validation failed');
        setInfo(j.data);
        if (j.data.used || j.data.expired) await fetchSummary();
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    if (token) go();
  }, [token]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      const fd = new FormData();
      fd.append('token', token);
      ['aadhaar','pan','resume','photo'].forEach((k)=>{ if (files[k]) fd.append(k, files[k]); });
      if (files.certificates && files.certificates.length) {
        for (const f of files.certificates) fd.append('certificates', f);
      }
      const res = await fetch('/api/public/onboarding/upload', { method:'POST', body: fd });
      const j = await res.json();
      if (!res.ok) throw new Error(j?.message || 'Upload failed');
      await fetchSummary();
      alert('Documents submitted. We sent a confirmation email.');
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  if (!token) return <div className="p-6 max-w-xl mx-auto">Missing token.</div>;
  if (loading) return <div className="p-6 max-w-xl mx-auto">Loading...</div>;
  if (error) return <div className="p-6 max-w-xl mx-auto text-red-600">{error}</div>;

  const usedOrExpired = info?.used || info?.expired;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white shadow-md rounded-xl border border-gray-200 p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Onboarding Documents</h1>
          <p className="text-gray-600 mb-6">Hi {info?.candidateName}, {usedOrExpired ? 'your documents are in review. See status below.' : 'please upload your documents using this secure link.'}</p>

          {usedOrExpired ? (
            <div>
              <div className="mb-4 p-3 rounded-md bg-blue-50 border border-blue-200 text-blue-800 text-sm">
                Token {info?.expired ? 'expired' : 'already used'}. If you need a new link, contact HR.
              </div>
              {summary && (
                <div className="space-y-3">
                  <div className="text-sm text-gray-700">Overall: <span className="font-semibold">{summary.status}</span> {summary.joiningDate ? `(Joining: ${new Date(summary.joiningDate).toLocaleDateString()})` : ''}</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {summary.docs?.map((d, i) => (
                      <div key={i} className="p-3 rounded-md border text-sm flex items-center justify-between">
                        <span className="capitalize">{d.docType}</span>
                        <span className={`px-2 py-0.5 rounded-md text-xs ${d.status==='verified'?'bg-green-100 text-green-700': d.status==='rejected'?'bg-red-100 text-red-700':'bg-gray-100 text-gray-600'}`}>{d.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Aadhaar (PDF/JPG/PNG)</label>
                <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(e)=>setFiles({...files, aadhaar: e.target.files[0]})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">PAN (PDF/JPG/PNG)</label>
                <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(e)=>setFiles({...files, pan: e.target.files[0]})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Resume (PDF)</label>
                <input type="file" accept=".pdf" onChange={(e)=>setFiles({...files, resume: e.target.files[0]})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Photo (JPG/PNG)</label>
                <input type="file" accept=".jpg,.jpeg,.png" onChange={(e)=>setFiles({...files, photo: e.target.files[0]})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Certificates (PDF/JPG/PNG) - Multiple</label>
                <input type="file" multiple accept=".pdf,.jpg,.jpeg,.png" onChange={(e)=>setFiles({...files, certificates: e.target.files})} />
              </div>
              {error && <div className="text-red-600 text-sm">{error}</div>}
              <div className="pt-2">
                <button type="submit" className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60" disabled={loading}>Submit</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingUpload;
