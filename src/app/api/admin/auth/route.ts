import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@bilalportfolio.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'bilal2026admin';
const AUTH_COOKIE_NAME = 'mb_admin_session';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
    }

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // Set secure auth cookie
      const cookieStore = await cookies();
      cookieStore.set(AUTH_COOKIE_NAME, 'authenticated_admin_token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/'
      });

      return NextResponse.json({ success: true, email: ADMIN_EMAIL });
    }

    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);
  return NextResponse.json({ success: true });
}

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get(AUTH_COOKIE_NAME);
  const isAuthenticated = session?.value === 'authenticated_admin_token';
  return NextResponse.json({ isAuthenticated, email: isAuthenticated ? ADMIN_EMAIL : null });
}

