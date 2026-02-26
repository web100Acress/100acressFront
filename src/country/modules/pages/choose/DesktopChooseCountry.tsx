import { useState } from "react";
import { motion } from "framer-motion";

const countries = [
  {
    name: "India",
    code: "IN",
    flag: "🇮🇳",
    capital: "New Delhi",
    currency: "INR (₹)",
    gradient: "from-orange-500 via-white to-green-600",
    accent: "bg-orange-500",
    tagline: "Incredible India",
  },
  {
    name: "United Arab Emirates",
    code: "AE",
    flag: "🇦🇪",
    capital: "Abu Dhabi",
    currency: "AED (د.إ)",
    gradient: "from-green-600 via-white to-red-600",
    accent: "bg-emerald-600",
    tagline: "Spirit of the Union",
  },
  {
    name: "Sri Lanka",
    code: "LK",
    flag: "🇱🇰",
    capital: "Colombo",
    currency: "LKR (Rs)",
    gradient: "from-yellow-500 via-orange-400 to-red-700",
    accent: "bg-yellow-600",
    tagline: "Wonder of Asia",
  },
  {
    name: "United States",
    code: "US",
    flag: "🇺🇸",
    capital: "Washington, D.C.",
    currency: "USD ($)",
    gradient: "from-blue-600 via-white to-red-500",
    accent: "bg-blue-600",
    tagline: "Land of Opportunity",
  },
];

const Index = () => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="bg-white text-zinc-900 flex flex-col items-center px-4 py-3">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-400 mb-2 font-medium">
          Select Your Region
        </p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-zinc-900 to-zinc-500 bg-clip-text text-transparent">
          Choose Country
        </h1>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl w-full">
        {countries.map((country, i) => {
          const isSelected = selected === country.code;
          return (
            <motion.button
              key={country.code}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelected(country.code)}
              className={`relative group rounded-xl border transition-all duration-300 p-4 text-left cursor-pointer overflow-hidden ${
                isSelected
                  ? "border-zinc-300 bg-zinc-50 shadow-lg"
                  : "border-zinc-100 bg-white hover:border-zinc-200 hover:shadow-md"
              }`}
            >
              {/* Top gradient line */}
              <div
                className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${country.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${isSelected ? "!opacity-100" : ""}`}
              />

              {/* Flag */}
              <div className="text-4xl mb-3 drop-shadow-lg">{country.flag}</div>

              {/* Name */}
              <h2 className="text-base font-semibold text-zinc-900 mb-1 tracking-tight">
                {country.name}
              </h2>
              <p className="text-xs text-zinc-500 italic mb-3">
                {country.tagline}
              </p>

              {/* Details */}
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Capital</span>
                  <span className="text-zinc-700">{country.capital}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Currency</span>
                  <span className="text-zinc-700">{country.currency}</span>
                </div>
              </div>

              {/* Selected indicator */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-3 right-3 w-4 h-4 rounded-full bg-zinc-900 flex items-center justify-center"
                >
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M2 6L5 9L10 3"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* CTA */}
      {selected && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6"
        >
          <button className="px-6 py-2.5 rounded-full bg-zinc-900 text-white text-sm font-semibold hover:bg-zinc-800 transition-colors duration-200 tracking-wide">
            Continue →
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default Index;
