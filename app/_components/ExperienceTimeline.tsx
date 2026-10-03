import { MY_EXPERIENCE } from '@/lib/data';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function ExperienceTimeline() {
    return (
        <section id="experience" className="py-16 md:py-20 border-b border-[#E7E5E4] dark:border-[#292524] bg-[#FAFAF7] dark:bg-[#0C0A09]">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#C2410C] dark:text-[#FB923C] mb-3">
                            <Briefcase size={16} />
                            <span>03. Career & Internships</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1917] dark:text-[#FAFAF9] tracking-tight">
                            Work Experience
                        </h2>
                    </div>

                    <Link
                        href="/experience"
                        className="hidden sm:inline-flex items-center text-xs font-semibold text-[#C2410C] dark:text-[#FB923C] hover:underline"
                    >
                        View Full Experience →
                    </Link>
                </div>

                <div className="relative border-l-2 border-[#E7E5E4] dark:border-[#292524] ml-3 md:ml-0 md:border-l-0 space-y-12">
                    {MY_EXPERIENCE.map((exp) => (
                        <div
                            key={exp.id}
                            className="relative flex flex-col md:flex-row gap-4 md:gap-8 pl-6 md:pl-0"
                        >
                            {/* Desktop Left Column: Date */}
                            <div className="md:w-1/4 md:text-right shrink-0">
                                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#FFEDD5] dark:bg-[#431407] text-[#C2410C] dark:text-[#FB923C] font-mono text-xs font-semibold border border-[#FED7AA] dark:border-[#7C2D12] mb-1">
                                    <Calendar size={13} />
                                    <span>{exp.duration}</span>
                                </div>
                                <div className="text-xs text-[#78716C] dark:text-[#A8A29E] flex items-center md:justify-end gap-1 mt-1">
                                    <MapPin size={12} />
                                    <span>{exp.location}</span>
                                </div>
                            </div>

                            {/* Desktop Timeline Center Node */}
                            <div className="hidden md:flex flex-col items-center shrink-0 relative">
                                <div className="w-3 h-3 rounded-full bg-[#C2410C] dark:bg-[#FB923C] border-4 border-[#FAFAF7] dark:border-[#0C0A09] shadow-xs z-10"></div>
                                <div className="w-0.5 h-full bg-[#E7E5E4] dark:bg-[#292524] absolute top-3"></div>
                            </div>

                            {/* Mobile Node Dot */}
                            <div className="md:hidden absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-[#C2410C] dark:bg-[#FB923C] border-2 border-[#FAFAF7] dark:border-[#0C0A09]"></div>

                            {/* Right Column: Role & Details */}
                            <div className="md:w-3/4 bg-white dark:bg-[#1C1917] p-6 rounded-lg border border-[#E7E5E4] dark:border-[#292524] card-hover">
                                <h3 className="text-lg font-bold text-[#1C1917] dark:text-[#FAFAF9]">
                                    {exp.title}
                                </h3>
                                <div className="text-sm font-semibold text-[#C2410C] dark:text-[#FB923C] mb-3">
                                    {exp.company}
                                </div>

                                <p className="text-sm text-[#57534E] dark:text-[#A8A29E] mb-4 leading-relaxed">
                                    {exp.description}
                                </p>

                                <ul className="space-y-2 mb-4 text-xs sm:text-sm text-[#57534E] dark:text-[#A8A29E]">
                                    {exp.highlights.map((item, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <CheckCircle2 size={16} className="text-[#C2410C] dark:text-[#FB923C] shrink-0 mt-0.5" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#E7E5E4] dark:border-[#292524]">
                                    {exp.skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="px-2 py-0.5 text-[11px] font-mono rounded bg-[#F3F1EA] dark:bg-[#292524] text-[#1C1917] dark:text-[#FAFAF9] border border-[#E7E5E4] dark:border-[#3F3F46]"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
