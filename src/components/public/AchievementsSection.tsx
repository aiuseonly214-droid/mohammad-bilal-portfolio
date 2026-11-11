'use client';

import React from 'react';
import { Trophy, Calendar, Sparkles, Building, FileCheck } from 'lucide-react';
import { Achievement } from '@/types/database';

interface AchievementsSectionProps {
  achievements: Achievement[];
}

export default function AchievementsSection({ achievements }: AchievementsSectionProps) {
  if (!achievements || achievements.length === 0) return null;

  return (
    <section id="achievements" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold uppercase tracking-wider mb-3">
            Honors & Distinctions
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#142B4A] tracking-tight">
            Achievements & Awards
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Proven track record of competitive excellence, academic recognition, and hackathon victories.
          </p>
        </div>

        {/* Timeline & Cards Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {achievements.map((item) => (
            <div
              key={item.id}
              className="bg-[#F8FAFC] rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs card-hover flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shadow-xs">
                    <Trophy className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-slate-500 bg-white border border-slate-200 px-3 py-1 rounded-md">
                    {item.date}
                  </span>
                </div>

                <div className="text-xs font-bold uppercase tracking-wider text-[#3478C9] mb-1">
                  {item.category || 'Award'}
                </div>

                <h3 className="text-xl font-bold text-[#142B4A] tracking-tight">
                  {item.title}
                </h3>

                <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-600 font-medium">
                  <span className="text-slate-800 font-semibold">{item.awarding_organisation}</span>
                  {item.event_name && <span>• {item.event_name}</span>}
                </div>

                <p className="mt-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>

                {item.recognition_details && (
                  <div className="mt-4 p-3 rounded-xl bg-white border border-slate-200/80 text-xs font-medium text-slate-700">
                    <span className="font-bold text-[#142B4A] block text-[10px] uppercase tracking-wider mb-0.5">
                      Recognition Details:
                    </span>
                    {item.recognition_details}
                  </div>
                )}
              </div>

              {item.document_url && (
                <div className="mt-6 pt-4 border-t border-slate-200/60">
                  <a
                    href={item.document_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#3478C9] hover:underline"
                  >
                    <FileCheck className="w-3.5 h-3.5" />
                    <span>View Official Certificate / Evidence</span>
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

