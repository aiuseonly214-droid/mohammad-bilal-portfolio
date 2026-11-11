'use client';

import React from 'react';
import { Users, Lightbulb, MessageSquare, Brain, Compass, Award } from 'lucide-react';
import { SoftSkill } from '@/types/database';

interface SoftSkillsSectionProps {
  softSkills: SoftSkill[];
}

export default function SoftSkillsSection({ softSkills }: SoftSkillsSectionProps) {
  if (!softSkills || softSkills.length === 0) return null;

  return (
    <section className="py-20 bg-[#F8FAFC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/80 text-[#142B4A] text-xs font-bold uppercase tracking-wider mb-3">
            Behavioral Strengths
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#142B4A] tracking-tight">
            Soft Skills & Professional Evidence
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Backed by genuine team outcomes, public speaking milestones, and demonstrated collaborative performance.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {softSkills.map((item) => (
            <div
              key={item.id}
              className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs card-hover flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#3478C9] flex items-center justify-center font-bold">
                    <Brain className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-[#142B4A]">
                    {item.title}
                  </h3>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>

                {item.real_life_evidence && (
                  <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 space-y-1">
                    <span className="font-bold text-[#142B4A] block uppercase tracking-wider text-[10px]">
                      Demonstrated Evidence
                    </span>
                    <p className="italic text-slate-600 leading-relaxed">
                      &ldquo;{item.real_life_evidence}&rdquo;
                    </p>
                  </div>
                )}
              </div>

              {item.associated_achievement && (
                <div className="mt-6 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-amber-700 bg-amber-50/70 p-2.5 rounded-lg border border-amber-200/50">
                  <Award className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Associated Recognition: {item.associated_achievement}</span>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
