'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ExternalLink,
  Search,
  Layers,
  ArrowUpRight,
  CheckCircle,
  Eye,
  X,
  TrendingUp
} from 'lucide-react';
import { Project } from '@/types/database';
import { GithubIcon } from '@/components/ui/BrandIcons';

interface ProjectsSectionProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [previewProject, setPreviewProject] = useState<Project | null>(null);

  if (!projects || projects.length === 0) return null;

  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      project.title.toLowerCase().includes(query) ||
      project.short_description.toLowerCase().includes(query) ||
      project.technologies_used?.some((t) => t.toLowerCase().includes(query));
    return matchesCategory && matchesSearch;
  });

  const getImpactBadge = (project: Project) => {
    if (project.slug.includes('ecommerce')) {
      return 'Multi-Year Retail KPI Tracking & Star Schema';
    }
    if (project.slug.includes('fraud')) {
      return 'Processed 200,000+ Records with SMOTE';
    }
    if (project.slug.includes('hospital')) {
      return 'Reduced Reporting Latency by 68%';
    }
    return project.objectives ? project.objectives.slice(0, 45) + '...' : 'Data Analytics Pipeline';
  };

  return (
    <section id="projects" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#142B4A] text-xs font-bold uppercase tracking-wider mb-3">
            Featured Portfolio
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#142B4A] tracking-tight">
            Data Analytics & Engineering Projects
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Real-world analytics workflows, Power BI executive dashboards, normalized database schemas, and statistical pipelines.
          </p>

          {/* Search Bar */}
          <div className="mt-8 max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by project title, skill or technology (e.g. SQL, Power BI)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#3478C9] focus:border-transparent bg-white shadow-xs"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="mt-6 flex items-center gap-1.5 overflow-x-auto no-scrollbar max-w-full justify-start sm:justify-center pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 sm:px-3.5 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#142B4A] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200">
            <Layers className="w-10 h-10 text-slate-400 mx-auto mb-2" />
            <h3 className="text-base font-bold text-slate-700">No projects found</h3>
            <p className="text-xs text-slate-500 mt-1">Try adjusting your search query or filter category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-[#F8FAFC] rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs card-hover flex flex-col justify-between"
              >
                <div>
                  {/* Thumbnail */}
                  <div className="relative h-48 w-full bg-slate-200 overflow-hidden">
                    <Image
                      src={project.thumbnail_url || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80'}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute top-3 right-3 flex gap-2">
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-white/90 backdrop-blur-xs text-[#142B4A] shadow-xs">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6">
                    {/* Measurable Business Impact Pill (HR Recruiter Favorite) */}
                    <div className="mb-3">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold">
                        <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{getImpactBadge(project)}</span>
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-[#142B4A] tracking-tight line-clamp-2">
                      {project.title}
                    </h3>

                    <p className="mt-2 text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {project.short_description}
                    </p>

                    {/* Tech Badges */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.technologies_used?.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[11px] font-medium text-slate-700"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies_used?.length > 4 && (
                        <span className="px-2 py-0.5 rounded-md bg-slate-200 text-[10px] font-bold text-slate-600">
                          +{project.technologies_used.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="p-6 pt-0 border-t border-slate-200/50 mt-4 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setPreviewProject(project)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#142B4A] hover:text-[#3478C9] transition-colors py-2 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Quick Preview</span>
                  </button>

                  <div className="flex items-center gap-2">
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-[#142B4A] hover:bg-slate-100 transition-colors shadow-2xs"
                        title="GitHub Repository"
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>
                    )}
                    {project.live_demo_url && (
                      <a
                        href={project.live_demo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-blue-50 text-[#3478C9] hover:bg-blue-100 transition-colors shadow-2xs"
                        title="Live Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-[#142B4A] text-white text-xs font-semibold hover:bg-[#203F66] transition-colors shadow-2xs"
                    >
                      <span>Details</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Quick Preview Modal */}
      {previewProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl">
            <button
              onClick={() => setPreviewProject(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs font-bold uppercase tracking-wider text-[#3478C9] bg-blue-50 px-2.5 py-1 rounded-md">
              {previewProject.category}
            </span>

            <h3 className="text-2xl font-bold text-[#142B4A] mt-2">
              {previewProject.title}
            </h3>

            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              {previewProject.short_description}
            </p>

            {previewProject.problem_statement && (
              <div className="mt-4 p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs">
                <span className="font-bold text-amber-900 block mb-1">Problem Statement:</span>
                <p className="text-amber-800 leading-relaxed">{previewProject.problem_statement}</p>
              </div>
            )}

            {previewProject.key_features && previewProject.key_features.length > 0 && (
              <div className="mt-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Key Technical Features
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {previewProject.key_features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {previewProject.key_learnings && (
              <div className="mt-4 p-4 rounded-xl bg-blue-50/60 border border-blue-200 text-xs">
                <span className="font-bold text-[#142B4A] block mb-1">Key Learnings & Takeaways:</span>
                <p className="text-slate-700 leading-relaxed">{previewProject.key_learnings}</p>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              <Link
                href={`/projects/${previewProject.slug}`}
                className="text-xs font-bold text-[#3478C9] hover:underline"
              >
                View Complete Case Study Page →
              </Link>

              <div className="flex gap-2">
                {previewProject.github_url && (
                  <a
                    href={previewProject.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    GitHub
                  </a>
                )}
                {previewProject.live_demo_url && (
                  <a
                    href={previewProject.live_demo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#142B4A] text-white text-xs font-semibold hover:bg-[#203F66]"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
