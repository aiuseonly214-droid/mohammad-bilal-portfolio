'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUp, Lock } from 'lucide-react';
import { Profile, SocialLink, WebsiteSettings } from '@/types/database';

interface FooterProps {
  profile: Profile;
  socialLinks: SocialLink[];
  settings?: WebsiteSettings;
}

export default function Footer({ profile, socialLinks, settings }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#142B4A] text-white pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-700/60">
          
          {/* Brand Info */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white text-[#142B4A] flex items-center justify-center font-bold text-lg">
                MB
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight block">
                  {profile.full_name}
                </span>
                <span className="text-xs text-slate-300 font-medium block">
                  {profile.headline}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 max-w-md leading-relaxed">
              {settings?.footer_text || 'Transforming raw data into actionable business intelligence through precision analytics and continuous learning.'}
            </p>
          </div>

          {/* Quick Section Links */}
          <div className="md:col-span-3 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
              Portfolio Navigation
            </span>
            <ul className="space-y-1.5 text-xs text-slate-300">
              <li><a href="#about" className="hover:text-white transition-colors">About Mohammad Bilal</a></li>
              <li><a href="#projects" className="hover:text-white transition-colors">Projects & Case Studies</a></li>
              <li><a href="#experience" className="hover:text-white transition-colors">Professional Experience</a></li>
              <li><a href="#skills" className="hover:text-white transition-colors">Technical Skills</a></li>
              <li><a href="#academics" className="hover:text-white transition-colors">Academic Profile</a></li>
              <li><a href="#activities" className="hover:text-white transition-colors">Activities & Gallery</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Get in Touch</a></li>
            </ul>
          </div>

          {/* Dynamic Social Links & Portal */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
              Connect & Verify
            </span>
            <div className="flex flex-col space-y-2 text-xs text-slate-300">
              {socialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-block"
                >
                  {link.custom_label} →
                </a>
              ))}
            </div>

            <div className="pt-2">
              <Link
                href="/admin"
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Admin CMS Portal</span>
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>{settings?.copyright_text || `© ${new Date().getFullYear()} Mohammad Bilal. All rights reserved.`}</p>
          
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
