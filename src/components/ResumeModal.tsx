import React, { useState } from 'react';
import { X, Download, Printer, Copy, Check, FileText, Sparkles, GraduationCap, Code, Phone, Mail, MapPin, FileUp } from 'lucide-react';
import { PROFILE_DATA, EDUCATION_TIMELINE, SKILLS_LIST } from '../data/portfolioData';
import { usePortfolio } from '../context/PortfolioContext';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const { config } = usePortfolio();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    const text = `
========================================
RESUME - TAMANNA
Digital Artist | 3D Visual Creator | Character Designer
Location: Kolkata, West Bengal, India
Email: ${PROFILE_DATA.email}
Phone: ${PROFILE_DATA.phone}
========================================

EDUCATION:
- B.A. English Honours (1st Year) - Currently Pursuing
- Computer Diploma - Completed
- Higher Secondary Education - Completed
- Secondary Education (Madhyamik) - Completed

CORE SKILLS:
- Android APK Development & Firebase
- Responsive Website Development (React 19, TypeScript, Tailwind)
- AI Integration (Gemini API, ChatGPT, Custom Workflows)
- UI/UX Design & Glassmorphism Aesthetics
- Python, JavaScript, Git & GitHub

EXPERIENCE:
- Freelance Developer & AI Specialist (2024 - Present)
  Delivered 30+ Web Apps, Android APK packages, and AI automation tools for clients.
    `;

    navigator.clipboard.writeText(text.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPDF = () => {
    if (config.cvPdfUrl && config.cvPdfUrl.trim() !== '') {
      const link = document.createElement("a");
      link.href = config.cvPdfUrl;
      link.download = config.cvFileName || "Tamanna_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }

    // Fallback: Generate text blob resume file
    const element = document.createElement("a");
    const file = new Blob([`
TAMANNA - RESUME
Digital Artist | 3D Visual Creator | Character Designer
Email: ${config.email || PROFILE_DATA.email}
Phone: ${config.phone || PROFILE_DATA.phone}
Location: ${config.location || PROFILE_DATA.location}

SUMMARY:
Passionate Digital Artist and 3D Visual Creator specializing in anime character design, 3D environment art, digital illustration, and visual storytelling.

QUALIFICATIONS:
1. Fine Arts & Digital Design Diploma
2. 3D Environment Design Certification
3. Digital Character Design Certification

SKILLS & ARTISTRY:
- 3D Modeling: Blender, ZBrush, Maya, 3D Environments
- Digital Art: Character Design, Concept Art, Illustration, Anime Art
- Tools: Photoshop, Procreate, Substance Painter
    `], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = config.cvFileName || "Tamanna_Resume.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] glass-panel rounded-3xl border border-rose-500/30 shadow-[0_25px_60px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-rose-950 via-pink-950 to-purple-950 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-rose-500/20 border border-rose-400/40">
              <FileText className="w-6 h-6 text-rose-400" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white flex items-center gap-2">
                Tamanna — Official Art Portfolio CV
              </h3>
              <p className="text-xs text-slate-300">
                Verified Art Portfolio & Qualifications Summary
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl glass-panel text-slate-300 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Resume Document Body */}
        <div className="flex-1 p-6 sm:p-8 overflow-y-auto space-y-8 bg-[#080b14]/90 text-slate-200 text-sm">
          
          {/* Identity & Header */}
          <div className="p-6 rounded-2xl glass-panel border border-white/10 flex flex-col sm:flex-row justify-between gap-4">
            <div>
              <h2 className="text-3xl font-black text-white">TAMANNA</h2>
              <p className="text-sm font-bold text-rose-400 mt-1">
                Digital Artist • 3D Visual Creator • Anime Character Designer
              </p>
              <p className="text-xs text-slate-400 mt-2 max-w-lg leading-relaxed">
                Building modern Android applications, intelligent AI-powered solutions, responsive websites, and automation tools.
              </p>
            </div>

            <div className="flex flex-col gap-1.5 text-xs text-slate-300 font-medium">
              <span className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-blue-400" /> {PROFILE_DATA.email}</span>
              <span className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-purple-400" /> {PROFILE_DATA.phone}</span>
              <span className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-cyan-400" /> {PROFILE_DATA.location}</span>
            </div>
          </div>

          {/* Education Section */}
          <div>
            <h4 className="text-lg font-black text-white flex items-center gap-2 mb-4 border-b border-white/10 pb-2">
              <GraduationCap className="w-5 h-5 text-purple-400" />
              Academic History & Qualifications
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {EDUCATION_TIMELINE.map((edu) => (
                <div key={edu.id} className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold text-blue-400 uppercase">{edu.status}</span>
                    <span className="text-[10px] text-slate-400">{edu.year}</span>
                  </div>
                  <h5 className="font-bold text-white text-base mt-1">{edu.degree}</h5>
                  <p className="text-xs text-purple-300 font-semibold">{edu.field}</p>
                  <p className="text-xs text-slate-400 mt-1">{edu.institution}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Core Technical Expertise */}
          <div>
            <h4 className="text-lg font-black text-white flex items-center gap-2 mb-4 border-b border-white/10 pb-2">
              <Code className="w-5 h-5 text-cyan-400" />
              Core Competencies
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {SKILLS_LIST.map((sk) => (
                <div key={sk.id} className="p-3 rounded-xl bg-white/5 border border-white/5 text-xs font-semibold text-slate-200 flex justify-between items-center">
                  <span>{sk.name}</span>
                  <span className="text-blue-400 font-bold">{sk.progress}%</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-950 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-4 py-2 rounded-xl glass-panel text-xs font-bold text-slate-300 hover:text-white flex items-center gap-1.5 border border-white/10 hover:border-blue-400 cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-blue-400" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Text'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl glass-panel text-xs font-bold text-slate-300 hover:text-white flex items-center gap-1.5 border border-white/10 hover:border-purple-400 cursor-pointer"
            >
              <Printer className="w-4 h-4 text-purple-400" />
              <span>Print Resume</span>
            </button>
          </div>

          <button
            onClick={handleDownloadPDF}
            className="px-6 py-2.5 rounded-xl btn-glow text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-lg"
          >
            <Download className="w-4 h-4" />
            <span>Download Official Resume</span>
          </button>
        </div>

      </div>
    </div>
  );
};
