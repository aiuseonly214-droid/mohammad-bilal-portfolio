'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Image as ImageIcon, Video, X, Eye, Calendar, Tag } from 'lucide-react';
import { GalleryMedia } from '@/types/database';

interface GallerySectionProps {
  media: GalleryMedia[];
}

export default function GallerySection({ media }: GallerySectionProps) {
  const [selectedMedia, setSelectedMedia] = useState<GalleryMedia | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('All');

  if (!media || media.length === 0) return null;

  const categories = ['All', ...Array.from(new Set(media.map((m) => m.event_category)))];

  const filtered = filterCategory === 'All'
    ? media
    : media.filter((m) => m.event_category === filterCategory);

  return (
    <section id="gallery" className="py-20 bg-[#F8FAFC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/80 text-[#142B4A] text-xs font-bold uppercase tracking-wider mb-3">
            Moments & Evidence
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#142B4A] tracking-tight">
            Photo & Activity Gallery
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Photographic records of hackathons, workshop presentations, and campus achievements.
          </p>

          {/* Filter Pills */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  filterCategory === cat
                    ? 'bg-[#142B4A] text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedMedia(item)}
              className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs card-hover"
            >
              <div className="relative h-60 w-full bg-slate-200 overflow-hidden">
                <Image
                  src={item.media_url}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="inline-flex items-center gap-1.5 text-xs text-white font-semibold">
                    <Eye className="w-4 h-4" /> Click to enlarge
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-white/90 backdrop-blur-xs text-[#142B4A] shadow-xs">
                    {item.event_category}
                  </span>
                </div>
              </div>

              <div className="p-4">
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

      </div>

      {/* Lightbox Modal */}
      {selectedMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setSelectedMedia(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-slate-800 shadow-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-96 sm:h-[480px] w-full bg-black">
              <Image
                src={selectedMedia.media_url}
                alt={selectedMedia.title}
                fill
                sizes="(max-width: 1024px) 100vw, 896px"
                className="object-contain"
              />
            </div>

            <div className="p-6 bg-white">
              <span className="text-xs font-bold uppercase tracking-wider text-[#3478C9] bg-blue-50 px-2.5 py-1 rounded-md">
                {selectedMedia.event_category}
              </span>
              <h3 className="text-xl font-bold text-[#142B4A] mt-2">
                {selectedMedia.title}
              </h3>
              {selectedMedia.caption && (
                <p className="mt-1 text-sm text-slate-600">
                  {selectedMedia.caption}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

