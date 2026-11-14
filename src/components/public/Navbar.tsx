'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, FileDown, Lock, Sparkles } from 'lucide-react';
import { SocialLink, ResumeDocument } from '@/types/database';
import ResumeModal from '@/components/ui/ResumeModal';

interface NavbarProps {
  socialLinks?: SocialLink[];
  resumes?: ResumeDocument[];
}

export default function Navbar({ resumes = [] }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenAi = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-ai-faq'));
    }
  };

  // Streamlined 5 Core Recruiter Anchors
  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills & Credentials', href: '#skills' },
    { name: 'Academics', href: '#academics' },
    { name: 'Activities', href: '#activities' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-3'
            : 'bg-white/80 backdrop-blur-sm py-4 border-b border-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo / Brand */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-lg bg-[#142B4A] text-white flex items-center justify-center font-bold text-lg shadow-sm group-hover:bg-[#203F66] transition-colors">
                MB
              </div>
              <div>
                <span className="text-lg font-bold text-[#142B4A] tracking-tight block group-hover:text-[#3478C9] transition-colors">
                  Mohammad Bilal
                </span>
                <span className="text-xs text-slate-500 font-medium block">
                  Data Analytics & BI Specialist
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-3 py-1.5 text-sm font-medium text-slate-700 hover:text-[#142B4A] hover:bg-slate-100 rounded-md transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Action CTAs (Desktop & Tablet) */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={handleOpenAi}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md bg-blue-50 text-[#3478C9] hover:bg-blue-100 border border-blue-200 transition-colors cursor-pointer"
                title="Ask AI Recruiter FAQ Assistant"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Ask AI FAQ
              </button>

              {/* 1-Click Instant Resume Download Modal */}
              <button
                onClick={() => setResumeModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-md bg-[#142B4A] text-white hover:bg-[#203F66] transition-all shadow-sm cursor-pointer"
              >
                <FileDown className="w-4 h-4" />
                <span>Resume (PDF)</span>
              </button>

              <Link
                href="/admin"
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
                title="Admin CMS Portal"
              >
                <Lock className="w-4 h-4" />
              </Link>
            </div>

            {/* Mobile & Tablet Hamburger Button */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={handleOpenAi}
                className="p-2 text-[#3478C9] hover:bg-blue-50 rounded-md"
                title="Ask AI FAQ"
              >
                <Sparkles className="w-5 h-5" />
              </button>
              <button
                onClick={() => setResumeModalOpen(true)}
                className="p-2 text-[#142B4A] hover:bg-slate-100 rounded-md"
                title="Download Resume"
              >
                <FileDown className="w-5 h-5" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-slate-700 hover:bg-slate-100 focus:outline-none"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-3 shadow-lg">
            <div className="grid grid-cols-2 gap-2 pt-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-md"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setResumeModalOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold rounded-md bg-[#142B4A] text-white"
              >
                <FileDown className="w-4 h-4" />
                Download Resume (PDF)
              </button>
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-md border border-slate-200"
              >
                <Lock className="w-3.5 h-3.5" />
                Admin Portal
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Instant Resume Download Modal */}
      <ResumeModal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
        resumes={resumes}
      />
    </>
  );
}
