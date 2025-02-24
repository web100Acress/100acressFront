import React, { useState } from "react";
import axios from "axios";
import {message} from "antd";
import { useNavigate } from "react-router-dom";
const ResetEmailPassword = () => {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [messageApi,contextHolder] = message.useMessage();

  const apiUrl = "https://api.100acress.com/postPerson/postProperty_forget";


  const handleForgetPassword = async (e) => {
    e.preventDefault();
    try {
      if(!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)){
        messageApi.open({
          key:"EmailVerificationOTPLoading",
          type: "error",
          content: "This is not a valid Email Address. Kindly Enter a valid Email Address.",
          duration: 1.5,
        })
        return;
      }

      messageApi.open({
        key:"PasswordResetLoading",
        type: "loading",
        content: "Sending password reset link...",
        duration: 3,
      });

      const resetToken = generateResetToken();
      const response = await axios.post(apiUrl, {
        email: email,
        resetToken: resetToken,
      });
      if (response.status === 200) {
        messageApi.destroy("PasswordResetLoading");
        messageApi.open({
          key:"PasswordResetSuccess",
          type: "success",
          content: "Password reset link sent successfully",
          duration: 3,
        });
      }
    } catch (error) {
      // alert("Please enter a registered email");
      messageApi.destroy("PasswordResetLoading");
      messageApi.open({
        key:"PasswordResetError",
        type: "error",
        content: "Error sending password reset link",
        duration: 3,
      });
    }
  };

  const generateResetToken = () => {
    // Logic to generate a reset token (optional, you can generate it on the server)
    // Example: return some unique identifier or use a library like uuid
    return "example-reset-token";
  };

  return (
    <div >
      {contextHolder}
      <div className="w-screen h-72 bg-red-600 relative">
        <>
          <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl absolute top-1/2 mt-48 left-1/2 transform -translate-x-2/4 -translate-y-2/4 shadow shadow-slate-300">
            <h1 className="text-3xl font-semibold">Forget password</h1>
            <form action="" className="my-1">
              <div className="flex flex-col space-y-5">
                <label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full py-2 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                    placeholder="Enter Your Email Address"
                  />
                </label>

                <button
                  onClick={handleForgetPassword}
                  className="w-full md:w-auto py-2 px-4 md:ml-2 font-medium text-white bg-red-600 hover:bg-red-500 rounded-lg border-red-500 hover:shadow inline-flex space-x-2 items-center justify-center"
                >
                  <span>
                    SEND PASSWORD RESET INSTRUCTIONS
                  </span>
                </button>
              </div>
            </form>
          </div>
        </>
      </div>
    </div>
  );
};

export default ResetEmailPassword;
