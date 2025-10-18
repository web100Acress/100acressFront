// src/components/RealEstateAssistPage/ProblemSelector.jsx
import { motion } from "framer-motion";
import { Home, DollarSign, Building2 } from "lucide-react";

const problems = [
  {
    id: 1,
    icon: <Home size={32} />,
    title: "I'm looking for the right property",
    desc: "We’ll match verified projects with your needs, fast.",
  },
  {
    id: 2,
    icon: <DollarSign size={32} />,
    title: "I want help with financing or legal issues",
    desc: "Expert advice to make your purchase safe and easy.",
  },
  {
    id: 3,
    icon: <Building2 size={32} />,
    title: "I want to sell or invest confidently",
    desc: "Get expert-backed strategies to maximize returns.",
  },
];

export default function ProblemSelector({ onSelect }) {
  console.log('🔧 ProblemSelector: component rendered');
  
  const handleProblemClick = (item) => {
    console.log('🎯 ProblemSelector: problem clicked:', item.title);
    onSelect(item);
  };
  
  return (
    <section className="w-full min-h-[60vh] flex flex-col items-center justify-center px-4 py-10 bg-gradient-to-b from-white to-gray-50">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-semibold mb-8 text-center"
      >
        What’s your property challenge right now?
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
        {problems.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleProblemClick(item)}
            className="cursor-pointer rounded-2xl bg-white p-6 shadow-md hover:shadow-xl border border-gray-100 transition-all duration-200"
          >
            <div className="text-orange-500 mb-3">{item.icon}</div>
            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-500 text-sm">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
