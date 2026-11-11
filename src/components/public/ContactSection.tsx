'use client';

import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2, AlertCircle, Phone, MapPin } from 'lucide-react';
import { Profile, SocialLink } from '@/types/database';

interface ContactSectionProps {
  profile: Profile;
  socialLinks: SocialLink[];
}

export default function ContactSection({ profile, socialLinks }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '' // Spam protection trap
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '', honeypot: '' });
    } catch (err: unknown) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#142B4A] text-xs font-bold uppercase tracking-wider mb-3">
            Get In Touch
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#142B4A] tracking-tight">
            Connect With Mohammad Bilal
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Open to full-time data analyst roles, business intelligence consulting, and technical collaboration.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
          
          {/* Left Column: Direct Contact Info & Socials */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#F8FAFC] p-8 rounded-2xl border border-slate-200 shadow-xs">
              <h3 className="text-xl font-bold text-[#142B4A] mb-4">
                Direct Contact Channels
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
                Feel free to email directly or send a message via LinkedIn or WhatsApp for quick professional communication.
              </p>

              <div className="space-y-4">
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-slate-200/80 hover:border-[#3478C9] hover:bg-blue-50/40 transition-colors shadow-2xs group"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#3478C9] flex items-center justify-center font-bold group-hover:bg-[#3478C9] group-hover:text-white transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                      Email Address
                    </span>
                    <span className="text-sm font-semibold text-[#142B4A]">
                      {profile.email}
                    </span>
                  </div>
                </a>

                {profile.phone && (
                  <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                    <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                        Direct Phone / WhatsApp
                      </span>
                      <span className="text-sm font-semibold text-[#142B4A]">
                        {profile.phone}
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center font-bold">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                      Location
                    </span>
                    <span className="text-sm font-semibold text-[#142B4A]">
                      {profile.location} (Open to Remote & Relocation)
                    </span>
                  </div>
                </div>
              </div>

              {/* Dynamic Social Links */}
              {socialLinks && socialLinks.length > 0 && (
                <div className="mt-8 pt-6 border-t border-slate-200/80">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
                    Professional Networks
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {socialLinks.map((link) => (
                      <a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-2 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:text-[#142B4A] hover:bg-slate-100 transition-colors shadow-2xs"
                      >
                        {link.custom_label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Secure Contact Form */}
          <div className="lg:col-span-7 bg-[#F8FAFC] p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-xs">
            <h3 className="text-xl font-bold text-[#142B4A] mb-2">
              Send a Direct Message
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Recruiters, hiring managers and visitors can leave an inquiry below. Messages are recorded securely in the database.
            </p>

            {status === 'success' && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">Message Sent Successfully!</span>
                  <span>Thank you. Mohammad Bilal has received your message and will respond shortly.</span>
                </div>
              </div>
            )}

            {status === 'error' && (
              <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">Submission Error</span>
                  <span>{errorMessage}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Spam Honeypot Field */}
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe / Tech Recruiter"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#3478C9] bg-white shadow-2xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="john@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#3478C9] bg-white shadow-2xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Subject *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Data Analyst Opportunity / Interview Invitation"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#3478C9] bg-white shadow-2xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Message *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Share details regarding the role, requirements or questions..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#3478C9] bg-white shadow-2xs resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-[#142B4A] text-white font-semibold text-sm hover:bg-[#203F66] shadow-sm transition-all disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{status === 'submitting' ? 'Submitting...' : 'Send Message'}</span>
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
