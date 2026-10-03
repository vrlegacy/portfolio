import Link from 'next/link';
import { GENERAL_INFO, SKILL_CATEGORIES, MY_EXPERIENCE, PROJECTS } from '@/lib/data';
import { Download, ArrowLeft, Mail, MapPin, Briefcase, Code2, FolderGit2 } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/Icons';

export const metadata = {
    title: 'Resume | Vishwas Rudramurthy',
    description: 'Curriculum Vitae and Software Engineering Resume of Vishwas Rudramurthy.',
};

export default function ResumePage() {
    return (
        <main className="py-12 md:py-20 min-h-screen bg-[#FAFAF7] dark:bg-[#0C0A09]">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-[#E7E5E4] dark:border-[#292524]">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#C2410C] dark:text-[#FB923C] hover:underline"
                    >
                        <ArrowLeft size={14} /> Back to Home
                    </Link>

                    <a
                        href={GENERAL_INFO.resumePdf}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#C2410C] hover:bg-[#9A3412] text-white font-medium text-xs transition-colors shadow-xs"
                    >
                        <Download size={14} /> Download PDF
                    </a>
                </div>

                <div className="bg-white dark:bg-[#1C1917] border border-[#E7E5E4] dark:border-[#292524] rounded-xl p-8 sm:p-12 shadow-xs font-sans space-y-8">
                    <div className="border-b border-[#E7E5E4] dark:border-[#292524] pb-6 text-center sm:text-left">
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1C1917] dark:text-[#FAFAF9] tracking-tight">
                            {GENERAL_INFO.name}
                        </h1>
                        <p className="text-lg font-bold text-[#C2410C] dark:text-[#FB923C] mt-1">
                            {GENERAL_INFO.title}
                        </p>

                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-y-2 gap-x-6 text-xs text-[#78716C] dark:text-[#A8A29E] font-mono mt-4">
                            <div className="flex items-center gap-1">
                                <MapPin size={13} className="text-[#C2410C] dark:text-[#FB923C]" />
                                <span>{GENERAL_INFO.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Mail size={13} className="text-[#C2410C] dark:text-[#FB923C]" />
                                <a href={`mailto:${GENERAL_INFO.email}`} className="hover:underline">
                                    {GENERAL_INFO.email}
                                </a>
                            </div>
                            <div className="flex items-center gap-1">
                                <GithubIcon size={13} className="text-[#C2410C] dark:text-[#FB923C]" />
                                <a href={GENERAL_INFO.github} target="_blank" rel="noreferrer" className="hover:underline">
                                    github.com/vrlegacy
                                </a>
                            </div>
                            <div className="flex items-center gap-1">
                                <LinkedinIcon size={13} className="text-[#C2410C] dark:text-[#FB923C]" />
                                <a href={GENERAL_INFO.linkedin} target="_blank" rel="noreferrer" className="hover:underline">
                                    linkedin.com/in/vr26
                                </a>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-[#78716C] dark:text-[#A8A29E] mb-2">
                            Professional Summary
                        </h2>
                        <p className="text-sm text-[#57534E] dark:text-[#A8A29E] leading-relaxed">
                            {GENERAL_INFO.about}
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-[#78716C] dark:text-[#A8A29E] mb-3 flex items-center gap-2">
                            <Code2 size={15} className="text-[#C2410C] dark:text-[#FB923C]" />
                            Technical Skills
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                            {SKILL_CATEGORIES.map((cat) => (
                                <div key={cat.title} className="bg-[#F3F1EA] dark:bg-[#0C0A09] p-3.5 rounded border border-[#E7E5E4] dark:border-[#292524]">
                                    <div className="font-bold text-[#1C1917] dark:text-[#FAFAF9] mb-1.5">{cat.title}</div>
                                    <div className="text-[#57534E] dark:text-[#A8A29E] leading-normal">
                                        {cat.skills.join(', ')}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-[#78716C] dark:text-[#A8A29E] mb-4 flex items-center gap-2">
                            <Briefcase size={15} className="text-[#C2410C] dark:text-[#FB923C]" />
                            Work & Internship Experience
                        </h2>

                        <div className="space-y-6">
                            {MY_EXPERIENCE.map((exp) => (
                                <div key={exp.id} className="bg-[#F3F1EA] dark:bg-[#0C0A09] p-5 rounded border border-[#E7E5E4] dark:border-[#292524]">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                                        <h3 className="font-bold text-[#1C1917] dark:text-[#FAFAF9] text-base">
                                            {exp.title}
                                        </h3>
                                        <span className="text-xs font-mono font-semibold text-[#C2410C] dark:text-[#FB923C]">
                                            {exp.duration}
                                        </span>
                                    </div>

                                    <div className="text-xs font-semibold text-[#57534E] dark:text-[#A8A29E] mb-3">
                                        {exp.company} • {exp.location}
                                    </div>

                                    <ul className="list-disc list-inside text-xs text-[#57534E] dark:text-[#A8A29E] space-y-1">
                                        {exp.highlights.map((h, i) => (
                                            <li key={i}>{h}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-[#78716C] dark:text-[#A8A29E] mb-4 flex items-center gap-2">
                            <FolderGit2 size={15} className="text-[#C2410C] dark:text-[#FB923C]" />
                            Selected Projects
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                            {PROJECTS.slice(0, 4).map((p) => (
                                <div key={p.slug} className="bg-[#F3F1EA] dark:bg-[#0C0A09] p-4 rounded border border-[#E7E5E4] dark:border-[#292524]">
                                    <div className="font-bold text-[#1C1917] dark:text-[#FAFAF9] text-sm mb-1">{p.title}</div>
                                    <div className="text-[#57534E] dark:text-[#A8A29E] mb-2">{p.summary}</div>
                                    <div className="font-mono text-[11px] text-[#C2410C] dark:text-[#FB923C]">
                                        {p.techStack.slice(0, 4).join(', ')}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
