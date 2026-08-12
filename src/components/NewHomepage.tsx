import React, { useState } from 'react';
import { 
  Sun, 
  Moon, 
  Download, 
  Send, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Instagram, 
  Mail, 
  Palette, 
  Box, 
  User, 
  Layout, 
  MapPin, 
  Briefcase, 
  Calendar, 
  CheckCircle2, 
  Sparkles, 
  Smartphone, 
  Globe, 
  Zap, 
  Eye, 
  Layers, 
  Heart, 
  Share2,
  Phone,
  PhoneCall,
  ShieldCheck,
  Flower2,
  Flower,
  Camera,
  Upload
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface NewHomepageProps {
  onReplayIntro: () => void;
  onPreviewProject?: (project: any) => void;
  currentTheme: 'dark' | 'light';
  onToggleTheme: () => void;
  onOpenAdminCMS?: () => void;
}

interface Artwork {
  id: string;
  title: string;
  category: '3D Art' | 'Illustration' | 'Concept Art' | 'Fan Art';
  categoryLabel: string;
  image: string;
  description: string;
  history: string;
  software: string;
  year: string;
}

const ARTWORKS: Artwork[] = [
  {
    id: 'art-1',
    title: 'Night Studio Room',
    category: '3D Art',
    categoryLabel: '3D Environment',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    description: 'A cozy isometric night studio environment modeled in Blender and rendered in Cycles.',
    history: 'Created late at night inspired by lo-fi music beats and peaceful solitude. Every prop—from the glowing dual monitors to the warm desk lamp—was handcrafted in 3D to capture the tranquil ambience of late-night digital art creation.',
    software: 'Blender, Photoshop',
    year: '2024'
  },
  {
    id: 'art-2',
    title: 'Sakura Blossom Girl',
    category: 'Illustration',
    categoryLabel: 'Digital Painting',
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=800&auto=format&fit=crop',
    description: 'Dreamy anime character portrait featuring cherry blossoms and soft ambient lighting.',
    history: 'Inspired by spring cherry blossom festivals in Kyoto. Painted using multi-layered brushwork in Clip Studio Paint to achieve soft glowing skin tones and falling sakura petals floating in gentle twilight breeze.',
    software: 'Clip Studio Paint, Photoshop',
    year: '2024'
  },
  {
    id: 'art-3',
    title: 'Floating Island Cottage',
    category: '3D Art',
    categoryLabel: '3D Environment',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop',
    description: 'A floating fantasy world cottage created with stylized hand-painted textures.',
    history: 'Designed as a concept for an upcoming fantasy video game world. Built using modular 3D assets in Blender, followed by hand-painted diffuse textures in Substance Painter to give it a whimsical anime aesthetic.',
    software: 'Blender, ZBrush, Photoshop',
    year: '2024'
  },
  {
    id: 'art-4',
    title: 'Sunset Fantasy Castle',
    category: 'Concept Art',
    categoryLabel: 'Concept Illustration',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop',
    description: 'Ethereal sunset castle landscape concept art evoking wonder and nostalgia.',
    history: 'Sketched during sunset while observing golden hour light refraction through clouds. Uses dramatic atmospheric haze and warm crimson gradients to depict an ancient mystical kingdom built on top of cloud cliffs.',
    software: 'Photoshop, Procreate',
    year: '2023'
  },
  {
    id: 'art-5',
    title: 'Traditional Wooden House',
    category: '3D Art',
    categoryLabel: '3D Architecture',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop',
    description: 'Detailed 3D model of a cozy traditional Asian wooden house in autumn.',
    history: 'A study in traditional architectural joinery and autumn foliage. Modeled with high precision in Blender and lit with warm volumetric sunset lighting to evoke feelings of warmth and home.',
    software: 'Blender, Substance Painter',
    year: '2023'
  },
  {
    id: 'art-6',
    title: 'Glasses Anime Character',
    category: 'Fan Art',
    categoryLabel: 'Character Design',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop',
    description: 'Original anime character art with atmospheric lighting and detailed expressions.',
    history: 'Character visual concept focused on expressing deep emotion through eyes and subtle lens reflection. Drawn digitally with customized calligraphy pencil brushes.',
    software: 'Clip Studio Paint',
    year: '2024'
  },
  {
    id: 'art-7',
    title: 'Vintage Film Camera',
    category: '3D Art',
    categoryLabel: '3D Prop Model',
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=800&auto=format&fit=crop',
    description: 'Photorealistic vintage camera 3D render with retro metallic textures.',
    history: '3D hard-surface modeling exercise replicating an iconic 1970s analogue camera down to the exact mechanical dial engravings, leather grip texture, and glass lens reflections.',
    software: 'Blender, Cycles',
    year: '2023'
  },
  {
    id: 'art-8',
    title: 'Warm Reading Corner',
    category: 'Illustration',
    categoryLabel: 'Environment Art',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop',
    description: 'Warm, comforting digital painting of a cozy corner library at night.',
    history: 'Painted as a tribute to quiet reading nights. Features layered soft shadows, warm incandescent lamps, and stacked vintage books bathed in golden light.',
    software: 'Procreate, Photoshop',
    year: '2024'
  }
];

const FLOWER_NODES = [
  { id: 0, top: 8, left: 6, size: 28, type: 0, delay: 0, speed: 11 },
  { id: 1, top: 18, left: 88, size: 34, type: 1, delay: 0.8, speed: 14 },
  { id: 2, top: 28, left: 14, size: 24, type: 2, delay: 1.2, speed: 10 },
  { id: 3, top: 38, left: 92, size: 30, type: 0, delay: 2.1, speed: 13 },
  { id: 4, top: 48, left: 8, size: 32, type: 1, delay: 0.5, speed: 12 },
  { id: 5, top: 58, left: 84, size: 26, type: 2, delay: 1.8, speed: 15 },
  { id: 6, top: 68, left: 12, size: 36, type: 0, delay: 0.3, speed: 11 },
  { id: 7, top: 78, left: 90, size: 28, type: 1, delay: 2.5, speed: 14 },
  { id: 8, top: 88, left: 18, size: 30, type: 2, delay: 1.1, speed: 13 },
  { id: 9, top: 12, left: 45, size: 22, type: 0, delay: 3.0, speed: 16 },
  { id: 10, top: 22, left: 70, size: 32, type: 1, delay: 1.6, speed: 12 },
  { id: 11, top: 34, left: 30, size: 26, type: 2, delay: 2.2, speed: 10 },
  { id: 12, top: 44, left: 78, size: 34, type: 0, delay: 0.7, speed: 15 },
  { id: 13, top: 54, left: 24, size: 28, type: 1, delay: 1.4, speed: 11 },
  { id: 14, top: 64, left: 68, size: 30, type: 2, delay: 2.8, speed: 13 },
  { id: 15, top: 74, left: 38, size: 24, type: 0, delay: 0.9, speed: 12 },
  { id: 16, top: 84, left: 62, size: 36, type: 1, delay: 2.0, speed: 14 },
  { id: 17, top: 94, left: 48, size: 26, type: 2, delay: 1.7, speed: 11 },
  { id: 18, top: 5, left: 80, size: 30, type: 0, delay: 2.4, speed: 13 },
  { id: 19, top: 92, left: 80, size: 28, type: 1, delay: 0.2, speed: 12 },
  { id: 20, top: 80, left: 4, size: 32, type: 2, delay: 1.9, speed: 15 },
  { id: 21, top: 15, left: 25, size: 26, type: 0, delay: 2.7, speed: 10 },
  { id: 22, top: 85, left: 35, size: 30, type: 1, delay: 1.0, speed: 14 },
  { id: 23, top: 40, left: 5, size: 24, type: 2, delay: 2.3, speed: 12 },
];

export const NewHomepage: React.FC<NewHomepageProps> = ({
  onReplayIntro,
  currentTheme,
  onToggleTheme,
  onOpenAdminCMS,
}) => {
  const { config, addWorkRequest, projects, isAdmin, setAdminActiveDirectly, saveConfig } = usePortfolio();

  const [activeTab, setActiveTab] = useState<'All' | '3D Art' | 'Illustration' | 'Concept Art' | 'Fan Art'>('All');
  const [selectedArtworkIndex, setSelectedArtworkIndex] = useState<number | null>(null);
  const [showFullGalleryView, setShowFullGalleryView] = useState(false);
  
  const [contactForm, setContactForm] = useState({ name: '', email: '', countryCode: '+91', phone: '', message: '' });
  const [formSuccess, setFormSuccess] = useState(false);

  // Hero avatar & flower convergence states
  const heroAvatarRef = React.useRef<HTMLDivElement | null>(null);
  const heroImageInputRef = React.useRef<HTMLInputElement | null>(null);
  const [flowerAnimState, setFlowerAnimState] = useState<'idle' | 'glowing' | 'converging' | 'shattering'>('idle');
  const [avatarCenterPoint, setAvatarCenterPoint] = useState<{ x: number; y: number } | null>(null);
  const [showSecondaryImage, setShowSecondaryImage] = useState<boolean>(false);
  const [isImageError, setIsImageError] = useState<boolean>(false);
  const [adminPromptModalOpen, setAdminPromptModalOpen] = useState<boolean>(false);

  const primaryImage = config.heroImage || config.introAvatarUrl || '';
  const secondaryImage = config.secondaryHeroImage || '';

  const currentDisplayImage = showSecondaryImage
    ? (secondaryImage || primaryImage)
    : primaryImage;

  const handleHeroAvatarClick = () => {
    if (flowerAnimState !== 'idle') return;

    // Calculate exact center coordinates of the hero avatar frame
    if (heroAvatarRef.current) {
      const rect = heroAvatarRef.current.getBoundingClientRect();
      setAvatarCenterPoint({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      });
    } else {
      setAvatarCenterPoint({
        x: window.innerWidth * 0.3,
        y: window.innerHeight * 0.35
      });
    }

    // 1. Glow flowers
    setFlowerAnimState('glowing');

    // 2. Converge towards center avatar
    setTimeout(() => {
      setFlowerAnimState('converging');
    }, 250);

    // 3. Shatter impact and swap image
    setTimeout(() => {
      setFlowerAnimState('shattering');
      setShowSecondaryImage((prev) => !prev);
    }, 800);

    // 4. Return to floating background position
    setTimeout(() => {
      setFlowerAnimState('idle');
    }, 1550);
  };

  const handleUploadButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAdmin) {
      // Require Admin login/authentication
      setAdminPromptModalOpen(true);
    } else {
      // Admin is active, trigger file upload
      heroImageInputRef.current?.click();
    }
  };

  const handleHeroImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 15 * 1024 * 1024) {
      alert('Please select an image file under 15MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64 = event.target?.result as string;
      if (base64) {
        if (showSecondaryImage) {
          await saveConfig({ ...config, secondaryHeroImage: base64 });
        } else {
          await saveConfig({ ...config, heroImage: base64, introAvatarUrl: base64 });
        }
        setIsImageError(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const isDark = currentTheme === 'dark';

  const artistName = (!config.name || config.name.toLowerCase().includes('dwip')) ? 'Tamanna' : config.name;
  const artistRole = 'Digital Artist & 3D Visual Creator';
  const artistBio = 'I create dreamy digital art and 3D visuals that tell stories, evoke emotions, and bring imagination to life.';

  const COUNTRY_CODES = [
    { code: '+91', country: 'India 🇮🇳' },
    { code: '+1', country: 'USA / Canada 🇺🇸' },
    { code: '+44', country: 'UK 🇬🇧' },
    { code: '+61', country: 'Australia 🇦🇺' },
    { code: '+880', country: 'Bangladesh 🇧🇩' },
    { code: '+971', country: 'UAE 🇦🇪' },
    { code: '+92', country: 'Pakistan 🇵🇰' },
    { code: '+977', country: 'Nepal 🇳🇵' },
    { code: '+94', country: 'Sri Lanka 🇱🇰' },
    { code: '+65', country: 'Singapore 🇸🇬' },
    { code: '+60', country: 'Malaysia 🇲🇾' },
    { code: '+81', country: 'Japan 🇯🇵' },
    { code: '+49', country: 'Germany 🇩🇪' },
    { code: '+33', country: 'France 🇫🇷' },
    { code: '+39', country: 'Italy 🇮🇹' },
    { code: '+34', country: 'Spain 🇪🇸' },
    { code: '+86', country: 'China 🇨🇳' },
    { code: '+966', country: 'Saudi Arabia 🇸🇦' },
    { code: '+55', country: 'Brazil 🇧🇷' },
    { code: '+27', country: 'South Africa 🇿🇦' },
  ];

  // Combine context uploaded projects with default ARTWORKS
  const allArtworks = React.useMemo(() => {
    const dynamicArtworks: Artwork[] = (projects || []).map((p, idx) => ({
      id: p.id || `proj-${idx}`,
      title: p.name || 'Digital Artwork',
      category: (p.category as any) || 'Illustration',
      categoryLabel: p.category || 'Digital Art',
      image: p.image || 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=800&auto=format&fit=crop',
      description: p.shortDescription || p.description || 'Digital artwork created with digital tools.',
      history: p.fullDescription || p.description || 'Created using digital illustration software and custom painting techniques.',
      software: (p.tags && p.tags.length > 0) ? p.tags.join(', ') : 'Digital Art Suite',
      year: '2024'
    }));

    const combined = [...ARTWORKS];
    dynamicArtworks.forEach(da => {
      if (!combined.some(c => c.id === da.id || c.title === da.title)) {
        combined.unshift(da);
      }
    });
    return combined;
  }, [projects]);

  const filteredArtworks = activeTab === 'All'
    ? allArtworks
    : allArtworks.filter(art => art.category === activeTab);

  // Homepage displays exactly 4 items, 2 per row
  const homepageFeaturedArtworks = filteredArtworks.slice(0, 4);

  const currentModalArtwork = selectedArtworkIndex !== null ? filteredArtworks[selectedArtworkIndex] : null;

  const handlePrevArtwork = () => {
    if (selectedArtworkIndex === null) return;
    setSelectedArtworkIndex((selectedArtworkIndex - 1 + filteredArtworks.length) % filteredArtworks.length);
  };

  const handleNextArtwork = () => {
    if (selectedArtworkIndex === null) return;
    setSelectedArtworkIndex((selectedArtworkIndex + 1) % filteredArtworks.length);
  };

  const handleSmoothScroll = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const SECRET_ADMIN_KEY = 'Tamanna123456Tamanna00';

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if secret key is present in message box
    if (contactForm.message.includes(SECRET_ADMIN_KEY) || contactForm.message.trim() === SECRET_ADMIN_KEY) {
      if (setAdminActiveDirectly) {
        setAdminActiveDirectly(true);
      }
      if (onOpenAdminCMS) {
        onOpenAdminCMS();
      }
      setContactForm({ name: '', email: '', countryCode: '+91', phone: '', message: '' });
      return;
    }

    if (!contactForm.name || !contactForm.email || !contactForm.message) return;

    const fullPhoneNumber = contactForm.phone ? `${contactForm.countryCode} ${contactForm.phone}` : 'Not provided';

    addWorkRequest({
      clientName: contactForm.name,
      email: contactForm.email,
      phone: fullPhoneNumber,
      serviceTitle: 'Art Commission / Inquiry',
      budget: 'Standard Rate',
      timeline: '1-2 Weeks',
      details: `[Phone: ${fullPhoneNumber}] ${contactForm.message}`,
    });

    setFormSuccess(true);
    setContactForm({ name: '', email: '', countryCode: '+91', phone: '', message: '' });
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 relative overflow-x-hidden ${
      isDark ? 'bg-[#120e14] text-rose-50' : 'bg-[#fdf8f9] text-stone-800'
    }`}>
      {/* Floating Animated Flowers / Sakura Petals Layer */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-10 opacity-70 sm:opacity-85">
        {FLOWER_NODES.map((fl) => {
          let animClass = fl.type % 2 === 0 ? 'animate-float-flower-1' : 'animate-float-flower-2';
          let styleObj: React.CSSProperties = {
            position: 'absolute',
            top: `${fl.top}%`,
            left: `${fl.left}%`,
            animationDuration: `${fl.speed}s`,
            animationDelay: `${fl.delay}s`,
            transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
          };

          if (flowerAnimState === 'glowing') {
            animClass += ' animate-flower-glow';
            styleObj.filter = 'drop-shadow(0 0 20px #fb7185) brightness(2.2)';
            styleObj.transform = 'scale(1.5)';
          } else if (flowerAnimState === 'converging') {
            animClass = '';
            
            // Calculate exact vector to the photo avatar center
            const targetX = avatarCenterPoint ? avatarCenterPoint.x : window.innerWidth * 0.3;
            const targetY = avatarCenterPoint ? avatarCenterPoint.y : window.innerHeight * 0.35;
            const currentX = (fl.left / 100) * window.innerWidth;
            const currentY = (fl.top / 100) * window.innerHeight;
            const dx = targetX - currentX;
            const dy = targetY - currentY;

            styleObj.transform = `translate(${dx}px, ${dy}px) scale(0.08) rotate(1080deg)`;
            styleObj.transition = 'transform 0.55s cubic-bezier(0.5, 0, 0.7, 0.2), opacity 0.55s ease-in';
            styleObj.opacity = 1;
            styleObj.filter = 'drop-shadow(0 0 25px #f472b6) brightness(2.8)';
          } else if (flowerAnimState === 'shattering') {
            animClass = '';
            styleObj.opacity = 0;
            styleObj.transform = 'scale(0)';
            styleObj.transition = 'all 0.25s ease-out';
          }

          return (
            <div key={`flower-node-${fl.id}`} className={animClass} style={styleObj}>
              {fl.type === 0 ? (
                <svg width={fl.size} height={fl.size} viewBox="0 0 24 24" fill="#f472b6" className="drop-shadow-sm opacity-85">
                  <path d="M12 2C12 2 13.5 7 17 8.5C20.5 10 22 12 22 12C22 12 17 13.5 15.5 17C14 20.5 12 22 12 22C12 22 10.5 17 7 15.5C3.5 14 2 12 2 12C2 12 7 10.5 8.5 7C10 3.5 12 2 12 2Z" />
                </svg>
              ) : fl.type === 1 ? (
                <svg width={fl.size} height={fl.size} viewBox="0 0 24 24" fill="#fb7185" className="drop-shadow-sm opacity-90">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              ) : (
                <svg width={fl.size} height={fl.size} viewBox="0 0 24 24" fill="#fda4af" className="drop-shadow-sm opacity-80">
                  <circle cx="12" cy="7" r="4" />
                  <circle cx="17" cy="12" r="4" />
                  <circle cx="12" cy="17" r="4" />
                  <circle cx="7" cy="12" r="4" />
                  <circle cx="12" cy="12" r="3" fill="#f59e0b" />
                </svg>
              )}
            </div>
          );
        })}
      </div>

      {/* Radial Shatter Particle Shockwave Overlay (Positioned at Photo Center) */}
      {flowerAnimState === 'shattering' && avatarCenterPoint && (
        <div
          className="fixed pointer-events-none z-30 flex items-center justify-center"
          style={{
            left: `${avatarCenterPoint.x}px`,
            top: `${avatarCenterPoint.y}px`,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div className="w-80 h-80 rounded-full border-4 border-rose-400 bg-rose-400/20 shadow-[0_0_120px_#f472b6] animate-[shatterShockwave_0.75s_cubic-bezier(0.16,1,0.3,1)_forwards]" />
          {[...Array(24)].map((_, idx) => {
            const angle = (idx / 24) * 360;
            const dist = 160 + (idx % 6) * 35;
            const tx = Math.cos((angle * Math.PI) / 180) * dist;
            const ty = Math.sin((angle * Math.PI) / 180) * dist;
            return (
              <div
                key={`shard-${idx}`}
                className="absolute w-3.5 h-3.5 rounded-full bg-rose-300 shadow-[0_0_18px_#fb7185]"
                style={{
                  '--tx': `${tx}px`,
                  '--ty': `${ty}px`,
                  '--rot': `${angle * 2}deg`,
                  animation: 'shatterShard 0.7s cubic-bezier(0.2, 1, 0.4, 1) forwards'
                } as React.CSSProperties}
              />
            );
          })}
        </div>
      )}
      {/* =========================================================================
          1. HEADER / NAVBAR
      ========================================================================= */}
      <header className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors ${
        isDark ? 'bg-[#120e14]/85 border-rose-950/60' : 'bg-[#fdf8f9]/85 border-rose-100'
      }`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <a href="#home" onClick={(e) => handleSmoothScroll(e, 'home')} className="text-2xl sm:text-3xl font-black font-serif text-rose-500 tracking-tight hover:opacity-90 transition-opacity">
              Artfolio
            </a>
          </div>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs sm:text-sm font-semibold">
            <a href="#home" onClick={(e) => handleSmoothScroll(e, 'home')} className="text-rose-500 hover:text-rose-600 transition-colors">Home</a>
            <a href="#about" onClick={(e) => handleSmoothScroll(e, 'about')} className={`transition-colors ${isDark ? 'text-rose-200/80 hover:text-rose-400' : 'text-stone-600 hover:text-rose-500'}`}>About</a>
            <a href="#gallery" onClick={(e) => handleSmoothScroll(e, 'gallery')} className={`transition-colors ${isDark ? 'text-rose-200/80 hover:text-rose-400' : 'text-stone-600 hover:text-rose-500'}`}>Gallery</a>
            <a href="#services" onClick={(e) => handleSmoothScroll(e, 'services')} className={`transition-colors ${isDark ? 'text-rose-200/80 hover:text-rose-400' : 'text-stone-600 hover:text-rose-500'}`}>Services</a>
            <a href="#experience" onClick={(e) => handleSmoothScroll(e, 'experience')} className={`transition-colors ${isDark ? 'text-rose-200/80 hover:text-rose-400' : 'text-stone-600 hover:text-rose-500'}`}>Experience</a>
            <a href="#contact" onClick={(e) => handleSmoothScroll(e, 'contact')} className={`transition-colors ${isDark ? 'text-rose-200/80 hover:text-rose-400' : 'text-stone-600 hover:text-rose-500'}`}>Contact</a>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {isAdmin && (
              <button
                onClick={onOpenAdminCMS}
                className="px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-rose-500/10 hover:bg-rose-500 hover:text-white text-rose-500 font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer border border-rose-500/30 shadow-sm hover:scale-105 active:scale-95"
                title="Open Admin Panel"
              >
                <ShieldCheck className="w-4 h-4 text-rose-500 group-hover:text-white" />
                <span>Admin</span>
              </button>
            )}

            <button
              onClick={onToggleTheme}
              className={`p-2 rounded-full transition-all cursor-pointer ${
                isDark ? 'bg-rose-950/60 text-amber-300 hover:bg-rose-900/60' : 'bg-rose-100/70 text-rose-700 hover:bg-rose-200/70'
              }`}
              title="Toggle Light/Dark Theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <a
              href="#contact"
              onClick={(e) => handleSmoothScroll(e, 'contact')}
              className="px-5 py-2 sm:py-2.5 rounded-full bg-rose-500 hover:bg-rose-600 active:scale-95 text-white font-bold text-xs sm:text-sm shadow-md shadow-rose-500/20 transition-all cursor-pointer"
            >
              Let's Talk
            </a>
          </div>

        </div>
      </header>


      {/* =========================================================================
          2. HERO SECTION (Spacious Profile Layout: Left Large Round Photo, Right Details)
      ========================================================================= */}
      <section id="home" className="relative py-10 sm:py-16 lg:py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Large Prominent Circular Avatar Photo */}
          <div className="md:col-span-5 flex justify-center md:justify-start relative z-10">
            <input
              ref={heroImageInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleHeroImageFileChange}
            />

            <div className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-80 lg:h-80 shrink-0 group">
              
              {/* Soft Floral Background Ring Glow */}
              <div className={`absolute -inset-4 rounded-full bg-gradient-to-tr from-rose-300 via-pink-400 to-rose-500 opacity-60 blur-xl transition-all duration-300 ${
                flowerAnimState !== 'idle' ? 'scale-125 opacity-100 blur-2xl' : 'animate-pulse'
              }`} />
              
              {/* Circular Main Frame (Clickable for Magical Converge Animation) */}
              <div
                ref={heroAvatarRef}
                onClick={handleHeroAvatarClick}
                className={`relative w-full h-full rounded-full border-4 sm:border-8 border-white dark:border-rose-950/80 shadow-2xl overflow-hidden cursor-pointer bg-rose-100/50 dark:bg-rose-950/40 transition-all duration-300 active:scale-95 ${
                  flowerAnimState === 'shattering' ? 'scale-110 ring-8 ring-rose-400 shadow-[0_0_50px_rgba(244,114,182,0.8)]' : 'hover:scale-[1.03]'
                }`}
                title="Tap image for flower convergence & image reveal!"
              >
                {/* SKELETON SHIMMER LOADING / NO IMAGE STATE */}
                {(!currentDisplayImage || isImageError) ? (
                  <div className="w-full h-full rounded-full skeleton-shimmer flex flex-col items-center justify-center p-6 text-center relative group">
                    <div className="p-3 rounded-full bg-rose-500/20 text-rose-500 mb-2 animate-bounce">
                      <Flower2 className="w-8 h-8" />
                    </div>
                    <span className="text-xs font-bold text-rose-500 dark:text-rose-300">
                      Skeleton Loading
                    </span>
                    <span className="text-[10px] text-stone-600 dark:text-rose-200/70 mt-0.5">
                      No picture uploaded yet
                    </span>
                    <button
                      type="button"
                      onClick={handleUploadButtonClick}
                      className="mt-3 px-3.5 py-1.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Photo</span>
                    </button>
                  </div>
                ) : (
                  <div className="relative w-full h-full">
                    <img
                      src={currentDisplayImage}
                      alt={artistName}
                      onError={() => setIsImageError(true)}
                      className={`w-full h-full object-cover transition-all duration-500 ${
                        flowerAnimState === 'shattering' ? 'scale-110 brightness-150 blur-xs' : 'scale-100 brightness-100'
                      }`}
                    />
                    
                    {/* Overlay Hover Prompt for Tap Animation */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center text-white backdrop-blur-[2px]">
                      <Sparkles className="w-7 h-7 text-rose-300 animate-spin" />
                      <span className="text-xs font-bold mt-1 drop-shadow-md">
                        Tap for Flower Magic!
                      </span>
                      <span className="text-[10px] text-rose-200 opacity-90 mt-0.5">
                        {showSecondaryImage ? '(Showing 2nd Image)' : '(Showing 1st Image)'}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Direct "Change / Upload Photo" Button Badge (Bottom Right) */}
              <div className="absolute bottom-2 right-2 flex items-center gap-2 z-20">
                <button
                  type="button"
                  onClick={handleUploadButtonClick}
                  className="bg-rose-500 hover:bg-rose-600 text-white p-2.5 sm:p-3 rounded-full shadow-xl border-2 border-white dark:border-rose-900 transition-all hover:scale-110 active:scale-95 cursor-pointer flex items-center gap-1.5 group/btn"
                  title="Upload & Change Picture"
                >
                  <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover/btn:max-w-xs transition-all duration-300 text-xs font-bold pl-0.5">
                    {isAdmin ? 'Change Photo (Admin)' : 'Change Photo'}
                  </span>
                </button>

                {/* Paintbrush Palette Badge */}
                <div className="bg-white/90 dark:bg-rose-900/90 backdrop-blur-md p-2.5 sm:p-3 rounded-full shadow-xl border border-rose-200 dark:border-rose-800">
                  <Palette className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500" />
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Artist Name, Title, Status, Bio & Actions */}
          <div className="md:col-span-7 space-y-4 sm:space-y-5 text-center md:text-left">
            
            {/* Status Badge & Hi */}
            <div className="flex items-center justify-center md:justify-start gap-3 flex-wrap">
              <span className={`text-sm sm:text-base font-semibold uppercase tracking-wider ${
                isDark ? 'text-rose-300' : 'text-stone-500'
              }`}>
                Hi, I'm
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>Open for Work</span>
              </span>
            </div>

            {/* Main Name */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black text-rose-500 tracking-tight leading-tight">
              {artistName} <span className="inline-block text-rose-400 font-normal">♡</span>
            </h1>

            {/* Role Title */}
            <h2 className={`text-base sm:text-xl lg:text-2xl font-bold tracking-tight ${
              isDark ? 'text-rose-100' : 'text-stone-800'
            }`}>
              {artistRole}
            </h2>

            {/* Biography */}
            <p className={`text-xs sm:text-sm lg:text-base leading-relaxed max-w-xl mx-auto md:mx-0 ${
              isDark ? 'text-rose-200/90' : 'text-stone-600'
            }`}>
              {artistBio}
            </p>

            {/* CTAs & Socials Row */}
            <div className="pt-2 space-y-4">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <a
                  href="#gallery"
                  onClick={(e) => handleSmoothScroll(e, 'gallery')}
                  className="px-6 py-3 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs sm:text-sm shadow-lg shadow-rose-500/25 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  View My Work
                </a>
                <a
                  href="#about"
                  onClick={(e) => handleSmoothScroll(e, 'about')}
                  className={`px-6 py-3 rounded-full border font-bold text-xs sm:text-sm transition-all hover:scale-105 active:scale-95 cursor-pointer ${
                    isDark
                      ? 'border-rose-800 text-rose-200 hover:bg-rose-950/40'
                      : 'border-rose-200 text-stone-700 hover:bg-rose-100/50'
                  }`}
                >
                  About Me
                </a>
              </div>

              {/* Social Media Icons */}
              <div className="flex items-center justify-center md:justify-start gap-3 pt-1">
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2.5 rounded-full bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white transition-all">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="https://behance.net" target="_blank" rel="noreferrer" className="p-2.5 rounded-full bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white transition-all">
                  <Palette className="w-4 h-4" />
                </a>
                <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="p-2.5 rounded-full bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white transition-all">
                  <Heart className="w-4 h-4" />
                </a>
                <a href="mailto:ananyadas.art@gmail.com" className="p-2.5 rounded-full bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white transition-all">
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* =========================================================================
          3. ABOUT ME SECTION
      ========================================================================= */}
      <section id="about" className={`py-16 sm:py-20 border-t ${
        isDark ? 'border-rose-950/60 bg-[#0f0b11]' : 'border-rose-100 bg-white/60'
      }`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-rose-500">
              <Flower2 className="w-3.5 h-3.5 text-rose-400" />
              <span>ABOUT ME</span>
              <Flower2 className="w-3.5 h-3.5 text-rose-400" />
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Bio & Badges */}
            <div className="lg:col-span-7 space-y-6">
              <p className={`text-sm sm:text-base leading-relaxed ${
                isDark ? 'text-rose-200/90' : 'text-stone-700'
              }`}>
                I'm a passionate digital artist specializing in 3D art, character design, illustration and concept art. I love blending creativity with technology to build visuals that connect and inspire.
              </p>

              {/* 2x2 Info Grid Badges */}
              <div className="grid grid-cols-2 gap-4">
                <div className={`p-4 rounded-2xl border ${
                  isDark ? 'bg-rose-950/20 border-rose-900/40' : 'bg-rose-50/50 border-rose-100'
                }`}>
                  <div className="flex items-center gap-2 text-rose-500 text-xs font-bold uppercase mb-1">
                    <User className="w-4 h-4" />
                    <span>Name</span>
                  </div>
                  <p className="text-sm font-bold">{artistName}</p>
                </div>

                <div className={`p-4 rounded-2xl border ${
                  isDark ? 'bg-rose-950/20 border-rose-900/40' : 'bg-rose-50/50 border-rose-100'
                }`}>
                  <div className="flex items-center gap-2 text-rose-500 text-xs font-bold uppercase mb-1">
                    <MapPin className="w-4 h-4" />
                    <span>Location</span>
                  </div>
                  <p className="text-sm font-bold">Kolkata, India</p>
                </div>

                <div className={`p-4 rounded-2xl border ${
                  isDark ? 'bg-rose-950/20 border-rose-900/40' : 'bg-rose-50/50 border-rose-100'
                }`}>
                  <div className="flex items-center gap-2 text-rose-500 text-xs font-bold uppercase mb-1">
                    <Briefcase className="w-4 h-4" />
                    <span>Experience</span>
                  </div>
                  <p className="text-sm font-bold">3+ Years</p>
                </div>

                <div className={`p-4 rounded-2xl border ${
                  isDark ? 'bg-rose-950/20 border-rose-900/40' : 'bg-rose-50/50 border-rose-100'
                }`}>
                  <div className="flex items-center gap-2 text-rose-500 text-xs font-bold uppercase mb-1">
                    <Calendar className="w-4 h-4" />
                    <span>Availability</span>
                  </div>
                  <p className="text-sm font-bold">Freelance</p>
                </div>
              </div>

              {/* Download CV Button */}
              <div>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-rose-500/20 transition-all hover:scale-105"
                >
                  <Download className="w-4 h-4" />
                  <span>Download CV</span>
                </a>
              </div>
            </div>

            {/* Right Pencil Sketch Artwork illustration */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative max-w-sm rounded-3xl overflow-hidden shadow-xl border border-rose-100/50">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop"
                  alt="Artist Concept Drawing"
                  className="w-full h-auto object-cover grayscale opacity-90 hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* =========================================================================
          4. WHAT I DO (SERVICES) SECTION
      ========================================================================= */}
      <section id="services" className="py-16 sm:py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-rose-500">
            <Flower2 className="w-3.5 h-3.5 text-rose-400" />
            <span>WHAT I DO</span>
            <Flower2 className="w-3.5 h-3.5 text-rose-400" />
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className={`p-6 rounded-3xl border transition-all hover:-translate-y-1 ${
            isDark ? 'bg-rose-950/20 border-rose-900/40' : 'bg-white border-rose-100 shadow-sm'
          }`}>
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-500 mb-4">
              <Box className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold mb-1">3D Art</h3>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-rose-200/70' : 'text-stone-500'}`}>
              High quality 3D models & environments
            </p>
          </div>

          <div className={`p-6 rounded-3xl border transition-all hover:-translate-y-1 ${
            isDark ? 'bg-rose-950/20 border-rose-900/40' : 'bg-white border-rose-100 shadow-sm'
          }`}>
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-500 mb-4">
              <Palette className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold mb-1">Digital Painting</h3>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-rose-200/70' : 'text-stone-500'}`}>
              Illustrations, portraits and concept art
            </p>
          </div>

          <div className={`p-6 rounded-3xl border transition-all hover:-translate-y-1 ${
            isDark ? 'bg-rose-950/20 border-rose-900/40' : 'bg-white border-rose-100 shadow-sm'
          }`}>
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-500 mb-4">
              <User className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold mb-1">Character Design</h3>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-rose-200/70' : 'text-stone-500'}`}>
              Unique characters with personality
            </p>
          </div>

          <div className={`p-6 rounded-3xl border transition-all hover:-translate-y-1 ${
            isDark ? 'bg-rose-950/20 border-rose-900/40' : 'bg-white border-rose-100 shadow-sm'
          }`}>
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-500 mb-4">
              <Layout className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold mb-1">UI / Visual Design</h3>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-rose-200/70' : 'text-stone-500'}`}>
              Clean, aesthetic & user friendly design
            </p>
          </div>

        </div>
      </section>


      {/* =========================================================================
          5. FEATURED WORK (HOMEPAGE GALLERY: 2 PER ROW, EXACTLY 4 ITEMS)
      ========================================================================= */}
      <section id="gallery" className={`py-16 sm:py-20 border-t ${
        isDark ? 'border-rose-950/60 bg-[#0f0b11]' : 'border-rose-100 bg-white/60'
      }`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-8">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-rose-500">
              <Flower2 className="w-3.5 h-3.5 text-rose-400" />
              <span>FEATURED WORK</span>
              <Flower2 className="w-3.5 h-3.5 text-rose-400" />
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-black mt-1">Selective Digital Creations</h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
            {(['All', '3D Art', 'Illustration', 'Concept Art', 'Fan Art'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeTab === tab
                    ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20 scale-105'
                    : isDark
                    ? 'bg-rose-950/40 text-rose-300 hover:bg-rose-900/40'
                    : 'bg-rose-100/60 text-stone-700 hover:bg-rose-200/60'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* 4 Artwork Grid (Strictly 2 per row on all screen sizes) */}
          <div className="grid grid-cols-2 gap-3 sm:gap-6">
            {homepageFeaturedArtworks.map((art) => {
              const fullIndex = filteredArtworks.findIndex(a => a.id === art.id);
              return (
                <div
                  key={art.id}
                  onClick={() => setSelectedArtworkIndex(fullIndex)}
                  className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden border transition-all duration-300 hover:-translate-y-2 cursor-pointer shadow-lg ${
                    isDark ? 'bg-rose-950/20 border-rose-900/40' : 'bg-white border-rose-100'
                  }`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-rose-950">
                    <img
                      src={art.image}
                      alt={art.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-85 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2.5 sm:p-5">
                      <span className="text-[9px] sm:text-[10px] font-bold text-rose-300 uppercase tracking-wider mb-0.5">{art.categoryLabel}</span>
                      <h3 className="text-xs sm:text-lg font-bold text-white font-serif line-clamp-1">{art.title}</h3>
                      <p className="text-[10px] sm:text-xs text-stone-300 line-clamp-1 mt-0.5 hidden sm:block">{art.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom "See More" Button to open animated full gallery page */}
          <div className="text-center mt-12">
            <button
              onClick={() => {
                setShowFullGalleryView(true);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold text-sm shadow-xl shadow-rose-500/25 transition-all hover:scale-105 active:scale-95 flex items-center gap-2.5 mx-auto cursor-pointer"
            >
              <span>Explore Full Gallery</span>
              <span className="text-lg">➔</span>
            </button>
          </div>

        </div>
      </section>


      {/* =========================================================================
          ANIMATED FULL GALLERY PAGE / VIEW (Opens when user clicks "See More")
      ========================================================================= */}
      {showFullGalleryView && (
        <div className={`fixed inset-0 z-50 overflow-y-auto animate-in slide-in-from-bottom duration-300 ${
          isDark ? 'bg-[#120e14] text-rose-50' : 'bg-[#fdf8f9] text-stone-800'
        }`}>
          {/* Top Bar Navigation */}
          <div className={`sticky top-0 z-40 backdrop-blur-md border-b px-4 sm:px-8 py-4 flex items-center justify-between ${
            isDark ? 'bg-[#120e14]/90 border-rose-950/60' : 'bg-white/90 border-rose-100'
          }`}>
            <button
              onClick={() => setShowFullGalleryView(false)}
              className="px-4 py-2 rounded-full bg-rose-500/10 hover:bg-rose-500 hover:text-white text-rose-500 font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to Homepage</span>
            </button>

            <h2 className="text-lg sm:text-xl font-bold font-serif text-rose-500 hidden sm:block">
              Digital Art Gallery & Showcase
            </h2>

            <button
              onClick={() => setShowFullGalleryView(false)}
              className="p-2 rounded-full bg-stone-500/10 hover:bg-rose-500 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="text-center mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-rose-500">
                — COMPLETE COLLECTION —
              </span>
              <h1 className="text-3xl sm:text-4xl font-serif font-black mt-1">All Digital Artworks</h1>
              <p className={`text-xs sm:text-sm mt-2 max-w-lg mx-auto ${isDark ? 'text-rose-200/70' : 'text-stone-500'}`}>
                Click on any artwork to view full screen image, technical specifications, and artwork backstory.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
              {(['All', '3D Art', 'Illustration', 'Concept Art', 'Fan Art'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    activeTab === tab
                      ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20 scale-105'
                      : isDark
                      ? 'bg-rose-950/40 text-rose-300 hover:bg-rose-900/40'
                      : 'bg-rose-100/60 text-stone-700 hover:bg-rose-200/60'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Full Grid of Artworks (2 per row on mobile) */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
              {filteredArtworks.map((art, idx) => (
                <div
                  key={art.id}
                  onClick={() => setSelectedArtworkIndex(idx)}
                  className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden border transition-all duration-300 hover:-translate-y-2 cursor-pointer shadow-lg ${
                    isDark ? 'bg-rose-950/20 border-rose-900/40' : 'bg-white border-rose-100'
                  }`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-rose-950">
                    <img
                      src={art.image}
                      alt={art.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-85 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2.5 sm:p-5">
                      <span className="text-[9px] sm:text-[10px] font-bold text-rose-300 uppercase tracking-wider mb-0.5">{art.categoryLabel}</span>
                      <h3 className="text-xs sm:text-lg font-bold text-white font-serif line-clamp-1">{art.title}</h3>
                      <p className="text-[10px] sm:text-xs text-stone-300 line-clamp-1 mt-0.5 hidden sm:block">{art.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}


      {/* =========================================================================
          6. ART PREVIEW MODAL LIGHTBOX WITH HISTORY & DETAILS
      ========================================================================= */}
      {currentModalArtwork && selectedArtworkIndex !== null && (
        <div 
          className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          onClick={() => setSelectedArtworkIndex(null)}
        >
          <div 
            className={`relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in duration-300 my-auto ${
              isDark ? 'bg-[#18121a] border-rose-900/60 text-white' : 'bg-white border-rose-100 text-stone-900'
            }`}
            onClick={e => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedArtworkIndex(null)}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-black/40 hover:bg-rose-500 text-white transition-all cursor-pointer z-30 shadow-md"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Main Full Image View with Prev / Next Navigation Arrows */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-black mb-6 border border-white/10 shadow-xl">
              <img
                src={currentModalArtwork.image}
                alt={currentModalArtwork.title}
                className="w-full h-full object-contain bg-black/90"
              />

              {/* Prev Arrow */}
              <button
                onClick={handlePrevArtwork}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-rose-500 text-white transition-all cursor-pointer shadow-lg"
                title="Previous artwork"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Next Arrow */}
              <button
                onClick={handleNextArtwork}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-rose-500 text-white transition-all cursor-pointer shadow-lg"
                title="Next artwork"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Title & Metadata */}
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <span className="text-xs font-bold text-rose-500 uppercase tracking-wider">{currentModalArtwork.categoryLabel}</span>
                  <h3 className="text-2xl sm:text-3xl font-bold font-serif mt-0.5">{currentModalArtwork.title}</h3>
                </div>
                <div className="text-right text-xs font-mono text-stone-400">
                  {selectedArtworkIndex + 1} / {filteredArtworks.length}
                </div>
              </div>

              {/* Short Description */}
              <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-rose-100/90' : 'text-stone-700'}`}>
                {currentModalArtwork.description}
              </p>

              {/* Artwork History / Story Box */}
              {currentModalArtwork.history && (
                <div className={`p-4 sm:p-5 rounded-2xl border ${
                  isDark 
                    ? 'bg-rose-950/30 border-rose-900/50 text-rose-100' 
                    : 'bg-rose-50/70 border-rose-200/70 text-stone-800'
                }`}>
                  <div className="flex items-center gap-2 text-rose-500 font-bold text-xs uppercase tracking-wider mb-2">
                    <Sparkles className="w-4 h-4" />
                    <span>Artwork History & Creative Concept</span>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                    {currentModalArtwork.history}
                  </p>
                </div>
              )}

              {/* Technical Metadata */}
              <div className="pt-3 border-t border-rose-500/20 grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-stone-400 block font-semibold mb-0.5">Software / Tools</span>
                  <span className="font-bold text-rose-400">{currentModalArtwork.software}</span>
                </div>
                <div>
                  <span className="text-stone-400 block font-semibold mb-0.5">Creation Year</span>
                  <span className="font-bold text-rose-400">{currentModalArtwork.year}</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}


      {/* =========================================================================
          7. EXPERIENCE SECTION
      ========================================================================= */}
      <section id="experience" className="py-16 sm:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-rose-500">
            <Flower2 className="w-3.5 h-3.5 text-rose-400" />
            <span>EXPERIENCE</span>
            <Flower2 className="w-3.5 h-3.5 text-rose-400" />
          </span>
          <h2 className="text-3xl font-serif font-black mt-1">Experience</h2>
        </div>

        <div className="space-y-6 relative before:absolute before:inset-0 before:left-4 sm:before:left-1/2 before:-ml-px before:w-0.5 before:bg-rose-200">
          
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-white bg-rose-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
              <div className="w-2 h-2 rounded-full bg-white" />
            </div>
            <div className={`w-[calc(100%-2.5rem)] md:w-[calc(50%-2rem)] p-6 rounded-3xl border shadow-sm ${
              isDark ? 'bg-rose-950/20 border-rose-900/40' : 'bg-white border-rose-100'
            }`}>
              <span className="text-xs font-bold text-rose-500">2024 - Present</span>
              <h3 className="text-base font-bold mt-1">Freelance Digital Artist</h3>
              <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-rose-200/70' : 'text-stone-600'}`}>
                Working with clients worldwide on 3D art and illustrations.
              </p>
            </div>
          </div>

          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-white bg-rose-400 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
              <div className="w-2 h-2 rounded-full bg-white" />
            </div>
            <div className={`w-[calc(100%-2.5rem)] md:w-[calc(50%-2rem)] p-6 rounded-3xl border shadow-sm ${
              isDark ? 'bg-rose-950/20 border-rose-900/40' : 'bg-white border-rose-100'
            }`}>
              <span className="text-xs font-bold text-rose-500">2022 - 2024</span>
              <h3 className="text-base font-bold mt-1">Junior Artist at Art Studio</h3>
              <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-rose-200/70' : 'text-stone-600'}`}>
                Worked on character design and concept art projects.
              </p>
            </div>
          </div>

          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-white bg-rose-300 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
              <div className="w-2 h-2 rounded-full bg-white" />
            </div>
            <div className={`w-[calc(100%-2.5rem)] md:w-[calc(50%-2rem)] p-6 rounded-3xl border shadow-sm ${
              isDark ? 'bg-rose-950/20 border-rose-900/40' : 'bg-white border-rose-100'
            }`}>
              <span className="text-xs font-bold text-rose-500">2021 - 2022</span>
              <h3 className="text-base font-bold mt-1">Intern at Creative House</h3>
              <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-rose-200/70' : 'text-stone-600'}`}>
                Assisted in various digital art and design projects.
              </p>
            </div>
          </div>

        </div>
      </section>


      {/* =========================================================================
          8. CONTACT PAGE / SECTION (GET IN TOUCH)
      ========================================================================= */}
      <section id="contact" className={`py-16 sm:py-20 border-t ${
        isDark ? 'border-rose-950/60 bg-[#0f0b11]' : 'border-rose-100 bg-white/60'
      }`}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-10 space-y-1">
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-rose-500 inline-flex items-center gap-2">
              <Flower2 className="w-5 h-5 text-rose-400" />
              <span>Get In Touch</span>
              <Flower2 className="w-5 h-5 text-rose-400" />
            </h2>
            <p className={`text-xs sm:text-sm ${isDark ? 'text-rose-200/70' : 'text-stone-600'}`}>
              Let's create something amazing together!
            </p>
          </div>

          {/* Contact Badges Row (Includes Phone Number List & WhatsApp) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8 text-center text-xs">
            <a
              href={`tel:${config.phone || '+919876543210'}`}
              className={`p-3 rounded-2xl border transition-all hover:scale-105 cursor-pointer ${
                isDark ? 'bg-rose-950/20 border-rose-900/40 hover:border-rose-500' : 'bg-white border-rose-100 hover:border-rose-400'
              }`}
            >
              <PhoneCall className="w-4 h-4 text-rose-500 mx-auto mb-1" />
              <span className="block text-[10px] text-stone-400">Phone Call</span>
              <span className="font-bold text-[11px] block">{config.phone || '+91 98765 43210'}</span>
            </a>

            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noreferrer"
              className={`p-3 rounded-2xl border transition-all hover:scale-105 cursor-pointer ${
                isDark ? 'bg-rose-950/20 border-rose-900/40 hover:border-rose-500' : 'bg-white border-rose-100 hover:border-rose-400'
              }`}
            >
              <Smartphone className="w-4 h-4 text-emerald-500 mx-auto mb-1" />
              <span className="block text-[10px] text-stone-400">WhatsApp</span>
              <span className="font-bold text-[11px] block">+91 98765 43210</span>
            </a>

            <a
              href={`mailto:${config.email || 'tamanna.artfolio@gmail.com'}`}
              className={`p-3 rounded-2xl border transition-all hover:scale-105 cursor-pointer ${
                isDark ? 'bg-rose-950/20 border-rose-900/40 hover:border-rose-500' : 'bg-white border-rose-100 hover:border-rose-400'
              }`}
            >
              <Mail className="w-4 h-4 text-rose-500 mx-auto mb-1" />
              <span className="block text-[10px] text-stone-400">Email</span>
              <span className="font-bold text-[11px] truncate block">{config.email || 'tamanna.artfolio@gmail.com'}</span>
            </a>

            <div className={`p-3 rounded-2xl border ${isDark ? 'bg-rose-950/20 border-rose-900/40' : 'bg-white border-rose-100'}`}>
              <MapPin className="w-4 h-4 text-rose-500 mx-auto mb-1" />
              <span className="block text-[10px] text-stone-400">Location</span>
              <span className="font-bold text-[11px] block">{config.location || 'Kolkata, India'}</span>
            </div>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className={`p-3 rounded-2xl border transition-all hover:scale-105 cursor-pointer ${
                isDark ? 'bg-rose-950/20 border-rose-900/40 hover:border-rose-500' : 'bg-white border-rose-100 hover:border-rose-400'
              }`}
            >
              <Instagram className="w-4 h-4 text-rose-500 mx-auto mb-1" />
              <span className="block text-[10px] text-stone-400">Instagram</span>
              <span className="font-bold text-[11px] block">@tamanna_artfolio</span>
            </a>
          </div>

          {/* Contact Form Box */}
          <div className={`p-6 sm:p-8 rounded-3xl border shadow-lg ${
            isDark ? 'bg-[#18121a] border-rose-900/60' : 'bg-white border-rose-100'
          }`}>
            {formSuccess ? (
              <div className="text-center py-8 space-y-4 animate-in fade-in zoom-in duration-300">
                <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mx-auto text-rose-500 animate-bounce">
                  <CheckCircle2 className="w-8 h-8 text-rose-500" />
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-serif font-black text-rose-500">
                  Thank You For Hiring Me! ♡
                </h3>
                
                <div className={`p-4 rounded-2xl border max-w-lg mx-auto ${
                  isDark ? 'bg-rose-950/30 border-rose-900/50 text-rose-100' : 'bg-rose-50 border-rose-200 text-stone-800'
                }`}>
                  <p className="text-sm font-semibold leading-relaxed">
                    Thank you for reaching out! I will contact you within 24 to 48 hours.
                  </p>
                </div>

                <button
                  onClick={() => setFormSuccess(false)}
                  className="px-8 py-3 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-rose-500/20 transition-all cursor-pointer hover:scale-105"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    value={contactForm.name}
                    onChange={e => setContactForm({ ...contactForm, name: e.target.value })}
                    placeholder="Name"
                    className={`w-full px-4 py-3 rounded-2xl border text-xs outline-none transition-all ${
                      isDark ? 'bg-rose-950/20 border-rose-900/60 focus:border-rose-500 text-white' : 'bg-rose-50/30 border-rose-100 focus:border-rose-400 text-stone-800'
                    }`}
                  />
                </div>

                <div>
                  <input
                    type="email"
                    value={contactForm.email}
                    onChange={e => setContactForm({ ...contactForm, email: e.target.value })}
                    placeholder="Email Address"
                    className={`w-full px-4 py-3 rounded-2xl border text-xs outline-none transition-all ${
                      isDark ? 'bg-rose-950/20 border-rose-900/60 focus:border-rose-500 text-white' : 'bg-rose-50/30 border-rose-100 focus:border-rose-400 text-stone-800'
                    }`}
                  />
                </div>

                {/* Country Code & Phone Number Field */}
                <div className="flex items-center gap-2 w-full min-w-0 max-w-full">
                  <select
                    value={contactForm.countryCode}
                    onChange={e => setContactForm({ ...contactForm, countryCode: e.target.value })}
                    className={`w-[100px] sm:w-[130px] shrink-0 px-2 sm:px-3 py-3 rounded-2xl border text-xs outline-none cursor-pointer transition-all truncate ${
                      isDark ? 'bg-[#1e1722] border-rose-900/60 focus:border-rose-500 text-white' : 'bg-rose-50/50 border-rose-100 focus:border-rose-400 text-stone-800'
                    }`}
                  >
                    {COUNTRY_CODES.map(c => (
                      <option key={c.code + c.country} value={c.code} className={isDark ? 'bg-[#18121a] text-white' : 'bg-white text-stone-900'}>
                        {c.code} ({c.country})
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    value={contactForm.phone}
                    onChange={e => setContactForm({ ...contactForm, phone: e.target.value })}
                    placeholder="Phone Number (e.g. 9876543210)"
                    className={`flex-1 min-w-0 w-full px-3 sm:px-4 py-3 rounded-2xl border text-xs outline-none transition-all truncate ${
                      isDark ? 'bg-rose-950/20 border-rose-900/60 focus:border-rose-500 text-white' : 'bg-rose-50/30 border-rose-100 focus:border-rose-400 text-stone-800'
                    }`}
                  />
                </div>

                <div>
                  <textarea
                    rows={4}
                    value={contactForm.message}
                    onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="Message ♡"
                    className={`w-full px-4 py-3 rounded-2xl border text-xs outline-none transition-all ${
                      isDark ? 'bg-rose-950/20 border-rose-900/60 focus:border-rose-500 text-white' : 'bg-rose-50/30 border-rose-100 focus:border-rose-400 text-stone-800'
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-rose-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Send Message</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

        </div>
      </section>


      {/* =========================================================================
          9. KEY FEATURES FOOTER HIGHLIGHTS BAR
      ========================================================================= */}
      <section className={`py-10 border-t ${
        isDark ? 'border-rose-950/60 bg-[#0c090e]' : 'border-rose-100 bg-rose-50/50'
      }`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-6">
            <span className="text-[10px] font-bold uppercase tracking-widest text-rose-500">
              — KEY FEATURES —
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
            
            <div className="p-3">
              <Smartphone className="w-5 h-5 text-rose-500 mx-auto mb-1" />
              <p className="text-xs font-bold">Responsive Design</p>
              <p className="text-[10px] text-stone-400 mt-0.5">Mobile & Desktop Friendly</p>
            </div>

            <div className="p-3">
              <Sun className="w-5 h-5 text-rose-500 mx-auto mb-1" />
              <p className="text-xs font-bold">Light / Dark Mode</p>
              <p className="text-[10px] text-stone-400 mt-0.5">Comfortable viewing</p>
            </div>

            <div className="p-3">
              <Sparkles className="w-5 h-5 text-rose-500 mx-auto mb-1" />
              <p className="text-xs font-bold">Smooth Animations</p>
              <p className="text-[10px] text-stone-400 mt-0.5">Engaging interactions</p>
            </div>

            <div className="p-3">
              <Layout className="w-5 h-5 text-rose-500 mx-auto mb-1" />
              <p className="text-xs font-bold">Easy Navigation</p>
              <p className="text-[10px] text-stone-400 mt-0.5">Clean layout</p>
            </div>

            <div className="p-3">
              <Eye className="w-5 h-5 text-rose-500 mx-auto mb-1" />
              <p className="text-xs font-bold">Image Preview</p>
              <p className="text-[10px] text-stone-400 mt-0.5">Click to view in full size</p>
            </div>

            <div className="p-3">
              <Send className="w-5 h-5 text-rose-500 mx-auto mb-1" />
              <p className="text-xs font-bold">Contact Form</p>
              <p className="text-[10px] text-stone-400 mt-0.5">Direct way to get in touch</p>
            </div>

          </div>

        </div>
      </section>


      {/* =========================================================================
          10. FOOTER
      ========================================================================= */}
      <footer className={`py-6 border-t text-center text-xs ${
        isDark ? 'border-rose-950/60 text-stone-500 bg-[#09070b]' : 'border-rose-100 text-stone-500 bg-white'
      }`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-bold text-rose-500 font-serif">Artfolio • {artistName}</p>
          <p>© {new Date().getFullYear()} All rights reserved.</p>
        </div>
      </footer>

      {/* Admin Authorization Required Modal */}
      {adminPromptModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative space-y-4">
            <div className="flex items-center gap-3 text-amber-400">
              <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                <ShieldCheck className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">অ্যাডমিন পারমিশন প্রয়োজন (Admin Required)</h3>
                <p className="text-xs text-amber-300/80">Only Portfolio Admin can change photos</p>
              </div>
            </div>

            <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 text-xs text-slate-300 leading-relaxed space-y-2">
              <p className="font-semibold text-rose-300">
                🔒 পোর্টিফোলিও ছবি পরিবর্তনের পারমিশন:
              </p>
              <p>
                সাধারণ ইউজার বা ভিজিটর সরাসরি পোর্টিফোলিও ওনারের ছবি পরিবর্তন করতে পারবেন না। পোর্টিফোলিও ফটো পরিবর্তন বা ক্রপ করার জন্য দয়া করে <strong>অ্যাডমিন সিএমএস (Admin CMS)</strong> প্যানেলে লগইন করুন।
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setAdminPromptModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-all cursor-pointer"
              >
                বন্ধ করুন (Close)
              </button>
              <button
                type="button"
                onClick={() => {
                  setAdminPromptModalOpen(false);
                  onOpenAdminCMS();
                }}
                className="px-5 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs shadow-md shadow-rose-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>অ্যাডমিন লগইন (Admin Login)</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
