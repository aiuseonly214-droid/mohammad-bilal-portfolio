'use client';

import React from 'react';
import { Briefcase, Calendar, CheckCircle2, Sparkles } from 'lucide-react';
import { Experience } from '@/types/database';

interface ExperienceSectionProps {
  experiences: Experience[];
}

export default function ExperienceSection({ experiences }: ExperienceSectionProps) {
  if (!experiences || experiences.length === 0) return null;

  return (
    <section id="experience" className="py-20 bg-[#F8FAFC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#142B4A] text-xs font-bold uppercase tracking-wider mb-3">
            Career Journey
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#142B4A] tracking-tight">
            Professional Experience & Internships
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Real-world industry contributions, analytics pipeline optimization, and executive reporting experience.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="relative border-l-2 border-blue-200 ml-4 sm:ml-8 space-y-12">
          {experiences.map((exp) => (
            <div key={exp.id} className="relative pl-6 sm:pl-10 group">
              {/* Timeline Dot */}
              <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-white border-2 border-[#142B4A] flex items-center justify-center text-[#142B4A] group-hover:bg-[#142B4A] group-hover:text-white transition-colors shadow-xs">
                <Briefcase className="w-4 h-4" />
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs card-hover">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#3478C9] bg-blue-50 px-2.5 py-1 rounded-md">
                      {exp.employment_type}
                    </span>
                    {exp.is_current && (
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                        Present
                      </span>
                    )}
                  </div>

                  <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {exp.start_date} – {exp.is_current ? 'Present' : exp.end_date}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[#142B4A] tracking-tight">
                  {exp.designation}
                </h3>
                <p className="text-sm sm:text-base font-semibold text-[#3478C9] mt-0.5">
                  {exp.organisation}
                </p>

                {/* Responsibilities list */}
                <div className="mt-4 space-y-2">
                  {exp.responsibilities.split('\n').filter(Boolean).map((resp, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{resp.replace(/^[•\-\*]\s*/, '')}</span>
                    </div>
                  ))}
                </div>

                {/* Major Contributions */}
                {exp.major_contributions && (
                  <div className="mt-5 p-4 rounded-xl bg-blue-50/60 border border-blue-200/80 text-xs sm:text-sm">
                    <span className="font-bold text-[#142B4A] block mb-1 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-[#3478C9]" />
                      Key Business Contribution:
                    </span>
                    <p className="text-slate-700 leading-relaxed">{exp.major_contributions}</p>
                  </div>
                )}

                {/* Skills Developed */}
                {exp.skills_developed && exp.skills_developed.length > 0 && (
                  <div className="mt-5 pt-4 border-t border-slate-100">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                      Skills Applied & Developed
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.skills_developed.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 rounded-md bg-slate-100 text-[11px] font-semibold text-slate-700"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
