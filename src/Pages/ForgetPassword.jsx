import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ForgetPassword = () => {
  const history = useNavigate();
  const [newPassword, setNewPassword] = useState({
    password: "",
    cpassword: "",
  });

  const handleRegisterNow = () => {
    history("/auth/signup");
  };

  

  const handleNewPasswordChange = (e) => {
    const { name, value } = e.target;
    setNewPassword({ ...newPassword, [name]: value });
  };
  const token  = useParams();

  const handleUserPasswordUpdated = async (e) => {
    e.preventDefault();

    const { password, cpassword } = newPassword; 
    try {
      if (!token?.token) {
        toast.error('Reset link is invalid or expired.', { position: 'top-center', autoClose: 3500 });
        return;
      }

      if (!password || !cpassword) {
        toast.error('Please enter and confirm your new password.', { position: 'top-center', autoClose: 3500 });
        return;
      }

      if (password !== cpassword) {
        toast.error('Passwords do not match.', { position: 'top-center', autoClose: 3500 });
        return;
      }

      const apiUrl = `/postPerson/reset/${token.token}`;
      const response = await axios.post(apiUrl, {
        password: password,
        cpassword: cpassword,
      });

      toast.success(response?.data?.message || 'Password reset successful', {
        position: 'top-center',
        autoClose: 2500,
      });

      setTimeout(() => {
        history('/auth/signin');
      }, 800);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to reset password. Try again.', {
        position: 'top-center',
        autoClose: 4000,
      });
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-red-600 via-red-600 to-white">
      <ToastContainer />

      <div className="mx-auto flex min-h-screen w-full max-w-6xl items-center justify-center px-4 py-10">
        <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-[0_12px_36px_rgba(15,23,42,0.18)] md:p-8">
          <h1 className="text-3xl font-extrabold text-slate-900">Reset password</h1>
          <p className="mt-1 text-sm text-slate-600">Set a new password for your account</p>

          <form action="" className="mt-5" onSubmit={handleUserPasswordUpdated}>
            <div className="flex flex-col space-y-4">
              <label>
                <input
                  type="password"
                  name="password"
                  value={newPassword.password}
                  onChange={handleNewPasswordChange}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="New Password"
                />
                <input
                  type="password"
                  name="cpassword"
                  value={newPassword.cpassword}
                  onChange={handleNewPasswordChange}
                  className="mt-3 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Confirm New Password"
                />
              </label>

              <button
                type="submit"
                className="w-full rounded-xl bg-red-600 py-3 font-bold text-white shadow-sm transition hover:bg-red-500 hover:shadow"
              >
                Password updated
              </button>

              <p className="text-center text-sm text-slate-600">
                Not registered yet?{" "}
                <button
                  type="button"
                  onClick={handleRegisterNow}
                  className="font-semibold text-red-600 hover:underline"
                >
                  Register now
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
