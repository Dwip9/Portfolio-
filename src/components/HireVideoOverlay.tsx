import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Volume2, VolumeX, X, Sparkles, CheckCircle2 } from 'lucide-react';

interface HireVideoOverlayProps {
  isOpen: boolean;
  desktopVideoUrl?: string;
  mobileVideoUrl?: string;
  clientName?: string;
  purpose?: string;
  onFinished: () => void;
}

// Futuristic default fallback video stream URLs if none uploaded by admin yet
const DEFAULT_DESKTOP_VIDEO = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';
const DEFAULT_MOBILE_VIDEO = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';

export const HireVideoOverlay: React.FC<HireVideoOverlayProps> = ({
  isOpen,
  desktopVideoUrl,
  mobileVideoUrl,
  clientName,
  purpose,
  onFinished
}) => {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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

  const [videoSrc, setVideoSrc] = useState<string>('');

  // Convert Base64 data URL to Blob Object URL for fast smooth video playback
  useEffect(() => {
    if (!activeVideoSrc) return;
    if (activeVideoSrc.startsWith('data:video/')) {
      try {
        const parts = activeVideoSrc.split(',');
        const mimeMatch = parts[0].match(/:(.*?);/);
        const mime = mimeMatch ? mimeMatch[1] : 'video/mp4';
        const bstr = atob(parts[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        const blob = new Blob([u8arr], { type: mime });
        const blobUrl = URL.createObjectURL(blob);
        setVideoSrc(blobUrl);

        return () => {
          URL.revokeObjectURL(blobUrl);
        };
      } catch (err) {
        console.warn('Failed to convert base64 video to blob URL in HireVideoOverlay:', err);
        setVideoSrc(activeVideoSrc);
      }
    } else {
      setVideoSrc(activeVideoSrc);
    }
  }, [activeVideoSrc]);

  // Handle Fade out & finish trigger
  const handleFinished = () => {
    if (isFadingOut) return;
    setIsFadingOut(true);
    setTimeout(() => {
      onFinished();
    }, 700);
  };

  // Auto-play video with audio fallback
  useEffect(() => {
    if (!isOpen) {
      setIsFadingOut(false);
      return;
    }

    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.muted = false;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          setIsMuted(false);
        }).catch((err) => {
          console.warn('Autoplay with sound restricted by browser, muting initially:', err);
          if (videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current.play().catch((err2) => {
              console.warn('HireVideoOverlay video playback restricted or failed, proceeding:', err2);
              handleFinished();
            });
          }
        });
      }
    }

    const maxTimer = setTimeout(() => {
      handleFinished();
    }, 60000); // 60s limit max

    return () => clearTimeout(maxTimer);
  }, [isOpen]);

  const toggleSound = () => {
    if (videoRef.current) {
      const nextState = !isMuted;
      videoRef.current.muted = nextState;
      setIsMuted(nextState);
    }
  };

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
        src={videoSrc || DEFAULT_DESKTOP_VIDEO}
        autoPlay
        playsInline
        muted={isMuted}
        onEnded={handleFinished}
        onError={() => {
          console.warn('Video element load error in HireVideoOverlay, finishing video stage smoothly');
          handleFinished();
        }}
        className="w-full h-full object-cover absolute inset-0"
        style={{ width: '100vw', height: '100vh', objectFit: 'cover' }}
      />

      {/* Subtle Top Floating Controls & Broadcast Info */}
      <div className="absolute top-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-b from-black/90 via-black/40 to-transparent flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/40 animate-pulse shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs sm:text-base font-black text-white flex items-center gap-2">
              <span>{clientName ? `🎉 ${clientName} Just Hired Tamanna!` : '🎉 Hire Request Submitted!'}</span>
              <Sparkles className="w-4 h-4 text-amber-400" />
            </h3>
            <p className="text-[10px] sm:text-xs text-blue-300 font-medium">
              {purpose ? `Service: ${purpose}` : 'Celebrating new project collaboration!'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* Mute / Unmute Button */}
          <button
            onClick={toggleSound}
            className={`px-3 py-2 rounded-xl text-xs font-bold text-white flex items-center gap-1.5 transition-all cursor-pointer backdrop-blur-md border ${
              isMuted ? 'bg-amber-500/80 border-amber-400 animate-pulse' : 'bg-slate-900/80 border-slate-700'
            }`}
            title={isMuted ? 'Click to Enable Sound' : 'Mute'}
          >
            {isMuted ? (
              <>
                <VolumeX className="w-4 h-4 text-amber-200" />
                <span className="hidden sm:inline">Enable Sound</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-emerald-400" />
                <span className="hidden sm:inline">Sound On</span>
              </>
            )}
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
