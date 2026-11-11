'use client';

import React from 'react';
import { Target, Lightbulb, Compass, Award, BookOpen, Rocket } from 'lucide-react';
import { Profile } from '@/types/database';

interface AboutSectionProps {
  profile: Profile;
}

export default function AboutSection({ profile }: AboutSectionProps) {
  return (
    <section id="about" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-[#142B4A] text-xs font-bold uppercase tracking-wider mb-3">
            Professional Profile
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#142B4A] tracking-tight">
            About Mohammad Bilal
          </h2>
          <p className="mt-3 text-base text-slate-600">
            A disciplined, analytical approach to modern data challenges, continuous learning, and business impact.
          </p>
        </div>

        {/* Narrative & Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          <div className="lg:col-span-7 space-y-6 text-slate-700 leading-relaxed text-base sm:text-lg">
            <h3 className="text-2xl font-bold text-[#142B4A]">
              Biography & Analytical Foundation
            </h3>
            <p className="text-slate-600">
              {profile.bio}
            </p>
            {profile.personal_introduction && (
              <p className="text-slate-600">
                {profile.personal_introduction}
              </p>
            )}
            
            {/* Philosophy quote */}
            {profile.professional_philosophy && (
              <div className="p-6 rounded-xl bg-slate-50 border-l-4 border-[#3478C9] shadow-xs">
                <p className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-1">
                  Professional Philosophy
                </p>
                <p className="text-base italic text-slate-800 font-medium">
                  &ldquo;{profile.professional_philosophy}&rdquo;
                </p>
              </div>
            )}
          </div>

          {/* Pillars Grid */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {profile.career_interests && (
              <div className="p-5 rounded-xl border border-slate-200 bg-[#F8FAFC] card-hover">
                <Target className="w-6 h-6 text-[#3478C9] mb-3" />
                <h4 className="text-sm font-bold text-[#142B4A] mb-1">Career Interests</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{profile.career_interests}</p>
              </div>
            )}

            {profile.personal_strengths && (
              <div className="p-5 rounded-xl border border-slate-200 bg-[#F8FAFC] card-hover">
                <Award className="w-6 h-6 text-amber-500 mb-3" />
                <h4 className="text-sm font-bold text-[#142B4A] mb-1">Core Strengths</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{profile.personal_strengths}</p>
              </div>
            )}

            {profile.learning_mindset && (
              <div className="p-5 rounded-xl border border-slate-200 bg-[#F8FAFC] card-hover">
                <BookOpen className="w-6 h-6 text-emerald-600 mb-3" />
                <h4 className="text-sm font-bold text-[#142B4A] mb-1">Learning Mindset</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{profile.learning_mindset}</p>
              </div>
            )}

            {profile.future_ambitions && (
              <div className="p-5 rounded-xl border border-slate-200 bg-[#F8FAFC] card-hover">
                <Rocket className="w-6 h-6 text-indigo-600 mb-3" />
                <h4 className="text-sm font-bold text-[#142B4A] mb-1">Future Ambitions</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{profile.future_ambitions}</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
