import React from "react";

export default function FeaturedGrid() {
  const cards = [
    { id: 1, status: 'For sale', statusColor: 'bg-green-500', title: 'Division Road house', address: '506 Division Road Pembroke Pines, FL 33028', price: 250000, beds: 3, baths: 2, area: 1200, garages: 3, img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1400&auto=format&fit=crop' },
    { id: 2, status: 'For sale', statusColor: 'bg-green-500', title: 'North Road house', address: '19 North Road Piscataway, NJ 08854', price: 222000, beds: 2, baths: 3, area: 1200, garages: 1, img: 'https://images.unsplash.com/photo-1560184897-ae75f418493e?auto=format&fit=crop&w=1400&q=80' },
    { id: 3, status: 'For rent', statusColor: 'bg-purple-500', title: 'Bloomfield house', address: '29 W. Pawnee St. Bloomfield, NJ 07003', price: 250000, beds: 4, baths: 2, area: 850, garages: 2, img: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1400&q=80' },
    { id: 4, status: 'For sale', statusColor: 'bg-green-500', title: 'Sector 79 Apartment', address: 'Gurgaon, Haryana', price: 185000, beds: 2, baths: 2, area: 950, garages: 1, img: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=1400&auto=format&fit=crop' },
    { id: 5, status: 'For sale', statusColor: 'bg-green-500', title: 'Dwarka Expy. Condo', address: 'Dwarka Expressway, Gurugram', price: 315000, beds: 3, baths: 3, area: 1450, garages: 2, img: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?q=80&w=1400&auto=format&fit=crop' },
    { id: 6, status: 'For rent', statusColor: 'bg-purple-500', title: 'Noida Sector 150', address: 'Noida, Uttar Pradesh', price: 1800, beds: 2, baths: 2, area: 980, garages: 1, img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1400&auto=format&fit=crop' },
  ];
  const Icon = ({ path }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d={path}/></svg>
  );
  return (
    <section className="max-w-screen-xl mx-auto px-4 md:px-6 md:pl-[260px] mt-12 md:mt-20">
      <div className="mx-auto max-w-5xl text-center mb-3 md:mb-4">
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#0c0a09] tracking-tight">Discover your featured property</h2>
        <p className="text-gray-500 text-sm md:text-base mt-1">Leo morbi faucibus mattis pharetra tellus velit ultricies duis rhoncus</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-7">
        {cards.map((c) => (
          <div
            key={c.id}
            className="group bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-[0_12px_28px_rgba(0,0,0,0.12)] transition-all duration-200 hover:-translate-y-0.5"
          >
            <div className="relative">
              <div className="w-full h-48 md:h-56 lg:h-60">
                <img src={c.img} alt={c.title} className="w-full h-full object-cover" />
              </div>
              <div className="absolute top-3 left-3">
                <span className={`inline-flex text-white text-[11px] font-semibold px-3 py-1 rounded-full shadow ${c.statusColor}`}>{c.status}</span>
              </div>
              {/* Wishlist */}
              <button type="button" className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 hover:bg-white shadow flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-gray-700"><path fill="currentColor" d="M12 21s-7-4.35-9.33-8.1C.6 9.69 2.61 6 6.07 6c1.74 0 3.41.81 4.43 2.09C11.52 6.81 13.19 6 14.93 6c3.46 0 5.47 3.69 3.4 6.9C19 16.65 12 21 12 21Z"/></svg>
              </button>
            </div>
            <div className="p-4 md:p-5">
              <h3 className="font-semibold text-[15px] md:text-[16px] text-gray-900 line-clamp-1">{c.title}</h3>
              <p className="text-gray-500 text-xs md:text-[13px] mt-1 line-clamp-2">{c.address}</p>
              <div className="mt-3 text-gray-900 font-extrabold text-[16px] md:text-[17px]">{c.status === 'For rent' ? `₹${c.price.toLocaleString()}/mo` : `₹${c.price.toLocaleString()}`}</div>
              <div className="mt-3 pt-3 border-t border-gray-100 grid grid-cols-4 gap-2 text-[11px] md:text-[12px] text-gray-600">
                <div className="flex items-center gap-1"><Icon path="M3 10h18M7 10v10m10-10v10M7 15h10" />{c.beds}<span className="hidden sm:inline">Beds</span></div>
                <div className="flex items-center gap-1"><Icon path="M3 20h18M7 20V8h10v12M9 11h2m4 0h2" />{c.baths}<span className="hidden sm:inline">Baths</span></div>
                <div className="flex items-center gap-1"><Icon path="M4 4h16v16H4z" />{c.area}<span className="hidden sm:inline">sqft</span></div>
                <div className="flex items-center gap-1"><Icon path="M3 20h18M6 20V10h12v10M8 14h2m4 0h2" />{c.garages}<span className="hidden sm:inline">Garages</span></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
