import React from 'react';
import { motion } from 'framer-motion';
import {
  Globe, Shield, TrendingUp, Star, ArrowRight,
  MapPin, Award, Zap, Users
} from 'lucide-react';

const WHY_US = [
  { icon: MapPin,    color: '#F59E0B', bg: 'rgba(245,158,11,0.1)',  title: 'Local Expertise',  desc: 'Deep market knowledge and on-the-ground teams in every country we serve.', stats: '50+ Local Teams' },
  { icon: Globe,     color: '#3B82F6', bg: 'rgba(59,130,246,0.1)',  title: 'Global Reach',      desc: 'Access 50+ markets with verified premium listings across 6 continents.',    stats: '6 Continents' },
  { icon: Shield,    color: '#10B981', bg: 'rgba(16,185,129,0.1)',  title: 'Trusted & Secure',  desc: 'ISO certified, RICS accredited — every transaction fully protected.',         stats: 'ISO 27001' },
  { icon: Zap,       color: '#8B5CF6', bg: 'rgba(139,92,246,0.1)', title: '24/7 Support',      desc: 'Round-the-clock expert advisors ready to guide every step of your journey.', stats: '24/7 Live Chat' },
  { icon: TrendingUp,color: '#EF4444', bg: 'rgba(239,68,68,0.1)',  title: 'Market Insights',   desc: 'Real-time data, growth analytics, and investment intelligence.',              stats: 'Live Analytics' },
  { icon: Award,     color: '#EC4899', bg: 'rgba(236,72,153,0.1)', title: 'Award-Winning',     desc: 'Recognised as the #1 international property platform for 3 consecutive years.', stats: '#1 Platform' },
];

const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#0A1018]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full mb-5">
            <Star className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-amber-400 text-xs font-semibold uppercase tracking-wider">Why 100acress</span>
          </div>
          <h2 className="text-4xl font-black text-white mb-4">
            Built for Global{' '}
            <span className="bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">Investors</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Everything you need to discover, evaluate, and invest in international real estate — in one place.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {WHY_US.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
              >
                <div className="group bg-[#0F1520] hover:bg-[#111827] border border-white/[0.07] hover:border-white/[0.14] rounded-2xl p-6 transition-all duration-300 hover:-translate-y-0.5 h-full">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform" style={{ background: item.bg }}>
                    <Icon className="w-5 h-5" style={{ color: item.color }} />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed mb-4">{item.desc}</p>
                  <div className="text-xs font-semibold" style={{ color: item.color }}>{item.stats}</div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { icon: Globe, value: '50+', label: 'Countries' },
            { icon: Star, value: '10M+', label: 'Properties' },
            { icon: Users, value: '500K+', label: 'Investors' },
            { icon: Award, value: '99%', label: 'Satisfaction' },
          ].map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 text-center group hover:bg-white/[0.05] transition-all">
                <Icon className="w-5 h-5 text-amber-400/60 mx-auto mb-3 group-hover:text-amber-400 transition-colors" />
                <div className="text-3xl font-black text-amber-400 mb-1">{s.value}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">{s.label}</div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
