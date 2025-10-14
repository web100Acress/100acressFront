import React from "react";
import { Link } from "react-router-dom";

export default function FooterInfo() {
  return (
    <section className="w-full text-white">
      <div className="max-w-screen-xl mx-auto px-4 md:px-6 md:pl-[260px] py-8 md:py-10">
        <div className="rounded-2xl bg-[#0b0a1a] px-4 md:px-6 py-8 md:py-10">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8">
          <div>
            <div className="font-semibold mb-2">Opening hours</div>
            <div className="text-white/85 text-sm">Mon-Fri 08:00AM - 08:00PM</div>
            <div className="text-white/85 text-sm">Sat-Sun 08:00AM - 08:00PM</div>
          </div>
          <div>
            <div className="font-semibold mb-2">100acress.com</div>
            <div className="text-white/85 text-sm">Gurugram, Haryana, India</div>
            <div className="text-white/85 text-sm mt-2">
              <a href="tel:+918500900100" className="hover:underline">+91 85009 00100</a><br/>
              <a href="mailto:contact@100acress.com" className="hover:underline">support@100acress.com</a>
            </div>
            <div className="text-white/85 text-sm mt-2">
              <a href="https://100acress.com" target="_blank" rel="noreferrer" className="hover:underline">https://100acress.com</a>
            </div>
          </div>
          <div>
            <div className="font-semibold mb-2">Property</div>
            <ul className="space-y-1 text-white/85 text-sm">
              <li>Apartments</li>
              <li>Villas</li>
              <li>Houses</li>
              <li>Commercial</li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-2">Links</div>
            <ul className="space-y-1 text-white/85 text-sm">
              <li><Link to="/" className="hover:underline">Home</Link></li>
              <li><Link to="/property/residential/" className="hover:underline">Property</Link></li>
              <li><Link to="/about-us/" className="hover:underline">About</Link></li>
              <li><Link to="/contact-us/" className="hover:underline">Contact</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-2">Newsletter</div>
            <p className="text-white/85 text-sm mb-2">Subscribe to our newsletter</p>
            <div className="flex gap-2">
              <input className="px-3 py-2 rounded-md text-sm text-gray-900 w-full" placeholder="Your email" />
              <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-2 rounded-md">Subscribe</button>
            </div>
          </div>
        </div>
        <div className="mt-6 border-t border-white/10 pt-4 text-white/70 text-sm flex items-center justify-between">
          <div>© 2025 100acress.com. All rights reserved.</div>
          <div className="flex items-center gap-3">
            <a href="https://100acress.com" target="_blank" rel="noreferrer" className="w-8 h-8 inline-flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm0 2c1.93 0 3.68.78 4.95 2.05L13.5 9.5H8V8h4.5L17 3.5A7.96 7.96 0 0 0 12 4ZM4 12c0-1.93.78-3.68 2.05-4.95L10.5 11.5V16H8v-3.5L3.5 7A7.96 7.96 0 0 0 4 12Zm8 8c-1.93 0-3.68-.78-4.95-2.05L10.5 14.5H16V16h-4.5L7 20.5A7.96 7.96 0 0 0 12 20Zm8-8c0 1.93-.78 3.68-2.05 4.95L13.5 12.5V8H16v3.5L20.5 17A7.96 7.96 0 0 0 20 12Z"/></svg>
            </a>
            <a href="https://www.linkedin.com/company/100acress/" target="_blank" rel="noreferrer" className="w-8 h-8 inline-flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v16H0V8zm7.5 0h4.8v2.2h.1c.7-1.2 2.4-2.5 4.9-2.5 5.2 0 6.2 3.4 6.2 7.8V24h-5V16c0-1.9 0-4.4-2.7-4.4s-3.1 2.1-3.1 4.3V24h-5V8z"/></svg>
            </a>
            <a href="https://www.instagram.com/100acress/" target="_blank" rel="noreferrer" className="w-8 h-8 inline-flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20" aria-label="Instagram">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3h10zm-5 3.5A5.5 5.5 0 1 0 17.5 13 5.5 5.5 0 0 0 12 7.5zm0 2A3.5 3.5 0 1 1 8.5 13 3.5 3.5 0 0 1 12 9.5zm5-3.8a1.2 1.2 0 1 0 1.2 1.2 1.2 1.2 0 0 0-1.2-1.2z"/></svg>
            </a>
            <a href="https://x.com/100acress" target="_blank" rel="noreferrer" className="w-8 h-8 inline-flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20" aria-label="X">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M17.6 3H21l-7 8.1L22.5 21H16l-5-6.1L5 21H1.6l7.7-8.9L1.5 3H8l4.6 5.6L17.6 3z"/></svg>
            </a>
            <a href="https://wa.me/918500900100" target="_blank" rel="noreferrer" className="w-8 h-8 inline-flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><path d="M20.52 3.48A11.94 11.94 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.17 1.6 6L0 24l6.17-1.6A12 12 0 1 0 20.52 3.48Zm-8.52 18a9.94 9.94 0 0 1-5.06-1.39l-.36-.21-3 0 0-3-.21-.36A9.94 9.94 0 1 1 12 21.48Zm5.67-7.67c-.31-.16-1.83-.91-2.11-1.02-.28-.1-.48-.16-.68.16-.2.31-.78 1.02-.96 1.22-.18.2-.36.23-.67.08-.31-.16-1.32-.49-2.51-1.57-.93-.83-1.56-1.86-1.74-2.17-.18-.31-.02-.48.14-.63.14-.14.31-.36.46-.54.15-.18.2-.31.31-.52.1-.2.05-.38-.03-.54-.08-.16-.68-1.64-.93-2.25-.24-.58-.48-.5-.68-.51h-.58c-.2 0-.52.08-.79.38-.27.31-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.11 3.22 5.11 4.52.71.31 1.27.49 1.71.63.72.23 1.38.2 1.9.12.58-.08 1.83-.74 2.09-1.46.26-.72.26-1.34.18-1.46-.08-.12-.28-.2-.59-.36Z"/></svg>
            </a>
          </div>
        </div>
      </div>
      </div>
    </section>

  );
}
