import fs from 'fs';
import path from 'path';
import { supabase, isSupabaseConfigured, getSupabaseServerClient } from './supabase';
import {
  initialProfile,
  initialSettings,
  initialEducation,
  initialSkills,
  initialSoftSkills,
  initialProjects,
  initialCertifications,
  initialAchievements,
  initialExperiences,
  initialResearch,
  initialCommunication,
  initialEvents,
  initialGallery,
  initialCareerGoals,
  initialResumes,
  initialSocialLinks,
  initialMessages,
  initialMediaAssets
} from './initialData';
import {
  Profile,
  WebsiteSettings,
  EducationRecord,
  TechnicalSkill,
  SoftSkill,
  Project,
  Certification,
  Achievement,
  Experience,
  ResearchPublication,
  CommunicationMilestone,
  EventItem,
  GalleryMedia,
  CareerGoal,
  ResumeDocument,
  SocialLink,
  ContactMessage,
  MediaAsset
} from '@/types/database';

interface StoreSchema {
  profile: Profile;
  settings: WebsiteSettings;
  education: EducationRecord[];
  technical_skills: TechnicalSkill[];
  soft_skills: SoftSkill[];
  projects: Project[];
  certifications: Certification[];
  achievements: Achievement[];
  experiences: Experience[];
  research_publications: ResearchPublication[];
  communication_journey: CommunicationMilestone[];
  events: EventItem[];
  gallery_media: GalleryMedia[];
  career_goals: CareerGoal[];
  resumes: ResumeDocument[];
  social_links: SocialLink[];
  contact_messages: ContactMessage[];
  media_assets: MediaAsset[];
}

const getInitialStore = (): StoreSchema => ({
  profile: { ...initialProfile },
  settings: { ...initialSettings },
  education: [...initialEducation],
  technical_skills: [...initialSkills],
  soft_skills: [...initialSoftSkills],
  projects: [...initialProjects],
  certifications: [...initialCertifications],
  achievements: [...initialAchievements],
  experiences: [...initialExperiences],
  research_publications: [...initialResearch],
  communication_journey: [...initialCommunication],
  events: [...initialEvents],
  gallery_media: [...initialGallery],
  career_goals: [...initialCareerGoals],
  resumes: [...initialResumes],
  social_links: [...initialSocialLinks],
  contact_messages: [...initialMessages],
  media_assets: [...initialMediaAssets],
});

// File-backed storage for local persistence
const DATA_DIR = path.join(process.cwd(), '.data');
const STORE_FILE = path.join(DATA_DIR, 'portfolio_store.json');

function readLocalStore(): StoreSchema {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (fs.existsSync(STORE_FILE)) {
      const content = fs.readFileSync(STORE_FILE, 'utf-8');
      return JSON.parse(content);
    }
    const initial = getInitialStore();
    fs.writeFileSync(STORE_FILE, JSON.stringify(initial, null, 2), 'utf-8');
    return initial;
  } catch (err) {
    console.error('Error reading local file store:', err);
    return getInitialStore();
  }
}

function writeLocalStore(store: StoreSchema): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(STORE_FILE, JSON.stringify(store, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing local file store:', err);
  }
}

// Global accessor functions
export async function getProfile(): Promise<Profile> {
  if (isSupabaseConfigured) {
    const sb = getSupabaseServerClient() || supabase;
    if (sb) {
      const { data, error } = await sb.from('profiles').select('*').limit(1).single();
      if (!error && data) return data as Profile;
    }
  }
  const store = readLocalStore();
  return store.profile;
}

export async function updateProfile(data: Partial<Profile>): Promise<Profile> {
  if (isSupabaseConfigured) {
    const sb = getSupabaseServerClient() || supabase;
    if (sb) {
      const { data: updated, error } = await sb
        .from('profiles')
        .upsert({ ...data, updated_at: new Date().toISOString() })
        .select()
        .single();
      if (!error && updated) return updated as Profile;
    }
  }
  const store = readLocalStore();
  store.profile = { ...store.profile, ...data, updated_at: new Date().toISOString() };
  writeLocalStore(store);
  return store.profile;
}

export async function getWebsiteSettings(): Promise<WebsiteSettings> {
  if (isSupabaseConfigured) {
    const sb = getSupabaseServerClient() || supabase;
    if (sb) {
      const { data, error } = await sb.from('website_settings').select('*').limit(1).single();
      if (!error && data) return data as WebsiteSettings;
    }
  }
  const store = readLocalStore();
  return store.settings;
}

export async function updateWebsiteSettings(data: Partial<WebsiteSettings>): Promise<WebsiteSettings> {
  if (isSupabaseConfigured) {
    const sb = getSupabaseServerClient() || supabase;
    if (sb) {
      const { data: updated, error } = await sb
        .from('website_settings')
        .upsert({ id: 'current', ...data, updated_at: new Date().toISOString() })
        .select()
        .single();
      if (!error && updated) return updated as WebsiteSettings;
    }
  }
  const store = readLocalStore();
  store.settings = { ...store.settings, ...data, updated_at: new Date().toISOString() };
  writeLocalStore(store);
  return store.settings;
}

// Generic collection getter with public/admin filter
export async function getCollection<T extends { is_published?: boolean; is_active?: boolean; display_order?: number }>(
  tableName: keyof Omit<StoreSchema, 'profile' | 'settings'>,
  onlyPublished: boolean = true
): Promise<T[]> {
  if (isSupabaseConfigured) {
    const sb = getSupabaseServerClient() || supabase;
    if (sb) {
      let query = sb.from(tableName).select('*');
      if (onlyPublished) {
        if (tableName === 'social_links') {
          query = query.eq('is_active', true);
        } else if (tableName !== 'contact_messages' && tableName !== 'media_assets') {
          query = query.eq('is_published', true);
        }
      }
      query = query.order('display_order', { ascending: true });
      const { data, error } = await query;
      if (!error && data) return data as T[];
    }
  }
  const store = readLocalStore();
  const list = (store[tableName] as unknown as T[]) || [];
  let filtered = list;
  if (onlyPublished) {
    filtered = list.filter((item) => {
      if (tableName === 'social_links') return item.is_active !== false;
      if (tableName === 'contact_messages' || tableName === 'media_assets') return true;
      return item.is_published !== false;
    });
  }
  return filtered.sort((a, b) => ((a.display_order ?? 0) - (b.display_order ?? 0)));
}

// Add item to collection
export async function addItem<T extends { id?: string }>(
  tableName: keyof Omit<StoreSchema, 'profile' | 'settings'>,
  item: Omit<T, 'id' | 'created_at' | 'updated_at'> & { id?: string }
): Promise<T> {
  const now = new Date().toISOString();
  const newId = item.id || `${tableName.slice(0, 4)}-${Date.now()}`;
  const newItem = {
    ...item,
    id: newId,
    created_at: now,
    updated_at: now
  } as unknown as T;

  if (isSupabaseConfigured) {
    const sb = getSupabaseServerClient() || supabase;
    if (sb) {
      const { data, error } = await sb.from(tableName).insert(newItem).select().single();
      if (!error && data) return data as T;
    }
  }

  const store = readLocalStore();
  const list = (store[tableName] as unknown as T[]) || [];
  list.push(newItem);
  // @ts-expect-error store table assignment
  store[tableName] = list;
  writeLocalStore(store);
  return newItem;
}

// Update item in collection
export async function updateItem<T extends { id: string }>(
  tableName: keyof Omit<StoreSchema, 'profile' | 'settings'>,
  id: string,
  updates: Partial<T>
): Promise<T | null> {
  const now = new Date().toISOString();
  if (isSupabaseConfigured) {
    const sb = getSupabaseServerClient() || supabase;
    if (sb) {
      const { data, error } = await sb
        .from(tableName)
        .update({ ...updates, updated_at: now })
        .eq('id', id)
        .select()
        .single();
      if (!error && data) return data as T;
    }
  }

  const store = readLocalStore();
  const list = (store[tableName] as unknown as T[]) || [];
  const index = list.findIndex((i) => i.id === id);
  if (index === -1) return null;

  list[index] = { ...list[index], ...updates, updated_at: now };
  // @ts-expect-error store table assignment
  store[tableName] = list;
  writeLocalStore(store);
  return list[index];
}

// Delete item from collection
export async function deleteItem(
  tableName: keyof Omit<StoreSchema, 'profile' | 'settings'>,
  id: string
): Promise<boolean> {
  if (isSupabaseConfigured) {
    const sb = getSupabaseServerClient() || supabase;
    if (sb) {
      const { error } = await sb.from(tableName).delete().eq('id', id);
      if (!error) return true;
    }
  }

  const store = readLocalStore();
  const list = (store[tableName] as unknown as { id: string }[]) || [];
  const filtered = list.filter((i) => i.id !== id);
  // @ts-expect-error store table assignment
  store[tableName] = filtered;
  writeLocalStore(store);
  return true;
}

// Helper to get project by slug
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (isSupabaseConfigured) {
    const sb = getSupabaseServerClient() || supabase;
    if (sb) {
      const { data, error } = await sb.from('projects').select('*').eq('slug', slug).single();
      if (!error && data) return data as Project;
    }
  }
  const store = readLocalStore();
  return store.projects.find((p) => p.slug === slug) || null;
}

// Public dashboard summary statistics calculated dynamically from DB
export async function getDashboardStats() {
  const store = readLocalStore();
  return {
    totalProjects: store.projects.length,
    publishedProjects: store.projects.filter(p => p.is_published).length,
    totalCertifications: store.certifications.length,
    publishedCertifications: store.certifications.filter(c => c.is_published).length,
    totalAchievements: store.achievements.length,
    totalEducation: store.education.length,
    totalExperiences: store.experiences.length,
    totalSkills: store.technical_skills.length,
    totalSoftSkills: store.soft_skills.length,
    totalGalleryMedia: store.gallery_media.length,
    totalMessages: store.contact_messages.length,
    unreadMessages: store.contact_messages.filter(m => !m.is_read).length,
    totalResumes: store.resumes.length,
    activeResumes: store.resumes.filter(r => r.is_active && r.is_published).length,
  };
}
