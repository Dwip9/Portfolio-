import React from 'react';
import { Smartphone, Globe, Cpu, Layout, UserCheck, Building2, Palette, Gauge, Layers } from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const services = [
    { title: 'Android APK Development', icon: <Smartphone className="w-5 h-5 text-emerald-400" /> },
    { title: 'Responsive Website Development', icon: <Globe className="w-5 h-5 text-blue-400" /> },
    { title: 'AI Automation & Integration', icon: <Cpu className="w-5 h-5 text-purple-400" /> },
    { title: 'Landing Page Design', icon: <Layout className="w-5 h-5 text-pink-400" /> },
    { title: 'Portfolio Websites', icon: <UserCheck className="w-5 h-5 text-cyan-400" /> },
    { title: 'Business Websites', icon: <Building2 className="w-5 h-5 text-amber-400" /> },
    { title: 'UI/UX Design', icon: <Palette className="w-5 h-5 text-indigo-400" /> },
    { title: 'Website Optimization', icon: <Gauge className="w-5 h-5 text-emerald-400" /> }
  ];

  return (
    <div id="services" className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800/80 bg-[#0a0f1d]/80 shadow-2xl h-full flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-xl bg-purple-600/10 border border-purple-500/30 text-purple-400">
            <Layers className="w-5 h-5" />
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            What I Offer
          </h2>
        </div>

        {/* 8 Cards Grid (2 cols x 4 rows) */}
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-3.5">
          {services.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl border border-slate-800/90 bg-[#090d18] hover:border-blue-500/40 transition-all flex flex-col items-center justify-center text-center group cursor-default"
            >
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 mb-2 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>

              <h3 className="text-xs font-bold text-slate-200 group-hover:text-white transition-colors leading-tight">
                {item.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
