import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, Music, X, ChevronUp, ChevronDown } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const BackgroundMusicPlayer: React.FC = () => {
  const { config } = usePortfolio();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState<number>(config.bgMusicVolume ?? 0.4);
  const [isAutoplayBlocked, setIsAutoplayBlocked] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  const audioUrl = config.bgMusicUrl;
  const isEnabled = config.bgMusicEnabled ?? true;

  // Sync volume from config if admin changes default volume
  useEffect(() => {
    if (config.bgMusicVolume !== undefined) {
      setVolume(config.bgMusicVolume);
      if (audioRef.current) {
        audioRef.current.volume = config.bgMusicVolume;
      }
    }
  }, [config.bgMusicVolume]);

  // Attempt play when url or enabled state changes
  useEffect(() => {
    if (!audioUrl || !isEnabled) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsPlaying(false);
      return;
    }

    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = isMuted ? 0 : volume;

    const tryPlay = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
        setIsAutoplayBlocked(false);
      } catch (err) {
        console.warn('Autoplay blocked by browser. User interaction needed to start music.');
        setIsPlaying(false);
        setIsAutoplayBlocked(true);

        // Attach one-time interaction listeners to start playing on first user gesture
        const handleUserGesture = () => {
          if (audioRef.current && isEnabled && audioUrl) {
            audioRef.current.play().then(() => {
              setIsPlaying(true);
              setIsAutoplayBlocked(false);
            }).catch((e) => console.warn('Play on gesture prevented by browser:', e));
          }
          window.removeEventListener('click', handleUserGesture);
          window.removeEventListener('keydown', handleUserGesture);
          window.removeEventListener('touchstart', handleUserGesture);
        };

        window.addEventListener('click', handleUserGesture, { once: true });
        window.addEventListener('keydown', handleUserGesture, { once: true });
        window.addEventListener('touchstart', handleUserGesture, { once: true });
      }
    };

    tryPlay();
  }, [audioUrl, isEnabled]);

  const togglePlay = async () => {
    if (!audioRef.current || !audioUrl) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
        setIsAutoplayBlocked(false);
      } catch (err) {
        console.warn('Failed to play audio:', err);
      }
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const newMuteState = !isMuted;
    setIsMuted(newMuteState);
    audioRef.current.volume = newMuteState ? 0 : volume;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    setIsMuted(val === 0);
    if (audioRef.current) {
      audioRef.current.volume = val;
    }
  };

  if (!isEnabled || !audioUrl) {
    return null;
  }

  const trackName = config.bgMusicFileName || 'Background Music';

  return (
    <>
      {/* Hidden Audio Tag */}
      <audio
        ref={audioRef}
        src={audioUrl}
        loop
        preload="auto"
        onEnded={() => setIsPlaying(false)}
        onError={(e) => {
          console.warn('Background music track failed to load or has unsupported format:', e);
          setIsPlaying(false);
        }}
      />

      {/* Floating Bottom-Left Audio Control Widget */}
      <div className="fixed bottom-6 left-6 z-[99990] transition-all duration-300">
        {isExpanded ? (
          <div className="glass-panel bg-slate-950/90 border border-blue-500/40 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-md p-2.5 sm:p-3 flex items-center gap-3 max-w-[280px] sm:max-w-[320px] text-white animate-in slide-in-from-bottom-5">
            {/* Equalizer / Music Icon */}
            <div className="relative shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/30 overflow-hidden">
              {isPlaying ? (
                <div className="flex items-end gap-0.5 h-4">
                  <span className="w-1 bg-white rounded-full animate-[bounce_1s_infinite_100ms] h-full" />
                  <span className="w-1 bg-white rounded-full animate-[bounce_1s_infinite_300ms] h-3" />
                  <span className="w-1 bg-white rounded-full animate-[bounce_1s_infinite_200ms] h-4" />
                </div>
              ) : (
                <Music className="w-4 h-4 text-white" />
              )}
            </div>

            {/* Track Info & Autoplay Notice */}
            <div className="flex-1 min-w-0 pr-1">
              <div className="flex items-center gap-1.5">
                <p className="text-xs font-bold text-white truncate max-w-[130px] sm:max-w-[150px]">
                  {trackName}
                </p>
                {isPlaying && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
                )}
              </div>
              <p className="text-[10px] text-blue-300/80 truncate">
                {isAutoplayBlocked ? 'Tap anywhere to start music' : isPlaying ? 'Playing in background' : 'Paused'}
              </p>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-1 shrink-0">
              {/* Play / Pause button */}
              <button
                onClick={togglePlay}
                title={isPlaying ? 'Pause Music' : 'Play Music'}
                className="p-2 rounded-lg bg-blue-600/30 hover:bg-blue-600/50 border border-blue-400/30 text-blue-300 hover:text-white transition-colors cursor-pointer"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current ml-0.5" />}
              </button>

              {/* Mute / Volume button */}
              <div className="relative">
                <button
                  onClick={toggleMute}
                  onMouseEnter={() => setShowVolumeSlider(true)}
                  title={isMuted ? 'Unmute' : 'Mute'}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-3.5 h-3.5 text-red-400" />
                  ) : (
                    <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                  )}
                </button>

                {/* Popover Volume Slider */}
                {showVolumeSlider && (
                  <div
                    onMouseLeave={() => setShowVolumeSlider(false)}
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-2 rounded-xl bg-slate-900 border border-slate-700 shadow-xl flex items-center gap-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                  >
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      className="w-20 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                    <span className="text-[10px] font-mono text-slate-300 min-w-[24px]">
                      {Math.round((isMuted ? 0 : volume) * 100)}%
                    </span>
                  </div>
                )}
              </div>

              {/* Minimize Widget */}
              <button
                onClick={() => setIsExpanded(false)}
                title="Minimize player"
                className="p-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          /* Collapsed Floating Button */
          <button
            onClick={() => setIsExpanded(true)}
            title="Expand Music Player"
            className="group relative p-3 rounded-full bg-slate-950/90 border border-blue-500/50 shadow-xl backdrop-blur-md text-blue-400 hover:text-white hover:scale-110 transition-all cursor-pointer flex items-center justify-center"
          >
            {isPlaying ? (
              <div className="flex items-end gap-0.5 h-4">
                <span className="w-1 bg-blue-400 rounded-full animate-[bounce_1s_infinite_100ms] h-full" />
                <span className="w-1 bg-blue-400 rounded-full animate-[bounce_1s_infinite_300ms] h-3" />
                <span className="w-1 bg-blue-400 rounded-full animate-[bounce_1s_infinite_200ms] h-4" />
              </div>
            ) : (
              <Music className="w-4 h-4 text-blue-400" />
            )}
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-indigo-500 border border-slate-950" />
          </button>
        )}
      </div>
    </>
  );
};
