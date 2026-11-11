'use client';

import React, { useState } from 'react';
import { GraduationCap, Calendar, MapPin, Award, FileText, LayoutGrid, GitCommit } from 'lucide-react';
import { EducationRecord } from '@/types/database';

interface AcademicSectionProps {
  education: EducationRecord[];
}

export default function AcademicSection({ education }: AcademicSectionProps) {
  const [viewMode, setViewMode] = useState<'timeline' | 'cards'>('timeline');

  if (!education || education.length === 0) {
    return null;
  }

  return (
    <section id="academics" className="py-20 bg-[#F8FAFC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header with View Toggle */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#142B4A] text-xs font-bold uppercase tracking-wider mb-2">
              Formal Education
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#142B4A] tracking-tight">
              Academic Background
            </h2>
            <p className="mt-1 text-sm sm:text-base text-slate-600">
              Verified degrees, academic credentials, and foundational coursework.
            </p>
          </div>

          {/* Toggle buttons */}
          <div className="inline-flex items-center p-1 rounded-lg bg-slate-200/80 border border-slate-300">
            <button
              onClick={() => setViewMode('timeline')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${viewMode === 'timeline'
                  ? 'bg-white text-[#142B4A] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
                }`}
            >
              <GitCommit className="w-3.5 h-3.5" />
              <span>Timeline View</span>
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${viewMode === 'cards'
                  ? 'bg-white text-[#142B4A] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
                }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Card Grid</span>
            </button>
          </div>
        </div>

        {/* View Mode: Timeline */}
        {viewMode === 'timeline' && (
          <div className="relative border-l-2 border-blue-200 ml-4 sm:ml-8 space-y-12">
            {education.map((item) => (
              <div key={item.id} className="relative pl-6 sm:pl-10 group">
                {/* Timeline Dot */}
                <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-white border-2 border-[#142B4A] flex items-center justify-center text-[#142B4A] group-hover:bg-[#142B4A] group-hover:text-white transition-colors shadow-xs">
                  <GraduationCap className="w-4 h-4" />
                </div>

                <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs card-hover">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#3478C9] bg-blue-50 px-2.5 py-1 rounded-md inline-block w-fit">
                      {item.start_year} — {item.completion_year}
                    </span>
                    {item.grade_percentage_cgpa && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 w-fit">
                        <Award className="w-3.5 h-3.5" />
                        Grade: {item.grade_percentage_cgpa}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-[#142B4A] tracking-tight">
                    {item.qualification}
                  </h3>

                  <div className="mt-1 flex flex-wrap items-center gap-y-1 gap-x-4 text-sm text-slate-600 font-medium">
                    <span className="text-slate-800 font-semibold">{item.institution_name}</span>
                    {item.course_stream && <span>• {item.course_stream}</span>}
                    {item.board_university && <span>• {item.board_university}</span>}
                    {item.location && (
                      <span className="flex items-center gap-1 text-slate-500">
                        <MapPin className="w-3.5 h-3.5" />
                        {item.location}
                      </span>
                    )}
                  </div>

                  {item.description && (
                    <p className="mt-4 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {item.description}
                    </p>
                  )}

                  {item.supporting_document_url && (
                    <div className="mt-4 pt-3 border-t border-slate-100">
                      <a
                        href={item.supporting_document_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#3478C9] hover:underline"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        View Credential Document
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View Mode: Card Grid */}
        {viewMode === 'cards' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {education.map((item) => (
              <div
                key={item.id}
                className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between card-hover"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#142B4A] flex items-center justify-center font-bold">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    {item.grade_percentage_cgpa && (
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                        {item.grade_percentage_cgpa}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-[#142B4A]">
                    {item.qualification}
                  </h3>
                  <p className="text-sm font-semibold text-slate-800 mt-1">
                    {item.institution_name}
                  </p>

                  <div className="mt-2 text-xs text-slate-500 space-y-1">
                    {item.course_stream && <p>Stream: {item.course_stream}</p>}
                    {item.board_university && <p>Affiliation: {item.board_university}</p>}
                    <p className="flex items-center gap-1 text-slate-500 pt-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.start_year} – {item.completion_year}
                      {item.location && <span>• {item.location}</span>}
                    </p>
                  </div>

                  {item.description && (
                    <p className="mt-4 text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg">
                      {item.description}
                    </p>
                  )}
                </div>

                {item.supporting_document_url && (
                  <div className="mt-6 pt-3 border-t border-slate-100">
                    <a
                      href={item.supporting_document_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#3478C9] hover:underline"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      View Supporting Certificate
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
