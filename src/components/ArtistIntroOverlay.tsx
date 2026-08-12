import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Volume2, VolumeX, ArrowRight, Sparkles, Eye, Film, Flower2 } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface ArtistIntroOverlayProps {
  onFinished: () => void;
}

const DEFAULT_SAMPLE_DESKTOP_VIDEO = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';
const DEFAULT_SAMPLE_MOBILE_VIDEO = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';

export const ArtistIntroOverlay: React.FC<ArtistIntroOverlayProps> = ({ onFinished }) => {
  const { config, isAdmin } = usePortfolio();
  
  // Stages: 'card' -> 'door_opening' -> 'video' -> 'fading'
  const [stage, setStage] = useState<'card' | 'door_opening' | 'video' | 'fading'>('card');
  const [isMuted, setIsMuted] = useState(false); // Video WITH audio by default
  const [isMobile, setIsMobile] = useState(false);
  
  // 3D tilt interaction state on entry card
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const artistName = config.introArtistName || config.name || 'Tamanna';
  const eyebrow = config.introEyebrow || "✨ WELCOME TO THE ARTIST'S WORLD";
  const tagline = config.introTagline || 'A Cinematic Journey into Anime Art & Character Design';
  const buttonText = config.introButtonText || 'ENTER THE ART WORLD';
  const badgeText = config.introBadge || 'STUDIO';
  const rawAvatar = config.introAvatarUrl || config.heroImage || '';
  const avatarUrl = (rawAvatar && !rawAvatar.includes('unsplash.com')) ? rawAvatar : '';

  // Screen width detection for responsive video selection
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Determine active video URL (Mobile 9:16 vs Desktop 16:9)
  const introVid = config.introVideoUrl && config.introVideoUrl.trim() ? config.introVideoUrl.trim() : '';
  const desktopVid = config.desktopHireVideoUrl && config.desktopHireVideoUrl.trim() ? config.desktopHireVideoUrl.trim() : '';
  const mobileVid = config.mobileHireVideoUrl && config.mobileHireVideoUrl.trim() ? config.mobileHireVideoUrl.trim() : '';

  const rawVideoUrl = isMobile
    ? (mobileVid || introVid || desktopVid || DEFAULT_SAMPLE_MOBILE_VIDEO)
    : (desktopVid || introVid || mobileVid || DEFAULT_SAMPLE_DESKTOP_VIDEO);

  const [videoSrc, setVideoSrc] = useState<string>(rawVideoUrl || DEFAULT_SAMPLE_DESKTOP_VIDEO);

  // Convert Base64 data URL to Blob Object URL for instant smooth video streaming
  useEffect(() => {
    if (!rawVideoUrl) {
      setVideoSrc(DEFAULT_SAMPLE_DESKTOP_VIDEO);
      return;
    }
    if (rawVideoUrl.startsWith('data:video/')) {
      try {
        const parts = rawVideoUrl.split(',');
        if (parts.length > 1 && parts[1]) {
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
        } else {
          setVideoSrc(DEFAULT_SAMPLE_DESKTOP_VIDEO);
        }
      } catch (err) {
        console.warn('Failed to convert base64 video to blob URL, falling back:', err);
        setVideoSrc(DEFAULT_SAMPLE_DESKTOP_VIDEO);
      }
    } else {
      setVideoSrc(rawVideoUrl);
    }
  }, [rawVideoUrl]);

  // Lock body scrolling while overlay is visible
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Reload video whenever videoSrc changes
  useEffect(() => {
    if (videoSrc && videoRef.current) {
      try {
        videoRef.current.load();
      } catch (e) {
        // ignore load errors
      }
    }
  }, [videoSrc]);

  // Handle Mouse Movement for interactive 3D Card Tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (stage !== 'card') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
    setTilt({ x: x * 16, y: -y * 16 }); // Max 16 deg tilt
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Trigger 3D Opening & Mandatory Fullscreen Video Playback
  const handleEnterClick = () => {
    if (stage !== 'card') return;

    // 1. Trigger 3D door & card unfold opening stage
    setStage('door_opening');

    // 2. Start playing video behind 3D opening
    if (videoRef.current) {
      try {
        videoRef.current.currentTime = 0;
      } catch (e) {
        // ignore
      }
      videoRef.current.muted = false;
      videoRef.current.volume = 1.0;

      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsMuted(false);
          })
          .catch((err) => {
            console.warn('Unmuted video playback blocked by browser, falling back to muted play:', err);
            if (videoRef.current) {
              videoRef.current.muted = true;
              setIsMuted(true);
              videoRef.current.play().catch((err2) => {
                console.warn('Video play prevented or unsupported, transitioning smoothly to website:', err2);
                setTimeout(() => {
                  handleFinishIntro();
                }, 800);
              });
            }
          });
      }
    }

    // 3. Exactly after 1100ms, 3D doors unfold completely and stage transitions to 'video'
    setTimeout(() => {
      setStage('video');
    }, 1100);
  };

  // Smooth fade-out into website once video completes naturally
  const handleFinishIntro = () => {
    if (stage === 'fading') return;
    setStage('fading');
    setTimeout(() => {
      onFinished();
    }, 1500); // 1.5s smooth transition to homepage
  };

  const toggleMute = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    if (videoRef.current) {
      videoRef.current.muted = nextMute;
      if (!nextMute) {
        videoRef.current.volume = 1.0;
      }
    }
  };

  if (!config.enableIntroScreen) return null;

  const content = (
    <div
      className={`fixed inset-0 z-[999999] bg-black overflow-hidden select-none transition-all duration-[1500ms] ease-out ${
        stage === 'fading' ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100 scale-100'
      }`}
      style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0 }}
    >
      {/* 1. MANDATORY FULLSCREEN EDGE-TO-EDGE VIDEO PLAYER */}
      <video
        ref={videoRef}
        src={videoSrc || DEFAULT_SAMPLE_DESKTOP_VIDEO}
        preload="auto"
        playsInline
        muted={isMuted}
        onClick={() => toggleMute()} // Tap video anywhere to toggle mute cleanly
        onEnded={() => {
          if (stage === 'video' || stage === 'door_opening') {
            handleFinishIntro();
          }
        }}
        onError={() => {
          if (stage === 'video' || stage === 'door_opening') {
            console.warn('Video error, proceeding smoothly to website');
            handleFinishIntro();
          }
        }}
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1500ms] ease-out cursor-pointer ${
          stage === 'fading'
            ? 'opacity-0 scale-110 blur-md pointer-events-none'
            : stage === 'door_opening'
            ? 'opacity-100 z-10 scale-105'
            : stage === 'video'
            ? 'opacity-100 z-10 scale-100'
            : 'opacity-0 pointer-events-none'
        }`}
        style={{ width: '100vw', height: '100vh', objectFit: 'cover' }}
      />

      {/* SUBTLE SOUND TOGGLE & SKIP BUTTON FOR ALL USERS */}
      {(stage === 'video' || stage === 'door_opening') && (
        <>
          {/* Top Right Skip Button */}
          <div className="absolute top-6 right-6 z-[100] animate-in fade-in duration-300">
            <button
              onClick={() => handleFinishIntro()}
              className="px-4 py-2 rounded-full bg-black/60 hover:bg-rose-600 text-white font-bold text-xs sm:text-sm backdrop-blur-md border border-white/20 shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5 cursor-pointer"
            >
              <span>Skip Video</span>
              <span>➔</span>
            </button>
          </div>

          {/* Bottom Right Mute Button */}
          {stage === 'video' && (
            <div className="absolute bottom-6 right-6 z-50 animate-in fade-in zoom-in duration-500">
              <button
                onClick={toggleMute}
                className={`p-3 rounded-full flex items-center justify-center text-white backdrop-blur-xl border shadow-2xl transition-all cursor-pointer hover:scale-110 active:scale-95 ${
                  isMuted
                    ? 'bg-amber-500/80 border-amber-300/80 animate-pulse'
                    : 'bg-black/40 border-white/20 hover:bg-black/60'
                }`}
                title={isMuted ? 'Click to enable audio' : 'Audio active (Click to mute)'}
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5 text-amber-100" />
                ) : (
                  <Volume2 className="w-5 h-5 text-emerald-300" />
                )}
              </button>
            </div>
          )}
        </>
      )}

      {/* 2. ENTRANCE STAGE WITH GORGEOUS 3D FLORAL ART & 3D SHOJI DOORS */}
      {stage !== 'video' && (
        <div
          className={`absolute inset-0 z-20 flex flex-col items-center justify-center p-4 sm:p-6 overflow-hidden transition-all duration-1000 ease-in-out ${
            stage === 'door_opening' ? 'opacity-100 scale-105' : 'opacity-100 scale-100'
          }`}
          style={{
            perspective: '1200px',
            backgroundColor: stage === 'door_opening' ? 'transparent' : '#fdfaf5',
            backgroundImage: stage === 'door_opening' ? 'none' : `
              radial-gradient(circle at 50% 40%, rgba(254, 235, 200, 0.6) 0%, rgba(253, 226, 236, 0.5) 45%, rgba(245, 230, 210, 0.95) 100%)
            `,
          }}
        >
          {stage === 'card' && (
            <>
              {/* Subtle Paper Grain Overlay */}
              <div 
                className="absolute inset-0 opacity-30 pointer-events-none mix-blend-multiply z-0" 
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }}
              />

              {/* RICH 3D FLORAL & Sakura Petals Falling Animation */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                {[...Array(24)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute animate-bounce opacity-80"
                    style={{
                      top: `${(i * 12) % 100}%`,
                      left: `${(i * 19 + 3) % 96}%`,
                      animationDuration: `${3.5 + (i % 6) * 0.8}s`,
                      animationDelay: `${i * 0.25}s`,
                      transform: `rotate(${i * 25}deg) scale(${0.7 + (i % 4) * 0.25})`
                    }}
                  >
                    {i % 2 === 0 ? (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="#f472b6" className="drop-shadow-md opacity-75">
                        <path d="M12 2C12 2 13.5 7 17 8.5C20.5 10 22 12 22 12C22 12 17 13.5 15.5 17C14 20.5 12 22 12 22C12 22 10.5 17 7 15.5C3.5 14 2 12 2 12C2 12 7 10.5 8.5 7C10 3.5 12 2 12 2Z" />
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="#fb7185" className="drop-shadow-sm opacity-80">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    )}
                  </div>
                ))}
              </div>

              {/* 3D FLORAL CORNER BRANCHES (Blooming Flowers Top Right) */}
              <div className="absolute top-0 right-0 w-72 sm:w-96 md:w-[480px] pointer-events-none opacity-95 transition-transform duration-1000 transform translate-x-2 -translate-y-2 z-0 filter drop-shadow-xl">
                <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                  {/* Vine Trunk */}
                  <path d="M400 0 C280 90, 200 60, 120 160 C80 210, 60 230, 0 260" stroke="#4a2e1b" strokeWidth="9" strokeLinecap="round" />
                  <path d="M260 85 C210 130, 190 170, 140 190" stroke="#4a2e1b" strokeWidth="6" strokeLinecap="round" />
                  <path d="M190 145 C150 115, 120 105, 80 95" stroke="#4a2e1b" strokeWidth="4" strokeLinecap="round" />

                  {/* Blooming 3D Flower Clusters */}
                  <g fill="#fbcfe8" stroke="#e11d48" strokeWidth="2">
                    <circle cx="120" cy="160" r="18" />
                    <circle cx="100" cy="148" r="14" />
                    <circle cx="138" cy="152" r="15" />
                    <circle cx="126" cy="178" r="16" />
                    <circle cx="260" cy="85" r="20" />
                    <circle cx="240" cy="72" r="16" />
                    <circle cx="278" cy="98" r="17" />
                    <circle cx="80" cy="95" r="18" />
                    <circle cx="140" cy="190" r="17" />
                    <circle cx="70" cy="260" r="21" />
                  </g>
                  {/* Golden Stamen Interiors */}
                  <g fill="#fbbf24" stroke="#d97706" strokeWidth="1">
                    <circle cx="120" cy="160" r="6" />
                    <circle cx="260" cy="85" r="7" />
                    <circle cx="80" cy="95" r="5.5" />
                    <circle cx="70" cy="260" r="7" />
                  </g>
                </svg>
              </div>

              {/* 3D FLORAL CORNER BRANCHES (Blooming Flowers Bottom Left) */}
              <div className="absolute bottom-0 left-0 w-72 sm:w-96 md:w-[480px] pointer-events-none opacity-95 transition-transform duration-1000 transform -translate-x-2 translate-y-2 z-0 filter drop-shadow-xl">
                <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                  <path d="M0 400 C120 310, 200 340, 280 240 C320 190, 340 170, 400 140" stroke="#4a2e1b" strokeWidth="9" strokeLinecap="round" />
                  <path d="M140 315 C190 270, 210 230, 260 210" stroke="#4a2e1b" strokeWidth="6" strokeLinecap="round" />
                  <g fill="#fbcfe8" stroke="#e11d48" strokeWidth="2">
                    <circle cx="280" cy="240" r="20" />
                    <circle cx="260" cy="252" r="16" />
                    <circle cx="298" cy="228" r="17" />
                    <circle cx="140" cy="315" r="18" />
                    <circle cx="260" cy="210" r="17" />
                  </g>
                  <g fill="#fbbf24" stroke="#d97706" strokeWidth="1">
                    <circle cx="280" cy="240" r="7" />
                    <circle cx="140" cy="315" r="6" />
                  </g>
                </svg>
              </div>

              {/* CENTER 3D TILT ENTRY CARD WITH FLORAL ACCENTS & SHIMMER */}
              <div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={handleEnterClick}
                className="relative z-30 max-w-sm sm:max-w-md w-full p-6 sm:p-10 rounded-[36px] bg-amber-50/90 border-2 border-amber-300/90 shadow-[0_25px_60px_-15px_rgba(120,53,15,0.35)] backdrop-blur-xl flex flex-col items-center text-center transition-all duration-200 ease-out cursor-pointer group"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
                }}
              >
                {/* Gold foiled inner border frame */}
                <div 
                  className="absolute inset-2 rounded-[28px] border border-amber-400/60 pointer-events-none transition-transform duration-300"
                  style={{ transform: 'translateZ(20px)' }}
                />

                {/* Corner Floral Motifs inside card */}
                <Flower2 className="absolute top-4 left-4 w-5 h-5 text-rose-400 opacity-60" style={{ transform: 'translateZ(25px)' }} />
                <Flower2 className="absolute top-4 right-4 w-5 h-5 text-rose-400 opacity-60" style={{ transform: 'translateZ(25px)' }} />
                <Flower2 className="absolute bottom-4 left-4 w-5 h-5 text-rose-400 opacity-60" style={{ transform: 'translateZ(25px)' }} />
                <Flower2 className="absolute bottom-4 right-4 w-5 h-5 text-rose-400 opacity-60" style={{ transform: 'translateZ(25px)' }} />

                {/* 3D ARTIST AVATAR & GOLD GLOW RING */}
                <div 
                  className="relative mb-5 transition-transform duration-500 group-hover:scale-105"
                  style={{ transform: 'translateZ(45px)' }}
                >
                  <div className="absolute -inset-2.5 rounded-full bg-gradient-to-r from-amber-400 via-rose-400 to-amber-500 opacity-80 blur-md group-hover:opacity-100 transition-opacity animate-pulse" />
                  
                  <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full ring-4 ring-amber-400 shadow-2xl overflow-hidden bg-amber-950 flex flex-col items-center justify-center">
                    {avatarUrl ? (
                      <img
                        src={avatarUrl}
                        alt={artistName}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full skeleton-shimmer flex flex-col items-center justify-center p-3 text-center bg-rose-950/90 text-rose-300">
                        <Flower2 className="w-8 h-8 text-rose-400 animate-bounce mb-1" />
                        <span className="text-[10px] font-bold text-rose-200 tracking-wider">Tamanna Art</span>
                      </div>
                    )}
                  </div>

                  <div className="absolute -bottom-2.5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-amber-600 via-amber-700 to-rose-700 text-amber-50 text-[10px] font-black tracking-widest px-4 py-1 rounded-full shadow-lg border border-amber-300 uppercase">
                    {badgeText}
                  </div>
                </div>

                {/* EYEBROW WITH FLORAL ICON */}
                <div 
                  className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-100/90 border border-rose-300 text-rose-900 text-[11px] font-bold tracking-wider my-2 shadow-xs"
                  style={{ transform: 'translateZ(30px)' }}
                >
                  <Sparkles className="w-3.5 h-3.5 text-rose-600" />
                  <span>{eyebrow}</span>
                </div>

                {/* ARTIST TITLE */}
                <h1 
                  className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight font-serif my-1 drop-shadow-xs"
                  style={{ transform: 'translateZ(35px)' }}
                >
                  {artistName}
                </h1>

                {/* TAGLINE */}
                <p 
                  className="text-xs sm:text-sm text-stone-600 font-medium max-w-xs mt-1 mb-6 leading-relaxed"
                  style={{ transform: 'translateZ(25px)' }}
                >
                  {tagline}
                </p>

                {/* MAIN ENTER BUTTON WITH GLOW SHIMMER */}
                <button
                  onClick={handleEnterClick}
                  style={{ transform: 'translateZ(55px)' }}
                  className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-[#e5989b] via-[#b5838d] to-[#6d597a] hover:from-[#d88386] hover:to-[#5c496a] text-white font-bold text-xs sm:text-sm tracking-widest uppercase shadow-xl shadow-pink-950/25 flex items-center justify-center gap-2.5 cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:shadow-pink-900/40 active:scale-95 group/btn relative overflow-hidden"
                >
                  <div className="absolute inset-0 w-1/2 h-full bg-white/25 skew-x-12 -translate-x-full group-hover/btn:translate-x-[300%] transition-transform duration-1000" />

                  <Eye className="w-4 h-4 text-rose-100" />
                  <span>{buttonText}</span>
                  <ArrowRight className="w-4 h-4 text-white group-hover/btn:translate-x-1.5 transition-transform" />
                </button>

                <div 
                  className="flex items-center gap-2 text-[11px] text-amber-900/70 font-semibold mt-4"
                  style={{ transform: 'translateZ(20px)' }}
                >
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  <span>Tap ENTER to unfold 3D stage & begin video</span>
                </div>
              </div>
            </>
          )}

          {/* 3D TRADITIONAL JAPANESE SHOJI DOORS WITH 3D FLIP PERSPECTIVE */}
          {/* Left Sliding 3D Door */}
          <div
            className={`fixed top-0 bottom-0 left-0 w-1/2 z-25 bg-[#2c1d11] border-r-4 border-amber-600/90 shadow-[20px_0_50px_rgba(0,0,0,0.8)] transition-all duration-1000 ease-in-out flex flex-col justify-between p-6 overflow-hidden ${
              stage === 'door_opening' ? '-translate-x-full -rotate-y-45 opacity-0' : 'translate-x-0 rotate-y-0 opacity-100'
            }`}
            style={{
              transformOrigin: 'left center',
              backgroundImage: `
                repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(217, 119, 6, 0.25) 40px, rgba(217, 119, 6, 0.25) 42px),
                repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(217, 119, 6, 0.25) 60px, rgba(217, 119, 6, 0.25) 62px),
                linear-gradient(to right, #24160c, #3a2717)
              `
            }}
          >
            <div className="w-full h-full border-2 border-amber-500/30 rounded-lg p-4 flex flex-col justify-between relative opacity-85">
              <div className="text-[10px] font-mono text-amber-400/60 uppercase tracking-widest">Tamanna • STAGE LEFT</div>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-20 rounded-l-2xl bg-gradient-to-l from-amber-500 to-amber-700 border-2 border-amber-300 flex items-center justify-center shadow-2xl">
                <div className="w-3 h-10 rounded-full bg-amber-950/80 border border-amber-400/50" />
              </div>
            </div>
          </div>

          {/* Right Sliding 3D Door */}
          <div
            className={`fixed top-0 bottom-0 right-0 w-1/2 z-25 bg-[#2c1d11] border-l-4 border-amber-600/90 shadow-[-20px_0_50px_rgba(0,0,0,0.8)] transition-all duration-1000 ease-in-out flex flex-col justify-between p-6 overflow-hidden ${
              stage === 'door_opening' ? 'translate-x-full rotate-y-45 opacity-0' : 'translate-x-0 rotate-y-0 opacity-100'
            }`}
            style={{
              transformOrigin: 'right center',
              backgroundImage: `
                repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(217, 119, 6, 0.25) 40px, rgba(217, 119, 6, 0.25) 42px),
                repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(217, 119, 6, 0.25) 60px, rgba(217, 119, 6, 0.25) 62px),
                linear-gradient(to left, #24160c, #3a2717)
              `
            }}
          >
            <div className="w-full h-full border-2 border-amber-500/30 rounded-lg p-4 flex flex-col justify-between relative opacity-85">
              <div className="text-right text-[10px] font-mono text-amber-400/60 uppercase tracking-widest">Tamanna • STAGE RIGHT</div>
              <div className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-20 rounded-r-2xl bg-gradient-to-r from-amber-500 to-amber-700 border-2 border-amber-300 flex items-center justify-center shadow-2xl">
                <div className="w-3 h-10 rounded-full bg-amber-950/80 border border-amber-400/50" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(content, document.body) : null;
};
