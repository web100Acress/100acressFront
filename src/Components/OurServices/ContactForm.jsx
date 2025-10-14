// src/components/RealEstateAssistPage/ContactForm.jsx
import { motion, AnimatePresence } from "framer-motion";
import { Send, Phone, MessageCircle, CheckCircle2, ArrowLeft } from "lucide-react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import api from "../../config/apiClient";

export default function ContactForm({ selectedProblem, onBack }) {
  console.log('📝 ContactForm: component rendered with problem:', selectedProblem);
  
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const contextQuestions = {
    "I'm looking for the right property":
      "What kind of property are you looking for? (e.g., 2BHK in Gurgaon)",
    "I want help with financing or legal issues":
      "Briefly describe the issue or assistance you need",
    "I want to sell or invest confidently":
      "What property or investment are you considering?",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log('✏️ ContactForm: field changed:', name, '=', value);
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('🚀 ContactForm: form submission started');
    
    const { name, phone, email, message } = formData;
    console.log('📝 ContactForm: form data:', { name, phone, email, message });

    if (!name.trim() || !phone.trim() || !email.trim()) {
      console.log('⚠️ ContactForm: validation failed - missing required fields');
      toast.error("Please fill in all required fields.");
      return;
    }

    const payload = {
      name: name.trim(),
      mobile: phone.trim(),
      email: email.trim(),
      projectName: `Real Estate Assist: ${selectedProblem?.title || 'General Inquiry'}`,
      address: message.trim(),
      source: "real_estate_assist_form",
    };
    
    console.log('📦 ContactForm: API payload:', payload);
    toast.loading("Submitting...");

    try {
      console.log('🌐 ContactForm: making API call to /userInsert');
      const response = await api.post("/userInsert", payload);
      console.log('✅ ContactForm: API call successful:', response.data);

      toast.dismiss();
      toast.success("Request sent successfully!");
      setSubmitted(true);
      console.log('🎉 ContactForm: form submitted successfully');
    } catch (err) {
      console.error(' ContactForm: API call failed:', err);
      console.error(' ContactForm: error response:', err.response);
      
      toast.dismiss();
      const errorMsg = err?.response?.data?.message || err?.message || "Failed to submit. Please try again.";
      console.log('⚠️ ContactForm: showing error message:', errorMsg);
      toast.error(errorMsg);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full flex justify-center bg-gradient-to-b from-gray-50 to-white py-12 px-4 border-t border-gray-100 relative"
    >
      <Toaster position="top-center" />
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8 border border-gray-100 relative overflow-hidden">
        {/* Animated progress bar */}
        <div className="absolute top-0 left-0 h-1 bg-orange-500 w-full rounded-t-2xl animate-[grow_1.5s_ease-out_forwards]" />
        <style>{`
          @keyframes grow {
            from { width: 0%; }
            to { width: 100%; }
          }
        `}</style>

        <AnimatePresence>
          {!submitted ? (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.h2
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-2xl font-semibold text-center mb-2"
              >
                Step 3 of 3 — Let’s Connect
              </motion.h2>
              <p className="text-center text-gray-500 mb-6 text-sm">
                Share your details and our team will contact you shortly.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {contextQuestions[selectedProblem?.title] || "Tell us more"}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="3"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 outline-none resize-none"
                ></textarea>
              </div>

              <div className="flex items-center justify-center gap-4">
                 <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    console.log('⬅️ ContactForm: back button clicked');
                    onBack();
                  }}
                  type="button"
                  className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-800 rounded-xl font-medium shadow-md hover:bg-gray-300 transition-all"
                >
                  <ArrowLeft size={18} /> Back
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full flex justify-center items-center gap-2 py-3 bg-orange-500 text-white rounded-xl font-medium shadow-md hover:bg-orange-600 transition-all"
                >
                  Send Request <Send size={18} />
                </motion.button>
              </div>

              <p className="text-center text-xs text-gray-400 mt-6">
                We value your privacy — no spam, just real assistance.
              </p>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center py-10 text-center"
            >
              <CheckCircle2 size={64} className="text-green-500 mb-4" />
              <h3 className="text-2xl font-semibold mb-2 text-gray-800">
                Request Submitted ✅
              </h3>
              <p className="text-gray-600 max-w-md mb-6">
                Thank you for sharing your details! Our consultant will reach out to assist you shortly.
              </p>

              <div className="flex gap-4">
                <a
                  href="https://wa.me/918500900100"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-green-500 text-white px-5 py-2 rounded-lg shadow hover:bg-green-600 transition-all"
                >
                  <MessageCircle size={18} /> WhatsApp
                </a>
                <a
                  href="tel:9355990063"
                  className="flex items-center gap-2 bg-blue-500 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-600 transition-all"
                >
                  <Phone size={18} /> Call Now
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
