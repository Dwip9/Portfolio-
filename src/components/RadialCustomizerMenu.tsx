import React, { useState } from 'react';
import { 
  Palette, 
  Sparkles, 
  Type, 
  Sliders, 
  X, 
  RotateCcw, 
  Check, 
  Wand2, 
  Eye, 
  Zap, 
  Heart, 
  Stars, 
  Flower2, 
  Moon, 
  Sun,
  Crown,
  Layers,
  CircleDot
} from 'lucide-react';

export interface CustomizerSettings {
  particlesEnabled: boolean;
  particleType: 'flowers' | 'stars' | 'hearts' | 'sparkles';
  particleSpeed: 'slow' | 'normal' | 'fast' | 'orbit';
  themePreset: 'rose' | 'midnight' | 'cyber' | 'sakura' | 'emerald' | 'sunset' | 'light';
  fontPreset: 'serif' | 'sans' | 'script' | 'tech';
  frameStyle: 'pulse' | 'gold' | 'cyber' | 'minimal' | 'floral';
  ambientGlow: boolean;
}

export const DEFAULT_CUSTOMIZER_SETTINGS: CustomizerSettings = {
  particlesEnabled: true,
  particleType: 'flowers',
  particleSpeed: 'normal',
  themePreset: 'rose',
  fontPreset: 'serif',
  frameStyle: 'pulse',
  ambientGlow: true,
};

interface RadialCustomizerMenuProps {
  isRadialOpen: boolean;
  onToggleRadial: () => void;
  onCloseRadial: () => void;
  settings: CustomizerSettings;
  onUpdateSettings: (newSettings: Partial<CustomizerSettings>) => void;
  onResetSettings: () => void;
  onTriggerMagicFX: () => void;
}

export const RadialCustomizerMenu: React.FC<RadialCustomizerMenuProps> = ({
  isRadialOpen,
  onToggleRadial,
  onCloseRadial,
  settings,
  onUpdateSettings,
  onResetSettings,
  onTriggerMagicFX
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'particles' | 'themes' | 'fonts' | 'frame'>('particles');

  const THEMES = [
    { id: 'rose', name: 'Rose Velvet', color: 'from-rose-500 to-pink-600', bg: '#120e14', text: '#f472b6' },
    { id: 'midnight', name: 'Midnight Obsidian', color: 'from-indigo-600 to-purple-800', bg: '#0b0f19', text: '#818cf8' },
    { id: 'cyber', name: 'Cyber Neon', color: 'from-fuchsia-500 to-cyan-400', bg: '#0d021a', text: '#e879f9' },
    { id: 'sakura', name: 'Sakura Pink', color: 'from-pink-400 to-rose-300', bg: '#1a0c16', text: '#f472b6' },
    { id: 'emerald', name: 'Emerald Dream', color: 'from-emerald-500 to-teal-700', bg: '#041512', text: '#34d399' },
    { id: 'sunset', name: 'Sunset Golden', color: 'from-amber-500 to-rose-600', bg: '#170b09', text: '#fbbf24' },
    { id: 'light', name: 'Light Aesthetic', color: 'from-rose-400 to-amber-300', bg: '#fff8f9', text: '#e11d48' },
  ];

  const FONTS = [
    { id: 'serif', name: 'Playfair Serif', sample: 'Art & Design', styleClass: 'font-serif' },
    { id: 'sans', name: 'Jakarta Sans', sample: 'Clean & Modern', styleClass: 'font-sans' },
    { id: 'script', name: 'Cursive Artist', sample: 'Elegant Script', styleClass: 'font-[Dancing_Script,cursive]' },
    { id: 'tech', name: 'Space Monospace', sample: 'Digital Tech', styleClass: 'font-mono' },
  ];

  const FRAMES = [
    { id: 'pulse', name: 'Glowing Rose Pulse', desc: 'Soft breathing aura halo' },
    { id: 'gold', name: 'Golden Royal Border', desc: 'Shimmering metallic gold ring' },
    { id: 'cyber', name: 'Neon Cyber Ring', desc: 'Vibrant futuristic glowing neon' },
    { id: 'floral', name: 'Blossom Wreath', desc: 'Floating floral petals around photo' },
    { id: 'minimal', name: 'Minimal Pearl', desc: 'Sleek ultra-clean thin border' },
  ];

  const RADIAL_NODES = [
    {
      id: 'particles',
      label: settings.particlesEnabled ? 'Animations ON' : 'Animations OFF',
      icon: <Sparkles className="w-4 h-4 text-amber-300" />,
      color: 'bg-amber-500/90 text-white',
      onClick: () => {
        onUpdateSettings({ particlesEnabled: !settings.particlesEnabled });
      }
    },
    {
      id: 'theme_quick',
      label: 'Change Theme',
      icon: <Palette className="w-4 h-4 text-rose-300" />,
      color: 'bg-rose-600/90 text-white',
      onClick: () => {
        setIsDrawerOpen(true);
        setActiveTab('themes');
        onCloseRadial();
      }
    },
    {
      id: 'font_quick',
      label: 'Change Font',
      icon: <Type className="w-4 h-4 text-sky-300" />,
      color: 'bg-sky-600/90 text-white',
      onClick: () => {
        setIsDrawerOpen(true);
        setActiveTab('fonts');
        onCloseRadial();
      }
    },
    {
      id: 'frame_quick',
      label: 'Avatar Frame',
      icon: <CircleDot className="w-4 h-4 text-emerald-300" />,
      color: 'bg-emerald-600/90 text-white',
      onClick: () => {
        setIsDrawerOpen(true);
        setActiveTab('frame');
        onCloseRadial();
      }
    },
    {
      id: 'magic_fx',
      label: 'Magic Burst!',
      icon: <Wand2 className="w-4 h-4 text-fuchsia-300" />,
      color: 'bg-fuchsia-600/90 text-white',
      onClick: () => {
        onTriggerMagicFX();
        onCloseRadial();
      }
    },
    {
      id: 'drawer_full',
      label: 'Studio Customizer',
      icon: <Sliders className="w-4 h-4 text-purple-300" />,
      color: 'bg-purple-600/90 text-white',
      onClick: () => {
        setIsDrawerOpen(true);
        setActiveTab('particles');
        onCloseRadial();
      }
    }
  ];

  return (
    <>
      {/* Central Trigger Badge Button (Palette Icon) */}
      <div className="relative inline-block">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleRadial();
          }}
          className={`relative z-20 p-2.5 sm:p-3 rounded-full shadow-2xl border transition-all duration-300 cursor-pointer active:scale-90 ${
            isRadialOpen 
              ? 'bg-rose-600 text-white border-rose-300 scale-110 ring-4 ring-rose-500/40 rotate-90' 
              : 'bg-white/95 dark:bg-rose-950/95 text-rose-500 border-rose-200 dark:border-rose-800 hover:scale-110 hover:bg-rose-50 dark:hover:bg-rose-900'
          }`}
          title="Open Design & Animation Control Menu"
        >
          {isRadialOpen ? (
            <X className="w-5 h-5 text-white animate-spin-once" />
          ) : (
            <Palette className="w-5 h-5 text-rose-500 transition-transform duration-300 group-hover:scale-110" />
          )}
        </button>
      </div>

      {/* =========================================================
          1. FLOATING QUICK CUSTOMIZER POPOVER (100% Inside Viewport Frame)
      ========================================================= */}
      {isRadialOpen && (
        <>
          {/* Subtle Dim Backdrop */}
          <div 
            className="fixed inset-0 bg-black/40 z-40 animate-fade-in"
            onClick={onCloseRadial}
          />

          {/* Floating Popover Card - Positioned strictly inside viewport */}
          <div 
            className="fixed bottom-20 left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-auto sm:right-6 md:right-12 z-50 w-[92vw] sm:w-88 max-w-sm bg-stone-900/95 text-rose-50 border-2 border-rose-500/50 shadow-[0_10px_40px_rgba(0,0,0,0.8)] rounded-3xl p-4 sm:p-5 backdrop-blur-xl animate-scale-up space-y-4 max-h-[80vh] overflow-y-auto no-scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Popover Header */}
            <div className="flex items-center justify-between border-b border-rose-900/60 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
                  <Palette className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold font-serif text-rose-100 flex items-center gap-1">
                    Design & Studio Controls <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  </h4>
                  <p className="text-[10px] text-rose-300/70">Customizer Controls</p>
                </div>
              </div>

              <button
                onClick={onCloseRadial}
                className="p-1.5 rounded-full bg-stone-800 hover:bg-stone-700 text-rose-200 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Actions Grid */}
            <div className="space-y-3">
              
              {/* 1. Animation & Floating Particle Toggle */}
              <div className="p-3 rounded-2xl bg-stone-950/80 border border-stone-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <div>
                    <div className="text-xs font-bold text-rose-100">Floating Animations</div>
                    <div className="text-[10px] text-stone-400">
                      {settings.particlesEnabled ? 'Blossoms/Stars Active' : 'Disabled'}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onUpdateSettings({ particlesEnabled: !settings.particlesEnabled })}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    settings.particlesEnabled
                      ? 'bg-amber-500 text-stone-950 shadow-md'
                      : 'bg-stone-800 text-stone-400'
                  }`}
                >
                  {settings.particlesEnabled ? 'ON' : 'OFF'}
                </button>
              </div>

              {/* Particle Shape Pills */}
              {settings.particlesEnabled && (
                <div className="grid grid-cols-4 gap-1.5">
                  {[
                    { id: 'flowers', label: '🌸 Flowers' },
                    { id: 'stars', label: '⭐ Stars' },
                    { id: 'hearts', label: '💖 Hearts' },
                    { id: 'sparkles', label: '✨ Dust' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => onUpdateSettings({ particleType: p.id as any })}
                      className={`py-1.5 px-1 rounded-xl text-[10px] font-bold border transition-all text-center cursor-pointer ${
                        settings.particleType === p.id
                          ? 'bg-amber-950 border-amber-400 text-amber-200'
                          : 'bg-stone-950/60 border-stone-800 text-stone-400 hover:text-white'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              )}

              {/* 2. Color Theme Palette Circles */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-rose-300/80">Theme Presets</label>
                <div className="grid grid-cols-7 gap-1.5 p-2 rounded-2xl bg-stone-950/80 border border-stone-800">
                  {THEMES.map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => onUpdateSettings({ themePreset: theme.id as any })}
                      className={`w-7 h-7 rounded-full bg-gradient-to-tr ${theme.color} ring-2 transition-all cursor-pointer flex items-center justify-center mx-auto ${
                        settings.themePreset === theme.id ? 'ring-amber-400 scale-125 shadow-lg' : 'ring-transparent opacity-80 hover:opacity-100'
                      }`}
                      title={theme.name}
                    >
                      {settings.themePreset === theme.id && <Check className="w-3 h-3 text-white drop-shadow" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Font Presets */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-rose-300/80">Typography</label>
                <div className="grid grid-cols-2 gap-1.5">
                  {FONTS.map((font) => (
                    <button
                      key={font.id}
                      onClick={() => onUpdateSettings({ fontPreset: font.id as any })}
                      className={`p-2 rounded-xl border text-[11px] font-bold transition-all text-left cursor-pointer ${
                        settings.fontPreset === font.id
                          ? 'bg-sky-950 border-sky-400 text-sky-200'
                          : 'bg-stone-950/60 border-stone-800 text-stone-400 hover:text-white'
                      }`}
                    >
                      <span className={font.styleClass}>{font.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Frame Aura Style */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-rose-300/80">Photo Frame Aura</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: 'pulse', label: 'Glowing Pulse' },
                    { id: 'gold', label: 'Gold Ring' },
                    { id: 'cyber', label: 'Neon Cyber' },
                  ].map((fr) => (
                    <button
                      key={fr.id}
                      onClick={() => onUpdateSettings({ frameStyle: fr.id as any })}
                      className={`py-1.5 px-2 rounded-xl text-[10px] font-bold border transition-all text-center cursor-pointer ${
                        settings.frameStyle === fr.id
                          ? 'bg-emerald-950 border-emerald-400 text-emerald-200'
                          : 'bg-stone-950/60 border-stone-800 text-stone-400 hover:text-white'
                      }`}
                    >
                      {fr.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Bottom Actions */}
            <div className="pt-2 border-t border-stone-800 flex items-center justify-between gap-2">
              <button
                onClick={() => {
                  onTriggerMagicFX();
                  onCloseRadial();
                }}
                className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md hover:brightness-110 active:scale-95 transition-all cursor-pointer"
              >
                <Wand2 className="w-3.5 h-3.5" />
                <span>Magic Burst</span>
              </button>

              <button
                onClick={() => {
                  setIsDrawerOpen(true);
                  onCloseRadial();
                }}
                className="py-2 px-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-rose-200 font-bold text-xs flex items-center gap-1 transition-all cursor-pointer"
                title="Open Studio Customizer Drawer"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>More</span>
              </button>
            </div>

          </div>
        </>
      )}


      {/* =========================================================
          2. FULL STUDIO CUSTOMIZER DRAWER / MODAL
      ========================================================= */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-md animate-fade-in">
          
          <div 
            className="w-full max-w-xl bg-stone-900 text-rose-50 rounded-t-3xl sm:rounded-3xl border border-rose-900/60 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Header */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-rose-950 via-stone-900 to-rose-950 border-b border-rose-900/50 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
                  <Palette className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold font-serif text-rose-100 flex items-center gap-1.5">
                    Studio Customizer <Sparkles className="w-4 h-4 text-amber-400" />
                  </h3>
                  <p className="text-xs text-rose-300/70">Personalize themes, floating animations, fonts & photo aura</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={onResetSettings}
                  className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-rose-300 hover:text-white text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer"
                  title="Reset to default settings"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Reset</span>
                </button>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-2 rounded-xl bg-rose-900/50 hover:bg-rose-800 text-rose-200 hover:text-white transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-stone-800 bg-stone-950/80 px-3 pt-2 gap-1 overflow-x-auto no-scrollbar">
              <button
                onClick={() => setActiveTab('particles')}
                className={`px-3.5 py-2.5 text-xs font-bold rounded-t-xl transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  activeTab === 'particles'
                    ? 'bg-stone-900 text-amber-300 border-t-2 border-amber-400 shadow-md'
                    : 'text-stone-400 hover:text-rose-200'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Animations & Stars</span>
              </button>

              <button
                onClick={() => setActiveTab('themes')}
                className={`px-3.5 py-2.5 text-xs font-bold rounded-t-xl transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  activeTab === 'themes'
                    ? 'bg-stone-900 text-rose-400 border-t-2 border-rose-400 shadow-md'
                    : 'text-stone-400 hover:text-rose-200'
                }`}
              >
                <Palette className="w-3.5 h-3.5" />
                <span>Color Themes</span>
              </button>

              <button
                onClick={() => setActiveTab('fonts')}
                className={`px-3.5 py-2.5 text-xs font-bold rounded-t-xl transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  activeTab === 'fonts'
                    ? 'bg-stone-900 text-sky-400 border-t-2 border-sky-400 shadow-md'
                    : 'text-stone-400 hover:text-rose-200'
                }`}
              >
                <Type className="w-3.5 h-3.5" />
                <span>Typography</span>
              </button>

              <button
                onClick={() => setActiveTab('frame')}
                className={`px-3.5 py-2.5 text-xs font-bold rounded-t-xl transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  activeTab === 'frame'
                    ? 'bg-stone-900 text-emerald-400 border-t-2 border-emerald-400 shadow-md'
                    : 'text-stone-400 hover:text-rose-200'
                }`}
              >
                <CircleDot className="w-3.5 h-3.5" />
                <span>Photo Aura</span>
              </button>
            </div>

            {/* Tab Contents */}
            <div className="p-5 overflow-y-auto space-y-6 flex-1">

              {/* 1. ANIMATIONS & FLOATING STARS */}
              {activeTab === 'particles' && (
                <div className="space-y-5">
                  {/* Master Toggle */}
                  <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-rose-100 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        Floating Background Particles
                      </h4>
                      <p className="text-xs text-rose-300/70 mt-0.5">Toggle floating blossoms, stars or glowing dust</p>
                    </div>

                    <button
                      onClick={() => onUpdateSettings({ particlesEnabled: !settings.particlesEnabled })}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                        settings.particlesEnabled ? 'bg-amber-500' : 'bg-stone-800'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          settings.particlesEnabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  {settings.particlesEnabled && (
                    <>
                      {/* Particle Shape / Style Selector */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-rose-200/80 uppercase tracking-wider">Particle Shape</label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                          {[
                            { id: 'flowers', name: 'Sakura Blossoms', icon: <Flower2 className="w-4 h-4 text-pink-400" /> },
                            { id: 'stars', name: 'Twinkling Stars', icon: <Stars className="w-4 h-4 text-amber-300" /> },
                            { id: 'hearts', name: 'Floating Hearts', icon: <Heart className="w-4 h-4 text-rose-400" /> },
                            { id: 'sparkles', name: 'Glowing Dust', icon: <Sparkles className="w-4 h-4 text-sky-300" /> },
                          ].map((shape) => (
                            <button
                              key={shape.id}
                              onClick={() => onUpdateSettings({ particleType: shape.id as any })}
                              className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                                settings.particleType === shape.id
                                  ? 'bg-amber-950/40 border-amber-500/80 text-amber-200 ring-2 ring-amber-500/30'
                                  : 'bg-stone-950/60 border-stone-800 text-stone-400 hover:text-white'
                              }`}
                            >
                              {shape.icon}
                              <span>{shape.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Speed Control */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-rose-200/80 uppercase tracking-wider">Floating Speed</label>
                        <div className="grid grid-cols-4 gap-2">
                          {[
                            { id: 'slow', label: 'Gentle Slow' },
                            { id: 'normal', label: 'Normal Rhythm' },
                            { id: 'fast', label: 'Turbo Flow' },
                            { id: 'orbit', label: 'Orbiting Spin' },
                          ].map((sp) => (
                            <button
                              key={sp.id}
                              onClick={() => onUpdateSettings({ particleSpeed: sp.id as any })}
                              className={`py-2 px-2 rounded-xl text-[11px] font-bold border transition-all cursor-pointer text-center ${
                                settings.particleSpeed === sp.id
                                  ? 'bg-rose-900/50 border-rose-400 text-rose-100 shadow'
                                  : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-white'
                              }`}
                            >
                              {sp.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* 2. COLOR THEMES */}
              {activeTab === 'themes' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {THEMES.map((theme) => (
                      <button
                        key={theme.id}
                        onClick={() => onUpdateSettings({ themePreset: theme.id as any })}
                        className={`p-3.5 rounded-2xl border transition-all text-left flex items-center justify-between cursor-pointer ${
                          settings.themePreset === theme.id
                            ? 'bg-stone-950 border-rose-500 ring-2 ring-rose-500/30 shadow-lg'
                            : 'bg-stone-950/50 border-stone-800 hover:border-stone-700'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full bg-gradient-to-tr ${theme.color} ring-2 ring-white/20 shadow-md shrink-0`} />
                          <div>
                            <div className="text-xs font-bold text-rose-100">{theme.name}</div>
                            <div className="text-[10px] text-stone-400 font-mono mt-0.5">Preset Palette</div>
                          </div>
                        </div>

                        {settings.themePreset === theme.id && (
                          <Check className="w-4 h-4 text-rose-400 shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. TYPOGRAPHY */}
              {activeTab === 'fonts' && (
                <div className="space-y-3">
                  {FONTS.map((font) => (
                    <button
                      key={font.id}
                      onClick={() => onUpdateSettings({ fontPreset: font.id as any })}
                      className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                        settings.fontPreset === font.id
                          ? 'bg-stone-950 border-sky-500 ring-2 ring-sky-500/30 shadow-lg'
                          : 'bg-stone-950/50 border-stone-800 hover:border-stone-700'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold text-sky-300">{font.name}</div>
                        <div className={`text-base text-stone-200 mt-1 ${font.styleClass}`}>
                          {font.sample} — {font.name}
                        </div>
                      </div>

                      {settings.fontPreset === font.id && (
                        <Check className="w-5 h-5 text-sky-400 shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              )}

              {/* 4. PHOTO AURA FRAME */}
              {activeTab === 'frame' && (
                <div className="space-y-3">
                  {FRAMES.map((frame) => (
                    <button
                      key={frame.id}
                      onClick={() => onUpdateSettings({ frameStyle: frame.id as any })}
                      className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                        settings.frameStyle === frame.id
                          ? 'bg-stone-950 border-emerald-500 ring-2 ring-emerald-500/30 shadow-lg'
                          : 'bg-stone-950/50 border-stone-800 hover:border-stone-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/50">
                          <CircleDot className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-emerald-200">{frame.name}</div>
                          <div className="text-[11px] text-stone-400">{frame.desc}</div>
                        </div>
                      </div>

                      {settings.frameStyle === frame.id && (
                        <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              )}

            </div>

            {/* Footer Action */}
            <div className="p-4 bg-stone-950 border-t border-stone-800 flex items-center justify-between">
              <button
                onClick={onTriggerMagicFX}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg hover:brightness-110 active:scale-95 transition-all cursor-pointer"
              >
                <Wand2 className="w-4 h-4 animate-spin-slow" />
                <span>Trigger Magic Convergence</span>
              </button>

              <button
                onClick={() => setIsDrawerOpen(false)}
                className="px-5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-bold text-xs transition-all cursor-pointer"
              >
                Done
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
