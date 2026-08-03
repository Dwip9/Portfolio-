import React, { useState, useEffect } from 'react';
import { Language, ThemeMode, Project, Service } from './types';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { ParticleCanvas } from './components/ParticleCanvas';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { QuickStats } from './components/QuickStats';
import { AboutMe } from './components/AboutMe';
import { SkillsSection } from './components/SkillsSection';
import { ServicesSection } from './components/ServicesSection';
import { EducationTimeline } from './components/EducationTimeline';
import { FeaturedProjects } from './components/FeaturedProjects';
import { WhyChooseMe } from './components/WhyChooseMe';
import { LetsWorkTogether } from './components/LetsWorkTogether';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { InteractiveAIChat } from './components/InteractiveAIChat';
import { ResumeModal } from './components/ResumeModal';
import { ProjectPreviewModal } from './components/ProjectPreviewModal';
import { AdminCMSModal } from './components/AdminCMSModal';
import { BackgroundMusicPlayer } from './components/BackgroundMusicPlayer';
import { MinimalThemeView } from './components/MinimalThemeView';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function AppContent() {
  const { config } = usePortfolio();
  const activeTheme = config.theme || 'dynamic';
  const [currentLang, setCurrentLang] = useState<Language>('EN');
  const [currentTheme, setCurrentTheme] = useState<ThemeMode>('dark');
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [adminCMSOpen, setAdminCMSOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [preselectedService, setPreselectedService] = useState<Service | null>(null);
  
  // Water drop ripple animation state
  const [rippleState, setRippleState] = useState<{ x: number; y: number; targetTheme: ThemeMode } | null>(null);

  // Page switching state: 'home', 'about', 'skills', 'education', 'services', 'projects', 'contact', 'all'
  const [activePage, setActivePage] = useState<string>('home');

  const handleThemeChange = (newTheme: ThemeMode, x?: number, y?: number) => {
    // Check if View Transitions API is supported by the browser
    if (typeof document !== 'undefined' && 'startViewTransition' in document && x !== undefined && y !== undefined) {
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      const transition = (document as any).startViewTransition(() => {
        setCurrentTheme(newTheme);
      });

      transition.ready.then(() => {
        const clipPath = [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`
        ];
        document.documentElement.animate(
          {
            clipPath: clipPath
          },
          {
            duration: 500,
            easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
            pseudoElement: '::view-transition-new(root)'
          }
        );
      });
    } else if (x !== undefined && y !== undefined) {
      // Fallback: Hardware-accelerated Water Drop Ripple
      setRippleState({ x, y, targetTheme: newTheme });
      setTimeout(() => {
        setCurrentTheme(newTheme);
      }, 180);
      setTimeout(() => {
        setRippleState(null);
      }, 650);
    } else {
      setCurrentTheme(newTheme);
    }
  };

  useEffect(() => {
    document.documentElement.classList.remove('theme-dark', 'theme-light', 'theme-cyber', 'theme-deep');
    document.documentElement.classList.add(`theme-${currentTheme}`);
    if (currentTheme === 'light') {
      document.body.classList.add('bg-slate-50', 'text-slate-900');
      document.body.classList.remove('bg-[#080b14]', 'text-slate-100');
    } else {
      document.body.classList.add('bg-[#080b14]', 'text-slate-100');
      document.body.classList.remove('bg-slate-50', 'text-slate-900');
    }
  }, [currentTheme]);

  const handleHireMeClick = () => {
    setActivePage('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageNavigation = (page: string) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Next/Prev page order for page pagination
  const pagesOrder = ['home', 'about', 'skills', 'education', 'services', 'projects', 'contact', 'track-status'];
  const currentPageIndex = pagesOrder.indexOf(activePage);

  const goToNextPage = () => {
    if (currentPageIndex < pagesOrder.length - 1) {
      handlePageNavigation(pagesOrder[currentPageIndex + 1]);
    }
  };

  const goToPrevPage = () => {
    if (currentPageIndex > 0) {
      handlePageNavigation(pagesOrder[currentPageIndex - 1]);
    }
  };

  const activeColorScheme = config.colorScheme || 'default';
  const activeFontFamily = config.fontFamily || 'sans';

  return (
    <div className={`min-h-screen relative overflow-x-hidden flex flex-col justify-between transition-colors duration-500 font-${activeFontFamily}-mode color-scheme-${activeColorScheme} ${
      activeTheme === 'minimal'
        ? 'text-slate-100 bg-[#070b14] selection:bg-pink-500 selection:text-white'
        : 'text-slate-100 bg-[#080b14] selection:bg-blue-500 selection:text-white'
    }`}>
      
      {/* Water Drop Ripple Transition Overlay */}
      {rippleState && (
        <div
          className="water-drop-ripple"
          style={{
            left: `${rippleState.x}px`,
            top: `${rippleState.y}px`,
            backgroundColor: rippleState.targetTheme === 'light' ? '#f8fafc' : '#080b14',
            border: rippleState.targetTheme === 'light' ? '3px solid #3b82f6' : '3px solid #818cf8'
          }}
        />
      )}

      {/* Background Floating Particles (Only active in Dynamic Theme) */}
      {activeTheme === 'dynamic' && <ParticleCanvas interactive={true} />}

      {/* Trailing Custom Cursor */}
      <CustomCursor />

      {/* Header Navigation Bar */}
      <Navbar
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        currentTheme={currentTheme}
        onThemeChange={handleThemeChange}
        onOpenResumeModal={() => setResumeModalOpen(true)}
        activePage={activePage}
        onNavigatePage={handlePageNavigation}
        onOpenAdminCMS={() => setAdminCMSOpen(true)}
      />

      {/* Main Page Content */}
      <main className="relative z-10 pt-16 flex-1">
        {activeTheme === 'minimal' ? (
          <MinimalThemeView
            currentLang={currentLang}
            activePage={activePage}
            onNavigatePage={handlePageNavigation}
            onHireMeClick={handleHireMeClick}
            onOpenResumeModal={() => setResumeModalOpen(true)}
            onPreviewProject={(proj) => setSelectedProject(proj)}
          />
        ) : (
          <>
            {/* 1. HOME PAGE VIEW */}
            {activePage === 'home' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <Hero
                  currentLang={currentLang}
                  onHireMeClick={handleHireMeClick}
                  onNavigatePage={handlePageNavigation}
                />

                <QuickStats />

                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <AboutMe currentLang={currentLang} />
                </section>

                <FeaturedProjects
                  currentLang={currentLang}
                  onPreviewProject={(proj) => setSelectedProject(proj)}
                  isHomepage={true}
                  onViewAllProjects={() => handlePageNavigation('projects')}
                />

                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                  <LetsWorkTogether onHireMeClick={handleHireMeClick} />
                </section>
              </div>
            )}

            {/* 2. ABOUT PAGE VIEW */}
            {activePage === 'about' && (
              <div className="pt-12 pb-16 min-h-[70vh] flex flex-col justify-center animate-in fade-in duration-300">
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <AboutMe currentLang={currentLang} />
                </section>
              </div>
            )}

            {/* 3. SKILLS PAGE VIEW */}
            {activePage === 'skills' && (
              <div className="pt-12 pb-16 min-h-[70vh] flex flex-col justify-center animate-in fade-in duration-300">
                <SkillsSection currentLang={currentLang} />
              </div>
            )}

            {/* 4. EDUCATION PAGE VIEW */}
            {activePage === 'education' && (
              <div className="pt-12 pb-16 min-h-[70vh] flex flex-col justify-center animate-in fade-in duration-300">
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <EducationTimeline />
                </section>
              </div>
            )}

            {/* 5. SERVICES PAGE VIEW */}
            {activePage === 'services' && (
              <div className="pt-12 pb-16 min-h-[70vh] animate-in fade-in duration-300">
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                    <div className="lg:col-span-6">
                      <ServicesSection />
                    </div>
                    <div className="lg:col-span-6">
                      <WhyChooseMe />
                    </div>
                  </div>
                </section>
              </div>
            )}

            {/* 6. PROJECTS PAGE VIEW */}
            {activePage === 'projects' && (
              <div className="pt-12 pb-16 min-h-[70vh] animate-in fade-in duration-300">
                <FeaturedProjects
                  currentLang={currentLang}
                  onPreviewProject={(proj) => setSelectedProject(proj)}
                  isHomepage={false}
                />
              </div>
            )}

            {/* 7. CONTACT / HIRE ME PAGE VIEW */}
            {activePage === 'contact' && (
              <div className="pt-12 pb-16 min-h-[70vh] animate-in fade-in duration-300">
                <ContactSection
                  currentLang={currentLang}
                  preselectedService={preselectedService}
                  initialTab="submit"
                />
              </div>
            )}

            {/* 8. TRACK REQUEST STATUS PAGE VIEW */}
            {activePage === 'track-status' && (
              <div className="pt-12 pb-16 min-h-[70vh] animate-in fade-in duration-300">
                <ContactSection
                  currentLang={currentLang}
                  preselectedService={preselectedService}
                  initialTab="track"
                />
              </div>
            )}
          </>
        )}

        {/* Page Switcher Navigation Bar at the bottom of dedicated page views */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-slate-800/60 mt-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
              {currentPageIndex > 0 ? (
                <button
                  onClick={goToPrevPage}
                  className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 hover:text-white hover:border-slate-700 flex items-center gap-2 transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4 text-blue-400" />
                  <span>Previous Page: <strong className="text-white capitalize">{pagesOrder[currentPageIndex - 1]}</strong></span>
                </button>
              ) : <div />}

              {currentPageIndex < pagesOrder.length - 1 && (
                <button
                  onClick={goToNextPage}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-blue-600/30"
                >
                  <span>Next Page: <strong className="text-white capitalize">{pagesOrder[currentPageIndex + 1]}</strong></span>
                  <ChevronRight className="w-4 h-4 text-white" />
                </button>
              )}
            </div>
          </div>

      </main>

      {/* Footer */}
      <Footer currentLang={currentLang} />

      {/* Floating AI Assistant Chat Bot */}
      <InteractiveAIChat onOpenAdminCMS={() => setAdminCMSOpen(true)} />

      {/* Resume Modal */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
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

      {/* Persistent Background Music Player */}
      <BackgroundMusicPlayer />

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
