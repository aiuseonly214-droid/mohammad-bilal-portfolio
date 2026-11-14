'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Lock,
  LogOut,
  LayoutDashboard,
  User,
  GraduationCap,
  Code2,
  Brain,
  FolderKanban,
  Award,
  Trophy,
  Briefcase,
  BookOpen,
  Mic,
  Calendar,
  Image as ImageIcon,
  Target,
  FileText,
  Share2,
  Mail,
  Settings,
  Plus,
  Trash2,
  Edit3,
  AlertTriangle,
  RefreshCw,
  ExternalLink,
  Search,
  Check,
  X,
  Upload,
  FileUp
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Collection Data State
  const [collectionData, setCollectionData] = useState<any[]>([]);
  const [profileData, setProfileData] = useState<any>(null);
  const [settingsData, setSettingsData] = useState<any>(null);

  // Modal State for Add / Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [searchFilter, setSearchFilter] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);

  // Show toast notification helper
  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Check auth session
  useEffect(() => {
    fetch('/api/admin/auth')
      .then((res) => res.json())
      .then((data) => {
        setIsAuthenticated(data.isAuthenticated);
        if (data.isAuthenticated) {
          loadOverviewStats();
        }
      })
      .catch(() => setIsAuthenticated(false));
  }, []);

  // Login handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: adminEmail, password: adminPassword })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      setIsAuthenticated(true);
      showToast('Welcome back, Mohammad Bilal! Admin portal activated.');
      loadOverviewStats();
    } catch (err: any) {
      setLoginError(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  // Logout handler
  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    setIsAuthenticated(false);
    showToast('Logged out securely.');
  };

  // Load Overview stats
  const loadOverviewStats = async () => {
    try {
      const res = await fetch('/api/admin/crud?resource=stats');
      const json = await res.json();
      if (json.data) setStats(json.data);
    } catch {
      // ignore
    }
  };

  // Load resource data whenever tab changes
  useEffect(() => {
    if (!isAuthenticated) return;

    if (activeTab === 'overview') {
      loadOverviewStats();
      return;
    }

    if (activeTab === 'profile') {
      fetch('/api/admin/crud?resource=profile')
        .then((res) => res.json())
        .then((json) => setProfileData(json.data));
      return;
    }

    if (activeTab === 'settings') {
      fetch('/api/admin/crud?resource=settings')
        .then((res) => res.json())
        .then((json) => setSettingsData(json.data));
      return;
    }

    // Load generic collection
    setLoading(true);
    fetch(`/api/admin/crud?resource=${activeTab}`)
      .then((res) => res.json())
      .then((json) => {
        setCollectionData(json.data || []);
      })
      .catch(() => {
        // ignore
      })
      .finally(() => setLoading(false));
  }, [activeTab, isAuthenticated]);

  // Toggle publish / active status
  const handleTogglePublish = async (item: any) => {
    const isSocial = activeTab === 'social_links';
    const field = isSocial ? 'is_active' : 'is_published';
    const newValue = !item[field];

    try {
      const res = await fetch('/api/admin/crud', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resource: activeTab,
          id: item.id,
          updates: { [field]: newValue }
        })
      });

      if (res.ok) {
        setCollectionData((prev) =>
          prev.map((i) => (i.id === item.id ? { ...i, [field]: newValue } : i))
        );
        showToast(
          isSocial
            ? `Link ${newValue ? 'activated' : 'deactivated'}`
            : `Content ${newValue ? 'published to live site' : 'moved to drafts'}`
        );
      }
    } catch {
      showToast('Failed to update status', 'error');
    }
  };

  // Delete item handler
  const handleDeleteItem = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/crud?resource=${activeTab}&id=${id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        setCollectionData((prev) => prev.filter((i) => i.id !== id));
        setDeleteConfirmId(null);
        showToast('Record deleted successfully');
      }
    } catch {
      showToast('Failed to delete record', 'error');
    }
  };

  // Save Item (Create or Update)
  const handleSaveItem = async (formData: any) => {
    setLoading(true);
    try {
      if (activeTab === 'profile') {
        const res = await fetch('/api/admin/crud', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ resource: 'profile', item: formData })
        });
        if (res.ok) {
          const json = await res.json();
          setProfileData(json.data);
          showToast('Profile updated successfully');
        }
      } else if (activeTab === 'settings') {
        const res = await fetch('/api/admin/crud', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ resource: 'settings', item: formData })
        });
        if (res.ok) {
          const json = await res.json();
          setSettingsData(json.data);
          showToast('Website settings saved');
        }
      } else if (editingItem && editingItem.id) {
        // Update existing item
        const res = await fetch('/api/admin/crud', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            resource: activeTab,
            id: editingItem.id,
            updates: formData
          })
        });
        if (res.ok) {
          const json = await res.json();
          setCollectionData((prev) =>
            prev.map((i) => (i.id === editingItem.id ? json.data : i))
          );
          setIsModalOpen(false);
          setEditingItem(null);
          showToast('Changes saved successfully');
        }
      } else {
        // Create new item
        const res = await fetch('/api/admin/crud', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ resource: activeTab, item: formData })
        });
        if (res.ok) {
          const json = await res.json();
          setCollectionData((prev) => [...prev, json.data]);
          setIsModalOpen(false);
          setEditingItem(null);
          showToast('New record added successfully');
        }
      }
    } catch {
      showToast('Failed to save record', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Mark message as read/unread
  const handleToggleMessageRead = async (msg: any) => {
    try {
      const res = await fetch('/api/admin/crud', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resource: 'contact_messages',
          id: msg.id,
          updates: { is_read: !msg.is_read }
        })
      });
      if (res.ok) {
        setCollectionData((prev) =>
          prev.map((m) => (m.id === msg.id ? { ...m, is_read: !msg.is_read } : m))
        );
      }
    } catch {
      // ignore
    }
  };

  // Nav items list for Sidebar
  const navItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'profile', label: 'Owner Profile & Bio', icon: User },
    { id: 'education', label: 'Academic Records', icon: GraduationCap },
    { id: 'technical_skills', label: 'Technical Skills', icon: Code2 },
    { id: 'soft_skills', label: 'Soft Skills & Evidence', icon: Brain },
    { id: 'projects', label: 'Projects & Case Studies', icon: FolderKanban },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'achievements', label: 'Awards & Honors', icon: Trophy },
    { id: 'experiences', label: 'Experience & Internships', icon: Briefcase },
    { id: 'research_publications', label: 'Research & Papers', icon: BookOpen },
    { id: 'communication_journey', label: 'Speaking & Milestones', icon: Mic },
    { id: 'events', label: 'Workshops & Events', icon: Calendar },
    { id: 'gallery_media', label: 'Photo & Video Gallery', icon: ImageIcon },
    { id: 'career_goals', label: 'Career Goals', icon: Target },
    { id: 'resumes', label: 'Resume & CV Files', icon: FileText },
    { id: 'social_links', label: 'Dynamic Social Links', icon: Share2 },
    { id: 'contact_messages', label: 'Inbound Inquiries', icon: Mail },
    { id: 'settings', label: 'Website Settings & SEO', icon: Settings },
  ];

  // 1. Loading screen
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex items-center gap-3 text-slate-600 font-semibold text-sm">
          <RefreshCw className="w-5 h-5 animate-spin text-[#3478C9]" />
          <span>Verifying secure administrative session...</span>
        </div>
      </div>
    );
  }

  // 2. Authentication Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#142B4A] via-[#203F66] to-[#0A1A2F] p-4">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-200">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-[#142B4A] text-white flex items-center justify-center font-bold text-2xl mx-auto shadow-md">
              MB
            </div>
            <h1 className="text-2xl font-extrabold text-[#142B4A] tracking-tight mt-4">
              Authorized CMS Portal
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Private access exclusively for website owner Mohammad Bilal.
            </p>
          </div>

          {loginError && (
            <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Admin Email
              </label>
              <input
                type="email"
                required
                placeholder="admin@bilalportfolio.com"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#3478C9] bg-slate-50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Master Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#3478C9] bg-slate-50"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-[#142B4A] hover:bg-[#203F66] text-white font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              <Lock className="w-4 h-4" />
              <span>{loading ? 'Authenticating...' : 'Access Dashboard'}</span>
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
            <Link href="/" className="hover:text-slate-700 font-medium">
              ← Return to Public Portfolio
            </Link>
            <span className="font-mono text-[10px]">v2.6 Verified</span>
          </div>
        </div>
      </div>
    );
  }

  // 3. Authenticated Admin Cockpit
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      
      {/* Toast Notification Alert */}
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-xl shadow-xl border text-sm font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-300 ${
            toast.type === 'success'
              ? 'bg-emerald-600 text-white border-emerald-500'
              : 'bg-rose-600 text-white border-rose-500'
          }`}
        >
          {toast.type === 'success' ? <Check className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Sidebar Navigation */}
      <aside className="w-full md:w-72 bg-[#142B4A] text-white flex flex-col justify-between shrink-0 border-r border-slate-800">
        <div>
          {/* Header */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white text-[#142B4A] flex items-center justify-center font-bold text-lg">
                MB
              </div>
              <div>
                <span className="text-base font-bold tracking-tight block">
                  Admin CMS
                </span>
                <span className="text-[11px] text-sky-300 font-medium block">
                  Mohammad Bilal
                </span>
              </div>
            </div>

            <Link
              href="/"
              target="_blank"
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
              title="View Live Public Portfolio"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>

          {/* Nav Items */}
          <nav className="p-3 space-y-1 max-h-[calc(100vh-160px)] overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSearchFilter('');
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#3478C9] text-white shadow-xs'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Logout */}
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-rose-900/60 text-slate-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out Admin</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto max-h-screen">
        
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#142B4A] tracking-tight capitalize">
              {navItems.find((n) => n.id === activeTab)?.label || 'Dashboard'}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Real-time PostgreSQL management with automatic public site synchronization.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {activeTab !== 'overview' && activeTab !== 'profile' && activeTab !== 'settings' && activeTab !== 'contact_messages' && (
              <button
                onClick={() => {
                  setEditingItem(null);
                  setIsModalOpen(true);
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#142B4A] hover:bg-[#203F66] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Record</span>
              </button>
            )}

            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-colors"
            >
              <span>View Live Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* TAB: OVERVIEW */}
        {activeTab === 'overview' && stats && (
          <div className="space-y-8">
            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Live Projects
                  </span>
                  <FolderKanban className="w-5 h-5 text-[#3478C9]" />
                </div>
                <div className="text-3xl font-extrabold text-[#142B4A]">
                  {stats.publishedProjects} / {stats.totalProjects}
                </div>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  {stats.totalProjects - stats.publishedProjects} draft projects
                </span>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Certifications
                  </span>
                  <Award className="w-5 h-5 text-amber-500" />
                </div>
                <div className="text-3xl font-extrabold text-[#142B4A]">
                  {stats.publishedCertifications} / {stats.totalCertifications}
                </div>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Industry accredited credentials
                </span>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Recruiter Messages
                  </span>
                  <Mail className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="text-3xl font-extrabold text-[#142B4A]">
                  {stats.totalMessages}
                </div>
                <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">
                  {stats.unreadMessages} unread inquiries
                </span>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Active Resumes
                  </span>
                  <FileText className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="text-3xl font-extrabold text-[#142B4A]">
                  {stats.activeResumes} / {stats.totalResumes}
                </div>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  ATS-tailored PDF files
                </span>
              </div>
            </div>

            {/* Quick Navigation Cards */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <h2 className="text-base font-bold text-[#142B4A] mb-4">
                Rapid Section Jump
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {navItems.filter(n => n.id !== 'overview').slice(0, 12).map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className="p-3.5 rounded-xl border border-slate-200 hover:border-[#3478C9] hover:bg-blue-50/50 text-left transition-colors cursor-pointer"
                    >
                      <Icon className="w-4 h-4 text-[#3478C9] mb-2" />
                      <span className="block text-xs font-bold text-[#142B4A] truncate">
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB: PROFILE & BIO */}
        {activeTab === 'profile' && profileData && (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs max-w-4xl">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveItem(profileData);
              }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profileData.full_name || ''}
                    onChange={(e) => setProfileData({ ...profileData, full_name: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 bg-slate-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Primary Email
                  </label>
                  <input
                    type="email"
                    value={profileData.email || ''}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 bg-slate-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Professional Headline
                </label>
                <input
                  type="text"
                  value={profileData.headline || ''}
                  onChange={(e) => setProfileData({ ...profileData, headline: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Short Introduction (Hero Section)
                </label>
                <textarea
                  rows={2}
                  value={profileData.short_intro || ''}
                  onChange={(e) => setProfileData({ ...profileData, short_intro: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Full Biography (About Section)
                </label>
                <textarea
                  rows={4}
                  value={profileData.bio || ''}
                  onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 bg-slate-50"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Profile Photograph
                  </label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={profileData.profile_photo_url || ''}
                      onChange={(e) => setProfileData({ ...profileData, profile_photo_url: e.target.value })}
                      placeholder="Image URL or upload file"
                      className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 bg-slate-50"
                    />
                    <label className="px-3 py-2 bg-blue-50 text-[#142B4A] hover:bg-blue-100 rounded-xl border border-blue-200 text-xs font-bold shrink-0 cursor-pointer flex items-center gap-1.5 transition-colors">
                      <Upload className="w-3.5 h-3.5 text-[#3478C9]" />
                      <span>{uploadingImage ? 'Uploading...' : 'Upload'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        disabled={uploadingImage}
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          setUploadingImage(true);
                          try {
                            const fd = new FormData();
                            fd.append('file', file);
                            fd.append('category', 'profile');
                            const res = await fetch('/api/upload', { method: 'POST', body: fd });
                            const data = await res.json();
                            if (res.ok && data.url) {
                              setProfileData({ ...profileData, profile_photo_url: data.url });
                              showToast('Profile photo uploaded successfully!');
                            } else {
                              showToast(data.error || 'Upload failed', 'error');
                            }
                          } catch {
                            showToast('Upload failed', 'error');
                          } finally {
                            setUploadingImage(false);
                          }
                        }}
                      />
                    </label>
                  </div>
                  {profileData.profile_photo_url && (
                    <div className="mt-2 flex items-center gap-2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={profileData.profile_photo_url}
                        alt="Profile Preview"
                        className="w-12 h-12 rounded-xl object-cover border border-slate-200 shadow-xs"
                      />
                      <span className="text-[11px] text-slate-500">Current photo preview</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={profileData.location || ''}
                    onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 bg-slate-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Professional Philosophy
                </label>
                <textarea
                  rows={2}
                  value={profileData.professional_philosophy || ''}
                  onChange={(e) => setProfileData({ ...profileData, professional_philosophy: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 bg-slate-50"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 rounded-xl bg-[#142B4A] hover:bg-[#203F66] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                >
                  Save Profile Changes
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB: SETTINGS */}
        {activeTab === 'settings' && settingsData && (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs max-w-4xl">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveItem(settingsData);
              }}
              className="space-y-6"
            >
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Website Title
                </label>
                <input
                  type="text"
                  value={settingsData.website_title || ''}
                  onChange={(e) => setSettingsData({ ...settingsData, website_title: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Website Description & SEO Meta
                </label>
                <textarea
                  rows={3}
                  value={settingsData.website_description || ''}
                  onChange={(e) => setSettingsData({ ...settingsData, website_description: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 bg-slate-50"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Footer Text
                  </label>
                  <input
                    type="text"
                    value={settingsData.footer_text || ''}
                    onChange={(e) => setSettingsData({ ...settingsData, footer_text: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 bg-slate-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Copyright Notice
                  </label>
                  <input
                    type="text"
                    value={settingsData.copyright_text || ''}
                    onChange={(e) => setSettingsData({ ...settingsData, copyright_text: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 bg-slate-50"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 rounded-xl bg-[#142B4A] hover:bg-[#203F66] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
                >
                  Save Settings
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB: CONTACT MESSAGES */}
        {activeTab === 'contact_messages' && (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">
                Inbound Inquiries ({collectionData.length})
              </span>
            </div>

            {collectionData.length === 0 ? (
              <div className="p-12 text-center text-slate-400 text-xs">
                No contact inquiries received yet.
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {collectionData.map((msg) => (
                  <div key={msg.id} className="p-6 hover:bg-slate-50 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#142B4A]">{msg.name}</span>
                        <span className="text-xs text-slate-400">({msg.email})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleToggleMessageRead(msg)}
                          className={`text-xs px-2.5 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                            msg.is_read
                              ? 'bg-slate-100 text-slate-500'
                              : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          }`}
                        >
                          {msg.is_read ? 'Mark Unread' : 'Mark as Read'}
                        </button>
                        <button
                          onClick={() => handleDeleteItem(msg.id)}
                          className="p-1 text-slate-400 hover:text-rose-600 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="text-xs font-bold text-[#3478C9] mb-1">
                      Subject: {msg.subject}
                    </div>
                    <p className="text-xs text-slate-600 whitespace-pre-line leading-relaxed">
                      {msg.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* GENERIC COLLECTION TABLE */}
        {activeTab !== 'overview' && activeTab !== 'profile' && activeTab !== 'settings' && activeTab !== 'contact_messages' && (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="p-4 border-b border-slate-100 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs font-bold text-slate-700">
                Total Records: {collectionData.length}
              </span>
              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter records..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
                />
              </div>
            </div>

            {collectionData.length === 0 ? (
              <div className="p-12 text-center text-slate-400 text-xs">
                No records found. Click &quot;Add New Record&quot; above to create one.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100/80 text-slate-600 uppercase tracking-wider font-bold text-[10px] border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Title / Primary Field</th>
                      <th className="py-3 px-4">Category / Type</th>
                      <th className="py-3 px-4">Live Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {collectionData
                      .filter((item) => {
                        if (!searchFilter) return true;
                        const matchText = JSON.stringify(item).toLowerCase();
                        return matchText.includes(searchFilter.toLowerCase());
                      })
                      .map((item) => {
                        const isSocial = activeTab === 'social_links';
                        const isLive = isSocial ? item.is_active : item.is_published;
                        const titleText =
                          item.title ||
                          item.skill_name ||
                          item.qualification ||
                          item.milestone_title ||
                          item.organisation ||
                          item.custom_label ||
                          item.name ||
                          'Record';
                        const subText = item.category || item.institution_name || item.platform || item.employment_type || '';

                        return (
                          <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                            <td className="py-3.5 px-4 font-semibold text-[#142B4A]">
                              {titleText}
                            </td>
                            <td className="py-3.5 px-4 text-slate-500 font-medium">
                              {subText}
                            </td>
                            <td className="py-3.5 px-4">
                              <button
                                onClick={() => handleTogglePublish(item)}
                                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md font-bold text-[10px] uppercase tracking-wider transition-colors cursor-pointer ${
                                  isLive
                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                                    : 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100'
                                }`}
                              >
                                {isLive ? 'Published' : 'Draft'}
                              </button>
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => {
                                    setEditingItem(item);
                                    setIsModalOpen(true);
                                  }}
                                  className="p-1.5 text-slate-500 hover:text-[#3478C9] rounded-md hover:bg-slate-100 cursor-pointer"
                                  title="Edit Record"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => setDeleteConfirmId(item.id)}
                                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded-md hover:bg-slate-100 cursor-pointer"
                                  title="Delete Record"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

      </main>

      {/* Generic Item Modal (Add / Edit) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl">
            <button
              onClick={() => {
                setIsModalOpen(false);
                setEditingItem(null);
              }}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-[#142B4A] mb-4">
              {editingItem ? 'Edit Content Record' : 'Add New Record'}
            </h3>

            {/* Dynamic Universal Content Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formEl = e.currentTarget;
                const formData = new FormData(formEl);
                const updates: any = {};
                formData.forEach((val, key) => {
                  if (key === 'technologies_used' || key === 'key_features' || key === 'screenshots' || key === 'skills_developed') {
                    updates[key] = (val as string).split(',').map((s) => s.trim()).filter(Boolean);
                  } else if (key === 'start_year' || key === 'completion_year' || key === 'proficiency_percentage') {
                    updates[key] = Number(val);
                  } else if (key === 'is_published' || key === 'is_active' || key === 'is_featured') {
                    updates[key] = val === 'true';
                  } else {
                    updates[key] = val;
                  }
                });

                if (!editingItem) {
                  updates.is_published = true;
                  updates.display_order = collectionData.length + 1;
                }

                handleSaveItem(updates);
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Title / Skill / Qualification *
                </label>
                <input
                  type="text"
                  name={activeTab === 'technical_skills' ? 'skill_name' : activeTab === 'education' ? 'qualification' : activeTab === 'social_links' ? 'custom_label' : 'title'}
                  required
                  defaultValue={
                    editingItem?.title ||
                    editingItem?.skill_name ||
                    editingItem?.qualification ||
                    editingItem?.custom_label ||
                    ''
                  }
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 bg-slate-50"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Category / Stream / Role
                  </label>
                  <input
                    type="text"
                    name={activeTab === 'education' ? 'institution_name' : activeTab === 'experiences' ? 'organisation' : activeTab === 'social_links' ? 'platform' : 'category'}
                    defaultValue={
                      editingItem?.category ||
                      editingItem?.institution_name ||
                      editingItem?.organisation ||
                      editingItem?.platform ||
                      ''
                    }
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 bg-slate-50"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Secondary Field / URL / Dates
                  </label>
                  <input
                    type="text"
                    name={activeTab === 'social_links' ? 'url' : activeTab === 'projects' ? 'slug' : activeTab === 'certifications' ? 'issuing_organisation' : 'date'}
                    defaultValue={
                      editingItem?.url ||
                      editingItem?.slug ||
                      editingItem?.issuing_organisation ||
                      editingItem?.date ||
                      editingItem?.start_year ||
                      ''
                    }
                    className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 bg-slate-50"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Description / Responsibilities / Evidence
                </label>
                <textarea
                  name={activeTab === 'projects' ? 'short_description' : activeTab === 'experiences' ? 'responsibilities' : 'description'}
                  rows={3}
                  defaultValue={
                    editingItem?.short_description ||
                    editingItem?.responsibilities ||
                    editingItem?.description ||
                    ''
                  }
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 bg-slate-50"
                />
              </div>

              {activeTab === 'resumes' && (
                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Upload Resume PDF File *
                  </label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="text"
                      name="file_url"
                      id="resume_file_url_input"
                      required
                      defaultValue={editingItem?.file_url || ''}
                      placeholder="/documents/Your_Resume.pdf"
                      className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 bg-slate-50"
                    />
                    <label className="px-3 py-2 bg-blue-50 text-[#142B4A] hover:bg-blue-100 rounded-xl border border-blue-200 text-xs font-bold shrink-0 cursor-pointer flex items-center gap-1.5 transition-colors">
                      <FileUp className="w-3.5 h-3.5 text-[#3478C9]" />
                      <span>{uploadingResume ? 'Uploading...' : 'Upload PDF'}</span>
                      <input
                        type="file"
                        accept="application/pdf"
                        className="hidden"
                        disabled={uploadingResume}
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          setUploadingResume(true);
                          try {
                            const fd = new FormData();
                            fd.append('file', file);
                            fd.append('category', 'resume');
                            const res = await fetch('/api/upload', { method: 'POST', body: fd });
                            const data = await res.json();
                            if (res.ok && data.url) {
                              const inputEl = document.getElementById('resume_file_url_input') as HTMLInputElement;
                              if (inputEl) inputEl.value = data.url;
                              showToast('Resume PDF uploaded successfully!');
                            } else {
                              showToast(data.error || 'Upload failed', 'error');
                            }
                          } catch {
                            showToast('Upload failed', 'error');
                          } finally {
                            setUploadingResume(false);
                          }
                        }}
                      />
                    </label>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">Upload an ATS-friendly PDF resume (Max 10MB).</p>
                </div>
              )}

              {activeTab === 'projects' && (
                <>
                  <div>
                    <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Technologies Used (comma separated)
                    </label>
                    <input
                      type="text"
                      name="technologies_used"
                      defaultValue={editingItem?.technologies_used?.join(', ') || ''}
                      placeholder="SQL, Power BI, Python, DAX"
                      className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 bg-slate-50"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">
                        GitHub Repository URL
                      </label>
                      <input
                        type="text"
                        name="github_url"
                        defaultValue={editingItem?.github_url || ''}
                        className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 bg-slate-50"
                      />
                    </div>
                    <div>
                      <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">
                        Live Demo URL
                      </label>
                      <input
                        type="text"
                        name="live_demo_url"
                        defaultValue={editingItem?.live_demo_url || ''}
                        className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 bg-slate-50"
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="pt-2">
                <label className="block font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Publication Status
                </label>
                <select
                  name="is_published"
                  defaultValue={editingItem?.is_published !== false ? 'true' : 'false'}
                  className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-300 bg-slate-50"
                >
                  <option value="true">Published (Visible on Live Portfolio)</option>
                  <option value="false">Draft (Private in CMS only)</option>
                </select>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 rounded-xl bg-[#142B4A] hover:bg-[#203F66] text-white font-bold transition-colors cursor-pointer"
                >
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Dialog for Destructive Deletion */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#142B4A]">
              Confirm Permanent Deletion
            </h3>
            <p className="text-xs text-slate-500 mt-2">
              Are you sure you want to delete this record? This action will remove it from both the CMS and public portfolio.
            </p>

            <div className="mt-6 flex justify-center gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteItem(deleteConfirmId)}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Delete Record
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
