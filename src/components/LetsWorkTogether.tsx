import React from 'react';
import { Send, Sparkles } from 'lucide-react';

interface LetsWorkTogetherProps {
  onHireMeClick: () => void;
}

export const LetsWorkTogether: React.FC<LetsWorkTogetherProps> = ({ onHireMeClick }) => {
  return (
    <div className="relative rounded-3xl overflow-hidden p-8 sm:p-10 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 text-white shadow-2xl h-full flex flex-col justify-between border border-purple-400/30">
      
      {/* Decorative Glows */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-4 max-w-lg">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-cyan-200">
          <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
          <span>Available for Freelance</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
          Let's Build Something Amazing Together!
        </h2>

        <p className="text-sm text-indigo-100 font-medium leading-relaxed">
          I'm available for freelance projects and collaborations.
        </p>

        <button
          onClick={onHireMeClick}
          className="mt-2 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xl shadow-purple-900/40 transition-all cursor-pointer hover:scale-105 border border-purple-400/40"
        >
          <span>Hire Me Now</span>
          <Send className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
