import React, { useState } from 'react';
import {
  ArrowRight,
  Download,
  Mail,
  Github,
  Linkedin,
  Instagram,
  Twitter,
  ExternalLink,
  Code2,
  Sparkles,
  Layers,
  CheckCircle2,
  Send,
  Phone,
  MapPin,
  ChevronRight,
  RotateCw,
  User,
  Briefcase,
  GraduationCap,
  Award,
  Globe,
  Sliders
} from 'lucide-react';
import { Language, Project, Service } from '../types';
import { usePortfolio } from '../context/PortfolioContext';
import { SkeletonImage } from './SkeletonImage';
import { QuickStats } from './QuickStats';
import { SkillsSection } from './SkillsSection';
import { EducationTimeline } from './EducationTimeline';
import { ServicesSection } from './ServicesSection';
import { WhyChooseMe } from './WhyChooseMe';
import { ContactSection } from './ContactSection';

interface MinimalThemeViewProps {
  currentLang: Language;
  activePage: string;
  onNavigatePage: (page: string) => void;
  onHireMeClick: () => void;
  onOpenResumeModal: () => void;
  onPreviewProject: (proj: Project) => void;
}

export const MinimalThemeView: React.FC<MinimalThemeViewProps> = ({
  currentLang,
  activePage,
  onNavigatePage,
  onHireMeClick,
  onOpenResumeModal,
  onPreviewProject
}) => {
  const { config, projects = [] } = usePortfolio();
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Unique project categories for filter
  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen text-slate-100 bg-[#0b0f19] selection:bg-pink-500 selection:text-white font-sans antialiased">
      
      {/* 1. HOMEPAGE VIEW */}
      {activePage === 'home' && (
        <div className="space-y-20 pb-16 animate-in fade-in duration-500">
          
          {/* MINIMAL HERO SECTION */}
          <section className="relative pt-12 sm:pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Editorial Headline & Bio */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Status Pill */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-semibold text-slate-300 backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="w-2 h-2 rounded-full bg-emerald-400 absolute" />
                  <span className="ml-1 tracking-wide font-medium">Available for Hire & Freelance Projects</span>
                </div>

                {/* Big Bold Minimal Title */}
                <div className="space-y-2">
                  <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
                    {config.name || 'DWIP HALDER'}
                  </h1>
                  <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                    {config.title || 'AI DEVELOPER & FREELANCER'}
                  </h2>
                </div>

                {/* Clean Bio */}
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-normal">
                  {config.bio ||
                    'I build modern Android applications, intelligent AI-powered solutions, responsive websites, and automation tools. Passionate about turning creative ideas into scalable digital products.'}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    onClick={onHireMeClick}
                    className="px-6 py-3 rounded-xl bg-white text-slate-950 hover:bg-slate-200 text-xs font-black tracking-wider uppercase flex items-center gap-2 transition-all cursor-pointer shadow-xl shadow-white/10"
                  >
                    <span>Hire Me Now</span>
                    <ArrowRight className="w-4 h-4 text-slate-950" />
                  </button>

                  <button
                    onClick={onOpenResumeModal}
                    className="px-6 py-3 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-200 hover:text-white text-xs font-extrabold tracking-wider uppercase flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-pink-400" />
                    <span>View CV / Resume</span>
                  </button>
                </div>

                {/* Social Links */}
                <div className="pt-4 flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mr-2">Connect:</span>
                  {config.githubUrl && (
                    <a
                      href={config.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all"
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
                      className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all"
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
                      className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all"
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
                      className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all"
                      title="Twitter"
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                  )}
                </div>

              </div>

              {/* Right Column: Sleek Glass Card Profile Image */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-sm">
                  
                  {/* Subtle Background Glow */}
                  <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-pink-500 to-purple-600 opacity-25 blur-2xl" />

                  {/* Clean Minimal Card Container */}
                  <div
                    onClick={() => setIsFlipped((prev) => !prev)}
                    className="relative rounded-3xl bg-slate-900/90 border border-slate-800 p-4 shadow-2xl cursor-pointer group transition-all duration-500 hover:border-slate-700"
                    title="Click to flip photo"
                  >
                    <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-slate-950">
                      <SkeletonImage
                        src={isFlipped && config.secondaryHeroImage ? config.secondaryHeroImage : config.heroImage}
                        alt={config.name || 'Profile'}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      
                      {/* Photo Flip Badge overlay */}
                      {config.secondaryHeroImage && (
                        <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-700 text-slate-200 text-[10px] font-extrabold flex items-center gap-1.5 backdrop-blur-md shadow-lg">
                          <RotateCw className="w-3 h-3 text-pink-400 animate-spin" />
                          <span>Flip Photo</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-4 flex items-center justify-between px-2">
                      <div>
                        <span className="text-xs font-bold text-white block">{config.name}</span>
                        <span className="text-[10px] text-slate-400 block">{config.location || 'West Bengal, India'}</span>
                      </div>
                      <div className="px-2.5 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-[10px] font-black text-pink-400 uppercase">
                        Minimalist
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </section>

          {/* QUICK STATS */}
          <QuickStats />

          {/* FEATURED PROJECTS */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-pink-400 block mb-1">Portfolio</span>
                <h2 className="text-2xl sm:text-3xl font-black text-white">Featured Projects</h2>
              </div>
              <button
                onClick={() => onNavigatePage('projects')}
                className="text-xs font-bold text-slate-300 hover:text-white flex items-center gap-1 transition-all cursor-pointer"
              >
                <span>View All ({projects.length})</span>
                <ChevronRight className="w-4 h-4 text-pink-400" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.slice(0, 3).map((proj) => (
                <div
                  key={proj.id}
                  onClick={() => onPreviewProject(proj)}
                  className="rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 overflow-hidden cursor-pointer group transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                      <SkeletonImage
                        src={proj.image}
                        alt={proj.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-950/80 border border-slate-800 text-[10px] font-extrabold text-pink-300">
                        {proj.category}
                      </div>
                    </div>

                    <div className="p-5 space-y-2">
                      <h3 className="text-base font-bold text-white group-hover:text-pink-400 transition-colors">
                        {proj.name}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {proj.shortDescription}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-800/60 mt-3">
                    <div className="flex flex-wrap gap-1">
                      {proj.tags.slice(0, 3).map((tag, idx) => (
                        <span key={idx} className="text-[9px] font-semibold text-slate-400 bg-slate-800/60 px-2 py-0.5 rounded-md">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs font-bold text-pink-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Details <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SERVICES PREVIEW */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ServicesSection />
          </section>

          {/* CONTACT SECTION */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContactSection currentLang={currentLang} />
          </section>

        </div>
      )}

      {/* 2. ABOUT PAGE VIEW */}
      {activePage === 'about' && (
        <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 animate-in fade-in duration-300">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-pink-400">Background</span>
            <h1 className="text-3xl sm:text-4xl font-black text-white">About DWIP HALDER</h1>
            <p className="text-sm text-slate-400">
              Passionate developer specializing in Android development, AI integration, and scalable full-stack web solutions.
            </p>
          </div>

          <QuickStats />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <User className="w-5 h-5 text-pink-400" />
                <span>Biography & Vision</span>
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                {config.bio}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                <div>
                  <span className="text-xs font-semibold text-slate-400 block">Location</span>
                  <span className="text-sm font-bold text-white block mt-0.5">{config.location || 'West Bengal, India'}</span>
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-400 block">Primary Email</span>
                  <span className="text-sm font-bold text-white block mt-0.5">{config.email || 'dwiphalderofficial@gmail.com'}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8">
              <EducationTimeline />
            </div>
          </div>
        </div>
      )}

      {/* 3. SKILLS PAGE VIEW */}
      {activePage === 'skills' && (
        <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-in fade-in duration-300">
          <SkillsSection currentLang={currentLang} />
        </div>
      )}

      {/* 4. EDUCATION PAGE VIEW */}
      {activePage === 'education' && (
        <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-in fade-in duration-300">
          <EducationTimeline />
        </div>
      )}

      {/* 5. SERVICES PAGE VIEW */}
      {activePage === 'services' && (
        <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 animate-in fade-in duration-300">
          <ServicesSection />
          <WhyChooseMe />
        </div>
      )}

      {/* 6. PROJECTS PAGE VIEW */}
      {activePage === 'projects' && (
        <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-pink-400 block mb-1">Portfolio</span>
              <h1 className="text-3xl font-black text-white">All Built Projects ({projects.length})</h1>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/30'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((proj) => (
              <div
                key={proj.id}
                onClick={() => onPreviewProject(proj)}
                className="rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 overflow-hidden cursor-pointer group transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                    <SkeletonImage
                      src={proj.image}
                      alt={proj.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-950/80 border border-slate-800 text-[10px] font-extrabold text-pink-300">
                      {proj.category}
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <h3 className="text-base font-bold text-white group-hover:text-pink-400 transition-colors">
                      {proj.name}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {proj.shortDescription}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-800/60 mt-3">
                  <div className="flex flex-wrap gap-1">
                    {proj.tags.slice(0, 3).map((tag, idx) => (
                      <span key={idx} className="text-[9px] font-semibold text-slate-400 bg-slate-800/60 px-2 py-0.5 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs font-bold text-pink-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Details <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. CONTACT / HIRE ME PAGE VIEW */}
      {(activePage === 'contact' || activePage === 'track-status') && (
        <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-in fade-in duration-300">
          <ContactSection
            currentLang={currentLang}
            initialTab={activePage === 'track-status' ? 'track' : 'submit'}
          />
        </div>
      )}

    </div>
  );
};
