import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, TrendingUp, Clock, FileText, Calculator } from "lucide-react";

const LimitedTimeOfferOverlay = ({ isVisible, onClose }) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 12,
    minutes: 45,
    seconds: 30,
  });

  useEffect(() => {
    if (!isVisible) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const totalSeconds =
          prev.hours * 3600 + prev.minutes * 60 + prev.seconds - 1;

        if (totalSeconds <= 0) {
          clearInterval(timer);
          return { hours: 0, minutes: 0, seconds: 0 };
        }

        return {
          hours: Math.floor(totalSeconds / 3600),
          minutes: Math.floor((totalSeconds % 3600) / 60),
          seconds: totalSeconds % 60,
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isVisible]);

  const formatTime = (value) => value.toString().padStart(2, "0");

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />

          {/* Overlay Below Navbar */}
          <motion.div
            className="campaign-overlay fixed left-1/2 -translate-x-1/2 z-50 w-[75vw] max-w-3xl"
            style={{
              top: "60px", // 👈 Adjust according to navbar height
            }}
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30,
              duration: 0.4 
            }}
          >
            <div className="relative flex flex-col md:flex-row bg-black text-white rounded-xl overflow-hidden shadow-2xl h-[280px]">

              {/* LEFT IMAGE */}
              <div className="md:w-1/3 h-full relative">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
                  alt="Property"
                  className="w-full h-full object-cover"
                  style={{ height: '280px' }}
                />
                <div className="absolute inset-0 bg-black/40 flex items-end p-3">
                  <div>
                    <h2 className="text-lg font-bold">
                      Prime Investment
                    </h2>
                    <p className="text-white/80 text-xs">
                      High ROI • Prime Location
                    </p>
                  </div>
                </div>
              </div>

              {/* RIGHT CONTENT */}
              <div className="md:w-2/3 p-6 flex flex-col justify-between">

                <div>
                  <div className="inline-flex items-center gap-2 bg-red-600 px-3 py-1 rounded-full text-xs font-bold mb-3">
                    <TrendingUp size={14} />
                    LIMITED OFFER
                  </div>

                  <h1 className="text-lg font-black mb-3">
                    Invest Today. <span className="text-red-400">Secure Tomorrow.</span>
                  </h1>

                  {/* ROI and Payment Plan */}
                  <div className="flex gap-3 mb-3">
                    {/* ROI */}
                    <div className="bg-white/10 rounded-lg p-3 text-sm flex-1">
                      <div className="flex items-center gap-2">
                        <TrendingUp
                          className="text-green-400"
                          size={20}
                        />
                        <div>
                          <div className="font-bold text-green-400">
                            18–22% ROI
                          </div>
                          <div className="text-white/70 text-xs">
                            Expected Returns
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Payment Plan */}
                    <div className="bg-white/10 rounded-lg p-3 text-sm flex-1">
                      <div className="text-center">
                        <div className="font-bold text-red-400 text-xs mb-1">
                          Payment Plan
                        </div>
                        <div className="grid grid-cols-3 gap-1 text-xs">
                          <div>
                            <div className="font-bold text-red-400">
                              10%
                            </div>
                            <div className="text-white/70">Booking</div>
                          </div>
                          <div>
                            <div className="font-bold text-red-400">
                              40%
                            </div>
                            <div className="text-white/70">60 Days</div>
                          </div>
                          <div>
                            <div className="font-bold text-red-400">
                              50%
                            </div>
                            <div className="text-white/70">Possession</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CTA Button and Timer - Parallel */}
                  <div className="flex gap-3">
                    {/* Timer */}
                    <div className="flex gap-1 flex-1">
                      {Object.entries(timeLeft).map(
                        ([unit, value]) => (
                          <div
                            key={unit}
                            className="bg-red-600 px-2 py-2 rounded text-center text-xs flex-1"
                          >
                            <div className="font-bold">
                              {formatTime(value)}
                            </div>
                            {unit}
                          </div>
                        )
                      )}
                    </div>

                    {/* CTA Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-red-600 hover:bg-red-700 py-2 px-4 rounded-lg font-bold transition flex items-center justify-center gap-2 text-sm whitespace-nowrap"
                    >
                      <FileText size={16} />
                      Get Brochure
                    </motion.button>
                  </div>
                </div>
                </div>

              {/* Close */}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 text-white/80 hover:text-white"
              >
                <X size={22} />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LimitedTimeOfferOverlay;
