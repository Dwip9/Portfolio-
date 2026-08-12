import React from 'react';
import { User, Download, GraduationCap, Briefcase, Award, MapPin, Globe, Sliders, Code } from 'lucide-react';
import { Language } from '../types';
import { usePortfolio } from '../context/PortfolioContext';

interface AboutMeProps {
  currentLang: Language;
}

export const AboutMe: React.FC<AboutMeProps> = () => {
  const { config } = usePortfolio();
  return (
    <section id="about" className="relative py-12 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Unified Glass Container */}
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-slate-800/90 bg-[#0a0f1d]/85 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: About Me Bio */}
            <div className="lg:col-span-6 flex flex-col items-start gap-4 pr-0 lg:pr-6 border-b lg:border-b-0 lg:border-r border-slate-800/80 pb-8 lg:pb-0">
              
              {/* Profile Avatar Icon */}
              <div className="w-12 h-12 rounded-full bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <User className="w-6 h-6" />
              </div>

              <div className="flex items-center gap-2">
                <h2 className="text-3xl font-extrabold text-white tracking-tight">
                  About Me
                </h2>
                <span className="text-purple-400 font-mono text-xl font-bold">~~~</span>
              </div>

              <div className="text-slate-300 text-sm leading-relaxed space-y-3 font-normal">
                <p>
                  My name is Tamanna. I am a passionate Digital Artist, 3D Visual Creator, and Anime Character Designer.
                </p>
                <p>
                  I specialize in AI-assisted software development, Android application development, website development, UI design, and modern web technologies. I enjoy solving problems and continuously learning new skills.
                </p>
              </div>

              <a
                href="#contact"
                className="mt-2 px-5 py-2.5 rounded-xl border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-slate-200 text-xs font-bold flex items-center gap-2 transition-all cursor-pointer hover:scale-105"
              >
                <span>Download CV</span>
                <Download className="w-3.5 h-3.5 text-blue-400" />
              </a>

            </div>

            {/* Right Column: Information Grid */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              {/* Name */}
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 shrink-0">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-400 block">Name</span>
                  <span className="text-sm font-black text-white block mt-0.5 tracking-wider uppercase">{config.name}</span>
                </div>
              </div>

              {/* Profession */}
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 shrink-0">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-400 block">Profession</span>
                  <span className="text-sm font-extrabold text-white block mt-0.5">Freelancer & Developer</span>
                </div>
              </div>

              {/* Education */}
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 shrink-0">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-400 block">Education</span>
                  <span className="text-sm font-extrabold text-white block mt-0.5">B.A English Honours</span>
                </div>
              </div>

              {/* Specialization */}
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 shrink-0">
                  <Code className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-400 block">Specialization</span>
                  <span className="text-sm font-extrabold text-white block mt-0.5 leading-snug">
                    AI Tools, APK Development, Website Development
                  </span>
                </div>
              </div>

              {/* Year */}
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 shrink-0">
                  <Sliders className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-400 block">Year</span>
                  <span className="text-sm font-extrabold text-white block mt-0.5">1st Year</span>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-400 block">Location</span>
                  <span className="text-sm font-extrabold text-white block mt-0.5">{config.location}</span>
                </div>
              </div>

              {/* Qualification */}
              <div className="flex items-start gap-3 sm:col-span-2 lg:col-span-1">
                <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-400 block">Qualification</span>
                  <div className="text-xs font-bold text-slate-200 mt-1 space-y-0.5">
                    <p className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> Secondary Completed</p>
                    <p className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> Higher Secondary Completed</p>
                    <p className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> Computer Diploma</p>
                  </div>
                </div>
              </div>

              {/* Languages */}
              <div className="flex items-start gap-3 sm:col-span-2 lg:col-span-1">
                <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 shrink-0">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-400 block">Languages</span>
                  <span className="text-sm font-extrabold text-white block mt-0.5">Bengali, Hindi, English</span>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
