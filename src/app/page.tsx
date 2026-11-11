import React from 'react';
import {
  getProfile,
  getWebsiteSettings,
  getCollection,
  getDashboardStats
} from '@/lib/db';
import {
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
  SocialLink
} from '@/types/database';

import Navbar from '@/components/public/Navbar';
import HeroSection from '@/components/public/HeroSection';
import AboutSection from '@/components/public/AboutSection';
import AcademicSection from '@/components/public/AcademicSection';
import SkillsSection from '@/components/public/SkillsSection';
import SoftSkillsSection from '@/components/public/SoftSkillsSection';
import ProjectsSection from '@/components/public/ProjectsSection';
import CertificationsSection from '@/components/public/CertificationsSection';
import AchievementsSection from '@/components/public/AchievementsSection';
import ExperienceSection from '@/components/public/ExperienceSection';
import ActivitiesHubSection from '@/components/public/ActivitiesHubSection';
import CareerGoalsSection from '@/components/public/CareerGoalsSection';
import ResumeSection from '@/components/public/ResumeSection';
import ContactSection from '@/components/public/ContactSection';
import Footer from '@/components/public/Footer';
import AiRecruiterChatbot from '@/components/ai/AiRecruiterChatbot';

export const revalidate = 0; // Dynamic server-rendered with database content

export default async function HomePage() {
  const profile = await getProfile();
  const settings = await getWebsiteSettings();
  const stats = await getDashboardStats();

  const education = await getCollection<EducationRecord>('education', true);
  const technicalSkills = await getCollection<TechnicalSkill>('technical_skills', true);
  const softSkills = await getCollection<SoftSkill>('soft_skills', true);
  const projects = await getCollection<Project>('projects', true);
  const certifications = await getCollection<Certification>('certifications', true);
  const achievements = await getCollection<Achievement>('achievements', true);
  const experiences = await getCollection<Experience>('experiences', true);
  const research = await getCollection<ResearchPublication>('research_publications', true);
  const communication = await getCollection<CommunicationMilestone>('communication_journey', true);
  const events = await getCollection<EventItem>('events', true);
  const gallery = await getCollection<GalleryMedia>('gallery_media', true);
  const careerGoals = await getCollection<CareerGoal>('career_goals', true);
  const resumes = await getCollection<ResumeDocument>('resumes', true);
  const socialLinks = await getCollection<SocialLink>('social_links', true);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* 1. Header with 1-Click Instant Resume Download Modal */}
      <Navbar
        socialLinks={socialLinks}
        resumes={resumes}
      />

      <main className="flex-grow">
        {/* A. Hero Landing (Punchy headline, live DB stats, 1-click resume trigger) */}
        <HeroSection
          profile={profile}
          socialLinks={socialLinks}
          stats={{
            publishedProjects: stats.publishedProjects,
            publishedCertifications: stats.publishedCertifications,
            totalEducation: stats.totalEducation,
            totalExperiences: stats.totalExperiences
          }}
          resumes={resumes}
        />

        {/* B. About Me & Career Interests */}
        <AboutSection profile={profile} />

        {/* C. Projects Portfolio (Prioritized front-and-center for recruiters with impact metrics) */}
        <ProjectsSection projects={projects} />

        {/* D. Professional Experience & Internships */}
        <ExperienceSection experiences={experiences} />

        {/* E. Technical Skills (Industry-standard competency tiers without arbitrary % bars) */}
        <SkillsSection skills={technicalSkills} />

        {/* F. Certifications & Credentials */}
        <CertificationsSection certifications={certifications} />

        {/* G. Behavioral Soft Skills & Evidence */}
        <SoftSkillsSection softSkills={softSkills} />

        {/* H. Achievements & Awards */}
        <AchievementsSection achievements={achievements} />

        {/* I. Academic Background (Dual Timeline & Cards view) */}
        <AcademicSection education={education} />

        {/* J. Streamlined Activities Hub (Tabbed Speaking, Events, Research & Gallery) */}
        <ActivitiesHubSection
          publications={research}
          communication={communication}
          events={events}
          gallery={gallery}
        />

        {/* K. Career Goals & Roadmap */}
        <CareerGoalsSection goals={careerGoals} />

        {/* L. Tailored ATS Resumes */}
        <ResumeSection resumes={resumes} />

        {/* M. Contact & Direct Communication Channels */}
        <ContactSection profile={profile} socialLinks={socialLinks} />
      </main>

      {/* Footer */}
      <Footer
        profile={profile}
        socialLinks={socialLinks}
        settings={settings}
      />

      {/* N. Dedicated AI Recruiter FAQ Assistant */}
      <AiRecruiterChatbot />
    </div>
  );
}
