import { Project, Service, Skill, EducationItem, QuickStat, ProfileInfo, Language } from '../types';

export const PROFILE_DATA: ProfileInfo = {
  name: 'Tamanna Artfolio',
  education: 'Fine Arts & Digital Design',
  year: 'Professional Artist',
  qualifications: [
    'Digital Character Design Certification',
    '3D Environment Design',
    'Fine Arts Diploma'
  ],
  profession: ['Digital Artist', '3D Creator', 'Anime Character Designer'],
  location: 'Kolkata, West Bengal, India',
  email: 'tamanna.artfolio@gmail.com',
  phone: '+91 98765 43210',
  github: 'https://github.com',
  linkedin: 'https://linkedin.com',
  twitter: 'https://x.com',
  instagram: 'https://instagram.com'
};

export const QUICK_STATS: QuickStat[] = [
  {
    id: 'stat-1',
    title: 'College Student',
    value: '1st Year',
    label: 'B.A English Honours',
    icon: 'GraduationCap',
    gradient: 'from-blue-500 to-cyan-400'
  },
  {
    id: 'stat-2',
    title: 'Computer Diploma',
    value: '100%',
    label: 'Completed with Excellence',
    icon: 'Award',
    gradient: 'from-purple-500 to-indigo-400'
  },
  {
    id: 'stat-3',
    title: 'AI Developer',
    value: '25+',
    label: 'AI Workflows & Integrations',
    icon: 'Bot',
    gradient: 'from-cyan-400 to-teal-400'
  },
  {
    id: 'stat-4',
    title: 'Freelancer',
    value: '30+',
    label: 'Projects Delivered Worldwide',
    icon: 'Briefcase',
    gradient: 'from-fuchsia-500 to-purple-500'
  }
];

export const SKILLS_LIST: Skill[] = [
  {
    id: 'sk-1',
    name: 'Android APK Development',
    category: 'Mobile',
    progress: 92,
    icon: 'Smartphone',
    color: '#3DDC84',
    description: 'Custom Android APKs, modern UI, native performance & smooth animations.'
  },
  {
    id: 'sk-2',
    name: 'Website Development',
    category: 'Web',
    progress: 95,
    icon: 'Globe',
    color: '#3B82F6',
    description: 'High-speed, responsive, SEO-friendly web applications.'
  },
  {
    id: 'sk-3',
    name: 'AI Integration',
    category: 'AI & Tools',
    progress: 90,
    icon: 'Sparkles',
    color: '#A855F7',
    description: 'Gemini API, OpenAI ChatGPT, AI bots, content automation & agents.'
  },
  {
    id: 'sk-4',
    name: 'Frontend Development',
    category: 'Web',
    progress: 94,
    icon: 'Layout',
    color: '#06B6D4',
    description: 'React 19, TypeScript, Tailwind CSS & Motion animations.'
  },
  {
    id: 'sk-5',
    name: 'Responsive Design',
    category: 'Core',
    progress: 98,
    icon: 'MonitorSmartphone',
    color: '#F59E0B',
    description: 'Pixel-perfect UI across mobile, tablet, desktop, and ultra-wide screens.'
  },
  {
    id: 'sk-6',
    name: 'Firebase',
    category: 'Mobile',
    progress: 88,
    icon: 'Flame',
    color: '#FFCA28',
    description: 'Firestore, Authentication, Cloud Functions & Realtime DB.'
  },
  {
    id: 'sk-7',
    name: 'React & Vite',
    category: 'Web',
    progress: 92,
    icon: 'Code2',
    color: '#61DAFB',
    description: 'Modern component architectures, hooks, state management & Vite.'
  },
  {
    id: 'sk-8',
    name: 'JavaScript & TypeScript',
    category: 'Core',
    progress: 90,
    icon: 'FileCode',
    color: '#F7DF1E',
    description: 'Clean ES6+ JavaScript, strict typing, interfaces and asynchronous logic.'
  },
  {
    id: 'sk-9',
    name: 'Python',
    category: 'Core',
    progress: 85,
    icon: 'Terminal',
    color: '#3776AB',
    description: 'Automation scripts, backend APIs, data handling & AI tools.'
  },
  {
    id: 'sk-10',
    name: 'GitHub & Version Control',
    category: 'AI & Tools',
    progress: 92,
    icon: 'GitBranch',
    color: '#E2E8F0',
    description: 'Git workflows, branches, open-source repositories & CI/CD.'
  },
  {
    id: 'sk-11',
    name: 'Figma UI/UX',
    category: 'AI & Tools',
    progress: 86,
    icon: 'Figma',
    color: '#F24E1E',
    description: 'Prototyping, wireframes, design systems & glassmorphic layouts.'
  },
  {
    id: 'sk-12',
    name: 'Cursor AI & Dev Tools',
    category: 'AI & Tools',
    progress: 96,
    icon: 'Cpu',
    color: '#EC4899',
    description: 'Supercharged AI coding workflows, prompt engineering & rapid building.'
  }
];

export const SERVICES_LIST: Service[] = [
  {
    id: 'srv-1',
    icon: 'Smartphone',
    title: 'Android APK Development',
    shortDescription: 'Custom, high-performance Android apps built with modern UI, smooth physics, and offline capabilities.',
    fullDescription: 'Complete Android APK development from scratch or converting web tools into native APK packages. Optimized for battery life, speed, and sleek mobile interfaces.',
    deliverables: ['APK & Bundle File', 'Clean Source Code', 'Firebase Integration', 'Offline Capabilities'],
    gradient: 'from-emerald-500/20 to-teal-500/10'
  },
  {
    id: 'srv-2',
    icon: 'Globe',
    title: 'Responsive Website Development',
    shortDescription: 'Blazing fast, mobile-friendly websites that look breathtaking on every screen size.',
    fullDescription: 'Custom web apps built with React, Vite, and Tailwind CSS. Supercharged for 100 FPS performance, accessibility, and modern aesthetic visual hierarchy.',
    deliverables: ['Custom Web App', 'Responsive Mobile Design', 'SEO Optimization', 'Deployment Setup'],
    gradient: 'from-blue-500/20 to-cyan-500/10',
    popular: true
  },
  {
    id: 'srv-3',
    icon: 'Bot',
    title: 'AI Automation & Agents',
    shortDescription: 'Smart AI integrations, Gemini API chatbots, content generators, and custom automated workflows.',
    fullDescription: 'Integrate state-of-the-art AI into your existing app or business. From custom knowledge-base chatbots to automated document summarizers and smart workflows.',
    deliverables: ['Gemini / GPT Integration', 'Custom Prompt Workflows', 'API Proxies', 'Automated Bot System'],
    gradient: 'from-purple-500/20 to-fuchsia-500/10',
    popular: true
  },
  {
    id: 'srv-4',
    icon: 'Layers',
    title: 'Landing Page Design',
    shortDescription: 'High-converting, ultra-modern landing pages designed to captivate visitors and drive action.',
    fullDescription: 'Strategic single-page websites with glowing glassmorphic elements, compelling typography, interactive CTA sections, and lightning-fast load times.',
    deliverables: ['Single Page UI', 'Smooth Scroll Animations', 'Contact Form Handling', 'Analytics Integration'],
    gradient: 'from-cyan-500/20 to-blue-500/10'
  },
  {
    id: 'srv-5',
    icon: 'Sparkles',
    title: 'Portfolio Websites',
    shortDescription: 'Award-winning personal showcase sites for developers, creators, freelancers, and students.',
    fullDescription: 'Express your true identity with futuristic designs, animated 3D cards, project showcases, resume viewers, and custom interactive themes.',
    deliverables: ['Interactive Showcase', 'Downloadable Resume Handler', 'Theme Customizer', 'Contact Gateway'],
    gradient: 'from-violet-500/20 to-purple-500/10'
  },
  {
    id: 'srv-6',
    icon: 'Building2',
    title: 'Business Websites',
    shortDescription: 'Professional, trustworthy web presence tailored for local businesses, agencies, and startups.',
    fullDescription: 'Full-featured web solutions with services showcases, customer testimonials, appointment booking widgets, and Google Maps integration.',
    deliverables: ['Multi-page / Section Site', 'Lead Generation Forms', 'Google Business Sync', 'Admin Control Panel'],
    gradient: 'from-amber-500/20 to-orange-500/10'
  },
  {
    id: 'srv-7',
    icon: 'Palette',
    title: 'UI/UX Design',
    shortDescription: 'Futuristic glassmorphic and neumorphic interface designs with Apple-level detail.',
    fullDescription: 'Crafting intuitive user experiences, wireframes, color palettes, micro-interactions, and component libraries that users love.',
    deliverables: ['Figma Design Tokens', 'Interactive Prototype', 'Design System', 'Asset Exports'],
    gradient: 'from-pink-500/20 to-rose-500/10'
  },
  {
    id: 'srv-8',
    icon: 'Zap',
    title: 'Website Optimization',
    shortDescription: 'Speed up slow websites, fix responsive issues, boost Google Lighthouse scores, and refine code.',
    fullDescription: 'In-depth performance audit, code refactoring, image compression, CSS/JS minimization, and SEO structure enhancements.',
    deliverables: ['Audit Report', 'Refactored Codebase', 'Speed Score > 95', 'Mobile Responsiveness Fixes'],
    gradient: 'from-indigo-500/20 to-blue-500/10'
  }
];

export const EDUCATION_TIMELINE: EducationItem[] = [
  {
    id: 'edu-1',
    degree: 'Secondary Education (Madhyamik)',
    field: 'General Science, Mathematics & Languages',
    institution: 'West Bengal Board of Secondary Education',
    status: 'Completed',
    year: 'Successfully Passed',
    description: 'Built a strong foundation in science, mathematics, computer basics, and problem-solving skills.',
    highlights: ['First Class Marks', 'Active Participation in Tech Fairs', 'Computer Science Enthusiast'],
    icon: 'BookOpen'
  },
  {
    id: 'edu-2',
    degree: 'Higher Secondary (HS)',
    field: 'Arts & Languages Focus',
    institution: 'West Bengal Council of Higher Secondary Education',
    status: 'Completed',
    year: 'Successfully Passed',
    description: 'Mastered analytical writing, communication skills, and developed a keen interest in literature and modern technology.',
    highlights: ['High Proficiency in English', 'Extracurricular Tech Projects', 'Secondary Tech Training'],
    icon: 'GraduationCap'
  },
  {
    id: 'edu-3',
    degree: 'Computer Diploma',
    field: 'Software Applications, Programming Basics & Web Fundamentals',
    institution: 'Recognized Computer Institute',
    status: 'Completed',
    year: 'Diploma Awarded',
    description: 'Comprehensive practical training in computer applications, database concepts, basic programming, and digital tools.',
    highlights: ['Hardware & Software Fundamentals', 'Database Operations', 'Web Technologies Basics'],
    icon: 'Award'
  },
  {
    id: 'edu-4',
    degree: 'B.A. English Honours',
    field: 'English Literature, Linguistics & Communication',
    institution: 'State University',
    status: 'Currently Studying',
    year: '1st Year (Current)',
    description: 'Combining analytical literary thinking with modern AI engineering to build articulate, user-centered digital solutions.',
    highlights: ['1st Year Student', 'Focus on Critical Analysis', 'Combining Humanities & AI Tech'],
    icon: 'BookMarked'
  }
];

export const PROJECTS_LIST: Project[] = [
  {
    id: 'proj-1',
    name: 'AI Analytics & Data Dashboard',
    category: 'Web Apps',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    shortDescription: 'Futuristic dark-mode analytics platform with real-time AI insights, charts, and automated reporting.',
    description: 'An advanced web-based analytics dashboard featuring dark theme aesthetic, real-time data visualizer using Recharts, Gemini AI text summaries, and CSV/PDF export capability.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Gemini AI', 'Recharts'],
    liveUrl: '#',
    githubUrl: 'https://github.com/dwiphalder',
    featured: true,
    metrics: [
      { label: 'Performance Score', value: '99/100' },
      { label: 'Real-time Delay', value: '< 50ms' }
    ]
  },
  {
    id: 'proj-2',
    name: 'Modern E-Commerce Store',
    category: 'Web Apps',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    shortDescription: 'Sleek e-commerce frontend with instant cart, dynamic filtering, glassmorphic cards & order tracking.',
    description: 'Full-featured online store interface built with React 19, custom animations, shopping cart context, dark mode aesthetic, and responsive product catalog.',
    tags: ['React', 'Tailwind CSS', 'Motion', 'Context API'],
    liveUrl: '#',
    githubUrl: 'https://github.com/dwiphalder',
    featured: true,
    metrics: [
      { label: 'Load Speed', value: '0.4s' },
      { label: 'UX Rating', value: '4.9/5' }
    ]
  },
  {
    id: 'proj-3',
    name: 'Smart Task & Notes Android APK',
    category: 'Android APK',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1200&auto=format&fit=crop',
    shortDescription: 'Android APK application for productivity, featuring local offline storage, AI smart grouping, and clean UI.',
    description: 'Native-feel Android application built with cross-platform web technologies and converted into standalone APK. Features encrypted offline storage, voice notes, and priority tagging.',
    tags: ['Android APK', 'React', 'Firebase', 'LocalForage'],
    liveUrl: '#',
    githubUrl: 'https://github.com/dwiphalder',
    apkDownloadUrl: '#',
    featured: true,
    metrics: [
      { label: 'APK Size', value: '4.2 MB' },
      { label: 'Offline Support', value: '100%' }
    ]
  },
  {
    id: 'proj-4',
    name: 'Creative AI Portfolio Platform',
    category: 'UI/UX Design',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop',
    shortDescription: 'Ultra-luxurious, dark futuristic portfolio website template with glassmorphism and ambient glow.',
    description: 'An award-winning personal showcase template designed for developers and creators. Includes particle canvas, resume generator, multilingual toggle, and quote calculator.',
    tags: ['React', 'Glassmorphism', 'Tailwind', 'Canvas'],
    liveUrl: '#',
    githubUrl: 'https://github.com/dwiphalder',
    featured: true,
    metrics: [
      { label: 'Frame Rate', value: '120 FPS' },
      { label: 'Design Score', value: 'A+' }
    ]
  },
  {
    id: 'proj-5',
    name: 'Gemini AI Chat & Code Assistant',
    category: 'AI Solutions',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop',
    shortDescription: 'AI assistant tool capable of writing code, summarizing documents, and generating creative ideas.',
    description: 'Full-stack AI assistant powered by Gemini API. Supports streaming responses, code syntax highlighting, custom system prompt modes (Developer, Academic, Writer), and voice playback.',
    tags: ['Gemini API', 'Express', 'React', 'TypeScript'],
    liveUrl: '#',
    githubUrl: 'https://github.com/dwiphalder',
    featured: false,
    metrics: [
      { label: 'Model', value: 'Gemini 2.5' },
      { label: 'Stream Speed', value: 'Instant' }
    ]
  },
  {
    id: 'proj-6',
    name: 'Android APK Utility & Tools Hub',
    category: 'Android APK',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop',
    shortDescription: 'All-in-one Android utility app featuring unit converters, dark themes, and device stats viewer.',
    description: 'Compact Android application containing essential everyday utilities, system info monitors, network speed tests, and dark mode interface.',
    tags: ['Android APK', 'JavaScript', 'CSS3', 'PWA'],
    liveUrl: '#',
    githubUrl: 'https://github.com/dwiphalder',
    apkDownloadUrl: '#',
    featured: false,
    metrics: [
      { label: 'Downloads', value: '1.2K+' },
      { label: 'Rating', value: '4.8/5' }
    ]
  }
];

export const WHY_CHOOSE_ME = [
  {
    id: 'why-1',
    title: 'Fast Delivery',
    description: 'Committed to quick turnarounds without ever compromising on precision, quality, or attention to detail.',
    icon: 'Zap',
    gradient: 'from-amber-400 to-yellow-600'
  },
  {
    id: 'why-2',
    title: 'Modern Design',
    description: 'Clean, futuristic glassmorphic UI with vibrant neon accents, tailored specifically for contemporary aesthetics.',
    icon: 'Sparkles',
    gradient: 'from-purple-400 to-indigo-600'
  },
  {
    id: 'why-3',
    title: 'AI Powered Solutions',
    description: 'Leveraging cutting-edge Gemini AI, automated scripts, and intelligent workflows to deliver smart digital products.',
    icon: 'Bot',
    gradient: 'from-blue-400 to-cyan-600'
  },
  {
    id: 'why-4',
    title: 'Clean Code',
    description: 'Maintainable, well-structured, modular TypeScript and React code that ensures scalable growth and easy updates.',
    icon: 'Code',
    gradient: 'from-emerald-400 to-teal-600'
  }
];

export const TRANSLATIONS = {
  EN: {
    navHome: 'Home',
    navAbout: 'About',
    navSkills: 'Skills',
    navEducation: 'Education',
    navProjects: 'Projects',
    navServices: 'Services',
    navContact: 'Contact',
    downloadResume: 'Download Resume',
    heroGreeting: "Hello, I'm",
    heroRole: 'Digital Artist • 3D Visual Creator • Character Designer',
    heroDesc: 'I create dreamy digital artwork, 3D character design, and visual storytelling. Passionate about bringing imagination to life.',
    viewProjects: 'View My Art',
    hireMe: 'Commission Me',
    whoAmI: 'Who Am I?',
    aboutText1: 'My name is Tamanna. I am a passionate Digital Artist, 3D Visual Creator, and Anime Character Designer.',
    aboutText2: 'I specialize in digital illustration, 3D environment design, character concept art, and visual storytelling.',
    mySkills: 'Skills & Artistry',
    myServices: 'Commission Services',
    myEducation: 'Qualifications & Training',
    featuredProjects: 'Featured Artwork',
    whyChooseMeTitle: 'Why Commission Me',
    contactTitle: "Let's Create Something Amazing Together",
    contactSubtitle: 'Available for art commissions, 3D modeling, character design, and creative collaborations.',
    sendMsg: 'Send Message',
    nameLabel: 'Your Name',
    emailLabel: 'Your Email',
    msgLabel: 'Your Message',
    backToTop: 'Back to Top'
  },
  HI: {
    navHome: 'होम',
    navAbout: 'मेरे बारे में',
    navSkills: 'कौशल',
    navEducation: 'शिक्षा',
    navProjects: 'प्रोजेक्ट्स',
    navServices: 'सेवाएं',
    navContact: 'संपर्क',
    downloadResume: 'रिज़्यूमे डाउनलोड करें',
    heroGreeting: 'नमस्ते, मैं हूँ',
    heroRole: 'कॉलेज छात्र • AI फ्रीलांसर • डेवलपर',
    heroDesc: 'मैं आधुनिक एंड्रॉइड एप्लिकेशन, बुद्धिमान AI-संचालित समाधान, उत्तरदायी वेबसाइटें और स्वचालन उपकरण बनाता हूँ। नई तकनीकों को सीखने और रचनात्मक विचारों को वास्तविक डिजिटल उत्पादों में बदलने का जुनूनी हूँ।',
    viewProjects: 'मेरे प्रोजेक्ट्स देखें',
    hireMe: 'मुझे हायर करें',
    whoAmI: 'मैं कौन हूँ?',
    aboutText1: 'मेरा नाम द्वीप हालदार है। मैं वर्तमान में बी.ए. अंग्रेजी ऑनर्स (प्रथम वर्ष) कर रहा हूँ। मैंने माध्यमिक और उच्चतर माध्यमिक शिक्षा सफलता से पूरी की है। मेरे पास कंप्यूटर डिप्लोमा भी है।',
    aboutText2: 'मैं AI-सहायता प्राप्त सॉफ़्टवेयर डेवलपमेंट, एंड्रॉइड ऐप डेवलपमेंट, वेबसाइट डेवलपमेंट, UI डिजाइन और आधुनिक वेब तकनीकों में माहिर हूँ।',
    mySkills: 'कौशल और विशेषज्ञता',
    myServices: 'मेरी विशेष सेवाएं',
    myEducation: 'शिक्षा समयरेखा',
    featuredProjects: 'प्रमुख प्रोजेक्ट्स',
    whyChooseMeTitle: 'मुझे क्यों चुनें',
    contactTitle: 'आइए मिलकर कुछ अद्भुत बनाएं',
    contactSubtitle: 'फ्रीलांस प्रोजेक्ट्स, एंड्रॉइड APK निर्माण, वेब डेवलपमेंट और AI परामर्श के लिए उपलब्ध।',
    sendMsg: 'संदेश भेजें',
    nameLabel: 'आपका नाम',
    emailLabel: 'आपका ईमेल',
    msgLabel: 'आपका संदेश',
    backToTop: 'ऊपर जाएँ'
  },
  BN: {
    navHome: 'Home',
    navAbout: 'About Me',
    navSkills: 'Skills',
    navEducation: 'Education',
    navProjects: 'Artworks',
    navServices: 'Services',
    navContact: 'Contact',
    downloadResume: 'Download Resume',
    heroGreeting: "Hi, I'm",
    heroRole: 'Digital Artist & 3D Visual Creator',
    heroDesc: 'I create dreamy digital art and 3D visuals that tell stories, evoke emotions, and bring imagination to life.',
    viewProjects: 'View My Work',
    hireMe: 'Commission Me',
    whoAmI: 'About Me',
    aboutText1: 'Digital artist specializing in 3D environment modeling, character design, and atmospheric digital illustrations.',
    aboutText2: 'Passionate about creating immersive visual art using Blender, Photoshop, Clip Studio Paint, and Procreate.',
    mySkills: 'Artistic Skills & Tools',
    myServices: 'Services',
    myEducation: 'Background',
    featuredProjects: 'Featured Artworks',
    whyChooseMeTitle: 'Why Choose My Art',
    contactTitle: 'Let us create something beautiful together',
    contactSubtitle: 'Get in touch for custom 3D models, digital art commissions, and collaboration projects.',
    sendMsg: 'Send Message',
    nameLabel: 'Your Name',
    emailLabel: 'Your Email',
    msgLabel: 'Your Message',
    backToTop: 'Back to Top'
  }
};
