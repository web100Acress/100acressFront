import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const ForgetPassword = () => {
  const history = useNavigate();
  const [newPassword, setNewPassword] = useState({
    password: "",
    cpassword: "",
  });

  const handleRegisterNow = () => {
    history("/SignUP");
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
      if (!token) {
        console.error('Token not found in URL parameters');
        return;
      }
      if (password === cpassword) {
        const apiUrl = `https://acre.onrender.com/postPerson/reset/${token.token}`;
        console.log(apiUrl.message)
        const response = await axios.post(apiUrl, {
          password: password,
          cpassword: cpassword,
        });
        console.log(response.data);
        alert('Password updated');
        history('/SignIn')
      } else {
        console.error('Passwords do not match');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      {console.log(newPassword)}
      <div className="w-screen h-72 bg-red-600 relative">
        <>
          <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl absolute top-1/2 mt-48 left-1/2 transform -translate-x-2/4 -translate-y-2/4 shadow shadow-slate-300">
            <h1 className="text-4xl font-medium">Reset password</h1>
            <p className="text-slate-500">Set new password</p>
            <form action="" className="my-1">
              <div className="flex flex-col space-y-5">
                <label>
                  <input
                    type="password"
                    name="password"
                    value={newPassword.password}
                    onChange={handleNewPasswordChange}
                    className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                    placeholder="New Password"
                  />
                  <input
                    type="password"
                    name="cpassword"
                    value={newPassword.cpassword}
                    onChange={handleNewPasswordChange}
                    className="w-full py-3 my-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                    placeholder="Confirm New Password"
                  />
                </label>
                <button
                  className="w-full py-2 font-medium text-white bg-red-600 hover:bg-red-500 rounded-lg border-red-500 hover:shadow inline-flex space-x-2 items-center justify-center"
                  onClick={handleUserPasswordUpdated}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                    />
                  </svg>
                  <span>Password updated</span>
                </button>
                <p className="text-center">
                  Not registered yet?{" "}
                  <a
                    href="#"
                    className="text-red-600 font-medium inline-flex space-x-1 items-center"
                  >
                    <button onClick={handleRegisterNow}>
                      <span>Register now </span>
                    </button>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </span>
                  </a>
                </p>
              </div>
            </form>
          </div>
        </>
      </div>
    </div>
  );
};

export default ForgetPassword;
