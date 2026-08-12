import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  doc,
  getDoc,
  setDoc,
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User
} from 'firebase/auth';
import { db, auth, handleFirestoreError, OperationType } from '../lib/firebase';
import { PROFILE_DATA, PROJECTS_LIST } from '../data/portfolioData';
import { Project } from '../types';
import { saveCloudAsset, getCloudAsset, deleteCloudAsset } from '../utils/cloudStorage';

export interface PortfolioConfig {
  theme?: 'dynamic' | 'minimal';
  colorScheme?: 'default' | 'red_green_black' | 'gold_charcoal' | 'violet_cyan' | 'sunset_crimson' | 'emerald_obsidian';
  fontFamily?: 'sans' | 'serif' | 'mono' | 'outfit';
  name: string;
  title: string;
  bio: string;
  heroImage: string;
  secondaryHeroImage?: string;
  footerName: string;
  footerLogoText: string;
  footerImage: string;
  footerCopyright: string;
  email: string;
  phone: string;
  location: string;
  githubUrl: string;
  linkedinUrl: string;
  instagramUrl: string;
  twitterUrl: string;
  cvPdfUrl?: string;
  cvFileName?: string;
  bgMusicUrl?: string;
  bgMusicFileName?: string;
  bgMusicEnabled?: boolean;
  bgMusicVolume?: number;
  desktopHireVideoUrl?: string;
  desktopHireVideoFileName?: string;
  mobileHireVideoUrl?: string;
  mobileHireVideoFileName?: string;
  // Japanese Sakura & Digital Art Intro Screen Config
  enableIntroScreen?: boolean;
  introArtistName?: string;
  introEyebrow?: string;
  introTagline?: string;
  introButtonText?: string;
  introBadge?: string;
  introAvatarUrl?: string;
  introVideoUrl?: string;
  introVideoFileName?: string;
  openRouterApiKey?: string;
  openRouterModel?: string;
}

const defaultConfig: PortfolioConfig = {
  theme: 'dynamic',
  colorScheme: 'default',
  fontFamily: 'sans',
  name: PROFILE_DATA.name,
  title: 'DIGITAL ARTIST & ANIME CHARACTER DESIGNER',
  bio: 'I specialize in digital illustration, anime concept art, character design, and visual storytelling. Turning imagination into breathtaking digital artwork.',
  heroImage: '',
  secondaryHeroImage: '',
  footerName: 'TAMANNA',
  footerLogoText: 'TA',
  footerImage: '',
  footerCopyright: `© ${new Date().getFullYear()} Tamanna Artfolio. All rights reserved.`,
  email: PROFILE_DATA.email,
  phone: PROFILE_DATA.phone,
  location: PROFILE_DATA.location,
  githubUrl: PROFILE_DATA.github,
  linkedinUrl: PROFILE_DATA.linkedin,
  instagramUrl: PROFILE_DATA.instagram,
  twitterUrl: PROFILE_DATA.twitter,
  cvPdfUrl: '',
  cvFileName: 'Tamanna_Art_Portfolio.pdf',
  bgMusicUrl: '',
  bgMusicFileName: '',
  bgMusicEnabled: false,
  bgMusicVolume: 0.4,
  desktopHireVideoUrl: '',
  desktopHireVideoFileName: '',
  mobileHireVideoUrl: '',
  mobileHireVideoFileName: '',
  enableIntroScreen: true,
  introArtistName: 'Tamanna',
  introEyebrow: '✨ WELCOME TO THE ARTIST\'S WORLD',
  introTagline: 'A Cinematic Journey into Anime Art & Character Design',
  introButtonText: 'ENTER THE ART WORLD',
  introBadge: 'STUDIO',
  introAvatarUrl: '',
  introVideoUrl: '',
  introVideoFileName: '',
  openRouterApiKey: '',
  openRouterModel: 'google/gemini-2.0-flash-lite-001'
};

export interface AdminAccount {
  id: string;
  email: string;
  pass?: string;
  role: string;
  createdAt?: string;
  lastLogin?: string;
  fallbackMode?: boolean;
}

export interface Inquiry {
  id: string;
  name: string;
  phone: string;
  email?: string;
  serviceType: string;
  purpose?: string;
  budget?: string;
  message: string;
  status?: 'Pending' | 'In Progress' | 'Accepted' | 'Completed' | 'Rejected';
  createdAt: string;
  read?: boolean;
  notes?: string;
}

export interface LiveBroadcastState {
  active: boolean;
  clientName?: string;
  purpose?: string;
  triggeredAt?: number;
}

interface PortfolioContextType {
  config: PortfolioConfig;
  projects: Project[];
  adminsList: AdminAccount[];
  inquiries: Inquiry[];
  isAdmin: boolean;
  user: User | null;
  loading: boolean;
  liveBroadcast: LiveBroadcastState;
  triggerHireVideoBroadcast: (clientName?: string, purpose?: string) => Promise<void>;
  dismissHireVideoBroadcast: () => void;
  saveConfig: (newConfig: PortfolioConfig) => Promise<void>;
  addProject: (project: Omit<Project, 'id'>) => Promise<void>;
  updateProject: (id: string, project: Partial<Project>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  registerAdmin: (email: string, pass: string) => Promise<void>;
  loginAdmin: (email: string, pass: string) => Promise<void>;
  logoutAdmin: () => Promise<void>;
  setAdminActiveDirectly: (active?: boolean) => void;
  updateAdminPassword: (adminId: string, newPass: string) => Promise<void>;
  deleteAdminAccount: (adminId: string) => Promise<void>;
  submitInquiry: (data: Omit<Inquiry, 'id' | 'createdAt' | 'read' | 'status'>) => Promise<void>;
  deleteInquiry: (id: string) => Promise<void>;
  toggleInquiryRead: (id: string, currentReadStatus?: boolean) => Promise<void>;
  updateInquiryStatus: (id: string, status: 'Pending' | 'In Progress' | 'Accepted' | 'Completed' | 'Rejected', notes?: string) => Promise<void>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<PortfolioConfig>(defaultConfig);
  const [projects, setProjects] = useState<Project[]>(PROJECTS_LIST);
  const [adminsList, setAdminsList] = useState<AdminAccount[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return sessionStorage.getItem('art_admin_active') === 'true';
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [liveBroadcast, setLiveBroadcast] = useState<LiveBroadcastState>({ active: false });
  const lastHandledBroadcastRef = React.useRef<number>(0);

  // 1. Listen to Firebase Auth state
  useEffect(() => {
    // Clear old permanent localStorage keys so random visitors aren't logged in as admin
    localStorage.removeItem('dwip_admin_active');

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setIsAdmin(true);
        sessionStorage.setItem('art_admin_active', 'true');
      } else {
        if (sessionStorage.getItem('art_admin_active') !== 'true') {
          setIsAdmin(false);
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // 2. Fetch and listen to Settings Config from Firestore
  useEffect(() => {
    const docRef = doc(db, 'settings', 'config');

    const resolveConfigWithLocalAssets = async (data: any): Promise<PortfolioConfig> => {
      const merged: PortfolioConfig = { ...defaultConfig, ...data };
      if (merged.heroImage && merged.heroImage.includes('unsplash.com')) {
        merged.heroImage = '';
      }
      if (merged.introAvatarUrl && merged.introAvatarUrl.includes('unsplash.com')) {
        merged.introAvatarUrl = '';
      }
      if (!merged.name || merged.name.toLowerCase().includes('dwip')) {
        merged.name = 'Tamanna';
      }
      if (!merged.footerName || merged.footerName.toLowerCase().includes('dwip')) {
        merged.footerName = 'TAMANNA';
      }
      if (!merged.introArtistName || merged.introArtistName.toLowerCase().includes('dwip')) {
        merged.introArtistName = 'Tamanna';
      }

      const assetKeys: Array<{ field: keyof PortfolioConfig; key: string }> = [
        { field: 'bgMusicUrl', key: 'bg_music_url' },
        { field: 'cvPdfUrl', key: 'cv_pdf_url' },
        { field: 'desktopHireVideoUrl', key: 'desktop_hire_video_url' },
        { field: 'mobileHireVideoUrl', key: 'mobile_hire_video_url' },
        { field: 'introVideoUrl', key: 'intro_video_url' },
        { field: 'heroImage', key: 'hero_image' },
        { field: 'secondaryHeroImage', key: 'secondary_hero_image' },
        { field: 'footerImage', key: 'footer_image' },
        { field: 'introAvatarUrl', key: 'intro_avatar_url' },
      ];

      for (const item of assetKeys) {
        const val = merged[item.field] as string | undefined;
        // Check cloud asset if value is empty, marker, or unsplash default
        if (!val || val === 'LOCAL_STORAGE' || val === 'CLOUD_STORAGE' || (typeof val === 'string' && val.includes('unsplash.com'))) {
          const cloudAsset = await getCloudAsset(item.key);
          if (cloudAsset) {
            (merged[item.field] as any) = cloudAsset;
          } else {
            if (val === 'LOCAL_STORAGE' || val === 'CLOUD_STORAGE') {
              (merged[item.field] as any) = '';
            }
          }
        }
      }

      // Sync heroImage and introAvatarUrl so primary photo displays everywhere
      if (merged.heroImage && merged.heroImage.length > 50 && (!merged.introAvatarUrl || merged.introAvatarUrl.includes('unsplash.com'))) {
        merged.introAvatarUrl = merged.heroImage;
      } else if (merged.introAvatarUrl && merged.introAvatarUrl.length > 50 && !merged.heroImage) {
        merged.heroImage = merged.introAvatarUrl;
      }

      return merged;
    };

    const initConfig = async () => {
      try {
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          const processed = await resolveConfigWithLocalAssets(snap.data());
          setConfig(processed);
        } else {
          setConfig(defaultConfig);
        }
      } catch (err) {
        console.warn('Firestore config read offline fallback:', err);
        setConfig(defaultConfig);
      }
    };
    initConfig();

    const unsub = onSnapshot(
      docRef,
      async (snap) => {
        if (snap.exists()) {
          const processed = await resolveConfigWithLocalAssets(snap.data());
          setConfig(processed);
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, 'settings/config');
      }
    );

    return () => unsub();
  }, []);

  // 3. Fetch and listen to Projects collection from Firestore
  useEffect(() => {
    const projCol = collection(db, 'projects');

    const unsub = onSnapshot(
      projCol,
      async (snap) => {
        if (snap.empty) {
          setProjects(PROJECTS_LIST);
        } else {
          const list: Project[] = await Promise.all(
            snap.docs.map(async (docSnap) => {
              const data = docSnap.data() as Omit<Project, 'id'>;
              let image = data.image;
              if (!image || image === 'LOCAL_STORAGE' || image === 'CLOUD_STORAGE') {
                const cloudImg = await getCloudAsset(`proj_${docSnap.id}_image`);
                if (cloudImg) {
                  image = cloudImg;
                } else if (image === 'LOCAL_STORAGE' || image === 'CLOUD_STORAGE') {
                  image = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800';
                }
              }
              return {
                id: docSnap.id,
                ...data,
                image
              };
            })
          );
          setProjects(list);
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, 'projects');
        setProjects(PROJECTS_LIST);
      }
    );

    return () => unsub();
  }, []);

  // 4. Fetch and listen to Admins collection from Firestore
  useEffect(() => {
    const adminsCol = collection(db, 'admins');
    const unsub = onSnapshot(
      adminsCol,
      (snap) => {
        const list: AdminAccount[] = snap.docs.map((docSnap) => ({
          id: docSnap.id,
          ...(docSnap.data() as Omit<AdminAccount, 'id'>)
        }));
        setAdminsList(list);
      },
      (error) => {
        console.warn('Admins list read fallback:', error);
      }
    );
    return () => unsub();
  }, []);

  // 5. Fetch and listen to Inquiries collection from Firestore
  useEffect(() => {
    const inquiriesCol = collection(db, 'inquiries');
    const unsub = onSnapshot(
      inquiriesCol,
      (snap) => {
        const list: Inquiry[] = snap.docs.map((docSnap) => ({
          id: docSnap.id,
          ...(docSnap.data() as Omit<Inquiry, 'id'>)
        }));
        // Sort inquiries newest first
        list.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
        setInquiries(list);
      },
      (error) => {
        console.warn('Inquiries list read fallback:', error);
      }
    );
    return () => unsub();
  }, []);

  // 6. Listen to live video broadcast triggers in Firestore
  useEffect(() => {
    const broadcastRef = doc(db, 'settings', 'broadcast');
    const unsub = onSnapshot(
      broadcastRef,
      (snap) => {
        if (snap.exists()) {
          const data = snap.data();
          if (data && data.triggeredAt && data.triggeredAt > lastHandledBroadcastRef.current) {
            const now = Date.now();
            if (now - data.triggeredAt < 120000) {
              lastHandledBroadcastRef.current = data.triggeredAt;
              setLiveBroadcast({
                active: true,
                clientName: data.clientName || 'A Client',
                purpose: data.purpose || 'Hire Request',
                triggeredAt: data.triggeredAt
              });
            }
          }
        }
      },
      (error) => {
        console.warn('Live broadcast listener error:', error);
      }
    );
    return () => unsub();
  }, []);

  // Broadcast celebration video to all active site viewers
  const triggerHireVideoBroadcast = async (clientName: string = 'A Client', purpose: string = 'Hire Request') => {
    const timestamp = Date.now();
    lastHandledBroadcastRef.current = timestamp;
    setLiveBroadcast({
      active: true,
      clientName,
      purpose,
      triggeredAt: timestamp
    });

    try {
      const broadcastRef = doc(db, 'settings', 'broadcast');
      await setDoc(broadcastRef, {
        type: 'hire_celebration',
        triggeredAt: timestamp,
        clientName,
        purpose
      });
    } catch (err) {
      console.warn('Firestore broadcast set error:', err);
    }
  };

  const dismissHireVideoBroadcast = () => {
    setLiveBroadcast((prev) => ({ ...prev, active: false }));
  };

  // Submit Inquiry / Hire Request
  const submitInquiry = async (data: Omit<Inquiry, 'id' | 'createdAt' | 'read' | 'status'>) => {
    try {
      const inquiriesCol = collection(db, 'inquiries');
      await addDoc(inquiriesCol, {
        ...data,
        status: 'Pending',
        createdAt: new Date().toISOString(),
        read: false
      });
      // Broadcast celebration video live to all site visitors!
      await triggerHireVideoBroadcast(data.name, data.purpose || data.serviceType);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'inquiries');
    }
  };

  // Delete Inquiry
  const deleteInquiry = async (id: string) => {
    try {
      const docRef = doc(db, 'inquiries', id);
      await deleteDoc(docRef);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `inquiries/${id}`);
    }
  };

  // Toggle Inquiry Read status
  const toggleInquiryRead = async (id: string, currentReadStatus?: boolean) => {
    try {
      const docRef = doc(db, 'inquiries', id);
      await updateDoc(docRef, {
        read: !currentReadStatus
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `inquiries/${id}`);
    }
  };

  // Update Inquiry Status (Pending, In Progress, Accepted, Completed, Rejected)
  const updateInquiryStatus = async (id: string, status: 'Pending' | 'In Progress' | 'Accepted' | 'Completed' | 'Rejected', notes?: string) => {
    try {
      const docRef = doc(db, 'inquiries', id);
      const updateData: any = { status };
      if (notes !== undefined) {
        updateData.notes = notes;
      }
      await updateDoc(docRef, updateData);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `inquiries/${id}`);
    }
  };

  // Save config function
  const saveConfig = async (newConfig: PortfolioConfig) => {
    try {
      const docRef = doc(db, 'settings', 'config');
      const payload: PortfolioConfig = { ...newConfig };

      const assetKeys: Array<{ field: keyof PortfolioConfig; key: string }> = [
        { field: 'bgMusicUrl', key: 'bg_music_url' },
        { field: 'cvPdfUrl', key: 'cv_pdf_url' },
        { field: 'desktopHireVideoUrl', key: 'desktop_hire_video_url' },
        { field: 'mobileHireVideoUrl', key: 'mobile_hire_video_url' },
        { field: 'introVideoUrl', key: 'intro_video_url' },
        { field: 'heroImage', key: 'hero_image' },
        { field: 'secondaryHeroImage', key: 'secondary_hero_image' },
        { field: 'footerImage', key: 'footer_image' },
        { field: 'introAvatarUrl', key: 'intro_avatar_url' },
      ];

      for (const item of assetKeys) {
        const val = newConfig[item.field] as string | undefined;
        if (val) {
          if (val.startsWith('data:') || val.length > 20000) {
            await saveCloudAsset(item.key, val);
            (payload[item.field] as any) = 'CLOUD_STORAGE';
          } else {
            (payload[item.field] as any) = val;
          }
        } else {
          await deleteCloudAsset(item.key);
          (payload[item.field] as any) = '';
        }
      }

      // Safety check: Offload ANY other string property in payload if > 20KB or data:
      for (const key of Object.keys(payload) as Array<keyof PortfolioConfig>) {
        const val = payload[key];
        if (typeof val === 'string' && (val.startsWith('data:') || val.length > 20000)) {
          console.warn(`Offloading large string field '${key}' to Cloud Storage`);
          await saveCloudAsset(`asset_${key}`, val);
          (payload[key] as any) = 'CLOUD_STORAGE';
        }
      }

      // Save doc with timeout safety
      const saveDocWithTimeout = async () => {
        await setDoc(docRef, payload, { merge: true });
      };

      try {
        await Promise.race([
          saveDocWithTimeout(),
          new Promise((_, reject) => setTimeout(() => reject(new Error('Doc set timeout')), 3000))
        ]);
      } catch (err) {
        console.warn('Firestore doc set skipped or timed out, operating with local state:', err);
      }

      setConfig(newConfig);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'settings/config');
      setConfig(newConfig);
    }
  };

  // Add project function
  const addProject = async (projectData: Omit<Project, 'id'>) => {
    try {
      const projCol = collection(db, 'projects');
      const payload = { ...projectData };
      const tempId = `proj_new_${Date.now()}`;
      if (payload.image && (payload.image.startsWith('data:') || payload.image.length > 20000)) {
        await saveCloudAsset(`proj_${tempId}_image`, payload.image);
        payload.image = 'CLOUD_STORAGE';
      }
      const docRef = await addDoc(projCol, payload);
      // Migrate asset key if needed
      if (payload.image === 'CLOUD_STORAGE') {
        const fullImg = await getCloudAsset(`proj_${tempId}_image`);
        if (fullImg) {
          await saveCloudAsset(`proj_${docRef.id}_image`, fullImg);
          await deleteCloudAsset(`proj_${tempId}_image`);
        }
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'projects');
    }
  };

  // Update project function
  const updateProject = async (id: string, projectData: Partial<Project>) => {
    try {
      const projRef = doc(db, 'projects', id);
      const payload = { ...projectData };
      if (payload.image && (payload.image.startsWith('data:') || payload.image.length > 20000)) {
        await saveCloudAsset(`proj_${id}_image`, payload.image);
        payload.image = 'CLOUD_STORAGE';
      }
      await updateDoc(projRef, payload);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `projects/${id}`);
    }
  };

  // Delete project function
  const deleteProject = async (id: string) => {
    try {
      const projRef = doc(db, 'projects', id);
      await deleteCloudAsset(`proj_${id}_image`);
      await deleteDoc(projRef);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `projects/${id}`);
    }
  };

  // Register Admin account with single-admin limit check
  const registerAdmin = async (email: string, pass: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanId = cleanEmail.replace(/[^a-zA-Z0-9]/g, '_');
    const adminDocRef = doc(db, 'admins', cleanId);

    // Strict check: If an admin already exists in adminsList, prevent creating new admin accounts!
    if (adminsList.length >= 1) {
      const existing = adminsList.find((a) => a.email.toLowerCase() === cleanEmail);
      if (existing) {
        const error = new Error('This email is already registered as Admin. Please switch to "Login Admin".');
        (error as any).code = 'auth/email-already-in-use';
        throw error;
      } else {
        const error = new Error('Admin registration limit reached! Only 1 Admin account is permitted on this website. Please log in with the existing Admin account.');
        (error as any).code = 'auth/limit-reached';
        throw error;
      }
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, cleanEmail, pass);
      const uid = userCredential.user.uid;
      await setDoc(doc(db, 'admins', cleanId), {
        uid,
        email: cleanEmail,
        pass,
        role: 'admin',
        createdAt: new Date().toISOString()
      }, { merge: true });
      setIsAdmin(true);
      sessionStorage.setItem('art_admin_active', 'true');
    } catch (err: any) {
      if (err?.code === 'auth/email-already-in-use' || err?.code === 'auth/limit-reached') {
        throw err;
      }
      if (err?.code === 'auth/operation-not-allowed' || err?.message?.includes('network') || err?.code) {
        console.warn('Firebase Auth fallback: storing admin account directly in Firestore.');
        await setDoc(adminDocRef, {
          email: cleanEmail,
          pass,
          role: 'admin',
          fallbackMode: true,
          createdAt: new Date().toISOString()
        }, { merge: true });
        setIsAdmin(true);
        sessionStorage.setItem('art_admin_active', 'true');
        return;
      }
      throw err;
    }
  };

  // Login Admin
  const loginAdmin = async (email: string, pass: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanId = cleanEmail.replace(/[^a-zA-Z0-9]/g, '_');
    const adminDocRef = doc(db, 'admins', cleanId);

    try {
      await signInWithEmailAndPassword(auth, cleanEmail, pass);
      setIsAdmin(true);
      sessionStorage.setItem('art_admin_active', 'true');
      // Update stored pass in Firestore admin record
      await setDoc(adminDocRef, { email: cleanEmail, pass, role: 'admin', lastLogin: new Date().toISOString() }, { merge: true });
    } catch (err: any) {
      if (err?.code === 'auth/wrong-password' || err?.code === 'auth/invalid-credential' || err?.code === 'auth/user-not-found') {
        const error = new Error('Invalid email or password. Please verify your credentials.');
        (error as any).code = 'auth/wrong-password';
        throw error;
      }

      // Check Firestore doc fallback
      const snap = await getDoc(adminDocRef);
      if (snap.exists()) {
        const data = snap.data();
        if (data.pass && data.pass !== pass) {
          const error = new Error('Incorrect password. Please try again.');
          (error as any).code = 'auth/wrong-password';
          throw error;
        }
        // Success
        await setDoc(adminDocRef, { lastLogin: new Date().toISOString() }, { merge: true });
        setIsAdmin(true);
        sessionStorage.setItem('art_admin_active', 'true');
        return;
      } else {
        const error = new Error('No admin account found with this email. Please switch to "Create Admin".');
        (error as any).code = 'auth/user-not-found';
        throw error;
      }
    }
  };

  // Logout Admin
  const logoutAdmin = async () => {
    await signOut(auth);
    setIsAdmin(false);
    sessionStorage.removeItem('art_admin_active');
    localStorage.removeItem('dwip_admin_active');
  };

  // Directly Set Admin Active (via Secret Code)
  const setAdminActiveDirectly = (active: boolean = true) => {
    setIsAdmin(active);
    if (active) {
      sessionStorage.setItem('art_admin_active', 'true');
    } else {
      sessionStorage.removeItem('art_admin_active');
      localStorage.removeItem('dwip_admin_active');
    }
  };

  // Update Admin Password in Firestore
  const updateAdminPassword = async (adminId: string, newPass: string) => {
    try {
      const adminDocRef = doc(db, 'admins', adminId);
      await updateDoc(adminDocRef, {
        pass: newPass,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `admins/${adminId}`);
    }
  };

  // Delete Admin account from Firestore
  const deleteAdminAccount = async (adminId: string) => {
    try {
      const adminDocRef = doc(db, 'admins', adminId);
      await deleteDoc(adminDocRef);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `admins/${adminId}`);
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        config,
        projects,
        adminsList,
        inquiries,
        isAdmin,
        user,
        loading,
        liveBroadcast,
        triggerHireVideoBroadcast,
        dismissHireVideoBroadcast,
        saveConfig,
        addProject,
        updateProject,
        deleteProject,
        registerAdmin,
        loginAdmin,
        logoutAdmin,
        setAdminActiveDirectly,
        updateAdminPassword,
        deleteAdminAccount,
        submitInquiry,
        deleteInquiry,
        toggleInquiryRead,
        updateInquiryStatus
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
