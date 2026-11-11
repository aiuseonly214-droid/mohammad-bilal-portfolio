import { NextResponse } from 'next/server';
import { addItem } from '@/lib/db';
import { ContactMessage } from '@/types/database';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message, honeypot } = body;

    // Spam protection: honeypot field must be empty
    if (honeypot) {
      return NextResponse.json({ success: true, message: 'Message received' });
    }

    // Validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json({ error: 'Please enter a valid name (at least 2 characters).' }, { status: 400 });
    }

    if (!email || typeof email !== 'string' || !email.includes('@') || !email.includes('.')) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    if (!subject || typeof subject !== 'string' || subject.trim().length < 2) {
      return NextResponse.json({ error: 'Please enter a subject.' }, { status: 400 });
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return NextResponse.json({ error: 'Message must be at least 10 characters long.' }, { status: 400 });
    }

    // Save message to contact_messages
    const newMessage = await addItem<ContactMessage>('contact_messages', {
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
      is_read: false,
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your message has been sent successfully. Mohammad Bilal will get back to you shortly.',
      id: newMessage.id
    });
  } catch (error) {
    console.error('Contact form submission error:', error);
    return NextResponse.json({ error: 'Failed to submit contact message. Please try again later.' }, { status: 500 });
  }
}

