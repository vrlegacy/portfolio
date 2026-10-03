import Link from 'next/link';
import { GENERAL_INFO } from '@/lib/data';
import { ArrowRight, FileText, Mail, MapPin } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/Icons';

export default function Hero() {
    return (
        <section className="py-16 md:py-24 border-b border-[#E7E5E4] dark:border-[#292524] bg-[#FAFAF7] dark:bg-[#0C0A09]">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="max-w-3xl">
                    {/* Resume Header Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFEDD5] dark:bg-[#431407] border border-[#FED7AA] dark:border-[#7C2D12] text-[#C2410C] dark:text-[#FB923C] text-xs font-semibold mb-6">
                        <span className="w-2 h-2 rounded-full bg-[#C2410C] animate-pulse"></span>
                        {GENERAL_INFO.title}
                    </div>

                    {/* Name & Title */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#1C1917] dark:text-[#FAFAF9] mb-4">
                        {GENERAL_INFO.name}
                    </h1>

                    <p className="text-lg sm:text-xl text-[#57534E] dark:text-[#A8A29E] leading-relaxed font-normal mb-8">
                        {GENERAL_INFO.headline}
                    </p>

                    {/* Metadata Bar */}
                    <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-[#78716C] dark:text-[#A8A29E] font-mono pb-8 mb-8 border-b border-[#E7E5E4] dark:border-[#292524]">
                        <div className="flex items-center gap-1.5">
                            <MapPin size={14} className="text-[#C2410C] dark:text-[#FB923C]" />
                            <span>{GENERAL_INFO.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Mail size={14} className="text-[#C2410C] dark:text-[#FB923C]" />
                            <a href={`mailto:${GENERAL_INFO.email}`} className="hover:text-[#C2410C] transition-colors">
                                {GENERAL_INFO.email}
                            </a>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <GithubIcon size={14} className="text-[#C2410C] dark:text-[#FB923C]" />
                            <a href={GENERAL_INFO.github} target="_blank" rel="noreferrer" className="hover:text-[#C2410C] transition-colors">
                                github.com/vrlegacy
                            </a>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <LinkedinIcon size={14} className="text-[#C2410C] dark:text-[#FB923C]" />
                            <a href={GENERAL_INFO.linkedin} target="_blank" rel="noreferrer" className="hover:text-[#C2410C] transition-colors">
                                linkedin.com/in/vr26
                            </a>
                        </div>
                    </div>

                    {/* Action CTAs */}
                    <div className="flex flex-wrap items-center gap-3">
                        <Link
                            href="/projects"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#C2410C] hover:bg-[#9A3412] text-white font-medium text-sm transition-all shadow-xs hover:shadow-md"
                        >
                            View Projects
                            <ArrowRight size={16} />
                        </Link>
                        <a
                            href={GENERAL_INFO.resumePdf}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#F3F1EA] dark:bg-[#1C1917] hover:bg-[#E7E5E4] dark:hover:bg-[#292524] text-[#1C1917] dark:text-[#FAFAF9] font-medium text-sm border border-[#E7E5E4] dark:border-[#292524] transition-all"
                        >
                            <FileText size={16} />
                            Download Resume
                        </a>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-[#57534E] dark:text-[#A8A29E] hover:text-[#C2410C] dark:hover:text-[#FB923C] font-medium text-sm transition-colors"
                        >
                            Contact Me
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
