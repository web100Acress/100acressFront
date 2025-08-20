import React, { useEffect, useState } from "react";
// import Footer from "../Actual_Components/Footer";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { message, Modal, Alert } from "antd";
import LuxuryFooter from "../Actual_Components/LuxuryFooter";
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
  const [avatar, setAvatar] = useState(() => {
    try { return localStorage.getItem("agentAvatar") || ""; } catch { return ""; }
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [pwd, setPwd] = useState({ current: "", next: "", confirm: "" });
  const [pwdAlert, setPwdAlert] = useState({ show: false, type: "info", msg: "" });

  // Extract a valid MongoDB ObjectId from localStorage mySellerId
  const getUserId = () => {
    try {
      let raw = localStorage.getItem('mySellerId');
      if (!raw) return null;
      // If JSON-stringified object or string
      try {
        const parsed = JSON.parse(raw);
        if (typeof parsed === 'string') raw = parsed;
        else if (parsed && typeof parsed === 'object' && parsed._id) raw = parsed._id;
      } catch {}
      // Remove wrapping quotes and pick a 24-hex sequence
      const match = String(raw).match(/[a-fA-F0-9]{24}/);
      return match ? match[0] : null;
    } catch { return null; }
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
        // Backend route doesn't declare upload middleware, so avoid multipart.
        const body = { name: profile.name, email: profile.email, mobile: profile.mobile };
        res = await tryEndpoints('post', putEndpoints, { headers }, body);
        // Persist avatar locally so Nav shows it
        try { localStorage.setItem('agentAvatar', avatar); } catch {}
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
      } else {
        message.error('Failed to save profile');
      }
    } catch (e) {
      message.error(e?.response?.data?.message || 'Failed to save profile');
    }
  };

  const onAvatarChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setAvatarFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const url = ev.target?.result || "";
      setAvatar(url); // preview only; persist after successful save
    };
    reader.readAsDataURL(file);
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
        try { localStorage.setItem('agentAvatar', data.avatarUrl || data.avatar); } catch {}
      }
      // Persist to localStorage for other parts of app (e.g., navbar)
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
      <div className="pt-24 md:pt-28 pb-10 bg-white min-h-screen">
        {contextHolder}
        <div className="mx-auto max-w-4xl px-2 sm:px-6 lg:px-8">
          {/* User Profile Section */}
          <div className="card-body mb-8 border rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
            <div className="flex items-start gap-6">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
                  {avatar ? (
                    <img src={avatar} alt="avatar" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-gray-500 text-sm">No Photo</span>
                  )}
                </div>
                <label className="mt-3 inline-block cursor-pointer text-sm text-blue-600">
                  <input type="file" accept="image/*" className="hidden" onChange={onAvatarChange} />
                  Upload Icon Photo
                </label>
              </div>
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600">Name</label>
                  <input
                    type="text"
                    className="w-full mt-1 outline-none border-b border-gray-400 p-1"
                    value={profile.name}
                    onChange={(e) => setProfile((s) => ({ ...s, name: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600">Email</label>
                  <input
                    type="email"
                    className="w-full mt-1 outline-none border-b border-gray-400 p-1"
                    value={profile.email}
                    onChange={(e) => setProfile((s) => ({ ...s, email: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600">Mobile</label>
                  <input
                    type="tel"
                    className="w-full mt-1 outline-none border-b border-gray-400 p-1"
                    value={profile.mobile}
                    onChange={(e) => setProfile((s) => ({ ...s, mobile: e.target.value }))}
                  />
                </div>
              </div>
            </div>
            <div className="mt-4">
              <button
                type="button"
                onClick={saveProfile}
                className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Save Profile
              </button>
            </div>

            {/* Change Password under Edit Profile */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-2">Change Password</h3>
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
                  className="w-full outline-none border-b border-gray-400 p-1"
                  value={pwd.current}
                  onChange={(e) => setPwd((s) => ({ ...s, current: e.target.value }))}
                />
                <input
                  type="password"
                  placeholder="New Password"
                  className="w-full outline-none border-b border-gray-400 p-1"
                  value={pwd.next}
                  onChange={(e) => setPwd((s) => ({ ...s, next: e.target.value }))}
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full outline-none border-b border-gray-400 p-1"
                  value={pwd.confirm}
                  onChange={(e) => setPwd((s) => ({ ...s, confirm: e.target.value }))}
                />
              </div>
              <div className="mt-4 flex gap-3">
                <button
                  type="button"
                  onClick={goChangePassword}
                  className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5"
                >
                  Continue to Change Password
                </button>
              </div>
            </div>
          </div>

        
        </div>
      </div>

      <LuxuryFooter />
    </>
  );
};

export default UserEdit;
