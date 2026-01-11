  import React, { useContext, useEffect, useRef, useState } from "react";
import { Eye, EyeOff, X } from "lucide-react";
import { AuthContext } from "../AuthContext";
import axios from "axios";
// import { initializeApp } from "firebase/app";
// import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import '../aadharhomes/PostProperty/toast.css';

function LoginForm({ inModal = false, onSwitchToRegister, preventRedirect = false }) {
  const { login } = useContext(AuthContext);

  // Firebase configuration - commented out for now
// const firebaseConfig = {
//   apiKey: "AIzaSyD YOUR_API_KEY", // You'll need to get this from Firebase console
//   authDomain: "your-project-id.firebaseapp.com",
//   projectId: "your-project-id",
//   storageBucket: "your-project-id.appspot.com",
//   messagingSenderId: "your-sender-id",
//   appId: "your-app-id"
// };

// Initialize Firebase - commented out for now
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

  const [userLogin, setUserLogin] = useState({ email: "", password: "" });
  const [passwordHide, setPasswordHide] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);
  const toastTimerRef = useRef(null);
  const [toast, setToast] = useState({ open: false, type: "info", text: "" });

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
        toastTimerRef.current = null;
      }
    };
  }, []);

  const normalizeToastType = (type) => {
    const t = String(type || "").toLowerCase();
    if (t === "success" || t === "ok") return "success";
    if (t === "error" || t === "fail" || t === "failed" || t === "danger") return "error";
    if (t === "warning" || t === "warn") return "warning";
    return "info";
  };

  const showToast = (type, text, duration = 3000) => {
    const normalizedType = normalizeToastType(type);
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
      toastTimerRef.current = null;
    }

    setToast({ open: true, type: normalizedType, text });

    toastTimerRef.current = setTimeout(() => {
      setToast((prev) => ({ ...prev, open: false }));
    }, duration);
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setUserLogin((prev) => ({ ...prev, [name]: value }));
  };

  const handleSendResetLink = async (e) => {
    e.preventDefault();
    if (forgotLoading) return;

    const email = String(forgotEmail || '').trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showToast('error', 'Please enter a valid email address.');
      return;
    }

    setForgotLoading(true);
    try {
      await axios.post('/postPerson/postProperty_forget', { email });
      showToast('success', 'Password reset link sent. Please check your email.');
      setShowForgot(false);
      setForgotEmail('');
    } catch (err) {
      showToast('error', err?.response?.data?.message || 'Failed to send reset link. Try again.');
    } finally {
      setForgotLoading(false);
    }
  };

  // Google Sign-In handler - commented out for now
  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      showToast('info', "Google sign-in is currently disabled");
      
      // TODO: Enable Firebase Google Sign-In when needed
      // Initialize Google Sign-In
      // const provider = new GoogleAuthProvider();
      // provider.setCustomParameters({
      //   client_id: '666295986601-f68ub4o5jo8f4vdhp2ad8nc5vn5c6q81.apps.googleusercontent.com'
      // });
      
      // Sign in with Google
      // const result = await signInWithPopup(auth, provider);
      // const user = result.user;
      
      // Get ID token and send to backend...
      
    } catch (error) {
      console.error("🚨 Google Sign-In error:", error);
      showToast('info', "Google sign-in is currently disabled");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUserLogin = async () => {
    console.log("🔍 Login button clicked, starting login process...");

    // Basic validation
    if (!userLogin.email || !userLogin.password) {
      showToast('error', 'Please enter both email and password');
      return;
    }

    setIsLoading(true);
    
    try {
      await login(userLogin);
      
      // Only show success toast if we're preventing redirect (modal mode)
      if (preventRedirect || inModal) {
        showToast('success', "Login successful!");
      }
      // If not preventing redirect, the AuthContext will handle navigation
    } catch (error) {
      console.error("🚨 Login error details:", error);
      console.error("🚨 Error message:", error?.message);
      console.error("🚨 Error response:", error?.response);
      
      // Extract error message from the error object
      const errorMessage = error?.message || "Invalid email or password. Please try again.";
      
      showToast('error', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

    return (
      <>
        {toast.open && (
          <div className="custom-toast-overlay" role="status" aria-live="polite">
            <div className={`custom-toast is-${toast.type}`}>
              <div className="custom-toast-text">
                <div className="custom-toast-title">{toast.type === "success" ? "Success" : toast.type === "error" ? "Error" : toast.type === "warning" ? "Warning" : "Info"}</div>
                <div>{toast.text}</div>
              </div>
              <button className="custom-toast-close" onClick={() => setToast((prev) => ({ ...prev, open: false }))} aria-label="Close">
                <X size={16} />
              </button>
            </div>
          </div>
        )}
        <div className={`relative p-4 md:p-6 ${inModal ? "w-full" : "max-sm:w-[85vw]"}`}>
          {/* Heading */}
          <div className="text-center mb-3">
            <h2 className="text-[24px] md:text-[28px] font-extrabold text-[#e53935] font-sans tracking-tight">Login to your account</h2>
            <div className="mt-1 flex justify-center">
              <span className="h-1 w-14 rounded-full bg-[#e53935]" />
            </div>
          </div>

          <form 
            className="space-y-3"
            onSubmit={(e) => {
              e.preventDefault(); // 🛑 stops page refresh
              handleUserLogin();  // 🧠 manually trigger login
            }}
          >
            {/* Email */}
            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm font-medium text-slate-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your gmail"
                className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#e53935] focus:border-[#e53935] transition"
                onChange={handleLoginChange}
              />
            </div>

          {/* Password */}
            <div className="flex flex-col">
              <label htmlFor="password" className="text-sm font-medium text-slate-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={passwordHide ? "password" : "text"}
                  name="password"
                  id="password"
                  placeholder="Enter Your Password"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[#e53935] focus:border-[#e53935] transition"
                  onChange={handleLoginChange}
                />
                {passwordHide ? (
                  <EyeOff size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 cursor-pointer" onClick={() => setPasswordHide(false)} />
                ) : (
                  <Eye size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-700 cursor-pointer" onClick={() => setPasswordHide(true)} />
                )}
              </div>
            </div>

            <div className="flex items-center justify-end">
              <button
                type="button"
                className="text-sm font-semibold text-[#e53935] hover:underline"
                onClick={() => setShowForgot((s) => !s)}
              >
                Forgot password?
              </button>
            </div>

            {showForgot && (
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <div className="text-sm font-semibold text-slate-800">Reset your password</div>
                <div className="mt-2 flex gap-2">
                  <input
                    type="email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#e53935] focus:border-[#e53935] transition"
                    disabled={forgotLoading}
                  />
                  <button
                    type="button"
                    onClick={handleSendResetLink}
                    disabled={forgotLoading}
                    className="px-4 py-2 rounded-lg bg-[#e53935] hover:bg-[#c62828] disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold transition"
                  >
                    {forgotLoading ? 'Sending…' : 'Send'}
                  </button>
                </div>
                <div className="mt-2 text-xs text-slate-600">
                  We’ll email you a secure link to set a new password.
                </div>
              </div>
            )}

            {/* Submit */}
            <button 
              type="submit"  // ✅ now it's a real form submission
              disabled={isLoading}
              className="w-full bg-[#e53935] hover:bg-[#c62828] disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold rounded-lg py-2.5 mt-1 shadow-sm hover:shadow-md transition"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>

            {/* Divider */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            {/* Google Sign-In Button */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2.5 hover:bg-gray-50 disabled:bg-gray-100 disabled:cursor-not-allowed transition"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-gray-700 font-medium">Continue with Google</span>
            </button>
          </form>

          {/* Footer */}
          <div className="mt-2 text-center text-sm text-slate-600">
            Don't have an account?{" "}
            <button className="text-[#e53935] font-semibold hover:underline" onClick={() => onSwitchToRegister && onSwitchToRegister()}>
              Register
            </button>
          </div>
        </div>
      </>
    );
  }

  export default LoginForm;
