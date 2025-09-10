const nice = (s = '') => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
const onErrorFallback = (e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=1600&q=80'; };
import React from "react";
import { mapCoordsToCity } from "../components/LocationContext";

export default function CitiesGrid() {
// Prefer detected city first
let detectedCity = null;
try {
  const s = localStorage.getItem('geoCoords');
  if (s) {
    const coords = JSON.parse(s);
    detectedCity = mapCoordsToCity(coords);
  }
} catch {}
const baseCities = [
  { name: 'gurugram', props: 28, img: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1600&q=80', w: 'md:col-span-2', h: 'h-44 md:h-56' },
  { name: 'delhi', props: 12, img: 'https://images.unsplash.com/photo-1560184897-ae75f418493e?auto=format&fit=crop&w=1600&q=80', w: '', h: 'h-44 md:h-56' },
  { name: 'noida', props: 32, img: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?auto=format&fit=crop&w=1600&q=80', w: 'md:row-span-2', h: 'h-44 md:h-[380px]' },
  { name: 'faridabad', props: 18, img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80', w: '', h: 'h-40 md:h-48' },
  { name: 'gurgaon', props: 32, img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=80', w: '', h: 'h-40 md:h-48' },
];
const priority = detectedCity ? detectedCity.toLowerCase() : null;
const cities = priority ? [...baseCities].sort((a,b)=> (a.name===priority? -1 : b.name===priority? 1 : 0)) : baseCities;

return (
  <section className="max-w-screen-xl mx-auto px-4 md:px-6 md:pl-[260px] py-10 md:py-14">
    <div className="text-center mb-6">
      <h2 className="text-2xl md:text-4xl font-extrabold text-[#0c0a09]">What city will you live in?</h2>
      <p className="text-gray-500 text-sm md:text-base">Leo morbi faucibus mattis pharetra tellus velit ultricies duis rhoncus.<br/>Porttitor fermentum eu urna eget</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-5 items-start">
      <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 items-start">
        <div className="md:col-span-2 group relative rounded-xl overflow-hidden self-start h-44 md:h-56">
          <img loading="lazy" onError={onErrorFallback} src={cities[0].img} alt={cities[0].name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-3 left-4 text-white">
            <div className="font-extrabold text-lg capitalize">{nice(cities[0].name)}</div>
            <div className="text-white/85 text-sm">{cities[0].props} properties</div>
          </div>
        </div>
        <div className="group relative rounded-xl overflow-hidden self-start h-44 md:h-56">
          <img loading="lazy" onError={onErrorFallback} src={cities[1].img} alt={cities[1].name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-3 left-4 text-white">
            <div className="font-extrabold text-lg capitalize">{nice(cities[1].name)}</div>
            <div className="text-white/85 text-sm">{cities[1].props} properties</div>
          </div>
        </div>
      </div>
      <div className="group relative rounded-xl overflow-hidden self-start h-44 md:h-[380px]">
        <img loading="lazy" onError={onErrorFallback} src={cities[2].img} alt={cities[2].name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-3 left-4 text-white">
          <div className="font-extrabold text-lg capitalize">{nice(cities[2].name)}</div>
          <div className="text-white/85 text-sm">{cities[2].props} properties</div>
        </div>
      </div>
      <div className="group relative rounded-xl overflow-hidden self-start h-40 md:h-48">
        <img loading="lazy" onError={onErrorFallback} src={cities[3].img} alt={cities[3].name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-3 left-4 text-white">
          <div className="font-extrabold text-lg capitalize">{nice(cities[3].name)}</div>
          <div className="text-white/85 text-sm">{cities[3].props} properties</div>
        </div>
      </div>
      <div className="md:col-span-3 group relative rounded-xl overflow-hidden self-start h-40 md:h-48">
        <img loading="lazy" onError={onErrorFallback} src={cities[4].img} alt={cities[4].name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-3 left-4 text-white">
          <div className="font-extrabold text-lg capitalize">{nice(cities[4].name)}</div>
          <div className="text-white/85 text-sm">{cities[4].props} properties</div>
        </div>
      </div>
    </div>
  </section>
);
}
