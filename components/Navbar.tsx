'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, FileText } from 'lucide-react';
import { GENERAL_INFO } from '@/lib/data';

const NAV_LINKS = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/#about' },
    { name: 'Skills', href: '/#skills' },
    { name: 'Projects', href: '/projects' },
    { name: 'Experience', href: '/experience' },
    { name: 'Resume', href: '/resume' },
    { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <header
            className={`sticky top-0 z-50 transition-all duration-200 border-b ${
                isScrolled
                    ? 'bg-[#FAFAF7]/90 dark:bg-[#0C0A09]/90 backdrop-blur-md border-[#E7E5E4] dark:border-[#292524] shadow-sm py-3'
                    : 'bg-[#FAFAF7] dark:bg-[#0C0A09] border-[#E7E5E4] dark:border-[#292524] py-4'
            }`}
        >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
                {/* Brand / Logo */}
                <Link
                    href="/"
                    className="flex items-center gap-2 font-bold text-lg text-[#1C1917] dark:text-[#FAFAF9] group"
                    onClick={closeMobileMenu}
                >
                    <span className="w-8 h-8 rounded-lg bg-[#C2410C] text-white flex items-center justify-center font-mono text-sm font-extrabold group-hover:bg-[#9A3412] transition-colors shadow-xs">
                        VR
                    </span>
                    <span className="tracking-tight">
                        Vishwas <span className="text-[#C2410C] dark:text-[#FB923C] font-semibold">Rudramurthy</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
                    {NAV_LINKS.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`px-3 py-1.5 rounded-md transition-colors ${
                                    isActive
                                        ? 'bg-[#F3F1EA] dark:bg-[#292524] text-[#C2410C] dark:text-[#FB923C] font-semibold'
                                        : 'text-[#57534E] dark:text-[#A8A29E] hover:text-[#C2410C] dark:hover:text-[#FB923C] hover:bg-[#F3F1EA]/60 dark:hover:bg-[#1C1917]'
                                }`}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* Resume Download CTA (Desktop) */}
                <div className="hidden md:flex items-center gap-3">
                    <a
                        href={GENERAL_INFO.resumePdf}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-md bg-[#C2410C] hover:bg-[#9A3412] text-white transition-colors shadow-xs"
                    >
                        <FileText size={14} />
                        Resume PDF
                    </a>
                </div>

                {/* Mobile Hamburger Button */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="md:hidden p-2 rounded-md text-[#1C1917] dark:text-[#FAFAF9] hover:bg-[#F3F1EA] dark:hover:bg-[#292524] transition-colors"
                    aria-label="Toggle navigation menu"
                >
                    {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {/* Mobile Slide-down Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden border-b border-[#E7E5E4] dark:border-[#292524] bg-[#FAFAF7] dark:bg-[#0C0A09] px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top duration-200">
                    <div className="flex flex-col space-y-1">
                        {NAV_LINKS.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={closeMobileMenu}
                                    className={`px-3 py-2.5 rounded-md text-base font-medium transition-colors ${
                                        isActive
                                            ? 'bg-[#FFEDD5] dark:bg-[#431407] text-[#C2410C] dark:text-[#FB923C] font-semibold'
                                            : 'text-[#57534E] dark:text-[#A8A29E] hover:bg-[#F3F1EA] dark:hover:bg-[#1C1917]'
                                    }`}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                    </div>

                    <div className="pt-3 border-t border-[#E7E5E4] dark:border-[#292524]">
                        <a
                            href={GENERAL_INFO.resumePdf}
                            target="_blank"
                            rel="noreferrer"
                            onClick={closeMobileMenu}
                            className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-semibold rounded-md bg-[#C2410C] text-white hover:bg-[#9A3412] transition-colors"
                        >
                            <FileText size={16} />
                            Download Resume PDF
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
}
