import React from 'react';
import {
  Smartphone,
  Globe,
  Cpu,
  Monitor,
  MonitorSmartphone,
  Flame,
  Layers,
  Zap,
  Terminal,
  Palette,
  Sparkles
} from 'lucide-react';
import { Language } from '../types';

interface SkillsSectionProps {
  currentLang?: Language;
}

export const SkillsSection: React.FC<SkillsSectionProps> = () => {
  const skillsList = [
    {
      name: 'Android Dev',
      icon: <Smartphone className="w-6 h-6 text-emerald-400" />,
      bg: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
    },
    {
      name: 'Web Dev',
      icon: <Globe className="w-6 h-6 text-blue-400" />,
      bg: 'bg-blue-500/10 border-blue-500/20 text-blue-400'
    },
    {
      name: 'AI Integration',
      icon: <Cpu className="w-6 h-6 text-purple-400" />,
      bg: 'bg-purple-500/10 border-purple-500/20 text-purple-400'
    },
    {
      name: 'Frontend',
      icon: <Monitor className="w-6 h-6 text-cyan-400" />,
      bg: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400'
    },
    {
      name: 'Responsive Design',
      icon: <MonitorSmartphone className="w-6 h-6 text-indigo-400" />,
      bg: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400'
    },
    {
      name: 'Firebase',
      icon: <Flame className="w-6 h-6 text-amber-400" />,
      bg: 'bg-amber-500/10 border-amber-500/20 text-amber-400'
    },
    {
      name: 'React',
      icon: <Layers className="w-6 h-6 text-sky-400" />,
      bg: 'bg-sky-500/10 border-sky-500/20 text-sky-400'
    },
    {
      name: 'JavaScript',
      icon: <Zap className="w-6 h-6 text-yellow-400" />,
      bg: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400'
    },
    {
      name: 'Python',
      icon: <Terminal className="w-6 h-6 text-blue-300" />,
      bg: 'bg-blue-600/10 border-blue-600/20 text-blue-300'
    },
    {
      name: 'Figma',
      icon: <Palette className="w-6 h-6 text-pink-400" />,
      bg: 'bg-pink-500/10 border-pink-500/20 text-pink-400'
    },
    {
      name: 'Cursor AI',
      icon: <Sparkles className="w-6 h-6 text-purple-300" />,
      bg: 'bg-purple-600/10 border-purple-600/20 text-purple-300'
    }
  ];

  return (
    <section id="skills" className="relative py-12 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Centered Heading with decorative lines */}
        <div className="text-center mb-10 flex items-center justify-center gap-4">
          <div className="w-12 sm:w-20 h-[1px] bg-gradient-to-r from-transparent to-blue-500"></div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            My Skills
          </h2>
          <div className="w-12 sm:w-20 h-[1px] bg-gradient-to-l from-transparent to-blue-500"></div>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {skillsList.map((skill, idx) => (
            <div
              key={idx}
              className={`glass-panel p-4 rounded-2xl border ${skill.bg} hover:border-blue-400/50 transition-all flex flex-col items-center text-center group cursor-default hover:-translate-y-1 shadow-md`}
            >
              <div className="mb-2.5 p-2.5 rounded-xl bg-slate-900/80 border border-white/5 group-hover:scale-110 transition-transform flex items-center justify-center">
                {skill.icon}
              </div>

              <span className="text-xs font-extrabold text-slate-200 group-hover:text-white transition-colors">
                {skill.name}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
