'use client';

import React from 'react';
import { Target, Compass, BookOpen, Rocket } from 'lucide-react';
import { CareerGoal } from '@/types/database';

interface CareerGoalsSectionProps {
  goals: CareerGoal[];
}

export default function CareerGoalsSection({ goals }: CareerGoalsSectionProps) {
  if (!goals || goals.length === 0) return null;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Desired Job Roles':
        return <Target className="w-5 h-5 text-[#3478C9]" />;
      case 'Technologies Currently Learning':
        return <BookOpen className="w-5 h-5 text-emerald-600" />;
      case 'Future Goals':
        return <Rocket className="w-5 h-5 text-indigo-600" />;
      default:
        return <Compass className="w-5 h-5 text-amber-500" />;
    }
  };

  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-[#142B4A] text-xs font-bold uppercase tracking-wider mb-3">
            Trajectory
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#142B4A] tracking-tight">
            Career Goals & Aspirations
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Clear focus on targeted business intelligence roles, active learning pipelines, and long-term milestones.
          </p>
        </div>

        {/* Goals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {goals.map((item) => (
            <div
              key={item.id}
              className="bg-[#F8FAFC] rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs card-hover flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-2xs">
                      {getCategoryIcon(item.category)}
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      {item.category}
                    </span>
                  </div>

                  {item.target_timeline && (
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700">
                      Timeline: {item.target_timeline}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-[#142B4A] tracking-tight mt-2">
                  {item.title}
                </h3>

                {item.description && (
                  <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
