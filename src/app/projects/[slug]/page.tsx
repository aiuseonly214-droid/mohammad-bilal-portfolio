import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  ExternalLink,
  Calendar,
  CheckCircle2,
  Layers,
  FileText,
  Lightbulb,
  Target,
  Sparkles
} from 'lucide-react';
import { getProjectBySlug, getProfile, getCollection } from '@/lib/db';
import { SocialLink } from '@/types/database';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import { GithubIcon } from '@/components/ui/BrandIcons';

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project || !project.is_published) {
    notFound();
  }

  const profile = await getProfile();
  const socialLinks = await getCollection<SocialLink>('social_links', true);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar socialLinks={socialLinks} />

      <main className="flex-grow pt-28 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Back link */}
          <div className="mb-8">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-[#142B4A] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Portfolio Projects</span>
            </Link>
          </div>

          {/* Project Header Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm mb-10">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-[#3478C9] border border-blue-200">
                {project.category}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200">
                {project.status || 'Completed'}
              </span>
              {project.start_date && (
                <span className="flex items-center gap-1 text-xs text-slate-500 font-medium ml-2">
                  <Calendar className="w-3.5 h-3.5" />
                  {project.start_date} – {project.completion_date || 'Present'}
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#142B4A] tracking-tight leading-tight">
              {project.title}
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              {project.short_description}
            </p>

            {/* Links CTA */}
            <div className="mt-6 flex flex-wrap gap-3">
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-800 text-sm font-semibold hover:bg-slate-50 shadow-xs transition-all"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>View Repository on GitHub</span>
                </a>
              )}
              {project.live_demo_url && (
                <a
                  href={project.live_demo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#142B4A] text-white text-sm font-semibold hover:bg-[#203F66] shadow-sm transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Launch Live Interactive Demo</span>
                </a>
              )}
              {project.documentation_url && (
                <a
                  href={project.documentation_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-50 text-[#3478C9] text-sm font-semibold hover:bg-blue-100 transition-all"
                >
                  <FileText className="w-4 h-4" />
                  <span>Technical Documentation</span>
                </a>
              )}
            </div>
          </div>

          {/* Screenshots Gallery if available */}
          {project.screenshots && project.screenshots.length > 0 && (
            <div className="mb-10 space-y-4">
              <h2 className="text-xl font-bold text-[#142B4A]">
                Visual Showcase & Dashboards
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.screenshots.map((shot, idx) => (
                  <div
                    key={idx}
                    className="relative h-72 sm:h-80 rounded-2xl overflow-hidden border border-slate-200 shadow-xs bg-slate-100"
                  >
                    <Image
                      src={shot}
                      alt={`${project.title} screenshot ${idx + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Core Case Study Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left 2 Cols: Narrative */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Detailed Description */}
              {project.detailed_description && (
                <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs">
                  <h3 className="text-lg font-bold text-[#142B4A] mb-3">
                    Project Overview & Architecture
                  </h3>
                  <p className="text-slate-700 leading-relaxed text-sm sm:text-base whitespace-pre-line">
                    {project.detailed_description}
                  </p>
                </div>
              )}

              {/* Problem Statement */}
              {project.problem_statement && (
                <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs">
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="w-5 h-5 text-rose-500" />
                    <h3 className="text-lg font-bold text-[#142B4A]">
                      The Problem Statement
                    </h3>
                  </div>
                  <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                    {project.problem_statement}
                  </p>
                </div>
              )}

              {/* Objectives */}
              {project.objectives && (
                <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs">
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="w-5 h-5 text-amber-500" />
                    <h3 className="text-lg font-bold text-[#142B4A]">
                      Strategic Objectives
                    </h3>
                  </div>
                  <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                    {project.objectives}
                  </p>
                </div>
              )}

              {/* Key Features */}
              {project.key_features && project.key_features.length > 0 && (
                <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs">
                  <h3 className="text-lg font-bold text-[#142B4A] mb-4">
                    Key Features & Technical Implementations
                  </h3>
                  <ul className="space-y-3">
                    {project.key_features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-slate-700 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Learnings & Future Roadmaps */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.key_learnings && (
                  <div className="bg-blue-50/60 p-6 rounded-2xl border border-blue-200 shadow-xs">
                    <h4 className="text-sm font-bold text-[#142B4A] mb-2 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-[#3478C9]" />
                      Key Learnings
                    </h4>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {project.key_learnings}
                    </p>
                  </div>
                )}

                {project.future_improvements && (
                  <div className="bg-slate-100 p-6 rounded-2xl border border-slate-200 shadow-xs">
                    <h4 className="text-sm font-bold text-[#142B4A] mb-2">
                      Future Improvements
                    </h4>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {project.future_improvements}
                    </p>
                  </div>
                )}
              </div>

            </div>

            {/* Right Col: Metadata Sidebar */}
            <div className="space-y-6">
              {/* Tech Stack */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies_used.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-lg bg-slate-100 text-xs font-semibold text-slate-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {project.tools_frameworks && project.tools_frameworks.length > 0 && (
                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                      Tools & Frameworks
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tools_frameworks.map((tool) => (
                        <span
                          key={tool}
                          className="px-2.5 py-1 rounded-md bg-blue-50 text-[11px] font-medium text-[#203F66]"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Author / Owner Card */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs text-center">
                <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-3 relative bg-slate-200">
                  <Image
                    src={profile.profile_photo_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80'}
                    alt={profile.full_name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
                <h4 className="font-bold text-[#142B4A] text-sm">{profile.full_name}</h4>
                <p className="text-xs text-slate-500 mt-0.5">{profile.headline}</p>
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <Link
                    href="/#contact"
                    className="block w-full py-2 rounded-lg bg-[#142B4A] text-white text-xs font-semibold hover:bg-[#203F66] transition-colors"
                  >
                    Contact About This Project
                  </Link>
                </div>
              </div>

            </div>

          </div>

        </div>
      </main>

      <Footer
        profile={profile}
        socialLinks={socialLinks}
      />
    </div>
  );
}
