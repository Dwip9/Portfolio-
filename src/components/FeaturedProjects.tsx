import React, { useState } from 'react';
import { ArrowUpRight, ArrowRight, Layers, Smartphone, Globe, Sparkles } from 'lucide-react';
import { Project, Language } from '../types';
import { usePortfolio } from '../context/PortfolioContext';
import { SkeletonImage } from './SkeletonImage';

interface FeaturedProjectsProps {
  currentLang?: Language;
  onPreviewProject: (project: Project) => void;
  isHomepage?: boolean;
  onViewAllProjects?: () => void;
}

export const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({
  onPreviewProject,
  isHomepage = true,
  onViewAllProjects
}) => {
  const { projects } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Filter projects by category when on dedicated projects page
  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter((p) => p.category.toLowerCase().includes(selectedCategory.toLowerCase()) || selectedCategory.toLowerCase().includes(p.category.toLowerCase()));

  // On homepage show strictly up to 4 projects, otherwise show filtered projects
  const displayedProjects = isHomepage ? projects.slice(0, 4) : filteredProjects;

  const categories = ['All', 'Web Apps', 'Android APK', 'AI Integration'];

  return (
    <section id="projects" className="relative py-12 sm:py-16 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-extrabold text-blue-400 uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>{isHomepage ? 'Homepage Showcase' : 'Complete Works & Apps'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
            {isHomepage ? 'Featured Projects (4 Max)' : 'All Projects & Live Demos'}
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-2 font-medium">
            Explore Android APKs, Web Applications, and AI integrations created with high quality.
          </p>

          {/* Category Filter Pills on Dedicated Projects Page */}
          {!isHomepage && (
            <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                      : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 2 Projects Per Row Grid (Strictly 2 per row across all viewports) */}
        <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:gap-8">
          {displayedProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => onPreviewProject(project)}
              className="group relative glass-panel rounded-2xl sm:rounded-3xl border border-slate-800 hover:border-blue-500/50 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(59,130,246,0.2)] cursor-pointer flex flex-col"
            >
              {/* Project Image Banner */}
              <div className="relative h-32 sm:h-48 md:h-56 w-full overflow-hidden bg-slate-900 shrink-0">
                <SkeletonImage
                  src={project.image}
                  alt={project.name}
                  referrerPolicy="no-referrer"
                  containerClassName="w-full h-full"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080b14] via-[#080b14]/30 to-transparent pointer-events-none z-10" />
                
                {/* Category Badge */}
                <div className="absolute top-2 left-2 sm:top-4 sm:left-4 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-blue-600/90 text-white text-[9px] sm:text-[10px] font-black uppercase tracking-wider shadow-md backdrop-blur-md">
                  {project.category}
                </div>
              </div>

              {/* Card Details */}
              <div className="p-3 sm:p-5 md:p-6 flex-1 flex flex-col justify-between space-y-2 sm:space-y-4">
                <div>
                  <h3 className="text-xs sm:text-base md:text-lg font-black text-white group-hover:text-blue-400 transition-colors uppercase tracking-wide line-clamp-2">
                    {project.name}
                  </h3>
                  
                  {/* Truncated Description */}
                  <p className="text-slate-300 text-[11px] sm:text-xs md:text-sm mt-1 sm:mt-2 line-clamp-2 leading-relaxed">
                    {project.shortDescription}
                  </p>
                </div>

                {/* Tags & Action Row */}
                <div className="pt-2 flex items-center justify-between border-t border-slate-800/80 gap-1.5">
                  <div className="flex flex-wrap gap-1 overflow-hidden max-h-6 sm:max-h-none">
                    {(project.tags || ['React', 'Firebase']).slice(0, 2).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-1.5 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-[9px] sm:text-[10px] font-extrabold text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <span className="text-[11px] sm:text-xs font-bold text-blue-400 flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                      <span className="hidden sm:inline">Inspect</span>
                      <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </span>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* View All Projects Button on Homepage */}
        {isHomepage && projects.length > 0 && (
          <div className="mt-12 text-center">
            <button
              onClick={onViewAllProjects}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xs sm:text-sm font-black shadow-xl shadow-blue-600/30 hover:scale-105 transition-all cursor-pointer uppercase tracking-wider"
            >
              <span>View All Projects ({projects.length})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
