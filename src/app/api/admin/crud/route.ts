import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import {
  getProfile,
  updateProfile,
  getWebsiteSettings,
  updateWebsiteSettings,
  getCollection,
  addItem,
  updateItem,
  deleteItem,
  getDashboardStats
} from '@/lib/db';

const AUTH_COOKIE_NAME = 'mb_admin_session';

async function checkAdminAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(AUTH_COOKIE_NAME);
  return session?.value === 'authenticated_admin_token';
}

function refreshCache() {
  try {
    revalidatePath('/', 'layout');
    revalidatePath('/');
  } catch (e) {
    console.error('Failed to revalidate cache:', e);
  }
}

export async function GET(req: Request) {
  const isAuth = await checkAdminAuth();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const resource = searchParams.get('resource');

  try {
    if (resource === 'stats') {
      const stats = await getDashboardStats();
      return NextResponse.json({ data: stats });
    }

    if (resource === 'profile') {
      const profile = await getProfile();
      return NextResponse.json({ data: profile });
    }

    if (resource === 'settings') {
      const settings = await getWebsiteSettings();
      return NextResponse.json({ data: settings });
    }

    if (!resource) {
      return NextResponse.json({ error: 'Resource parameter required' }, { status: 400 });
    }

    // Retrieve full collection including drafts/unpublished
    // @ts-expect-error valid resource key
    const records = await getCollection(resource, false);
    return NextResponse.json({ data: records });
  } catch (error) {
    console.error(`Admin GET ${resource} error:`, error);
    return NextResponse.json({ error: 'Failed to fetch resource' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const isAuth = await checkAdminAuth();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { resource, item } = body;

    if (!resource || !item) {
      return NextResponse.json({ error: 'Resource and item data required' }, { status: 400 });
    }

    if (resource === 'profile') {
      const updated = await updateProfile(item);
      refreshCache();
      return NextResponse.json({ data: updated });
    }

    if (resource === 'settings') {
      const updated = await updateWebsiteSettings(item);
      refreshCache();
      return NextResponse.json({ data: updated });
    }

    const created = await addItem(resource, item);
    refreshCache();
    return NextResponse.json({ data: created });
  } catch (error) {
    console.error('Admin POST error:', error);
    return NextResponse.json({ error: 'Failed to create item' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const isAuth = await checkAdminAuth();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { resource, id, updates } = body;

    if (!resource || !updates) {
      return NextResponse.json({ error: 'Resource and updates required' }, { status: 400 });
    }

    if (resource === 'profile') {
      const updated = await updateProfile(updates);
      refreshCache();
      return NextResponse.json({ data: updated });
    }

    if (resource === 'settings') {
      const updated = await updateWebsiteSettings(updates);
      refreshCache();
      return NextResponse.json({ data: updated });
    }

    if (!id) {
      return NextResponse.json({ error: 'ID is required for collection updates' }, { status: 400 });
    }

    const updated = await updateItem(resource, id, updates);
    if (!updated) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    refreshCache();
    return NextResponse.json({ data: updated });
  } catch (error) {
    console.error('Admin PUT error:', error);
    return NextResponse.json({ error: 'Failed to update item' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const isAuth = await checkAdminAuth();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const resource = searchParams.get('resource');
    const id = searchParams.get('id');

    if (!resource || !id) {
      return NextResponse.json({ error: 'Resource and id required' }, { status: 400 });
    }

    // @ts-expect-error valid resource key
    const success = await deleteItem(resource, id);
    refreshCache();
    return NextResponse.json({ success });
  } catch (error) {
    console.error('Admin DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 });
  }
}

