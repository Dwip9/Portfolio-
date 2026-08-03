import React from 'react';
import { Zap, Palette, Cpu, Code2 } from 'lucide-react';

export const WhyChooseMe: React.FC = () => {
  const pillars = [
    {
      title: 'Fast Delivery',
      desc: 'On-time delivery with quality',
      icon: <Zap className="w-4 h-4 text-amber-400" />
    },
    {
      title: 'Modern Design',
      desc: 'Clean, unique & user-friendly',
      icon: <Palette className="w-4 h-4 text-purple-400" />
    },
    {
      title: 'AI Powered',
      desc: 'Smart solutions with AI tools',
      icon: <Cpu className="w-4 h-4 text-cyan-400" />
    },
    {
      title: 'Clean Code',
      desc: 'Optimized & scalable code',
      icon: <Code2 className="w-4 h-4 text-emerald-400" />
    }
  ];

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800/80 bg-[#0a0f1d]/80 shadow-2xl h-full flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-extrabold text-white tracking-tight mb-6">
          Why Choose Me?
        </h2>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-2 gap-3.5">
          {pillars.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl border border-slate-800/90 bg-[#090d18] hover:border-purple-500/40 transition-all flex flex-col items-start gap-2 group cursor-default"
            >
              <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>

              <div>
                <h3 className="text-xs font-bold text-white leading-tight">
                  {item.title}
                </h3>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
