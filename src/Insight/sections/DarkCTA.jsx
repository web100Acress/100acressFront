import React from "react";
import { Link } from "react-router-dom";

export default function DarkCTA() {
  return (
    <section className="mt-10 md:mt-14">
      <div className="max-w-screen-xl mx-auto px-4 md:px-6 md:pl-[260px]">
        <div className="bg-[#0b0a1a] rounded-2xl py-8 md:py-12 px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6">
            <div className="rounded-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1400&auto=format&fit=crop"
                alt="Happy clients"
                className="w-full h-56 md:h-64 object-cover blur-[1px]"
              />
            </div>
            <div className="text-white">
              <h3 className="text-2xl md:text-3xl font-extrabold mb-2">Putting a plan to action, to assure your satisfaction!</h3>
              <p className="text-white/80 text-sm md:text-base max-w-prose mb-4">
                Ultrices quis at enim in tristique in id diam suspendisse. Sed fermentum velit id et donec dui.
                Sed neque at phasellus in adipiscing dictum.
              </p>
              <Link
                to="/analytics/market"
                className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md shadow"
              >
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
