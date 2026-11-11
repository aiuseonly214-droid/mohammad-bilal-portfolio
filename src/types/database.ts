export type PublicationStatus = 'Published' | 'Accepted' | 'Under Review' | 'Submitted';
export type EmploymentType = 'Full-time' | 'Internship' | 'Volunteering' | 'Part-time' | 'Contract';
export type ProjectCategory = 
  | 'Data Analytics'
  | 'SQL Projects'
  | 'Power BI Dashboards'
  | 'Python Projects'
  | 'Web Development'
  | 'Academic Projects'
  | 'Research Projects'
  | 'Other Projects';

export interface Profile {
  id: string;
  full_name: string;
  headline: string;
  short_intro: string;
  bio: string;
  personal_introduction?: string;
  career_interests?: string;
  professional_philosophy?: string;
  personal_strengths?: string;
  learning_mindset?: string;
  future_ambitions?: string;
  profile_photo_url: string;
  email: string;
  phone?: string;
  location: string;
  desired_roles: string[];
  rotating_headlines: string[];
  primary_technical_skills: string[];
  updated_at: string;
}

export interface WebsiteSettings {
  id: string;
  website_title: string;
  website_description: string;
  seo_keywords: string[];
  favicon_url?: string;
  footer_text: string;
  copyright_text: string;
  contact_email: string;
  contact_phone?: string;
  whatsapp_number?: string;
  is_contact_form_active: boolean;
  updated_at: string;
}

export interface EducationRecord {
  id: string;
  qualification: string;
  institution_name: string;
  course_stream?: string;
  board_university?: string;
  start_year: number;
  completion_year: number;
  grade_percentage_cgpa?: string;
  location?: string;
  description?: string;
  supporting_document_url?: string;
  institution_logo_url?: string;
  display_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface TechnicalSkill {
  id: string;
  skill_name: string;
  category: string;
  proficiency_level: string; // 'Beginner' | 'Intermediate' | 'Advanced' | 'Proficient'
  proficiency_percentage?: number; // 0-100
  duration_experience?: string;
  description?: string;
  related_project_title?: string;
  display_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface SoftSkill {
  id: string;
  title: string;
  description: string;
  real_life_evidence?: string;
  associated_achievement?: string;
  image_url?: string;
  display_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  short_description: string;
  detailed_description?: string;
  category: ProjectCategory;
  problem_statement?: string;
  objectives?: string;
  technologies_used: string[];
  tools_frameworks?: string[];
  key_features: string[];
  thumbnail_url?: string;
  screenshots: string[];
  github_url?: string;
  live_demo_url?: string;
  start_date?: string;
  completion_date?: string;
  status: string; // 'Completed' | 'In Progress'
  key_learnings?: string;
  future_improvements?: string;
  documentation_url?: string;
  display_order: number;
  is_featured: boolean;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Certification {
  id: string;
  title: string;
  issuing_organisation: string;
  issue_date: string;
  expiry_date?: string;
  credential_id?: string;
  verification_url?: string;
  certificate_pdf_url?: string;
  certificate_image_url?: string;
  description?: string;
  category?: string;
  display_order: number;
  is_featured: boolean;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Achievement {
  id: string;
  title: string;
  category?: string;
  awarding_organisation: string;
  event_name?: string;
  date: string;
  description: string;
  recognition_details?: string;
  photo_url?: string;
  document_url?: string;
  display_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Experience {
  id: string;
  organisation: string;
  designation: string;
  employment_type: EmploymentType;
  start_date: string;
  end_date?: string;
  is_current: boolean;
  responsibilities: string;
  skills_developed: string[];
  major_contributions?: string;
  supporting_certificate_url?: string;
  organisation_logo_url?: string;
  related_photos?: string[];
  display_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface ResearchPublication {
  id: string;
  title: string;
  abstract?: string;
  research_area?: string;
  authors: string[];
  publication_or_conference: string;
  submission_status: PublicationStatus;
  publication_date?: string;
  doi_or_url?: string;
  paper_pdf_url?: string;
  supporting_images?: string[];
  description?: string;
  display_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface CommunicationMilestone {
  id: string;
  milestone_title: string;
  milestone_type: string; // 'Public Speaking' | 'Presentation' | 'Debate' | 'Lectures' | 'English Journey' | 'Workshops Attended'
  event_name?: string;
  date: string;
  description: string;
  key_learning?: string;
  media_url?: string;
  media_type?: 'image' | 'video';
  display_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface EventItem {
  id: string;
  title: string;
  category: string; // 'College Events' | 'Technical Workshops' | 'Seminars' | 'Guest Lectures' | 'Competitions' | 'Training Sessions' | 'Volunteering' | 'Other Activities'
  organisation?: string;
  date: string;
  venue?: string;
  description: string;
  participation_type: string; // 'Participant' | 'Speaker' | 'Organizer' | 'Winner' | 'Attendee'
  photo_urls?: string[];
  video_url?: string;
  supporting_doc_url?: string;
  display_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface GalleryMedia {
  id: string;
  title: string;
  media_type: 'image' | 'video';
  media_url: string;
  thumbnail_url?: string;
  event_category: string;
  caption?: string;
  description?: string;
  upload_date: string;
  is_featured: boolean;
  display_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface CareerGoal {
  id: string;
  category: 'Desired Job Roles' | 'Career Objectives' | 'Areas of Interest' | 'Technologies Currently Learning' | 'Future Goals' | 'Professional Aspirations';
  title: string;
  description?: string;
  target_timeline?: string;
  display_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface ResumeDocument {
  id: string;
  title: string;
  target_role: string;
  description?: string;
  file_url: string;
  file_size?: string;
  upload_date: string;
  is_active: boolean;
  is_featured: boolean;
  display_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface SocialLink {
  id: string;
  platform: string; // 'LinkedIn' | 'GitHub' | 'Instagram' | 'Email' | 'YouTube' | 'X' | 'WhatsApp' | 'Custom'
  custom_label: string;
  url: string;
  icon: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  ip_address?: string;
  created_at: string;
}

export interface MediaAsset {
  id: string;
  file_name: string;
  file_url: string;
  file_type: string;
  file_size: number;
  caption?: string;
  category?: string;
  created_at: string;
}

