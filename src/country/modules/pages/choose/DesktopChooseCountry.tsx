import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChevronRight, ChevronLeft, Home } from "lucide-react";

const cities = [
  {
    name: "Atlanta, GA",
    image: "https://images.unsplash.com/photo-1575917649705-5b59aaa12e6b?w=600&q=80",
    path: "/country/usa/",
    testimonial: null,
    tall: true,
  },
  {
    name: "Scottsdale, AZ",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80",
    path: "/country/usa/",
    testimonial: {
      user: "Trulia User",
      location: "San Francisco Resident",
      text: "I just moved to the neighborhood 2 years ago and love it! It's a great mix of families, seniors and...",
    },
    tall: false,
  },
  {
    name: "Austin, TX",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80",
    path: "/country/usa/",
    testimonial: null,
    tall: false,
  },
  {
    name: "Scottsdale, AZ",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=80",
    path: "/country/usa/",
    testimonial: null,
    tall: false,
  },
  {
    name: "Boston, MA",
    image: "https://images.unsplash.com/photo-1600596542815-5b59aaa12e6b?w=600&q=80",
    path: "/country/usa/",
    testimonial: null,
    tall: false,
  },
  {
    name: "Oakland, CA",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80",
    path: "/country/usa/",
    testimonial: null,
    tall: true,
  },
  {
    name: "Sandy Springs, GA",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80",
    path: "/country/usa/",
    testimonial: null,
    tall: false,
  },
  {
    name: "Chicago, IL",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
    path: "/country/usa/",
    testimonial: {
      user: "Brianne",
      location: "Chicago Resident",
      text: "A good mix of young adults/good night life as well as families and family friendly activities...",
    },
    tall: false,
  },
  {
    name: "Carlsbad, CA",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80",
    path: "/country/usa/",
    testimonial: null,
    tall: false,
  },
  {
    name: "Newton, MA",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    path: "/country/usa/",
    testimonial: null,
    tall: false,
  },
  {
    name: "Philadelphia, PA",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&q=80",
    path: "/country/usa/",
    testimonial: null,
    tall: false,
  },
];

const countries = [
  {
    name: "India",
    code: "IN",
    flag: "🇮🇳",
    cities: ["Mumbai", "Delhi", "Bangalore", "Hyderabad"],
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=600&q=80",
    path: "/country/india/",
  },
  {
    name: "United Arab Emirates",
    code: "AE",
    flag: "🇦🇪",
    cities: ["Dubai", "Abu Dhabi", "Sharjah"],
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80",
    path: "/global/projects-in-dubai-uae/",
  },
  {
    name: "Sri Lanka",
    code: "LK",
    flag: "🇱🇰",
    cities: ["Colombo", "Kandy", "Galle"],
    image: "https://images.unsplash.com/photo-1596422847843-a4c93f9e0b9a?w=600&q=80",
    path: "/country/srilanka/",
  },
  {
    name: "United States",
    code: "US",
    flag: "🇺🇸",
    cities: ["New York", "Los Angeles", "Miami", "Chicago"],
    image: "https://images.unsplash.com/photo-1600596542815-5b59aaa12e6b?w=600&q=80",
    path: "/country/usa/",
  },
];

// ─── City Image Card ──────────────────────────────────────────────────────────
const CityImageCard = ({ city, onClick }: { city: typeof cities[0]; onClick: () => void }) => (
  <div
    onClick={onClick}
    className="relative w-full h-full overflow-hidden rounded-xl cursor-pointer group"
  >
    <img
      src={city.image}
      alt={city.name}
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
    <div className="absolute bottom-0 left-0 right-0 p-4">
      <h3 
        className="text-white font-black text-xl mb-2 m-0 overflow-hidden"
        style={{ 
          fontFamily: 'Georgia, "Times New Roman", serif',
          textShadow: '0 1px 5px rgba(0,0,0,0.7)',
          WebkitLineClamp: 4,
          maxHeight: '126px',
          lineHeight: '1.2'
        }}
      >
        {city.name}
      </h3>
      <button className="flex items-center gap-1.5 bg-white/95 hover:bg-white text-gray-700 text-[11px] font-medium px-3 py-1.5 rounded-md transition-all shadow-sm">
        <span>View Homes</span>
        <ChevronRight className="w-3.5 h-3.5" />
      </button>
    </div>
  </div>
);

// ─── Testimonial Card ─────────────────────────────────────────────────────────
const TestimonialCard = ({ city, onClick }: { city: typeof cities[0]; onClick: () => void }) => (
  <div
    onClick={onClick}
    className="relative w-full h-full rounded-xl overflow-hidden cursor-pointer group"
    style={{ background: '#2d5016' }}
  >
    {/* Subtle texture overlay */}
    <div className="absolute inset-0 opacity-10"
      style={{
        backgroundImage: `radial-gradient(circle at 20% 80%, rgba(255,255,255,0.15) 0%, transparent 50%)`,
      }}
    />
    <div className="relative p-5 h-full flex flex-col justify-between text-white">
      <div>
        <p className="font-bold text-sm mb-0.5">{city.testimonial!.user}</p>
        <p className="text-xs text-white/60 mb-4">{city.testimonial!.location}</p>
        <p className="text-sm leading-relaxed text-white/90">{city.testimonial!.text}</p>
      </div>
      <div className="flex items-center gap-1.5 text-[11px] font-medium text-white/90 hover:text-white transition-colors">
        <Home className="w-3.5 h-3.5" />
        <span>View Homes</span>
        <ChevronRight className="w-3 h-3" />
      </div>
    </div>
  </div>
);

// ─── Main ─────────────────────────────────────────────────────────────────────
const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scrollLeft = () => containerRef.current?.scrollBy({ left: -320, behavior: 'smooth' });
  const scrollRight = () => containerRef.current?.scrollBy({ left: 320, behavior: 'smooth' });

  return (
    <div className="bg-white min-h-screen">

      {/* ── Header ──────────────────────────────────────────────── */}
      <section className="px-4 text-center mt-[72px] mb-2">
        <motion.div 
          initial={{ opacity: 0, y: -16 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.55 }}
          className="mx-auto"
          style={{ maxWidth: '960px' }}
        >
          <h1
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-3"
            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
          >
            Explore homes on 100acress
          </h1>
          <p className="text-gray-500 mx-auto text-sm md:text-[15px] leading-relaxed">
            Take a deep dive and browse homes for sale, original neighborhood photos,
            resident reviews and local insights to find what is right for you.
          </p>
        </motion.div>
      </section>

      {/* ── Mosaic Grid (Trulia-style) ───────────────────────────── */}
      <section className="relative pb-16">
        <div className="w-full relative px-4">

          {/* Scroll arrows */}
          <button
            onClick={scrollLeft}
            className="absolute -left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center hover:shadow-xl transition-all"
          >
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </button>
          <button
            onClick={scrollRight}
            className="absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center hover:shadow-xl transition-all"
          >
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>

          {/* Scrollable row of column groups */}
          <div
            ref={containerRef}
            className="flex gap-3 overflow-x-auto pb-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {/* ── Col 1: Single tall card ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="flex-shrink-0 w-[320px] md:w-[240px] lg:w-[280px]"
              style={{ height: '480px' }}
            >
              <CityImageCard city={cities[0]} onClick={() => navigate(cities[0].path)} />
            </motion.div>

            {/* ── Col 2: Testimonial top + image bottom ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.05 }}
              className="flex-shrink-0 flex flex-col gap-3 w-[320px] md:w-[240px] lg:w-[280px]"
              style={{ height: '480px' }}
            >
              <div style={{ flex: 1 }}>
                <TestimonialCard city={cities[1]} onClick={() => navigate(cities[1].path)} />
              </div>
              <div style={{ flex: 1 }}>
                <CityImageCard city={cities[2]} onClick={() => navigate(cities[2].path)} />
              </div>
            </motion.div>

            {/* ── Col 3: image top + image bottom ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
              className="flex-shrink-0 flex flex-col gap-3 w-[320px] md:w-[240px] lg:w-[280px]"
              style={{ height: '480px' }}
            >
              <div style={{ flex: 1 }}>
                <CityImageCard city={cities[3]} onClick={() => navigate(cities[3].path)} />
              </div>
              <div style={{ flex: 1 }}>
                <CityImageCard city={cities[4]} onClick={() => navigate(cities[4].path)} />
              </div>
            </motion.div>

            {/* ── Col 4: Single tall card ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}
              className="flex-shrink-0 w-[320px] md:w-[240px] lg:w-[280px]"
              style={{ height: '480px' }}
            >
              <CityImageCard city={cities[5]} onClick={() => navigate(cities[5].path)} />
            </motion.div>

            {/* ── Col 5: Testimonial top + image bottom ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
              className="flex-shrink-0 flex flex-col gap-3 w-[320px] md:w-[240px] lg:w-[280px]"
              style={{ height: '480px' }}
            >
              <div style={{ flex: 1 }}>
                <CityImageCard city={cities[6]} onClick={() => navigate(cities[6].path)} />
              </div>
              <div style={{ flex: 1 }}>
                <TestimonialCard city={cities[7]} onClick={() => navigate(cities[7].path)} />
              </div>
            </motion.div>

            {/* ── Col 6: image top + image bottom ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }}
              className="flex-shrink-0 flex flex-col gap-3 w-[320px] md:w-[240px] lg:w-[280px]"
              style={{ height: '480px' }}
            >
              <div style={{ flex: 1 }}>
                <CityImageCard city={cities[8]} onClick={() => navigate(cities[8].path)} />
              </div>
              <div style={{ flex: 1 }}>
                <CityImageCard city={cities[9]} onClick={() => navigate(cities[9].path)} />
              </div>
            </motion.div>

            {/* ── Col 7: Single tall card ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
              className="flex-shrink-0 w-[320px] md:w-[240px] lg:w-[280px]"
              style={{ height: '480px' }}
            >
              <CityImageCard city={cities[10]} onClick={() => navigate(cities[10].path)} />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;