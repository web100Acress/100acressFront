import { useState, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChevronRight, ChevronLeft, Home, MapPin } from "lucide-react";

const cities = [
  {
    name: "Dubai, UAE",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=85",
    path: "/global/projects-in-dubai-uae/",
    testimonial: null,
    tall: true,
    count: "3,200+ homes",
  },
  {
    name: "London, UK",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=85",
    path: "/global/projects-in-london-uk/",
    testimonial: {
      user: "Sarah Mitchell",
      location: "London Resident",
      text: "London offers incredible diversity and world-class amenities. The property market here is dynamic and full of opportunities.",
    },
    tall: false,
    count: "5,800+ homes",
  },
  {
    name: "Colombo, Sri Lanka",
    image: "https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=800&q=85",
    path: "/global/projects-in-srilanka/",
    testimonial: null,
    tall: false,
    count: "1,200+ homes",
  },
  {
    name: "New York, NY",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=85",
    path: "/country/usa/",
    testimonial: {
      user: "Michael Chen",
      location: "NYC Resident",
      text: "New York City is the ultimate urban experience. From Central Park to Times Square, there's always something exciting happening.",
    },
    tall: false,
    count: "12,500+ homes",
  },
  {
    name: "Los Angeles, CA",
    image: "https://images.unsplash.com/photo-1580655653885-65763b2597d0?w=800&q=85",
    path: "/country/usa/",
    testimonial: null,
    tall: false,
    count: "8,300+ homes",
  },
  {
    name: "Miami, FL",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=85",
    path: "/country/usa/",
    testimonial: null,
    tall: false,
    count: "4,100+ homes",
  },
  {
    name: "Scottsdale, AZ",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=85",
    path: "/country/usa/",
    testimonial: {
      user: "Trulia User",
      location: "San Francisco Resident",
      text: "I just moved to the neighborhood 2 years ago and love it! It's a great mix of families, seniors and young professionals.",
    },
    tall: false,
    count: "1,890+ homes",
  },
  {
    name: "Austin, TX",
    image: "https://images.unsplash.com/photo-1531218150217-54595bc2b934?w=800&q=85",
    path: "/country/usa/",
    testimonial: null,
    tall: false,
    count: "3,120+ homes",
  },
 
  {
    name: "Oakland, CA",
    image: "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=800&q=85",
    path: "/country/usa/",
    testimonial: null,
    tall: true,
    count: "2,780+ homes",
  },
  {
    name: "Sandy Springs, GA",
    image: "https://images.unsplash.com/photo-1575917649705-5b59aaa12e6b?w=800&q=85",
    path: "/country/usa/",
    testimonial: null,
    tall: false,
    count: "980+ homes",
  },
  {
    name: "Chicago, IL",
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=85",
    path: "/country/usa/",
    testimonial: {
      user: "Brianne",
      location: "Chicago Resident",
      text: "A good mix of young adults, good night life, as well as families and family-friendly activities. Highly walkable with excellent transit.",
    },
    tall: false,
    count: "5,600+ homes",
  },
  {
    name: "Carlsbad, CA",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=85",
    path: "/country/usa/",
    testimonial: null,
    tall: false,
    count: "740+ homes",
  },
  {
    name: "Newton, MA",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=85",
    path: "/country/usa/",
    testimonial: null,
    tall: false,
    count: "1,100+ homes",
  },
  {
    name: "Philadelphia, PA",
    image: "https://images.unsplash.com/photo-1601332069658-f3e73a9d1e82?w=800&q=85",
    path: "/country/usa/",
    testimonial: null,
    tall: false,
    count: "6,300+ homes",
  },
];
// ─── City Image Card ──────────────────────────────────────────────────────────
const CityImageCard = ({ city, onClick }: { city: typeof cities[0]; onClick: () => void }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onClick={onClick}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative w-full h-full overflow-hidden rounded-2xl cursor-pointer"
      style={{
        boxShadow: hovered
          ? "0 24px 48px rgba(0,0,0,0.22), 0 8px 16px rgba(0,0,0,0.12)"
          : "0 4px 16px rgba(0,0,0,0.1), 0 1px 4px rgba(0,0,0,0.06)",
        transition: "box-shadow 0.4s ease",
      }}
    >
      {/* Image with zoom */}
      <motion.img
        src={city.image}
        alt={city.name}
        className="w-full h-full object-cover"
        animate={{ scale: hovered ? 1.07 : 1 }}
        transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
      />

      {/* Multi-layer gradient for deep, luxurious look */}
      <div className="absolute inset-0"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.28) 40%, rgba(0,0,0,0.04) 70%, transparent 100%)"
        }}
      />

      {/* Top badge - listing count */}
      <motion.div
        className="absolute top-3 left-3"
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : -6 }}
        transition={{ duration: 0.25 }}
      >
        <span className="text-[10px] font-semibold text-white/90 bg-black/30 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15 tracking-wide">
          {city.count}
        </span>
      </motion.div>

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="flex items-center gap-1 mb-1.5">
          <MapPin className="w-3 h-3 text-white/60" />
          <span className="text-[10px] text-white/60 font-medium tracking-widest uppercase">
            {city.name.split(",")[1]?.trim() || "USA"}
          </span>
        </div>
        <h3
          className="text-white font-black text-xl mb-3 leading-tight"
          style={{
            fontFamily: '"Playfair Display", Georgia, "Times New Roman", serif',
            textShadow: "0 2px 8px rgba(0,0,0,0.5)",
            WebkitLineClamp: 2,
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {city.name.split(",")[0]}
        </h3>

        <motion.button
          className="flex items-center gap-1.5 text-[11px] font-semibold px-3.5 py-2 rounded-lg transition-all tracking-wide"
          style={{
            background: hovered ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.92)",
            color: "#1a1a1a",
            boxShadow: hovered ? "0 4px 12px rgba(0,0,0,0.25)" : "0 2px 6px rgba(0,0,0,0.15)",
          }}
          animate={{ scale: hovered ? 1.03 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <span>View Homes</span>
          <motion.span animate={{ x: hovered ? 2 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronRight className="w-3.5 h-3.5" />
          </motion.span>
        </motion.button>
      </div>
    </motion.div>
  );
};

// ─── Testimonial Card ─────────────────────────────────────────────────────────
const TestimonialCard = ({ city, onClick }: { city: typeof cities[0]; onClick: () => void }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onClick={onClick}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative w-full h-full rounded-2xl overflow-hidden cursor-pointer"
      style={{
        background: "linear-gradient(135deg, #1e3a0f 0%, #2d5016 45%, #1a3310 100%)",
        boxShadow: hovered
          ? "0 24px 48px rgba(0,0,0,0.22), 0 8px 16px rgba(0,0,0,0.12)"
          : "0 4px 16px rgba(0,0,0,0.1), 0 1px 4px rgba(0,0,0,0.06)",
        transition: "box-shadow 0.4s ease",
      }}
    >
      {/* Organic light spot */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 15% 85%, rgba(120,200,60,0.12) 0%, transparent 60%), radial-gradient(ellipse at 80% 10%, rgba(255,255,255,0.06) 0%, transparent 50%)",
        }}
      />

      {/* Fine grain texture via pseudo */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      <div className="relative p-5 h-full flex flex-col justify-between">
        {/* Quote mark */}
        <div
          className="absolute top-3 right-4 text-6xl leading-none select-none pointer-events-none"
          style={{
            color: "rgba(255,255,255,0.07)",
            fontFamily: '"Playfair Display", Georgia, serif',
            fontStyle: "italic",
          }}
        >
          "
        </div>

        <div>
          {/* User info */}
          <div className="flex items-center gap-2.5 mb-4">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white"
              style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)" }}
            >
              {city.testimonial?.user?.charAt(0) || '?'}
            </div>
            <div>
              <p className="font-bold text-sm text-white leading-tight">{city.testimonial?.user || 'Anonymous'}</p>
              <p className="text-[10px] text-white/50 leading-tight">{city.testimonial?.location || 'Resident'}</p>
            </div>
          </div>

          {/* Quote */}
          <p
            className="text-sm leading-relaxed"
            style={{
              color: "rgba(255,255,255,0.82)",
              fontFamily: '"Playfair Display", Georgia, serif',
              fontStyle: "italic",
            }}
          >
            "{city.testimonial?.text || 'Great experience with this city!'}"
          </p>
        </div>

        {/* CTA */}
        <motion.div
          className="flex items-center gap-1.5 text-[11px] font-semibold text-white/80 mt-4 group"
          animate={{ x: hovered ? 3 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <Home className="w-3.5 h-3.5" />
          <span>View Homes in {city.name}</span>
          <ChevronRight className="w-3 h-3" />
        </motion.div>
      </div>
    </motion.div>
  );
};

// ─── Scroll Arrow Button ──────────────────────────────────────────────────────
const ScrollArrow = ({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick: () => void;
}) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className="absolute top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center"
    style={{
      left: direction === "left" ? "-16px" : "auto",
      right: direction === "right" ? "-16px" : "auto",
      background: "rgba(255,255,255,0.88)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      boxShadow: "0 4px 20px rgba(0,0,0,0.14), 0 1px 6px rgba(0,0,0,0.08)",
      border: "1px solid rgba(0,0,0,0.07)",
    }}
  >
    {direction === "left" ? (
      <ChevronLeft className="w-4 h-4 text-gray-700" />
    ) : (
      <ChevronRight className="w-4 h-4 text-gray-700" />
    )}
  </motion.button>
);

// ─── Column wrapper ───────────────────────────────────────────────────────────
const Col = ({
  children,
  delay = 0,
  single = false,
}: {
  children: React.ReactNode;
  delay?: number;
  single?: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    className={`flex-shrink-0 ${single ? "" : "flex flex-col gap-3"}`}
    style={{
      width: "clamp(240px, 22vw, 290px)",
      height: "auto", // Allow full height
      minHeight: single ? "520px" : "500px", // Minimum heights
    }}
  >
    {children}
  </motion.div>
);

// ─── Main ─────────────────────────────────────────────────────────────────────
const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scrollLeft = () =>
    containerRef.current?.scrollBy({ left: -310, behavior: "smooth" });
  const scrollRight = () =>
    containerRef.current?.scrollBy({ left: 310, behavior: "smooth" });

  const colData = [
    { type: "single", idx: [0] },
    { type: "double-tcard-img", idx: [1, 2] },
    { type: "double-img-img", idx: [3, 4] },
    { type: "single", idx: [5] },
    { type: "double-img-tcard", idx: [6, 7] },
    { type: "double-img-img", idx: [8, 9] },
    { type: "single", idx: [10] },
    { type: "double-img-img", idx: [11, 12] },
    { type: "single", idx: [13] },
  ];

  return (
    <div className="bg-white min-h-screen" style={{ fontFamily: "system-ui, sans-serif" }}>

      {/* ── Header ──────────────────────────────────────────────── */}
      <section className="px-6 text-center mt-[72px] mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto"
          style={{ maxWidth: "700px" }}
        >
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-[11px] font-bold tracking-[0.18em] uppercase mb-3"
            style={{ color: "#3a7d1a" }}
          >
            Real Estate Discovery
          </motion.p>

          <h1
            className="text-4xl md:text-5xl font-black text-gray-900 mb-4 leading-tight"
            style={{
              fontFamily: '"Playfair Display", Georgia, "Times New Roman", serif',
              letterSpacing: "-0.02em",
            }}
          >
            Find Your Next Home
          </h1>

          <p className="text-gray-500 mx-auto text-sm md:text-base leading-relaxed" style={{ maxWidth: "480px" }}>
            Browse homes for sale, discover neighborhoods, read resident reviews,
            and find exactly the right place for your next chapter.
          </p>

          {/* Subtle divider */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="h-px bg-gray-200 flex-1" style={{ maxWidth: "80px" }} />
            <span className="text-xs text-gray-400 font-medium tracking-widest uppercase">Explore Cities</span>
            <div className="h-px bg-gray-200 flex-1" style={{ maxWidth: "80px" }} />
          </div>
        </motion.div>
      </section>

      {/* ── Mosaic Grid ─────────────────────────────────────────── */}
      <section className="relative pb-20">
        <div className="w-full relative px-6">

          {/* Edge fade masks */}
          <div
            className="absolute left-0 top-0 bottom-0 w-8 pointer-events-none z-10"
            style={{
              background: "linear-gradient(to right, rgba(255,255,255,0.95), transparent)",
            }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-8 pointer-events-none z-10"
            style={{
              background: "linear-gradient(to left, rgba(255,255,255,0.95), transparent)",
            }}
          />

          {/* Scroll arrows */}
          <ScrollArrow direction="left" onClick={scrollLeft} />
          <ScrollArrow direction="right" onClick={scrollRight} />

          {/* Scrollable row - Full height visible */}
          <div
            ref={containerRef}
            className="flex gap-3 overflow-x-auto pb-4 pt-2"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
              height: "auto", // Allow full height
              minHeight: "520px", // Minimum height to show full cards
            }}
          >
            {/* Col 1 – single tall */}
            <Col delay={0} single>
              <CityImageCard city={cities[0]} onClick={() => navigate(cities[0].path)} />
            </Col>

            {/* Col 2 – testimonial + image */}
            <Col delay={0.06}>
              <div style={{ flex: 1 }}>
                <TestimonialCard city={cities[1]} onClick={() => navigate(cities[1].path)} />
              </div>
              <div style={{ flex: 1 }}>
                <CityImageCard city={cities[2]} onClick={() => navigate(cities[2].path)} />
              </div>
            </Col>

            {/* Col 3 – image + image */}
            <Col delay={0.12}>
              <div style={{ flex: 1 }}>
                <CityImageCard city={cities[3]} onClick={() => navigate(cities[3].path)} />
              </div>
              <div style={{ flex: 1 }}>
                <CityImageCard city={cities[4]} onClick={() => navigate(cities[4].path)} />
              </div>
            </Col>

            {/* Col 4 – single tall */}
            <Col delay={0.18} single>
              <CityImageCard city={cities[5]} onClick={() => navigate(cities[5].path)} />
            </Col>

            {/* Col 5 – image + testimonial */}
            <Col delay={0.24}>
              <div style={{ flex: 1 }}>
                <CityImageCard city={cities[6]} onClick={() => navigate(cities[6].path)} />
              </div>
              <div style={{ flex: 1 }}>
                <TestimonialCard city={cities[7]} onClick={() => navigate(cities[7].path)} />
              </div>
            </Col>

            {/* Col 6 – image + image */}
            <Col delay={0.3}>
              <div style={{ flex: 1 }}>
                <CityImageCard city={cities[8]} onClick={() => navigate(cities[8].path)} />
              </div>
              <div style={{ flex: 1 }}>
                <CityImageCard city={cities[9]} onClick={() => navigate(cities[9].path)} />
              </div>
            </Col>

            {/* Col 7 – single tall */}
            <Col delay={0.36} single>
              <CityImageCard city={cities[10]} onClick={() => navigate(cities[10].path)} />
            </Col>

            {/* Col 8 – image + image */}
            <Col delay={0.42}>
              <div style={{ flex: 1 }}>
                <CityImageCard city={cities[11]} onClick={() => navigate(cities[11].path)} />
              </div>
              <div style={{ flex: 1 }}>
                <CityImageCard city={cities[12]} onClick={() => navigate(cities[12].path)} />
              </div>
            </Col>

            {/* Col 9 – single tall */}
            <Col delay={0.48} single>
              <CityImageCard city={cities[13]} onClick={() => navigate(cities[13].path)} />
            </Col>
          </div>
        </div>

        {/* Bottom hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center text-xs text-gray-400 mt-5 tracking-wide"
        >
          Scroll to discover more cities →
        </motion.p>
      </section>
    </div>
  );
};

export default Index;