'use client';

import React, { useState } from 'react';
import { Database, BarChart2, Code, Terminal, Sparkles, FileSpreadsheet, CheckCircle2 } from 'lucide-react';
import { TechnicalSkill } from '@/types/database';

interface SkillsSectionProps {
  skills: TechnicalSkill[];
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  if (!skills || skills.length === 0) return null;

  // Extract unique categories
  const categories = ['All', ...Array.from(new Set(skills.map((s) => s.category)))];

  const filteredSkills = selectedCategory === 'All'
    ? skills
    : skills.filter((s) => s.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    const c = category.toLowerCase();
    if (c.includes('sql') || c.includes('database')) return <Database className="w-4 h-4 text-[#3478C9]" />;
    if (c.includes('power bi') || c.includes('tableau') || c.includes('analytics')) return <BarChart2 className="w-4 h-4 text-amber-500" />;
    if (c.includes('excel')) return <FileSpreadsheet className="w-4 h-4 text-emerald-600" />;
    if (c.includes('python') || c.includes('programming')) return <Code className="w-4 h-4 text-indigo-500" />;
    if (c.includes('ai')) return <Sparkles className="w-4 h-4 text-purple-500" />;
    return <Terminal className="w-4 h-4 text-slate-600" />;
  };

  return (
    <section id="skills" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-[#142B4A] text-xs font-bold uppercase tracking-wider mb-3">
            Core Competencies
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#142B4A] tracking-tight">
            Technical Skillset
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Validated technical proficiencies in database querying, data analytics pipelines, and business intelligence reporting.
          </p>

          {/* Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
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

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className="bg-[#F8FAFC] p-6 rounded-2xl border border-slate-200/90 shadow-xs card-hover flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-md bg-white border border-slate-200 shadow-2xs">
                      {getCategoryIcon(skill.category)}
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      {skill.category}
                    </span>
                  </div>

                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-blue-50 text-[#3478C9] border border-blue-200">
                    {skill.proficiency_level}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#142B4A] tracking-tight">
                  {skill.skill_name}
                </h3>

                {skill.description && (
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                    {skill.description}
                  </p>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/60">
                {/* Visual Proficiency Bar */}
                {skill.proficiency_percentage !== undefined && (
                  <div>
                    <div className="flex justify-between items-center text-xs font-medium text-slate-500 mb-1.5">
                      <span>Proficiency</span>
                      <span className="font-bold text-[#142B4A]">{skill.proficiency_percentage}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#142B4A] to-[#3478C9] rounded-full transition-all duration-700"
                        style={{ width: `${skill.proficiency_percentage}%` }}
                      />
                    </div>
                  </div>
                )}

                {skill.duration_experience && (
                  <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                    <span>Experience Duration</span>
                    <span className="text-slate-800 font-semibold">{skill.duration_experience}</span>
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
