'use client';

import React from 'react';
import { Mic, Video, Calendar, Sparkles, Award } from 'lucide-react';
import { CommunicationMilestone } from '@/types/database';

interface CommunicationSectionProps {
  milestones: CommunicationMilestone[];
}

export default function CommunicationSection({ milestones }: CommunicationSectionProps) {
  if (!milestones || milestones.length === 0) return null;

  return (
    <section className="py-20 bg-[#F8FAFC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#142B4A] text-xs font-bold uppercase tracking-wider mb-3">
            Growth & Public Presence
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#142B4A] tracking-tight">
            Communication & Speaking Journey
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Deliberate progression from linguistic hesitation to confident keynote presenting and technical symposium delivery.
          </p>
        </div>

        {/* Milestone Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {milestones.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs card-hover flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#3478C9] flex items-center justify-center font-bold">
                    <Mic className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-md">
                    {item.date}
                  </span>
                </div>

                <span className="text-xs font-bold uppercase tracking-wider text-[#3478C9] block mb-1">
                  {item.milestone_type}
                </span>

                <h3 className="text-xl font-bold text-[#142B4A] tracking-tight">
                  {item.milestone_title}
                </h3>

                {item.event_name && (
                  <p className="text-xs font-semibold text-slate-500 mt-1">
                    Forum: {item.event_name}
                  </p>
                )}

                <p className="mt-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {item.key_learning && (
                <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700">
                  <span className="font-bold text-[#142B4A] block mb-1 uppercase tracking-wider text-[10px] flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    Key Personal Insight:
                  </span>
                  <p className="italic text-slate-600">&ldquo;{item.key_learning}&rdquo;</p>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
