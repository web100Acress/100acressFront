import React, { useContext, useState } from "react";
import { message } from "antd";
import { Eye, EyeOff } from "lucide-react";
import { AuthContext } from "../AuthContext";

function LoginForm({ inModal = false, onSwitchToRegister }) {
  const { login } = useContext(AuthContext);
  const [messageApi, contextHolder] = message.useMessage();

  const [userLogin, setUserLogin] = useState({ email: "", password: "" });
  const [passwordHide, setPasswordHide] = useState(true);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setUserLogin((prev) => ({ ...prev, [name]: value }));
  };

  const handleUserLogin = async () => {
    try {
      await login(userLogin, messageApi);
    } catch (e) {
      // errors handled by AuthContext
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    handleUserLogin();
  };

  return (
    <>
      {contextHolder}
      <div className={`bg-white/95 shadow-[0_12px_32px_rgba(239,68,68,0.15)] rounded-2xl p-6 md:p-8 ${inModal ? "w-full" : "max-sm:w-[85vw]"}`}>
        {/* Heading */}
        <div className="text-center mb-4">
          <h2 className="text-[26px] md:text-[30px] font-extrabold text-[#e53935] font-sans tracking-tight">Login to your account</h2>
          <div className="mt-2 flex justify-center">
            <span className="h-1 w-14 rounded-full bg-[#e53935]" />
          </div>
        </div>

        <form className="space-y-3" onSubmit={handleClick}>
          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium text-slate-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="username@email.com"
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
                placeholder="********"
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
          <button type="submit" className="w-full bg-[#e53935] hover:bg-[#c62828] text-white font-bold rounded-lg py-2.5 mt-1 shadow-sm hover:shadow-md transition">
            Login
          </button>
        </form>

        {/* Footer */}
        <div className="mt-4 text-center text-sm text-slate-600">
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
