import React from 'react';
import { GraduationCap, Laptop, Code2, Briefcase } from 'lucide-react';

export const QuickStats: React.FC = () => {
  const statsList = [
    {
      title: 'College Student',
      subtitle: 'B.A English Honours',
      extra: '1st Year',
      icon: <GraduationCap className="w-5 h-5 text-purple-400" />,
      bgIcon: 'bg-purple-500/10 border-purple-500/20'
    },
    {
      title: 'Computer Diploma',
      subtitle: 'Diploma in Computer Application',
      extra: 'Completed',
      icon: <Laptop className="w-5 h-5 text-blue-400" />,
      bgIcon: 'bg-blue-500/10 border-blue-500/20'
    },
    {
      title: 'AI Developer',
      subtitle: 'AI Tools, Apks & Web Solutions',
      extra: 'Specialist',
      icon: <Code2 className="w-5 h-5 text-purple-400" />,
      bgIcon: 'bg-purple-500/10 border-purple-500/20'
    },
    {
      title: 'Freelancer',
      subtitle: 'Working with clients worldwide',
      extra: 'Available',
      icon: <Briefcase className="w-5 h-5 text-blue-400" />,
      bgIcon: 'bg-blue-500/10 border-blue-500/20'
    }
  ];

  return (
    <section className="relative py-6 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statsList.map((item, idx) => (
            <div
              key={idx}
              className="glass-panel p-5 rounded-2xl border border-slate-800/80 bg-[#0a0f1d]/80 hover:border-blue-500/40 transition-all flex items-center gap-4 group"
            >
              <div className={`p-3 rounded-xl border ${item.bgIcon} shrink-0 group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>

              <div>
                <h3 className="text-sm font-extrabold text-white leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5 leading-tight font-medium">
                  {item.subtitle}
                </p>
                {item.extra && (
                  <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">
                    {item.extra}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
