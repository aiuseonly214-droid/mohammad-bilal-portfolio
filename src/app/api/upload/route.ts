import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { addItem } from '@/lib/db';
import { MediaAsset } from '@/types/database';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const category = (formData.get('category') as string) || 'general';
    const caption = (formData.get('caption') as string) || '';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // MIME type check
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/gif',
      'image/svg+xml',
      'application/pdf',
      'video/mp4'
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({
        error: 'Invalid file format. Allowed types: JPG, PNG, WEBP, GIF, SVG, PDF, MP4'
      }, { status: 400 });
    }

    // Size limit: 10MB
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'File size exceeds 10MB limit' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const fileName = `${Date.now()}-${sanitizedName}`;

    let fileUrl = '';

    // 1. If Supabase Storage is configured
    if (isSupabaseConfigured && supabase) {
      try {
        const { error: uploadError } = await supabase.storage
          .from('portfolio-assets')
          .upload(fileName, buffer, {
            contentType: file.type,
            upsert: false
          });

        if (!uploadError) {
          const { data: publicData } = supabase.storage
            .from('portfolio-assets')
            .getPublicUrl(fileName);
          fileUrl = publicData.publicUrl;
        }
      } catch (err) {
        console.warn('Supabase upload attempt failed, falling back to local file storage:', err);
      }
    }

    // 2. Local public fallback
    if (!fileUrl) {
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      const filePath = path.join(uploadDir, fileName);
      fs.writeFileSync(filePath, buffer);
      fileUrl = `/uploads/${fileName}`;
    }

    // Record in media assets
    const asset = await addItem<MediaAsset>('media_assets', {
      file_name: file.name,
      file_url: fileUrl,
      file_type: file.type,
      file_size: file.size,
      caption: caption || file.name,
      category: category,
    });

    return NextResponse.json({
      success: true,
      url: fileUrl,
      asset
    });
  } catch (error) {
    console.error('File upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
