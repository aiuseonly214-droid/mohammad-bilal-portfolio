'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  ArrowRight,
  FileDown,
  Mail,
  Award,
  BarChart3,
  GraduationCap,
  Briefcase
} from 'lucide-react';
import { Profile, SocialLink, ResumeDocument } from '@/types/database';
import { GithubIcon, LinkedinIcon, WhatsAppIcon } from '@/components/ui/BrandIcons';
import ResumeModal from '@/components/ui/ResumeModal';

interface HeroSectionProps {
  profile: Profile;
  socialLinks: SocialLink[];
  stats: {
    publishedProjects: number;
    publishedCertifications: number;
    totalEducation: number;
    totalExperiences: number;
  };
  resumes?: ResumeDocument[];
}

export default function HeroSection({
  profile,
  socialLinks,
  stats,
  resumes = [],
}: HeroSectionProps) {
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  const rotatingHeadlines = profile.rotating_headlines?.length > 0
    ? profile.rotating_headlines
    : [
        'Aspiring Data Analyst',
        'Business Intelligence Enthusiast',
        'Technology Learner',
        'Problem Solver',
        'Continuous Learner'
      ];

  useEffect(() => {
    const timer = setInterval(() => {
      setHeadlineIndex((prev) => (prev + 1) % rotatingHeadlines.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [rotatingHeadlines.length]);

  const getSocialIcon = (platform: string) => {
    const p = platform.toLowerCase();
    if (p.includes('linkedin')) return <LinkedinIcon className="w-5 h-5" />;
    if (p.includes('github')) return <GithubIcon className="w-5 h-5" />;
    if (p.includes('whatsapp')) return <WhatsAppIcon className="w-5 h-5" />;
    return <Mail className="w-5 h-5" />;
  };

  return (
    <>
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-gradient-to-b from-white via-[#F8FAFC] to-[#F1F5F9]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#E2E8F0_1px,transparent_1px),linear-gradient(to_bottom,#E2E8F0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Bio & Intro */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-[#203F66] text-xs font-semibold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Available for Data Analyst & BI Roles
              </div>

              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#142B4A] tracking-tight leading-tight">
                  Hi, I&apos;m <span className="text-[#3478C9]">{profile.full_name}</span>
                </h1>
                
                <div className="h-12 sm:h-14 mt-2 flex items-center justify-center lg:justify-start">
                  <span className="text-2xl sm:text-3xl font-bold text-[#203F66] transition-opacity duration-500 ease-in-out">
                    {rotatingHeadlines[headlineIndex]}
                  </span>
                </div>
              </div>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed mx-auto lg:mx-0">
                {profile.short_intro}
              </p>

              {/* Target Roles */}
              {profile.desired_roles && profile.desired_roles.length > 0 && (
                <div className="pt-1">
                  <div className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-2">
                    Target Roles
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                    {profile.desired_roles.map((role) => (
                      <span
                        key={role}
                        className="px-3 py-1 rounded-md bg-white border border-slate-200 text-xs font-medium text-slate-700 shadow-xs"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Primary Skills */}
              {profile.primary_technical_skills && profile.primary_technical_skills.length > 0 && (
                <div className="pt-1">
                  <div className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-2">
                    Primary Competencies
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                    {profile.primary_technical_skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 text-xs font-semibold"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row flex-wrap gap-2.5 sm:gap-3 justify-center lg:justify-start w-full sm:w-auto">
                <a
                  href="#projects"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#142B4A] text-white font-semibold text-sm hover:bg-[#203F66] shadow-md hover:shadow-lg transition-all"
                >
                  <span>View Projects</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                {/* Direct 1-Click Instant Modal Download */}
                <button
                  onClick={() => setResumeModalOpen(true)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white border border-slate-300 text-slate-800 font-semibold text-sm hover:bg-slate-50 shadow-xs transition-all cursor-pointer"
                >
                  <FileDown className="w-4 h-4 text-[#3478C9]" />
                  <span>Download Resume (PDF)</span>
                </button>

                <a
                  href="#contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-50 text-[#142B4A] font-semibold text-sm hover:bg-blue-100 transition-colors"
                >
                  <span>Contact Me</span>
                </a>
              </div>

              {/* Social Links */}
              {socialLinks && socialLinks.length > 0 && (
                <div className="pt-2 flex items-center gap-4 justify-center lg:justify-start">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Connect:
                  </span>
                  <div className="flex items-center gap-2">
                    {socialLinks.map((link) => (
                      <a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-[#142B4A] hover:border-slate-300 transition-colors shadow-xs"
                        title={link.custom_label}
                      >
                        {getSocialIcon(link.platform)}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Photo & Live Stats Cards */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-slate-200">
                <Image
                  src={profile.profile_photo_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80'}
                  alt={profile.full_name}
                  fill
                  sizes="(max-width: 640px) 256px, 320px"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#142B4A]/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white text-left">
                  <p className="text-base font-bold tracking-tight">{profile.full_name}</p>
                  <p className="text-xs text-slate-200">{profile.location}</p>
                </div>
              </div>

              {/* Quick Real Stats */}
              <div className="w-full max-w-md mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs text-center">
                  <BarChart3 className="w-5 h-5 text-[#3478C9] mx-auto mb-1" />
                  <span className="block text-xl font-extrabold text-[#142B4A]">
                    {stats.publishedProjects}
                  </span>
                  <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">
                    Projects
                  </span>
                </div>

                <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs text-center">
                  <Award className="w-5 h-5 text-amber-500 mx-auto mb-1" />
                  <span className="block text-xl font-extrabold text-[#142B4A]">
                    {stats.publishedCertifications}
                  </span>
                  <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">
                    Certs
                  </span>
                </div>

                <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs text-center">
                  <GraduationCap className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                  <span className="block text-xl font-extrabold text-[#142B4A]">
                    {stats.totalEducation}
                  </span>
                  <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">
                    Degrees
                  </span>
                </div>

                <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs text-center">
                  <Briefcase className="w-5 h-5 text-indigo-600 mx-auto mb-1" />
                  <span className="block text-xl font-extrabold text-[#142B4A]">
                    {stats.totalExperiences}
                  </span>
                  <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">
                    Roles
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Instant Resume Download Modal */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
        resumes={resumes}
      />
    </>
  );
}
