import Link from 'next/link';
import { PROJECTS } from '@/lib/data';
import { Table, ArrowRight } from 'lucide-react';

export default function CaseStudiesTable() {
    return (
        <section className="py-16 md:py-20 border-b border-[#E7E5E4] dark:border-[#292524] bg-[#FAFAF7] dark:bg-[#0C0A09]">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#C2410C] dark:text-[#FB923C] mb-3">
                    <Table size={16} />
                    <span>05. Project Matrix</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1917] dark:text-[#FAFAF9] tracking-tight mb-2">
                    Case Studies & Highlights
                </h2>
                <p className="text-sm text-[#78716C] dark:text-[#A8A29E] mb-8 max-w-2xl">
                    A quick reference matrix of key projects, application types, and core engineering highlights.
                </p>

                <div className="overflow-x-auto rounded-lg border border-[#E7E5E4] dark:border-[#292524] shadow-xs">
                    <table className="w-full text-left text-sm text-[#57534E] dark:text-[#A8A29E]">
                        <thead className="bg-[#F3F1EA] dark:bg-[#1C1917] text-xs uppercase font-mono font-semibold text-[#1C1917] dark:text-[#FAFAF9] border-b border-[#E7E5E4] dark:border-[#292524]">
                            <tr>
                                <th scope="col" className="px-6 py-3.5">
                                    Project
                                </th>
                                <th scope="col" className="px-6 py-3.5">
                                    Type
                                </th>
                                <th scope="col" className="px-6 py-3.5">
                                    Highlight
                                </th>
                                <th scope="col" className="px-6 py-3.5 text-right">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E7E5E4] dark:divide-[#292524] bg-white dark:bg-[#0C0A09]">
                            {PROJECTS.map((p) => (
                                <tr
                                    key={p.slug}
                                    className="hover:bg-[#FFEDD5]/40 dark:hover:bg-[#431407]/20 transition-colors"
                                >
                                    <td className="px-6 py-4 font-semibold text-[#1C1917] dark:text-[#FAFAF9] whitespace-nowrap">
                                        <Link href={`/projects/${p.slug}`} className="hover:text-[#C2410C] dark:hover:text-[#FB923C] transition-colors">
                                            {p.title}
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 text-xs font-mono text-[#57534E] dark:text-[#A8A29E] whitespace-nowrap">
                                        <span className="px-2 py-0.5 rounded bg-[#F3F1EA] dark:bg-[#292524] border border-[#E7E5E4] dark:border-[#3F3F46]">
                                            {p.type || 'Web Application'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-[#57534E] dark:text-[#A8A29E]">
                                        {p.highlight || p.summary}
                                    </td>
                                    <td className="px-6 py-4 text-right whitespace-nowrap">
                                        <Link
                                            href={`/projects/${p.slug}`}
                                            className="inline-flex items-center gap-1 text-xs font-semibold text-[#C2410C] dark:text-[#FB923C] hover:underline"
                                        >
                                            View Case Study <ArrowRight size={13} />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
