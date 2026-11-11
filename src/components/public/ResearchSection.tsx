'use client';

import React, { useState } from 'react';
import { BookOpen, ExternalLink, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import { ResearchPublication } from '@/types/database';

interface ResearchSectionProps {
  publications: ResearchPublication[];
}

export default function ResearchSection({ publications }: ResearchSectionProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (!publications || publications.length === 0) return null;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Published':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Accepted':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Under Review':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-[#142B4A] text-xs font-bold uppercase tracking-wider mb-3">
            Academic Research
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#142B4A] tracking-tight">
            Research & Publications
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Rigorous investigation into database optimization, indexing algorithms, and empirical analytics.
          </p>
        </div>

        {/* Publications List */}
        <div className="space-y-6 max-w-4xl mx-auto">
          {publications.map((pub) => {
            const isExpanded = expandedId === pub.id;
            return (
              <div
                key={pub.id}
                className="bg-[#F8FAFC] rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs card-hover"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${getStatusBadge(pub.submission_status)}`}>
                    Status: {pub.submission_status}
                  </span>
                  {pub.publication_date && (
                    <span className="text-xs text-slate-500 font-medium">
                      {pub.publication_date}
                    </span>
                  )}
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-[#142B4A] tracking-tight">
                  {pub.title}
                </h3>

                <p className="mt-1 text-xs sm:text-sm font-semibold text-[#3478C9]">
                  {pub.publication_or_conference}
                </p>

                {pub.authors && pub.authors.length > 0 && (
                  <p className="mt-1 text-xs text-slate-500">
                    Authors: {pub.authors.join(', ')}
                  </p>
                )}

                {pub.abstract && (
                  <div className="mt-4">
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : pub.id)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-slate-700 hover:text-[#142B4A]"
                    >
                      <span>{isExpanded ? 'Hide Abstract' : 'Read Abstract'}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    {isExpanded && (
                      <div className="mt-3 p-4 rounded-xl bg-white border border-slate-200/80 text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {pub.abstract}
                      </div>
                    )}
                  </div>
                )}

                {pub.doi_or_url && (
                  <div className="mt-5 pt-4 border-t border-slate-200/60">
                    <a
                      href={pub.doi_or_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3478C9] hover:underline"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>DOI / Publication Reference Link</span>
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
