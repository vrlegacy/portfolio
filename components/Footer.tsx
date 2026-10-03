import Link from 'next/link';
import { GENERAL_INFO, SOCIAL_LINKS } from '@/lib/data';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="border-t border-[#E7E5E4] dark:border-[#292524] bg-[#F3F1EA] dark:bg-[#0C0A09] py-12 text-sm text-[#57534E] dark:text-[#A8A29E]">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 pb-8 border-b border-[#E7E5E4] dark:border-[#292524]">
                    {/* Column 1: Info */}
                    <div>
                        <Link href="/" className="font-bold text-[#1C1917] dark:text-[#FAFAF9] text-base flex items-center gap-2 mb-2">
                            <span className="w-6 h-6 rounded bg-[#C2410C] text-white flex items-center justify-center font-mono text-xs font-bold">
                                VR
                            </span>
                            {GENERAL_INFO.name}
                        </Link>
                        <p className="text-[#57534E] dark:text-[#A8A29E] text-xs mb-3">
                            {GENERAL_INFO.title} • {GENERAL_INFO.location}
                        </p>
                        <p className="text-xs text-[#78716C] dark:text-[#A8A29E] max-w-sm">
                            Building high-performance APIs, web platforms, and automated AI workflows.
                        </p>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="flex flex-col space-y-2">
                        <span className="font-semibold text-[#1C1917] dark:text-[#FAFAF9] text-xs uppercase tracking-wider mb-1">
                            Navigation
                        </span>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                            <Link href="/" className="hover:text-[#C2410C] dark:hover:text-[#FB923C] transition-colors">Home</Link>
                            <Link href="/#about" className="hover:text-[#C2410C] dark:hover:text-[#FB923C] transition-colors">About</Link>
                            <Link href="/#skills" className="hover:text-[#C2410C] dark:hover:text-[#FB923C] transition-colors">Skills</Link>
                            <Link href="/projects" className="hover:text-[#C2410C] dark:hover:text-[#FB923C] transition-colors">Projects</Link>
                            <Link href="/experience" className="hover:text-[#C2410C] dark:hover:text-[#FB923C] transition-colors">Experience</Link>
                            <Link href="/resume" className="hover:text-[#C2410C] dark:hover:text-[#FB923C] transition-colors">Resume</Link>
                            <Link href="/contact" className="hover:text-[#C2410C] dark:hover:text-[#FB923C] transition-colors">Contact</Link>
                        </div>
                    </div>

                    {/* Column 3: Social & Contact */}
                    <div>
                        <span className="font-semibold text-[#1C1917] dark:text-[#FAFAF9] text-xs uppercase tracking-wider mb-2 block">
                            Connect
                        </span>
                        <div className="flex flex-col space-y-1.5 text-xs mb-4">
                            <a href={`mailto:${GENERAL_INFO.email}`} className="text-[#C2410C] dark:text-[#FB923C] hover:underline">
                                {GENERAL_INFO.email}
                            </a>
                            {SOCIAL_LINKS.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="hover:text-[#C2410C] dark:hover:text-[#FB923C] transition-colors"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Row */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#78716C] dark:text-[#A8A29E]">
                    <p>© {new Date().getFullYear()} Vishwas Rudramurthy. All rights reserved.</p>
                    <a
                        href="#top"
                        className="inline-flex items-center gap-1 hover:text-[#C2410C] dark:hover:text-[#FB923C] transition-colors"
                    >
                        Back to top <ArrowUp size={14} />
                    </a>
                </div>
            </div>
        </footer>
    );
}
