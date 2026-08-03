import React from 'react';
import { X, ExternalLink, Github, Download, Sparkles } from 'lucide-react';
import { Project } from '../types';
import { SkeletonImage } from './SkeletonImage';

interface ProjectPreviewModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectPreviewModal: React.FC<ProjectPreviewModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] glass-panel rounded-3xl border border-blue-500/30 shadow-[0_25px_60px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-blue-950 via-indigo-950 to-purple-950 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-blue-500/20 text-cyan-400 border border-cyan-500/30">
              {project.category}
            </span>
            <h3 className="text-xl font-black text-white">
              {project.name}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl glass-panel text-slate-300 hover:text-white hover:bg-white/10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 p-6 sm:p-8 overflow-y-auto space-y-6">
          
          {/* Image Banner */}
          <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-white/10 group shadow-2xl">
            <SkeletonImage
              src={project.image}
              alt={project.name}
              referrerPolicy="no-referrer"
              containerClassName="w-full h-full"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080b14] via-transparent to-transparent opacity-80 pointer-events-none z-10" />

            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end flex-wrap gap-2">
              <div>
                <span className="text-xs font-bold text-blue-400 uppercase tracking-widest block">Project Overview</span>
                <span className="text-2xl font-black text-white">{project.name}</span>
              </div>
            </div>
          </div>

          {/* Description & Details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            <div className="lg:col-span-8 space-y-4">
              <h4 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                About This Project
              </h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                {project.fullDescription || project.description || project.shortDescription}
              </p>

              {/* Metrics */}
              {project.metrics && (
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {project.metrics.map((m, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">{m.label}</span>
                      <span className="text-lg font-black text-cyan-400 mt-0.5 block">{m.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="lg:col-span-4 space-y-4 glass-panel p-5 rounded-2xl border border-white/10">
              <h4 className="text-sm font-bold text-white">Tech Stack Used</h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg bg-blue-500/10 text-blue-300 border border-blue-500/20 text-xs font-bold"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="pt-4 border-t border-white/10 space-y-2">
                <a
                  href={project.liveDemoUrl || project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl btn-glow text-white text-xs font-bold flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Launch Live Demo</span>
                </a>

                {project.apkDownloadUrl && (
                  <a
                    href={project.apkDownloadUrl}
                    download
                    className="w-full py-2.5 px-4 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download APK File</span>
                  </a>
                )}

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl glass-panel text-slate-300 hover:text-white border border-white/10 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>View GitHub Repository</span>
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
