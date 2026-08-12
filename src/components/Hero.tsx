import React, { useState } from 'react';
import {
  ArrowRight,
  Send,
  Github,
  Linkedin,
  Instagram,
  Twitter,
  Mail,
  Smartphone,
  Globe,
  Palette,
  Zap,
  Layers,
  Terminal,
  Flame,
  Laptop,
  Cpu,
  Sparkles,
  RotateCw
} from 'lucide-react';
import { Language } from '../types';
import { usePortfolio } from '../context/PortfolioContext';
import { SkeletonImage } from './SkeletonImage';

interface HeroProps {
  currentLang: Language;
  onHireMeClick: () => void;
  onNavigatePage: (page: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onHireMeClick, onNavigatePage }) => {
  const { config } = usePortfolio();
  const [isFlipped, setIsFlipped] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);

  // Floating Tech Bubble Badges around Avatar with outward scatter offsets
  const techBubbles = [
    {
      name: 'Android Dev',
      icon: <Smartphone className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />,
      glow: 'shadow-[0_0_15px_rgba(52,211,153,0.35)] border-emerald-500/40 bg-emerald-950/80',
      pos: '-top-2 left-2 sm:left-6',
      scatter: '-translate-x-10 -translate-y-10 scale-110 shadow-[0_0_25px_rgba(52,211,153,0.6)]',
      anim: 'animate-bubble-1'
    },
    {
      name: 'AI Automation',
      icon: <Cpu className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />,
      glow: 'shadow-[0_0_15px_rgba(168,85,247,0.35)] border-purple-500/40 bg-purple-950/80',
      pos: '-top-4 right-10 sm:right-16',
      scatter: 'translate-x-10 -translate-y-12 scale-110 shadow-[0_0_25px_rgba(168,85,247,0.6)]',
      anim: 'animate-bubble-2'
    },
    {
      name: 'Web Dev',
      icon: <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />,
      glow: 'shadow-[0_0_15px_rgba(96,165,250,0.35)] border-blue-500/40 bg-blue-950/80',
      pos: 'top-16 -right-3 sm:-right-6',
      scatter: 'translate-x-14 -translate-y-2 scale-110 shadow-[0_0_25px_rgba(96,165,250,0.6)]',
      anim: 'animate-bubble-3'
    },
    {
      name: 'React.js',
      icon: <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />,
      glow: 'shadow-[0_0_15px_rgba(34,211,238,0.35)] border-cyan-500/40 bg-cyan-950/80',
      pos: 'top-40 -right-4 sm:-right-8',
      scatter: 'translate-x-14 translate-y-4 scale-110 shadow-[0_0_25px_rgba(34,211,238,0.6)]',
      anim: 'animate-bubble-1'
    },
    {
      name: 'JavaScript',
      icon: <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />,
      glow: 'shadow-[0_0_15px_rgba(251,191,36,0.35)] border-amber-500/40 bg-amber-950/80',
      pos: 'bottom-16 -right-2 sm:-right-5',
      scatter: 'translate-x-12 translate-y-10 scale-110 shadow-[0_0_25px_rgba(251,191,36,0.6)]',
      anim: 'animate-bubble-2'
    },
    {
      name: 'Python',
      icon: <Terminal className="w-4 h-4 sm:w-5 sm:h-5 text-blue-300" />,
      glow: 'shadow-[0_0_15px_rgba(147,197,253,0.35)] border-blue-400/40 bg-slate-900/90',
      pos: '-bottom-3 right-10 sm:right-16',
      scatter: 'translate-x-10 translate-y-12 scale-110 shadow-[0_0_25px_rgba(147,197,253,0.6)]',
      anim: 'animate-bubble-3'
    },
    {
      name: 'Firebase',
      icon: <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />,
      glow: 'shadow-[0_0_15px_rgba(251,146,60,0.35)] border-orange-500/40 bg-orange-950/80',
      pos: '-bottom-2 left-10 sm:left-16',
      scatter: '-translate-x-10 translate-y-12 scale-110 shadow-[0_0_25px_rgba(251,146,60,0.6)]',
      anim: 'animate-bubble-1'
    },
    {
      name: 'UI/UX Design',
      icon: <Palette className="w-4 h-4 sm:w-5 sm:h-5 text-pink-400" />,
      glow: 'shadow-[0_0_15px_rgba(244,114,182,0.35)] border-pink-500/40 bg-pink-950/80',
      pos: 'bottom-20 -left-3 sm:-left-6',
      scatter: '-translate-x-14 translate-y-8 scale-110 shadow-[0_0_25px_rgba(244,114,182,0.6)]',
      anim: 'animate-bubble-2'
    },
    {
      name: 'VS Code',
      icon: <Laptop className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400" />,
      glow: 'shadow-[0_0_15px_rgba(129,140,248,0.35)] border-indigo-500/40 bg-indigo-950/80',
      pos: 'top-32 -left-4 sm:-left-8',
      scatter: '-translate-x-14 -translate-y-2 scale-110 shadow-[0_0_25px_rgba(129,140,248,0.6)]',
      anim: 'animate-bubble-3'
    },
    {
      name: 'GitHub',
      icon: <Github className="w-4 h-4 sm:w-5 sm:h-5 text-slate-200" />,
      glow: 'shadow-[0_0_15px_rgba(226,232,240,0.25)] border-slate-600 bg-slate-900/90',
      pos: 'top-12 -left-2 sm:-left-4',
      scatter: '-translate-x-12 -translate-y-8 scale-110 shadow-[0_0_25px_rgba(226,232,240,0.6)]',
      anim: 'animate-bubble-1'
    }
  ];

  return (
    <section id="home" className="relative pt-24 sm:pt-28 pb-12 flex items-center justify-center overflow-hidden">
      
      {/* Background Accent Glows */}
      <div className="absolute top-1/4 left-1/4 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-purple-600/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column - Hero Text */}
          <div className="lg:col-span-7 flex flex-col gap-4 text-left">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-extrabold text-blue-400 tracking-wider uppercase w-fit">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Hello, I'm</span>
            </div>

            {/* Uppercase Name */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-none uppercase">
              {config.name || 'TAMANNA'}
            </h1>

            {/* Role / Title */}
            <div className="flex items-center gap-2 flex-wrap text-xs sm:text-sm font-extrabold text-slate-200">
              <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300">College Student</span>
              <span className="text-blue-500">•</span>
              <span className="px-2.5 py-1 rounded-md bg-purple-950/60 border border-purple-500/30 text-purple-300">
                {config.title || 'AI Developer & Freelancer'}
              </span>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl font-normal mt-1">
              {config.bio}
            </p>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-2 flex-wrap">
              <button
                onClick={() => onNavigatePage('projects')}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-xl shadow-purple-600/25 hover:scale-105"
              >
                <span>View My Projects</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onHireMeClick}
                className="px-5 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-extrabold text-xs sm:text-sm flex items-center gap-2 border border-slate-700/80 transition-all cursor-pointer hover:scale-105"
              >
                <span>Hire Me</span>
                <Send className="w-4 h-4 text-purple-400" />
              </button>
            </div>

            {/* Social Media Links */}
            <div className="flex items-center gap-2.5 pt-2 flex-wrap">
              <span className="text-xs font-bold text-slate-400 mr-1">Let's connect</span>
              
              {config.githubUrl && (
                <a
                  href={config.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-white hover:border-blue-500/50 transition-all cursor-pointer hover:scale-110"
                  title="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}

              {config.linkedinUrl && (
                <a
                  href={config.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-white hover:border-blue-500/50 transition-all cursor-pointer hover:scale-110"
                  title="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}

              {config.instagramUrl && (
                <a
                  href={config.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-white hover:border-purple-500/50 transition-all cursor-pointer hover:scale-110"
                  title="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}

              {config.twitterUrl && (
                <a
                  href={config.twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-white hover:border-blue-500/50 transition-all cursor-pointer hover:scale-110"
                  title="Twitter / X"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              )}

              {config.email && (
                <a
                  href={`mailto:${config.email}`}
                  className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-white hover:border-blue-500/50 transition-all cursor-pointer hover:scale-110"
                  title="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              )}
            </div>

          </div>

          {/* Right Column - Avatar Frame with Interactive 3D Card Flip & Magnetic Scatter Tech Badges */}
          <div className="lg:col-span-5 flex justify-center items-center relative py-6 sm:py-10">
            
            {/* Main Interactive Avatar Wrapper */}
            <div
              className="relative group/avatar cursor-pointer select-none"
              onMouseEnter={() => setIsInteracting(true)}
              onMouseLeave={() => setIsInteracting(false)}
              onClick={() => setIsFlipped((prev) => !prev)}
              title="Click photo to 3D flip face!"
            >
              {/* Glowing Orbit Outer Ring */}
              <div
                className={`relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full border-2 transition-all duration-700 p-2.5 flex items-center justify-center ${
                  isFlipped
                    ? 'border-purple-400/80 shadow-[0_0_100px_rgba(168,85,247,0.5)] scale-[1.03]'
                    : isInteracting
                    ? 'border-blue-400/80 shadow-[0_0_90px_rgba(59,130,246,0.4)] scale-[1.02]'
                    : 'border-purple-500/30 shadow-[0_0_80px_rgba(168,85,247,0.2)]'
                }`}
              >
                {/* 3D Perspective Card Container */}
                <div className="w-full h-full rounded-full relative [perspective:1000px]">
                  <div
                    className={`w-full h-full rounded-full relative transition-transform duration-700 [transform-style:preserve-3d] ${
                      isFlipped ? '[transform:rotateY(180deg)]' : ''
                    }`}
                  >
                    {/* FRONT FACE (Primary Photo) */}
                    <div className="absolute inset-0 w-full h-full rounded-full overflow-hidden bg-[#090e1a] border-2 border-blue-400/40 shadow-2xl flex items-center justify-center [backface-visibility:hidden]">
                      <SkeletonImage
                        src={config.heroImage}
                        alt={config.name || 'TAMANNA'}
                        containerClassName="w-full h-full rounded-full"
                        className="w-full h-full object-cover object-center filter contrast-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#080b14]/80 via-transparent to-transparent pointer-events-none" />

                      {/* Flip Hint Badge on Hover */}
                      <div className="absolute bottom-4 inset-x-0 flex justify-center opacity-0 group-hover/avatar:opacity-100 transition-all duration-300 pointer-events-none transform translate-y-2 group-hover/avatar:translate-y-0">
                        <span className="px-3 py-1 rounded-full bg-slate-950/90 border border-blue-400/60 text-blue-200 text-[11px] font-black flex items-center gap-1.5 shadow-xl backdrop-blur-md">
                          <RotateCw className="w-3.5 h-3.5 text-blue-400 animate-spin" />
                          <span>Flip Photo 🔄</span>
                        </span>
                      </div>
                    </div>

                    {/* BACK FACE (Secondary / Alternate Photo) */}
                    <div className="absolute inset-0 w-full h-full rounded-full overflow-hidden bg-[#0b0f20] border-2 border-purple-400/60 shadow-2xl flex items-center justify-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
                      <SkeletonImage
                        src={config.secondaryHeroImage || config.heroImage}
                        alt={`${config.name || 'TAMANNA'} - Secondary`}
                        containerClassName="w-full h-full rounded-full"
                        className="w-full h-full object-cover object-center filter contrast-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-purple-950/80 via-transparent to-transparent pointer-events-none" />

                      {/* Flip Back Hint Badge */}
                      <div className="absolute bottom-4 inset-x-0 flex justify-center opacity-0 group-hover/avatar:opacity-100 transition-all duration-300 pointer-events-none transform translate-y-2 group-hover/avatar:translate-y-0">
                        <span className="px-3 py-1 rounded-full bg-purple-950/90 border border-purple-400/60 text-purple-200 text-[11px] font-black flex items-center gap-1.5 shadow-xl backdrop-blur-md">
                          <RotateCw className="w-3.5 h-3.5 text-purple-400 animate-spin" />
                          <span>Flip Front 🔄</span>
                        </span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Floating Tech Badges (Outward Scatter ONLY on Flip State) */}
                {techBubbles.map((item, idx) => (
                  <div
                    key={idx}
                    className={`absolute ${item.pos} ${item.anim} flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border backdrop-blur-md ${item.glow} transition-all duration-700 ease-in-out cursor-pointer pointer-events-auto z-20 ${
                      isFlipped ? item.scatter : 'hover:scale-125 hover:z-30'
                    }`}
                  >
                    <div className="p-1 rounded-full bg-slate-900/80 flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                    <span className="hidden sm:inline text-[11px] font-extrabold text-white tracking-wide whitespace-nowrap">
                      {item.name}
                    </span>
                  </div>
                ))}

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
