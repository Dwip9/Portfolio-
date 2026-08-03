import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Volume2, VolumeX, X, Sparkles, CheckCircle2 } from 'lucide-react';

interface HireVideoOverlayProps {
  isOpen: boolean;
  desktopVideoUrl?: string;
  mobileVideoUrl?: string;
  onFinished: () => void;
}

// Futuristic default fallback video stream URLs if none uploaded by admin yet
const DEFAULT_DESKTOP_VIDEO = 'https://assets.mixkit.co/videos/preview/mixkit-cyber-punk-city-at-night-41566-large.mp4';
const DEFAULT_MOBILE_VIDEO = 'https://assets.mixkit.co/videos/preview/mixkit-cyber-punk-city-at-night-41566-large.mp4';

export const HireVideoOverlay: React.FC<HireVideoOverlayProps> = ({
  isOpen,
  desktopVideoUrl,
  mobileVideoUrl,
  onFinished
}) => {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(60);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Detect orientation/mobile screen size
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Determine active video source based on screen orientation & availability
  const activeVideoSrc = isMobile
    ? (mobileVideoUrl || desktopVideoUrl || DEFAULT_MOBILE_VIDEO)
    : (desktopVideoUrl || mobileVideoUrl || DEFAULT_DESKTOP_VIDEO);

  // Handle Fade out & finish trigger
  const handleFinished = () => {
    if (isFadingOut) return;
    setIsFadingOut(true);
    setTimeout(() => {
      onFinished();
    }, 700);
  };

  // 60-second max cap timer
  useEffect(() => {
    if (!isOpen) {
      setIsFadingOut(false);
      return;
    }

    const maxTimer = setTimeout(() => {
      handleFinished();
    }, 60000); // 60s limit max

    return () => clearTimeout(maxTimer);
  }, [isOpen]);

  if (!isOpen) return null;

  const content = (
    <div
      className={`fixed top-0 left-0 w-screen h-screen z-[999999] bg-black flex items-center justify-center transition-opacity duration-700 overflow-hidden ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100 animate-in fade-in duration-700'
      }`}
      style={{ top: 0, left: 0, right: 0, bottom: 0, width: '100vw', height: '100vh', position: 'fixed', zIndex: 999999 }}
    >
      {/* Background Video Player - Seamless Full Screen Cover */}
      <video
        ref={videoRef}
        src={activeVideoSrc}
        autoPlay
        playsInline
        muted={isMuted}
        onEnded={handleFinished}
        className="w-full h-full object-cover absolute inset-0"
        style={{ width: '100vw', height: '100vh', objectFit: 'cover' }}
      />

      {/* Subtle Top Floating Controls (No bottom progress/seconds clutter) */}
      <div className="absolute top-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-b from-black/80 via-black/30 to-transparent flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/40 animate-pulse">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs sm:text-base font-black text-white flex items-center gap-2">
              <span>Hire Request Submitted!</span>
              <Sparkles className="w-4 h-4 text-amber-400" />
            </h3>
            <p className="text-[10px] sm:text-xs text-slate-300 font-medium">
              Redirecting to tracking status...
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Mute / Unmute */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-700/80 text-white hover:bg-slate-800 transition-all cursor-pointer backdrop-blur-md"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          {/* Skip / Close Button */}
          <button
            onClick={handleFinished}
            className="px-3.5 py-2 rounded-xl bg-blue-600/90 hover:bg-blue-600 border border-blue-400/40 text-white text-xs font-black flex items-center gap-1.5 shadow-lg shadow-blue-600/30 transition-all cursor-pointer backdrop-blur-md hover:scale-105"
          >
            <span>Skip</span>
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(content, document.body) : null;
};
