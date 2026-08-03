import React, { useState, useEffect, useRef } from 'react';
import { Bot, Send, Sparkles, Minimize2, User, Eye, EyeOff, Lock, ShieldCheck, UserPlus, LogIn, X, Cpu, Settings } from 'lucide-react';
import { PROFILE_DATA } from '../data/portfolioData';
import { usePortfolio } from '../context/PortfolioContext';
import { soundFX } from '../utils/soundEffects';

interface Message {
  sender: 'user' | 'ai';
  text: string;
  time: string;
}

interface InteractiveAIChatProps {
  onOpenAdminCMS?: () => void;
}

export const InteractiveAIChat: React.FC<InteractiveAIChatProps> = ({ onOpenAdminCMS }) => {
  const { registerAdmin, loginAdmin, isAdmin, config } = usePortfolio();
  
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: `Hello! I am Dwip Halder's AI Assistant. Ask me anything about Dwip's Android APKs, website development, education, or freelance availability!`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Admin secret login mode inside chat
  const [showAdminAuth, setShowAdminAuth] = useState(false);
  const [adminAuthMode, setAdminAuthMode] = useState<'create' | 'login'>('login');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminConfirmPassword, setAdminConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isSubmittingAuth, setIsSubmittingAuth] = useState(false);

  // Floating button position & drag state (defaults to bottom-right corner)
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);

  const [isDragging, setIsDragging] = useState(false);
  const dragStartOffset = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const dragStartPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const handleResize = () => {
      setPosition((prev) => {
        if (!prev) return null;
        return {
          x: Math.min(Math.max(10, prev.x), window.innerWidth - 70),
          y: Math.min(Math.max(10, prev.y), window.innerHeight - 70)
        };
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const currX = position ? position.x : rect.left;
    const currY = position ? position.y : rect.top;

    if (!position) {
      setPosition({ x: currX, y: currY });
    }

    setIsDragging(true);
    dragStartOffset.current = {
      x: e.clientX - currX,
      y: e.clientY - currY
    };
    dragStartPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    const newX = Math.min(Math.max(10, e.clientX - dragStartOffset.current.x), window.innerWidth - 70);
    const newY = Math.min(Math.max(10, e.clientY - dragStartOffset.current.y), window.innerHeight - 70);
    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = (e: MouseEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    const dx = Math.abs(e.clientX - dragStartPos.current.x);
    const dy = Math.abs(e.clientY - dragStartPos.current.y);
    if (dx < 6 && dy < 6) {
      setIsOpen(true);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const currX = position ? position.x : rect.left;
    const currY = position ? position.y : rect.top;

    if (!position) {
      setPosition({ x: currX, y: currY });
    }

    setIsDragging(true);
    dragStartOffset.current = {
      x: touch.clientX - currX,
      y: touch.clientY - currY
    };
    dragStartPos.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const newX = Math.min(Math.max(10, touch.clientX - dragStartOffset.current.x), window.innerWidth - 70);
    const newY = Math.min(Math.max(10, touch.clientY - dragStartOffset.current.y), window.innerHeight - 70);
    setPosition({ x: newX, y: newY });
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    const touch = e.changedTouches[0];
    const dx = Math.abs(touch.clientX - dragStartPos.current.x);
    const dy = Math.abs(touch.clientY - dragStartPos.current.y);
    if (dx < 6 && dy < 6) {
      setIsOpen(true);
    }
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleTouchEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging]);

  const quickQuestions = [
    "What services does Dwip offer?",
    "Can Dwip build an Android APK?",
    "Tell me about Dwip's education",
    "How to contact Dwip for freelance work?"
  ];

  const handleSend = async (queryText?: string) => {
    if (isTyping) return; // Lock input while thinking
    const textToSend = queryText || input;
    if (!textToSend.trim()) return;

    soundFX.playSend(); // Play send sound effect

    // Check if secret command was entered
    const normalized = textToSend.toLowerCase().replace(/[\(\)]/g, '').trim();
    if (normalized === 'login my admin panel') {
      setInput('');
      setShowAdminAuth(true);
      setAuthError('');
      setMessages((prev) => [
        ...prev,
        {
          sender: 'user',
          text: textToSend,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        },
        {
          sender: 'ai',
          text: '🔐 Admin Panel Command Recognized! Please enter your email and password below to log in or create an Admin account.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      soundFX.playReceive();
      return;
    }

    const userMsg: Message = {
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInput('');
    setIsTyping(true);

    const startTime = Date.now();

    // Helper to generate local response if OpenRouter API is not configured
    const getLocalResponse = (query: string): string => {
      const q = query.toLowerCase();
      if (q.includes('apk') || q.includes('android') || q.includes('mobile')) {
        return "Dwip builds high-performance custom Android APK apps with Firebase, offline sync, and sleek UI.";
      } else if (q.includes('education') || q.includes('college') || q.includes('study')) {
        return "Dwip is pursuing B.A. English Honours (1st Year) and holds a Computer Diploma with distinction.";
      } else if (q.includes('service') || q.includes('offer') || q.includes('build')) {
        return "Dwip offers Android APK creation, full-stack web apps, AI bots, and UI/UX design.";
      } else if (q.includes('contact') || q.includes('hire') || q.includes('email')) {
        return `You can email Dwip at ${PROFILE_DATA.email} or use the 'Hire Me / Request' button on the site!`;
      } else if (q.includes('price') || q.includes('cost') || q.includes('rate')) {
        return "Dwip provides budget-friendly rates for students & startups with guaranteed fast turnaround!";
      } else if (q.includes('openrouter') || q.includes('api') || q.includes('key')) {
        return "You can add your OpenRouter API Key and Model Name in Admin CMS -> 'AI Settings' tab!";
      }
      return "Dwip Halder is an AI Freelancer, Android APK & Web Developer. Ask about his skills or hire him for your project!";
    };

    let aiText = '';

    if (config.openRouterApiKey && config.openRouterApiKey.trim()) {
      try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${config.openRouterApiKey.trim()}`,
            'HTTP-Referer': window.location.origin,
            'X-Title': 'Dwip Halder AI Portfolio'
          },
          body: JSON.stringify({
            model: config.openRouterModel?.trim() || 'google/gemini-2.0-flash-lite-001',
            messages: [
              {
                role: 'system',
                content: `You are Dwip Halder's AI assistant on his portfolio website. Dwip is an AI Developer, Android APK builder, and Web Developer in India. Keep your responses short, concise (1-2 sentences max), friendly, and helpful.`
              },
              {
                role: 'user',
                content: textToSend
              }
            ],
            max_tokens: 150
          })
        });

        if (response.ok) {
          const data = await response.json();
          aiText = data.choices?.[0]?.message?.content?.trim() || getLocalResponse(textToSend);
        } else {
          console.warn('OpenRouter API call error, falling back to local responder', response.statusText);
          aiText = getLocalResponse(textToSend);
        }
      } catch (err) {
        console.warn('OpenRouter API fetch exception:', err);
        aiText = getLocalResponse(textToSend);
      }
    } else {
      aiText = getLocalResponse(textToSend);
    }

    // Ensure strictly at least 2000ms (2 seconds) thinking time as requested
    const elapsedTime = Date.now() - startTime;
    const remainingTime = Math.max(2000 - elapsedTime, 0);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: aiText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsTyping(false);
      soundFX.playReceive(); // Play receive sound chime
    }, remainingTime);
  };

  const handleAdminAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    if (!adminEmail.trim() || !adminPassword.trim()) {
      setAuthError('Please enter both Email and Password.');
      return;
    }

    if (adminAuthMode === 'create' && adminPassword !== adminConfirmPassword) {
      setAuthError('Passwords do not match!');
      return;
    }

    setIsSubmittingAuth(true);

    try {
      if (adminAuthMode === 'create') {
        await registerAdmin(adminEmail.trim(), adminPassword);
      } else {
        await loginAdmin(adminEmail.trim(), adminPassword);
      }

      setShowAdminAuth(false);
      setAdminEmail('');
      setAdminPassword('');
      setAdminConfirmPassword('');

      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: '🎉 Admin Authentication Successful! Admin Panel is now unlocked in your Top Navbar and Mobile Menu!',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);

      if (onOpenAdminCMS) {
        onOpenAdminCMS();
      }
    } catch (err: any) {
      console.error(err);
      if (err?.code === 'auth/email-already-in-use') {
        setAuthError('This email is already registered. Please click "Login to Admin Panel".');
      } else if (err?.code === 'auth/wrong-password' || err?.code === 'auth/invalid-credential') {
        setAuthError('Invalid email or password. If first time, switch to "Create Admin Account".');
      } else if (err?.code === 'auth/weak-password') {
        setAuthError('Password must be at least 6 characters long.');
      } else {
        setAuthError(err?.message || 'Authentication failed. Please check details.');
      }
    } finally {
      setIsSubmittingAuth(false);
    }
  };

  return (
    <>
      {/* 1. DRAGGABLE FLOATING AI ROBOT BUTTON */}
      {!isOpen && (
        <div
          style={
            position
              ? {
                  position: 'fixed',
                  left: `${position.x}px`,
                  top: `${position.y}px`,
                  zIndex: 9999,
                  cursor: isDragging ? 'grabbing' : 'grab',
                  userSelect: 'none',
                  touchAction: 'none'
                }
              : {
                  position: 'fixed',
                  right: '24px',
                  bottom: '24px',
                  zIndex: 9999,
                  cursor: isDragging ? 'grabbing' : 'grab',
                  userSelect: 'none',
                  touchAction: 'none'
                }
          }
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          className="group transition-transform hover:scale-110 active:scale-95"
          title="Drag me around! Click to chat with DWIP AI"
        >
          <div className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 p-[2px] shadow-[0_0_25px_rgba(59,130,246,0.6)] flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center relative overflow-hidden group-hover:bg-slate-900 transition-colors">
              <div className="absolute inset-0 bg-blue-500/20 blur-sm rounded-full animate-pulse"></div>
              <Bot className="w-7 h-7 text-cyan-400 group-hover:rotate-12 transition-transform duration-300 relative z-10" />
              <Sparkles className="w-3.5 h-3.5 text-yellow-300 absolute top-1 right-2 animate-bounce z-10" />
            </div>
            <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-slate-950 animate-pulse z-20 shadow-md"></span>
            <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-400 animate-ping z-10"></span>
          </div>
        </div>
      )}

      {/* 2. OPENED CHAT MODAL */}
      {isOpen && (
        <div
          style={
            position
              ? {
                  position: 'fixed',
                  left: `${Math.min(Math.max(10, position.x - 300), window.innerWidth - 380)}px`,
                  top: `${Math.min(Math.max(10, position.y - 480), window.innerHeight - 540)}px`,
                  zIndex: 99999
                }
              : {
                  position: 'fixed',
                  right: '24px',
                  bottom: '24px',
                  zIndex: 99999
                }
          }
          className="interactive-chat-window w-[340px] sm:w-[380px] h-[520px] glass-panel rounded-3xl border border-blue-500/40 shadow-[0_20px_60px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden animate-in zoom-in-90 fade-in duration-300"
        >
          {/* Header */}
          <div className="p-3.5 bg-gradient-to-r from-blue-900/90 via-indigo-900/90 to-purple-900/90 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 rounded-xl bg-slate-950 border border-cyan-400/50 flex items-center justify-center shadow-lg">
                <Bot className="w-5 h-5 text-cyan-300" />
                <Sparkles className="w-3 h-3 text-yellow-300 absolute -top-1 -right-1" />
              </div>

              <div>
                <h3 className="text-xs font-extrabold text-white flex items-center gap-1">
                  DWIP AI Assistant
                </h3>
                <span className="text-[9px] text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  Online & Active
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {isAdmin && (
                <button
                  onClick={onOpenAdminCMS}
                  className="px-2 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold flex items-center gap-1 shadow-md cursor-pointer"
                  title="Open Admin CMS"
                >
                  <ShieldCheck className="w-3 h-3 text-cyan-300" />
                  <span>Admin CMS</span>
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white cursor-pointer transition-colors"
                title="Close Chat"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Area OR Secret Admin Auth Overlay */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3 relative">
            {showAdminAuth ? (
              <div className="bg-slate-950/90 border border-blue-500/50 rounded-2xl p-4 shadow-xl text-xs space-y-3 animate-in fade-in zoom-in-95">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <div className="flex items-center gap-2 text-cyan-300 font-extrabold">
                    <Lock className="w-4 h-4 text-blue-400" />
                    <span>Admin Panel Authorization</span>
                  </div>
                  <button
                    onClick={() => setShowAdminAuth(false)}
                    className="text-slate-400 hover:text-white p-1 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Mode Switcher */}
                <div className="grid grid-cols-2 gap-1.5 bg-slate-900 p-1 rounded-xl border border-white/5">
                  <button
                    type="button"
                    onClick={() => {
                      setAdminAuthMode('create');
                      setAuthError('');
                    }}
                    className={`py-1.5 rounded-lg font-bold text-[11px] flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      adminAuthMode === 'create'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Create Admin</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setAdminAuthMode('login');
                      setAuthError('');
                    }}
                    className={`py-1.5 rounded-lg font-bold text-[11px] flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      adminAuthMode === 'login'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Login Admin</span>
                  </button>
                </div>

                {authError && (
                  <div className="p-2 rounded-xl bg-red-500/20 border border-red-500/40 text-red-300 text-[10px] font-semibold">
                    {authError}
                  </div>
                )}

                <form onSubmit={handleAdminAuthSubmit} className="space-y-2.5">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-300 mb-1">
                      Admin Gmail / Email
                    </label>
                    <input
                      type="email"
                      required
                      value={adminEmail}
                      onChange={(e) => setAdminEmail(e.target.value)}
                      placeholder="admin@example.com"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-300 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-3 pr-9 py-2 text-xs text-white focus:outline-none focus:border-blue-400"
                      />
                      {/* ALWAYS PRESENT EYE TOGGLE BUTTON */}
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2.5 top-2.5 text-slate-400 hover:text-white cursor-pointer"
                        title={showPassword ? 'Hide Password' : 'Show Password'}
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4 text-cyan-400" />
                        ) : (
                          <Eye className="w-4 h-4 text-slate-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  {adminAuthMode === 'create' && (
                    <div>
                      <label className="block text-[10px] font-bold text-slate-300 mb-1">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          required
                          value={adminConfirmPassword}
                          onChange={(e) => setAdminConfirmPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-3 pr-9 py-2 text-xs text-white focus:outline-none focus:border-blue-400"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-2.5 top-2.5 text-slate-400 hover:text-white cursor-pointer"
                          title={showConfirmPassword ? 'Hide Password' : 'Show Password'}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="w-4 h-4 text-cyan-400" />
                          ) : (
                            <Eye className="w-4 h-4 text-slate-400" />
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmittingAuth}
                    className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs shadow-lg shadow-blue-600/30 transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>
                      {isSubmittingAuth
                        ? 'Authenticating...'
                        : adminAuthMode === 'create'
                        ? 'Create Admin Account'
                        : 'Login to Admin Panel'}
                    </span>
                  </button>
                </form>
              </div>
            ) : (
              <>
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.sender === 'ai' && (
                      <div className="w-6 h-6 rounded-lg bg-blue-600/30 border border-blue-400/40 flex items-center justify-center shrink-0 mt-1">
                        <Bot className="w-3.5 h-3.5 text-cyan-300" />
                      </div>
                    )}

                    <div
                      className={`max-w-[82%] p-3 rounded-2xl text-xs leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-none shadow-md'
                          : 'glass-panel text-slate-200 rounded-bl-none border border-white/10'
                      }`}
                    >
                      <p>{msg.text}</p>
                      <span className="text-[9px] text-slate-400 mt-1 block text-right">
                        {msg.time}
                      </span>
                    </div>

                    {msg.sender === 'user' && (
                      <div className="w-6 h-6 rounded-lg bg-purple-600/30 border border-purple-400/30 flex items-center justify-center shrink-0 mt-1">
                        <User className="w-3.5 h-3.5 text-purple-300" />
                      </div>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-2.5 items-center p-2.5 rounded-2xl bg-indigo-950/40 border border-cyan-500/30 text-xs text-cyan-300 animate-pulse">
                    <div className="w-6 h-6 rounded-lg bg-blue-600/30 border border-cyan-400/50 flex items-center justify-center shrink-0">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-300 animate-spin" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-[11px] flex items-center gap-1.5">
                        <span>AI Thinking & Processing...</span>
                        <span className="flex gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
                        </span>
                      </div>
                      <p className="text-[9px] text-slate-400">Generative response in progress (input locked)...</p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Quick Question Chips */}
          {!showAdminAuth && (
            <div className="px-3 py-2 bg-slate-900/60 border-t border-white/5 flex gap-1.5 overflow-x-auto no-scrollbar">
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  disabled={isTyping}
                  onClick={() => handleSend(q)}
                  className={`whitespace-nowrap text-[10px] font-semibold px-2.5 py-1 rounded-full transition-colors ${
                    isTyping
                      ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                      : 'text-cyan-300 bg-cyan-950/40 border border-cyan-500/30 hover:bg-cyan-500/20 cursor-pointer'
                  }`}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input Bar */}
          <div className="p-3 border-t border-white/10 bg-slate-950/80 flex items-center gap-2">
            <input
              type="text"
              disabled={isTyping}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !isTyping && handleSend()}
              placeholder={isTyping ? "AI is thinking (please wait 2s)..." : "Ask AI a question..."}
              className={`flex-1 border rounded-xl px-3 py-2 text-xs transition-colors ${
                isTyping
                  ? 'bg-slate-900 border-slate-800 text-slate-500 placeholder-slate-600 cursor-not-allowed'
                  : 'bg-white/5 border-white/10 text-white placeholder-slate-400 focus:outline-none focus:border-blue-400'
              }`}
            />
            <button
              onClick={() => handleSend()}
              disabled={isTyping || !input.trim()}
              className={`p-2 rounded-xl text-white shadow-md transition-all ${
                isTyping || !input.trim()
                  ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                  : 'btn-glow cursor-pointer'
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
