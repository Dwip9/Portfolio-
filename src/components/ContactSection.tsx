import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Instagram, Twitter, CheckCircle2, Search, Clock, DollarSign, FileText, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { Language, Service } from '../types';
import { usePortfolio } from '../context/PortfolioContext';
import { soundFX } from '../utils/soundEffects';

interface ContactSectionProps {
  currentLang?: Language;
  preselectedService?: Service | null;
  initialTab?: 'submit' | 'track';
}

export const ContactSection: React.FC<ContactSectionProps> = ({ preselectedService, initialTab = 'submit' }) => {
  const { submitInquiry, inquiries = [], config } = usePortfolio();

  const [activeTab, setActiveTab] = useState<'submit' | 'track'>(initialTab);
  const [lastSubmittedPhone, setLastSubmittedPhone] = useState('');

  React.useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    purpose: preselectedService ? preselectedService.title : 'Android APK Development',
    budget: '',
    message: ''
  });

  const [searchPhone, setSearchPhone] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.purpose) return;

    setIsSending(true);
    const submittedPhoneNum = formData.phone;
    setLastSubmittedPhone(submittedPhoneNum);

    try {
      await submitInquiry({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        purpose: formData.purpose,
        serviceType: formData.purpose,
        budget: formData.budget,
        message: formData.message
      });
      
      soundFX.playSuccess();
      setIsSending(false);
      setIsSubmitted(true);

      setFormData({
        name: '',
        phone: '',
        email: '',
        purpose: 'Android APK Development',
        budget: '',
        message: ''
      });

      // Prepare track search tab for after celebration video ends
      setSearchPhone(submittedPhoneNum);
      setHasSearched(true);
      setTimeout(() => {
        setActiveTab('track');
      }, 5000);
    } catch (err) {
      console.error("Failed to send hire inquiry:", err);
      setIsSending(false);
    }
  };

  const matchedInquiries = inquiries.filter((inq) => {
    if (!searchPhone.trim()) return false;
    const cleanSearch = searchPhone.replace(/\D/g, '');
    const cleanInqPhone = (inq.phone || '').replace(/\D/g, '');
    return cleanInqPhone.includes(cleanSearch) || (inq.phone && inq.phone.includes(searchPhone.trim()));
  });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundFX.playSend();
    setHasSearched(true);
  };

  return (
    <section id="contact" className="relative py-12 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Full-width "Get In Touch" Pill Bar */}
        <div className="glass-panel p-4 sm:p-6 rounded-2xl border border-slate-800/80 bg-[#0a0f1d]/80 flex flex-wrap items-center justify-between gap-4 shadow-2xl">
          
          <div className="flex items-center gap-2">
            <span className="text-sm font-extrabold text-white">Get In Touch</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-300 font-medium">
            {/* Email */}
            {config.email && (
              <a
                href={`mailto:${config.email}`}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-blue-500/40 text-slate-200 hover:text-white transition-all cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                <span>{config.email}</span>
              </a>
            )}

            {/* Phone */}
            {config.phone && (
              <a
                href={`tel:${config.phone.replace(/\s+/g, '')}`}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/40 text-slate-200 hover:text-white transition-all cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-purple-400" />
                <span>{config.phone}</span>
              </a>
            )}

            {/* Location */}
            {config.location && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-200">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>{config.location}</span>
              </div>
            )}
          </div>

          {/* Social Icons Right */}
          <div className="flex items-center gap-2">
            {config.githubUrl && (
              <a
                href={config.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            )}

            {config.linkedinUrl && (
              <a
                href={config.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}

            {config.instagramUrl && (
              <a
                href={config.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            )}

            {config.twitterUrl && (
              <a
                href={config.twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
                title="Twitter / X"
              >
                <Twitter className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Form Container with Mode Selector (Submit Hire Request VS Track Request) */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800/80 bg-[#0a0f1d]/80 shadow-2xl">
          
          {/* Header & Tabs Switcher */}
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4 mb-6">
            <div>
              <h3 className="text-xl font-black text-white flex items-center gap-2">
                <span>{activeTab === 'submit' ? 'Hire Tamanna / Project Request' : 'Check Request Status'}</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {activeTab === 'submit'
                  ? 'Submit your project requirements, purpose, and phone number to get started.'
                  : 'Enter your registered phone number to track your hire request status in real-time.'}
              </p>
            </div>

            <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
              <button
                onClick={() => setActiveTab('submit')}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  activeTab === 'submit'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Hire Request
              </button>
              <button
                onClick={() => setActiveTab('track')}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'track'
                    ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Search className="w-3.5 h-3.5" />
                <span>Track Status</span>
              </button>
            </div>
          </div>

          {/* TAB 1: SUBMIT HIRE REQUEST */}
          {activeTab === 'submit' && (
            <>
              {isSubmitted ? (
                <div className="p-8 text-center space-y-3 bg-emerald-950/30 rounded-2xl border border-emerald-500/30 animate-in fade-in">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Hire Request Received Successfully!</h4>
                  <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                    Thank you! Your request has been registered in the database. You can track your status anytime using your phone number in the <strong>Track Status</strong> tab above.
                  </p>
                  <button
                    onClick={() => setActiveTab('track')}
                    className="mt-2 px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs inline-flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <Search className="w-3.5 h-3.5" />
                    <span>Check Request Status Now</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Purpose / Project Type */}
                    <div>
                      <label className="text-xs font-bold text-slate-300 block mb-1">
                        Purpose of Request *
                      </label>
                      <select
                        value={formData.purpose}
                        onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 cursor-pointer"
                      >
                        <option value="Android APK Development">Android APK Development</option>
                        <option value="Responsive Website Development">Responsive Website Development</option>
                        <option value="Full Stack Application">Full Stack Application</option>
                        <option value="AI Bot & Integration">AI Bot & Automation</option>
                        <option value="UI/UX Design">UI/UX Design</option>
                        <option value="API & Backend Service">API & Backend Service</option>
                        <option value="Other Custom Project">Other Custom Project</option>
                      </select>
                    </div>

                    {/* Phone Number Required */}
                    <div>
                      <label className="text-xs font-bold text-slate-300 block mb-1">
                        Phone Number * <span className="text-[10px] text-amber-400 font-normal">(Used for status tracking)</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. +91 9876543210"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Full Name */}
                    <div>
                      <label className="text-xs font-bold text-slate-300 block mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your full name"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    {/* Email Optional */}
                    <div>
                      <label className="text-xs font-bold text-slate-300 block mb-1">
                        Email Address <span className="text-[10px] text-slate-500 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="yourname@gmail.com"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    {/* Budget Optional */}
                    <div>
                      <label className="text-xs font-bold text-slate-300 block mb-1">
                        Estimated Budget <span className="text-[10px] text-slate-500 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        placeholder="e.g. ₹5,000 - ₹15,000 or $100+"
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">Project Details / Message</label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your project ideas, features, or deadlines..."
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSending}
                    className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-blue-600/30"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSending ? 'Registering Request...' : 'Submit Hire Request'}</span>
                  </button>
                </form>
              )}
            </>
          )}

          {/* TAB 2: TRACK REQUEST STATUS BY PHONE NUMBER */}
          {activeTab === 'track' && (
            <div className="space-y-6">
              <form onSubmit={handleSearchSubmit} className="flex gap-2">
                <div className="relative flex-1">
                  <Phone className="w-4 h-4 text-amber-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    value={searchPhone}
                    onChange={(e) => setSearchPhone(e.target.value)}
                    placeholder="Enter your phone number (e.g. +91 9876543210)..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md shadow-amber-600/30 shrink-0"
                >
                  <Search className="w-4 h-4" />
                  <span>Check Status</span>
                </button>
              </form>

              {/* Search Results Display */}
              {hasSearched || searchPhone.trim().length > 3 ? (
                matchedInquiries.length > 0 ? (
                  <div className="space-y-4">
                    <p className="text-xs font-bold text-slate-300">
                      Found {matchedInquiries.length} request(s) for Phone: <span className="text-amber-300 font-mono">{searchPhone}</span>
                    </p>

                    {matchedInquiries.map((inq) => {
                      const st = inq.status || 'Pending';
                      return (
                        <div
                          key={inq.id}
                          className="p-5 rounded-2xl bg-slate-900/90 border border-slate-700 space-y-3 shadow-xl"
                        >
                          <div className="flex items-start justify-between flex-wrap gap-2 border-b border-slate-800 pb-3">
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <h4 className="text-base font-black text-white">{inq.name}</h4>
                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-500/20 border border-blue-400/40 text-blue-300">
                                  {inq.purpose || inq.serviceType || 'Custom Project'}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-2">
                                <span className="font-mono text-emerald-400">{inq.phone}</span>
                                {inq.createdAt && (
                                  <span className="flex items-center gap-1 text-[10px] text-slate-500">
                                    <Clock className="w-3 h-3" />
                                    {new Date(inq.createdAt).toLocaleString()}
                                  </span>
                                )}
                              </p>
                            </div>

                            {/* Status Badge */}
                            <div className="shrink-0">
                              <span
                                className={`px-3 py-1.5 rounded-xl text-xs font-black border flex items-center gap-1.5 shadow-md ${
                                  st === 'Completed'
                                    ? 'bg-emerald-950 text-emerald-300 border-emerald-500/50'
                                    : st === 'In Progress' || st === 'Accepted'
                                    ? 'bg-blue-950 text-blue-300 border-blue-500/50'
                                    : st === 'Rejected'
                                    ? 'bg-red-950 text-red-300 border-red-500/50'
                                    : 'bg-amber-950 text-amber-300 border-amber-500/50'
                                }`}
                              >
                                {st === 'Pending' && '🟡 Pending'}
                                {st === 'In Progress' && '🔵 In Progress'}
                                {st === 'Accepted' && '🟢 Accepted'}
                                {st === 'Completed' && '✅ Completed'}
                                {st === 'Rejected' && '🔴 Rejected'}
                              </span>
                            </div>
                          </div>

                          {/* Request Message */}
                          {inq.message && (
                            <div>
                              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Your Message:</span>
                              <p className="text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800/80 mt-1 leading-relaxed">
                                {inq.message}
                              </p>
                            </div>
                          )}

                          {/* Admin Response Notes if any */}
                          {inq.notes && (
                            <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/30 text-xs text-amber-200">
                              <span className="font-bold block mb-1">💬 Admin Response Note:</span>
                              <p>{inq.notes}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-8 text-center bg-slate-900/50 rounded-2xl border border-slate-800 text-slate-400 text-xs space-y-2">
                    <p className="font-bold text-white">No requests found for this phone number.</p>
                    <p className="text-[11px] text-slate-500">
                      Please double-check the phone number or submit a new hire request using the <strong>Hire Request</strong> tab.
                    </p>
                  </div>
                )
              ) : (
                <div className="p-6 text-center bg-slate-900/40 rounded-2xl border border-slate-800 text-slate-400 text-xs">
                  <p>Enter your phone number above to check the status of your submitted hire request.</p>
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
