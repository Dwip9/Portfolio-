export type Language = 'EN' | 'HI' | 'BN';
export type ThemeMode = 'dark' | 'light';

export interface Project {
  id: string;
  name: string;
  category: string;
  image: string;
  shortDescription: string;
  fullDescription?: string;
  description?: string;
  tags: string[];
  liveUrl?: string;
  liveDemoUrl?: string;
  githubUrl?: string;
  apkDownloadUrl?: string;
  featured: boolean;
  metrics?: { label: string; value: string }[];
}

export interface Service {
  id: string;
  icon: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  deliverables: string[];
  gradient: string;
  popular?: boolean;
}

export interface Skill {
  id: string;
  name: string;
  category: 'Mobile' | 'Web' | 'AI & Tools' | 'Core';
  progress: number;
  icon: string;
  color: string;
  description: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  field: string;
  institution: string;
  boardOrUniv?: string;
  status: 'Completed' | 'Currently Studying';
  year: string;
  description: string;
  highlights: string[];
  icon: string;
}

export interface QuickStat {
  id: string;
  title: string;
  value: string;
  label: string;
  icon: string;
  gradient: string;
}

export interface ProfileInfo {
  name: string;
  education: string;
  year: string;
  qualifications: string[];
  profession: string[];
  location: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  twitter: string;
  instagram: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  comment: string;
  rating: number;
  avatar: string;
}
