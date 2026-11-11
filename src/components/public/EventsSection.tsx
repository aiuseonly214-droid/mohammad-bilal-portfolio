'use client';

import React from 'react';
import { Calendar, MapPin, Users, Award, ExternalLink } from 'lucide-react';
import { EventItem } from '@/types/database';

interface EventsSectionProps {
  events: EventItem[];
}

export default function EventsSection({ events }: EventsSectionProps) {
  if (!events || events.length === 0) return null;

  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-[#142B4A] text-xs font-bold uppercase tracking-wider mb-3">
            Active Engagement
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#142B4A] tracking-tight">
            Workshops, Events & Activities
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Participation in specialized data masterclasses, college symposia, and technical coordination.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((ev) => (
            <div
              key={ev.id}
              className="bg-[#F8FAFC] rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs card-hover flex flex-col justify-between"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#3478C9] bg-blue-50 px-2.5 py-1 rounded-md">
                    {ev.category}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 bg-white border border-slate-200 px-2.5 py-1 rounded-md">
                    Role: {ev.participation_type}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#142B4A] tracking-tight">
                  {ev.title}
                </h3>

                <div className="mt-2 flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-600 font-medium">
                  {ev.organisation && <span className="text-slate-800 font-semibold">{ev.organisation}</span>}
                  <span className="flex items-center gap-1 text-slate-500">
                    <Calendar className="w-3.5 h-3.5" />
                    {ev.date}
                  </span>
                  {ev.venue && (
                    <span className="flex items-center gap-1 text-slate-500">
                      <MapPin className="w-3.5 h-3.5" />
                      {ev.venue}
                    </span>
                  )}
                </div>

                <p className="mt-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {ev.description}
                </p>
              </div>

              {ev.supporting_doc_url && (
                <div className="mt-5 pt-3 border-t border-slate-200/60">
                  <a
                    href={ev.supporting_doc_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#3478C9] hover:underline"
                  >
                    <span>View Participation Certificate</span>
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
