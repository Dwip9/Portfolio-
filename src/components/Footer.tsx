import React from 'react';
import { ArrowUp } from 'lucide-react';
import { Language } from '../types';
import { usePortfolio } from '../context/PortfolioContext';
import { SkeletonImage } from './SkeletonImage';

interface FooterProps {
  currentLang?: Language;
}

export const Footer: React.FC<FooterProps> = () => {
  const { config } = usePortfolio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact' }
  ];

  const activeTheme = config.theme || 'dynamic';
  const isMinimal = activeTheme === 'minimal';

  return (
    <footer className={`relative border-t py-8 z-10 text-xs transition-colors duration-500 ${
      isMinimal
        ? 'border-pink-500/20 bg-[#070b14] text-slate-300'
        : 'border-slate-800/80 bg-[#060912] text-slate-400'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left: Logo + Custom Footer Image + Copyright */}
          <div className="flex items-center gap-3">
            {config.footerImage ? (
              <SkeletonImage
                src={config.footerImage}
                alt="Footer Logo"
                containerClassName={`w-8 h-8 rounded-lg border shadow-md ${
                  isMinimal ? 'border-pink-500/30' : 'border-slate-700'
                }`}
                className="w-8 h-8 rounded-lg object-cover"
              />
            ) : (
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm text-white shadow-md ${
                isMinimal ? 'bg-gradient-to-r from-pink-600 to-rose-600 shadow-pink-600/30' : 'bg-blue-600 shadow-blue-600/30'
              }`}>
                {config.footerLogoText || 'TA'}
              </div>
            )}

            <p className="font-medium text-slate-400">
              {config.footerCopyright || `© ${new Date().getFullYear()} TAMANNA ARTFOLIO. All rights reserved.`}
            </p>
          </div>

          {/* Center Links */}
          <div className="flex items-center gap-6 flex-wrap justify-center">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`transition-colors cursor-pointer font-medium ${
                  isMinimal ? 'hover:text-pink-400' : 'hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right: Back to Top */}
          <button
            onClick={scrollToTop}
            className={`px-4 py-2 rounded-xl border flex items-center gap-2 transition-all cursor-pointer font-bold ${
              isMinimal
                ? 'bg-slate-900 border-pink-500/30 hover:border-pink-400 text-slate-200 hover:text-white'
                : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-200 hover:text-white'
            }`}
          >
            <ArrowUp className={`w-3.5 h-3.5 ${isMinimal ? 'text-pink-400' : 'text-blue-400'}`} />
            <span>Back to Top</span>
          </button>

        </div>
      </div>
    </footer>
  );
};
