import React, { useState } from 'react';
import { ThemeMode, Project } from './types';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { ParticleCanvas } from './components/ParticleCanvas';
import { CustomCursor } from './components/CustomCursor';
import { NewHomepage } from './components/NewHomepage';
import { ProjectPreviewModal } from './components/ProjectPreviewModal';
import { AdminCMSModal } from './components/AdminCMSModal';
import { HireVideoOverlay } from './components/HireVideoOverlay';
import { ArtistIntroOverlay } from './components/ArtistIntroOverlay';

function AppContent() {
  const { config, liveBroadcast, dismissHireVideoBroadcast } = usePortfolio();
  const [currentTheme, setCurrentTheme] = useState<ThemeMode>('dark');
  const [showArtistIntro, setShowArtistIntro] = useState(true);
  const [adminCMSOpen, setAdminCMSOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const toggleTheme = () => {
    setCurrentTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className={`min-h-screen relative overflow-x-hidden ${
      currentTheme === 'light' ? 'bg-stone-50 text-stone-900' : 'bg-[#080b14] text-slate-100'
    }`}>
      {/* Background Floating Particles */}
      <ParticleCanvas interactive={true} />

      {/* Trailing Custom Cursor */}
      <CustomCursor />

      {/* Main Fresh Clean Homepage */}
      <NewHomepage
        onReplayIntro={() => setShowArtistIntro(true)}
        onPreviewProject={(proj) => setSelectedProject(proj)}
        currentTheme={currentTheme}
        onToggleTheme={toggleTheme}
        onOpenAdminCMS={() => setAdminCMSOpen(true)}
      />

      {/* Project Details Preview Modal */}
      <ProjectPreviewModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Firebase Admin CMS Modal */}
      <AdminCMSModal
        isOpen={adminCMSOpen}
        onClose={() => setAdminCMSOpen(false)}
      />

      {/* Japanese Sakura Artist Intro Overlay & Cinematic Video */}
      {showArtistIntro && (
        <ArtistIntroOverlay onFinished={() => setShowArtistIntro(false)} />
      )}

      {/* Live Broadcast Hire Video Overlay */}
      <HireVideoOverlay
        isOpen={liveBroadcast.active}
        desktopVideoUrl={config.desktopHireVideoUrl}
        mobileVideoUrl={config.mobileHireVideoUrl}
        clientName={liveBroadcast.clientName}
        purpose={liveBroadcast.purpose}
        onFinished={dismissHireVideoBroadcast}
      />
    </div>
  );
}

export default function App() {
  return (
    <PortfolioProvider>
      <AppContent />
    </PortfolioProvider>
  );
}
