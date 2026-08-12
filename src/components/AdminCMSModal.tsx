import React, { useState, useEffect } from 'react';
import { X, Save, Plus, Trash2, Edit3, Shield, Check, Image as ImageIcon, Layout, Globe, Lock, Users, Eye, EyeOff, Crop, Upload, Key, Inbox, FileText, MessageSquare, Clock, Download, FileUp, Music, Volume2, VolumeX, Play, Pause, Cpu, Search, Phone, DollarSign, Bot, Palette, Sparkles, Video } from 'lucide-react';
import { usePortfolio, PortfolioConfig } from '../context/PortfolioContext';
import { Project } from '../types';
import { ImageCropperModal } from './ImageCropperModal';
import { compressImageBase64 } from '../utils/imageCompressor';

interface AdminCMSModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminCMSModal: React.FC<AdminCMSModalProps> = ({ isOpen, onClose }) => {
  const {
    config,
    projects,
    adminsList,
    inquiries = [],
    saveConfig,
    addProject,
    updateProject,
    deleteProject,
    logoutAdmin,
    updateAdminPassword,
    deleteAdminAccount,
    deleteInquiry,
    toggleInquiryRead,
    updateInquiryStatus,
    triggerHireVideoBroadcast
  } = usePortfolio();
  
  const [activeTab, setActiveTab] = useState<'heroImages' | 'video' | 'projects' | 'admins' | 'theme'>('heroImages');
  const [inquirySearch, setInquirySearch] = useState('');
  const [formData, setFormData] = useState<PortfolioConfig>(config);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Project editing state
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  // Image Cropper Modal state
  const [cropperOpen, setCropperOpen] = useState(false);
  const [cropperField, setCropperField] = useState<'heroImage' | 'secondaryHeroImage' | 'footerImage' | 'projectImage' | null>(null);
  const [cropperAspect, setCropperAspect] = useState<number>(1);
  const [cropperTitle, setCropperTitle] = useState<string>('Crop Photo');

  // Admin password editing state
  const [revealedPasswords, setRevealedPasswords] = useState<{ [key: string]: boolean }>({});
  const [editingAdminPass, setEditingAdminPass] = useState<{ [key: string]: string }>({});
  const [passUpdateMsg, setPassUpdateMsg] = useState<string | null>(null);

  useEffect(() => {
    setFormData(config);
  }, [config]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCVPdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 8 * 1024 * 1024) {
      alert('PDF File size should be under 8MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setFormData((prev) => ({
        ...prev,
        cvPdfUrl: base64,
        cvFileName: file.name
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 20 * 1024 * 1024) {
      alert('Audio file size should be under 20MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setFormData((prev) => ({
        ...prev,
        bgMusicUrl: base64,
        bgMusicFileName: file.name
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteAudioTrack = () => {
    if (confirm('Are you sure you want to delete/remove the background music track?')) {
      setFormData((prev) => ({
        ...prev,
        bgMusicUrl: '',
        bgMusicFileName: ''
      }));
    }
  };

  const handleDesktopVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 100 * 1024 * 1024) {
      alert('Desktop video file size must be under 100MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setFormData((prev) => ({
        ...prev,
        desktopHireVideoUrl: base64,
        desktopHireVideoFileName: file.name
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleMobileVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 100 * 1024 * 1024) {
      alert('Mobile video file size must be under 100MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setFormData((prev) => ({
        ...prev,
        mobileHireVideoUrl: base64,
        mobileHireVideoFileName: file.name
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleHeroImageDirectUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 20 * 1024 * 1024) {
      alert('Image file size must be under 20MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = async (event) => {
      const rawBase64 = event.target?.result as string;
      const compressed = await compressImageBase64(rawBase64, 1200, 0.82);
      setFormData((prev) => ({
        ...prev,
        heroImage: compressed,
        introAvatarUrl: compressed
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSecondaryImageDirectUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 20 * 1024 * 1024) {
      alert('Image file size must be under 20MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = async (event) => {
      const rawBase64 = event.target?.result as string;
      const compressed = await compressImageBase64(rawBase64, 1200, 0.82);
      setFormData((prev) => ({
        ...prev,
        secondaryHeroImage: compressed
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleOpenCropper = (field: 'heroImage' | 'secondaryHeroImage' | 'footerImage' | 'projectImage', aspect: number, title: string) => {
    setCropperField(field);
    setCropperAspect(aspect);
    setCropperTitle(title);
    setCropperOpen(true);
  };

  const handleCropComplete = (croppedBase64: string) => {
    if (cropperField === 'heroImage') {
      setFormData((prev) => ({ ...prev, heroImage: croppedBase64, introAvatarUrl: croppedBase64 }));
    } else if (cropperField === 'secondaryHeroImage') {
      setFormData((prev) => ({ ...prev, secondaryHeroImage: croppedBase64 }));
    } else if (cropperField === 'footerImage') {
      setFormData((prev) => ({ ...prev, footerImage: croppedBase64 }));
    } else if (cropperField === 'projectImage') {
      setEditingProject((prev) => ({ ...prev, image: croppedBase64 }));
    }
  };

  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);
    try {
      await saveConfig(formData);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      alert('Failed to save settings. Check internet or permissions.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject?.name) return;

    try {
      if (editingProject.id) {
        await updateProject(editingProject.id, editingProject);
      } else {
        await addProject({
          name: editingProject.name || 'New Project',
          category: editingProject.category || 'Web App',
          shortDescription: editingProject.shortDescription || '',
          fullDescription: editingProject.fullDescription || '',
          image: editingProject.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
          liveUrl: editingProject.liveUrl || 'https://example.com',
          githubUrl: editingProject.githubUrl || 'https://github.com',
          tags: editingProject.tags || ['React', 'Firebase'],
          features: editingProject.features || ['Responsive UI', 'Firebase Backend']
        });
      }
      setIsProjectModalOpen(false);
      setEditingProject(null);
    } catch (err) {
      console.error(err);
      alert('Failed to save project');
    }
  };

  const handleDeleteProj = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      await deleteProject(id);
    }
  };

  const togglePasswordReveal = (adminId: string) => {
    setRevealedPasswords((prev) => ({ ...prev, [adminId]: !prev[adminId] }));
  };

  const handleAdminPassChange = async (adminId: string) => {
    const newPass = editingAdminPass[adminId];
    if (!newPass || newPass.trim().length < 6) {
      alert('Password must be at least 6 characters long.');
      return;
    }

    try {
      await updateAdminPassword(adminId, newPass.trim());
      setPassUpdateMsg(`Password for Admin updated successfully!`);
      setEditingAdminPass((prev) => ({ ...prev, [adminId]: '' }));
      setTimeout(() => setPassUpdateMsg(null), 4000);
    } catch (err) {
      console.error(err);
      alert('Failed to update password.');
    }
  };

  const handleDeleteAdmin = async (adminId: string, email: string) => {
    if (confirm(`Are you sure you want to remove admin account (${email})?`)) {
      await deleteAdminAccount(adminId);
    }
  };

  return (
    <div className="fixed inset-0 z-[100000] bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="w-full max-w-4xl glass-panel bg-slate-950 border border-blue-500/30 rounded-3xl shadow-[0_0_50px_rgba(59,130,246,0.3)] flex flex-col max-h-[90vh] overflow-hidden">
        
        {/* Header */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-950 via-slate-900 to-purple-950 border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/30 border border-blue-400/50 flex items-center justify-center text-blue-400 shadow-md">
              <Shield className="w-5 h-5 text-cyan-300" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                Firebase Portfolio Admin CMS
              </h2>
              <p className="text-xs text-blue-300/80">Customize text, upload/crop images & manage admin credentials live in Firestore</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={logoutAdmin}
              className="px-3 py-1.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-300 text-xs font-extrabold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 p-3 bg-slate-900/60 border-b border-white/5 overflow-x-auto shrink-0 no-scrollbar">
          <button
            onClick={() => setActiveTab('heroImages')}
            className={`px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'heroImages'
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30 ring-2 ring-rose-400'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <ImageIcon className="w-4 h-4 text-rose-300" />
            <span>🖼️ Hero Photos (1st & 2nd Photo)</span>
          </button>

          <button
            onClick={() => setActiveTab('video')}
            className={`px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'video'
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30 ring-2 ring-rose-400'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Video className="w-4 h-4 text-rose-300" />
            <span>🎬 Videos & Entrance Intro</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'projects'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-2 ring-blue-400'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Edit3 className="w-4 h-4 text-blue-300" />
            <span>💼 Projects ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('admins')}
            className={`px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'admins'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 ring-2 ring-purple-400'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Users className="w-4 h-4 text-purple-300" />
            <span>🔑 Admin Password ({adminsList.length})</span>
          </button>
        </div>

        {/* Form Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {saveSuccess && (
            <div className="mb-4 p-3 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Settings successfully updated in Firebase Firestore!</span>
            </div>
          )}

          {/* 1. HERO PROFILE IMAGES UPLOAD TAB (PRIMARY FIRST TAB) */}
          {activeTab === 'heroImages' && (
            <form onSubmit={handleSaveConfig} className="space-y-6">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-950/60 via-purple-950/40 to-slate-900 border border-rose-500/30">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-rose-600/30 border border-rose-400/50 flex items-center justify-center text-rose-300 shadow-md shrink-0">
                    <ImageIcon className="w-5 h-5 text-rose-300" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                      Homepage Hero Profile Photos Upload <Sparkles className="w-4 h-4 text-amber-400" />
                    </h3>
                    <p className="text-xs text-rose-200/80 mt-0.5">
                      Upload your 1st (Front Default Photo) and 2nd (Secondary Photo) directly from your computer or phone.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* 1st Image (Primary Front Photo) */}
                <div className="p-5 rounded-2xl bg-slate-900/90 border-2 border-rose-500/40 shadow-xl space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-rose-600 text-white text-xs font-black flex items-center justify-center">1</span>
                      <div>
                        <h4 className="text-xs font-black text-white uppercase tracking-wide">1st Image (Primary Front Photo)</h4>
                        <p className="text-[10px] text-slate-400">Main photo shown on homepage load</p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-[10px] font-extrabold border border-rose-500/30">
                      Active Default
                    </span>
                  </div>

                  {/* Live Image Preview */}
                  <div className="relative w-full aspect-square max-w-[200px] mx-auto rounded-full overflow-hidden border-4 border-rose-500/60 shadow-2xl bg-slate-950 flex items-center justify-center group">
                    {formData.heroImage ? (
                      <img
                        src={formData.heroImage}
                        alt="1st Hero Photo"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-2 p-4 text-center text-slate-500">
                        <ImageIcon className="w-8 h-8 opacity-40" />
                        <span className="text-xs font-bold">No 1st Photo Selected</span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2 pt-2">
                    <label className="block text-xs font-bold text-slate-300">Upload New 1st Photo File:</label>
                    <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                      <label className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:brightness-110 text-white text-xs font-extrabold flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all">
                        <FileUp className="w-4 h-4" />
                        <span>Choose 1st Photo File</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleHeroImageDirectUpload}
                          className="hidden"
                        />
                      </label>

                      <button
                        type="button"
                        onClick={() => handleOpenCropper('heroImage', 1, 'Crop 1st Front Profile Photo')}
                        className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-rose-200 border border-slate-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer shrink-0 transition-all"
                      >
                        <Crop className="w-3.5 h-3.5 text-rose-400" />
                        <span>Crop</span>
                      </button>
                    </div>

                    <div className="pt-2">
                      <label className="block text-[10px] font-bold text-slate-400 mb-1">Or Paste Image URL:</label>
                      <input
                        type="text"
                        name="heroImage"
                        value={formData.heroImage}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormData((prev) => ({ ...prev, heroImage: val, introAvatarUrl: val }));
                        }}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
                      />
                    </div>
                  </div>
                </div>

                {/* 2nd Image (Secondary Back / Alternate Photo) */}
                <div className="p-5 rounded-2xl bg-slate-900/90 border-2 border-purple-500/40 shadow-xl space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-purple-600 text-white text-xs font-black flex items-center justify-center">2</span>
                      <div>
                        <h4 className="text-xs font-black text-white uppercase tracking-wide">2nd Image (Secondary / Alternate Photo)</h4>
                        <p className="text-[10px] text-slate-400">Photo shown on toggle / flip</p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-extrabold border border-purple-500/30">
                      Alternate Photo
                    </span>
                  </div>

                  {/* Live Image Preview */}
                  <div className="relative w-full aspect-square max-w-[200px] mx-auto rounded-full overflow-hidden border-4 border-purple-500/60 shadow-2xl bg-slate-950 flex items-center justify-center group">
                    {formData.secondaryHeroImage ? (
                      <img
                        src={formData.secondaryHeroImage}
                        alt="2nd Hero Photo"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-2 p-4 text-center text-slate-500">
                        <ImageIcon className="w-8 h-8 opacity-40" />
                        <span className="text-xs font-bold">No 2nd Photo Selected</span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2 pt-2">
                    <label className="block text-xs font-bold text-slate-300">Upload New 2nd Photo File:</label>
                    <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                      <label className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 text-white text-xs font-extrabold flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all">
                        <FileUp className="w-4 h-4" />
                        <span>Choose 2nd Photo File</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleSecondaryImageDirectUpload}
                          className="hidden"
                        />
                      </label>

                      <button
                        type="button"
                        onClick={() => handleOpenCropper('secondaryHeroImage', 1, 'Crop 2nd Alternate Profile Photo')}
                        className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-purple-200 border border-slate-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer shrink-0 transition-all"
                      >
                        <Crop className="w-3.5 h-3.5 text-purple-400" />
                        <span>Crop</span>
                      </button>
                    </div>

                    <div className="pt-2">
                      <label className="block text-[10px] font-bold text-slate-400 mb-1">Or Paste Image URL:</label>
                      <input
                        type="text"
                        name="secondaryHeroImage"
                        value={formData.secondaryHeroImage || ''}
                        onChange={handleChange}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>
                </div>

              </div>

              {/* Save Button Bar */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4 flex-wrap sm:flex-nowrap">
                <div>
                  <h5 className="text-xs font-bold text-white">Save Photo Changes</h5>
                  <p className="text-[10px] text-slate-400">Click save to update both photos in Firebase Firestore live.</p>
                </div>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-purple-600 hover:brightness-110 text-white font-extrabold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-rose-600/30 transition-all shrink-0"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSaving ? 'Saving to Database...' : 'Save Photos Now'}</span>
                </button>
              </div>
            </form>
          )}

          {/* 0. WEBSITE THEME TAB */}
          {activeTab === 'theme' && (
            <form onSubmit={handleSaveConfig} className="space-y-6">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-pink-950/40 via-purple-950/30 to-slate-900 border border-pink-500/30">
                <div className="flex items-center gap-2 mb-1">
                  <Palette className="w-5 h-5 text-pink-400" />
                  <h3 className="text-sm font-black text-white uppercase tracking-wider">Website Layout & Visual Theme</h3>
                </div>
                <p className="text-xs text-slate-300">
                  Select the active theme layout for all visitors. Saved instantly to your Firebase database.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Theme 1: Dynamic Cyber Cosmic */}
                <div
                  onClick={() => setFormData((prev) => ({ ...prev, theme: 'dynamic' }))}
                  className={`p-5 rounded-2xl border-2 transition-all cursor-pointer relative flex flex-col justify-between ${
                    (formData.theme || 'dynamic') === 'dynamic'
                      ? 'bg-slate-900/90 border-blue-500 shadow-[0_0_25px_rgba(59,130,246,0.3)] ring-2 ring-blue-500/50'
                      : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/70'
                  }`}
                >
                  {(formData.theme || 'dynamic') === 'dynamic' && (
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-blue-500 text-white text-[10px] font-black uppercase flex items-center gap-1 shadow-md">
                      <Check className="w-3 h-3" />
                      <span>Active Theme</span>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
                        <Sparkles className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-white">Dynamic (Cyber Cosmic & Interactive 3D)</h4>
                        <span className="text-[10px] text-blue-300 font-semibold">Neon Glow • 3D Flip • Particles</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      Features interactive 3D avatar card flip, magnetic floating tech scatter badges, particle canvas background, and vibrant glowing neon UI accents.
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-2">
                      <span className="px-2 py-0.5 rounded-md bg-blue-950/80 border border-blue-800/50 text-[10px] text-blue-300 font-medium">3D Flip Avatar</span>
                      <span className="px-2 py-0.5 rounded-md bg-purple-950/80 border border-purple-800/50 text-[10px] text-purple-300 font-medium">Floating Tech Bubbles</span>
                      <span className="px-2 py-0.5 rounded-md bg-cyan-950/80 border border-cyan-800/50 text-[10px] text-cyan-300 font-medium">Particle Canvas</span>
                      <span className="px-2 py-0.5 rounded-md bg-emerald-950/80 border border-emerald-800/50 text-[10px] text-emerald-300 font-medium">Water Drop Theme Toggle</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-400">Layout Style</span>
                    <span className="text-xs font-black text-blue-400">Cyber Futuristic</span>
                  </div>
                </div>

                {/* Theme 2: Minimalist Luxury Studio */}
                <div
                  onClick={() => setFormData((prev) => ({ ...prev, theme: 'minimal' }))}
                  className={`p-5 rounded-2xl border-2 transition-all cursor-pointer relative flex flex-col justify-between ${
                    formData.theme === 'minimal'
                      ? 'bg-slate-900/90 border-pink-500 shadow-[0_0_25px_rgba(236,72,153,0.3)] ring-2 ring-pink-500/50'
                      : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/70'
                  }`}
                >
                  {formData.theme === 'minimal' && (
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-pink-500 text-white text-[10px] font-black uppercase flex items-center gap-1 shadow-md">
                      <Check className="w-3 h-3" />
                      <span>Active Theme</span>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2.5 rounded-xl bg-pink-500/20 text-pink-400 border border-pink-500/30">
                        <Layout className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-white">Minimalist Luxury (Editorial Glass Studio)</h4>
                        <span className="text-[10px] text-pink-300 font-semibold">Sleek • High-Contrast • Refined</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      Features a completely fresh layout with clean high-contrast glass panels, refined typography, elegant card grids, and floating glass dock.
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-2">
                      <span className="px-2 py-0.5 rounded-md bg-pink-950/80 border border-pink-800/50 text-[10px] text-pink-300 font-medium">Glassmorphic Cards</span>
                      <span className="px-2 py-0.5 rounded-md bg-rose-950/80 border border-rose-800/50 text-[10px] text-rose-300 font-medium">Clean Editorial Hero</span>
                      <span className="px-2 py-0.5 rounded-md bg-amber-950/80 border border-amber-800/50 text-[10px] text-amber-300 font-medium">Refined Grid</span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700 text-[10px] text-slate-200 font-medium">No Heavy Animations</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-400">Layout Style</span>
                    <span className="text-xs font-black text-pink-400">Minimal Luxury</span>
                  </div>
                </div>
              </div>

              {/* SECTION: COLOR PALETTE COMBINATIONS */}
              <div className="pt-4 border-t border-white/10 space-y-4">
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4 text-amber-400" />
                  <h4 className="text-xs font-black text-white uppercase tracking-wider">Website Color Palette Combination</h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {/* Default Scheme */}
                  <div
                    onClick={() => setFormData((prev) => ({ ...prev, colorScheme: 'default' }))}
                    className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer relative ${
                      (formData.colorScheme || 'default') === 'default'
                        ? 'bg-slate-900 border-blue-500 ring-2 ring-blue-500/40 shadow-lg'
                        : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-white">Classic Cyber Blue</span>
                      <div className="flex gap-1">
                        <span className="w-3.5 h-3.5 rounded-full bg-blue-500" />
                        <span className="w-3.5 h-3.5 rounded-full bg-purple-500" />
                        <span className="w-3.5 h-3.5 rounded-full bg-cyan-400" />
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400 block">Default Neon Glow</span>
                  </div>

                  {/* Red & Black & Emerald Green Scheme */}
                  <div
                    onClick={() => setFormData((prev) => ({ ...prev, colorScheme: 'red_green_black' }))}
                    className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer relative ${
                      formData.colorScheme === 'red_green_black'
                        ? 'bg-slate-900 border-red-500 ring-2 ring-red-500/40 shadow-lg'
                        : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-white">Red, Black & Emerald</span>
                      <div className="flex gap-1">
                        <span className="w-3.5 h-3.5 rounded-full bg-red-600" />
                        <span className="w-3.5 h-3.5 rounded-full bg-emerald-500" />
                        <span className="w-3.5 h-3.5 rounded-full bg-slate-950 border border-slate-700" />
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400 block">Crimson, Emerald & Pitch Black</span>
                  </div>

                  {/* Gold & Charcoal Scheme */}
                  <div
                    onClick={() => setFormData((prev) => ({ ...prev, colorScheme: 'gold_charcoal' }))}
                    className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer relative ${
                      formData.colorScheme === 'gold_charcoal'
                        ? 'bg-slate-900 border-amber-500 ring-2 ring-amber-500/40 shadow-lg'
                        : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-white">Gold & Charcoal</span>
                      <div className="flex gap-1">
                        <span className="w-3.5 h-3.5 rounded-full bg-amber-400" />
                        <span className="w-3.5 h-3.5 rounded-full bg-amber-600" />
                        <span className="w-3.5 h-3.5 rounded-full bg-slate-800" />
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400 block">Regal Gold & Luxury Slate</span>
                  </div>

                  {/* Violet & Neon Cyan Scheme */}
                  <div
                    onClick={() => setFormData((prev) => ({ ...prev, colorScheme: 'violet_cyan' }))}
                    className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer relative ${
                      formData.colorScheme === 'violet_cyan'
                        ? 'bg-slate-900 border-purple-500 ring-2 ring-purple-500/40 shadow-lg'
                        : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-white">Violet & Cyan</span>
                      <div className="flex gap-1">
                        <span className="w-3.5 h-3.5 rounded-full bg-purple-500" />
                        <span className="w-3.5 h-3.5 rounded-full bg-cyan-400" />
                        <span className="w-3.5 h-3.5 rounded-full bg-indigo-950" />
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400 block">Synthwave Electric Glow</span>
                  </div>

                  {/* Sunset Crimson & Amber Scheme */}
                  <div
                    onClick={() => setFormData((prev) => ({ ...prev, colorScheme: 'sunset_crimson' }))}
                    className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer relative ${
                      formData.colorScheme === 'sunset_crimson'
                        ? 'bg-slate-900 border-rose-500 ring-2 ring-rose-500/40 shadow-lg'
                        : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-white">Sunset & Crimson</span>
                      <div className="flex gap-1">
                        <span className="w-3.5 h-3.5 rounded-full bg-orange-500" />
                        <span className="w-3.5 h-3.5 rounded-full bg-rose-600" />
                        <span className="w-3.5 h-3.5 rounded-full bg-amber-300" />
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400 block">Warm Amber & Coral Rose</span>
                  </div>

                  {/* Emerald Mint & Obsidian Scheme */}
                  <div
                    onClick={() => setFormData((prev) => ({ ...prev, colorScheme: 'emerald_obsidian' }))}
                    className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer relative ${
                      formData.colorScheme === 'emerald_obsidian'
                        ? 'bg-slate-900 border-emerald-500 ring-2 ring-emerald-500/40 shadow-lg'
                        : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-white">Mint & Obsidian</span>
                      <div className="flex gap-1">
                        <span className="w-3.5 h-3.5 rounded-full bg-emerald-400" />
                        <span className="w-3.5 h-3.5 rounded-full bg-teal-500" />
                        <span className="w-3.5 h-3.5 rounded-full bg-slate-950" />
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400 block">Fresh Mint & Pure Obsidian</span>
                  </div>
                </div>
              </div>

              {/* SECTION: TYPOGRAPHY / FONT SELECTION */}
              <div className="pt-4 border-t border-white/10 space-y-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <h4 className="text-xs font-black text-white uppercase tracking-wider">Website Typography & Font Family</h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  {/* Sans-serif */}
                  <div
                    onClick={() => setFormData((prev) => ({ ...prev, fontFamily: 'sans' }))}
                    className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer ${
                      (formData.fontFamily || 'sans') === 'sans'
                        ? 'bg-slate-900 border-cyan-500 ring-2 ring-cyan-500/40'
                        : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-xs font-black text-white block mb-1">Plus Jakarta Sans</span>
                    <span className="text-[10px] text-slate-400 block">Modern Clean Tech</span>
                  </div>

                  {/* Serif */}
                  <div
                    onClick={() => setFormData((prev) => ({ ...prev, fontFamily: 'serif' }))}
                    className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer ${
                      formData.fontFamily === 'serif'
                        ? 'bg-slate-900 border-pink-500 ring-2 ring-pink-500/40'
                        : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-xs font-black text-white block mb-1">Playfair Display</span>
                    <span className="text-[10px] text-slate-400 block">Editorial Luxury Serif</span>
                  </div>

                  {/* Mono */}
                  <div
                    onClick={() => setFormData((prev) => ({ ...prev, fontFamily: 'mono' }))}
                    className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer ${
                      formData.fontFamily === 'mono'
                        ? 'bg-slate-900 border-purple-500 ring-2 ring-purple-500/40'
                        : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-xs font-black text-white block mb-1">Space Grotesk</span>
                    <span className="text-[10px] text-slate-400 block">Cyber Developer Code</span>
                  </div>

                  {/* Outfit / Geometric */}
                  <div
                    onClick={() => setFormData((prev) => ({ ...prev, fontFamily: 'outfit' }))}
                    className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer ${
                      formData.fontFamily === 'outfit'
                        ? 'bg-slate-900 border-emerald-500 ring-2 ring-emerald-500/40'
                        : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-xs font-black text-white block mb-1">Outfit Geometric</span>
                    <span className="text-[10px] text-slate-400 block">Sleek Round Modern</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white text-xs font-extrabold flex items-center justify-center gap-2 shadow-lg shadow-pink-600/30 transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSaving ? 'Saving Theme...' : 'Save Selected Theme to Database'}</span>
                </button>
              </div>
            </form>
          )}

          {/* 1. HERO & PROFILE TAB */}
          {activeTab === 'general' && (
            <form onSubmit={handleSaveConfig} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Title / Designation</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Primary Hero Profile Image (Front Photo)</label>
                <div className="flex gap-3 items-center flex-wrap sm:flex-nowrap">
                  <input
                    type="text"
                    name="heroImage"
                    value={formData.heroImage}
                    onChange={handleChange}
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1 min-w-[200px] bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleOpenCropper('heroImage', 1, 'Crop Front Profile Image')}
                    className="px-3 py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-blue-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer shrink-0"
                  >
                    <Crop className="w-3.5 h-3.5" />
                    <span>Upload & Crop Photo</span>
                  </button>
                  {formData.heroImage && (
                    <img
                      src={formData.heroImage}
                      alt="Front Preview"
                      className="w-10 h-10 rounded-xl object-cover border border-slate-700 shrink-0"
                    />
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Secondary Hero Profile Image (Back Flip Photo)</label>
                <div className="flex gap-3 items-center flex-wrap sm:flex-nowrap">
                  <input
                    type="text"
                    name="secondaryHeroImage"
                    value={formData.secondaryHeroImage || ''}
                    onChange={handleChange}
                    placeholder="https://images.unsplash.com/... (Photo shown on 3D card flip)"
                    className="flex-1 min-w-[200px] bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleOpenCropper('secondaryHeroImage', 1, 'Crop Back Flip Profile Image')}
                    className="px-3 py-2 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/40 text-purple-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer shrink-0"
                  >
                    <Crop className="w-3.5 h-3.5" />
                    <span>Upload & Crop Photo</span>
                  </button>
                  {formData.secondaryHeroImage && (
                    <img
                      src={formData.secondaryHeroImage}
                      alt="Back Preview"
                      className="w-10 h-10 rounded-xl object-cover border border-slate-700 shrink-0"
                    />
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Hero Bio / Intro Text</label>
                <textarea
                  name="bio"
                  rows={3}
                  value={formData.bio}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-lg shadow-blue-600/30"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSaving ? 'Saving...' : 'Save Profile Settings'}</span>
                </button>
              </div>
            </form>
          )}

          {/* 2. FOOTER & LOGO TAB */}
          {activeTab === 'footer' && (
            <form onSubmit={handleSaveConfig} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Footer Brand Name</label>
                  <input
                    type="text"
                    name="footerName"
                    value={formData.footerName}
                    onChange={handleChange}
                    placeholder="TAMANNA"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Footer Logo Text (DH Badge)</label>
                  <input
                    type="text"
                    name="footerLogoText"
                    value={formData.footerLogoText}
                    onChange={handleChange}
                    placeholder="DH"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Footer Image (Optional)</label>
                <div className="flex gap-3 items-center flex-wrap sm:flex-nowrap">
                  <input
                    type="text"
                    name="footerImage"
                    value={formData.footerImage}
                    onChange={handleChange}
                    placeholder="https://..."
                    className="flex-1 min-w-[200px] bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleOpenCropper('footerImage', 1, 'Crop & Resize Footer Image')}
                    className="px-3 py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-blue-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer shrink-0"
                  >
                    <Crop className="w-3.5 h-3.5" />
                    <span>Upload & Crop Photo</span>
                  </button>
                  {formData.footerImage && (
                    <img
                      src={formData.footerImage}
                      alt="Footer Preview"
                      className="w-10 h-10 rounded-xl object-cover border border-slate-700 shrink-0"
                    />
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Footer Copyright Text</label>
                <input
                  type="text"
                  name="footerCopyright"
                  value={formData.footerCopyright}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-lg shadow-blue-600/30"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSaving ? 'Saving...' : 'Save Footer Settings'}</span>
                </button>
              </div>
            </form>
          )}

          {/* 3. CONTACT & LINKS TAB */}
          {activeTab === 'contact' && (
            <form onSubmit={handleSaveConfig} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">GitHub URL</label>
                  <input
                    type="text"
                    name="githubUrl"
                    value={formData.githubUrl}
                    onChange={handleChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">LinkedIn URL</label>
                  <input
                    type="text"
                    name="linkedinUrl"
                    value={formData.linkedinUrl}
                    onChange={handleChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Instagram URL</label>
                  <input
                    type="text"
                    name="instagramUrl"
                    value={formData.instagramUrl}
                    onChange={handleChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Twitter / X URL</label>
                  <input
                    type="text"
                    name="twitterUrl"
                    value={formData.twitterUrl}
                    onChange={handleChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-lg shadow-blue-600/30"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSaving ? 'Saving...' : 'Save Contact Details'}</span>
                </button>
              </div>
            </form>
          )}

          {/* 4. PROJECTS TAB */}
          {activeTab === 'projects' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-extrabold text-white">Project List</h3>
                <button
                  onClick={() => {
                    setEditingProject({});
                    setIsProjectModalOpen(true);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Project</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {projects.map((p) => (
                  <div
                    key={p.id}
                    className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-12 h-12 rounded-xl object-cover border border-slate-700 shrink-0"
                      />
                      <div className="overflow-hidden">
                        <h4 className="text-xs font-bold text-white truncate">{p.name}</h4>
                        <span className="text-[10px] text-blue-400 font-semibold">{p.category}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => {
                          setEditingProject(p);
                          setIsProjectModalOpen(true);
                        }}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteProj(p.id)}
                        className="p-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. HIRE INQUIRIES TAB */}
          {activeTab === 'inquiries' && (
            <div className="space-y-4">
              <div className="p-3 rounded-2xl bg-amber-950/40 border border-amber-500/30 flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h3 className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                    <Inbox className="w-4 h-4 text-amber-400" />
                    <span>Client Hire Requests & Tracker Management ({inquiries.length})</span>
                  </h3>
                  <p className="text-[10px] text-slate-400">
                    Real-time requests submitted by clients. Search by phone number or name, update status, and manage inquiries.
                  </p>
                </div>
              </div>

              {/* Search by Phone or Name */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={inquirySearch}
                  onChange={(e) => setInquirySearch(e.target.value)}
                  placeholder="Search by client phone number or name..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
                />
              </div>

              {inquiries.filter((inq) => {
                if (!inquirySearch.trim()) return true;
                const s = inquirySearch.toLowerCase();
                return (
                  inq.phone?.toLowerCase().includes(s) ||
                  inq.name?.toLowerCase().includes(s) ||
                  inq.email?.toLowerCase().includes(s) ||
                  inq.serviceType?.toLowerCase().includes(s)
                );
              }).length === 0 ? (
                <div className="text-center py-12 bg-slate-900/50 rounded-2xl border border-slate-800">
                  <MessageSquare className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                  <p className="text-xs text-slate-400 font-semibold">No hire requests found matching search.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {inquiries
                    .filter((inq) => {
                      if (!inquirySearch.trim()) return true;
                      const s = inquirySearch.toLowerCase();
                      return (
                        inq.phone?.toLowerCase().includes(s) ||
                        inq.name?.toLowerCase().includes(s) ||
                        inq.email?.toLowerCase().includes(s) ||
                        inq.serviceType?.toLowerCase().includes(s)
                      );
                    })
                    .map((inq) => (
                      <div
                        key={inq.id}
                        className={`p-4 rounded-2xl border transition-all ${
                          !inq.read
                            ? 'bg-slate-900/90 border-amber-500/50 shadow-md shadow-amber-500/5'
                            : 'bg-slate-950/70 border-slate-800'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 flex-wrap sm:flex-nowrap">
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-sm font-black text-white">{inq.name}</span>
                              <span className="px-2 py-0.5 text-[10px] font-extrabold rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                                {inq.serviceType || 'General Request'}
                              </span>
                              {!inq.read && (
                                <span className="px-2 py-0.5 text-[9px] font-black rounded-full bg-amber-500 text-black uppercase">
                                  New Request
                                </span>
                              )}
                            </div>

                            <div className="flex items-center gap-4 text-xs text-slate-300 mt-1 flex-wrap">
                              <span className="flex items-center gap-1 font-bold text-emerald-400">
                                <Phone className="w-3.5 h-3.5" />
                                {inq.phone}
                              </span>
                              {inq.email && (
                                <a href={`mailto:${inq.email}`} className="text-blue-400 hover:underline">
                                  {inq.email}
                                </a>
                              )}
                              {inq.budget && (
                                <span className="text-amber-300 font-semibold flex items-center gap-1">
                                  <DollarSign className="w-3 h-3" />
                                  Budget: {inq.budget}
                                </span>
                              )}
                              {inq.createdAt && (
                                <span className="flex items-center gap-1 text-[10px] text-slate-500">
                                  <Clock className="w-3 h-3" />
                                  {new Date(inq.createdAt).toLocaleString()}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            {/* Status Selector Dropdown */}
                            <select
                              value={inq.status || 'Pending'}
                              onChange={(e) =>
                                updateInquiryStatus(
                                  inq.id,
                                  e.target.value as 'Pending' | 'In Progress' | 'Accepted' | 'Completed' | 'Rejected'
                                )
                              }
                              className={`px-2.5 py-1.5 rounded-xl text-xs font-bold border cursor-pointer focus:outline-none ${
                                inq.status === 'Completed'
                                  ? 'bg-emerald-950 text-emerald-300 border-emerald-500/50'
                                  : inq.status === 'In Progress' || inq.status === 'Accepted'
                                  ? 'bg-blue-950 text-blue-300 border-blue-500/50'
                                  : inq.status === 'Rejected'
                                  ? 'bg-red-950 text-red-300 border-red-500/50'
                                  : 'bg-amber-950 text-amber-300 border-amber-500/50'
                              }`}
                            >
                              <option value="Pending">🟡 Pending</option>
                              <option value="In Progress">🔵 In Progress</option>
                              <option value="Accepted">🟢 Accepted</option>
                              <option value="Completed">✅ Completed</option>
                              <option value="Rejected">🔴 Rejected</option>
                            </select>

                            <button
                              type="button"
                              onClick={() => toggleInquiryRead(inq.id, inq.read)}
                              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer border ${
                                inq.read
                                  ? 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                                  : 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30'
                              }`}
                            >
                              {inq.read ? 'Unread' : 'Read'}
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                if (confirm('Delete this inquiry request permanently?')) {
                                  deleteInquiry(inq.id);
                                }
                              }}
                              className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 cursor-pointer"
                              title="Delete request"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {inq.message && (
                          <div className="mt-3 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 whitespace-pre-wrap leading-relaxed">
                            {inq.message}
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}

          {/* AI SETTINGS & OPENROUTER TAB */}
          {activeTab === 'ai' && (
            <form onSubmit={handleSaveConfig} className="space-y-6">
              <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-600/30 border border-cyan-400/50 flex items-center justify-center text-cyan-300">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">AI Assistant & OpenRouter API Setup</h3>
                    <p className="text-xs text-cyan-300/80">
                      Configure your OpenRouter API key and model for AI responses.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    OpenRouter API Key
                  </label>
                  <input
                    type="password"
                    name="openRouterApiKey"
                    value={formData.openRouterApiKey || ''}
                    onChange={handleChange}
                    placeholder="sk-or-v1-..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">
                    Get your free or paid API Key at <a href="https://openrouter.ai/keys" target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">openrouter.ai/keys</a>. If left empty, the AI bot uses an intelligent local smart responder.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    AI Model Name
                  </label>
                  <input
                    type="text"
                    name="openRouterModel"
                    value={formData.openRouterModel || 'google/gemini-2.0-flash-lite-001'}
                    onChange={handleChange}
                    placeholder="google/gemini-2.0-flash-lite-001 or deepseek/deepseek-r1 or openai/gpt-4o-mini"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">
                    Examples: <code className="text-cyan-300">google/gemini-2.0-flash-lite-001</code>, <code className="text-cyan-300">openai/gpt-4o-mini</code>, <code className="text-cyan-300">deepseek/deepseek-chat</code>.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs text-slate-300">
                  <span className="font-extrabold text-cyan-300 flex items-center gap-1.5">
                    <Cpu className="w-4 h-4" /> Instructions & Management:
                  </span>
                  <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-400">
                    <li>When users ask questions in the floating robot chat, it will wait for a 2-second thinking period and play a sound effect.</li>
                    <li>If OpenRouter API Key is set above, queries are sent directly to OpenRouter.</li>
                    <li>If the API Key is empty or invalid, the bot automatically falls back to local intelligent answers and informs users about Tamanna's work.</li>
                  </ul>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-lg shadow-cyan-600/30"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSaving ? 'Saving...' : 'Save AI Settings'}</span>
                </button>
              </div>
            </form>
          )}

          {/* 6. UPLOAD CV / PDF TAB */}
          {activeTab === 'cv' && (
            <form onSubmit={handleSaveConfig} className="space-y-4">
              <div className="p-3 rounded-2xl bg-emerald-950/40 border border-emerald-500/30">
                <h3 className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-emerald-400" />
                  <span>Manage Portfolio CV / Resume PDF</span>
                </h3>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Upload your official PDF resume. Visitors who click "Download CV" on the portfolio will download this file.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">Upload Resume File (PDF format, max 8MB)</label>
                <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
                  <label className="px-4 py-3 rounded-2xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 text-xs font-extrabold flex items-center gap-2 cursor-pointer transition-all shrink-0">
                    <FileUp className="w-4 h-4" />
                    <span>Choose PDF File...</span>
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={handleCVPdfUpload}
                      className="hidden"
                    />
                  </label>

                  <div className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl p-3 flex items-center justify-between gap-2">
                    <div className="overflow-hidden">
                      <p className="text-xs font-bold text-white truncate">
                        {formData.cvFileName || 'No PDF uploaded (Default text summary will be used)'}
                      </p>
                      <p className="text-[10px] text-slate-400 truncate">
                        {formData.cvPdfUrl ? 'PDF Ready to save to Firestore' : 'Click "Choose PDF File" above to upload'}
                      </p>
                    </div>

                    {formData.cvPdfUrl && (
                      <a
                        href={formData.cvPdfUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-blue-300 text-[10px] font-bold flex items-center gap-1 shrink-0"
                      >
                        <Download className="w-3 h-3" />
                        <span>Preview PDF</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Direct PDF / Google Drive URL (Alternative Option)</label>
                <input
                  type="text"
                  name="cvPdfUrl"
                  value={formData.cvPdfUrl || ''}
                  onChange={handleChange}
                  placeholder="https://drive.google.com/uc?export=download&id=... or data:application/pdf;base64,..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-600/30"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSaving ? 'Saving...' : 'Save CV Settings'}</span>
                </button>
              </div>
            </form>
          )}

          {/* 7. BACKGROUND MUSIC TAB */}
          {activeTab === 'music' && (
            <form onSubmit={handleSaveConfig} className="space-y-6">
              <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600/30 border border-indigo-400/50 flex items-center justify-center text-indigo-400">
                    <Music className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Background Music Settings</h3>
                    <p className="text-xs text-indigo-300/80">
                      Upload an MP3 or audio track to play continuously in the background across your entire website.
                    </p>
                  </div>
                </div>

                {/* Master ON/OFF Toggle */}
                <label className="flex items-center gap-2 cursor-pointer bg-slate-900 border border-slate-700 px-3 py-1.5 rounded-xl">
                  <span className="text-xs font-bold text-slate-300">Music Active:</span>
                  <input
                    type="checkbox"
                    checked={formData.bgMusicEnabled ?? true}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, bgMusicEnabled: e.target.checked }))
                    }
                    className="w-4 h-4 accent-indigo-500 rounded cursor-pointer"
                  />
                  <span className={`text-xs font-extrabold ${(formData.bgMusicEnabled ?? true) ? 'text-emerald-400' : 'text-red-400'}`}>
                    {(formData.bgMusicEnabled ?? true) ? 'ON' : 'OFF'}
                  </span>
                </label>
              </div>

              {/* Audio Track Selector & Uploader */}
              <div className="space-y-4">
                <label className="block text-xs font-bold text-slate-300">
                  Upload Background Audio Track (MP3, WAV, OGG, M4A)
                </label>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* File Upload Box */}
                  <div className="p-4 rounded-2xl bg-slate-900 border border-dashed border-slate-700 hover:border-indigo-500/50 transition-colors flex flex-col items-center justify-center text-center space-y-2">
                    <div className="w-10 h-10 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                      <FileUp className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">Choose Audio File from Device</p>
                      <p className="text-[10px] text-slate-400">MP3, WAV, OGG, M4A (Max 20MB)</p>
                    </div>
                    <label className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md shadow-indigo-600/30">
                      <Upload className="w-4 h-4" />
                      <span>Select Audio File</span>
                      <input
                        type="file"
                        accept="audio/*"
                        onChange={handleAudioUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Current Track Status Box */}
                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-3">
                    <div>
                      <span className="text-[10px] uppercase font-black text-indigo-400 tracking-wider">
                        Current Background Music Track
                      </span>
                      {formData.bgMusicUrl ? (
                        <div className="mt-2 p-3 rounded-xl bg-slate-950 border border-indigo-500/30 flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <Music className="w-4 h-4 text-indigo-400 shrink-0" />
                            <span className="text-xs font-bold text-white truncate">
                              {formData.bgMusicFileName || 'Custom Audio Track'}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={handleDeleteAudioTrack}
                            className="p-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 text-xs font-bold flex items-center gap-1 cursor-pointer shrink-0"
                            title="Delete song"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </button>
                        </div>
                      ) : (
                        <div className="mt-2 p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-500 text-xs text-center">
                          No background music track uploaded yet.
                        </div>
                      )}
                    </div>

                    {/* Default Volume Slider */}
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-xs font-bold text-slate-300">Default Playback Volume</label>
                        <span className="text-xs font-mono text-indigo-400 font-bold">
                          {Math.round((formData.bgMusicVolume ?? 0.4) * 100)}%
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={formData.bgMusicVolume ?? 0.4}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            bgMusicVolume: parseFloat(e.target.value)
                          }))
                        }
                        className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Direct Audio URL */}
                <div className="pt-2">
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Or Paste Direct Audio MP3 URL (Alternative)
                  </label>
                  <input
                    type="text"
                    name="bgMusicUrl"
                    value={formData.bgMusicUrl || ''}
                    onChange={handleChange}
                    placeholder="https://example.com/song.mp3 or data:audio/mp3;base64,..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                {/* Audio Player Preview in Admin */}
                {formData.bgMusicUrl && (
                  <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <span className="text-xs font-bold text-slate-400">Audio Preview Test:</span>
                    <audio
                      controls
                      src={formData.bgMusicUrl}
                      className="w-full h-9 rounded-xl accent-indigo-500"
                    />
                  </div>
                )}
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-lg shadow-indigo-600/30"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSaving ? 'Saving...' : 'Save Music Settings'}</span>
                </button>
              </div>
            </form>
          )}

          {/* 8. INTRO SCREEN & VIDEOS TAB */}
          {activeTab === 'video' && (
            <form onSubmit={handleSaveConfig} className="space-y-6">
              {/* SECTION A: JAPANESE SAKURA & ANIME ART INTRO SCREEN */}
              <div className="p-5 rounded-3xl bg-gradient-to-r from-amber-950/60 via-rose-950/40 to-purple-950/60 border border-amber-500/40 space-y-4 shadow-xl">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-amber-300">
                      <Sparkles className="w-5 h-5 text-amber-300" />
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-white flex items-center gap-2">
                        <span>🌸 Anime Art & Sakura Entrance Screen</span>
                        <span className="px-2 py-0.5 rounded-full bg-amber-500/30 text-amber-200 border border-amber-400/30 text-[10px] font-mono">Mobile-Friendly</span>
                      </h3>
                      <p className="text-xs text-amber-200/80">
                        First screen visitors see with Japanese Sakura paper canvas, door-opening stage transition, and full-screen video showcase!
                      </p>
                    </div>
                  </div>

                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.enableIntroScreen ?? true}
                      onChange={(e) => setFormData((prev) => ({ ...prev, enableIntroScreen: e.target.checked }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                    <span className="ml-2 text-xs font-bold text-amber-200">Enable Intro Screen</span>
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-[11px] font-bold text-amber-300 mb-1">Artist Name (Default: Tamanna)</label>
                    <input
                      type="text"
                      name="introArtistName"
                      value={formData.introArtistName || ''}
                      onChange={handleChange}
                      placeholder="Tamanna"
                      className="w-full bg-slate-950 border border-amber-500/30 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-amber-300 mb-1">Badge Text (Default: STUDIO)</label>
                    <input
                      type="text"
                      name="introBadge"
                      value={formData.introBadge || ''}
                      onChange={handleChange}
                      placeholder="STUDIO"
                      className="w-full bg-slate-950 border border-amber-500/30 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-amber-300 mb-1">Eyebrow Tag (Default: ✨ WELCOME TO THE ARTIST'S WORLD)</label>
                    <input
                      type="text"
                      name="introEyebrow"
                      value={formData.introEyebrow || ''}
                      onChange={handleChange}
                      placeholder="✨ WELCOME TO THE ARTIST'S WORLD"
                      className="w-full bg-slate-950 border border-amber-500/30 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-amber-300 mb-1">Button Text (Default: ENTER THE ART WORLD)</label>
                    <input
                      type="text"
                      name="introButtonText"
                      value={formData.introButtonText || ''}
                      onChange={handleChange}
                      placeholder="ENTER THE ART WORLD"
                      className="w-full bg-slate-950 border border-amber-500/30 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-[11px] font-bold text-amber-300 mb-1">Tagline / Subtitle</label>
                    <input
                      type="text"
                      name="introTagline"
                      value={formData.introTagline || ''}
                      onChange={handleChange}
                      placeholder="A Cinematic Journey into Anime Art & Character Design"
                      className="w-full bg-slate-950 border border-amber-500/30 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  {/* Intro Avatar Photo */}
                  <div className="md:col-span-2 p-3 rounded-2xl bg-slate-950/70 border border-amber-500/20 space-y-2">
                    <label className="block text-[11px] font-bold text-amber-300">Artist Avatar Photo URL</label>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full ring-2 ring-amber-400 overflow-hidden shrink-0 bg-slate-900">
                        <img
                          src={formData.introAvatarUrl || 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=600&auto=format&fit=crop'}
                          alt="Artist Avatar"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <input
                        type="text"
                        name="introAvatarUrl"
                        value={formData.introAvatarUrl || ''}
                        onChange={handleChange}
                        placeholder="https://images.unsplash.com/..."
                        className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION B: UNIFIED RESPONSIVE VIDEO SHOWCASE (DESKTOP & MOBILE) */}
              <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/30 flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-600/30 border border-rose-400/50 flex items-center justify-center text-rose-400">
                    <Video className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Responsive Showcase & Celebration Videos</h3>
                    <p className="text-xs text-rose-300/80">
                      These Desktop & Mobile videos play automatically during the <strong>Japanese Entrance Stage</strong> AND during <strong>Hire Me Celebration Broadcasts</strong>!
                    </p>
                  </div>
                </div>
              </div>

              {/* Information Banner */}
              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-1">
                <p className="font-bold text-amber-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>Responsive Video Playback Logic:</span>
                </p>
                <ul className="list-disc list-inside text-[11px] text-slate-400 space-y-1 pl-1">
                  <li><strong>Desktop Devices (&ge;768px):</strong> Plays your uploaded 16:9 Landscape Video in crisp full-screen.</li>
                  <li><strong>Mobile Devices (&lt;768px):</strong> Plays your uploaded 9:16 Portrait Video in vertical full-screen.</li>
                  <li><strong>Smooth Transitions:</strong> Video fades in smoothly behind Japanese split doors with audio ramp-up, and slowly fades out revealing your website.</li>
                  <li><strong>Size Limit:</strong> Files up to <strong>100MB</strong> each are saved reliably in browser IndexedDB without hitting Firestore limits.</li>
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 1. DESKTOP VIDEO (16:9) */}
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-white flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/30 font-mono text-[10px]">16:9</span>
                      <span>Desktop Landscape Video</span>
                    </h4>
                    {formData.desktopHireVideoUrl && (
                      <button
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, desktopHireVideoUrl: '', desktopHireVideoFileName: '' }))}
                        className="text-[10px] text-red-400 hover:underline cursor-pointer"
                      >
                        Remove Video
                      </button>
                    )}
                  </div>

                  {/* Desktop File Upload */}
                  <div className="p-3 rounded-xl bg-slate-950 border border-dashed border-slate-700 text-center space-y-2">
                    <p className="text-xs font-bold text-slate-200">
                      {formData.desktopHireVideoFileName || 'No 16:9 Desktop Video Uploaded'}
                    </p>
                    <label className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs inline-flex items-center gap-1.5 cursor-pointer shadow-md">
                      <FileUp className="w-3.5 h-3.5" />
                      <span>Choose Desktop MP4 (&lt;100MB)</span>
                      <input
                        type="file"
                        accept="video/*"
                        onChange={handleDesktopVideoUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 mb-1">Or Direct Video URL (16:9 MP4)</label>
                    <input
                      type="text"
                      name="desktopHireVideoUrl"
                      value={formData.desktopHireVideoUrl || ''}
                      onChange={handleChange}
                      placeholder="https://example.com/desktop-video.mp4"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  {formData.desktopHireVideoUrl && (
                    <div className="rounded-xl overflow-hidden border border-slate-800 bg-black aspect-video">
                      <video
                        controls
                        src={formData.desktopHireVideoUrl}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>

                {/* 2. MOBILE VIDEO (9:16) */}
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-white flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30 font-mono text-[10px]">9:16</span>
                      <span>Mobile Portrait Video</span>
                    </h4>
                    {formData.mobileHireVideoUrl && (
                      <button
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, mobileHireVideoUrl: '', mobileHireVideoFileName: '' }))}
                        className="text-[10px] text-red-400 hover:underline cursor-pointer"
                      >
                        Remove Video
                      </button>
                    )}
                  </div>

                  {/* Mobile File Upload */}
                  <div className="p-3 rounded-xl bg-slate-950 border border-dashed border-slate-700 text-center space-y-2">
                    <p className="text-xs font-bold text-slate-200">
                      {formData.mobileHireVideoFileName || 'No 9:16 Mobile Video Uploaded'}
                    </p>
                    <label className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs inline-flex items-center gap-1.5 cursor-pointer shadow-md">
                      <FileUp className="w-3.5 h-3.5" />
                      <span>Choose Mobile MP4 (&lt;100MB)</span>
                      <input
                        type="file"
                        accept="video/*"
                        onChange={handleMobileVideoUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 mb-1">Or Direct Video URL (9:16 MP4)</label>
                    <input
                      type="text"
                      name="mobileHireVideoUrl"
                      value={formData.mobileHireVideoUrl || ''}
                      onChange={handleChange}
                      placeholder="https://example.com/mobile-video.mp4"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  {formData.mobileHireVideoUrl && (
                    <div className="rounded-xl overflow-hidden border border-slate-800 bg-black aspect-[9/16] max-h-48 mx-auto">
                      <video
                        controls
                        src={formData.mobileHireVideoUrl}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between gap-3 flex-wrap">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-lg shadow-rose-600/30"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSaving ? 'Saving...' : 'Save Video Settings'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    triggerHireVideoBroadcast('Admin Broadcast Test', 'Live Celebration Demo');
                    onClose();
                  }}
                  className="px-4 py-2.5 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/50 text-purple-200 font-bold text-xs flex items-center gap-2 cursor-pointer shadow-lg"
                >
                  <Sparkles className="w-4 h-4 text-purple-300" />
                  <span>Broadcast Live Video to All Users Now</span>
                </button>
              </div>
            </form>
          )}

          {/* 8. ADMINS & PASSWORDS TAB */}
          {activeTab === 'admins' && (
            <div className="space-y-4">
              <div className="p-3 rounded-2xl bg-purple-950/40 border border-purple-500/30 flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h3 className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                    <Shield className="w-4 h-4 text-purple-400" />
                    <span>Registered Admin Accounts ({adminsList.length})</span>
                  </h3>
                  <p className="text-[10px] text-slate-400">
                    View active admin credentials, reveal or update passwords live in Firestore.
                  </p>
                </div>
                <div className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-purple-500/20 border border-purple-400/40 text-purple-300">
                  Limit: 1 Admin Allowed
                </div>
              </div>

              {passUpdateMsg && (
                <div className="p-3 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>{passUpdateMsg}</span>
                </div>
              )}

              <div className="space-y-3">
                {adminsList.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-6">No admin records found in Firestore database.</p>
                ) : (
                  adminsList.map((admin) => (
                    <div
                      key={admin.id}
                      className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3"
                    >
                      <div className="flex items-center justify-between flex-wrap gap-2 border-b border-white/5 pb-2">
                        <div>
                          <p className="text-xs font-extrabold text-white flex items-center gap-2">
                            <span>{admin.email}</span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 uppercase">
                              {admin.role || 'Admin'}
                            </span>
                          </p>
                          <p className="text-[10px] text-slate-500">
                            Created: {admin.createdAt ? new Date(admin.createdAt).toLocaleString() : 'N/A'}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleDeleteAdmin(admin.id, admin.email)}
                          className="px-2.5 py-1 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-[10px] font-bold flex items-center gap-1 cursor-pointer border border-red-500/20"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Remove</span>
                        </button>
                      </div>

                      {/* View & Edit Password Area */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-end pt-1">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 mb-1">
                            Current Password in Firestore
                          </label>
                          <div className="relative flex items-center">
                            <input
                              type={revealedPasswords[admin.id] ? 'text' : 'password'}
                              readOnly
                              value={admin.pass || '******'}
                              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 pr-10 text-xs text-purple-300 font-mono"
                            />
                            <button
                              type="button"
                              onClick={() => togglePasswordReveal(admin.id)}
                              className="absolute right-2 text-slate-400 hover:text-white p-1 cursor-pointer"
                            >
                              {revealedPasswords[admin.id] ? (
                                <EyeOff className="w-3.5 h-3.5" />
                              ) : (
                                <Eye className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-slate-400 mb-1">
                            Change / Set New Password
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              placeholder="New password (min 6 chars)..."
                              value={editingAdminPass[admin.id] || ''}
                              onChange={(e) =>
                                setEditingAdminPass((prev) => ({ ...prev, [admin.id]: e.target.value }))
                              }
                              className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500"
                            />
                            <button
                              type="button"
                              onClick={() => handleAdminPassChange(admin.id)}
                              className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1 cursor-pointer shadow-md shrink-0"
                            >
                              <Key className="w-3 h-3" />
                              <span>Save</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Add / Edit Project Sub-Modal */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 z-[100005] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-slate-900 border border-blue-500/30 rounded-3xl p-5 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <h3 className="text-sm font-bold text-white">
                {editingProject?.id ? 'Edit Project' : 'Add New Project'}
              </h3>
              <button
                onClick={() => setIsProjectModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProjectSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Project Name</label>
                <input
                  type="text"
                  required
                  value={editingProject?.name || ''}
                  onChange={(e) => setEditingProject((p) => ({ ...p, name: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                <input
                  type="text"
                  required
                  value={editingProject?.category || ''}
                  onChange={(e) => setEditingProject((p) => ({ ...p, category: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  placeholder="APK, Website, AI Tool..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Short Description</label>
                <input
                  type="text"
                  value={editingProject?.shortDescription || ''}
                  onChange={(e) => setEditingProject((p) => ({ ...p, shortDescription: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Image URL / Upload</label>
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={editingProject?.image || ''}
                    onChange={(e) => setEditingProject((p) => ({ ...p, image: e.target.value }))}
                    className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                  <button
                    type="button"
                    onClick={() => handleOpenCropper('projectImage', 1.777, 'Crop & Resize Project Cover')}
                    className="px-3 py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-blue-300 text-xs font-bold flex items-center gap-1 cursor-pointer shrink-0"
                  >
                    <Crop className="w-3.5 h-3.5" />
                    <span>Crop Photo</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Live URL</label>
                  <input
                    type="text"
                    value={editingProject?.liveUrl || ''}
                    onChange={(e) => setEditingProject((p) => ({ ...p, liveUrl: e.target.value }))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">GitHub URL</label>
                  <input
                    type="text"
                    value={editingProject?.githubUrl || ''}
                    onChange={(e) => setEditingProject((p) => ({ ...p, githubUrl: e.target.value }))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-xs text-slate-300 hover:bg-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 text-xs font-bold text-white hover:bg-blue-500 cursor-pointer"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Image Cropper Modal */}
      <ImageCropperModal
        isOpen={cropperOpen}
        onClose={() => setCropperOpen(false)}
        onCropComplete={handleCropComplete}
        aspectRatio={cropperAspect}
        title={cropperTitle}
      />
    </div>
  );
};

