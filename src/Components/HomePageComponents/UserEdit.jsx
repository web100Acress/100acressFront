import React, { useEffect, useState } from "react";
// import Footer from "../Actual_Components/Footer";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../../config/apiClient";
import { message, Modal, Alert } from "antd";
import Footer from "../Actual_Components/Footer";
import { getApiBase as sharedGetApiBase } from "../../config/apiBase";


const UserEdit = () => {
  // --- User profile (name/email/mobile) and avatar ---
  const navigate = useNavigate();
  const [profile, setProfile] = useState(() => {
    try {
      const raw = localStorage.getItem("agentData");
      const parsed = raw ? JSON.parse(raw) : {};
      return {
        name: parsed.name || "",
        email: parsed.email || "",
        mobile: parsed.mobile || "",
      };
    } catch { return { name: "", email: "", mobile: "" }; }
  });
  const [avatar, setAvatar] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [pwd, setPwd] = useState({ current: "", next: "", confirm: "" });
  const [pwdAlert, setPwdAlert] = useState({ show: false, type: "info", msg: "" });

  // Resolve user id robustly: prefer mySellerId, else decode from JWT (userId/id/uid/sub)
  const getUserId = () => {
    try {
      // 1) Try mySellerId from localStorage
      let raw = localStorage.getItem('mySellerId');
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          if (typeof parsed === 'string') raw = parsed;
          else if (parsed && typeof parsed === 'object' && parsed._id) raw = parsed._id;
        } catch {}
        const match = String(raw).match(/[a-fA-F0-9]{24}/);
        if (match) return match[0];
      }

      // 2) Fallback to token claims
      let token = localStorage.getItem('myToken') || localStorage.getItem('token');
      if (token && token.startsWith('"') && token.endsWith('"')) {
        try { token = JSON.parse(token); } catch {}
      }
      if (token && token.split('.').length === 3) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          const id = payload.userId || payload.user_id || payload.id || payload.uid || payload.sub || '';
          if (id) return String(id);
        } catch {}
      }
    } catch {}
    return null;
  };

  const withBase = (path) => {
    const base = sharedGetApiBase();
    if (!base) return path; // use relative when no base configured
    // ensure single slash join
    if (path.startsWith('/')) return `${base}${path}`;
    return `${base}/${path}`;
  };

  // Try a list of endpoints until one succeeds (2xx)
  const tryEndpoints = async (method, endpoints, config = {}, body) => {
    let lastErr;
    for (const ep of endpoints) {
      try {
        const url = withBase(ep);
        if (method === 'get') {
          const res = await axios.get(url, config);
          if (res && res.status >= 200 && res.status < 300) return res;
        } else if (method === 'put') {
          const res = await axios.put(url, body, config);
          if (res && res.status >= 200 && res.status < 300) return res;
        } else if (method === 'post') {
          const res = await axios.post(url, body, config);
          if (res && res.status >= 200 && res.status < 300) return res;
        }
      } catch (e) {
        lastErr = e;
        // continue to next
      }
    }
    if (lastErr) throw lastErr;
    throw new Error('All endpoints failed');
  };

  const saveProfile = async () => {
    try {
      const token = localStorage.getItem('token') || localStorage.getItem('myToken');
      const userId = getUserId();
      if (!token) {
        message.error('You are not logged in');
        return;
      }
      if (!userId) {
        message.error('Invalid user id. Please re-login.');
        return;
      }
      const headers = { Authorization: `Bearer ${token}` };
      let res;
      const putEndpoints = [
        `/postPerson/update/${userId}`,
      ];
      if (avatarFile) {
        const body = { name: profile.name, email: profile.email, mobile: profile.mobile };
        res = await tryEndpoints('post', putEndpoints, { headers }, body);
      } else {
        const body = { name: profile.name, email: profile.email, mobile: profile.mobile };
        res = await tryEndpoints('post', putEndpoints, { headers }, body);
      }
      if (res && res.status >= 200 && res.status < 300) {
        message.success('Profile saved');
        await fetchProfile();
        // Broadcast profile update for navbar and other tabs
        try {
          const bc = new BroadcastChannel('profile-updates');
          bc.postMessage({ type: 'profile-updated', at: Date.now() });
          bc.close();
        } catch {}
        // Same-tab event so Navbar listener can refetch avatar immediately
        try { window.dispatchEvent(new CustomEvent('profile-updated')); } catch {}
      } else {
        message.error('Failed to save profile');
      }
    } catch (e) {
      message.error(e?.response?.data?.message || 'Failed to save profile');
    }
  };

  const onAvatarChange = async (e) => {
    try {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      setAvatarFile(file);

      // Preview immediately
      try {
        const reader = new FileReader();
        reader.onload = (ev) => setAvatar(ev.target?.result || "");
        reader.readAsDataURL(file);
      } catch {}

      // Upload immediately to backend
      const token = localStorage.getItem('myToken') || localStorage.getItem('token');
      const userId = getUserId();
      if (!token || !userId) {
        message.error('Please login again');
        return;
      }
      const form = new FormData();
      form.append('avatar', file);
      const resp = await api.post(`/users/${userId}/avatar`, form);
      const url = resp?.data?.data?.avatarUrl || '';
      if (url) {
        const bust = `${url}${url.includes('?') ? '&' : '?'}t=${Date.now()}`;
        setAvatar(bust);
        // Broadcast to navbar and other tabs
        try {
          const bc = new BroadcastChannel('profile-updates');
          bc.postMessage({ type: 'avatar-updated', url, at: Date.now() });
          bc.close();
        } catch {}
        try { window.dispatchEvent(new CustomEvent('avatar-updated', { detail: { url } })); } catch {}
        message.success('Profile photo updated');
      } else {
        message.error('Upload failed: no URL returned');
      }
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || 'Upload failed';
      message.error(msg);
    }
  };

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token') || localStorage.getItem('myToken');
      const userId = getUserId();
      if (!token) return;
      const getEndpoints = userId ? [ `/postPerson/edit/${userId}` ] : [];
      let res = null;
      if (getEndpoints.length) {
        res = await tryEndpoints('get', getEndpoints, { headers: { Authorization: `Bearer ${token}` } });
      }
      if (!res) return;
      const data = res?.data?.data || res?.data || {};
      const newProfile = {
        name: data.name || data.fullName || data.username || '',
        email: data.email || data.userEmail || '',
        mobile: data.mobile || data.phone || data.contact || '',
      };
      setProfile(newProfile);
      if (data.avatarUrl || data.avatar) {
        setAvatar(data.avatarUrl || data.avatar);
      }
      // Persist to localStorage for other parts of app (exclude avatar per requirements)
      try {
        localStorage.setItem('agentData', JSON.stringify(newProfile));
        const first = (newProfile.name || '').toString().trim().split(/\s+/)[0] || '';
        if (first) localStorage.setItem('firstName', first);
      } catch {}
    } catch (e) {
      // Silently ignore to avoid UX disruption
      // console.error('Failed fetching profile', e);
    }
  };

  const goChangePassword = async () => {
    // Inline change password instead of navigating to forgot flow
    try {
      console.log('[ChangePwd] handler invoked', { haveCurrent: !!pwd.current, haveNext: !!pwd.next, haveConfirm: !!pwd.confirm });
      if (!pwd.current || !pwd.next || !pwd.confirm) {
        console.warn('[ChangePwd] missing fields', { current: !!pwd.current, next: !!pwd.next, confirm: !!pwd.confirm });
        message.warning("Please fill all password fields");
        setPwdAlert({ show: true, type: "warning", msg: "Please fill all password fields" });
        return;
      }
      if (pwd.next !== pwd.confirm) {
        console.warn('[ChangePwd] mismatch next vs confirm');
        message.error("New and confirm password do not match");
        setPwdAlert({ show: true, type: "error", msg: "New and confirm password do not match" });
        return;
      }
      // Ask for confirmation before proceeding (TEMP: bypass to debug)
      console.log('[ChangePwd] skipping confirm modal for debug');
      const ok = true;
      console.log('[ChangePwd] user choice (forced)', ok);
      if (!ok) return; // user cancelled
      message.loading({ content: 'Updating password...', key: 'pwd', duration: 0 });
      // Backend expects { email, password }
      console.log('[ChangePwd] profile email', profile?.email);
      const payload = { email: profile.email, password: pwd.next, currentPassword: pwd.current };
      const url = withBase('/postPerson/changePassword');
      console.log('[ChangePwd] POST', url, payload.email);
      const res = await axios.post(url, payload);
      console.log('[ChangePwd] response', res?.status, res?.data);
      if (res && res.status >= 200 && res.status < 300) {
        message.success({ content: 'Password updated successfully', key: 'pwd', duration: 2 });
        setPwdAlert({ show: true, type: "success", msg: "Password updated successfully" });
        setPwd({ current: "", next: "", confirm: "" });
      } else {
        const msg = res?.data?.message || 'Failed to update password';
        message.error({ content: msg, key: 'pwd', duration: 2 });
        setPwdAlert({ show: true, type: "error", msg });
      }
    } catch (e) {
      const status = e?.response?.status;
      const msg = e?.response?.data?.message || 'Failed to update password';
      console.error('[ChangePwd] error', status, e?.response?.data || e);
      if (status === 400 && /Current password is incorrect/i.test(msg)) {
        message.error({ content: 'Current password is incorrect', key: 'pwd', duration: 3 });
        setPwdAlert({ show: true, type: "error", msg: "Current password is incorrect" });
      } else {
        message.error({ content: msg, key: 'pwd', duration: 3 });
        setPwdAlert({ show: true, type: "error", msg });
      }
    }
  };
  const [values, setValues] = useState({
    propertyType: "",
    propertyName: "",
    address: "",
    city: "",
    state: "",
    price: "",
    area: "",
    descripation: "",
    landMark: "",
    amenities: [],
    builtYear: "",
    furnishing: "",
    type: "",
    availableDate: "",
    propertyLooking: "Select Property Type",
    subType: "",
    frontImage: null,
    otherImage: [],
  });
  const { otherImage } = values;
  const { id } = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  
  useEffect(() => {
    // Load profile details from backend at mount
    fetchProfile();

    const fetchData = async () => {
      try {
        const res = await axios.get(
          `/postPerson/propertyoneEdit/${id}`
        );
        const data = res?.data?.data ?? res?.data;
        // Try common shapes: { data: { postProperty: [item] }} or { data: item } or { postProperty: [item] }
        const list = data?.postProperty ?? res?.data?.postProperty;
        const item = Array.isArray(list) ? list[0] : (list || data);
        if (item && typeof item === 'object') {
          setValues((prev) => ({ ...prev, ...item }));
        } else {
          messageApi?.open?.({
            key: "warnNoPropertyData",
            type: "warning",
            content: "No property data found for this ID",
            duration: 2,
          });
        }
      } catch (error) {
        console.error("Failed to fetch property for edit: ", error);
        messageApi?.open?.({
          key: "errorFetchProperty",
          type: "error",
          content: "Unable to load property details",
          duration: 2,
        });
      }
    };
    fetchData();
  }, []);

  const handleUpdateUser = async () => {
    try {
      messageApi.open({
        key:"loadingUpdatePropertyByUser",
        type:"loading",
        content:"Updating Data...",
        duration:0
      })
      const formData = new FormData();

      // Append all key-value pairs from values
      for (const key in values) {
        if (values[key] !== undefined && values[key] !== null) {
          formData.append(key, values[key]);
        }
      }

      //Append front image If exist
      if (values.frontImage && values.frontImage.file) {
        console.log("Front image:", values.frontImage.file);
        formData.append("frontImage", values.frontImage.file);
      }
      
      //Apend OtherImages If exist
      if (values.otherImage && Array.isArray(values.otherImage)) {
        values.otherImage.forEach((item, index) => {
          if (item && item.file) {
            formData.append(`otherImage`, item.file);
          }
        });
        console.log("Other images Updated");
      }

      const response = await axios.post(
        `/postPerson/propertyoneUserUpdate/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.status === 200) {
        messageApi.destroy("loadingUpdatePropertyByUser");
        messageApi.open({
          key:"successUpdatePropertyByUser",
          type:"success",
          content:"Property Updated Successfully",
          duration:2
        });
      } else {
        messageApi.destroy("loadingUpdatePropertyByUser");
        messageApi.open({
          key:"errorUpdatePropertyByUser",
          type:"error",
          content:"Failed to Update the property. Please try again.",
          duration:2
        });
      }
    } catch (error) {
      messageApi.destroy("loadingUpdatePropertyByUser");
      messageApi.open({
        key:"errorUpdatePropertyByUser",
        type:"error",
        content:"Failed to Update the property. Please try again.",
        duration:2
      })
      console.error("Error updating user:", error);
    }
  };

  function handleFileChange(event) {
    const input = event.target;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {

        setValues((prevValues) => ({
          ...prevValues,
          frontImage: {
            file: input.files[0],
            url: e.target.result,
          },
        }));
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  const handleOtherImageFileChange = (event) => {
    const input = event.target;
    if(input.files && input.files[0]) {
      const files = Array.from(event.target.files);
      const updatedImages = files.map((file) => ({
        url: URL.createObjectURL(file),
        file,
      }));
      setValues({
        ...values,
        otherImage: [
          ...updatedImages,
        ]
      })
    }
  }

  return (
    <>
      <div className="pt-20 md:pt-24 pb-6 bg-gray-50">
        {contextHolder}
        <div className="mx-auto max-w-4xl px-3 sm:px-6 lg:px-8">
          {/* User Profile Section */}
          <div className="card-body mb-6 bg-white border rounded-2xl p-5 sm:p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-5 tracking-tight">Edit Profile</h2>
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="flex flex-col items-center sm:items-center">
                <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center ring-2 ring-gray-200 shadow-sm">
                  {avatar ? (
                    <img src={avatar} alt="avatar" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-gray-500 text-sm">No Photo</span>
                  )}
                </div>
                <label className="mt-3 inline-block cursor-pointer text-sm font-medium text-blue-700 hover:text-blue-800">
                  <input type="file" accept="image/*" className="hidden" onChange={onAvatarChange} />
                  Upload Icon Photo
                </label>
              </div>
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm text-gray-600">Name</label>
                  <input
                    type="text"
                    className="w-full mt-1 px-3 py-3 text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-lg shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900/20 transition-colors duration-200"
                    value={profile.name}
                    onChange={(e) => setProfile((s) => ({ ...s, name: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600">Email</label>
                  <input
                    type="email"
                    className="w-full mt-1 px-3 py-3 text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-lg shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900/20 transition-colors duration-200"
                    value={profile.email}
                    onChange={(e) => setProfile((s) => ({ ...s, email: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600">Mobile</label>
                  <input
                    type="tel"
                    className="w-full mt-1 px-3 py-3 text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-lg shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900/20 transition-colors duration-200"
                    value={profile.mobile}
                    onChange={(e) => setProfile((s) => ({ ...s, mobile: e.target.value }))}
                  />
                </div>
              </div>
            </div>
            <div className="mt-5">
              <button
                type="button"
                onClick={saveProfile}
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-sm"
              >
                Save Profile
              </button>
            </div>

            {/* Change Password under Edit Profile */}
            <div className="mt-8 pt-6 border-t">
              <h3 className="text-xl font-semibold mb-3 tracking-tight">Change Password</h3>
              {pwdAlert.show && (
                <div className="mb-3">
                  <Alert
                    showIcon
                    closable
                    type={pwdAlert.type}
                    message={pwdAlert.msg}
                    onClose={() => setPwdAlert((s) => ({ ...s, show: false }))}
                  />
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input
                  type="password"
                  placeholder="Current Password"
                  className="w-full px-3 py-3 text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-lg shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900/20 transition-colors duration-200"
                  value={pwd.current}
                  onChange={(e) => setPwd((s) => ({ ...s, current: e.target.value }))}
                />
                <input
                  type="password"
                  placeholder="New Password"
                  className="w-full px-3 py-3 text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-lg shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900/20 transition-colors duration-200"
                  value={pwd.next}
                  onChange={(e) => setPwd((s) => ({ ...s, next: e.target.value }))}
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full px-3 py-3 text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-lg shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900/20 transition-colors duration-200"
                  value={pwd.confirm}
                  onChange={(e) => setPwd((s) => ({ ...s, confirm: e.target.value }))}
                />
              </div>
              <div className="mt-4 flex gap-3">
                <button
                  type="button"
                  onClick={goChangePassword}
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-semibold rounded-lg text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 shadow-sm"
                >
                  Continue to Change Password
                </button>
              </div>
            </div>
          </div>

        
        </div>
      </div>

        <Footer />
    </>
  );
};

export default UserEdit;
