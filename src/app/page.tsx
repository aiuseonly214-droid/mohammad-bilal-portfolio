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
import ResearchSection from '@/components/public/ResearchSection';
import CommunicationSection from '@/components/public/CommunicationSection';
import EventsSection from '@/components/public/EventsSection';
import GallerySection from '@/components/public/GallerySection';
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

  const featuredResume = resumes.find(r => r.is_featured) || resumes[0];
  const resumeDownloadUrl = featuredResume ? featuredResume.file_url : '#resumes';

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* 1. Navbar */}
      <Navbar
        socialLinks={socialLinks}
        resumeUrl={resumeDownloadUrl}
      />

      <main className="flex-grow">
        {/* A. Homepage Hero */}
        <HeroSection
          profile={profile}
          socialLinks={socialLinks}
          stats={{
            publishedProjects: stats.publishedProjects,
            publishedCertifications: stats.publishedCertifications,
            totalEducation: stats.totalEducation,
            totalExperiences: stats.totalExperiences
          }}
          resumeUrl={resumeDownloadUrl}
        />

        {/* B. About Me */}
        <AboutSection profile={profile} />

        {/* C. Academic Profile */}
        <AcademicSection education={education} />

        {/* D. Technical Skills */}
        <SkillsSection skills={technicalSkills} />

        {/* E. Soft Skills */}
        <SoftSkillsSection softSkills={softSkills} />

        {/* F. Projects Portfolio */}
        <ProjectsSection projects={projects} />

        {/* G. Certifications */}
        <CertificationsSection certifications={certifications} />

        {/* H. Achievements & Awards */}
        <AchievementsSection achievements={achievements} />

        {/* I. Professional Experience & Internships */}
        <ExperienceSection experiences={experiences} />

        {/* J. Research & Publications */}
        <ResearchSection publications={research} />

        {/* K. Communication & Speaking Journey */}
        <CommunicationSection milestones={communication} />

        {/* L. Workshops, Events & Activities */}
        <EventsSection events={events} />

        {/* M. Photo & Video Gallery */}
        <GallerySection media={gallery} />

        {/* N. Career Goals & Aspirations */}
        <CareerGoalsSection goals={careerGoals} />

        {/* O. Resume & CV Management */}
        <ResumeSection resumes={resumes} />

        {/* Q. Contact Section & Social Links */}
        <ContactSection profile={profile} socialLinks={socialLinks} />
      </main>

      {/* Footer */}
      <Footer
        profile={profile}
        socialLinks={socialLinks}
        settings={settings}
      />

      {/* 4. Dedicated AI Recruiter FAQ Assistant */}
      <AiRecruiterChatbot />
    </div>
  );
}
