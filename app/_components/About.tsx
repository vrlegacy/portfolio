import { GENERAL_INFO } from '@/lib/data';
import { User, Terminal, Cpu, Layers } from 'lucide-react';

export default function About() {
    return (
        <section id="about" className="py-16 md:py-20 border-b border-[#E7E5E4] dark:border-[#292524] bg-[#FAFAF7] dark:bg-[#0C0A09]">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#C2410C] dark:text-[#FB923C] mb-3">
                    <User size={16} />
                    <span>01. Profile & Summary</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1917] dark:text-[#FAFAF9] tracking-tight mb-8">
                    About Me
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    <div className="lg:col-span-2 space-y-4 text-[#57534E] dark:text-[#A8A29E] text-base leading-relaxed">
                        <p>
                            {GENERAL_INFO.about}
                        </p>
                        <p>
                            My development methodology focuses on clean architecture, minimal dependencies, robust API contracts, and high computational efficiency. Whether building high-throughput FastAPI microservices, engineering real-time WebRTC audio rooms for AI interviews, or designing intuitive React interfaces, I prioritize maintainability and user impact.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-[#1C1917] p-6 rounded-lg border border-[#E7E5E4] dark:border-[#292524] space-y-4">
                        <h3 className="font-semibold text-[#1C1917] dark:text-[#FAFAF9] text-sm uppercase tracking-wider pb-2 border-b border-[#E7E5E4] dark:border-[#292524]">
                            Engineering Philosophy
                        </h3>

                        <div className="space-y-3 text-xs">
                            <div className="flex items-start gap-3">
                                <Terminal size={18} className="text-[#C2410C] dark:text-[#FB923C] shrink-0 mt-0.5" />
                                <div>
                                    <div className="font-semibold text-[#1C1917] dark:text-[#FAFAF9]">Robust REST APIs</div>
                                    <div className="text-[#78716C] dark:text-[#A8A29E]">FastAPI & Express endpoints with type safety and schema validation.</div>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Cpu size={18} className="text-[#C2410C] dark:text-[#FB923C] shrink-0 mt-0.5" />
                                <div>
                                    <div className="font-semibold text-[#1C1917] dark:text-[#FAFAF9]">AI Workflow Automation</div>
                                    <div className="text-[#78716C] dark:text-[#A8A29E]">Multi-agent LLMs, n8n pipelines, LiveKit audio, and OCR processing.</div>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Layers size={18} className="text-[#C2410C] dark:text-[#FB923C] shrink-0 mt-0.5" />
                                <div>
                                    <div className="font-semibold text-[#1C1917] dark:text-[#FAFAF9]">Modern Frontend UI</div>
                                    <div className="text-[#78716C] dark:text-[#A8A29E]">React & Next.js applications with Tailwind CSS and Radix primitives.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
