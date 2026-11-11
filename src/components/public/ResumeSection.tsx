'use client';

import React from 'react';
import { FileText, Download, CheckCircle, Sparkles } from 'lucide-react';
import { ResumeDocument } from '@/types/database';

interface ResumeSectionProps {
  resumes: ResumeDocument[];
}

export default function ResumeSection({ resumes }: ResumeSectionProps) {
  if (!resumes || resumes.length === 0) return null;

  return (
    <section id="resumes" className="py-20 bg-[#F8FAFC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#142B4A] text-xs font-bold uppercase tracking-wider mb-3">
            Verified Resumes
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#142B4A] tracking-tight">
            Curriculum Vitae & Role-Specific Resumes
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Download verified, ATS-friendly resumes tailored to specialized analytics and reporting functions.
          </p>
        </div>

        {/* Resumes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {resumes.map((doc) => (
            <div
              key={doc.id}
              className={`rounded-2xl border p-6 sm:p-8 shadow-xs card-hover flex flex-col justify-between ${
                doc.is_featured
                  ? 'bg-white border-[#3478C9] ring-2 ring-[#3478C9]/20'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#142B4A] flex items-center justify-center font-bold">
                    <FileText className="w-6 h-6 text-[#3478C9]" />
                  </div>
                  {doc.is_featured && (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-[#142B4A] bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                      <Sparkles className="w-3.5 h-3.5 text-[#3478C9]" />
                      Recommended
                    </span>
                  )}
                </div>

                <div className="text-xs font-bold uppercase tracking-wider text-[#3478C9] mb-1">
                  Target: {doc.target_role}
                </div>

                <h3 className="text-xl font-bold text-[#142B4A] tracking-tight">
                  {doc.title}
                </h3>

                {doc.description && (
                  <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {doc.description}
                  </p>
                )}

                <div className="mt-4 flex items-center gap-4 text-xs text-slate-400 font-medium">
                  {doc.file_size && <span>Size: {doc.file_size}</span>}
                  {doc.upload_date && <span>Updated: {doc.upload_date}</span>}
                </div>
              </div>

              {/* Download Action */}
              <div className="mt-6 pt-5 border-t border-slate-100">
                <a
                  href={doc.file_url}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all shadow-xs ${
                    doc.is_featured
                      ? 'bg-[#142B4A] text-white hover:bg-[#203F66]'
                      : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                  }`}
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF Document</span>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
