-- =========================================================================
-- MOHAMMAD BILAL — PERSONAL BRAND & PROFESSIONAL PORTFOLIO CMS DATABASE
-- PostgreSQL Schema with Row Level Security (RLS) for Supabase
-- =========================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL DEFAULT 'Mohammad Bilal',
  headline TEXT NOT NULL,
  short_intro TEXT NOT NULL,
  bio TEXT NOT NULL,
  personal_introduction TEXT,
  career_interests TEXT,
  professional_philosophy TEXT,
  personal_strengths TEXT,
  learning_mindset TEXT,
  future_ambitions TEXT,
  profile_photo_url TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  location TEXT DEFAULT 'India',
  desired_roles TEXT[] DEFAULT ARRAY['Aspiring Data Analyst', 'Business Intelligence Analyst', 'MIS Executive'],
  rotating_headlines TEXT[] DEFAULT ARRAY['Aspiring Data Analyst', 'Business Intelligence Enthusiast', 'Technology Learner', 'Problem Solver', 'Continuous Learner'],
  primary_technical_skills TEXT[] DEFAULT ARRAY['SQL', 'Python', 'Power BI', 'Advanced Excel', 'Data Analytics'],
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Website Settings Table
CREATE TABLE IF NOT EXISTS public.website_settings (
  id TEXT PRIMARY KEY DEFAULT 'current',
  website_title TEXT NOT NULL DEFAULT 'Mohammad Bilal — Portfolio & Professional CMS',
  website_description TEXT NOT NULL DEFAULT 'Official professional portfolio and dynamic personal brand of Mohammad Bilal.',
  seo_keywords TEXT[] DEFAULT ARRAY['Mohammad Bilal', 'Data Analyst', 'Business Intelligence', 'Portfolio', 'SQL', 'Power BI'],
  favicon_url TEXT,
  footer_text TEXT DEFAULT 'Built with precision, high performance and verifiable evidence.',
  copyright_text TEXT DEFAULT '© Mohammad Bilal. All rights reserved.',
  contact_email TEXT DEFAULT 'contact@bilalportfolio.com',
  contact_phone TEXT,
  whatsapp_number TEXT,
  is_contact_form_active BOOLEAN DEFAULT TRUE,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Academic Profile (Education)
CREATE TABLE IF NOT EXISTS public.education (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  qualification TEXT NOT NULL,
  institution_name TEXT NOT NULL,
  course_stream TEXT,
  board_university TEXT,
  start_year INT NOT NULL,
  completion_year INT NOT NULL,
  grade_percentage_cgpa TEXT,
  location TEXT,
  description TEXT,
  supporting_document_url TEXT,
  institution_logo_url TEXT,
  display_order INT DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Technical Skills
CREATE TABLE IF NOT EXISTS public.technical_skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  skill_name TEXT NOT NULL,
  category TEXT NOT NULL,
  proficiency_level TEXT NOT NULL DEFAULT 'Intermediate',
  proficiency_percentage INT DEFAULT 80,
  duration_experience TEXT,
  description TEXT,
  related_project_title TEXT,
  display_order INT DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Soft Skills
CREATE TABLE IF NOT EXISTS public.soft_skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  real_life_evidence TEXT,
  associated_achievement TEXT,
  image_url TEXT,
  display_order INT DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Projects Portfolio
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  short_description TEXT NOT NULL,
  detailed_description TEXT,
  category TEXT NOT NULL,
  problem_statement TEXT,
  objectives TEXT,
  technologies_used TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  tools_frameworks TEXT[] DEFAULT ARRAY[]::TEXT[],
  key_features TEXT[] DEFAULT ARRAY[]::TEXT[],
  thumbnail_url TEXT,
  screenshots TEXT[] DEFAULT ARRAY[]::TEXT[],
  github_url TEXT,
  live_demo_url TEXT,
  start_date TEXT,
  completion_date TEXT,
  status TEXT DEFAULT 'Completed',
  key_learnings TEXT,
  future_improvements TEXT,
  documentation_url TEXT,
  display_order INT DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Certifications
CREATE TABLE IF NOT EXISTS public.certifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  issuing_organisation TEXT NOT NULL,
  issue_date TEXT NOT NULL,
  expiry_date TEXT,
  credential_id TEXT,
  verification_url TEXT,
  certificate_pdf_url TEXT,
  certificate_image_url TEXT,
  description TEXT,
  category TEXT,
  display_order INT DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Achievements & Awards
CREATE TABLE IF NOT EXISTS public.achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT,
  awarding_organisation TEXT NOT NULL,
  event_name TEXT,
  date TEXT NOT NULL,
  description TEXT NOT NULL,
  recognition_details TEXT,
  photo_url TEXT,
  document_url TEXT,
  display_order INT DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Professional Experience & Internships
CREATE TABLE IF NOT EXISTS public.experiences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organisation TEXT NOT NULL,
  designation TEXT NOT NULL,
  employment_type TEXT NOT NULL DEFAULT 'Internship',
  start_date TEXT NOT NULL,
  end_date TEXT,
  is_current BOOLEAN DEFAULT FALSE,
  responsibilities TEXT NOT NULL,
  skills_developed TEXT[] DEFAULT ARRAY[]::TEXT[],
  major_contributions TEXT,
  supporting_certificate_url TEXT,
  organisation_logo_url TEXT,
  related_photos TEXT[] DEFAULT ARRAY[]::TEXT[],
  display_order INT DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Research & Publications
CREATE TABLE IF NOT EXISTS public.research_publications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  abstract TEXT,
  research_area TEXT,
  authors TEXT[] DEFAULT ARRAY['Mohammad Bilal'],
  publication_or_conference TEXT NOT NULL,
  submission_status TEXT NOT NULL DEFAULT 'Submitted',
  publication_date TEXT,
  doi_or_url TEXT,
  paper_pdf_url TEXT,
  supporting_images TEXT[] DEFAULT ARRAY[]::TEXT[],
  description TEXT,
  display_order INT DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. Communication & Public Speaking Journey
CREATE TABLE IF NOT EXISTS public.communication_journey (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  milestone_title TEXT NOT NULL,
  milestone_type TEXT NOT NULL,
  event_name TEXT,
  date TEXT NOT NULL,
  description TEXT NOT NULL,
  key_learning TEXT,
  media_url TEXT,
  media_type TEXT DEFAULT 'image',
  display_order INT DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. Workshops, Events & Activities
CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  organisation TEXT,
  date TEXT NOT NULL,
  venue TEXT,
  description TEXT NOT NULL,
  participation_type TEXT NOT NULL DEFAULT 'Participant',
  photo_urls TEXT[] DEFAULT ARRAY[]::TEXT[],
  video_url TEXT,
  supporting_doc_url TEXT,
  display_order INT DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. Photo & Video Gallery
CREATE TABLE IF NOT EXISTS public.gallery_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  media_type TEXT NOT NULL DEFAULT 'image',
  media_url TEXT NOT NULL,
  thumbnail_url TEXT,
  event_category TEXT NOT NULL,
  caption TEXT,
  description TEXT,
  upload_date TEXT NOT NULL,
  is_featured BOOLEAN DEFAULT FALSE,
  display_order INT DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. Career Goals & Aspirations
CREATE TABLE IF NOT EXISTS public.career_goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  target_timeline TEXT,
  display_order INT DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 15. Resumes / CVs
CREATE TABLE IF NOT EXISTS public.resumes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  target_role TEXT NOT NULL,
  description TEXT,
  file_url TEXT NOT NULL,
  file_size TEXT,
  upload_date TEXT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  display_order INT DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 16. Dynamic Social Media Links
CREATE TABLE IF NOT EXISTS public.social_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform TEXT NOT NULL,
  custom_label TEXT NOT NULL,
  url TEXT NOT NULL,
  icon TEXT NOT NULL,
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 17. Inbound Contact Messages
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 18. Media Asset Library
CREATE TABLE IF NOT EXISTS public.media_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size BIGINT DEFAULT 0,
  caption TEXT,
  category TEXT DEFAULT 'general',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =========================================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.website_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.technical_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.soft_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.research_publications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.communication_journey ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.career_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;

-- Helper to grant public SELECT on published items, and full access to authenticated admins
-- 1. Profiles & Settings: Anyone can read; authenticated admin can modify
CREATE POLICY "Public profiles read" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Admin profiles update" ON public.profiles FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Public settings read" ON public.website_settings FOR SELECT USING (true);
CREATE POLICY "Admin settings update" ON public.website_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 2. Content tables: Public can view is_published = true; Admin can ALL
DO $$ 
DECLARE
  tbl TEXT;
  tables TEXT[] := ARRAY[
    'education', 'technical_skills', 'soft_skills', 'projects', 
    'certifications', 'achievements', 'experiences', 'research_publications', 
    'communication_journey', 'events', 'gallery_media', 'career_goals', 'resumes'
  ];
BEGIN
  FOREACH tbl IN ARRAY tables LOOP
    EXECUTE format('CREATE POLICY "Public read published %1$s" ON public.%1$s FOR SELECT USING (is_published = true);', tbl);
    EXECUTE format('CREATE POLICY "Admin full access %1$s" ON public.%1$s FOR ALL TO authenticated USING (true) WITH CHECK (true);', tbl);
  END LOOP;
END $$;

-- 3. Social Links: Public can view active; Admin has full access
CREATE POLICY "Public read active social links" ON public.social_links FOR SELECT USING (is_active = true);
CREATE POLICY "Admin full access social links" ON public.social_links FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 4. Contact messages: Public can INSERT; Admin has full read/update/delete
CREATE POLICY "Public can insert contact messages" ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin full access contact messages" ON public.contact_messages FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 5. Media Assets: Public can read, authenticated can manage
CREATE POLICY "Public can read media assets" ON public.media_assets FOR SELECT USING (true);
CREATE POLICY "Admin full access media assets" ON public.media_assets FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- =========================================================================
-- STORAGE BUCKETS (Run in Supabase Storage SQL editor if needed)
-- =========================================================================
-- INSERT INTO storage.buckets (id, name, public) VALUES ('portfolio-assets', 'portfolio-assets', true) ON CONFLICT DO NOTHING;
-- CREATE POLICY "Public read portfolio assets" ON storage.objects FOR SELECT USING (bucket_id = 'portfolio-assets');
-- CREATE POLICY "Admin write portfolio assets" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'portfolio-assets');
-- CREATE POLICY "Admin update portfolio assets" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'portfolio-assets');
-- CREATE POLICY "Admin delete portfolio assets" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'portfolio-assets');
