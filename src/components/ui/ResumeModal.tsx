'use client';

import React from 'react';
import { X, FileText, Download, CheckCircle2 } from 'lucide-react';
import { ResumeDocument } from '@/types/database';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  resumes: ResumeDocument[];
}

export default function ResumeModal({ isOpen, onClose, resumes }: ResumeModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl border border-slate-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#142B4A] flex items-center justify-center font-bold">
            <FileText className="w-5 h-5 text-[#3478C9]" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#3478C9] block">
              Recruiter Quick Access
            </span>
            <h3 className="text-xl font-bold text-[#142B4A] tracking-tight">
              Download Verified Resume (PDF)
            </h3>
          </div>
        </div>

        <p className="text-xs text-slate-500 mt-2 mb-6">
          Select an ATS-optimized resume tailored to your organization&apos;s job opening:
        </p>

        {/* Resumes List */}
        <div className="space-y-3">
          {resumes.map((doc) => (
            <div
              key={doc.id}
              className={`p-4 rounded-2xl border transition-all ${
                doc.is_featured
                  ? 'bg-blue-50/40 border-[#3478C9] ring-1 ring-[#3478C9]/30'
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100/70'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#142B4A]">
                      {doc.title}
                    </span>
                    {doc.is_featured && (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#142B4A] text-white">
                        Recommended
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-[#3478C9] font-semibold block mt-0.5">
                    Target: {doc.target_role}
                  </span>
                </div>

                <a
                  href={doc.file_url}
                  download
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#142B4A] hover:bg-[#203F66] text-white text-xs font-semibold shrink-0 shadow-2xs transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>PDF</span>
                </a>
              </div>

              {doc.description && (
                <p className="text-xs text-slate-600 leading-relaxed mb-2">
                  {doc.description}
                </p>
              )}

              <div className="flex items-center gap-3 text-[10px] text-slate-400 font-medium">
                {doc.file_size && <span>File size: {doc.file_size}</span>}
                <span>Verified ATS format</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1 text-emerald-700 font-semibold text-[11px]">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            100% ATS-Compliant & Clean Layout
          </span>
          <button
            onClick={onClose}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
