import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Mohammad Bilal — Personal Brand & Professional Portfolio CMS',
  description: 'Official portfolio and verified credentials of Mohammad Bilal. Aspiring Data Analyst & Business Intelligence Specialist skilled in SQL, Power BI, Python, and dimensional data modeling.',
  keywords: [
    'Mohammad Bilal',
    'Data Analyst',
    'Business Intelligence',
    'SQL Projects',
    'Power BI Dashboards',
    'Python Data Analytics',
    'Portfolio CMS'
  ],
  authors: [{ name: 'Mohammad Bilal' }],
  creator: 'Mohammad Bilal',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mohammad-bilal-portfolio.vercel.app',
    title: 'Mohammad Bilal — Data Analyst & Business Intelligence Specialist',
    description: 'Explore verified portfolio projects, Power BI executive dashboards, relational database schemas, and academic credentials of Mohammad Bilal.',
    siteName: 'Mohammad Bilal Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mohammad Bilal — Data Analyst & Business Intelligence Specialist',
    description: 'Explore verified portfolio projects, Power BI executive dashboards, and credentials of Mohammad Bilal.',
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#F8FAFC] text-[#253247]`}>
        {children}
      </body>
    </html>
  );
}
