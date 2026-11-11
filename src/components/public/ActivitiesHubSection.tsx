'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Mic,
  Calendar,
  BookOpen,
  Image as ImageIcon,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Eye,
  X
} from 'lucide-react';
import {
  ResearchPublication,
  CommunicationMilestone,
  EventItem,
  GalleryMedia
} from '@/types/database';

interface ActivitiesHubProps {
  publications: ResearchPublication[];
  communication: CommunicationMilestone[];
  events: EventItem[];
  gallery: GalleryMedia[];
}

export default function ActivitiesHubSection({
  publications,
  communication,
  events,
  gallery,
}: ActivitiesHubProps) {
  const [activeTab, setActiveTab] = useState<'speaking' | 'events' | 'research' | 'gallery'>('speaking');
  const [expandedResearchId, setExpandedResearchId] = useState<string | null>(null);
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<GalleryMedia | null>(null);

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
    <section id="activities" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-[#142B4A] text-xs font-bold uppercase tracking-wider mb-3">
            Leadership & Campus Engagements
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#142B4A] tracking-tight">
            Activities, Public Speaking & Gallery
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            A cohesive record of technical workshops, English communication growth, academic research, and gallery highlights.
          </p>

          {/* Tab Switcher Pills */}
          <div className="mt-8 inline-flex p-1.5 rounded-2xl bg-slate-100 border border-slate-200 flex-wrap justify-center gap-1">
            <button
              onClick={() => setActiveTab('speaking')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'speaking'
                  ? 'bg-white text-[#142B4A] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Mic className="w-3.5 h-3.5 text-[#3478C9]" />
              <span>Speaking & Growth ({communication.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('events')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'events'
                  ? 'bg-white text-[#142B4A] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Calendar className="w-3.5 h-3.5 text-amber-500" />
              <span>Workshops & Events ({events.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('research')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'research'
                  ? 'bg-white text-[#142B4A] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
              <span>Research Papers ({publications.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('gallery')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'gallery'
                  ? 'bg-white text-[#142B4A] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5 text-indigo-600" />
              <span>Photo Gallery ({gallery.length})</span>
            </button>
          </div>
        </div>

        {/* TAB 1: COMMUNICATION & SPEAKING JOURNEY */}
        {activeTab === 'speaking' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-300">
            {communication.map((item) => (
              <div
                key={item.id}
                className="bg-[#F8FAFC] rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col justify-between card-hover"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#3478C9] bg-blue-50 px-2.5 py-1 rounded-md">
                      {item.milestone_type}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 bg-white border border-slate-200 px-2.5 py-1 rounded-md">
                      {item.date}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#142B4A]">
                    {item.milestone_title}
                  </h3>

                  {item.event_name && (
                    <p className="text-xs font-semibold text-slate-500 mt-1">
                      Forum: {item.event_name}
                    </p>
                  )}

                  <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {item.key_learning && (
                  <div className="mt-5 p-3.5 rounded-xl bg-white border border-slate-200/80 text-xs text-slate-700">
                    <span className="font-bold text-[#142B4A] block mb-0.5 text-[10px] uppercase tracking-wider flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      Key Growth Insight:
                    </span>
                    <p className="italic text-slate-600">&ldquo;{item.key_learning}&rdquo;</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: WORKSHOPS & EVENTS */}
        {activeTab === 'events' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-300">
            {events.map((ev) => (
              <div
                key={ev.id}
                className="bg-[#F8FAFC] rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col justify-between card-hover"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#3478C9] bg-blue-50 px-2.5 py-1 rounded-md">
                      {ev.category}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 bg-white border border-slate-200 px-2.5 py-1 rounded-md">
                      Role: {ev.participation_type}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#142B4A]">
                    {ev.title}
                  </h3>

                  <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500 font-medium">
                    {ev.organisation && <span className="text-slate-800 font-semibold">{ev.organisation}</span>}
                    <span>• {ev.date}</span>
                    {ev.venue && <span>• {ev.venue}</span>}
                  </div>

                  <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {ev.description}
                  </p>
                </div>

                {ev.supporting_doc_url && (
                  <div className="mt-5 pt-3 border-t border-slate-200/60">
                    <a
                      href={ev.supporting_doc_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-[#3478C9] hover:underline"
                    >
                      View Participation Certificate →
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: RESEARCH & PAPERS */}
        {activeTab === 'research' && (
          <div className="space-y-4 max-w-4xl mx-auto animate-in fade-in duration-300">
            {publications.map((pub) => {
              const isExpanded = expandedResearchId === pub.id;
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

                  <h3 className="text-lg sm:text-xl font-bold text-[#142B4A]">
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
                        onClick={() => setExpandedResearchId(isExpanded ? null : pub.id)}
                        className="inline-flex items-center gap-1 text-xs font-bold text-slate-700 hover:text-[#142B4A] cursor-pointer"
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
                    <div className="mt-5 pt-3 border-t border-slate-200/60">
                      <a
                        href={pub.doi_or_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#3478C9] hover:underline"
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
        )}

        {/* TAB 4: PHOTO GALLERY */}
        {activeTab === 'gallery' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
            {gallery.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedGalleryItem(item)}
                className="group cursor-pointer bg-[#F8FAFC] rounded-2xl overflow-hidden border border-slate-200 shadow-xs card-hover"
              >
                <div className="relative h-56 w-full bg-slate-200 overflow-hidden">
                  <Image
                    src={item.media_url}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="inline-flex items-center gap-1.5 text-xs text-white font-semibold">
                      <Eye className="w-4 h-4" /> Click to view
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-white/90 backdrop-blur-xs text-[#142B4A]">
                      {item.event_category}
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-white">
                  <h4 className="text-sm font-bold text-[#142B4A] line-clamp-1">
                    {item.title}
                  </h4>
                  {item.caption && (
                    <p className="mt-1 text-xs text-slate-500 line-clamp-2">
                      {item.caption}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Lightbox Modal */}
      {selectedGalleryItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setSelectedGalleryItem(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-slate-800 shadow-md transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-80 sm:h-[450px] w-full bg-black">
              <Image
                src={selectedGalleryItem.media_url}
                alt={selectedGalleryItem.title}
                fill
                sizes="(max-width: 1024px) 100vw, 896px"
                className="object-contain"
              />
            </div>

            <div className="p-6 bg-white">
              <span className="text-xs font-bold uppercase tracking-wider text-[#3478C9] bg-blue-50 px-2.5 py-1 rounded-md">
                {selectedGalleryItem.event_category}
              </span>
              <h3 className="text-xl font-bold text-[#142B4A] mt-2">
                {selectedGalleryItem.title}
              </h3>
              {selectedGalleryItem.caption && (
                <p className="mt-1 text-sm text-slate-600">
                  {selectedGalleryItem.caption}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
