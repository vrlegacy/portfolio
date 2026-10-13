import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AmbientBackground from '@/components/AmbientBackground';
import SVGDef from '@/components/SVGDef';
import ResumeGlassSheet from '@/components/ResumeGlassSheet';

export const metadata: Metadata = {
  title: 'Vishwas Rudramurthy | FullStack and AI Developer',
  description:
    'Portfolio of Vishwas Rudramurthy, a FullStack and AI developer skilled in Python, FastAPI, React, and AI workflow automation.',
  keywords: [
    'Vishwas Rudramurthy',
    'FullStack Developer',
    'AI Developer',
    'Python Developer',
    'FastAPI',
    'React',
    'Next.js',
    'n8n',
    'Gemini API',
    'TypeScript',
    'Software Engineer',
  ],
  authors: [{ name: 'Vishwas Rudramurthy' }],
  openGraph: {
    title: 'Vishwas Rudramurthy | FullStack and AI Developer',
    description:
      'Portfolio of Vishwas Rudramurthy, a FullStack and AI developer skilled in Python, FastAPI, React, and AI workflow automation.',
    url: 'https://buildwithvr.pages.dev',
    siteName: 'Vishwas Rudramurthy Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vishwas Rudramurthy | FullStack and AI Developer',
    description:
      'Portfolio of Vishwas Rudramurthy, a FullStack and AI developer skilled in Python, FastAPI, React, and AI workflow automation.',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SVGDef />
        <AmbientBackground />
        <Navbar />
        {children}
        <ResumeGlassSheet />
      </body>
    </html>
  );
}
