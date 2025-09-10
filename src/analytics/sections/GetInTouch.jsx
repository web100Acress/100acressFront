import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiPhone, FiMapPin, FiCheckCircle, FiArrowRight } from "react-icons/fi";

export default function GetInTouch() {
  // Reduced motion preference
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    try {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      const apply = () => setReducedMotion(!!mq.matches);
      apply();
      mq.addEventListener ? mq.addEventListener('change', apply) : mq.addListener(apply);
      return () => { mq.removeEventListener ? mq.removeEventListener('change', apply) : mq.removeListener(apply); };
    } catch {}
  }, []);

  // Lazy-load background image
  const [bgLoaded, setBgLoaded] = useState(false);
  useEffect(() => {
    const url = 'https://images.unsplash.com/photo-1505692794403-34d4982f88aa?q=80&w=1600&auto=format&fit=crop';
    const img = new Image();
    img.onload = () => setBgLoaded(true);
    img.src = url;
  }, []);
  const bgStyle = useMemo(() => {
    const baseGrad = 'linear-gradient(90deg, rgba(2,6,23,0.75) 0%, rgba(2,6,23,0.45) 50%, rgba(2,6,23,0.1) 100%)';
    const url = 'url(https://images.unsplash.com/photo-1505692794403-34d4982f88aa?q=80&w=1600&auto=format&fit=crop)';
    return { background: bgLoaded ? `${baseGrad}, ${url} center/cover` : baseGrad, transition: 'background-image 300ms ease' };
  }, [bgLoaded]);

  // Simple success toast
  const [toast, setToast] = useState("");
  const showToast = (msg) => {
    setToast(msg);
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => setToast(""), 2500);
  };

  return (
    <section className="mt-6 md:mt-10">
      <div className="max-w-screen-xl mx-auto px-4 md:px-6 md:pl-[260px]">
        <div
          className="relative rounded-2xl overflow-hidden"
          style={bgStyle}
        >
          {/* soft overlay for elegance */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/50 via-slate-900/30 to-transparent" />
          <div className="relative py-12 md:py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-10">

            {/* Card form */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.6 }}
              viewport={{ once: true }}
              className="backdrop-blur-md bg-white/10 text-white rounded-2xl p-6 md:p-8 shadow-[0_8px_35px_rgba(0,0,0,0.4)] max-w-md border border-white/20 ring-1 ring-white/10 hover:ring-white/20 transition"
            >
              <h3 className="text-2xl font-extrabold mb-2">Get in touch</h3>
              <p className="text-white/75 text-sm mb-6">
                Have a question or want to discuss a property? Fill out the form and we’ll get back to you.
              </p>

              <form onSubmit={(e) => { e.preventDefault(); showToast('Message sent successfully!'); }} className="space-y-4" aria-live="polite">
                <div className="relative">
                  <FiUser className="absolute left-3 top-3.5 text-gray-500" />
                  <input
                    className="w-full rounded-lg bg-white text-gray-900 pl-10 pr-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Your name"
                  />
                </div>
                <div className="relative">
                  <FiMail className="absolute left-3 top-3.5 text-gray-500" />
                  <input
                    className="w-full rounded-lg bg-white text-gray-900 pl-10 pr-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Your email"
                    type="email"
                  />
                </div>
                <div className="relative">
                  <FiPhone className="absolute left-3 top-3.5 text-gray-500" />
                  <input
                    className="w-full rounded-lg bg-white text-gray-900 pl-10 pr-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Your phone"
                  />
                </div>
                <textarea
                  className="w-full rounded-lg bg-white text-gray-900 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none h-28"
                  placeholder="Your message"
                />
                <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-4 py-2.5 rounded-lg shadow-lg transition-all inline-flex items-center justify-center gap-2">
                  Send message
                  <FiArrowRight className="opacity-90" />
                </button>
              </form>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.6 }}
              viewport={{ once: true }}
              className="text-white flex flex-col justify-center max-w-xl"
            >
              <h3 className="text-3xl md:text-4xl font-extrabold leading-tight">
                Putting a plan to action, <br /> to assure your satisfaction!
              </h3>
              <p className="mt-4 text-white/85 text-base max-w-lg">
                We help you make better property decisions with expert insights and personalized guidance. Your dream home is just a message away.
              </p>

              {/* Value bullets */}
              <ul className="mt-5 space-y-2 text-white/85 text-sm">
                <li className="flex items-start gap-2">
                  <FiCheckCircle className="mt-0.5 text-blue-400" />
                  Personalized project recommendations
                </li>
                <li className="flex items-start gap-2">
                  <FiCheckCircle className="mt-0.5 text-blue-400" />
                  Market-backed price and location insights
                </li>
                <li className="flex items-start gap-2">
                  <FiCheckCircle className="mt-0.5 text-blue-400" />
                  Dedicated assistance from inquiry to closing
                </li>
              </ul>

              {/* Contacts */}
              <div className="mt-6 space-y-2 text-sm text-white/85">
                <div className="flex items-center gap-2">
                  <span className="inline-flex w-7 h-7 items-center justify-center rounded-full bg-white/15 border border-white/20"><FiPhone /></span>
                  +91 98765 43210
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex w-7 h-7 items-center justify-center rounded-full bg-white/15 border border-white/20"><FiMail /></span>
                  contact@100acress.com
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex w-7 h-7 items-center justify-center rounded-full bg-white/15 border border-white/20"><FiMapPin /></span>
                  Gurgaon, Haryana, India
                </div>
              </div>
            </motion.div>

            {/* Toast */}
            {toast && (
              <div className="pointer-events-none fixed right-6 bottom-6 z-[9999]">
                <div className="bg-white text-gray-900 px-4 py-3 rounded-lg shadow-lg border border-gray-200 flex items-center gap-2">
                  <FiCheckCircle className="text-green-600" />
                  <span className="text-sm font-medium">{toast}</span>
                </div>
              </div>
            )}

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
