# Mohammad Bilal — Personal Brand & Professional Portfolio CMS

A production-ready, full-stack personal portfolio and dynamic Content Management System (CMS) designed for **Mohammad Bilal**, aspiring Data Analyst and Business Intelligence specialist.

Developed with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, **PostgreSQL / Supabase**, and **Google Gemini AI**.

---

## Architecture Overview

The system consists of two distinct, integrated environments:

1. **Public Portfolio Website (`/`)**:
   - Modern corporate aesthetic with Navy Blue (`#142B4A`), Slate Blue, White, and Light Grey palette.
   - 17 independently manageable, data-driven sections.
   - Dynamic real-time calculated metrics directly from published records.
   - Dedicated interactive project detail case-study pages (`/projects/[slug]`).
   - ATS-friendly downloadable role-specific resumes.
   - High-performance, mobile-first responsive design.
   - AI Recruiter FAQ Assistant floating widget answering inquiries grounded exclusively in verified published portfolio records.

2. **Private Admin Dashboard (`/admin`)**:
   - Private administrative cockpit protected by session authentication.
   - Real-time database metrics (live projects, drafts, certs, inquiries).
   - Complete CRUD operations (Add, Edit, Delete, Toggle Publish/Draft, Reorder).
   - Confirmation dialogs for destructive actions.
   - Media manager and asset upload handler.
   - Inbound contact messages inbox (mark read/unread, delete).
   - Global website settings & SEO editor.

---

## Public Website Sections

| Section | Description | Database Table |
|---|---|---|
| **A. Homepage Hero** | Professional photo, animated rotating headlines, bio, desired roles, primary skills, dynamic stats, CTA buttons, dynamic social links | `profiles`, `social_links` |
| **B. About Me** | Biography, personal introduction, educational foundation, career philosophy, core strengths, learning mindset | `profiles` |
| **C. Academic Profile** | Multi-record education with timeline view & card grid toggle, CGPA/grades, coursework, credentials | `education` |
| **D. Technical Skills** | Categorized skills (SQL, Power BI, Python, Excel, Tableau, AI tools), visual proficiency indicators, experience duration | `technical_skills` |
| **E. Soft Skills** | Behavioral competencies with real-life demonstrated evidence and associated achievements | `soft_skills` |
| **F. Projects Portfolio** | Filterable case studies by category, live search, screenshots, GitHub and demo links, problem statements, key features | `projects` |
| **G. Certifications** | Industry credentials, credential IDs, verification links, issuing organization, preview modal | `certifications` |
| **H. Achievements & Awards** | Inter-collegiate hackathon wins, academic honors, distinction details, evidence verification | `achievements` |
| **I. Experience & Internships** | Chronological timeline, organization, role, responsibilities, contributions, skills applied | `experiences` |
| **J. Research & Publications** | Academic papers, clear submission status badges (Submitted, Accepted, Under Review, Published), DOI/URLs | `research_publications` |
| **K. Speaking & Growth Journey** | English fluency journey, public speaking milestones, debates, symposium presentations | `communication_journey` |
| **L. Workshops & Events** | Technical workshops, campus events, hackathons with venues, dates and participation roles | `events` |
| **M. Photo & Video Gallery** | Event-based categories, responsive gallery grid, interactive Lightbox modal | `gallery_media` |
| **N. Career Goals & Aspirations** | Desired roles, immediate targets, currently learning technologies, future roadmap | `career_goals` |
| **O. Resume & CV Management** | Downloadable role-specific ATS resumes (Data Analyst, MIS Executive), file size, update date | `resumes` |
| **P. Dynamic Social Links** | Fully dynamic links across header, hero, contact, and footer without hardcoded URLs | `social_links` |
| **Q. Contact Section** | Contact form with server-side validation, spam protection honeypot, direct WhatsApp/Email links | `contact_messages` |
| **AI Recruiter Assistant** | Floating FAQ widget answering recruiter inquiries grounded strictly in verified published portfolio data | `/api/chat-faq` |

---

## Setup & Local Development

### 1. Prerequisites
- **Node.js** v18+ or v20+
- **npm** or **pnpm**

### 2. Installation
```bash
# Clone or navigate to the project directory
cd mohammad-bilal-portfolio

# Install dependencies
npm install
```

### 3. Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Configure your credentials:
```env
# Default Admin Login
ADMIN_EMAIL=admin@bilalportfolio.com
ADMIN_PASSWORD=bilal2026admin

# Supabase (Optional for local test; app runs seamlessly with persistent local fallback)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Google Gemini AI (Optional; includes built-in keyword FAQ fallback)
GEMINI_API_KEY=your-gemini-api-key
```

### 4. Run Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) for the public portfolio.
Visit [http://localhost:3000/admin](http://localhost:3000/admin) to log in to the private CMS.

---

## Supabase PostgreSQL Setup

1. Create a free project at [supabase.com](https://supabase.com).
2. Go to **SQL Editor** in your Supabase dashboard.
3. Paste and run the contents of [`supabase/schema.sql`](./supabase/schema.sql) to create all 17 tables, foreign keys, and Row Level Security (RLS) policies.
4. Paste and run [`supabase/seed.sql`](./supabase/seed.sql) to populate initial verified starter data for Mohammad Bilal.
5. In **Storage**, create a public bucket named `portfolio-assets`.
6. Add your Supabase URL and keys to `.env.local` or Vercel Environment Variables.

---

## Deployment to Vercel

1. Push this repository to GitHub or GitLab.
2. Import the project into [Vercel](https://vercel.com).
3. Set the Environment Variables in the Vercel Dashboard:
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `GEMINI_API_KEY`
4. Click **Deploy**. Vercel will build and launch the site globally on edge networks.

---

## Testing & Verification Report

- **Public Site**: Verified responsive rendering across all 17 sections.
- **Admin Authentication**: Verified credential validation (`admin@bilalportfolio.com` / `bilal2026admin`), session cookie issuance, and unauthorized route rejection.
- **CRUD Workflows**: Tested Add, Edit, Delete, and Toggle Publish/Draft across collection items.
- **AI Recruiter Chatbot**: Grounded strictly in published portfolio data; tested against questions regarding skills, education, projects, certifications, and contact information.
- **Contact Form**: Tested server-side field validation, spam protection honeypot, and database recording.
- **SEO & Meta**: Configured OpenGraph, Twitter card, canonical tags, and structured semantic HTML.
