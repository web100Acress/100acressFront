import { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import api from "../config/apiClient";
import { Input ,message} from 'antd';
import FinalNavBar from "./HomePageComponents/NavBar";
import Footer from "./Actual_Components/Footer";

function EmailVerification() {

  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const history = useNavigate();
  const [messageApi,contextHolder] = message.useMessage();

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const qEmail = params.get('email');
      if (qEmail && qEmail.trim()) {
        setEmail(qEmail.trim());
      }
    } catch {
      // ignore
    }
  }, []);

  const handleSendOTP = () => {
    if (isSending) return;
    if(email.length === 0){
      messageApi.open({
        key:"EmailVerificationOTPError",
        type: "error",
        content: "Please enter a valid Email",
        duration: 3,
      });
      return;
    }
    if(email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)){

      messageApi.open({
        key:"EmailVerificationOTPLoading",
        type: "loading",
        content: "Sending OTP...",
        duration: 3,
      });

      setIsSending(true);

      api.post("/postPerson/verifyEmail", { email: email })
      .then((res) => {
        // Store email in localStorage for OTP verification
        localStorage.setItem("userEmail", email);

        messageApi.destroy("EmailVerificationOTPLoading");
        messageApi.open({
          key:"OtpSent",
          type: "success",
          content: "OTP sent successfully",
          duration: 3,
        });
        history("/auth/signup/otp-verification/");

      })
      .catch((err) => {

        if(err.response?.status === 409){
          // Store email in localStorage even if OTP was already sent
          localStorage.setItem("userEmail", email);

          messageApi.destroy("EmailVerificationOTPLoading");
          messageApi.open({
            key:"OtpAlreadySent",
            type: "success",
            content: "OTP already sent. Redirecting to OTP verification page",
            duration: 2,
          });
          // Navigate after a short delay
          setTimeout(() => {
            history("/auth/signup/otp-verification/");
          }, 1000);
        }
        else{
          messageApi.open({
            key:"EmailVerificationOTPError",
            type: "error",
            content: "Error sending OTP",
            duration: 3,
          });
        }
      })
      .finally(() => {
        setIsSending(false);
      });
    }
    else{
      messageApi.open({
        key:"EmailVerificationOTPError",
        type: "error",
        content: "Please enter a valid Email",
        duration: 3,
      });
    }
  }

  const onChange = (value) => {
      setEmail(value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    handleSendOTP();
  }

  return (
    <>
      {contextHolder}
      <FinalNavBar />
      <main className="min-h-[calc(100vh-120px)] bg-[#f7f7f7]">
        <div className="mx-auto w-full max-w-7xl px-4 py-10">
          <div className="mx-auto w-full max-w-md">
            <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-white shadow-2xl">
              <div className="absolute inset-0 opacity-60" style={{ background: 'radial-gradient(650px circle at 15% 0%, rgba(229,57,53,0.10), transparent 55%), radial-gradient(650px circle at 85% 100%, rgba(34,197,94,0.10), transparent 55%)' }} />

              <div className="relative p-8 sm:p-10">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/[0.03] px-3 py-1 text-xs font-semibold tracking-wide text-black/70">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    Secure Verification
                  </div>
                  <div className="text-xs text-black/45">100acress</div>
                </div>

                <div className="mt-6">
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#111]">
                    Verify your email
                  </h1>
                  <p className="mt-2 text-sm leading-relaxed text-black/60">
                    Enter your email to receive a 6-digit OTP. This keeps your account protected and unlocks posting your property.
                  </p>
                </div>

                <form className="mt-7 space-y-5" onSubmit={handleClick}>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-black/60">
                      Email address
                    </label>
                    <div className="mt-2">
                      <Input
                        type="email"
                        size="large"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => onChange(e.target.value)}
                        disabled={isSending}
                        className="w-full"
                      />
                    </div>
                    <p className="mt-2 text-xs text-black/50">
                      We’ll send the code to this email. Please check your inbox and spam folder.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isSending}
                    className={`w-full rounded-2xl px-5 py-3 text-sm font-semibold text-white transition-all duration-200 ${
                      isSending
                        ? 'cursor-not-allowed bg-black/20'
                        : 'bg-gradient-to-r from-[#e53935] via-[#d32f2f] to-[#b71c1c] hover:brightness-110 shadow-lg shadow-red-500/20'
                    }`}
                    onClick={handleClick}
                  >
                    {isSending ? 'Sending OTP…' : 'Get OTP'}
                  </button>

                  <div className="rounded-2xl border border-black/10 bg-black/[0.02] p-4">
                    <div className="text-xs font-semibold text-black/70">Next step</div>
                    <div className="mt-1 text-xs leading-relaxed text-black/60">
                      After OTP verification, you’ll receive the Post Property link and can continue to your dashboard.
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <p className="mt-6 text-center text-xs text-black/45">
              Protected by secure verification technology
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default EmailVerification;