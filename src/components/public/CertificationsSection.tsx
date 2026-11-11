'use client';

import React, { useState } from 'react';
import { Award, ExternalLink, FileCheck, CheckCircle2, ShieldCheck, X } from 'lucide-react';
import { Certification } from '@/types/database';

interface CertificationsSectionProps {
  certifications: Certification[];
}

export default function CertificationsSection({ certifications }: CertificationsSectionProps) {
  const [activeCert, setActiveCert] = useState<Certification | null>(null);

  if (!certifications || certifications.length === 0) return null;

  return (
    <section id="certifications" className="py-20 bg-[#F8FAFC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold uppercase tracking-wider mb-3">
            Industry Credentials
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#142B4A] tracking-tight">
            Professional Certifications
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Formal verifications from leading industry authorities and accredited institutions.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs card-hover flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                    <Award className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                    {cert.issue_date}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#142B4A] tracking-tight">
                  {cert.title}
                </h3>

                <p className="mt-1 text-xs font-bold text-[#3478C9]">
                  {cert.issuing_organisation}
                </p>

                {cert.credential_id && (
                  <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200 text-[11px] font-mono text-slate-600">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>ID: {cert.credential_id}</span>
                  </div>
                )}

                {cert.description && (
                  <p className="mt-3 text-xs text-slate-600 leading-relaxed">
                    {cert.description}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => setActiveCert(cert)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 hover:text-[#142B4A] transition-colors"
                >
                  <FileCheck className="w-3.5 h-3.5 text-[#3478C9]" />
                  <span>Preview Details</span>
                </button>

                {cert.verification_url && (
                  <a
                    href={cert.verification_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#3478C9] hover:text-[#142B4A] transition-colors"
                  >
                    <span>Verify</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Preview Modal */}
      {activeCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl">
            <button
              onClick={() => setActiveCert(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <Award className="w-5 h-5 text-amber-500" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Official Credential Preview
              </span>
            </div>

            <h3 className="text-xl font-bold text-[#142B4A]">
              {activeCert.title}
            </h3>
            <p className="text-sm font-semibold text-[#3478C9] mt-0.5">
              Issued by {activeCert.issuing_organisation}
            </p>

            <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Issue Date:</span>
                <span className="font-bold text-slate-800">{activeCert.issue_date}</span>
              </div>
              {activeCert.expiry_date && (
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Expiry Date:</span>
                  <span className="font-bold text-slate-800">{activeCert.expiry_date}</span>
                </div>
              )}
              {activeCert.credential_id && (
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Credential ID:</span>
                  <span className="font-mono font-bold text-slate-800">{activeCert.credential_id}</span>
                </div>
              )}
            </div>

            {activeCert.description && (
              <p className="mt-4 text-xs text-slate-600 leading-relaxed">
                {activeCert.description}
              </p>
            )}

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end gap-3">
              {activeCert.verification_url && (
                <a
                  href={activeCert.verification_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#142B4A] text-white text-xs font-semibold hover:bg-[#203F66]"
                >
                  <span>Verify at {activeCert.issuing_organisation}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

