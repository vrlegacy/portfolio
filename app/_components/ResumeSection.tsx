import Link from 'next/link';
import { GENERAL_INFO } from '@/lib/data';
import { FileText, Download, ExternalLink, CheckCircle } from 'lucide-react';

export default function ResumeSection() {
    return (
        <section id="resume" className="py-16 md:py-20 border-b border-[#E7E5E4] dark:border-[#292524] bg-[#F3F1EA] dark:bg-[#0C0A09]">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#C2410C] dark:text-[#FB923C] mb-3">
                    <FileText size={16} />
                    <span>06. Resume & Credentials</span>
                </div>

                <div className="bg-white dark:bg-[#1C1917] rounded-lg border border-[#E7E5E4] dark:border-[#292524] p-8 shadow-xs">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                        <div className="md:col-span-2 space-y-4">
                            <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1917] dark:text-[#FAFAF9] tracking-tight">
                                Curriculum Vitae / Resume
                            </h2>

                            <p className="text-[#57534E] dark:text-[#A8A29E] text-sm leading-relaxed">
                                Detailed background covering FullStack engineering, Python & FastAPI API design, LLM workflow orchestration, and project impact highlights.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#57534E] dark:text-[#A8A29E] pt-2">
                                <div className="flex items-center gap-2">
                                    <CheckCircle size={15} className="text-[#C2410C] dark:text-[#FB923C] shrink-0" />
                                    <span>FullStack Architecture (React / Python)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle size={15} className="text-[#C2410C] dark:text-[#FB923C] shrink-0" />
                                    <span>AI Voice Streaming (LiveKit / Sarvam)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle size={15} className="text-[#C2410C] dark:text-[#FB923C] shrink-0" />
                                    <span>Multi-Agent Workflows (n8n / Gemini)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle size={15} className="text-[#C2410C] dark:text-[#FB923C] shrink-0" />
                                    <span>Team Leadership & Agile Sprints</span>
                                </div>
                            </div>
                        </div>

                        {/* Resume Actions */}
                        <div className="flex flex-col gap-3 md:border-l md:border-[#E7E5E4] md:dark:border-[#292524] md:pl-8">
                            <a
                                href={GENERAL_INFO.resumePdf}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md bg-[#C2410C] hover:bg-[#9A3412] text-white font-medium text-sm transition-colors shadow-xs"
                            >
                                <Download size={16} />
                                Download Resume PDF
                            </a>

                            <Link
                                href="/resume"
                                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md bg-[#F3F1EA] dark:bg-[#292524] hover:bg-[#E7E5E4] dark:hover:bg-[#3F3F46] text-[#1C1917] dark:text-[#FAFAF9] font-medium text-sm border border-[#E7E5E4] dark:border-[#3F3F46] transition-colors"
                            >
                                <ExternalLink size={16} />
                                View Interactive Resume
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
