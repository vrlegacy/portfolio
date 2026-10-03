import type { Metadata } from 'next';
import { Roboto_Flex } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const robotoFlex = Roboto_Flex({
    weight: ['300', '400', '500', '600', '700', '800'],
    style: 'normal',
    subsets: ['latin'],
    variable: '--font-roboto-flex',
});

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
        url: 'https://vishwasrudramurthy.dev',
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
        <html lang="en" className="scroll-smooth">
            <body
                className={`${robotoFlex.variable} font-sans bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 antialiased min-h-screen flex flex-col`}
            >
                <Navbar />
                <div className="flex-1">{children}</div>
                <Footer />
            </body>
        </html>
    );
}
