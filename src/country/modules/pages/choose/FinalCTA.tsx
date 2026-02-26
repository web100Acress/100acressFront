import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const FinalCTA: React.FC = () => {
  return (
    <section className="py-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto relative overflow-hidden rounded-3xl"
        style={{ background: 'linear-gradient(135deg, #1a1200 0%, #0F1520 50%, #0a0e1a 100%)', border: '1px solid rgba(245,158,11,0.15)' }}
      >
        <div className="absolute top-0 left-1/3 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/3 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 text-center p-14">
          <div className="text-5xl mb-5">🌍</div>
          <h2 className="text-3xl font-black text-white mb-4">Not sure where to invest?</h2>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">
            Talk to our global property advisors and get a personalised market report — completely free.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link to="/contact" className="px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-xl transition-all hover:scale-105 text-sm">
              Get Free Consultation
            </Link>
            <Link to="/global/projects" className="px-8 py-3.5 bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 text-white font-semibold rounded-xl transition-all text-sm flex items-center gap-2">
              Browse All Projects <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default FinalCTA;
