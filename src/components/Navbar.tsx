import React, { useState } from 'react';
import { Download, Menu, X, Moon, Sun, ShieldCheck } from 'lucide-react';
import { Language, ThemeMode } from '../types';
import { usePortfolio } from '../context/PortfolioContext';
import { SkeletonImage } from './SkeletonImage';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  currentTheme: ThemeMode;
  onThemeChange: (theme: ThemeMode, x?: number, y?: number) => void;
  onOpenResumeModal: () => void;
  activePage: string;
  onNavigatePage: (page: string) => void;
  onOpenAdminCMS?: () => void;
  onReplayIntro?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTheme,
  onThemeChange,
  onOpenResumeModal,
  activePage,
  onNavigatePage,
  onOpenAdminCMS,
  onReplayIntro
}) => {
  const { config, isAdmin } = usePortfolio();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'education', label: 'Education' },
    { id: 'projects', label: 'Projects' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Hire Me' },
    { id: 'track-status', label: 'Track Request' }
  ];

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigatePage(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeTheme = config.theme || 'dynamic';
  const isMinimal = activeTheme === 'minimal';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 py-3 transition-colors duration-500 ${
      isMinimal
        ? 'bg-[#0d1322]/95 backdrop-blur-xl border-b border-pink-500/20 shadow-2xl'
        : 'bg-[#080b14]/90 backdrop-blur-md border-b border-slate-800/80 shadow-xl'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Left Brand: Logo + Uppercase Brand Name */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group text-left"
          >
            {config.footerImage ? (
              <SkeletonImage
                src={config.footerImage}
                alt="Header Logo"
                containerClassName={`w-9 h-9 rounded-xl border shadow-md group-hover:scale-105 transition-transform shrink-0 ${
                  isMinimal ? 'border-pink-500/40 shadow-pink-500/10' : 'border-slate-700'
                }`}
                className="w-9 h-9 rounded-xl object-cover"
              />
            ) : (
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm text-white shadow-md group-hover:scale-105 transition-transform shrink-0 ${
                isMinimal ? 'bg-gradient-to-br from-pink-500 to-rose-600 shadow-pink-600/30' : 'bg-blue-600 shadow-blue-600/30'
              }`}>
                {config.footerLogoText || 'TA'}
              </div>
            )}
            <div className="flex flex-col">
              <span className="text-sm sm:text-base font-black text-white tracking-wider uppercase leading-none">
                {config.name || 'TAMANNA'}
              </span>
              <span className={`text-[10px] font-bold tracking-wider uppercase mt-0.5 ${
                isMinimal ? 'text-pink-400' : 'text-blue-400'
              }`}>
                {config.title || 'AI Developer & Freelancer'}
              </span>
            </div>
          </button>

          {/* Center Links (Multi-page views) */}
          <nav className={`hidden md:flex items-center gap-1.5 lg:gap-2 p-1.5 rounded-2xl border transition-colors ${
            isMinimal ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-900/80 border-slate-800'
          }`}>
            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                    isActive
                      ? isMinimal
                        ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-md shadow-pink-600/30'
                        : 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Admin Panel Button if Logged In */}
            {isAdmin && (
              <button
                onClick={onOpenAdminCMS}
                className="px-3 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-black flex items-center gap-1.5 shadow-lg shadow-emerald-600/30 transition-all cursor-pointer hover:scale-105"
                title="Open Admin CMS Dashboard"
              >
                <ShieldCheck className="w-4 h-4 text-cyan-200 animate-pulse" />
                <span className="hidden sm:inline">Admin Panel</span>
              </button>
            )}

            {onReplayIntro && config.enableIntroScreen !== false && (
              <button
                onClick={onReplayIntro}
                className="px-2.5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-200 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer hover:scale-105"
                title="Watch Japanese Sakura Intro Stage"
              >
                <span>🌸</span>
                <span className="hidden lg:inline text-[11px]">Intro Stage</span>
              </button>
            )}

            <button
              onClick={onOpenResumeModal}
              className={`px-3.5 py-2 rounded-xl text-white text-xs font-extrabold flex items-center gap-1.5 shadow-lg transition-all cursor-pointer hover:scale-105 ${
                isMinimal
                  ? 'bg-gradient-to-r from-pink-600 to-rose-600 shadow-pink-600/30'
                  : 'bg-blue-600 shadow-blue-600/30 hover:bg-blue-500'
              }`}
            >
              <span>Download CV</span>
              <Download className="w-3.5 h-3.5" />
            </button>

            {/* Dark/Light Mode Switcher */}
            <button
              onClick={(e) => {
                const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
                onThemeChange(nextTheme, e.clientX, e.clientY);
              }}
              className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title={currentTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {currentTheme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 cursor-pointer"
            >
              {mobileMenuOpen ? <X className={`w-5 h-5 ${isMinimal ? 'text-pink-400' : 'text-blue-400'}`} /> : <Menu className="w-5 h-5 text-slate-300" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-3 bg-[#0a0f1d] border border-slate-800 rounded-2xl grid grid-cols-2 gap-2 shadow-2xl">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-center py-2.5 px-3 text-xs font-extrabold rounded-xl transition-all ${
                  activePage === link.id
                    ? isMinimal
                      ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-lg shadow-pink-600/30'
                      : 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'text-slate-300 hover:text-white bg-slate-900/80 border border-slate-800'
                }`}
              >
                {link.label}
              </button>
            ))}

            {isAdmin && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenAdminCMS) onOpenAdminCMS();
                }}
                className="col-span-2 text-center py-2.5 px-3 text-xs font-black rounded-xl bg-emerald-600 text-white flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30"
              >
                <ShieldCheck className="w-4 h-4 text-cyan-200" />
                <span>Open Admin Panel CMS</span>
              </button>
            )}
          </div>
        )}

      </div>
    </header>
  );
};
