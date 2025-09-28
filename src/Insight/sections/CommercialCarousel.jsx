import React, { useMemo, useRef, useState, useEffect } from "react";

export default function CommercialCarousel({
  title = "Commercial property",
  subtitle = "Explore premium office & retail spaces curated for modern businesses",
  items,
}) {
  const localItems =
    items || [
      {
        id: 1,
        status: "For sale",
        color: "bg-green-500",
        title: "Cyber City Office",
        price: 560000,
        img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1400&q=80",
      },
      {
        id: 2,
        status: "For rent",
        color: "bg-purple-500",
        title: "Sohna Road Retail",
        price: 4800,
        rent: true,
        img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=80",
      },
      {
        id: 3,
        status: "For sale",
        color: "bg-green-500",
        title: "Golf Course Rd Office",
        price: 420000,
        img: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1400&q=80",
      },
      {
        id: 4,
        status: "For sale",
        color: "bg-green-500",
        title: "Noida Sec 62 IT Space",
        price: 390000,
        img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80",
      },
      {
        id: 5,
        status: "For rent",
        color: "bg-purple-500",
        title: "DLF CyberHub Retail",
        price: 6500,
        rent: true,
        img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80",
      },
      {
        id: 6,
        status: "For sale",
        color: "bg-green-500",
        title: "IT Park Tower",
        price: 720000,
        img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80",
      },
    ];

  // Enrich with categories (if not passed)
  const itemsWithCat = useMemo(() => {
    const infer = (t = "") => {
      const s = t.toLowerCase();
      if (s.includes("retail")) return "Retail";
      if (s.includes("it") || s.includes("it park")) return "IT Park";
      if (s.includes("office")) return "Office";
      return "Commercial";
    };
    return (localItems || []).map((it) => ({ ...it, category: it.category || infer(it.title) }));
  }, [localItems]);

  // Filters
  const categories = useMemo(() => ["All", ...Array.from(new Set(itemsWithCat.map(i => i.category)))], [itemsWithCat]);
  const [selected, setSelected] = useState("All");
  const filtered = useMemo(() => selected === "All" ? itemsWithCat : itemsWithCat.filter(i => i.category === selected), [selected, itemsWithCat]);

  // Scroll-snap carousel
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const cardWidth = 300; // approximate incl. gap
  const scrollByCards = (n) => {
    const el = trackRef.current; if (!el) return;
    el.scrollBy({ left: n * cardWidth, behavior: 'smooth' });
  };
  useEffect(() => {
    const el = trackRef.current; if (!el) return;
    const onScroll = () => {
      const idx = Math.round(el.scrollLeft / cardWidth);
      setActiveIndex(idx);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [cardWidth, filtered]);

  const Icon = ({ path }) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="w-4 h-4"
    >
      <path d={path} />
    </svg>
  );

  return (
    <section className="pb-14">
      {/* Desktop Layout with Sidebar Space */}
      <div className="md:ml-[260px] flex justify-center">
        <div className="w-full max-w-screen-xl px-3 sm:px-4 md:px-6">
          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#0c0a09] tracking-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="text-gray-500 text-sm md:text-base mt-1">{subtitle}</p>
            )}
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-5">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => { setSelected(cat); setActiveIndex(0); if (trackRef.current) trackRef.current.scrollTo({ left: 0, behavior: 'smooth' }); }}
                className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${selected === cat ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Carousel */}
          <div className="relative">
            <button aria-label="Prev" onClick={() => scrollByCards(-1)} className="hidden md:flex absolute -left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow items-center justify-center hover:shadow-md z-10">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-gray-700"><path fill="currentColor" d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button aria-label="Next" onClick={() => scrollByCards(1)} className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow items-center justify-center hover:shadow-md z-10">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-gray-700"><path fill="currentColor" d="M9 6l6 6-6 6"/></svg>
            </button>
            <div ref={trackRef} className="overflow-x-auto pb-3 no-scrollbar snap-x snap-mandatory">
              <div className="flex gap-5 min-w-[700px] md:min-w-0">
                {filtered.map((c) => (
                  <div
                    key={c.id}
                    className="group bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm min-w-[260px] md:min-w-[280px] hover:shadow-[0_14px_32px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1 snap-start"
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden">
                      <img
                        src={c.img}
                        alt={c.title}
                        className="w-full h-44 md:h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=1400&q=80'; }}
                      />
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-70" />
                      {/* Status badge */}
                      <div className="absolute top-3 left-3">
                        <span
                          className={`inline-flex text-white text-[11px] font-semibold px-3 py-1 rounded-full shadow ${c.color}`}
                        >
                          {c.status}
                        </span>
                      </div>
                      {/* Category tag */}
                      <div className="absolute bottom-3 left-3">
                        <span className="inline-flex bg-white/90 text-gray-800 text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-sm">
                          {c.category}
                        </span>
                      </div>
                      {/* Favorite button */}
                      <button
                        type="button"
                        className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 hover:bg-white shadow-md flex items-center justify-center transition-colors"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          className="w-5 h-5 text-gray-700 group-hover:text-red-500 transition-colors"
                        >
                          <path
                            fill="currentColor"
                            d="M12 21s-7-4.35-9.33-8.1C.6 9.69 2.61 6 6.07 6c1.74 0 3.41.81 4.43 2.09C11.52 6.81 13.19 6 14.93 6c3.46 0 5.47 3.69 3.4 6.9C19 16.65 12 21 12 21Z"
                          />
                        </svg>
                      </button>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="font-semibold text-[15px] text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                        {c.title}
                      </h3>
                      <div className="mt-2 text-gray-900 font-bold text-[15px]">
                        {c.rent
                          ? `₹${c.price.toLocaleString()}/mo`
                          : `₹${c.price.toLocaleString()}`}
                      </div>

                      {/* Specs row */}
                      {/* <div className="mt-3 grid grid-cols-4 gap-2 text-[11px] text-gray-600 border-t pt-3">
                        <div className="flex items-center gap-1">
                          <Icon path="M3 10h18M7 10v10m10-10v10M7 15h10" />2
                        </div>
                        <div className="flex items-center gap-1">
                          <Icon path="M3 20h18M7 20V8h10v12M9 11h2m4 0h2" />2
                        </div>
                        <div className="flex items-center gap-1">
                          <Icon path="M4 4h16v16H4z" />2
                        </div>
                        <div className="flex items-center gap-1">
                          <Icon path="M3 20h18M6 20V10h12v10M8 14h2m4 0h2" />2
                        </div>
                      </div> */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Indicators */}
            <div className="mt-3 flex items-center justify-center gap-1.5">
              {filtered.map((_, i) => (
                <span key={i} className={`w-1.5 h-1.5 rounded-full ${i === activeIndex ? 'bg-blue-600' : 'bg-gray-300'}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
