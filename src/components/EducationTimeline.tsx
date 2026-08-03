import React from 'react';
import { GraduationCap, BookOpen, Laptop, Landmark } from 'lucide-react';

export const EducationTimeline: React.FC = () => {
  const eduItems = [
    {
      title: 'Secondary (Madhyamik)',
      board: 'West Bengal Board',
      status: 'Completed',
      statusType: 'completed',
      icon: <BookOpen className="w-4 h-4 text-blue-400" />
    },
    {
      title: 'Higher Secondary (HS)',
      board: 'West Bengal Board',
      status: 'Completed',
      statusType: 'completed',
      icon: <GraduationCap className="w-4 h-4 text-blue-400" />
    },
    {
      title: 'Computer Diploma',
      board: 'Diploma in Computer Application',
      status: 'Completed',
      statusType: 'completed',
      icon: <Laptop className="w-4 h-4 text-blue-400" />
    },
    {
      title: 'B.A English Honours',
      board: '1st Year (Ongoing)',
      status: 'Currently Studying',
      statusType: 'ongoing',
      icon: <Landmark className="w-4 h-4 text-purple-400" />
    }
  ];

  return (
    <div id="education" className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800/80 bg-[#0a0f1d]/80 shadow-2xl h-full flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-xl bg-blue-600/10 border border-blue-500/30 text-blue-400">
            <GraduationCap className="w-5 h-5" />
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Education Timeline
          </h2>
        </div>

        {/* Timeline Items */}
        <div className="relative space-y-6 before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-slate-800">
          {eduItems.map((item, idx) => (
            <div key={idx} className="relative flex items-center justify-between gap-4 pl-12">
              
              {/* Node Icon on Timeline */}
              <div className="absolute left-1.5 w-7 h-7 rounded-full bg-[#090d18] border border-blue-500/40 flex items-center justify-center shrink-0 z-10">
                {item.icon}
              </div>

              {/* Title & Board */}
              <div>
                <h3 className="text-sm font-extrabold text-white leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5 font-medium">
                  {item.board}
                </p>
              </div>

              {/* Badge */}
              <div className="shrink-0">
                {item.statusType === 'completed' ? (
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold text-blue-400 border border-blue-500/40 bg-blue-500/10">
                    Completed
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold text-purple-300 border border-purple-500/50 bg-purple-600/30 shadow-[0_0_10px_rgba(168,85,247,0.3)]">
                    Currently Studying
                  </span>
                )}
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
