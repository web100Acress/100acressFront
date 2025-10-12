// src/components/RealEstateAssistPage/SolutionInfo.jsx
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";

const solutionContent = {
  "I'm looking for the right property": {
    title: "We’ll help you find your dream property — fast.",
    desc: "Our experts shortlist verified projects based on your budget, location, and preferences. We’ll take care of the research and connect you with trusted builders and listings.",
  },
  "I want help with financing or legal issues": {
    title: "Buying property doesn’t have to be stressful.",
    desc: "Our finance and legal experts simplify everything — from loan approvals to document verification — so you can buy with full confidence.",
  },
  "I want to sell or invest confidently": {
    title: "We make selling or investing smarter and safer.",
    desc: "Our consultants evaluate your property’s market worth, guide you on timing, and help you find genuine buyers or investment opportunities that deliver returns.",
  },
};

export default function SolutionInfo({ selectedProblem, onNext, onBack }) {
  console.log('📝 SolutionInfo: component rendered with problem:', selectedProblem);
  
  if (!selectedProblem) {
    console.log('⚠️ SolutionInfo: no problem selected, returning null');
    return null;
  }

  const { title, desc } = solutionContent[selectedProblem.title] || {};
  console.log('📝 SolutionInfo: solution content:', { title, desc });

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full flex flex-col items-center justify-center px-6 py-10 bg-white border-t border-gray-100"
    >
      <div className="max-w-3xl text-center relative">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">{title}</h2>
        <p className="text-gray-600 mb-8 leading-relaxed">{desc}</p>

        <div className="flex justify-center items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              console.log('⬅️ SolutionInfo: back button clicked');
              onBack();
            }}
            className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-800 rounded-xl font-medium shadow-md hover:bg-gray-300 transition-all"
          >
            <ArrowLeft size={18} /> Back
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              console.log('➡️ SolutionInfo: next button clicked');
              onNext();
            }}
            className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-xl font-medium shadow-md hover:bg-orange-600 transition-all"
          >
            Talk to an Expert <ArrowRight size={18} />
          </motion.button>
        </div>
      </div>
    </motion.section>
  );
}
