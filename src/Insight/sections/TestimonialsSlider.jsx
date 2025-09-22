import React, { useEffect, useRef, useState } from "react";

export default function TestimonialsSlider() {
  const testimonials = [
    {
      quote:
        "Arcu laoreet malesuada nunc eget. Fermentum ut dui etiam aliquam habitant elit euismod erat praesent. Tincidunt semper interdum fames cras",
      author: "Miya Monroe",
      role: "Buyer",
      img:
        "https://images.unsplash.com/photo-1544006659-f0b21884ce1d?q=80&w=1200&auto=format&fit=crop",
    },
    {
      quote:
        "Great guidance end-to-end. We discovered the right locality and closed confidently with data-backed insights.",
      author: "Rohit Sharma",
      role: "Investor",
      img:
        "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=1200&auto=format&fit=crop",
    },
    {
      quote:
        "Loved the price trends and demand-supply visuals. Helped us shortlist faster and negotiate better.",
      author: "Priya Singh",
      role: "Home Buyer",
      img:
        "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=1200&auto=format&fit=crop",
    },
  ];
  const [tIndex, setTIndex] = useState(0);
  const touchX = useRef(null);
  const next = () => setTIndex((i) => (i + 1) % testimonials.length);
  const prev = () => setTIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  const onTouchStart = (e) => { try { touchX.current = e.changedTouches[0].clientX; } catch {} };
  const onTouchEnd = (e) => {
    try {
      const endX = e.changedTouches[0].clientX;
      const startX = touchX.current;
      if (startX == null) return;
      const dx = endX - startX;
      const THRESH = 40;
      if (dx > THRESH) prev();
      else if (dx < -THRESH) next();
    } catch {}
    finally { touchX.current = null; }
  };
  useEffect(() => {
    const id = setInterval(() => setTIndex((i) => (i + 1) % testimonials.length), 5000);
    return () => clearInterval(id);
  }, [testimonials.length]);
  return (
    <section className="max-w-screen-xl mx-auto px-4 md:px-6 md:pl-[260px] py-10 md:py-14" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
        <div className="text-center md:text-left">
          <h3 className="text-2xl md:text-3xl font-extrabold text-[#0c0a09] mb-3">What our clients say about us</h3>
          <div className="text-blue-600 text-5xl leading-none mb-2">"</div>
          <p className="text-gray-600 text-sm md:text-base max-w-prose mx-auto md:mx-0">
            {testimonials[tIndex].quote}
          </p>
          <div className="mt-4">
            <div className="font-semibold text-gray-900">{testimonials[tIndex].author}</div>
            <div className="text-gray-500 text-sm">{testimonials[tIndex].role}</div>
          </div>
          <div className="mt-5 inline-flex items-center gap-2">
            <button onClick={prev} className="px-3 py-1.5 rounded-md border text-sm text-gray-700 hover:bg-gray-50">Prev</button>
            <button onClick={next} className="px-3 py-1.5 rounded-md border text-sm text-gray-700 hover:bg-gray-50">Next</button>
          </div>
          <div className="mt-3 flex items-center gap-2 justify-center md:justify-start">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setTIndex(i)}
                className={`w-2.5 h-2.5 rounded-full ${i === tIndex ? 'bg-blue-600' : 'bg-gray-300'}`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
        <div className="flex justify-center md:justify-end">
          <img
            src={testimonials[tIndex].img}
            alt={testimonials[tIndex].author}
            className="rounded-xl w-[520px] h-[320px] object-cover blur-[0.5px]"
          />
        </div>
      </div>
    </section>
  );
}
