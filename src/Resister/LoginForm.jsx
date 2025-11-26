import React, { useContext, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, EyeOff, X } from "lucide-react";
import { AuthContext } from "../AuthContext";

function LoginForm({ inModal = false, onSwitchToRegister, preventRedirect = false }) {
  const { login } = useContext(AuthContext);

  const [userLogin, setUserLogin] = useState({ email: "", password: "" });
  const [passwordHide, setPasswordHide] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setUserLogin((prev) => ({ ...prev, [name]: value }));
  };

  const handleUserLogin = async () => {
    console.log("🔍 Login button clicked, starting login process...");

    // Basic validation
    if (!userLogin.email || !userLogin.password) {
      toast.error("Please fill in all fields.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: { marginTop: '20px' },
      });
      return;
    }

    setIsLoading(true);
    
    try {
      await login(userLogin);
      
      // Only show success toast if we're preventing redirect (modal mode)
      if (preventRedirect || inModal) {
        toast.success("Login successful!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          style: { marginTop: '20px' },
        });
      }
      // If not preventing redirect, the AuthContext will handle navigation
      
    } catch (error) {
      console.error("🚨 Login error details:", error);
      console.error("🚨 Error message:", error?.message);
      console.error("🚨 Error response:", error?.response);
      
      // Extract error message from the error object
      const errorMessage = error?.message || "Invalid email or password. Please try again.";
      
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: { marginTop: '20px' },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
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

          {/* Submit */}
          <button 
            type="submit"  // ✅ now it's a real form submission
            disabled={isLoading}
            className="w-full bg-[#e53935] hover:bg-[#c62828] disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold rounded-lg py-2.5 mt-1 shadow-sm hover:shadow-md transition"
          >
            {isLoading ? "Logging in..." : "Login"}
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
      <ToastContainer />
    </>
  );
}

export default LoginForm;
